import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-[#f0f4fa] to-[#e8f0f8]">
      <!-- Header -->
      <header class="h-16 flex items-center justify-between px-6 bg-white/90 backdrop-blur-sm relative z-30 border-b border-gray-100">
        <div class="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fca1ae3e32aff44c69d5f1f5c5fc638ce"
            alt="Climate Connector"
            class="h-8 w-auto"
          >
        </div>
        <button (click)="toggleLanguage()" class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
          </svg>
          {{ language === 'es' ? 'ES' : 'EN' }}
        </button>
      </header>

      <!-- Main content -->
      <main class="flex-1 flex items-center justify-center relative">
        <!-- Background map -->
        <canvas #mapCanvas class="absolute inset-0 w-full h-full opacity-50 pointer-events-none z-0"></canvas>

        <!-- Center content -->
        <div #splashContent class="relative z-10 flex flex-col items-center gap-8 text-center px-4">
          <div class="relative w-48 h-48 flex items-center justify-center">
            <!-- Ring SVG -->
            <svg class="absolute top-0 left-0 w-48 h-48 pointer-events-none" viewBox="0 0 200 200">
              <defs>
                <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(90,154,208,0.12)" stroke-width="4" />
              <circle #ringProgress cx="100" cy="100" r="90" fill="none" stroke="#5a9ad0" stroke-width="4"
                stroke-linecap="round" stroke-dasharray="565.49" stroke-dashoffset="565.49"
                transform="rotate(-90 100 100)" filter="url(#ringGlow)" />
            </svg>

            <!-- Logo SVG -->
            <div class="w-36 h-24 overflow-visible relative" style="filter: url(#softGlow)">
              <svg #logoSvg width="155" height="103" viewBox="0 0 155 103" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full overflow-visible">
                <!-- NUBE outline -->
                <g transform="translate(-4, 0)">
                  <path #cloudEl d="M125.46 31.6585C119.206 25.7301 111.022 22.227 102.315 22.3871C94.776 22.6569 87.5212 25.0936 81.7433 30.0395L81.5868 30.1735C80.6027 30.9879 79.6834 31.9008 78.8524 32.8703C78.7159 33.0304 78.5785 33.1898 78.4408 33.3488L78.1904 33.6326C77.9209 33.9411 77.7087 34.1627 77.3267 34.3193C73.5915 31.5009 69.2353 29.7118 64.6395 28.88L64.3383 28.8261C62.7906 28.5322 61.2618 28.488 59.6903 28.4833L59.3637 28.4827C57.6308 28.4764 55.9449 28.558 54.235 28.8563L53.9801 28.9038C49.092 29.8132 44.4297 31.8552 40.5582 34.9877C40.4497 35.0761 40.3409 35.1642 40.2319 35.2521C38.8841 36.2803 37.6104 37.4895 36.5692 38.8278C35.856 39.4984 35.856 39.4984 34.8977 39.7878C34.4632 39.9258 34.0295 40.0655 33.5973 40.2105C28.6576 41.9059 24.453 45.8235 22.1582 50.4698L22.0482 50.6952C21.6231 51.5617 21.2431 52.4325 20.9527 53.3537L20.8727 53.6167C20.6521 54.3412 20.6521 54.3412 20.2817 56.1884H112.967H154.01C154.01 55.4079 154.01 55.4079 152.197 53.0095C152.063 52.8348 151.929 52.6603 151.797 52.4837C148.794 48.456 144.244 45.6319 139.323 44.6341L139.047 44.5802C137.269 44.2327 135.509 44.2357 133.705 44.2643L133.436 44.2692C133.332 44.0109 133.229 43.7523 133.129 43.4921C132.029 40.6017 130.605 37.8722 128.726 35.4047C128.587 35.2247 128.449 35.0447 128.312 34.8634C127.447 33.7158 126.495 32.6559 125.46 31.6585Z" fill="none" stroke="#5a9ad0" stroke-width="1.5"/>
                </g>

                <!-- GOTAS outline -->
                <g #drop1 transform="translate(-45, 25)">
                  <path d="M128.982 60C129.758 60.3398 130.305 61.218 130.821 61.8663C131.044 62.1441 131.272 62.4166 131.503 62.6875C134.013 65.6337 136.47 68.9759 137.697 72.6937C137.741 72.8242 137.741 72.8242 137.786 72.9574C138.346 74.9949 137.74 77.3727 136.745 79.1692C135.314 81.4407 133.262 82.9205 130.647 83.5249C128.32 83.9376 125.904 83.529 123.903 82.2462C121.744 80.7008 120.3 78.6024 119.846 75.9302C119.334 71.4595 122.451 67.5089 125.031 64.1775C125.239 63.9149 125.448 63.6542 125.658 63.3942C125.731 63.3031 125.804 63.2119 125.879 63.1181C126.363 62.514 126.859 61.9193 127.36 61.3291C127.418 61.2601 127.476 61.1911 127.535 61.1201C128.489 60.0044 128.489 60.0044 128.982 60Z" fill="none" stroke="#5a9ad0" stroke-width="1.5"/>
                </g>
                <g #drop2 transform="translate(-40, 18)">
                  <path d="M106.191 48C106.968 48.3398 107.515 49.218 108.03 49.8663C108.253 50.1441 108.481 50.4166 108.713 50.6875C111.222 53.6337 113.68 56.9759 114.907 60.6937C114.951 60.8242 114.951 60.8242 114.995 60.9574C115.555 62.9949 114.95 65.3727 113.954 67.1692C112.524 69.4407 110.472 70.9205 107.857 71.5249C105.529 71.9376 103.113 71.529 101.112 70.2462C98.9532 68.7008 97.5099 66.6024 97.0558 63.9302C96.5435 59.4595 99.6605 55.5089 102.241 52.1775C102.448 51.9149 102.657 51.6542 102.868 51.3942C102.94 51.3031 103.013 51.2119 103.088 51.1181C103.573 50.514 104.068 49.9193 104.569 49.3291C104.627 49.2601 104.685 49.1911 104.745 49.1201C105.699 48.0044 105.699 48.0044 106.191 48Z" fill="none" stroke="#5a9ad0" stroke-width="1.5"/>
                </g>
                <g #drop3 transform="translate(-42, 40)">
                  <path d="M115.027 78.8662C115.467 78.9552 115.606 79.1391 115.896 79.4795C116.035 79.6271 116.035 79.6271 116.176 79.7778C116.833 80.4969 117.46 81.2319 118.066 81.9958C118.166 82.1195 118.266 82.2432 118.366 82.3668C124.516 89.9861 124.516 89.9861 124.139 94.0305C123.833 96.6425 122.75 98.8092 120.778 100.556C118.605 102.268 116.045 102.722 113.348 102.425C111.811 102.181 110.337 101.399 109.172 100.376C109.11 100.329 109.047 100.281 108.983 100.232C107.403 98.9988 106.478 96.964 106.071 95.0434C105.516 90.6334 108.306 86.8449 110.849 83.5237C111.364 82.8595 111.892 82.2069 112.426 81.5582C112.505 81.4615 112.505 81.4615 112.586 81.3628C112.88 81.0072 113.176 80.6545 113.476 80.3043C113.623 80.1312 113.767 79.9558 113.911 79.7804C114.006 79.6686 114.1 79.5569 114.195 79.4453C114.277 79.3464 114.36 79.2476 114.444 79.1457C114.703 78.9325 114.703 78.9325 115.027 78.8662Z" fill="none" stroke="#5a9ad0" stroke-width="1.5"/>
                </g>
                <g #drop4 transform="translate(-35, 35)">
                  <path d="M128.982 60C129.758 60.3398 130.305 61.218 130.821 61.8663C131.044 62.1441 131.272 62.4166 131.503 62.6875C134.013 65.6337 136.47 68.9759 137.697 72.6937C137.741 72.8242 137.741 72.8242 137.786 72.9574C138.346 74.9949 137.74 77.3727 136.745 79.1692C135.314 81.4407 133.262 82.9205 130.647 83.5249C128.32 83.9376 125.904 83.529 123.903 82.2462C121.744 80.7008 120.3 78.6024 119.846 75.9302C119.334 71.4595 122.451 67.5089 125.031 64.1775C125.239 63.9149 125.448 63.6542 125.658 63.3942C125.731 63.3031 125.804 63.2119 125.879 63.1181C126.363 62.514 126.859 61.9193 127.36 61.3291C127.418 61.2601 127.476 61.1911 127.535 61.1201C128.489 60.0044 128.489 60.0044 128.982 60Z" fill="none" stroke="#5a9ad0" stroke-width="1"/>
                </g>
                <g #drop5 transform="translate(-50, 22)">
                  <path d="M106.191 48C106.968 48.3398 107.515 49.218 108.03 49.8663C108.253 50.1441 108.481 50.4166 108.713 50.6875C111.222 53.6337 113.68 56.9759 114.907 60.6937C114.951 60.8242 114.951 60.8242 114.995 60.9574C115.555 62.9949 114.95 65.3727 113.954 67.1692C112.524 69.4407 110.472 70.9205 107.857 71.5249C105.529 71.9376 103.113 71.529 101.112 70.2462C98.9532 68.7008 97.5099 66.6024 97.0558 63.9302C96.5435 59.4595 99.6605 55.5089 102.241 52.1775C102.448 51.9149 102.657 51.6542 102.868 51.3942C102.94 51.3031 103.013 51.2119 103.088 51.1181C103.573 50.514 104.068 49.9193 104.569 49.3291C104.627 49.2601 104.685 49.1911 104.745 49.1201C105.699 48.0044 105.699 48.0044 106.191 48Z" fill="none" stroke="#5a9ad0" stroke-width="1"/>
                </g>
              </svg>
            </div>
          </div>

          <div #brandName class="text-xl tracking-widest font-light">
            <span class="text-slate-800">Climate</span><span class="text-[#5a9ad0] font-normal">Connector</span>
          </div>

          <p class="text-lg text-slate-600 font-medium -mt-2">{{ loadingText }}</p>
        </div>

        <!-- Waves -->
        <div class="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <svg class="w-full h-[180px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#dbeafe" fill-opacity="0.6" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path fill="#bfdbfe" fill-opacity="0.7" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path fill="#93c5fd" fill-opacity="0.8" d="M0,256L48,250.7C96,245,192,235,288,229.3C384,224,480,224,576,234.7C672,245,768,267,864,266.7C960,267,1056,245,1152,234.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </main>

      <!-- Footer -->
      <footer class="relative z-30 bg-white border-t border-gray-100 px-6 py-4">
        <div class="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            <p>© 2024 ClimateConnector. {{ footerText }}</p>
            <p class="mt-0.5">{{ footerSubText }}</p>
          </div>
          <div class="flex gap-6">
            <a href="#" class="hover:text-gray-700 transition-colors">Privacidad</a>
            <a href="#" class="hover:text-gray-700 transition-colors">Términos de Uso</a>
            <a href="#" class="hover:text-gray-700 transition-colors">Soporte Técnico</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class LoadingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapCanvas', { static: true }) mapCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ringProgress', { static: true }) ringProgress!: ElementRef;
  @ViewChild('drop1', { static: true }) drop1!: ElementRef;
  @ViewChild('drop2', { static: true }) drop2!: ElementRef;
  @ViewChild('drop3', { static: true }) drop3!: ElementRef;
  @ViewChild('drop4', { static: true }) drop4!: ElementRef;
  @ViewChild('drop5', { static: true }) drop5!: ElementRef;
  @ViewChild('cloudEl', { static: true }) cloudEl!: ElementRef;
  @ViewChild('brandName', { static: true }) brandName!: ElementRef;
  @ViewChild('splashContent', { static: true }) splashContent!: ElementRef;
  @ViewChild('logoSvg', { static: true }) logoSvg!: ElementRef;

  language: 'es' | 'en' = 'es';

  private tl!: gsap.core.Timeline;
  private rainTweens: (gsap.core.Tween | gsap.core.Timeline)[] = [];

  private en = {
    footerText: 'All rights reserved.',
    footerSubText: 'Professional climate monitoring network.',
    loadingText: 'Loading data...'
  };

  private es = {
    footerText: 'Todos los derechos reservados.',
    footerSubText: 'Red de monitoreo climático profesional.',
    loadingText: 'Cargando datos...'
  };

  get footerText() { return this.language === 'es' ? this.es.footerText : this.en.footerText; }
  get footerSubText() { return this.language === 'es' ? this.es.footerSubText : this.en.footerSubText; }
  get loadingText() { return this.language === 'es' ? this.es.loadingText : this.en.loadingText; }

  constructor(private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.drawWorldMap();
    this.setupAnimations();
  }

  ngOnDestroy() {
    this.tl?.kill();
    this.rainTweens.forEach(t => t.kill());
    gsap.killTweensOf('*');
  }

  private async drawWorldMap() {
    const canvas = this.mapCanvas?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    try {
      const response = await fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson');
      if (!response.ok) throw new Error('Failed to fetch world map');
      const world = await response.json();

      const offW = 2048;
      const offH = 1024;
      const offCanvas = document.createElement('canvas');
      offCanvas.width = offW;
      offCanvas.height = offH;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      offCtx.fillStyle = '#ffffff';
      offCtx.fillRect(0, 0, offW, offH);
      offCtx.fillStyle = '#555555';

      world.features.forEach((f: any) => {
        if (!f?.geometry) return;
        if (f.geometry.type === 'Polygon') {
          f.geometry.coordinates.forEach((ring: number[][]) => this.drawRing(offCtx, ring, offW, offH));
        } else if (f.geometry.type === 'MultiPolygon') {
          f.geometry.coordinates.forEach((poly: number[][][]) => {
            poly.forEach((ring: number[][]) => this.drawRing(offCtx, ring, offW, offH));
          });
        }
      });

      const imageData = offCtx.getImageData(0, 0, offW, offH).data;
      const step = 6;
      const w = rect.width;
      const h = rect.height;

      let mapWidth = w;
      let mapHeight = w / 2;
      if (mapHeight > h) {
        mapHeight = h;
        mapWidth = h * 2;
      }
      const offsetX = (w - mapWidth) / 2;
      const offsetY = (h - mapHeight) / 2;
      const dotSize = 1.5;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(90, 154, 208, 0.35)';

      for (let y = 0; y < offH; y += step) {
        for (let x = 0; x < offW; x += step) {
          const i = (y * offW + x) * 4;
          const r = imageData[i], g = imageData[i + 1], b = imageData[i + 2];
          if (r > 40 && r < 120 && g > 40 && g < 120 && b > 40 && b < 120) {
            const lon = (x / offW) * 360 - 180;
            const lat = 90 - (y / offH) * 180;
            const px = (lon + 180) / 360 * mapWidth + offsetX;
            const py = (90 - lat) / 180 * mapHeight + offsetY;
            ctx.beginPath();
            ctx.arc(px, py, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    } catch (e) {
      console.error('Error loading world map:', e);
      this.drawFallbackMap(ctx, rect.width, rect.height);
    }
  }

  private drawRing(ctx: CanvasRenderingContext2D, ring: number[][], w: number, h: number) {
    if (ring.length < 3) return;
    ctx.beginPath();
    const x0 = (ring[0][0] + 180) / 360 * w;
    const y0 = (90 - ring[0][1]) / 180 * h;
    ctx.moveTo(x0, y0);
    for (let i = 1; i < ring.length; i++) {
      const x = (ring[i][0] + 180) / 360 * w;
      const y = (90 - ring[i][1]) / 180 * h;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }

  private drawFallbackMap(ctx: CanvasRenderingContext2D, w: number, h: number) {
    let mapWidth = w;
    let mapHeight = w / 2;
    if (mapHeight > h) {
      mapHeight = h;
      mapWidth = h * 2;
    }
    const offsetX = (w - mapWidth) / 2;
    const offsetY = (h - mapHeight) / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(90, 154, 208, 0.15)';
    const cols = 80;
    const rows = 40;
    const dx = mapWidth / cols;
    const dy = mapHeight / rows;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if ((col + row) % 3 === 0) {
          ctx.beginPath();
          ctx.arc(col * dx + dx / 2 + offsetX, row * dy + dy / 2 + offsetY, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  private setupAnimations() {
    const ring = this.ringProgress?.nativeElement;
    const logo = this.logoSvg?.nativeElement;
    const cloud = this.cloudEl?.nativeElement;
    const brand = this.brandName?.nativeElement;
    const content = this.splashContent?.nativeElement;
    const drops = [
      this.drop1?.nativeElement,
      this.drop2?.nativeElement,
      this.drop3?.nativeElement,
      this.drop4?.nativeElement,
      this.drop5?.nativeElement
    ].filter(Boolean);

    // Cloud gentle floating
    if (cloud) {
      gsap.to(cloud, {
        y: 3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Logo subtle pulse
    if (logo) {
      gsap.to(logo, {
        scale: 1.03,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: '50% 50%'
      });
    }

    // Continuous rain animation
    drops.forEach((drop, i) => {
      const delay = i * 0.25;
      const duration = 1.2 + Math.random() * 0.4;

      const rain = gsap.timeline({ repeat: -1, delay });
      rain.set(drop, { y: 0, opacity: 1 })
        .to(drop, { y: 40, opacity: 0, duration, ease: 'power1.in' });
      this.rainTweens.push(rain);
    });

    // Ring fill animation
    if (ring) {
      gsap.to(ring, {
        attr: { 'stroke-dashoffset': 0 },
        duration: 2.5,
        ease: 'power2.inOut'
      });
    }

    // Brand name reveal
    if (brand) {
      gsap.fromTo(brand,
        { opacity: 0, letterSpacing: '6px' },
        {
          opacity: 1,
          letterSpacing: '3px',
          duration: 0.8,
          delay: 0.6,
          ease: 'power2.out'
        }
      );
    }

    // Exit timeline
    this.tl = gsap.timeline({
      delay: 4,
      onComplete: () => {
        this.router.navigate(['/not-found']);
      }
    });

    if (content) {
      this.tl.to(content, {
        opacity: 0,
        y: -176,
        duration: 0.8,
        ease: 'power2.inOut'
      });
    }

    // Stop all rain tweens during exit
    this.tl.call(() => {
      this.rainTweens.forEach(t => t.pause());
    }, [], 0);
  }

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }
}
