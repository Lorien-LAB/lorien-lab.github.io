# Quant Interview Limits & Derivatives Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and factually close the bounded `Calculus & Differential Equations -> Limits & Derivatives` workstream with exactly seven new source-neutral Knowledge nodes, 13 new S3+ Problems, and 20 terminal source rows split exactly `12 canonical-problem / 6 merged-duplicate / 2 knowledge-only`.

**Architecture:** Phase A is a create-only candidate: it adds only the seven Knowledge pages, 13 Problem pages, and one module-content test, then reports proposed shared deltas without editing coordinator-owned state. Phase B starts only after workstream 011 is durably complete at `63 Problems / 41 Knowledge`; the coordinator ports the candidate files, repairs exactly two Red source mappings, reconciles the three ledgers and an active manifest, extends the exact registry to `76/48`, keeps all lifecycle tests phase-safe, obtains factual Ubuntu/Node 24 CI for the exact active integrated commit, and closes in a later workflow-free metadata/HANDOFF commit.

**Tech Stack:** Astro 5 content collections, Markdown/YAML frontmatter, JSON workstream/coverage data, JavaScript ES modules, Node 24 built-in test runner, TypeScript/Astro checks, Git, GitHub Actions on Ubuntu.

**Spec:** `docs/superpowers/specs/2026-08-24-quant-interview-limits-derivatives-design.md`

## Global Constraints

- Workstream id: `calculus-differential-equations-limits-derivatives-012`.
- Candidate branch: `chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23`.
- Durable coordinator ref: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`.
- Coordinator integration ref: `chatgpt/quant-interview-integration-limits-derivatives-2026-08-24`.
- Frozen candidate base: `f41880f220991f43d84ddb3795a59b8688e5230c`; the approved spec/plan commit descends from that base.
- Serialized order is exact: workstream `011`, then `012`, then `013`; do not integrate 012 until 011 is `complete` and the exact registry is `63 Problems / 41 Knowledge`.
- The protected `main` branch is never modified directly. Do not force-update, rebase, amend, reset, or otherwise rewrite candidate, coordinator, shared, or durable history.
- Candidate ownership is create-only: exactly seven new Knowledge files, 13 new Problem files, and `tests/quant-interview-limits-derivatives-content.test.mjs`. The candidate edits no pre-existing public page, coverage ledger, source-topic map, workstream manifest, global registry test, HANDOFF, governance/completion test, or workflow.
- Coordinator ownership covers all shared ledgers, the two source-map repairs, the 012 manifest, global registry regression, workstream/completion/governance/HANDOFF tests, HANDOFF, temporary CI, integration, and factual closure.
- Public prose, frontmatter, titles, routes, and `problemId` values are source-neutral: no source/book names, source section/item numbers, question/solution/PDF pages, source ordering, audit state, or deduplication metadata.
- No taxonomy delta, no pre-existing public-content delta, and no final CI-workflow delta are allowed.
- Every Knowledge page uses `date: 2026-08-24`, `type: concept`, `domain: Mathematics & Statistics`, `status: growing`, `quantInterviewTopics: [calculus-differential-equations, limits-derivatives]`, and `featured: false`; it includes domain conditions, derivation/proof, recognition signals, realistic `## Common Mistakes`, and visible `## Interview Checks`.
- Every Problem uses `date: 2026-08-24`, `domain: Mathematics & Statistics`, `category: Calculus`, `quantInterviewTopics: [calculus-differential-equations, limits-derivatives]`, `status: solved`, and `featured: false`.
- Every Problem is S3+: `## Problem`, `## Think Before Revealing`, progressive `Hint 1` and `Hint 2` disclosures, and one `Show Solution` disclosure containing `## Solution`, `## Why This Matters`, `## Common Mistakes`, and `## Extensions`.
- YAML titles are plain text. Problem 002's title is exactly `Compare Two Transcendental Powers`; `e^pi`, `pi^e`, TeX, and mathematical notation appear only in its rendered body.
- Preserve the exact public graph: the two exponential-inequality Problems are reciprocal; the two growth-limit Problems are reciprocal; continued fraction, nested radical, and power tower are a reciprocal three-Problem family; the two derivative Problems are reciprocal. Do not edit a pre-existing public graph node.
- Preserve every audited formula, domain, sign, unit, branch, method boundary, and convergence proof in the spec. In particular: differentiable `u:I->(0,infinity)` and differentiable `v`; `x^x` on `x>0`; log-power on `x>1`; `x ln x` on `x>0`; lighthouse angular rate `2 pi` radians/minute; radical coefficient `5` and limit `5/2`; continued fraction `c_0=2`, `c_(n+1)=2+2/c_n`, limit `1+sqrt(3)`; Normal `sigma>0` with exact density factors and a real sign change; derivative of `e^{cos x}` from the exact difference quotient with no Taylor series; tower base `sqrt(2)`, limit `2`, branch `4` rejected by the proved bound; and the exact harmonic/square/logarithmic-harmonic series triple without integration.
- L'Hopital use requires a `0/0` or extended-real infinity-over-infinity quotient, differentiability on the appropriate punctured neighborhood, nonzero denominator derivative there, and existence of the ordinary or extended-real derivative-quotient limit. Renew every gate before repeated use.
- Continued-fraction, nested-radical, and tower pages prove convergence before passing to a fixed-point equation. A fixed-point equation supplies candidates, not convergence.
- `f''=0` alone proves neither an extremum nor an inflection point. The Normal CDF page must prove the positive-to-negative sign change around `mu`.
- The `x^2 ln x` limit is `0^-`, not an unsigned zero.
- Authoritative local evidence comes only from Node 24 in an LF-normalized native-Linux checkout or a WSL checkout stored on a WSL-native filesystem such as `/home` or `/tmp`. Native Windows and WSL over `/mnt/c` are diagnostic only.
- Establish frozen-base green evidence before accepting candidate evidence. The ordered authoritative gates are `npm run test`, `npm run check`, `npm run build`.
- Candidate discovery is exactly `72 Problems / 46 Knowledge` on the frozen `59/39` base. Candidate `npm run test` may fail only the exact stale `59/39` count/set subtest in `tests/quant-interview-source-neutral-content.test.mjs`; module, schema, relationship, governance, handoff, coverage, and unrelated failures block handoff.
- Integrated active discovery is exactly `76 Problems / 48 Knowledge` on the completed post-011 `63/41` base. Integrated active and final closure gates are fully green; no waiver remains after coordinator reconciliation.
- Temporary CI may use only `.github/workflows/quant-interview-limits-derivatives-012-temporary.yml`, Ubuntu, and Node 24, running `npm ci`, `npm run test`, `npm run check`, `npm run build` in that order.
- The CI `head_sha`, `preClosureActiveGate.commit`, and `verification.commit` are the same factual active integrated SHA. The later workflow-removal/metadata/HANDOFF closure commit is distinct and must not be described as the CI-tested SHA.
- While 012 is `active`, omit `preClosureActiveGate` and `verification`, keep HANDOFF/current reservation on 012, preserve 011 as complete, and keep 013 premature. Only factual successful CI permits `complete` and the advance to 013, Reasoning & Communication.
- Final verification commands are `npm run test`, `npm run check`, and `npm run build`; run them fresh after removing temporary CI and writing factual closure state.

---

## File Structure Map

### Candidate-created public Knowledge

```text
src/content/knowledge/concepts/
|-- derivative-definition-and-core-rules.md
|-- logarithmic-differentiation.md
|-- monotonicity-convexity-critical-points-and-inflection.md
|-- indeterminate-limits-and-growth-rates.md
|-- related-rates-and-implicit-differentiation.md
|-- bounded-monotone-convergence-and-fixed-points.md
`-- positive-series-convergence.md
```

### Candidate-created public Problems

```text
src/content/problems/calculus/
|-- differentiate-variable-base-and-exponent.md
|-- compare-e-pi-power-expressions.md
|-- exponential-over-polynomial-limit.md
|-- logarithm-power-limit-at-zero.md
|-- rotating-lighthouse-beam-related-rate.md
|-- radical-difference-limit-at-infinity.md
|-- exponential-midpoint-convexity.md
|-- periodic-continued-fraction-limit.md
|-- normal-cdf-inflection-point.md
|-- derive-exponential-cosine-derivative-from-definition.md
|-- nested-radical-limit.md
|-- infinite-power-tower-limit.md
`-- classify-basic-positive-series.md
```

### Candidate-created test

```text
tests/quant-interview-limits-derivatives-content.test.mjs
```

### Coordinator-created or modified shared state

```text
src/data/quant-interview/topics/source-topic-map.json
src/data/quant-interview/coverage/green-book.json
src/data/quant-interview/coverage/red-book.json
src/data/quant-interview/coverage/150-most-frequently-asked.json
src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json
tests/quant-interview-source-neutral-content.test.mjs
tests/quant-interview-limits-derivatives-workstream.test.mjs
tests/quant-interview-limits-derivatives-completion.test.mjs
tests/quant-interview-parallel-workstream-governance.test.mjs
tests/quant-interview-handoff.test.mjs
tests/quant-interview-random-walks-markov-chains-completion.test.mjs
docs/quant-interview/HANDOFF.md
```

### Coordinator-only temporary verification file

```text
.github/workflows/quant-interview-limits-derivatives-012-temporary.yml
```

It exists only on the active integrated commit used for CI and is absent from the closure tree.

---

## Phase A — Candidate Create-Only Module

### Task 1: Establish Frozen-Base Evidence and Build the Derivative Foundations

**Files:**
- Create: `tests/quant-interview-limits-derivatives-content.test.mjs`
- Create: `src/content/knowledge/concepts/derivative-definition-and-core-rules.md`
- Create: `src/content/knowledge/concepts/logarithmic-differentiation.md`
- Create: `src/content/problems/calculus/differentiate-variable-base-and-exponent.md`

**Interfaces:**
- Consumes: frozen base `f41880f220991f43d84ddb3795a59b8688e5230c`, Astro Knowledge/Problem schemas in `src/content.config.ts`, and standard derivative limits.
- Produces: reusable test helpers `readPage(path) -> Promise<{ text: string, frontmatter: string }>`, `assertKnowledgePage(page, expected) -> void`, `assertProblemPage(page, expected) -> void`, `assertMath(text, expected, label) -> void`, and the slugs `derivative-definition-and-core-rules`, `logarithmic-differentiation`, `differentiate-variable-base-and-exponent` used by later tasks.

- [ ] **Step 1: Prove the frozen base green in an authoritative checkout**

From a native Linux shell or WSL with the checkout itself under a native path, create an isolated verification clone and detach at the exact frozen base:

```bash
verify_root="$(mktemp -d)"
git clone "$(git remote get-url origin)" "$verify_root/repo"
git -C "$verify_root/repo" config core.autocrlf false
git -C "$verify_root/repo" checkout --detach f41880f220991f43d84ddb3795a59b8688e5230c
cd "$verify_root/repo"
node --version | grep -Eq '^v24\.'
test -z "$(git grep -Il $'\r' -- '*.md' '*.mjs' '*.js' '*.json' '*.yml' '*.yaml' '*.astro' '*.ts' '*.tsx' '*.css' || true)"
npm ci
npm run test
npm run check
npm run build
```

Expected: all three ordered repository gates pass on Node 24. Record the commit, `node --version`, native checkout path, and three exit codes in the candidate handoff notes; do not commit generated evidence. If any command fails, stop before authoring content.

- [ ] **Step 2: Create the module test harness and derivative RED contracts**

Create `tests/quant-interview-limits-derivatives-content.test.mjs` with these imports and helpers:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const topicArray = ['calculus-differential-equations', 'limits-derivatives'];
const publicBoundary = /Green Book|Red Book|150 Most Frequently Asked|source item|source section|PDF page|question page|solution page|coverage ledger|merged-duplicate/i;

async function readPage(file) {
  const text = await readFile(file, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  assert.ok(match, `${file} missing YAML frontmatter`);
  return { text, frontmatter: match[1] };
}

function scalar(frontmatter, field) {
  return frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'))?.[1]?.trim();
}

function inlineArray(frontmatter, field) {
  const value = scalar(frontmatter, field);
  if (value === '[]') return [];
  const match = value?.match(/^\[([^\]]*)\]$/);
  assert.ok(match, `${field} must use an inline YAML array`);
  return match[1].split(',').map((item) => item.trim()).filter(Boolean);
}

function normalizedMath(value) {
  return value
    .replace(/\r/g, '')
    .replace(/\\(?:left|right)/g, '')
    .replace(/\s+/g, '');
}

function assertMath(text, expected, label) {
  assert.ok(
    normalizedMath(text).includes(normalizedMath(expected)),
    `${label} missing exact mathematical contract: ${expected}`,
  );
}

function assertBefore(text, first, second, label) {
  const firstIndex = text.search(first);
  const secondIndex = text.search(second);
  assert.ok(firstIndex >= 0 && secondIndex >= 0 && firstIndex < secondIndex, label);
}

function assertPublicBoundary(text, frontmatter, slug) {
  assert.doesNotMatch(text, publicBoundary, `${slug} exposes private source/audit identity`);
  assert.doesNotMatch(
    frontmatter,
    /^(?:originType|source|sourceSection|sourceChapter|sourceProblem|sourceReference|sourceUrl):/m,
    `${slug} exposes provenance frontmatter`,
  );
}

function assertKnowledgePage(page, expected) {
  const { text, frontmatter } = page;
  assert.equal(scalar(frontmatter, 'title'), expected.title);
  assert.equal(scalar(frontmatter, 'description'), expected.description);
  assert.equal(scalar(frontmatter, 'date'), '2026-08-24');
  assert.equal(scalar(frontmatter, 'type'), 'concept');
  assert.equal(scalar(frontmatter, 'domain'), 'Mathematics & Statistics');
  assert.equal(scalar(frontmatter, 'category'), expected.category);
  assert.equal(scalar(frontmatter, 'status'), 'growing');
  assert.deepEqual(inlineArray(frontmatter, 'tags'), expected.tags);
  assert.deepEqual(inlineArray(frontmatter, 'quantInterviewTopics'), topicArray);
  assert.equal(scalar(frontmatter, 'featured'), 'false');
  assert.deepEqual(inlineArray(frontmatter, 'related'), expected.related);
  assert.deepEqual(inlineArray(frontmatter, 'relatedNotes'), []);
  assert.match(text, /^## Common Mistakes$/m);
  assert.match(text, /^## Interview Checks$/m);
  assertPublicBoundary(text, frontmatter, expected.slug);
}

function assertProblemPage(page, expected) {
  const { text, frontmatter } = page;
  assert.equal(scalar(frontmatter, 'problemId'), expected.problemId);
  assert.equal(scalar(frontmatter, 'title'), expected.title);
  assert.doesNotMatch(expected.title, /[$\\{}^]/, `${expected.problemId} title contains math notation`);
  assert.equal(scalar(frontmatter, 'description'), expected.description);
  assert.equal(scalar(frontmatter, 'date'), '2026-08-24');
  assert.equal(scalar(frontmatter, 'domain'), 'Mathematics & Statistics');
  assert.equal(scalar(frontmatter, 'category'), 'Calculus');
  for (const field of ['subcategories', 'tags', 'concepts', 'techniques', 'prerequisites', 'relatedProblems']) {
    assert.deepEqual(inlineArray(frontmatter, field), expected[field], `${expected.problemId} ${field}`);
  }
  assert.deepEqual(inlineArray(frontmatter, 'quantInterviewTopics'), topicArray);
  assert.equal(scalar(frontmatter, 'family'), expected.family);
  for (const field of ['mathDifficulty', 'insightDifficulty', 'interviewDifficulty', 'estimatedMinutes']) {
    assert.equal(Number(scalar(frontmatter, field)), expected[field], `${expected.problemId} ${field}`);
  }
  assert.equal(scalar(frontmatter, 'status'), 'solved');
  assert.equal(scalar(frontmatter, 'featured'), 'false');
  for (const heading of ['## Problem', '## Think Before Revealing']) assert.match(text, new RegExp(`^${heading}$`, 'm'));
  assert.match(text, /<summary>Hint 1<\/summary>/);
  assert.match(text, /<summary>Hint 2<\/summary>/);
  const solutionStart = text.indexOf('<summary>Show Solution</summary>');
  assert.ok(solutionStart >= 0, `${expected.problemId} missing Show Solution disclosure`);
  const solution = text.slice(solutionStart);
  for (const heading of ['## Solution', '## Why This Matters', '## Common Mistakes', '## Extensions']) {
    assert.match(solution, new RegExp(`^${heading}$`, 'm'), `${expected.problemId} solution disclosure missing ${heading}`);
  }
  assertPublicBoundary(text, frontmatter, expected.problemId);
}
```

Append these concrete RED tests:

```js
test('core derivative Knowledge freezes first-principles rules and the x ln x Interview Check', async () => {
  const page = await readPage('src/content/knowledge/concepts/derivative-definition-and-core-rules.md');
  assertKnowledgePage(page, {
    slug: 'derivative-definition-and-core-rules',
    title: 'Derivative Definition and Core Rules',
    description: 'Define the single-variable derivative from first principles, apply the core differentiation rules with their domain conditions, and recognize endpoint and continuity boundaries.',
    category: 'Calculus',
    tags: ['Calculus', 'Derivatives', 'Interview'],
    related: ['logarithmic-differentiation', 'monotonicity-convexity-critical-points-and-inflection', 'indeterminate-limits-and-growth-rates', 'related-rates-and-implicit-differentiation'],
  });
  assertMath(page.text, String.raw`f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}`, 'difference quotient');
  assert.match(page.text, /differentiability implies continuity/i);
  assert.match(page.text, /not conversely|converse.*false/i);
  assert.match(page.text, /one-sided|endpoint/i);
  for (const rule of [/linearity/i, /product rule/i, /quotient rule/i, /chain rule/i, /fixed-power/i, /generalized-power/i]) assert.match(page.text, rule);
  assert.match(page.text, /denominator.*nonzero|g\(x\).*not.*0/i);
  assertMath(page.text, String.raw`\lim_{x\to0}\frac{\sin x}{x}=1`, 'sine standard limit');
  assertMath(page.text, String.raw`\lim_{x\to0}\frac{e^x-1}{x}=1`, 'exponential standard limit');
  assertMath(page.text, String.raw`\boxed{\frac{d}{dx}(x\ln x)=\ln x+1},\qquad x>0`, 'x ln x Interview Check and domain');
});

test('logarithmic differentiation Knowledge freezes the positive-base domain and both checks', async () => {
  const page = await readPage('src/content/knowledge/concepts/logarithmic-differentiation.md');
  assertKnowledgePage(page, {
    slug: 'logarithmic-differentiation',
    title: 'Logarithmic Differentiation',
    description: 'Differentiate positive variable-base and variable-exponent functions by taking logarithms, tracking domains, and restoring the original function.',
    category: 'Problem Solving Techniques',
    tags: ['Calculus', 'Derivatives', 'Problem Solving'],
    related: ['derivative-definition-and-core-rules'],
  });
  assertBefore(page.text, /u:I.*\(0,\s*\\infty\)|u.*positive/i, /\\ln y\s*=\s*v\\ln u/, 'u>0 must precede logarithms');
  assertBefore(page.text, /v:I.*\\mathbb\{R\}|v.*differentiable/i, /\\ln y\s*=\s*v\\ln u/, 'v differentiability must precede logarithms');
  assertMath(page.text, String.raw`\boxed{y'=u^v\left(v'\ln u+v\frac{u'}{u}\right)}`, 'general logarithmic derivative');
  assertMath(page.text, String.raw`\boxed{\frac{d}{dx}x^x=x^x(\ln x+1)},\qquad x>0`, 'x^x derivative and domain');
  assertMath(page.text, String.raw`\boxed{\frac{d}{dx}(\ln x)^{\ln x}=\frac{(\ln x)^{\ln x}}{x}(\ln\ln x+1)},\qquad x>1`, 'log-power derivative and domain');
  assert.match(page.text, /zero or negative bases|negative base.*separate/i);
});

test('Problem 001 derives u^v, visibly asks x^x, and preserves the log-power specialization', async () => {
  const page = await readPage('src/content/problems/calculus/differentiate-variable-base-and-exponent.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-001',
    title: 'Differentiate a Variable Base and Exponent',
    description: 'Derive the generalized derivative for a positive variable base and variable exponent, then apply it to x raised to x and a logarithmic power.',
    subcategories: ['Derivatives', 'Logarithmic Differentiation'],
    tags: ['Calculus', 'Interview'],
    concepts: ['derivative-definition-and-core-rules'],
    techniques: ['logarithmic-differentiation'],
    prerequisites: [],
    relatedProblems: ['derive-exponential-cosine-derivative-from-definition'],
    family: 'variable-base-variable-exponent',
    mathDifficulty: 2,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 12,
  });
  assertBefore(page.text, /u:I.*\(0,\s*\\infty\)|positive.*base/i, /take.*log|\\ln y/i, 'Problem 001 must state u>0 before taking logs');
  assertBefore(page.text, /v:I.*\\mathbb\{R\}|v.*differentiable/i, /take.*log|\\ln y/i, 'Problem 001 must state v differentiable before taking logs');
  assertMath(page.text, String.raw`\boxed{\frac{d}{dx}u(x)^{v(x)}=u(x)^{v(x)}\left(v'(x)\ln u(x)+v(x)\frac{u'(x)}{u(x)}\right)}`, 'Problem 001 general result');
  assert.match(page.text, /differentiate.*x\^x|derivative.*x\^x/i);
  assertMath(page.text, String.raw`\boxed{\frac{d}{dx}x^x=x^x(\ln x+1)},\qquad x>0`, 'Problem 001 x^x result and domain');
  assertMath(page.text, String.raw`y=(\ln x)^{\ln x}`, 'Problem 001 log-power prompt');
  assertMath(page.text, String.raw`\boxed{y'=\frac{(\ln x)^{\ln x}}{x}(\ln\ln x+1)},\qquad x>1`, 'Problem 001 log-power result and domain');
});
```

- [ ] **Step 3: Run the derivative RED test**

Run:

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
```

Expected: three failing subtests, each with `ENOENT`, naming exactly the missing core Knowledge, logarithmic-differentiation Knowledge, and Problem 001 paths. Any syntax failure in the test itself must be fixed before content is written.

- [ ] **Step 4: Write minimal GREEN frontmatter for the two Knowledge pages**

Use the exact values asserted above. The first page's frontmatter is:

```yaml
---
title: Derivative Definition and Core Rules
description: Define the single-variable derivative from first principles, apply the core differentiation rules with their domain conditions, and recognize endpoint and continuity boundaries.
date: 2026-08-24
type: concept
domain: Mathematics & Statistics
category: Calculus
status: growing
tags: [Calculus, Derivatives, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
featured: false
related: [logarithmic-differentiation, monotonicity-convexity-critical-points-and-inflection, indeterminate-limits-and-growth-rates, related-rates-and-implicit-differentiation]
relatedNotes: []
---
```

Its body order and minimum mathematical content are:

```markdown
## Core Idea
## Difference Quotient and Domain Boundaries
## Differentiability and Continuity
## Linearity, Product, Quotient, and Chain Rules
## Fixed and Generalized Powers
## Elementary Exponential, Logarithmic, and Trigonometric Rules
## Standard Limits Behind First-Principles Derivatives
## Recognition Signals
## Common Mistakes
## Interview Checks
```

Under `Interview Checks`, visibly ask for and box

```tex
\boxed{\frac{d}{dx}(x\ln x)=\ln x+1},\qquad x>0.
```

The second page's frontmatter is:

```yaml
---
title: Logarithmic Differentiation
description: Differentiate positive variable-base and variable-exponent functions by taking logarithms, tracking domains, and restoring the original function.
date: 2026-08-24
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
tags: [Calculus, Derivatives, Problem Solving]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
featured: false
related: [derivative-definition-and-core-rules]
relatedNotes: []
---
```

Its body must state both differentiability hypotheses and `u:I->(0,infinity)` before `ln y=v ln u`, derive the boxed generalized rule, restore the factor `y=u^v`, explain products/quotients and negative/zero-base boundaries, and include the exact boxed `x^x` and log-power Interview Checks followed in the same displays by `\qquad x>0` and `\qquad x>1`.

- [ ] **Step 5: Write minimal GREEN Problem 001**

Use this exact frontmatter:

```yaml
---
problemId: limits-derivatives-001
title: Differentiate a Variable Base and Exponent
description: Derive the generalized derivative for a positive variable base and variable exponent, then apply it to x raised to x and a logarithmic power.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Derivatives, Logarithmic Differentiation]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [derivative-definition-and-core-rules]
techniques: [logarithmic-differentiation]
prerequisites: []
relatedProblems: [derive-exponential-cosine-derivative-from-definition]
family: variable-base-variable-exponent
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---
```

In the public `## Problem`, first state differentiable `u:I->(0,infinity)` and differentiable real-valued `v`; ask for the general derivative, then explicitly ask for `(x^x)'` on `x>0` and for the log-power derivative on `x>1`. In `## Solution`, show `ln y=v ln u`, differentiate, multiply by `y`, and box all three tested results; put `\qquad x>0` and `\qquad x>1` in the same displays as their respective specialized boxes. Put domain loss, forgetting the outer `u^v` factor, and conflating fixed-power with generalized-power rules in `## Common Mistakes`.

- [ ] **Step 6: Run GREEN verification**

Run:

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
npm run check
npm run build
```

Expected: all three module subtests pass; Astro check and build pass. These Windows-worktree results are development diagnostics unless the checkout itself meets the authoritative filesystem rule.

- [ ] **Step 7: Commit the derivative foundations**

```bash
git add tests/quant-interview-limits-derivatives-content.test.mjs src/content/knowledge/concepts/derivative-definition-and-core-rules.md src/content/knowledge/concepts/logarithmic-differentiation.md src/content/problems/calculus/differentiate-variable-base-and-exponent.md
git commit -m "feat: add limits derivative foundations"
```

---

### Task 2: Build Qualitative Derivative Knowledge and the Exponential Inequality Pair

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-content.test.mjs`
- Create: `src/content/knowledge/concepts/monotonicity-convexity-critical-points-and-inflection.md`
- Create: `src/content/problems/calculus/compare-e-pi-power-expressions.md`
- Create: `src/content/problems/calculus/exponential-midpoint-convexity.md`

**Interfaces:**
- Consumes: `assertKnowledgePage`, `assertProblemPage`, `assertMath`, and `derivative-definition-and-core-rules` from Task 1.
- Produces: `monotonicity-convexity-critical-points-and-inflection` and reciprocal Problems 002/007 for use by the Normal-CDF task and final graph validation.

- [ ] **Step 1: Append the qualitative-analysis RED contracts**

Append three tests that use these exact assertions:

```js
test('qualitative derivative Knowledge separates critical, curvature, and inflection tests', async () => {
  const page = await readPage('src/content/knowledge/concepts/monotonicity-convexity-critical-points-and-inflection.md');
  assertKnowledgePage(page, {
    slug: 'monotonicity-convexity-critical-points-and-inflection',
    title: 'Monotonicity, Convexity, Critical Points, and Inflection',
    description: 'Use derivative sign charts and second-derivative sign changes to analyze critical points, monotonicity, convexity, extrema, and inflection.',
    category: 'Calculus',
    tags: ['Calculus', 'Derivatives', 'Convexity'],
    related: ['derivative-definition-and-core-rules'],
  });
  assert.match(page.text, /f'.*=\s*0|f'.*undefined/i);
  assert.match(page.text, /first-derivative sign chart/i);
  assert.match(page.text, /local.*global|global.*local/i);
  assert.match(page.text, /closed interval.*endpoint|endpoint.*closed interval/i);
  assert.match(page.text, /f''\s*=\s*0.*inconclusive|inconclusive.*f''\s*=\s*0/i);
  assert.match(page.text, /inflection.*sign change|concavity change/i);
  assert.match(page.text, /midpoint convexity/i);
  assertMath(page.text, String.raw`F'(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)`, 'Normal density example');
  assert.match(page.text, /F''>0.*x<.*mu|positive.*left.*mu/i);
  assert.match(page.text, /F''<0.*x>.*mu|negative.*right.*mu/i);
});

