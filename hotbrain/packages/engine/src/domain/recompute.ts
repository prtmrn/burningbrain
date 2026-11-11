// ─────────────────────────────────────────────────────────────
// recompute.ts — recalcul progressif D-03 (mecaniques §A.7)
//   Déclenché quand le contenu monte en version, pour chaque Completion dont
//   contentVersion < version courante. Re-validation par `rawAnswer` avec le
//   pipeline IDENTIQUE au jeu (validateAnswer).
//   Propriétés : MONOTONE pour le joueur (jamais de baisse rétroactive) ;
//   un miss n'est jamais « ressuscité » ; une réponse disparue de la feuille
//   est CONSERVÉE (F-6) ; stats redérivées par l'appelant.
//   contentVersion = dernière version APPLIQUÉE (= version courante après
//   recalcul — sémantique T-32, actée ; voir mecaniques §A.7).
//   Note de coin (regroupement d'entrées entre versions) : deux AcceptedAnswer
//   historiques pointant vers la même entry fusionnée conservent LEURS
//   points (monotonie) — l'invariant « doublons absents » est un invariant
//   DE JEU, pas D'HISTORIQUE.
// ─────────────────────────────────────────────────────────────
import { TIER_POINTS } from './constants';
import { validateAnswer } from './validate';
import type {
  AnswerSheet,
  BrainCompletion,
  Completion,
  HotCompletion,
  PlayerPreferences,
} from './types';

export interface RecomputeResult {
  completion: Completion;
  changed: boolean;
}

const RECOMPUTE_PREFS: PlayerPreferences = {
  muted: false,
  colorblind: false,
  lowPower: false,
  answerCorrections: true, // D-21 : une réponse acceptée par autocorrect doit re-matcher
  clearRejectedEntry: false,
};

export function recomputeCompletion(
  c: Completion,
  sheets: Map<string, AnswerSheet>,
  contentVersion: number,
): RecomputeResult {
  return c.mode === 'hot'
    ? recomputeHot(c, sheets, contentVersion)
    : recomputeBrain(c, sheets, contentVersion);
}

function recomputeHot(
  c: HotCompletion,
  sheets: Map<string, AnswerSheet>,
  contentVersion: number,
): RecomputeResult {
  let changed = false;
  const results = c.results.map((r) => {
    // Un miss reste un miss — on ne « découvre » pas une réponse jamais tapée.
    if (r.rawAnswer === null || r.tier === null) return r;
    const sheet = sheets.get(r.promptId);
    if (!sheet) return r; // feuille absente → conservation (F-6)
    const v = validateAnswer(r.rawAnswer, sheet, RECOMPUTE_PREFS);
    if (v.kind !== 'accept') return r; // réponse disparue → conservation (F-6)
    const next = {
      ...r,
      answer: v.entry.answer,
      tier: v.entry.tier,
      score: TIER_POINTS[v.entry.tier],
      ...(v.entry.quip !== undefined ? { quip: v.entry.quip } : {}),
    };
    if (next.tier !== r.tier || next.score !== r.score || next.answer !== r.answer) {
      changed = true;
    }
    return next;
  });
  const next: HotCompletion = {
    ...c,
    results,
    tiers: results.map((r) => r.tier ?? 'miss'),
    score: results.reduce((acc, r) => acc + r.score, 0),
    contentVersion, // dernière version appliquée (T-32)
  };
  return { completion: next, changed };
}

function recomputeBrain(
  c: BrainCompletion,
  sheets: Map<string, AnswerSheet>,
  contentVersion: number,
): RecomputeResult {
  let changed = false;
  const results = c.results.map((r) => {
    const sheet = sheets.get(r.promptId);
    if (!sheet) return r; // conservation (F-6)
    const answersGiven = r.answersGiven.map((a) => {
      const v = validateAnswer(a.rawAnswer, sheet, RECOMPUTE_PREFS);
      if (v.kind !== 'accept') return a; // disparue → conservation (F-6)
      const next = { ...a, answer: v.entry.answer, tier: v.entry.tier, score: TIER_POINTS[v.entry.tier] };
      // `at` et `viaCorrection` sont historiques : jamais recalculés.
      if (next.tier !== a.tier || next.score !== a.score || next.answer !== a.answer) {
        changed = true;
      }
      return next;
    });
    return { ...r, answersGiven, score: answersGiven.reduce((acc, a) => acc + a.score, 0) };
  });
  const next: BrainCompletion = {
    ...c,
    results,
    score: results.reduce((acc, r) => acc + r.score, 0),
    contentVersion,
    // ceiling : FIGÉ (F-15) — jamais recalculé, sinon le ratio de partage
    // deviendrait instable. totals.duplicatesIgnored : historique, inchangé.
    totals: {
      answersAccepted: results.reduce((acc, r) => acc + r.answersGiven.length, 0),
      duplicatesIgnored: c.totals.duplicatesIgnored,
    },
  };
  return { completion: next, changed };
}
