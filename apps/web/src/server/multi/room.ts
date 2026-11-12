// ─────────────────────────────────────────────────────────────
// server/multi/room.ts — salons multijoueurs (synchrones, 10 joueurs max).
// Règles : une réponse acceptée par question et par joueur (la première
// compte, la rareté rapporte les points) ; classement = somme des points.
// Stockage : une clé méta (écrite une fois au départ), une table des joueurs
// et une table des réponses (HSETNX → pas de double réponse en course).
// ─────────────────────────────────────────────────────────────
import {
  MAX_ANSWER_LENGTH,
  TIER_POINTS,
  drawThemed,
  validateAnswer,
  validateListing,
  type TierId,
} from '@hotbrain/engine';
import { configFor } from '../../config';
import { DEFAULT_PREFERENCES } from '../../state/prefs-store';
import { getJson, getKv, hgetallJson, setJson, ROOM_TTL_S, type Kv } from './kv';
import { loadBank } from './bank';
import { allowedPromptIds } from './pool';
import { COUNTDOWN_MS, MAX_PLAYERS, makeCode, phaseAt, type RoomPhase } from './phase';

export interface RoomMeta {
  code: string;
  theme: string;
  rounds: number;
  roundSec: number;
  previewMs: number;
  roundMs: number;
  promptIds: string[];
  hostId: string;
  createdAt: number;
  startAt: number | null;
  /** 'hot' (une réponse par question) ou 'brain' (plusieurs réponses, neurones). */
  mode?: 'hot' | 'brain';
  brainGoal?: number;
  showScores?: boolean;
  endedAt?: number | null;
  winnerId?: string | null;
  /** Premier joueur à avoir atteint l'objectif (mode Brain). */
  goalFirstId?: string | null;
  /** Bonus x2 : joueur qui l'a activé et fin de la fenêtre (ms). */
  bonusUsedBy?: string | null;
  bonusUntil?: number | null;
}

export interface PlayerRec {
  id: string;
  name: string;
  lang?: string;
}

export interface AnswerRec {
  round: number;
  playerId: string;
  input: string;
  answer: string;
  tier: TierId;
  score: number;
  at: number;
}

export type Verdict =
  | { kind: 'accept'; answer: string; tier: TierId; score: number; total?: number }
  | { kind: 'duplicate' }
  | { kind: 'already' }
  | { kind: 'rejected' }
  | { kind: 'none' }
  | { kind: 'late' }
  | { kind: 'waiting' }
  | { kind: 'ended' }
  | { kind: 'unknown' };

const metaKey = (code: string): string => `mp:room:${code}`;
const playersKey = (code: string): string => `mp:room:${code}:players`;
const answersKey = (code: string): string => `mp:room:${code}:answers`;

function randomId(): string {
  const a = new Uint32Array(2);
  crypto.getRandomValues(a);
  return `${a[0]!.toString(36)}${a[1]!.toString(36)}`;
}

function rand(): number {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0]! / 4294967296;
}

export async function getMeta(kv: Kv, code: string): Promise<RoomMeta | null> {
  return getJson<RoomMeta>(kv, metaKey(code.toUpperCase()));
}

export const BRAIN_GOALS = [100, 200, 300, 500, 750, 1000] as const;

export interface CreateInput {
  name: string;
  lang: string;
  theme: string;
  rounds: number;
  roundSec: number;
  origin: string;
  mode?: 'hot' | 'brain';
  brainGoal?: number;
  showScores?: boolean;
}

export async function createRoom(input: CreateInput): Promise<{ code: string; playerId: string }> {
  const kv = getKv();
  if (input.lang !== 'fr' && input.theme !== 'general') throw new Error('Ce thème n\'est pas disponible dans cette langue');
  const bank = await loadBank(input.theme, input.origin);
  const mode: 'hot' | 'brain' = input.mode === 'brain' ? 'brain' : 'hot';
  const cfg = configFor(mode, { rounds: input.rounds, roundSec: input.roundSec });
  if (bank.prompts.length < input.rounds) throw new Error('banque trop petite pour ce nombre de questions');
  let code = '';
  for (let i = 0; i < 6; i++) {
    const c = makeCode(rand);
    if (!(await getMeta(kv, c))) {
      code = c;
      break;
    }
  }
  if (!code) throw new Error('aucun code libre');
  const playerId = randomId();
  const meta: RoomMeta = {
    code,
    theme: input.theme,
    rounds: input.rounds,
    roundSec: input.roundSec,
    previewMs: cfg.modes[mode].previewMs,
    roundMs: cfg.modes[mode].roundMs,
    promptIds: [],
    hostId: playerId,
    createdAt: Date.now(),
    startAt: null,
    mode,
    brainGoal: BRAIN_GOALS.includes(input.brainGoal as never) ? (input.brainGoal as number) : 500,
    showScores: input.showScores === true,
    endedAt: null,
    winnerId: null,
  };
  await setJson(kv, metaKey(code), meta);
  await kv.cmd(['HSET', playersKey(code), playerId, JSON.stringify({ id: playerId, name: cleanName(input.name), lang: input.lang })]);
  await kv.cmd(['EXPIRE', playersKey(code), ROOM_TTL_S]);
  await kv.cmd(['EXPIRE', answersKey(code), ROOM_TTL_S]);
  return { code, playerId };
}

