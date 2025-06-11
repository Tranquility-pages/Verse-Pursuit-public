import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        biblical: {
          50: '#faf7f0',
          100: '#f4eed7',
          200: '#e8dbb0',
          300: '#d9c182',
          400: '#cba55c',
          500: '#bf9145',
          600: '#a57939',
          700: '#8a5f31',
          800: '#734e2d',
          900: '#61422a',
        },
        parchment: {
          50: '#fefdf8',
          100: '#fcf9e8',
          200: '#f8f1cd',
          300: '#f1e5a7',
          400: '#e8d481',
          500: '#dcc05b',
          600: '#c2a044',
          700: '#a1803a',
          800: '#836634',
          900: '#6d532d',
        }
      },
      fontFamily: {
        biblical: ['Cinzel', 'serif'],
      },
      animation: {
        'bounce-in': 'bounceIn 0.5s ease-out',
        'flip': 'flip 0.6s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        flip: {
          '0%': { transform: 'rotateY(0)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config