# Quant Interview Vectors & Linear Systems Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the bounded `Linear Algebra & Matrix Methods → Vectors & Linear Systems` workstream by reconciling verified source material, correcting Green vector-problem provenance, adding three canonical Knowledge nodes, adding two canonical Problems, and explicitly separating repository-authored canonical extensions from source-derived coverage.

**Architecture:** Public content remains Topic-first and source-neutral. Hidden coverage records only real inspected source items. Repository-authored extensions are declared in the workstream record through optional `canonicalExtensions` and never through fabricated source rows. Existing canonical Problems are enriched when the reasoning identity already exists instead of creating duplicates.

**Tech Stack:** Astro content collections, Markdown/YAML frontmatter, Node.js built-in test runner, JavaScript ES modules, JSON workstream/coverage ledgers, GitHub Actions, npm.

## Global Constraints

- Base branch: `chatgpt/quant-interview-topic-first-fusion-design-2026-08-16`.
- Work branch: `chatgpt/quant-interview-workstream-vectors-linear-systems-2026-08-17`.
- Workstream id: `linear-algebra-vectors-linear-systems-004`.
- Canonical topics: `linear-algebra-matrix-methods`, `vectors-linear-systems`.
- Approved canonical extensions exactly: `inner-product-projection-core`, `span-basis-rank-nullity`, `linear-system-consistency-rref`.
- Green direct evidence: `3.6.1`, PDF pages 66-67.
- Red audit scope: `6.2.1`, `6.3.1`, `10.2`, PDF pages 201-222 and 317-318; result `no-new-direct-item`.
- 150 Questions direct evidence: `2.2::9`, question PDF page 30, solution PDF pages 79-80.
- Green `correlation-range-0.8-0.8` must move from incorrect hidden ownership `3.6.4` to actual `3.6.1`, preserving the existing canonical Problem identity.
- Canonical extensions must never receive fabricated source coverage rows.
- New Knowledge: `vector-geometry-inner-products`, `linear-independence-span-basis-rank`, `linear-systems-consistency`.
- New source-derived Problem: `product-of-row-stochastic-matrices`.
- New repository-authored extension Problem: `rank-and-consistency-of-linear-system`; no source ledger may point to it.
- No duplicate QR/LU/Cholesky/SVD/eigenbasis/PSD/correlation theory.
- No public book names, source numbers, source pages, source-shaped IDs, or extension-provenance badges.
- Every new Knowledge node exposes `## Interview Checks`.
- Every new Problem is S3+: statement, progressive hints, full reasoning, why it matters, common mistakes, and extensions/variants.
- Final gates: `npm run test`, `npm run check`, `npm run build`, plus topic-only diff review.

## File Map

**Create**

- `src/data/quant-interview/workstreams/linear-algebra-vectors-linear-systems-004.json`
- `src/content/knowledge/concepts/vector-geometry-inner-products.md`
- `src/content/knowledge/concepts/linear-independence-span-basis-rank.md`
- `src/content/knowledge/concepts/linear-systems-consistency.md`
- `src/content/problems/linear-algebra/product-of-row-stochastic-matrices.md`
- `src/content/problems/linear-algebra/rank-and-consistency-of-linear-system.md`
- `tests/quant-interview-vectors-linear-systems-workstream.test.mjs`
- `tests/quant-interview-vectors-linear-systems-content.test.mjs`
- `.github/workflows/quant-interview-vectors-linear-systems-ci.yml` temporarily; remove before final handoff.

**Modify**

- `src/lib/quantInterviewWorkstreams.mjs`
- `src/data/quant-interview/coverage/green-book.json`
- `src/data/quant-interview/coverage/150-most-frequently-asked.json`
- `src/content/problems/linear-algebra/correlation-matrix-parameter-range.md`
- `tests/quant-interview-source-neutral-content.test.mjs`
- `tests/quant-interview-handoff.test.mjs`
- `docs/quant-interview/HANDOFF.md`

**Do not modify unless a failing test proves it necessary**

