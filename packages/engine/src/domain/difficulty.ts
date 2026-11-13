// ─────────────────────────────────────────────────────────────
// difficulty.ts — réglage de difficulté (Auto / Facile / Moyen / Difficile).
// Le niveau de chaque question est calculé hors moteur (content/build/assign_difficulty.py).
// ─────────────────────────────────────────────────────────────
import type { Difficulty, DifficultyChoice, Prompt } from './types';

export const DIFFICULTY_CHOICES: readonly DifficultyChoice[] = ['auto', 'easy', 'medium', 'hard'];

export function isDifficultyChoice(x: unknown): x is DifficultyChoice {
  return typeof x === 'string' && (DIFFICULTY_CHOICES as readonly string[]).includes(x);
}

/** 'auto' (ou absent) → toutes les questions ; sinon seulement le niveau demandé. */
export function filterByDifficulty<P extends Pick<Prompt, 'difficulty'>>(
  prompts: readonly P[],
  choice: DifficultyChoice | undefined,
): P[] {
  if (!choice || choice === 'auto') return [...prompts];
  const wanted: Difficulty = choice;
  return prompts.filter((p) => p.difficulty === wanted);
}
