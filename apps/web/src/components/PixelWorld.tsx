'use client';

// ─────────────────────────────────────────────────────────────
// PixelWorld.tsx — décor plein écran de la partie Boiling : une banquise en
// pixel art qui fond, puis un volcan, puis l'enfer, selon la température
// (le score en °C). Dix paliers avec fondu ; secousse + flash aux paliers
// 100 °C, 450 °C et 650 °C ; ambiance sonore synthétisée par palier.
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';
import { drawScene, WORLD_H } from '../pixelworld/scene';
import { BIG_STAGES, flashColorFor, stageFor } from '../pixelworld/stages';
import { createAmbient, type Ambient } from '../pixelworld/ambient';

const TICK_MS = 1000 / 12; // le décor s'anime à ~12 images/s : look rétro, peu coûteux
const FADE_MS = 1100;
const SHAKE_MS = 700;

export interface PixelWorldProps {
  /** Température en °C (= score de la partie). */
  temp: number;
  /** Ambiance sonore (vent, feu, volcan). Coupée par `muted`. */
  ambient?: boolean;
  muted?: boolean;
  /** Force un palier (aperçu) : ignore `temp`. */
  stage?: number;
}

export function PixelWorld({ temp, ambient = true, muted = false, stage: forced }: PixelWorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stage = forced ?? stageFor(temp);
  const stageRef = useRef(stage);
  const mutedRef = useRef(muted);
  const ambientRef = useRef<Ambient | null>(null);
  const previous = useRef(stage);
  const [flash, setFlash] = useState<{ key: number; color: string } | null>(null);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  // Dessin : boucle d'animation avec fondu entre deux paliers
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let width = 256;
    const resize = (): void => {
      const aspect = window.innerWidth / Math.max(1, window.innerHeight);
      width = Math.max(96, Math.min(480, Math.round(WORLD_H * aspect)));
      canvas.width = width;
      canvas.height = WORLD_H;
    };
    resize();
    window.addEventListener('resize', resize);

    const still =
      document.documentElement.classList.contains('low-power') ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
    let shown = stageRef.current;
    let from = shown;
    let fadeStart = -Infinity;
    let last = -Infinity;
    let raf = 0;
    const frame = (now: number): void => {
      raf = requestAnimationFrame(frame);
      if (now - last < TICK_MS) return;
      last = now;
      const tick = still ? 0 : Math.floor(now / TICK_MS);
      const target = stageRef.current;
      if (target !== shown) {
        from = shown;
        shown = target;
        fadeStart = now;
      }
      const k = Math.min(1, (now - fadeStart) / FADE_MS);
      ctx.globalAlpha = 1;
      if (k < 1) {
        drawScene(ctx, from, width, tick);
        ctx.globalAlpha = k;
        drawScene(ctx, shown, width, tick);
        ctx.globalAlpha = 1;
      } else {
        drawScene(ctx, shown, width, tick);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Marque la page : les cartes de jeu passent sur un fond lisible
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('pixel-world-on');
    return () => root.classList.remove('pixel-world-on');
  }, []);

  // Secousse + flash quand on franchit un grand palier (en montant)
  useEffect(() => {
    const root = document.documentElement;
    let timer: number | undefined;
    if (previous.current < stage && BIG_STAGES.has(stage)) {
      setFlash({ key: Date.now(), color: flashColorFor(stage) });
      const calm = root.classList.contains('low-power') || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
      if (!calm) {
        root.classList.add('world-shaking');
        timer = window.setTimeout(() => root.classList.remove('world-shaking'), SHAKE_MS);
      }
    }
    previous.current = stage;
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      root.classList.remove('world-shaking');
    };
  }, [stage]);

  // Ambiance sonore
  useEffect(() => {
    if (!ambient) return;
    const a = createAmbient();
    ambientRef.current = a;
    a.setStage(stageRef.current);
    a.setMuted(mutedRef.current);
    return () => {
      a.dispose();
      ambientRef.current = null;
    };
  }, [ambient]);
  useEffect(() => {
    ambientRef.current?.setStage(stage);
  }, [stage]);
  useEffect(() => {
    mutedRef.current = muted;
    ambientRef.current?.setMuted(muted);
  }, [muted]);

  return (
    <>
      <canvas ref={canvasRef} className="pixel-world" aria-hidden="true" data-testid="pixel-world" data-stage={stage} />
      {flash && <div key={flash.key} className="world-flash-screen" style={{ background: flash.color }} />}
    </>
  );
}
