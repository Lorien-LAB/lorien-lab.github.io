# Quant Interview Order Statistics & Extremes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the bounded `Probability & Statistics -> Order Statistics & Extremes` cross-book workstream with two canonical Knowledge nodes, four source-neutral S3+ Problems, and five newly terminal source rows.

**Architecture:** Register the bounded workstream and RED contracts first, build the two reusable order-statistics Knowledge nodes before Problems, stage the exact Green/Red hidden ownership, then implement four distinct reasoning families: uniform extrema/range, joint min/max dependence, random ants, and general kth order statistics. Finish by linking the existing invariance ant puzzle without changing its ownership, strengthening coverage to real-target validation, extending the exact global source-neutral regression from `55/37` to `59/39`, obtaining real CI evidence, and sealing HANDOFF.

**Tech Stack:** Astro 5 content collections, Markdown/YAML frontmatter, JSON workstream/coverage data, JavaScript ES modules, Node.js built-in test runner, GitHub Actions, npm, TypeScript/Astro checks.

**Spec:** `docs/superpowers/specs/2026-08-23-quant-interview-order-statistics-extremes-design.md`

## Global Constraints

- Durable base: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`.
- Spec/plan branch: `chatgpt/quant-interview-order-statistics-extremes-design-2026-08-23`.
- Planned implementation branch: `chatgpt/quant-interview-workstream-order-statistics-extremes-2026-08-23`.
- Create the implementation branch from the current approved spec/plan commit, not from `main`.
- Workstream id: `probability-statistics-order-statistics-extremes-010`.
- Canonical topics: `probability-statistics`, `order-statistics-extremes`.
- New Knowledge slugs: `order-statistics-basics`, `joint-extremes-and-range`.
- New Problem slugs: `uniform-sample-extremes-and-range`, `joint-min-max-correlation-of-uniforms`, `random-ants-last-fall-time`, `kth-order-statistic-distribution`.
- Problem ids: `order-statistics-extremes-001` through `order-statistics-extremes-004` in the slug order above.
- Exactly five new terminal source rows under the approved design: three Green and two Red. Do not invent a 150 coverage row.
- Terminal-state distribution: `4 canonical-problem + 1 merged-duplicate`.
- Green claims: `4.6.expected-max-min`, `4.6.correlation-max-min`, `4.6.random-ants`.
- Red claims: `3.2.1::3.29`, `3.2.1::3.32`.
- Red 3.29 is a `merged-duplicate` of the Green uniform extrema/range canonical family.
- 150 Questions is reviewed in the workstream manifest but receives no new ownership unless new source evidence is discovered; if discovered, stop and amend the spec before claiming it.
- Existing `src/content/problems/logic/ants-crossing-line.md` remains `logic-brainteasers-discrete-reasoning, invariants-state-transformations`; do not reclassify or merge it.
- New Random Ants may link to the existing ant puzzle through `relatedProblems` / shared invariance technique only.
- Every new Problem is S3+: `## Problem`, `## Think Before Revealing`, at least two `<details>` hints, `## Solution`, `## Why This Matters`, `## Common Mistakes`, `## Extensions`.
- Public content is source-neutral: no book names, source item numbers, PDF pages, provenance fields, source ordering, or copied source answer text.
- Distribution-first pedagogy: max/min/kth solutions derive the order-statistic distribution before taking expectations or moments.
- Do not create standalone pages for uniform minimum, sample median, exponential minimum, largest spacing, Gaussian maximum asymptotics, Gumbel/Fréchet/Weibull, GEV/GPD/POT/Hill estimators, or empirical quantile conventions in 010.
- Brownian/process extrema, martingale/stopping-time extrema, and random-walk extrema remain Stochastic Processes.
- Dynamic reroll/stop optimization remains Dynamic Programming / Optimal Stopping.
- Matrix covariance/correlation PSD remains Linear Algebra; only scalar covariance cross-linking is allowed.
- Expected exact public corpus after 010: `59 Problems / 39 Knowledge` if no semantic collision is discovered. These are regression expectations, not quotas.
- Final verification commands: `npm run test`, `npm run check`, `npm run build`.
- Completion metadata requires a real 40-character content-complete commit SHA and real successful GitHub Actions run id.
- Never touch `main`; never force-push over concurrent work.

---

## File Structure Map

### New Knowledge

```text
src/content/knowledge/concepts/
├── order-statistics-basics.md
└── joint-extremes-and-range.md
```

### New Problems

```text
src/content/problems/probability/
├── uniform-sample-extremes-and-range.md
├── joint-min-max-correlation-of-uniforms.md
├── random-ants-last-fall-time.md
└── kth-order-statistic-distribution.md
```

### Existing public graph files

Modify minimally, only where the reciprocal link is useful:

