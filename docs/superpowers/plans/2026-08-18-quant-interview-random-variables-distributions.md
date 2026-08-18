# Quant Interview Random Variables & Distributions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the bounded `Probability & Statistics -> Random Variables & Distributions` cross-book workstream with five canonical Knowledge nodes, six source-neutral S3+ Problems, and fourteen terminal hidden coverage rows.

**Architecture:** Keep the public system Topic-first and source-neutral. Author reusable Knowledge before Problems; keep source evidence and semantic ownership inside workstream/coverage JSON; fuse duplicate knowledge across all three sources while preserving distinct reasoning families. Expectation-heavy moments, order statistics, and stochastic-process material stay outside this bounded workstream.

**Tech Stack:** Astro content collections, Markdown/YAML frontmatter, JSON workstream/coverage data, JavaScript ES modules, Node.js built-in test runner, GitHub Actions, npm.

**Spec:** `docs/superpowers/specs/2026-08-18-quant-interview-random-variables-distributions-design.md`

## Global Constraints

- Base branch: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`.
- Work branch: `chatgpt/quant-interview-workstream-random-variables-distributions-2026-08-18`.
- Workstream id: `probability-statistics-random-variables-distributions-008`.
- Canonical topics: `probability-statistics`, `random-variables-distributions`.
- Create exactly these five Knowledge slugs: `random-variables-cdf-pmf-pdf`, `common-probability-distributions`, `random-variable-transformations-convolution`, `gaussian-lognormal-structure`, `limit-theorems-lln-clt`.
- Create exactly these six Problem slugs: `exponential-race-probability`, `exponential-memoryless-bus-wait`, `density-under-random-variable-transform`, `sum-of-two-uniforms-triangular-density`, `joint-normal-quadrant-conditioning`, `when-is-a-product-lognormal`.
- Green reviewed scope: section `4.4`, verified PDF pages `102-108`.
- Red reviewed scope: `3.2.1`, question pages `95-96`, solution pages `120-128`.
- 150 reviewed scope: `2.6`, verified solution pages `134-145`.
- Claimed terminal rows: exactly `14 = 2 Green + 5 Red + 7 150`.
- Green bus/Poisson wrapper is owned only for exponential waiting time, memorylessness, and residual waiting-time intuition; do not absorb general Poisson-process theory.
- Green normal moments and Red expectation-heavy Gaussian calculations remain for `expectation-variance-covariance`.
- Red `3.29` and `3.32` remain for `order-statistics-extremes`.
- Green meeting-time and broken-stick triangle material remain geometric probability and are not reclassified here.
- LLN and CLT live in this workstream’s Knowledge layer; do not create standalone LLN/CLT Problems.
- MGF/characteristic-function material may support distribution characterization, but direct moment calculation is not this workstream’s primary responsibility.
- Public content must contain no book names, source item numbers, PDF pages, source-shaped ids, provenance notes, or hidden coverage fields.
- Semantic deduplication is by mathematical reasoning identity, not wording similarity.
- Every claimed source row must be terminal with a nonempty `resolutionNote` and real canonical targets.
- `knowledge-only` is terminal only when the corresponding source-derived interview test remains visible under public `## Interview Checks`.
- Every new Problem is S3+: `## Problem`, two progressive hints, `## Solution`, `## Why This Matters`, `## Common Mistakes`, `## Extensions`.
- Final gates: `npm run test`, `npm run check`, `npm run build`, followed by topic-only diff review and deletion of temporary CI/mutator tooling.
- Planning corpus delta `36 -> 42 Problems` and `28 -> 33 Knowledge` is an expectation, not a quota.

## Exact Public Metadata

Use these Knowledge metadata values:

```js
const knowledgeMeta = {
  'random-variables-cdf-pmf-pdf': {
    title: 'Random Variables, CDF, PMF, and PDF',
    description: 'Represent discrete and continuous random variables through support, cumulative distribution functions, probability mass functions, and probability density functions.'
  },
  'common-probability-distributions': {
    title: 'Common Probability Distributions',
    description: 'Recognize standard discrete and continuous distributions from their generating mechanisms, supports, and defining probability functions.'
  },
  'random-variable-transformations-convolution': {
    title: 'Random Variable Transformations and Convolution',
    description: 'Derive distributions of transformed random variables and independent sums using CDF-first reasoning, Jacobians, and support-aware convolution.'
  },
  'gaussian-lognormal-structure': {
    title: 'Gaussian and Lognormal Structure',
    description: 'Use joint-normal structure, linear transformations, standardization, and logarithms to reason about Gaussian and lognormal random variables.'
  },
  'limit-theorems-lln-clt': {
    title: 'Law of Large Numbers and Central Limit Theorem',
    description: 'Distinguish the law of large numbers from the central limit theorem and reason about convergence of sums and sample averages.'
  }
};
```

