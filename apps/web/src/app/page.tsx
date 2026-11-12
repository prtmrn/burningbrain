'use client';

// ─────────────────────────────────────────────────────────────
// / — accueil : UN SEUL geste par défaut (spec §A.7, reco game-loop 9)
// « Hot · Général » pré-sélectionné, un tap pour jouer. Le reste (Brain,
// thèmes) arrive en M4/M5.
// ─────────────────────────────────────────────────────────────
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { dateLoc, dayNumber, nextResetMs } from '@hotbrain/engine';
import { hotbrainConfig } from '../config';
import { createLocalStorageKV } from '../state/local-storage-kv';
import { dailyStatus, getStats } from '../state/stats-store';
import { usePrefs } from '../hooks/usePrefs';
import { StreakBadge } from '../components/StreakBadge';
import { BrainStage } from '../components/BrainStage';
import { Embers } from '../components/Embers';
import { resetLabel } from '../components/GamePlay';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const kv = useMemo(
    () => (mounted ? createLocalStorageKV(window.localStorage) : null),
    [mounted],
  );
  if (!kv)
    return (
      <main className="summary">
        <h1>🔥 BurningBrain</h1>
        <p className="muted">Le mercure monte…</p>
      </main>
    );

  return <Home kv={kv} />;
}

function Home({ kv }: { kv: ReturnType<typeof createLocalStorageKV> }) {
  usePrefs(kv);
  const nowWall = Date.now();
  const today = dateLoc(nowWall, hotbrainConfig.timezone);
  const day = dayNumber(nowWall, hotbrainConfig);
  const stats = getStats(kv, today);
  const hotStatus = dailyStatus(kv, 'hot', 'general', today, hotbrainConfig);
  const brainStatus = dailyStatus(kv, 'brain', 'general', today, hotbrainConfig);

  return (
    <>
      <Embers heat={0.55} />
      <main className="home" data-testid="home">
        <BrainStage heat={0.6} showLabel={false} />
        <h1 className="logo">
          BURNING<span>BRAIN</span>
        </h1>
        <p className="tagline">Le quiz qui fait bouillir ton cerveau.</p>

        <section className="mode-cards">
          <article className="mode-card hot">
            <h2>🔥 Burning</h2>
            <p>Une seule réponse par question : plus elle est rare, plus ton cerveau brûle.</p>
            {hotStatus === 'played' ? (
              <button type="button" className="big" disabled data-testid="play-hot-disabled">
                Partie du jour jouée
              </button>
            ) : (
              <Link href="/burning/daily" data-testid="play-hot">
                <button type="button" className="big">▶ Partie du jour · Jour {day}</button>
              </Link>
            )}
            <Link href="/burning/play" data-testid="play-hot-unlimited">
              <button type="button" className="big secondary">Partie Classique</button>
            </Link>
          </article>
          <article className="mode-card brain">
            <h2>🧠 Brain</h2>
            <p>Donne un maximum de réponses et remplis ton cerveau : 500 neurones, c'est gagné.</p>
            {brainStatus === 'played' ? (
              <button type="button" className="big" disabled data-testid="play-brain-disabled">
                Partie du jour jouée
              </button>
            ) : (
              <Link href="/brain/daily" data-testid="play-brain">
                <button type="button" className="big">▶ Partie du jour · Jour {day}</button>
              </Link>
            )}
            <Link href="/brain/play" data-testid="play-brain-unlimited">
              <button type="button" className="big secondary">Partie Classique</button>
            </Link>
          </article>
        </section>

        <Link href="/themes" data-testid="choose-theme">
          <button type="button" className="big secondary theme-btn">🎭 Choisir un thème</button>
        </Link>

        <p style={{ marginTop: '1.2rem' }}>
          <StreakBadge streak={stats.currentStreak} />
        </p>
        <p className="muted" data-testid="reset-line">{resetLabel(nowWall)}</p>
      </main>
    </>
  );
}