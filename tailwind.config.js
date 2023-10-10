/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/Components/**/*.{js,ts,jsx,tsx}",
    "./src/Components/Layout/**/*.{js,ts,jsx,tsx}",
    "./src/Pages/**/*.{js,ts,jsx,tsx}",
    "./src/data/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },

  theme: {
    extend: {
    },
  },
  // plugins: [require('@tailwindcss/forms')],
  plugins: [require('tailwindcss-all')],
}



