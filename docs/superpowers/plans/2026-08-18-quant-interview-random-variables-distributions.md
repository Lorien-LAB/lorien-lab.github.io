# Quant Interview Random Variables & Distributions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the bounded `Probability & Statistics -> Random Variables & Distributions` cross-book workstream by fusing all three verified interview sources into five canonical Knowledge nodes, six source-neutral canonical Problems, and fourteen terminal hidden coverage rows.

**Architecture:** Preserve the existing Topic-first public model. Public Knowledge is authored before Problems; source provenance, page evidence, item identifiers, and semantic ownership remain internal in workstream/coverage JSON. This workstream owns distribution representation, common distributions, transformations/convolution, Gaussian/lognormal structure, and LLN/CLT, while expectation-heavy moments, order statistics, and stochastic-process material remain outside the bounded topic.

**Tech Stack:** Astro content collections, Markdown/YAML frontmatter, JSON source/workstream/coverage data, JavaScript ES modules, Node.js built-in test runner, GitHub Actions, npm.

**Spec:** `docs/superpowers/specs/2026-08-18-quant-interview-random-variables-distributions-design.md`

## Global Constraints

- Base branch: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`.
- Work branch: `chatgpt/quant-interview-workstream-random-variables-distributions-2026-08-18`.
- Workstream id: `probability-statistics-random-variables-distributions-008`.
- Canonical topics: `probability-statistics`, `random-variables-distributions`.
- Create exactly five public Knowledge nodes: `random-variables-cdf-pmf-pdf`, `common-probability-distributions`, `random-variable-transformations-convolution`, `gaussian-lognormal-structure`, `limit-theorems-lln-clt`.
- Create exactly six canonical Problems if semantic review remains unchanged: `exponential-race-probability`, `exponential-memoryless-bus-wait`, `density-under-random-variable-transform`, `sum-of-two-uniforms-triangular-density`, `joint-normal-quadrant-conditioning`, `when-is-a-product-lognormal`.
- Green reviewed scope: section `4.4`, verified PDF pages `102-108`.
- Red reviewed scope: `3.2.1`, question pages `95-96`, solution pages `120-128`.
- 150 reviewed scope: `2.6`, verified solution pages `134-145`; stochastic material after item 9 is boundary-reviewed but excluded.
- Claimed terminal rows: exactly `14 = 2 Green + 5 Red + 7 150`.
- Green bus/Poisson wrapper is owned only for exponential memorylessness/residual waiting time; do not broaden into general Poisson-process theory.
- Green normal moments and Red expectation-heavy Gaussian calculations remain for `expectation-variance-covariance`.
- Red `3.29` and `3.32` remain for `order-statistics-extremes`.
- Meeting-time and broken-stick geometric-probability material remain outside this workstream even though they appear in Green section 4.4.
- LLN and CLT are included in this workstream’s Knowledge layer; do not create standalone LLN/CLT Problems merely to increase counts.
- MGF/characteristic-function material may support distribution characterization, but direct moment calculation is not this workstream’s responsibility.
- Public content must expose no book names, source item numbers, PDF page numbers, source-shaped ids, coverage notes, or provenance.
- Semantic deduplication is by mathematical reasoning identity, not wording similarity or shared formulas.
- Every claimed source row must be terminal with a nonempty `resolutionNote` and real canonical targets.
- `knowledge-only` is terminal only when the corresponding source-derived interview test remains visible under public `## Interview Checks`.
- Every new Problem is S3+: Problem, two progressive hints, full solution, why it matters, common mistakes, and extensions/variants.
- Final gates: `npm run test`, `npm run check`, `npm run build`, followed by topic-only diff review and removal of temporary branch-only CI/mutator tooling.
- Planning corpus delta `36 -> 42 Problems` and `28 -> 33 Knowledge` is an expectation, not a quota.

## Planned Public Outputs

### Knowledge

1. `src/content/knowledge/concepts/random-variables-cdf-pmf-pdf.md`
2. `src/content/knowledge/concepts/common-probability-distributions.md`
3. `src/content/knowledge/concepts/random-variable-transformations-convolution.md`
4. `src/content/knowledge/concepts/gaussian-lognormal-structure.md`
5. `src/content/knowledge/concepts/limit-theorems-lln-clt.md`

All five use:

```yaml
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-18
quantInterviewTopics: [probability-statistics, random-variables-distributions]
featured: false
```

### Problems

1. `exponential-race-probability` — `random-variables-distributions-001`
2. `exponential-memoryless-bus-wait` — `random-variables-distributions-002`
3. `density-under-random-variable-transform` — `random-variables-distributions-003`
4. `sum-of-two-uniforms-triangular-density` — `random-variables-distributions-004`
5. `joint-normal-quadrant-conditioning` — `random-variables-distributions-005`
6. `when-is-a-product-lognormal` — `random-variables-distributions-006`

All six use:

