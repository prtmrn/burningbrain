# WORKFLOW — production de contenu HotBrain

Procédure reproductible pour produire ou amender une banque de prompts conforme
au schéma `RawPromptBank` de l'engine (`packages/engine/src/data/schemas.ts`).
Référence de travail : la banque `general` (M2, contentVersion 1).

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `content/banks/<theme>.json` | Source de vérité d'une banque (format `RawPromptBank`). |
| `content/_status.json` | Pipeline éditorial : famille + statut par prompt (`draft → reviewed → published`). |
| `content/validate.test.ts` | Garde-fou CI (voir § Validation). |

> **Écart assumé vs spec §B.2** : la spec nomme le fichier `content/<theme>.v1.json`.
> L'utilisateur a imposé `content/banks/<theme>.json` ; la version est portée par le
> champ `contentVersion` (banque et chaque feuille), pas par le nom de fichier.

## 1. Choix des sujets (thème Général)

- Catégories **ouvertes du quotidien** : objets, consommation, société, apparence,
  mobilité… tout sujet où un joueur francophone peut citer **≥ 15 réponses plausibles**
  en 25 secondes.
- **Anti-recouvrement D-10** : Général ∩ thèmes = ∅. Avant d'ajouter un prompt,
  vérifier qu'il ne marche pas sur les plates-bandes des 6 thèmes (`geography`,
  `entertainment`, `history`, `arts-literature`, `science-nature`, `sports-leisure`).
  Exemple de cas limite documenté : `gen-animal-compagnie` (vie quotidienne, pas
  « règne animal ») — arbitrage orchestrateur si désaccord.
- **Quotas de familles** (warning souple) : ≤ 25 % des prompts d'une banque dans la
  même famille. Les familles sont suivies dans `_status.json`
  (banque general v1 : maison-objets 10/42 = 23,8 %, tout le reste ≤ 21 %).

## 2. Placement des paliers

| Palier | Rôle | Règle de placement |
| --- | --- | --- |
| `t1` | Évidences | Les 2–4 premières idées de tout le monde. Flow Brain : les 2–3 premières idées du joueur doivent presque toujours valider — sinon la feuille est mauvaise. |
| `t2` | **Piège** | LA réponse « maline » que tout le monde tente pour faire original. Exactement **1 par feuille**. Identifier sincèrement (auto-observation), ne pas sur-intellectualiser. |
| `t3` | Courant solide | Réponses standards, ni évidentes ni recherchées. |
| `t4` | Peu commun | Connues de tous, citées par peu. |
| `t5` | Obscur vérifiable | Existe, sourçable, rare. |
| `t6` | **Fun factor** | Obscur + drôle/étonnant. Exactement **1 par feuille**. Le quip est quasi obligatoire ici. |

- Cible **~15–30 entrées par feuille** (≥ 10 sinon warning engine). Dépassement
  toléré pour les catégories fermées et riches où l'exhaustivité protège
  l'expérience (ne jamais rejeter une réponse correcte) : `gen-fruit` (35),
  `gen-marque-voiture` (40). Justifier tout dépassement dans la revue.
- Les **labels** (Tiède, Réchauffé, Chaud, Brûlant, Incandescent, Fusion) ne sont
  **jamais persistés** dans la banque — affichage runtime uniquement.

## 3. Alias

Ajouter les formes que les joueurs taperont réellement :

- **Pluriels / singuliers** (`stylos`, `légos`, `reçus`).
- **Abréviations** (`mcdo`, `cb`, `philo`, `eps`, `frigo`).
- **Noms vernaculaires** (`patate`, `caisse`…).
- **`œ` / `oe`** : `normalize` ne décompose PAS `œ` → toujours inclure les deux
  formes (`œufs durs` + `oeufs durs`, `clin d'œil` + `clin d oeil`).
- **Émojis** : normalisés en clé vide → ignorés silencieusement. On peut les mettre
  en alias (zéro risque), ils servent de documentation visuelle.
- Inutile d'ajouter un alias qui ne diffère de la réponse que par casse, accents ou
  apostrophes : `normalize` (6 étapes) les efface déjà. Doublon intra-entrée
  toléré par le validateur mais sans valeur.

## 4. Quips

- ≤ **280 caractères**, ton complice, jamais moqueur.
- Recommandés sur t2 (nommer le piège avec bienveillance) et t6 (fun factor).

## 5. Checklist qualité par prompt

1. **Exactitude factuelle** de chaque entrée (une réponse fausse en t5/t6 détruit la
   confiance ; une réponse correcte absente frustre).
2. **Unicité des clés normalisées** intra-feuille (bloquant engine).
3. **Pas de collision fuzzy** entre entrées distinctes (§B.2-5 — voir § Validation,
   point 4) ; toute exception doit être whitelistée dans `validate.test.ts` et
   justifiée (aujourd'hui : `fête des mères` / `fête des pères`, toutes deux t1 —
   l'ex æquo désactive la suggestion fuzzy, jamais d'acceptation erronée, I-02).
4. Exactement 1 t2 et 1 t6 ; ≥ 15 entrées ; quips ≤ 280.
5. Doublons cross-feuilles : autorisés et documentés quand le concept est générique
   (`carte bancaire`, `fromage`, `lit`…) — l'unicité n'est exigée qu'intra-feuille.
   Les homonymes cross-feuilles (`banane` fruit / `banane` coiffure) sont sans
   impact, le contexte du prompt désambiguïse.
