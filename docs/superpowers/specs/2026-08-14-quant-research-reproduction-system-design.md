# Quant Research Reproduction System Design

## Goal

Build a first-class Quant Research Reproduction System for Lorien Lab that supports both academic quantitative-finance papers and broker quantitative / financial-engineering reports.

The system has two coordinated repositories with distinct responsibilities:

1. `Lorien-LAB/lorien-lab.github.io` — public presentation, indexing, research records, knowledge links, and static report HTML pages.
2. `Lorien-LAB/quant-research-reproductions` — executable reproduction code, shared research infrastructure, templates, scoring standards, and agent-facing conventions.

The website must present reproduction work as auditable research rather than as a reading list or summary archive.

## Product Positioning

The reproduction system sits inside the existing Knowledge Base and is organized as a research workbench.

It must answer, for every reproduction:

- What did the original paper or broker report claim?
- What data and methodology were required?
- How faithfully was the original method implemented?
- Which original results were reproduced, partially reproduced, not reproduced, or impossible to verify?
- Why do the reproduced results differ from the original results?
- How robust are the findings under alternative specifications?
- What extensions or new research were developed after reproduction?
- Can another researcher or agent rerun the work from code, configuration, and documented environment assumptions?

The system must not fabricate reproduction records, metrics, scores, or performance results merely to populate the interface.

## Scope

### Included source types

The system supports exactly two first-class source types in v1:

- `academic` — journal papers, working papers, SSRN papers, arXiv papers, and conference papers relevant to quantitative finance.
- `broker` — quantitative, financial-engineering, systematic-investing, factor, portfolio, derivatives, machine-learning, CTA, market-microstructure, and related broker research reports.

General macro, discretionary industry, and non-quantitative broker research is out of scope for v1.

### Research areas

The shared research-area taxonomy should initially support:

- Factor Research
- Asset Pricing
- Stock Selection
- Index Enhancement
- CTA / Systematic Trading
- Asset Allocation
- Machine Learning
- Market Microstructure
- Derivatives
- Portfolio Construction
- Risk Management

The schema should permit additional research-area strings later without requiring a page rewrite.

## High-Level Information Architecture

The reproduction system remains under the Knowledge Base rather than becoming a new top-level navigation destination.

```text
Knowledge Base
├── Concepts
├── Papers
├── Tools
├── Research Topics
└── Reproductions
    ├── Overview
    ├── Academic Papers
    └── Broker Reports
```

Canonical website routes:

```text
/knowledge/reproductions/
/knowledge/reproductions/<slug>/
/reports/<slug>/
```

Responsibilities:

- `/knowledge/reproductions/` — reproduction workbench and searchable index.
- `/knowledge/reproductions/<slug>/` — structured research record for one reproduction.
- `/reports/<slug>/` — HTML representation of the original paper/report, generated later by another agent or workflow.

The reproduction system must not require the original report HTML to exist before a reproduction record can be created. Missing report HTML is represented as unavailable, not as a broken link.

## Repository Architecture

### Website repository

Repository:

`Lorien-LAB/lorien-lab.github.io`

Responsibilities:

- render the reproduction workbench;
- render reproduction detail pages;
- store structured reproduction metadata and explanatory Markdown;
- link reproductions to Knowledge, Notes, and Projects;
- link to original report HTML when available;
- link to public reproduction code when allowed;
- never store original report PDFs;
- never store large research datasets, model weights, or bulk result archives.

### Reproduction-code repository

Repository:

`Lorien-LAB/quant-research-reproductions`

Recommended visibility: Public.

Primary structure:

```text
quant-research-reproductions/
├── academic/
│   └── <slug>/
├── broker/
│   └── <slug>/
├── shared/
│   ├── data/
│   ├── factors/
│   ├── preprocessing/
│   ├── portfolio/
│   ├── backtest/
│   ├── evaluation/
│   ├── visualization/
│   └── utils/
├── templates/
│   ├── academic/
│   └── broker/
├── docs/
│   ├── reproduction-standard.md
│   ├── scoring-standard.md
│   └── agent-interface.md
├── pyproject.toml
├── README.md
└── LICENSE
```

The code repository should be initialized in the same implementation cycle as the website feature.

## Single Reproduction Directory Standard

Each public reproduction receives one canonical slug used across both repositories.

Example:

```text
academic/
└── betting-against-beta/
    ├── README.md
    ├── reproduction.yaml
    ├── requirements.txt
    ├── config/
    │   └── baseline.yaml
    ├── src/
    │   ├── data.py
    │   ├── factors.py
    │   ├── portfolio.py
    │   ├── backtest.py
    │   └── evaluation.py
    ├── notebooks/
    │   └── analysis.ipynb
    ├── tests/
    ├── results/
    │   ├── metrics.json
    │   └── tables/
    └── figures/
```

The directory standard is a template, not a requirement that every reproduction contains every optional file. The reproducibility-critical files are `README.md`, `reproduction.yaml`, at least one executable implementation path, and enough configuration to explain how the published result was produced.

## Code Visibility Model

Every reproduction record has one of three code-visibility states:

- `public`
- `partial`
- `private`

### Public

The website links directly to the matching directory in `quant-research-reproductions`.

### Partial

The public repository contains a README and selected implementation artifacts, but intentionally omits sensitive implementation details. The website displays `Partial Code Release` and links only to what is actually public.

### Private

The website may still present the research methodology, reproduced results, score, robustness analysis, and extensions, but must display `Implementation Private` and must not render a fabricated or inaccessible code URL.

The system does not attempt folder-level private permissions inside the public GitHub repository.

## Original Source Handling

### No PDF hosting

The website does not host original academic-paper or broker-report PDFs.

Original source access is represented through metadata and source links.

### HTML report representation

A future agent may convert an original paper/report into a static HTML representation hosted under:

```text
/reports/<slug>/
```

The reproduction schema therefore includes a `reportHtmlPath` field.

The website renders an `Original HTML` action only when a real path is supplied.

The original HTML representation is distinct from the reproduction record and must be labeled accordingly.

## Website Content Model

Create a new Astro content collection named `reproductions`. It must remain separate from the existing `knowledge` collection because reproduction records require significantly richer workflow, source, scoring, and result metadata.

Suggested storage:

```text
src/content/reproductions/
├── academic/
└── broker/
```

Every entry maps to one canonical page at:

```text
/knowledge/reproductions/<slug>/
```

### Shared required fields

```yaml
slug: string
sourceType: academic | broker
title: string
description: string
researchArea: string
stage: reading | data | implementation | validation | reproduction | extension
result: successful | partial | failed | inconclusive | extended
codeVisibility: public | partial | private
date: date
updated: date optional
tags: string[]
featured: boolean
assetClass: string optional
market: string optional
frequency: string optional
dataAvailability: string optional
reportHtmlPath: string optional
sourceUrl: URL optional
codeUrl: URL optional
relatedKnowledge: string[]
relatedNotes: string[]
relatedProjects: string[]
```

### Academic-specific fields

```yaml
authors: string[]
year: integer
venue: string optional
journal: string optional
conference: string optional
doi: string optional
ssrn: string optional
arxiv: string optional
paperUrl: URL optional
```

### Broker-specific fields

```yaml
broker: string
analysts: string[]
publishDate: date
series: string optional
reportNumber: string optional
```

Academic-only fields are optional for broker entries and broker-only fields are optional for academic entries, but schema validation should enforce the relevant required fields based on `sourceType` when practical without making the authoring experience brittle.

## Workflow Model

All reproductions use the same six-stage research pipeline:

```text
01 Reading
02 Data
03 Implementation
04 Validation
05 Reproduction
06 Extension
```

Stage meaning:

- `reading` — source claims, methodology, and required data are being extracted and normalized.
- `data` — required datasets, universes, cleaning rules, and transformations are being assembled.
- `implementation` — core formulas, models, portfolios, and backtests are being implemented.
- `validation` — implementation is being checked for leakage, specification fidelity, accounting consistency, and engineering errors.
- `reproduction` — original claims and reported metrics are compared with the reproduced results.
- `extension` — the original study has been reproduced sufficiently to support new tests, robustness work, or research extensions.

The detail page must visualize all six stages and clearly identify the current stage.

## Result Model

`stage` and `result` are distinct.

Supported result states:

- `successful`
- `partial`
- `failed`
- `inconclusive`
- `extended`

Meanings:

- `successful` — central empirical claims or target outputs were reproduced closely enough to support the original conclusion.
- `partial` — meaningful parts reproduced, but one or more important target results did not match.
- `failed` — implementation was completed, but the target empirical result did not reproduce.
- `inconclusive` — missing data, insufficient source detail, unavailable implementation assumptions, or other constraints prevent a defensible conclusion.
- `extended` — reproduction succeeded sufficiently and the project has progressed into new research beyond the source specification.

A result status must be accompanied by explanatory text in the Markdown body or structured summary area. The system must never infer success purely from the numerical score.

## Reproduction Score

