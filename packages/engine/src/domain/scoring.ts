// ─────────────────────────────────────────────────────────────
// scoring.ts — score, jauge, verdicts (mecaniques §A.1, §A.2, F-22)
// ─────────────────────────────────────────────────────────────
import {
  GAUGE_UNITS_PER_POINT,
  SCORE_BAND_LIMITS,
  TIER_POINTS,
  type VerdictBandLimit,
} from './constants';
import type { AnswerSheet, BrainRoundResult, HotRoundResult, RoundResult, TierId } from './types';

/** Score d'un round : hot = score du résultat (redondance contrôlée,
 *  revérifiée à la lecture) ; brain = Σ des réponses acceptées. */
export function scoreOfRound(round: RoundResult): number {
  if ('answersGiven' in round) {
    return round.answersGiven.reduce((acc, a) => acc + a.score, 0);
  }
  return round.score;
}

export function sessionScore(results: RoundResult[]): number {
  return results.reduce((acc, r) => acc + scoreOfRound(r), 0);
}

/** Plafond d'une feuille = Σ points de ses entrées (invariant brain :
 *  chaque entrée n'est comptable qu'une fois → score ≤ plafond). */
export function sheetCeiling(sheet: AnswerSheet): number {
  return sheet.entries.reduce((acc, e) => acc + TIER_POINTS[e.tier], 0);
}

/** Plafond d'une série brain = Σ plafonds des feuilles (VARIABLE par série). */
export function sessionCeiling(sheets: AnswerSheet[]): number {
  return sheets.reduce((acc, s) => acc + sheetCeiling(s), 0);
}

/** Conversion score → unités de jauge (D-09 provisoire : facteur 1).
 *  hot : jauge 0 → 700 · brain : jauge 0 → plafondSession. */
export function gaugeUnits(score: number): number {
  return score * GAUGE_UNITS_PER_POINT;
}

/** Verdict hot : bandes sur le score absolu (F-02). */
export function computeVerdictHot(score: number): VerdictBandLimit {
  let band = SCORE_BAND_LIMITS[0] as VerdictBandLimit;
  for (const b of SCORE_BAND_LIMITS) {
    if (score >= b.min) band = b;
  }
  return band;
}

/** Verdict brain : MÊME GRILLE appliquée au ratio × 700 (F-22 acté) —
 *  comparabilité entre séries de plafonds différents. */
export function computeVerdictBrain(score: number, ceiling: number): VerdictBandLimit {
  if (ceiling <= 0) return computeVerdictHot(0);
  return computeVerdictHot((score / ceiling) * 700);
}

/** Re-vérification de la redondance score/tier (validation à la lecture). */
export function expectedScore(tier: TierId | null): number {
  return tier === null ? 0 : TIER_POINTS[tier];
}

/** Helpers de type pour les unions de rounds. */
export function isHotRound(r: RoundResult): r is HotRoundResult {
  return !('answersGiven' in r);
}
export function isBrainRound(r: RoundResult): r is BrainRoundResult {
  return 'answersGiven' in r;
}
