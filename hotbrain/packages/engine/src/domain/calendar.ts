// ─────────────────────────────────────────────────────────────
// calendar.ts — calendrier civil paramétré par GameConfig (mecaniques §A.3)
// RÈGLE CRITIQUE : calcul CALENDAIRE, jamais horaire. Les journées locales
// n'ont pas une durée constante (23 h / 25 h aux transitions DST) — ne jamais
// diviser des ms par 86 400 000 pour obtenir des jours.
// Fuseau/epoch injectés via GameConfig (D-13). Résolution des offsets via
// Intl (tz database du navigateur/runtime) — JAMAIS de table DST en dur.
// ─────────────────────────────────────────────────────────────
import type { GameConfig } from './types';

// ── Parse / format de dates civiles "YYYY-MM-DD" ──

export function parseCivilDate(dateStr: string): { y: number; m: number; d: number } {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) throw new Error(`Invalid civil date: ${dateStr}`);
  return { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) };
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function formatCivilDate(y: number, m: number, d: number): string {
  return `${y}-${pad2(m)}-${pad2(d)}`;
}

/** Ajoute n jours CIVILS à une date "YYYY-MM-DD" (arithmétique à midi UTC —
 *  midi évite tout bord DST). */
export function addCivilDays(dateStr: string, n: number): string {
  const { y, m, d } = parseCivilDate(dateStr);
  const ms = Date.UTC(y, m - 1, d, 12) + n * 86_400_000;
  const dt = new Date(ms);
  return formatCivilDate(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

/** Différence en jours civils entre deux dates "YYYY-MM-DD" (b − a),
 *  calculée à midi UTC — jamais sur des instants locaux. */
export function diffCalendaire(a: string, b: string): number {
  const pa = parseCivilDate(a);
  const pb = parseCivilDate(b);
  const msA = Date.UTC(pa.y, pa.m - 1, pa.d, 12);
  const msB = Date.UTC(pb.y, pb.m - 1, pb.d, 12);
  return Math.round((msB - msA) / 86_400_000);
}

// ── Intl : date civile locale d'un instant, dans un fuseau ──

const dtfCache = new Map<string, Intl.DateTimeFormat>();

function dateTimeFormat(tz: string): Intl.DateTimeFormat {
  let fmt = dtfCache.get(tz);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    });
    dtfCache.set(tz, fmt);
  }
  return fmt;
}

interface LocalParts {
  y: number; m: number; d: number; hh: number; mm: number; ss: number;
}

function localParts(utcMs: number, tz: string): LocalParts {
  const parts = dateTimeFormat(tz).formatToParts(new Date(utcMs));
  const get = (type: string): number => {
    const p = parts.find((x) => x.type === type);
    return p ? Number(p.value) : 0;
  };
  return { y: get('year'), m: get('month'), d: get('day'), hh: get('hour'), mm: get('minute'), ss: get('second') };
}

/** Date civile locale ("YYYY-MM-DD") d'un instant, dans le fuseau donné. */
export function dateLoc(utcMs: number, tz: string): string {
  const p = localParts(utcMs, tz);
  return formatCivilDate(p.y, p.m, p.d);
}

// ── Offset fuseau & minuit local ──

/** Offset (local − UTC) en ms à un instant UTC donné, résolu via Intl. */
export function tzOffsetMs(utcMs: number, tz: string): number {
  const p = localParts(utcMs, tz);
  const asUtc = Date.UTC(p.y, p.m - 1, p.d, p.hh, p.mm, p.ss);
  return asUtc - Math.floor(utcMs / 1000) * 1000;
}

/** Instant UTC du minuit LOCAL commençant la date civile `dateStr` dans `tz`.
 *  Double passe d'offset : correct car minuit n'est jamais dans l'heure
 *  inexistante ni dupliquée (transitions à 02:00 local). */
export function localMidnightUtcMs(dateStr: string, tz: string): number {
  const { y, m, d } = parseCivilDate(dateStr);
  const guess = Date.UTC(y, m - 1, d);
  let utc = guess - tzOffsetMs(guess, tz);
  utc = guess - tzOffsetMs(utc, tz);
  return utc;
}

// ── API publique du domaine (mecaniques §A.3) ──

/** dayNumber(now) = diffCalendaire(epochDate, dateLoc(now)) + 1.
 *  Le jour de l'epoch vaut 1. Peut être ≤ 0 avant l'epoch (à gérer par l'app). */
export function dayNumber(now: number, config: GameConfig): number {
  return diffCalendaire(config.epochDate, dateLoc(now, config.timezone)) + 1;
}

/** Instant (epoch ms UTC) du prochain minuit local STRICTEMENT > now. */
export function nextResetMs(now: number, config: GameConfig): number {
  const tz = config.timezone;
  const today = dateLoc(now, tz);
  let candidate = localMidnightUtcMs(today, tz);
  if (candidate <= now) {
    candidate = localMidnightUtcMs(addCivilDays(today, 1), tz);
  }
  return candidate;
}
