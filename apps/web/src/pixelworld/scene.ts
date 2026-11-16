// scene.ts — le décor pixel art de Boiling, dessiné en code sur un canvas basse
// résolution (144 px de haut, largeur selon l'écran). Dix paliers de
// température : de la banquise au volcan en éruption, puis l'enfer.
// Tout est déterministe (hachage) : pas d'aléa, donc deux rendus du même
// palier à la même image sont identiques.
import {
  ASH,
  BONES,
  PAL_ASH,
  PAL_BONES,
  PAL_PENGUIN,
  PAL_PENGUIN_HOT,
  PENGUIN_A,
  PENGUIN_B,
  PENGUIN_H,
  PENGUIN_HOT_A,
  PENGUIN_W,
  drawSprite,
} from './sprites';

export const WORLD_H = 144;
const HORIZON = 64;
const GROUND_Y = 100;

type C = CanvasRenderingContext2D;
type Pt = [number, number];

// ── Outils de dessin ─────────────────────────────────────────

/** Nombre pseudo-aléatoire stable dans [0, 1[. */
export function hash(n: number): number {
  let x = Math.imul((n | 0) ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

function px(c: C, color: string, x: number, y: number, w = 1, h = 1): void {
  c.fillStyle = color;
  c.fillRect(Math.round(x), Math.round(y), w, h);
}

function ell(c: C, color: string, cx: number, cy: number, rx: number, ry: number): void {
  c.fillStyle = color;
  const r = Math.max(0, Math.round(ry));
  for (let dy = -r; dy <= r; dy++) {
    const hw = Math.round(rx * Math.sqrt(Math.max(0, 1 - (dy / (r || 1)) ** 2)));
    c.fillRect(Math.round(cx) - hw, Math.round(cy) + dy, hw * 2 + 1, 1);
  }
}

function poly(c: C, color: string, pts: Pt[]): void {
  c.fillStyle = color;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of pts) {
    minY = Math.min(minY, p[1]);
    maxY = Math.max(maxY, p[1]);
  }
  for (let y = Math.floor(minY); y <= Math.ceil(maxY); y++) {
    const xs: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const [x0, y0] = pts[i]!;
      const [x1, y1] = pts[(i + 1) % pts.length]!;
      if ((y0 <= y && y1 > y) || (y1 <= y && y0 > y)) xs.push(x0 + ((y - y0) / (y1 - y0)) * (x1 - x0));
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const a = Math.round(xs[k]!);
      const b = Math.round(xs[k + 1]!);
      if (b > a) c.fillRect(a, y, b - a, 1);
    }
  }
}

function line(c: C, color: string, x0: number, y0: number, x1: number, y1: number, t = 1): void {
  c.fillStyle = color;
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
  for (let i = 0; i <= steps; i++) {
    c.fillRect(Math.round(x0 + ((x1 - x0) * i) / steps), Math.round(y0 + ((y1 - y0) * i) / steps), t, t);
  }
}

// ── Description des dix paliers ──────────────────────────────

type MtnKind = 'none' | 'ice' | 'meltIce' | 'rock' | 'volcano';
type Ground = 'floe' | 'puddles' | 'slabs' | 'rock' | 'lava';
type PengMode = 'happy' | 'hot' | 'bones' | 'ash' | 'none';

interface Spec {
  sky: string[];
  sun: number; // rayon du soleil, 0 = pas de soleil
  sunColor: string;
  cloud: string | null;
  sea: [string, string, string] | null; // profond, surface, reflets
  plain: string | null; // plaine rocheuse quand il n'y a plus de mer
  mtn: MtnKind;
  mtnColors: [string, string, string]; // face éclairée, corps, face à l'ombre
  snow: number; // part du sommet couverte de neige
  berg: number; // échelle de l'iceberg
  ground: Ground;
  rock: [string, string, string]; // roche du sol
  peng: PengMode;
  fire: number; // flammes qui sortent du sol
  fireH: number;
  smoke: number;
  steam: boolean;
  sparks: number;
  erupt: 0 | 1 | 2;
  ash: boolean;
  devil: boolean;
  cracks: number; // fissures lumineuses
  craterGlow: 0 | 1 | 2 | 3;
  moon: boolean;
  lavaCrust: number; // part de croûte noire dans la lave
}

const SEA_FROZEN: [string, string, string] = ['#1f6fb5', '#2f88cc', '#a8e0ff'];

