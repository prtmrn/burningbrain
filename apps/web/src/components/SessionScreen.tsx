'use client';

// ─────────────────────────────────────────────────────────────
// SessionScreen.tsx — orchestrateur visuel hot (spec §A.2)
// intro → preview (3 s) → answering (30 s, retry libre) → feedback
// (T_FEEDBACK auto-avance) → round suivant → synthèse.
// ─────────────────────────────────────────────────────────────
import { useEffect, type CSSProperties } from 'react';
import type { GameConfig, HotCompletion, HotDiveState, LoadedBank } from '@hotbrain/engine';
import type { DiveSession } from '../hooks/useDiveSession';
import { MILESTONES } from '../content';
import { riseDurationMs, T_FEEDBACK } from '../motion';
import { hotbrainConfig } from '../config';
import { playFusion, playMiss, playTier } from '../sound';
import { useSoundPref } from '../hooks/useSoundPref';
import { GameBar } from './GameBar';
import { Embers } from './Embers';
import { useT } from '../i18n';
import { HeatBar } from './HeatBar';
import { Thermometer } from './Thermometer';
import { PromptCard } from './PromptCard';
import { AnswerInput } from './AnswerInput';
import { CountdownBar } from './CountdownBar';
import { FeedbackBanner } from './FeedbackBanner';
import { TierBadge } from './TierBadge';
import { SummaryScreen } from './SummaryScreen';
import { BrainStage } from './BrainStage';

export interface SessionScreenProps {
  session: DiveSession;
  bank: LoadedBank;
  promptIds: string[];
  streak: number;
  dayLabel: string;
  themeLabel: string;
  themeIcon: string;
  /** Préférence « son coupé » (prefs.muted). */
  muted?: boolean;
  /** D-40 : réglages de la partie (rounds, temps). */
  config?: GameConfig;
  onExit(): void;
}

function completionFromState(s: HotDiveState): HotCompletion {
  return {
    mode: 'hot',
    playKind: s.playKind,
    theme: s.theme,
    scope: s.date,
    game: s.dayNumber,
    score: s.results.reduce((acc, r) => acc + r.score, 0),
    tiers: s.results.map((r) => r.tier ?? 'miss'),
    results: s.results,
    contentVersion: 0, // non affiché — la version persistée vit dans l'historique
    endedBy: 'completed',
  };
}

