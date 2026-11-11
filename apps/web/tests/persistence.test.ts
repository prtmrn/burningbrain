// ─────────────────────────────────────────────────────────────
// persistence.test.ts — P-1 → P-5 (spec v2 §C.4, non-régression persistance)
// Terrain vierge (D-06) : fixtures hotbrain:* v1, aucune migration legacy.
// ─────────────────────────────────────────────────────────────
import { describe, expect, it } from 'vitest';
import {
  blend,
  validateCompletion,
  wrap,
  type BrainCompletion,
  type BrainDiveState,
  type ReferenceDistribution,
} from '@hotbrain/engine';
import { keys } from '../src/state/keys';
import { loadHistory, saveCompletion } from '../src/state/history-store';
import { loadRefDist, recordRefDistCompletion } from '../src/state/refdist-store';
import { purgeContentCache, saveContent } from '../src/state/content-cache';
import { createSessionController } from '../src/state/session-store';
import {
  WALL_EPOCH,
  brainBank,
  brainDailyMeta,
  brainPromptIds,
  contentCtx,
  createMemoryKV,
  manualClock,
} from './fixtures';

// ── Fabrique de complétion brain valide (5 rounds, score 150, ceiling 600) ──

function makeBrainCompletion(overrides: Partial<BrainCompletion> = {}): BrainCompletion {
  const results = brainPromptIds.map((id, i) => ({
    promptId: id,
    promptText: `Prompt ${id} ?`,
    answersGiven: [
      {
        rawAnswer: 'Bach',
        answer: 'Bach',
        tier: 't3' as const,
        score: 30,
        at: 1_000 + i,
        viaCorrection: false,
      },
    ],
    score: 30,
    endReason: 'timeout' as const,
  }));
  return {
    mode: 'brain',
    playKind: 'daily',
    theme: 'arts-literature',
    scope: '2027-01-15',
    game: 68,
    score: 150,
    results,
    contentVersion: 1,
    endedBy: 'completed',
    ceiling: 600,
    totals: { answersAccepted: 5, duplicatesIgnored: 0 },
    ...overrides,
  };
}

