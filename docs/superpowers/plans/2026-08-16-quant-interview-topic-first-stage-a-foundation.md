# Quant Interview Topic-First Stage A Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the hidden internal foundation for topic-first cross-book ingestion: verify Green/Red source files, separate semantic ownership from reusable page evidence, create the canonical topic taxonomy, map all three TOCs into it, and add an auditable hidden coverage ledger.

**Architecture:** Keep public Knowledge and Problem pages unchanged in Stage A. Add internal JSON registries under `src/data/quant-interview/topics/` and `src/data/quant-interview/coverage/`, plus focused validators in `src/lib/`. Existing source manifests stay at their current paths to avoid unnecessary file moves. Source page evidence remains internal; overlapping evidence across batches is legal, while duplicate semantic source-item ownership remains illegal.

**Tech Stack:** Astro 5, TypeScript, ESM JavaScript, JSON data registries, Markdown repository memory, Node built-in test runner.

## Global Constraints

- Public organization is ultimately Topic-first; Stage A must not redesign public UI yet.
- Books are internal evidence sources, not the durable public hierarchy.
- Source page numbers are internal evidence only and must not be introduced into public Knowledge/Problem bodies.
- No new source-derived Problem or Knowledge content is authored in Stage A.
- Repository state wins over conversation memory.
- Existing canonical Problem routes and Knowledge URLs remain unchanged.
- Green supplied PDF identity: SHA-256 `89a637408fc57164c3ee4ef19fb36688a58dfb37b91ef1471d11df82d6d0e3f5`, 213 PDF pages, First Edition, copyright 2008, ISBN-13 `9781438236667`.
- Red supplied PDF identity: SHA-256 `09c5aac761bd71c4a6b9406f50dcfe73d8af3ce0a3ef9bb4fe2d65d0b27db6b1`, 329 PDF pages, Version 1.01, copyright 2008, ISBN-13 `9781438217031`.
- 150 Questions source identity remains SHA-256 `d753f3516ce06d8e7242bcdd7252d39ffbc33f9217c6cf8a7e826b658b533e14`, 220 PDF pages, First edition (2013).
- Every implementation task follows test-first development.
- Completion gates are `npm run test`, `npm run check`, and `npm run build`.

---

## File Map

**Create**

```text
src/data/quant-interview/topics/taxonomy.json
src/data/quant-interview/topics/source-topic-map.json
src/data/quant-interview/coverage/green-book.json
src/data/quant-interview/coverage/red-book.json
src/data/quant-interview/coverage/150-most-frequently-asked.json
src/lib/quantInterviewTopics.mjs
src/lib/quantInterviewCoverage.mjs
tests/quant-interview-topic-foundation.test.mjs
```

**Modify**

```text
src/lib/quantInterviewIngestion.mjs
src/data/quant-interview/green-book.json
src/data/quant-interview/red-book.json
src/data/quant-interview/150-most-frequently-asked.json
src/data/quant-interview/toc/green-book.json
src/data/quant-interview/toc/red-book.json
src/content/problem-sources/green-book.md
src/content/problem-sources/red-book.md
src/content.config.ts
tests/quant-interview-phase-2a.test.mjs
tests/quant-interview-handoff.test.mjs
docs/quant-interview/README.md
docs/quant-interview/AGENT_PROTOCOL.md
docs/quant-interview/CONTENT_STANDARD.md
docs/quant-interview/SOURCE_CATALOG.md
docs/quant-interview/HANDOFF.md
README.md
```

---

### Task 1: Define the Stage A regression contract

**Files:**
- Create: `tests/quant-interview-topic-foundation.test.mjs`
- Modify: `tests/quant-interview-phase-2a.test.mjs`

**Interfaces:**
- Consumes: `validateIngestionManifest()` from `src/lib/quantInterviewIngestion.mjs`.
- Produces: failing contracts for verified source identity, reusable evidence ranges, taxonomy validity, source-topic completeness, coverage-ledger validity, and public isolation of new internal registries.

- [ ] **Step 1: Add failing source-verification assertions**

Create `tests/quant-interview-topic-foundation.test.mjs` with these source assertions:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));

