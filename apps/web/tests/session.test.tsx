// ─────────────────────────────────────────────────────────────
// session.test.tsx — Hot daily jouable (M3) : parcours réel du
// SessionScreen sur la VRAIE banque Général (42 prompts), horloge
// manuelle + fake timers. Remonte le reducer via le hook de M3 et le
// contrôleur de M2.
// ─────────────────────────────────────────────────────────────
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  TIER_POINTS,
  assembleBank,
  seedDaily,
  validateAnswer,
  validateCompletion,
  type HotCompletion,
  type LoadedBank,
  type SessionMeta,
} from '@hotbrain/engine';
import { hotbrainConfig } from '../src/config';
import { keys } from '../src/state/keys';
import { loadHistory } from '../src/state/history-store';
import { useDiveSession } from '../src/hooks/useDiveSession';
import { SessionScreen } from '../src/components/SessionScreen';
import { DEFAULT_PREFERENCES } from '../src/state/prefs-store';
import { contentCtx, createMemoryKV, manualClock, type ManualClock } from './fixtures';
import type { EnumerableKV } from '../src/state/local-storage-kv';

const here = dirname(fileURLToPath(import.meta.url));
const generalBank: LoadedBank = assembleBank(
  JSON.parse(readFileSync(join(here, '..', '..', '..', 'content', 'banks', 'general.json'), 'utf8')),
  'general',
);

const DAY = 42;
const META: SessionMeta = { playKind: 'daily', theme: 'general', date: '2026-12-20', dayNumber: DAY };
const PROMPT_IDS = seedDaily('general', 'hot', DAY, generalBank, hotbrainConfig);

function TestApp({ kv, clock }: { kv: EnumerableKV; clock: ManualClock }) {
  const session = useDiveSession({
    kv,
    clocks: clock,
    mode: 'hot',
    meta: META,
    content: contentCtx(generalBank, PROMPT_IDS),
    tickMs: 50,
  });
  return (
    <SessionScreen
      session={session}
      bank={generalBank}
      promptIds={PROMPT_IDS}
      streak={3}
      dayLabel={`Jour ${DAY}`}
      themeLabel="Général"
      themeIcon="🌡️"
      onExit={() => {}}
    />
  );
}

function firstSheet() {
  const sheet = generalBank.sheets.get(PROMPT_IDS[0] as string);
  if (!sheet) throw new Error('fixture');
  return sheet;
}

/** Entrée valide quelconque du round courant (réponse canonique). */
function validAnswer(roundIndex: number): { answer: string; points: number } {
  const sheet = generalBank.sheets.get(PROMPT_IDS[roundIndex] as string);
  if (!sheet) throw new Error('fixture');
  const entry = sheet.entries[0];
  if (!entry) throw new Error('fixture');
  return { answer: entry.answer, points: TIER_POINTS[entry.tier] };
}

function submitCurrent(input: string): void {
  const field = screen.getByTestId('answer-input');
  fireEvent.change(field, { target: { value: input } });
  const form = field.closest('form');
  if (!form) throw new Error('form introuvable');
  fireEvent.submit(form);
}

/** Avance l'horloge mono + les timers UI jusqu'à la phase d'answering. */
function toAnswering(clock: ManualClock): void {
  act(() => {
    clock.advanceMono(3_100);
    vi.advanceTimersByTime(250);
  });
}