```text
src/content/problems/logic/ants-crossing-line.md
src/content/knowledge/concepts/expectation-linearity-indicators.md
src/content/knowledge/concepts/expectation-variance-covariance-algebra.md
src/content/knowledge/concepts/common-probability-distributions.md
src/content/knowledge/concepts/random-variable-transformations-convolution.md
src/content/knowledge/concepts/symmetry-equiprobability-geometric-probability.md
```

Do not change their existing canonical topic ownership.

### Hidden data

```text
src/data/quant-interview/workstreams/probability-statistics-order-statistics-extremes-010.json
src/data/quant-interview/coverage/green-book.json
src/data/quant-interview/coverage/red-book.json
```

Do not modify `src/data/quant-interview/coverage/150-most-frequently-asked.json` under the approved design.

### Tests

```text
tests/quant-interview-order-statistics-extremes-workstream.test.mjs
tests/quant-interview-order-statistics-extremes-content.test.mjs
tests/quant-interview-order-statistics-extremes-completion.test.mjs
tests/quant-interview-source-neutral-content.test.mjs
```

Modify `tests/quant-interview-handoff.test.mjs` only if a durable-history assertion must be minimally synchronized at closure.

### Temporary branch tooling

```text
.github/workflows/quant-interview-order-statistics-extremes-ci.yml
```

Remove it from the final durable product tree after verification evidence is recorded and fresh closure verification succeeds.

---

## Exact Public Metadata

Use these Knowledge metadata values:

```js
const knowledgeMeta = {
  'order-statistics-basics': {
    title: 'Order Statistics',
    description: 'Derive the distributions of sample minima, maxima, and general kth order statistics, with uniform and Beta representations for common interview problems.'
  },
  'joint-extremes-and-range': {
    title: 'Joint Extremes and Sample Range',
    description: 'Analyze the joint behavior of sample minima and maxima, derive sample ranges, and distinguish marginal extreme distributions from their dependence structure.'
  }
};
```

Every new Knowledge file uses:

```yaml
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-23
tags: [Probability, Statistics, Order Statistics, Extremes]
quantInterviewTopics: [probability-statistics, order-statistics-extremes]
featured: false
related: []
relatedNotes: []
```

Use this Problem metadata:

```js
const problemMeta = {
  'uniform-sample-extremes-and-range': {
    problemId: 'order-statistics-extremes-001',
    title: 'Uniform Sample Extremes and Range',
    description: 'Derive the distributions and expectations of the minimum, maximum, and range of an iid Uniform sample.',
    concepts: ['order-statistics-basics', 'joint-extremes-and-range'],
    techniques: [],
    relatedProblems: ['random-ants-last-fall-time', 'joint-min-max-correlation-of-uniforms'],
    family: 'uniform-sample-extremes',
    mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 12
  },
  'joint-min-max-correlation-of-uniforms': {
    problemId: 'order-statistics-extremes-002',
    title: 'Correlation Between the Minimum and Maximum',
    description: 'Use joint extreme structure and a product identity to compute the correlation between the minimum and maximum of two iid Uniform variables.',
    concepts: ['order-statistics-basics', 'joint-extremes-and-range', 'expectation-variance-covariance-algebra'],
    techniques: [],
    relatedProblems: ['uniform-sample-extremes-and-range'],
    family: 'joint-sample-extremes',
    mathDifficulty: 3, insightDifficulty: 4, interviewDifficulty: 4, estimatedMinutes: 15
  },
  'random-ants-last-fall-time': {
    problemId: 'order-statistics-extremes-003',
    title: 'Random Ants and the Last Fall Time',
    description: 'Replace colliding ants by ghost trajectories, identify iid Uniform remaining distances, and compute the expected last-fall time as a sample maximum.',
    concepts: ['order-statistics-basics'],
    techniques: ['identity-swapping-invariance'],
    relatedProblems: ['ants-crossing-line', 'uniform-sample-extremes-and-range'],
    family: 'random-ants-order-statistic',
    mathDifficulty: 2, insightDifficulty: 4, interviewDifficulty: 4, estimatedMinutes: 12
  },
  'kth-order-statistic-distribution': {
    problemId: 'order-statistics-extremes-004',
    title: 'Distribution of the kth Order Statistic',
    description: 'Derive the CDF and density of the kth smallest observation in an iid continuous sample and connect Uniform order statistics to Beta distributions.',
    concepts: ['order-statistics-basics'],
    techniques: [],
    relatedProblems: ['uniform-sample-extremes-and-range'],
    family: 'kth-order-statistic',
    mathDifficulty: 3, insightDifficulty: 3, interviewDifficulty: 4, estimatedMinutes: 18
  }
};
```

Every new Problem also uses:

```yaml
date: 2026-08-23
domain: Mathematics & Statistics
category: Probability
subcategories: [Order Statistics, Extremes]
tags: [Probability, Statistics, Order Statistics, Interview]
quantInterviewTopics: [probability-statistics, order-statistics-extremes]
prerequisites: []
status: solved
featured: false
```

