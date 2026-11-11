// ─────────────────────────────────────────────────────────────
// motion.ts — constantes de présentation (spec v2 §A.5, F-2)
// AUCUNE de ces constantes n'affecte le scoring.
// ─────────────────────────────────────────────────────────────

/** Auto-avance du feedback hot si pas de FEEDBACK_ACK (ms). */
export const T_FEEDBACK = 2_500;

/** Montée hot : durée = clamp(°C gagnés / 450 °C·s⁻¹, 600, 2 400) ms. */
export function riseDurationMs(gainedC: number): number {
  return Math.min(2_400, Math.max(600, (Math.abs(gainedC) / 450) * 1_000));
}

export const HEAT_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

/** Entrée/sortie des bannières de feedback (ms). */
export const FEEDBACK_FADE_IN = 250;
export const FEEDBACK_FADE_OUT = 200;

/** Micro-célébration de jalon franchi (ms). */
export const MILESTONE_FLASH_MS = 800;

/** Cadence du tick UI (re-render countdown) — n'affecte pas le domaine. */
export const UI_TICK_MS = 100;
