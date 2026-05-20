import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen flex flex-col font-georama">
      <div class="flex-1 flex">
        <!-- Left side - Branding -->
        <div class="hidden md:flex md:w-1/2 flex-col bg-gray-100">
          <div class="p-6">
            <a href="https://canalclima.com/" target="_blank">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F637d28ba8e164481b22cf6c6cf2c694c"
                alt="Canal Clima"
                class="h-10 w-auto"
              >
            </a>
          </div>
          <div class="flex-1 flex flex-col justify-center items-center p-12">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Ff1b475d8e3524a109c692b143fa540bf"
              alt="Climate Connector"
              class="h-52 w-auto mb-4"
            >
            <div class="max-w-md text-center">
              <p class="text-gray-800 font-georama text-lg">
                <span class="font-bold">Canal Clima</span> provee pronósticos del estado del tiempo en español para <span class="font-bold">Colombia, Latinoamérica y el mundo.</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Right side - Login Form -->
        <div class="w-full md:w-1/2 bg-slate-900 flex flex-col">
          <div class="flex justify-end p-6">
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
                <h1 class="text-2xl md:text-3xl font-mulish font-bold text-center text-gray-900 mb-2">{{ loginTitle }}</h1>
                <p class="text-center text-sm text-gray-600 mb-8 font-georama">{{ loginSubtitle }}</p>

                <form (ngSubmit)="onLogin()" class="space-y-5">
                  <div>
                    <label class="block text-xs font-mulish font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      {{ usernameLbl }}
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="username"
                      name="username"
                      [placeholder]="usernamePlaceholder"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg font-georama text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                  </div>

                  <div>
                    <label class="block text-xs font-mulish font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      {{ passwordLbl }}
                    </label>
                    <input
                      type="password"
                      [(ngModel)]="password"
                      name="password"
                      [placeholder]="passwordPlaceholder"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg font-georama text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                  </div>

                  <button type="submit" class="cc-btn w-full">
                    {{ loginBtn }} →
                  </button>
                </form>

<div class="mt-6 pt-6 border-t border-gray-200">
                  <a routerLink="/forgot-password" class="block text-center text-cyan-500 hover:text-cyan-600 font-georama font-semibold text-sm transition-colors mb-2">
                    {{ forgotPasswordText }}
                  </a>
                  <a href="https://canalclima.com/index.php/contacto/" target="_blank" class="block text-center text-cyan-500 hover:text-cyan-600 font-georama font-semibold text-sm transition-colors">
                    {{ requestAccessText }}
                  </a>
                </div>

                <p class="text-center text-xs text-gray-500 mt-6 font-georama leading-relaxed">
                  {{ contactText }} <span class="font-semibold">+57 316 584 7114</span> {{ contactText2 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
export class LoginComponent {
  username = '';
  password = '';
  language: 'es' | 'en' = 'es';

  private en = {
    loginTitle: 'PLATFORM ACCESS',
    loginSubtitle: 'Access the control and monitoring panel',
    usernameLbl: 'USERNAME',
    usernamePlaceholder: 'brayan.criollo.cc',
    passwordLbl: 'PASSWORD',
    passwordPlaceholder: '••••••••••',
    loginBtn: 'LOGIN',
    forgotPasswordText: 'Forgot your password?',
    requestAccessText: 'Request access to the platform',
    contactText: 'If you are not a customer, we appreciate you contacting the sales area at phone',
    contactText2: 'to assign our services.',
    footerText: 'All rights reserved. Professional climate monitoring network.'
  };

  private es = {
    loginTitle: 'INGRESO A LA PLATAFORMA',
    loginSubtitle: 'Acceda al panel de control y monitoreo',
    usernameLbl: 'NOMBRE DE USUARIO',
    usernamePlaceholder: 'brayan.criollo.cc',
    passwordLbl: 'CONTRASEÑA',
    passwordPlaceholder: '••••••••••',
    loginBtn: 'INGRESAR',
    forgotPasswordText: '¿Olvidó su contraseña?',
    requestAccessText: 'Solicitar acceso a la plataforma',
    contactText: 'Si usted no es un cliente, agradecemos contactar con el área comercial al teléfono',
    contactText2: 'para asignar nuestros servicios.',
    footerText: 'Todos los derechos reservados. Red de monitoreo climático profesional.'
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

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  onLogin() {
    window.location.href = '/loading';
  }
}