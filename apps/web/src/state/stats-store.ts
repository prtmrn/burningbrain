// ─────────────────────────────────────────────────────────────
// stats-store.ts — stats dérivées de l'historique (F-4 : jamais source
// primaire, zéro réparation ; D-16 streak tout mode/thème ; F-11 une daily
// abandonnée est consommée mais n'alimente pas le streak).
// ─────────────────────────────────────────────────────────────
import {
  deriveBreakdown,
  deriveStats,
  type GameConfig,
  type GameMode,
  type KeyValueStore,
  type PlayerStats,
  type PlayerStatsBreakdown,
  type ThemeId,
} from '@hotbrain/engine';
import { loadHistory } from './history-store';

export type DailyStatus = 'locked' | 'available' | 'played';

export function getStats(kv: KeyValueStore, today: string): PlayerStats {
  return deriveStats(loadHistory(kv), today);
}

export function getBreakdown(kv: KeyValueStore, today: string): PlayerStatsBreakdown {
  return deriveBreakdown(loadHistory(kv), today);
}

/** Cycle de vie d'une daily (mode × thème × date) :
 *  'played' si une complétion daily existe (completed OU abandoned — F-11) ;
 *  'locked' avant l'epoch ; sinon 'available'. */
export function dailyStatus(
  kv: KeyValueStore,
  mode: GameMode,
  theme: ThemeId,
  date: string,
  config: GameConfig,
): DailyStatus {
  if (date < config.epochDate) return 'locked';
  const played = loadHistory(kv).some(
    (c) => c.playKind === 'daily' && c.mode === mode && c.theme === theme && c.scope === date,
  );
  return played ? 'played' : 'available';
}
