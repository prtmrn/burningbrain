# World State Document — Projet « HotBrain » (inspiré de Krillion)
**Version :** 1.4 · **Date :** 2026-11-10 · **Maintenu par :** Orchestrateur
**Règle d'or :** ce document est la source unique de vérité. Tout agent subordonné lit le WSD avant de produire et ne peut affirmer un fait que s'il est consigné ici ou dans son livrable rattaché. Toute contradiction remonte à l'orchestrateur (voir `DECISIONS.md`).

**Historique :** v0.1 recon externe · v0.2 décisions D-01→D-04 + stack · v0.3 retour des agents Ontologie & Game Loop (corrections factuelles majeures issues des chunks JS de production) · v0.4 livrables Mécaniques & Spécification · v0.5 rebranding **HotBrain** (thermomètre), multi-thèmes (7 thèmes), second jeu Football à part

---

## 1. Faits établis

### 1.1 Nature du jeu
- Jeu de **trivia quotidien en navigateur** (pas un .io temps réel).
- Développeur solo (« kp »), lancé le 2026-07-09. Session ≈ 3 min. Jouable sans compte.

### 1.2 Boucle de jeu — **corrigé v0.3 (preuve : chunks JS de production)**
- **Daily Dive** : 7 prompts ouverts identiques pour tous. Reset **minuit America/New_York** ; calendrier ancré sur `EPOCH_DATE = 2026-07-16` (vérifié : 2026-11-08 = plongée n° 116, conforme aux archives fan).
- **Timer** : `ANSWER_MS = 25000` → **25 s exactement** par prompt, précédées d'une **preview de 3 s** (`PREVIEW_MS = 3000`) hors chrono.
- **Réponse refusée ≠ 0 point immédiat** : le joueur **retente librement dans les 25 s** ; le round ne vaut 0 qu'au timeout. (Corrige l'erreur du WSD v0.1.)
- **Score → profondeur** : 1 point = 10 m. Max 700 pts = 7 000 m.
- FSM réelle : `intro → preview → answering → feedback → done`, avec pause/reprise temporelle (`pausedAt`) et reprise après rechargement de page.
- Bandes de verdict final : 0–150 / 151–250 / 251–350 / 351–449 / 450+.
- Streak calculé sur jours NY consécutifs. Percentile affiché (« better than X % of divers »).

### 1.3 Rareté & scoring — **corrigé v0.3 (preuve : table TIERS du chunk)**
- Grille exacte des 6 paliers :

| Palier | Points | Rôle |
|---|---|---|
| Plankton | 10 | réponse la plus évidente |
| **Too Clever** | 15 | **palier-piège** : l'obscur que tout le monde tente |
| Schooler | 30 | courant mais pas trivial |
| Rare | 60 | peu fréquent |
| Deep Cut | 85 | très obscur |
| One in a Krillion | 100 | choisi aussi pour le *fun factor* (FAQ officielle), pas la rareté pure |

- Chaque prompt possède une **answer sheet curée, potentiellement très grande** (« thousands of accepted answers » pour certains prompts — FAQ officielle ; corrige le « 15–25 » du WSD v0.1), avec alias et tolérances de saisie (casse, diacritiques, ponctuation, articles).
- La rareté est curée (familiarité + jugement manuel), pas calculée en direct. **Mais** l'écran de fin re-note les résultats stockés contre `/api/reveal` et les complétions portent un champ `version` → le recalcul progressif (notre D-03) existe en germe.
- Anti-triche : les feuilles de réponses ne quittent le serveur qu'après la partie (`/api/reveal`).

### 1.4 Modes & produit — **corrigé v0.3**
- Daily Dive (gratuit, 1/jour), **Unlimited payant (~5 $ one-shot, retire les pubs — CTA « UNLOCK UNLIMITED · $5 »)**, Puffer Party (`/party`), Archive payante (`/archive`), Themed packs (`/packs`), My Krillion (`/account`), Friends (`/friends`).
- Personnalisation : personnage puffer sélectionnable/déblocable, **mode daltonien appliqué avant hydratation** via localStorage, préférence son persistée.
- Persistance locale : progression invité, partie en cours, préférences, personnage, id joueur aléatoire, jetons d'achat. Sync Google optionnelle. Validation stricte des données à la lecture (pattern observé dans le code).
- Partage social : n° de plongée + score + rangée d'emoji anti-spoiler (façon grille Wordle verticale).

