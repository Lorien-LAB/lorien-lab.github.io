# Problem Simplification 018 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the complete eleven-record cross-book Problem Simplification scope with two source-neutral Knowledge nodes, five independently authored S3+ Problems, exact hidden mappings, two page repairs, and factual workstream-018 verification evidence.

**Architecture:** Public content is implemented and tested before hidden source state changes. An exact active 018 manifest then owns eleven mirrored coverage/master records; Windows, WSL native-LF Node 24, and GitHub Actions prove one immutable active SHA before the temporary workflow is removed and factual completion state is recorded.

**Tech Stack:** Astro Markdown/YAML, JSON catalog/coverage/master/workstreams, Node.js 24, `node:test`, `js-yaml`, generated Knowledge directory, WSL native-LF verification, GitHub Actions.

## Global Constraints

- Implement only `logic-brainteasers-discrete-reasoning-problem-simplification-018` on branch `codex/quant-interview-problem-simplification-018` created from the committed plan base.
- Own exactly eleven master keys in existing queue order: three Green Book, four Red Book, and four 150 Questions records listed in the approved design.
- Publish exactly five Problems and two Knowledge nodes; final public corpus is exactly **81 Problems / 56 Knowledge**.
- Resolve exactly five source rows as `canonical-problem` and six as `knowledge-only`; all notes are distinct and mirrored by coverage/master.
- Add no standalone Fermi Problem and no dated Fermi answer. Mental cubing, exponential backtracking, and round-cover prompts remain Knowledge checks only.
- Apply only two page repairs: Red 8.25 solution `307–308 → 307`; 150 Q30 solution `215–216 → 215`.
- Add secondary topic `dynamic-programming-algorithms` only to 150 Q8 and `algorithmic-complexity` only to 150 Q23, each with a non-empty item-level override reason.
- Do not modify taxonomy or `src/data/quant-interview/topics/source-topic-map.json`.
- Public pages must be independently worded and source-neutral: no book title, source item, page, provenance field, named source object, copied answer, or source-era Fermi value.
- Every Problem is renderer-safe and S3+, with progressive hints, full derivation, Why This Problem Matters, Common Mistakes, and Extensions.
- Final master state is exactly **239 terminal / 511 pending**, next `green-book::2.2::theory`, no active bounded topic, and no 019.
- Active 018 is evidence-free. Complete 018 requires one immutable active SHA, a positive matching numeric GitHub Actions run id, WSL native-LF Node 24 proof, five ordered gates, and absent temporary workflow.
- Never stage `docs/书籍/`, `docs/量化实习_LeetCode与编程笔试面试备考指南.md`, `tmp/`, rendered pages, OCR output, `.superpowers/`, unrelated changes, or source media.
- Preserve all workstreams 001–017, existing completion evidence, dependencies, and unrelated public content.
- Ordered gates: `npm test`, `npm run knowledge:directory:check`, `npm run master:directory:check`, `npm run check`, `npm run build`.

## File Responsibility Map

- Task 1 owns two new Knowledge Markdown files and `tests/quant-interview-problem-simplification-knowledge.test.mjs`.
- Task 2 owns two new logic Problem Markdown files and `tests/quant-interview-problem-simplification-small-cases.test.mjs`.
- Task 3 owns three new Problem Markdown files and `tests/quant-interview-problem-simplification-algorithms.test.mjs`.
- Task 4 owns `knowledge-catalog.json`, exact reciprocal edits to two existing Knowledge files, and the 81/56 graph/count contract.
- Task 5 owns the active/complete 018 manifest, three coverage ledgers, eleven master records, two page repairs, and the focused workstream test.
- Task 6 owns completion/lifecycle tests, mutable current-state compatibility tests, HANDOFF, and the generated Knowledge directory.
- Task 7 creates the temporary CI workflow and produces immutable `ACTIVE_SHA` plus matching `RUN_ID` without adding evidence to the active manifest.
- Task 8 deletes the temporary workflow, writes factual completion evidence, verifies the final tree, performs full-branch review, pushes only the feature branch, and offers integration choices.

## File Responsibility Map

---

### Task 1: Publish the two Problem Simplification Knowledge nodes

**Files:**
- Create: `tests/quant-interview-problem-simplification-knowledge.test.mjs`
- Create: `src/content/knowledge/concepts/small-cases-recurrence-and-structural-simplification.md`
- Create: `src/content/knowledge/concepts/fermi-estimation-assumption-decomposition.md`

**Interfaces:**
- Consumes: Knowledge Markdown schema and `js-yaml` `JSON_SCHEMA`.
- Produces: two canonical slugs, exact reciprocal intentions, and public self-tests used by Task 4 and Task 5.

- [ ] **Step 1: Write failing metadata and semantic tests**

Create the test with real-file assertions. The core fixture is:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const files = {
  small: 'src/content/knowledge/concepts/small-cases-recurrence-and-structural-simplification.md',
  fermi: 'src/content/knowledge/concepts/fermi-estimation-assumption-decomposition.md',
};
const topics = ['logic-brainteasers-discrete-reasoning', 'problem-simplification'];

async function page(path) {
  const text = await readFile(path, 'utf8');
  assert.equal(text.startsWith('---\n'), true);
  return {
    text,
    metadata: parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA }),
  };
}

