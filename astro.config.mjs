// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rival-porto.vercel.app/',
  vite: {
    plugins: [tailwindcss(), mdx()]
  },

  integrations: [mdx(), sitemap()]
});