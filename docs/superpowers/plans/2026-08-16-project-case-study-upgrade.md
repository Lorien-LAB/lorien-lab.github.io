# Project Case Study Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the three core project pages from short placeholders into truthful, structured quantitative-research case studies with a dedicated static Astro layout.

**Architecture:** Keep the existing `projects` content collection and canonical URLs. Add a project-only layout that consumes existing frontmatter plus rendered Markdown headings, then deepen the three Markdown records and clarify the Projects landing-page hierarchy. The Reproduction Workbench remains an independent subsystem.

**Tech Stack:** Astro 5, TypeScript, Markdown content collections, static HTML/CSS, Node built-in test runner.

## Global Constraints

- Preserve all existing `/projects/<slug>/` URLs.
- Preserve `/projects/reproductions/` as the canonical reproduction namespace.
- Static HTML first; add no client-side framework or required browser JavaScript.
- Do not fabricate investment-performance metrics, implementation maturity, repository links, screenshots, or empirical results.
- Render repository/docs actions only when the existing optional URLs are present.
- Reuse existing CSS variables, light/dark behavior, typography, borders, and spacing language.
- Keep project-specific research narrative in Markdown so both researchers and coding agents can update it.

---

### Task 1: Define the project case-study contract

**Files:**
- Create: `tests/project-case-study.test.mjs`
- Reference: `src/pages/projects/[...slug].astro`
- Reference: `src/content/projects/quant-research-harness.md`
- Reference: `src/content/projects/llm-factor-discovery.md`
- Reference: `src/content/projects/cta-research-framework.md`

**Interfaces:**
- Consumes: existing Node test runner invoked by `npm test`.
- Produces: a regression contract requiring a dedicated layout, heading navigation, metrics/actions support, substantial research sections, and no fabricated performance copy.

- [ ] **Step 1: Write the failing contract test**

Create `tests/project-case-study.test.mjs` with these checks:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const projectFiles = [
  'src/content/projects/quant-research-harness.md',
  'src/content/projects/llm-factor-discovery.md',
  'src/content/projects/cta-research-framework.md',
];

test('project detail route uses the dedicated case-study layout', async () => {
  await access('src/layouts/ProjectCaseStudyLayout.astro');
  const route = await readFile('src/pages/projects/[...slug].astro', 'utf8');
  assert.match(route, /ProjectCaseStudyLayout/);
  assert.match(route, /headings/);
  assert.doesNotMatch(route, /ArticleLayout/);
});

test('project case-study layout exposes metrics, real optional actions, and an outline', async () => {
  const layout = await readFile('src/layouts/ProjectCaseStudyLayout.astro', 'utf8');
  assert.match(layout, /metrics/);
  assert.match(layout, /repoUrl/);
  assert.match(layout, /docsUrl/);
  assert.match(layout, /headings/);
  assert.match(layout, /Project outline/i);
  assert.doesNotMatch(layout, /client:/);
});

