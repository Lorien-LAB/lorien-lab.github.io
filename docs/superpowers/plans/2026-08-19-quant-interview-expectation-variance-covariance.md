# Quant Interview Expectation, Variance & Covariance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the bounded `Probability & Statistics -> Expectation, Variance & Covariance` cross-book workstream with four canonical Knowledge nodes, thirteen new source-neutral S3+ Problems, one upgraded repository-authored seed Problem, and eighteen terminal hidden source rows.

**Architecture:** Keep the public system Topic-first and source-neutral. Establish the workstream and RED contracts first, author reusable Knowledge before Problems, stage item-level source ownership in the hidden ledgers, then build the thirteen distinct reasoning families in four reviewable Problem batches. Finish by strengthening coverage to strict target resolution, extending the exact global source-neutral regression, obtaining real GitHub Actions evidence, sealing HANDOFF, and removing temporary branch-only tooling.

**Tech Stack:** Astro 5 content collections, Markdown/YAML frontmatter, JSON workstream/coverage/source-topic data, JavaScript ES modules, Node.js built-in test runner, GitHub Actions, npm, TypeScript/Astro checks.

**Spec:** `docs/superpowers/specs/2026-08-19-quant-interview-expectation-variance-covariance-design.md`  
**Validator amendment:** `docs/superpowers/specs/2026-08-19-quant-interview-expectation-variance-covariance-validator-amendment.md`

## Global Constraints

- Durable base before this design cycle: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17` at `6cf73b16b57a1bc05ff39cd3dcb1769a733c3340`.
- Spec/plan branch: `chatgpt/quant-interview-expectation-variance-covariance-design-2026-08-19`.
- Planned implementation branch: `chatgpt/quant-interview-workstream-expectation-variance-covariance-2026-08-19`.
- At execution time, create the implementation branch/worktree from the **current plan commit** on the spec/plan branch so both approved design documents and this plan travel with the implementation.
- Workstream id: `probability-statistics-expectation-variance-covariance-009`.
- Canonical topics: `probability-statistics`, `expectation-variance-covariance`.
- New Knowledge slugs are fixed to: `expectation-linearity-indicators`, `conditional-expectation-tower-property`, `expectation-variance-covariance-algebra`, `moments-moment-generating-functions`.
- New Problem slugs are fixed to the thirteen slugs listed under **Exact Public Metadata** below unless a real semantic collision is discovered; in that case stop, revise the spec/plan, and merge rather than forcing a page.
- Existing `conditional-dice-expectation` remains a repository-authored canonical Problem with answer `2.75`; it gets linkage/navigation upgrades only and never becomes source-derived provenance.
- Claimed terminal rows: exactly `18 = 8 Green + 8 Red + 2 150` under the approved design.
- Terminal state distribution: exactly `13 canonical-problem + 2 knowledge-only + 2 variant + 1 merged-duplicate`.
- Green reviewed scope: source sections `4.4` and `4.5`, internal evidence range `108-115`; only `4.4.normal-moments` from 4.4 is claimed by 009.
- Red reviewed scope: source section `3.2.1`, internal evidence range `91-132`; only items `3.1`, `3.3`, `3.5`, `3.6`, `3.12`, `3.13`, `3.37`, and `3.38` are claimed by 009.
- 150 reviewed scope: source section `2.6`, internal evidence range `134-145`; only items `4` and `7` are claimed by 009.
- Make exactly one narrow source-topic-map correction: `green-book::4.4.normal-moments` changes from `random-variables-distributions` to `expectation-variance-covariance`. No other source-topic-map restructuring is authorized.
- `knowledge-only` is terminal only when the source-derived test remains visible in a public `## Interview Checks` section.
- Every new Problem is S3+: `## Problem`, `## Think Before Revealing`, at least two progressive `<details>` hints, `## Solution`, `## Why This Matters`, `## Common Mistakes`, `## Extensions`.
- Public content contains no book names, source question numbers, source pages, source-oriented ids, provenance fields, copied answer keys, or source ordering.
- Semantic deduplication is by mathematical reasoning identity, not wording similarity or shared technique.
- Scalar covariance/moment algebra belongs here; covariance/correlation matrices and PSD remain Linear Algebra ownership.
- Conditional expectation belongs here; probability-side `conditioning` retains Conditional Probability & Bayes ownership.
- Dynamic reroll/stop optimization remains Dynamic Programming / Optimal Stopping.
- HH/TT, HHH, martingale/optional-stopping, Markov hitting-time and random-walk items remain stochastic-process material.
- Random Ants and expected extrema remain Order Statistics & Extremes.
- 150 workstream-008 rows `2.6::1`, `2.6::2`, `2.6::3`, `2.6::5`, `2.6::6`, `2.6::8`, `2.6::9` remain owned by workstream 008.
- `4.5.sum-of-random-variables` remains outside 009 because its primary identity is simplex/geometric probability.
- Final verification commands are exactly `npm run test`, `npm run check`, `npm run build`.
- Do not write synthetic verification SHA/run IDs. Completion metadata uses a real content-complete commit and a real successful GitHub Actions run.
- Before integration, compare against the then-current durable Quant Interview base and semantically reconcile concurrent edits to shared files. Never force-push over other work and never touch `main`.
- Planning corpus delta `42 -> 55 Problems` and `33 -> 37 Knowledge` is an expected exact regression if the approved semantic structure remains unchanged, not a quota.

---

## File Structure Map

### New durable public Knowledge

```text
src/content/knowledge/concepts/
├── expectation-linearity-indicators.md
├── conditional-expectation-tower-property.md
├── expectation-variance-covariance-algebra.md
└── moments-moment-generating-functions.md
```

Each file owns one reusable concept layer and exposes public `## Interview Checks`.

### New durable public Problems

```text
src/content/problems/probability/
├── expected-pattern-count-by-indicators.md
├── expected-position-of-first-special-card.md
├── coupon-collector-expectations.md
├── recursive-dice-game-expected-payoff.md
├── expected-loops-from-random-pairings.md
├── geometric-waiting-time-mean-variance.md
├── normal-mgf-and-moments.md
├── expected-normal-cdf-of-normal-variable.md
├── optimal-hedge-ratio-by-variance-minimization.md
├── bernoulli-default-correlation-bounds.md
├── expected-radius-of-uniform-disk-point.md
├── fair-box-opening-price-by-expectation.md
└── multiplicative-wealth-expected-growth.md
```

### Existing public content touched only for graph integration

```text
src/content/problems/probability/conditional-dice-expectation.md
src/content/knowledge/concepts/conditioning.md
src/content/knowledge/concepts/correlation-matrix.md
src/content/knowledge/concepts/common-probability-distributions.md
src/content/knowledge/concepts/gaussian-lognormal-structure.md
src/content/knowledge/concepts/random-variable-transformations-convolution.md
src/content/knowledge/concepts/first-step-analysis.md
```

`recursion-problem-solving` is consumed by new Problem metadata/links; do not edit it unless reciprocal navigation is demonstrably useful and covered by the topic-only diff review.

### Hidden data

```text
src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json
src/data/quant-interview/coverage/green-book.json
src/data/quant-interview/coverage/red-book.json
src/data/quant-interview/coverage/150-most-frequently-asked.json
src/data/quant-interview/topics/source-topic-map.json   # one exact Green normal-moments correction only
```

### Tests

```text
tests/quant-interview-expectation-variance-covariance-workstream.test.mjs
tests/quant-interview-expectation-variance-covariance-content.test.mjs
tests/quant-interview-expectation-variance-covariance-completion.test.mjs
tests/quant-interview-source-neutral-content.test.mjs  # exact corpus regression update
tests/quant-interview-handoff.test.mjs                 # modify only if closure requires minimal sync
```

### Temporary branch tooling

```text
.github/workflows/quant-interview-expectation-variance-covariance-ci.yml
```

This workflow must be absent from the final durable product tree.

---

## Exact Public Metadata

Use these Knowledge metadata values:

```js
const knowledgeMeta = {
  'expectation-linearity-indicators': {
    title: 'Expectation, Linearity, and Indicator Variables',
    description: 'Compute expectations from discrete or continuous laws, exploit linearity without unnecessary independence assumptions, and turn random counts into sums of indicators.'
  },
  'conditional-expectation-tower-property': {
    title: 'Conditional Expectation and the Tower Property',
    description: 'Condition expectations on events, partitions, and random variables, then use total expectation and tower-property reasoning to simplify multi-stage random experiments.'
  },
  'expectation-variance-covariance-algebra': {
    title: 'Expectation, Variance, and Covariance Algebra',
    description: 'Derive scalar variance and covariance identities, analyze linear combinations of random variables, and distinguish independence from zero covariance.'
  },
  'moments-moment-generating-functions': {
    title: 'Moments and Moment Generating Functions',
    description: 'Use raw and central moments together with moment generating functions to compute distributional summaries while respecting moment and MGF existence conditions.'
  }
};
```

Every new Knowledge file uses:

```yaml
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-19
tags: [Probability, Expectation, Variance, Covariance]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
featured: false
related: []
relatedNotes: []
```

Use this exact Problem metadata table as the starting point. Difficulty values may only change if the implementation reviewer documents why the approved problem became materially easier/harder after semantic fusion.

