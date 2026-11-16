// ambient.ts — ambiance sonore du décor, synthétisée (Web Audio, aucun fichier).
// Vent glacial → gouttes de fonte → crépitement du feu → grondement du volcan
// → explosions → rugissements. Chaque palier règle le volume de ses couches
// et la fréquence des petits événements (gouttes, craquements, explosions).
import { getAudioContext } from '../sound';

export interface Ambient {
  setStage(stage: number): void;
  setMuted(muted: boolean): void;
  dispose(): void;
}

const NOOP: Ambient = { setStage() {}, setMuted() {}, dispose() {} };

// Volume des trois nappes continues, par palier : [vent, grondement, souffle de feu]
const BEDS: [number, number, number][] = [
  [0.5, 0, 0],
  [0.55, 0, 0],
  [0.3, 0, 0.04],
  [0.18, 0, 0.1],
  [0.12, 0, 0.22],
  [0.08, 0.15, 0.26],
  [0, 0.35, 0.26],
  [0, 0.5, 0.3],
  [0, 0.8, 0.4],
  [0, 1, 0.5],
];

// Probabilité, à chaque pas de 200 ms, de : [goutte, craquement, explosion, rugissement]
const EVENTS: [number, number, number, number][] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0.25, 0, 0, 0],
  [0.35, 0, 0, 0],
  [0.05, 0.3, 0, 0],
  [0, 0.3, 0, 0],
  [0, 0.4, 0, 0],
  [0, 0.6, 0.02, 0],
  [0, 0.6, 0.09, 0],
  [0, 0.7, 0.1, 0.04],
];

const MASTER = 0.2;

export function createAmbient(): Ambient {
  const ctx = getAudioContext();
  if (!ctx) return NOOP;

  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const sources: AudioBufferSourceNode[] = [];
  const bed = (type: BiquadFilterType, freq: number, q: number): GainNode => {
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    src.connect(filter).connect(gain).connect(master);
    src.start();
    sources.push(src);
    return gain;
  };
  const wind = bed('bandpass', 450, 0.6);
  const rumble = bed('lowpass', 110, 0.8);
  const hiss = bed('highpass', 3200, 0.5);

  let stage = 0;
  let muted = false;
  let hidden = typeof document !== 'undefined' && document.hidden;

  const level = (): void => {
    const now = ctx.currentTime;
    const [w, r, h] = BEDS[stage]!;
    const on = !muted && !hidden;
    master.gain.setTargetAtTime(on ? MASTER : 0, now, 0.2);
    wind.gain.setTargetAtTime(w, now, 0.8);
    rumble.gain.setTargetAtTime(r, now, 0.8);
    hiss.gain.setTargetAtTime(h, now, 0.8);
  };

  const burst = (freq: number, type: BiquadFilterType, dur: number, vol: number): void => {
    const t0 = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter).connect(gain).connect(master);
    src.start(t0, Math.random() * 1.5, dur + 0.05);
  };

  const tone = (from: number, to: number, dur: number, wave: OscillatorType, vol: number): void => {
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = wave;
    osc.frequency.setValueAtTime(from, t0);
    osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  };

  const timer = window.setInterval(() => {
    if (muted || hidden) return;
    const [drip, crackle, boom, roar] = EVENTS[stage]!;
    if (Math.random() < drip) tone(900 + Math.random() * 700, 600, 0.09, 'sine', 0.35);
    if (Math.random() < crackle) burst(1500 + Math.random() * 3000, 'bandpass', 0.03 + Math.random() * 0.06, 0.5);
    if (Math.random() < boom) {
      burst(180, 'lowpass', 0.9, 1);
      tone(90, 38, 0.8, 'sine', 0.8);
    }
    if (Math.random() < roar) tone(80, 38, 1.3, 'sawtooth', 0.22);
  }, 200);

  const onVisibility = (): void => {
    hidden = document.hidden;
    level();
  };
  const onGesture = (): void => {
    if (ctx.state === 'suspended') void ctx.resume();
  };
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pointerdown', onGesture);
  window.addEventListener('keydown', onGesture);
  level();

  return {
    setStage(s) {
      stage = Math.max(0, Math.min(BEDS.length - 1, s));
      level();
    },
    setMuted(m) {
      muted = m;
      level();
    },
    dispose() {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointerdown', onGesture);
      window.removeEventListener('keydown', onGesture);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
      window.setTimeout(() => {
        for (const s of sources) {
          try {
            s.stop();
          } catch {
            /* déjà arrêtée */
          }
        }
        master.disconnect();
      }, 500);
    },
  };
}
