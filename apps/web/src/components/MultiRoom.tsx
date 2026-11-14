'use client';

// ─────────────────────────────────────────────────────────────
// MultiRoom.tsx — un salon en ligne : lobby, compte à rebours, manches
// synchrones, saisie jugée par le serveur, classement final. L'heure est
// celle du serveur (décalage mesuré à chaque réponse d'état). Chaque joueur
// voit les questions et son interface dans sa propre langue.
// ─────────────────────────────────────────────────────────────
import { useEffect, useState, type FormEvent } from 'react';
import { GameBar } from './GameBar';
import { Embers } from './Embers';
import { loadMulti, saveMulti, type MultiMe } from '../state/multi-store';
import { TIER_ICONS } from '../content';
import { useT, useLang, type Lang } from '../i18n';
import { errorText } from '../i18n/errors';

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
  mode?: 'hot' | 'brain';
  brainGoal?: number;
  showScores?: boolean;
  winnerId?: string | null;
  myAnswers?: { round: number; answer: string; tier: string; score: number }[];
  goalFirstId?: string | null;
  bonusUsedBy?: string | null;
  bonusUntil?: number | null;
  pass?: { count: number; mine: boolean } | null;
  flags?: { id: string; round: number; playerId: string; name: string; input: string; status: 'open' | 'accepted' | 'refused'; yes: number; no: number; myVote: boolean | null; mine: boolean }[];
}

interface Verdict {
  kind: string;
  answer?: string;
  score?: number;
  round: number;
}

const VERDICT_KEY: Record<string, string> = {
  already: 'multi.v.already',
  duplicate: 'multi.v.duplicate',
  rejected: 'multi.v.rejected',
  late: 'multi.v.late',
  waiting: 'multi.v.waiting',
  ended: 'multi.v.ended',
  unknown: 'multi.v.unknown',
};

const THEME_NAMES: Record<string, Record<Lang, string>> = {
  general: { fr: 'Général', en: 'General', es: 'General' },
  geography: { fr: 'Géographie', en: 'Geography', es: 'Geografía' },
  entertainment: { fr: 'Divertissement', en: 'Entertainment', es: 'Entretenimiento' },
  history: { fr: 'Histoire', en: 'History', es: 'Historia' },
  'arts-literature': { fr: 'Arts & Littérature', en: 'Arts & Literature', es: 'Artes y Literatura' },
  'science-nature': { fr: 'Sciences & Nature', en: 'Science & Nature', es: 'Ciencia y Naturaleza' },
  'sports-leisure': { fr: 'Sports & Loisirs', en: 'Sports & Leisure', es: 'Deportes y Ocio' },
};