const SPECS: Spec[] = [
  // 0° : banquise, pingouins, iceberg sur l'eau
  {
    sky: ['#5fbfec', '#86d0f2', '#aedff6', '#d3effa'], sun: 6, sunColor: '#fff6c0', cloud: '#ffffff',
    sea: SEA_FROZEN, plain: null, mtn: 'none', mtnColors: ['#000', '#000', '#000'], snow: 0, berg: 1,
    ground: 'floe', rock: ['#000', '#000', '#000'], peng: 'happy', fire: 0, fireH: 0, smoke: 0, steam: false,
    sparks: 0, erupt: 0, ash: false, devil: false, cracks: 0, craterGlow: 0, moon: false, lavaCrust: 0,
  },
  // 30° : la montagne glacée apparaît en arrière-plan
  {
    sky: ['#5fbfec', '#86d0f2', '#aedff6', '#d3effa'], sun: 6, sunColor: '#fff6c0', cloud: '#ffffff',
    sea: SEA_FROZEN, plain: null, mtn: 'ice', mtnColors: ['#8fb0cf', '#6f93b6', '#4d6f93'], snow: 0.55, berg: 1,
    ground: 'floe', rock: ['#000', '#000', '#000'], peng: 'happy', fire: 0, fireH: 0, smoke: 0, steam: false,
    sparks: 0, erupt: 0, ash: false, devil: false, cracks: 0, craterGlow: 0, moon: false, lavaCrust: 0,
  },
  // 60° : flaques, iceberg rétréci, la montagne coule
  {
    sky: ['#79c8e6', '#9dd9ec', '#c4e9ee', '#e6f2dc'], sun: 7, sunColor: '#fff0a8', cloud: '#fdfdf6',
    sea: ['#1f7aae', '#36a0c9', '#b4ecff'], plain: null, mtn: 'meltIce', mtnColors: ['#8fb0cf', '#6f93b6', '#4d6f93'], snow: 0.32, berg: 0.7,
    ground: 'puddles', rock: ['#000', '#000', '#000'], peng: 'happy', fire: 0, fireH: 0, smoke: 0, steam: false,
    sparks: 0, erupt: 0, ash: false, devil: false, cracks: 0, craterGlow: 0, moon: false, lavaCrust: 0,
  },
  // 90° : banquise presque fondue, iceberg minuscule, montagne de roche grise
  {
    sky: ['#c4d6b4', '#dfd9a2', '#efd48c', '#f4c776'], sun: 9, sunColor: '#ffd27a', cloud: '#f3e8c8',
    sea: ['#2c7f8a', '#3f9aa0', '#bff0e0'], plain: null, mtn: 'rock', mtnColors: ['#a9a8ae', '#8d8c92', '#68676d'], snow: 0, berg: 0.25,
    ground: 'slabs', rock: ['#000', '#000', '#000'], peng: 'happy', fire: 0, fireH: 0, smoke: 0, steam: false,
    sparks: 0, erupt: 0, ash: false, devil: false, cracks: 0, craterGlow: 0, moon: false, lavaCrust: 0,
  },
  // 100° : plus de banquise, roche, ciel gris, du feu sort du sol, les pingouins ont chaud
  {
    sky: ['#6a6c72', '#80828a', '#9a9ba0', '#b3aea8'], sun: 0, sunColor: '#000', cloud: '#7a7b82',
    sea: ['#36586f', '#44708a', '#9cc4d8'], plain: null, mtn: 'rock', mtnColors: ['#8c8b92', '#6f6e74', '#4d4c52'], snow: 0, berg: 0,
    ground: 'rock', rock: ['#7a7a80', '#5f5f65', '#45454b'], peng: 'hot', fire: 5, fireH: 12, smoke: 0, steam: false,
    sparks: 0, erupt: 0, ash: false, devil: false, cracks: 0, craterGlow: 0, moon: false, lavaCrust: 0,
  },
  // 180° : os, l'eau s'évapore, le volcan est calme
  {
    sky: ['#4a4b50', '#5e5b5e', '#7a6a64', '#a1705a'], sun: 0, sunColor: '#000', cloud: '#5a5658',
    sea: ['#3a4a58', '#4c6070', '#8aa6b6'], plain: null, mtn: 'volcano', mtnColors: ['#7a6d66', '#5b504d', '#3f3735'], snow: 0, berg: 0,
    ground: 'rock', rock: ['#5a5453', '#454040', '#2f2b2b'], peng: 'bones', fire: 4, fireH: 11, smoke: 0, steam: true,
    sparks: 0, erupt: 0, ash: false, devil: false, cracks: 1, craterGlow: 0, moon: false, lavaCrust: 0,
  },
  // 250° : os calcinés, plus d'eau, le volcan fume
  {
    sky: ['#2c2a2e', '#3d3333', '#5a3a30', '#86452a'], sun: 0, sunColor: '#000', cloud: null,
    sea: null, plain: '#2a2322', mtn: 'volcano', mtnColors: ['#665850', '#4a3f3c', '#322a28'], snow: 0, berg: 0,
    ground: 'rock', rock: ['#3a3232', '#2c2626', '#1d1919'], peng: 'ash', fire: 3, fireH: 9, smoke: 1, steam: false,
    sparks: 0, erupt: 0, ash: false, devil: false, cracks: 3, craterGlow: 1, moon: false, lavaCrust: 0,
  },
  // 350° : ciel noir, le volcan crépite de lave
  {
    sky: ['#040306', '#0a0709', '#1a0c0c', '#3a1308'], sun: 0, sunColor: '#000', cloud: null,
    sea: null, plain: '#1b1514', mtn: 'volcano', mtnColors: ['#4a3a34', '#2f2826', '#1f1a19'], snow: 0, berg: 0,
    ground: 'rock', rock: ['#2a2222', '#1d1818', '#120f0f'], peng: 'ash', fire: 4, fireH: 11, smoke: 2, steam: false,
    sparks: 9, erupt: 0, ash: true, devil: false, cracks: 6, craterGlow: 2, moon: false, lavaCrust: 0,
  },
  // 450° : ciel noir, le volcan explose, jets de lave partout
  {
    sky: ['#030204', '#12070a', '#3a0e0a', '#8a2a0c'], sun: 0, sunColor: '#000', cloud: null,
    sea: null, plain: '#1d0f0d', mtn: 'volcano', mtnColors: ['#4a332c', '#2b2220', '#1c1514'], snow: 0, berg: 0,
    ground: 'lava', rock: ['#2a1612', '#1c0d0b', '#120707'], peng: 'ash', fire: 5, fireH: 15, smoke: 2, steam: false,
    sparks: 0, erupt: 1, ash: true, devil: false, cracks: 0, craterGlow: 3, moon: false, lavaCrust: 0.62,
  },
  // 650° : l'enfer, le diable
  {
    sky: ['#1a0204', '#3c0508', '#6a0c0c', '#b0260f'], sun: 0, sunColor: '#000', cloud: null,
    sea: null, plain: '#1d0808', mtn: 'volcano', mtnColors: ['#5a2018', '#3a1511', '#240c0a'], snow: 0, berg: 0,
    ground: 'lava', rock: ['#2a0e0a', '#1c0807', '#100404'], peng: 'ash', fire: 8, fireH: 26, smoke: 2, steam: false,
    sparks: 0, erupt: 2, ash: true, devil: true, cracks: 0, craterGlow: 3, moon: true, lavaCrust: 0.34,
  },
];

