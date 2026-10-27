/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'craft-white': '#F7F5F0',
        'craft-dark': '#2C2C2C',
        'accent-orange': '#FB5C20',
        'accent-blue': '#023BA4',
        'accent-yellow': '#FAB405',
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'fredoka': ['Fredoka', 'sans-serif'],
      }
    },
  },
  plugins: [],
}