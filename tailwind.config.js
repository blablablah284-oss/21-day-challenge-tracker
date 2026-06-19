/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0e27',
          card: '#1a1f3a',
          border: '#2a3f5f',
        },
        neon: {
          cyan: '#00d4ff',
          purple: '#b366ff',
          green: '#00ff88',
          pink: '#ff006e',
        }
      },
      backdropBlur: {
        xl: '20px',
      },
      boxShadow: {
        neon: '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(179, 102, 255, 0.5)',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        slideIn: 'slideIn 0.6s ease-out',
      }
    },
  },
  plugins: [],
}