test('Problem 002 proves the transcendental-power comparison by a full-interval sign chart', async () => {
  const page = await readPage('src/content/problems/calculus/compare-e-pi-power-expressions.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-002',
    title: 'Compare Two Transcendental Powers',
    description: 'Compare two transcendental powers by maximizing the logarithm-over-input function with a first-derivative sign chart.',
    subcategories: ['Derivatives', 'Monotonicity', 'Inequalities'],
    tags: ['Calculus', 'Interview'],
    concepts: ['monotonicity-convexity-critical-points-and-inflection'],
    techniques: [],
    prerequisites: ['derivative-definition-and-core-rules'],
    relatedProblems: ['exponential-midpoint-convexity'],
    family: 'exponential-inequalities',
    mathDifficulty: 2,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 10,
  });
  assert.equal(scalar(page.frontmatter, 'title'), 'Compare Two Transcendental Powers');
  assert.doesNotMatch(scalar(page.frontmatter, 'title'), /e\^pi|pi\^e|\\pi|\$/i);
  assertMath(page.text, String.raw`f(x)=\frac{\ln x}{x}`, 'comparison function');
  assertMath(page.text, String.raw`f'(x)=\frac{1-\ln x}{x^2}`, 'comparison derivative');
  assert.match(page.text, /increases.*\(0,\s*e\)/i);
  assert.match(page.text, /decreases.*\(e,\s*\\infty\)/i);
  assert.match(page.text, /global maximum.*e/i);
  assertMath(page.text, String.raw`\boxed{e^\pi>\pi^e}`, 'transcendental comparison');
  assert.match(page.text, /f''\s*=\s*0.*inconclusive|inconclusive.*f''\s*=\s*0/i);
});

test('Problem 007 proves exponential midpoint convexity with the exact equality case', async () => {
  const page = await readPage('src/content/problems/calculus/exponential-midpoint-convexity.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-007',
    title: 'Exponential Midpoint Convexity',
    description: 'Prove the exponential midpoint inequality by strict convexity and identify the equality case exactly.',
    subcategories: ['Derivatives', 'Convexity', 'Inequalities'],
    tags: ['Calculus', 'Interview'],
    concepts: ['monotonicity-convexity-critical-points-and-inflection'],
    techniques: [],
    prerequisites: ['derivative-definition-and-core-rules'],
    relatedProblems: ['compare-e-pi-power-expressions'],
    family: 'exponential-inequalities',
    mathDifficulty: 2,
    insightDifficulty: 2,
    interviewDifficulty: 3,
    estimatedMinutes: 10,
  });
  assertMath(page.text, String.raw`\boxed{\frac{e^a+e^b}{2}\ge e^{(a+b)/2}}`, 'midpoint inequality');
  assertMath(page.text, String.raw`f''(x)=e^x>0`, 'strict convexity');
  assert.match(page.text, /equality.*(?:if and only if|iff|exactly when).*a\s*=\s*b/i);
});
```

- [ ] **Step 2: Run qualitative-analysis RED**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: the Task 1 subtests pass and exactly the three new subtests fail with `ENOENT` for their new files.

- [ ] **Step 3: Write the qualitative Knowledge page**

Use the exact metadata in the test and this body order:

```markdown
## Core Idea
## Critical Numbers and Domain Checks
## First-Derivative Sign Charts
## Local and Global Extrema
## Second-Derivative Local Tests
## Convexity, Concavity, and Inflection
## Exponential Midpoint Convexity
## Normal CDF Curvature Example
## Recognition Signals
## Common Mistakes
## Interview Checks
```

State explicitly that `f''=0` is inconclusive both at a critical point and for an inflection claim; require actual derivative/concavity sign information. Include the exact Normal density, second-derivative sign factor, `sigma>0`, and a positive-to-negative change around `mu` as a reusable example.

- [ ] **Step 4: Write Problem 002 with its exact sign proof**

Use the metadata asserted in Step 1. In the body ask whether `e^pi` or `pi^e` is larger; derive

```tex
f(x)=\frac{\ln x}{x},\qquad f'(x)=\frac{1-\ln x}{x^2},
```

prove increasing on `(0,e)` and decreasing on `(e,infinity)`, then show

```tex
\frac{\ln\pi}{\pi}<\frac1e
\Longrightarrow e\ln\pi<\pi
\Longrightarrow \boxed{e^\pi>\pi^e}.
```

The first-derivative interval sign test is the proof. If a second derivative is mentioned, label it a local check and repeat that `f''=0` is inconclusive without a sign change.

- [ ] **Step 5: Write Problem 007 with strict-convexity equality**

Use the metadata asserted in Step 1. For real `a,b`, prove the exact boxed midpoint inequality. The primary method uses `f''(x)=e^x>0` and must explain that strict convexity makes equality possible exactly when `a=b`; AM-GM may appear only as a separately labeled alternate derivation.

- [ ] **Step 6: Run GREEN verification and commit**

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
npm run check
npm run build
git add tests/quant-interview-limits-derivatives-content.test.mjs src/content/knowledge/concepts/monotonicity-convexity-critical-points-and-inflection.md src/content/problems/calculus/compare-e-pi-power-expressions.md src/content/problems/calculus/exponential-midpoint-convexity.md
git commit -m "feat: add derivative inequality analysis"
```

Expected: module tests, check, and build pass before the commit.

---

### Task 3: Add the Normal-CDF Inflection Problem

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-content.test.mjs`
- Create: `src/content/problems/calculus/normal-cdf-inflection-point.md`

**Interfaces:**
- Consumes: `monotonicity-convexity-critical-points-and-inflection` and `derivative-definition-and-core-rules`.
- Produces: Problem `limits-derivatives-009`, family `curvature-and-inflection`, with exact Normal-density and curvature factors.

- [ ] **Step 1: Append the Normal-CDF RED contract**

```js
test('Problem 009 proves the unique Normal-CDF inflection by a sign change', async () => {
  const page = await readPage('src/content/problems/calculus/normal-cdf-inflection-point.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-009',
    title: 'Inflection Point of a Normal CDF',
    description: 'Differentiate a Normal cumulative distribution function and prove its unique inflection point through the sign change of its second derivative.',
    subcategories: ['Derivatives', 'Convexity', 'Probability Functions'],
    tags: ['Calculus', 'Interview'],
    concepts: ['monotonicity-convexity-critical-points-and-inflection', 'derivative-definition-and-core-rules'],
    techniques: [],
    prerequisites: [],
    relatedProblems: [],
    family: 'curvature-and-inflection',
    mathDifficulty: 2,
    insightDifficulty: 2,
    interviewDifficulty: 3,
    estimatedMinutes: 10,
  });
  assertMath(page.text, String.raw`\sigma>0`, 'Normal scale domain');
  assertMath(page.text, String.raw`F'(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)`, 'Normal density');
  assertMath(page.text, String.raw`F''(x)=-\frac{x-\mu}{\sigma^3\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)`, 'Normal CDF second derivative');
  assert.match(page.text, /F''\s*>\s*0.*x\s*<\s*\\mu|positive.*left.*\\mu/is);
  assert.match(page.text, /F''\s*<\s*0.*x\s*>\s*\\mu|negative.*right.*\\mu/is);
  assertMath(page.text, String.raw`\boxed{x=\mu\text{ is the unique inflection point}}`, 'unique inflection');
  assert.match(page.text, /not merely.*F''|F''.*zero.*not.*enough|sign change.*not merely/i);
});
```

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: all earlier subtests pass; only Problem 009 fails with `ENOENT`.

- [ ] **Step 3: Write minimal GREEN Problem 009**

Use the exact frontmatter values asserted above. In the prompt define `mu in R`, `sigma>0`, and `F` as the Normal CDF. In the solution display the exact `F'` and `F''` formulas, observe that the exponential and denominator factors are strictly positive, prove `F''>0` left of `mu` and `F''<0` right of `mu`, and only then box the unique inflection conclusion. Put “solving only `F''=0`” in Common Mistakes.

- [ ] **Step 4: Run GREEN verification and commit**

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
npm run check
npm run build
git add tests/quant-interview-limits-derivatives-content.test.mjs src/content/problems/calculus/normal-cdf-inflection-point.md
git commit -m "feat: add normal cdf inflection problem"
```

Expected: PASS.

---

### Task 4: Build Gated L'Hopital Knowledge and the Two Growth Limits

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-content.test.mjs`
- Create: `src/content/knowledge/concepts/indeterminate-limits-and-growth-rates.md`
- Create: `src/content/problems/calculus/exponential-over-polynomial-limit.md`
- Create: `src/content/problems/calculus/logarithm-power-limit-at-zero.md`

**Interfaces:**
- Consumes: core derivative rules and the test helpers from Task 1.
- Produces: `indeterminate-limits-and-growth-rates` plus reciprocal Problems 003/004; later series and sequence Knowledge link to this slug.

- [ ] **Step 1: Append exact RED contracts for the limits Knowledge and both Problems**

```js
test('indeterminate-limits Knowledge states the full gate, renewed checks, hierarchy, and signed origin limit', async () => {
  const page = await readPage('src/content/knowledge/concepts/indeterminate-limits-and-growth-rates.md');
  assertKnowledgePage(page, {
    slug: 'indeterminate-limits-and-growth-rates',
    title: 'Indeterminate Limits and Growth Rates',
    description: "Evaluate elementary indeterminate limits with algebra, standard limits, and properly gated L'Hopital arguments while comparing logarithmic, polynomial, and exponential growth.",
    category: 'Calculus',
    tags: ['Calculus', 'Limits', 'Asymptotic Growth'],
    related: ['derivative-definition-and-core-rules', 'bounded-monotone-convergence-and-fixed-points', 'positive-series-convergence'],
  });
  assert.match(page.text, /indeterminate.*determined|determined.*indeterminate/i);
  assert.match(page.text, /algebraic simplification/i);
  assert.match(page.text, /rationaliz/i);
  assertMath(page.text, String.raw`\lim_{x\to0}\frac{\sin x}{x}=1`, 'sine limit');
  assertMath(page.text, String.raw`\lim_{x\to0}\frac{e^x-1}{x}=1`, 'exponential limit');
  assertMath(page.text, String.raw`\lim_{x\to0}\frac{\ln(1+x)}{x}=1`, 'logarithm limit');
  for (const gate of [/punctured neighborhood/i, /g'.*(?:nonzero|not equal to zero)/i, /0\s*\/\s*0|zero-over-zero/i, /infinity.*infinity/i, /derivative-quotient limit/i]) assert.match(page.text, gate);
  assert.match(page.text, /renew|recheck/i);
  assert.match(page.text, /logarithm.*power.*exponential/i);
  assertMath(page.text, String.raw`x^a\ln x\to0^-`, 'signed power-log identity');
  assertMath(page.text, String.raw`x\to0^+`, 'signed power-log direction');
  assertMath(page.text, String.raw`a>0`, 'signed power-log domain');
});

test('Problem 003 checks and renews the infinity-over-infinity gate before both differentiations', async () => {
  const page = await readPage('src/content/problems/calculus/exponential-over-polynomial-limit.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-003',
    title: 'Exponential Growth over a Polynomial',
    description: "Evaluate exponential growth over a quadratic by checking and renewing every hypothesis for two L'Hopital steps.",
    subcategories: ['Limits', 'Asymptotic Growth'],
    tags: ['Calculus', 'Interview'],
    concepts: ['indeterminate-limits-and-growth-rates'],
    techniques: [],
    prerequisites: ['derivative-definition-and-core-rules'],
    relatedProblems: ['logarithm-power-limit-at-zero'],
    family: 'deterministic-growth-rate-limits',
    mathDifficulty: 2,
    insightDifficulty: 2,
    interviewDifficulty: 2,
    estimatedMinutes: 8,
  });
  assert.match(page.text, /infinity-over-infinity|\\infty\s*\/\s*\\infty/i);
  assert.match(page.text, /positive tail|x\s*>\s*0/i);
  assert.match(page.text, /differentiable.*punctured|punctured.*differentiable/i);
  assert.match(page.text, /2x.*nonzero|denominator derivative.*nonzero/i);
  assert.match(page.text, /derivative-quotient.*limit|limit.*derivative quotient/i);
  assert.ok((page.text.match(/recheck|renew/gi) ?? []).length >= 1, 'Problem 003 must renew the gate before the second use');
  assertMath(page.text, String.raw`\lim_{x\to\infty}\frac{e^x}{x^2}=\lim_{x\to\infty}\frac{e^x}{2x}=\lim_{x\to\infty}\frac{e^x}{2}=\boxed{+\infty}`, 'Problem 003 exact result');
});

test('Problem 004 converts the product to a gated quotient and preserves zero from below', async () => {
  const page = await readPage('src/content/problems/calculus/logarithm-power-limit-at-zero.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-004',
    title: 'A Logarithm-Power Limit at Zero',
    description: "Evaluate a one-sided power-logarithm limit with a valid quotient transformation and preserve the sign of the approach to zero.",
    subcategories: ['Limits', 'Asymptotic Growth'],
    tags: ['Calculus', 'Interview'],
    concepts: ['indeterminate-limits-and-growth-rates'],
    techniques: [],
    prerequisites: ['derivative-definition-and-core-rules'],
    relatedProblems: ['exponential-over-polynomial-limit'],
    family: 'deterministic-growth-rate-limits',
    mathDifficulty: 2,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 10,
  });
  assertMath(page.text, String.raw`\lim_{x\to0^+}x^2\ln x`, 'Problem 004 prompt');
  assertMath(page.text, String.raw`\frac{\ln x}{x^{-2}}`, 'Problem 004 quotient');
  assert.match(page.text, /infinity-over-infinity|negative infinity.*positive infinity/i);
  assert.match(page.text, /punctured.*\(0|one-sided.*neighbou?rhood/i);
  assert.match(page.text, /-2x\^\{-3\}.*nonzero|denominator derivative.*nonzero/i);
  assertMath(page.text, String.raw`\frac{1/x}{-2x^{-3}}=-\frac{x^2}{2}\to0`, 'Problem 004 derivative quotient');
  assert.match(page.text, /negative.*0\s*<\s*x\s*<\s*1|0\s*<\s*x\s*<\s*1.*negative/is);
  assertMath(page.text, String.raw`\boxed{0^-}`, 'Problem 004 signed result');
});
```

