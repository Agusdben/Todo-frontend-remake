/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        1: '1px'
      },
      colors: {
        black: '#020202',
        'black-900': '#050505',
        'black-800': '#111111',
        'black-700': '#151515',
        'black-500': '#222222',
        white: '#fafafafa',
        primary: '#72d1f1fa',
        red: '#b91c1c'
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto'
      },
      animation: {
        'to-left': 'to-left 1s linear'
      },
      keyframes: {
        'to-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      }
    }
  },
  plugins: []
}
