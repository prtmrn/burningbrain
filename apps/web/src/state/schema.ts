// ─────────────────────────────────────────────────────────────
// schema.ts — clé hotbrain:schema:v1 (version de schéma persistée)
// ─────────────────────────────────────────────────────────────
import { readEnvelope, wrap, type KeyValueStore } from '@hotbrain/engine';
import { keys } from './keys';
import { CURRENT, MIGRATIONS } from './migrations';

export function readSchemaVersion(kv: KeyValueStore): number | null {
  return readEnvelope(kv.getItem(keys.schema), CURRENT, MIGRATIONS, (d) => {
    if (typeof d !== 'object' || d === null) return null;
    const v = (d as Record<string, unknown>)['version'];
    return typeof v === 'number' && Number.isInteger(v) ? v : null;
  });
}

/** Écrit la version de schéma courante si absente (premier lancement). */
export function ensureSchema(kv: KeyValueStore): number {
  const existing = readSchemaVersion(kv);
  if (existing === null) {
    kv.setItem(keys.schema, JSON.stringify(wrap({ version: CURRENT })));
    return CURRENT;
  }
  return existing;
}
