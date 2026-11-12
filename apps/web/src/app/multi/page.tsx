'use client';

// ─────────────────────────────────────────────────────────────
// /multi — créer un salon (hôte) ou rejoindre un salon avec son code.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameBar } from '../../components/GameBar';
import { Embers } from '../../components/Embers';
import { saveMulti } from '../../state/multi-store';
import { THEMES } from '../../themes';

export default function MultiHome() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('general');
  const [rounds, setRounds] = useState(7);
  const [roundSec, setRoundSec] = useState(30);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function create(): Promise<void> {
    setBusy(true);
    setError(null);
    const r = await fetch('/api/multi/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, theme, rounds, roundSec }),
    });
    const j = (await r.json()) as { code?: string; playerId?: string; error?: string };
    setBusy(false);
    if (!r.ok || !j.code || !j.playerId) {
      setError(j.error ?? 'Impossible de créer le salon');
      return;
    }
    saveMulti(j.code, { playerId: j.playerId, name: name.trim() || 'Joueur' });
    router.push(`/multi/${j.code}`);
  }

  async function join(): Promise<void> {
    setBusy(true);
    setError(null);
    const c = code.trim().toUpperCase();
    const r = await fetch(`/api/multi/rooms/${c}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const j = (await r.json()) as { playerId?: string; error?: string };
    setBusy(false);
    if (!r.ok || !j.playerId) {
      setError(j.error ?? 'Impossible de rejoindre');
      return;
    }
    saveMulti(c, { playerId: j.playerId, name: name.trim() });
    router.push(`/multi/${c}`);
  }

  return (
    <>
      <GameBar icon="👥" title="Multijoueur" subtitle="En ligne, jusqu'à 10 joueurs" />
      <Embers heat={0.3} />
      <main className="summary" data-testid="multi-home">
        <h1>Multijoueur</h1>
        <p className="lead">Même question, même chrono, qui trouve la réponse la plus rare gagne.</p>

        <label className="field">
          <span>Ton pseudo</span>
          <input type="text" value={name} maxLength={20} onChange={(e) => setName(e.target.value)} data-testid="multi-name" />
        </label>

        <section className="mode-card brain" style={{ marginTop: '1rem' }}>
          <h2>Créer un salon</h2>
          <label className="field">
            <span>Thème</span>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              {THEMES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </label>
          <div className="choice-row" role="radiogroup" aria-label="Nombre de questions">
            {[3, 5, 7, 10].map((n) => (
              <button key={n} type="button" role="radio" aria-checked={rounds === n} className={`choice${rounds === n ? ' on' : ''}`} onClick={() => setRounds(n)}>
                {n} q.
              </button>
            ))}
          </div>
          <div className="choice-row" role="radiogroup" aria-label="Temps par question">
            {[15, 30, 45, 60].map((t) => (
              <button key={t} type="button" role="radio" aria-checked={roundSec === t} className={`choice${roundSec === t ? ' on' : ''}`} onClick={() => setRoundSec(t)}>
                {t} s
              </button>
            ))}
          </div>
          <button type="button" className="big" disabled={busy} onClick={create} data-testid="multi-create">
            Créer le salon
          </button>
        </section>

        <section className="mode-card hot" style={{ marginTop: '1rem' }}>
          <h2>Rejoindre un salon</h2>
          <label className="field">
            <span>Code du salon</span>
            <input type="text" value={code} maxLength={5} onChange={(e) => setCode(e.target.value.toUpperCase())} data-testid="multi-code" />
          </label>
          <button type="button" className="big secondary" disabled={busy || code.trim().length !== 5} onClick={join} data-testid="multi-join">
            Rejoindre
          </button>
        </section>

        {error && <p className="feedback rejected" role="alert">{error}</p>}
      </main>
    </>
  );
}
