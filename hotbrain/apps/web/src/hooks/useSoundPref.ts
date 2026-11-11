// useSoundPref.ts — son coupé ou non, persisté dans les préférences.
import { useState } from 'react';
import { createLocalStorageKV } from '../state/local-storage-kv';
import { loadPrefs, savePrefs } from '../state/prefs-store';

export function useSoundPref(initialMuted: boolean): [boolean, () => void] {
  const [soundOff, setSoundOff] = useState(initialMuted);
  const toggle = (): void => {
    const next = !soundOff;
    setSoundOff(next);
    try {
      const kv = createLocalStorageKV(window.localStorage);
      savePrefs(kv, { ...loadPrefs(kv), muted: next });
    } catch {
      /* stockage indisponible : le réglage vaut pour cette session */
    }
  };
  return [soundOff, toggle];
}