Every Knowledge file uses:

```yaml
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
```

Use these Problem metadata values:

```js
const problemMeta = {
  'exponential-race-probability': {
    problemId: 'random-variables-distributions-001',
    title: 'Competing Exponential Waiting Times',
    description: 'Compare two independent exponential waiting times and derive the probability that one event occurs before the other from their rates.',
    concepts: ['common-probability-distributions'],
    family: 'competing-exponential-waits'
  },
  'exponential-memoryless-bus-wait': {
    problemId: 'random-variables-distributions-002',
    title: 'Memoryless Bus Waiting Time',
    description: 'Use exponential memorylessness to determine the remaining waiting time after arriving during an ongoing random arrival interval.',
    concepts: ['common-probability-distributions'],
    family: 'exponential-memorylessness'
  },
  'density-under-random-variable-transform': {
    problemId: 'random-variables-distributions-003',
    title: 'Density Under a Random Variable Transform',
    description: 'Derive the distribution of a transformed random variable from its CDF and recover the Jacobian rule with the correct support and inverse branches.',
    concepts: ['random-variables-cdf-pmf-pdf', 'random-variable-transformations-convolution'],
    family: 'distribution-pushforward'
  },
  'sum-of-two-uniforms-triangular-density': {
    problemId: 'random-variables-distributions-004',
    title: 'Sum of Two Uniforms Has a Triangular Density',
    description: 'Convolve two independent uniform densities and derive the support-dependent triangular density of their sum.',
    concepts: ['common-probability-distributions', 'random-variable-transformations-convolution'],
    family: 'independent-sum-convolution'
  },
  'joint-normal-quadrant-conditioning': {
    problemId: 'random-variables-distributions-005',
    title: 'Joint-Normal Quadrant Conditioning',
    description: 'Use a decorrelating linear transformation and Gaussian symmetry to compute a conditional quadrant probability for jointly normal variables.',
    concepts: ['gaussian-lognormal-structure', 'conditioning'],
    family: 'joint-normal-decorrelation'
  },
  'when-is-a-product-lognormal': {
    problemId: 'random-variables-distributions-006',
    title: 'When Is a Product Lognormal?',
    description: 'Determine which dependence assumptions make the product of two lognormal random variables lognormal and why marginal information alone is insufficient.',
    concepts: ['gaussian-lognormal-structure'],
    family: 'lognormal-product-closure'
  }
};
```

Every Problem also uses:

```yaml
date: 2026-08-18
domain: Mathematics & Statistics
category: Probability
subcategories: [Random Variables, Distributions]
tags: [Probability, Random Variables, Distributions, Interview]
quantInterviewTopics: [probability-statistics, random-variables-distributions]
techniques: []
prerequisites: []
relatedProblems: []
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
```

## Exact Hidden Source Inventory

```text
Green
4.4::definitions-discrete-continuous-distributions -> knowledge-only -> random-variables-cdf-pmf-pdf, common-probability-distributions
4.4::poisson-process-property -> canonical-problem -> exponential-memoryless-bus-wait -> common-probability-distributions

Red
3.2.1::3.28 -> knowledge-only -> random-variables-cdf-pmf-pdf, common-probability-distributions
3.2.1::3.30 -> knowledge-only -> common-probability-distributions
3.2.1::3.31 -> canonical-problem -> density-under-random-variable-transform -> random-variables-cdf-pmf-pdf, random-variable-transformations-convolution
3.2.1::3.33 -> canonical-problem -> sum-of-two-uniforms-triangular-density -> common-probability-distributions, random-variable-transformations-convolution
3.2.1::3.34 -> knowledge-only -> limit-theorems-lln-clt

150 Questions
2.6::1 -> knowledge-only -> common-probability-distributions
2.6::2 -> canonical-problem -> exponential-race-probability -> common-probability-distributions
2.6::3 -> knowledge-only -> common-probability-distributions
2.6::5 -> canonical-problem -> joint-normal-quadrant-conditioning -> gaussian-lognormal-structure, conditioning
2.6::6 -> canonical-problem -> when-is-a-product-lognormal -> gaussian-lognormal-structure
2.6::8 -> knowledge-only -> limit-theorems-lln-clt
2.6::9 -> knowledge-only -> limit-theorems-lln-clt
```

