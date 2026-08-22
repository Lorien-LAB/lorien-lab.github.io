# Quant Interview Matrix Decompositions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete one bounded Topic-first cross-book ingestion workstream for `Linear Algebra & Matrix Methods → Matrix Decompositions`, producing three canonical Knowledge nodes, one existing Knowledge enrichment, three source-neutral S3+ Problems, and terminal hidden provenance for every inspected source item.

**Architecture:** Preserve the existing Topic-first public model and hidden source-provenance model. Register one machine-readable workstream, inventory all directly inspected Green/Red/150 semantic items in hidden ledgers, perform semantic identity decisions before public authoring, update Knowledge first, then create only three genuinely distinct canonical Problems. Source page numbers, source item identifiers, and source book names remain private evidence and never enter public Markdown.

**Tech Stack:** Astro content collections, Markdown content records, JSON workstream/coverage ledgers, Node.js `node:test`, existing `quantInterviewTopics.mjs`, `quantInterviewCoverage.mjs`, and `quantInterviewWorkstreams.mjs` validators, GitHub Actions for branch-only `npm run test`, `npm run check`, and `npm run build` verification.

## Global Constraints

- Work only on `chatgpt/quant-interview-workstream-matrix-decompositions-2026-08-16`; do not modify `main`.
- Public navigation remains Topic-first; books are internal evidence sources only.
- Canonical public Problems must contain no source provenance in frontmatter, prose, route names, or `problemId` values.
- Source-derived statements must stay faithful to the inspected PDFs; canonical mathematical improvements from the approved spec must be labeled internally as reconciliation decisions rather than attributed to a source.
- Process all three verified sources inside one topic context before closing the workstream.
- Every inspected semantic source item must receive an item-level hidden coverage row and a nonempty `resolutionNote` before completion.
- `knowledge-only` is terminal only when the mapped public Knowledge preserves the interview test in `## Interview Checks` or an equivalent visible self-test.
- Red Q6.10 and 150 Questions Linear Algebra Q5 are one reasoning family and must resolve to one canonical Problem; the second matrix remains a meaningful variant, not a duplicate page.
- QR least squares must teach direct QR of the design matrix `X=QR` and `R beta = Q^T y`; normal equations may be contrasted but are not the recommended implementation.
- Cholesky must distinguish `A=LL^T` from `A=R^TR`, and generic factor non-uniqueness from unique positive-diagonal triangular Cholesky factors.
- SVD must state full/thin dimensions correctly for rectangular matrices.
- Correlated Gaussian generation must distinguish SPD Cholesky from singular-PSD spectral/SVD square-root routes.
- No source PDF, scan, copied answer key, or large verbatim source passage may be committed.
- Every implementation task follows RED → GREEN and ends with a focused commit.
- Before workstream completion, run the full repository gates: `npm run test`, `npm run check`, `npm run build`.

---

## File Structure

### New files

- `.github/workflows/quant-interview-matrix-decompositions-ci.yml` — temporary branch-only CI used during implementation; delete before finishing the branch.
- `src/data/quant-interview/workstreams/linear-algebra-matrix-decompositions-003.json` — bounded three-source workstream registration and final verification metadata.
- `src/content/knowledge/concepts/qr-decomposition.md` — canonical QR / orthogonal-factorization Knowledge.
- `src/content/knowledge/concepts/lu-cholesky-decomposition.md` — canonical LU, pivoting, triangular solves, and Cholesky Knowledge.
- `src/content/knowledge/concepts/singular-value-decomposition.md` — canonical full/thin SVD, rank, pseudoinverse, and least-squares Knowledge.
- `src/content/problems/linear-algebra/least-squares-via-qr.md` — canonical QR least-squares Problem.
- `src/content/problems/linear-algebra/matrix-square-root-and-cholesky-factor.md` — semantic merge target for Red Q6.10 and 150 Questions Q5.
- `src/content/problems/linear-algebra/generate-correlated-gaussians.md` — canonical Cholesky/spectral Gaussian simulation Problem.
- `tests/quant-interview-matrix-decompositions-workstream.test.mjs` — workstream registration, inventory, semantic identity, completion, and no-duplicate contracts.
- `tests/quant-interview-matrix-decompositions-content.test.mjs` — Knowledge and Problem content-quality contracts.

### Modified files

- `src/data/quant-interview/coverage/green-book.json` — Green Matrix Decompositions inventory and terminal semantic decisions.
- `src/data/quant-interview/coverage/red-book.json` — Red Q6.10 inventory and terminal mapping.
- `src/data/quant-interview/coverage/150-most-frequently-asked.json` — 150 Questions Q5 inventory and variant mapping.
- `src/content/knowledge/concepts/eigenbasis-decomposition.md` — add symmetric matrix functions and principal PSD square roots without duplicating SVD/Cholesky material.
- `tests/quant-interview-source-neutral-content.test.mjs` — extend the global contract from 13 to 16 canonical Problems and from 15 to 18 explicitly classified Knowledge/Technique nodes.
- `tests/quant-interview-handoff.test.mjs` — require the third workstream to be complete and advance `Next action` to `Linear Algebra & Matrix Methods → Vectors & Linear Systems`.
- `docs/quant-interview/HANDOFF.md` — durable record of completed Matrix Decompositions outputs, verification evidence, and next bounded workstream.

No public page/layout/component file should change in this plan.

---

### Task 1: Register the bounded Matrix Decompositions workstream

**Files:**
- Create: `.github/workflows/quant-interview-matrix-decompositions-ci.yml`
- Create: `tests/quant-interview-matrix-decompositions-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/linear-algebra-matrix-decompositions-003.json`
- Read only: `src/lib/quantInterviewWorkstreams.mjs`
- Read only: `src/data/quant-interview/topics/taxonomy.json`
- Read only: `src/data/quant-interview/topics/source-topic-map.json`

**Interfaces:**
- Consumes: `validateTopicWorkstream(workstream, { taxonomy, sourceTopicMap, manifests }) -> true | throws` from `src/lib/quantInterviewWorkstreams.mjs`.
- Produces: workstream id `linear-algebra-matrix-decompositions-003`, canonical topics `['linear-algebra-matrix-methods','matrix-decompositions']`, and explicit source scopes for Green, Red, and 150 Questions.

