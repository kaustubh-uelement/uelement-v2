'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uPulses[8];
uniform vec2 uPulsePos[8];
varying float vElevation;
varying vec2 vUv;
varying float vDist;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i); float b = hash(i+vec2(1.0,0.0));
  float c = hash(i+vec2(0.0,1.0)); float d = hash(i+vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}

void main(){
  vUv = uv;
  vec3 pos = position;
  float n1 = noise(pos.xz*0.35 + uTime*0.05);
  float n2 = noise(pos.xz*0.9 - uTime*0.08) * 0.4;
  float elevation = (n1 + n2) * 0.52;

  // Gently soften mountains on the left side so peaks emerge elegantly on the right
  float leftSlope = smoothstep(-6.5, -0.5, pos.x);
  elevation *= (0.35 + 0.65 * leftSlope);

  vec2 mouseWorld = uMouse * vec2(7.0, 11.0);
  float md = distance(pos.xz, mouseWorld);
  float mouseBump = exp(-md*md*0.15) * 1.8;
  elevation += mouseBump;

  for(int i=0;i<8;i++){
    if(uPulses[i] > 0.0){
      vec2 pw = uPulsePos[i] * vec2(7.0,11.0);
      float pd = distance(pos.xz, pw);
      float ring = exp(-pow(pd - uPulses[i]*9.0, 2.0)*0.5) * (1.0-uPulses[i]) * 2.2;
      elevation += ring;
    }
  }

  pos.y += elevation;
  vElevation = elevation;
  vDist = length(pos.xz);
  vec4 mvPosition = modelViewMatrix * vec4(pos,1.0);
  gl_Position = projectionMatrix * mvPosition;

  gl_PointSize = clamp(20.0 / -mvPosition.z, 1.2, 2.5);
}
`;

const fragmentShader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float uTime;
uniform vec3 uColorBase;
uniform vec3 uColorPeak;
varying float vElevation;
varying vec2 vUv;
varying float vDist;

vec3 goldenSpectral(float t){
  t = clamp(t, 0.0, 1.0);
  vec3 c1 = vec3(0.784, 0.541, 0.243); // #c88a3e
  vec3 c2 = vec3(0.878, 0.655, 0.412); // #e0a769
  vec3 c3 = vec3(0.960, 0.820, 0.550); // warm champagne gold
  vec3 a = mix(c1, c2, smoothstep(0.0, 0.5, t));
  vec3 b = mix(c2, c3, smoothstep(0.5, 1.0, t));
  return mix(a, b, step(0.5, t));
}

void main(){
  float fade = smoothstep(11.0, 2.0, vDist);
  float e = clamp(vElevation * 0.6, 0.0, 1.0);
  vec3 base = mix(uColorBase, uColorPeak, e);
  float spec = sin(vDist * 0.8 - uTime * 0.6) * 0.5 + 0.5;
  vec3 spectralTint = goldenSpectral(spec) * smoothstep(0.15, 1.4, vElevation) * 0.65;
  vec3 color = base + spectralTint;
  float alpha = fade * (0.35 + e * 0.65);
  gl_FragColor = vec4(color, alpha);
}
`;

const dotFragmentShader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float uTime;
uniform vec3 uColorBase;
uniform vec3 uColorPeak;
varying float vElevation;
varying float vDist;
void main(){
  vec2 coord = gl_PointCoord - vec2(0.5);
  if (length(coord) > 0.5) discard;

  float fade = smoothstep(11.0, 2.0, vDist);
  float e = clamp(vElevation * 0.7, 0.0, 1.0);
  vec3 color = mix(uColorBase * 1.3, uColorPeak, e);
  float alpha = fade * e * 0.9;
  if(alpha < 0.02) discard;
  gl_FragColor = vec4(color, alpha);
}
`;

const bloomVertex = `varying vec2 vUv; void main(){ vUv=uv; gl_Position = vec4(position.xy,0.0,1.0); }`;

const blurFragment = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D tDiffuse; uniform vec2 uDir; uniform vec2 uRes; varying vec2 vUv;
void main(){
  vec4 sum = vec4(0.0);
  vec2 px = uDir/uRes;
  sum += texture2D(tDiffuse, vUv - px*4.0)*0.05;
  sum += texture2D(tDiffuse, vUv - px*3.0)*0.09;
  sum += texture2D(tDiffuse, vUv - px*2.0)*0.12;
  sum += texture2D(tDiffuse, vUv - px*1.0)*0.15;
  sum += texture2D(tDiffuse, vUv)*0.18;
  sum += texture2D(tDiffuse, vUv + px*1.0)*0.15;
  sum += texture2D(tDiffuse, vUv + px*2.0)*0.12;
  sum += texture2D(tDiffuse, vUv + px*3.0)*0.09;
  sum += texture2D(tDiffuse, vUv + px*4.0)*0.05;
  gl_FragColor = sum;
}
`;

