import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { tsParticles } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex flex-col font-georama relative">
      <!-- Header -->
      <div class="h-16 border-b border-gray-200 flex items-center px-6 bg-gray-50">
        <div class="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fca1ae3e32aff44c69d5f1f5c5fc638ce"
            alt="Climate Connector"
            class="h-8 w-auto"
          >
        </div>
        <div class="flex-1"></div>
        <button (click)="toggleLanguage()" class="cc-btn cc-btn-compact flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
          </svg>
          {{ language === 'es' ? 'Español' : 'English' }}
        </button>
      </div>

      <!-- Main content area -->
      <div class="flex-1 flex relative">
        <div class="w-full flex flex-col items-center justify-center bg-slate-900 bg-grid relative">
          <div id="particles-container" class="absolute inset-0 z-0 pointer-events-none"></div>
          <div #splashContent class="flex flex-col items-center gap-8 relative z-10">
            <div class="relative w-48 h-48 flex items-center justify-center">
              <!-- Ring SVG con filtro neon -->
              <svg class="absolute top-0 left-0 w-48 h-48 pointer-events-none" viewBox="0 0 200 200">
                <defs>
                  <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
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
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,174,239,0.08)" stroke-width="4" />
                <circle #ringProgress cx="100" cy="100" r="90" fill="none" stroke="#00aeef" stroke-width="4"
                  stroke-linecap="round" stroke-dasharray="565.49" stroke-dashoffset="565.49"
                  transform="rotate(-90 100 100)" filter="url(#neonGlow)" />
              </svg>

              <!-- Logo SVG -->
              <div class="w-36 h-24 overflow-visible relative" style="filter: url(#softGlow)">
                <svg #logoSvg width="155" height="103" viewBox="0 0 155 103" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full overflow-visible">
                  <!-- NUBE outline -->
                  <g transform="translate(-4, 0)">
                    <path #cloudEl d="M125.46 31.6585C119.206 25.7301 111.022 22.227 102.315 22.3871C94.776 22.6569 87.5212 25.0936 81.7433 30.0395L81.5868 30.1735C80.6027 30.9879 79.6834 31.9008 78.8524 32.8703C78.7159 33.0304 78.5785 33.1898 78.4408 33.3488L78.1904 33.6326C77.9209 33.9411 77.7087 34.1627 77.3267 34.3193C73.5915 31.5009 69.2353 29.7118 64.6395 28.88L64.3383 28.8261C62.7906 28.5322 61.2618 28.488 59.6903 28.4833L59.3637 28.4827C57.6308 28.4764 55.9449 28.558 54.235 28.8563L53.9801 28.9038C49.092 29.8132 44.4297 31.8552 40.5582 34.9877C40.4497 35.0761 40.3409 35.1642 40.2319 35.2521C38.8841 36.2803 37.6104 37.4895 36.5692 38.8278C35.856 39.4984 35.856 39.4984 34.8977 39.7878C34.4632 39.9258 34.0295 40.0655 33.5973 40.2105C28.6576 41.9059 24.453 45.8235 22.1582 50.4698L22.0482 50.6952C21.6231 51.5617 21.2431 52.4325 20.9527 53.3537L20.8727 53.6167C20.6521 54.3412 20.6521 54.3412 20.2817 56.1884H112.967H154.01C154.01 55.4079 154.01 55.4079 152.197 53.0095C152.063 52.8348 151.929 52.6603 151.797 52.4837C148.794 48.456 144.244 45.6319 139.323 44.6341L139.047 44.5802C137.269 44.2327 135.509 44.2357 133.705 44.2643L133.436 44.2692C133.332 44.0109 133.229 43.7523 133.129 43.4921C132.029 40.6017 130.605 37.8722 128.726 35.4047C128.587 35.2247 128.449 35.0447 128.312 34.8634C127.447 33.7158 126.495 32.6559 125.46 31.6585Z" fill="none" stroke="#00aeef" stroke-width="1.5"/>
                  </g>

                  <!-- GOTAS outline (debajo de la nube) -->
                  <g #drop1 transform="translate(-45, 25)">
                    <path d="M128.982 60C129.758 60.3398 130.305 61.218 130.821 61.8663C131.044 62.1441 131.272 62.4166 131.503 62.6875C134.013 65.6337 136.47 68.9759 137.697 72.6937C137.741 72.8242 137.741 72.8242 137.786 72.9574C138.346 74.9949 137.74 77.3727 136.745 79.1692C135.314 81.4407 133.262 82.9205 130.647 83.5249C128.32 83.9376 125.904 83.529 123.903 82.2462C121.744 80.7008 120.3 78.6024 119.846 75.9302C119.334 71.4595 122.451 67.5089 125.031 64.1775C125.239 63.9149 125.448 63.6542 125.658 63.3942C125.731 63.3031 125.804 63.2119 125.879 63.1181C126.363 62.514 126.859 61.9193 127.36 61.3291C127.418 61.2601 127.476 61.1911 127.535 61.1201C128.489 60.0044 128.489 60.0044 128.982 60Z" fill="none" stroke="#00aeef" stroke-width="1.5"/>
                  </g>
                  <g #drop2 transform="translate(-40, 18)">
                    <path d="M106.191 48C106.968 48.3398 107.515 49.218 108.03 49.8663C108.253 50.1441 108.481 50.4166 108.713 50.6875C111.222 53.6337 113.68 56.9759 114.907 60.6937C114.951 60.8242 114.951 60.8242 114.995 60.9574C115.555 62.9949 114.95 65.3727 113.954 67.1692C112.524 69.4407 110.472 70.9205 107.857 71.5249C105.529 71.9376 103.113 71.529 101.112 70.2462C98.9532 68.7008 97.5099 66.6024 97.0558 63.9302C96.5435 59.4595 99.6605 55.5089 102.241 52.1775C102.448 51.9149 102.657 51.6542 102.868 51.3942C102.94 51.3031 103.013 51.2119 103.088 51.1181C103.573 50.514 104.068 49.9193 104.569 49.3291C104.627 49.2601 104.685 49.1911 104.745 49.1201C105.699 48.0044 105.699 48.0044 106.191 48Z" fill="none" stroke="#00aeef" stroke-width="1.5"/>
                  </g>
                  <g #drop3 transform="translate(-42, 40)">
                    <path d="M115.027 78.8662C115.467 78.9552 115.606 79.1391 115.896 79.4795C116.035 79.6271 116.035 79.6271 116.176 79.7778C116.833 80.4969 117.46 81.2319 118.066 81.9958C118.166 82.1195 118.266 82.2432 118.366 82.3668C124.516 89.9861 124.516 89.9861 124.139 94.0305C123.833 96.6425 122.75 98.8092 120.778 100.556C118.605 102.268 116.045 102.722 113.348 102.425C111.811 102.181 110.337 101.399 109.172 100.376C109.11 100.329 109.047 100.281 108.983 100.232C107.403 98.9988 106.478 96.964 106.071 95.0434C105.516 90.6334 108.306 86.8449 110.849 83.5237C111.364 82.8595 111.892 82.2069 112.426 81.5582C112.505 81.4615 112.505 81.4615 112.586 81.3628C112.88 81.0072 113.176 80.6545 113.476 80.3043C113.623 80.1312 113.767 79.9558 113.911 79.7804C114.006 79.6686 114.1 79.5569 114.195 79.4453C114.277 79.3464 114.36 79.2476 114.444 79.1457C114.703 78.9325 114.703 78.9325 115.027 78.8662Z" fill="none" stroke="#00aeef" stroke-width="1.5"/>
                  </g>
                  <g #drop4 transform="translate(-35, 35)">
                    <path d="M128.982 60C129.758 60.3398 130.305 61.218 130.821 61.8663C131.044 62.1441 131.272 62.4166 131.503 62.6875C134.013 65.6337 136.47 68.9759 137.697 72.6937C137.741 72.8242 137.741 72.8242 137.786 72.9574C138.346 74.9949 137.74 77.3727 136.745 79.1692C135.314 81.4407 133.262 82.9205 130.647 83.5249C128.32 83.9376 125.904 83.529 123.903 82.2462C121.744 80.7008 120.3 78.6024 119.846 75.9302C119.334 71.4595 122.451 67.5089 125.031 64.1775C125.239 63.9149 125.448 63.6542 125.658 63.3942C125.731 63.3031 125.804 63.2119 125.879 63.1181C126.363 62.514 126.859 61.9193 127.36 61.3291C127.418 61.2601 127.476 61.1911 127.535 61.1201C128.489 60.0044 128.489 60.0044 128.982 60Z" fill="none" stroke="#00aeef" stroke-width="1"/>
                  </g>
                  <g #drop5 transform="translate(-50, 22)">
                    <path d="M106.191 48C106.968 48.3398 107.515 49.218 108.03 49.8663C108.253 50.1441 108.481 50.4166 108.713 50.6875C111.222 53.6337 113.68 56.9759 114.907 60.6937C114.951 60.8242 114.951 60.8242 114.995 60.9574C115.555 62.9949 114.95 65.3727 113.954 67.1692C112.524 69.4407 110.472 70.9205 107.857 71.5249C105.529 71.9376 103.113 71.529 101.112 70.2462C98.9532 68.7008 97.5099 66.6024 97.0558 63.9302C96.5435 59.4595 99.6605 55.5089 102.241 52.1775C102.448 51.9149 102.657 51.6542 102.868 51.3942C102.94 51.3031 103.013 51.2119 103.088 51.1181C103.573 50.514 104.068 49.9193 104.569 49.3291C104.627 49.2601 104.685 49.1911 104.745 49.1201C105.699 48.0044 105.699 48.0044 106.191 48Z" fill="none" stroke="#00aeef" stroke-width="1"/>
                  </g>
                </svg>
              </div>
            </div>

            <!-- Brand name -->
            <div #brandName class="text-xl tracking-widest font-light neon-text">
              Climate<span class="text-cyan-400 font-normal">Connector</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <div class="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500 font-georama">
          <p>© 2024 ClimateConnector. {{ footerText }}</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-gray-400 transition-colors">Privacidad</a>
            <a href="#" class="hover:text-gray-400 transition-colors">Términos de Uso</a>
            <a href="#" class="hover:text-gray-400 transition-colors">Soporte Técnico</a>
            <a href="#" class="hover:text-gray-400 transition-colors">Mapa del Sitio</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .bg-grid {
      background-color: #0a1628;
      background-image:
        linear-gradient(rgba(0, 174, 239, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 174, 239, 0.04) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .neon-text {
      color: #ffffff;
      text-shadow:
        0 0 7px rgba(0, 174, 239, 0.6),
        0 0 20px rgba(0, 174, 239, 0.3),
        0 0 40px rgba(0, 174, 239, 0.15);
    }
  `]
})
export class LoadingComponent implements OnInit, OnDestroy {
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
    footerText: 'All rights reserved. Professional climate monitoring network.'
  };

  private es = {
    footerText: 'Todos los derechos reservados. Red de monitoreo climático profesional.'
  };

  get footerText() { return this.language === 'es' ? this.es.footerText : this.en.footerText; }

  constructor(private router: Router) {}

  private particlesContainer: any = null;

  ngOnInit() {
    this.initParticles();
    this.setupAnimations();
  }

  ngOnDestroy() {
    this.tl?.kill();
    this.rainTweens.forEach(t => t.kill());
    gsap.killTweensOf('*');
    this.particlesContainer?.destroy();
  }

  private async initParticles() {
    await loadFull(tsParticles);
    this.particlesContainer = await tsParticles.load({
      id: 'particles-container',
      options: ({
        fpsLimit: 60,
        particles: {
          number: { value: 40, density: { enable: true } },
          color: { value: '#00aeef' },
          opacity: {
            value: 0.35,
            random: true,
            animation: { enable: true, speed: 0.3, minimumValue: 0.05 }
          },
          size: {
            value: 2.5,
            random: true,
            animation: { enable: true, speed: 0.5, minimumValue: 0.3 }
          },
          links: { enable: false },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'none' as const,
            random: true,
            straight: false,
            outModes: { default: 'out' as const }
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'bubble' },
            onClick: { enable: true, mode: 'repulse' }
          },
          modes: {
            bubble: { distance: 200, size: 4, duration: 2, opacity: 0.8 },
            repulse: { distance: 200, duration: 0.4 }
          }
        },
        background: { color: 'transparent' }
      }) as any
    });
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

    // Continuous rain animation (appear below cloud, fall down)
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