describe('persistance — non-régression (spec §C.4)', () => {
  it('P-1 — fixture dive brain en pleine liste : lecture validée, reprise fonctionnelle', () => {
    const kv = createMemoryKV();
    const clock1 = manualClock(WALL_EPOCH);
    const c1 = createSessionController({
      kv,
      content: contentCtx(brainBank, brainPromptIds),
      clocks: clock1,
    });
    c1.start('brain', brainDailyMeta);
    c1.dispatch({ type: 'START_SESSION', now: 0 });
    clock1.advanceMono(3_000);
    c1.dispatch({ type: 'TICK', now: 3_000 }); // listing, deadline 63 000
    clock1.advanceMono(4_000);
    c1.dispatch({ type: 'SUBMIT', now: 7_000, input: 'Mozart' });
    clock1.advanceMono(1_000);
    c1.dispatch({ type: 'SUBMIT', now: 8_000, input: 'Bach' });

    // ── Rechargement 30 s plus tard (wall) : mono repart à 0 ──
    const clock2 = manualClock(WALL_EPOCH + 30_000);
    const c2 = createSessionController({
      kv,
      content: contentCtx(brainBank, brainPromptIds),
      clocks: clock2,
    });
    const resumed = c2.resume() as BrainDiveState;
    expect(resumed).not.toBeNull();
    expect(resumed.phase).toBe('listing');
    expect(resumed.currentAnswers.map((a) => a.answer)).toEqual(['Mozart', 'Bach']);
    expect(resumed.answerEndsAt).toBe(33_000); // 63 000 − 30 000 écoulées

    // La session reprend fonctionnellement
    c2.dispatch({ type: 'SUBMIT', now: 32_000, input: 'Vivaldi' });
    const after = c2.getState() as BrainDiveState;
    expect(after.currentAnswers.map((a) => a.answer)).toEqual(['Mozart', 'Bach', 'Vivaldi']);
  });

  it('P-2 — historique corrompu : rejet propre entrée par entrée, jamais de crash', () => {
    const valid = makeBrainCompletion();
    const badScore = makeBrainCompletion({ score: 999, scope: '2027-01-14' });
    const badMode = { ...makeBrainCompletion({ scope: '2027-01-13' }), mode: 'x' };
    const badLength = makeBrainCompletion({
      scope: '2027-01-12',
      results: makeBrainCompletion().results.slice(0, 4), // ≠ 5 alors que completed
      score: 120,
    });
    const kv = createMemoryKV({
      [keys.history]: JSON.stringify(
        wrap({ completions: [valid, badScore, badMode, badLength, 'chaîne libre'] }),
      ),
    });
    const loaded = loadHistory(kv);
    expect(loaded).toHaveLength(1); // seule l'entrée valide survit
    expect(loaded[0]?.scope).toBe('2027-01-15');

    // Enveloppe illisible → réinitialisation propre, pas d'exception
    const kv2 = createMemoryKV({ [keys.history]: '{{{pas du json' });
    expect(() => loadHistory(kv2)).not.toThrow();
    expect(loadHistory(kv2)).toEqual([]);
    const kv3 = createMemoryKV({ [keys.history]: JSON.stringify({ sans: 'enveloppe' }) });
    expect(loadHistory(kv3)).toEqual([]);
  });

  it('P-3 — migration d\'enveloppe : schemaVersion 0 → 1, clés inconnues conservées', () => {
    const valid = makeBrainCompletion();
    const kv = createMemoryKV({
      [keys.history]: JSON.stringify({
        schemaVersion: 0, // chaîne de migrations : migrate[0→1] (identité de câblage)
        data: { completions: [valid], experimental: { a: 1 } },
      }),
    });
    expect(loadHistory(kv)).toHaveLength(1); // migration appliquée

    // L'écriture ultérieure conserve les clés inconnues (forward-compat)
    saveCompletion(kv, makeBrainCompletion({ scope: '2027-01-16' }));
    const raw = JSON.parse(kv.getItem(keys.history) as string) as {
      schemaVersion: number;
      data: { completions: unknown[]; experimental?: { a: number } };
    };
    expect(raw.schemaVersion).toBe(1);
    expect(raw.data.completions).toHaveLength(2);
    expect(raw.data.experimental).toEqual({ a: 1 });
  });

  it('P-4 — rebase refdist par mode : distVersion montée → blended jeté, n conservé', () => {
    for (const [mode, maxScore] of [['hot', 700], ['brain', 1_000]] as const) {
      const kv = createMemoryKV();
      const v1: ReferenceDistribution = {
        mode,
        distVersion: 1,
        maxScore,
        buckets: new Array<number>(maxScore + 1).fill(1),
      };
      for (const bucket of [100, 200, 100]) {
        recordRefDistCompletion(kv, mode, v1, bucket, '2027-01-15T00:00:00Z');
      }
      const before = loadRefDist(kv, mode, v1, '2027-01-15T00:00:00Z');
      expect(before.base.distVersion).toBe(1);
      expect(before.localCompletions).toBe(3);

      const v2: ReferenceDistribution = {
        ...v1,
        distVersion: 2,
        buckets: new Array<number>(maxScore + 1).fill(2),
      };
      const rebased = loadRefDist(kv, mode, v2, '2027-01-16T00:00:00Z');
      expect(rebased.base.distVersion).toBe(2); // nouvelle base
      expect(rebased.localCompletions).toBe(3); // n conservé
      expect(rebased.localBuckets[100]).toBe(2); // observations conservées
      expect(rebased.localBuckets[200]).toBe(1);
      expect(rebased.blended).toEqual(blend(v2.buckets, rebased.localBuckets, 3));
      expect(rebased.blendedAt).toBe('2027-01-16T00:00:00Z');
    }
  });

  it('P-5 — purge du cache contenu à 14 j ; le ceiling figé survit (F-15)', () => {
    const kv = createMemoryKV();
    const now = Date.parse('2027-01-15T12:00:00Z');
    const daily = {
      theme: 'geography',
      date: '2026-12-31',
      dayNumber: 53,
      mode: 'brain' as const,
      promptIds: ['geo-x'],
      contentVersion: 1,
    };
    const sheets = [
      { promptId: 'geo-x', contentVersion: 1, entries: [{ answer: 'A', tier: 't1' as const, aliases: [] }] },
    ];
    saveContent(kv, { daily, sheets }, '2026-12-31T12:00:00Z'); // 15 j → à purger
    saveContent(
      kv,
      { daily: { ...daily, date: '2027-01-14' }, sheets },
      '2027-01-14T12:00:00Z',
    ); // 1 j → conservé
    kv.setItem('hotbrain:content:corrompu', 'pas-du-json'); // illisible → purgé

    const purged = purgeContentCache(kv, now);
    expect(purged).toContain('hotbrain:content:geography:brain:2026-12-31');
    expect(purged).toContain('hotbrain:content:corrompu');
    expect(purged).not.toContain('hotbrain:content:geography:brain:2027-01-14');
    expect(kv.getItem('hotbrain:content:geography:brain:2027-01-14')).not.toBeNull();

    // Après purge des feuilles, une vieille BrainCompletion garde son ceiling
    // figé → le ratio de partage D-19 reste affichable.
    const old = makeBrainCompletion({
      scope: '2026-12-31',
      score: 145,
      ceiling: 585,
      results: [
        {
          promptId: 'art-composers',
          promptText: 'P',
          answersGiven: [
            { rawAnswer: 'Mozart', answer: 'Mozart', tier: 't4', score: 60, at: 1_000, viaCorrection: false },
            { rawAnswer: 'Scarlatti', answer: 'Scarlatti', tier: 't5', score: 85, at: 2_000, viaCorrection: false },
          ],
          score: 145,
          endReason: 'timeout',
        },
      ],
      totals: { answersAccepted: 2, duplicatesIgnored: 0 },
      endedBy: 'abandoned', // pas de contrainte de longueur hors 'completed'
    });
    saveCompletion(kv, old);
    const [loaded] = loadHistory(kv);
    expect(loaded && validateCompletion(loaded)).toBe(true);
    const brain = loaded as BrainCompletion;
    expect(brain.ceiling).toBe(585); // figé, indépendant du cache purgé
    expect(Math.round((100 * brain.score) / brain.ceiling)).toBe(25); // ratio affichable
  });
});
