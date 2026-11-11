# Gabarit de contenu D-22 — banque Général v2 (HotBrain)
**Auteur :** orchestrateur · **Date :** 2026-11-11 · **Décisions :** D-01 (contenu original), D-10 (Général ∩ thèmes = ∅), D-21 (autocorrect généreux), D-22 (banque Général refaite), D-25 (collisions fuzzy non bloquantes).
**Destinataire :** le modèle qui remplit les feuilles (brief H-2 dans `wsd/PLAN-REPRISE.md`). Lis ce fichier EN ENTIER avant de produire une seule entrée.

---

## 0. Ce qu'on fabrique, en une phrase
Un prompt HotBrain pose une **catégorie avec une contrainte précise** ; la feuille liste **toutes les réponses vraies qu'un joueur francophone peut raisonnablement donner en 25 secondes**, chacune classée selon sa **rareté** (le palier). Le joueur marque d'autant plus qu'il cite une réponse que peu de gens citeraient. La feuille doit donc être **large** (le joueur ne doit jamais être refusé pour une réponse vraie et plausible) et **calibrée** (la rareté doit correspondre à ce que des gens diraient vraiment).

## 1. Les prompts (déjà rédigés — ne pas inventer de prompt)
La liste des 60 prompts Général v2 est dans `content/general-v2.plan.json`. Chaque prompt y porte :
- `id` (préfixe `gen-`, stable, jamais renommé), `text` (énoncé joueur), `family` (pour `_status.json`),
- `kind` : toujours `open` depuis D-30 (toutes les questions Général ont au moins 50 réponses possibles) ; `target` = nombre d'entrées visé,
- `target` : nombre d'entrées visé,
- `t1`, `t2`, `t6` : réponses **désignées** par l'orchestrateur (à reprendre telles quelles ; si une désignation est factuellement fausse, la signaler dans le rapport de lot, ne pas la corriger en silence),
- `notes` : conventions factuelles ou périmètre à respecter.

Style des énoncés (pour mémoire, ne pas modifier) : « Nomme … », tutoiement, une contrainte nette, ton joueur sans blague dans l'énoncé lui-même.

## 2. Format JSON exact (banque `content/banks/general.json`)
```json
{
  "theme": "general",
  "contentVersion": 2,
  "prompts": [ { "id": "gen-xxx", "theme": "general", "text": "Nomme …" } ],
  "sheets": {
    "gen-xxx": {
      "promptId": "gen-xxx",
      "contentVersion": 2,
      "entries": [
        { "answer": "marteau", "tier": "t1", "aliases": ["marteaux"] },
        { "answer": "clé à molette", "tier": "t2", "aliases": ["cle a molette", "clé anglaise"], "quip": "La réponse « bricoleur du dimanche » : tout le monde la sort en deuxième." }
      ]
    }
  }
}
```
- `answer` = forme canonique **affichée** (minuscule sauf noms propres, accents corrects, singulier, sans article).
- `tier` ∈ `t1 … t6` ; **exactement une `t2` et une `t6` par feuille**.
- `aliases` = tableau (vide autorisé) ; `quip` facultatif ≤ 280 caractères.
- Les 42 prompts de la v1 sont retirés : `general.json` v2 ne contient QUE les prompts du plan. L'ancienne banque est copiée en `content/banks/_archive/general.v1.json` (dossier ignoré par le validateur : vérifier que `validate.test.ts` ne lit que `content/banks/*.json` au premier niveau).

## 3. Grille de rareté — comment classer
Imagine 100 joueurs francophones ordinaires devant ce prompt, 25 secondes, une seule réponse chacun.

| Palier | Points | Qui le cite | Part de la feuille (ouverte) | Règle |
|---|---|---|---|---|
| t1 Tiède | 10 | les réponses « réflexe » : ≥ 8 joueurs sur 100 | 5–10 entrées | la 1re idée de tout le monde |
| t2 Réchauffé | 15 | **LE piège** : la réponse « un peu maligne » que la moitié des gens sortent en 2e idée en croyant être originaux | **exactement 1** | désignée dans le plan ; quip obligatoire, bienveillant, qui nomme le piège |
| t3 Chaud | 30 | courant mais pas réflexe : 2–7 joueurs sur 100 | ~20 % | |
| t4 Brûlant | 60 | peu fréquent : ~1 joueur sur 100 | ~30 % | |
| t5 Incandescent | 85 | très rare mais vrai et vérifiable : < 1 sur 100 | le reste (~40 %) | c'est ici que la largeur de feuille se construit |
| t6 Fusion | 100 | **LA réponse « fun factor »** : vraie, inattendue, qui fait sourire | **exactement 1** | désignée dans le plan ; quip obligatoire |

Garde-fous :
- Un t5 n'est **jamais** une réponse « tirée par les cheveux » : elle doit être indiscutablement vraie pour un francophone cultivé. En cas de doute sur la vérité → on n'inclut pas.
- La rareté est jugée **du point de vue d'un public francophone de 2026** (France d'abord, Belgique/Suisse/Québec ensuite) : « Bibendum » est t1 en France, pas « Tony le Tigre ».
- Pas de t1 au-delà de 10 entrées : si tout est « évident », le prompt est trop facile et doit être signalé.

