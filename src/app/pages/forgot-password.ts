import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-r from-slate-100 to-slate-50 flex">
      <!-- Left side - Branding -->
      <div class="hidden md:flex md:w-1/2 flex-col justify-center items-start p-12 bg-slate-50">
        <div class="mb-12">
          <img src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fc2af7c9bf45e4aa1bbea0c7dbb8b46a8" alt="Canal Clima" class="h-16 w-auto">
        </div>
        
        <div class="max-w-md">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-slate-800">Climate</h2>
              <p class="text-sm text-slate-600">connector</p>
            </div>
          </div>
          
          <p class="text-slate-700 mb-2">
            <span class="font-semibold">Canal Clima</span> provee pronósticos del estado del tiempo en español para
          </p>
          <p class="text-slate-800 font-semibold">Colombia, Latinoamérica y el mundo.</p>
        </div>
      </div>

      <!-- Right side - Forgot Password Form -->
      <div class="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div class="w-full max-w-sm">
          <div class="bg-white rounded-3xl p-8 md:p-10">
            <h1 class="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2">RECUPERAR CONTRASEÑA</h1>
            <p class="text-center text-sm text-slate-600 mb-8">Ingresa tu correo electrónico institucional para recibir las instrucciones de recuperación.</p>

            <form (ngSubmit)="onSubmit()" class="space-y-6">
              <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  [(ngModel)]="email"
                  name="email"
                  placeholder="usuario&#64;institucion.com"
                  class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                >
              </div>

              <div class="flex gap-3">
                <a
                  routerLink="/login"
                  class="flex-1 text-center bg-white border-2 border-cyan-400 text-cyan-500 hover:bg-cyan-50 font-semibold py-3 rounded-3xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
                >
                  CANCELAR
                </a>
                <button
                  type="submit"
                  class="flex-1 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 rounded-3xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  RESTABLECER CONTRASEÑA <span>→</span>
                </button>
              </div>
            </form>
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

  onSubmit() {
    console.log('Password reset requested for:', this.email);
    alert('Correo de recuperación enviado a: ' + this.email);
  }
}
