// ─────────────────────────────────────────────────────────────
// integration.test.tsx — tests d'intégration React du volet persistance M2
// (jsdom, remount = rechargement — spec v2 §C.2 dans la mesure où M2 couvre
//  la persistance ; les I-tests d'UI de jeu arrivent en M3/M4).
// ─────────────────────────────────────────────────────────────
import { afterEach, describe, expect, it } from 'vitest';
import { act, cleanup, render, screen } from '@testing-library/react';
import { useEffect, useReducer, useState } from 'react';
import type { BrainCompletion, BrainDiveState, HotDiveState } from '@hotbrain/engine';
import { keys } from '../src/state/keys';
import { createLocalStorageKV, type EnumerableKV } from '../src/state/local-storage-kv';
import { loadHistory } from '../src/state/history-store';
import { getStats } from '../src/state/stats-store';
import { purgeContentCache, saveContent } from '../src/state/content-cache';
import {
  createSessionController,
  type SessionController,
} from '../src/state/session-store';
import {
  WALL_EPOCH,
  brainBank,
  brainDailyMeta,
  brainPromptIds,
  contentCtx,
  createMemoryKV,
  dailyMeta,
  hotBank,
  hotPromptIds,
  manualClock,
} from './fixtures';

afterEach(cleanup);

// ── Harnais de test : rend l'état du contrôleur (aucune UI de jeu — M3) ──

function DiveHarness({ controller }: { controller: SessionController }) {
  const [, bump] = useReducer((x: number) => x + 1, 0);
  useEffect(() => controller.subscribe(bump), [controller]);
  const s = controller.getState();
  return (
    <div>
      <output data-testid="phase">{s ? s.phase : 'none'}</output>
      <output data-testid="draft">{s?.draft ?? ''}</output>
      <output data-testid="deadline">{s?.answerEndsAt ?? 'null'}</output>
      <output data-testid="answers">{s?.mode === 'brain' ? s.currentAnswers.length : 0}</output>
    </div>
  );
}

