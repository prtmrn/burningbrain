# Mécaniques — Moteur de Règles & Fonctions de Transition — **HotBrain**
**Agent :** Moteur de Règles & Mécaniques (Systems & Logic) · **Version :** 2 · **Date :** 2026-11-09 · **Base :** WSD v0.7, DECISIONS.md, ontologie.md v3, game-loop.md v2
**Règle d'abstraction respectée :** toute formule ne porte que sur des attributs définis par l'Ontologie v3. Attributs manquants → §F, jamais inventés.
**Convention :** types (`DiveState`, `BrainDiveState`, `AcceptedAnswer`, `ListingFeedback`, `TierId`, `ThemeId`, `GameConfig`…) = interfaces d'ontologie.md v3 §B. Horloge de référence du domaine : monotonique (`performance.now()`), §B.1.

**Changelog v2 :** propagation HotBrain (thermomètre 1 pt = 1 °C, namespace `hotbrain`, paliers t1..t6) · spécification intégrale du mode Brain (7 points Ontologie §F tranchés, §B.5/C/D) · sélection multi-thèmes par (theme, mode, dayNumber) + thèmes à la carte sans remise persistante · recalcul D-03 étendu à Brain · epoch/fuseau paramétrés par `GameConfig` · 14 cas tests ajoutés (T-21→T-34) · incohérences inter-livrables remontées en §F sans réparation.

---

## A. ÉQUATIONS & FORMULES

### A.1 Scoring — les deux modes

```
score(round : HotRoundResult)   = round.score                    // ∈ {0, 10, 15, 30, 60, 85, 100}
  où round.score = (round.tier == null) ? 0 : Tier(round.tier).points     // revérifié à la lecture

score(round : BrainRoundResult) = Σ_{a ∈ round.answersGiven} a.score      // cumulatif, doublons absents
  plafond(round)                = Σ_{e ∈ sheet(round.promptId).entries} Tier(e.tier).points

score(session : Completion)     = Σ_{r ∈ results} score(r)
  hot   : ∈ [0, 700]  (7 rounds × t6 max)
  brain : ∈ [0, plafondSession]  où plafondSession = Σ_{5 rounds} plafond(round)   // VARIABLE par série
```

La complétion brain est **auto-plafonnée par construction** : chaque `AnswerSheetEntry` ne peut être comptée qu'une fois (dédup B.5.2), donc `score ≤ plafondSession` est un invariant structurel, pas une garde.

### A.2 Thermomètre (D-09 provisoire — traité comme paramètre)

```
temperature(score) : °C = score × DEGREES_PER_POINT        // DEGREES_PER_POINT = 1 (paramètre D-09)
  hot   : jauge 0 → 700 °C ; franchissements de jalons = événements dérivés (score avant/après round)
  brain : jauge 0 → plafondSession °C ; montée CONTINUE à chaque AcceptedAnswer (+Tier.points °C)
```

**Vitesse de montée visuelle (constantes de présentation proposées — relève F-2, à entériner par Spécification) :**
- Hot : interpolation de la montée d'un round, durée proportionnelle aux °C gagnés, bornée **[600 ms, 2 400 ms]** (reprend les bornes actées en spec v1 pour la descente, remappées en ascension), désactivée si `preferences.lowPower`.
- Brain : contrainte dure Game Loop « feedback < 200 ms » → l'incrément brain est animé en **≤ 250 ms cible 150 ms**, quelle que soit la taille du gain (10 ou 100 °C) ; la *vitesse* ne porte pas la rareté, c'est le pitch sonore + l'icône de palier qui la portent (game-loop §B.2). Constante proposée : `BRAIN_TICK_MS = 180`.
- Placement des marqueurs de palier sur le tube : `Tier.gaugeFraction` ∈ [0,1] (I-04), identique aux deux modes.

### A.3 Numéro de série quotidienne — paramétré par GameConfig (D-13)

```
dayNumber(now : epochMs, config : GameConfig) :
  1. dateLoc = formatToParts(now, timeZone = config.timezone) → "YYYY-MM-DD"   // Intl, tz database
  2. retourner diffCalendaire(config.epochDate, dateLoc) + 1
```

**Calcul calendaire, jamais horaire** (journées NY de 23 h/25 h aux deux transitions DST annuelles — ne jamais diviser des ms par 86 400 000). `diffCalendaire` = différence de jours civils via jour julien (ou timestamps à **midi UTC** arrondis). `config.timezone = "America/New_York"` et `config.epochDate` = date de lancement HotBrain (à fixer au déploiement) sont des **paramètres injectés** — la formule est identique à v1, seule la constante devient config. `nextResetMs(now, config)` : prochain minuit local strictement > now, offset résolu via Intl (jamais de table DST en dur).

### A.4 Streak (D-16 tranché : périmètre élargi)

```
Définition : currentStreak = longueur de la chaîne de dates civiles config.timezone
  consécutives, terminant à la plus récente date possédant ≥ 1 Completion daily
  avec endedBy === 'completed' — TOUT mode (hot|brain), TOUT thème confondus.

updateStreak(history, dateLoc) :
  dates = { c.scope | c ∈ history, c est une série daily, c.endedBy === 'completed' }
  last  = max(dates)
  si last ∉ {dateLoc, veille(dateLoc)} → currentStreak = 0        // chaîne morte
  sinon currentStreak = |{dates consécutives terminant en last}|
  maxStreak = max(maxStreak, currentStreak)
```

