// ─────────────────────────────────────────────────────────────
// server/multi/pool.ts — quelles questions peuvent être tirées dans un salon.
// Règle (décision utilisateur 2026-11-12) : les questions très françaises
// (fr-only.json) ne sortent que si TOUS les joueurs sont français ; dès qu'une
// autre langue est présente, elles sont exclues.
// ─────────────────────────────────────────────────────────────
import frOnlyJson from './fr-only.json';

export const FR_ONLY_IDS: ReadonlySet<string> = new Set((frOnlyJson as { fr_only: string[] }).fr_only);

export function allowedPromptIds(all: string[], langs: string[]): string[] {
  const allFrench = langs.every((l) => l === 'fr');
  return allFrench ? all : all.filter((id) => !FR_ONLY_IDS.has(id));
}
