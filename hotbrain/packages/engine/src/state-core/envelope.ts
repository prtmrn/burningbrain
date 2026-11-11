// ─────────────────────────────────────────────────────────────
// envelope.ts — enveloppe de persistance { schemaVersion, data }
// (Ontologie §D.2 : migrations en chaîne, validation stricte à la lecture,
//  clés inconnues conservées — forward-compat ; état incohérent → rejet
//  propre, jamais de crash).
// Terrain vierge : aucune migration legacy n'existe ; la chaîne sert les
// évolutions FUTURES du schéma.
// ─────────────────────────────────────────────────────────────

export interface Envelope<T> {
  schemaVersion: number;
  data: T;
}

export const CURRENT_SCHEMA_VERSION = 1;

export function wrap<T>(data: T, schemaVersion: number = CURRENT_SCHEMA_VERSION): Envelope<T> {
  return { schemaVersion, data };
}

/** Registre de migrations : migrations[v] transforme data de v → v+1. */
export type MigrationRegistry = Record<number, (data: unknown) => unknown>;

/**
 * Lit une enveloppe JSON :
 *  · parse invalide / forme non conforme / version > courante → null ;
 *  · version < courante → chaîne de migrations appliquée (une migration
 *    absente ou en échec → null) ;
 *  · `validate` est le juge final (rejet propre → null).
 * Les clés inconnues sont CONSERVÉES (la validation ne doit pas stripper).
 */
export function readEnvelope<T>(
  raw: string | null,
  current: number,
  migrations: MigrationRegistry,
  validate: (data: unknown) => T | null,
): T | null {
  if (raw === null) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof parsed !== 'object' || parsed === null) return null;
  const env = parsed as { schemaVersion?: unknown; data?: unknown };
  if (typeof env.schemaVersion !== 'number' || !Number.isInteger(env.schemaVersion)) return null;
  if (env.schemaVersion < 0 || env.schemaVersion > current) return null;
  let data: unknown = env.data;
  for (let v = env.schemaVersion; v < current; v++) {
    const migrate = migrations[v];
    if (!migrate) return null;
    try {
      data = migrate(data);
    } catch {
      return null;
    }
  }
  return validate(data);
}
