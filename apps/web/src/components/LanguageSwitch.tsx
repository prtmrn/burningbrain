'use client';

// LanguageSwitch.tsx — sélecteur FR / EN / ES, toujours visible dans la barre.
import { LANGS, LANG_LABELS, useLang, useT } from '../i18n';

export function LanguageSwitch() {
  const [lang, setLang] = useLang();
  const [t] = useT();
  return (
    <div className="lang-switch" role="group" aria-label={t('lang.label')} data-testid="lang-switch">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className={`lang-btn${lang === l ? ' on' : ''}`}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
