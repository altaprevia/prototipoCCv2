import {
  Component,
  AfterViewInit,
  OnDestroy,
  HostListener,
  ElementRef,
  ViewChildren,
  QueryList,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Station {
  name: string;
  id: string;
  zone: string;
  date: string;
  temp: number | null;
  humidity: number | null;
  precip: number | null;
  wind: number | null;
  windDir: string;
  status: 'online' | 'offline';
}

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- Toast -->
    <div
      class="fixed bottom-token-04 left-1/2 -translate-x-1/2 bg-petroleo text-white px-token-04 py-token-02 rounded-full text-sm font-medium transition-opacity duration-300 z-50 flex items-center gap-2"
      [class.opacity-0]="!toastVisible"
      [class.opacity-100]="toastVisible"
      [class.pointer-events-none]="!toastVisible"
    >
      <span class="material-symbols-outlined text-[18px]">check_circle</span>
      <span>{{ toastMsg }}</span>
    </div>

    <!-- Header -->
    <div class="h-16 border-b border-gray-200 flex items-center px-6 bg-gray-50 relative">
      <div class="flex items-center gap-2">
        <img src="https://cdn.builder.io/api/v1/image/assets%2F44e06fd51c6944eca5eec48df5075424%2Fb2dabcde44f14e6b8f9554d3b9a52e18"
             alt="Climate Connector" class="h-8 w-auto">
      </div>
      <a routerLink="/design-system" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 text-sm font-georama font-medium text-gray-800 hover:bg-gray-100 rounded-md transition-colors">Estilo</a>
      <button class="cc-btn cc-btn-compact ml-auto flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
          </svg>
          <span>ES</span>
        </button>
    </div>

    <main class="max-w-[1180px] mx-auto px-token-04 lg:px-token-05 pb-[120px]">
      <!-- Hero -->
      <section class="py-[80px] md:py-[100px] reveal" [class.active]="revealed().has('hero')">
        <div class="text-[11px] uppercase tracking-[0.2em] font-bold text-cian mb-4">
          Plataforma V2 · Entorno Técnico
        </div>
        <h1 class="font-mulish font-bold text-4xl md:text-5xl text-petroleo mb-6 lh-12 max-w-3xl">
          Sistema Visual para Monitoreo Climático
        </h1>
        <p class="text-gris-dark text-base md:text-lg max-w-2xl lh-16">
          Lineamientos de marca, estados y variantes alineados al brandbook oficial. Diseño plano estricto
          (cero sombras), tipografía orientada a la legibilidad y paleta contrastante para interfaces de
          telemetría y dashboards críticos.
        </p>
        <div class="h-1 w-16 bg-cian mt-8 rounded-full"></div>
      </section>

      <!-- 01 Paleta de Color -->
      <section id="colores" class="scroll-mt-[100px] mb-20 reveal" [class.active]="revealed().has('colores')">
        <div class="flex items-baseline gap-3 mb-8">
          <span class="font-mulish font-bold text-xs text-baltico border border-surface-strong rounded px-2 py-1">01</span>
          <h2 class="font-mulish font-bold text-2xl text-petroleo">Paleta de Color</h2>
        </div>
        <div class="space-y-8">
          <div>
            <h3 class="text-xs uppercase tracking-wider font-bold text-gris-medio mb-4">Colores Principales</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-token-04">
              @for (s of mainSwatches; track s.hex) {
                <div
                  class="group cursor-pointer border border-surface-border rounded-lg overflow-hidden bg-white hover:border-baltico transition-colors duration-200"
                  (click)="copyHex(s.hex)"
                >
                  <div class="h-[80px] relative overflow-hidden" [style.backgroundColor]="s.hex">
                    <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span class="text-white text-xs font-medium flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">content_copy</span> Copiar Hex
                      </span>
                    </div>
                  </div>
                  <div class="p-4 flex justify-between items-end">
                    <div>
                      <div class="font-bold text-petroleo mb-1">{{ s.name }}</div>
                      <div class="text-xs text-gris-medio">{{ s.desc }}</div>
                    </div>
                    <div class="text-xs font-mono text-gris-dark text-right">
                      <div>{{ s.hex }}</div>
                      <div class="text-[10px] text-gris-medio mt-1">{{ s.rgb }}</div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div>
            <h3 class="text-xs uppercase tracking-wider font-bold text-gris-medio mb-4">Soporte y Semántica</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-token-03">
              @for (s of supportSwatches; track s.hex) {
                <div class="border border-surface-border rounded-lg overflow-hidden bg-white">
                  <div class="h-12" [style.backgroundColor]="s.hex"></div>
                  <div class="p-3">
                    <div class="font-bold text-xs text-petroleo">{{ s.name }}</div>
                    <div class="text-[10px] font-mono text-gris-medio mt-1">{{ s.hex }}</div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- 02 Tipografía -->
      <section id="tipografia" class="scroll-mt-[100px] mb-20 reveal" [class.active]="revealed().has('tipografia')">
        <div class="flex items-baseline gap-3 mb-8">
          <span class="font-mulish font-bold text-xs text-baltico border border-surface-strong rounded px-2 py-1">02</span>
          <h2 class="font-mulish font-bold text-2xl text-petroleo">Tipografía</h2>
        </div>
        <div class="bg-white border border-surface-border rounded-xl p-6 md:p-8">
          <div class="mb-10">
            <div class="flex items-center justify-between mb-4 pb-2 border-b border-gris-base">
              <h3 class="font-mulish font-bold text-lg text-petroleo">Display (Avenir Next LT Pro)</h3>
              <span class="text-xs font-mono text-gris-medio bg-gris-base px-2 py-1 rounded">Avenir Next LT Pro</span>
            </div>
            <div class="space-y-6">
              <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-surface-border border-dashed pb-4">
                <span class="text-[11px] uppercase tracking-wider text-gris-medio w-24 shrink-0 font-bold">H1</span>
                <span class="font-mulish font-bold text-[48px] text-petroleo lh-12 flex-1">Encabezado H1</span>
                <span class="text-xs font-mono text-gris-medio">48px / Bold / 1.2</span>
              </div>
              <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-surface-border border-dashed pb-4">
                <span class="text-[11px] uppercase tracking-wider text-gris-medio w-24 shrink-0 font-bold">H2</span>
                <span class="font-mulish font-bold text-[36px] text-petroleo lh-12 flex-1">Encabezado H2</span>
                <span class="text-xs font-mono text-gris-medio">36px / Bold / 1.2</span>
              </div>
              <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 pb-4">
                <span class="text-[11px] uppercase tracking-wider text-gris-medio w-24 shrink-0 font-bold">H3</span>
                <span class="font-mulish font-semibold text-[24px] text-petroleo lh-13 flex-1">Encabezado H3</span>
                <span class="text-xs font-mono text-gris-medio">24px / Semibold / 1.3</span>
              </div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between mb-4 pb-2 border-b border-gris-base">
              <h3 class="font-mulish font-bold text-lg text-petroleo">Interfaz (Grandview)</h3>
              <span class="text-xs font-mono text-gris-medio bg-gris-base px-2 py-1 rounded">Grandview</span>
            </div>
            <div class="space-y-6">
              <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-surface-border border-dashed pb-4">
                <span class="text-[11px] uppercase tracking-wider text-gris-medio w-24 shrink-0 font-bold">Body L</span>
                <span class="font-georama font-medium text-[18px] text-petroleo lh-16 flex-1">Cuerpo de texto diseñado para máxima legibilidad.</span>
                <span class="text-xs font-mono text-gris-medio">18px / Medium / 1.6</span>
              </div>
              <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-surface-border border-dashed pb-4">
                <span class="text-[11px] uppercase tracking-wider text-gris-medio w-24 shrink-0 font-bold">Body M</span>
                <span class="font-georama text-[16px] text-petroleo lh-16 flex-1">El contraste se ajusta para reducir la fatiga visual.</span>
                <span class="text-xs font-mono text-gris-medio">16px / Regular / 1.6</span>
              </div>
              <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 pb-4">
                <span class="text-[11px] uppercase tracking-wider text-gris-medio w-24 shrink-0 font-bold">Overline</span>
                <span class="font-georama font-semibold text-[12px] uppercase tracking-widest text-gris-medio flex-1">Texto Superpuesto</span>
                <span class="text-xs font-mono text-gris-medio">12px / Semibold / 1.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 03 Iconografía -->
      <section id="iconografia" class="scroll-mt-[100px] mb-20 reveal" [class.active]="revealed().has('iconografia')">
        <div class="flex items-baseline gap-3 mb-8">
          <span class="font-mulish font-bold text-xs text-baltico border border-surface-strong rounded px-2 py-1">03</span>
          <h2 class="font-mulish font-bold text-2xl text-petroleo">Iconografía Técnica</h2>
        </div>
        <div class="bg-white border border-surface-border rounded-xl p-6">
          <div class="flex items-center gap-4 mb-6 p-4 bg-gris-base rounded-lg text-sm text-gris-dark">
            <span class="material-symbols-outlined text-baltico">info</span>
            <p>Material Symbols · <b>Weight: 400</b> · <b>Grade: 0</b> · Área interactiva: 44x44px. Prohibido el uso de sombras.</p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            @for (icon of icons; track icon.name) {
              <div class="flex flex-col items-center justify-center p-4 bg-gris-base border border-transparent hover:border-baltico transition-colors rounded-lg group cursor-pointer">
                <span class="material-symbols-outlined text-baltico text-[28px] mb-2 group-hover:scale-110 transition-transform">{{ icon.icon }}</span>
                <span class="text-[10px] font-medium text-gris-dark text-center">{{ icon.name }}</span>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- 04 Componentes -->
      <section id="componentes" class="scroll-mt-[100px] mb-20 reveal" [class.active]="revealed().has('componentes')">
        <div class="flex items-baseline gap-3 mb-8">
          <span class="font-mulish font-bold text-xs text-baltico border border-surface-strong rounded px-2 py-1">04</span>
          <h2 class="font-mulish font-bold text-2xl text-petroleo">Componentes (Interacción Plana)</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-token-04">
          <!-- Botones -->
          <div class="bg-white border border-surface-border rounded-xl p-6 md:p-8">
            <h3 class="font-mulish font-bold text-[14px] text-petroleo mb-6 flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-gris-medio">smart_button</span>
              Botones de Acción
            </h3>
            <p class="text-xs text-gris-medio mb-6">Altura 48px. Sin sombra. Hover mediante cambio de color sólido.</p>
            <div class="space-y-6">
              <div class="flex flex-wrap items-center gap-4">
                <button class="h-[48px] px-6 bg-baltico text-white font-semibold text-sm rounded-lg hover:bg-baltico-hover focus:ring-4 focus:ring-cian/30 transition-all border border-transparent active:bg-baltico-active flex items-center gap-2">
                  Enviar Datos
                </button>
                <button class="h-[48px] px-6 bg-surface-strong/20 text-gris-medio font-semibold text-sm rounded-lg cursor-not-allowed flex items-center gap-2" disabled>
                  Bloqueado
                </button>
              </div>
              <div class="flex flex-wrap items-center gap-4">
                <button class="h-[48px] px-6 bg-white text-baltico border-2 border-baltico font-semibold text-sm rounded-lg hover:bg-baltico/5 focus:ring-4 focus:ring-cian/30 transition-all flex items-center gap-2">
                  <span class="material-symbols-outlined text-[20px]">download</span>
                  Secundario Outline
                </button>
                <button class="h-[48px] px-4 bg-transparent text-gris-dark font-medium text-sm rounded-lg hover:text-baltico hover:bg-gris-base transition-colors flex items-center gap-2">
                  Ghost Action
                </button>
              </div>
            </div>
          </div>
          <!-- Inputs -->
          <div class="bg-white border border-surface-border rounded-xl p-6 md:p-8">
            <h3 class="font-mulish font-bold text-[14px] text-petroleo mb-6 flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-gris-medio">edit_document</span>
              Inputs y Formularios
            </h3>
            <div class="space-y-5">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-petroleo mb-1">ID de Estación</label>
                <input type="text" placeholder="Ej. ST-409" class="w-full h-[48px] px-4 bg-white border-2 border-surface-border rounded-lg text-sm text-petroleo placeholder-gris-medio focus:outline-none focus:border-cian transition-colors hover:border-surface-strong" />
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-red mb-1">Umbral Temperatura (°C)</label>
                <div class="relative">
                  <input type="number" value="95.5" class="w-full h-[48px] px-4 bg-red-bg border-2 border-red rounded-lg text-sm text-petroleo focus:outline-none focus:ring-4 focus:ring-red/20 transition-all pr-10" />
                  <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-red text-[20px] pointer-events-none">error</span>
                </div>
                <span class="text-xs text-red mt-1 flex items-center gap-1 font-medium">
                  <span class="material-symbols-outlined text-[14px]">warning</span>
                  Valor excede el límite operativo.
                </span>
              </div>
            </div>
          </div>
          <!-- Tarjetas -->
          <div class="bg-white border border-surface-border rounded-xl p-6 md:p-8">
            <h3 class="font-mulish font-bold text-[14px] text-petroleo mb-6 flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-gris-medio">view_agenda</span>
              Tarjetas (Surfaces sin sombra)
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="border border-surface-border rounded-lg p-4 cursor-pointer hover:bg-blue-bg hover:border-cian transition-all group">
                <div class="flex items-center justify-between mb-2">
                  <span class="material-symbols-outlined text-gris-medio group-hover:text-cian transition-colors">sensors</span>
                  <span class="w-2 h-2 rounded-full bg-gris-medio group-hover:bg-cian transition-colors"></span>
                </div>
                <div class="font-bold text-sm text-petroleo">Sensor Estándar</div>
                <div class="text-xs text-gris-medio mt-1">Interacción Hover</div>
              </div>
              <div class="border-2 border-baltico bg-baltico/5 rounded-lg p-4 cursor-pointer transition-all">
                <div class="flex items-center justify-between mb-2">
                  <span class="material-symbols-outlined text-baltico">cell_tower</span>
                  <span class="w-2 h-2 rounded-full bg-baltico relative">
                    <span class="absolute inset-0 rounded-full bg-baltico animate-ping opacity-75"></span>
                  </span>
                </div>
                <div class="font-bold text-sm text-petroleo">Estación Activa</div>
                <div class="text-xs text-baltico font-medium mt-1">Estado Seleccionado</div>
              </div>
            </div>
          </div>
          <!-- Feedback -->
          <div class="bg-white border border-surface-border rounded-xl p-6 md:p-8">
            <h3 class="font-mulish font-bold text-[14px] text-petroleo mb-6 flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-gris-medio">notifications</span>
              Mensajes de Estado
            </h3>
            <div class="space-y-3">
              <div class="bg-blue-bg border border-blue-border rounded-lg p-3 flex gap-3 items-start">
                <span class="material-symbols-outlined text-baltico mt-0.5 text-[20px]">info</span>
                <div>
                  <h4 class="font-bold text-[13px] text-petroleo">Calibración Completa</h4>
                  <p class="text-xs text-petroleo/80 mt-0.5">Los sensores han sido actualizados nominalmente.</p>
                </div>
              </div>
              <div class="bg-red-bg border border-red-border rounded-lg p-3 flex gap-3 items-start">
                <span class="material-symbols-outlined text-red mt-0.5 text-[20px]">warning</span>
                <div>
                  <h4 class="font-bold text-[13px] text-red">Anomalía Detectada</h4>
                  <p class="text-xs text-red/80 mt-0.5">Presión barométrica fuera de rango (ST-409).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 05 Navegación y Espaciado -->
      <section id="layout" class="scroll-mt-[100px] mb-20 reveal" [class.active]="revealed().has('layout')">
        <div class="flex items-baseline gap-3 mb-8">
          <span class="font-mulish font-bold text-xs text-baltico border border-surface-strong rounded px-2 py-1">05</span>
          <h2 class="font-mulish font-bold text-2xl text-petroleo">Navegación y Espaciado</h2>
        </div>
        <div class="bg-white border border-surface-border rounded-xl p-6 md:p-8">
          <div class="mb-8">
            <h3 class="font-mulish font-bold text-[14px] text-petroleo mb-4">Tabs de Navegación</h3>
            <div class="bg-gris-base p-1 rounded-lg inline-flex">
              @for (tab of tabs; track tab.id) {
                <button
                  class="px-4 py-2 text-xs font-bold rounded-md transition-all"
                  [class.bg-white]="activeTab === tab.id"
                  [class.text-petroleo]="activeTab === tab.id"
                  [class.shadow-sm]="activeTab === tab.id"
                  [class.text-gris-medio]="activeTab !== tab.id"
                  (click)="activeTab = tab.id"
                >
                  {{ tab.label }}
                </button>
              }
            </div>
            <div class="mt-4 border border-surface-border rounded-lg p-6 bg-gris-base/50 h-32 flex items-center justify-center text-sm text-gris-medio transition-all relative overflow-hidden">
              @for (tab of tabs; track tab.id) {
                <div
                  class="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                  [class.opacity-100]="activeTab === tab.id"
                  [class.opacity-0]="activeTab !== tab.id"
                  [class.pointer-events-none]="activeTab !== tab.id"
                >
                  {{ tab.content }}
                </div>
              }
            </div>
          </div>
          <div>
            <h3 class="font-mulish font-bold text-[14px] text-petroleo mb-4">Sistema de Espaciado (Base 8px)</h3>
            <div class="space-y-3">
              @for (t of spacingTokens; track t.name) {
                <div class="flex items-center gap-4">
                  <div class="w-16 text-xs font-mono text-gris-medio">{{ t.name }}</div>
                  <div class="h-4 bg-cian/50 rounded" [style.width.px]="t.px"></div>
                  <div class="text-xs text-petroleo font-bold">{{ t.px }}px</div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- 07 Contenedores de Datos -->
      <section id="contenedores" class="scroll-mt-[100px] mb-20 reveal" [class.active]="revealed().has('contenedores')">
        <div class="flex items-baseline gap-3 mb-8">
          <span class="font-mulish font-bold text-xs text-baltico border border-surface-strong rounded px-2 py-1">07</span>
          <h2 class="font-mulish font-bold text-2xl text-petroleo">Contenedores de Datos</h2>
        </div>
        <p class="text-gris-dark text-sm mb-6 max-w-3xl">
          Estructuras para visualización densa de información. Las tarjetas de gráficas se unifican bajo
          fondos grises claros con bordes planos. Las tablas implementan scroll horizontal nativo con barras
          de desplazamiento personalizadas y cabeceras fijas (sticky).
        </p>
        <h3 class="font-mulish font-bold text-sm text-petroleo mb-4 uppercase tracking-wider">Sensores Físicos (Gráficas CSS)</h3>
        <p class="text-xs text-gris-dark mb-6">Se eliminan las imágenes estáticas. Se utilizan barras generadas por CSS que permiten animaciones fluidas.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <!-- Temperatura -->
          <div class="bg-white border border-surface-border rounded-xl p-6 flex flex-col items-center group hover:border-baltico transition-colors">
            <div class="w-full h-32 flex items-end justify-center mb-6 border-b border-surface-border relative px-4 bg-gris-base/30 rounded-t-lg">
              <div class="absolute inset-0 flex flex-col justify-between pointer-events-none py-2 px-2">
                <div class="border-t border-surface-border/60 w-full flex justify-end"><span class="text-[9px] text-gris-medio -mt-3 bg-white px-1">40°</span></div>
                <div class="border-t border-surface-border/60 w-full flex justify-end"><span class="text-[9px] text-gris-medio -mt-3 bg-white px-1">20°</span></div>
                <div class="border-t border-surface-border/60 w-full flex justify-end"><span class="text-[9px] text-gris-medio -mt-3 bg-white px-1">0°</span></div>
              </div>
              <div class="w-10 bg-red border-t-2 border-red-border relative z-10 css-bar-chart group-hover:opacity-90" [style.height.%]="barsAnimated ? 75 : 0" title="30.07 °C"></div>
            </div>
            <div class="font-bold text-[13px] text-petroleo mb-2 uppercase tracking-wide">Temperatura</div>
            <div class="flex items-center gap-2 mb-4">
              <span class="font-mulish font-bold text-3xl text-red">30.07 °C</span>
              <span class="bg-blue-bg border border-baltico/20 text-baltico rounded px-1 flex items-center" title="Señal Estable"><span class="material-symbols-outlined text-[16px]">signal_cellular_alt</span></span>
            </div>
            <div class="text-[11px] text-gris-dark text-center w-full space-y-1.5 bg-gris-base p-2 rounded">
              <div class="flex justify-between px-2"><span>Max.</span> <span class="font-semibold text-petroleo">31.37 °C <span class="font-normal text-gris-medio">11:53h</span></span></div>
              <div class="flex justify-between px-2"><span>Min.</span> <span class="font-semibold text-petroleo">27.30 °C <span class="font-normal text-gris-medio">04:27h</span></span></div>
            </div>
          </div>
          <!-- Precipitación -->
          <div class="bg-white border border-surface-border rounded-xl p-6 flex flex-col items-center group hover:border-baltico transition-colors">
            <div class="w-full h-32 flex items-end justify-center mb-6 border-b border-surface-border relative px-4 bg-gris-base/30 rounded-t-lg">
              <div class="absolute inset-0 flex flex-col justify-between pointer-events-none py-2 px-2">
                <div class="border-t border-surface-border/60 w-full flex justify-end"><span class="text-[9px] text-gris-medio -mt-3 bg-white px-1">10mm</span></div>
                <div class="border-t border-surface-border/60 w-full flex justify-end"><span class="text-[9px] text-gris-medio -mt-3 bg-white px-1">5mm</span></div>
                <div class="border-t border-surface-border/60 w-full flex justify-end"><span class="text-[9px] text-gris-medio -mt-3 bg-white px-1">0mm</span></div>
              </div>
              <div class="w-10 bg-baltico border-t-2 border-cian relative z-10 css-bar-chart group-hover:opacity-90" [style.height.%]="barsAnimated ? 8 : 0" title="0.01 mm"></div>
            </div>
            <div class="font-bold text-[13px] text-petroleo mb-2 uppercase tracking-wide">Precipitación</div>
            <div class="flex items-center gap-2 mb-4">
              <span class="font-mulish font-bold text-3xl text-baltico">0.01 mm</span>
              <span class="bg-blue-bg border border-baltico/20 text-baltico rounded px-1 flex items-center"><span class="material-symbols-outlined text-[16px]">signal_cellular_alt</span></span>
            </div>
            <div class="text-[11px] text-gris-dark text-center w-full space-y-1.5 bg-gris-base p-2 rounded">
              <div class="flex justify-between px-2"><span>Max.</span> <span class="font-semibold text-petroleo">0.1 mm <span class="font-normal text-gris-medio">09:17h</span></span></div>
              <div class="flex justify-between px-2 text-transparent select-none"><span>Min.</span> <span>--</span></div>
            </div>
          </div>
          <!-- Humedad -->
          <div class="bg-white border border-surface-border rounded-xl p-6 flex flex-col items-center group hover:border-baltico transition-colors">
            <div class="w-full h-32 flex items-end justify-center mb-6 border-b border-surface-border relative px-4 bg-gris-base/30 rounded-t-lg">
              <div class="absolute inset-0 flex flex-col justify-between pointer-events-none py-2 px-2">
                <div class="border-t border-surface-border/60 w-full flex justify-end"><span class="text-[9px] text-gris-medio -mt-3 bg-white px-1">100%</span></div>
                <div class="border-t border-surface-border/60 w-full flex justify-end"><span class="text-[9px] text-gris-medio -mt-3 bg-white px-1">50%</span></div>
                <div class="border-t border-surface-border/60 w-full flex justify-end"><span class="text-[9px] text-gris-medio -mt-3 bg-white px-1">0%</span></div>
              </div>
              <div class="w-10 bg-petroleo border-t-2 border-baltico relative z-10 css-bar-chart group-hover:opacity-90" [style.height.%]="barsAnimated ? 79.6 : 0" title="79.6 %"></div>
            </div>
            <div class="font-bold text-[13px] text-petroleo mb-2 uppercase tracking-wide">Humedad</div>
            <div class="flex items-center gap-2 mb-4">
              <span class="font-mulish font-bold text-3xl text-petroleo">79.6 %</span>
              <span class="bg-blue-bg border border-baltico/20 text-baltico rounded px-1 flex items-center"><span class="material-symbols-outlined text-[16px]">signal_cellular_alt</span></span>
            </div>
            <div class="text-[11px] text-gris-dark text-center w-full space-y-1.5 bg-gris-base p-2 rounded">
              <div class="flex justify-between px-2"><span>Max.</span> <span class="font-semibold text-petroleo">92.8 % <span class="font-normal text-gris-medio">03:59h</span></span></div>
              <div class="flex justify-between px-2"><span>Min.</span> <span class="font-semibold text-petroleo">66.0 % <span class="font-normal text-gris-medio">00:01h</span></span></div>
            </div>
          </div>
        </div>

        <!-- Tabla -->
        <h3 class="font-mulish font-bold text-sm text-petroleo mb-4 uppercase tracking-wider">Matriz de Datos (Scroll Horizontal Nativo)</h3>
        <p class="text-xs text-gris-dark mb-4">La primera columna se mantiene fija (sticky). Arrastra con el ratón para hacer scroll horizontal.</p>
        <div class="bg-white border border-surface-border rounded-xl overflow-hidden">
          <div class="overflow-x-auto w-full pb-3 table-scroll" #dataTable>
            <table class="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr class="bg-gris-base border-b-2 border-surface-border">
                  <th class="py-4 px-5 text-xs font-bold text-petroleo uppercase tracking-wider sticky left-0 z-20 bg-gris-base border-r border-surface-border w-[280px]">Estación de Monitoreo</th>
                  <th class="py-4 px-5 text-xs font-bold text-gris-dark uppercase tracking-wider">Fecha / Hora</th>
                  <th class="py-4 px-5 text-xs font-bold text-gris-dark uppercase tracking-wider">Temperatura (°C)</th>
                  <th class="py-4 px-5 text-xs font-bold text-gris-dark uppercase tracking-wider">Humedad (%)</th>
                  <th class="py-4 px-5 text-xs font-bold text-gris-dark uppercase tracking-wider">Precipitación (mm)</th>
                  <th class="py-4 px-5 text-xs font-bold text-gris-dark uppercase tracking-wider">Vel. Viento (km/h)</th>
                  <th class="py-4 px-5 text-xs font-bold text-gris-dark uppercase tracking-wider">Dir. Viento (°)</th>
                  <th class="py-4 px-5 text-xs font-bold text-gris-dark uppercase tracking-wider text-center">Estado de Red</th>
                </tr>
              </thead>
              <tbody class="text-sm text-petroleo bg-white">
                @for (row of stationRows; track row.id) {
                  <tr
                    class="border-b border-surface-border hover:bg-blue-bg/30 transition-colors"
                    [class.bg-gris-base]="row.status === 'offline' && false"
                  >
                    <td class="py-4 px-5 sticky left-0 z-30 bg-white border-r border-surface-border">
                      <div class="font-bold" [class.text-gris-medio]="row.status === 'offline'">{{ row.name }}</div>
                      <div
                        class="text-[11px] font-mono mt-0.5"
                        [class.text-gris-medio]="row.status === 'online'"
                        [class.text-red]="row.status === 'offline'"
                      >
                        @if (row.status === 'online') {
                          ID: {{ row.id }} · {{ row.zone }}
                        } @else {
                          <span class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-[12px]">warning</span>
                            {{ row.zone }}
                          </span>
                        }
                      </div>
                    </td>
                    <td class="py-4 px-5 font-mono text-xs" [class.text-gris-dark]="row.status === 'online'" [class.text-gris-medio]="row.status === 'offline'">{{ row.date }}</td>
                    <td class="py-4 px-5">
                      @if (row.temp !== null) {
                        <span class="font-bold" [class.text-red]="row.temp > 25" [class.text-petroleo]="row.temp <= 25">{{ row.temp.toFixed(2) }}</span>
                      } @else { <span class="text-gris-medio">--</span> }
                    </td>
                    <td class="py-4 px-5 font-medium">{{ row.humidity !== null ? row.humidity.toFixed(2) : '--' }}</td>
                    <td class="py-4 px-5 font-medium text-baltico">{{ row.precip !== null ? row.precip.toFixed(2) : '--' }}</td>
                    <td class="py-4 px-5">{{ row.wind !== null ? row.wind.toFixed(1) : '--' }}</td>
                    <td class="py-4 px-5">{{ row.windDir }}</td>
                    <td class="py-4 px-5 text-center">
                      <span
                        class="w-2.5 h-2.5 rounded-full inline-block"
                        [class.bg-cian]="row.status === 'online'"
                        [style.box-shadow]="row.status === 'online' ? '0 0 0 4px rgba(0,170,238,0.2)' : 'none'"
                        [class.bg-red]="row.status === 'offline'"
                      ></span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 08 Controles -->
      <section id="controles" class="scroll-mt-[100px] mb-20 reveal" [class.active]="revealed().has('controles')" style="position: relative; z-index: 10">
        <div class="flex items-baseline gap-3 mb-8">
          <span class="font-mulish font-bold text-xs text-baltico border border-surface-strong rounded px-2 py-1">08</span>
          <h2 class="font-mulish font-bold text-2xl text-petroleo">Controles e Interacción</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Dropdown -->
          <div class="bg-white border border-surface-border rounded-xl p-6">
            <h3 class="font-mulish font-bold text-[14px] text-petroleo mb-2 uppercase tracking-wide">Buscador / Selector Animado</h3>
            <p class="text-xs text-gris-dark mb-6">Haz clic en el input para ver la animación de despliegue.</p>
            <div class="relative w-full max-w-sm">
              <label class="block text-[11px] font-bold uppercase tracking-wider text-gris-dark mb-1.5">Buscar estaciones:</label>
              <div class="relative cursor-pointer group" (click)="$event.stopPropagation(); toggleDropdown()">
                <input
                  type="text"
                  [ngModel]="selectedStation"
                  (ngModelChange)="onStationSearch($event)"
                  [readonly]="!dropdownOpen"
                  class="w-full h-11 pl-4 pr-10 border border-surface-border bg-white group-hover:border-baltico focus:border-cian focus:outline-none rounded-lg text-[13px] font-medium text-petroleo cursor-pointer transition-colors"
                  [class.ring-2]="dropdownOpen"
                  [class.ring-cian]="dropdownOpen"
                />
                <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gris-medio group-hover:text-baltico transition-colors pointer-events-none">
                  <span class="material-symbols-outlined text-[20px] transition-transform duration-300" [style.transform]="dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'">expand_more</span>
                </button>
              </div>
              <div
                class="dropdown-menu absolute left-0 right-0 top-[72px] bg-white border border-surface-border rounded-lg z-30 overflow-hidden"
                [attr.data-state]="dropdownOpen ? 'open' : 'closed'"
                style="box-shadow: 0 8px 30px rgba(10,35,66,0.1)"
              >
                <div class="p-2 border-b border-surface-border bg-gris-base/50">
                  <div class="relative">
                    <span class="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[16px] text-gris-medio">search</span>
                    <input
                      type="text"
                      placeholder="Filtrar..."
                      [ngModel]="stationFilter"
                      (ngModelChange)="stationFilter = $event"
                      class="w-full h-8 pl-8 pr-3 text-xs border border-surface-border rounded bg-white focus:outline-none focus:border-cian"
                    />
                  </div>
                </div>
                <ul class="max-h-[220px] overflow-y-auto dropdown-scroll text-[13px]">
                  @for (st of filteredStations; track st) {
                    <li
                      class="px-4 py-2.5 text-petroleo border-l-4 border-transparent hover:bg-gris-base cursor-pointer transition-colors"
                      [class.bg-blue-bg]="st === selectedStation"
                      [class.border-baltico]="st === selectedStation"
                      [class.text-baltico]="st === selectedStation"
                      [class.font-bold]="st === selectedStation"
                      (click)="selectStation(st)"
                    >
                      {{ st }}
                    </li>
                  }
                  @if (filteredStations.length === 0) {
                    <li class="px-4 py-2.5 text-gris-medio text-xs italic">Sin resultados</li>
                  }
                </ul>
              </div>
            </div>
          </div>

          <!-- Slider -->
          <div class="bg-white border border-surface-border rounded-xl p-6">
            <h3 class="font-mulish font-bold text-[14px] text-petroleo mb-2 uppercase tracking-wide">Slider Interactivo (Rango)</h3>
            <p class="text-xs text-gris-dark mb-6">Control deslizante sin el estilo por defecto del sistema operativo.</p>
            <div class="max-w-sm">
              <label class="flex justify-between items-end mb-3">
                <span class="text-[11px] font-bold uppercase tracking-wider text-gris-dark">Sensibilidad de Alerta</span>
                <span
                  class="text-xs font-bold text-white px-2 py-1 rounded transition-colors"
                  [style.backgroundColor]="sliderColor()"
                >
                  {{ sliderValue }}%
                </span>
              </label>
              <div class="relative py-2">
                <input type="range" min="0" max="100" [(ngModel)]="sliderValue" class="w-full relative z-10" />
                <div class="absolute top-1/2 left-0 h-1.5 -translate-y-1/2 bg-cian rounded-full z-0 pointer-events-none" [style.width.%]="sliderValue"></div>
              </div>
              <div class="flex justify-between text-[10px] text-gris-medio font-bold uppercase tracking-wider mt-2">
                <span>Bajo</span>
                <span>Medio</span>
                <span>Alto</span>
              </div>
            </div>
          </div>

          <!-- Fecha / Rango Estilo Hotel -->
          <div class="bg-white border border-surface-border rounded-xl p-6 md:col-span-2" style="overflow: visible">
            <h3 class="font-mulish font-bold text-[14px] text-petroleo mb-4">Rango de Fechas</h3>
            <p class="text-xs text-gris-dark mb-4">Selecciona un período haciendo clic en el campo.</p>
            <div class="relative max-w-lg z-10" (click)="$event.stopPropagation()" data-cal="8">
              <!-- Trigger -->
              <div
                class="flex items-center border border-surface-border rounded-lg overflow-hidden cursor-pointer transition-colors"
                [class.border-cian]="calOpen8"
                [class.ring-2]="calOpen8"
                [class.ring-cian]="calOpen8"
                (click)="calOpen8 = !calOpen8"
              >
                <span class="material-symbols-outlined text-gris-medio text-[20px] pl-3">calendar_month</span>
                <div class="flex-1 px-3 py-2.5 text-[13px] font-medium text-petroleo select-none">
                  {{ rangeDisplayText() }}
                </div>
                <span class="material-symbols-outlined text-gris-medio text-[18px] pr-3" [style.transform]="calOpen8 ? 'rotate(180deg)' : 'rotate(0deg)'" style="transition: transform 0.2s">expand_more</span>
              </div>
              <!-- Calendar Dropdown -->
              <div
                class="absolute top-full left-0 mt-2 bg-white border border-surface-border rounded-xl z-50 p-4 transition-all duration-200"
                [class.opacity-0]="!calOpen8"
                [class.pointer-events-none]="!calOpen8"
                [class.scale-95]="!calOpen8"
                [class.opacity-100]="calOpen8"
                [class.scale-100]="calOpen8"
                [class.pointer-events-auto]="calOpen8"
                style="width: 320px; box-shadow: 0 8px 30px rgba(10,35,66,0.12)"
              >
                @if (!showYearPicker8) {
                  <div class="flex items-center justify-between mb-3">
                    <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gris-base text-gris-dark hover:text-baltico transition-colors" (click)="calNavPrev8()">
                      <span class="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <button class="font-mulish font-bold text-sm text-petroleo hover:text-baltico transition-colors cursor-pointer px-2 py-1 rounded hover:bg-gris-base" (click)="showYearPicker8 = true">
                      {{ calMonthName(calMonth_8) }} {{ calYear_8 }}
                    </button>
                    <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gris-base text-gris-dark hover:text-baltico transition-colors" (click)="calNavNext8()">
                      <span class="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </div>
                  <div class="grid grid-cols-7 gap-0 text-center mb-1">
                    @for (d of calWeekDays; track d) {
                      <span class="text-[9px] font-bold text-gris-medio uppercase py-1">{{ d }}</span>
                    }
                  </div>
                  <div class="grid grid-cols-7 gap-0 text-center">
                    @for (cell of calGrid8; track cell.idx) {
                      <div
                        class="h-9 flex items-center justify-center text-[12px] cursor-pointer rounded"
                        [ngClass]="calCellClass8(cell)"
                        (click)="cell.day !== 0 && calSelectDate8(cell.date)"
                      >{{ cell.day !== 0 ? cell.day : '' }}</div>
                    }
                  </div>
                } @else {
                  <div class="flex items-center justify-between mb-3">
                    <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gris-base text-gris-dark hover:text-baltico transition-colors" (click)="calYear_8 = calYear_8 - 1">
                      <span class="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <span class="font-mulish font-bold text-sm text-petroleo">{{ calYear_8 }}</span>
                    <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gris-base text-gris-dark hover:text-baltico transition-colors" (click)="calYear_8 = calYear_8 + 1">
                      <span class="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    @for (m of calMonthNames; track m; let i = $index) {
                      <button
                        class="py-2.5 rounded-lg text-[12px] font-bold transition-colors text-center"
                        [class.bg-baltico]="i === calMonth_8"
                        [class.text-white]="i === calMonth_8"
                        [class.text-petroleo]="i !== calMonth_8"
                        [class.hover:bg-gris-base]="i !== calMonth_8"
                        (click)="calMonth_8 = i; showYearPicker8 = false"
                      >{{ m }}</button>
                    }
                  </div>
                }
                <div class="flex items-center justify-between mt-3 pt-3 border-t border-surface-border">
                  <button class="text-xs font-bold text-baltico hover:text-cian transition-colors" (click)="calClear8()">Limpiar</button>
                  <button class="h-9 px-5 bg-baltico text-white font-semibold text-xs rounded-lg hover:bg-baltico-hover transition-colors" (click)="calOpen8 = false">Aplicar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 09 Informes y Convenciones -->
      <section id="convenciones" class="scroll-mt-[100px] mb-20 reveal" [class.active]="revealed().has('convenciones')" style="position: relative; z-index: 1">
        <div class="flex items-baseline gap-3 mb-8">
          <span class="font-mulish font-bold text-xs text-baltico border border-surface-strong rounded px-2 py-1">09</span>
          <h2 class="font-mulish font-bold text-2xl text-petroleo">Generador de Informes y Convenciones</h2>
        </div>
        <div class="bg-white border border-surface-border rounded-xl p-8 max-w-3xl" style="overflow: visible">
          <div class="border-b border-surface-border pb-6 mb-6">
            <h1 class="font-mulish font-bold text-2xl text-petroleo mb-6">Informe Ocensa</h1>
            <div class="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div class="w-full sm:w-auto">
                <label class="block text-[11px] font-bold uppercase tracking-wider text-gris-dark mb-1.5">Fecha informe:</label>
                <div class="relative z-10" (click)="$event.stopPropagation()" data-cal="9">
                  <!-- Trigger -->
                  <div
                    class="flex items-center border border-surface-border rounded-lg cursor-pointer transition-colors w-full sm:w-64"
                    [class.border-cian]="calOpen9"
                    [class.ring-2]="calOpen9"
                    [class.ring-cian]="calOpen9"
                    (click)="calOpen9 = !calOpen9"
                  >
                    <span class="material-symbols-outlined text-cian text-[20px] pl-3">calendar_month</span>
                    <div class="flex-1 px-3 py-2.5 text-[13px] font-medium text-petroleo select-none">
                      {{ reportDateDisplay() }}
                    </div>
                    <span class="material-symbols-outlined text-gris-medio text-[18px] pr-2" [style.transform]="calOpen9 ? 'rotate(180deg)' : 'rotate(0deg)'" style="transition: transform 0.2s">expand_more</span>
                  </div>
                  <!-- Calendar Dropdown -->
                  <div
                    class="absolute top-full left-0 mt-2 bg-white border border-surface-border rounded-xl z-50 p-4 transition-all duration-200"
                    [class.opacity-0]="!calOpen9"
                    [class.pointer-events-none]="!calOpen9"
                    [class.scale-95]="!calOpen9"
                    [class.opacity-100]="calOpen9"
                    [class.scale-100]="calOpen9"
                    [class.pointer-events-auto]="calOpen9"
                    style="width: 320px; box-shadow: 0 8px 30px rgba(10,35,66,0.12)"
                  >
                    @if (!showYearPicker9) {
                      <div class="flex items-center justify-between mb-3">
                        <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gris-base text-gris-dark hover:text-baltico transition-colors" (click)="calNavPrev9()">
                          <span class="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                        <button class="font-mulish font-bold text-sm text-petroleo hover:text-baltico transition-colors cursor-pointer px-2 py-1 rounded hover:bg-gris-base" (click)="showYearPicker9 = true">
                          {{ calMonthName(calMonth_9) }} {{ calYear_9 }}
                        </button>
                        <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gris-base text-gris-dark hover:text-baltico transition-colors" (click)="calNavNext9()">
                          <span class="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                      </div>
                      <div class="grid grid-cols-7 gap-0 text-center mb-1">
                        @for (d of calWeekDays; track d) {
                          <span class="text-[9px] font-bold text-gris-medio uppercase py-1">{{ d }}</span>
                        }
                      </div>
                      <div class="grid grid-cols-7 gap-0 text-center">
                        @for (cell of calGrid9; track cell.idx) {
                          <div
                            class="h-9 flex items-center justify-center text-[12px] cursor-pointer rounded"
                            [ngClass]="calCellClass9(cell)"
                            (click)="cell.day !== 0 && calSelectDate9(cell.date)"
                          >{{ cell.day !== 0 ? cell.day : '' }}</div>
                        }
                      </div>
                    } @else {
                      <div class="flex items-center justify-between mb-3">
                        <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gris-base text-gris-dark hover:text-baltico transition-colors" (click)="calYear_9 = calYear_9 - 1">
                          <span class="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                        <span class="font-mulish font-bold text-sm text-petroleo">{{ calYear_9 }}</span>
                        <button class="w-8 h-8 flex items-center justify-center rounded hover:bg-gris-base text-gris-dark hover:text-baltico transition-colors" (click)="calYear_9 = calYear_9 + 1">
                          <span class="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                      </div>
                      <div class="grid grid-cols-3 gap-2">
                        @for (m of calMonthNames; track m; let i = $index) {
                          <button
                            class="py-2.5 rounded-lg text-[12px] font-bold transition-colors text-center"
                            [class.bg-baltico]="i === calMonth_9"
                            [class.text-white]="i === calMonth_9"
                            [class.text-petroleo]="i !== calMonth_9"
                            [class.hover:bg-gris-base]="i !== calMonth_9"
                            (click)="calMonth_9 = i; showYearPicker9 = false"
                          >{{ m }}</button>
                        }
                      </div>
                    }
                    <div class="flex items-center justify-between mt-3 pt-3 border-t border-surface-border">
                      <button class="text-xs font-bold text-baltico hover:text-cian transition-colors" (click)="calClear9()">Limpiar</button>
                      <button class="h-9 px-5 bg-baltico text-white font-semibold text-xs rounded-lg hover:bg-baltico-hover transition-colors" (click)="calOpen9 = false">Aplicar</button>
                    </div>
                  </div>
                </div>
              </div>
              <button class="h-11 px-6 bg-baltico text-white font-bold text-[13px] rounded-lg hover:bg-baltico-hover transition-colors active:bg-baltico-active flex items-center gap-2 w-full sm:w-auto justify-center">
                Generar Informe
              </button>
            </div>
          </div>
          <div>
            <div class="flex items-start gap-2 bg-yellow-bg border border-yellow-border p-3 rounded-lg mb-6">
              <span class="material-symbols-outlined text-yellow text-[20px] shrink-0">info</span>
              <p class="text-xs text-petroleo font-medium leading-relaxed">
                <strong class="uppercase text-yellow mr-1">Nota:</strong>
                El descriptor que acompaña al PK corresponde a susceptibilidad a la remoción en masa.
              </p>
            </div>
            <h3 class="text-[11px] font-bold uppercase tracking-widest text-gris-dark mb-4 pl-1">Convenciones del Mapa</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              @for (conv of conventions; track conv.label) {
                <div
                  class="flex items-center gap-3 p-3 rounded border border-surface-border bg-gris-base/30 hover:bg-white transition-colors cursor-default"
                  [class.hover:border-red-border]="conv.level === 'alto'"
                  [class.hover:border-orange-border]="conv.level === 'medio-alto'"
                  [class.hover:border-baltico]="conv.level === 'medio'"
                  [class.hover:border-yellow-border]="conv.level === 'bajo'"
                >
                  <div
                    class="w-9 h-9 rounded flex items-center justify-center shrink-0 border"
                    [style.backgroundColor]="conv.bg"
                    [style.borderColor]="conv.border"
                    [style.color]="conv.color"
                  >
                    <span class="material-symbols-outlined text-[20px]">{{ conv.icon }}</span>
                  </div>
                  <span class="text-sm font-bold uppercase tracking-wide" [class.text-petroleo]="conv.level !== 'despreciable'" [class.text-gris-dark]="conv.level === 'despreciable'">{{ conv.label }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- 10 Visor Geográfico -->
      <section id="mapas" class="scroll-mt-[100px] mb-20 reveal" [class.active]="revealed().has('mapas')">
        <div class="flex items-baseline gap-3 mb-8">
          <span class="font-mulish font-bold text-xs text-baltico border border-surface-strong rounded px-2 py-1">10</span>
          <h2 class="font-mulish font-bold text-2xl text-petroleo">Visor Geográfico (Overlay Flat)</h2>
        </div>
        <p class="text-xs text-gris-dark mb-6">El mapa prescinde de los controles nativos y los reemplaza por una capa de controles planos, integrados y estéticos.</p>
        <div class="border border-surface-border rounded-xl overflow-hidden relative h-[550px] bg-[#9AD5CD] group">
          <div class="absolute inset-0 opacity-80 transition-transform duration-1000 group-hover:scale-105 bg-gradient-to-br from-[#b7e351] via-[#d1ee3b] to-[#68c149]"></div>
          <!-- Top left -->
          <div class="absolute top-5 left-5 flex bg-white border border-surface-border rounded-lg overflow-hidden z-10" style="box-shadow: 0 4px 12px rgba(0,0,0,0.05)">
            <button class="px-5 py-2.5 text-[13px] font-bold bg-blue-bg text-baltico transition-colors">Mapa</button>
            <div class="w-px bg-surface-border"></div>
            <button class="px-5 py-2.5 text-[13px] font-bold text-gris-dark hover:bg-gris-base hover:text-petroleo transition-colors">Satélite</button>
          </div>
          <!-- Top right -->
          <div class="absolute top-5 right-5 flex flex-col gap-3 z-10">
            <button class="w-10 h-10 bg-white border border-surface-border rounded-lg text-gris-dark hover:text-baltico hover:bg-gris-base transition-colors flex items-center justify-center" title="Pantalla Completa" style="box-shadow: 0 4px 12px rgba(0,0,0,0.05)">
              <span class="material-symbols-outlined text-[20px]">fullscreen</span>
            </button>
            <div class="bg-white border border-surface-border rounded-lg flex flex-col overflow-hidden" style="box-shadow: 0 4px 12px rgba(0,0,0,0.05)">
              <button class="w-10 h-10 flex items-center justify-center text-gris-dark hover:text-baltico hover:bg-gris-base transition-colors border-b border-surface-border"><span class="material-symbols-outlined text-[20px]">add</span></button>
              <button class="w-10 h-10 flex items-center justify-center text-gris-dark hover:text-baltico hover:bg-gris-base transition-colors"><span class="material-symbols-outlined text-[20px]">remove</span></button>
            </div>
          </div>
          <!-- Bottom bar -->
          <div class="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-surface-border rounded-xl p-2 flex items-center z-10 w-[90%] max-w-[800px]" style="box-shadow: 0 8px 24px rgba(10,35,66,0.1)">
            <div class="flex bg-gris-base rounded-lg p-1 mr-4 shrink-0">
              <button class="bg-cian text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-md hover:bg-cian-hover transition-colors">Play</button>
              <button class="text-gris-dark hover:text-petroleo text-[11px] font-bold uppercase tracking-wider px-3 py-2 rounded-md transition-colors">Stop</button>
              <button class="text-gris-dark hover:text-petroleo text-[11px] font-bold uppercase tracking-wider px-3 py-2 rounded-md transition-colors">Pause</button>
            </div>
            <div class="flex items-center gap-1 border-r border-surface-border pr-4 mr-4 shrink-0">
              <button class="w-8 h-8 rounded flex items-center justify-center text-gris-dark hover:bg-gris-base transition-colors"><span class="material-symbols-outlined text-[18px]">skip_previous</span></button>
              <button class="w-8 h-8 rounded flex items-center justify-center text-gris-dark hover:bg-gris-base transition-colors"><span class="material-symbols-outlined text-[18px]">skip_next</span></button>
              <button class="ml-2 bg-white border border-baltico text-baltico text-[11px] font-bold uppercase px-3 py-1.5 rounded hover:bg-blue-bg transition-colors">Última Imagen</button>
            </div>
            <div class="flex-1 flex flex-col justify-center px-2 min-w-[200px]">
              <div class="flex justify-between items-center mb-1">
                <span class="text-[10px] font-bold text-petroleo uppercase tracking-wide">Modelo: 2026-06-30 10:00</span>
                <span class="text-[10px] font-bold text-gris-medio uppercase">(Nudos)</span>
              </div>
              <div class="h-2 w-full rounded-full mb-1" style="background: linear-gradient(to right, #0A2342, #006281, #00AAEE, #F1C40F, #C2362B)"></div>
              <div class="flex justify-between text-[9px] font-mono text-gris-dark">
                <span>0</span><span>12</span><span>24</span><span>36</span><span>48</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 11 Estado de Carga -->
      <section id="loader" class="scroll-mt-[100px] mb-20 reveal" [class.active]="revealed().has('loader')">
        <div class="flex items-baseline gap-3 mb-8">
          <span class="font-mulish font-bold text-xs text-baltico border border-surface-strong rounded px-2 py-1">11</span>
          <h2 class="font-mulish font-bold text-2xl text-petroleo">Estado de Carga (Modal Progress)</h2>
        </div>
        <p class="text-xs text-gris-dark mb-8">Modal centrado, limpio, con fondo translúcido y animación de progreso continua.</p>
        <div class="border border-surface-border rounded-xl h-[400px] bg-gris-base relative overflow-hidden flex items-center justify-center">
          <div class="absolute inset-0 bg-petroleo/30 backdrop-blur-sm z-0"></div>
          <div class="bg-white rounded-xl p-8 w-full max-w-[360px] relative z-10 border border-surface-border text-center transform transition-transform hover:scale-105 duration-300" style="box-shadow: 0 20px 40px rgba(10,35,66,0.15)">
            <div class="w-12 h-12 rounded-full bg-blue-bg flex items-center justify-center mx-auto mb-4">
              <span class="material-symbols-outlined text-baltico text-[24px] animate-pulse">cloud_sync</span>
            </div>
            <h3 class="font-mulish font-bold text-lg text-petroleo mb-1">Cargando Archivo</h3>
            <p class="text-xs text-gris-medio mb-6">Por favor espere, procesando matriz de datos meteorológicos...</p>
            <div class="h-2 w-full bg-gris-base rounded-full overflow-hidden relative">
              <div class="absolute top-0 bottom-0 left-0 bg-cian rounded-full animate-progress-bar"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 12 Listas y Feedback -->
      <section id="listas-feedback" class="scroll-mt-[100px] mb-20 reveal" [class.active]="revealed().has('listas-feedback')">
        <div class="flex items-baseline gap-3 mb-8">
          <span class="font-mulish font-bold text-xs text-baltico border border-surface-strong rounded px-2 py-1">12</span>
          <h2 class="font-mulish font-bold text-2xl text-petroleo">Listas y Feedback en Panel</h2>
        </div>
        <div class="grid grid-cols-1 gap-8">
          <!-- Convenciones lista -->
          <div class="bg-white border border-surface-border rounded-xl p-6 max-w-3xl">
            <h3 class="font-mulish font-bold text-[14px] text-petroleo mb-4">Listas de Convenciones</h3>
            <div class="bg-blue-bg/50 border border-blue-border rounded p-3 mb-4">
              <span class="text-xs font-bold text-petroleo uppercase mr-1">NOTA:</span>
              <span class="text-xs text-petroleo">El descriptor que acompaña al PK corresponde a susceptibilidad a la remoción en masa.</span>
            </div>
            <h4 class="text-[11px] font-bold uppercase tracking-wider text-gris-medio mb-3 border-b border-surface-border pb-2">Convenciones</h4>
            <ul class="space-y-3">
              @for (conv of listConventions; track conv.label) {
                <li class="flex items-center gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-gris-medio"></span>
                  <span class="material-symbols-outlined" [style.color]="conv.color">{{ conv.icon }}</span>
                  <span class="text-sm text-gris-dark font-medium uppercase">{{ conv.label }}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <div class="border-t border-gray-200 px-6 py-4 bg-gray-50">
      <div class="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500 font-georama">
        <p>© 2024 ClimateConnector. Todos los derechos reservados. Red de monitoreo climático profesional.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-gray-400 transition-colors">Privacidad</a>
          <a href="#" class="hover:text-gray-400 transition-colors">Términos de Uso</a>
          <a href="#" class="hover:text-gray-400 transition-colors">Soporte Técnico</a>
          <a href="#" class="hover:text-gray-400 transition-colors">Mapa del Sitio</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #EDEEF1;
    }
    .date-picker-hide-native::-webkit-calendar-picker-indicator {
      opacity: 0;
      position: absolute;
      right: 0;
      width: 36px;
      height: 36px;
      cursor: pointer;
    }
    .date-picker-hide-native::-webkit-inner-spin-button,
    .date-picker-hide-native::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  `]
})
export class DesignSystemComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('dataTable') dataTable!: QueryList<ElementRef>;

  toastVisible = false;
  toastMsg = 'Copiado al portapapeles';
  private toastTimeout: any;

  revealed = signal<Set<string>>(new Set());
  private observer: IntersectionObserver | null = null;

  // Color swatches
  mainSwatches = [
    { hex: '#006281', name: 'Mar Báltico', desc: 'Primario · Títulos, hover', rgb: 'RGB 0,98,129' },
    { hex: '#00AAEE', name: 'Azul Cian', desc: 'Secundario · CTA, acentos', rgb: 'RGB 0,174,239' },
  ];
  supportSwatches = [
    { hex: '#808285', name: 'Gris Medio' },
    { hex: '#EDEEF1', name: 'Gris Hielo' },
    { hex: '#000000', name: 'Negro' },
    { hex: '#0A2342', name: 'Azul Petróleo' },
    { hex: '#C2362B', name: 'Precision Red' },
    { hex: '#E5F3FA', name: 'Blue Container' },
    { hex: '#E67E22', name: 'Orange' },
    { hex: '#F1C40F', name: 'Yellow' },
  ];

  // Icons
  icons = [
    { icon: 'device_thermostat', name: 'Temperatura' },
    { icon: 'air', name: 'Viento' },
    { icon: 'humidity_percentage', name: 'Humedad' },
    { icon: 'rainy', name: 'Precipitación' },
    { icon: 'warning', name: 'Alertas' },
    { icon: 'satellite_alt', name: 'Satélites' },
    { icon: 'cloud', name: 'Nubes' },
    { icon: 'sunny', name: 'Cielo Despejado' },
    { icon: 'thunderstorm', name: 'Tormenta' },
    { icon: 'visibility', name: 'Visibilidad' },
    { icon: 'water_drop', name: 'Lluvia' },
    { icon: 'speed', name: 'Presión' },
  ];

  // Tabs
  tabs = [
    { id: 'panel-1', label: 'Datos Crudos', content: 'Vista de matriz de datos...' },
    { id: 'panel-2', label: 'Visualización', content: 'Gráficas climáticas interactivas...' },
    { id: 'panel-3', label: 'Exportar', content: 'Opciones de descarga CSV/PDF...' },
  ];
  activeTab = 'panel-1';

  // Spacing tokens
  spacingTokens = [
    { name: 'Token-02', px: 8 },
    { name: 'Token-03', px: 16 },
    { name: 'Token-04', px: 24 },
    { name: 'Token-05', px: 32 },
    { name: 'Token-06', px: 48 },
  ];

  // Table data
  stationRows: Station[] = [
    { name: 'XXXX', id: 'XXXX', zone: 'XXXX', date: 'XXXX', temp: null, humidity: null, precip: null, wind: null, windDir: 'XXXX', status: 'online' },
    { name: 'XXXX', id: 'XXXX', zone: 'XXXX', date: 'XXXX', temp: null, humidity: null, precip: null, wind: null, windDir: 'XXXX', status: 'online' },
    { name: 'XXXX', id: 'XXXX', zone: 'XXXX', date: '--', temp: null, humidity: null, precip: null, wind: null, windDir: '--', status: 'offline' },
    { name: 'XXXX', id: 'XXXX', zone: 'XXXX', date: 'XXXX', temp: null, humidity: null, precip: null, wind: null, windDir: 'XXXX', status: 'online' },
  ];

  // Bars animation
  barsAnimated = false;

  // Dropdown
  dropdownOpen = false;
  stations = [
    'Monoboya Valeria - Monitoreo PC',
    '01 Vereda El 17 Vía Panamericana',
    'AERODROMO - GPM - TGP GPM',
    'Agrícola Cardenal - Red Canal Clima',
    'Nemocon - El Redil - Sabana',
    'Aguas Blancas - Válvulas Cenit',
  ];
  selectedStation = 'Seleccionar estación...';
  stationFilter = '';

  get filteredStations(): string[] {
    const f = this.stationFilter.toLowerCase();
    return this.stations.filter(s => s.toLowerCase().includes(f));
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onStationSearch(val: string) {
    // No-op: read-only when closed, handled by selectStation when open
  }

  selectStation(name: string) {
    this.selectedStation = name;
    this.dropdownOpen = false;
  }

  // Slider
  sliderValue = 80;
  sliderColor() {
    if (this.sliderValue > 85) return '#C2362B';
    if (this.sliderValue > 50) return '#006281';
    return '#00AAEE';
  }

  // Date
  dateStart = '2026-06-12';
  dateEnd = '2026-06-18';
  reportDate = '2026-06-30';
  calMonthNames = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  private calFullMonthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  calWeekDays = ['Do','Lu','Ma','Mi','Ju','Vi','Sa'];

  // Calendar 08 (Range)
  calOpen8 = false;
  showYearPicker8 = false;
  calYear_8 = 2026;
  calMonth_8 = 5;
  rangeStartDate: Date | null = new Date(2026, 5, 12);
  rangeEndDate: Date | null = new Date(2026, 5, 18);

  // Calendar 09 (Single)
  calOpen9 = false;
  showYearPicker9 = false;
  calYear_9 = 2026;
  calMonth_9 = 5;
  selectedDate: Date | null = new Date(2026, 5, 30);

  // Shared calendar methods
  calMonthName(m: number): string {
    return this.calFullMonthNames[m];
  }

  private calBuildDays(year: number, month: number): { day: number; date: Date; idx: number }[] {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: { day: number; date: Date; idx: number }[] = [];
    let idx = 0;
    for (let i = 0; i < firstDay; i++) {
      cells.push({ day: 0, date: new Date(0), idx: idx++ });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, date: new Date(year, month, d), idx: idx++ });
    }
    return cells;
  }

  // Calendar 08
  get calGrid8() { return this.calBuildDays(this.calYear_8, this.calMonth_8); }

  calNavPrev8() {
    if (this.calMonth_8 === 0) { this.calMonth_8 = 11; this.calYear_8--; } else { this.calMonth_8--; }
  }

  calNavNext8() {
    if (this.calMonth_8 === 11) { this.calMonth_8 = 0; this.calYear_8++; } else { this.calMonth_8++; }
  }

  calSelectDate8(date: Date) {
    if (!this.rangeStartDate || (this.rangeStartDate && this.rangeEndDate)) {
      this.rangeStartDate = date;
      this.rangeEndDate = null;
    } else if (date < this.rangeStartDate) {
      this.rangeStartDate = date;
    } else {
      this.rangeEndDate = date;
    }
  }

  calClear8() {
    this.rangeStartDate = null;
    this.rangeEndDate = null;
  }

  private isRangeStart(d: Date): boolean {
    return !!this.rangeStartDate && d.getTime() === this.rangeStartDate.getTime();
  }

  private isRangeEnd(d: Date): boolean {
    return !!this.rangeEndDate && d.getTime() === this.rangeEndDate.getTime();
  }

  private isInRange(d: Date): boolean {
    if (!this.rangeStartDate || !this.rangeEndDate) return false;
    return d > this.rangeStartDate && d < this.rangeEndDate;
  }

  rangeDisplayText(): string {
    const fmt = (d: Date) => `${d.getDate()} ${this.calMonthNames[d.getMonth()]} ${d.getFullYear()}`;
    if (this.rangeStartDate && this.rangeEndDate) return `${fmt(this.rangeStartDate)} — ${fmt(this.rangeEndDate)}`;
    if (this.rangeStartDate) return `${fmt(this.rangeStartDate)} — Seleccionar fin`;
    return 'Seleccionar fechas...';
  }

  calCellClass8(cell: { day: number; date: Date; idx: number }): Record<string, boolean> {
    const s = this.isRangeStart(cell.date);
    const e = this.isRangeEnd(cell.date);
    const r = this.isInRange(cell.date);
    return {
      'text-gris-medio pointer-events-none': cell.day === 0,
      'bg-baltico text-white font-bold': cell.day !== 0 && s,
      'bg-cian text-white font-bold': cell.day !== 0 && e && !s,
      'bg-cyan-100': cell.day !== 0 && r && !s && !e,
      'hover:bg-gris-base': cell.day !== 0 && !s && !e,
    };
  }

  // Calendar 09
  get calGrid9() { return this.calBuildDays(this.calYear_9, this.calMonth_9); }

  calNavPrev9() {
    if (this.calMonth_9 === 0) { this.calMonth_9 = 11; this.calYear_9--; } else { this.calMonth_9--; }
  }

  calNavNext9() {
    if (this.calMonth_9 === 11) { this.calMonth_9 = 0; this.calYear_9++; } else { this.calMonth_9++; }
  }

  calSelectDate9(date: Date) {
    this.selectedDate = date;
  }

  calClear9() {
    this.selectedDate = null;
  }

  reportDateDisplay(): string {
    if (!this.selectedDate) return 'Seleccionar fecha...';
    const d = this.selectedDate;
    return `${d.getDate()} ${this.calMonthNames[d.getMonth()]} ${d.getFullYear()}`;
  }

  calCellClass9(cell: { day: number; date: Date; idx: number }): Record<string, boolean> {
    const isSelected = this.selectedDate !== null && cell.day !== 0 && cell.date.getTime() === this.selectedDate.getTime();
    return {
      'text-gris-medio pointer-events-none': cell.day === 0,
      'bg-baltico text-white font-bold': isSelected,
      'hover:bg-gris-base': cell.day !== 0 && !isSelected,
    };
  }

  // Conventions (badges)
  conventions = [
    { label: 'Alto', level: 'alto', icon: 'thunderstorm', bg: '#FBEAE8', border: '#E8A39B', color: '#C2362B' },
    { label: 'Medio Alto', level: 'medio-alto', icon: 'rainy', bg: '#FDF2E9', border: '#F5CBA7', color: '#E67E22' },
    { label: 'Medio', level: 'medio', icon: 'cloud', bg: '#E5F3FA', border: '#A9D9EF', color: '#006281' },
    { label: 'Bajo', level: 'bajo', icon: 'partly_cloudy_day', bg: '#FEF9E7', border: '#F9E79F', color: '#F1C40F' },
    { label: 'Despreciable', level: 'despreciable', icon: 'sunny', bg: '#FFFFFF', border: '#AEB6BD', color: '#5C5E60' },
  ];

  // List conventions
  listConventions = [
    { label: 'Alto', icon: 'thunderstorm', color: '#C2362B' },
    { label: 'Medio Alto', icon: 'rainy', color: '#006281' },
    { label: 'Medio', icon: 'cloud', color: '#5C5E60' },
    { label: 'Bajo', icon: 'partly_cloudy_day', color: '#F1C40F' },
    { label: 'Despreciable', icon: 'sunny', color: '#E67E22' },
  ];

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative.w-full.max-w-sm')) {
      this.dropdownOpen = false;
    }
    if (!target.closest('[data-cal="8"]')) {
      this.calOpen8 = false;
      this.showYearPicker8 = false;
    }
    if (!target.closest('[data-cal="9"]')) {
      this.calOpen9 = false;
      this.showYearPicker9 = false;
    }
  }

  copyHex(hex: string) {
    navigator.clipboard.writeText(hex).then(() => {
      this.toastMsg = `Copiado: ${hex}`;
      this.toastVisible = true;
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => { this.toastVisible = false; }, 2500);
    }).catch(() => {
      this.toastMsg = `Copiado: ${hex}`;
      this.toastVisible = true;
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => { this.toastVisible = false; }, 2500);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // Intersection observer for reveal
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id || 'hero';
            const current = new Set(this.revealed());
            current.add(id);
            this.revealed.set(current);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('.reveal').forEach(el => this.observer?.observe(el));
      this.revealed.set(new Set(['hero']));

      // Bars animation
      setTimeout(() => { this.barsAnimated = true; }, 500);

      // Drag-to-scroll on table
      this.setupDragScroll();
    }, 100);
  }

  private setupDragScroll() {
    const container = this.dataTable?.first?.nativeElement as HTMLElement | undefined;
    if (!container) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onDown = (e: MouseEvent) => {
      isDown = true;
      container.classList.add('cursor-grabbing');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };
    const onLeave = () => {
      isDown = false;
      container.classList.remove('cursor-grabbing');
    };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', onDown);
    container.addEventListener('mouseleave', onLeave);
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseup', onLeave);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    clearTimeout(this.toastTimeout);
  }
}