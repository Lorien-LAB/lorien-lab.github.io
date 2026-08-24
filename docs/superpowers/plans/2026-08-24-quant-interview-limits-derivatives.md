# Quant Interview Limits & Derivatives Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and factually close the bounded `Calculus & Differential Equations -> Limits & Derivatives` workstream with exactly seven new source-neutral Knowledge nodes, 13 new S3+ Problems, and 20 terminal source rows split exactly `12 canonical-problem / 6 merged-duplicate / 2 knowledge-only`.

**Architecture:** Phase A is a create-only candidate: it adds only the seven Knowledge pages, 13 Problem pages, and one module-content test, then reports proposed shared deltas without editing coordinator-owned state. Phase B starts only after workstream 011 is durably complete at `63 Problems / 41 Knowledge`; the coordinator ports the candidate files, repairs exactly two Red source mappings, reconciles the three ledgers and an active manifest, extends the exact registry to `76/48`, keeps all lifecycle tests phase-safe, obtains factual Ubuntu/Node 24 CI for the exact active integrated commit, and closes in a later workflow-free metadata/HANDOFF commit.

**Tech Stack:** Astro 5 content collections, Markdown/YAML frontmatter, JSON workstream/coverage data, JavaScript ES modules, Node 24 built-in test runner, TypeScript/Astro checks, Git, GitHub Actions on Ubuntu.

## Global Constraints

