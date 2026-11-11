// ─────────────────────────────────────────────────────────────
// reducer.ts — cœur du jeu : reducer pur + boucle d'événements
// (spec v2 §A.1 — équivalent structurel d'un ECS pour ce domaine :
//  entités = états immuables, systèmes = transitions pures ordonnées par la
//  FSM ; pas de framework ECS pour un jeu textuel single-player).
//
// INVARIANTS (mecaniques §B/§C) :
//   · PUR : même (state, event, ctx) → même newState. Jamais de mutation.
//   · Le reducer ne lit JAMAIS l'horloge : `now` arrive par événement.
//   · Deadline stricte commune aux deux modes : soumission recevable ssi
//     t < answerEndsAt (le timeout gagne à égalité exacte).
//   · pausedAt gèle tout sauf RESUME ; reprise = décalage inconditionnel
//     des deadlines (F-07 acté).
//   · Complétion idempotente : la phase 'done' absorbe tout événement.
// ─────────────────────────────────────────────────────────────
import { TIER_POINTS } from './constants';
import { sessionCeiling } from './scoring';
import { validateAnswer, validateListing, type SheetIndex } from './validate';
import type {
  AcceptedAnswer,
  AnswerSheet,
  AnswerSheetEntry,
  BrainCompletion,
  BrainDiveState,
  BrainRoundResult,
  Completion,
  CorrectionSuggestion,
  DiveState,
  GameConfig,
  GamePhase,
  HotCompletion,
  HotDiveState,
  HotRoundResult,
  PlayKind,
  PlayerPreferences,
  Prompt,
  RoundEndReason,
  ThemeId,
} from './types';

// ── Événements du domaine ──

export type GameEvent =
  | { type: 'START_SESSION'; now: number }
  | { type: 'TICK'; now: number }                    // pompage externe (rAF/intervalle)
  | { type: 'SUBMIT'; now: number; input: string }
  | { type: 'APPLY_CORRECTION'; now: number }        // accepte la suggestion fuzzy
  | { type: 'EDIT_DRAFT'; input: string }            // frappe clavier (hors deadline)
  | { type: 'PAUSE'; now: number }                   // visibilitychange hidden / rechargement
  | { type: 'RESUME'; now: number }
  | { type: 'FEEDBACK_ACK'; now: number }            // hot uniquement
  | { type: 'ABANDON_ROUND'; now: number }           // brain uniquement
  | { type: 'ABANDON_SESSION'; now: number };

// ── Contexte injecté (seule porte vers l'extérieur) ──

export interface ReducerContext {
  config: GameConfig;
  prefs: PlayerPreferences;
  contentVersion: number;                            // version des feuilles au moment du jeu
  prompt(s: DiveState): Prompt;                      // prompt du round courant
  sheet(s: DiveState): AnswerSheet;                  // feuille du round courant
  sheetIndex(s: DiveState): SheetIndex;              // index pré-calculé de la feuille
  allSheets(): AnswerSheet[];                        // toutes les feuilles de la série (plafond)
  persistCompletion(c: Completion): void;            // effet confiné au contexte
  persistCurrentAnswers(s: BrainDiveState): void;    // reprise en pleine liste
}

// ── Fabriques de session ──

export interface SessionMeta {
  playKind: PlayKind;
  theme: ThemeId;
  date: string;                    // daily : date locale ; unlimited : id de session
  dayNumber: number;               // daily : n° du jour ; unlimited : compteur local
  sessionSeed?: number;            // unlimited uniquement
}

export function createHotSession(meta: SessionMeta): HotDiveState {
  return {
    mode: 'hot',
    playKind: meta.playKind,
    theme: meta.theme,
    date: meta.date,
    dayNumber: meta.dayNumber,
    ...(meta.sessionSeed !== undefined ? { sessionSeed: meta.sessionSeed >>> 0 } : {}),
    roundIndex: 0,
    phase: 'intro',
    previewEndsAt: null,
    answerEndsAt: null,
    results: [],
    draft: '',
    correction: null,
    rejected: null,
  };
}

export function createBrainSession(meta: SessionMeta): BrainDiveState {
  return {
    mode: 'brain',
    playKind: meta.playKind,
    theme: meta.theme,
    date: meta.date,
    dayNumber: meta.dayNumber,
    ...(meta.sessionSeed !== undefined ? { sessionSeed: meta.sessionSeed >>> 0 } : {}),
    roundIndex: 0,
    phase: 'intro',
    previewEndsAt: null,
    answerEndsAt: null,
    results: [],
    currentAnswers: [],
    lastFeedback: null,
    duplicatesIgnored: 0,
  };
}

// ── Reducer racine : dispatch sur le mode ──

