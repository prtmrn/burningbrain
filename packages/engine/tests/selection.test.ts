// T-19, T-20, T-29, T-34 + U-48, U-49, U-50, U-59 — sélection des prompts
// et PRNG de référence (mecaniques §A.5)
import { describe, expect, it } from 'vitest';
import { fisherYatesShuffle, fnv1a32, mulberry32 } from '../src/domain/rng';
import { drawThemed, seedDaily, seedSeries } from '../src/domain/selection';
import type { BrainCompletion } from '../src/domain/types';
import { assembleBank } from '../src/data/bank';
import {
  genBank,
  geoBank,
  makeHotCompletion,
  makeRawBank,
  sportsBank,
  testConfig,
} from './fixtures';

function fakeBrainUnlimited(promptIds: string[]): BrainCompletion {
  return {
    mode: 'brain',
    playKind: 'unlimited',
    theme: 'sports-leisure',
    scope: 'u1',
    game: 1,
    score: 0,
    results: promptIds.map((id) => ({
      promptId: id,
      promptText: 'P',
      answersGiven: [],
      score: 0,
      endReason: 'timeout' as const,
    })),
    contentVersion: 1,
    endedBy: 'completed',
    ceiling: 0,
    totals: { answersAccepted: 0, duplicatesIgnored: 0 },
  };
}

describe('selection', () => {
  it('T-19 — illimité : épuisement du paquet → remise TOTALE (cycle neuf)', () => {
    const seen14 = sportsBank.prompts.slice(0, 14).map((p) => p.id);
    const history = [
      makeHotCompletion(seen14, {
        playKind: 'unlimited',
        theme: 'sports-leisure',
        scope: 'u1',
      }),
    ];
    const draw = drawThemed('sports-leisure', 'hot', sportsBank, history, 12_345, testConfig);
    // pool résiduel = 6 < 7 → remise totale : 7 ids uniques redeviennent possibles
    expect(draw).toHaveLength(7);
    expect(new Set(draw).size).toBe(7);
  });

  it('T-20 — daily déterministe : deux appels identiques, 7 prompts uniques', () => {
    const a = seedDaily('general', 'hot', 116, genBank, testConfig);
    const b = seedDaily('general', 'hot', 116, genBank, testConfig);
    expect(a).toEqual(b);
    expect(a).toHaveLength(7);
    expect(new Set(a).size).toBe(7);
    expect(a.every((id) => genBank.prompts.some((p) => p.id === id))).toBe(true);
  });

  it('T-29 — séries hot/brain indépendantes (D-20) : graines distinctes', () => {
    const geoHot = seedDaily('geography', 'hot', 42, geoBank, testConfig);
    expect(seedDaily('geography', 'hot', 42, geoBank, testConfig)).toEqual(geoHot);
    const geoBrain = seedDaily('geography', 'brain', 42, geoBank, testConfig);
    expect(geoBrain).toHaveLength(5);
    expect(geoBrain).not.toEqual(geoHot); // graines FNV distinctes
    expect(seedSeries('geography', 'hot', 42)).not.toBe(seedSeries('geography', 'brain', 42));
    // banques disjointes (D-10) : aucun recouvrement possible avec 'general'
    const genHot = seedDaily('general', 'hot', 42, genBank, testConfig);
    expect(genHot.filter((id) => geoHot.includes(id))).toEqual([]);
  });

  it('T-34 — sans remise redérivée de l\'historique : aucun vu, puis remise totale', () => {
    const ids20 = sportsBank.prompts.map((p) => p.id);
    const seen14 = ids20.slice(0, 14);
    const draw = drawThemed(
      'sports-leisure',
      'brain',
      sportsBank,
      [fakeBrainUnlimited(seen14)],
      777,
      testConfig,
    );
    expect(draw).toHaveLength(5);
    expect(draw.some((id) => seen14.includes(id))).toBe(false); // aucun des 14 vus
    // 19 vus → pool 1 < 5 → remise totale
    const draw2 = drawThemed(
      'sports-leisure',
      'brain',
      sportsBank,
      [fakeBrainUnlimited(ids20.slice(0, 19))],
      777,
      testConfig,
    );
    expect(draw2).toHaveLength(5);
    expect(new Set(draw2).size).toBe(5);
  });

  it('U-59 — banque trop petite : échec explicite au boot (contenu corrompu)', () => {
    const smallRaw = makeRawBank('general', {
      'sm-1': [['Alpha', 't1']],
      'sm-2': [['Beta', 't1']],
      'sm-3': [['Gamma', 't1']],
      'sm-4': [['Delta', 't1']],
      'sm-5': [['Epsilon', 't1']],
    });
    const small = assembleBank(smallRaw, 'general');
    expect(() => seedDaily('general', 'hot', 1, small, testConfig)).toThrow(/5 prompts < 7/);
  });
});

describe('rng — vecteurs de référence (déterminisme inter-plateformes)', () => {
  it('U-48 — mulberry32 : séquence fixée par la spec', () => {
    const r42 = mulberry32(42);
    expect(r42()).toBe(0.6011037519201636);
    expect(r42()).toBe(0.44829055899754167);
    expect(r42()).toBe(0.8524657934904099);
    const r0 = mulberry32(0);
    expect(r0()).toBe(0.26642920868471265);
    expect(r0()).toBe(0.0003297457005828619);
  });

  it('U-49 — FNV-1a 32 bits sur UTF-8 : vecteurs fixes', () => {
    expect(fnv1a32('')).toBe(0x811c9dc5);
    expect(fnv1a32('general:hot:42')).toBe(737_625_082);
    expect(fnv1a32('geography:brain:42')).toBe(3_420_782_993);
    expect(fnv1a32('general:hot:116')).toBe(724_896_176);
  });

  it('U-50 — Fisher–Yates : sans mutation, permutation, déterministe', () => {
    const input = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const out = fisherYatesShuffle(input, mulberry32(7));
    expect(out).not.toBe(input); // copie, pas de mutation
    expect([...input]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect([...out].sort((a, b) => a - b)).toEqual([...input]); // permutation
    expect(out).toHaveLength(input.length);
    expect(fisherYatesShuffle(input, mulberry32(7))).toEqual(out); // déterministe
  });
});