export function cleanName(name: string): string {
  return name.trim().replace(/\s+/g, ' ').slice(0, 20) || 'Joueur';
}

export async function joinRoom(code: string, name: string, lang = 'fr'): Promise<{ playerId: string } | { error: string }> {
  const kv = getKv();
  const c = code.toUpperCase();
  const meta = await getMeta(kv, c);
  if (!meta) return { error: 'Salon introuvable' };
  if (meta.startAt !== null) return { error: 'La partie a déjà commencé' };
  if (lang !== 'fr' && meta.theme !== 'general') return { error: 'Ce salon n\'est pas disponible dans cette langue' };
  const count = Number(await kv.cmd(['HLEN', playersKey(c)]));
  if (count >= MAX_PLAYERS) return { error: 'Salon complet (10 joueurs)' };
  const playerId = randomId();
  await kv.cmd(['HSET', playersKey(c), playerId, JSON.stringify({ id: playerId, name: cleanName(name), lang: lang === 'fr' || lang === 'en' || lang === 'es' ? lang : 'fr' })]);
  return { playerId };
}

export async function startRoom(code: string, playerId: string, origin: string): Promise<{ ok: true } | { error: string }> {
  const kv = getKv();
  const c = code.toUpperCase();
  const meta = await getMeta(kv, c);
  if (!meta) return { error: 'Salon introuvable' };
  if (meta.hostId !== playerId) return { error: 'Seul l\'hôte peut lancer la partie' };
  if (meta.startAt !== null) return { ok: true };
  const players = await getPlayers(kv, c);
  const langs = players.map((p) => p.lang ?? 'fr');
  const bank = await loadBank(meta.theme, origin);
  // Règle : les questions très françaises ne sortent que dans un salon 100 % français.
  const allowed = new Set(allowedPromptIds(bank.prompts.map((p) => p.id), langs));
  const pool = { ...bank, prompts: bank.prompts.filter((p) => allowed.has(p.id)) };
  const mode: 'hot' | 'brain' = meta.mode === 'brain' ? 'brain' : 'hot';
  const cfg = configFor(mode, { rounds: meta.rounds, roundSec: meta.roundSec });
  if (pool.prompts.length < meta.rounds) return { error: 'Pas assez de questions pour ce salon' };
  const seed = Math.floor(rand() * 4294967296);
  const promptIds = drawThemed(meta.theme, mode, pool, [], seed, cfg);
  await setJson(kv, metaKey(c), { ...meta, promptIds, startAt: Date.now() + COUNTDOWN_MS });
  return { ok: true };
}

export async function getPlayers(kv: Kv, code: string): Promise<PlayerRec[]> {
  const all = await hgetallJson<PlayerRec>(kv, playersKey(code));
  return Object.values(all);
}

export async function getAnswers(kv: Kv, code: string): Promise<AnswerRec[]> {
  return Object.values(await hgetallJson<AnswerRec>(kv, answersKey(code)));
}

export async function submitAnswer(
  code: string,
  playerId: string,
  input: string,
  origin: string,
): Promise<Verdict> {
  const kv = getKv();
  const c = code.toUpperCase();
  const meta = await getMeta(kv, c);
  if (!meta) return { kind: 'unknown' };
  const players = await getPlayers(kv, c);
  const player = players.find((p) => p.id === playerId);
  if (!player) return { kind: 'unknown' };
  const now = Date.now();
  const phase: RoomPhase = phaseAt(meta, now);
  if (phase.kind === 'lobby' || phase.kind === 'countdown') return { kind: 'waiting' };
  if (phase.kind === 'done') return { kind: 'ended' };
  if (phase.kind !== 'answering') return { kind: 'late' };
  if (now > phase.endsAt) return { kind: 'late' };

  if (meta.mode === 'brain') return submitBrain(kv, c, meta, player, playerId, input, origin, phase.round, phase.endsAt, now);

  const field = `${phase.round}:${playerId}`;
  const existing = await kv.cmd(['HGET', answersKey(c), field]);
  if (typeof existing === 'string') return { kind: 'already' };

  const bank = await loadBank(meta.theme, origin, player.lang ?? 'fr');
  const promptId = meta.promptIds[phase.round] as string;
  const sheet = bank.sheets.get(promptId);
  const index = bank.indexes.get(promptId);
  if (!sheet) return { kind: 'rejected' };
  const v = validateAnswer(input, sheet, DEFAULT_PREFERENCES, index, MAX_ANSWER_LENGTH);
  if (v.kind === 'none') return { kind: 'none' };
  if (v.kind !== 'accept') return { kind: 'rejected' };

  const rec: AnswerRec = {
    round: phase.round,
    playerId,
    input: input.slice(0, MAX_ANSWER_LENGTH),
    answer: v.entry.answer,
    tier: v.entry.tier,
    score: TIER_POINTS[v.entry.tier],
    at: now,
  };
  const stored = await kv.cmd(['HSETNX', answersKey(c), field, JSON.stringify(rec)]);
  if (stored !== 1) return { kind: 'already' };
  return { kind: 'accept', answer: rec.answer, tier: rec.tier, score: rec.score };
}

