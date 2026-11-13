// ─────────────────────────────────────────────────────────────
// schemas.ts — validateurs runtime du contenu (spec v2 §B.2)
// Une seule source de vérité : les mêmes règles tournent en CI
// (validateur de banque) et à l'exécution (chargement).
// ─────────────────────────────────────────────────────────────
import { TIER_IDS } from '../domain/constants';
import { normalize } from '../domain/normalize';
import type {
  AnswerSheet,
  AnswerSheetEntry,
  Difficulty,
  GameMode,
  Prompt,
  ReferenceDistribution,
  ThemeId,
  TierId,
} from '../domain/types';

export function isTierId(x: unknown): x is TierId {
  return typeof x === 'string' && (TIER_IDS as readonly string[]).includes(x);
}

function isNonEmptyString(x: unknown): x is string {
  return typeof x === 'string' && x.length > 0;
}

export function isDifficulty(x: unknown): x is Difficulty {
  return x === 'easy' || x === 'medium' || x === 'hard';
}

export function validatePrompt(x: unknown): Prompt | null {
  if (typeof x !== 'object' || x === null) return null;
  const p = x as Record<string, unknown>;
  if (!isNonEmptyString(p['id']) || !isNonEmptyString(p['theme']) || !isNonEmptyString(p['text'])) {
    return null;
  }
  if (p['difficulty'] !== undefined && !isDifficulty(p['difficulty'])) return null;
  return {
    id: p['id'],
    theme: p['theme'] as ThemeId,
    text: p['text'],
    ...(p['difficulty'] !== undefined ? { difficulty: p['difficulty'] as Difficulty } : {}),
  };
}

export function validateAnswerSheetEntry(x: unknown): AnswerSheetEntry | null {
  if (typeof x !== 'object' || x === null) return null;
  const e = x as Record<string, unknown>;
  if (!isNonEmptyString(e['answer']) || !isTierId(e['tier']) || !Array.isArray(e['aliases'])) {
    return null;
  }
  if (!e['aliases'].every((a) => typeof a === 'string')) return null;
  if (e['quip'] !== undefined && typeof e['quip'] !== 'string') return null;
  return {
    answer: e['answer'],
    tier: e['tier'],
    aliases: e['aliases'] as string[],
    ...(e['quip'] !== undefined ? { quip: e['quip'] as string } : {}),
  };
}

export function validateAnswerSheet(x: unknown, promptId?: string): AnswerSheet | null {
  if (typeof x !== 'object' || x === null) return null;
  const s = x as Record<string, unknown>;
  if (!Array.isArray(s['entries']) || s['entries'].length === 0) return null;
  if (typeof s['contentVersion'] !== 'number' || !Number.isInteger(s['contentVersion'])) return null;
  const entries: AnswerSheetEntry[] = [];
  for (const raw of s['entries']) {
    const e = validateAnswerSheetEntry(raw);
    if (!e) return null;
    entries.push(e);
  }
  return {
    promptId: promptId ?? (typeof s['promptId'] === 'string' ? s['promptId'] : ''),
    entries,
    contentVersion: s['contentVersion'],
  };
}

/** Forme JSON brute d'une banque thématique (fichier content/<theme>.v1.json). */
export interface RawPromptBank {
  theme: ThemeId;
  contentVersion: number;
  prompts: Prompt[];
  sheets: Record<string, AnswerSheet>;
}

export function validatePromptBank(raw: unknown): RawPromptBank | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const b = raw as Record<string, unknown>;
  if (!isNonEmptyString(b['theme'])) return null;
  if (typeof b['contentVersion'] !== 'number' || !Number.isInteger(b['contentVersion'])) return null;
  if (!Array.isArray(b['prompts']) || b['prompts'].length === 0) return null;
  if (typeof b['sheets'] !== 'object' || b['sheets'] === null) return null;

  const prompts: Prompt[] = [];
  for (const rawPrompt of b['prompts']) {
    const p = validatePrompt(rawPrompt);
    if (!p) return null;
    if (p.theme !== b['theme']) return null; // exactement un thème par banque
    prompts.push(p);
  }
  const sheets: Record<string, AnswerSheet> = {};
  for (const [promptId, rawSheet] of Object.entries(b['sheets'] as Record<string, unknown>)) {
    const s = validateAnswerSheet(rawSheet, promptId);
    if (!s) return null;
    sheets[promptId] = s;
  }
  return { theme: b['theme'], contentVersion: b['contentVersion'], prompts, sheets };
}

