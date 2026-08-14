# Quant Research Reproduction System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a production-ready Quant Research Reproduction Workbench to the Lorien Lab Knowledge Base and initialize the companion `Lorien-LAB/quant-research-reproductions` repository for executable academic-paper and broker-report reproductions.

**Architecture:** The website remains static-first Astro and owns presentation, filtering, metadata, score visualization, relationship links, and `/reports/<slug>/` integration. A separate public GitHub repository owns runnable reproduction code, shared research utilities, templates, scoring standards, and agent-facing manifests. Both repositories use one canonical slug per reproduction.

**Tech Stack:** Astro 5, TypeScript, Markdown content collections, Node test runner, minimal browser JavaScript, GitHub Pages, Python project scaffold for the reproduction repository.

## Global Constraints

- Reproductions remain under `/knowledge/reproductions/`; no new top-level site navigation item.
- Support exactly two v1 source types: `academic` and `broker`.
- Do not host original PDFs in the website repository.
- Original HTML, when available, lives at `/reports/<slug>/` and is rendered only when a real path exists.
- Do not fabricate reproduction records, metrics, scores, performance statistics, or sample claims.
- Reproduction workflow is exactly: `reading`, `data`, `implementation`, `validation`, `reproduction`, `extension`.
- Result states are exactly: `successful`, `partial`, `failed`, `inconclusive`, `extended`.
- Code visibility states are exactly: `public`, `partial`, `private`.
- Reproduction score dimensions are `dataMatch`, `methodMatch`, `signalMatch`, `performanceMatch`, `robustness`, `reproducibility`, each optional and constrained to 0–5.
- Overall score is derived from available dimensions and is not independently authored.
- The website must remain useful with JavaScript disabled; filters are progressive enhancement.
- Broken relationship slugs and unavailable optional artifacts are omitted rather than rendered as broken links.
- Existing Research, Projects, Notes, Knowledge, CV, About, theme, and Pages deployment behavior must remain intact.

---

## File Structure

### Website repository: `Lorien-LAB/lorien-lab.github.io`

- Modify `src/content.config.ts` — add the validated `reproductions` collection.
- Create `src/components/ReproductionCard.astro` — compact reusable reproduction summary.
- Create `src/components/ReproductionPipeline.astro` — six-stage pipeline visualization.
- Create `src/components/ReproductionScore.astro` — six-dimensional score visualization and derived mean.
- Create `src/pages/knowledge/reproductions/index.astro` — workbench landing page, source-type sections, filters, and empty state.
- Create `src/pages/knowledge/reproductions/[...id].astro` — static detail route and relationship resolution.
- Modify `src/pages/knowledge/index.astro` — visible Reproductions entry in the Knowledge Base.
- Modify `tests/site-structure.test.mjs` — smoke coverage for schema, routes, states, no-fabrication, and integration.
- Modify `README.md` — authoring instructions and cross-repository slug contract.

### Code repository: `Lorien-LAB/quant-research-reproductions`

- Create `README.md` — repository purpose, structure, workflow, and public/partial/private policy.
- Create `pyproject.toml` — minimal Python project metadata and test/tooling baseline.
- Create `LICENSE` — repository license.
- Create `academic/.gitkeep`, `broker/.gitkeep` — canonical top-level source directories.
- Create `shared/{data,factors,preprocessing,portfolio,backtest,evaluation,visualization,utils}/README.md` — module responsibilities without fake implementations.
- Create `templates/academic/README.md` and `templates/broker/README.md` — human/agent authoring templates.
- Create `templates/academic/reproduction.yaml` and `templates/broker/reproduction.yaml` — valid manifests with placeholders expressed as schema examples, not fake research results.
- Create `docs/reproduction-standard.md` — canonical six-stage process and directory contract.
- Create `docs/scoring-standard.md` — 0–5 six-dimensional scoring rubric and interpretation.
- Create `docs/agent-interface.md` — deterministic inputs/outputs and slug mapping for agents.
- Create `.gitignore` — exclude local environments, credentials, large local data, notebook checkpoints, and transient outputs.

---

### Task 1: RED — Website Reproduction Contract Tests

**Files:**
- Modify: `tests/site-structure.test.mjs`

**Interfaces:**
- Consumes: existing Astro source tree.
- Produces: failing tests that define the required reproduction schema and routes before production code exists.

