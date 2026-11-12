# Journal des décisions — arbitrage de l'orchestrateur

Format : date · ID · question · options en conflit · cas test tranchant · décision · version WSD résultante.

---

- **2026-11-08 · D-01** · Fidélité · options : clone exact / inspiré contenu original / mécaniques fidèles habillage libre · **décision utilisateur : jeu inspiré, contenu original** · justification : mécaniques non protégeables, contenu Krillion protégé → WSD v0.2
- **2026-11-08 · D-02** · Stack · options : React+Vite / HTML vanilla / web+backend / mobile · **décision utilisateur : "même stack que Krillion"** · reconnaissance : Next.js + React (Turbopack) sur Vercel, TypeScript inféré → WSD v0.2
- **2026-11-08 · D-03** · Rareté · options : curée / dynamique / hybride · **décision utilisateur : hybride (curé + recalcul progressif)** → WSD v0.2
- **2026-11-08 · D-04** · Modes · options : Daily seul / Daily+Unlimited / tout / +archive · **décision utilisateur : Daily Dive + Unlimited** → WSD v0.2

## Arbitrages épistémiques de l'orchestrateur (v0.3)

- **2026-11-08 · C-01 CLOS** · Reset quotidien · cas test : lecture du module calendrier dans les chunks JS de production (`America/New_York`, `EPOCH_DATE = 2026-07-16`) + contre-vérification (2026-11-08 = dive n° 116 conforme aux archives fan) · **minuit America/New_York**
- **2026-11-08 · C-02 CLOS** · Durée du timer · cas test : constantes `ANSWER_MS = 25000`, `PREVIEW_MS = 3000` dans le bundle · **25 s + 3 s de preview**
- **2026-11-08 · C-03 CLOS** · Plancher de points · cas test : table `TIERS` du bundle · **Plankton = 10 pts ; grille 10/15/30/60/85/100**
- **2026-11-08 · C-04 CLOS** · Pénalité du refus · cas test : FSM extraite du code (phase `answering` sans conséquence de refus) × 2 sources secondaires concordantes · **retry libre dans le chrono ; 0 uniquement au timeout** · corrige WSD §1.2
- **2026-11-08 · Correction WSD §1.3** · taille des answer sheets : FAQ officielle « thousands of accepted answers » pour certains prompts (et non 15–25) · agent Ontologie
- **2026-11-08 · Correction WSD §1.4** · Unlimited officiel payant (~5 $ one-shot) · agent Game Loop
- **2026-11-08 · D-05 PROVISOIRE** · Palier-piège · l'utilisateur a esquivé la question · défaut orchestrateur : **oui, renommé** (recommandation Game Loop) · réversible
- **2026-11-08 · D-06 PROVISOIRE** · Métaphore · esquivée · défaut : **spéléologie** · réversible · attention : namespace « abysse » utilisé en placeholder dans l'Ontologie v2, à renommer avec le nom final
- **2026-11-08 · F-9 PROVISOIRE** · Protection answer sheets · esquivée · défaut : **lisible + fuzzy complet** · réversible
- **2026-11-08 · F-1, F-3, F-6, F-7/F-10, F-8** · demandes Mécaniques · tranchés : attributs ajoutés par Ontologie v2 (`sessionSeed`, `ReferenceDistribution`, deadlines couple mono/wall), politiques F-4 (streak sans réparation) et F-5 (reporté à la curation) actées
- **2026-11-08 · F-2** · durées d'animation · renvoyé à l'agent Spécification (constante de présentation)

## Décisions utilisateur du 2026-11-09 (v0.5)

