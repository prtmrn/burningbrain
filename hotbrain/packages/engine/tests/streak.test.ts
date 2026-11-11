// T-11, T-28 — streak dérivé de l'historique (mecaniques §A.4, D-16, F-11)
import { describe, expect, it } from 'vitest';
import { updateStreak } from '../src/domain/streak';
import type { BrainCompletion } from '../src/domain/types';
import { makeHotCompletion } from './fixtures';

function makeBrainDaily(
  scope: string,
  endedBy: 'completed' | 'abandoned' = 'completed',
): BrainCompletion {
  return {
    mode: 'brain',
    playKind: 'daily',
    theme: 'general',
    scope,
    game: 1,
    score: 30,
    results: [
      {
        promptId: 'p-1',
        promptText: 'P',
        answersGiven: [
          { rawAnswer: 'x', answer: 'X', tier: 't3', score: 30, at: 1_000, viaCorrection: false },
        ],
        score: 30,
        endReason: 'timeout',
      },
    ],
    contentVersion: 1,
    endedBy,
    ceiling: 100,
    totals: { answersAccepted: 1, duplicatesIgnored: 0 },
  };
}

describe('streak', () => {
  it('T-11 — deux jours civils consécutifs → streak 2', () => {
    const hist = [
      makeHotCompletion(['gen-0001'], { scope: '2026-11-06' }),
      makeHotCompletion(['gen-0001'], { scope: '2026-11-07' }),
    ];
    expect(updateStreak(hist, '2026-11-08')).toBe(2);
  });

  it('T-28 — D-16/F-11 : tout mode compte ; un abandon ne casse pas mais n\'alimente pas', () => {
    // hot à J, brain à J+1 → chaîne de 2 (D-16 : tout mode, tout thème)
    const hist = [
      makeHotCompletion(['gen-0001'], { scope: '2026-11-08' }),
      makeBrainDaily('2026-11-09'),
    ];
    expect(updateStreak(hist, '2026-11-09')).toBe(2);
    // abandon seul à J+2, évalué à J+3 : la chaîne est morte → 0
    const withAbandoned = [...hist, makeBrainDaily('2026-11-10', 'abandoned')];
    expect(updateStreak(withAbandoned, '2026-11-11')).toBe(0);
    // l'abandon ne casse pas la chaîne existante tant qu'elle est vivante
    expect(updateStreak(withAbandoned, '2026-11-10')).toBe(2);
  });
});
