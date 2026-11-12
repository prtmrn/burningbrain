'use client';

// ─────────────────────────────────────────────────────────────
// BrainSessionScreen.tsx — mode Brain (D-11) : 5 questions × 60 s, on donne
// un maximum de réponses ; chaque réponse acceptée rapporte ses points de
// rareté, les doublons sont ignorés. Fin : récolte (trouvées / manquées).
// ─────────────────────────────────────────────────────────────
import { useEffect } from 'react';
import { sheetCeiling, type BrainDiveState, type GameConfig, type LoadedBank, type TierId } from '@hotbrain/engine';
import type { DiveSession } from '../hooks/useDiveSession';
import { useSoundPref } from '../hooks/useSoundPref';
import { TIER_ICONS, TIER_LABELS } from '../content';
import { BRAIN_GOAL, hotbrainConfig } from '../config';
import { playMiss, playTier } from '../sound';
import { PromptCard } from './PromptCard';
import { AnswerInput } from './AnswerInput';
import { CountdownBar } from './CountdownBar';
import { BrainMeter } from './BrainMeter';
import { GameBar } from './GameBar';
import { Embers } from './Embers';

export interface BrainSessionScreenProps {
  session: DiveSession;
  bank: LoadedBank;
  promptIds: string[];
  themeLabel: string;
  themeIcon: string;
  dayLabel: string;
  muted?: boolean;
  config?: GameConfig;
  onExit(): void;
}

const TIER_ORDER: TierId[] = ['t6', 't5', 't4', 't3', 't2', 't1'];

