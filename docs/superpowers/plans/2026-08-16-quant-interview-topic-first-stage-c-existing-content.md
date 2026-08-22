# Quant Interview Topic-First Stage C Existing Content Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all currently published Quant Interview Problems and reusable Knowledge into the source-neutral canonical topic model, move existing source provenance into the hidden coverage ledger, and remove source coupling from the public Problem schema and relationship validator.

**Architecture:** Public Problem Markdown becomes canonical content keyed only by its own ID/slug, topic IDs, Knowledge relationships, difficulty, and pedagogical structure. Existing book provenance for Q1/Q2/Q4/Q5 is copied into the internal 150 Questions coverage ledger before it is removed from public Problem frontmatter. Existing routes stay stable because canonical routes use the filename slug, not the directory path.

**Tech Stack:** Astro 5, TypeScript, Markdown content collections, JSON coverage ledger, ESM validators, Node built-in test runner.

## Global Constraints

- Requires Stages A and B merged and green.
- No existing mathematical/financial solution may be weakened or discarded during metadata migration.
- Public Problem pages must not expose source book, source chapter, source question, or source page.
- Internal coverage must preserve Q1/Q2/Q4/Q5 source identity before public source fields are removed.
- All current Quant Interview Problems, including Lorien Lab original seeds, receive canonical `quantInterviewTopics`.
- All current Knowledge nodes actually used by Quant Interview Problems/Techniques receive canonical `quantInterviewTopics`.
- Canonical Problem slugs/routes remain unchanged.
- Source-derived problem files must no longer live in a directory named after a book after migration.
- No new cross-book source content is ingested in Stage C.
- Completion gates are `npm run test`, `npm run check`, and `npm run build`.

---

## File Map

**Create**

```text
tests/quant-interview-source-neutral-content.test.mjs
```

**Move / recreate then delete old path**

```text
src/content/problems/150-most-frequently-asked/put-quotes-zero-cost-static-portfolio.md
  -> src/content/problems/derivatives/put-quotes-zero-cost-static-portfolio.md
src/content/problems/150-most-frequently-asked/missing-digit-power-of-two.md
  -> src/content/problems/logic/missing-digit-power-of-two.md
src/content/problems/150-most-frequently-asked/ants-crossing-line.md
  -> src/content/problems/logic/ants-crossing-line.md
src/content/problems/150-most-frequently-asked/correlation-matrix-parameter-range.md
  -> src/content/problems/linear-algebra/correlation-matrix-parameter-range.md
src/content/problems/original/conditional-dice-expectation.md
  -> src/content/problems/probability/conditional-dice-expectation.md
src/content/problems/original/random-walk-boundary.md
  -> src/content/problems/stochastic-processes/random-walk-boundary.md
```

**Modify**

```text
src/content.config.ts
src/lib/problemRelations.ts
src/pages/problems/index.astro
src/pages/problems/[...slug].astro
src/pages/knowledge/[...id].astro
src/pages/knowledge/quant-interview/index.astro
src/data/quant-interview/coverage/150-most-frequently-asked.json
src/content/knowledge/concepts/conditioning.md
src/content/knowledge/concepts/first-step-analysis.md
src/content/knowledge/concepts/recursion-problem-solving.md
src/content/knowledge/concepts/no-arbitrage-principle.md
src/content/knowledge/concepts/option-price-convexity-in-strike.md
src/content/knowledge/concepts/static-arbitrage-construction.md
src/content/knowledge/concepts/modular-arithmetic.md
src/content/knowledge/concepts/modular-invariants.md
src/content/knowledge/concepts/identity-swapping-invariance.md
src/content/knowledge/concepts/correlation-matrix.md
src/content/knowledge/concepts/positive-semidefinite-matrix.md
src/content/knowledge/concepts/principal-minor-feasibility.md
tests/quant-interview-handoff.test.mjs
tests/quant-interview-q4-q5.test.mjs
tests/problem-content-contract.test.mjs
docs/quant-interview/HANDOFF.md
docs/quant-interview/CONTENT_STANDARD.md
```

---

### Task 1: Define the source-neutral public content contract

**Files:**
- Create: `tests/quant-interview-source-neutral-content.test.mjs`
- Modify: existing Quant Interview tests that still require book frontmatter.

**Interfaces:**
- Produces failing tests proving public Problem frontmatter no longer requires source provenance and current content has canonical topics.

- [ ] **Step 1: Write failing schema/content tests**

Create:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const currentProblemSlugs = [
  'put-quotes-zero-cost-static-portfolio',
  'missing-digit-power-of-two',
  'ants-crossing-line',
  'correlation-matrix-parameter-range',
  'conditional-dice-expectation',
  'random-walk-boundary',
];

