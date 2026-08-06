import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GlobeBannerComponent } from '../components/globe-banner';
import { FormFieldComponent } from '../shared/form-field';
import { getBrandingCopy, BrandingCopy } from '../shared/branding-copy';

type FieldState = 'default' | 'error' | 'success';

interface PasswordRule {
  label: string;
  met: boolean;
  failed: boolean;
}

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, GlobeBannerComponent, FormFieldComponent],
  template: `
    <!-- Globe background (fixed full-screen, z-0) -->
    <app-globe-banner [skipAnimation]="true"></app-globe-banner>

    <!-- Desktop layout (h-screen fija la altura: solo el formulario hace scroll interno) -->
    <div class="hidden md:flex h-screen flex-col font-georama relative z-10">
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

        <!-- Right side - Change Password Form -->
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

          <div class="relative z-10 flex-1 min-h-0 overflow-y-auto flex p-6 md:p-12">
            <div class="m-auto w-full max-w-md">
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
                  <p class="text-center text-sm text-gris-dark mb-3 font-georama">{{ subtitle }}</p>

                  <div class="mb-3 p-3 rounded-xl bg-blue-bg border border-blue-border flex items-start gap-2.5">
                    <span class="material-symbols-outlined text-baltico text-[20px] shrink-0 mt-0.5" aria-hidden="true">info</span>
                    <p class="text-[13px] text-petroleo font-georama leading-relaxed">{{ infoText }}</p>
                  </div>

                  <form (ngSubmit)="onSubmit()" class="flex flex-col gap-2.5" novalidate>
                    <app-form-field
                      [label]="currentLbl"
                      [type]="showCurrent ? 'text' : 'password'"
                      [placeholder]="currentPlaceholder"
                      name="current-password"
                      autocomplete="current-password"
                      leadingIcon="lock"
                      [required]="true"
                      [(ngModel)]="currentPassword"
                      [state]="currentState"
                      [errorMessage]="currentError"
                      [successMessage]="currentSuccess"
                      [hasTrailing]="true"
                      (blurred)="currentTouched = true"
                    >
                      <button
                        trailing
                        type="button"
                        (click)="toggleCurrentVisibility()"
                        [attr.aria-label]="showCurrentAria"
                        [attr.aria-pressed]="showCurrent"
                        class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-2xl text-gris-medio hover:text-baltico hover:bg-blue-bg transition-colors focus:outline-none focus:ring-2 focus:ring-cian/40"
                      >
                        <span class="material-symbols-outlined text-[20px]">
                          {{ showCurrent ? 'visibility_off' : 'visibility' }}
                        </span>
                      </button>
                    </app-form-field>

                    <app-form-field
                      [label]="newLbl"
                      [type]="showNew ? 'text' : 'password'"
                      [placeholder]="newPlaceholder"
                      name="new-password"
                      autocomplete="new-password"
                      leadingIcon="lock"
                      [required]="true"
                      [(ngModel)]="newPassword"
                      [state]="newState"
                      [errorMessage]="newError"
                      [successMessage]="newSuccess"
                      [hasTrailing]="true"
                      (blurred)="newTouched = true"
                    >
                      <button
                        trailing
                        type="button"
                        (click)="toggleNewVisibility()"
                        [attr.aria-label]="showNewAria"
                        [attr.aria-pressed]="showNew"
                        class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-2xl text-gris-medio hover:text-baltico hover:bg-blue-bg transition-colors focus:outline-none focus:ring-2 focus:ring-cian/40"
                      >
                        <span class="material-symbols-outlined text-[20px]">
                          {{ showNew ? 'visibility_off' : 'visibility' }}
                        </span>
                      </button>
                    </app-form-field>

                    <!-- Live complexity checklist -->
                    <div class="rounded-xl bg-gris-base/50 border border-surface-border p-3" aria-live="polite">
                      <p class="text-[11px] font-mulish font-bold uppercase tracking-wider text-petroleo mb-1.5">{{ checklistTitle }}</p>
                      <ul class="space-y-1">
                        @for (rule of checklistRules; track rule.label) {
                          <li
                            class="flex items-center gap-2 text-xs font-georama transition-colors"
                            [class.text-red]="rule.failed"
                            [class.text-baltico]="rule.met && !rule.failed"
                            [class.text-gris-medio]="!rule.met && !rule.failed"
                          >
                            <span class="material-symbols-outlined text-[16px] shrink-0" aria-hidden="true">
                              {{ rule.met ? 'check_circle' : (rule.failed ? 'cancel' : 'radio_button_unchecked') }}
                            </span>
                            <span>{{ rule.label }}</span>
                          </li>
                        }
                      </ul>
                    </div>

                    <app-form-field
                      [label]="confirmLbl"
                      [type]="showConfirm ? 'text' : 'password'"
                      [placeholder]="confirmPlaceholder"
                      name="confirm-password"
                      autocomplete="new-password"
                      leadingIcon="lock"
                      [required]="true"
                      [(ngModel)]="confirmPassword"
                      [state]="confirmState"
                      [errorMessage]="confirmError"
                      [successMessage]="confirmSuccess"
                      [hasTrailing]="true"
                      (blurred)="confirmTouched = true"
                    >
                      <button
                        trailing
                        type="button"
                        (click)="toggleConfirmVisibility()"
                        [attr.aria-label]="showConfirmAria"
                        [attr.aria-pressed]="showConfirm"
                        class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-2xl text-gris-medio hover:text-baltico hover:bg-blue-bg transition-colors focus:outline-none focus:ring-2 focus:ring-cian/40"
                      >
                        <span class="material-symbols-outlined text-[20px]">
                          {{ showConfirm ? 'visibility_off' : 'visibility' }}
                        </span>
                      </button>
                    </app-form-field>

                    <div class="flex gap-3 pt-1">
                      <a routerLink="/login" class="cc-btn flex-1 text-center py-3 whitespace-nowrap">
                        {{ logoutBtn }}
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
                    <span class="material-symbols-outlined text-baltico text-[36px]">check_circle</span>
                  </div>
                  <h2 class="text-2xl font-mulish font-bold text-petroleo mb-2">{{ successTitle }}</h2>
                  <p class="text-gris-dark mb-6 font-georama">{{ successMessage }}</p>
                  <a routerLink="/login" class="cc-btn-primary inline-block">
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

      <!-- Change Password Form Section (inherits gradient from parent) -->
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

            <div class="mb-3 p-2.5 rounded-xl bg-blue-bg border border-blue-border flex items-start gap-2">
              <span class="material-symbols-outlined text-baltico text-[18px] shrink-0 mt-0.5" aria-hidden="true">info</span>
              <p class="text-xs text-petroleo font-georama leading-relaxed">{{ infoText }}</p>
            </div>

            <form (ngSubmit)="onSubmit()" class="flex flex-col gap-2.5" novalidate>
              <app-form-field
                [label]="currentLbl"
                [type]="showCurrent ? 'text' : 'password'"
                [placeholder]="currentPlaceholder"
                name="current-password-m"
                autocomplete="current-password"
                leadingIcon="lock"
                [required]="true"
                [(ngModel)]="currentPassword"
                [state]="currentState"
                [errorMessage]="currentError"
                [successMessage]="currentSuccess"
                [hasTrailing]="true"
                (blurred)="currentTouched = true"
              >
                <button
                  trailing
                  type="button"
                  (click)="toggleCurrentVisibility()"
                  [attr.aria-label]="showCurrentAria"
                  [attr.aria-pressed]="showCurrent"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-2xl text-gris-medio hover:text-baltico hover:bg-blue-bg transition-colors focus:outline-none focus:ring-2 focus:ring-cian/40"
                >
                  <span class="material-symbols-outlined text-[20px]">
                    {{ showCurrent ? 'visibility_off' : 'visibility' }}
                  </span>
                </button>
              </app-form-field>

              <app-form-field
                [label]="newLbl"
                [type]="showNew ? 'text' : 'password'"
                [placeholder]="newPlaceholder"
                name="new-password-m"
                autocomplete="new-password"
                leadingIcon="lock"
                [required]="true"
                [(ngModel)]="newPassword"
                [state]="newState"
                [errorMessage]="newError"
                [successMessage]="newSuccess"
                [hasTrailing]="true"
                (blurred)="newTouched = true"
              >
                <button
                  trailing
                  type="button"
                  (click)="toggleNewVisibility()"
                  [attr.aria-label]="showNewAria"
                  [attr.aria-pressed]="showNew"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-2xl text-gris-medio hover:text-baltico hover:bg-blue-bg transition-colors focus:outline-none focus:ring-2 focus:ring-cian/40"
                >
                  <span class="material-symbols-outlined text-[20px]">
                    {{ showNew ? 'visibility_off' : 'visibility' }}
                  </span>
                </button>
              </app-form-field>

              <!-- Live complexity checklist -->
              <div class="rounded-xl bg-gris-base/50 border border-surface-border p-2.5" aria-live="polite">
                <p class="text-[10px] font-mulish font-bold uppercase tracking-wider text-petroleo mb-1">{{ checklistTitle }}</p>
                <ul class="space-y-0.5">
                  @for (rule of checklistRules; track rule.label) {
                    <li
                      class="flex items-center gap-2 text-[11px] font-georama transition-colors"
                      [class.text-red]="rule.failed"
                      [class.text-baltico]="rule.met && !rule.failed"
                      [class.text-gris-medio]="!rule.met && !rule.failed"
                    >
                      <span class="material-symbols-outlined text-[15px] shrink-0" aria-hidden="true">
                        {{ rule.met ? 'check_circle' : (rule.failed ? 'cancel' : 'radio_button_unchecked') }}
                      </span>
                      <span>{{ rule.label }}</span>
                    </li>
                  }
                </ul>
              </div>

              <app-form-field
                [label]="confirmLbl"
                [type]="showConfirm ? 'text' : 'password'"
                [placeholder]="confirmPlaceholder"
                name="confirm-password-m"
                autocomplete="new-password"
                leadingIcon="lock"
                [required]="true"
                [(ngModel)]="confirmPassword"
                [state]="confirmState"
                [errorMessage]="confirmError"
                [successMessage]="confirmSuccess"
                [hasTrailing]="true"
                (blurred)="confirmTouched = true"
              >
                <button
                  trailing
                  type="button"
                  (click)="toggleConfirmVisibility()"
                  [attr.aria-label]="showConfirmAria"
                  [attr.aria-pressed]="showConfirm"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-2xl text-gris-medio hover:text-baltico hover:bg-blue-bg transition-colors focus:outline-none focus:ring-2 focus:ring-cian/40"
                >
                  <span class="material-symbols-outlined text-[20px]">
                    {{ showConfirm ? 'visibility_off' : 'visibility' }}
                  </span>
                </button>
              </app-form-field>

              <div class="flex gap-3 pt-1">
                <a routerLink="/login" class="cc-btn flex-1 text-center py-3 whitespace-nowrap">
                  {{ logoutBtn }}
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
              <span class="material-symbols-outlined text-baltico text-[32px]">check_circle</span>
            </div>
            <h2 class="text-xl font-mulish font-bold text-petroleo mb-2">{{ successTitle }}</h2>
            <p class="text-gris-dark mb-6 font-georama text-sm">{{ successMessage }}</p>
            <a routerLink="/login" class="cc-btn-primary inline-block">
              {{ backToLoginBtn }} →
            </a>
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
export class ChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  showCurrent = false;
  showNew = false;
  showConfirm = false;
  currentTouched = false;
  newTouched = false;
  confirmTouched = false;
  language: 'es' | 'en' = 'es';
  submitted = false;

  private static readonly MIN_PASSWORD_LENGTH = 8;

  private en = {
    title: 'CHANGE PASSWORD',
    subtitle: 'For your security, you must create a new password before continuing. This is a temporary password generated by an administrator.',
    currentLbl: 'CURRENT PASSWORD',
    currentPlaceholder: 'Enter your current password',
    currentRequired: 'Please enter your current password.',
    currentOk: 'Current password looks good.',
    newLbl: 'NEW PASSWORD',
    newPlaceholder: 'Enter your new password',
    newRequired: 'Please enter your new password.',
    newWeak: 'The password does not meet the security requirements.',
    newSameAsCurrent: 'The new password cannot be the same as the current one.',
    newOk: 'Strong password.',
    confirmLbl: 'CONFIRM NEW PASSWORD',
    confirmPlaceholder: 'Confirm your new password',
    confirmRequired: 'Please confirm your new password.',
    confirmMismatch: 'Passwords do not match.',
    confirmOk: 'Passwords match.',
    checklistTitle: 'The password must include:',
    ruleLength: 'At least 8 characters',
    ruleUpper: 'One uppercase letter',
    ruleLower: 'One lowercase letter',
    ruleNumber: 'One number',
    ruleSymbol: 'One special character (!@#$%^&*)',
    infoText: 'The new password must be different from the current one. For security, you will not be able to reuse previous passwords.',
    logoutBtn: 'LOG OUT',
    submitBtn: 'CHANGE PASSWORD',
    successTitle: 'Password Updated!',
    successMessage: 'Your password has been updated successfully. You can now sign in with your new password.',
    backToLoginBtn: 'GO TO LOGIN',
    footerText: 'All rights reserved. Professional climate monitoring network.',
    privacyText: 'Privacy',
    termsText: 'Terms of Use',
    supportText: 'Technical Support',
    sitemapText: 'Site Map',
    showPasswordLabel: 'Show password',
    hidePasswordLabel: 'Hide password'
  };

  private es = {
    title: 'CAMBIAR CONTRASEÑA',
    subtitle: 'Por su seguridad, debe crear una nueva contraseña antes de continuar. Esta es una contraseña temporal generada por un administrador.',
    currentLbl: 'CONTRASEÑA ACTUAL',
    currentPlaceholder: 'Ingrese su contraseña actual',
    currentRequired: 'Ingrese su contraseña actual.',
    currentOk: 'Contraseña actual válida.',
    newLbl: 'NUEVA CONTRASEÑA',
    newPlaceholder: 'Ingrese su nueva contraseña',
    newRequired: 'Ingrese su nueva contraseña.',
    newWeak: 'La contraseña no cumple con los requisitos de seguridad.',
    newSameAsCurrent: 'La nueva contraseña no puede ser igual a la actual.',
    newOk: 'Contraseña segura.',
    confirmLbl: 'CONFIRMAR NUEVA CONTRASEÑA',
    confirmPlaceholder: 'Confirme su nueva contraseña',
    confirmRequired: 'Confirme su nueva contraseña.',
    confirmMismatch: 'Las contraseñas no coinciden.',
    confirmOk: 'Las contraseñas coinciden.',
    checklistTitle: 'La contraseña debe cumplir con:',
    ruleLength: 'Mínimo 8 caracteres',
    ruleUpper: 'Una letra mayúscula',
    ruleLower: 'Una letra minúscula',
    ruleNumber: 'Un número',
    ruleSymbol: 'Un símbolo especial (!@#$%^&*)',
    infoText: 'La nueva contraseña debe ser diferente a la actual. Por seguridad, no podrá reutilizar contraseñas anteriores.',
    logoutBtn: 'CERRAR SESIÓN',
    submitBtn: 'CAMBIAR CONTRASEÑA',
    successTitle: '¡Contraseña Actualizada!',
    successMessage: 'Su contraseña ha sido actualizada exitosamente. Ya puede ingresar con su nueva contraseña.',
    backToLoginBtn: 'IR AL LOGIN',
    footerText: 'Todos los derechos reservados. Red de monitoreo climático profesional.',
    privacyText: 'Privacidad',
    termsText: 'Términos de Uso',
    supportText: 'Soporte Técnico',
    sitemapText: 'Mapa del Sitio',
    showPasswordLabel: 'Mostrar contraseña',
    hidePasswordLabel: 'Ocultar contraseña'
  };

  get t() { return this.language === 'es' ? this.es : this.en; }
  get title() { return this.t.title; }
  get subtitle() { return this.t.subtitle; }
  get currentLbl() { return this.t.currentLbl; }
  get currentPlaceholder() { return this.t.currentPlaceholder; }
  get newLbl() { return this.t.newLbl; }
  get newPlaceholder() { return this.t.newPlaceholder; }
  get confirmLbl() { return this.t.confirmLbl; }
  get confirmPlaceholder() { return this.t.confirmPlaceholder; }
  get checklistTitle() { return this.t.checklistTitle; }
  get infoText() { return this.t.infoText; }
  get logoutBtn() { return this.t.logoutBtn; }
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
  get showCurrentAria() { return this.showCurrent ? this.t.hidePasswordLabel : this.t.showPasswordLabel; }
  get showNewAria() { return this.showNew ? this.t.hidePasswordLabel : this.t.showPasswordLabel; }
  get showConfirmAria() { return this.showConfirm ? this.t.hidePasswordLabel : this.t.showPasswordLabel; }

  private hasUpper(v: string): boolean { return /[A-Z]/.test(v); }
  private hasLower(v: string): boolean { return /[a-z]/.test(v); }
  private hasNumber(v: string): boolean { return /\d/.test(v); }
  private hasSymbol(v: string): boolean { return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(v); }

  meetsComplexity(v: string): boolean {
    return v.length >= ChangePasswordComponent.MIN_PASSWORD_LENGTH
      && this.hasUpper(v)
      && this.hasLower(v)
      && this.hasNumber(v)
      && this.hasSymbol(v);
  }

  get checklistRules(): PasswordRule[] {
    const p = this.newPassword;
    const showFailure = this.newTouched && p.length > 0;
    const rules = [
      { met: p.length >= ChangePasswordComponent.MIN_PASSWORD_LENGTH, failed: showFailure && p.length < ChangePasswordComponent.MIN_PASSWORD_LENGTH },
      { met: this.hasUpper(p), failed: showFailure && !this.hasUpper(p) },
      { met: this.hasLower(p), failed: showFailure && !this.hasLower(p) },
      { met: this.hasNumber(p), failed: showFailure && !this.hasNumber(p) },
      { met: this.hasSymbol(p), failed: showFailure && !this.hasSymbol(p) },
    ];
    const labels = [this.t.ruleLength, this.t.ruleUpper, this.t.ruleLower, this.t.ruleNumber, this.t.ruleSymbol];
    return rules.map((r, i) => ({ label: labels[i], met: r.met, failed: r.failed }));
  }

  get currentError(): string {
    if (!this.currentTouched) return '';
    if (!this.currentPassword) return this.t.currentRequired;
    return '';
  }

  get currentSuccess(): string {
    return this.currentTouched && this.currentPassword.length > 0 ? this.t.currentOk : '';
  }

  get currentState(): FieldState {
    if (this.currentError) return 'error';
    if (this.currentTouched && this.currentPassword.length > 0) return 'success';
    return 'default';
  }

  get newError(): string {
    if (!this.newTouched) return '';
    if (!this.newPassword) return this.t.newRequired;
    if (!this.meetsComplexity(this.newPassword)) return this.t.newWeak;
    if (this.newPassword === this.currentPassword) return this.t.newSameAsCurrent;
    return '';
  }

  get newSuccess(): string {
    return this.newTouched
      && this.meetsComplexity(this.newPassword)
      && this.newPassword !== this.currentPassword
      ? this.t.newOk
      : '';
  }

  get newState(): FieldState {
    if (this.newError) return 'error';
    if (this.newTouched && this.meetsComplexity(this.newPassword) && this.newPassword !== this.currentPassword) return 'success';
    return 'default';
  }

  get confirmError(): string {
    if (!this.confirmTouched) return '';
    if (!this.confirmPassword) return this.t.confirmRequired;
    if (this.confirmPassword !== this.newPassword) return this.t.confirmMismatch;
    return '';
  }

  get confirmSuccess(): string {
    return this.confirmTouched && this.confirmPassword.length > 0 && this.confirmPassword === this.newPassword
      ? this.t.confirmOk
      : '';
  }

  get confirmState(): FieldState {
    if (this.confirmError) return 'error';
    if (this.confirmTouched && this.confirmPassword.length > 0 && this.confirmPassword === this.newPassword) return 'success';
    return 'default';
  }

  isFormValid(): boolean {
    return this.currentPassword.length > 0
      && this.meetsComplexity(this.newPassword)
      && this.newPassword !== this.currentPassword
      && this.confirmPassword === this.newPassword;
  }

  toggleCurrentVisibility() { this.showCurrent = !this.showCurrent; }
  toggleNewVisibility() { this.showNew = !this.showNew; }
  toggleConfirmVisibility() { this.showConfirm = !this.showConfirm; }

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  onSubmit() {
    this.currentTouched = true;
    this.newTouched = true;
    this.confirmTouched = true;
    if (!this.isFormValid()) return;
    this.submitted = true;
  }
}
