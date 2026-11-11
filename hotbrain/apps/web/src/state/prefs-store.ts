// ─────────────────────────────────────────────────────────────
// prefs-store.ts — préférences seules (clé hotbrain:prefs:v1)
// Lues AVANT hydratation (pas de flash de thème/daltonien — §A.7) :
// cette clé doit rester petite, stable et validée sans dépendance lourde.
// ─────────────────────────────────────────────────────────────
import {
  readEnvelope,
  wrap,
  type KeyValueStore,
  type PlayerPreferences,
  type ThemeId,
} from '@hotbrain/engine';
import { keys } from './keys';
import { CURRENT, MIGRATIONS } from './migrations';

export const DEFAULT_PREFERENCES: PlayerPreferences = {
  muted: false,
  colorblind: false,
  lowPower: false,
  answerCorrections: true,
  clearRejectedEntry: false,
};

function isBool(x: unknown): x is boolean {
  return typeof x === 'boolean';
}

export function validatePrefs(x: unknown): x is PlayerPreferences {
  if (typeof x !== 'object' || x === null) return false;
  const p = x as Record<string, unknown>;
  if (!isBool(p['muted']) || !isBool(p['colorblind']) || !isBool(p['lowPower'])) return false;
  if (!isBool(p['answerCorrections']) || !isBool(p['clearRejectedEntry'])) return false;
  if (p['lastTheme'] !== undefined && typeof p['lastTheme'] !== 'string') return false;
  return true;
}

export function loadPrefs(kv: KeyValueStore): PlayerPreferences {
  const prefs = readEnvelope(kv.getItem(keys.prefs), CURRENT, MIGRATIONS, (d) =>
    validatePrefs(d) ? d : null,
  );
  return prefs ?? { ...DEFAULT_PREFERENCES };
}

export function savePrefs(kv: KeyValueStore, prefs: PlayerPreferences): void {
  kv.setItem(keys.prefs, JSON.stringify(wrap(prefs)));
}

export function updatePrefs(
  kv: KeyValueStore,
  patch: Partial<PlayerPreferences>,
): PlayerPreferences {
  const next = { ...loadPrefs(kv), ...patch };
  savePrefs(kv, next);
  return next;
}

export function rememberTheme(kv: KeyValueStore, theme: ThemeId): PlayerPreferences {
  return updatePrefs(kv, { lastTheme: theme });
}
