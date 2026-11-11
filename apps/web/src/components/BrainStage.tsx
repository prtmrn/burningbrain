'use client';

// ─────────────────────────────────────────────────────────────
// BrainStage.tsx — le cerveau qui entre en ébullition (D-27) :
// un cerveau pixel dans une marmite, au-dessus de flammes qui grandissent
// avec la chaleur. Il a un visage qui réagit ; le niveau est aussi écrit en
// toutes lettres (jamais la couleur seule).
// ─────────────────────────────────────────────────────────────
import { BRAIN_CELLS, BRAIN_H, BRAIN_W } from '../brain-sprite';

export function heatLabel(heat: number): string {
  if (heat < 0.2) return 'Calme';
  if (heat < 0.5) return 'Ça chauffe';
  if (heat < 0.85) return 'Ébullition';
  return 'Fusion';
}

type Rect = [x: number, y: number, w: number, h: number, cls?: string];

/** Visage pixel selon le niveau (coordonnées sur la grille du sprite). */
export function faceRects(label: string): Rect[] {
  switch (label) {
    case 'Calme':
      return [[8, 7, 3, 1], [16, 7, 3, 1], [11, 10, 4, 1]];
    case 'Ça chauffe':
      return [[9, 6, 2, 2], [17, 6, 2, 2], [10, 9, 1, 1], [11, 10, 4, 1], [15, 9, 1, 1]];
    case 'Ébullition':
      return [[8, 5, 4, 1], [16, 5, 4, 1], [9, 6, 2, 2], [17, 6, 2, 2], [5, 5, 1, 2, 'b-sweat'], [11, 9, 4, 2]];
    default:
      return [[8, 5, 4, 4, 'b-eye-white'], [16, 5, 4, 4, 'b-eye-white'], [9, 7, 2, 2], [17, 7, 2, 2], [10, 10, 6, 2]];
  }
}

// Scène : 40 × 36. Cerveau en (5, 0) ; bord de la marmite en y = 16.
const SW = 40;
const SH = 36;
const BX = 5;
const RIM_Y = 16;

function potRects(): Rect[] {
  const r: Rect[] = [];
  r.push([2, RIM_Y, 36, 1, 'pot-rim']);
  r.push([3, RIM_Y + 1, 34, 1, 'pot-shine']);
  for (let y = RIM_Y + 2; y <= RIM_Y + 10; y++) {
    const inset = Math.max(0, y - (RIM_Y + 6));
    r.push([3 + inset, y, 34 - 2 * inset, 1, 'pot-body']);
  }
  r.push([0, RIM_Y + 1, 2, 3, 'pot-rim']);
  r.push([38, RIM_Y + 1, 2, 3, 'pot-rim']);
  return r;
}

/** Flammes : hauteur par colonne selon la chaleur, deux images pour le scintillement. */
function flameRects(heat: number, frame: 0 | 1): Rect[] {
  const r: Rect[] = [];
  const base = SH - 1;
  for (let x = 9; x <= 30; x++) {
    const wave = ((x * 7 + frame * 3) % 4) - 1;
    const hgt = Math.max(1, Math.round(2 + heat * 5 + wave));
    for (let k = 0; k < hgt; k++) {
      const y = base - k;
      const rel = k / hgt;
      const cls = rel < 0.35 ? 'fl-core' : rel < 0.7 ? 'fl-mid' : 'fl-tip';
      r.push([x, y, 1, 1, cls]);
    }
  }
  return r;
}

export interface BrainStageProps {
  heat: number;
  gain?: { points: number; key: number } | undefined;
  showLabel?: boolean;
}

export function BrainStage({ heat, gain, showLabel = true }: BrainStageProps) {
  const h = Math.max(0, Math.min(1, heat));
  const label = heatLabel(h);
  const bubbles = 3 + Math.round(h * 12);

  return (
    <div className="brain-stage" data-testid="brain-stage" data-label={label}>
      <svg
        className="brain-svg"
        viewBox={`0 0 ${SW} ${SH}`}
        shapeRendering="crispEdges"
        role="img"
        aria-label={`Cerveau : ${label}`}
      >
        <g className="brain-body">
          {BRAIN_CELLS.map((c) => (
            <rect key={`${c.x}-${c.y}`} x={c.x + BX} y={c.y} width={1} height={1} className={`b-${c.kind}`} />
          ))}
          {faceRects(label).map(([x, y, w, hh, cls], i) => (
            <rect key={`f${i}`} x={x + BX} y={y} width={w} height={hh} className={cls ?? 'b-face'} />
          ))}
        </g>
        {potRects().map(([x, y, w, hh, cls], i) => (
          <rect key={`p${i}`} x={x} y={y} width={w} height={hh} className={cls} />
        ))}
        <g className="flames fl-a">
          {flameRects(h, 0).map(([x, y, w, hh, cls], i) => (
            <rect key={`a${i}`} x={x} y={y} width={w} height={hh} className={cls} />
          ))}
        </g>
        <g className="flames fl-b">
          {flameRects(h, 1).map(([x, y, w, hh, cls], i) => (
            <rect key={`b${i}`} x={x} y={y} width={w} height={hh} className={cls} />
          ))}
        </g>
      </svg>
      <div className="pot-bubbles" aria-hidden="true">
        {Array.from({ length: bubbles }, (_, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              left: `${((i * 37) % 80) + 10}%`,
              width: `${5 + (i % 3) * 3}px`,
              height: `${5 + (i % 3) * 3}px`,
              animationDelay: `${((i * 0.23) % 1.8).toFixed(2)}s`,
              animationDuration: `${(1.2 + (i % 4) * 0.25).toFixed(2)}s`,
            }}
          />
        ))}
      </div>
      {h >= 0.35 && <div className="steam" aria-hidden="true" />}
      {gain && (
        <span key={gain.key} className="float-score" data-testid="float-score">
          +{gain.points} °C
        </span>
      )}
      {showLabel && (
        <p className="brain-label" data-testid="brain-label">
          {label}
        </p>
      )}
    </div>
  );
}
