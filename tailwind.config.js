/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        frostWhite: '#f0f2f7',
        mist: '#dae0ec',
        velvet: '#991930',
        charcoal: '#292d31',
      },
    },
  },
  plugins: [],
}
