// @ts-check
import { defineConfig } from 'astro/config';

// Pure static site — no adapter, no server, no database.
// All content is generated at build time from JSON files in src/data/,
// and the performance archive is searched client-side from /data/performances.json.
// Output (dist/) is a flat file set deployable to any static host.
// https://astro.build/config
export default defineConfig({
  site: 'https://kathakalinews.com',
  build: { format: 'directory' },
});
