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
        src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fca1ae3e32aff44c69d5f1f5c5fc638ce"
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
              <h2 class="text-lg font-mulish font-bold text-center text-gray-900 mb-1">{{ branding.headline }}</h2>
              <p class="text-center text-xs text-gray-600 mb-5 max-w-lg font-georama leading-relaxed">{{ branding.description }}</p>

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

        <!-- Right side - Login Form (gradient background) -->
        <div class="md:w-1/2 flex flex-col relative overflow-hidden bg-gradient-to-br from-petroleo via-[#0E2D4D] to-baltico min-h-0">
          <!-- Decorative blobs -->
          <div class="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cian/25 blur-3xl"></div>
          <div class="pointer-events-none absolute -bottom-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-cyan-400/15 blur-3xl"></div>

          <div class="relative z-10 flex justify-between items-center p-4">
            <div class="flex-1"></div>
            <button (click)="toggleLanguage()" class="cc-btn cc-btn-compact flex items-center gap-2">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              <span class="text-white text-sm">{{ language === 'es' ? 'ES' : 'EN' }}</span>
            </button>
          </div>

          <div class="relative z-10 flex-1 min-h-0 overflow-y-auto flex items-center justify-center p-6">
            <div class="w-full max-w-sm">
              <div class="bg-white rounded-2xl p-5 ring-1 ring-white/40 shadow-2xl shadow-petroleo/40">
                <div class="flex items-center justify-center gap-2 mb-0.5">
                  <span class="material-symbols-outlined text-baltico text-[18px]">verified_user</span>
                  <h1 class="text-xl font-mulish font-bold text-center text-petroleo tracking-tight">{{ loginTitle }}</h1>
                </div>
                <p class="text-center text-sm text-gris-dark mb-3 font-georama">{{ loginSubtitle }}</p>

                <form (ngSubmit)="onLogin()" class="flex flex-col gap-2.5" novalidate>
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
                      class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-gris-medio hover:text-baltico hover:bg-blue-bg transition-colors focus:outline-none focus:ring-2 focus:ring-cian/40"
                    >
                      <span class="material-symbols-outlined text-[20px]">
                        {{ showPassword ? 'visibility_off' : 'visibility' }}
                      </span>
                    </button>
                  </app-form-field>

                  <button
                    type="submit"
                    class="cc-btn w-full mt-1"
                  >
                    {{ loginBtn }} →
                  </button>
                </form>

                <div class="mt-3 pt-2 border-t border-dashed border-gris-base space-y-2">
                  <a routerLink="/forgot-password" class="cc-link-quiet">
                    <span class="material-symbols-outlined cc-link-quiet__icon text-[18px]">lock_reset</span>
                    <span>{{ forgotPasswordText }}</span>
                  </a>
                  <a href="https://canalclima.com/index.php/contacto/" target="_blank" rel="noopener" class="cc-link-quiet">
                    <span class="material-symbols-outlined cc-link-quiet__icon text-[18px]">contact_support</span>
                    <span>{{ requestAccessText }}</span>
                  </a>
                </div>

                <p class="text-center text-[13px] text-gris-dark mt-2 font-georama leading-relaxed">
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
      <div class="md:hidden flex flex-col flex-1 bg-gradient-to-b from-white from-[0%] via-baltico/40 via-[35%] to-baltico to-[65%]">
        <!-- Header -->
        <div class="flex justify-between items-center p-4">
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

        <!-- Spacer to push form down, globe visible here -->
        <div class="flex-1 min-h-[10vh]"></div>

        <!-- Login Form Section (inherits gradient from parent) -->
        <div class="relative overflow-hidden pt-10 pb-5 flex flex-col">
          <div class="pointer-events-none absolute -top-12 right-0 w-64 h-64 rounded-full bg-cian/20 blur-3xl"></div>
          <div class="pointer-events-none absolute top-1/3 -left-10 w-72 h-72 rounded-full bg-cyan-400/15 blur-3xl"></div>

          <div class="relative px-4 flex-1 flex flex-col">
            <div class="relative bg-white rounded-3xl p-6 ring-1 ring-white/40 shadow-2xl shadow-petroleo/40">
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
                    class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-gris-medio hover:text-baltico hover:bg-blue-bg transition-colors focus:outline-none focus:ring-2 focus:ring-cian/40"
                  >
                    <span class="material-symbols-outlined text-[20px]">
                      {{ showPassword ? 'visibility_off' : 'visibility' }}
                    </span>
                  </button>
                </app-form-field>

                <button
                  type="submit"
                  class="cc-btn w-full mt-1"
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
  `]
})
export class LoginComponent {
  username = '';
  password = '';
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