## Mathematical Contracts

```text
Exponential race:
P(Y > X) = lambda_X / (lambda_X + lambda_Y).
Means 6 and 8 imply rates 1/6 and 1/8, hence P(Y>X)=4/7.

Exponential memorylessness:
P(T>s+t | T>s) = P(T>t) = exp(-lambda t).
Mean 10 minutes implies expected additional wait 10 minutes under the exponential model.

Monotone transformation:
F_Y(y)=P(g(X)<=y)
f_Y(y)=f_X(g^{-1}(y))*|d g^{-1}(y)/dy|
For many-to-one transforms, sum valid inverse-branch contributions.

Independent uniforms:
f_{X+Y}(z)=z for 0<z<1; 2-z for 1<=z<2; 0 otherwise.

Joint normal:
W=sqrt(2)X-Y, Var(W)=1, Cov(W,Y)=0, and P(X>0 | Y<0)=1/4.
Zero covariance yields independence here only because the pair is jointly normal.

Lognormal product:
If (log X, log Y) is jointly normal, log(XY)=log X+log Y is normal, so XY is lognormal.
Independence is a sufficient special case; marginal lognormality alone is insufficient.
```

---

### Task 1: Register Workstream 008 and Establish Branch CI

**Files:**
- Create: `.github/workflows/quant-interview-random-variables-distributions-ci.yml`
- Create: `tests/quant-interview-random-variables-distributions-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json`

**Interfaces:**
- Consumes: taxonomy, source-topic map, verified source manifests, `validateTopicWorkstream`.
- Produces: active workstream registration used by Tasks 6 and 8.

- [ ] **Step 1: Add temporary branch-only CI**

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

Commit only this workflow first and confirm inherited `test/check/build` all succeed.

- [ ] **Step 2: Write registration RED**

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
    'green-book', 'red-book', '150-most-frequently-asked'
  ]));
});
```

Add exact scope assertions:

```js
assert.deepEqual(green.sourceSections, ['4.4']);
assert.deepEqual(green.evidencePageRanges, [{ startPage: 102, endPage: 108 }]);
assert.deepEqual(red.sourceSections, ['3.2.1']);
assert.deepEqual(red.evidencePageRanges, [
  { startPage: 95, endPage: 96 },
  { startPage: 120, endPage: 128 }
]);
assert.deepEqual(q150.sourceSections, ['2.6']);
assert.deepEqual(q150.evidencePageRanges, [{ startPage: 134, endPage: 145 }]);
```

- [ ] **Step 3: Run RED**

```bash
npm run test
```

Expected failure: only the new workstream registration contract fails because the JSON file does not exist.

- [ ] **Step 4: Create active registration**

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
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Claim distribution definitions and the exponential-memorylessness bus problem only; meeting probability, broken-stick geometry, normal moments, and section 4.5 expectation material remain outside this workstream."
    },
    {
      "source": "red-book",
      "sourceSections": ["3.2.1"],
      "evidencePageRanges": [{"startPage": 95, "endPage": 96}, {"startPage": 120, "endPage": 128}],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Claim items 3.28, 3.30, 3.31, 3.33, and 3.34 only; order statistics 3.29/3.32, PSD 3.35, change of measure 3.36, expectation-heavy 3.37/3.38, and stochastic-process items remain outside this workstream."
    },
    {
      "source": "150-most-frequently-asked",
      "sourceSections": ["2.6"],
      "evidencePageRanges": [{"startPage": 134, "endPage": 145}],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Claim items 1, 2, 3, 5, 6, 8, and 9 from the Probability/Stochastic Calculus section; disk expectation item 4, expectation/tower item 7, and martingale/Brownian/Ito material remain outside this workstream."
    }
  ]
}
```

- [ ] **Step 5: Validate and turn GREEN**

Add a test that calls `validateTopicWorkstream(workstream, context)` and expects no throw. Then run:

```bash
npm run test && npm run check && npm run build
```

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/quant-interview-random-variables-distributions-ci.yml tests/quant-interview-random-variables-distributions-workstream.test.mjs src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json
git commit -m "feat: register random variables distributions workstream"
```

---

### Task 2: Build CDF, Common-Distribution, and Transformation Knowledge

**Files:**
- Create: `tests/quant-interview-random-variables-distributions-content.test.mjs`
- Create: `src/content/knowledge/concepts/random-variables-cdf-pmf-pdf.md`
- Create: `src/content/knowledge/concepts/common-probability-distributions.md`
- Create: `src/content/knowledge/concepts/random-variable-transformations-convolution.md`

**Interfaces:**
- Produces the three foundational Knowledge slugs used by Tasks 4-7.

- [ ] **Step 1: Write RED contracts**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (file) => readFile(file, 'utf8');
const topicLine = /^quantInterviewTopics:\s*\[probability-statistics, random-variables-distributions\]$/m;

test('CDF PMF PDF Knowledge separates support mass and density', async () => {
  const text = await read('src/content/knowledge/concepts/random-variables-cdf-pmf-pdf.md');
  assert.match(text, topicLine);
  assert.match(text, /CDF|cumulative distribution/i);
  assert.match(text, /PMF|probability mass/i);
  assert.match(text, /PDF|probability density/i);
  assert.match(text, /support/i);
  assert.match(text, /point probability|P\(X\s*=\s*x\).*0/i);
  assert.match(text, /^## Interview Checks$/m);
  assert.match(text, /U\(a,b\)|uniform/i);
});

test('common distributions Knowledge is recognition-first', async () => {
  const text = await read('src/content/knowledge/concepts/common-probability-distributions.md');
  assert.match(text, topicLine);
  for (const family of ['binomial', 'poisson', 'geometric', 'negative binomial', 'normal', 'exponential', 'gamma', 'beta', 'cauchy']) assert.match(text, new RegExp(family, 'i'));
  assert.match(text, /memoryless/i);
  assert.match(text, /principal value|moment.*exist|expectation.*exist/i);
  assert.match(text, /^## Interview Checks$/m);
});

test('transformation Knowledge derives pushforwards and convolution bounds', async () => {
  const text = await read('src/content/knowledge/concepts/random-variable-transformations-convolution.md');
  assert.match(text, topicLine);
  assert.match(text, /CDF-first|distribution function|F_Y/i);
  assert.match(text, /Jacobian|inverse/i);
  assert.match(text, /many-to-one|multiple.*branch/i);
  assert.match(text, /convolution/i);
  assert.match(text, /support.*bound|integration.*bound/i);
  assert.match(text, /^## Interview Checks$/m);
});
```

- [ ] **Step 2: Run RED**

```bash
npm run test
```

Expected: exactly the three new Knowledge files are missing/failing.

- [ ] **Step 3: Implement the three Knowledge files**

Use the exact titles/descriptions from `knowledgeMeta`. Include the Spec’s required sections and Interview Checks. `random-variable-transformations-convolution` must introduce the CDF-first method before the Jacobian rule and must explain how support determines convolution limits.

- [ ] **Step 4: Verify and commit**

```bash
npm run test && npm run check && npm run build
git add tests/quant-interview-random-variables-distributions-content.test.mjs src/content/knowledge/concepts/random-variables-cdf-pmf-pdf.md src/content/knowledge/concepts/common-probability-distributions.md src/content/knowledge/concepts/random-variable-transformations-convolution.md
git commit -m "feat: build foundational distribution knowledge"
```

---

### Task 3: Build Gaussian/Lognormal and LLN/CLT Knowledge

**Files:**
- Modify: `tests/quant-interview-random-variables-distributions-content.test.mjs`
- Create: `src/content/knowledge/concepts/gaussian-lognormal-structure.md`
- Create: `src/content/knowledge/concepts/limit-theorems-lln-clt.md`

**Interfaces:**
- Produces the final two Knowledge slugs used by Tasks 5-7.

- [ ] **Step 1: Add RED contracts**