describe('intégration React — persistance (remount = rechargement)', () => {
  it('I-M2-1 — remount hot à t = 12 s : état, draft et deadline restaurés', () => {
    const kv = createMemoryKV();
    const clock1 = manualClock(WALL_EPOCH);
    const c1 = createSessionController({
      kv,
      content: contentCtx(hotBank, hotPromptIds),
      clocks: clock1,
    });
    const first = render(<DiveHarness controller={c1} />);
    act(() => {
      c1.start('hot', dailyMeta);
      c1.dispatch({ type: 'START_SESSION', now: 0 });
    });
    clock1.advanceMono(3_000);
    act(() => {
      c1.dispatch({ type: 'TICK', now: 3_000 });
      c1.dispatch({ type: 'EDIT_DRAFT', input: 'pari' });
    });
    expect(screen.getByTestId('phase')).toHaveTextContent('answering');
    first.unmount(); // ── fermeture d'onglet à t = 12 s (wall) ──

    const clock2 = manualClock(WALL_EPOCH + 12_000); // mono repart à 0
    const c2 = createSessionController({
      kv,
      content: contentCtx(hotBank, hotPromptIds),
      clocks: clock2,
    });
    act(() => {
      c2.resume();
    });
    render(<DiveHarness controller={c2} />);
    expect(screen.getByTestId('phase')).toHaveTextContent('answering');
    expect(screen.getByTestId('draft')).toHaveTextContent('pari');
    expect(screen.getByTestId('deadline')).toHaveTextContent('21000'); // 33 s (3 s preview + 30 s, D-26) − 12 s
  });

  it('I-M2-2 — remount brain en pleine liste : récolte, deadline et draft restitués', () => {
    const kv = createMemoryKV();
    const clock1 = manualClock(WALL_EPOCH);
    const c1 = createSessionController({
      kv,
      content: contentCtx(brainBank, brainPromptIds),
      clocks: clock1,
    });
    const first = render(<DiveHarness controller={c1} />);
    act(() => {
      c1.start('brain', brainDailyMeta);
      c1.dispatch({ type: 'START_SESSION', now: 0 });
    });
    clock1.advanceMono(3_000);
    act(() => {
      c1.dispatch({ type: 'TICK', now: 3_000 });
    });
    clock1.advanceMono(4_000);
    act(() => {
      c1.dispatch({ type: 'SUBMIT', now: 7_000, input: 'Mozart' });
    });
    clock1.advanceMono(1_000);
    act(() => {
      c1.dispatch({ type: 'SUBMIT', now: 8_000, input: 'Bach' });
      c1.dispatch({ type: 'EDIT_DRAFT', input: 'viv' });
    });
    expect(screen.getByTestId('answers')).toHaveTextContent('2');
    first.unmount(); // ── rechargement 30 s plus tard (wall) ──

    const clock2 = manualClock(WALL_EPOCH + 30_000);
    const c2 = createSessionController({
      kv,
      content: contentCtx(brainBank, brainPromptIds),
      clocks: clock2,
    });
    act(() => {
      c2.resume();
    });
    render(<DiveHarness controller={c2} />);
    expect(screen.getByTestId('phase')).toHaveTextContent('listing');
    expect(screen.getByTestId('answers')).toHaveTextContent('2');
    expect(screen.getByTestId('draft')).toHaveTextContent('viv');
    expect(screen.getByTestId('deadline')).toHaveTextContent('33000'); // 63 s − 30 s
    // La liste continue de fonctionner après reprise
    act(() => {
      c2.dispatch({ type: 'SUBMIT', now: 32_000, input: 'Vivaldi' });
    });
    expect(screen.getByTestId('answers')).toHaveTextContent('3');
    const s = c2.getState() as BrainDiveState;
    expect(s.currentAnswers.map((a) => a.answer)).toEqual(['Mozart', 'Bach', 'Vivaldi']);
  });

  it('I-M2-3 — dive corrompu : rejet propre, écran "aucune session", jamais de crash', () => {
    const kv = createMemoryKV({
      [keys.dive]: JSON.stringify({
        schemaVersion: 1,
        data: { mode: 'x', phase: 'answering' }, // incohérent
      }),
    });
    const clock = manualClock();
    const c = createSessionController({
      kv,
      content: contentCtx(hotBank, hotPromptIds),
      clocks: clock,
    });
    expect(() => act(() => void c.resume())).not.toThrow();
    expect(c.resume()).toBeNull();
    render(<DiveHarness controller={c} />);
    expect(screen.getByTestId('phase')).toHaveTextContent('none');

    // JSON illisible → idem
    kv.setItem(keys.dive, '{{{');
    expect(c.resume()).toBeNull();
  });

  it('I-M2-4 — complétion jouée puis remount : stats dérivées cohérentes (F-4)', () => {
    const kv = createMemoryKV();
    const clock = manualClock(WALL_EPOCH);
    const c = createSessionController({
      kv,
      content: contentCtx(hotBank, hotPromptIds),
      clocks: clock,
    });
    act(() => {
      c.start('hot', dailyMeta);
      c.dispatch({ type: 'START_SESSION', now: 0 });
    });
    for (let i = 0; i < 7; i++) {
      const base = i * 6_000;
      clock.advanceMono(base + 3_000 - clock.nowMono());
      act(() => {
        c.dispatch({ type: 'TICK', now: base + 3_000 });
      });
      clock.advanceMono(2_000);
      act(() => {
        c.dispatch({ type: 'SUBMIT', now: base + 5_000, input: `alias${i + 1}` });
      });
      clock.advanceMono(1_000);
      act(() => {
        c.dispatch({ type: 'FEEDBACK_ACK', now: base + 6_000 });
      });
    }
    expect(c.getState()?.phase).toBe('done');
    expect(loadHistory(kv)).toHaveLength(1);

    // ── Remount : les stats sont re-dérivées de l'historique persisté ──
    function StatsHarness() {
      const stats = getStats(kv, '2027-01-15');
      return (
        <div>
          <output data-testid="played">{stats.gamesPlayed}</output>
          <output data-testid="best">{stats.bestScore}</output>
          <output data-testid="streak">{stats.currentStreak}</output>
        </div>
      );
    }
    render(<StatsHarness />);
    expect(screen.getByTestId('played')).toHaveTextContent('1');
    expect(screen.getByTestId('best')).toHaveTextContent('210'); // 7 × t3
    expect(screen.getByTestId('streak')).toHaveTextContent('1');
  });

  it('I-M2-5 — purge 14 j visible au remount ; ceiling brain survivant (ratio affichable)', () => {
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
    saveContent(kv, { daily, sheets }, '2026-12-31T12:00:00Z'); // 15 j → purgé
    saveContent(kv, { daily: { ...daily, date: '2027-01-14' }, sheets }, '2027-01-14T12:00:00Z');
    kv.setItem('hotbrain:content:corrompu', 'illisible');
    const brain: BrainCompletion = {
      mode: 'brain',
      playKind: 'daily',
      theme: 'arts-literature',
      scope: '2026-12-31',
      game: 53,
      score: 145,
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
      contentVersion: 1,
      endedBy: 'abandoned',
      ceiling: 585,
      totals: { answersAccepted: 2, duplicatesIgnored: 0 },
    };
    kv.setItem(keys.history, JSON.stringify({ schemaVersion: 1, data: { completions: [brain] } }));

    function PurgeHarness({ kv, nowWall }: { kv: EnumerableKV; nowWall: number }) {
      const [purged, setPurged] = useState<string[] | null>(null);
      useEffect(() => {
        setPurged(purgeContentCache(kv, nowWall));
      }, [kv, nowWall]);
      const old = loadHistory(kv).find((x) => x.mode === 'brain') as BrainCompletion | undefined;
      return (
        <div>
          <output data-testid="purged">{purged ? purged.length : '…'}</output>
          <output data-testid="ratio">
            {old ? `${Math.round((100 * old.score) / old.ceiling)} %` : 'n/a'}
          </output>
        </div>
      );
    }
    render(<PurgeHarness kv={kv} nowWall={now} />);
    expect(screen.getByTestId('purged')).toHaveTextContent('2'); // 15 j + illisible
    expect(screen.getByTestId('ratio')).toHaveTextContent('25 %'); // ceiling figé F-15
    expect(kv.getItem('hotbrain:content:geography:brain:2027-01-14')).not.toBeNull();
  });

  it('I-M2-6 — adaptateur localStorage : get/set/remove/keys fonctionnels', () => {
    const kv = createLocalStorageKV(window.localStorage);
    kv.setItem('hotbrain:test:a', '1');
    kv.setItem('hotbrain:test:b', '2');
    expect(kv.getItem('hotbrain:test:a')).toBe('1');
    expect(kv.getItem('hotbrain:test:absent')).toBeNull();
    expect(kv.keys()).toEqual(expect.arrayContaining(['hotbrain:test:a', 'hotbrain:test:b']));
    kv.removeItem('hotbrain:test:a');
    expect(kv.getItem('hotbrain:test:a')).toBeNull();
    kv.removeItem('hotbrain:test:b');
  });
});
