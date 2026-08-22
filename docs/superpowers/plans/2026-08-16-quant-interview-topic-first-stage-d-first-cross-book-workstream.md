# Quant Interview Topic-First Stage D First Cross-Book Workstream Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prove the full Topic-first cross-book ingestion loop on one bounded workstream: `Linear Algebra & Matrix Methods → Covariance / Correlation / PSD`, reconciling related material from Green Book, Red Book, and 150 Questions into canonical Knowledge and a deduplicated Problem set.

**Architecture:** Register one hidden cross-book workstream with per-source scopes/evidence, read and inventory all relevant source items, perform semantic dedup against existing canonical content, enrich Knowledge first, then create only genuinely distinct canonical Problems. Every inspected source item receives a terminal or explicit review state in the hidden coverage ledger. Public content remains source-neutral.

**Tech Stack:** Astro 5, Markdown Knowledge/Problems, JSON workstream/coverage data, ESM validators, Node built-in test runner.

## Global Constraints

- Requires Stages A–C merged and green.
- Workstream ID is exactly `linear-algebra-covariance-correlation-psd-001`.
- Canonical topic scope is exactly `linear-algebra-matrix-methods`, `covariance-correlation-matrices`, and `positive-semidefinite-matrices`.
- Do not ingest unrelated linear algebra questions merely because they share source pages.
- Source statements are evidence, not copy text; public wording and derivations must be independently authored.
- Source page numbers remain internal and never render publicly.
- Semantic dedup compares state, target, constraints, structure, and solution insight; text similarity alone cannot merge items.
- Conceptual source questions represented `knowledge-only` must still appear as explicit public `Interview Checks` / self-test prompts in the canonical Knowledge entry so no question silently disappears.
- Existing `correlation-matrix-parameter-range` is a canonical candidate and must be enriched/merged rather than duplicated when equivalent variants are found.
- No workstream is complete until every inspected source item is reconciled in coverage.
- Completion gates are `npm run test`, `npm run check`, and `npm run build`.

---

## Verified Source Scope for This Workstream

### Green Book — First Edition (2008)

Internal evidence to inspect:

```text
Section 3.6.4 Positive semidefinite/definite matrix
  printed pp.56–58 (PDF pp.72–74)
Section 4.5 Expected Value, Variance & Covariance
  printed pp.92–98 (PDF pp.108–114)
```

The first section contains PSD/PD characterizations and a correlation-matrix feasibility problem. The second contains covariance/correlation definitions and related interview applications.

### Red Book — Version 1.01 (2008)

Internal evidence to inspect:

```text
Question 3.26, printed p.83 (PDF p.95): correlation-matrix feasibility
Question 3.35, printed p.84 (PDF p.96): prove a covariance matrix is positive definite/semidefinite
Solution 3.26, printed p.107 (PDF p.119)
Solution 3.35, printed pp.116–117 (PDF pp.128–129)
Question 6.9, printed p.190 (PDF p.202): positive-definite matrix definition/properties
Solution 6.9, printed pp.199–200 (PDF pp.211–212)
```

### 150 Questions — First Edition (2013)

Internal evidence to inspect:

```text
First Look Question 5, already represented by the current canonical correlation range problem
Section 2.2 Covariance and correlation matrices, linear algebra:
  Q1 covariance/correlation matrices are symmetric PSD
  Q2 covariance matrix -> correlation matrix
  Q3 equicorrelation matrix admissible rho bounds
  Q10 parameterized 3x3 correlation matrix
Section 3.2 corresponding solutions for Q1, Q2, Q3, Q10
```

The implementation Agent must inspect the exact corresponding solution pages before authoring; do not infer a solution from the question alone.

---

## Expected Canonical Outputs

**Existing Knowledge to enrich**

```text
correlation-matrix
positive-semidefinite-matrix
principal-minor-feasibility
```

**Existing Problem to enrich, not duplicate**

```text
correlation-matrix-parameter-range
```

**Expected new canonical Problems if source review confirms distinct identity**

```text
covariance-matrix-positive-semidefinite-proof
covariance-to-correlation-matrix
equicorrelation-matrix-bounds
```

`Red Q6.9` is expected to be represented primarily as canonical Knowledge + `Interview Checks`, unless semantic review finds a genuinely distinct Problem worth a standalone page.

---

## File Map

**Create**

