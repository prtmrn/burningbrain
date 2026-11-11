// ─────────────────────────────────────────────────────────────
// bank.ts — assemblage d'une banque chargée (index pré-calculés)
// La SOURCE (fetch / fichier) est injectée par l'app : ce module ne connaît
// que des objets déjà lus. Validation au chargement (mêmes règles que la CI).
// ─────────────────────────────────────────────────────────────
import { buildSheetIndex, type SheetIndex } from '../domain/validate';
import type { AnswerSheet, Prompt, ThemeId } from '../domain/types';
import { validatePromptBank } from './schemas';

/** Banque assemblée, prête pour le domaine (PromptBank + index par feuille). */
export interface LoadedBank {
  theme: ThemeId;
  contentVersion: number;
  prompts: Prompt[];
  sheets: Map<string, AnswerSheet>;
  indexes: Map<string, SheetIndex>;
}

/** Valide puis assemble une banque. Lève une erreur explicite si le contenu
 *  est corrompu (garde au boot — jamais de session sur banque invalide). */
export function assembleBank(raw: unknown, expectedTheme?: ThemeId): LoadedBank {
  const parsed = validatePromptBank(raw);
  if (!parsed) throw new Error('assembleBank: invalid bank payload');
  if (expectedTheme !== undefined && parsed.theme !== expectedTheme) {
    throw new Error(`assembleBank: theme "${parsed.theme}" ≠ expected "${expectedTheme}"`);
  }
  const sheets = new Map<string, AnswerSheet>();
  const indexes = new Map<string, SheetIndex>();
  for (const p of parsed.prompts) {
    const sheet = parsed.sheets[p.id];
    if (!sheet) throw new Error(`assembleBank: missing sheet for prompt "${p.id}"`);
    sheets.set(p.id, sheet);
    indexes.set(p.id, buildSheetIndex(sheet));
  }
  for (const id of Object.keys(parsed.sheets)) {
    if (!sheets.has(id)) throw new Error(`assembleBank: orphan sheet "${id}"`);
  }
  return {
    theme: parsed.theme,
    contentVersion: parsed.contentVersion,
    prompts: parsed.prompts,
    sheets,
    indexes,
  };
}
