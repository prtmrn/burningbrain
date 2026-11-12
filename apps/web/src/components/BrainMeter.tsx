'use client';

// ─────────────────────────────────────────────────────────────
// BrainMeter.tsx — D-40 : en mode Brain, un cerveau pixel se remplit de
// neurones du bas vers le haut. Plein à `goal` neurones : partie gagnée.
// ─────────────────────────────────────────────────────────────
import { BRAIN_CELLS, BRAIN_H, BRAIN_W } from '../brain-sprite';
import { useT } from '../i18n';

/** Ordre de remplissage : du bas vers le haut, à surface égale par neurone. */
const FILL_ORDER: string[] = BRAIN_CELLS.filter((c) => c.kind !== 'edge')
  .slice()
  .sort((a, b) => b.y - a.y || a.x - b.x)
  .map((c) => `${c.x}-${c.y}`);
const FILL_RANK = new Map(FILL_ORDER.map((k, i) => [k, i]));

export function BrainMeter({
  value,
  goal,
  gain,
}: {
  value: number;
  goal: number;
  gain?: { points: number; key: number } | undefined;
}) {
  const [t] = useT();
  const ratio = Math.max(0, Math.min(1, value / goal));
  const litCount = Math.round(ratio * FILL_ORDER.length);
  const full = ratio >= 1;
  return (
    <div className={`brain-meter${full ? ' full' : ''}`} data-testid="brain-meter">
      <svg
        viewBox={`-1 -1 ${BRAIN_W + 2} ${BRAIN_H + 2}`}
        className="brain-meter-svg"
        role="meter"
        aria-label={t('neurons.aria')}
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={Math.min(value, goal)}
        shapeRendering="crispEdges"
      >
        {BRAIN_CELLS.map((c) => {
          const rank = FILL_RANK.get(`${c.x}-${c.y}`) ?? -1;
          const lit = rank >= 0 && rank < litCount;
          const front = lit && rank >= litCount - BRAIN_W / 2;
          const cls =
            c.kind === 'edge' ? 'bm-edge' : `bm-${lit ? 'on' : 'off'} bm-${c.kind}${front && !full ? ' bm-front' : ''}`;
          return <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={1} height={1} className={cls} />;
        })}
      </svg>
      {gain && (
        <span key={gain.key} className="float-score" data-testid="float-score">
          +{gain.points}
        </span>
      )}
      <p className="brain-meter-label" data-testid="neurones">
        <strong>{value}</strong> / {goal} neurones
      </p>
    </div>
  );
}
