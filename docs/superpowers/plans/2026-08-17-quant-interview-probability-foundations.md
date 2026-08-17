# Quant Interview Probability Foundations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the bounded `Probability & Statistics → Probability Foundations` cross-book workstream by fusing verified source material into three canonical Knowledge nodes and six source-neutral Problems while keeping narrow repository-authored probability extensions separate from source provenance.

**Architecture:** Public content remains Topic-first and source-neutral. Hidden coverage records only real item-level source contributions; adjacent probability material that belongs to later canonical topics is documented in workstream source-scope audit notes rather than falsely closed. The already-supported `canonicalExtensions` field records narrow repository-authored foundations material without becoming a public rendering dependency.

**Tech Stack:** Astro content collections, Markdown/YAML frontmatter, JSON source/workstream/coverage data, JavaScript ES modules, Node.js built-in test runner, GitHub Actions, npm.

## Global Constraints

- Base branch: `chatgpt/quant-interview-topic-first-fusion-design-2026-08-16`.
- Work branch: `chatgpt/quant-interview-workstream-probability-foundations-2026-08-17`.
- Workstream id: `probability-statistics-probability-foundations-005`.
- Canonical topics: `probability-statistics`, `probability-foundations`.
- Approved canonical extensions exactly: `kolmogorov-probability-axioms`, `derived-event-probability-rules`, `mutual-exclusivity-vs-independence`.
- Green direct source scope: section `4.1`, verified internal evidence PDF pages `75-80`.
- Red reviewed source scope: section `3.2.1`, verified question evidence pages `92-96`, direct in-scope solution evidence pages `112-119`.
- 150 reviewed source scope: sections `1`, `2.6`, `2.7`, `3.6`, verified evidence pages `12`, `19-20`, `40-44`, `134-140`, `177-178`.
- Source-derived in-scope rows are exactly five Green semantic units, four Red items, and two 150 items.
- Green + 150 extra-coin tasks must merge into one canonical Problem.
- Green + Red card-rank tasks must merge into one canonical Problem.
- Green + Red displaced-passenger tasks must merge into one canonical Problem.
- 150 `2.7::3` requires an item-level topic override with an explicit nonempty reason because the editorial source container maps to brainteasers while the item identity is Probability Foundations.
- 150 `1::6` may target the mixed Knowledge node `probability-axioms-derived-rules` only for complement-event and repeated-independence reasoning; its resolution note must explicitly deny source support for the repository-authored Kolmogorov-axiom extension.
- No new generic `deferred-to-topic` coverage state.
- Reviewed but out-of-scope material remains documented in `sourceScopes.reviewNote`; do not create fake terminal Foundations coverage rows for later topics.
- Existing `conditioning` stays assigned to `conditional-probability-bayes`.
- Do not absorb combinatorial counting, Bayes, total probability, total expectation, distribution catalogues, expectation/variance theory, order statistics, LLN/CLT, stochastic processes, or stochastic calculus.
- New Knowledge: `probability-spaces-events`, `probability-axioms-derived-rules`, `symmetry-equiprobability-geometric-probability`.
- New Problems: `more-heads-with-one-extra-coin`, `higher-card-by-symmetry`, `drunk-passenger-last-seat`, `random-points-in-a-semicircle`, `minimum-trials-for-at-least-one-hit`, `romeo-juliet-meeting-probability`.
- Canonical Problem ids: `probability-foundations-001` through `probability-foundations-006` in the Problem order above.
- Every new Knowledge node exposes `## Interview Checks`.
- Every new Problem is S3+: problem statement, progressive hints, full reasoning, why it matters, common mistakes, and extensions/variants.
- Public content contains no source book name, source question number, source page number, source provenance field, or source-shaped Problem id.
- Final expected source-neutral regression counts if no unrelated corpus changes occur: 24 canonical Problems and 24 explicitly topic-classified Knowledge / Technique nodes.
- Final verification gates: `npm run test`, `npm run check`, `npm run build`, plus topic-only diff review.

## File Map

**Create**

- `src/data/quant-interview/workstreams/probability-statistics-probability-foundations-005.json`
- `src/content/knowledge/concepts/probability-spaces-events.md`
- `src/content/knowledge/concepts/probability-axioms-derived-rules.md`
- `src/content/knowledge/concepts/symmetry-equiprobability-geometric-probability.md`
- `src/content/problems/probability/more-heads-with-one-extra-coin.md`
- `src/content/problems/probability/higher-card-by-symmetry.md`
- `src/content/problems/probability/drunk-passenger-last-seat.md`
- `src/content/problems/probability/random-points-in-a-semicircle.md`
- `src/content/problems/probability/minimum-trials-for-at-least-one-hit.md`
- `src/content/problems/probability/romeo-juliet-meeting-probability.md`
- `tests/quant-interview-probability-foundations-workstream.test.mjs`
- `tests/quant-interview-probability-foundations-content.test.mjs`
- `tests/quant-interview-probability-foundations-boundary.test.mjs`
- `.github/workflows/quant-interview-probability-foundations-ci.yml` temporarily; remove before final branch handoff.

**Modify**

- `src/data/quant-interview/coverage/green-book.json`
- `src/data/quant-interview/coverage/red-book.json`
- `src/data/quant-interview/coverage/150-most-frequently-asked.json`
- `tests/quant-interview-source-neutral-content.test.mjs`
- `tests/quant-interview-handoff.test.mjs`
- `docs/quant-interview/HANDOFF.md`

**Do not modify unless a failing test proves it necessary**

- `src/lib/quantInterviewWorkstreams.mjs` — optional `canonicalExtensions` validation already exists.
- `src/lib/quantInterviewCoverage.mjs` — the current state model is sufficient; do not add a deferred state.
- `src/data/quant-interview/topics/taxonomy.json`.
- `src/data/quant-interview/topics/source-topic-map.json`.
- `src/content/knowledge/concepts/conditioning.md` except to inspect its existing exact topic assignment.
- public page/layout components.

---

### Task 1: Baseline Gate and Workstream Registration

**Files:** create temporary branch CI, create workstream test, create workstream JSON.

**Interfaces:** consumes existing `validateTopicWorkstream(workstream, context)`; produces one validated active workstream with audited three-source scope and exact canonical extensions.