- **2026-11-09 · D-06 TRANCHÉ (remplace le provisoire)** · Métaphore & nom · **utilisateur : « HotBrain », jauge = thermomètre, le score fait monter la température** · fin de la métaphore descendante (océan/spéléo) · conséquence : renommage du namespace `abysse` → `hotbrain` dans tous les livrables
- **2026-11-09 · D-07 TRANCHÉ** · Multi-thèmes · **utilisateur : 7 thèmes** (Général, Géographie, Divertissement/Spectacle, Histoire, Arts & Littérature, Sciences & Nature, Sports & Loisirs) · structure des modes par thème à confirmer (Q-themes)
- **2026-11-09 · D-08 TRANCHÉ** · Second jeu Football · **utilisateur : application complètement à part, football uniquement** · décision orchestrateur (réversible) : moteur de domaine partagé, thème-agnostique
- **2026-11-09 · D-09 PROVISOIRE** · Échelle thermomètre · défaut orchestrateur : 1 pt = 1 °C, 0→700 °C, jalons 37/100/233/700 °C · réversible
- **2026-11-09 · D-05, F-9, pools, Q-themes** · re-expliqués à l'utilisateur en langage simple, réponses en attente

## Réponses utilisateur du 2026-11-09 (soir)

- **2026-11-09 · D-05 TRANCHÉ** · Palier-piège · **utilisateur : oui, garder le piège** · fin du provisoire
- **2026-11-09 · F-9 TRANCHÉ** · Protection answer sheets · **utilisateur : lisible + tolérance aux fautes de frappe (fuzzy complet)** · fin du provisoire
- **2026-11-09 · D-04 REMPLACÉ** · Modes · **utilisateur : deux modes sur les mêmes banques, deux noms distincts** — mode rareté (façon Krillion) + mode liste (le plus de réponses possibles) · remplace Daily/Unlimited · impact : mécaniques du mode liste à concevoir (D-11)
- **2026-11-09 · D-10 TRANCHÉ** · Structure des thèmes · **utilisateur : Général = tous types de questions (non limité aux 6 thèmes) ; banques thématiques distinctes de Général (aucun recouvrement)** · conséquence : contrainte d'unicité inter-banques au validateur de contenu
- **2026-11-09 · D-11 PROVISOIRE** · Design mode liste · proposition orchestrateur : 7 prompts × 45 s, points de rareté par réponse, doublons ignorés · à valider
- **2026-11-09 · D-12 PROVISOIRE** · Noms des modes · proposition : « Hot » (rareté) / « Brain » (liste) · à valider
- **2026-11-09 · D-13 PROVISOIRE** · Fuseau reset · proposition : minuit Europe/Paris · à valider

## Réponses utilisateur du 2026-11-09 (nuit)

- **2026-11-09 · D-11 TRANCHÉ (variante utilisateur)** · Format mode liste · **utilisateur : 5 prompts × 60 s, avec rareté (les réponses rares rapportent plus)** · remplace la proposition 7 × 45 s
- **2026-11-09 · D-12 TRANCHÉ** · Noms des modes · **utilisateur : Hot & Brain**
- **2026-11-09 · D-13 TRANCHÉ** · Fuseau reset · **utilisateur : minuit America/New_York** · la formule calendaire du Mécaniques reste valide ; epoch HotBrain = date de lancement, à fixer
- **2026-11-09 · Question soulevée par l'orchestrateur** · les prompts du jour sont-ils partagés entre Hot et Brain ? · recommandation : séries indépendantes (pas de spoil croisé) · à trancher en propagation → WSD v0.6 §1.8

## Arbitrages orchestrateur du 2026-11-09 (v0.7/v0.8) — rattrapage F-16

