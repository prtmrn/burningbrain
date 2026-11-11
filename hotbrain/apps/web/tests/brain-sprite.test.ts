import { describe, expect, it } from 'vitest';
import { BRAIN_CELLS, BRAIN_H, BRAIN_W } from '../src/brain-sprite';
import { faceRects, heatLabel } from '../src/components/BrainStage';

describe('cerveau pixel (D-27)', () => {
  it('toutes les cellules sont dans la grille', () => {
    for (const c of BRAIN_CELLS) {
      expect(c.x).toBeGreaterThanOrEqual(0);
      expect(c.x).toBeLessThan(BRAIN_W);
      expect(c.y).toBeGreaterThanOrEqual(0);
      expect(c.y).toBeLessThan(BRAIN_H);
    }
  });

  it('le cerveau a un contour, de la matière, des sillons et un cervelet', () => {
    const count = (k: string) => BRAIN_CELLS.filter((c) => c.kind === k).length;
    expect(count('edge')).toBeGreaterThan(40);
    expect(count('matter')).toBeGreaterThan(100);
    expect(count('fold')).toBeGreaterThan(30);
    expect(count('cereb')).toBeGreaterThan(5);
  });

  it('le visage reste dans la grille pour les quatre niveaux', () => {
    for (const lvl of ['Calme', 'Ça chauffe', 'Ébullition', 'Fusion']) {
      for (const [x, y, w, h] of faceRects(lvl)) {
        expect(x + w).toBeLessThanOrEqual(BRAIN_W);
        expect(y + h).toBeLessThanOrEqual(BRAIN_H);
      }
    }
  });

  it('niveaux de chaleur écrits en toutes lettres', () => {
    expect(heatLabel(0)).toBe('Calme');
    expect(heatLabel(0.3)).toBe('Ça chauffe');
    expect(heatLabel(0.6)).toBe('Ébullition');
    expect(heatLabel(0.9)).toBe('Fusion');
  });
});