- [ ] **Step 1: Create branch-only CI and prove the spec-only baseline is green**

Create `.github/workflows/quant-interview-probability-foundations-ci.yml`:

```yaml
name: Quant Interview Probability Foundations CI

on:
  push:
    branches:
      - chatgpt/quant-interview-workstream-probability-foundations-2026-08-17
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

Wait for the run on the unchanged business tree to show all three commands successful before adding RED tests.

- [ ] **Step 2: Create registration RED tests**

Create `tests/quant-interview-probability-foundations-workstream.test.mjs` with the standard helpers and these contracts:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-probability-foundations-005.json';
const expectedExtensions = [
  'kolmogorov-probability-axioms',
  'derived-event-probability-rules',
  'mutual-exclusivity-vs-independence',
];

async function context() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/${source}.json`)]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

test('fifth cross-book workstream is bounded to probability foundations', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'probability-statistics-probability-foundations-005');
  assert.deepEqual(workstream.canonicalTopics, ['probability-statistics', 'probability-foundations']);
  assert.deepEqual(workstream.canonicalExtensions, expectedExtensions);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
  assert.match(workstream.status, /^(?:active|complete)$/);
});

test('existing workstream validator accepts the approved extension declaration', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: 'axioms' }, ctx), /canonicalExtensions.*array/i);
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: ['axioms', 'axioms'] }, ctx), /duplicate canonical extension/i);
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: [''] }, ctx), /canonical extension.*non-empty string/i);
});
```

- [ ] **Step 3: Run RED**

```bash
node --test tests/quant-interview-probability-foundations-workstream.test.mjs
```

Expected: failure because `probability-statistics-probability-foundations-005.json` does not exist.

- [ ] **Step 4: Create the exact workstream record**

Create `src/data/quant-interview/workstreams/probability-statistics-probability-foundations-005.json`:

```json
{
  "id": "probability-statistics-probability-foundations-005",
  "canonicalTopics": ["probability-statistics", "probability-foundations"],
  "canonicalExtensions": [
    "kolmogorov-probability-axioms",
    "derived-event-probability-rules",
    "mutual-exclusivity-vs-independence"
  ],
  "status": "active",
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": ["4.1"],
      "evidencePageRanges": [{"startPage":75,"endPage":80}]
    },
    {
      "source": "red-book",
      "sourceSections": ["3.2.1"],
      "evidencePageRanges": [
        {"startPage":92,"endPage":96},
        {"startPage":112,"endPage":119}
      ],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Only Q3.16, Q3.18, Q3.24, and Q3.25 are claimed by Probability Foundations; adjacent General questions remain for later canonical topics."
    },
    {
      "source": "150-most-frequently-asked",
      "sourceSections": ["1", "2.6", "2.7", "3.6"],
      "evidencePageRanges": [
        {"startPage":12,"endPage":12},
        {"startPage":19,"endPage":20},
        {"startPage":40,"endPage":44},
        {"startPage":134,"endPage":140},
        {"startPage":177,"endPage":178}
      ],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "First Look Q6 and Brainteasers Q3 are in scope; the formal Probability/Stochastic Calculus questions inspected here remain for later canonical topics and are not falsely closed as Foundations coverage."
    }
  ]
}
```

Do not modify `quantInterviewWorkstreams.mjs`; the validator already supports this record.

- [ ] **Step 5: Verify GREEN and full baseline**

```bash
node --test tests/quant-interview-probability-foundations-workstream.test.mjs
npm run test
npm run check
npm run build
```

Commit: `feat: register probability foundations workstream`.

---

### Task 2: Item-Level Inventory and Topic Override

**Files:** modify the three hidden coverage ledgers and the workstream test.

**Interfaces:** produces eleven real `needs-review` item rows only; later-topic material remains audit-only in `sourceScopes`.

- [ ] **Step 1: Add inventory RED expectations**

Extend the workstream test with:

```js
const sourceInventory = {
  'green-book': [
    ['4.1', 'definitions-set-operations'],
    ['4.1', 'coin-toss-game'],
    ['4.1', 'card-game'],
    ['4.1', 'drunk-passenger'],
    ['4.1', 'n-points-on-a-circle'],
  ],
  'red-book': [
    ['3.2.1', '3.16'],
    ['3.2.1', '3.18'],
    ['3.2.1', '3.24'],
    ['3.2.1', '3.25'],
  ],
  '150-most-frequently-asked': [
    ['1', '6'],
    ['2.7', '3'],
  ],
};

test('every claimed probability foundations source item is explicitly inventoried', async () => {
  for (const [source, keys] of Object.entries(sourceInventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = byKey.get(`${section}::${item}`);
      assert.ok(entry, `missing inventory row ${source} ${section} ${item}`);
      assert.ok(entry.canonicalTopics.includes('probability-foundations'), `${source} ${section} ${item} missing probability-foundations topic`);
    }
  }
});