const compositeFragment = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform float uTime;
uniform float uGlitch;
uniform float uIsMobile;
varying vec2 vUv;

void main(){
  vec2 uv = vUv;

  if(uGlitch > 0.001){
    float g = uGlitch;
    float blockY = floor(uv.y * 30.0);
    float r1 = fract(sin(blockY * 43.12 + uTime * 20.0) * 43758.5453);
    if(r1 > 0.85){
      uv.x += (fract(sin(blockY * 12.98) * 43758.5453) - 0.5) * 0.04 * g;
    }
  }

  vec4 colScene = texture2D(tScene, uv);
  vec4 colBloom = texture2D(tBloom, uv);

  // Luminous golden bloom factor
  float bloomBoost = uIsMobile > 0.5 ? 1.6 : 1.95;
  vec3 color = colScene.rgb + colBloom.rgb * bloomBoost;

  // Gentle vignette towards borders for seamless edge fade
  float vig = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
  float vigFade = clamp(pow(16.0 * vig, 0.25), 0.0, 1.0);
  color *= (0.35 + 0.65 * vigFade);

  gl_FragColor = vec4(color, colScene.a);
}
`;

export default function SpectralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isVisible = true;
    let isDocVisible = true;
    let isMobile = window.innerWidth < 768;
    const DPR = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setPixelRatio(DPR);

    let W = canvas.clientWidth || window.innerWidth;
    let H = canvas.clientHeight || window.innerHeight;
    renderer.setSize(W, H, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 100);
    camera.position.set(-0.6, 3.4, 6.2);
    camera.lookAt(1.0, 0, -2.0);

    const mouse = { x: 0, y: 0 };
    const mouseTarget = { x: 0, y: 0 };
    let clickPulses: { x: number; y: number; t: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseTarget.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouseTarget.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (clickPulses.length >= 8) clickPulses.shift();
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      clickPulses.push({ x, y, t: 0.0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // Grid geometry - high quality optimized density
    const segX = isMobile ? 80 : 110;
    const segY = isMobile ? 120 : 170;
    const gridGeo = new THREE.PlaneGeometry(14, 22, segX, segY);
    gridGeo.rotateX(-Math.PI / 2);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorBase: { value: new THREE.Color(0x0c1a3e) }, // deep midnight navy
      uColorPeak: { value: new THREE.Color(0xf5ead8) }, // radiant champagne gold
      uPulses: { value: [0, 0, 0, 0, 0, 0, 0, 0] },
      uPulsePos: {
        value: Array.from({ length: 8 }, () => new THREE.Vector2(0, 0)),
      },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const gridMesh = new THREE.Mesh(gridGeo, mat);
    gridMesh.position.set(1.5, 0, -3);
    scene.add(gridMesh);

    const dotGeo = new THREE.PlaneGeometry(14, 22, segX, segY);
    dotGeo.rotateX(-Math.PI / 2);
    const dotMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: dotFragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dotMesh = new THREE.Points(dotGeo, dotMat);
    dotMesh.position.set(1.5, 0, -3);
    scene.add(dotMesh);

    // Optimized bloom render targets (half resolution for soft bloom & high performance)
    const bloomW = Math.max(1, Math.floor(W * DPR * 0.5));
    const bloomH = Math.max(1, Math.floor(H * DPR * 0.5));

    let rtScene = new THREE.WebGLRenderTarget(W * DPR, H * DPR, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });
    let rtBloom1 = new THREE.WebGLRenderTarget(bloomW, bloomH, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });
    let rtBloom2 = new THREE.WebGLRenderTarget(bloomW, bloomH, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });

    const quadScene = new THREE.Scene();
    const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quadGeo = new THREE.PlaneGeometry(2, 2);

    const blurMatH = new THREE.ShaderMaterial({
      vertexShader: bloomVertex,
      fragmentShader: blurFragment,
      uniforms: {
        tDiffuse: { value: null },
        uDir: { value: new THREE.Vector2(1.2, 0) },
        uRes: { value: new THREE.Vector2(bloomW, bloomH) },
      },
    });
    const blurMatV = new THREE.ShaderMaterial({
      vertexShader: bloomVertex,
      fragmentShader: blurFragment,
      uniforms: {
        tDiffuse: { value: null },
        uDir: { value: new THREE.Vector2(0, 1.2) },
        uRes: { value: new THREE.Vector2(bloomW, bloomH) },
      },
    });
    const compositeMat = new THREE.ShaderMaterial({
      vertexShader: bloomVertex,
      fragmentShader: compositeFragment,
      uniforms: {
        tScene: { value: null },
        tBloom: { value: null },
        uTime: { value: 0 },
        uGlitch: { value: 0 },
        uIsMobile: { value: isMobile ? 1.0 : 0.0 },
      },
    });

    const quadMesh = new THREE.Mesh(quadGeo, blurMatH);
    quadScene.add(quadMesh);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 300;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 30;
      starPos[i * 3 + 1] = Math.random() * 10 + 1;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xf5ead8,
      size: 0.045,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    let glitchTimer = 0;
    let glitchActive = 0;
    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;

    const resize = () => {
      if (!canvas) return;
      W = canvas.clientWidth || window.innerWidth;
      H = canvas.clientHeight || window.innerHeight;
      isMobile = W < 768;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();

      rtScene.setSize(W * DPR, H * DPR);
      const halfW = Math.max(1, Math.floor(W * DPR * 0.5));
      const halfH = Math.max(1, Math.floor(H * DPR * 0.5));
      rtBloom1.setSize(halfW, halfH);
      rtBloom2.setSize(halfW, halfH);
      blurMatH.uniforms.uRes.value.set(halfW, halfH);
      blurMatV.uniforms.uRes.value.set(halfW, halfH);
      compositeMat.uniforms.uIsMobile.value = isMobile ? 1.0 : 0.0;
    };

    window.addEventListener('resize', resize, { passive: true });

    // IntersectionObserver to pause when hero is scrolled out of view!
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !rafId && running) {
            clock.start();
            animate();
          }
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    // Document visibility listener
    const handleVisibilityChange = () => {
      isDocVisible = !document.hidden;
      if (isDocVisible && isVisible && !rafId && running) {
        clock.start();
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      if (!running || !isVisible || !isDocVisible) {
        rafId = 0;
        return;
      }

      const dt = Math.min(clock.getDelta(), 0.1);
      const t = clock.elapsedTime;

      mouse.x += (mouseTarget.x - mouse.x) * 0.05;
      mouse.y += (mouseTarget.y - mouse.y) * 0.05;
      uniforms.uMouse.value.set(mouse.x, mouse.y);
      uniforms.uTime.value = t;

      for (let i = 0; i < 8; i++) {
        if (i < clickPulses.length) {
          clickPulses[i].t += dt * 0.6;
          uniforms.uPulses.value[i] = Math.min(clickPulses[i].t, 1.0);
          uniforms.uPulsePos.value[i].set(clickPulses[i].x, clickPulses[i].y);
        } else {
          uniforms.uPulses.value[i] = 0;
        }
      }
      clickPulses = clickPulses.filter((p) => p.t < 1.0);

      camera.position.x = -0.6 + Math.sin(t * 0.08) * 0.4 + mouse.x * 0.3;
      camera.position.y = 3.4 + Math.cos(t * 0.06) * 0.2;
      camera.lookAt(1.0 + mouse.x * 0.6, 0, -2.0);

      stars.rotation.y = t * 0.01;

      glitchTimer += dt;
      if (glitchTimer > 6 + Math.random() * 6) {
        glitchTimer = 0;
        glitchActive = 0.35 + Math.random() * 0.4;
      }
      if (glitchActive > 0) glitchActive = Math.max(0, glitchActive - dt * 1.2);
      compositeMat.uniforms.uGlitch.value = glitchActive;
      compositeMat.uniforms.uTime.value = t;

      // Pass 1: Render scene into rtScene
      renderer.setRenderTarget(rtScene);
      renderer.clear();
      renderer.render(scene, camera);

      // Pass 2: Bloom Horizontal
      renderer.setRenderTarget(rtBloom1);
      quadMesh.material = blurMatH;
      blurMatH.uniforms.tDiffuse.value = rtScene.texture;
      renderer.render(quadScene, quadCam);

      // Pass 3: Bloom Vertical
      renderer.setRenderTarget(rtBloom2);
      quadMesh.material = blurMatV;
      blurMatV.uniforms.tDiffuse.value = rtBloom1.texture;
      renderer.render(quadScene, quadCam);

      // Pass 4: Final Composite to Screen
      renderer.setRenderTarget(null);
      quadMesh.material = compositeMat;
      compositeMat.uniforms.tScene.value = rtScene.texture;
      compositeMat.uniforms.tBloom.value = rtBloom2.texture;
      renderer.render(quadScene, quadCam);

      rafId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);

      gridGeo.dispose();
      mat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      quadGeo.dispose();
      blurMatH.dispose();
      blurMatV.dispose();
      compositeMat.dispose();
      rtScene.dispose();
      rtBloom1.dispose();
      rtBloom2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}
