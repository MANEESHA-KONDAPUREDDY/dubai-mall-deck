/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Cinematic dark base
        ink: '#0a0a0b',
        'ink-soft': '#121214',
        surface: '#1a1a1e',
        line: 'rgba(244, 242, 237, 0.10)',
        // Light editorial type
        bone: '#f4f2ed',
        mist: '#9b978f',
        // Luxury accent
        gold: '#c8a35a',
        'gold-bright': '#e3c483',
        // Entertainment / energy accent
        spark: '#ff6b4a',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      maxWidth: {
        deck: '1320px',
      },
      transitionTimingFunction: {
        cinema: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slow-zoom': 'slow-zoom 20s ease-out both',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};
