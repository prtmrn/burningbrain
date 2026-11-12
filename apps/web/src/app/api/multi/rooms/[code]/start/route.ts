// POST /api/multi/rooms/[code]/start — l'hôte lance la partie (départ dans 5 s).
import { startRoom } from '../../../../../../server/multi/room';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }): Promise<Response> {
  const { code } = await params;
  const body = (await req.json().catch(() => ({}))) as { playerId?: unknown };
  const playerId = typeof body.playerId === 'string' ? body.playerId : '';
  const out = await startRoom(code, playerId);
  return Response.json(out, { status: 'error' in out ? 400 : 200 });
}
