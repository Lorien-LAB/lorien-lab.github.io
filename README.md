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
- `src/content/reproductions/`

Schemas are defined in `src/content.config.ts`. Adding a Markdown file automatically creates a static detail page at build time when the corresponding collection has a route.

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

### Quant Research Reproductions

The Reproduction Workbench is an empirical-research subsystem under **Projects**. It supports both quantitative-finance academic papers and quantitative / financial-engineering broker reports while keeping reproduction records separate from ordinary project cards and reusable Knowledge objects.

Website source layout:

```text
src/content/reproductions/
├── academic/
└── broker/
```

Canonical routes and cross-repository slug contract:

```text
Website record: /projects/reproductions/<slug>/
Original HTML:  /reports/<slug>/
Academic code:  https://github.com/Lorien-LAB/quant-research-reproductions/tree/main/academic/<slug>/
Broker code:    https://github.com/Lorien-LAB/quant-research-reproductions/tree/main/broker/<slug>/
```

The legacy `/knowledge/reproductions/*` URL family is retained only as a backward-compatible static redirect to the Projects namespace.

The same canonical `slug` must identify one reproduction across the website, generated original-source HTML, and executable-code repository.

Every reproduction has exactly one source type:

- `academic`
- `broker`

The six-stage workflow is:

```text
reading → data → implementation → validation → reproduction → extension
```

Result states are independent from workflow stage:

```text
successful | partial | failed | inconclusive | extended
```

Code visibility is explicit:

```text
public | partial | private
```

- `public`: a real public `codeUrl` may be rendered.
- `partial`: a real public partial-release `codeUrl` may be rendered.
- `private`: the website renders `Implementation Private` and no code link.

The optional six-dimensional score uses values from 0 to 5:

- `dataMatch`
- `methodMatch`
- `signalMatch`
- `performanceMatch`
- `robustness`
- `reproducibility`

The website derives the overall score as the arithmetic mean of the dimensions that are actually present. Missing dimensions remain missing; they are never filled with invented values.

`metrics` supports structured Original vs Reproduced comparisons using strings for `original`, `reproduced`, and optional `difference`, so percentages, intervals, units, and non-standard statistics can be represented without forcing a numeric format.

Academic records additionally require `authors` and `year`; broker records require `broker`, `analysts`, and `publishDate`. The full schema lives in `src/content.config.ts`.

Original PDFs are not hosted in this repository. Another agent or workflow may later generate an HTML representation under `/reports/<slug>/`; `reportHtmlPath` is optional and an `Original HTML` action is rendered only when the path is real. The same rule applies to source, code, notebook, configuration, and results links: no destination, no button.

Relationship arrays `relatedKnowledge`, `relatedNotes`, and `relatedProjects` use slugs. Unresolved slugs are omitted instead of generating broken routes.

Do not create fake reproduction records, Sharpe ratios, IC values, scores, or claimed replication results for UI population. An empty collection is a valid state and is rendered intentionally by the workbench.

Executable reproduction code, reusable research infrastructure, templates, and agent contracts belong in the companion repository:

`Lorien-LAB/quant-research-reproductions`

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
- No fabricated investment-performance metrics, knowledge corpus statistics, or reproduction outcomes.
- Light/dark theme with persistent user preference.
- Responsive and keyboard-accessible navigation.
- Easy for both researchers and coding agents to extend.
