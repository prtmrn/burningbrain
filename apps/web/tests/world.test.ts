// Fond « monde qui change avec la chaleur » : correspondance chaleur → univers.
import { describe, expect, it } from 'vitest';
import { worldFor } from '../src/components/WorldBackdrop';

describe('worldFor', () => {
  it('suit les univers du plus froid au plus chaud', () => {
    expect(worldFor(0)).toBe('frost');
    expect(worldFor(0.1)).toBe('water');
    expect(worldFor(0.4)).toBe('fry');
    expect(worldFor(0.7)).toBe('oven');
    expect(worldFor(1)).toBe('lava');
  });
  it('borne la chaleur entre 0 et 1', () => {
    expect(worldFor(-3)).toBe('frost');
    expect(worldFor(9)).toBe('lava');
  });
});