- [ ] **Step 1: Add the branch-only CI workflow**

Create `.github/workflows/quant-interview-matrix-decompositions-ci.yml` with:

```yaml
name: Quant Interview Matrix Decompositions CI

on:
  push:
    branches:
      - chatgpt/quant-interview-workstream-matrix-decompositions-2026-08-16
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

- [ ] **Step 2: Write the registration RED test**

Start `tests/quant-interview-matrix-decompositions-workstream.test.mjs` with a `readJson` helper and context loader matching the previous workstream test. Add assertions equivalent to:

```js
const workstreamPath = 'src/data/quant-interview/workstreams/linear-algebra-matrix-decompositions-003.json';
const topicSet = new Set(['linear-algebra-matrix-methods', 'matrix-decompositions']);

test('third cross-book workstream is bounded to matrix decompositions', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'linear-algebra-matrix-decompositions-003');
  assert.deepEqual(new Set(workstream.canonicalTopics), topicSet);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
  assert.equal(workstream.status, 'active');
});

test('matrix decomposition workstream source scope validates against verified manifests', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});
```

- [ ] **Step 3: Run the test and verify RED**

Run through the branch CI or locally if a checkout is available:

```bash
node --test tests/quant-interview-matrix-decompositions-workstream.test.mjs
```

Expected: FAIL because `linear-algebra-matrix-decompositions-003.json` does not exist.

- [ ] **Step 4: Create the minimal workstream record**

Create `src/data/quant-interview/workstreams/linear-algebra-matrix-decompositions-003.json` as:

```json
{
  "id": "linear-algebra-matrix-decompositions-003",
  "canonicalTopics": [
    "linear-algebra-matrix-methods",
    "matrix-decompositions"
  ],
  "status": "active",
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": ["3.6.2", "3.6.5"],
      "evidencePageRanges": [
        {"startPage": 68, "endPage": 69},
        {"startPage": 73, "endPage": 74}
      ]
    },
    {
      "source": "red-book",
      "sourceSections": ["6.2.1", "6.3.1"],
      "evidencePageRanges": [
        {"startPage": 202, "endPage": 202},
        {"startPage": 212, "endPage": 213}
      ]
    },
    {
      "source": "150-most-frequently-asked",
      "sourceSections": ["2.2", "3.2"],
      "evidencePageRanges": [
        {"startPage": 29, "endPage": 29},
        {"startPage": 72, "endPage": 76}
      ]
    }
  ]
}
```

The page numbers here are internal physical-page evidence from the approved spec and never become public content.

- [ ] **Step 5: Run registration GREEN and full gate**

Run:

```bash
node --test tests/quant-interview-matrix-decompositions-workstream.test.mjs
npm run test
npm run check
npm run build
```

Expected: PASS for registration tests and all repository gates.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/quant-interview-matrix-decompositions-ci.yml \
  tests/quant-interview-matrix-decompositions-workstream.test.mjs \
  src/data/quant-interview/workstreams/linear-algebra-matrix-decompositions-003.json
git commit -m "data: register matrix decomposition workstream"
```

---

### Task 2: Inventory every directly inspected source semantic unit

**Files:**
- Modify: `tests/quant-interview-matrix-decompositions-workstream.test.mjs`
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/coverage/red-book.json`
- Modify: `src/data/quant-interview/coverage/150-most-frequently-asked.json`

**Interfaces:**
- Consumes: coverage entry schema already enforced by `validateCoverageLedger`.
- Produces: eight item-level rows in `needs-review` state, using `sourceSection::sourceItem` as the unique audit key.

Inventory keys are fixed as:

```js
const inventory = {
  'green-book': [
    ['3.6.2', 'qr-decomposition'],
    ['3.6.2', 'least-squares-regression'],
    ['3.6.5', 'lu-decomposition'],
    ['3.6.5', 'cholesky-decomposition'],
    ['3.6.5', 'correlated-normal-generation'],
    ['3.6.5', 'singular-value-decomposition'],
  ],
  'red-book': [
    ['6.2.1', '6.10'],
  ],
  '150-most-frequently-asked': [
    ['2.2', '5'],
  ],
};
```

- [ ] **Step 1: Add the inventory RED test**

Append:

```js
test('every inspected matrix decomposition item is explicitly inventoried', async () => {
  for (const [source, keys] of Object.entries(inventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = byKey.get(`${section}::${item}`);
      assert.ok(entry, `missing inventory row ${source} ${section} ${item}`);
      assert.deepEqual(entry.canonicalTopics, ['matrix-decompositions']);
      assert.equal(entry.state, 'needs-review');
    }
  }
});
```

- [ ] **Step 2: Run and verify RED**

Run:

```bash
node --test tests/quant-interview-matrix-decompositions-workstream.test.mjs
```

Expected: FAIL at the first absent inventory row.

- [ ] **Step 3: Add the eight hidden inventory rows**

For every row, use exactly:

```json
{
  "sourceSection": "<section>",
  "sourceItem": "<item>",
  "canonicalTopics": ["matrix-decompositions"],
  "state": "needs-review",
  "canonicalProblems": [],
  "canonicalKnowledge": []
}
```

Do not attach public source fields. Do not add `topicOverrideReason` unless `validateCoverageLedger` proves the source map requires a cross-TOC override; descendant refinement from a coarse Linear Algebra section is valid without one.

- [ ] **Step 4: Run inventory GREEN and coverage validation**

Run:

```bash
node --test tests/quant-interview-matrix-decompositions-workstream.test.mjs
npm run test
```

Expected: inventory test PASS; repository coverage tests remain green.

- [ ] **Step 5: Commit**

```bash
git add tests/quant-interview-matrix-decompositions-workstream.test.mjs \
  src/data/quant-interview/coverage/green-book.json \
  src/data/quant-interview/coverage/red-book.json \
  src/data/quant-interview/coverage/150-most-frequently-asked.json
git commit -m "data: inventory matrix decomposition source items"
```

---

### Task 3: Lock semantic identity and dedup decisions in hidden coverage

**Files:**
- Modify: `tests/quant-interview-matrix-decompositions-workstream.test.mjs`
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/coverage/red-book.json`
- Modify: `src/data/quant-interview/coverage/150-most-frequently-asked.json`