/** Mode Brain : plusieurs réponses par manche, doublons ignorés, objectif de neurones. */
async function submitBrain(
  kv: Kv,
  c: string,
  meta: RoomMeta,
  player: PlayerRec,
  playerId: string,
  input: string,
  origin: string,
  round: number,
  endsAt: number,
  now: number,
): Promise<Verdict> {
  const bank = await loadBank(meta.theme, origin, player.lang ?? 'fr');
  const promptId = meta.promptIds[round] as string;
  const sheet = bank.sheets.get(promptId);
  const index = bank.indexes.get(promptId);
  if (!sheet) return { kind: 'rejected' };
  const all = await getAnswers(kv, c);
  const mine = all.filter((a) => a.playerId === playerId && a.round === round);
  const v = validateListing(input, sheet, mine as never, DEFAULT_PREFERENCES, index, MAX_ANSWER_LENGTH);
  if (v.kind === 'none') return { kind: 'none' };
  if (v.kind === 'rejected' || v.kind === 'correction') return { kind: 'rejected' };
  if (v.kind === 'duplicate') return { kind: 'duplicate' };
  if (now > endsAt) return { kind: 'late' };
  const entry = v.entry;
  const rec: AnswerRec = {
    round,
    playerId,
    input: input.slice(0, MAX_ANSWER_LENGTH),
    answer: entry.answer,
    tier: entry.tier,
    score: TIER_POINTS[entry.tier],
    at: now,
  };
  // Bonus x2 : doubler les points tant que la fenêtre de 10 s est ouverte pour ce joueur.
  const doubled = meta.bonusUsedBy === playerId && meta.bonusUntil != null && now <= meta.bonusUntil;
  if (doubled) rec.score = rec.score * 2;
  const field = `${round}:${playerId}:${entry.answer}`;
  const stored = await kv.cmd(['HSETNX', answersKey(c), field, JSON.stringify(rec)]);
  if (stored !== 1) return { kind: 'duplicate' };
  const total = all.filter((a) => a.playerId === playerId).reduce((acc, a) => acc + a.score, 0) + rec.score;
  const goal = meta.brainGoal ?? 500;
  if (total >= goal && !meta.goalFirstId) {
    // Le premier à l'objectif gagne le bonus x2 ; la partie continue jusqu'à la fin du temps.
    await setJson(kv, metaKey(c), { ...meta, goalFirstId: playerId });
  }
  return { kind: 'accept', answer: rec.answer, tier: rec.tier, score: rec.score, total };
}

export interface RankRow {
  playerId: string;
  name: string;
  score: number;
  answers: number;
}

export function rankingOf(players: PlayerRec[], answers: AnswerRec[]): RankRow[] {
  const rows = new Map<string, RankRow>();
  for (const p of players) rows.set(p.id, { playerId: p.id, name: p.name, score: 0, answers: 0 });
  for (const a of answers) {
    const r = rows.get(a.playerId);
    if (!r) continue;
    r.score += a.score;
    r.answers += 1;
  }
  return [...rows.values()].sort((x, y) => y.score - x.score || x.name.localeCompare(y.name));
}

// ── Bonus x2 (mode Brain) : réservé au premier joueur à l'objectif ──

export const BONUS_MS = 10_000;

export async function activateBonus(code: string, playerId: string): Promise<{ ok: true; until: number } | { error: string }> {
  const kv = getKv();
  const c = code.toUpperCase();
  const meta = await getMeta(kv, c);
  if (!meta) return { error: 'Salon introuvable' };
  if (meta.mode !== 'brain') return { error: 'Bonus réservé au mode Brain' };
  if (meta.goalFirstId !== playerId) return { error: 'Réservé au premier joueur à avoir atteint l\'objectif' };
  if (meta.bonusUsedBy) return { error: 'Bonus déjà utilisé' };
  const until = Date.now() + BONUS_MS;
  await setJson(kv, metaKey(c), { ...meta, bonusUsedBy: playerId, bonusUntil: until });
  return { ok: true, until };
}

