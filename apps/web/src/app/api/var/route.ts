// POST /api/var — arbitrage d'une réponse refusée par un juge IA gratuit.
// Fournisseurs (au moins une clé requise) : GEMINI_API_KEY (Google AI Studio,
// offre gratuite) puis GROQ_API_KEY (offre gratuite). Sans clé : 503.
import { NextResponse } from 'next/server';
import { buildJudgePrompt, parseVerdict, VAR_MAX_INPUT } from '../../../var/judge';

export const runtime = 'nodejs';

// Garde-fou anti-abus (best effort : mémoire de l'instance) : 12 appels / 10 min / IP
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 12;
}

async function askGemini(prompt: string, key: string): Promise<string> {
  const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0, responseMimeType: 'application/json', thinkingConfig: { thinkingBudget: 0 } },
    }),
    signal: AbortSignal.timeout(12_000),
  });
  if (!r.ok) throw new Error(`gemini ${r.status}`);
  const j = (await r.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  return j.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

async function askGroq(prompt: string, key: string): Promise<string> {
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }],
    }),
    signal: AbortSignal.timeout(12_000),
  });
  if (!r.ok) throw new Error(`groq ${r.status}`);
  const j = (await r.json()) as { choices?: { message?: { content?: string } }[] };
  return j.choices?.[0]?.message?.content ?? '';
}

export async function POST(req: Request): Promise<Response> {
  const gemini = process.env.GEMINI_API_KEY;
  const groq = process.env.GROQ_API_KEY;
  if (!gemini && !groq) return NextResponse.json({ error: 'unavailable' }, { status: 503 });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (limited(ip)) return NextResponse.json({ error: 'rate' }, { status: 429 });

  let body: { question?: unknown; answer?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: 'bad' }, { status: 400 });
  }
  const question = typeof body.question === 'string' ? body.question.trim().slice(0, 300) : '';
  const answer = typeof body.answer === 'string' ? body.answer.trim().slice(0, VAR_MAX_INPUT) : '';
  if (!question || !answer) return NextResponse.json({ error: 'bad' }, { status: 400 });

  const prompt = buildJudgePrompt(question, answer);
  const providers: (() => Promise<string>)[] = [];
  if (gemini) providers.push(() => askGemini(prompt, gemini));
  if (groq) providers.push(() => askGroq(prompt, groq));
  for (const ask of providers) {
    try {
      const verdict = parseVerdict(await ask(), answer);
      if (!verdict) continue;
      // Stockage 0 € : journal serveur (Vercel Logs) à relire pour enrichir les feuilles
      console.log(`[VAR] ${JSON.stringify({ question, input: answer, ...verdict })}`);
      return NextResponse.json(verdict);
    } catch {
      /* fournisseur suivant */
    }
  }
  return NextResponse.json({ error: 'failed' }, { status: 502 });
}