- [ ] **Step 1: Add failing smoke tests**

Add tests that assert:

```js
const reproductionFiles = [
  'src/pages/knowledge/reproductions/index.astro',
  'src/pages/knowledge/reproductions/[...id].astro',
  'src/components/ReproductionCard.astro',
  'src/components/ReproductionPipeline.astro',
  'src/components/ReproductionScore.astro',
];
```

Assert `src/content.config.ts` contains `const reproductions = defineCollection`, both source types, all six stages, all five results, all three code-visibility states, and all six score dimensions. Assert the Knowledge page contains a `/knowledge/reproductions/` link, the workbench contains Academic Papers and Broker Reports, and source contains no fabricated hard-coded Sharpe/IC reproduction values.

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
npm test
```

Expected: existing tests pass and new reproduction tests fail because the reproduction collection/routes/components do not exist yet.

- [ ] **Step 3: Commit the RED contract**

```bash
git add tests/site-structure.test.mjs
git commit -m "test: define reproduction workbench contract"
```

---

### Task 2: Reproduction Content Model

**Files:**
- Modify: `src/content.config.ts`

**Interfaces:**
- Produces: `CollectionEntry<'reproductions'>` with common fields, discriminated academic/broker metadata, optional score object, metrics list, artifact paths, and relationship slug arrays.

- [ ] **Step 1: Add the `reproductions` collection**

Use `glob({ base: './src/content/reproductions', pattern: '**/*.md' })` and a schema that includes:

```ts
sourceType: z.enum(['academic', 'broker'])
stage: z.enum(['reading','data','implementation','validation','reproduction','extension'])
result: z.enum(['successful','partial','failed','inconclusive','extended'])
codeVisibility: z.enum(['public','partial','private'])
score: z.object({
  dataMatch: z.number().min(0).max(5).optional(),
  methodMatch: z.number().min(0).max(5).optional(),
  signalMatch: z.number().min(0).max(5).optional(),
  performanceMatch: z.number().min(0).max(5).optional(),
  robustness: z.number().min(0).max(5).optional(),
  reproducibility: z.number().min(0).max(5).optional(),
}).optional()
metrics: z.array(z.object({
  name: z.string(), original: z.string(), reproduced: z.string(), difference: z.string().optional()
})).default([])
```

Include academic metadata (`authors`, `year`, `venue`, `journal`, `conference`, `doi`, `ssrn`, `arxiv`, `paperUrl`) and broker metadata (`broker`, `analysts`, `publishDate`, `series`, `reportNumber`), plus `reportHtmlPath`, `sourceUrl`, `codeUrl`, and relationship arrays.

- [ ] **Step 2: Run tests**

Run `npm test`; schema-state assertions should pass while route/component assertions still fail.

- [ ] **Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: add reproduction content model"
```

---

### Task 3: Reproduction UI Primitives

**Files:**
- Create: `src/components/ReproductionCard.astro`
- Create: `src/components/ReproductionPipeline.astro`
- Create: `src/components/ReproductionScore.astro`

**Interfaces:**
- `ReproductionCard` consumes `CollectionEntry<'reproductions'>`.
- `ReproductionPipeline` consumes `stage` and renders all six ordered stages with current/completed semantics.
- `ReproductionScore` consumes the optional score object and derives the arithmetic mean from present dimensions only.

- [ ] **Step 1: Implement `ReproductionPipeline.astro`**

Render six semantic stages with labels `Reading`, `Data`, `Implementation`, `Validation`, `Reproduction`, `Extension`. Use text/shape differences in addition to color for accessibility.

- [ ] **Step 2: Implement `ReproductionScore.astro`**

Map dimensions to readable labels, render only supplied dimensions, clamp presentation to 0–5, and compute:

```ts
const values = Object.values(score ?? {}).filter((value): value is number => typeof value === 'number');
const overall = values.length ? values.reduce((a,b) => a+b, 0) / values.length : null;
```

Do not invent missing values.

- [ ] **Step 3: Implement `ReproductionCard.astro`**

Show source type, title, description, research area, stage, result, code visibility, and derived overall score only when score data exists.

- [ ] **Step 4: Run tests and build**

Run:

```bash
npm test
npm run build
```