```js
test('Gaussian Knowledge separates joint normality independence and lognormal closure', async () => {
  const text = await read('src/content/knowledge/concepts/gaussian-lognormal-structure.md');
  assert.match(text, topicLine);
  assert.match(text, /jointly normal|joint normal/i);
  assert.match(text, /zero covariance|uncorrelated/i);
  assert.match(text, /independent/i);
  assert.match(text, /marginal.*normal.*not|does not imply.*joint/i);
  assert.match(text, /lognormal/i);
  assert.match(text, /log\(XY\)|log X.*log Y/i);
  assert.match(text, /^## Interview Checks$/m);
});

test('limit theorem Knowledge distinguishes LLN CLT and convergence modes', async () => {
  const text = await read('src/content/knowledge/concepts/limit-theorems-lln-clt.md');
  assert.match(text, topicLine);
  assert.match(text, /weak law/i);
  assert.match(text, /strong law/i);
  assert.match(text, /almost sure|almost surely/i);
  assert.match(text, /convergence in probability/i);
  assert.match(text, /convergence in distribution/i);
  assert.match(text, /central limit theorem|CLT/i);
  assert.match(text, /sqrt\(n\)|√n/i);
  assert.match(text, /finite variance/i);
  assert.match(text, /^## Interview Checks$/m);
});
```

- [ ] **Step 2: Run RED**

```bash
npm run test
```

Expected: only the two new Knowledge files are missing/failing.

- [ ] **Step 3: Implement both files**

Use the exact titles/descriptions from `knowledgeMeta`. State explicitly that zero covariance implies independence only for jointly normal variables. Explain LLN versus CLT roles and classical iid finite-variance assumptions without turning the page into a long proof chapter.

- [ ] **Step 4: Verify and commit**

```bash
npm run test && npm run check && npm run build
git add tests/quant-interview-random-variables-distributions-content.test.mjs src/content/knowledge/concepts/gaussian-lognormal-structure.md src/content/knowledge/concepts/limit-theorems-lln-clt.md
git commit -m "feat: add Gaussian and limit theorem knowledge"
```

---

### Task 4: Add Exponential Race, Memorylessness, and Transformation Problems

**Files:**
- Modify: `tests/quant-interview-random-variables-distributions-content.test.mjs`
- Create: `src/content/problems/probability/exponential-race-probability.md`
- Create: `src/content/problems/probability/exponential-memoryless-bus-wait.md`
- Create: `src/content/problems/probability/density-under-random-variable-transform.md`

**Interfaces:**
- Consumes the Knowledge from Task 2.
- Produces canonical Problems `random-variables-distributions-001` through `003`.

- [ ] **Step 1: Add S3+ helper and RED assertions**

```js
function assertS3(text, id) {
  assert.match(text, new RegExp(`^problemId:\\s*${id}$`, 'm'));
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, random-variables-distributions\]$/m);
  for (const heading of ['## Problem', '## Think Before Revealing', '## Solution', '## Why This Matters', '## Common Mistakes', '## Extensions']) assert.ok(text.includes(heading), `missing ${heading}`);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most|source page|PDF page/i);
}

const race = await read('src/content/problems/probability/exponential-race-probability.md');
assertS3(race, 'random-variables-distributions-001');
assert.match(race, /4\/7/);
assert.match(race, /rate|lambda_X|λ_X/i);

const bus = await read('src/content/problems/probability/exponential-memoryless-bus-wait.md');
assertS3(bus, 'random-variables-distributions-002');
assert.match(bus, /memoryless/i);
assert.match(bus, /10\s*minutes/i);
assert.match(bus, /residual|additional waiting/i);
assert.doesNotMatch(bus, /## .*Poisson Process|general Poisson process/i);

const transform = await read('src/content/problems/probability/density-under-random-variable-transform.md');
assertS3(transform, 'random-variables-distributions-003');
assert.match(transform, /CDF|F_Y/i);
assert.match(transform, /inverse|g\^-1/i);
assert.match(transform, /absolute|Jacobian/i);
assert.match(transform, /many-to-one|multiple.*branch/i);
```

- [ ] **Step 2: Run RED**

```bash
npm run test
```

Expected: only Problems `001-003` are missing/failing.

- [ ] **Step 3: Implement Problems `001-003`**

Use exact metadata from `problemMeta`. Each page includes two `<details>` hints and the six S3+ sections. `exponential-memoryless-bus-wait` may mention the arrival-process background only as context; it must not create a general Poisson-process teaching section.

- [ ] **Step 4: Verify and commit**

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
- Consumes Knowledge from Tasks 2-3 plus existing `conditioning`.
- Produces canonical Problems `random-variables-distributions-004` through `006`.

- [ ] **Step 1: Add RED assertions**

