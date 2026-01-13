/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional Academic Color Palette
        primary: {
          50: '#e6eaf0',
          100: '#c2ccd9',
          200: '#9aadc2',
          300: '#728eab',
          400: '#54769a',
          500: '#365e89',
          600: '#2f5681',
          700: '#264c76',
          800: '#1e426c',
          900: '#1a365d', // Main navy
        },
        secondary: {
          500: '#2c5282',
          600: '#2a4a73',
          700: '#274264',
        },
        accent: {
          red: '#c53030',    // Vietnam red
          gold: '#d69e2e',   // Vietnam gold
        }
      },
      fontFamily: {
        heading: ['Roboto Slab', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