async function findProblem(slug) {
  const files = await readdir('src/content/problems', { recursive: true });
  const match = files.find((path) => String(path).endsWith(`/${slug}.md`) || String(path) === `${slug}.md`);
  assert.ok(match, `missing problem ${slug}`);
  return `src/content/problems/${match}`;
}

test('public Problem schema is source-neutral', async () => {
  const config = await readFile('src/content.config.ts', 'utf8');
  for (const field of ['sourceSection', 'sourceChapter', 'sourceProblem', 'sourceReference']) {
    assert.doesNotMatch(config, new RegExp(`\\b${field}\\s*:`));
  }
  assert.doesNotMatch(config, /originType:\s*z\.enum/);
});

test('all current interview problems have canonical topics and no source provenance', async () => {
  for (const slug of currentProblemSlugs) {
    const path = await findProblem(slug);
    const text = await readFile(path, 'utf8');
    assert.match(text, /^quantInterviewTopics:\s*\[[^\]]+\]$/m);
    assert.doesNotMatch(text, /^originType:/m);
    assert.doesNotMatch(text, /^source(?:Section|Chapter|Problem|Reference)?:/m);
    assert.doesNotMatch(path, /150-most-frequently-asked|\/original\//);
  }
});

test('current source-derived items remain auditable in hidden coverage', async () => {
  const ledger = JSON.parse(await readFile('src/data/quant-interview/coverage/150-most-frequently-asked.json', 'utf8'));
  const items = new Map(ledger.entries.filter((x) => x.sourceItem).map((x) => [x.sourceItem, x]));
  for (const id of ['1', '2', '4', '5']) {
    assert.equal(items.get(id)?.state, 'canonical-problem');
    assert.equal(items.get(id)?.canonicalProblems.length, 1);
  }
});
```

- [ ] **Step 2: Update legacy tests to stop requiring `originType: book` / `source:`**

In `tests/quant-interview-handoff.test.mjs`, `tests/quant-interview-q4-q5.test.mjs`, and `tests/problem-content-contract.test.mjs`, keep S3+ structure assertions but remove source-frontmatter requirements for canonical Problems.

- [ ] **Step 3: Verify RED**

```bash
node --test tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-handoff.test.mjs tests/quant-interview-q4-q5.test.mjs tests/problem-content-contract.test.mjs
```

Expected: FAIL because schema/frontmatter and coverage are still source-oriented.

- [ ] **Step 4: Commit tests**

```bash
git add tests
git commit -m "test: define source-neutral canonical interview content"
```

---

### Task 2: Remove source provenance from the public Problem schema and relationship validator

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/lib/problemRelations.ts`
- Modify: `src/pages/problems/index.astro`
- Modify: `src/pages/problems/[...slug].astro`
- Modify: `src/pages/knowledge/[...id].astro`
- Modify: `src/pages/knowledge/quant-interview/index.astro`

**Interfaces:**
- `validateProblemRelationships(problems, knowledge)` becomes the canonical signature.
- Source-specific helpers `getSourceForProblem` and `getProblemsForSource` are removed.

- [ ] **Step 1: Simplify Problem schema**

Remove these fields from the `problems` schema:

```ts
originType
source
sourceSection
sourceChapter
sourceProblem
sourceReference
sourceUrl
```

Remove the `superRefine` block that requires a source for non-original Problems. Keep `quantInterviewTopics`, relationships, difficulty, family, and maturity fields.

- [ ] **Step 2: Simplify relationship validation**

Change the signature to:

```ts
export function validateProblemRelationships(
  problems: Problem[],
  knowledge: Knowledge[],
) { ... }
```

Delete `ProblemSource`, `getSourceForProblem`, `getProblemsForSource`, source-slug resolution, and duplicate source-problem-key logic. Preserve duplicate `problemId`, concepts/prerequisites, Technique type/category, and related Problem validation.

- [ ] **Step 3: Update every call site**

Replace:

```ts
validateProblemRelationships(problems, sources, knowledge)
```

with:

```ts
validateProblemRelationships(problems, knowledge)
```

After Stage B, public pages should no longer load `problemSources` merely for validation.

- [ ] **Step 4: Run type checks**

```bash
npm run check
```

Expected: PASS after all call sites are updated.

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts src/lib/problemRelations.ts src/pages
git commit -m "refactor: make canonical interview problems source-neutral"
```

---

### Task 3: Move current Problems into canonical topic directories and classify them

**Files:**
- Move/recreate the six Problem files listed in File Map.

**Interfaces:**
- Slugs and `problemId` values stay unchanged.
- Adds canonical `quantInterviewTopics` arrays.

- [ ] **Step 1: Apply exact topic mappings**

Use these frontmatter mappings:

```text
put-quotes-zero-cost-static-portfolio
  [derivatives-options-no-arbitrage, no-arbitrage-option-properties]

