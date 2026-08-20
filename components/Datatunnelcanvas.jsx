'use client';

import { useEffect, useRef } from 'react';

/**
 * DataTunnelCanvas
 * Adapted from: https://codepen.io/sabosugi/pen/azZmLoB ("Data Tunnel")
 *
 * The original pen renders full-page and appends its canvas + lil-gui panel
 * to document.body. This version is scoped to its own container div so it
 * can be dropped into a hero section (or anywhere) without taking over the
 * whole page, and it sizes itself off the container instead of window.
 *
 * Requires the "three" and "lil-gui" packages:
 *   npm install three lil-gui
 */
export default function DataTunnelCanvas({
  className = '',
  style = {},
  showGui = false, // the codepen ships a lil-gui debug panel; off by default for production use
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    let renderer, composer, camera, scene, contentGroup;
    let animationFrameId;
    let gui;
    let resizeObserver;
    let disposed = false;

    const container = containerRef.current;
    if (!container) return;

    async function init() {
      const THREE = await import('three');
      const { EffectComposer } =
        await import('three/examples/jsm/postprocessing/EffectComposer.js');
      const { RenderPass } =
        await import('three/examples/jsm/postprocessing/RenderPass.js');
      const { UnrealBloomPass } =
        await import('three/examples/jsm/postprocessing/UnrealBloomPass.js');

      if (disposed) return;

      // --- CONFIGURATION (unchanged from the original pen) ---
      const params = {
        // Colors
        colorBg: '#080808',
        colorLine: '#373f48',

        // Signal Colors
        colorSignal: '#f5c105',
        useColor2: false,
        colorSignal2: '#ece2c1',
        useColor3: false,
        colorSignal3: '#bac8f3',

        // Global Transform
        lineCount: 80,
        globalRotation: 0,
        positionX: 0,
        positionY: 0,

        // Geometry
        spreadHeight: 30.33,
        spreadDepth: 0,
        curveLength: 50,
        straightLength: 100,
        curvePower: 0.8265,

        // Line Animation
        waveSpeed: 2.48,
        waveHeight: 0.145,
        lineOpacity: 0.557,

        // Signals
        signalCount: 94,
        speedGlobal: 0.345,
        trailLength: 3,

        // Visuals (Bloom)
        bloomStrength: 3.0,
        bloomRadius: 0.5,
      };

      const CONSTANTS = { segmentCount: 150 };

      const getSize = () => ({
        width: container.clientWidth || 1,
        height: container.clientHeight || 1,
      });

      // --- SCENE SETUP ---
      scene = new THREE.Scene();

      const { width, height } = getSize();

      camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
      camera.position.set(0, 0, 90);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0); // fully transparent clear
      renderer.domElement.style.display = 'block';
      // Horizontal flip: mirrors the tunnel so it opens/reads from the
      // right side of the screen instead of the left.
      renderer.domElement.style.transform = 'scaleX(-1)';
      container.appendChild(renderer.domElement);

      contentGroup = new THREE.Group();
      scene.add(contentGroup);

      // --- POST-PROCESSING ---
      const renderScene = new RenderPass(scene, camera);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        1.5,
        0.4,
        0.85
      );
      bloomPass.threshold = 0;
      bloomPass.strength = params.bloomStrength;
      bloomPass.radius = params.bloomRadius;

      composer = new EffectComposer(renderer);
      composer.renderToScreen = true;
      composer.addPass(renderScene);
      composer.addPass(bloomPass);

      // --- DYNAMIC GEOMETRY ADAPTATION ---
      // Dynamically calculate curve and beam length based on visible camera frustum
      // so the flare always starts from and extends off the right edge of the viewport
      // regardless of aspect ratio (e.g. ultra-wide screens with short hero height).
      function updateDimensions() {
        const { width: w, height: h } = getSize();
        const aspect = w / h;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();

        const vFovRad = (camera.fov * Math.PI) / 180;
        const visibleHalfHeight = camera.position.z * Math.tan(vFovRad / 2);
        const visibleHalfWidth = visibleHalfHeight * aspect;

        // Position pinch/convergence point around 65% of screen width
        params.positionX = -0.30 * visibleHalfWidth;
        // Curve reaches past the 3D left boundary (which is screen right edge when mirrored)
        params.curveLength = 0.78 * visibleHalfWidth;
        // Straight beam reaches past the 3D right boundary (screen left edge)
        params.straightLength = 1.45 * visibleHalfWidth;
        params.spreadHeight = Math.max(28, visibleHalfHeight * 0.82);

        if (contentGroup) {
          contentGroup.position.set(params.positionX, params.positionY, 0);
        }

        renderer.setSize(w, h);
        composer.setSize(w, h);
        if (bloomPass && bloomPass.resolution) {
          bloomPass.resolution.set(w, h);
        }
      }

      updateDimensions();

      // --- MATH & PATH CALCULATION ---
      function getPathPoint(t, lineIndex, time) {
        const totalLen = params.curveLength + params.straightLength;
        const currentX = -params.curveLength + t * totalLen;

        let y = 0;
        let z = 0;
        const spreadFactor = (lineIndex / params.lineCount - 0.5) * 2;

        if (currentX < 0) {
          const ratio = (currentX + params.curveLength) / params.curveLength;
          let shapeFactor = (Math.cos(ratio * Math.PI) + 1) / 2;
          shapeFactor = Math.pow(shapeFactor, params.curvePower);

          y = spreadFactor * params.spreadHeight * shapeFactor;
          z = spreadFactor * params.spreadDepth * shapeFactor;

          const waveFactor = shapeFactor;
          const wave =
            Math.sin(time * params.waveSpeed + currentX * 0.1 + lineIndex) *
            params.waveHeight *
            waveFactor;
          y += wave;
        }

        return new THREE.Vector3(currentX, y, z);
      }

      // --- OBJECTS MANAGEMENT ---
      let backgroundLines = [];
      let signals = [];
      const bgMaterial = new THREE.LineBasicMaterial({
        color: params.colorLine,
        transparent: true,
        opacity: params.lineOpacity,
        depthWrite: false,
      });

      const signalMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
        transparent: true,
      });
      const signalColorObj1 = new THREE.Color(params.colorSignal);
      const signalColorObj2 = new THREE.Color(params.colorSignal2);
      const signalColorObj3 = new THREE.Color(params.colorSignal3);

      function pickSignalColor() {
        const choices = [signalColorObj1];
        if (params.useColor2) choices.push(signalColorObj2);
        if (params.useColor3) choices.push(signalColorObj3);
        return choices[Math.floor(Math.random() * choices.length)];
      }

      // --- REBUILD FUNCTIONS ---
      function rebuildLines() {
        backgroundLines.forEach((l) => {
          contentGroup.remove(l);
          l.geometry.dispose();
        });
        backgroundLines = [];

        for (let i = 0; i < params.lineCount; i++) {
          const geometry = new THREE.BufferGeometry();
          const positions = new Float32Array(CONSTANTS.segmentCount * 3);
          geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
          );

          const line = new THREE.Line(geometry, bgMaterial);
          line.userData = { id: i };
          line.renderOrder = 0;
          contentGroup.add(line);
          backgroundLines.push(line);
        }
        rebuildSignals();
      }

      function rebuildSignals() {
        signals.forEach((s) => {
          contentGroup.remove(s.mesh);
          s.mesh.geometry.dispose();
        });
        signals = [];
        for (let i = 0; i < params.signalCount; i++) {
          createSignal();
        }
      }

      function createSignal() {
        const maxTrail = 150;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(maxTrail * 3);
        const colors = new Float32Array(maxTrail * 3);

        geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(positions, 3)
        );
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const mesh = new THREE.Line(geometry, signalMaterial);
        mesh.frustumCulled = false;
        mesh.renderOrder = 1;
        contentGroup.add(mesh);

        signals.push({
          mesh,
          laneIndex: Math.floor(Math.random() * params.lineCount),
          speed: 0.2 + Math.random() * 0.5,
          progress: Math.random(),
          history: [],
          assignedColor: pickSignalColor(),
        });
      }

      // Initial build
      rebuildLines();

      // --- OPTIONAL GUI ---
      if (showGui) {
        const { default: GUI } = await import('lil-gui');
        gui = new GUI({ title: 'Settings', container });
        gui.domElement.style.position = 'absolute';
        gui.domElement.style.top = 'auto';
        gui.domElement.style.bottom = '10px';
        gui.domElement.style.right = '10px';

        const folderColors = gui.addFolder('Colors');
        folderColors
          .addColor(params, 'colorBg')
          .name('Background (unused — transparent)')
          .disable();
        folderColors
          .addColor(params, 'colorLine')
          .name('Lines')
          .onChange((v) => bgMaterial.color.set(v));

        const folderSignalColors = gui.addFolder('Signal Colors');
        folderSignalColors
          .addColor(params, 'colorSignal')
          .name('Main Color')
          .onChange((v) => signalColorObj1.set(v));
        folderSignalColors.add(params, 'useColor2').name('Use Extra Color 1');
        folderSignalColors
          .addColor(params, 'colorSignal2')
          .name('Extra Color 1')
          .onChange((v) => signalColorObj2.set(v));
        folderSignalColors.add(params, 'useColor3').name('Use Extra Color 2');
        folderSignalColors
          .addColor(params, 'colorSignal3')
          .name('Extra Color 2')
          .onChange((v) => signalColorObj3.set(v));

        const folderGeneral = gui.addFolder('General');
        folderGeneral
          .add(params, 'globalRotation', -180, 180)
          .name('Rotation (Deg)')
          .onChange((v) => {
            contentGroup.rotation.z = THREE.MathUtils.degToRad(v);
          });
        folderGeneral
          .add(params, 'positionX', -200, 200)
          .name('Position X')
          .onChange((v) => {
            contentGroup.position.x = v;
          });
        folderGeneral
          .add(params, 'positionY', -100, 100)
          .name('Position Y')
          .onChange((v) => {
            contentGroup.position.y = v;
          });
        folderGeneral
          .add(params, 'lineCount', 10, 300, 1)
          .name('Line Count')
          .onFinishChange(rebuildLines);

        const folderGeo = gui.addFolder('Geometry');
        folderGeo.add(params, 'spreadHeight', 10, 100);
        folderGeo.add(params, 'spreadDepth', 0, 50);
        folderGeo.add(params, 'curveLength', 20, 150);
        folderGeo.add(params, 'straightLength', 20, 200);
        folderGeo.add(params, 'curvePower', 0.1, 3.0);

        const folderAnim = gui.addFolder('Lines');
        folderAnim.add(params, 'waveSpeed', 0, 5);
        folderAnim.add(params, 'waveHeight', 0, 5);
        folderAnim
          .add(params, 'lineOpacity', 0, 1)
          .onChange((v) => (bgMaterial.opacity = v));

        const folderSignals = gui.addFolder('Signals');
        folderSignals
          .add(params, 'signalCount', 0, 200, 1)
          .name('Count')
          .onFinishChange(rebuildSignals);
        folderSignals.add(params, 'speedGlobal', 0, 3).name('Speed');
        folderSignals
          .add(params, 'trailLength', 0, 100, 1)
          .name('Trail Length');

        const folderBloom = gui.addFolder('Bloom');
        folderBloom
          .add(params, 'bloomStrength', 0, 5)
          .onChange((v) => (bloomPass.strength = v));
        folderBloom
          .add(params, 'bloomRadius', 0, 1)
          .onChange((v) => (bloomPass.radius = v));
      }

      // --- ANIMATION LOOP ---
      const clock = new THREE.Clock();

      function animate() {
        animationFrameId = requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        backgroundLines.forEach((line) => {
          const positions = line.geometry.attributes.position.array;
          const lineId = line.userData.id;
          for (let j = 0; j < CONSTANTS.segmentCount; j++) {
            const t = j / (CONSTANTS.segmentCount - 1);
            const vec = getPathPoint(t, lineId, time);
            positions[j * 3] = vec.x;
            positions[j * 3 + 1] = vec.y;
            positions[j * 3 + 2] = vec.z;
          }
          line.geometry.attributes.position.needsUpdate = true;
        });

        signals.forEach((sig) => {
          sig.progress += sig.speed * 0.005 * params.speedGlobal;

          if (sig.progress > 1.0) {
            sig.progress = 0;
            sig.laneIndex = Math.floor(Math.random() * params.lineCount);
            sig.history = [];
            sig.assignedColor = pickSignalColor();
          }

          const pos = getPathPoint(sig.progress, sig.laneIndex, time);
          sig.history.push(pos);

          if (sig.history.length > params.trailLength + 1) {
            sig.history.shift();
          }

          const positions = sig.mesh.geometry.attributes.position.array;
          const colors = sig.mesh.geometry.attributes.color.array;

          const drawCount = Math.max(1, params.trailLength);
          const currentLen = sig.history.length;

          for (let i = 0; i < drawCount; i++) {
            let index = currentLen - 1 - i;
            if (index < 0) index = 0;

            const p = sig.history[index] || new THREE.Vector3();

            positions[i * 3] = p.x;
            positions[i * 3 + 1] = p.y;
            positions[i * 3 + 2] = p.z;

            let alpha = 1;
            if (params.trailLength > 0) {
              alpha = Math.max(0, 1 - i / params.trailLength);
            }

            colors[i * 3] = sig.assignedColor.r * alpha;
            colors[i * 3 + 1] = sig.assignedColor.g * alpha;
            colors[i * 3 + 2] = sig.assignedColor.b * alpha;
          }

          sig.mesh.geometry.setDrawRange(0, drawCount);
          sig.mesh.geometry.attributes.position.needsUpdate = true;
          sig.mesh.geometry.attributes.color.needsUpdate = true;
        });

        composer.render();
      }

      animate();

      // --- RESIZE (scoped to the container, not window) ---
      const handleResize = () => {
        updateDimensions();
      };

      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      // Stash cleanup handles
      init._cleanup = () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver?.disconnect();
        gui?.destroy();

        backgroundLines.forEach((l) => l.geometry.dispose());
        signals.forEach((s) => s.mesh.geometry.dispose());
        bgMaterial.dispose();
        signalMaterial.dispose();

        composer?.dispose();
        renderer?.dispose();
        if (renderer?.domElement?.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    }

    init();

    return () => {
      disposed = true;
      init._cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGui]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: showGui ? 'auto' : 'none',
        mixBlendMode: 'screen',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 70%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 70%)',
        ...style,
      }}
    />
  );
}