### 1.5 Stack technique de l'original
- **Next.js (App Router, Turbopack) + React, prérendu statique, hébergé Vercel.** TypeScript inféré. GA4. Routes : `/`, `/unlimited/classic`, `/party`, `/archive`, `/packs`, `/account`, `/friends`, `/faq`, `/privacy`. Assets : `/tiers/*.png`, `/gen/party/puffer-*.png`.

---

### 1.7 Scope produit HotBrain (v0.5)
- **Nom :** HotBrain. **Métaphore :** thermomètre — chaque point fait monter la température, 700 pts = 700 °C (lave). Direction opposée à Krillion (on monte, pas on descend) → identité visuelle propre.
- **7 thèmes de prompts :** Général · Géographie (pays, capitales, fleuves, montagnes, monuments, cartographie) · Divertissement/Spectacle (cinéma, musique, TV, théâtre, show-business) · Histoire (événements, personnages, guerres, civilisations, dates) · Arts & Littérature (livres, auteurs, peinture, sculpture, poésie, philosophie) · Sciences & Nature (biologie, physique, chimie, astronomie, règne animal et végétal) · Sports & Loisirs (disciplines, compétitions, jeux, records, loisirs).
- **Jeu séparé :** application Football standalone (D-08), moteur partagé.
- **Paliers à renommer** sur le thème thermique — **D-14 tranché** : Tiède (10) · **Réchauffé** (15, palier-piège) · Chaud (30) · Brûlant (60) · Incandescent (85) · Fusion (100).

### 1.8 Les deux modes de HotBrain (v0.6 — D-04, D-11, D-12)
- **Mode « Hot » (rareté)** — l'héritier de Krillion : 7 prompts, 25 s par prompt (+ preview 3 s), **une** réponse par prompt, score = rareté (grille 10/15/30/60/85/100, palier-piège inclus), max 700 pts = 700 °C.
- **Mode « Brain » (liste)** — même banque, autre muscle cognitif : **5 prompts × 60 s**, on enchaîne un maximum de réponses valides ; chaque réponse acceptée rapporte **ses points de rareté** (une obscure vaut 85, une évidente 10), doublons ignorés avec feedback, la température monte à chaque validation. Score plafond = somme des points de la feuille (variable par prompt).
- **Partage** : mêmes banques pour les deux modes ; un prompt thématique n'apparaît jamais en Général (D-10) ; **séries Hot/Brain indépendantes** (D-20 — jouer l'un ne spoile pas l'autre).
- **Quotidienneté** : reset minuit America/New_York (D-13). **Hot et Brain ont chacun un Daily + un Illimité** (D-17) ; seul le Général a une série quotidienne fraîche (D-18), les 6 thèmes sont servis en illimité depuis leur banque statique (tirage sans remise persistant, remise totale à épuisement).
- **Paliers (D-14)** : Tiède 10 · Réchauffé 15 (piège) · Chaud 30 · Brûlant 60 · Incandescent 85 · Fusion 100. **Jalons (D-15 provisoire)** : 0 / 29,8 / 37 / 56,7 / 100 / 180 / 233 / 450 / 700 °C.
- **Insights Game Loop Brain** : thermomètre = barre de progression liquide (feedback < 200 ms, pitch sonore croissant avec le palier) ; dédup douce jamais punitive ; entrées Tiède/Chaud larges pour amorcer le flow ; Hot = pensée convergente, Brain = pensée divergente (duo complémentaire).

## 2. Décisions (journal complet dans `DECISIONS.md`)