- **Une seule complétion quotidienne par jour suffit**, quel que soit le couple (mode, thème) — D-16. Les séries hors-daily (thèmes à la carte, rejeux) ne comptent pas (`scope` = n° de session, pas une date civile).
- **Une session abandonnée (`endedBy: 'abandoned'`) ne compte PAS pour le streak.** Tranché ici, rationale : le streak mesure un rituel *mené à terme* ; compter l'abandon rendrait le streak trivial à farmer (ouvrir/fermer). Le cas crash/rechargement n'est pas affecté (l'état survit, reprise §B.3). À valider → F-11.
- **Zéro réparation** (F-4 acté) : compteur dérivé de l'historique, purement re-dérivable.
- Stats par mode/thème : `PlayerStatsBreakdown` dérivé de l'historique (chaque Completion porte `mode` + `theme`) — aucun état supplémentaire.

### A.5 Sélection des prompts — multi-thèmes (D-07, D-10, D-20)

**Graine composite.** La seed 32 bits dérive de l'identité de la série par un hash de chaîne figé (FNV-1a 32 bits, spécifié ci-dessous — pas une implémentation libre) :

```
seedSeries(theme : ThemeId, mode : GameMode, dayNumber : uint32) : uint32
  s = fnv1a32(`${theme}:${mode}:${dayNumber}`)        // chaîne canonique, séparateur ':'
  retourner mulberry32-ready s                         // directement utilisable par mulberry32

fnv1a32(str) : h = 0x811C9DC5 ; pour chaque octet UTF-8 b : h = imul(h ^ b, 0x01000193) ; h >>>= 0
mulberry32 / fisherYatesShuffle : inchangés de v1 (imul, 32 bits, déterminisme inter-plateformes).
```

**Séries quotidiennes (hot et brain, D-20 indépendantes) :**

```
seedDaily(theme, mode, dayNumber, bank : PromptBank) : promptIds[7|5]
  n   = config.modes[mode].rounds                      // 7 hot / 5 brain — paramètre, pas en dur
  rng = mulberry32(seedSeries(theme, mode, dayNumber))
  idx = fisherYatesShuffle([0 .. bank.prompts.length-1], rng)
  retourner idx.slice(0, n).map(i => bank.prompts[i].id)
  gardes : bank.theme === theme ; bank.prompts.length ≥ n ; Général ∩ thèmes = ∅ (validateur §B.6)
```

Propriétés : **même (theme, mode, dayNumber) → même série pour tous les joueurs** (rituel partagé) ; hot et brain tirent des graines différentes → **séries indépendantes par construction** (D-20, aucun spoil croisé structurel : `promptIds(hot) ∩ promptIds(brain)` n'est pas vide par construction mais non corrélé ; si l'orchestrateur exige la disjonction stricte intra-jour, c'est un filtre post-tirage à ajouter — non demandé par D-20, signalé F-12) ; rejouable à l'identique depuis `dayNumber` (anti-triche locale, tests).

**Quelles séries sont quotidiennes** : paramètre produit (D-18 provisoire) — `dailyThemes : ThemeId[] = ['general']` par défaut. Le moteur ne connaît que `seedDaily` ; la restriction « Général seul en daily » est une donnée de config, pas une règle codée.

**Thèmes à la carte (banque statique, hors-daily) — tirage sans remise persistant :**

```
seenIds(theme, mode, history) = ⋃ { r.promptId | c ∈ history, c.theme === theme,
                                    c.mode === mode, c hors-daily, r ∈ c.results }

drawThemed(theme, mode, bank, history, sessionSeed : uint32) : promptIds[n]
  pool = bank.prompts.filter(p => p.id ∉ seenIds(theme, mode, history))
  si pool.length < n : pool = bank.prompts            // ÉPUISEMENT → cycle neuf (remise totale)
  rng  = mulberry32(sessionSeed)                      // graine de session (crypto, persistée)
  retourner fisherYates(pool.map(p => p.id), rng).slice(0, n)
```

`sessionSeed` (attribut Ontologie v3) est généré à la création de la session, persisté, jamais régénéré → rejeu déterministe après rechargement. Le sans-remise est **persistant** : `seenIds` se redérive de l'historique à chaque tirage (pas de structure d'ombre). L'épuisement remet le paquet entier en jeu (cohérent entraînement).

### A.6 Percentile « plus chaud que X % »

**Hot** (inchangé, plafond fixe 700) :
```
betterThanHot(score) = ( Σ_{s < score} dist.buckets[s] + 0.5 × dist.buckets[score] ) / Σ dist.buckets × 100
  dist : ReferenceDistribution{ mode:'hot', maxScore:700, buckets[701] } + copie lissée locale
  (blend w = min(0.25, n/(n+40)), rebase si distVersion monte — Ontologie v3 §B.10)
```

**Brain (plafond variable — tranché, point 6 Ontologie §F) :** le percentile porte sur le **ratio score/plafond**, pas sur le score absolu :

```
ratio(session) = score / plafondSession                                   // ∈ [0, 1]
bucket(session) = floor(1000 × ratio)                                     // ∈ [0, 1000]
betterThanBrain(score, plafondSession) = betterThan sur
  ReferenceDistribution{ mode:'brain', maxScore:1000, buckets[1001] }     // table en POUR MILLE
```

Rationale : deux séries brain de plafonds différents ne sont comparables qu'en fraction de récolte — et c'est exactement le ratio que D-19 impose déjà au partage (« score absolu + ratio score/plafond »). Le percentile et le partage parlent donc la même langue. La structure `ReferenceDistribution` de l'Ontologie supporte ce dimensionnement sans modification (`maxScore = 1000`). Affichage borné [1 %, 99 %] tant que l'échantillon local < 30 complétions du mode concerné. **Le partage affiche les DEUX nombres (absolu + ratio), le percentile n'utilise que le ratio** — arbitrage à confirmer → F-13.

### A.7 Recalcul progressif D-03 — Hot **et Brain**

Déclenché quand `bank.contentVersion` monte, pour chaque Completion dont `contentVersion` est inférieur :

```
recomputeCompletion(c : Completion, bank : PromptBank) → { c', changed }

  HOT — pour chaque r ∈ c.results :
    r.rawAnswer == null ou r.tier == null → inchangé (un miss reste un miss)
    sinon v = validateAnswer(r.rawAnswer, bank.sheets[r.promptId]) :
      v.match     → r'.answer/tier/score/quip = valeurs de l'entry courante
      sinon       → CONSERVATION (réponse disparue de la feuille : palier joué conservé — F-6 acté)

  BRAIN — pour chaque r ∈ c.results, pour chaque a ∈ r.answersGiven :
    v = validateAnswer(a.rawAnswer, bank.sheets[r.promptId]) :
      v.match   → a'.answer/tier/score = valeurs courantes ; a'.viaCorrection conservé ;
                  a'.at conservé (l'horodatage est historique, il ne se recalcule pas)
      sinon     → CONSERVATION de l'entrée a telle quelle (F-6)
    r'.score = Σ a'.score ; r'.endReason inchangé
    Doublons : impossibles à introduire par le recalcul (la dédup portait sur les entrées
    de la version jouée ; si la nouvelle feuille fusionne deux entrées, on conserve le
    premier match chronologique et le second est rétrogradé — jamais : voir note ci-dessous)

  c'.score = Σ r'.score ; c'.tiers redérivés (hot) ; c'.totals.answersAccepted recompté (brain)
  c'.contentVersion = bank.contentVersion                    // dernière version appliquée
  → PlayerStats / Breakdown redérivés de l'historique complet.
```

Note de coin (fusion d'entrées entre versions) : si la v(N+1) fusionne deux entrées en une, deux `AcceptedAnswer` historiques peuvent pointer vers la même entry. Politique tranchée : **les deux conservent leurs points** (monotonie F-6 — le joueur les a gagnés loyalement) ; l'invariant « doublons absents » est un invariant *de jeu*, pas *d'historique*. Jamais de baisse rétroactive ; stats redérivées. Cohérent avec la complétion hot.

---

## B. GESTION TEMPORELLE & « COLLISIONS »

### B.1 Horloge de référence (inchangé de v1, acté F-7/F-10)

Deadlines (`previewEndsAt`, `answerEndsAt`) sur l'horloge **monotonique** ; persistance en **couple (mono, wall)** (`previewEndsWall`, `answerEndsWall`, `pausedWall` — Ontologie v3 §D.2) ; reconstruction après rechargement `deadlineMono' = performance.now() + (deadlineWall − Date.now())`. Changement de fuseau/DST pendant une session : sans effet (calendrier consulté au boot et à la complétion uniquement).

### B.2 Deadline stricte — règle commune aux deux modes

```
Une soumission est recevable ssi t_submit < answerEndsAt (STRICTEMENT).
Le timeout n'est pas un événement concurrent : il est évalué APRÈS drainage de la file
jusqu'à answerEndsAt inclus. À égalité exacte t == answerEndsAt → le timeout gagne.
```

Appliquée **identiquement** à `answering` (hot) et `listing` (brain) — réponse au point 1 de l'Ontologie §F : oui, deadline stricte idem hot. En brain, une soumission à 59 999 ms validée compte ; à 60 000 ms elle est ignorée et le round se clôt.

### B.3 Pause / reprise (commun)

- Déclencheurs : `visibilitychange → hidden`, `pagehide`, `blur`, rechargement (persistance avec `pausedAt` mono + `pausedWall`).
- Reprise : décalage inconditionnel des deux deadlines de la durée de pause (fidélité F-07, acté v1). Deadline dépassée pendant l'absence (rechargement tardif) : transition forcée — hot : miss ; **brain : clôture du round avec `endReason: 'timeout'`** (les `currentAnswers` déjà acceptées sont conservées et scorées — en brain le temps écoulé n'efface jamais la récolte).
- **Brain :** `currentAnswers` est persisté **à chaque acceptation** (Ontologie §D.2) → la reprise restitue le round à l'identique (réponses, score cumulé, deadline reconstruite, `draft`).

### B.4 Verrous & fenêtres — mode Hot (inchangés de v1)

Garde de phase (`submit` traité uniquement en `answering`) · validation synchrone dans le même tour d'event loop (double soumission = une seule traitée) · spam de rejet idempotent (retry libre, C-04) · correction fuzzy jamais appliquée d'office · draft borné à `config.maxAnswerLength = 256` · soumission vide rejetée muettement.

### B.5 Mode Brain — règles tranchées (réponses aux 7 points de l'Ontologie §F)

#### B.5.1 Transitions de `listing` (point 1)

```
listing --SUBMIT(t), t < answerEndsAt--> validation locale synchrone (B.5.2) → reste en listing
listing --TICK(t), t ≥ answerEndsAt----> clôture du round : endReason='timeout'
listing --ABANDON_ROUND----------------> clôture du round : endReason='abandoned'
listing --ABANDON_SESSION--------------> clôture session : persist(endedBy:'abandoned')
listing --(après acceptation) [currentAnswers.length === sheet.entries.length]
---------------------------------------> clôture anticipée : endReason='sheet-exhausted'
clôture du round --> results.push({…currentAnswers}) ; currentAnswers = [] ;
                     roundIndex < 4 → preview(roundIndex+1) ; roundIndex == 4 → done + persist
```

Ordre des événements à t donné : la file est drainée par ordre d'arrivée ; le TICK de timeout n'est évalué qu'après les SUBMIT antérieurs à la deadline (B.2). Une acceptation qui déclenche `sheet-exhausted` clôt le round **dans le même tour** (pas de fenêtre pour une soumission supplémentaire — il n'y a plus rien à trouver).

#### B.5.2 Sémantique du doublon (point 2 — tranché)

La dédup porte sur **l'entrée de feuille matchée** (identité canonique), jamais sur la chaîne saisie :

```
validateListing(input, sheet, currentAnswers, prefs) :
  n = normalize(input)                                    // 6 étapes, ordre exact (B.6)
  si n == "" → { kind: 'none' }                           // rejet muet
  hit = exactIndex.get(n)                                 // answer + aliases, O(1)
  si hit :
    si hit ∈ entriesDéjàDonnées(currentAnswers)  → { kind: 'duplicate', entry: hit }
    sinon                                        → { kind: 'accept',    entry: hit }
  sinon fuzzy (seuils B.6, unicité exigée) :
    meilleur candidat c :
      si c ∈ entriesDéjàDonnées                  → { kind: 'duplicate', entry: c }   // TRANCHÉ
      sinon                                      → { kind: 'correction', to: c.answer }
    sinon                                        → { kind: 'rejected' }
```

**Un doublon fuzzy-corrigé vers une réponse déjà donnée produit `duplicate`, pas `correction`.** Rationale : la confirmation de la correction mènerait à un doublon de toute façon — deux allers-retours pour un feedback identique ; la dédup douce (game-loop : « jamais punitive ») est plus honnête en un seul message « déjà compté : X ». Le risque résiduel (faux positif fuzzy affiché comme doublon) est borné par la règle d'unicité + seuils courts. `entriesDéjàDonnées` se **déduit** de `currentAnswers` (lookup de chaque `answer` canonique dans l'index de la feuille) — aucun attribut ajouté.

#### B.5.3 Feedback inline (point 3 — tranché)

- **Un seul `lastFeedback`** (conforme au type), dernier écrase le précédent ; l'empilement visuel des gains récents se déduit de la queue de `currentAnswers` (l'UI affiche les k derniers) — pas de file d'événements dans le domaine.
- Expiration par l'UI via `ListingFeedback.at` (constantes de présentation proposées : `accepted` = flash bref, fondu après `BRAIN_TICK_MS` ; `duplicate`/`rejected` = 1 500 ms ; `correction` = persistant jusqu'à action ou prochaine soumission).
- `totals.duplicatesIgnored` : compteur alimenté **à chaque occurrence** de doublon (mesure d'engagement, jamais pénalité — game-loop §A.2). ⚠ Ce compteur n'a **pas d'attribut dans `BrainDiveState`** (il n'existe que dans `BrainCompletion.totals`) → attribut manquant, F-14. En attendant l'arbitrage, la règle est spécifiée : incrément sur chaque `duplicate`, persisté dans la complétion à la clôture.
- Le `draft` est vidé après toute acceptation ; après un `duplicate`/`rejected`, il **reste rempli** (correction rapide — parade UX game-loop « l'input reste rempli »). Préférence `clearRejectedEntry` respectée pour `rejected`.

#### B.5.4 Fin de round `sheet-exhausted` (point 4 — tranché)

**Oui, l'épuisement termine le round en avance**, sans bonus de points :

```
garde post-acceptation : currentAnswers.length === sheet.entries.length
  → clôture immédiate, endReason='sheet-exhausted', transition preview(roundIndex+1)
```

Rationale : (a) les points sont déjà tous encaissés (plafond = Σ feuille) — un bonus double-compterait la performance et casserait la comparabilité du ratio D-19 ; (b) la récompense est **le temps rendu** et la célébration de complétion (feedback dédié, présentation) ; (c) cohérence avec le flow game-loop : amorcer, accélérer, clôturer proprement plutôt que laisser le joueur face à une feuille vide. Le round parfait brain = 100 % de la feuille ; le temps restant n'entre pas dans le score (pas d'attribut de bonus temps — non demandé, non inventé).

#### B.5.5 Abandon (point 5 — tranché)

Deux gestes distincts, deux effets :

- **`ABANDON_ROUND`** (passer le prompt courant) : le round est clos avec `endReason: 'abandoned'`, les `currentAnswers` déjà acceptées sont **conservées et scorées** dans `results`. En hot, l'abandon de round n'existe pas (le round est une seule réponse — l'abandon est forcément de session).
- **`ABANDON_SESSION`** (quitter la partie) : les rounds clos restent dans `results`, le round en cours est clos avec ses `currentAnswers` et `endReason: 'abandoned'`, puis `persist(Completion{ endedBy: 'abandoned' })`.
- **Rejeu d'une daily abandonnée : NON.** Conforme à la FSM Ontologie C.3 (`available → played` sur complétion persistée « completed OU abandoned ») : l'abandon consomme la série du jour. Anti-fishing (sinon on abandonne les mauvaises séries pour retirer). Une session **hors-daily** abandonnée est simplement persistée, sans effet de verrou. Session abandonnée et streak : ne compte pas (A.4).
- Cohérence hot : `ABANDON_SESSION` disponible en `preview`/`answering`/`feedback`, même persistance partielle (rounds joués + round courant = miss si non résolu).

#### B.5.6 Percentile brain (point 6) — tranché en A.6 : ratio en pour mille, `maxScore = 1000`.

#### B.5.7 Streak (point 7) — tranché en A.4 : toute complétion daily `completed`, tout mode, tout thème (D-16) ; abandon exclu.

### B.6 Pipeline de validation (commun, inchangé de v1 — coût borné)

Ordre exact : (1) garde longueur 256 → (2) `normalize` 6 étapes (trim+lowercase+NFC · pliage diacritiques · tirets/apostrophes → espaces · ponctuation · compaction espaces · articles initiaux) → (3) rejet muet si vide → (4) exact O(1) via `Map<normalized, entry>` pré-calculée au chargement (answer + aliases) → (5) fuzzy Damerau, seuil 0/1/2 selon |n| ≤ 4 / ≤ 8 / > 8, filtre longueur, early-exit bandé, **unicité du meilleur candidat exigée** → suggestion, jamais acceptation d'office (I-02, F-9 fuzzy complet). Contrat ≤ 2 000 clés/prompt (F-8) → pire cas < 2 ms, synchrone dans la boucle brain (feedback < 200 ms respecté avec une marge ×100). **F-9 tranché « lisible » : aucun hashage/obfuscation — l'index exact porte sur les formes normalisées en clair** ; l'écart E-2 de v1 (obfuscation) est supprimé, voir §E.

**Déterminisme** : toutes les transitions sont pures de (state, event, bank, config) ; rejeu identique depuis la session sérialisée + log d'événements horodatés ; graines figées (seedSeries / sessionSeed). Anti-triche locale = validation à la lecture + re-dérivation du score ; pas de prétention contre la modification manuelle du localStorage (§E).

---

## C. PSEUDO-CODE (TypeScript de domaine pur — aucune dépendance React/Next)

```ts
// ── Config injectée (GameConfig — Ontologie v3 §B.0) ───────────
// config.modes.hot   = { rounds: 7, previewMs: 3_000, roundMs: 25_000 }
// config.modes.brain = { rounds: 5, previewMs: 3_000, roundMs: 60_000 }

type GameEvent =
  | { type: 'START_SESSION'; mode: GameMode; theme: ThemeId; now: number }
  | { type: 'TICK';  now: number }
  | { type: 'SUBMIT'; now: number; input: string }
  | { type: 'APPLY_CORRECTION'; now: number }
  | { type: 'EDIT_DRAFT'; input: string }
  | { type: 'PAUSE';  now: number }
  | { type: 'RESUME'; now: number }
  | { type: 'FEEDBACK_ACK'; now: number }        // hot uniquement
  | { type: 'ABANDON_ROUND'; now: number }       // brain uniquement
  | { type: 'ABANDON_SESSION'; now: number };

// ── Reducer : pur, jamais de mutation ───────────────────────────
function gameReducer(s: DiveState, ev: GameEvent, ctx: Context): DiveState {
  if (s.pausedAt !== undefined)                        // gelé : seul RESUME passe
    return ev.type === 'RESUME' ? resume(s, ev.now) : s;
  if (ev.type === 'PAUSE' && s.phase !== 'done' && s.phase !== 'intro')
    return { ...s, pausedAt: ev.now };
  if (ev.type === 'ABANDON_SESSION' && s.phase !== 'done' && s.phase !== 'intro')
    return abandonSession(s, ctx);                     // B.5.5 — commun aux deux modes
  return s.mode === 'hot' ? hotReducer(s, ev, ctx) : brainReducer(s, ev, ctx);
}

// ── HOT (inchangé de v1, constantes via config) ─────────────────
function hotReducer(s: HotDiveState, ev, ctx): HotDiveState {
  switch (s.phase) {
    case 'intro':
      return ev.type === 'START_SESSION'
        ? { ...s, phase: 'preview', previewEndsAt: ev.now + ctx.config.modes.hot.previewMs,
            answerEndsAt: null, draft: '', correction: null, rejected: null } : s;
    case 'preview':
      return (ev.type === 'TICK' && ev.now >= s.previewEndsAt!)
        ? { ...s, phase: 'answering',
            answerEndsAt: s.previewEndsAt! + ctx.config.modes.hot.roundMs } : s;
    case 'answering': {
      if (ev.type === 'EDIT_DRAFT') return { ...s, draft: ev.input.slice(0, 256) };
      if ((ev.type === 'SUBMIT' || ev.type === 'APPLY_CORRECTION') && ev.now < s.answerEndsAt!) {
        const input = ev.type === 'APPLY_CORRECTION' ? s.correction!.to : ev.input;
        const v = validateAnswer(input, ctx.sheet(s), ctx.prefs);          // B.6
        if (v.kind === 'accept')
          return { ...s, phase: 'feedback', rejected: null, correction: null,
            results: [...s.results, { promptId: ctx.prompt.id, promptText: ctx.prompt.text,
              rawAnswer: input, answer: v.entry.answer, tier: v.entry.tier,
              score: TIER_POINTS[v.entry.tier], quip: v.entry.quip }] };
        if (v.kind === 'correction')
          return { ...s, correction: { from: input, to: v.to }, rejected: input };
        return { ...s, rejected: input, correction: null };                 // retry libre
      }
      if (ev.type === 'TICK' && ev.now >= s.answerEndsAt!)
        return { ...s, phase: 'feedback', correction: null,
          results: [...s.results, { promptId: ctx.prompt.id, promptText: ctx.prompt.text,
            rawAnswer: s.draft?.trim() || null, answer: null, tier: null, score: 0 }] };
      return s;                                                              // SUBMIT tardif ignoré
    }
    case 'feedback':
      return ev.type === 'FEEDBACK_ACK' ? advanceHot(s, ctx) : s;
    case 'done': return s;
  }
}
function advanceHot(s: HotDiveState, ctx): HotDiveState {
  return s.roundIndex < ctx.config.modes.hot.rounds - 1
    ? { ...s, roundIndex: s.roundIndex + 1, phase: 'preview',
        previewEndsAt: ctx.now + ctx.config.modes.hot.previewMs, answerEndsAt: null,
        draft: '', correction: null, rejected: null }
    : completeHot(s, ctx);                    // persist HotCompletion → done
}

// ── BRAIN (nouveau — règles §B.5) ───────────────────────────────
function brainReducer(s: BrainDiveState, ev, ctx): BrainDiveState {
  const cfg = ctx.config.modes.brain;
  switch (s.phase) {
    case 'intro':
      return ev.type === 'START_SESSION'
        ? { ...s, phase: 'preview', previewEndsAt: ev.now + cfg.previewMs,
            answerEndsAt: null, draft: '', lastFeedback: null } : s;
    case 'preview':
      return (ev.type === 'TICK' && ev.now >= s.previewEndsAt!)
        ? { ...s, phase: 'listing', answerEndsAt: s.previewEndsAt! + cfg.roundMs,
            currentAnswers: [], lastFeedback: null } : s;
    case 'listing': {
      if (ev.type === 'EDIT_DRAFT') return { ...s, draft: ev.input.slice(0, 256) };
      if (ev.type === 'ABANDON_ROUND') return closeBrainRound(s, ctx, 'abandoned');

      if (ev.type === 'SUBMIT' || ev.type === 'APPLY_CORRECTION') {
        if (ev.now >= s.answerEndsAt!) return closeBrainRound(s, ctx, 'timeout'); // B.2
        const input = ev.type === 'APPLY_CORRECTION' ? s.lastFeedback!.to! : ev.input;
        const v = validateListing(input, ctx.sheet(s), s.currentAnswers, ctx.prefs);
        const roundStart = s.answerEndsAt! - cfg.roundMs;
        switch (v.kind) {
          case 'accept': {
            const a: AcceptedAnswer = { rawAnswer: input, answer: v.entry.answer,
              tier: v.entry.tier, score: TIER_POINTS[v.entry.tier],
              at: ev.now - roundStart, viaCorrection: ev.type === 'APPLY_CORRECTION' };
            const s2 = { ...s, draft: '', currentAnswers: [...s.currentAnswers, a],
              lastFeedback: { kind: 'accepted', input, score: a.score, at: ev.now } };
            ctx.persistCurrentAnswers(s2);                       // reprise en pleine liste
            return s2.currentAnswers.length === ctx.sheet(s).entries.length
              ? closeBrainRound(s2, ctx, 'sheet-exhausted')      // B.5.4 — même tour
              : s2;
          }
          case 'duplicate':
            return { ...s, /* draft conservé */ duplicatesIgnored: s.duplicatesIgnored + 1,
              lastFeedback: { kind: 'duplicate', input, at: ev.now } };
          case 'correction':
            return { ...s, lastFeedback: { kind: 'correction', input, to: v.to, at: ev.now } };
          case 'rejected':
            return { ...s, draft: ctx.prefs.clearRejectedEntry ? '' : s.draft,
              lastFeedback: { kind: 'rejected', input, at: ev.now } };
          case 'none': return s;
        }
      }
      if (ev.type === 'TICK' && ev.now >= s.answerEndsAt!)
        return closeBrainRound(s, ctx, 'timeout');
      return s;
    }
    case 'done': return s;                                       // pas de 'feedback' en brain
  }
}

function closeBrainRound(s: BrainDiveState, ctx, reason: RoundEndReason): BrainDiveState {
  const r: BrainRoundResult = { promptId: ctx.prompt.id, promptText: ctx.prompt.text,
    answersGiven: s.currentAnswers,
    score: s.currentAnswers.reduce((Σ, a) => Σ + a.score, 0), endReason: reason };
  const s2 = { ...s, results: [...s.results, r], currentAnswers: [], draft: '',
    lastFeedback: null, duplicatesIgnored: s.duplicatesIgnored };               // cumul session (F-14 résolu, Ontologie v3.1)
  const cfg = ctx.config.modes.brain;
  return s2.roundIndex < cfg.rounds - 1
    ? { ...s2, roundIndex: s2.roundIndex + 1, phase: 'preview',
        previewEndsAt: ctx.now + cfg.previewMs, answerEndsAt: null }
    : completeBrain(s2, ctx);      // persist BrainCompletion{ totals: { answersAccepted,
}                                  //   duplicatesIgnored: s.duplicatesIgnored }, endedBy: 'completed' }

function abandonSession(s: DiveState, ctx): DiveState {
  // hot : round courant non résolu → clos en miss si 'answering' ; brain : clos 'abandoned'
  // persist Completion{ endedBy: 'abandoned', rounds partiels } → phase 'done'
}

// Machine temporelle (façade, commune) :
function deadline(s: DiveState): number | null {
  return s.phase === 'preview' ? s.previewEndsAt
       : (s.phase === 'answering' || s.phase === 'listing') ? s.answerEndsAt : null;
}
function resume(s: DiveState, now: number): DiveState {           // couple mono/wall, B.3
  const d = now - s.pausedAt!;
  return { ...s, pausedAt: undefined,
    previewEndsAt: s.previewEndsAt == null ? null : s.previewEndsAt + d,
    answerEndsAt:  s.answerEndsAt  == null ? null : s.answerEndsAt  + d };
}

// validateAnswer (hot) : B.6 — exact → accept | correction | rejected
// validateListing (brain) : B.5.2 — accept | duplicate | correction | rejected | none
// updateStreak : A.4 · recomputeCompletion : A.7 · seedDaily / drawThemed : A.5
// computeVerdict : bandes ScoreBand sur score (hot) ou sur ratio × 700 (brain — A.6)
```

**Gardes récapitulatives** : `pausedAt` gèle tout sauf `RESUME` · `SUBMIT` hors phase ignoré · deadline stricte (B.2) · `sheet-exhausted` clôt dans le même tour que l'acceptation · `FEEDBACK_ACK` n'existe qu'en hot · `ABANDON_ROUND` n'existe qu'en brain · doublon = identité d'entrée, jamais chaîne saisie · correction jamais appliquée d'office · `currentAnswers` persisté à chaque acceptation · complétion idempotente (`done` absorbe tout).

---

## D. CAS TESTS THÉORIQUES

**T-01 → T-20 (v1) restent valides mutatis mutandis** (renommages : dive→session, « abysse »→`hotbrain`, Plankton…→t1…t6, mètres→°C, `EPOCH_DATE`→`config.epochDate`, unlimited→sessions hors-daily à la carte). Les invariants qu'ils couvrent (retry libre, deadline stricte ±1 ms, double soumission, pause/reprise, DST ×2, minuit NY, rechargement ±deadline, fuzzy limites/ambiguïté, recalcul D-03 hot, déterminisme du seed) sont **inchangés**.

### Cas Brain & multi-thèmes (nouveaux)

**T-21 — Doublon exact par alias** → listing, « Paris » acceptée · SUBMIT(« paris ») (alias de la même entry) → `{kind:'duplicate'}`, `currentAnswers` inchangé, score inchangé, draft conservé, compteur doublons +1.

**T-22 — Doublon fuzzy-corrigé vers une réponse déjà donnée** → listing, « Strasbourg » acceptée · SUBMIT(« strasbourge », distance 1, unique) → **`duplicate`** (pas `correction`) — la cible est déjà récoltée (B.5.2).

**T-23 — Timeout en pleine saisie (draft non vide)** → listing(answerEndsAt=63000), 3 acceptées, draft=« mozar » · TICK(t=63000) → round clos `endReason:'timeout'`, `results` reçoit les 3 acceptées scorées, draft perdu (non persisté dans `BrainRoundResult`), transition preview round suivant.

**T-24 — Épuisement de feuille** → feuille de 12 entrées ; à la 12ᵉ acceptation (t=41 200 < answerEndsAt) → clôture **dans le même tour**, `endReason:'sheet-exhausted'`, score = plafond du prompt, **aucun bonus**, preview suivante. Un SUBMIT ultérieur est ignoré (phase ≠ listing).

**T-25 — Rechargement à t = 30 s en pleine liste** → listing(answerEndsAt=63000 mono, persisté wall), 4 acceptées · rechargement +30 s wall → reconstruction : deadline' = perf.now + 30 000, `currentAnswers` (4) restitué à l'identique, score cumulé intact · RESUME → le round se poursuit normalement.

**T-26 — Abandon round vs session** → (a) listing round 2, 2 acceptées · ABANDON_ROUND → round clos `endReason:'abandoned'`, 2 acceptées conservées, preview round 3. (b) ABANDON_SESSION en round 3 → complétion persistée `endedBy:'abandoned'` avec 2 rounds clos + round 3 clos partiel ; daily marquée `played`, **non rejouable**, streak non alimenté.

**T-27 — Ratio de partage brain** → série de plafonds 320/280/410/350/370 = 1 540 ; score 1 078 → partage « 1 078 °C · 70 % de la feuille » ; `bucket = floor(1000 × 1078/1540) = 700` → percentile lu sur `buckets[1001]` brain.

**T-28 — Streak croisé Hot+Brain (D-16)** → historique : hot complétée le jour N, brain complétée le jour N+1 (tout autre couple symétrique) → streak = 2. Contre-cas : jour N+2 avec seulement une session **abandonnée** → dates valides s'arrêtent à N+1 → si on évalue le jour N+3, streak = 0 (chaîne morte, abandon ≠ complétion).

**T-29 — Sélection multi-thèmes déterministe** → seedDaily('geography','hot',42) sur deux moteurs → mêmes 7 ids, même ordre · seedDaily('geography','brain',42) ≠ série hot (graine composite) mais reproductible · seedDaily('general','hot',42) ∩ banque('geography') = ∅ structurellement (banques disjointes).

**T-30 — Général ∩ thème = ∅ au validateur** → banque soumise avec un promptId présent en 'general' et 'history' → **rejet au chargement** (erreur de contenu, liste des ids fautifs) ; aucune session ne démarre sur une banque invalide.

**T-31 — Soumission brain à t = answerEndsAt exactement** → listing(answerEndsAt=63000) · SUBMIT(t=63000, valide) → non recevable (B.2 strict) → round clos `timeout`. Symétrique : SUBMIT(t=62999, valide) → acceptée.

**T-32 — Recalcul D-03 brain** → BrainCompletion v3 : a1{tier:t3, score:30}, a2{tier:t5, score:85}. Feuille v4 : entry de a1 reclassée t3→t4 ; entry de a2 disparue. → recompute : a1{t4, 60}, a2 conservée {t5, 85} (F-6), score round +30, `contentVersion`=4, stats redérivées. Jamais de baisse.

**T-33 — Correction fuzzy acceptée en brain** → SUBMIT(« beethoven ») alors que l'entry est « Beethoven » déjà… non : SUBMIT(« beetoven ») → `correction{to:'Beethoven'}` (feedback persistant) · APPLY_CORRECTION → `AcceptedAnswer{viaCorrection:true, tier de l'entry}` · re-SUBMIT(« beetoven ») → correction à nouveau proposée (pas de mémoire négative) ou duplicate si entretemps acceptée.

**T-34 — Épuisement de banque à la carte** → thème 'sports-leisure', banque 20 prompts, historique hors-daily = 14 ids vus · drawThemed(…, n=5) → pool=6 ≥ 5, tirage seedé par sessionSeed sans aucun des 14 · second tirage après complétion (19 vus) → pool=1 < 5 → **remise totale** (pool=20), cycle neuf, jamais de doublon intra-session.

---

## E. ÉCARTS ASSUMÉS AVEC L'ORIGINAL

| # | Original | HotBrain v2 | Justification |
|---|---|---|---|
| E-1 | Validation serveur, feuilles jamais distribuées avant la fin | Validation locale synchrone, feuilles embarquées | Offline-first ; supprime grâce réseau 4 s et timeout 6,5 s. |
| E-2 | Feuilles serveur inaccessibles | **Feuilles en clair** — F-9 TRANCHÉ par l'utilisateur (lisible + fuzzy complet) ; toute obfuscation/hashage **supprimée** du schéma et de ce livrable | Décision produit assumée : la protection du contenu repose sur le droit (D-01), pas sur l'opacité technique. Aucune prétention anti-extraction. |
| E-3 | Percentile serveur | Distribution embarquée versionnée + copie lissée locale, par mode ; brain en ratio ‰ | Offline-first ; honnêteté statistique (bornes 1–99 %). |
| E-4 | 7 prompts × 25 s, un seul mode quotidien | Hot 7×25 s (hérité) **+ Brain 5×60 s** (D-11), multi-thèmes (D-07) | Décisions utilisateur 2026-11-09. |
| E-5 | Pause = décalage inconditionnel | Inchangé (F-07) | Fidélité ; exploit local sans victime. |
| E-6 | Streak = daily unique | Streak = toute complétion daily (tout mode/thème), abandon exclu | D-16. |

---

## F. DEMANDES À L'ORCHESTRATEUR (attributs manquants, contradictions, arbitrages)

**Attributs manquants (règle d'abstraction — je n'ai pas inventé) :**
- **F-11 — Validation de la règle « abandon ≠ streak »** (A.4). D-16 dit « toute complétion quotidienne compte » ; j'ai tranché que `endedBy:'abandoned'` n'est pas une complétion pour le streak (anti-farming). Si l'orchestrateur veut l'inverse, la garde se retire — aucune autre conséquence.
- **F-12 — Disjonction stricte hot ∩ brain intra-jour ?** D-20 impose des *séries indépendantes* (graines distinctes — fait), mais n'interdit pas qu'un même prompt apparaisse le même jour en hot et en brain par hasard de tirage. Faut-il un filtre post-tirage ? (Coût : cas dégénéré si banque petite ; recommandation : non.)
- **F-13 — Percentile brain sur ratio uniquement** (A.6). Le partage D-19 affiche absolu + ratio ; le percentile n'utilise que le ratio. Si l'orchestrateur préfère un percentile sur score absolu par thème, la table `buckets` doit être re-dimensionnée (plafond variable → une table par série, rejeté : explosion de tables pour des séries quotidiennes).
- **F-14 — ~~Attribut manquant~~ RÉSOLU (Ontologie v3.1)** : `duplicatesIgnored: number` ajouté à `BrainDiveState`, **cumul session** (aligné sur `totals`), pseudo-code ci-dessus mis à jour.
- **F-15 — ~~Attribut manquant~~ RÉSOLU (Ontologie v3.1)** : `ceiling: number` ajouté à `BrainCompletion`, figé à la complétion — le ratio D-19 survit à la purge du cache (14 j) et au recalcul D-03.

**Incohérences inter-livrables (signalées, non réparées) :**
- **F-16 — DECISIONS.md incomplet** : le journal s'arrête à D-13 ; D-14→D-20 (paliers, jalons, streak, cap Brain, rafraîchissement thèmes, partage brain, séries) n'apparaissent que dans la table du WSD v0.7. Le journal est la piste d'audit — à compléter.
- **F-17 — WSD §3 : C-05 encore « Ouvert »** alors que D-05 est tranché (piège confirmé). Table des contradictions à clore.
- **F-18 — WSD §6 « points clés » décrit Ontologie v1 / Game Loop v1** (namespace « abysse », 7 paliers Krillion…) — obsolète après v3/v2.
- **F-19 — WSD §8 point 5 : « minuit Europe/Paris proposé (D-13 provisoire) »** alors que D-13 est tranché NY (réponse utilisateur, nuit du 2026-11-09). Section risques à rafraîchir.
- **F-20 — Ontologie v3 §E et §B.9 traitent comme ouvertes des questions déjà tranchées** : « séries partagées hot/brain ? » (tranché par D-20 : indépendantes) et le commentaire de `PlayerStats.currentStreak` (« périmètre à confirmer » — tranché par D-16). Commentaires à purger pour éviter une double source de vérité.
- **F-21 — Labels de paliers : WSD §1.7 propose « Déjà Vu » (15), D-14 (table WSD) acte « Réchauffé », Game Loop v2 Q5 demande encore validation de « Réchauffé ».** Je considère D-14 comme la décision (Réchauffé, t2) — labels jamais persistés donc renommage sans coût, mais Q5 devrait être soldée côté Game Loop.
- **F-22 — Bandes de verdict brain** : `ScoreBand.min` est calibré sur 700 (hot). Pour brain, j'applique les bandes au **ratio × 700** (même grille, même ressenti) — à acter ; si l'orchestrateur préfère des bandes brain dédiées, c'est une donnée de contenu (verdicts), pas de mécanique.

---

## SYNTHÈSE POUR L'ORCHESTRATEUR

1. Mode Brain intégralement spécifié : deadline stricte identique à hot, doublon = identité d'entrée (fuzzy vers déjà-donné → `duplicate`), feedback inline mono-slot expiré par l'UI, `sheet-exhausted` = clôture anticipée sans bonus (récompense = temps rendu), abandon de round conserve la récolte, abandon de session consomme la daily.
2. Sélection généralisée : seed FNV-1a(theme:mode:dayNumber) + mulberry32 + Fisher–Yates — séries hot/brain indépendantes par construction (D-20) ; thèmes à la carte = sans remise persistant redérivé de l'historique, remise totale à épuisement.
3. Streak = toute complétion daily `completed`, tout mode/thème (D-16) ; abandon exclu (F-11 à valider) ; zéro réparation.
4. Percentile brain tranché : ratio score/plafond en pour mille (table 1001 buckets) — même langue que le partage D-19.
5. Recalcul D-03 étendu à brain : re-validation par `rawAnswer`, monotonie stricte, fusion d'entrées = les deux gardent leurs points.
6. Thermomètre : 1 pt = 1 °C paramétré ; brain = ticks ≤ 250 ms (cible 180), hot = montée bornée [600, 2 400] ms — constantes de présentation pour Spécification.
7. 14 cas tests ajoutés (T-21→T-34) ; T-01→T-20 confirmés valides après renommage.
8. Deux attributs manquants bloquants pour la complétion brain : compteur de doublons en session (F-14) et plafond persisté (F-15).
9. Sept incohérences de propagation remontées (F-16→F-22), dont DECISIONS.md privé des entrées D-14→D-20 — aucune réparée de mon chef.
