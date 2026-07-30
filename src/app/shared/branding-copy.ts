export type BrandingFeatureIcon = 'satellite' | 'chart' | 'globe' | 'screen';

export interface BrandingFeature {
  icon: BrandingFeatureIcon;
  title: string;
  desc: string;
}

export interface BrandingCopy {
  headline: string;
  description: string;
  features: BrandingFeature[];
}

const es: BrandingCopy = {
  headline: 'Monitoreo continuo. Decisiones estratégicas.',
  description: 'Plataforma que integra y organiza los datos procesados por Canal Clima, ofreciendo un punto único de acceso para la consulta, visualización y descarga de información',
  features: [
    {
      icon: 'satellite',
      title: 'Monitoreo en tiempo real',
      desc: 'Seguimiento continuo de variables meteorológicas y ambientales.',
    },
    {
      icon: 'chart',
      title: 'Pronósticos precisos',
      desc: 'Modelos avanzados para anticipar el tiempo con alta precisión.',
    },
    {
      icon: 'globe',
      title: 'Datos que impactan',
      desc: 'Información confiable para la gestión de riesgos y la toma de decisiones.',
    },
    {
      icon: 'screen',
      title: 'Plataforma integral',
      desc: 'Herramientas y APIs para visualizar, integrar y compartir datos.',
    },
  ],
};

const en: BrandingCopy = {
  headline: 'Continuous monitoring. Strategic decisions.',
  description: 'Platform that integrates and organizes the geoscientific data processed by Canal Clima, offering a single point of access for consulting, visualization and data download.',
  features: [
    {
      icon: 'satellite',
      title: 'Real-time monitoring',
      desc: 'Continuous tracking of meteorological and environmental variables.',
    },
    {
      icon: 'chart',
      title: 'Accurate forecasts',
      desc: 'Advanced models to anticipate weather with high precision.',
    },
    {
      icon: 'globe',
      title: 'Impactful data',
      desc: 'Reliable information for risk management and decision making.',
    },
    {
      icon: 'screen',
      title: 'Comprehensive platform',
      desc: 'Tools and APIs to visualize, integrate and share data.',
    },
  ],
};

export function getBrandingCopy(lang: 'es' | 'en'): BrandingCopy {
  return lang === 'es' ? es : en;
}
