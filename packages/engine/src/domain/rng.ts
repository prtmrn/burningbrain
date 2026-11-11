// ─────────────────────────────────────────────────────────────
// rng.ts — PRNG de référence (mecaniques §A.5)
// mulberry32 + Fisher–Yates + FNV-1a 32 bits : SPÉCIFICATION, pas
// implémentation libre — déterminisme inter-plateformes (Math.imul, 32 bits).
// ─────────────────────────────────────────────────────────────

/** mulberry32(seed) → générateur [0, 1). Séquence fixée par la spec. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next(): number {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher–Yates : pour i de n-1 → 1 : j = floor(rng() × (i+1)) ; swap.
 *  NE MUTE PAS l'entrée (retourne une copie). */
export function fisherYatesShuffle<T>(arr: readonly T[], rng: () => number): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = out[i] as T;
    out[i] = out[j] as T;
    out[j] = tmp;
  }
  return out;
}

/** Encodage UTF-8 manuel (zéro dépendance, déterministe — évite TextEncoder
 *  pour rester sur lib ES2022 pure). */
function utf8Bytes(str: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdbff && i + 1 < str.length) {
      const next = str.charCodeAt(i + 1);
      if (next >= 0xdc00 && next <= 0xdfff) {
        code = 0x10000 + ((code - 0xd800) << 10) + (next - 0xdc00);
        i++;
      }
    }
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code < 0x10000) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f),
      );
    }
  }
  return bytes;
}

/** FNV-1a 32 bits sur les octets UTF-8 de la chaîne (mecaniques §A.5). */
export function fnv1a32(str: string): number {
  let h = 0x811c9dc5;
  for (const b of utf8Bytes(str)) {
    h = Math.imul(h ^ b, 0x01000193);
    h >>>= 0;
  }
  return h >>> 0;
}
