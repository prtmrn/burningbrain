import { describe, expect, it } from 'vitest';
import { assembleBank } from '@hotbrain/engine';
import { validateAnswer } from '@hotbrain/engine';
import { DEFAULT_PREFERENCES } from '../src/state/prefs-store';
import { parseVerdict } from '../src/var/judge';
import { acceptIntoSheet } from '../src/var/client';

describe('VAR', () => {
  it('lit un verdict valide et borne le palier', () => {
    expect(parseVerdict('{"valid":true,"tier":"t4","answer":"Apex","reason":"ok"}', 'apex')).toEqual({ valid: true, tier: 't4', answer: 'Apex', reason: 'ok' });
    expect(parseVerdict('{"valid":true,"tier":"t6","answer":"x","reason":""}', 'x')?.tier).toBe('t3');
  });
  it('rejette une sortie inutilisable', () => {
    expect(parseVerdict('n importe quoi', 'a')).toBeNull();
    expect(parseVerdict('{"tier":"t1"}', 'a')).toBeNull();
  });
  it('accepte ensuite la réponse validée dans la feuille', () => {
    const bank = assembleBank(
      {
        theme: 'x', contentVersion: 1,
        prompts: [{ id: 'p1', theme: 'x', text: 'Q ?', difficulty: 'easy' }],
        sheets: { p1: { promptId: 'p1', contentVersion: 1, entries: [{ answer: 'Pole', tier: 't1', aliases: [] }] } },
      },
      'x',
    );
    const idx = () => bank.indexes.get('p1')!;
    const sheet = bank.sheets.get('p1')!;
    expect(validateAnswer('apex', sheet, DEFAULT_PREFERENCES, idx()).kind).toBe('rejected');
    acceptIntoSheet(bank, 'p1', { valid: true, tier: 't4', answer: 'Apex', reason: '' }, 'apex');
    expect(validateAnswer('apex', sheet, DEFAULT_PREFERENCES, idx()).kind).toBe('accept');
  });
});