test('150 brainteaser probability item has an explicit item-level topic override reason', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  const entry = ledger.entries.find((item) => item.sourceSection === '2.7' && item.sourceItem === '3');
  assert.ok(entry);
  assert.deepEqual(entry.canonicalTopics, ['probability-foundations']);
  assert.match(entry.topicOverrideReason ?? '', /item-level|mathematical identity|editorial/i);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-probability-foundations-workstream.test.mjs
```

Expected: the eleven item rows are absent.

- [ ] **Step 3: Add exact Green inventory rows**

Append these item rows to `coverage/green-book.json`, each with empty targets:

```json
{
  "sourceSection": "4.1",
  "sourceItem": "definitions-set-operations",
  "canonicalTopics": ["probability-foundations"],
  "state": "needs-review",
  "canonicalProblems": [],
  "canonicalKnowledge": []
}
```

Repeat the same shape for source items:

```text
coin-toss-game
card-game
drunk-passenger
n-points-on-a-circle
```

- [ ] **Step 4: Add exact Red inventory rows**

Append `needs-review` rows under `3.2.1`, all with `canonicalTopics: ["probability-foundations"]`, empty targets, for:

```text
3.16
3.18
3.24
3.25
```

Do not create rows for Q3.19, Q3.20, Q3.21, distribution questions, expectation questions, LLN/CLT, or stochastic-process questions.

- [ ] **Step 5: Add exact 150 inventory rows**

Add First Look Q6:

```json
{
  "sourceSection": "1",
  "sourceItem": "6",
  "canonicalTopics": ["probability-foundations"],
  "state": "needs-review",
  "canonicalProblems": [],
  "canonicalKnowledge": []
}
```

Add Brainteasers Q3 with the required override:

```json
{
  "sourceSection": "2.7",
  "sourceItem": "3",
  "canonicalTopics": ["probability-foundations"],
  "state": "needs-review",
  "canonicalProblems": [],
  "canonicalKnowledge": [],
  "topicOverrideReason": "Item-level mathematical identity is Probability Foundations even though the source editorial container is classified as brainteasers/discrete reasoning."
}
```

Do not create item rows for formal `2.6` / `3.6` questions during this workstream.

- [ ] **Step 6: Verify inventory GREEN**

```bash
node --test tests/quant-interview-probability-foundations-workstream.test.mjs
npm run test
npm run check
npm run build
```

Commit: `data: inventory probability foundations source items`.

---

### Task 3: Probability Spaces and Events Knowledge

**Files:** create `probability-spaces-events.md`; create content test.

**Interfaces:** produces source-derived event/set language used by later Problems; does not teach expectation theory.

- [ ] **Step 1: Create RED content test**

Create `tests/quant-interview-probability-foundations-content.test.mjs` with reusable helpers and this contract:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function findKnowledge(slug) {
  const files = await readdir('src/content/knowledge', { recursive: true });
  const match = files.find((file) => String(file).endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing knowledge ${slug}`);
  return `src/content/knowledge/${match}`;
}

