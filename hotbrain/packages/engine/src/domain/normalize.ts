// ─────────────────────────────────────────────────────────────
// normalize.ts — normalisation de saisie en 6 étapes, ORDRE EXACT
// (Ontologie §B.5 — toute déviation casse l'index exact et le fuzzy)
// ─────────────────────────────────────────────────────────────

const LEADING_ARTICLES: ReadonlySet<string> = new Set([
  'the', 'le', 'la', 'les', 'un', 'une',
]);

/**
 * normalize(input) :
 *  1. trim + lowercase + NFC
 *  2. pliage des diacritiques (NFD → suppression des marques)
 *  3. remplacement des traits d'union/apostrophes par des espaces
 *  4. suppression de la ponctuation résiduelle (et symboles)
 *  5. compaction des espaces multiples
 *  6. suppression des articles initiaux ("the","le","la","les","un","une")
 *     — seulement si un mot suit (une chaîne réduite à l'article est conservée).
 */
export function normalize(input: string): string {
  // 1. trim + lowercase + NFC
  let s = input.trim().toLowerCase().normalize('NFC');
  // 2. pliage diacritiques : NFD puis suppression des marques combinantes
  s = s.normalize('NFD').replace(/\p{M}/gu, '');
  // 3. tirets / apostrophes → espaces (variantes typographiques incluses)
  s = s.replace(/[\-‐‑‒–—―'’`´ʼ]/g, ' ');
  // 4. ponctuation et symboles résiduels → supprimés
  s = s.replace(/[\p{P}\p{S}]/gu, '');
  // 5. compaction des espaces
  s = s.replace(/\s+/g, ' ').trim();
  // 6. article initial
  const firstSpace = s.indexOf(' ');
  if (firstSpace > 0) {
    const first = s.slice(0, firstSpace);
    if (LEADING_ARTICLES.has(first)) {
      s = s.slice(firstSpace + 1);
    }
  }
  return s;
}