- **2026-11-09 · D-14 TRANCHÉ** · Paliers thermiques · Tiède (10) · **Réchauffé** (15, piège — remplace « Déjà Vu » : idiomatique ET dans l'échelle thermique) · Chaud (30) · Brûlant (60) · Incandescent (85) · Fusion (100) · IDs stables t1..t6, labels jamais persistés
- **2026-11-09 · D-15 PROVISOIRE** · Jalons thermomètre · 0 / 29,8 (gallium) / 37 / 56,7 (Death Valley) / 100 / 180 / 233 (papier brûle) / 450 (four à pizza — tombe pile sur la bande de verdict héritée) / 700 °C (lave) · réversible
- **2026-11-09 · D-16 TRANCHÉ** · Streak · toute complétion quotidienne compte (Hot ou Brain, tout thème)
- **2026-11-09 · D-19 TRANCHÉ** · Partage Brain · score absolu + ratio score/plafond (plafond variable par feuille)
- **2026-11-09 · D-20 TRANCHÉ** · Séries Hot/Brain indépendantes · `DailyContent` par (thème, mode, date)
- **2026-11-09 · D-17 TRANCHÉ (utilisateur)** · Disponibilité · **Hot ET Brain ont chacun Daily + Illimité** · remplace le provisoire « Brain capé »
- **2026-11-09 · D-18 TRANCHÉ (utilisateur)** · Daily Général seul ; thèmes en banque statique à la carte
- **2026-11-09 · F-11/F-12/F-13/F-22 ACTÉS** · abandon = daily consommée non rejouable, streak non alimenté · pas de disjonction hot∩brain intra-jour · percentile Brain sur ratio seul · bandes de verdict Brain = grille Hot appliquée au ratio × 700
- **2026-11-09 · F-14/F-15** · attributs brain manquants (`duplicatesIgnored`, `ceiling`) · renvoyés à l'Ontologie (v3.1)
- **2026-11-09 · F-17→F-21** · incohérences documentaires signalées par Mécaniques (C-05 ouvert, §6 obsolète, §8.5 fuseau, triplet Déjà Vu/Réchauffé) · **corrigées en v0.8**
- **2026-11-09 · C-06 ARBITRÉ (orchestrateur)** · Contradiction Ontologie v3 (« disjonction hot ∩ brain garantie à la génération ») vs Mécaniques (graines distinctes ≠ tirages disjoints) · cas test théorique : deux graines différentes peuvent tirer le même prompt · **décision : recouvrement fortuit accepté, pas de filtre post-tirage (F-12 confirmé)** · commentaire Ontologie corrigé + coquilles T-25 et `dupCount` réparées → WSD v0.9
- **2026-11-09 · Propagation terminée** · Ontologie v3.1 · Game Loop v2 · Mécaniques v2 · Spécification v2 (monorepo pnpm, `@hotbrain/engine` thème-agnostique, 81 tests, M1→M6, contenu MVP 580 prompts) · pipeline complet, prêt pour l'implémentation

## Implémentation

- **2026-11-10 · M1 LIVRÉ** · `@hotbrain/engine` · **60/60 tests verts** (1:1 T-01→T-34 + U-35→U-60), tsc strict OK, lint d'agnosticité OK · interruption d'exécution la veille (stop utilisateur) puis reprise sans perte
- **2026-11-10 · Écart acté** · npm workspaces au lieu de pnpm (pnpm absent de la machine) · sans impact architectural
- **2026-11-10 · Agnosticité actée** · `ThemeId = string` opaque, `GameConfig.modes.*.rounds: number` (pas de littéraux 7/5 dans le moteur) · application stricte de D-08
- **2026-11-10 · F-6 validé** · après recompute, `contentVersion` monte toujours à la version consultée, même sans changement de score (T-18 tranché par T-32)
- **2026-11-10 · Fausse alerte** · la date DST « 2027-03-08 » signalée n'existe plus dans mecaniques v2 (aucune date en dur) ; le test moteur utilise 2026-03-08, vraie transition · rien à corriger
- **2026-11-10 · M2 LIVRÉ** · Persistance : 71/71 tests (60 engine + 11 web), scaffold Next.js opérationnel, bug contrôleur de session corrigé (engine intact) · Contenu : Général 42 prompts / 972 réponses, validateur 4/4, workflow documenté
- **2026-11-10 · Arbitrages contenu** · dépassements 35–40 entrées entérinés (catégories fermées riches : exhaustivité > quota) · `gen-animal-compagnie` classé vie quotidienne (hors science-nature, D-10 respecté) · convention `content/banks/<theme>.json` actée (remplace spec §B.2) · whitelist fuzzy « fête des mères / fête des pères » assumée (ex æquo = suggestion désactivée, jamais d'acceptation erronée)
- **2026-11-10 · Backlog** · remonter le contrôle de collisions fuzzy du `validate.test.ts` contenu vers `validateBanks` (engine) · décision M3 : nettoyage du dive en phase `done` · définition riche éventuelle de `dailyStatus` (verrouillage rétroactif)
- **2026-11-10 · M3 LIVRÉ** · UI : Hot daily jouable, 78/78 tests, serveur smoke-testé puis arrêté · backlog dive `done` tranché (clear après synthèse) · Contenu : Géographie 50 prompts / 1 675 réponses, validateur multi-banques 4/4, avancement 92/580
- **2026-11-10 · Arbitrages contenu Géographie** · whitelist fuzzy 23 paires documentées (distance 1 : Zambie/Gambie, Vänern/Vättern…) · Somaliland accepté au sens large + quip · conventions factuelles actées (Amsterdam/La Haye, Europe 53, Caspienne lac, mégapoles aires urbaines > 10 M) · pièges temporels marqués pour revalidation aux prochaines contentVersions

## Reprise du 2026-11-11 (nouvel orchestrateur — verdict utilisateur : « le jeu produit n'est pas celui demandé »)

- **2026-11-11 · Constat** · partie jouée sur `/hot/daily` : moteur et persistance corrects (78 tests), mais visuel nu (aucun pixel art, aucune animation, pas de son), thermomètre illisible, feuilles de 15–40 entrées sur catégories ouvertes (refus injustes), fuzzy vécu comme absent · détail dans `wsd/PLAN-REPRISE.md`
- **2026-11-11 · D-21 TRANCHÉ (utilisateur : « les fautes de frappe ne sont pas tolérées »)** · Autocorrect **auto-appliqué** quand le candidat fuzzy est unique (feedback « corrigé en X ») ; seuils ≤3→0 · 4–7→1 · ≥8→2 ; ex æquo → suggestion · remplace I-02 · source : FAQ Krillion « why is autocorrect so generous? »
- **2026-11-11 · D-22 TRANCHÉ (utilisateur)** · Banque Général refaite : prompts précis façon Krillion, difficulté moyenne+ (« cite un vêtement » exclu), ton joueur, feuilles larges 150–500 entrées générées par IA (accepté par l'utilisateur) relues par échantillon · les 42 prompts actuels archivés
- **2026-11-11 · D-23 TRANCHÉ (utilisateur : « feeling de Krillion, jeu pixélisé »)** · DA pixel art HotBrain : police pixel, scanlines, décor vertical gel→lave, HUD cadres pixel, mascotte cerveau-thermomètre, son Web Audio synthétisé · public : lancement francophone
- **2026-11-11 · D-24 (utilisateur)** · Économie d'exécution : l'orchestrateur garde DA, game feel, règles, gabarits, revue ; tâches mécaniques listées en briefs Haiku (`wsd/PLAN-REPRISE.md` §5)
- **2026-11-11 · Priorité (utilisateur)** · Hot d'abord ; Brain/thèmes/illimité après validation du visuel et du contenu
- **2026-11-11 · D-25 TRANCHÉ (orchestrateur)** · Collisions fuzzy intra-feuille · cas test : feuille de 300 prénoms, « Anna »/« Anne » à distance 1 ; saisie « Annr » → ex æquo → rejet (jamais d'acceptation erronée) ; saisie exacte → match exact prioritaire · **le contrôle de collisions du validateur contenu devient informatif** (29 paires sur les banques v1) · condition de D-22 (feuilles larges)
- **2026-11-11 · Gabarit D-22 livré** · `content/TEMPLATE-D22.md` (grille de rareté quantifiée, largeur 150–500, règles d'alias pluriel/féminin, ton des quips, procédure par lot) + `content/general-v2.plan.json` (60 prompts, t1/t2/t6 désignés, conventions) · remplissage délégué (brief H-2)
- **2026-11-11 · D-26 TRANCHÉ (utilisateur : « 25 secondes c'est trop court »)** · chrono Hot 25 s → **30 s** (`config.modes.hot.roundMs`, preview 3 s inchangée). Les fixtures de test restent à 25 s (valeurs figées T-01→T-13), la production passe à 30 s. Textes d'intro mis à jour. Remplace C-02 (valeur héritée de Krillion).
- **2026-11-11 · D-27 TRANCHÉ (utilisateur : « le thème du jeu, un cerveau qui entre en ébullition »)** · identité visuelle = un **cerveau pixel** généré (sprite déterministe, deux lobes, gouttière, plis) qui passe de la couleur calme à rouge puis à la fusion avec la température · bulles qui montent d'une marmite à mesure que le score monte, vapeur à partir de « Ça chauffe », tremblement en ébullition · niveau écrit en toutes lettres (Calme, Ça chauffe, Ébullition, Fusion) · fond = grille de synapses (remplace le dégradé de couleur, jugé sans originalité) · remplace le décor gel→lave de D-23.
- **2026-11-11 · D-28 TRANCHÉ (utilisateur : « les questions sont trop basiques, je veux de la culture générale »)** · le plan Général v2 de D-22 (« quotidien », « marques ») est **abandonné avant tout remplissage** · nouveau plan : 60 prompts de culture générale exigeante (littérature, arts, sciences, histoire, philosophie, mythologie, politique, gastronomie…), chaque t2 est un piège réel et chaque feuille ne contient que des réponses vérifiables · le validateur contenu ne doit jamais accepter une réponse fausse : les désignations de t2 et t6 sont à contrôler à la relecture.
- **2026-11-11 · D-29 TRANCHÉ (utilisateur : « la police est bien mais difficile à lire »)** · police de corps = **Inter** (lisibilité des énoncés, réponses, étiquettes du thermomètre) ; **Pixelify Sans** réservée aux titres, boutons, HUD et libellé du cerveau.
- **2026-11-11 · D-30 TRANCHÉ (utilisateur : « beaucoup trop dur, il faut un entre-deux ; minimum 50 réponses possibles, moyenne 100, plus les variantes acceptées »)** · le plan D-28 (culture générale pointue, listes fermées de 10 à 15 réponses) est abandonné avant remplissage · nouveau plan Général v2 : 60 questions de niveau intermédiaire façon Krillion (personnages de Disney, rois de France, Pokémon de 1re génération, fromages, anglicismes…) · **règle bloquante du validateur : ≥ 50 réponses par question et moyenne ≥ 100 sur la banque v2**, hors alias · alias obligatoires : fautes fréquentes non rattrapées par l'autocorrect, translittérations, synonymes, pluriels, féminins.
- **2026-11-12 · D-40 TRANCHÉ (utilisateur : « choisir le nombre de rounds et le temps », « un cerveau qui se remplit, 500 points = gagné », « BurningBrain », « Partie Classique », « réponses possibles cachées par défaut », « jouable sur téléphone », « typo rétro mais lisible »)** · nom **BurningBrain**, mode Hot affiché **Burning** (ids internes `hot`/`brain` inchangés), illimité renommé **Partie Classique** (URLs `/burning/*`) · avant une Partie Classique, écran de réglages : Burning 3/5/7/10 questions × 15/30/45/60 s, Brain 3/5/7 questions × 30/60/90/120 s (la partie du jour reste 7 × 30 s et 5 × 60 s) · Brain : le thermomètre est remplacé par un **cerveau pixel qui se remplit** ; les points s'appellent **neurones** ; à **500 neurones** la partie s'arrête et est gagnée (moteur : `modes.brain.winScore`, round clos en `won`) · le codec accepte 1 à 20 rounds · récapitulatif Burning : réponses possibles dans un bloc repliable fermé par défaut · typo : Jersey 10 (titres, boutons, chiffres), Press Start 2P (logo), Rubik (texte) ; remplace D-29 · mise en page mobile : thermomètre masqué, saisie au-dessus de la scène, champ en 16 px.
- **2026-11-12 · D-41 TRANCHÉ (utilisateur : « certaines questions trop dures, "Nomme une lune de Saturne" par exemple »)** · 9 questions retirées, listées avec leur motif dans `content/retired.json` et ignorées par les deux constructeurs · règle pour tout nouveau contenu : un joueur cultivé moyen doit pouvoir citer au moins 5 réponses.
