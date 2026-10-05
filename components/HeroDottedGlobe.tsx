'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroDottedGlobeProps {
  className?: string;
  totalPoints?: number;
  radius?: number;
}

export default function HeroDottedGlobe({
  className = '',
  totalPoints = 8800,
  radius = 200,
}: HeroDottedGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let isVisible = true;

    // Helper: create smooth circular dot texture with soft falloff
    const createDotTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.35)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const dotTexture = createDotTexture();

    // Scene & Camera
    const scene = new THREE.Scene();
    const fov = 50;
    const initialWidth = container.clientWidth || window.innerWidth;
    const initialHeight = container.clientHeight || initialWidth;

    const camera = new THREE.PerspectiveCamera(
      fov,
      initialWidth / initialHeight,
      0.1,
      2000
    );

    // Calculate camera distance so sphere fills ~94% of container width
    const halfFovRad = (fov / 2) * (Math.PI / 180);
    const updateCameraDistance = (w: number, h: number) => {
      const aspect = w / h;
      if (aspect >= 1) {
        camera.position.z = radius / (0.94 * Math.tan(halfFovRad));
      } else {
        camera.position.z = radius / (0.94 * Math.tan(halfFovRad) * aspect);
      }
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };

    updateCameraDistance(initialWidth, initialHeight);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(initialWidth, initialHeight);
    container.appendChild(renderer.domElement);

    // Generate Golden Ratio (Fibonacci) Points
    const phi = 0.618033988749895; // Golden ratio fractional part
    const goldenAngle = 2 * Math.PI * phi;

    const basePositions: number[] = [];
    const highlightPositions: number[] = [];

    // Distribute points across sphere
    const highlightRatio = 0.08; // ~8% highlight points
    for (let i = 0; i < totalPoints; i++) {
      const y = 1 - (i / (totalPoints - 1)) * 2; // +1 at top to -1 at bottom
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      const px = x * radius;
      const py = y * radius;
      const pz = z * radius;

      if (i % 12 === 0 && Math.random() < highlightRatio * 12) {
        highlightPositions.push(px, py, pz);
      } else {
        basePositions.push(px, py, pz);
      }
    }

    const group = new THREE.Group();
    scene.add(group);

    // Initial tilt to show the globe's curvature aesthetically
    group.rotation.x = 0.28;
    group.rotation.z = -0.12;

    // Base Points Mesh (Warm Metallic Gold: #E0A769)
    const baseGeo = new THREE.BufferGeometry();
    baseGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(basePositions, 3)
    );

    const isMobile = window.innerWidth < 768;
    const baseMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#E0A769'),
      size: isMobile ? 3.0 : 2.4,
      map: dotTexture,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const baseMesh = new THREE.Points(baseGeo, baseMaterial);
    group.add(baseMesh);

    // Shimmer Highlight Points (Bright White-Gold: #FFF8E7)
    const highlightGeo = new THREE.BufferGeometry();
    highlightGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(highlightPositions, 3)
    );

    const highlightMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#FFF8E7'),
      size: isMobile ? 3.8 : 3.2,
      map: dotTexture,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const highlightMesh = new THREE.Points(highlightGeo, highlightMaterial);
    group.add(highlightMesh);

    // Interactive pointer parallax tracking
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetTiltX = ny * 0.12;
      targetTiltY = nx * 0.18;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || w;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h);
      updateCameraDistance(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Pause rendering when hero is out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Base rotation
      baseMesh.rotation.y += 0.0018 * 60 * delta;
      baseMesh.rotation.x += 0.0006 * 60 * delta;

      // Highlight subtle counter-shimmer rotation
      highlightMesh.rotation.y += 0.0022 * 60 * delta;
      highlightMesh.rotation.x += 0.0007 * 60 * delta;

      // Smooth pointer parallax damping
      currentTiltX += (targetTiltX - currentTiltX) * 0.04;
      currentTiltY += (targetTiltY - currentTiltY) * 0.04;

      group.rotation.x = 0.28 + currentTiltX;
      group.rotation.y = currentTiltY;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      baseGeo.dispose();
      baseMaterial.dispose();
      highlightGeo.dispose();
      highlightMaterial.dispose();
      dotTexture.dispose();
      renderer.dispose();
    };
  }, [totalPoints, radius]);

  return (
    <div
      ref={containerRef}
      className={`hero-dotted-globe-canvas w-full h-full ${className}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}
