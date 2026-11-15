'use client';

// WorldBackdrop.tsx — fond plein écran qui change d'univers avec la chaleur :
// banquise → eau qui bout → friture → four → lave. Les couches sont empilées et
// se fondent l'une dans l'autre ; seule la couche active est visible.

export type WorldId = 'frost' | 'water' | 'fry' | 'oven' | 'lava';

const WORLDS: WorldId[] = ['frost', 'water', 'fry', 'oven', 'lava'];

/** Univers pour une chaleur 0 → 1 (0 → 700 °C). Seuils : 57 °C, 233 °C, 450 °C, 630 °C. */
export function worldFor(heat: number): WorldId {
  const h = Math.max(0, Math.min(1, heat));
  if (h < 0.08) return 'frost';
  if (h < 0.33) return 'water';
  if (h < 0.6) return 'fry';
  if (h < 0.9) return 'oven';
  return 'lava';
}

export function WorldBackdrop({ heat }: { heat: number }) {
  const active = worldFor(heat);
  return (
    <div className="world-backdrop" aria-hidden="true" data-world={active} data-testid="world-backdrop">
      {WORLDS.map((w) => (
        <div key={w} className={`world-layer world-${w}${w === active ? ' on' : ''}`} />
      ))}
    </div>
  );
}