function section(text, heading) {
  return text.split(new RegExp(`^## ${heading}$`, 'm'))[1]?.split(/^## /m)[0] ?? '';
}
```

Assert exact frontmatter objects. Use these literal values:

```js
const smallMetadata = {
  title: 'Small Cases, Recurrence & Structural Simplification',
  description: 'Reduce complex interview problems to valid base cases, derive recurrences or structural invariants, prove the emerging pattern, and lift it back to the original scale.',
  date: '2026-08-30', type: 'concept', domain: 'Mathematics & Statistics',
  category: 'Problem Solving Techniques', status: 'growing',
  tags: ['Problem Simplification', 'Recurrence', 'Induction', 'Interview'],
  quantInterviewTopics: topics, featured: false,
  related: ['recursion-problem-solving', 'problem-framing-clarification-assumption-management', 'fermi-estimation-assumption-decomposition'],
  relatedNotes: [],
};
const fermiMetadata = {
  title: 'Fermi Estimation & Assumption Decomposition',
  description: 'Build auditable Fermi estimates by defining units, decomposing assumptions, bounding sensitive factors, cross-checking independently, and planning validation.',
  date: '2026-08-30', type: 'concept', domain: 'Mathematics & Statistics',
  category: 'Problem Solving Techniques', status: 'growing',
  tags: ['Fermi Estimation', 'Assumptions', 'Sensitivity', 'Interview'],
  quantInterviewTopics: topics, featured: false,
  related: ['small-cases-recurrence-and-structural-simplification', 'problem-framing-clarification-assumption-management'],
  relatedNotes: [],
};
```

Add semantic tests with literal heading and behavior checks:

```js
test('small-cases Knowledge teaches a complete simplification-to-proof loop', async () => {
  const { text, metadata } = await page(files.small);
  assert.deepEqual(metadata, smallMetadata);
  for (const heading of ['Core Idea', 'Seven-Step Workflow', 'Four Simplification Modes', 'From Pattern to Proof', 'Recognition Signals', 'Common Mistakes', 'Interview Checks']) {
    assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  }
  const workflow = section(text, 'Seven-Step Workflow').match(/^\d+\. .+$/gm) ?? [];
  assert.equal(workflow.length, 7);
  for (const pattern of [/preserve.*rules/i, /base cases?/i, /solve.*completely/i, /increase.*one step/i, /state transitions?/i, /conjecture/i, /prove.*original/i]) {
    assert.match(workflow.join('\n'), pattern);
  }
  const modes = section(text, 'Four Simplification Modes');
  for (const pattern of [/size reduction/i, /backward induction/i, /state compression/i, /algebraic.*geometric re-expression/i]) assert.match(modes, pattern);
  const checks = section(text, 'Interview Checks');
  assert.equal((checks.match(/^\d+\. /gm) ?? []).length >= 8, true);
  for (const pattern of [/15.*cub/i, /quarter.*full|back.*known endpoint/i, /constant width|fall through/i]) assert.match(checks, pattern);
});

test('Fermi Knowledge is auditable, range-based, and validation-driven', async () => {
  const { text, metadata } = await page(files.fermi);
  assert.deepEqual(metadata, fermiMetadata);
  for (const heading of ['Core Idea', 'Define the Estimate', 'Assumption Tree', 'Ranges and Units', 'Sensitivity', 'Independent Cross-Check', 'Validation Plan', 'Common Mistakes', 'Interview Checks']) {
    assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  }
  for (const pattern of [/target quantity.*unit.*time horizon.*boundary/i, /low.*base.*high/i, /stock.*flow/i, /sensitivity/i, /independent.*cross-check/i, /authoritative|first-party/i]) assert.match(text, pattern);
  const checks = section(text, 'Interview Checks');
  assert.equal((checks.match(/^\d+\. /gm) ?? []).length >= 6, true);
  assert.match(checks, /locations?/i);
  assert.match(checks, /specialized.*providers?/i);
  assert.doesNotMatch(text, /United Kingdom|Oxford|petrol station|piano tuner|12,?000|60 tuners/i);
  assert.match(text, /false precision|memorized/i);
});

test('both Knowledge pages are source-neutral', async () => {
  for (const path of Object.values(files)) {
    const { text } = await page(path);
    assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently Asked|Question 8\.|Question 30|PDF page|source item|source answer/i);
  }
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node --test tests/quant-interview-problem-simplification-knowledge.test.mjs
```

Expected: FAIL with `ENOENT` for the first missing Knowledge file. A syntax error is not an acceptable RED state.

- [ ] **Step 3: Create both Knowledge pages with exact public contracts**

Use the exact frontmatter objects above. The Small Cases body must contain the seven numbered workflow steps in the approved order; four named modes; explicit rules for base cases, recurrence validity, induction, tie-breaking, adversarial preferences, resource bounds, and worst-case versus average-case reasoning; recognition signals; common mistakes; and eight numbered checks including the three low-complexity source identities in independent wording.

The Fermi body must define quantity/unit/time/boundary; show a multiplicative assumption tree; give low/base/high ranges; distinguish stock and flow; rank assumptions by sensitivity; produce an independent estimate; reconcile disagreement; end with a current-data validation plan; reject memorized answers and false precision; and contain six numbered source-neutral checks.

Required Markdown skeleton for each file:

```markdown
---
# exact frontmatter from the test fixture
---

## Core Idea

## Seven-Step Workflow

## Four Simplification Modes

## From Pattern to Proof

## Recognition Signals

## Common Mistakes

## Interview Checks
```

For the Fermi file replace the post-Core headings with the exact Fermi headings asserted by the test. Do not add extra level-two headings because heading inventory is part of the contract.

- [ ] **Step 4: Run GREEN and review only Task 1 scope**

```bash
node --test tests/quant-interview-problem-simplification-knowledge.test.mjs
git diff --check
git status --short
```

Expected: all focused tests pass; changed paths are exactly the three Task 1 files plus the pre-existing untracked source inputs outside the feature worktree.

- [ ] **Step 5: Commit Task 1**

```bash
git add -- tests/quant-interview-problem-simplification-knowledge.test.mjs src/content/knowledge/concepts/small-cases-recurrence-and-structural-simplification.md src/content/knowledge/concepts/fermi-estimation-assumption-decomposition.md
git commit -m "feat(quant-interview): add problem simplification Knowledge"
```

### Task 2: Publish the two small-case and backward-induction Problems

**Files:**
- Create: `tests/quant-interview-problem-simplification-small-cases.test.mjs`
- Create: `src/content/problems/logic/sequential-voting-elimination-backward-induction.md`
- Create: `src/content/problems/logic/predator-replacement-parity.md`

**Interfaces:**
- Consumes: Task 1 slug `small-cases-recurrence-and-structural-simplification` and existing `recursion-problem-solving`.
- Produces: Problem ids `logic-problem-simplification-001` and `logic-problem-simplification-002` for catalog/count and source mapping tasks.

- [ ] **Step 1: Write failing exact frontmatter and solution tests**

Create a real-file test with YAML parsing and disclosure helpers:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const topics = ['logic-brainteasers-discrete-reasoning', 'problem-simplification'];
const paths = {
  voting: 'src/content/problems/logic/sequential-voting-elimination-backward-induction.md',
  parity: 'src/content/problems/logic/predator-replacement-parity.md',
};

async function page(path) {
  const text = await readFile(path, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, `${path} missing frontmatter`);
  return { text, metadata: parseYaml(match[1], { schema: JSON_SCHEMA }) };
}

function solution(text) {
  const body = text.match(/<summary>Show Solution<\/summary>([\s\S]*?)<\/details>/)?.[1] ?? '';
  assert.match(body, /^## Solution$/m);
  for (const heading of ['Why This Problem Matters', 'Common Mistakes', 'Extensions']) {
    assert.match(body, new RegExp(`^## ${heading}$`, 'm'));
  }
  return body;
}
```

Assert exact metadata with literal objects:

```js
const votingMetadata = {
  problemId: 'logic-problem-simplification-001',
  title: 'Sequential Voting Under Elimination',
  description: 'Solve a ranked allocation vote by reducing it to smaller surviving groups and working backward through every proposal state.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Game Theory', 'Backward Induction'],
  tags: ['Brainteasers', 'Backward Induction', 'Interview'],
  quantInterviewTopics: topics,
  concepts: ['small-cases-recurrence-and-structural-simplification', 'recursion-problem-solving'],
  techniques: ['recursion-problem-solving'], prerequisites: [],
  relatedProblems: ['predator-replacement-parity'], family: 'sequential-elimination',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3,
  estimatedMinutes: 15, status: 'solved', featured: false,
};
const parityMetadata = {
  problemId: 'logic-problem-simplification-002',
  title: 'Predator Replacement Parity',
  description: 'Reduce a rational predator replacement process to small cases and prove the resulting odd-even survival rule by induction.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Induction', 'Parity'],
  tags: ['Brainteasers', 'Induction', 'Parity', 'Interview'],
  quantInterviewTopics: topics,
  concepts: ['small-cases-recurrence-and-structural-simplification'],
  techniques: [], prerequisites: [],
  relatedProblems: ['sequential-voting-elimination-backward-induction'], family: 'replacement-parity',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3,
  estimatedMinutes: 12, status: 'solved', featured: false,
};
```

Add exact behavior tests:

```js
test('sequential voting derives all five states and the final allocation', async () => {
  const { text, metadata } = await page(paths.voting);
  assert.deepEqual(metadata, votingMetadata);
  for (const heading of ['Problem', 'Think Before Revealing']) assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
  const body = solution(text);
  for (const n of [1, 2, 3, 4, 5]) assert.match(body, new RegExp(`(?:${n} agents?|n\\s*=\\s*${n})`, 'i'));
  assert.match(body, /98.*0.*1.*0.*1|senior.*98/i);
  assert.match(body, /at least half|50%/i);
  assert.match(body, /proposer.*votes?/i);
  assert.match(body, /survival.*units?.*fewer|lexicographic/i);
  assert.match(body, /different.*(?:threshold|tie|preference).*change/i);
});

test('predator replacement proves the parity theorem under explicit preferences', async () => {
  const { text, metadata } = await page(paths.parity);
  assert.deepEqual(metadata, parityMetadata);
  assert.match(text, /only one predator.*(?:act|consume)/i);
  assert.match(text, /survival.*first/i);
  assert.match(text, /equal survival.*(?:consume|eating).*prefer/i);
  const body = solution(text);
  for (const n of [1, 2, 3, 4]) assert.match(body, new RegExp(`(?:${n} predators?|n\\s*=\\s*${n})`, 'i'));
  assert.match(body, /odd.*consum|consum.*odd/i);
  assert.match(body, /even.*not.*consum|not.*consum.*even/i);
  assert.match(body, /induction/i);
  assert.match(body, /n\s*=\s*100|100 predators/i);
});

