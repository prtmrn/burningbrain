# Spécification & Reconstruction — HotBrain — livrable de l'agent Spécification
**Version :** 2 · **Date :** 2026-11-09 · **Base :** WSD v0.8, DECISIONS.md (D-01→D-20, F-1→F-22), ontologie.md v3.1, mecaniques.md v2, game-loop.md v2
**Statut :** récepteur passif — ce document consolide, ne ré-arbitre pas. Les incohérences détectées sont consignées en §E, non réparées.

> **Changelog v1 → v2 (propagation produit du 2026-11-09) :** rebranding HotBrain (thermomètre ascendant, 1 pt = 1 °C, namespace `hotbrain`, terrain vierge → zéro migration legacy) · deux modes **Hot** (7 × 25 s + 3 s preview) et **Brain** (5 × 60 s, liste) chacun décliné Daily + Illimité (D-17) · Daily Général seul, 6 thèmes en banque statique à la carte (D-18) · séries Hot/Brain indépendantes (D-20) · domaine 100 % thème-agnostique, packagé pour le jeu Football (D-08) · streak = toute complétion daily `completed` (D-16), abandon = daily consommée (F-11) · feuilles en clair + fuzzy complet (F-9 tranché) · 34 cas tests (T-01→T-34) · F-2 soldé : montée Hot [600, 2 400] ms, ticks Brain 180 ms · jalons D-15 (seul provisoire restant).

---

## A. ARCHITECTURE LOGICIELLE MODULAIRE

### A.1 Pattern retenu (confirmé, étendu au mode Brain)

**Reducer pur + boucle d'événements**, réaffirmé comme l'équivalent structurel d'un ECS pour ce domaine : entités = états immuables (un `DiveState` actif — union discriminée `HotDiveState | BrainDiveState`), systèmes = transitions pures ordonnées par la FSM, pas de population d'entités à requêter, aucune physique. **Pas de framework ECS** — point tranché en v1, inchangé : l'ajout du mode Brain ne crée pas d'entités nouvelles concurrentes, seulement une deuxième branche de reducer (`hotReducer` / `brainReducer` derrière un dispatch sur `s.mode`).

### A.2 Structure de dépôt : monorepo — **tranché**

Pour honorer D-08 (jeu Football séparé, moteur partagé), le dépôt est un **monorepo pnpm workspaces** dès le jour 1. Alternatives écartées : copie de `src/domain` vers un futur dépôt Football (divergence garantie des correctifs) ; package publié sur un registry (inutile en privé, friction de versioning). Le workspace résout le partage sans aucune infrastructure : le package moteur est importé par chemin de workspace, et le domaine reste testable en isolation (Vitest au niveau package).

```
hotbrain/                              # racine du monorepo (pnpm-workspace.yaml, turbo optionnel)
├── packages/
│   └── engine/                        # ★ @hotbrain/engine — MOTEUR PARTAGÉ (D-08)
│       │                              #   100 % thème-agnostique : ThemeId opaque, GameConfig
│       │                              #   injectée, aucune référence à « hotbrain », « football »,
│       │                              #   aux °C ni aux labels de paliers
│       ├── package.json               # exports ESM, typings stricts, vitest local
│       ├── src/
│       │   ├── domain/                # TS PUR — zéro import React/Next/DOM/localStorage/fetch
│       │   │   ├── types.ts           # interfaces Ontologie v3.1 §B (GameConfig, ThemeId,
│       │   │   │                      #   DiveState union, Completion union, TierId t1..t6…)
│       │   │   ├── constants.ts       # TIERS (points + gaugeFraction, SANS labels — D-14),
│       │   │   │                      #   SCORE_BANDS (bornes), MAX_ANSWER_LENGTH
│       │   │   ├── rng.ts             # mulberry32 + fisherYates + fnv1a32 (mecaniques §A.5)
│       │   │   ├── calendar.ts        # dateLoc/diffCalendaire/dayNumber/nextResetMs(now, config)
│       │   │   ├── normalize.ts       # 6 étapes, ordre exact (Ontologie §B.5)
│       │   │   ├── validate.ts        # validateAnswer (hot) + validateListing (brain, B.5.2)
│       │   │   │                      #   + buildExactIndex + damerau + seuil
│       │   │   ├── scoring.ts         # score round/session, temperature(), computeVerdict
│       │   │   │                      #   (hot : score ; brain : ratio × 700 — F-22 acté)
│       │   │   ├── percentile.ts      # betterThan (hot 701 buckets ; brain 1001 ‰) + blend/rebase
│       │   │   ├── streak.ts          # updateStreak — D-16 (toute daily completed, tout mode/thème)
│       │   │   ├── selection.ts       # seedSeries/seedDaily (FNV-1a theme:mode:dayNumber),
│       │   │   │                      #   drawThemed (sans remise persistant, remise à épuisement)
│       │   │   ├── recompute.ts       # recomputeCompletion hot + brain (D-03, monotonie F-6)
│       │   │   └── reducer.ts         # gameReducer → hotReducer | brainReducer + GameEvent
│       │   ├── data/                  # validateurs runtime + contrats de contenu (agnostiques)
│       │   │   ├── schemas.ts         # validatePromptBank/Sheet/RefDist/DailyContent…
│       │   │   └── bank.ts            # assembleBank(raw, config) → {prompts, sheets, exactIndexes}
│       │   │                          #   — la SOURCE (fetch/fichier) est injectée, jamais importée
│       │   └── state-core/            # persistance agnostique : enveloppe {schemaVersion,data},
│       │       ├── envelope.ts        #   validation à la lecture, registre de migrations
│       │       ├── kv.ts              # interface KeyValueStore (localStorage = un adaptateur app)
│       │       └── dive-codec.ts      # (dé)sérialisation couple mono/wall (PersistedDiveState)
│       └── tests/unit/                # les 60 tests unitaires du domaine (§C.1)
│
├── apps/
│   └── web/                           # HotBrain — Next.js App Router + Turbopack, Vercel
│       ├── content/                   # banques HotBrain (source de vérité, versionnée, validée CI)
│       │   ├── general.v1.json        # banque Général (daily hot + brain, illimité)
│       │   ├── geography.v1.json      # 6 banques thématiques (illimité, D-18) — format §B.1
│       │   ├── entertainment.v1.json  ├── history.v1.json
│       │   ├── arts-literature.v1.json├── science-nature.v1.json
│       │   ├── sports-leisure.v1.json
│       │   ├── refdist.hot.v1.json    # ReferenceDistribution hot (701 buckets)
│       │   ├── refdist.brain.v1.json  # ReferenceDistribution brain (1001 buckets, ‰ de ratio)
│       │   ├── tiers.labels.fr.json   # labels D-14 (Tiède…Fusion) + verdicts — JAMAIS persistés
│       │   └── milestones.v1.json     # jalons thermiques D-15 (provisoire) 0→700 °C
│       ├── scripts/
│       │   ├── validate-bank.ts       # validateur CI bloquant (§B.2)
│       │   └── build-content.ts       # → public/content/*.v{n}.json immutables (F-9 : en clair)
│       ├── src/
│       │   ├── config.ts              # GameConfig HotBrain : timezone NY, epochDate (À FIXER),
│       │   │                          #   modes hot 7×(3+25 s) / brain 5×(3+60 s), dailyThemes=['general']
│       │   ├── state/                 # adaptateurs app → engine/state-core
│       │   │   ├── keys.ts            # NS='hotbrain' + clés Ontologie v3.1 §D.1
│       │   │   ├── local-storage-kv.ts# adaptateur KeyValueStore → localStorage
│       │   │   ├── dive-store.ts      ├── history-store.ts   (index mode:theme:scope, borne 400)
│       │   │   ├── prefs-store.ts     └── refdist-store.ts   (par mode, rebase distVersion)
│       │   ├── hooks/                 # pont React ↔ engine — seuls fichiers DOM/timers
│       │   │   ├── useGame.ts         ├── useClock.ts (TICK via performance.now())
│       │   │   ├── useVisibility.ts   ├── useKeyboard.ts     └── usePrefs.ts
│       │   ├── components/            # présentation pure (props in / callbacks out)
│       │   │   ├── SessionScreen.tsx  # orchestrateur visuel (hot & brain)
│       │   │   ├── PromptCard.tsx     ├── AnswerField.tsx
│       │   │   ├── Thermometer.tsx    # jauge ascendante + jalons D-15 + gaugeFraction
│       │   │   ├── FeedbackBanner.tsx # hot : verdict de round
│       │   │   ├── ListingToast.tsx   # brain : feedback inline (4 kinds, expirations §A.6)
│       │   │   ├── HarvestScreen.tsx  # brain : récolte + manqués par palier (révélation)
│       │   │   ├── SummaryScreen.tsx  ├── ShareButton.tsx (thermo-colonne, game-loop §C.4)
│       │   │   ├── CountdownReset.tsx ├── StreakBadge.tsx
│       │   │   ├── ThemePicker.tsx    # sélecteur secondaire (reco game-loop 9)
│       │   │   └── motion.ts          # constantes de présentation (§A.6)
│       │   ├── app/
│       │   │   ├── layout.tsx         # script inline pré-hydratation daltonien (§A.7)
│       │   │   ├── page.tsx           # / — accueil : un geste par défaut (Hot · Général)
│       │   │   ├── hot/daily/page.tsx     ├── hot/play/page.tsx    (illimité Général)
│       │   │   ├── brain/daily/page.tsx   ├── brain/play/page.tsx  (illimité Général)
│       │   │   ├── themes/[theme]/page.tsx # hub du thème : Hot ou Brain illimité (D-17/D-18)
│       │   │   ├── stats/page.tsx     ├── faq/page.tsx           └── privacy/page.tsx
│       │   └── styles/tokens.css      # dégradé thermique, .colorblind, .low-power, accents thème
│       └── tests/                     # integration/ (Testing Library), e2e/ (Playwright), fixtures/
└── (futur) apps/football/             # D-08 — importe @hotbrain/engine tel quel (§D.6)
```

