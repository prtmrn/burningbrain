// ─────────────────────────────────────────────────────────────
// useClock.ts — horloges injectées côté navigateur (spec §A.4)
// Le domaine ne lit jamais l'horloge : ce hook est la SEULE source.
// ─────────────────────────────────────────────────────────────
import type { SessionClocks } from '../state/session-store';

export function browserClocks(): SessionClocks {
  return {
    nowMono: () => performance.now(),
    nowWall: () => Date.now(),
    nowISO: () => new Date().toISOString(),
  };
}
