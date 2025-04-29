/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        splash: {
          primary: '#00FFFF',    // Cyan
          secondary: '#FF00FF',  // Magenta
          accent: '#FFD700',     // Gold accent
          dark: {
            950: '#000000',      // Pure black
            900: '#000000',      // Pure black
            800: '#000000',      // Pure black
            700: '#111111',
            600: '#1A1A1A',
            500: '#262626',
            400: '#333333',
            300: '#404040',
            200: '#4D4D4D',
            100: '#595959'
          }
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 1s ease-in',
        'slide-up': 'slide-up 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1) drop-shadow(0 0 10px currentColor)'
          },
          '50%': {
            opacity: '0.8',
            filter: 'brightness(1.2) drop-shadow(0 0 20px currentColor)'
          }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        'glow': {
          '0%': {
            textShadow: '0 0 10px currentColor'
          },
          '100%': {
            textShadow: '0 0 30px currentColor, 0 0 50px currentColor'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-20px)'
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(transparent 97%, var(--tw-gradient-stops) 3%), linear-gradient(90deg, transparent 97%, var(--tw-gradient-stops) 3%)'
      }
    }
  },
  plugins: [],
};