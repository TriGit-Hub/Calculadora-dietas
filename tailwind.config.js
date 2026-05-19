/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#0071e3',
          green: '#30d158',
          amber: '#ff9f0a',
          red: '#ff453a',
          gray: '#f5f5f7',
          dark: '#1d1d1f',
          mid: '#6e6e73',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 2px 12px rgba(0,0,0,0.08)',
        'apple-md': '0 4px 24px rgba(0,0,0,0.10)',
      }
    },
  },
  plugins: [],
}