// ── Géométrie commune ────────────────────────────────────────

interface Geom { cx: number; baseY: number; w: number; h: number }

function mtnGeom(W: number): Geom {
  const narrow = W < 220;
  return { cx: Math.round(W * (narrow ? 0.62 : 0.68)), baseY: HORIZON + 2, w: Math.round(Math.min(190, Math.max(96, W * 0.52))), h: 48 };
}

const CRATER = 0.2;
const slope = (r: number, h: number): number => h * Math.pow(Math.max(0, 1 - r), 1.15);

/** Hauteur de la montagne (en pixels) à la colonne x. */
function heightAt(kind: MtnKind, g: Geom, x: number): number {
  const half = g.w / 2;
  const r = Math.abs(x - g.cx) / half;
  if (r >= 1) return 0;
  let hh: number;
  if (kind === 'volcano') {
    if (r < CRATER) hh = slope(CRATER, g.h) - g.h * 0.17 * (1 - (r / CRATER) ** 2);
    else hh = slope(r, g.h);
  } else {
    const second = 0.62 * g.h * Math.pow(Math.max(0, 1 - Math.abs(x - (g.cx - 0.26 * g.w)) / (0.28 * g.w)), 0.9);
    hh = Math.max(g.h * Math.pow(1 - r, 0.9), second);
  }
  return Math.max(0, hh + (hash(x * 7) - 0.5) * 2.2);
}

function rim(g: Geom): number {
  return g.baseY - slope(CRATER, g.h);
}

function penguinSlots(W: number): { x: number; y: number }[] {
  const n = W < 130 ? 2 : W < 200 ? 3 : W < 330 ? 4 : 5;
  const ys = [114, 124, 112, 126, 118];
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) out.push({ x: Math.round(((i + 0.5) / n) * W) - PENGUIN_W / 2, y: ys[i % 5]! });
  return out;
}

// ── Ciel, soleil, nuages ─────────────────────────────────────

function drawSky(c: C, W: number, colors: string[]): void {
  const n = colors.length;
  const bandH = Math.ceil(HORIZON / n);
  for (let i = 0; i < n; i++) px(c, colors[i]!, 0, i * bandH, W, bandH + 1);
  // tramé entre deux bandes : le dégradé façon palette limitée
  for (let i = 1; i < n; i++) {
    const y = i * bandH;
    for (let row = 0; row < 4; row++) {
      for (let x = (row & 1); x < W; x += 2) px(c, colors[i]!, x, y - 4 + row, 1, 1);
    }
  }
}

function drawSun(c: C, W: number, r: number, color: string, tick: number): void {
  if (r <= 0) return;
  const cx = Math.round(W * 0.84);
  const cy = 24;
  ell(c, 'rgba(255, 246, 190, 0.22)', cx, cy, r + 5 + ((tick >> 3) & 1), r + 5 + ((tick >> 3) & 1));
  ell(c, color, cx, cy, r, r);
}

function drawMoon(c: C, W: number): void {
  const cx = Math.round(W * 0.5);
  ell(c, 'rgba(255, 70, 40, 0.18)', cx, 42, 36, 36);
  ell(c, '#8e1017', cx, 42, 28, 28);
  ell(c, '#b3191f', cx - 4, 38, 22, 22);
}

function cloud(c: C, x: number, y: number, color: string): void {
  px(c, color, x + 4, y, 10, 3);
  px(c, color, x, y + 2, 20, 4);
  px(c, color, x + 8, y - 2, 7, 3);
}

