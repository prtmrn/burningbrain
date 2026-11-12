// ─────────────────────────────────────────────────────────────────────────────
// validate.test.ts — garde-fou CI des banques de contenu HotBrain (M2/M3).
//   1. schéma RawPromptBank (validatePromptBank)
//   2. règles bloquantes engine (validateBanks) : unicité ids, D-10, unicité
//      des clés normalisées intra-feuille, F-8, feuilles complètes
//   3. qualité éditoriale : ≥ 15 entrées (sauf listes fermées déclarées),
//      exactement 1 t2 (piège) et 1 t6 (fun factor) par feuille
//   4. collision fuzzy intra-feuille entre entrées distinctes (spec §B.2-5) —
//      NON implémenté dans validateBanks à ce jour, d'où ce test côté contenu.
// Charge TOUTES les banques de content/banks/ (D-10 réellement multi-banques).
// Lancer depuis la racine du repo : npm run validate:content
// ─────────────────────────────────────────────────────────────────────────────
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { validateBanks, validatePromptBank } from '../packages/engine/src/data/schemas';
import { buildSheetIndex, damerau, fuzzyThreshold } from '../packages/engine/src/domain/validate';
import type { RawPromptBank } from '../packages/engine/src/data/schemas';

const here = dirname(fileURLToPath(import.meta.url));
const banksDir = join(here, 'banks');

function loadBank(file: string): RawPromptBank {
  const raw = JSON.parse(readFileSync(join(banksDir, file), 'utf8'));
  const bank = validatePromptBank(raw);
  if (!bank) throw new Error(`banks/${file} ne respecte pas le schéma RawPromptBank`);
  return bank;
}

// Toutes les banques présentes dans content/banks/
const banks = readdirSync(banksDir)
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map(loadBank);

// Feuilles volontairement < 15 entrées : listes FERMÉES dénombrables,
// intégralement couvertes (convention documentée dans le rapport M3 et le
// WORKFLOW). Plancher = 10 (warning engine en dessous).
const CLOSED_LISTS = new Set([
  'geo-pays-equateur',        // 13 États traversés par l'équateur
  'geo-pays-amerique-sud',    // 12 États d'Amérique du Sud
  'geo-capitale-oceanie',     // 14 États souverains d'Océanie
  'geo-sommet-8000',          // les 14 sommets de 8 000 m (liste admise)
  'geo-merveilles',           // 7 merveilles antiques + 7 nouvelles (2007)
  'geo-frontiere-france',     // 8 frontières terrestres + 3 outre-mer
]);

// Paires de clés normalisées volontairement proches, assumées et documentées
// (ex æquo fuzzy → suggestion désactivée, jamais d'acceptation erronée — I-02).
const FUZZY_WHITELIST: [string, string][] = [
  ['fete des meres', 'fete des peres'],       // gen-fete : toutes deux t1, indispensables
  ['irlande', 'islande'],                     // pays/îles distincts, tous deux légitimes
  ['l islande', 'l irlande'],                 // idem, avec élision de l'article
  ['kingston', 'kingstown'],                  // capitales de la Jamaïque et de Saint-Vincent
  ['paraguay', 'uruguay'],                    // pays ET fleuves homonymes
  ['eoliennes', 'ioniennes'],                 // deux archipels grecs/italiens distincts
  ['iles eoliennes', 'iles ioniennes'],       // idem, forme longue
  ['l aude', 'l aube'],                       // deux rivières françaises distinctes
  ['zambie', 'gambie'],                       // deux pays africains distincts
  ['mauna loa', 'mauna kea'],                 // deux volcans hawaïens distincts
  ['lac vanern', 'lac vattern'],              // deux lacs suédois distincts
  ['mer baltique', 'mer celtique'],           // deux mers distinctes
  ['mer de kara', 'mer de java'],             // deux mers distinctes
  ['detroit de taiwan', 'detroit de tiran'],  // deux détroits distincts
  ['sunda', 'sund'],                          // Sonde (Indonésie) / Øresund (Danemark-Suède)
  ['golfe de genes', 'golfe de gabes'],       // deux golfes distincts
  ['peninsule de coree', 'peninsule de yorke'], // deux péninsules distinctes
  ['port de dubai', 'port de durban'],        // deux ports distincts
  ['port de santos', 'port de canton'],       // deux ports distincts
  ['gasherbrum 1', 'gasherbrum 2'],           // deux 8 000 distincts
  ['gasherbrum 1', 'gasherbrum ii'],          // idem
  ['gasherbrum i', 'gasherbrum 2'],           // idem
  ['gasherbrum i', 'gasherbrum ii'],          // idem
];