```js
const problemMeta = {
  'expected-pattern-count-by-indicators': {
    problemId: 'expectation-variance-covariance-001',
    title: 'Expected Pattern Count with Overlap',
    description: 'Count expected occurrences of a fixed pattern with indicator variables and show why overlap-induced dependence does not invalidate linearity of expectation.',
    concepts: ['expectation-linearity-indicators'],
    techniques: [],
    relatedProblems: ['coupon-collector-expectations', 'expected-position-of-first-special-card'],
    family: 'indicator-pattern-counts',
    mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 10
  },
  'expected-position-of-first-special-card': {
    problemId: 'expectation-variance-covariance-002',
    title: 'Expected Position of the First Special Card',
    description: 'Use random-permutation symmetry and indicators to find the expected position of the first special object among ordinary and special objects.',
    concepts: ['expectation-linearity-indicators'],
    techniques: [],
    relatedProblems: ['fair-box-opening-price-by-expectation', 'coupon-collector-expectations'],
    family: 'first-special-position',
    mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 10
  },
  'coupon-collector-expectations': {
    problemId: 'expectation-variance-covariance-003',
    title: 'Coupon Collector Expectations',
    description: 'Decompose collection time into geometric waits and use indicators to compute both full-collection time and the expected number of distinct types observed.',
    concepts: ['expectation-linearity-indicators', 'common-probability-distributions'],
    techniques: [],
    relatedProblems: ['geometric-waiting-time-mean-variance', 'expected-pattern-count-by-indicators'],
    family: 'coupon-collector-expectations',
    mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15
  },
  'recursive-dice-game-expected-payoff': {
    problemId: 'expectation-variance-covariance-004',
    title: 'Recursive Dice Game Expected Payoff',
    description: 'Condition on the first roll and solve a self-consistency equation for the expected payoff of a dice game that may restart.',
    concepts: ['conditional-expectation-tower-property'],
    techniques: ['conditioning'],
    relatedProblems: ['conditional-dice-expectation', 'expected-loops-from-random-pairings'],
    family: 'recursive-expectation-fixed-point',
    mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 10
  },
  'expected-loops-from-random-pairings': {
    problemId: 'expectation-variance-covariance-005',
    title: 'Expected Loops from Random Pairings',
    description: 'Reduce a random-pairing loop problem by one component at a time and solve the resulting expectation recurrence.',
    concepts: ['conditional-expectation-tower-property'],
    techniques: ['recursion-problem-solving'],
    relatedProblems: ['recursive-dice-game-expected-payoff'],
    family: 'expectation-size-recursion',
    mathDifficulty: 3, insightDifficulty: 4, interviewDifficulty: 4, estimatedMinutes: 18
  },
  'geometric-waiting-time-mean-variance': {
    problemId: 'expectation-variance-covariance-006',
    title: 'Geometric Waiting Time: Mean and Variance',
    description: 'Derive the mean and variance of the trial number of the first success from series identities and first-step expectation recursion.',
    concepts: ['expectation-variance-covariance-algebra', 'common-probability-distributions', 'conditional-expectation-tower-property'],
    techniques: ['conditioning'],
    relatedProblems: ['coupon-collector-expectations'],
    family: 'geometric-moment-derivation',
    mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15
  },
  'normal-mgf-and-moments': {
    problemId: 'expectation-variance-covariance-007',
    title: 'Normal MGF and Moments',
    description: 'Derive the moment generating function of a general Normal variable and use its derivatives to recover important Gaussian moments.',
    concepts: ['moments-moment-generating-functions', 'expectation-variance-covariance-algebra', 'gaussian-lognormal-structure'],
    techniques: [],
    relatedProblems: ['expected-normal-cdf-of-normal-variable'],
    family: 'normal-mgf-moments',
    mathDifficulty: 3, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15
  },
  'expected-normal-cdf-of-normal-variable': {
    problemId: 'expectation-variance-covariance-008',
    title: 'Expected Normal CDF of a Normal Variable',
    description: 'Convert an expectation of the standard Normal CDF into a probability involving an independent Gaussian variable and apply the tower property.',
    concepts: ['conditional-expectation-tower-property', 'gaussian-lognormal-structure', 'random-variable-transformations-convolution'],
    techniques: ['conditioning'],
    relatedProblems: ['normal-mgf-and-moments'],
    family: 'tower-property-gaussian-expectation',
    mathDifficulty: 3, insightDifficulty: 4, interviewDifficulty: 4, estimatedMinutes: 15
  },
  'optimal-hedge-ratio-by-variance-minimization': {
    problemId: 'expectation-variance-covariance-009',
    title: 'Optimal Hedge Ratio by Variance Minimization',
    description: 'Expand the variance of a hedged return and derive the minimum-variance hedge ratio from scalar covariance and variance.',
    concepts: ['expectation-variance-covariance-algebra', 'correlation-matrix'],
    techniques: [],
    relatedProblems: ['bernoulli-default-correlation-bounds'],
    family: 'minimum-variance-hedge',
    mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 12
  },
  'bernoulli-default-correlation-bounds': {
    problemId: 'expectation-variance-covariance-010',
    title: 'Bernoulli Default Correlation Bounds',
    description: 'Combine fixed Bernoulli marginals with joint-probability bounds to determine the feasible covariance and correlation range of two default indicators.',
    concepts: ['expectation-variance-covariance-algebra', 'probability-axioms-derived-rules', 'correlation-matrix'],
    techniques: [],
    relatedProblems: ['optimal-hedge-ratio-by-variance-minimization'],
    family: 'bernoulli-correlation-feasibility',
    mathDifficulty: 3, insightDifficulty: 4, interviewDifficulty: 4, estimatedMinutes: 18
  },
  'expected-radius-of-uniform-disk-point': {
    problemId: 'expectation-variance-covariance-011',
    title: 'Expected Radius of a Uniform Point in a Disk',
    description: 'Derive the radial density of a point chosen uniformly by area in a disk and compute its expected distance from the center.',
    concepts: ['expectation-linearity-indicators', 'symmetry-equiprobability-geometric-probability'],
    techniques: [],
    relatedProblems: [],
    family: 'continuous-expectation-geometry',
    mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 12
  },
  'fair-box-opening-price-by-expectation': {
    problemId: 'expectation-variance-covariance-012',
    title: 'Fair Box-Opening Price by Expectation',
    description: 'Use the expected position of a hidden prize in a random opening order to derive the fair per-box cost of the game.',
    concepts: ['expectation-linearity-indicators'],
    techniques: [],
    relatedProblems: ['expected-position-of-first-special-card'],
    family: 'fair-value-expected-position',
    mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 10
  },
  'multiplicative-wealth-expected-growth': {
    problemId: 'expectation-variance-covariance-013',
    title: 'Multiplicative Wealth and Expected Growth',
    description: 'Use independence to compute expected wealth under repeated multiplicative bets and distinguish arithmetic expected growth from log or geometric growth.',
    concepts: ['expectation-linearity-indicators'],
    techniques: [],
    relatedProblems: [],
    family: 'independent-product-expectation',
    mathDifficulty: 2, insightDifficulty: 4, interviewDifficulty: 4, estimatedMinutes: 12
  }
};
```

Every new Problem also uses:

```yaml
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
prerequisites: []
status: solved
featured: false
```

Populate `concepts`, `techniques`, `relatedProblems`, `family`, difficulty fields, and `estimatedMinutes` from `problemMeta`.

---

## Exact Hidden Source Inventory

Use the following canonical ledger targets. Preserve unrelated ledger rows exactly.

### Green

```text
4.4.normal-moments:: -> variant -> normal-mgf-and-moments -> moments-moment-generating-functions
4.5:: -> knowledge-only -> expectation-linearity-indicators, conditional-expectation-tower-property, expectation-variance-covariance-algebra
4.5.connecting-noodles:: -> canonical-problem -> expected-loops-from-random-pairings -> conditional-expectation-tower-property
4.5.optimal-hedge-ratio:: -> canonical-problem -> optimal-hedge-ratio-by-variance-minimization -> expectation-variance-covariance-algebra
4.5.dice-game:: -> canonical-problem -> recursive-dice-game-expected-payoff -> conditional-expectation-tower-property
4.5.card-game:: -> canonical-problem -> expected-position-of-first-special-card -> expectation-linearity-indicators
4.5.coupon-collection:: -> canonical-problem -> coupon-collector-expectations -> expectation-linearity-indicators, common-probability-distributions
4.5.joint-default-probability:: -> canonical-problem -> bernoulli-default-correlation-bounds -> expectation-variance-covariance-algebra, probability-axioms-derived-rules
```

`::` after a Green section denotes `sourceItem: null`; these are section-level rows, not item-level overrides.

### Red

```text
3.2.1::3.1  -> knowledge-only -> expectation-linearity-indicators
3.2.1::3.3  -> canonical-problem -> fair-box-opening-price-by-expectation -> expectation-linearity-indicators
3.2.1::3.5  -> canonical-problem -> multiplicative-wealth-expected-growth -> expectation-linearity-indicators
3.2.1::3.6  -> canonical-problem -> geometric-waiting-time-mean-variance -> expectation-variance-covariance-algebra, common-probability-distributions, conditional-expectation-tower-property
3.2.1::3.12 -> canonical-problem -> expected-pattern-count-by-indicators -> expectation-linearity-indicators
3.2.1::3.13 -> canonical-problem -> expected-radius-of-uniform-disk-point -> expectation-linearity-indicators, symmetry-equiprobability-geometric-probability
3.2.1::3.37 -> canonical-problem -> normal-mgf-and-moments -> moments-moment-generating-functions, expectation-variance-covariance-algebra, gaussian-lognormal-structure
3.2.1::3.38 -> variant -> expected-normal-cdf-of-normal-variable -> conditional-expectation-tower-property, gaussian-lognormal-structure
```

### 150 Questions

```text
2.6::4 -> merged-duplicate -> expected-radius-of-uniform-disk-point -> expectation-linearity-indicators, symmetry-equiprobability-geometric-probability
2.6::7 -> canonical-problem -> expected-normal-cdf-of-normal-variable -> conditional-expectation-tower-property, gaussian-lognormal-structure
```

Required resolution-note meaning:

```text
Green normal moments: standard-normal MGF/moment route enriches the general Normal canonical Problem; 008 intentionally left it for 009.
Green 4.5 theory: fused scalar expectation/conditional-expectation/variance-covariance theory; public Interview Checks preserve low-complexity source tests.
Connecting noodles: ordinary size-reduction expectation recursion, not stochastic-process ownership.
Optimal hedge: scalar variance/covariance minimization; matrix PSD remains Linear Algebra.
Recursive dice: fixed-point expectation recursion distinct from the repository-authored one-step dice seed.
First special card: random-permutation symmetry plus indicators, distinct from pattern-count and coupon-count identities.
Coupon collector: geometric waiting increments plus indicator linearity; no Markov machinery required.
Joint default: fixed-marginal Bernoulli scalar correlation feasibility; matrix PSD remains separate.
Red fair die: low-complexity expectation remains an Interview Check rather than a thin Problem.
Fair boxes: strategy collapses after start; fair value comes from expected winning position.
Multiplicative wealth: independent-product expectation; log-growth distinction is an extension, not Kelly optimization.
Geometric moments: derive mean/variance rather than merely recognize the distribution.
Pattern count: overlapping indicators may be dependent; linearity does not require independence.
Disk radius: general radius-R expectation is the canonical identity.
Normal MGF: general Normal MGF subsumes standard-normal moment calculation.
Red E[Phi(X)]: standard-normal special case/alternative method enriches the general canonical page.
150 disk: unit disk is a merged duplicate of the general radius-R canonical page.
150 E[Phi(X)]: general Normal form owns the canonical Problem.
```

---

## Mathematical Contracts

