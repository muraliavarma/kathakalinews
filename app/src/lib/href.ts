// Prefix internal paths with the configured base path so the site works both at
// a domain root (Cloudflare / custom domain) and under a GitHub Pages project
// path (e.g. '/kathakalinews/'). `import.meta.env.BASE_URL` always ends in '/'.
const BASE = import.meta.env.BASE_URL;

export function link(path: string): string {
  if (!path || path === '/') return BASE;
  const clean = path.startsWith('/') ? path : '/' + path;
  return BASE.replace(/\/$/, '') + clean;
}
