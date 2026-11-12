// ─────────────────────────────────────────────────────────────
// server/multi/phase.ts — calendrier d'un salon, pur (sans E/S).
// Le serveur est seul maître du temps : chaque manche = aperçu (previewMs)
// puis saisie (roundMs), enchaînées depuis startAt. Les clients affichent
// l'état calculé à partir de l'heure serveur renvoyée à chaque requête.
// ─────────────────────────────────────────────────────────────

export const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // sans I, L, O, 0, 1
export const COUNTDOWN_MS = 5_000;
export const MAX_PLAYERS = 10;

export interface RoomTiming {
  rounds: number;
  previewMs: number;
  roundMs: number;
  startAt: number | null;
}

export type RoomPhase =
  | { kind: 'lobby' }
  | { kind: 'countdown'; startsAt: number }
  | { kind: 'preview'; round: number; endsAt: number }
  | { kind: 'answering'; round: number; endsAt: number }
  | { kind: 'done' };

export function phaseAt(t: RoomTiming, now: number): RoomPhase {
  if (t.startAt === null) return { kind: 'lobby' };
  if (now < t.startAt) return { kind: 'countdown', startsAt: t.startAt };
  const len = t.previewMs + t.roundMs;
  const elapsed = now - t.startAt;
  const round = Math.floor(elapsed / len);
  if (round >= t.rounds) return { kind: 'done' };
  const within = elapsed - round * len;
  const base = t.startAt + round * len;
  if (within < t.previewMs) return { kind: 'preview', round, endsAt: base + t.previewMs };
  return { kind: 'answering', round, endsAt: base + len };
}

/** Code de salon à 5 caractères tiré avec le générateur fourni. */
export function makeCode(rand: () => number): string {
  let out = '';
  for (let i = 0; i < 5; i++) out += CODE_ALPHABET[Math.floor(rand() * CODE_ALPHABET.length)];
  return out;
}
