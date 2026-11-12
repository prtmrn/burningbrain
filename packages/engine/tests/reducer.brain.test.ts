// T-21 → T-24, T-26, T-31, T-33 — machine à états BRAIN (mecaniques §B.5)
import { describe, expect, it } from 'vitest';
import {
  createBrainSession,
  gameReducer,
  type GameEvent,
} from '../src/domain/reducer';
import { sheetCeiling } from '../src/domain/scoring';
import type { BrainCompletion, BrainDiveState } from '../src/domain/types';
import {
  artBank,
  dailyMeta,
  geoBank,
  makeContext,
  makeDrive,
} from './fixtures';

const artIds = ['art-composers', 'art-0002', 'art-0003', 'art-0004', 'art-0005'];
const geoIds = geoBank.prompts.map((p) => p.id);

function setupBrain(bank: 'art' | 'geo' | 'rivers') {
  const drive = makeDrive();
  const ids =
    bank === 'art'
      ? artIds
      : bank === 'geo'
        ? geoIds
        : ['geo-rivers12', 'geo-capitals', 'geo-birds', 'geo-0004', 'geo-0005'];
  const loaded = bank === 'art' ? artBank : geoBank;
  const ctx = makeContext(loaded, ids, drive);
  const R = (s: BrainDiveState, ev: GameEvent): BrainDiveState =>
    gameReducer(s, ev, ctx) as BrainDiveState;
  return { drive, ctx, R };
}

function startListing(R: (s: BrainDiveState, ev: GameEvent) => BrainDiveState) {
  let s = createBrainSession(dailyMeta);
  s = R(s, { type: 'START_SESSION', now: 0 });
  s = R(s, { type: 'TICK', now: 3_000 });
  return s;
}

