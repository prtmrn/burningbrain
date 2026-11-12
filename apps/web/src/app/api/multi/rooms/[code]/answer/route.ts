// POST /api/multi/rooms/[code]/answer — une réponse, jugée côté serveur.
import { submitAnswer } from '../../../../../../server/multi/room';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }): Promise<Response> {
  const { code } = await params;
  const body = (await req.json().catch(() => ({}))) as { playerId?: unknown; input?: unknown };
  const playerId = typeof body.playerId === 'string' ? body.playerId : '';
  const input = typeof body.input === 'string' ? body.input : '';
  const verdict = await submitAnswer(code, playerId, input, new URL(req.url).origin);
  return Response.json(verdict);
}
