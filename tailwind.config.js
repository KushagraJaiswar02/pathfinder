/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8f9fb',
        primary: '#1a1a1a',
        secondary: '#64748b',
        accent: {
          light: '#eef2ff',
          DEFAULT: '#4f46e5',
          dark: '#4338ca',
        },
      },
      scale: {
        102: '1.02',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },

    },
  },
  plugins: [],
}
