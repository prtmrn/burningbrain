'use client';

// StreakBadge.tsx — streak daily dérivé de l'historique (D-16, F-4)
import { useT } from '../i18n';

export function StreakBadge({ streak }: { streak: number }) {
  const [t] = useT();
  const s = streak > 1 ? 's' : '';
  return (
    <span className="streak-badge" data-testid="streak-badge" aria-label={t('streak.label', { n: streak, s })}>
      {t('streak.label', { n: streak, s })}
    </span>
  );
}
