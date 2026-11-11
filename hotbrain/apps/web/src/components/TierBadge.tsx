// ─────────────────────────────────────────────────────────────
// TierBadge.tsx — palier = ICÔNE + LABEL (+ points)
// Règle dure accessibilité : jamais la couleur seule (game-loop reco 8).
// ─────────────────────────────────────────────────────────────
import type { TierId } from '@hotbrain/engine';
import { TIER_ICONS, TIER_LABELS } from '../content';

export interface TierBadgeProps {
  tier: TierId;
  points?: number;
}

export function TierBadge({ tier, points }: TierBadgeProps) {
  return (
    <span className="tier-badge" data-testid={`tier-${tier}`}>
      <span className="tier-icon" aria-hidden="true">
        {TIER_ICONS[tier]}
      </span>
      <span className="tier-label">{TIER_LABELS[tier]}</span>
      {points !== undefined && <span className="tier-points">+{points} °C</span>}
    </span>
  );
}