---

## Exact Hidden Source Inventory

### Green

```text
4.6.expected-max-min::
  state: canonical-problem
  canonicalProblems: [uniform-sample-extremes-and-range]
  canonicalKnowledge: [order-statistics-basics, joint-extremes-and-range]

4.6.correlation-max-min::
  state: canonical-problem
  canonicalProblems: [joint-min-max-correlation-of-uniforms]
  canonicalKnowledge: [joint-extremes-and-range, expectation-variance-covariance-algebra]

4.6.random-ants::
  state: canonical-problem
  canonicalProblems: [random-ants-last-fall-time]
  canonicalKnowledge: [order-statistics-basics]
```

All three Green rows use `sourceItem: null`, `canonicalTopics: [order-statistics-extremes]`, and nonempty resolution notes.

Required resolution-note meaning:

```text
expected-max-min: the Uniform max/min/range family is represented once and also absorbs Red 3.29.
correlation-max-min: joint dependence is a distinct identity; scalar covariance is used, while covariance-matrix PSD remains Linear Algebra.
random-ants: collision relabeling reduces a random physical system to the maximum of iid Uniform remaining distances; the existing deterministic ant puzzle remains a separate invariance Problem.
```

### Red

```text
3.2.1::3.29
  state: merged-duplicate
  canonicalProblems: [uniform-sample-extremes-and-range]
  canonicalKnowledge: [order-statistics-basics, joint-extremes-and-range]

3.2.1::3.32
  state: canonical-problem
  canonicalProblems: [kth-order-statistic-distribution]
  canonicalKnowledge: [order-statistics-basics]
```

Both rows use `canonicalTopics: [order-statistics-extremes]` and nonempty resolution notes.

Required resolution-note meaning:

```text
3.29: same iid Uniform maximum/minimum/range reasoning family as Green expected-max-min, so one public canonical Problem owns both sources.
3.32: general kth-order-statistic distribution/density is a distinct canonical identity and was intentionally left outside workstream 009.
```

### 150 Questions

No new ledger mutation. Workstream scope records a bounded review with `reviewOutcome: reviewed-no-new-ownership`. The workstream test must assert that the 150 ledger has no new row owned by `order-statistics-extremes` as a side effect of 010.

---

## Mathematical Contracts

```text
For iid X_i with CDF F:
F_{X_(n)}(x)=F(x)^n.
F_{X_(1)}(x)=1-[1-F(x)]^n.

For iid continuous X_i with density f:
f_{X_(k)}(x)=n!/[(k-1)!(n-k)!] F(x)^(k-1)[1-F(x)]^(n-k) f(x).
P(X_(k)<=x)=sum_{j=k}^n C(n,j)F(x)^j[1-F(x)]^(n-j).

For continuous F:
F(X_(k)) ~ Beta(k,n+1-k).
For iid U(0,1): U_(k) ~ Beta(k,n+1-k), E[U_(k)]=k/(n+1).

For iid U_i~U(0,1):
E[max U_i]=n/(n+1).
E[min U_i]=1/(n+1).
E[max U_i-min U_i]=(n-1)/(n+1).

Joint min/max density for iid continuous samples:
f_{L,U}(l,u)=n(n-1)[F(u)-F(l)]^(n-2) f(l)f(u), l<u.

For X_1,X_2 iid~U(0,1), Y=min(X_1,X_2), Z=max(X_1,X_2):
E[Y]=1/3, E[Z]=2/3.
Var(Y)=Var(Z)=1/18.
YZ=X_1X_2.
E[YZ]=1/4.
Cov(Y,Z)=1/36.
Corr(Y,Z)=1/2.

Random ants on a unit rope:
collision/reversal is equivalent to straight ghost trajectories with label swaps;
with iid Uniform positions and independent fair directions, each ghost remaining distance D_i~U(0,1);
T_n=max_i D_i;
E[T_n]=n/(n+1);
for n=500, E[T_500]=500/501.
```

---

### Task 1: Create the Implementation Branch, Temporary CI, and Active Workstream

**Files:**
- Create: `.github/workflows/quant-interview-order-statistics-extremes-ci.yml`
- Create: `tests/quant-interview-order-statistics-extremes-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/probability-statistics-order-statistics-extremes-010.json`

**Interfaces:**
- Consumes: approved spec, taxonomy, source-topic map, source manifests, `validateTopicWorkstream`.
- Produces: isolated implementation branch, branch-only verification workflow, active workstream registration.

- [ ] **Step 1: Create the implementation branch from the approved plan commit**

Use `superpowers:using-git-worktrees` if a local checkout exists. Otherwise create the GitHub branch from the current spec/plan branch HEAD:

```text
chatgpt/quant-interview-workstream-order-statistics-extremes-2026-08-23
```

Do not branch from `main`.

- [ ] **Step 2: Add temporary branch CI**