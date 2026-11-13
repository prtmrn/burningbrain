// ─────────────────────────────────────────────────────────────
// engine — point d'entrée public du package (voir package.json pour le nom)
// Moteur de domaine thème-agnostique : tout est injecté (config, contenu,
// horloge, persistance). Aucune dépendance runtime.
// ─────────────────────────────────────────────────────────────

// Types (schéma Ontologie v3.1)
export type * from './domain/types';

// Domaine
export * from './domain/constants';
export * from './domain/rng';
export * from './domain/calendar';
export * from './domain/normalize';
export * from './domain/validate';
export * from './domain/scoring';
export * from './domain/percentile';
export * from './domain/streak';
export * from './domain/selection';
export * from './domain/difficulty';
export * from './domain/recompute';
export * from './domain/reducer';

// Données (validateurs + assemblage de banque)
export * from './data/schemas';
export * from './data/bank';

// State-core (persistance agnostique — KV injecté)
export * from './state-core/kv';
export * from './state-core/envelope';
export * from './state-core/dive-codec';
