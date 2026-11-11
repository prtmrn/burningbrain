# @hotbrain/engine

Moteur de domaine **thème-agnostique** d'un jeu de quiz quotidien à deux modes
(hot : une réponse par prompt sous deadline stricte ; brain : liste de réponses
par prompt sous deadline stricte). Aucune dépendance runtime, TypeScript strict,
déterministe inter-plateformes.

## Principes

- **Tout est injecté** : fuseau horaire, date d'epoch, nombre de rounds et durées
  (`GameConfig`), contenu (banques de prompts/feuilles), préférences joueur,
  horloge (chaque événement porte son `now` monotonique) et persistance
  (callbacks du `ReducerContext`). Le moteur ne lit jamais `Date.now()` ni
  `performance.now()`.
- **Agnosticité produit** : `ThemeId` est une chaîne opaque, les labels de
  paliers et textes de verdict sont du contenu applicatif. Le lint
  `scripts/lint-agnostic.mjs` garantit qu'aucune chaîne produit ne vit dans
  `src/`.
- **Pureté** : `gameReducer(state, event, ctx)` est pur ; les seuls effets sont
  confinés au contexte (`persistCompletion`, `persistCurrentAnswers`).

## Architecture

```
src/
  domain/      types · constants · rng (mulberry32, Fisher–Yates, FNV-1a)
               calendar (calcul civil, DST-safe via Intl) · normalize (6 étapes)
               validate (exact O(1) + fuzzy Damerau borné) · scoring
               percentile · streak · selection (daily seedée, illimité sans
               remise) · recompute (recalcul progressif) · reducer (FSM hot/brain)
  data/        schemas (validateurs runtime du contenu) · bank (assemblage +
               index pré-calculés)
  state-core/  kv (contrat de persistance) · envelope · dive-codec
               ((dé)sérialisation mono/wall, validation stricte à la lecture)
```

## Exemple d'usage

```ts
import {
  createHotSession, gameReducer, seedDaily, assembleBank,
  type GameConfig,
} from '@hotbrain/engine';

const config: GameConfig = {
  timezone: 'America/New_York',
  epochDate: '2026-11-01',
  modes: {
    hot:   { rounds: 7, previewMs: 3_000, roundMs: 25_000 },
    brain: { rounds: 5, previewMs: 3_000, roundMs: 60_000 },
  },
  maxAnswerLength: 256,
};

const bank = assembleBank(rawBankJson, 'geography');
const promptIds = seedDaily('geography', 'hot', dayNumber, bank, config);

const ctx = {
  config, prefs, contentVersion: bank.contentVersion,
  prompt: (s) => /* prompt du round courant */,
  sheet: (s) => /* feuille du round courant */,
  sheetIndex: (s) => /* index pré-calculé */,
  allSheets: () => promptIds.map((id) => bank.sheets.get(id)!),
  persistCompletion: (c) => storage.save(c),
  persistCurrentAnswers: (s) => storage.saveDive(s),
};

let state = createHotSession({ playKind: 'daily', theme: 'geography', date, dayNumber });
state = gameReducer(state, { type: 'START_SESSION', now: t0 }, ctx);
state = gameReducer(state, { type: 'TICK', now: t1 }, ctx);          // preview → answering
state = gameReducer(state, { type: 'SUBMIT', now: t2, input: 'prague' }, ctx);
```

## Tests

```
npx vitest run --root packages/engine   # 60 tests (T-01…T-34 + U-35…U-60)
```

Invariants couverts : deadline stricte (à égalité exacte, le timeout gagne),
retry libre hot, dédup canonique brain, fuzzy en suggestion jamais appliquée
d'office, sheet-exhausted sans bonus, complétion idempotente, persistance
mono/wall fidèle, calendrier civil DST-safe (23 h / 25 h), déterminisme du
tirage (vecteurs de référence FNV-1a / mulberry32), monotonie du recalcul,
score ≤ ceiling (propriété sur 200 sessions simulées).
