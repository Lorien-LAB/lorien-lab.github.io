# Quant Interview Vectors & Linear Systems Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the bounded `Linear Algebra & Matrix Methods → Vectors & Linear Systems` workstream by reconciling the verified source material, repairing the Green vector-problem provenance, adding three canonical Knowledge nodes, adding two distinct canonical Problems, and explicitly separating repository-authored canonical extensions from source-derived coverage.

**Architecture:** Keep the public corpus Topic-first and source-neutral. Real source items live only in hidden coverage ledgers; repository-authored extensions live in canonical Knowledge/Problems and are declared in the machine-readable workstream record through `canonicalExtensions`, never through fabricated source coverage rows. Reuse the existing workstream/coverage validators, adding only small validation for the optional extension list.

**Tech Stack:** Astro content collections, Markdown/YAML frontmatter, Node.js built-in test runner, JavaScript ES modules, JSON workstream/coverage ledgers, GitHub Actions, npm.

## Global Constraints

- Base branch: `chatgpt/quant-interview-topic-first-fusion-design-2026-08-16`.
- Work branch: `chatgpt/quant-interview-workstream-vectors-linear-systems-2026-08-17`.
- Workstream id: `linear-algebra-vectors-linear-systems-004`.
- Public canonical topics: `linear-algebra-matrix-methods`, `vectors-linear-systems`.
- Approved canonical extensions exactly: `inner-product-projection-core`, `span-basis-rank-nullity`, `linear-system-consistency-rref`.
- Source-derived coverage may represent only material actually inspected in the verified sources.
- Canonical extensions must never receive fabricated source-item coverage rows.
- Green `correlation-range-0.8-0.8` must be corrected from hidden source section `3.6.4` to the actual `3.6.1 Vectors` ownership while preserving the existing canonical Problem identity.
- Red contributes no new item-level row; its workstream source scope must explicitly record `reviewOutcome: "no-new-direct-item"`.
- Public Knowledge/Problems must not expose book names, original source item numbers, source sections, source pages, or source-shaped public IDs.
- Do not duplicate QR, LU, Cholesky, SVD, PSD, correlation-matrix, or eigenbasis theory already owned by completed workstreams.
- New source-derived Problem: `product-of-row-stochastic-matrices`.
- New repository-authored extension Problem: `rank-and-consistency-of-linear-system`; it must have no hidden source coverage row.
- New Knowledge: `vector-geometry-inner-products`, `linear-independence-span-basis-rank`, `linear-systems-consistency`.
- Every new Problem must meet the repository S3+ structure: statement, progressive hints, full solution, why it matters, common mistakes, and extensions/variants.
- Every new Knowledge node must expose `## Interview Checks`.
- Do not merge before fresh `npm run test`, `npm run check`, and `npm run build` all pass.

---

## File Structure

**Create**

- `src/data/quant-interview/workstreams/linear-algebra-vectors-linear-systems-004.json` — bounded source scope plus canonical-extension declaration.
- `src/content/knowledge/concepts/vector-geometry-inner-products.md` — vector geometry and inner-product core.
- `src/content/knowledge/concepts/linear-independence-span-basis-rank.md` — span/basis/rank/null-space core.
- `src/content/knowledge/concepts/linear-systems-consistency.md` — RREF/rank consistency and solution structure.
- `src/content/problems/linear-algebra/product-of-row-stochastic-matrices.md` — source-derived closure proof.
- `src/content/problems/linear-algebra/rank-and-consistency-of-linear-system.md` — repository-authored parameterized-system extension Problem.
- `tests/quant-interview-vectors-linear-systems-workstream.test.mjs` — workstream, inventory, provenance, extension, and completion contracts.
- `tests/quant-interview-vectors-linear-systems-content.test.mjs` — Knowledge and Problem mathematical-content contracts.
- `.github/workflows/quant-interview-vectors-linear-systems-ci.yml` — temporary branch-only execution gate; remove before final branch handoff.

**Modify**

- `src/lib/quantInterviewWorkstreams.mjs` — validate optional `canonicalExtensions` as unique nonempty strings.
- `src/data/quant-interview/coverage/green-book.json` — add five new vector Knowledge rows and move/reconcile the existing Green correlation-range row into `3.6.1`.
- `src/data/quant-interview/coverage/150-most-frequently-asked.json` — add `2.2::9` as the row-stochastic canonical Problem.
- `src/content/problems/linear-algebra/correlation-matrix-parameter-range.md` — absorb the Green geometric derivation/cross-link without creating a duplicate page.
- `tests/quant-interview-source-neutral-content.test.mjs` — extend global corpus contract from 16 to 18 Problems and 18 to 21 explicit Knowledge/Technique nodes.
- `tests/quant-interview-handoff.test.mjs` — require the fourth completed Linear Algebra workstream and next-action advancement.
- `docs/quant-interview/HANDOFF.md` — factual completion record only after real verification exists.

**Do not modify unless a failing test proves it is necessary**

