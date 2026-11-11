// T-17, T-18, T-32 — recalcul progressif D-03 (mecaniques §A.7, F-6, F-15)
import { describe, expect, it } from 'vitest';
import { recomputeCompletion } from '../src/domain/recompute';
import type {
  AnswerSheet,
  BrainCompletion,
  HotCompletion,
} from '../src/domain/types';

describe('recompute', () => {
  it('T-17 — re-tier favorable : points montants, miss inchangé, version appliquée', () => {
    const completion: HotCompletion = {
      mode: 'hot',
      playKind: 'daily',
      theme: 'geography',
      scope: '2026-11-09',
      game: 9,
      score: 30,
      tiers: ['t3', 'miss'],
      results: [
        {
          promptId: 'geo-capitals',
          promptText: 'P',
          rawAnswer: 'Prague',
          answer: 'Prague',
          tier: 't3',
          score: 30,
        },
        {
          promptId: 'geo-capitals',
          promptText: 'P',
          rawAnswer: null,
          answer: null,
          tier: null,
          score: 0,
        },
      ],
      contentVersion: 1,
      endedBy: 'completed',
    };
    const sheets = new Map<string, AnswerSheet>([
      [
        'geo-capitals',
        {
          promptId: 'geo-capitals',
          contentVersion: 4,
          entries: [
            { answer: 'Prague', tier: 't4', aliases: ['Praha'] }, // t3 → t4
            { answer: 'Rome', tier: 't1', aliases: [] },
          ],
        },
      ],
    ]);
    const { completion: next, changed } = recomputeCompletion(completion, sheets, 4);
    expect(changed).toBe(true);
    const n = next as HotCompletion;
    expect(n.results[0]?.tier).toBe('t4');
    expect(n.results[0]?.score).toBe(60); // 30 → 60 (+30)
    expect(n.score).toBe(60);
    expect(n.tiers).toEqual(['t4', 'miss']);
    expect(n.results[1]?.tier).toBeNull(); // un miss n'est jamais ressuscité
    expect(n.results[1]?.score).toBe(0);
    expect(n.contentVersion).toBe(4); // dernière version appliquée (T-32)
  });

  it('T-18 — réponse disparue de la feuille : conservation (F-6), version monte quand même', () => {
    const completion: HotCompletion = {
      mode: 'hot',
      playKind: 'daily',
      theme: 'geography',
      scope: '2026-11-09',
      game: 9,
      score: 30,
      tiers: ['t3'],
      results: [
        {
          promptId: 'geo-capitals',
          promptText: 'P',
          rawAnswer: 'Old City',
          answer: 'Old City',
          tier: 't3',
          score: 30,
        },
      ],
      contentVersion: 1,
      endedBy: 'completed',
    };
    const sheets = new Map<string, AnswerSheet>([
      [
        'geo-capitals',
        {
          promptId: 'geo-capitals',
          contentVersion: 4,
          entries: [{ answer: 'Rome', tier: 't1', aliases: [] }], // 'Old City' a disparu
        },
      ],
    ]);
    const { completion: next, changed } = recomputeCompletion(completion, sheets, 4);
    expect(changed).toBe(false); // rien n'a bougé…
    const n = next as HotCompletion;
    expect(n.results[0]?.tier).toBe('t3'); // …les 30 points sont conservés
    expect(n.results[0]?.score).toBe(30);
    expect(n.score).toBe(30);
    expect(n.contentVersion).toBe(4); // version consultée (sémantique T-32)
  });

  it('T-32 — recalcul brain : re-tier appliqué, disparue conservée, ceiling figé (F-15)', () => {
    const completion: BrainCompletion = {
      mode: 'brain',
      playKind: 'daily',
      theme: 'arts-literature',
      scope: '2026-11-09',
      game: 9,
      score: 115,
      results: [
        {
          promptId: 'art-composers',
          promptText: 'P',
          answersGiven: [
            { rawAnswer: 'Mozart', answer: 'Mozart', tier: 't3', score: 30, at: 1_000, viaCorrection: false },
            { rawAnswer: 'Scarlatti', answer: 'Scarlatti', tier: 't5', score: 85, at: 2_000, viaCorrection: false },
          ],
          score: 115,
          endReason: 'timeout',
        },
      ],
      contentVersion: 1,
      endedBy: 'completed',
      ceiling: 585,
      totals: { answersAccepted: 2, duplicatesIgnored: 3 },
    };
    const sheets = new Map<string, AnswerSheet>([
      [
        'art-composers',
        {
          promptId: 'art-composers',
          contentVersion: 4,
          entries: [
            { answer: 'Mozart', tier: 't4', aliases: [] }, // t3 → t4
            { answer: 'Bach', tier: 't3', aliases: [] },
            // 'Scarlatti' a disparu de la feuille
          ],
        },
      ],
    ]);
    const { completion: next, changed } = recomputeCompletion(completion, sheets, 4);
    expect(changed).toBe(true);
    const n = next as BrainCompletion;
    expect(n.results[0]?.answersGiven[0]?.tier).toBe('t4');
    expect(n.results[0]?.answersGiven[0]?.score).toBe(60);
    expect(n.results[0]?.answersGiven[1]?.tier).toBe('t5'); // conservée (F-6)
    expect(n.results[0]?.answersGiven[1]?.score).toBe(85);
    expect(n.results[0]?.score).toBe(145); // 60 + 85
    expect(n.score).toBe(145);
    expect(n.contentVersion).toBe(4);
    expect(n.ceiling).toBe(585); // JAMAIS recalculé (F-15)
    expect(n.totals.answersAccepted).toBe(2);
    expect(n.totals.duplicatesIgnored).toBe(3); // historique, inchangé
  });
});