export function gameReducer(s: DiveState, ev: GameEvent, ctx: ReducerContext): DiveState {
  // Gelé : seul RESUME passe (décalage inconditionnel des deadlines).
  if (s.pausedAt !== undefined) {
    return ev.type === 'RESUME' ? resumeState(s, ev.now) : s;
  }
  if (ev.type === 'PAUSE') {
    return s.phase !== 'done' && s.phase !== 'intro' ? { ...s, pausedAt: ev.now } : s;
  }
  if (ev.type === 'ABANDON_SESSION' && s.phase !== 'done' && s.phase !== 'intro') {
    return abandonSession(s, ev.now, ctx);
  }
  return s.mode === 'hot' ? hotReducer(s, ev, ctx) : brainReducer(s, ev, ctx);
}

// ── HOT ──

function hotReducer(s: HotDiveState, ev: GameEvent, ctx: ReducerContext): HotDiveState {
  const cfg = ctx.config.modes.hot;
  switch (s.phase) {
    case 'intro':
      if (ev.type === 'START_SESSION') {
        return {
          ...s,
          phase: 'preview',
          previewEndsAt: ev.now + cfg.previewMs,
          answerEndsAt: null,
          draft: '',
          correction: null,
          rejected: null,
        };
      }
      return s;

    case 'preview':
      if (ev.type === 'TICK' && ev.now >= (s.previewEndsAt as number)) {
        return {
          ...s,
          phase: 'answering',
          answerEndsAt: (s.previewEndsAt as number) + cfg.roundMs,
        };
      }
      return s;

    case 'answering': {
      if (ev.type === 'EDIT_DRAFT') {
        return { ...s, draft: ev.input.slice(0, ctx.config.maxAnswerLength) };
      }
      if (ev.type === 'SUBMIT' || ev.type === 'APPLY_CORRECTION') {
        // Deadline stricte : recevable ssi t < answerEndsAt (B.2).
        if (ev.now < (s.answerEndsAt as number)) {
          const input =
            ev.type === 'APPLY_CORRECTION'
              ? s.correction
                ? s.correction.to
                : null
              : ev.input;
          if (input === null) return s; // APPLY_CORRECTION sans suggestion : ignoré
          const v = validateAnswer(input, ctx.sheet(s), ctx.prefs, ctx.sheetIndex(s), ctx.config.maxAnswerLength);
          switch (v.kind) {
            case 'accept':
              return revealHot(
                s,
                ctx,
                v.entry,
                input,
                ev.type === 'APPLY_CORRECTION' || v.corrected !== undefined,
              );
            case 'correction':
              return { ...s, correction: { from: input, to: v.to }, rejected: input };
            case 'rejected':
              return { ...s, rejected: input, correction: null }; // retry libre
            case 'none':
              return s;
          }
        }
        return s; // soumission tardive : conservée en draft, le timeout tranche
      }
      if (ev.type === 'TICK' && ev.now >= (s.answerEndsAt as number)) {
        return revealHotMiss(s, ctx);
      }
      return s;
    }

    case 'feedback':
      if (ev.type === 'FEEDBACK_ACK') return advanceHot(s, ev.now, ctx);
      return s; // SUBMIT ignoré (verrou de phase)

    case 'done':
      return s; // terminal ; complétion déjà persistée
  }
}

function revealHot(
  s: HotDiveState,
  ctx: ReducerContext,
  entry: AnswerSheetEntry,
  raw: string,
  viaCorrection: boolean = false,
): HotDiveState {
  const prompt = ctx.prompt(s);
  const r: HotRoundResult = {
    promptId: prompt.id,
    promptText: prompt.text,
    rawAnswer: raw,
    answer: entry.answer,
    tier: entry.tier,
    score: TIER_POINTS[entry.tier],
    ...(entry.quip !== undefined ? { quip: entry.quip } : {}),
    ...(viaCorrection ? { viaCorrection: true } : {}),
  };
  return {
    ...s,
    phase: 'feedback',
    results: [...s.results, r],
    correction: null,
    rejected: null,
  };
}

function revealHotMiss(s: HotDiveState, ctx: ReducerContext): HotDiveState {
  const prompt = ctx.prompt(s);
  const draft = s.draft?.trim() ?? '';
  const r: HotRoundResult = {
    promptId: prompt.id,
    promptText: prompt.text,
    rawAnswer: draft === '' ? null : draft, // trace du brouillon, vaut 0
    answer: null,
    tier: null,
    score: 0,
  };
  return { ...s, phase: 'feedback', results: [...s.results, r], correction: null };
}

function advanceHot(s: HotDiveState, now: number, ctx: ReducerContext): HotDiveState {
  const cfg = ctx.config.modes.hot;
  if (s.roundIndex < cfg.rounds - 1) {
    return {
      ...s,
      roundIndex: s.roundIndex + 1,
      phase: 'preview',
      previewEndsAt: now + cfg.previewMs,
      answerEndsAt: null,
      draft: '',
      correction: null,
      rejected: null,
    };
  }
  return completeHot(s, ctx, 'completed');
}