describe('reducer brain', () => {
  it('T-21 — dédup canonique : même entrée via casse différente = doublon ignoré', () => {
    const { R } = setupBrain('geo');
    let s = startListing(R);
    s = R(s, { type: 'SUBMIT', now: 4_000, input: 'Paris' });
    expect(s.currentAnswers).toHaveLength(1);
    expect(s.lastFeedback?.kind).toBe('accepted');
    s = R(s, { type: 'EDIT_DRAFT', input: 'paris' });
    s = R(s, { type: 'SUBMIT', now: 5_000, input: 'paris' });
    expect(s.lastFeedback?.kind).toBe('duplicate');
    expect(s.duplicatesIgnored).toBe(1);
    expect(s.currentAnswers).toHaveLength(1); // rien de marqué
    expect(s.draft).toBe('paris'); // conservé pour correction rapide
  });

  it('T-22 — fuzzy vers une entrée déjà récoltée → duplicate direct (pas de suggestion)', () => {
    const { R } = setupBrain('geo');
    let s = startListing(R);
    s = R(s, { type: 'SUBMIT', now: 4_000, input: 'Strasbourg' });
    expect(s.currentAnswers).toHaveLength(1);
    s = R(s, { type: 'SUBMIT', now: 5_000, input: 'strasbourge' });
    expect(s.lastFeedback?.kind).toBe('duplicate');
    expect(s.duplicatesIgnored).toBe(1);
    expect(s.currentAnswers).toHaveLength(1);
  });

  it('T-23 — timeout : récolte du round conservée, passage au round suivant', () => {
    const { R } = setupBrain('art');
    let s = startListing(R);
    s = R(s, { type: 'SUBMIT', now: 4_000, input: 'Mozart' }); // t1 · 10
    s = R(s, { type: 'SUBMIT', now: 5_000, input: 'Bach' }); // t3 · 30
    s = R(s, { type: 'SUBMIT', now: 6_000, input: 'Vivaldi' }); // t4 · 60
    s = R(s, { type: 'EDIT_DRAFT', input: 'mozar' });
    s = R(s, { type: 'TICK', now: 63_000 });
    expect(s.results).toHaveLength(1);
    expect(s.results[0]?.endReason).toBe('timeout');
    expect(s.results[0]?.score).toBe(100); // 10 + 30 + 60, récolte conservée
    expect(s.results[0]?.answersGiven).toHaveLength(3);
    expect(s.phase).toBe('preview'); // round 2
    expect(s.roundIndex).toBe(1);
    expect(s.previewEndsAt).toBe(66_000);
    expect(s.currentAnswers).toHaveLength(0);
  });

  it('T-24 — sheet-exhausted : clôture dans le même tour, plafond atteint, sans bonus', () => {
    const { R } = setupBrain('rivers');
    let s = startListing(R);
    const answers = [
      'Seine', 'Loire', 'Rhône', 'Garonne', 'Po', 'Rhine',
      'Danube', 'Tagus', 'Volga', 'Dnieper', 'Elbe', 'Oder',
    ];
    answers.forEach((a, k) => {
      s = R(s, { type: 'SUBMIT', now: 4_000 + k * 3_000, input: a });
    });
    // le 12ᵉ accept a clôturé le round DANS LE MÊME TOUR
    expect(s.results).toHaveLength(1);
    expect(s.results[0]?.endReason).toBe('sheet-exhausted');
    expect(s.results[0]?.answersGiven).toHaveLength(12);
    expect(s.results[0]?.score).toBe(645); // exactement le plafond, aucun bonus de temps
    const sheet = geoBank.sheets.get('geo-rivers12');
    if (!sheet) throw new Error('fixture incomplète');
    expect(s.results[0]?.score).toBe(sheetCeiling(sheet));
    expect(s.phase).toBe('preview');
    // soumission ultérieure (hors listing) : ignorée
    const before = s;
    s = R(s, { type: 'SUBMIT', now: 40_000, input: 'Seine' });
    expect(s).toBe(before);
  });

  it('T-26 — abandon de round puis de session : complétion partielle persistée (F-11)', () => {
    const { drive, R } = setupBrain('art');
    let s = startListing(R);
    s = R(s, { type: 'SUBMIT', now: 4_000, input: 'Mozart' }); // 10
    s = R(s, { type: 'SUBMIT', now: 5_000, input: 'Bach' }); // 30
    s = R(s, { type: 'ABANDON_ROUND', now: 6_000 });
    expect(s.results[0]?.endReason).toBe('abandoned');
    expect(s.results[0]?.score).toBe(40); // récolte conservée
    expect(s.phase).toBe('preview');
    s = R(s, { type: 'TICK', now: 9_000 }); // round 2 (art-0002)
    s = R(s, { type: 'SUBMIT', now: 10_000, input: 'Alpha' }); // 10
    s = R(s, { type: 'ABANDON_ROUND', now: 11_000 });
    s = R(s, { type: 'TICK', now: 14_000 }); // round 3 (art-0003)
    s = R(s, { type: 'ABANDON_SESSION', now: 15_000 });
    expect(s.phase).toBe('done');
    expect(drive.completions).toHaveLength(1);
    const c = drive.completions[0] as BrainCompletion;
    expect(c.endedBy).toBe('abandoned');
    expect(c.results).toHaveLength(3);
    expect(c.playKind).toBe('daily');
    expect(c.score).toBe(50); // 40 + 10 + 0
  });

  it('T-31 — deadline stricte brain : à égalité exacte le timeout gagne ; la suivante passe', () => {
    const { R } = setupBrain('art');
    let s = startListing(R);
    expect(s.answerEndsAt).toBe(63_000);
    s = R(s, { type: 'SUBMIT', now: 63_000, input: 'Mozart' });
    expect(s.results).toHaveLength(1);
    expect(s.results[0]?.endReason).toBe('timeout');
    expect(s.results[0]?.answersGiven).toHaveLength(0);
    expect(s.phase).toBe('preview');
    s = R(s, { type: 'TICK', now: 66_000 });
    expect(s.answerEndsAt).toBe(126_000);
    s = R(s, { type: 'SUBMIT', now: 125_999, input: 'Alpha' });
    expect(s.currentAnswers).toHaveLength(1);
    expect(s.lastFeedback?.kind).toBe('accepted');
  });

  it('T-33 — autocorrect D-21 en brain : acceptée d\'office viaCorrection ; re-soumission = doublon', () => {
    const { R } = setupBrain('art');
    let s = startListing(R);
    s = R(s, { type: 'SUBMIT', now: 4_000, input: 'beetoven' });
    expect(s.lastFeedback).toMatchObject({ kind: 'accepted', score: 85 });
    expect(s.currentAnswers).toHaveLength(1);
    expect(s.currentAnswers[0]?.answer).toBe('Beethoven');
    expect(s.currentAnswers[0]?.viaCorrection).toBe(true);
    expect(s.currentAnswers[0]?.tier).toBe('t5');
    expect(s.currentAnswers[0]?.score).toBe(85);
    // re-soumettre la même coquille : doublon (l'entrée est déjà récoltée)
    s = R(s, { type: 'SUBMIT', now: 6_000, input: 'beetoven' });
    expect(s.lastFeedback?.kind).toBe('duplicate');
    expect(s.duplicatesIgnored).toBe(1);
    expect(s.currentAnswers).toHaveLength(1);
  });

  it('D-30 — victoire : le cerveau plein (winScore) termine la partie, gagnée', () => {
    const { ctx, drive } = setupBrain('art');
    const winCtx = {
      ...ctx,
      config: { ...ctx.config, modes: { ...ctx.config.modes, brain: { ...ctx.config.modes.brain, winScore: 90 } } },
    };
    const R = (st: BrainDiveState, ev: GameEvent): BrainDiveState => gameReducer(st, ev, winCtx) as BrainDiveState;
    let s = startListing(R);
    s = R(s, { type: 'SUBMIT', now: 4_000, input: 'Mozart' }); // 10
    expect(s.phase).toBe('listing');
    s = R(s, { type: 'SUBMIT', now: 5_000, input: 'Vivaldi' }); // +60 = 70
    expect(s.phase).toBe('listing');
    s = R(s, { type: 'SUBMIT', now: 6_000, input: 'Bach' }); // +30 = 100 ≥ 90
    expect(s.phase).toBe('done');
    expect(s.results).toHaveLength(1);
    expect(s.results[0]?.endReason).toBe('won');
    expect(drive.completions).toHaveLength(1);
    expect((drive.completions[0] as BrainCompletion).endedBy).toBe('completed');
  });
});
