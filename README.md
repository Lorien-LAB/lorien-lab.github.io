# Xiang Luo — Quant Research Portfolio

A content-driven personal website for quantitative research / financial engineering, built with Astro and deployable to GitHub Pages.

## Local development

```bash
npm install
npm run dev
npm run check
npm run test
npm run build
```

## Editing personal information

Before publishing, search for these intentionally editable values:

- `Xiang Luo` — display name.
- `https://github.com/Lorien-LAB` — GitHub profile URL.
- `Your university · Degree and dates` — verified education details.

Place the real PDF CV at `public/cv/Xiang-Luo-CV.pdf`.

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

Create a GitHub repository, push this source, then in **Settings → Pages** select **GitHub Actions** as the source.

Set repository Actions variables under **Settings → Secrets and variables → Actions → Variables**:

### User site (`username.github.io`)

- `SITE_URL=https://username.github.io`
- `BASE_PATH=/`

### Project site (for example `personal-site`)

- `SITE_URL=https://username.github.io`
- `BASE_PATH=/personal-site`

The workflow in `.github/workflows/deploy.yml` builds the site and publishes `dist/` whenever `main` is updated.

## Custom domain later

After the GitHub Pages version works, add the custom domain in repository Pages settings and update `SITE_URL` to the custom origin. Keep `BASE_PATH=/` when the custom domain serves this site at its root.

## Design principles

- Static HTML first, minimal browser JavaScript.
- Markdown-first research publishing.
- No fabricated investment-performance metrics.
- Light/dark theme with persistent user preference.
- Responsive and keyboard-accessible navigation.
- Easy for both researchers and coding agents to extend.