```text
Linearity:
E[aX+bY] = aE[X] + bE[Y] whenever expectations exist; no independence is required.
If X,Y are independent and the product expectation exists, E[XY]=E[X]E[Y].
For an indicator I_A, E[I_A]=P(A).

Variance/covariance:
Var(X)=E[X^2]-E[X]^2.
Cov(X,Y)=E[XY]-E[X]E[Y].
Var(X+Y)=Var(X)+Var(Y)+2Cov(X,Y).
Independence => zero covariance when moments exist; converse fails in general.

Tower property:
E[E[X|Y]]=E[X].
For nested information, E[E[X|Y,Z]|Y]=E[X|Y].

First special position:
With m ordinary and n special objects in a uniformly random permutation,
E[T]=1+m/(n+1)=(m+n+1)/(n+1).
For 48 ordinary cards and 4 aces, E[T]=10.6.

Coupon collector:
Expected time to collect N types = N H_N.
Expected distinct types after k draws = N[1-(1-1/N)^k].

Recursive dice:
The approved recursive payoff game gives expected value 7 via a self-consistency equation.

Random pairings:
E_n=E_{n-1}+1/(2n-1), so E_n=sum_{k=1}^n 1/(2k-1).

Geometric waiting time:
P(N=k)=(1-p)^(k-1)p.
E[N]=1/p.
Var(N)=(1-p)/p^2.

Normal MGF:
For X~N(mu,sigma^2), M_X(t)=exp(mu t + sigma^2 t^2/2).
E[X^2]=mu^2+sigma^2.
For Z~N(0,1), E[Z]=0, E[Z^2]=1, E[Z^3]=0, E[Z^4]=3.

Normal-CDF expectation:
For X~N(mu,sigma^2), E[Phi(X)]=Phi(mu/sqrt(1+sigma^2)).
Checks: mu=0 gives 1/2; sigma->0 gives Phi(mu).

Minimum-variance hedge:
Var(R_A-hR_B)=Var(R_A)-2hCov(R_A,R_B)+h^2Var(R_B).
h*=Cov(R_A,R_B)/Var(R_B)=rho sigma_A/sigma_B when Var(R_B)>0.

Bernoulli defaults:
Cov(I_A,I_B)=P(A∩B)-P(A)P(B).
Frechet bounds on P(A∩B) determine the feasible covariance/correlation interval; fixed marginals need not permit correlation ±1.

Uniform disk:
For a point uniform by area in a disk of radius R, f_r(r)=2r/R^2 on [0,R] and E[r]=2R/3.

Fair boxes:
Winning position K is uniform on {1,...,n}, E[K]=(n+1)/2, and fair per-open cost is X_fair=2V/(n+1).

Multiplicative wealth:
W_n=W_0 product_i M_i and independence gives E[W_n]=W_0 product_i E[M_i].
For multipliers 2 and 1/2 with equal probability, E[M]=5/4 and E[W_n]=W_0(5/4)^n.
Expected wealth growth is not the same object as expected log growth.
```

---

### Task 1: Create the Implementation Branch, Temporary CI, and Active Workstream Registration

**Files:**
- Create on implementation branch: `.github/workflows/quant-interview-expectation-variance-covariance-ci.yml`
- Create: `tests/quant-interview-expectation-variance-covariance-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json`

**Interfaces:**
- Consumes: approved spec, validator amendment, taxonomy, source-topic map, three verified source manifests, `validateTopicWorkstream(workstream, context)`.
- Produces: isolated implementation branch, branch-only CI, and an `active` workstream registration consumed by Tasks 4, 10, and 11.

- [ ] **Step 1: Create the isolated implementation branch/worktree from the plan commit**

Use `superpowers:using-git-worktrees` at execution time if a local git worktree is available. The branch name is exact:

```bash
git switch chatgpt/quant-interview-expectation-variance-covariance-design-2026-08-19
git pull --ff-only
git switch -c chatgpt/quant-interview-workstream-expectation-variance-covariance-2026-08-19
```

If the execution environment uses a GitHub branch API instead of local git, create the branch from the current spec/plan branch HEAD. Do not create it from `main`.

- [ ] **Step 2: Add temporary branch CI**

Create `.github/workflows/quant-interview-expectation-variance-covariance-ci.yml` exactly:

```yaml
name: Quant Interview Expectation Variance Covariance CI
on:
  push:
    branches:
      - chatgpt/quant-interview-workstream-expectation-variance-covariance-2026-08-19
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

Commit the workflow alone first so inherited `test/check/build` can prove the branch baseline before 009 RED work begins.

```bash
git add .github/workflows/quant-interview-expectation-variance-covariance-ci.yml
git commit -m "ci: add expectation variance covariance branch checks"
```

- [ ] **Step 3: Run inherited baseline locally**

```bash
npm ci
npm run test
npm run check
npm run build
```

Expected: all three verification commands pass before any 009 product mutation.

- [ ] **Step 4: Write the registration RED test**

Create `tests/quant-interview-expectation-variance-covariance-workstream.test.mjs` beginning with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json';
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;
const terminalStates = new Set(['canonical-problem', 'merged-duplicate', 'variant', 'knowledge-only']);

async function context() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/${source}.json`)]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(files.filter((file) => String(file).endsWith('.md')).map((file) => path.basename(String(file), '.md')));
}

test('ninth cross-book workstream is bounded to expectation variance covariance', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'probability-statistics-expectation-variance-covariance-009');
  assert.deepEqual(workstream.canonicalTopics, ['probability-statistics', 'expectation-variance-covariance']);
  assert.match(workstream.status, /^(?:active|complete)$/);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
});

test('workstream records the exact bounded source review ranges', async () => {
  const workstream = await readJson(workstreamPath);
  const green = workstream.sourceScopes.find((scope) => scope.source === 'green-book');
  const red = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  const q150 = workstream.sourceScopes.find((scope) => scope.source === '150-most-frequently-asked');

  assert.deepEqual(green?.sourceSections, ['4.4', '4.5']);
  assert.deepEqual(green?.evidencePageRanges, [{ startPage: 108, endPage: 115 }]);
  assert.match(green?.reviewNote ?? '', /normal moments|4\.4\.normal-moments/i);
  assert.match(green?.reviewNote ?? '', /sum-of-random-variables|simplex/i);
  assert.match(green?.reviewNote ?? '', /order statistics|Random Ants/i);

  assert.deepEqual(red?.sourceSections, ['3.2.1']);
  assert.deepEqual(red?.evidencePageRanges, [{ startPage: 91, endPage: 132 }]);
  for (const item of ['3.1', '3.3', '3.5', '3.6', '3.12', '3.13', '3.37', '3.38']) {
    assert.match(red?.reviewNote ?? '', new RegExp(item.replace('.', '\\.')));
  }
  assert.match(red?.reviewNote ?? '', /optimal stopping|3\.2/);
  assert.match(red?.reviewNote ?? '', /martingale|3\.7|3\.8|3\.9/i);
  assert.match(red?.reviewNote ?? '', /order statistics|3\.29|3\.32/i);

  assert.deepEqual(q150?.sourceSections, ['2.6']);
  assert.deepEqual(q150?.evidencePageRanges, [{ startPage: 134, endPage: 145 }]);
  assert.match(q150?.reviewNote ?? '', /items? 4 and 7|4.*7/i);
  assert.match(q150?.reviewNote ?? '', /already.*008|workstream 008/i);
});
```

- [ ] **Step 5: Run registration RED**

```bash
node --test tests/quant-interview-expectation-variance-covariance-workstream.test.mjs
```

Expected: FAIL with `ENOENT` for `probability-statistics-expectation-variance-covariance-009.json`.

- [ ] **Step 6: Create the active workstream registration**

Create `src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json` exactly in this shape:

```json
{
  "id": "probability-statistics-expectation-variance-covariance-009",
  "canonicalTopics": [
    "probability-statistics",
    "expectation-variance-covariance"
  ],
  "status": "active",
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": ["4.4", "4.5"],
      "evidencePageRanges": [{"startPage": 108, "endPage": 115}],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Claim Green 4.4.normal-moments plus the expectation/variance/covariance theory and the connecting-noodles, optimal-hedge-ratio, dice-game, card-game, coupon-collection, and joint-default-probability identities from 4.5. The 4.5 sum-of-random-variables simplex problem remains geometric probability, while 4.6 order statistics and Random Ants remain outside this workstream."
    },
    {
      "source": "red-book",
      "sourceSections": ["3.2.1"],
      "evidencePageRanges": [{"startPage": 91, "endPage": 132}],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Claim items 3.1, 3.3, 3.5, 3.6, 3.12, 3.13, 3.37, and 3.38 only. Item 3.2 remains optimal stopping/dynamic programming; 3.7-3.9 and process/martingale waiting-time items remain stochastic-process material; 3.29/3.32 remain order statistics; 3.35 remains the existing Linear Algebra covariance/PSD family; 3.36 remains later change-of-measure material."
    },
    {
      "source": "150-most-frequently-asked",
      "sourceSections": ["2.6"],
      "evidencePageRanges": [{"startPage": 134, "endPage": 145}],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Claim items 4 and 7 only for disk expectation and the Normal-CDF expectation. Items 1, 2, 3, 5, 6, 8, and 9 are already terminal in workstream 008 and must not be re-owned; martingale, Brownian, Ito, and related stochastic-process material remains outside this workstream."
    }
  ]
}
```

- [ ] **Step 7: Add generic workstream validation and turn registration GREEN**

Append:

```js
test('existing workstream validator accepts workstream 009 registration', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});
```

Run:

```bash
node --test tests/quant-interview-expectation-variance-covariance-workstream.test.mjs
npm run check
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit the active registration**

```bash
git add tests/quant-interview-expectation-variance-covariance-workstream.test.mjs src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json
git commit -m "feat: register expectation variance covariance workstream"
```

---

### Task 2: Build Expectation/Indicator and Conditional-Expectation Knowledge

**Files:**
- Create: `tests/quant-interview-expectation-variance-covariance-content.test.mjs`
- Create: `src/content/knowledge/concepts/expectation-linearity-indicators.md`
- Create: `src/content/knowledge/concepts/conditional-expectation-tower-property.md`

**Interfaces:**
- Produces: `expectation-linearity-indicators`, `conditional-expectation-tower-property` used by Tasks 4-9.
- Consumes: existing `conditioning`, `common-probability-distributions`, and source-neutral Knowledge conventions.

- [ ] **Step 1: Write Knowledge RED contracts**

Create the content test with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (file) => readFile(file, 'utf8');
const topicLine = /^quantInterviewTopics:\s*\[probability-statistics, expectation-variance-covariance\]$/m;