**Convention de routes — justification.** Hiérarchie *mode-d'abord* (`/hot/…`, `/brain/…`) et non thème-d'abord : le daily — le rituel, la porte d'entrée — n'existe que par mode sur Général (D-18), il doit donc être une route stable de premier niveau ; `/daily` vs `/play` distingue explicitement le cycle de vie (soumis au reset NY vs libre), ce qui évite tout paramètre d'URL implicite. `/themes/[theme]` est le hub des 6 thèmes à la carte et n'offre que l'illimité : y placer aussi les dailies suggérerait des dailies thématiques qui n'existent pas. `ThemeId` inconnu → 404 (la route est générée depuis la liste des banques, `generateStaticParams`).

### A.3 Frontières de modules — diagramme de dépendances

```
┌─────────────────────────── packages/engine ───────────────────────────┐
│  domain/  ◄──  data/  ◄──  state-core/      (DAG interne, zéro cycle) │
└───────────────────────────────▲───────────────────────────────────────┘
                                 │ (@hotbrain/engine — seule porte d'entrée)
        ┌────────────────────────┼───────────────────────────────┐
        │                        │                               │
  apps/web/src/state/     apps/web/src/hooks/              (futur) apps/football
        ▲                        ▲
        └───────────┬────────────┘
              apps/web/src/components/   (présentation pure — types engine en lecture seule)
                        ▲
                 apps/web/src/app/       (routes — seul niveau Next.js-conscient)
```

