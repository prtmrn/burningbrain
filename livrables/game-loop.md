# Game Loop & Heuristique Cognitive — **HotBrain** (v2)
**Agent :** Game Loop & UX · **Date :** 2026-11-09 · **WSD :** v0.6 · **Décisions intégrées :** D-04 (remplacé), D-05, D-06, D-07, D-08, D-09 (provisoire), D-10, D-11, D-12, D-13
**Convention de preuve :** [F] = fait observé/sourcé · [I] = inférence argumentée · [D-xx] = décision utilisateur tranchée

> **Changements v1 → v2 :** rebranding HotBrain, métaphore thermomètre (on monte, plus on descend), deux modes Hot/Brain, paliers thermiques, multi-thèmes ×7, jeu Football séparé. Les faits de reconnaissance sur Krillion (sections A/B d'origine) restent valides comme *mécanique source* ; tout l'habillage est transcrit au thermomètre.

---

## A. Décomposition des boucles

### A.0 Vocabulaire produit (rebranding D-06)

| Avant (Krillion) | HotBrain |
|---|---|
| plongée / dive | **montée** / « run » (à finaliser copy) |
| profondeur (m) | **température (°C)** — 1 pt = 1 °C [D-09 provisoire] |
| « descending… » | « **le mercure monte…** » (boot screen) |
| jauge de profondeur | **thermomètre vertical**, remplissage bas → haut |
| fosse hadale 7 000 m | **700 °C = lave** (plafond) |
| « one in a krillion » (gemme) | **Fusion** (100 pts, palier max) |

La direction s'inverse : le score *fait monter* la température. Conséquence UX positive : la progression verticale ascendante est la convention universelle des jauges de performance (batterie, thermomètre de collecte de fonds) — le sens de lecture est inné. [I] La couleur porte la tension : **bleu froid → blanc → jaune → orange → rouge incandescent** le long du tube. [I — à verrouiller avec la DA]

### A.1 Mode **Hot** (héritier de Krillion) — micro-boucle d'un prompt, 28 s

```
PREVIEW du prompt (3 s, hors chrono — fait code : PREVIEW_MS = 3000)
   └─> LIRE + INHIBER la 1re idée ("France", "Cairo")     ← tension cognitive clé
        └─> GÉNÉRER 2–3 candidats plus spécifiques (8–12 s)
             └─> PARI risque/confiance
                  └─> TAPER + ENTRÉE (chrono 25 s)
                       ├─ refus → feedback bref, retry LIBRE dans le chrono [C-04 CLOS]
                       └─> accepté → palier + points → le mercure monte (+X °C)
```

- **Timer :** 25 s exactement + 3 s de preview. [F — constantes `ANSWER_MS`/`PREVIEW_MS` du bundle Krillion, WSD §1.2]
- **Geste cognitif central : inhiber la réponse évidente** — « your first instinct is the worst answer ». [F — Playlin, krilliongame.org]
- **Palier-piège conservé** [D-05] : il punit la « 2e idée de tout le monde » (« Ouagadougou »). Le piège doit se reconnaître à son nom (voir §C.3).
- **Refus non punitif, retry libre** [C-04 CLOS — code] : c'est la règle qui rend la stratégie « oser d'abord, se replier avant 5 s » possible ; elle est constitutive du fun. À préserver telle quelle dans Hot.

### A.2 Mode **Brain** (liste) — analyse complète [D-11, D-12]

Format : **5 prompts × 60 s**, réponses enchaînées, chaque réponse acceptée rapporte **ses points de rareté**, doublons ignorés, plafond = somme des points de la feuille (variable par prompt).

**Micro-boucle d'une réponse (~3–8 s) :**

```
CHERCHER un item dans la catégorie (récupération associative)
   └─> TAPER + ENTRÉE
        ├─ accepté  → +X °C immédiat (palier de la réponse) → tick sonore/visuel → RETAPE
        ├─ doublon  → feedback neutre "déjà compté", aucune pénalité → RETAPE
        └─ refus    → feedback bref "non reconnu", retry libre → RETAPE
```

Différence structurelle avec Hot : pas de phase de délibération, la boucle tourne 8–15 fois par prompt. **Le feedback doit être inline et < 200 ms** (tick du thermomètre, couleur du palier flashé, pitch sonore montant avec la valeur) : toute latence tue le flow. [I]

**Le thermomètre monte-t-il en continu ? Oui — recommandation ferme.** En Brain, la jauge devient une *barre de progression liquide* : chaque validation ajoute son °C en animation rapide. C'est l'équivalent du combo meter des jeux d'arcade ; la montée continue crée l'effet « encore une, encore une ». Le palier de chaque réponse s'affiche en micro-label à côté du tube (empilement des derniers gains). [I]

**Risques de frustration identifiés :**

| Risque | Mécanisme | Parade UX |
|---|---|---|
| **Doublon** | le joueur retape un item déjà compté (ou un alias du même) | Feedback neutre, jamais punitif ; dédup fuzzy sur alias (F-9 fuzzy complet) ; l'input reste rempli pour correction rapide |
| **Trou de mémoire** (« tip of the tongue ») | 10–15 s sans rien trouver alors que la catégorie est connue | Les entrées Tiède/Chaud doivent être larges en tête de feuille : les 2–3 premières réponses valident presque toujours → amorçage du flow avant la panne |
| **Dernières 10 s** | bascule stratégique : on arrête de chercher du rare, on « spamme » du commun sûr | Célébrer ce sprint (tick visuel accéléré, pas de malus) ; c'est un pic de tension sain, pas un défaut |
| **Plafond variable** | la somme de la feuille diffère par prompt → scores incomparables | Normaliser pour le partage (voir §E Q3) |

**Distinction cognitive des deux modes** [I — fondé sur la littérature de cognition : inhibition vs fluence divergente] :
- **Hot = inhibition + pari** : une seule réponse, pensée convergente, gestion du risque. Muscle : *retenir l'évidence*.
- **Brain = fluence associative** : vidange de catégorie, pensée divergente, vitesse de récupération. Muscle : *tout sortir*.
- **Complémentarité** : Brain entraîne exactement le réservoir que Hot exploite (routes de récupération : régional, sous-type, œuvre moins fameuse) ; Hot discipline la qualité que Brain dilue. Joués en alternance, ils se renforcent mutuellement — le duo couvre les deux moitiés de la « culture générale jouable ». [I]

**Méso-boucle Brain (~6–7 min avec transitions)** : 5 × (preview 3 s + 60 s) + écran de récolte (liste des réponses trouvées avec paliers, réponses manquées révélées par palier — le même moment « haunt you all day » que Hot, amplifié : on voit *tout ce qu'on aurait pu trouver*). [I — durée estimée à partir de D-11]

### A.3 Méso-boucle **Hot** (7 rounds ≈ 3 min)

```
ACCUEIL ("le mercure monte…")
   └─> R1..R7 (micro-boucles, ~28 s chacune)
        │   tension croissante : le thermomètre cumule,
        │   jalons franchis (37 °C corps humain, 100 °C eau bouillante…),
        │   couleur du tube bleu → rouge
        └─> ÉCRAN DE FIN : score /700 °C, bande de verdict (0–150 / 151–250 /
            251–350 / 351–449 / 450+ — reprise de la FSM Krillion, WSD §1.2),
            percentile, révélation des réponses acceptées (dont la Fusion),
            partage anti-spoiler
```

- Arc émotionnel hérité : cumul irréversible → regret d'audace sans loss aversion ; révélation post-run = récompense principale. [F/I — inchangé de v1, preuve Playlin]

### A.4 Macro-boucle (jours/semaines)

```
JOUR J : rituel matinal
   ├─> Hot quotidien (3 min) — la "une" partagée par tous
   ├─> Brain quotidien (6 min) — complément fluence (voir §E Q1 : cap à trancher)
   └─> partage de température → comparaison (friends, group chat)
        └─> attente du reset (minuit America/New_York [D-13]) → FOMO douce
             └─> J+1 : streak +1, stats par thème, retour
```

- Reset minuit **America/New_York** [D-13], epoch = date de lancement HotBrain (à fixer — remplacera `EPOCH_DATE` du Mécaniques).
- Le multi-thèmes [D-07] introduit un **risque de fragmentation du rituel** (voir §D, risque R2) : la « une » quotidienne partagée par tous doit rester le Général.

---

## B. Signaux sensoriels & feedbacks

### B.1 Faits observés chez Krillion [F] — transposables mécaniquement, pas visuellement

| Signal | Transposition HotBrain |
|---|---|
| Boot screen « descending… » + mascotte | Boot « le mercure monte… » + mascotte originale |
| HUD : prompt, score, profondeur, horloge 25 s | HUD : prompt, score, **thermomètre**, horloge |
| Colonne de jalons réels (Titanic 3 800 m…) | **Échelle de jalons thermiques réels** (voir §C.2) |
| Icônes de paliers `/tiers/*.png` | Icônes thermiques par palier (jamais la couleur seule — accessibilité) |
| Countdown avant reset | Countdown avant minuit NY [D-13] |
| Mode daltonien pré-hydratation (localStorage → classe CSS) | **Reproduire à l'identique le pattern technique** (script inline avant hydratation) — c'est d'autant plus critique que notre jauge *est* un dégradé de couleur |
| Préférence son persistée | Idem ; sound design original (§D reco 7) |
| Percentile « better than X % » | « plus chaud que X % des cerveaux » (copy à finaliser) |
| Partage emoji anti-spoiler | Colonne thermique d'émojis (§C.4) |
| FSM `intro → preview → answering → feedback → done` + reprise après reload | Inchangée (Mécaniques/Ontologie) |

### B.2 Inférences [I]
- La montée doit être *kinésthésique* : vitesse d'animation et pitch sonore croissants avec le palier (le +100 °C d'une Fusion doit *se sentir* physiquement différent du +10 d'un Tiède). Reprendre les durées d'animation de la Spec (`T_FEEDBACK` = 2 500 ms, bornes [600, 2 400] ms) en les remappant sur l'axe vertical ascendant.
- La couleur du tube est un *signal de tension systémique* (où en est le run), pas un signal de palier (quelle est la valeur de cette réponse) — les deux ne doivent jamais se confondre : le palier s'affiche par icône + label, le tube par dégradé global.
- La révélation post-run (réponses acceptées + Fusion manquée) reste le « deuxième jeu » caché et le moteur du « haunt you all day » — encore plus fort en Brain (récolte visible en entier).

---

## C. Paliers, jalons, partage — arbitrages de design

### C.3 Noms de paliers thermiques [D-05 confirmé]

Proposition orchestrateur évaluée : Tiède (10) · **Déjà Vu** (15) · Chaud (30) · Brûlant (60) · Incandescent (85) · Fusion (100).

**Verdict : l'échelle thermique est excellente** — progression française naturelle (tiède < chaud < brûlant < incandescent < fusion), chaque mot auto-suffisant. Un seul point à améliorer : le palier-piège.

| Palier | Points | Nom retenu | Justification |
|---|---|---|---|
| 1 | 10 | **Tiède** | évident, tiède — parfait |
| 2 | 15 | **Réchauffé** ⚠ piège | « ça sent le réchauffé » = idiomatique français pour « déjà servi, prévisible » — **pun thermique + piège lisible à son nom**, là où « Déjà Vu » casse l'échelle thermique. Fallback si tests utilisateurs médiocres : « Déjà Vu » (plus explicite, moins élégant) |
| 3 | 30 | **Chaud** | milieu de grille |
| 4 | 60 | **Brûlant** | rare |
| 5 | 85 | **Incandescent** | très obscur — le mot porte la lueur |
| 6 | 100 | **Fusion** | gemme éditorialisée (fun factor, cf. FAQ Krillion) — « fusion » = point de rupture max + jargon nucléaire, climax parfait |

Le piège doit se reconnaître à son nom [D-05] : « Réchauffé » le fait en français idiomatique. [I — à valider par un test de compréhension à froid sur 5–10 utilisateurs : « quelle réponse est un Réchauffé ? »]

### C.2 Jalons de température — évaluation et échelle retenue [D-09 provisoire → proposition ferme]

Évaluation des jalons proposés :
- **37 °C corps humain** ✔ excellent — universel, franchi dès le round 1–2 (amorce précoce).
- **100 °C eau bouillante** ✔ excellent — iconique, milieu de parcours réaliste.
- **233 °C le papier brûle** ✔ très bon — clin d'œil *Fahrenheit 451* cohérent avec la marque « Brain ». Caveat d'exactitude : 233 °C est la valeur *conventionnelle* de Bradbury ; l'auto-inflammation réelle du papier varie (~218–246 °C selon les sources) → afficher le jalon avec l'appellation littéraire, pas comme fait physique strict. [I — culturellement établi, physiquement approximatif]
- **700 °C lave** ✔ bon plafond — la lave émise est typiquement ~700–1 200 °C ; 700 °C = « lave la plus froide » (carbonatites), ce qui reste défendable. [I]
- **Lacune détectée : trou entre 233 et 700 °C** (les scores typiques ~300–450 n'ont aucun jalon) et aucun jalon symbolique entre 100 et 233.

**Échelle retenue (proposition Game Loop, à valider en D-09) :**

| °C | Jalon | Rôle UX |
|---|---|---|
| 0 | l'eau gèle | point de départ (label du tube vide) |
| 29,8 | le gallium fond dans la main | easter egg scientifique précoce, très « thermomètre » |
| 37 | corps humain | premier jalon chaud, atteint au round 1–2 |
| 56,7 | record de chaleur mesuré sur Terre (Death Valley, 1913 — reconnu OMM) | fierté « plus chaud que n'importe quel endroit sur Terre » |
| 100 | l'eau bout | mi-parcours iconique |
| 180 | l'huile de friture grésille | jalon culinaire quotidien, comble le trou 100→233 |
| 233 | le papier brûle (clin d'œil *Fahrenheit 451*) | jalon culturel |
| 450 | four à pizza napolitaine | comble le trou 233→700, atteignable par un bon run (bande 450+) |
| 700 | la lave | plafond = run parfait |

Alignement bonus : la bande de verdict haute « 450+ » (héritée de la FSM Krillion) tombe exactement sur le jalon « four à pizza » — le jalon devient la définition visible d'un excellent run. [I]

### C.4 Format de partage social anti-spoiler (remplace la rangée d'emoji Krillion)

Proposition originale — **« thermo-colonne »** :

```
🌡️ HotBrain · Jour 42 · Hot · Général
🔵🔵🟡🟠🟠🔴⚪
387 °C — plus chaud que 78 % des cerveaux
```

- 7 pastilles = 7 rounds Hot (5 en Brain), **couleur = zone thermique du palier, jamais la réponse** ; ⚪ = round manqué/timeout. Zéro spoil des réponses ou des paliers exacts (le mapping couleur→palier est flou par design : les couleurs sont des zones, pas des valeurs).
- La température totale en °C est l'unité partageable (« je suis monté à 387 °C ») — incarnée, comparable, verticale. [I — préserve le levier « partage vertical » identifié en v1 sans copier la grille Wordle ni les emoji de Krillion]
- Variante Brain : `🌡️ HotBrain · Brain · Géographie — 41 réponses · 612 °C`.

---

## D. Recommandations UX pour HotBrain (mises à jour + nouvelles)

1. **Verrouiller le langage thermique partout** : « le mercure monte… », « monter en température », verdicts finaux nommés (« Tiède » → « Fusion » comme bandes de verdict). Toute métaphore résiduelle de descente/profondeur est interdite (risque de copie d'habillage Krillion).
2. **Conserver l'architecture de boucles de Hot** : micro 28 s (3 preview + 25 chrono), méso 7 rounds < 3 min, macro quotidienne reset NY. Preuves C-01→C-04 closes par le code — ne pas ré-ouvrir.
3. **Brain : feedback < 200 ms, thermomètre en continu, dédup douce.** Les trois insights majeurs : (a) la jauge devient barre de progression liquide façon combo meter ; (b) la frustration vient des doublons et des trous de mémoire → premières réponses quasi toujours validées pour amorcer le flow ; (c) les 10 dernières secondes basculent en « spam sûr » — le célébrer, pas le punir.
4. **Jalons thermiques réels** selon l'échelle §C.2 (37 / 56,7 / 100 / 180 / 233 / 450 / 700 + easter eggs 0 et 29,8). Chaque jalon franchi = micro-célébration inline (label qui se fixe sur le tube).
5. **Écran de fin = révélation** : réponses acceptées dépliées par palier + Fusion mise en avant (choisie pour le fun factor) ; en Brain, récolte complète + manqués par palier. Percentile + partage thermo-colonne.
6. **Partage = thermo-colonne §C.4** (pastilles-couleurs + °C total, zéro réponse).
7. **Sound design original, désactivable, préférence persistée** : fond qui s'échauffe (nappes graves → crépitement), tick de validation dont le pitch suit le palier, « ding » aigu sur Fusion, silence bref + souffle sur timeout.
8. **Accessibilité jour 1** : daltonien appliqué avant hydratation (pattern observé chez Krillion, à reproduire techniquement) ; **règle dure HotBrain : le palier n'est JAMAIS codé par la couleur seule** (icône + label) — d'autant plus vital que la jauge est un dégradé ; navigation clavier complète (champ unique + Entrée + autofocus).
9. **Multi-thèmes [D-07, D-10]** :
   - Écran d'accueil = **un seul geste par défaut** : « Hot · Général » pré-sélectionné, un tap pour jouer. Les 6 thèmes à la carte vivent derrière un sélecteur secondaire — sinon 7 thèmes × 2 modes = 14 portes et la fatigue de choix tue le rituel. [I — paradoxe du choix]
   - **Identité visuelle par thème = icône + teinte d'accent sur le chrome uniquement, JAMAIS sur le thermomètre ni les paliers** (le dégradé chaud est un signal systémique, il ne doit pas entrer en collision avec les couleurs de thème). Ex. icônes : 🌍 Géographie, 🎭 Divertissement, 🏛️ Histoire, 📚 Arts & Littérature, 🔬 Sciences & Nature, ⚽ Sports & Loisirs, 🌡️ Général.
   - Stats par thème (streak, meilleure température, paliers moyens) — le collectionneur veut « compléter » ses thèmes.
   - **Fidélisation par profil** : le compétiteur social reste sur Général (la « une » partagée) ; l'érudit de niche migre vers Arts & Littérature / Sciences & Nature (là où ses Deep Cuts sont inimitables) ; le collectionneur de streak ajoute des thèmes pour multiplier les rituels ; le joueur salon → Brain en thème Divertissement (fluence + culture pop). [I — projection des profils v1 sur la matrice thèmes]
   - Contrainte D-10 (Général ∩ thèmes = ∅) : la promesse UX du Général est « n'importe quelle question » ; le validateur de banque garantit qu'un prompt thématique ne fuite jamais en Général (sinon double emploi perçu).
10. **Jeu Football [D-08]** : le moteur est thème-agnostique (déjà acté) ; côté UX, **la métaphore thermomètre est exportable telle quelle** (« faire monter la température du vestiaire ») mais l'app Football devra avoir ses propres jalons (ex. jalons footballistiques réels : records, températures de stade ?) ou un re-skinning complet. Recommandation : garder thermomètre + jalons génériques en v1 Football, re-skin éventuel en v2 — ne pas bloquer le lancement sur une 2e DA.

### Risques d'engagement détectés

- **R1 — Brain illimité diluerait le rituel.** Si Brain n'est pas capé quotidiennement, le « one puzzle waiting each morning » (levier macro n° 1) s'affaiblit : la rareté du rendez-vous est le mur porteur du modèle Wordle. [I + F divekrillion.com sur Krillion] → Q1.
- **R2 — Fragmentation sociale par les thèmes.** « Mêmes prompts pour tous » est la condition de la comparaison dans les group chats ; si chacun joue son thème, les partages ne se comparent plus. Parade : Général = board canonique partagé ; les partages de thème affichent le thème explicitement. [I — risque réel à surveiller post-lancement]
- **R3 — Scores Brain non comparables** (plafond variable par feuille) → affaiblit le partage. → Q3 normalisation.
- **R4 — Session totale Hot + Brain ≈ 9–10 min/jour** : au-delà du format « 3 minutes » qui fait la vertu anti-addictive. Acceptable si présenté comme deux rituels distincts, pas un tunnel. [I]
- **R5 — Collision couleur thème / dégradé thermique** (cf. reco 9) : bug d'engagement silencieux si la jauge devient illisible en mode daltonien × thème coloré.

---

## E. Questions remontées à l'orchestrateur

- **Q1 (nouveau, bloquant pour la macro-boucle)** — Le mode Brain est-il **quotidien capé (1 run/jour)** comme Hot, ou en accès libre ? Recommandation Game Loop : capé quotidien sur la série du jour + éventuel mode entraînement libre plus tard. Tranche R1/R4.
- **Q2 (rappel WSD §1.8)** — Prompts du jour partagés entre Hot et Brain ? Recommandation : **séries indépendantes** (jouer Brain ne doit pas spoiler Hot).
- **Q3 (nouveau)** — Score Brain à plafond variable : faut-il normaliser le partage (« % de la feuille récoltée » ou °C rapportés au plafond) pour préserver la comparabilité sociale ? Arbitrage à renvoyer aussi au Mécaniques.
- **Q4** — Valider l'échelle de jalons §C.2 (ajouts : gallium 29,8 / record terrestre 56,7 / friture 180 / four à pizza 450) et figer D-09 (actuellement provisoire).
- **Q5** — Valider le renommage du palier-piège « Déjà Vu » → **« Réchauffé »** (pun thermique idiomatique) ; prévoir le test de compréhension à froid avant figeage.
- **Q6** — Copy des bandes de verdict : réutiliser les paliers comme noms de bandes (0–150 « Tiède » … 450+ « Incandescent+ ») ou inventer des phrases de verdict ? Détail, arbitrage rapide.

---

## SYNTHÈSE POUR L'ORCHESTRATEUR

1. v2 propagée : HotBrain, thermomètre ascendant (1 pt = 1 °C, plafond 700 °C = lave), tout le vocabulaire océanique purgé ; faits Krillion (25 s + 3 s preview, retry libre, grille 10→100, reset NY) ré-affirmés comme mécanique source.
2. **Paliers retenus : Tiède (10) · Réchauffé (15, piège — remplace « Déjà Vu », pun idiomatique) · Chaud (30) · Brûlant (60) · Incandescent (85) · Fusion (100)** ; fallback « Déjà Vu » si test utilisateur médiocre.
3. **Jalons retenus : 37 corps humain / 56,7 record terrestre / 100 eau bouillante / 180 friture / 233 papier (Fahrenheit 451, valeur littéraire) / 450 four à pizza / 700 lave** + easter eggs 0 (gel) et 29,8 (gallium) ; trou 233→700 comblé, bande verdict 450+ alignée sur un jalon.
4. Mode Brain analysé : micro-boucle 3–8 s, feedback < 200 ms, thermomètre en continu façon combo meter ; frustrations = doublons + trous de mémoire ; les 10 dernières secondes = spam sûr à célébrer.
5. Duo Hot/Brain complémentaire : inhibition de la 1re idée (convergent) vs vidange associative (divergent) — chaque mode entraîne le muscle de l'autre.
6. Partage : « thermo-colonne » de pastilles-couleurs + °C total, zéro spoil, original.
7. Risques majeurs : Brain non capé dilue le rituel (Q1) ; multi-thèmes fragmente la comparaison sociale (Général = board canonique) ; scores Brain à plafond variable non comparables (Q3) ; collision couleur thème/jauge (règle dure : palier jamais codé par la couleur seule).
8. Accueil = un geste par défaut (Hot · Général) ; thèmes derrière sélecteur secondaire ; identité de thème sur le chrome uniquement.
9. Jeu Football (D-08) : moteur inchangé, thermomètre exportable ; re-skin non bloquant.
10. 6 questions ouvertes remontées (Q1 Brain capé ? Q2 séries indépendantes ? Q3 normalisation ? Q4 jalons ? Q5 « Réchauffé » ? Q6 copy verdicts).
