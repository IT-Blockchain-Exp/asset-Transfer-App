/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: { // Correct key is 'colors'
        customgray: "#333333", // Light gray
        customdark: "#1A1A1A", // Custom dark color for gradient or background
      },
    },
  },
  plugins: [],
}
  