```js
const sum = await read('src/content/problems/probability/sum-of-two-uniforms-triangular-density.md');
assertS3(sum, 'random-variables-distributions-004');
assert.match(sum, /convolution/i);
assert.match(sum, /0\s*<\s*z\s*<\s*1/);
assert.match(sum, /2\s*-\s*z/);
assert.match(sum, /support.*bound|integration.*bound/i);

const joint = await read('src/content/problems/probability/joint-normal-quadrant-conditioning.md');
assertS3(joint, 'random-variables-distributions-005');
assert.match(joint, /1\/4/);
assert.match(joint, /sqrt\(2\).*X.*Y|√2.*X.*Y/i);
assert.match(joint, /joint.*normal/i);
assert.match(joint, /zero covariance|uncorrelated/i);
assert.match(joint, /independent/i);
assert.match(joint, /not.*general|outside.*joint.*normal/i);

const lognormal = await read('src/content/problems/probability/when-is-a-product-lognormal.md');
assertS3(lognormal, 'random-variables-distributions-006');
assert.match(lognormal, /log\(XY\)|log X.*log Y/i);
assert.match(lognormal, /jointly normal|joint normal/i);
assert.match(lognormal, /independent.*sufficient|independent lognormal/i);
assert.match(lognormal, /marginal.*insufficient|marginal.*not sufficient/i);
```

- [ ] **Step 2: Run RED**

```bash
npm run test
```

Expected: only Problems `004-006` are missing/failing.

- [ ] **Step 3: Implement Problems `004-006`**

Use exact metadata from `problemMeta`. The convolution page must derive integration limits from simultaneous support restrictions. The joint-normal page must make `joint normal + zero covariance => independence` explicit. The lognormal page must distinguish marginal distributions from the joint law.

- [ ] **Step 4: Verify and commit**

```bash
npm run test && npm run check && npm run build
git add tests/quant-interview-random-variables-distributions-content.test.mjs src/content/problems/probability/sum-of-two-uniforms-triangular-density.md src/content/problems/probability/joint-normal-quadrant-conditioning.md src/content/problems/probability/when-is-a-product-lognormal.md
git commit -m "feat: add convolution and Gaussian distribution problems"
```

---

### Task 6: Reconcile the Fourteen Hidden Coverage Rows

**Files:**
- Modify: `tests/quant-interview-random-variables-distributions-workstream.test.mjs`
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/coverage/red-book.json`
- Modify: `src/data/quant-interview/coverage/150-most-frequently-asked.json`

**Interfaces:**
- Consumes all five Knowledge and six Problem slugs.
- Produces terminal auditable source coverage for Task 8.

- [ ] **Step 1: Add exact inventory RED**

```js
const expectedCoverageKeys = {
  'green-book': ['4.4::definitions-discrete-continuous-distributions', '4.4::poisson-process-property'],
  'red-book': ['3.2.1::3.28', '3.2.1::3.30', '3.2.1::3.31', '3.2.1::3.33', '3.2.1::3.34'],
  '150-most-frequently-asked': ['2.6::1', '2.6::2', '2.6::3', '2.6::5', '2.6::6', '2.6::8', '2.6::9']
};
assert.equal(Object.values(expectedCoverageKeys).flat().length, 14);
```

For each key assert: row exists; `canonicalTopics` contains `random-variables-distributions`; state is one of `canonical-problem`, `merged-duplicate`, `variant`, `knowledge-only`; `resolutionNote` is nonempty; canonical Problem/Knowledge targets resolve to real files.

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

Also assert Red `3.29`, `3.32`, `3.37`, and `3.38` are not newly terminalized under `random-variables-distributions`.

- [ ] **Step 3: Add `knowledge-only` public self-test assertions**

Require `## Interview Checks` and source-derived checks in:

```js
'random-variables-cdf-pmf-pdf'
'common-probability-distributions'
'limit-theorems-lln-clt'
```

The assertions must explicitly find Uniform CDF, Cauchy/moment existence, Exponential, Poisson distribution, LLN, and CLT language.

- [ ] **Step 4: Run coverage RED**

```bash
npm run test
```

Expected: coverage tests fail because the fourteen claimed rows are absent; public content tests remain green.

- [ ] **Step 5: Upsert only the fourteen exact rows**

