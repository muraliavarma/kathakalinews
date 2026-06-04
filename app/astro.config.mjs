// @ts-check
import { defineConfig } from 'astro/config';

// Pure static site — no adapter, no server, no database.
// `site` and `base` are env-driven so the same build works at a domain root
// (Cloudflare / custom domain, the defaults) or under a GitHub Pages project
// path (the deploy workflow sets BASE_PATH=/kathakalinews, SITE_URL=…github.io).
// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://kathakalinews.com',
  base: process.env.BASE_PATH ?? '/',
  build: { format: 'directory' },
});
