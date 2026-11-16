// stages.ts — les dix paliers du décor Boiling (température = score en °C).
// 0 banquise · 30 montagne glacée · 60 fonte · 90 banquise presque fondue ·
// 100 roche et feu · 180 os, volcan calme · 250 os calcinés · 350 crépitement ·
// 450 éruption · 650 enfer.

export const STAGE_TEMPS = [0, 30, 60, 90, 100, 180, 250, 350, 450, 650] as const;

/** Indice du palier (0 → 9) pour une température en °C. */
export function stageFor(temp: number): number {
  let s = 0;
  for (let i = 0; i < STAGE_TEMPS.length; i++) {
    if (temp >= STAGE_TEMPS[i]!) s = i;
  }
  return s;
}

/** Paliers qui déclenchent secousse + flash : 100 °C (le feu), 450 °C (l'éruption), 650 °C (l'enfer). */
export const BIG_STAGES: ReadonlySet<number> = new Set([4, 8, 9]);

/** Couleur du flash selon le palier atteint. */
export function flashColorFor(stage: number): string {
  if (stage >= 9) return 'rgba(255, 40, 20, 0.55)';
  if (stage >= 8) return 'rgba(255, 230, 140, 0.6)';
  return 'rgba(255, 150, 60, 0.5)';
}