test('small-case Problems are source-neutral and structurally complete', async () => {
  for (const path of Object.values(paths)) {
    const { text } = await page(path);
    solution(text);
    assert.doesNotMatch(text, /Green Book|A Practical Guide|Screwy pirates|Tiger and sheep|PDF page|source item/i);
    assert.match(text, /^## Think Before Revealing$/m);
    assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
  }
});
```

- [ ] **Step 2: Run focused RED**

```bash
node --test tests/quant-interview-problem-simplification-small-cases.test.mjs
```

Expected: FAIL with `ENOENT` for the first missing Problem page.

- [ ] **Step 3: Author both Problems to satisfy the exact model**

Use the exact frontmatter fixtures. Use these independently worded public prompts and hints:

```markdown
## Problem

Five agents are ranked A5 (most senior) through A1. They must allocate 100 identical units. The most senior surviving agent proposes an integer allocation; every survivor, including the proposer, votes. A proposal passes when at least half of the current survivors approve. Rejection removes the proposer and repeats the process. Preferences are lexicographic: survive, receive more units, then have fewer rivals survive. Determine the allocation proposed by A5.

## Think Before Revealing

<details><summary>Hint 1</summary>Solve the one-agent and two-agent states under the same voting threshold before considering five agents.</details>
<details><summary>Hint 2</summary>At each larger state, identify who receives zero if the proposer is removed; those agents are the cheapest votes to acquire.</details>
```

```markdown
## Problem

One vulnerable animal shares an island with n rational predators. Only one predator may act at a time. A predator that consumes the vulnerable animal immediately becomes the new vulnerable animal. Each predator first maximizes survival and, conditional on equal survival, prefers consuming to abstaining. Determine for which n the initial vulnerable animal is consumed, and evaluate n = 100.

## Think Before Revealing

<details><summary>Hint 1</summary>Write the outcomes for n = 1, 2, 3, and 4 without changing the action or preference rules.</details>
<details><summary>Hint 2</summary>A predator deciding now only needs to know whether the replacement vulnerable animal survives with n - 1 predators.</details>
```

Both files then place Hint 1, Hint 2, and `Show Solution` disclosures before the exact solution heading order: Solution, Why This Problem Matters, Common Mistakes, Extensions. Voting must derive `100`; `100/0`; `99/0/1`; `99/0/1/0`; and `98/0/1/0/1` in senior-to-junior order, with proposer vote and threshold explicit. Parity must prove the theorem from `n=1,2,3,4`, state the induction step, and specialize to 100.

- [ ] **Step 4: Run GREEN and scope checks**

```bash
node --test tests/quant-interview-problem-simplification-small-cases.test.mjs
git diff --check
git status --short
```

Expected: focused tests pass and only the three Task 2 files changed.

- [ ] **Step 5: Commit Task 2**

```bash
git add -- tests/quant-interview-problem-simplification-small-cases.test.mjs src/content/problems/logic/sequential-voting-elimination-backward-induction.md src/content/problems/logic/predator-replacement-parity.md
git commit -m "feat(quant-interview): add small-case simplification Problems"
```

### Task 3: Publish the three algorithmic simplification Problems

**Files:**
- Create: `tests/quant-interview-problem-simplification-algorithms.test.mjs`
- Create: `src/content/problems/logic/two-egg-threshold-search.md`
- Create: `src/content/problems/logic/large-power-digit-count-without-log-tables.md`
- Create: `src/content/problems/logic/minimum-comparisons-for-both-extremes.md`

**Interfaces:**
- Consumes: Task 1 Knowledge slugs and existing `recursion-problem-solving`.
- Produces: Problem ids `logic-problem-simplification-003` through `005`, including exact secondary-topic arrays for Task 5.

- [ ] **Step 1: Write failing frontmatter, derivation, and lower-bound tests**

Create the test with these imports and real-file helpers, then define the literal metadata objects below:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

async function page(path) {
  const text = await readFile(path, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, `${path} missing frontmatter`);
  return { text, metadata: parseYaml(match[1], { schema: JSON_SCHEMA }) };
}

function solution(text) {
  const body = text.match(/<summary>Show Solution<\/summary>([\s\S]*?)<\/details>/)?.[1] ?? '';
  for (const heading of ['Solution', 'Why This Problem Matters', 'Common Mistakes', 'Extensions']) {
    assert.match(body, new RegExp(`^## ${heading}$`, 'm'));
  }
  return body;
}
```

Define these literal metadata objects:

```js
const root = ['logic-brainteasers-discrete-reasoning', 'problem-simplification'];
const algorithmRoot = 'algorithms-data-structures-cpp';

const eggMetadata = {
  problemId: 'logic-problem-simplification-003', title: 'Two-Resource Threshold Search',
  description: 'Find an unknown threshold among 100 ordered levels with two destructible probes while minimizing the worst-case number of tests.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Dynamic Programming', 'Minimax Search'],
  tags: ['Dynamic Programming', 'Recurrence', 'Worst Case', 'Interview'],
  quantInterviewTopics: [...root, algorithmRoot, 'dynamic-programming-algorithms'],
  concepts: ['small-cases-recurrence-and-structural-simplification', 'recursion-problem-solving'],
  techniques: ['recursion-problem-solving'], prerequisites: [],
  relatedProblems: ['minimum-comparisons-for-both-extremes'], family: 'threshold-search',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3,
  estimatedMinutes: 20, status: 'solved', featured: false,
};
const digitMetadata = {
  problemId: 'logic-problem-simplification-004', title: 'Digit Count of a Large Power Without Log Tables',
  description: 'Determine the decimal digit count of a large power by rewriting it near a power of ten and proving strict elementary bounds.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Inequalities', 'Number Sense'],
  tags: ['Powers', 'Bounds', 'Problem Simplification', 'Interview'],
  quantInterviewTopics: root,
  concepts: ['small-cases-recurrence-and-structural-simplification'], techniques: [], prerequisites: [],
  relatedProblems: ['minimum-comparisons-for-both-extremes'], family: 'large-power-bounds',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3,
  estimatedMinutes: 15, status: 'solved', featured: false,
};
const comparisonsMetadata = {
  problemId: 'logic-problem-simplification-005', title: 'Minimum Comparisons for Both Extremes',
  description: 'Find both the minimum and maximum of distinct inputs with an optimal paired-comparison algorithm and prove its comparison lower bound.',
  date: '2026-08-30', domain: 'Computer Science', category: 'Algorithms',
  subcategories: ['Comparison Algorithms', 'Lower Bounds'],
  tags: ['Algorithms', 'Comparisons', 'Lower Bounds', 'Interview'],
  quantInterviewTopics: [...root, algorithmRoot, 'algorithmic-complexity'],
  concepts: ['small-cases-recurrence-and-structural-simplification'], techniques: [], prerequisites: [],
  relatedProblems: ['two-egg-threshold-search'], family: 'comparison-extremes',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3,
  estimatedMinutes: 18, status: 'solved', featured: false,
};
```

Use whitespace-normalized formula checks and exact semantic assertions:

```js
const compact = (text) => text.replace(/\s+/g, '').replace(/\\/g, '');
const hasFormula = (text, formula) => assert.equal(compact(text).includes(compact(formula)), true, formula);

test('two-resource threshold search proves and attains fourteen tests', async () => {
  const { text, metadata } = await page('src/content/problems/logic/two-egg-threshold-search.md');
  assert.deepEqual(metadata, eggMetadata);
  assert.match(text, /deterministic.*threshold/i);
  assert.match(text, /survives?.*at or below|destroyed.*above/i);
  const body = solution(text);
  hasFormula(body, 'h_e(d)=1+h_(e-1)(d-1)+h_e(d-1)');
  hasFormula(body, 'h_2(d)=d(d+1)/2');
  assert.match(body, /h.?2\(13\).*91.*100.*105.*h.?2\(14\)/is);
  assert.match(body, /14.*13.*12.*11|decreasing.*step/i);
  assert.match(body, /worst.case.*14|14.*worst.case/i);
});

