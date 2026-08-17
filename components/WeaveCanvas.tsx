'use client';

import { useEffect, useRef } from 'react';

// Convert hex to rgba for gradient
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const THREADS = ['#6d5df5', '#5b8def', '#35c4b5', '#e8b04b'];
const FAINT = 'rgba(154, 160, 190, 0.10)';
const FAINT_ZERO = 'rgba(154, 160, 190, 0)';

function weaveLine(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  base: number,
  amp: number,
  freq: number,
  phase: number,
  colorStr: string,
  width: number,
  glow: boolean,
  speed = 1
) {
  ctx.beginPath();

  const points = 120;

  for (let i = 0; i <= points; i++) {
    const x = (i / points) * w;
    const progress = x / w;

    // Main travelling wave
    const wave1 =
      Math.sin(progress * Math.PI * freq + phase + time * speed) * amp;

    // Secondary wave gives the line a more organic shape
    const wave2 =
      Math.sin(
        progress * Math.PI * (freq * 0.55) + phase * 0.7 + time * speed * 0.55
      ) *
      amp *
      0.35;

    // Very subtle amplitude breathing
    const breathing = 1 + Math.sin(time * speed * 0.35 + phase) * 0.08;

    const y = base + (wave1 + wave2) * breathing;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  // Fade the wave in from left to right
  const grad = ctx.createLinearGradient(0, 0, w, 0);

  if (colorStr === FAINT) {
    grad.addColorStop(0, FAINT_ZERO);
    grad.addColorStop(0.3, FAINT_ZERO);
    grad.addColorStop(1, FAINT);
  } else {
    grad.addColorStop(0, hexToRgba(colorStr, 0));
    grad.addColorStop(0.3, hexToRgba(colorStr, 0));
    grad.addColorStop(1, colorStr);
  }

  ctx.strokeStyle = grad;
  ctx.lineWidth = width;

  if (glow) {
    ctx.shadowColor = colorStr;
    ctx.shadowBlur = 14;
  } else {
    ctx.shadowBlur = 0;
  }

  ctx.stroke();

  ctx.shadowBlur = 0;
}

function drawWeave(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  ms: number
) {
  /*
   * Increase this value for faster movement.
   *
   * 0.001 = slow
   * 0.0015 = noticeable
   * 0.002 = quite fluid
   */
  const time = ms * 0.0015;

  ctx.clearRect(0, 0, w, h);

  const gap = Math.max(48, w / 26);

  // --------------------------------------------------
  // Vertical grid
  // --------------------------------------------------

  for (let x = gap / 2; x < w; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);

    const grad = ctx.createLinearGradient(0, 0, w, 0);

    grad.addColorStop(0, FAINT_ZERO);
    grad.addColorStop(0.3, FAINT_ZERO);
    grad.addColorStop(1, FAINT);

    ctx.strokeStyle = grad;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // --------------------------------------------------
  // Faint background waves
  // --------------------------------------------------

  for (let i = 0; i < 16; i++) {
    weaveLine(
      ctx,
      w,
      h,
      time,
      (h / 17) * (i + 1),

      14,

      2.2 + (i % 3) * 0.6,

      i * 1.7,

      FAINT,

      1,

      false,

      0.35 + (i % 4) * 0.05
    );
  }

  // --------------------------------------------------
  // Main colored threads
  // --------------------------------------------------

  THREADS.forEach((color, index) => {
    weaveLine(
      ctx,
      w,
      h,
      time,

      // Vertical position
      h * (0.42 + index * 0.14),

      // Amplitude
      26 + index * 5,

      // Frequency
      1.6 + index * 0.35,

      // Different starting phase
      index * 2.2,

      color,

      2,

      true,

      // Different speed per thread
      0.65 + index * 0.12
    );
  });
}

export default function WeaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let frameCount = 0;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const scale = dpr();
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      console.log('[WeaveCanvas] resize → clientW:', w, 'clientH:', h, 'dpr:', scale);
    };

    const render = (timestamp: number) => {
      frameCount++;

      // Log first 5 frames and then every 60 frames
      if (frameCount <= 5 || frameCount % 60 === 0) {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        console.log(
          `[WeaveCanvas] frame=${frameCount} ts=${timestamp.toFixed(0)}ms time=${(timestamp * 0.0015).toFixed(3)} clientW=${w} clientH=${h}`
        );
      }

      // Re-apply DPR transform each frame — setting canvas.width/height
      // (which happens on resize) resets the context transform to identity.
      const scale = dpr();
      ctx.setTransform(scale, 0, 0, scale, 0, 0);

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      drawWeave(ctx, w, h, timestamp);

      rafId = requestAnimationFrame(render);
    };

    resize();

    window.addEventListener('resize', resize);

    rafId = requestAnimationFrame(render);
    console.log('[WeaveCanvas] RAF started, rafId:', rafId);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      console.log('[WeaveCanvas] cleanup, cancelled rafId:', rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="rig"
      data-canvas="weave"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
