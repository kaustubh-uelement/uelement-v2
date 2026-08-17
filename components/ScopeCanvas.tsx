'use client';

import { useEffect, useRef } from 'react';

const LANES = [
  '#34d399',
  '#22d3ee',
  '#38bdf8',
  '#60a5fa',
  '#818cf8',
  '#a78bfa',
  '#e879f9',
];

interface LaneElement {
  x: number;
  w: number;
  a: number;
  corr: boolean;
}

interface LinkElement {
  x: number;
  rows: number[];
  life: number;
}

export default function ScopeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use refs for mutable animation state so it persists across renders
  const lanesRef = useRef<LaneElement[][]>(LANES.map(() => []));
  const linksRef = useRef<LinkElement[]>([]);
  const nextCorrRef = useRef<number>(1400);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const scale = dpr();
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const scopeGeom = (w: number, h: number) => {
      const top = h * 0.16;
      const bottom = h * 0.9;
      return { top, gap: (bottom - top) / (LANES.length - 1), x1: w };
    };

    const seedScope = () => {
      const g = scopeGeom(canvas.clientWidth, canvas.clientHeight);
      const lanes = lanesRef.current;
      lanes.forEach((q) => {
        q.length = 0;
        const n = 14 + Math.floor(Math.random() * 8);
        for (let i = 0; i < n; i++) {
          q.push({
            x: Math.random() * g.x1,
            w: 2 + Math.random() * 16,
            a: 0.25 + Math.random() * 0.5,
            corr: false,
          });
        }
      });
    };

    const fireCorrelation = (w: number) => {
      const lanes = lanesRef.current;
      const links = linksRef.current;
      const count = 3 + Math.floor(Math.random() * 3);
      const pool = [0, 1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);
      const rows = pool.slice(0, count).sort((a, b) => a - b);
      const x = w * (0.55 + Math.random() * 0.35);
      rows.forEach((r) => {
        lanes[r].push({ x, w: 22, a: 1, corr: true });
      });
      links.push({ x, rows, life: 1 });
    };

    const drawScope = (dt: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const g = scopeGeom(w, h);
      const { top, gap, x1 } = g;
      const lanes = lanesRef.current;
      let links = linksRef.current;

      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(140, 154, 168, 0.055)';
      ctx.lineWidth = 1;
      const step = Math.max(90, w / 14);
      for (let x = w % step; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, top - gap * 0.5);
        ctx.lineTo(x, top + gap * (LANES.length - 0.5));
        ctx.stroke();
      }

      links = links.filter((l) => l.life > 0);
      linksRef.current = links; // Update the ref after filtering
      
      links.forEach((l) => {
        ctx.beginPath();
        ctx.moveTo(l.x, top + gap * l.rows[0]);
        ctx.lineTo(l.x, top + gap * l.rows[l.rows.length - 1]);
        ctx.strokeStyle = `rgba(232, 240, 245, ${0.16 * l.life})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        l.life -= dt * 0.0011;
      });

      lanes.forEach((q, i) => {
        const y = top + gap * i;
        const color = LANES[i];
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = 'rgba(140, 154, 168, 0.10)';
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let k = q.length - 1; k >= 0; k--) {
          const e = q[k];
          e.x -= dt * (0.028 + i * 0.0016);
          if (e.x + e.w < 0) {
            q.splice(k, 1);
            continue;
          }
          ctx.beginPath();
          ctx.moveTo(e.x, y);
          ctx.lineTo(e.x + e.w, y);
          ctx.strokeStyle = color;
          ctx.globalAlpha = e.corr ? Math.min(1, e.a) : e.a * 0.75;
          ctx.lineWidth = e.corr ? 3 : 2;
          if (e.corr) {
            ctx.shadowColor = color;
            ctx.shadowBlur = 14;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
          
          if (e.corr) {
            e.a -= dt * 0.0008;
          }
          if (e.a <= 0.15) e.corr = false;
        }
        
        // Randomly spawn new elements
        if (Math.random() < 0.045 + i * 0.004) {
          q.push({
            x: x1 + Math.random() * 40,
            w: 2 + Math.random() * 16,
            a: 0.25 + Math.random() * 0.5,
            corr: false,
          });
        }
      });
    };

    window.addEventListener('resize', resize);
    resize();

    // Initial seed
    seedScope();

    let lastTime = performance.now();
    const frame = (timestamp: number) => {
      // Re-apply DPR transform each frame
      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);

      let dt = timestamp - lastTime;
      // Cap dt so a background tab returning doesn't cause a huge jump
      if (dt > 48) dt = 48;
      lastTime = timestamp;

      nextCorrRef.current -= dt;
      if (nextCorrRef.current <= 0) {
        fireCorrelation(canvas.clientWidth);
        nextCorrRef.current = 2600 + Math.random() * 2200;
      }

      drawScope(dt);

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="rig"
      data-canvas="scope"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        // Fade out the left side smoothly using CSS mask
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 40%)',
      }}
    />
  );
}