**Interfaces:**
- Produces canonical target slugs that later tasks must implement exactly:
  - Knowledge: `qr-decomposition`, `lu-cholesky-decomposition`, `singular-value-decomposition`, `eigenbasis-decomposition`.
  - Problems: `least-squares-via-qr`, `matrix-square-root-and-cholesky-factor`, `generate-correlated-gaussians`.

Use the exact semantic-decision table:

```js
const semanticDecisions = {
  'green-book': {
    '3.6.2::qr-decomposition': ['knowledge-only', [], ['qr-decomposition']],
    '3.6.2::least-squares-regression': ['canonical-problem', ['least-squares-via-qr'], ['qr-decomposition']],
    '3.6.5::lu-decomposition': ['knowledge-only', [], ['lu-cholesky-decomposition']],
    '3.6.5::cholesky-decomposition': ['knowledge-only', [], ['lu-cholesky-decomposition']],
    '3.6.5::correlated-normal-generation': ['canonical-problem', ['generate-correlated-gaussians'], ['lu-cholesky-decomposition', 'singular-value-decomposition']],
    '3.6.5::singular-value-decomposition': ['knowledge-only', [], ['singular-value-decomposition']],
  },
  'red-book': {
    '6.2.1::6.10': ['canonical-problem', ['matrix-square-root-and-cholesky-factor'], ['eigenbasis-decomposition', 'lu-cholesky-decomposition']],
  },
  '150-most-frequently-asked': {
    '2.2::5': ['variant', ['matrix-square-root-and-cholesky-factor'], ['eigenbasis-decomposition', 'lu-cholesky-decomposition']],
  },
};
```

- [ ] **Step 1: Add semantic-decision RED tests**

Append tests that assert state, exact `canonicalProblems`, exact `canonicalKnowledge`, and nonempty `resolutionNote` for every table entry. Add one dedicated dedup assertion:

```js
test('red and 150 matrix square root tasks resolve to one canonical problem', async () => {
  const red = await readJson('src/data/quant-interview/coverage/red-book.json');
  const q150 = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  const redEntry = red.entries.find((entry) => entry.sourceSection === '6.2.1' && entry.sourceItem === '6.10');
  const q150Entry = q150.entries.find((entry) => entry.sourceSection === '2.2' && entry.sourceItem === '5');
  assert.deepEqual(redEntry.canonicalProblems, ['matrix-square-root-and-cholesky-factor']);
  assert.deepEqual(q150Entry.canonicalProblems, ['matrix-square-root-and-cholesky-factor']);
  assert.equal(q150Entry.state, 'variant');
});
```

- [ ] **Step 2: Run and verify RED**

Expected: FAIL because all rows are still `needs-review`.

- [ ] **Step 3: Replace `needs-review` rows with terminal semantic decisions**

Every row receives a concrete `resolutionNote`. Use meaning equivalent to the following, without exposing it publicly:

- Green QR definition: canonical reusable orthogonal-factorization Knowledge; no standalone Problem.
- Green least squares: distinct interview reasoning task; canonical Problem uses direct QR on `X`, while source normal-equation presentation remains evidence only.
- Green LU definition: reusable elimination/triangular-solve Knowledge; no standalone Problem.
- Green Cholesky definition: same reusable decomposition ontology; no duplicate page.
- Green Gaussian generation: independent simulation reasoning task; canonical Problem generalizes 2D construction to SPD/PSD covariance factors.
- Green SVD definition: reusable rectangular/rank-aware Knowledge; no standalone Problem.
- Red Q6.10: semantic anchor for the matrix-square-root/factor Problem; entrywise source method becomes an alternative, while canonical page foregrounds spectral structure.
- 150 Q5: same reasoning family with a different matrix and useful spectral/Cholesky method; retain as a meaningful variant inside the same canonical Problem.

- [ ] **Step 4: Run semantic GREEN**

Run:

```bash
node --test tests/quant-interview-matrix-decompositions-workstream.test.mjs
```

Expected: PASS for registration, inventory, semantic decisions, and dedup identity. Full suite may temporarily fail unresolved-canonical-ref checks until Knowledge/Problem targets are created; if so, the failure must be only those expected missing slugs.

- [ ] **Step 5: Commit**

```bash
git add tests/quant-interview-matrix-decompositions-workstream.test.mjs \
  src/data/quant-interview/coverage/green-book.json \
  src/data/quant-interview/coverage/red-book.json \
  src/data/quant-interview/coverage/150-most-frequently-asked.json
git commit -m "data: resolve matrix decomposition semantic identities"
```

---

### Task 4: Author canonical QR Knowledge first

**Files:**
- Create: `src/content/knowledge/concepts/qr-decomposition.md`
- Create or begin: `tests/quant-interview-matrix-decompositions-content.test.mjs`

**Interfaces:**
- Produces Knowledge slug `qr-decomposition` used by coverage and `least-squares-via-qr`.

- [ ] **Step 1: Write QR Knowledge RED test**

Create `tests/quant-interview-matrix-decompositions-content.test.mjs` and assert:

```js
const knowledgePaths = {
  qr: 'src/content/knowledge/concepts/qr-decomposition.md',
  luCholesky: 'src/content/knowledge/concepts/lu-cholesky-decomposition.md',
  svd: 'src/content/knowledge/concepts/singular-value-decomposition.md',
  eigenbasis: 'src/content/knowledge/concepts/eigenbasis-decomposition.md',
};

test('QR Knowledge covers orthogonality dimensions least squares and rank boundaries', async () => {
  const text = await readFile(knowledgePaths.qr, 'utf8');
  assert.match(text, /^quantInterviewTopics: \[linear-algebra-matrix-methods, matrix-decompositions\]$/m);
  assert.match(text, /Q\^TQ\s*=\s*I|orthogonal/i);
  assert.match(text, /thin|economy/i);
  assert.match(text, /full QR|square QR/i);
  assert.match(text, /X\s*=\s*QR[\s\S]{0,300}R.*beta.*Q\^T.*y/i);
  assert.match(text, /condition number[\s\S]{0,220}squared|X\^T X[\s\S]{0,220}condition/i);
  assert.match(text, /Householder|modified Gram-Schmidt/i);
  assert.match(text, /rank deficient|pivot/i);
  assert.match(text, /positive diagonal[\s\S]{0,180}unique|uniqueness[\s\S]{0,180}positive diagonal/i);
  assert.match(text, /## Interview Checks/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});
```