Use the inventory in this plan verbatim. Do not mutate unrelated coverage rows. If direct contents editing of large JSON ledgers is unsafe, use the same temporary branch-only validated ledger-mutator pattern used by workstreams 006/007: the script is allowed to upsert only these fourteen `(sourceSection, sourceItem)` keys, runs `npm run test`, `npm run check`, and `npm run build` before committing, and is deleted after a subsequent read-only GREEN CI confirms the committed ledger state.

- [ ] **Step 6: Validate all ledgers**

```js
validateCoverageLedger(ledger, {
  sourceTopicMap,
  taxonomy,
  problemSlugs,
  knowledgeSlugs,
  allowUnresolvedCanonicalRefs: false
});
```

Run:

```bash
npm run test && npm run check && npm run build
```

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
- Consumes all new public slugs and terminal coverage.
- Produces the content-complete verification commit whose successful Actions run is recorded by Task 8.

- [ ] **Step 1: Extend exact Problem enumeration**

Append:

```js
'exponential-race-probability',
'exponential-memoryless-bus-wait',
'density-under-random-variable-transform',
'sum-of-two-uniforms-triangular-density',
'joint-normal-quadrant-conditioning',
'when-is-a-product-lognormal',
```

- [ ] **Step 2: Extend exact Knowledge topic map**

Append:

```js
['random-variables-cdf-pmf-pdf', ['probability-statistics', 'random-variables-distributions']],
['common-probability-distributions', ['probability-statistics', 'random-variables-distributions']],
['random-variable-transformations-convolution', ['probability-statistics', 'random-variables-distributions']],
['gaussian-lognormal-structure', ['probability-statistics', 'random-variables-distributions']],
['limit-theorems-lln-clt', ['probability-statistics', 'random-variables-distributions']],
```

Update the count contract:

```js
test('source-neutral regression enumerates the current 42 Problem and 33 Knowledge contracts', () => {
  assert.equal(currentProblemSlugs.length, 42);
  assert.equal(expectedKnowledgeTopics.size, 33);
});
```

- [ ] **Step 3: Extend hidden-audit mapping**

Require these 150 rows to be `canonical-problem` and map exactly:

```js
['2.6::2', 'exponential-race-probability'],
['2.6::5', 'joint-normal-quadrant-conditioning'],
['2.6::6', 'when-is-a-product-lognormal'],
```

- [ ] **Step 4: Verify and commit**

```bash
npm run test && npm run check && npm run build
git add tests/quant-interview-source-neutral-content.test.mjs
git commit -m "test: extend source-neutral regression for distributions"
```

After GitHub Actions reports success for this exact commit, record the commit SHA and the successful run’s integer database/run id externally for Task 8. Do not write them into repository files until the successful run has actually completed.

---

### Task 8: Seal Workstream 008, Update HANDOFF, and Remove Temporary Tooling

