'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroDottedGlobeProps {
  className?: string;
  totalPoints?: number;
  radius?: number;
}

// Ultra-fast GLSL Shaders for Butter-Smooth Particle Rendering
const vertexShader = `
  uniform float uPixelRatio;
  uniform float uPointSize;
  attribute float aBrightness;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    
    // Normalized vertical height on sphere (-1.0 to +1.0)
    float normY = worldPos.y / 200.0;
    
    // Smooth fade going to bottom:
    // Full opacity on upper hemisphere, fading through the equator to 0 below -0.40
    float fade = smoothstep(-0.40, 0.20, normY);
    
    vAlpha = fade * aBrightness;
    vColor = aColor;
    
    vec4 mvPosition = viewMatrix * worldPos;
    
    // Size attenuation with smooth perspective scaling
    gl_PointSize = uPointSize * uPixelRatio * (300.0 / -mvPosition.z) * (0.85 + 0.35 * fade);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Instant discard for invisible points on lower half (zero fragment cost!)
    if (vAlpha <= 0.015) discard;
    
    // Circular particle with smooth anti-aliased edge
    vec2 coord = gl_PointCoord - vec2(0.5);
    float distSq = dot(coord, coord);
    if (distSq > 0.25) discard;
    
    float dist = sqrt(distSq);
    // Defined, thick core with smooth anti-aliased edge
    float soft = 1.0 - smoothstep(0.35, 0.50, dist);
    
    gl_FragColor = vec4(vColor, vAlpha * soft);
  }
`;

export default function HeroDottedGlobe({
  className = '',
  totalPoints = 34000, // Balanced, elegant density (34k points)
  radius = 200,
}: HeroDottedGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let isVisible = true;

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

    // Camera distance calibrated so sphere diameter fills ~94% of container width
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

    // Highly optimized WebGL Renderer (no depth/stencil buffer overhead, antialias via shader)
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      depth: false,
      stencil: false,
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(initialWidth, initialHeight);
    container.appendChild(renderer.domElement);

    // Generate Dense Golden Ratio (Fibonacci) Points
    const phi = 0.618033988749895;
    const goldenAngle = 2 * Math.PI * phi;

    const positions = new Float32Array(totalPoints * 3);
    const colors = new Float32Array(totalPoints * 3);
    const brightnesses = new Float32Array(totalPoints);

    // Base color: Rich Metallic Warm Gold (#E2AC6E)
    const baseR = 0.91;
    const baseG = 0.70;
    const baseB = 0.45;

    // Highlight color: Brilliant Champagne Gold (#FFFBF0)
    const highR = 1.0;
    const highG = 0.985;
    const highB = 0.94;

    for (let i = 0; i < totalPoints; i++) {
      const y = 1 - (i / (totalPoints - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      const idx = i * 3;
      positions[idx] = x * radius;
      positions[idx + 1] = y * radius;
      positions[idx + 2] = z * radius;

      // ~11% highlight points distributed systematically
      const isHighlight = i % 9 === 0;

      if (isHighlight) {
        colors[idx] = highR;
        colors[idx + 1] = highG;
        colors[idx + 2] = highB;
        brightnesses[i] = 1.0;
      } else {
        // Subtle natural variation in base dots
        const shade = 0.88 + (i % 5) * 0.04;
        colors[idx] = baseR * shade;
        colors[idx + 1] = baseG * shade;
        colors[idx + 2] = baseB * shade;
        brightnesses[i] = shade;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aBrightness', new THREE.BufferAttribute(brightnesses, 1));

    const isMobile = window.innerWidth < 768;
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: pixelRatio },
        uPointSize: { value: isMobile ? 3.4 : 2.9 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const pointsMesh = new THREE.Points(geometry, shaderMaterial);
    scene.add(pointsMesh);

    // Initial aesthetic tilt of the globe
    pointsMesh.rotation.x = 0.28;
    pointsMesh.rotation.z = -0.12;

    // Interactive pointer parallax (subtle and lag-free)
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetTiltX = ny * 0.09;
      targetTiltY = nx * 0.14;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || w;
      const currentRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(currentRatio);
      renderer.setSize(w, h);
      shaderMaterial.uniforms.uPixelRatio.value = currentRatio;
      updateCameraDistance(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Pause rendering when hero is scrolled out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop with delta timing for smooth 60-120fps across all screens
    let lastTime = performance.now();
    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Continuous smooth orbital rotation
      pointsMesh.rotation.y += 0.0016 * 60 * delta;

      // Damped pointer parallax
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      pointsMesh.rotation.x = 0.28 + currentTiltX;
      pointsMesh.rotation.z = -0.12 + currentTiltY;

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

      geometry.dispose();
      shaderMaterial.dispose();
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
        willChange: 'transform',
      }}
    />
  );
}