- [ ] **Step 2: Run the RED test**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: previous subtests pass; the three new paths fail with `ENOENT`.

- [ ] **Step 3: Write `indeterminate-limits-and-growth-rates.md`**

Use the exact metadata asserted above and this body order:

```markdown
## Core Idea
## Indeterminate Forms versus Determined Behavior
## Simplify Before Differentiating
## Three Standard Limits
## The Full L'Hopital Gate
## Repeated Applications Require Renewed Checks
## Logarithm, Power, and Exponential Growth
## Signed Limits at the Origin
## Recognition Signals
## Common Mistakes
## Interview Checks
```

Write the gate as a conjunction, not a slogan: numerator and denominator differentiable on the appropriate punctured neighborhood, denominator derivative nonzero there, original quotient in `0/0` or extended-real infinity-over-infinity form, and the derivative quotient having the required ordinary or extended-real limit. State that a product such as `x^2 ln x` must be transformed before applying the rule.

- [ ] **Step 4: Write Problem 003 with two explicit gate checks**

Use the tested metadata. The solution must have separate subsections `First gate`, `First application`, `Renew the gate`, and `Second application`. On a positive tail, verify differentiability and `2x != 0`, then after the first derivative quotient verify the new infinity-over-infinity form and denominator derivative `2 != 0`. End with the exact chain in the test and explicitly describe the result as positive infinity.

- [ ] **Step 5: Write Problem 004 with one-sided sign preservation**

Use the tested metadata. Reject applying L'Hopital directly to the product; rewrite it as `ln x / x^{-2}`. Check the extended-real infinity-over-infinity form on a punctured right neighborhood, differentiability, denominator derivative `-2x^{-3} != 0`, and derivative-quotient limit. Since the original expression is negative for `0<x<1`, box `0^-` and explain that it records approach direction rather than a different real limit.

- [ ] **Step 6: Run GREEN verification and commit**

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
npm run check
npm run build
git add tests/quant-interview-limits-derivatives-content.test.mjs src/content/knowledge/concepts/indeterminate-limits-and-growth-rates.md src/content/problems/calculus/exponential-over-polynomial-limit.md src/content/problems/calculus/logarithm-power-limit-at-zero.md
git commit -m "feat: add gated growth limit module"
```

Expected: PASS.

---

### Task 5: Build Related-Rates Knowledge and the Lighthouse Problem

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-content.test.mjs`
- Create: `src/content/knowledge/concepts/related-rates-and-implicit-differentiation.md`
- Create: `src/content/problems/calculus/rotating-lighthouse-beam-related-rate.md`

**Interfaces:**
- Consumes: `derivative-definition-and-core-rules`.
- Produces: Technique Knowledge `related-rates-and-implicit-differentiation` and Problem 005, with signed coordinate `s(t)` and angular rate `d theta/dt` kept distinct.

- [ ] **Step 1: Append the exact related-rate RED tests**

```js
test('related-rates Knowledge preserves functions of time, signs, units, and the one-revolution specialization', async () => {
  const page = await readPage('src/content/knowledge/concepts/related-rates-and-implicit-differentiation.md');
  assertKnowledgePage(page, {
    slug: 'related-rates-and-implicit-differentiation',
    title: 'Related Rates and Implicit Differentiation',
    description: 'Differentiate implicit time-dependent constraints, preserve units and signs, and solve elementary geometric related-rate problems.',
    category: 'Problem Solving Techniques',
    tags: ['Calculus', 'Derivatives', 'Related Rates'],
    related: ['derivative-definition-and-core-rules'],
  });
  assert.match(page.text, /functions of time|function.*t/i);
  assert.match(page.text, /chain rule/i);
  assert.match(page.text, /units/i);
  assert.match(page.text, /sign/i);
  assertMath(page.text, String.raw`a>0`, 'lighthouse distance domain');
  assertMath(page.text, String.raw`s=a\tan\theta`, 'lighthouse constraint');
  assertMath(page.text, String.raw`\cos\theta\ne0`, 'tangent domain');
  assertMath(page.text, String.raw`\frac{d\theta}{dt}=2\pi`, 'one-revolution angular rate');
  assertMath(page.text, String.raw`\boxed{\frac{ds}{dt}=2\pi a\sec^2\theta=\frac{2\pi(a^2+s^2)}{a}\ \text{miles per minute}}`, 'Knowledge lighthouse specialization');
});

test('Problem 005 derives the general signed rate and exact one-revolution speed forms', async () => {
  const page = await readPage('src/content/problems/calculus/rotating-lighthouse-beam-related-rate.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-005',
    title: 'Rotating Lighthouse Beam Related Rate',
    description: 'Differentiate a lighthouse beam geometry constraint and specialize the signed shore rate to one full revolution per minute.',
    subcategories: ['Derivatives', 'Related Rates', 'Geometry'],
    tags: ['Calculus', 'Interview'],
    concepts: ['derivative-definition-and-core-rules'],
    techniques: ['related-rates-and-implicit-differentiation'],
    prerequisites: [],
    relatedProblems: [],
    family: 'geometric-related-rates',
    mathDifficulty: 2,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 12,
  });
  assertMath(page.text, String.raw`a>0`, 'Problem 005 a domain');
  assertMath(page.text, String.raw`s=a\tan\theta`, 'Problem 005 geometry');
  assertMath(page.text, String.raw`\cos\theta\ne0`, 'Problem 005 theta domain');
  assertMath(page.text, String.raw`\boxed{\frac{ds}{dt}=a\sec^2\theta\frac{d\theta}{dt}}`, 'Problem 005 general rate');
  assert.match(page.text, /one full revolution per minute|one revolution per minute/i);
  assertMath(page.text, String.raw`\frac{d\theta}{dt}=2\pi\ \text{radians per minute}`, 'Problem 005 angular specialization');
  assertMath(page.text, String.raw`\sec^2\theta=1+\tan^2\theta=1+\frac{s^2}{a^2}`, 'Problem 005 equivalent-form identity');
  assertMath(page.text, String.raw`\boxed{\frac{ds}{dt}=2\pi a\sec^2\theta=\frac{2\pi(a^2+s^2)}{a}\ \text{miles per minute}}`, 'Problem 005 exact specialized result');
  assert.match(page.text, /signed shore coordinate/i);
  assert.match(page.text, /angular rate.*linear speed|linear speed.*angular rate/is);
});
```

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: only the two new file contracts fail with `ENOENT`.

- [ ] **Step 3: Write the reusable related-rates Knowledge**

Use the exact tested frontmatter and this body order:

```markdown
## Core Idea
## Make Every Changing Quantity a Function of Time
## Differentiate the Constraint Before Substituting
## Units, Signs, and Coordinates versus Speeds
## Implicit Differentiation Pattern
## Lighthouse Geometry Example
## Recognition Signals
## Common Mistakes
## Interview Checks
```

Derive the general lighthouse rate and the exact `2 pi` specialization. Do not call `s` a speed; it is a signed coordinate. Explain that the sign of `ds/dt` records direction along the chosen shore axis.

- [ ] **Step 4: Write Problem 005**

Use the tested metadata. The public prompt defines perpendicular distance `a>0` miles, signed shore coordinate `s`, angle from the perpendicular, differentiable `theta(t)`, and `cos theta != 0`; it explicitly asks for both the general identity and the one-revolution-per-minute specialization. The solution differentiates before substituting `d theta/dt`, retains radians/minute and miles/minute, and derives the second speed form through `sec^2 theta=1+tan^2 theta`.

- [ ] **Step 5: Run GREEN verification and commit**

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
npm run check
npm run build
git add tests/quant-interview-limits-derivatives-content.test.mjs src/content/knowledge/concepts/related-rates-and-implicit-differentiation.md src/content/problems/calculus/rotating-lighthouse-beam-related-rate.md
git commit -m "feat: add lighthouse related rates"
```

Expected: PASS.

---

### Task 6: Add the Coefficient-Five Radical-Difference Limit

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-content.test.mjs`
- Create: `src/content/problems/calculus/radical-difference-limit-at-infinity.md`

**Interfaces:**
- Consumes: `indeterminate-limits-and-growth-rates`.
- Produces: Problem 006, family `algebraic-limit-transformations`, independently reviewable from the L'Hopital pages.

- [ ] **Step 1: Append the coefficient-five RED contract**

```js
test('Problem 006 preserves coefficient five through exact rationalization to five halves', async () => {
  const page = await readPage('src/content/problems/calculus/radical-difference-limit-at-infinity.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-006',
    title: 'Radical Difference at Infinity',
    description: 'Evaluate a difference of two unbounded radical terms by exact conjugate rationalization instead of subtracting infinite limits.',
    subcategories: ['Limits', 'Rationalization'],
    tags: ['Calculus', 'Interview'],
    concepts: ['indeterminate-limits-and-growth-rates'],
    techniques: [],
    prerequisites: [],
    relatedProblems: [],
    family: 'algebraic-limit-transformations',
    mathDifficulty: 2,
    insightDifficulty: 2,
    interviewDifficulty: 2,
    estimatedMinutes: 8,
  });
  assertMath(page.text, String.raw`\sqrt{x^2+5x}-x=\frac{5x}{\sqrt{x^2+5x}+x}=\frac{5}{\sqrt{1+5/x}+1}`, 'Problem 006 rationalization');
  assertMath(page.text, String.raw`\boxed{\lim_{x\to\infty}(\sqrt{x^2+5x}-x)=\frac52}`, 'Problem 006 limit');
  assert.match(page.text, /cannot subtract|invalid.*subtract|infinity minus infinity/i);
  assert.ok((normalizedMath(page.text).match(/5/g) ?? []).length >= 4, 'coefficient 5 disappeared during rationalization');
});
```

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: all earlier subtests pass and Problem 006 fails with `ENOENT`.

- [ ] **Step 3: Write minimal GREEN Problem 006**

Use the exact tested metadata. The first hint points to the conjugate; the second writes the conjugate denominator without simplifying the coefficient away. The solution multiplies by the conjugate, obtains numerator `5x`, divides numerator and denominator by positive `x` on the positive tail, and reaches `5/(sqrt(1+5/x)+1) -> 5/2`. Common Mistakes must reject treating infinity as an ordinary number and changing `5x` to `x`.

- [ ] **Step 4: Run GREEN verification and commit**

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
npm run check
npm run build
git add tests/quant-interview-limits-derivatives-content.test.mjs src/content/problems/calculus/radical-difference-limit-at-infinity.md
git commit -m "feat: add radical difference limit"
```

Expected: PASS.

---

### Task 7: Derive the Exponential-of-Cosine Derivative from First Principles

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-content.test.mjs`
- Create: `src/content/problems/calculus/derive-exponential-cosine-derivative-from-definition.md`

**Interfaces:**
- Consumes: the derivative-definition standard limits from `derivative-definition-and-core-rules`.
- Produces: Problem 010, reciprocal with Problem 001, using `Delta_h := cos(x+h)-cos x` as the exact intermediate variable.

- [ ] **Step 1: Append the first-principles RED contract**

```js
test('Problem 010 derives exp(cos x) from the exact Delta_h factorization without Taylor series', async () => {
  const page = await readPage('src/content/problems/calculus/derive-exponential-cosine-derivative-from-definition.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-010',
    title: 'Derive an Exponential-of-Cosine Derivative from the Definition',
    description: 'Derive the derivative of an exponential of cosine directly from its difference quotient and standard elementary limits.',
    subcategories: ['Derivatives', 'First Principles'],
    tags: ['Calculus', 'Interview'],
    concepts: ['derivative-definition-and-core-rules'],
    techniques: [],
    prerequisites: [],
    relatedProblems: ['differentiate-variable-base-and-exponent'],
    family: 'derivative-from-definition',
    mathDifficulty: 3,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 15,
  });
  assertMath(page.text, String.raw`g(x)=e^{\cos x}`, 'Problem 010 function');
  assertMath(page.text, String.raw`\Delta_h=\cos(x+h)-\cos x`, 'Problem 010 Delta definition');
  assertMath(page.text, String.raw`\frac{g(x+h)-g(x)}h=e^{\cos x}\left(\frac{e^{\Delta_h}-1}{\Delta_h}\right)\left(\frac{\Delta_h}{h}\right)`, 'Problem 010 exact factorization');
  assert.match(page.text, /limiting interpretation.*Delta|when.*Delta_h.*zero|Delta_h.*zero.*limit/is);
  assertMath(page.text, String.raw`\frac{\Delta_h}{h}=\cos x\frac{\cos h-1}{h}-\sin x\frac{\sin h}{h}`, 'Problem 010 angle-addition quotient');
  assertMath(page.text, String.raw`\lim_{h\to0}\frac{\Delta_h}{h}=-\sin x`, 'Problem 010 inner limit');
  assertMath(page.text, String.raw`\lim_{z\to0}\frac{e^z-1}{z}=1`, 'Problem 010 exponential limit');
  assertMath(page.text, String.raw`\boxed{g'(x)=-\sin x\,e^{\cos x}}`, 'Problem 010 derivative');
  const derivation = page.text.split(/^## Solution$/m)[1]?.split(/^## Why This Matters$/m)[0] ?? '';
  assert.doesNotMatch(derivation, /Taylor|Maclaurin|big-O|O\(h/i);
  assert.doesNotMatch(page.text, /e\^x\s*\\cos x|e\^x\s*cos x/);
});
```

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: only Problem 010 fails with `ENOENT`.

- [ ] **Step 3: Write minimal GREEN Problem 010**

Use the exact metadata asserted above. Start from the difference quotient, define `Delta_h`, factor exactly as tested, and explain the limiting interpretation at isolated `h` values for which `Delta_h=0`. Use angle addition plus `sin h/h -> 1` and `(cos h-1)/h -> 0` to obtain `Delta_h/h -> -sin x`; use continuity to show `Delta_h -> 0`, then the standard exponential limit. Do not use a Taylor/Maclaurin expansion and do not substitute the unrelated product `e^x cos x`. In Common Mistakes, describe those prohibited shortcuts in words without presenting them as derivation steps.

- [ ] **Step 4: Run GREEN verification and commit**

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
npm run check
npm run build
git add tests/quant-interview-limits-derivatives-content.test.mjs src/content/problems/calculus/derive-exponential-cosine-derivative-from-definition.md
git commit -m "feat: add first principles exponential cosine derivative"
```

Expected: PASS.

---

### Task 8: Build Bounded-Monotone Knowledge and the Continued Fraction

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-content.test.mjs`
- Create: `src/content/knowledge/concepts/bounded-monotone-convergence-and-fixed-points.md`
- Create: `src/content/problems/calculus/periodic-continued-fraction-limit.md`

**Interfaces:**
- Consumes: `indeterminate-limits-and-growth-rates` only as a related Knowledge edge; it uses no L'Hopital machinery.
- Produces: `bounded-monotone-convergence-and-fixed-points` and Problem 008, which define the convergence-before-fixed-point contract reused by Problems 011/012.

- [ ] **Step 1: Append the bounded-sequence and continued-fraction RED tests**

```js
test('bounded-monotone Knowledge proves convergence before fixed-point selection', async () => {
  const page = await readPage('src/content/knowledge/concepts/bounded-monotone-convergence-and-fixed-points.md');
  assertKnowledgePage(page, {
    slug: 'bounded-monotone-convergence-and-fixed-points',
    title: 'Bounded Monotone Convergence and Fixed Points',
    description: 'Prove real recursive sequences converge through invariant bounds and monotonicity before using continuity to identify admissible fixed points.',
    category: 'Calculus',
    tags: ['Calculus', 'Limits', 'Sequences'],
    related: ['indeterminate-limits-and-growth-rates'],
  });
  assert.match(page.text, /bounded monotone.*converges|monotone.*bounded.*converges/i);
  assert.match(page.text, /invariant interval/i);
  assert.match(page.text, /induction/i);
  assert.match(page.text, /even and odd subsequences|even.*odd.*subsequence/i);
  assert.match(page.text, /only after convergence|after.*prove.*converg/i);
  assert.match(page.text, /fixed-point equation.*candidate|candidates.*not.*convergence/i);
  assertMath(page.text, String.raw`c_0=2`, 'Knowledge continued-fraction start');
  assertMath(page.text, String.raw`c_{n+1}=2+\frac2{c_n}`, 'Knowledge continued-fraction recurrence');
  assertMath(page.text, String.raw`1+\sqrt3`, 'Knowledge continued-fraction limit');
  assert.match(page.text, /nested radical/i);
  assertMath(page.text, String.raw`x=\sqrt2`, 'Knowledge tower base');
  assertMath(page.text, String.raw`L=2`, 'Knowledge tower limit');
  assert.match(page.text, /fixed point.*4|branch.*4/i);
});

test('Problem 008 proves alternating-subsequence convergence before selecting one plus sqrt three', async () => {
  const page = await readPage('src/content/problems/calculus/periodic-continued-fraction-limit.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-008',
    title: 'Periodic Continued-Fraction Limit',
    description: 'Prove finite continued-fraction convergents converge through alternating monotone subsequences before selecting the admissible fixed point.',
    subcategories: ['Limits', 'Sequences', 'Fixed Points'],
    tags: ['Calculus', 'Interview'],
    concepts: ['bounded-monotone-convergence-and-fixed-points'],
    techniques: [],
    prerequisites: [],
    relatedProblems: ['nested-radical-limit', 'infinite-power-tower-limit'],
    family: 'recursive-sequence-limits',
    mathDifficulty: 3,
    insightDifficulty: 3,
    interviewDifficulty: 4,
    estimatedMinutes: 15,
  });
  assertMath(page.text, String.raw`c_0=2`, 'Problem 008 start');
  assertMath(page.text, String.raw`c_{n+1}=2+\frac2{c_n}`, 'Problem 008 recurrence');
  assert.match(page.text, /\[2,\s*3\]/);
  assert.match(page.text, /c_\{2n\}.*increasing|even subsequence.*increasing/i);
  assert.match(page.text, /c_\{2n\+1\}.*decreasing|odd subsequence.*decreasing/i);
  assertMath(page.text, String.raw`b=2+\frac2a`, 'Problem 008 odd-subsequence limit');
  assertMath(page.text, String.raw`a=2+\frac2b`, 'Problem 008 even-subsequence limit');
  assertMath(page.text, String.raw`(b-a)\left(1-\frac2{ab}\right)=0`, 'Problem 008 equal-limits argument');
  assert.match(page.text, /a,?b.*(?:greater than or equal|\\ge).*2.*ab.*2.*impossible|ab\s*=\s*2.*impossible/is);
  assertBefore(page.text, /full sequence converges|a\s*=\s*b/i, /L\s*=\s*2\s*\+\s*\\frac\{?2\}?\{?L\}?/, 'Problem 008 must prove convergence before using the fixed point');
  assertMath(page.text, String.raw`L^2-2L-2=0`, 'Problem 008 fixed-point polynomial');
  assertMath(page.text, String.raw`L=1\pm\sqrt3`, 'Problem 008 candidate roots');
  assertMath(page.text, String.raw`\boxed{L=1+\sqrt3}`, 'Problem 008 selected limit');
  assert.match(page.text, /positivity.*reject|reject.*1-\\sqrt3/i);
});
```

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: only the new Knowledge and Problem 008 fail with `ENOENT`.

- [ ] **Step 3: Write bounded-monotone/fixed-point Knowledge**

Use the tested metadata and this body order:

```markdown
## Core Idea
## Bounded Monotone Convergence
## Invariant Intervals and Induction
## Alternating Recurrences and Even/Odd Subsequences
## Continuity after Convergence
## Fixed Points Give Candidates, Not Convergence
## Continued-Fraction Safeguard
## Nested-Radical Safeguard
## Power-Tower Safeguard
## Recognition Signals
## Common Mistakes
## Interview Checks
```

The continued-fraction section contains the exact recurrence and limit. The tower section distinguishes the positive base `sqrt(2)` from finite-tower limit `2` and explicitly identifies `4` as another fixed-point branch requiring rejection by an invariant bound.

- [ ] **Step 4: Write Problem 008 with the complete subsequence proof**

Use the tested metadata. Prove `[2,3]` is invariant, show even terms increase and odd terms decrease, name their limits `a,b`, pass the recurrence only after those subsequences converge, and use the exact subtraction identity to prove `a=b`. Only then solve the fixed-point quadratic; positivity rejects `1-sqrt(3)`. Do not shorten the proof to “the continued fraction clearly converges.”

- [ ] **Step 5: Run GREEN verification and commit**

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
npm run check
npm run build
git add tests/quant-interview-limits-derivatives-content.test.mjs src/content/knowledge/concepts/bounded-monotone-convergence-and-fixed-points.md src/content/problems/calculus/periodic-continued-fraction-limit.md
git commit -m "feat: add bounded sequence fixed point module"
```

