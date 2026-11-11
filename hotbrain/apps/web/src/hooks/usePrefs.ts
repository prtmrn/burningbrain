// ─────────────────────────────────────────────────────────────
// usePrefs.ts — préférences (daltonien/basse-énergie) appliquées à <html>
// Le script inline du layout pose les classes AVANT hydratation ; ce hook
// les maintient synchronisées après (pas de flash, pas de divergence).
// ─────────────────────────────────────────────────────────────
import { useCallback, useEffect, useState } from 'react';
import type { PlayerPreferences } from '@hotbrain/engine';
import type { EnumerableKV } from '../state/local-storage-kv';
import { loadPrefs, savePrefs } from '../state/prefs-store';

function applyPrefsClasses(prefs: PlayerPreferences): void {
  const el = document.documentElement;
  el.classList.toggle('colorblind', prefs.colorblind);
  el.classList.toggle('low-power', prefs.lowPower);
}

export function usePrefs(kv: EnumerableKV): {
  prefs: PlayerPreferences;
  update(patch: Partial<PlayerPreferences>): void;
} {
  const [prefs, setPrefs] = useState<PlayerPreferences>(() => loadPrefs(kv));

  useEffect(() => {
    applyPrefsClasses(prefs);
  }, [prefs]);

  const update = useCallback(
    (patch: Partial<PlayerPreferences>) => {
      setPrefs((current) => {
        const next = { ...current, ...patch };
        savePrefs(kv, next);
        return next;
      });
    },
    [kv],
  );

  return { prefs, update };
}
