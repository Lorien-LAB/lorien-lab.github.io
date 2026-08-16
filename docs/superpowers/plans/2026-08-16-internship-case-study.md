# Sanitized Internship Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a recruiter-facing, confidentiality-safe case study for the 2026 systematic futures calendar-spread internship project, connect it from the CV, and surface it in the unified Research & Projects portfolio.

**Architecture:** Reuse the existing `projects` content collection and `ProjectCaseStudyLayout` so the internship remains a normal portfolio project rather than a separate microsite. Add one small schema/layout extension (`period`) for truthful May–Jul 2026 display, then add the sanitized Markdown record, bilingual card presentation, CV link, and strategy-research classification. Protect the confidentiality boundary with explicit regression tests before any production content is added.

**Tech Stack:** Astro 5, TypeScript, Astro Content Collections, Markdown, Node test runner, GitHub Actions.

## Global Constraints

- Public project slug is exactly `systematic-futures-calendar-spread-internship`.
- Public title is `Systematic Futures Calendar-Spread Research — Internship Case Study`.
- Public status is `Internship Research`.
- Public period is exactly `May–Jul 2026`; do not render an invented completion day.
- `date: 2026-07-31` is allowed only as a hidden collection sorting key.
- Retain only the already-public aggregate figures: `2023–2026 rolling test window`, `2 bp per leg per side`, `Sharpe 2.40`, `maximum drawdown 5.28%`.
- No employer name, private repository, internal dataset, internal filename, or employer infrastructure may be published.
- Do not publish exact spread orientation/normalization formulas, signal equations, proprietary feature definitions, lookbacks, thresholds, gates, weights, coefficients, parameter grids, model architecture, state-transition formulas, entry/exit triggers, sizing/position functions, instrument-specific rules, or reconstructive pseudo-code.
- Portfolio card and CV link must support the existing English/Chinese language toggle.
- Detailed long-form case-study narrative remains English, matching the existing project-detail convention.
- Do not modify Knowledge content or routes.

---

### Task 1: Lock the confidentiality and integration contract with failing tests

**Files:**
- Create: `tests/internship-case-study.test.mjs`

**Interfaces:**
- Consumes: repository file paths and public content conventions.
- Produces: executable regression contract for all later tasks.

- [ ] **Step 1: Write the failing test file**

Create tests that require:

```js
const projectPath = 'src/content/projects/systematic-futures-calendar-spread-internship.md';
const cvPath = 'src/pages/cv.astro';
const portfolioPath = 'src/pages/research-projects/index.astro';
const i18nPath = 'src/data/i18n/publicContentZh.ts';
const configPath = 'src/content.config.ts';
const layoutPath = 'src/layouts/ProjectCaseStudyLayout.astro';
```

Assertions must check:

```js
await access(projectPath);
assert.match(project, /status:\s*Internship Research/);
assert.match(project, /featured:\s*true/);
assert.match(project, /period:\s*May–Jul 2026/);
assert.match(project, /2023–2026 rolling test window/);
assert.match(project, /2 bp per leg per side/);
assert.match(project, /Sharpe[^\n]*2\.40/);
assert.match(project, /maximum drawdown[^\n]*5\.28%/i);
assert.match(project, /confidential|intentionally omitted|sanitized/i);
assert.match(cv, /systematic-futures-calendar-spread-internship/);
assert.match(cv, /View sanitized public case study/);
assert.match(cv, /查看脱敏后的公开案例/);
assert.match(portfolio, /systematic-futures-calendar-spread-internship/);
assert.match(i18n, /systematic-futures-calendar-spread-internship/);
assert.match(config, /period:\s*z\.string\(\)\.optional\(\)/);
assert.match(layout, /period\?/);
```

Also ban reconstructive leakage with conservative patterns:

```js
for (const banned of [
  /private repository/i,
  /whitelist|blacklist/i,
  /parameter grid/i,
  /entry threshold|exit threshold/i,
  /position\s*=|signal\s*=/i,
  /main_close\s*-\s*secondary_close/i,
  /secondary_close\s*-\s*main_close/i,
]) assert.doesNotMatch(project, banned);
```

