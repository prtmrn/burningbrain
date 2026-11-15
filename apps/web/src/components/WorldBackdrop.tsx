'use client';

// WorldBackdrop.tsx — fond plein écran qui change d'univers avec la chaleur :
// banquise → eau qui bout → friture → four → lave. Chaque univers bouge en
// permanence ; un flash signale le passage d'un univers à l'autre.
import { useEffect, useRef, useState } from 'react';

export type WorldId = 'frost' | 'water' | 'fry' | 'oven' | 'lava';

const WORLDS: WorldId[] = ['frost', 'water', 'fry', 'oven', 'lava'];

/** Échelle de chaleur des univers : une partie typique va de 50 à 200 points. */
export const WORLD_SCALE = 300;

/** Univers pour une chaleur 0 → 1 (points ÷ WORLD_SCALE). */
export function worldFor(heat: number): WorldId {
  const h = Math.max(0, Math.min(1, heat));
  if (h < 0.12) return 'frost';
  if (h < 0.33) return 'water';
  if (h < 0.6) return 'fry';
  if (h < 0.9) return 'oven';
  return 'lava';
}

export function WorldBackdrop({ heat }: { heat: number }) {
  const active = worldFor(heat);
  const [flashKey, setFlashKey] = useState(0);
  const previous = useRef<WorldId>(active);
  useEffect(() => {
    if (previous.current !== active) {
      previous.current = active;
      setFlashKey((k) => k + 1);
    }
  }, [active]);
  return (
    <div className="world-backdrop" aria-hidden="true" data-world={active} data-testid="world-backdrop">
      {WORLDS.map((w) => (
        <div key={w} className={`world-layer world-${w}${w === active ? ' on' : ''}`} />
      ))}
      {flashKey > 0 && <div key={flashKey} className="world-flash" />}
    </div>
  );
}
