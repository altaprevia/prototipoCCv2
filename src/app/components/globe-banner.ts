import { Component, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-globe-banner',
  standalone: true,
  template: `
    <div #container></div>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    :host div {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
    }
    :host div canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
    }
  `]
})
export class GlobeBannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: false }) container!: ElementRef;
  @Output() animationComplete = new EventEmitter<void>();
  @Input() skipAnimation: boolean = false;

  private renderer: any;
  private scene: any;
  private camera: any;
  private earthGroup: any;
  private animFrameId: number = 0;
  private resizeHandler: (() => void) | null = null;
  private introCompleted = false;
  private pointObjects: any[] = [];
  private arcObjects: any[] = [];

  ngAfterViewInit() {
    setTimeout(() => this.init(), 100);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animFrameId);
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private init() {
    const containerEl = this.container.nativeElement;
    if (!containerEl) return;
    this.buildScene(containerEl, window.innerWidth, window.innerHeight);
  }

  private buildScene(containerEl: HTMLElement, width: number, height: number) {
    const R = 100;
    const isMobile = window.innerWidth < 768;

    function latLngToVec3(lat: number, lng: number, radius: number) {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lng + 180) * Math.PI / 180;
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function slowStartEasing(t: number) {
      return 1 - Math.pow(1 - t, 4);
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    this.scene = new THREE.Scene();

    const aspect = width / height;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 2000);
    this.camera.position.set(40, -20, 280);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xffffff, 1);
    containerEl.appendChild(this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(500, 200, 500);
    this.scene.add(dirLight);

    const loader = new THREE.TextureLoader();

    this.earthGroup = new THREE.Group();
    this.earthGroup.position.set(-150, -80, 0);
    this.earthGroup.rotation.x = -0.4;
    this.earthGroup.rotation.z = 0.15;
    this.earthGroup.rotation.y = 0.15;
    this.scene.add(this.earthGroup);

    const introDuration = 4500;
    const startTime = performance.now();

    const finalEarthPos = isMobile
      ? { x: 0, y: 10, z: 0 }
      : { x: -150, y: -80, z: 0 };
    const finalEarthRot = { x: -0.4, y: 0.15, z: 0.15 };
    const finalScale = isMobile ? 0.55 : 1;

    const introEarthPos = { x: 0, y: -150, z: 0 };
    const centerEarthPos = { x: 0, y: 0, z: 0 };

    const earthGeo = new THREE.SphereGeometry(R, 256, 256);
    const earthMat = new THREE.MeshPhongMaterial({
      map: loader.load('https://threejs.org/examples/textures/planets/earth_lights_2048.png'),
      normalMap: loader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg'),
      normalScale: new THREE.Vector2(0.5, 0.5),
      specular: new THREE.Color(0x111111),
      shininess: 5,
      emissive: new THREE.Color(0x111111),
      emissiveIntensity: 0.3
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    this.earthGroup.add(earth);

    // Grid lines (latitude/longitude)
    const gridColor = 0x336699;
    const gridOpacity = 0.25;
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 2) {
        pts.push(latLngToVec3(lat, lng - 180, R * 1.002));
      }
      const gridGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const gridMat = new THREE.LineBasicMaterial({ color: gridColor, transparent: true, opacity: gridOpacity });
      this.earthGroup.add(new THREE.Line(gridGeo, gridMat));
    }
    for (let lng = -180; lng < 180; lng += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 2) {
        pts.push(latLngToVec3(lat, lng, R * 1.002));
      }
      const gridGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const gridMat = new THREE.LineBasicMaterial({ color: gridColor, transparent: true, opacity: gridOpacity });
      this.earthGroup.add(new THREE.Line(gridGeo, gridMat));
    }

    const atmosGeo = new THREE.SphereGeometry(R * 1.06, 128, 128);
    const atmosMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.NormalBlending,
      depthWrite: false,
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(0.3, 0.6, 1.0, intensity * 0.35);
        }
      `
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    this.earthGroup.add(atmosphere);

    loader.load('https://unpkg.com/three-globe@2.45.2/example/clouds/clouds.png', (tex: any) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(R * 1.015, 75, 75),
        new THREE.MeshPhongMaterial({ map: tex, transparent: true, opacity: 0.5 })
      );
      clouds.userData['isClouds'] = true;
      this.earthGroup.add(clouds);
    });

    const starCanvas = document.createElement('canvas');
    starCanvas.width = 64; starCanvas.height = 64;
    const sctx = starCanvas.getContext('2d')!;
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 100, 200, 1)');
    grad.addColorStop(0.15, 'rgba(255, 50, 150, 1)');
    grad.addColorStop(0.4, 'rgba(255, 50, 150, 0.5)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 64, 64);
    const pointTex = new THREE.CanvasTexture(starCanvas);

    function getRandomWeather() {
      const temp = Math.floor(Math.random() * 25) + 10;
      const humidity = Math.floor(Math.random() * 40) + 50;
      const conditions = ['☀️', '⛅', '☁️', '🌧️', '⛈️'];
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      return { temp, humidity, condition };
    }

    const cities = [
      { name: "Bogotá", lat: 4.6097, lng: -74.0817 },
      { name: "Medellín", lat: 6.2442, lng: -75.5812 },
      { name: "Cali", lat: 3.4516, lng: -76.5320 },
      { name: "Barranquilla", lat: 10.9685, lng: -74.7813 },
      { name: "Cartagena", lat: 10.3910, lng: -75.5144 },
      { name: "Bucaramanga", lat: 7.1193, lng: -73.1227 },
      { name: "Pereira", lat: 4.8133, lng: -75.6961 },
      { name: "Lima", lat: -12.0464, lng: -77.0428 },
      { name: "Arequipa", lat: -16.4090, lng: -71.5375 },
      { name: "Trujillo", lat: -8.1116, lng: -79.0288 },
      { name: "Chiclayo", lat: -6.7714, lng: -80.6549 },
      { name: "Cusco", lat: -13.5319, lng: -71.9675 },
      { name: "Iquitos", lat: -3.7437, lng: -73.2516 },
      { name: "Piura", lat: -5.1783, lng: -80.6549 },
      { name: "Huancayo", lat: -12.0653, lng: -75.2049 },
      { name: "Quito", lat: -1.2921, lng: -78.5042 },
      { name: "Caracas", lat: 10.4806, lng: -66.9036 },
      { name: "Santiago", lat: -33.4489, lng: -70.6693 },
      { name: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
      { name: "Río", lat: -22.9068, lng: -43.1729 },
      { name: "São Paulo", lat: -23.5505, lng: -46.6333 },
      { name: "México", lat: 19.4326, lng: -99.1332 },
      { name: "New York", lat: 40.7128, lng: -74.0060 },
      { name: "London", lat: 51.5074, lng: -0.1278 },
      { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
      { name: "Shanghai", lat: 31.2304, lng: 121.4737 }
    ];

    const pointsData = cities.map(city => {
      const weather = getRandomWeather();
      return {
        lat: city.lat,
        lng: city.lng,
        name: city.name,
        temp: weather.temp,
        humidity: weather.humidity,
        condition: weather.condition
      };
    });

    this.pointObjects = [];
    pointsData.forEach(d => {
      const pos = latLngToVec3(d.lat, d.lng, R * 1.01);
      const baseSize = 3.0 + Math.random() * 2.0;

      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: pointTex,
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthTest: false
      }));
      sprite.scale.set(baseSize, baseSize, 1);
      sprite.position.copy(pos);
      this.earthGroup.add(sprite);

      const ringGeo = new THREE.RingGeometry(1.0, 1.4, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending,
        depthTest: false
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      this.earthGroup.add(ring);

      this.pointObjects.push({ data: d, sprite, ring, baseSize });
    });

    let currentRingIndex = 0;
    const triggerNextRing = () => {
      const p = this.pointObjects[currentRingIndex];
      p.ring.material.opacity = 0.8;
      p.ring.scale.set(1, 1, 1);
      const expandRing = () => {
        if (p.ring.scale.x < 4) {
          p.ring.scale.setScalar(p.ring.scale.x + 0.15);
          p.ring.material.opacity -= 0.03;
          requestAnimationFrame(expandRing);
        } else {
          p.ring.material.opacity = 0;
          p.ring.scale.set(1, 1, 1);
        }
      };
      expandRing();
      currentRingIndex = (currentRingIndex + 1) % this.pointObjects.length;
    };
    setInterval(triggerNextRing, 400);

    const bogota = pointsData[0];
    this.arcObjects = [];
    pointsData.filter(p => p !== bogota).forEach(target => {
      const start = latLngToVec3(bogota.lat, bogota.lng, R);
      const end = latLngToVec3(target.lat, target.lng, R);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(R + dist * 0.3);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const fullPoints = curve.getPoints(120);

      const geo = new THREE.BufferGeometry().setFromPoints(fullPoints);
      const mat = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
        linewidth: 2
      });
      const line = new THREE.Line(geo, mat);
      this.earthGroup.add(line);

      this.arcObjects.push({
        line,
        fullPoints,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004
      });
    });

    fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(countries => {
        const colombia = countries.features.filter((d: any) => d.properties.ADMIN === 'Colombia');
        colombia.forEach((feature: any) => {
          const coords = feature.geometry.type === 'MultiPolygon'
            ? feature.geometry.coordinates.flat()
            : feature.geometry.coordinates;
          coords.forEach((ring: any[]) => {
            const pts = ring.map(c => latLngToVec3(c[1], c[0], R * 1.005));
            const geo = new THREE.BufferGeometry().setFromPoints(pts);
            const mat = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.9 });
            const line = new THREE.Line(geo, mat);
            this.earthGroup.add(line);
          });
        });

        const peru = countries.features.filter((d: any) => d.properties.ADMIN === 'Peru');
        peru.forEach((feature: any) => {
          const coords = feature.geometry.type === 'MultiPolygon'
            ? feature.geometry.coordinates.flat()
            : feature.geometry.coordinates;
          coords.forEach((ring: any[]) => {
            const pts = ring.map(c => latLngToVec3(c[1], c[0], R * 1.005));
            const geo = new THREE.BufferGeometry().setFromPoints(pts);
            const mat = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.8, transparent: true, opacity: 0.9 });
            const points = new THREE.Points(geo, mat);
            this.earthGroup.add(points);
          });
        });
      });

    const animate = () => {
      this.animFrameId = requestAnimationFrame(animate);

      const elapsed = performance.now() - startTime;

      if (!this.introCompleted) {
        const progress = Math.min(elapsed / introDuration, 1);

        const holdDuration = 0.6;
        const transitionStart = holdDuration;
        const transitionEnd = 1.0;

        if (progress < holdDuration) {
          const p = progress / holdDuration;
          const e = easeInOutCubic(p);

          this.earthGroup.position.x = lerp(introEarthPos.x, centerEarthPos.x, e);
          this.earthGroup.position.y = lerp(introEarthPos.y, centerEarthPos.y, e);
          this.earthGroup.position.z = lerp(introEarthPos.z, centerEarthPos.z, e);

          this.earthGroup.rotation.x = lerp(0.3, 0, e);
          this.earthGroup.rotation.y = lerp(0, 0, e);
          this.earthGroup.rotation.z = lerp(0, 0, e);

          this.earthGroup.scale.setScalar(lerp(0.3, 0.55, e));
        }
        else if (progress < transitionEnd) {
          const p = (progress - transitionStart) / (transitionEnd - transitionStart);
          const e = slowStartEasing(p);

          this.earthGroup.position.x = lerp(centerEarthPos.x, finalEarthPos.x, e);
          this.earthGroup.position.y = lerp(centerEarthPos.y, finalEarthPos.y, e);
          this.earthGroup.position.z = lerp(centerEarthPos.z, finalEarthPos.z, e);

          this.earthGroup.rotation.x = lerp(0, finalEarthRot.x, e);
          this.earthGroup.rotation.y = lerp(0, finalEarthRot.y, e);
          this.earthGroup.rotation.z = lerp(0, finalEarthRot.z, e);

          this.earthGroup.scale.setScalar(lerp(0.55, finalScale, e));
        }

        if (progress >= 1) {
          this.introCompleted = true;
          this.animationComplete.emit();

          this.earthGroup.position.set(finalEarthPos.x, finalEarthPos.y, finalEarthPos.z);
          this.earthGroup.rotation.set(finalEarthRot.x, finalEarthRot.y, finalEarthRot.z);
          this.earthGroup.scale.setScalar(finalScale);
        }
      }

      const camDir = this.camera.position.clone().normalize();

      this.pointObjects.forEach(p => {
        const pos = p.sprite.position.clone().normalize();
        const dot = camDir.dot(pos);
        const visible = dot > -0.1;
        p.sprite.visible = visible;
        p.ring.visible = visible;
      });

      this.arcObjects.forEach(a => {
        a.progress += a.speed;
        if (a.progress > 1.3) a.progress = 0;

        const trailLength = 0.25;
        const startT = Math.max(0, a.progress - trailLength);
        const endT = Math.min(1, a.progress);

        if (endT > startT) {
          const startIdx = Math.floor(startT * (a.fullPoints.length - 1));
          const endIdx = Math.floor(endT * (a.fullPoints.length - 1));
          const visiblePts = a.fullPoints.slice(startIdx, endIdx + 1);
          if (visiblePts.length > 1) {
            a.line.geometry.setFromPoints(visiblePts);
            a.line.geometry.attributes.position.needsUpdate = true;
            a.line.visible = true;
          }
        } else {
          a.line.visible = false;
        }
      });

      this.earthGroup.children.forEach((child: any) => {
        if (!isMobile && child.userData && child.userData['isClouds']) {
          child.rotation.y += 0.0003;
        }
      });

      this.renderer.render(this.scene, this.camera);
    };

    if (this.skipAnimation) {
      this.earthGroup.position.set(finalEarthPos.x, finalEarthPos.y, finalEarthPos.z);
      this.earthGroup.rotation.set(finalEarthRot.x, finalEarthRot.y, finalEarthRot.z);
      this.earthGroup.scale.setScalar(finalScale);
      this.introCompleted = true;
      this.animationComplete.emit();
    }
    animate();

    this.resizeHandler = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      if (this.introCompleted) {
        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobile) {
          const pos = newIsMobile ? { x: 0, y: 10, z: 0 } : { x: -150, y: -80, z: 0 };
          const scale = newIsMobile ? 0.55 : 1;
          this.earthGroup.position.set(pos.x, pos.y, pos.z);
          this.earthGroup.scale.setScalar(scale);
        }
      }
    };
    window.addEventListener('resize', this.resizeHandler);
  }
}
