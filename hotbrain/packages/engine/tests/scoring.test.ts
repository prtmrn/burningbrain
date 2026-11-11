// U-41 → U-47 + U-60 — verdicts & invariant structurel de score
// (mecaniques §A.2, F-02, F-22)
import { describe, expect, it } from 'vitest';
import { computeVerdictBrain, computeVerdictHot } from '../src/domain/scoring';
import { mulberry32 } from '../src/domain/rng';
import {
  createBrainSession,
  gameReducer,
} from '../src/domain/reducer';
import type { BrainCompletion, BrainDiveState } from '../src/domain/types';
import {
  artBank,
  dailyMeta,
  makeContext,
  makeDrive,
} from './fixtures';

describe('verdicts', () => {
  it('U-41 — bande t1 : [0, 150]', () => {
    expect(computeVerdictHot(0).tier).toBe('t1');
    expect(computeVerdictHot(150).tier).toBe('t1');
  });

  it('U-42 — bande t3 : [151, 250]', () => {
    expect(computeVerdictHot(151).tier).toBe('t3');
    expect(computeVerdictHot(250).tier).toBe('t3');
  });

  it('U-43 — bande t4 : [251, 350]', () => {
    expect(computeVerdictHot(251).tier).toBe('t4');
    expect(computeVerdictHot(350).tier).toBe('t4');
  });

  it('U-44 — bande t5 : [351, 449]', () => {
    expect(computeVerdictHot(351).tier).toBe('t5');
    expect(computeVerdictHot(449).tier).toBe('t5');
  });

  it('U-45 — bande t6 : [450, 700]', () => {
    expect(computeVerdictHot(450).tier).toBe('t6');
    expect(computeVerdictHot(700).tier).toBe('t6');
  });

  it('U-46 — verdict brain : même grille sur ratio × 700 (F-22)', () => {
    expect(computeVerdictBrain(350, 700).tier).toBe('t4'); // ratio 0,5 → 350
    expect(computeVerdictBrain(651, 700).tier).toBe('t6'); // ratio 0,93 → 651
  });

  it('U-47 — garde ceiling ≤ 0 : verdict minimal, jamais de NaN', () => {
    expect(computeVerdictBrain(0, 700).tier).toBe('t1');
    expect(computeVerdictBrain(0, 0).tier).toBe('t1');
    expect(computeVerdictBrain(500, 0).tier).toBe('t1');
  });
});

describe('propriété structurelle', () => {
  it('U-60 — 200 sessions brain simulées : score ≤ ceiling, réponses canoniques uniques', () => {
    const ids = artBank.prompts.slice(0, 5).map((p) => p.id);
    for (let iter = 0; iter < 200; iter++) {
      const rng = mulberry32(iter + 1);
      const drive = makeDrive();
      const ctx = makeContext(artBank, ids, drive);
      let s: BrainDiveState = createBrainSession({
        ...dailyMeta,
        theme: 'arts-literature',
      });
      s = gameReducer(s, { type: 'START_SESSION', now: 0 }, ctx) as BrainDiveState;
      for (let round = 0; round < 5; round++) {
        expect(s.phase).toBe('preview');
        s = gameReducer(
          s,
          { type: 'TICK', now: s.previewEndsAt as number },
          ctx,
        ) as BrainDiveState;
        expect(s.phase).toBe('listing');
        const deadline = s.answerEndsAt as number;
        const roundStart = deadline - 60_000;
        const sheet = ctx.sheet(s);
        const flat = sheet.entries.flatMap((e) => [e.answer, ...e.aliases]);
        const k = 1 + Math.floor(rng() * (flat.length + 2));
        const submissions: { t: number; input: string }[] = [];
        for (let j = 0; j < k; j++) {
          const t = roundStart + 1 + Math.floor(rng() * 58_000);
          const pick = rng();
          let input: string;
          if (pick < 0.55) {
            input = flat[Math.floor(rng() * flat.length)] as string;
          } else if (pick < 0.75 && submissions.length > 0) {
            // re-soumission : doublon probable (ou rejet idempotent)
            input = submissions[Math.floor(rng() * submissions.length)]?.input as string;
          } else {
            input = `garbage ${Math.floor(rng() * 100_000)}`;
          }
          submissions.push({ t, input });
        }
        submissions.sort((a, b) => a.t - b.t);
        for (const sub of submissions) {
          if (s.phase !== 'listing') break; // sheet-exhausted : clôture anticipée
          s = gameReducer(
            s,
            { type: 'SUBMIT', now: sub.t, input: sub.input },
            ctx,
          ) as BrainDiveState;
        }
        if (s.phase === 'listing') {
          s = gameReducer(s, { type: 'TICK', now: deadline }, ctx) as BrainDiveState;
        }
      }
      expect(s.phase).toBe('done');
      expect(drive.completions).toHaveLength(1);
      const c = drive.completions[0] as BrainCompletion;
      expect(c.score).toBeLessThanOrEqual(c.ceiling);
      expect(c.totals.answersAccepted).toBe(
        c.results.reduce((acc, r) => acc + r.answersGiven.length, 0),
      );
      for (const r of c.results) {
        const canonical = r.answersGiven.map((a) => a.answer);
        expect(new Set(canonical).size).toBe(canonical.length); // doublons absents
        // chaque score d'entrée est revérifié contre son palier
        expect(r.score).toBe(r.answersGiven.reduce((acc, a) => acc + a.score, 0));
      }
    }
  });
});
