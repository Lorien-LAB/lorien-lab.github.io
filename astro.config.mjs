import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL || 'https://lorien-lab.github.io';
const rawBase = process.env.BASE_PATH || '/';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/research': '/research-projects',
    '/projects': '/research-projects',
    '/knowledge/reproductions': '/projects/reproductions',
    '/knowledge/reproductions/[...id]': '/projects/reproductions/[...id]',
    '/knowledge/quant-interview/sources': '/knowledge/quant-interview',
    '/knowledge/quant-interview/sources/green-book': '/knowledge/quant-interview',
    '/knowledge/quant-interview/sources/red-book': '/knowledge/quant-interview',
    '/knowledge/quant-interview/sources/150-most-frequently-asked': '/knowledge/quant-interview',
  },
});
