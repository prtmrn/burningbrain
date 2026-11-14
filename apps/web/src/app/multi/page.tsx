'use client';

// ─────────────────────────────────────────────────────────────
// /multi — créer un salon (hôte) ou rejoindre un salon avec son code.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react';
import { DIFFICULTY_OPTIONS } from '../../config';
import type { DifficultyChoice } from '@hotbrain/engine';
import { useRouter } from 'next/navigation';
import { GameBar } from '../../components/GameBar';
import { Embers } from '../../components/Embers';
import { saveMulti } from '../../state/multi-store';
import { THEMES } from '../../themes';
import { useT, useLang, type Lang } from '../../i18n';
import { errorText } from '../../i18n/errors';

export default function MultiHome() {
  const router = useRouter();
  const [t] = useT();
  const [lang] = useLang();
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('general');
  const [rounds, setRounds] = useState(7);
  const [roundSec, setRoundSec] = useState(30);
  const [mode, setMode] = useState<'hot' | 'brain'>('hot');
  const [brainGoal, setBrainGoal] = useState(500);
  const [showScores, setShowScores] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyChoice>('auto');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function create(): Promise<void> {
    setBusy(true);
    setError(null);
    const r = await fetch('/api/multi/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, theme, rounds, roundSec, lang, mode, brainGoal, showScores, difficulty }),
    });
    const j = (await r.json()) as { code?: string; playerId?: string; error?: string };
    setBusy(false);
    if (!r.ok || !j.code || !j.playerId) {
      setError(errorText(j.error, lang) ?? t('multi.error.create'));
      return;
    }
    saveMulti(j.code, { playerId: j.playerId, name: name.trim() || 'Player' });
    router.push(`/multi/${j.code}`);
  }

  async function join(): Promise<void> {
    setBusy(true);
    setError(null);
    const c = code.trim().toUpperCase();
    const r = await fetch(`/api/multi/rooms/${c}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, lang }),
    });
    const j = (await r.json()) as { playerId?: string; error?: string };
    setBusy(false);
    if (!r.ok || !j.playerId) {
      setError(errorText(j.error, lang) ?? t('multi.error.join'));
      return;
    }
    saveMulti(c, { playerId: j.playerId, name: name.trim() });
    router.push(`/multi/${c}`);
  }

  return (
    <>
      <GameBar icon="👥" title={t('multi.title')} subtitle={t('multi.subtitle')} />
      <Embers heat={0.3} />
      <main className="summary" data-testid="multi-home">
        <h1>{t('multi.title')}</h1>
        <p className="lead">{t('multi.lead')}</p>

        <label className="field">
          <span>{t('multi.name')}</span>
          <input type="text" value={name} maxLength={20} onChange={(e) => setName(e.target.value)} data-testid="multi-name" />
        </label>

        <section className="mode-card brain" style={{ marginTop: '1rem' }}>
          <h2>{t('multi.create.title')}</h2>
          <label className="field">
            <span>{t('multi.theme')}</span>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              {THEMES.filter((th) => lang === 'fr' || th.id === 'general').map((th) => (
                <option key={th.id} value={th.id}>{th.label}</option>
              ))}
            </select>
          </label>
          <h3 className="multi-sub">{t('multi.mode.label')}</h3>
          <div className="choice-row" role="radiogroup" aria-label={t('multi.mode.label')}>
            {(['hot', 'brain'] as const).map((m) => (
              <button key={m} type="button" role="radio" aria-checked={mode === m} className={`choice${mode === m ? ' on' : ''}`} onClick={() => setMode(m)}>
                {m === 'hot' ? t('multi.mode.boiling') : t('multi.mode.brain')}
              </button>
            ))}
          </div>
          <p className="multi-hint">{mode === 'hot' ? t('multi.mode.boiling.desc') : t('multi.mode.brain.desc')}</p>
          {mode === 'brain' && (
            <>
              <h3 className="multi-sub">{t('multi.goal.label')}</h3>
              <div className="choice-row" role="radiogroup" aria-label={t('multi.goal.label')}>
                {[100, 200, 300, 500, 750, 1000].map((g) => (
                  <button key={g} type="button" role="radio" aria-checked={brainGoal === g} className={`choice${brainGoal === g ? ' on' : ''}`} onClick={() => setBrainGoal(g)} data-testid={`goal-${g}`}>
                    {g}
                  </button>
                ))}
              </div>
              <label className="field multi-check">
                <input type="checkbox" checked={showScores} onChange={(e) => setShowScores(e.target.checked)} data-testid="show-scores" />
                <span>{t('multi.showscores')}</span>
              </label>
            </>
          )}
          <h3 className="multi-sub">{t('multi.rounds.label')}</h3>
          <div className="choice-row" role="radiogroup" aria-label={t('multi.rounds.label')}>
            {[3, 5, 7, 10].map((n) => (
              <button key={n} type="button" role="radio" aria-checked={rounds === n} className={`choice${rounds === n ? ' on' : ''}`} onClick={() => setRounds(n)}>
                {n}
              </button>
            ))}
          </div>
          <h3 className="multi-sub">{t('multi.time.label')}</h3>
          <div className="choice-row" role="radiogroup" aria-label={t('multi.time.label')}>
            {[15, 30, 45, 60].map((sec) => (
              <button key={sec} type="button" role="radio" aria-checked={roundSec === sec} className={`choice${roundSec === sec ? ' on' : ''}`} onClick={() => setRoundSec(sec)}>
                {t('setup.seconds', { s: sec })}
              </button>
            ))}
          </div>
          <h3 className="multi-sub">{t('difficulty.label')}</h3>
          <div className="choice-row" role="radiogroup" aria-label={t('difficulty.label')}>
            {DIFFICULTY_OPTIONS.map((d) => (
              <button
                key={d}
                type="button"
                role="radio"
                aria-checked={difficulty === d}
                className={`choice${difficulty === d ? ' on' : ''}`}
                onClick={() => setDifficulty(d)}
                data-testid={`multi-difficulty-${d}`}
              >
                {t(`difficulty.${d}`)}
              </button>
            ))}
          </div>
          <button type="button" className="big" disabled={busy} onClick={create} data-testid="multi-create">
            {t('multi.create')}
          </button>
        </section>

        <section className="mode-card hot" style={{ marginTop: '1rem' }}>
          <h2>{t('multi.join.title')}</h2>
          <label className="field">
            <span>{t('multi.code')}</span>
            <input type="text" value={code} maxLength={5} onChange={(e) => setCode(e.target.value.toUpperCase())} data-testid="multi-code" />
          </label>
          <button type="button" className="big secondary" disabled={busy || code.trim().length !== 5} onClick={join} data-testid="multi-join">
            {t('multi.join')}
          </button>
        </section>

        {error && <p className="feedback rejected" role="alert">{error}</p>}
      </main>
    </>
  );
}

export type { Lang };
