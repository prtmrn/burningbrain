'use client';

// ─────────────────────────────────────────────────────────────
// /themes — choix du thème (D-07, D-18). Un thème est jouable en illimité
// dès que sa banque est publiée (manifest) ; sinon « bientôt ».
// ─────────────────────────────────────────────────────────────
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { THEMES } from '../../themes';
import { GameBar } from '../../components/GameBar';
import { Embers } from '../../components/Embers';

export default function ThemesPage() {
  const [available, setAvailable] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    let on = true;
    fetch('/content/manifest.json')
      .then((r) => (r.ok ? r.json() : {}))
      .then((m: Record<string, { prompts: number }>) => {
        if (on)
          setAvailable(Object.fromEntries(Object.entries(m).map(([k, v]) => [k, v.prompts])));
      })
      .catch(() => {
        if (on) setAvailable({});
      });
    return () => {
      on = false;
    };
  }, []);

  return (
    <>
      <GameBar title="Choisir un thème" />
      <Embers heat={0.3} />
      <main className="summary" data-testid="themes">
        <h1>Choisis ton thème</h1>
        <p className="muted">Parties classiques, en mode Boiling ou Brain.</p>
        <div className="theme-grid">
          {THEMES.map((t) => {
            const n = available?.[t.id];
            const ready = n !== undefined && n >= 7;
            const hotHref = t.id === 'general' ? '/boiling/play' : `/themes/${t.id}`;
            const brainHref = t.id === 'general' ? '/brain/play' : `/themes/${t.id}/brain`;
            return (
              <div
                key={t.id}
                className={`theme-card${ready ? '' : ' disabled'}`}
                style={{ borderColor: t.accent }}
                data-testid={`theme-${t.id}`}
              >
                <span className="theme-icon-big" aria-hidden="true">{t.icon}</span>
                <strong>{t.label}</strong>
                <span className="muted">{t.blurb}</span>
                <span className="muted">{ready ? `${n} questions` : available === null ? '…' : 'Bientôt'}</span>
                {ready && (
                  <span className="theme-actions">
                    <Link href={hotHref}><button type="button">🔥 Boiling</button></Link>
                    <Link href={brainHref}><button type="button" className="secondary">🧠 Brain</button></Link>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}