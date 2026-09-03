'use client';

import React, { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default function GlobalOperationsGlobe() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartRef.current;
    if (!container) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    // Create root element
    const root = am5.Root.new(container);

    // Remove amCharts logo/credit
    if (root._logo) {
      root._logo.dispose();
    }

    // Set themes
    const coffeeTheme = am5.Theme.new(root);
    coffeeTheme.rule('InterfaceColors').setAll({
      primaryButton: am5.color(0x8b5e3c),
      primaryButtonHover: am5.color(0x5c3a1e),
      primaryButtonDown: am5.color(0x3c1e0e),
      primaryButtonActive: am5.color(0xc4956a),
      primaryButtonText: am5.color(0xf5ece0),
      secondaryButton: am5.color(0xe8d5b7),
      secondaryButtonHover: am5.color(0xd4c4a8),
      secondaryButtonDown: am5.color(0xc4956a),
      secondaryButtonText: am5.color(0x3c1e0e),
      background: am5.color(0xe8d5b7),
      text: am5.color(0x3c1e0e),
    });

    root.setThemes([am5themes_Animated.new(root), coffeeTheme]);

    if (root._logo) {
      root._logo.dispose();
    }

    // Coffee & Gold palette
    const espresso = am5.color(0x3c1e0e);
    const darkRoast = am5.color(0x5c3a1e);
    const mediumRoast = am5.color(0x8b5e3c);
    const goldenBrown = am5.color(0x9c6d42); // Golden brown replacing green
    const lightRoast = am5.color(0xc4956a);
    const crema = am5.color(0xe8d5b7);
    const cream = am5.color(0xf5ece0);

    // India (Pune) target coordinates: rotationX = -75, rotationY = -20
    const INDIA_ROT_X = -75;
    const INDIA_ROT_Y = -20;

    // Create the map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: isMobile ? 'none' : 'rotateY',
        wheelX: 'none',
        wheelY: 'none',
        pinchZoom: false,
        projection: am5map.geoOrthographic(),
        rotationX: INDIA_ROT_X,
        rotationY: INDIA_ROT_Y,
        minZoomLevel: 0.5,
        maxZoomLevel: 16,
        zoomLevel: isMobile ? 0.82 : 0.9,
      })
    );

    // Trackpad pinch-to-zoom handler (browser fires wheel with ctrlKey=true during pinch gestures on trackpads)
    const handleTrackpadPinch = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const currentZoom = chart.get('zoomLevel', 1);
        const factor = e.deltaY < 0 ? 1.05 : 0.95;
        const newZoom = Math.max(
          chart.get('minZoomLevel', 0.5),
          Math.min(chart.get('maxZoomLevel', 16), currentZoom * factor)
        );
        chart.set('zoomLevel', newZoom);
      }
    };
    container.addEventListener('wheel', handleTrackpadPinch, { passive: false });

    // Create series for globe sphere background fill (soft ocean tint)
    const bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    bgSeries.mapPolygons.template.setAll({
      fill: am5.color(0xebe0ce),
      fillOpacity: 0.55,
      strokeOpacity: 0,
    });
    bgSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    // Create graticule series
    const graticuleSeries = chart.series.push(
      am5map.GraticuleSeries.new(root, {})
    );
    graticuleSeries.mapLines.template.setAll({
      stroke: mediumRoast,
      strokeOpacity: 0.15,
      strokeWidth: 0.5,
    });

    // Create main polygon series for countries
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );
    polygonSeries.mapPolygons.template.setAll({
      fill: cream,
      stroke: lightRoast,
      strokeWidth: 0.5,
      strokeOpacity: 0.5,
    });

    // Highlight producer (origins), hub, and consumer countries
    // Australia replaces Brazil as origin; India (Pune) replaces Germany as primary hub
    const producerIds = ['AU', 'VN', 'CO', 'ET', 'ID', 'HN'];
    const hubIds = ['IN', 'BE', 'IT', 'US'];
    const consumerIds = [
      'FR',
      'PL',
      'SE',
      'RU',
      'GB',
      'NL',
      'GR',
      'AT',
      'CA',
      'JP',
      'DE',
    ];

    polygonSeries.events.on('datavalidated', function () {
      am5.array.each(polygonSeries.dataItems, function (di) {
        const id = di.get('id');
        if (id && producerIds.includes(id as string)) {
          di.get('mapPolygon')?.setAll({ fill: goldenBrown });
        } else if (id && hubIds.includes(id as string)) {
          di.get('mapPolygon')?.setAll({ fill: am5.color(0xc4956a) });
        } else if (id && consumerIds.includes(id as string)) {
          di.get('mapPolygon')?.setAll({ fill: am5.color(0xddc8a0) });
        }
      });
    });

    // Create Map Sankey series
    const sankeySeries = chart.series.push(
      am5map.MapSankeySeries.new(root, {
        polygonSeries: polygonSeries,
        maxWidth: 2,
        controlPointDistance: 0.4,
        resolution: 60,
        nodePadding: 0.3,
      })
    );

    sankeySeries.mapPolygons.template.setAll({
      fill: mediumRoast,
      fillOpacity: 0.65,
      strokeOpacity: 0,
      tooltipText: '{sourceNode.name} > {targetNode.name}\n{value}k units',
    });

    sankeySeries.nodes.mapPolygons.template.setAll({
      fill: espresso,
      stroke: crema,
      strokeWidth: 1.5,
      fillOpacity: 0.95,
      strokeOpacity: 1,
      tooltipText: '{name}\n{sum}k units',
    });

    // Add animated bullet markers
    sankeySeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX: 0,
        autoRotate: true,
        sprite: am5.Graphics.new(root, {
          svgPath:
            'M-4,-2.5 C-4,-5 -1.5,-6.5 1,-6.5 C3.5,-6.5 5,-4.5 5,-2 C5,1 3,3.5 0.5,5 C-0.5,5.7 -1.5,5.7 -2.5,5 C-5,3.5 -6,1 -4,-2.5 Z M-1,-5 C-1,-1 -1,2 -0.5,4.5',
          fill: espresso,
          stroke: darkRoast,
          strokeWidth: 0.5,
          centerX: am5.p50,
          centerY: am5.p50,
          scale: 0.35,
          visible: false,
        }),
      });
    });

    // Origins > Hubs (India as central hub, Australia as origin) > Markets
    sankeySeries.data.setAll([
      // Origins > Hubs
      { sourceId: 'AU', targetId: 'IN', value: 350 },
      { sourceId: 'AU', targetId: 'US', value: 450 },
      { sourceId: 'AU', targetId: 'IT', value: 200 },
      { sourceId: 'VN', targetId: 'IN', value: 200 },
      { sourceId: 'VN', targetId: 'BE', value: 150 },
      { sourceId: 'CO', targetId: 'US', value: 250 },
      { sourceId: 'CO', targetId: 'IN', value: 80 },
      { sourceId: 'ET', targetId: 'IN', value: 60 },
      { sourceId: 'ET', targetId: 'BE', value: 40 },
      { sourceId: 'ID', targetId: 'US', value: 80 },
      { sourceId: 'HN', targetId: 'IN', value: 60 },
      { sourceId: 'HN', targetId: 'BE', value: 40 },

      // Hubs > Destinations / Markets
      { sourceId: 'IN', targetId: 'FR', value: 150 },
      { sourceId: 'IN', targetId: 'PL', value: 100 },
      { sourceId: 'IN', targetId: 'SE', value: 80 },
      { sourceId: 'IN', targetId: 'RU', value: 120 },
      { sourceId: 'IN', targetId: 'DE', value: 140 },
      { sourceId: 'BE', targetId: 'GB', value: 100 },
      { sourceId: 'BE', targetId: 'NL', value: 80 },
      { sourceId: 'IT', targetId: 'GR', value: 50 },
      { sourceId: 'IT', targetId: 'AT', value: 40 },
      { sourceId: 'US', targetId: 'CA', value: 120 },
      { sourceId: 'US', targetId: 'JP', value: 80 },
    ]);

    // Set country names on auto-created nodes and animate bullets
    const countryNames: Record<string, string> = {
      AU: 'Australia',
      VN: 'Vietnam',
      CO: 'Colombia',
      ET: 'Ethiopia',
      ID: 'Indonesia',
      HN: 'Honduras',
      IN: 'Pune · India',
      BE: 'Belgium',
      IT: 'Italy',
      US: 'United States',
      FR: 'France',
      PL: 'Poland',
      SE: 'Sweden',
      RU: 'Russia',
      GB: 'United Kingdom',
      NL: 'Netherlands',
      GR: 'Greece',
      AT: 'Austria',
      CA: 'Canada',
      JP: 'Japan',
      DE: 'Germany',
    };

    sankeySeries.events.on('datavalidated', function () {
      am5.array.each(sankeySeries.nodes.dataItems, function (di) {
        const id = di.get('id');
        if (id && countryNames[id as string]) {
          di.set('name', countryNames[id as string]);
        }
      });

      am5.array.each(sankeySeries.dataItems, function (dataItem) {
        const bullets = dataItem.bullets;
        if (bullets) {
          am5.array.each(bullets, function (bullet) {
            const randomDur = 3000 + Math.random() * 3000;
            const delay = Math.random() * randomDur;
            setTimeout(function () {
              const sprite = bullet.get('sprite');
              if (sprite) sprite.set('visible', true);
              bullet.animate({
                key: 'locationX',
                from: 0,
                to: 1,
                duration: randomDur,
                easing: am5.ease.linear,
                loops: Infinity,
              });
            }, delay);
          });
        }
      });
    });

    // Add title and subtitle
    const titleCont = chart.children.push(
      am5.Container.new(root, {
        layout: root.verticalLayout,
        x: am5.p50,
        centerX: am5.p50,
        y: am5.p100,
        centerY: am5.p100,
        position: 'absolute',
        paddingBottom: 16,
      })
    );

    // titleCont.children.push(
    //   am5.Label.new(root, {
    //     text: '(Global Deployments · HQ: Pune, India)',
    //     fontSize: 11,
    //     fill: mediumRoast,
    //     x: am5.p50,
    //     centerX: am5.p50,
    //   })
    // );

    // Add Globe / Map projection toggle
    const switchCont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 20,
      })
    );

    switchCont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: 'Globe',
        fill: espresso,
        fontSize: 13,
      })
    );

    const switchButton = switchCont.children.push(
      am5.Button.new(root, {
        themeTags: ['switch'],
        centerY: am5.p50,
        icon: am5.Circle.new(root, {
          themeTags: ['icon'],
        }),
      })
    );

    const easing = am5.ease.inOut(am5.ease.cubic);
    const duration = 1500;
    const fadeDuration = 300;

    // ═══════════════════════════════════════════════════════════
    // Physics-based Momentum Spin & Auto-Return to India Animation
    // ═══════════════════════════════════════════════════════════
    let isDragging = false;
    let isTouchDrag = false;
    let isTouchScroll = false;
    let startPointerX = 0;
    let startPointerY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let lastPointerTime = 0;
    let velocityX = 0; // degrees per frame
    let velocityY = 0;
    let inertiaRafId: number | null = null;
    let returnTimeoutId: NodeJS.Timeout | null = null;
    let ambientAnimation: ReturnType<typeof chart.animate> | null = null;
    let returnAnimX: ReturnType<typeof chart.animate> | null = null;
    let returnAnimY: ReturnType<typeof chart.animate> | null = null;

    function stopAllAnimations() {
      if (ambientAnimation) {
        ambientAnimation.stop();
        ambientAnimation = null;
      }
      if (returnAnimX) {
        returnAnimX.stop();
        returnAnimX = null;
      }
      if (returnAnimY) {
        returnAnimY.stop();
        returnAnimY = null;
      }
      if (inertiaRafId) {
        cancelAnimationFrame(inertiaRafId);
        inertiaRafId = null;
      }
      if (returnTimeoutId) {
        clearTimeout(returnTimeoutId);
        returnTimeoutId = null;
      }
    }

    function startAmbientRotation() {
      if (switchButton.get('active')) return;
      stopAllAnimations();
      const currentRotX = chart.get('rotationX', INDIA_ROT_X);
      ambientAnimation = chart.animate({
        key: 'rotationX',
        from: currentRotX,
        to: currentRotX + 360,
        duration: 90000,
        loops: Infinity,
        easing: am5.ease.linear,
      });
    }

    function scheduleReturnToIndia(delayMs = 2000) {
      if (switchButton.get('active')) return;
      if (returnTimeoutId) clearTimeout(returnTimeoutId);

      returnTimeoutId = setTimeout(() => {
        if (isDragging || switchButton.get('active')) return;

        const currentRotX = chart.get('rotationX', INDIA_ROT_X);
        const currentRotY = chart.get('rotationY', INDIA_ROT_Y);

        // Find the shortest angular path to face India (-75 degrees)
        const diff = (((currentRotX - INDIA_ROT_X) % 360) + 540) % 360 - 180;
        const targetRotX = currentRotX - diff;
        const targetRotY = INDIA_ROT_Y;

        stopAllAnimations();

        const returnDuration = 2000;
        const returnEasing = am5.ease.inOut(am5.ease.cubic);

        returnAnimY = chart.animate({
          key: 'rotationY',
          to: targetRotY,
          duration: returnDuration,
          easing: returnEasing,
        });

        returnAnimX = chart.animate({
          key: 'rotationX',
          to: targetRotX,
          duration: returnDuration,
          easing: returnEasing,
        });

        returnTimeoutId = setTimeout(() => {
          startAmbientRotation();
        }, returnDuration + 80);
      }, delayMs);
    }

    function startInertia() {
      stopAllAnimations();

      // If user released with almost no speed, schedule return directly
      if (Math.abs(velocityX) < 0.08 && Math.abs(velocityY) * 0.6 < 0.08) {
        scheduleReturnToIndia(1800);
        return;
      }

      const friction = 0.962; // Smooth physical glide deceleration

      function step() {
        if (isDragging || switchButton.get('active')) return;

        velocityX *= friction;
        velocityY *= friction;

        let currentRotX = chart.get('rotationX', INDIA_ROT_X) + velocityX;
        let currentRotY = chart.get('rotationY', INDIA_ROT_Y) + velocityY;

        // Keep latitude within safe bounds so globe does not flip
        currentRotY = Math.max(-60, Math.min(60, currentRotY));

        chart.set('rotationX', currentRotX);
        chart.set('rotationY', currentRotY);

        if (Math.abs(velocityX) > 0.04 || Math.abs(velocityY) > 0.04) {
          inertiaRafId = requestAnimationFrame(step);
        } else {
          inertiaRafId = null;
          scheduleReturnToIndia(1800);
        }
      }

      inertiaRafId = requestAnimationFrame(step);
    }

    // Pointer event listeners on container for direct free spinning
    const onPointerDown = (e: PointerEvent) => {
      if (switchButton.get('active')) return;
      isDragging = true;
      isTouchDrag = false;
      isTouchScroll = false;
      startPointerX = e.clientX;
      startPointerY = e.clientY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastPointerTime = performance.now();
      velocityX = 0;
      velocityY = 0;

      if (e.pointerType !== 'touch') {
        stopAllAnimations();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || switchButton.get('active')) return;
      if (isTouchScroll) return;

      const now = performance.now();
      const dt = now - lastPointerTime;
      const totalDx = e.clientX - startPointerX;
      const totalDy = e.clientY - startPointerY;

      if (e.pointerType === 'touch' && !isTouchDrag) {
        // If vertical swipe dominates, release drag to let native page scroll happen
        if (Math.abs(totalDy) > Math.abs(totalDx) && Math.abs(totalDy) > 6) {
          isTouchScroll = true;
          isDragging = false;
          return;
        }
        // If horizontal swipe dominates, take over horizontal globe spin
        if (Math.abs(totalDx) > Math.abs(totalDy) && Math.abs(totalDx) > 6) {
          isTouchDrag = true;
          stopAllAnimations();
        } else {
          return;
        }
      }

      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;

      if (dt > 0 && dt < 120) {
        // Compute angular velocity per frame based on drag displacement
        const speedFactor = 0.35;
        const vx = (dx / dt) * 16 * speedFactor;
        const vy = -(dy / dt) * 16 * speedFactor;
        velocityX = velocityX * 0.35 + vx * 0.65;
        velocityY = e.pointerType === 'touch' ? 0 : velocityY * 0.35 + vy * 0.65;
      }

      if (e.pointerType === 'touch') {
        // Immediate smooth response for touch
        const currentRotX = chart.get('rotationX', INDIA_ROT_X) + dx * 0.45;
        chart.set('rotationX', currentRotX);
      }

      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastPointerTime = now;
    };

    const onPointerUp = () => {
      if (!isDragging && !isTouchDrag) {
        isDragging = false;
        isTouchScroll = false;
        return;
      }
      isDragging = false;
      const timeSinceMove = performance.now() - lastPointerTime;
      if (timeSinceMove > 90) {
        velocityX = 0;
        velocityY = 0;
      }
      if (!isTouchScroll) {
        startInertia();
      } else {
        scheduleReturnToIndia(1800);
      }
      isTouchDrag = false;
      isTouchScroll = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    function zoomToGlobe() {
      stopAllAnimations();
      const isMobileView = typeof window !== 'undefined' && window.innerWidth <= 768;
      chart.set('projection', am5map.geoOrthographic());
      chart.set('panX', 'rotateX');
      chart.set('panY', isMobileView ? 'none' : 'rotateY');
      chart.animate({
        key: 'rotationX',
        to: INDIA_ROT_X,
        duration: duration,
        easing: easing,
      });
      chart.animate({
        key: 'rotationY',
        to: INDIA_ROT_Y,
        duration: duration,
        easing: easing,
      });
      bgSeries.mapPolygons.template.set('fillOpacity', 0.55);
      chart.set('minZoomLevel', 0.5);
      chart.animate({
        key: 'zoomLevel',
        to: isMobileView ? 0.82 : 0.9,
        duration: duration,
        easing: easing,
      });
      setTimeout(() => {
        startAmbientRotation();
      }, duration + 100);
    }

    function zoomToMap() {
      stopAllAnimations();
      const isMobileView = typeof window !== 'undefined' && window.innerWidth <= 768;
      chart.set('projection', am5map.geoMercator());
      chart.set('panX', 'translateX');
      chart.set('panY', 'translateY');
      chart.animate({
        key: 'rotationX',
        to: 0,
        duration: duration,
        easing: easing,
      });
      chart.animate({
        key: 'rotationY',
        to: 0,
        duration: duration,
        easing: easing,
      });
      bgSeries.mapPolygons.template.set('fillOpacity', 0);
      chart.set('minZoomLevel', 1);
      chart.animate({
        key: 'zoomLevel',
        to: isMobileView ? 1.2 : 1.7,
        duration: duration,
        easing: easing,
      });
    }

    switchButton.on('active', function () {
      chart.goHome(duration);
      // Fade out before projection switch
      setTimeout(function () {
        chart.seriesContainer.animate({
          key: 'opacity',
          to: 0,
          duration: fadeDuration,
        });
      }, duration - fadeDuration);
      setTimeout(function () {
        if (switchButton.get('active')) {
          zoomToMap();
        } else {
          zoomToGlobe();
        }
        // Fade in after projection switch
        chart.seriesContainer.animate({
          key: 'opacity',
          to: 1,
          duration: fadeDuration,
        });
      }, duration);
    });

    switchCont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: 'Map',
        fill: espresso,
        fontSize: 13,
      })
    );

    // Initial appearance animation
    chart.appear(1000, 100);
    startAmbientRotation();

    return () => {
      stopAllAnimations();
      container.removeEventListener('wheel', handleTrackpadPinch);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      root.dispose();
    };
  }, []);

  return (
    <div className="globe-wrapper">
      <div ref={chartRef} id="chartdiv" />
      <style jsx global>{`
        .globe-wrapper {
          width: 100%;
          max-width: 1120px;
          margin: 24px auto 0;
          background: transparent;
        }
        #chartdiv {
          width: 100%;
          height: 75vh;
          min-height: 520px;
          max-height: 780px;
          background: transparent;
          cursor: grab;
          touch-action: pan-y;
        }
        @media (max-width: 768px) {
          .globe-wrapper {
            margin: 12px auto 0;
          }
          #chartdiv {
            height: clamp(320px, 48vh, 400px);
            min-height: 320px;
            max-height: 400px;
            touch-action: pan-y !important;
          }
        }
        #chartdiv a[href*="amcharts"],
        #chartdiv [aria-label*="amCharts"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
      `}</style>
    </div>
  );
}
