// ─────────────────────────────────────────────────────────────
// fixtures.ts — banques de test ORIGINALES (contenu factice, D-01) et
// helpers de pilotage du reducer. Volumes minimalistes : le contenu MVP
// (580 prompts) relève de M2+, pas de M1.
// ─────────────────────────────────────────────────────────────
import { assembleBank, type LoadedBank } from '../src/data/bank';
import type { RawPromptBank } from '../src/data/schemas';
import type {
  AnswerSheetEntry,
  BrainDiveState,
  Completion,
  GameConfig,
  HotCompletion,
  PlayerPreferences,
  TierId,
} from '../src/domain/types';
import type { ReducerContext, SessionMeta } from '../src/domain/reducer';

// ── Config & préférences de test ──

export const testConfig: GameConfig = {
  timezone: 'America/New_York',
  epochDate: '2026-11-01',
  modes: {
    hot: { rounds: 7, previewMs: 3_000, roundMs: 25_000 }, // fixture figée à 25 s (valeurs des tests T-01→T-13) ; production = 30 s (D-26)
    brain: { rounds: 5, previewMs: 3_000, roundMs: 60_000 },
  },
  maxAnswerLength: 256,
};

export const testPrefs: PlayerPreferences = {
  muted: false,
  colorblind: false,
  lowPower: false,
  answerCorrections: true,
  clearRejectedEntry: false,
};

// ── Fabrique de banques ──

type EntryDef = [answer: string, tier: TierId, aliases?: string[]];

export function makeEntry(answer: string, tier: TierId, aliases: string[] = []): AnswerSheetEntry {
  return { answer, tier, aliases };
}

export function makeRawBank(
  theme: string,
  defs: Record<string, EntryDef[]>,
  contentVersion = 1,
): RawPromptBank {
  const prompts = Object.keys(defs).map((id) => ({ id, theme, text: `Prompt ${id} ?` }));
  const sheets: RawPromptBank['sheets'] = {};
  for (const [id, entries] of Object.entries(defs)) {
    sheets[id] = {
      promptId: id,
      contentVersion,
      entries: entries.map(([a, t, al]) => makeEntry(a, t, al)),
    };
  }
  return { theme, contentVersion, prompts, sheets };
}

const FILLER: EntryDef[] = [
  ['Alpha', 't1'],
  ['Beta', 't3'],
  ['Gamma', 't5'],
];

// ── Banque Géographie (8 prompts — ≥ 7 pour le daily hot) ──

export const geoRaw = makeRawBank('geography', {
  'geo-capitals': [
    ['Paris', 't1', ['Ville Lumière']],
    ['Ouagadougou', 't2'],                    // piège : « l'obscure que tout le monde tente »
    ['Prague', 't3', ['Praha']],
    ['Bratislava', 't4'],
    ['Ljubljana', 't5'],
    ['Podgorica', 't6'],
    ['Strasbourg', 't4'],
    ['Rome', 't1'],
    ['Lome', 't4'],
  ],
  'geo-birds': [
    ['eagle', 't1'],
    ['merlon', 't3'],
    ['merlin', 't4'],
    ['osprey', 't5'],
    ['potoo', 't6'],
  ],
  'geo-rivers12': [
    ['Seine', 't1'],
    ['Loire', 't1'],
    ['Rhône', 't3'],
    ['Garonne', 't3'],
    ['Po', 't3'],
    ['Rhine', 't4'],
    ['Danube', 't4'],
    ['Tagus', 't4'],
    ['Volga', 't5'],
    ['Dnieper', 't5'],
    ['Elbe', 't5'],
    ['Oder', 't6'],
  ],
  'geo-0004': FILLER,
  'geo-0005': FILLER,
  'geo-0006': FILLER,
  'geo-0007': FILLER,
  'geo-0008': FILLER,
});
export const geoBank = assembleBank(geoRaw, 'geography');

// ── Banque Arts & Littérature (6 prompts — ≥ 5 pour le daily brain) ──

