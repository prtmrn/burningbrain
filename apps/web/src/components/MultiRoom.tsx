'use client';

// ─────────────────────────────────────────────────────────────
// MultiRoom.tsx — un salon en ligne : lobby, compte à rebours, manches
// synchrones, saisie jugée par le serveur, classement final. L'heure est
// celle du serveur (décalage mesuré à chaque réponse d'état).
// ─────────────────────────────────────────────────────────────
import { useEffect, useState, type FormEvent } from 'react';
import { GameBar } from './GameBar';
import { Embers } from './Embers';
import { loadMulti, saveMulti, type MultiMe } from '../state/multi-store';
import { TIER_ICONS, TIER_LABELS } from '../content';

type Phase =
  | { kind: 'lobby' }
  | { kind: 'countdown'; startsAt: number }
  | { kind: 'preview'; round: number; endsAt: number }
  | { kind: 'answering'; round: number; endsAt: number }
  | { kind: 'done' };

interface RoomState {
  now: number;
  code: string;
  theme: string;
  rounds: number;
  roundSec: number;
  isHost: boolean;
  phase: Phase;
  players: { id: string; name: string }[];
  ranking: { playerId: string; name: string; score: number; answers: number }[];
  current: { round: number; text: string } | null;
  mine: Record<string, { answer: string; tier: string; score: number }>;
  reveal: { round: number; text: string; entries: { answer: string; tier: string }[] }[] | null;
}

interface Verdict {
  kind: string;
  answer?: string;
  score?: number;
  round: number;
}

const VERDICT_TEXT: Record<string, string> = {
  already: 'Tu as déjà trouvé une réponse pour cette question.',
  rejected: "Cette réponse n'est pas reconnue.",
  none: '',
  late: 'Temps écoulé.',
  waiting: 'La partie n’a pas encore commencé.',
  ended: 'La partie est terminée.',
  unknown: 'Salon ou joueur introuvable.',
};