test('large-power digit count proves the strict 210-digit interval', async () => {
  const { text, metadata } = await page('src/content/problems/logic/large-power-digit-count-without-log-tables.md');
  assert.deepEqual(metadata, digitMetadata);
  const body = solution(text);
  hasFormula(body, '125^100=10^210/1.024^30');
  hasFormula(body, '1<1.024^30<10');
  hasFormula(body, '10^209<125^100<10^210');
  assert.match(body, /210 digits/i);
  assert.match(body, /binomial|geometric bound/i);
  assert.doesNotMatch(body, /log_?10\s*\(?125\)?\s*≈|calculator/i);
});

test('paired comparisons attain and prove the optimal extremes bound', async () => {
  const { text, metadata } = await page('src/content/problems/logic/minimum-comparisons-for-both-extremes.md');
  assert.deepEqual(metadata, comparisonsMetadata);
  const body = solution(text);
  hasFormula(body, 'ceil(3n/2)-2');
  assert.match(body, /even n/i);
  assert.match(body, /odd n/i);
  assert.match(body, /pair.*smaller.*minimum|larger.*maximum/is);
  assert.match(body, /lower bound|adversary|certificate/i);
  assert.match(body, /optimal/i);
});

test('algorithmic simplification Problems are S3+, complete, and source-neutral', async () => {
  for (const path of ['src/content/problems/logic/two-egg-threshold-search.md', 'src/content/problems/logic/large-power-digit-count-without-log-tables.md', 'src/content/problems/logic/minimum-comparisons-for-both-extremes.md']) {
    const { text, metadata } = await page(path);
    solution(text);
    assert.equal(metadata.insightDifficulty >= 3 || metadata.interviewDifficulty >= 3, true);
    assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
    assert.doesNotMatch(text, /150 Most Frequently Asked|Faberg|Question (?:8|16|23)|solution page|PDF page|source item/i);
  }
});
```

- [ ] **Step 2: Run focused RED**

```bash
node --test tests/quant-interview-problem-simplification-algorithms.test.mjs
```

Expected: FAIL with `ENOENT`, not syntax or fixture errors.

- [ ] **Step 3: Author the three complete Problems**

Use the metadata above. Each page must place `## Problem` and `## Think Before Revealing` before two substantive Hint disclosures and one `Show Solution` disclosure. Inside `Show Solution`, use the exact order `## Solution`, `## Why This Problem Matters`, `## Common Mistakes`, `## Extensions`. The egg solution must derive the general recurrence before specializing to two resources and must present an executable decreasing-step schedule. The digit proof must derive both strict inequalities without tabulated logarithms. The comparison solution must count even and odd algorithms separately and then prove a matching lower bound; an upper-bound algorithm alone is incomplete.

Use plain public nouns such as probes, levels, inputs, and comparisons. Do not use named source objects or mention source numbering.

- [ ] **Step 4: Run GREEN, the two content suites together, and diff checks**

```bash
node --test tests/quant-interview-problem-simplification-small-cases.test.mjs tests/quant-interview-problem-simplification-algorithms.test.mjs
git diff --check
git status --short
```

Expected: all focused tests pass and only the four Task 3 files changed since Task 2.

- [ ] **Step 5: Commit Task 3**

```bash
git add -- tests/quant-interview-problem-simplification-algorithms.test.mjs src/content/problems/logic/two-egg-threshold-search.md src/content/problems/logic/large-power-digit-count-without-log-tables.md src/content/problems/logic/minimum-comparisons-for-both-extremes.md
git commit -m "feat(quant-interview): add algorithmic simplification Problems"
```

### Task 4: Register catalog, reciprocal graph, and exact 81/56 public contract

**Files:**
- Create: `tests/quant-interview-problem-simplification-catalog.test.mjs`
- Modify: `src/data/quant-interview/topics/knowledge-catalog.json`
- Modify: `src/content/knowledge/concepts/recursion-problem-solving.md`
- Modify: `src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md`
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`

**Interfaces:**
- Consumes: all seven Task 1–3 public slugs and their frontmatter.
- Produces: exact published catalog projection, reciprocal graph, and 81/56 public contract for hidden mapping validation.

- [ ] **Step 1: Write failing catalog and graph tests**

Create the focused test:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const small = 'small-cases-recurrence-and-structural-simplification';
const fermi = 'fermi-estimation-assumption-decomposition';
const topics = ['logic-brainteasers-discrete-reasoning', 'problem-simplification'];

async function metadata(path) {
  const text = await readFile(path, 'utf8');
  return parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA });
}

test('Problem Simplification Knowledge modules have exact catalog order', async () => {
  const catalog = JSON.parse(await readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'));
  assert.deepEqual(catalog.modules.filter(({ primaryTopic }) => primaryTopic === 'problem-simplification'), [
    { slug: small, title: 'Small Cases, Recurrence & Structural Simplification', canonicalTopics: topics, primaryTopic: 'problem-simplification', learningOrder: 10, status: 'published', prerequisites: [] },
    { slug: fermi, title: 'Fermi Estimation & Assumption Decomposition', canonicalTopics: topics, primaryTopic: 'problem-simplification', learningOrder: 20, status: 'published', prerequisites: [small] },
  ]);
  assert.equal(catalog.modules.length, 56);
});

test('new and existing Knowledge pages expose the exact reciprocal graph', async () => {
  const pages = {
    [small]: await metadata(`src/content/knowledge/concepts/${small}.md`),
    [fermi]: await metadata(`src/content/knowledge/concepts/${fermi}.md`),
    recursion: await metadata('src/content/knowledge/concepts/recursion-problem-solving.md'),
    framing: await metadata('src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md'),
  };
  assert.deepEqual(pages[small].related, ['recursion-problem-solving', 'problem-framing-clarification-assumption-management', fermi]);
  assert.deepEqual(pages[fermi].related, [small, 'problem-framing-clarification-assumption-management']);
  assert.deepEqual(pages.recursion.related, [small]);
  assert.deepEqual(pages.framing.related, ['structured-think-aloud-reasoning', 'quant-interview-preparation-breadth-and-practice', 'quant-interview-formats-and-assessment-strategy', 'behavioral-interview-evidence-and-authenticity', small, fermi]);
});

test('public corpus contains exactly 81 Problems and 56 classified Knowledge nodes', async () => {
  const problemFiles = (await readdir('src/content/problems', { recursive: true })).filter((file) => String(file).endsWith('.md'));
  const catalog = JSON.parse(await readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'));
  assert.equal(problemFiles.length, 81);
  assert.equal(catalog.modules.length, 56);
});
```

- [ ] **Step 2: Extend the existing exact source-neutral contract first and verify RED**

Append these five literal slugs to `currentProblemSlugs` in `tests/quant-interview-source-neutral-content.test.mjs`:

```js
'sequential-voting-elimination-backward-induction',
'predator-replacement-parity',
'two-egg-threshold-search',
'large-power-digit-count-without-log-tables',
'minimum-comparisons-for-both-extremes',
```

Append the two Knowledge slugs to its exact classified-Knowledge fixture and change only expected public counts from 76/54 to 81/56. Run:

```bash
node --test tests/quant-interview-problem-simplification-catalog.test.mjs tests/quant-interview-source-neutral-content.test.mjs
```

Expected: catalog test fails because modules and reciprocal links are absent; the source-neutral suite must otherwise discover the seven new pages correctly.

- [ ] **Step 3: Register exact modules and reciprocal links**

Insert these modules after `recursion-problem-solving` and before unrelated sibling-topic modules:

```json
{
  "slug": "small-cases-recurrence-and-structural-simplification",
  "title": "Small Cases, Recurrence & Structural Simplification",
  "canonicalTopics": ["logic-brainteasers-discrete-reasoning", "problem-simplification"],
  "primaryTopic": "problem-simplification",
  "learningOrder": 10,
  "status": "published",
  "prerequisites": []
},
{
  "slug": "fermi-estimation-assumption-decomposition",
  "title": "Fermi Estimation & Assumption Decomposition",
  "canonicalTopics": ["logic-brainteasers-discrete-reasoning", "problem-simplification"],
  "primaryTopic": "problem-simplification",
  "learningOrder": 20,
  "status": "published",
  "prerequisites": ["small-cases-recurrence-and-structural-simplification"]
}
```