```text
src/data/quant-interview/workstreams/linear-algebra-covariance-correlation-psd-001.json
src/lib/quantInterviewWorkstreams.mjs
tests/quant-interview-cross-book-workstream.test.mjs
src/content/problems/linear-algebra/covariance-matrix-positive-semidefinite-proof.md
src/content/problems/linear-algebra/covariance-to-correlation-matrix.md
src/content/problems/linear-algebra/equicorrelation-matrix-bounds.md
```

**Modify**

```text
src/content/knowledge/concepts/correlation-matrix.md
src/content/knowledge/concepts/positive-semidefinite-matrix.md
src/content/knowledge/concepts/principal-minor-feasibility.md
src/content/problems/linear-algebra/correlation-matrix-parameter-range.md
src/data/quant-interview/coverage/green-book.json
src/data/quant-interview/coverage/red-book.json
src/data/quant-interview/coverage/150-most-frequently-asked.json
docs/quant-interview/CONTENT_STANDARD.md
docs/quant-interview/HANDOFF.md
```

---

### Task 1: Add hidden cross-book workstream registration and validation

**Files:**
- Create: `src/lib/quantInterviewWorkstreams.mjs`
- Create: `src/data/quant-interview/workstreams/linear-algebra-covariance-correlation-psd-001.json`
- Create: `tests/quant-interview-cross-book-workstream.test.mjs`

**Interfaces:**
- Produces `validateTopicWorkstream(workstream, context)`.
- A workstream contains canonical topics plus source scopes; evidence may overlap with other workstreams.

- [ ] **Step 1: Write the failing registration test**

Create:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));