test('Green and Red source manifests are pinned to the supplied files', async () => {
  const green = await readJson('src/data/quant-interview/green-book.json');
  const red = await readJson('src/data/quant-interview/red-book.json');

  assert.equal(green.editionStatus, 'edition-pinned');
  assert.equal(green.edition, 'First Edition (2008)');
  assert.equal(green.isbn, '9781438236667');
  assert.equal(green.sourceFile, 'sha256:89a637408fc57164c3ee4ef19fb36688a58dfb37b91ef1471d11df82d6d0e3f5');
  assert.equal(green.sourceFileMeta.pdfPageCount, 213);

  assert.equal(red.editionStatus, 'edition-pinned');
  assert.equal(red.edition, 'Version 1.01 (2008)');
  assert.equal(red.isbn, '9781438217031');
  assert.equal(red.sourceFile, 'sha256:09c5aac761bd71c4a6b9406f50dcfe73d8af3ce0a3ef9bb4fe2d65d0b27db6b1');
  assert.equal(red.sourceFileMeta.pdfPageCount, 329);
});
```

- [ ] **Step 2: Add failing evidence-overlap assertions**

Append:

```js
test('ingestion evidence may overlap across distinct semantic problem scopes', async () => {
  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');
  const manifest = {
    source: 'x', canonicalTitle: 'X', editionStatus: 'edition-pinned', edition: '1', isbn: null,
    sourceFile: 'sha256:x', ingestionStatus: 'ingesting',
    batches: [
      { id: 'a', sourceSection: 'S', expectedProblemScope: ['1', '2'], evidencePageRanges: [{ startPage: 1, endPage: 6 }], status: 'complete' },
      { id: 'b', sourceSection: 'S', expectedProblemScope: ['3'], evidencePageRanges: [{ startPage: 6, endPage: 7 }], status: 'active' },
      { id: 'c', sourceSection: 'S', expectedProblemScope: ['4', '5'], evidencePageRanges: [{ startPage: 7, endPage: 9 }], status: 'complete' },
      { id: 'd', sourceSection: 'S', expectedProblemScope: ['6'], evidencePageRanges: [{ startPage: 9, endPage: 10 }], status: 'active' },
    ],
  };
  assert.doesNotThrow(() => validateIngestionManifest(manifest));
});

