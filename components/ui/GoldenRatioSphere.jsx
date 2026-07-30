'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GoldenRatioSphere = ({
  className = '',
  showControls = true,
  totalPoints = 9000,
  radius = 180,
}) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 500; // fallback if container has no height
    if (container.clientHeight === 0 && className === '') {
      height = window.innerHeight; // Default to full screen if no class limits it
    }

    let scene, camera, renderer, points, material, geometry;
    let vertices = [];
    let highlightVertices = [];
    let animationFrameId;
    let gui;

    const controls = {
      totalPoints: totalPoints,
      distributionConstant: 0.6180339887, // Golden Ratio
      pointSize: 2,
      rotationSpeed: 0.002,
      pointColor: '#cfa007', // Golden secondary color
      highlightEnabled: false,
      highlightPercentage: 0,
      offset: 0,
    };

    // --- Drag / interaction state ---
    let isDragging = false;
    let previousPointer = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };
    const dragSensitivity = 0.008;
    const damping = 0.95; // how quickly momentum decays after release
    const velocityFloor = 0.0002; // below this, snap back to steady auto-rotation

    const init = async () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 500;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      // Optional: uncomment below for transparent bg
      // renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      geometry = new THREE.BufferGeometry();

      material = new THREE.PointsMaterial({
        color: controls.pointColor,
        size: controls.pointSize,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      if (showControls) {
        try {
          const dat = await import('dat.gui');
          gui = new dat.GUI({ autoPlace: false });

          gui.domElement.style.position = 'absolute';
          gui.domElement.style.top = '10px';
          gui.domElement.style.right = '10px';
          container.appendChild(gui.domElement);

          gui
            .add(controls, 'totalPoints', 100, 5000)
            .step(1)
            .onChange(updateSphere);
          gui
            .add(controls, 'distributionConstant', 0.1, 4.6666)
            .step(0.001)
            .onChange(updateSphere);
          gui
            .add(controls, 'pointSize', 1, 10)
            .step(0.1)
            .onChange(updatePointSize);
          gui.add(controls, 'rotationSpeed', 0.001, 0.1).step(0.001);
          gui.addColor(controls, 'pointColor').onChange(updatePointColor);
          gui.add(controls, 'highlightEnabled').onChange(toggleHighlight);
          gui
            .add(controls, 'highlightPercentage', 1, 100)
            .step(1)
            .onChange(highlightPoints);
          gui.add(controls, 'offset', 0, 100).step(1).onChange(highlightPoints);
        } catch (e) {
          console.error('dat.gui could not be loaded', e);
        }
      }

      createSphere(controls.totalPoints, controls.distributionConstant);
      highlightPoints();
      setupInteraction();
      animate();
    };

    const createSphere = (pts, phi) => {
      vertices = [];
      highlightVertices = [];
      for (let i = 0; i < pts; i++) {
        let theta = 2 * Math.PI * i * phi;
        let y = 1 - (i / (pts - 1)) * 2;
        let r = Math.sqrt(1 - y * y);
        let x = Math.cos(theta) * r;
        let z = Math.sin(theta) * r;
        vertices.push(x * radius, y * radius, z * radius);
      }
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      geometry.attributes.position.needsUpdate = true;
      highlightPoints();
    };

    const highlightPoints = () => {
      highlightVertices = [];
      for (let i = 0; i < controls.totalPoints; i++) {
        if ((i + controls.offset) % controls.highlightPercentage === 0) {
          highlightVertices.push(
            vertices[i * 3],
            vertices[i * 3 + 1],
            vertices[i * 3 + 2]
          );
        }
      }
      updateHighlight();
    };

    const updateHighlight = () => {
      const existingHighlightPoints = scene.getObjectByName('highlightPoints');
      if (existingHighlightPoints) {
        scene.remove(existingHighlightPoints);
      }

      if (controls.highlightEnabled && highlightVertices.length > 0) {
        const highlightGeometry = new THREE.BufferGeometry();
        highlightGeometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(highlightVertices, 3)
        );
        const highlightMaterial = new THREE.PointsMaterial({
          color: 0xffd700,
          size: controls.pointSize * 1.1,
        });
        const highlightPointsMesh = new THREE.Points(
          highlightGeometry,
          highlightMaterial
        );
        highlightPointsMesh.name = 'highlightPoints';
        // Keep it in sync with the current rotation immediately
        highlightPointsMesh.rotation.copy(points.rotation);
        scene.add(highlightPointsMesh);
      }
    };

    const toggleHighlight = () => {
      updateHighlight();
    };

    const updateSphere = () => {
      createSphere(controls.totalPoints, controls.distributionConstant);
      updateHighlight();
    };

    const updatePointSize = () => {
      material.size = controls.pointSize;
      material.needsUpdate = true;
      updateHighlight();
    };

    const updatePointColor = () => {
      material.color.set(controls.pointColor);
    };

    // --- Pointer interaction: click-and-drag (mouse, touch, pen) ---
    const getPointerPos = (e) => ({ x: e.clientX, y: e.clientY });

    const onPointerDown = (e) => {
      isDragging = true;
      dragVelocity = { x: 0, y: 0 };
      previousPointer = getPointerPos(e);
      container.style.cursor = 'grabbing';
      // Prevent text selection while dragging
      e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const current = getPointerPos(e);
      const deltaX = current.x - previousPointer.x;
      const deltaY = current.y - previousPointer.y;
      previousPointer = current;

      const rotY = deltaX * dragSensitivity;
      const rotX = deltaY * dragSensitivity;

      points.rotation.y += rotY;
      points.rotation.x += rotX;

      // Remember this as the momentum to carry on release
      dragVelocity = { x: rotX, y: rotY };
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = 'grab';
    };

    const setupInteraction = () => {
      container.style.cursor = 'grab';
      container.style.touchAction = 'none'; // stop mobile scroll from hijacking the drag
      container.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
      // In case the pointer leaves the window while dragging
      window.addEventListener('blur', endDrag);
    };

    const teardownInteraction = () => {
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
      window.removeEventListener('blur', endDrag);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isDragging) {
        // Rotation already applied directly in onPointerMove for zero-lag feel
      } else if (
        Math.abs(dragVelocity.x) > velocityFloor ||
        Math.abs(dragVelocity.y) > velocityFloor
      ) {
        // Momentum: let the spin glide to a stop after release
        points.rotation.x += dragVelocity.x;
        points.rotation.y += dragVelocity.y;
        dragVelocity.x *= damping;
        dragVelocity.y *= damping;
      } else {
        // Back to the smooth automatic spin
        dragVelocity = { x: 0, y: 0 };
        points.rotation.y += controls.rotationSpeed;
        points.rotation.x += controls.rotationSpeed * 0.5;
      }

      const highlightPointsMesh = scene.getObjectByName('highlightPoints');
      if (highlightPointsMesh) {
        highlightPointsMesh.rotation.copy(points.rotation);
      }

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!container) return;

      width = container.clientWidth;
      height = container.clientHeight;
      if (height === 0 && className === '') height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    init();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      teardownInteraction();

      if (gui) {
        gui.destroy();
      }

      if (
        renderer &&
        renderer.domElement &&
        container.contains(renderer.domElement)
      ) {
        container.removeChild(renderer.domElement);
      }

      if (geometry) geometry.dispose();
      if (material) material.dispose();
      renderer.dispose();
    };
  }, [className, showControls]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full ${className}`}
      style={{
        minHeight: className ? undefined : '100vh',
        backgroundColor: 'transparent',
        pointerEvents: 'auto',
      }}
    />
  );
};

export default GoldenRatioSphere;
