// ─────────────────────────────────────────────────────────────
// constants.ts — constantes de DOMAINE (aucune chaîne produit, aucun label)
// Grille éprouvée issue de la recon (structure, pas contenu — D-01).
// ─────────────────────────────────────────────────────────────
import type { TierId } from './types';

/** Points par palier — grille 10/15/30/60/85/100 (t2 = palier-piège, D-05). */
export const TIER_POINTS: Record<TierId, number> = {
  t1: 10,
  t2: 15,
  t3: 30,
  t4: 60,
  t5: 85,
  t6: 100,
};

export const TIER_IDS: readonly TierId[] = ['t1', 't2', 't3', 't4', 't5', 't6'];

/** Placement visuel sur la jauge (0..1) — fractions éprouvées (I-04). */
export const TIER_GAUGE_FRACTION: Record<TierId, number> = {
  t1: 0.08,
  t2: 0.18,
  t3: 0.36,
  t4: 0.6,
  t5: 0.82,
  t6: 0.97,
};

/** Conversion score → unité de jauge (D-09 provisoire : 1 pt = 1 unité).
 *  Paramètre produit : le moteur expose le facteur, l'app choisit l'unité. */
export const GAUGE_UNITS_PER_POINT = 1;

/** Longueur max de saisie (F-04). */
export const MAX_ANSWER_LENGTH = 256;

/** Bornes des bandes de verdict sur score total (F-02).
 *  hot : appliquées au score absolu (max 700).
 *  brain : appliquées au ratio × 700 (F-22 acté). */
export interface VerdictBandLimit {
  min: number;
  tier: TierId;
}
export const SCORE_BAND_LIMITS: readonly VerdictBandLimit[] = [
  { min: 0, tier: 't1' },
  { min: 151, tier: 't3' },
  { min: 251, tier: 't4' },
  { min: 351, tier: 't5' },
  { min: 450, tier: 't6' },
];

/** Plafond structurel du score hot (7 × t6) — utilisé pour les bornes de
 *  validation et la distribution de référence (maxScore). */
export const MAX_HOT_SCORE = 700;

/** Taille de la table de ratio brain (pour mille — F-13). */
export const BRAIN_RATIO_BUCKETS = 1000;
