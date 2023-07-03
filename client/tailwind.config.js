/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Playfair Display', "serif"],
      },
      boxShadow: {
        'text-shadow-sm': '0 2px 0 rgba(0, 0, 0, 0.25)',
        'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.5)',
        'text-shadow-lg': '10px 4px 6px rgba(255, 255, 255, 0.8)',
      },
    },
  },
  plugins: [],
}