// ── Signalement d'une réponse refusée à tort ──

export const FLAG_REVIEW_MS = 20_000;
export const FLAG_CREDIT = 50;
const flagsKey = (code: string): string => `mp:room:${code}:flags`;

export interface FlagRec {
  id: string;
  round: number;
  playerId: string;
  input: string;
  at: number;
  votes: Record<string, boolean>;
}

export async function flagAnswer(code: string, playerId: string, input: string): Promise<{ ok: true; id: string } | { error: string }> {
  const kv = getKv();
  const c = code.toUpperCase();
  const meta = await getMeta(kv, c);
  if (!meta) return { error: 'Salon introuvable' };
  const players = await getPlayers(kv, c);
  if (!players.some((p) => p.id === playerId)) return { error: 'Joueur introuvable' };
  const now = Date.now();
  const phase = phaseAt(meta, now);
  if (phase.kind !== 'answering') return { error: 'Signalement possible pendant la saisie' };
  const text = input.trim().slice(0, MAX_ANSWER_LENGTH);
  if (!text) return { error: 'Réponse vide' };
  const id = `${phase.round}:${playerId}:${text.toLowerCase()}`;
  const rec: FlagRec = { id, round: phase.round, playerId, input: text, at: now, votes: {} };
  const stored = await kv.cmd(['HSETNX', flagsKey(c), id, JSON.stringify(rec)]);
  if (stored !== 1) return { error: 'Déjà signalée' };
  return { ok: true, id };
}

export async function voteFlag(code: string, playerId: string, id: string, accept: boolean): Promise<{ ok: true } | { error: string }> {
  const kv = getKv();
  const c = code.toUpperCase();
  const flags = await hgetallJson<FlagRec>(kv, flagsKey(c));
  const flag = flags[id];
  if (!flag) return { error: 'Signalement introuvable' };
  if (flag.playerId === playerId) return { error: 'Tu ne peux pas voter sur ta propre réponse' };
  const players = await getPlayers(kv, c);
  const status = flagStatus(flag, players.length, Date.now());
  if (status !== 'open') return { error: 'Vote terminé' };
  flag.votes[playerId] = accept;
  await kv.cmd(['HSET', flagsKey(c), id, JSON.stringify(flag)]);
  return { ok: true };
}

/** Statut d'un signalement : ouvert jusqu'à tous les votes ou la fin du délai. */
export function flagStatus(flag: FlagRec, playerCount: number, now: number): 'open' | 'accepted' | 'refused' {
  const others = playerCount - 1;
  const votes = Object.values(flag.votes);
  const yes = votes.filter(Boolean).length;
  const no = votes.length - yes;
  const closed = now >= flag.at + FLAG_REVIEW_MS || (others > 0 && votes.length >= others);
  if (!closed) return 'open';
  return yes > no && yes >= 1 ? 'accepted' : 'refused';
}

/** Lit les signalements et crédite, une seule fois, ceux qui sont acceptés. */
export async function resolveFlags(
  kv: Kv,
  code: string,
  meta: RoomMeta,
  players: PlayerRec[],
  answers: AnswerRec[],
  now: number,
): Promise<(FlagRec & { status: 'open' | 'accepted' | 'refused'; name: string })[]> {
  const flags = await hgetallJson<FlagRec>(kv, flagsKey(code));
  const out: (FlagRec & { status: 'open' | 'accepted' | 'refused'; name: string })[] = [];
  for (const flag of Object.values(flags)) {
    const status = flagStatus(flag, players.length, now);
    if (status === 'accepted') {
      const alreadyRound = answers.some((a) => a.playerId === flag.playerId && a.round === flag.round);
      // Hot : une seule réponse par question ; Brain : la réponse signalée s'ajoute.
      if (meta.mode !== 'brain' && alreadyRound) {
        // déjà une réponse valide pour cette question : rien à créditer
      } else {
        const rec: AnswerRec = {
          round: flag.round,
          playerId: flag.playerId,
          input: flag.input,
          answer: flag.input,
          tier: 't3',
          score: FLAG_CREDIT,
          at: flag.at,
        };
        await kv.cmd(['HSETNX', answersKey(code), `${flag.round}:${flag.playerId}:flag:${flag.id}`, JSON.stringify(rec)]);
      }
    }
    out.push({ ...flag, status, name: players.find((p) => p.id === flag.playerId)?.name ?? '' });
  }
  return out.sort((a, b) => b.at - a.at);
}
