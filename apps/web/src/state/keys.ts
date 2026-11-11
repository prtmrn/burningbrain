// ─────────────────────────────────────────────────────────────
// keys.ts — namespace `hotbrain` (D-06) et clés Ontologie v3.1 §D.1
// SEUL endroit où les clés sont construites. Terrain vierge : aucune
// migration de clés legacy n'existe.
// ─────────────────────────────────────────────────────────────
import type { GameMode, ThemeId } from '@hotbrain/engine';

export const NS = 'hotbrain';

export const keys = {
  schema: `${NS}:schema:v1`,
  player: `${NS}:player:v1`,
  dive: `${NS}:dive:v1`,
  history: `${NS}:history:v1`,
  prefs: `${NS}:prefs:v1`,
  resume: `${NS}:resume:v1`,
  refdist: (mode: GameMode): string => `${NS}:refdist:${mode}:v1`,
  content: (theme: ThemeId, mode: GameMode, date: string): string =>
    `${NS}:content:${theme}:${mode}:${date}`,
  unlock: (productId: string): string => `${NS}:unlock:${productId}`,
} as const;

/** Préfixe des clés de cache contenu (purge FIFO 14 j — Ontologie §D.2). */
export const CONTENT_PREFIX = `${NS}:content:`;