function assertInterviewChecks(text, id) {
  assert.match(text, /^## Interview Checks$/m, `${id} missing Interview Checks`);
}

test('expectation Knowledge separates linearity from independence', async () => {
  const text = await read('src/content/knowledge/concepts/expectation-linearity-indicators.md');
  assert.match(text, topicLine);
  assert.match(text, /discrete.*expectation|sum.*x.*P/i);
  assert.match(text, /continuous.*expectation|integral/i);
  assert.match(text, /LOTUS|E\[g\(X\)\]/i);
  assert.match(text, /linearity/i);
  assert.match(text, /does not require independence|without.*independence/i);
  assert.match(text, /E\[I|indicator/i);
  assert.match(text, /E\[XY\]|product.*expectation/i);
  assert.match(text, /existence|finite expectation/i);
  assertInterviewChecks(text, 'expectation-linearity-indicators');
  assert.match(text, /fair die|six-sided die/i);
  assert.match(text, /overlap|dependent indicator/i);
});

test('conditional expectation Knowledge teaches total expectation and tower property', async () => {
  const text = await read('src/content/knowledge/concepts/conditional-expectation-tower-property.md');
  assert.match(text, topicLine);
  assert.match(text, /E\[X\s*\|\s*A\]|conditional expectation/i);
  assert.match(text, /E\[X\s*\|\s*Y\]/i);
  assert.match(text, /law of total expectation|total expectation/i);
  assert.match(text, /tower property/i);
  assert.match(text, /E\[E\[X.*Y.*\]\].*E\[X\]|E\[X\].*tower/i);
  assert.match(text, /first-step|recurs/i);
  assert.match(text, /Markov|stochastic process/i);
  assertInterviewChecks(text, 'conditional-expectation-tower-property');
});
```

- [ ] **Step 2: Run Knowledge RED**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
```

Expected: both new Knowledge files fail with `ENOENT`.

- [ ] **Step 3: Implement `expectation-linearity-indicators.md`**

Use the exact Knowledge metadata from `knowledgeMeta`. Required body order:

```markdown
## Core Idea
## Discrete and Continuous Expectation
## LOTUS: Expectation of a Function
## Linearity Does Not Require Independence
## When Product Expectations Factor
## Indicator Variables and Expected Counts
## Existence Before Algebra
## Recognition Patterns
## Common Mistakes
## Interview Checks
```

The page must explicitly state:

```text
E[aX+bY]=aE[X]+bE[Y]
E[1_A]=P(A)
independence is not needed for linearity
independence is sufficient for E[XY]=E[X]E[Y] when the expectations exist
```

Interview Checks must include the fair die `3.5`, an overlapping/dependent-indicator question, a product-expectation question, and an existence check linked conceptually to Cauchy without duplicating the distribution page.

- [ ] **Step 4: Implement `conditional-expectation-tower-property.md`**

Use the exact Knowledge metadata from `knowledgeMeta`. Required body order:

```markdown
## Core Idea
## Conditioning on an Event
## Conditioning on a Partition
## Conditional Expectation Given a Random Variable
## Law of Total Expectation
## Tower Property
## First-Step Expectation Recursion
## Boundary: When This Becomes a Stochastic-Process Problem
## Common Mistakes
## Interview Checks
```

State the tower identities and explain that a state-rich hitting-time recursion belongs to `first-step-analysis`, while a scalar/fixed-point expectation recursion can remain here.

- [ ] **Step 5: Run GREEN verification**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
npm run check
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit the first two Knowledge nodes**

```bash
git add tests/quant-interview-expectation-variance-covariance-content.test.mjs src/content/knowledge/concepts/expectation-linearity-indicators.md src/content/knowledge/concepts/conditional-expectation-tower-property.md
git commit -m "feat: add expectation and tower property knowledge"
```

---

### Task 3: Build Variance/Covariance and Moments/MGF Knowledge

**Files:**
- Modify: `tests/quant-interview-expectation-variance-covariance-content.test.mjs`
- Create: `src/content/knowledge/concepts/expectation-variance-covariance-algebra.md`
- Create: `src/content/knowledge/concepts/moments-moment-generating-functions.md`

**Interfaces:**
- Produces: scalar variance/covariance and MGF Knowledge consumed by Tasks 4, 7, 9.
- Preserves: Linear Algebra ownership of matrix covariance/PSD and workstream-008 ownership of distribution structure.

- [ ] **Step 1: Add RED contracts for the remaining Knowledge**

Append:

```js
test('variance covariance Knowledge owns scalar algebra but not matrix PSD', async () => {
  const text = await read('src/content/knowledge/concepts/expectation-variance-covariance-algebra.md');
  assert.match(text, topicLine);
  assert.match(text, /Var\(X\).*E\[X\^2\]|E\[X\^2\].*E\[X\]/i);
  assert.match(text, /Cov\(X,Y\)|Cov\(X,\s*Y\)/i);
  assert.match(text, /E\[XY\].*E\[X\].*E\[Y\]/i);
  assert.match(text, /bilinear|bilinearity/i);
  assert.match(text, /Var\(X\+Y\)|2.*Cov/i);
  assert.match(text, /independ.*zero covariance|zero covariance.*independ/i);
  assert.match(text, /does not imply independence|not.*converse/i);
  assert.match(text, /correlation/i);
  assert.match(text, /matrix|PSD|positive semidefinite/i);
  assertInterviewChecks(text, 'expectation-variance-covariance-algebra');
});

test('moments MGF Knowledge includes existence conditions and Normal example', async () => {
  const text = await read('src/content/knowledge/concepts/moments-moment-generating-functions.md');
  assert.match(text, topicLine);
  assert.match(text, /raw moment/i);
  assert.match(text, /central moment/i);
  assert.match(text, /M_X|moment generating function|MGF/i);
  assert.match(text, /derivative|M_X.*0/i);
  assert.match(text, /neighborhood.*zero|exist.*near.*zero/i);
  assert.match(text, /Cauchy/i);
  assert.match(text, /Normal|Gaussian/i);
  assertInterviewChecks(text, 'moments-moment-generating-functions');
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
```

Expected: only the two new Knowledge contracts fail with `ENOENT`.

- [ ] **Step 3: Implement `expectation-variance-covariance-algebra.md`**

Required body order:

```markdown
## Core Idea
## Variance from the First Two Moments
## Covariance
## Bilinearity
## Variance of Linear Combinations
## Independence and Zero Covariance
## Scalar Correlation
## Boundary: Covariance Matrices and PSD
## Common Mistakes
## Interview Checks
```

Include the exact scalar identities in **Mathematical Contracts** and a clear related-navigation boundary to `correlation-matrix`.

- [ ] **Step 4: Implement `moments-moment-generating-functions.md`**

Required body order:

```markdown
## Core Idea
## Raw and Central Moments
## Moment Generating Functions
## Recovering Moments from Derivatives
## Existence Conditions
## Normal MGF as a Worked Example
## What an MGF Does Not Guarantee
## Common Mistakes
## Interview Checks
```

Do not recreate the full Cauchy distribution page. Use it only as the moment/MGF existence counterexample and link conceptually to `common-probability-distributions`.

- [ ] **Step 5: Run GREEN verification**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
npm run check
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit the remaining Knowledge**

```bash
git add tests/quant-interview-expectation-variance-covariance-content.test.mjs src/content/knowledge/concepts/expectation-variance-covariance-algebra.md src/content/knowledge/concepts/moments-moment-generating-functions.md
git commit -m "feat: add scalar moment and MGF knowledge"
```

---

### Task 4: Correct Green Normal-Moment Mapping and Stage All 18 Hidden Coverage Rows

**Files:**
- Modify: `tests/quant-interview-expectation-variance-covariance-workstream.test.mjs`
- Modify: `src/data/quant-interview/topics/source-topic-map.json`
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/coverage/red-book.json`
- Modify: `src/data/quant-interview/coverage/150-most-frequently-asked.json`

**Interfaces:**
- Consumes: the four Knowledge slugs from Tasks 2-3 and future Problem slugs declared in the approved design.
- Produces: exact terminal semantic ownership for all 18 source rows. Generic ledger validation is deliberately run with `allowUnresolvedCanonicalRefs: true` in this intermediate task because the thirteen Problem files do not exist yet; Task 9 strengthens the same test to `false`.

- [ ] **Step 1: Add RED inventory and source-map tests**

Append to the workstream test:

```js
const expectedCoverageKeys = {
  'green-book': [
    '4.4.normal-moments::',
    '4.5::',
    '4.5.connecting-noodles::',
    '4.5.optimal-hedge-ratio::',
    '4.5.dice-game::',
    '4.5.card-game::',
    '4.5.coupon-collection::',
    '4.5.joint-default-probability::',
  ],
  'red-book': [
    '3.2.1::3.1', '3.2.1::3.3', '3.2.1::3.5', '3.2.1::3.6',
    '3.2.1::3.12', '3.2.1::3.13', '3.2.1::3.37', '3.2.1::3.38',
  ],
  '150-most-frequently-asked': ['2.6::4', '2.6::7'],
};

test('Green normal moments map to expectation variance covariance at source-section level', async () => {
  const map = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const row = map.entries.find((entry) => entry.source === 'green-book' && entry.sourceSection === '4.4.normal-moments');
  assert.ok(row);
  assert.deepEqual(row.canonicalTopics, ['expectation-variance-covariance']);
});

test('exactly eighteen source rows are claimed by workstream 009', async () => {
  assert.equal(Object.values(expectedCoverageKeys).flat().length, 18);
  for (const [source, keys] of Object.entries(expectedCoverageKeys)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));
    for (const key of keys) assert.ok(rows.has(key), `${source} missing ${key}`);
  }
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-expectation-variance-covariance-workstream.test.mjs
```

Expected: FAIL because the Green source-map row still points to Random Variables and the new Red/150 item rows do not yet exist.

- [ ] **Step 3: Correct exactly one source-topic-map entry**

Change only:

```json
{
  "source": "green-book",
  "sourceSection": "4.4.normal-moments",
  "role": "content",
  "canonicalTopics": [
    "expectation-variance-covariance"
  ]
}
```

Do not modify any other source-topic-map entry.

- [ ] **Step 4: Resolve the eight Green rows**

Update existing section-level rows to the following exact semantic targets. Keep unrelated fields/rows intact.

```json
{
  "sourceSection": "4.4.normal-moments",
  "sourceItem": null,
  "canonicalTopics": ["expectation-variance-covariance"],
  "state": "variant",
  "canonicalProblems": ["normal-mgf-and-moments"],
  "canonicalKnowledge": ["moments-moment-generating-functions"],
  "resolutionNote": "Standard-normal MGF and moment calculations enrich the general Normal MGF/moments canonical Problem; workstream 008 intentionally left this expectation-heavy identity for the Expectation, Variance & Covariance workstream."
}
```

```json
{
  "sourceSection": "4.5",
  "sourceItem": null,
  "canonicalTopics": ["expectation-variance-covariance"],
  "state": "knowledge-only",
  "canonicalProblems": [],
  "canonicalKnowledge": ["expectation-linearity-indicators", "conditional-expectation-tower-property", "expectation-variance-covariance-algebra"],
  "resolutionNote": "The section-level theory is fused into reusable expectation, conditional-expectation, and scalar variance/covariance Knowledge. Its low-complexity interview tests remain publicly visible through Interview Checks rather than thin source-specific Problems."
}
```

Use the same field order for the six Green canonical Problems:

```js
const greenResolutions = {
  '4.5.connecting-noodles': {
    canonicalProblems: ['expected-loops-from-random-pairings'],
    canonicalKnowledge: ['conditional-expectation-tower-property'],
    resolutionNote: 'Ordinary size-reduction expectation recursion; no Markov-chain, martingale, or other stochastic-process machinery is required.'
  },
  '4.5.optimal-hedge-ratio': {
    canonicalProblems: ['optimal-hedge-ratio-by-variance-minimization'],
    canonicalKnowledge: ['expectation-variance-covariance-algebra'],
    resolutionNote: 'Scalar variance/covariance minimization defines the canonical identity; covariance-matrix PSD and spectral feasibility remain Linear Algebra ownership.'
  },
  '4.5.dice-game': {
    canonicalProblems: ['recursive-dice-game-expected-payoff'],
    canonicalKnowledge: ['conditional-expectation-tower-property'],
    resolutionNote: 'A self-consistency expectation equation creates a distinct recursive-payoff identity from the repository-authored one-step conditional-dice seed.'
  },
  '4.5.card-game': {
    canonicalProblems: ['expected-position-of-first-special-card'],
    canonicalKnowledge: ['expectation-linearity-indicators'],
    resolutionNote: 'Random-permutation symmetry plus indicators determines the first-special position and remains distinct from pattern-count and coupon-count indicator constructions.'
  },
  '4.5.coupon-collection': {
    canonicalProblems: ['coupon-collector-expectations'],
    canonicalKnowledge: ['expectation-linearity-indicators', 'common-probability-distributions'],
    resolutionNote: 'Geometric waiting increments give the full-collection time while indicators give the expected distinct-count formula; no process-level state machinery is required.'
  },
  '4.5.joint-default-probability': {
    canonicalProblems: ['bernoulli-default-correlation-bounds'],
    canonicalKnowledge: ['expectation-variance-covariance-algebra', 'probability-axioms-derived-rules'],
    resolutionNote: 'Fixed-marginal Bernoulli joint-probability bounds determine scalar covariance/correlation feasibility; matrix PSD remains a separate Linear Algebra identity.'
  }
};
```

For each key, set `sourceItem: null`, `canonicalTopics: ['expectation-variance-covariance']`, `state: 'canonical-problem'`, and the listed targets/note.

- [ ] **Step 5: Add/resolve the eight Red item rows**

Insert or update rows with `sourceSection: '3.2.1'`, `canonicalTopics: ['expectation-variance-covariance']` and these exact target states:

```js
const redResolutions = {
  '3.1':  { state: 'knowledge-only', canonicalProblems: [], canonicalKnowledge: ['expectation-linearity-indicators'], resolutionNote: 'The fair-die expected value is a low-complexity expectation check and remains publicly testable through the canonical expectation Knowledge Interview Checks rather than a thin standalone Problem.' },
  '3.3':  { state: 'canonical-problem', canonicalProblems: ['fair-box-opening-price-by-expectation'], canonicalKnowledge: ['expectation-linearity-indicators'], resolutionNote: 'Once the symmetric box game is worth starting, continuation only improves after misses; the canonical mathematical load is expected winning position and fair value.' },
  '3.5':  { state: 'canonical-problem', canonicalProblems: ['multiplicative-wealth-expected-growth'], canonicalKnowledge: ['expectation-linearity-indicators'], resolutionNote: 'Independent multiplicative factors give a product-expectation identity; expected wealth growth is kept distinct from log/geometric growth and Kelly optimization.' },
  '3.6':  { state: 'canonical-problem', canonicalProblems: ['geometric-waiting-time-mean-variance'], canonicalKnowledge: ['expectation-variance-covariance-algebra', 'common-probability-distributions', 'conditional-expectation-tower-property'], resolutionNote: 'The item asks for first-principles derivation of geometric mean and variance, not merely recognition of the Geometric distribution.' },
  '3.12': { state: 'canonical-problem', canonicalProblems: ['expected-pattern-count-by-indicators'], canonicalKnowledge: ['expectation-linearity-indicators'], resolutionNote: 'Overlapping pattern indicators can be dependent, but linearity of expectation still gives the expected count; this dependence boundary is the canonical insight.' },
  '3.13': { state: 'canonical-problem', canonicalProblems: ['expected-radius-of-uniform-disk-point'], canonicalKnowledge: ['expectation-linearity-indicators', 'symmetry-equiprobability-geometric-probability'], resolutionNote: 'The canonical page generalizes the disk to radius R and derives the expected radius; the betting wrapper is retained only as an extension.' },
  '3.37': { state: 'canonical-problem', canonicalProblems: ['normal-mgf-and-moments'], canonicalKnowledge: ['moments-moment-generating-functions', 'expectation-variance-covariance-algebra', 'gaussian-lognormal-structure'], resolutionNote: 'The general Normal MGF and second-moment calculation owns the canonical identity and absorbs the standard-normal moment variant from another source.' },
  '3.38': { state: 'variant', canonicalProblems: ['expected-normal-cdf-of-normal-variable'], canonicalKnowledge: ['conditional-expectation-tower-property', 'gaussian-lognormal-structure'], resolutionNote: 'The standard-normal E[Phi(X)]=1/2 case is a special case and alternative symmetry/PIT perspective inside the general Normal canonical Problem.' }
};
```

No `topicOverrideReason` is needed because `expectation-variance-covariance` falls under the mapped `probability-statistics` branch for `3.2.1`.

- [ ] **Step 6: Add/resolve the two 150 rows**

Insert/update:

```json
{
  "sourceSection": "2.6",
  "sourceItem": "4",
  "canonicalTopics": ["expectation-variance-covariance"],
  "state": "merged-duplicate",
  "canonicalProblems": ["expected-radius-of-uniform-disk-point"],
  "canonicalKnowledge": ["expectation-linearity-indicators", "symmetry-equiprobability-geometric-probability"],
  "resolutionNote": "The unit-disk expected-radius item is the R=1 instance of the general radius-R canonical Problem and contributes no separate reasoning identity."
}
```

```json
{
  "sourceSection": "2.6",
  "sourceItem": "7",
  "canonicalTopics": ["expectation-variance-covariance"],
  "state": "canonical-problem",
  "canonicalProblems": ["expected-normal-cdf-of-normal-variable"],
  "canonicalKnowledge": ["conditional-expectation-tower-property", "gaussian-lognormal-structure"],
  "resolutionNote": "The general Normal E[Phi(X)] identity owns the canonical Problem; the standard-normal special case from another source is retained as a variant and alternative method."
}
```

- [ ] **Step 7: Add exact state/target assertions and intermediate ledger validation**

Append tests that assert the state distribution and current targets:

```js
test('claimed 009 rows have the approved terminal state distribution', async () => {
  const counts = new Map();
  for (const [source, keys] of Object.entries(expectedCoverageKeys)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));
    for (const key of keys) {
      const row = rows.get(key);
      assert.ok(row);
      assert.ok(terminalStates.has(row.state), `${source} ${key} is not terminal`);
      assert.ok((row.resolutionNote ?? '').trim(), `${source} ${key} lacks resolutionNote`);
      assert.ok(row.canonicalTopics.includes('expectation-variance-covariance'));
      counts.set(row.state, (counts.get(row.state) ?? 0) + 1);
    }
  }
  assert.equal(counts.get('canonical-problem'), 13);
  assert.equal(counts.get('knowledge-only'), 2);
  assert.equal(counts.get('variant'), 2);
  assert.equal(counts.get('merged-duplicate'), 1);
});