## 4. Largeur des feuilles — la règle d'or
- **Règle D-30 (bloquante)** : **au moins 50 entrées par question, moyenne ≥ 100 sur la banque**, sans compter les alias. Viser le `target` du plan.
- **Catégorie ouverte** : méthode de remplissage. Méthode : (1) lister les 30 évidentes ; (2) parcourir systématiquement des sous-familles (par usage, par époque, par région, par matériau, par genre…) ; (3) pour chaque sous-famille, aller jusqu'aux réponses rares mais vraies ; (4) relire pour supprimer ce qui ne répond pas **strictement** à la contrainte de l'énoncé.
- **Catégorie fermée** : la liste complète, ni plus ni moins, avec les conventions de `notes` ; ajouter en `quip` les cas limites admis (« accepté au sens large »).
- Une réponse vraie et plausible absente = un joueur refusé à tort = le défaut n° 1 reproché à la v1. Dans le doute entre « ajouter » et « omettre » une réponse vraie : **ajouter**.
- Contrat technique : ≤ 2 000 clés normalisées (answer + alias) par feuille.

## 5. Alias — ce qui est utile, ce qui est inutile
Le moteur normalise déjà : casse, accents, apostrophes, tirets, ponctuation, espaces multiples, **articles initiaux** (le/la/les/l'/un/une/des/du/de la). L'autocorrect (D-21) rattrape 1 faute dès 4 lettres et 2 fautes dès 8 lettres. Donc :
- **Inutile** : variantes de casse/accents/apostrophe, fautes de frappe, article devant.
- **Obligatoire (D-30)** : les **fautes d'orthographe fréquentes** que l'autocorrect ne rattrape pas (mots ≤ 3 lettres, écarts de plus de 2 lettres, graphies phonétiques : `Tchaïkovski`/`Tchaikovsky`/`Chaikovski`), les **translittérations** (`Pessah`/`Pessa'h`), le **pluriel** du nom (`marteaux`), le **féminin** des métiers/qualificatifs (`policière`), les **synonymes et noms alternatifs** (`séjour` pour salon, `portable` pour téléphone), les **abréviations et sigles** (`CB`, `SNCF`), les **noms de marque usuels** quand ils désignent la chose (`Doliprane` pour paracétamol — un seul sens par entrée : si la marque et la chose sont deux réponses distinctes de la feuille, deux entrées), les **anglicismes courants** (`smartphone`).
- Jamais le même alias dans deux entrées de la même feuille (bloquant).

## 6. Quips — le ton HotBrain
- Ton **joueur et complice**, jamais moqueur ni condescendant ; une phrase, ≤ 280 caractères, idéalement ≤ 120.
- Obligatoires sur t2 (nommer le piège : « Oui, tout le monde y pense en deuxième. ») et t6 (célébrer : « Celle-là, on ne l'attendait pas. »).
- Bienvenus sur les t5 à anecdote vérifiable ; interdits s'ils contiennent une info douteuse.
- Pas de référence à Krillion, à l'océan ou à une autre marque de jeu (D-01).

## 7. Vérité et conventions
- Tout ce qui est daté (records, lois, « avant 2000 ») : vrai à la date du **2026-11-11** ; signaler en `notes` de lot ce qui peut changer.
- Public francophone : les noms en français quand ils existent (`Londres`, pas `London`) avec l'original en alias.
- Catégories fermées : suivre strictement les conventions écrites dans `notes` du plan ; s'il faut en ajouter une, l'écrire dans le rapport de lot.
- Pas de contenu offensant, pas de personnes privées, pas de marques fictives.

## 8. Procédure par lot (10 prompts)
1. Lire le plan, produire les 10 feuilles au format §2 (ajouter les prompts + feuilles dans `general.json` v2 ; au premier lot, créer le fichier v2 et archiver la v1).
2. Pour chaque prompt `closed`, ajouter l'id dans `CLOSED_LISTS` (`content/validate.test.ts`).
3. Mettre `_status.json` à jour : `family` du plan, `status: "draft"`.
4. `npm run validate:content` → corriger jusqu'à **0 erreur** (les collisions fuzzy sont rapportées en avertissement, D-25 : ne pas chercher à les éliminer, l'unicité du candidat protège le joueur).
5. `npm run build:content --workspace @hotbrain/web` puis `npm test`.
6. Commit « contenu : Général v2 lot N (ids …) ».
7. Rapport de lot (dans le message de fin) : nombre d'entrées par feuille, désignations t1/t2/t6 contestées, conventions ajoutées, réponses « vraies mais exclues » et pourquoi.

## 9. Ce qu'on vérifiera à la relecture (10 % des entrées + tous les t2/t6/quips)
Vérité de l'entrée · pertinence stricte à la contrainte · palier plausible · alias pluriel/féminin présents · quip au ton · aucune réponse évidente manquante (test : 5 personnes citent chacune 3 réponses → toutes doivent être dans la feuille).
