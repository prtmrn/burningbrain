'use client';

// ─────────────────────────────────────────────────────────────
// /themes — choix du thème (D-07, D-18). Un thème est jouable en illimité
// dès que sa banque est publiée (manifest) ; sinon « bientôt ».
// ─────────────────────────────────────────────────────────────
import Link from 'next/link';
import { useT } from '../../i18n';
import { useEffect, useState } from 'react';
import { THEMES } from '../../themes';
import { GameBar } from '../../components/GameBar';
import { Embers } from '../../components/Embers';

export default function ThemesPage() {
  const [tr, lang] = useT();
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
      <GameBar title={tr('themes.bar')} />
      <Embers heat={0.3} />
      <main className="summary" data-testid="themes">
        <h1>{tr('themes.title')}</h1>
        <p className="muted">{tr('themes.lead')}</p>
        <div className="theme-grid">
          {THEMES.map((t) => {
            const key = lang === 'fr' ? t.id : (t.id === 'general' ? `general-${lang}` : null);
            const n = key ? available?.[key] : undefined;
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
                <strong>{tr(`theme.${t.id}`)}</strong>
                <span className="muted">{tr(`theme.${t.id}.blurb`)}</span>
                <span className="muted">{ready ? tr('themes.count', { n }) : available === null ? '…' : tr('themes.soon')}</span>
                {ready && (
                  <span className="theme-actions">
                    <Link href={hotHref}><button type="button">{tr('mode.boiling')}</button></Link>
                    <Link href={brainHref}><button type="button" className="secondary">🧠 {tr('mode.brain')}</button></Link>
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