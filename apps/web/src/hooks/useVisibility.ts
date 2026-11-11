// ─────────────────────────────────────────────────────────────
// useVisibility.ts — visibilitychange → PAUSE/RESUME (F-07)
// Onglet caché : gel total ; retour : décalage inconditionnel des deadlines.
// ─────────────────────────────────────────────────────────────
import { useEffect } from 'react';

export function useVisibility(handlers: {
  onHidden(nowMono: number): void;
  onVisible(nowMono: number): void;
  nowMono(): number;
}): void {
  useEffect(() => {
    const listener = (): void => {
      if (document.visibilityState === 'hidden') handlers.onHidden(handlers.nowMono());
      else handlers.onVisible(handlers.nowMono());
    };
    document.addEventListener('visibilitychange', listener);
    return () => document.removeEventListener('visibilitychange', listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
