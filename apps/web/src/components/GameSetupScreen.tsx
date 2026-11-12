'use client';

// ─────────────────────────────────────────────────────────────
// GameSetupScreen.tsx — D-40 : avant une partie classique, le joueur
// choisit le nombre de questions et le temps par question.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react';
import { useT } from '../i18n';
import { SETUP_OPTIONS, defaultSetup, type GameSetup } from '../config';
import { GameBar } from './GameBar';
import { Embers } from './Embers';

const KEY = (mode: string): string => `boilingbrain:setup:v1:${mode}`;

function lastSetup(mode: 'hot' | 'brain'): GameSetup {
  try {
    const raw = window.localStorage.getItem(KEY(mode));
    if (raw) {
      const j = JSON.parse(raw) as GameSetup;
      const o = SETUP_OPTIONS[mode];
      if (o.rounds.includes(j.rounds) && o.roundSec.includes(j.roundSec)) return j;
    }
  } catch {
    /* stockage indisponible */
  }
  return defaultSetup(mode);
}

export function GameSetupScreen({
  mode,
  themeLabel,
  themeIcon,
  onStart,
}: {
  mode: 'hot' | 'brain';
  themeLabel: string;
  themeIcon: string;
  onStart(setup: GameSetup): void;
}) {
  const [tr] = useT();
  const [setup, setSetup] = useState<GameSetup>(() => lastSetup(mode));
  const opts = SETUP_OPTIONS[mode];
  const modeLabel = mode === 'hot' ? tr('mode.boiling') : tr('mode.brain');
  const start = (): void => {
    try {
      window.localStorage.setItem(KEY(mode), JSON.stringify(setup));
    } catch {
      /* ignoré */
    }
    onStart(setup);
  };
  return (
    <>
      <GameBar icon={themeIcon} title={`${modeLabel} · ${themeLabel}`} subtitle={tr('setup.title')} />
      <Embers heat={0.2} />
      <main className="summary panel-screen" data-testid="game-setup">
        <h1>{mode === 'hot' ? '🔥' : '🧠'} {tr('setup.title')}</h1>
        <p className="lead">{tr('setup.lead')}</p>
        <section className="setup-group">
          <h2>{tr('setup.rounds')}</h2>
          <div className="choice-row" role="radiogroup" aria-label={tr('setup.rounds')}>
            {opts.rounds.map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={setup.rounds === n}
                className={`choice${setup.rounds === n ? ' on' : ''}`}
                onClick={() => setSetup({ ...setup, rounds: n })}
                data-testid={`setup-rounds-${n}`}
              >
                {n}
              </button>
            ))}
          </div>
        </section>
        <section className="setup-group">
          <h2>{tr('setup.time')}</h2>
          <div className="choice-row" role="radiogroup" aria-label={tr('setup.time')}>
            {opts.roundSec.map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={setup.roundSec === t}
                className={`choice${setup.roundSec === t ? ' on' : ''}`}
                onClick={() => setSetup({ ...setup, roundSec: t })}
                data-testid={`setup-time-${t}`}
              >
                {tr('setup.seconds', { s: t })}
              </button>
            ))}
          </div>
        </section>
        <button type="button" className="big" onClick={start} data-testid="setup-start">
          {tr('setup.start')}
        </button>
      </main>
    </>
  );
}