function drawClouds(c: C, W: number, color: string | null, tick: number): void {
  if (!color) return;
  for (let i = 0; i < 4; i++) {
    const span = W + 80;
    const x = ((hash(i + 3) * span + tick * (0.12 + (i % 2) * 0.1)) % span) - 40;
    cloud(c, Math.round(x), 8 + i * 9 + (i % 2) * 4, color);
  }
}

// ── Montagne / volcan ────────────────────────────────────────

function drawMountain(c: C, spec: Spec, W: number, tick: number): void {
  const kind = spec.mtn;
  if (kind === 'none') return;
  const g = mtnGeom(W);
  const [light, body, dark] = spec.mtnColors;
  const x0 = Math.max(0, g.cx - Math.floor(g.w / 2));
  const x1 = Math.min(W - 1, g.cx + Math.floor(g.w / 2));
  for (let x = x0; x <= x1; x++) {
    const hh = Math.round(heightAt(kind, g, x));
    if (hh <= 0) continue;
    const top = g.baseY - hh;
    const lit = x < g.cx;
    for (let y = top; y < g.baseY; y++) {
      let color = lit ? light : body;
      if (!lit && y - top > hh * 0.45) color = dark;
      if (((x + y) & 1) === 0 && hash(x * 131 + y) < 0.22) color = lit ? body : dark;
      if (spec.snow > 0) {
        const cap = hh * spec.snow + (hash(x * 3) * 4 - 2);
        if (y - top < cap) color = lit ? '#f6fbff' : '#c7ddf0';
      }
      px(c, color, x, y);
    }
    if (spec.snow > 0) px(c, lit ? '#ffffff' : '#9ab', x, top);
  }
  // fonte : de l'eau coule de la montagne
  if (kind === 'meltIce') {
    for (let k = 0; k < 4; k++) {
      const sx = Math.round(g.cx + (k - 1.5) * 0.17 * g.w);
      const topY = g.baseY - Math.round(heightAt(kind, g, sx));
      const len = Math.round(g.baseY - topY - 4);
      for (let j = 0; j < len; j++) {
        const lit = (j + (tick >> 1) + k * 3) % 7 < 2;
        px(c, lit ? '#d6f2ff' : '#2f86cf', sx + ((j >> 3) & 1), topY + 6 + j, 1, 1);
      }
    }
  }
  if (kind === 'volcano') {
    const rimY = rim(g);
    const cy = Math.round(rimY + g.h * 0.12);
    const pulse = (tick >> 2) & 1;
    const crater: Record<number, string[]> = {
      1: ['#8a3010', '#a03a10'],
      2: ['#ff6a14', '#ffa030'],
      3: ['#ffb02e', '#ffe27a'],
    };
    const glow = spec.craterGlow > 0 ? crater[spec.craterGlow]![pulse]! : '#1a1414';
    const half = Math.round(CRATER * (g.w / 2));
    px(c, glow, g.cx - half + 1, cy, half * 2 - 1, 2);
    if (spec.craterGlow >= 2) px(c, '#ffe9a0', g.cx - 2, cy - 1, 5, 1);
    // fissures lumineuses sur les pentes
    if (spec.craterGlow >= 2) {
      for (let i = 0; i < 7; i++) {
        const x = Math.round(g.cx + (hash(i + 40) - 0.5) * g.w * 0.7);
        const y = g.baseY - Math.round(heightAt(kind, g, x)) + 5 + Math.floor(hash(i + 90) * 18);
        px(c, ((tick >> 2) + i) % 3 === 0 ? '#ffb02e' : '#ff5a14', x, y, 2, 1);
        px(c, '#ff5a14', x + 1, y + 1, 1, 2);
      }
    }
    // coulées de lave
    if (spec.erupt > 0) {
      const colors = ['#ffe27a', '#ff8a1f', '#ff4a12', '#ff8a1f'];
      for (const side of [-1, 1]) {
        for (let j = 0; j < (spec.erupt === 2 ? 46 : 38); j++) {
          const r = CRATER + 0.02 + j * 0.0165;
          const x = Math.round(g.cx + side * r * (g.w / 2));
          const y = g.baseY - Math.round(heightAt(kind, g, x));
          px(c, colors[(j + (tick >> 1)) % 4]!, x, y, 2, 2);
        }
      }
    }
  }
}

// ── Mer, plaine, iceberg ─────────────────────────────────────

function drawSea(c: C, W: number, colors: [string, string, string], tick: number): void {
  const [deep, base, glint] = colors;
  px(c, base, 0, HORIZON, W, GROUND_Y - HORIZON + 4);
  px(c, deep, 0, HORIZON + 16, W, GROUND_Y - HORIZON - 12);
  px(c, glint, 0, HORIZON, W, 1);
  for (let i = 0; i < Math.floor(W / 9); i++) {
    if (((tick >> 2) + i) % 3 === 0) continue;
    const x = (hash(i) * W + (tick >> 2) * (i % 2 ? 1 : -1) + W * 4) % W;
    const y = HORIZON + 3 + Math.floor(hash(i + 50) * (GROUND_Y - HORIZON - 4));
    px(c, glint, x, y, 2 + (i % 3), 1);
  }
}

