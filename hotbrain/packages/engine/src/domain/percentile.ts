// ─────────────────────────────────────────────────────────────
// percentile.ts — « better than X % » offline-first (mecaniques §A.6)
//   hot   : betterThan sur distribution 701 buckets (correction de continuité)
//   brain : percentile sur le RATIO score/plafond en pour mille (F-13) —
//           deux séries de plafonds différents ne sont comparables qu'en
//           fraction de récolte ; le partage D-19 parle la même langue.
//   Lissage bayésien local : blend(embedded, local, w), w = min(0.25, n/(n+40)),
//   rebase quand la distVersion embarquée monte (n conservé).
// ─────────────────────────────────────────────────────────────
import { BRAIN_RATIO_BUCKETS } from './constants';
import type { LocalReferenceDistribution, ReferenceDistribution } from './types';

/** betterThan(score) = ( Σ_{s < score} buckets[s] + 0.5 × buckets[score] ) / Σ × 100
 *  — correction de continuité : on se place au milieu de sa propre barre. */
export function betterThan(score: number, dist: ReferenceDistribution): number {
  const total = dist.buckets.reduce((a, b) => a + b, 0);
  if (total <= 0) return 0;
  const s = Math.max(0, Math.min(Math.floor(score), dist.buckets.length - 1));
  let below = 0;
  for (let i = 0; i < s; i++) below += dist.buckets[i] as number;
  return ((below + 0.5 * (dist.buckets[s] as number)) / total) * 100;
}

/** Bucket de ratio brain : floor(1000 × score/ceiling) ∈ [0, 1000]. */
export function brainRatioBucket(score: number, ceiling: number): number {
  if (ceiling <= 0) return 0;
  return Math.max(0, Math.min(BRAIN_RATIO_BUCKETS, Math.floor((BRAIN_RATIO_BUCKETS * score) / ceiling)));
}

/** Bornage d'affichage [1 %, 99 %] tant que n < 30 complétions locales
 *  (honnêteté de l'estimation — mecaniques §A.6). */
export function clampPercentileDisplay(percentile: number, localCompletions: number): number {
  if (localCompletions < 30) return Math.min(99, Math.max(1, percentile));
  return percentile;
}

/** Poids du lissage : w = min(0.25, n/(n+40)) — la distribution embarquée
 *  domine tant que l'échantillon local est faible. */
export function blendWeight(n: number): number {
  if (n <= 0) return 0;
  return Math.min(0.25, n / (n + 40));
}

/** blend(embedded, localDist, n)[i] = (1−w)·embedded[i] + w·localDist[i]. */
export function blend(embedded: number[], localDist: number[], n: number): number[] {
  const w = blendWeight(n);
  return embedded.map((e, i) => (1 - w) * e + w * (localDist[i] ?? 0));
}

/** Distribution empirique locale à partir de buckets observés. */
export function distFromBuckets(bucketValues: number[], size: number): number[] {
  const out = new Array<number>(size).fill(0);
  for (const b of bucketValues) {
    const i = Math.max(0, Math.min(Math.floor(b), size - 1));
    out[i] = (out[i] as number) + 1;
  }
  return out;
}

/** Rebase : l'app embarque une distVersion PLUS RÉCENTE que la base lissée →
 *  on jette `blended`, on repart de la nouvelle distribution (n conservé). */
export function shouldRebase(
  local: LocalReferenceDistribution,
  embedded: ReferenceDistribution,
): boolean {
  return embedded.distVersion > local.base.distVersion;
}

export function rebase(
  local: LocalReferenceDistribution,
  embedded: ReferenceDistribution,
  localDist: number[],
  blendedAt: string,
): LocalReferenceDistribution {
  return {
    base: embedded,
    blended: blend(embedded.buckets, localDist, local.localCompletions),
    localCompletions: local.localCompletions,
    blendedAt,
  };
}
