// Brain en durée illimitée : pas de seuil de 500 neurones (la victoire est 100 %).
import { describe, expect, it } from 'vitest';
import { configFor, UNLIMITED_ROUND_MS } from '../src/config';

describe('configFor — Brain illimité', () => {
  it('retire le seuil de victoire en 500 neurones', () => {
    const cfg = configFor('brain', { rounds: 3, roundSec: 0, difficulty: 'auto' });
    expect(cfg.modes.brain.winScore).toBeUndefined();
    expect(cfg.modes.brain.roundMs).toBe(UNLIMITED_ROUND_MS);
    expect(cfg.modes.brain.rounds).toBe(3);
  });
  it('garde le seuil et la durée choisie en temps limité', () => {
    const cfg = configFor('brain', { rounds: 5, roundSec: 60, difficulty: 'auto' });
    expect(cfg.modes.brain.winScore).toBe(500);
    expect(cfg.modes.brain.roundMs).toBe(60_000);
  });
});
