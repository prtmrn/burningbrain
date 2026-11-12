// i18n/errors.ts — traduction des messages d'erreur renvoyés par l'API (FR d'origine).
import { translate, type Lang } from './index';

const BY_FR: Record<string, string> = {
  'Salon introuvable': 'multi.not.found',
  'La partie a déjà commencé': 'multi.err.started',
  'Salon complet (10 joueurs)': 'multi.err.full',
  "Seul l'hôte peut lancer la partie": 'multi.err.host',
  "Seul l'hôte peut lancer la partie.": 'multi.err.host',
  'Pas assez de questions pour ce salon': 'multi.err.pool',
  'banque trop petite pour ce nombre de questions': 'multi.err.bank',
  'aucun code libre': 'multi.err.code',
  'Thème inconnu': 'multi.err.theme',
  'Réglages invalides': 'multi.err.settings',
  'Requête invalide': 'multi.err.request',
  'Choisis un pseudo': 'multi.pick.nickname',
  "Ce thème n'est pas disponible dans cette langue": 'multi.unavailable.lang',
  "Ce salon n'est pas disponible dans cette langue": 'multi.unavailable.lang',
};

/** Message d'erreur traduit, ou null si l'erreur est vide. */
export function errorText(message: string | undefined, lang: Lang): string | null {
  if (!message) return null;
  const key = BY_FR[message];
  return key ? translate(key, lang) : message;
}
