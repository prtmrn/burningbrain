// Pourcentage des points possibles (mode Brain en durée illimitée), au dixième.
export function percentOf(points: number, ceiling: number): number {
  return ceiling > 0 ? (100 * points) / ceiling : 0;
}

export function formatPercent(value: number, lang: string): string {
  const locale = lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : 'en-US';
  return value.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
