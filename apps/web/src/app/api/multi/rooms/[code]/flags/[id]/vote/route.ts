// POST /api/multi/rooms/[code]/flags/[id]/vote — un joueur accepte ou refuse un signalement.
import { voteFlag } from '../../../../../../../../server/multi/room';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: Promise<{ code: string; id: string }> }): Promise<Response> {
  const { code, id } = await params;
  const body = (await req.json().catch(() => ({}))) as { playerId?: unknown; accept?: unknown };
  const playerId = typeof body.playerId === 'string' ? body.playerId : '';
  const out = await voteFlag(code, playerId, decodeURIComponent(id), body.accept === true);
  return Response.json(out, { status: 'error' in out ? 400 : 200 });
}
