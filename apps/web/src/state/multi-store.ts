// ─────────────────────────────────────────────────────────────
// state/multi-store.ts — identité du joueur dans un salon (pseudo et id),
// par navigateur : simple confort, le serveur reste la référence.
// ─────────────────────────────────────────────────────────────
export interface MultiMe {
  playerId: string;
  name: string;
}

const key = (code: string): string => `boilingbrain:multi:v1:${code.toUpperCase()}`;

export function loadMulti(code: string): MultiMe | null {
  try {
    const raw = window.localStorage.getItem(key(code));
    if (!raw) return null;
    const j = JSON.parse(raw) as MultiMe;
    return typeof j.playerId === 'string' && typeof j.name === 'string' ? j : null;
  } catch {
    return null;
  }
}

export function saveMulti(code: string, me: MultiMe): void {
  try {
    window.localStorage.setItem(key(code), JSON.stringify(me));
  } catch {
    /* stockage indisponible : le joueur devra rejoindre à nouveau */
  }
}
