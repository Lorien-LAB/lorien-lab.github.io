# Quant Interview Conditional Probability & Bayes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the bounded `Probability & Statistics -> Conditional Probability & Bayes` cross-book workstream by fusing all three verified interview sources into an expanded canonical conditioning layer, a reusable Bayes/base-rate Knowledge node, and six source-neutral canonical Problems.

**Architecture:** Preserve the existing Topic-first public model. Public content is authored Knowledge-first, while source books, item numbers, physical evidence pages, topic overrides, and semantic-dedup decisions remain internal in workstream and coverage JSON. Reuse the existing `conditioning` slug, create only one new Knowledge node (`bayes-rule-base-rates`), merge mathematically identical source families, and keep adjacent distribution, expectation, order-statistic, and stochastic-process material outside this bounded topic.

**Tech Stack:** Astro content collections, Markdown/YAML frontmatter, JSON source/workstream/coverage data, JavaScript ES modules, Node.js built-in test runner, GitHub Actions, npm.

## Global Constraints

- Base branch: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`.
- Work branch: `chatgpt/quant-interview-workstream-conditional-probability-bayes-2026-08-17`.
- Workstream id: `probability-statistics-conditional-probability-bayes-007`.
- Canonical topics: `probability-statistics`, `conditional-probability-bayes`.
- Existing `conditioning` Knowledge must be expanded in place; do not create a second conditioning concept.
- New Knowledge slug: `bayes-rule-base-rates`.
- Existing repository-authored `conditional-dice-expectation` remains cross-topic content and must not be reclassified as source-derived evidence.
- Green reviewed source scope: section `4.3`, physical PDF pages `88-102`.
- Green direct claimed semantic units: definitions/chain rule/total probability/Bayes, `boys-and-girls`, `unfair-coin`, `monty-hall`, `candies-in-a-jar`, `russian-roulette-series`.
- Green reviewed but excluded from this topic: `all-girl-world`, `fair-probability-from-unfair-coin`, `dart-game`, `birthday-line`, `dice-order`, `amoeba-population`, `coin-toss-game`, `aces`, `gamblers-ruin`, `basketball-scores`, `cars-on-road`.
- Red reviewed source scope: `3.2.1`; question evidence pages `93-94`; solution evidence pages `107-113`.
- Red direct claimed items: `3.10`, `3.11`, `3.14`, `3.15`, `3.17`.
- Red Q3.11 is a prior/model-ambiguity item: it enriches Knowledge and the hidden-coin family but does not create another public Problem.
- Red Q3.15 named-child language must not be copied mechanically; public treatment must state the information-generation/naming protocol before calculating.
- 150 Questions reviewed source scopes: `2.6` and `2.7`; question boundary evidence pages `40-44`; Probability/Stochastic Calculus solution boundary pages `134-150`; Brainteasers Q2 solution pages `176-177`.
- 150 direct claimed item: `2.7::2` (golden-face latent-object inference), requiring an explicit item-level topic override because editorial section `2.7` is Brainteasers.
- 150 `2.6::5` (joint-normal conditional probability) is explicitly reviewed but remains for `random-variables-distributions`; do not close it as Conditional Probability & Bayes coverage.
- Do not absorb random-variable/distribution catalogues, transformations, joint-normal theory, expectation/variance theory, order statistics, branching processes, random walks, martingales, Brownian motion, stochastic calculus, or algorithmic unbiased-extraction problems.
- Public Problem/Knowledge frontmatter, prose, routes, titles, descriptions, and public IDs must remain source-neutral.
- Semantic deduplication is by mathematical reasoning identity, not wording similarity or shared formulas.
- Every claimed source row must be terminal with a nonempty `resolutionNote` and real canonical target(s).
- `knowledge-only` is terminal only when the corresponding interview test remains visible in `## Interview Checks`.
- Every new canonical Problem is S3+: Problem, progressive hints, full solution, why it matters, common mistakes, extensions/variants.
- Verification gates: `npm run test`, `npm run check`, `npm run build`, then topic-only diff review against the Combinatorial Probability base branch.

## File Structure Map

### Create

- `src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json`
  - Registers the bounded three-source review scope, review notes, status, and final verification evidence.
- `src/content/knowledge/concepts/bayes-rule-base-rates.md`
  - Owns Bayes, priors, likelihoods, evidence, posterior odds, base-rate effects, and prior-model ambiguity.
- `src/content/problems/probability/hidden-coin-posterior-after-heads.md`
- `src/content/problems/probability/two-children-information-protocol.md`
- `src/content/problems/probability/monty-hall-switching.md`
- `src/content/problems/probability/russian-roulette-after-survival.md`
- `src/content/problems/probability/candies-last-color-ordering.md`
- `src/content/problems/probability/golden-face-posterior.md`
- `tests/quant-interview-conditional-probability-bayes-workstream.test.mjs`
  - Registration, item-level inventory, semantic merge, terminal coverage, and source-boundary contracts.
