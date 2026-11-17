// judge.ts — le « VAR » : consigne du juge IA et lecture de son verdict.
// Pur (sans réseau) pour être testable ; la route /api/var fait l'appel.
import type { TierId } from '@hotbrain/engine';

export interface VarVerdict {
  valid: boolean;
  /** Palier de rareté estimé (t1 très courant … t5 très rare). */
  tier: TierId;
  /** Forme canonique à afficher (accents, majuscules corrigés). */
  answer: string;
  reason: string;
}

export const VAR_MAX_INPUT = 80;

export function buildJudgePrompt(question: string, answer: string): string {
  return [
    'Tu es l\'arbitre vidéo (VAR) d\'un quiz de culture générale où le joueur doit nommer UNE réponse à une question ouverte.',
    'Un joueur conteste le refus de sa réponse. Décide si elle répond VRAIMENT à la question.',
    'Sois indulgent sur la forme (fautes de frappe légères, accents, majuscules, nom incomplet mais sans ambiguïté, traduction courante).',
    'Sois strict sur le fond : si la réponse est fausse, hors sujet, inventée ou douteuse, valid = false.',
    'Si valid = true, estime la rareté : t1 = réponse que presque tout le monde donne, t2 = courante, t3 = moyenne, t4 = peu connue, t5 = très rare ou pointue. N\'utilise jamais t6.',
    '"answer" = forme canonique propre de la réponse (orthographe et majuscules correctes), 60 caractères max.',
    '"reason" = une phrase courte en français (110 caractères max).',
    'Réponds UNIQUEMENT par un objet JSON : {"valid": boolean, "tier": "t1"|"t2"|"t3"|"t4"|"t5", "answer": string, "reason": string}.',
    '',
    `Question : ${question}`,
    `Réponse du joueur : ${answer}`,
  ].join('\n');
}

const TIERS = new Set(['t1', 't2', 't3', 't4', 't5']);

/** Lit la sortie brute du modèle ; renvoie null si elle est inutilisable. */
export function parseVerdict(raw: string, fallbackAnswer: string): VarVerdict | null {
  let j: unknown;
  try {
    const m = raw.match(/\{[\s\S]*\}/);
    j = JSON.parse(m ? m[0] : raw);
  } catch {
    return null;
  }
  if (typeof j !== 'object' || j === null) return null;
  const o = j as Record<string, unknown>;
  if (typeof o.valid !== 'boolean') return null;
  const tier = typeof o.tier === 'string' && TIERS.has(o.tier) ? (o.tier as TierId) : 't3';
  const answer = typeof o.answer === 'string' && o.answer.trim() ? o.answer.trim().slice(0, 60) : fallbackAnswer;
  const reason = typeof o.reason === 'string' ? o.reason.trim().slice(0, 140) : '';
  return { valid: o.valid, tier, answer, reason };
}
