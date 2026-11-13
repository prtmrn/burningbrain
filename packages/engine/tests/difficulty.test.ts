import { describe, expect, it } from 'vitest';
import { filterByDifficulty, isDifficultyChoice } from '../src/domain/difficulty';
import { validatePrompt } from '../src/data/schemas';

const prompts = [
  { id: 'a', difficulty: 'easy' as const },
  { id: 'b', difficulty: 'medium' as const },
  { id: 'c', difficulty: 'hard' as const },
  { id: 'd' },
];

describe('réglage de difficulté', () => {
  it("'auto' et absent gardent toutes les questions", () => {
    expect(filterByDifficulty(prompts, 'auto')).toHaveLength(4);
    expect(filterByDifficulty(prompts, undefined)).toHaveLength(4);
  });
  it('un niveau ne garde que ses questions', () => {
    expect(filterByDifficulty(prompts, 'easy').map((p) => p.id)).toEqual(['a']);
    expect(filterByDifficulty(prompts, 'hard').map((p) => p.id)).toEqual(['c']);
  });
  it('reconnaît les valeurs de réglage', () => {
    expect(['auto', 'easy', 'medium', 'hard'].every(isDifficultyChoice)).toBe(true);
    expect(isDifficultyChoice('expert')).toBe(false);
  });
  it('validatePrompt garde un niveau valide et rejette un niveau inconnu', () => {
    expect(validatePrompt({ id: 'x', theme: 'general', text: 'T', difficulty: 'medium' })?.difficulty).toBe('medium');
    expect(validatePrompt({ id: 'x', theme: 'general', text: 'T' })).not.toBeNull();
    expect(validatePrompt({ id: 'x', theme: 'general', text: 'T', difficulty: 'expert' })).toBeNull();
  });
});
