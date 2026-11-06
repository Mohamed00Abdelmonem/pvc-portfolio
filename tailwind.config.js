/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1769AA',          // Primary Blue (#1769AA)
          'primary-dark': '#115286',
          'primary-light': '#2580C7',
          navy: '#123B5D',             // Deep Navy (#123B5D)
          'navy-dark': '#0B253D',
          'navy-light': '#1C4F7A',
          sky: '#36A9E1',              // Sky Blue (#36A9E1)
          'sky-soft': '#8ED3F4',
          'sky-pale': '#E1F2FB',
          light: '#E8F2FA',            // Light Blue (#E8F2FA)
          'light-border': '#D0E4F5',
          'cool-white': '#F4F7FA',     // Cool White (#F4F7FA)
          white: '#FFFFFF',            // Pure White (#FFFFFF)
          slate: '#263746',            // Dark Slate (#263746)
          muted: '#4A5D6E',            // WCAG AA Compliant Muted Text (#4A5D6E, >4.8:1 contrast)
          'muted-light': '#687C8F',
          'muted-dark': '#334454',
        }
      },
      fontFamily: {
        alexandria: ['Alexandria', 'sans-serif'],
        'ibm-arabic': ['IBM Plex Sans Arabic', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      lineHeight: {
        arabicRelaxed: '1.85',
        arabicHeading: '1.22',
      }
    },
  },
  plugins: [],
}
