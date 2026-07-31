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
    let height = container.clientHeight || 500;
    if (container.clientHeight === 0 && className === '') {
      height = window.innerHeight;
    }

    let scene;
    let camera;
    let renderer;
    let points;
    let material;
    let geometry;
    let gui;
    let animationFrameId;

    let vertices = [];
    let highlightVertices = [];

    let currentRadius = radius;

    const getDeviceConfig = () => {
      const vw = window.innerWidth;

      if (vw < 768) {
        return {
          totalPoints,
          pointSize: 2.8,
          radius: 210,
          cameraZ: 420,
        };
      }

      if (vw < 1024) {
        return {
          totalPoints,
          pointSize: 2.4,
          radius: 170,
          cameraZ: 460,
        };
      }

      return {
        totalPoints,
        pointSize: 2,
        radius,
        cameraZ: 500,
      };
    };

    const deviceConfig = getDeviceConfig();

    const controls = {
      totalPoints: deviceConfig.totalPoints,
      distributionConstant: 0.6180339887,
      pointSize: deviceConfig.pointSize,
      rotationSpeed: 0.002,
      pointColor: '#cfa007',
      highlightEnabled: false,
      highlightPercentage: 0,
      offset: 0,
    };

    let isDragging = false;
    let previousPointer = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };
    const dragSensitivity = 0.008;
    const damping = 0.95;
    const velocityFloor = 0.0002;

    const createSphere = (pts, phi) => {
      vertices = [];
      highlightVertices = [];

      for (let i = 0; i < pts; i++) {
        const theta = 2 * Math.PI * i * phi;
        const y = 1 - (i / (pts - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;

        vertices.push(x * currentRadius, y * currentRadius, z * currentRadius);
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

      if (!controls.highlightPercentage || controls.highlightPercentage <= 0) {
        updateHighlight();
        return;
      }

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
        existingHighlightPoints.geometry?.dispose();
        existingHighlightPoints.material?.dispose();
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

    const getPointerPos = (e) => ({ x: e.clientX, y: e.clientY });

    const onPointerDown = (e) => {
      isDragging = true;
      dragVelocity = { x: 0, y: 0 };
      previousPointer = getPointerPos(e);
      container.style.cursor = 'grabbing';
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

      dragVelocity = { x: rotX, y: rotY };
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = 'grab';
    };

    const setupInteraction = () => {
      container.style.cursor = 'grab';
      container.style.touchAction = 'none';
      container.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
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
      } else if (
        Math.abs(dragVelocity.x) > velocityFloor ||
        Math.abs(dragVelocity.y) > velocityFloor
      ) {
        points.rotation.x += dragVelocity.x;
        points.rotation.y += dragVelocity.y;
        dragVelocity.x *= damping;
        dragVelocity.y *= damping;
      } else {
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

    const applyResponsiveConfig = () => {
      const config = getDeviceConfig();
      currentRadius = config.radius;
      controls.pointSize = config.pointSize;

      if (material) {
        material.size = controls.pointSize;
        material.needsUpdate = true;
      }

      if (camera) {
        camera.position.z = config.cameraZ;
      }

      updateSphere();
    };

    const handleResize = () => {
      if (!container || !camera || !renderer) return;

      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 500;

      if (height === 0 && className === '') {
        height = window.innerHeight;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);

      applyResponsiveConfig();
    };

    const init = async () => {
      const config = getDeviceConfig();
      currentRadius = config.radius;

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = config.cameraZ;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
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
            .add(controls, 'totalPoints', 100, 12000)
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

    window.addEventListener('resize', handleResize);
    init();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      teardownInteraction();

      if (gui) {
        gui.destroy();
      }

      const existingHighlightPoints = scene?.getObjectByName('highlightPoints');
      if (existingHighlightPoints) {
        scene.remove(existingHighlightPoints);
        existingHighlightPoints.geometry?.dispose();
        existingHighlightPoints.material?.dispose();
      }

      if (
        renderer &&
        renderer.domElement &&
        container.contains(renderer.domElement)
      ) {
        container.removeChild(renderer.domElement);
      }

      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
    };
  }, [className, showControls, totalPoints, radius]);

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