- `src/data/quant-interview/topics/taxonomy.json` — `vectors-linear-systems` already exists.
- `src/data/quant-interview/topics/source-topic-map.json` — Green `3.6.1` is already mapped directly; Red/150 broad sections already map to Linear Algebra.
- public pages/layouts — topic counts and filtering are already dynamic.

---

### Task 1: Baseline Gate, Workstream Registration, and `canonicalExtensions` Validation

**Files:**
- Create: `.github/workflows/quant-interview-vectors-linear-systems-ci.yml`
- Create: `tests/quant-interview-vectors-linear-systems-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/linear-algebra-vectors-linear-systems-004.json`
- Modify: `src/lib/quantInterviewWorkstreams.mjs`

**Interfaces:**
- Consumes: `validateTopicWorkstream(workstream, context)` from `src/lib/quantInterviewWorkstreams.mjs`.
- Produces: a valid `canonicalExtensions?: string[]` field and registered workstream record used by all later tasks.

- [ ] **Step 1: Add a temporary branch-only CI workflow and verify the unchanged branch is green**

Create:

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

Expected baseline: all three commands succeed before workstream tests are introduced.

- [ ] **Step 2: Write registration RED tests**

Start `tests/quant-interview-vectors-linear-systems-workstream.test.mjs` with helpers matching existing workstream tests and add:

```js
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
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
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
  assert.match(workstream.status, /^(?:active|complete)$/);
});
```

Add a validator test that passes the real taxonomy/source-topic-map/manifests and verifies malformed extension lists are rejected:

```js
test('workstream validator accepts canonical extensions but rejects malformed extension declarations', async () => {
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: 'rank' }, ctx), /canonicalExtensions.*array/i);
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: ['rank', 'rank'] }, ctx), /duplicate canonical extension/i);
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: [''] }, ctx), /canonical extension.*non-empty string/i);
});
```

- [ ] **Step 3: Run the registration tests and confirm RED**

Run:

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
```

Expected: FAIL because the new workstream JSON does not exist; after the JSON is introduced but before validator support, malformed-extension assertions must still fail.

- [ ] **Step 4: Add minimal `canonicalExtensions` validator support**

In `validateTopicWorkstream`, after canonical-topic validation and before source scopes:

```js
if (workstream.canonicalExtensions !== undefined) {
  if (!Array.isArray(workstream.canonicalExtensions)) {
    throw new Error('Topic workstream canonicalExtensions must be an array.');
  }
  const seenExtensions = new Set();
  for (const extension of workstream.canonicalExtensions) {
    requireString(extension, 'Topic workstream canonical extension');
    if (seenExtensions.has(extension)) throw new Error(`Duplicate canonical extension in workstream: ${extension}`);
    seenExtensions.add(extension);
  }
}
```

Do not interpret extension IDs as taxonomy nodes or source sections.

- [ ] **Step 5: Create the workstream record**

Use exactly:

```json
{
  "id": "linear-algebra-vectors-linear-systems-004",
  "canonicalTopics": [
    "linear-algebra-matrix-methods",
    "vectors-linear-systems"
  ],
  "canonicalExtensions": [
    "inner-product-projection-core",
    "span-basis-rank-nullity",
    "linear-system-consistency-rref"
  ],
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
      "evidencePageRanges": [
        {"startPage":201,"endPage":222},
        {"startPage":317,"endPage":318}
      ],
      "reviewOutcome": "no-new-direct-item",
      "reviewNote": "Reviewed the General Mathematics questions/solutions and Top Ten question list for vector, basis, rank, and linear-system tasks. Matrix items found there are already owned by completed PSD/decomposition workstreams; no new direct vectors/linear-systems item is introduced here."
    },
    {
      "source": "150-most-frequently-asked",
      "sourceSections": ["2.2","3.2"],
      "evidencePageRanges": [
        {"startPage":30,"endPage":30},
        {"startPage":79,"endPage":80}
      ]
    }
  ]
}
```

- [ ] **Step 6: Verify Task 1 GREEN and commit**

Run:

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
npm run test
npm run check
npm run build
```

Expected: all pass.

Commit:

```bash
git add .github/workflows/quant-interview-vectors-linear-systems-ci.yml tests/quant-interview-vectors-linear-systems-workstream.test.mjs src/lib/quantInterviewWorkstreams.mjs src/data/quant-interview/workstreams/linear-algebra-vectors-linear-systems-004.json
git commit -m "feat: register vectors linear systems workstream"
```

---

### Task 2: Source Inventory and Green Provenance Correction

**Files:**
- Modify: `tests/quant-interview-vectors-linear-systems-workstream.test.mjs`
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/coverage/150-most-frequently-asked.json`

**Interfaces:**
- Consumes: hidden coverage schema validated by `validateCoverageLedger`.
- Produces: item-level source inventory only; all new rows remain `needs-review` until Task 3, except the pre-existing Green correlation-range row whose canonical identity is preserved while its source-section ownership is corrected.

- [ ] **Step 1: Add inventory RED data and assertions**

Add:

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
  '150-most-frequently-asked': [
    ['2.2', '9'],
  ],
};
```

