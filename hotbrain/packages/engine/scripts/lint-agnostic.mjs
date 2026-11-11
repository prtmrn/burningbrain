/**
 * Lint d'agnosticité (spec v2 §A.3 règle 2) :
 * packages/engine/src ne doit contenir AUCUNE chaîne liée à un produit
 * (nom de marque, nom de jeu dérivé, unité de jauge localisée, labels de paliers).
 * Les labels vivent dans les apps (contenu), jamais dans le moteur — D-08.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'src');

const FORBIDDEN = [
  /hotbrain/i,
  /football/i,
  /°C/,
  /ti[èe]de/i,
  /r[ée]chauff[ée]/i,
  /br[ûu]lant/i,
  /incandescent/i,
  /\bfusion\b/i,
  /krillion/i,
];

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (full.endsWith('.ts')) yield full;
  }
}

let failures = 0;
for (const file of walk(SRC)) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    for (const rx of FORBIDDEN) {
      if (rx.test(line)) {
        console.error(`✗ ${relative(SRC, file)}:${i + 1} — chaîne interdite ${rx} : ${line.trim()}`);
        failures++;
      }
    }
  });
}

if (failures > 0) {
  console.error(`\nLint d'agnosticité : ${failures} violation(s).`);
  process.exit(1);
}
console.log('✓ Lint d\'agnosticité : packages/engine/src est propre (aucune chaîne produit).');