export function BrainSessionScreen({
  session,
  bank,
  promptIds,
  themeLabel,
  themeIcon,
  dayLabel,
  muted = false,
  config = hotbrainConfig,
  onExit,
}: BrainSessionScreenProps) {
  const s = session.state as BrainDiveState | null;
  const [soundOff, toggleSound] = useSoundPref(muted);
  const phase = s?.phase;
  const fb = s?.lastFeedback ?? null;
  const banked = (s?.results ?? []).reduce((a, r) => a + r.score, 0);
  const live = (s?.currentAnswers ?? []).reduce((a, x) => a + x.score, 0);
  const total = banked + live;
  const lastAccepted = s?.currentAnswers[s.currentAnswers.length - 1];
  const goal = config.modes.brain.winScore ?? BRAIN_GOAL;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--heat', String(Math.min(1, total / goal)));
    return () => {
      root.style.removeProperty('--heat');
    };
  }, [total]);

  // Son à chaque verdict (une fois par retour)
  useEffect(() => {
    if (!fb) return;
    if (fb.kind === 'accepted' && lastAccepted) playTier(Number(lastAccepted.tier.slice(1)) - 1, soundOff);
    else if (fb.kind === 'rejected') playMiss(soundOff);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fb?.at]);

  if (!s) return null;
  const cfg = config.modes.brain;
  const title = `Brain · ${themeLabel}`;
  const bar = (
    <GameBar
      icon={themeIcon}
      title={title}
      subtitle={dayLabel}
      right={
        phase === 'listing' || phase === 'preview' ? (
          <span className="round-pill">
            {Math.min(s.roundIndex + 1, cfg.rounds)} / {cfg.rounds}
          </span>
        ) : undefined
      }
      soundOff={soundOff}
      onToggleSound={toggleSound}
    />
  );

  if (s.pausedAt !== undefined) {
    return (
      <>
        {bar}
        <main className="summary panel-screen" data-testid="paused">
          <h1>Pause</h1>
          <p>Le chrono est arrêté tant que tu n'es pas revenu.</p>
          <button type="button" autoFocus onClick={session.resumePlay} data-testid="resume-button">
            Reprendre
          </button>
        </main>
      </>
    );
  }

  if (phase === 'intro') {
    return (
      <>
        {bar}
        <Embers heat={0.15} />
        <main className="summary panel-screen" data-testid="intro">
          <h1>🧠 Mode Brain</h1>
          <p className="lead">
            {cfg.rounds} questions · {cfg.roundMs / 1000} secondes chacune · un maximum de réponses.
          </p>
          <p>
            Enchaîne les réponses : chacune rapporte des neurones selon sa rareté, les doublons
            sont ignorés. Remplis ton cerveau : <strong>{goal} neurones</strong> et la partie est gagnée.
          </p>
          <button type="button" className="big" autoFocus onClick={session.startSession} data-testid="start-button">
            Commencer
          </button>
        </main>
      </>
    );
  }

  if (phase === 'done') {
    const ceiling = promptIds.reduce((a, id) => {
      const sh = bank.sheets.get(id);
      return a + (sh ? sheetCeiling(sh) : 0);
    }, 0);
    const found = s.results.reduce((a, r) => a + r.answersGiven.length, 0);
    const won = banked >= goal;
    return (
      <>
        {bar}
        <Embers heat={Math.min(1, banked / goal)} />
        <main className="summary" data-testid="brain-summary">
          <h1 className={`brain-verdict${won ? ' won' : ''}`} data-testid="brain-verdict">
            {won ? '🧠 Cerveau plein ! Partie gagnée' : 'Cerveau pas encore plein…'}
          </h1>
          <BrainMeter value={banked} goal={goal} />
          <p className="lead">
            {found} réponses trouvées · {ceiling > 0 ? Math.round((100 * banked) / ceiling) : 0} % des neurones possibles
          </p>
          {s.results.map((r) => {
            const sheet = bank.sheets.get(r.promptId);
            const given = new Set(r.answersGiven.map((a) => a.answer));
            const missed = (sheet?.entries ?? []).filter((e) => !given.has(e.answer));
            return (
              <article className="round-row" key={r.promptId}>
                <div className="round-head">
                  <strong>{r.promptText}</strong>
                  <span className="tier-points">+{r.score} neurones</span>
                </div>
                <div className="sheet-reveal">
                  {r.answersGiven.map((a) => (
                    <span key={a.answer} className="sheet-chip yours" title={TIER_LABELS[a.tier]}>
                      {TIER_ICONS[a.tier]} {a.answer}
                    </span>
                  ))}
                  {r.answersGiven.length === 0 && <span className="muted">Aucune réponse</span>}
                </div>
                {missed.length > 0 && (
                  <details>
                    <summary className="muted">Voir les {missed.length} réponses manquées</summary>
                    <div className="sheet-reveal">
                      {TIER_ORDER.flatMap((t) =>
                        missed
                          .filter((e) => e.tier === t)
                          .map((e) => (
                            <span key={e.answer} className="sheet-chip" title={TIER_LABELS[t]}>
                              {TIER_ICONS[t]} {e.answer}
                            </span>
                          )),
                      )}
                    </div>
                  </details>
                )}
              </article>
            );
          })}
          <p>
            <button
              type="button"
              className="big"
              onClick={() => {
                session.clearAndExit();
                onExit();
              }}
            >
              Terminer
            </button>
          </p>
        </main>
      </>
    );
  }

  const prompt = bank.prompts.find((p) => p.id === promptIds[s.roundIndex]);
  const age = fb ? session.now - fb.at : Infinity;
  const showFb = fb && (fb.kind === 'correction' || age < (fb.kind === 'accepted' ? 1_200 : 1_800));

  return (
    <>
      {bar}
      <Embers heat={Math.min(1, total / goal)} />
      <div className="session brain-session" data-testid="session-root">
        <div className="session-main">
          <div className="hud">
            <span className="score" data-testid="hud-score">{total} / {goal} neurones</span>
            <span className="muted">{s.currentAnswers.length} trouvée{s.currentAnswers.length > 1 ? 's' : ''}</span>
          </div>
          <BrainMeter
            value={total}
            goal={goal}
            gain={fb && fb.kind === 'accepted' && fb.score ? { points: fb.score, key: fb.at } : undefined}
          />
          {prompt && (
            <PromptCard label={`Question ${Math.min(s.roundIndex + 1, cfg.rounds)} / ${cfg.rounds}`} text={prompt.text} />
          )}

          {phase === 'preview' && (
            <div data-testid="preview">
              <CountdownBar remainingMs={(s.previewEndsAt ?? 0) - session.now} totalMs={cfg.previewMs} />
              <p className="muted">Prépare-toi à tout sortir…</p>
            </div>
          )}

          {phase === 'listing' && (
            <div data-testid="listing">
              <CountdownBar remainingMs={(s.answerEndsAt ?? 0) - session.now} totalMs={cfg.roundMs} urgentBelowMs={10_000} />
              <div style={{ marginTop: '1rem' }}>
                <AnswerInput
                  value={s.draft ?? ''}
                  disabled={false}
                  maxLength={config.maxAnswerLength}
                  onChange={session.editDraft}
                  onSubmit={session.submit}
                  placeholder="Tape une réponse, Entrée, et continue…"
                />
              </div>
              {showFb && fb && (
                <div className={`feedback ${fb.kind}`} role="status" data-testid={`listing-${fb.kind}`}>
                  {fb.kind === 'accepted' && <>✔ « {fb.input} » +{fb.score} neurones</>}
                  {fb.kind === 'duplicate' && <>Déjà compté : « {fb.input} »</>}
                  {fb.kind === 'rejected' && <>« {fb.input} » n'est pas reconnu</>}
                  {fb.kind === 'correction' && (
                    <>
                      Tu voulais dire <strong>{fb.to}</strong> ?{' '}
                      <button type="button" onClick={session.applyCorrection} data-testid="apply-correction">
                        Oui
                      </button>
                    </>
                  )}
                </div>
              )}
              <div className="found-list" aria-label="Réponses trouvées">
                {[...s.currentAnswers].reverse().map((a) => (
                  <span key={a.answer} className="sheet-chip yours" title={TIER_LABELS[a.tier]}>
                    {TIER_ICONS[a.tier]} {a.answer} <em>+{a.score}</em>
                  </span>
                ))}
              </div>
              <p>
                <button type="button" className="secondary" onClick={session.abandonRound} data-testid="next-question">
                  Question suivante ▸
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
