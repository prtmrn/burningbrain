// T-30 — validateur de banques : contrôles inter-banques (D-10) et qualité
import { describe, expect, it } from 'vitest';
import { validateBanks } from '../src/data/schemas';
import { genRaw, geoRaw, makeRawBank } from './fixtures';

describe('schemas — validateBanks', () => {
  it('T-30 — promptId dupliqué entre banques = erreur bloquante citant l\'id', () => {
    const histRaw = makeRawBank('history', {
      'gen-0001': [['Alpha', 't1']], // collision avec genRaw
      'hist-0002': [['Beta', 't3']],
    });
    const res = validateBanks([genRaw, histRaw]);
    expect(res.ok).toBe(false);
    expect(res.errors.some((e) => e.includes('gen-0001'))).toBe(true);
    // contrôle positif : banques disjointes → ok (warnings non bloquants tolérés)
    const ok = validateBanks([genRaw, geoRaw]);
    expect(ok.errors).toEqual([]);
    expect(ok.ok).toBe(true);
  });
});
