# Lorien Lab — Quant Research Portfolio

A content-driven personal website for quantitative research / financial engineering, built with Astro and deployable to GitHub Pages.

## Local development

```bash
npm install
npm run dev
npm run check
npm run test
npm run build
```

## Personal information

- Display name: `Lorien Lab`.
- GitHub: `https://github.com/Lorien-LAB`.
- Education and research experience are maintained in the CV page.

The published PDF CV lives at `public/cv/Lorien-Lab-CV.pdf`.

## Content authoring

Content lives in Markdown:

- `src/content/research/`
- `src/content/projects/`
- `src/content/notes/`

Schemas are defined in `src/content.config.ts`. Adding a Markdown file automatically creates a static detail page at build time.

Research frontmatter: `title`, `description`, `category`, `status`, `date`, `tags`, `featured`, optional `repoUrl`.

Project frontmatter: `title`, `description`, `status`, `date`, `tags`, `featured`, optional `repoUrl`, optional `docsUrl`, optional `metrics`.

Note frontmatter: `title`, `description`, `date`, `tags`, `category`, `draft`.

## GitHub Pages

This repository deploys through GitHub Actions. The workflow in `.github/workflows/deploy.yml` builds the site and publishes `dist/` whenever `main` is updated.

For a user site (`username.github.io`):

- `SITE_URL=https://username.github.io`
- `BASE_PATH=/`

For a project site:

- `SITE_URL=https://username.github.io`
- `BASE_PATH=/project-name`

## Custom domain later

After the GitHub Pages version works, add the custom domain in repository Pages settings and update `SITE_URL` to the custom origin. Keep `BASE_PATH=/` when the custom domain serves this site at its root.

## Design principles

- Static HTML first, minimal browser JavaScript.
- Markdown-first research publishing.
- No fabricated investment-performance metrics.
- Light/dark theme with persistent user preference.
- Responsive and keyboard-accessible navigation.
- Easy for both researchers and coding agents to extend.
