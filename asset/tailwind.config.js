/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'crypto-gradient': 'linear-gradient(to right, #1E3A8A, #6B21A8, #4F46E5)', // Custom gradient
      },
    },
  },
  plugins: [],
}