test('coverage ledgers remain structurally valid while future Problem targets are staged', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');
  for (const source of Object.keys(expectedCoverageKeys)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      sourceTopicMap, taxonomy, problemSlugs, knowledgeSlugs,
      allowUnresolvedCanonicalRefs: true,
    }));
  }
});
```

Also assert the seven workstream-008 150 rows remain unchanged and do not contain `expectation-variance-covariance`.

- [ ] **Step 8: Run staged coverage GREEN**

```bash
node --test tests/quant-interview-expectation-variance-covariance-workstream.test.mjs
npm run check
npm run build
```

Expected: PASS with unresolved future Problem slugs allowed only in this intermediate test.

- [ ] **Step 9: Commit source-map correction and hidden ownership together**

```bash
git add tests/quant-interview-expectation-variance-covariance-workstream.test.mjs src/data/quant-interview/topics/source-topic-map.json src/data/quant-interview/coverage/green-book.json src/data/quant-interview/coverage/red-book.json src/data/quant-interview/coverage/150-most-frequently-asked.json
git commit -m "data: map expectation variance covariance source coverage"
```

---

### Task 5: Add Indicator, Random-Order, Coupon, and Fair-Value Problems

**Files:**
- Modify: `tests/quant-interview-expectation-variance-covariance-content.test.mjs`
- Create: `src/content/problems/probability/expected-pattern-count-by-indicators.md`
- Create: `src/content/problems/probability/expected-position-of-first-special-card.md`
- Create: `src/content/problems/probability/coupon-collector-expectations.md`
- Create: `src/content/problems/probability/fair-box-opening-price-by-expectation.md`

**Interfaces:**
- Consumes: `expectation-linearity-indicators`, `common-probability-distributions`.
- Produces: Problems `001`, `002`, `003`, `012` and resolves four staged hidden Problem targets.

- [ ] **Step 1: Add the shared S3+ test helper**

Append near the top of the content test:

```js
function assertS3(text, id) {
  assert.match(text, new RegExp(`^problemId:\\s*${id}$`, 'm'));
  assert.match(text, topicLine);
  for (const heading of ['## Problem', '## Think Before Revealing', '## Solution', '## Why This Matters', '## Common Mistakes', '## Extensions']) {
    assert.ok(text.includes(heading), `${id} missing ${heading}`);
  }
  assert.ok((text.match(/<details>/g) ?? []).length >= 2, `${id} needs two progressive hints`);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most|source page|PDF page|source item/i);
}
```

- [ ] **Step 2: Add RED tests for the four Problems**

```js
test('pattern-count Problem uses indicators without requiring independence', async () => {
  const text = await read('src/content/problems/probability/expected-pattern-count-by-indicators.md');
  assertS3(text, 'expectation-variance-covariance-001');
  assert.match(text, /indicator/i);
  assert.match(text, /overlap/i);
  assert.match(text, /does not require independence|linearity.*independ/i);
  assert.match(text, /n\s*-\s*m\s*\+\s*1|starting positions/i);
});

test('first-special Problem derives the general expected position', async () => {
  const text = await read('src/content/problems/probability/expected-position-of-first-special-card.md');
  assertS3(text, 'expectation-variance-covariance-002');
  assert.match(text, /1\s*\+\s*m\s*\/\s*\(n\s*\+\s*1\)|m\+n\+1/i);
  assert.match(text, /10\.6/);
  assert.match(text, /symmetr|indicator/i);
});

test('coupon collector Problem contains both canonical expectations', async () => {
  const text = await read('src/content/problems/probability/coupon-collector-expectations.md');
  assertS3(text, 'expectation-variance-covariance-003');
  assert.match(text, /H_N|harmonic/i);
  assert.match(text, /N.*H_N|N H_N/i);
  assert.match(text, /1\s*-\s*\(1\s*-\s*1\s*\/\s*N\).*k|distinct/i);
  assert.match(text, /geometric/i);
  assert.match(text, /indicator/i);
});

test('fair-box Problem derives the general fair price and explains stopping boundary', async () => {
  const text = await read('src/content/problems/probability/fair-box-opening-price-by-expectation.md');
  assertS3(text, 'expectation-variance-covariance-012');
  assert.match(text, /\(n\s*\+\s*1\)\s*\/\s*2/);
  assert.match(text, /2\s*V\s*\/\s*\(n\s*\+\s*1\)|fair/i);
  assert.match(text, /continue|continuation/i);
  assert.match(text, /optimal stopping/i);
});
```

- [ ] **Step 3: Run RED**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
```

Expected: the four new Problem files fail with `ENOENT` while all Knowledge tests remain GREEN.

- [ ] **Step 4: Implement the four S3+ Problems**

Use exact metadata from `problemMeta`. Each Problem must include two progressive hints and the following distinct canonical insight:

```text
pattern count -> dependent overlapping indicators still support linearity
first special -> random-permutation symmetry / indicator position identity
coupon collector -> geometric increments for completion + indicators for distinct count
fair boxes -> continuation policy collapses; fair price comes from expected winning position
```

- [ ] **Step 5: Verify the batch**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
npm run check
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit the batch**

```bash
git add tests/quant-interview-expectation-variance-covariance-content.test.mjs src/content/problems/probability/expected-pattern-count-by-indicators.md src/content/problems/probability/expected-position-of-first-special-card.md src/content/problems/probability/coupon-collector-expectations.md src/content/problems/probability/fair-box-opening-price-by-expectation.md
git commit -m "feat: add expectation decomposition interview problems"
```

