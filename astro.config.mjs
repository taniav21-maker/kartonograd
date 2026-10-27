import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';


// ЗАМЕНИ 'kartonograd' на реальное имя твоего репозитория на GitHub!
// Если репозиторий называется taniav21-maker.github.io, оставь просто '/'
const base = '/kartonograd/'; 


export default defineConfig({
  base: base,
  integrations: [tailwind()],
});