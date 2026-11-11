// ─────────────────────────────────────────────────────────────
// local-storage-kv.ts — adaptateur KeyValueStore → localStorage
// (spec v2 §A.3 règle 3 : le KV est une interface injectée ; l'app web
//  fournit localStorage, les tests une Map énumérable).
// ─────────────────────────────────────────────────────────────
import type { KeyValueStore } from '@hotbrain/engine';

/** KV énumérable — requis pour la purge du cache contenu (clés dynamiques). */
export interface EnumerableKV extends KeyValueStore {
  keys(): string[];
}

export function createLocalStorageKV(storage: Storage): EnumerableKV {
  return {
    getItem: (k) => storage.getItem(k),
    setItem: (k, v) => storage.setItem(k, v),
    removeItem: (k) => storage.removeItem(k),
    keys: () => {
      const out: string[] = [];
      for (let i = 0; i < storage.length; i++) {
        const k = storage.key(i);
        if (k !== null) out.push(k);
      }
      return out;
    },
  };
}
