// ─────────────────────────────────────────────────────────────
// server/multi/bank.ts — banques de questions côté serveur, lues depuis le
// site déployé (public/content). Mises en cache par instance.
// Langue : 'fr' → banque française ; 'en' / 'es' → banque « <thème>-<langue> »
// (seul le Général est traduit).
// ─────────────────────────────────────────────────────────────
import { assembleBank, type LoadedBank } from '@hotbrain/engine';

const cache = new Map<string, LoadedBank>();

export function bankKey(theme: string, lang: string): string {
  return lang === 'fr' ? theme : `${theme}-${lang}`;
}

export async function loadBank(theme: string, origin: string, lang = 'fr'): Promise<LoadedBank> {
  const key = bankKey(theme, lang);
  const cacheKey = `${origin}|${key}`;
  const hit = cache.get(cacheKey);
  if (hit) return hit;
  const manifestRes = await fetch(`${origin}/content/manifest.json`, { cache: 'no-store' });
  if (!manifestRes.ok) throw new Error('manifest indisponible');
  const manifest = (await manifestRes.json()) as Record<string, { contentVersion: number }>;
  const entry = manifest[key];
  if (!entry) throw new Error(`banque inconnue : ${key}`);
  const res = await fetch(`${origin}/content/${key}.v${entry.contentVersion}.json`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`banque indisponible : ${key}`);
  const bank = assembleBank(await res.json(), key);
  cache.set(cacheKey, bank);
  return bank;
}