6. Mettre à jour `_status.json` : famille + statut. Une feuille ne passe
   `published` qu'après revue humaine (la banque general v1 est `reviewed`).

## 6. Validation (CI)

Depuis la racine du repo :

```bash
npm run validate:content    # vitest run content/validate.test.ts
```

Quatre contrôles :

1. **Schéma** — `validatePromptBank` sur chaque fichier de `content/banks/`.
2. **Engine** — `validateBanks` : unicité globale des promptId, D-10, unicité des
   clés normalisées, F-8 (≤ 2 000 clés/prompt), feuilles complètes. Zéro erreur et
   zéro warning exigés.
3. **Qualité éditoriale** — § 5.4 ci-dessus.
4. **Collisions fuzzy** (spec §B.2-5) — ⚠️ la docstring de `validateBanks` annonce
   ce contrôle en warning mais le code ne l'implémente **pas** ; il est donc couvert
   ici, côté contenu, via `buildSheetIndex` + `damerau` + `fuzzyThreshold`.
   *Point remonté : candidat à remonter dans l'engine.*

Toute banque déposée dans `content/banks/` est chargée automatiquement par le test —
D-10 est ainsi réellement vérifié sur l'ensemble des banques à chaque run.

## 7. Avancement MVP

| Banque | Prompts | Cible MVP | Statut |
| --- | --- | --- | --- |
| `general` | 42 | 280 | `reviewed` (M2) |
| `geography` | 50 | 280 | `reviewed` (M3) |
| `entertainment`, `history`, `arts-literature`, `science-nature`, `sports-leisure` | 0 | 300 (60 × 5) | à produire |
| **Total** | **92** | **580** | — |

## 8. Conventions factuelles — geography v1

Conventions retenues (à conserver pour toute révision de la banque) :

- **Pays** : États membres de l'ONU, noms courts français ; formes récentes acceptées
  des deux côtés (Eswatini/Swaziland, Tchéquie/République tchèque, Turquie/Türkiye,
  Astana/Nour-Soultan…). Kosovo accepté « au sens large » (quip), de même que les pays
  constitutifs du Royaume-Uni (Angleterre, Écosse, Pays de Galles) et le Somaliland.
- **Pays d'Europe** (`geo-pays-europe`) : les 44 États souverains couramment rattachés
  à l'Europe + 5 transcontinentaux (Turquie, Géorgie, Arménie, Azerbaïdjan, Kazakhstan)
  + Kosovo + 3 pays constitutifs UK = 53 entrées.
- **Capitales** : capitales **officielles/constitutionnelles** uniquement. Amsterdam
  (Pays-Bas) et Berne (Suisse) retenues — **La Haye exclue** (siège du gouvernement).
  Afrique du Sud : 3 capitales (Pretoria, Le Cap, Bloemfontein) ; Eswatini : 2
  (Mbabane, Lobamba) ; sièges acceptés en entrées séparées avec quip (Cotonou,
  Dar es Salaam, Bujumbura).
- **Mer Caspienne = lac** : Kazakhstan, Azerbaïdjan et Turkménistan sont donc « sans
  littoral » (convention documentée en quip dans les deux feuilles concernées).
- **Océan Austral** accepté (reconnu par National Geographic en 2021) ; mers fermées
  (Caspienne, Morte) acceptées comme lacs ou mers selon le prompt, avec quip.
- **Mégapoles** (`geo-megapole`) : aires urbaines > 10 millions (estimations ONU /
  Demographia ~2024). Chicago, Madrid, Barcelone volontairement exclus.
- **Merveilles** (`geo-merveilles`) : 7 antiques (liste de Philon) + 7 nouvelles
  (vote New7Wonders, 2007).
- **Préfectures de région** : les 18 (13 métropole + 5 DROM) ; Saint-Denis = celui de
  La Réunion (quip).
- **Villes olympiques** : hôtes passés uniquement (1896–2022) — Brisbane 2032 et
  Los Angeles 2028 exclus car le prompt exige le passé.
- **Frontières de la France** (`geo-frontiere-france`) : 8 terrestres de métropole +
  3 outre-mer (Brésil, Suriname, Pays-Bas/Saint-Martin).

### Listes fermées < 15 entrées (exceptions déclarées dans `validate.test.ts`)

`geo-pays-equateur` (13) · `geo-pays-amerique-sud` (12) · `geo-capitale-oceanie` (14)
· `geo-sommet-8000` (14) · `geo-merveilles` (14) · `geo-frontiere-france` (11).
Plancher 10 (warning engine en dessous) ; intégralité de la liste couverte.

### Whitelist fuzzy (paires assumées, ex æquo = suggestion désactivée, I-02)

Voir `FUZZY_WHITELIST` dans `validate.test.ts`. Principe : n'y admettre que des paires
d'entrées **indispensables** dont les clés sont à distance ≤ seuil (mères/pères,
irlande/islande, kingston/kingstown, paraguay/uruguay, éoliennes/ioniennes,
Vänern/Vättern, Mauna Loa/Mauna Kea, Zambie/Gambie, Baltique/Celtique, Kara/Java,
Taïwan/Tiran, Gênes/Gabès, Corée/Yorke, Aude/Aube, Sunda/Sund, Dubaï/Durban,
Santos/Canton, Gasherbrum I/II). Tout alias marginal qui provoque une collision est
supprimé, pas whitelisté (ex. « colosseo » retiré du Colisée).