```yaml
date: 2026-08-18
domain: Mathematics & Statistics
category: Probability
quantInterviewTopics: [probability-statistics, random-variables-distributions]
status: solved
featured: false
```

Canonical Knowledge links:

```yaml
exponential-race-probability: [common-probability-distributions]
exponential-memoryless-bus-wait: [common-probability-distributions]
density-under-random-variable-transform: [random-variables-cdf-pmf-pdf, random-variable-transformations-convolution]
sum-of-two-uniforms-triangular-density: [common-probability-distributions, random-variable-transformations-convolution]
joint-normal-quadrant-conditioning: [gaussian-lognormal-structure, conditioning]
when-is-a-product-lognormal: [gaussian-lognormal-structure]
```

## Hidden Source Inventory

### Green

- `4.4::definitions-discrete-continuous-distributions` -> `knowledge-only` -> `random-variables-cdf-pmf-pdf`, `common-probability-distributions`.
- `4.4::poisson-process-property` -> `canonical-problem` -> `exponential-memoryless-bus-wait`; Knowledge `common-probability-distributions`; resolution note must limit ownership to exponential waiting time/memorylessness and explicitly reject general Poisson-process absorption.

### Red

- `3.2.1::3.28` -> `knowledge-only` -> `random-variables-cdf-pmf-pdf`, `common-probability-distributions`.
- `3.2.1::3.30` -> `knowledge-only` -> `common-probability-distributions`.
- `3.2.1::3.31` -> `canonical-problem` -> `density-under-random-variable-transform`; Knowledge `random-variables-cdf-pmf-pdf`, `random-variable-transformations-convolution`.
- `3.2.1::3.33` -> `canonical-problem` -> `sum-of-two-uniforms-triangular-density`; Knowledge `common-probability-distributions`, `random-variable-transformations-convolution`.
- `3.2.1::3.34` -> `knowledge-only` -> `limit-theorems-lln-clt`.

### 150 Questions

- `2.6::1` -> `knowledge-only` -> `common-probability-distributions`.
- `2.6::2` -> `canonical-problem` -> `exponential-race-probability`; Knowledge `common-probability-distributions`.
- `2.6::3` -> `knowledge-only` -> `common-probability-distributions`.
- `2.6::5` -> `canonical-problem` -> `joint-normal-quadrant-conditioning`; Knowledge `gaussian-lognormal-structure`, `conditioning`.
- `2.6::6` -> `canonical-problem` -> `when-is-a-product-lognormal`; Knowledge `gaussian-lognormal-structure`.
- `2.6::8` -> `knowledge-only` -> `limit-theorems-lln-clt`.
- `2.6::9` -> `knowledge-only` -> `limit-theorems-lln-clt`.

## Mathematical Contracts

### Exponential race

For independent exponentials with rates `lambda_X` and `lambda_Y`:

```text
P(Y > X) = lambda_X / (lambda_X + lambda_Y).
```

For means 6 and 8, `lambda_X=1/6`, `lambda_Y=1/8`, so the answer is `4/7`.

### Exponential memorylessness

For `T ~ Exp(lambda)`:

```text
P(T > s+t | T > s) = P(T > t) = exp(-lambda t).
```

With mean `10`, the expected additional waiting time after any elapsed waiting is still `10` minutes. The source’s Poisson-process wrapper is context only.

### Random-variable transformation

For a differentiable monotone transform `Y=g(X)`:

```text
F_Y(y) = P(g(X) <= y)
f_Y(y) = f_X(g^{-1}(y)) * |d g^{-1}(y)/dy|
```

For a many-to-one transform, sum contributions over all valid inverse branches.

### Sum of two uniforms

For independent `X,Y ~ U(0,1)`:

```text
f_{X+Y}(z) = 0         z <= 0
             z         0 < z < 1
             2-z       1 <= z < 2
             0         z >= 2
```

### Joint-normal conditioning

Given jointly normal standard `X,Y` with `Cov(X,Y)=1/sqrt(2)`:

```text
W = sqrt(2)X - Y
Var(W)=1
Cov(W,Y)=0
P(X>0 | Y<0)=1/4
```

Independence of `W` and `Y` follows from joint normality plus zero covariance, not from zero covariance alone.

### Product of lognormals

If `log X` and `log Y` are jointly normal, then:

```text
log(XY) = log X + log Y
```

is normal, so `XY` is lognormal. Independent lognormals are a sufficient special case; marginal lognormality alone is insufficient.

---

### Task 1: Register Workstream 008 and Establish Branch CI

**Files:**
- Create: `.github/workflows/quant-interview-random-variables-distributions-ci.yml`
- Create: `tests/quant-interview-random-variables-distributions-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json`

**Interfaces:**
- Consumes: existing taxonomy, source-topic map, verified source manifests, and `validateTopicWorkstream`.
- Produces: active workstream registration consumed by coverage/completion tasks.

- [ ] **Step 1: Add temporary branch-only CI and verify inherited baseline**

Create:

```yaml
name: Quant Interview Random Variables Distributions CI
on:
  push:
    branches:
      - chatgpt/quant-interview-workstream-random-variables-distributions-2026-08-18
  workflow_dispatch:
permissions:
  contents: read
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v5
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run test
      - run: npm run check
      - run: npm run build
```

Push only this workflow first. Expected baseline: all inherited `test/check/build` gates succeed before any new RED contract is introduced.

- [ ] **Step 2: Write the failing registration test**

Create `tests/quant-interview-random-variables-distributions-workstream.test.mjs` beginning with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json';

test('eighth cross-book workstream is bounded to random variables and distributions', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'probability-statistics-random-variables-distributions-008');
  assert.deepEqual(workstream.canonicalTopics, ['probability-statistics', 'random-variables-distributions']);
  assert.ok(['active', 'complete'].includes(workstream.status));
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
});
```

Add exact boundary assertions:

```js
assert.deepEqual(green.sourceSections, ['4.4']);
assert.deepEqual(green.evidencePageRanges, [{ startPage: 102, endPage: 108 }]);

assert.deepEqual(red.sourceSections, ['3.2.1']);
assert.deepEqual(red.evidencePageRanges, [
  { startPage: 95, endPage: 96 },
  { startPage: 120, endPage: 128 },
]);

assert.deepEqual(q150.sourceSections, ['2.6']);
assert.deepEqual(q150.evidencePageRanges, [{ startPage: 134, endPage: 145 }]);
```

- [ ] **Step 3: Run the registration RED**

Run:

```bash
npm run test
```

Expected: new workstream tests fail because `probability-statistics-random-variables-distributions-008.json` does not exist; inherited tests remain green.

- [ ] **Step 4: Implement the minimal active workstream JSON**

Create the JSON with:

```json
{
  "id": "probability-statistics-random-variables-distributions-008",
  "canonicalTopics": ["probability-statistics", "random-variables-distributions"],
  "status": "active",
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": ["4.4"],
      "evidencePageRanges": [{"startPage": 102, "endPage": 108}],
      "reviewOutcome": "bounded-item-level-review"
    },
    {
      "source": "red-book",
      "sourceSections": ["3.2.1"],
      "evidencePageRanges": [{"startPage": 95, "endPage": 96}, {"startPage": 120, "endPage": 128}],
      "reviewOutcome": "bounded-item-level-review"
    },
    {
      "source": "150-most-frequently-asked",
      "sourceSections": ["2.6"],
      "evidencePageRanges": [{"startPage": 134, "endPage": 145}],
      "reviewOutcome": "bounded-item-level-review"
    }
  ]
}
```

Each source scope must also contain a nonempty `reviewNote` explicitly naming claimed items and excluded neighboring identities from the spec.

- [ ] **Step 5: Add validator coverage and run GREEN**

Add:

```js
const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
assert.doesNotThrow(() => validateTopicWorkstream(workstream, context));
```

Run:

```bash
npm run test && npm run check && npm run build
```

Expected: all commands succeed.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/quant-interview-random-variables-distributions-ci.yml tests/quant-interview-random-variables-distributions-workstream.test.mjs src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json
git commit -m "feat: register random variables distributions workstream"
```

---

### Task 2: Build Foundational Distribution Knowledge

**Files:**
- Create: `tests/quant-interview-random-variables-distributions-content.test.mjs`
- Create: `src/content/knowledge/concepts/random-variables-cdf-pmf-pdf.md`
- Create: `src/content/knowledge/concepts/common-probability-distributions.md`
- Create: `src/content/knowledge/concepts/random-variable-transformations-convolution.md`

**Interfaces:**
- Consumes: canonical topic ids and Knowledge frontmatter schema.
- Produces: three Knowledge slugs used by Problems and hidden coverage.

- [ ] **Step 1: Write failing Knowledge contracts**

