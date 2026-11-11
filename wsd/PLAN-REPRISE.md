# Plan de reprise HotBrain — focus Hot (v1, 2026-11-11)
**Auteur :** orchestrateur (Claude) · **Base :** WSD v1.4, partie jouée le 2026-11-11, référence visuelle krillion.io observée le même jour.
**Verdict utilisateur :** le jeu produit est « vide et nu », base de données trop légère, refus injustes, fautes de frappe mal tolérées. Ce n'est pas le jeu demandé.

## 1. Diagnostic (ce qui est faux, ce qui est juste)

| Zone | Constat | Gravité |
|---|---|---|
| Moteur (`packages/engine`) | 60 tests verts, FSM fidèle, déterminisme OK | **À garder tel quel** |
| Persistance (`apps/web/src/state`) | 18 tests verts, reprise après rechargement OK | À garder |
| Visuel | Pages nues, police système, aucun sprite, aucune animation du mercure, pas de son, pas de mascotte, pas de ciel/décor | **Refonte complète** |
| Thermomètre | Étiquettes 0/29,8/37/56,7 superposées, libellés coupés, chrono sans chiffres | Refonte (dans la DA) |
| Fuzzy | Suggestion à confirmer d'un clic (jamais auto) + seuil 0 sous 5 lettres → vécu comme « pas de tolérance ». Krillion : autocorrect **automatique et généreux** (FAQ officielle « why is autocorrect so generous? ») | Règle à changer (D-21) |
| Contenu Général | 42 prompts tous du type « Nomme un vêtement » (trop faciles, plats) ; feuilles de 15–40 entrées pour des catégories ouvertes (« prénom de fille » = 31 noms) → refus injustes | **Banque Général à refaire** (D-22) |
| Contenu Géographie | 50 prompts, 11–77 entrées, 44 alias médians : meilleure qualité, mais même problème de largeur sur les catégories ouvertes | À élargir en seconde vague |
| Accueil | Bouton « Jouer » actif après la daily jouée ; percentile « bientôt disponible » | Bugs simples |

## 2. Nouvelles décisions (journal DECISIONS.md)