| # | Question | Statut | Décision |
|---|----------|--------|----------|
| D-01 | Fidélité | TRANCHÉ | Jeu inspiré, contenu 100 % original |
| D-02 | Stack | TRANCHÉ | Même stack : Next.js + React + TypeScript, Vercel |
| D-03 | Rareté | TRANCHÉ | Hybride : listes curées + recalcul progressif (champ `contentVersion`) |
| D-04 | Modes de jeu | **REMPLACÉ (2026-11-09, utilisateur)** | Pas de Daily/Unlimited : **deux modes sur les mêmes banques** — (1) mode rareté façon Krillion, (2) mode « liste » : donner le plus de réponses possibles. Deux noms de modes distincts |
| D-05 | Palier-piège | **TRANCHÉ (2026-11-09, utilisateur)** | **Oui** — palier-piège conservé (nom thermique à finaliser) |
| D-06 | Métaphore & nom | **TRANCHÉ (2026-11-09, utilisateur)** | **« HotBrain »** — la jauge est un **thermomètre** : le score FAIT MONTER la température (fini l'océan). Le namespace « abysse » est caduc → renommer en `hotbrain` dans tous les livrables |
| D-07 | Multi-thèmes | **TRANCHÉ (2026-11-09, utilisateur)** | 7 thèmes : Général (≈ Krillion), Géographie, Divertissement/Spectacle, Histoire, Arts & Littérature, Sciences & Nature, Sports & Loisirs |
| D-08 | Second jeu Football | **TRANCHÉ (2026-11-09, utilisateur)** | Un jeu **complètement à part**, football uniquement. Décision orchestrateur (réversible) : application séparée, **même moteur de domaine réutilisé** (le domaine TS pur est thème-agnostique par construction) |
| D-09 | Échelle thermomètre | **PROVISOIRE (réversible)** | 1 pt = 1 °C, jauge 0 → 700 °C, jalons réels : 37 °C corps humain, 100 °C eau bouillante, 233 °C papier brûle, 700 °C lave |
| D-10 | Structure des thèmes | **TRANCHÉ (2026-11-09, utilisateur)** | **Général = tous types de questions** (pas limité aux 6 thèmes) ; thèmes à la carte = banques **distinctes** de Général (pas de recouvrement) |
| D-11 | Design du mode « liste » | **TRANCHÉ (2026-11-09, utilisateur)** | **5 prompts × 60 s**, points de rareté par réponse (les réponses rares rapportent plus), doublons ignorés |
| D-12 | Noms des deux modes | **TRANCHÉ (2026-11-09, utilisateur)** | **« Hot »** (rareté) / **« Brain »** (liste) |
| D-13 | Fuseau du reset quotidien | **TRANCHÉ (2026-11-09, utilisateur)** | Minuit **America/New_York** (comme Krillion — la formule du Mécaniques reste valide, seul l'epoch change : date de lancement HotBrain, à fixer) |
| D-14 | Paliers thermiques | **TRANCHÉ (2026-11-09, orchestrateur)** | Tiède (10) · **Réchauffé** (15, piège) · Chaud (30) · Brûlant (60) · Incandescent (85) · Fusion (100). IDs stables `t1..t6`, labels jamais persistés (renommage trivial) |
| D-15 | Jalons de température | **PROVISOIRE (orchestrateur, réversible)** | 0 °C gel · 29,8 °C gallium (easter egg) · 37 °C corps humain · 56,7 °C record Death Valley · 100 °C ébullition · 180 °C friture · 233 °C papier brûle · 450 °C four à pizza · 700 °C lave |
| D-16 | Périmètre du streak | **TRANCHÉ (orchestrateur)** | Toute complétion quotidienne compte (Hot ou Brain, tout thème) — stats détaillées dérivées par mode/thème |
| D-17 | Disponibilité des modes | **TRANCHÉ (2026-11-09, utilisateur)** | Hot ET Brain ont chacun un mode **Daily** ET un mode **Illimité** (4 combinaisons) |
| D-18 | Rafraîchissement quotidien par thème | **TRANCHÉ (2026-11-09, utilisateur)** | Daily **Général seul** ; les 6 thèmes puisent dans une banque statique à la carte (illimité) |
| D-19 | Partage du score Brain | **TRANCHÉ (orchestrateur)** | Score absolu + ratio score/plafond du jour (plafond variable par feuille — comparabilité assurée) |
| D-20 | Séries Hot/Brain | **TRANCHÉ (orchestrateur)** | Séries indépendantes (pas de spoil croisé) ; `DailyContent` identifié par (thème, mode, date) — les deux options restent supportées par le schéma |
| F-9 | Protection des answer sheets | **TRANCHÉ (2026-11-09, utilisateur)** | **Lisible + tolérance aux fautes de frappe** (fuzzy complet) |

## 3. Contradictions

| # | Contradiction | Statut | Résolution |
|---|---------------|--------|------------|
| C-01 | Reset NY vs UTC | **CLOS (code)** | Minuit America/New_York, `EPOCH_DATE = 2026-07-16` |
| C-02 | Timer 15/20/25 s | **CLOS (code)** | 25 s + preview 3 s |
| C-03 | Plankton 5 vs 10 pts | **CLOS (code)** | 10 pts ; grille 10/15/30/60/85/100 |
| C-04 | Refus = 0 immédiat vs retry libre | **CLOS (code)** | Retry libre dans les 25 s ; 0 seulement au timeout |
| C-05 | Faut-il un palier-piège dans notre jeu ? | **CLOS** | Oui — D-05 (utilisateur), nommé « Réchauffé » (D-14) |

## 4. Contraintes légales
- Mécaniques non protégeables ; **nom, prompts, listes de réponses, textes et assets Krillion protégés** → contenu 100 % original (D-01). Les paliers seront renommés ; la structure d'échelle (6 niveaux) est réutilisable.

## 5. État des agents

| Agent | Statut | Livrable |
|-------|--------|----------|
| Orchestrateur | Actif | `wsd/WSD.md` v0.7, `wsd/DECISIONS.md` |
| Ontologie | ✅ v3.1 (F-14/F-15 résolus, PlayKind daily/unlimited) | `livrables/ontologie.md` |
| Game Loop | ✅ v2 (thermomètre, Brain, paliers thermiques, jalons) | `livrables/game-loop.md` |
| Mécaniques | ✅ v2 (règles Brain, multi-thèmes, 34 cas tests) | `livrables/mecaniques.md` |
| Spécification | ✅ v2 (monorepo, 81 tests, jalons M1→M6) | `livrables/spec.md` |

## 6. Livrables des agents — points clés à ne pas perdre

**Ontologie (v3)** : unions discriminées par mode (`DiveState`/`Completion` hot vs brain) ; `BrainDiveState` avec `currentAnswers` persisté à chaque acceptation (reprise en pleine liste) ; `AcceptedAnswer`, `BrainRoundResult` (`timeout | sheet-exhausted | abandoned`), `ListingFeedback` (`accepted | duplicate | rejected | correction`) ; `ThemeId` extensible (moteur thème-agnostique → jeu Football) ; invariant validateur `banque(general) ∩ banque(t) = ∅` ; `PlayerStatsBreakdown { overall, byMode, byTheme }` ; `GameConfig` (epochDate, timezone, timers) ; labels de paliers dans une table séparée, jamais persistés ; namespace `hotbrain:*`, zéro migration (terrain vierge) ; F-9 appliqué (feuilles en clair).

**Game Loop (v2)** : paliers Tiède/Réchauffé/Chaud/Brûlant/Incandescent/Fusion ; jalons 0/29,8/37/56,7/100/180/233/450/700 °C ; Brain : thermomètre = combo meter liquide (feedback < 200 ms, pitch croissant), dédup douce, entrées Tiède/Chaud larges pour amorcer le flow ; Hot = pensée convergente, Brain = divergente (duo complémentaire) ; risques R1–R5 (Général = board canonique du partage social ; identité de thème sur le chrome uniquement, jamais sur la jauge).

## 7. Arbitrages F remontés par Mécaniques (tranchés par l'orchestrateur sauf mention)

- F-1 (graine Unlimited) → **RÉSOLU** : `sessionSeed` ajouté à `DiveState` (Ontologie v2).
- F-2 (durées d'animation) → constante de présentation, renvoyé à l'agent Spécification.
- F-3 (distribution percentile) → **RÉSOLU** : `ReferenceDistribution` + `LocalReferenceDistribution` (Ontologie v2, source statique versionnée + copie lissée en localStorage).
- F-4 (streak sans réparation) → retenu : politique « zéro réparation », stats purement dérivées.
- F-5 (anti-répétition inter-jours) → reporté à la phase curation de contenu (pas un attribut d'état).
- F-6 (réponse disparue d'une feuille) → conservation du palier joué, `Completion.contentVersion` = dernière version appliquée, pas de remontée rétroactive.
- F-7/F-10 (pause longue, persistance horloges) → deadlines persistées en couple (mono, wall) (Ontologie v2 §D.2).
- F-8 (≤ 2 000 clés/prompt) → contrat de curation inscrit sur `AnswerSheet.entries`.
- F-9 (anti-data-mining) → **TRANCHÉ (utilisateur)** : lisible + fuzzy complet.

**Mécaniques (v2)** : règles Brain complètes (dédup sur identité canonique — un alias d'une réponse déjà donnée = doublon ; fuzzy vers entrée déjà récoltée = `duplicate` direct ; deadline stricte 60 s ; sheet-exhausted = fin anticipée sans bonus ; abandon = daily consommée, streak non alimenté ; percentile = ratio ‰) ; sélection multi-thèmes seed FNV-1a(`theme:mode:dayNumber`) + mulberry32/Fisher-Yates ; illimité sans-remise redérivé de l'historique ; recalcul brain monotone ; thermomètre (ticks ≤ 250 ms) ; **34 cas tests** (T-01→T-34).

**Spécification (v2)** : pattern reducer pur + boucle d'événements confirmé, dispatch `gameReducer → hotReducer | brainReducer` ; **monorepo pnpm workspaces** : `@hotbrain/engine` (domaine TS pur + validateurs + state-core, `GameConfig`/`ThemeId` injectés, lint d'agnosticité) + `apps/web` (Next.js) — `apps/football` futur importe l'engine tel quel (D-08) ; routes mode-d'abord (`/hot/daily`, `/brain/play`, `/themes/[theme]`…) ; F-2 propagé au thermomètre (montée hot 450 °C/s bornée [600, 2 400] ms, ticks brain 180 ms) ; identité de thème = variable CSS du chrome uniquement (R5 traité par construction) ; **81 tests** (60 unitaires dont 1:1 T-01→T-34 + propriété score ≤ ceiling, 10 intégration, 6 e2e, 5 persistance) ; checklists FID-1→15 (Hot) + CIB-1→12 (Brain) ; jalons M1→M6 ; contenu MVP : 580 prompts (Général 280 + 6 × 50) ≈ 11 500 réponses curées, pipeline IA + validation humaine (~40 h de relecture, à démarrer dès M2).

## 8. Risques & points ouverts (revue orchestrateur, v0.9)

1. ~~Namespace « abysse »~~ → **résolu** : `hotbrain:*` partout (Ontologie v3.1, Spec v2).
2. ~~D-05 / F-9 provisoires~~ → **TRANCHÉS le 2026-11-09** (piège oui, fuzzy complet).
3. **Volume de contenu amplifié par le multi-thèmes** : la curation devient le goulot d'étranglement n° 1 — chiffrage : ~50 prompts par thème × 7 thèmes ≈ 350 prompts et ~7 000 réponses curées pour un MVP crédible, puis ~7 prompts/jour/… à définir selon la cadence quotidienne choisie. Stratégie de production de contenu à définir (rédaction assistée + validation).
4. ~~Pools daily/unlimited~~ → **RÉSOLU** : banques partagées entre les deux modes (décision utilisateur) ; seule contrainte restante : Général ∩ thèmes = ∅ (D-10) — le validateur de banque devra vérifier la non-duplication inter-banques.
5. ~~Fuseau du reset~~ → **TRANCHÉ (D-13)** : minuit America/New_York, epoch paramétrable (`GameConfig.epochDate`).
6. ~~Attributs brain manquants (F-14/F-15)~~ → **RÉSOLUS (Ontologie v3.1)** : `duplicatesIgnored` (cumul session) + `ceiling` figé à la complétion.
7. **Arbitrages Mécaniques actés** : abandon = daily consommée, non rejouable, streak non alimenté (F-11) ; pas de disjonction hot ∩ brain intra-jour (F-12) ; percentile Brain sur ratio seul (F-13) ; bandes de verdict Brain = grille Hot appliquée au ratio × 700 (F-22).
8. ~~Livrables à propager~~ → **Spécification v2 livrée** : monorepo pnpm (`@hotbrain/engine` thème-agnostique + `apps/web`, `apps/football` futur), routes mode-d'abord, 81 tests (60 unitaires dont 1:1 T-01→T-34 + test de propriété score ≤ ceiling, 10 intégration, 6 e2e, 5 persistance), checklists FID-1→15 (Hot) + CIB-1→12 (Brain), jalons M1→M6, contenu MVP 580 prompts ≈ 11 500 réponses curées.
9. **Contradiction C-06 (v0.9)** : Ontologie v3 affirmait « disjonction hot ∩ brain garantie à la génération » — **faux** (graines distinctes ≠ tirages disjoints, démontré par Mécaniques). Arbitrage : recouvrement fortuit **accepté** (F-12), commentaire Ontologie corrigé par l'orchestrateur. Coquilles mineures corrigées (T-25, `dupCount` → `duplicatesIgnored`).
10. **Critère bloquant de lancement** : `GameConfig.epochDate` à figer avant M6 (irrémédiable après lancement — invalide les dayNumbers partagés). Production de contenu à démarrer dès M2 (~40 h de relecture humaine).

## 9. Prochaine étape — **M2 ✅ LIVRÉ (2026-11-10)**
**Persistance** : couche state web complète (`apps/web/src/state/`, 8 clés `hotbrain:*`, couple mono/wall, purge 14 j, `ceiling` survivant), scaffold Next.js (page `/` = état de persistance), **71/71 tests verts** (60 engine intacts + 11 web dont P-1→P-5 et 6 intégration React : remount à t=12 s, reprise brain en pleine liste, dive corrompu → écran propre). Bug M2 corrigé dans le contrôleur de session (émission sautée après acceptation brain) — engine non touché. Écart acté : champ `localBuckets` ajouté à la refdist persistée.
**Contenu** : banque Général **42 prompts / 972 réponses / 397 alias**, validateur 4/4 (0 erreur, 0 warning), 1 piège « Réchauffé » + 1 Fusion « fun » par feuille, `content/WORKFLOW.md` reproductible, statuts `reviewed` (la bascule `published` attend la revue humaine de l'utilisateur). Arbitrages : dépassements 35–40 entrées entérinés pour catégories fermées riches (fruits, marques auto) ; `gen-animal-compagnie` = vie quotidienne (hors science-nature) ; convention `content/banks/<theme>.json` actée ; contrôle de collisions fuzzy à remonter du contenu vers l'engine (backlog M3).
**Suite** : ~~M3~~ **M3 ✅ LIVRÉ (2026-11-10)** — UI Hot daily Général **jouable** (`/hot/daily` : intro → preview 3 s → 25 s retry libre → feedback palier 2,5 s → synthèse + révélation + partage anti-spoiler thermo-colonne + streak ; gardes F-11, reprise après rechargement, pause onglet caché, nettoyage du dive `done` après synthèse) ; **78/78 tests** (60 engine + 18 web), smoke test dev OK puis serveur arrêté ; accessibilité : daltonien Okabe-Ito pré-hydratation, `role="meter"`, prefers-reduced-motion ; contenu réel branché (`build:content` → `public/content/`, validateur bloquant en CI). Écarts actés : labels/verdicts en JSON côté app ; percentile placeholder (refdist embarquée à livrer avec le contenu).
**Contenu** : banque **Géographie 50 prompts / 1 675 réponses / 2 676 alias**, validateur multi-banques 4/4 (D-10 general ∩ geography = ∅ vérifié), 9 sous-familles (quota 25 %), conventions factuelles documentées (capitales officielles : Amsterdam oui/La Haye non ; Europe = 53 ; Caspienne = lac ; listes fermées intégrales : équateur 13, UE 27, Afrique 54, 8 000 m ×14…). Arbitrages : whitelist fuzzy étendue à 23 paires documentées (noms à distance 1 : Zambie/Gambie, Mauna Loa/Mauna Kea — ex æquo = suggestion désactivée, jamais d'acceptation erronée) ; Somaliland accepté au sens large avec quip ; pièges temporels (Brisbane 2032, « golfe d'Amérique ») à revalider aux contentVersions suivantes. Avancement contenu : **92/580 prompts** au statut `reviewed` (attendent la revue humaine).
**Suite** : M4 — mode Brain (daily + illimité) + banque thématique n°2 (entertainment, 60 prompts).
