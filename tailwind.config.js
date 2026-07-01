/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'],
        georama: ['Georama', 'sans-serif'],
        display: ['Mulish', 'sans-serif'],
        body: ['Georama', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '12px',
      },
      colors: {
        navy: {
          800: '#1a2a4e',
          900: '#0f1a2e',
          950: '#0a0f1a',
        },
        slate: {
          50: '#f5f5f5',
          100: '#eeeeee',
          200: '#e0e0e0',
          300: '#d0d0d0',
          400: '#999999',
          500: '#757575',
          600: '#666666',
          700: '#424242',
          800: '#333333',
        },
        cyan: {
          400: '#4dd0e1',
          500: '#26c6da',
        },
        baltico: {
          DEFAULT: '#006281',
          hover: '#004a61',
          active: '#003647',
        },
        cian: {
          DEFAULT: '#00AAEE',
          hover: '#0089c2',
        },
        petroleo: '#0A2342',
        gris: {
          medio: '#808285',
          base: '#EDEEF1',
          dark: '#5C5E60',
          light: '#F8F9FA',
        },
        red: {
          DEFAULT: '#C2362B',
          bg: '#FBEAE8',
          border: '#E8A39B',
        },
        blue: {
          bg: '#E5F3FA',
          border: '#A9D9EF',
        },
        orange: {
          DEFAULT: '#E67E22',
          bg: '#FDF2E9',
          border: '#F5CBA7',
        },
        yellow: {
          DEFAULT: '#F1C40F',
          bg: '#FEF9E7',
          border: '#F9E79F',
        },
        surface: {
          border: '#D7DCE1',
          strong: '#AEB6BD',
        },
      },
      spacing: {
        'token-02': '8px',
        'token-03': '16px',
        'token-04': '24px',
        'token-05': '32px',
        'token-06': '48px',
        'token-07': '64px',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
