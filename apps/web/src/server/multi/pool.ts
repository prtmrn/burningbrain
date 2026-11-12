// ─────────────────────────────────────────────────────────────
// server/multi/pool.ts — quelles questions peuvent être tirées dans un salon.
// · Salon 100 % français : toutes les questions, y compris les très françaises
//   (fr-only.json) ; décision utilisateur 2026-11-12.
// · Salon avec une autre langue : seules les 100 questions traduites
//   (i18n-pool.json), qui n'ont aucune question très française.
// ─────────────────────────────────────────────────────────────
import frOnlyJson from './fr-only.json';
import i18nPool from './i18n-pool.json';

export const FR_ONLY_IDS: ReadonlySet<string> = new Set((frOnlyJson as { fr_only: string[] }).fr_only);
export const I18N_IDS: ReadonlySet<string> = new Set(i18nPool as string[]);

export function allowedPromptIds(all: string[], langs: string[]): string[] {
  const allFrench = langs.every((l) => l === 'fr');
  return allFrench ? all : all.filter((id) => I18N_IDS.has(id) && !FR_ONLY_IDS.has(id));
}
