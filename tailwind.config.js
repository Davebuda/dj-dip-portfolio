/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dip-black':    '#080404',
        'dip-dark':     '#130909',
        'dip-card':     '#1A0F0F',
        'dip-red':      '#BF2D1E',
        'dip-red-dark': '#8A1A0F',
        'dip-rose':     '#C4938A',
        'dip-cream':    '#F5F0EE',
        'dip-muted':    '#7A6260',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        script:  ['"Great Vibes"', 'cursive'],
        body:    ['"Space Grotesk"', '"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
