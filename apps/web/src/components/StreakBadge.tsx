// ─────────────────────────────────────────────────────────────
// StreakBadge.tsx — streak daily dérivé de l'historique (D-16, F-4)
// ─────────────────────────────────────────────────────────────

export function StreakBadge({ streak }: { streak: number }) {
  return (
    <span className="streak-badge" data-testid="streak-badge" aria-label={`Streak de ${streak} jours`}>
      🔥 {streak} jour{streak > 1 ? 's' : ''} de suite
    </span>
  );
}