function completeHot(s: HotDiveState, ctx: ReducerContext, endedBy: 'completed' | 'abandoned'): HotDiveState {
  const completion: HotCompletion = {
    mode: 'hot',
    playKind: s.playKind,
    theme: s.theme,
    scope: s.date,
    game: s.dayNumber,
    score: s.results.reduce((acc, r) => acc + r.score, 0),
    tiers: s.results.map((r) => r.tier ?? 'miss'),
    results: s.results,
    contentVersion: ctx.contentVersion,
    endedBy,
  };
  ctx.persistCompletion(completion);
  return { ...s, phase: 'done' };
}

// ── BRAIN ──

function brainReducer(s: BrainDiveState, ev: GameEvent, ctx: ReducerContext): BrainDiveState {
  const cfg = ctx.config.modes.brain;
  switch (s.phase) {
    case 'intro':
      if (ev.type === 'START_SESSION') {
        return {
          ...s,
          phase: 'preview',
          previewEndsAt: ev.now + cfg.previewMs,
          answerEndsAt: null,
          draft: '',
          lastFeedback: null,
        };
      }
      return s;

    case 'preview':
      if (ev.type === 'TICK' && ev.now >= (s.previewEndsAt as number)) {
        return {
          ...s,
          phase: 'listing',
          answerEndsAt: (s.previewEndsAt as number) + cfg.roundMs,
          currentAnswers: [],
          lastFeedback: null,
        };
      }
      return s;

    case 'listing': {
      if (ev.type === 'EDIT_DRAFT') {
        return { ...s, draft: ev.input.slice(0, ctx.config.maxAnswerLength) };
      }
      if (ev.type === 'ABANDON_ROUND') {
        return closeBrainRound(s, ev.now, ctx, 'abandoned');
      }
      if (ev.type === 'SUBMIT' || ev.type === 'APPLY_CORRECTION') {
        // Deadline stricte, identique à hot (B.2) : à égalité, timeout.
        if (ev.now >= (s.answerEndsAt as number)) {
          return closeBrainRound(s, ev.now, ctx, 'timeout');
        }
        const correctionTo =
          s.lastFeedback && s.lastFeedback.kind === 'correction' ? s.lastFeedback.to : undefined;
        const input =
          ev.type === 'APPLY_CORRECTION'
            ? correctionTo !== undefined
              ? correctionTo
              : null
            : ev.input;
        if (input === null) return s; // APPLY_CORRECTION sans suggestion : ignoré
        const v = validateListing(
          input,
          ctx.sheet(s),
          s.currentAnswers,
          ctx.prefs,
          ctx.sheetIndex(s),
          ctx.config.maxAnswerLength,
        );
        const roundStart = (s.answerEndsAt as number) - cfg.roundMs;
        switch (v.kind) {
          case 'accept': {
            const entry: AnswerSheetEntry = v.entry;
            const a: AcceptedAnswer = {
              rawAnswer: input,
              answer: entry.answer,
              tier: entry.tier,
              score: TIER_POINTS[entry.tier],
              at: ev.now - roundStart,
              viaCorrection: ev.type === 'APPLY_CORRECTION' || v.corrected !== undefined,
            };
            const s2: BrainDiveState = {
              ...s,
              draft: '', // vidé après acceptation
              currentAnswers: [...s.currentAnswers, a],
              lastFeedback: { kind: 'accepted', input, score: a.score, at: ev.now },
            };
            ctx.persistCurrentAnswers(s2); // reprise en pleine liste
            // sheet-exhausted : clôture DANS LE MÊME TOUR, sans bonus (B.5.4).
            return s2.currentAnswers.length === ctx.sheet(s).entries.length
              ? closeBrainRound(s2, ev.now, ctx, 'sheet-exhausted')
              : s2;
          }
          case 'duplicate':
            // Dédup douce, jamais punitive ; le draft RESTE rempli (correction rapide).
            return {
              ...s,
              duplicatesIgnored: s.duplicatesIgnored + 1, // F-14 : cumul session
              lastFeedback: { kind: 'duplicate', input, at: ev.now },
            };
          case 'correction':
            return {
              ...s,
              lastFeedback: { kind: 'correction', input, to: v.to, at: ev.now },
            };
          case 'rejected':
            return {
              ...s,
              // draft conservé sauf préférence contraire (correction rapide)
              ...(ctx.prefs.clearRejectedEntry ? { draft: '' } : {}),
              lastFeedback: { kind: 'rejected', input, at: ev.now },
            };
          case 'none':
            return s;
        }
      }
      if (ev.type === 'TICK' && ev.now >= (s.answerEndsAt as number)) {
        return closeBrainRound(s, ev.now, ctx, 'timeout');
      }
      return s;
    }

    case 'done':
      return s; // pas de phase 'feedback' en brain
  }
}

