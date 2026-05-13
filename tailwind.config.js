/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        axon: {
          navy: '#0D1F3C',
          panel: '#10223F',
          deep: '#081428',
          teal: '#00D4AA',
          blue: '#3b82f6'
        },
        status: {
          healthy: '#22c55e',
          degraded: '#eab308',
          alarm: '#ef4444',
          offline: '#6b7280'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};