function drawPlain(c: C, W: number, color: string, glow: number, tick: number): void {
  px(c, color, 0, HORIZON + 2, W, GROUND_Y - HORIZON + 4);
  for (let i = 0; i < W / 6; i++) {
    const x = hash(i) * W;
    const y = HORIZON + 6 + hash(i + 70) * 30;
    px(c, 'rgba(0, 0, 0, 0.3)', x, y, 3 + hash(i + 9) * 5, 2);
  }
  if (glow > 0) {
    for (let r = 0; r < 7; r++) px(c, `rgba(255, 90, 30, ${(glow * 0.07 * (7 - r)) / 7 + ((tick >> 3) & 1) * 0.02})`, 0, HORIZON + 2 + r, W, 1);
  }
}

function berg(c: C, cx: number, wl: number, hw: number, h: number): void {
  for (let r = 0; r < h; r++) {
    const f = r / h;
    const half = Math.max(1, Math.round(hw * (0.16 + 0.84 * f)) + Math.floor(hash(r * 5 + cx) * 2));
    const y = wl - h + r;
    px(c, '#f6fcff', cx - half, y, half, 1);
    px(c, '#b9dcef', cx, y, half, 1);
    px(c, '#7fb6d8', cx - half, y, 1, 1);
    px(c, '#7fb6d8', cx + half - 1, y, 1, 1);
    if (r % 6 === 3) px(c, '#dff1fb', cx - Math.floor(half / 2), y, Math.floor(half / 2), 1);
  }
}

function drawIceberg(c: C, W: number, s: number, tick: number): void {
  if (s <= 0) return;
  const cx = Math.round(W * (W < 220 ? 0.22 : 0.2));
  const wl = 88 + ((tick >> 3) % 6 === 0 ? 1 : 0);
  ell(c, 'rgba(150, 215, 245, 0.5)', cx, wl + 6 * s, 26 * s, 7 * s);
  berg(c, Math.round(cx - 4 * s), wl, Math.max(2, Math.round(22 * s)), Math.max(3, Math.round(36 * s)));
  berg(c, Math.round(cx + 13 * s), wl, Math.max(2, Math.round(14 * s)), Math.max(2, Math.round(20 * s)));
  px(c, '#cfeeff', cx - 26 * s, wl, 52 * s, 1);
}

// ── Sol ──────────────────────────────────────────────────────

function drawFloe(c: C, W: number, puddles: boolean, tick: number): void {
  for (let x = 0; x < W; x++) {
    const t = 98 + Math.floor(hash(x >> 1) * 3) + Math.round(Math.sin(x * 0.06) * 1.5);
    px(c, '#dff1fa', x, t, 1, 3);
    px(c, '#f8fdff', x, t + 3, 1, 15);
    px(c, '#e6f4fb', x, t + 18, 1, 17);
    px(c, '#d2eaf6', x, t + 35, 1, WORLD_H - t - 35);
  }
  for (let i = 0; i < W / 7; i++) {
    px(c, '#b9dcee', hash(i + 5) * W, 106 + hash(i + 17) * 36, 3 + hash(i + 2) * 6, 1);
  }
  if (!puddles) return;
  const ps: [number, number, number, number][] = [
    [0.3, 112, 24, 4], [0.62, 126, 30, 5], [0.86, 110, 18, 3], [0.1, 130, 22, 4], [0.48, 106, 14, 3],
  ];
  for (const [fx, y, rx, ry] of ps) {
    const x = Math.round(fx * W);
    ell(c, '#cbe5f2', x, y, rx + 3, ry + 1);
    ell(c, '#3f9fe0', x, y, rx, ry);
    ell(c, '#7cc4f2', x - 2, y - 1, Math.round(rx * 0.6), Math.max(1, ry - 2));
    if ((tick >> 2) % 3 === 0) px(c, '#ffffff', x - rx + 5 + ((tick >> 2) % 7), y - 1, 2, 1);
  }
}

function drawSlabs(c: C, W: number, sea: [string, string, string], tick: number): void {
  px(c, sea[1], 0, GROUND_Y, W, WORLD_H - GROUND_Y);
  px(c, sea[0], 0, GROUND_Y + 14, W, WORLD_H - GROUND_Y - 14);
  for (let i = 0; i < W / 8; i++) {
    if (((tick >> 2) + i) % 3 === 0) continue;
    px(c, sea[2], (hash(i + 8) * W + (tick >> 2)) % W, GROUND_Y + 4 + hash(i + 60) * 38, 3, 1);
  }
  for (const p of penguinSlots(W)) {
    const bob = ((tick >> 3) + p.x) % 5 === 0 ? 1 : 0;
    ell(c, '#bcdcee', p.x + 6, p.y + 14 + bob, 18, 5);
    ell(c, '#f2fbff', p.x + 6, p.y + 13 + bob, 17, 4);
  }
  for (let i = 0; i < 4; i++) {
    const x = Math.round(hash(i + 31) * W);
    const y = GROUND_Y + 8 + Math.floor(hash(i + 44) * 30);
    px(c, '#e8f6fd', x, y + (((tick >> 3) + i) & 1), 5, 3);
  }
}

