import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 flex flex-col">
      <!-- Header -->
      <div class="h-16 bg-white border-b border-slate-200 flex items-center px-6">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
            </svg>
          </div>
          <span class="text-slate-800 font-semibold">Climate connector</span>
        </div>
      </div>

      <!-- 404 Content -->
      <div class="flex-1 flex items-center justify-center p-6">
        <div class="max-w-md w-full bg-white rounded-2xl border border-slate-300 p-8 md:p-12 text-center">
          <!-- 404 Cloud Icon -->
          <div class="mb-8 relative inline-block">
            <div class="inline-block">
              <svg class="w-20 h-20 mx-auto" viewBox="0 0 100 100">
                <g>
                  <!-- Cloud -->
                  <path d="M20 60 Q15 45, 25 35 Q30 30, 40 30 Q45 15, 60 15 Q75 15, 80 30 Q85 35, 85 50 Q85 65, 70 70 L25 70 Q15 68, 20 60 Z" fill="url(#cloudGradient)"/>
                  <!-- 404 Text inside -->
                  <text x="50" y="60" font-size="24" font-weight="bold" text-anchor="middle" fill="rgb(59, 130, 246)" font-family="Arial">404</text>
                  <defs>
                    <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:rgb(34, 211, 238);stop-opacity:1" />
                      <stop offset="100%" style="stop-color:rgb(59, 130, 246);stop-opacity:1" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
            </div>
          </div>

          <!-- Error Lines animation -->
          <div class="mb-8 flex justify-center gap-1">
            <div class="w-1 h-6 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0s;"></div>
            <div class="w-1 h-6 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
            <div class="w-1 h-6 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
            <div class="w-1 h-6 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0.6s;"></div>
            <div class="w-1 h-6 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0.8s;"></div>
          </div>

          <!-- Error Message -->
          <h1 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">PÁGINA NO ENCONTRADA</h1>
          <p class="text-slate-600 text-sm mb-8">Lo sentimos, el enlace que buscas no existe o ha sido movido a una nueva ubicación.</p>

          <!-- Back Button -->
          <a
            routerLink="/login"
            class="inline-block bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            VOLVER AL INICIO
          </a>
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
export class NotFoundComponent {}
