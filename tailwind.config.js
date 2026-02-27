/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'microsoft-blue': '#00a4ef', // Swapped to a brighter blue to match target
        'microsoft-blue-hover': '#0082c3',
      },
    },
  },
  plugins: [],
}