The score is a structured audit aid, not an absolute scientific truth.

Every completed or substantially progressed reproduction may contain six dimensions scored from 0 to 5:

1. `dataMatch`
2. `methodMatch`
3. `signalMatch`
4. `performanceMatch`
5. `robustness`
6. `reproducibility`

Interpretation:

- **Data Match** — similarity between available data/universe and the source study.
- **Method Match** — fidelity of formulas, algorithms, model settings, portfolio construction, and backtest mechanics.
- **Signal Match** — agreement of factor direction, IC/RankIC, ranking relationship, model signal, or equivalent intermediate empirical output.
- **Performance Match** — agreement of reported return, Sharpe, drawdown, hit rate, or other performance metrics.
- **Robustness** — stability across subperiods, transaction costs, parameter choices, universes, neutralization rules, and other meaningful perturbations.
- **Reproducibility** — quality of runnable code, configuration, environment assumptions, random seeds, outputs, and rerun instructions.

Schema shape:

```yaml
score:
  dataMatch: 0..5
  methodMatch: 0..5
  signalMatch: 0..5
  performanceMatch: 0..5
  robustness: 0..5
  reproducibility: 0..5
```

The overall score is derived at build time as the arithmetic mean of available dimensions unless a future documented scoring standard explicitly changes the weighting.

Do not hard-code the overall score separately unless the schema later needs a locked historical snapshot.

If a dimension cannot be meaningfully scored, it may be omitted rather than assigned an arbitrary number.

## Original vs Reproduced Metrics

The system should support structured metric comparisons without hard-coding a specific list of financial metrics.

Recommended schema:

```yaml
metrics:
  - name: Rank IC
    original: "0.054"
    reproduced: "0.049"
    difference: "-9.3%"
  - name: Sharpe
    original: "1.82"
    reproduced: "1.61"
    difference: "-11.5%"
```

Values remain strings in v1 because research outputs may include percentages, intervals, categorical values, units, or non-standard statistics.

No metric row is rendered unless it exists in the source entry.

## Reproduction Detail Page

The detail page is the core research artifact.

Recommended order:

1. Title and source metadata
2. Reproduction status
3. Six-stage pipeline
4. Executive Summary
5. Original Claim
6. Research Setup
7. Methodology
8. Original Results
9. Our Reproduction
10. Original vs Reproduction table
11. Reproduction Score
12. Why Results Differ
13. Robustness Tests
14. Extensions
15. Artifacts
16. Related Knowledge / Notes / Projects

Markdown remains flexible. The website should not require every heading to be present, but the authoring templates must encourage this structure.

### Research Setup

The design should support exposition of:

- universe
- sample period
- frequency
- data source
- benchmark
- transaction costs
- rebalancing rule
- neutralization
- portfolio construction
- execution assumptions

These may live primarily in Markdown in v1; only fields needed for filtering and summary UI belong in frontmatter.

## Reproduction Workbench Landing Page

Canonical route:

`/knowledge/reproductions/`

### Hero

Suggested positioning:

`Quant Research Reproductions`

`Reproducing quantitative research, not merely summarizing it.`

Do not show fabricated counts. Any counts must be derived from real reproduction entries.

### Primary subsections

The landing page must visibly separate:

- Academic Papers
- Broker Reports

Both remain part of one searchable corpus.

### Filters

V1 filters:

- text search
- source type
- research area
- stage
- result
- code visibility

All entries must still be rendered in the static HTML before filtering so the page remains useful without JavaScript.

Client-side JavaScript may progressively enhance filtering.

### Empty-state behavior

If there are no real reproduction records, the page must show a clear initialization state such as:

`Reproduction library initialized. Research records will appear as reproductions are completed.`

Do not create fake sample research results to avoid an empty page.

## Relationship to Existing Knowledge Base

The main Knowledge Base landing page should gain a visible entry into Reproductions.

The existing `knowledge` collection remains unchanged in meaning:

- Concept
- Paper
- Tool
- Research Topic

`reproductions` is separate because a reproduction is an active empirical research record, not merely a knowledge object.

Reproduction pages may link to Knowledge entries through `relatedKnowledge` slugs.

Example:

```text
Reproduction
└── relatedKnowledge
    ├── Momentum
    ├── Rank IC
    └── Cross-sectional Regression
```

## Relationship to Notes and Projects

Reproduction entries may link to existing Notes and Projects.

Use cases:

- a reproduction generates a longer methodology note;
- a reproduction motivates a new factor-research project;
- an extension becomes part of the automated factor-discovery system;
- a reproduction relies on a reusable backtest framework documented elsewhere.