- `src/data/quant-interview/topics/taxonomy.json`
- `src/data/quant-interview/topics/source-topic-map.json`
- public page/layout components.

---

### Task 1: Baseline Gate, Workstream Registration, and Extension Validation

**Files:** create temporary CI, create workstream test, create workstream JSON, modify validator.

**Interfaces:** consumes `validateTopicWorkstream(workstream, context)`; produces validated optional `canonicalExtensions: string[]`.

- [ ] **Step 1: Create the temporary branch-only CI**

```yaml
name: Quant Interview Vectors Linear Systems CI

on:
  push:
    branches:
      - chatgpt/quant-interview-workstream-vectors-linear-systems-2026-08-17
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

Verify the unchanged branch is green before adding RED tests.

- [ ] **Step 2: Write registration RED tests**

Create helpers matching existing workstream tests and require:

```js
const workstreamPath = 'src/data/quant-interview/workstreams/linear-algebra-vectors-linear-systems-004.json';
const expectedExtensions = [
  'inner-product-projection-core',
  'span-basis-rank-nullity',
  'linear-system-consistency-rref',
];

test('fourth cross-book workstream is bounded to vectors and linear systems', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'linear-algebra-vectors-linear-systems-004');
  assert.deepEqual(workstream.canonicalTopics, ['linear-algebra-matrix-methods', 'vectors-linear-systems']);
  assert.deepEqual(workstream.canonicalExtensions, expectedExtensions);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set(['green-book', 'red-book', '150-most-frequently-asked']));
  assert.match(workstream.status, /^(?:active|complete)$/);
});
```

Validator contract:

```js
test('workstream validator accepts canonical extensions and rejects malformed declarations', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: 'rank' }, ctx), /canonicalExtensions.*array/i);
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: ['rank', 'rank'] }, ctx), /duplicate canonical extension/i);
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: [''] }, ctx), /canonical extension.*non-empty string/i);
});
```

- [ ] **Step 3: Run RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
```

Expected: failure because the workstream JSON is absent.

- [ ] **Step 4: Add minimal validator support**

In `validateTopicWorkstream`:

```js
if (workstream.canonicalExtensions !== undefined) {
  if (!Array.isArray(workstream.canonicalExtensions)) throw new Error('Topic workstream canonicalExtensions must be an array.');
  const seenExtensions = new Set();
  for (const extension of workstream.canonicalExtensions) {
    requireString(extension, 'Topic workstream canonical extension');
    if (seenExtensions.has(extension)) throw new Error(`Duplicate canonical extension in workstream: ${extension}`);
    seenExtensions.add(extension);
  }
}
```

Do not map extension ids into taxonomy or source-topic maps.

- [ ] **Step 5: Create the exact workstream record**

```json
{
  "id": "linear-algebra-vectors-linear-systems-004",
  "canonicalTopics": ["linear-algebra-matrix-methods", "vectors-linear-systems"],
  "canonicalExtensions": ["inner-product-projection-core", "span-basis-rank-nullity", "linear-system-consistency-rref"],
  "status": "active",
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": ["3.6.1"],
      "evidencePageRanges": [{"startPage":66,"endPage":67}]
    },
    {
      "source": "red-book",
      "sourceSections": ["6.2.1","6.3.1","10.2"],
      "evidencePageRanges": [{"startPage":201,"endPage":222},{"startPage":317,"endPage":318}],
      "reviewOutcome": "no-new-direct-item",
      "reviewNote": "Reviewed the General Mathematics questions/solutions and Top Ten question list for vector, basis, rank, and linear-system tasks. Matrix items found there are already owned by completed PSD/decomposition workstreams; no new direct vectors/linear-systems item is introduced here."
    },
    {
      "source": "150-most-frequently-asked",
      "sourceSections": ["2.2","3.2"],
      "evidencePageRanges": [{"startPage":30,"endPage":30},{"startPage":79,"endPage":80}]
    }
  ]
}
```

