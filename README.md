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

For all future Quant Interview chats and agents, the repository-memory entry point is **`docs/quant-interview/README.md`**. Treat that documentation plus the current machine-readable manifests/TOCs as authoritative rather than relying on prior conversation history.

The Quant Interview system separates reusable Knowledge from practice objects and source provenance:

```text
src/content/knowledge/          reusable concepts and Problem Solving Techniques
src/content/problems/           first-class Problem records
src/content/problem-sources/    Green Book, Red Book, and future source containers
src/data/quant-interview/       edition-safe ingestion manifests and TOC seeds
docs/quant-interview/           repository memory and agent handoff protocol
```

Canonical public Problem routes are `/problems/<slug>/`. Books are **sources**, not Knowledge types. Problems never become a fifth `knowledge.type` value.

Problem-solving methods such as Conditioning, First-Step Analysis, and Recursion are ordinary Knowledge entries with `type: concept` and `category: Problem Solving Techniques`. The Problem fields `concepts`, `techniques`, and `prerequisites` reference Knowledge slugs; `relatedProblems` references canonical Problem slugs.

Every source-derived Problem must preserve provenance, but its public statement should use an **independent formulation** and its solution should be independently derived. Do not host source PDFs or scans. Do not copy answer keys or large verbatim book passages. Do not invent authors, publication years, ISBNs, official URLs, chapter labels, or source-problem identifiers when they have not been verified.

A source record may legitimately contain zero indexed Problems while the architecture is being populated. All displayed Problem, Concept, Technique, and Source counts must be derived from actual content rather than hard-coded targets.

#### Edition-safe ingestion

Before page- or problem-number-based ingestion, **pin an exact edition**. Work-level identity is not sufficient because different editions can change pagination, ordering, and question counts.

Bibliographic edition pinning and source-file readiness are separate states. An edition may be pinned from reliable edition-distinguishing evidence while the manifest remains `awaiting-source-file` with `sourceFile: null` and `batches: []`. No ingestion batch may be created until the actual source file is available, inspected, and recorded in the manifest.

Green Book and Red Book currently remain `work-identified`; their user-supplied TOCs are structural seeds only. The 2013 first edition of *150 Most Frequently Asked Questions on Quant Interviews* is bibliographically pinned, but still awaits the actual source file before batch ingestion.

The validator in `src/lib/quantInterviewIngestion.mjs` rejects batches when the edition is not pinned, when the source file is not verified, when batch IDs duplicate, or when page ranges are invalid/overlapping. This gate must pass before source-derived Problem Markdown is created.

A source file is used only as private ingestion evidence. Do not commit the copyrighted PDF or scans into the public website repository. Public output remains independently formulated Problem statements, original derivations, metadata, and provenance references.

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

Example original Problem frontmatter:

```yaml
---
problemId: lorien-example-001
title: Example Original Problem
description: A short original problem used to demonstrate the authoring contract.
date: 2026-08-16
originType: original
domain: Mathematics & Statistics
category: Probability
subcategories: []
tags: [Interview]
concepts: []
techniques: [conditioning]
prerequisites: []
relatedProblems: []
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
status: solved
featured: false
---
```

Before merge, schema validation, relationship validation, ingestion-manifest validation, `npm run test`, `npm run check`, and `npm run build` must pass. Missing relationships should be fixed rather than rendered as dead links.

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

The optional footer counter uses GoatCounter while the website remains hosted on GitHub Pages. It records page views after the integration date and displays the site-wide `TOTAL`; historical GitHub Pages traffic is not reconstructed.

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
