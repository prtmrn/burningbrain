// T-27 + U-53 → U-58 — percentile « better than X % » (mecaniques §A.6, F-13)
import { describe, expect, it } from 'vitest';
import {
  betterThan,
  blend,
  blendWeight,
  brainRatioBucket,
  clampPercentileDisplay,
  rebase,
  shouldRebase,
} from '../src/domain/percentile';
import { validateReferenceDistribution } from '../src/data/schemas';
import type {
  LocalReferenceDistribution,
  ReferenceDistribution,
} from '../src/domain/types';

describe('percentile', () => {
  it('T-27 — bucket de ratio brain : floor(1000 × score/ceiling)', () => {
    expect(brainRatioBucket(1_078, 1_540)).toBe(700); // 0,7 exactement
  });

  it('U-53 — betterThan avec correction de continuité (milieu de sa propre barre)', () => {
    const buckets = new Array<number>(21).fill(0);
    buckets[10] = 1;
    buckets[20] = 1;
    const dist: ReferenceDistribution = { mode: 'hot', distVersion: 1, maxScore: 20, buckets };
    expect(betterThan(10, dist)).toBe(25); // (0 + 0,5) / 2
    expect(betterThan(20, dist)).toBe(75); // (1 + 0,5) / 2
  });

  it('U-54 — bornage d\'affichage [1 %, 99 %] tant que n < 30', () => {
    expect(clampPercentileDisplay(0.4, 5)).toBe(1);
    expect(clampPercentileDisplay(99.6, 5)).toBe(99);
    expect(clampPercentileDisplay(50, 29)).toBe(50);
    expect(clampPercentileDisplay(0.4, 30)).toBe(0.4); // n ≥ 30 : plus de borne
    expect(clampPercentileDisplay(99.6, 100)).toBe(99.6);
  });

  it('U-55 — table brain de référence : exactement 1 001 buckets (F-13)', () => {
    const good = {
      mode: 'brain',
      distVersion: 1,
      maxScore: 1_000,
      buckets: new Array<number>(1_001).fill(1),
    };
    expect(validateReferenceDistribution(good)).not.toBeNull();
    const bad = { ...good, buckets: new Array<number>(1_000).fill(1) };
    expect(validateReferenceDistribution(bad)).toBeNull();
  });

  it('U-56 — ratio 1,0 → bucket 1 000 ; affichage borné à 99 % si échantillon faible', () => {
    expect(brainRatioBucket(1_540, 1_540)).toBe(1_000);
    expect(brainRatioBucket(2_000, 1_540)).toBe(1_000); // borne haute
    expect(clampPercentileDisplay(100, 10)).toBe(99);
  });

  it('U-57 — lissage bayésien : w = min(0,25 ; n/(n+40))', () => {
    expect(blendWeight(0)).toBe(0);
    expect(blendWeight(1_000)).toBe(0.25); // plafond atteint
    expect(blendWeight(40)).toBe(0.25); // 40/80 = 0,5 → plafonné à 0,25
    expect(blendWeight(20)).toBe(0.25); // 20/60 = 1/3 → plafonné
    expect(blendWeight(10)).toBeCloseTo(0.2, 10); // 10/50, sous le plafond
    const blended = blend([100, 0], [0, 100], 1_000);
    expect(blended[0]).toBeCloseTo(75, 10);
    expect(blended[1]).toBeCloseTo(25, 10);
  });

  it('U-58 — rebase quand la distVersion embarquée monte, n conservé', () => {
    const base: ReferenceDistribution = {
      mode: 'brain',
      distVersion: 1,
      maxScore: 1_000,
      buckets: new Array<number>(1_001).fill(1),
    };
    const local: LocalReferenceDistribution = {
      base,
      blended: [...base.buckets],
      localCompletions: 42,
      blendedAt: '2026-11-01T00:00:00Z',
    };
    const embedded: ReferenceDistribution = {
      ...base,
      distVersion: 2,
      buckets: new Array<number>(1_001).fill(2),
    };
    expect(shouldRebase(local, embedded)).toBe(true);
    expect(shouldRebase(local, base)).toBe(false); // même version : pas de rebase
    const rebased = rebase(local, embedded, new Array<number>(1_001).fill(0), '2026-11-10T00:00:00Z');
    expect(rebased.base.distVersion).toBe(2);
    expect(rebased.localCompletions).toBe(42); // n conservé
    expect(rebased.blended).toHaveLength(1_001);
    // w = min(0,25 ; 42/82) ≈ 0,25 → blend(2, 0) ≈ 1,5
    expect(rebased.blended[0]).toBeCloseTo(1.5, 5);
  });
});
