'use client';

import { useEffect, useRef } from 'react';
import { createCustomCardElement, CARD_DEFINITIONS } from './AdviqCardTemplate';
import './AdviqCanvas.css';

export default function AdviqCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    let cardStream, particleScanner;
    let isVisible = true;
    let isDocVisible =
      typeof document !== 'undefined'
        ? document.visibilityState === 'visible'
        : true;
    let intersectionObserver;

    class CardStreamController {
      constructor() {
        this.container = container.querySelector('.card-stream');
        this.cardLine = container.querySelector('.card-line');
        this.dragZone = container.querySelector('.card-drag-zone');
        this.speedIndicator = container.querySelector('.speedValue');

        this.position = 0;
        this.velocity = 120;
        this.direction = -1;
        this.isAnimating = true;
        this.isDragging = false;
        this.isLoopRunning = false;

        this.lastTime = performance.now();
        this.lastMouseY = 0;
        this.mouseVelocity = 0;
        this.friction = 0.95;
        this.minVelocity = 30;

        this.containerHeight = 700;
        this.cardHeight = 400;
        this.cardGap = 50;
        this.unitHeight = 450;
        this.cardsPerSet = 10;
        this.totalSets = 3;
        this.totalCards = 30;
        this.setHeight = 4500;
        this.cards = [];

        // Pre-computed code strings to avoid repeated runtime generation
        this.codeLibrary = this.generateCodeSnippets(CARD_DEFINITIONS.length);

        // Bind methods for cleanup
        this.handleMouseMove = (e) => this.onDrag(e);
        this.handleMouseUp = () => this.endDrag();
        this.handleTouchMove = (e) => {
          if (this.isMobile()) return;
          this.onDrag(e.touches[0]);
        };
        this.handleTouchEnd = () => {
          if (this.isMobile()) return;
          this.endDrag();
        };
        this.handleResize = () => this.calculateDimensions();

        this.init();
      }

      isMobile() {
        return (
          typeof window !== 'undefined' &&
          (window.innerWidth <= 960 ||
            ('ontouchstart' in window && window.innerWidth <= 1024))
        );
      }

      init() {
        this.calculateDimensions();
        this.populateCardLine();
        this.setupEventListeners();
        this.updateCardPosition(true);
        this.startLoop();
      }

      calculateDimensions() {
        this.containerHeight = container.clientHeight || 700;
        this.cardHeight = 400;
        this.cardGap = 50;
        this.unitHeight = this.cardHeight + this.cardGap;
        this.cardsPerSet = 10;
        this.totalSets = 3;
        this.totalCards = this.cardsPerSet * this.totalSets;
        this.setHeight = this.cardsPerSet * this.unitHeight;
        this.lineBaseY =
          (this.containerHeight -
            (this.totalCards * this.unitHeight - this.cardGap)) *
          0.5;
      }

      setupEventListeners() {
        const attachTarget = this.dragZone || this.cardLine;
        if (attachTarget) {
          attachTarget.addEventListener('mousedown', (e) => this.startDrag(e));
          attachTarget.addEventListener(
            'touchstart',
            (e) => {
              if (this.isMobile()) return;
              this.startDrag(e.touches[0]);
            },
            { passive: true }
          );
          attachTarget.addEventListener('wheel', (e) => this.onWheel(e), {
            passive: true,
          });
          attachTarget.addEventListener('selectstart', (e) => {
            if (!this.isMobile()) e.preventDefault();
          });
          attachTarget.addEventListener('dragstart', (e) => {
            if (!this.isMobile()) e.preventDefault();
          });
        }

        if (this.cardLine) {
          this.cardLine.addEventListener('mousedown', (e) => this.startDrag(e));
          this.cardLine.addEventListener(
            'touchstart',
            (e) => {
              if (this.isMobile()) return;
              this.startDrag(e.touches[0]);
            },
            { passive: true }
          );
          this.cardLine.addEventListener('wheel', (e) => this.onWheel(e), {
            passive: true,
          });
        }

        document.addEventListener('mousemove', this.handleMouseMove, {
          passive: true,
        });
        document.addEventListener('mouseup', this.handleMouseUp, {
          passive: true,
        });
        document.addEventListener('touchmove', this.handleTouchMove, {
          passive: true,
        });
        document.addEventListener('touchend', this.handleTouchEnd, {
          passive: true,
        });

        window.addEventListener('resize', this.handleResize, { passive: true });
      }

      startDrag(e) {
        if (this.isMobile()) return;
        if (e.preventDefault) e.preventDefault();

        this.isDragging = true;
        this.isAnimating = false;
        this.lastMouseY = e.clientY;
        this.mouseVelocity = 0;

        const transform = window.getComputedStyle(this.cardLine).transform;
        if (transform !== 'none') {
          const matrix = new DOMMatrix(transform);
          this.position = matrix.m42;
        }

        this.cardLine.style.animation = 'none';
        this.cardLine.classList.add('dragging');
        if (this.dragZone) this.dragZone.classList.add('dragging');

        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grabbing';
      }

      onDrag(e) {
        if (this.isMobile() || !this.isDragging) return;

        const deltaY = e.clientY - this.lastMouseY;
        this.position += deltaY;
        this.mouseVelocity = deltaY * 60;
        this.lastMouseY = e.clientY;

        this.updateCardPosition(false);
      }

      endDrag() {
        if (this.isMobile() || !this.isDragging) return;

        this.isDragging = false;
        this.cardLine.classList.remove('dragging');
        if (this.dragZone) this.dragZone.classList.remove('dragging');

        if (Math.abs(this.mouseVelocity) > this.minVelocity) {
          this.velocity = Math.abs(this.mouseVelocity);
          this.direction = this.mouseVelocity > 0 ? 1 : -1;
        } else {
          this.velocity = 120;
        }

        this.isAnimating = true;
        this.updateSpeedIndicator();

        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      }

      startLoop() {
        if (this.isLoopRunning || !isVisible || !isDocVisible) return;
        this.isLoopRunning = true;
        this.lastTime = performance.now();
        this.animate();
      }

      stopLoop() {
        this.isLoopRunning = false;
        if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame);
          this.animationFrame = null;
        }
      }

      animate() {
        if (!isVisible || !isDocVisible) {
          this.isLoopRunning = false;
          return;
        }

        const currentTime = performance.now();
        const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;

        if (this.isAnimating && !this.isDragging) {
          if (this.velocity > this.minVelocity) {
            this.velocity *= this.friction;
          } else {
            this.velocity = Math.max(this.minVelocity, this.velocity);
          }

          this.position += this.velocity * this.direction * deltaTime;
          this.updateCardPosition(false);
          this.updateSpeedIndicator();
        }

        this.animationFrame = requestAnimationFrame(() => this.animate());
      }

      updateCardPosition(force) {
        const setHeight = this.setHeight;
        if (setHeight && setHeight > 0) {
          while (this.position <= -setHeight) {
            this.position += setHeight;
          }
          while (this.position > 0) {
            this.position -= setHeight;
          }
        }

        this.cardLine.style.transform = `translate3d(0, ${this.position}px, 0)`;
        this.updateCardClipping(force);
      }

      updateSpeedIndicator() {
        if (this.speedIndicator) {
          this.speedIndicator.textContent = Math.round(this.velocity);
        }
      }

      onWheel(e) {
        const scrollSpeed = 20;
        const delta = e.deltaY > 0 ? scrollSpeed : -scrollSpeed;
        this.position += delta;
        this.updateCardPosition(false);
      }

      generateCodeSnippets(count) {
        const snippets = [];
        for (let i = 0; i < count; i++) {
          snippets.push(this.generateCode(40, 30));
        }
        return snippets;
      }

      generateCode(width, height) {
        const library = [
          '// compiled preview • scanner demo',
          '/* generated for visual effect */',
          'const SCAN_WIDTH = 8;',
          'const FADE_ZONE = 35;',
          'const MAX_PARTICLES = 1200;',
          'const TRANSITION = 0.05;',
          'function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }',
          'function lerp(a, b, t) { return a + (b - a) * t; }',
          'const scanner = { y: Math.floor(h / 2), height: SCAN_WIDTH, glow: 3.5 };',
          'const state = { intensity: 1.2, particles: MAX_PARTICLES };',
        ];
        for (let i = 0; i < 20; i++) {
          library.push(`const v${i} = (${i * 3} + 17) * 0.${(i % 9) + 1};`);
        }
        let flow = library.join(' ');
        const totalChars = width * height;
        while (flow.length < totalChars + width) {
          flow += ' ' + library[Math.floor(Math.random() * library.length)];
        }

        let out = '';
        let offset = 0;
        for (let row = 0; row < height; row++) {
          let line = flow.slice(offset, offset + width);
          if (line.length < width) line += ' '.repeat(width - line.length);
          out += line + (row < height - 1 ? '\n' : '');
          offset += width;
        }
        return out;
      }

      calculateCodeDimensions(cardWidth, cardHeight) {
        const fontSize = 11;
        const lineHeight = 13;
        const charWidth = 6.2;
        const width = Math.floor(cardWidth / charWidth);
        const height = Math.floor(cardHeight / lineHeight);
        return { width, height, fontSize, lineHeight };
      }

      createCardWrapper(index) {
        const wrapper = document.createElement('div');
        wrapper.className = 'card-wrapper';

        const normalCard = document.createElement('div');
        normalCard.className = 'card card-normal';

        const cardDef = CARD_DEFINITIONS[index % CARD_DEFINITIONS.length];
        const customCard = createCustomCardElement(cardDef);
        normalCard.appendChild(customCard);

        const asciiCard = document.createElement('div');
        asciiCard.className = 'card card-ascii';

        const asciiContent = document.createElement('div');
        asciiContent.className = 'ascii-content';

        const { fontSize, lineHeight } = this.calculateCodeDimensions(
          250,
          400
        );
        asciiContent.style.fontSize = fontSize + 'px';
        asciiContent.style.lineHeight = lineHeight + 'px';
        asciiContent.textContent =
          this.codeLibrary[index % this.codeLibrary.length];

        asciiCard.appendChild(asciiContent);
        wrapper.appendChild(normalCard);
        wrapper.appendChild(asciiCard);

        return {
          wrapper,
          normalCard,
          asciiCard,
          asciiContent,
          index,
          state: null,
          isScanned: false,
        };
      }

      // Zero-reflow mathematical clipping calculations
      updateCardClipping(force = false) {
        const scannerY = this.containerHeight * 0.42;
        const scannerHeight = 4;
        const scannerTop = scannerY - scannerHeight / 2;
        const scannerBottom = scannerY + scannerHeight / 2;
        let anyScanningActive = false;

        const lineBaseY = this.lineBaseY;
        const unitHeight = this.unitHeight;
        const cardHeight = this.cardHeight;
        const currentPos = this.position;

        for (let i = 0; i < this.cards.length; i++) {
          const card = this.cards[i];
          const cardTop = lineBaseY + currentPos + i * unitHeight;
          const cardBottom = cardTop + cardHeight;

          if (cardTop < scannerBottom && cardBottom > scannerTop) {
            anyScanningActive = true;
            const scannerIntersectTop = Math.max(scannerTop - cardTop, 0);
            const scannerIntersectBottom = Math.min(
              scannerBottom - cardTop,
              cardHeight
            );

            const normalClipBottom =
              (scannerIntersectTop / cardHeight) * 100;
            const asciiClipTop =
              (scannerIntersectBottom / cardHeight) * 100;

            card.normalCard.style.setProperty(
              '--clip-bottom',
              `${normalClipBottom}%`
            );
            card.asciiCard.style.setProperty(
              '--clip-top',
              `${asciiClipTop}%`
            );
            card.state = 'scanning';

            if (!card.isScanned && scannerIntersectTop > 0) {
              card.isScanned = true;
              const scanEffect = document.createElement('div');
              scanEffect.className = 'scan-effect';
              card.wrapper.appendChild(scanEffect);
              setTimeout(() => {
                if (scanEffect.parentNode) {
                  scanEffect.parentNode.removeChild(scanEffect);
                }
              }, 600);
            }
          } else {
            if (cardBottom < scannerTop) {
              if (card.state !== 'above' || force) {
                card.normalCard.style.setProperty('--clip-bottom', '100%');
                card.asciiCard.style.setProperty('--clip-top', '100%');
                card.state = 'above';
              }
            } else if (cardTop > scannerBottom) {
              if (card.state !== 'below' || force) {
                card.normalCard.style.setProperty('--clip-bottom', '0%');
                card.asciiCard.style.setProperty('--clip-top', '0%');
                card.state = 'below';
              }
            }
            card.isScanned = false;
          }
        }

        if (particleScanner) {
          particleScanner.setScanningActive(anyScanningActive);
        }
      }

      populateCardLine() {
        this.cardLine.innerHTML = '';
        this.cards = [];
        for (let i = 0; i < this.totalCards; i++) {
          const cardData = this.createCardWrapper(i % this.cardsPerSet);
          this.cardLine.appendChild(cardData.wrapper);
          this.cards.push(cardData);
        }
      }

      destroy() {
        this.stopLoop();
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
        window.removeEventListener('resize', this.handleResize);
        this.cards = [];
      }
    }

    class ParticleScanner {
      constructor() {
        this.canvas = container.querySelector('.adviq-scanner-canvas');
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.animationId = null;
        this.isLoopRunning = false;

        this.w = container.clientWidth || 1000;
        this.h = container.clientHeight || 700;
        this.dpr = Math.min(
          window.devicePixelRatio || 1,
          window.innerWidth < 768 ? 1.0 : 1.5
        );

        this.isTouchDevice =
          typeof window !== 'undefined' &&
          (window.innerWidth <= 960 || navigator.maxTouchPoints > 1);

        this.maxParticlesLimit = this.isTouchDevice ? 400 : 1200;
        this.particles = new Array(this.maxParticlesLimit);
        this.count = 0;

        this.baseIntensity = 0.8;
        this.intensity = 0.8;
        this.lightBarHeight = 1.0;
        this.baseFadeZone = 60;
        this.fadeZone = 60;

        this.scanTargetIntensity = 1.8;
        this.scanTargetParticles = this.isTouchDevice ? 350 : 1000;
        this.scanTargetFadeZone = 35;
        this.baseMaxParticles = this.isTouchDevice ? 150 : 400;
        this.maxParticles = this.baseMaxParticles;

        this.scanningActive = false;
        this.currentIntensity = this.intensity;
        this.currentMaxParticles = this.maxParticles;
        this.currentFadeZone = this.fadeZone;
        this.transitionSpeed = 0.05;
        this.currentGlowIntensity = 1;

        this.bounds = {
          startX: 0,
          endX: this.w,
          width: this.w,
          centerY: this.h * 0.42,
        };

        this.handleResize = () => this.onResize();

        this.setupCanvas();
        this.createGradientCache();
        this.updateBounds();
        this.initParticles();
        this.startLoop();

        window.addEventListener('resize', this.handleResize, { passive: true });
      }

      updateBounds() {
        const streamLeft = this.isTouchDevice
          ? this.w * 0.5 - 160
          : this.w * 0.8 - 160;
        const streamWidth = 320;
        this.bounds.startX = Math.max(0, streamLeft - 40);
        this.bounds.endX = Math.min(this.w, streamLeft + streamWidth + 40);
        this.bounds.width = this.bounds.endX - this.bounds.startX;
        this.bounds.centerY = this.h * 0.42;
      }

      setupCanvas() {
        this.w = container.clientWidth || 1000;
        this.h = container.clientHeight || 700;
        this.dpr = Math.min(
          window.devicePixelRatio || 1,
          window.innerWidth < 768 ? 1.0 : 1.5
        );

        this.canvas.width = Math.floor(this.w * this.dpr);
        this.canvas.height = Math.floor(this.h * this.dpr);
        this.canvas.style.width = this.w + 'px';
        this.canvas.style.height = this.h + 'px';

        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        this.updateBounds();
      }

      onResize() {
        this.setupCanvas();
      }

      createGradientCache() {
        this.gradientCanvas = document.createElement('canvas');
        this.gradientCtx = this.gradientCanvas.getContext('2d');
        this.gradientCanvas.width = 16;
        this.gradientCanvas.height = 16;

        const half = 8;
        const gradient = this.gradientCtx.createRadialGradient(
          half,
          half,
          0,
          half,
          half,
          half
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(235, 185, 120, 0.8)');
        gradient.addColorStop(0.7, 'rgba(200, 138, 62, 0.4)');
        gradient.addColorStop(1, 'transparent');

        this.gradientCtx.fillStyle = gradient;
        this.gradientCtx.beginPath();
        this.gradientCtx.arc(half, half, half, 0, Math.PI * 2);
        this.gradientCtx.fill();
      }

      randomFloat(min, max) {
        return Math.random() * (max - min) + min;
      }

      initParticles() {
        for (let i = 0; i < this.maxParticlesLimit; i++) {
          this.particles[i] = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            radius: 1,
            alpha: 0,
            originalAlpha: 0,
            life: 0,
            decay: 0.01,
            time: 0,
            startY: 0,
            twinkleSpeed: 0.05,
            twinkleAmount: 0.15,
            active: false,
          };
        }

        const initialSpawn = Math.min(this.baseMaxParticles, 120);
        for (let i = 0; i < initialSpawn; i++) {
          this.spawnParticle(this.particles[i]);
        }
        this.count = initialSpawn;
      }

      spawnParticle(p) {
        const bounds = this.bounds;
        const intensityRatio = this.intensity / this.baseIntensity;
        const speedMultiplier = 1 + (intensityRatio - 1) * 1.2;
        const sizeMultiplier = 1 + (intensityRatio - 1) * 0.7;

        p.x = this.randomFloat(bounds.startX, bounds.endX);
        p.y =
          bounds.centerY +
          this.randomFloat(
            -this.lightBarHeight / 2,
            this.lightBarHeight / 2
          );
        p.vx = this.randomFloat(-0.15, 0.15) * speedMultiplier;
        p.vy = -this.randomFloat(0.2, 1.0) * speedMultiplier;
        p.radius = this.randomFloat(0.4, 1.1) * sizeMultiplier;
        p.alpha = this.randomFloat(0.6, 1);
        p.originalAlpha = p.alpha;
        p.decay =
          this.randomFloat(0.005, 0.025) * (2 - intensityRatio * 0.5);
        p.life = 1.0;
        p.time = 0;
        p.startY = bounds.centerY;
        p.twinkleSpeed =
          this.randomFloat(0.02, 0.08) * speedMultiplier;
        p.twinkleAmount = this.randomFloat(0.1, 0.25);
        p.active = true;
      }

      updateParticle(p) {
        const bounds = this.bounds;
        p.x += p.vx;
        p.y += p.vy;
        p.time++;

        p.alpha =
          p.originalAlpha * p.life +
          Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount;
        p.life -= p.decay;

        if (
          p.y < 0 ||
          p.life <= 0 ||
          p.x < bounds.startX - 30 ||
          p.x > bounds.endX + 30
        ) {
          if (this.count <= this.maxParticles) {
            this.spawnParticle(p);
          } else {
            p.active = false;
          }
        }
      }

      drawParticle(p) {
        if (!p.active || p.life <= 0) return;
        const bounds = this.bounds;
        let fadeAlpha = 1;
        if (p.x < bounds.startX + this.fadeZone) {
          fadeAlpha = (p.x - bounds.startX) / this.fadeZone;
        } else if (p.x > bounds.endX - this.fadeZone) {
          fadeAlpha = (bounds.endX - p.x) / this.fadeZone;
        }
        fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));

        this.ctx.globalAlpha = Math.max(0, p.alpha * fadeAlpha);
        this.ctx.drawImage(
          this.gradientCanvas,
          p.x - p.radius,
          p.y - p.radius,
          p.radius * 2,
          p.radius * 2
        );
      }

      drawLightBar() {
        const bounds = this.bounds;
        const startX = bounds.startX;
        const endX = bounds.endX;
        const barWidth = bounds.width;
        const lightBarY = bounds.centerY;
        const lineHeight = this.lightBarHeight;

        this.ctx.globalCompositeOperation = 'lighter';

        const targetGlowIntensity = this.scanningActive ? 3.5 : 1;
        this.currentGlowIntensity +=
          (targetGlowIntensity - this.currentGlowIntensity) *
          this.transitionSpeed;

        const glowIntensity = this.currentGlowIntensity;
        const glow1Alpha = this.scanningActive ? 1.0 : 0.8;
        const glow2Alpha = this.scanningActive ? 0.8 : 0.6;
        const glow3Alpha = this.scanningActive ? 0.6 : 0.4;

        // Core line gradient
        const coreGradient = this.ctx.createLinearGradient(
          0,
          lightBarY - lineHeight / 2,
          0,
          lightBarY + lineHeight / 2
        );
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        coreGradient.addColorStop(
          0.3,
          `rgba(255, 255, 255, ${0.9 * glowIntensity})`
        );
        coreGradient.addColorStop(
          0.5,
          `rgba(255, 255, 255, ${1 * glowIntensity})`
        );
        coreGradient.addColorStop(
          0.7,
          `rgba(255, 255, 255, ${0.9 * glowIntensity})`
        );
        coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = coreGradient;
        this.ctx.beginPath();
        if (this.ctx.roundRect) {
          this.ctx.roundRect(
            startX,
            lightBarY - lineHeight / 2,
            barWidth,
            lineHeight,
            15
          );
        } else {
          this.ctx.rect(
            startX,
            lightBarY - lineHeight / 2,
            barWidth,
            lineHeight
          );
        }
        this.ctx.fill();

        // Glow 1
        const glow1Gradient = this.ctx.createLinearGradient(
          0,
          lightBarY - lineHeight * 2,
          0,
          lightBarY + lineHeight * 2
        );
        glow1Gradient.addColorStop(0, 'rgba(200, 138, 62, 0)');
        glow1Gradient.addColorStop(
          0.5,
          `rgba(235, 185, 120, ${0.8 * glowIntensity})`
        );
        glow1Gradient.addColorStop(1, 'rgba(200, 138, 62, 0)');

        this.ctx.globalAlpha = glow1Alpha;
        this.ctx.fillStyle = glow1Gradient;
        this.ctx.beginPath();
        if (this.ctx.roundRect) {
          this.ctx.roundRect(
            startX,
            lightBarY - lineHeight * 2,
            barWidth,
            lineHeight * 4,
            25
          );
        } else {
          this.ctx.rect(
            startX,
            lightBarY - lineHeight * 2,
            barWidth,
            lineHeight * 4
          );
        }
        this.ctx.fill();

        // Glow 2
        const glow2Gradient = this.ctx.createLinearGradient(
          0,
          lightBarY - lineHeight * 4,
          0,
          lightBarY + lineHeight * 4
        );
        glow2Gradient.addColorStop(0, 'rgba(200, 138, 62, 0)');
        glow2Gradient.addColorStop(
          0.5,
          `rgba(200, 138, 62, ${0.4 * glowIntensity})`
        );
        glow2Gradient.addColorStop(1, 'rgba(200, 138, 62, 0)');

        this.ctx.globalAlpha = glow2Alpha;
        this.ctx.fillStyle = glow2Gradient;
        this.ctx.beginPath();
        if (this.ctx.roundRect) {
          this.ctx.roundRect(
            startX,
            lightBarY - lineHeight * 4,
            barWidth,
            lineHeight * 8,
            35
          );
        } else {
          this.ctx.rect(
            startX,
            lightBarY - lineHeight * 4,
            barWidth,
            lineHeight * 8
          );
        }
        this.ctx.fill();

        if (this.scanningActive) {
          const glow3Gradient = this.ctx.createLinearGradient(
            0,
            lightBarY - lineHeight * 8,
            0,
            lightBarY + lineHeight * 8
          );
          glow3Gradient.addColorStop(0, 'rgba(200, 138, 62, 0)');
          glow3Gradient.addColorStop(0.5, 'rgba(200, 138, 62, 0.2)');
          glow3Gradient.addColorStop(1, 'rgba(200, 138, 62, 0)');
          this.ctx.globalAlpha = glow3Alpha;
          this.ctx.fillStyle = glow3Gradient;
          this.ctx.beginPath();
          if (this.ctx.roundRect) {
            this.ctx.roundRect(
              startX,
              lightBarY - lineHeight * 8,
              barWidth,
              lineHeight * 16,
              45
            );
          } else {
            this.ctx.rect(
              startX,
              lightBarY - lineHeight * 8,
              barWidth,
              lineHeight * 16
            );
          }
          this.ctx.fill();
        }

        // Horizontal fade at left & right edges
        const horizontalGradient = this.ctx.createLinearGradient(
          startX,
          0,
          endX,
          0
        );
        horizontalGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        horizontalGradient.addColorStop(
          Math.min(0.2, this.fadeZone / Math.max(1, barWidth)),
          'rgba(255, 255, 255, 1)'
        );
        horizontalGradient.addColorStop(
          Math.max(0.8, 1 - this.fadeZone / Math.max(1, barWidth)),
          'rgba(255, 255, 255, 1)'
        );
        horizontalGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        this.ctx.globalCompositeOperation = 'destination-in';
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = horizontalGradient;
        this.ctx.fillRect(startX - 10, 0, barWidth + 20, this.h);
      }

      render() {
        const targetIntensity = this.scanningActive
          ? this.scanTargetIntensity
          : this.baseIntensity;
        const targetMaxParticles = this.scanningActive
          ? this.scanTargetParticles
          : this.baseMaxParticles;
        const targetFadeZone = this.scanningActive
          ? this.scanTargetFadeZone
          : this.baseFadeZone;

        this.currentIntensity +=
          (targetIntensity - this.currentIntensity) * this.transitionSpeed;
        this.currentMaxParticles +=
          (targetMaxParticles - this.currentMaxParticles) *
          this.transitionSpeed;
        this.currentFadeZone +=
          (targetFadeZone - this.currentFadeZone) * this.transitionSpeed;

        this.intensity = this.currentIntensity;
        this.maxParticles = Math.floor(this.currentMaxParticles);
        this.fadeZone = this.currentFadeZone;

        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.clearRect(0, 0, this.w, this.h);

        this.drawLightBar();

        this.ctx.globalCompositeOperation = 'lighter';
        let activeCount = 0;
        for (let i = 0; i < this.maxParticlesLimit; i++) {
          const p = this.particles[i];
          if (p && p.active) {
            activeCount++;
            this.updateParticle(p);
            this.drawParticle(p);
          }
        }
        this.count = activeCount;

        // Spawn new particles if below limit
        if (
          this.count < this.maxParticles &&
          Math.random() < this.intensity
        ) {
          const spawnBatch = this.scanningActive ? 3 : 1;
          for (let k = 0; k < spawnBatch; k++) {
            for (let i = 0; i < this.maxParticlesLimit; i++) {
              if (!this.particles[i].active) {
                this.spawnParticle(this.particles[i]);
                this.count++;
                break;
              }
            }
          }
        }
      }

      startLoop() {
        if (this.isLoopRunning || !isVisible || !isDocVisible) return;
        this.isLoopRunning = true;
        this.animate();
      }

      stopLoop() {
        this.isLoopRunning = false;
        if (this.animationId) {
          cancelAnimationFrame(this.animationId);
          this.animationId = null;
        }
      }

      animate() {
        if (!isVisible || !isDocVisible) {
          this.isLoopRunning = false;
          return;
        }

        this.render();
        this.animationId = requestAnimationFrame(() => this.animate());
      }

      setScanningActive(active) {
        this.scanningActive = active;
      }

      destroy() {
        this.stopLoop();
        window.removeEventListener('resize', this.handleResize);
        this.particles = [];
        this.count = 0;
      }
    }

    cardStream = new CardStreamController();
    particleScanner = new ParticleScanner();

    // IntersectionObserver to pause rendering when hero is out of view
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && isDocVisible) {
            cardStream?.startLoop();
            particleScanner?.startLoop();
          } else {
            cardStream?.stopLoop();
            particleScanner?.stopLoop();
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
        cardStream?.startLoop();
        particleScanner?.startLoop();
      } else {
        cardStream?.stopLoop();
        particleScanner?.stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      intersectionObserver?.disconnect();
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );
      if (cardStream) cardStream.destroy();
      if (particleScanner) particleScanner.destroy();
    };
  }, []);

  return (
    <div className="adviq-container" ref={containerRef}>
      <div className="speedValue" style={{ display: 'none' }}></div>
      <canvas className="adviq-scanner-canvas"></canvas>
      <div className="card-stream">
        <div className="card-line"></div>
        <div className="card-drag-zone"></div>
      </div>
    </div>
  );
}