Change only the `related` arrays of the two existing Knowledge files to the literals asserted by the test. Preserve every other frontmatter field and body byte.

- [ ] **Step 4: Run GREEN and public graph validation**

```bash
node --test tests/quant-interview-problem-simplification-knowledge.test.mjs tests/quant-interview-problem-simplification-small-cases.test.mjs tests/quant-interview-problem-simplification-algorithms.test.mjs tests/quant-interview-problem-simplification-catalog.test.mjs tests/quant-interview-source-neutral-content.test.mjs
npm test
git diff --check
```

Expected: focused suites and the full suite pass with exact 81/56; no hidden coverage/master/HANDOFF state has changed yet.

- [ ] **Step 5: Review and commit Task 4**

Confirm the range changes exactly five files and that existing-page diffs touch only the two `related` lines. Then:

```bash
git add -- tests/quant-interview-problem-simplification-catalog.test.mjs tests/quant-interview-source-neutral-content.test.mjs src/data/quant-interview/topics/knowledge-catalog.json src/content/knowledge/concepts/recursion-problem-solving.md src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md
git commit -m "feat(quant-interview): register problem simplification graph"
```

### Task 5: Register active 018, exact eleven-row mappings, overrides, and page repairs

**Files:**
- Create: `tests/quant-interview-problem-simplification-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-problem-simplification-018.json`
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/coverage/red-book.json`
- Modify: `src/data/quant-interview/coverage/150-most-frequently-asked.json`
- Modify: `src/data/quant-interview/master-directory.json`

**Interfaces:**
- Consumes: exact seven public slugs and 81/56 catalog contract.
- Produces: evidence-free active manifest, eleven terminal source decisions, two topic overrides, and two page repairs for lifecycle integration.

- [ ] **Step 1: Write the failing exact active-manifest test**

Create the workstream test with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const id = 'logic-brainteasers-discrete-reasoning-problem-simplification-018';
const manifestPath = `src/data/quant-interview/workstreams/${id}.json`;
const keys = [
  'green-book::2.1::theory',
  'green-book::2.1.screwy-pirates::question',
  'green-book::2.1.tiger-and-sheep::question',
  'red-book::8::8.2',
  'red-book::8::8.5',
  'red-book::8::8.25',
  'red-book::8::8.26',
  '150-most-frequently-asked::2.7::8',
  '150-most-frequently-asked::2.7::16',
  '150-most-frequently-asked::2.7::23',
  '150-most-frequently-asked::2.7::30',
];

const expectedActiveManifest = {
  id,
  canonicalTopics: ['logic-brainteasers-discrete-reasoning', 'problem-simplification'],
  status: 'active',
  masterItemKeys: keys,
  sourceScopes: [
    {
      source: 'green-book',
      sourceSections: ['2.1', '2.1.screwy-pirates', '2.1.tiger-and-sheep'],
      evidencePageRanges: [{ startPage: 19, endPage: 21 }],
      reviewOutcome: 'complete-problem-simplification-topic-review',
      reviewNote: 'Three consecutive Green records establish the small-case method and two canonical recurrence or backward-induction Problems.',
    },
    {
      source: 'red-book', sourceSections: ['8'],
      evidencePageRanges: [{ startPage: 288, endPage: 293 }, { startPage: 307, endPage: 308 }],
      reviewOutcome: 'selective-problem-simplification-knowledge',
      reviewNote: 'Four Red prompts resolve to reusable simplification or Fermi-estimation Knowledge without creating low-depth or dated public Problems.',
    },
    {
      source: '150-most-frequently-asked', sourceSections: ['2.7'],
      evidencePageRanges: [{ startPage: 45, endPage: 49 }, { startPage: 182, endPage: 185 }, { startPage: 192, endPage: 194 }, { startPage: 199, endPage: 201 }, { startPage: 215, endPage: 216 }],
      reviewOutcome: 'canonical-problems-and-knowledge-check',
      reviewNote: 'Four Brainteaser items yield three canonical Problems and one structural Knowledge check, with two justified algorithmic topic refinements.',
    },
  ],
  publicDelta: { problems: 5, knowledge: 2 },
  knowledgeSlugs: ['small-cases-recurrence-and-structural-simplification', 'fermi-estimation-assumption-decomposition'],
};

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));

test('018 active manifest is exact and evidence-free', async () => {
  const manifest = await readJson(manifestPath);
  assert.deepEqual(manifest, expectedActiveManifest);
  for (const field of ['preClosureActiveGate', 'verification', 'finalTreeGate']) assert.equal(field in manifest, false);
});
```

Run the single test and require `ENOENT` for the missing manifest.

- [ ] **Step 2: Add failing literal disposition fixtures**

In the same test, define these exact terminal decisions and distinct notes:

```js
const small = 'small-cases-recurrence-and-structural-simplification';
const fermi = 'fermi-estimation-assumption-decomposition';
const decisions = [
  ['green-book::2.1::theory', 'knowledge-only', [], [small], 'Green Book 2.1 theory contributes the valid-small-case workflow, recurrence discipline, and pattern-to-proof boundary to canonical simplification Knowledge.'],
  ['green-book::2.1.screwy-pirates::question', 'canonical-problem', ['sequential-voting-elimination-backward-induction'], [small, 'recursion-problem-solving'], 'The sequential allocation vote becomes the canonical backward-induction Problem, with the recurrence and tie assumptions exposed rather than a source-named wrapper.'],
  ['green-book::2.1.tiger-and-sheep::question', 'canonical-problem', ['predator-replacement-parity'], [small], 'The replacement-predator process becomes the canonical parity-induction Problem, with action and preference assumptions made explicit.'],
  ['red-book::8::8.2', 'knowledge-only', [], [small], 'The mental-cube prompt is retained as a Knowledge check on arithmetic decomposition, not expanded into a low-depth public Problem.'],
  ['red-book::8::8.5', 'knowledge-only', [], [small], 'The exponential-growth prompt is retained as a Knowledge check on backing up from a known endpoint, not expanded into a trick page.'],
  ['red-book::8::8.25', 'knowledge-only', [], [fermi], 'The service-location estimate resolves to source-neutral Fermi-estimation Knowledge without publishing a dated country total.'],
  ['red-book::8::8.26', 'knowledge-only', [], [fermi], 'The specialized-provider estimate resolves to source-neutral Fermi-estimation Knowledge without publishing a dated city total.'],
  ['150-most-frequently-asked::2.7::8', 'canonical-problem', ['two-egg-threshold-search'], [small, 'recursion-problem-solving'], 'The two-resource threshold family becomes the canonical minimax recurrence Problem and receives a justified Dynamic Programming topic refinement.'],
  ['150-most-frequently-asked::2.7::16', 'canonical-problem', ['large-power-digit-count-without-log-tables'], [small], 'The large-power digit-count family becomes the canonical strict-bounds Problem without log tables or direct expansion.'],
  ['150-most-frequently-asked::2.7::23', 'canonical-problem', ['minimum-comparisons-for-both-extremes'], [small], 'The joint-extremes comparison family becomes the canonical optimal-comparison Problem and receives a justified Algorithmic Complexity topic refinement.'],
  ['150-most-frequently-asked::2.7::30', 'knowledge-only', [], [small], 'The round-cover prompt is retained as a Knowledge check on structural geometry, not expanded into a one-answer public Problem.'],
];
```

Load all three ledgers and the master directory. Build ledger keys as `${source}::${sourceSection}::${sourceItem ?? ''}` and master keys directly. For every tuple, assert exact `state`, `canonicalProblems`, `canonicalKnowledge`, `resolutionNote`, and workstream id on master. Assert the state histogram exactly `{ 'canonical-problem': 5, 'knowledge-only': 6 }` and source histogram exactly `{ 'green-book': 3, 'red-book': 4, '150-most-frequently-asked': 4 }`.

For 150 Q8 require coverage topics and reason:

```js
assert.deepEqual(q8.canonicalTopics, ['problem-simplification', 'dynamic-programming-algorithms']);
assert.equal(q8.topicOverrideReason, 'Item-level review identifies a minimax state recurrence with reusable subproblem structure, so this specific Brainteaser also belongs to Dynamic Programming.');
assert.deepEqual(masterQ8.canonicalTopics, ['logic-brainteasers-discrete-reasoning', 'problem-simplification', 'algorithms-data-structures-cpp', 'dynamic-programming-algorithms']);
```

For 150 Q23 require:

```js
assert.deepEqual(q23.canonicalTopics, ['problem-simplification', 'algorithmic-complexity']);
assert.equal(q23.topicOverrideReason, 'Item-level review identifies an optimal comparison algorithm plus matching lower bound, so this specific Brainteaser also belongs to Algorithmic Complexity.');
assert.deepEqual(masterQ23.canonicalTopics, ['logic-brainteasers-discrete-reasoning', 'problem-simplification', 'algorithms-data-structures-cpp', 'algorithmic-complexity']);
```

Assert every other coverage row has exactly `['problem-simplification']` and no `topicOverrideReason` added by 018.

- [ ] **Step 3: Add failing page and protected-map fixtures**

Assert exact pages for all eleven rows. The binding fixture is:

```js
const page = (startPage, endPage = startPage) => [{ startPage, endPage }];
const pages = {
  'green-book::2.1::theory': [page(19), []],
  'green-book::2.1.screwy-pirates::question': [page(19, 20), []],
  'green-book::2.1.tiger-and-sheep::question': [page(20, 21), []],
  'red-book::8::8.2': [page(288), page(291, 292)],
  'red-book::8::8.5': [page(288), page(293)],
  'red-book::8::8.25': [page(290), page(307)],
  'red-book::8::8.26': [page(290), page(308)],
  '150-most-frequently-asked::2.7::8': [page(45), page(182, 185)],
  '150-most-frequently-asked::2.7::16': [page(46), page(192, 194)],
  '150-most-frequently-asked::2.7::23': [page(48), page(199, 201)],
  '150-most-frequently-asked::2.7::30': [page(49), page(215)],
};
for (const [key, [questionPages, solutionPages]] of Object.entries(pages)) {
  const row = masterByKey.get(key);
  assert.deepEqual(row.questionPages, questionPages, `${key} question pages`);
  assert.deepEqual(row.solutionPages, solutionPages, `${key} solution pages`);
}
```

Freeze the source-topic map:

```js
const sourceMapText = await readFile('src/data/quant-interview/topics/source-topic-map.json', 'utf8');
assert.equal(createHash('sha256').update(sourceMapText).digest('hex'), '04f6bc640094ae774acfe5fe13b764a0a4bd155f18e1786a5b744f33cc9aceed');
```

Run:

```bash
node --test tests/quant-interview-problem-simplification-workstream.test.mjs
```

Expected: RED because the manifest is absent and all eleven source rows are still pending.

- [ ] **Step 4: Create the exact active manifest**

Write `expectedActiveManifest` byte-for-byte as JSON, preserving field order and keeping all completion evidence fields absent.

- [ ] **Step 5: Apply the eleven exact coverage/master decisions**

Update only the listed coverage entries and master rows. Copy exact arrays and notes from `decisions`. Set every master row's `workstream` to the 018 id. Apply the two coverage `topicOverrideReason` strings and expanded master topic paths only to 150 Q8 and Q23.

- [ ] **Step 6: Apply only the two page repairs**

Change only:

```text
red-book::8::8.25 solutionPages: [{ startPage: 307, endPage: 308 }] -> [{ startPage: 307, endPage: 307 }]
150-most-frequently-asked::2.7::30 solutionPages: [{ startPage: 215, endPage: 216 }] -> [{ startPage: 215, endPage: 215 }]
```

- [ ] **Step 7: Run focused GREEN, validators, and scope review**

```bash
node --test tests/quant-interview-problem-simplification-workstream.test.mjs
npm run master:directory:check
npm test
git diff --check
git diff --stat
git status --short
```

Expected: focused and full tests pass; exact Task 5 scope is six files; source-topic map, taxonomy, public content, source PDFs, and 001–017 manifests are unchanged.

- [ ] **Step 8: Commit Task 5**

```bash
git add -- tests/quant-interview-problem-simplification-workstream.test.mjs src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-problem-simplification-018.json src/data/quant-interview/coverage/green-book.json src/data/quant-interview/coverage/red-book.json src/data/quant-interview/coverage/150-most-frequently-asked.json src/data/quant-interview/master-directory.json
git commit -m "feat(quant-interview): activate problem simplification 018"
```

### Task 6: Reconcile active lifecycle, HANDOFF, directory, and current-state tests

**Files:**
- Create: `tests/quant-interview-problem-simplification-completion.test.mjs`
- Modify: `tests/quant-interview-master-directory-repository.test.mjs`
- Modify: `tests/quant-interview-behavioral-evidence-completion.test.mjs`
- Modify: `tests/quant-interview-behavioral-evidence-workstream.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: active evidence-free 018 manifest and complete eleven-row hidden state.
- Produces: phase-aware active/complete lifecycle contract, active HANDOFF, generated directory, and exact 81/56/239/511/Green-2.2 state.

- [ ] **Step 1: Write the failing phase-aware completion test**

Create:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const manifestPath = 'src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-problem-simplification-018.json';
const workflow = '.github/workflows/quant-interview-problem-simplification-018-temporary.yml';
const commands = ['npm test', 'npm run knowledge:directory:check', 'npm run master:directory:check', 'npm run check', 'npm run build'];
const activeCurrent = `**Logic, Brainteasers & Discrete Reasoning → Problem Simplification.**

