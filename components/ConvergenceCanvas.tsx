'use client';

import { useEffect, useRef } from 'react';

const STAYS = [
  { color: '#6d5df5', spread: -0.34 },
  { color: '#38bdf8', spread: 0.06 },
  { color: '#f43f5e', spread: 0.42 },
];

export default function ConvergenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;

    // Initialize pulses locally so they work per-component-mount
    const pulses = STAYS.map((_, i) =>
      [0.15, 0.55, 0.9].map((t) => ({
        t: t + i * 0.1,
        speed: 0.00012 + i * 0.00002,
      }))
    );

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const scale = dpr();
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const drawRig = (dt: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const mastX = w * 0.68;
      const headY = h * 0.13;
      const footY = h * 0.94;
      const anchorY = h * 0.88;

      ctx.clearRect(0, 0, w, h);

      // Faint horizontal guide lines
      ctx.strokeStyle = 'rgba(140, 154, 168, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        const y = h * (0.2 * i + 0.08);
        ctx.beginPath();
        ctx.moveTo(w * 0.3, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Mast
      ctx.beginPath();
      ctx.moveTo(mastX, headY);
      ctx.lineTo(mastX, footY);
      ctx.strokeStyle = 'rgba(217, 164, 65, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Mast head jewel
      ctx.beginPath();
      ctx.arc(mastX, headY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#d9a441';
      ctx.shadowColor = '#d9a441';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Stays + pulse beads
      STAYS.forEach((s, i) => {
        const ax = mastX + w * s.spread;
        const ay = anchorY;

        // Stay line
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(mastX, headY);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = 0.28;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Anchor dot
        ctx.beginPath();
        ctx.arc(ax, ay, 3, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = 0.75;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Travelling pulse beads — always advance, no reduced-motion guard
        pulses[i].forEach((p) => {
          p.t += dt * p.speed;
          if (p.t > 1) p.t -= 1;

          const px = ax + (mastX - ax) * p.t;
          const py = ay + (headY - ay) * p.t;
          const near = 0.35 + p.t * 0.65;

          ctx.beginPath();
          ctx.arc(px, py, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = near;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 12 * near;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        });
      });
    };

    window.addEventListener('resize', resize);
    resize();

    let lastTime = performance.now();

    const frame = (timestamp: number) => {
      // Re-apply DPR transform each frame — setting canvas.width/height on
      // resize resets the context transform to identity.
      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);

      let dt = timestamp - lastTime;
      // Cap dt so a background tab returning doesn't cause a huge jump
      if (dt > 48) dt = 48;
      lastTime = timestamp;

      drawRig(dt);

      // Always keep the loop alive — no reduced-motion kill switch
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
      data-canvas="rig"
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
