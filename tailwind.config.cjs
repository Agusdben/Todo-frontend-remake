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
        primary: '#72d1f1fa'
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto'
      }
    }
  },
  plugins: []
}
