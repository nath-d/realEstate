/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        parisienne: ['Parisienne', 'cursive'],
        cormorant: ['Cormorant Garamond', 'serif'],
        magnolia: ['MagnoliaNormal', 'sans-serif'],
        'source-serif': ['"Source Serif 4"', 'serif'],
        cardo: ['Cardo', 'serif'],
        gloock: ['Gloock', 'serif'],
      },
    },
  },
  plugins: [],
}