Expected: PASS.

---

### Task 9: Add the Nested Radical and Power Tower with Convergence Proofs

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-content.test.mjs`
- Create: `src/content/problems/calculus/nested-radical-limit.md`
- Create: `src/content/problems/calculus/infinite-power-tower-limit.md`

**Interfaces:**
- Consumes: `bounded-monotone-convergence-and-fixed-points` and the reciprocal Problem 008 graph.
- Produces: Problems 011/012, completing the exact three-Problem recursive-sequence family.

- [ ] **Step 1: Append RED contracts for both convergence proofs**

```js
test('Problem 011 proves the nested radical is increasing and bounded before selecting two', async () => {
  const page = await readPage('src/content/problems/calculus/nested-radical-limit.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-011',
    title: 'Nested-Radical Limit',
    description: 'Prove a nested-radical sequence is increasing and bounded before selecting its positive fixed-point limit.',
    subcategories: ['Limits', 'Sequences', 'Fixed Points'],
    tags: ['Calculus', 'Interview'],
    concepts: ['bounded-monotone-convergence-and-fixed-points'],
    techniques: [],
    prerequisites: [],
    relatedProblems: ['periodic-continued-fraction-limit', 'infinite-power-tower-limit'],
    family: 'recursive-sequence-limits',
    mathDifficulty: 2,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 12,
  });
  assertMath(page.text, String.raw`a_1=\sqrt2`, 'Problem 011 start');
  assertMath(page.text, String.raw`a_{n+1}=\sqrt{2+a_n}`, 'Problem 011 recurrence');
  assert.match(page.text, /induction/i);
  assert.match(page.text, /increasing/i);
  assert.match(page.text, /bounded above.*2|2.*upper bound/i);
  assertBefore(page.text, /bounded.*converges|monotone convergence/i, /L\s*=\s*\\sqrt\{2\+L\}/, 'Problem 011 must prove convergence before using the fixed point');
  assertMath(page.text, String.raw`L=\sqrt{2+L}`, 'Problem 011 fixed point');
  assert.match(page.text, /positivity.*-1|reject.*-1/i);
  assertMath(page.text, String.raw`\boxed{L=2}`, 'Problem 011 limit');
});

test('Problem 012 distinguishes requested base sqrt two from tower limit two and rejects branch four', async () => {
  const page = await readPage('src/content/problems/calculus/infinite-power-tower-limit.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-012',
    title: 'Infinite Power-Tower Limit',
    description: 'Find the positive tower base for value two, then prove its finite towers converge to two rather than the other fixed-point branch.',
    subcategories: ['Limits', 'Sequences', 'Fixed Points'],
    tags: ['Calculus', 'Interview'],
    concepts: ['bounded-monotone-convergence-and-fixed-points'],
    techniques: [],
    prerequisites: [],
    relatedProblems: ['periodic-continued-fraction-limit', 'nested-radical-limit'],
    family: 'recursive-sequence-limits',
    mathDifficulty: 3,
    insightDifficulty: 4,
    interviewDifficulty: 4,
    estimatedMinutes: 15,
  });
  assertMath(page.text, String.raw`2=x^2`, 'Problem 012 base equation');
  assertMath(page.text, String.raw`\boxed{x=\sqrt2}`, 'Problem 012 requested base');
  assertMath(page.text, String.raw`t_0=\sqrt2`, 'Problem 012 finite-tower start');
  assertMath(page.text, String.raw`t_{n+1}=(\sqrt2)^{t_n}`, 'Problem 012 finite-tower recurrence');
  assert.match(page.text, /t_n.*increasing|sequence.*increasing/i);
  assert.match(page.text, /t_n\s*<\s*2.*every finite|bounded.*2/i);
  assertBefore(page.text, /bounded.*converges|monotone convergence/i, /L\s*=\s*\(\\sqrt2\)\^L/, 'Problem 012 must prove convergence before using the fixed point');
  assertMath(page.text, String.raw`L=(\sqrt2)^L`, 'Problem 012 fixed point');
  assert.match(page.text, /both.*2.*4|2 and 4.*fixed/i);
  assert.match(page.text, /L\s*\\le\s*2.*reject.*4|upper bound.*reject.*4/is);
  assertMath(page.text, String.raw`\boxed{L=2}`, 'Problem 012 proved tower limit');
  assert.match(page.text, /base.*not.*limit|must not be conflated|distinguish.*base.*limit/i);
});
```

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: only Problems 011 and 012 fail with `ENOENT`.

- [ ] **Step 3: Write Problem 011**

Use the exact tested metadata. Prove the lower start and monotonic step by induction, prove `a_n<2` by induction, invoke bounded-monotone convergence, then solve `L=sqrt(2+L)` and reject `-1` by positivity. Keep the proof order visible in section headings.

- [ ] **Step 4: Write Problem 012**

Use the exact tested metadata. The public question first asks for the positive base. Derive `2=x^2` conditionally and box `x=sqrt(2)`, then separately validate admissibility through the finite towers. Prove `t_1>t_0`, use monotonicity of `y -> (sqrt(2))^y` for the induction step, and prove every finite term is below `2`; only then pass to `L=(sqrt(2))^L`. Explicitly check that `2` and `4` solve the fixed-point equation and reject `4` with `L<=2`. Box the base and the limit separately.

- [ ] **Step 5: Run GREEN verification and commit**

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
npm run check
npm run build
git add tests/quant-interview-limits-derivatives-content.test.mjs src/content/problems/calculus/nested-radical-limit.md src/content/problems/calculus/infinite-power-tower-limit.md
git commit -m "feat: add recursive radical and tower limits"
```

Expected: PASS.

---

### Task 10: Build Positive-Series Knowledge, Finish the Module Test, and Report Candidate Evidence

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-content.test.mjs`
- Create: `src/content/knowledge/concepts/positive-series-convergence.md`
- Create: `src/content/problems/calculus/classify-basic-positive-series.md`
- Report only, do not create a tracked file: candidate verification and proposed coordinator deltas.

**Interfaces:**
- Consumes: all six earlier new Knowledge slugs, Problems 001–012, the module-test helpers, and frozen-base green evidence from Task 1.
- Produces: the seventh Knowledge node, Problem 013, exact topic-local discovery arrays, complete semantic/content enforcement, a clean candidate SHA, and a non-authoritative handoff report for Task 11.

- [ ] **Step 1: Append RED tests for positive-series Knowledge and Problem 013**

```js
test('positive-series Knowledge supplies elementary proofs for the exact three-series family', async () => {
  const page = await readPage('src/content/knowledge/concepts/positive-series-convergence.md');
  assertKnowledgePage(page, {
    slug: 'positive-series-convergence',
    title: 'Positive-Series Convergence',
    description: 'Classify elementary nonnegative series through partial sums, comparison, telescoping, dyadic grouping, condensation, geometric bounds, and the term test.',
    category: 'Calculus',
    tags: ['Calculus', 'Series', 'Convergence'],
    related: ['indeterminate-limits-and-growth-rates'],
  });
  assert.match(page.text, /bounded increasing partial sums|partial sums.*bounded.*increasing/i);
  assertMath(page.text, String.raw`a_n\to0`, 'series term test');
  assert.match(page.text, /necessary.*not sufficient|not sufficient.*term/i);
  assert.match(page.text, /geometric/i);
  assert.match(page.text, /direct comparison/i);
  assert.match(page.text, /harmonic.*dyadic|dyadic.*harmonic/is);
  assert.match(page.text, /Cauchy condensation/i);
  assert.match(page.text, /positive.*nonincreasing|nonincreasing.*positive/i);
  assertMath(page.text, String.raw`\frac1{k^2}\le\frac1{k(k-1)}=\frac1{k-1}-\frac1k`, 'square-series telescoping comparison');
  assertMath(page.text, String.raw`k\ge2`, 'square-series comparison domain');
  assertMath(page.text, String.raw`\frac{2^n}{2^n\ln(2^n)}=\frac1{n\ln2}`, 'log-harmonic condensation');
  assertMath(page.text, String.raw`2^{k(1-p)}`, 'p-series dyadic upper bound');
  assert.match(page.text, /p\s*>\s*1.*converges|converges.*p\s*>\s*1/is);
  assert.match(page.text, /0\s*<\s*p\s*\\le\s*1.*diverges|diverges.*0\s*<\s*p/is);
  assert.match(page.text, /p\s*\\le\s*0.*terms.*not.*zero|term test.*p\s*\\le\s*0/is);
});

test('Problem 013 proves the harmonic square and logarithmic-harmonic classifications without integration', async () => {
  const page = await readPage('src/content/problems/calculus/classify-basic-positive-series.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-013',
    title: 'Classify Basic Positive Series',
    description: 'Classify the harmonic, reciprocal-square, and logarithmic-harmonic series with elementary non-integral convergence arguments.',
    subcategories: ['Limits', 'Series', 'Convergence'],
    tags: ['Calculus', 'Interview'],
    concepts: ['positive-series-convergence'],
    techniques: [],
    prerequisites: [],
    relatedProblems: [],
    family: 'positive-series-convergence',
    mathDifficulty: 3,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 15,
  });
  assertMath(page.text, String.raw`\boxed{\sum_{k=1}^{\infty}\frac1k\text{ diverges}}`, 'harmonic classification');
  assertMath(page.text, String.raw`\boxed{\sum_{k=1}^{\infty}\frac1{k^2}\text{ converges}}`, 'square-series classification');
  assertMath(page.text, String.raw`\boxed{\sum_{k=2}^{\infty}\frac1{k\ln k}\text{ diverges}}`, 'log-harmonic classification');
  assert.match(page.text, /dyadic grouping/i);
  assertMath(page.text, String.raw`\frac1{k^2}\le\frac1{k(k-1)}=\frac1{k-1}-\frac1k`, 'Problem 013 telescoping comparison');
  assert.match(page.text, /bounded increasing partial sums/i);
  assert.match(page.text, /positive.*(?:decreasing|nonincreasing)|(?:decreasing|nonincreasing).*positive/is);
  assert.match(page.text, /Cauchy condensation/i);
  assertMath(page.text, String.raw`2^na_{2^n}=\frac1{n\ln2}`, 'Problem 013 condensed terms');
  const solution = page.text.split(/^## Solution$/m)[1]?.split(/^## Why This Matters$/m)[0] ?? '';
  assert.doesNotMatch(solution, /integral test|\\int/);
});
```

- [ ] **Step 2: Run the series RED test**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: all earlier subtests pass; only the series Knowledge and Problem 013 fail with `ENOENT`.

- [ ] **Step 3: Write `positive-series-convergence.md`**

Use the exact tested metadata and this body order:

```markdown
## Core Idea
## Nonnegative Terms and Bounded Increasing Partial Sums
## The Necessary Term Test
## Geometric Series
## Direct Comparison and Telescoping Bounds
## Harmonic Divergence by Dyadic Grouping
## Cauchy Condensation with Its Hypotheses
## Positive p-Series by Dyadic Blocks
## The Reciprocal-Square Series
## The Logarithmic-Harmonic Series
## Recognition Signals
## Common Mistakes
## Interview Checks
```

For `p>1`, bound dyadic blocks by a constant multiple of `2^{k(1-p)}`. For `0<p<=1`, compare to the harmonic series; for `p<=0`, apply the term test. State and check positivity/nonincrease before condensation. The square and log-harmonic subsections contain the exact formulas asserted above. Do not invoke the integral test.

- [ ] **Step 4: Write Problem 013 with the exact triple**

Use the tested metadata. The prompt asks all three series in order. The solution:

1. proves harmonic divergence by dyadic grouping;
2. treats reciprocal-square partial sums as increasing and bounds them using `1/k^2 <= 1/[k(k-1)]`, `k>=2`, with the telescoping difference;
3. verifies `1/(k ln k)` is positive and decreasing for `k>=2`, then condenses to `1/(n ln 2)` and compares with the harmonic series.

Do not replace this triple with a generic `p`-series table and do not use an integral or undeclared integration prerequisite.

- [ ] **Step 5: Append exact whole-module inventory, ID, graph, title, Technique, and public-boundary tests**

Append:

```js
async function topicLocalSlugs(root) {
  const files = await readdir(root, { recursive: true });
  const slugs = [];
  for (const file of files.filter((entry) => String(entry).endsWith('.md'))) {
    const fullPath = path.join(root, String(file));
    const page = await readPage(fullPath);
    if (JSON.stringify(inlineArray(page.frontmatter, 'quantInterviewTopics')) === JSON.stringify(topicArray)) {
      slugs.push(path.basename(String(file), '.md'));
    }
  }
  return slugs.sort();
}

const exactKnowledgeSlugs = [
  'bounded-monotone-convergence-and-fixed-points',
  'derivative-definition-and-core-rules',
  'indeterminate-limits-and-growth-rates',
  'logarithmic-differentiation',
  'monotonicity-convexity-critical-points-and-inflection',
  'positive-series-convergence',
  'related-rates-and-implicit-differentiation',
].sort();

const exactProblemSlugs = [
  'classify-basic-positive-series',
  'compare-e-pi-power-expressions',
  'derive-exponential-cosine-derivative-from-definition',
  'differentiate-variable-base-and-exponent',
  'exponential-midpoint-convexity',
  'exponential-over-polynomial-limit',
  'infinite-power-tower-limit',
  'logarithm-power-limit-at-zero',
  'nested-radical-limit',
  'normal-cdf-inflection-point',
  'periodic-continued-fraction-limit',
  'radical-difference-limit-at-infinity',
  'rotating-lighthouse-beam-related-rate',
].sort();

test('module contains exactly seven Knowledge and thirteen Problem slugs', async () => {
  assert.deepEqual(await topicLocalSlugs('src/content/knowledge'), exactKnowledgeSlugs);
  assert.deepEqual(await topicLocalSlugs('src/content/problems'), exactProblemSlugs);
});

test('Problem IDs are exactly limits-derivatives-001 through limits-derivatives-013', async () => {
  const ids = [];
  for (const slug of exactProblemSlugs) {
    const page = await readPage(`src/content/problems/calculus/${slug}.md`);
    ids.push(scalar(page.frontmatter, 'problemId'));
    assert.doesNotMatch(scalar(page.frontmatter, 'title'), /[$\\{}^]/, `${slug} title must be plain text`);
  }
  assert.deepEqual(ids.sort(), Array.from({ length: 13 }, (_, index) => `limits-derivatives-${String(index + 1).padStart(3, '0')}`));
});

test('module graph and Technique categories are exact', async () => {
  const reciprocalProblems = new Map([
    ['compare-e-pi-power-expressions', ['exponential-midpoint-convexity']],
    ['exponential-midpoint-convexity', ['compare-e-pi-power-expressions']],
    ['exponential-over-polynomial-limit', ['logarithm-power-limit-at-zero']],
    ['logarithm-power-limit-at-zero', ['exponential-over-polynomial-limit']],
    ['periodic-continued-fraction-limit', ['nested-radical-limit', 'infinite-power-tower-limit']],
    ['nested-radical-limit', ['periodic-continued-fraction-limit', 'infinite-power-tower-limit']],
    ['infinite-power-tower-limit', ['periodic-continued-fraction-limit', 'nested-radical-limit']],
    ['differentiate-variable-base-and-exponent', ['derive-exponential-cosine-derivative-from-definition']],
    ['derive-exponential-cosine-derivative-from-definition', ['differentiate-variable-base-and-exponent']],
  ]);
  for (const [slug, expected] of reciprocalProblems) {
    const page = await readPage(`src/content/problems/calculus/${slug}.md`);
    assert.deepEqual(inlineArray(page.frontmatter, 'relatedProblems'), expected, `${slug} graph`);
  }
  for (const slug of ['logarithmic-differentiation', 'related-rates-and-implicit-differentiation']) {
    const page = await readPage(`src/content/knowledge/concepts/${slug}.md`);
    assert.equal(scalar(page.frontmatter, 'category'), 'Problem Solving Techniques');
  }
});

