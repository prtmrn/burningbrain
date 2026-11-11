// ─────────────────────────────────────────────────────────────
// fixtures.ts — banques de test, horloges manuelles et contexte de reducer
// pour les tests de persistance/intégration d'apps/web.
// ─────────────────────────────────────────────────────────────
import {
  assembleBank,
  type GameEvent,
  type LoadedBank,
  type RawPromptBank,
  type ReducerContext,
  type SessionMeta,
} from '@hotbrain/engine';
import { hotbrainConfig } from '../src/config';
import { DEFAULT_PREFERENCES } from '../src/state/prefs-store';
import type { EnumerableKV } from '../src/state/local-storage-kv';
import type { SessionClocks } from '../src/state/session-store';

// ── KV mémoire énumérable (adaptateur de test — miroir de localStorage) ──

export function createMemoryKV(initial?: Record<string, string>): EnumerableKV {
  const map = new Map<string, string>(Object.entries(initial ?? {}));
  return {
    getItem: (k) => (map.has(k) ? (map.get(k) as string) : null),
    setItem: (k, v) => void map.set(k, v),
    removeItem: (k) => void map.delete(k),
    keys: () => [...map.keys()],
  };
}

// ── Horloge manuelle (mono/wall découplées — simule le rechargement) ──

export interface ManualClock extends SessionClocks {
  advanceMono(ms: number): void; // temps qui passe dans l'onglet
  advanceWall(ms: number): void; // temps qui passe hors de l'onglet
  reload(): void;                // mono repart à 0, wall continue
}

export const WALL_EPOCH = 1_800_000_000_000; // ≈ 2027-01-15 UTC

export function manualClock(wallStart: number = WALL_EPOCH): ManualClock {
  let mono = 0;
  let wall = wallStart;
  return {
    nowMono: () => mono,
    nowWall: () => wall,
    nowISO: () => new Date(wall).toISOString(),
    advanceMono(ms) {
      mono += ms;
      wall += ms;
    },
    advanceWall(ms) {
      wall += ms;
    },
    reload() {
      mono = 0;
    },
  };
}

// ── Banques de test ──

function rawBank(theme: string, defs: Record<string, [string, 't1' | 't2' | 't3' | 't4' | 't5' | 't6', string[]?][]>): RawPromptBank {
  const prompts = Object.keys(defs).map((id) => ({ id, theme, text: `Prompt ${id} ?` }));
  const sheets: RawPromptBank['sheets'] = {};
  for (const [id, entries] of Object.entries(defs)) {
    sheets[id] = {
      promptId: id,
      contentVersion: 1,
      entries: entries.map(([answer, tier, aliases]) => ({ answer, tier, aliases: aliases ?? [] })),
    };
  }
  return { theme, contentVersion: 1, prompts, sheets };
}

const hotDefs: Record<string, [string, 't1' | 't2' | 't3' | 't4' | 't5' | 't6', string[]?][]> = {};
for (let i = 1; i <= 7; i++) {
  hotDefs[`hb-0${i}`] = [[`Answer${i}`, 't3', [`alias${i}`]], ['Decoy', 't5']];
}
export const hotBank: LoadedBank = assembleBank(rawBank('geography', hotDefs), 'geography');
export const hotPromptIds = Object.keys(hotDefs);

export const brainBank: LoadedBank = assembleBank(
  rawBank('arts-literature', {
    'art-composers': [
      ['Mozart', 't1'],
      ['Bach', 't3'],
      ['Vivaldi', 't4'],
      ['Beethoven', 't5', ['Ludwig van Beethoven']],
      ['Scarlatti', 't5'],
      ['Glass', 't6'],
    ],
    'art-0002': [['Alpha', 't1'], ['Beta', 't3'], ['Gamma', 't5']],
    'art-0003': [['Alpha', 't1'], ['Beta', 't3'], ['Gamma', 't5']],
    'art-0004': [['Alpha', 't1'], ['Beta', 't3'], ['Gamma', 't5']],
    'art-0005': [['Alpha', 't1'], ['Beta', 't3'], ['Gamma', 't5']],
  }),
  'arts-literature',
);
export const brainPromptIds = brainBank.prompts.map((p) => p.id);

// ── Contexte contenu du reducer ──

export function contentCtx(
  bank: LoadedBank,
  promptIds: string[],
): Omit<ReducerContext, 'persistCompletion' | 'persistCurrentAnswers'> {
  return {
    config: hotbrainConfig,
    prefs: { ...DEFAULT_PREFERENCES },
    contentVersion: bank.contentVersion,
    prompt: (s) => {
      const p = bank.prompts.find((x) => x.id === promptIds[s.roundIndex]);
      if (!p) throw new Error(`fixture: pas de prompt au round ${s.roundIndex}`);
      return p;
    },
    sheet: (s) => {
      const sh = bank.sheets.get(promptIds[s.roundIndex] as string);
      if (!sh) throw new Error(`fixture: pas de feuille au round ${s.roundIndex}`);
      return sh;
    },
    sheetIndex: (s) => {
      const idx = bank.indexes.get(promptIds[s.roundIndex] as string);
      if (!idx) throw new Error(`fixture: pas d'index au round ${s.roundIndex}`);
      return idx;
    },
    allSheets: () => promptIds.map((id) => bank.sheets.get(id) as never),
  };
}

export const dailyMeta: SessionMeta = {
  playKind: 'daily',
  theme: 'geography',
  date: '2027-01-15',
  dayNumber: 68,
};

export const brainDailyMeta: SessionMeta = { ...dailyMeta, theme: 'arts-literature' };

export type { GameEvent };
