// ─────────────────────────────────────────────────────────────
// FeedbackBanner.tsx — retry libre hot : refus bref non bloquant,
// suggestion de correction (jamais appliquée d'office — I-02).
// ─────────────────────────────────────────────────────────────
import type { CorrectionSuggestion } from '@hotbrain/engine';
import { useT } from '../i18n';

export interface FeedbackBannerProps {
  rejected: string | null | undefined;
  correction: CorrectionSuggestion | null | undefined;
  onApplyCorrection(): void;
}

export function FeedbackBanner({ rejected, correction, onApplyCorrection }: FeedbackBannerProps) {
  const [t] = useT();
  if (correction) {
    return (
      <div className="feedback correction" role="status" data-testid="feedback-correction">
        <p>
          {t('feedback.correction.maybe')} <strong>{correction.to}</strong> ?
        </p>
        <button type="button" onClick={onApplyCorrection} data-testid="apply-correction">
          {t('feedback.apply', { to: correction.to })}
        </button>
      </div>
    );
  }
  if (rejected) {
    return (
      <div className="feedback rejected" role="status" data-testid="feedback-rejected">
        {t('feedback.rejected.retry', { input: rejected ?? '' })}
      </div>
    );
  }
  return null;
}
