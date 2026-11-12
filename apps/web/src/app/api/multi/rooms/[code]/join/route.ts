// POST /api/multi/rooms/[code]/join — rejoindre un salon avec un pseudo.
import { joinRoom } from '../../../../../../server/multi/room';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }): Promise<Response> {
  const { code } = await params;
  const body = (await req.json().catch(() => ({}))) as { name?: unknown };
  const name = typeof body.name === 'string' ? body.name : '';
  if (name.trim() === '') return Response.json({ error: 'Choisis un pseudo' }, { status: 400 });
  const out = await joinRoom(code, name);
  return Response.json(out, { status: 'error' in out ? 400 : 200 });
}