Expected: production build succeeds; route assertions may still fail until Task 4.

- [ ] **Step 5: Commit**

```bash
git add src/components/ReproductionCard.astro src/components/ReproductionPipeline.astro src/components/ReproductionScore.astro
git commit -m "feat: add reproduction UI primitives"
```

---

### Task 4: Reproduction Workbench Landing Page

**Files:**
- Create: `src/pages/knowledge/reproductions/index.astro`

**Interfaces:**
- Consumes: `getCollection('reproductions')`, `ReproductionCard`.
- Produces: `/knowledge/reproductions/` static page with derived counts, Academic/Broker subsections, filters, and empty state.

- [ ] **Step 1: Load and classify real entries**

Load all reproductions and derive counts from collection data. Never hard-code corpus counts.

- [ ] **Step 2: Build the workbench hero and source-type split**

Use the approved positioning copy:

```text
Quant Research Reproductions
Reproducing quantitative research, not merely summarizing it.
```

Present separate Academic Papers and Broker Reports blocks within one workbench.

- [ ] **Step 3: Implement progressive filters**

Render all records in HTML first. Add client-side filters for text search, source type, research area, stage, result, and code visibility. Reset returns all records.

- [ ] **Step 4: Implement truthful empty state**

When no real entries exist, render:

```text
Reproduction library initialized. Research records will appear as reproductions are completed.
```

Do not create sample reproduction records.

- [ ] **Step 5: Run tests and build**

