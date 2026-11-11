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
    brain: { rounds: 5, previewMs: 3_000, roundMs: 60_000 },
  },
  maxAnswerLength: 256,
};