**Files:**
- Create: `tests/quant-interview-random-variables-distributions-completion.test.mjs`
- Modify: `src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Delete from final tree: `.github/workflows/quant-interview-random-variables-distributions-ci.yml`
- Delete from final tree: any temporary coverage-mutator file/workflow created in Task 6.

**Interfaces:**
- Consumes the real successful Task 7 commit SHA and Actions run id.
- Produces sealed durable repository memory and the next bounded topic.

- [ ] **Step 1: Write completion RED**

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
  assert.ok(workstream.verification.runId > 0);
  assert.deepEqual(workstream.verification?.commands, ['npm run test', 'npm run check', 'npm run build']);
  assert.equal(workstream.verification?.conclusion, 'success');
});

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

Expected: completion tests fail because workstream status is still `active` and HANDOFF still points to Random Variables & Distributions.

- [ ] **Step 3: Read the real Task 7 verification evidence**

Use the repository/Actions tooling available in the execution environment to inspect the exact Task 7 commit and its successful Actions run. Before writing repository state, enforce these runtime checks:

```js
assert.match(contentCommit, /^[0-9a-f]{40}$/);
assert.ok(Number.isInteger(successfulRunId));
assert.ok(successfulRunId > 0);
assert.equal(successfulRunConclusion, 'success');
```

`contentCommit`, `successfulRunId`, and `successfulRunConclusion` are values returned by the actual VCS/Actions read in this step, not literals stored in this plan.

- [ ] **Step 4: Seal the machine-readable workstream**

Write those exact runtime values into:

```js
workstream.status = 'complete';
workstream.verification = {
  commit: contentCommit,
  runId: successfulRunId,
  commands: ['npm run test', 'npm run check', 'npm run build'],
  conclusion: successfulRunConclusion
};
```

No synthetic SHA, zero run id, or illustrative evidence value may enter the committed JSON.

- [ ] **Step 5: Update durable HANDOFF**

Preserve prior workstream history and add:

```text
Completed cross-book workstream 8
probability-statistics-random-variables-distributions-008
5 canonical Knowledge nodes
6 canonical Problems
14 terminal claimed source rows
42 canonical Problems / 33 topic-classified Knowledge corpus checkpoint
next bounded topic: Probability & Statistics -> Expectation, Variance & Covariance
```

Also record the exact Task 7 commit/run evidence and the boundary decisions: bus problem owns exponential memorylessness only; normal moments and order statistics remain deferred; LLN/CLT are one Knowledge node.

- [ ] **Step 6: Run closure verification**

```bash
npm run test && npm run check && npm run build
```

Expected: all commands succeed, including historical handoff regressions.

- [ ] **Step 7: Review topic-only diff**

Compare against `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`. The final product diff may contain only:

```text
docs/quant-interview/HANDOFF.md
docs/superpowers/specs/2026-08-18-quant-interview-random-variables-distributions-design.md
docs/superpowers/plans/2026-08-18-quant-interview-random-variables-distributions.md
src/content/knowledge/concepts/random-variables-cdf-pmf-pdf.md
src/content/knowledge/concepts/common-probability-distributions.md
src/content/knowledge/concepts/random-variable-transformations-convolution.md
src/content/knowledge/concepts/gaussian-lognormal-structure.md
src/content/knowledge/concepts/limit-theorems-lln-clt.md
src/content/problems/probability/exponential-race-probability.md
src/content/problems/probability/exponential-memoryless-bus-wait.md
src/content/problems/probability/density-under-random-variable-transform.md
src/content/problems/probability/sum-of-two-uniforms-triangular-density.md
src/content/problems/probability/joint-normal-quadrant-conditioning.md
src/content/problems/probability/when-is-a-product-lognormal.md
src/data/quant-interview/coverage/green-book.json
src/data/quant-interview/coverage/red-book.json
src/data/quant-interview/coverage/150-most-frequently-asked.json
src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json
tests/quant-interview-random-variables-distributions-workstream.test.mjs
tests/quant-interview-random-variables-distributions-content.test.mjs
tests/quant-interview-random-variables-distributions-completion.test.mjs
tests/quant-interview-source-neutral-content.test.mjs
```

No Home, Projects, UI, deployment, or unrelated Knowledge-topic changes are allowed.

- [ ] **Step 8: Remove temporary tooling and prove cleanup-only delta**

Delete branch CI and any Task 6 mutator. Compare the last fully green product commit with the final branch head; post-verification changes may only remove those temporary tooling files.

- [ ] **Step 9: Commit closure and cleanup**

```bash
git add src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json docs/quant-interview/HANDOFF.md tests/quant-interview-random-variables-distributions-completion.test.mjs
git commit -m "docs: complete random variables distributions workstream"
```

If cleanup is a second commit:

```bash
git add -u
git commit -m "chore: remove random variables distributions workstream tooling"
```

## Completion Checklist

```text
[ ] workstream 008 status is complete
[ ] verification commit is a real 40-character SHA from the successful content-complete run
[ ] verification runId is a real positive integer from the successful content-complete run
[ ] five fixed Knowledge slugs exist and are source-neutral
[ ] six fixed Problem slugs exist, solved, S3+, and source-neutral
[ ] exactly fourteen claimed rows are terminal with resolution notes and real targets
[ ] every knowledge-only row remains publicly testable through Interview Checks
[ ] Green bus row explicitly limits ownership to exponential memorylessness
[ ] Red 3.29 and 3.32 remain outside this topic
[ ] expectation-heavy normal moments remain outside this topic
[ ] LLN and CLT are fused into one public Knowledge node
[ ] global source-neutral regression records 42 Problems and 33 Knowledge if the approved structure remained unchanged
[ ] npm run test succeeds
[ ] npm run check succeeds
[ ] npm run build succeeds
[ ] final topic-only diff contains no unrelated files
[ ] temporary CI/mutator tooling is absent from final product tree
[ ] HANDOFF next bounded topic is Expectation, Variance & Covariance
```
