import { describe, expect, it } from 'vitest';
import { formatDegrees, spreadLabels } from '../src/thermo-layout';

describe('placement des jalons (DA — pas de superposition)', () => {
  it('les jalons trop proches sont écartés d\'au moins minGap, ordre conservé', () => {
    // 0, 29,8 et 37 °C sur un tube de 420 px : 0 / 17,9 / 22,2 px
    const placed = spreadLabels([0, 17.9, 22.2, 34, 60, 108], 18);
    for (let i = 1; i < placed.length; i++) {
      expect((placed[i] as number) - (placed[i - 1] as number)).toBeGreaterThanOrEqual(18);
    }
    expect(placed[0]).toBe(0);
  });

  it('les jalons déjà espacés ne bougent pas', () => {
    expect(spreadLabels([0, 100, 300], 18)).toEqual([0, 100, 300]);
  });

  it('format français des décimales', () => {
    expect(formatDegrees(29.8)).toBe('29,8');
    expect(formatDegrees(100)).toBe('100');
  });
});
