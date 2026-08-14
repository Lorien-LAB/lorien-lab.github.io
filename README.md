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

The published PDF CV currently lives at `public/cv/Xiang-Luo-CV.pdf`; the public site presents the display name `Lorien Lab` while preserving this stable asset path.

## Content authoring

Content lives in Markdown:

- `src/content/research/`
- `src/content/projects/`
- `src/content/notes/`
- `src/content/knowledge/`

Schemas are defined in `src/content.config.ts`. Adding a Markdown file automatically creates a static detail page at build time.

Research frontmatter: `title`, `description`, `category`, `status`, `date`, `tags`, `featured`, optional `repoUrl`.

Project frontmatter: `title`, `description`, `status`, `date`, `tags`, `featured`, optional `repoUrl`, optional `docsUrl`, optional `metrics`.

Note frontmatter: `title`, `description`, `date`, `tags`, `category`, `draft`.

### Knowledge Base

The Knowledge Base is separate from Notes. Knowledge entries are structured, reusable research objects; Notes remain long-form essays, methodology, experiments, and research narratives.

Knowledge content is organized by public entry type:

```text
src/content/knowledge/
├── concepts/
├── papers/
├── tools/
└── topics/
```

Shared Knowledge frontmatter:

- `title`
- `description`
- `type`: `concept | paper | tool | topic`
- `domain`
- `category`
- `status`: `seed | growing | mature`
- `date`
- optional `updated`
- `tags`
- `featured`
- optional `related` knowledge slugs
- optional `relatedNotes` note slugs
- optional `sourceUrl`

Paper entries may also use `authors`, `year`, and `paperUrl`. Tool entries may use `language` and `toolUrl`.

Knowledge detail routes are published at `/knowledge/<slug>/` even though source files are grouped into type folders. Missing relationship slugs are omitted rather than rendered as broken links.

The external Obsidian knowledge graph is intentionally shown as `Coming Soon`; there is no public Obsidian Publish URL configured yet.

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
- No fabricated investment-performance metrics or knowledge corpus statistics.
- Light/dark theme with persistent user preference.
- Responsive and keyboard-accessible navigation.
- Easy for both researchers and coding agents to extend.
