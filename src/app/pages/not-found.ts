import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex flex-col font-georama">
      <!-- Header -->
      <div class="h-16 bg-white border-b border-gray-200 flex items-center px-6">
        <div class="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fca1ae3e32aff44c69d5f1f5c5fc638ce"
            alt="Climate Connector"
            class="h-8 w-auto"
          >
        </div>
        <div class="flex-1"></div>
        <div class="flex items-center gap-4">
          <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
          </button>
          <div class="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
            <img src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F9af5d64fbec94756a2836871198fcdd9" alt="User" class="w-full h-full object-cover">
          </div>
          <button (click)="toggleLanguage()" class="cc-btn cc-btn-compact flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
            </svg>
            {{ language === 'es' ? 'Español' : 'English' }}
          </button>
          <button (click)="logout()" class="cc-btn cc-btn-compact flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            {{ logoutText }}
          </button>
        </div>
      </div>

      <!-- 404 Content -->
      <div class="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div class="max-w-2xl w-full bg-gray-100 rounded-xl border border-gray-400 p-12 text-center">
          <!-- Cloud with 404 -->
          <div class="mb-8 relative inline-block">
            <svg class="w-40 h-40 mx-auto" viewBox="0 0 100 100">
              <g>
                <path d="M20 60 Q15 45, 25 35 Q30 30, 40 30 Q45 15, 60 15 Q75 15, 80 30 Q85 35, 85 50 Q85 65, 70 70 L25 70 Q15 68, 20 60 Z" fill="url(#cloudGradient404)"/>
                <text x="50" y="55" font-size="20" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">404</text>
                <defs>
                  <linearGradient id="cloudGradient404" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:rgb(0, 107, 138);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(0, 80, 110);stop-opacity:1" />
                  </linearGradient>
                </defs>
              </g>
            </svg>
          </div>

          <!-- Error Lines animation -->
          <div class="mb-8 flex justify-center gap-1">
            <div class="w-1 h-8 bg-cyan-500 rounded-full animate-pulse"></div>
            <div class="w-1 h-12 bg-cyan-500 rounded-full animate-pulse" style="animation-delay: 0.1s"></div>
            <div class="w-1 h-6 bg-cyan-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
            <div class="w-1 h-10 bg-cyan-500 rounded-full animate-pulse" style="animation-delay: 0.3s"></div>
            <div class="w-1 h-7 bg-cyan-500 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
            <div class="w-1 h-9 bg-cyan-500 rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
          </div>

          <!-- Error Message -->
          <h1 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{{ pageNotFoundTitle }}</h1>
          <p class="text-slate-600 text-sm mb-8">{{ pageNotFoundText }}</p>

          <!-- Back Button -->
          <button
            (click)="goHome()"
            class="bg-cyan-50 border border-cyan-300 text-cyan-700 font-semibold py-3 px-8 rounded-xl transition-all duration-300 ease-out hover:bg-cyan-100"
          >
            {{ backButtonText }}
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-white border-t border-gray-200 px-6 py-4">
        <div class="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500 font-georama">
          <p>© 2024 ClimateConnector. {{ footerText }}</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-gray-700 transition-colors">Privacidad</a>
            <a href="#" class="hover:text-gray-700 transition-colors">Términos de Uso</a>
            <a href="#" class="hover:text-gray-700 transition-colors">Soporte Técnico</a>
            <a href="#" class="hover:text-gray-700 transition-colors">Mapa del Sitio</a>
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
  `]
})
export class NotFoundComponent {
  language: 'es' | 'en' = 'es';

  private en = {
    pageNotFoundTitle: 'PAGE NOT FOUND',
    pageNotFoundText: 'We apologize, the link you are looking for does not exist or has been moved to a new location.',
    backButtonText: 'RETURN TO HOME',
    logoutText: 'Exit',
    footerText: 'All rights reserved. Professional climate monitoring network.'
  };

  private es = {
    pageNotFoundTitle: 'PÁGINA NO ENCONTRADA',
    pageNotFoundText: 'Lo sentimos, el enlace que buscas no existe o ha sido movido a una nueva ubicación.',
    backButtonText: 'VOLVER AL INICIO',
    logoutText: 'Salir',
    footerText: 'Todos los derechos reservados. Red de monitoreo climático profesional.'
  };

  get pageNotFoundTitle() { return this.language === 'es' ? this.es.pageNotFoundTitle : this.en.pageNotFoundTitle; }
  get pageNotFoundText() { return this.language === 'es' ? this.es.pageNotFoundText : this.en.pageNotFoundText; }
  get backButtonText() { return this.language === 'es' ? this.es.backButtonText : this.en.backButtonText; }
  get logoutText() { return this.language === 'es' ? this.es.logoutText : this.en.logoutText; }
  get footerText() { return this.language === 'es' ? this.es.footerText : this.en.footerText; }

  constructor(private router: Router) {}

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/login']);
  }
}
