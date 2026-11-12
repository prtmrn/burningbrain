// ─────────────────────────────────────────────────────────────
// dive-codec.ts — (dé)sérialisation de DiveState en couple (mono, wall)
// (Ontologie §D.2, mecaniques §B.1)
//
// Les deadlines du domaine vivent sur l'horloge MONOTONIQUE
// (performance.now()), qui repart à 0 à chaque chargement. Pour survivre à
// un rechargement, on persiste leur équivalent WALL-CLOCK :
//     wall = Date.now() + (mono − performance.now())     [à l'écriture]
//     mono′ = performance.now() + (wall − Date.now())    [à la relecture]
// Si l'état persisté porte pausedAt/pausedWall, l'app dispatch RESUME après
// reconstruction : le décalage (Date.now() − pausedWall) est appliqué par le
// reducer (reprise fidèle F-07 — démonstration : mono′ + (wall₁ − wall₀) =
// mono₀ exactement, la deadline était gelée).
// Sans pause persistée (crash), la deadline a continué de courir en wall :
// si elle est passée, la garde du reducer force la transition (miss hot /
// clôture 'timeout' brain) — pas de temps regagné.
//
// La validation à la lecture est STRICTE (rejet propre → null) : forme,
// bornes, cohérence score ↔ tier (re-dérivation, jamais de confiance aveugle).
// ─────────────────────────────────────────────────────────────
import { TIER_POINTS, TIER_IDS, MAX_HOT_SCORE } from '../domain/constants';
import type {
  AcceptedAnswer,
  BrainDiveState,
  BrainRoundResult,
  Completion,
  DiveState,
  HotDiveState,
  HotRoundResult,
  TierId,
} from '../domain/types';

// ── Forme persistée (détail de sérialisation — l'interface runtime ne change pas) ──

export interface WallClockFields {
  previewEndsWall: number | null;
  answerEndsWall: number | null;
  pausedWall?: number;
}

export type PersistedDiveState = Omit<
  DiveState,
  'previewEndsAt' | 'answerEndsAt' | 'pausedAt'
> &
  WallClockFields;

// ── Écriture / lecture ──

export function toPersisted(s: DiveState, nowMono: number, nowWall: number): PersistedDiveState {
  const toWall = (mono: number | null): number | null =>
    mono === null ? null : nowWall + (mono - nowMono);
  const { previewEndsAt, answerEndsAt, pausedAt, ...rest } = s;
  return {
    ...rest,
    previewEndsWall: toWall(previewEndsAt),
    answerEndsWall: toWall(answerEndsAt),
    ...(pausedAt !== undefined ? { pausedWall: toWall(pausedAt) as number } : {}),
  } as PersistedDiveState;
}

/** Reconstruction après rechargement. Retourne null si la donnée est
 *  incohérente (rejet propre — l'app réinitialise alors proprement). */
export function fromPersisted(
  p: unknown,
  nowMono: number,
  nowWall: number,
): DiveState | null {
  if (!validatePersistedDive(p)) return null;
  const toMono = (wall: number | null): number | null =>
    wall === null ? null : nowMono + (wall - nowWall);
  const { previewEndsWall, answerEndsWall, pausedWall, ...rest } = p;
  return {
    ...rest,
    previewEndsAt: toMono(previewEndsWall),
    answerEndsAt: toMono(answerEndsWall),
    ...(pausedWall !== undefined ? { pausedAt: toMono(pausedWall) as number } : {}),
  } as DiveState;
}

// ── Validation stricte ──

function isNum(x: unknown): x is number {
  return typeof x === 'number' && Number.isFinite(x);
}
function isInt(x: unknown): x is number {
  return isNum(x) && Number.isInteger(x);
}
function isStr(x: unknown): x is string {
  return typeof x === 'string';
}
function isTier(x: unknown): x is TierId {
  return isStr(x) && (TIER_IDS as readonly string[]).includes(x);
}
function isWallOrNull(x: unknown): x is number | null {
  return x === null || isNum(x);
}

function validateAcceptedAnswer(x: unknown): x is AcceptedAnswer {
  if (typeof x !== 'object' || x === null) return false;
  const a = x as Record<string, unknown>;
  if (!isStr(a['rawAnswer']) || !isStr(a['answer'])) return false;
  if (!isTier(a['tier'])) return false;
  // Cohérence score ↔ tier : re-dérivation, jamais confiance aveugle.
  if (a['score'] !== TIER_POINTS[a['tier']]) return false;
  if (!isNum(a['at']) || (a['at'] as number) < 0) return false;
  if (typeof a['viaCorrection'] !== 'boolean') return false;
  return true;
}

function validateHotRound(x: unknown): x is HotRoundResult {
  if (typeof x !== 'object' || x === null) return false;
  const r = x as Record<string, unknown>;
  if (!isStr(r['promptId']) || !isStr(r['promptText'])) return false;
  if (!(r['rawAnswer'] === null || isStr(r['rawAnswer']))) return false;
  if (!(r['answer'] === null || isStr(r['answer']))) return false;
  if (!(r['tier'] === null || isTier(r['tier']))) return false;
  const tier = r['tier'] as TierId | null;
  const expected = tier === null ? 0 : TIER_POINTS[tier];
  if (r['score'] !== expected) return false; // réconciliation score ↔ palier
  if (tier === null && r['answer'] !== null) return false;
  if (tier !== null && r['answer'] === null) return false;
  if (r['quip'] !== undefined && !isStr(r['quip'])) return false;
  return true;
}