export function validateReferenceDistribution(x: unknown): ReferenceDistribution | null {
  if (typeof x !== 'object' || x === null) return null;
  const d = x as Record<string, unknown>;
  if (d['mode'] !== 'hot' && d['mode'] !== 'brain') return null;
  if (typeof d['distVersion'] !== 'number' || !Number.isInteger(d['distVersion'])) return null;
  if (typeof d['maxScore'] !== 'number' || !Number.isInteger(d['maxScore']) || d['maxScore'] < 0) {
    return null;
  }
  if (!Array.isArray(d['buckets']) || d['buckets'].length !== (d['maxScore'] as number) + 1) {
    return null;
  }
  let total = 0;
  for (const b of d['buckets']) {
    if (typeof b !== 'number' || b < 0) return null;
    total += b;
  }
  if (total <= 0) return null;
  return {
    mode: d['mode'] as GameMode,
    distVersion: d['distVersion'],
    maxScore: d['maxScore'],
    buckets: d['buckets'] as number[],
  };
}

// ── Contrôles inter-banques (D-10) et qualité intra-feuille ──

export interface BankCheckResult {
  ok: boolean;
  errors: string[];    // bloquants (CI refuse)
  warnings: string[];  // non bloquants (revue humaine)
}

/**
 * Règles bloquantes :
 *  · unicité des promptId (partage Général/thème autorisé, D-42) ;
 *  · promptId partagé entre 'general' et un thème ⇒ feuille identique (D-42) ;
 *  · unicité des clés normalisées intra-feuille (answer + aliases) —
 *    sinon l'index exact serait ambigu ;
 *  · ≤ 2 000 clés normalisées par prompt (F-8) ; ≥ 1 entrée par feuille ;
 *    tier ∈ t1..t6 (déjà garanti par validatePromptBank) ;
 *  · chaque prompt a sa feuille et réciproquement.
 * Avertissements :
 *  · feuille < 10 entrées (matière brain insuffisante — le flow exige des
 *    amorces larges) ;
 *  · pas d'entrée t6 (fun factor) ou t2 (piège) identifiable ;
 *  · collision fuzzy intra-feuille entre entrées distinctes (ex æquo
 *    structurel potentiel — à revue humaine).
 */
export function validateBanks(banks: RawPromptBank[]): BankCheckResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Unicité des promptId. D-42 : le Général est l'union des questions des
  // thèmes et de ses questions propres ; un promptId partagé avec un thème
  // doit alors avoir une feuille strictement identique.
  const seen = new Map<string, { theme: ThemeId; sheet: string }>();
  for (const bank of banks) {
    for (const p of bank.prompts) {
      const sheetKey = JSON.stringify(bank.sheets[p.id]?.entries ?? null);
      const prev = seen.get(p.id);
      if (prev === undefined) {
        seen.set(p.id, { theme: bank.theme, sheet: sheetKey });
        continue;
      }
      const shared = prev.theme === 'general' || bank.theme === 'general';
      if (!shared) {
        errors.push(`promptId "${p.id}" présent dans "${prev.theme}" et "${bank.theme}"`);
      } else if (prev.sheet !== sheetKey) {
        errors.push(`promptId "${p.id}" : feuilles différentes entre "general" et un thème`);
      }
    }
  }

  // Feuilles
  for (const bank of banks) {
    const promptIds = new Set(bank.prompts.map((p) => p.id));
    for (const p of bank.prompts) {
      if (!bank.sheets[p.id]) errors.push(`feuille manquante pour "${p.id}"`);
    }
    for (const sheetId of Object.keys(bank.sheets)) {
      if (!promptIds.has(sheetId)) errors.push(`feuille orpheline "${sheetId}" (aucun prompt)`);
    }
    for (const [promptId, sheet] of Object.entries(bank.sheets)) {
      // Unicité des clés normalisées intra-feuille
      const keyOwner = new Map<string, string>();
      let keyCount = 0;
      for (const entry of sheet.entries) {
        for (const raw of [entry.answer, ...entry.aliases]) {
          const key = normalize(raw);
          if (key === '') continue;
          keyCount++;
          const prev = keyOwner.get(key);
          if (prev !== undefined && prev !== entry.answer) {
            errors.push(
              `clé normalisée "${key}" partagée par "${prev}" et "${entry.answer}" (${promptId})`,
            );
          } else {
            keyOwner.set(key, entry.answer);
          }
        }
      }
      if (keyCount > 2000) {
        errors.push(`F-8 : ${keyCount} clés > 2 000 pour "${promptId}"`);
      }
      if (sheet.entries.length < 10) {
        warnings.push(`feuille "${promptId}" : ${sheet.entries.length} entrées < 10 (flow brain)`);
      }
      if (!sheet.entries.some((e) => e.tier === 't6')) {
        warnings.push(`feuille "${promptId}" : aucune entrée t6 (fun factor)`);
      }
      if (!sheet.entries.some((e) => e.tier === 't2')) {
        warnings.push(`feuille "${promptId}" : aucune entrée t2 (piège)`);
      }
    }
  }

  return { ok: errors.length === 0, errors, warnings };
}