function drawRock(c: C, W: number, spec: Spec, tick: number): void {
  const [top, mid, low] = spec.rock;
  for (let x = 0; x < W; x++) {
    const t = GROUND_Y + Math.floor(hash(x >> 2) * 3);
    px(c, top, x, t, 1, 14);
    px(c, mid, x, t + 14, 1, 16);
    px(c, low, x, t + 30, 1, WORLD_H - t - 30);
  }
  for (let i = 0; i < W / 5; i++) {
    const x = hash(i + 1) * W;
    const y = GROUND_Y + 3 + hash(i + 99) * 40;
    px(c, 'rgba(255, 255, 255, 0.07)', x, y, 3 + hash(i + 4) * 5, 2);
    px(c, 'rgba(0, 0, 0, 0.3)', x + 1, y + 2, 3 + hash(i + 4) * 5, 1);
  }
  const glow = ['#ff5a14', '#ff8a1f', '#ffc23a'];
  for (let i = 0; i < spec.cracks; i++) {
    let x = Math.round(hash(i + 200) * W);
    let y = 106 + Math.floor(hash(i + 230) * 34);
    const len = 8 + Math.floor(hash(i + 260) * 10);
    const color = glow[((tick >> 2) + i) % 3]!;
    for (let k = 0; k < len; k++) {
      px(c, color, x, y);
      x += hash(i * 17 + k) < 0.5 ? 1 : -1;
      if (k % 3 === 2) y += 1;
    }
  }
}

function drawLava(c: C, W: number, spec: Spec, tick: number): void {
  const colors = ['#ff4a12', '#ff7a1a', '#ffb02e', '#ff7a1a'];
  px(c, '#1c0d0b', 0, GROUND_Y, W, WORLD_H - GROUND_Y);
  const cw = 6;
  const chh = 4;
  for (let cy = 0; cy < (WORLD_H - GROUND_Y) / chh; cy++) {
    for (let cx = 0; cx < Math.ceil(W / cw); cx++) {
      const n = hash(cx * 31 + cy * 17);
      const x = cx * cw;
      const y = GROUND_Y + cy * chh;
      if (n < spec.lavaCrust) {
        px(c, '#2a120e', x, y, cw, chh);
        px(c, '#4a2018', x, y, cw, 1);
      } else {
        px(c, colors[(cx + cy + (tick >> 1)) % 4]!, x, y, cw, chh);
      }
    }
  }
}

function drawGround(c: C, W: number, spec: Spec, sea: [string, string, string], tick: number): void {
  switch (spec.ground) {
    case 'floe': return drawFloe(c, W, false, tick);
    case 'puddles': return drawFloe(c, W, true, tick);
    case 'slabs': return drawSlabs(c, W, sea, tick);
    case 'rock': return drawRock(c, W, spec, tick);
    case 'lava': return drawLava(c, W, spec, tick);
  }
}

// ── Feu, fumée, lave en l'air, cendres ───────────────────────

function flame(c: C, x: number, baseY: number, h: number, tick: number, seed: number): void {
  const maxW = Math.max(5, Math.round(h * 0.55));
  for (let r = 0; r < h; r++) {
    const f = r / h;
    const hw = Math.max(0, Math.round((maxW / 2) * (1 - Math.pow(f, 1.4))));
    const sway = Math.round((hash(seed * 31 + ((tick + r * 2) >> 1)) - 0.5) * 2 * (f * 2));
    const y = baseY - r;
    px(c, '#d8260f', x - hw + sway, y, hw * 2 + 1, 1);
    const hw2 = Math.round(hw * 0.65);
    if (r < h * 0.8) px(c, '#ff8a1f', x - hw2 + sway, y, hw2 * 2 + 1, 1);
    const hw3 = Math.round(hw * 0.3);
    if (r < h * 0.5) px(c, '#ffd84a', x - hw3 + sway, y, hw3 * 2 + 1, 1);
  }
}

function drawFire(c: C, W: number, spec: Spec, tick: number): void {
  for (let j = 0; j < spec.fire; j++) {
    const x = Math.round(((j + 0.5) / spec.fire) * W + (hash(j + 70) - 0.5) * 14);
    const baseY = GROUND_Y + 6 + Math.floor(hash(j + 80) * 12);
    const h = Math.round(spec.fireH * (0.7 + hash(j + 90) * 0.6));
    px(c, '#2a0a06', x - 3, baseY, 7, 2);
    flame(c, x, baseY, h, tick, j + 5);
  }
}

function drawSmoke(c: C, W: number, spec: Spec, tick: number): void {
  if (spec.smoke <= 0) return;
  const g = mtnGeom(W);
  const cy = rim(g);
  const n = 5 + spec.smoke * 5;
  for (let i = 0; i < n; i++) {
    const age = (((tick * 0.5 + i * (44 / n)) % 44) / 44);
    const x = g.cx + Math.sin(i * 1.7 + age * 4) * (3 + age * 8) + age * 12;
    const y = cy - age * 46;
    const size = 3 + Math.floor(age * 7);
    px(c, `rgba(${spec.erupt === 2 ? '120, 40, 30' : '78, 72, 76'}, ${((1 - age) * 0.62).toFixed(2)})`, x - size / 2, y, size, size);
  }
}

