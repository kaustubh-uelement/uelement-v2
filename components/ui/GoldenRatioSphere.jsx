'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float uPixelRatio;
  uniform float uPointSize;
  uniform float uRadius;
  varying float vAlpha;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    
    // Normalized vertical height on sphere (-1.0 to +1.0)
    float normY = worldPos.y / uRadius;
    
    // Smooth semi-sphere fade to the bottom
    float fade = smoothstep(-0.35, 0.20, normY);
    vAlpha = fade;
    
    vec4 mvPosition = viewMatrix * worldPos;
    
    // Size attenuation with perspective scaling
    gl_PointSize = uPointSize * uPixelRatio * (380.0 / -mvPosition.z) * (0.85 + 0.35 * fade);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    if (vAlpha <= 0.015) discard;
    
    // Smooth circular particle
    vec2 coord = gl_PointCoord - vec2(0.5);
    float distSq = dot(coord, coord);
    if (distSq > 0.25) discard;
    
    float dist = sqrt(distSq);
    float soft = 1.0 - smoothstep(0.35, 0.50, dist);
    
    gl_FragColor = vec4(uColor, vAlpha * soft);
  }
`;

const GoldenRatioSphere = ({
  className = '',
  totalPoints = 24000,
  radius = 180,
  pointColor = '#e4c57d',
  showControls = false,
}) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId;
    let isVisible = true;

    const scene = new THREE.Scene();
    const fov = 50;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || width;

    const camera = new THREE.PerspectiveCamera(
      fov,
      width / height,
      0.1,
      2000
    );

    const halfFovRad = (fov / 2) * (Math.PI / 180);
    const fitFactor = 0.80;
    const updateCameraDistance = (w, h) => {
      const aspect = w / h;
      if (aspect >= 1) {
        camera.position.z = radius / (fitFactor * Math.tan(halfFovRad));
      } else {
        camera.position.z = radius / (fitFactor * Math.tan(halfFovRad) * aspect);
      }
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };

    updateCameraDistance(width, height);

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported:', e);
      return;
    }
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // Generate Golden Ratio (Fibonacci) Points
    const phi = 0.618033988749895;
    const goldenAngle = 2 * Math.PI * phi;

    const positions = new Float32Array(totalPoints * 3);

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
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const colorObj = new THREE.Color(pointColor);
    const isMobile = window.innerWidth < 768;

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: pixelRatio },
        uPointSize: { value: isMobile ? 3.0 : 2.5 },
        uRadius: { value: radius },
        uColor: { value: new THREE.Vector3(colorObj.r, colorObj.g, colorObj.b) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const pointsMesh = new THREE.Points(geometry, shaderMaterial);
    scene.add(pointsMesh);

    // Initial slight forward tilt to reveal the golden spiral pole
    pointsMesh.rotation.x = 0.22;

    // Interaction: click & drag with momentum and damping
    let isDragging = false;
    let previousPointer = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };
    const dragSensitivity = 0.005;
    const damping = 0.95;
    const velocityFloor = 0.0001;

    const getPointerPos = (e) => ({ x: e.clientX, y: e.clientY });

    const onPointerDown = (e) => {
      isDragging = true;
      dragVelocity = { x: 0, y: 0 };
      previousPointer = getPointerPos(e);
      container.style.cursor = 'grabbing';
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;

      const current = getPointerPos(e);
      const deltaX = current.x - previousPointer.x;
      const deltaY = current.y - previousPointer.y;
      previousPointer = current;

      const rotY = deltaX * dragSensitivity;
      const rotX = deltaY * dragSensitivity;

      pointsMesh.rotation.y += rotY;
      pointsMesh.rotation.x += rotX;

      dragVelocity = { x: rotX, y: rotY };
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = 'grab';
    };

    container.style.cursor = 'grab';
    container.style.touchAction = 'none';
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    window.addEventListener('blur', endDrag);

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || w;
      const currentRatio = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(currentRatio);
      renderer.setSize(w, h);
      shaderMaterial.uniforms.uPixelRatio.value = currentRatio;
      updateCameraDistance(w, h);
    };

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
    }
    window.addEventListener('resize', handleResize);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    let lastTime = performance.now();
    const animate = (time) => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (isDragging) {
        // Being directly manipulated
      } else if (
        Math.abs(dragVelocity.x) > velocityFloor ||
        Math.abs(dragVelocity.y) > velocityFloor
      ) {
        pointsMesh.rotation.x += dragVelocity.x;
        pointsMesh.rotation.y += dragVelocity.y;
        dragVelocity.x *= damping;
        dragVelocity.y *= damping;
      } else {
        dragVelocity = { x: 0, y: 0 };
        // Gentle steady orbital auto-rotation
        pointsMesh.rotation.y += 0.0016 * 60 * delta;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
      window.removeEventListener('blur', endDrag);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
    };
  }, [totalPoints, radius, pointColor]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full ${className}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'auto',
      }}
    />
  );
};

export default GoldenRatioSphere;