- `tests/quant-interview-conditional-probability-bayes-content.test.mjs`
  - Knowledge and six-Problem mathematical/content contracts.
- `tests/quant-interview-conditional-probability-bayes-completion.test.mjs`
  - Final status, real CI evidence, corpus counts, and HANDOFF-next-topic gate.
- `.github/workflows/quant-interview-conditional-probability-bayes-ci.yml`
  - Temporary branch-only verification workflow; delete before final handoff.

### Modify

- `src/content/knowledge/concepts/conditioning.md`
  - Expand the existing short concept into the canonical conditional-probability foundation.
- `src/data/quant-interview/coverage/green-book.json`
  - Add six item-level terminal rows for the claimed Green definitions/problem families.
- `src/data/quant-interview/coverage/red-book.json`
  - Add five item-level terminal rows and semantic merge/knowledge-only decisions.
- `src/data/quant-interview/coverage/150-most-frequently-asked.json`
  - Add the Q2 topic-override row only; do not falsely terminalize reviewed out-of-scope 2.6 material.
- `tests/quant-interview-source-neutral-content.test.mjs`
  - Extend the current corpus regression from 30 Problems / 27 Knowledge to the actual post-workstream inventory; expected planning state is 36 / 28.
- `tests/quant-interview-handoff.test.mjs`
  - Require the seventh completed workstream and next action `Random Variables & Distributions`.
- `docs/quant-interview/HANDOFF.md`
  - Record workstream 7, outputs, semantic merges, item-level boundary decisions, final counts, real verification evidence, and next action.

## Canonical Outputs

### Knowledge

1. Expanded `conditioning`
   - conditional probability as a changed/restricted probability space;
   - multiplication rule and chain rule;
   - partitions and law of total probability;
   - independence boundary;
   - observation/information protocol;
   - first-step conditioning as a method without swallowing stochastic-process topics;
   - `Interview Checks` for event reconstruction, two-child information, total probability, and model sufficiency.
2. New `bayes-rule-base-rates`
   - prior, likelihood, evidence, posterior;
   - Bayes rule and posterior odds;
   - likelihood ratios and repeated independent evidence;
   - base-rate neglect;
   - prior/model ambiguity;
   - latent-object inference and selection-biased evidence;
   - `Interview Checks` including double-headed coin, diagnostic/base-rate reasoning, `P(A|B)` vs `P(B|A)`, and missing-prior diagnosis.

### Problems

1. `hidden-coin-posterior-after-heads` — `conditional-probability-bayes-001`
2. `two-children-information-protocol` — `conditional-probability-bayes-002`
3. `monty-hall-switching` — `conditional-probability-bayes-003`
4. `russian-roulette-after-survival` — `conditional-probability-bayes-004`
5. `candies-last-color-ordering` — `conditional-probability-bayes-005`
6. `golden-face-posterior` — `conditional-probability-bayes-006`

All six use source-neutral frontmatter with:

```yaml
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
quantInterviewTopics: [probability-statistics, conditional-probability-bayes]
status: solved
featured: false
```

Recommended canonical Knowledge links:

```yaml
# hidden coin
concepts: [conditioning, bayes-rule-base-rates]

# two children / Monty / roulette / candies
concepts: [conditioning]

# golden face
concepts: [conditioning, bayes-rule-base-rates]
```

Every body contains, in order:

```text
## Problem
## Think Before Revealing
<details><summary>Hint 1</summary></details>
<details><summary>Hint 2</summary></details>
<details><summary>Show Solution</summary>
## Solution
## Why This Problem Matters
## Common Mistakes
## Extensions & Variants
</details>
```

## Source Inventory and Semantic Decisions

### Green

- `4.3::definitions-conditional-probability-bayes`
  - `knowledge-only`
  - Knowledge: `conditioning`, `bayes-rule-base-rates`
- `4.3::boys-and-girls`
  - `canonical-problem`
  - Problem: `two-children-information-protocol`
  - Knowledge: `conditioning`
- `4.3::unfair-coin`
  - `canonical-problem`
  - Problem: `hidden-coin-posterior-after-heads`
  - Knowledge: `conditioning`, `bayes-rule-base-rates`
- `4.3::monty-hall`
  - `canonical-problem`
  - Problem: `monty-hall-switching`
  - Knowledge: `conditioning`
- `4.3::candies-in-a-jar`
  - `canonical-problem`
  - Problem: `candies-last-color-ordering`
  - Knowledge: `conditioning`
- `4.3::russian-roulette-series`
  - `canonical-problem`
  - Problem: `russian-roulette-after-survival`
  - Knowledge: `conditioning`

### Red

- `3.2.1::3.10`
  - `merged-duplicate`
  - Problem: `hidden-coin-posterior-after-heads`
  - Knowledge: `conditioning`, `bayes-rule-base-rates`
