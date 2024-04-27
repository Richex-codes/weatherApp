/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["public/*.{html,js}"],
  theme: {
    extend: {
      colors: {
      primary: "#FF6363",
      secondary: {
        100: "#a6c5bf",
        200: "#38665d",
      },
    },
    fontFamily: {
      newfont: ["Nunito"],
    },
  },
  },
  plugins: [],
}