function drawSteam(c: C, W: number, tick: number): void {
  for (let i = 0; i < 16; i++) {
    const age = (((tick * 0.45 + i * 6) % 38) / 38);
    px(c, `rgba(235, 242, 248, ${((1 - age) * 0.5).toFixed(2)})`, hash(i + 120) * W + Math.sin(age * 5 + i) * 3, 96 - age * 38, 3, 4);
  }
}

/** Projectiles de lave : arcs déterministes lancés depuis (cx, cy). */
function lavaArcs(c: C, cx: number, cy: number, count: number, vyBase: number, tick: number, seed: number, spread: number): void {
  for (let i = 0; i < count; i++) {
    const period = 34 + (i % 5) * 4;
    const age = (tick + i * 7 + seed * 3) % period;
    const vx = (hash(i + seed * 7) - 0.5) * spread;
    const vy = vyBase * (0.6 + hash(i * 3 + seed) * 0.6);
    const g = 0.22;
    const x = cx + vx * age;
    const y = cy - vy * age + 0.5 * g * age * age;
    if (y > GROUND_Y + 6) continue;
    const color = age < 6 ? '#fff1a8' : age % 3 === 0 ? '#ff6a1a' : '#ffb02e';
    px(c, color, x, y, age < 10 ? 3 : 2, age < 10 ? 3 : 2);
    px(c, '#ff4a12', cx + vx * (age - 2), cy - vy * (age - 2) + 0.5 * g * (age - 2) ** 2, 1, 1);
  }
}

function drawEruption(c: C, W: number, spec: Spec, tick: number): void {
  const g = mtnGeom(W);
  const cy = rim(g) + 2;
  if (spec.erupt > 0) {
    // colonne de lave au sommet
    for (let r = 0; r < 16; r++) {
      const hw = 2 + ((r >> 2) & 1) + Math.floor(hash(r + (tick >> 1)) * 2);
      px(c, r < 7 ? '#ffe27a' : '#ff8a1f', g.cx - hw, cy - r, hw * 2 + 1, 1);
    }
    lavaArcs(c, g.cx, cy, spec.erupt === 2 ? 26 : 18, spec.erupt === 2 ? 3.8 : 3.3, tick, 1, 3.2);
    // jets au sol
    const n = spec.erupt === 2 ? 14 : 9;
    for (let i = 0; i < n; i++) {
      const x0 = Math.round(hash(i + 300) * W);
      const y0 = 110 + Math.floor(hash(i + 330) * 28);
      lavaArcs(c, x0, y0, 1, 3.2, tick, i + 5, 1.2);
    }
  }
  if (spec.sparks > 0) lavaArcs(c, g.cx, cy, spec.sparks, 2.4, tick, 9, 1.8);
}

function drawAsh(c: C, W: number, rising: boolean, tick: number): void {
  for (let i = 0; i < 34; i++) {
    const speed = 0.5 + hash(i + 3) * 0.6;
    const t = hash(i + 9) * WORLD_H + tick * speed;
    const y = rising ? WORLD_H - (t % WORLD_H) : t % WORLD_H;
    const x = hash(i) * W + Math.sin(t * 0.08 + i) * 4;
    px(c, rising ? (i % 2 ? '#ff8a1f' : '#ffc23a') : i % 2 ? '#6e6a6a' : '#a09a9a', x, y, 1, 1);
  }
}

// ── Pingouins, os, diable ────────────────────────────────────

function drawPenguins(c: C, W: number, mode: PengMode, tick: number): void {
  if (mode === 'none') return;
  const slots = penguinSlots(W)
    .map((p, i) => ({ ...p, i }))
    .sort((a, b) => a.y - b.y);
  for (const p of slots) {
    ell(c, mode === 'happy' ? 'rgba(0, 70, 110, 0.28)' : 'rgba(0, 0, 0, 0.4)', p.x + PENGUIN_W / 2, p.y + PENGUIN_H, 8, 1);
    if (mode === 'happy') {
      const bob = ((tick >> 2) + p.i) % 6 === 0 ? -1 : 0;
      const wave = ((tick >> 3) + p.i) % 5 === 0;
      drawSprite(c, wave ? PENGUIN_B : PENGUIN_A, PAL_PENGUIN, p.x, p.y + bob, p.i % 2 === 1);
    } else if (mode === 'hot') {
      const fan = ((tick >> 1) + p.i) & 1;
      drawSprite(c, fan ? PENGUIN_B : PENGUIN_HOT_A, PAL_PENGUIN_HOT, p.x, p.y, p.i % 2 === 1);
      for (let d = 0; d < 3; d++) {
        const u = (tick + p.i * 4 + d * 4) % 12;
        px(c, '#9fe0ff', p.x + [0, 11, 5][d]!, p.y + 1 + u, 1, 2);
      }
    } else if (mode === 'bones') {
      const rattle = ((tick >> 1) + p.i) % 7 === 0 ? 1 : 0;
      drawSprite(c, BONES, PAL_BONES, p.x + rattle, p.y, p.i % 2 === 1);
    } else {
      drawSprite(c, ASH, PAL_ASH, p.x, p.y, p.i % 2 === 1);
    }
  }
}

