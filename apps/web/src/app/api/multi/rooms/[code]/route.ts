// GET /api/multi/rooms/[code]?player=ID — état du salon (phase, classement).
import { getKv } from '../../../../../server/multi/kv';
import { getAnswers, getMeta, getPlayers, rankingOf } from '../../../../../server/multi/room';
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
  const bank = await loadBank(meta.theme, url.origin);

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
    ranking: rankingOf(players, answers),
    current,
    mine,
    reveal,
  });
}
