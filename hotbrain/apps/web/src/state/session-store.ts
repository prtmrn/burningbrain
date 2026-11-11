// ─────────────────────────────────────────────────────────────
// session-store.ts — contrôleur de session (framework-agnostic)
// Orchestration reducer ↔ persistance :
//   · chaque transition persistée (couple mono/wall) ;
//   · récolte brain persistée à CHAQUE acceptation (persistCurrentAnswers —
//     reprise en pleine liste, §D.2) ;
//   · complétion → historique (borne 400 FIFO) + observation refdist ;
//   · resume() = reconstruction après rechargement ; un état gelé
//     (pausedAt persisté) est repris par RESUME (décalage inconditionnel).
// Seuls les hooks/composants connaîtront React ; ce contrôleur est testable
// en node pur.
// ─────────────────────────────────────────────────────────────
import {
  brainRatioBucket,
  createBrainSession,
  createHotSession,
  gameReducer,
  type Completion,
  type DiveState,
  type GameEvent,
  type GameMode,
  type KeyValueStore,
  type ReducerContext,
  type ReferenceDistribution,
  type SessionMeta,
} from '@hotbrain/engine';
import { clearDive, loadDive, saveDive } from './dive-store';
import { saveCompletion } from './history-store';
import { recordRefDistCompletion } from './refdist-store';

export interface SessionClocks {
  nowMono(): number;
  nowWall(): number;
  nowISO(): string;
}

export interface SessionControllerDeps {
  kv: KeyValueStore;
  /** Contexte contenu du reducer (prompt/sheet/index/allSheets/config/prefs). */
  content: Omit<ReducerContext, 'persistCompletion' | 'persistCurrentAnswers'>;
  clocks: SessionClocks;
  /** Distributions embarquées par mode (optionnel — percentile local). */
  refdist?: Partial<Record<GameMode, ReferenceDistribution>>;
  /** Effet de bord applicatif après chaque complétion (ex. invalidation UI). */
  onCompletion?(c: Completion): void;
}

export interface SessionController {
  getState(): DiveState | null;
  start(mode: GameMode, meta: SessionMeta): void;
  /** Reconstruction après rechargement. null = rien à reprendre (ou donnée
   *  rejetée proprement). */
  resume(): DiveState | null;
  dispatch(ev: GameEvent): void;
  clear(): void;
  subscribe(listener: () => void): () => void;
}

export function createSessionController(deps: SessionControllerDeps): SessionController {
  let state: DiveState | null = null;
  const listeners = new Set<() => void>();
  const emit = (): void => {
    for (const l of listeners) l();
  };

  const persist = (): void => {
    if (state) saveDive(deps.kv, state, deps.clocks.nowMono(), deps.clocks.nowWall());
  };

  const ctx: ReducerContext = {
    ...deps.content,
    persistCompletion: (c) => {
      saveCompletion(deps.kv, c);
      // Observation percentile locale (mecaniques §A.6 : hot = score,
      // brain = ratio ‰ — F-13).
      const embedded = deps.refdist?.[c.mode];
      if (embedded) {
        const bucket =
          c.mode === 'hot' ? c.score : brainRatioBucket(c.score, c.ceiling);
        recordRefDistCompletion(deps.kv, c.mode, embedded, bucket, deps.clocks.nowISO());
      }
      deps.onCompletion?.(c);
    },
    // §D.2 : la récolte du round brain est persistée à chaque acceptation.
    persistCurrentAnswers: (s) => {
      state = s;
      saveDive(deps.kv, s, deps.clocks.nowMono(), deps.clocks.nowWall());
    },
  };

  return {
    getState: () => state,

    start(mode, meta) {
      state = mode === 'hot' ? createHotSession(meta) : createBrainSession(meta);
      persist();
      emit();
    },

    resume() {
      const loaded = loadDive(deps.kv, deps.clocks.nowMono(), deps.clocks.nowWall());
      if (!loaded) {
        state = null;
        return null;
      }
      state = loaded;
      // État persisté gelé → reprise par décalage (fidélité F-07, voir
      // engine/state-core/dive-codec : l'app dispatche RESUME après
      // reconstruction).
      if (loaded.pausedAt !== undefined) {
        state = gameReducer(loaded, { type: 'RESUME', now: deps.clocks.nowMono() }, ctx);
        persist();
      }
      emit();
      return state;
    },

    dispatch(ev) {
      if (!state) return;
      // NB : persistCurrentAnswers (acceptation brain) peut avancer `state`
      // PENDANT le reducer — la comparaison doit donc porter sur l'état
      // d'avant dispatch, sinon l'émission/persistance serait sautée.
      const prev = state;
      const next = gameReducer(prev, ev, ctx);
      if (next !== prev) {
        state = next;
        persist(); // chaque transition persistée (rechargement = reprise)
        emit();
      }
    },

    clear() {
      state = null;
      clearDive(deps.kv);
      emit();
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
