// ─────────────────────────────────────────────────────────────
// history-store.ts — complétions persistées (clé hotbrain:history:v1)
// Index logique mode:theme:scope (§D.1) ; borne 400 complétions (FIFO) ;
// clés inconnues conservées à l'écriture (forward-compat — P-3) ;
// entrées invalides rejetées une à une, jamais de crash (P-2).
// ─────────────────────────────────────────────────────────────
import {
  readEnvelope,
  validateCompletion,
  wrap,
  type Completion,
  type KeyValueStore,
} from '@hotbrain/engine';
import { keys } from './keys';
import { CURRENT, MIGRATIONS } from './migrations';

export const HISTORY_CAP = 400;

/** Index de dédup : une complétion par (mode, theme, scope). */
export function historyIndex(c: Completion): string {
  return `${c.mode}:${c.theme}:${c.scope}`;
}

interface HistoryRead {
  completions: Completion[];
  /** Champs inconnus de l'enveloppe data — réécrits tels quels. */
  rest: Record<string, unknown>;
}

function readHistory(kv: KeyValueStore): HistoryRead {
  const data = readEnvelope(kv.getItem(keys.history), CURRENT, MIGRATIONS, (d) => {
    if (typeof d !== 'object' || d === null) return null;
    const rec = d as Record<string, unknown>;
    if (!Array.isArray(rec['completions'])) return null;
    return rec;
  });
  if (data === null) return { completions: [], rest: {} };
  const completions: Completion[] = [];
  for (const c of data['completions'] as unknown[]) {
    // Rejet propre entrée par entrée : une complétion corrompue n'emporte
    // pas l'historique (P-2).
    if (validateCompletion(c)) completions.push(c);
  }
  const { completions: _dropped, ...rest } = data;
  return { completions, rest };
}

export function loadHistory(kv: KeyValueStore): Completion[] {
  return readHistory(kv).completions;
}

/** Persiste une complétion (idempotent par index mode:theme:scope),
 *  borne 400 en FIFO (les plus anciennes sortent d'abord). */
export function saveCompletion(kv: KeyValueStore, c: Completion): Completion[] {
  const { completions, rest } = readHistory(kv);
  const idx = completions.findIndex((x) => historyIndex(x) === historyIndex(c));
  if (idx >= 0) completions.splice(idx, 1);
  completions.push(c);
  while (completions.length > HISTORY_CAP) completions.shift();
  kv.setItem(keys.history, JSON.stringify(wrap({ ...rest, completions })));
  return completions;
}

export function clearHistory(kv: KeyValueStore): void {
  kv.removeItem(keys.history);
}
