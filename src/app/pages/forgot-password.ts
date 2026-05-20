import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
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

        <!-- Right side - Forgot Password Form -->
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
                  <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
export class ForgotPasswordComponent {
  email = '';
  language: 'es' | 'en' = 'es';
  submitted = false;

  private en = {
    title: 'RECOVER PASSWORD',
    subtitle: 'Enter your institutional email to receive the recovery instructions.',
    emailLbl: 'EMAIL',
    emailPlaceholder: 'user@institution.com',
    cancelBtn: 'CANCEL',
    submitBtn: 'SEND',
    successTitle: 'Email Sent!',
    successMessage: 'Recovery instructions have been sent to your email.',
    backToLoginBtn: 'BACK TO LOGIN',
    footerText: 'All rights reserved. Professional climate monitoring network.'
  };

  private es = {
    title: 'RECUPERAR CONTRASEÑA',
    subtitle: 'Ingresa tu correo electrónico institucional para recibir las instrucciones de recuperación.',
    emailLbl: 'CORREO ELECTRÓNICO',
    emailPlaceholder: 'usuario@institucion.com',
    cancelBtn: 'CANCELAR',
    submitBtn: 'ENVIAR',
    successTitle: '¡Correo Enviado!',
    successMessage: 'Se han enviado las instrucciones de recuperación a tu correo electrónico.',
    backToLoginBtn: 'VOLVER AL LOGIN',
    footerText: 'Todos los derechos reservados. Red de monitoreo climático profesional.'
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

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  onSubmit() {
    this.submitted = true;
  }
}