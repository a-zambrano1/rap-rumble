/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verde': '#2D8F1D',
        'verdesito': '#4CAF50', // Replace with the actual lighter color
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
    }
  },
  plugins: [],
}