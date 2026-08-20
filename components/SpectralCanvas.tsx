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
  float elevation = (n1 + n2) * 0.55;

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
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColorBase;
uniform vec3 uColorPeak;
varying float vElevation;
varying vec2 vUv;
varying float vDist;

vec3 spectral(float t){
  t = clamp(t,0.0,1.0);
  vec3 c1 = vec3(0.40,0.85,0.95);
  vec3 c2 = vec3(0.75,0.55,0.98);
  vec3 c3 = vec3(0.98,0.65,0.55);
  vec3 a = mix(c1,c2, smoothstep(0.0,0.5,t));
  vec3 b = mix(c2,c3, smoothstep(0.5,1.0,t));
  return mix(a,b, step(0.5,t));
}

void main(){
  float fade = smoothstep(11.0, 2.0, vDist);
  float e = clamp(vElevation*0.6, 0.0, 1.0);
  vec3 base = mix(uColorBase, uColorPeak, e);
  float spec = sin(vDist*0.8 - uTime*0.6) * 0.5 + 0.5;
  vec3 spectralTint = spectral(spec) * smoothstep(0.15, 1.4, vElevation) * 0.5;
  vec3 color = base + spectralTint;
  float alpha = fade * (0.35 + e*0.65);
  gl_FragColor = vec4(color, alpha);
}
`;

const dotFragmentShader = `
uniform float uTime;
uniform vec3 uColorBase;
uniform vec3 uColorPeak;
varying float vElevation;
varying float vDist;
void main(){
  float fade = smoothstep(11.0,2.0,vDist);
  float e = clamp(vElevation*0.7,0.0,1.0);
  vec3 color = mix(uColorBase*1.4, uColorPeak, e);
  float alpha = fade * e * 0.9;
  if(alpha < 0.02) discard;
  gl_FragColor = vec4(color, alpha);
}
`;

const bloomVertex = `varying vec2 vUv; void main(){ vUv=uv; gl_Position = vec4(position.xy,0.0,1.0); }`;

const blurFragment = `
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
uniform sampler2D tScene; uniform sampler2D tBloom; uniform float uTime; uniform float uGlitch;
varying vec2 vUv;
float rand(vec2 c){ return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453); }
void main(){
  vec2 uv = vUv;
  float scan = sin(uv.y*800.0)*0.015;
  vec3 base;
  float glitchAmt = uGlitch;
  if(glitchAmt > 0.001){
    float sliceY = floor(uv.y*40.0);
    float sliceShift = (rand(vec2(sliceY, floor(uTime*8.0)))-0.5) * glitchAmt * 0.06;
    float r = texture2D(tScene, uv + vec2(sliceShift + glitchAmt*0.004,0.0)).r;
    float g = texture2D(tScene, uv + vec2(sliceShift,0.0)).g;
    float b = texture2D(tScene, uv + vec2(sliceShift - glitchAmt*0.004,0.0)).b;
    base = vec3(r,g,b);
  } else {
    base = texture2D(tScene, uv).rgb;
  }
  vec3 bloom = texture2D(tBloom, uv).rgb;
  vec3 color = base + bloom*1.4 - scan;
  vec2 vig = uv - 0.5;
  float vigAmt = 1.0 - dot(vig,vig)*0.55;
  color *= vigAmt;
  color = pow(color, vec3(0.92));
  gl_FragColor = vec4(color, 1.0);
}
`;

interface Pulse {
  x: number;
  y: number;
  t: number;
}

export default function SpectralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let W = canvas.clientWidth || window.innerWidth;
    let H = canvas.clientHeight || window.innerHeight;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(DPR);
    renderer.setSize(W, H, false);
    renderer.setClearColor(0x000000, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 3.4, 5.2);
    camera.lookAt(0, 0, -1.5);

    const mouse = new THREE.Vector2(0, 0);
    const mouseTarget = new THREE.Vector2(0, 0);
    let clickPulses: Pulse[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseTarget.x = Math.max(-1.5, Math.min(1.5, nx));
      mouseTarget.y = Math.max(-1.5, Math.min(1.5, ny));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvas || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      const nx = ((t.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((t.clientY - rect.top) / rect.height) * 2 - 1);
      mouseTarget.x = Math.max(-1.5, Math.min(1.5, nx));
      mouseTarget.y = Math.max(-1.5, Math.min(1.5, ny));
    };

    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      ) {
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        clickPulses.push({ x: nx, y: ny, t: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    const gridGeo = new THREE.PlaneGeometry(14, 22, 140, 200);
    gridGeo.rotateX(-Math.PI / 2);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorBase: { value: new THREE.Color(0x2a3038) },
      uColorPeak: { value: new THREE.Color(0xeaf1f4) },
      uPulses: { value: new Float32Array(8) },
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
    gridMesh.position.z = -3;
    scene.add(gridMesh);

    const dotGeo = new THREE.PlaneGeometry(14, 22, 140, 200);
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
    dotMesh.position.z = -3;
    scene.add(dotMesh);

    let rtScene = new THREE.WebGLRenderTarget(W * DPR, H * DPR, {
      type: THREE.HalfFloatType,
    });
    let rtBloom1 = new THREE.WebGLRenderTarget(
      W * DPR * 0.5,
      H * DPR * 0.5,
      { type: THREE.HalfFloatType }
    );
    let rtBloom2 = new THREE.WebGLRenderTarget(
      W * DPR * 0.5,
      H * DPR * 0.5,
      { type: THREE.HalfFloatType }
    );

    const quadScene = new THREE.Scene();
    const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quadGeo = new THREE.PlaneGeometry(2, 2);

    const blurMatH = new THREE.ShaderMaterial({
      vertexShader: bloomVertex,
      fragmentShader: blurFragment,
      uniforms: {
        tDiffuse: { value: null },
        uDir: { value: new THREE.Vector2(1, 0) },
        uRes: { value: new THREE.Vector2(W * DPR * 0.5, H * DPR * 0.5) },
      },
    });
    const blurMatV = new THREE.ShaderMaterial({
      vertexShader: bloomVertex,
      fragmentShader: blurFragment,
      uniforms: {
        tDiffuse: { value: null },
        uDir: { value: new THREE.Vector2(0, 1) },
        uRes: { value: new THREE.Vector2(W * DPR * 0.5, H * DPR * 0.5) },
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
      },
    });

    const quadMesh = new THREE.Mesh(quadGeo, blurMatH);
    quadScene.add(quadMesh);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 400;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 30;
      starPos[i * 3 + 1] = Math.random() * 10 + 1;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    let glitchTimer = 0;
    let glitchActive = 0;
    const clock = new THREE.Clock();
    let rafId = 0;

    const resize = () => {
      if (!canvas) return;
      W = canvas.clientWidth || window.innerWidth;
      H = canvas.clientHeight || window.innerHeight;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      rtScene.setSize(W * DPR, H * DPR);
      rtBloom1.setSize(W * DPR * 0.5, H * DPR * 0.5);
      rtBloom2.setSize(W * DPR * 0.5, H * DPR * 0.5);
      blurMatH.uniforms.uRes.value.set(W * DPR * 0.5, H * DPR * 0.5);
      blurMatV.uniforms.uRes.value.set(W * DPR * 0.5, H * DPR * 0.5);
    };

    window.addEventListener('resize', resize);

    const animate = () => {
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

      camera.position.x = Math.sin(t * 0.08) * 0.6 + mouse.x * 0.4;
      camera.position.y = 3.4 + Math.cos(t * 0.06) * 0.2;
      camera.lookAt(mouse.x * 0.8, 0, -2.5);

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

      // Pass 4: Bloom Horizontal (second pass)
      renderer.setRenderTarget(rtBloom1);
      quadMesh.material = blurMatH;
      blurMatH.uniforms.tDiffuse.value = rtBloom2.texture;
      renderer.render(quadScene, quadCam);

      // Pass 5: Bloom Vertical (second pass)
      renderer.setRenderTarget(rtBloom2);
      quadMesh.material = blurMatV;
      blurMatV.uniforms.tDiffuse.value = rtBloom1.texture;
      renderer.render(quadScene, quadCam);

      // Pass 6: Final Composite to Screen
      renderer.setRenderTarget(null);
      quadMesh.material = compositeMat;
      compositeMat.uniforms.tScene.value = rtScene.texture;
      compositeMat.uniforms.tBloom.value = rtBloom2.texture;
      renderer.render(quadScene, quadCam);

      rafId = requestAnimationFrame(animate);
    };

    resize();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
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
      }}
    />
  );
}
