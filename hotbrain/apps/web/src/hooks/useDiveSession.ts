// ─────────────────────────────────────────────────────────────
// useDiveSession.ts — pont React ↔ session-store (spec §A.2 hooks)
// Responsabilités :
//   · créer/reprendre la session (resume après rechargement ; un dive
//     d'une AUTRE date/mode est effacé — la daily du jour prime) ;
//   · pomper TICK via l'horloge injectée (performance.now en prod) ;
//   · auto-avance du feedback hot après T_FEEDBACK = 2 500 ms ;
//   · visibilitychange → PAUSE/RESUME ;
//   · clearAndExit() : décision backlog M2 — le dive en phase 'done' est
//     effacé APRÈS la synthèse vue (la complétion est déjà persistée,
//     la synthèse se relit depuis l'état tant que le dive existe).
// ─────────────────────────────────────────────────────────────
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import type {
  DiveState,
  GameMode,
  ReducerContext,
  SessionMeta,
} from '@hotbrain/engine';
import {
  createSessionController,
  type SessionClocks,
  type SessionController,
} from '../state/session-store';
import type { EnumerableKV } from '../state/local-storage-kv';
import { T_FEEDBACK, UI_TICK_MS } from '../motion';
import { useVisibility } from './useVisibility';

export interface DiveSessionDeps {
  kv: EnumerableKV;
  clocks: SessionClocks;
  mode: GameMode;
  meta: SessionMeta;
  content: Omit<ReducerContext, 'persistCompletion' | 'persistCurrentAnswers'>;
  tickMs?: number;
}

export interface DiveSession {
  state: DiveState | null;
  /** Horloge mono rafraîchie à chaque tick UI (countdowns). */
  now: number;
  startSession(): void;
  submit(input: string): void;
  editDraft(input: string): void;
  applyCorrection(): void;
  ackFeedback(): void;
  pause(): void;
  resumePlay(): void;
  /** Brain : passer à la question suivante en gardant la récolte. */
  abandonRound(): void;
  /** Backlog M2 tranché : efface le dive 'done' après synthèse vue. */
  clearAndExit(): void;
}

function sameDiveIdentity(s: DiveState, mode: GameMode, meta: SessionMeta): boolean {
  return (
    s.mode === mode &&
    s.playKind === meta.playKind &&
    s.theme === meta.theme &&
    s.date === meta.date
  );
}

export function useDiveSession(deps: DiveSessionDeps): DiveSession {
  const { kv, clocks, mode, meta, content } = deps;
  const tickMs = deps.tickMs ?? UI_TICK_MS;

  const controllerRef = useRef<SessionController | null>(null);
  if (controllerRef.current === null) {
    const controller = createSessionController({ kv, clocks, content });
    // Reprise après rechargement ; un dive d'une autre daily est abandonné.
    const resumed = controller.resume();
    if (resumed === null || !sameDiveIdentity(resumed, mode, meta)) {
      if (resumed !== null) controller.clear();
      controller.start(mode, meta);
    }
    controllerRef.current = controller;
  }
  const controller = controllerRef.current;

  const [, bump] = useReducer((x: number) => x + 1, 0);
  const [now, setNow] = useState<number>(() => clocks.nowMono());
  useEffect(() => controller.subscribe(bump), [controller]);

  // ── Pompe TICK : preview → answering, answering/listing → timeout ──
  useEffect(() => {
    const id = setInterval(() => {
      const t = clocks.nowMono();
      setNow(t);
      const s = controller.getState();
      if (!s || s.pausedAt !== undefined) return;
      if (s.phase === 'preview' || s.phase === 'answering' || s.phase === 'listing') {
        controller.dispatch({ type: 'TICK', now: t });
      }
    }, tickMs);
    return () => clearInterval(id);
  }, [controller, clocks, tickMs]);

  // ── Auto-avance du feedback hot après T_FEEDBACK ──
  const phase = controller.getState()?.phase;
  useEffect(() => {
    if (phase !== 'feedback') return;
    const id = setTimeout(() => {
      controller.dispatch({ type: 'FEEDBACK_ACK', now: clocks.nowMono() });
    }, T_FEEDBACK);
    return () => clearTimeout(id);
  }, [controller, clocks, phase]);

  // ── Pause/reprise à la visibilité ──
  useVisibility({
    onHidden: (t) => controller.dispatch({ type: 'PAUSE', now: t }),
    onVisible: (t) => controller.dispatch({ type: 'RESUME', now: t }),
    nowMono: clocks.nowMono,
  });

  const startSession = useCallback(() => {
    controller.dispatch({ type: 'START_SESSION', now: clocks.nowMono() });
    setNow(clocks.nowMono());
  }, [controller, clocks]);

  const submit = useCallback(
    (input: string) => {
      controller.dispatch({ type: 'SUBMIT', now: clocks.nowMono(), input });
    },
    [controller, clocks],
  );

  const editDraft = useCallback(
    (input: string) => {
      controller.dispatch({ type: 'EDIT_DRAFT', input });
    },
    [controller],
  );

  const applyCorrection = useCallback(() => {
    controller.dispatch({ type: 'APPLY_CORRECTION', now: clocks.nowMono() });
  }, [controller, clocks]);

  const ackFeedback = useCallback(() => {
    controller.dispatch({ type: 'FEEDBACK_ACK', now: clocks.nowMono() });
  }, [controller, clocks]);

  const pause = useCallback(() => {
    controller.dispatch({ type: 'PAUSE', now: clocks.nowMono() });
  }, [controller, clocks]);

  const resumePlay = useCallback(() => {
    controller.dispatch({ type: 'RESUME', now: clocks.nowMono() });
  }, [controller, clocks]);

  const abandonRound = useCallback(() => {
    controller.dispatch({ type: 'ABANDON_ROUND', now: clocks.nowMono() });
  }, [controller, clocks]);

  const clearAndExit = useCallback(() => {
    controller.clear();
  }, [controller]);

  return {
    state: controller.getState(),
    now,
    startSession,
    submit,
    editDraft,
    applyCorrection,
    ackFeedback,
    pause,
    resumePlay,
    abandonRound,
    clearAndExit,
  };
}
