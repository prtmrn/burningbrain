#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// build-content.mjs — pipeline contenu (spec v2 §A.2)
// Lit les banques sources (content/banks/*.json à la racine du monorepo),
// vérifie la forme minimale, puis émet apps/web/public/content/<theme>.v<n>.json
// (immutables, servis en clair — F-9).
// La VALIDATION MÉTIER complète (mêmes règles que l'exécution) est assurée
// par tests/banks.test.ts via engine/validateBanks — CI bloquante.
// ─────────────────────────────────────────────────────────────
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = join(here, '..');
const repoRoot = join(webRoot, '..', '..');
const srcDir = join(repoRoot, 'content', 'banks');
const i18nDir = join(repoRoot, 'content', 'i18n', 'banks'); // banques traduites (EN, ES) : hors validateur FR
const outDir = join(webRoot, 'public', 'content');

if (!existsSync(srcDir)) {
  console.error(`✗ Répertoire source introuvable : ${srcDir}`);
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

let count = 0;
const files = [
  ...readdirSync(srcDir).filter((f) => f.endsWith('.json')).map((f) => join(srcDir, f)),
  ...(existsSync(i18nDir) ? readdirSync(i18nDir).filter((f) => f.endsWith('.json')).map((f) => join(i18nDir, f)) : []),
];
for (const src of files) {
  const file = src.split('/').pop();
  const raw = JSON.parse(readFileSync(src, 'utf8'));
  if (typeof raw.theme !== 'string' || !Number.isInteger(raw.contentVersion)) {
    console.error(`✗ ${file} : theme/contentVersion invalides`);
    process.exit(1);
  }
  if (!Array.isArray(raw.prompts) || typeof raw.sheets !== 'object' || raw.sheets === null) {
    console.error(`✗ ${file} : prompts/sheets invalides`);
    process.exit(1);
  }
  const out = join(outDir, `${raw.theme}.v${raw.contentVersion}.json`);
  copyFileSync(src, out);
  // Manifeste pour le chargeur (theme → version courante)
  const manifestPath = join(outDir, 'manifest.json');
  const manifest = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8'))
    : {};
  manifest[raw.theme] = { contentVersion: raw.contentVersion, prompts: raw.prompts.length };
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`✓ ${file} → public/content/${raw.theme}.v${raw.contentVersion}.json (${raw.prompts.length} prompts)`);
  count++;
}
console.log(`\n${count} banque(s) publiée(s).`);