- [ ] **Step 2: Run and verify RED**

Expected: FAIL because `qr-decomposition.md` does not exist.

- [ ] **Step 3: Create `qr-decomposition.md`**

Use frontmatter:

```yaml
---
title: QR Decomposition
description: Orthogonal-triangular factorization, thin versus full QR, triangular solves, and numerically stable least-squares reduction.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-16
tags: [Linear Algebra, QR, Orthogonality, Least Squares, Numerical Methods]
quantInterviewTopics: [linear-algebra-matrix-methods, matrix-decompositions]
featured: false
related: [lu-cholesky-decomposition, singular-value-decomposition]
relatedNotes: []
---
```

The body must explicitly teach:

1. Square QR `A=QR` for square nonsingular matrices.
2. Thin QR for `X in R^{m x n}`, `m>=n`, full column rank: `Q in R^{m x n}`, `R in R^{n x n}`, `Q^TQ=I_n`.
3. Full QR: `Q_full in R^{m x m}`, rectangular `R_full in R^{m x n}`.
4. Direct linear solve for square systems via `Rx=Q^Tb`.
5. Direct least squares: minimize `||y-X beta||_2`; with thin QR solve `R beta=Q^T y`.
6. Projection interpretation: fitted vector is `QQ^T y` under full column rank.
7. Contrast with normal equations: `X^T X beta=X^Ty`, but forming `X^TX` squares the 2-norm condition number.
8. Gram-Schmidt as conceptual construction, while Householder QR or modified Gram-Schmidt is preferable in numerical software.
9. Rank-deficient boundary: ordinary unpivoted full-rank solve fails; use column-pivoted QR or SVD.
10. Sign ambiguity and positive diagonal of `R` as the standard uniqueness convention.
11. `## Interview Checks` containing at least: derive the least-squares triangular system, state thin dimensions, explain why inverse-first is unnecessary, and describe rank-deficient fallback.

- [ ] **Step 4: Run QR GREEN**

Run:

```bash
node --test tests/quant-interview-matrix-decompositions-content.test.mjs
```

Expected: QR Knowledge test PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/knowledge/concepts/qr-decomposition.md \
  tests/quant-interview-matrix-decompositions-content.test.mjs
