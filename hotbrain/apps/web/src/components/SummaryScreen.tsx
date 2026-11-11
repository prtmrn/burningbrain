'use client';

// ─────────────────────────────────────────────────────────────
// SummaryScreen.tsx — écran de fin = RÉVÉLATION (game-loop reco 5)
// Score total °C, verdict par bande, récapitulatif des 7 rounds,
// révélation des réponses acceptées par prompt, partage thermo-colonne,
// streak. Percentile : placeholder M3 (refdist livrée au volet contenu).
// ─────────────────────────────────────────────────────────────
import type { AnswerSheet, HotCompletion, TierId } from '@hotbrain/engine';
import { BrainStage } from './BrainStage';
import { TIER_ICONS, TIER_LABELS, buildShareText, verdictFor } from '../content';
import { TierBadge } from './TierBadge';
import { ShareButton } from './ShareButton';
import { StreakBadge } from './StreakBadge';

const TIER_ORDER: TierId[] = ['t1', 't2', 't3', 't4', 't5', 't6'];

export interface SummaryScreenProps {
  completion: HotCompletion;
  sheets: Map<string, AnswerSheet>;
  streak: number;
  dayLabel: string;
  themeLabel: string;
  percentileText?: string;
  /** Décision backlog M2 : appelé quand le joueur quitte la synthèse —
   *  efface le dive 'done' puis navigue. */
  onExit(): void;
}

export function SummaryScreen({
  completion,
  sheets,
  streak,
  dayLabel,
  themeLabel,
  percentileText,
  onExit,
}: SummaryScreenProps) {
  const verdict = verdictFor(completion.score);
  const shareText = buildShareText(completion, {
    dayLabel,
    themeLabel,
    ...(percentileText !== undefined ? { percentileText } : {}),
  });

  return (
    <main className="summary" data-testid="summary">
      <header>
        <BrainStage heat={Math.min(1, completion.score / 700)} />
        <p className="muted" style={{ marginTop: '2.2rem' }}>Le mercure est monté à…</p>
        <p className="total" data-testid="summary-score">
          {completion.score} °C
        </p>
        <p className="verdict-title" data-testid="summary-verdict">
          {TIER_ICONS[verdict.tier]} {verdict.title}
        </p>
        <p className="verdict-phrase">{verdict.phrase}</p>
        {percentileText !== undefined && (
          <p data-testid="summary-percentile">{percentileText}</p>
        )}
        <StreakBadge streak={streak} />
      </header>

      <section aria-label="Récapitulatif des rounds">
        {completion.results.map((r, i) => {
          const sheet = sheets.get(r.promptId);
          const tierLabel = r.tier;
          return (
            <article className="round-row" key={r.promptId} data-testid={`round-row-${i}`}>
              <div className="round-head">
                <div>
                  <strong>{r.promptText}</strong>
                  <div className="muted">
                    {r.answer !== null
                      ? `Ta réponse : ${r.answer}`
                      : r.rawAnswer
                        ? `Temps écoulé (« ${r.rawAnswer} » ne comptait pas)`
                        : 'Temps écoulé'}
                  </div>
                </div>
                {tierLabel !== null ? (
                  <TierBadge tier={tierLabel} points={r.score} />
                ) : (
                  <span aria-label="Round manqué">⚪ 0 °C</span>
                )}
              </div>
              {sheet && (
                <div className="sheet-reveal" aria-label="Réponses acceptées">
                  {TIER_ORDER.map((tier) =>
                    sheet.entries
                      .filter((e) => e.tier === tier)
                      .map((e) => (
                        <span
                          key={e.answer}
                          className={`sheet-chip${e.answer === r.answer ? ' yours' : ''}`}
                          title={`${TIER_LABELS[tier]} — ${tier.toUpperCase()}`}
                        >
                          {TIER_ICONS[tier]} {e.answer}
                        </span>
                      )),
                  )}
                </div>
              )}
            </article>
          );
        })}
      </section>

      <footer style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
        <ShareButton text={shareText} />
        <button type="button" className="secondary" onClick={onExit} data-testid="exit-summary">
          Retour à l'accueil
        </button>
      </footer>
      <pre data-testid="share-text" style={{ display: 'none' }}>
        {shareText}
      </pre>
    </main>
  );
}
