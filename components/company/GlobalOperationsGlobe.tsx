'use client';

import React, { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default function GlobalOperationsGlobe() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Create root element
    const root = am5.Root.new(chartRef.current);

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

    // Grainy paper background
    root.container.set(
      'background',
      am5.Rectangle.new(root, {
        fill: am5.color(0xf0e6d6),
        fillPattern: am5.GrainPattern.new(root, {
          density: 0.4,
          maxOpacity: 0.07,
          colors: [am5.color(0x000000)],
        }),
      })
    );

    // Coffee palette
    const espresso = am5.color(0x3c1e0e);
    const darkRoast = am5.color(0x5c3a1e);
    const mediumRoast = am5.color(0x8b5e3c);
    const lightRoast = am5.color(0xc4956a);
    const crema = am5.color(0xe8d5b7);
    const cream = am5.color(0xf5ece0);

    // Create the map chart
    // Centering on India (Pune): longitude ~74°E, latitude ~19°N -> rotationX: -75, rotationY: -20
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        projection: am5map.geoOrthographic(),
        rotationX: -75,
        rotationY: -20,
        minZoomLevel: 0.5,
        zoomLevel: 0.9,
      })
    );

    // Create series for background fill
    const bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    bgSeries.mapPolygons.template.setAll({
      fill: am5.color(0xede4d4),
      fillOpacity: 1,
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
          di.get('mapPolygon')?.setAll({ fill: am5.color(0x8fae7e) });
        } else if (id && hubIds.includes(id as string)) {
          di.get('mapPolygon')?.setAll({ fill: am5.color(0xc4a878) });
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

    // Add animated coffee bean / particle bullets
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

    titleCont.children.push(
      am5.Label.new(root, {
        text: 'Global Operations & Enterprise Fabric',
        fontSize: 18,
        fontWeight: '600',
        fill: espresso,
        x: am5.p50,
        centerX: am5.p50,
      })
    );

    titleCont.children.push(
      am5.Label.new(root, {
        text: '(Global Deployments · HQ: Pune, India)',
        fontSize: 11,
        fill: mediumRoast,
        x: am5.p50,
        centerX: am5.p50,
      })
    );

    // Add Globe / Map projection toggle
    const switchCont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40,
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

    function zoomToGlobe() {
      chart.set('projection', am5map.geoOrthographic());
      chart.set('panX', 'rotateX');
      chart.set('panY', 'rotateY');
      chart.animate({
        key: 'rotationX',
        to: -75,
        duration: duration,
        easing: easing,
      });
      chart.animate({
        key: 'rotationY',
        to: -20,
        duration: duration,
        easing: easing,
      });
      bgSeries.mapPolygons.template.set('fillOpacity', 1);
      chart.set('minZoomLevel', 0.9);
      chart.animate({
        key: 'zoomLevel',
        to: 0.9,
        duration: duration,
        easing: easing,
      });
    }

    function zoomToMap() {
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
        to: 1.7,
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

    // Add zoom controls
    const zoomControl = chart.set(
      'zoomControl',
      am5map.ZoomControl.new(root, {})
    );
    zoomControl.homeButton.set('visible', true);

    // Auto-rotate globe until user interaction
    let rotationAnimation: ReturnType<typeof chart.animate> | null = chart.animate({
      key: 'rotationX',
      from: -75,
      to: -75 + 360,
      duration: 120000,
      loops: Infinity,
      easing: am5.ease.linear,
    });

    chart.chartContainer.events.on('pointerdown', function () {
      if (rotationAnimation) {
        rotationAnimation.stop();
        rotationAnimation = null;
      }
    });

    // Initial appearance animation
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1080,
        margin: '36px auto 0',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow:
          '0 20px 45px -10px rgba(60, 30, 14, 0.12), 0 0 0 1px rgba(139, 94, 60, 0.15)',
        background: '#f0e6d6',
      }}
    >
      <div
        ref={chartRef}
        id="chartdiv"
        style={{
          width: '100%',
          height: '75vh',
          minHeight: 520,
          maxHeight: 780,
        }}
      />
    </div>
  );
}