export const artRaw = makeRawBank('arts-literature', {
  'art-composers': [
    ['Mozart', 't1'],
    ['Bach', 't3'],
    ['Chopin', 't3'],
    ['Vivaldi', 't4'],
    ['Liszt', 't4'],
    ['Beethoven', 't5', ['Ludwig van Beethoven']],
    ['Scarlatti', 't5'],
    ['Glass', 't6'],
  ],
  'art-0002': FILLER,
  'art-0003': FILLER,
  'art-0004': FILLER,
  'art-0005': FILLER,
  'art-0006': FILLER,
});
export const artBank = assembleBank(artRaw, 'arts-literature');

// ── Banque Général (8 prompts) ──

export const genRaw = makeRawBank('general', {
  'gen-0001': FILLER,
  'gen-0002': FILLER,
  'gen-0003': FILLER,
  'gen-0004': FILLER,
  'gen-0005': FILLER,
  'gen-0006': FILLER,
  'gen-0007': FILLER,
  'gen-0008': FILLER,
});
export const genBank = assembleBank(genRaw, 'general');

// ── Banque Sports & Loisirs (20 prompts — tests d'épuisement) ──

const sportsDefs: Record<string, EntryDef[]> = {};
for (let i = 1; i <= 20; i++) {
  sportsDefs[`spo-${String(i).padStart(4, '0')}`] = [
    [`Sport${i}A`, 't1'],
    [`Sport${i}B`, 't4'],
  ];
}
export const sportsRaw = makeRawBank('sports-leisure', sportsDefs);
export const sportsBank = assembleBank(sportsRaw, 'sports-leisure');

// ── Banque Hot dédiée aux tests du reducer (7 prompts, alias t3) ──

const hotDefs: Record<string, EntryDef[]> = {};
for (let i = 1; i <= 7; i++) {
  hotDefs[`hb-0${i}`] = [[`Answer${i}`, 't3', [`alias${i}`]], ['Decoy', 't5']];
}
export const hotRaw = makeRawBank('geography', hotDefs);
export const hotBank = assembleBank(hotRaw, 'geography');
export const hotPromptIds = Object.keys(hotDefs);

// ── Contexte de reducer + espions de persistance ──

export interface Drive {
  completions: Completion[];
  currentAnswersSnapshots: BrainDiveState[];
}

export function makeDrive(): Drive {
  return { completions: [], currentAnswersSnapshots: [] };
}

export function makeContext(
  bank: LoadedBank,
  promptIds: string[],
  drive: Drive = makeDrive(),
  prefs: PlayerPreferences = testPrefs,
  contentVersion: number = bank.contentVersion,
): ReducerContext {
  return {
    config: testConfig,
    prefs,
    contentVersion,
    prompt: (s) => {
      const id = promptIds[s.roundIndex] as string;
      const p = bank.prompts.find((x) => x.id === id);
      if (!p) throw new Error(`fixture: no prompt for round ${s.roundIndex}`);
      return p;
    },
    sheet: (s) => {
      const sh = bank.sheets.get(promptIds[s.roundIndex] as string);
      if (!sh) throw new Error(`fixture: no sheet for round ${s.roundIndex}`);
      return sh;
    },
    sheetIndex: (s) => {
      const idx = bank.indexes.get(promptIds[s.roundIndex] as string);
      if (!idx) throw new Error(`fixture: no index for round ${s.roundIndex}`);
      return idx;
    },
    allSheets: () => promptIds.map((id) => bank.sheets.get(id) as never),
    persistCompletion: (c) => drive.completions.push(c),
    persistCurrentAnswers: (s) => drive.currentAnswersSnapshots.push(s),
  };
}

export const dailyMeta: SessionMeta = {
  playKind: 'daily',
  theme: 'geography',
  date: '2026-11-10',
  dayNumber: 10,
};

// ── Fabriques de complétions (historique factice) ──

export function makeHotCompletion(
  promptIds: string[],
  overrides: Partial<HotCompletion> = {},
): HotCompletion {
  const results = promptIds.map((id) => ({
    promptId: id,
    promptText: `Prompt ${id} ?`,
    rawAnswer: 'x',
    answer: 'X',
    tier: 't3' as TierId,
    score: 30,
  }));
  return {
    mode: 'hot',
    playKind: 'daily',
    theme: 'general',
    scope: '2026-11-06',
    game: 1,
    score: results.reduce((acc, r) => acc + r.score, 0),
    tiers: results.map(() => 't3'),
    results,
    contentVersion: 1,
    endedBy: 'completed',
    ...overrides,
  };
}