Create tests with the helper:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (file) => readFile(file, 'utf8');
const topicLine = /^quantInterviewTopics:\s*\[probability-statistics, random-variables-distributions\]$/m;
```

CDF/PMF/PDF contract:

```js
test('random variable representation Knowledge separates CDF PMF PDF and support', async () => {
  const text = await read('src/content/knowledge/concepts/random-variables-cdf-pmf-pdf.md');
  assert.match(text, topicLine);
  assert.match(text, /F_X|CDF|cumulative distribution/i);
  assert.match(text, /PMF|probability mass/i);
  assert.match(text, /PDF|probability density/i);
  assert.match(text, /support/i);
  assert.match(text, /P\(X\s*=\s*x\).*0|point probability/i);
  assert.match(text, /^## Interview Checks$/m);
  assert.match(text, /U\(a,b\)|uniform/i);
});
```

Common-distributions contract:

```js
test('common distributions Knowledge is recognition-first and includes heavy-tail boundaries', async () => {
  const text = await read('src/content/knowledge/concepts/common-probability-distributions.md');
  assert.match(text, topicLine);
  for (const family of ['binomial', 'poisson', 'geometric', 'negative binomial', 'normal', 'exponential', 'gamma', 'beta', 'cauchy']) {
    assert.match(text, new RegExp(family, 'i'));
  }
  assert.match(text, /memoryless/i);
  assert.match(text, /principal value|moment.*exist|expectation.*exist/i);
  assert.match(text, /^## Interview Checks$/m);
});
```

Transform/convolution contract:

```js
test('transformation Knowledge derives pushforwards and support-aware convolution', async () => {
  const text = await read('src/content/knowledge/concepts/random-variable-transformations-convolution.md');
  assert.match(text, topicLine);
  assert.match(text, /F_Y|CDF-first|distribution function/i);
  assert.match(text, /Jacobian|inverse/i);
  assert.match(text, /many-to-one|multiple.*branch/i);
  assert.match(text, /convolution/i);
  assert.match(text, /support.*bound|integration.*bound/i);
  assert.match(text, /^## Interview Checks$/m);
});
```

- [ ] **Step 2: Run Knowledge RED**

```bash
npm run test
```

Expected: exactly these new Knowledge contracts fail because the three files are missing.

- [ ] **Step 3: Implement the three Knowledge nodes**

Each file must use this frontmatter shape:

```yaml
---
title: <canonical public title>
description: <source-neutral one-sentence description>
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-18
tags: [Probability, Random Variables, Distributions]
quantInterviewTopics: [probability-statistics, random-variables-distributions]
featured: false
related: []
relatedNotes: []
---
```

Use the exact responsibilities and Interview Checks from the Spec. `random-variable-transformations-convolution` must teach the CDF-first method before the Jacobian formula and must explicitly derive convolution bounds from support.

- [ ] **Step 4: Run GREEN and commit**

```bash
npm run test && npm run check && npm run build
git add tests/quant-interview-random-variables-distributions-content.test.mjs src/content/knowledge/concepts/random-variables-cdf-pmf-pdf.md src/content/knowledge/concepts/common-probability-distributions.md src/content/knowledge/concepts/random-variable-transformations-convolution.md
git commit -m "feat: build foundational distribution knowledge"
```

---

### Task 3: Build Gaussian and Limit-Theorem Knowledge

**Files:**
- Modify: `tests/quant-interview-random-variables-distributions-content.test.mjs`
- Create: `src/content/knowledge/concepts/gaussian-lognormal-structure.md`
- Create: `src/content/knowledge/concepts/limit-theorems-lln-clt.md`

**Interfaces:**
- Consumes: Knowledge schema and topic contract from Task 2.
- Produces: Gaussian/lognormal and LLN/CLT Knowledge targets used by Problems and coverage.

- [ ] **Step 1: Add RED contracts**

Gaussian/lognormal:

```js
test('Gaussian Knowledge separates marginal normality joint normality and lognormal closure', async () => {
  const text = await read('src/content/knowledge/concepts/gaussian-lognormal-structure.md');
  assert.match(text, topicLine);
  assert.match(text, /jointly normal|joint normal/i);
  assert.match(text, /zero covariance|uncorrelated/i);
  assert.match(text, /independent/i);
  assert.match(text, /marginal.*normal.*not|does not imply.*joint/i);
  assert.match(text, /lognormal/i);
  assert.match(text, /log X.*log Y|log\(XY\)/i);
  assert.match(text, /^## Interview Checks$/m);
});
```

LLN/CLT:

```js
test('limit theorem Knowledge distinguishes LLN CLT and convergence modes', async () => {
  const text = await read('src/content/knowledge/concepts/limit-theorems-lln-clt.md');
  assert.match(text, topicLine);
  assert.match(text, /weak law/i);
  assert.match(text, /strong law/i);
  assert.match(text, /almost surely|almost sure/i);
  assert.match(text, /convergence in probability/i);
  assert.match(text, /convergence in distribution/i);
  assert.match(text, /central limit theorem|CLT/i);
  assert.match(text, /sqrt\(?n\)?|√n/i);
  assert.match(text, /finite variance/i);
  assert.match(text, /^## Interview Checks$/m);
});
```

- [ ] **Step 2: Run RED**

```bash
npm run test
```

Expected: only the two newly introduced Knowledge files are missing/failing.

- [ ] **Step 3: Implement both Knowledge nodes**

Use the same frontmatter contract as Task 2. `gaussian-lognormal-structure` must state that zero covariance implies independence only inside the jointly normal class. `limit-theorems-lln-clt` must state LLN versus CLT roles, `sqrt(n)` scaling, and the classical iid finite-variance assumptions without turning the page into a proof chapter.

- [ ] **Step 4: Run GREEN and commit**

```bash
npm run test && npm run check && npm run build
git add tests/quant-interview-random-variables-distributions-content.test.mjs src/content/knowledge/concepts/gaussian-lognormal-structure.md src/content/knowledge/concepts/limit-theorems-lln-clt.md
git commit -m "feat: add Gaussian and limit theorem knowledge"
```

---

### Task 4: Add Exponential and Transformation Problems

**Files:**
- Modify: `tests/quant-interview-random-variables-distributions-content.test.mjs`
- Create: `src/content/problems/probability/exponential-race-probability.md`
- Create: `src/content/problems/probability/exponential-memoryless-bus-wait.md`
- Create: `src/content/problems/probability/density-under-random-variable-transform.md`

**Interfaces:**
- Consumes: `common-probability-distributions`, `random-variables-cdf-pmf-pdf`, `random-variable-transformations-convolution`.
- Produces: canonical Problem slugs `001-003` used by coverage.

- [ ] **Step 1: Add common S3+ RED helper**

```js
function assertS3(text, slug, id) {
  assert.match(text, new RegExp(`^problemId:\\s*${id}$`, 'm'));
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, random-variables-distributions\]$/m);
  for (const heading of ['## Problem', '## Think Before Revealing', '## Solution', '## Why This Matters', '## Common Mistakes', '## Extensions']) {
    assert.match(text, new RegExp(`^${heading.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}`, 'm'), `${slug} missing ${heading}`);
  }
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most|Question\s+3\.|source page|PDF page/i);
}
```

- [ ] **Step 2: Add problem-specific RED tests**

Exponential race:

```js
const race = await read('src/content/problems/probability/exponential-race-probability.md');
assertS3(race, 'exponential-race-probability', 'random-variables-distributions-001');
assert.match(race, /4\/7/);
assert.match(race, /lambda_X|λ_X|rate/i);
assert.match(race, /lambda_X.*lambda_Y|λ_X.*λ_Y/i);
```

Bus memorylessness:

```js
const bus = await read('src/content/problems/probability/exponential-memoryless-bus-wait.md');
assertS3(bus, 'exponential-memoryless-bus-wait', 'random-variables-distributions-002');
assert.match(bus, /memoryless/i);
assert.match(bus, /10\s*minutes/i);
assert.match(bus, /residual|additional waiting/i);
assert.doesNotMatch(bus, /## .*Poisson Process|general Poisson process/i);
```

Transformation:

```js
const transform = await read('src/content/problems/probability/density-under-random-variable-transform.md');
assertS3(transform, 'density-under-random-variable-transform', 'random-variables-distributions-003');
assert.match(transform, /F_Y|CDF/i);
assert.match(transform, /g\^-1|inverse/i);
assert.match(transform, /absolute|Jacobian/i);
assert.match(transform, /many-to-one|multiple.*branch/i);
```

- [ ] **Step 3: Run RED**

```bash
npm run test
```

Expected: only the three new Problem contracts fail because files do not exist.

- [ ] **Step 4: Implement Problems 001-003**

Use frontmatter pattern:

```yaml
---
problemId: random-variables-distributions-00N
title: <source-neutral title>
description: <source-neutral description>
date: 2026-08-18
domain: Mathematics & Statistics
category: Probability
subcategories: [Random Variables, Distributions]
tags: [Probability, Random Variables, Distributions, Interview]
quantInterviewTopics: [probability-statistics, random-variables-distributions]
concepts: [<exact Knowledge slugs from Planned Public Outputs>]
techniques: []
prerequisites: []
relatedProblems: []
family: <source-neutral mathematical family>
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---
```

Every page must include two `<details>` hints and the six S3+ sections in the RED helper.

- [ ] **Step 5: Run GREEN and commit**

```bash
npm run test && npm run check && npm run build
git add tests/quant-interview-random-variables-distributions-content.test.mjs src/content/problems/probability/exponential-race-probability.md src/content/problems/probability/exponential-memoryless-bus-wait.md src/content/problems/probability/density-under-random-variable-transform.md
git commit -m "feat: add exponential and transformation problems"
```

---

### Task 5: Add Convolution, Joint-Normal, and Lognormal Problems

**Files:**
- Modify: `tests/quant-interview-random-variables-distributions-content.test.mjs`
- Create: `src/content/problems/probability/sum-of-two-uniforms-triangular-density.md`
- Create: `src/content/problems/probability/joint-normal-quadrant-conditioning.md`
- Create: `src/content/problems/probability/when-is-a-product-lognormal.md`

**Interfaces:**
- Consumes: `random-variable-transformations-convolution`, `common-probability-distributions`, `gaussian-lognormal-structure`, and existing `conditioning`.
- Produces: canonical Problem slugs `004-006` used by coverage.

- [ ] **Step 1: Add RED contracts**

Convolution:

```js
const sum = await read('src/content/problems/probability/sum-of-two-uniforms-triangular-density.md');
assertS3(sum, 'sum-of-two-uniforms-triangular-density', 'random-variables-distributions-004');
assert.match(sum, /convolution/i);
assert.match(sum, /0\s*<\s*z\s*<\s*1/);
assert.match(sum, /2\s*-\s*z/);
assert.match(sum, /support.*bound|integration.*bound/i);
```

Joint normal:

```js
const joint = await read('src/content/problems/probability/joint-normal-quadrant-conditioning.md');
assertS3(joint, 'joint-normal-quadrant-conditioning', 'random-variables-distributions-005');
assert.match(joint, /1\/4/);
assert.match(joint, /sqrt\(2\).*X.*Y|√2.*X.*Y/i);
assert.match(joint, /joint.*normal/i);
assert.match(joint, /uncorrelated.*independent|zero covariance.*independent/i);
assert.match(joint, /not.*general|outside.*normal/i);
```

Lognormal product:

```js
const lognormal = await read('src/content/problems/probability/when-is-a-product-lognormal.md');
assertS3(lognormal, 'when-is-a-product-lognormal', 'random-variables-distributions-006');
assert.match(lognormal, /log\(XY\)|log X.*log Y/i);
assert.match(lognormal, /jointly normal|joint normal/i);
assert.match(lognormal, /independent.*sufficient|independent lognormal/i);
assert.match(lognormal, /marginal.*not sufficient|marginal.*insufficient/i);
```

- [ ] **Step 2: Run RED**

```bash
npm run test
```

Expected: only Problems `004-006` are missing/failing.

- [ ] **Step 3: Implement Problems 004-006**

Use the same S3+ frontmatter/body contract as Task 4. The joint-normal page may link to existing `conditioning` as a concept, but its canonical topic remains only `random-variables-distributions`. The lognormal page must distinguish marginal assumptions from the joint law.

- [ ] **Step 4: Run GREEN and commit**

```bash
npm run test && npm run check && npm run build
git add tests/quant-interview-random-variables-distributions-content.test.mjs src/content/problems/probability/sum-of-two-uniforms-triangular-density.md src/content/problems/probability/joint-normal-quadrant-conditioning.md src/content/problems/probability/when-is-a-product-lognormal.md
git commit -m "feat: add convolution and Gaussian distribution problems"
```

---

### Task 6: Reconcile Fourteen Hidden Coverage Rows

**Files:**
- Modify: `tests/quant-interview-random-variables-distributions-workstream.test.mjs`
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/coverage/red-book.json`
- Modify: `src/data/quant-interview/coverage/150-most-frequently-asked.json`

**Interfaces:**
- Consumes: five real Knowledge slugs and six real Problem slugs.
- Produces: terminal auditable source coverage for completion gate.

- [ ] **Step 1: Add exact 14-row RED inventory**

```js
const expectedCoverageKeys = {
  'green-book': [
    '4.4::definitions-discrete-continuous-distributions',
    '4.4::poisson-process-property',
  ],
  'red-book': [
    '3.2.1::3.28',
    '3.2.1::3.30',
    '3.2.1::3.31',
    '3.2.1::3.33',
    '3.2.1::3.34',
  ],
  '150-most-frequently-asked': [
    '2.6::1', '2.6::2', '2.6::3', '2.6::5', '2.6::6', '2.6::8', '2.6::9',
  ],
};
assert.equal(Object.values(expectedCoverageKeys).flat().length, 14);
```

For every key require a row to exist, have canonical topic `random-variables-distributions`, terminal state in `canonical-problem | merged-duplicate | variant | knowledge-only`, nonempty `resolutionNote`, and at least one real canonical target.

- [ ] **Step 2: Add semantic-ownership assertions**

```js
assert.equal(green.get('4.4::poisson-process-property')?.state, 'canonical-problem');
assert.deepEqual(green.get('4.4::poisson-process-property')?.canonicalProblems, ['exponential-memoryless-bus-wait']);
assert.match(green.get('4.4::poisson-process-property')?.resolutionNote ?? '', /exponential|memoryless/i);
assert.match(green.get('4.4::poisson-process-property')?.resolutionNote ?? '', /not.*general Poisson|does not.*Poisson process|stochastic-process/i);

assert.equal(red.get('3.2.1::3.31')?.state, 'canonical-problem');
assert.deepEqual(red.get('3.2.1::3.31')?.canonicalProblems, ['density-under-random-variable-transform']);
assert.equal(red.get('3.2.1::3.33')?.state, 'canonical-problem');
assert.deepEqual(red.get('3.2.1::3.33')?.canonicalProblems, ['sum-of-two-uniforms-triangular-density']);
assert.equal(red.get('3.2.1::3.34')?.state, 'knowledge-only');

assert.equal(q150.get('2.6::2')?.state, 'canonical-problem');
assert.deepEqual(q150.get('2.6::2')?.canonicalProblems, ['exponential-race-probability']);
assert.equal(q150.get('2.6::5')?.state, 'canonical-problem');
assert.deepEqual(q150.get('2.6::5')?.canonicalProblems, ['joint-normal-quadrant-conditioning']);
assert.equal(q150.get('2.6::6')?.state, 'canonical-problem');
assert.deepEqual(q150.get('2.6::6')?.canonicalProblems, ['when-is-a-product-lognormal']);
```

Add boundary checks that `3.29`, `3.32`, `3.37`, `3.38` are not newly terminalized as `random-variables-distributions` by this workstream; if those rows already exist for another topic, require that their canonical topics do not claim this topic.

- [ ] **Step 3: Add knowledge-only public self-test assertions**

Require `## Interview Checks` and matching source-derived checks in:

```js
'random-variables-cdf-pmf-pdf'
'common-probability-distributions'
'limit-theorems-lln-clt'
```

Specifically assert Uniform CDF, Cauchy/moment-existence, Exponential, Poisson distribution, LLN, and CLT terms are present.

- [ ] **Step 4: Run coverage RED**

```bash
npm run test
```

Expected: new coverage tests fail because the fourteen rows do not yet exist; all public content tests remain green.

- [ ] **Step 5: Upsert the fourteen ledger rows only**

Use the exact source inventory above. Do not edit unrelated rows. If direct GitHub contents edits are impractical for large JSON ledgers, use the same temporary branch-only validated ledger-mutator pattern as workstreams 006/007: the mutator may only upsert the exact fourteen `(sourceSection, sourceItem)` keys, must run `npm run test`, `npm run check`, `npm run build` before committing, and must be deleted immediately after the committed ledgers receive a subsequent read-only GREEN CI run.

- [ ] **Step 6: Validate all ledgers and run GREEN**

In tests call:

```js
validateCoverageLedger(ledger, {
  sourceTopicMap,
  taxonomy,
  problemSlugs,
  knowledgeSlugs,
  allowUnresolvedCanonicalRefs: false,
});
```

Run:

```bash
npm run test && npm run check && npm run build
```

Expected: all commands succeed.

- [ ] **Step 7: Commit**

```bash
git add tests/quant-interview-random-variables-distributions-workstream.test.mjs src/data/quant-interview/coverage/green-book.json src/data/quant-interview/coverage/red-book.json src/data/quant-interview/coverage/150-most-frequently-asked.json
git commit -m "feat: reconcile random variables distributions coverage"
```

---

### Task 7: Extend the Global Source-Neutral Regression

**Files:**
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`

**Interfaces:**
- Consumes: all five Knowledge and six Problem slugs.
- Produces: corpus-wide public provenance/source-neutral regression.

- [ ] **Step 1: Extend exact public enumeration**

Append to `currentProblemSlugs`:

```js
'exponential-race-probability',
'exponential-memoryless-bus-wait',
'density-under-random-variable-transform',
'sum-of-two-uniforms-triangular-density',
'joint-normal-quadrant-conditioning',
'when-is-a-product-lognormal',
```

Append to `expectedKnowledgeTopics`:

```js
['random-variables-cdf-pmf-pdf', ['probability-statistics', 'random-variables-distributions']],
['common-probability-distributions', ['probability-statistics', 'random-variables-distributions']],
['random-variable-transformations-convolution', ['probability-statistics', 'random-variables-distributions']],
['gaussian-lognormal-structure', ['probability-statistics', 'random-variables-distributions']],
['limit-theorems-lln-clt', ['probability-statistics', 'random-variables-distributions']],
```

Update the exact count contract to:

```js
test('source-neutral regression enumerates the current 42 Problem and 33 Knowledge contracts', () => {
  assert.equal(currentProblemSlugs.length, 42);
  assert.equal(expectedKnowledgeTopics.size, 33);
});
```

- [ ] **Step 2: Extend hidden-audit regression for 150 distribution rows**

Add at least these canonical source mappings to the existing hidden-audit test:

```js
['2.6::2', 'exponential-race-probability'],
['2.6::5', 'joint-normal-quadrant-conditioning'],
['2.6::6', 'when-is-a-product-lognormal'],
```

Require their state to be `canonical-problem` and their canonical Problem arrays to match exactly.

- [ ] **Step 3: Run full regression and commit**

```bash
npm run test && npm run check && npm run build
git add tests/quant-interview-source-neutral-content.test.mjs
git commit -m "test: extend source-neutral regression for distributions"
```

Record this successful commit SHA and Actions run ID as the workstream’s **content-complete verification evidence**. Do not invent or pre-fill these values.

---

### Task 8: Seal Workstream 008, Update Durable Handoff, and Clean Temporary Tooling

**Files:**
- Create: `tests/quant-interview-random-variables-distributions-completion.test.mjs`
- Modify: `src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Delete before final branch state: `.github/workflows/quant-interview-random-variables-distributions-ci.yml`
- Delete any temporary ledger mutator script/workflow created in Task 6.

**Interfaces:**
- Consumes: real successful content-complete commit/run evidence from Task 7.
- Produces: sealed `status: complete` workstream and durable next-topic handoff.

- [ ] **Step 1: Write completion RED**

Create:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('random variables distributions workstream closes only with real verification evidence', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  assert.match(workstream.verification?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.ok(Number.isInteger(workstream.verification?.runId));
  assert.deepEqual(workstream.verification?.commands, ['npm run test', 'npm run check', 'npm run build']);
  assert.equal(workstream.verification?.conclusion, 'success');
});
```

Handoff contract:

```js
test('handoff records workstream 008 and advances to expectation variance covariance', async () => {
  const workstream = await readJson(workstreamPath);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  assert.match(handoff, /probability-statistics-random-variables-distributions-008/);
  assert.match(handoff, new RegExp(workstream.verification.commit));
  assert.match(handoff, new RegExp(String(workstream.verification.runId)));
  assert.match(handoff, /14[^\n]*(?:claimed|terminal|source|coverage)/i);
  assert.match(handoff, /42 canonical Problems/i);
  assert.match(handoff, /33 explicitly topic-classified|33 topic-classified/i);
  const nextAction = handoff.split(/## Next action/i)[1] ?? '';
  assert.match(nextAction, /Probability & Statistics/i);
  assert.match(nextAction, /Expectation, Variance & Covariance/i);
  assert.doesNotMatch(nextAction, /Random Variables & Distributions[\s\S]{0,180}(?:execute|next|continue)/i);
});
```

- [ ] **Step 2: Run completion RED**

```bash
npm run test
```

Expected: completion tests fail because status is still `active` and HANDOFF still points to Random Variables & Distributions.

- [ ] **Step 3: Seal using real evidence only**

Update workstream JSON:

```json
"status": "complete",
"verification": {
  "commit": "<copy the exact successful Task 7 content commit SHA>",
  "runId": 0,
  "commands": ["npm run test", "npm run check", "npm run build"],
  "conclusion": "success"
}
```

Before committing, replace the illustrative `runId: 0` with the exact integer GitHub Actions run ID for that successful Task 7 commit. The final repository must contain neither `0` nor any placeholder text.

Update `docs/quant-interview/HANDOFF.md` to record:

```text
Completed cross-book workstream 8
probability-statistics-random-variables-distributions-008
5 canonical Knowledge nodes
6 canonical Problems
14 terminal claimed source rows
42 canonical Problems / 33 topic-classified Knowledge corpus checkpoint
next bounded topic: Probability & Statistics -> Expectation, Variance & Covariance
```

Also preserve prior workstream verification history; do not replace HANDOFF with only the newest workstream.

- [ ] **Step 4: Run closure verification**

```bash
npm run test && npm run check && npm run build
```

Expected: all commands succeed, including historical handoff regressions.

- [ ] **Step 5: Review topic-only diff**

Compare against `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`. Allowed final product changes are limited to:

```text
docs/quant-interview/HANDOFF.md
docs/superpowers/specs/2026-08-18-quant-interview-random-variables-distributions-design.md
docs/superpowers/plans/2026-08-18-quant-interview-random-variables-distributions.md
src/content/knowledge/concepts/<five approved Knowledge files>
src/content/problems/probability/<six approved Problem files>
src/data/quant-interview/coverage/<three ledgers>
src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json
tests/quant-interview-random-variables-distributions-*.test.mjs
tests/quant-interview-source-neutral-content.test.mjs
```

No Home, Projects, UI, deployment, or unrelated Knowledge-topic changes are allowed.

- [ ] **Step 6: Remove temporary CI/mutator tooling and prove cleanup-only delta**

Delete branch-only CI and any Task 6 mutator. Compare the last fully green product commit to final branch head; the only post-verification file deltas may be removal of those temporary tooling files.

- [ ] **Step 7: Commit final closure**

```bash
git add src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json docs/quant-interview/HANDOFF.md tests/quant-interview-random-variables-distributions-completion.test.mjs
git commit -m "docs: complete random variables distributions workstream"
```

If temporary cleanup creates an additional commit, use:

```bash
git commit -m "chore: remove random variables distributions workstream tooling"
```

## Completion Checklist

Before presenting branch-integration options, verify all of the following from repository state rather than conversational memory:

```text
[ ] workstream 008 status is complete
[ ] verification commit is a real 40-character SHA
[ ] verification runId is a real successful Actions run integer
[ ] five fixed Knowledge slugs exist and are source-neutral
[ ] six fixed Problem slugs exist, solved, S3+, and source-neutral
[ ] exactly fourteen claimed rows are terminal with resolution notes and real targets
[ ] all knowledge-only rows are publicly testable through Interview Checks
[ ] Green bus row explicitly limits ownership to exponential memorylessness
[ ] Red 3.29 / 3.32 remain outside this topic
[ ] expectation-heavy normal moments remain outside this topic
[ ] LLN and CLT are fused into one public Knowledge node
[ ] global source-neutral regression records 42 Problems / 33 Knowledge if the approved structure remained unchanged
[ ] npm run test succeeds
[ ] npm run check succeeds
[ ] npm run build succeeds
[ ] final topic-only diff contains no unrelated files
[ ] temporary CI/mutator tooling is absent from final product tree
[ ] HANDOFF next bounded topic is Expectation, Variance & Covariance
```
