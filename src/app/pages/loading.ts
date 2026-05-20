import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
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

        <!-- Desktop: mostrar todo -->
        <div class="hidden md:flex items-center gap-4">
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

        <!-- Mobile: mostrar logo, notificaciones, avatar y hamburguesa -->
        <div class="flex md:hidden items-center gap-3">
          <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
          </button>
          <div class="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
            <img src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F9af5d64fbec94756a2836871198fcdd9" alt="User" class="w-full h-full object-cover">
          </div>
          <button (click)="toggleMenu()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg *ngIf="!menuOpen" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg *ngIf="menuOpen" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div *ngIf="menuOpen" class="md:hidden bg-white border-b border-gray-200 px-6 py-4">
        <div class="flex flex-col gap-3">
          <button
            (click)="toggleLanguage(); closeMenu()"
            class="cc-btn cc-btn-compact flex items-center gap-2 justify-start w-full"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
            </svg>
            {{ language === 'es' ? 'Español' : 'English' }}
          </button>
          <button
            (click)="logout(); closeMenu()"
            class="cc-btn cc-btn-compact flex items-center gap-2 justify-start w-full"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            {{ logoutText }}
          </button>
        </div>
      </div>

      <!-- Loading Animation -->
      <div class="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div class="flex flex-col items-center justify-center gap-8">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F7dcadffdbe174274bb894c479911db30"
            alt="Loading animation"
            class="w-60 h-60"
          >
          <div class="text-center">
            <p class="text-slate-600 text-lg font-medium font-georama">{{ loadingText }}</p>
          </div>
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
export class LoadingComponent implements OnInit {
  language: 'es' | 'en' = 'es';
  menuOpen = false;

  private en = {
    loadingText: 'Loading Dashboard...',
    logoutText: 'Exit',
    footerText: 'All rights reserved. Professional climate monitoring network.'
  };

  private es = {
    loadingText: 'Cargando Dashboard...',
    logoutText: 'Salir',
    footerText: 'Todos los derechos reservados. Red de monitoreo climático profesional.'
  };

  get loadingText() { return this.language === 'es' ? this.es.loadingText : this.en.loadingText; }
  get logoutText() { return this.language === 'es' ? this.es.logoutText : this.en.logoutText; }
  get footerText() { return this.language === 'es' ? this.es.footerText : this.en.footerText; }

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/not-found']);
    }, 4000);
  }

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
