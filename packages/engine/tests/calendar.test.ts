// T-09, T-10, U-51, U-52 — calendrier civil & DST (mecaniques §A.3)
import { describe, expect, it } from 'vitest';
import {
  dateLoc,
  dayNumber,
  localMidnightUtcMs,
  nextResetMs,
} from '../src/domain/calendar';
import { testConfig } from './fixtures';

const TZ = 'America/New_York';
const H = 3_600_000;

describe('calendar', () => {
  it('T-09 — DST printemps (2026-03-08) : journée de 23 h, dayNumber ±1 autour de minuit', () => {
    const cfg = { ...testConfig, epochDate: '2026-01-01' };
    const m8 = localMidnightUtcMs('2026-03-08', TZ);
    const m9 = localMidnightUtcMs('2026-03-09', TZ);
    expect(m9 - m8).toBe(23 * H); // journée courte
    expect(dateLoc(m8 - 60_000, TZ)).toBe('2026-03-07');
    expect(dateLoc(m8 + 60_000, TZ)).toBe('2026-03-08');
    // ± 1 minute autour de minuit local : dayNumber diffère exactement de 1
    expect(dayNumber(m8 - 60_000, cfg)).toBe(dayNumber(m8 + 60_000, cfg) - 1);
  });

  it('T-10 — DST automne (2026-11-01) : journée de 25 h ; ancre epoch → dayNumber 116', () => {
    const n1 = localMidnightUtcMs('2026-11-01', TZ);
    const n2 = localMidnightUtcMs('2026-11-02', TZ);
    expect(n2 - n1).toBe(25 * H); // journée longue
    const cfgEpoch = { ...testConfig, epochDate: '2026-07-16' };
    const noon = localMidnightUtcMs('2026-11-08', TZ) + 12 * H;
    expect(dateLoc(noon, TZ)).toBe('2026-11-08');
    expect(dayNumber(noon, cfgEpoch)).toBe(116);
  });

  it('U-51 — nextResetMs strictement dans le futur, même date civile à −1 ms', () => {
    // minuit pile
    const midnight = localMidnightUtcMs('2026-11-10', TZ);
    const next = nextResetMs(midnight, testConfig);
    expect(next).toBeGreaterThan(midnight);
    expect(dateLoc(next - 1, TZ)).toBe(dateLoc(midnight, TZ));
    // instant quelconque
    const any = midnight + 15 * H + 7 * 60_000 + 3_000;
    const next2 = nextResetMs(any, testConfig);
    expect(next2).toBeGreaterThan(any);
    expect(dateLoc(next2 - 1, TZ)).toBe(dateLoc(any, TZ));
  });

  it('U-52 — dayNumber(nextReset(now)) = dayNumber(now) + 1, à toute heure', () => {
    const midnight = localMidnightUtcMs('2026-11-10', TZ);
    for (const h of [0, 6, 12, 23]) {
      const now = midnight + h * H;
      expect(dayNumber(nextResetMs(now, testConfig), testConfig)).toBe(
        dayNumber(now, testConfig) + 1,
      );
    }
  });
});
