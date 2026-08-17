'use client';

import { useEffect, useRef } from 'react';

const ROSE = '#f43f5e';
const ROSE_DIM = 'rgba(244, 63, 94, 0.28)';

interface BlockElement {
  i: number;
  born: number;
}

export default function LedgerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const blocksRef = useRef<BlockElement[]>([]);
  const clockRef = useRef<number>(0);
  const counterRef = useRef<number>(0);
  const nextBlockRef = useRef<number>(900);

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

    const addBlock = () => {
      const blocks = blocksRef.current;
      blocks.push({ i: counterRef.current++, born: clockRef.current });
      if (blocks.length > 9) blocks.shift();
    };

    const drawLedger = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const blocks = blocksRef.current;
      const clock = clockRef.current;

      ctx.clearRect(0, 0, w, h);

      const gx = Math.max(46, w / 26);
      const gy = Math.max(46, h / 12);
      
      for (let x = gx; x < w; x += gx) {
        for (let y = gy * 0.6; y < h; y += gy) {
          const lit = Math.sin(x * 0.07) + Math.cos(y * 0.11) > 1.45;
          ctx.beginPath();
          ctx.arc(x, y, lit ? 1.9 : 1.1, 0, Math.PI * 2);
          ctx.fillStyle = lit ? ROSE_DIM : 'rgba(140, 154, 168, 0.12)';
          ctx.fill();
        }
      }

      const bw = Math.min(74, w / 13);
      const bh = bw * 0.62;
      const gap = bw * 0.42;
      const chainY = h * 0.66;
      const startX = w * 0.30;

      blocks.forEach((b, idx) => {
        const age = clock - b.born;
        const appear = Math.min(1, age / 420);
        const seal = Math.max(0, 1 - Math.max(0, age - 420) / 700);
        const bx = startX + idx * (bw + gap);
        
        if (bx > w + bw) return;

        if (idx > 0) {
          ctx.beginPath();
          ctx.moveTo(bx - gap, chainY + bh / 2);
          ctx.lineTo(bx, chainY + bh / 2);
          ctx.strokeStyle = ROSE;
          ctx.globalAlpha = 0.32 * appear;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(bx, chainY, bw, bh, 4);
        } else {
          ctx.rect(bx, chainY, bw, bh);
        }
        ctx.strokeStyle = ROSE;
        ctx.globalAlpha = (0.3 + 0.5 * seal) * appear;
        ctx.lineWidth = 1.5;
        if (seal > 0.02) {
          ctx.shadowColor = ROSE;
          ctx.shadowBlur = 16 * seal;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.globalAlpha = 0.34 * appear;
        ctx.lineWidth = 1;
        for (let r = 0; r < 3; r++) {
          const ly = chainY + bh * (0.3 + r * 0.22);
          const lw = bw * (0.28 + ((b.i + r) % 4) * 0.14);
          ctx.beginPath();
          ctx.moveTo(bx + bw * 0.16, ly);
          ctx.lineTo(bx + bw * 0.16 + lw, ly);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      });
    };

    window.addEventListener('resize', resize);
    resize();

    // Initial seed
    for (let i = 0; i < 6; i++) {
      clockRef.current += 1500;
      addBlock();
    }
    clockRef.current += 2000;

    let lastTime = performance.now();
    const frame = (timestamp: number) => {
      // Re-apply DPR transform each frame
      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);

      let dt = timestamp - lastTime;
      // Cap dt so a background tab returning doesn't cause a huge jump
      if (dt > 48) dt = 48;
      lastTime = timestamp;

      clockRef.current += dt;
      nextBlockRef.current -= dt;
      if (nextBlockRef.current <= 0) {
        addBlock();
        nextBlockRef.current = 1500 + Math.random() * 900;
      }

      drawLedger();

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
      data-canvas="ledger"
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
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 70%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 70%)',
      }}
    />
  );
}