async function findProblem(slug) {
  const files = await readdir('src/content/problems', { recursive: true });
  const match = files.find((file) => String(file).endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing problem ${slug}`);
  return `src/content/problems/${match}`;
}

test('probability spaces Knowledge owns source-derived event and set language', async () => {
  const file = await findKnowledge('probability-spaces-events');
  const text = await readFile(file, 'utf8');
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
  for (const pattern of [/sample space/i, /event/i, /union/i, /intersection/i, /complement/i, /mutually exclusive/i, /indicator/i]) {
    assert.match(text, pattern);
  }
  assert.match(text, /^## Interview Checks$/m);
  assert.doesNotMatch(text, /^## (?:Expectation|Conditional Probability|Bayes)/mi);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-probability-foundations-content.test.mjs
```

Expected: `probability-spaces-events` is missing.

- [ ] **Step 3: Create the Knowledge node**

Use this frontmatter exactly:

```markdown
---
title: Probability Spaces & Events
description: Outcomes, sample spaces, events, set operations, mutually exclusive events, and indicator encodings for interview probability problems.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-17
tags: [Probability, Sample Space, Events, Set Operations]
quantInterviewTopics: [probability-statistics, probability-foundations]
featured: false
related: [probability-axioms-derived-rules, symmetry-equiprobability-geometric-probability]
relatedNotes: []
---
```

Required body anchors and formulas:

```markdown
## Core idea
An outcome is one possible elementary result. A sample space `Omega` collects all outcomes. An event `A` is a subset of `Omega`.

## Event algebra
`A union B`, `A intersection B`, and `A^c` translate verbal probability statements into set operations.

## Mutually exclusive events
`A intersection B = emptyset`.

## Indicator encoding
`I_A(omega)=1` on `A` and `0` otherwise. Mention `E[I_A]=P(A)` only as a bridge; do not develop expectation theory.

## Interview Checks
- Translate “neither A nor B” into `(A union B)^c = A^c intersection B^c`.
- Explain why disjoint events can be added directly.
- Identify the event corresponding to “at least one success.”
```

Include a fair-die example for union/intersection/complement and distinguish an outcome from an event.

- [ ] **Step 4: Verify GREEN**

```bash
node --test tests/quant-interview-probability-foundations-content.test.mjs
npm run test
```

Commit: `feat: add probability spaces event knowledge`.

---

### Task 4: Probability Axioms and Derived Rules Knowledge

**Files:** create `probability-axioms-derived-rules.md`; extend content test.

**Interfaces:** produces the narrow canonical extension for axioms, complement/addition rules, and exclusivity-vs-independence; source rows may later point to this node only for genuine subsets of its content.

- [ ] **Step 1: Add RED assertions**

```js
test('probability axioms Knowledge derives event rules and distinguishes exclusivity from independence', async () => {
  const file = await findKnowledge('probability-axioms-derived-rules');
  const text = await readFile(file, 'utf8');
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
  assert.match(text, /P\(Omega\)\s*=\s*1/i);
  assert.match(text, /countable additivity|pairwise disjoint/i);
  assert.match(text, /P\(A\^c\)\s*=\s*1\s*-\s*P\(A\)/i);
  assert.match(text, /P\(A union B\).*P\(A intersection B\)/i);
  assert.match(text, /independent/i);
  assert.match(text, /mutually exclusive/i);
  assert.match(text, /positive probability/i);
  assert.match(text, /^## Interview Checks$/m);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-probability-foundations-content.test.mjs
```

Expected: `probability-axioms-derived-rules` is missing.

- [ ] **Step 3: Create the Knowledge node**

Frontmatter:

```markdown
---
title: Probability Axioms & Derived Rules
description: The probability axioms, complement and addition rules, monotonicity, De Morgan manipulations, and the distinction between disjointness and independence.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-17
tags: [Probability, Axioms, Independence, Event Algebra]
quantInterviewTopics: [probability-statistics, probability-foundations]
featured: false
related: [probability-spaces-events, symmetry-equiprobability-geometric-probability, conditioning]
relatedNotes: []
---
```

Required mathematical content:

```markdown
## Probability axioms
1. `P(A) >= 0`.
2. `P(Omega) = 1`.
3. For pairwise disjoint `A_1,A_2,...`, `P(union_i A_i) = sum_i P(A_i)`.

## Derived rules
`P(emptyset)=0`.
`P(A^c)=1-P(A)`.
If `A subseteq B`, then `P(A)<=P(B)`.
`P(A union B)=P(A)+P(B)-P(A intersection B)`.

## Mutually exclusive versus independent
Mutually exclusive means `A intersection B=emptyset`.
Independent means `P(A intersection B)=P(A)P(B)`.
If both events have positive probability and are mutually exclusive, then `0=P(A intersection B) != P(A)P(B)`, so they are not independent.
A degenerate zero-probability event can be both disjoint from and independent of another event.

## Interview Checks
- Derive the complement rule from the axioms.
- Derive the two-event addition rule.
- Explain why positive-probability disjoint events are dependent.
- Give a zero-probability degenerate coexistence example.
```

Do not add conditional-probability, Bayes, total-probability, total-expectation, or general inclusion-exclusion sections.

- [ ] **Step 4: Verify GREEN**

```bash
node --test tests/quant-interview-probability-foundations-content.test.mjs
npm run test
```

Commit: `feat: add probability axioms derived rules knowledge`.

---

### Task 5: Symmetry, Equiprobability, and Geometric Probability Knowledge

**Files:** create `symmetry-equiprobability-geometric-probability.md`; extend content test.

**Interfaces:** produces the reusable modeling technique used by five of the six Problems and preserves Red Q3.16 as a public self-test rather than a standalone Problem.

- [ ] **Step 1: Add RED assertions**

```js
test('symmetry geometric probability Knowledge unifies finite and continuous uniform models', async () => {
  const file = await findKnowledge('symmetry-equiprobability-geometric-probability');
  const text = await readFile(file, 'utf8');
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
  assert.match(text, /equiprobable/i);
  assert.match(text, /symmetry/i);
  assert.match(text, /tie/i);
  assert.match(text, /unit square|area/i);
  assert.match(text, /uniform in a disk|area-uniform/i);
  assert.match(text, /fourth business day|weekday/i);
  assert.match(text, /^## Interview Checks$/m);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-probability-foundations-content.test.mjs
```

Expected: the Knowledge node is missing.

- [ ] **Step 3: Create the Knowledge node**

Frontmatter:

```markdown
---
title: Symmetry, Equiprobability & Geometric Probability
description: A modeling toolkit for finite equiprobable spaces, exchangeability, tie-aware symmetry, and continuous uniform probability via geometric measure.
type: technique
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-17
tags: [Probability, Symmetry, Equiprobability, Geometric Probability]
quantInterviewTopics: [probability-statistics, probability-foundations]
featured: false
related: [probability-spaces-events, probability-axioms-derived-rules]
relatedNotes: []
---
```

Required body:

```markdown
## Finite equiprobable models
Use `favorable / total` only after justifying equal probabilities of elementary outcomes.

## Symmetry and tie states
When two labeled outcomes are exchangeable, symmetry can split the non-tie mass equally. If ties are possible, isolate them first.

## Continuous uniform geometry
A uniform point in a region is uniform with respect to the relevant measure. In a disk this is area, not radius. Two independent uniform arrival times become a uniform point in a square.

## Interview Checks
- A uniformly chosen starting weekday determines four consecutive business days. For which starts is the fourth business day Thursday?
- Explain why a card-rank comparison needs the tie event removed before a 50/50 symmetry claim.
- Explain why choosing `R~U[0,1]` does not produce an area-uniform point in a unit disk.
- Translate two independent `U[0,1]` arrival times into a point in the unit square.
```

Keep combinatorial formulas, permutations, combinations, and full inclusion-exclusion out of the page.

- [ ] **Step 4: Verify GREEN and Knowledge-first checkpoint**

```bash
node --test tests/quant-interview-probability-foundations-content.test.mjs
npm run test
npm run check
npm run build
```

Commit: `feat: add probability symmetry geometry knowledge`.

---

### Task 6: Cross-Book Deduplicated Symmetry Problem Families

**Files:** create the first three canonical Problems; extend content test.

**Interfaces:** produces one public identity for each Green/150 coin pair, Green/Red card pair, and Green/Red passenger pair.

- [ ] **Step 1: Add RED Problem contracts**

Add helper assertions:

```js
async function assertSourceNeutralSolvedProblem(slug, problemId) {
  const file = await findProblem(slug);
  const text = await readFile(file, 'utf8');
  assert.match(text, new RegExp(`^problemId:\\s*${problemId}$`, 'm'));
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
  assert.match(text, /^status:\s*solved$/m);
  assert.match(text, /^## Problem$/m);
  assert.match(text, /^## Think Before Revealing$/m);
  assert.match(text, /<summary>Show Solution<\/summary>/);
  assert.match(text, /^## Why This Problem Matters$/m);
  assert.match(text, /^## Common Mistakes$/m);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Questions|Q3\.\d+|First Look/i);
}
```

Then:

```js
test('extra coin comparison is one canonical source-neutral problem', async () => {
  await assertSourceNeutralSolvedProblem('more-heads-with-one-extra-coin', 'probability-foundations-001');
  const text = await readFile(await findProblem('more-heads-with-one-extra-coin'), 'utf8');
  assert.match(text, /2p\s*\+\s*q\s*=\s*1/i);
  assert.match(text, /p\s*\+\s*q\s*\/\s*2\s*=\s*1\s*\/\s*2/i);
});

test('higher card comparison removes ties before symmetry', async () => {
  await assertSourceNeutralSolvedProblem('higher-card-by-symmetry', 'probability-foundations-002');
  const text = await readFile(await findProblem('higher-card-by-symmetry'), 'utf8');
  assert.match(text, /3\s*\/\s*51/);
  assert.match(text, /8\s*\/\s*17/);
});

test('displaced passenger problem resolves through two special seats', async () => {
  await assertSourceNeutralSolvedProblem('drunk-passenger-last-seat', 'probability-foundations-003');
  const text = await readFile(await findProblem('drunk-passenger-last-seat'), 'utf8');
  assert.match(text, /seat 1|first passenger.?s seat/i);
  assert.match(text, /last passenger.?s seat|last seat/i);
  assert.match(text, /1\s*\/\s*2/);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-probability-foundations-content.test.mjs
```

Expected: all three Problem files are missing.

- [ ] **Step 3: Create `more-heads-with-one-extra-coin.md`**

Frontmatter:

```markdown
---
problemId: probability-foundations-001
title: More Heads with One Extra Coin
description: Use symmetry and a tie decomposition to compare n+1 fair coin tosses against n fair coin tosses without evaluating a binomial sum.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Probability Foundations, Symmetry]
tags: [Probability, Coins, Symmetry, Interview]
quantInterviewTopics: [probability-statistics, probability-foundations]
concepts: [symmetry-equiprobability-geometric-probability]
techniques: []
prerequisites: []
relatedProblems: []
family: extra-trial-symmetry
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---
```

Required solution core:

```markdown
Let `p=P(H_A>H_B)` and `q=P(H_A=H_B)` after comparing the first `n` tosses of each player. Symmetry gives `P(H_B>H_A)=p`, so `2p+q=1`.

On Alice's final toss, she already wins on the `p` mass. On the tie mass `q`, she wins exactly when the extra coin is heads, with probability `1/2`. Therefore

`P(Alice wins)=p+q/2=(2p+q)/2=1/2`.
```

Add a second method based on the heads/tails symmetry of Alice's `n+1` tosses, but keep it inside the same page.

- [ ] **Step 4: Create `higher-card-by-symmetry.md`**

Use `problemId: probability-foundations-002`. Required solution:

```markdown
After the first card is drawn, exactly three of the remaining 51 cards have the same rank, so
`P(tie)=3/51`.

The remaining mass `1-3/51=48/51` is split equally between first-higher and second-higher by label symmetry. Hence

`P(first rank is higher)=24/51=8/17`.
```

Common mistake: asserting `1/2` before removing ties.

- [ ] **Step 5: Create `drunk-passenger-last-seat.md`**

Use `problemId: probability-foundations-003`. Required solution:

```markdown
Track only two absorbing special seats: seat 1 and the last passenger's assigned seat. Choosing an intermediate occupied passenger's seat merely transfers the displacement and recreates the same state on a smaller set of passengers. Eventually one of the two special seats is selected first. By symmetry each is selected first with probability `1/2`, so the last passenger gets the assigned seat with probability `1/2`.
```

Include a small-state recursion or invariant interpretation as an extension, not a duplicate solution page.

- [ ] **Step 6: Verify GREEN**

```bash
node --test tests/quant-interview-probability-foundations-content.test.mjs
npm run test
```

Commit: `feat: add probability symmetry problem families`.

---

### Task 7: Geometric and Complement-Event Probability Problems

**Files:** create the remaining three Problems; extend content test.

**Interfaces:** completes the six public canonical Problems before hidden semantic rows become terminal.

- [ ] **Step 1: Add RED contracts**

```js
test('semicircle problem uses mutually exclusive candidate starts', async () => {
  await assertSourceNeutralSolvedProblem('random-points-in-a-semicircle', 'probability-foundations-004');
  const text = await readFile(await findProblem('random-points-in-a-semicircle'), 'utf8');
  assert.match(text, /N\s*\/\s*2\^?\(?N-1\)?|N\s*\/\s*2\s*\*\*/i);
  assert.match(text, /mutually exclusive|disjoint/i);
  assert.match(text, /N\s*x\^?\(?N-1\)?/i);
});

test('minimum trial problem uses complement and independence and returns 149', async () => {
  await assertSourceNeutralSolvedProblem('minimum-trials-for-at-least-one-hit', 'probability-foundations-005');
  const text = await readFile(await findProblem('minimum-trials-for-at-least-one-hit'), 'utf8');
  assert.match(text, /1\s*-\s*0\.98\^N/i);
  assert.match(text, /149/);
  assert.match(text, /independ/i);
});

test('meeting problem converts arrival times to unit-square geometry', async () => {
  await assertSourceNeutralSolvedProblem('romeo-juliet-meeting-probability', 'probability-foundations-006');
  const text = await readFile(await findProblem('romeo-juliet-meeting-probability'), 'utf8');
  assert.match(text, /\|x-y\|\s*<=\s*1\/4|\|x-y\|\s*≤\s*1\/4/);
  assert.match(text, /7\s*\/\s*16/);
  assert.match(text, /unit square/i);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-probability-foundations-content.test.mjs
```

Expected: the three files are missing.

- [ ] **Step 3: Create `random-points-in-a-semicircle.md`**

Use `problemId: probability-foundations-004`. Required mathematical core:

```markdown
For each sampled point `i`, let `A_i` be the event that the clockwise semicircle starting at `i` contains all other `N-1` points. For any fixed `i`,

`P(A_i)=(1/2)^(N-1)`.

Under continuous sampling, duplicated points and exact endpoint coincidences have probability zero. On the event that all points fit in a semicircle, exactly one sampled point is the clockwise starting point almost surely, so the `A_i` are disjoint on the relevant event. Therefore

`P(all N points lie in some semicircle)=sum_i P(A_i)=N/2^(N-1)`.

For an arc occupying fraction `x<=1/2`, the same argument gives `N x^(N-1)`.
```

- [ ] **Step 4: Create `minimum-trials-for-at-least-one-hit.md`**

Use `problemId: probability-foundations-005`. Required core:

```markdown
A single draw misses `[0.70,0.72]` with probability `0.98`. Independence gives

`P(all N miss)=0.98^N`.

Thus

`P(at least one hit)=1-0.98^N`.

Require `1-0.98^N>=0.95`, equivalently `0.98^N<=0.05`. Because `ln(0.98)<0`,

`N >= ln(0.05)/ln(0.98)`,

whose value lies strictly between 148 and 149. Therefore the smallest integer is `N=149`.
```

Explicitly explain that independence justifies multiplication while complement reasoning avoids a long union calculation.

- [ ] **Step 5: Create `romeo-juliet-meeting-probability.md`**

Use `problemId: probability-foundations-006`. Required core:

```markdown
Normalize the hour to `[0,1]`. Let `x,y` be independent uniform arrival times. They meet exactly when

`|x-y|<=1/4`.

The complement in the unit square consists of two right triangles, each with leg length `3/4`. Their total area is

`2*(1/2)*(3/4)^2=9/16`.

Hence the meeting probability is

`1-9/16=7/16`.
```

An extension may state the waiting-fraction formula `2w-w^2` for `0<=w<=1`.

- [ ] **Step 6: Verify GREEN and six-Problem checkpoint**

```bash
node --test tests/quant-interview-probability-foundations-content.test.mjs
npm run test
npm run check
npm run build
```

Commit: `feat: add probability foundations geometric problems`.

---

### Task 8: Semantic Closure, Dedup Decisions, and Mixed-Knowledge Provenance

**Files:** modify workstream test and three coverage ledgers.

**Interfaces:** converts the eleven `needs-review` rows into terminal semantic decisions now that every canonical target exists.

- [ ] **Step 1: Add exact semantic RED map**

```js
const semanticDecisions = {
  'green-book': {
    '4.1::definitions-set-operations': ['knowledge-only', [], ['probability-spaces-events']],
    '4.1::coin-toss-game': ['canonical-problem', ['more-heads-with-one-extra-coin'], ['symmetry-equiprobability-geometric-probability']],
    '4.1::card-game': ['canonical-problem', ['higher-card-by-symmetry'], ['symmetry-equiprobability-geometric-probability']],
    '4.1::drunk-passenger': ['canonical-problem', ['drunk-passenger-last-seat'], ['symmetry-equiprobability-geometric-probability']],
    '4.1::n-points-on-a-circle': ['canonical-problem', ['random-points-in-a-semicircle'], ['probability-spaces-events', 'symmetry-equiprobability-geometric-probability']],
  },
  'red-book': {
    '3.2.1::3.16': ['knowledge-only', [], ['symmetry-equiprobability-geometric-probability']],
    '3.2.1::3.18': ['merged-duplicate', ['higher-card-by-symmetry'], ['symmetry-equiprobability-geometric-probability']],
    '3.2.1::3.24': ['canonical-problem', ['romeo-juliet-meeting-probability'], ['symmetry-equiprobability-geometric-probability']],
    '3.2.1::3.25': ['merged-duplicate', ['drunk-passenger-last-seat'], ['symmetry-equiprobability-geometric-probability']],
  },
  '150-most-frequently-asked': {
    '1::6': ['canonical-problem', ['minimum-trials-for-at-least-one-hit'], ['probability-axioms-derived-rules']],
    '2.7::3': ['merged-duplicate', ['more-heads-with-one-extra-coin'], ['symmetry-equiprobability-geometric-probability']],
  },
};

test('probability foundations semantic decisions converge across sources', async () => {
  for (const [source, expected] of Object.entries(semanticDecisions)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [key, [state, problems, knowledge]] of Object.entries(expected)) {
      const entry = byKey.get(key);
      assert.ok(entry, `missing ${source} ${key}`);
      assert.equal(entry.state, state, `${source} ${key} wrong state`);
      assert.deepEqual(entry.canonicalProblems, problems, `${source} ${key} wrong problem targets`);
      assert.deepEqual(entry.canonicalKnowledge, knowledge, `${source} ${key} wrong knowledge targets`);
      assert.match(entry.resolutionNote ?? '', /\S/, `${source} ${key} missing resolution note`);
    }
  }
});
```

Add mixed-Knowledge provenance contract:

```js
test('150 First Look Q6 contributes only complement and repeated-independence reasoning to the mixed Knowledge node', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  const entry = ledger.entries.find((item) => item.sourceSection === '1' && item.sourceItem === '6');
  assert.deepEqual(entry?.canonicalKnowledge, ['probability-axioms-derived-rules']);
  assert.match(entry?.resolutionNote ?? '', /complement/i);
  assert.match(entry?.resolutionNote ?? '', /independ/i);
  assert.match(entry?.resolutionNote ?? '', /does not source|not source|not support/i);
  assert.match(entry?.resolutionNote ?? '', /Kolmogorov|axiom/i);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/quant-interview-probability-foundations-workstream.test.mjs
```

Expected: rows still have `needs-review` state.

- [ ] **Step 3: Terminalize Green rows**

Use the exact semantic map above and these resolution-note meanings:

```text
definitions-set-operations: source-derived event/set definitions become public Knowledge and Interview Checks.
coin-toss-game: primary source instance of the extra-coin symmetry family.
card-game: primary source instance of the tie-aware rank-symmetry family.
drunk-passenger: primary source instance of the displaced-passenger symmetry family.
n-points-on-a-circle: distinct semicircle event-partition problem using event algebra and geometric symmetry.
```

- [ ] **Step 4: Terminalize Red rows**

Use:

```text
3.16: knowledge-only equiprobable weekday-modeling self-test; no standalone S3+ Problem.
3.18: merged duplicate of higher-card-by-symmetry; adds the same tie/non-tie symmetry route.
3.24: distinct geometric-probability canonical Problem.
3.25: merged duplicate of drunk-passenger-last-seat; wording differs but state process is identical.
```

- [ ] **Step 5: Terminalize 150 rows with provenance firewall**

For `1::6`, use a resolution note equivalent in meaning to this exact sentence:

```text
This source item contributes complement-event and repeated-independence reasoning to the mixed canonical Knowledge node; it does not source or support the repository-authored Kolmogorov-axiom extension.
```

For `2.7::3`, keep the existing topic override reason and use a resolution note stating that the item is a merged duplicate of `more-heads-with-one-extra-coin` with an alternative symmetry derivation.

- [ ] **Step 6: Verify terminal semantic GREEN with real targets**

Add a helper:

```js
async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(files.filter((file) => String(file).endsWith('.md')).map((file) => path.basename(String(file), '.md')));
}
```

Then validate all three ledgers with `allowUnresolvedCanonicalRefs: false` for the current repository slugs.

Run:

```bash
node --test tests/quant-interview-probability-foundations-workstream.test.mjs
npm run test
npm run check
npm run build
```

Commit: `data: close probability foundations semantic mappings`.

---

### Task 9: Boundary Regression, Source-Neutral Corpus Contract, and Extension Firewall

**Files:** create boundary test; modify source-neutral test.

**Interfaces:** freezes the public/private boundary and updates the current source-neutral corpus to 24 Problems / 24 Knowledge-Technique nodes.

- [ ] **Step 1: Create boundary RED test**

Create `tests/quant-interview-probability-foundations-boundary.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const newKnowledge = [
  'probability-spaces-events',
  'probability-axioms-derived-rules',
  'symmetry-equiprobability-geometric-probability',
];
const newProblems = [
  'more-heads-with-one-extra-coin',
  'higher-card-by-symmetry',
  'drunk-passenger-last-seat',
  'random-points-in-a-semicircle',
  'minimum-trials-for-at-least-one-hit',
  'romeo-juliet-meeting-probability',
];

async function findMarkdown(root, slug) {
  const files = await readdir(root, { recursive: true });
  const match = files.find((file) => String(file).endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing ${slug}`);
  return `${root}/${match}`;
}

