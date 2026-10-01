'use client';

import { useEffect, useRef } from 'react';

/**
 * DataTunnelCanvas
 * Adapted from: https://codepen.io/sabosugi/pen/azZmLoB ("Data Tunnel")
 *
 * Scoped WebGL Three.js canvas with high-performance zero-allocation geometry
 * rendering, clamped DPR, downsampled bloom buffers, and reactive RAF loops
 * triggered only when the hero is in viewport.
 */
export default function DataTunnelCanvas({
  className = '',
  style = {},
  showGui = false, // the codepen ships a lil-gui debug panel; off by default for production use
  convergenceX = 0.5, // horizontal position of pinch point (0.50 = center, 0.48 = next to text)
  positionY = 0.0, // vertical position offset of the singular beam / pinch point
  topSpread = 0.98, // multiplier for top-right corner height
  bottomSpread = 0.99, // multiplier for bottom-right corner height (pulls in the slight bottom overflow)
  curvePower = 1.6, // controls flare curvature (1.5-1.7 = sleek graceful silk flare)
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    let renderer, composer, camera, scene, contentGroup;
    let animationFrameId = null;
    let isLoopRunning = false;
    let gui;
    let resizeObserver;
    let intersectionObserver;
    let resizeRaf = null;
    let isVisible = true;
    let isDocVisible = typeof document !== 'undefined' ? document.visibilityState === 'visible' : true;
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

        // Interactive Thread Settings
        interactiveStrength: 1.2,
        interactiveRadius: 28.0,
        interactiveFlutter: 0.38,
        interactiveWaveSpeed: 7.5,
      };

      const CONSTANTS = { segmentCount: 150 };

      // --- MOUSE & INTERACTION STATE ---
      const mouse = { x: -9999, y: -9999 };
      const targetMouse = { x: -9999, y: -9999 };
      const prevMouse = { x: -9999, y: -9999 };
      let mouseHover = 0;
      let targetMouseHover = 0;
      let mouseSpeed = 0;
      const linePlucks = new Float32Array(300);

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

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      const isMobile =
        typeof window !== 'undefined' &&
        (window.innerWidth < 768 || navigator.maxTouchPoints > 1);
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      renderer.setClearColor(0x000000, 0); // fully transparent clear
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.pointerEvents = 'none';
      // Horizontal flip: mirrors the tunnel so it opens/reads from the
      // right side of the screen instead of the left.
      renderer.domElement.style.transform = 'scaleX(-1)';
      container.appendChild(renderer.domElement);

      contentGroup = new THREE.Group();
      scene.add(contentGroup);

      // --- POST-PROCESSING ---
      const renderScene = new RenderPass(scene, camera);
      // Downsampled bloom resolution saves massive GPU fillrate bandwidth while keeping smooth glow
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(Math.floor(width * 0.5), Math.floor(height * 0.5)),
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
      let lastW = 0;
      let lastH = 0;

      function updateDimensions() {
        const { width: w, height: h } = getSize();
        if (Math.abs(w - lastW) < 1 && Math.abs(h - lastH) < 1) return;
        lastW = w;
        lastH = h;

        const aspect = w / h;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();

        const vFovRad = (camera.fov * Math.PI) / 180;
        const visibleHalfHeight = camera.position.z * Math.tan(vFovRad / 2);
        const visibleHalfWidth = visibleHalfHeight * aspect;

        // Position pinch point horizontally (0.0 = far left, 0.5 = center, 1.0 = far right)
        params.positionX = (1.0 - 2 * convergenceX) * visibleHalfWidth;

        // Curve spans the exact distance from pinch point to the screen's right edge
        params.curveLength = 2 * (1.0 - convergenceX) * visibleHalfWidth;

        // Straight beam shoots past the screen's left edge
        params.straightLength = Math.max(
          1.0,
          2 * convergenceX * visibleHalfWidth + 0.4 * visibleHalfWidth
        );

        // Responsive end-to-end flare anchoring:
        params.topSpreadHeight =
          Math.max(1, visibleHalfHeight - positionY) * topSpread;
        params.bottomSpreadHeight =
          Math.max(1, visibleHalfHeight + positionY) * bottomSpread;
        params.spreadHeight = visibleHalfHeight;
        params.positionY = positionY;
        params.curvePower = curvePower;

        if (contentGroup) {
          contentGroup.position.set(params.positionX, params.positionY, 0);
        }

        renderer.setSize(w, h, false);
        composer.setSize(w, h);
        if (bloomPass && bloomPass.resolution) {
          bloomPass.resolution.set(Math.floor(w * 0.5), Math.floor(h * 0.5));
        }
      }

      updateDimensions();

      // --- POINTER EVENT HANDLERS (cached bounding rect to avoid layout thrashing) ---
      let cachedRect = null;
      function getContainerRect() {
        if (!cachedRect) {
          cachedRect = container.getBoundingClientRect();
        }
        return cachedRect;
      }

      const invalidateRect = () => {
        cachedRect = null;
      };

      const handlePointerMove = (e) => {
        if (!container || !camera) return;
        if (e.pointerType === 'touch') return;

        const rect = getContainerRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          targetMouseHover = 0;
          return;
        }

        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isInside) {
          targetMouseHover = 1;
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;

          const effectiveNdcX = 1 - 2 * (relX / Math.max(1, rect.width));
          const effectiveNdcY = -(relY / Math.max(1, rect.height)) * 2 + 1;

          const vFovRad = (camera.fov * Math.PI) / 180;
          const visibleHalfHeight = camera.position.z * Math.tan(vFovRad / 2);
          const visibleHalfWidth = visibleHalfHeight * camera.aspect;

          const worldX = effectiveNdcX * visibleHalfWidth;
          const worldY = effectiveNdcY * visibleHalfHeight;

          targetMouse.x = worldX - params.positionX;
          targetMouse.y = worldY - params.positionY;
        } else {
          targetMouseHover = 0;
        }
      };

      const handlePointerLeave = () => {
        targetMouseHover = 0;
      };

      window.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      });
      window.addEventListener('pointerleave', handlePointerLeave, {
        passive: true,
      });
      window.addEventListener('scroll', invalidateRect, { passive: true });

      // --- ZERO-ALLOCATION PATH CALCULATION ---
      function computePathPoint(outArray, offset, t, lineIndex, time) {
        const totalLen = params.curveLength + params.straightLength;
        const currentX = -params.curveLength + t * totalLen;

        let y = 0;
        let z = 0;

        // spreadFactor goes from -1.0 (bottom-right corner) to +1.0 (top-right corner)
        const spreadFactor =
          params.lineCount > 1
            ? (lineIndex / (params.lineCount - 1) - 0.5) * 2
            : 0;

        if (currentX < 0) {
          const ratio = (currentX + params.curveLength) / params.curveLength;
          let shapeFactor = (Math.cos(ratio * Math.PI) + 1) * 0.5;
          shapeFactor = Math.pow(shapeFactor, params.curvePower);

          // Asymmetric flare heights calculated dynamically from camera viewport
          const asymmetricSpreadHeight =
            spreadFactor > 0
              ? params.topSpreadHeight || params.spreadHeight
              : params.bottomSpreadHeight || params.spreadHeight;

          y = spreadFactor * asymmetricSpreadHeight * shapeFactor;
          z = spreadFactor * params.spreadDepth * shapeFactor;

          // Ambient baseline wave — tapers to 0 at ratio = 0 to keep corner points strictly fixed
          const waveFactor = Math.sin(ratio * Math.PI) * shapeFactor;
          const ambientWave =
            Math.sin(time * params.waveSpeed + currentX * 0.1 + lineIndex) *
            params.waveHeight *
            waveFactor;
          y += ambientWave;

          // Interactive thread waving & elastic response (only on the flared right-side strings)
          if (mouseHover > 0.001) {
            const dx = currentX - mouse.x;
            const dy = y - mouse.y;
            const distSq = dx * dx + dy * dy;
            const radius = params.interactiveRadius;
            const radiusSq = radius * radius;

            if (distSq < radiusSq) {
              const dist = Math.sqrt(distSq);
              const norm = 1 - dist / radius;
              // Smoothstep falloff curve for tactile thread elasticity
              const falloff = norm * norm * (3 - 2 * norm) * mouseHover;

              // 1. Thread deflection away from cursor
              const pushY =
                (dy / (dist + 2.5)) *
                params.interactiveStrength *
                2.6 *
                falloff;
              const pushZ =
                Math.sin(norm * Math.PI) *
                params.interactiveStrength *
                1.2 *
                falloff;

              // 2. High-frequency silk flutter / vibration
              const flutter =
                Math.sin(
                  time * params.interactiveWaveSpeed +
                    currentX * 0.35 +
                    lineIndex * 0.6
                ) *
                params.interactiveFlutter *
                falloff;

              // 3. Traveling ripple wave along the thread
              const ripple =
                Math.sin(dx * 0.4 - time * 6.0 + lineIndex * 0.3) *
                (0.22 + mouseSpeed * 0.5) *
                falloff;

              y += (pushY + flutter + ripple) * shapeFactor;
              z += pushZ * shapeFactor;
            }
          }

          // 4. Pluck vibration wave from cursor crossing lines
          const pluck = linePlucks[lineIndex];
          if (pluck > 0.001) {
            const waveDist = currentX - mouse.x;
            const pluckWave =
              Math.sin(waveDist * 0.5 - time * 14.0) *
              pluck *
              0.4 *
              shapeFactor;
            y += pluckWave;
          }
        }

        // Direct write to target array buffer
        outArray[offset] = currentX;
        outArray[offset + 1] = y;
        outArray[offset + 2] = z;
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
          historyPositions: new Float32Array(maxTrail * 3),
          historyCount: 0,
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
        const folderInteractive = gui.addFolder('Interactive');
        folderInteractive
          .add(params, 'interactiveStrength', 0, 5)
          .name('Strength');
        folderInteractive
          .add(params, 'interactiveRadius', 5, 80)
          .name('Radius');
        folderInteractive
          .add(params, 'interactiveFlutter', 0, 2)
          .name('Flutter');
        folderInteractive
          .add(params, 'interactiveWaveSpeed', 0, 20)
          .name('Wave Speed');
      }

      // --- ANIMATION LOOP & LIFECYCLE CONTROLS ---
      const clock = new THREE.Clock();

      function startLoop() {
        if (isLoopRunning || !isVisible || !isDocVisible || disposed) return;
        isLoopRunning = true;
        animationFrameId = requestAnimationFrame(animate);
      }

      function stopLoop() {
        isLoopRunning = false;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }

      function animate() {
        if (!isVisible || !isDocVisible || disposed) {
          isLoopRunning = false;
          return;
        }

        animationFrameId = requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        // Smooth mouse tracking and hover interpolation
        if (targetMouseHover > 0.01) {
          if (mouse.x < -9000) {
            mouse.x = targetMouse.x;
            mouse.y = targetMouse.y;
            prevMouse.x = targetMouse.x;
            prevMouse.y = targetMouse.y;
          } else {
            mouse.x += (targetMouse.x - mouse.x) * 0.18;
            mouse.y += (targetMouse.y - mouse.y) * 0.18;
          }
        }
        mouseHover += (targetMouseHover - mouseHover) * 0.08;

        const velX = mouse.x - prevMouse.x;
        const velY = mouse.y - prevMouse.y;
        mouseSpeed = Math.hypot(velX, velY);
        prevMouse.x = mouse.x;
        prevMouse.y = mouse.y;

        // Check line crossing to excite pluck impulses on strings (only for flared strings region mouse.x < 0)
        if (mouseHover > 0.05 && mouse.x < 0 && mouse.x > -params.curveLength) {
          const ratio = (mouse.x + params.curveLength) / params.curveLength;
          let sf = (Math.cos(ratio * Math.PI) + 1) * 0.5;
          sf = Math.pow(sf, params.curvePower);

          for (let i = 0; i < params.lineCount; i++) {
            const spreadFactor = (i / params.lineCount - 0.5) * 2;
            const asymSpread =
              spreadFactor > 0
                ? params.spreadHeight * 0.95
                : params.spreadHeight * 1.1;
            const lineYAtMouse = spreadFactor * asymSpread * sf;
            const dY = Math.abs(lineYAtMouse - mouse.y);

            if (dY < 2.0 && mouseSpeed > 0.05) {
              const impulse = Math.min(1.2, mouseSpeed * 0.4);
              linePlucks[i] = Math.min(1.8, (linePlucks[i] || 0) + impulse);
            }
          }
        }

        // Decay pluck vibrations
        for (let i = 0; i < params.lineCount; i++) {
          if (linePlucks[i] > 0.001) {
            linePlucks[i] *= 0.93;
          } else {
            linePlucks[i] = 0;
          }
        }

        // Background lines zero-allocation buffer update
        const segCount = CONSTANTS.segmentCount;
        const invSeg = 1 / (segCount - 1);
        for (let i = 0; i < backgroundLines.length; i++) {
          const line = backgroundLines[i];
          const positions = line.geometry.attributes.position.array;
          const lineId = line.userData.id;
          for (let j = 0; j < segCount; j++) {
            computePathPoint(positions, j * 3, j * invSeg, lineId, time);
          }
          line.geometry.attributes.position.needsUpdate = true;
        }

        // Signals zero-allocation buffer update
        for (let sIdx = 0; sIdx < signals.length; sIdx++) {
          const sig = signals[sIdx];
          sig.progress += sig.speed * 0.005 * params.speedGlobal;

          if (sig.progress > 1.0) {
            sig.progress = 0;
            sig.laneIndex = Math.floor(Math.random() * params.lineCount);
            sig.historyCount = 0;
            sig.assignedColor = pickSignalColor();
          }

          const maxPoints = Math.max(1, params.trailLength + 1);
          const copyCount = Math.min(sig.historyCount, maxPoints - 1);
          if (copyCount > 0) {
            sig.historyPositions.copyWithin(3, 0, copyCount * 3);
          }
          computePathPoint(
            sig.historyPositions,
            0,
            sig.progress,
            sig.laneIndex,
            time
          );
          sig.historyCount = Math.min(sig.historyCount + 1, maxPoints);

          const positions = sig.mesh.geometry.attributes.position.array;
          const colors = sig.mesh.geometry.attributes.color.array;
          const drawCount = Math.max(1, params.trailLength);
          const invTrail =
            params.trailLength > 0 ? 1 / params.trailLength : 0;
          const col = sig.assignedColor;

          for (let i = 0; i < drawCount; i++) {
            const srcIdx = Math.min(i, sig.historyCount - 1) * 3;
            const dstIdx = i * 3;

            positions[dstIdx] = sig.historyPositions[srcIdx];
            positions[dstIdx + 1] = sig.historyPositions[srcIdx + 1];
            positions[dstIdx + 2] = sig.historyPositions[srcIdx + 2];

            const alpha =
              params.trailLength > 0 ? Math.max(0, 1 - i * invTrail) : 1;

            colors[dstIdx] = col.r * alpha;
            colors[dstIdx + 1] = col.g * alpha;
            colors[dstIdx + 2] = col.b * alpha;
          }

          sig.mesh.geometry.setDrawRange(0, drawCount);
          sig.mesh.geometry.attributes.position.needsUpdate = true;
          sig.mesh.geometry.attributes.color.needsUpdate = true;
        }

        composer.render();
      }

      startLoop();

      // --- VISIBILITY OBSERVERS (pauses loop completely when scrolled away or backgrounded) ---
      if (typeof IntersectionObserver !== 'undefined') {
        intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible) {
              startLoop();
            } else {
              stopLoop();
            }
          },
          { threshold: 0.05 }
        );
        intersectionObserver.observe(container);
      }

      const handleVisibilityChange = () => {
        isDocVisible =
          typeof document !== 'undefined'
            ? document.visibilityState === 'visible'
            : true;
        if (isDocVisible && isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      // --- RESIZE (debounced with RAF, scoped to container & window) ---
      const handleResize = () => {
        invalidateRect();
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(() => {
          updateDimensions();
        });
      };

      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
      window.addEventListener('resize', handleResize, { passive: true });

      // Stash cleanup handles
      init._cleanup = () => {
        disposed = true;
        stopLoop();
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        intersectionObserver?.disconnect();
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', invalidateRect);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', handlePointerLeave);
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
  }, [showGui, convergenceX, positionY, topSpread, bottomSpread, curvePower]);

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