- **D-21 Autocorrect généreux (auto-appliqué).** Candidat fuzzy **unique** → accepté d'office avec feedback « corrigé en X ». Seuils : ≤ 3 lettres → 0 · 4–7 → 1 · ≥ 8 → 2. Ex æquo → suggestion cliquable (comportement actuel). `prefs.answerCorrections=false` désactive l'auto-application. Remplace I-02.
- **D-22 Banque Général refaite.** Prompts précis façon Krillion (contrainte dans l'énoncé : « un pays dont le drapeau ne contient ni rouge ni bleu », « un film français nommé à l'Oscar du meilleur film international »…), difficulté « moyenne+ » (un joueur cultivé trouve toujours, mais la 1re idée vaut Tiède), ton joueur dans les quips. **Feuilles larges** : catégories ouvertes 150–500 entrées (générées par IA, relues par échantillon de 10 %), catégories fermées exhaustives. Les 42 prompts actuels sont retirés de la daily (archivés en `content/banks/_archive/`), 20 au plus sont réécrits.
- **D-23 Direction artistique pixel art « HotBrain ».** Transposition du feeling Krillion : pixel art 1×/2× (`image-rendering: pixelated`), police pixel (Google Fonts « Pixelify Sans » titres + « VT323 » corps), scanlines légères, décor vertical **du sol gelé vers la lave** qui remplace ciel→abysses (fond qui se réchauffe avec le score : bleu glacé → rouge), HUD à cadres pixel (température, score, chrono numérique), mascotte **pixel « cerveau à thermomètre »** 32×32 à 3 états (froid / chaud / fusion), bulles de chaleur à la place des bulles d'air. Son synthétisé en Web Audio (aucun asset) : tick de validation dont le pitch suit le palier, crépitement de fond croissant, ding Fusion. Daltonien et reduced-motion conservés.
- **D-25 Collisions fuzzy informatives.** Le contrôle « aucune paire d'entrées à distance ≤ seuil » devient un avertissement : avec des feuilles larges et l'autocorrect généreux, des paires proches sont inévitables et sans danger (ex æquo → rejet, jamais d'acceptation erronée).
- **D-24 Économie d'exécution.** L'orchestrateur ne fait que le travail à forte valeur (DA, game feel, règles, gabarits de contenu, revue). Tout le reste est listé en briefs pour un modèle léger (Haiku), §5.

## 3. Chantiers, dans l'ordre

| # | Chantier | Qui | Livrable / critère de sortie |
|---|---|---|---|
| 0 | ✅ **FAIT 2026-11-11** (orchestrateur, commit d1b0005) Dépôt git + .gitignore | — | `git log` montre un commit « état M3 » avant toute modif |
| 1 | ✅ **FAIT 2026-11-11** (orchestrateur, commit 88eb5ae) Règle D-21 engine + UI « corrigée en » + tests | — | 60+ tests verts |
| 2 | **DA pixel art + game feel Hot** : `tokens.css`, `Thermometer.tsx` (tube pixel, mercure animé 450 °C/s borné [600, 2 400] ms, jalons sans collision), `SessionScreen`/`PromptCard`/`AnswerInput`/`FeedbackBanner`/`SummaryScreen`, accueil, mascotte, son | **Orchestrateur** | Partie jouable avec le feeling Krillion ; captures validées par l'utilisateur |
| 3 | ✅ **FAIT 2026-11-11** Gabarit `content/TEMPLATE-D22.md` + plan `content/general-v2.plan.json` (60 prompts, 45 ouverts / 15 fermés, ~7 500 entrées visées) | — | `content/TEMPLATE-D22.md` + `content/banks/general.json` v2 squelette (prompts + t2/t6 désignés) |
| 4 | Remplissage des feuilles (150–500 entrées + alias) à partir du gabarit | Haiku (brief H-2, par lots de 10 prompts) | validateur 0 erreur, ≥ 150 entrées sur les catégories ouvertes |
| 5 | Relecture par échantillon (10 % des entrées, tous les t2/t6, tous les quips) | Orchestrateur + utilisateur | corrections consignées, `contentVersion` 2 |
| 6 | ✅ **FAIT 2026-11-11** bouton Jouer / percentile (commit 88eb5ae) · reste : countdown numérique (sera traité avec la DA) | — | tests web verts |
| 7 | Mise à jour WSD/DECISIONS (D-21→D-24, §1.7 DA, §9 état) | Haiku (brief H-4) | documents cohérents |

Brain, thèmes, illimité : **après** validation utilisateur du chantier 2 + 4.

## 4. Ce que l'orchestrateur fait en premier
Chantier 2 (DA + game feel), dès que le chantier 0 (git) est fait. Chantier 3 (gabarit contenu) en parallèle, car le chantier 4 Haiku en dépend.

## 5. Briefs Haiku (à copier tels quels dans une session Haiku, dossier `hotbrain/`)

### H-0 — git
> Dans `hotbrain/`, crée un `.gitignore` (node_modules, .next, *.tsbuildinfo, .DS_Store, coverage), fais `git init`, `git add -A`, commit « État M3 livré (Hot daily jouable, 78 tests) ». Ne modifie aucun autre fichier.

### H-1 — autocorrect généreux (D-21)
> Fichiers : `packages/engine/src/domain/validate.ts`, `reducer.ts`, tests `tests/validate.test.ts`, `tests/reducer.hot.test.ts`. Règle : `fuzzyThreshold(len)` devient `len <= 3 ? 0 : len <= 7 ? 1 : 2`. Dans `validateAnswer` et `validateListing`, quand le fuzzy trouve un candidat **unique**, retourne `{kind:'accept', entry, corrected:{from:input,to:entry.answer}}` si `prefs.answerCorrections !== false` ; sinon l'ancien `{kind:'correction'}`. Ex æquo → inchangé (`rejected` en hot, `correction` jamais). Le reducer hot/brain traite `accept` avec `corrected` comme une acceptation normale, `rawAnswer` = saisie brute, et pose `viaCorrection:true` en brain. Mets à jour les tests U-14/U-15/U-16 (T-14 : « beetoven » est maintenant accepté directement ; T-15 : « roem » (4 lettres) est maintenant corrigé en « Rome » si unique) et ajoute un test « ex æquo → pas d'acceptation ». Ne change rien d'autre. `npm test` et `npm run typecheck` doivent passer. Commit « D-21 autocorrect généreux ».

### H-2 — Général v2 : remplissage des feuilles (D-30, à jour du 2026-11-11)
> Travaille dans `hotbrain/`. Lis **intégralement** `content/TEMPLATE-D22.md`, puis `content/general-v2.plan.json` (60 questions, niveau intermédiaire, réponses t1/t2/t6 désignées). Lot N = questions n° 10(N−1)+1 à 10N du plan, dans l'ordre du fichier. **Règle bloquante D-30 : au moins 50 réponses vraies par question, moyenne ≥ 100 sur la banque, hors alias ; vise le `target` de chaque question.** Alias obligatoires : pluriels, féminins, synonymes, noms VO/VF, translittérations, fautes fréquentes que l'autocorrect ne rattrape pas. Aucune réponse fausse : dans le doute sur la vérité, on omet ; dans le doute sur la rareté, on ajoute.
> Au lot 1 : copie `content/banks/general.json` vers `content/banks/_archive/general.v1.json`, puis réécris `general.json` en v2 (`contentVersion: 2`) avec SEULEMENT les questions du lot ; vérifie que `content/validate.test.ts` ignore `_archive/`. Lots suivants : ajoute les questions et leurs feuilles. Mets `content/_status.json` à jour (family du plan, status `draft`).
> Ensuite : `npm run validate:content` jusqu'à 0 erreur, `npm run build:content --workspace @hotbrain/web`, `npm test`. Commit « contenu : Général v2 lot N » avec `git add content apps/web/public/content` uniquement (jamais `git add -A`), message terminé par `Co-Authored-By: Claude Haiku 5.5 <noreply@anthropic.com>`. Si un lot de 10 dépasse ta capacité, fais-le en deux moitiés de 5, chacune validée et commitée.
> Termine par un rapport : nombre de réponses par question, désignations t1/t2/t6 contestées, réponses vraies exclues et pourquoi.

### H-3 — bugs simples
> `apps/web/src/app/page.tsx` : quand la daily est `played`, le bouton « Jouer » est désactivé et remplacé par le countdown. `SummaryScreen.tsx` : ne pas afficher la ligne « Percentile — bientôt disponible » (masquer tant que `refdist` absente). Ajouter un test web pour chaque cas. `npm test` vert. Commit.

### H-4 — documentation
> Dans `wsd/DECISIONS.md`, les entrées D-21→D-24 existent déjà (ajoutées par l'orchestrateur) ; reporte-les dans la table §2 du `wsd/WSD.md`, remplace §1.7 « identité visuelle » par la DA D-23, et remplace §9 par l'état réel (voir `wsd/PLAN-REPRISE.md` §3). Ne touche pas aux livrables `livrables/*.md`.
