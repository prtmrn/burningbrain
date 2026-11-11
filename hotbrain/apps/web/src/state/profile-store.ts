// ─────────────────────────────────────────────────────────────
// profile-store.ts — profil joueur anonyme (clé hotbrain:player:v1)
// Créé paresseusement au premier lancement (playerId UUID local).
// ─────────────────────────────────────────────────────────────
import {
  readEnvelope,
  wrap,
  type KeyValueStore,
  type PlayerProfile,
} from '@hotbrain/engine';
import { keys } from './keys';
import { CURRENT, MIGRATIONS } from './migrations';
import { DEFAULT_PREFERENCES, validatePrefs } from './prefs-store';

export function validateProfile(x: unknown): x is PlayerProfile {
  if (typeof x !== 'object' || x === null) return false;
  const p = x as Record<string, unknown>;
  if (typeof p['playerId'] !== 'string' || p['playerId'] === '') return false;
  if (typeof p['createdAt'] !== 'string') return false;
  if (!validatePrefs(p['preferences'])) return false;
  if (!(p['characterId'] === null || typeof p['characterId'] === 'string')) return false;
  return true;
}

export interface ProfileDeps {
  uuid(): string;
  nowISO(): string;
}

/** Charge le profil ou le crée (premier lancement). */
export function loadOrCreateProfile(kv: KeyValueStore, deps: ProfileDeps): PlayerProfile {
  const existing = readEnvelope(kv.getItem(keys.player), CURRENT, MIGRATIONS, (d) =>
    validateProfile(d) ? d : null,
  );
  if (existing) return existing;
  const profile: PlayerProfile = {
    playerId: deps.uuid(),
    createdAt: deps.nowISO(),
    preferences: { ...DEFAULT_PREFERENCES },
    characterId: null,
  };
  kv.setItem(keys.player, JSON.stringify(wrap(profile)));
  return profile;
}

export function saveProfile(kv: KeyValueStore, profile: PlayerProfile): void {
  kv.setItem(keys.player, JSON.stringify(wrap(profile)));
}
