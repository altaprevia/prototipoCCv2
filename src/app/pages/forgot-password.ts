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
          <div class="cc-left-particles" aria-hidden="true"></div>
          <div class="p-4">
            <a href="https://canalclima.com/" target="_blank">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F637d28ba8e164481b22cf6c6cf2c694c"
                alt="Canal Clima"
                class="h-8 w-auto"
              >
            </a>
          </div>
          <div class="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-start gap-[2vh] lg:gap-[3vh] pt-[1.5vh] lg:pt-[3vh] xl:pt-[4vh] pb-2 px-6">
            <div class="flex flex-col items-center px-6 max-w-[420px]">
              <h2 class="text-lg lg:text-xl font-mulish font-bold text-center text-gray-900 mb-1">{{ branding.headline }}</h2>
              <p class="text-center text-xs lg:text-sm text-gray-600 mb-0 max-w-lg font-georama leading-relaxed">{{ branding.description }}</p>
            </div>

            <div class="w-full px-6">
              <div class="grid grid-cols-4 gap-3 lg:gap-4 max-w-2xl mx-auto">
                @for (f of branding.features; track f.icon) {
                  <div class="cc-feature-card group">
                    <div class="mb-2 flex h-14 w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 items-center justify-center rounded-2xl bg-blue-bg/80">
                      <img [src]="'/icons/' + f.icon + '.svg'" [alt]="f.title" class="w-8 h-8 lg:w-9 lg:h-9 xl:w-11 xl:h-11">
                    </div>
                    <h3 class="text-xs lg:text-sm font-mulish font-bold text-gray-900 mb-0.5">{{ f.title }}</h3>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Right side - Forgot Password Form -->
        <div class="md:w-1/2 flex flex-col relative overflow-hidden bg-gradient-to-br from-petroleo via-[#0E2D4D] to-baltico min-h-0">
          <div class="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cian/25 blur-3xl"></div>
          <div class="pointer-events-none absolute -bottom-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-cyan-400/15 blur-3xl"></div>

          <div class="relative z-10 flex justify-between items-center p-6">
            <div class="flex-1"></div>
            <button (click)="toggleLanguage()" class="cc-btn cc-btn-compact cc-btn-lang flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              <span class="text-sm">{{ language === 'es' ? 'ES' : 'EN' }}</span>
            </button>
          </div>

          <div class="relative z-10 flex-1 min-h-0 overflow-y-auto flex items-center justify-center p-6 md:p-12">
            <div class="w-full max-w-md">
              <div class="bg-white rounded-2xl p-6 ring-1 ring-white/40 shadow-2xl shadow-petroleo/40">
                <div *ngIf="!submitted">
                  <div class="flex justify-center mb-1">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fb2dabcde44f14e6b8f9554d3b9a52e18"
                      alt="Climate Connector"
                      class="w-32 h-auto object-contain"
                    >
                  </div>
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
                        class="cc-btn-primary flex-1 whitespace-nowrap"
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
                  <div class="flex gap-3 justify-center pt-1">
                    <a routerLink="/change-password" class="cc-btn-primary flex-1 whitespace-nowrap">
                      {{ changePasswordBtn }} →
                    </a>
                    <a routerLink="/login" class="cc-btn flex-1 text-center py-3 whitespace-nowrap">
                      {{ backToLoginBtn }}
                    </a>
                  </div>
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
    <div class="md:hidden flex flex-col min-h-screen font-georama relative z-10" style="background: linear-gradient(to bottom, white 0%, rgba(0,98,129,0) 15%, rgba(0,98,129,0.4) 35%, rgba(0,98,129,1) 65%);">
      <!-- Header -->
      <div class="flex justify-between items-center px-4 py-3">
        <a href="https://canalclima.com/" target="_blank">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F637d28ba8e164481b22cf6c6cf2c694c"
            alt="Canal Clima"
            class="h-8 w-auto"
          >
        </a>
        <button (click)="toggleLanguage()" class="cc-btn cc-btn-compact cc-btn-lang flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
          </svg>
          <span class="text-sm">{{ language === 'es' ? 'ES' : 'EN' }}</span>
        </button>
      </div>

      <!-- Branding section -->
      <div class="flex flex-col items-center px-6 pt-2 pb-3">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fb2dabcde44f14e6b8f9554d3b9a52e18"
          alt="Climate Connector"
          class="w-32 h-auto object-contain"
        >
      </div>

      <!-- Spacer for globe -->
      <div class="flex-1 min-h-[10vh]"></div>

      <!-- Forgot Password Form Section (inherits gradient from parent) -->
      <div class="relative overflow-hidden px-4 pt-10 pb-5 flex flex-col flex-1">
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
                  class="cc-btn-primary flex-1 whitespace-nowrap"
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
            <div class="flex flex-col gap-3 pt-1">
              <a routerLink="/change-password" class="cc-btn-primary w-full whitespace-nowrap">
                {{ changePasswordBtn }} →
              </a>
              <a routerLink="/login" class="cc-btn w-full text-center py-3 whitespace-nowrap">
                {{ backToLoginBtn }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile footer -->
      <div class="px-4 pt-4 pb-3 text-center text-white/80">
        <p class="text-xs font-georama">© 2024 ClimateConnector. {{ footerText }}</p>
        <div class="mt-1.5 text-xs font-georama">
          <a href="#" class="text-white/80 hover:text-cian transition-colors">{{ privacyText }}</a>
          <span class="text-white/40 mx-2">|</span>
          <a href="#" class="text-white/80 hover:text-cian transition-colors">{{ termsText }}</a>
          <span class="text-white/40 mx-2">|</span>
          <a href="#" class="text-white/80 hover:text-cian transition-colors">{{ supportText }}</a>
          <span class="text-white/40 mx-2">|</span>
          <a href="#" class="text-white/80 hover:text-cian transition-colors">{{ sitemapText }}</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .cc-left-particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.48;
      background-image:
        radial-gradient(circle at 8% 12%, rgba(15, 23, 110, 0.75) 0 1.8px, transparent 2.1px),
        radial-gradient(circle at 17% 31%, rgba(29, 78, 216, 0.66) 0 1.5px, transparent 1.9px),
        radial-gradient(circle at 27% 18%, rgba(30, 58, 138, 0.7) 0 1.6px, transparent 2px),
        radial-gradient(circle at 39% 41%, rgba(30, 64, 175, 0.62) 0 1.7px, transparent 2px),
        radial-gradient(circle at 48% 22%, rgba(37, 99, 235, 0.64) 0 1.5px, transparent 1.9px),
        radial-gradient(circle at 61% 34%, rgba(8, 47, 73, 0.72) 0 1.4px, transparent 1.8px),
        radial-gradient(circle at 74% 16%, rgba(30, 64, 175, 0.67) 0 1.8px, transparent 2.1px),
        radial-gradient(circle at 86% 27%, rgba(14, 116, 144, 0.62) 0 1.4px, transparent 1.8px),
        radial-gradient(circle at 11% 62%, rgba(23, 37, 84, 0.72) 0 1.7px, transparent 2px),
        radial-gradient(circle at 25% 73%, rgba(29, 78, 216, 0.64) 0 1.5px, transparent 1.9px),
        radial-gradient(circle at 38% 66%, rgba(30, 64, 175, 0.68) 0 1.6px, transparent 2px),
        radial-gradient(circle at 52% 78%, rgba(12, 74, 110, 0.66) 0 1.4px, transparent 1.8px),
        radial-gradient(circle at 67% 69%, rgba(30, 58, 138, 0.69) 0 1.7px, transparent 2px),
        radial-gradient(circle at 81% 74%, rgba(37, 99, 235, 0.62) 0 1.5px, transparent 1.9px),
        radial-gradient(circle at 93% 61%, rgba(30, 64, 175, 0.7) 0 1.8px, transparent 2.1px),
        radial-gradient(circle at 5% 88%, rgba(14, 116, 144, 0.62) 0 1.4px, transparent 1.8px),
        radial-gradient(circle at 44% 92%, rgba(30, 64, 175, 0.68) 0 1.6px, transparent 2px),
        radial-gradient(circle at 88% 89%, rgba(15, 23, 110, 0.73) 0 1.8px, transparent 2.1px),
        radial-gradient(circle at 20% 49%, rgba(23, 37, 84, 0.72) 0 1.5px, transparent 1.9px),
        radial-gradient(circle at 57% 52%, rgba(30, 64, 175, 0.66) 0 1.4px, transparent 1.8px),
        radial-gradient(circle at 71% 48%, rgba(14, 116, 144, 0.62) 0 1.3px, transparent 1.7px),
        radial-gradient(circle at 34% 55%, rgba(29, 78, 216, 0.64) 0 1.4px, transparent 1.8px),
        radial-gradient(circle at 90% 44%, rgba(30, 58, 138, 0.68) 0 1.5px, transparent 1.9px),
        radial-gradient(circle at 6% 43%, rgba(37, 99, 235, 0.62) 0 1.3px, transparent 1.7px),
        radial-gradient(circle at 47% 36%, rgba(15, 23, 110, 0.72) 0 1.4px, transparent 1.8px);
      background-size:
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px;
      animation: ccParticleFloat 30s linear infinite;
      z-index: 0;
    }

    .cc-left-particles::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        radial-gradient(circle at 13% 9%, rgba(224, 242, 254, 0.75) 0 0.8px, transparent 1.1px),
        radial-gradient(circle at 29% 27%, rgba(191, 219, 254, 0.62) 0 0.75px, transparent 1px),
        radial-gradient(circle at 43% 14%, rgba(186, 230, 253, 0.68) 0 0.8px, transparent 1.1px),
        radial-gradient(circle at 58% 32%, rgba(191, 219, 254, 0.58) 0 0.7px, transparent 0.95px),
        radial-gradient(circle at 72% 21%, rgba(224, 242, 254, 0.72) 0 0.8px, transparent 1.1px),
        radial-gradient(circle at 84% 37%, rgba(186, 230, 253, 0.63) 0 0.7px, transparent 0.95px),
        radial-gradient(circle at 7% 56%, rgba(191, 219, 254, 0.63) 0 0.75px, transparent 1px),
        radial-gradient(circle at 24% 72%, rgba(224, 242, 254, 0.75) 0 0.8px, transparent 1.1px),
        radial-gradient(circle at 46% 63%, rgba(186, 230, 253, 0.61) 0 0.7px, transparent 0.95px),
        radial-gradient(circle at 63% 79%, rgba(191, 219, 254, 0.65) 0 0.75px, transparent 1px),
        radial-gradient(circle at 79% 67%, rgba(224, 242, 254, 0.72) 0 0.8px, transparent 1.1px),
        radial-gradient(circle at 91% 83%, rgba(186, 230, 253, 0.62) 0 0.7px, transparent 0.95px),
        radial-gradient(circle at 36% 46%, rgba(224, 242, 254, 0.7) 0 0.75px, transparent 1px),
        radial-gradient(circle at 54% 57%, rgba(191, 219, 254, 0.62) 0 0.7px, transparent 0.95px),
        radial-gradient(circle at 68% 49%, rgba(186, 230, 253, 0.64) 0 0.75px, transparent 1px),
        radial-gradient(circle at 15% 47%, rgba(224, 242, 254, 0.72) 0 0.8px, transparent 1.1px),
        radial-gradient(circle at 82% 53%, rgba(191, 219, 254, 0.6) 0 0.7px, transparent 0.95px);
      background-size:
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px,
        420px 300px;
      opacity: 0.52;
      animation: ccParticleFloatReverse 36s linear infinite;
    }

    .cc-left-particles::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
      opacity: 0.35;
    }

    @keyframes ccParticleFloat {
      0% {
        background-position: 0 0, 0 0, 0 0, 0 0;
      }
      100% {
        background-position: 140px -84px, -110px 78px, 98px -66px, -90px 62px;
      }
    }

    @keyframes ccParticleFloatReverse {
      0% {
        background-position: 0 0, 0 0;
      }
      100% {
        background-position: -88px 64px, 76px -58px;
      }
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
    changePasswordBtn: 'CHANGE PASSWORD',
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
    changePasswordBtn: 'CAMBIAR CONTRASEÑA',
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
  get changePasswordBtn() { return this.t.changePasswordBtn; }
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