export function MultiRoom({ code }: { code: string }) {
  const C = code.toUpperCase();
  const [t] = useT();
  const [lang] = useLang();
  const [me, setMe] = useState<MultiMe | null>(null);
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<RoomState | null>(null);
  const [offset, setOffset] = useState(0);
  const [clock, setClock] = useState(() => Date.now());
  const [error, setError] = useState<string | null>(null);
  const [joinName, setJoinName] = useState('');
  const [draft, setDraft] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [lastRejected, setLastRejected] = useState<string | null>(null);

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
          setError(errorText(j.error, lang) ?? t('multi.not.found'));
          return;
        }
        setState(j);
        setOffset(j.now - Date.now());
        setError(null);
      } catch {
        if (alive) setError(t('multi.connection.lost'));
      }
      if (alive) timer = setTimeout(poll, 1000);
    };
    void poll();
    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      body: JSON.stringify({ name: joinName, lang }),
    });
    const j = (await r.json()) as { playerId?: string; error?: string };
    if (!r.ok || !j.playerId) {
      setError(errorText(j.error, lang) ?? t('multi.error.join'));
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
    if (!r.ok) setError(errorText(j.error, lang) ?? t('multi.error.join'));
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
    setLastRejected(v.kind === 'rejected' ? draft : null);
    if (v.kind === 'accept') setDraft('');
  }

  async function postJson(url: string, body: unknown): Promise<boolean> {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const j = (await r.json()) as { error?: string };
    if (!r.ok) setError(errorText(j.error, lang) ?? j.error ?? t('multi.error.join'));
    return r.ok;
  }

  async function flagRejected(): Promise<void> {
    if (!me || !lastRejected) return;
    if (await postJson(`/api/multi/rooms/${C}/flag`, { playerId: me.playerId, input: lastRejected })) setLastRejected(null);
  }

  async function voteFlag(id: string, accept: boolean): Promise<void> {
    if (!me) return;
    await postJson(`/api/multi/rooms/${C}/flags/${encodeURIComponent(id)}/vote`, { playerId: me.playerId, accept });
  }

  async function passQuestion(): Promise<void> {
    if (!me) return;
    await postJson(`/api/multi/rooms/${C}/pass`, { playerId: me.playerId });
  }

  async function replay(): Promise<void> {
    if (!me) return;
    await postJson(`/api/multi/rooms/${C}/replay`, { playerId: me.playerId });
  }

  async function activateBonus(): Promise<void> {
    if (!me) return;
    await postJson(`/api/multi/rooms/${C}/bonus`, { playerId: me.playerId });
  }

  const themeName = (id: string): string => THEME_NAMES[id]?.[lang] ?? id;
  const bar = <GameBar icon="👥" title={t('multi.room', { code: C })} subtitle={state ? themeName(state.theme) : t('multi.online')} />;

  if (!me) {
    return (
      <>
        {bar}
        <main className="summary panel-screen" data-testid="multi-join-form">
          <h1>{t('multi.join.room', { code: C })}</h1>
          <form onSubmit={joinAsNew}>
            <label className="field">
              <span>{t('multi.name')}</span>
              <input type="text" value={joinName} maxLength={20} onChange={(e) => setJoinName(e.target.value)} required />
            </label>
            <button type="submit" className="big" disabled={joinName.trim() === ''}>{t('multi.enter')}</button>
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
          <p>{error ?? t('multi.connecting')}</p>
        </main>
      </>
    );
  }

  const serverNow = clock + offset;
  const secs = (ms: number): number => Math.max(0, Math.ceil(ms / 1000));
  const phase = state.phase;
  const mineFound = state.current ? state.mine[state.current.round] : undefined;
  const myTotal = (state.myAnswers ?? []).reduce((acc, a) => acc + a.score, 0);

  return (
    <>
      {bar}
      <Embers heat={phase.kind === 'answering' ? 0.6 : 0.25} />
      <main className="summary" data-testid="multi-room">
        {error && <p className="feedback rejected" role="alert">{error}</p>}

        {phase.kind === 'lobby' && (
          <section data-testid="multi-lobby">
            <h1>{t('multi.room', { code: C })}</h1>
            <p className="lead">
              {themeName(state.theme)} · {state.rounds} · {t('setup.seconds', { s: state.roundSec })}
            </p>
            <p className="muted">{t('multi.share.code')} <strong>{C}</strong></p>
            <h2>{t('multi.players', { n: state.players.length })}</h2>
            <ul className="found-list" data-testid="multi-players">
              {state.players.map((p) => (
                <li key={p.id} className="sheet-chip">{p.name}{p.id === me.playerId ? t('multi.you') : ''}</li>
              ))}
            </ul>
            {state.isHost ? (
              <button type="button" className="big" onClick={start} data-testid="multi-start">{t('multi.start')}</button>
            ) : (
              <p className="muted">{t('multi.waiting')}</p>
            )}
          </section>
        )}

        {phase.kind === 'countdown' && (
          <section className="panel-screen" data-testid="multi-countdown">
            <h1>{t('multi.countdown', { s: secs(phase.startsAt - serverNow) })}</h1>
          </section>
        )}

        {phase.kind === 'preview' && state.current && (
          <section data-testid="multi-preview">
            <p className="prompt-label">{t('multi.question', { n: state.current.round + 1, total: state.rounds })}</p>
            <h2 className="prompt-text">{state.current.text}</h2>
            <p className="muted">{t('multi.prepare', { s: secs(phase.endsAt - serverNow) })}</p>
          </section>
        )}

        {phase.kind === 'answering' && state.current && state.mode === 'brain' && (
          <section data-testid="multi-answering">
            <p className="prompt-label">{t('multi.question', { n: state.current.round + 1, total: state.rounds })} · {secs(phase.endsAt - serverNow)} s</p>
            <h2 className="prompt-text">{state.current.text}</h2>
            <p className="lead" data-testid="multi-brain-total">
              {t('multi.brain.total', { total: myTotal, goal: state.brainGoal ?? 500 })}
            </p>
            <form onSubmit={submit} className="answer-row">
              <input
                type="text"
                value={draft}
                maxLength={256}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t('brain.placeholder')}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                data-testid="multi-input"
                autoFocus
              />
              <button type="submit" className="answer-submit" disabled={draft.trim() === ''} data-testid="multi-submit">
                {t('multi.submit')}
              </button>
            </form>
            {state.pass?.mine ? (
              <p className="feedback" data-testid="multi-passed">{t('multi.pass.waiting', { n: state.pass.count, total: state.players.length })}</p>
            ) : (
              <button type="button" className="secondary" onClick={passQuestion} data-testid="multi-pass">{t('multi.pass')}</button>
            )}
            {verdict && verdict.round === state.current.round && VERDICT_KEY[verdict.kind] && (
              <p className="feedback rejected" role="status">{t(VERDICT_KEY[verdict.kind]!)}</p>
            )}
            <div className="found-list" aria-label={t('multi.brain.yours')}>
              {[...(state.myAnswers ?? [])].filter((a) => a.round === state.current!.round).reverse().map((a) => (
                <span key={a.answer} className="sheet-chip yours" title={t(`tier.${a.tier}`)}>
                  {TIER_ICONS[a.tier as keyof typeof TIER_ICONS]} {a.answer} <em>+{a.score}</em>
                </span>
              ))}
            </div>
            {state.showScores && (
              <table className="ranking" data-testid="multi-live-ranking">
                <tbody>
                  {state.ranking.map((row, i) => (
                    <tr key={row.playerId} className={row.playerId === me.playerId ? 'me' : undefined}>
                      <td>{i + 1}</td>
                      <td>{row.name}</td>
                      <td>{row.score} {t('brain.summary.stats.unit')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {phase.kind === 'answering' && state.current && state.mode !== 'brain' && (
          <section data-testid="multi-answering">
            <p className="prompt-label">{t('multi.question', { n: state.current.round + 1, total: state.rounds })} · {secs(phase.endsAt - serverNow)} s</p>
            <h2 className="prompt-text">{state.current.text}</h2>
            {mineFound ? (
              <p className="feedback accepted" data-testid="multi-found">
                {t('multi.found', { answer: mineFound.answer, score: mineFound.score })}
              </p>
            ) : (
              <form onSubmit={submit} className="answer-row">
                <input
                  type="text"
                  value={draft}
                  maxLength={256}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={t('multi.placeholder')}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  data-testid="multi-input"
                  autoFocus
                />
                <button type="submit" className="answer-submit" disabled={draft.trim() === ''} data-testid="multi-submit">
                  {t('multi.submit')}
                </button>
              </form>
            )}
            {!mineFound && (
              state.pass?.mine ? (
                <p className="feedback" data-testid="multi-passed">{t('multi.pass.waiting', { n: state.pass.count, total: state.players.length })}</p>
              ) : (
                <button type="button" className="secondary" onClick={passQuestion} data-testid="multi-pass">{t('multi.pass')}</button>
              )
            )}
            {verdict && verdict.round === state.current.round && VERDICT_KEY[verdict.kind] && (
              <p className="feedback rejected" role="status">{t(VERDICT_KEY[verdict.kind]!)}</p>
            )}
          </section>
        )}

        {(() => {
          const firstName = state.goalFirstId ? state.players.find((p) => p.id === state.goalFirstId)?.name ?? '' : '';
          const bonusLeft = state.bonusUntil ? Math.max(0, Math.ceil((state.bonusUntil - serverNow) / 1000)) : 0;
          const bonusOpen = state.goalFirstId === me.playerId && !state.bonusUsedBy && phase.kind !== 'done' && phase.kind !== 'lobby';
          return (
            <div className="multi-extras">
              {firstName && <p className="muted" data-testid="multi-first">{t('multi.first', { name: firstName })}</p>}
              {bonusOpen && (
                <button type="button" className="big secondary" onClick={activateBonus} data-testid="multi-bonus">{t('multi.bonus')}</button>
              )}
              {state.bonusUsedBy && bonusLeft > 0 && <p className="lead" data-testid="multi-bonus-active">{t('multi.bonus.active', { s: bonusLeft })}</p>}
              {lastRejected && phase.kind === 'answering' && (
                <button type="button" className="secondary" onClick={flagRejected} data-testid="multi-flag">{t('multi.flag')}</button>
              )}
              {state.flags && state.flags.length > 0 && (
                <section data-testid="multi-flags" className="flags">
                  {state.flags.map((f) => (
                    <div key={f.id} className="flag-row">
                      <span>{t('multi.flag.review', { input: f.input, name: f.name })}</span>{' '}
                      {f.status === 'open' && !f.mine && f.myVote === null && (
                        <>
                          <button type="button" onClick={() => voteFlag(f.id, true)}>{t('multi.flag.accept')}</button>{' '}
                          <button type="button" className="secondary" onClick={() => voteFlag(f.id, false)}>{t('multi.flag.refuse')}</button>
                        </>
                      )}
                      {f.status === 'open' && (f.mine || f.myVote !== null) && <em>{t('multi.flag.open')} · ✔ {f.yes} ✖ {f.no}</em>}
                      {f.status === 'accepted' && <strong>{t('multi.flag.accepted')}</strong>}
                      {f.status === 'refused' && <em>{t('multi.flag.refused')}</em>}
                    </div>
                  ))}
                </section>
              )}
            </div>
          );
        })()}

        {phase.kind === 'done' && (
          <section data-testid="multi-done">
            {state.winnerId && (
              <p className="lead" data-testid="multi-winner">
                {t('multi.winner', { name: state.ranking.find((r) => r.playerId === state.winnerId)?.name ?? '' })}
              </p>
            )}
            <h1>{t('multi.ranking')}</h1>
            <table className="ranking" data-testid="multi-ranking">
              <tbody>
                {state.ranking.map((row, i) => (
                  <tr key={row.playerId} className={row.playerId === me.playerId ? 'me' : undefined}>
                    <td>{i + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.score} °C</td>
                    <td>{t('multi.found.count', { n: row.answers, s: row.answers > 1 ? 's' : '' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {state.reveal?.map((q) => (
              <article className="round-row" key={q.round}>
                <strong>{q.text}</strong>
                {state.mine[q.round] && <p className="muted">{t('multi.your.answer', { answer: state.mine[q.round]!.answer })}</p>}
                <details>
                  <summary className="muted">{t('multi.all.answers')}</summary>
                  <div className="sheet-reveal">
                    {q.entries.map((e) => (
                      <span key={e.answer} className="sheet-chip" title={t(`tier.${e.tier}`)}>
                        {TIER_ICONS[e.tier as keyof typeof TIER_ICONS]} {e.answer}
                      </span>
                    ))}
                  </div>
                </details>
              </article>
            ))}
            {state.isHost && (
              <button type="button" className="big" onClick={replay} data-testid="multi-replay">{t('multi.replay')}</button>
            )}
            <a href="/multi"><button type="button" className="big secondary">{t('multi.back')}</button></a>
          </section>
        )}
      </main>
    </>
  );
}
