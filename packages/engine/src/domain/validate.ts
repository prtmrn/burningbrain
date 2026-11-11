// ─────────────────────────────────────────────────────────────
// validate.ts — pipeline de validation (mecaniques §B.6, §B.5.2)
//   1. garde longueur → 2. normalize (6 étapes) → 3. rejet muet si vide
//   → 4. exact O(1) via Map pré-calculée (answer + aliases)
//   → 5. fuzzy Damerau borné, seuil 0/1/2 selon |n| ≤ 3 / ≤ 7 / ≥ 8,
//        filtre longueur, early-exit, UNICITÉ du meilleur candidat exigée
//        → D-21 (2026-11-11) : candidat unique = ACCEPTÉ D'OFFICE avec trace
//        `corrected` (autocorrect généreux, comme l'original) ; si
//        prefs.answerCorrections === false → simple suggestion (ex-I-02).
//   Brain : dédup sur l'identité canonique de l'entrée matchée — un alias
//   d'une réponse déjà donnée = doublon ; fuzzy vers entrée déjà récoltée
//   = `duplicate` direct (pas `correction`).
// Coût borné par le contrat F-8 (≤ 2 000 clés normalisées/prompt).
// ─────────────────────────────────────────────────────────────
import { normalize } from './normalize';
import { MAX_ANSWER_LENGTH } from './constants';
import type { AcceptedAnswer, AnswerSheet, AnswerSheetEntry, PlayerPreferences } from './types';

// ── Index de feuille : exact (hash) + clés pour le fuzzy ──

export interface SheetIndex {
  exact: Map<string, AnswerSheetEntry>;          // normalized → entry
  keys: { key: string; entry: AnswerSheetEntry }[]; // toutes les clés (fuzzy)
}

/** Construit l'index d'une feuille (answer + aliases normalisés).
 *  En cas de collision de clé normalisée, la PREMIÈRE entrée gagne — le
 *  validateur de banque (CI) garantit l'unicité en amont. */
export function buildSheetIndex(sheet: AnswerSheet): SheetIndex {
  const exact = new Map<string, AnswerSheetEntry>();
  const keys: { key: string; entry: AnswerSheetEntry }[] = [];
  for (const entry of sheet.entries) {
    for (const raw of [entry.answer, ...entry.aliases]) {
      const key = normalize(raw);
      if (key === '') continue;
      if (!exact.has(key)) exact.set(key, entry);
      keys.push({ key, entry });
    }
  }
  return { exact, keys };
}

// ── Distance de Damerau-Levenshtein (OSA — transposition = 1), early-exit ──

export function damerau(a: string, b: string, maxDist: number): number {
  const n = a.length;
  const m = b.length;
  if (Math.abs(n - m) > maxDist) return maxDist + 1;
  if (n === 0) return m;
  if (m === 0) return n;

  let prev2: number[] | null = null;
  let prev: number[] = Array.from({ length: m + 1 }, (_, j) => j);
  for (let i = 1; i <= n; i++) {
    const cur: number[] = new Array<number>(m + 1);
    cur[0] = i;
    let rowMin = i;
    for (let j = 1; j <= m; j++) {
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      let v = Math.min(
        (prev[j] as number) + 1,          // suppression
        (cur[j - 1] as number) + 1,       // insertion
        (prev[j - 1] as number) + cost,   // substitution / match
      );
      if (
        prev2 !== null &&
        i > 1 && j > 1 &&
        a.charCodeAt(i - 1) === b.charCodeAt(j - 2) &&
        a.charCodeAt(i - 2) === b.charCodeAt(j - 1)
      ) {
        v = Math.min(v, (prev2[j - 2] as number) + 1); // transposition
      }
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > maxDist) return maxDist + 1; // early-exit (bande)
    prev2 = prev;
    prev = cur;
  }
  return prev[m] as number;
}

/** seuil(n) = |n| ≤ 3 → 0 · |n| ≤ 7 → 1 · sinon 2 (D-21, généreux).
 *  |n| ≤ 3 → pas de fuzzy : à cette taille, distance 1 relie des réponses
 *  distinctes légitimes. L'UNICITÉ du candidat reste la garde ("rome"/"lome"
 *  à égalité → rejet, jamais de choix arbitraire). */
export function fuzzyThreshold(len: number): number {
  return len <= 3 ? 0 : len <= 7 ? 1 : 2;
}

/** Meilleur candidat fuzzy, UNICITÉ exigée au niveau de l'ENTRÉE
 *  (deux clés d'une même entrée à distance d* ne sont pas un ex æquo). */
