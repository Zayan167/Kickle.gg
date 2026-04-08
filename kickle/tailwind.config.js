/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#080b0f',
          secondary: '#0e1218',
          tertiary: '#141920',
          card: '#1a2030',
          hover: '#1f2a3a',
        },
        brand: {
          DEFAULT: '#00d97e',
          dim: '#00b366',
          glow: 'rgba(0, 217, 126, 0.15)',
        },
        tile: {
          green: '#22c55e',
          yellow: '#eab308',
          gray: '#374151',
          'green-bg': 'rgba(34,197,94,0.15)',
          'yellow-bg': 'rgba(234,179,8,0.15)',
          'gray-bg': 'rgba(55,65,81,0.5)',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          bright: 'rgba(255,255,255,0.12)',
          brand: 'rgba(0,217,126,0.3)',
        },
      },
      animation: {
        'flip-in': 'flipIn 0.5s ease forwards',
        'bounce-in': 'bounceIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        'slide-up': 'slideUp 0.3s ease',
        'fade-in': 'fadeIn 0.3s ease',
        'shake': 'shake 0.4s ease',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'row-reveal': 'rowReveal 0.4s ease forwards',
      },
      keyframes: {
        flipIn: {
          '0%': { transform: 'rotateX(90deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(0,217,126,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0,217,126,0.4)' },
        },
        rowReveal: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'brand-gradient': 'linear-gradient(135deg, #00d97e 0%, #00b8a9 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(26,32,48,0.8) 0%, rgba(14,18,24,0.9) 100%)',
      },
    },
  },
  plugins: [],
};
