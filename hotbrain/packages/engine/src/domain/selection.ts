// ─────────────────────────────────────────────────────────────
// selection.ts — sélection des prompts (mecaniques §A.5)
//   · Graine composite : FNV-1a(`${theme}:${mode}:${dayNumber}`) — chaîne
//     canonique, séparateur ':' — puis mulberry32 + Fisher–Yates.
//   · Daily : même (theme, mode, dayNumber) → même série pour tous (rituel
//     partagé) ; hot et brain tirent des graines différentes → séries
//     indépendantes par construction (D-20 ; recouvrement fortuit accepté F-12).
//   · Illimité à la carte : tirage SANS REMISE persistant, redérivé de
//     l'historique (pas de structure d'ombre), seedé par sessionSeed ;
//     remise TOTALE à épuisement du paquet (cycle neuf).
// ─────────────────────────────────────────────────────────────
import { fisherYatesShuffle, fnv1a32, mulberry32 } from './rng';
import type { Completion, GameConfig, GameMode, PromptBank, ThemeId } from './types';

/** Graine 32 bits de la série (theme, mode, dayNumber). */
export function seedSeries(theme: ThemeId, mode: GameMode, dayNumber: number): number {
  return fnv1a32(`${theme}:${mode}:${dayNumber}`);
}

/** Série quotidienne déterministe : n = config.modes[mode].rounds (7|5).
 *  Gardes : bank.theme === theme ; bank.prompts.length ≥ n (sinon échec
 *  explicite au boot — contenu corrompu). */
export function seedDaily(
  theme: ThemeId,
  mode: GameMode,
  day: number,
  bank: PromptBank,
  config: GameConfig,
): string[] {
  if (bank.theme !== theme) {
    throw new Error(`seedDaily: bank theme "${bank.theme}" ≠ requested "${theme}"`);
  }
  const n = config.modes[mode].rounds;
  if (bank.prompts.length < n) {
    throw new Error(
      `seedDaily: bank "${theme}" has ${bank.prompts.length} prompts < ${n} required`,
    );
  }
  const rng = mulberry32(seedSeries(theme, mode, day));
  const indices = fisherYatesShuffle(
    bank.prompts.map((_, i) => i),
    rng,
  );
  return indices.slice(0, n).map((i) => (bank.prompts[i] as { id: string }).id);
}

/** Ids déjà vus en illimité pour (theme, mode) — redérivé de l'historique
 *  à chaque tirage (sans remise PERSISTANT, pas de structure d'ombre). */
export function seenIds(theme: ThemeId, mode: GameMode, history: Completion[]): Set<string> {
  const seen = new Set<string>();
  for (const c of history) {
    if (c.playKind !== 'unlimited' || c.theme !== theme || c.mode !== mode) continue;
    for (const r of c.results) seen.add(r.promptId);
  }
  return seen;
}

/** Tirage illimité sans remise. pool = banque − vus ; si pool < n → REMISE
 *  TOTALE (cycle neuf, cohérent entraînement). Jamais de doublon intra-session. */
export function drawThemed(
  theme: ThemeId,
  mode: GameMode,
  bank: PromptBank,
  history: Completion[],
  sessionSeed: number,
  config: GameConfig,
): string[] {
  const n = config.modes[mode].rounds;
  const seen = seenIds(theme, mode, history);
  let pool = bank.prompts.filter((p) => !seen.has(p.id)).map((p) => p.id);
  if (pool.length < n) {
    pool = bank.prompts.map((p) => p.id); // épuisement → remise totale
  }
  const rng = mulberry32(sessionSeed >>> 0);
  return fisherYatesShuffle(pool, rng).slice(0, n);
}
