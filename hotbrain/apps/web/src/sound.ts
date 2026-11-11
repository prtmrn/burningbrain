// ─────────────────────────────────────────────────────────────
// sound.ts — sons synthétisés (Web Audio), aucun asset (D-23).
// Le pitch monte avec le palier ; Fusion = carillon aigu.
// Silencieux si préférence muted ; contexte créé au premier geste.
// ─────────────────────────────────────────────────────────────

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function blip(freq: number, durS: number, wave: OscillatorType, vol: number, delayS = 0): void {
  const c = audio();
  if (!c) return;
  const t0 = c.currentTime + delayS;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = wave;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(vol, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + durS);
  osc.connect(gain).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + durS + 0.02);
}

/** Tick de validation : tierIndex 0 (t1) … 5 (t6). */
export function playTier(tierIndex: number, muted: boolean): void {
  if (muted) return;
  const freq = 330 * Math.pow(2, tierIndex / 6) * 2; // gamme montante
  blip(freq, 0.12, 'square', 0.05);
  if (tierIndex >= 3) blip(freq * 1.5, 0.12, 'square', 0.04, 0.09);
}

/** Fusion : carillon aigu, réservé au palier t6. */
export function playFusion(muted: boolean): void {
  if (muted) return;
  [880, 1175, 1480, 1760].forEach((f, i) => blip(f, 0.35, 'triangle', 0.07, i * 0.08));
}

/** Timeout : silence bref + souffle grave. */
export function playMiss(muted: boolean): void {
  if (muted) return;
  blip(160, 0.4, 'sawtooth', 0.03);
}
