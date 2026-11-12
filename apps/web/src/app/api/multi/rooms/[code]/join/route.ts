// POST /api/multi/rooms/[code]/join — rejoindre un salon avec un pseudo.
import { joinRoom } from '../../../../../../server/multi/room';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }): Promise<Response> {
  const { code } = await params;
  const body = (await req.json().catch(() => ({}))) as { name?: unknown; lang?: unknown };
  const name = typeof body.name === 'string' ? body.name : '';
  const lang = typeof body.lang === 'string' ? body.lang : 'fr';
  if (name.trim() === '') return Response.json({ error: 'Choisis un pseudo' }, { status: 400 });
  const out = await joinRoom(code, name, lang);
  return Response.json(out, { status: 'error' in out ? 400 : 200 });
}
