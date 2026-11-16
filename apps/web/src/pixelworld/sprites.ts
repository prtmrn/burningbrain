// sprites.ts — pingouins, squelettes et dessin de sprites en pixel art.
// Chaque sprite est une grille de caractères : '.' = transparent, le reste
// renvoie à une palette. Aucune image : tout est dessiné en code.

export type Palette = Record<string, string>;
export type Sprite = readonly string[];

export const PENGUIN_W = 12;
export const PENGUIN_H = 14;

/** Pingouin de face, ailerons le long du corps. */
export const PENGUIN_A: Sprite = [
  '....kkkk....',
  '...kkkkkk...',
  '...kwkkwk...',
  '...kkookk...',
  '..kkwwwwkk..',
  '.kkwwwwwwkk.',
  '.kkwwwwwwkk.',
  '.kkwwwwwwkk.',
  '.kkwwwwwwkk.',
  '..kkwwwwkk..',
  '..kkkwwkkk..',
  '...kkkkkk...',
  '...oo..oo...',
  '..ooo..ooo..',
];

/** Pingouin, ailerons levés (animation d'attente). */
export const PENGUIN_B: Sprite = [
  '....kkkk....',
  '...kkkkkk...',
  '...kwkkwk...',
  '...kkookk...',
  'k.kkwwwwkk.k',
  'kkkwwwwwwkkk',
  '.kkwwwwwwkk.',
  '.kkwwwwwwkk.',
  '.kkwwwwwwkk.',
  '..kkwwwwkk..',
  '..kkkwwkkk..',
  '...kkkkkk...',
  '...oo..oo...',
  '..ooo..ooo..',
];

/** Pingouin qui a chaud : bec ouvert, yeux plissés. */
export const PENGUIN_HOT_A: Sprite = [
  '....kkkk....',
  '...kkkkkk...',
  '...kkkkkk...',
  '...kkooKk...',
  '..kkwwwwkk..',
  '.kkwwwwwwkk.',
  '.kkwwwwwwkk.',
  '.kkwwwwwwkk.',
  '.kkwwwwwwkk.',
  '..kkwwwwkk..',
  '..kkkwwkkk..',
  '...kkkkkk...',
  '...oo..oo...',
  '..ooo..ooo..',
];

/** Squelette de pingouin (os blancs, orbites noires). */
export const BONES: Sprite = [
  '....wwww....',
  '...wwwwww...',
  '...wkwwkw...',
  '...wwwwww...',
  '....wkkw....',
  '.....ww.....',
  '..w.wwww.w..',
  '...wkwwkw...',
  '..w.wwww.w..',
  '...wkwwkw...',
  '....wwww....',
  '.....ww.....',
  '....w..w....',
  '...ww..ww...',
];

/** Squelette plié et à moitié effondré (os calcinés). */
export const ASH: Sprite = [
  '............',
  '............',
  '............',
  '............',
  '....wwww....',
  '...wkwwkw...',
  '...wwwwww...',
  '....wkkw....',
  '..w.wwww.w..',
  '.ww.wkkw.ww.',
  '..wwwwwwww..',
  '.w.wwwwww.w.',
  '..wwwwwwww..',
  '.ww.wwww.ww.',
];

export const PAL_PENGUIN: Palette = { k: '#12141d', w: '#f4f7fb', o: '#f5a30b', K: '#2a0c0c' };
/** Chaud : ventre rosé, bec rouge. */
export const PAL_PENGUIN_HOT: Palette = { k: '#4a1218', w: '#ff8f7a', o: '#ff4a2a', K: '#7a0f0f' };
export const PAL_BONES: Palette = { w: '#efe6cf', k: '#1b1713' };
export const PAL_ASH: Palette = { w: '#4a4747', k: '#0d0c0c' };

/** Dessine un sprite pixel par pixel (coordonnées entières, miroir horizontal optionnel). */
export function drawSprite(
  c: CanvasRenderingContext2D,
  sprite: Sprite,
  palette: Palette,
  x: number,
  y: number,
  flip = false,
): void {
  for (let r = 0; r < sprite.length; r++) {
    const row = sprite[r]!;
    const w = row.length;
    for (let col = 0; col < w; col++) {
      const ch = row[flip ? w - 1 - col : col]!;
      if (ch === '.') continue;
      const color = palette[ch];
      if (!color) continue;
      c.fillStyle = color;
      c.fillRect(x + col, y + r, 1, 1);
    }
  }
}
