import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GlobeBannerComponent } from '../components/globe-banner';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, GlobeBannerComponent],
  template: `
    <!-- Globe background (fixed full-screen, z-0) -->
    <app-globe-banner [skipAnimation]="true"></app-globe-banner>

    <!-- Desktop layout -->
    <div class="hidden md:flex min-h-screen flex-col font-georama relative z-10">
      <div class="flex-1 flex">
        <!-- Left side - Branding -->
        <div class="md:w-1/2 flex-col">
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

        <!-- Right side - Forgot Password Form -->
        <div class="md:w-1/2 bg-slate-900 flex flex-col">
          <div class="flex justify-between items-center p-6">
            <div class="flex-1"></div>
            <button (click)="toggleLanguage()" class="cc-btn cc-btn-compact flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              {{ language === 'es' ? 'Español' : 'English' }}
            </button>
          </div>

          <div class="flex-1 flex items-center justify-center p-6 md:p-12">
            <div class="w-full max-w-md">
              <div class="bg-white rounded-xl p-8 md:p-10 shadow-xl">
                <div *ngIf="!submitted">
                  <h1 class="text-2xl md:text-3xl font-mulish font-bold text-center text-gray-900 mb-2">{{ title }}</h1>
                  <p class="text-center text-sm text-gray-600 mb-8 font-georama">{{ subtitle }}</p>

                  <form (ngSubmit)="onSubmit()" class="space-y-5">
                    <div>
                      <label class="block text-xs font-mulish font-semibold text-gray-700 uppercase tracking-wider mb-2">
                        {{ emailLbl }}
                      </label>
                      <input
                        type="email"
                        [(ngModel)]="email"
                        name="email"
                        [placeholder]="emailPlaceholder"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg font-georama text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      >
                    </div>

                    <div class="flex gap-3">
                      <a routerLink="/login" class="cc-btn flex-1 text-center py-3 whitespace-nowrap">
                        {{ cancelBtn }}
                      </a>
                      <button type="submit" class="cc-btn flex-1 py-3 whitespace-nowrap">
                        {{ submitBtn }} →
                      </button>
                    </div>
                  </form>
                </div>

                <div *ngIf="submitted" class="text-center">
                  <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #2d6281;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <h2 class="text-2xl font-mulish font-bold text-gray-900 mb-2">{{ successTitle }}</h2>
                  <p class="text-gray-600 mb-6 font-georama">{{ successMessage }}</p>
                  <a routerLink="/login" class="cc-btn inline-block">
                    {{ backToLoginBtn }} →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop footer -->
      <div class="bg-white border-t border-gray-200 px-6 py-4">
        <div class="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500 font-georama w-full">
          <p>© 2024 ClimateConnector. {{ footerText }}</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-gray-700 transition-colors">{{ privacyText }}</a>
            <a href="#" class="hover:text-gray-700 transition-colors">{{ termsText }}</a>
            <a href="#" class="hover:text-gray-700 transition-colors">{{ supportText }}</a>
            <a href="#" class="hover:text-gray-700 transition-colors">{{ sitemapText }}</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile layout -->
    <div class="md:hidden flex flex-col min-h-screen font-georama relative z-10">
      <!-- Header -->
      <div class="flex justify-between items-center px-4 py-3">
        <a href="https://canalclima.com/" target="_blank">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F637d28ba8e164481b22cf6c6cf2c694c"
            alt="Canal Clima"
            class="h-8 w-auto"
          >
        </a>
        <button (click)="toggleLanguage()" class="cc-btn cc-btn-compact flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
          </svg>
          <span class="text-sm">{{ language === 'es' ? 'ES' : 'EN' }}</span>
        </button>
      </div>

      <!-- Branding section -->
      <div class="flex flex-col items-center px-6 pt-2 pb-4">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fca1ae3e32aff44c69d5f1f5c5fc638ce"
          alt="Climate Connector"
          class="w-40 h-auto object-contain"
        >
      </div>

      <!-- Spacer for globe -->
      <div class="flex-1 min-h-[25vh]"></div>

      <!-- Forgot Password Form Section (blue background) -->
      <div class="bg-slate-900 px-4 pt-6 pb-4">
        <div class="bg-white rounded-xl p-5 shadow-xl">
          <div *ngIf="!submitted">
            <h1 class="text-lg font-mulish font-bold text-center text-gray-900 mb-1">{{ title }}</h1>
            <p class="text-center text-xs text-gray-600 mb-4 font-georama">{{ subtitle }}</p>

            <form (ngSubmit)="onSubmit()" class="space-y-3">
              <div>
                <label class="block text-xs font-mulish font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  {{ emailLbl }}
                </label>
                <input
                  type="email"
                  [(ngModel)]="email"
                  name="email"
                  [placeholder]="emailPlaceholder"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg font-georama text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
              </div>

              <div class="flex gap-3">
                <a routerLink="/login" class="cc-btn flex-1 text-center py-3 whitespace-nowrap">
                  {{ cancelBtn }}
                </a>
                <button type="submit" class="cc-btn flex-1 py-3 whitespace-nowrap">
                  {{ submitBtn }} →
                </button>
              </div>
            </form>
          </div>

          <div *ngIf="submitted" class="text-center">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #2d6281;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <h2 class="text-xl font-mulish font-bold text-gray-900 mb-2">{{ successTitle }}</h2>
            <p class="text-gray-600 mb-6 font-georama text-sm">{{ successMessage }}</p>
            <a routerLink="/login" class="cc-btn inline-block">
              {{ backToLoginBtn }} →
            </a>
          </div>
        </div>
      </div>

      <!-- Mobile footer -->
      <div class="px-4 py-3 text-center bg-slate-900">
        <p class="text-xs text-gray-400 font-georama">© 2024 ClimateConnector. {{ footerText }}</p>
        <div class="flex justify-center gap-4 mt-1">
          <a href="#" class="text-xs text-gray-400 hover:text-gray-300 transition-colors">{{ privacyText }}</a>
          <a href="#" class="text-xs text-gray-400 hover:text-gray-300 transition-colors">{{ termsText }}</a>
          <a href="#" class="text-xs text-gray-400 hover:text-gray-300 transition-colors">{{ supportText }}</a>
          <a href="#" class="text-xs text-gray-400 hover:text-gray-300 transition-colors">{{ sitemapText }}</a>
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
export class ForgotPasswordComponent {
  email = '';
  language: 'es' | 'en' = 'es';
  submitted = false;

  private en = {
    title: 'RECOVER PASSWORD',
    subtitle: 'Enter your institutional email to receive the recovery instructions.',
    emailLbl: 'EMAIL',
    emailPlaceholder: 'Enter your email',
    cancelBtn: 'CANCEL',
    submitBtn: 'SEND',
    successTitle: 'Email Sent!',
    successMessage: 'Recovery instructions have been sent to your email.',
    backToLoginBtn: 'BACK TO LOGIN',
    footerText: 'All rights reserved. Professional climate monitoring network.',
    brandingText: 'Canal Clima provides weather forecasts in Spanish for Colombia, Latin America and the world.',
    privacyText: 'Privacy',
    termsText: 'Terms of Use',
    supportText: 'Technical Support',
    sitemapText: 'Site Map'
  };

  private es = {
    title: 'RECUPERAR CONTRASEÑA',
    subtitle: 'Ingresa tu correo electrónico institucional para recibir las instrucciones de recuperación.',
    emailLbl: 'CORREO ELECTRÓNICO',
    emailPlaceholder: 'Ingrese su correo',
    cancelBtn: 'CANCELAR',
    submitBtn: 'ENVIAR',
    successTitle: '¡Correo Enviado!',
    successMessage: 'Se han enviado las instrucciones de recuperación a tu correo electrónico.',
    backToLoginBtn: 'VOLVER AL LOGIN',
    footerText: 'Todos los derechos reservados. Red de monitoreo climático profesional.',
    brandingText: 'Canal Clima provee pronósticos del estado del tiempo en español para Colombia, Latinoamérica y el mundo.',
    privacyText: 'Privacidad',
    termsText: 'Términos de Uso',
    supportText: 'Soporte Técnico',
    sitemapText: 'Mapa del Sitio'
  };

  get title() { return this.language === 'es' ? this.es.title : this.en.title; }
  get subtitle() { return this.language === 'es' ? this.es.subtitle : this.en.subtitle; }
  get emailLbl() { return this.language === 'es' ? this.es.emailLbl : this.en.emailLbl; }
  get emailPlaceholder() { return this.language === 'es' ? this.es.emailPlaceholder : this.en.emailPlaceholder; }
  get cancelBtn() { return this.language === 'es' ? this.es.cancelBtn : this.en.cancelBtn; }
  get submitBtn() { return this.language === 'es' ? this.es.submitBtn : this.en.submitBtn; }
  get successTitle() { return this.language === 'es' ? this.es.successTitle : this.en.successTitle; }
  get successMessage() { return this.language === 'es' ? this.es.successMessage : this.en.successMessage; }
  get backToLoginBtn() { return this.language === 'es' ? this.es.backToLoginBtn : this.en.backToLoginBtn; }
  get footerText() { return this.language === 'es' ? this.es.footerText : this.en.footerText; }
  get brandingText() { return this.language === 'es' ? this.es.brandingText : this.en.brandingText; }
  get privacyText() { return this.language === 'es' ? this.es.privacyText : this.en.privacyText; }
  get termsText() { return this.language === 'es' ? this.es.termsText : this.en.termsText; }
  get supportText() { return this.language === 'es' ? this.es.supportText : this.en.supportText; }
  get sitemapText() { return this.language === 'es' ? this.es.sitemapText : this.en.sitemapText; }

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  onSubmit() {
    this.submitted = true;
  }
}
