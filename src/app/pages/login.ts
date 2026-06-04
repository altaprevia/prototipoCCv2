import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GlobeBannerComponent } from '../components/globe-banner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, GlobeBannerComponent],
  template: `
    <!-- Globe background (fixed full-screen, z-0) -->
    <app-globe-banner (animationComplete)="onGlobeReady()"></app-globe-banner>

    <!-- Intro overlay: logo ARRIBA del planeta -->
    <div
      class="fixed inset-0 z-50 flex flex-col items-center pointer-events-none transition-opacity duration-1000"
      [class.opacity-0]="!showingIntro"
      style="padding-top: 5vh;"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fca1ae3e32aff44c69d5f1f5c5fc638ce"
        alt="Climate Connector"
        class="w-48 h-auto"
      >
    </div>

    <!-- Main UI (z-10, hidden during intro) -->
    <div
      class="fixed inset-0 z-10 flex flex-col font-georama transition-opacity duration-1000 overflow-hidden"
      [class.opacity-0]="showingIntro"
      [class.pointer-events-none]="showingIntro"
    >
      <div class="flex-1 flex">
        <!-- Left side - Branding (transparent, globe visible behind) -->
        <div class="hidden md:flex md:w-1/2 flex-col relative">
          <div class="p-4">
            <a href="https://canalclima.com/" target="_blank">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F637d28ba8e164481b22cf6c6cf2c694c"
                alt="Canal Clima"
                class="h-8 w-auto"
              >
            </a>
          </div>
          <div class="flex-1 flex flex-col justify-start items-center pt-8 pb-4 px-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fca1ae3e32aff44c69d5f1f5c5fc638ce"
              alt="Climate Connector"
              class="w-48 h-auto object-contain mb-4"
            >
            <div class="max-w-md text-center">
              <p class="text-gray-900 font-georama text-sm px-4 py-2">
                {{ brandingText }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right side - Login Form (blue background) -->
        <div class="w-full md:w-1/2 bg-slate-900 flex flex-col">
          <div class="flex justify-between items-center p-4">
            <a href="https://canalclima.com/" target="_blank" class="md:hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F637d28ba8e164481b22cf6c6cf2c694c"
                alt="Canal Clima"
                class="h-8 w-auto"
              >
            </a>
            <div class="flex-1"></div>
            <button (click)="toggleLanguage()" class="cc-btn cc-btn-compact flex items-center gap-2">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              <span class="text-white text-sm">{{ language === 'es' ? 'ES' : 'EN' }}</span>
            </button>
          </div>

          <div class="flex-1 flex items-center justify-center p-4 md:p-6">
            <div class="w-full max-w-sm">
              <div class="bg-white rounded-xl p-6 shadow-xl">
                <div class="md:hidden text-center mb-4">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fca1ae3e32aff44c69d5f1f5c5fc638ce"
                    alt="Climate Connector"
                    class="w-auto max-w-xs mx-auto"
                  >
                </div>
                <h1 class="text-xl md:text-2xl font-mulish font-bold text-center text-gray-900 mb-1">{{ loginTitle }}</h1>
                <p class="text-center text-xs text-gray-600 mb-4 font-georama">{{ loginSubtitle }}</p>

                <form (ngSubmit)="onLogin()" class="space-y-3">
                  <div>
                    <label class="block text-xs font-mulish font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      {{ usernameLbl }}
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="username"
                      name="username"
                      [placeholder]="usernamePlaceholder"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg font-georama text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                  </div>

                  <div>
                    <label class="block text-xs font-mulish font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      {{ passwordLbl }}
                    </label>
                    <input
                      type="password"
                      [(ngModel)]="password"
                      name="password"
                      [placeholder]="passwordPlaceholder"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg font-georama text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                  </div>

                  <button type="submit" class="cc-btn w-full">
                    {{ loginBtn }} →
                  </button>
                </form>

                <div class="mt-4 pt-3 border-t border-gray-200">
                  <a routerLink="/forgot-password" class="block text-left text-[#006281] hover:text-[#004a63] font-georama font-semibold text-xs transition-colors mb-1">
                    {{ forgotPasswordText }}
                  </a>
                  <a href="https://canalclima.com/index.php/contacto/" target="_blank" class="block text-left text-[#006281] hover:text-[#004a63] font-georama font-semibold text-xs transition-colors">
                    {{ requestAccessText }}
                  </a>
                </div>

                <p class="text-center text-xs text-gray-500 mt-3 font-georama leading-relaxed">
                  {{ contactText }} <span class="font-semibold">+57 316 584 7114</span> {{ contactText2 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-white border-t border-gray-200 px-4 py-2">
        <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 font-georama">
          <p>© 2024 ClimateConnector. {{ footerText }}</p>
          <div class="flex gap-4">
            <a href="#" class="hover:text-gray-700 transition-colors">Privacidad</a>
            <a href="#" class="hover:text-gray-700 transition-colors">Términos</a>
            <a href="#" class="hover:text-gray-700 transition-colors">Soporte</a>
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
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  language: 'es' | 'en' = 'es';
  showingIntro = true;

  private en = {
    loginTitle: 'PLATFORM ACCESS',
    loginSubtitle: 'Access the control and monitoring panel',
    usernameLbl: 'USERNAME',
    usernamePlaceholder: 'Enter your username',
    passwordLbl: 'PASSWORD',
    passwordPlaceholder: 'Enter your password',
    loginBtn: 'LOGIN',
    forgotPasswordText: 'Forgot your password?',
    requestAccessText: 'Request access to the platform',
    contactText: 'If you are not a customer, we appreciate you contacting the sales area at phone',
    contactText2: 'to assign our services.',
    footerText: 'All rights reserved. Professional climate monitoring network.',
    brandingText: 'Canal Clima provides weather forecasts in Spanish for Colombia, Latin America and the world.',
    privacyText: 'Privacy',
    termsText: 'Terms of Use',
    supportText: 'Technical Support',
    sitemapText: 'Site Map'
  };

  private es = {
    loginTitle: 'INGRESO A LA PLATAFORMA',
    loginSubtitle: 'Acceda al panel de control y monitoreo',
    usernameLbl: 'NOMBRE DE USUARIO',
    usernamePlaceholder: 'Ingrese su usuario',
    passwordLbl: 'CONTRASEÑA',
    passwordPlaceholder: 'Ingrese su contraseña',
    loginBtn: 'INGRESAR',
    forgotPasswordText: '¿Olvidó su contraseña?',
    requestAccessText: 'Solicitar acceso a la plataforma',
    contactText: 'Si usted no es un cliente, agradecemos contactar con el área comercial al teléfono',
    contactText2: 'para asignar nuestros servicios.',
    footerText: 'Todos los derechos reservados. Red de monitoreo climático profesional.',
    brandingText: 'Canal Clima provee pronósticos del estado del tiempo en español para Colombia, Latinoamérica y el mundo.',
    privacyText: 'Privacidad',
    termsText: 'Términos de Uso',
    supportText: 'Soporte Técnico',
    sitemapText: 'Mapa del Sitio'
  };

  get loginTitle() { return this.language === 'es' ? this.es.loginTitle : this.en.loginTitle; }
  get loginSubtitle() { return this.language === 'es' ? this.es.loginSubtitle : this.en.loginSubtitle; }
  get usernameLbl() { return this.language === 'es' ? this.es.usernameLbl : this.en.usernameLbl; }
  get usernamePlaceholder() { return this.language === 'es' ? this.es.usernamePlaceholder : this.en.usernamePlaceholder; }
  get passwordLbl() { return this.language === 'es' ? this.es.passwordLbl : this.en.passwordLbl; }
  get passwordPlaceholder() { return this.language === 'es' ? this.es.passwordPlaceholder : this.en.passwordPlaceholder; }
  get loginBtn() { return this.language === 'es' ? this.es.loginBtn : this.en.loginBtn; }
  get forgotPasswordText() { return this.language === 'es' ? this.es.forgotPasswordText : this.en.forgotPasswordText; }
  get requestAccessText() { return this.language === 'es' ? this.es.requestAccessText : this.en.requestAccessText; }
  get contactText() { return this.language === 'es' ? this.es.contactText : this.en.contactText; }
  get contactText2() { return this.language === 'es' ? this.es.contactText2 : this.en.contactText2; }
  get footerText() { return this.language === 'es' ? this.es.footerText : this.en.footerText; }
  get brandingText() { return this.language === 'es' ? this.es.brandingText : this.en.brandingText; }
  get privacyText() { return this.language === 'es' ? this.es.privacyText : this.en.privacyText; }
  get termsText() { return this.language === 'es' ? this.es.termsText : this.en.termsText; }
  get supportText() { return this.language === 'es' ? this.es.supportText : this.en.supportText; }
  get sitemapText() { return this.language === 'es' ? this.es.sitemapText : this.en.sitemapText; }

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  onGlobeReady() {
    setTimeout(() => {
      this.showingIntro = false;
    }, 300);
  }

  onLogin() {
    window.location.href = '/loading';
  }
}