export function SessionScreen({
  session,
  bank,
  promptIds,
  streak,
  dayLabel,
  themeLabel,
  themeIcon,
  muted = false,
  config = hotbrainConfig,
  onExit,
}: SessionScreenProps) {
  const [t] = useT();
  const s = session.state as HotDiveState | null;
  const phase = s?.phase;
  const resultCount = s?.results.length ?? 0;
  const lastTier = s?.results[resultCount - 1]?.tier ?? null;
  const heatScore = (s?.results ?? []).reduce((acc, r) => acc + r.score, 0);
  const [soundOff, toggleSound] = useSoundPref(muted);


  // Fond qui se réchauffe avec le score (variable CSS sur la racine)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--heat', String(Math.min(1, heatScore / 700)));
    return () => {
      root.style.removeProperty('--heat');
    };
  }, [heatScore]);

  // Son à chaque verdict de round (une fois par round)
  useEffect(() => {
    if (phase !== 'feedback' || resultCount === 0) return;
    if (lastTier === null) playMiss(soundOff);
    else if (lastTier === 't6') playFusion(soundOff);
    else playTier(Number(lastTier.slice(1)) - 1, soundOff);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, resultCount]);

  // Entrée = ack anticipé pendant le feedback
  useEffect(() => {
    if (phase !== 'feedback') return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Enter') session.ackFeedback();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, session]);

  if (!s) return null;

  const cfg = config.modes.hot;
  const score = s.results.reduce((acc, r) => acc + r.score, 0);
  const roundTotal = cfg.rounds;
  const prompt = bank.prompts.find((p) => p.id === promptIds[s.roundIndex]);

  // ── Pause (visibilitychange hidden) ──
  if (s.pausedAt !== undefined) {
    return (
      <>
        <GameBar icon={themeIcon} title={`${t('mode.boiling')} · ${themeLabel}`} subtitle={dayLabel} />
        <main className="summary panel-screen" data-testid="paused">
          <h1>{t('pause.title')}</h1>
          <p>{t('pause.body')}</p>
          <button type="button" autoFocus onClick={session.resumePlay} data-testid="resume-button">
            {t('pause.resume')}
          </button>
        </main>
      </>
    );
  }

  // ── Intro ──
  if (phase === 'intro') {
    return (
      <>
        <GameBar icon={themeIcon} title={`${t('mode.boiling')} · ${themeLabel}`} subtitle={dayLabel} />
        <Embers heat={0.15} />
        <main className="summary panel-screen" data-testid="intro">
          <h1>{t('intro.boiling.title')}</h1>
          <p className="lead">{t('intro.boiling.lead', { n: cfg.rounds, s: cfg.roundMs / 1000 })}</p>
          <p>
            {t('intro.boiling.body')}
          </p>
          <button type="button" className="big" autoFocus onClick={session.startSession} data-testid="start-button">
            {t('intro.boiling.start')}
          </button>
        </main>
      </>
    );
  }

  // ── Synthèse ──
  if (phase === 'done') {
    return (
      <SummaryScreen
        completion={completionFromState(s)}
        sheets={bank.sheets}
        streak={streak}
        dayLabel={dayLabel}
        themeLabel={themeLabel}
        onExit={() => {
          session.clearAndExit(); // backlog M2 tranché : clear après synthèse vue
          onExit();
        }}
      />
    );
  }

  const lastResult = s.results[s.results.length - 1];
  const riseMs =
    phase === 'feedback' && lastResult ? riseDurationMs(lastResult.score) : 600;

  return (
    <>
      <GameBar
        icon={themeIcon}
        title={`${t('mode.boiling')} · ${themeLabel}`}
        subtitle={dayLabel}
        right={
          <span className="round-pill">
            {Math.min(s.roundIndex + 1, roundTotal)} / {roundTotal}
          </span>
        }
        soundOff={soundOff}
        onToggleSound={toggleSound}
      />
      <Embers heat={score / 700} />
      <div
        className={`session${phase === 'feedback' && lastResult?.tier === 't6' ? ' fusion-flash' : ''}`}
        data-testid="session-root"
      >
        <div className="session-main">
          <HeatBar score={score} max={700} />
          <div className="hud">
            <span className="score" data-testid="hud-score">{score} °C</span>
          </div>
          <BrainStage
            heat={score / 700}
            gain={
              phase === 'feedback' && lastResult && lastResult.score > 0
                ? { points: lastResult.score, key: s.results.length }
                : undefined
            }
          />
          {prompt && (
            <PromptCard
              label={`Prompt ${Math.min(s.roundIndex + 1, roundTotal)} / ${roundTotal}`}
              text={prompt.text}
            />
          )}

          {phase === 'preview' && (
            <div data-testid="preview">
              <CountdownBar
                remainingMs={(s.previewEndsAt ?? 0) - session.now}
                totalMs={cfg.previewMs}
              />
              <p className="muted">{t('preview.boiling')}</p>
            </div>
          )}

          {phase === 'answering' && (
            <div data-testid="answering">
              <CountdownBar
                remainingMs={(s.answerEndsAt ?? 0) - session.now}
                totalMs={cfg.roundMs}
              />
              <div style={{ marginTop: '1rem' }}>
                <AnswerInput
                  value={s.draft ?? ''}
                  disabled={false}
                  maxLength={hotbrainConfig.maxAnswerLength}
                  onChange={session.editDraft}
                  onSubmit={session.submit}
                />
              </div>
              <FeedbackBanner
                rejected={s.rejected}
                correction={s.correction}
                onApplyCorrection={session.applyCorrection}
              />
            </div>
          )}

          {phase === 'feedback' && lastResult && (
            <div data-testid="feedback">
              {lastResult.tier !== null ? (
                <>
                  <TierBadge tier={lastResult.tier} points={lastResult.score} />
                  <p className="feedback-answer">
                    {lastResult.viaCorrection ? (
                      <>
                        {t('feedback.yourAnswer')} <s className="muted">{lastResult.rawAnswer}</s>{' '}
                        <span data-testid="autocorrected">{t('feedback.correctedTo')}</span>{' '}
                        <strong>{lastResult.answer}</strong>
                      </>
                    ) : (
                      <>
                        {t('feedback.yourAnswer')} <strong>{lastResult.answer}</strong>
                      </>
                    )}
                  </p>
                  {lastResult.quip && <p className="muted">{lastResult.quip}</p>}
                </>
              ) : (
                <p data-testid="miss-note">
                  {t('feedback.miss')}
                </p>
              )}
              <button
                type="button"
                autoFocus
                onClick={session.ackFeedback}
                data-testid="continue-button"
              >
                {t('feedback.continue')}
              </button>
              <p className="muted">
                {t('feedback.auto', { n: Math.round(T_FEEDBACK / 1_000) })}
              </p>
            </div>
          )}
        </div>

        <Thermometer score={score} max={700} milestones={MILESTONES.map((m, i) => ({ ...m, label: t(`ms.${i}`) }))} riseMs={riseMs} />
      </div>
    </>
  );
}