Broken relationship slugs must fail safely by omitting the unavailable link rather than generating broken routes.

## Artifacts Section

A reproduction page may expose the following actions when real destinations exist:

- `Original HTML`
- `Source`
- `View Code`
- `Notebook`
- `Configuration`
- `Results`

Rules:

- Original HTML appears only when `reportHtmlPath` exists.
- Source appears only when a real source URL exists.
- View Code appears only for `public` or `partial` code visibility and only when a real `codeUrl` exists.
- Private reproductions display `Implementation Private` as non-interactive status text.
- The website must never render dead placeholder links.

## Agent-Oriented Authoring Model

The system is explicitly designed for agent-assisted creation and maintenance.

Target workflow:

```text
Paper / Broker Report
        ↓
Metadata Agent
        ↓
Reading Agent
        ↓
Reproduction Agent
        ↓
Validation Agent
        ↓
Evaluation Agent
        ↓
reproduction.yaml / metrics.json / figures / Markdown
        ↓
Website build
```

Agents must write to documented interfaces rather than inventing page structure independently.

## `reproduction.yaml` Standard

The code repository template should include a machine-readable project manifest.

Minimum intended contents:

```yaml
slug:
source_type:
title:
status:
result:
code_visibility:
entrypoint:
config:
results:
figures:
```

The exact schema must be documented in `docs/agent-interface.md` during implementation.

The website does not need to read this repository at runtime in v1. Website Markdown/frontmatter remains the static publishing source of truth.

## Shared Research Infrastructure

The `shared/` package exists to prevent duplicated implementation across reproductions.

Initial module boundaries:

- `data/` — reusable dataset interfaces, calendar handling, alignment, survivorship-safe helpers, and transformations.
- `factors/` — factor utilities and signal transformations.
- `preprocessing/` — winsorization, standardization, ranking, neutralization, missing-data handling.
- `portfolio/` — grouping, weighting, turnover, constraints, portfolio formation.
- `backtest/` — reusable backtesting primitives.
- `evaluation/` — IC, RankIC, returns, risk, drawdown, turnover, transaction-cost, and comparison helpers.
- `visualization/` — standardized research plots and tables.
- `utils/` — common low-level utilities that do not fit another domain.

V1 initialization should create clean module boundaries and documentation, but should not invent a large framework before real reproductions require it.

## Templates

Create two reproduction templates:

```text
templates/academic/
templates/broker/
```

Both templates share the six-stage reproduction workflow but have different metadata requirements.

Each template should include:

- `README.md`
- `reproduction.yaml`
- baseline config
- minimal `src/`
- test directory
- result/figure directories
- authoring instructions

Templates must not contain fabricated empirical results.

## Documentation in Code Repository

### `README.md`

Explain:

- purpose of the repository;
- academic vs broker structure;
- how a slug maps to the website;
- how to create a new reproduction;
- code-visibility policy;
- what belongs in `shared/`;
- how agents should interact with the repository.

### `docs/reproduction-standard.md`

Document the required research workflow, evidence expectations, result statuses, and reproducibility expectations.

### `docs/scoring-standard.md`

Document all six score dimensions, 0–5 interpretation bands, missing-score handling, and overall-score derivation.

### `docs/agent-interface.md`

Document canonical paths, required manifests, expected outputs, naming conventions, and safe agent write behavior.

## Website Navigation and Discovery

Do not add Reproductions as another top-level site-header item in v1.

Instead:

- add a prominent Reproductions entry on `/knowledge/`;
- optionally include a reproduction count derived from real content;
- keep the global header compact.

The Knowledge Base remains the parent navigation concept.

## SEO

Landing title:

`Quant Research Reproductions · Lorien Lab`

Detail title:

`<Reproduction Title> · Lorien Lab`

Description uses the entry frontmatter description.

Original report HTML under `/reports/<slug>/` is a separate document and should not reuse the reproduction page canonical URL.

## Accessibility

- filters use native labeled controls;
- pipeline stage status does not rely on color alone;
- score dimensions include visible text and numeric values;
- result status is readable as text;
- private-code status is not presented as a disabled link;
- tables remain horizontally scrollable on narrow devices;
- all interactive links have visible focus states;
- the page remains understandable with JavaScript disabled.

## Responsive Design

The landing page and detail pages must work at desktop, tablet, and narrow mobile widths.

On mobile:

- filters stack vertically;
- workflow stages become a compact vertical or horizontally scrollable sequence;
- metric-comparison tables remain readable without clipping;
- score bars preserve text values;
- artifact actions wrap naturally;
- source metadata collapses into a readable stacked layout.