test('every module page remains source-neutral and every Problem remains S3+', async () => {
  for (const slug of exactKnowledgeSlugs) {
    const page = await readPage(`src/content/knowledge/concepts/${slug}.md`);
    assertPublicBoundary(page.text, page.frontmatter, slug);
    assert.match(page.text, /^## Common Mistakes$/m);
    assert.match(page.text, /^## Interview Checks$/m);
  }
  for (const slug of exactProblemSlugs) {
    const page = await readPage(`src/content/problems/calculus/${slug}.md`);
    assertPublicBoundary(page.text, page.frontmatter, slug);
    assert.match(page.text, /<summary>Hint 1<\/summary>/);
    assert.match(page.text, /<summary>Hint 2<\/summary>/);
    assert.match(page.text, /<summary>Show Solution<\/summary>/);
  }
});
```

- [ ] **Step 6: Run the complete module test GREEN and commit**

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
npm run check
npm run build
git add tests/quant-interview-limits-derivatives-content.test.mjs src/content/knowledge/concepts/positive-series-convergence.md src/content/problems/calculus/classify-basic-positive-series.md
git commit -m "feat: complete limits derivatives candidate module"
git status --short
```

Expected: the targeted module, check, and build pass; `git status --short` is empty.

- [ ] **Step 7: Verify the candidate diff contains only the 21 allowed candidate files**

Run:

```bash
git diff --name-only f41880f220991f43d84ddb3795a59b8688e5230c...HEAD
git diff --check f41880f220991f43d84ddb3795a59b8688e5230c...HEAD
```

Expected name set: the seven Knowledge paths, 13 Problem paths, and module-content test listed in the File Structure Map, plus the already-approved spec/plan commits if they are in this branch history. There must be no pre-existing public page, shared data, HANDOFF, global/governance/completion test, taxonomy, manifest, or workflow delta. `git diff --check` emits no output.

- [ ] **Step 8: Push without rewriting history and verify the candidate in a native checkout**

```bash
git push -u origin chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23
candidate_verify_root="$(mktemp -d)"
git clone "$(git remote get-url origin)" "$candidate_verify_root/repo"
git -C "$candidate_verify_root/repo" config core.autocrlf false
git -C "$candidate_verify_root/repo" checkout --detach origin/chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23
cd "$candidate_verify_root/repo"
node --version | grep -Eq '^v24\.'
test -z "$(git grep -Il $'\r' -- '*.md' '*.mjs' '*.js' '*.json' '*.yml' '*.yaml' '*.astro' '*.ts' '*.tsx' '*.css' || true)"
npm ci
node --test tests/quant-interview-limits-derivatives-content.test.mjs
set +e
npm run test 2>&1 | tee candidate-full-suite.log
full_suite_status=${PIPESTATUS[0]}
set -e
test "$full_suite_status" -eq 1
npm run check
npm run build
```

Expected authoritative evidence:

```text
module-content test: PASS
candidate discovery: 72 Problems / 46 Knowledge
full-suite failed subtests: exactly 1
failed subtest name: source-neutral regression discovers exactly the current 59 Problem and 39 Knowledge contracts
failure cause: stale exact 59/39 count/set contract, with only the 13 approved Problem slugs and seven approved Knowledge slugs added
npm run check: PASS
npm run build: PASS
```

Independently enumerate the classified slugs in the native checkout and compare the set delta with `exactProblemSlugs`/`exactKnowledgeSlugs`. If `npm run test` names any second failed subtest or any relationship, schema, coverage, governance, handoff, or unrelated error, the candidate is blocked.

- [ ] **Step 9: Send the untracked candidate report to the coordinator**

The report is a task message, not a repository file. Include all of these factual fields:

```text
frozen base: f41880f220991f43d84ddb3795a59b8688e5230c
frozen-base authoritative environment and Node 24 version
frozen-base ordered test/check/build results: all success
candidate branch and exact candidate HEAD SHA
candidate-owned file set: exact 7 Knowledge + 13 Problems + module test
module-content result: success
candidate discovery: 72 Problems / 46 Knowledge
candidate full-suite exception: only the stale source-neutral 59/39 exact count/set subtest
candidate check/build results: success
proposed coordinator map delta: red-book::6.2.2 and red-book::6.3.2 only
proposed terminal coverage: 20 rows = 12 canonical-problem + 6 merged-duplicate + 2 knowledge-only
proposed integrated registry: 76 Problems / 48 Knowledge after completed 011
candidate lifecycle: active; no completion claim and no CI/HANDOFF/shared-state mutation
```

Do not call the candidate complete.

---

## Phase B — Coordinator Integration and Factual Closure

### Task 11: Gate on Completed Workstream 011 and Port Only Candidate-Owned Files

**Files:**
- Create on a coordinator branch: the same seven Knowledge, 13 Problem, and module-test paths verified in Phase A.
- Preserve: every post-011 shared file until its dedicated coordinator task.

**Interfaces:**
- Consumes: completed 011 manifest `src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json`, exact post-011 `63/41` registry, candidate branch, and candidate report.
- Produces: an integration branch containing only the approved planning documents and 21 candidate implementation files on top of the durable post-011 base.

- [ ] **Step 1: Fetch both serialized branches without rewriting either**

Invoke `superpowers:using-git-worktrees` before creating the coordinator worktree. Fetch the durable coordinator ref and candidate ref, then create 012 only from the fetched durable ref:

```bash
durable_ref='chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17'
integration_ref='chatgpt/quant-interview-integration-limits-derivatives-2026-08-24'
candidate_ref='chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23'
integration_worktree='../quant-interview-integration-limits-derivatives-012'
git fetch origin \
  "refs/heads/${durable_ref}:refs/remotes/origin/${durable_ref}" \
  "refs/heads/${candidate_ref}:refs/remotes/origin/${candidate_ref}"
post_011_sha="$(git rev-parse "origin/${durable_ref}^{commit}")"
git merge-base --is-ancestor f41880f220991f43d84ddb3795a59b8688e5230c "$post_011_sha"
git show "$post_011_sha:src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json" \
  | node --input-type=module -e "let s='';process.stdin.on('data',c=>s+=c).on('end',()=>{const w=JSON.parse(s);if(w.status!=='complete')process.exit(1)})"
git worktree add "$integration_worktree" -b "$integration_ref" "origin/$durable_ref"
cd "$integration_worktree"
```

Expected: the integration branch starts exactly at `post_011_sha`, the completed-011 manifest is present there, and no command rewrites either branch. If the local integration branch already exists, inspect and resume it only when it is an unmodified descendant of this same fetched durable SHA; never delete or overwrite another worker's branch.

- [ ] **Step 2: Prove the selected base is the factual completed 011 state**

Run read-only checks:

```bash
git status --short
node --input-type=module --eval "import {readFileSync} from 'node:fs'; const w=JSON.parse(readFileSync('src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json','utf8')); if(w.status!=='complete'||!/^[0-9a-f]{40}$/.test(w.verification?.commit??'')||!Number.isInteger(w.verification?.runId)||w.verification.runId<=0||w.verification?.conclusion!=='success') process.exit(1);"
rg -n "63 Problem|41 Knowledge|finite-state-markov-chains|markov-chain-state-compression|twelve-before-consecutive-sevens|coin-pattern-hitting-times|random-recoloring-consensus-time|random-walk-return-time-on-cube" tests/quant-interview-source-neutral-content.test.mjs docs/quant-interview/HANDOFF.md
```

Expected: clean status; 011 is complete with real-looking factual evidence; the exact registry includes these four 011 Problems and two 011 Knowledge nodes and asserts `63/41`; HANDOFF identifies Limits & Derivatives as current and does not yet call 012 complete.

- [ ] **Step 3: Re-run the post-011 base gates authoritatively**

In an LF-normalized native-Linux or WSL-native checkout detached at this exact base commit, use Node 24 and run:

```bash
npm ci
npm run test
npm run check
npm run build
```

Expected: all gates pass. Record the exact base SHA and environment externally. Any failure or any count other than `63/41` is base drift; stop and reconcile rather than weakening 012.

- [ ] **Step 4: Verify the candidate implementation path set before porting**

Compare the candidate branch with the frozen base. Ignoring its already-approved spec and plan documents, the implementation delta must be exactly:

```text
src/content/knowledge/concepts/derivative-definition-and-core-rules.md
src/content/knowledge/concepts/logarithmic-differentiation.md
src/content/knowledge/concepts/monotonicity-convexity-critical-points-and-inflection.md
src/content/knowledge/concepts/indeterminate-limits-and-growth-rates.md
src/content/knowledge/concepts/related-rates-and-implicit-differentiation.md
src/content/knowledge/concepts/bounded-monotone-convergence-and-fixed-points.md
src/content/knowledge/concepts/positive-series-convergence.md
src/content/problems/calculus/differentiate-variable-base-and-exponent.md
src/content/problems/calculus/compare-e-pi-power-expressions.md
src/content/problems/calculus/exponential-over-polynomial-limit.md
src/content/problems/calculus/logarithm-power-limit-at-zero.md
src/content/problems/calculus/rotating-lighthouse-beam-related-rate.md
src/content/problems/calculus/radical-difference-limit-at-infinity.md
src/content/problems/calculus/exponential-midpoint-convexity.md
src/content/problems/calculus/periodic-continued-fraction-limit.md
src/content/problems/calculus/normal-cdf-inflection-point.md
src/content/problems/calculus/derive-exponential-cosine-derivative-from-definition.md
src/content/problems/calculus/nested-radical-limit.md
src/content/problems/calculus/infinite-power-tower-limit.md
src/content/problems/calculus/classify-basic-positive-series.md
tests/quant-interview-limits-derivatives-content.test.mjs
```

Reject a candidate delta containing any pre-existing public page, shared JSON, global/governance/completion/HANDOFF test, HANDOFF, taxonomy, manifest, or workflow.

- [ ] **Step 5: Port exactly the approved documents and candidate implementation files**

Use `git restore --source "$candidate_ref" --` followed by the exact two approved document paths and all 21 paths in Step 4:

```text
docs/superpowers/specs/2026-08-24-quant-interview-limits-derivatives-design.md
docs/superpowers/plans/2026-08-24-quant-interview-limits-derivatives.md
```

Do not restore a directory and do not restore any shared file from the candidate. Review `git status --short` and `git diff --stat` immediately.

- [ ] **Step 6: Verify the port before any shared reconciliation**

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
npm run check
npm run build
```

Expected: all pass. `tests/quant-interview-source-neutral-content.test.mjs` remains intentionally stale at post-011 `63/41` and is not edited in this task.

- [ ] **Step 7: Commit only the reviewed port**

```bash
git add docs/superpowers/specs/2026-08-24-quant-interview-limits-derivatives-design.md docs/superpowers/plans/2026-08-24-quant-interview-limits-derivatives.md src/content/knowledge/concepts/derivative-definition-and-core-rules.md src/content/knowledge/concepts/logarithmic-differentiation.md src/content/knowledge/concepts/monotonicity-convexity-critical-points-and-inflection.md src/content/knowledge/concepts/indeterminate-limits-and-growth-rates.md src/content/knowledge/concepts/related-rates-and-implicit-differentiation.md src/content/knowledge/concepts/bounded-monotone-convergence-and-fixed-points.md src/content/knowledge/concepts/positive-series-convergence.md src/content/problems/calculus/differentiate-variable-base-and-exponent.md src/content/problems/calculus/compare-e-pi-power-expressions.md src/content/problems/calculus/exponential-over-polynomial-limit.md src/content/problems/calculus/logarithm-power-limit-at-zero.md src/content/problems/calculus/rotating-lighthouse-beam-related-rate.md src/content/problems/calculus/radical-difference-limit-at-infinity.md src/content/problems/calculus/exponential-midpoint-convexity.md src/content/problems/calculus/periodic-continued-fraction-limit.md src/content/problems/calculus/normal-cdf-inflection-point.md src/content/problems/calculus/derive-exponential-cosine-derivative-from-definition.md src/content/problems/calculus/nested-radical-limit.md src/content/problems/calculus/infinite-power-tower-limit.md src/content/problems/calculus/classify-basic-positive-series.md tests/quant-interview-limits-derivatives-content.test.mjs
git commit -m "feat: port limits derivatives candidate module"
```

Expected: a focused commit with no shared-state edit.

---

### Task 12: Repair the Two Red Source Mappings and Register Workstream 012 as Active

**Files:**
- Create: `tests/quant-interview-limits-derivatives-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json`
- Modify: `src/data/quant-interview/topics/source-topic-map.json`
- Modify: `src/data/quant-interview/coverage/red-book.json` only to synchronize the two affected nonterminal section rows in this task.

**Interfaces:**
- Consumes: `validateTopicWorkstream(workstream, context) -> true`, completed 011 manifest, HANDOFF current-topic text, taxonomy, source manifests, and the unchanged post-011 source-map baseline.
- Produces: exact Red mappings `[limits-derivatives, integration]`, active manifest without closure fields, test helpers `keyOf(entry)`, `coverageRows(source)`, `assertCoverageSource(source, expectedRows)`, and mutable `expectedCoverage` used by Tasks 13–16.

- [ ] **Step 1: Write the source-map and active-registration RED test**

Create `tests/quant-interview-limits-derivatives-workstream.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const manifestPath = 'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json';
const mapPath = 'src/data/quant-interview/topics/source-topic-map.json';
const handoffPath = 'docs/quant-interview/HANDOFF.md';
const manifest011Path = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const manifest013Path = 'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';
const terminalStates = new Set(['canonical-problem', 'merged-duplicate', 'variant', 'knowledge-only']);
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;
const expectedCoverage = {};

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

async function context() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson(mapPath);
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/${source}.json`)]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(files.filter((file) => String(file).endsWith('.md')).map((file) => path.basename(String(file), '.md')));
}

async function coverageRows(source) {
  const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
  return { ledger, rows: new Map(ledger.entries.map((entry) => [keyOf(entry), entry])) };
}

async function assertCoverageSource(source, expectedRows) {
  const { ledger, rows } = await coverageRows(source);
  for (const [key, expected] of Object.entries(expectedRows)) {
    assert.ok(rows.has(key), `${source} missing ${key}`);
    const row = rows.get(key);
    assert.equal(row.state, expected.state, `${source} ${key} state`);
    assert.deepEqual(row.canonicalTopics, ['limits-derivatives'], `${source} ${key} topics`);
    assert.deepEqual(row.canonicalProblems, expected.canonicalProblems, `${source} ${key} Problems`);
    assert.deepEqual(row.canonicalKnowledge, expected.canonicalKnowledge, `${source} ${key} Knowledge`);
    assert.equal(row.resolutionNote, expected.resolutionNote, `${source} ${key} resolution note`);
  }
  const actualOwned = ledger.entries
    .filter((entry) => terminalStates.has(entry.state) && entry.canonicalTopics?.includes('limits-derivatives'))
    .map(keyOf)
    .sort();
  assert.deepEqual(actualOwned, Object.keys(expectedRows).sort(), `${source} has an unexpected 012 terminal row`);
  return Object.keys(expectedRows).map((key) => rows.get(key));
}

test('exactly two Red source mappings change and every other map entry stays frozen', async () => {
  const sourceTopicMap = await readJson(mapPath);
  const byKey = new Map(sourceTopicMap.entries.map((entry) => [`${entry.source}::${entry.sourceSection}`, entry]));
  assert.deepEqual(byKey.get('red-book::6.2.2')?.canonicalTopics, ['limits-derivatives', 'integration']);
  assert.deepEqual(byKey.get('red-book::6.3.2')?.canonicalTopics, ['limits-derivatives', 'integration']);
  const repairedKeys = new Set(['red-book::6.2.2', 'red-book::6.3.2']);
  const protectedEntries = sourceTopicMap.entries.filter((entry) => !repairedKeys.has(`${entry.source}::${entry.sourceSection}`));
  assert.equal(sourceTopicMap.entries.length, 281);
  assert.equal(protectedEntries.length, 279);
  assert.equal(
    createHash('sha256').update(JSON.stringify(protectedEntries)).digest('hex'),
    'bba6c9a65d63e31884acfcc9be1c8038c1e484da6ceb62315a3f5ebb5ad8f3db',
  );
});

test('012 manifest has the exact three-source active contract', async () => {
  const workstream = await readJson(manifestPath);
  assert.equal(workstream.id, 'calculus-differential-equations-limits-derivatives-012');
  assert.deepEqual(workstream.canonicalTopics, ['calculus-differential-equations', 'limits-derivatives']);
  assert.match(workstream.status, /^(?:active|complete)$/);
  assert.deepEqual(workstream.sourceScopes, [
    {
      source: 'green-book',
      sourceSections: ['3.1', '3.1.1', '3.1.2', '3.1.3'],
      evidencePageRanges: [{ startPage: 49, endPage: 52 }],
      reviewOutcome: 'bounded-item-level-review',
      reviewNote: 'Four Green rows resolve to three canonical-problem decisions and one knowledge-only decision; 3.1.3 owns two independent canonical Problems.',
    },
    {
      source: 'red-book',
      sourceSections: ['6.1', '6.2.1', '6.2.2', '6.3.1', '6.3.2', '10', '10.2'],
      evidencePageRanges: [{ startPage: 201, endPage: 229 }, { startPage: 317, endPage: 318 }],
      reviewOutcome: 'bounded-item-level-review',
      reviewNote: 'Ten Red rows resolve to six canonical Problems, three merged duplicates, and one knowledge-only decision. Adjacent items are reviewed-no-new-ownership or out of scope, and existing Q6.9/Q6.10 ownership remains unchanged.',
    },
    {
      source: '150-most-frequently-asked',
      sourceSections: ['1', '2.1', '3.1'],
      evidencePageRanges: [{ startPage: 11, endPage: 12 }, { startPage: 27, endPage: 28 }, { startPage: 50, endPage: 65 }],
      reviewOutcome: 'bounded-item-level-review',
      reviewNote: 'Six item-level rows resolve to three canonical Problems and three merged duplicates. Other reviewed material has no new bounded Limits & Derivatives ownership.',
    },
  ]);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});

test('012 lifecycle registration is phase-safe and serialized after completed 011', async () => {
  const workstream = await readJson(manifestPath);
  const workstream011 = await readJson(manifest011Path);
  const handoff = await readFile(handoffPath, 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';
  assert.equal(workstream011.status, 'complete');
  if (workstream.status === 'active') {
    assert.equal(Object.hasOwn(workstream, 'preClosureActiveGate'), false);
    assert.equal(Object.hasOwn(workstream, 'verification'), false);
    assert.match(current, /Limits & Derivatives/i);
    assert.doesNotMatch(current, /Reasoning & Communication/i);
    assert.equal(await exists(manifest013Path), false);
  }
});
```

- [ ] **Step 2: Run registration RED**

Run:

```bash
node --test tests/quant-interview-limits-derivatives-workstream.test.mjs
```

Expected: the source-map subtest fails because both entries are still `['integration']`; the manifest subtests fail with `ENOENT` for the 012 manifest. The test file itself must parse.

- [ ] **Step 3: Repair exactly the two source-map entries**

In `src/data/quant-interview/topics/source-topic-map.json`, change only:

```json
{
  "source": "red-book",
  "sourceSection": "6.2.2",
  "role": "content",
  "canonicalTopics": ["limits-derivatives", "integration"]
}
```

and:

```json
{
  "source": "red-book",
  "sourceSection": "6.3.2",
  "role": "content",
  "canonicalTopics": ["limits-derivatives", "integration"]
}
```

No other map entry changes.

- [ ] **Step 4: Synchronize only the two affected nonterminal Red section rows**

The section-level coverage validator requires exact equality with its map entry. In `src/data/quant-interview/coverage/red-book.json`, keep both rows `state: pending` with empty targets, but change the `canonicalTopics` array on `6.2.2::` and `6.3.2::` to:

```json
["limits-derivatives", "integration"]
```

These remain nonterminal routing rows and are not part of the 20-row terminal count.

- [ ] **Step 5: Create the exact active manifest**

Create `src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json` with the exact object asserted in Step 1 and:

```json
{
  "id": "calculus-differential-equations-limits-derivatives-012",
  "canonicalTopics": ["calculus-differential-equations", "limits-derivatives"],
  "status": "active",
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": ["3.1", "3.1.1", "3.1.2", "3.1.3"],
      "evidencePageRanges": [
        {"startPage": 49, "endPage": 52}
      ],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Four Green rows resolve to three canonical-problem decisions and one knowledge-only decision; 3.1.3 owns two independent canonical Problems."
    },
    {
      "source": "red-book",
      "sourceSections": ["6.1", "6.2.1", "6.2.2", "6.3.1", "6.3.2", "10", "10.2"],
      "evidencePageRanges": [
        {"startPage": 201, "endPage": 229},
        {"startPage": 317, "endPage": 318}
      ],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Ten Red rows resolve to six canonical Problems, three merged duplicates, and one knowledge-only decision. Adjacent items are reviewed-no-new-ownership or out of scope, and existing Q6.9/Q6.10 ownership remains unchanged."
    },
    {
      "source": "150-most-frequently-asked",
      "sourceSections": ["1", "2.1", "3.1"],
      "evidencePageRanges": [
        {"startPage": 11, "endPage": 12},
        {"startPage": 27, "endPage": 28},
        {"startPage": 50, "endPage": 65}
      ],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Six item-level rows resolve to three canonical Problems and three merged duplicates. Other reviewed material has no new bounded Limits & Derivatives ownership."
    }
  ]
}
```

Do not add `preClosureActiveGate`, `verification`, a commit, a run ID, or a success conclusion.

- [ ] **Step 6: Turn registration GREEN and prove the map-only delta**

```bash
node --test tests/quant-interview-limits-derivatives-workstream.test.mjs
git diff -- src/data/quant-interview/topics/source-topic-map.json
git diff -- src/data/quant-interview/coverage/red-book.json
```

Expected: targeted test passes. The map diff contains exactly two canonical-topic array changes. The Red-ledger diff contains exactly the matching two nonterminal array changes; no terminal row exists yet.

- [ ] **Step 7: Commit active registration and routing repair**

```bash
git add tests/quant-interview-limits-derivatives-workstream.test.mjs src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json src/data/quant-interview/topics/source-topic-map.json src/data/quant-interview/coverage/red-book.json
git commit -m "feat: register active limits derivatives workstream"
```

---

### Task 13: Reconcile the Four Exact Green Coverage Rows

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-workstream.test.mjs`
- Modify: `src/data/quant-interview/coverage/green-book.json`

**Interfaces:**
- Consumes: `assertCoverageSource(source, expectedRows) -> Promise<object[]>` from Task 12 and real candidate slugs from Task 11.
- Produces: four exact Green terminal rows: `3 canonical-problem + 1 knowledge-only`; `3.1.3::` stays one row with two Problem targets.

- [ ] **Step 1: Add the exact Green expected object and RED test**

Immediately after `const expectedCoverage = {};`, add:

```js
expectedCoverage['green-book'] = {
  '3.1::': {
    state: 'knowledge-only',
    canonicalProblems: [],
    canonicalKnowledge: ['derivative-definition-and-core-rules', 'logarithmic-differentiation', 'monotonicity-convexity-critical-points-and-inflection', 'indeterminate-limits-and-growth-rates'],
    resolutionNote: 'Reusable derivative definitions and rules, logarithmic differentiation, qualitative derivative analysis, and elementary limit theory are fused into four public Knowledge nodes with visible Interview Checks.',
  },
  '3.1.1::': {
    state: 'canonical-problem',
    canonicalProblems: ['differentiate-variable-base-and-exponent'],
    canonicalKnowledge: ['derivative-definition-and-core-rules', 'logarithmic-differentiation'],
    resolutionNote: 'The canonical Problem derives the positive variable-base/variable-exponent rule, explicitly differentiates x^x on x>0, and applies the rule to the log-power case on x>1.',
  },
  '3.1.2::': {
    state: 'canonical-problem',
    canonicalProblems: ['compare-e-pi-power-expressions'],
    canonicalKnowledge: ['monotonicity-convexity-critical-points-and-inflection', 'derivative-definition-and-core-rules'],
    resolutionNote: 'The canonical comparison uses the sign of the first derivative on full intervals; a second derivative is only a local check and zero is inconclusive without a sign change.',
  },
  '3.1.3::': {
    state: 'canonical-problem',
    canonicalProblems: ['exponential-over-polynomial-limit', 'logarithm-power-limit-at-zero'],
    canonicalKnowledge: ['indeterminate-limits-and-growth-rates', 'derivative-definition-and-core-rules'],
    resolutionNote: "One source row contains two independent limit identities, so it resolves to two Problems; both enforce the L'Hopital gate and the origin limit preserves its approach from below.",
  },
};
```

Append:

```js
test('Green has exactly four 012 terminal rows with a 3/0/1 split', async () => {
  const rows = await assertCoverageSource('green-book', expectedCoverage['green-book']);
  assert.equal(rows.length, 4);
  assert.equal(rows.filter((row) => row.state === 'canonical-problem').length, 3);
  assert.equal(rows.filter((row) => row.state === 'merged-duplicate').length, 0);
  assert.equal(rows.filter((row) => row.state === 'knowledge-only').length, 1);
  const multiTarget = rows.find((row) => keyOf(row) === '3.1.3::');
  assert.deepEqual(multiTarget?.canonicalProblems, ['exponential-over-polynomial-limit', 'logarithm-power-limit-at-zero']);
  const { ledger } = await coverageRows('green-book');
  assert.equal(ledger.entries.filter((row) => keyOf(row) === '3.1.3::').length, 1);
});
```

- [ ] **Step 2: Run Green coverage RED**

Run `node --test tests/quant-interview-limits-derivatives-workstream.test.mjs`.

Expected: registration/map subtests pass; the new Green subtest fails first with `actual 'pending' !== expected 'knowledge-only'` at `3.1::`.

- [ ] **Step 3: Replace the four existing pending Green row bodies exactly**

For each key in `expectedCoverage['green-book']`, preserve its existing `sourceSection` and `sourceItem: null`; replace `state`, target arrays, and add the exact `resolutionNote`. Every row's `canonicalTopics` remains exactly:

```json
["limits-derivatives"]
```

Do not create a second `3.1.3::` row and do not invent a source item to split its two Problems.

- [ ] **Step 4: Turn Green coverage GREEN and commit**

```bash
node --test tests/quant-interview-limits-derivatives-workstream.test.mjs
git diff -- src/data/quant-interview/coverage/green-book.json
git add tests/quant-interview-limits-derivatives-workstream.test.mjs src/data/quant-interview/coverage/green-book.json
git commit -m "test: reconcile limits derivatives Green coverage"
```

Expected: targeted tests pass; the Green ledger diff changes only the exact four existing rows.

---

### Task 14: Reconcile the Ten Exact Red Coverage Rows and Preserve Q6.9/Q6.10

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-workstream.test.mjs`
- Modify: `src/data/quant-interview/coverage/red-book.json`

**Interfaces:**
- Consumes: the repaired Red mappings and synchronized nonterminal section rows from Task 12.
- Produces: ten exact Red terminal rows with split `6 canonical-problem / 3 merged-duplicate / 1 knowledge-only`, while preserving the full pre-012 Q6.9/Q6.10 objects.

- [ ] **Step 1: Add the exact Red expected object**

After the Green expected object, add:

```js
expectedCoverage['red-book'] = {
  '6.2.1::6.1': {
    state: 'canonical-problem',
    canonicalProblems: ['rotating-lighthouse-beam-related-rate'],
    canonicalKnowledge: ['related-rates-and-implicit-differentiation', 'derivative-definition-and-core-rules'],
    resolutionNote: 'The canonical lighthouse Problem models s=a tan theta, derives the general related rate, and specializes one revolution per minute to 2 pi a secant-squared theta miles per minute.',
  },
  '6.2.1::6.2': {
    state: 'canonical-problem',
    canonicalProblems: ['radical-difference-limit-at-infinity'],
    canonicalKnowledge: ['indeterminate-limits-and-growth-rates'],
    resolutionNote: 'The canonical Problem rationalizes sqrt(x squared plus 5x) minus x and preserves the finite limit 5/2 instead of subtracting infinities.',
  },
  '6.2.1::6.5': {
    state: 'canonical-problem',
    canonicalProblems: ['exponential-midpoint-convexity'],
    canonicalKnowledge: ['monotonicity-convexity-critical-points-and-inflection'],
    resolutionNote: 'The canonical Problem proves exponential midpoint convexity and records equality exactly at equal endpoints.',
  },
  '6.2.1::6.6': {
    state: 'merged-duplicate',
    canonicalProblems: ['compare-e-pi-power-expressions'],
    canonicalKnowledge: ['monotonicity-convexity-critical-points-and-inflection', 'derivative-definition-and-core-rules'],
    resolutionNote: 'This asks the same transcendental-power comparison as the Green item and is absorbed into one source-neutral monotonicity Problem.',
  },
  '6.2.1::6.7': {
    state: 'canonical-problem',
    canonicalProblems: ['periodic-continued-fraction-limit'],
    canonicalKnowledge: ['bounded-monotone-convergence-and-fixed-points'],
    resolutionNote: 'The canonical recurrence starts at c0=2 with c(n+1)=2+2/cn, proves convergence of finite convergents, and only then selects 1+sqrt(3) from the fixed-point roots.',
  },
  '6.2.1::6.8': {
    state: 'canonical-problem',
    canonicalProblems: ['normal-cdf-inflection-point'],
    canonicalKnowledge: ['monotonicity-convexity-critical-points-and-inflection', 'derivative-definition-and-core-rules'],
    resolutionNote: 'The canonical Problem differentiates the Normal CDF with sigma positive and proves the unique inflection through an actual sign change of the second derivative.',
  },
  '6.2.1::6.16': {
    state: 'merged-duplicate',
    canonicalProblems: ['classify-basic-positive-series'],
    canonicalKnowledge: ['positive-series-convergence'],
    resolutionNote: 'The exact harmonic, square, and logarithmic-harmonic series triple is owned by the canonical Problem and adds no separate public identity.',
  },
  '6.2.2::6.18': {
    state: 'merged-duplicate',
    canonicalProblems: ['differentiate-variable-base-and-exponent'],
    canonicalKnowledge: ['derivative-definition-and-core-rules', 'logarithmic-differentiation'],
    resolutionNote: 'The x^x derivative on x>0 is absorbed into the canonical positive variable-base/variable-exponent Problem.',
  },
  '6.2.2::6.20': {
    state: 'canonical-problem',
    canonicalProblems: ['derive-exponential-cosine-derivative-from-definition'],
    canonicalKnowledge: ['derivative-definition-and-core-rules'],
    resolutionNote: 'The canonical Problem derives the derivative of exp(cos x) from an exact difference-quotient factorization and standard limits, without Taylor series.',
  },
  '6.2.2::6.21': {
    state: 'knowledge-only',
    canonicalProblems: [],
    canonicalKnowledge: ['derivative-definition-and-core-rules'],
    resolutionNote: 'The reusable derivative-rule review is fused into core public Knowledge, including an Interview Check that differentiates x ln x on x>0 as ln x+1.',
  },
};
```

- [ ] **Step 2: Append exact Red split, override, and prior-ownership tests**

```js
test('Red has exactly ten 012 terminal rows with a 6/3/1 split and no repaired-section overrides', async () => {
  const rows = await assertCoverageSource('red-book', expectedCoverage['red-book']);
  assert.equal(rows.length, 10);
  assert.equal(rows.filter((row) => row.state === 'canonical-problem').length, 6);
  assert.equal(rows.filter((row) => row.state === 'merged-duplicate').length, 3);
  assert.equal(rows.filter((row) => row.state === 'knowledge-only').length, 1);
  for (const item of ['6.18', '6.20', '6.21']) {
    const row = rows.find((entry) => entry.sourceSection === '6.2.2' && entry.sourceItem === item);
    assert.ok(row, `missing Red ${item}`);
    assert.equal(Object.hasOwn(row, 'topicOverrideReason'), false, `Red ${item} must not carry an override after the map repair`);
  }
});

test('Red Q6.9 and Q6.10 retain their complete pre-012 ownership and are outside the twenty rows', async () => {
  const { rows } = await coverageRows('red-book');
  assert.deepEqual(rows.get('6.2.1::6.9'), {
    sourceSection: '6.2.1',
    sourceItem: '6.9',
    canonicalTopics: ['linear-algebra-matrix-methods', 'positive-semidefinite-matrices'],
    state: 'knowledge-only',
    canonicalProblems: [],
    canonicalKnowledge: ['positive-semidefinite-matrix', 'principal-minor-feasibility'],
    topicOverrideReason: 'Item-level review classifies this specific covariance/correlation/PSD item more precisely than the broader editorial TOC section when necessary.',
    resolutionNote: 'Definition/properties material enriches canonical PSD/PD Knowledge and interview checks.',
  });
  assert.deepEqual(rows.get('6.2.1::6.10'), {
    sourceSection: '6.2.1',
    sourceItem: '6.10',
    canonicalTopics: ['matrix-decompositions'],
    state: 'canonical-problem',
    canonicalProblems: ['matrix-square-root-and-cholesky-factor'],
    canonicalKnowledge: ['eigenbasis-decomposition', 'lu-cholesky-decomposition'],
    resolutionNote: 'This task is the semantic anchor for the canonical matrix-square-root and Gram-factor Problem. Its entrywise square-root route is retained as an alternative method while the canonical page foregrounds reusable spectral and Cholesky structure.',
  });
  assert.equal(Object.hasOwn(expectedCoverage['red-book'], '6.2.1::6.9'), false);
  assert.equal(Object.hasOwn(expectedCoverage['red-book'], '6.2.1::6.10'), false);
});
```

- [ ] **Step 3: Run Red coverage RED**

Run `node --test tests/quant-interview-limits-derivatives-workstream.test.mjs`.

Expected: map/manifest/Green/Q6.9/Q6.10 tests pass; the ten-row test fails with `red-book missing 6.2.1::6.1`.

- [ ] **Step 4: Add exactly the ten terminal Red rows**

For each expected key, add one JSON entry with the exact `sourceSection`, string `sourceItem`, `canonicalTopics: ["limits-derivatives"]`, state, targets, and resolution note above. Do not add `topicOverrideReason` to any new row. Preserve the two nonterminal section routing updates from Task 12 and preserve every pre-existing object byte-for-byte except JSON comma placement.

- [ ] **Step 5: Turn Red coverage GREEN and commit**

```bash
node --test tests/quant-interview-limits-derivatives-workstream.test.mjs
git diff -- src/data/quant-interview/coverage/red-book.json
git add tests/quant-interview-limits-derivatives-workstream.test.mjs src/data/quant-interview/coverage/red-book.json
git commit -m "test: reconcile limits derivatives Red coverage"
```

Expected: targeted test passes. Relative to the post-011 base, the final Red diff contains only two nonterminal topic-array synchronizations and ten new terminal rows; Q6.9/Q6.10 are unchanged.

---

### Task 15: Reconcile the Six Exact 150-Question Coverage Rows

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-workstream.test.mjs`
- Modify: `src/data/quant-interview/coverage/150-most-frequently-asked.json`

**Interfaces:**
- Consumes: the six real canonical Problem targets and four Knowledge targets already ported in Task 11.
- Produces: six item-level `2.1` rows with split `3 canonical-problem / 3 merged-duplicate / 0 knowledge-only`; the broad `2.1::` container remains nonterminal.

- [ ] **Step 1: Add the exact 150 expected object**

After the Red expected object, add:

```js
expectedCoverage['150-most-frequently-asked'] = {
  '2.1::2': {
    state: 'merged-duplicate',
    canonicalProblems: ['compare-e-pi-power-expressions'],
    canonicalKnowledge: ['monotonicity-convexity-critical-points-and-inflection', 'derivative-definition-and-core-rules'],
    resolutionNote: 'This is the same transcendental-power comparison already represented by the canonical monotonicity Problem.',
  },
  '2.1::3': {
    state: 'merged-duplicate',
    canonicalProblems: ['exponential-midpoint-convexity'],
    canonicalKnowledge: ['monotonicity-convexity-critical-points-and-inflection'],
    resolutionNote: 'This is the same exponential midpoint-convexity identity and is absorbed as alternate evidence rather than duplicated publicly.',
  },
  '2.1::5': {
    state: 'merged-duplicate',
    canonicalProblems: ['differentiate-variable-base-and-exponent'],
    canonicalKnowledge: ['derivative-definition-and-core-rules', 'logarithmic-differentiation'],
    resolutionNote: 'This x^x derivative on x>0 is absorbed into the same canonical positive variable-base/variable-exponent Problem.',
  },
  '2.1::6': {
    state: 'canonical-problem',
    canonicalProblems: ['nested-radical-limit'],
    canonicalKnowledge: ['bounded-monotone-convergence-and-fixed-points'],
    resolutionNote: 'The canonical nested-radical Problem proves bounded monotone convergence before selecting the positive fixed point.',
  },
  '2.1::7': {
    state: 'canonical-problem',
    canonicalProblems: ['infinite-power-tower-limit'],
    canonicalKnowledge: ['bounded-monotone-convergence-and-fixed-points'],
    resolutionNote: 'The canonical Problem first finds the positive base sqrt(2) for tower value 2, then proves the finite towers increase below 2 and reject fixed-point branch 4.',
  },
  '2.1::8': {
    state: 'canonical-problem',
    canonicalProblems: ['classify-basic-positive-series'],
    canonicalKnowledge: ['positive-series-convergence'],
    resolutionNote: 'The canonical Problem proves divergence of the harmonic and logarithmic-harmonic series and convergence of the square series by elementary non-integral arguments.',
  },
};
```

- [ ] **Step 2: Append the exact 150 split and no-synthetic-row test**

```js
test('150 source has exactly six 012 item rows with a 3/3/0 split and no synthetic container ownership', async () => {
  const rows = await assertCoverageSource('150-most-frequently-asked', expectedCoverage['150-most-frequently-asked']);
  assert.equal(rows.length, 6);
  assert.equal(rows.filter((row) => row.state === 'canonical-problem').length, 3);
  assert.equal(rows.filter((row) => row.state === 'merged-duplicate').length, 3);
  assert.equal(rows.filter((row) => row.state === 'knowledge-only').length, 0);
  for (const row of rows) assert.equal(Object.hasOwn(row, 'topicOverrideReason'), false);
  const { rows: allRows } = await coverageRows('150-most-frequently-asked');
  const container = allRows.get('2.1::');
  assert.equal(container?.state, 'pending');
  assert.deepEqual(container?.canonicalProblems, []);
  assert.deepEqual(container?.canonicalKnowledge, []);
});
```

- [ ] **Step 3: Run 150 coverage RED**

Run `node --test tests/quant-interview-limits-derivatives-workstream.test.mjs`.

Expected: all preceding tests pass; the new test fails with `150-most-frequently-asked missing 2.1::2`.

- [ ] **Step 4: Add exactly six `2.1` item rows**

Add one JSON object per expected key. Use string `sourceItem` values, exact `canonicalTopics: ["limits-derivatives"]`, exact states/targets/notes, and no `topicOverrideReason`. Do not change the broad pending `2.1::` row and do not add rows for reviewed items outside `2,3,5,6,7,8`.

- [ ] **Step 5: Turn 150 coverage GREEN and commit**

```bash
node --test tests/quant-interview-limits-derivatives-workstream.test.mjs
git diff -- src/data/quant-interview/coverage/150-most-frequently-asked.json
git add tests/quant-interview-limits-derivatives-workstream.test.mjs src/data/quant-interview/coverage/150-most-frequently-asked.json
git commit -m "test: reconcile limits derivatives 150 coverage"
```

Expected: targeted tests pass and the ledger diff contains exactly six new item-level entries.

---

### Task 16: Complete the Shared Workstream Audit and Exact 76/48 Registry Regression

**Files:**
- Modify: `tests/quant-interview-limits-derivatives-workstream.test.mjs`
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`

**Interfaces:**
- Consumes: the three exact `expectedCoverage` source objects, real public slugs, `validateCoverageLedger(ledger, context) -> true`, and the completed post-011 exact registry.
- Produces: one strict 20-row `12/6/2` audit, three real-target ledger validations, and the complete exact public registry transition `63/41 -> 76/48`.

- [ ] **Step 1: Append the aggregate coverage and real-target validation tests**

Append to the workstream test:

```js
test('the complete 012 terminal audit is exactly twenty rows split 12/6/2', async () => {
  const rowsBySource = await Promise.all(
    Object.entries(expectedCoverage).map(([source, expected]) => assertCoverageSource(source, expected)),
  );
  const rows = rowsBySource.flat();
  assert.equal(rows.length, 20);
  assert.equal(rows.filter((row) => row.state === 'canonical-problem').length, 12);
  assert.equal(rows.filter((row) => row.state === 'merged-duplicate').length, 6);
  assert.equal(rows.filter((row) => row.state === 'knowledge-only').length, 2);
  for (const row of rows) {
    assert.deepEqual(row.canonicalTopics, ['limits-derivatives']);
    assert.ok(row.resolutionNote.length > 0);
  }
});

test('all three current ledgers validate with real 012 Problem and Knowledge slugs', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson(mapPath);
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');
  for (const source of ['green-book', 'red-book', '150-most-frequently-asked']) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      sourceTopicMap,
      taxonomy,
      problemSlugs,
      knowledgeSlugs,
      allowUnresolvedCanonicalRefs: false,
    }), `${source} fails strict real-target coverage validation`);
  }
});
```

- [ ] **Step 2: Run the stale global regression to capture its exact RED**

Before editing `tests/quant-interview-source-neutral-content.test.mjs`, run:

```bash
node --test tests/quant-interview-source-neutral-content.test.mjs
```

Expected: the exact registry subtest that still names `63 Problem and 41 Knowledge contracts` fails on the Problem count with `76 !== 63`. No source-neutrality or other subtest fails.

- [ ] **Step 3: Verify the post-011 entries are present before extending them**

The existing `currentProblemSlugs` must contain all four and the existing `expectedKnowledgeTopics` must contain both:

```js
const required011Problems = [
  'twelve-before-consecutive-sevens',
  'coin-pattern-hitting-times',
  'random-recoloring-consensus-time',
  'random-walk-return-time-on-cube',
];

const required011Knowledge = new Map([
  ['finite-state-markov-chains', ['stochastic-processes-stochastic-calculus', 'random-walks-markov-chains']],
  ['markov-chain-state-compression', ['stochastic-processes-stochastic-calculus', 'random-walks-markov-chains']],
]);
```

If an entry is absent or the existing test no longer asserts exact `63/41`, stop for base drift. Do not reconstruct the file from frozen `59/39` content and thereby discard 011.

- [ ] **Step 4: Add exactly the 13 approved Problem slugs to the complete post-011 array**

Append these values once to `currentProblemSlugs`:

```js
'differentiate-variable-base-and-exponent',
'compare-e-pi-power-expressions',
'exponential-over-polynomial-limit',
'logarithm-power-limit-at-zero',
'rotating-lighthouse-beam-related-rate',
'radical-difference-limit-at-infinity',
'exponential-midpoint-convexity',
'periodic-continued-fraction-limit',
'normal-cdf-inflection-point',
'derive-exponential-cosine-derivative-from-definition',
'nested-radical-limit',
'infinite-power-tower-limit',
'classify-basic-positive-series',
```

Do not remove, reorder semantically, or omit any of the existing 63 entries; the test sorts before comparing exact sets.

- [ ] **Step 5: Add exactly seven Knowledge topic entries**

Append to `expectedKnowledgeTopics`:

```js
['derivative-definition-and-core-rules', ['calculus-differential-equations', 'limits-derivatives']],
['logarithmic-differentiation', ['calculus-differential-equations', 'limits-derivatives']],
['monotonicity-convexity-critical-points-and-inflection', ['calculus-differential-equations', 'limits-derivatives']],
['indeterminate-limits-and-growth-rates', ['calculus-differential-equations', 'limits-derivatives']],
['related-rates-and-implicit-differentiation', ['calculus-differential-equations', 'limits-derivatives']],
['bounded-monotone-convergence-and-fixed-points', ['calculus-differential-equations', 'limits-derivatives']],
['positive-series-convergence', ['calculus-differential-equations', 'limits-derivatives']],
```

- [ ] **Step 6: Freeze the exact integrated counts without lower bounds**

Replace only the registry test name and exact numeric assertions:

```js
test('source-neutral regression discovers exactly the current 76 Problem and 48 Knowledge contracts', async () => {
  const actualProblemSlugs = await classifiedMarkdownSlugs('src/content/problems');
  const actualKnowledgeSlugs = await classifiedMarkdownSlugs('src/content/knowledge');
  const expectedProblemSlugs = [...currentProblemSlugs].sort();
  const expectedKnowledgeSlugs = [...expectedKnowledgeTopics.keys()].sort();

  assert.equal(actualProblemSlugs.length, 76);
  assert.equal(actualKnowledgeSlugs.length, 48);
  assert.deepEqual(actualProblemSlugs, expectedProblemSlugs);
  assert.deepEqual(actualKnowledgeSlugs, expectedKnowledgeSlugs);
});
```

This retains full exact set equality; `>= 76`, partial arrays, and count-only checks are invalid.

- [ ] **Step 7: Run all module/shared targeted regressions GREEN**

```bash
node --test tests/quant-interview-limits-derivatives-content.test.mjs
node --test tests/quant-interview-limits-derivatives-workstream.test.mjs
node --test tests/quant-interview-source-neutral-content.test.mjs
npm run check
npm run build
git diff --check
```

Expected: all pass and `git diff --check` emits no output. Do not call the integration fully green until lifecycle/governance tests are reconciled in Task 17.

- [ ] **Step 8: Prove no taxonomy or unrelated shared delta and commit**

```bash
git diff -- src/data/quant-interview/topics/taxonomy.json
git diff --name-only
git add tests/quant-interview-limits-derivatives-workstream.test.mjs tests/quant-interview-source-neutral-content.test.mjs
git commit -m "test: enforce limits derivatives audit and registry"
```

Expected: taxonomy diff is empty. This commit changes only the two tests; all ledger/map/manifest changes were committed in their dedicated tasks.

---

### Task 17: Make Lifecycle Governance Phase-Safe and Obtain the Active Integrated CI Evidence

**Files:**
- Create: `tests/quant-interview-limits-derivatives-completion.test.mjs`
- Modify: `tests/quant-interview-parallel-workstream-governance.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`
- Modify: `tests/quant-interview-random-walks-markov-chains-completion.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md` only to mark reservation 012 active; do not add a completed-012 section yet.
- Create temporarily: `.github/workflows/quant-interview-limits-derivatives-012-temporary.yml`

**Interfaces:**
- Consumes: the fully reconciled active `76/48` tree, completed 011 lifecycle evidence, the unchanged normative parallel-workstream policy, GitHub Actions, and the authoritative Linux/WSL-native Node 24 gate.
- Produces: one full test glob that passes while 012 is active and after it becomes complete, continued protection against premature 013 execution, and a real successful Ubuntu/Node 24 run whose `head_sha` is the exact active integrated commit retained externally for Task 18.

- [ ] **Step 1: Create the active-phase completion contract**

Create `tests/quant-interview-limits-derivatives-completion.test.mjs` exactly as follows. The deliberate complete-branch failure prevents anyone from flipping the manifest before Task 18 inserts factual constants; it is not an unconditional active assertion, and the active branch exits successfully.

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const workstreamPath = 'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json';
const workstream011Path = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const workstream013Path = 'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';
const workflowName = 'quant-interview-limits-derivatives-012-temporary.yml';
const commands = ['npm run test', 'npm run check', 'npm run build'];
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

function handoffSection(handoff, heading) {
  return handoff.split(new RegExp(`## ${heading}`, 'i'))[1]?.split(/\n## /)[0] ?? '';
}

test('012 completion contract is phase-safe and serialized after completed 011', async () => {
  const workstream = await readJson(workstreamPath);
  const workstream011 = await readJson(workstream011Path);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/\n## /)[0] ?? '';
  const coordination = handoffSection(handoff, 'Parallel workstream coordination');
  const reservation012 = coordination.split(/\r?\n/).find((line) => /\|\s*012\s*\|/.test(line)) ?? '';

  assert.equal(workstream011.status, 'complete');
  assert.match(workstream.status, /^(?:active|complete)$/);
  if (workstream.status === 'active') {
    assert.equal(Object.hasOwn(workstream, 'preClosureActiveGate'), false);
    assert.equal(Object.hasOwn(workstream, 'verification'), false);
    assert.match(current, /Calculus & Differential Equations/i);
    assert.match(current, /Limits & Derivatives/i);
    assert.doesNotMatch(current, /Reasoning & Communication|Random Walks & Markov Chains/i);
    assert.match(reservation012, /\|\s*active\s*\|/i);
    assert.match(coordination, /completed queue entry[^\n]*011/i);
    assert.match(coordination, /remaining integration queue[^\n]*012[^\n]*013/i);
    assert.doesNotMatch(coordination, /completed queue entry[^\n]*012/i);
    await assert.rejects(access(workstream013Path));
    return;
  }

  assert.fail('complete 012 must be sealed by the factual-constants branch in Task 18');
});

test('only the named 012 temporary workflow can exist before closure', async () => {
  const workstream = await readJson(workstreamPath);
  const workflowFiles = await readdir('.github/workflows');
  const candidates = workflowFiles.filter((file) => /(?:limits[-_]derivatives|012)/i.test(file));
  const alternates = candidates.filter((file) => file !== workflowName);
  assert.deepEqual(alternates, []);
  if (workstream.status === 'complete') assert.deepEqual(candidates, []);
});

export { commands };
```

- [ ] **Step 2: Capture lifecycle RED against the completed-011 HANDOFF**

Before modifying shared lifecycle tests or HANDOFF, run:

```bash
node --test \
  tests/quant-interview-limits-derivatives-completion.test.mjs \
  tests/quant-interview-parallel-workstream-governance.test.mjs \
  tests/quant-interview-random-walks-markov-chains-completion.test.mjs \
  tests/quant-interview-handoff.test.mjs
```

Expected: the new completion test fails because the 012 reservation row is still `design-audit`; the post-011 governance test that still treats 012 as premature fails because the active 012 manifest now exists. Any content, coverage, registry, 011-evidence, or policy failure is unrelated and blocks progress.

- [ ] **Step 3: Add shared phase helpers without changing normative policy expectations**

In `tests/quant-interview-parallel-workstream-governance.test.mjs`, preserve the complete existing `expectedPolicy` object byte-for-byte and do not edit `docs/quant-interview/parallel-workstream-policy.json`. Add:

```js
const workstream012Path = 'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json';
const workstream013Path = 'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';
const orderedGates = ['npm run test', 'npm run check', 'npm run build'];

function section(handoff, heading) {
  return handoff.split(new RegExp(`## ${heading}`, 'i'))[1]?.split(/\n## /)[0] ?? '';
}

function assertFactual012Closure(workstream, handoff) {
  const gate = workstream.preClosureActiveGate;
  const verification = workstream.verification;
  assert.match(gate?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.match(gate?.environment ?? '', /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/);
  assert.deepEqual(gate?.commands, orderedGates);
  assert.equal(gate?.conclusion, 'success');
  assert.equal(verification?.commit, gate.commit);
  assert.ok(Number.isInteger(verification?.runId) && verification.runId > 0);
  assert.deepEqual(verification?.commands, orderedGates);
  assert.equal(verification?.conclusion, 'success');
  assert.match(handoff, new RegExp(gate.commit));
  assert.match(handoff, new RegExp(String(verification.runId)));
  assert.match(handoff, new RegExp(gate.environment));
  assert.match(handoff, /76[^\n]*Problems[^\n]*48[^\n]*Knowledge/i);
  assert.match(handoff, /20[^\n]*12[^\n]*canonical-problem[^\n]*6[^\n]*merged-duplicate[^\n]*2[^\n]*knowledge-only/i);
}
```

The imports must include `access` if the file does not already import it. Do not introduce a second policy object or relax `maxActive`, candidate ownership, serialized integration, protected-main, or no-history-rewrite assertions.

- [ ] **Step 4: Replace the three obsolete governance assertions with exact 012 branching**

Replace the post-011 reservation/current-topic/premature-manifest tests with these three tests, retaining the existing `reservationRows`, `reservations`, `handoffPath`, and `workstream011Path` helpers:

```js
test('handoff preserves exact reservations while 012 advances through its lifecycle', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const coordination = section(handoff, 'Parallel workstream coordination');
  const rows = reservationRows(coordination);
  const workstream011 = JSON.parse(await readFile(workstream011Path, 'utf8'));
  const workstream012 = JSON.parse(await readFile(workstream012Path, 'utf8'));

  assert.ok(coordination, 'HANDOFF missing parallel workstream coordination');
  assert.match(coordination, /maximum active candidates[^\n]*3/i);
  assert.equal(workstream011.status, 'complete');
  assert.match(workstream012.status, /^(?:active|complete)$/);
  assert.deepEqual(
    rows.map(({ state, ...identity }) => identity),
    reservations.map(({ state, ...identity }, index) => ({ queue: String(index + 1), ...identity })),
  );
  assert.equal(rows[0]?.state, 'complete');
  assert.equal(rows[1]?.state, workstream012.status);
  assert.equal(rows[2]?.state, 'design-audit');
  assert.match(coordination, /completed queue entry[^\n]*011/i);
  if (workstream012.status === 'active') {
    assert.match(coordination, /remaining integration queue[^\n]*012[^\n]*013/i);
    assert.doesNotMatch(coordination, /completed queue entry[^\n]*012/i);
  } else {
    assertFactual012Closure(workstream012, handoff);
    assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012/i);
    assert.match(coordination, /remaining integration queue[^\n]*013/i);
    assert.doesNotMatch(coordination, /remaining integration queue[^\n]*012/i);
  }
});

test('authoritative current topic follows factual 012 lifecycle', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/\n## /)[0] ?? '';
  const workstream012 = JSON.parse(await readFile(workstream012Path, 'utf8'));
  if (workstream012.status === 'active') {
    assert.match(current, /Calculus & Differential Equations/i);
    assert.match(current, /Limits & Derivatives/i);
    assert.doesNotMatch(current, /Reasoning & Communication/i);
  } else {
    assert.equal(workstream012.status, 'complete');
    assertFactual012Closure(workstream012, handoff);
    assert.match(current, /Interview Strategy & Communication/i);
    assert.match(current, /Reasoning & Communication/i);
    assert.doesNotMatch(current, /Limits & Derivatives/i);
  }
});

test('governance admits 012 and protects 013 until factual 012 closure', async () => {
  const files = await readdir('src/data/quant-interview/workstreams');
  assert.ok(files.includes('stochastic-processes-random-walks-markov-chains-011.json'));
  assert.ok(files.includes('calculus-differential-equations-limits-derivatives-012.json'));
  const workstream011 = JSON.parse(await readFile(workstream011Path, 'utf8'));
  const workstream012 = JSON.parse(await readFile(workstream012Path, 'utf8'));
  assert.equal(workstream011.status, 'complete');
  assert.match(workstream012.status, /^(?:active|complete)$/);
  const has013 = files.includes('interview-strategy-communication-reasoning-communication-013.json');
  if (workstream012.status === 'active') {
    assert.equal(has013, false);
    await assert.rejects(access(workstream013Path));
  } else {
    const handoff = await readFile(handoffPath, 'utf8');
    assertFactual012Closure(workstream012, handoff);
    if (has013) {
      const workstream013 = JSON.parse(await readFile(workstream013Path, 'utf8'));
      assert.match(workstream013.status, /^(?:active|complete)$/);
    }
  }
});
```

- [ ] **Step 5: Make HANDOFF and prior-011 assertions use the same phase branch**

In `tests/quant-interview-handoff.test.mjs`, add these constants after its existing path constants, then replace the post-011 test named `handoff current topic and remaining queue follow workstream 011 status` with the exact 012 phase test below:

```js
const workstream011Path = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const workstream012Path = 'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json';
```

```js
test('handoff current topic and remaining queue follow workstream 012 status', async () => {
  const workstream011 = JSON.parse(await readFile(workstream011Path, 'utf8'));
  const workstream012 = JSON.parse(await readFile(workstream012Path, 'utf8'));
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/\n## /)[0] ?? '';
  const coordination = handoff.split(/## Parallel workstream coordination/i)[1]?.split(/\n## /)[0] ?? '';
  assert.equal(workstream011.status, 'complete');
  if (workstream012.status === 'active') {
    assert.match(current, /Limits & Derivatives/i);
    assert.doesNotMatch(current, /Reasoning & Communication/i);
    assert.match(coordination, /remaining integration queue[^\n]*012[^\n]*013/i);
    assert.doesNotMatch(coordination, /completed queue entry[^\n]*012/i);
  } else {
    assert.equal(workstream012.status, 'complete');
    assert.match(workstream012.preClosureActiveGate?.commit ?? '', /^[0-9a-f]{40}$/);
    assert.equal(workstream012.verification?.commit, workstream012.preClosureActiveGate.commit);
    assert.ok(Number.isInteger(workstream012.verification?.runId) && workstream012.verification.runId > 0);
    assert.match(handoff, new RegExp(workstream012.verification.commit));
    assert.match(handoff, new RegExp(String(workstream012.verification.runId)));
    assert.match(handoff, /76[^\n]*Problems[^\n]*48[^\n]*Knowledge/i);
    assert.match(current, /Reasoning & Communication/i);
    assert.doesNotMatch(current, /Limits & Derivatives/i);
    assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012/i);
    assert.match(coordination, /remaining integration queue[^\n]*013/i);
  }
});
```

In `tests/quant-interview-random-walks-markov-chains-completion.test.mjs`, preserve every exact 011 evidence/content/count assertion. Replace only its formerly unconditional `current` and `coordination` expectations with:

```js
const workstream012 = await readJson(
  'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json',
);
assert.match(workstream012.status, /^(?:active|complete)$/);
if (workstream012.status === 'active') {
  assert.match(current, /Calculus & Differential Equations/i);
  assert.match(current, /Limits & Derivatives/i);
  assert.doesNotMatch(current, /Reasoning & Communication/i);
  assert.match(coordination, /completed queue entry[^\n]*011/i);
  assert.match(coordination, /remaining integration queue[^\n]*012[^\n]*013/i);
} else {
  assert.match(workstream012.preClosureActiveGate?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.equal(workstream012.verification?.commit, workstream012.preClosureActiveGate.commit);
  assert.ok(Number.isInteger(workstream012.verification?.runId) && workstream012.verification.runId > 0);
  assert.match(handoff, new RegExp(workstream012.verification.commit));
  assert.match(handoff, new RegExp(String(workstream012.verification.runId)));
  assert.match(handoff, /76[^\n]*Problems[^\n]*48[^\n]*Knowledge/i);
  assert.match(current, /Interview Strategy & Communication/i);
  assert.match(current, /Reasoning & Communication/i);
  assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012/i);
  assert.match(coordination, /remaining integration queue[^\n]*013/i);
}
```

Ensure this snippet is placed after the existing declarations of `handoff`, `current`, and `coordination`; do not duplicate those declarations or remove any 011 assertion.

- [ ] **Step 6: Mark only the 012 HANDOFF reservation active and turn lifecycle GREEN**

Use `apply_patch` on `docs/quant-interview/HANDOFF.md` to change the exact reservation-012 row state from `design-audit` to `active`. Preserve the candidate branch cell, keep the current bounded topic exactly `Calculus & Differential Equations -> Limits & Derivatives`, keep 011 recorded complete, keep the queue as completed 011 with remaining `012 -> 013`, and add no 012 completion section, commit, run ID, `76/48` closure, or 013 advance.

Run:

```bash
node --test \
  tests/quant-interview-limits-derivatives-completion.test.mjs \
  tests/quant-interview-limits-derivatives-workstream.test.mjs \
  tests/quant-interview-parallel-workstream-governance.test.mjs \
  tests/quant-interview-random-walks-markov-chains-completion.test.mjs \
  tests/quant-interview-handoff.test.mjs
```

Expected: all focused tests pass with 012 active, no completion-only fields, completed 011, current/reservation 012, and no 013 manifest.

- [ ] **Step 7: Add the only permitted temporary Ubuntu/Node 24 workflow**

Create `.github/workflows/quant-interview-limits-derivatives-012-temporary.yml`:

```yaml
name: Quant Interview Limits Derivatives 012 Temporary
on:
  push:
    branches:
      - chatgpt/quant-interview-integration-limits-derivatives-2026-08-24
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

Do not add write/deploy permissions, another workflow path, a non-Ubuntu runner, another Node version, a mutating step, or reordered commands.

- [ ] **Step 8: Run the full active-phase diagnostic suite and commit the clean active tree**

```bash
npm run test
npm run check
npm run build
git diff --check
git status --short
git add -- \
  .github/workflows/quant-interview-limits-derivatives-012-temporary.yml \
  tests/quant-interview-limits-derivatives-completion.test.mjs \
  tests/quant-interview-parallel-workstream-governance.test.mjs \
  tests/quant-interview-handoff.test.mjs \
  tests/quant-interview-random-walks-markov-chains-completion.test.mjs \
  docs/quant-interview/HANDOFF.md
git commit -m "ci: verify active limits derivatives integration"
active_sha="$(git rev-parse HEAD)"
test "${#active_sha}" -eq 40
git status --short
```

Expected: all three repository gates pass with exact `76/48`; `git diff --check` emits no output; the commit contains only the six named lifecycle/HANDOFF/workflow files; status is clean; manifest 012 remains active without either completion field.

- [ ] **Step 9: Prove the exact active commit authoritatively on a native filesystem**

From native Linux or WSL, make the verification checkout itself under `/tmp` or `/home`, never `/mnt/c`. Clone from the local integration repository so the unpushed commit is available, then detach at the recorded SHA:

```bash
integration_repo="$(git rev-parse --show-toplevel)"
active_verify_root="$(mktemp -d)"
git clone --no-hardlinks "$integration_repo" "$active_verify_root/repo"
git -C "$active_verify_root/repo" config core.autocrlf false
git -C "$active_verify_root/repo" checkout --detach "$active_sha"
cd "$active_verify_root/repo"
test "$(git rev-parse HEAD)" = "$active_sha"
node --version | grep -Eq '^v24\.'
test -z "$(git grep -Il $'\r' -- '*.md' '*.mjs' '*.js' '*.json' '*.yml' '*.yaml' '*.astro' '*.ts' '*.tsx' '*.css' || true)"
npm ci
npm run test
npm run check
npm run build
```

Expected: the native checkout is LF-clean and all ordered gates pass. Record exactly one factual environment string externally: `linux-native-lf-node24` for native Linux or `wsl-native-lf-node24` for a WSL-native checkout. Do not write manifest/HANDOFF evidence yet.

- [ ] **Step 10: Push without force and require real CI for the same active SHA**

Return to the integration checkout, then run:

```bash
integration_ref='chatgpt/quant-interview-integration-limits-derivatives-2026-08-24'
git push -u origin "$integration_ref"
run_id="$(gh run list \
  --workflow quant-interview-limits-derivatives-012-temporary.yml \
  --branch "$integration_ref" \
  --commit "$active_sha" \
  --limit 1 \
  --json databaseId \
  --jq '.[0].databaseId')"
test -n "$run_id"
gh run watch "$run_id" --exit-status
```

Validate the evidence, including command order rather than mere presence:

```bash
QI012_EVIDENCE_JSON="$(gh run view "$run_id" --json databaseId,headSha,status,conclusion,jobs)" \
QI012_ACTIVE_SHA="$active_sha" \
node --input-type=module <<'NODE'
const evidence = JSON.parse(process.env.QI012_EVIDENCE_JSON);
if (!Number.isInteger(evidence.databaseId) || evidence.databaseId <= 0) process.exit(1);
if (evidence.headSha !== process.env.QI012_ACTIVE_SHA) process.exit(1);
if (evidence.status !== 'completed' || evidence.conclusion !== 'success') process.exit(1);
const names = evidence.jobs.flatMap((job) => job.steps ?? []).map((step) => step.name);
const wanted = ['npm ci', 'npm run test', 'npm run check', 'npm run build'];
const positions = wanted.map((command) => names.findIndex((name) => name === command || name.endsWith(command)));
if (positions.some((position) => position < 0)) process.exit(1);
if (positions.some((position, index) => index > 0 && position <= positions[index - 1])) process.exit(1);
NODE
```

Expected: positive integer `run_id`, exact matching `headSha`, completed/success, and Ubuntu steps `npm ci -> npm run test -> npm run check -> npm run build`. Retain `active_sha`, the exact environment string, and `run_id` outside tracked files for Task 18. A later correction to public content, graph, coverage, map, manifest scope, registry, or lifecycle tests invalidates this evidence and requires a new active commit and run.

---

### Task 18: Remove Temporary CI, Record Factual Closure, Advance to 013, and Run Fresh Final Gates

**Files:**
- Delete: `.github/workflows/quant-interview-limits-derivatives-012-temporary.yml`
- Modify: `tests/quant-interview-limits-derivatives-completion.test.mjs`
- Modify: `src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Verify without further weakening: `tests/quant-interview-limits-derivatives-workstream.test.mjs`
- Verify without further weakening: `tests/quant-interview-parallel-workstream-governance.test.mjs`
- Verify without further weakening: `tests/quant-interview-handoff.test.mjs`
- Verify without further weakening: `tests/quant-interview-random-walks-markov-chains-completion.test.mjs`

**Interfaces:**
- Consumes: the exact `active_sha`, authoritative environment, and positive `run_id` verified in Task 17, plus a clean active integration branch whose temporary workflow is still present.
- Produces: a distinct workflow-free closure commit with identical factual `preClosureActiveGate`/`verification` evidence, exact `76/48` and `20 = 12/6/2` HANDOFF facts, current topic/reservation advanced to 013 only after completion, and fresh authoritative final gates.

- [ ] **Step 1: Revalidate the external facts and demonstrate the two closure gates are still RED**

From the clean active integration checkout, restore the externally retained shell values and require them to describe current HEAD and the same successful GitHub run:

```bash
test "$(git rev-parse HEAD)" = "$active_sha"
test "${#active_sha}" -eq 40
case "$active_environment" in
  linux-native-lf-node24|wsl-native-lf-node24) ;;
  *) exit 1 ;;
