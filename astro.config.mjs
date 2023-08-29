import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://gnoxnahte.com/',
  integrations: [mdx()],
  output: "server",
  adapter: vercel()
});