## Error Handling and Validation

- invalid source type fails the Astro build;
- invalid stage fails the Astro build;
- invalid result fails the Astro build;
- invalid code visibility fails the Astro build;
- score values outside 0–5 fail the Astro build;
- invalid URLs fail the Astro build where URL fields are used;
- missing optional report HTML path renders no Original HTML link;
- missing code URL renders no View Code link;
- private code renders only non-interactive private status;
- unresolved related Knowledge / Notes / Projects links are omitted safely;
- empty reproduction corpus renders the initialization state;
- fabricated hard-coded corpus counts are prohibited.

## Testing

Extend the website smoke-test layer to verify at least:

- a `reproductions` collection exists;
- `academic` and `broker` source types are supported;
- all six stages are represented in the schema;
- all five result states are represented;
- `public`, `partial`, and `private` code-visibility states are represented;
- six score dimensions are supported and constrained to 0–5;
- `/knowledge/reproductions/` exists;
- a dynamic reproduction detail route exists;
- `/knowledge/` links to reproductions;
- empty-state copy exists without fake records;
- private code status does not produce a code link;
- no static fake reproduction metrics or corpus counts are hard-coded.

Production verification remains the existing GitHub Pages build workflow.

The new `quant-research-reproductions` repository should also initialize a lightweight test setup that verifies template manifests and shared-package importability without requiring large datasets.

## Performance and Storage Constraints

The website remains static-first.

Do not add:

- database infrastructure;
- server-side search;
- original report PDFs;
- large raw datasets;
- trained model weights;
- large binary result archives;
- runtime GitHub API calls from the public website.

Search and filtering should operate on already-rendered metadata in the browser.

The code repository may contain small example fixtures needed for tests, but not large production datasets.

## Security and Privacy

Public website content must not expose:

- private API keys;
- proprietary dataset credentials;
- private brokerage credentials;
- licensed data extracts that cannot be redistributed;
- source code explicitly marked private;
- paths to private infrastructure that should remain undisclosed.

Agent templates and documentation must explicitly warn against committing secrets or licensed raw datasets.

## V1 Implementation Boundary

The first implementation cycle includes:

### Website

- new `reproductions` Astro collection;
- `/knowledge/reproductions/` workbench;
- Academic Papers / Broker Reports subsections;
- unified search and filters;
- dynamic reproduction detail pages;
- six-stage workflow component;
- six-dimensional score presentation;
- original-vs-reproduced metric comparison support;
- Public / Partial / Private code-visibility behavior;
- related Knowledge / Notes / Projects support;
- `/reports/<slug>/` link interface;
- Knowledge Base integration;
- empty state with no fabricated reproduction records;
- tests and production build verification.

### Code repository

- create public repository `Lorien-LAB/quant-research-reproductions`;
- initialize `academic/`, `broker/`, `shared/`, `templates/`, and `docs/` structure;
- initialize academic and broker templates;
- initialize `pyproject.toml`, `README.md`, and `LICENSE`;
- document reproduction standard;
- document scoring standard;
- document agent interface;
- initialize lightweight tests for templates and shared package structure.

## Explicitly Deferred

V1 does not include:

- automatic ingestion of arbitrary PDFs;
- automated browser scraping of broker portals;
- automatic report-to-HTML generation;
- runtime synchronization between the website and code repository;
- automatic execution of reproductions on website deployment;
- hosted research datasets;
- a database-backed research queue;
- authentication or private dashboards;
- automatic scientific-veracity judgment;
- graph visualization of all reproduction relationships.

These may be added in later specs when real workflow needs justify them.

## Success Criteria

The feature is complete when:

- Knowledge Base exposes a clear Reproductions destination;
- the reproduction workbench distinguishes Academic Papers and Broker Reports while sharing one searchable corpus;
- reproduction records support the six-stage workflow, five result states, three code-visibility states, six score dimensions, and flexible original-vs-reproduced metrics;
- single reproduction pages provide a professional research-record structure without requiring fake sample data;
- original report HTML and executable reproduction code are clearly separated from the website research record;
- the website handles absent report/code links without broken controls;
- `quant-research-reproductions` exists and contains documented academic, broker, shared, template, scoring, reproduction-standard, and agent-interface structures;
- no original PDFs or large datasets are added to the website repository;
- website tests and Astro production build pass;
- GitHub Pages deployment succeeds;
- existing Knowledge, Research, Projects, Notes, CV, About, theme, and current site behavior remain intact.
