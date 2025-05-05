/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf-pro': ['"SF Pro Display"', 'sans-serif']
      },
      colors: {
        'pure-black': '#000000',
        'pure-white': '#FFFFFF',
        'glass': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}