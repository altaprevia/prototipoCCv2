import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GlobeBannerComponent } from '../components/globe-banner';
import { FormFieldComponent } from '../shared/form-field';
import { getBrandingCopy, BrandingCopy } from '../shared/branding-copy';

type FieldState = 'default' | 'error' | 'success';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, GlobeBannerComponent, FormFieldComponent],
  template: `
    <!-- Globe background (fixed full-screen, z-0) -->
    <app-globe-banner (animationComplete)="onGlobeReady()" [skipAnimation]="skipIntro"></app-globe-banner>

    <!-- Intro overlay: logo ARRIBA del planeta -->
    <div
      class="fixed inset-0 z-50 flex flex-col items-center pointer-events-none transition-opacity duration-1000"
      [class.opacity-0]="!showingIntro"
      style="padding-top: 5vh;"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fb2dabcde44f14e6b8f9554d3b9a52e18"
        alt="Climate Connector"
        class="w-40 h-auto drop-shadow-md"
      >
    </div>

    <!-- Main UI (z-10, hidden during intro) -->
    <div
      class="fixed inset-0 z-10 flex flex-col font-georama transition-opacity duration-1000 overflow-hidden"
      [class.opacity-0]="showingIntro"
      [class.pointer-events-none]="showingIntro"
    >
      <!-- Desktop layout -->
      <div class="hidden md:flex flex-1 min-h-0">
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

        <!-- Right side - Login Form (gradient background) -->
        <div class="md:w-1/2 flex flex-col relative overflow-hidden bg-gradient-to-br from-petroleo via-[#0E2D4D] to-baltico min-h-0">
          <!-- Decorative blobs -->
          <div class="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cian/25 blur-3xl"></div>
          <div class="pointer-events-none absolute -bottom-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-cyan-400/15 blur-3xl"></div>

          <div class="relative z-10 flex justify-between items-center p-3">
            <div class="flex-1"></div>
            <button (click)="toggleLanguage()" class="cc-btn cc-btn-compact cc-btn-lang flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              <span class="text-sm">{{ language === 'es' ? 'ES' : 'EN' }}</span>
            </button>
          </div>

          <div class="relative z-10 flex-1 min-h-0 overflow-y-auto flex items-center justify-center p-4">
            <div class="w-full max-w-md">
              <div class="bg-white rounded-2xl p-5 ring-1 ring-white/40 shadow-2xl shadow-petroleo/40">
                <div class="flex justify-center mb-1">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fb2dabcde44f14e6b8f9554d3b9a52e18"
                    alt="Climate Connector"
                    class="w-32 h-auto object-contain"
                  >
                </div>
                <div class="flex items-center justify-center gap-2 mb-0.5">
                  <h1 class="text-xl font-mulish font-bold text-center text-petroleo tracking-tight">{{ loginTitle }}</h1>
                </div>
                <p class="text-center text-sm text-gris-dark mb-2 font-georama">{{ loginSubtitle }}</p>

                <form (ngSubmit)="onLogin()" class="flex flex-col gap-2" novalidate>
                  <app-form-field
                    [label]="usernameLbl"
                    type="text"
                    [placeholder]="usernamePlaceholder"
                    name="username"
                    autocomplete="username"
                    leadingIcon="person"
                    [required]="true"
                    [(ngModel)]="username"
                    [state]="usernameState"
                    [errorMessage]="usernameError"
                    [successMessage]="usernameSuccess"
                    (blurred)="usernameTouched = true"
                  ></app-form-field>

                  <app-form-field
                    [label]="passwordLbl"
                    [type]="showPassword ? 'text' : 'password'"
                    [placeholder]="passwordPlaceholder"
                    name="password"
                    autocomplete="current-password"
                    leadingIcon="lock"
                    [required]="true"
                    [(ngModel)]="password"
                    [state]="passwordState"
                    [errorMessage]="passwordError"
                    [successMessage]="passwordSuccess"
                    [hasTrailing]="true"
                    (blurred)="passwordTouched = true"
                  >
                    <button
                      trailing
                      type="button"
                      (click)="togglePasswordVisibility()"
                      [attr.aria-label]="showPasswordAria"
                      [attr.aria-pressed]="showPassword"
                      class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-2xl text-gris-medio hover:text-baltico hover:bg-blue-bg transition-colors focus:outline-none focus:ring-2 focus:ring-cian/40"
                    >
                      <span class="material-symbols-outlined text-[20px]">
                        {{ showPassword ? 'visibility_off' : 'visibility' }}
                      </span>
                    </button>
                  </app-form-field>

                  <label class="flex items-center gap-2 cursor-pointer select-none mt-0.5">
                    <input
                      type="checkbox"
                      name="remember"
                      [(ngModel)]="rememberMe"
                      class="w-4 h-4 rounded border-2 border-gris-medio text-baltico focus:ring-2 focus:ring-cian/40 focus:ring-offset-0 focus:border-baltico transition-colors"
                    >
                    <span class="text-sm text-petroleo font-georama">{{ keepSessionText }}</span>
                  </label>

                  <button
                    type="submit"
                    class="cc-btn-primary w-full mt-0.5"
                  >
                    {{ loginBtn }} →
                  </button>
                </form>

                <div class="mt-2 pt-1.5 border-t border-dashed border-gris-base space-y-1">
                  <a routerLink="/forgot-password" class="cc-link-quiet">
                    <span class="material-symbols-outlined cc-link-quiet__icon text-[18px]">lock_reset</span>
                    <span>{{ forgotPasswordText }}</span>
                  </a>
                  <a href="https://canalclima.com/index.php/contacto/" target="_blank" rel="noopener" class="cc-link-quiet">
                    <span class="material-symbols-outlined cc-link-quiet__icon text-[18px]">contact_support</span>
                    <span>{{ requestAccessText }}</span>
                  </a>
                </div>

                <p class="text-center text-[13px] text-gris-dark mt-1.5 font-georama leading-relaxed">
                  {{ contactText }} <span class="font-semibold text-petroleo">+57 316 584 7114</span> {{ contactText2 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop footer -->
      <div class="hidden md:flex bg-white border-t border-gray-200 px-4 py-1.5">
        <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 font-georama w-full">
          <p>© 2024 ClimateConnector. {{ footerText }}</p>
          <div class="flex gap-4">
            <a href="#" class="hover:text-gray-700 transition-colors">Privacidad</a>
            <a href="#" class="hover:text-gray-700 transition-colors">Términos</a>
            <a href="#" class="hover:text-gray-700 transition-colors">Soporte</a>
          </div>
        </div>
      </div>

      <!-- Mobile layout -->
      <div class="md:hidden flex flex-col flex-1" style="background: linear-gradient(to bottom, white 0%, rgba(0,98,129,0) 15%, rgba(0,98,129,0.4) 35%, rgba(0,98,129,1) 65%);">
        <!-- Header -->
        <div class="flex justify-between items-center p-4">
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
            class="w-40 h-auto object-contain"
          >
        </div>

        <!-- Spacer to push form down, globe visible here -->
        <div class="flex-1 min-h-[10vh]"></div>

        <!-- Login Form Section (inherits gradient from parent) -->
        <div class="relative overflow-hidden pt-10 pb-5 flex flex-col">
          <div class="pointer-events-none absolute -top-12 right-0 w-64 h-64 rounded-full bg-cian/20 blur-3xl"></div>
          <div class="pointer-events-none absolute top-1/3 -left-10 w-72 h-72 rounded-full bg-cyan-400/15 blur-3xl"></div>

          <div class="relative px-4 flex-1 flex flex-col">
            <div class="cc-shell-card p-6 sm:p-7">
              <div class="flex items-start gap-3 mb-4">
                <div class="w-12 h-12 rounded-full bg-blue-bg flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-baltico text-[24px]">verified_user</span>
                </div>
                <div class="pt-0.5">
                  <h1 class="text-2xl font-mulish font-bold text-petroleo tracking-tight leading-tight">{{ loginTitle }}</h1>
                  <p class="text-sm text-gris-dark font-georama mt-0.5">{{ loginSubtitle }}</p>
                </div>
              </div>

              <form (ngSubmit)="onLogin()" class="flex flex-col gap-2.5" novalidate>
                <app-form-field
                  [label]="usernameLbl"
                  type="text"
                  [placeholder]="usernamePlaceholder"
                  name="username-m"
                  autocomplete="username"
                  leadingIcon="person"
                  [required]="true"
                  [(ngModel)]="username"
                  [state]="usernameState"
                  [errorMessage]="usernameError"
                  [successMessage]="usernameSuccess"
                  (blurred)="usernameTouched = true"
                ></app-form-field>

                <app-form-field
                  [label]="passwordLbl"
                  [type]="showPassword ? 'text' : 'password'"
                  [placeholder]="passwordPlaceholder"
                  name="password-m"
                  autocomplete="current-password"
                  leadingIcon="lock"
                  [required]="true"
                  [(ngModel)]="password"
                  [state]="passwordState"
                  [errorMessage]="passwordError"
                  [successMessage]="passwordSuccess"
                  [hasTrailing]="true"
                  (blurred)="passwordTouched = true"
                >
                  <button
                    trailing
                    type="button"
                    (click)="togglePasswordVisibility()"
                    [attr.aria-label]="showPasswordAria"
                    [attr.aria-pressed]="showPassword"
                    class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-2xl text-gris-medio hover:text-baltico hover:bg-blue-bg transition-colors focus:outline-none focus:ring-2 focus:ring-cian/40"
                  >
                    <span class="material-symbols-outlined text-[20px]">
                      {{ showPassword ? 'visibility_off' : 'visibility' }}
                    </span>
                  </button>
                  </app-form-field>

                <label class="flex items-center gap-2 cursor-pointer select-none mt-0.5">
                  <input
                    type="checkbox"
                    name="remember-m"
                    [(ngModel)]="rememberMe"
                    class="w-4 h-4 rounded border-2 border-gris-medio text-baltico focus:ring-2 focus:ring-cian/40 focus:ring-offset-0 focus:border-baltico transition-colors"
                  >
                  <span class="text-sm text-petroleo font-georama">{{ keepSessionText }}</span>
                </label>

                <button
                  type="submit"
                  class="cc-btn-primary w-full mt-1"
                >
                  {{ loginBtn }} →
                </button>
              </form>

              <div class="mt-4 space-y-2.5">
                <a routerLink="/forgot-password" class="cc-link-quiet">
                  <span class="material-symbols-outlined cc-link-quiet__icon text-[18px]">lock_reset</span>
                  <span>{{ forgotPasswordText }}</span>
                </a>
                <a href="https://canalclima.com/index.php/contacto/" target="_blank" rel="noopener" class="cc-link-quiet">
                  <span class="material-symbols-outlined cc-link-quiet__icon text-[18px]">help</span>
                  <span>{{ requestAccessText }}</span>
                </a>
              </div>

              <div class="mt-4 p-3 rounded-xl bg-blue-bg border border-blue-border flex items-start gap-3">
                <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-baltico text-[22px]">headset_mic</span>
                </div>
                <p class="text-[13px] text-petroleo font-georama leading-relaxed">
                  {{ contactText }} <span class="font-semibold">+57 316 584 7114</span> {{ contactText2 }}
                </p>
              </div>
            </div>
          </div>

          <!-- Footer (integrated in gradient) -->
          <div class="relative px-4 pt-5 pb-3 text-center text-white/80">
            <p class="text-xs font-georama">© 2024 ClimateConnector. {{ footerText }}</p>
            <div class="mt-1.5 text-xs font-georama">
              <a href="#" class="text-white/80 hover:text-cian transition-colors">Privacidad</a>
              <span class="text-white/40 mx-2">|</span>
              <a href="#" class="text-white/80 hover:text-cian transition-colors">Términos</a>
              <span class="text-white/40 mx-2">|</span>
              <a href="#" class="text-white/80 hover:text-cian transition-colors">Soporte</a>
            </div>
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
export class LoginComponent {
  username = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  usernameTouched = false;
  passwordTouched = false;
  language: 'es' | 'en' = 'es';
  showingIntro = true;
  skipIntro = false;

  private static readonly MIN_PASSWORD_LENGTH = 6;

  constructor(private router: Router) {
    this.skipIntro = this.router.navigated;
    this.showingIntro = !this.router.navigated;
  }

  private en = {
    loginTitle: 'Welcome',
    loginSubtitle: 'Access the control and monitoring panel',
    usernameLbl: 'USERNAME',
    usernamePlaceholder: 'Enter your username',
    usernameRequired: 'Please enter your username.',
    usernameOk: 'Username looks good.',
    passwordLbl: 'PASSWORD',
    passwordPlaceholder: 'Enter your password',
    passwordRequired: 'Please enter your password.',
    passwordShort: 'Password must be at least 6 characters.',
    passwordOk: 'Password meets the requirements.',
    loginBtn: 'LOGIN',
    keepSessionText: 'Keep me signed in',
    forgotPasswordText: 'Forgot your password?',
    requestAccessText: 'Request access to the platform',
    contactText: 'If you are not a customer, we appreciate you contacting the sales area at phone',
    contactText2: 'to assign our services.',
    footerText: 'All rights reserved. Professional climate monitoring network.',
    privacyText: 'Privacy',
    termsText: 'Terms of Use',
    supportText: 'Technical Support',
    sitemapText: 'Site Map',
    showPasswordLabel: 'Show password',
    hidePasswordLabel: 'Hide password'
  };

  private es = {
    loginTitle: 'Bienvenido',
    loginSubtitle: 'Acceda al panel de control y monitoreo',
    usernameLbl: 'NOMBRE DE USUARIO',
    usernamePlaceholder: 'Ingrese su usuario',
    usernameRequired: 'Ingrese su usuario.',
    usernameOk: 'Nombre de usuario válido.',
    passwordLbl: 'CONTRASEÑA',
    passwordPlaceholder: 'Ingrese su contraseña',
    passwordRequired: 'Ingrese su contraseña.',
    passwordShort: 'La contraseña debe tener al menos 6 caracteres.',
    passwordOk: 'Contraseña válida.',
    loginBtn: 'INGRESAR',
    keepSessionText: 'Mantener sesión activa',
    forgotPasswordText: '¿Olvidó su contraseña?',
    requestAccessText: 'Solicitar acceso a la plataforma',
    contactText: 'Si usted no es un cliente, agradecemos contactar con el área comercial al teléfono',
    contactText2: 'para asignar nuestros servicios.',
    footerText: 'Todos los derechos reservados. Red de monitoreo climático profesional.',
    privacyText: 'Privacidad',
    termsText: 'Términos de Uso',
    supportText: 'Soporte Técnico',
    sitemapText: 'Mapa del Sitio',
    showPasswordLabel: 'Mostrar contraseña',
    hidePasswordLabel: 'Ocultar contraseña'
  };

  get t() { return this.language === 'es' ? this.es : this.en; }
  get loginTitle() { return this.t.loginTitle; }
  get loginSubtitle() { return this.t.loginSubtitle; }
  get usernameLbl() { return this.t.usernameLbl; }
  get usernamePlaceholder() { return this.t.usernamePlaceholder; }
  get passwordLbl() { return this.t.passwordLbl; }
  get passwordPlaceholder() { return this.t.passwordPlaceholder; }
  get loginBtn() { return this.t.loginBtn; }
  get keepSessionText() { return this.t.keepSessionText; }
  get forgotPasswordText() { return this.t.forgotPasswordText; }
  get requestAccessText() { return this.t.requestAccessText; }
  get contactText() { return this.t.contactText; }
  get contactText2() { return this.t.contactText2; }
  get footerText() { return this.t.footerText; }
  get privacyText() { return this.t.privacyText; }
  get termsText() { return this.t.termsText; }
  get supportText() { return this.t.supportText; }
  get sitemapText() { return this.t.sitemapText; }
  get branding(): BrandingCopy { return getBrandingCopy(this.language); }
  get showPasswordAria() { return this.showPassword ? this.t.hidePasswordLabel : this.t.showPasswordLabel; }

  get usernameError(): string {
    if (!this.usernameTouched) return '';
    if (!this.username.trim()) return this.t.usernameRequired;
    return '';
  }

  get usernameSuccess(): string {
    return this.usernameTouched && this.username.trim().length > 0 ? this.t.usernameOk : '';
  }

  get usernameState(): FieldState {
    if (this.usernameError) return 'error';
    if (this.usernameTouched && this.username.trim().length > 0) return 'success';
    return 'default';
  }

  get passwordError(): string {
    if (!this.passwordTouched) return '';
    if (!this.password) return this.t.passwordRequired;
    if (this.password.length < LoginComponent.MIN_PASSWORD_LENGTH) return this.t.passwordShort;
    return '';
  }

  get passwordSuccess(): string {
    return this.passwordTouched && this.password.length >= LoginComponent.MIN_PASSWORD_LENGTH ? this.t.passwordOk : '';
  }

  get passwordState(): FieldState {
    if (this.passwordError) return 'error';
    if (this.passwordTouched && this.password.length >= LoginComponent.MIN_PASSWORD_LENGTH) return 'success';
    return 'default';
  }

  isFormValid(): boolean {
    return this.username.trim().length > 0 && this.password.length >= LoginComponent.MIN_PASSWORD_LENGTH;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  onGlobeReady() {
    setTimeout(() => {
      this.showingIntro = false;
    }, 300);
  }

  onLogin() {
    this.usernameTouched = true;
    this.passwordTouched = true;
    if (!this.isFormValid()) return;
    window.location.href = '/loading';
  }
}
