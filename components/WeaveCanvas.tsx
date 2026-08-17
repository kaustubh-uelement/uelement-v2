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
  t: number,
  base: number,
  amp: number,
  freq: number,
  phase: number,
  colorStr: string,
  width: number,
  glow: boolean
) {
  ctx.beginPath();
  for (let i = 0; i <= 60; i++) {
    const x = (i / 60) * w;
    const y =
      base +
      Math.sin((x / w) * Math.PI * freq + phase + t) * amp +
      Math.sin((x / w) * Math.PI * (freq * 0.5) + t * 0.6) * (amp * 0.4);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  // Create gradient fading from left to right
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
  ms: number,
  reduced: boolean
) {
  // Speed up the wave animation slightly to make it more noticeable
  const t = reduced ? 0 : ms * 0.00045;
  ctx.clearRect(0, 0, w, h);

  const gap = Math.max(48, w / 26);
  ctx.lineWidth = 1;
  
  // Draw vertical grid lines with gradient fading left
  for (let x = gap / 2; x < w; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, FAINT_ZERO);
    grad.addColorStop(0.3, FAINT_ZERO);
    grad.addColorStop(1, FAINT);
    ctx.strokeStyle = grad;
    ctx.stroke();
  }

  // Draw horizontal faint lines
  for (let i = 0; i < 16; i++) {
    weaveLine(
      ctx,
      w,
      h,
      t,
      (h / 17) * (i + 1),
      14,
      2.2 + (i % 3) * 0.6,
      i * 1.7,
      FAINT,
      1,
      false
    );
  }

  // Draw colored threads
  THREADS.forEach(function (c, j) {
    weaveLine(
      ctx,
      w,
      h,
      t,
      h * (0.42 + j * 0.14),
      26 + j * 5,
      1.6 + j * 0.35,
      j * 2.2,
      c,
      2,
      true
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

    let rafId: number;
    let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleMediaChange = (e: MediaQueryListEvent) => {
      reduced = e.matches;
    };
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', handleMediaChange);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) {
        drawWeave(ctx, w, h, 16, reduced);
      }
    };

    window.addEventListener('resize', resize);
    resize();

    // Use performance.now() to ensure continuous smooth animation
    const startTime = performance.now();
    const frame = (timestamp: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const ms = timestamp - startTime;
      drawWeave(ctx, w, h, ms, reduced);
      if (!reduced) {
        rafId = requestAnimationFrame(frame);
      }
    };

    if (reduced) {
      frame(performance.now());
    } else {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      window.removeEventListener('resize', resize);
      mediaQuery.removeEventListener('change', handleMediaChange);
      if (rafId) cancelAnimationFrame(rafId);
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