function validateBrainRound(x: unknown): x is BrainRoundResult {
  if (typeof x !== 'object' || x === null) return false;
  const r = x as Record<string, unknown>;
  if (!isStr(r['promptId']) || !isStr(r['promptText'])) return false;
  if (!Array.isArray(r['answersGiven']) || !r['answersGiven'].every(validateAcceptedAnswer)) {
    return false;
  }
  const sum = (r['answersGiven'] as AcceptedAnswer[]).reduce((acc, a) => acc + a.score, 0);
  if (r['score'] !== sum) return false;
  if (!['timeout', 'sheet-exhausted', 'abandoned', 'won'].includes(r['endReason'] as string)) return false;
  return true;
}

export function validatePersistedDive(x: unknown): x is PersistedDiveState {
  if (typeof x !== 'object' || x === null) return false;
  const s = x as Record<string, unknown>;

  if (s['mode'] !== 'hot' && s['mode'] !== 'brain') return false;
  if (s['playKind'] !== 'daily' && s['playKind'] !== 'unlimited') return false;
  if (!isStr(s['theme']) || !isStr(s['date'])) return false;
  if (!isInt(s['dayNumber']) || (s['dayNumber'] as number) < 1) return false;
  if (!isInt(s['roundIndex']) || (s['roundIndex'] as number) < 0 || (s['roundIndex'] as number) > 6) {
    return false;
  }
  if (!isWallOrNull(s['previewEndsWall']) || !isWallOrNull(s['answerEndsWall'])) return false;
  if (s['pausedWall'] !== undefined && !isNum(s['pausedWall'])) return false;
  if (s['sessionSeed'] !== undefined && !isInt(s['sessionSeed'])) return false;
  if (s['draft'] !== undefined && !isStr(s['draft'])) return false;

  if (s['mode'] === 'hot') {
    if (!['intro', 'preview', 'answering', 'feedback', 'done'].includes(s['phase'] as string)) {
      return false;
    }
    if (!Array.isArray(s['results']) || !s['results'].every(validateHotRound)) return false;
    if ((s['results'] as unknown[]).length > 7) return false;
  } else {
    if (!['intro', 'preview', 'listing', 'done'].includes(s['phase'] as string)) return false;
    if (!Array.isArray(s['results']) || !s['results'].every(validateBrainRound)) return false;
    if ((s['results'] as unknown[]).length > 5) return false;
    if (!Array.isArray(s['currentAnswers']) || !s['currentAnswers'].every(validateAcceptedAnswer)) {
      return false;
    }
    if (!isInt(s['duplicatesIgnored']) || (s['duplicatesIgnored'] as number) < 0) return false;
  }
  return true;
}

// ── Validation des complétions persistées (historique) ──

export function validateCompletion(x: unknown): x is Completion {
  if (typeof x !== 'object' || x === null) return false;
  const c = x as Record<string, unknown>;
  if (c['mode'] !== 'hot' && c['mode'] !== 'brain') return false;
  if (c['playKind'] !== 'daily' && c['playKind'] !== 'unlimited') return false;
  if (!isStr(c['theme']) || !isStr(c['scope'])) return false;
  if (!isInt(c['game']) || (c['game'] as number) < 1) return false;
  if (!isInt(c['contentVersion'])) return false;
  if (c['endedBy'] !== 'completed' && c['endedBy'] !== 'abandoned') return false;
  if (c['imported'] !== undefined && typeof c['imported'] !== 'boolean') return false;

  if (c['mode'] === 'hot') {
    if (!Array.isArray(c['results']) || !c['results'].every(validateHotRound)) return false;
    if (!Array.isArray(c['tiers'])) return false;
    const results = c['results'] as HotRoundResult[];
    const tiers = c['tiers'] as unknown[];
    if (tiers.length !== results.length) return false;
    for (let i = 0; i < tiers.length; i++) {
      const t = tiers[i];
      if (!(t === 'miss' || isTier(t))) return false;
      if ((results[i] as HotRoundResult).tier !== (t === 'miss' ? null : t)) return false;
    }
    const sum = results.reduce((acc, r) => acc + r.score, 0);
    if (c['score'] !== sum) return false;
    if (typeof c['score'] !== 'number' || (c['score'] as number) < 0 || (c['score'] as number) > Math.max(MAX_HOT_SCORE, results.length * 100)) {
      return false;
    }
    if (c['endedBy'] === 'completed' && (results.length < 1 || results.length > 20)) return false; // rounds réglables (D-40)
  } else {
    if (!Array.isArray(c['results']) || !c['results'].every(validateBrainRound)) return false;
    const results = c['results'] as BrainRoundResult[];
    const sum = results.reduce((acc, r) => acc + r.score, 0);
    if (c['score'] !== sum) return false;
    if (!isInt(c['ceiling']) || (c['ceiling'] as number) < 0) return false;
    if ((c['score'] as number) > (c['ceiling'] as number)) return false; // invariant structurel
    const totals = c['totals'] as Record<string, unknown> | undefined;
    if (typeof totals !== 'object' || totals === null) return false;
    const accepted = results.reduce((acc, r) => acc + r.answersGiven.length, 0);
    if (totals['answersAccepted'] !== accepted) return false;
    if (!isInt(totals['duplicatesIgnored']) || (totals['duplicatesIgnored'] as number) < 0) {
      return false;
    }
    if (c['endedBy'] === 'completed' && (results.length < 1 || results.length > 20)) return false; // rounds réglables, victoire à 500 (D-40)
  }
  return true;
}
