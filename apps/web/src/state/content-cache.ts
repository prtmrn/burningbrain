// ─────────────────────────────────────────────────────────────
// content-cache.ts — cache offline des séries (clés hotbrain:content:*)
// `DailyContent` + feuilles en clair (F-9). Purge FIFO des entrées de plus
// de 14 jours (Ontologie §D.2) — le `ceiling` figé des BrainCompletions
// (F-15) survit à cette purge (P-5).
// ─────────────────────────────────────────────────────────────
import {
  readEnvelope,
  validateAnswerSheet,
  wrap,
  type AnswerSheet,
  type DailyContent,
  type GameMode,
  type KeyValueStore,
  type ThemeId,
} from '@hotbrain/engine';
import { CONTENT_PREFIX, keys } from './keys';
import { CURRENT, MIGRATIONS } from './migrations';
import type { EnumerableKV } from './local-storage-kv';

export const CONTENT_MAX_AGE_MS = 14 * 86_400_000; // 14 jours

export interface CachedContent {
  cachedAt: string; // ISO — horodatage de mise en cache (purge FIFO)
  daily: DailyContent;
  sheets: AnswerSheet[];
}

function validateDailyContent(x: unknown): x is DailyContent {
  if (typeof x !== 'object' || x === null) return false;
  const d = x as Record<string, unknown>;
  if (typeof d['theme'] !== 'string' || typeof d['date'] !== 'string') return false;
  if (typeof d['dayNumber'] !== 'number' || !Number.isInteger(d['dayNumber'])) return false;
  if (d['mode'] !== 'hot' && d['mode'] !== 'brain') return false;
  if (!Array.isArray(d['promptIds']) || !d['promptIds'].every((p) => typeof p === 'string')) {
    return false;
  }
  if (typeof d['contentVersion'] !== 'number' || !Number.isInteger(d['contentVersion'])) return false;
  return true;
}

export function validateCachedContent(x: unknown): x is CachedContent {
  if (typeof x !== 'object' || x === null) return false;
  const c = x as Record<string, unknown>;
  if (typeof c['cachedAt'] !== 'string') return false;
  if (Number.isNaN(Date.parse(c['cachedAt']))) return false;
  if (!validateDailyContent(c['daily'])) return false;
  if (!Array.isArray(c['sheets'])) return false;
  const promptIds = new Set((c['daily'] as DailyContent).promptIds);
  for (const raw of c['sheets']) {
    const sheet = validateAnswerSheet(raw);
    if (!sheet) return false;
    if (!promptIds.has(sheet.promptId)) return false;
  }
  return true;
}

export function saveContent(
  kv: KeyValueStore,
  content: { daily: DailyContent; sheets: AnswerSheet[] },
  nowISO: string,
): void {
  const cached: CachedContent = { cachedAt: nowISO, ...content };
  kv.setItem(
    keys.content(content.daily.theme, content.daily.mode, content.daily.date),
    JSON.stringify(wrap(cached)),
  );
}

export function loadContent(
  kv: KeyValueStore,
  theme: ThemeId,
  mode: GameMode,
  date: string,
): CachedContent | null {
  return readEnvelope(
    kv.getItem(keys.content(theme, mode, date)),
    CURRENT,
    MIGRATIONS,
    (d) => (validateCachedContent(d) ? d : null),
  );
}

/** Purge FIFO : supprime les entrées `hotbrain:content:*` plus vieilles que
 *  maxAge (défaut 14 j) ainsi que celles illisibles/corrompues. Retourne
 *  les clés supprimées. */
export function purgeContentCache(
  kv: EnumerableKV,
  nowWall: number,
  maxAge: number = CONTENT_MAX_AGE_MS,
): string[] {
  const purged: string[] = [];
  for (const key of kv.keys()) {
    if (!key.startsWith(CONTENT_PREFIX)) continue;
    const cached = readEnvelope(kv.getItem(key), CURRENT, MIGRATIONS, (d) =>
      validateCachedContent(d) ? d : null,
    );
    const age = cached === null ? Number.POSITIVE_INFINITY : nowWall - Date.parse(cached.cachedAt);
    if (age > maxAge) {
      kv.removeItem(key);
      purged.push(key);
    }
  }
  return purged;
}