function drawDevil(c: C, W: number, tick: number): void {
  const cx = Math.round(W * 0.5);
  const b = 116 + ((tick >> 3) & 1); // la taille, en respirant
  const RED = '#c1121f';
  const DARK = '#7a0c14';
  // ailes de chauve-souris
  for (const s of [-1, 1]) {
    poly(c, '#4a0810', [[cx + s * 16, b - 52], [cx + s * 54, b - 78], [cx + s * 48, b - 46], [cx + s * 36, b - 36], [cx + s * 20, b - 38]]);
    line(c, '#8a1620', cx + s * 18, b - 50, cx + s * 52, b - 76);
    line(c, '#8a1620', cx + s * 20, b - 46, cx + s * 46, b - 46);
    line(c, '#8a1620', cx + s * 20, b - 42, cx + s * 36, b - 36);
  }
  // fourche
  line(c, '#9a9aa5', cx + 34, b + 4, cx + 34, b - 84);
  px(c, '#c9c9d4', cx + 31, b - 82, 7, 1);
  px(c, '#c9c9d4', cx + 31, b - 90, 1, 8);
  px(c, '#c9c9d4', cx + 34, b - 92, 1, 10);
  px(c, '#c9c9d4', cx + 37, b - 90, 1, 8);
  // torse
  poly(c, RED, [[cx - 20, b - 52], [cx + 20, b - 52], [cx + 13, b + 4], [cx - 13, b + 4]]);
  poly(c, DARK, [[cx + 4, b - 52], [cx + 20, b - 52], [cx + 13, b + 4], [cx + 4, b + 4]]);
  for (let r = 0; r < 4; r++) px(c, DARK, cx - 8, b - 30 + r * 8, 16, 1);
  px(c, DARK, cx, b - 50, 1, 50);
  // bras : un levé avec une flamme, un tenant la fourche
  line(c, RED, cx - 19, b - 48, cx - 31, b - 64, 4);
  line(c, RED, cx + 19, b - 48, cx + 31, b - 40, 4);
  flame(c, cx - 31, b - 62, 12, tick, 77);
  // tête
  poly(c, '#d62828', [[cx - 9, b - 68], [cx + 9, b - 68], [cx + 10, b - 60], [cx + 6, b - 52], [cx - 6, b - 52], [cx - 10, b - 60]]);
  // cornes
  for (const s of [-1, 1]) {
    poly(c, '#f1e6c8', [[cx + s * 8, b - 68], [cx + s * 14, b - 74], [cx + s * 20, b - 86], [cx + s * 11, b - 76], [cx + s * 5, b - 69]]);
    px(c, '#b9ac8a', cx + s * 8 - (s > 0 ? 0 : 1), b - 69, 2, 2);
  }
  // yeux, sourcils, nez
  const eye = (tick >> 2) & 1 ? '#ffe14d' : '#ffffff';
  for (const s of [-1, 1]) {
    px(c, eye, cx + (s < 0 ? -7 : 3), b - 63, 4, 3);
    px(c, '#12141d', cx + (s < 0 ? -6 : 4) + (s < 0 ? 1 : 0), b - 63, 1, 3);
    line(c, '#12141d', cx + s * 8, b - 66 + (s < 0 ? 0 : 0), cx + s * 2, b - 64, 2);
  }
  px(c, '#6a0a12', cx - 2, b - 58, 1, 2);
  px(c, '#6a0a12', cx + 1, b - 58, 1, 2);
  // bouche : rictus qui s'ouvre et se ferme
  const open = ((tick >> 3) & 1) + 3;
  px(c, '#12141d', cx - 6, b - 55, 12, open);
  for (let x = 0; x < 12; x += 2) {
    px(c, '#fafafa', cx - 6 + x, b - 55, 1, 1);
    px(c, '#fafafa', cx - 5 + x, b - 55 + open - 1, 1, 1);
  }
}

// ── Assemblage ───────────────────────────────────────────────

/**
 * Dessine le décor du palier `stage` (0 → 9) sur un canvas de largeur W et de
 * hauteur WORLD_H. `tick` avance à ~12 images par seconde.
 */
export function drawScene(c: C, stage: number, W: number, tick: number): void {
  const spec = SPECS[Math.max(0, Math.min(SPECS.length - 1, stage))]!;
  const sea = spec.sea ?? SEA_FROZEN;
  c.imageSmoothingEnabled = false;
  drawSky(c, W, spec.sky);
  if (spec.moon) drawMoon(c, W);
  drawSun(c, W, spec.sun, spec.sunColor, tick);
  drawClouds(c, W, spec.cloud, tick);
  drawMountain(c, spec, W, tick);
  if (spec.sea) drawSea(c, W, spec.sea, tick);
  else if (spec.plain) drawPlain(c, W, spec.plain, spec.craterGlow, tick);
  drawIceberg(c, W, spec.berg, tick);
  if (spec.steam) drawSteam(c, W, tick);
  if (spec.devil) drawDevil(c, W, tick);
  drawGround(c, W, spec, sea, tick);
  drawFire(c, W, spec, tick);
  drawPenguins(c, W, spec.peng, tick);
  drawSmoke(c, W, spec, tick);
  drawEruption(c, W, spec, tick);
  if (spec.ash) drawAsh(c, W, spec.erupt === 2, tick);
}