**Règles de frontière (lint d'architecture bloquant en CI) :**

1. `engine/domain` n'importe **rien** hors de `domain/`. Ni horloge, ni aléa, ni persistance, ni réseau : temps en paramètre d'événement, aléa via graines injectées (`seedSeries` / `sessionSeed`), persistance via `ctx.persistCompletion` / `ctx.persistCurrentAnswers`, contenu via `ctx.sheet()` / `ctx.prompt`.
2. **Agnosticité produit de l'engine (condition D-08)** : `ThemeId` est opaque (`KnownThemeId | (string & {})`) ; les labels de paliers, jalons, verdicts, noms de modes en français vivent dans `apps/web/content/` et `components/`, jamais dans l'engine ; `GameConfig` (timezone, epochDate, timers, rounds) est injectée à chaque appel. Toute chaîne « hotbrain »/« football »/« °C » dans `packages/engine` fait échouer un lint dédié.
3. `engine/data` et `engine/state-core` sont agnostiques de la plateforme : la source de contenu et le KV store sont des **interfaces injectées** — l'app web fournit `fetch('/content/…')` et `localStorage`.
4. `apps/web` : `state/` → engine + adaptateurs ; `hooks/` → `state/` + engine ; `components/` → types engine en lecture seule ; `app/` → tout. Interdiction de cycle (DAG), vérifiée en CI.
5. Contrats aux frontières = types de l'Ontologie v3.1 §B. Le couple mono/wall (`PersistedDiveState`) est confiné à `engine/state-core/dive-codec.ts` ; l'interface runtime `DiveState` ne change pas.

### A.4 Gestion de l'horloge (inchangé de v1, rappel opérationnel)

- Injection : chaque événement (`START_SESSION`, `TICK`, `SUBMIT`, `APPLY_CORRECTION`, `PAUSE`, `RESUME`, `FEEDBACK_ACK`, `ABANDON_ROUND`, `ABANDON_SESSION`) porte son `now: number` monotonique — le reducer ne lit jamais l'horloge.
- Adaptateur production : `useClock.ts` émet `TICK(performance.now())` (rAF en phases animées, `setTimeout` ciblé sur la prochaine deadline sinon ; mode Brain en `listing` : tick minimal pour l'animation du thermomètre).
- Persistance couple (mono, wall) dans `dive-codec.ts` ; reconstruction `mono′ = performance.now() + (wall − Date.now())` puis `resume`. **Brain : `currentAnswers` persisté à chaque acceptation** (via `ctx.persistCurrentAnswers`) → reprise en pleine liste à l'identique (T-25).
- Calendrier : `calendar.ts` reçoit `config` en paramètre (timezone NY, epochDate à fixer au déploiement) ; jamais de calcul horaire sur les deadlines.

### A.5 Constantes de présentation (F-2 — solde acté, propagé au thermomètre)

`apps/web/src/components/motion.ts` — aucune constante n'affecte le scoring :

| Constante | Valeur | Base |
|---|---|---|
| `PREVIEW_MS` / `ANSWER_MS` hot | 3 000 / 25 000 ms (domaine, via `GameConfig`) | C-02 |
| Brain : `roundMs` | 60 000 ms (via `GameConfig`) | D-11 |
| `T_FEEDBACK` (hot) | 2 500 ms auto-avance si pas de `FEEDBACK_ACK` | spec v1, acté |
| Montée hot | durée = `clamp(°Cgagnés / 450 °C·s⁻¹, 600, 2 400)` ms, easing `cubic-bezier(0.4,0,0.2,1)` | mecaniques §A.2 (bornes v1 remappées en ascension) |
| **`BRAIN_TICK_MS`** | **180 ms** (borne dure ≤ 250 ms) — incrément animé du thermomètre à chaque acceptation, quelle que soit la taille du gain ; la rareté est portée par l'icône de palier + le pitch sonore, pas par la vitesse | mecaniques §A.2, game-loop §B.2 (« feedback < 200 ms ») |
| Expirations `ListingToast` | `accepted` : fondu après `BRAIN_TICK_MS` · `duplicate`/`rejected` : 1 500 ms · `correction` : persistant jusqu'à action ou prochaine soumission | mecaniques §B.5.3 |
| `FEEDBACK_FADE` | 250 ms entrée / 200 ms sortie | v1 |
| Micro-célébration de jalon | label qui se fixe sur le tube au franchissement, 800 ms | game-loop reco 4 |
| Kill-switch | animations instantanées si `preferences.lowPower` ou `prefers-reduced-motion` | reco 8 |

### A.6 Accessibilité & identité visuelle

- **Daltonien appliqué AVANT hydratation** (pattern de l'original, reconduit) : `app/layout.tsx` injecte en `<head>` un script inline bloquant lisant `localStorage["hotbrain:prefs:v1"]`, posant `colorblind` / `low-power` sur `<html>` avant le premier paint ; parse invalide → aucun effet ; `suppressHydrationWarning` sur `<html>`. **Criticité accrue** : la jauge *est* un dégradé de couleur — la règle dure « palier jamais codé par la couleur seule » (icône + label) est un invariant de revue de chaque PR touchant `Thermometer.tsx`.
- **R5 (collision couleur thème / dégradé)** : l'identité d'un thème = **icône + teinte d'accent sur le chrome uniquement** (header, fond de carte, bouton) — JAMAIS sur le thermomètre ni sur les paliers (game-loop reco 9). Implémentation : variable CSS `--theme-accent` scopée au chrome ; le dégradé thermique (`--heat-*`) est hors de portée des thèmes. Test visuel daltonien × thème coloré en M6.
- Son : `muted` lu au boot, `AudioContext` paresseux au premier geste ; pitch croissant avec le palier (Brain), sound design original désactivable (reco 7, M6).
- Clavier : champ unique, autofocus, Entrée ; Brain ajoute un raccourci d'abandon de round (touche dédiée, confirmée) et d'abandon de session (confirmé — F-11 : geste consommateur de daily, doit être difficile à déclencher par accident).

### A.7 Sélection du thème (UI)

- Accueil `/` = **un seul geste par défaut** : « Hot · Général » pré-sélectionné, un tap pour jouer (reco 9 — le paradoxe du choix tue le rituel ; 2 modes × 7 thèmes = 14 portes sinon). Brain daily accessible en second geste visible. Les thèmes vivent derrière `ThemePicker` (sélecteur secondaire) menant à `/themes/[theme]`.
- `preferences.lastTheme` (Ontologie §B.9) mémorise le dernier thème joué pour pré-sélectionner le sélecteur — confort de navigation, jamais de redirection forcée.
- `/themes/[theme]` propose les deux modes illimité du thème (D-17) et affiche les stats du thème (découpes `PlayerStatsBreakdown`).

---

## B. CONTENU & PIPELINE DE CURATION

### B.1 Format des fichiers de banque (un fichier par thème, mode-indifférencié)

`apps/web/content/<theme>.v1.json` — une banque sert indifféremment Hot et Brain (décision « banques partagées », WSD §8.4) :

```json
{
  "theme": "geography",
  "contentVersion": 3,
  "prompts": [{ "id": "geo-0001", "text": "…" }],
  "sheets": {
    "geo-0001": {
      "contentVersion": 3,
      "entries": [{ "answer": "…", "tier": "t3", "aliases": ["…"], "quip": "…" }]
    }
  }
}
```

- `contentVersion` global à la banque, pilote du recalcul D-03 ; `refdist.hot.v1.json` / `refdist.brain.v1.json` portent leur propre `distVersion` (par mode — Ontologie §B.10).
- **F-9 tranché : feuilles en clair** — `build-content.ts` n'applique ni hash ni obfuscation ; il valide puis émet `public/content/*.v{n}.json` servis en `immutable`.
- Contrats : `promptId` unique **toutes banques confondues** (préfixe de thème obligatoire : `gen-`, `geo-`, `ent-`, `his-`, `art-`, `sci-`, `spo-`) ; ≤ 2 000 clés normalisées (answer + aliases) par prompt (F-8) ; `answer.length ≤ 256` ; `tier ∈ t1..t6`.
- Brain lisant la même feuille, un prompt à feuille pauvre produit des rounds `sheet-exhausted` fréquents : **garde-fou de curation** — warning validateur si `entries.length < 10` (le flow Brain exige de la matière ; game-loop §A.2).

### B.2 Validateur de banque (`scripts/validate-bank.ts` — CI bloquante)

1. Schéma : validateurs de `engine/data/schemas.ts` (une seule source de vérité, mêmes règles qu'à l'exécution).
2. **Disjointedness D-10 : `banque('general') ∩ banque(t) = ∅` pour tout thème t** — vérifiée sur `promptId` (préfixes) **et** sur similarité de texte normalisé (deux prompts quasi identiques dans des banques distinctes = avertissement bloquant après revue) — T-30.
3. Unicité globale des `promptId` ; exactement un `theme` par prompt ; `theme` dans la liste connue.
4. Unicité des clés normalisées intra-feuille (answer + aliases) — sinon `exactIndex` ambigu.
5. Pas de collision fuzzy intra-feuille entre entrées distinctes (distance Damerau > seuil applicable — les ex æquo structurels de T-16 ne doivent jamais être forcés par le contenu).
6. Paliers valides ; exactement une entrée `t6` (Fusion, fun factor) par prompt (avertissement sinon) ; une entrée `t2` (Réchauffé, piège — D-05) identifiable par prompt (warning si absente).
7. F-8 : ≤ 2 000 clés/prompt ; quips ≤ 280 chars ; warning si `entries.length < 10` (matière Brain, §B.1).
8. Couverture : banque `general` ≥ 7 prompts (garde `seedDaily` hot) et ≥ 5 (brain) — en pratique largement au-delà (§B.3) ; chaque banque thématique ≥ 5 (rounds brain) avec warning < 20 (épuisement rapide de l'illimité, T-34).
9. `refdist.hot` : 701 buckets ≥ 0, Σ > 0 ; `refdist.brain` : 1 001 buckets ≥ 0, Σ > 0.
10. `milestones.v1.json` : températures strictement croissantes ∈ [0, 700] (D-15 provisoire).
11. Non-contrefaçon (D-01) : liste de blocage de termes protégés Krillion — avertissement à revue humaine.

### B.3 Plan de contenu MVP (volumes proposés)

| Banque | Prompts au lancement | Justification |
|---|---|---|
| **Général** | **280** | Consommation daily = 12 prompts/jour (7 hot + 5 brain, séries indépendantes D-20, tirages indépendants avec remise sur la banque). 280 prompts ⇒ un prompt donné revient en moyenne toutes les ~3 semaines par mode ; sous 200, la répétition devient perceptible avant un mois (F-5 : garantie dure reportée à la curation — la taille de banque EST la mitigation) |
| 6 thèmes × | **50 chacun = 300** | Banque statique illimité sans remise : 50 prompts = 10 sessions brain ou 7 sessions hot avant première remise (T-34) ; repère du WSD §8.3 (~50/thème) |
| **Total MVP** | **580 prompts** | ≈ **11 500 réponses curées** (moyenne cible ~20 entrées/prompt, de 10 minimum à plusieurs centaines sur les sujets riches — F-18) |

- **Croissance post-lancement** : +40 prompts Général/mois (couvre l'érosion de fraîcheur du daily) ; +10/thème/mois ; recalibrage D-03 trimestriel sur `AnswerSheet.stats` (soumissions réelles, I-05) avec montée de `contentVersion`.
- Répartition Général (D-10 : « tous types de questions », pas un agrégat) : quotas souples par famille de sujet, aucune > 25 % ; le validateur avertit si un tirage `seedDaily('general', mode, n)` des 60 premiers jours concentre ≥ 3 prompts de même famille dans une série (contrôle qualité non bloquant, snapshot §D).

### B.4 Stratégie de production (rédaction assistée IA + validation humaine)

Pipeline de curation à 6 étapes, chaque prompt portant un statut `draft → reviewed → published` (fichier de suivi `content/_status.json`, git-Versionné) :

1. **Génération de prompts (IA)** : gabarit par famille de sujet exigeant (a) ≥ 15 réponses plausibles, (b) une réponse « évidente » t1 et une « faussement maligne » t2 identifiées, (c) une candidate t6 au fun factor.
2. **Génération de feuilles (IA)** : entrées + alias + quips + tiers proposés ; contrainte de sortie = schéma `AnswerSheet` (rejet automatique si non conforme).
3. **Validation humaine (obligatoire, jamais shippée)** : exactitude factuelle de chaque entrée ; calibration des paliers (le t2 est-il vraiment le choix « que tout le monde tente » ?) ; vérification t6 = fun factor ; chasse aux doublons sémantiques entre entrées.
4. **Validateur CI** (§B.2) sur la PR de contenu.
5. **Playtest interne** : 2 parties hot + 1 brain par lot de 20 prompts ; retour de calibration (un palier dont le taux de réussite réel dérive fortement du curé est reclassé à la prochaine `contentVersion` — D-03).
6. **Publication** : merge → `build-content.ts` → bump `contentVersion` si toute feuille a changé.

Cadence cible : ~60 prompts/semaine en régime de croisière avec cette chaîne (le goulot est l'étape 3 — budgéter ~4 min/prompt).

---

## C. TESTS D'INTÉGRATION & SCÉNARIOS DE VALIDATION

### C.1 Tests unitaires du domaine (Vitest, dans `packages/engine`) — 60 tests

Correspondance **1:1** avec les 34 cas de mecaniques.md v2 §D. T-01→T-20 sont repris de v1 avec les renommages actés (session, `hotbrain`, t1..t6, °C, `config.epochDate` — mecaniques §D les confirme valides mutatis mutandis) ; l'ancrage « 2026-11-08 = 116 » de l'ancien T-10 était propre à Krillion : il est remplacé par une ancre synthétique sur notre `config.epochDate` de test (jour E → dayNumber 1 ; E+115 → 116), la mécanique DST testée étant inchangée.

| Test | Cas | Fichier | Vérifie |
|---|---|---|---|
| U-01 | T-01 | `reducer.hot.test.ts` | chemin nominal 7 rounds → `done`, HotCompletion persistée, contentVersion |
| U-02 | T-02 | `reducer.hot.test.ts` | retry libre : rejet sans pénalité, deadline inchangée (C-04) |
| U-03 | T-03 | `reducer.hot.test.ts` | miss au timeout, draft → `rawAnswer`, 0 pt |
| U-04 | T-04 | `reducer.hot.test.ts` | soumission à t = deadline → tardive (B.2 strict) |
| U-05 | T-05 | `reducer.hot.test.ts` | soumission à deadline − 1 → acceptée |
| U-06 | T-06 | `reducer.hot.test.ts` | double soumission même macrotâche → 1 seul RoundResult |
| U-07 | T-07 | `reducer.hot.test.ts` | soumission en feedback ignorée |
| U-08 | T-08 | `reducer.hot.test.ts` | pause/reprise : deadlines décalées, 25 s effectives |
| U-09 | T-09 | `calendar.test.ts` | DST printemps NY : dayNumber +1 sur journée de 23 h |
| U-10 | T-10 | `calendar.test.ts` | DST automne NY : journée 25 h ; ancre dayNumber (epoch config) |
| U-11 | T-11 | `streak.test.ts` | complétion scopée à la date du START_SESSION (minuit NY franchi) |
| U-12 | T-12 | `dive-codec.test.ts` | rechargement t = 12 s : reconstruction mono/wall, draft conservé |
| U-13 | T-13 | `dive-codec.test.ts` | rechargement après deadline → miss forcé (hot) |
| U-14 | T-14 | `validate.test.ts` | fuzzy distance 1 chaîne longue → suggestion ; APPLY_CORRECTION accepte |
| U-15 | T-15 | `validate.test.ts` | seuil 0 sur chaîne ≤ 4 : pas de suggestion (« rome »/« roem ») |
| U-16 | T-16 | `validate.test.ts` | ex æquo fuzzy → pas de correction |
| U-17 | T-17 | `recompute.test.ts` | recalcul hot v→v+1 : reclassement 30→60, miss inchangé |
| U-18 | T-18 | `recompute.test.ts` | réponse disparue → conservation (F-6), jamais de baisse |
| U-19 | T-19 | `selection.test.ts` | illimité : pool < n → remise totale, pas de doublon intra-session |
| U-20 | T-20 | `selection.test.ts` | déterminisme mulberry32/Fisher–Yates (vecteurs figés) |
| U-21 | T-21 | `reducer.brain.test.ts` | doublon exact par alias → `duplicate`, score inchangé, draft conservé, compteur +1 |
| U-22 | T-22 | `reducer.brain.test.ts` | fuzzy vers entrée déjà récoltée → `duplicate` direct (pas `correction`) |
| U-23 | T-23 | `reducer.brain.test.ts` | timeout en pleine saisie : récolte conservée, draft perdu, `endReason:'timeout'` |
| U-24 | T-24 | `reducer.brain.test.ts` | `sheet-exhausted` : clôture dans le même tour, score = plafond, aucun bonus |
| U-25 | T-25 | `dive-codec.test.ts` | rechargement à t = 30 s en pleine liste : `currentAnswers` restitué à l'identique |
| U-26 | T-26 | `reducer.brain.test.ts` | abandon round (récolte conservée) vs abandon session (daily consommée, streak non alimenté — F-11) |
| U-27 | T-27 | `percentile.test.ts` | ratio de partage brain : bucket ‰ = floor(1000 × score/ceiling) ; partage absolu + ratio (D-19) |
| U-28 | T-28 | `streak.test.ts` | streak croisé hot+brain (D-16) ; contre-cas : abandon seul ne compte pas |
| U-29 | T-29 | `selection.test.ts` | seedSeries multi-thèmes : déterminisme, hot ≠ brain à même jour, banques disjointes |
| U-30 | T-30 | `schemas.test.ts` + CI | Général ∩ thème ≠ ∅ → rejet au chargement, liste des ids fautifs |
| U-31 | T-31 | `reducer.brain.test.ts` | deadline brain stricte : t = 60 000 rejeté, t = 59 999 accepté |
| U-32 | T-32 | `recompute.test.ts` | recalcul brain : reclassement + conservation réponse disparue, jamais de baisse |
| U-33 | T-33 | `reducer.brain.test.ts` | correction fuzzy en brain : persistante, `viaCorrection:true`, re-soumission sans mémoire négative |
| U-34 | T-34 | `selection.test.ts` | épuisement de banque à la carte → remise totale, cycle neuf |

**Compléments unitaires — 26 tests** (mêmes fichiers) :

- U-35→U-40 : `normalize()` — un test par étape dans l'ordre exact + idempotence.
- U-41→U-45 : `computeVerdict` hot — bornes exactes 0/150→151/250→251/350→351/449→450.
- U-46, U-47 : verdict brain — grille hot appliquée au ratio × 700 (F-22) : bornes et ratio nul.
- U-48→U-50 : vecteurs `mulberry32` et `fnv1a32` figés (inter-plateformes) ; Fisher–Yates sans mutation d'entrée.
- U-51, U-52 : `nextResetMs` strictement > now ; cohérence `dayNumber(nextReset) = dayNumber + 1`.
- U-53, U-54 : `betterThan` hot — correction de continuité ; bornage d'affichage [1 %, 99 %] sous 30 complétions.
- U-55, U-56 : `betterThan` brain — table 1 001 buckets ‰ ; ratio = 1 (feuille complète) borné.
- U-57, U-58 : `blend` (w = min(0,25, n/(n+40))) ; rebase à `distVersion` supérieure (par mode).
- U-59 : `seedDaily` — garde explicite banque < rounds (échec au boot).
- U-60 : invariant structurel brain — `score(session) ≤ ceiling` sur toute suite d'événements aléatoire (test de propriété, 200 itérations seedées).

### C.2 Tests d'intégration React (Testing Library, horloge simulée) — 10 tests

| Test | Intitulé |
|---|---|
| I-1 | Remount de `<SessionScreen>` hot à t = 12 s simulés → état, draft et deadline restaurés |
| I-2 | `visibilitychange → hidden` en `answering` → PAUSE ; retour → RESUME, deadlines décalées |
| I-3 | Auto-avance du feedback hot après `T_FEEDBACK` = 2 500 ms ; ack anticipé au clic |
| I-4 | Suggestion fuzzy → clic appliquer → `APPLY_CORRECTION` → palier attendu |
| I-5 | Verrous UI : Entrée en `preview`/`feedback` sans effet |
| I-6 | `<CountdownReset>` jusqu'au prochain minuit NY ; bascule `locked → available` au tick |
| I-7 | Script inline daltonien : classe `colorblind` présente sur `<html>` dans le document initial, avant hydratation |
| I-8 | Complétion → streak et percentile affichés cohérents avec l'historique fixture |
| I-9 | **Brain : rechargement en pleine liste** — remount au milieu de `listing` : `currentAnswers`, score cumulé, deadline et draft restitués (T-25 niveau UI) |
| I-10 | **Brain : thermomètre en ticks** — chaque acceptation déclenche une animation bornée à `BRAIN_TICK_MS` = 180 ms (scheduler d'animation vérifié sur fake timers) et un toast expirant selon §A.6 |

### C.3 Tests e2e (Playwright, build de production) — 6 tests

| Test | Intitulé |
|---|---|
| E-1 | **Parcours Hot daily complet** : accueil → 7 rounds (accepté/rejeté/miss) → synthèse (score, °C, verdict, percentile) → partage thermo-colonne (7 pastilles + °C, zéro réponse) |
| E-2 | **Reprise après fermeture d'onglet à t = 12 s** (hot) : réouverture → ~13 s restantes, draft intact |
| E-3 | **DST simulé** : `timezoneId: 'America/New_York'` + horloge mockée au 2026-11-01 01:30 (heure dupliquée) puis 2027-03-08 → dayNumber correct, deadlines intactes |
| E-4 | **Retry libre observable** (hot) : refus → message bref non bloquant, chrono en cours, acceptation dans la fenêtre |
| E-5 | **Daily consommée** : après complétion hot ET après abandon (F-11) → statut `played`, non rejouable, countdown affiché ; l'illimité reste jouable |
| E-6 | **Brain illimité à thème** : `/themes/geography` → choix Brain → session complète (acceptations, doublon visible, timeout) → récolte ; **changement de thème** → accent du chrome modifié, thermomètre et paliers inchangés (R5) ; fermeture d'onglet en pleine liste → reprise à l'identique |

### C.4 Tests de non-régression de persistance — 5 tests

Terrain vierge (D-06) : aucune migration legacy `abysse:*` n'existe ni n'est testée ; les fixtures sont `hotbrain:*` v1.

| Test | Intitulé |
|---|---|
| P-1 | Fixture `hotbrain:dive:v1` brain en pleine liste → lecture validée, reprise fonctionnelle |
| P-2 | Historique corrompu (score incohérent, `results.length ≠ 5/7`, `mode` invalide) → rejet propre + réinitialisation, jamais de crash |
| P-3 | Chaîne de migrations future : enveloppe `{schemaVersion: 0}` simulée → `migrate[0→1]`, clés inconnues conservées (forward-compat) |
| P-4 | Rebase refdist par mode : `distVersion` locale < embarquée → `blended` jeté, recalcul depuis la nouvelle base (hot et brain) |
| P-5 | **Purge du cache contenu à 14 j** : une `BrainCompletion` ancienne conserve son `ceiling` figé (F-15) → ratio de partage toujours affichable après purge des feuilles |

**TOTAL SPÉCIFIÉ : 60 + 10 + 6 + 5 = 81 tests automatisés.**

### C.5 Critères de validation — FID (Hot, fidélité à Krillion) et CIB (Brain, cohérence interne)

La fidélité à Krillion ne couvre que le mode **Hot** (seul héritier de la mécanique reconnue). Brain est une création originale : on définit des **critères de cohérence interne (CIB)** vérifiables contre nos propres décisions tranchées, non contre l'original.

**FID — Hot (fidélité comportementale observable, chaque critère relié à un test) :**

| # | Critère | Source | Test(s) |
|---|---|---|---|
| FID-1 | 3 s de preview hors chrono avant chaque prompt | C-02 | U-01, E-1 |
| FID-2 | 25 s exactement de saisie, deadline stricte (timeout gagne à égalité) | C-02, B.2 | U-01/04/05, E-1 |
| FID-3 | Retry libre après refus, sans pénalité ni reset du chrono | C-04 | U-02, E-4 |
| FID-4 | Miss = 0 pt uniquement au timeout | C-04 | U-02/03/04 |
| FID-5 | Grille 6 paliers 10/15/30/60/85/100 dont palier-piège t2 (Réchauffé, D-05/D-14) | C-03 | U-01, U-41→45, validateur §B.2-6 |
| FID-6 | 7 prompts par session, score max 700 | F-02 | U-01, E-1 |
| FID-7 | Verdict final par bandes 0–150/151–250/251–350/351–449/450+ | F-02 | U-41→45, E-1 |
| FID-8 | Reset minuit America/New_York, dayNumber calendaire (DST-safe) | C-01/D-13 | U-09/10/51/52, E-3 |
| FID-9 | Reprise après rechargement (couple mono/wall, draft conservé) | F-07 | U-12/13, I-1, E-2, P-1 |
| FID-10 | Pause/reprise par décalage inconditionnel des deadlines | F-07 | U-08, I-2 |
| FID-11 | Fuzzy = suggestion jamais acceptation, unicité exigée, seuils 0/1/2 | F-9/I-02 | U-14/15/16, I-4 |
| FID-12 | Percentile « plus chaud que X % » borné [1, 99], distribution embarquée + lissage local | F-3 | U-53/54/57/58, I-8 |
| FID-13 | Partage vertical anti-spoiler (n° + °C + 7 pastilles, zéro réponse) | game-loop §C.4 | E-1 |
| FID-14 | Daltonien appliqué avant hydratation ; palier jamais codé par la couleur seule | reco 8 | I-7 + revue visuelle M6 |
| FID-15 | Aucun dark pattern (pas de streak réparable, pas de relance) | game-loop §C.2 | revue M6 + invariant de code |

**CIB — Brain (cohérence interne avec les décisions tranchées) :**

| # | Critère | Source | Test(s) |
|---|---|---|---|
| CIB-1 | Format 5 prompts × (3 s preview + 60 s), deadline stricte identique à hot | D-11, B.2 | U-01(brain)/31, E-6 |
| CIB-2 | Chaque réponse acceptée rapporte les points de son palier ; thermomètre monte en continu, tick ≤ 250 ms (180 ms) | D-11, A.2 | U-21/24, I-10 |
| CIB-3 | Dédup sur identité canonique : alias d'une réponse donnée = `duplicate` ; fuzzy vers déjà-récolté = `duplicate` direct ; jamais punitif, draft conservé | B.5.2 | U-21/22, E-6 |
| CIB-4 | `sheet-exhausted` = clôture anticipée dans le même tour, score = plafond, **aucun bonus** | B.5.4 | U-24 |
| CIB-5 | Abandon de round : récolte conservée (`endReason:'abandoned'`) ; abandon de session : complétion partielle persistée, **daily consommée, non rejouable, streak non alimenté** | B.5.5, F-11 | U-26, E-5 |
| CIB-6 | Invariant `score ≤ ceiling` sur toute session | A.1 | U-60 |
| CIB-7 | Partage brain = score absolu **+** ratio score/ceiling ; `ceiling` figé survit à la purge du cache | D-19, F-15 | U-27, P-5, E-6 |
| CIB-8 | Percentile brain sur ratio ‰ (table 1 001 buckets), borné [1, 99] | F-13, A.6 | U-55/56 |
| CIB-9 | Verdict brain = grille hot appliquée au ratio × 700 | F-22 | U-46/47 |
| CIB-10 | Rechargement en pleine liste : `currentAnswers`, deadline, draft restitués à l'identique | §D.2 | U-25, I-9, E-6 |
| CIB-11 | `duplicatesIgnored` compté en session (F-14) et recopié dans `BrainCompletion.totals` | F-14 | U-21/22/26 |
| CIB-12 | Séries daily hot/brain indépendantes (graines FNV-1a distinctes), même jour = même série pour tous | D-20, A.5 | U-29 |

**Critères transverses (produit, pas fidélité)** : streak = toute daily completed tout mode/thème (U-11/28, I-8) · Général ∩ thèmes = ∅ garanti au chargement (U-30) · identité de thème sur le chrome uniquement (E-6) · recalcul D-03 monotone hot et brain (U-17/18/32).

### C.6 Outils (inchangé de v1, rappel)

**Vitest** (engine : fake timers, stubs d'horloge, tests de propriété seedés — package autonome, la CI le fait tourner sans l'app) · **Testing Library** (requêtes par rôle = a11y gratuite ; remount = rechargement) · **Playwright** (contexts multiples pour fermeture/réouverture d'onglet, `timezoneId` pour DST, horloge mockée — contre le build de production, script inline pré-hydratation inclus) · **validateur de banque en CI** bloquant toute PR de contenu invalide.

---

## D. PLAN DE CONSTRUCTION

Squelettes et signatures seulement. Critères de sortie mesurables par jalon.

### M1 — Engine : domaine + tests (fondation partagée)

Contenu : `packages/engine` complet (`domain/`, `data/schemas.ts`, `state-core/`), signatures cardinales :

```ts
// engine/domain/reducer.ts
export function gameReducer(s: DiveState, ev: GameEvent, ctx: Context): DiveState;
export interface Context {
  config: GameConfig;                       // injectée — D-13, D-08
  sheet(s: DiveState): AnswerSheet;
  prompt(s: DiveState): Prompt;
  prefs: PlayerProfile['preferences'];
  contentVersion: number;
  persistCompletion(c: Completion): void;
  persistCurrentAnswers(s: BrainDiveState): void;   // reprise en pleine liste
  now(): never;                             // interdit — le temps arrive par événement
}
// engine/domain/selection.ts
export function fnv1a32(str: string): number;
export function seedSeries(theme: ThemeId, mode: GameMode, dayNumber: number): number;
export function seedDaily(theme: ThemeId, mode: GameMode, dayNumber: number,
  bank: PromptBank, config: GameConfig): string[];
export function drawThemed(theme: ThemeId, mode: GameMode, bank: PromptBank,
  history: Completion[], sessionSeed: number, config: GameConfig): string[];
// engine/domain/validate.ts
export function validateAnswer(input: string, sheet: AnswerSheet, prefs): HotValidation;
export function validateListing(input: string, sheet: AnswerSheet,
  current: AcceptedAnswer[], prefs): ListingValidation;
// calendar.ts · scoring.ts · percentile.ts · streak.ts · recompute.ts :
//   signatures de mecaniques v2 §A.3→A.7, toutes prenant config en paramètre
```

**Sortie M1** : 60/60 tests unitaires verts ; `engine` compile en TS strict avec zéro import externe et zéro chaîne produit (lint agnosticité) ; vecteurs mulberry32/FNV-1a figés.

### M2 — Persistance & contenu (app web)

Contenu : adaptateurs `apps/web/src/state/`, `scripts/validate-bank.ts` + `build-content.ts`, squelette de banques (10 prompts/banque en `draft`, suffisant pour câbler), `GameConfig` HotBrain avec `epochDate` de dev.

**Critères de sortie** : P-1→P-5 verts ; validateur bloquant en CI ; lecture corrompue = réinitialisation propre ; purge FIFO 14 j et borne 400 complétions implémentées.

### M3 — Hot daily (le rituel)

Contenu : routes `/`, `/hot/daily`, `/hot/play`, hooks, composants de session hot (PromptCard, AnswerField, Thermometer, FeedbackBanner, SummaryScreen, ShareButton), motion §A.5, script inline daltonien.

**Sortie M3** : I-1→I-8 et E-1/E-2/E-4/E-5 verts ; parcours < 3 min ; FID-1→FID-15 démontrés ; Lighthouse a11y ≥ 95 sur `/`.

### M4 — Brain

Contenu : `/brain/daily`, `/brain/play`, `ListingToast`, `HarvestScreen`, ticks thermomètre 180 ms, gestes d'abandon (round/session, avec confirmation pour la session daily — F-11).

**Sortie M4** : U-21→U-28/U-31→U-33 confirmés niveau UI, I-9/I-10 et E-6 (partie brain) verts ; CIB-1→CIB-12 démontrés ; session brain complète < 7 min.

### M5 — Thèmes & illimité à la carte

Contenu : `/themes/[theme]` × 6, `ThemePicker`, accents de chrome (R5), sans-remise persistant sur historique, stats par thème (`PlayerStatsBreakdown`).

**Sortie M5** : U-29/30/34 niveau UI, E-6 complet ; changement de thème sans collision visuelle vérifié en mode daltonien ; bascule d'un thème à l'autre sans perdre la session active.

### M6 — Polish UX / accessibilité / contenu de lancement

Contenu : montée du volume de contenu au plan §B.3 (580 prompts `published`), jalons D-15 sur le tube + micro-célébrations, sound design original désactivable, `/stats`, `/faq`, `/privacy`, snapshot des tirages daily des 60 premiers jours (contrôle anti-répétition, F-5), revue éthique FID-15, **fixation de `epochDate`** (jour n° 1 = date de mise en production).

**Sortie M6** : 81/81 tests verts sur le build de production ; checklist FID + CIB + transverses signée ; `prefers-reduced-motion` respecté ; déploiement Vercel de démonstration.

### D.6 Réutilisabilité pour le jeu Football (D-08)

| Partagé tel quel (`@hotbrain/engine`) | Spécifique à chaque app |
|---|---|
| `domain/` **intégral** : reducers hot/brain, validate/normalize/fuzzy, calendar (config injectée), sélection FNV-1a, streak, percentile, recompute, rng | `GameConfig` (epoch propre ; timers identiques sauf décision contraire) |
| `data/schemas.ts` + assembleur de banque | Banque football (thème `'football'` — `ThemeId` extensible prévu), pipeline de curation propre |
| `state-core/` (enveloppe, migrations, codec mono/wall, interface KV) | Namespace de clés (`football:*`), adaptateur KV |
| Validateur de banque (paramétré par liste de thèmes) | Routes, composants, DA, labels de paliers (si re-skin), jalons (game-loop reco 10 : jalons génériques en v1 Football, re-skin non bloquant), copy, refdist propre |
| 60 tests unitaires du domaine (fixtures paramétrées par `GameConfig`) | Tests e2e/intégration de l'app Football |

Coût marginal estimé d'apps/football : l'app Next + contenu + DA seulement ; aucune retouche de l'engine si le lint d'agnosticité de M1 a tenu.

---

## E. RISQUES & INCOHÉRENCES REMONTÉS À L'ORCHESTRATEUR

### E.1 Incohérences détectées (signalées, non réparées)

1. **Disjonction hot ∩ brain intra-jour — contradiction inter-livrables.** Ontologie v3.1 §B.4 (commentaire `DailyContent`) affirme « `hot.promptIds ∩ brain.promptIds = ∅` à (theme, date) donné » et §E parle de « disjointedness garantie à la génération » ; or mecaniques v2 §A.5 établit que l'intersection peut être non vide par hasard de tirage (graines distinctes ≠ tirages disjoints), F-12 recommandait « non » au filtre post-tirage, et **le WSD v0.8 §8.7 acte « pas de disjonction hot ∩ brain intra-jour (F-12) »**. Cette spec suit le WSD (pas de filtre) — le commentaire de l'Ontologie est à corriger pour éviter qu'un implémentateur n'écrive une garde inexistante.
2. **Mecaniques v2 T-25 : coquille de comptage** — l'énoncé dit « 4 acceptées » puis « `currentAnswers` (3) restitué ». Sans impact sur la règle testée (U-25 fige la valeur à 4, cohérente avec le début de l'énoncé) ; à corriger dans mecaniques.md.
3. **Mecaniques v2 §C : `dupCount` provisoire vs `duplicatesIgnored` acté** — le pseudo-code brain utilise encore `dupCount` avec marqueur ⚠ F-14 et une remise à zéro par round, alors qu'Ontologie v3.1 a livré `BrainDiveState.duplicatesIgnored` en **cumul session** (recopié dans `totals`). Cette spec suit l'Ontologie v3.1 (attribut réel, cumul session) ; le pseudo-code du Mécaniques est à aligner (sa propre recommandation F-14 était le cumul session — convergence probable, à confirmer).
4. **D-15 (jalons) = seul provisoire restant.** `milestones.v1.json` est câblé sur l'échelle 0/29,8/37/56,7/100/180/233/450/700 °C ; la donnée est isolée dans un fichier de contenu versionné, un renversement est donc sans coût de code — mais la DA (labels de jalons) ne doit pas démarrer avant figeage.
5. **`epochDate` non fixée** : toute la chaîne daily (dayNumber, streak, partage « Jour n ») est paramétrée mais sans ancre réelle avant la mise en production. Les tests utilisent une epoch synthétique ; la fixation est un critère de sortie de M6 — ne pas l'oublier : changer l'epoch après lancement invalide tous les dayNumbers partagés par les joueurs (irrémédiable).
6. **F-5 (anti-répétition inter-jours) toujours reporté** : la mitigation retenue est la taille de banque (280 Général ⇒ ~3 semaines de fraîcheur moyenne par prompt) + snapshot des tirages à M6. Si l'utilisateur veut une garantie dure, l'attribut « historique de tirage global » reste à ajouter à l'Ontologie — escalade héritée, toujours ouverte.

### E.2 Risques techniques & produit

7. **Contenu = goulot n° 1** (WSD §8.3 confirmé et amplifié) : 580 prompts / ~11 500 réponses curées avant lancement ; la validation humaine (étape 3, §B.4) est incompressible (~40 h de relecture). Risque de calendrier si M6 démarre sans contenu `published` suffisant — la chaîne de production doit tourner dès M2.
8. **R1/R2 (game-loop) partiellement adressés par D-17/D-18 mais pas éteints** : l'illimité hot+brain coexiste avec le daily — la présentation « un geste par défaut » (§A.7) protège le rituel, à valider en observation post-lancement ; la fragmentation sociale des thèmes reste un risque réel (Général = board canonique du partage).
9. **Feuilles pauvres × Brain** : une feuille à < 10 entrées rend `sheet-exhausted` banal et le mode Brain creux — d'où le warning validateur §B.2-7 ; si la curation ne tient pas cette barre, le mode se dégrade silencieusement (risque qualité, pas technique).
10. **Coût du fuzzy en Brain** : `validateListing` tourne à chaque soumission d'une boucle de 60 s ; borné par F-8 (< 2 ms pire cas), compatible avec le feedback < 200 ms (marge ×100) — mais toute dérive du contrat F-8 en curation cassera d'abord le game feel Brain.
11. **Dépendance à la tz database du navigateur** (inchangé) : dayNumber/nextReset via Intl ; garde de non-régression du dayNumber persisté, tests DST U-09/U-10/E-3.
12. **Quota localStorage & mode privé** (inchangé) : historique borné 400 complétions, purge contenu 14 j ; dégradation gracieuse (session jouable sans persistance) à spécifier en M2.

---

## SYNTHÈSE POUR L'ORCHESTRATEUR

1. Propagation v2 complète : HotBrain, deux modes Hot (7×25 s+3 s) / Brain (5×60 s) × Daily/Illimité (D-17), daily Général seul (D-18), séries indépendantes (D-20), namespace `hotbrain` terrain vierge (zéro migration legacy), F-9 en clair, paliers t1..t6 labels séparés (D-14), jalons D-15 câblés comme contenu isolé (seul provisoire).
2. Architecture : monorepo pnpm tranché — `@hotbrain/engine` (domaine + validateurs + state-core, 100 % thème-agnostique, lint dédié) + `apps/web` ; routes mode-d'abord `/hot/daily`, `/hot/play`, `/brain/daily`, `/brain/play`, `/themes/[theme]`, `/stats`, `/faq`, justifiées par le cycle de vie daily ; DAG de dépendances inchangé dans son principe, horloge toujours injectée.
3. F-2 propagé au thermomètre : montée hot [600, 2 400] ms à 450 °C/s, ticks brain `BRAIN_TICK_MS` = 180 ms (borne 250), expirations de feedback inline par kind ; R5 : accent de thème confiné au chrome par variable CSS, jamais sur la jauge.
4. Contenu MVP : 580 prompts (Général 280 + 6×50) ≈ 11 500 réponses curées ; validateur CI à 11 règles dont disjointedness Général ∩ thèmes = ∅ (D-10) et warning feuilles < 10 entrées (protection du flow Brain) ; pipeline de production IA + validation humaine à 6 étapes.
5. Tests : **81 spécifiés** — 60 unitaires engine (34 en correspondance 1:1 avec T-01→T-34, + 26 compléments), 10 intégration React (dont rechargement Brain en pleine liste, ticks thermomètre), 6 e2e Playwright (hot-daily, brain-illimité à thème + changement de thème, DST, reprise d'onglet), 5 persistance (dont `ceiling` survivant à la purge 14 j).
6. Checklist divisée : FID-1→FID-15 (fidélité Hot à Krillion) et CIB-1→CIB-12 (cohérence interne Brain — l'original n'a pas de mode liste, il n'y a rien à quoi être fidèle) + critères transverses produit.
7. Jalons M1→M6 avec critères de sortie ; réutilisabilité Football (D-08) chiffrée : engine intégral + validateur + tests de domaine partagés, seuls contenu/DA/routes spécifiques.
8. Escalades : contradiction disjonction hot∩brain (Ontologie vs WSD §8.7 — spec suit le WSD) ; coquille T-25 ; `dupCount` du pseudo-code à aligner sur `duplicatesIgnored` ; **`epochDate` à fixer impérativement avant production (irrémédiable après lancement)** ; F-5 toujours ouvert ; contenu = goulot principal (~40 h de validation humaine).
