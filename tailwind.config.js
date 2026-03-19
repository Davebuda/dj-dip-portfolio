/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dip-black':    '#080808',
        'dip-dark':     '#0c0c0c',
        'dip-card':     '#111111',
        'dip-red':      '#E63020',
        'dip-red-dark': '#BF2D1E',
        'dip-rose':     '#D44040',
        'dip-cream':    '#F5F0EE',
        'dip-muted':    '#7A6260',
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        heading: ['"Cabinet Grotesk"', 'system-ui', 'sans-serif'],
        body:    ['Satoshi', 'system-ui', 'sans-serif'],
        mono:    ['"DM Mono"', 'ui-monospace', 'monospace'],
        script:  ['"Great Vibes"', 'cursive'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        wide: '0.08em',
        wider: '0.15em',
        widest: '0.35em',
        'ultra-wide': '0.6em',
      },
      boxShadow: {
        'red-sm': '0 0 10px rgba(230, 48, 32, 0.15)',
        'red-md': '0 0 20px rgba(230, 48, 32, 0.25)',
        'red-lg': '0 0 40px rgba(230, 48, 32, 0.4)',
        'red-xl': '0 0 60px rgba(230, 48, 32, 0.5)',
      },
    },
  },
  plugins: [],
}
