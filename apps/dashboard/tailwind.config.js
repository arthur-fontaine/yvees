/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "../index.html",
    "./src/**/**/*.{ts,tsx}",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#E47B0C',
      },
      fontFamily: {}
    },
  },
  plugins: [],
}