function findFuzzyCandidate(
  n: string,
  keys: { key: string; entry: AnswerSheetEntry }[],
  threshold: number,
): AnswerSheetEntry | null {
  let best = threshold + 1;
  let bestEntries: AnswerSheetEntry[] = [];
  for (const { key, entry } of keys) {
    if (Math.abs(key.length - n.length) > threshold) continue; // filtre longueur
    const d = damerau(n, key, threshold);
    if (d < best) {
      best = d;
      bestEntries = [entry];
    } else if (d === best) {
      if (!bestEntries.includes(entry)) bestEntries.push(entry);
    }
  }
  if (best <= threshold && bestEntries.length === 1) return bestEntries[0] as AnswerSheetEntry;
  return null;
}

// ── Résultats de validation ──

/** `corrected` présent = acceptée par autocorrect (D-21) : `from` = saisie,
 *  `to` = forme canonique. Absent = match exact. */
export interface AppliedCorrection {
  from: string;
  to: string;
}

export type HotValidation =
  | { kind: 'accept'; entry: AnswerSheetEntry; corrected?: AppliedCorrection }
  | { kind: 'correction'; to: string }
  | { kind: 'rejected' }
  | { kind: 'none' };

export type ListingValidation =
  | { kind: 'accept'; entry: AnswerSheetEntry; corrected?: AppliedCorrection }
  | { kind: 'duplicate'; entry: AnswerSheetEntry }
  | { kind: 'correction'; to: string }
  | { kind: 'rejected' }
  | { kind: 'none' };

// ── Hot : une réponse par prompt ──

export function validateAnswer(
  input: string,
  sheet: AnswerSheet,
  prefs: PlayerPreferences,
  index?: SheetIndex,
  maxLength: number = MAX_ANSWER_LENGTH,
): HotValidation {
  if (input.length > maxLength) return { kind: 'rejected' }; // garde amont
  const n = normalize(input);
  if (n === '') return { kind: 'none' };                     // rejet muet
  const idx = index ?? buildSheetIndex(sheet);
  const hit = idx.exact.get(n);
  if (hit) return { kind: 'accept', entry: hit };            // O(1)
  // D-21 : candidat fuzzy UNIQUE → accepté d'office (trace `corrected`) ;
  // préférence off → simple suggestion à confirmer.
  const th = fuzzyThreshold(n.length);
  if (th > 0) {
    const candidate = findFuzzyCandidate(n, idx.keys, th);
    if (candidate) {
      return prefs.answerCorrections
        ? { kind: 'accept', entry: candidate, corrected: { from: input, to: candidate.answer } }
        : { kind: 'correction', to: candidate.answer };
    }
  }
  return { kind: 'rejected' };
}

// ── Brain : accumulation avec dédup canonique ──

export function validateListing(
  input: string,
  sheet: AnswerSheet,
  currentAnswers: AcceptedAnswer[],
  prefs: PlayerPreferences,
  index?: SheetIndex,
  maxLength: number = MAX_ANSWER_LENGTH,
): ListingValidation {
  if (input.length > maxLength) return { kind: 'rejected' };
  const n = normalize(input);
  if (n === '') return { kind: 'none' };
  const idx = index ?? buildSheetIndex(sheet);

  // Dédup sur l'identité canonique (forme `answer` de l'entrée), jamais sur
  // la chaîne saisie — un alias d'une réponse déjà donnée = doublon.
  const alreadyGiven = new Set(currentAnswers.map((a) => a.answer));

  const hit = idx.exact.get(n);
  if (hit) {
    return alreadyGiven.has(hit.answer)
      ? { kind: 'duplicate', entry: hit }
      : { kind: 'accept', entry: hit };
  }
  const th = fuzzyThreshold(n.length);
  if (th > 0) {
    const candidate = findFuzzyCandidate(n, idx.keys, th);
    if (candidate) {
      // Fuzzy vers une entrée DÉJÀ RÉCOLTÉE → `duplicate` direct.
      if (alreadyGiven.has(candidate.answer)) return { kind: 'duplicate', entry: candidate };
      // D-21 : unique → accepté d'office ; préférence off → suggestion.
      return prefs.answerCorrections
        ? { kind: 'accept', entry: candidate, corrected: { from: input, to: candidate.answer } }
        : { kind: 'correction', to: candidate.answer };
    }
  }
  return { kind: 'rejected' };
}