esac
test "$run_id" -gt 0
git status --short
gh run view "$run_id" --json databaseId,headSha,status,conclusion \
  --jq --arg sha "$active_sha" \
  'select(.databaseId > 0 and .headSha == $sha and .status == "completed" and .conclusion == "success")'
```

Expected: status is clean and GitHub returns the same run. Demonstrate both preconditions before changing state:

```bash
test ! -e .github/workflows/quant-interview-limits-derivatives-012-temporary.yml
node --input-type=module --eval "import {readFileSync} from 'node:fs'; const w=JSON.parse(readFileSync('src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json','utf8')); if(w.status!=='complete') process.exit(1);"
```

Expected: both commands exit 1: the temporary workflow still exists and the manifest is correctly still active. Do not manufacture closure facts to make either command pass.

- [ ] **Step 2: Pin the factual constants and replace the completion test's guarded branch**

Use `apply_patch` on `tests/quant-interview-limits-derivatives-completion.test.mjs`. Immediately after the `commands` declaration, add three JavaScript constants whose right-hand sides are, respectively, the literal 40-character value of `active_sha`, the literal positive decimal value of `run_id`, and the literal exact value of `active_environment`. Obtain printable literals with:

```bash
node -p 'JSON.stringify(process.argv[1])' "$active_sha"
node -p 'Number(process.argv[1])' "$run_id"
node -p 'JSON.stringify(process.argv[1])' "$active_environment"
```

The committed JavaScript must contain those factual literals. It must not contain shell variable syntax, empty strings, symbolic stand-ins, or a closure commit SHA.

Replace the first test from Task 17 with the following body, referencing those three exact constants as `expectedActiveCommit`, `expectedRunId`, and `expectedEnvironment`:

```js
test('012 completion contract is phase-safe and pins factual active-gate evidence', async () => {
  const workstream = await readJson(workstreamPath);
  const workstream011 = await readJson(workstream011Path);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/\n## /)[0] ?? '';
  const coordination = handoffSection(handoff, 'Parallel workstream coordination');
  const reservation012 = coordination.split(/\r?\n/).find((line) => /\|\s*012\s*\|/.test(line)) ?? '';

  assert.equal(workstream011.status, 'complete');
  assert.match(workstream.status, /^(?:active|complete)$/);
  if (workstream.status === 'active') {
    assert.equal(Object.hasOwn(workstream, 'preClosureActiveGate'), false);
    assert.equal(Object.hasOwn(workstream, 'verification'), false);
    assert.match(current, /Calculus & Differential Equations/i);
    assert.match(current, /Limits & Derivatives/i);
    assert.doesNotMatch(current, /Reasoning & Communication|Random Walks & Markov Chains/i);
    assert.match(reservation012, /\|\s*active\s*\|/i);
    assert.match(coordination, /remaining integration queue[^\n]*012[^\n]*013/i);
    await assert.rejects(access(workstream013Path));
    return;
  }

  assert.equal(workstream.status, 'complete');
  assert.deepEqual(workstream.preClosureActiveGate, {
    commit: expectedActiveCommit,
    environment: expectedEnvironment,
    commands,
    conclusion: 'success',
  });
  assert.match(workstream.preClosureActiveGate.commit, /^[0-9a-f]{40}$/);
  assert.match(workstream.preClosureActiveGate.environment, /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/);
  assert.deepEqual(workstream.verification, {
    commit: expectedActiveCommit,
    runId: expectedRunId,
    commands,
    conclusion: 'success',
  });
  assert.equal(workstream.verification.commit, workstream.preClosureActiveGate.commit);
  assert.ok(Number.isInteger(workstream.verification.runId));
  assert.ok(workstream.verification.runId > 0);

  const closure = handoffSection(handoff, 'Completed cross-book workstream 12');
  assert.match(closure, new RegExp(expectedActiveCommit));
  assert.match(closure, new RegExp(String(expectedRunId)));
  assert.match(closure, new RegExp(expectedEnvironment));
  assert.match(closure, new RegExp(`head_sha[^\\n]*${expectedActiveCommit}`, 'i'));
  assert.match(closure, /Ubuntu[^\n]*Node 24|Node 24[^\n]*Ubuntu/i);
  const commandPositions = commands.map((command) => closure.indexOf(command));
  assert.ok(commandPositions.every((position) => position >= 0));
  assert.ok(commandPositions.every((position, index) => index === 0 || position > commandPositions[index - 1]));
  assert.match(closure, /conclusion[^\n]*success/i);
  assert.match(closure, /76[^\n]*canonical Problems[^\n]*48[^\n]*(?:explicitly )?topic-classified Knowledge/i);
  assert.match(closure, /20[^\n]*12[^\n]*canonical-problem[^\n]*6[^\n]*merged-duplicate[^\n]*2[^\n]*knowledge-only/i);
  assert.match(current, /Interview Strategy & Communication/i);
  assert.match(current, /Reasoning & Communication/i);
  assert.doesNotMatch(current, /Limits & Derivatives/i);
  assert.match(reservation012, /\|\s*complete\s*\|/i);
  assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012/i);
  assert.match(coordination, /remaining integration queue[^\n]*013/i);
  assert.doesNotMatch(coordination, /remaining integration queue[^\n]*012/i);
});
```

Keep the second test from Task 17 unchanged; once the status becomes complete it requires every workflow filename containing `012` or `limits-derivatives` to be absent.

- [ ] **Step 3: Remove CI scaffolding before changing status**

```bash
git rm -- .github/workflows/quant-interview-limits-derivatives-012-temporary.yml
test ! -e .github/workflows/quant-interview-limits-derivatives-012-temporary.yml
git diff --name-status "$active_sha"
```

Expected: the absence check passes. At this point the manifest is still active; the diff includes the workflow deletion and the factual-constant completion-test edit only. Do not create another workflow or commit cleanup separately.

- [ ] **Step 4: Seal the manifest with the exact active-commit evidence**

Use `apply_patch` to change `status` to `complete` and append the following two objects to `src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json`, substituting the already validated literal facts in the JSON values:

```js
workstream.preClosureActiveGate = {
  commit: activeSha,
  environment: activeEnvironment,
  commands: ['npm run test', 'npm run check', 'npm run build'],
  conclusion: 'success',
};
workstream.verification = {
  commit: activeSha,
  runId: successfulRunId,
  commands: ['npm run test', 'npm run check', 'npm run build'],
  conclusion: 'success',
};
```

The displayed JavaScript names explain the JSON shape only. The committed JSON must contain the factual literal SHA in both `commit` fields, the factual literal environment enum, and the factual positive integer run ID. Both commit fields must equal the Task 17 active commit, not the later closure commit. Preserve the exact identity, canonical topics, and all three source scopes from Task 12.

- [ ] **Step 5: Write exact bounded closure facts and only then advance HANDOFF to 013**

Use `apply_patch` on `docs/quant-interview/HANDOFF.md`, preserving all historical sections and policy prose. Make these exact changes:

1. Add `## Completed cross-book workstream 12` with literal id `calculus-differential-equations-limits-derivatives-012` and scope `Calculus & Differential Equations -> Limits & Derivatives`.
2. Under an `Active integrated verification` paragraph, record the literal Task 17 `active_sha`, literal `active_environment`, literal positive `run_id`, the ordered gates `npm run test`, `npm run check`, `npm run build`, and conclusion `success`. State explicitly that this is the CI-tested pre-closure active commit and not the later closure tree; record that CI also ran `npm ci` first on Ubuntu/Node 24 and its `head_sha` matched.
3. Enumerate all seven Knowledge slugs: `derivative-definition-and-core-rules`, `logarithmic-differentiation`, `monotonicity-convexity-critical-points-and-inflection`, `indeterminate-limits-and-growth-rates`, `related-rates-and-implicit-differentiation`, `bounded-monotone-convergence-and-fixed-points`, and `positive-series-convergence`.
4. Enumerate all 13 Problem slugs: `differentiate-variable-base-and-exponent`, `compare-e-pi-power-expressions`, `exponential-over-polynomial-limit`, `logarithm-power-limit-at-zero`, `rotating-lighthouse-beam-related-rate`, `radical-difference-limit-at-infinity`, `exponential-midpoint-convexity`, `periodic-continued-fraction-limit`, `normal-cdf-inflection-point`, `derive-exponential-cosine-derivative-from-definition`, `nested-radical-limit`, `infinite-power-tower-limit`, and `classify-basic-positive-series`.
5. Record the exact source-neutral corpus checkpoint as `76 canonical Problems / 48 explicitly topic-classified Knowledge / Technique nodes`.
6. Record exactly 20 terminal rows split `12 canonical-problem / 6 merged-duplicate / 2 knowledge-only`, with source distribution Green four, Red ten, and 150 six. State Green `3.1.3::` is one row with two Problem targets and Q6.9/Q6.10 retain their pre-012 ownership.
7. Record exactly the two source-map repairs: `red-book::6.2.2 -> [limits-derivatives, integration]` and `red-book::6.3.2 -> [limits-derivatives, integration]`; state there is no other map or taxonomy delta.
8. Record the bounded three-source scopes and state explicitly that this closes only workstream 012: it does not claim completeness for calculus, Green/Red/150, any broad source section, or material outside the registered page/section scopes.
9. Add a historical transition marker that Limits & Derivatives is fully closed and records lineage only; it does not authorize reopening it during 013.
10. In `Current bounded topic`, replace 012 with `Interview Strategy & Communication -> Reasoning & Communication`. Do not call 013 complete and do not create its manifest.
11. In the reservation table, keep all identities and branches exact, change only 012 from `active` to `complete`, and keep 013 `design-audit`.
12. Set the coordination line to completed queue entries `011, 012` and remaining integration queue `013`. The 013 advance occurs in this same factual closure patch, after the manifest evidence is written—not in an earlier commit.

