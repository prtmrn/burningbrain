import { describe, expect, it } from 'vitest';
import { BIG_STAGES, STAGE_TEMPS, stageFor } from '../src/pixelworld/stages';
import { drawScene, hash, WORLD_H } from '../src/pixelworld/scene';
import {
  ASH, BONES, PAL_ASH, PAL_BONES, PAL_PENGUIN, PAL_PENGUIN_HOT, PENGUIN_A, PENGUIN_B, PENGUIN_H, PENGUIN_HOT_A, PENGUIN_W,
} from '../src/pixelworld/sprites';

describe('paliers du décor Boiling', () => {
  it('chaque seuil de température donne son palier', () => {
    expect(STAGE_TEMPS).toEqual([0, 30, 60, 90, 100, 180, 250, 350, 450, 650]);
    STAGE_TEMPS.forEach((t, i) => expect(stageFor(t)).toBe(i));
    expect(stageFor(29)).toBe(0);
    expect(stageFor(59)).toBe(1);
    expect(stageFor(99)).toBe(3);
    expect(stageFor(179)).toBe(4);
    expect(stageFor(649)).toBe(8);
    expect(stageFor(700)).toBe(9);
    expect(stageFor(-5)).toBe(0);
  });

  it('secousse et flash : 100 °C, 450 °C et 650 °C', () => {
    expect([...BIG_STAGES].sort((a, b) => a - b).map((s) => STAGE_TEMPS[s])).toEqual([100, 450, 650]);
  });
});

describe('sprites', () => {
  it('toutes les lignes ont la même largeur et les couleurs existent dans la palette', () => {
    const sets: [readonly string[], Record<string, string>][] = [
      [PENGUIN_A, PAL_PENGUIN], [PENGUIN_B, PAL_PENGUIN], [PENGUIN_HOT_A, PAL_PENGUIN_HOT], [BONES, PAL_BONES], [ASH, PAL_ASH],
    ];
    for (const [sprite, pal] of sets) {
      expect(sprite).toHaveLength(PENGUIN_H);
      for (const row of sprite) {
        expect(row).toHaveLength(PENGUIN_W);
        for (const ch of row) if (ch !== '.') expect(pal[ch], `couleur ${ch}`).toBeDefined();
      }
    }
  });
});

describe('dessin de la scène', () => {
  function stubCtx(): CanvasRenderingContext2D {
    const store: Record<string | symbol, unknown> = {};
    return new Proxy(store, {
      get: (t, k) => (k in t ? t[k] : () => undefined),
      set: (t, k, v) => {
        t[k] = v;
        return true;
      },
    }) as unknown as CanvasRenderingContext2D;
  }

  it('dessine chaque palier à plusieurs largeurs sans erreur', () => {
    for (const W of [96, 120, 192, 256, 480]) {
      for (let stage = 0; stage < STAGE_TEMPS.length; stage++) {
        for (const tick of [0, 1, 37, 1000]) {
          expect(() => drawScene(stubCtx(), stage, W, tick)).not.toThrow();
        }
      }
    }
    expect(WORLD_H).toBe(144);
  });

  it('le hachage est stable et dans [0, 1[', () => {
    expect(hash(42)).toBe(hash(42));
    for (let i = 0; i < 200; i++) {
      const h = hash(i);
      expect(h).toBeGreaterThanOrEqual(0);
      expect(h).toBeLessThan(1);
    }
  });
});
