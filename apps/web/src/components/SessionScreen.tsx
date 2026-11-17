'use client';

// ─────────────────────────────────────────────────────────────
// SessionScreen.tsx — orchestrateur visuel hot (spec §A.2)
// intro → preview (3 s) → answering (30 s, retry libre) → feedback
// (T_FEEDBACK auto-avance) → round suivant → synthèse.
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { GameConfig, HotCompletion, HotDiveState, LoadedBank } from '@hotbrain/engine';
import type { DiveSession } from '../hooks/useDiveSession';
import { MILESTONES } from '../content';
import { riseDurationMs, T_FEEDBACK } from '../motion';
import { hotbrainConfig, isUnlimitedRound } from '../config';
import { playFusion, playMiss, playTier } from '../sound';
import { useSoundPref } from '../hooks/useSoundPref';
import { GameBar } from './GameBar';
import { PixelWorld } from './PixelWorld';
import { useT } from '../i18n';
import { HeatBar } from './HeatBar';
import { Thermometer } from './Thermometer';
import { PromptCard } from './PromptCard';
import { AnswerInput } from './AnswerInput';
import { CountdownBar } from './CountdownBar';
import { FeedbackBanner } from './FeedbackBanner';
import { TierBadge } from './TierBadge';
import { SummaryScreen } from './SummaryScreen';
import { acceptIntoSheet, logVar, requestVar } from '../var/client';

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
  // VAR : une contestation par partie
  const [varUsed, setVarUsed] = useState(false);
  const [varBusy, setVarBusy] = useState(false);
  const [varMsg, setVarMsg] = useState<string | null>(null);
  const varRound = useRef(-1);
  useEffect(() => {
    if (varRound.current !== resultCount) {
      varRound.current = resultCount;
      setVarMsg(null);
    }
  }, [resultCount]);


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
        <PixelWorld temp={0} ambient={false} />
        <main className="summary panel-screen" data-testid="intro">
          <h1>{t('intro.boiling.title')}</h1>
          <p className="lead">
            {isUnlimitedRound(cfg.roundMs)
              ? t('intro.boiling.lead.unlimited', { n: cfg.rounds })
              : t('intro.boiling.lead', { n: cfg.rounds, s: cfg.roundMs / 1000 })}
          </p>
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
      <>
        <PixelWorld temp={score} ambient={false} />
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
      </>
    );
  }

  const lastResult = s.results[s.results.length - 1];

  const contest = async (): Promise<void> => {
    const input = s.rejected;
    if (!input || !prompt || varBusy || varUsed) return;
    setVarBusy(true);
    const out = await requestVar(prompt.text, input);
    setVarBusy(false);
    if (out.kind === 'error') {
      setVarMsg(t('var.error')); // pas de jeton consommé si le VAR est indisponible
      return;
    }
    setVarUsed(true);
    const v = out.verdict;
    logVar(window.localStorage, { promptId: prompt.id, question: prompt.text, input, valid: v.valid, tier: v.tier, answer: v.answer });
    if (v.valid) {
      acceptIntoSheet(bank, prompt.id, v, input);
      setVarMsg(t('var.accepted', { answer: v.answer, reason: v.reason }));
      session.submit(input);
    } else {
      setVarMsg(t('var.denied', { reason: v.reason }));
    }
  };

  // Révélation après chaque round : la réponse la plus rare (si on a fait moins
  // bien), ou un exemple facile après un temps écoulé — le « ah, j'aurais dû ! ».
  const tierNum = (x: string): number => Number(x.slice(1));
  let reveal: { key: 'feedback.rarest' | 'feedback.example'; answer: string } | null = null;
  if (phase === 'feedback' && lastResult) {
    const sheet = bank.sheets.get(lastResult.promptId);
    if (sheet) {
      if (lastResult.tier === null) {
        const easy = sheet.entries.find((e) => e.tier === 't1') ?? sheet.entries[0];
        if (easy) reveal = { key: 'feedback.example', answer: easy.answer };
      } else {
        const best = sheet.entries.reduce((a, b) => (tierNum(b.tier) > tierNum(a.tier) ? b : a));
        if (tierNum(best.tier) > tierNum(lastResult.tier)) reveal = { key: 'feedback.rarest', answer: best.answer };
      }
    }
  }

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
      <PixelWorld temp={score} muted={soundOff} />
      <div
        className={`session${phase === 'feedback' && lastResult?.tier === 't6' ? ' fusion-flash' : ''}`}
        data-testid="session-root"
      >
        <div className="session-main">
          <HeatBar score={score} max={700} />
          <div className="hud">
            <span className="score" data-testid="hud-score">{score} °C</span>
          </div>
          {prompt && (
            <PromptCard
              label={t('multi.question', { n: Math.min(s.roundIndex + 1, roundTotal), total: roundTotal })}
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
              {isUnlimitedRound(cfg.roundMs) ? (
                <p className="muted" data-testid="boiling-unlimited">{t('boiling.unlimited')}</p>
              ) : (
                <CountdownBar
                  remainingMs={(s.answerEndsAt ?? 0) - session.now}
                  totalMs={cfg.roundMs}
                />
              )}
              <div style={{ marginTop: '1rem' }}>
                <AnswerInput
                  value={s.draft ?? ''}
                  disabled={false}
                  maxLength={hotbrainConfig.maxAnswerLength}
                  onChange={session.editDraft}
                  onSubmit={session.submit}
                  selectSignal={s.rejected ?? null}
                />
              </div>
              <div className="skip-row">
                <button type="button" className="secondary" onClick={session.skipRound} data-testid="skip-question">
                  {t('question.skip')}
                </button>
              </div>
              <FeedbackBanner
                rejected={s.rejected}
                correction={s.correction}
                onApplyCorrection={session.applyCorrection}
              />
              {s.rejected && !s.correction && !varUsed && (
                <button type="button" className="secondary" disabled={varBusy} onClick={() => void contest()} data-testid="var-button">
                  {varBusy ? t('var.checking') : t('var.button')}
                </button>
              )}
              {varMsg && <p className="muted" role="status" data-testid="var-message">{varMsg}</p>}
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
              {varMsg && <p className="muted" role="status">{varMsg}</p>}
              {reveal && (
                <p className="muted" data-testid="feedback-reveal">
                  {t(reveal.key, { answer: reveal.answer })}
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