missing-digit-power-of-two
  [logic-brainteasers-discrete-reasoning, modular-arithmetic]

ants-crossing-line
  [logic-brainteasers-discrete-reasoning, invariants-state-transformations]

correlation-matrix-parameter-range
  [linear-algebra-matrix-methods, covariance-correlation-matrices, positive-semidefinite-matrices]

conditional-dice-expectation
  [probability-statistics, conditional-probability-bayes, expectation-variance-covariance]

random-walk-boundary
  [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
```

- [ ] **Step 2: Remove source-only frontmatter**

From all six canonical Problem files remove `originType` and every `source*` field. Preserve title, description, dates, classification, concepts, techniques, prerequisites, relatedProblems, family, difficulties, status, featured, and the entire Markdown body verbatim except for path-independent editorial fixes required by schema.

- [ ] **Step 3: Recreate under canonical directories**

Create exact destination paths from File Map, then delete old source/original paths. Do not rename the filename slug.

- [ ] **Step 4: Verify route identity and content preservation**

Run:

```bash
node --test tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-q4-q5.test.mjs tests/problem-content-contract.test.mjs
npm run check
```

Expected: schema/path/topic assertions PASS and existing solution assertions still PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/problems tests
git commit -m "content: classify canonical interview problems by topic"
```

---

### Task 4: Classify current Quant Interview Knowledge nodes

**Files:**
- Modify the twelve Knowledge files listed in File Map.

**Interfaces:**
- Adds `quantInterviewTopics` only; does not add book provenance.

- [ ] **Step 1: Apply exact mappings**

Use:

```text
conditioning
  [probability-statistics, conditional-probability-bayes]

first-step-analysis
  [stochastic-processes-stochastic-calculus, random-walks-markov-chains]

recursion-problem-solving
  [logic-brainteasers-discrete-reasoning]

no-arbitrage-principle
  [derivatives-options-no-arbitrage, no-arbitrage-option-properties]

option-price-convexity-in-strike
  [derivatives-options-no-arbitrage, no-arbitrage-option-properties]

static-arbitrage-construction
  [derivatives-options-no-arbitrage, no-arbitrage-option-properties]

modular-arithmetic
  [logic-brainteasers-discrete-reasoning, modular-arithmetic]

modular-invariants
  [logic-brainteasers-discrete-reasoning, modular-arithmetic, invariants-state-transformations]

identity-swapping-invariance
  [logic-brainteasers-discrete-reasoning, invariants-state-transformations]

correlation-matrix
  [linear-algebra-matrix-methods, covariance-correlation-matrices]

positive-semidefinite-matrix
  [linear-algebra-matrix-methods, positive-semidefinite-matrices]

principal-minor-feasibility
  [linear-algebra-matrix-methods, positive-semidefinite-matrices]
```

- [ ] **Step 2: Add a resolution test**

Extend `tests/quant-interview-source-neutral-content.test.mjs` to read taxonomy IDs and assert every `quantInterviewTopics` value in these Knowledge files resolves to the taxonomy.

- [ ] **Step 3: Run and commit**

```bash
node --test tests/quant-interview-source-neutral-content.test.mjs
npm run check
```

Expected: PASS.

```bash
git add src/content/knowledge/concepts tests/quant-interview-source-neutral-content.test.mjs
git commit -m "content: classify interview knowledge by canonical topic"
```

---

### Task 5: Move Q1/Q2/Q4/Q5 provenance into the hidden 150 Questions ledger

**Files:**
- Modify: `src/data/quant-interview/coverage/150-most-frequently-asked.json`
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`

**Interfaces:**
- Four item-level terminal coverage entries become the sole canonical source→Problem mappings for already-ingested 150 Questions items.

- [ ] **Step 1: Add item-level entries**

Under source section `1` / `First Look: Ten Questions`, add:

```json
{
  "sourceSection": "1",
  "sourceItem": "1",
  "canonicalTopics": ["derivatives-options-no-arbitrage", "no-arbitrage-option-properties"],
  "state": "canonical-problem",
  "canonicalProblems": ["put-quotes-zero-cost-static-portfolio"],
  "canonicalKnowledge": ["no-arbitrage-principle", "option-price-convexity-in-strike", "static-arbitrage-construction"]
}
```

```json
{
  "sourceSection": "1",
  "sourceItem": "2",
  "canonicalTopics": ["logic-brainteasers-discrete-reasoning", "modular-arithmetic"],
  "state": "canonical-problem",
  "canonicalProblems": ["missing-digit-power-of-two"],
  "canonicalKnowledge": ["modular-arithmetic", "modular-invariants"]
}
```

```json
{
  "sourceSection": "1",
  "sourceItem": "4",
  "canonicalTopics": ["logic-brainteasers-discrete-reasoning", "invariants-state-transformations"],
  "state": "canonical-problem",
  "canonicalProblems": ["ants-crossing-line"],
  "canonicalKnowledge": ["identity-swapping-invariance"]
}
```

```json
{
  "sourceSection": "1",
  "sourceItem": "5",
  "canonicalTopics": ["linear-algebra-matrix-methods", "covariance-correlation-matrices", "positive-semidefinite-matrices"],
  "state": "canonical-problem",
  "canonicalProblems": ["correlation-matrix-parameter-range"],
  "canonicalKnowledge": ["correlation-matrix", "positive-semidefinite-matrix", "principal-minor-feasibility"]
}
```

Keep the section-level `sourceItem: null` record non-terminal (`needs-review` or `pending`) until Questions 1–10 are fully reconciled; do not mark the entire section absorbed from four items.

- [ ] **Step 2: Validate against real canonical slugs**

In the test, call `validateCoverageLedger` with actual Problem and Knowledge slug sets and `allowUnresolvedCanonicalRefs: false`.

- [ ] **Step 3: Run and commit**

```bash
node --test tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-topic-foundation.test.mjs
```

Expected: PASS.

```bash
git add src/data/quant-interview/coverage/150-most-frequently-asked.json tests
git commit -m "data: move existing interview provenance into hidden coverage"
```

---

### Task 6: Update public counts and topic navigation with migrated content

**Files:**
- Modify: `src/pages/knowledge/quant-interview/index.astro`
- Modify: `src/pages/problems/index.astro`
- Modify: `tests/quant-interview-topic-public-shell.test.mjs`

**Interfaces:**
- Topic cards/counts and Problem Bank filters now show real non-zero classification for migrated content.

- [ ] **Step 1: Add count assertions**

Test that the landing page derives counts from `quantInterviewTopics` and does not hard-code counts. Assert Problem Bank rows include all current topic IDs.

- [ ] **Step 2: Verify query prefilter behavior statically**

Assert the bank script reads `URLSearchParams` and `topic` and the selector is populated with taxonomy topics.

- [ ] **Step 3: Run and commit**

```bash
node --test tests/quant-interview-topic-public-shell.test.mjs tests/quant-interview-source-neutral-content.test.mjs
npm run build
```

Expected: PASS.

```bash
git add src/pages tests
git commit -m "feat: activate topic navigation for migrated interview content"
```

---

### Task 7: Update repository memory after existing-content migration

**Files:**
- Modify: `docs/quant-interview/HANDOFF.md`
- Modify: `docs/quant-interview/CONTENT_STANDARD.md`
- Modify: `tests/quant-interview-handoff.test.mjs`

**Interfaces:**
- Handoff points next work to the first cross-book canonical topic workstream, never a source question number sequence.

- [ ] **Step 1: Update Content Standard**

State explicitly:

```text
Canonical public Problems do not carry source provenance in frontmatter or rendered content.
All source mappings live in hidden coverage data.
A duplicate source question enriches a canonical Problem; it does not create a duplicate public page.
```

- [ ] **Step 2: Update Handoff**

Record Stages A–C as complete, list the six current canonical Problems and their topic classifications, and set the next action to build/execute the first Stage D cross-book topic workstream. Do not prescribe Green/Red/150 order.

- [ ] **Step 3: Run and commit**

```bash
node --test tests/quant-interview-handoff.test.mjs
```

Expected: PASS.

```bash
git add docs/quant-interview tests/quant-interview-handoff.test.mjs
git commit -m "docs: hand off source-neutral canonical interview content"
```

---

### Task 8: Run Stage C completion gates

- [ ] **Step 1: Focused tests**

```bash
node --test tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-topic-public-shell.test.mjs tests/quant-interview-topic-foundation.test.mjs tests/quant-interview-q4-q5.test.mjs tests/problem-content-contract.test.mjs
```

Expected: PASS.

- [ ] **Step 2: Full gates**

```bash
npm run test
npm run check
npm run build
```

Expected: all exit 0.

- [ ] **Step 3: Route/content boundary review**

Confirm all six existing slugs still appear in the static build and no public Problem Markdown path contains `150-most-frequently-asked` or `/original/`. Confirm hidden ledgers still resolve.
