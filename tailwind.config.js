/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ev-green': '#10B981',
        'ev-blue': '#3B82F6',
        'ev-dark': '#1F2937',
      }
    },
  },
  plugins: [],
}
