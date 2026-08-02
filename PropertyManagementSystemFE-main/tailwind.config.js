/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',  // Lighter orange
          500: '#f97316',  // Main orange
          600: '#ea580c',  // Slightly darker
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      backgroundColor: {
        'orange-light': '#ffedd5',
      },
      textColor: {
        'orange-light': '#fb923c',
      },
      borderColor: {
        'orange-light': '#fed7aa',
      }
    },
  },
  plugins: [],
};