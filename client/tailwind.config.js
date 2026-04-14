/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F7',
        accent: '#5C5BD4',
        'accent-soft': 'rgba(92, 91, 212, 0.1)',
        'accent-hover': '#4A49B8',
        neutral: {
          50: '#FDFCFB',
          100: '#FAF9F7',
          200: '#EFECE9',
          // ... more if needed
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        editorial: '1.7',
      }
    },
  },
  plugins: [],
}
