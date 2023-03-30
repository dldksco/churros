/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx, ts, tsx}"],
  theme: {
    extend: {
      spacing: {
        "10vh": "10vh",
        "10%": "10%",
        "20%": "20%",
        "25%": "25%",
        "108px": "108px",
        "1080px": "1080px",
      },
    },
  },
  plugins: [],
};
