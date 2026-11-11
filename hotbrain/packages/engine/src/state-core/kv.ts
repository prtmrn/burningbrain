// ─────────────────────────────────────────────────────────────
// kv.ts — interface de stockage clé/valeur injectée (spec v2 §A.3)
// L'engine ne connaît PAS localStorage : l'app fournit l'adaptateur
// (localStorage en production, mémoire en tests, fichier en CI).
// ─────────────────────────────────────────────────────────────

export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/** Implémentation mémoire — référence pour les tests et la documentation. */
export function createMemoryKV(initial?: Record<string, string>): KeyValueStore {
  const map = new Map<string, string>(Object.entries(initial ?? {}));
  return {
    getItem: (k) => (map.has(k) ? (map.get(k) as string) : null),
    setItem: (k, v) => void map.set(k, v),
    removeItem: (k) => void map.delete(k),
  };
}
