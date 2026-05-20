import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center">
      <!-- Header -->
      <div class="absolute top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center px-6">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
            </svg>
          </div>
          <span class="text-slate-800 font-semibold">Climate connector</span>
        </div>
      </div>

      <!-- Loading Animation -->
      <div class="flex flex-col items-center justify-center gap-8">
        <!-- Weather Icon Animation -->
        <div class="relative w-24 h-24">
          <!-- Cloud -->
          <svg class="absolute inset-0 w-24 h-24 animate-pulse" viewBox="0 0 100 100">
            <path d="M20 60 Q15 45, 25 35 Q30 30, 40 30 Q45 15, 60 15 Q75 15, 80 30 Q85 35, 85 50 Q85 65, 70 70 L25 70 Q15 68, 20 60 Z" fill="url(#cloudGradient)" />
            <defs>
              <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(34, 211, 238);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(59, 130, 246);stop-opacity:1" />
              </linearGradient>
            </defs>
          </svg>

          <!-- Sun rays -->
          <svg class="absolute top-0 left-0 w-6 h-6 animate-spin" viewBox="0 0 24 24" style="animation-duration: 4s;">
            <rect x="11" y="1" width="2" height="6" fill="rgb(251, 191, 36)"/>
            <rect x="11" y="17" width="2" height="6" fill="rgb(251, 191, 36)"/>
            <rect x="1" y="11" width="6" height="2" fill="rgb(251, 191, 36)"/>
            <rect x="17" y="11" width="6" height="2" fill="rgb(251, 191, 36)"/>
          </svg>

          <!-- Rain drops -->
          <svg class="absolute bottom-0 right-2 w-6 h-6 animate-bounce" viewBox="0 0 24 24">
            <ellipse cx="12" cy="18" rx="2" ry="3" fill="rgb(34, 211, 238)"/>
            <ellipse cx="6" cy="20" rx="2" ry="3" fill="rgb(34, 211, 238)"/>
            <ellipse cx="18" cy="20" rx="2" ry="3" fill="rgb(34, 211, 238)"/>
          </svg>
        </div>

        <!-- Loading Text with progress indicator -->
        <div class="text-center">
          <p class="text-slate-600 text-sm font-medium">Cargando Dashboard...</p>
          <div class="mt-4 flex justify-center gap-1">
            <div class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0s;"></div>
            <div class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
            <div class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
            <div class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0.6s;"></div>
            <div class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 0.8s;"></div>
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
export class LoadingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/not-found']);
    }, 4000);
  }
}
