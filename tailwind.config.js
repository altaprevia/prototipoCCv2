/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'],
        georama: ['Georama', 'sans-serif'],
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
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