Run `npm test && npm run build`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/knowledge/reproductions/index.astro
git commit -m "feat: add reproduction workbench"
```

---

### Task 5: Reproduction Detail Page

**Files:**
- Create: `src/pages/knowledge/reproductions/[...id].astro`

**Interfaces:**
- Consumes: `reproductions`, existing `knowledge`, `notes`, and `projects` collections plus pipeline/score components.
- Produces: one static research record page per reproduction.

- [ ] **Step 1: Generate static paths**

Use `getCollection('reproductions')` and map each entry ID to one detail route.

- [ ] **Step 2: Resolve source metadata by type**

Academic header exposes authors/year/venue links when supplied. Broker header exposes broker/analysts/publish date/series when supplied.

- [ ] **Step 3: Render workflow, result, and score**

Show stage independently from result. Render result explanation from authored body/context; do not derive `successful` from score.

- [ ] **Step 4: Render Original vs Reproduction metrics**

Render a comparison table only when `metrics.length > 0`.

- [ ] **Step 5: Render artifacts safely**

Rules:

```text
Original HTML -> only if reportHtmlPath exists
Source        -> only if sourceUrl/paperUrl exists
View Code     -> only if codeVisibility != private AND codeUrl exists
Private       -> non-interactive “Implementation Private”
```

- [ ] **Step 6: Resolve relationships safely**

Resolve `relatedKnowledge`, `relatedNotes`, and `relatedProjects` against real collection IDs/slugs and omit unresolved targets.

- [ ] **Step 7: Run tests and build**

Run `npm test && npm run build`.

- [ ] **Step 8: Commit**

```bash
git add 'src/pages/knowledge/reproductions/[...id].astro'
git commit -m "feat: add reproduction research records"
```

---

### Task 6: Knowledge Base Integration and Documentation

**Files:**
- Modify: `src/pages/knowledge/index.astro`
- Modify: `README.md`

**Interfaces:**
- Produces: visible Reproductions entry inside Knowledge Base; authoring contract documented for humans and agents.

- [ ] **Step 1: Add Reproductions to Knowledge Base**

Add a dedicated block/rail linking to `${base}knowledge/reproductions/`, positioned as an empirical research workbench distinct from Concept/Paper/Tool/Topic entries.

- [ ] **Step 2: Document website authoring**

README must explain `src/content/reproductions/{academic,broker}/`, source types, stage/result/code visibility enums, score rules, `/reports/<slug>/`, and the canonical slug mapping to the code repository.

- [ ] **Step 3: Run full website verification**

Run:

```bash
npm test
npm run check
npm run build
```

Expected: zero test failures and successful Astro type/build checks.

- [ ] **Step 4: Commit**

```bash
git add src/pages/knowledge/index.astro README.md
git commit -m "docs: integrate reproduction workbench"
```

---

### Task 7: Create and Initialize `quant-research-reproductions`

**Files:** new GitHub repository.

**Interfaces:**
- Produces: public repository `Lorien-LAB/quant-research-reproductions` and stable folder/manifest contracts consumed by reproduction pages and future agents.

- [ ] **Step 1: Verify repository does not already exist**

Run:

```bash
gh repo view Lorien-LAB/quant-research-reproductions
```

Expected: not found before creation, or inspect existing repository if it already exists and preserve compatible content.

- [ ] **Step 2: Create the public repository**

Run only if absent:

```bash
gh repo create Lorien-LAB/quant-research-reproductions --public --description "Reproducible implementations of quantitative-finance academic papers and broker research reports." --clone=false
```

- [ ] **Step 3: Initialize top-level files and directories**

Create the exact structure listed in the File Structure section. Use `.gitkeep` only where Git otherwise cannot preserve an empty directory.

- [ ] **Step 4: Add manifest templates**

Academic and broker templates must include real schema keys but no fake paper/report names or results. Example score fields must be commented/documented rather than populated with fabricated scores.

- [ ] **Step 5: Add standards**

`docs/reproduction-standard.md` defines the six stages and per-project directory standard. `docs/scoring-standard.md` defines each 0–5 score dimension. `docs/agent-interface.md` defines deterministic inputs, outputs, slug rules, and protected/private-code behavior.

- [ ] **Step 6: Add minimal Python project metadata**

`pyproject.toml` names the project `quant-research-reproductions`, requires Python >=3.11, and defines only lightweight development dependencies required by the initial repository scaffold; do not prematurely add backtesting or ML libraries.

- [ ] **Step 7: Verify repository structure**

Run:

```bash
gh api repos/Lorien-LAB/quant-research-reproductions/git/trees/main?recursive=1 --jq '.tree[].path'
```

Expected: all required top-level folders, templates, and docs are present.

---

### Task 8: Cross-Repository Contract Verification

**Files:**
- Website `README.md`
- Code repository `docs/agent-interface.md`

**Interfaces:**
- Ensures both repositories agree on one canonical slug and public URL mapping.

- [ ] **Step 1: Verify URL mapping**

Document and check these formulas:

```text
Website record: /knowledge/reproductions/<slug>/
Original HTML:  /reports/<slug>/
Academic code:  https://github.com/Lorien-LAB/quant-research-reproductions/tree/main/academic/<slug>/
Broker code:    https://github.com/Lorien-LAB/quant-research-reproductions/tree/main/broker/<slug>/
```

- [ ] **Step 2: Verify no fake/dead links are generated**

Website source must require actual `reportHtmlPath`/`codeUrl` before rendering actions.

- [ ] **Step 3: Verify empty-library production build**

Run the website with zero `src/content/reproductions/**/*.md` records and ensure `npm run build` succeeds and the empty state renders.

- [ ] **Step 4: Commit any contract fixes**

Commit only if verification found a mismatch.

---

### Task 9: Browser Visual QA and Production Integration

**Files:** temporary QA workflow/files only if required; remove before merge.

**Interfaces:**
- Produces: verified desktop/mobile rendering without leaving QA artifacts in `main`.

- [ ] **Step 1: Run browser screenshots on the feature branch**

Capture `/knowledge/reproductions/` at desktop width and approximately 390px mobile width using Chromium/Playwright in CI if a local browser is unavailable.

- [ ] **Step 2: Inspect visual hierarchy and responsive behavior**

Verify no horizontal overflow, filter controls wrap cleanly, Academic/Broker separation is obvious, empty state is intentional, and Knowledge Base link remains coherent with the existing design language.

- [ ] **Step 3: Remove temporary QA files/workflows**

No screenshots, base64 screenshots, temporary CI workflows, or browser artifacts remain in the final diff.

- [ ] **Step 4: Run final website verification on the exact integration tree**

Run:

```bash
npm test
npm run check
npm run build
```

- [ ] **Step 5: Compare feature branch to `main`**

Confirm only reproduction-system source, tests, documentation, and plan/spec files differ.

- [ ] **Step 6: Integrate after verification**

Fast-forward or merge the feature branch into `main` only after final verification, then wait for `Deploy to GitHub Pages` build and deploy jobs to conclude successfully.