- `3.2.1::3.11`
  - `knowledge-only`
  - Knowledge: `bayes-rule-base-rates`, `conditioning`
  - Public visibility: missing-prior / repeated-heads `Interview Check`.
- `3.2.1::3.14`
  - `merged-duplicate`
  - Problem: `two-children-information-protocol`
  - Knowledge: `conditioning`
- `3.2.1::3.15`
  - `variant`
  - Problem: `two-children-information-protocol`
  - Knowledge: `conditioning`
  - Resolution note must explicitly state that named-child claims require a declared naming/observation protocol and that the canonical page corrects this modeling ambiguity instead of copying a source shortcut.
- `3.2.1::3.17`
  - `merged-duplicate`
  - Problem: `russian-roulette-after-survival`
  - Knowledge: `conditioning`

### 150 Questions

- `2.7::2`
  - `canonical-problem`
  - Problem: `golden-face-posterior`
  - Knowledge: `conditioning`, `bayes-rule-base-rates`
  - `topicOverrideReason` required: mathematical identity is conditional/Bayesian latent-object inference despite the Brainteasers editorial container.

Do not add a terminal row for `2.6::5` in this workstream. It is boundary-reviewed and explicitly reserved for `random-variables-distributions` because the main reasoning load is joint-normal structure/transformation.

## Mathematical Contracts

### Hidden coin posterior

For prior `π` that the selected coin is double-headed, otherwise fair, and `n` consecutive observed heads:

```text
P(D | H^n)
= π / [π + (1-π) 2^{-n}].
```

Required numerical checks:

- `π=1/10`, `n=3` -> `8/17`.
- `π=1/1000`, `n=10` -> `1024/2023` (approximately `0.506`).
- Without a prior/model class, a long run of heads does not define a unique Bayesian posterior.

### Two-child information protocols

Under iid boy/girl probability `1/2`:

```text
P(BB | at least one B) = 1/3.
P(BB | eldest is B) = 1/2.
P(BB | a uniformly selected observed child is B) = 1/2.
```

A named-child statement is not uniquely answerable without specifying name frequency, independence assumptions, and how the information was generated.

### Monty Hall

Under the standard host policy (host knows the prize location, always opens an unchosen losing door, and always offers a switch):

```text
P(win by staying) = 1/3.
P(win by switching) = 2/3.
```

The page must distinguish this from a random uninformed door opening.

### Russian roulette after survival

Two adjacent bullets among six chambers, initial random spin, opponent survives the first trigger:

```text
P(loss if spin again) = 2/6 = 1/3.
P(loss if do not spin) = 1/4.
```

Reason: conditional on survival, the current chamber is one of four empty chambers; exactly one of those four empty positions is immediately before the adjacent bullet block.

### Candies last-color ordering

For 10 red, 20 blue, 30 green candies removed uniformly without replacement, probability that at least one blue and at least one green remain when the last red is removed:

```text
P(T_r < T_b and T_r < T_g)
= P(T_r < T_b < T_g) + P(T_r < T_g < T_b)
= (30/60)(20/30) + (20/60)(30/40)
= 7/12.
```

### Golden face posterior

Three two-sided objects: `GG`, `GB`, `BB`; choose an object uniformly, observe a uniformly selected visible side, and condition on observing `G`:

```text
P(object is GG | observed G) = 2/3.
```

Equivalent visible-face count: among the three golden faces that could generate the observation, two belong to `GG`.

## Tasks

### Task 1: Register the bounded workstream and establish branch CI

**Files:**
- Create: `.github/workflows/quant-interview-conditional-probability-bayes-ci.yml`
- Create: `tests/quant-interview-conditional-probability-bayes-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json`

**Interfaces:**
- Consumes: existing `validateTopicWorkstream(workstream, context)` from `src/lib/quantInterviewWorkstreams.mjs`.
- Produces: one active workstream record used by later coverage/completion tests.

- [ ] **Step 1: Add temporary branch-only CI**

Create a workflow that runs exactly:

```yaml
name: Quant Interview Conditional Probability Bayes CI
on:
  push:
    branches:
      - chatgpt/quant-interview-workstream-conditional-probability-bayes-2026-08-17
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

- [ ] **Step 2: Verify inherited branch baseline is green**

Run through GitHub Actions before adding any RED test.

Expected: `npm run test`, `npm run check`, `npm run build` all succeed on the branch inherited from completed Combinatorial Probability.

- [ ] **Step 3: Write RED registration tests**

Add the following contract shape to `tests/quant-interview-conditional-probability-bayes-workstream.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json';

test('seventh cross-book workstream is bounded to conditional probability and Bayes', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'probability-statistics-conditional-probability-bayes-007');
  assert.deepEqual(workstream.canonicalTopics, ['probability-statistics', 'conditional-probability-bayes']);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
  assert.equal(workstream.status, 'active');
});
```

Add source-boundary assertions:

```js
assert.deepEqual(green.sourceSections, ['4.3']);
assert.deepEqual(green.evidencePageRanges, [{ startPage: 88, endPage: 102 }]);
assert.match(green.reviewNote, /boys-and-girls/i);
assert.match(green.reviewNote, /amoeba|gambler|random walk/i);

