// ─────────────────────────────────────────────────────────────
// banks.test.ts — validateur de banque CI bloquant (spec v2 §B.2)
// Une seule source de vérité : les validateurs de l'engine (mêmes règles
// en CI et à l'exécution). Vérifie aussi que la copie publique servie est
// synchronisée avec la source (build-content.mjs).
// ─────────────────────────────────────────────────────────────
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  assembleBank,
  seedDaily,
  validateBanks,
  validatePromptBank,
  type RawPromptBank,
} from '@hotbrain/engine';
import { hotbrainConfig } from '../src/config';

const here = dirname(fileURLToPath(import.meta.url));
const BANKS_DIR = join(here, '..', '..', '..', 'content', 'banks');
const PUBLIC_DIR = join(here, '..', 'public', 'content');

function loadRawBanks(): { file: string; raw: RawPromptBank }[] {
  return readdirSync(BANKS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((file) => {
      const parsed = validatePromptBank(JSON.parse(readFileSync(join(BANKS_DIR, file), 'utf8')));
      if (!parsed) throw new Error(`banque invalide au schéma : ${file}`);
      return { file, raw: parsed };
    });
}

describe('contenu — validateur CI bloquant (spec §B.2)', () => {
  it('la banque general existe et passe les validateurs moteur', () => {
    const banks = loadRawBanks();
    expect(banks.map((b) => b.file)).toContain('general.json');
    const res = validateBanks(banks.map((b) => b.raw));
    expect(res.errors).toEqual([]);
    expect(res.ok).toBe(true);
  });

  it('general : couverture daily (≥ 7 hot / ≥ 5 brain) et matière brain (≥ 10 entrées)', () => {
    const { raw } = loadRawBanks().find((b) => b.raw.theme === 'general') as never as {
      raw: RawPromptBank;
    };
    expect(raw.prompts.length).toBeGreaterThanOrEqual(7);
    const bank = assembleBank(raw, 'general');
    // le tirage daily fonctionne pour les deux modes
    expect(seedDaily('general', 'hot', 42, bank, hotbrainConfig)).toHaveLength(7);
    expect(seedDaily('general', 'brain', 42, bank, hotbrainConfig)).toHaveLength(5);
    for (const p of bank.prompts) {
      const sheet = bank.sheets.get(p.id);
      expect(sheet?.entries.length).toBeGreaterThanOrEqual(10);
    }
  });

  it('la copie publique est synchronisée avec la source (build-content à jour)', () => {
    const src = readFileSync(join(BANKS_DIR, 'general.json'), 'utf8');
    const version = (JSON.parse(src) as { contentVersion: number }).contentVersion;
    const pub = join(PUBLIC_DIR, `general.v${version}.json`);
    expect(existsSync(pub)).toBe(true);
    expect(readFileSync(pub, 'utf8')).toBe(src);
  });
});