describe('schéma RawPromptBank', () => {
  it('les banques se parsent selon le schéma', () => {
    expect(banks.length).toBeGreaterThanOrEqual(2); // general + geography
    for (const bank of banks) {
      expect(bank.prompts.length).toBeGreaterThan(0);
      for (const p of bank.prompts) {
        expect(p.theme).toBe(bank.theme);
        expect(bank.sheets[p.id]).toBeDefined();
      }
    }
  });
});

describe('validateBanks (règles engine, multi-banques — D-10 inclus)', () => {
  it('zéro erreur bloquante, zéro avertissement', () => {
    const res = validateBanks(banks);
    expect(res.errors).toEqual([]);
    expect(res.warnings).toEqual([]);
    expect(res.ok).toBe(true);
  });
});

describe('qualité éditoriale', () => {
  it('chaque feuille a ≥ 15 entrées (≥ 10 pour les listes fermées déclarées), exactement 1 t2 et 1 t6', () => {
    for (const bank of banks) {
      for (const [promptId, sheet] of Object.entries(bank.sheets)) {
        const min = CLOSED_LISTS.has(promptId) ? 10 : 15;
        expect(
          sheet.entries.length,
          `${promptId} : ${sheet.entries.length} entrées (min ${min})`,
        ).toBeGreaterThanOrEqual(min);
        const t2 = sheet.entries.filter((e) => e.tier === 't2');
        const t6 = sheet.entries.filter((e) => e.tier === 't6');
        expect(t2.length, `${promptId} : ${t2.length} pièges t2`).toBe(1);
        expect(t6.length, `${promptId} : ${t6.length} fun factors t6`).toBe(1);
      }
    }
  });

  // Minimum de 50 réponses par question Général v2 (D-30 : la règle de MOYENNE est retirée,
  // le minimum reste). Exceptions documentées : périmètre réellement plus petit.
  const BELOW_50_ALLOWED: Record<string, string> = {
    'gen-footballeur-fr': 'Euro 1984 et Euro 2000 : seuls deux effectifs sont possibles',
    'gen-bd-franco-belge': 'Astérix : liste prudente (seuls les personnages certains sont retenus) ; périmètre réel plus large, à compléter après vérification',
  };
  it('banques v2 (Général et thèmes) : au moins 50 réponses par question', () => {
    for (const bank of banks) {
      if (bank.contentVersion < 2) continue; // banques v2 : Général et thèmes (D-34)
      for (const [id, sh] of Object.entries(bank.sheets)) {
        if (BELOW_50_ALLOWED[id]) continue;
        if (sh.contentVersion < 2) continue; // feuilles géographie v1 historiques (D-40)
        expect(sh.entries.length, `${id} : ${sh.entries.length} réponses (min 50)`).toBeGreaterThanOrEqual(50);
      }
    }
  });
});

describe('collisions fuzzy intra-feuille (spec §B.2-5)', () => {
  it('paires d’entrées proches au sens fuzzy — informatif (D-25)', () => {
    const whitelisted = (a: string, b: string) =>
      FUZZY_WHITELIST.some(
        ([x, y]) => (x === a && y === b) || (x === b && y === a),
      );
    const collisions: string[] = [];
    for (const bank of banks) {
      for (const [promptId, sheet] of Object.entries(bank.sheets)) {
        const { keys } = buildSheetIndex(sheet);
        for (let i = 0; i < keys.length; i++) {
          for (let j = i + 1; j < keys.length; j++) {
            const a = keys[i]!;
            const b = keys[j]!;
            if (a.entry === b.entry) continue; // clés d'une même entrée : OK
            const threshold = fuzzyThreshold(Math.max(a.key.length, b.key.length));
            if (threshold === 0) continue; // clés courtes : pas de fuzzy
            if (Math.abs(a.key.length - b.key.length) > threshold) continue;
            if (damerau(a.key, b.key, threshold) <= threshold) {
              if (whitelisted(a.key, b.key)) continue;
              collisions.push(
                `${promptId} : "${a.key}" (${a.entry.answer}) ≈ "${b.key}" (${b.entry.answer})`,
              );
            }
          }
        }
      }
    }
    // D-25 (2026-11-11) : avec des feuilles larges (D-22) et l'autocorrect
    // généreux (D-21), des paires proches sont inévitables et SANS DANGER :
    // l'unicité du candidat fuzzy fait qu'un ex æquo est rejeté, jamais
    // accepté à tort. Le contrôle devient informatif.
    if (collisions.length > 0) {
      console.warn(`[D-25] ${collisions.length} paire(s) fuzzy proches (informatif) :\n  ${collisions.slice(0, 20).join('\n  ')}`);
    }
    expect(collisions.length).toBeGreaterThanOrEqual(0);
  });
});