assert.deepEqual(red.sourceSections, ['3.2.1']);
assert.deepEqual(red.evidencePageRanges, [
  { startPage: 93, endPage: 94 },
  { startPage: 107, endPage: 113 },
]);
assert.match(red.reviewNote, /3\.10/);
assert.match(red.reviewNote, /3\.15/);
assert.match(red.reviewNote, /observation|protocol|named/i);

assert.deepEqual(q150.sourceSections, ['2.6', '2.7']);
assert.deepEqual(q150.evidencePageRanges, [
  { startPage: 40, endPage: 44 },
  { startPage: 134, endPage: 150 },
  { startPage: 176, endPage: 177 },
]);
assert.match(q150.reviewNote, /Q2|question 2/i);
assert.match(q150.reviewNote, /joint-normal|joint normal/i);
```

- [ ] **Step 4: Run RED**

Run: `npm run test`.

Expected: only the new registration tests fail because the workstream JSON does not yet exist; inherited tests remain green.

- [ ] **Step 5: Add minimal active workstream JSON**

Create the workstream record with the exact id/topics/scopes/evidence ranges above and `reviewOutcome: "bounded-item-level-review"` for each source. The review notes must enumerate the claimed items and explicit exclusions from the Global Constraints.

- [ ] **Step 6: Validate registration GREEN**

Add a test that imports `validateTopicWorkstream` and asserts `doesNotThrow` using existing taxonomy, source-topic-map, and all three manifests.

Run: `npm run test && npm run check && npm run build`.

Expected: all three commands succeed.

- [ ] **Step 7: Commit Task 1**

```bash
git add .github/workflows/quant-interview-conditional-probability-bayes-ci.yml \
  tests/quant-interview-conditional-probability-bayes-workstream.test.mjs \
  src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json