async function readPublicTree(root) {
  const files = await readdir(root, { recursive: true });
  const readable = files.filter((file) => /\.(?:astro|js|mjs|ts|tsx|jsx)$/.test(String(file)));
  return (await Promise.all(readable.map((file) => readFile(`${root}/${file}`, 'utf8')))).join('\n');
}

test('probability foundations content stays inside the bounded canonical topic', async () => {
  for (const slug of newKnowledge) {
    const text = await readFile(await findMarkdown('src/content/knowledge', slug), 'utf8');
    assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
    assert.doesNotMatch(text, /^## (?:Bayes|Conditional Probability|Law of Total Probability|Law of Total Expectation|Expectation|Variance|Central Limit Theorem|Law of Large Numbers)/mi);
  }
  for (const slug of newProblems) {
    const text = await readFile(await findMarkdown('src/content/problems', slug), 'utf8');
    assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
  }
});

test('conditioning remains owned by conditional probability and Bayes', async () => {
  const text = await readFile('src/content/knowledge/concepts/conditioning.md', 'utf8');
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, conditional-probability-bayes\]$/m);
  assert.doesNotMatch(text, /probability-foundations/);
});

test('canonical extension audit metadata is not a public rendering dependency', async () => {
  const publicText = `${await readPublicTree('src/pages')}\n${await readPublicTree('src/layouts')}`;
  assert.doesNotMatch(publicText, /canonicalExtensions/);
  assert.doesNotMatch(publicText, /probability-statistics-probability-foundations-005\.json/);
  assert.doesNotMatch(publicText, /data\/quant-interview\/workstreams/);
});
```

- [ ] **Step 2: Run the boundary test**

```bash
node --test tests/quant-interview-probability-foundations-boundary.test.mjs
```

Expected: if all bounded content is correct, the new boundary test may already pass; the intentional RED for this task comes from the global source-neutral list not yet containing the nine new slugs.

- [ ] **Step 3: Extend `quant-interview-source-neutral-content.test.mjs`**

Append these Problem slugs to `currentProblemSlugs`:

```js
'more-heads-with-one-extra-coin',
'higher-card-by-symmetry',
'drunk-passenger-last-seat',
'random-points-in-a-semicircle',
'minimum-trials-for-at-least-one-hit',
'romeo-juliet-meeting-probability',
```

Append exact Knowledge topics:

```js
['probability-spaces-events', ['probability-statistics', 'probability-foundations']],
['probability-axioms-derived-rules', ['probability-statistics', 'probability-foundations']],
['symmetry-equiprobability-geometric-probability', ['probability-statistics', 'probability-foundations']],
```

Also extend the 150 hidden-coverage audit expected map with:

```js
['1::6', 'minimum-trials-for-at-least-one-hit'],
```

Do not add `2.7::3` to a `canonical-problem`-only assertion because it is intentionally `merged-duplicate`.

- [ ] **Step 4: Verify full global regression**

```bash
node --test tests/quant-interview-probability-foundations-boundary.test.mjs
node --test tests/quant-interview-source-neutral-content.test.mjs
npm run test
npm run check
npm run build
```

Commit: `test: lock probability foundations public boundaries`.

---

### Task 10: Completion RED Gate and Real Verification Metadata

**Files:** extend workstream test; modify workstream JSON only.

**Interfaces:** closes the workstream only after terminal coverage, real canonical refs, visible Interview Checks, source-boundary audit, and extension provenance constraints all hold.

- [ ] **Step 1: Add completion RED tests**

Add:

```js
test('all claimed probability foundations rows are terminal and resolve to real canonical slugs', async () => {
  const terminal = new Set(['canonical-problem', 'merged-duplicate', 'variant', 'knowledge-only', 'interview-guidance', 'non-content-frontmatter']);
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');

  for (const [source, keys] of Object.entries(sourceInventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      assert.ok(terminal.has(byKey.get(`${section}::${item}`)?.state), `${source} ${section} ${item} is not terminal`);
    }
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      sourceTopicMap,
      taxonomy,
      problemSlugs,
      knowledgeSlugs,
      allowUnresolvedCanonicalRefs: false,
    }));
  }
});

