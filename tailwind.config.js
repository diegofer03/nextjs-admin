/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors') //agregar colores

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      //agregando colores previamente definidos
      ...colors
    },
    extend: {}
  },
  plugins: []
}
