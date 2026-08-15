# Project Case Study Upgrade — Design

Date: 2026-08-16

## Goal

Raise the three ordinary project pages to the same research-portfolio standard as the reproduction subsystem without destabilizing the existing Astro content architecture or inventing unavailable evidence.

The upgrade should make the site answer four questions quickly for a technical visitor:

1. What research problem does this project solve?
2. How is the system or strategy structured?
3. Which parts are implemented, experimental, or still planned?
4. What evidence, limitations, and next steps make the work credible?

## Current State

The site is already content-driven and deliberately minimal: Markdown collections, static Astro routes, no fabricated performance metrics, and a dedicated reproduction workbench. The three project records are currently short summaries rendered through the generic `ArticleLayout`, while reproduction detail pages use a much richer case-study presentation.

The gap is therefore not a missing site architecture. It is a presentation and research-narrative gap between flagship reproduction work and ordinary projects.

## Chosen Approach

Keep the existing content collections and URL structure intact, but add a dedicated `ProjectCaseStudyLayout` for project entries and substantially deepen the Markdown records.

This is preferred over a broad visual redesign because it:

- preserves the existing design language and navigation;
- avoids touching the reproduction subsystem;
- keeps projects Markdown-first and agent-editable;
- improves credibility through structure rather than decorative UI;
- creates a reusable template for future project additions;
- minimizes regression risk for GitHub Pages deployment.

## Alternatives Considered

### A. Content-only expansion

Only enlarge the three Markdown files and keep `ArticleLayout` unchanged.

**Pros:** smallest code change and lowest regression risk.

**Cons:** the detail pages would still fail to surface project metrics, project-specific navigation, architecture summaries, and hierarchy in a portfolio-native way.

### B. Dedicated project case-study layout — selected

Add a project-specific layout, keep the collection schema mostly intact, and deepen the project content.

**Pros:** strong improvement with bounded scope; reusable; preserves static-first architecture.

**Cons:** requires one new layout, route adaptation, styling, and tests.

### C. Full project/workbench redesign

Redesign Projects, Reproductions, and project content around a new shared research-object system.

**Pros:** maximum long-term flexibility.

**Cons:** unnecessary for the current problem, high regression risk, and likely to blur the intentionally separate reproduction model.

## Information Architecture

### Projects landing page

The Projects page should communicate two complementary kinds of work:

- **Research systems** — infrastructure for repeatable quantitative research and agent-assisted discovery.
- **Strategy frameworks** — reusable research frameworks for systematic trading research.

The existing Reproduction Workbench remains a first-class gateway under Projects and is not merged into ordinary project cards.

### Project detail pages

Each project detail page will contain:

1. Back navigation and project status.
2. Title and concise thesis.
3. Key project metrics from existing frontmatter.
4. Optional repository/docs actions only when real URLs exist.
5. A project navigation block derived from Markdown headings.
6. Structured long-form case-study content.

The body should be readable as a research memo, not a product marketing page.

## Project Content Standard

Each flagship project should include the following sections where applicable:

- Research problem
- Design thesis
- Architecture / research loop
- Core modules or strategy families
- Data and state ownership
- Human / agent interface boundaries
- Validation and guardrails
- Implemented vs experimental vs planned scope
- Failure modes / design trade-offs
- Relationship to other Lorien Lab research
- Current development priorities

No claim should imply a public implementation, production readiness, or verified investment performance unless the repository currently supports that claim.

## Project-Specific Direction

### Quant Research Harness

Position it as the durable research-state and orchestration layer. Emphasize separation between the workbench, bounded research agents, and replaceable search algorithms. Explain factor promotion, correlation de-duplication, experiment lineage, memory constraints, and human/agent legibility.

### LLM-based Factor Discovery Engine

Position it as a constrained search system rather than an unconstrained factor idea generator. Explain the full loop from hypothesis to expression validation, computation, evaluation, similarity filtering, diagnosis, memory, and next-round proposal. Make clear that LLM, GP, RL, and surrogate-guided search are interchangeable proposal/search backends over a shared evaluation contract.

### CTA Research Framework

Position it as a strategy-research framework rather than a single CTA strategy. Explain signal families, shared execution assumptions, volatility/risk mapping, regime/event conditioning, validation discipline, and why stability across markets and regimes matters more than one optimized backtest statistic.

## Component Boundaries

### `ProjectCaseStudyLayout.astro`

Responsibilities:

- render project hero metadata;
- render metrics and real external actions;
- render a lightweight in-page outline from headings;
- wrap the Markdown body in the existing typography system.

It must not own project content or business logic.

### `src/pages/projects/[...slug].astro`

Responsibilities:

- load project collection entry;
- render Markdown;
- pass frontmatter and generated headings to `ProjectCaseStudyLayout`.

### Project Markdown files

Responsibilities:

- hold research narrative and project-specific claims;
- remain easy for humans and agents to update without editing Astro components.

## Styling

Reuse existing CSS variables, spacing, borders, mono labels, accent color, and light/dark behavior. Add only project-case-study-specific styles.

The layout should remain static-first and require no browser JavaScript.

On wide screens, the outline may sit beside the main body. On narrow screens, it should stack above the body. The Markdown content remains the primary visual object.

## Truthfulness and Evidence Rules

- Do not fabricate Sharpe ratios, ICs, hit rates, backtest results, or implementation maturity.
- Do not add repository links for private or unrelated repositories merely to populate the UI.
- Distinguish clearly between implemented capabilities, current research directions, and planned extensions.
- Existing `repoUrl` and `docsUrl` remain optional and render only when provided.
- The reproduction subsystem remains the canonical place for source-by-source empirical reproduction evidence.

## Testing

Add a focused Node test contract for project case studies. It should verify:

- the project route uses the dedicated layout;
- the layout exposes metrics, optional actions, and heading navigation;
- the three flagship project records contain the expected research sections;
- no fabricated performance placeholders are introduced;
- existing Reproduction Workbench routing remains unchanged.

Existing `npm run test`, `npm run check`, and `npm run build` should remain the completion gates.

## Files Expected to Change

- `src/layouts/ProjectCaseStudyLayout.astro` — new
- `src/pages/projects/[...slug].astro`
- `src/pages/projects/index.astro`
- `src/content/projects/quant-research-harness.md`
- `src/content/projects/llm-factor-discovery.md`
- `src/content/projects/cta-research-framework.md`
- `tests/project-case-study.test.mjs` — new
- optionally `README.md` if authoring guidance needs to describe the richer project standard

## Non-Goals

- Redesigning the entire site theme.
- Changing canonical project URLs.
- Reworking the reproduction content schema.
- Adding fabricated project screenshots or performance charts.
- Publishing links to inaccessible private repositories.
- Introducing a JavaScript framework or client-side state layer.

## Acceptance Criteria

The upgrade is successful when:

1. Each core project reads like a technical research case study rather than a short placeholder.
2. Project detail pages surface metrics and hierarchy without duplicating the reproduction UI.
3. Project claims clearly separate current capability from research direction.
4. The Projects landing page explains the relationship between systems, strategies, and reproductions.
5. All existing tests plus the new project-case-study contract pass.
6. `astro check` and the production build pass before merge to `main`.