export function MultiRoom({ code }: { code: string }) {
  const C = code.toUpperCase();
  const [me, setMe] = useState<MultiMe | null>(null);
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<RoomState | null>(null);
  const [offset, setOffset] = useState(0);
  const [clock, setClock] = useState(() => Date.now());
  const [error, setError] = useState<string | null>(null);
  const [joinName, setJoinName] = useState('');
  const [draft, setDraft] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  useEffect(() => {
    setMe(loadMulti(C));
    setReady(true);
  }, [C]);

  // Interrogation du serveur : une fois par seconde, tant qu'un joueur est identifié.
  useEffect(() => {
    if (!me) return;
    let alive = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const poll = async (): Promise<void> => {
      try {
        const r = await fetch(`/api/multi/rooms/${C}?player=${encodeURIComponent(me.playerId)}`, { cache: 'no-store' });
        const j = (await r.json()) as RoomState & { error?: string };
        if (!alive) return;
        if (!r.ok) {
          setError(j.error ?? 'Salon introuvable');
          return;
        }
        setState(j);
        setOffset(j.now - Date.now());
        setError(null);
      } catch {
        if (alive) setError('Connexion perdue, nouvel essai…');
      }
      if (alive) timer = setTimeout(poll, 1000);
    };
    void poll();
    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
  }, [C, me]);

  // Horloge locale pour les compte à rebours (rafraîchie 4 fois par seconde).
  useEffect(() => {
    const id = setInterval(() => setClock(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  // Un nouveau round remet à zéro le retour de saisie et le brouillon.
  const roundKey = state && (state.phase.kind === 'preview' || state.phase.kind === 'answering') ? state.phase.round : -1;
  useEffect(() => {
    setVerdict(null);
    setDraft('');
  }, [roundKey]);

  if (!ready) return null;

  async function joinAsNew(e: FormEvent): Promise<void> {
    e.preventDefault();
    const r = await fetch(`/api/multi/rooms/${C}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: joinName }),
    });
    const j = (await r.json()) as { playerId?: string; error?: string };
    if (!r.ok || !j.playerId) {
      setError(j.error ?? 'Impossible de rejoindre');
      return;
    }
    const rec = { playerId: j.playerId, name: joinName.trim() };
    saveMulti(C, rec);
    setMe(rec);
  }

  async function start(): Promise<void> {
    if (!me) return;
    const r = await fetch(`/api/multi/rooms/${C}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId: me.playerId }),
    });
    const j = (await r.json()) as { error?: string };
    if (!r.ok) setError(j.error ?? 'Impossible de lancer');
  }

  async function submit(e: FormEvent): Promise<void> {
    e.preventDefault();
    if (!me || !state || state.phase.kind !== 'answering' || draft.trim() === '') return;
    const round = state.phase.round;
    const r = await fetch(`/api/multi/rooms/${C}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId: me.playerId, input: draft }),
    });
    const v = (await r.json()) as Omit<Verdict, 'round'>;
    setVerdict({ ...v, round });
    if (v.kind === 'accept') setDraft('');
  }

  const bar = <GameBar icon="👥" title={`Salon ${C}`} subtitle={state ? themeName(state.theme) : 'En ligne'} />;

  if (!me) {
    return (
      <>
        {bar}
        <main className="summary panel-screen" data-testid="multi-join-form">
          <h1>Rejoindre le salon {C}</h1>
          <form onSubmit={joinAsNew}>
            <label className="field">
              <span>Ton pseudo</span>
              <input type="text" value={joinName} maxLength={20} onChange={(e) => setJoinName(e.target.value)} required />
            </label>
            <button type="submit" className="big" disabled={joinName.trim() === ''}>Entrer dans le salon</button>
          </form>
          {error && <p className="feedback rejected" role="alert">{error}</p>}
        </main>
      </>
    );
  }

  if (!state) {
    return (
      <>
        {bar}
        <main className="summary panel-screen">
          <p>{error ?? 'Connexion au salon…'}</p>
        </main>
      </>
    );
  }

  const serverNow = clock + offset;
  const secs = (ms: number): number => Math.max(0, Math.ceil(ms / 1000));
  const phase = state.phase;

  return (
    <>
      {bar}
      <Embers heat={phase.kind === 'answering' ? 0.6 : 0.25} />
      <main className="summary" data-testid="multi-room">
        {error && <p className="feedback rejected" role="alert">{error}</p>}

        {phase.kind === 'lobby' && (
          <section data-testid="multi-lobby">
            <h1>Salon {C}</h1>
            <p className="lead">
              {themeName(state.theme)} · {state.rounds} questions · {state.roundSec} s chacune
            </p>
            <p className="muted">Partage ce code : <strong>{C}</strong></p>
            <h2>Joueurs ({state.players.length}/10)</h2>
            <ul className="found-list" data-testid="multi-players">
              {state.players.map((p) => (
                <li key={p.id} className="sheet-chip">{p.name}{p.id === me.playerId ? ' (toi)' : ''}</li>
              ))}
            </ul>
            {state.isHost ? (
              <button type="button" className="big" onClick={start} data-testid="multi-start">Lancer la partie</button>
            ) : (
              <p className="muted">En attente que l’hôte lance la partie…</p>
            )}
          </section>
        )}

        {phase.kind === 'countdown' && (
          <section className="panel-screen" data-testid="multi-countdown">
            <h1>Ça commence dans {secs(phase.startsAt - serverNow)}</h1>
          </section>
        )}

        {phase.kind === 'preview' && state.current && (
          <section data-testid="multi-preview">
            <p className="prompt-label">Question {state.current.round + 1} / {state.rounds}</p>
            <h2 className="prompt-text">{state.current.text}</h2>
            <p className="muted">Prépare-toi : {secs(phase.endsAt - serverNow)} s</p>
          </section>
        )}

        {phase.kind === 'answering' && state.current && (
          <section data-testid="multi-answering">
            <p className="prompt-label">Question {state.current.round + 1} / {state.rounds} · {secs(phase.endsAt - serverNow)} s</p>
            <h2 className="prompt-text">{state.current.text}</h2>
            {state.mine[state.current.round] ? (
              <p className="feedback accepted" data-testid="multi-found">
                ✔ Trouvé : « {state.mine[state.current.round]!.answer} » +{state.mine[state.current.round]!.score} °C
              </p>
            ) : (
              <form onSubmit={submit} className="answer-row">
                <input
                  type="text"
                  value={draft}
                  maxLength={256}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Ta réponse…"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  data-testid="multi-input"
                  autoFocus
                />
                <button type="submit" className="answer-submit" disabled={draft.trim() === ''} data-testid="multi-submit">
                  Valider
                </button>
              </form>
            )}
            {verdict && verdict.round === state.current.round && VERDICT_TEXT[verdict.kind] && (
              <p className="feedback rejected" role="status">{VERDICT_TEXT[verdict.kind]}</p>
            )}
          </section>
        )}

        {phase.kind === 'done' && (
          <section data-testid="multi-done">
            <h1>Classement</h1>
            <table className="ranking" data-testid="multi-ranking">
              <tbody>
                {state.ranking.map((row, i) => (
                  <tr key={row.playerId} className={row.playerId === me.playerId ? 'me' : undefined}>
                    <td>{i + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.score} °C</td>
                    <td>{row.answers} trouvée{row.answers > 1 ? 's' : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {state.reveal?.map((q) => (
              <article className="round-row" key={q.round}>
                <strong>{q.text}</strong>
                {state.mine[q.round] && <p className="muted">Ta réponse : {state.mine[q.round]!.answer}</p>}
                <details>
                  <summary className="muted">Toutes les réponses possibles</summary>
                  <div className="sheet-reveal">
                    {q.entries.map((e) => (
                      <span key={e.answer} className="sheet-chip" title={TIER_LABELS[e.tier as keyof typeof TIER_LABELS]}>
                        {TIER_ICONS[e.tier as keyof typeof TIER_ICONS]} {e.answer}
                      </span>
                    ))}
                  </div>
                </details>
              </article>
            ))}
            <a href="/multi"><button type="button" className="big secondary">Retour au multijoueur</button></a>
          </section>
        )}
      </main>
    </>
  );
}

const THEME_NAMES: Record<string, string> = {
  general: 'Général',
  geography: 'Géographie',
  entertainment: 'Divertissement',
  history: 'Histoire',
  'arts-literature': 'Arts & Littérature',
  'science-nature': 'Sciences & Nature',
  'sports-leisure': 'Sports & Loisirs',
};
function themeName(id: string): string {
  return THEME_NAMES[id] ?? id;
}
