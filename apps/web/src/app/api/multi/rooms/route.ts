// POST /api/multi/rooms — crée un salon (l'appelant en devient l'hôte).
import { createRoom } from '../../../../server/multi/room';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const THEMES = ['general', 'geography', 'entertainment', 'history', 'arts-literature', 'science-nature', 'sports-leisure'];

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: 'Requête invalide' }, { status: 400 });
  const name = typeof body['name'] === 'string' ? body['name'] : '';
  const theme = typeof body['theme'] === 'string' ? body['theme'] : 'general';
  const rounds = Number(body['rounds'] ?? 7);
  const roundSec = Number(body['roundSec'] ?? 30);
  const lang = typeof body['lang'] === 'string' && ['fr', 'en', 'es'].includes(body['lang']) ? body['lang'] : 'fr';
  if (!THEMES.includes(theme)) return Response.json({ error: 'Thème inconnu' }, { status: 400 });
  if (![3, 5, 7, 10].includes(rounds) || ![15, 30, 45, 60].includes(roundSec)) {
    return Response.json({ error: 'Réglages invalides' }, { status: 400 });
  }
  try {
    const out = await createRoom({ name, lang, theme, rounds, roundSec, origin: new URL(req.url).origin });
    return Response.json(out);
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : 'Erreur' }, { status: 500 });
  }
}