Workstream 018 is active across the exact eleven-record cross-book Problem Simplification scope. Its public delta is +5 Problems / +2 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.`;
const completeCurrent = `**No bounded topic is active. Workstream 018 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 019 is not active or authorized by this closure.`;
const section = (text, heading) => text.split(new RegExp(`^## ${heading}$`, 'im'))[1]?.split(/^## /m)[0] ?? '';
const currentBlock = (handoff) => handoff.split(/Current bounded topic:/i)[1]?.split(/^## /m)[0]?.trim() ?? '';

test('018 lifecycle is evidence-free while active and factually strict when complete', async () => {
  const [manifest, handoff] = await Promise.all([readFile(manifestPath, 'utf8').then(JSON.parse), readFile('docs/quant-interview/HANDOFF.md', 'utf8')]);
  assert.match(manifest.status, /^(?:active|complete)$/);
  if (manifest.status === 'active') {
    for (const field of ['preClosureActiveGate', 'verification', 'finalTreeGate']) assert.equal(field in manifest, false);
    assert.equal(currentBlock(handoff), activeCurrent);
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 18$/m);
    assert.match(handoff, /First pending master record after the active 018 scope: `green-book::2\.2::theory`/i);
    return;
  }
  const { preClosureActiveGate: gate, verification, finalTreeGate } = manifest;
  assert.equal(gate.status, 'active');
  assert.match(gate.commit, /^[0-9a-f]{40}$/);
  assert.equal(gate.environment, 'wsl-native-lf-node24');
  assert.deepEqual(gate.commands, commands);
  assert.equal(gate.conclusion, 'success');
  assert.equal(verification.commit, gate.commit);
  assert.equal(Number.isSafeInteger(verification.runId) && verification.runId > 0, true);
  assert.deepEqual(verification.commands, commands);
  assert.deepEqual(verification.temporaryArtifacts, [workflow]);
  assert.deepEqual(finalTreeGate, { environment: 'wsl-native-lf-node24', commands, conclusion: 'success', temporaryArtifactsAbsent: true });
  await assert.rejects(access(workflow), (error) => error?.code === 'ENOENT');
  assert.equal(currentBlock(handoff), completeCurrent);
  assert.match(handoff, /^## Completed cross-book workstream 18$/m);
  assert.match(handoff, /First pending master record: `green-book::2\.2::theory`/i);
});

test('018 alone advances the exact public and master contracts without 019', async () => {
  const directory = JSON.parse(await readFile('src/data/quant-interview/master-directory.json', 'utf8'));
  const terminal = directory.items.filter(({ state }) => !['pending', 'needs-review'].includes(state)).length;
  assert.equal(terminal, 239);
  assert.equal(directory.items.length - terminal, 511);
  const workstreams = await readdir('src/data/quant-interview/workstreams');
  assert.equal(workstreams.some((file) => /-019\.json$/.test(file)), false);
});
```

Run the focused completion test. Expected RED because HANDOFF and generated directory still record completed 017/no 018.

- [ ] **Step 2: Update exact repository counts and workstream registry tests**

In `tests/quant-interview-master-directory-repository.test.mjs`:

- rename the cumulative test to include 018;
- require `problemSlugs.size === 81`, `knowledgeSlugs.size === 56`;
- require workstream 018 exact `publicDelta: { problems: 5, knowledge: 2 }` and exact two `knowledgeSlugs`;
- append the exact 018 id to the sorted registry fixture;
- replace the old “017 blocks 018” test with a phase-aware 018 test that requires 017 complete, 018 active-or-complete, first pending `green-book::2.2::theory`, and no 019.

Use this current-state branch:

```js
if (workstream018.status === 'active') {
  assert.match(current, /Logic, Brainteasers.*Problem Simplification/is);
  assert.match(current, /Workstream 018 is active/i);
  assert.doesNotMatch(handoff, /^## Completed cross-book workstream 18$/m);
  assert.match(handoff, /First pending master record after the active 018 scope: `green-book::2\.2::theory`/i);
} else {
  assert.match(handoff, /^## Completed cross-book workstream 18$/m);
  assert.doesNotMatch(current, /Workstream 018 is active/i);
  assert.match(handoff, /First pending master record: `green-book::2\.2::theory`/i);
}
```

- [ ] **Step 3: Make completed 017 tests historical instead of stale-current**

In `quant-interview-behavioral-evidence-completion.test.mjs`, preserve every exact 017 SHA/run/closure assertion but allow the current block and first pending record to belong to 018 when the 018 manifest exists. Never weaken the completed-017 evidence assertions.

In `quant-interview-behavioral-evidence-workstream.test.mjs`, replace only the final current-corpus test with a historical durability test:

```js
test('017 remains durable after 018 advances the corpus', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  const manifest017 = inputs.workstreams.find(({ id }) => /-017$/.test(id));
  const manifest018 = inputs.workstreams.find(({ id }) => /-018$/.test(id));
  assert.equal(manifest017.status, 'complete');
  assert.deepEqual(manifest017.publicDelta, { problems: 0, knowledge: 1 });
  assert.match(manifest018.status, /^(?:active|complete)$/);
  assert.equal(inputs.problemSlugs.size, 81);
  assert.equal(inputs.knowledgeSlugs.size, 56);
  assert.equal(getNextPendingItem(inputs.directory)?.key, 'green-book::2.2::theory');
});
```

In `quant-interview-handoff.test.mjs`, extend only the nested latest-workstream branch: after completed 017, load 018 and require active/complete current-state wording. Preserve all earlier workstream branches.

- [ ] **Step 4: Write the active-018 HANDOFF section**

Add `## Active cross-book workstream 18` after completed 17. It must include:

- exact id and active/evidence-free status;
- exact three-source 3/4/4 scope and all eleven keys;
- two Knowledge titles/slugs and five Problem titles/slugs;
- exact 5 canonical-problem / 6 knowledge-only split;
- exact two topic overrides and two page repairs;
- exact 81/56 and 239/511 state;
- source-neutral/Fermi/no-low-value-Problem boundaries;
- an explicit statement that 018 alone is bounded and 019 is unauthorized.

Replace the current block with `activeCurrent`. Replace master state with:

```markdown
**Workstream 018 owns the exact eleven-record Problem Simplification scope. The three-book master directory migration remains complete.**

First pending master record after the active 018 scope: `green-book::2.2::theory`

Workstream 019 is not active or authorized.
```

- [ ] **Step 5: Regenerate and verify the Knowledge directory**

```bash
npm run knowledge:directory
npm run knowledge:directory:check
npm run master:directory:check
```

Require generated summary 56 Knowledge, 81 Problems, 239 terminal, 511 pending, first pending Green 2.2, and active 018.

- [ ] **Step 6: Run active lifecycle GREEN and the full suite**

```bash
node --test tests/quant-interview-problem-simplification-completion.test.mjs tests/quant-interview-problem-simplification-workstream.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-behavioral-evidence-completion.test.mjs tests/quant-interview-behavioral-evidence-workstream.test.mjs tests/quant-interview-handoff.test.mjs tests/quant-interview-knowledge-directory.test.mjs
npm test
git diff --check
git status --short
```

Expected: all tests pass; active manifest still has no evidence; no workflow or 019 exists.

- [ ] **Step 7: Commit Task 6**

```bash
git add -- tests/quant-interview-problem-simplification-completion.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-behavioral-evidence-completion.test.mjs tests/quant-interview-behavioral-evidence-workstream.test.mjs tests/quant-interview-handoff.test.mjs docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md
git commit -m "docs(quant-interview): record active problem simplification 018"
```

### Task 7: Prove immutable active 018 in Windows, WSL, and real CI

**Files:**
- Create: `.github/workflows/quant-interview-problem-simplification-018-temporary.yml`
- Modify only focused 018 tests/content/data if a real gate exposes a defect; any fix creates a new candidate SHA and restarts this task.

**Interfaces:**
- Consumes: integrated evidence-free active 018 tree.
- Produces: one immutable full `ACTIVE_SHA`, one matching successful numeric `RUN_ID`, and exact Windows/WSL/CI evidence for Task 8.

- [ ] **Step 1: Create the exact temporary workflow**

```yaml
name: Quant Interview Problem Simplification 018 Temporary CI

on:
  push:
    branches:
      - codex/quant-interview-problem-simplification-018
  workflow_dispatch:

permissions:
  contents: read

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run knowledge:directory:check
      - run: npm run master:directory:check
      - run: npm run check
      - run: npm run build
```

- [ ] **Step 2: Run the five Windows gates separately**

```bash
npm test
npm run knowledge:directory:check
npm run master:directory:check
npm run check
npm run build
```

Require every exit 0. Record exact test count, Astro diagnostics, and built-page count. Then run:

```bash
git diff --check
git status --short
git add -- .github/workflows/quant-interview-problem-simplification-018-temporary.yml
git commit -m "ci(quant-interview): verify active problem simplification 018"
git rev-parse HEAD
```

Save the 40-character result as `ACTIVE_SHA`. Never amend, rebase, or force-update this commit after evidence collection starts.

- [ ] **Step 3: Prove the exact active SHA in fresh WSL native-LF Node 24**

Create one detached WSL-native worktree under an exact task-specific path outside the Windows checkout. Verify:

- `node --version` is Node 24;
- `git rev-parse HEAD` equals `ACTIVE_SHA`;
- tracked text has no CRLF/mixed EOL;
- the manifest is `active` and lacks all completion evidence fields;
- the temporary workflow exists and is LF-only;
- all five ordered gates pass;
- public counts are 81/56;
- master counts are 239/511 and first pending is Green 2.2;
- source split is 3/4/4 and state split is 5/6;
- only the two approved page repairs exist;
- no 019, tracked source media, rendered pages, or guide exists;
- detached proof worktree is clean.

Remove only the exact WSL proof path and registration. Never run WSL `git worktree prune` against the Windows repository.

- [ ] **Step 4: Push only the feature branch and capture the exact CI run**

```bash
git push -u origin codex/quant-interview-problem-simplification-018
gh run list --workflow quant-interview-problem-simplification-018-temporary.yml --branch codex/quant-interview-problem-simplification-018 --limit 5 --json databaseId,headSha,status,conclusion,url
```

Select only a run whose `headSha` equals `ACTIVE_SHA`. Watch it with exit status, inspect logs, and require `npm ci` plus all five ordered gates to succeed. Save `databaseId` as numeric `RUN_ID`.

- [ ] **Step 5: Prove immutable identity and write the task evidence report**

Require all three values to match:

```bash
git rev-parse HEAD
git ls-remote --heads origin codex/quant-interview-problem-simplification-018
gh run view RUN_ID --json headSha,status,conclusion,url
```

Write the ignored SDD task report with Windows outputs, WSL path/version/gates/cleanup, CI URL/run/head, local/remote/CI equality, warnings, and exact scope. Do not add the report to Git.

- [ ] **Step 6: Restart proof after any failure**

If any gate exposes a real defect, write a focused failing regression, fix it, run GREEN, create a new commit, and repeat all Windows/WSL/CI steps with a new `ACTIVE_SHA`. Never record a stale or partly successful proof.

### Task 8: Remove temporary CI, close 018, verify final tree, review, and deliver

**Files:**
- Delete: `.github/workflows/quant-interview-problem-simplification-018-temporary.yml`
- Modify: `src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-problem-simplification-018.json`
- Modify: `tests/quant-interview-problem-simplification-workstream.test.mjs`
- Modify: `tests/quant-interview-problem-simplification-completion.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: factual immutable `ACTIVE_SHA` and matching numeric `RUN_ID` from Task 7.
- Produces: workflow-free complete 018 branch, exact closure evidence, final review approval, pushed feature ref, and the standard integration choice.

- [ ] **Step 1: Delete the temporary workflow in a dedicated commit**

```bash
git rm -- .github/workflows/quant-interview-problem-simplification-018-temporary.yml
git commit -m "chore(quant-interview): remove problem simplification 018 temporary CI"
git rev-parse HEAD
```

The commit must delete exactly one file and leave the manifest active/evidence-free.

- [ ] **Step 2: Verify the exact workflow-free active commit in fresh WSL**

At the removal commit, require workflow absence, active/evidence-free manifest, Node 24, LF-only tracked text, all five ordered gates, 81/56, 239/511, Green 2.2, exact eleven rows, exact two repairs, no 019, no source media, and clean detached state. Remove only the exact proof path and registration; do not prune the Windows repository.

- [ ] **Step 3: Make the workstream test lifecycle-conditional**

Replace the active-only deep equality with:

```js
test('018 manifest preserves immutable scope across the lifecycle', async () => {
  const manifest = await readJson(manifestPath);
  if (manifest.status === 'active') {
    assert.deepEqual(manifest, expectedActiveManifest);
    return;
  }
  assert.equal(manifest.status, 'complete');
  const { preClosureActiveGate, verification, finalTreeGate, ...immutable } = manifest;
  const { status: _activeStatus, ...immutableActive } = expectedActiveManifest;
  assert.deepEqual(immutable, { ...immutableActive, status: 'complete' });
  assert.ok(preClosureActiveGate && verification && finalTreeGate);
});
```

Keep exact evidence validation in `quant-interview-problem-simplification-completion.test.mjs`; do not duplicate weaker regex-only checks.

- [ ] **Step 4: Record exact factual completion evidence**

Set `status` to `complete` and append these exact structures using Task 7 facts:

```js
const evidence = {
  preClosureActiveGate: {
    status: 'active', commit: ACTIVE_SHA, environment: 'wsl-native-lf-node24',
    commands: ['npm test', 'npm run knowledge:directory:check', 'npm run master:directory:check', 'npm run check', 'npm run build'],
    conclusion: 'success',
  },
  verification: {
    commit: ACTIVE_SHA, runId: RUN_ID,
    commands: ['npm test', 'npm run knowledge:directory:check', 'npm run master:directory:check', 'npm run check', 'npm run build'],
    conclusion: 'success',
    temporaryArtifacts: ['.github/workflows/quant-interview-problem-simplification-018-temporary.yml'],
  },
  finalTreeGate: {
    environment: 'wsl-native-lf-node24',
    commands: ['npm test', 'npm run knowledge:directory:check', 'npm run master:directory:check', 'npm run check', 'npm run build'],
    conclusion: 'success', temporaryArtifactsAbsent: true,
  },
};
```

Here `ACTIVE_SHA` and `RUN_ID` are the exact typed values produced by Task 7. Serialize `ACTIVE_SHA` as a 40-character string and `RUN_ID` as a positive JSON number.

- [ ] **Step 5: Write completed-018 HANDOFF and regenerate directory**

Rename the active section to `## Completed cross-book workstream 18`. Include exact active SHA, run id, CI URL, WSL/Windows/CI environments, five commands, all seven public outputs, exact eleven dispositions, both topic overrides, both page repairs, 81/56, 239/511, and the source-neutral/Fermi boundary.

Use this final current state exactly:

```markdown
Current bounded topic:

**No bounded topic is active. Workstream 018 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 019 is not active or authorized by this closure.

## Master directory ingestion state

**No bounded ingestion workstream is active. The three-book master directory migration remains complete.**

First pending master record: `green-book::2.2::theory`

Workstream 019 is not active or authorized.
```

Then run:

```bash
npm run knowledge:directory
npm run knowledge:directory:check
npm run master:directory:check
```

- [ ] **Step 6: Add a strict final-state test, observe RED, then run closure GREEN**

Before changing the manifest or HANDOFF, append this test and run it against the still-active tree:

```js
test('018 final tree is complete and workflow-free', async () => {
  const [manifest, handoff] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
  ]);
  assert.equal(manifest.status, 'complete');
  assert.match(handoff, /^## Completed cross-book workstream 18$/m);
  assert.equal(currentBlock(handoff), completeCurrent);
  await assert.rejects(access(workflow), (error) => error?.code === 'ENOENT');
});
```

Run the focused test and require RED specifically because actual status is `active`. Then apply Steps 3–5 and run:

```bash
node --test tests/quant-interview-problem-simplification-completion.test.mjs tests/quant-interview-problem-simplification-workstream.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-handoff.test.mjs tests/quant-interview-knowledge-directory.test.mjs
npm test
git diff --check
git status --short
```

Stage only closure files:

```bash
git add -- src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-problem-simplification-018.json tests/quant-interview-problem-simplification-workstream.test.mjs tests/quant-interview-problem-simplification-completion.test.mjs docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md
git commit -m "docs(quant-interview): close problem simplification 018"
```

- [ ] **Step 7: Run final exact-head Windows and WSL gates**

At the closure SHA run the five Windows commands separately in the specified order. Then verify the exact closure SHA in a fresh WSL native-LF Node 24 worktree with workflow absent and complete 018 evidence exact. Require 81/56, 239/511, Green 2.2, no 019, exact mappings/repairs/graph, clean LF tree, no tracked source media, and safe exact-path cleanup.

- [ ] **Step 8: Perform the full branch review**

Review from the implementation-plan base through closure:

- exactly two Knowledge and five Problems with full public contracts;
- exact reciprocal graph and catalog orders;
- exact eleven-key 3/4/4 scope and 5/6 state split;
- exact Q8/Q23 topic overrides and reasons;
- exactly two page repairs;
- active proof SHA/run equality and workflow-free closure;
- phase-aware historical 017 tests without weakened evidence;
- protected taxonomy/source-map/dependencies/source media/001–017 state;
- no 019 and no unrelated changes.

Use the requesting-code-review workflow and resolve every Critical or Important finding with focused TDD and re-review. Run a fresh full suite after the final reviewed commit.

- [ ] **Step 9: Push final feature head and prove remote equality**

```bash
git push origin codex/quant-interview-problem-simplification-018
git rev-parse HEAD
git rev-parse '@{upstream}'
git ls-remote --heads origin codex/quant-interview-problem-simplification-018
git status --short
```

Require all three SHAs equal and a clean tracked tree. Never push `main`, force-push, merge, create a PR, or remove the worktree before the user chooses.

- [ ] **Step 10: Offer the standard integration choice**

Invoke `finishing-a-development-branch` and present exactly:

```text
Implementation complete. What would you like to do?

1. Merge back to main locally
2. Push and create a Pull Request
3. Keep the branch as-is (I'll handle it later)

Which option?
```
