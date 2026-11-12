// Multijoueur — questions françaises réservées aux salons 100 % français.
import { describe, expect, it } from 'vitest';
import { allowedPromptIds, FR_ONLY_IDS } from '../src/server/multi/pool';

describe('allowedPromptIds', () => {
  const some = [...FR_ONLY_IDS][0] as string;
  const other = 'gen-add-01';
  it('salon entièrement français : toutes les questions', () => {
    expect(allowedPromptIds([some, other], ['fr', 'fr'])).toEqual([some, other]);
  });
  it('salon mixte : les questions très françaises sont exclues', () => {
    expect(allowedPromptIds([some, other], ['fr', 'es'])).toEqual([other]);
  });
  it('la liste contient des questions', () => {
    expect(FR_ONLY_IDS.size).toBeGreaterThan(100);
  });
});