git commit -m "feat: register conditional probability bayes workstream"
```

### Task 2: Build Knowledge first

**Files:**
- Create: `tests/quant-interview-conditional-probability-bayes-content.test.mjs`
- Modify: `src/content/knowledge/concepts/conditioning.md`
- Create: `src/content/knowledge/concepts/bayes-rule-base-rates.md`

**Interfaces:**
- Produces: `conditioning` and `bayes-rule-base-rates` slugs referenced by all later Problems and hidden coverage rows.

- [ ] **Step 1: Write RED contract for expanded `conditioning`**

Test exact topic ownership and core formula/method language:

```js
const conditioning = await readFile('src/content/knowledge/concepts/conditioning.md', 'utf8');
assert.match(conditioning, /^quantInterviewTopics:\s*\[probability-statistics, conditional-probability-bayes\]$/m);
assert.match(conditioning, /P\(A\s*\|\s*B\)/);
assert.match(conditioning, /P\(A.*B\).*P\(B\).*P\(A\s*\|\s*B\)/s);
assert.match(conditioning, /law of total probability/i);
assert.match(conditioning, /chain rule/i);
assert.match(conditioning, /observation protocol|information protocol/i);
assert.match(conditioning, /^## Interview Checks$/m);
assert.match(conditioning, /at least one child/i);
assert.match(conditioning, /randomly observed child/i);
```

- [ ] **Step 2: Run RED**

Run: `npm run test`.

Expected: new `conditioning` content assertions fail; existing corpus remains green.

- [ ] **Step 3: Expand `conditioning` minimally to satisfy the contract**

Keep the existing slug/frontmatter. Add sections covering:

```text
Core Definition
Multiplication and Chain Rules
Conditioning on a Partition
Law of Total Probability
Independence Under Conditioning
Information and Observation Protocols
First-Step Conditioning
Common Traps
Interview Checks
```

Public prose must explicitly state that conditioning changes the probability model to the event/information known, and that two verbal statements are not interchangeable unless they induce the same conditioning event/protocol.

- [ ] **Step 4: Verify `conditioning` GREEN**

Run: `npm run test`.

Expected: conditioning tests pass.

- [ ] **Step 5: Add RED contract for `bayes-rule-base-rates`**

```js
const bayes = await readFile('src/content/knowledge/concepts/bayes-rule-base-rates.md', 'utf8');
assert.match(bayes, /^quantInterviewTopics:\s*\[probability-statistics, conditional-probability-bayes\]$/m);
assert.match(bayes, /prior/i);
assert.match(bayes, /likelihood/i);
assert.match(bayes, /posterior/i);
assert.match(bayes, /posterior odds/i);
assert.match(bayes, /likelihood ratio/i);
assert.match(bayes, /base[- ]rate/i);
assert.match(bayes, /without.*prior|prior.*required/i);
assert.match(bayes, /^## Interview Checks$/m);
assert.match(bayes, /double-headed/i);
assert.match(bayes, /P\(A\s*\|\s*B\).*P\(B\s*\|\s*A\)/s);
```

Expected RED: file missing.

- [ ] **Step 6: Create `bayes-rule-base-rates`**

Required formulas:

```text
P(H_i | E) = P(E | H_i)P(H_i) / sum_j P(E | H_j)P(H_j)
posterior odds = prior odds x likelihood ratio
```

Include the general hidden-coin posterior as an Interview Check, but do not duplicate the later full Problem solution.

- [ ] **Step 7: Run Knowledge-first checkpoint**

Run: `npm run test && npm run check && npm run build`.

Expected: all succeed.

- [ ] **Step 8: Commit Task 2**

```bash
git add tests/quant-interview-conditional-probability-bayes-content.test.mjs \
  src/content/knowledge/concepts/conditioning.md \
  src/content/knowledge/concepts/bayes-rule-base-rates.md
git commit -m "feat: build conditional probability bayes knowledge"
```

### Task 3: Create hidden-coin, two-child, and Monty Hall Problems

**Files:**
- Create: `src/content/problems/probability/hidden-coin-posterior-after-heads.md`
- Create: `src/content/problems/probability/two-children-information-protocol.md`
- Create: `src/content/problems/probability/monty-hall-switching.md`
- Modify: `tests/quant-interview-conditional-probability-bayes-content.test.mjs`

**Interfaces:**
- Consumes Knowledge slugs `conditioning`, `bayes-rule-base-rates`.
- Produces three canonical Problem slugs used later by coverage ledgers.

- [ ] **Step 1: Add RED Problem metadata contract**

For each slug, assert:

```js
assert.match(text, /^problemId:\s*conditional-probability-bayes-00[1-3]$/m);
assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, conditional-probability-bayes\]$/m);
assert.doesNotMatch(text, /Green Book|Red Book|150 Most|Question 3\.|Q3\./i);
assert.match(text, /^## Problem$/m);
assert.match(text, /^## Think Before Revealing$/m);
assert.match(text, /^## Solution$/m);
assert.match(text, /^## Why This Problem Matters$/m);
assert.match(text, /^## Common Mistakes$/m);
assert.match(text, /^## Extensions & Variants$/m);
```

Expected RED: three files missing.

- [ ] **Step 2: Add mathematical RED assertions for hidden coin**

Require:

```js
assert.match(text, /π|pi/i);
assert.match(text, /2\^\{-?n\}|2\^-n|2\^{-n\}/i);
assert.match(text, /8\/17/);
assert.match(text, /1024\/2023/);
assert.match(text, /prior.*not.*specified|without.*prior/i);
```

- [ ] **Step 3: Implement `hidden-coin-posterior-after-heads`**

Use the general `π,n` formulation as the canonical problem. Show Bayes derivation, posterior-odds alternative, both numerical checks, and a modeling note that observations alone do not define a posterior without a prior/model class.

- [ ] **Step 4: Add mathematical RED assertions for two-child protocol**

```js
assert.match(text, /1\/3/);
assert.match(text, /1\/2/);
assert.match(text, /at least one/i);
assert.match(text, /eldest|older/i);
assert.match(text, /uniformly selected|randomly selected/i);
assert.match(text, /named|name/i);
assert.match(text, /protocol|information generation|observation/i);
```

- [ ] **Step 5: Implement `two-children-information-protocol`**

Explicitly compute the three contracts from the Mathematical Contracts section. Treat the named-child variant as model-dependent and explain what extra assumptions would be required; do not publish a universal numeric answer for an underspecified protocol.

- [ ] **Step 6: Add mathematical RED assertions for Monty Hall**

```js
assert.match(text, /1\/3/);
assert.match(text, /2\/3/);
assert.match(text, /host.*knows|knows.*prize/i);
assert.match(text, /always.*opens|always.*offer/i);
assert.match(text, /random.*open|uninformed/i);
```

- [ ] **Step 7: Implement `monty-hall-switching`**

State the standard host policy before calculation. Show both probability-mass and case-partition arguments. In `Extensions & Variants`, explain that a random/uninformed reveal is a different conditional experiment.

- [ ] **Step 8: Verify Task 3**

Run: `npm run test && npm run check && npm run build`.

Expected: all succeed.

- [ ] **Step 9: Commit Task 3**

```bash
git add tests/quant-interview-conditional-probability-bayes-content.test.mjs \
  src/content/problems/probability/hidden-coin-posterior-after-heads.md \
  src/content/problems/probability/two-children-information-protocol.md \
  src/content/problems/probability/monty-hall-switching.md
git commit -m "feat: add core conditional probability problems"
```

### Task 4: Create Russian roulette, candies, and golden-face Problems

**Files:**
- Create: `src/content/problems/probability/russian-roulette-after-survival.md`
- Create: `src/content/problems/probability/candies-last-color-ordering.md`
- Create: `src/content/problems/probability/golden-face-posterior.md`
- Modify: `tests/quant-interview-conditional-probability-bayes-content.test.mjs`

**Interfaces:**
- Produces the remaining three canonical Problem targets required by hidden coverage.

- [ ] **Step 1: Add RED metadata contracts for Problem ids `004-006`**

Use the same source-neutral/S3+ assertions from Task 3 with ids:

```text
conditional-probability-bayes-004
conditional-probability-bayes-005
conditional-probability-bayes-006
```

- [ ] **Step 2: Add and satisfy Russian-roulette math contract**

RED assertions:

```js
assert.match(text, /1\/3/);
assert.match(text, /1\/4/);
assert.match(text, /consecutive|adjacent/i);
assert.match(text, /condition.*surviv|surviv.*condition/i);
assert.match(text, /do not spin|don't spin/i);
```

Implementation must explain the four equally possible empty current-chamber positions after survival and why only one is immediately before the two-bullet block.

- [ ] **Step 3: Add and satisfy candies math contract**

RED assertions:

```js
assert.match(text, /T_r|Tr/);
assert.match(text, /T_b|Tb/);
assert.match(text, /T_g|Tg/);
assert.match(text, /7\/12/);
assert.match(text, /30\/60/);
assert.match(text, /20\/30/);
assert.match(text, /20\/60/);
assert.match(text, /30\/40/);
```

Implementation must partition the event into the two mutually exclusive last-color orderings before multiplying conditional probabilities.

- [ ] **Step 4: Add and satisfy golden-face math contract**

RED assertions:

```js
assert.match(text, /GG/);
assert.match(text, /GB/);
assert.match(text, /BB/);
assert.match(text, /2\/3/);
assert.match(text, /visible.*face|observed.*face/i);
assert.match(text, /selection.*bias|size[- ]bias|weighted/i);
```

Implementation must clearly distinguish uniform object selection from the posterior weighting induced after conditioning on a visible golden face.

- [ ] **Step 5: Verify Task 4**

Run: `npm run test && npm run check && npm run build`.

Expected: all succeed.

- [ ] **Step 6: Commit Task 4**

```bash
git add tests/quant-interview-conditional-probability-bayes-content.test.mjs \
  src/content/problems/probability/russian-roulette-after-survival.md \
  src/content/problems/probability/candies-last-color-ordering.md \
  src/content/problems/probability/golden-face-posterior.md
git commit -m "feat: add conditional information problem families"
```

### Task 5: Reconcile hidden coverage and semantic deduplication

**Files:**
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/coverage/red-book.json`
- Modify: `src/data/quant-interview/coverage/150-most-frequently-asked.json`
- Modify: `tests/quant-interview-conditional-probability-bayes-workstream.test.mjs`

**Interfaces:**
- Consumes: all canonical Knowledge/Problem slugs from Tasks 2-4.
- Produces: exactly 12 claimed terminal rows: 6 Green + 5 Red + 1 150.

- [ ] **Step 1: Add RED inventory test for exactly the 12 claimed keys**

```js
const expected = {
  'green-book': [
    '4.3::definitions-conditional-probability-bayes',
    '4.3::boys-and-girls',
    '4.3::unfair-coin',
    '4.3::monty-hall',
    '4.3::candies-in-a-jar',
    '4.3::russian-roulette-series',
  ],
  'red-book': [
    '3.2.1::3.10',
    '3.2.1::3.11',
    '3.2.1::3.14',
    '3.2.1::3.15',
    '3.2.1::3.17',
  ],
  '150-most-frequently-asked': ['2.7::2'],
};
```

Run `npm run test` and confirm failures are missing-row failures only.

- [ ] **Step 2: Add RED semantic-merge assertions**

Require:

```text
Green unfair coin -> canonical hidden-coin Problem
Red 3.10 -> merged-duplicate -> same hidden-coin Problem
Red 3.11 -> knowledge-only -> bayes-rule-base-rates + conditioning
Green boys/girls -> canonical two-child Problem
Red 3.14 -> merged-duplicate -> same two-child Problem
Red 3.15 -> variant -> same two-child Problem with ambiguity correction note
Green roulette -> canonical roulette Problem
Red 3.17 -> merged-duplicate -> same roulette Problem
150 2.7::2 -> canonical golden-face Problem + explicit topicOverrideReason
```

- [ ] **Step 3: Add Green six rows**

Every row uses:

```json
{
  "sourceSection": "4.3",
  "sourceItem": "...",
  "canonicalTopics": ["conditional-probability-bayes"],
  "state": "...",
  "canonicalProblems": [],
  "canonicalKnowledge": [],
  "resolutionNote": "..."
}
```

Populate targets exactly from Source Inventory and Semantic Decisions.

- [ ] **Step 4: Add Red five rows**

For `3.2.1::3.15`, the `resolutionNote` must explicitly contain all three ideas: named-child wording is protocol-dependent; the source shortcut is not copied blindly; the canonical Problem owns the corrected general treatment.

- [ ] **Step 5: Add 150 Q2 row with item-level override**

Required fields:

```json
{
  "sourceSection": "2.7",
  "sourceItem": "2",
  "canonicalTopics": ["conditional-probability-bayes"],
  "state": "canonical-problem",
  "canonicalProblems": ["golden-face-posterior"],
  "canonicalKnowledge": ["conditioning", "bayes-rule-base-rates"],
  "topicOverrideReason": "Item-level mathematical identity is Conditional Probability & Bayes even though the editorial source container is Brainteasers; observing a golden face reweights the latent object posterior.",
  "resolutionNote": "Distinct latent-object selection-conditioning family represented by golden-face-posterior."
}
```

- [ ] **Step 6: Add terminal-resolution validation**

Use existing `validateCoverageLedger` with:

```js
allowUnresolvedCanonicalRefs: false
```

For each of the 12 rows assert:

```js
assert.ok(terminalStates.has(row.state));
assert.ok((row.resolutionNote ?? '').trim());
```

- [ ] **Step 7: Verify Knowledge-only visibility**

Read both Knowledge pages and assert:

```js
assert.match(conditioning, /^## Interview Checks$/m);
assert.match(conditioning, /at least one child/i);
assert.match(bayes, /^## Interview Checks$/m);
assert.match(bayes, /prior/i);
assert.match(bayes, /double-headed/i);
```

- [ ] **Step 8: Verify Task 5**

Run: `npm run test && npm run check && npm run build`.

Expected: all succeed with all 12 rows terminal and resolved.

- [ ] **Step 9: Commit Task 5**

```bash
git add src/data/quant-interview/coverage/green-book.json \
  src/data/quant-interview/coverage/red-book.json \
  src/data/quant-interview/coverage/150-most-frequently-asked.json \
  tests/quant-interview-conditional-probability-bayes-workstream.test.mjs
git commit -m "data: reconcile conditional probability bayes coverage"
```

### Task 6: Extend source-neutral corpus regression

**Files:**
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`

**Interfaces:**
- Consumes: six new Problem slugs and new Knowledge slug.
- Produces: exact corpus regression contract used by later handoff/completion validation.

- [ ] **Step 1: Add the six Problem slugs to `currentProblemSlugs`**

Append exactly:

```js
'hidden-coin-posterior-after-heads',
'two-children-information-protocol',
'monty-hall-switching',
'russian-roulette-after-survival',
'candies-last-color-ordering',
'golden-face-posterior',
```

- [ ] **Step 2: Add new Knowledge topic assignment**

Add:

```js
['bayes-rule-base-rates', ['probability-statistics', 'conditional-probability-bayes']],
```

Do not add a second `conditioning` entry; its existing topic assignment remains unchanged.

- [ ] **Step 3: Update exact corpus count assertion**

Planning expectation after unchanged six-Problem/one-Knowledge design:

```js
assert.equal(currentProblemSlugs.length, 36);
assert.equal(expectedKnowledgeTopics.size, 28);
```

If semantic review removed/merged any planned public page before this task, update the exact assertion to the actual reviewed corpus and document the reason in HANDOFF; never create filler content to hit 36/28.

- [ ] **Step 4: Extend hidden 150 audit map**

Add the 150 Q2 mapping only if the existing audit map is intended to enumerate direct source-derived canonical Problem ownership:

```js
['2.7::2', 'golden-face-posterior'],
```

- [ ] **Step 5: Run source-neutral regression**

Run: `npm run test`.

Expected: all current interview Problems have canonical topics, no source provenance, no source-shaped problemIds, and all Knowledge topic assignments resolve.

- [ ] **Step 6: Commit Task 6**

```bash
git add tests/quant-interview-source-neutral-content.test.mjs
git commit -m "test: extend source-neutral regression for conditional probability"
```

### Task 7: Completion gate, durable handoff, verification, and cleanup

**Files:**
- Create: `tests/quant-interview-conditional-probability-bayes-completion.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`
- Modify: `src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Delete before final handoff: `.github/workflows/quant-interview-conditional-probability-bayes-ci.yml`

**Interfaces:**
- Produces: immutable completion state and next workstream pointer `Random Variables & Distributions`.

- [ ] **Step 1: Add RED completion test**

```js
test('conditional probability Bayes workstream closes only with real verification evidence', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  assert.match(workstream.verification?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.ok(Number.isInteger(workstream.verification?.runId));
  assert.deepEqual(workstream.verification?.commands, [
    'npm run test',
    'npm run check',
    'npm run build',
  ]);
  assert.equal(workstream.verification?.conclusion, 'success');
});
```

Add HANDOFF assertions:

```js
assert.match(handoff, /probability-statistics-conditional-probability-bayes-007/);
assert.match(handoff, /hidden-coin-posterior-after-heads/);
assert.match(handoff, /two-children-information-protocol/);
assert.match(handoff, /golden-face-posterior/);
assert.match(handoff, /12 claimed source rows|12 terminal/i);
const nextAction = handoff.split(/## Next action/i)[1] ?? '';
assert.match(nextAction, /Random Variables & Distributions/i);
```

Expected RED: workstream is still `active` and HANDOFF still points to Conditional Probability & Bayes.

- [ ] **Step 2: Run content-complete CI before sealing status**

On the current content/coverage/regression commit, run branch CI with:

```text
npm run test
npm run check
npm run build
```

Require all three steps to succeed. Record the exact 40-character commit SHA and Actions run id from this successful run.

- [ ] **Step 3: Seal machine-readable workstream**

Update JSON to:

```json
"status": "complete",
"verification": {
  "commit": "<the exact successful content-complete commit SHA>",
  "runId": 123456789,
  "commands": ["npm run test", "npm run check", "npm run build"],
  "conclusion": "success"
}
```

When executing the plan, replace the illustrative run id above with the actual successful run id from Step 2; never invent verification evidence.

- [ ] **Step 4: Update durable HANDOFF**

Append/retain history so HANDOFF includes:

```text
Completed cross-book workstream 7
probability-statistics-conditional-probability-bayes-007
2 canonical Knowledge nodes affected (conditioning expanded; bayes-rule-base-rates added)
6 canonical Problems
12 terminal claimed source rows
Green/Red hidden-coin merge
Green/Red two-child merge with protocol correction
Green/Red Russian-roulette merge
150 Q2 item-level topic override
real commit/run verification evidence
current corpus counts
Next action: Probability & Statistics -> Random Variables & Distributions
```

Also state explicitly that 150 joint-normal conditional probability and Green branching/random-walk items remain outside this completed topic.

- [ ] **Step 5: Make completion gate GREEN**

Run: `npm run test && npm run check && npm run build` via branch CI.

Expected: all succeed, including old handoff tests and new completion tests.

- [ ] **Step 6: Review topic-only diff**

Compare:

```text
base = chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17
head = chatgpt/quant-interview-workstream-conditional-probability-bayes-2026-08-17
```

Allowed changed-file groups only:

```text
docs/quant-interview/HANDOFF.md
docs/superpowers/specs/2026-08-17-quant-interview-conditional-probability-bayes-design.md
docs/superpowers/plans/2026-08-17-quant-interview-conditional-probability-bayes.md
src/content/knowledge/concepts/conditioning.md
src/content/knowledge/concepts/bayes-rule-base-rates.md
src/content/problems/probability/<six new problem files>
src/data/quant-interview/coverage/<three ledgers>
src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json
tests/quant-interview-conditional-probability-bayes-*.test.mjs
tests/quant-interview-source-neutral-content.test.mjs
tests/quant-interview-handoff.test.mjs
```

No homepage, Projects, visual UI, unrelated Knowledge topics, deployment configuration, or unrelated research files may remain in the final diff.

- [ ] **Step 7: Delete temporary branch-only CI**

Delete `.github/workflows/quant-interview-conditional-probability-bayes-ci.yml` after the final successful run is recorded.

- [ ] **Step 8: Re-review final diff after cleanup**

Confirm the temporary workflow is absent and only allowed topic files remain.

- [ ] **Step 9: Final commit**

```bash
git add docs/quant-interview/HANDOFF.md \
  src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json \
  tests/quant-interview-conditional-probability-bayes-completion.test.mjs \
  tests/quant-interview-handoff.test.mjs
git commit -m "docs: hand off completed conditional probability bayes workstream"
```

## Self-Review

- Spec coverage: every approved spec section maps to Tasks 1-7.
- The scope is one canonical topic only; source editorial placement never overrides mathematical identity.
- Existing `conditioning` is reused and expanded rather than duplicated.
- Bayes/base-rate/model-ambiguity responsibility is isolated in one new Knowledge node.
- Red Q3.15 is not copied uncritically; observation/naming protocol ambiguity is a tested requirement.
- Green/Red hidden-coin, two-child, and Russian-roulette duplicate families are merged semantically.
- 150 Q2 receives an explicit item-level topic override; 150 joint-normal Q5 stays out of scope.
- Exactly 12 claimed source rows are planned: 6 Green, 5 Red, 1 150.
- No low-value standalone Problem is created for Red Q3.11; its interview value remains public through Knowledge checks and the hidden-coin family.
- All six Problem mathematical results are fixed and independently testable.
- No source provenance is allowed in public content.
- Completion requires fresh real CI evidence; no fabricated run id or commit is permitted.
- Final topic-only diff explicitly excludes unrelated website/UI/Projects changes.
- Placeholder scan: no `TBD`, `TODO`, or unresolved implementation decision remains. The only angle-bracket values are explicitly described as values that must be replaced with real CI evidence at execution time, never committed as fake data.