- [ ] **Step 6: Verify GREEN**

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
npm run test
npm run check
npm run build
```

Commit: `feat: register vectors linear systems workstream`.

---

### Task 2: Item Inventory and Green Provenance Correction

**Files:** modify workstream test and Green/150 coverage ledgers.

**Interfaces:** produces only real source rows; new rows remain `needs-review` until Task 3.

- [ ] **Step 1: Add inventory RED expectations**

```js
const sourceInventory = {
  'green-book': [
    ['3.6.1', 'vector-coordinate-representation'],
    ['3.6.1', 'dot-product'],
    ['3.6.1', 'euclidean-norm-distance'],
    ['3.6.1', 'angle-orthogonality'],
    ['3.6.1', 'correlation-as-cosine'],
    ['3.6.1', 'correlation-range-0.8-0.8'],
  ],
  '150-most-frequently-asked': [['2.2', '9']],
};
```

Require each row and `vectors-linear-systems` topic membership. Add:

```js
test('Green correlation geometry variant is owned by the actual Vectors section', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/green-book.json');
  const matches = ledger.entries.filter((entry) => entry.sourceItem === 'correlation-range-0.8-0.8');
  assert.equal(matches.length, 1);
  assert.equal(matches[0].sourceSection, '3.6.1');
  assert.deepEqual(matches[0].canonicalProblems, ['correlation-matrix-parameter-range']);
  assert.ok(matches[0].canonicalTopics.includes('vectors-linear-systems'));
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
```

Expected: missing Green rows and incorrect `3.6.4` provenance.

- [ ] **Step 3: Upsert Green inventory**

Create five `needs-review` rows under `3.6.1`, each with `canonicalTopics: ["vectors-linear-systems"]`, empty targets, for:

```text
vector-coordinate-representation
dot-product
euclidean-norm-distance
angle-orthogonality
correlation-as-cosine
```

Move the existing `correlation-range-0.8-0.8` row from `3.6.4` to `3.6.1`, preserve its terminal canonical Problem, add `vectors-linear-systems`, and retain cross-topic topics only with a nonempty `topicOverrideReason`.

- [ ] **Step 4: Add 150 inventory row**

```json
{
  "sourceSection": "2.2",
  "sourceItem": "9",
  "canonicalTopics": ["vectors-linear-systems"],
  "state": "needs-review",
  "canonicalProblems": [],
  "canonicalKnowledge": []
}
```

Do not add a Red item row.

- [ ] **Step 5: Verify inventory GREEN**

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
npm run test
```

Commit: `data: inventory vectors linear systems source items`.

---

### Task 3: Semantic Identity and Extension-Provenance Firewall

**Files:** modify workstream test and Green/150 ledgers.

**Interfaces:** terminal source decisions may temporarily point to public slugs that Tasks 4-7 will create; the final completion validator remains strict.

- [ ] **Step 1: Add semantic RED expectations**

```js
const semanticDecisions = {
  'green-book': {
    '3.6.1::vector-coordinate-representation': ['knowledge-only', [], ['vector-geometry-inner-products']],
    '3.6.1::dot-product': ['knowledge-only', [], ['vector-geometry-inner-products']],
    '3.6.1::euclidean-norm-distance': ['knowledge-only', [], ['vector-geometry-inner-products']],
    '3.6.1::angle-orthogonality': ['knowledge-only', [], ['vector-geometry-inner-products']],
    '3.6.1::correlation-as-cosine': ['knowledge-only', [], ['vector-geometry-inner-products', 'correlation-matrix']],
  },
  '150-most-frequently-asked': {
    '2.2::9': ['canonical-problem', ['product-of-row-stochastic-matrices'], []],
  },
};
```

Require the corrected correlation row to remain `variant`, target only `correlation-matrix-parameter-range` as its Problem, include `vector-geometry-inner-products`, and carry a resolution note matching `/geometric|angle|Gram/i`.

Add the firewall:

```js
test('repository-authored canonical extensions do not masquerade as source coverage', async () => {
  const forbiddenProblem = 'rank-and-consistency-of-linear-system';
  const forbiddenKnowledge = new Set(['linear-independence-span-basis-rank', 'linear-systems-consistency']);
  for (const source of ['green-book', 'red-book', '150-most-frequently-asked']) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    for (const entry of ledger.entries) {
      assert.ok(!entry.canonicalProblems.includes(forbiddenProblem));
      for (const slug of entry.canonicalKnowledge) assert.ok(!forbiddenKnowledge.has(slug));
    }
  }
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
```

Expected: new inventory rows still have `needs-review`.

- [ ] **Step 3: Write semantic decisions**

Set Green reusable rows to `knowledge-only`, exact targets above, and nonempty independent resolution notes.

For the Green correlation variant:

- keep `state: "variant"`;
- keep `canonicalProblems: ["correlation-matrix-parameter-range"]`;
- append `vector-geometry-inner-products` to canonical Knowledge;
- retain existing correlation/PSD Knowledge targets already attached to the row;
- resolution note states that the actual Vectors section contributes the angle/Gram interpretation to the existing family.

Set 150 `2.2::9` to:

```json
{
  "state": "canonical-problem",
  "canonicalProblems": ["product-of-row-stochastic-matrices"],
  "canonicalKnowledge": [],
  "resolutionNote": "Distinct row-stochastic closure proof using the all-ones vector invariant and a separate nonnegativity argument."
}
```

The empty hidden Knowledge list is intentional: source provenance should not claim the repository-authored rank/system extensions.

- [ ] **Step 4: Run semantic tests**

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
```

At this checkpoint semantic assertions must pass. Full unresolved-slug completion validation may remain red until public targets exist.

Commit: `data: resolve vectors linear systems semantic identities`.

---

### Task 4: Vector Geometry Knowledge and Correlation-Problem Enrichment

**Files:** create content test and vector Knowledge; modify existing correlation Problem.

**Interfaces:** source-derived vector core plus bounded extension `inner-product-projection-core`; reuses existing `correlation-matrix-parameter-range` identity.

- [ ] **Step 1: Add RED tests**

```js
test('vector geometry Knowledge covers source geometry and bounded extensions', async () => {
  const text = await readKnowledge('vector-geometry-inner-products');
  assert.match(text, /^quantInterviewTopics:\s*\[linear-algebra-matrix-methods, vectors-linear-systems\]$/m);
  assert.match(text, /x\^T y|dot product/i);
  assert.match(text, /Euclidean norm|\|\|x\|\|/i);
  assert.match(text, /cos\(theta\)|angle/i);
  assert.match(text, /orthogonal/i);
  assert.match(text, /Cauchy[- ]Schwarz/i);
  assert.match(text, /proj|projection/i);
  assert.match(text, /correlation[\s\S]{0,500}cosine|cosine[\s\S]{0,500}correlation/i);
  assert.match(text, /correlation-matrix/);
  assert.match(text, /## Interview Checks/i);
});

test('existing correlation parameter Problem absorbs the Green geometric method', async () => {
  const text = await readProblem('correlation-matrix-parameter-range');
  assert.match(text, /vector-geometry-inner-products/);
  assert.match(text, /0\.28\s*<=\s*rho\s*<=\s*1/);
  assert.match(text, /angle|Gram|unit vectors/i);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
```

- [ ] **Step 3: Create `vector-geometry-inner-products.md`**

Frontmatter:

```yaml
---
title: Vector Geometry & Inner Products
description: Dot products, Euclidean geometry, orthogonality, Cauchy-Schwarz, projection, and the cosine interpretation that links vector geometry to correlation.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-17
tags: [Linear Algebra, Vectors, Inner Product, Orthogonality, Projection]
quantInterviewTopics: [linear-algebra-matrix-methods, vectors-linear-systems]
featured: false
related: [linear-independence-span-basis-rank, linear-systems-consistency, correlation-matrix, qr-decomposition]
relatedNotes: []
---
```

Body must independently explain:

```text
x^T y = sum_i x_i y_i
||x||_2 = sqrt(x^T x)
||x-y||_2 = distance(x,y)
cos(theta) = (x^T y)/(||x|| ||y||) for nonzero x,y
|x^T y| <= ||x|| ||y||
proj_u(x) = (u^T x)/(u^T u) u for u != 0
x - proj_u(x) is orthogonal to u
```

Correlation-as-cosine is a bridge to `correlation-matrix`, not a reimplementation of PSD/correlation theory. Add Interview Checks for Cauchy-Schwarz equality, orthogonality, projection, and `|rho|<=1`.

- [ ] **Step 4: Enrich `correlation-matrix-parameter-range.md`**

Append `vector-geometry-inner-products` to `concepts`. In Variant A, add a geometric derivation: unit vectors with `cos(theta)=0.8` have mutual angle in `[0,2theta]`; maximum correlation `1`; minimum `cos(2theta)=2(0.8)^2-1=0.28`; state explicitly that this is the same canonical feasible interval as the PSD method.

- [ ] **Step 5: Verify GREEN**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
npm run test
```

Commit: `feat: add vector geometry interview knowledge`.

---

### Task 5: Span, Basis, Rank, and Null-Space Knowledge

**Files:** modify content test; create `linear-independence-span-basis-rank.md`.

- [ ] **Step 1: Add RED test**

```js
test('span basis rank Knowledge owns the structural vector-space core', async () => {
  const text = await readKnowledge('linear-independence-span-basis-rank');
  for (const phrase of ['linear combination', 'span', 'basis', 'dimension', 'column space', 'row space', 'null space', 'full column rank', 'full row rank']) assert.match(text, new RegExp(phrase, 'i'));
  assert.match(text, /linear(?:ly)? independent/i);
  assert.match(text, /rank[- ]nullity/i);
  assert.match(text, /dim\s*N\(A\)|n\s*-\s*rank\(A\)/i);
  assert.match(text, /## Interview Checks/i);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
```

- [ ] **Step 3: Create the node**

Frontmatter:

```yaml
---
title: Linear Independence, Span, Basis & Rank
description: Structural vector-space reasoning through span, independence, bases, row and column spaces, null spaces, rank, and rank-nullity.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-17
tags: [Linear Algebra, Span, Basis, Rank, Null Space]
quantInterviewTopics: [linear-algebra-matrix-methods, vectors-linear-systems]
featured: false
related: [vector-geometry-inner-products, linear-systems-consistency, eigenvalues-eigenvectors, singular-value-decomposition]
relatedNotes: []
---
```

Required identities:

```text
span(v_1,...,v_k) = {sum_i c_i v_i}
independence: sum_i c_i v_i = 0 implies every c_i = 0
basis = independent spanning set
dim(col(A)) = dim(row(A)) = rank(A)
dim N(A) + rank(A) = n for A in R^{m x n}
full column rank: rank(A)=n
full row rank: rank(A)=m
```

Explain pivot columns, redundancy, nontrivial null space, and the corrected fact that a consistent system with fewer independent equations than unknowns cannot have a unique solution. Add Interview Checks.

- [ ] **Step 4: Verify GREEN**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
npm run test
```

Commit: `feat: add span basis rank interview knowledge`.

---

### Task 6: Linear-System Consistency Knowledge

**Files:** modify content test; create `linear-systems-consistency.md`.

- [ ] **Step 1: Add RED test**

```js
test('linear systems Knowledge classifies unique none and infinite cases by rank', async () => {
  const text = await readKnowledge('linear-systems-consistency');
  assert.match(text, /Ax\s*=\s*b/);
  assert.match(text, /augmented matrix/i);
  assert.match(text, /row operations|Gaussian elimination/i);
  assert.match(text, /RREF|reduced row echelon/i);
  assert.match(text, /pivot/i);
  assert.match(text, /free variables/i);
  assert.match(text, /rank\(A\)\s*=\s*rank\(\[A\|b\]\)/);
  assert.match(text, /unique[\s\S]{0,400}rank\(A\)\s*=\s*n/i);
  assert.match(text, /infinitely many[\s\S]{0,400}rank\(A\)\s*<\s*n/i);
  assert.match(text, /no solution[\s\S]{0,400}augmented/i);
  assert.match(text, /x_p|particular solution/i);
  assert.match(text, /N\(A\)|null space/i);
  assert.match(text, /qr-decomposition|lu-cholesky-decomposition|singular-value-decomposition/);
  assert.match(text, /## Interview Checks/i);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
```

- [ ] **Step 3: Create the node**

Frontmatter:

```yaml
---
title: Linear Systems & Consistency
description: Row reduction, pivots, free variables, rank consistency, homogeneous systems, and the geometry of unique, inconsistent, and infinite solution sets.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-17
tags: [Linear Algebra, Linear Systems, RREF, Rank, Gaussian Elimination]
quantInterviewTopics: [linear-algebra-matrix-methods, vectors-linear-systems]
featured: false
related: [linear-independence-span-basis-rank, vector-geometry-inner-products, qr-decomposition, lu-cholesky-decomposition, singular-value-decomposition]
relatedNotes: []
---
```

Required statements:

```text
Ax=b is consistent iff rank(A)=rank([A|b])
consistent + rank(A)=n -> unique solution
consistent + rank(A)<n -> infinitely many solutions
rank([A|b])>rank(A) -> no solution
solution set of Ax=0 is N(A)
if x_p solves Ax=b, every solution is x_p+z with z in N(A)
```

Explain row operations as equivalent system transformations and cross-link to QR/LU/SVD without duplicating their algorithms. Add Interview Checks.

- [ ] **Step 4: Verify GREEN**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
npm run test
```

Commit: `feat: add linear systems consistency knowledge`.

---

### Task 7: Two Canonical Problems

**Files:** modify content test; create both Problem files.

**Interfaces:** source target `product-of-row-stochastic-matrices`; extension target `rank-and-consistency-of-linear-system`.

- [ ] **Step 1: Add row-stochastic RED tests**

```js
test('row stochastic closure is S3+ and preserves both defining properties', async () => {
  const text = await readProblem('product-of-row-stochastic-matrices');
  assert.match(text, /^problemId:\s*linear-algebra-stochastic-001$/m);
  assert.match(text, /^quantInterviewTopics:\s*\[linear-algebra-matrix-methods, vectors-linear-systems\]$/m);
  assert.doesNotMatch(text, /^source|Green Book|Red Book|150 Questions|Question 9/im);
  for (const heading of ['## Problem', '## Think Before Revealing', '## Solution', '## Why This Problem Matters', '## Common Mistakes', '## Extensions']) assert.match(text, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(text, /all-ones|ones column vector/i);
  assert.match(text, /A\s*1\s*=\s*1/);
  assert.match(text, /B\s*1\s*=\s*1/);
  assert.match(text, /\(AB\)\s*1\s*=\s*A\s*\(B\s*1\)/);
  assert.match(text, /nonnegative/i);
});
```

- [ ] **Step 2: Add rank/consistency RED tests**

```js
test('parameter system Problem classifies every a b regime correctly', async () => {
  const text = await readProblem('rank-and-consistency-of-linear-system');
  assert.match(text, /^problemId:\s*linear-algebra-systems-001$/m);
  assert.match(text, /^concepts:\s*\[linear-independence-span-basis-rank, linear-systems-consistency\]$/m);
  assert.match(text, /a\s*!=\s*5[\s\S]{0,600}unique/i);
  assert.match(text, /a\s*=\s*5[\s\S]{0,400}b\s*=\s*3[\s\S]{0,400}infinitely many/i);
  assert.match(text, /a\s*=\s*5[\s\S]{0,400}b\s*!=\s*3[\s\S]{0,400}no solution/i);
  assert.match(text, /rank[- ]nullity/i);
  assert.match(text, /one-dimensional null space|dim.*N\(A\).*1/i);
  assert.match(text, /determinant[\s\S]{0,500}(?:cannot|insufficient|does not)/i);
});
```

- [ ] **Step 3: Run RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
```

- [ ] **Step 4: Create `product-of-row-stochastic-matrices.md`**

Frontmatter uses:

```yaml
problemId: linear-algebra-stochastic-001
title: Product of Row-Stochastic Matrices
quantInterviewTopics: [linear-algebra-matrix-methods, vectors-linear-systems]
concepts: []
techniques: []
family: matrix-invariant-closure
mathDifficulty: 1
insightDifficulty: 2
interviewDifficulty: 2
status: solved
```

Core proof:

```text
A1=1, B1=1 -> (AB)1=A(B1)=A1=1.
(AB)_{ij}=sum_k A_{ik}B_{kj} is nonnegative because every summand is nonnegative.
```

Common mistake: checking row sums but not nonnegativity. Extensions: powers/products and Markov interpretation only.

- [ ] **Step 5: Create `rank-and-consistency-of-linear-system.md`**

Frontmatter uses:

```yaml
problemId: linear-algebra-systems-001
title: Rank and Consistency of a Parameterized Linear System
quantInterviewTopics: [linear-algebra-matrix-methods, vectors-linear-systems]
concepts: [linear-independence-span-basis-rank, linear-systems-consistency]
family: parameterized-linear-system
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
status: solved
```

Problem:

```text
x + y + z       = 1
2x + 3y + 4z    = 2
3x + 4y + a z   = b
```

Classification:

```text
a != 5        -> rank(A)=3 -> unique for every b
a = 5,b = 3  -> rank(A)=rank([A|b])=2<3 -> infinitely many
a = 5,b != 3 -> rank([A|b])=3>rank(A)=2 -> no solution
```

A row-reduction method must produce final constraint `[0,0,a-5 | b-3]`. At `a=5,b=3`, rank-nullity gives `dim N(A)=1`. Explain why `det(A)=0` alone cannot separate no-solution from infinite-solution cases.

- [ ] **Step 6: Verify GREEN**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
npm run test
```

Commit source Problem and extension Problem in separate commits if review clarity benefits from it; otherwise one bounded Problem commit is acceptable.

---

### Task 8: Global Source-Neutral Regression and Public/Audit Separation

**Files:** modify global source-neutral test and workstream test.

- [ ] **Step 1: Extend current Problem corpus**

Append:

```js
'product-of-row-stochastic-matrices',
'rank-and-consistency-of-linear-system',
```

- [ ] **Step 2: Extend exact Knowledge-topic map**

Append:

```js
['vector-geometry-inner-products', ['linear-algebra-matrix-methods', 'vectors-linear-systems']],
['linear-independence-span-basis-rank', ['linear-algebra-matrix-methods', 'vectors-linear-systems']],
['linear-systems-consistency', ['linear-algebra-matrix-methods', 'vectors-linear-systems']],
```

The global contract now covers 18 Problems and 21 explicit Knowledge/Technique nodes.

- [ ] **Step 3: Assert audit metadata is not a public dependency**

Recursively read `src/pages` and `src/layouts`; assert no file contains `canonicalExtensions` or imports `src/data/quant-interview/workstreams/linear-algebra-vectors-linear-systems-004.json`.

- [ ] **Step 4: Run full gate**

```bash
npm run test
npm run check
npm run build
```

Only update stale exact-count/topic assumptions. Never weaken source-neutrality, unresolved-reference, or relationship validation.

Commit: `test: extend source neutral interview corpus`.

---

### Task 9: Completion Gate, Real Verification Metadata, Handoff, and Cleanup

**Files:** modify workstream test, workstream JSON, handoff test, Handoff; delete temporary CI at end.

- [ ] **Step 1: Add completion RED**

Require:

```js
assert.equal(workstream.status, 'complete');
assert.deepEqual(workstream.canonicalExtensions, expectedExtensions);
```

For every key in `sourceInventory`, require terminal state, nonempty `resolutionNote`, and `validateCoverageLedger(... allowUnresolvedCanonicalRefs:false)` success. Require Red `reviewOutcome === 'no-new-direct-item'`. Require Green `knowledge-only` vector items to resolve to Knowledge with visible `## Interview Checks`. Require no source-named duplicate filenames.

- [ ] **Step 2: Run completion RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
```

Once all content/coverage invariants are green, the remaining expected failure is `status: active`.

- [ ] **Step 3: Switch only status to `complete`**

Do not add verification metadata in the same edit.

- [ ] **Step 4: Run content-complete verification and wait for a real successful GitHub Actions result**

```bash
npm run test
npm run check
npm run build
```

The execution must capture the actual content-complete commit SHA and actual successful workflow run id returned by GitHub. No value is guessed or predeclared by this plan.

- [ ] **Step 5: Write verification metadata using those actual values**

Only after Step 4 succeeds, write:

- `completedDate: "2026-08-17"`;
- `verification.commit`: the exact successful content-complete commit SHA returned in Step 4;
- `verification.runId`: the exact successful run id returned in Step 4;
- `verification.commands`: `npm run test`, `npm run check`, `npm run build`;
- `verification.conclusion`: `success`.

The repository must never contain invented verification evidence.

- [ ] **Step 6: Advance Handoff test RED**

Require Handoff to contain:

- `linear-algebra-vectors-linear-systems-004`;
- the actual verification commit/run recorded in Step 5;
- all three new Knowledge slugs;
- both new Problem slugs;
- the Green `3.6.4 -> 3.6.1` provenance correction;
- `canonicalExtensions` distinguished from hidden source coverage;
- `18 canonical Problems` and `21 explicitly topic-classified Knowledge / Technique nodes`;
- no claim of whole-book completion;
- next action chosen from remaining repository taxonomy/coverage, never source question numbering.

Run Handoff test and confirm it fails only because the document is stale.

- [ ] **Step 7: Update `docs/quant-interview/HANDOFF.md`**

Record factual source results: Green vectors/geometry; 150 row-stochastic closure; Red no-new-direct-item; provenance correction; three canonical extensions; three Knowledge nodes; two new Problems; real verification evidence; 18/21 corpus state. Do not claim full source-book or whole-Linear-Algebra completion.

- [ ] **Step 8: Run final business-tree gate**

```bash
npm run test
npm run check
npm run build
```

All must pass on the tree containing workstream verification metadata and Handoff.

- [ ] **Step 9: Review topic-only diff against the base branch**

Allowed business diff: this spec/plan, workstream validator+record, Green/150 coverage, three Knowledge nodes, two Problems, one correlation Problem enrichment, tests, Handoff. Disallowed: public UI redesign, taxonomy rewrite, TOC rewrite, unrelated topic edits.

- [ ] **Step 10: Remove temporary branch-only CI**

Delete `.github/workflows/quant-interview-vectors-linear-systems-ci.yml`. Compare the pre-cleanup verified business commit with final branch; the only difference must be this workflow deletion.

- [ ] **Step 11: Present the standard finishing menu**

```text
Implementation complete. What would you like to do?

1. Merge back to chatgpt/quant-interview-topic-first-fusion-design-2026-08-16 locally
2. Push and create a Pull Request
3. Keep the branch as-is (I'll handle it later)

Which option?
```

---

## Self-Review Result

- Spec coverage is complete: source boundaries, Red audit, Green provenance correction, extension boundary, three Knowledge nodes, two Problem identities, dedup, public source-neutrality, completion, and Handoff all map to explicit tasks.
- No canonical extension is allowed to masquerade as source coverage: source ledgers may target `vector-geometry-inner-products` because Green directly supplies that core; they may not target `linear-independence-span-basis-rank`, `linear-systems-consistency`, or `rank-and-consistency-of-linear-system`.
- Green `0.8/0.8` remains one existing canonical Problem, not a duplicate page.
- Verification evidence has no placeholders or guessed values: the plan requires waiting for GitHub to return real successful values before writing metadata.
- Mathematical classification of the extension Problem covers every `(a,b)` regime and explicitly uses the augmented rank to separate inconsistency from infinitely many solutions.
- Scope remains bounded: no new taxonomy nodes, no UI work, no advanced linear-algebra chapter expansion.
