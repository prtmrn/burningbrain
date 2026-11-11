// ─────────────────────────────────────────────────────────────
// themes.ts — thèmes de jeu (D-07, D-18). Identité de thème = icône + accent
// du CHROME uniquement (R5) : jamais sur le thermomètre ni les paliers.
// ─────────────────────────────────────────────────────────────
export interface ThemeInfo {
  id: string;
  label: string;
  icon: string;
  accent: string;
  blurb: string;
}

export const THEMES: ThemeInfo[] = [
  { id: 'general', label: 'Général', icon: '🌡️', accent: '#38bdf8', blurb: 'Culture générale, tous domaines' },
  { id: 'geography', label: 'Géographie', icon: '🌍', accent: '#34d399', blurb: 'Pays, villes, reliefs, monuments' },
  { id: 'entertainment', label: 'Divertissement', icon: '🎭', accent: '#f472b6', blurb: 'Cinéma, musique, séries, spectacle' },
  { id: 'history', label: 'Histoire', icon: '🏛️', accent: '#fbbf24', blurb: 'Événements, figures, dynasties' },
  { id: 'arts-literature', label: 'Arts & Littérature', icon: '📚', accent: '#a78bfa', blurb: 'Livres, auteurs, peinture, architecture' },
  { id: 'science-nature', label: 'Sciences & Nature', icon: '🔬', accent: '#4ade80', blurb: 'Vivant, physique, chimie, espace' },
  { id: 'sports-leisure', label: 'Sports & Loisirs', icon: '⚽', accent: '#fb923c', blurb: 'Disciplines, champions, compétitions' },
];

export function themeById(id: string): ThemeInfo | undefined {
  return THEMES.find((t) => t.id === id);
}
