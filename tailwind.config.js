/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cinematic: {
          darkest: '#000814',
          dark: '#001428',
          card: '#021833',
          border: 'rgba(56, 189, 248, 0.15)',
          lightBg: '#f4f7fb',
          lightCard: '#ffffff',
          lightBorder: 'rgba(15, 23, 42, 0.08)',
          accent: '#38bdf8',
          accentGold: '#f59e0b',
          accentGreen: '#10b981',
          accentRose: '#f43f5e',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
        display: ['var(--font-syne)', 'sans-serif'],
        handwriting: ['var(--font-caveat)', 'cursive'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'badge-sway': 'badgeSway 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        badgeSway: {
          '0%, 100%': { transform: 'rotate(-2.5deg) translateY(0px)' },
          '50%': { transform: 'rotate(2.5deg) translateY(-4px)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
