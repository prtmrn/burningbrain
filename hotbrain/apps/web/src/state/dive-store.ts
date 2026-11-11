// ─────────────────────────────────────────────────────────────
// dive-store.ts — persistance du DiveState en cours (clé hotbrain:dive:v1)
// Couple mono/wall confiné à engine/state-core/dive-codec ; validation
// stricte à la lecture : toute donnée incohérente → rejet propre (null),
// JAMAIS de crash (P-2).
// ─────────────────────────────────────────────────────────────
import {
  fromPersisted,
  readEnvelope,
  toPersisted,
  validatePersistedDive,
  wrap,
  type DiveState,
  type KeyValueStore,
} from '@hotbrain/engine';
import { keys } from './keys';
import { CURRENT, MIGRATIONS } from './migrations';

export function saveDive(
  kv: KeyValueStore,
  s: DiveState,
  nowMono: number,
  nowWall: number,
): void {
  kv.setItem(keys.dive, JSON.stringify(wrap(toPersisted(s, nowMono, nowWall))));
}

/** Reconstruction après rechargement. Les deadlines wall sont reconverties
 *  en mono ; une deadline dépassée ressort négative et le reducer forcera
 *  la transition (miss hot / timeout brain) — pas de temps regagné (T-13). */
export function loadDive(
  kv: KeyValueStore,
  nowMono: number,
  nowWall: number,
): DiveState | null {
  const persisted = readEnvelope(kv.getItem(keys.dive), CURRENT, MIGRATIONS, (d) =>
    validatePersistedDive(d) ? d : null,
  );
  if (persisted === null) return null;
  return fromPersisted(persisted, nowMono, nowWall);
}

export function clearDive(kv: KeyValueStore): void {
  kv.removeItem(keys.dive);
}
