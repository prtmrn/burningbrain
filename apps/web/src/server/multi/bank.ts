// ─────────────────────────────────────────────────────────────
// server/multi/bank.ts — banques de questions côté serveur, lues depuis le
// site déployé (public/content). Mises en cache par instance.
// ─────────────────────────────────────────────────────────────
import { assembleBank, type LoadedBank } from '@hotbrain/engine';

const cache = new Map<string, LoadedBank>();

export async function loadBank(theme: string, origin: string): Promise<LoadedBank> {
  const key = `${origin}|${theme}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const manifestRes = await fetch(`${origin}/content/manifest.json`, { cache: 'no-store' });
  if (!manifestRes.ok) throw new Error('manifest indisponible');
  const manifest = (await manifestRes.json()) as Record<string, { contentVersion: number }>;
  const entry = manifest[theme];
  if (!entry) throw new Error(`thème inconnu : ${theme}`);
  const res = await fetch(`${origin}/content/${theme}.v${entry.contentVersion}.json`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`banque indisponible : ${theme}`);
  const bank = assembleBank(await res.json(), theme);
  cache.set(key, bank);
  return bank;
}