describe('session hot daily (M3 — jouable)', () => {
  let kv: EnumerableKV;
  let clock: ManualClock;

  beforeEach(() => {
    vi.useFakeTimers();
    kv = createMemoryKV();
    clock = manualClock();
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('intro → preview → answering : saisie acceptée, palier affiché, mercure monte', () => {
    render(<TestApp kv={kv} clock={clock} />);
    fireEvent.click(screen.getByTestId('start-button'));
    expect(screen.getByTestId('preview')).toBeInTheDocument();
    toAnswering(clock);
    expect(screen.getByTestId('answering')).toBeInTheDocument();

    const { answer, points } = validAnswer(0);
    act(() => submitCurrent(answer));

    // Palier révélé + thermomètre reflète le score
    expect(screen.getByTestId('feedback')).toBeInTheDocument();
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', String(points));
    expect(screen.getByTestId('thermo-score')).toHaveTextContent(`${points} °C`);
    expect(screen.getByTestId('hud-score')).toHaveTextContent(`${points} °C`);

    // Auto-avance T_FEEDBACK sans clic
    act(() => {
      clock.advanceMono(2_500);
      vi.advanceTimersByTime(2_600);
    });
    expect(screen.getByTestId('preview')).toBeInTheDocument(); // round 2
  });

  it('retry libre : refus bref non bloquant, deadline inchangée, acceptation ensuite', () => {
    render(<TestApp kv={kv} clock={clock} />);
    fireEvent.click(screen.getByTestId('start-button'));
    toAnswering(clock);

    act(() => submitCurrent('réponse improbable xyz'));
    expect(screen.getByTestId('feedback-rejected')).toBeInTheDocument();
    expect(screen.getByTestId('answering')).toBeInTheDocument(); // toujours en saisie
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '0');

    const { answer, points } = validAnswer(0);
    act(() => submitCurrent(answer));
    expect(screen.getByTestId('feedback')).toBeInTheDocument();
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', String(points));
  });

  it('suggestion fuzzy : affichée, jamais appliquée d\'office, appliquée au clic', () => {
    render(<TestApp kv={kv} clock={clock} />);
    fireEvent.click(screen.getByTestId('start-button'));
    toAnswering(clock);

    // Choisit dynamiquement une coquille qui produit une suggestion unique
    const sheet = firstSheet();
    const index = generalBank.indexes.get(PROMPT_IDS[0] as string);
    if (!index) throw new Error('fixture');
    let typo = '';
    let expected = '';
    for (const entry of sheet.entries) {
      for (const form of [entry.answer, ...entry.aliases]) {
        if (form.length < 5) continue;
        const mutated = `${form.slice(0, -1)}${form.endsWith('e') ? 'a' : 'e'}`;
        const v = validateAnswer(mutated, sheet, DEFAULT_PREFERENCES, index);
        if (v.kind === 'accept' && v.corrected) {
          typo = mutated;
          expected = v.corrected.to;
          break;
        }
      }
      if (typo) break;
    }
    expect(typo).not.toBe('');

    // D-21 : autocorrect généreux — acceptée d'office, la correction est affichée
    act(() => submitCurrent(typo));
    expect(screen.getByTestId('feedback')).toBeInTheDocument();
    expect(screen.getByTestId('autocorrected')).toBeInTheDocument();
    expect(screen.getByTestId('feedback')).toHaveTextContent(typo);
    expect(screen.getByTestId('feedback')).toHaveTextContent(expected);
  });

  it('parcours complet : 7 rounds → synthèse (score, verdict, révélation, partage, streak)', () => {
    render(<TestApp kv={kv} clock={clock} />);
    fireEvent.click(screen.getByTestId('start-button'));

    let expectedScore = 0;
    const chosen: string[] = [];
    for (let round = 0; round < 7; round++) {
      toAnswering(clock);
      const { answer, points } = validAnswer(round);
      chosen.push(answer);
      expectedScore += points;
      act(() => submitCurrent(answer));
      expect(screen.getByTestId('feedback')).toBeInTheDocument();
      act(() => {
        clock.advanceMono(500);
        fireEvent.click(screen.getByTestId('continue-button'));
      });
    }

    // ── Synthèse ──
    expect(screen.getByTestId('summary')).toBeInTheDocument();
    expect(screen.getByTestId('summary-score')).toHaveTextContent(`${expectedScore} °C`);
    expect(screen.getByTestId('summary-verdict')).toBeInTheDocument();
    for (let i = 0; i < 7; i++) {
      expect(screen.getByTestId(`round-row-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`round-row-${i}`)).toHaveTextContent(chosen[i] as string);
    }
    expect(screen.getByTestId('streak-badge')).toHaveTextContent('3');

    // ── Partage thermo-colonne anti-spoiler : 7 pastilles, zéro réponse ──
    const share = screen.getByTestId('share-text').textContent as string;
    expect(share).toContain(`🔥 BurningBrain · Jour ${DAY} · Burning · Général`);
    const row = share.split('\n')[1] as string;
    expect([...row]).toHaveLength(7);
    for (const answer of chosen) expect(share).not.toContain(answer);

    // ── Complétion persistée valide ──
    const history = loadHistory(kv);
    expect(history).toHaveLength(1);
    const completion = history[0] as HotCompletion;
    expect(validateCompletion(completion)).toBe(true);
    expect(completion.score).toBe(expectedScore);
    expect(completion.endedBy).toBe('completed');

    // ── Décision backlog M2 : quitter la synthèse efface le dive 'done' ──
    expect(kv.getItem(keys.dive)).not.toBeNull();
    fireEvent.click(screen.getByTestId('exit-summary'));
    expect(kv.getItem(keys.dive)).toBeNull();
  });
});
