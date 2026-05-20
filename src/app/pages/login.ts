import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <div class="flex-1 flex flex-col xl:flex-row">
        <div class="hidden xl:flex xl:w-1/2 bg-slate-50">
          <div class="m-auto max-w-xl px-10 py-12">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2F637d28ba8e164481b22cf6c6cf2c694c"
              alt="Canal Clima"
              class="h-12 w-auto mb-10"
            >

            <div class="rounded-[32px] bg-white p-10 shadow-2xl border border-slate-200">
              <div class="flex items-center gap-4 mb-8">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Ff1b475d8e3524a109c692b143fa540bf"
                  alt="Climate Connector"
                  class="h-20 w-auto"
                >
              </div>

              <p class="text-slate-700 text-base leading-8 font-georama">
                <span class="font-semibold">Canal Clima</span> provee pronósticos del estado del tiempo en español para
                <span class="font-bold text-slate-900"> Colombia, Latinoamérica</span> y el mundo.
              </p>
            </div>
          </div>
        </div>

        <div class="w-full xl:w-1/2 relative bg-[radial-gradient(circle_at_top_right,_rgba(6,30,61,0.9),_rgba(4,11,22,0.96))]">
          <div class="absolute inset-x-0 top-6 px-6 xl:px-12">
            <div class="flex items-center justify-between gap-3">
              <button class="rounded-full bg-white/10 px-5 py-2 text-sm text-slate-100 ring-1 ring-slate-700 backdrop-blur-sm hover:bg-white/15 transition">
                {{ loginBtn }} →
              </button>
              <button (click)="toggleLanguage()" class="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 transition">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
                Español / English
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
              </button>
            </div>
          </div>

          <div class="relative flex min-h-[calc(100vh-96px)] items-center justify-center px-6 py-12 xl:px-16">
            <div class="w-full max-w-md">
              <div class="rounded-[32px] bg-white p-10 shadow-2xl ring-1 ring-slate-200">
                <h1 class="text-3xl font-semibold text-slate-950 text-center mb-2">{{ loginTitle }}</h1>
                <p class="text-center text-sm text-slate-500 mb-8">{{ loginSubtitle }}</p>

                <form (ngSubmit)="onLogin()" class="space-y-5">
                  <div>
                    <label class="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-2">
                      {{ usernameLbl }}
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="username"
                      name="username"
                      [placeholder]="usernamePlaceholder"
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                    >
                  </div>

                  <div>
                    <label class="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-2">
                      {{ passwordLbl }}
                    </label>
                    <input
                      type="password"
                      [(ngModel)]="password"
                      name="password"
                      [placeholder]="passwordPlaceholder"
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                    >
                  </div>

                  <button
                    type="submit"
                    class="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600 active:scale-[0.99]"
                  >
                    {{ loginBtn }} →
                  </button>
                </form>

                <div class="mt-8 border-t border-slate-200/70 pt-6">
                  <p class="text-center text-sm text-slate-600 mb-2">{{ forgotPasswordText }}</p>
                  <a
                    routerLink="/forgot-password"
                    class="block text-center text-cyan-600 hover:text-cyan-700 font-semibold text-sm transition"
                  >
                    {{ requestAccessText }}
                  </a>
                </div>

                <p class="text-center text-xs text-slate-500 mt-6 leading-relaxed">
                  {{ contactText }} <span class="font-semibold text-slate-700">+57 318 566 7114</span> {{ contactText2 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-slate-950 text-slate-500 text-center text-xs py-4 px-6 border-t border-slate-800">
        © 2024 ClimateConnector. {{ footerText }}
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
