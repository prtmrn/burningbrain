# @hotbrain/web — app Next.js (App Router)

Application web HotBrain. **M3 livré : le mode Hot daily Général est jouable**
de bout en bout (intro → 7 rounds → synthèse), sur la vraie banque
`content/banks/general.json` (42 prompts).

## Lancer

```bash
npm install            # à la racine du monorepo
npm run build:content  # copie content/banks/*.json → public/content/ (à relancer après tout changement de banque)
npm run dev            # depuis apps/web (transmet --port/--hostname à next dev)
```

Ouvre http://localhost:3000 — l'accueil propose **un seul geste** :
« Jouer — Hot · Général · Jour N » → `/hot/daily`.

## Ce qui est jouable (M3)

- Parcours hot complet : intro → preview 3 s → answering 25 s (retry libre,
  refus bref non bloquant, suggestion fuzzy jamais appliquée d'office) →
  feedback (palier + réponse acceptée, auto-avance T_FEEDBACK = 2,5 s, Entrée
  = continuer) → ×7 → synthèse.
- Synthèse : score total °C, verdict par bandes, jalon le plus haut franchi,
  révélation des feuilles (chips par palier, ta réponse marquée), partage
  thermo-colonne anti-spoiler (7 pastilles colorées, zéro réponse), streak.
- Garde daily consommée (F-11) : daily déjà jouée → écran dédié + countdown
  du reset ; rechargement pendant une partie = reprise fidèle (M2) ; quitter
  la synthèse efface le dive `done` (décision backlog M2 — un reload pendant
  la synthèse la réaffiche).
- Accessibilité : palier jamais codé par la couleur seule (icône + label +
  points), palette daltonien (Okabe-Ito + textures) appliquée **avant
  hydratation** (script inline dans `layout.tsx`), kill-switch
  `prefers-reduced-motion` / `low-power`, thermomètre en `role="meter"`.
- Contenu réel : `npm run build:content` copie `../../content/banks/*.json`
  vers `public/content/<theme>.v<n>.json` (+ `manifest.json`) ; le validateur
  moteur est bloquant en CI via `tests/banks.test.ts`.

## Tests

```bash
npm run test         # vitest : persistence (P-1→P-5, node)
                     #        + integration (jsdom)
                     #        + banks (validateur CI bloquant, spec §B.2)
                     #        + session (parcours hot complet sur la vraie banque)
npm run typecheck    # tsc --noEmit (strict)
```

## Couche state (`src/state/`)

| Module | Rôle |
|---|---|
| `keys.ts` | namespace `hotbrain` + clés Ontologie §D.1 (seul endroit) |
| `local-storage-kv.ts` | adaptateur `KeyValueStore` → localStorage (énumérable) |
| `schema.ts` | clé `hotbrain:schema:v1` |
| `migrations.ts` | chaîne de migrations d'enveloppe (0→1 = câblage, terrain vierge) |
| `profile-store.ts` | `hotbrain:player:v1` — UUID local créé au 1er lancement |
| `prefs-store.ts` | `hotbrain:prefs:v1` — lues avant hydratation |
| `dive-store.ts` | `hotbrain:dive:v1` — couple mono/wall via engine dive-codec |
| `history-store.ts` | `hotbrain:history:v1` — index mode:theme:scope, borne 400 FIFO, forward-compat |
| `refdist-store.ts` | `hotbrain:refdist:<mode>:v1` — copie lissée + rebase distVersion |
| `content-cache.ts` | `hotbrain:content:*` — cache offline, purge 14 j |
| `stats-store.ts` | stats dérivées de l'historique (F-4), statut daily (F-11) |
| `session-store.ts` | contrôleur reducer ↔ persistance (chaque transition persistée ; récolte brain à chaque acceptation ; resume après rechargement) |

Invariants : lecture corrompue → rejet propre, jamais de crash (P-2) ;
rechargement = reprise fidèle (deadline reconstruite en mono, T-12/T-25) ;
deadline passée pendant l'absence → miss/timeout forcé, pas de temps regagné ;
`ceiling` brain figé survivant à la purge du cache (F-15, P-5).

## Couche UI (`src/`, M3)

| Module | Rôle |
|---|---|
| `content.ts` | labels paliers, jalons °C, verdicts, `verdictFor`, partage thermo-colonne `buildShareText` (charge `content/*.json`) |
| `motion.ts` | T_FEEDBACK, `riseDurationMs` (450 °C/s clamp 600–2400 ms), easing, ticks |
| `styles/tokens.css` | dégradé mercure, palettes daltonien/low-power, classes composants, reduced-motion |
| `hooks/` | `useClock` (horloges navigateur), `useVisibility` (pause auto), `usePrefs` (classes html), `useDiveSession` (contrôleur M2 + ticks + T_FEEDBACK + pause) |
| `components/` | `Thermometer`, `PromptCard`, `TierBadge`, `CountdownBar`, `AnswerInput`, `FeedbackBanner`, `ShareButton`, `StreakBadge`, `SummaryScreen`, `SessionScreen` |
| `app/` | `layout.tsx` (script pré-hydratation daltonien), `page.tsx` (accueil un-geste), `hot/daily/page.tsx` (fetch contenu + garde F-11 + session) |
