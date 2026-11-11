// T-01 → T-08 — machine à états HOT (mecaniques §B.2/B.3/B.4)
import { describe, expect, it } from 'vitest';
import {
  createHotSession,
  gameReducer,
  type GameEvent,
} from '../src/domain/reducer';
import type { HotCompletion, HotDiveState } from '../src/domain/types';
import {
  dailyMeta,
  hotBank,
  hotPromptIds,
  makeContext,
  makeDrive,
} from './fixtures';

function setup() {
  const drive = makeDrive();
  const ctx = makeContext(hotBank, hotPromptIds, drive);
  const R = (s: HotDiveState, ev: GameEvent): HotDiveState =>
    gameReducer(s, ev, ctx) as HotDiveState;
  let s = createHotSession(dailyMeta);
  s = R(s, { type: 'START_SESSION', now: 0 });
  return { drive, ctx, R, s };
}

describe('reducer hot', () => {
  it('T-01 — parcours nominal : 7 rounds, score 210, complétion persistée', () => {
    const { drive, R } = setup();
    let s = R(createHotSession(dailyMeta), { type: 'START_SESSION', now: 0 });
    expect(s.phase).toBe('preview');
    expect(s.previewEndsAt).toBe(3_000);
    for (let i = 0; i < 7; i++) {
      const base = i * 6_000;
      s = R(s, { type: 'TICK', now: base + 3_000 });
      expect(s.phase).toBe('answering');
      expect(s.answerEndsAt).toBe(base + 28_000);
      s = R(s, { type: 'SUBMIT', now: base + 5_000, input: `alias${i + 1}` });
      expect(s.phase).toBe('feedback');
      expect(s.results).toHaveLength(i + 1);
      s = R(s, { type: 'FEEDBACK_ACK', now: base + 6_000 });
    }
    expect(s.phase).toBe('done');
    expect(drive.completions).toHaveLength(1);
    const c = drive.completions[0] as HotCompletion;
    expect(c.mode).toBe('hot');
    expect(c.score).toBe(210); // 7 × t3 (30)
    expect(c.tiers).toEqual(['t3', 't3', 't3', 't3', 't3', 't3', 't3']);
    expect(c.endedBy).toBe('completed');
    expect(c.playKind).toBe('daily');
    expect(c.contentVersion).toBe(hotBank.contentVersion);
    expect(c.results.map((r) => r.answer)).toEqual(
      hotPromptIds.map((_, i) => `Answer${i + 1}`),
    );
    // 'done' est terminale : tout événement absorbé
    const after = R(s, { type: 'SUBMIT', now: 99_999, input: 'alias1' });
    expect(after).toBe(s);
  });

  it('T-02 — retry libre : rejet sans pénalité, deadline inchangée', () => {
    const { R } = setup();
    let s = R(createHotSession(dailyMeta), { type: 'START_SESSION', now: 0 });
    s = R(s, { type: 'TICK', now: 3_000 });
    s = R(s, { type: 'SUBMIT', now: 4_000, input: 'zzz' });
    expect(s.phase).toBe('answering'); // toujours en saisie
    expect(s.rejected).toBe('zzz');
    expect(s.answerEndsAt).toBe(28_000); // aucune pénalité de temps
    expect(s.results).toHaveLength(0);
    s = R(s, { type: 'SUBMIT', now: 9_000, input: 'alias1' });
    expect(s.phase).toBe('feedback');
    expect(s.results[0]?.tier).toBe('t3');
  });

  it('T-03 — timeout : miss, brouillon conservé comme rawAnswer (valeur 0)', () => {
    const { R } = setup();
    let s = R(createHotSession(dailyMeta), { type: 'START_SESSION', now: 0 });
    s = R(s, { type: 'TICK', now: 3_000 });
    s = R(s, { type: 'EDIT_DRAFT', input: 'réponse presque tap' });
    expect(s.draft).toBe('réponse presque tap');
    s = R(s, { type: 'TICK', now: 28_000 });
    expect(s.phase).toBe('feedback');
    const r = s.results[0];
    expect(r?.tier).toBeNull();
    expect(r?.score).toBe(0);
    expect(r?.rawAnswer).toBe('réponse presque tap'); // trace conservée
    expect(r?.answer).toBeNull();
  });

  it('T-04 — deadline stricte : SUBMIT à t = answerEndsAt ignoré (le timeout gagne)', () => {
    const { R } = setup();
    let s = R(createHotSession(dailyMeta), { type: 'START_SESSION', now: 0 });
    s = R(s, { type: 'TICK', now: 3_000 });
    const s2 = R(s, { type: 'SUBMIT', now: 28_000, input: 'alias1' });
    expect(s2).toBe(s); // soumission tardive : état inchangé
    s = R(s, { type: 'TICK', now: 28_000 });
    expect(s.results[0]?.tier).toBeNull();
    expect(s.results[0]?.rawAnswer).toBeNull();
  });

  it('T-05 — SUBMIT à t = answerEndsAt − 1 accepté', () => {
    const { R } = setup();
    let s = R(createHotSession(dailyMeta), { type: 'START_SESSION', now: 0 });
    s = R(s, { type: 'TICK', now: 3_000 });
    s = R(s, { type: 'SUBMIT', now: 27_999, input: 'alias1' });
    expect(s.phase).toBe('feedback');
    expect(s.results[0]?.tier).toBe('t3');
    expect(s.results[0]?.score).toBe(30);
  });

  it('T-06 — double SUBMIT au même instant : un seul résultat (idempotence)', () => {
    const { R } = setup();
    let s = R(createHotSession(dailyMeta), { type: 'START_SESSION', now: 0 });
    s = R(s, { type: 'TICK', now: 3_000 });
    s = R(s, { type: 'SUBMIT', now: 5_000, input: 'alias1' });
    expect(s.phase).toBe('feedback');
    const again = R(s, { type: 'SUBMIT', now: 5_000, input: 'alias1' });
    expect(again).toBe(s);
    expect(s.results).toHaveLength(1);
  });

  it('T-07 — SUBMIT pendant le feedback : ignoré (verrou de phase)', () => {
    const { R } = setup();
    let s = R(createHotSession(dailyMeta), { type: 'START_SESSION', now: 0 });
    s = R(s, { type: 'TICK', now: 3_000 });
    s = R(s, { type: 'SUBMIT', now: 5_000, input: 'alias1' });
    const locked = R(s, { type: 'SUBMIT', now: 5_500, input: 'Decoy' });
    expect(locked).toBe(s);
    expect(s.results).toHaveLength(1);
    expect(s.results[0]?.answer).toBe('Answer1');
  });

  it('T-08 — PAUSE/RESUME : décalage inconditionnel des deadlines, gel total', () => {
    const { R } = setup();
    let s = R(createHotSession(dailyMeta), { type: 'START_SESSION', now: 0 });
    s = R(s, { type: 'TICK', now: 3_000 });
    expect(s.answerEndsAt).toBe(28_000);
    s = R(s, { type: 'PAUSE', now: 10_000 });
    expect(s.pausedAt).toBe(10_000);
    // gel : tout événement hors RESUME est absorbé
    expect(R(s, { type: 'SUBMIT', now: 20_000, input: 'alias1' })).toBe(s);
    expect(R(s, { type: 'TICK', now: 30_000 })).toBe(s);
    s = R(s, { type: 'RESUME', now: 40_000 });
    expect(s.pausedAt).toBeUndefined();
    expect(s.answerEndsAt).toBe(58_000); // 28 000 + (40 000 − 10 000)
    s = R(s, { type: 'SUBMIT', now: 57_000, input: 'alias1' });
    expect(s.phase).toBe('feedback');
    expect(s.results[0]?.tier).toBe('t3');
  });
});
