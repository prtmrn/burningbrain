// client.ts — côté navigateur : appel du VAR, ajout à la feuille, journal local.
import { buildSheetIndex, type LoadedBank } from '@hotbrain/engine';
import type { VarVerdict } from './judge';

export type VarOutcome = { kind: 'ok'; verdict: VarVerdict } | { kind: 'error' };

export async function requestVar(question: string, answer: string): Promise<VarOutcome> {
  try {
    const r = await fetch('/api/var', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question, answer }),
    });
    if (!r.ok) return { kind: 'error' };
    return { kind: 'ok', verdict: (await r.json()) as VarVerdict };
  } catch {
    return { kind: 'error' };
  }
}

/** Ajoute la réponse validée à la feuille de la question (le temps de la partie)
 *  pour que la saisie suivante soit acceptée normalement. */
export function acceptIntoSheet(bank: LoadedBank, promptId: string, verdict: VarVerdict, rawInput: string): void {
  const sheet = bank.sheets.get(promptId);
  if (!sheet) return;
  sheet.entries.push({
    answer: verdict.answer,
    tier: verdict.tier,
    aliases: rawInput === verdict.answer ? [] : [rawInput],
  });
  bank.indexes.set(promptId, buildSheetIndex(sheet));
}

/** Journal local des contestations (relecture / enrichissement des feuilles). */
export function logVar(storage: Pick<Storage, 'getItem' | 'setItem'>, entry: Record<string, unknown>): void {
  try {
    const key = 'hotbrain:var-log:v1';
    const list = JSON.parse(storage.getItem(key) ?? '[]') as unknown[];
    list.push({ ...entry, at: Date.now() });
    storage.setItem(key, JSON.stringify(list.slice(-200)));
  } catch {
    /* stockage indisponible */
  }
}
