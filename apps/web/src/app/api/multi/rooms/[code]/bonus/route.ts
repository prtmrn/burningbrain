// POST /api/multi/rooms/[code]/bonus — active le bonus x2 (premier joueur à l'objectif, mode Brain).
import { activateBonus } from '../../../../../../server/multi/room';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }): Promise<Response> {
  const { code } = await params;
  const body = (await req.json().catch(() => ({}))) as { playerId?: unknown };
  const playerId = typeof body.playerId === 'string' ? body.playerId : '';
  const out = await activateBonus(code, playerId);
  return Response.json(out, { status: 'error' in out ? 400 : 200 });
}