test('knowledge-only foundations source material remains visible through Interview Checks', async () => {
  for (const slug of ['probability-spaces-events', 'symmetry-equiprobability-geometric-probability']) {
    const files = await readdir('src/content/knowledge', { recursive: true });
    const match = files.find((file) => String(file).endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
    assert.ok(match);
    const text = await readFile(`src/content/knowledge/${match}`, 'utf8');
    assert.match(text, /^## Interview Checks$/m);
  }
});

test('probability foundations workstream closes only after every completion invariant holds', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  const red = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  const q150 = workstream.sourceScopes.find((scope) => scope.source === '150-most-frequently-asked');
  assert.match(red?.reviewNote ?? '', /later canonical topics/i);
  assert.match(q150?.reviewNote ?? '', /later canonical topics/i);
});
```

- [ ] **Step 2: Run completion RED**

```bash
node --test tests/quant-interview-probability-foundations-workstream.test.mjs
```

Expected: every invariant passes except `status`, which is still `active`.

- [ ] **Step 3: Change only the status to `complete`**

In the workstream JSON change:

```json
"status": "active"
```

to:

```json
"status": "complete"
```

Do not add verification metadata yet.

- [ ] **Step 4: Run the content-complete full gate**

```bash
npm run test
npm run check
npm run build
```

Commit the status/content-complete tree with message `chore: close probability foundations workstream`. Wait for the branch CI run for that exact commit to finish successfully.

- [ ] **Step 5: Record only real verification evidence**

After the successful run exists:

1. fetch the exact content-complete commit SHA from the branch;
2. fetch the exact successful GitHub Actions run ID for that commit;
3. update the workstream JSON with a `verification` object containing that exact SHA, exact run ID, commands `npm run test`, `npm run check`, `npm run build`, and conclusion `success`;
4. do not alter source scope, canonical extensions, coverage decisions, Knowledge, or Problems in the verification-metadata commit.

Commit: `chore: record probability foundations verification`.

---

### Task 11: Durable Handoff, Final Full Verification, Diff Review, and CI Cleanup

**Files:** modify Handoff test and Handoff; remove branch-only CI only after final business verification.

**Interfaces:** advances durable repository memory from completed Linear Algebra into completed Probability Foundations and names Combinatorial Probability as the next bounded cross-book topic.

- [ ] **Step 1: Make Handoff RED**

Modify `tests/quant-interview-handoff.test.mjs` so the Handoff contract requires:

```text
probability-statistics-probability-foundations-005
more-heads-with-one-extra-coin
higher-card-by-symmetry
drunk-passenger-last-seat
random-points-in-a-semicircle
minimum-trials-for-at-least-one-hit
romeo-juliet-meeting-probability
probability-spaces-events
probability-axioms-derived-rules
symmetry-equiprobability-geometric-probability
24 canonical Problems
24 explicitly topic-classified Knowledge / Technique nodes
Probability & Statistics → Combinatorial Probability
```

Require the actual verification commit SHA and run ID written in Task 10 rather than invented values.

Run:

```bash
node --test tests/quant-interview-handoff.test.mjs
```

Expected: failure because durable Handoff still ends at Probability Foundations as the next action.

- [ ] **Step 2: Update `docs/quant-interview/HANDOFF.md`**

Add a fifth completed workstream section with:

```markdown
## Completed cross-book workstream 5

`probability-statistics-probability-foundations-005`

Canonical scope:
- **Probability & Statistics**
- **Probability Foundations**
```

Record the real content-complete verification evidence from Task 10, the three Knowledge nodes, six Problems, exact cross-book duplicate families, item-level `2.7::3` override, mixed Knowledge provenance note for 150 Q6, and the rule that reviewed later-topic material was not falsely closed.

Update corpus state to:

```text
24 canonical Problems
24 explicitly topic-classified Knowledge / Technique nodes
```

State that these are repository-record counts, not whole-book completeness percentages.

Set Next action to:

```text
Probability & Statistics → Combinatorial Probability
```

- [ ] **Step 3: Run final fresh business verification**

```bash
npm run test
npm run check
npm run build
```

Wait for the branch CI run on the Handoff/business commit to finish with all three steps successful.

- [ ] **Step 4: Review the topic-only diff**

Compare the feature branch against `chatgpt/quant-interview-topic-first-fusion-design-2026-08-16` and require the business diff to be limited to:

```text
docs/quant-interview/HANDOFF.md
docs/superpowers/specs/2026-08-17-quant-interview-probability-foundations-design.md
docs/superpowers/plans/2026-08-17-quant-interview-probability-foundations.md
src/content/knowledge/concepts/probability-spaces-events.md
src/content/knowledge/concepts/probability-axioms-derived-rules.md
src/content/knowledge/concepts/symmetry-equiprobability-geometric-probability.md
src/content/problems/probability/more-heads-with-one-extra-coin.md
src/content/problems/probability/higher-card-by-symmetry.md
src/content/problems/probability/drunk-passenger-last-seat.md
src/content/problems/probability/random-points-in-a-semicircle.md
src/content/problems/probability/minimum-trials-for-at-least-one-hit.md
src/content/problems/probability/romeo-juliet-meeting-probability.md
src/data/quant-interview/coverage/green-book.json
src/data/quant-interview/coverage/red-book.json
src/data/quant-interview/coverage/150-most-frequently-asked.json
src/data/quant-interview/workstreams/probability-statistics-probability-foundations-005.json
tests/quant-interview-probability-foundations-workstream.test.mjs
tests/quant-interview-probability-foundations-content.test.mjs
tests/quant-interview-probability-foundations-boundary.test.mjs
tests/quant-interview-source-neutral-content.test.mjs
tests/quant-interview-handoff.test.mjs
```

The temporary branch CI may still appear at this point. No taxonomy, source-topic map, public page/layout, unrelated Knowledge, unrelated Problem, or coverage-state infrastructure change is acceptable without a test-proven reason.

- [ ] **Step 5: Delete the branch-only CI workflow**

Delete `.github/workflows/quant-interview-probability-foundations-ci.yml` only after Step 3 has a successful fresh run.

Compare the final business commit against the final feature-branch HEAD and require the only net change to be removal of that temporary workflow.

- [ ] **Step 6: Invoke branch-finishing workflow**

Use `superpowers:finishing-a-development-branch` and present the standard three-option menu against base branch `chatgpt/quant-interview-topic-first-fusion-design-2026-08-16`.

---

## Final Requirement Checklist

Before presenting the branch-finishing menu, verify every item below directly from the repository and fresh CI evidence:

- [ ] Three Knowledge nodes exist with exact `probability-foundations` topic assignment and visible Interview Checks.
- [ ] Six canonical Problems exist with ids `probability-foundations-001` through `probability-foundations-006` and S3+ structure.
- [ ] All eleven claimed source item rows are terminal with nonempty resolution notes.
- [ ] Three cross-book duplicate families resolve to one public Problem each.
- [ ] Red Q3.16 remains a Knowledge self-test rather than a low-value duplicate Problem.
- [ ] 150 `2.7::3` has a valid item-level topic override reason.
- [ ] 150 `1::6` resolution note limits provenance to complement + repeated independence and explicitly rejects source support for the Kolmogorov-axiom extension.
- [ ] No formal 150 Probability/Stochastic Calculus later-topic question is falsely closed as Probability Foundations.
- [ ] `conditioning` remains assigned only to `conditional-probability-bayes`.
- [ ] No new deferred coverage state exists.
- [ ] Public pages/layouts do not depend on workstream audit metadata.
- [ ] Source-neutral regression covers exactly 24 current Problems and 24 current Knowledge / Technique nodes if no unrelated corpus change occurred.
- [ ] Workstream status is `complete` and contains only real verification evidence.
- [ ] Final fresh `npm run test`, `npm run check`, and `npm run build` all pass.
- [ ] Topic-only diff contains no unrelated taxonomy, UI, source-map, or infrastructure changes.
- [ ] Temporary branch CI is removed after successful final business verification.