- [ ] **Step 6: Run focused closure GREEN before committing**

```bash
node --test \
  tests/quant-interview-limits-derivatives-content.test.mjs \
  tests/quant-interview-limits-derivatives-workstream.test.mjs \
  tests/quant-interview-limits-derivatives-completion.test.mjs \
  tests/quant-interview-source-neutral-content.test.mjs \
  tests/quant-interview-parallel-workstream-governance.test.mjs \
  tests/quant-interview-random-walks-markov-chains-completion.test.mjs \
  tests/quant-interview-handoff.test.mjs
npm run test
npm run check
npm run build
test ! -e .github/workflows/quant-interview-limits-derivatives-012-temporary.yml
git diff --check
```

Expected: every focused and full test passes at exact `76/48`; check/build/absence gates pass; 011 remains complete; 012 is complete with factual equality across both manifest records, completion-test constants, and HANDOFF; current topic is 013. No waiver is allowed in this phase.

- [ ] **Step 7: Commit one distinct workflow-removal/factual-closure commit**

```bash
git add -- \
  tests/quant-interview-limits-derivatives-completion.test.mjs \
  src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json \
  docs/quant-interview/HANDOFF.md
git add -u -- .github/workflows/quant-interview-limits-derivatives-012-temporary.yml
git commit -m "docs: complete limits derivatives workstream"
closure_sha="$(git rev-parse HEAD)"
test "$closure_sha" != "$active_sha"
git merge-base --is-ancestor "$active_sha" "$closure_sha"
git status --short
```