- Approved spec: `docs/superpowers/specs/2026-08-24-quant-interview-limits-derivatives-design.md`.
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
test "$(git rev-parse HEAD)" = f41880f220991f43d84ddb3795a59b8688e5230c
case "$(pwd -P)" in (/mnt|/mnt/*) echo 'authoritative checkout must not be under /mnt' >&2; exit 1;; esac
test "$(uname -s)" = Linux
node --version | grep -Eq '^v24\.'
node --input-type=module <<'NODE'
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
const files = execFileSync('git', ['ls-files', '-z']).toString('utf8').split('\0').filter(Boolean);
const offenders = [];
for (const file of files) {
  if (!statSync(file, { throwIfNoEntry: false })?.isFile()) continue;
  const bytes = readFileSync(file);
  if (!bytes.includes(0) && bytes.includes(Buffer.from('\r\n'))) offenders.push(file);
}
if (offenders.length) throw new Error(`tracked text contains CRLF:\n${offenders.join('\n')}`);
NODE
if grep -Eqi 'microsoft|wsl' /proc/sys/kernel/osrelease; then
  frozen_base_environment='wsl-native-lf-node24'
else
  frozen_base_environment='linux-native-lf-node24'
fi
frozen_base_node_version="$(node --version)"
printf 'frozen_base_environment=%s\nfrozen_base_node_version=%s\n' "$frozen_base_environment" "$frozen_base_node_version"
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
    .replace(/\\[dt]frac/g, '\\frac')
    .replace(/\\(?:!|,|:|;|quad|qquad)/g, '')
    .replace(/~+/g, '')
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

function disclosureBody(text, summary) {
  const escaped = summary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = text.match(new RegExp(`<details>\\s*<summary>${escaped}<\\/summary>([\\s\\S]*?)<\\/details>`));
  assert.ok(match, `missing ${summary} disclosure body`);
  return match[1].trim();
}

function solutionBody(text) {
  const disclosure = disclosureBody(text, 'Show Solution');
  const match = disclosure.match(/^## Solution\s*$([\s\S]*?)(?=^## Why This Matters\s*$)/m);
  assert.ok(match, 'Show Solution disclosure missing an extractable Solution section');
  return match[1].trim();
}

function subsectionBody(text, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const marker = new RegExp(`^### ${escaped}\\s*$`, 'm');
  const start = text.search(marker);
  assert.ok(start >= 0, `missing subsection ${heading}`);
  const bodyStart = text.indexOf('\n', start) + 1;
  const tail = text.slice(bodyStart);
  const next = tail.search(/^### /m);
  return (next < 0 ? tail : tail.slice(0, next)).trim();
}

function sectionBody(text, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const marker = new RegExp(`^## ${escaped}\\s*$`, 'm');
  const start = text.search(marker);
  assert.ok(start >= 0, `missing section ${heading}`);
  const bodyStart = text.indexOf('\n', start) + 1;
  const tail = text.slice(bodyStart);
  const next = tail.search(/^## /m);
  return (next < 0 ? tail : tail.slice(0, next)).trim();
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
  assert.match(text, /^## Recognition Signals$/m);
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
  const hint1 = disclosureBody(text, 'Hint 1');
  const hint2 = disclosureBody(text, 'Hint 2');
  assert.ok(hint1.length >= 30, `${expected.problemId} Hint 1 is not substantive`);
  assert.ok(hint2.length >= 30, `${expected.problemId} Hint 2 is not substantive`);
  assert.notEqual(normalizedMath(hint1), normalizedMath(hint2), `${expected.problemId} hints must be distinct`);
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
  for (const rule of [/linearity/i, /product rule/i, /quotient rule/i, /chain rule/i, /fixed-power/i, /generalized[ -]power/i]) assert.match(page.text, rule);
  assert.match(page.text, /denominator.*nonzero|g\(x\).*not.*0/i);
  assertMath(page.text, String.raw`\frac{d}{dx}e^x=e^x`, 'exponential derivative');
  assertMath(page.text, String.raw`\frac{d}{dx}\ln x=\frac1x,\qquad x>0`, 'logarithm derivative and domain');
  assertMath(page.text, String.raw`\frac{d}{dx}\sin x=\cos x`, 'sine derivative');
  assertMath(page.text, String.raw`\frac{d}{dx}\cos x=-\sin x`, 'cosine derivative');
  assertMath(page.text, String.raw`\frac{d}{dx}\tan x=\sec^2x,\qquad \cos x\ne0`, 'tangent derivative and domain');
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
  const logIdentity = /\\ln y\s*=\s*v\\ln u/;
  assertBefore(page.text, /u:I\\to\(0,\s*\+\\infty\)/, logIdentity, 'u:I to positive reals must precede logarithms');
  assertBefore(page.text, /u:I\\to\(0,\s*\+\\infty\)\$?\s+(?:is|be)\s+differentiable/i, logIdentity, 'u differentiability must independently precede logarithms');
  assertBefore(page.text, /v:I\\to\\mathbb\s*R/, logIdentity, 'v:I to real values must precede logarithms');
  assertBefore(page.text, /v:I\\to\\mathbb\s*R\$?\s+(?:is|be)\s+differentiable/i, logIdentity, 'v differentiability must independently precede logarithms');
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
  const solution = solutionBody(page.text);
  const logIdentity = /\\ln y\s*=\s*v\\ln u/;
  assertBefore(solution, /u:I\\to\(0,\s*\+\\infty\)/, logIdentity, 'Problem 001 Solution must state u:I to positive reals before logarithms');
  assertBefore(solution, /u:I\\to\(0,\s*\+\\infty\)\$?\s+(?:is|be)\s+differentiable/i, logIdentity, 'Problem 001 Solution must independently state differentiable u before logarithms');
  assertBefore(solution, /v:I\\to\\mathbb\s*R/, logIdentity, 'Problem 001 Solution must state v:I to real values before logarithms');
  assertBefore(solution, /v:I\\to\\mathbb\s*R\$?\s+(?:is|be)\s+differentiable/i, logIdentity, 'Problem 001 Solution must independently state differentiable v before logarithms');
  assertMath(solution, String.raw`\boxed{\frac{d}{dx}u(x)^{v(x)}=u(x)^{v(x)}\left(v'(x)\ln u(x)+v(x)\frac{u'(x)}{u(x)}\right)}`, 'Problem 001 general result');
  assert.match(page.text, /differentiate.*x\^x|derivative.*x\^x/i);
  assertMath(solution, String.raw`\boxed{\frac{d}{dx}x^x=x^x(\ln x+1)},\qquad x>0`, 'Problem 001 x^x result and domain');
  assertMath(page.text, String.raw`y=(\ln x)^{\ln x}`, 'Problem 001 log-power prompt');
  assertMath(solution, String.raw`\boxed{y'=\frac{(\ln x)^{\ln x}}{x}(\ln\ln x+1)},\qquad x>1`, 'Problem 001 log-power result and domain');
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

After that frontmatter, use this complete body verbatim:

```markdown
## Core Idea

For a real function $f$, differentiability at an interior point $x$ means that the finite limit

\[
f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}
\]

exists. The quotient is a local linear model: $f(x+h)=f(x)+f'(x)h+o(h)$. Every rule below is shorthand for controlling this limit, so its domain hypotheses remain part of the answer.

## Difference Quotient and Domain Boundaries

The two-sided definition requires $x+h$ to remain in the domain for small positive and negative $h$. At a left endpoint use a right derivative; at a right endpoint use a left derivative. A derivative cannot be claimed at a point excluded from the function's domain.

For example, $\sqrt{x}$ has right derivative at $0$ only in the extended sense $+\infty$, not a finite ordinary derivative there. For $\ln x$, only $x>0$ belongs to the real domain.

## Differentiability and Continuity

If $f'(x)$ exists, then

\[
f(x+h)-f(x)=h\frac{f(x+h)-f(x)}h\longrightarrow0,
\]

so differentiability implies continuity. The converse is false: $f(x)=|x|$ is continuous at $0$, but its left and right difference quotients are $-1$ and $1$.

## Linearity, Product, Quotient, and Chain Rules

Where the displayed expressions are defined,

\[
(af+bg)'=af'+bg',\qquad
(fg)'=f'g+fg',
\]

\[
\left(\frac fg\right)'=\frac{f'g-fg'}{g^2},\qquad g(x)\ne0,
\]

and, for differentiable $f$ and $g$,

\[
(f\circ g)'(x)=f'(g(x))g'(x).
\]

The quotient rule needs a denominator that is nonzero at the evaluation point. The chain rule needs the outer derivative at the actual inner value $g(x)$.

## Fixed and Generalized Powers

For fixed real $a$, the fixed-power rule is

\[
\frac{d}{dx}x^a=ax^{a-1}
\]

on any real interval where $x^a$ is differentiable. When both base and exponent vary, $u(x)^{v(x)}$ is a different problem; the elementary real logarithmic derivation assumes $u(x)>0$.

## Elementary Exponential, Logarithmic, and Trigonometric Rules

The core derivatives, with their real domains, are

\[
\frac{d}{dx}e^x=e^x,
\qquad
\frac{d}{dx}\ln x=\frac1x,\qquad x>0,
\]

\[
\frac{d}{dx}\sin x=\cos x,
\qquad
\frac{d}{dx}\cos x=-\sin x,
\]

and

\[
\frac{d}{dx}\tan x=\sec^2x,
\qquad \cos x\ne0.
\]

## Standard Limits Behind First-Principles Derivatives

The elementary limits

\[
\lim_{x\to0}\frac{\sin x}{x}=1,
\qquad
\lim_{x\to0}\frac{e^x-1}{x}=1
\]

drive the first-principles derivatives of sine and the exponential. Also,

\[
\frac{\cos h-1}{h}
=-\frac{2\sin^2(h/2)}h\longrightarrow0.
\]

## Recognition Signals

- A request for a derivative “from the definition” calls for the difference quotient and standard limits.
- A nested expression signals the chain rule; a product or quotient signals its named rule plus a domain check.
- A variable base and variable exponent signals logarithmic differentiation, not the fixed-power rule.
- An endpoint or a piecewise corner signals one-sided derivatives before any symbolic manipulation.

## Common Mistakes

- Claiming differentiability merely from continuity.
- Using the quotient rule where the denominator is zero.
- Dropping the inner derivative in the chain rule.
- Treating $u(x)^{v(x)}$ as if the exponent were constant.
- Ignoring the real-domain conditions of $\ln x$, $\tan x$, or a noninteger power.

## Interview Checks

Differentiate $x\ln x$ on its real domain. The product rule gives

\[
\boxed{\frac{d}{dx}(x\ln x)=\ln x+1},\qquad x>0.
\]

As a definition check, explain why $|x|$ has no derivative at $0$: its one-sided difference quotients disagree.
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

After that frontmatter, use this complete body verbatim:

```markdown
## Core Idea

Let $I$ be an interval, let $u:I\to(0,+\infty)$ be differentiable, and let $v:I\to\mathbb R$ be differentiable. For

\[
y=u(x)^{v(x)},
\]

the positive-base condition makes the real logarithm legitimate. Taking logarithms gives

\[
\ln y=v\ln u.
\]

Differentiate and restore $y=u^v$:

\[
\frac{y'}y=v'\ln u+v\frac{u'}u,
\]

so

\[
\boxed{y'=u^v\left(v'\ln u+v\frac{u'}{u}\right)}.
\]

## Why the Hypotheses Come First

The derivation uses $\ln u(x)$ and divides by $u(x)$, so $u(x)>0$ is not cosmetic. Differentiability of $v$ is independent of differentiability of $u$; both terms in the final formula need their own hypotheses.

Zero or negative bases require a separate real-domain analysis. A negative base with a varying real exponent generally does not define a real differentiable function on an interval.

## Products and Quotients of Many Factors

For a positive product $y=\prod_{j=1}^m u_j(x)$,

\[
\ln y=\sum_{j=1}^m\ln u_j,
\qquad
\frac{y'}y=\sum_{j=1}^m\frac{u_j'}{u_j}.
\]

Positive quotient factors enter with a minus sign. Always multiply the logarithmic derivative by the original $y$ at the end.

## Variable Base and Variable Exponent

For $y=x^x$, the real positive domain is $x>0$. Since

\[
\ln y=x\ln x,
\qquad
\frac{y'}y=\ln x+1,
\]

we obtain

\[
\boxed{\frac{d}{dx}x^x=x^x(\ln x+1)},\qquad x>0.
\]

For $y=(\ln x)^{\ln x}$, the base $\ln x$ must be positive, so $x>1$. Then

\[
\ln y=(\ln x)(\ln\ln x)
\]

and

\[
\frac{y'}y=\frac1x\ln\ln x+\frac1x.
\]

Therefore

\[
\boxed{\frac{d}{dx}(\ln x)^{\ln x}
=\frac{(\ln x)^{\ln x}}{x}(\ln\ln x+1)},\qquad x>1.
\]

## Recognition Signals

- Both a base and an exponent depend on the variable.
- A long positive product or quotient becomes simpler after logarithms.
- The expression contains powers nested with logarithms, so domain constraints must be settled before differentiation.

## Common Mistakes

- Taking $\ln u$ before proving $u>0$.
- Assuming differentiability of $u$ somehow supplies differentiability of $v$.
- Forgetting to multiply the logarithmic derivative by $y=u^v$.
- Applying the result unchanged to zero or negative bases.
- Using $x>0$ for $(\ln x)^{\ln x}$; the positive-base requirement actually gives $x>1$.

## Interview Checks

Derive, rather than quote,

\[
\boxed{\frac{d}{dx}x^x=x^x(\ln x+1)},\qquad x>0,
\]

and

\[
\boxed{\frac{d}{dx}(\ln x)^{\ln x}
=\frac{(\ln x)^{\ln x}}x(\ln\ln x+1)},\qquad x>1.
\]

For each expression, say exactly which positivity condition made the logarithm valid.
```

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

After the exact frontmatter, use this complete body verbatim:

```markdown
## Problem

Let $I$ be an interval. Suppose $u:I\to(0,+\infty)$ and $v:I\to\mathbb R$ are differentiable. Derive a formula for

\[
\frac{d}{dx}u(x)^{v(x)}.
\]

Then use it to differentiate $x^x$ on $x>0$, and differentiate

\[
y=(\ln x)^{\ln x}
\]

on $x>1$.

## Think Before Revealing

Neither the ordinary power rule nor the ordinary exponential rule handles a simultaneously varying base and exponent. Which transform moves the exponent down while preserving a real-valued identity?

<details>
<summary>Hint 1</summary>

Use positivity of the base to take a logarithm. Keep the hypotheses on $u$ and $v$ visible before writing $\ln y=v\ln u$.

</details>

<details>
<summary>Hint 2</summary>

After differentiating $\ln y=v\ln u$, you have $y'/y$. Multiply by the original $y=u^v$; for the last specialization, differentiate $(\ln x)(\ln\ln x)$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### General positive-base formula

Let $u:I\to(0,+\infty)$ be differentiable, and independently let $v:I\to\mathbb R$ be differentiable. Define $y=u(x)^{v(x)}>0$. Only after these hypotheses are fixed do we take logarithms:

\[
\ln y=v\ln u.
\]

Differentiate both sides:

\[
\frac{y'}y=v'\ln u+v\frac{u'}u.
\]

Since $y=u^v$,

\[
\boxed{\frac{d}{dx}u(x)^{v(x)}
=u(x)^{v(x)}\left(v'(x)\ln u(x)+v(x)\frac{u'(x)}{u(x)}\right)}.
\]

### Specialization to $x^x$

For $x>0$, set $u(x)=x$ and $v(x)=x$. Then $u'=v'=1$, hence

\[
\boxed{\frac{d}{dx}x^x=x^x(\ln x+1)},\qquad x>0.
\]

### Logarithmic-power specialization

For $y=(\ln x)^{\ln x}$, real positivity of the base requires $\ln x>0$, so $x>1$. Taking logarithms,

\[
\ln y=(\ln x)(\ln\ln x).
\]

The product and chain rules give

\[
\frac{y'}y
=\frac1x\ln\ln x+(\ln x)\frac{1}{x\ln x}
=\frac{\ln\ln x+1}{x}.
\]

Restoring $y$,

\[
\boxed{y'=\frac{(\ln x)^{\ln x}}{x}(\ln\ln x+1)},\qquad x>1.
\]

## Why This Matters

The derivation separates a reusable rule from its domain. In an interview, stating positivity and both differentiability hypotheses before taking logarithms is as important as obtaining the algebraic formula.

## Common Mistakes

- Using $v u^{v-1}u'$ when $v$ also varies.
- Taking $\ln u$ without $u>0$ in the real setting.
- Forgetting that $v$ needs its own differentiability hypothesis.
- Stopping at $y'/y$ and losing the outer factor $u^v$.
- Giving the last specialization on $x>0$ instead of the correct domain $x>1$.

## Extensions

Derive the logarithmic derivative of a positive product $y=\prod_j u_j(x)^{v_j(x)}$. Each factor contributes $v_j'\ln u_j+v_j u_j'/u_j$, after which the result is multiplied by $y$.

</details>
```

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
  const localTests = sectionBody(page.text, 'Second-Derivative Local Tests');
  assert.match(localTests, /f'(?:\(c\))?\s*=\s*0.*f''(?:\(c\))?\s*>\s*0.*local minimum/is);
  assert.match(localTests, /f'(?:\(c\))?\s*=\s*0.*f''(?:\(c\))?\s*<\s*0.*local maximum/is);
  assert.match(localTests, /critical point[^\n]*f''(?:\(c\))?\s*=\s*0[^\n]*inconclusive|f''(?:\(c\))?\s*=\s*0[^\n]*inconclusive[^\n]*critical/i);
  const curvatureTests = sectionBody(page.text, 'Convexity, Concavity, and Inflection');
  assert.match(curvatureTests, /inflection[^\n]*f''(?:\(c\))?\s*=\s*0[^\n]*(?:not sufficient|inconclusive)|f''(?:\(c\))?\s*=\s*0[^\n]*(?:not sufficient|inconclusive)[^\n]*inflection/i);
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
  assert.match(page.text, /decreases.*\(e,\s*\+\\infty\)/i);
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

Use this complete body after the tested frontmatter:

```markdown
## Core Idea

Derivative signs describe behavior on intervals, not merely at isolated points. The first derivative controls increase and decrease; the second derivative controls local curvature where it exists. Extrema and inflection points require sign information plus domain checks.

## Critical Numbers and Domain Checks

A critical number $c$ is a point in the domain where $f'(c)=0$ or $f'(c)$ is undefined. A point excluded from the domain is not a critical number. Critical numbers are candidates, not automatic extrema.

## First-Derivative Sign Charts

Partition the domain at critical numbers and points of nondifferentiability. On each open interval, determine the sign of $f'$:

- $f'>0$ implies that $f$ is increasing;
- $f'<0$ implies that $f$ is decreasing;
- a change $+\to-$ gives a local maximum;
- a change $-\to+$ gives a local minimum;
- no sign change gives neither.

The full-interval sign chart supplies the proof. Evaluating $f'$ at one point without justifying that its sign persists on the interval does not.

## Local and Global Extrema

Local extrema compare nearby values. Global extrema compare every value in the domain. On a closed interval $[a,b]$, a continuous function attains global extrema, and the candidates are interior critical numbers together with both endpoints.

## Second-Derivative Local Tests

If $f'(c)=0$ and $f''(c)>0$, then $c$ is a strict local minimum. If $f'(c)=0$ and $f''(c)<0$, then $c$ is a strict local maximum. At a critical point, $f''(c)=0$ is inconclusive: $x^4$ has a minimum at $0$, while $x^3$ does not.

## Convexity, Concavity, and Inflection

On an interval, $f''>0$ gives strict convexity and $f''<0$ gives strict concavity. An inflection point requires an actual change of concavity. For an inflection claim, $f''(c)=0$ alone is not sufficient and is inconclusive; for example, $x^4$ has $f''(0)=0$ but no concavity change.

## Exponential Midpoint Convexity

Because $(e^x)''=e^x>0$, the exponential is strictly convex. Hence, for real $a,b$,

\[
\frac{e^a+e^b}{2}\ge e^{(a+b)/2},
\]

with equality exactly when $a=b$.

## Normal CDF Curvature Example

For $\sigma>0$, a Normal CDF has density

\[
F'(x)=\frac{1}{\sigma\sqrt{2\pi}}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
\]

and second derivative

\[
F''(x)=-\frac{x-\mu}{\sigma^3\sqrt{2\pi}}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right).
\]

Every factor except $-(x-\mu)$ is positive. Therefore $F''>0$ for $x<\mu$ and $F''<0$ for $x>\mu$: the positive-to-negative sign change proves a unique inflection at $\mu$.

## Recognition Signals

- “Increasing,” “decreasing,” or “compare” suggests a first-derivative sign chart.
- “Local maximum/minimum” requires a sign change or a valid second-derivative local test.
- “Global on a closed interval” requires endpoints as candidates.
- “Convex,” “concave,” or “inflection” requires interval curvature and, for inflection, a sign change.

## Common Mistakes

- Calling every solution of $f'=0$ an extremum.
- Forgetting points where $f'$ is undefined but $f$ is defined.
- Omitting endpoints from a closed-interval global-extrema check.
- Using $f''=0$ as proof of either an extremum or an inflection point.
- Quoting convexity without stating why it is strict when an equality condition is requested.

## Interview Checks

For $f(x)=\ln x/x$, compute

\[
f'(x)=\frac{1-\ln x}{x^2}
\]

and identify its increase/decrease intervals. For the Normal CDF above, explain why solving $F''(x)=0$ is not the proof: the sign change on both sides is.
```

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

Use this complete body after the tested frontmatter:

```markdown
## Problem

Which is larger, $e^\pi$ or $\pi^e$? Prove the comparison by analyzing a single real function on full intervals.

## Think Before Revealing

Taking logarithms turns the two powers into $\pi$ and $e\ln\pi$. Can both sides be compared through the same one-variable ratio?

<details>
<summary>Hint 1</summary>

Study $f(x)=\ln x/x$ for $x>0$. Its derivative changes sign at one familiar constant.

</details>

<details>
<summary>Hint 2</summary>

Compute $f'(x)=(1-\ln x)/x^2$. Since $\pi>e$, use the decreasing interval $(e,+\infty)$ to compare $f(\pi)$ with $f(e)$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Define

\[
f(x)=\frac{\ln x}{x},\qquad x>0.
\]

Then

\[
f'(x)=\frac{1-\ln x}{x^2}.
\]

Because $x^2>0$, the sign comes entirely from $1-\ln x$:

- $f'(x)>0$ on $(0,e)$;
- $f'(e)=0$;
- $f'(x)<0$ on $(e,+\infty)$.

Thus $f$ increases on $(0,e)$ and decreases on $(e,+\infty)$. Therefore, $f$ has its global maximum at $e$. Since $\pi>e$,

\[
\frac{\ln\pi}{\pi}=f(\pi)<f(e)=\frac1e.
\]

Multiplying by the positive number $e\pi$ yields

\[
e\ln\pi<\pi.
\]

Exponentiation preserves this strict inequality:

\[
\pi^e<e^\pi.
\]

Therefore

\[
\boxed{e^\pi>\pi^e}.
\]

## Why This Matters

The key is not numerical approximation but choosing a ratio whose derivative gives a complete interval argument. The same device compares many expressions of the form $a^b$ and $b^a$.

## Common Mistakes

- Comparing decimal approximations instead of proving the inequality.
- Checking only $f'(e)=0$ without proving the sign on both intervals.
- Reversing the final implication when exponentiating.
- Treating $f''=0$ as decisive; a zero second derivative is inconclusive without the relevant sign information.

## Extensions

For $0<a<b$, compare $a^b$ and $b^a$ by locating $a$ and $b$ relative to the maximizer $e$ of $\ln x/x$.

</details>
```

- [ ] **Step 5: Write Problem 007 with strict-convexity equality**

Use the metadata asserted in Step 1. For real `a,b`, prove the exact boxed midpoint inequality. The primary method uses `f''(x)=e^x>0` and must explain that strict convexity makes equality possible exactly when `a=b`; AM-GM may appear only as a separately labeled alternate derivation.

Use this complete body after the tested frontmatter:

```markdown
## Problem

For real numbers $a$ and $b$, prove

\[
\frac{e^a+e^b}{2}\ge e^{(a+b)/2},
\]

and determine exactly when equality holds.

## Think Before Revealing

The right side is the exponential evaluated at the midpoint of $a$ and $b$. Which curvature property compares a function at a midpoint with the midpoint of its values?

<details>
<summary>Hint 1</summary>

Use $f(x)=e^x$ and compute its second derivative on all of $\mathbb R$.

</details>

<details>
<summary>Hint 2</summary>

Strict convexity gives the midpoint inequality $f((a+b)/2)\le(f(a)+f(b))/2$. Its equality clause is strict unless the two input points coincide.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let $f(x)=e^x$. For every real $x$,

\[
f''(x)=e^x>0,
\]

so $f$ is strictly convex on $\mathbb R$. Applying midpoint convexity,

\[
f\left(\frac{a+b}{2}\right)
\le\frac{f(a)+f(b)}2.
\]

Substitution gives

\[
\boxed{\frac{e^a+e^b}{2}\ge e^{(a+b)/2}}.
\]

Because the convexity is strict, equality holds exactly when the two midpoint inputs agree, namely

\[
\boxed{a=b}.
\]

As a separate algebraic check, set $A=e^{a/2}$ and $B=e^{b/2}$. Then $(A-B)^2\ge0$ gives $e^a+e^b\ge2e^{(a+b)/2}$, with equality exactly when $A=B$, equivalently $a=b$.

## Why This Matters

Convexity converts a derivative sign into a global inequality and supplies the equality case automatically. The proof generalizes from midpoints to arbitrary weighted averages.

## Common Mistakes

- Saying only that the exponential is convex without proving strict convexity.
- Omitting the equality condition.
- Claiming $f''=0$ is enough to decide convexity or an inflection; here the decisive fact is $f''>0$ everywhere.
- Using AM-GM without noting that the substituted quantities are positive.

## Extensions

For $0\le\lambda\le1$, strict convexity gives

\[
e^{\lambda a+(1-\lambda)b}
\le\lambda e^a+(1-\lambda)e^b,
\]

with equality for interior $\lambda$ exactly when $a=b$.

</details>
```

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
  const solution = solutionBody(page.text);
  assertMath(page.text, String.raw`\sigma>0`, 'Normal scale domain');
  assertMath(solution, String.raw`F'(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)`, 'Normal density');
  assertMath(solution, String.raw`F''(x)=-\frac{x-\mu}{\sigma^3\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)`, 'Normal CDF second derivative');
  const signChart = solution.match(/\\\[[\s\S]*?F''\(x\)>0[\s\S]*?F''\(x\)<0[\s\S]*?\\\]/)?.[0];
  assert.ok(signChart, 'Normal CDF Solution missing displayed left/right sign chart');
  assert.match(signChart, /F''(?:\(x\))?\s*>\s*0.*x\s*<\s*\\mu/is);
  assert.match(signChart, /F''(?:\(x\))?\s*<\s*0.*x\s*>\s*\\mu/is);
  assertMath(solution, String.raw`\boxed{x=\mu\text{ is the unique inflection point}}`, 'unique inflection');
  assert.match(solution, /not merely.*F''|F''.*zero.*not.*enough|sign change.*not merely/i);
});
```

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: all earlier subtests pass; only Problem 009 fails with `ENOENT`.

- [ ] **Step 3: Write minimal GREEN Problem 009**

Use the exact frontmatter values asserted above. In the prompt define `mu in R`, `sigma>0`, and `F` as the Normal CDF. In the solution display the exact `F'` and `F''` formulas, observe that the exponential and denominator factors are strictly positive, prove `F''>0` left of `mu` and `F''<0` right of `mu`, and only then box the unique inflection conclusion. Put “solving only `F''=0`” in Common Mistakes.

Use this complete body after the tested frontmatter:

```markdown
## Problem

Let $F$ be the CDF of a Normal random variable with location $\mu\in\mathbb R$ and scale $\sigma>0$:

\[
F(x)=\int_{-\infty}^{x}
\frac{1}{\sigma\sqrt{2\pi}}
\exp\left(-\frac{(t-\mu)^2}{2\sigma^2}\right)dt.
\]

Find and prove the unique inflection point of $F$.

## Think Before Revealing

An inflection point is established by a change of concavity, not merely by solving one equation. Differentiate twice and isolate the factor that controls the sign.

<details>
<summary>Hint 1</summary>

The fundamental theorem of calculus makes $F'$ the Normal density. Differentiate that density with the chain rule.

</details>

<details>
<summary>Hint 2</summary>

After differentiating, every factor in $F''$ except $-(x-\mu)$ is strictly positive because $\sigma>0$. Make a left/right sign table around $\mu$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

By the fundamental theorem of calculus,

\[
F'(x)=\frac{1}{\sigma\sqrt{2\pi}}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right).
\]

Differentiate once more. The derivative of the exponent is $-(x-\mu)/\sigma^2$, so

\[
F''(x)=-\frac{x-\mu}{\sigma^3\sqrt{2\pi}}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right).
\]

Since $\sigma>0$, the denominator is positive, and the exponential factor is positive for every real $x$. Thus the sign of $F''$ is the sign of $-(x-\mu)$:

\[
F''(x)>0\quad\text{for }x<\mu,
\qquad
F''(x)<0\quad\text{for }x>\mu.
\]

Therefore $F$ is convex to the left of $\mu$ and concave to the right. This actual positive-to-negative sign change proves

\[
\boxed{x=\mu\text{ is the unique inflection point}}.
\]

The proof is not merely the observation $F''(\mu)=0$; that equation supplies a candidate, while the sign change establishes the inflection and its uniqueness.

## Why This Matters

The calculation ties distribution shape to calculus: the density is largest at the CDF's inflection. It also models the correct interview habit of separating a candidate equation from a sign-change proof.

## Common Mistakes

- Omitting the condition $\sigma>0$.
- Losing a factor of $\sigma^2$ and writing the wrong $\sigma^3$ denominator.
- Solving only $F''=0$ and calling that an inflection proof.
- Forgetting that the exponential factor is strictly positive and therefore cannot create another sign change.

## Extensions

Show that $F'$ has its unique maximum at $\mu$. Then standardize with $z=(x-\mu)/\sigma$ and explain why changing $\sigma$ alters horizontal scale but not the standardized sign pattern.

</details>
```

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
  assert.match(page.text, /substitut.*before.*L'H[oô]pital|L'H[oô]pital.*after.*substitut/i);
  assertMath(page.text, String.raw`\ln x\ll x^a\ll e^{bx}`, 'positive-tail growth hierarchy');
  assertMath(page.text, String.raw`x\to+\infty`, 'positive-tail direction');
  assertMath(page.text, String.raw`a>0`, 'positive power parameter');
  assertMath(page.text, String.raw`b>0`, 'positive exponential parameter');
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
  const solution = solutionBody(page.text);
  assertBefore(solution, /^### First gate$/m, /^### First application$/m, 'Problem 003 first gate must precede first application');
  assertBefore(solution, /^### First application$/m, /^### Renew the gate$/m, 'Problem 003 must renew after the first application');
  assertBefore(solution, /^### Renew the gate$/m, /^### Second application$/m, 'Problem 003 renewed gate must precede second application');
  const firstGate = subsectionBody(solution, 'First gate');
  assert.match(firstGate, /infinity-over-infinity|\+\\infty\s*\/\s*\+\\infty/i);
  assert.match(firstGate, /positive tail|x\s*>\s*0/i);
  assert.match(firstGate, /e\^x.*x\^2.*differentiable|differentiable.*e\^x.*x\^2/is);
  assert.match(firstGate, /2x.*(?:nonzero|\\ne\s*0)/i);
  assertMath(firstGate, String.raw`\lim_{x\to+\infty}\frac{e^x}{2x}=+\infty`, 'Problem 003 first derivative-quotient limit');
  const renewedGate = subsectionBody(solution, 'Renew the gate');
  assert.match(renewedGate, /infinity-over-infinity|\+\\infty\s*\/\s*\+\\infty/i);
  assert.match(renewedGate, /e\^x.*2x.*differentiable|differentiable.*e\^x.*2x/is);
  assert.match(renewedGate, /denominator derivative.*2.*(?:nonzero|\\ne\s*0)|2\s*\\ne\s*0/i);
  assertMath(renewedGate, String.raw`\lim_{x\to+\infty}\frac{e^x}{2}=+\infty`, 'Problem 003 second derivative-quotient limit');
  assertMath(solution, String.raw`\lim_{x\to+\infty}\frac{e^x}{x^2}=\lim_{x\to+\infty}\frac{e^x}{2x}=\lim_{x\to+\infty}\frac{e^x}{2}=\boxed{+\infty}`, 'Problem 003 exact result');
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
  const solution = solutionBody(page.text);
  assertMath(page.text, String.raw`\lim_{x\to0^+}x^2\ln x`, 'Problem 004 prompt');
  assertBefore(solution, /^### Rewrite and right-neighborhood gate$/m, /^### Apply the rule$/m, 'Problem 004 gate must precede application');
  const gate = subsectionBody(solution, 'Rewrite and right-neighborhood gate');
  assertMath(gate, String.raw`\frac{\ln x}{x^{-2}}`, 'Problem 004 quotient');
  assert.match(gate, /-\\infty.*\+\\infty|infinity-over-infinity/i);
  assert.match(gate, /0\s*<\s*x\s*<\s*\\delta|punctured right neighborhood/i);
  assert.match(gate, /\\ln x.*x\^\{-2\}.*differentiable|differentiable.*\\ln x.*x\^\{-2\}/is);
  assert.match(gate, /-2x\^\{-3\}.*(?:nonzero|\\ne\s*0)|denominator derivative.*nonzero/i);
  assertMath(gate, String.raw`\lim_{x\to0^+}\frac{1/x}{-2x^{-3}}=0`, 'Problem 004 derivative-quotient limit exists');
  assertMath(solution, String.raw`\frac{1/x}{-2x^{-3}}=-\frac{x^2}{2}\to0`, 'Problem 004 derivative quotient');
  assert.match(solution, /negative.*0\s*<\s*x\s*<\s*1|0\s*<\s*x\s*<\s*1.*negative/is);
  assertMath(solution, String.raw`\boxed{0^-}`, 'Problem 004 signed result');
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

Use this complete body after the tested frontmatter:

```markdown
## Core Idea

A limit method is valid only after the expression's form and domain are identified. Algebra, rationalization, substitution, and standard limits come before L'Hôpital's rule. The rule is a theorem with hypotheses, not permission to differentiate any numerator and denominator.

## Indeterminate Forms versus Determined Behavior

The quotient forms $0/0$ and extended-real infinity-over-infinity are indeterminate: different functions with those forms can have different limits. Forms such as a nonzero finite number divided by $0^+$ are determined in sign and magnitude. Products such as $0\cdot(-\infty)$ are not quotient forms and must first be transformed.

## Simplify Before Differentiating

Use algebraic simplification before differentiating: factor and cancel only on a punctured neighborhood, rationalize conjugate differences, use trigonometric identities, and substitute when a standard limit is hidden. For example, if $u=x^2$ and $x\to0^+$, then $u\to0^+$; substitution exposes the power-log pattern before any L'Hôpital step.

## Three Standard Limits

The reusable elementary limits are

\[
\lim_{x\to0}\frac{\sin x}{x}=1,
\qquad
\lim_{x\to0}\frac{e^x-1}{x}=1,
\qquad
\lim_{x\to0}\frac{\ln(1+x)}{x}=1.
\]

## The Full L'Hopital Gate

For a one-sided or two-sided limit of $f/g$, check all of the following on an appropriate punctured neighborhood:

1. $f$ and $g$ are differentiable there;
2. $g'(x)$ is nonzero there, equivalently $g'(x)\ne0$;
3. $f/g$ has form $0/0$ or extended-real infinity-over-infinity;
4. the ordinary or extended-real limit of $f'(x)/g'(x)$ exists.

Only then may the quotient limit be replaced by the derivative-quotient limit. A product such as $x^2\ln x$ must be rewritten as a quotient, or handled by substitution, before L'Hôpital can be considered.

## Repeated Applications Require Renewed Checks

After one differentiation the quotient has changed. Recheck its form, differentiability, nonzero denominator derivative, and derivative-quotient limit before applying the theorem again. One valid first use does not license a second use automatically.

## Logarithm, Power, and Exponential Growth

On the positive tail, for $a>0$ and $b>0$,

\[
\ln x\ll x^a\ll e^{bx},
\qquad x\to+\infty.
\]

The notation means the ratio of each earlier term to the following term tends to $0$. This hierarchy is a conclusion to prove from permitted tools, not a substitute for checking a quotient's hypotheses.

## Signed Limits at the Origin

For $a>0$,

\[
x^a\ln x\to0^-,
\qquad x\to0^+.
\]

The real limit is $0$, while the superscript records that the expression is negative for $0<x<1$. Substituting $x=e^{-t}$ converts the magnitude to $te^{-at}\to0$ as $t\to+\infty$.

## Recognition Signals

- A radical difference at infinity suggests conjugate rationalization.
- A product involving a logarithm near zero suggests substitution or quotient conversion before L'Hôpital.
- Repeated differentiation demands a fresh gate at every stage.
- A comparison among logarithms, powers, and exponentials suggests a positive-tail ratio.

## Common Mistakes

- Calling every appearance of zero or infinity indeterminate.
- Applying L'Hôpital directly to a product or difference.
- Forgetting the punctured-neighborhood differentiability and $g'\ne0$ conditions.
- Reusing the first gate for a second differentiation.
- Reporting unsigned $0$ when the requested behavior is specifically approach from below.

## Interview Checks

Before evaluating $\lim_{x\to0^+}x^2\ln x$, rewrite it as

\[
\frac{\ln x}{x^{-2}}
\]

and state every gate condition. Explain separately why the final approach is from below. On the positive tail, justify why $e^x/x^2\to+\infty$ rather than quoting the growth hierarchy without proof.
```

- [ ] **Step 4: Write Problem 003 with two explicit gate checks**

Use the tested metadata. The solution must have separate subsections `First gate`, `First application`, `Renew the gate`, and `Second application`. On a positive tail, verify differentiability and `2x != 0`, then after the first derivative quotient verify the new infinity-over-infinity form and denominator derivative `2 != 0`. End with the exact chain in the test and explicitly describe the result as positive infinity.

Use this complete body after the tested frontmatter:

```markdown
## Problem

Evaluate

\[
\lim_{x\to+\infty}\frac{e^x}{x^2}.
\]

If you use L'Hôpital's rule more than once, verify its full hypotheses for each application.

## Think Before Revealing

The initial quotient has an infinity-over-infinity form, but that observation is only one part of the gate. What must be rechecked after differentiating once?

<details>
<summary>Hint 1</summary>

On a positive tail, verify differentiability of $e^x$ and $x^2$ and check that the denominator derivative $2x$ never vanishes.

</details>

<details>
<summary>Hint 2</summary>

After the first application the quotient is $e^x/(2x)$, still infinity-over-infinity. Renew the gate; its denominator derivative is the nonzero constant $2$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### First gate

As $x\to+\infty$, both $e^x$ and $x^2$ tend to $+\infty$, so the original quotient has extended-real infinity-over-infinity form. On the positive tail $x>0$, both functions are differentiable and the denominator derivative satisfies $2x\ne0$.

The derivative quotient is $e^x/(2x)$, and its extended-real limit exists and equals $+\infty$:

\[
\lim_{x\to+\infty}\frac{e^x}{2x}=+\infty,
\]

as the renewed valid gate below establishes. Thus every hypothesis for the first application is accounted for.

### First application

L'Hôpital's rule gives

\[
\lim_{x\to+\infty}\frac{e^x}{x^2}
=\lim_{x\to+\infty}\frac{e^x}{2x}.
\]

### Renew the gate

For the new quotient, $e^x\to+\infty$ and $2x\to+\infty$, so it again has infinity-over-infinity form. Both $e^x$ and $2x$ are differentiable on the positive tail. The new denominator derivative is

\[
2\ne0.
\]

The next derivative quotient has the existing extended-real limit

\[
\lim_{x\to+\infty}\frac{e^x}{2}=+\infty.
\]

This completes a separate, full gate for the second application.

### Second application

Applying the rule again,

\[
\lim_{x\to+\infty}\frac{e^x}{2x}
=\lim_{x\to+\infty}\frac{e^x}{2}=+\infty.
\]

Combining the two valid applications,

\[
\lim_{x\to+\infty}\frac{e^x}{x^2}
=\lim_{x\to+\infty}\frac{e^x}{2x}
=\lim_{x\to+\infty}\frac{e^x}{2}
=\boxed{+\infty}.
\]

## Why This Matters

The calculation demonstrates the exponential-over-polynomial growth hierarchy while making the theorem's renewed hypotheses explicit. It is a model for any repeated L'Hôpital argument.

## Common Mistakes

- Treating infinity-over-infinity as the entire gate.
- Forgetting to check $2x\ne0$ on the chosen positive tail.
- Applying the rule a second time without checking the new quotient.
- Writing an unsigned infinity instead of the proved positive value $+\infty$.

## Extensions

For a fixed positive integer $n$, repeat the same renewed-gate argument to show $e^x/x^n\to+\infty$ as $x\to+\infty$.

</details>
```

- [ ] **Step 5: Write Problem 004 with one-sided sign preservation**

Use the tested metadata. Reject applying L'Hopital directly to the product; rewrite it as `ln x / x^{-2}`. Check the extended-real infinity-over-infinity form on a punctured right neighborhood, differentiability, denominator derivative `-2x^{-3} != 0`, and derivative-quotient limit. Since the original expression is negative for `0<x<1`, box `0^-` and explain that it records approach direction rather than a different real limit.

Use this complete body after the tested frontmatter:

```markdown
## Problem

Evaluate the one-sided limit

\[
\lim_{x\to0^+}x^2\ln x.
\]

State whether the expression approaches zero from above or below, and justify every hypothesis of any theorem you invoke.

## Think Before Revealing

The displayed expression is a product, so L'Hôpital's rule does not apply to it directly. Rewrite it as a quotient whose denominator diverges on the right of zero.

<details>
<summary>Hint 1</summary>

Rewrite the product as the quotient $x^2\ln x=\ln x/x^{-2}$. Determine the signs and extended-real limits of numerator and denominator as $x\to0^+$.

</details>

<details>
<summary>Hint 2</summary>

On $0<x<\delta$, differentiate numerator and denominator. The derivative quotient simplifies exactly to $-x^2/2$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Rewrite and right-neighborhood gate

First transform the product:

\[
x^2\ln x=\frac{\ln x}{x^{-2}}.
\]

As $x\to0^+$, the numerator tends to $-\infty$ and the denominator to $+\infty$, so this is an extended-real infinity-over-infinity quotient. On a punctured right neighborhood $0<x<\delta$, the functions $\ln x$ and $x^{-2}$ are differentiable. The denominator derivative is

\[
-2x^{-3}\ne0
\]

throughout that neighborhood. Finally, the derivative quotient has the ordinary limit

\[
\lim_{x\to0^+}\frac{1/x}{-2x^{-3}}=0.
\]

Thus the full one-sided gate is satisfied.

### Apply the rule

L'Hôpital's rule yields

\[
\lim_{x\to0^+}\frac{\ln x}{x^{-2}}
=\lim_{x\to0^+}\frac{1/x}{-2x^{-3}}
=\lim_{x\to0^+}-\frac{x^2}{2}=0.
\]

Equivalently, the exact derivative quotient is

\[
\frac{1/x}{-2x^{-3}}=-\frac{x^2}{2}\to0.
\]

### Recover the sign

For $0<x<1$, we have $x^2>0$ and $\ln x<0$, so the original product is negative. Therefore it approaches zero from below:

\[
\boxed{0^-}.
\]

The real limit is still the number $0$; the superscript records the one-sided sign of nearby values.

## Why This Matters

This is a compact test of form recognition, one-sided domains, theorem hypotheses, and sign preservation. Correct symbolic differentiation alone does not settle all four.

## Common Mistakes

- Applying L'Hôpital directly to the product $x^2\ln x$.
- Calling $(-\infty)/(+\infty)$ a determined value instead of an infinity-over-infinity form.
- Omitting differentiability or the condition $-2x^{-3}\ne0$ on the punctured right neighborhood.
- Reporting only unsigned $0$ when approach direction was requested.

## Extensions

For any $a>0$, the same quotient gate or the substitution $x=e^{-t}$ proves $x^a\ln x\to0^-$ as $x\to0^+$.

</details>
```

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

Use this complete body after the tested frontmatter:

```markdown
## Core Idea

In a related-rates problem, every changing quantity is a function of time. Geometry or physics supplies a constraint among those functions; implicit differentiation turns that constraint into a relation among their rates.

## Make Every Changing Quantity a Function of Time

Write $x=x(t)$, $y=y(t)$, and $\theta=\theta(t)$ before differentiating. Constants such as a fixed distance $a$ have derivative zero. The chain rule is what creates factors such as $dx/dt$ and $d\theta/dt$.

## Differentiate the Constraint Before Substituting

First derive a symbolic rate identity, then insert the instant's values and known rate. Early substitution can erase a changing variable or hide a sign.

For example, differentiating $x(t)^2+y(t)^2=r(t)^2$ gives

\[
2x\frac{dx}{dt}+2y\frac{dy}{dt}=2r\frac{dr}{dt}.
\]

## Units, Signs, and Coordinates versus Speeds

A coordinate may be signed, while speed is nonnegative. If $s(t)$ is a signed coordinate along a shore, $ds/dt<0$ means motion in the negative coordinate direction. Angular rate has units radians per time; multiplying by a length produces linear-rate units.

## Implicit Differentiation Pattern

For a differentiable constraint $G(x(t),y(t),t)=0$,

\[
G_x\frac{dx}{dt}+G_y\frac{dy}{dt}+G_t=0.
\]

Solve for the requested rate only after differentiating all time-dependent terms.

## Lighthouse Geometry Example

Let a lighthouse lie a fixed perpendicular distance $a>0$ miles from a straight shore. Let $s(t)$ be the signed shore coordinate of the illuminated point and let $\theta(t)$ be the beam angle measured from the perpendicular. When $\cos\theta\ne0$,

\[
s=a\tan\theta.
\]

Differentiation gives the general identity

\[
\boxed{\frac{ds}{dt}=a\sec^2\theta\frac{d\theta}{dt}}.
\]

One revolution per minute means

\[
\frac{d\theta}{dt}=2\pi\ \text{radians per minute}.
\]

Since $\sec^2\theta=1+\tan^2\theta=1+s^2/a^2$,

\[
\boxed{\frac{ds}{dt}=2\pi a\sec^2\theta
=\frac{2\pi(a^2+s^2)}{a}\ \text{miles per minute}}.
\]

## Recognition Signals

- Several quantities change with time but are tied by one geometric constraint.
- The requested object is a rate at an instant rather than a static length.
- Angles, signs, and physical units matter to interpretation.
- A value is supplied “at the moment when,” indicating substitution after differentiation.

## Common Mistakes

- Treating a changing length as a constant during differentiation.
- Substituting the instant's values before differentiating.
- Calling the coordinate $s$ a speed.
- Confusing one revolution per minute with one radian per minute.
- Dropping the chain-rule factor $d\theta/dt$.

## Interview Checks

Starting only from $s=a\tan\theta$, derive both boxed lighthouse identities and verify the final units. Then explain how the sign changes if the beam rotates in the negative angular direction.
```

- [ ] **Step 4: Write Problem 005**

Use the tested metadata. The public prompt defines perpendicular distance `a>0` miles, signed shore coordinate `s`, angle from the perpendicular, differentiable `theta(t)`, and `cos theta != 0`; it explicitly asks for both the general identity and the one-revolution-per-minute specialization. The solution differentiates before substituting `d theta/dt`, retains radians/minute and miles/minute, and derives the second speed form through `sec^2 theta=1+tan^2 theta`.

Use this complete body after the tested frontmatter:

```markdown
## Problem

A lighthouse is $a>0$ miles from a straight shore, measured along a perpendicular segment. Let $s(t)$ be the signed shore coordinate of the point illuminated by the beam, and let $\theta(t)$ be the differentiable angle from the perpendicular. Assume $\cos\theta\ne0$.

1. Derive a general formula for $ds/dt$ in terms of $a$, $\theta$, and $d\theta/dt$.
2. Specialize to one full revolution per minute and express the result both in terms of $\theta$ and in terms of $s$.

## Think Before Revealing

The right triangle gives a relation among a fixed perpendicular distance, a signed shore coordinate, and an angle. Write that relation before differentiating.

<details>
<summary>Hint 1</summary>

With the angle measured from the perpendicular, the geometric constraint is $s=a\tan\theta$. Remember that both $s$ and $\theta$ depend on time.

</details>

<details>
<summary>Hint 2</summary>

Differentiate first to get $ds/dt=a\sec^2\theta\,d\theta/dt$. One revolution per minute is $2\pi$ radians per minute, and $\sec^2\theta=1+s^2/a^2$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

The right-triangle geometry gives

\[
s=a\tan\theta,
\qquad a>0,
\qquad \cos\theta\ne0.
\]

Here $s=s(t)$ is a signed coordinate, not a speed, and $\theta=\theta(t)$. Differentiate the constraint before substituting a numerical angular rate:

\[
\frac{ds}{dt}=a\sec^2\theta\frac{d\theta}{dt}.
\]

Thus the general related-rate identity is

\[
\boxed{\frac{ds}{dt}=a\sec^2\theta\frac{d\theta}{dt}}.
\]

One full revolution per minute gives

\[
\frac{d\theta}{dt}=2\pi\ \text{radians per minute}.
\]

Substitution yields

\[
\frac{ds}{dt}=2\pi a\sec^2\theta.
\]

Finally,

\[
\sec^2\theta=1+\tan^2\theta=1+\frac{s^2}{a^2},
\]

so the two exact specialized forms are

\[
\boxed{\frac{ds}{dt}=2\pi a\sec^2\theta
=\frac{2\pi(a^2+s^2)}{a}\ \text{miles per minute}}.
\]

The sign is the direction along the chosen shore coordinate. Its magnitude is the linear speed of the illuminated point.

## Why This Matters

The problem tests modeling more than differentiation: the angular convention, signed coordinate, units, and substitution order all affect the answer.

## Common Mistakes

- Writing $s$ as though it were a speed rather than a coordinate.
- Replacing one revolution per minute by $1$ radian per minute instead of $2\pi$.
- Omitting $d\theta/dt$ when differentiating $\tan\theta(t)$.
- Substituting before differentiating.
- Dropping miles-per-minute units from the final linear rate.

## Extensions

If the beam rotates with a variable angular rate $\omega(t)$, replace $2\pi$ by $\omega(t)$. Analyze the growth of the shore speed as $\cos\theta\to0$ while noting that the tangent model is then approaching its domain boundary.

</details>
```

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
  assertMath(page.text, String.raw`\boxed{\lim_{x\to+\infty}(\sqrt{x^2+5x}-x)=\frac52}`, 'Problem 006 limit');
  assert.match(page.text, /cannot subtract|invalid.*subtract|infinity minus infinity/i);
  assert.ok((normalizedMath(page.text).match(/5/g) ?? []).length >= 4, 'coefficient 5 disappeared during rationalization');
});
```

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: all earlier subtests pass and Problem 006 fails with `ENOENT`.

- [ ] **Step 3: Write minimal GREEN Problem 006**

Use the exact tested metadata. The first hint points to the conjugate; the second writes the conjugate denominator without simplifying the coefficient away. The solution multiplies by the conjugate, obtains numerator `5x`, divides numerator and denominator by positive `x` on the positive tail, and reaches `5/(sqrt(1+5/x)+1) -> 5/2`. Common Mistakes must reject treating infinity as an ordinary number and changing `5x` to `x`.

Use this complete body after the tested frontmatter:

```markdown
## Problem

Evaluate

\[
\lim_{x\to+\infty}\left(\sqrt{x^2+5x}-x\right).
\]

Give an exact algebraic argument; do not subtract two infinite limits.

## Think Before Revealing

The expression has cancellation between two terms of order $x$. Which multiplication removes the radical while preserving the coefficient of the linear term?

<details>
<summary>Hint 1</summary>

Multiply and divide by the conjugate $\sqrt{x^2+5x}+x$.

</details>

<details>
<summary>Hint 2</summary>

The numerator becomes $(x^2+5x)-x^2=5x$. On the positive tail divide both numerator and denominator by the positive number $x$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

We cannot subtract $+\infty-(+\infty)$: infinity is not an ordinary number, and this is an indeterminate difference. Rationalize instead:

\[
\sqrt{x^2+5x}-x
=\frac{(\sqrt{x^2+5x}-x)(\sqrt{x^2+5x}+x)}{\sqrt{x^2+5x}+x}.
\]

The numerator is exactly

\[
(x^2+5x)-x^2=5x,
\]

so

\[
\sqrt{x^2+5x}-x
=\frac{5x}{\sqrt{x^2+5x}+x}.
\]

For sufficiently large positive $x$, divide numerator and denominator by $x>0$:

\[
\sqrt{x^2+5x}-x
=\frac{5}{\sqrt{1+5/x}+1}.
\]

Therefore

\[
\boxed{\lim_{x\to+\infty}(\sqrt{x^2+5x}-x)=\frac52}.
\]

Equivalently, the exact transformation is

\[
\sqrt{x^2+5x}-x
=\frac{5x}{\sqrt{x^2+5x}+x}
=\frac{5}{\sqrt{1+5/x}+1}.
\]

## Why This Matters

Conjugate rationalization exposes the finite remainder hidden by leading-order cancellation. It is safer and shorter than applying a theorem to an expression that is not a quotient.

## Common Mistakes

- Treating infinity as a number and subtracting it from itself.
- Losing the coefficient $5$ by replacing the numerator $5x$ with $x$.
- Dividing $\sqrt{x^2+5x}$ by $x$ without noting that the limit is on the positive tail.
- Rationalizing only the numerator and forgetting the conjugate denominator.

## Extensions

For real $c$, the same positive-tail calculation gives

\[
\sqrt{x^2+cx}-x\longrightarrow\frac c2.
\]

Explain why a limit toward $-\infty$ requires separate handling of $|x|$ when extracting $x^2$ from a square root.

</details>
```

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
  const derivation = solutionBody(page.text);
  assertMath(page.text, String.raw`g(x)=e^{\cos x}`, 'Problem 010 function');
  assertMath(derivation, String.raw`\Delta_h=\cos(x+h)-\cos x`, 'Problem 010 Delta definition');
  assertMath(derivation, String.raw`\frac{g(x+h)-g(x)}h=e^{\cos x}\left(\frac{e^{\Delta_h}-1}{\Delta_h}\right)\left(\frac{\Delta_h}{h}\right)`, 'Problem 010 exact factorization');
  assert.match(derivation, /limiting interpretation.*Delta|when.*Delta_h.*zero|Delta_h.*zero.*limit/is);
  assertMath(derivation, String.raw`\frac{\Delta_h}{h}=\cos x\frac{\cos h-1}{h}-\sin x\frac{\sin h}{h}`, 'Problem 010 angle-addition quotient');
  assertMath(derivation, String.raw`\lim_{h\to0}\frac{\Delta_h}{h}=-\sin x`, 'Problem 010 inner limit');
  assertMath(derivation, String.raw`\lim_{z\to0}\frac{e^z-1}{z}=1`, 'Problem 010 exponential limit');
  assertMath(derivation, String.raw`\boxed{g'(x)=-\sin x\,e^{\cos x}}`, 'Problem 010 derivative');
  assert.doesNotMatch(derivation, /Taylor|Maclaurin|big-O|O\(h/i);
  assert.doesNotMatch(page.text, /e\^x\s*\\cos x|e\^x\s*cos x/);
});
```

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: only Problem 010 fails with `ENOENT`.

- [ ] **Step 3: Write minimal GREEN Problem 010**

Use the exact metadata asserted above. Start from the difference quotient, define `Delta_h`, factor exactly as tested, and explain the limiting interpretation at isolated `h` values for which `Delta_h=0`. Use angle addition plus `sin h/h -> 1` and `(cos h-1)/h -> 0` to obtain `Delta_h/h -> -sin x`; use continuity to show `Delta_h -> 0`, then the standard exponential limit. Do not use a Taylor/Maclaurin expansion and do not substitute the unrelated product `e^x cos x`. In Common Mistakes, describe those prohibited shortcuts in words without presenting them as derivation steps.

Use this complete body after the tested frontmatter:

```markdown
## Problem

Let

\[
g(x)=e^{\cos x}.
\]

Derive $g'(x)$ directly from the difference quotient, using only angle addition and standard elementary limits. Do not use the chain rule as a quoted result and do not use a Taylor series.

## Think Before Revealing

Factor out $e^{\cos x}$, then create one factor governed by the standard exponential limit and a second factor governed by the first-principles derivative of cosine.

<details>
<summary>Hint 1</summary>

Define $\Delta_h=\cos(x+h)-\cos x$. Rewrite $e^{\cos(x+h)}$ as $e^{\cos x}e^{\Delta_h}$.

</details>

<details>
<summary>Hint 2</summary>

Insert $\Delta_h/\Delta_h$ in the limiting sense. Use angle addition to show $\Delta_h/h\to-\sin x$; then the standard exponential limit gives $(e^{\Delta_h}-1)/\Delta_h\to1$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Start from the definition:

\[
\frac{g(x+h)-g(x)}h
=\frac{e^{\cos(x+h)}-e^{\cos x}}h.
\]

Set

\[
\Delta_h=\cos(x+h)-\cos x.
\]

Then $e^{\cos(x+h)}=e^{\cos x}e^{\Delta_h}$, so

\[
\frac{g(x+h)-g(x)}h
=e^{\cos x}\frac{e^{\Delta_h}-1}{h}.
\]

For $\Delta_h\ne0$, factor this exactly as

\[
\frac{g(x+h)-g(x)}h
=e^{\cos x}
\left(\frac{e^{\Delta_h}-1}{\Delta_h}\right)
\left(\frac{\Delta_h}{h}\right).
\]

If $\Delta_h=0$ for isolated nonzero $h$, the product is understood through the same limiting extension: $(e^z-1)/z$ extends continuously to value $1$ at $z=0$.

Now angle addition gives

\[
\Delta_h
=\cos x(\cos h-1)-\sin x\sin h,
\]

and hence

\[
\frac{\Delta_h}{h}
=\cos x\frac{\cos h-1}{h}
-\sin x\frac{\sin h}{h}.
\]

Using

\[
\frac{\cos h-1}{h}\to0,
\qquad
\frac{\sin h}{h}\to1,
\]

we obtain

\[
\lim_{h\to0}\frac{\Delta_h}{h}=-\sin x.
\]

Continuity of cosine gives $\Delta_h\to0$, so the standard exponential limit gives

\[
\lim_{z\to0}\frac{e^z-1}{z}=1.
\]

Multiplying the three limits,

\[
\boxed{g'(x)=-\sin x\,e^{\cos x}}.
\]

## Why This Matters

The factorization exposes the chain rule from first principles: one limit differentiates the outer exponential and the other differentiates the inner cosine.

## Common Mistakes

- Replacing the requested function by an unrelated product of an exponential and a cosine.
- Quoting the chain rule instead of deriving the difference quotient.
- Dividing by $\Delta_h$ without explaining the limiting interpretation when it is zero.
- Using a Taylor or Maclaurin expansion despite the method restriction.
- Losing the minus sign in the cosine difference quotient.

## Extensions

Repeat the same factorization for $e^{u(x)}$ whenever the first-principles derivative of $u$ is known and $u(x+h)-u(x)\to0$.

</details>
```

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
  assert.match(page.text, /nested[ -]radical/i);
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
  const solution = solutionBody(page.text);
  assertBefore(solution, /^### Invariant interval$/m, /^### Alternating subsequences$/m, 'Problem 008 invariant proof must precede subsequences');
  assertBefore(solution, /^### Alternating subsequences$/m, /^### A single limit$/m, 'Problem 008 subsequences must precede common-limit proof');
  assertBefore(solution, /^### A single limit$/m, /^### Fixed point and selection$/m, 'Problem 008 convergence must precede fixed point');
  const invariant = subsectionBody(solution, 'Invariant interval');
  assertMath(invariant, String.raw`c_0=2`, 'Problem 008 start');
  assertMath(invariant, String.raw`c_1=F(2)=3`, 'Problem 008 first iterate');
  assertMath(invariant, String.raw`2\le c_n\le3`, 'Problem 008 invariant');
  assert.match(invariant, /2\s*\le.*2\s*\+\s*2\s*\/.*\le\s*3|maps.*\[2,\s*3\].*into/is);
  const subsequences = subsectionBody(solution, 'Alternating subsequences');
  assertMath(subsequences, String.raw`c_0=2<c_2=2+\frac23=\frac83`, 'Problem 008 even base inequality');
  assert.match(subsequences, /c_\{2n\}.*increasing|even subsequence.*increasing/i);
  assert.match(subsequences, /c_\{2n\+1\}.*decreasing|odd subsequence.*decreasing/i);
  assert.match(subsequences, /apply.*decreasing|F.*decreasing/i);
  const common = subsectionBody(solution, 'A single limit');
  assertMath(common, String.raw`b=2+\frac2a`, 'Problem 008 odd-subsequence limit');
  assertMath(common, String.raw`a=2+\frac2b`, 'Problem 008 even-subsequence limit');
  assertMath(common, String.raw`(b-a)\left(1-\frac2{ab}\right)=0`, 'Problem 008 equal-limits argument');
  assert.match(common, /a,?b.*(?:greater than or equal|\\ge).*2.*ab.*(?:greater than or equal|\\ge).*4|ab\s*=\s*2.*impossible/is);
  assert.match(common, /full sequence converges|a\s*=\s*b/i);
  const fixed = subsectionBody(solution, 'Fixed point and selection');
  assertMath(fixed, String.raw`L^2-2L-2=0`, 'Problem 008 fixed-point polynomial');
  assertMath(fixed, String.raw`L=1\pm\sqrt3`, 'Problem 008 candidate roots');
  assertMath(fixed, String.raw`\boxed{L=1+\sqrt3}`, 'Problem 008 selected limit');
  assert.match(fixed, /(?:positive|positivity).*1-\\sqrt3.*reject|1-\\sqrt3.*reject/i);
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

Use this complete body after the tested frontmatter:

```markdown
## Core Idea

A recursive sequence is not known to converge merely because its formal limit would satisfy a fixed-point equation. First prove convergence, commonly through monotonicity plus a bound or through convergent even and odd subsequences. Only after convergence is proved may continuity identify the limit.

## Bounded Monotone Convergence

Every bounded monotone real sequence converges: every increasing real sequence bounded above converges, and every decreasing real sequence bounded below converges. The proof obligation therefore has two independent parts: an induction establishing monotonicity and an induction establishing the bound.

## Invariant Intervals and Induction

For $x_{n+1}=F(x_n)$, an interval $I$ is invariant if $F(I)\subseteq I$. Prove $x_0\in I$ and the implication $x_n\in I\Rightarrow x_{n+1}\in I$. This supplies bounds but not necessarily monotonicity.

## Alternating Recurrences and Even/Odd Subsequences

If $F$ is decreasing, consecutive terms can oscillate. Study $x_{2n}$ and $x_{2n+1}$ separately. If the even terms increase, the odd terms decrease, and both remain in a common compact interval, they have limits $a$ and $b$. The recurrence then relates $a$ and $b$; a separate argument must prove $a=b$ before the full sequence converges.

## Continuity after Convergence

Once $x_n\to L$ is proved and $F$ is continuous at $L$,

\[
L=\lim x_{n+1}=\lim F(x_n)=F(L).
\]

This step comes after convergence. Reversing that order is circular.

## Fixed Points Give Candidates, Not Convergence

The equation $L=F(L)$ can have several roots, roots outside the invariant interval, or roots even when the original sequence diverges. Use positivity, bounds, and the proved trajectory to select among candidates.

## Continued-Fraction Safeguard

For

\[
c_0=2,
\qquad
c_{n+1}=2+\frac2{c_n},
\]

the map is decreasing and preserves $[2,3]$. The even subsequence increases and the odd subsequence decreases; their limits coincide. Only then does

\[
L=2+\frac2L
\]

give the admissible limit

\[
L=1+\sqrt3.
\]

## Nested-Radical Safeguard

For $a_1=\sqrt2$ and $a_{n+1}=\sqrt{2+a_n}$, prove by induction that the sequence is increasing and that $a_n<2$. Bounded monotone convergence then permits the fixed-point equation, whose positive solution is $L=2$.

## Power-Tower Safeguard

If an infinite tower is requested to equal $2$, the positive base is

\[
x=\sqrt2.
\]

For the finite towers $t_0=\sqrt2$ and $t_{n+1}=(\sqrt2)^{t_n}$, prove increasing behavior and the invariant upper bound $t_n<2$. The proved limit is $L=2$. Both $2$ and $4$ satisfy the fixed-point equation, so branch $4$ must be rejected using $L\le2$.

## Recognition Signals

- A recursive radical, continued fraction, or power tower asks for convergence before algebraic limit selection.
- A decreasing recurrence suggests alternating even/odd subsequences.
- Several fixed-point roots signal the need for positivity or an invariant interval.
- “Clearly converges” is a warning that a bound or monotonicity proof is missing.

## Common Mistakes

- Solving $L=F(L)$ before proving that a limit exists.
- Proving only boundedness or only monotonicity.
- Assuming convergent even and odd subsequences have the same limit.
- Selecting a fixed point merely because it is positive when a sharper bound is available.
- Confusing a power tower's base with its limit.

## Interview Checks

For each of the three safeguards above, state the induction base, induction step, bound, convergence theorem, fixed-point candidates, and final selection in that order.
```

- [ ] **Step 4: Write Problem 008 with the complete subsequence proof**

Use the tested metadata. Prove `[2,3]` is invariant, show even terms increase and odd terms decrease, name their limits `a,b`, pass the recurrence only after those subsequences converge, and use the exact subtraction identity to prove `a=b`. Only then solve the fixed-point quadratic; positivity rejects `1-sqrt(3)`. Do not shorten the proof to “the continued fraction clearly converges.”

Use this complete body after the tested frontmatter:

```markdown
## Problem

Define the finite continued-fraction convergents by

\[
c_0=2,
\qquad
c_{n+1}=2+\frac2{c_n}.
\]

Prove that $(c_n)$ converges and find its limit. A fixed-point equation without a convergence proof is not sufficient.

## Think Before Revealing

The update map is decreasing, so the full sequence oscillates. Look for an invariant interval and then separate the even and odd terms.

<details>
<summary>Hint 1</summary>

Show that $F(x)=2+2/x$ maps $[2,3]$ into itself. Compute $c_0<c_2$ and use the monotonicity of two applications of $F$.

</details>

<details>
<summary>Hint 2</summary>

Let the even and odd subsequence limits be $a$ and $b$. Continuity gives $b=2+2/a$ and $a=2+2/b$; subtract these equations before solving any fixed point.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let $F(x)=2+2/x$ for $x>0$.

### Invariant interval

We have

\[
c_0=2,
\qquad
c_1=F(2)=3.
\]

If $2\le x\le3$, then $2/3\le2/x\le1$, so

\[
2\le F(x)\le3.
\]

Thus $F$ maps $[2,3]$ into itself. By induction,

\[
2\le c_n\le3
\]

for every $n$.

### Alternating subsequences

The map $F$ is strictly decreasing. Directly,

\[
c_0=2<c_2=2+\frac23=\frac83.
\]

Since $F\circ F$ is increasing, applying it repeatedly preserves this inequality:

\[
c_{2n}<c_{2n+2}.
\]

Hence the even subsequence is increasing. Applying the decreasing map $F$ to $c_{2n}<c_{2n+2}$ reverses the inequality:

\[
c_{2n+1}>c_{2n+3},
\]

so the odd subsequence is decreasing. Both subsequences remain in $[2,3]$, hence both converge.

### A single limit

Write

\[
a=\lim_{n\to+\infty}c_{2n},
\qquad
b=\lim_{n\to+\infty}c_{2n+1}.
\]

Continuity of $F$ on $[2,3]$ gives

\[
b=2+\frac2a,
\qquad
a=2+\frac2b.
\]

Subtracting,

\[
(b-a)\left(1-\frac2{ab}\right)=0.
\]

Because $a,b\ge2$, we have $ab\ge4$, so $ab=2$ is impossible. Therefore $a=b$. The even and odd subsequences have the same limit, so the full sequence converges.

### Fixed point and selection

Only now let the full limit be $L$. Passing to the recurrence gives

\[
L=2+\frac2L,
\qquad
L^2-2L-2=0.
\]

The candidates are

\[
L=1\pm\sqrt3.
\]

Every $c_n$ is positive, so the negative candidate $1-\sqrt3$ is rejected. Hence

\[
\boxed{L=1+\sqrt3}.
\]

## Why This Matters

The sequence illustrates why an oscillating recurrence may converge even though it is not monotone as a whole, and why a fixed-point equation belongs at the end of the proof.

## Common Mistakes

- Claiming the continued fraction “clearly converges.”
- Solving the quadratic before proving existence of a limit.
- Proving that even and odd subsequences converge but not that their limits agree.
- Selecting $1+\sqrt3$ solely because it looks plausible, without the positivity argument.

## Extensions

For $c_{n+1}=p+q/c_n$ with positive $p,q$, identify an invariant interval and determine when the same alternating-subsequence strategy applies.

</details>
```

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
  const solution = solutionBody(page.text);
  assertBefore(solution, /^### Monotonicity by induction$/m, /^### Upper bound by induction$/m, 'Problem 011 monotonicity must precede bound');
  assertBefore(solution, /^### Upper bound by induction$/m, /^### Convergence$/m, 'Problem 011 bound must precede convergence');
  assertBefore(solution, /^### Convergence$/m, /^### Fixed point$/m, 'Problem 011 convergence must precede fixed point');
  const monotonicity = subsectionBody(solution, 'Monotonicity by induction');
  assertMath(monotonicity, String.raw`a_1=\sqrt2`, 'Problem 011 start');
  assertMath(monotonicity, String.raw`a_{n+1}=\sqrt{2+a_n}`, 'Problem 011 recurrence');
  assert.match(monotonicity, /a_2.*>.*a_1|base case.*increasing/is);
  assert.match(monotonicity, /a_n.*>.*a_\{n-1\}.*a_\{n\+1\}.*>.*a_n|inductive hypothesis.*square root.*increasing/is);
  const bound = subsectionBody(solution, 'Upper bound by induction');
  assert.match(bound, /a_1.*<.*2|base case.*upper bound/is);
  assert.match(bound, /a_n.*<.*2.*a_\{n\+1\}.*<.*2|inductive hypothesis.*upper bound/is);
  const convergence = subsectionBody(solution, 'Convergence');
  assert.match(convergence, /increasing.*bounded above.*converges|bounded monotone convergence/is);
  const fixed = subsectionBody(solution, 'Fixed point');
  assertMath(fixed, String.raw`L=\sqrt{2+L}`, 'Problem 011 fixed point');
  assert.match(fixed, /positivity.*-1|reject.*-1/i);
  assertMath(fixed, String.raw`\boxed{L=2}`, 'Problem 011 limit');
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
  const solution = solutionBody(page.text);
  assertBefore(solution, /^### Determine the base$/m, /^### Monotonicity by induction$/m, 'Problem 012 base must precede validation');
  assertBefore(solution, /^### Monotonicity by induction$/m, /^### Upper bound by induction$/m, 'Problem 012 monotonicity must precede bound');
  assertBefore(solution, /^### Upper bound by induction$/m, /^### Convergence and branch selection$/m, 'Problem 012 bound must precede fixed point');
  const base = subsectionBody(solution, 'Determine the base');
  assertMath(base, String.raw`2=x^2`, 'Problem 012 base equation');
  assertMath(base, String.raw`\boxed{x=\sqrt2}`, 'Problem 012 requested base');
  const monotonicity = subsectionBody(solution, 'Monotonicity by induction');
  assertMath(monotonicity, String.raw`t_0=\sqrt2`, 'Problem 012 finite-tower start');
  assertMath(monotonicity, String.raw`t_{n+1}=(\sqrt2)^{t_n}`, 'Problem 012 finite-tower recurrence');
  assert.match(monotonicity, /t_1.*>.*t_0|base case.*increasing/is);
  assert.match(monotonicity, /t_n.*>.*t_\{n-1\}.*t_\{n\+1\}.*>.*t_n|inductive hypothesis.*increasing function/is);
  const bound = subsectionBody(solution, 'Upper bound by induction');
  assert.match(bound, /t_0.*<.*2|base case.*upper bound/is);
  assertMath(bound, String.raw`t_{n+1}=(\sqrt2)^{t_n}<(\sqrt2)^2=2`, 'Problem 012 inductive upper bound');
  const closure = subsectionBody(solution, 'Convergence and branch selection');
  assert.match(closure, /increasing.*bounded above.*converges|bounded monotone convergence/is);
  assertMath(closure, String.raw`L=(\sqrt2)^L`, 'Problem 012 fixed point');
  assert.match(closure, /both.*2.*4|2 and 4.*fixed/i);
  assert.match(closure, /L\s*\\le\s*2.*reject.*4|upper bound.*reject.*4/is);
  assertMath(closure, String.raw`\boxed{L=2}`, 'Problem 012 proved tower limit');
  assert.match(solution, /base.*not.*limit|must not be conflated|distinguish.*base.*limit/i);
});
```

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-limits-derivatives-content.test.mjs`.

Expected: only Problems 011 and 012 fail with `ENOENT`.

- [ ] **Step 3: Write Problem 011**

Use the exact tested metadata. Prove the lower start and monotonic step by induction, prove `a_n<2` by induction, invoke bounded-monotone convergence, then solve `L=sqrt(2+L)` and reject `-1` by positivity. Keep the proof order visible in section headings.

Use this complete body after the tested frontmatter:

```markdown
## Problem

Let

\[
a_1=\sqrt2,
\qquad
a_{n+1}=\sqrt{2+a_n}.
\]

Prove that $(a_n)$ converges and find its limit. Do not begin by assuming the infinite nested radical has a value.

## Think Before Revealing

The fixed-point equation has two algebraic roots, but it neither proves convergence nor selects the admissible root. Establish monotonicity and a uniform upper bound first.

<details>
<summary>Hint 1</summary>

For monotonicity, verify $a_2>a_1$ and use that $x\mapsto\sqrt{2+x}$ is strictly increasing.

</details>

<details>
<summary>Hint 2</summary>

Prove $a_n<2$ by induction: if $a_n<2$, then $a_{n+1}=\sqrt{2+a_n}<\sqrt4=2$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Monotonicity by induction

The sequence starts at

\[
a_1=\sqrt2,
\qquad
a_2=\sqrt{2+\sqrt2}>\sqrt2=a_1.
\]

Assume $a_n>a_{n-1}$. Since $x\mapsto\sqrt{2+x}$ is strictly increasing,

\[
a_{n+1}=\sqrt{2+a_n}
>\sqrt{2+a_{n-1}}=a_n.
\]

By induction, $(a_n)$ is increasing.

### Upper bound by induction

The base case is $a_1=\sqrt2<2$. If $a_n<2$, then

\[
a_{n+1}=\sqrt{2+a_n}<\sqrt{2+2}=2.
\]

Thus $a_n<2$ for every $n$, so the sequence is bounded above by $2$.

### Convergence

The sequence is increasing and bounded above. By bounded monotone convergence, it converges to some real $L$ with $0<L\le2$.

### Fixed point

Only after convergence is established do we pass to the continuous recurrence:

\[
L=\sqrt{2+L}.
\]

Squaring gives

\[
L^2-L-2=0,
\qquad
(L-2)(L+1)=0.
\]

The candidates are $2$ and $-1$. Positivity rejects $-1$, so

\[
\boxed{L=2}.
\]

## Why This Matters

The proof shows the correct order for recursive limits: induction for behavior, a convergence theorem, continuity, and only then algebraic selection.

## Common Mistakes

- Writing $L=\sqrt{2+L}$ before proving that $(a_n)$ converges.
- Proving the upper bound but omitting monotonicity, or vice versa.
- Squaring without checking the sign of the candidate.
- Treating the drawn infinite radical as an already-defined number.

## Extensions

For $a_{n+1}=\sqrt{c+a_n}$ with $c>0$, seek a positive invariant interval and identify the positive root of $L^2-L-c=0$ only after convergence.

</details>
```

- [ ] **Step 4: Write Problem 012**

Use the exact tested metadata. The public question first asks for the positive base. Derive `2=x^2` conditionally and box `x=sqrt(2)`, then separately validate admissibility through the finite towers. Prove `t_1>t_0`, use monotonicity of `y -> (sqrt(2))^y` for the induction step, and prove every finite term is below `2`; only then pass to `L=(sqrt(2))^L`. Explicitly check that `2` and `4` solve the fixed-point equation and reject `4` with `L<=2`. Box the base and the limit separately.

Use this complete body after the tested frontmatter:

```markdown
## Problem

Find the positive base $x$ for which the infinite power tower is intended to have value $2$:

\[
x^{x^{x^{\cdot^{\cdot}}}}=2.
\]

Then define the finite towers and prove that, for your base, they really converge to $2$. Distinguish the requested base from the tower limit and address every fixed-point branch.

## Think Before Revealing

If a tower limit were $2$, the outermost relation would impose an equation on the base. That equation produces a candidate base; finite-tower convergence must still be proved independently.

<details>
<summary>Hint 1</summary>

Conditionally set the tail equal to $2$ to obtain $2=x^2$. Keep the positive root, then define $t_0=\sqrt2$ and $t_{n+1}=(\sqrt2)^{t_n}$.

</details>

<details>
<summary>Hint 2</summary>

Prove $t_n$ is increasing using the increasing map $y\mapsto(\sqrt2)^y$. Separately prove $t_n<2$ by comparing $(\sqrt2)^{t_n}$ with $(\sqrt2)^2$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Determine the base

If the tower has value $2$, removing its first base leaves the same tail value, so necessarily

\[
2=x^2.
\]

The requested base is positive, hence

\[
\boxed{x=\sqrt2}.
\]

This is only a candidate base. It is not yet a convergence proof, and the base $\sqrt2$ is not the claimed limit $2$.

### Monotonicity by induction

Define finite towers by

\[
t_0=\sqrt2,
\qquad
t_{n+1}=(\sqrt2)^{t_n}.
\]

Because $\sqrt2>1$ and $t_0>1$,

\[
t_1=(\sqrt2)^{t_0}>\sqrt2=t_0.
\]

Assume $t_n>t_{n-1}$. The function $y\mapsto(\sqrt2)^y$ is strictly increasing, so

\[
t_{n+1}=(\sqrt2)^{t_n}
>(\sqrt2)^{t_{n-1}}=t_n.
\]

Thus $(t_n)$ is increasing.

### Upper bound by induction

The base case is $t_0=\sqrt2<2$. If $t_n<2$, monotonicity of the exponential gives

\[
t_{n+1}=(\sqrt2)^{t_n}<(\sqrt2)^2=2.
\]

Therefore every finite tower satisfies $t_n<2$.

### Convergence and branch selection

The sequence is increasing and bounded above by $2$, so bounded monotone convergence gives a limit $L\le2$. Continuity now permits

\[
L=(\sqrt2)^L.
\]

Both $L=2$ and $L=4$ satisfy this fixed-point equation:

\[
(\sqrt2)^2=2,
\qquad
(\sqrt2)^4=4.
\]

The fixed-point equation alone therefore does not choose a branch. The proved bound $L\le2$ rejects branch $4$, while the increasing sequence is positive. Hence

\[
\boxed{L=2}.
\]

The requested base is $\sqrt2$; the separately proved finite-tower limit is $2$. They must not be conflated.

## Why This Matters

Power towers make the “fixed points are candidates” warning concrete. Even a correct base equation can coexist with multiple fixed points, so the finite iterates decide the admissible branch.

## Common Mistakes

- Reporting $2$ as the base instead of $\sqrt2$.
- Assuming the candidate base automatically defines a convergent infinite tower.
- Passing to $L=(\sqrt2)^L$ before proving convergence.
- Ignoring the second fixed-point branch $4$.
- Rejecting $4$ by intuition rather than the proved upper bound.

## Extensions

For a general positive base $b$, study finite towers $t_{n+1}=b^{t_n}$ and ask which invariant intervals make a selected fixed point dynamically attainable.

</details>
```

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
  assertMath(page.text, String.raw`\sum_{k=0}^{N}r^k=\frac{1-r^{N+1}}{1-r}`, 'finite geometric sum');
  assertMath(page.text, String.raw`|r|<1`, 'infinite geometric criterion');
  assertMath(page.text, String.raw`\sum_{k=0}^{+\infty}r^k=\frac1{1-r}`, 'infinite geometric sum');
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
  const solution = solutionBody(page.text);
  assertBefore(solution, /^### Harmonic series: dyadic lower blocks$/m, /^### Reciprocal-square series: telescoping upper bound$/m, 'Problem 013 harmonic proof must come first');
  assertBefore(solution, /^### Reciprocal-square series: telescoping upper bound$/m, /^### Logarithmic-harmonic series: condensation$/m, 'Problem 013 square proof must precede log-harmonic proof');
  const harmonic = subsectionBody(solution, 'Harmonic series: dyadic lower blocks');
  assertMath(harmonic, String.raw`\sum_{k=2^m+1}^{2^{m+1}}\frac1k\ge2^m\frac1{2^{m+1}}=\frac12`, 'Problem 013 dyadic harmonic block');
  assert.match(harmonic, /infinitely many.*blocks.*one half|partial sums.*unbounded/is);
  assertMath(harmonic, String.raw`\boxed{\sum_{k=1}^{+\infty}\frac1k\text{ diverges}}`, 'harmonic classification');
  const square = subsectionBody(solution, 'Reciprocal-square series: telescoping upper bound');
  assertMath(square, String.raw`\frac1{k^2}\le\frac1{k(k-1)}=\frac1{k-1}-\frac1k`, 'Problem 013 telescoping comparison');
  assertMath(square, String.raw`k\ge2`, 'Problem 013 square comparison domain');
  assertMath(square, String.raw`\sum_{k=2}^{N}\frac1{k^2}\le\sum_{k=2}^{N}\left(\frac1{k-1}-\frac1k\right)=1-\frac1N`, 'Problem 013 bounded square partial sums');
  assert.match(square, /increasing.*bounded above.*converges|bounded increasing partial sums/is);
  assertMath(square, String.raw`\boxed{\sum_{k=1}^{+\infty}\frac1{k^2}\text{ converges}}`, 'square-series classification');
  const logHarmonic = subsectionBody(solution, 'Logarithmic-harmonic series: condensation');
  assert.match(logHarmonic, /a_k.*positive.*decreasing|positive.*nonincreasing/is);
  assert.match(logHarmonic, /k\s*\ln k.*increasing|product.*increasing/is);
  assert.match(logHarmonic, /Cauchy condensation/i);
  assertMath(logHarmonic, String.raw`2^na_{2^n}=\frac{2^n}{2^n\ln(2^n)}=\frac1{n\ln2}`, 'Problem 013 condensed terms');
  assertMath(logHarmonic, String.raw`\sum_{n=1}^{+\infty}2^na_{2^n}=\frac1{\ln2}\sum_{n=1}^{+\infty}\frac1n`, 'Problem 013 exact harmonic comparison chain');
  assert.match(logHarmonic, /constant multiple.*harmonic|compare.*harmonic/i);
  assertMath(logHarmonic, String.raw`\boxed{\sum_{k=2}^{+\infty}\frac1{k\ln k}\text{ diverges}}`, 'log-harmonic classification');
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

Use this complete body after the tested frontmatter:

```markdown
## Core Idea

For a series with nonnegative terms, the partial sums are increasing. The series converges exactly when those partial sums are bounded above. Comparison, telescoping, dyadic grouping, and condensation provide bounds without integration.

## Nonnegative Terms and Bounded Increasing Partial Sums

If $a_k\ge0$, then $S_N=\sum_{k=1}^N a_k$ satisfies $S_{N+1}\ge S_N$. Thus

\[
\sum_{k=1}^{+\infty}a_k\text{ converges}
\quad\Longleftrightarrow\quad
(S_N)\text{ is bounded above}.
\]

## The Necessary Term Test

Convergence requires

\[
a_n\to0.
\]

This is necessary but not sufficient: the harmonic terms tend to zero while the harmonic series diverges. If $a_n$ does not tend to zero, divergence follows immediately.

## Geometric Series

For $r\ne1$,

\[
\sum_{k=0}^{N}r^k=\frac{1-r^{N+1}}{1-r}.
\]

The infinite geometric series converges exactly when $|r|<1$, and then

\[
\sum_{k=0}^{+\infty}r^k=\frac1{1-r}.
\]

## Direct Comparison and Telescoping Bounds

For nonnegative terms, $0\le a_k\le b_k$ and convergence of $\sum b_k$ imply convergence of $\sum a_k$. A useful telescoping identity is

\[
\frac1{k^2}\le\frac1{k(k-1)}
=\frac1{k-1}-\frac1k,
\qquad k\ge2.
\]

The comparison makes the reciprocal-square partial sums bounded.

## Harmonic Divergence by Dyadic Grouping

In the block $2^m<k\le2^{m+1}$ there are $2^m$ terms, each at least $1/2^{m+1}$. Therefore every such block contributes at least $1/2$. Infinitely many blocks force unbounded partial sums.

## Cauchy Condensation with Its Hypotheses

If $(a_k)$ is positive and nonincreasing, Cauchy condensation says

\[
\sum_{k\ge1}a_k
\quad\text{and}\quad
\sum_{n\ge0}2^n a_{2^n}
\]

have the same convergence behavior. Positivity and monotone decrease must be verified before applying the theorem.

## Positive p-Series by Dyadic Blocks

For $p>1$, the block $2^k\le n<2^{k+1}$ is bounded above by a constant multiple of

\[
2^{k(1-p)},
\]

and these geometric bounds sum. For $0<p\le1$, $1/k^p\ge1/k$, so comparison with the harmonic series gives divergence. For $p\le0$, the terms do not tend to zero, so the term test gives divergence.

## The Reciprocal-Square Series

For $N\ge2$,

\[
\sum_{k=2}^{N}\frac1{k^2}
\le\sum_{k=2}^{N}\left(\frac1{k-1}-\frac1k\right)
=1-\frac1N<1.
\]

The nonnegative partial sums are increasing and bounded above, so $\sum_{k=1}^{+\infty}1/k^2$ converges.

## The Logarithmic-Harmonic Series

For $k\ge2$, $a_k=1/(k\ln k)$ is positive and decreasing because $k\ln k$ is positive and increasing. Condensation gives

\[
2^n a_{2^n}
=\frac{2^n}{2^n\ln(2^n)}
=\frac1{n\ln2}.
\]

Consequently,

\[
\sum_{n=1}^{+\infty}2^n a_{2^n}
=\frac1{\ln2}\sum_{n=1}^{+\infty}\frac1n.
\]

This is a positive constant multiple of the harmonic series, so the condensed series and therefore $\sum_{k=2}^{+\infty}1/(k\ln k)$ diverge.

## Recognition Signals

- Nonnegative terms suggest increasing partial sums and an upper-bound question.
- Terms grouped by powers of two suggest dyadic bounds or condensation.
- A rational expression in consecutive indices may telescope after partial fractions.
- Terms tending to a nonzero value trigger the necessary term test immediately.

## Common Mistakes

- Treating $a_n\to0$ as sufficient for convergence.
- Applying condensation without positivity and monotone decrease.
- Using a comparison in the wrong direction.
- Quoting a p-series table where an elementary proof is requested.
- Invoking the integral test when integration is outside the permitted toolkit.

## Interview Checks

Prove, without integration, that the harmonic series diverges, the reciprocal-square series converges, and the logarithmic-harmonic series diverges. State the hypotheses of every comparison or condensation step.
```

- [ ] **Step 4: Write Problem 013 with the exact triple**

Use the tested metadata. The prompt asks all three series in order. The solution:

1. proves harmonic divergence by dyadic grouping;
2. treats reciprocal-square partial sums as increasing and bounds them using `1/k^2 <= 1/[k(k-1)]`, `k>=2`, with the telescoping difference;
3. verifies `1/(k ln k)` is positive and decreasing for `k>=2`, then condenses to `1/(n ln 2)` and compares with the harmonic series.

Do not replace this triple with a generic `p`-series table and do not use an integral or undeclared integration prerequisite.

Use this complete body after the tested frontmatter:

```markdown
## Problem

Classify each series as convergent or divergent, using elementary arguments without integration:

\[
\sum_{k=1}^{+\infty}\frac1k,
\qquad
\sum_{k=1}^{+\infty}\frac1{k^2},
\qquad
\sum_{k=2}^{+\infty}\frac1{k\ln k}.
\]

Give a proof for every classification.

## Think Before Revealing

The three series need three related but distinct tools: lower bounds on dyadic blocks, an upper telescoping comparison, and condensation after a monotonicity check.

<details>
<summary>Hint 1</summary>

Group harmonic terms between consecutive powers of two. For the reciprocal square, compare $1/k^2$ with $1/[k(k-1)]$.

</details>

<details>
<summary>Hint 2</summary>

For $a_k=1/(k\ln k)$, verify positivity and decrease for $k\ge2$. Cauchy condensation produces $2^n a_{2^n}=1/(n\ln2)$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Harmonic series: dyadic lower blocks

For $m\ge0$, the block $2^m<k\le2^{m+1}$ has $2^m$ terms. Each term is at least $1/2^{m+1}$, so

\[
\sum_{k=2^m+1}^{2^{m+1}}\frac1k
\ge2^m\frac1{2^{m+1}}=\frac12.
\]

There are infinitely many disjoint blocks, each contributing at least $1/2$. Hence the partial sums are unbounded, and

\[
\boxed{\sum_{k=1}^{+\infty}\frac1k\text{ diverges}}.
\]

### Reciprocal-square series: telescoping upper bound

For $k\ge2$,

\[
\frac1{k^2}\le\frac1{k(k-1)}
=\frac1{k-1}-\frac1k.
\]

Therefore, for $N\ge2$,

\[
\sum_{k=2}^{N}\frac1{k^2}
\le\sum_{k=2}^{N}\left(\frac1{k-1}-\frac1k\right)
=1-\frac1N.
\]

The reciprocal-square partial sums are increasing because the terms are positive, and they are bounded above by $2$ after including the $k=1$ term. Bounded increasing partial sums converge, so

\[
\boxed{\sum_{k=1}^{+\infty}\frac1{k^2}\text{ converges}}.
\]

### Logarithmic-harmonic series: condensation

Let

\[
a_k=\frac1{k\ln k},\qquad k\ge2.
\]

The sequence is positive. Also, both $k$ and $\ln k$ are positive and increasing for $k\ge2$, so their product $k\ln k$ is increasing; hence $a_k$ is decreasing. The hypotheses of Cauchy condensation are satisfied.

The condensed terms are

\[
2^n a_{2^n}
=\frac{2^n}{2^n\ln(2^n)}
=\frac1{n\ln2}.
\]

Thus the exact comparison chain is

\[
\sum_{n=1}^{+\infty}2^n a_{2^n}
=\frac1{\ln2}\sum_{n=1}^{+\infty}\frac1n.
\]

The condensed series is a positive constant multiple of the harmonic series, namely $1/\ln2$ times it, so it diverges. Cauchy condensation therefore gives

\[
\boxed{\sum_{k=2}^{+\infty}\frac1{k\ln k}\text{ diverges}}.
\]

## Why This Matters

The triple distinguishes a necessary term check from real convergence arguments and demonstrates how lower bounds prove divergence while upper bounds prove convergence.

## Common Mistakes

- Saying the harmonic series converges because its terms tend to zero.
- Reversing the reciprocal-square comparison.
- Applying condensation before verifying that $a_k$ is positive and decreasing.
- Forgetting that $1/(n\ln2)$ is a constant multiple of the harmonic sequence.
- Using an integral or integral test despite the method restriction.

## Extensions

Use dyadic blocks to classify $\sum 1/k^p$ for all real $p$, and compare $1/[k(\ln k)^q]$ under repeated logarithmic refinements.

</details>
```

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

const progressiveHintContracts = new Map([
  ['differentiate-variable-base-and-exponent', {
    hint1: /positivity.*logarithm.*hypotheses.*u.*v/is,
    hint2: /y'\s*\/\s*y.*multiply.*original.*u\^v/is,
  }],
  ['compare-e-pi-power-expressions', {
    hint1: /f\(x\)=\$?\\ln x\/?x.*derivative.*sign.*constant/is,
    hint2: /f'.*1-\\ln x.*decreasing interval.*compare/is,
  }],
  ['exponential-midpoint-convexity', {
    hint1: /f\(x\)=e\^x.*second derivative/is,
    hint2: /strict convexity.*midpoint.*equality/is,
  }],
  ['normal-cdf-inflection-point', {
    hint1: /fundamental theorem.*density.*differentiate/is,
    hint2: /every factor.*except.*x-\\mu.*positive.*sign table/is,
  }],
  ['exponential-over-polynomial-limit', {
    hint1: /positive tail.*differentiability.*2x.*never vanishes/is,
    hint2: /first application.*e\^x.*2x.*renew.*constant.*2/is,
  }],
  ['logarithm-power-limit-at-zero', {
    hint1: /quotient.*x\^\{-2\}.*0\^\+/is,
    hint2: /differentiate numerator and denominator.*-x\^2\/?2/is,
  }],
  ['rotating-lighthouse-beam-related-rate', {
    hint1: /s=a\\tan\\theta.*depend on time/is,
    hint2: /differentiate.*sec\^2.*2\\pi.*1\+s\^2\/?a\^2/is,
  }],
  ['radical-difference-limit-at-infinity', {
    hint1: /conjugate.*sqrt\{x\^2\+5x\}\+x/is,
    hint2: /numerator.*5x.*divide.*positive.*x/is,
  }],
  ['derive-exponential-cosine-derivative-from-definition', {
    hint1: /Delta_h.*cos\(x\+h\)-\\cos x.*rewrite/is,
    hint2: /angle addition.*Delta_h\/?h.*-\\sin x.*exponential/is,
  }],
  ['periodic-continued-fraction-limit', {
    hint1: /maps.*\[2,3\].*c_0<c_2.*two applications/is,
    hint2: /subsequence limits.*a.*b.*subtract.*before solving/is,
  }],
  ['nested-radical-limit', {
    hint1: /monotonicity.*a_2>a_1.*strictly increasing/is,
    hint2: /a_n<2.*induction.*sqrt\{2\+a_n\}<\\sqrt4/is,
  }],
  ['infinite-power-tower-limit', {
    hint1: /2=x\^2.*positive root.*t_0=\\sqrt2/is,
    hint2: /t_n.*increasing.*separately.*t_n<2/is,
  }],
  ['classify-basic-positive-series', {
    hint1: /powers of two.*reciprocal square.*1\/\[k\(k-1\)\]/is,
    hint2: /positivity and decrease.*condensation.*1\/\(n\\ln2\)/is,
  }],
]);

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
    const hint1 = disclosureBody(page.text, 'Hint 1');
    const hint2 = disclosureBody(page.text, 'Hint 2');
    const contract = progressiveHintContracts.get(slug);
    assert.ok(contract, `${slug} missing problem-specific progressive-hint contract`);
    assert.match(hint1, contract.hint1, `${slug} Hint 1 must identify its problem-specific opening move`);
    assert.match(hint2, contract.hint2, `${slug} Hint 2 must expose a later intermediate step`);
    assert.notEqual(normalizedMath(hint1), normalizedMath(hint2), `${slug} hints must remain distinct`);
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

- [ ] **Step 7: Freeze the candidate SHA and verify its complete diff allowlist**

Run from the clean candidate checkout. The two approved planning documents are part of the exact diff; nothing is conditionally ignored:

```bash
test -z "$(git status --short)"
candidate_ref='chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23'
candidate_sha="$(git rev-parse 'HEAD^{commit}')"
[[ "$candidate_sha" =~ ^[0-9a-f]{40}$ ]]
test "$(git branch --show-current)" = "$candidate_ref"

expected_candidate_files=(
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
  tests/quant-interview-limits-derivatives-content.test.mjs
)
diff -u \
  <(printf '%s\n' "${expected_candidate_files[@]}" | sort) \
  <(git diff --name-only "f41880f220991f43d84ddb3795a59b8688e5230c..$candidate_sha" | sort)
git diff --check "f41880f220991f43d84ddb3795a59b8688e5230c..$candidate_sha"
```

Expected: the frozen `candidate_sha` is exactly 40 lowercase hexadecimal characters, the allowlist comparison is empty, and the whitespace check passes. In particular, there is no pre-existing public page, shared JSON, HANDOFF, global/governance/completion test, taxonomy, manifest, or workflow delta.

- [ ] **Step 8: Push without rewriting history and verify that exact candidate SHA authoritatively**

Push normally, reacquire the remote tip, and require it to equal the frozen reviewed SHA before creating evidence. The checkout must be native Linux or WSL-native, never a Windows-mounted `/mnt/*` path:

```bash
candidate_ref='chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23'
candidate_sha="$(git rev-parse 'HEAD^{commit}')"
[[ "$candidate_sha" =~ ^[0-9a-f]{40}$ ]]
test -z "$(git status --short)"
git push -u origin "$candidate_ref"
remote_candidate_sha="$(git ls-remote --exit-code origin "refs/heads/$candidate_ref" | awk 'NF == 2 { print $1 }')"
test "$remote_candidate_sha" = "$candidate_sha"

candidate_verify_root="$(mktemp -d)"
git clone "$(git remote get-url origin)" "$candidate_verify_root/repo"
git -C "$candidate_verify_root/repo" config core.autocrlf false
git -C "$candidate_verify_root/repo" fetch origin "refs/heads/$candidate_ref:refs/remotes/origin/$candidate_ref"
reviewed_remote_tip="$(git -C "$candidate_verify_root/repo" rev-parse "origin/$candidate_ref^{commit}")"
test "$reviewed_remote_tip" = "$candidate_sha"
git -C "$candidate_verify_root/repo" checkout --detach "$candidate_sha"
cd "$candidate_verify_root/repo"
test "$(git rev-parse HEAD)" = "$candidate_sha"
case "$(pwd -P)" in (/mnt|/mnt/*) echo 'authoritative checkout must not be under /mnt' >&2; exit 1;; esac
test "$(uname -s)" = Linux
node --version | grep -Eq '^v24\.'
node --input-type=module <<'NODE'
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
const files = execFileSync('git', ['ls-files', '-z']).toString('utf8').split('\0').filter(Boolean);
const offenders = [];
for (const file of files) {
  if (!statSync(file, { throwIfNoEntry: false })?.isFile()) continue;
  const bytes = readFileSync(file);
  if (!bytes.includes(0) && bytes.includes(Buffer.from('\r\n'))) offenders.push(file);
}
if (offenders.length) throw new Error(`tracked text contains CRLF:\n${offenders.join('\n')}`);
NODE

base_parent="$(mktemp -d)"
base_tree="$base_parent/base"
git worktree add --detach "$base_tree" f41880f220991f43d84ddb3795a59b8688e5230c
QI_BASE_ROOT="$base_tree" QI_CANDIDATE_ROOT="$(pwd -P)" node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const expectedProblemDelta = [
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
const expectedKnowledgeDelta = [
  'bounded-monotone-convergence-and-fixed-points',
  'derivative-definition-and-core-rules',
  'indeterminate-limits-and-growth-rates',
  'logarithmic-differentiation',
  'monotonicity-convexity-critical-points-and-inflection',
  'positive-series-convergence',
  'related-rates-and-implicit-differentiation',
].sort();
function topics(text) {
  const match = text.match(/^quantInterviewTopics:\s*\[([^\]]*)\]$/m);
  return match ? match[1].split(',').map((item) => item.trim()).filter(Boolean) : [];
}
async function classified(root, kind) {
  const contentRoot = path.join(root, 'src', 'content', kind);
  const files = await readdir(contentRoot, { recursive: true });
  const slugs = [];
  for (const file of files.filter((entry) => String(entry).endsWith('.md'))) {
    const text = await readFile(path.join(contentRoot, String(file)), 'utf8');
    if (topics(text).length) slugs.push(path.basename(String(file), '.md'));
  }
  assert.equal(new Set(slugs).size, slugs.length, `${kind} has duplicate classified slugs`);
  return slugs.sort();
}
const baseProblems = await classified(process.env.QI_BASE_ROOT, 'problems');
const baseKnowledge = await classified(process.env.QI_BASE_ROOT, 'knowledge');
const candidateProblems = await classified(process.env.QI_CANDIDATE_ROOT, 'problems');
const candidateKnowledge = await classified(process.env.QI_CANDIDATE_ROOT, 'knowledge');
assert.equal(baseProblems.length, 59);
assert.equal(baseKnowledge.length, 39);
assert.equal(candidateProblems.length, 72);
assert.equal(candidateKnowledge.length, 46);
assert.deepEqual(candidateProblems.filter((slug) => !baseProblems.includes(slug)), expectedProblemDelta);
assert.deepEqual(candidateKnowledge.filter((slug) => !baseKnowledge.includes(slug)), expectedKnowledgeDelta);
assert.deepEqual(baseProblems.filter((slug) => !candidateProblems.includes(slug)), []);
assert.deepEqual(baseKnowledge.filter((slug) => !candidateKnowledge.includes(slug)), []);
console.log(JSON.stringify({
  base: { Problems: baseProblems.length, Knowledge: baseKnowledge.length },
  candidate: { Problems: candidateProblems.length, Knowledge: candidateKnowledge.length },
  delta: { Problems: expectedProblemDelta, Knowledge: expectedKnowledgeDelta },
}, null, 2));
NODE

npm ci
node --test tests/quant-interview-limits-derivatives-content.test.mjs
candidate_full_suite_log="$(mktemp)"
set +e
npm run test 2>&1 | tee "$candidate_full_suite_log"
full_suite_status=${PIPESTATUS[0]}
set -e
test "$full_suite_status" -eq 1
QI_CANDIDATE_FULL_SUITE_LOG="$candidate_full_suite_log" node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const output = readFileSync(process.env.QI_CANDIDATE_FULL_SUITE_LOG, 'utf8').replace(/\r/g, '');
const failures = [...output.matchAll(/^\s*not ok \d+ - (.+)$/gm)].map((match) => match[1].trim());
assert.deepEqual(failures, [
  'source-neutral regression discovers exactly the current 59 Problem and 39 Knowledge contracts',
]);
assert.match(output, /^# fail 1$/m);
assert.match(output, /(?:actual[^\n]*72|72[^\n]*actual)/i);
assert.match(output, /(?:expected[^\n]*59|59[^\n]*expected)/i);
NODE
npm run check
npm run build
test "$(git rev-parse HEAD)" = "$candidate_sha"
test "$reviewed_remote_tip" = "$candidate_sha"
```

Expected authoritative evidence is mechanically established: frozen-base discovery is `59/39`, candidate discovery is `72/46`, the exact additions are the 13 approved Problem slugs and seven approved Knowledge slugs, the module test/check/build pass, and the only full-suite failure is the single named stale registry subtest. Any second `not ok`, any different exit status, any non-count/set failure, or any remote-tip mismatch blocks intake.

- [ ] **Step 9: Reacquire the immutable facts and send the untracked candidate report**

The report is a task message, not a repository file. Immediately before sending it, reacquire and validate both identifiers rather than relying on shell state retained from Step 8:

```bash
candidate_ref='chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23'
candidate_sha="$(git rev-parse 'HEAD^{commit}')"
reviewed_remote_tip="$(git ls-remote --exit-code origin "refs/heads/$candidate_ref" | awk 'NF == 2 { print $1 }')"
frozen_base_environment="${QI012_FROZEN_BASE_ENVIRONMENT:?export the literal environment enum printed by Task 1 Step 1}"
frozen_base_node_version="${QI012_FROZEN_BASE_NODE_VERSION:?export the exact Node version printed by Task 1 Step 1}"
[[ "$candidate_sha" =~ ^[0-9a-f]{40}$ ]]
test "$reviewed_remote_tip" = "$candidate_sha"
case "$frozen_base_environment" in
  linux-native-lf-node24|wsl-native-lf-node24) ;;
  *) exit 1 ;;
esac
[[ "$frozen_base_node_version" =~ ^v24\. ]]
candidate_node_version="$(node --version)"
[[ "$candidate_node_version" =~ ^v24\. ]]
case "$(pwd -P)" in (/mnt|/mnt/*) exit 1;; esac
cat <<EOF
frozen base: f41880f220991f43d84ddb3795a59b8688e5230c
frozen-base authoritative environment: $frozen_base_environment
frozen-base Node version: $frozen_base_node_version
frozen-base ordered test/check/build results: all success
candidate branch: $candidate_ref
candidate SHA: $candidate_sha
reviewed remote tip: $reviewed_remote_tip
candidate authoritative checkout: $(pwd -P)
candidate Node version: $candidate_node_version
candidate-owned file set: exact 7 Knowledge + 13 Problems + module test
module-content result: success
candidate discovery: 72 Problems / 46 Knowledge
candidate full-suite exception: only the stale source-neutral 59/39 exact count/set subtest
candidate check/build results: success
proposed coordinator map delta: red-book::6.2.2 and red-book::6.3.2 only
proposed terminal coverage: 20 rows = 12 canonical-problem + 6 merged-duplicate + 2 knowledge-only
proposed integrated registry: 76 Problems / 48 Knowledge after completed 011
candidate lifecycle: active; no completion claim and no CI/HANDOFF/shared-state mutation
EOF
```

Send the generated text verbatim. It contains the exact reviewed 40-hex SHA twice through equality of `candidate SHA` and `reviewed remote tip`; do not hand-edit either identifier and do not call the candidate complete.

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

Invoke `superpowers:using-git-worktrees` before creating the coordinator worktree. Set `QI012_REVIEWED_CANDIDATE_SHA` to the literal `candidate SHA` from the Task 10 report; the command fails if it is missing or malformed. Reacquire the current remote tip, require exact equality with that reported SHA, fetch both serialized refs, and create 012 only from the fetched durable ref:

```bash
durable_ref='chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17'
integration_ref='chatgpt/quant-interview-integration-limits-derivatives-2026-08-24'
candidate_ref='chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23'
candidate_sha="${QI012_REVIEWED_CANDIDATE_SHA:?export the exact candidate SHA from the reviewed Task 10 report}"
[[ "$candidate_sha" =~ ^[0-9a-f]{40}$ ]]
integration_worktree='../quant-interview-integration-limits-derivatives-012'
remote_candidate_sha="$(git ls-remote --exit-code origin "refs/heads/$candidate_ref" | awk 'NF == 2 { print $1 }')"
[[ "$remote_candidate_sha" =~ ^[0-9a-f]{40}$ ]]
test "$remote_candidate_sha" = "$candidate_sha"
git fetch origin \
  "refs/heads/${durable_ref}:refs/remotes/origin/${durable_ref}" \
  "refs/heads/${candidate_ref}:refs/remotes/origin/${candidate_ref}"
post_011_sha="$(git rev-parse "origin/${durable_ref}^{commit}")"
fetched_candidate_sha="$(git rev-parse "origin/${candidate_ref}^{commit}")"
test "$fetched_candidate_sha" = "$candidate_sha"
test "$(git cat-file -t "$candidate_sha")" = commit
git merge-base --is-ancestor f41880f220991f43d84ddb3795a59b8688e5230c "$post_011_sha"
git show "$post_011_sha:src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json" \
  | node --input-type=module -e "let s='';process.stdin.on('data',c=>s+=c).on('end',()=>{const w=JSON.parse(s);if(w.status!=='complete')process.exit(1)})"
git worktree add "$integration_worktree" -b "$integration_ref" "origin/$durable_ref"
cd "$integration_worktree"
test "$(git rev-parse HEAD)" = "$post_011_sha"
test -z "$(git status --short)"
```

Expected: the integration branch starts exactly at `post_011_sha`, the completed-011 manifest is present there, and both `remote_candidate_sha` and `fetched_candidate_sha` equal the exact reviewed 40-hex `candidate_sha`. No command rewrites either branch. If the local integration branch already exists, inspect and resume it only when it is an unmodified descendant of this same fetched durable SHA; never delete or overwrite another worker's branch.

- [ ] **Step 2: Prove the selected base is the factual completed 011 state**

Run read-only checks:

```bash
git status --short
node --input-type=module --eval "import {readFileSync} from 'node:fs'; const w=JSON.parse(readFileSync('src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json','utf8')); if(w.status!=='complete'||!/^[0-9a-f]{40}$/.test(w.verification?.commit??'')||!Number.isInteger(w.verification?.runId)||w.verification.runId<=0||w.verification?.conclusion!=='success') process.exit(1);"
rg -n "63 Problem|41 Knowledge|finite-state-markov-chains|markov-chain-state-compression|twelve-before-consecutive-sevens|coin-pattern-hitting-times|random-recoloring-consensus-time|random-walk-return-time-on-cube" tests/quant-interview-source-neutral-content.test.mjs docs/quant-interview/HANDOFF.md
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
function topics(text) {
  const match = text.match(/^quantInterviewTopics:\s*\[([^\]]*)\]$/m);
  return match ? match[1].split(',').map((item) => item.trim()).filter(Boolean) : [];
}
async function classified(root) {
  const files = await readdir(root, { recursive: true });
  const slugs = [];
  for (const file of files.filter((entry) => String(entry).endsWith('.md'))) {
    const text = await readFile(path.join(root, String(file)), 'utf8');
    if (topics(text).length) slugs.push(path.basename(String(file), '.md'));
  }
  assert.equal(new Set(slugs).size, slugs.length, `${root} contains duplicate classified slugs`);
  return slugs.sort();
}
const problems = await classified('src/content/problems');
const knowledge = await classified('src/content/knowledge');
assert.equal(problems.length, 63);
assert.equal(knowledge.length, 41);
for (const slug of [
  'twelve-before-consecutive-sevens',
  'coin-pattern-hitting-times',
  'random-recoloring-consensus-time',
  'random-walk-return-time-on-cube',
]) assert.ok(problems.includes(slug), `post-011 registry missing Problem ${slug}`);
for (const slug of ['finite-state-markov-chains', 'markov-chain-state-compression']) {
  assert.ok(knowledge.includes(slug), `post-011 registry missing Knowledge ${slug}`);
}
console.log(JSON.stringify({ Problems: problems.length, Knowledge: knowledge.length }));
NODE
```

Expected: clean status; 011 is complete with real-looking factual evidence; the exact registry includes these four 011 Problems and two 011 Knowledge nodes and asserts `63/41`; HANDOFF identifies Limits & Derivatives as current and does not yet call 012 complete.

- [ ] **Step 3: Re-run the post-011 base gates authoritatively**

Create an LF-normalized checkout detached at this exact base commit on a native-Linux or WSL-native filesystem, reject `/mnt/*`, and scan every tracked nonbinary file for CRLF before installing dependencies:

```bash
post_011_sha="$(git rev-parse 'HEAD^{commit}')"
[[ "$post_011_sha" =~ ^[0-9a-f]{40}$ ]]
integration_repo="$(git rev-parse --show-toplevel)"
base_verify_parent="$(mktemp -d)"
base_verify_repo="$base_verify_parent/repo"
git clone --no-hardlinks "$integration_repo" "$base_verify_repo"
git -C "$base_verify_repo" config core.autocrlf false
git -C "$base_verify_repo" checkout --detach "$post_011_sha"
cd "$base_verify_repo"
test "$(git rev-parse HEAD)" = "$post_011_sha"
case "$(pwd -P)" in (/mnt|/mnt/*) echo 'authoritative checkout must not be under /mnt' >&2; exit 1;; esac
test "$(uname -s)" = Linux
node --version | grep -Eq '^v24\.'
node --input-type=module <<'NODE'
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
const files = execFileSync('git', ['ls-files', '-z']).toString('utf8').split('\0').filter(Boolean);
const offenders = [];
for (const file of files) {
  if (!statSync(file, { throwIfNoEntry: false })?.isFile()) continue;
  const bytes = readFileSync(file);
  if (!bytes.includes(0) && bytes.includes(Buffer.from('\r\n'))) offenders.push(file);
}
if (offenders.length) throw new Error(`tracked text contains CRLF:\n${offenders.join('\n')}`);
NODE
npm ci
npm run test
npm run check
npm run build
cd "$integration_repo"
test "$(git rev-parse HEAD)" = "$post_011_sha"
test -z "$(git status --short)"
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

Reacquire the report SHA and current remote tip, then compare the complete candidate diff—including the two approved documents—against an exact allowlist:

```bash
candidate_ref='chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23'
candidate_sha="${QI012_REVIEWED_CANDIDATE_SHA:?export the exact candidate SHA from the reviewed Task 10 report}"
[[ "$candidate_sha" =~ ^[0-9a-f]{40}$ ]]
remote_candidate_sha="$(git ls-remote --exit-code origin "refs/heads/$candidate_ref" | awk 'NF == 2 { print $1 }')"
test "$remote_candidate_sha" = "$candidate_sha"
expected_candidate_files=(
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
  tests/quant-interview-limits-derivatives-content.test.mjs
)
diff -u \
  <(printf '%s\n' "${expected_candidate_files[@]}" | sort) \
  <(git diff --name-only "f41880f220991f43d84ddb3795a59b8688e5230c..$candidate_sha" | sort)
git diff --check "f41880f220991f43d84ddb3795a59b8688e5230c..$candidate_sha"
```

Expected: both comparisons pass against the exact reviewed SHA. Reject a candidate delta containing any pre-existing public page, shared JSON, global/governance/completion/HANDOFF test, HANDOFF, taxonomy, manifest, or workflow.

- [ ] **Step 5: Port exactly the approved documents and candidate implementation files**

Reacquire and validate the immutable SHA once more, then restore every file explicitly from that SHA. Never port from `candidate_ref`, `origin/$candidate_ref`, or any other movable name:

```bash
candidate_sha="${QI012_REVIEWED_CANDIDATE_SHA:?export the exact candidate SHA from the reviewed Task 10 report}"
[[ "$candidate_sha" =~ ^[0-9a-f]{40}$ ]]
test "$(git rev-parse "origin/chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23^{commit}")" = "$candidate_sha"
git restore --source="$candidate_sha" -- \
  docs/superpowers/specs/2026-08-24-quant-interview-limits-derivatives-design.md \
  docs/superpowers/plans/2026-08-24-quant-interview-limits-derivatives.md \
  src/content/knowledge/concepts/bounded-monotone-convergence-and-fixed-points.md \
  src/content/knowledge/concepts/derivative-definition-and-core-rules.md \
  src/content/knowledge/concepts/indeterminate-limits-and-growth-rates.md \
  src/content/knowledge/concepts/logarithmic-differentiation.md \
  src/content/knowledge/concepts/monotonicity-convexity-critical-points-and-inflection.md \
  src/content/knowledge/concepts/positive-series-convergence.md \
  src/content/knowledge/concepts/related-rates-and-implicit-differentiation.md \
  src/content/problems/calculus/classify-basic-positive-series.md \
  src/content/problems/calculus/compare-e-pi-power-expressions.md \
  src/content/problems/calculus/derive-exponential-cosine-derivative-from-definition.md \
  src/content/problems/calculus/differentiate-variable-base-and-exponent.md \
  src/content/problems/calculus/exponential-midpoint-convexity.md \
  src/content/problems/calculus/exponential-over-polynomial-limit.md \
  src/content/problems/calculus/infinite-power-tower-limit.md \
  src/content/problems/calculus/logarithm-power-limit-at-zero.md \
  src/content/problems/calculus/nested-radical-limit.md \
  src/content/problems/calculus/normal-cdf-inflection-point.md \
  src/content/problems/calculus/periodic-continued-fraction-limit.md \
  src/content/problems/calculus/radical-difference-limit-at-infinity.md \
  src/content/problems/calculus/rotating-lighthouse-beam-related-rate.md \
  tests/quant-interview-limits-derivatives-content.test.mjs
git status --short
git diff --stat
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
  const repairedKeys = new Set(['red-book::6.2.2', 'red-book::6.3.2']);
  const repairedIndexes = sourceTopicMap.entries.flatMap((entry, index) =>
    repairedKeys.has(`${entry.source}::${entry.sourceSection}`) ? [index] : []
  );
  assert.equal(sourceTopicMap.version, 1);
  assert.equal(sourceTopicMap.entries.length, 281);
  assert.deepEqual(repairedIndexes, [241, 244], 'the two repaired entries must retain their exact array positions');
  assert.deepEqual(repairedIndexes.map((index) => sourceTopicMap.entries[index]), [
    {
      source: 'red-book',
      sourceSection: '6.2.2',
      role: 'content',
      canonicalTopics: ['limits-derivatives', 'integration'],
    },
    {
      source: 'red-book',
      sourceSection: '6.3.2',
      role: 'content',
      canonicalTopics: ['limits-derivatives', 'integration'],
    },
  ]);
  assert.equal(
    createHash('sha256').update(JSON.stringify(sourceTopicMap)).digest('hex'),
    '0370edc39605e70f7aea12fe7c38cff717aee33bbbc0e3e23594c67519c9ce58',
    'entire final source-topic-map object, including version and entry order, must stay frozen after the two repairs',
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

Use `apply_patch` on `docs/quant-interview/HANDOFF.md` to change the exact reservation-012 row state from `design-audit` to `active`. Preserve the candidate branch cell, keep the current bounded topic exactly `Calculus & Differential Equations -> Limits & Derivatives`, keep 011 recorded complete, and make the serialized coordination sentence exactly `Completed queue entry: **011**. Remaining integration queue: **012 → 013**.` This exact active-phase sentence is the guarded input to Task 18. Add no 012 completion section, commit, run ID, `76/48` closure, or 013 advance.

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
active_sha="$(git rev-parse 'HEAD^{commit}')"
[[ "$active_sha" =~ ^[0-9a-f]{40}$ ]]
test -z "$(git status --short)"
```

Expected: all three repository gates pass with exact `76/48`; `git diff --check` emits no output; the commit contains only the six named lifecycle/HANDOFF/workflow files; status is clean; manifest 012 remains active without either completion field.

- [ ] **Step 9: Prove the exact active commit authoritatively on a native filesystem**

From native Linux or WSL, make the verification checkout itself under `/tmp` or `/home`, never `/mnt/c`. Clone from the local integration repository so the unpushed commit is available, then detach at the recorded SHA:

```bash
active_sha="$(git rev-parse 'HEAD^{commit}')"
[[ "$active_sha" =~ ^[0-9a-f]{40}$ ]]
test -z "$(git status --short)"
integration_repo="$(git rev-parse --show-toplevel)"
active_verify_root="$(mktemp -d)"
git clone --no-hardlinks "$integration_repo" "$active_verify_root/repo"
git -C "$active_verify_root/repo" config core.autocrlf false
git -C "$active_verify_root/repo" checkout --detach "$active_sha"
cd "$active_verify_root/repo"
test "$(git rev-parse HEAD)" = "$active_sha"
case "$(pwd -P)" in (/mnt|/mnt/*) echo 'authoritative checkout must not be under /mnt' >&2; exit 1;; esac
test "$(uname -s)" = Linux
node --version | grep -Eq '^v24\.'
node --input-type=module <<'NODE'
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
const files = execFileSync('git', ['ls-files', '-z']).toString('utf8').split('\0').filter(Boolean);
const offenders = [];
for (const file of files) {
  if (!statSync(file, { throwIfNoEntry: false })?.isFile()) continue;
  const bytes = readFileSync(file);
  if (!bytes.includes(0) && bytes.includes(Buffer.from('\r\n'))) offenders.push(file);
}
if (offenders.length) throw new Error(`tracked text contains CRLF:\n${offenders.join('\n')}`);
NODE
if grep -Eqi 'microsoft|wsl' /proc/sys/kernel/osrelease; then
  active_environment='wsl-native-lf-node24'
else
  active_environment='linux-native-lf-node24'
fi
printf 'active_sha=%s\nactive_environment=%s\n' "$active_sha" "$active_environment"
npm ci
npm run test
npm run check
npm run build
```

Expected: the native checkout is LF-clean and all ordered gates pass. Record exactly one factual environment string externally: `linux-native-lf-node24` for native Linux or `wsl-native-lf-node24` for a WSL-native checkout. Do not write manifest/HANDOFF evidence yet.

- [ ] **Step 10: Push without force and require real CI for the same active SHA**

Return to the integration checkout. Reacquire the commit and clean state, normally push it, and poll for at most five minutes for the exact workflow/name/head tuple to appear. `QI012_ACTIVE_ENVIRONMENT` is the literal enum printed by Step 9:

```bash
integration_ref='chatgpt/quant-interview-integration-limits-derivatives-2026-08-24'
workflow_file='quant-interview-limits-derivatives-012-temporary.yml'
workflow_name='Quant Interview Limits Derivatives 012 Temporary'
active_sha="$(git rev-parse 'HEAD^{commit}')"
active_environment="${QI012_ACTIVE_ENVIRONMENT:?export the literal environment enum printed by Task 17 Step 9}"
[[ "$active_sha" =~ ^[0-9a-f]{40}$ ]]
case "$active_environment" in
  linux-native-lf-node24|wsl-native-lf-node24) ;;
  *) exit 1 ;;
esac
test -z "$(git status --short)"
test -e ".github/workflows/$workflow_file"
git push -u origin "$integration_ref"
remote_active_sha="$(git ls-remote --exit-code origin "refs/heads/$integration_ref" | awk 'NF == 2 { print $1 }')"
test "$remote_active_sha" = "$active_sha"

run_id=''
for attempt in $(seq 1 30); do
  runs_json="$(gh run list \
    --workflow "$workflow_file" \
    --branch "$integration_ref" \
    --commit "$active_sha" \
    --limit 20 \
    --json databaseId,headSha,status,conclusion,workflowName)"
  set +e
  candidate_run_id="$(QI012_RUNS_JSON="$runs_json" \
    QI012_ACTIVE_SHA="$active_sha" \
    QI012_WORKFLOW_NAME="$workflow_name" \
    node --input-type=module <<'NODE'
const runs = JSON.parse(process.env.QI012_RUNS_JSON);
if (!Array.isArray(runs)) process.exit(1);
const matches = runs.filter((run) =>
  Number.isInteger(run.databaseId)
  && run.databaseId > 0
  && run.headSha === process.env.QI012_ACTIVE_SHA
  && run.workflowName === process.env.QI012_WORKFLOW_NAME
);
if (matches.length === 0) process.exit(2);
matches.sort((a, b) => b.databaseId - a.databaseId);
process.stdout.write(String(matches[0].databaseId));
NODE
  )"
  predicate_status=$?
  set -e
  if test "$predicate_status" -eq 0; then run_id="$candidate_run_id"; break; fi
  test "$predicate_status" -eq 2
  sleep 10
done
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]
```

Poll that exact run for at most ten minutes. The Node predicate fails explicitly on an empty/malformed response, wrong workflow, wrong run ID/head, a terminal failure, a skipped/failed command, or wrong command order; exit code 2 means only that the exact run remains queued or in progress:

```bash
ci_succeeded='false'
for attempt in $(seq 1 60); do
  evidence_json="$(gh run view "$run_id" --json databaseId,headSha,status,conclusion,workflowName,jobs)"
  set +e
  QI012_EVIDENCE_JSON="$evidence_json" \
  QI012_RUN_ID="$run_id" \
  QI012_ACTIVE_SHA="$active_sha" \
  QI012_WORKFLOW_NAME="$workflow_name" \
  node --input-type=module <<'NODE'
const evidence = JSON.parse(process.env.QI012_EVIDENCE_JSON);
const expectedRunId = Number(process.env.QI012_RUN_ID);
if (!Number.isInteger(expectedRunId) || expectedRunId <= 0) process.exit(1);
if (evidence.databaseId !== expectedRunId) process.exit(1);
if (evidence.headSha !== process.env.QI012_ACTIVE_SHA) process.exit(1);
if (evidence.workflowName !== process.env.QI012_WORKFLOW_NAME) process.exit(1);
if (evidence.status === 'queued' || evidence.status === 'in_progress' || evidence.status === 'waiting') process.exit(2);
if (evidence.status !== 'completed' || evidence.conclusion !== 'success') process.exit(1);
if (!Array.isArray(evidence.jobs) || evidence.jobs.length !== 1) process.exit(1);
const job = evidence.jobs[0];
if (job.status !== 'completed' || job.conclusion !== 'success') process.exit(1);
const wanted = ['npm ci', 'npm run test', 'npm run check', 'npm run build'];
const steps = (job.steps ?? []).map(({ name, status, conclusion }) => ({ name, status, conclusion }));
const positions = wanted.map((command) => steps.findIndex((step) => step.name === command || step.name.endsWith(command)));
if (positions.some((position) => position < 0)) process.exit(1);
if (positions.some((position, index) => index > 0 && position <= positions[index - 1])) process.exit(1);
for (const position of positions) {
  if (steps[position].status !== 'completed' || steps[position].conclusion !== 'success') process.exit(1);
}
NODE
  evidence_status=$?
  set -e
  if test "$evidence_status" -eq 0; then ci_succeeded='true'; break; fi
  test "$evidence_status" -eq 2
  sleep 10
done
test "$ci_succeeded" = true
printf 'active_sha=%s\nactive_environment=%s\nrun_id=%s\n' "$active_sha" "$active_environment" "$run_id"
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

- [ ] **Step 1: Reacquire every closure fact and prove the active tree has not drifted**

Start in the clean integration checkout. `QI012_ACTIVE_ENVIRONMENT` must be set to the literal enum printed by the authoritative Task 17 checkout; all other facts are reacquired from Git and GitHub. This block has no `gh --jq select(...)` success-on-empty path: both Node predicates exit nonzero on an empty or mismatched result.

```bash
integration_ref='chatgpt/quant-interview-integration-limits-derivatives-2026-08-24'
workflow_file='quant-interview-limits-derivatives-012-temporary.yml'
workflow_name='Quant Interview Limits Derivatives 012 Temporary'
active_sha="$(git rev-parse 'HEAD^{commit}')"
active_environment="${QI012_ACTIVE_ENVIRONMENT:?export the literal environment enum printed by Task 17 Step 9}"
[[ "$active_sha" =~ ^[0-9a-f]{40}$ ]]
case "$active_environment" in
  linux-native-lf-node24|wsl-native-lf-node24) ;;
  *) exit 1 ;;
esac
test "$(git branch --show-current)" = "$integration_ref"
test -z "$(git status --short)"
test -e ".github/workflows/$workflow_file"

git fetch origin "refs/heads/$integration_ref:refs/remotes/origin/$integration_ref"
remote_active_sha="$(git rev-parse "origin/$integration_ref^{commit}")"
test "$remote_active_sha" = "$active_sha"

runs_json="$(gh run list \
  --workflow "$workflow_file" \
  --branch "$integration_ref" \
  --commit "$active_sha" \
  --limit 20 \
  --json databaseId,headSha,status,conclusion,workflowName)"
run_id="$(QI012_RUNS_JSON="$runs_json" \
  QI012_ACTIVE_SHA="$active_sha" \
  QI012_WORKFLOW_NAME="$workflow_name" \
  node --input-type=module <<'NODE'
const runs = JSON.parse(process.env.QI012_RUNS_JSON);
if (!Array.isArray(runs) || runs.length === 0) process.exit(1);
const matches = runs.filter((run) =>
  Number.isInteger(run.databaseId)
  && run.databaseId > 0
  && run.headSha === process.env.QI012_ACTIVE_SHA
  && run.workflowName === process.env.QI012_WORKFLOW_NAME
  && run.status === 'completed'
  && run.conclusion === 'success'
);
if (matches.length === 0) process.exit(1);
matches.sort((a, b) => b.databaseId - a.databaseId);
process.stdout.write(String(matches[0].databaseId));
NODE
)"
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]

evidence_json="$(gh run view "$run_id" --json databaseId,headSha,status,conclusion,workflowName,jobs)"
QI012_EVIDENCE_JSON="$evidence_json" \
QI012_RUN_ID="$run_id" \
QI012_ACTIVE_SHA="$active_sha" \
QI012_WORKFLOW_NAME="$workflow_name" \
node --input-type=module <<'NODE'
const evidence = JSON.parse(process.env.QI012_EVIDENCE_JSON);
const runId = Number(process.env.QI012_RUN_ID);
if (!Number.isInteger(runId) || runId <= 0 || evidence.databaseId !== runId) process.exit(1);
if (evidence.headSha !== process.env.QI012_ACTIVE_SHA) process.exit(1);
if (evidence.workflowName !== process.env.QI012_WORKFLOW_NAME) process.exit(1);
if (evidence.status !== 'completed' || evidence.conclusion !== 'success') process.exit(1);
if (!Array.isArray(evidence.jobs) || evidence.jobs.length !== 1) process.exit(1);
const job = evidence.jobs[0];
if (job.status !== 'completed' || job.conclusion !== 'success') process.exit(1);
const wanted = ['npm ci', 'npm run test', 'npm run check', 'npm run build'];
const steps = (job.steps ?? []).map(({ name, status, conclusion }) => ({ name, status, conclusion }));
const positions = wanted.map((command) => steps.findIndex((step) => step.name === command || step.name.endsWith(command)));
if (positions.some((position) => position < 0)) process.exit(1);
if (positions.some((position, index) => index > 0 && position <= positions[index - 1])) process.exit(1);
for (const position of positions) {
  if (steps[position].status !== 'completed' || steps[position].conclusion !== 'success') process.exit(1);
}
NODE

QI012_ACTIVE_SHA="$active_sha" node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const manifest = JSON.parse(readFileSync('src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json', 'utf8'));
assert.equal(manifest.status, 'active');
assert.equal(Object.hasOwn(manifest, 'preClosureActiveGate'), false);
assert.equal(Object.hasOwn(manifest, 'verification'), false);
assert.match(process.env.QI012_ACTIVE_SHA, /^[0-9a-f]{40}$/);
NODE
printf 'active_sha=%s\nactive_environment=%s\nrun_id=%s\n' "$active_sha" "$active_environment" "$run_id"
```

Expected: all predicates pass, the workflow still exists, and the manifest is still active without closure fields. Those last two facts are the expected pre-closure RED state; if the workflow is already absent or the manifest already complete, stop instead of reconstructing evidence.

- [ ] **Step 2: Remove CI scaffolding before changing status**

```bash
active_sha="$(git rev-parse 'HEAD^{commit}')"
[[ "$active_sha" =~ ^[0-9a-f]{40}$ ]]
test -z "$(git status --short)"
git rm -- .github/workflows/quant-interview-limits-derivatives-012-temporary.yml
test ! -e .github/workflows/quant-interview-limits-derivatives-012-temporary.yml
git diff --name-status "$active_sha"
```

Expected: the workflow deletion is staged while the manifest remains `active`, HANDOFF still points to 012, and no completion test or factual state has changed. Do not create another workflow or commit cleanup separately.

- [ ] **Step 3: Perform one deterministic literal-fact closure update**

Export the literal `run_id` printed by Step 1 as `QI012_SUCCESSFUL_RUN_ID`; `QI012_ACTIVE_ENVIRONMENT` remains the literal enum from Task 17. This block independently reacquires HEAD and revalidates the exact GitHub run before writing. All local names are defined and validated before use. It reads the active manifest, writes deterministic JSON with literal values, installs literal constants and the complete guarded assertions in the completion test, writes the complete bounded HANDOFF section, advances only the 012 row/current topic/queue, rereads every output, and rejects unresolved tokens.

```bash
active_sha="$(git rev-parse 'HEAD^{commit}')"
active_environment="${QI012_ACTIVE_ENVIRONMENT:?export the literal environment enum printed by Task 17 Step 9}"
run_id="${QI012_SUCCESSFUL_RUN_ID:?export the literal positive run ID printed by Task 18 Step 1}"
[[ "$active_sha" =~ ^[0-9a-f]{40}$ ]]
case "$active_environment" in
  linux-native-lf-node24|wsl-native-lf-node24) ;;
  *) exit 1 ;;
esac
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]
test ! -e .github/workflows/quant-interview-limits-derivatives-012-temporary.yml
evidence_json="$(gh run view "$run_id" --json databaseId,headSha,status,conclusion,workflowName,jobs)"
QI012_EVIDENCE_JSON="$evidence_json" QI012_ACTIVE_SHA="$active_sha" QI012_RUN_ID="$run_id" node --input-type=module <<'NODE'
const evidence = JSON.parse(process.env.QI012_EVIDENCE_JSON);
if (evidence.databaseId !== Number(process.env.QI012_RUN_ID)) process.exit(1);
if (evidence.headSha !== process.env.QI012_ACTIVE_SHA) process.exit(1);
if (evidence.workflowName !== 'Quant Interview Limits Derivatives 012 Temporary') process.exit(1);
if (evidence.status !== 'completed' || evidence.conclusion !== 'success') process.exit(1);
if (!Array.isArray(evidence.jobs) || evidence.jobs.length !== 1) process.exit(1);
const job = evidence.jobs[0];
if (job.status !== 'completed' || job.conclusion !== 'success') process.exit(1);
const wanted = ['npm ci', 'npm run test', 'npm run check', 'npm run build'];
const steps = (job.steps ?? []).map(({ name, status, conclusion }) => ({ name, status, conclusion }));
const positions = wanted.map((command) => steps.findIndex((step) => step.name === command || step.name.endsWith(command)));
if (positions.some((position) => position < 0)) process.exit(1);
if (positions.some((position, index) => index > 0 && position <= positions[index - 1])) process.exit(1);
for (const position of positions) {
  if (steps[position].status !== 'completed' || steps[position].conclusion !== 'success') process.exit(1);
}
NODE
QI012_ACTIVE_SHA="$active_sha" \
QI012_ACTIVE_ENVIRONMENT="$active_environment" \
QI012_SUCCESSFUL_RUN_ID="$run_id" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { accessSync, readFileSync, writeFileSync } from 'node:fs';

const activeSha = process.env.QI012_ACTIVE_SHA;
const activeEnvironment = process.env.QI012_ACTIVE_ENVIRONMENT;
const successfulRunId = Number(process.env.QI012_SUCCESSFUL_RUN_ID);
assert.match(activeSha, /^[0-9a-f]{40}$/);
assert.match(activeEnvironment, /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/);
assert.ok(Number.isInteger(successfulRunId) && successfulRunId > 0);

const commands = ['npm run test', 'npm run check', 'npm run build'];
const manifestPath = 'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json';
const completionPath = 'tests/quant-interview-limits-derivatives-completion.test.mjs';
const handoffPath = 'docs/quant-interview/HANDOFF.md';
const workflowPath = '.github/workflows/quant-interview-limits-derivatives-012-temporary.yml';
assert.throws(() => accessSync(workflowPath));

function replaceExactlyOnce(text, needle, replacement, label) {
  assert.equal(text.split(needle).length - 1, 1, `${label} must match exactly once`);
  return text.replace(needle, replacement);
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
assert.equal(manifest.id, 'calculus-differential-equations-limits-derivatives-012');
assert.deepEqual(manifest.canonicalTopics, ['calculus-differential-equations', 'limits-derivatives']);
assert.equal(manifest.status, 'active');
assert.equal(Object.hasOwn(manifest, 'preClosureActiveGate'), false);
assert.equal(Object.hasOwn(manifest, 'verification'), false);
assert.equal(manifest.sourceScopes.length, 3);
const completedManifest = {
  ...manifest,
  status: 'complete',
  preClosureActiveGate: {
    commit: activeSha,
    environment: activeEnvironment,
    commands,
    conclusion: 'success',
  },
  verification: {
    commit: activeSha,
    runId: successfulRunId,
    commands,
    conclusion: 'success',
  },
};
writeFileSync(manifestPath, `${JSON.stringify(completedManifest, null, 2)}\n`, 'utf8');

let completion = readFileSync(completionPath, 'utf8').replace(/\r\n/g, '\n');
const commandsLine = "const commands = ['npm run test', 'npm run check', 'npm run build'];\n";
const literalConstants = [
  `const expectedActiveCommit = ${JSON.stringify(activeSha)};`,
  `const expectedRunId = ${successfulRunId};`,
  `const expectedEnvironment = ${JSON.stringify(activeEnvironment)};`,
].join('\n') + '\n';
completion = replaceExactlyOnce(
  completion,
  commandsLine,
  commandsLine + literalConstants,
  'completion-test commands declaration',
);
completion = replaceExactlyOnce(
  completion,
  "test('012 completion contract is phase-safe and serialized after completed 011', async () => {",
  "test('012 completion contract is phase-safe and pins factual active-gate evidence', async () => {",
  'completion-test title',
);
const completeAssertions = String.raw`  assert.equal(workstream.status, 'complete');
  assert.deepEqual(workstream.preClosureActiveGate, {
    commit: expectedActiveCommit,
    environment: expectedEnvironment,
    commands,
    conclusion: 'success',
  });
  assert.deepEqual(workstream.verification, {
    commit: expectedActiveCommit,
    runId: expectedRunId,
    commands,
    conclusion: 'success',
  });
  assert.equal(workstream.verification.commit, workstream.preClosureActiveGate.commit);
  assert.match(workstream.preClosureActiveGate.commit, /^[0-9a-f]{40}$/);
  assert.match(workstream.preClosureActiveGate.environment, /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/);
  assert.ok(Number.isInteger(workstream.verification.runId) && workstream.verification.runId > 0);

  const closure = handoffSection(handoff, 'Completed cross-book workstream 12');
  assert.match(closure, new RegExp(expectedActiveCommit));
  assert.match(closure, new RegExp(String(expectedRunId)));
  assert.match(closure, new RegExp(expectedEnvironment));
  assert.match(closure, new RegExp('head_sha[^\\n]*' + expectedActiveCommit, 'i'));
  assert.match(closure, /Ubuntu[^\n]*Node 24|Node 24[^\n]*Ubuntu/i);
  const commandPositions = commands.map((command) => closure.indexOf(command));
  assert.ok(commandPositions.every((position) => position >= 0));
  assert.ok(commandPositions.every((position, index) => index === 0 || position > commandPositions[index - 1]));
  assert.match(closure, /conclusion[^\n]*success/i);
  assert.match(closure, /76[^\n]*canonical Problems[^\n]*48[^\n]*explicitly topic-classified Knowledge/i);
  assert.match(closure, /20[^\n]*12[^\n]*canonical-problem[^\n]*6[^\n]*merged-duplicate[^\n]*2[^\n]*knowledge-only/i);
  assert.match(closure, /Green[^\n]*4[^\n]*Red[^\n]*10[^\n]*150[^\n]*6/i);
  assert.match(closure, /red-book::6\.2\.2[^\n]*limits-derivatives[^\n]*integration/i);
  assert.match(closure, /red-book::6\.3\.2[^\n]*limits-derivatives[^\n]*integration/i);
  assert.match(current, /Interview Strategy & Communication/i);
  assert.match(current, /Reasoning & Communication/i);
  assert.doesNotMatch(current, /Limits & Derivatives/i);
  assert.match(reservation012, /\|\s*complete\s*\|/i);
  assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012/i);
  assert.match(coordination, /remaining integration queue[^\n]*013/i);
  assert.doesNotMatch(coordination, /remaining integration queue[^\n]*012/i);
  await assert.rejects(access(workstream013Path));`;
completion = replaceExactlyOnce(
  completion,
  "  assert.fail('complete 012 must be sealed by the factual-constants branch in Task 18');",
  completeAssertions,
  'completion-test guarded complete branch',
);
writeFileSync(completionPath, completion, 'utf8');

const knowledgeSlugs = [
  'derivative-definition-and-core-rules',
  'logarithmic-differentiation',
  'monotonicity-convexity-critical-points-and-inflection',
  'indeterminate-limits-and-growth-rates',
  'related-rates-and-implicit-differentiation',
  'bounded-monotone-convergence-and-fixed-points',
  'positive-series-convergence',
];
const problemSlugs = [
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
];
const completedSection = `## Completed cross-book workstream 12

\`calculus-differential-equations-limits-derivatives-012\`

Scope: **Calculus & Differential Equations → Limits & Derivatives**.

Active integrated verification:

- CI-tested pre-closure active commit: \`${activeSha}\`
- GitHub Actions run: \`${successfulRunId}\`; its \`head_sha\` is \`${activeSha}\`
- authoritative local environment: \`${activeEnvironment}\`
- CI environment: Ubuntu with Node 24; CI ran \`npm ci\` first
- ordered gates: \`npm run test\`, \`npm run check\`, \`npm run build\`
- conclusion: success

This evidence belongs to the active integrated commit above, not to the later workflow-free closure commit. The active SHA is identical in \`preClosureActiveGate.commit\`, \`verification.commit\`, and the CI \`head_sha\`.

### Canonical Knowledge

${knowledgeSlugs.map((slug) => `- \`${slug}\``).join('\n')}

### Canonical Problems

${problemSlugs.map((slug) => `- \`${slug}\``).join('\n')}

### Exact registry, coverage, and mapping decisions

- Source-neutral corpus checkpoint: **76 canonical Problems / 48 explicitly topic-classified Knowledge / Technique nodes**.
- Terminal coverage: **20 rows = 12 canonical-problem / 6 merged-duplicate / 2 knowledge-only**.
- Source distribution: **Green 4 / Red 10 / 150 6**.
- Green \`3.1.3::\` is one terminal row with two canonical Problem targets; Red Q6.9 and Q6.10 retain their complete pre-012 ownership.
- Exact source-map repairs: \`red-book::6.2.2 -> [limits-derivatives, integration]\` and \`red-book::6.3.2 -> [limits-derivatives, integration]\`.
- There is no other source-map delta and no taxonomy delta.

### Bounded source scope and closure boundary

- Green Book sections \`3.1\`, \`3.1.1\`, \`3.1.2\`, and \`3.1.3\`, evidence pages 49–52.
- Red Book sections \`6.1\`, \`6.2.1\`, \`6.2.2\`, \`6.3.1\`, \`6.3.2\`, \`10\`, and \`10.2\`, evidence pages 201–229 and 317–318.
- 150 Most Frequently Asked sections \`1\`, \`2.1\`, and \`3.1\`, evidence pages 11–12, 27–28, and 50–65.

This closes only registered workstream 012. It does not claim completeness for calculus, for any of Green/Red/150 as a whole, for any broad source section, or for material outside the registered page and section scopes.
`;

let handoff = readFileSync(handoffPath, 'utf8').replace(/\r\n/g, '\n');
assert.doesNotMatch(handoff, /^## Completed cross-book workstream 12$/m);
handoff = replaceExactlyOnce(
  handoff,
  '\n## Next action\n',
  `\n${completedSection}\n## Next action\n`,
  'HANDOFF Next action insertion point',
);
const activeCurrent = handoff.match(/Current bounded topic:\n[\s\S]*?(?=\n## Parallel workstream coordination\n)/)?.[0];
assert.ok(activeCurrent, 'HANDOFF active current-topic block missing');
const completedCurrent = `Current bounded topic:

**Interview Strategy & Communication → Reasoning & Communication.**

Workstream 012 is factually closed. Workstream 013 is now the sole remaining serialized reservation; it remains in design-audit until its own coordinator integration and must not inherit a completion claim or manifest from 012.

Do not reopen Limits & Derivatives during 013. Preserve source-neutral public identity, item-level hidden coverage, protected-main safety, and the exact serialized order.`;
handoff = replaceExactlyOnce(handoff, activeCurrent, completedCurrent, 'HANDOFF current-topic block');
const historicalMarker = 'Historical transition marker: **Limits & Derivatives** is fully closed. Its seven Knowledge nodes, thirteen S3+ Problems, exact 76/48 registry, twenty terminal rows, two bounded Red map repairs, and factual active-commit CI evidence are durable repository state. This paragraph records lineage only and does not authorize reopening the bounded topic during workstream 013.';
handoff = replaceExactlyOnce(
  handoff,
  '\nCurrent bounded topic:\n',
  `\n${historicalMarker}\n\nCurrent bounded topic:\n`,
  'HANDOFF 012 historical transition marker',
);
handoff = replaceExactlyOnce(
  handoff,
  '| 2 | 012 | `limits-derivatives` | `chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23` | active |',
  '| 2 | 012 | `limits-derivatives` | `chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23` | complete |',
  'HANDOFF reservation 012 state',
);
handoff = replaceExactlyOnce(
  handoff,
  'Completed queue entry: **011**. Remaining integration queue: **012 → 013**.',
  'Completed queue entries: **011, 012**. Remaining integration queue: **013**.',
  'HANDOFF serialized queue',
);
writeFileSync(handoffPath, handoff, 'utf8');

const rereadManifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
assert.deepEqual(rereadManifest, completedManifest);
assert.deepEqual(rereadManifest.preClosureActiveGate, {
  commit: activeSha,
  environment: activeEnvironment,
  commands,
  conclusion: 'success',
});
assert.deepEqual(rereadManifest.verification, {
  commit: activeSha,
  runId: successfulRunId,
  commands,
  conclusion: 'success',
});
const rereadCompletion = readFileSync(completionPath, 'utf8');
assert.ok(rereadCompletion.includes(`const expectedActiveCommit = ${JSON.stringify(activeSha)};`));
assert.ok(rereadCompletion.includes(`const expectedRunId = ${successfulRunId};`));
assert.ok(rereadCompletion.includes(`const expectedEnvironment = ${JSON.stringify(activeEnvironment)};`));
assert.doesNotMatch(rereadCompletion, /factual-constants branch|assert\.fail\(/);
const rereadHandoff = readFileSync(handoffPath, 'utf8');
for (const literal of [activeSha, activeEnvironment, String(successfulRunId), ...knowledgeSlugs, ...problemSlugs]) {
  assert.ok(rereadHandoff.includes(literal), `HANDOFF missing literal ${literal}`);
}
assert.match(rereadHandoff, /^## Completed cross-book workstream 12$/m);
assert.match(rereadHandoff, /Completed queue entries: \*\*011, 012\*\*\. Remaining integration queue: \*\*013\*\*\./);
assert.doesNotMatch(rereadHandoff, /Remaining integration queue:[^\n]*012/i);
const committedArtifacts = [JSON.stringify(rereadManifest), rereadCompletion, rereadHandoff].join('\n');
assert.doesNotMatch(committedArtifacts, /\b(?:TODO|TBD|FIXME|PLACEHOLDER|activeEnvironment|successfulRunId)\b/);
assert.doesNotMatch(committedArtifacts, /\$\{QI012_|<the exact|<active|<run/i);
NODE
```

Expected: the script exits zero only after all three files contain literal, mutually identical evidence. It preserves the manifest identity/topics/three scopes, keeps 013 `design-audit`, creates no 013 manifest, and writes no symbolic stand-in.

- [ ] **Step 4: Inspect and mechanically reassert the exact closure delta**

```bash
active_sha="$(git rev-parse 'HEAD^{commit}')"
active_environment="${QI012_ACTIVE_ENVIRONMENT:?export the literal environment enum printed by Task 17 Step 9}"
run_id="${QI012_SUCCESSFUL_RUN_ID:?export the literal positive run ID printed by Task 18 Step 1}"
[[ "$active_sha" =~ ^[0-9a-f]{40}$ ]]
case "$active_environment" in
  linux-native-lf-node24|wsl-native-lf-node24) ;;
  *) exit 1 ;;
esac
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]
test ! -e .github/workflows/quant-interview-limits-derivatives-012-temporary.yml
test ! -e src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json
git diff --name-status "$active_sha"
git diff --check "$active_sha"
QI012_ACTIVE_SHA="$active_sha" \
QI012_ACTIVE_ENVIRONMENT="$active_environment" \
QI012_SUCCESSFUL_RUN_ID="$run_id" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const activeSha = process.env.QI012_ACTIVE_SHA;
const environment = process.env.QI012_ACTIVE_ENVIRONMENT;
const runId = Number(process.env.QI012_SUCCESSFUL_RUN_ID);
const commands = ['npm run test', 'npm run check', 'npm run build'];
assert.match(activeSha, /^[0-9a-f]{40}$/);
assert.match(environment, /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/);
assert.ok(Number.isInteger(runId) && runId > 0);
const manifest = JSON.parse(readFileSync('src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json', 'utf8'));
const handoff = readFileSync('docs/quant-interview/HANDOFF.md', 'utf8');
const completion = readFileSync('tests/quant-interview-limits-derivatives-completion.test.mjs', 'utf8');
assert.deepEqual(manifest.preClosureActiveGate, { commit: activeSha, environment, commands, conclusion: 'success' });
assert.deepEqual(manifest.verification, { commit: activeSha, runId, commands, conclusion: 'success' });
assert.equal(manifest.status, 'complete');
for (const value of [activeSha, environment, String(runId)]) {
  assert.ok(handoff.includes(value));
  assert.ok(completion.includes(value));
}
assert.match(handoff, /76 canonical Problems \/ 48 explicitly topic-classified Knowledge \/ Technique nodes/);
assert.match(handoff, /20 rows = 12 canonical-problem \/ 6 merged-duplicate \/ 2 knowledge-only/);
assert.match(handoff, /Green 4 \/ Red 10 \/ 150 6/);
assert.match(handoff, /Interview Strategy & Communication → Reasoning & Communication/);
assert.doesNotMatch([JSON.stringify(manifest), handoff, completion].join('\n'), /\b(?:TODO|TBD|FIXME|PLACEHOLDER|activeEnvironment|successfulRunId)\b/);
NODE
```

Expected: the diff consists only of the named workflow deletion plus the completion test, manifest, and HANDOFF edits. Both evidence objects deep-equal the reacquired facts, all required closure facts are literal, and no placeholder scan matches.

- [ ] **Step 5: Review the bounded HANDOFF closure before running gates**

Read `## Completed cross-book workstream 12`, `## Next action`, `Current bounded topic`, and `## Parallel workstream coordination` as rendered Markdown. Verify all seven Knowledge and 13 Problem bullets, exact source scopes, `76/48`, `20 = 12/6/2`, Green/Red/150 `4/10/6`, the dual-target Green `3.1.3::` row, preserved Q6.9/Q6.10 ownership, exactly two Red map repairs, bounded non-completeness language, the historical marker, reservation 012 `complete`, reservation 013 `design-audit`, completed entries `011, 012`, and remaining queue `013`. Any missing fact is corrected by changing the deterministic Step 3 strings and rerunning from a fresh active tree; do not make an ad hoc second writer.

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
active_sha="$(node --input-type=module -e "import {readFileSync} from 'node:fs'; const w=JSON.parse(readFileSync('src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json','utf8')); process.stdout.write(w.preClosureActiveGate.commit)")"
[[ "$active_sha" =~ ^[0-9a-f]{40}$ ]]
test "$(git rev-parse 'HEAD^{commit}')" = "$active_sha"
git add -- \
  tests/quant-interview-limits-derivatives-completion.test.mjs \
  src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json \
  docs/quant-interview/HANDOFF.md
git add -u -- .github/workflows/quant-interview-limits-derivatives-012-temporary.yml
git commit -m "docs: complete limits derivatives workstream"
closure_sha="$(git rev-parse 'HEAD^{commit}')"
[[ "$closure_sha" =~ ^[0-9a-f]{40}$ ]]
test "$closure_sha" != "$active_sha"
git merge-base --is-ancestor "$active_sha" "$closure_sha"
git status --short
```

Expected: clean worktree; `active_sha` is an ancestor of a distinct closure commit. Do not amend, rebase, reset, force-push, rewrite the active CI commit, or describe `closure_sha` as CI-tested.

- [ ] **Step 8: Run fresh final gates on the exact closure commit authoritatively**

From native Linux or WSL, create another checkout on a native filesystem and detach at `closure_sha`:

```bash
closure_sha="$(git rev-parse 'HEAD^{commit}')"
active_sha="$(node --input-type=module -e "import {readFileSync} from 'node:fs'; const w=JSON.parse(readFileSync('src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json','utf8')); process.stdout.write(w.preClosureActiveGate.commit)")"
[[ "$closure_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$active_sha" =~ ^[0-9a-f]{40}$ ]]
test "$closure_sha" != "$active_sha"
git merge-base --is-ancestor "$active_sha" "$closure_sha"
integration_repo="$(git rev-parse --show-toplevel)"
closure_verify_root="$(mktemp -d)"
git clone --no-hardlinks "$integration_repo" "$closure_verify_root/repo"
git -C "$closure_verify_root/repo" config core.autocrlf false
git -C "$closure_verify_root/repo" checkout --detach "$closure_sha"
cd "$closure_verify_root/repo"
test "$(git rev-parse HEAD)" = "$closure_sha"
case "$(pwd -P)" in (/mnt|/mnt/*) echo 'authoritative checkout must not be under /mnt' >&2; exit 1;; esac
test "$(uname -s)" = Linux
node --version | grep -Eq '^v24\.'
node --input-type=module <<'NODE'
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
const files = execFileSync('git', ['ls-files', '-z']).toString('utf8').split('\0').filter(Boolean);
const offenders = [];
for (const file of files) {
  if (!statSync(file, { throwIfNoEntry: false })?.isFile()) continue;
  const bytes = readFileSync(file);
  if (!bytes.includes(0) && bytes.includes(Buffer.from('\r\n'))) offenders.push(file);
}
if (offenders.length) throw new Error(`tracked text contains CRLF:\n${offenders.join('\n')}`);
NODE
npm ci
npm run test
npm run check
npm run build
test ! -e .github/workflows/quant-interview-limits-derivatives-012-temporary.yml
```

Expected: all fresh final gates pass on the exact clean closure commit. Any correction requires a new commit and another full fresh native-filesystem run; never amend the factual closure.

- [ ] **Step 9: Audit the final allowlist, forbidden deltas, and exact net workflow absence**

Set `QI012_POST_011_SHA` to the literal completed-011 base SHA printed and recorded in Task 11. This block independently reacquires the closure SHA and validates ancestry before comparing the net 012 diff to the complete allowlist:

```bash
post_011_sha="${QI012_POST_011_SHA:?export the exact completed-011 base SHA recorded in Task 11}"
closure_sha="$(git rev-parse 'HEAD^{commit}')"
[[ "$post_011_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$closure_sha" =~ ^[0-9a-f]{40}$ ]]
git merge-base --is-ancestor "$post_011_sha" "$closure_sha"
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
integration_ref='chatgpt/quant-interview-integration-limits-derivatives-2026-08-24'
durable_ref='chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17'
post_011_sha="${QI012_POST_011_SHA:?export the exact completed-011 base SHA recorded in Task 11}"
closure_sha="$(git rev-parse 'HEAD^{commit}')"
active_sha="$(node --input-type=module -e "import {readFileSync} from 'node:fs'; const w=JSON.parse(readFileSync('src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json','utf8')); process.stdout.write(w.preClosureActiveGate.commit)")"
[[ "$post_011_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$closure_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$active_sha" =~ ^[0-9a-f]{40}$ ]]
test -z "$(git status --short)"
git fetch origin
test "$(git rev-parse "origin/$integration_ref^{commit}")" = "$active_sha"
test "$(git rev-parse "origin/$durable_ref^{commit}")" = "$post_011_sha"
git merge-base --is-ancestor "$active_sha" "$closure_sha"
git merge-base --is-ancestor "$post_011_sha" "$closure_sha"
git push origin \
  "$closure_sha:refs/heads/$integration_ref"
git push origin \
  "$closure_sha:refs/heads/$durable_ref"
git fetch origin
test "$(git rev-parse "origin/$integration_ref^{commit}")" = "$closure_sha"
test "$(git rev-parse "origin/$durable_ref^{commit}")" = "$closure_sha"
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

Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
