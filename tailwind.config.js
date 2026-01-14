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
        primary: {
          DEFAULT: '#10b981', // emerald-500
          light: '#34d399', // emerald-400
          dark: '#059669', // emerald-600
        },
        teal: {
          DEFAULT: '#14b8a6', // teal-500
        }
      },
    },
  },
  plugins: [],
}