---

### Task 6: Add Recursive-Expectation and Geometric-Moment Problems

**Files:**
- Modify: `tests/quant-interview-expectation-variance-covariance-content.test.mjs`
- Create: `src/content/problems/probability/recursive-dice-game-expected-payoff.md`
- Create: `src/content/problems/probability/expected-loops-from-random-pairings.md`
- Create: `src/content/problems/probability/geometric-waiting-time-mean-variance.md`

**Interfaces:**
- Consumes: `conditional-expectation-tower-property`, `expectation-variance-covariance-algebra`, `common-probability-distributions`, `recursion-problem-solving`.
- Produces: Problems `004`, `005`, `006` and resolves three staged hidden targets.

- [ ] **Step 1: Add RED Problem contracts**

```js
test('recursive dice Problem solves a fixed-point expectation with value seven', async () => {
  const text = await read('src/content/problems/probability/recursive-dice-game-expected-payoff.md');
  assertS3(text, 'expectation-variance-covariance-004');
  assert.match(text, /self-consistency|fixed-point|recurs/i);
  assert.match(text, /7/);
  assert.match(text, /conditional-dice-expectation|one-step/i);
});

test('random-pairing Problem derives the odd-harmonic expectation recurrence', async () => {
  const text = await read('src/content/problems/probability/expected-loops-from-random-pairings.md');
  assertS3(text, 'expectation-variance-covariance-005');
  assert.match(text, /E_n|E\[.*n.*\]/i);
  assert.match(text, /2n\s*-\s*1|2\s*n\s*-\s*1/i);
  assert.match(text, /1\/3|odd.*harmonic|sum/i);
  assert.match(text, /n\s*-\s*1|smaller/i);
});

test('geometric moment Problem derives mean and variance by two routes', async () => {
  const text = await read('src/content/problems/probability/geometric-waiting-time-mean-variance.md');
  assertS3(text, 'expectation-variance-covariance-006');
  assert.match(text, /1\s*\/\s*p/);
  assert.match(text, /1\s*-\s*p.*p\^?2|variance/i);
  assert.match(text, /series|generating/i);
  assert.match(text, /first-step|recurs/i);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
```

Expected: exactly the three new Problem contracts fail.

- [ ] **Step 3: Implement all three S3+ Problems**

Use exact metadata from `problemMeta`. Preserve the approved ownership distinctions:

```text
recursive dice -> scalar fixed-point expectation, not general dynamic programming
random pairings -> size-reduction expectation recurrence, not stochastic process
geometric moments -> distribution moments derived by series and first-step reasoning
```

- [ ] **Step 4: Verify the batch**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
npm run check
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit the batch**

```bash
git add tests/quant-interview-expectation-variance-covariance-content.test.mjs src/content/problems/probability/recursive-dice-game-expected-payoff.md src/content/problems/probability/expected-loops-from-random-pairings.md src/content/problems/probability/geometric-waiting-time-mean-variance.md
git commit -m "feat: add recursive expectation and geometric moment problems"
```

---

### Task 7: Add Gaussian and Scalar-Covariance Problems

**Files:**
- Modify: `tests/quant-interview-expectation-variance-covariance-content.test.mjs`
- Create: `src/content/problems/probability/normal-mgf-and-moments.md`
- Create: `src/content/problems/probability/expected-normal-cdf-of-normal-variable.md`
- Create: `src/content/problems/probability/optimal-hedge-ratio-by-variance-minimization.md`
- Create: `src/content/problems/probability/bernoulli-default-correlation-bounds.md`

**Interfaces:**
- Consumes: all four new Knowledge nodes plus existing Gaussian/probability/correlation Knowledge.
- Produces: Problems `007`-`010` and resolves four staged hidden targets.

- [ ] **Step 1: Add RED contracts**

```js
test('Normal MGF Problem derives the general MGF and standard moments', async () => {
  const text = await read('src/content/problems/probability/normal-mgf-and-moments.md');
  assertS3(text, 'expectation-variance-covariance-007');
  assert.match(text, /exp\(|e\^/i);
  assert.match(text, /mu.*t|μ.*t/i);
  assert.match(text, /sigma.*t.*2|σ.*t/i);
  assert.match(text, /mu.*2.*sigma.*2|variance.*mean/i);
  assert.match(text, /E\[Z\^4\].*3|fourth.*moment.*3/i);
});

test('Normal-CDF expectation Problem derives the general tower-property formula', async () => {
  const text = await read('src/content/problems/probability/expected-normal-cdf-of-normal-variable.md');
  assertS3(text, 'expectation-variance-covariance-008');
  assert.match(text, /Phi|Φ/);
  assert.match(text, /sqrt\(1\s*\+\s*sigma|√.*1.*σ/i);
  assert.match(text, /independent.*normal|independent.*Z/i);
  assert.match(text, /tower|conditional expectation/i);
  assert.match(text, /1\/2/);
  assert.match(text, /probability integral transform|PIT/i);
});

test('hedge-ratio Problem derives the covariance over variance minimizer', async () => {
  const text = await read('src/content/problems/probability/optimal-hedge-ratio-by-variance-minimization.md');
  assertS3(text, 'expectation-variance-covariance-009');
  assert.match(text, /Var\(R_A\s*-\s*h\s*R_B\)|variance.*hedg/i);
  assert.match(text, /Cov.*Var|covariance.*variance/i);
  assert.match(text, /rho|ρ/i);
  assert.match(text, /sigma_A|σ_A/i);
});

test('Bernoulli default Problem derives feasible correlation from fixed marginals', async () => {
  const text = await read('src/content/problems/probability/bernoulli-default-correlation-bounds.md');
  assertS3(text, 'expectation-variance-covariance-010');
  assert.match(text, /Bernoulli|indicator/i);
  assert.match(text, /P\(A.*B\)|joint probability|intersection/i);
  assert.match(text, /Frechet|Fréchet|lower bound.*upper bound/i);
  assert.match(text, /Cov/i);
  assert.match(text, /-1.*1|\[-1,\s*1\]/);
  assert.match(text, /not.*achievable|fixed marginals/i);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
```

Expected: exactly the four new Problem contracts fail.

- [ ] **Step 3: Implement `normal-mgf-and-moments.md`**

Show a complete-square or affine-standard-normal derivation of:

```text
M_X(t)=exp(mu t + sigma^2 t^2/2)
E[X^2]=mu^2+sigma^2
```

Then use derivatives for the standard-normal moments. Explain the MGF existence assumption rather than treating differentiation as purely formal.

- [ ] **Step 4: Implement `expected-normal-cdf-of-normal-variable.md`**

Introduce independent `Z~N(0,1)` and use:

```text
Phi(X)=P(Z<=X | X)
E[Phi(X)]=P(Z<=X)
Z-X ~ N(-mu, 1+sigma^2)
```

Conclude the approved general formula. Include the `mu=0 -> 1/2`, `sigma->0 -> Phi(mu)` sanity checks and PIT only as a special-case alternative.

- [ ] **Step 5: Implement the two covariance applications**

For the hedge page, derive the quadratic variance and differentiate with respect to `h`. For the Bernoulli page, derive joint-probability bounds first, then transform those bounds to covariance and correlation. Explicitly state that fixed marginals may make `±1` unattainable and that matrix PSD is a separate topic.

- [ ] **Step 6: Verify the batch**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
npm run check
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit the batch**

```bash
git add tests/quant-interview-expectation-variance-covariance-content.test.mjs src/content/problems/probability/normal-mgf-and-moments.md src/content/problems/probability/expected-normal-cdf-of-normal-variable.md src/content/problems/probability/optimal-hedge-ratio-by-variance-minimization.md src/content/problems/probability/bernoulli-default-correlation-bounds.md
git commit -m "feat: add Gaussian and covariance expectation problems"
```

---

### Task 8: Add Continuous-Disk and Multiplicative-Wealth Problems

**Files:**
- Modify: `tests/quant-interview-expectation-variance-covariance-content.test.mjs`
- Create: `src/content/problems/probability/expected-radius-of-uniform-disk-point.md`
- Create: `src/content/problems/probability/multiplicative-wealth-expected-growth.md`

**Interfaces:**
- Consumes: `expectation-linearity-indicators`, existing geometric-probability Knowledge.
- Produces: Problems `011`, `013`, completing all thirteen new public Problem slugs.

- [ ] **Step 1: Add RED contracts**

```js
test('uniform-disk Problem derives radial density and expected radius', async () => {
  const text = await read('src/content/problems/probability/expected-radius-of-uniform-disk-point.md');
  assertS3(text, 'expectation-variance-covariance-011');
  assert.match(text, /2\s*r\s*\/\s*R\^?2|radial density/i);
  assert.match(text, /2\s*R\s*\/\s*3/);
  assert.match(text, /polar|area/i);
  assert.match(text, /unit disk|R\s*=\s*1/i);
});

test('multiplicative wealth Problem separates expected wealth from log growth', async () => {
  const text = await read('src/content/problems/probability/multiplicative-wealth-expected-growth.md');
  assertS3(text, 'expectation-variance-covariance-013');
  assert.match(text, /product/i);
  assert.match(text, /independent/i);
  assert.match(text, /5\s*\/\s*4/);
  assert.match(text, /\(5\s*\/\s*4\).*n|expected wealth/i);
  assert.match(text, /log growth|geometric growth/i);
  assert.match(text, /Kelly/i);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
```

Expected: exactly the two new Problem contracts fail.

- [ ] **Step 3: Implement both S3+ Problems**

The disk page must show both the radial-density and polar-area perspectives. The wealth page must derive independent product expectation and explicitly say the log-growth extension is a boundary insight, not a Kelly optimization tutorial.

- [ ] **Step 4: Verify all thirteen Problem content contracts**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
npm run check
npm run build
```

Expected: all four Knowledge and all thirteen new Problem contracts pass.

- [ ] **Step 5: Commit the final new-Problem batch**

```bash
git add tests/quant-interview-expectation-variance-covariance-content.test.mjs src/content/problems/probability/expected-radius-of-uniform-disk-point.md src/content/problems/probability/multiplicative-wealth-expected-growth.md
git commit -m "feat: add continuous and multiplicative expectation problems"
```

---

### Task 9: Integrate the Existing Seed and Build the Cross-Topic Knowledge Graph

**Files:**
- Modify: `src/content/problems/probability/conditional-dice-expectation.md`
- Modify: `src/content/knowledge/concepts/conditioning.md`
- Modify: `src/content/knowledge/concepts/correlation-matrix.md`
- Modify: `src/content/knowledge/concepts/common-probability-distributions.md`
- Modify: `src/content/knowledge/concepts/gaussian-lognormal-structure.md`
- Modify: `src/content/knowledge/concepts/random-variable-transformations-convolution.md`
- Modify: `src/content/knowledge/concepts/first-step-analysis.md`
- Modify: `tests/quant-interview-expectation-variance-covariance-content.test.mjs`
- Modify: `tests/quant-interview-expectation-variance-covariance-workstream.test.mjs`

**Interfaces:**
- Consumes: all four new Knowledge and all thirteen new Problems.
- Produces: navigable public graph, preserves previous topic ownership, and upgrades coverage validation from staged unresolved targets to strict real-target validation.

- [ ] **Step 1: Write RED graph/ownership tests**

Append content tests that parse frontmatter text and require:

```js
test('existing conditional dice seed links to the new tower Knowledge and recursive dice Problem', async () => {
  const text = await read('src/content/problems/probability/conditional-dice-expectation.md');
  assert.match(text, /^concepts:\s*\[[^\]]*conditional-expectation-tower-property[^\]]*\]$/m);
  assert.match(text, /^relatedProblems:\s*\[[^\]]*recursive-dice-game-expected-payoff[^\]]*\]$/m);
  assert.match(text, /2\.75/);
});

