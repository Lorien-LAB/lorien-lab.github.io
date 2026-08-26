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
- `src/content/problems/`
- `src/content/problem-sources/`
- `src/content/reproductions/`

Schemas are defined in `src/content.config.ts`. Adding a Markdown file automatically creates a static detail page at build time when the corresponding collection has a route.

Research frontmatter: `title`, `description`, `category`, `status`, `date`, `tags`, `featured`, optional `repoUrl`.

Project frontmatter: `title`, `description`, `status`, `date`, `tags`, `featured`, optional `repoUrl`, optional `docsUrl`, optional `metrics`.

Note frontmatter: `title`, `description`, `date`, `tags`, `category`, `draft`.

### Project case studies

Ordinary project detail pages use `ProjectCaseStudyLayout` and are intended to read as technical research case studies rather than short product blurbs. Keep the project-specific research narrative in Markdown; H2 and H3 headings automatically populate the in-page project outline.

`metrics`, `repoUrl`, and `docsUrl` are optional. Add them only when the value or destination is factual and currently valid. A missing repository or document should remain absent rather than being replaced with a generic profile link or placeholder button.

Flagship project pages should make the research problem, design thesis, architecture, validation discipline, limitations or failure modes, and current development priorities explicit. When maturity differs across modules, distinguish implemented or active work from experimental mechanisms and planned directions instead of presenting the entire architecture as production-complete.

Empirical reproduction of an academic paper or broker report belongs in the **Reproduction Workbench** under `/projects/reproductions/`. Do not duplicate a source-grounded reproduction as an ordinary project merely to obtain a different presentation.

### Quant Interview Problem Bank

For all future Quant Interview chats and agents, the repository-memory entry point is **`docs/quant-interview/README.md`**. Treat that documentation and the current machine-readable state as authoritative repository memory rather than relying on prior conversation history.

The Quant Interview system is now **Topic-first**. Green Book, Red Book, and 150 Questions are internal evidence sources processed together by canonical topic workstream; they are not the public hierarchy.

```text
src/content/knowledge/                         canonical concepts and Problem Solving Techniques
src/content/problems/                          canonical Problem records
src/data/quant-interview/topics/               canonical taxonomy, public curriculum catalog + hidden source-topic routing
src/data/quant-interview/coverage/             hidden source coverage / dedup audit
src/data/quant-interview/toc/                  verified source TOCs
src/data/quant-interview/*.json                source-file verification + ingestion manifests
docs/quant-interview/KNOWLEDGE_DIRECTORY.md    generated internal extraction directory
docs/quant-interview/                          durable repository memory and Agent Protocol
```

`src/data/quant-interview/topics/knowledge-catalog.json` is the public-safe canonical curriculum order. The source-neutral public learning directory is published at `/knowledge/quant-interview/directory/`; it cannot import hidden source state. `docs/quant-interview/KNOWLEDGE_DIRECTORY.md` is generated internal extraction state and cannot be used to claim whole-book completeness.

After catalog, taxonomy, public Knowledge/Problems, source routing, coverage, or workstream changes, run:

```bash
npm run knowledge:directory
npm run knowledge:directory:check
```

Canonical public Problem routes remain `/problems/<slug>/`. Problems never become a fifth Knowledge type. Problem-solving methods such as Conditioning, First-Step Analysis, Symmetry, and Recursion remain ordinary Knowledge entries with `type: concept` and `category: Problem Solving Techniques`.

Every source-derived public Problem uses an **independent formulation** and independently derived solution. Do not host source PDFs or scans. Do not copy answer keys or large verbatim book passages. Public Knowledge and Problems should not expose original book, chapter, question-number, or page-number provenance; that evidence lives in hidden repository infrastructure.

#### Edition-safe, Topic-first ingestion

Before a source can contribute to problem-level ingestion, **pin an exact edition**, inspect the actual source file, and record its cryptographic identity in the ingestion manifest. Source-file verification establishes source identity and structure; it does not establish complete problem coverage.

All three current sources are source-file-verified and edition-pinned. Completeness is tracked separately through the hidden coverage ledger. Source page evidence is stored as `evidencePageRanges`; those ranges may overlap between semantically distinct source items because physical evidence is reusable while semantic ownership remains explicit.

The canonical ingestion unit is one bounded topic/subtopic workstream across all mapped verified sources. For each workstream: resolve the source-topic mappings, read all relevant source material, inventory concepts/problems/variants/guidance, perform semantic deduplication, update canonical Knowledge first, update canonical Problems only when genuinely distinct, reconcile every inspected source item in the hidden coverage ledger, then run validation and review the topic-only diff.

Text similarity alone is not sufficient to merge Problems. Compare state, target, constraints, underlying structure, and solution insight. Equivalent questions become one canonical Problem; useful differences become alternate methods, Interview Checks, or Variants / Extensions rather than duplicate public pages.

Hints and full solutions should use native disclosure markup so a reader can attempt the Problem before revealing help:

```html
<details>
<summary>Hint 1</summary>
A progressively stronger hint.
</details>

<details>
<summary>Show Solution</summary>
An independently derived solution.
</details>
```

Before integration, schema validation, relationship validation, ingestion-manifest validation, taxonomy/source-topic/coverage validation, `npm run test`, `npm run check`, and `npm run build` must pass. Missing relationships or pending coverage must be fixed or left explicitly pending rather than hidden.

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

### Public visit counter

The optional footer counter uses GoatCounter while the website remains hosted on GitHub Pages. It records every page load without session deduplication and displays the site-wide `TOTAL` from `2026-08-01`; historical GitHub Pages traffic is not reconstructed.

1. Create a GoatCounter site and enable **Allow adding visitor counts on your website** in its settings.
2. The GitHub Pages workflow defaults to the confirmed public site code `lorien-lab`. Add the repository Actions variable `PUBLIC_GOATCOUNTER_CODE` only if the GoatCounter site code changes later.
3. Deploy `main`. An empty local value disables tracking and omits the counter without affecting the site.

For local verification, copy `.env.example` to `.env` and set the same public code. This value is a public identifier, not a secret.

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