test('flagship project records read as research case studies', async () => {
  for (const file of projectFiles) {
    const source = await readFile(file, 'utf8');
    assert.ok(source.length > 3000, `${file} is still too thin for a flagship case study`);
    assert.match(source, /## Research problem|## Research scope/);
    assert.match(source, /## Design thesis|## Research thesis/);
    assert.match(source, /## Architecture|## Research architecture/);
    assert.match(source, /## Validation|## Validation discipline/);
    assert.match(source, /## Current|## Development|## Research priorities/);
    assert.doesNotMatch(source, /Sharpe\s+[0-9]|Rank IC\s+[0-9]|Annual Return\s+[0-9]/i);
  }
});

test('projects landing explains systems, strategies, and reproductions without changing canonical routing', async () => {
  const page = await readFile('src/pages/projects/index.astro', 'utf8');
  assert.match(page, /Research Systems/);
  assert.match(page, /Strategy Frameworks/);
  assert.match(page, /ReproductionGateway/);
  assert.match(page, /projects\/reproductions\//);
});
```

- [ ] **Step 2: Run the focused test and verify it fails for the expected reasons**

Run:

```bash
node --test tests/project-case-study.test.mjs
```

Expected: FAIL because `ProjectCaseStudyLayout.astro` does not yet exist and the current project Markdown files are shorter than the contract.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/project-case-study.test.mjs
git commit -m "test: define project case study contract"
```

---

### Task 2: Add the dedicated project case-study layout

**Files:**
- Create: `src/layouts/ProjectCaseStudyLayout.astro`
- Modify: `src/pages/projects/[...slug].astro`
- Test: `tests/project-case-study.test.mjs`

**Interfaces:**
- Consumes: project fields `title`, `description`, `date`, `tags`, `status`, optional `repoUrl`, optional `docsUrl`, optional `metrics`, plus Astro-rendered `headings`.
- Produces: `ProjectCaseStudyLayout` with a named props interface and a default slot for rendered Markdown.

- [ ] **Step 1: Implement `ProjectCaseStudyLayout.astro`**

Use this component structure:

```astro
---
import BaseLayout from './BaseLayout.astro';
import TagList from '../components/TagList.astro';
import MetricBadge from '../components/MetricBadge.astro';
import type { MarkdownHeading } from 'astro';

interface Props {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  status: string;
  repoUrl?: string;
  docsUrl?: string;
  metrics?: Record<string, string>;
  headings: MarkdownHeading[];
  backHref: string;
  backLabel: string;
}

const {
  title, description, date, tags, status, repoUrl, docsUrl,
  metrics = {}, headings, backHref, backLabel,
} = Astro.props;
const outline = headings.filter((heading) => heading.depth === 2 || heading.depth === 3);
const metricEntries = Object.entries(metrics);
---
```

Render:

- the same `BaseLayout` title/description pattern as `ArticleLayout`;
- back link, `Project Case Study` mono label, title, description, date, status, tags;
- a key-facts row when `metrics` is non-empty;
- action links only when `repoUrl` and/or `docsUrl` exist;
- a `Project outline` navigation list only when headings exist;
- a two-column shell on wide screens: sticky outline left, Markdown prose right;
- a stacked shell on mobile;
- no client directive or runtime JavaScript.

Use existing variables such as `--border`, `--muted`, `--accent`, `--ink`, `--font-mono`, and existing `.prose` typography rather than adding new theme tokens.

- [ ] **Step 2: Route projects through the new layout and pass rendered headings**

Replace the `ArticleLayout` import and render destructuring in `src/pages/projects/[...slug].astro` with:

```astro
import ProjectCaseStudyLayout from '../../layouts/ProjectCaseStudyLayout.astro';
// ...
const { Content, headings } = await render(entry);
```

Render:

```astro
<ProjectCaseStudyLayout
  title={entry.data.title}
  description={entry.data.description}
  date={entry.data.date}
  tags={entry.data.tags}
  status={entry.data.status}
  repoUrl={entry.data.repoUrl}
  docsUrl={entry.data.docsUrl}
  metrics={entry.data.metrics}
  headings={headings}
  backHref={`${import.meta.env.BASE_URL}projects/`}
  backLabel="All projects"
>
  <Content />
</ProjectCaseStudyLayout>
```

- [ ] **Step 3: Run the focused contract**

```bash
node --test tests/project-case-study.test.mjs
```

Expected: the layout-specific assertions PASS; project-content assertions still FAIL until Task 3.

- [ ] **Step 4: Run Astro type checking for the new layout interface**

```bash
npm run check
```

Expected: PASS. If Astro's exported heading type differs, use the type actually returned by `render(entry).headings` without loosening it to `any`.

- [ ] **Step 5: Commit the layout and route**

```bash
git add src/layouts/ProjectCaseStudyLayout.astro src/pages/projects/'[...slug].astro'
git commit -m "feat: add project case study layout"
```

---

### Task 3: Rewrite the three flagship project records as technical case studies

**Files:**
- Modify: `src/content/projects/quant-research-harness.md`
- Modify: `src/content/projects/llm-factor-discovery.md`
- Modify: `src/content/projects/cta-research-framework.md`
- Test: `tests/project-case-study.test.mjs`

**Interfaces:**
- Consumes: existing project frontmatter schema unchanged.
- Produces: Markdown bodies with stable H2/H3 headings that populate the layout outline.

- [ ] **Step 1: Expand `quant-research-harness.md`**

Keep existing truthful frontmatter. Replace the short body with sections covering:

```markdown
## Research problem
## Design thesis
## Research architecture
### Durable research state
### Bounded agent orchestration
### Replaceable search backends
## Core research surfaces
### Experiment workspace
### Factor library and promotion
### Correlation de-duplication
### Experiment lineage
### Human + agent interface
## Validation and guardrails
## Memory and performance discipline
## Implemented, experimental, and planned scope
## Relationship to the broader research stack
## Current development priorities
```

State explicitly that the workbench owns durable state, agents operate through bounded contracts, and search algorithms are replaceable plugins. Describe OOM avoidance as an architectural concern: lazy/loading boundaries, bounded materialization, compact experiment summaries, and separation of durable artifacts from transient agent context. Do not claim benchmark numbers.

- [ ] **Step 2: Expand `llm-factor-discovery.md`**

Use this research narrative:

```markdown
## Research problem
## Research thesis
## Research loop
### 1. Hypothesis proposal
### 2. Expression construction
### 3. Static validation
### 4. Factor computation
### 5. Evaluation
### 6. Similarity and redundancy filtering
### 7. Diagnosis and memory
### 8. Next-round proposal
## Search backends
### Language-model search
### Genetic programming
### Reinforcement learning
### Surrogate-guided search
## Shared evaluation contract
## Anti-redundancy and factor promotion
## Validation discipline
## Failure modes
## Relationship to the Quant Research Harness
## Current research priorities
```

Emphasize that the LLM is a proposal engine rather than the source of truth; deterministic validation and a shared evaluator decide whether a proposal survives. Avoid claiming that every search backend is production-complete; describe them as interchangeable research backends with differing maturity.

- [ ] **Step 3: Expand `cta-research-framework.md`**

Use this research narrative:

```markdown
## Research scope
## Research thesis
## Research architecture
## Strategy families
### Trend and breakout
### Mean reversion and reversal
### Volatility-state signals
### Cross-sectional relative strength
### Event-conditioned variants
## Shared signal-to-position pipeline
## Risk and portfolio layer
## Regime and event conditioning
## Validation discipline
## Failure modes and robustness checks
## Relationship to spread and futures research
## Current research priorities
```

Describe shared assumptions, signal normalization, position mapping, volatility scaling, turnover/cost awareness, walk-forward validation, parameter stability, and cross-market/regime robustness. Do not introduce strategy performance numbers.

- [ ] **Step 4: Run the focused contract**

```bash
node --test tests/project-case-study.test.mjs
```

Expected: all project-content assertions PASS.

- [ ] **Step 5: Commit the content upgrade**

```bash
git add src/content/projects/*.md
git commit -m "content: deepen flagship project case studies"
```

---

### Task 4: Clarify the Projects landing-page hierarchy and authoring guidance

**Files:**
- Modify: `src/pages/projects/index.astro`
- Modify: `README.md`
- Test: `tests/project-case-study.test.mjs`
- Test: `tests/site-structure.test.mjs`

**Interfaces:**
- Consumes: existing project collection and `ReproductionGateway`.
- Produces: an explicit distinction between research systems, strategy frameworks, and reproductions without changing routes or collection schemas.

- [ ] **Step 1: Group the three existing projects by portfolio role**

In `src/pages/projects/index.astro`, derive:

```js
const systems = entries.filter((entry) =>
  entry.id === 'quant-research-harness' || entry.id === 'llm-factor-discovery'
);
const strategies = entries.filter((entry) => entry.id === 'cta-research-framework');
```

Retain the existing page hero and `ReproductionGateway`, then render two titled sections:

```astro
<section class="section project-group">
  <div class="container">
    <div class="section-heading">
      <div class="mono-label">Research Systems</div>
      <h2>Infrastructure for repeatable research.</h2>
      <p>Workbenches, search loops, and interfaces that make quantitative research durable, inspectable, and extensible.</p>
    </div>
    <div class="card-grid">{systems.map((entry) => <ProjectCard entry={entry} />)}</div>
  </div>
</section>

<section class="section project-group">
  <div class="container">
    <div class="section-heading">
      <div class="mono-label">Strategy Frameworks</div>
      <h2>Reusable structures for systematic trading research.</h2>
      <p>Strategy families evaluated under shared assumptions, risk controls, and validation discipline rather than isolated headline backtests.</p>
    </div>
    <div class="card-grid">{strategies.map((entry) => <ProjectCard entry={entry} />)}</div>
  </div>
</section>
```

Keep `ReproductionGateway` as its own first-class section before these groups.

- [ ] **Step 2: Document the project case-study authoring standard**

Add a `### Project case studies` subsection under `## Content authoring` in `README.md` explaining:

- project detail pages use `ProjectCaseStudyLayout`;
- H2/H3 headings automatically populate the project outline;
- `metrics`, `repoUrl`, and `docsUrl` are optional and must be factual;
- project pages should separate implemented capabilities, experimental work, and planned directions;
- empirical source reproduction belongs in the Reproduction Workbench rather than being duplicated as an ordinary project.

- [ ] **Step 3: Run project and site-structure tests**

```bash
node --test tests/project-case-study.test.mjs tests/site-structure.test.mjs
```

Expected: PASS.

- [ ] **Step 4: Commit landing-page and documentation changes**

```bash
git add src/pages/projects/index.astro README.md
git commit -m "feat: clarify projects portfolio hierarchy"
```

---

### Task 5: Full verification before merge

**Files:**
- Verify all modified files from Tasks 1–4.

**Interfaces:**
- Consumes: completed project case-study upgrade.
- Produces: evidence that the branch is safe to merge into `main`.

- [ ] **Step 1: Run the full test suite**

```bash
npm run test
```

Expected: all Node tests PASS, including existing reproduction and learning-resource contracts.

- [ ] **Step 2: Run Astro type/content validation**

```bash
npm run check
```

Expected: PASS with zero Astro/TypeScript errors.

- [ ] **Step 3: Build the production site**

```bash
npm run build
```

Expected: PASS and static output generated under `dist/`.

- [ ] **Step 4: Review the branch diff for truthfulness and scope**

Confirm:

- no reproduction schema or canonical route changed;
- no private/inaccessible repository URL was added;
- no fabricated performance statistic appears in project copy;
- the three project pages all use the dedicated layout;
- the Projects landing still links to `/projects/reproductions/`.

- [ ] **Step 5: Commit any verification-only corrections**

If verification exposes a real defect, fix only that defect and commit it with a focused message such as:

```bash
git add <exact-files-fixed>
git commit -m "fix: resolve project case study verification issue"
```

Do not create an empty verification commit.

- [ ] **Step 6: Open a pull request to `main`**

Use title:

```text
Upgrade flagship project pages into research case studies
```

The PR body should summarize the dedicated layout, the three expanded project narratives, the Projects landing-page hierarchy, and the passing `test`, `check`, and `build` gates.