git commit -m "content: add canonical QR decomposition knowledge"
```

---

### Task 5: Author LU/Cholesky Knowledge and enrich principal matrix-square-root Knowledge

**Files:**
- Create: `src/content/knowledge/concepts/lu-cholesky-decomposition.md`
- Modify: `src/content/knowledge/concepts/eigenbasis-decomposition.md`
- Modify: `tests/quant-interview-matrix-decompositions-content.test.mjs`

**Interfaces:**
- Produces `lu-cholesky-decomposition` for two Problems.
- Extends existing `eigenbasis-decomposition` with symmetric matrix functions and `A^{1/2}`.

- [ ] **Step 1: Add RED tests**

Add:

```js
test('LU and Cholesky Knowledge distinguishes pivoting SPD conventions and uniqueness', async () => {
  const text = await readFile(knowledgePaths.luCholesky, 'utf8');
  assert.match(text, /PA\s*=\s*LU|pivot/i);
  assert.match(text, /forward substitution/i);
  assert.match(text, /back substitution/i);
  assert.match(text, /determinant[\s\S]{0,200}diagonal/i);
  assert.match(text, /symmetric positive definite|SPD/i);
  assert.match(text, /A\s*=\s*LL\^T|A\s*=\s*R\^T\s*R/i);
  assert.match(text, /positive diagonal[\s\S]{0,220}unique|unique[\s\S]{0,220}positive diagonal/i);
  assert.match(text, /generic[\s\S]{0,180}not unique|C\^T C[\s\S]{0,180}not unique/i);
  assert.match(text, /singular|positive semidefinite|PSD/i);
  assert.match(text, /## Interview Checks/i);
});

test('eigenbasis Knowledge supports symmetric matrix functions and the principal PSD square root', async () => {
  const text = await readFile(knowledgePaths.eigenbasis, 'utf8');
  assert.match(text, /f\(A\)[\s\S]{0,200}f\(Lambda\)|matrix function/i);
  assert.match(text, /principal square root|principal PSD square root/i);
  assert.match(text, /Q.*Lambda.*Q\^T|symmetric/i);
  assert.match(text, /negative eigenvalue[\s\S]{0,180}real symmetric|nonnegative eigenvalue/i);
});
```

- [ ] **Step 2: Run and verify RED**

Expected: `lu-cholesky-decomposition.md` absent and eigenbasis square-root assertions fail.

- [ ] **Step 3: Create `lu-cholesky-decomposition.md`**

Use frontmatter with `quantInterviewTopics: [linear-algebra-matrix-methods, matrix-decompositions]`, `status: growing`, and related links to `qr-decomposition`, `singular-value-decomposition`, and `positive-semidefinite-matrix`.

Body requirements:

- LU as Gaussian-elimination structure.
- Generic numerical form to remember: `PA=LU` because pivoting is needed for stability/existence under a fixed no-pivot convention.
- Solve workflow: `Ly=Pb`, then `Ux=y`.
- Determinant from triangular factors and permutation sign.
- Cholesky for SPD matrices only under the ordinary unpivoted factorization.
- Both `A=LL^T` and `A=R^TR` conventions.
- Positive diagonal triangular factor is unique under a fixed convention.
- Generic `A=C^TC` or `A=CC^T` factor is not unique: orthogonal transformations preserve the Gram product.
- Cholesky is a structured SPD specialization and avoids unnecessary general LU work.
- Singular PSD matrices may not admit ordinary positive-diagonal Cholesky; use pivoted/generalized methods or a spectral/SVD square-root factor.
- `## Interview Checks` covering pivoting, solve order, uniqueness, and SPD/PSD boundary.

- [ ] **Step 4: Enrich `eigenbasis-decomposition.md` minimally**

Add a section titled `## Matrix functions and square roots` after the existing matrix-power discussion. It must state:

```text
For a real symmetric matrix A = Q Lambda Q^T and a scalar function f defined on the spectrum,
f(A) = Q f(Lambda) Q^T.
```

For PSD `A`, define the principal PSD square root:

```text
A^{1/2} = Q Lambda^{1/2} Q^T,
```

with nonnegative square roots on the diagonal. State that it is the unique symmetric PSD square root, while other non-principal square roots may exist in broader settings. State that a negative eigenvalue blocks a real symmetric PSD square root. Do not duplicate LU/Cholesky or SVD derivations here.

- [ ] **Step 5: Run GREEN**

Run the Matrix Decompositions content test. Expected: both new tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/content/knowledge/concepts/lu-cholesky-decomposition.md \
  src/content/knowledge/concepts/eigenbasis-decomposition.md \
  tests/quant-interview-matrix-decompositions-content.test.mjs
git commit -m "content: add LU Cholesky and matrix square root knowledge"
```

---

### Task 6: Author canonical SVD Knowledge

**Files:**
- Create: `src/content/knowledge/concepts/singular-value-decomposition.md`
- Modify: `tests/quant-interview-matrix-decompositions-content.test.mjs`

**Interfaces:**
- Produces `singular-value-decomposition` for Gaussian simulation and rank-deficient least-squares extensions.

- [ ] **Step 1: Add SVD RED test**

Assert:

```js
test('SVD Knowledge is dimensionally precise and connects rank pseudoinverse and least squares', async () => {
  const text = await readFile(knowledgePaths.svd, 'utf8');
  assert.match(text, /A\s*(?:in|∈).*R\^\{?m.*n|m x n/i);
  assert.match(text, /full SVD/i);
  assert.match(text, /thin SVD|compact SVD|reduced SVD/i);
  assert.match(text, /U_r|Sigma_r|V_r|rank r/i);
  assert.match(text, /A\^T A[\s\S]{0,220}singular value|singular value[\s\S]{0,220}A\^T A/i);
  assert.match(text, /pseudoinverse|Moore-Penrose/i);
  assert.match(text, /rank deficient|ill-conditioned/i);
  assert.match(text, /least squares/i);
  assert.match(text, /## Interview Checks/i);
});
```

- [ ] **Step 2: Run RED**

Expected: FAIL because the Knowledge file is absent.

- [ ] **Step 3: Create `singular-value-decomposition.md`**

Required body:

- For `A in R^{m x n}`, full SVD `A=U Sigma V^T` with `U in R^{m x m}`, `V in R^{n x n}`, and rectangular `Sigma in R^{m x n}`.
- Rank-`r` thin SVD `A=U_r Sigma_r V_r^T`, with `U_r in R^{m x r}`, `Sigma_r in R^{r x r}`, `V_r in R^{n x r}`.
- Nonnegative singular values in descending order.
- Right singular vectors diagonalize `A^TA`; left singular vectors diagonalize `AA^T`; nonzero eigenvalues are squared singular values.
- Rank equals number of nonzero singular values.
- Pseudoinverse `A^+=V_r Sigma_r^{-1}U_r^T` when using nonzero singular directions.
- Least-squares/minimum-norm interpretation and why SVD is the robust fallback for rank deficiency/ill-conditioning.
- Difference from eigendecomposition: SVD exists for any rectangular matrix and uses two orthogonal bases.
- PSD covariance square-root connection through an eigendecomposition/SVD of a symmetric covariance matrix.
- `## Interview Checks` on dimensions, rank, pseudoinverse, and relation to `A^TA`.

- [ ] **Step 4: Run SVD GREEN**

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/knowledge/concepts/singular-value-decomposition.md \
  tests/quant-interview-matrix-decompositions-content.test.mjs
git commit -m "content: add canonical singular value decomposition knowledge"
```

---

### Task 7: Create the canonical QR least-squares Problem

**Files:**
- Create: `src/content/problems/linear-algebra/least-squares-via-qr.md`
- Modify: `tests/quant-interview-matrix-decompositions-content.test.mjs`

**Interfaces:**
- Problem slug: `least-squares-via-qr`
- `problemId`: `linear-algebra-decomposition-001`
- Concepts: `[qr-decomposition]`
- Topics: `[linear-algebra-matrix-methods, matrix-decompositions]`

- [ ] **Step 1: Add the Problem RED test**

Add S3 markers shared with existing content tests and assert:

```js
test('least-squares QR problem solves an overdetermined system without normal-equation inversion', async () => {
  const text = await readFile('src/content/problems/linear-algebra/least-squares-via-qr.md', 'utf8');
  assert.match(text, /\[\[1,\s*0\],\s*\[1,\s*1\],\s*\[1,\s*-1\]\]/);
  assert.match(text, /y\s*=\s*\[1,\s*2,\s*1\]/i);
  assert.match(text, /4\/3|\\frac\{4\}\{3\}/);
  assert.match(text, /1\/2|\\frac\{1\}\{2\}/);
  assert.match(text, /R.*beta.*Q\^T.*y/is);
  assert.match(text, /projection|QQ\^T y|orthogonal.*residual/i);
  assert.match(text, /condition number[\s\S]{0,220}squared|X\^T X[\s\S]{0,220}condition/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});
```

- [ ] **Step 2: Run RED**

Expected: FAIL because the Problem file is absent.

- [ ] **Step 3: Create source-neutral frontmatter**

Use:

```yaml
---
problemId: linear-algebra-decomposition-001
title: Least Squares by QR, Without Forming an Inverse
description: Solve a small overdetermined regression by thin QR, interpret the projection geometry, and explain why direct QR is better conditioned than normal-equation inversion.
date: 2026-08-16
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [QR Decomposition, Least Squares]
tags: [Linear Algebra, QR, Least Squares, Numerical Methods, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, matrix-decompositions]
concepts: [qr-decomposition]
techniques: []
prerequisites: []
relatedProblems: []
family: matrix-decomposition-least-squares
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---
```

- [ ] **Step 4: Author the exact worked example and S3+ solution**

Problem data:

```text
X = [[1,0],[1,1],[1,-1]],  y = [1,2,1]^T.
```

Use the already orthogonal columns to make the QR arithmetic transparent:

```text
q1 = (1,1,1)^T / sqrt(3)
q2 = (0,1,-1)^T / sqrt(2)
R = diag(sqrt(3), sqrt(2))
Q^T y = (4/sqrt(3), 1/sqrt(2))^T
beta_hat = (4/3, 1/2)^T
```

Verify the residual:

```text
r = y - X beta_hat = (-1/3, 1/6, 1/6)^T
X^T r = 0.
```

Required sections: `## Problem`, `## Think Before Revealing`, at least two hints, `## Solution`, `## Why This Problem Matters`, `## Common Mistakes`, `## Extensions`. The solution must contrast but not recommend forming `(X^TX)^{-1}X^Ty`; explain that `kappa_2(X^TX)=kappa_2(X)^2` when the relevant full-rank assumptions hold. Extension: column-pivoted QR / SVD for rank deficiency.

- [ ] **Step 5: Run GREEN**

Expected: the dedicated Problem test passes.

- [ ] **Step 6: Commit**

```bash
git add src/content/problems/linear-algebra/least-squares-via-qr.md \
  tests/quant-interview-matrix-decompositions-content.test.mjs
git commit -m "content: add least squares via QR problem"
```

---

### Task 8: Merge the two source matrix-square-root tasks into one canonical Problem

**Files:**
- Create: `src/content/problems/linear-algebra/matrix-square-root-and-cholesky-factor.md`
- Modify: `tests/quant-interview-matrix-decompositions-content.test.mjs`

**Interfaces:**
- Problem slug: `matrix-square-root-and-cholesky-factor`
- `problemId`: `linear-algebra-decomposition-002`
- Concepts: `[eigenbasis-decomposition, lu-cholesky-decomposition]`

- [ ] **Step 1: Add RED tests for the canonical task and variant**

Assert the public page contains the canonical Red-family matrix and the 150-family variant, but no source identifiers:

```js
test('matrix square root problem separates principal square root from Cholesky and retains one variant', async () => {
  const text = await readFile('src/content/problems/linear-algebra/matrix-square-root-and-cholesky-factor.md', 'utf8');
  assert.match(text, /\[\[5,\s*-3\],\s*\[-3,\s*5\]\]/);
  assert.match(text, /eigenvalues?.*2.*8|2.*8.*eigenvalues?/is);
  assert.match(text, /principal.*square root/is);
  assert.match(text, /sqrt\(2\).*\[\[3,\s*-1\],\s*\[-1,\s*3\]\].*\/\s*2|\\frac\{\\sqrt\{2\}\}\{2\}/is);
  assert.match(text, /Cholesky/i);
  assert.match(text, /unique[\s\S]{0,220}positive diagonal|positive diagonal[\s\S]{0,220}unique/i);
  assert.match(text, /generic[\s\S]{0,220}not unique|orthogonal[\s\S]{0,220}factor/i);
  assert.match(text, /\[\[2,\s*-2\],\s*\[-2,\s*5\]\]/);
  assert.match(text, /variant/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});
```

- [ ] **Step 2: Run RED**

Expected: FAIL because the Problem does not exist.

- [ ] **Step 3: Create source-neutral frontmatter**

Use `problemId: linear-algebra-decomposition-002`, topic `[linear-algebra-matrix-methods, matrix-decompositions]`, concepts `[eigenbasis-decomposition, lu-cholesky-decomposition]`, solved status, and S3+ difficulty metadata.

- [ ] **Step 4: Author the primary canonical example**

Primary matrix:

```text
A = [[5,-3],[-3,5]].
```

Teach the spectral route:

```text
lambda_1 = 2 with q_1=(1,1)/sqrt(2)
lambda_2 = 8 with q_2=(1,-1)/sqrt(2)
A^{1/2} = Q diag(sqrt(2), 2sqrt(2)) Q^T
          = (sqrt(2)/2) [[3,-1],[-1,3]].
```

Directly verify `(A^{1/2})^2=A`.

Then give lower-triangular Cholesky:

```text
L = [[sqrt(5), 0],[-3/sqrt(5), 4/sqrt(5)]],
A = LL^T.
```

State the transpose-equivalent upper convention `A=R^TR` with `R=L^T`.

Explain the constraint distinction:

- `M^2=A` is a matrix square-root equation.
- `CC^T=A` or `C^TC=A` is a Gram/factor equation.
- The symmetric PSD principal square root is unique within that class.
- Generic Gram factors are non-unique; orthogonal transformations preserve the product.
- Positive-diagonal triangular Cholesky is unique under the fixed lower/upper convention.

- [ ] **Step 5: Retain the second source matrix as a meaningful variant**

Add `## Variant` using:

```text
A = [[2,-2],[-2,5]].
```

Record its eigenvalues `1` and `6`, normalized eigendirections based on `(2,1)` and `(1,-2)`, and principal square root:

```text
A^{1/2} = (1/5) [[4+sqrt(6), 2-2sqrt(6)], [2-2sqrt(6), 1+4sqrt(6)]].
```

Give the convenient Cholesky factor:

```text
L = [[sqrt(2),0],[-sqrt(2),sqrt(3)]],
A=LL^T.
```

This variant must stay inside the same public Problem.

- [ ] **Step 6: Include the source-derived entrywise route only as an alternative method**

The page may include an `Alternative: solve entries directly` subsection for a `2x2` square root, but the canonical first solution must be spectral. Do not attribute the alternative to a book in public prose.

- [ ] **Step 7: Run GREEN and commit**

```bash
node --test tests/quant-interview-matrix-decompositions-content.test.mjs
git add src/content/problems/linear-algebra/matrix-square-root-and-cholesky-factor.md \
  tests/quant-interview-matrix-decompositions-content.test.mjs
git commit -m "content: merge matrix square root factor problems"
```

---

### Task 9: Create the correlated-Gaussian generation Problem

**Files:**
- Create: `src/content/problems/linear-algebra/generate-correlated-gaussians.md`
- Modify: `tests/quant-interview-matrix-decompositions-content.test.mjs`

**Interfaces:**
- Problem slug: `generate-correlated-gaussians`
- `problemId`: `linear-algebra-decomposition-003`
- Concepts: `[lu-cholesky-decomposition, singular-value-decomposition, positive-semidefinite-matrix]`

- [ ] **Step 1: Add RED test**

Assert:

```js
test('correlated Gaussian problem verifies covariance and distinguishes SPD from PSD factor routes', async () => {
  const text = await readFile('src/content/problems/linear-algebra/generate-correlated-gaussians.md', 'utf8');
  assert.match(text, /x_?1\s*=\s*z_?1/i);
  assert.match(text, /rho.*z_?1.*sqrt\(1-rho\^2\).*z_?2|sqrt\(1\s*-\s*rho\^2\)/i);
  assert.match(text, /cov.*rho|correlation.*rho/i);
  assert.match(text, /Sigma\s*=\s*LL\^T|LL\^T\s*=\s*Sigma/i);
  assert.match(text, /x\s*=\s*mu\s*\+\s*Lz/i);
  assert.match(text, /Cov\(x\)|covariance[\s\S]{0,220}L.*L\^T/i);
  assert.match(text, /singular|PSD|semidefinite/i);
  assert.match(text, /spectral|SVD|eigendecomposition/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});
```

- [ ] **Step 2: Run RED**

Expected: FAIL because the Problem is absent.

- [ ] **Step 3: Create source-neutral frontmatter**

Use `problemId: linear-algebra-decomposition-003`, Matrix Decompositions topics, solved status, and concepts `[lu-cholesky-decomposition, singular-value-decomposition, positive-semidefinite-matrix]`.

- [ ] **Step 4: Author 2D construction and direct verification**

For independent `z1,z2 ~ N(0,1)` and `|rho|<=1`, define:

```text
x1 = z1
x2 = rho z1 + sqrt(1-rho^2) z2.
```

Verify:

```text
Var(x1)=1,
Var(x2)=rho^2+(1-rho^2)=1,
Cov(x1,x2)=rho.
```

- [ ] **Step 5: Generalize to n dimensions**

For SPD covariance `Sigma=LL^T` and `z~N(0,I)`, define `x=mu+Lz` and calculate:

```text
Cov(x)=L Cov(z) L^T = LL^T = Sigma.
```

If using upper Cholesky `Sigma=R^TR`, state that the matching draw is `x=mu+R^T z`.

For singular PSD covariance, explain ordinary positive-diagonal Cholesky may fail; use `Sigma=Q Lambda Q^T`, `B=Q Lambda^{1/2}`, then `x=mu+Bz`, or an equivalent SVD/spectral square-root factor.

- [ ] **Step 6: Add S3+ interview structure**

Include progressive hints, why covariance validity/PSD matters, Common Mistakes (wrong transpose orientation, forgetting `|rho|<=1`, assuming singular PSD admits ordinary Cholesky), and Monte Carlo extensions.

- [ ] **Step 7: Run GREEN and commit**

```bash
node --test tests/quant-interview-matrix-decompositions-content.test.mjs
git add src/content/problems/linear-algebra/generate-correlated-gaussians.md \
  tests/quant-interview-matrix-decompositions-content.test.mjs
git commit -m "content: add correlated Gaussian factor problem"
```

---

### Task 10: Extend global source-neutral contracts, close the workstream, and advance Handoff

**Files:**
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`
- Modify: `tests/quant-interview-matrix-decompositions-workstream.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`
- Modify: `src/data/quant-interview/workstreams/linear-algebra-matrix-decompositions-003.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Delete before finish: `.github/workflows/quant-interview-matrix-decompositions-ci.yml`

**Interfaces:**
- Consumes real Markdown slug sets and `validateCoverageLedger(..., allowUnresolvedCanonicalRefs:false)`.
- Produces a `status: complete` workstream with real verification metadata and durable next action `Linear Algebra & Matrix Methods → Vectors & Linear Systems`.

- [ ] **Step 1: Extend the global source-neutral RED contract**

In `tests/quant-interview-source-neutral-content.test.mjs`, append the three Problem slugs to `currentProblemSlugs`:

```js
'least-squares-via-qr',
'matrix-square-root-and-cholesky-factor',
'generate-correlated-gaussians',
```

Add the exact Knowledge-topic entries:

```js
['qr-decomposition', ['linear-algebra-matrix-methods', 'matrix-decompositions']],
['lu-cholesky-decomposition', ['linear-algebra-matrix-methods', 'matrix-decompositions']],
['singular-value-decomposition', ['linear-algebra-matrix-methods', 'matrix-decompositions']],
```

This raises the explicit test corpus from 13 to 16 Problems and from 15 to 18 Knowledge/Technique nodes; public UI counts remain dynamically derived and are not hard-coded.

- [ ] **Step 2: Add completion RED tests**

In the workstream test, add helpers `markdownSlugs` and `findKnowledge` following the previous workstream. Assert:

1. all eight inventory rows are terminal, not `pending` or `needs-review`;
2. `validateCoverageLedger` passes for all three ledgers with real `problemSlugs`, real `knowledgeSlugs`, and `allowUnresolvedCanonicalRefs:false`;
3. every `knowledge-only` target has `## Interview Checks`;
4. Red `6.10` and 150 `5` still point to the same single canonical square-root Problem;
5. no file under `src/content/problems/linear-algebra/` contains `green`, `red`, `150`, or `frequently-asked` in its filename;
6. workstream status is `complete`.

Run the test now. Expected: only the status assertion fails because all targets already exist and hidden coverage is terminal.

- [ ] **Step 3: Mark content complete, without inventing verification evidence**

Change only:

```json
"status": "complete"
```

Do not add a run id yet.

- [ ] **Step 4: Run the content-complete full gate**

Run via branch CI:

```bash
npm run test
npm run check
npm run build
```

Wait for the workflow conclusion to be formally `success`. Record the exact commit SHA and exact GitHub Actions run id from this successful run.

- [ ] **Step 5: Backfill real verification metadata**

Add to the workstream JSON:

```json
"completedDate": "2026-08-16",
"verification": {
  "commit": "<exact content-complete commit SHA from Step 4>",
  "runId": <exact successful run id from Step 4>,
  "commands": [
    "npm run test",
    "npm run check",
    "npm run build"
  ],
  "conclusion": "success"
}
```

When implementing, replace the two bracketed values with the actual evidence returned by GitHub Actions; never pre-fill or guess them.

- [ ] **Step 6: Advance the Handoff RED contract**

Modify `tests/quant-interview-handoff.test.mjs` to require:

- `linear-algebra-matrix-decompositions-003`;
- all three new Knowledge slugs;
- all three new Problem slugs;
- the actual verification run id and commit from Step 4;
- `Next action` contains `cross-book`, `Linear Algebra & Matrix Methods`, and `Vectors & Linear Systems`;
- `Next action` does not contain source question sequencing or book-by-book order.

Run the test and confirm the old Handoff fails.

- [ ] **Step 7: Rewrite `docs/quant-interview/HANDOFF.md`**

Keep the durable architecture section concise, then add `Completed cross-book workstream 3` with:

- identity `linear-algebra-matrix-decompositions-003`;
- canonical scope;
- real verification evidence;
- canonical Knowledge: `qr-decomposition`, `lu-cholesky-decomposition`, `singular-value-decomposition`, enriched `eigenbasis-decomposition`;
- canonical Problems: `least-squares-via-qr`, `matrix-square-root-and-cholesky-factor`, `generate-correlated-gaussians`;
- semantic-dedup note explaining Red Q6.10 + 150 Q5 became one public Problem with a variant;
- source-reconciliation note distinguishing direct QR from normal-equation-first source presentation, Cholesky uniqueness from generic factors, and SPD/PSD simulation routes;
- current public corpus count: 16 canonical Problems and 18 explicitly topic-classified Knowledge/Technique nodes, explicitly labeled repository-record counts rather than whole-book completeness;
- next bounded workstream: `Linear Algebra & Matrix Methods → Vectors & Linear Systems`.

Do not include source page numbers or public source-question provenance in Handoff prose that could be mistaken for public content; source identifiers may be mentioned only as internal audit context if required to explain dedup.

- [ ] **Step 8: Run final fresh repository gate**

Run on the commit containing verification metadata and Handoff:

```bash
npm run test
npm run check
npm run build
```

Expected: all commands exit 0. This final run is distinct from the content-complete evidence stored in the workstream record; the stored evidence should continue to point to the first real content-complete run.

- [ ] **Step 9: Review the topic-only diff**

Compare the feature branch against `chatgpt/quant-interview-topic-first-fusion-design-2026-08-16` and verify the changed-file set is limited to:

```text
docs/superpowers/specs/2026-08-16-quant-interview-matrix-decompositions-design.md
docs/superpowers/plans/2026-08-16-quant-interview-matrix-decompositions.md
docs/quant-interview/HANDOFF.md
src/content/knowledge/concepts/qr-decomposition.md
src/content/knowledge/concepts/lu-cholesky-decomposition.md
src/content/knowledge/concepts/singular-value-decomposition.md
src/content/knowledge/concepts/eigenbasis-decomposition.md
src/content/problems/linear-algebra/least-squares-via-qr.md
src/content/problems/linear-algebra/matrix-square-root-and-cholesky-factor.md
src/content/problems/linear-algebra/generate-correlated-gaussians.md
src/data/quant-interview/coverage/green-book.json
src/data/quant-interview/coverage/red-book.json
src/data/quant-interview/coverage/150-most-frequently-asked.json
src/data/quant-interview/workstreams/linear-algebra-matrix-decompositions-003.json
tests/quant-interview-matrix-decompositions-content.test.mjs
tests/quant-interview-matrix-decompositions-workstream.test.mjs
tests/quant-interview-source-neutral-content.test.mjs
tests/quant-interview-handoff.test.mjs
.github/workflows/quant-interview-matrix-decompositions-ci.yml   # temporary only, removed in Step 10
```

Any unrelated page/layout/TOC/taxonomy/topic content change is a blocker and must be removed before finishing.

- [ ] **Step 10: Delete the branch-only CI workflow**

Delete `.github/workflows/quant-interview-matrix-decompositions-ci.yml` only after the final business tree has a fresh successful full gate. Compare the verified business commit to the final branch head and confirm the only difference is removal of this workflow file.

- [ ] **Step 11: Commit closure**

Use focused commits rather than one giant closure commit. The final durable docs/metadata commit may be:

```bash
git add src/data/quant-interview/workstreams/linear-algebra-matrix-decompositions-003.json \
  docs/quant-interview/HANDOFF.md \
  tests/quant-interview-handoff.test.mjs \
  tests/quant-interview-source-neutral-content.test.mjs \
  tests/quant-interview-matrix-decompositions-workstream.test.mjs
git commit -m "docs: complete matrix decomposition workstream handoff"
```

Then remove the temporary CI in its own final cleanup commit.

---

## Plan Self-Review Result

### Spec coverage

- Three-source bounded registration: Task 1.
- Exact item inventory: Task 2.
- Semantic identity and Red/150 dedup: Task 3.
- QR Knowledge and direct QR least squares: Tasks 4 and 7.
- LU, pivoting, Cholesky orientation/uniqueness, SPD/PSD boundary: Task 5.
- Principal matrix square root and matrix-function enrichment: Tasks 5 and 8.
- Dimensionally correct SVD, pseudoinverse, rank-deficient least squares: Task 6.
- Correlated Gaussian Cholesky/spectral/SVD routes: Task 9.
- Source-neutral global contract, true slug resolution, `knowledge-only` public self-tests: Task 10.
- Handoff and final verification/diff cleanup: Task 10.

### Placeholder scan

The only angle-bracket values in this plan occur in Step 10.5 as explicit runtime evidence slots that must be populated from the successful GitHub Actions run immediately before writing verification metadata. They are not implementation ambiguity and must never be guessed.

### Interface consistency

- Workstream id is consistently `linear-algebra-matrix-decompositions-003`.
- Topic id is consistently `matrix-decompositions` under `linear-algebra-matrix-methods`.
- Canonical Knowledge slugs are consistently `qr-decomposition`, `lu-cholesky-decomposition`, `singular-value-decomposition`, and existing `eigenbasis-decomposition`.
- Canonical Problem slugs are consistently `least-squares-via-qr`, `matrix-square-root-and-cholesky-factor`, and `generate-correlated-gaussians`.
- Source audit keys use the stable `sourceSection::sourceItem` convention.
- Public `problemId` values are `linear-algebra-decomposition-001`, `-002`, and `-003`, with no source identity.
