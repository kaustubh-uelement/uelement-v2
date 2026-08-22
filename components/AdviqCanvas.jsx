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

    const codeChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";

    class CardStreamController {
      constructor() {
        this.container = container.querySelector(".card-stream");
        this.cardLine = container.querySelector(".card-line");
        this.dragZone = container.querySelector(".card-drag-zone");
        this.speedIndicator = container.querySelector(".speedValue");

        this.position = 0;
        this.velocity = 120;
        this.direction = -1;
        this.isAnimating = true;
        this.isDragging = false;

        this.lastTime = 0;
        this.lastMouseY = 0;
        this.mouseVelocity = 0;
        this.friction = 0.95;
        this.minVelocity = 30;

        this.containerHeight = 0;
        this.cardLineHeight = 0;
        
        // bind methods for cleanup
        this.handleMouseMove = (e) => this.onDrag(e);
        this.handleMouseUp = () => this.endDrag();
        this.handleTouchMove = (e) => this.onDrag(e.touches[0]);
        this.handleTouchEnd = () => this.endDrag();
        this.handleResize = () => this.calculateDimensions();

        this.init();
      }

      init() {
        this.populateCardLine();
        this.calculateDimensions();
        this.setupEventListeners();
        this.updateCardPosition();
        this.animate();
        this.startPeriodicUpdates();
      }

      calculateDimensions() {
        this.containerHeight = container.clientHeight || 700;
        const cardHeight = 400;
        const cardGap = 50;
        this.unitHeight = cardHeight + cardGap;
        this.cardsPerSet = 10;
        this.setHeight = this.cardsPerSet * this.unitHeight;
      }

      setupEventListeners() {
        const attachTarget = this.dragZone || this.cardLine;
        attachTarget.addEventListener("mousedown", (e) => this.startDrag(e));
        this.cardLine.addEventListener("mousedown", (e) => this.startDrag(e));

        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);

        attachTarget.addEventListener(
          "touchstart",
          (e) => this.startDrag(e.touches[0]),
          { passive: false }
        );
        this.cardLine.addEventListener(
          "touchstart",
          (e) => this.startDrag(e.touches[0]),
          { passive: false }
        );
        document.addEventListener("touchmove", this.handleTouchMove, {
          passive: false,
        });
        document.addEventListener("touchend", this.handleTouchEnd);

        attachTarget.addEventListener("wheel", (e) => this.onWheel(e));
        this.cardLine.addEventListener("wheel", (e) => this.onWheel(e));
        attachTarget.addEventListener("selectstart", (e) => e.preventDefault());
        attachTarget.addEventListener("dragstart", (e) => e.preventDefault());
        this.cardLine.addEventListener("selectstart", (e) => e.preventDefault());
        this.cardLine.addEventListener("dragstart", (e) => e.preventDefault());

        window.addEventListener("resize", this.handleResize);
      }

      startDrag(e) {
        e.preventDefault();

        this.isDragging = true;
        this.isAnimating = false;
        this.lastMouseY = e.clientY;
        this.mouseVelocity = 0;

        const transform = window.getComputedStyle(this.cardLine).transform;
        if (transform !== "none") {
          const matrix = new DOMMatrix(transform);
          this.position = matrix.m42;
        }

        this.cardLine.style.animation = "none";
        this.cardLine.classList.add("dragging");
        if (this.dragZone) this.dragZone.classList.add("dragging");

        document.body.style.userSelect = "none";
        document.body.style.cursor = "grabbing";
      }

      onDrag(e) {
        if (!this.isDragging) return;
        e.preventDefault();

        const deltaY = e.clientY - this.lastMouseY;
        this.position += deltaY;
        this.mouseVelocity = deltaY * 60;
        this.lastMouseY = e.clientY;

        this.updateCardPosition();
      }

      endDrag() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.cardLine.classList.remove("dragging");
        if (this.dragZone) this.dragZone.classList.remove("dragging");

        if (Math.abs(this.mouseVelocity) > this.minVelocity) {
          this.velocity = Math.abs(this.mouseVelocity);
          this.direction = this.mouseVelocity > 0 ? 1 : -1;
        } else {
          this.velocity = 120;
        }

        this.isAnimating = true;
        this.updateSpeedIndicator();

        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      }

      animate() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        if (this.isAnimating && !this.isDragging) {
          if (this.velocity > this.minVelocity) {
            this.velocity *= this.friction;
          } else {
            this.velocity = Math.max(this.minVelocity, this.velocity);
          }

          this.position += this.velocity * this.direction * deltaTime;
          this.updateCardPosition();
          this.updateSpeedIndicator();
        }

        this.animationFrame = requestAnimationFrame(() => this.animate());
      }

      updateCardPosition() {
        const setHeight = this.setHeight;
        if (setHeight && setHeight > 0) {
          while (this.position <= -setHeight) {
            this.position += setHeight;
          }
          while (this.position > 0) {
            this.position -= setHeight;
          }
        }

        this.cardLine.style.transform = `translateY(${this.position}px)`;
        this.updateCardClipping();
      }

      updateSpeedIndicator() {
        if (this.speedIndicator) this.speedIndicator.textContent = Math.round(this.velocity);
      }

      onWheel(e) {
        const scrollSpeed = 20;
        const delta = e.deltaY > 0 ? scrollSpeed : -scrollSpeed;

        this.position += delta;
        this.updateCardPosition();
      }

      generateCode(width, height) {
        const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const pick = (arr) => arr[randInt(0, arr.length - 1)];

        const header = [
          "// compiled preview • scanner demo",
          "/* generated for visual effect – not executed */",
          "const SCAN_WIDTH = 8;",
          "const FADE_ZONE = 35;",
          "const MAX_PARTICLES = 2500;",
          "const TRANSITION = 0.05;",
        ];

        const helpers = [
          "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
          "function lerp(a, b, t) { return a + (b - a) * t; }",
          "const now = () => performance.now();",
          "function rng(min, max) { return Math.random() * (max - min) + min; }",
        ];

        const particleBlock = (idx) => [
          `class Particle${idx} {`,
          "  constructor(x, y, vx, vy, r, a) {",
          "    this.x = x; this.y = y;",
          "    this.vx = vx; this.vy = vy;",
          "    this.r = r; this.a = a;",
          "  }",
          "  step(dt) { this.x += this.vx * dt; this.y += this.vy * dt; }",
          "}",
        ];

        const scannerBlock = [
          "const scanner = {",
          "  y: Math.floor(window.innerHeight / 2),",
          "  height: SCAN_WIDTH,",
          "  glow: 3.5,",
          "};",
          "",
          "function drawParticle(ctx, p) {",
          "  ctx.globalAlpha = clamp(p.a, 0, 1);",
          "  ctx.drawImage(gradient, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);",
          "}",
        ];

        const loopBlock = [
          "function tick(t) {",
          "  // requestAnimationFrame(tick);",
          "  const dt = 0.016;",
          "  // update & render",
          "}",
        ];

        const misc = [
          "const state = { intensity: 1.2, particles: MAX_PARTICLES };",
          "const bounds = { w: window.innerWidth, h: 300 };",
          "const gradient = document.createElement('canvas');",
          "const ctx = gradient.getContext('2d');",
          "ctx.globalCompositeOperation = 'lighter';",
          "// ascii overlay is masked with a 3-phase gradient",
        ];

        const library = [];
        header.forEach((l) => library.push(l));
        helpers.forEach((l) => library.push(l));
        for (let b = 0; b < 3; b++) particleBlock(b).forEach((l) => library.push(l));
        scannerBlock.forEach((l) => library.push(l));
        loopBlock.forEach((l) => library.push(l));
        misc.forEach((l) => library.push(l));

        for (let i = 0; i < 40; i++) {
          const n1 = randInt(1, 9);
          const n2 = randInt(10, 99);
          library.push(`const v${i} = (${n1} + ${n2}) * 0.${randInt(1, 9)};`);
        }
        for (let i = 0; i < 20; i++) {
          library.push(`if (state.intensity > ${1 + (i % 3)}) { scanner.glow += 0.01; }`);
        }

        let flow = library.join(" ");
        flow = flow.replace(/\s+/g, " ").trim();
        const totalChars = width * height;
        while (flow.length < totalChars + width) {
          const extra = pick(library).replace(/\s+/g, " ").trim();
          flow += " " + extra;
        }

        let out = "";
        let offset = 0;
        for (let row = 0; row < height; row++) {
          let line = flow.slice(offset, offset + width);
          if (line.length < width) line = line + " ".repeat(width - line.length);
          out += line + (row < height - 1 ? "\n" : "");
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
        const wrapper = document.createElement("div");
        wrapper.className = "card-wrapper";

        const normalCard = document.createElement("div");
        normalCard.className = "card card-normal";

        const cardDef = CARD_DEFINITIONS[index % CARD_DEFINITIONS.length];
        const customCard = createCustomCardElement(cardDef);
        normalCard.appendChild(customCard);

        const asciiCard = document.createElement("div");
        asciiCard.className = "card card-ascii";

        const asciiContent = document.createElement("div");
        asciiContent.className = "ascii-content";

        const { width, height, fontSize, lineHeight } = this.calculateCodeDimensions(250, 400);
        asciiContent.style.fontSize = fontSize + "px";
        asciiContent.style.lineHeight = lineHeight + "px";
        asciiContent.textContent = this.generateCode(width, height);

        asciiCard.appendChild(asciiContent);
        wrapper.appendChild(normalCard);
        wrapper.appendChild(asciiCard);

        return wrapper;
      }

      updateCardClipping() {
        const containerRect = container.getBoundingClientRect();
        const scannerY = containerRect.top + containerRect.height * 0.5;
        const scannerHeight = 8;
        const scannerTop = scannerY - scannerHeight / 2;
        const scannerBottom = scannerY + scannerHeight / 2;
        let anyScanningActive = false;

        container.querySelectorAll(".card-wrapper").forEach((wrapper) => {
          const rect = wrapper.getBoundingClientRect();
          const cardTop = rect.top;
          const cardBottom = rect.bottom;
          const cardHeight = rect.height || 400;

          const normalCard = wrapper.querySelector(".card-normal");
          const asciiCard = wrapper.querySelector(".card-ascii");

          if (!normalCard || !asciiCard) return;

          if (cardTop < scannerBottom && cardBottom > scannerTop) {
            anyScanningActive = true;
            const scannerIntersectTop = Math.max(scannerTop - cardTop, 0);
            const scannerIntersectBottom = Math.min(scannerBottom - cardTop, cardHeight);

            const normalClipBottom = (scannerIntersectTop / cardHeight) * 100;
            const asciiClipTop = (scannerIntersectBottom / cardHeight) * 100;

            normalCard.style.setProperty("--clip-bottom", `${normalClipBottom}%`);
            asciiCard.style.setProperty("--clip-top", `${asciiClipTop}%`);

            if (!wrapper.hasAttribute("data-scanned") && scannerIntersectTop > 0) {
              wrapper.setAttribute("data-scanned", "true");
              const scanEffect = document.createElement("div");
              scanEffect.className = "scan-effect";
              wrapper.appendChild(scanEffect);
              setTimeout(() => {
                if (scanEffect.parentNode) {
                  scanEffect.parentNode.removeChild(scanEffect);
                }
              }, 600);
            }
          } else {
            if (cardBottom < scannerTop) {
              normalCard.style.setProperty("--clip-bottom", "100%");
              asciiCard.style.setProperty("--clip-top", "100%");
            } else if (cardTop > scannerBottom) {
              normalCard.style.setProperty("--clip-bottom", "0%");
              asciiCard.style.setProperty("--clip-top", "0%");
            }
            wrapper.removeAttribute("data-scanned");
          }
        });

        if (particleScanner) {
          particleScanner.setScanningActive(anyScanningActive);
        }
      }

      updateAsciiContent() {
        container.querySelectorAll(".ascii-content").forEach((content) => {
          if (Math.random() < 0.15) {
            const { width, height } = this.calculateCodeDimensions(250, 400);
            content.textContent = this.generateCode(width, height);
          }
        });
      }

      populateCardLine() {
        this.cardLine.innerHTML = "";
        this.cardsPerSet = 10;
        const totalSets = 3;
        const totalCards = this.cardsPerSet * totalSets;
        for (let i = 0; i < totalCards; i++) {
          const cardWrapper = this.createCardWrapper(i % this.cardsPerSet);
          this.cardLine.appendChild(cardWrapper);
        }
      }

      startPeriodicUpdates() {
        this.intervalId = setInterval(() => {
          this.updateAsciiContent();
        }, 200);

        const updateClipping = () => {
          this.updateCardClipping();
          this.clippingRaf = requestAnimationFrame(updateClipping);
        };
        updateClipping();
      }
      
      destroy() {
        cancelAnimationFrame(this.animationFrame);
        cancelAnimationFrame(this.clippingRaf);
        clearInterval(this.intervalId);
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("touchmove", this.handleTouchMove);
        document.removeEventListener("touchend", this.handleTouchEnd);
        window.removeEventListener("resize", this.handleResize);
      }
    }

    class ParticleScanner {
      constructor() {
        this.canvas = container.querySelector(".adviq-scanner-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.animationId = null;

        this.w = container.clientWidth;
        this.h = container.clientHeight || 700;
        this.particles = [];
        this.count = 0;
        this.maxParticles = 800;
        this.intensity = 0.8;
        this.lightBarHeight = 3;
        this.fadeZone = 60;

        this.scanTargetIntensity = 1.8;
        this.scanTargetParticles = 2500;
        this.scanTargetFadeZone = 35;

        this.scanningActive = false;

        this.baseIntensity = this.intensity;
        this.baseMaxParticles = this.maxParticles;
        this.baseFadeZone = this.fadeZone;

        this.currentIntensity = this.intensity;
        this.currentMaxParticles = this.maxParticles;
        this.currentFadeZone = this.fadeZone;
        this.transitionSpeed = 0.05;

        this.handleResize = () => this.onResize();

        this.setupCanvas();
        this.createGradientCache();
        this.initParticles();
        this.animate();

        window.addEventListener("resize", this.handleResize);
      }

      getStreamBounds() {
        const stream = container.querySelector(".card-stream");
        if (stream) {
          const streamRect = stream.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const streamLeft = streamRect.left - containerRect.left;
          const streamWidth = streamRect.width || 320;
          return {
            startX: Math.max(0, streamLeft - 40),
            endX: Math.min(this.w, streamLeft + streamWidth + 40),
            width: streamWidth + 80,
            centerY: this.h * 0.5,
          };
        }
        return {
          startX: this.w * 0.5 - 180,
          endX: this.w * 0.5 + 180,
          width: 360,
          centerY: this.h * 0.5,
        };
      }

      setupCanvas() {
        this.w = container.clientWidth;
        this.h = container.clientHeight || 700;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.canvas.style.width = this.w + "px";
        this.canvas.style.height = this.h + "px";
        this.ctx.clearRect(0, 0, this.w, this.h);
      }

      onResize() {
        this.setupCanvas();
      }

      createGradientCache() {
        this.gradientCanvas = document.createElement("canvas");
        this.gradientCtx = this.gradientCanvas.getContext("2d");
        this.gradientCanvas.width = 16;
        this.gradientCanvas.height = 16;

        const half = this.gradientCanvas.width / 2;
        const gradient = this.gradientCtx.createRadialGradient(half, half, 0, half, half, half);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(235, 185, 120, 0.8)");
        gradient.addColorStop(0.7, "rgba(200, 138, 62, 0.4)");
        gradient.addColorStop(1, "transparent");

        this.gradientCtx.fillStyle = gradient;
        this.gradientCtx.beginPath();
        this.gradientCtx.arc(half, half, half, 0, Math.PI * 2);
        this.gradientCtx.fill();
      }

      randomFloat(min, max) {
        return Math.random() * (max - min) + min;
      }

      createParticle() {
        const bounds = this.getStreamBounds();
        const intensityRatio = this.intensity / this.baseIntensity;
        const speedMultiplier = 1 + (intensityRatio - 1) * 1.2;
        const sizeMultiplier = 1 + (intensityRatio - 1) * 0.7;

        return {
          x: this.randomFloat(bounds.startX, bounds.endX),
          y: bounds.centerY + this.randomFloat(-this.lightBarHeight / 2, this.lightBarHeight / 2),
          vx: this.randomFloat(-0.15, 0.15) * speedMultiplier,
          vy: -this.randomFloat(0.2, 1.0) * speedMultiplier,
          radius: this.randomFloat(0.4, 1) * sizeMultiplier,
          alpha: this.randomFloat(0.6, 1),
          decay: this.randomFloat(0.005, 0.025) * (2 - intensityRatio * 0.5),
          originalAlpha: 0,
          life: 1.0,
          time: 0,
          startY: bounds.centerY,
          twinkleSpeed: this.randomFloat(0.02, 0.08) * speedMultiplier,
          twinkleAmount: this.randomFloat(0.1, 0.25),
        };
      }

      initParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
          const particle = this.createParticle();
          particle.originalAlpha = particle.alpha;
          this.count++;
          this.particles[this.count] = particle;
        }
      }

      updateParticle(particle) {
        const bounds = this.getStreamBounds();
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.time++;

        particle.alpha = particle.originalAlpha * particle.life + Math.sin(particle.time * particle.twinkleSpeed) * particle.twinkleAmount;
        particle.life -= particle.decay;

        if (particle.y < 0 || particle.life <= 0 || particle.x < bounds.startX - 30 || particle.x > bounds.endX + 30) {
          this.resetParticle(particle);
        }
      }

      resetParticle(particle) {
        const bounds = this.getStreamBounds();
        particle.x = this.randomFloat(bounds.startX, bounds.endX);
        particle.y = bounds.centerY + this.randomFloat(-this.lightBarHeight / 2, this.lightBarHeight / 2);
        particle.vx = this.randomFloat(-0.15, 0.15);
        particle.vy = -this.randomFloat(0.2, 1.0);
        particle.alpha = this.randomFloat(0.6, 1);
        particle.originalAlpha = particle.alpha;
        particle.life = 1.0;
        particle.time = 0;
        particle.startY = bounds.centerY;
      }

      drawParticle(particle) {
        if (particle.life <= 0) return;
        const bounds = this.getStreamBounds();
        let fadeAlpha = 1;
        if (particle.x < bounds.startX + this.fadeZone) {
          fadeAlpha = (particle.x - bounds.startX) / this.fadeZone;
        } else if (particle.x > bounds.endX - this.fadeZone) {
          fadeAlpha = (bounds.endX - particle.x) / this.fadeZone;
        }
        fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));

        this.ctx.globalAlpha = particle.alpha * fadeAlpha;
        this.ctx.drawImage(
          this.gradientCanvas,
          particle.x - particle.radius,
          particle.y - particle.radius,
          particle.radius * 2,
          particle.radius * 2
        );
      }

      drawLightBar() {
        const bounds = this.getStreamBounds();
        const startX = bounds.startX;
        const endX = bounds.endX;
        const barWidth = bounds.width;
        const lightBarY = bounds.centerY;
        const lineHeight = this.lightBarHeight;

        this.ctx.globalCompositeOperation = "lighter";

        const targetGlowIntensity = this.scanningActive ? 3.5 : 1;
        if (!this.currentGlowIntensity) this.currentGlowIntensity = 1;
        this.currentGlowIntensity += (targetGlowIntensity - this.currentGlowIntensity) * this.transitionSpeed;

        const glowIntensity = this.currentGlowIntensity;
        const glow1Alpha = this.scanningActive ? 1.0 : 0.8;
        const glow2Alpha = this.scanningActive ? 0.8 : 0.6;
        const glow3Alpha = this.scanningActive ? 0.6 : 0.4;

        // Core line gradient (vertical)
        const coreGradient = this.ctx.createLinearGradient(0, lightBarY - lineHeight / 2, 0, lightBarY + lineHeight / 2);
        coreGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        coreGradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.9 * glowIntensity})`);
        coreGradient.addColorStop(0.5, `rgba(255, 255, 255, ${1 * glowIntensity})`);
        coreGradient.addColorStop(0.7, `rgba(255, 255, 255, ${0.9 * glowIntensity})`);
        coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = coreGradient;
        this.ctx.beginPath();
        this.ctx.roundRect(startX, lightBarY - lineHeight / 2, barWidth, lineHeight, 15);
        this.ctx.fill();

        // Glow 1
        const glow1Gradient = this.ctx.createLinearGradient(0, lightBarY - lineHeight * 2, 0, lightBarY + lineHeight * 2);
        glow1Gradient.addColorStop(0, "rgba(200, 138, 62, 0)");
        glow1Gradient.addColorStop(0.5, `rgba(235, 185, 120, ${0.8 * glowIntensity})`);
        glow1Gradient.addColorStop(1, "rgba(200, 138, 62, 0)");

        this.ctx.globalAlpha = glow1Alpha;
        this.ctx.fillStyle = glow1Gradient;
        this.ctx.beginPath();
        this.ctx.roundRect(startX, lightBarY - lineHeight * 2, barWidth, lineHeight * 4, 25);
        this.ctx.fill();

        // Glow 2
        const glow2Gradient = this.ctx.createLinearGradient(0, lightBarY - lineHeight * 4, 0, lightBarY + lineHeight * 4);
        glow2Gradient.addColorStop(0, "rgba(200, 138, 62, 0)");
        glow2Gradient.addColorStop(0.5, `rgba(200, 138, 62, ${0.4 * glowIntensity})`);
        glow2Gradient.addColorStop(1, "rgba(200, 138, 62, 0)");

        this.ctx.globalAlpha = glow2Alpha;
        this.ctx.fillStyle = glow2Gradient;
        this.ctx.beginPath();
        this.ctx.roundRect(startX, lightBarY - lineHeight * 4, barWidth, lineHeight * 8, 35);
        this.ctx.fill();

        if (this.scanningActive) {
          const glow3Gradient = this.ctx.createLinearGradient(0, lightBarY - lineHeight * 8, 0, lightBarY + lineHeight * 8);
          glow3Gradient.addColorStop(0, "rgba(200, 138, 62, 0)");
          glow3Gradient.addColorStop(0.5, "rgba(200, 138, 62, 0.2)");
          glow3Gradient.addColorStop(1, "rgba(200, 138, 62, 0)");
          this.ctx.globalAlpha = glow3Alpha;
          this.ctx.fillStyle = glow3Gradient;
          this.ctx.beginPath();
          this.ctx.roundRect(startX, lightBarY - lineHeight * 8, barWidth, lineHeight * 16, 45);
          this.ctx.fill();
        }

        // Horizontal fade at left & right edges
        const horizontalGradient = this.ctx.createLinearGradient(startX, 0, endX, 0);
        horizontalGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        horizontalGradient.addColorStop(Math.min(0.2, this.fadeZone / barWidth), "rgba(255, 255, 255, 1)");
        horizontalGradient.addColorStop(Math.max(0.8, 1 - this.fadeZone / barWidth), "rgba(255, 255, 255, 1)");
        horizontalGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        this.ctx.globalCompositeOperation = "destination-in";
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = horizontalGradient;
        this.ctx.fillRect(startX - 10, 0, barWidth + 20, this.h);
      }

      render() {
        const targetIntensity = this.scanningActive ? this.scanTargetIntensity : this.baseIntensity;
        const targetMaxParticles = this.scanningActive ? this.scanTargetParticles : this.baseMaxParticles;
        const targetFadeZone = this.scanningActive ? this.scanTargetFadeZone : this.baseFadeZone;

        this.currentIntensity += (targetIntensity - this.currentIntensity) * this.transitionSpeed;
        this.currentMaxParticles += (targetMaxParticles - this.currentMaxParticles) * this.transitionSpeed;
        this.currentFadeZone += (targetFadeZone - this.currentFadeZone) * this.transitionSpeed;

        this.intensity = this.currentIntensity;
        this.maxParticles = Math.floor(this.currentMaxParticles);
        this.fadeZone = this.currentFadeZone;

        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.clearRect(0, 0, this.w, this.h);

        this.drawLightBar();

        this.ctx.globalCompositeOperation = "lighter";
        for (let i = 1; i <= this.count; i++) {
          if (this.particles[i]) {
            this.updateParticle(this.particles[i]);
            this.drawParticle(this.particles[i]);
          }
        }

        const currentIntensity = this.intensity;
        const currentMaxParticles = this.maxParticles;

        if (Math.random() < currentIntensity && this.count < currentMaxParticles) {
          const particle = this.createParticle();
          particle.originalAlpha = particle.alpha;
          this.count++;
          this.particles[this.count] = particle;
        }

        const intensityRatio = this.intensity / this.baseIntensity;

        if (intensityRatio > 1.1 && Math.random() < (intensityRatio - 1.0) * 1.2) {
          const particle = this.createParticle();
          particle.originalAlpha = particle.alpha;
          this.count++;
          this.particles[this.count] = particle;
        }

        if (intensityRatio > 1.3 && Math.random() < (intensityRatio - 1.3) * 1.4) {
          const particle = this.createParticle();
          particle.originalAlpha = particle.alpha;
          this.count++;
          this.particles[this.count] = particle;
        }

        if (intensityRatio > 1.5 && Math.random() < (intensityRatio - 1.5) * 1.8) {
          const particle = this.createParticle();
          particle.originalAlpha = particle.alpha;
          this.count++;
          this.particles[this.count] = particle;
        }

        if (intensityRatio > 2.0 && Math.random() < (intensityRatio - 2.0) * 2.0) {
          const particle = this.createParticle();
          particle.originalAlpha = particle.alpha;
          this.count++;
          this.particles[this.count] = particle;
        }

        if (this.count > currentMaxParticles + 200) {
          const excessCount = Math.min(15, this.count - currentMaxParticles);
          for (let i = 0; i < excessCount; i++) {
            delete this.particles[this.count - i];
          }
          this.count -= excessCount;
        }
      }

      animate() {
        this.render();
        this.animationId = requestAnimationFrame(() => this.animate());
      }

      setScanningActive(active) {
        this.scanningActive = active;
      }

      destroy() {
        cancelAnimationFrame(this.animationId);
        window.removeEventListener("resize", this.handleResize);
        this.particles = [];
        this.count = 0;
      }
    }

    cardStream = new CardStreamController();
    particleScanner = new ParticleScanner();

    return () => {
      if (cardStream) cardStream.destroy();
      if (particleScanner) particleScanner.destroy();
    };
  }, []);

  return (
    <div className="adviq-container" ref={containerRef}>
      <div className="speedValue" style={{ display: 'none' }}></div>
      <canvas className="adviq-particle-canvas"></canvas>
      <canvas className="adviq-scanner-canvas"></canvas>
      <div className="card-stream">
        <div className="card-line"></div>
        <div className="card-drag-zone"></div>
      </div>
    </div>
  );
}
