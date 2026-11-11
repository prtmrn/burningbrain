// ─────────────────────────────────────────────────────────────
// content.ts — contenu UI HotBrain (labels, jalons, verdicts, partage)
// CONTENU APPLICATIF — jamais dans l'engine (D-08, spec §A.3 règle 2).
// ─────────────────────────────────────────────────────────────
import type { Completion, TierId } from '@hotbrain/engine';
import tierLabelsJson from '../content/tiers.labels.fr.json';
import milestonesJson from '../content/milestones.v1.json';
import verdictsJson from '../content/verdicts.fr.json';

// ── Paliers (labels D-14 — jamais persistés) ──

export const TIER_LABELS = tierLabelsJson as Record<TierId, string>;

/** Icône de palier — règle dure : le palier n'est JAMAIS codé par la
 *  couleur seule (icône + label, accessibilité). */
export const TIER_ICONS: Record<TierId, string> = {
  t1: '💧', // Tiède
  t2: '🍲', // Réchauffé (piège — « ça sent le réchauffé »)
  t3: '🌶️', // Chaud
  t4: '🔥', // Brûlant
  t5: '✨', // Incandescent
  t6: '💥', // Fusion
};

// ── Jalons thermiques (game-loop §C.2, D-09 provisoire) ──

export interface Milestone {
  temperature: number;
  label: string;
}

export const MILESTONES: Milestone[] = milestonesJson.milestones;
export const MAX_TEMPERATURE: number = milestonesJson.max; // 700 °C

// ── Verdicts de fin de session (copy originale) ──

export interface Verdict {
  min: number;
  tier: TierId;
  title: string;
  phrase: string;
}

export const VERDICTS: Verdict[] = verdictsJson.bands as Verdict[];

export function verdictFor(score: number): Verdict {
  let v = VERDICTS[0] as Verdict;
  for (const band of VERDICTS) {
    if (score >= band.min) v = band;
  }
  return v;
}

// ── Partage « thermo-colonne » (game-loop §C.4 — anti-spoiler) ──

/** Couleur de ZONE thermique par palier — volontairement floue (deux
 *  paliers adjacents partagent une zone) pour ne rien révéler. */
const SHARE_ZONES: Record<TierId, string> = {
  t1: '🔵',
  t2: '🟡',
  t3: '🟡',
  t4: '🟠',
  t5: '🟠',
  t6: '🔴',
};

export function buildShareText(
  completion: Completion,
  opts: { dayLabel: string; themeLabel: string; percentileText?: string },
): string {
  const head = `🌡️ HotBrain · ${opts.dayLabel} · ${completion.mode === 'hot' ? 'Hot' : 'Brain'} · ${opts.themeLabel}`;
  if (completion.mode === 'hot') {
    const row = completion.tiers
      .map((t) => (t === 'miss' ? '⚪' : SHARE_ZONES[t]))
      .join('');
    const lines = [head, row, `${completion.score} °C`];
    if (opts.percentileText) lines.push(opts.percentileText);
    return lines.join('\n');
  }
  const lines = [
    head,
    `${completion.totals.answersAccepted} réponses · ${completion.score} °C / ${completion.ceiling} °C`,
  ];
  if (opts.percentileText) lines.push(opts.percentileText);
  return lines.join('\n');
}