test('existing Knowledge keeps original canonical ownership while linking to 009', async () => {
  const cases = [
    ['conditioning', /conditional-probability-bayes/, /conditional-expectation-tower-property/],
    ['correlation-matrix', /covariance-correlation-matrices/, /expectation-variance-covariance-algebra/],
    ['common-probability-distributions', /random-variables-distributions/, /moments-moment-generating-functions|expectation-variance-covariance-algebra/],
    ['gaussian-lognormal-structure', /random-variables-distributions/, /moments-moment-generating-functions|conditional-expectation-tower-property/],
    ['random-variable-transformations-convolution', /random-variables-distributions/, /conditional-expectation-tower-property|expectation-linearity-indicators/],
    ['first-step-analysis', /random-walks-markov-chains/, /conditional-expectation-tower-property/],
  ];
  for (const [slug, ownership, related] of cases) {
    const text = await read(`src/content/knowledge/concepts/${slug}.md`);
    assert.match(text, ownership, `${slug} lost prior ownership`);
    assert.match(text, related, `${slug} missing 009 related link`);
  }
});
```

- [ ] **Step 2: Run graph RED**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs
```

Expected: graph assertions fail because the existing pages have not yet been linked.

- [ ] **Step 3: Upgrade `conditional-dice-expectation.md` minimally**

Preserve the problem statement, answer, `problemId`, existing topic list, `techniques: [conditioning]`, difficulty, and status. Change only:

```yaml
concepts: [conditional-expectation-tower-property]
relatedProblems: [recursive-dice-game-expected-payoff]
```

Add at most one short navigation paragraph explaining that this problem is one-step conditional expectation, while the related recursive dice problem solves a fixed-point expectation.

- [ ] **Step 4: Add minimal reciprocal Knowledge links**

Modify only `related` / `relatedNotes` and, where necessary, one navigation sentence. Keep every existing page’s `quantInterviewTopics` unchanged.

Target link set:

```text
conditioning -> conditional-expectation-tower-property
correlation-matrix -> expectation-variance-covariance-algebra
common-probability-distributions -> expectation-variance-covariance-algebra, moments-moment-generating-functions
gaussian-lognormal-structure -> moments-moment-generating-functions, conditional-expectation-tower-property
random-variable-transformations-convolution -> conditional-expectation-tower-property, expectation-linearity-indicators
first-step-analysis -> conditional-expectation-tower-property
```

Do not copy new expectation theory into these older pages.

- [ ] **Step 5: Strengthen coverage validation to real targets**

Replace only the intermediate validator option in Task 4:

```js
allowUnresolvedCanonicalRefs: false,
```

Add explicit target assertions for all 18 rows, including:

```js
assert.deepEqual(rows.get('4.4.normal-moments::')?.canonicalProblems, ['normal-mgf-and-moments']);
assert.deepEqual(rows.get('3.2.1::3.38')?.canonicalProblems, ['expected-normal-cdf-of-normal-variable']);
assert.deepEqual(rows.get('2.6::4')?.canonicalProblems, ['expected-radius-of-uniform-disk-point']);
assert.deepEqual(rows.get('2.6::7')?.canonicalProblems, ['expected-normal-cdf-of-normal-variable']);
```

Also require `knowledge-only` rows to remain publicly testable:

```js
test('009 knowledge-only rows remain publicly testable', async () => {
  const expectation = await read('src/content/knowledge/concepts/expectation-linearity-indicators.md');
  const conditional = await read('src/content/knowledge/concepts/conditional-expectation-tower-property.md');
  const algebra = await read('src/content/knowledge/concepts/expectation-variance-covariance-algebra.md');
  for (const text of [expectation, conditional, algebra]) assert.match(text, /^## Interview Checks$/m);
  assert.match(expectation, /fair die|six-sided die/i);
  assert.match(expectation, /indicator/i);
  assert.match(conditional, /tower|total expectation/i);
  assert.match(algebra, /variance|covariance/i);
});
```

- [ ] **Step 6: Run strict graph + coverage GREEN**

```bash
node --test tests/quant-interview-expectation-variance-covariance-content.test.mjs tests/quant-interview-expectation-variance-covariance-workstream.test.mjs
npm run check
npm run build
```

Expected: PASS with `allowUnresolvedCanonicalRefs: false`.

- [ ] **Step 7: Commit graph integration and strict coverage**

```bash
git add src/content/problems/probability/conditional-dice-expectation.md src/content/knowledge/concepts/conditioning.md src/content/knowledge/concepts/correlation-matrix.md src/content/knowledge/concepts/common-probability-distributions.md src/content/knowledge/concepts/gaussian-lognormal-structure.md src/content/knowledge/concepts/random-variable-transformations-convolution.md src/content/knowledge/concepts/first-step-analysis.md tests/quant-interview-expectation-variance-covariance-content.test.mjs tests/quant-interview-expectation-variance-covariance-workstream.test.mjs
git commit -m "feat: connect expectation variance covariance knowledge graph"
```

---

### Task 10: Extend the Exact Global Source-Neutral Regression and Produce the Content-Complete Commit

**Files:**
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`

**Interfaces:**
- Consumes: all public slugs and hidden coverage from Tasks 2-9.
- Produces: the exact content-complete commit whose successful Actions run is recorded by Task 11.

- [ ] **Step 1: Write global regression RED by extending exact Problem enumeration**

Append these exact thirteen slugs to `currentProblemSlugs`:

```js
'expected-pattern-count-by-indicators',
'expected-position-of-first-special-card',
'coupon-collector-expectations',
'recursive-dice-game-expected-payoff',
'expected-loops-from-random-pairings',
'geometric-waiting-time-mean-variance',
'normal-mgf-and-moments',
'expected-normal-cdf-of-normal-variable',
'optimal-hedge-ratio-by-variance-minimization',
'bernoulli-default-correlation-bounds',
'expected-radius-of-uniform-disk-point',
'fair-box-opening-price-by-expectation',
'multiplicative-wealth-expected-growth',
```

- [ ] **Step 2: Extend exact Knowledge topic map**

Append:

```js
['expectation-linearity-indicators', ['probability-statistics', 'expectation-variance-covariance']],
['conditional-expectation-tower-property', ['probability-statistics', 'expectation-variance-covariance']],
['expectation-variance-covariance-algebra', ['probability-statistics', 'expectation-variance-covariance']],
['moments-moment-generating-functions', ['probability-statistics', 'expectation-variance-covariance']],
```

- [ ] **Step 3: Update the exact count contract**

Replace the old count test with:

```js
test('source-neutral regression enumerates the current 55 Problem and 37 Knowledge contracts', () => {
  assert.equal(currentProblemSlugs.length, 55);
  assert.equal(expectedKnowledgeTopics.size, 37);
});
```

- [ ] **Step 4: Extend hidden-audit checks without pretending variants are canonical-problem rows**

Add only the general 150 `2.6::7` row to the existing `canonical-problem` map:

```js
['2.6::7', 'expected-normal-cdf-of-normal-variable'],
```

Add a separate assertion for the disk duplicate:

```js
const disk = items.get('2.6::4');
assert.equal(disk?.state, 'merged-duplicate');
assert.deepEqual(disk?.canonicalProblems, ['expected-radius-of-uniform-disk-point']);
```

Do not change the historical workstream-008 audit rows.

- [ ] **Step 5: Run the global regression RED/GREEN cycle**

First run after adding the new exact enumerations:

```bash
node --test tests/quant-interview-source-neutral-content.test.mjs
```

Expected: if all previous tasks are correct, the extended regression should already be GREEN. If it fails, fix the missing public metadata/ownership rather than weakening enumeration.

Then run full verification:

```bash
npm run test
npm run check
npm run build
```

Expected: all commands PASS.

- [ ] **Step 6: Review the public/problem count as a semantic invariant, not a quota**

Run a filesystem count or inspect the exact arrays. Confirm `55/37` follows from the approved `42 + 13` / `33 + 4` structure. If a semantic collision was discovered earlier, stop and revise the spec/plan/count instead of editing the assertion to hide it.

- [ ] **Step 7: Commit the exact global regression**

```bash
git add tests/quant-interview-source-neutral-content.test.mjs
git commit -m "test: extend source-neutral regression for expectation moments"
```

This commit is the **content-complete verification candidate**. Record its real 40-character SHA externally; do not write it into workstream JSON yet.

- [ ] **Step 8: Push and obtain a real successful branch CI run for the exact content-complete commit**

```bash
git push -u origin chatgpt/quant-interview-workstream-expectation-variance-covariance-2026-08-19
```

Use the available GitHub Actions tooling to find the run for the exact commit. Require:

```text
run commit SHA == content-complete commit SHA
run conclusion == success
run id is a positive integer
steps include npm run test, npm run check, npm run build
```

Record the real `contentCommit` and `successfulRunId` externally for Task 11.

---

### Task 11: Seal Workstream 009, Advance HANDOFF, Remove Temporary Tooling, and Verify Closure

**Files:**
- Create: `tests/quant-interview-expectation-variance-covariance-completion.test.mjs`
- Modify: `src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Modify only if needed for durable-history consistency: `tests/quant-interview-handoff.test.mjs`
- Delete from final tree: `.github/workflows/quant-interview-expectation-variance-covariance-ci.yml`
- Delete from final tree: any temporary mutator/helper introduced during execution.

**Interfaces:**
- Consumes: real Task 10 `contentCommit`, real successful Actions run id, complete public/hidden corpus.
- Produces: sealed durable workstream memory, next bounded topic `Probability & Statistics -> Order Statistics & Extremes`, and a clean feature tree suitable for finishing/integration workflow.

- [ ] **Step 1: Write completion RED**

Create:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('expectation variance covariance workstream closes only with real verification evidence', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  assert.match(workstream.verification?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.ok(Number.isInteger(workstream.verification?.runId));
  assert.ok(workstream.verification.runId > 0);
  assert.deepEqual(workstream.verification?.commands, ['npm run test', 'npm run check', 'npm run build']);
  assert.equal(workstream.verification?.conclusion, 'success');
});

