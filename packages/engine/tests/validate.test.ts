// T-14, T-15, T-16 + U-35 → U-40 — pipeline de validation & normalisation
// (mecaniques §B.6, Ontologie §B.5)
import { describe, expect, it } from 'vitest';
import { normalize } from '../src/domain/normalize';
import { validateAnswer, fuzzyThreshold, buildSheetIndex } from '../src/domain/validate';
import {
  createHotSession,
  gameReducer,
  type GameEvent,
} from '../src/domain/reducer';
import type { HotDiveState } from '../src/domain/types';
import {
  dailyMeta,
  geoBank,
  makeContext,
  makeDrive,
  testPrefs,
} from './fixtures';

const geoIds = geoBank.prompts.map((p) => p.id); // r0 = geo-capitals, r1 = geo-birds

function hotAtRound(round: number, prefs = testPrefs) {
  const drive = makeDrive();
  const ctx = makeContext(geoBank, geoIds, drive, prefs);
  const R = (s: HotDiveState, ev: GameEvent): HotDiveState =>
    gameReducer(s, ev, ctx) as HotDiveState;
  let s = createHotSession(dailyMeta);
  s = R(s, { type: 'START_SESSION', now: 0 });
  for (let i = 0; i <= round; i++) {
    const base = i * 6_000;
    s = R(s, { type: 'TICK', now: base + 3_000 });
    if (i < round) {
      s = R(s, { type: 'SUBMIT', now: base + 4_000, input: 'Paris' });
      s = R(s, { type: 'FEEDBACK_ACK', now: base + 6_000 });
    }
  }
  return { R, s, base: round * 6_000 };
}

describe('validate — fuzzy & exact', () => {
  it('T-14 — autocorrect généreux (D-21) : candidat unique accepté d\'office, tracé viaCorrection', () => {
    const { R, s: s0, base } = hotAtRound(0);
    const s = R(s0, { type: 'SUBMIT', now: base + 5_000, input: 'strasbourge' });
    expect(s.phase).toBe('feedback'); // acceptée sans confirmation
    expect(s.results[0]).toMatchObject({
      rawAnswer: 'strasbourge',
      answer: 'Strasbourg',
      tier: 't4',
      score: 60,
      viaCorrection: true,
    });
  });

  it('T-14b — préférence answerCorrections=false : suggestion à confirmer (ancien I-02)', () => {
    const { R, s: s0, base } = hotAtRound(0, { ...testPrefs, answerCorrections: false });
    let s = R(s0, { type: 'SUBMIT', now: base + 5_000, input: 'strasbourge' });
    expect(s.phase).toBe('answering');
    expect(s.correction).toEqual({ from: 'strasbourge', to: 'Strasbourg' });
    s = R(s, { type: 'APPLY_CORRECTION', now: base + 6_000 });
    expect(s.phase).toBe('feedback');
    expect(s.results[0]).toMatchObject({ answer: 'Strasbourg', score: 60, viaCorrection: true });
  });

  it('T-15 — seuils D-21 : 4 lettres → distance 1 tolérée si unique ; ≤ 3 lettres → aucun fuzzy', () => {
    const sheet = geoBank.sheets.get('geo-capitals');
    const index = geoBank.indexes.get('geo-capitals');
    if (!sheet || !index) throw new Error('fixture incomplète');
    const exact = validateAnswer('rome', sheet, testPrefs, index);
    expect(exact).toMatchObject({ kind: 'accept' });
    if (exact.kind === 'accept') {
      expect(exact.entry.answer).toBe('Rome');
      expect(exact.entry.tier).toBe('t1');
    }
    // 'roem' : distance 1 de 'rome' (transposition), 2 de 'lome' → unique → accepté
    expect(fuzzyThreshold(4)).toBe(1);
    expect(validateAnswer('roem', sheet, testPrefs, index)).toMatchObject({
      kind: 'accept',
      corrected: { from: 'roem', to: 'Rome' },
    });
    // 3 lettres : seuil 0, 'rom' n'est pas corrigé
    expect(fuzzyThreshold(3)).toBe(0);
    expect(validateAnswer('rom', sheet, testPrefs, index).kind).toBe('rejected');
    // 8 lettres et plus : distance 2
    expect(fuzzyThreshold(8)).toBe(2);
  });

  it('T-16 — ex æquo fuzzy (merlin/merlon) → rejet, pas de suggestion arbitraire', () => {
    const sheet = geoBank.sheets.get('geo-birds');
    const index = geoBank.indexes.get('geo-birds');
    if (!sheet || !index) throw new Error('fixture incomplète');
    expect(fuzzyThreshold(6)).toBe(1); // 'merlun' : |n| = 6
    expect(validateAnswer('merlun', sheet, testPrefs, index).kind).toBe('rejected');
    // les deux candidats seuls sont bien à distance 1
    expect(validateAnswer('merlin', sheet, testPrefs, index).kind).toBe('accept');
    expect(validateAnswer('merlon', sheet, testPrefs, index).kind).toBe('accept');
  });
});

describe('normalize — 6 étapes, ordre exact', () => {
  it('U-35 — pliage des diacritiques, formes NFC et combinées', () => {
    expect(normalize('Éléphant')).toBe('elephant');
    expect(normalize('Éléphant')).toBe('elephant'); // forme combinée
  });

  it('U-36 — tirets et apostrophes deviennent des espaces', () => {
    expect(normalize("Saint-Étienne's")).toBe('saint etienne s');
  });

  it('U-37 — ponctuation résiduelle supprimée', () => {
    expect(normalize('Pékin!')).toBe('pekin');
  });

  it('U-38 — trim et compaction des espaces', () => {
    expect(normalize('  New   York ')).toBe('new york');
  });

  it('U-39 — article initial supprimé si un mot suit, conservé sinon', () => {
    expect(normalize('The Beatles')).toBe('beatles');
    expect(normalize('Les Misérables')).toBe('miserables');
    expect(normalize('the')).toBe('the'); // chaîne réduite à l'article
  });

  it('U-40 — idempotence : normalize ∘ normalize = normalize', () => {
    const samples = [
      'Éléphant',
      "Saint-Étienne's",
      'Pékin!',
      '  New   York ',
      'The Beatles',
      'Les Misérables',
      'Ougadougou!! ',
    ];
    for (const x of samples) {
      expect(normalize(normalize(x))).toBe(normalize(x));
    }
    // l'index exact est construit sur la même normalisation
    const sheet = geoBank.sheets.get('geo-capitals');
    if (!sheet) throw new Error('fixture incomplète');
    const idx = buildSheetIndex(sheet);
    for (const key of idx.exact.keys()) {
      expect(normalize(key)).toBe(key);
    }
  });
});