Add a test requiring every row and exact topic classification for the new inventory rows:

```js
test('every inspected vectors linear systems source item is explicitly inventoried', async () => {
  for (const [source, keys] of Object.entries(sourceInventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = byKey.get(`${section}::${item}`);
      assert.ok(entry, `missing inventory row ${source} ${section} ${item}`);
      assert.ok(entry.canonicalTopics.includes('vectors-linear-systems'), `${source} ${section} ${item} missing vectors-linear-systems topic`);
    }
  }
});
```

Add the provenance-correction contract:

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

- [ ] **Step 2: Run and confirm inventory RED**

Run:

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
```

Expected: FAIL first on the missing Green item rows and/or wrong `3.6.4` ownership.

- [ ] **Step 3: Upsert the source inventory without semantic closure**

Add these Green rows with `state: "needs-review"`, empty canonical targets, and `canonicalTopics: ["vectors-linear-systems"]`:

- `vector-coordinate-representation`
- `dot-product`
- `euclidean-norm-distance`
- `angle-orthogonality`
- `correlation-as-cosine`

For `correlation-as-cosine`, it is acceptable at inventory stage to use only `vectors-linear-systems`; cross-topic canonical Knowledge targets are assigned in Task 3.

Move the existing `correlation-range-0.8-0.8` row from `3.6.4` to `3.6.1`, preserving its existing canonical Problem identity and existing terminal state. Its topics must include `vectors-linear-systems`; if it also keeps covariance/PSD sibling topics, add a nonempty `topicOverrideReason` explaining the cross-topic item-level classification.

Add 150 row:

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

Do not create a Red item-level row.

- [ ] **Step 4: Verify inventory GREEN and coverage validity**

Run:

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
npm run test
```

Expected: inventory/provenance tests pass; existing completed-workstream tests remain green.

- [ ] **Step 5: Commit**

```bash
git add tests/quant-interview-vectors-linear-systems-workstream.test.mjs src/data/quant-interview/coverage/green-book.json src/data/quant-interview/coverage/150-most-frequently-asked.json
git commit -m "data: inventory vectors linear systems source items"
```

---

### Task 3: Semantic Identity Decisions and Extension-Provenance Firewall

**Files:**
- Modify: `tests/quant-interview-vectors-linear-systems-workstream.test.mjs`
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/coverage/150-most-frequently-asked.json`

**Interfaces:**
- Consumes: Task 2 inventory keys.
- Produces: terminal semantic destinations for all real source items while guaranteeing repository-authored extension nodes/problem have no fabricated source row.

- [ ] **Step 1: Add semantic RED expectations**

Use:

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

For the corrected Green correlation-range row, assert rather than overwrite its entire historical target list:

```js
const correlationVariant = green.entries.find((entry) => entry.sourceSection === '3.6.1' && entry.sourceItem === 'correlation-range-0.8-0.8');
assert.equal(correlationVariant.state, 'variant');
assert.deepEqual(correlationVariant.canonicalProblems, ['correlation-matrix-parameter-range']);
assert.ok(correlationVariant.canonicalKnowledge.includes('vector-geometry-inner-products'));
assert.match(correlationVariant.resolutionNote ?? '', /geometric|angle|Gram/i);
```

Add the extension firewall:

```js
test('repository-authored canonical extensions do not masquerade as source coverage', async () => {
  const forbiddenProblem = 'rank-and-consistency-of-linear-system';
  const forbiddenKnowledge = new Set(['linear-independence-span-basis-rank', 'linear-systems-consistency']);
  for (const source of ['green-book', 'red-book', '150-most-frequently-asked']) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    for (const entry of ledger.entries) {
      assert.ok(!entry.canonicalProblems.includes(forbiddenProblem), `${source} falsely claims extension problem provenance`);
      for (const slug of entry.canonicalKnowledge) {
        assert.ok(!forbiddenKnowledge.has(slug), `${source} falsely claims extension knowledge provenance: ${slug}`);
      }
    }
  }
});
```

- [ ] **Step 2: Run and confirm semantic RED**

Run:

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
```

Expected: FAIL because new rows are still `needs-review` and canonical Knowledge/Problem slugs do not yet exist.

- [ ] **Step 3: Write semantic decisions into hidden coverage**

Update Green reusable rows to `knowledge-only` with the exact targets above and nonempty independent resolution notes.

For `correlation-range-0.8-0.8`:

- keep `state: "variant"`;
- keep `canonicalProblems: ["correlation-matrix-parameter-range"]`;
- append `vector-geometry-inner-products` to canonical Knowledge if absent;
- keep existing correlation/PSD Knowledge targets if they are already present;
- add/replace `resolutionNote` with a statement that the Vectors section contributes the angle/Gram interpretation to the already canonicalized correlation-feasibility family.

