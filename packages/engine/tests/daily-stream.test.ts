// D-42 — partie du jour : parcours sans répétition entre jours et entre modes.
import { describe, expect, it } from 'vitest';
import { seedDaily } from '../src/domain/selection';
import type { GameConfig, PromptBank } from '../src/domain/types';

const config = {
  timezone: 'America/New_York',
  epochDate: '2026-11-09',
  modes: { hot: { rounds: 7, previewMs: 3000, roundMs: 30000 }, brain: { rounds: 5, previewMs: 3000, roundMs: 60000 } },
  maxAnswerLength: 256,
} as GameConfig;

const bank = {
  theme: 'general',
  contentVersion: 2,
  prompts: Array.from({ length: 97 }, (_, i) => ({ id: `p${i}`, theme: 'general', text: `q${i}` })),
  sheets: {},
} as unknown as PromptBank;

describe('partie du jour (D-42)', () => {
  it('deux jours consécutifs ne partagent aucune question tant que la banque tient', () => {
    const seen = new Set<string>();
    for (let day = 1; day <= 8; day++) {
      const hot = seedDaily('general', 'hot', day, bank, config);
      const brain = seedDaily('general', 'brain', day, bank, config);
      expect(hot).toHaveLength(7);
      expect(brain).toHaveLength(5);
      expect(new Set([...hot, ...brain]).size).toBe(12); // Hot et Brain disjoints le même jour
      for (const id of [...hot, ...brain]) {
        expect(seen.has(id), `${id} répété au jour ${day}`).toBe(false);
        seen.add(id);
      }
    }
  });

  it('une série change d\'un jour à l\'autre', () => {
    const d1 = seedDaily('general', 'hot', 1, bank, config).join();
    const d2 = seedDaily('general', 'hot', 2, bank, config).join();
    expect(d1).not.toBe(d2);
  });

  it('déterministe : même jour, même série', () => {
    expect(seedDaily('general', 'brain', 5, bank, config)).toEqual(seedDaily('general', 'brain', 5, bank, config));
  });
});
