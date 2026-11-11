'use client';

// ─────────────────────────────────────────────────────────────
// Thermometer.tsx — jauge verticale ascendante (game-loop §A.0/§B.2)
// RÈGLE DURE : le palier n'est JAMAIS codé par la couleur seule — le tube
// porte un signal SYSTÉMIQUE (dégradé global), les paliers des icônes +
// labels (TierBadge). R5 : aucune couleur de thème ici.
// Étiquettes : placement écarté (thermo-layout) → plus de superposition.
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';
import type { Milestone } from '../content';
import { HEAT_EASING, MILESTONE_FLASH_MS } from '../motion';
import { formatDegrees, spreadLabels } from '../thermo-layout';

export const SCALE_HEIGHT_PX = 420;
const LABEL_MIN_GAP_PX = 18;

export interface ThermometerProps {
  score: number;
  max: number;
  milestones: Milestone[];
  /** Durée de la montée (ms) — clamp(gain/450 °C·s⁻¹, 600, 2 400) en hot. */
  riseMs: number;
}

export function Thermometer({ score, max, milestones, riseMs }: ThermometerProps) {
  const pct = Math.max(0, Math.min(100, (score / max) * 100));
  const prevScore = useRef(score);
  const [flash, setFlash] = useState<number | null>(null);

  // Micro-célébration au franchissement d'un jalon (800 ms)
  useEffect(() => {
    const crossed = milestones.find(
      (m) => prevScore.current < m.temperature && score >= m.temperature,
    );
    prevScore.current = score;
    if (!crossed) return;
    setFlash(crossed.temperature);
    const id = setTimeout(() => setFlash(null), MILESTONE_FLASH_MS);
    return () => clearTimeout(id);
  }, [score, milestones]);

  const raw = milestones.map((m) => (m.temperature / max) * SCALE_HEIGHT_PX);
  const placed = spreadLabels(raw, LABEL_MIN_GAP_PX);

  return (
    <div className="thermometer" data-testid="thermometer">
      <div className="thermo-col">
      <div
        className="thermo-tube"
        role="meter"
        aria-label="Température"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={score}
        aria-valuetext={`${score} degrés sur ${max}`}
      >
        <div
          className="thermo-mercury"
          data-testid="mercury"
          style={{
            height: `${pct}%`,
            transitionDuration: `${riseMs}ms`,
            transitionTimingFunction: HEAT_EASING,
          }}
        />
      </div>
      <div className="thermo-bulb" aria-hidden="true" />
      </div>
      <div className="thermo-scale" style={{ height: SCALE_HEIGHT_PX }}>
        {milestones.map((m, i) => (
          <span
            key={m.temperature}
            className={[
              'thermo-milestone',
              score >= m.temperature ? 'reached' : '',
              flash === m.temperature ? 'flash' : '',
            ].join(' ')}
            style={{ bottom: `${placed[i]}px` }}
          >
            {formatDegrees(m.temperature)}° {m.label}
          </span>
        ))}
      </div>
      <div className="thermo-score" data-testid="thermo-score">
        {score} °C
      </div>
    </div>
  );
}