function closeBrainRound(
  s: BrainDiveState,
  now: number,
  ctx: ReducerContext,
  reason: RoundEndReason,
): BrainDiveState {
  const cfg = ctx.config.modes.brain;
  const prompt = ctx.prompt(s);
  const r: BrainRoundResult = {
    promptId: prompt.id,
    promptText: prompt.text,
    answersGiven: s.currentAnswers,
    score: s.currentAnswers.reduce((acc, a) => acc + a.score, 0),
    endReason: reason,
  };
  const s2: BrainDiveState = {
    ...s,
    results: [...s.results, r],
    currentAnswers: [],
    draft: '',
    lastFeedback: null,
    // duplicatesIgnored : CUMUL SESSION (F-14) — jamais remis à zéro par round.
  };
  if (s2.roundIndex < cfg.rounds - 1) {
    return {
      ...s2,
      roundIndex: s2.roundIndex + 1,
      phase: 'preview',
      previewEndsAt: now + cfg.previewMs,
      answerEndsAt: null,
    };
  }
  return completeBrain(s2, ctx, 'completed');
}

function completeBrain(
  s: BrainDiveState,
  ctx: ReducerContext,
  endedBy: 'completed' | 'abandoned',
): BrainDiveState {
  const completion: BrainCompletion = {
    mode: 'brain',
    playKind: s.playKind,
    theme: s.theme,
    scope: s.date,
    game: s.dayNumber,
    score: s.results.reduce((acc, r) => acc + r.score, 0),
    results: s.results,
    contentVersion: ctx.contentVersion,
    endedBy,
    ceiling: sessionCeiling(ctx.allSheets()), // F-15 : figé au moment du jeu
    totals: {
      answersAccepted: s.results.reduce((acc, r) => acc + r.answersGiven.length, 0),
      duplicatesIgnored: s.duplicatesIgnored, // F-14 : recopié tel quel
    },
  };
  ctx.persistCompletion(completion);
  return { ...s, phase: 'done' };
}

// ── Abandon de session (commun — B.5.5, F-11) ──
// Rounds clos conservés ; round en cours : hot → miss si 'answering' ;
// brain → clos 'abandoned' avec sa récolte. La complétion partielle est
// persistée (endedBy:'abandoned') : une daily abandonnée est CONSOMMÉE.

function abandonSession(s: DiveState, now: number, ctx: ReducerContext): DiveState {
  if (s.mode === 'hot') {
    let results = s.results;
    if (s.phase === 'answering') {
      results = [...results, revealHotMissResult(s, ctx)];
    }
    return completeHot({ ...s, results }, ctx, 'abandoned');
  }
  const brain = s as BrainDiveState;
  let s2 = brain;
  if (brain.phase === 'listing') {
    const prompt = ctx.prompt(brain);
    const r: BrainRoundResult = {
      promptId: prompt.id,
      promptText: prompt.text,
      answersGiven: brain.currentAnswers,
      score: brain.currentAnswers.reduce((acc, a) => acc + a.score, 0),
      endReason: 'abandoned',
    };
    s2 = { ...brain, results: [...brain.results, r], currentAnswers: [], draft: '', lastFeedback: null };
  }
  return completeBrain(s2, ctx, 'abandoned');
}

function revealHotMissResult(s: HotDiveState, ctx: ReducerContext): HotRoundResult {
  const prompt = ctx.prompt(s);
  const draft = s.draft?.trim() ?? '';
  return {
    promptId: prompt.id,
    promptText: prompt.text,
    rawAnswer: draft === '' ? null : draft,
    answer: null,
    tier: null,
    score: 0,
  };
}

// ── Pause / reprise (décalage inconditionnel — F-07 acté) ──

function pauseState(s: DiveState, now: number): DiveState {
  return { ...s, pausedAt: now };
}

export function resumeState(s: DiveState, now: number): DiveState {
  const d = now - (s.pausedAt as number);
  const { pausedAt: _cleared, ...rest } = s; // pausedAt retiré (reprise)
  return {
    ...rest,
    previewEndsAt: s.previewEndsAt == null ? null : s.previewEndsAt + d,
    answerEndsAt: s.answerEndsAt == null ? null : s.answerEndsAt + d,
  } as DiveState;
}

// ── Façade temporelle commune ──

export function deadline(s: DiveState): number | null {
  return s.phase === 'preview'
    ? s.previewEndsAt
    : s.phase === 'answering' || s.phase === 'listing'
      ? s.answerEndsAt
      : null;
}

export { pauseState };
export type { GamePhase, CorrectionSuggestion };
