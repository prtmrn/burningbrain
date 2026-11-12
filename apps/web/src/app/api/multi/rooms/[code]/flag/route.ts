// POST /api/multi/rooms/[code]/flag — signale une réponse refusée à tort ; les autres joueurs votent.
import { flagAnswer } from '../../../../../../server/multi/room';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }): Promise<Response> {
  const { code } = await params;
  const body = (await req.json().catch(() => ({}))) as { playerId?: unknown; input?: unknown };
  const playerId = typeof body.playerId === 'string' ? body.playerId : '';
  const input = typeof body.input === 'string' ? body.input : '';
  const out = await flagAnswer(code, playerId, input);
  return Response.json(out, { status: 'error' in out ? 400 : 200 });
}
