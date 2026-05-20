import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-100 flex flex-col font-georama">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200 px-6 py-4 md:px-12 flex items-center justify-between">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F637d28ba8e164481b22cf6c6cf2c694c"
          alt="Canal Clima"
          class="h-8 w-auto"
        >
        <button (click)="toggleLanguage()" class="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-2 transition-colors">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
          {{ language === 'es' ? 'Español' : 'English' }}
        </button>
      </div>

      <!-- Main Content -->
      <div class="flex-1 flex">
        <!-- Left side - Branding -->
        <div class="hidden md:flex md:w-1/2 flex-col justify-center items-start p-12 bg-gray-100">
          <!-- Canal Clima Logo -->
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F637d28ba8e164481b22cf6c6cf2c694c"
            alt="Canal Clima"
            class="h-12 w-auto mb-16"
          >

          <div class="max-w-sm">
            <!-- Climate Connector Logo -->
            <div class="flex items-center gap-4 mb-12">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Ff1b475d8e3524a109c692b143fa540bf"
                alt="Climate Connector"
                class="h-20 w-auto"
              >
            </div>

            <p class="text-gray-700 mb-2 font-georama text-sm">
              <span class="font-bold">Canal Clima</span> provee pronósticos del estado del tiempo en español para
            </p>
            <p class="text-gray-800 font-bold font-georama text-sm">Colombia, Latinoamérica y el mundo.</p>
          </div>
        </div>

        <!-- Right side - Login Form -->
        <div class="w-full md:w-1/2 bg-gradient-to-b from-blue-900 to-blue-950 flex items-center justify-center p-6 md:p-12">
          <div class="w-full max-w-sm">
            <div class="bg-white rounded-3xl p-8 md:p-10">
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

                <button
                  type="submit"
                  class="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-mulish font-semibold py-3 rounded-3xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
                >
                  {{ loginBtn }} →
                </button>
              </form>

              <div class="mt-6 pt-6 border-t border-gray-200">
                <p class="text-center text-sm text-gray-600 mb-2 font-georama">
                  {{ forgotPasswordText }}
                </p>
                <a
                  routerLink="/forgot-password"
                  class="block text-center text-cyan-500 hover:text-cyan-600 font-georama font-semibold text-sm transition-colors"
                >
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

      <!-- Footer -->
      <div class="bg-white border-t border-gray-200 px-6 py-4 text-center text-xs text-gray-500 font-georama">
        <p>© 2024 ClimateConnector. {{ footerText }}</p>
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

  // English translations
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

  // Spanish translations
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