test('duplicate semantic problem ownership is rejected even when evidence differs', async () => {
  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');
  assert.throws(() => validateIngestionManifest({
    source: 'x', canonicalTitle: 'X', editionStatus: 'edition-pinned', edition: '1', isbn: null,
    sourceFile: 'sha256:x', ingestionStatus: 'ingesting',
    batches: [
      { id: 'a', sourceSection: 'S', expectedProblemScope: ['3'], evidencePageRanges: [{ startPage: 6, endPage: 7 }] },
      { id: 'b', sourceSection: 'S', expectedProblemScope: ['3'], evidencePageRanges: [{ startPage: 20, endPage: 21 }] },
    ],
  }), /duplicate source problem ownership/i);
});
```

- [ ] **Step 3: Verify RED**

Run:

```bash
node --test tests/quant-interview-topic-foundation.test.mjs tests/quant-interview-phase-2a.test.mjs
```

Expected: FAIL because Green/Red are still work-identified and the validator still expects `startPage/endPage`.

- [ ] **Step 4: Commit the failing contract**

```bash
git add tests/quant-interview-topic-foundation.test.mjs tests/quant-interview-phase-2a.test.mjs
git commit -m "test: define topic-first internal foundation contract"
```

---

### Task 2: Pin Green and Red to the supplied source files

**Files:**
- Modify: `src/data/quant-interview/green-book.json`
- Modify: `src/data/quant-interview/red-book.json`
- Modify: `src/data/quant-interview/toc/green-book.json`
- Modify: `src/data/quant-interview/toc/red-book.json`
- Modify: `src/content/problem-sources/green-book.md`
- Modify: `src/content/problem-sources/red-book.md`

**Interfaces:**
- Produces source manifests with `editionStatus: edition-pinned`, cryptographic `sourceFile`, `sourceFileMeta`, and `ingestionStatus: manifest-ready`.
- Produces TOCs with `tocStatus: source-file-verified` without claiming problem-level ingestion.

- [ ] **Step 1: Update Green manifest with exact supplied-file identity**

Use this shape in `src/data/quant-interview/green-book.json` while preserving `batches: []`:

```json
{
  "source": "green-book",
  "canonicalTitle": "A Practical Guide to Quantitative Finance Interviews",
  "editionStatus": "edition-pinned",
  "edition": "First Edition (2008)",
  "isbn": "9781438236667",
  "sourceFile": "sha256:89a637408fc57164c3ee4ef19fb36688a58dfb37b91ef1471d11df82d6d0e3f5",
  "sourceFileMeta": {
    "verification": "source-file-verified",
    "pdfPageCount": 213,
    "verifiedAnchors": [
      {"pdfPage": 3, "role": "title-and-edition-page"},
      {"pdfPage": 5, "role": "copyright-page"},
      {"pdfPage": 7, "role": "toc-start"},
      {"pdfPage": 211, "displayPage": 195, "role": "index-end"},
      {"pdfPage": 213, "role": "back-cover-isbn"}
    ],
    "note": "User-supplied First Edition file verified against title/edition page, copyright, TOC, index end, and back-cover ISBN. Source bytes are not committed."
  },
  "ingestionStatus": "manifest-ready",
  "batches": []
}
```

- [ ] **Step 2: Update Red manifest with exact supplied-file identity**

Use:

```json
{
  "source": "red-book",
  "canonicalTitle": "Quant Job Interview Questions and Answers",
  "editionStatus": "edition-pinned",
  "edition": "Version 1.01 (2008)",
  "isbn": "9781438217031",
  "sourceFile": "sha256:09c5aac761bd71c4a6b9406f50dcfe73d8af3ce0a3ef9bb4fe2d65d0b27db6b1",
  "sourceFileMeta": {
    "verification": "source-file-verified",
    "pdfPageCount": 329,
    "verifiedAnchors": [
      {"pdfPage": 2, "role": "back-cover-isbn"},
      {"pdfPage": 3, "role": "title-page"},
      {"pdfPage": 4, "role": "version-and-copyright-page"},
      {"pdfPage": 5, "role": "toc-start"},
      {"pdfPage": 328, "displayPage": 316, "role": "index-end"}
    ],
    "note": "User-supplied Version 1.01 file verified against cover ISBN, title, version/copyright page, TOC, and index end. Source bytes are not committed."
  },
  "ingestionStatus": "manifest-ready",
  "batches": []
}
```

- [ ] **Step 3: Pin source records and TOC status**

In both `src/content/problem-sources/*.md` records set the exact `edition`, `editionStatus: edition-pinned`, ISBN, and `ingestionStatus: manifest-ready`. In both TOC JSON files set:

```json
"tocStatus": "source-file-verified",
"coverageClaim": "verified-structure-not-problem-complete"
```

Add `edition` and a compact `sourceFileEvidence` block matching the manifest page counts.

- [ ] **Step 4: Run source tests**

```bash
node --test tests/quant-interview-topic-foundation.test.mjs tests/quant-interview-phase-2a.test.mjs tests/quant-interview-handoff.test.mjs
```

Expected: source identity assertions PASS; evidence-overlap assertions still FAIL.

- [ ] **Step 5: Commit**

```bash
git add src/data/quant-interview/green-book.json src/data/quant-interview/red-book.json src/data/quant-interview/toc/green-book.json src/data/quant-interview/toc/red-book.json src/content/problem-sources/green-book.md src/content/problem-sources/red-book.md tests
git commit -m "data: verify Green and Red interview sources"
```

---

### Task 3: Separate semantic batch ownership from reusable evidence pages

**Files:**
- Modify: `src/lib/quantInterviewIngestion.mjs`
- Modify: `src/data/quant-interview/150-most-frequently-asked.json`
- Modify: `tests/quant-interview-phase-2a.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`

**Interfaces:**
- `validateIngestionManifest(manifest) -> true | throws Error` remains the public validator signature.
- Batch canonical fields become `id`, `sourceSection`, `expectedProblemScope`, `evidencePageRanges`; evidence may overlap across batches.

- [ ] **Step 1: Replace page-range validation with semantic ownership validation**

Inside `validateIngestionManifest`, replace the `previousEndPage` cross-batch rule with:

```js
const ids = new Set();
const ownership = new Set();
for (const batch of manifest.batches) {
  if (!batch || typeof batch !== 'object') throw new Error('Each ingestion batch must be an object.');
  if (!batch.id || typeof batch.id !== 'string') throw new Error('Each ingestion batch requires an id.');
  if (ids.has(batch.id)) throw new Error(`Duplicate batch id: ${batch.id}`);
  ids.add(batch.id);

  if (!batch.sourceSection || typeof batch.sourceSection !== 'string') {
    throw new Error(`Batch ${batch.id} requires sourceSection.`);
  }
  if (!Array.isArray(batch.expectedProblemScope) || batch.expectedProblemScope.length === 0) {
    throw new Error(`Batch ${batch.id} requires a non-empty expectedProblemScope.`);
  }
  for (const sourceProblem of batch.expectedProblemScope) {
    if (typeof sourceProblem !== 'string' || !sourceProblem.trim()) {
      throw new Error(`Batch ${batch.id} has an invalid source problem identifier.`);
    }
    const key = `${batch.sourceSection}::${sourceProblem}`;
    if (ownership.has(key)) throw new Error(`Duplicate source problem ownership: ${key}`);
    ownership.add(key);
  }

  if (!Array.isArray(batch.evidencePageRanges) || batch.evidencePageRanges.length === 0) {
    throw new Error(`Batch ${batch.id} requires evidencePageRanges.`);
  }
  let previousEnd = 0;
  for (const range of batch.evidencePageRanges) {
    if (!Number.isInteger(range?.startPage) || !Number.isInteger(range?.endPage) || range.startPage < 1 || range.endPage < range.startPage) {
      throw new Error(`Invalid evidence page range for batch ${batch.id}.`);
    }
    if (range.startPage <= previousEnd) throw new Error(`Unsorted or overlapping evidence ranges inside batch ${batch.id}.`);
    previousEnd = range.endPage;
  }
}
```

Do not compare evidence ranges between distinct batches.

- [ ] **Step 2: Migrate the two completed 150 Questions batches**

Replace each top-level `startPage/endPage` pair with one `evidencePageRanges` array, preserving every other field exactly:

```json
"evidencePageRanges": [{"startPage": 1, "endPage": 6}]
```

and

```json
"evidencePageRanges": [{"startPage": 7, "endPage": 9}]
```

- [ ] **Step 3: Update old validator tests to the new schema**

Every synthetic batch in `tests/quant-interview-phase-2a.test.mjs` must include both `expectedProblemScope` and `evidencePageRanges`. Add explicit rejection tests for empty scope, duplicate ownership, missing evidence, reversed evidence, unsorted within-batch evidence, and within-batch evidence overlap.

- [ ] **Step 4: Run validator tests**

```bash
node --test tests/quant-interview-topic-foundation.test.mjs tests/quant-interview-phase-2a.test.mjs tests/quant-interview-handoff.test.mjs tests/quant-interview-q4-q5.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/quantInterviewIngestion.mjs src/data/quant-interview/150-most-frequently-asked.json tests
git commit -m "refactor: separate quant interview evidence from ownership"
```

---

### Task 4: Add canonical topic taxonomy and validator

**Files:**
- Create: `src/data/quant-interview/topics/taxonomy.json`
- Create: `src/lib/quantInterviewTopics.mjs`
- Modify: `src/content.config.ts`
- Modify: `tests/quant-interview-topic-foundation.test.mjs`

**Interfaces:**
- Produces `validateTopicTaxonomy(taxonomy)`, `flattenTopics(taxonomy)`, `getTopicById(taxonomy, id)`.
- Adds optional `quantInterviewTopics: string[]` to both Knowledge and Problem schemas; general-site entries default to `[]`.

- [ ] **Step 1: Add failing taxonomy tests**

Append:

```js
test('canonical topic taxonomy is unique and structurally valid', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const { validateTopicTaxonomy, flattenTopics } = await import('../src/lib/quantInterviewTopics.mjs');
  assert.doesNotThrow(() => validateTopicTaxonomy(taxonomy));
  const flat = flattenTopics(taxonomy);
  assert.equal(flat.length, new Set(flat.map((x) => x.id)).size);
  assert.deepEqual(flat.filter((x) => x.parentId === null).map((x) => x.id), [
    'interview-strategy-communication',
    'logic-brainteasers-discrete-reasoning',
    'calculus-differential-equations',
    'linear-algebra-matrix-methods',
    'probability-statistics',
    'stochastic-processes-stochastic-calculus',
    'derivatives-options-no-arbitrage',
    'fixed-income-rates-general-finance',
    'monte-carlo-numerical-methods',
    'algorithms-data-structures-cpp',
  ]);
});
```

Run it and confirm RED because the files do not exist.

- [ ] **Step 2: Create `taxonomy.json`**

Use this canonical top-level order and stable IDs. Each child object must contain `id`, `title`, and `order`:

```json
{
  "version": 1,
  "topics": [
    {"id":"interview-strategy-communication","title":"Interview Strategy & Communication","order":1,"children":[
      {"id":"interview-preparation","title":"Interview Preparation","order":1},
      {"id":"reasoning-communication","title":"Reasoning & Communication","order":2},
      {"id":"interview-process-formats","title":"Interview Process & Formats","order":3},
      {"id":"soft-interview","title":"Soft Interview","order":4}
    ]},
    {"id":"logic-brainteasers-discrete-reasoning","title":"Logic, Brainteasers & Discrete Reasoning","order":2,"children":[
      {"id":"problem-simplification","title":"Problem Simplification","order":1},
      {"id":"logical-deduction","title":"Logical Deduction","order":2},
      {"id":"invariants-state-transformations","title":"Invariants & State Transformations","order":3},
      {"id":"symmetry","title":"Symmetry","order":4},
      {"id":"pigeonhole-principle","title":"Pigeonhole Principle","order":5},
      {"id":"modular-arithmetic","title":"Modular Arithmetic","order":6},
      {"id":"mathematical-induction","title":"Mathematical Induction","order":7},
      {"id":"proof-by-contradiction","title":"Proof by Contradiction","order":8},
      {"id":"summation-combinatorial-puzzles","title":"Summation & Combinatorial Puzzles","order":9}
    ]},
    {"id":"calculus-differential-equations","title":"Calculus & Differential Equations","order":3,"children":[
      {"id":"limits-derivatives","title":"Limits & Derivatives","order":1},
      {"id":"integration","title":"Integration","order":2},
      {"id":"multivariable-calculus","title":"Multivariable Calculus","order":3},
      {"id":"taylor-newton-optimization","title":"Taylor, Newton & Optimization","order":4},
      {"id":"ordinary-differential-equations","title":"Ordinary Differential Equations","order":5}
    ]},
    {"id":"linear-algebra-matrix-methods","title":"Linear Algebra & Matrix Methods","order":4,"children":[
      {"id":"vectors-linear-systems","title":"Vectors & Linear Systems","order":1},
      {"id":"determinants-eigenvalues","title":"Determinants & Eigenvalues","order":2},
      {"id":"positive-semidefinite-matrices","title":"Positive Semidefinite Matrices","order":3},
      {"id":"covariance-correlation-matrices","title":"Covariance & Correlation Matrices","order":4},
      {"id":"matrix-decompositions","title":"Matrix Decompositions","order":5}
    ]},
    {"id":"probability-statistics","title":"Probability & Statistics","order":5,"children":[
      {"id":"probability-foundations","title":"Probability Foundations","order":1},
      {"id":"combinatorial-probability","title":"Combinatorial Probability","order":2},
      {"id":"conditional-probability-bayes","title":"Conditional Probability & Bayes","order":3},
      {"id":"random-variables-distributions","title":"Random Variables & Distributions","order":4},
      {"id":"expectation-variance-covariance","title":"Expectation, Variance & Covariance","order":5},
      {"id":"order-statistics-extremes","title":"Order Statistics & Extremes","order":6}
    ]},
    {"id":"stochastic-processes-stochastic-calculus","title":"Stochastic Processes & Stochastic Calculus","order":6,"children":[
      {"id":"random-walks-markov-chains","title":"Random Walks & Markov Chains","order":1},
      {"id":"martingales-stopping-times","title":"Martingales & Stopping Times","order":2},
      {"id":"brownian-motion","title":"Brownian Motion","order":3},
      {"id":"ito-stochastic-calculus","title":"Ito & Stochastic Calculus","order":4},
      {"id":"stochastic-differential-equations","title":"Stochastic Differential Equations","order":5}
    ]},
    {"id":"derivatives-options-no-arbitrage","title":"Derivatives, Options & No-Arbitrage","order":7,"children":[
      {"id":"no-arbitrage-option-properties","title":"No-Arbitrage & Option Properties","order":1},
      {"id":"replication-hedging","title":"Replication & Hedging","order":2},
      {"id":"black-scholes","title":"Black-Scholes","order":3},
      {"id":"option-greeks","title":"Option Greeks","order":4},
      {"id":"trees-monte-carlo-options","title":"Trees & Monte Carlo for Options","order":5},
      {"id":"option-portfolios-exotics","title":"Option Portfolios & Exotics","order":6},
      {"id":"incomplete-markets","title":"Incomplete Markets","order":7}
    ]},
    {"id":"fixed-income-rates-general-finance","title":"Fixed Income, Rates & General Finance","order":8,"children":[
      {"id":"bonds-yields-discounting","title":"Bonds, Yields & Discounting","order":1},
      {"id":"duration-convexity","title":"Duration & Convexity","order":2},
      {"id":"forwards-futures-swaps","title":"Forwards, Futures & Swaps","order":3},
      {"id":"interest-rate-models","title":"Interest-Rate Models","order":4},
      {"id":"portfolio-risk","title":"Portfolio & Risk","order":5}
    ]},
    {"id":"monte-carlo-numerical-methods","title":"Monte Carlo & Numerical Methods","order":9,"children":[
      {"id":"monte-carlo-simulation","title":"Monte Carlo Simulation","order":1},
      {"id":"root-finding-numerical-integration","title":"Root Finding & Numerical Integration","order":2},
      {"id":"finite-difference-methods","title":"Finite-Difference Methods","order":3},
      {"id":"variance-reduction-simulation-techniques","title":"Variance Reduction & Simulation Techniques","order":4}
    ]},
    {"id":"algorithms-data-structures-cpp","title":"Algorithms, Data Structures & C++","order":10,"children":[
      {"id":"algorithmic-complexity","title":"Algorithmic Complexity","order":1},
      {"id":"sorting-searching","title":"Sorting & Searching","order":2},
      {"id":"dynamic-programming-algorithms","title":"Dynamic Programming","order":3},
      {"id":"data-structures","title":"Data Structures","order":4},
      {"id":"cpp-language-memory","title":"C++ Language & Memory","order":5},
      {"id":"object-oriented-cpp","title":"Object-Oriented C++","order":6}
    ]}
  ]
}
```

- [ ] **Step 3: Implement the taxonomy validator**

`src/lib/quantInterviewTopics.mjs` must recursively flatten the nested tree, reject duplicate IDs, invalid/empty IDs/titles, duplicate sibling `order`, and cycles/object reuse. Return flattened records as `{ id, title, order, parentId }`.

- [ ] **Step 4: Add optional topic IDs to public content schemas**

In both Knowledge and Problem schemas in `src/content.config.ts`, add:

```ts
quantInterviewTopics: z.array(z.string()).default([]),
```

Do not classify content yet; Stage C does that.

- [ ] **Step 5: Run tests and commit**

```bash
node --test tests/quant-interview-topic-foundation.test.mjs
npm run check
```

Expected: PASS.

```bash
git add src/data/quant-interview/topics/taxonomy.json src/lib/quantInterviewTopics.mjs src/content.config.ts tests/quant-interview-topic-foundation.test.mjs
git commit -m "feat: add canonical quant interview taxonomy"
```

---

### Task 5: Add complete hidden source-to-topic routing

**Files:**
- Create: `src/data/quant-interview/topics/source-topic-map.json`
- Modify: `src/lib/quantInterviewTopics.mjs`
- Modify: `tests/quant-interview-topic-foundation.test.mjs`

**Interfaces:**
- Produces `validateSourceTopicMap(map, taxonomy, tocBySource)`.
- Every TOC node is explicitly represented as `content`, `container`, or `non-content`; no TOC node may disappear silently.

- [ ] **Step 1: Add the failing completeness test**

Append:

```js
test('all three source TOCs are explicitly reconciled into the canonical topic map', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const topicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const tocBySource = {
    'green-book': await readJson('src/data/quant-interview/toc/green-book.json'),
    'red-book': await readJson('src/data/quant-interview/toc/red-book.json'),
    '150-most-frequently-asked': await readJson('src/data/quant-interview/toc/150-most-frequently-asked.json'),
  };
  const { validateSourceTopicMap } = await import('../src/lib/quantInterviewTopics.mjs');
  assert.doesNotThrow(() => validateSourceTopicMap(topicMap, taxonomy, tocBySource));
});
```

- [ ] **Step 2: Create the map schema**

Use:

```json
{
  "version": 1,
  "entries": [
    {
      "source": "green-book",
      "sourceSection": "4.3",
      "role": "content",
      "canonicalTopics": ["conditional-probability-bayes"]
    }
  ]
}
```

Allowed roles are exactly `content`, `container`, and `non-content`. `content` requires at least one canonical topic; the other roles require `canonicalTopics: []`.

- [ ] **Step 3: Populate every TOC node**

Walk every node in all three repository TOC JSON files recursively and create exactly one map entry per `(source, sourceSection)` ID. Use these rules:

- Green topic subsections such as `2.7 Modular Arithmetic`, `3.6 Linear Algebra`, `4.3 Conditional Probability...`, `5.1 Markov Chain`, `5.4 Brownian Motion...`, `6.1 Option Pricing`, `6.2 Greeks`, `7.3 Numerical Methods` map to the matching canonical subtopic IDs.
- Green `problem-label` children inherit the canonical topic(s) of their nearest content parent and remain `role: content` so later item coverage can reconcile them explicitly.
- Red `Questions` / `Solutions` wrapper nodes are `container`; their subject children such as `2.2.1 Black-Scholes`, `2.2.2 Option price properties`, `3.2.2 Stochastic processes`, and `6.2.2 Integration and differentiation` are `content` and map to the matching canonical subtopics.
- Red chapter-level subject nodes with no finer semantic children (`4 Interest Rates`, `5 Numerical Techniques and Algorithms`, `7 Coding in C++`, `8 Logic/Brainteasers`, `9 The Soft Interview`) are `content` and may map to multiple canonical subtopics.
- 150 Questions `2 Questions` and `3 Solutions` are `container`; paired subject groups `2.1`/`3.1` through `2.7`/`3.7` are `content` and map to the same canonical topic sets.
- Preface/bibliography/index are `non-content` unless a section contains actual interview guidance intended for `interview-strategy-communication`.

Do not leave a TOC node unmapped because it is awkward; classify it explicitly as container/non-content when appropriate.

- [ ] **Step 4: Implement validation**

`validateSourceTopicMap` must reject unknown source IDs, unknown source-section IDs, duplicate `(source, sourceSection)` entries, unknown canonical topic IDs, empty topics for `content`, non-empty topics for `container/non-content`, and any TOC node with no map entry.

- [ ] **Step 5: Run and commit**

```bash
node --test tests/quant-interview-topic-foundation.test.mjs
```

Expected: PASS.

```bash
git add src/data/quant-interview/topics/source-topic-map.json src/lib/quantInterviewTopics.mjs tests/quant-interview-topic-foundation.test.mjs
git commit -m "data: map interview source TOCs into canonical topics"
```

---

### Task 6: Add hidden coverage ledgers and validator

**Files:**
- Create: `src/data/quant-interview/coverage/green-book.json`
- Create: `src/data/quant-interview/coverage/red-book.json`
- Create: `src/data/quant-interview/coverage/150-most-frequently-asked.json`
- Create: `src/lib/quantInterviewCoverage.mjs`
- Modify: `tests/quant-interview-topic-foundation.test.mjs`

**Interfaces:**
- Produces `validateCoverageLedger(ledger, context)` where `context = { sourceTopicMap, taxonomy, problemSlugs, knowledgeSlugs }`.
- Ledger data is never imported by public Astro pages.

- [ ] **Step 1: Add failing ledger tests**

Append:

```js
test('hidden coverage ledgers are valid and start explicitly pending', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');
  for (const source of ['green-book', 'red-book', '150-most-frequently-asked']) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      sourceTopicMap, taxonomy, problemSlugs: new Set(), knowledgeSlugs: new Set(), allowUnresolvedCanonicalRefs: true,
    }));
    assert.ok(ledger.entries.length > 0);
    assert.ok(ledger.entries.every((entry) => entry.state));
  }
});
```

- [ ] **Step 2: Use this ledger record shape**

```json
{
  "source": "green-book",
  "version": 1,
  "entries": [
    {
      "sourceSection": "4.3",
      "sourceItem": null,
      "canonicalTopics": ["conditional-probability-bayes"],
      "state": "pending",
      "canonicalProblems": [],
      "canonicalKnowledge": []
    }
  ]
}
```

Allowed `state` values are exactly:

```text
pending
needs-review
canonical-problem
merged-duplicate
variant
knowledge-only
interview-guidance
non-content-frontmatter
```

- [ ] **Step 3: Initialize section-level coverage from the map**

For every `source-topic-map` entry create one section-level ledger entry (`sourceItem: null`). `content` map entries start as `pending`. `container` and `non-content` entries use `non-content-frontmatter` only when they truly contain no content to ingest; a content-bearing wrapper remains `pending` until reconciled during a topic workstream.

- [ ] **Step 4: Implement validator**

Reject duplicate `(sourceSection, sourceItem)` keys, unknown canonical topic IDs, topics inconsistent with the source-topic map, terminal problem states without a canonical problem target, `knowledge-only` without a canonical knowledge target, and canonical references that do not resolve when `allowUnresolvedCanonicalRefs` is false.

`pending` and `needs-review` must remain explicit valid states and must never be silently omitted.

- [ ] **Step 5: Prove public isolation**

Add a test that reads every file under `src/pages/knowledge/quant-interview/`, `src/pages/problems/`, `src/layouts/`, and `src/components/` and asserts none contains `quant-interview/coverage` or imports `quantInterviewCoverage`.

- [ ] **Step 6: Run and commit**

```bash
node --test tests/quant-interview-topic-foundation.test.mjs
```

Expected: PASS.

```bash
git add src/data/quant-interview/coverage src/lib/quantInterviewCoverage.mjs tests/quant-interview-topic-foundation.test.mjs
git commit -m "feat: add hidden quant interview coverage ledger"
```

---

### Task 7: Rewrite repository memory for the Topic-first protocol

**Files:**
- Modify: `docs/quant-interview/README.md`
- Modify: `docs/quant-interview/AGENT_PROTOCOL.md`
- Modify: `docs/quant-interview/CONTENT_STANDARD.md`
- Modify: `docs/quant-interview/SOURCE_CATALOG.md`
- Modify: `docs/quant-interview/HANDOFF.md`
- Modify: `README.md`
- Modify: `tests/quant-interview-handoff.test.mjs`

**Interfaces:**
- Produces the new durable Agent contract: topic workstreams across all verified sources, semantic dedup first, hidden coverage mandatory, evidence internal only.

- [ ] **Step 1: Make handoff tests fail on the new protocol**

Update `tests/quant-interview-handoff.test.mjs` to require these phrases semantically:

```text
Topic-first
all three sources
canonical topic workstream
semantic deduplication
coverage ledger
evidencePageRanges
source page numbers are internal evidence only
```

Update source-state assertions so Green and Red are source-file-verified and edition-pinned but still not problem-complete.

- [ ] **Step 2: Rewrite protocol sections**

`AGENT_PROTOCOL.md` must explicitly require the per-topic sequence:

```text
select one canonical subtopic
resolve all mapped source sections
read every available verified source for that subtopic
inventory concepts/problems/variants/guidance
semantic dedup against repository
update/create canonical Knowledge first
update/create canonical Problems
update every inspected coverage entry
run tests/check/build
review topic-only diff
```

Remove instructions that imply normal processing should proceed book-by-book or source-question-number-by-source-question-number.

- [ ] **Step 3: Update source catalog truthfully**

Record exact Green/Red verified file identities, editions/versions, ISBNs, and page counts. State explicitly that source-file verification is not problem coverage and that the three books are internal inputs to a Topic-first public system.

- [ ] **Step 4: Update Handoff**

Set current architecture state to Stage A foundation complete and next action to Stage B public Topic-first shell. Do not tell the next Agent to ingest a source-number range.

- [ ] **Step 5: Run docs tests and commit**

```bash
node --test tests/quant-interview-handoff.test.mjs tests/quant-interview-topic-foundation.test.mjs
```

Expected: PASS.

```bash
git add docs/quant-interview README.md tests/quant-interview-handoff.test.mjs
git commit -m "docs: switch quant interview agents to topic-first protocol"
```

---

### Task 8: Run Stage A completion gates

**Files:** none unless verification finds a defect.

**Interfaces:** Stage B may start only from a green Stage A tree.

- [ ] **Step 1: Run focused validators**

```bash
node --test tests/quant-interview-topic-foundation.test.mjs tests/quant-interview-phase-2a.test.mjs tests/quant-interview-handoff.test.mjs
```

Expected: PASS, zero failures.

- [ ] **Step 2: Run the full suite**

```bash
npm run test
```

Expected: PASS, zero failures.

- [ ] **Step 3: Run Astro validation**

```bash
npm run check
npm run build
```

Expected: both exit 0.

- [ ] **Step 4: Review diff boundary**

```bash
git diff --stat main...HEAD
git diff --name-only main...HEAD
```

Expected: internal validators/data, source metadata, schemas, tests, and repository-memory docs only. No public UI rewrite and no new source-derived Problem/Knowledge content.

- [ ] **Step 5: Commit any verification-only correction separately**

If and only if a correction is required:

```bash
git add <exact corrected files>
git commit -m "fix: close topic-first stage A verification gap"
```
