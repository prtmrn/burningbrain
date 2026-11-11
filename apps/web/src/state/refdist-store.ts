// ─────────────────────────────────────────────────────────────
// refdist-store.ts — distribution de référence par mode
// (clé hotbrain:refdist:<mode>:v1 — Ontologie §D.1, mecaniques §A.6)
// Source statique EMBARQUÉE injectée par l'app ; copie lissée locale ;
// rebase quand la distVersion embarquée monte (P-4).
// Note de schéma : le type engine LocalReferenceDistribution ne conserve
// pas les observations locales brutes ; on étend la donnée persistée avec
// `localBuckets` (champ applicatif, forward-compat) pour permettre un
// reblend exact après rebase.
// ─────────────────────────────────────────────────────────────
import {
  blend,
  readEnvelope,
  shouldRebase,
  validateReferenceDistribution,
  wrap,
  type GameMode,
  type KeyValueStore,
  type LocalReferenceDistribution,
  type ReferenceDistribution,
} from '@hotbrain/engine';
import { keys } from './keys';
import { CURRENT, MIGRATIONS } from './migrations';

export interface StoredRefDist extends LocalReferenceDistribution {
  localBuckets: number[]; // observations locales brutes (extension applicative)
}

function validateStored(expectedSize: number) {
  return (x: unknown): StoredRefDist | null => {
    if (typeof x !== 'object' || x === null) return null;
    const d = x as Record<string, unknown>;
    if (!validateReferenceDistribution(d['base'])) return null;
    if ((d['base'] as ReferenceDistribution).maxScore + 1 !== expectedSize) return null;
    const isBuckets = (v: unknown): v is number[] =>
      Array.isArray(v) &&
      v.length === expectedSize &&
      v.every((n) => typeof n === 'number' && Number.isFinite(n) && n >= 0);
    if (!isBuckets(d['blended']) || !isBuckets(d['localBuckets'])) return null;
    if (typeof d['localCompletions'] !== 'number' || !Number.isInteger(d['localCompletions'])) return null;
    if ((d['localCompletions'] as number) < 0) return null;
    if (typeof d['blendedAt'] !== 'string') return null;
    return x as StoredRefDist;
  };
}

function zeros(size: number): number[] {
  return new Array<number>(size).fill(0);
}

/** Charge la copie lissée ; rebase si l'embarquée est plus récente
 *  (blended jeté, recalcul depuis la nouvelle base — n conservé, P-4). */
export function loadRefDist(
  kv: KeyValueStore,
  mode: GameMode,
  embedded: ReferenceDistribution,
  nowISO: string,
): StoredRefDist {
  const size = embedded.maxScore + 1;
  const stored = readEnvelope(
    kv.getItem(keys.refdist(mode)),
    CURRENT,
    MIGRATIONS,
    validateStored(size),
  );
  if (stored && !shouldRebase(stored, embedded)) return stored;
  const localBuckets = stored?.localBuckets ?? zeros(size);
  const n = stored?.localCompletions ?? 0;
  const fresh: StoredRefDist = {
    base: embedded,
    blended: blend(embedded.buckets, localBuckets, n),
    localCompletions: n,
    blendedAt: nowISO,
    localBuckets,
  };
  kv.setItem(keys.refdist(mode), JSON.stringify(wrap(fresh)));
  return fresh;
}

/** Enregistre une observation locale (bucket de score ou de ratio) et
 *  reblend. Retourne la copie à jour. */
export function recordRefDistCompletion(
  kv: KeyValueStore,
  mode: GameMode,
  embedded: ReferenceDistribution,
  bucket: number,
  nowISO: string,
): StoredRefDist {
  const cur = loadRefDist(kv, mode, embedded, nowISO);
  const size = embedded.maxScore + 1;
  const localBuckets = [...cur.localBuckets];
  const i = Math.max(0, Math.min(Math.floor(bucket), size - 1));
  localBuckets[i] = (localBuckets[i] as number) + 1;
  const n = cur.localCompletions + 1;
  const next: StoredRefDist = {
    base: cur.base,
    blended: blend(cur.base.buckets, localBuckets, n),
    localCompletions: n,
    blendedAt: nowISO,
    localBuckets,
  };
  kv.setItem(keys.refdist(mode), JSON.stringify(wrap(next)));
  return next;
}