- [ ] **Step 2: Verify RED**

Run through PR CI after committing the test-only change. Expected: FAIL because the project record, `period` support, CV link, i18n entry, and classification do not yet exist.

- [ ] **Step 3: Commit the RED contract**

Commit message:

```text
test: define sanitized internship case study contract
```

### Task 2: Add truthful internship period support to project metadata

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/pages/projects/[...slug].astro`
- Modify: `src/layouts/ProjectCaseStudyLayout.astro`
- Test: `tests/internship-case-study.test.mjs`

**Interfaces:**
- Consumes: optional project frontmatter field `period?: string`.
- Produces: `ProjectCaseStudyLayout` prop `period?: string`; when present, the page displays `period` instead of formatting `date`.

- [ ] **Step 1: Extend project schema minimally**

Add:

```ts
period: z.string().optional(),
```

inside the `projects` schema only.

- [ ] **Step 2: Pass the field through the project route**

Add:

```astro
period={entry.data.period}
```

to the `ProjectCaseStudyLayout` invocation.

- [ ] **Step 3: Extend layout props and render logic**

Add:

```ts
period?: string;
```

to `Props`, destructure `period`, and replace the current `<time>` body with:

```astro
{period ? <span>{period}</span> : (
  <time datetime={date.toISOString()}>
    {date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
  </time>
)}
```

Existing projects must remain unchanged because they do not set `period`.

- [ ] **Step 4: Verify the period-specific test contract**

Expected: schema/layout assertions pass; project-content assertions remain red until Task 3.

- [ ] **Step 5: Commit**

Commit message:

```text
feat: support public project period labels
```

### Task 3: Add the sanitized internship project record

**Files:**
- Create: `src/content/projects/systematic-futures-calendar-spread-internship.md`
- Test: `tests/internship-case-study.test.mjs`

**Interfaces:**
- Produces: `/projects/systematic-futures-calendar-spread-internship/` via the existing dynamic project route.

- [ ] **Step 1: Add approved frontmatter**

Use exactly:

```yaml
---
title: Systematic Futures Calendar-Spread Research — Internship Case Study
description: A sanitized public case study of a systematic futures calendar-spread research pipeline, focused on temporal integrity, contract-state quality, cost-aware validation, and robust research engineering.
status: Internship Research
date: 2026-07-31
period: May–Jul 2026
tags: [Futures, Calendar Spread, Systematic Trading, Walk-Forward]
featured: true
metrics:
  Evaluation: 2023–2026 rolling test window
  Costs: 2 bp per leg per side
  Sharpe: "2.40"
  Max Drawdown: "5.28%"
---
```

Do not add `repoUrl` or `docsUrl`.

- [ ] **Step 2: Write the recruiter-facing sanitized narrative**

Use these H2 sections so they populate the standard project outline:

```md
## Research mandate
## Why this is not a simple two-price spread
## Research architecture
## Contract-state and tradability layer
## Signal architecture — sanitized public view
## Temporal integrity and execution
## Risk and transaction-cost layer
## Walk-Forward validation
## Public result summary
## Failure modes and research lessons
## What is intentionally omitted
## Contribution and engineering value
```

The architecture section may contain only this conceptual chain:

```text
Daily futures data → Contract-state layer → Calendar-spread research object → Market-state features → Candidate signal layer → Tradability & risk controls → Next-session execution model → Cost-aware P&L → Walk-Forward diagnostics
```

- [ ] **Step 3: Add explicit confidentiality copy**

Include a visible paragraph beginning with:

```text
Confidentiality note — This public version is intentionally sanitized.
```

It must state that formulas, feature-engineering details, parameterization, thresholds, instrument-specific rules, and execution/sizing logic are omitted.

- [ ] **Step 4: Frame results correctly**

State that the recorded figures are historical backtest results under the listed assumptions and do not imply future performance. Do not add any extra performance statistics.

- [ ] **Step 5: Run leakage review against the banned patterns**

Expected: content contains the approved facts and confidentiality notice, and none of the banned reconstruction patterns.

- [ ] **Step 6: Commit**

Commit message:

```text
feat: add sanitized futures internship case study
```

### Task 4: Surface the internship in the portfolio and Chinese card layer

**Files:**
- Modify: `src/pages/research-projects/index.astro`
- Modify: `src/data/i18n/publicContentZh.ts`
- Test: `tests/internship-case-study.test.mjs`

**Interfaces:**
- Consumes: project id `systematic-futures-calendar-spread-internship`.
- Produces: strategy-research grouping and Chinese card presentation.

- [ ] **Step 1: Classify the internship as strategy research**

Change the strategy id set to include both existing CTA and internship ids:

```ts
const strategyIds = new Set([
  'cta-research-framework',
  'systematic-futures-calendar-spread-internship',
]);
```

Do not move or rename any existing detail route.

- [ ] **Step 2: Add Chinese presentation override**

Inside `publicContentZh.projects`, add:

```ts
'systematic-futures-calendar-spread-internship': {
  title: '系统化期货跨期价差研究 — 实习案例',
  description: '经脱敏处理的系统化期货跨期价差研究案例，重点展示时间一致性、合约状态质量、成本约束下的稳健验证与研究工程方法。',
  status: '实习研究',
},
```

- [ ] **Step 3: Verify portfolio/i18n assertions**

Expected: strategy-group and Chinese-override assertions pass.

- [ ] **Step 4: Commit**

Commit message:

```text
feat: surface internship case study in portfolio
```

### Task 5: Link the concise CV entry to the sanitized case study

**Files:**
- Modify: `src/pages/cv.astro`
- Test: `tests/internship-case-study.test.mjs`

**Interfaces:**
- Consumes: `${b}projects/systematic-futures-calendar-spread-internship/`.
- Produces: bilingual public-case-study link in the existing Internship Experience entry.

- [ ] **Step 1: Add the bilingual link after the existing internship summary**

Insert:

```astro
<p class="cv-case-study-link">
  <a href={`${b}projects/systematic-futures-calendar-spread-internship/`}>
    <span class="lang-en">View sanitized public case study →</span>
    <span class="lang-zh" lang="zh-CN">查看脱敏后的公开案例 →</span>
  </a>
</p>
```

Keep the current CV summary concise; do not duplicate the full case-study narrative.

- [ ] **Step 2: Add only minimal style if needed**

Use existing typography/link variables. Do not redesign the CV page.

- [ ] **Step 3: Verify CV-link assertions**

Expected: bilingual link test passes.

- [ ] **Step 4: Commit**

Commit message:

```text
feat: link CV internship to public case study
```

### Task 6: Full verification, diff review, and PR integration

**Files:**
- No additional production files unless verification finds a defect.

**Interfaces:**
- Produces: reviewable PR against `main` with CI evidence.

- [ ] **Step 1: Open a draft PR against `main`**

PR summary must explicitly state that the case study is sanitized and that Knowledge files are out of scope.

- [ ] **Step 2: Run the repository PR validation workflow**

Required commands in CI:

```text
npm test
npm run check
npm run build
```

Expected:
- all Node tests pass;
- Astro check reports 0 errors;
- static build succeeds and generates `/projects/systematic-futures-calendar-spread-internship/`.

- [ ] **Step 3: Review the final diff scope**

Allowed production changes:

```text
src/content/projects/systematic-futures-calendar-spread-internship.md
src/content.config.ts
src/pages/projects/[...slug].astro
src/layouts/ProjectCaseStudyLayout.astro
src/pages/research-projects/index.astro
src/data/i18n/publicContentZh.ts
src/pages/cv.astro
```

Plus tests/docs. Confirm no `src/content/knowledge/**` or `src/pages/knowledge/**` changes.

- [ ] **Step 4: Re-read the public Markdown for confidentiality leakage**

Confirm it contains no formula, threshold, parameter, weighting, model-architecture, instrument-specific, private-code, or reconstructive pseudo-code disclosure beyond the approved high-level categories.

- [ ] **Step 5: Merge only after green CI and clean scope review**

Use the verified PR head SHA as the expected merge head so a concurrent branch change cannot be merged accidentally.
