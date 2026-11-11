// ─────────────────────────────────────────────────────────────
// migrations.ts — registre de migrations d'enveloppe (Ontologie §D.2)
// Terrain vierge : la chaîne sert les évolutions FUTURES. L'entrée 0→1 est
// l'identité de câblage (point d'extension documenté, testée par P-3).
// ─────────────────────────────────────────────────────────────
import { CURRENT_SCHEMA_VERSION, type MigrationRegistry } from '@hotbrain/engine';

export const CURRENT = CURRENT_SCHEMA_VERSION; // 1

export const MIGRATIONS: MigrationRegistry = {
  0: (data: unknown) => data,
};
