// ─────────────────────────────────────────────────────────────
// brain-sprite.ts — cerveau pixel vu de profil (D-27), dessiné à la main.
// Masque : p = matière, f = sillon, c = cervelet, s = tronc ; le contour est
// calculé (toute cellule pleine voisine du vide).
// ─────────────────────────────────────────────────────────────
const MASK = [
  '.........pppppppppp...........',
  '......ppppppppppppppppp.......',
  '....ppppfpppppfppppppppp......',
  '...ppppfpppfpppffppppfpppp....',
  '..pppppfppfppppppfppfffpppp...',
  '..ppppfppppffppppfppppppfppp..',
  '.pppffppppppfpppfppfffppfpppp.',
  '.ppppfppfffppppfppppppfppfppp.',
  '.pppfppfppppppffpppfpppfppppp.',
  '.ppppfppppfpppppfffppppffpppp.',
  '..pppffpppfffppppppfffppppppp.',
  '..pppppppfpppppffppppppppfppp.',
  '...ppppppppppppppppppppppppp..',
  '.....pppppppppppppcccccccccc..',
  '.........pppppppp.ccfccfcccc..',
  '..............ss..ccccccccc...',
  '..............sss..cccccc.....',
  '..............sss.............',
  '..............sss.............',
  '...............s..............',
];

export const BRAIN_W = 30;
export const BRAIN_H = MASK.length;

export type BrainKind = 'edge' | 'fold' | 'matter' | 'cereb' | 'stem';
export interface BrainCell {
  x: number;
  y: number;
  kind: BrainKind;
}

function at(x: number, y: number): string {
  if (y < 0 || y >= BRAIN_H || x < 0 || x >= BRAIN_W) return '.';
  return (MASK[y] as string)[x] ?? '.';
}

function build(): BrainCell[] {
  const cells: BrainCell[] = [];
  for (let y = 0; y < BRAIN_H; y++) {
    for (let x = 0; x < BRAIN_W; x++) {
      const ch = at(x, y);
      if (ch === '.') continue;
      const edge = at(x - 1, y) === '.' || at(x + 1, y) === '.' || at(x, y - 1) === '.' || at(x, y + 1) === '.';
      let kind: BrainKind = 'matter';
      if (edge) kind = 'edge';
      else if (ch === 'f') kind = 'fold';
      else if (ch === 'c') kind = 'cereb';
      else if (ch === 's') kind = 'stem';
      cells.push({ x, y, kind });
    }
  }
  return cells;
}

export const BRAIN_CELLS: readonly BrainCell[] = build();