Update 150 `2.2::9` to:

```json
{
  "state": "canonical-problem",
  "canonicalProblems": ["product-of-row-stochastic-matrices"],
  "canonicalKnowledge": [],
  "resolutionNote": "Distinct row-stochastic closure proof using the all-ones vector invariant and a separate nonnegativity argument."
}
```

The empty hidden `canonicalKnowledge` is intentional: the source contributes the Problem, while the repository-authored rank/system Knowledge remains extension-only.

- [ ] **Step 4: Run the semantic test**

Run:

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
```

Expected at this checkpoint: semantic-state assertions pass; full unresolved-reference validation may remain red until Tasks 4-8 create the public slugs. Do not weaken `allowUnresolvedCanonicalRefs: false` in final completion tests.

- [ ] **Step 5: Commit**

```bash
git add tests/quant-interview-vectors-linear-systems-workstream.test.mjs src/data/quant-interview/coverage/green-book.json src/data/quant-interview/coverage/150-most-frequently-asked.json
git commit -m "data: resolve vectors linear systems semantic identities"
```

---

### Task 4: Vector Geometry Knowledge and Existing Correlation-Variant Enrichment

**Files:**
- Create: `tests/quant-interview-vectors-linear-systems-content.test.mjs`
- Create: `src/content/knowledge/concepts/vector-geometry-inner-products.md`
- Modify: `src/content/problems/linear-algebra/correlation-matrix-parameter-range.md`

**Interfaces:**
- Consumes: Green source-derived vector geometry and extension id `inner-product-projection-core`.
- Produces: `vector-geometry-inner-products` Knowledge and a source-neutral geometric method on the existing canonical correlation Problem.

- [ ] **Step 1: Write Knowledge/content RED tests**

Add helpers `readKnowledge(slug)` and `readProblem(slug)`, then:

```js
test('vector geometry Knowledge covers source-derived geometry and bounded canonical extensions', async () => {
  const text = await readKnowledge('vector-geometry-inner-products');
  assert.match(text, /^quantInterviewTopics:\s*\[linear-algebra-matrix-methods, vectors-linear-systems\]$/m);
  assert.match(text, /x\^T y|dot product/i);
  assert.match(text, /\|\|x\|\||Euclidean norm/i);
  assert.match(text, /cos\(theta\)|angle/i);
  assert.match(text, /orthogonal/i);
  assert.match(text, /Cauchy[- ]Schwarz/i);
  assert.match(text, /proj|projection/i);
  assert.match(text, /correlation[\s\S]{0,500}cosine|cosine[\s\S]{0,500}correlation/i);
  assert.match(text, /correlation-matrix/);
  assert.match(text, /## Interview Checks/i);
});

test('existing correlation parameter Problem absorbs the Green geometric method without duplication', async () => {
  const text = await readProblem('correlation-matrix-parameter-range');
  assert.match(text, /vector-geometry-inner-products/);
  assert.match(text, /0\.28\s*<=\s*rho\s*<=\s*1/);
  assert.match(text, /angle|Gram|unit vectors/i);
});
```

- [ ] **Step 2: Run and confirm RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
```

Expected: FAIL because the new Knowledge file is absent and the existing Problem does not yet expose the new relationship/method.

- [ ] **Step 3: Create `vector-geometry-inner-products.md`**

Use frontmatter:

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

The body must independently explain these exact mathematical identities:

```text
x^T y = sum_i x_i y_i
||x||_2 = sqrt(x^T x)
||x-y||_2 = distance(x,y)
cos(theta) = (x^T y)/(||x|| ||y||), for nonzero x,y
|x^T y| <= ||x|| ||y||
proj_u(x) = (u^T x)/(u^T u) u, for u != 0
x - proj_u(x) is orthogonal to u
```

Explain correlation-as-cosine only as a bridge and link to `correlation-matrix`; do not recreate PSD/correlation-matrix theory.

Include `## Interview Checks` containing the four checks approved in the spec.

- [ ] **Step 4: Enrich the existing correlation Problem**

In frontmatter, append `vector-geometry-inner-products` to `concepts`.

Inside Variant A, add a concise source-neutral geometric method:

- represent the three standardized variables as unit vectors;
- if each of the last two makes angle `theta` with the first and `cos(theta)=0.8`, their mutual angle can range from `0` to `2theta`;
- hence the maximum correlation is `cos(0)=1` and minimum is `cos(2theta)=2(0.8)^2-1=0.28`;
- state that this is the same feasible interval as the PSD formula, not a different Problem identity.

- [ ] **Step 5: Verify Task 4 GREEN and commit**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
npm run test
```

Commit:

```bash
git add tests/quant-interview-vectors-linear-systems-content.test.mjs src/content/knowledge/concepts/vector-geometry-inner-products.md src/content/problems/linear-algebra/correlation-matrix-parameter-range.md
git commit -m "feat: add vector geometry interview knowledge"
```

---

### Task 5: Span, Basis, Rank, and Null-Space Knowledge

**Files:**
- Modify: `tests/quant-interview-vectors-linear-systems-content.test.mjs`
- Create: `src/content/knowledge/concepts/linear-independence-span-basis-rank.md`

**Interfaces:**
- Consumes: canonical extension `span-basis-rank-nullity`.
- Produces: structural vector-space Knowledge used by Task 8.

- [ ] **Step 1: Add RED test**

```js
test('span basis rank Knowledge owns the structural vector-space core', async () => {
  const text = await readKnowledge('linear-independence-span-basis-rank');
  assert.match(text, /linear combination/i);
  assert.match(text, /span/i);
  assert.match(text, /linear(?:ly)? independent/i);
  assert.match(text, /basis/i);
  assert.match(text, /dimension/i);
  assert.match(text, /column space/i);
  assert.match(text, /row space/i);
  assert.match(text, /null space/i);
  assert.match(text, /rank[- ]nullity/i);
  assert.match(text, /dim\s*N\(A\)|n\s*-\s*rank\(A\)/i);
  assert.match(text, /full column rank/i);
  assert.match(text, /full row rank/i);
  assert.match(text, /## Interview Checks/i);
});
```

- [ ] **Step 2: Run and confirm RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
```

Expected: FAIL because the node does not exist.

- [ ] **Step 3: Create the Knowledge node**

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

The body must state and distinguish:

```text
span(v_1,...,v_k) = {sum_i c_i v_i}
linear independence: sum_i c_i v_i = 0 implies every c_i = 0
basis = independent spanning set
dim(column space) = dim(row space) = rank(A)
dim N(A) + rank(A) = n for A in R^{m x n}
full column rank means rank(A)=n
full row rank means rank(A)=m
```

Explain pivot columns, redundancy, and why nontrivial null space means columns are linearly dependent.

Include the five corrected Interview Checks from the approved spec, including: a consistent system with fewer independent equations than unknowns cannot be unique.

- [ ] **Step 4: Verify GREEN and commit**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
npm run test
```

Commit:

```bash
git add tests/quant-interview-vectors-linear-systems-content.test.mjs src/content/knowledge/concepts/linear-independence-span-basis-rank.md
git commit -m "feat: add span basis rank interview knowledge"
```

---

### Task 6: Linear-System Consistency Knowledge

**Files:**
- Modify: `tests/quant-interview-vectors-linear-systems-content.test.mjs`
- Create: `src/content/knowledge/concepts/linear-systems-consistency.md`

**Interfaces:**
- Consumes: canonical extension `linear-system-consistency-rref` and Task 5 rank/null-space terminology.
- Produces: system-consistency Knowledge used by Task 8.

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

Expected: FAIL because the node does not exist.

- [ ] **Step 3: Create `linear-systems-consistency.md`**

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

The body must explicitly state:

```text
Ax=b is consistent iff rank(A)=rank([A|b])
if consistent and rank(A)=n (n unknowns), the solution is unique
if consistent and rank(A)<n, there are infinitely many solutions
if rank([A|b])>rank(A), there is no solution
Ax=0 has solution set N(A)
if Ax=b is consistent and x_p is one solution, every solution is x_p+z with z in N(A)
```

Explain that row operations preserve the solution set but numerical production solvers may prefer QR/LU/SVD depending on structure; do not re-teach those algorithms.

Include Interview Checks about inconsistent rows, pivot/free variables, homogeneous nontrivial solutions, and the three rank cases.

- [ ] **Step 4: Verify GREEN and commit**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
npm run test
```

Commit:

```bash
git add tests/quant-interview-vectors-linear-systems-content.test.mjs src/content/knowledge/concepts/linear-systems-consistency.md
git commit -m "feat: add linear systems consistency knowledge"
```

---

### Task 7: Source-Derived Row-Stochastic Closure Problem

**Files:**
- Modify: `tests/quant-interview-vectors-linear-systems-content.test.mjs`
- Create: `src/content/problems/linear-algebra/product-of-row-stochastic-matrices.md`

**Interfaces:**
- Consumes: 150 `2.2::9` semantic target from Task 3.
- Produces: real canonical Problem slug resolving the source row.

- [ ] **Step 1: Add RED tests**

```js
test('row stochastic closure is an S3+ source-neutral canonical Problem', async () => {
  const text = await readProblem('product-of-row-stochastic-matrices');
  assert.match(text, /^problemId:\s*linear-algebra-stochastic-001$/m);
  assert.match(text, /^quantInterviewTopics:\s*\[linear-algebra-matrix-methods, vectors-linear-systems\]$/m);
  assert.doesNotMatch(text, /^source|Green Book|Red Book|150 Questions|Question 9/im);
  for (const heading of ['## Problem', '## Think Before Revealing', '## Solution', '## Why This Problem Matters', '## Common Mistakes', '## Extensions']) {
    assert.match(text, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('row stochastic proof preserves both the row-sum invariant and nonnegativity', async () => {
  const text = await readProblem('product-of-row-stochastic-matrices');
  assert.match(text, /all-ones|ones column vector/i);
  assert.match(text, /A\s*1\s*=\s*1/);
  assert.match(text, /B\s*1\s*=\s*1/);
  assert.match(text, /\(AB\)\s*1\s*=\s*A\s*\(B\s*1\)/);
  assert.match(text, /nonnegative/i);
  assert.match(text, /sum of nonnegative products/i);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
```

Expected: FAIL because the Problem does not exist.

- [ ] **Step 3: Create the canonical Problem**

Frontmatter:

```yaml
---
problemId: linear-algebra-stochastic-001
title: Product of Row-Stochastic Matrices
description: Prove closure of row-stochastic matrices under multiplication by combining the all-ones vector invariant with entrywise nonnegativity.
date: 2026-08-17
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Vectors, Matrix Invariants]
tags: [Linear Algebra, Stochastic Matrix, Matrix Product, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, vectors-linear-systems]
concepts: []
techniques: []
prerequisites: []
relatedProblems: []
family: matrix-invariant-closure
mathDifficulty: 1
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
status: solved
featured: false
---
```

Required solution proof:

```text
Let 1 be the all-ones column vector.
A1=1 and B1=1.
(AB)1=A(B1)=A1=1.
For every i,j, (AB)_{ij}=sum_k A_{ik}B_{kj} >= 0 because every summand is nonnegative.
Therefore AB has nonnegative entries and every row sums to 1.
```

Common Mistakes must include proving only `AB 1=1` while forgetting nonnegativity.

Extensions may mention powers `A^k`, products of finitely many row-stochastic matrices, and the Markov-transition interpretation without turning the page into a Markov-chain tutorial.

- [ ] **Step 4: Verify GREEN and commit**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
npm run test
```

Commit:

```bash
git add tests/quant-interview-vectors-linear-systems-content.test.mjs src/content/problems/linear-algebra/product-of-row-stochastic-matrices.md
git commit -m "feat: add row stochastic closure problem"
```

---

### Task 8: Repository-Authored Rank/Consistency Problem

**Files:**
- Modify: `tests/quant-interview-vectors-linear-systems-content.test.mjs`
- Create: `src/content/problems/linear-algebra/rank-and-consistency-of-linear-system.md`

**Interfaces:**
- Consumes: Tasks 5-6 Knowledge.
- Produces: canonical extension Problem with no hidden source coverage row.

- [ ] **Step 1: Add RED tests**

```js
test('rank consistency parameter Problem is S3+ and source-neutral', async () => {
  const text = await readProblem('rank-and-consistency-of-linear-system');
  assert.match(text, /^problemId:\s*linear-algebra-systems-001$/m);
  assert.match(text, /^concepts:\s*\[linear-independence-span-basis-rank, linear-systems-consistency\]$/m);
  assert.match(text, /^quantInterviewTopics:\s*\[linear-algebra-matrix-methods, vectors-linear-systems\]$/m);
  assert.doesNotMatch(text, /^source|Green Book|Red Book|150 Questions/im);
  for (const heading of ['## Problem', '## Think Before Revealing', '## Solution', '## Why This Problem Matters', '## Common Mistakes', '## Extensions']) assert.match(text, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('rank consistency parameter Problem classifies every a b regime correctly', async () => {
  const text = await readProblem('rank-and-consistency-of-linear-system');
  assert.match(text, /a\s*!=\s*5[\s\S]{0,600}unique/i);
  assert.match(text, /a\s*=\s*5[\s\S]{0,400}b\s*=\s*3[\s\S]{0,400}infinitely many/i);
  assert.match(text, /a\s*=\s*5[\s\S]{0,400}b\s*!=\s*3[\s\S]{0,400}no solution/i);
  assert.match(text, /rank\(A\)\s*=\s*2/);
  assert.match(text, /rank[- ]nullity/i);
  assert.match(text, /one-dimensional null space|dim.*N\(A\).*1/i);
  assert.match(text, /determinant[\s\S]{0,500}(?:cannot|insufficient|does not)/i);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
```

Expected: FAIL because the Problem does not exist.

- [ ] **Step 3: Create the Problem**

Frontmatter:

```yaml
---
problemId: linear-algebra-systems-001
title: Rank and Consistency of a Parameterized Linear System
description: Classify a parameterized three-equation system into unique, inconsistent, and infinite-solution regimes using row dependence and rank.
date: 2026-08-17
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Linear Systems, Rank, Null Space]
tags: [Linear Algebra, Rank, RREF, Linear Systems, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, vectors-linear-systems]
concepts: [linear-independence-span-basis-rank, linear-systems-consistency]
techniques: []
prerequisites: []
relatedProblems: []
family: parameterized-linear-system
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---
```

Problem statement exactly uses:

```text
x + y + z       = 1
2x + 3y + 4z    = 2
3x + 4y + a z   = b
```

The primary solution must observe:

```text
row_3 = row_1 + row_2 exactly when a=5
right-hand side compatibility then requires b=1+2=3
```

Classification:

```text
a != 5          -> rank(A)=3 -> unique solution for every b
a = 5, b = 3    -> rank(A)=rank([A|b])=2 < 3 -> infinitely many solutions
a = 5, b != 3   -> rank([A|b])=3 > rank(A)=2 -> no solution
```

Add a second row-reduction derivation that obtains a final row proportional to:

```text
[0, 0, a-5 | b-3]
```

Explain that when `a=5,b=3`, rank-nullity gives `dim N(A)=3-2=1`.

Common Mistakes must include: “det(A)=0 therefore infinitely many solutions.” Explain that a singular coefficient matrix can correspond to either no solution or infinitely many solutions; the augmented system decides which.

- [ ] **Step 4: Verify GREEN and commit**

```bash
node --test tests/quant-interview-vectors-linear-systems-content.test.mjs
npm run test
```

Commit:

```bash
git add tests/quant-interview-vectors-linear-systems-content.test.mjs src/content/problems/linear-algebra/rank-and-consistency-of-linear-system.md
git commit -m "feat: add rank consistency linear system problem"
```

---

### Task 9: Global Source-Neutral Corpus Regression

**Files:**
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`

**Interfaces:**
- Consumes: all public slugs created in Tasks 4-8.
- Produces: global regression coverage for 18 Problems and 21 explicit Knowledge/Technique nodes.

- [ ] **Step 1: Add the two new Problems to `currentProblemSlugs`**

Append:

```js
'product-of-row-stochastic-matrices',
'rank-and-consistency-of-linear-system',
```

- [ ] **Step 2: Add exact Knowledge topic assignments**

Append to `expectedKnowledgeTopics`:

```js
['vector-geometry-inner-products', ['linear-algebra-matrix-methods', 'vectors-linear-systems']],
['linear-independence-span-basis-rank', ['linear-algebra-matrix-methods', 'vectors-linear-systems']],
['linear-systems-consistency', ['linear-algebra-matrix-methods', 'vectors-linear-systems']],
```

- [ ] **Step 3: Add a regression that public code never imports canonical extension audit metadata**

In the workstream test, recursively read `src/pages` and `src/layouts` and assert none contain `canonicalExtensions` or import the workstream JSON. This preserves the audit/public separation.

- [ ] **Step 4: Run global tests**

```bash
npm run test
npm run check
npm run build
```

Expected: all pass now that all source-target slugs exist. If a failure is from an exact corpus assumption, update only the stale assumption; do not weaken source-neutral or relationship validation.

- [ ] **Step 5: Commit**

```bash
git add tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-vectors-linear-systems-workstream.test.mjs
git commit -m "test: extend source neutral interview corpus"
```

---

### Task 10: Completion Gate, Verification Evidence, Handoff, and Branch Cleanup

**Files:**
- Modify: `tests/quant-interview-vectors-linear-systems-workstream.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`
- Modify: `src/data/quant-interview/workstreams/linear-algebra-vectors-linear-systems-004.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Delete before final handoff: `.github/workflows/quant-interview-vectors-linear-systems-ci.yml`

**Interfaces:**
- Consumes: complete canonical corpus and terminal hidden coverage.
- Produces: machine-readable `complete` workstream, factual durable handoff, and a branch with no temporary CI file.

- [ ] **Step 1: Add completion RED tests**

Add:

```js
test('completed vectors linear systems workstream has terminal resolved source coverage and explicit extensions', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  assert.deepEqual(workstream.canonicalExtensions, expectedExtensions);

  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');

  for (const [source, keys] of Object.entries(sourceInventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = byKey.get(`${section}::${item}`);
      assert.ok(entry);
      assert.doesNotMatch(entry.state, /^(?:pending|needs-review)$/);
      assert.match(entry.resolutionNote ?? '', /\S/);
    }
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      taxonomy,
      sourceTopicMap,
      problemSlugs,
      knowledgeSlugs,
      allowUnresolvedCanonicalRefs: false,
    }));
  }
});
```

Add Red audit assertion:

```js
const redScope = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
assert.equal(redScope.reviewOutcome, 'no-new-direct-item');
assert.match(redScope.reviewNote ?? '', /vector|basis|rank|linear-system/i);
```

Add Knowledge-only visibility assertion for `vector-geometry-inner-products`.

Add duplicate-page assertion rejecting filenames containing `green`, `red`, `150`, `question-9`, or another `correlation-range` source page.

- [ ] **Step 2: Run completion RED**

```bash
node --test tests/quant-interview-vectors-linear-systems-workstream.test.mjs
```

Expected: exactly the status assertion should remain red once every other invariant is satisfied.

- [ ] **Step 3: Switch only workstream status to `complete`**

Change:

```json
"status": "active"
```

to:

```json
"status": "complete"
```

Do not prefill a verification run id yet.

- [ ] **Step 4: Run a content-complete full verification and capture real evidence**

Run through the branch CI:

```bash
npm run test
npm run check
npm run build
```

Capture the exact content-complete commit SHA and GitHub Actions run id only after all three succeed.

- [ ] **Step 5: Write real verification evidence into the workstream JSON**

Add only real values from Step 4:

```json
"completedDate": "2026-08-17",
"verification": {
  "commit": "<REAL_CONTENT_COMPLETE_COMMIT_SHA>",
  "runId": <REAL_SUCCESSFUL_RUN_ID>,
  "commands": [
    "npm run test",
    "npm run check",
    "npm run build"
  ],
  "conclusion": "success"
}
```

During execution, replace the angle-bracket tokens with the real values before committing; the repository must never contain the literal placeholders.

- [ ] **Step 6: Advance the durable Handoff contract RED**

Update `tests/quant-interview-handoff.test.mjs` so it requires:

- `linear-algebra-vectors-linear-systems-004`;
- the real verification commit/run from Step 5;
- new Knowledge slugs `vector-geometry-inner-products`, `linear-independence-span-basis-rank`, `linear-systems-consistency`;
- new Problem slugs `product-of-row-stochastic-matrices`, `rank-and-consistency-of-linear-system`;
- text distinguishing `canonicalExtensions` from hidden source coverage;
- current corpus counts `18 canonical Problems` and `21 explicitly topic-classified Knowledge / Technique nodes`;
- a next action that does not claim all Linear Algebra sources are complete unless the ledger proves it.

Run:

```bash
node --test tests/quant-interview-handoff.test.mjs
```

Expected: FAIL against the old Handoff only.

- [ ] **Step 7: Update `docs/quant-interview/HANDOFF.md` factually**

Record:

- four completed Linear Algebra workstreams;
- real content-complete verification evidence;
- source-derived inputs: Green vectors/geometry, 150 row-stochastic closure, Red no-new-direct-item;
- Green provenance correction `3.6.4 -> 3.6.1` for `correlation-range-0.8-0.8`;
- canonical-extension declaration and explicit statement that extension content does not create source coverage;
- three new Knowledge nodes and two new Problems;
- corpus state 18 Problems / 21 explicit Knowledge/Technique nodes;
- next action chosen from the remaining repository taxonomy/coverage state, not by source question numbering.

Do not claim whole-book or whole-Linear-Algebra completion.

- [ ] **Step 8: Run final business-tree verification**

```bash
npm run test
npm run check
npm run build
```

Expected: all pass on the commit containing workstream verification metadata and Handoff.

- [ ] **Step 9: Review the topic-only diff**

Compare against:

```text
chatgpt/quant-interview-topic-first-fusion-design-2026-08-16
```

Expected final business diff is limited to:

- this spec and plan;
- new workstream record and validator support;
- Green + 150 hidden coverage;
- three Knowledge nodes;
- two new Problems;
- one existing correlation Problem enrichment;
- workstream/content/global/handoff tests;
- Handoff.

There must be no public UI redesign, taxonomy rewrite, TOC rewrite, or unrelated topic modification.

- [ ] **Step 10: Remove temporary branch-only CI and verify cleanup is zero-business-diff**

Delete:

```text
.github/workflows/quant-interview-vectors-linear-systems-ci.yml
```

Compare the pre-cleanup verified business commit to the final branch. Expected: the only file difference is removal of that temporary workflow; the final business tree is otherwise identical.

- [ ] **Step 11: Finish the branch with the standard integration menu**

After verification-before-completion, present exactly:

```text
Implementation complete. What would you like to do?

1. Merge back to chatgpt/quant-interview-topic-first-fusion-design-2026-08-16 locally
2. Push and create a Pull Request
3. Keep the branch as-is (I'll handle it later)

Which option?
```

---

## Self-Review Result

- **Spec coverage:** every approved source boundary, provenance correction, extension boundary, Knowledge node, Problem identity, public source-neutrality rule, and completion requirement has a task.
- **Extension firewall:** only `vector-geometry-inner-products` is allowed to receive direct Green source Knowledge coverage; `linear-independence-span-basis-rank`, `linear-systems-consistency`, and `rank-and-consistency-of-linear-system` are explicitly forbidden from source ledgers.
- **Dedup:** Green `0.8/0.8` remains the existing `correlation-matrix-parameter-range` Problem and gains only geometry/relationship enrichment.
- **No placeholders in implementation state:** the plan shows symbolic `<REAL_...>` values only as instructions for a future run; execution must replace them with actual values before writing repository state.
- **Mathematical boundary:** the rank/consistency extension Problem covers all parameter regimes and explicitly distinguishes singular-coefficient behavior from augmented-system consistency.
- **Scope:** no new taxonomy nodes, no UI work, no advanced linear-algebra expansion beyond the approved bounded extension.
