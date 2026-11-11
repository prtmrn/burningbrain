// ─────────────────────────────────────────────────────────────
// thermo-layout.ts — placement des étiquettes de jalons sur le tube.
// Pur (aucun DOM) : évite que 0 / 29,8 / 37 °C se superposent.
// ─────────────────────────────────────────────────────────────

/** Hauteurs (px depuis le bas) des jalons, écartées d'au moins `minGap`.
 *  Entrée triée croissante ; l'ordre est conservé, seule la position bouge
 *  vers le haut, le long de la colonne. */
export function spreadLabels(heights: number[], minGap: number): number[] {
  const out = [...heights];
  for (let i = 1; i < out.length; i++) {
    const prev = out[i - 1] as number;
    if ((out[i] as number) - prev < minGap) out[i] = prev + minGap;
  }
  return out;
}

/** Format français : 29.8 → "29,8". */
export function formatDegrees(t: number): string {
  return String(t).replace('.', ',');
}