test('first cross-book workstream is bounded to covariance/correlation/PSD', async () => {
  const workstream = await readJson('src/data/quant-interview/workstreams/linear-algebra-covariance-correlation-psd-001.json');
  assert.equal(workstream.id, 'linear-algebra-covariance-correlation-psd-001');
  assert.deepEqual(workstream.canonicalTopics, [
    'linear-algebra-matrix-methods',
    'covariance-correlation-matrices',
    'positive-semidefinite-matrices',
  ]);
  assert.deepEqual(new Set(workstream.sourceScopes.map((x) => x.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
});
```

- [ ] **Step 2: Create the workstream record**

Use:

```json
{
  "id": "linear-algebra-covariance-correlation-psd-001",
  "canonicalTopics": [
    "linear-algebra-matrix-methods",
    "covariance-correlation-matrices",
    "positive-semidefinite-matrices"
  ],
  "status": "active",
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": ["3.6.4", "4.5"],
      "evidencePageRanges": [
        {"startPage": 56, "endPage": 58},
        {"startPage": 92, "endPage": 98}
      ]
    },
    {
      "source": "red-book",
      "sourceSections": ["3.2.1", "3.3.1", "6.2.1", "6.3.1"],
      "evidencePageRanges": [
        {"startPage": 83, "endPage": 84},
        {"startPage": 107, "endPage": 107},
        {"startPage": 116, "endPage": 117},
        {"startPage": 190, "endPage": 190},
        {"startPage": 199, "endPage": 200}
      ]
    },
    {
      "source": "150-most-frequently-asked",
      "sourceSections": ["1", "2.2", "3.2"],
      "evidencePageRanges": [
        {"startPage": 8, "endPage": 9},
        {"startPage": 20, "endPage": 21},
        {"startPage": 56, "endPage": 75}
      ]
    }
  ]
}
```

Evidence ranges are deliberately broad enough to inspect the exact selected items and their source solutions; out-of-topic items sharing those pages must remain pending in their own mapped topics.

- [ ] **Step 3: Implement validator**

`validateTopicWorkstream` must reject unknown canonical topics, unknown/unverified sources, source sections absent from the source-topic map, source sections whose mapped topics have no intersection with the workstream, invalid/unsorted within-scope evidence ranges, and missing one of the three expected verified sources for this specific pilot.

Do not reject evidence overlap with another workstream or source manifest.

- [ ] **Step 4: Run and commit**

```bash
node --test tests/quant-interview-cross-book-workstream.test.mjs
```

Expected: PASS.

```bash
git add src/data/quant-interview/workstreams src/lib/quantInterviewWorkstreams.mjs tests/quant-interview-cross-book-workstream.test.mjs
git commit -m "feat: register first cross-book interview workstream"
```

---

### Task 2: Inventory every in-scope source item before authoring

**Files:**
- Modify: the three coverage ledgers only.
- Modify: `tests/quant-interview-cross-book-workstream.test.mjs`.

**Interfaces:**
- Produces item-level coverage rows for every selected source question/explanation, initially `needs-review` until canonical identity is resolved.

- [ ] **Step 1: Inspect the actual source pages**

Read all evidence ranges listed in the workstream record. For 150 Questions, inspect the exact solution blocks for Q1/Q2/Q3/Q10 rather than treating the entire 3.2 range as one item. For Green 4.5, include only covariance/correlation/PSD items in this workstream; leave unrelated expectation/variance problems mapped to their own canonical topic.

- [ ] **Step 2: Add item-level ledger rows**

At minimum create rows for these identities:

```text
Green 3.6.4: PSD/PD definitions/criteria -> knowledge candidate
Green 3.6.4: parameterized correlation feasibility problem -> problem candidate/variant
Green 4.5: covariance/correlation definitions -> knowledge candidate
Red 3.26: correlation feasibility -> problem candidate/variant
Red 3.35: covariance matrix PSD proof -> problem candidate
Red 6.9: PD definition/properties -> knowledge/interview-check candidate
150 First Look 5: existing correlation range canonical problem
150 2.2 Q1: covariance/correlation matrix PSD proof
150 2.2 Q2: covariance -> correlation matrix
150 2.2 Q3: equicorrelation admissible range
150 2.2 Q10: parameterized correlation matrix range
```

Use `state: needs-review` initially, attach canonical topic IDs, and do not assign canonical Problem slugs until Task 3 semantic identity review.

- [ ] **Step 3: Add inventory completeness test**

Test that all listed source identities exist in coverage and none is still represented only by a coarse section-level row after the inventory task.

- [ ] **Step 4: Commit inventory separately**

```bash
git add src/data/quant-interview/coverage tests/quant-interview-cross-book-workstream.test.mjs
git commit -m "data: inventory covariance correlation PSD source items"
```

---

### Task 3: Resolve semantic identity and lock the dedup map

**Files:**
- Modify: the three coverage ledgers.
- Modify: `tests/quant-interview-cross-book-workstream.test.mjs`.

**Interfaces:**
- Produces canonical representation decisions before public content changes.

- [ ] **Step 1: Apply these expected identity decisions after checking source details**

Use semantic dimensions, not wording:

```text
Green parameterized correlation feasibility
Red Q3.26 correlation feasibility
150 First Look Q5
150 2.2 Q10
  -> same canonical family: correlation-matrix-parameter-range
  -> exact/near duplicates become merged-duplicate or variant, not new public pages

Red Q3.35 + 150 2.2 Q1
  -> canonical-problem: covariance-matrix-positive-semidefinite-proof

150 2.2 Q2
  -> canonical-problem: covariance-to-correlation-matrix

150 2.2 Q3
  -> canonical-problem: equicorrelation-matrix-bounds

Green/Red PSD definitions and Red Q6.9
  -> knowledge-only/interview-guidance in positive-semidefinite-matrix unless source review reveals a distinct reasoning problem
```

If source review contradicts one expected identity, mark the item `needs-review` and do not force a merge; document the exact structural difference in the ledger note field.

- [ ] **Step 2: Require audit-safe terminal mappings**

For every merged/variant item set `canonicalProblems` to the canonical slug. For knowledge-only items set `canonicalKnowledge`. No item may be deleted from the ledger.

- [ ] **Step 3: Add dedup integrity tests**

Assert that at least three source items can map to `correlation-matrix-parameter-range`, that no second public problem slug exists merely for a story/numeric variant, and that every inventory item is terminal or explicitly `needs-review`.

- [ ] **Step 4: Commit**

```bash
git add src/data/quant-interview/coverage tests/quant-interview-cross-book-workstream.test.mjs
git commit -m "data: resolve covariance correlation PSD canonical identities"
```

---

### Task 4: Enrich canonical Knowledge first

**Files:**
- Modify: `src/content/knowledge/concepts/correlation-matrix.md`
- Modify: `src/content/knowledge/concepts/positive-semidefinite-matrix.md`
- Modify: `src/content/knowledge/concepts/principal-minor-feasibility.md`
- Modify: `docs/quant-interview/CONTENT_STANDARD.md`
- Modify: `tests/quant-interview-cross-book-workstream.test.mjs`

**Interfaces:**
- Knowledge remains source-neutral.
- Conceptual source questions represented `knowledge-only` become public `## Interview Checks` prompts.

- [ ] **Step 1: Add failing Knowledge completeness assertions**

Require the three nodes to cover these markers semantically:

```text
correlation-matrix:
  covariance-to-correlation normalization
  unit diagonal / symmetry
  PSD validity requirement
  equicorrelation structure and admissible bounds

positive-semidefinite-matrix:
  quadratic-form definition
  nonnegative eigenvalue characterization
  covariance matrix proof via Var(a^T X) >= 0
  explicit PD vs PSD distinction
  warning that covariance matrices need not be positive definite
  Interview Checks

principal-minor-feasibility:
  principal-minor logic for semidefinite feasibility
  distinction from the leading-principal-minor positive-definite Sylvester criterion
```

- [ ] **Step 2: Independently rewrite/enrich the nodes**

Do not copy answer-key prose. Build one coherent explanation from the source-supported mathematical content plus existing repository derivations. Include formulas, intuition, edge cases, and self-check prompts.

The `Interview Checks` section must include source-neutral prompts equivalent in skill to:

```text
Why must every covariance matrix be PSD?
When is a covariance matrix positive definite rather than merely semidefinite?
What conditions must a matrix satisfy to be a valid correlation matrix?
How do you convert covariance to correlation?
```

- [ ] **Step 3: Update Content Standard**

Add the rule: a source conceptual question may be represented as `knowledge-only` only if its interview test is visibly preserved as an `Interview Checks` / self-test prompt in the canonical Knowledge entry.

- [ ] **Step 4: Run and commit**

```bash
node --test tests/quant-interview-cross-book-workstream.test.mjs
npm run check
```

Expected: PASS for Knowledge assertions.

```bash
git add src/content/knowledge docs/quant-interview/CONTENT_STANDARD.md tests/quant-interview-cross-book-workstream.test.mjs
git commit -m "content: fuse covariance correlation PSD interview knowledge"
```

---

### Task 5: Create the three distinct canonical Problems

**Files:**
- Create: `src/content/problems/linear-algebra/covariance-matrix-positive-semidefinite-proof.md`
- Create: `src/content/problems/linear-algebra/covariance-to-correlation-matrix.md`
- Create: `src/content/problems/linear-algebra/equicorrelation-matrix-bounds.md`
- Modify: `tests/quant-interview-cross-book-workstream.test.mjs`

**Interfaces:**
- All Problems use the Stage C source-neutral schema.
- Each is S3+ with Problem, Think Before Revealing, progressive hints, Solution, Why This Problem Matters, Common Mistakes, Extensions.

- [ ] **Step 1: Write failing S3+ tests**

For all three slugs require canonical topic IDs, linked Knowledge, no source provenance, and all S3+ section markers.

- [ ] **Step 2: Author `covariance-matrix-positive-semidefinite-proof`**

Core canonical statement: for a random vector with finite second moments, prove its covariance matrix is symmetric PSD; explain the strict PD condition in terms of absence of zero-variance nontrivial linear combinations.

Required solution methods:

```text
primary: a^T Σ a = Var(a^T X) >= 0
secondary interpretation: zero quadratic form corresponds to an almost-sure linear dependence after centering
```

Link `positive-semidefinite-matrix`, `correlation-matrix` where relevant.

- [ ] **Step 3: Author `covariance-to-correlation-matrix`**

Core statement: given a covariance matrix with positive marginal variances, construct the correlation matrix with `D^{-1/2} Σ D^{-1/2}` and explain zero-variance edge cases.

Include elementwise formula `ρ_ij = Σ_ij / sqrt(Σ_ii Σ_jj)` and validity preservation.

- [ ] **Step 4: Author `equicorrelation-matrix-bounds`**

Core statement: find the admissible common off-diagonal correlation `ρ` for an `n x n` equicorrelation matrix.

Required derivation: eigenvalues `1 + (n-1)ρ` once and `1-ρ` with multiplicity `n-1`, giving:

```text
-1/(n-1) <= ρ <= 1
```

Include boundary-rank interpretation.

- [ ] **Step 5: Run and commit**

```bash
node --test tests/quant-interview-cross-book-workstream.test.mjs
npm run check
```

Expected: PASS.

```bash
git add src/content/problems/linear-algebra tests/quant-interview-cross-book-workstream.test.mjs
git commit -m "content: add canonical covariance correlation matrix problems"
```

---

### Task 6: Enrich the existing correlation parameter Problem with cross-book variants

**Files:**
- Modify: `src/content/problems/linear-algebra/correlation-matrix-parameter-range.md`
- Modify: `tests/quant-interview-cross-book-workstream.test.mjs`

**Interfaces:**
- Keeps the same slug/problemId/route.
- Absorbs distinct source variants without source names or page references.

- [ ] **Step 1: Preserve the existing main problem and correct methods**

Do not replace the current independently authored core derivation. Keep the PSD/principal-minor and Schur-complement reasoning already present if valid.

- [ ] **Step 2: Add source-neutral meaningful variants**

Under `## Extensions` or `## Variants`, include at least:

```text
Validity check: a fully specified 3x3 correlation matrix with pairwise correlations 0.9, 0.8, 0.1; determine whether it is valid.
Parameter variant: change the two fixed correlations and derive the generic admissible interval for the third correlation.
Geometric variant: interpret the determinant constraint as a Gram-matrix feasibility condition.
```

Do not label any variant by book name.

- [ ] **Step 3: Add dedup test**

Assert the existing slug contains the variant skill markers and no new duplicate slug such as `red-book-correlation-*` or `green-book-correlation-*` exists.

- [ ] **Step 4: Run and commit**

```bash
node --test tests/quant-interview-cross-book-workstream.test.mjs
npm run check
```

Expected: PASS.

```bash
git add src/content/problems/linear-algebra/correlation-matrix-parameter-range.md tests/quant-interview-cross-book-workstream.test.mjs
git commit -m "content: merge correlation feasibility variants"
```

---

### Task 7: Reconcile coverage and close the workstream

**Files:**
- Modify: all three coverage ledgers.
- Modify: `src/data/quant-interview/workstreams/linear-algebra-covariance-correlation-psd-001.json`
- Modify: `tests/quant-interview-cross-book-workstream.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`

**Interfaces:**
- Workstream changes `status: active` -> `complete` only when every inspected item is terminal or explicitly `needs-review` with reason; for completion target this pilot should have zero unexplained pending in-scope items.

- [ ] **Step 1: Assign final coverage states**

Use `canonical-problem`, `merged-duplicate`, `variant`, or `knowledge-only` as appropriate. Ensure every terminal entry resolves to real canonical Problem/Knowledge slugs.

Out-of-topic questions that merely share an evidence page stay pending under their own canonical topic and are not counted as unresolved in this workstream.

- [ ] **Step 2: Add completion assertions**

Test that all workstream inventory keys have a non-pending state, canonical refs resolve, multiple source items map safely to one canonical problem, and no public file contains source names/page numbers as provenance.

- [ ] **Step 3: Mark workstream complete**

Set:

```json
"status": "complete"
```

Add `completedDate` and verification metadata only after the verification run exists; do not invent a run ID in advance.

- [ ] **Step 4: Update Handoff**

Record the canonical outputs and coverage reconciliation, then choose the next canonical topic workstream from the Stage A map. Do not choose by book order.

- [ ] **Step 5: Commit content-complete state**

```bash
git add src/data/quant-interview docs/quant-interview/HANDOFF.md tests/quant-interview-cross-book-workstream.test.mjs
git commit -m "data: close covariance correlation PSD workstream"
```

---

### Task 8: Run Stage D completion gates

- [ ] **Step 1: Focused workstream validation**

```bash
node --test tests/quant-interview-cross-book-workstream.test.mjs tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-topic-foundation.test.mjs
```

Expected: PASS.

- [ ] **Step 2: Full gates**

```bash
npm run test
npm run check
npm run build
```

Expected: all exit 0.

- [ ] **Step 3: Diff review**

Confirm the diff contains only this canonical topic workstream's Knowledge/Problems, hidden workstream/coverage data, tests, and handoff. It must not include unrelated Probability, algorithms, options, or other linear-algebra topics.

- [ ] **Step 4: Record real verification metadata**

After a real CI/full verification run exists, write its actual commit/run identifiers into the workstream record/Handoff and rerun the relevant tests. Never pre-fill verification IDs.