test('handoff records workstream 009 and advances to order statistics extremes', async () => {
  const workstream = await readJson(workstreamPath);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  assert.match(handoff, /probability-statistics-expectation-variance-covariance-009/);
  assert.match(handoff, new RegExp(workstream.verification.commit));
  assert.match(handoff, new RegExp(String(workstream.verification.runId)));
  for (const slug of [
    'expectation-linearity-indicators',
    'conditional-expectation-tower-property',
    'expectation-variance-covariance-algebra',
    'moments-moment-generating-functions',
    'expected-pattern-count-by-indicators',
    'expected-position-of-first-special-card',
    'coupon-collector-expectations',
    'recursive-dice-game-expected-payoff',
    'expected-loops-from-random-pairings',
    'geometric-waiting-time-mean-variance',
    'normal-mgf-and-moments',
    'expected-normal-cdf-of-normal-variable',
    'optimal-hedge-ratio-by-variance-minimization',
    'bernoulli-default-correlation-bounds',
    'expected-radius-of-uniform-disk-point',
    'fair-box-opening-price-by-expectation',
    'multiplicative-wealth-expected-growth',
  ]) assert.match(handoff, new RegExp(slug));
  assert.match(handoff, /18[^\n]*(?:claimed|terminal|source|coverage)/i);
  assert.match(handoff, /55 canonical Problems/i);
  assert.match(handoff, /37 explicitly topic-classified|37 topic-classified/i);
  assert.match(handoff, /indicator/i);
  assert.match(handoff, /tower property|conditional expectation/i);
  assert.match(handoff, /scalar covariance|variance.*covariance/i);
  assert.match(handoff, /order statistics/i);

  const nextAction = handoff.split(/## Next action/i)[1] ?? '';
  assert.match(nextAction, /cross-book/i);
  assert.match(nextAction, /Probability & Statistics/i);
  assert.match(nextAction, /Order Statistics & Extremes/i);
  assert.doesNotMatch(nextAction, /Expectation, Variance & Covariance[\s\S]{0,180}(?:execute|next|continue)/i);
  assert.doesNotMatch(nextAction, /Question\s+\d+|Q\d+/i);
});
```

- [ ] **Step 2: Run completion RED**

```bash
node --test tests/quant-interview-expectation-variance-covariance-completion.test.mjs
```

Expected: FAIL because workstream status is still `active` and HANDOFF has not yet recorded workstream 009 completion.

- [ ] **Step 3: Re-read the real Task 10 verification evidence**

Use GitHub/VCS read tooling to verify the actual content-complete commit and Actions run again immediately before writing durable state. Do not rely on remembered values.

Enforce:

```js
assert.match(contentCommit, /^[0-9a-f]{40}$/);
assert.ok(Number.isInteger(successfulRunId));
assert.ok(successfulRunId > 0);
assert.equal(successfulRunConclusion, 'success');
```

- [ ] **Step 4: Seal the machine-readable workstream**

Change only the status/verification fields:

```js
workstream.status = 'complete';
workstream.verification = {
  commit: contentCommit,
  runId: successfulRunId,
  commands: ['npm run test', 'npm run check', 'npm run build'],
  conclusion: successfulRunConclusion,
};
```

The stored commit is the verified **content-complete** commit from Task 10, not the later closure commit.

- [ ] **Step 5: Update durable HANDOFF factually**

Preserve all prior workstream history. Add a completed workstream-009 section containing:

```text
probability-statistics-expectation-variance-covariance-009
real content-complete commit and Actions run
4 new canonical Knowledge nodes
13 new canonical Problems
existing conditional-dice-expectation upgraded but not source-owned
18 terminal claimed source rows = 8 Green + 8 Red + 2 150
semantic merges: disk-radius family, E[Phi(X)] family, Normal MGF/moments family
boundary: stochastic stopping-time, optimal-stopping, order-statistic, and covariance-matrix PSD material remains outside
public corpus checkpoint: 55 canonical Problems / 37 explicitly topic-classified Knowledge / Technique nodes
next bounded topic: Probability & Statistics -> Order Statistics & Extremes
```

Record all seventeen new/updated public slugs explicitly so future agents do not infer the corpus from conversational memory.

- [ ] **Step 6: Make completion tests GREEN**

```bash
npm run test
npm run check
npm run build
```

Expected: PASS, including the new completion test and all historical regressions.

If `tests/quant-interview-handoff.test.mjs` fails only because an old next-action assertion is genuinely stale, update that assertion minimally to preserve durable history while delegating the current next-topic contract to the new 009 completion test. Do not weaken unrelated historical assertions.

- [ ] **Step 7: Commit closure metadata before cleanup**

```bash
git add src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json docs/quant-interview/HANDOFF.md tests/quant-interview-expectation-variance-covariance-completion.test.mjs tests/quant-interview-handoff.test.mjs
git commit -m "docs: complete expectation variance covariance workstream"
```

If `tests/quant-interview-handoff.test.mjs` did not change, omit it from `git add`.

- [ ] **Step 8: Review the topic-only diff before deleting temporary tooling**

Compare with the **then-current** durable Quant Interview base, not blindly with the historical base SHA. The product diff is allowed to contain only:

```text
docs/quant-interview/HANDOFF.md
docs/superpowers/specs/2026-08-19-quant-interview-expectation-variance-covariance-design.md
docs/superpowers/specs/2026-08-19-quant-interview-expectation-variance-covariance-validator-amendment.md
docs/superpowers/plans/2026-08-19-quant-interview-expectation-variance-covariance.md
src/content/knowledge/concepts/expectation-linearity-indicators.md
src/content/knowledge/concepts/conditional-expectation-tower-property.md
src/content/knowledge/concepts/expectation-variance-covariance-algebra.md
src/content/knowledge/concepts/moments-moment-generating-functions.md
src/content/knowledge/concepts/conditioning.md
src/content/knowledge/concepts/correlation-matrix.md
src/content/knowledge/concepts/common-probability-distributions.md
src/content/knowledge/concepts/gaussian-lognormal-structure.md
src/content/knowledge/concepts/random-variable-transformations-convolution.md
src/content/knowledge/concepts/first-step-analysis.md
src/content/problems/probability/conditional-dice-expectation.md
src/content/problems/probability/expected-pattern-count-by-indicators.md
src/content/problems/probability/expected-position-of-first-special-card.md
src/content/problems/probability/coupon-collector-expectations.md
src/content/problems/probability/recursive-dice-game-expected-payoff.md
src/content/problems/probability/expected-loops-from-random-pairings.md
src/content/problems/probability/geometric-waiting-time-mean-variance.md
src/content/problems/probability/normal-mgf-and-moments.md
src/content/problems/probability/expected-normal-cdf-of-normal-variable.md
src/content/problems/probability/optimal-hedge-ratio-by-variance-minimization.md
src/content/problems/probability/bernoulli-default-correlation-bounds.md
src/content/problems/probability/expected-radius-of-uniform-disk-point.md
src/content/problems/probability/fair-box-opening-price-by-expectation.md
src/content/problems/probability/multiplicative-wealth-expected-growth.md
src/data/quant-interview/topics/source-topic-map.json
src/data/quant-interview/coverage/green-book.json
src/data/quant-interview/coverage/red-book.json
src/data/quant-interview/coverage/150-most-frequently-asked.json
src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json
tests/quant-interview-expectation-variance-covariance-workstream.test.mjs
tests/quant-interview-expectation-variance-covariance-content.test.mjs
tests/quant-interview-expectation-variance-covariance-completion.test.mjs
tests/quant-interview-source-neutral-content.test.mjs
tests/quant-interview-handoff.test.mjs   # only if minimally needed
```

No Home, CV, Projects, reproduction, layout, style, deployment, taxonomy, or unrelated Knowledge/Problem changes are allowed.

For `src/data/quant-interview/topics/source-topic-map.json`, verify the diff contains **only** the `green-book::4.4.normal-moments` canonical-topic correction.

- [ ] **Step 9: Remove temporary branch tooling**

Delete:

```bash
git rm .github/workflows/quant-interview-expectation-variance-covariance-ci.yml
```

Also delete any temporary JSON mutator/helper that may have been created during execution. No temporary tooling may remain in the final product tree.

- [ ] **Step 10: Prove cleanup-only delta and commit it separately**

Compare the last fully green closure commit with the working tree. The only changes now must be deletions of temporary tooling.

```bash
git status --short
git diff -- .github/workflows
```

Then commit:

```bash
git add -u
git commit -m "chore: remove expectation variance covariance tooling"
```

- [ ] **Step 11: Run fresh post-cleanup verification**

```bash
npm run test
npm run check
npm run build
```

Expected: PASS with no branch-only workflow present.

- [ ] **Step 12: Verify final branch state and hand off to finishing workflow**

Confirm:

```text
workstream 009 status == complete
verification commit/run are real and point to the successful Task 10 content-complete run
18 claimed rows are terminal with strict real targets
55/37 global source-neutral regression is exact if no semantic count revision occurred
source-topic-map has only the approved one-row correction
no temporary CI/mutator files remain
HANDOFF next bounded topic == Order Statistics & Extremes
```

Then invoke `superpowers:verification-before-completion` before making any completion claim, followed by `superpowers:finishing-a-development-branch` to offer the user integration options. Do not auto-integrate and do not touch `main`.

---

## Completion Checklist

```text
[ ] implementation branch is isolated from main and includes approved spec + amendment + plan
[ ] inherited baseline passed before 009 content changes
[ ] workstream 009 registration exists and began as active
[ ] four fixed Knowledge slugs exist and are source-neutral
[ ] thirteen fixed new Problem slugs exist, solved, S3+, and source-neutral
[ ] existing conditional-dice-expectation still answers 2.75 and now links to tower Knowledge / recursive dice
[ ] Green 4.4.normal-moments source-topic mapping is corrected to expectation-variance-covariance and no other source-map row changed
[ ] exactly eighteen claimed rows are terminal: 13 canonical-problem + 2 knowledge-only + 2 variant + 1 merged-duplicate
[ ] all eighteen claimed rows have nonempty resolution notes and real canonical targets
[ ] all knowledge-only rows remain publicly testable through Interview Checks
[ ] 150 workstream-008 terminal rows remain owned by 008
[ ] Red optimal stopping, martingale/process, order-statistic, and PSD items remain outside 009
[ ] Green sum-of-random-variables/simplex and Random Ants remain outside 009
[ ] covariance/correlation matrix and PSD Knowledge retains Linear Algebra canonical topics
[ ] conditioning retains Conditional Probability & Bayes canonical topics
[ ] first-step-analysis retains stochastic-process canonical topics
[ ] semantic merges produce one public disk-radius Problem, one public E[Phi(X)] Problem, and one public Normal-MGF/moments Problem
[ ] global source-neutral regression records exactly 55 Problems and 37 Knowledge if the approved structure remained unchanged
[ ] npm run test succeeds
[ ] npm run check succeeds
[ ] npm run build succeeds
[ ] content-complete verification commit is a real 40-character SHA
[ ] verification runId is a real positive integer from a successful run of the exact content-complete commit
[ ] workstream status is complete only after real verification evidence exists
[ ] HANDOFF records workstream 009 factually and advances to Probability & Statistics -> Order Statistics & Extremes
[ ] final topic-only diff contains no unrelated product changes
[ ] temporary branch CI/mutator tooling is absent from final product tree
[ ] verification-before-completion is run before claiming success
[ ] finishing-a-development-branch is used before any integration
[ ] main is untouched
```
