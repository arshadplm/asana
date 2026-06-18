import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#060B17',
        midnight: '#091425',
        'deep-navy': '#0C1B30',
        navy: '#122038',
        'navy-light': '#1A3050',
        'navy-mist': '#243D5C',
        emerald: {
          deep: '#051F16',
          dark: '#0A3D2B',
          DEFAULT: '#0C5E42',
          light: '#107A55',
          bright: '#15A870',
          glow: '#1FD68E',
        },
        gold: {
          dark: '#8B6914',
          DEFAULT: '#C9A96E',
          light: '#E0C490',
          pale: '#F2E3C8',
          shimmer: '#F5D78A',
        },
        rose: {
          dark: '#8A5050',
          DEFAULT: '#C4868A',
          light: '#DBA8AB',
          blush: '#F0D4D6',
        },
        cream: '#F0EBE3',
        pearl: '#FAF7F2',
        muted: '#7A90A8',
        'muted-dark': '#3E526A',
        'muted-light': '#A8BCCE',
        glass: 'rgba(9, 20, 37, 0.7)',
        'glass-light': 'rgba(18, 32, 56, 0.5)',
        'glass-emerald': 'rgba(12, 94, 66, 0.15)',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '10xl': ['10rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '11xl': ['12rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        '12xl': ['14rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'fade-in-down': 'fadeInDown 0.8s ease forwards',
        'slide-in-left': 'slideInLeft 0.8s ease forwards',
        'slide-in-right': 'slideInRight 0.8s ease forwards',
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-fast': 'float 5s ease-in-out infinite',
        'orb-drift': 'orbDrift 15s ease-in-out infinite',
        'orb-drift-alt': 'orbDriftAlt 18s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'text-shimmer': 'textShimmer 4s ease-in-out infinite',
        'scroll-bounce': 'scrollBounce 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-24px)' },
        },
        orbDrift: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)', opacity: '0.4' },
          '25%': { transform: 'translate(3%, -4%) scale(1.08)', opacity: '0.6' },
          '50%': { transform: 'translate(-2%, 3%) scale(0.94)', opacity: '0.35' },
          '75%': { transform: 'translate(4%, 1%) scale(1.04)', opacity: '0.5' },
        },
        orbDriftAlt: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)', opacity: '0.3' },
          '33%': { transform: 'translate(-4%, 3%) scale(1.1)', opacity: '0.5' },
          '66%': { transform: 'translate(3%, -2%) scale(0.9)', opacity: '0.25' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        borderGlow: {
          '0%, 100%': { boxShadow: '0 0 12px 2px rgba(12, 200, 122, 0.2)' },
          '50%': { boxShadow: '0 0 28px 6px rgba(12, 200, 122, 0.5)' },
        },
        textShimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.5' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #060B17 0%, #0C1B30 50%, #060B17 100%)',
        'emerald-glow': 'radial-gradient(ellipse at center, rgba(12, 94, 66, 0.4) 0%, transparent 70%)',
        'gold-glow': 'radial-gradient(ellipse at center, rgba(201, 169, 110, 0.3) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(135deg, #060B17 0%, #091425 40%, #0C1B30 70%, #060B17 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 4px 32px -8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glass-lg': '0 8px 48px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
        emerald: '0 0 24px rgba(12, 94, 66, 0.4)',
        'emerald-lg': '0 0 48px rgba(12, 94, 66, 0.3)',
        gold: '0 0 24px rgba(201, 169, 110, 0.3)',
        inner: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 20px 60px -12px rgba(0, 0, 0, 0.8)',
      },
      screens: {
        xs: '390px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}

export default config
