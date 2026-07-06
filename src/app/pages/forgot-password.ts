import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GlobeBannerComponent } from '../components/globe-banner';
import { FormFieldComponent } from '../shared/form-field';
import { getBrandingCopy, BrandingCopy } from '../shared/branding-copy';

type FieldState = 'default' | 'error' | 'success';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, GlobeBannerComponent, FormFieldComponent],
  template: `
    <!-- Globe background (fixed full-screen, z-0) -->
    <app-globe-banner [skipAnimation]="true"></app-globe-banner>

    <!-- Desktop layout -->
    <div class="hidden md:flex min-h-screen flex-col font-georama relative z-10">
      <div class="flex-1 flex min-h-0">
        <!-- Left side - Branding (transparent, globe visible behind) -->
        <div class="md:w-1/2 flex flex-col relative min-h-0">
          <div class="p-4">
            <a href="https://canalclima.com/" target="_blank">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F637d28ba8e164481b22cf6c6cf2c694c"
                alt="Canal Clima"
                class="h-8 w-auto"
              >
            </a>
          </div>
          <div class="flex-1 min-h-0 overflow-y-auto flex flex-col justify-start items-center pt-3 pb-2 px-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fca1ae3e32aff44c69d5f1f5c5fc638ce"
              alt="Climate Connector"
              class="w-32 h-auto object-contain mb-1"
            >
            <h2 class="text-lg font-mulish font-bold text-center text-gray-900 mb-1.5">{{ branding.headline }}</h2>
            <p class="text-center text-xs text-gray-600 mb-6 max-w-lg font-georama leading-relaxed">{{ branding.description }}</p>

            <div class="grid grid-cols-4 gap-3 max-w-2xl w-full">
              @for (f of branding.features; track f.icon) {
                <div class="flex flex-col items-center text-center">
                  <img [src]="'/icons/' + f.icon + '.svg'" [alt]="f.title" class="w-7 h-7 mb-1">
                  <h3 class="text-xs font-mulish font-bold text-gray-900 mb-0.5">{{ f.title }}</h3>
                  <p class="text-xs text-gray-600 font-georama leading-tight">{{ f.desc }}</p>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Right side - Forgot Password Form -->
        <div class="md:w-1/2 flex flex-col relative overflow-hidden bg-gradient-to-br from-petroleo via-[#0E2D4D] to-baltico min-h-0">
          <div class="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cian/25 blur-3xl"></div>
          <div class="pointer-events-none absolute -bottom-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-cyan-400/15 blur-3xl"></div>

          <div class="relative z-10 flex justify-between items-center p-6">
            <div class="flex-1"></div>
            <button (click)="toggleLanguage()" class="cc-btn cc-btn-compact flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              {{ language === 'es' ? 'Español' : 'English' }}
            </button>
          </div>

          <div class="relative z-10 flex-1 min-h-0 overflow-y-auto flex items-center justify-center p-6 md:p-12">
            <div class="w-full max-w-md">
              <div class="bg-white rounded-2xl p-5 md:p-7 ring-1 ring-white/40 shadow-2xl shadow-petroleo/40">
                <div *ngIf="!submitted">
                  <div class="flex items-center justify-center gap-2 mb-1">
                    <span class="material-symbols-outlined text-baltico text-[20px]">lock_reset</span>
                    <h1 class="text-xl md:text-2xl font-mulish font-bold text-center text-petroleo tracking-tight">{{ title }}</h1>
                  </div>
                  <p class="text-center text-sm text-gris-dark mb-4 font-georama">{{ subtitle }}</p>

                  <form (ngSubmit)="onSubmit()" class="space-y-3" novalidate>
                    <app-form-field
                      [label]="emailLbl"
                      type="email"
                      [placeholder]="emailPlaceholder"
                      name="email"
                      autocomplete="email"
                      leadingIcon="mail"
                      [required]="true"
                      [(ngModel)]="email"
                      [state]="emailState"
                      [errorMessage]="emailError"
                      [successMessage]="emailSuccess"
                      (blurred)="emailTouched = true"
                    ></app-form-field>

                    <div class="flex gap-3 pt-1">
                      <a routerLink="/login" class="cc-btn flex-1 text-center py-3 whitespace-nowrap">
                        {{ cancelBtn }}
                      </a>
                      <button
                        type="submit"
                        class="cc-btn flex-1 whitespace-nowrap"
                      >
                        {{ submitBtn }} →
                      </button>
                    </div>
                  </form>
                </div>

                <div *ngIf="submitted" class="text-center">
                  <div class="mx-auto mb-4 w-16 h-16 rounded-full bg-blue-bg flex items-center justify-center">
                    <span class="material-symbols-outlined text-baltico text-[36px]">mark_email_read</span>
                  </div>
                  <h2 class="text-2xl font-mulish font-bold text-petroleo mb-2">{{ successTitle }}</h2>
                  <p class="text-gris-dark mb-6 font-georama">{{ successMessage }}</p>
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
      <div class="bg-white border-t border-gray-200 px-6 py-3">
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
      <div class="flex flex-col items-center px-6 pt-2 pb-3">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fca1ae3e32aff44c69d5f1f5c5fc638ce"
          alt="Climate Connector"
          class="w-32 h-auto object-contain"
        >
      </div>

      <!-- Spacer for globe -->
      <div class="flex-1 min-h-[20vh]"></div>

      <!-- Forgot Password Form Section (gradient background) -->
      <div class="relative overflow-hidden bg-gradient-to-t from-petroleo to-baltico px-4 pt-5 pb-3">
        <div class="pointer-events-none absolute -top-12 right-0 w-64 h-64 rounded-full bg-cian/20 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-16 -left-10 w-72 h-72 rounded-full bg-cyan-400/15 blur-3xl"></div>

        <div class="relative bg-white rounded-2xl p-5 ring-1 ring-white/40 shadow-2xl shadow-petroleo/40">
          <div *ngIf="!submitted">
            <div class="flex items-center justify-center gap-2 mb-0.5">
              <span class="material-symbols-outlined text-baltico text-[18px]">lock_reset</span>
              <h1 class="text-lg font-mulish font-bold text-center text-petroleo tracking-tight">{{ title }}</h1>
            </div>
            <p class="text-center text-xs text-gris-dark mb-3 font-georama">{{ subtitle }}</p>

            <form (ngSubmit)="onSubmit()" class="space-y-3" novalidate>
              <app-form-field
                [label]="emailLbl"
                type="email"
                [placeholder]="emailPlaceholder"
                name="email-m"
                autocomplete="email"
                leadingIcon="mail"
                [required]="true"
                [(ngModel)]="email"
                [state]="emailState"
                [errorMessage]="emailError"
                [successMessage]="emailSuccess"
                (blurred)="emailTouched = true"
              ></app-form-field>

              <div class="flex gap-3 pt-1">
                <a routerLink="/login" class="cc-btn flex-1 text-center py-3 whitespace-nowrap">
                  {{ cancelBtn }}
                </a>
                <button
                  type="submit"
                  class="cc-btn flex-1 whitespace-nowrap"
                >
                  {{ submitBtn }} →
                </button>
              </div>
            </form>
          </div>

          <div *ngIf="submitted" class="text-center">
            <div class="mx-auto mb-4 w-14 h-14 rounded-full bg-blue-bg flex items-center justify-center">
              <span class="material-symbols-outlined text-baltico text-[32px]">mark_email_read</span>
            </div>
            <h2 class="text-xl font-mulish font-bold text-petroleo mb-2">{{ successTitle }}</h2>
            <p class="text-gris-dark mb-6 font-georama text-sm">{{ successMessage }}</p>
            <a routerLink="/login" class="cc-btn inline-block">
              {{ backToLoginBtn }} →
            </a>
          </div>
        </div>
      </div>

      <!-- Mobile footer -->
      <div class="px-4 py-2 text-center bg-petroleo">
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
  emailTouched = false;
  language: 'es' | 'en' = 'es';
  submitted = false;

  private en = {
    title: 'RECOVER PASSWORD',
    subtitle: 'Enter your institutional email to receive the recovery instructions.',
    emailLbl: 'EMAIL',
    emailPlaceholder: 'Enter your email',
    emailRequired: 'Please enter your email.',
    emailInvalid: 'Please enter a valid email address.',
    emailOk: 'Email looks good.',
    cancelBtn: 'CANCEL',
    submitBtn: 'SEND',
    successTitle: 'Email Sent!',
    successMessage: 'Recovery instructions have been sent to your email.',
    backToLoginBtn: 'BACK TO LOGIN',
    footerText: 'All rights reserved. Professional climate monitoring network.',
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
    emailRequired: 'Ingrese su correo electrónico.',
    emailInvalid: 'Ingrese un correo electrónico válido.',
    emailOk: 'Correo electrónico válido.',
    cancelBtn: 'CANCELAR',
    submitBtn: 'ENVIAR',
    successTitle: '¡Correo Enviado!',
    successMessage: 'Se han enviado las instrucciones de recuperación a tu correo electrónico.',
    backToLoginBtn: 'VOLVER AL LOGIN',
    footerText: 'Todos los derechos reservados. Red de monitoreo climático profesional.',
    privacyText: 'Privacidad',
    termsText: 'Términos de Uso',
    supportText: 'Soporte Técnico',
    sitemapText: 'Mapa del Sitio'
  };

  get t() { return this.language === 'es' ? this.es : this.en; }
  get title() { return this.t.title; }
  get subtitle() { return this.t.subtitle; }
  get emailLbl() { return this.t.emailLbl; }
  get emailPlaceholder() { return this.t.emailPlaceholder; }
  get cancelBtn() { return this.t.cancelBtn; }
  get submitBtn() { return this.t.submitBtn; }
  get successTitle() { return this.t.successTitle; }
  get successMessage() { return this.t.successMessage; }
  get backToLoginBtn() { return this.t.backToLoginBtn; }
  get footerText() { return this.t.footerText; }
  get privacyText() { return this.t.privacyText; }
  get termsText() { return this.t.termsText; }
  get supportText() { return this.t.supportText; }
  get sitemapText() { return this.t.sitemapText; }
  get branding(): BrandingCopy { return getBrandingCopy(this.language); }

  private isWellFormedEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  get emailError(): string {
    if (!this.emailTouched) return '';
    const v = this.email.trim();
    if (!v) return this.t.emailRequired;
    if (!this.isWellFormedEmail(v)) return this.t.emailInvalid;
    return '';
  }

  get emailSuccess(): string {
    return this.emailTouched && this.isWellFormedEmail(this.email.trim()) ? this.t.emailOk : '';
  }

  get emailState(): FieldState {
    if (this.emailError) return 'error';
    if (this.emailTouched && this.isWellFormedEmail(this.email.trim())) return 'success';
    return 'default';
  }

  isEmailValid(): boolean {
    return this.isWellFormedEmail(this.email.trim());
  }

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  onSubmit() {
    this.emailTouched = true;
    if (!this.isEmailValid()) return;
    this.submitted = true;
  }
}
