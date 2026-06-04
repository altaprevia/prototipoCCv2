import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex flex-col font-georama">
      <!-- Header -->
      <div class="h-16 bg-white border-b border-gray-200 flex items-center px-6">
        <div class="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fca1ae3e32aff44c69d5f1f5c5fc638ce"
            alt="Climate Connector"
            class="h-8 w-auto"
          >
        </div>
        <div class="flex-1"></div>
        <button (click)="toggleLanguage()" class="cc-btn cc-btn-compact flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
          </svg>
          {{ language === 'es' ? 'Español' : 'English' }}
        </button>
      </div>

      <!-- Main content area -->
      <div class="flex-1 flex">
        <!-- Left side - Splash Screen (full width) -->
        <div
          class="w-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out overflow-hidden bg-slate-900"
        >
          <!-- Splash Content -->
          <div
            class="flex flex-col items-center gap-8 transition-all duration-1000"
            [class.opacity-0]="contentExiting"
            [class.-translate-y-44]="contentExiting"
          >
            <div class="relative w-48 h-48 flex items-center justify-center">
              <!-- Ring SVG -->
              <svg class="absolute top-0 left-0 w-48 h-48 pointer-events-none" viewBox="0 0 200 200">
                <circle
                  cx="100" cy="100" r="90"
                  fill="none"
                  stroke="rgba(0,174,239,0.15)"
                  stroke-width="3"
                />
                <circle
                  cx="100" cy="100" r="90"
                  fill="none"
                  stroke="#00aeef"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-dasharray="565.49"
                  [attr.stroke-dashoffset]="ringOffset"
                  transform="rotate(-90 100 100)"
                  class="transition-all duration-100"
                />
              </svg>

              <!-- Logo SVG -->
              <div class="w-36 h-24 relative">
                <svg width="155" height="103" viewBox="0 0 155 103" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                  <!-- GOTAS outline -->
                  <g>
                    <path d="M128.982 60C129.758 60.3398 130.305 61.218 130.821 61.8663C131.044 62.1441 131.272 62.4166 131.503 62.6875C134.013 65.6337 136.47 68.9759 137.697 72.6937C137.741 72.8242 137.741 72.8242 137.786 72.9574C138.346 74.9949 137.74 77.3727 136.745 79.1692C135.314 81.4407 133.262 82.9205 130.647 83.5249C128.32 83.9376 125.904 83.529 123.903 82.2462C121.744 80.7008 120.3 78.6024 119.846 75.9302C119.334 71.4595 122.451 67.5089 125.031 64.1775C125.239 63.9149 125.448 63.6542 125.658 63.3942C125.731 63.3031 125.804 63.2119 125.879 63.1181C126.363 62.514 126.859 61.9193 127.36 61.3291C127.418 61.2601 127.476 61.1911 127.535 61.1201C128.489 60.0044 128.489 60.0044 128.982 60Z" fill="none" stroke="#00aeef" stroke-width="1.5"/>
                  </g>
                  <g>
                    <path d="M106.191 48C106.968 48.3398 107.515 49.218 108.03 49.8663C108.253 50.1441 108.481 50.4166 108.713 50.6875C111.222 53.6337 113.68 56.9759 114.907 60.6937C114.951 60.8242 114.951 60.8242 114.995 60.9574C115.555 62.9949 114.95 65.3727 113.954 67.1692C112.524 69.4407 110.472 70.9205 107.857 71.5249C105.529 71.9376 103.113 71.529 101.112 70.2462C98.9532 68.7008 97.5099 66.6024 97.0558 63.9302C96.5435 59.4595 99.6605 55.5089 102.241 52.1775C102.448 51.9149 102.657 51.6542 102.868 51.3942C102.94 51.3031 103.013 51.2119 103.088 51.1181C103.573 50.514 104.068 49.9193 104.569 49.3291C104.627 49.2601 104.685 49.1911 104.745 49.1201C105.699 48.0044 105.699 48.0044 106.191 48Z" fill="none" stroke="#00aeef" stroke-width="1.5"/>
                  </g>
                  <g>
                    <path d="M115.027 78.8662C115.467 78.9552 115.606 79.1391 115.896 79.4795C116.035 79.6271 116.035 79.6271 116.176 79.7778C116.833 80.4969 117.46 81.2319 118.066 81.9958C118.166 82.1195 118.266 82.2432 118.366 82.3668C124.516 89.9861 124.516 89.9861 124.139 94.0305C123.833 96.6425 122.75 98.8092 120.778 100.556C118.605 102.268 116.045 102.722 113.348 102.425C111.811 102.181 110.337 101.399 109.172 100.376C109.11 100.329 109.047 100.281 108.983 100.232C107.403 98.9988 106.478 96.964 106.071 95.0434C105.516 90.6334 108.306 86.8449 110.849 83.5237C111.364 82.8595 111.892 82.2069 112.426 81.5582C112.505 81.4615 112.505 81.4615 112.586 81.3628C112.88 81.0072 113.176 80.6545 113.476 80.3043C113.623 80.1312 113.767 79.9558 113.911 79.7804C114.006 79.6686 114.1 79.5569 114.195 79.4453C114.277 79.3464 114.36 79.2476 114.444 79.1457C114.703 78.9325 114.703 78.9325 115.027 78.8662Z" fill="none" stroke="#00aeef" stroke-width="1.5"/>
                  </g>

                  <!-- NUBE outline -->
                  <path d="M125.46 31.6585C119.206 25.7301 111.022 22.227 102.315 22.3871C94.776 22.6569 87.5212 25.0936 81.7433 30.0395L81.5868 30.1735C80.6027 30.9879 79.6834 31.9008 78.8524 32.8703C78.7159 33.0304 78.5785 33.1898 78.4408 33.3488L78.1904 33.6326C77.9209 33.9411 77.7087 34.1627 77.3267 34.3193C73.5915 31.5009 69.2353 29.7118 64.6395 28.88L64.3383 28.8261C62.7906 28.5322 61.2618 28.488 59.6903 28.4833L59.3637 28.4827C57.6308 28.4764 55.9449 28.558 54.235 28.8563L53.9801 28.9038C49.092 29.8132 44.4297 31.8552 40.5582 34.9877C40.4497 35.0761 40.3409 35.1642 40.2319 35.2521C38.8841 36.2803 37.6104 37.4895 36.5692 38.8278C35.856 39.4984 35.856 39.4984 34.8977 39.7878C34.4632 39.9258 34.0295 40.0655 33.5973 40.2105C28.6576 41.9059 24.453 45.8235 22.1582 50.4698L22.0482 50.6952C21.6231 51.5617 21.2431 52.4325 20.9527 53.3537L20.8727 53.6167C20.6521 54.3412 20.6521 54.3412 20.2817 56.1884H112.967H154.01C154.01 55.4079 154.01 55.4079 152.197 53.0095C152.063 52.8348 151.929 52.6603 151.797 52.4837C148.794 48.456 144.244 45.6319 139.323 44.6341L139.047 44.5802C137.269 44.2327 135.509 44.2357 133.705 44.2643L133.436 44.2692C133.332 44.0109 133.229 43.7523 133.129 43.4921C132.029 40.6017 130.605 37.8722 128.726 35.4047C128.587 35.2247 128.449 35.0447 128.312 34.8634C127.447 33.7158 126.495 32.6559 125.46 31.6585Z" fill="none" stroke="#00aeef" stroke-width="1.5"/>

                  <!-- RAYOS DEL SOL outline (sin cuadros amarillos — solo stroke) -->
                  <path class="rayo1" d="M22.2919 13.3481C22.6413 13.7245 22.9522 14.1261 23.2634 14.5342C23.3207 14.6091 23.3781 14.684 23.4355 14.759C23.5903 14.9611 23.7449 15.1634 23.8994 15.3658C24.0613 15.5777 24.2234 15.7895 24.3855 16.0013C24.692 16.4018 24.9983 16.8024 25.3045 17.2031C25.6533 17.6595 26.0023 18.1157 26.3513 18.5719C27.0689 19.5099 27.7862 20.4481 28.5034 21.3864C28.1012 21.7599 27.6662 22.0884 27.2293 22.42C27.145 22.4842 27.0608 22.5484 26.9765 22.6126C26.7489 22.786 26.5211 22.9591 26.2932 23.1323C26.0547 23.3136 25.8164 23.4951 25.578 23.6766C25.1272 24.0198 24.6762 24.3629 24.2251 24.7059C23.7114 25.0965 23.1978 25.4874 22.6842 25.8783C21.6283 26.682 20.5721 27.4854 19.5158 28.2887C19.3474 28.1832 19.2284 28.0805 19.1078 27.9231C19.0756 27.8814 19.0434 27.8397 19.0102 27.7967C18.9754 27.751 18.9406 27.7052 18.9048 27.6581C18.8674 27.6094 18.8299 27.5608 18.7914 27.5107C18.6658 27.3472 18.5408 27.1834 18.4157 27.0196C18.3259 26.9025 18.236 26.7855 18.1462 26.6684C17.902 26.3502 17.6583 26.0316 17.4147 25.713C17.1601 25.3801 16.9051 25.0475 16.6503 24.7148C16.1949 24.1204 15.7399 23.5257 15.2851 22.9309C14.8724 22.3912 14.4593 21.8518 14.0459 21.3125C13.566 20.6866 13.0865 20.0606 12.6072 19.4342C12.3535 19.1026 12.0996 18.771 11.8455 18.4395C11.6067 18.1282 11.3683 17.8165 11.1302 17.5047C11.0425 17.39 10.9547 17.2753 10.8668 17.1608C10.7473 17.0051 10.6282 16.8491 10.5092 16.6929C10.4739 16.6471 10.4385 16.6013 10.4021 16.5541C10.165 16.2414 10.165 16.2414 10.1838 16.1006C10.256 16.0844 10.256 16.0844 10.3297 16.0679C12.6371 15.5503 14.9437 15.0298 17.2478 14.4978C17.2956 14.4867 17.3435 14.4757 17.3927 14.4643C17.4887 14.4422 17.5847 14.42 17.6807 14.3978C17.9148 14.3438 18.1489 14.2897 18.383 14.2357C18.4281 14.2253 18.4732 14.2149 18.5196 14.2042C19.776 13.9143 21.0337 13.6302 22.2919 13.3481Z" fill="none" stroke="#FFD700" stroke-width="1.5"/>
                  <path class="rayo2" d="M43.2539 0C43.542 0.0957767 43.8098 0.200194 44.0835 0.327313C44.1477 0.356815 44.1477 0.356815 44.2132 0.386913C44.3058 0.429442 44.3983 0.472053 44.4908 0.514738C44.7429 0.631022 44.9953 0.746619 45.2477 0.862125C45.2999 0.886009 45.3521 0.909894 45.4059 0.934502C45.8892 1.15521 46.3751 1.37019 46.8614 1.58424C47.7504 1.97552 48.6341 2.37692 49.515 2.7859C50.5566 3.26945 51.6019 3.74303 52.6516 4.20874C52.9559 4.34391 53.2602 4.4793 53.5643 4.6149C53.6879 4.66994 53.8116 4.7248 53.9352 4.77964C54.0091 4.81253 54.0829 4.84542 54.1589 4.87931C54.2245 4.90843 54.29 4.93755 54.3575 4.96755C54.5055 5.03774 54.5055 5.03774 54.5695 5.10151C54.5757 5.23225 54.5773 5.36321 54.5772 5.4941C54.5772 5.55614 54.5772 5.55614 54.5773 5.61943C54.5774 5.75945 54.5771 5.89947 54.5767 6.0395C54.5767 6.14102 54.5767 6.24255 54.5768 6.34407C54.5768 6.6169 54.5764 6.88972 54.5759 7.16255C54.5756 7.4182 54.5756 7.67385 54.5755 7.9295C54.5752 8.67804 54.5743 9.42658 54.5735 10.1751C54.5722 11.8468 54.5708 13.5184 54.5695 15.2408C50.8353 15.2408 47.1012 15.2408 43.2539 15.2408C43.2539 10.2113 43.2539 5.18186 43.2539 0Z" fill="none" stroke="#FFD700" stroke-width="1.5"/>
                  <path class="rayo3" d="M0 44.9648C3.71304 44.9648 7.42608 44.9648 11.2516 44.9648C11.2516 48.6685 11.2516 52.3722 11.2516 56.1882C7.5386 56.1882 3.82556 56.1882 0 56.1882C0 52.4845 0 48.7808 0 44.9648Z" fill="none" stroke="#FFD700" stroke-width="1.5"/>
                </svg>
              </div>
            </div>

            <!-- Brand name -->
            <div
              class="text-white text-xl tracking-widest font-light"
              [class.opacity-0]="!brandVisible"
              [style.letter-spacing]="brandVisible ? '3px' : '6px'"
            >
              Climate<span class="text-cyan-400 font-normal">Connector</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
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

    .rayo1 {
      animation: apagar1 3000ms ease-in-out infinite;
    }
    .rayo2 {
      animation: apagar2 3000ms ease-in-out infinite;
    }
    .rayo3 {
      animation: apagar3 3000ms ease-in-out infinite;
    }

    @keyframes apagar1 {
      0% { opacity: 1 }
      16% { opacity: 0 }
      33% { opacity: 1 }
      100% { opacity: 1 }
    }

    @keyframes apagar2 {
      0%, 33% { opacity: 1 }
      49% { opacity: 0 }
      66% { opacity: 1 }
      100% { opacity: 1 }
    }

    @keyframes apagar3 {
      0%, 66% { opacity: 1 }
      82% { opacity: 0 }
      100% { opacity: 1 }
    }

    .gota1 {
      animation: caer 1800ms ease-in infinite 0ms;
    }
    .gota2 {
      animation: caer 1800ms ease-in infinite 600ms;
    }
    .gota3 {
      animation: caer 1800ms ease-in infinite 1200ms;
    }

    @keyframes caer {
      0% { transform: translateY(0); opacity: 1 }
      80% { transform: translateY(14px); opacity: 0.5 }
      100% { transform: translateY(18px); opacity: 0 }
    }
  `]
})
export class LoadingComponent implements OnInit {
  language: 'es' | 'en' = 'es';
  ringOffset = 565.49;
  brandVisible = false;
  contentExiting = false;

  private en = {
    footerText: 'All rights reserved. Professional climate monitoring network.'
  };

  private es = {
    footerText: 'Todos los derechos reservados. Red de monitoreo climático profesional.'
  };

  get footerText() { return this.language === 'es' ? this.es.footerText : this.en.footerText; }

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.brandVisible = true;
    }, 400);

    const fillDuration = 2500;
    const startTime = Date.now();

    const animateRing = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / fillDuration, 1);

      this.ringOffset = 565.49 * (1 - progress);

      if (progress < 1) {
        requestAnimationFrame(animateRing);
      } else {
        setTimeout(() => {
          this.contentExiting = true;
          setTimeout(() => {
            this.router.navigate(['/not-found']);
          }, 800);
        }, 1000);
      }
    };

    setTimeout(animateRing, 200);
  }

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }
}
