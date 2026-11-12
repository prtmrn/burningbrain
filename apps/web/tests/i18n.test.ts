// i18n — chaque texte existe en français, anglais et espagnol ; repli sur le français.
import { describe, expect, it } from 'vitest';
import { MESSAGES } from '../src/i18n/messages';
import { translate } from '../src/i18n';

describe('messages', () => {
  it('chaque clé a un texte non vide dans les trois langues', () => {
    for (const [key, entry] of Object.entries(MESSAGES)) {
      for (const lang of ['fr', 'en', 'es'] as const) {
        expect(entry[lang], `${key} (${lang})`).toBeTruthy();
      }
    }
  });
  it('remplace les variables', () => {
    expect(translate('home.daily', 'en', { day: 4 })).toBe('▶ Daily game · Day 4');
    expect(translate('reset.next', 'es', { h: 6, m: 39 })).toBe('Próximo reinicio en 6 h 39 min.');
  });
  it('clé inconnue : la clé elle-même', () => {
    expect(translate('inconnue', 'en')).toBe('inconnue');
  });
});
