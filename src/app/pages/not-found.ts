import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { tsParticles } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex flex-col font-georama">
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

      <div class="flex-1 flex items-center justify-center p-6 bg-slate-200 bg-grid-light relative overflow-hidden">
        <div id="particles-container" class="absolute inset-0 z-0 pointer-events-none"></div>

        <div #cardEl class="max-w-lg w-full bg-white/95 rounded-xl border border-slate-300 p-8 text-center relative z-10 shadow-xl">
          <div #svgContainer class="mb-1 flex justify-center">
            <svg viewBox="0 0 220 210" class="w-64 h-auto max-h-56">
              <defs>
                <filter id="neonGlow404" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g #floatGroup>
                <g #cloudGroup transform="translate(-7.5, -18.3) scale(1.35)">
                  <path d="M125.46 31.6585C119.206 25.7301 111.022 22.227 102.315 22.3871C94.776 22.6569 87.5212 25.0936 81.7433 30.0395L81.5868 30.1735C80.6027 30.9879 79.6834 31.9008 78.8524 32.8703C78.7159 33.0304 78.5785 33.1898 78.4408 33.3488L78.1904 33.6326C77.9209 33.9411 77.7087 34.1627 77.3267 34.3193C73.5915 31.5009 69.2353 29.7118 64.6395 28.88L64.3383 28.8261C62.7906 28.5322 61.2618 28.488 59.6903 28.4833L59.3637 28.4827C57.6308 28.4764 55.9449 28.558 54.235 28.8563L53.9801 28.9038C49.092 29.8132 44.4297 31.8552 40.5582 34.9877C40.4497 35.0761 40.3409 35.1642 40.2319 35.2521C38.8841 36.2803 37.6104 37.4895 36.5692 38.8278C35.856 39.4984 35.856 39.4984 34.8977 39.7878C34.4632 39.9258 34.0295 40.0655 33.5973 40.2105C28.6576 41.9059 24.453 45.8235 22.1582 50.4698L22.0482 50.6952C21.6231 51.5617 21.2431 52.4325 20.9527 53.3537L20.8727 53.6167C20.6521 54.3412 20.6521 54.3412 20.2817 56.1884H112.967H154.01C154.01 55.4079 154.01 55.4079 152.197 53.0095C152.063 52.8348 151.929 52.6603 151.797 52.4837C148.794 48.456 144.244 45.6319 139.323 44.6341L139.047 44.5802C137.269 44.2327 135.509 44.2357 133.705 44.2643L133.436 44.2692C133.332 44.0109 133.229 43.7523 133.129 43.4921C132.029 40.6017 130.605 37.8722 128.726 35.4047C128.587 35.2247 128.449 35.0447 128.312 34.8634C127.447 33.7158 126.495 32.6559 125.46 31.6585Z"
                        fill="none" stroke="#64748b" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round"
                        filter="url(#neonGlow404)" />
                </g>
                <path #lightningEl
                      d="m474-317 187-272H519l63-217H374v332h100v157Zm-22 73v-208H352v-376h259l-63 217h155L452-244Zm22-230H374h100Z"
                      fill="#00aeef" stroke="none"
                      filter="url(#neonGlow404)"
                      transform="translate(41, 170) scale(0.13)" />
              </g>
            </svg>
          </div>

          <h1 #titleEl class="text-5xl md:text-6xl font-bold text-slate-800 mb-2 neon-404" style="letter-spacing: 8px;">404</h1>
          <h2 class="text-lg md:text-xl font-semibold text-slate-600 mb-4">{{ pageNotFoundTitle }}</h2>
          <p #descEl class="text-slate-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">{{ pageNotFoundText }}</p>

          <button #btnEl (click)="goHome()" class="cc-btn">
            {{ backButtonText }}
          </button>
        </div>
      </div>

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
    .bg-grid-light {
      background-color: #e2e8f0;
      background-image:
        linear-gradient(rgba(0, 174, 239, 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 174, 239, 0.07) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .neon-404 {
      text-shadow:
        0 0 7px rgba(0, 174, 239, 0.5),
        0 0 20px rgba(0, 174, 239, 0.25),
        0 0 40px rgba(0, 174, 239, 0.1);
    }
  `]
})
export class NotFoundComponent implements OnInit, OnDestroy {
  @ViewChild('cardEl', { static: true }) cardEl!: ElementRef;
  @ViewChild('titleEl', { static: true }) titleEl!: ElementRef;
  @ViewChild('descEl', { static: true }) descEl!: ElementRef;
  @ViewChild('btnEl', { static: true }) btnEl!: ElementRef;
  @ViewChild('floatGroup', { static: true }) floatGroup!: ElementRef;
  @ViewChild('lightningEl', { static: true }) lightningEl!: ElementRef;

  language: 'es' | 'en' = 'es';

  private en = {
    pageNotFoundTitle: 'PAGE NOT FOUND',
    pageNotFoundText: 'We apologize, the link you are looking for does not exist or has been moved to a new location.',
    backButtonText: 'RETURN TO HOME',
    footerText: 'All rights reserved. Professional climate monitoring network.'
  };

  private es = {
    pageNotFoundTitle: 'PÁGINA NO ENCONTRADA',
    pageNotFoundText: 'Lo sentimos, el enlace que buscas no existe o ha sido movido a una nueva ubicación.',
    backButtonText: 'VOLVER AL INICIO',
    footerText: 'Todos los derechos reservados. Red de monitoreo climático profesional.'
  };

  get pageNotFoundTitle() { return this.language === 'es' ? this.es.pageNotFoundTitle : this.en.pageNotFoundTitle; }
  get pageNotFoundText() { return this.language === 'es' ? this.es.pageNotFoundText : this.en.pageNotFoundText; }
  get backButtonText() { return this.language === 'es' ? this.es.backButtonText : this.en.backButtonText; }
  get footerText() { return this.language === 'es' ? this.es.footerText : this.en.footerText; }

  private particlesContainer: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.initParticles();
    this.setupAnimations();
  }

  ngOnDestroy() {
    this.particlesContainer?.destroy();
    gsap.killTweensOf('*');
  }

  private async initParticles() {
    await loadFull(tsParticles);
    this.particlesContainer = await tsParticles.load({
      id: 'particles-container',
      options: ({
        fpsLimit: 60,
        particles: {
          number: { value: 80, density: { enable: true } },
          color: { value: '#1e40af' },
          opacity: {
            value: 0.8,
            random: true,
            animation: { enable: true, speed: 0.3, minimumValue: 0.3 }
          },
          size: {
            value: 4,
            random: true,
            animation: { enable: true, speed: 0.4, minimumValue: 1.5 }
          },
          links: { enable: false },
          move: {
            enable: true,
            speed: 0.6,
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
            bubble: { distance: 200, size: 6, duration: 2, opacity: 0.9 },
            repulse: { distance: 200, duration: 0.4 }
          }
        },
        background: { color: 'transparent' }
      }) as any
    });
  }

  private setupAnimations() {
    const card = this.cardEl?.nativeElement;
    const title = this.titleEl?.nativeElement;
    const desc = this.descEl?.nativeElement;
    const btn = this.btnEl?.nativeElement;
    const floatGroup = this.floatGroup?.nativeElement;
    const lightning = this.lightningEl?.nativeElement;

    if (floatGroup) {
      gsap.to(floatGroup, {
        y: 3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    if (lightning) {
      gsap.set(lightning, { opacity: 0 });
      const flashTl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      flashTl
        .to(lightning, { opacity: 1, duration: 0.04 })
        .to(lightning, { opacity: 0, duration: 0.06 })
        .to(lightning, { opacity: 1, duration: 0.02 })
        .to(lightning, { opacity: 0, duration: 0.3 });
    }

    if (card) {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }

    if (title) {
      gsap.fromTo(title,
        { opacity: 0, letterSpacing: '12px' },
        { opacity: 1, letterSpacing: '8px', duration: 0.8, delay: 0.3, ease: 'power2.out' }
      );
    }

    if (desc) {
      gsap.fromTo(desc,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power2.out' }
      );
    }

    if (btn) {
      gsap.fromTo(btn,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.7, ease: 'power2.out' }
      );
    }
  }

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  goHome() {
    this.router.navigate(['/login']);
  }
}
