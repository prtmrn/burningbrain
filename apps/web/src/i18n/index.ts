'use client';

// ─────────────────────────────────────────────────────────────
// i18n/index.ts — langue de l'interface : FR (défaut), EN, ES.
// Choisie par le joueur (sélecteur), retenue dans localStorage, sinon déduite
// de la langue du navigateur. Synchronisée entre les composants de la page.
// ─────────────────────────────────────────────────────────────
import { useCallback, useEffect, useState } from 'react';
import { MESSAGES, type Lang } from './messages';

export type { Lang };
export const LANGS: Lang[] = ['fr', 'en', 'es'];
export const LANG_LABELS: Record<Lang, string> = { fr: 'FR', en: 'EN', es: 'ES' };
const KEY = 'boilingbrain:lang';
const EVENT = 'boilingbrain:lang-change';

export function translate(key: string, lang: Lang, vars?: Record<string, string | number>): string {
  const entry = MESSAGES[key];
  let text = entry ? entry[lang] || entry.fr : key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) text = text.split(`{${k}}`).join(String(v));
  }
  return text;
}

export function readLang(): Lang {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === 'fr' || raw === 'en' || raw === 'es') return raw;
  } catch {
    /* stockage indisponible */
  }
  const nav = (window.navigator.language || 'fr').slice(0, 2).toLowerCase();
  return nav === 'en' ? 'en' : nav === 'es' ? 'es' : 'fr';
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>('fr');
  useEffect(() => {
    setLangState(readLang());
    const onChange = (): void => setLangState(readLang());
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  const setLang = useCallback((l: Lang) => {
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* ignoré */
    }
    setLangState(l);
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [lang, setLang];
}

/** Traducteur lié à la langue courante. */
export function useT(): [(key: string, vars?: Record<string, string | number>) => string, Lang] {
  const [lang] = useLang();
  return [(key, vars) => translate(key, lang, vars), lang];
}
