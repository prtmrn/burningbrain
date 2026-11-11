// T-12, T-13, T-25 — persistance (dé)couplée mono/wall (Ontologie §D.2, mecaniques §B.1)
import { describe, expect, it } from 'vitest';
import {
  createBrainSession,
  createHotSession,
  gameReducer,
} from '../src/domain/reducer';
import { fromPersisted, toPersisted } from '../src/state-core/dive-codec';
import type {
  BrainDiveState,
  HotDiveState,
} from '../src/domain/types';
import {
  artBank,
  dailyMeta,
  hotBank,
  hotPromptIds,
  makeContext,
  makeDrive,
} from './fixtures';

const W0 = 1_800_000_000_000; // wall-clock plausible (ms epoch)

describe('dive-codec', () => {
  it('T-12 — rechargement en pleine saisie hot : deadline reportée en wall, draft conservé', () => {
    const drive = makeDrive();
    const ctx = makeContext(hotBank, hotPromptIds, drive);
    let s = createHotSession(dailyMeta);
    s = gameReducer(s, { type: 'START_SESSION', now: 0 }, ctx) as HotDiveState;
    s = gameReducer(s, { type: 'TICK', now: 3_000 }, ctx) as HotDiveState;
    expect(s.answerEndsAt).toBe(28_000);
    s = gameReducer(s, { type: 'EDIT_DRAFT', input: 'mozar' }, ctx) as HotDiveState;

    // Persistance à mono 12 000 / wall W0
    const p = toPersisted(s, 12_000, W0);
    expect(p.answerEndsWall).toBe(W0 + 16_000);

    // Rechargement : mono repart à 0, wall vaut toujours W0
    const back = fromPersisted(p, 0, W0);
    expect(back).not.toBeNull();
    const hot = back as HotDiveState;
    expect(hot.phase).toBe('answering');
    expect(hot.answerEndsAt).toBe(16_000); // il reste 16 s
    expect(hot.draft).toBe('mozar');

    // La session se termine normalement
    const after = gameReducer(
      hot,
      { type: 'SUBMIT', now: 15_000, input: 'alias1' },
      ctx,
    ) as HotDiveState;
    expect(after.phase).toBe('feedback');
    expect(after.results[0]?.tier).toBe('t3');
  });

  it('T-13 — deadline dépassée pendant l\'absence : TICK force le miss, pas de temps regagné', () => {
    const drive = makeDrive();
    const ctx = makeContext(hotBank, hotPromptIds, drive);
    let s = createHotSession(dailyMeta);
    s = gameReducer(s, { type: 'START_SESSION', now: 0 }, ctx) as HotDiveState;
    s = gameReducer(s, { type: 'TICK', now: 3_000 }, ctx) as HotDiveState;
    s = gameReducer(s, { type: 'EDIT_DRAFT', input: 'mozar' }, ctx) as HotDiveState;
    const p = toPersisted(s, 12_000, W0);

    // Rechargement 40 s plus tard (wall) : deadline wall dépassée
    const back = fromPersisted(p, 0, W0 + 40_000) as HotDiveState;
    expect(back.answerEndsAt).toBe(16_000 - 40_000); // négatif : déjà passée
    const missed = gameReducer(back, { type: 'TICK', now: 0 }, ctx) as HotDiveState;
    expect(missed.phase).toBe('feedback');
    expect(missed.results[0]?.tier).toBeNull();
    expect(missed.results[0]?.score).toBe(0);
    expect(missed.results[0]?.rawAnswer).toBe('mozar'); // trace du brouillon
  });

  it('T-25 — reprise en pleine liste brain : récolte et deadline restituées', () => {
    const artIds = ['art-composers', 'art-0002', 'art-0003', 'art-0004', 'art-0005'];
    const drive = makeDrive();
    const ctx = makeContext(artBank, artIds, drive);
    let s = createBrainSession(dailyMeta);
    s = gameReducer(s, { type: 'START_SESSION', now: 0 }, ctx) as BrainDiveState;
    s = gameReducer(s, { type: 'TICK', now: 3_000 }, ctx) as BrainDiveState;
    expect(s.answerEndsAt).toBe(63_000);
    s = gameReducer(s, { type: 'SUBMIT', now: 4_000, input: 'Mozart' }, ctx) as BrainDiveState;
    s = gameReducer(s, { type: 'SUBMIT', now: 5_000, input: 'Bach' }, ctx) as BrainDiveState;
    s = gameReducer(s, { type: 'SUBMIT', now: 6_000, input: 'Vivaldi' }, ctx) as BrainDiveState;
    s = gameReducer(s, { type: 'SUBMIT', now: 7_000, input: 'Beethoven' }, ctx) as BrainDiveState;
    expect(s.currentAnswers).toHaveLength(4);
    // persistCurrentAnswers appelé à chaque acceptation (reprise en pleine liste)
    expect(drive.currentAnswersSnapshots).toHaveLength(4);

    const p = toPersisted(s, 33_000, W0);
    expect(p.answerEndsWall).toBe(W0 + 30_000);

    const back = fromPersisted(p, 0, W0) as BrainDiveState;
    expect(back.phase).toBe('listing');
    expect(back.answerEndsAt).toBe(30_000);
    expect(back.currentAnswers.map((a) => a.answer)).toEqual([
      'Mozart',
      'Bach',
      'Vivaldi',
      'Beethoven',
    ]);

    const after = gameReducer(
      back,
      { type: 'SUBMIT', now: 25_000, input: 'scarlatti' },
      ctx,
    ) as BrainDiveState;
    expect(after.currentAnswers).toHaveLength(5);
    expect(after.currentAnswers[4]?.answer).toBe('Scarlatti');
    expect(after.lastFeedback?.kind).toBe('accepted');
  });
});
