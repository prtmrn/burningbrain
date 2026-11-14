// GET /api/multi/rooms/[code]?player=ID — état du salon (phase, classement).
import { getKv } from '../../../../../server/multi/kv';
import { getAnswers, getMeta, getPlayers, passStatus, rankingOf, resolveFlags } from '../../../../../server/multi/room';
import { loadBank } from '../../../../../server/multi/bank';
import { phaseAt } from '../../../../../server/multi/phase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }): Promise<Response> {
  const { code: raw } = await params;
  const code = raw.toUpperCase();
  const url = new URL(req.url);
  const playerId = url.searchParams.get('player') ?? '';
  const kv = getKv();
  const meta = await getMeta(kv, code);
  if (!meta) return Response.json({ error: 'Salon introuvable' }, { status: 404 });
  const now = Date.now();
  const phase = phaseAt(meta, now);
  const players = await getPlayers(kv, code);
  const answers = await getAnswers(kv, code);
  const flags = await resolveFlags(kv, code, meta, players, answers, now);
  const finalAnswers = await getAnswers(kv, code);
  const viewerLang = players.find((p) => p.id === playerId)?.lang ?? 'fr';
  const bank = await loadBank(meta.theme, url.origin, viewerLang);

  const promptOf = (round: number): string => {
    const id = meta.promptIds[round];
    return bank.prompts.find((p) => p.id === id)?.text ?? '';
  };

  const mine: Record<number, { answer: string; tier: string; score: number }> = {};
  for (const a of answers) {
    if (a.playerId === playerId) mine[a.round] = { answer: a.answer, tier: a.tier, score: a.score };
  }

  let current: { round: number; text: string } | null = null;
  if (phase.kind === 'preview' || phase.kind === 'answering') {
    current = { round: phase.round, text: promptOf(phase.round) };
  }
  const pass = phase.kind === 'answering' ? await passStatus(kv, code, phase.round, playerId) : null;

  let reveal: { round: number; text: string; entries: { answer: string; tier: string }[] }[] | null = null;
  if (phase.kind === 'done') {
    reveal = meta.promptIds.map((id, round) => {
      const sheet = bank.sheets.get(id);
      return {
        round,
        text: promptOf(round),
        entries: (sheet?.entries ?? []).map((e) => ({ answer: e.answer, tier: e.tier })),
      };
    });
  }

  return Response.json({
    now,
    code,
    theme: meta.theme,
    rounds: meta.rounds,
    roundSec: meta.roundSec,
    previewMs: meta.previewMs,
    roundMs: meta.roundMs,
    isHost: playerId === meta.hostId,
    phase,
    players,
    mode: meta.mode === 'brain' ? 'brain' : 'hot',
    brainGoal: meta.brainGoal ?? 500,
    showScores: meta.showScores === true,
    goalFirstId: meta.goalFirstId ?? null,
    bonusUsedBy: meta.bonusUsedBy ?? null,
    bonusUntil: meta.bonusUntil ?? null,
    winnerId: phase.kind === 'done' ? rankingOf(players, finalAnswers)[0]?.playerId ?? null : null,
    flags: flags.map((f) => ({ id: f.id, round: f.round, playerId: f.playerId, name: f.name, input: f.input, status: f.status, yes: Object.values(f.votes).filter(Boolean).length, no: Object.values(f.votes).filter((v) => !v).length, myVote: f.votes[playerId] ?? null, mine: f.playerId === playerId })),
    myAnswers: finalAnswers
      .filter((x) => x.playerId === playerId)
      .map((x) => ({ round: x.round, answer: x.answer, tier: x.tier, score: x.score }))
      .sort((x, y) => x.round - y.round),
    ranking:
      meta.mode === 'brain' && meta.showScores !== true && phase.kind !== 'done'
        ? rankingOf(players, finalAnswers).filter((r) => r.playerId === playerId)
        : rankingOf(players, finalAnswers),
    current,
    pass,
    mine,
    reveal,
  });
}