Expected: clean worktree; `active_sha` is an ancestor of a distinct closure commit. Do not amend, rebase, reset, force-push, rewrite the active CI commit, or describe `closure_sha` as CI-tested.

- [ ] **Step 8: Run fresh final gates on the exact closure commit authoritatively**

From native Linux or WSL, create another checkout on a native filesystem and detach at `closure_sha`:

```bash
integration_repo="$(git rev-parse --show-toplevel)"
closure_verify_root="$(mktemp -d)"
git clone --no-hardlinks "$integration_repo" "$closure_verify_root/repo"
git -C "$closure_verify_root/repo" config core.autocrlf false
git -C "$closure_verify_root/repo" checkout --detach "$closure_sha"
cd "$closure_verify_root/repo"
test "$(git rev-parse HEAD)" = "$closure_sha"
node --version | grep -Eq '^v24\.'
test -z "$(git grep -Il $'\r' -- '*.md' '*.mjs' '*.js' '*.json' '*.yml' '*.yaml' '*.astro' '*.ts' '*.tsx' '*.css' || true)"
npm ci
npm run test
npm run check
npm run build
test ! -e .github/workflows/quant-interview-limits-derivatives-012-temporary.yml
```

Expected: all fresh final gates pass on the exact clean closure commit. Any correction requires a new commit and another full fresh native-filesystem run; never amend the factual closure.

- [ ] **Step 9: Audit the final allowlist, forbidden deltas, and exact net workflow absence**

Set `post_011_sha` to the exact completed-011 base SHA recorded in Task 11. Then compare the net 012 diff to this complete allowlist:

```bash
expected_final_files=(
  docs/quant-interview/HANDOFF.md
  docs/superpowers/plans/2026-08-24-quant-interview-limits-derivatives.md
  docs/superpowers/specs/2026-08-24-quant-interview-limits-derivatives-design.md
  src/content/knowledge/concepts/bounded-monotone-convergence-and-fixed-points.md
  src/content/knowledge/concepts/derivative-definition-and-core-rules.md
  src/content/knowledge/concepts/indeterminate-limits-and-growth-rates.md
  src/content/knowledge/concepts/logarithmic-differentiation.md
  src/content/knowledge/concepts/monotonicity-convexity-critical-points-and-inflection.md
  src/content/knowledge/concepts/positive-series-convergence.md
  src/content/knowledge/concepts/related-rates-and-implicit-differentiation.md
  src/content/problems/calculus/classify-basic-positive-series.md
  src/content/problems/calculus/compare-e-pi-power-expressions.md
  src/content/problems/calculus/derive-exponential-cosine-derivative-from-definition.md
  src/content/problems/calculus/differentiate-variable-base-and-exponent.md
  src/content/problems/calculus/exponential-midpoint-convexity.md
  src/content/problems/calculus/exponential-over-polynomial-limit.md
  src/content/problems/calculus/infinite-power-tower-limit.md
  src/content/problems/calculus/logarithm-power-limit-at-zero.md
  src/content/problems/calculus/nested-radical-limit.md
  src/content/problems/calculus/normal-cdf-inflection-point.md
  src/content/problems/calculus/periodic-continued-fraction-limit.md
  src/content/problems/calculus/radical-difference-limit-at-infinity.md
  src/content/problems/calculus/rotating-lighthouse-beam-related-rate.md
  src/data/quant-interview/coverage/150-most-frequently-asked.json
  src/data/quant-interview/coverage/green-book.json
  src/data/quant-interview/coverage/red-book.json
  src/data/quant-interview/topics/source-topic-map.json
  src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json
  tests/quant-interview-handoff.test.mjs
  tests/quant-interview-limits-derivatives-completion.test.mjs
  tests/quant-interview-limits-derivatives-content.test.mjs
  tests/quant-interview-limits-derivatives-workstream.test.mjs
  tests/quant-interview-parallel-workstream-governance.test.mjs
  tests/quant-interview-random-walks-markov-chains-completion.test.mjs
  tests/quant-interview-source-neutral-content.test.mjs
)
diff -u \
  <(printf '%s\n' "${expected_final_files[@]}" | sort) \
  <(git diff --name-only "$post_011_sha..$closure_sha" | sort)
git diff --check "$post_011_sha..$closure_sha"
git diff --exit-code "$post_011_sha..$closure_sha" -- \
  src/data/quant-interview/topics/taxonomy.json
git diff --exit-code "$post_011_sha..$closure_sha" -- \
  .github/workflows
! git ls-files '.github/workflows/*' | grep -Ei '(limits[-_]derivatives|012)'
```

Expected: exact allowlist equality, no whitespace or taxonomy delta, no net workflow delta, and no alternate 012 workflow. Review the map diff and require exactly the two Task 12 arrays; review the ledger diff and require exactly four Green, ten Red, and six 150 terminal decisions with no Q6.9/Q6.10 change. Passing the allowlist does not excuse a semantic mismatch.

- [ ] **Step 10: Fast-forward only the integration and durable refs, then verify the remote closure SHA**

Return to the integration checkout. First confirm the remote integration ref is still the active SHA that produced CI and the durable ref is still the exact `post_011_sha` selected in Task 11. Push the closure to the integration ref, then fast-forward the durable ref; neither push uses a force option:

```bash
git fetch origin
test "$(git rev-parse origin/chatgpt/quant-interview-integration-limits-derivatives-2026-08-24)" = "$active_sha"
test "$(git rev-parse origin/chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17)" = "$post_011_sha"
git merge-base --is-ancestor "$active_sha" "$closure_sha"
git merge-base --is-ancestor "$post_011_sha" "$closure_sha"
git push origin \
  chatgpt/quant-interview-integration-limits-derivatives-2026-08-24
git push origin \
  "$closure_sha:refs/heads/chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17"
git fetch origin
test "$(git rev-parse origin/chatgpt/quant-interview-integration-limits-derivatives-2026-08-24)" = "$closure_sha"
test "$(git rev-parse origin/chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17)" = "$closure_sha"
```

Expected: normal fast-forwards update only the 012 integration ref and the designated durable coordinator ref. If either remote advanced, stop and semantically reconcile from that newer durable state; do not force, rebase, reset, amend, merge blindly, or touch `main`. The exact durable closure SHA is now the serialized base offered to 013.

- [ ] **Step 11: Apply completion disciplines and report only bounded factual closure**

Before the final report, invoke `superpowers:verification-before-completion` and re-check the fresh Task 18 evidence. Then invoke `superpowers:finishing-a-development-branch` for the safe branch handoff; do not merge to protected `main` as part of this plan.

Report the exact active CI SHA, positive run ID, authoritative environment, distinct closure SHA, exact `76/48` registry, exact `20 = 12/6/2` coverage result, no final workflow/taxonomy/pre-existing-public delta, all fresh final gate results, and current serialized workstream 013. State explicitly that the result closes only the registered Limits & Derivatives scope.

---

## Final Self-Review Checklist

```text
[ ] exactly 18 task headings appear, ordered Task 1 through Task 18
[ ] Phase A owns exactly seven new Knowledge pages, thirteen new Problem pages, and one module-content test
[ ] Phase A makes no shared-state, pre-existing-public, HANDOFF, taxonomy, governance, completion, manifest, or workflow edit
[ ] frozen base f41880f220991f43d84ddb3795a59b8688e5230c is green under Node 24 in an LF-normalized native checkout
[ ] candidate discovery is exactly 72/46 and its only permitted full-suite failure is the stale exact 59/39 registry count/set subtest
[ ] every frontmatter field, title rule, Technique category, topic array, graph edge, and source-neutrality boundary is concrete
[ ] x^x on x>0, the separate log-power specialization on x>1, and the x ln x Interview Check on x>0 are exact
[ ] first-derivative interval signs and the f''=0 critical-point/inflection safeguards are explicit
[ ] each L'Hopital use checks and renews indeterminate form, differentiability, nonzero denominator derivative, and derivative-quotient limit
[ ] lighthouse angular rate is 2 pi radians/minute and both exact miles-per-minute identities appear
[ ] the coefficient-5 radical rationalizes exactly to 5/(sqrt(1+5/x)+1) and tends to 5/2
[ ] the continued fraction is c0=2, c(n+1)=2+2/cn and proves convergence before selecting 1+sqrt3
[ ] Normal CDF uses sigma>0, both exact density factors, and a positive-to-negative second-derivative sign change at mu
[ ] e^(cos x) is differentiated by the exact Delta_h factorization and standard limits, with no Taylor series
[ ] the nested radical proves convergence before limit 2; the tower separates base sqrt2 from limit 2 and rejects branch 4
[ ] harmonic divergence, square-series convergence, and logarithmic-harmonic divergence use the exact non-integral methods
[ ] Phase B begins only from completed 011 and exact 63/41, then reaches exact 76/48 with full set equality
[ ] source-topic-map changes only red-book::6.2.2 and red-book::6.3.2 to [limits-derivatives, integration]
[ ] exactly twenty terminal rows exist with split 12/6/2 and source counts Green 4, Red 10, 150 6
[ ] Green 3.1.3 remains one row with two Problem targets and Q6.9/Q6.10 retain prior ownership
[ ] all three ledgers validate against real slugs with allowUnresolvedCanonicalRefs false
[ ] active workstream omits both completion fields; complete workstream contains exact factual active-gate and CI evidence
[ ] workstream, completion, governance, HANDOFF, and prior-011 completion tests pass in both appropriate lifecycle phases
[ ] active 012 keeps current/reservation 012 and rejects 013; only factual complete 012 advances current/reservation to 013
[ ] real CI is the sole named temporary workflow on Ubuntu/Node 24 and runs npm ci/test/check/build in order
[ ] CI head_sha, preClosureActiveGate.commit, and verification.commit equal the same factual active integrated SHA
[ ] the workflow is removed before complete status and the distinct closure commit is never called the CI-tested tree
[ ] fresh npm run test/check/build pass on the exact workflow-free closure commit in an authoritative native checkout
[ ] final diff has no workflow, taxonomy, unrelated map, pre-existing public-content, protected-main, or history-rewrite delta
[ ] HANDOFF records exact evidence, 76/48, 20=12/6/2, bounded exclusions, completed 011/012, and remaining 013
```

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-24-quant-interview-limits-derivatives.md`.

Use **Subagent-Driven execution (recommended)** with `superpowers:subagent-driven-development`: keep candidate and coordinator roles separate, execute each task as its own RED-to-GREEN review unit, and require an independent specification/completeness review before advancing. A single-session execution may instead use `superpowers:executing-plans`, but it must preserve the same Phase A/Phase B ownership boundary, exact task order, 011 gate, factual CI lifecycle, and commit discipline.
