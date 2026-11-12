// Multijoueur — questions proposées selon les langues des joueurs.
import { describe, expect, it } from 'vitest';
import { allowedPromptIds, FR_ONLY_IDS, I18N_IDS } from '../src/server/multi/pool';

describe('allowedPromptIds', () => {
  const fr = [...FR_ONLY_IDS][0] as string;
  const translated = [...I18N_IDS][0] as string;
  const untranslated = 'gen-add-01'; // question française sans traduction
  it('salon 100 % français : toutes les questions', () => {
    expect(allowedPromptIds([fr, translated, untranslated], ['fr', 'fr'])).toEqual([fr, translated, untranslated]);
  });
  it('salon mixte : seulement les questions traduites, sans les très françaises', () => {
    expect(allowedPromptIds([fr, translated, untranslated], ['fr', 'es'])).toEqual([translated]);
  });
  it('les 100 questions traduites ne sont pas françaises', () => {
    for (const id of I18N_IDS) expect(FR_ONLY_IDS.has(id)).toBe(false);
    expect(I18N_IDS.size).toBe(100);
  });
  it('la liste très française contient des questions', () => {
    expect(FR_ONLY_IDS.size).toBeGreaterThan(100);
  });
});
