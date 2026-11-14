// ─────────────────────────────────────────────────────────────
// config.ts — GameConfig HotBrain (spec v2 §A.2 src/config.ts)
// Valeurs injectées dans l'engine — D-13 : timezone NY, epochDate de dev
// (À FIXER au lancement), formats actés 7 × (3 s + 30 s) et 5 × (3 s + 60 s). D-26 : 30 s (et non 25 s).
// ─────────────────────────────────────────────────────────────
import type { DifficultyChoice, GameConfig } from '@hotbrain/engine';

export const hotbrainConfig: GameConfig = {
  timezone: 'America/New_York',
  epochDate: '2026-11-09', // epoch de dev — à fixer au lancement
  modes: {
    hot: { rounds: 7, previewMs: 3_000, roundMs: 30_000 },
    brain: { rounds: 5, previewMs: 3_000, roundMs: 60_000, winScore: 500 },
  },
  maxAnswerLength: 256,
};

/** D-40 : le cerveau est plein (partie Brain gagnée) à 500 neurones. */
export const BRAIN_GOAL = 500;

/** D-40 : réglages choisis avant une partie classique. */
export interface GameSetup {
  rounds: number;
  roundSec: number;
  /** absent = auto (toutes les questions). */
  difficulty?: DifficultyChoice;
}
export const DIFFICULTY_OPTIONS: readonly DifficultyChoice[] = ['auto', 'easy', 'medium', 'hard'];
/** Durée « illimitée » (Brain seulement) : 24 h, jamais atteinte en pratique ;
 *  la manche se termine à l'épuisement de la feuille ou quand le joueur passe. */
export const UNLIMITED_ROUND_MS = 24 * 60 * 60 * 1000;
export function isUnlimitedRound(roundMs: number): boolean {
  return roundMs >= UNLIMITED_ROUND_MS;
}
/** 0 secondes = illimité (Brain). */
export const SETUP_OPTIONS: Record<'hot' | 'brain', { rounds: number[]; roundSec: number[] }> = {
  hot: { rounds: [3, 5, 7, 10], roundSec: [15, 30, 45, 60] },
  brain: { rounds: [3, 5, 7], roundSec: [0, 30, 60, 90, 120] },
};
export function defaultSetup(mode: 'hot' | 'brain'): GameSetup {
  const m = hotbrainConfig.modes[mode];
  return { rounds: m.rounds, roundSec: m.roundMs / 1000, difficulty: 'auto' };
}
export function configFor(mode: 'hot' | 'brain', setup?: GameSetup): GameConfig {
  if (!setup) return hotbrainConfig;
  return {
    ...hotbrainConfig,
    modes: {
      ...hotbrainConfig.modes,
      [mode]: {
        ...hotbrainConfig.modes[mode],
        rounds: setup.rounds,
        roundMs: setup.roundSec === 0 ? UNLIMITED_ROUND_MS : setup.roundSec * 1000,
      },
    },
  };
}
