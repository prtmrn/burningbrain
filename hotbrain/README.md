# hotbrain — monorepo

Workspaces npm (voir note M1 : pnpm n'était pas disponible sur la machine de build).

- `packages/engine` — moteur de domaine thème-agnostique (`@hotbrain/engine`),
  zéro dépendance runtime, suite Vitest de 60 tests.
- `apps/web` — app Next.js (`@hotbrain/web`). M2 : couche de persistance
  complète (`src/state/`). **M3 : Hot daily Général jouable** (`/` accueil
  un-geste, `/hot/daily` parcours complet 7 rounds + synthèse, contenu réel
  `content/banks/general.json` 42 prompts via `npm run build:content`).
  Brain illimité arrive en M4.

## Commandes (racine)

```bash
npm install
npm run dev          # app web (next dev — transmet host/port)
npm test             # engine (60) + web (18)
npm run typecheck    # les deux workspaces
npm run lint:agnostic
```
