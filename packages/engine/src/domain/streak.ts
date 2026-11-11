// ─────────────────────────────────────────────────────────────
// streak.ts — streak & stats dérivées (mecaniques §A.4)
//   D-16 : TOUTE complétion daily `completed` compte (tout mode, tout thème).
//   F-11 : une session abandonnée n'alimente PAS le streak (anti-farming).
//   F-4  : zéro réparation — compteur purement dérivé de l'historique.
//   Les séries hors-daily (unlimited) ne comptent pas (scope = n° de session).
// ─────────────────────────────────────────────────────────────
import { addCivilDays } from './calendar';
import type { Completion, GameMode, PlayerStats, PlayerStatsBreakdown, ThemeId } from './types';

/** Dates civiles des complétions daily `completed` (tout mode, tout thème). */
function dailyCompletedDates(history: Completion[]): Set<string> {
  const dates = new Set<string>();
  for (const c of history) {
    if (c.playKind === 'daily' && c.endedBy === 'completed') dates.add(c.scope);
  }
  return dates;
}

/** Chaîne de dates civiles consécutives terminant en `last`. */
function chainEndingAt(dates: Set<string>, last: string): number {
  let streak = 0;
  let d = last;
  while (dates.has(d)) {
    streak++;
    d = addCivilDays(d, -1);
  }
  return streak;
}

/** currentStreak = longueur de la chaîne terminant à la plus récente date
 *  daily completed, évaluée à `today` (tolérance : la chaîne est vivante si
 *  son extrémité est aujourd'hui OU hier — sinon elle est morte → 0). */
export function updateStreak(history: Completion[], today: string): number {
  const dates = dailyCompletedDates(history);
  if (dates.size === 0) return 0;
  const last = [...dates].sort()[dates.size - 1] as string;
  if (last !== today && last !== addCivilDays(today, -1)) return 0;
  return chainEndingAt(dates, last);
}

/** maxStreak = plus longue chaîne de dates daily completed de l'historique. */
export function maxStreak(history: Completion[]): number {
  const dates = dailyCompletedDates(history);
  let best = 0;
  for (const d of dates) {
    // début de chaîne : la veille n'est pas dans l'ensemble
    if (!dates.has(addCivilDays(d, -1))) {
      best = Math.max(best, chainEndingAt(dates, chainEnd(dates, d)));
    }
  }
  return best;
}

function chainEnd(dates: Set<string>, start: string): string {
  let d = start;
  while (dates.has(addCivilDays(d, 1))) d = addCivilDays(d, 1);
  return d;
}

/** Stats dérivées d'un sous-ensemble de l'historique (F-11 — jamais source
 *  primaire ; purement re-dérivable des Completion persistées). */
function deriveFrom(subset: Completion[], allDailyDatesHistory: Completion[], today: string): PlayerStats {
  const totalScore = subset.reduce((acc, c) => acc + c.score, 0);
  return {
    gamesPlayed: subset.length,
    totalScore,
    bestScore: subset.reduce((acc, c) => Math.max(acc, c.score), 0),
    currentStreak: updateStreak(allDailyDatesHistory, today),
    maxStreak: maxStreak(allDailyDatesHistory),
    lastPlayedDate: lastDailyDate(allDailyDatesHistory),
  };
}

function lastDailyDate(history: Completion[]): string | null {
  const dates = dailyCompletedDates(history);
  if (dates.size === 0) return null;
  return [...dates].sort()[dates.size - 1] as string;
}

/** PlayerStats globales (streak calculé sur TOUT l'historique daily). */
export function deriveStats(history: Completion[], today: string): PlayerStats {
  return deriveFrom(history, history, today);
}

/** Découpes par mode et par thème — dérivées, aucun état supplémentaire.
 *  Note : le streak (global par définition D-16) est reporté identique dans
 *  chaque découpe ; seules les compteurs de volume/score sont segmentés. */
export function deriveBreakdown(history: Completion[], today: string): PlayerStatsBreakdown {
  const byMode = {} as Record<GameMode, PlayerStats>;
  for (const mode of ['hot', 'brain'] as const) {
    byMode[mode] = deriveFrom(history.filter((c) => c.mode === mode), history, today);
  }
  const byTheme: Partial<Record<ThemeId, PlayerStats>> = {};
  const themes = new Set<ThemeId>(history.map((c) => c.theme));
  for (const theme of themes) {
    byTheme[theme] = deriveFrom(history.filter((c) => c.theme === theme), history, today);
  }
  return { overall: deriveStats(history, today), byMode, byTheme };
}
