// ─────────────────────────────────────────────────────────────
// config.ts — GameConfig HotBrain (spec v2 §A.2 src/config.ts)
// Valeurs injectées dans l'engine — D-13 : timezone NY, epochDate de dev
// (À FIXER au lancement), formats actés 7 × (3 s + 30 s) et 5 × (3 s + 60 s). D-26 : 30 s (et non 25 s).
// ─────────────────────────────────────────────────────────────
import type { GameConfig } from '@hotbrain/engine';

export const hotbrainConfig: GameConfig = {
  timezone: 'America/New_York',
  epochDate: '2026-11-09', // epoch de dev — à fixer au lancement
  modes: {
    hot: { rounds: 7, previewMs: 3_000, roundMs: 30_000 },
    brain: { rounds: 5, previewMs: 3_000, roundMs: 60_000, winScore: 500 },
  },
  maxAnswerLength: 256,
};

/** D-30 : le cerveau est plein (partie Brain gagnée) à 500 neurones. */
export const BRAIN_GOAL = 500;

/** D-30 : réglages choisis avant une partie classique. */
export interface GameSetup {
  rounds: number;
  roundSec: number;
}
export const SETUP_OPTIONS: Record<'hot' | 'brain', { rounds: number[]; roundSec: number[] }> = {
  hot: { rounds: [3, 5, 7, 10], roundSec: [15, 30, 45, 60] },
  brain: { rounds: [3, 5, 7], roundSec: [30, 60, 90, 120] },
};
export function defaultSetup(mode: 'hot' | 'brain'): GameSetup {
  const m = hotbrainConfig.modes[mode];
  return { rounds: m.rounds, roundSec: m.roundMs / 1000 };
}
export function configFor(mode: 'hot' | 'brain', setup?: GameSetup): GameConfig {
  if (!setup) return hotbrainConfig;
  return {
    ...hotbrainConfig,
    modes: {
      ...hotbrainConfig.modes,
      [mode]: { ...hotbrainConfig.modes[mode], rounds: setup.rounds, roundMs: setup.roundSec * 1000 },
    },
  };
}
