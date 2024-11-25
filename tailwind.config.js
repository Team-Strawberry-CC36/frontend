/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        roseQuartz: '#f7d8d9',
        tiffanyBlue: '#a1dbe5',
        peach: '#ffd8c0',
        blueGreen: '#00b7af',
        frostWhite: '#f0f2f7',
        mist: '#dae0ec',
        velvet: '#991930',
        charcoal: '#292d31',
      },
    },
  },
  plugins: [],
}
