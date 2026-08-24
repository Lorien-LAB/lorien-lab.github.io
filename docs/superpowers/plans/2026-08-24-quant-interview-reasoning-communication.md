# Quant Interview Reasoning & Communication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add exactly two reusable, source-neutral Reasoning & Communication Knowledge nodes, integrate their bounded evidence after workstream 012, and close workstream 013 with an exact 76-Problem/50-Knowledge contract.

**Architecture:** Phase A is an isolated candidate create-only slice: two new Markdown Knowledge pages and one narrow public-content test, with no shared-state or Problem edits. Phase B is a serialized coordinator slice on the latest durable post-012 base: port the three candidate files, reconcile exact coverage/routing and an active manifest, update exact registry and lifecycle gates, obtain factual Ubuntu/Node 24 evidence for the active commit, then remove temporary CI and record a separately verified closure.

**Tech Stack:** Astro 5 content collections, Markdown/YAML frontmatter, JSON coverage/topic/workstream data, JavaScript ES modules, Node.js 24 built-in test runner, GitHub Actions on Ubuntu, npm, TypeScript/Astro checks.

## Global Constraints

- Approved spec: `docs/superpowers/specs/2026-08-24-quant-interview-reasoning-communication-design.md` at commit `782617c4fdcb661cd79ac246b2a21ee5004d5ebc`.
- Frozen candidate product base: `f41880f220991f43d84ddb3795a59b8688e5230c`.
- Candidate branch: `chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23`.
- Coordinator integration branch: `chatgpt/quant-interview-integration-reasoning-communication-2026-08-24`, created from the latest durable post-012 commit, never from `main`.
- Integration is serialized `011 → 012 → 013`. Phase B must not start until 011 and 012 are both factually `complete` and the exact post-012 registry is `76 Problems / 48 Knowledge`.
- Canonical topic is `reasoning-communication` under parent `interview-strategy-communication`.
- Workstream id is `interview-strategy-communication-reasoning-communication-013`.
- Approved public delta is exactly `+0 Problems / +2 Knowledge`. Candidate discovery is `59/41` on the frozen `59/39` base; authoritative integration is `76/50` on the post-012 `76/48` base.
- New Knowledge slugs are exactly `problem-framing-clarification-assumption-management` and `structured-think-aloud-reasoning`.
- Both Knowledge nodes use `type: concept`, `domain: Interview Strategy & Communication`, `category: Problem Solving Techniques`, `status: growing`, `date: 2026-08-24`, `featured: false`, and `quantInterviewTopics: [interview-strategy-communication, reasoning-communication]`.
- The two new nodes link only to each other, with one aligned reciprocal `relatedNotes` sentence. No pre-existing public page is edited.
- The two-page shape is fixed: do not split listening, speaking, or assumptions into standalone nodes, and do not add a taxonomy node or edit `src/data/quant-interview/topics/taxonomy.json`.
- No Problem may be created, modified, or assigned to `reasoning-communication`.
- Do not publish interview-format, behavioral-interview, puzzle-solving, broad preparation, or self-assessment guidance; Red `1.12` remains private coverage-only disposition.
- Public text is independently authored and source-neutral: no source/book names, source sections or item ids, evidence page numbers, quotations, source ordering, or date-sensitive preparation/self-assessment guidance.
- Green `1.3`, `1.4`, and `1.5` become `knowledge-only` with no Problem targets and exactly the Knowledge targets frozen in the spec.
- Red `1.12` is rerouted to `interview-preparation` / `interview-guidance` with no public target. It does not belong to `reasoning-communication` after reconciliation.
- The 150 source receives no scope, source-topic-map entry, coverage row, reroute, or terminal ownership for this module.
- Candidate ownership is limited to the two new Knowledge files and `tests/quant-interview-reasoning-communication-content.test.mjs`. The candidate reports proposed shared deltas but never edits them.
- The candidate report pins one exact 40-hex implementation-base SHA and one exact 40-hex reviewed candidate SHA. The coordinator fetches and ports blobs from that reported commit object; a moving candidate branch tip is never an integration source.
- Coordinator ownership includes coverage ledgers, source-topic map, manifest, exact registry, workstream/completion/governance/HANDOFF tests, HANDOFF, prior transition assertions, completion metadata, and temporary CI.
- The manifest is `active` without completion-only fields during active integration. Only the coordinator changes it to `complete` after the active commit passes authoritative local gates and real CI.
- Authoritative local evidence requires Node 24 in an LF-normalized native-Linux checkout or a WSL checkout stored on a WSL-native filesystem such as `/home`. Native Windows and WSL-over-`/mnt/c` results are diagnostic only.
- Ordered repository gates are exactly `npm run test`, `npm run check`, `npm run build`.
- Real external evidence is an Ubuntu GitHub Actions run using Node 24 whose `head_sha` is the exact active integrated commit.
- If temporary CI is used, the only approved path is `.github/workflows/quant-interview-reasoning-communication-013-temporary.yml`; record it as used, delete it before closure, and rerun all three gates on the clean tree.
- Keep 013 active on any source, semantic-collision, shared-state, validation, lifecycle, local-gate, CI, or cleanup failure.
- Never modify `main` directly, force-update a shared branch, rewrite durable history, or replace newer shared files with candidate-base copies. Corrections use new commits.

---

## File Structure Map

### Phase A — candidate create-only

```text
src/content/knowledge/concepts/
├── problem-framing-clarification-assumption-management.md
└── structured-think-aloud-reasoning.md

tests/
└── quant-interview-reasoning-communication-content.test.mjs
```

The first page owns framing, clarification, provisional assumptions, and feedback-driven model revision. The second owns concise, auditable explanation of decisive reasoning. The module-content test owns only public content, reciprocal new-node graph metadata, source neutrality, and the absence of a `reasoning-communication` Problem.

### Phase B — coordinator-only integration and closure

```text
src/data/quant-interview/coverage/green-book.json
src/data/quant-interview/coverage/red-book.json
src/data/quant-interview/topics/source-topic-map.json
src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json

tests/quant-interview-source-neutral-content.test.mjs
tests/quant-interview-reasoning-communication-workstream.test.mjs
tests/quant-interview-reasoning-communication-completion.test.mjs
tests/quant-interview-parallel-workstream-governance.test.mjs
tests/quant-interview-handoff.test.mjs
tests/quant-interview-limits-derivatives-workstream.test.mjs
tests/quant-interview-limits-derivatives-completion.test.mjs

docs/quant-interview/HANDOFF.md
.github/workflows/quant-interview-reasoning-communication-013-temporary.yml
```

The source-neutral test remains the exact enumerated public registry. The workstream test owns fixed identity, scopes, routing, coverage, strict target validation, and no-150 assertions in both lifecycle phases. The completion, governance, HANDOFF, and prior-012 tests own phase-safe current-topic and closure behavior. The workflow is temporary evidence scaffolding and is absent from the final tree.

## Exact Public Metadata

```js
const relationNote =
  'Framing determines what must be reasoned about; structured explanation makes that framing and the resulting reasoning inspectable.';

const knowledgeMeta = {
  'problem-framing-clarification-assumption-management': {
    title: 'Problem Framing, Clarification & Assumption Management',
    description:
      'Frame underspecified interview problems by separating facts, constraints, unknowns, and success conditions before asking high-value questions or stating provisional assumptions.',
    tags: ['Interview', 'Problem Solving', 'Communication', 'Assumptions'],
    related: ['structured-think-aloud-reasoning'],
    relatedNotes: [relationNote],
  },
  'structured-think-aloud-reasoning': {
    title: 'Structured Think-Aloud Reasoning',
    description:
      'Communicate conclusions and decisive reasoning steps clearly, distinguish facts from inferences, and revise the explanation when feedback changes the model.',
    tags: ['Interview', 'Reasoning', 'Communication', 'Feedback'],
    related: ['problem-framing-clarification-assumption-management'],
    relatedNotes: [relationNote],
  },
};
```

---

### Task 1: Candidate — Problem Framing Knowledge and Its Contract

**Files:**
- Create: `tests/quant-interview-reasoning-communication-content.test.mjs`
- Create: `src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md`

**Interfaces:**
- Consumes: the Knowledge schema in `src/content.config.ts`; frozen candidate base `f41880f220991f43d84ddb3795a59b8688e5230c`; the exact metadata and source-neutral rules above.
- Produces: `parseInlineArray(text: string, field: string): string[]`, `frontmatterValue(text: string, field: string): string`, `publicBody(text: string): string`, `assertFixedMetadata(text: string, expected: object): void`, and `assertSourceNeutral(text: string): void` for Task 2; one independently testable framing page.

- [ ] **Step 1: Establish the authoritative frozen-base baseline**

Run from an LF-normalized native-Linux or WSL-native-filesystem checkout, never `/mnt/c`:

```bash
case "$PWD" in /mnt/*) exit 1 ;; esac
test "$(node --version | cut -d. -f1)" = "v24"
test -z "$(git grep -Il $'\r')"
test -z "$(git status --short)"
git worktree add ../quant-interview-013-frozen-baseline f41880f220991f43d84ddb3795a59b8688e5230c
(
  cd ../quant-interview-013-frozen-baseline
  case "$PWD" in /mnt/*) exit 1 ;; esac
  test "$(node --version | cut -d. -f1)" = "v24"
  test -z "$(git grep -Il $'\r')"
  npm ci
  npm run test
  npm run check
  npm run build
)
git worktree remove ../quant-interview-013-frozen-baseline
npm ci
candidate_baseline_sha="$(git rev-parse HEAD)"
printf '%s' "$candidate_baseline_sha" | grep -Eq '^[0-9a-f]{40}$'
git_common_dir="$(cd "$(git rev-parse --git-common-dir)" && pwd -P)"
candidate_context="$git_common_dir/quant-interview-013-candidate-context.json"
CANDIDATE_BASELINE_SHA="$candidate_baseline_sha" \
CANDIDATE_CONTEXT="$candidate_context" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';

const baselineSha = process.env.CANDIDATE_BASELINE_SHA;
assert.match(baselineSha, /^[0-9a-f]{40}$/);
writeFileSync(
  process.env.CANDIDATE_CONTEXT,
  `${JSON.stringify({ baselineSha }, null, 2)}\n`,
);
NODE
```

Expected: both the candidate checkout and disposable frozen-base checkout are outside `/mnt`, run Node 24, and have no CR bytes in tracked text; all three ordered gates pass on the frozen `59/39` base; the disposable baseline worktree is removed; and only the candidate's exact implementation-base SHA is persisted outside the tracked tree in the Git common directory. Task 2 must derive the reported environment from its own fresh authoritative verification run.

- [ ] **Step 2: Write the failing framing-page test**

Create `tests/quant-interview-reasoning-communication-content.test.mjs` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const framingPath =
  'src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md';
const structuredPath =
  'src/content/knowledge/concepts/structured-think-aloud-reasoning.md';
const topics = ['interview-strategy-communication', 'reasoning-communication'];
const relationNote =
  'Framing determines what must be reasoned about; structured explanation makes that framing and the resulting reasoning inspectable.';

function parseInlineArray(text, field) {
  const match = text.match(new RegExp('^' + field + ':\\s*\\[([^\\]]*)\\]$', 'm'));
  if (!match) return [];
  return match[1].split(',').map((item) => item.trim()).filter(Boolean);
}

function frontmatterValue(text, field) {
  return text.match(new RegExp('^' + field + ':\\s*(.+)$', 'm'))?.[1]?.trim() ?? '';
}

function publicBody(text) {
  return text.split(/^---\s*$/m).slice(2).join('---').trim();
}

function assertFixedMetadata(text, expected) {
  assert.equal(frontmatterValue(text, 'title'), expected.title);
  assert.equal(frontmatterValue(text, 'description'), expected.description);
  assert.equal(frontmatterValue(text, 'date'), '2026-08-24');
  assert.equal(frontmatterValue(text, 'type'), 'concept');
  assert.equal(frontmatterValue(text, 'domain'), 'Interview Strategy & Communication');
  assert.equal(frontmatterValue(text, 'category'), 'Problem Solving Techniques');
  assert.equal(frontmatterValue(text, 'status'), 'growing');
  assert.equal(frontmatterValue(text, 'featured'), 'false');
  assert.deepEqual(parseInlineArray(text, 'tags'), expected.tags);
  assert.deepEqual(parseInlineArray(text, 'quantInterviewTopics'), topics);
  assert.deepEqual(parseInlineArray(text, 'related'), expected.related);
  assert.deepEqual(parseInlineArray(text, 'relatedNotes'), [relationNote]);
}

function assertSourceNeutral(text) {
  assert.doesNotMatch(
    text,
    /^\s*(?:sourceUrl|source|sourceSection|sourceItem|sourcePage|evidencePage|provenance):/mi,
  );
  const body = publicBody(text);
  assert.doesNotMatch(
    body,
    /Green Book|Red Book|150 Questions|source (?:section|item|page|ordering)|PDF page|question \d+|page \d+/i,
  );
  assert.doesNotMatch(
    body,
    /current hiring cycle|latest interview format|preparation schedule|self-assessment schedule|\b202\d\b/i,
  );
  assert.doesNotMatch(body, /\b(?:1\.3|1\.4|1\.5|1\.12)\b/);
}

test('problem framing page teaches clarification and revisable assumptions', async () => {
  const text = await readFile(framingPath, 'utf8');
  assertFixedMetadata(text, {
    title: 'Problem Framing, Clarification & Assumption Management',
    description:
      'Frame underspecified interview problems by separating facts, constraints, unknowns, and success conditions before asking high-value questions or stating provisional assumptions.',
    tags: ['Interview', 'Problem Solving', 'Communication', 'Assumptions'],
    related: ['structured-think-aloud-reasoning'],
  });
  assertSourceNeutral(text);

  for (const heading of [
    '## Core Idea',
    '## Compact Framing Protocol',
    '## Recognition Signals',
    '## Explicit Assumption versus Unsupported Claim',
    '## Common Mistakes',
    '## Interview Checks',
  ]) assert.match(text, new RegExp('^' + heading + '$', 'm'), 'missing ' + heading);

  assert.match(text, /restate the (?:decision|target quantity)/i);
  assert.match(text, /known facts.*constraints.*unknowns.*success conditions/is);
  assert.match(text, /greatest effect on the solution path/i);
  assert.match(text, /provisional assumption/i);
  assert.match(text, /state its consequence/i);
  assert.match(text, /invite correction/i);
  assert.match(text, /revise the model before proceeding/i);
  assert.match(text, /unsupported claim/i);

  const checks = text.split(/^## Interview Checks$/m)[1] ?? '';
  assert.match(checks, /missing constraint/i);
  assert.match(checks, /useful clarification/i);
  assert.match(checks, /assumption.*consequence/is);
  assert.match(checks, /feedback.*revise/is);
});
```

- [ ] **Step 3: Run the focused test to prove RED**

Run:

```bash
node --test --test-name-pattern="problem framing page" tests/quant-interview-reasoning-communication-content.test.mjs
```

Expected: FAIL with `ENOENT` for `problem-framing-clarification-assumption-management.md`. A syntax error or a failure before the missing-file read is not the intended RED.

- [ ] **Step 4: Create the minimal complete framing page**

Create `src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md` exactly as follows:

```markdown
---
title: Problem Framing, Clarification & Assumption Management
description: Frame underspecified interview problems by separating facts, constraints, unknowns, and success conditions before asking high-value questions or stating provisional assumptions.
date: 2026-08-24
type: concept
domain: Interview Strategy & Communication
category: Problem Solving Techniques
status: growing
tags: [Interview, Problem Solving, Communication, Assumptions]
quantInterviewTopics: [interview-strategy-communication, reasoning-communication]
featured: false
related: [structured-think-aloud-reasoning]
relatedNotes: [Framing determines what must be reasoned about; structured explanation makes that framing and the resulting reasoning inspectable.]
---

## Core Idea

An underspecified prompt is not permission to guess silently. Before selecting a method, make the problem's decision, evidence, constraints, unknowns, and success conditions visible. The aim is a shared model that can be corrected early.

A good frame is compact enough to say aloud and precise enough that a changed assumption visibly changes the route.

## Compact Framing Protocol

1. **Restate the decision or target quantity.** Say what must be chosen, estimated, proved, or explained.
2. **Separate known facts, constraints, unknowns, and success conditions.** Do not blend supplied information with your interpretation.
3. **Ask the clarifying question with the greatest effect on the solution path.** Prefer one question that changes the model over several low-impact details.
4. **If an answer is unavailable, label a defensible assumption as provisional and state its consequence.** Explain which branch of the analysis it enables.
5. **Invite correction, then revise the model before proceeding.** Feedback changes the frame; it is not an interruption to ignore.

For example: “We need an estimate of peak capacity. We know the average arrival rate and latency target, but not burstiness. Does the target apply at the average or a high percentile? If that is unavailable, I will provisionally assume a stated burst multiplier; that makes capacity scale by the same factor. Please correct that assumption before I size the system.”

## Recognition Signals

Use this protocol when:

- the requested output could mean a decision, an estimate, or a proof;
- a missing constraint would select a different solution family;
- terms such as “fast,” “likely,” or “optimal” lack a success measure;
- the data supports several plausible models;
- the interviewer challenges the objective or supplies a new condition.

## Explicit Assumption versus Unsupported Claim

An **explicit assumption** is labeled, defensible, revisable, and paired with a consequence: “Assume arrivals are independent for this first model; then variance grows linearly with the interval.”

An **unsupported claim** hides uncertainty as fact: “Arrivals are independent.” It gives the listener no way to audit the choice or revise the result.

The distinction is not certainty. It is traceability. A provisional model can be useful precisely because everyone can see what would invalidate it.

## Common Mistakes

- Solving a familiar version of the prompt before stating the actual objective.
- Asking many factual questions without prioritizing the one that changes the route.
- Calling a convenient guess “obvious” instead of labeling it provisional.
- Listing assumptions without stating their consequences.
- Defending the first frame after feedback reveals a missing constraint.
- Treating clarification as delay rather than part of the solution.

## Interview Checks

1. A capacity prompt gives average demand but no service-level target. Identify the missing constraint that most affects the model.
2. A request says to choose the “best” estimator. Select one useful clarification that would distinguish the available routes.
3. State a provisional assumption about missing dependence information and explain one consequence for the calculation.
4. New feedback invalidates your original objective. Show how you would revise the frame before continuing.
```

- [ ] **Step 5: Run GREEN checks for the first deliverable**

Run:

```bash
node --test --test-name-pattern="problem framing page" tests/quant-interview-reasoning-communication-content.test.mjs
npm run check
expected_paths="$(printf '%s\n' \
  'src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md' \
  'tests/quant-interview-reasoning-communication-content.test.mjs')"
actual_paths="$(git status --porcelain=v1 --untracked-files=all | cut -c4-)"
test "$actual_paths" = "$expected_paths"
git add \
  src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md \
  tests/quant-interview-reasoning-communication-content.test.mjs
test "$(git diff --cached --name-only HEAD)" = "$expected_paths"
test -z "$(git diff --name-only)"
git diff --cached --check
```

Expected: the focused test passes; Astro reports no content-schema errors; the complete repository status and staged diff contain exactly the two Task 1 paths; the cached whitespace check prints nothing.

- [ ] **Step 6: Commit the first candidate gate**

```bash
git commit -m "feat: add problem framing interview knowledge"
test -z "$(git status --porcelain=v1 --untracked-files=all)"
```

Expected: one commit contains only the framing page and the initial module-content test, and the candidate worktree is clean.

---

### Task 2: Candidate — Structured Think-Aloud Knowledge, Reciprocal Graph, and Handoff Report

**Files:**
- Create: `src/content/knowledge/concepts/structured-think-aloud-reasoning.md`
- Modify: `tests/quant-interview-reasoning-communication-content.test.mjs`

**Interfaces:**
- Consumes: Task 1's test helpers, framing page, exact reciprocal relation sentence, and candidate ownership allowlist.
- Produces: the second independently testable Knowledge page, the final narrow candidate test, and a non-authoritative report of the exact `+0/+2` delta and proposed coordinator changes.

- [ ] **Step 1: Add the structured-reasoning, reciprocal-graph, and no-Problem assertions**

Append the following tests to `tests/quant-interview-reasoning-communication-content.test.mjs`:

```js
test('structured think-aloud page exposes decisive and revisable reasoning', async () => {
  const text = await readFile(structuredPath, 'utf8');
  assertFixedMetadata(text, {
    title: 'Structured Think-Aloud Reasoning',
    description:
      'Communicate conclusions and decisive reasoning steps clearly, distinguish facts from inferences, and revise the explanation when feedback changes the model.',
    tags: ['Interview', 'Reasoning', 'Communication', 'Feedback'],
    related: ['problem-framing-clarification-assumption-management'],
  });
  assertSourceNeutral(text);

  for (const heading of [
    '## Core Idea',
    '## Concise Explanation Protocol',
    '## Recognition Signals',
    '## What to Expose',
    '## Common Mistakes',
    '## Interview Checks',
  ]) assert.match(text, new RegExp('^' + heading + '$', 'm'), 'missing ' + heading);

  assert.match(text, /conclusion or intended route first/i);
  assert.match(text, /observations.*assumptions.*inferences.*uncertainty/is);
  assert.match(text, /steps that change the decision/i);
  assert.match(text, /trivial arithmetic or syntax/i);
  assert.match(text, /meaningful checkpoint/i);
  assert.match(text, /result, limitation, or next discriminating test/i);
  assert.match(text, /correct(?:ing|ive) feedback/i);
  assert.match(text, /revise/i);

  const checks = text.split(/^## Interview Checks$/m)[1] ?? '';
  assert.match(checks, /decisive step/i);
  assert.match(checks, /fact.*inference/is);
  assert.match(checks, /compress.*routine narration/is);
  assert.match(checks, /challenge.*update/is);
});

test('new Knowledge nodes form one aligned reciprocal pair', async () => {
  const framing = await readFile(framingPath, 'utf8');
  const structured = await readFile(structuredPath, 'utf8');
  assert.deepEqual(parseInlineArray(framing, 'related'), [
    'structured-think-aloud-reasoning',
  ]);
  assert.deepEqual(parseInlineArray(structured, 'related'), [
    'problem-framing-clarification-assumption-management',
  ]);
  assert.deepEqual(parseInlineArray(framing, 'relatedNotes'), [relationNote]);
  assert.deepEqual(parseInlineArray(structured, 'relatedNotes'), [relationNote]);
});

test('reasoning communication creates no classified Problem', async () => {
  const root = 'src/content/problems';
  const files = (await readdir(root, { recursive: true }))
    .filter((file) => String(file).endsWith('.md'));
  const offenders = [];
  for (const file of files) {
    const text = await readFile(path.join(root, String(file)), 'utf8');
    if (parseInlineArray(text, 'quantInterviewTopics').includes('reasoning-communication')) {
      offenders.push(String(file).replaceAll('\\', '/'));
    }
  }
  assert.deepEqual(offenders.sort(), []);
});
```

- [ ] **Step 2: Run the new page assertion to prove RED**

Run:

```bash
node --test --test-name-pattern="structured think-aloud page" tests/quant-interview-reasoning-communication-content.test.mjs
```

Expected: FAIL with `ENOENT` for `structured-think-aloud-reasoning.md`. The framing-page test is skipped by the name filter.

- [ ] **Step 3: Create the minimal complete structured-reasoning page**

Create `src/content/knowledge/concepts/structured-think-aloud-reasoning.md` exactly as follows:

```markdown
---
title: Structured Think-Aloud Reasoning
description: Communicate conclusions and decisive reasoning steps clearly, distinguish facts from inferences, and revise the explanation when feedback changes the model.
date: 2026-08-24
type: concept
domain: Interview Strategy & Communication
category: Problem Solving Techniques
status: growing
tags: [Interview, Reasoning, Communication, Feedback]
quantInterviewTopics: [interview-strategy-communication, reasoning-communication]
featured: false
related: [problem-framing-clarification-assumption-management]
relatedNotes: [Framing determines what must be reasoned about; structured explanation makes that framing and the resulting reasoning inspectable.]
---

## Core Idea

Think-aloud reasoning is an audit trail, not a live transcript of every mental operation. Give the listener enough structure to inspect the route, challenge a pivotal step, and understand how feedback changes the result.

The useful signal is the chain from evidence to decision. Routine mechanics can remain compressed.

## Concise Explanation Protocol

1. **Give the conclusion or intended route first when it helps orientation.** A short headline lets the listener place the details.
2. **Distinguish observations, assumptions, inferences, and uncertainty.** Name which statements are supplied, modeled, derived, or still unresolved.
3. **Expose the steps that change the decision, rather than reciting trivial arithmetic or syntax.** Spend explanation time where a different step would change the answer.
4. **Pause at a meaningful checkpoint for feedback.** Invite a challenge after the model, pivotal inference, or candidate route is visible.
5. **Close with the result, limitation, or next discriminating test.** Make the end state and remaining uncertainty explicit.

For example: “I would use a queueing approximation. The observed peak arrival rate is a fact; independence is a provisional assumption. The decisive inference is that utilization near one makes latency nonlinear, so average-load sizing is unsafe. Before calculating capacity, does that model match the intended traffic regime?”

## Recognition Signals

Use this protocol when:

- several correct methods exist but one route is materially shorter;
- a conclusion depends on a hidden inference;
- uncertainty changes whether the result is actionable;
- the interviewer challenges the model or supplies a counterexample;
- detailed mechanics threaten to obscure the decision.

## What to Expose

Expose a step when it introduces an assumption, rules out a competing route, changes the decision, controls an error bound, or determines what evidence is needed next.

Compress operations that are standard and checkable, such as routine algebra, trivial arithmetic or syntax, repeated substitutions, and mechanical enumeration. Name the operation and surface its result instead of narrating every keystroke.

Corrective feedback is evidence. Acknowledge it, identify the affected inference, revise the explanation, and restate the resulting conclusion. Refusing correction makes even a correct opening argument unauditable.

## Common Mistakes

- Burying the conclusion beneath a long chronological monologue.
- Presenting an inference as though it were an observed fact.
- Hiding the pivotal step while narrating routine mechanics in detail.
- Pausing so often that no meaningful checkpoint is visible.
- Treating uncertainty as weakness instead of locating its consequence.
- Defending the original explanation after corrective feedback changes the model.

## Interview Checks

1. A derivation has six algebraic lines but only one step selects the model. Choose the decisive step to explain.
2. Given “latency rose after load doubled, so contention caused it,” distinguish the observed fact from the inference.
3. Compress routine narration for a standard matrix multiplication while preserving the decision-relevant result.
4. A challenge reveals that your independence assumption is false. Update the explanation, name the affected inference, and revise the conclusion or next test.
```

- [ ] **Step 4: Run the complete candidate module test to prove GREEN**

Run:

```bash
node --test tests/quant-interview-reasoning-communication-content.test.mjs
```

Expected: four tests pass: framing content, structured content, aligned reciprocal pair, and zero classified Problems.

- [ ] **Step 5: Verify the exact candidate ownership surface**

Run:

```bash
git_common_dir="$(cd "$(git rev-parse --git-common-dir)" && pwd -P)"
candidate_context="$git_common_dir/quant-interview-013-candidate-context.json"
test -s "$candidate_context"
candidate_baseline_sha="$(node -p \
  "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')).baselineSha" \
  "$candidate_context")"
printf '%s' "$candidate_baseline_sha" | grep -Eq '^[0-9a-f]{40}$'
expected_committed="$(printf '%s\n' \
  'src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md' \
  'tests/quant-interview-reasoning-communication-content.test.mjs')"
test "$(git diff --name-only "$candidate_baseline_sha" HEAD)" = "$expected_committed"
expected_status="$(printf '%s\n' \
  '?? src/content/knowledge/concepts/structured-think-aloud-reasoning.md' \
  ' M tests/quant-interview-reasoning-communication-content.test.mjs')"
test "$(git status --porcelain=v1 --untracked-files=all)" = "$expected_status"
test -z "$(git diff --cached --name-only)"
```

Expected: the committed Task 1 delta is exactly the framing page and module test; the complete current status is exactly the untracked structured page plus the unstaged module-test update; the index is empty. No filtered diff can hide a coverage, map, manifest, global-regression, HANDOFF, completion, governance, CI, Problem, or pre-existing Knowledge change.

- [ ] **Step 6: Run authoritative candidate verification and classify the one permitted stale-registry failure**

Run in the same qualified Node 24 checkout:

```bash
case "$PWD" in /mnt/*) exit 1 ;; esac
test "$(node --version | cut -d. -f1)" = "v24"
test -z "$(git grep -Il $'\r')"
if grep -qi microsoft /proc/version; then
  candidate_environment=wsl-native-lf-node24
else
  candidate_environment=linux-native-lf-node24
fi
printf '%s' "$candidate_environment" | \
  grep -Eq '^(linux-native-lf-node24|wsl-native-lf-node24)$'
git_common_dir="$(cd "$(git rev-parse --git-common-dir)" && pwd -P)"
candidate_context="$git_common_dir/quant-interview-013-candidate-context.json"
verification_log="$git_common_dir/quant-interview-013-candidate-verification.log"
candidate_verification="$git_common_dir/quant-interview-013-candidate-verification.json"
test -s "$candidate_context"
candidate_baseline_sha="$(node -p \
  "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')).baselineSha" \
  "$candidate_context")"
printf '%s' "$candidate_baseline_sha" | grep -Eq '^[0-9a-f]{40}$'
: > "$verification_log"
printf '{}\n' > "$candidate_verification"
node --test tests/quant-interview-reasoning-communication-content.test.mjs \
  2>&1 | tee -a "$verification_log"
test "${PIPESTATUS[0]}" -eq 0
set +e
npm run test 2>&1 | tee -a "$verification_log"
full_suite_status="${PIPESTATUS[0]}"
set -e
test "$full_suite_status" -ne 0
set +e
node --test \
  --test-name-pattern='^source-neutral regression discovers exactly' \
  tests/quant-interview-source-neutral-content.test.mjs \
  2>&1 | tee -a "$verification_log"
registry_status="${PIPESTATUS[0]}"
set -e
test "$registry_status" -ne 0
other_tests="$(rg --files tests -g '*.test.mjs' | \
  grep -v '^tests/quant-interview-source-neutral-content.test.mjs$')"
node --test $other_tests 2>&1 | tee -a "$verification_log"
test "${PIPESTATUS[0]}" -eq 0
node --test \
  --test-name-pattern='^(?!source-neutral regression discovers exactly)' \
  tests/quant-interview-source-neutral-content.test.mjs \
  2>&1 | tee -a "$verification_log"
test "${PIPESTATUS[0]}" -eq 0
npm run check 2>&1 | tee -a "$verification_log"
test "${PIPESTATUS[0]}" -eq 0
npm run build 2>&1 | tee -a "$verification_log"
test "${PIPESTATUS[0]}" -eq 0
git diff --check "$candidate_baseline_sha" HEAD
CANDIDATE_BASELINE_SHA="$candidate_baseline_sha" \
CANDIDATE_ENVIRONMENT="$candidate_environment" \
CANDIDATE_VERIFICATION="$candidate_verification" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';

const baselineSha = process.env.CANDIDATE_BASELINE_SHA;
const environment = process.env.CANDIDATE_ENVIRONMENT;
assert.match(baselineSha, /^[0-9a-f]{40}$/);
assert.match(environment, /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/);
writeFileSync(
  process.env.CANDIDATE_VERIFICATION,
  `${JSON.stringify({ baselineSha, environment }, null, 2)}\n`,
);
NODE
```

Expected:

- the module-content test passes;
- `npm run check` and `npm run build` pass;
- `npm run test` and the isolated exact-registry test exit nonzero because the coordinator-owned exact Knowledge count still expects 39 while candidate discovery is 41; the Problem count remains exactly 59;
- one invocation containing every other `*.test.mjs` file passes, and a negative name filter proves that every other test in the source-neutral file also passes;
- `npm run check` and `npm run build` pass, and the committed Task 1 diff has no whitespace errors;
- the complete raw output is preserved outside the worktree in `quant-interview-013-candidate-verification.log`; and
- only after every authoritative assertion passes, the run's validated implementation-base SHA and live Linux/WSL, LF, Node 24 environment are persisted in `quant-interview-013-candidate-verification.json` outside the tracked tree.

Any other failure blocks the candidate report. Do not edit the global regression to make the isolated candidate suite green.

- [ ] **Step 7: Commit the second candidate gate**

```bash
expected_paths="$(printf '%s\n' \
  'src/content/knowledge/concepts/structured-think-aloud-reasoning.md' \
  'tests/quant-interview-reasoning-communication-content.test.mjs')"
git add \
  src/content/knowledge/concepts/structured-think-aloud-reasoning.md \
  tests/quant-interview-reasoning-communication-content.test.mjs
test "$(git diff --cached --name-only HEAD)" = "$expected_paths"
test -z "$(git diff --name-only)"
git diff --cached --check
git commit -m "feat: add structured interview reasoning knowledge"
test -z "$(git status --porcelain=v1 --untracked-files=all)"
candidate_sha="$(git rev-parse HEAD)"
printf '%s' "$candidate_sha" | grep -Eq '^[0-9a-f]{40}$'
```

Expected: one commit containing only the structured page and final module-content test delta; the tree is clean; `git rev-parse HEAD` prints the factual candidate commit.

- [ ] **Step 8: Send the candidate report without creating a tracked report file**

Generate the report from committed facts, push that exact commit without force, and print the report plus the preserved verification log:

```bash
git_common_dir="$(cd "$(git rev-parse --git-common-dir)" && pwd -P)"
candidate_context="$git_common_dir/quant-interview-013-candidate-context.json"
verification_log="$git_common_dir/quant-interview-013-candidate-verification.log"
candidate_verification="$git_common_dir/quant-interview-013-candidate-verification.json"
candidate_report="$git_common_dir/quant-interview-013-candidate-report.txt"
test -s "$candidate_context"
test -s "$verification_log"
test -s "$candidate_verification"
candidate_sha="$(git rev-parse HEAD)"
candidate_baseline_sha="$(node -p \
  "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')).baselineSha" \
  "$candidate_context")"
verified_baseline_sha="$(node -p \
  "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')).baselineSha" \
  "$candidate_verification")"
candidate_environment="$(node -p \
  "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')).environment" \
  "$candidate_verification")"
printf '%s' "$candidate_sha" | grep -Eq '^[0-9a-f]{40}$'
printf '%s' "$candidate_baseline_sha" | grep -Eq '^[0-9a-f]{40}$'
printf '%s' "$verified_baseline_sha" | grep -Eq '^[0-9a-f]{40}$'
test "$verified_baseline_sha" = "$candidate_baseline_sha"
printf '%s' "$candidate_environment" | \
  grep -Eq '^(linux-native-lf-node24|wsl-native-lf-node24)$'
expected_paths="$(printf '%s\n' \
  'src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md' \
  'src/content/knowledge/concepts/structured-think-aloud-reasoning.md' \
  'tests/quant-interview-reasoning-communication-content.test.mjs')"
test "$(git diff --name-only "$candidate_baseline_sha" "$candidate_sha")" = "$expected_paths"
git diff --check "$candidate_baseline_sha" "$candidate_sha"
test -z "$(git status --porcelain=v1 --untracked-files=all)"
git push origin \
  "${candidate_sha}:refs/heads/chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23"
CANDIDATE_REPORT="$candidate_report" \
CANDIDATE_SHA="$candidate_sha" \
CANDIDATE_BASELINE_SHA="$candidate_baseline_sha" \
CANDIDATE_ENVIRONMENT="$candidate_environment" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';

const candidateSha = process.env.CANDIDATE_SHA;
const baselineSha = process.env.CANDIDATE_BASELINE_SHA;
const environment = process.env.CANDIDATE_ENVIRONMENT;
assert.match(candidateSha, /^[0-9a-f]{40}$/);
assert.match(baselineSha, /^[0-9a-f]{40}$/);
assert.match(environment, /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/);
const report = [
  `Candidate commit: ${candidateSha}`,
  `Candidate implementation base: ${baselineSha}`,
  `Candidate environment: ${environment}`,
  'Candidate status: active and non-authoritative.',
  'Candidate files:',
  '- src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md',
  '- src/content/knowledge/concepts/structured-think-aloud-reasoning.md',
  '- tests/quant-interview-reasoning-communication-content.test.mjs',
  'Public delta: +0 Problems / +2 Knowledge.',
  'Frozen-base discovery: 59 Problems / 41 Knowledge.',
  'Module test: pass.',
  'Astro check: pass.',
  'Astro build: pass.',
  'Full suite: only the stale exact 59/39 registry assertion fails; observed counts are 59/41.',
  'Proposed Green 1.3: knowledge-only -> problem-framing-clarification-assumption-management.',
  'Proposed Green 1.4: knowledge-only -> structured-think-aloud-reasoning.',
  'Proposed Green 1.5: knowledge-only -> problem-framing-clarification-assumption-management.',
  'Proposed Red 1.12: source map and coverage reroute to interview-preparation / interview-guidance, with no public target.',
  'Proposed 150 delta: none.',
  'Integration prerequisite: completed 011 and 012, exact post-012 76/48 base.',
].join('\n');
writeFileSync(process.env.CANDIDATE_REPORT, `${report}\n`);
NODE
cat "$candidate_report"
cat "$verification_log"
```

Expected: the pushed object is the exact 40-hex `Candidate commit` recorded in the report; the report also pins the implementation base and exact three-file delta. Send both printed artifacts for review. Do not claim integration, completion, CI success, or `76/50` from the candidate branch, and do not create a tracked report file.

---

### Task 3: Coordinator — Port Candidate Files and Raise the Exact Registry to 76/50

**Files:**
- Create by port: `src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md`
- Create by port: `src/content/knowledge/concepts/structured-think-aloud-reasoning.md`
- Create by port: `tests/quant-interview-reasoning-communication-content.test.mjs`
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`

**Interfaces:**
- Consumes: a factual post-012 `76/48` durable base plus the exact reviewed candidate report preserved at `quant-interview-013-reviewed-candidate-report.txt` in the Git common directory; the report pins both a 40-hex candidate commit and its 40-hex implementation base.
- Produces: exact enumerated `76/50` public registry with both new Knowledge slugs and an unchanged 76-Problem set.

- [ ] **Step 1: Verify the serialized post-012 base and create the coordinator worktree**

The execution controller first saves the reviewed candidate report attachment verbatim as `quant-interview-013-reviewed-candidate-report.txt` in the Git common directory. From the coordinator's latest durable checkout, run:

```bash
case "$PWD" in /mnt/*) exit 1 ;; esac
test "$(node --version | cut -d. -f1)" = "v24"
test -z "$(git grep -Il $'\r')"
test -z "$(git status --porcelain=v1 --untracked-files=all)"
git_common_dir="$(cd "$(git rev-parse --git-common-dir)" && pwd -P)"
reviewed_report="$git_common_dir/quant-interview-013-reviewed-candidate-report.txt"
test -s "$reviewed_report"
test "$(grep -Ec '^Candidate commit: [0-9a-f]{40}$' "$reviewed_report")" -eq 1
test "$(grep -Ec '^Candidate implementation base: [0-9a-f]{40}$' "$reviewed_report")" -eq 1
test "$(grep -Ec '^Candidate environment: (linux-native-lf-node24|wsl-native-lf-node24)$' "$reviewed_report")" -eq 1
candidate_sha="$(sed -nE 's/^Candidate commit: ([0-9a-f]{40})$/\1/p' "$reviewed_report")"
candidate_baseline_sha="$(sed -nE \
  's/^Candidate implementation base: ([0-9a-f]{40})$/\1/p' \
  "$reviewed_report")"
printf '%s' "$candidate_sha" | grep -Eq '^[0-9a-f]{40}$'
printf '%s' "$candidate_baseline_sha" | grep -Eq '^[0-9a-f]{40}$'
for required_line in \
  'Candidate status: active and non-authoritative.' \
  'Public delta: +0 Problems / +2 Knowledge.' \
  'Frozen-base discovery: 59 Problems / 41 Knowledge.' \
  'Module test: pass.' \
  'Astro check: pass.' \
  'Astro build: pass.' \
  'Full suite: only the stale exact 59/39 registry assertion fails; observed counts are 59/41.' \
  'Proposed Green 1.3: knowledge-only -> problem-framing-clarification-assumption-management.' \
  'Proposed Green 1.4: knowledge-only -> structured-think-aloud-reasoning.' \
  'Proposed Green 1.5: knowledge-only -> problem-framing-clarification-assumption-management.' \
  'Proposed Red 1.12: source map and coverage reroute to interview-preparation / interview-guidance, with no public target.' \
  'Proposed 150 delta: none.' \
  'Integration prerequisite: completed 011 and 012, exact post-012 76/48 base.' \
  '- src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md' \
  '- src/content/knowledge/concepts/structured-think-aloud-reasoning.md' \
  '- tests/quant-interview-reasoning-communication-content.test.mjs'
do
  grep -Fx -- "$required_line" "$reviewed_report"
done
git fetch --no-tags origin "$candidate_sha"
test "$(git rev-parse FETCH_HEAD)" = "$candidate_sha"
git cat-file -e "${candidate_sha}^{commit}"
git cat-file -e "${candidate_baseline_sha}^{commit}"
git merge-base --is-ancestor "$candidate_baseline_sha" "$candidate_sha"
expected_candidate_paths="$(printf '%s\n' \
  'src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md' \
  'src/content/knowledge/concepts/structured-think-aloud-reasoning.md' \
  'tests/quant-interview-reasoning-communication-content.test.mjs')"
test "$(git diff --name-only "$candidate_baseline_sha" "$candidate_sha")" = \
  "$expected_candidate_paths"
git diff --check "$candidate_baseline_sha" "$candidate_sha"
node --input-type=module -e "
  import fs from 'node:fs';
  for (const file of [
    'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json',
    'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json',
  ]) {
    const manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (manifest.status !== 'complete') throw new Error(file + ' is not complete');
  }
"
node --test tests/quant-interview-source-neutral-content.test.mjs
npm run test
npm run check
npm run build
test ! -e src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md
test ! -e src/content/knowledge/concepts/structured-think-aloud-reasoning.md
git worktree add -b chatgpt/quant-interview-integration-reasoning-communication-2026-08-24 \
  ../quant-interview-013-integration "$(git rev-parse HEAD)"
cd ../quant-interview-013-integration
case "$PWD" in /mnt/*) exit 1 ;; esac
test "$(node --version | cut -d. -f1)" = "v24"
test -z "$(git grep -Il $'\r')"
test -z "$(git status --porcelain=v1 --untracked-files=all)"
npm ci
```

Expected: the reviewed report has exactly one candidate SHA and one implementation-base SHA; the fetched `FETCH_HEAD` equals the reported candidate SHA; that exact object has an exact three-file implementation delta. Before and after coordinator worktree creation, the live checkout is outside `/mnt`, uses Node 24, has no CR bytes in tracked text, and is clean. Both prior manifests are complete; the authoritative post-012 suite passes with exact `76/48` discovery; neither approved slug collides with an existing page; the new integration branch starts at that exact durable HEAD. If a slug exists or the registry is not exactly `76/48`, stop and reconcile the design rather than overwriting or preserving `+2` as a quota.

- [ ] **Step 2: Raise the exact registry expectation before porting the pages**

In `tests/quant-interview-source-neutral-content.test.mjs`, leave every post-012 Problem slug and Knowledge mapping unchanged. Immediately after the existing `expectedKnowledgeTopics` map is constructed, add:

```js
expectedKnowledgeTopics.set(
  'problem-framing-clarification-assumption-management',
  ['interview-strategy-communication', 'reasoning-communication'],
);
expectedKnowledgeTopics.set(
  'structured-think-aloud-reasoning',
  ['interview-strategy-communication', 'reasoning-communication'],
);
```

Replace the post-012 registry test declaration and two count assertions with:

```js
test('source-neutral regression discovers exactly the current 76 Problem and 50 Knowledge contracts', async () => {
  const actualProblemSlugs = await classifiedMarkdownSlugs('src/content/problems');
  const actualKnowledgeSlugs = await classifiedMarkdownSlugs('src/content/knowledge');
  const expectedProblemSlugs = [...currentProblemSlugs].sort();
  const expectedKnowledgeSlugs = [...expectedKnowledgeTopics.keys()].sort();

  assert.equal(actualProblemSlugs.length, 76);
  assert.equal(actualKnowledgeSlugs.length, 50);
  assert.deepEqual(actualProblemSlugs, expectedProblemSlugs);
  assert.deepEqual(actualKnowledgeSlugs, expectedKnowledgeSlugs);
});
```

This deliberately preserves exact set equality; it does not add either slug to the Problem array and does not weaken either count to a lower bound.

- [ ] **Step 3: Run the registry test to prove coordinator RED**

Run:

```bash
node --test --test-name-pattern="source-neutral regression discovers exactly" tests/quant-interview-source-neutral-content.test.mjs
```

Expected: FAIL because actual Knowledge discovery is 48 while the exact expectation is 50. Actual Problem discovery remains 76. A failure caused by a changed post-012 slug is base drift, not the intended RED.

- [ ] **Step 4: Port only the three reviewed candidate files**

Run:

```bash
git_common_dir="$(cd "$(git rev-parse --git-common-dir)" && pwd -P)"
reviewed_report="$git_common_dir/quant-interview-013-reviewed-candidate-report.txt"
test -s "$reviewed_report"
test "$(grep -Ec '^Candidate commit: [0-9a-f]{40}$' "$reviewed_report")" -eq 1
test "$(grep -Ec '^Candidate implementation base: [0-9a-f]{40}$' "$reviewed_report")" -eq 1
candidate_sha="$(sed -nE 's/^Candidate commit: ([0-9a-f]{40})$/\1/p' "$reviewed_report")"
candidate_baseline_sha="$(sed -nE \
  's/^Candidate implementation base: ([0-9a-f]{40})$/\1/p' \
  "$reviewed_report")"
printf '%s' "$candidate_sha" | grep -Eq '^[0-9a-f]{40}$'
printf '%s' "$candidate_baseline_sha" | grep -Eq '^[0-9a-f]{40}$'
git fetch --no-tags origin "$candidate_sha"
test "$(git rev-parse FETCH_HEAD)" = "$candidate_sha"
expected_candidate_paths="$(printf '%s\n' \
  src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md \
  src/content/knowledge/concepts/structured-think-aloud-reasoning.md \
  tests/quant-interview-reasoning-communication-content.test.mjs)"
test "$(git diff --name-only "$candidate_baseline_sha" "$candidate_sha")" = \
  "$expected_candidate_paths"
git restore --source="$candidate_sha" --staged --worktree -- \
  src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md \
  src/content/knowledge/concepts/structured-think-aloud-reasoning.md \
  tests/quant-interview-reasoning-communication-content.test.mjs
for candidate_path in $expected_candidate_paths; do
  expected_blob="$(git rev-parse "${candidate_sha}:${candidate_path}")"
  printf '%s' "$expected_blob" | grep -Eq '^[0-9a-f]{40}$'
  test "$(git hash-object "$candidate_path")" = "$expected_blob"
done
```

Expected: the index gains exact blobs from the reported, reviewed candidate commit for the two new Knowledge pages and module-content test. No moving branch name is consulted, and the full reported implementation range has already proved that no fourth implementation path exists.

- [ ] **Step 5: Run the module and exact-registry tests to prove GREEN**

Run:

```bash
node --test tests/quant-interview-reasoning-communication-content.test.mjs
node --test --test-name-pattern="source-neutral regression discovers exactly" tests/quant-interview-source-neutral-content.test.mjs
npm run check
git diff --check
```

Expected: the module's four tests pass; exact discovery is `76 Problems / 50 Knowledge`; both new pages validate through the Astro schema; whitespace checks are clean.

- [ ] **Step 6: Review the exact integration surface**

Run:

```bash
expected_paths="$(printf '%s\n' \
  'src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md' \
  'src/content/knowledge/concepts/structured-think-aloud-reasoning.md' \
  'tests/quant-interview-reasoning-communication-content.test.mjs' \
  'tests/quant-interview-source-neutral-content.test.mjs')"
actual_paths="$(git status --porcelain=v1 --untracked-files=all | cut -c4-)"
test "$actual_paths" = "$expected_paths"
git add tests/quant-interview-source-neutral-content.test.mjs
test "$(git diff --cached --name-only HEAD)" = "$expected_paths"
test -z "$(git diff --name-only)"
git diff --cached --check
git diff --cached -- tests/quant-interview-source-neutral-content.test.mjs
```

Expected: the total Task 3 surface is exactly:

```text
src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md
src/content/knowledge/concepts/structured-think-aloud-reasoning.md
tests/quant-interview-reasoning-communication-content.test.mjs
tests/quant-interview-source-neutral-content.test.mjs
```

The source-neutral diff adds only the two exact Knowledge mappings, changes `48` to `50`, and changes the test name; the 76-entry Problem set remains byte-for-byte unchanged.

- [ ] **Step 7: Commit the public integration and exact registry**

```bash
git commit -m "feat: integrate reasoning communication knowledge"
test -z "$(git status --porcelain=v1 --untracked-files=all)"
```

Expected: one coordinator commit with the three reviewed candidate blobs and the exact `76/50` registry delta; the integration worktree is clean.

---

### Task 4: Coordinator — Reconcile Routing, Coverage, and the Active Workstream

**Files:**
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/coverage/red-book.json`
- Modify: `src/data/quant-interview/topics/source-topic-map.json`
- Create: `src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json`
- Create: `tests/quant-interview-reasoning-communication-workstream.test.mjs`
- Create: `tests/quant-interview-reasoning-communication-completion.test.mjs`
- Modify: `tests/quant-interview-parallel-workstream-governance.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`
- Modify: `tests/quant-interview-limits-derivatives-workstream.test.mjs`
- Modify: `tests/quant-interview-limits-derivatives-completion.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`

**Interfaces:**
- Consumes: the integrated public slugs from Task 3, current taxonomy, three source manifests, source-topic map, `validateTopicWorkstream(workstream, context)`, and `validateCoverageLedger(ledger, context)`.
- Produces: exact Green `knowledge-only` rows, exact Red `interview-guidance` reroute, zero 150 ownership, an active field-free 013 registration, strict complete-branch assertions, and a full-suite-green active HANDOFF/lifecycle transition.

- [ ] **Step 1: Write the coordinator workstream test before shared-state mutation**

Create `tests/quant-interview-reasoning-communication-workstream.test.mjs` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';
const handoffPath = 'docs/quant-interview/HANDOFF.md';
const temporaryArtifact =
  '.github/workflows/quant-interview-reasoning-communication-013-temporary.yml';
const commands = ['npm run test', 'npm run check', 'npm run build'];
const environments = new Set([
  'linux-native-lf-node24',
  'wsl-native-lf-node24',
]);
const shaPattern = /^[0-9a-f]{40}$/;
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;
const terminalStates = new Set([
  'canonical-problem',
  'merged-duplicate',
  'variant',
  'knowledge-only',
  'interview-guidance',
]);

const resolutionNotes = {
  green13:
    'Active listening, fact/constraint inventory, and the highest-impact clarification are preserved as public Interview Checks in the canonical framing Knowledge node.',
  green14:
    'Material reasoning, decisive-step explanation, concise narration, and feedback-driven revision are preserved as public Interview Checks in the canonical structured-reasoning Knowledge node.',
  green15:
    'Explicit provisional assumptions under incomplete information and feedback-driven model revision are preserved as public Interview Checks in the canonical framing Knowledge node.',
  red112:
    'Broad, date-sensitive preparation and self-assessment guidance is rerouted to interview-preparation as interview-guidance coverage only, with no public Problem or Knowledge target.',
};

const expectedCoverage = {
  'green-book': {
    '1.3::': {
      sourceSection: '1.3',
      sourceItem: null,
      canonicalTopics: ['reasoning-communication'],
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['problem-framing-clarification-assumption-management'],
      resolutionNote: resolutionNotes.green13,
    },
    '1.4::': {
      sourceSection: '1.4',
      sourceItem: null,
      canonicalTopics: ['reasoning-communication'],
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['structured-think-aloud-reasoning'],
      resolutionNote: resolutionNotes.green14,
    },
    '1.5::': {
      sourceSection: '1.5',
      sourceItem: null,
      canonicalTopics: ['reasoning-communication'],
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['problem-framing-clarification-assumption-management'],
      resolutionNote: resolutionNotes.green15,
    },
  },
  'red-book': {
    '1.12::': {
      sourceSection: '1.12',
      sourceItem: null,
      canonicalTopics: ['interview-preparation'],
      state: 'interview-guidance',
      canonicalProblems: [],
      canonicalKnowledge: [],
      resolutionNote: resolutionNotes.red112,
    },
  },
};

const expectedScopes = [
  {
    source: 'green-book',
    sourceSections: ['1.3', '1.4', '1.5'],
    evidencePageRanges: [{ startPage: 18, endPage: 18 }],
    reviewOutcome: 'bounded-item-level-review',
    reviewNote:
      'Three reusable reasoning-and-communication sections resolve as knowledge-only public checks.',
  },
  {
    source: 'red-book',
    sourceSections: ['1.12'],
    evidencePageRanges: [{ startPage: 25, endPage: 26 }],
    reviewOutcome: 'reclassified-to-interview-preparation-coverage-only',
    reviewNote:
      'The section is rerouted to interview-preparation as coverage-only interview guidance with no public target.',
  },
];

function mapEntry(sourceTopicMap, source, sourceSection) {
  return sourceTopicMap.entries.find(
    (entry) => entry.source === source && entry.sourceSection === sourceSection,
  );
}

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(
    files
      .filter((file) => String(file).endsWith('.md'))
      .map((file) => path.basename(String(file), '.md')),
  );
}

async function validatorContext() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson(
    'src/data/quant-interview/topics/source-topic-map.json',
  );
  const manifests = Object.fromEntries(
    await Promise.all(
      ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [
        source,
        await readJson(`src/data/quant-interview/${source}.json`),
      ]),
    ),
  );
  return { taxonomy, sourceTopicMap, manifests };
}

function currentTopicBlock(handoff) {
  return handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';
}

function coordinationBlock(handoff) {
  return handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';
}

function reservationState(handoff, ordinal) {
  const pattern = new RegExp(
    '\\|\\s*\\d+\\s*\\|\\s*' + ordinal + '\\s*\\|',
  );
  const row = coordinationBlock(handoff)
    .split(/\r?\n/)
    .find((line) => pattern.test(line));
  return row?.split('|').slice(1, -1).map((cell) =>
    cell.trim().replaceAll('`', ''),
  )[4] ?? '';
}

function completedBlock(handoff) {
  return handoff
    .split(/^## Completed cross-book workstream 13$/m)[1]
    ?.split(/^## /m)[0] ?? '';
}

async function assertAbsent(file) {
  await assert.rejects(access(file), (error) => error?.code === 'ENOENT');
}

async function assertStrictClosure(manifest, handoff) {
  assert.equal(manifest.status, 'complete');
  assert.equal(manifest.preClosureActiveGate?.status, 'active');
  assert.match(manifest.preClosureActiveGate?.commit ?? '', shaPattern);
  assert.equal(
    environments.has(manifest.preClosureActiveGate?.environment),
    true,
  );
  assert.deepEqual(manifest.preClosureActiveGate?.commands, commands);
  assert.equal(manifest.preClosureActiveGate?.conclusion, 'success');

  assert.equal(
    manifest.verification?.commit,
    manifest.preClosureActiveGate.commit,
  );
  assert.match(manifest.verification?.commit ?? '', shaPattern);
  assert.equal(
    Number.isInteger(manifest.verification?.runId) &&
      manifest.verification.runId > 0,
    true,
  );
  assert.deepEqual(manifest.verification?.commands, commands);
  assert.equal(manifest.verification?.conclusion, 'success');
  assert.deepEqual(manifest.verification?.temporaryArtifacts, [
    temporaryArtifact,
  ]);

  assert.equal(environments.has(manifest.finalTreeGate?.environment), true);
  assert.deepEqual(manifest.finalTreeGate?.commands, commands);
  assert.equal(manifest.finalTreeGate?.conclusion, 'success');
  assert.equal(manifest.finalTreeGate?.temporaryArtifactsAbsent, true);
  await assertAbsent(temporaryArtifact);

  const closure = completedBlock(handoff);
  assert.match(
    closure,
    /interview-strategy-communication-reasoning-communication-013/,
  );
  assert.match(closure, new RegExp(manifest.verification.commit));
  assert.match(closure, new RegExp(String(manifest.verification.runId)));
  assert.match(closure, new RegExp(manifest.preClosureActiveGate.environment));
  const commandPositions = commands.map((command) => closure.indexOf(command));
  assert.equal(commandPositions.every((position) => position >= 0), true);
  assert.equal(
    commandPositions.every(
      (position, index) => index === 0 || position > commandPositions[index - 1],
    ),
    true,
  );
  assert.match(closure, /conclusion: success/i);
  assert.match(
    closure,
    /76 (?:canonical )?Problems.*50 (?:explicitly topic-classified )?Knowledge/is,
  );
  assert.match(closure, /\+0 Problems.*\+2 Knowledge/is);
  assert.match(closure, /Green.*1\.3.*1\.4.*1\.5.*knowledge-only/is);
  assert.match(
    closure,
    /Red.*1\.12.*interview-preparation.*interview-guidance/is,
  );
  assert.match(closure, /150.*no (?:scope|map|coverage|ownership)/is);
  assert.equal(reservationState(handoff, '013'), 'complete');
  assert.match(
    currentTopicBlock(handoff),
    /No bounded topic is active.*011.*012.*013.*queue is closed/is,
  );
  assert.match(
    currentTopicBlock(handoff),
    /A later workstream requires its own approved design and evidence audit; no later workstream is complete or authorized by this closure\./i,
  );
  assert.doesNotMatch(currentTopicBlock(handoff), /workstream 014/i);
}

test('013 manifest has exact identity and two-source scope', async () => {
  const manifest = await readJson(manifestPath);
  assert.equal(
    manifest.id,
    'interview-strategy-communication-reasoning-communication-013',
  );
  assert.match(manifest.status, /^(?:active|complete)$/);
  assert.deepEqual(manifest.canonicalTopics, [
    'interview-strategy-communication',
    'reasoning-communication',
  ]);
  assert.deepEqual(manifest.sourceScopes, expectedScopes);
  assert.equal(
    manifest.sourceScopes.some(
      (scope) => scope.source === '150-most-frequently-asked',
    ),
    false,
  );
});

test('Green 1.3 through 1.5 have exact knowledge-only resolutions', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/green-book.json');
  const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));
  for (const [key, expected] of Object.entries(expectedCoverage['green-book'])) {
    assert.deepEqual(rows.get(key), expected);
  }
  const owned = ledger.entries
    .filter(
      (entry) =>
        entry.canonicalTopics?.includes('reasoning-communication') &&
        terminalStates.has(entry.state),
    )
    .map(keyOf)
    .sort();
  assert.deepEqual(owned, ['1.3::', '1.4::', '1.5::']);
});

test('Red 1.12 is interview-preparation guidance with no public target', async () => {
  const sourceTopicMap = await readJson(
    'src/data/quant-interview/topics/source-topic-map.json',
  );
  assert.deepEqual(mapEntry(sourceTopicMap, 'red-book', '1.12'), {
    source: 'red-book',
    sourceSection: '1.12',
    role: 'content',
    canonicalTopics: ['interview-preparation'],
  });
  for (const section of ['1.3', '1.4', '1.5']) {
    assert.deepEqual(mapEntry(sourceTopicMap, 'green-book', section), {
      source: 'green-book',
      sourceSection: section,
      role: 'content',
      canonicalTopics: ['reasoning-communication'],
    });
  }

  const ledger = await readJson('src/data/quant-interview/coverage/red-book.json');
  const row = ledger.entries.find((entry) => keyOf(entry) === '1.12::');
  assert.deepEqual(row, expectedCoverage['red-book']['1.12::']);
  assert.equal(
    ledger.entries.some(
      (entry) =>
        entry.canonicalTopics?.includes('reasoning-communication') &&
        terminalStates.has(entry.state),
    ),
    false,
  );
});

test('150 source has no reasoning communication map, coverage, or scope', async () => {
  const sourceTopicMap = await readJson(
    'src/data/quant-interview/topics/source-topic-map.json',
  );
  const ledger = await readJson(
    'src/data/quant-interview/coverage/150-most-frequently-asked.json',
  );
  const manifest = await readJson(manifestPath);
  assert.equal(
    sourceTopicMap.entries.some(
      (entry) =>
        entry.source === '150-most-frequently-asked' &&
        entry.canonicalTopics?.includes('reasoning-communication'),
    ),
    false,
  );
  assert.equal(
    ledger.entries.some((entry) =>
      entry.canonicalTopics?.includes('reasoning-communication')),
    false,
  );
  assert.equal(
    manifest.sourceScopes.some(
      (scope) => scope.source === '150-most-frequently-asked',
    ),
    false,
  );
});

test('workstream and affected ledgers validate with real public targets', async () => {
  const manifest = await readJson(manifestPath);
  const context = await validatorContext();
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateTopicWorkstream } = await import(
    '../src/lib/quantInterviewWorkstreams.mjs'
  );
  const { validateCoverageLedger } = await import(
    '../src/lib/quantInterviewCoverage.mjs'
  );
  assert.doesNotThrow(() => validateTopicWorkstream(manifest, context));
  for (const source of ['green-book', 'red-book']) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    assert.doesNotThrow(() =>
      validateCoverageLedger(ledger, {
        sourceTopicMap: context.sourceTopicMap,
        taxonomy: context.taxonomy,
        problemSlugs,
        knowledgeSlugs,
        allowUnresolvedCanonicalRefs: false,
      }),
    );
  }
});

test('workstream lifecycle is phase-safe', async () => {
  const manifest = await readJson(manifestPath);
  const handoff = await readFile(handoffPath, 'utf8');
  if (manifest.status === 'active') {
    assert.equal('preClosureActiveGate' in manifest, false);
    assert.equal('verification' in manifest, false);
    assert.equal('finalTreeGate' in manifest, false);
    assert.match(
      currentTopicBlock(handoff),
      /Interview Strategy & Communication.*Reasoning & Communication/is,
    );
    assert.equal(reservationState(handoff, '013'), 'active');
    assert.match(
      coordinationBlock(handoff),
      /013 remains active and no completion evidence is recorded\./i,
    );
    assert.equal(completedBlock(handoff), '');
    return;
  }
  await assertStrictClosure(manifest, handoff);
});
```

- [ ] **Step 2: Run the workstream test to prove RED**

Run:

```bash
node --test \
  --test-name-pattern="013 manifest has exact identity and two-source scope" \
  tests/quant-interview-reasoning-communication-workstream.test.mjs
```

Expected: the selected manifest test alone FAILS with `ENOENT` for `interview-strategy-communication-reasoning-communication-013.json`; every Green/Red/no-150/lifecycle test is skipped by the name filter. Do not describe the full-file output as a single missing-file failure or satisfy RED by weakening the read.

- [ ] **Step 3: Apply the one exact source-topic-map repair**

In `src/data/quant-interview/topics/source-topic-map.json`, replace only the existing Red `1.12` mapping:

```json
{
  "source": "red-book",
  "sourceSection": "1.12",
  "role": "content",
  "canonicalTopics": [
    "interview-preparation"
  ]
}
```

Green `1.3`, `1.4`, and `1.5` remain exactly mapped to `["reasoning-communication"]`. No other map entry changes.

- [ ] **Step 4: Replace the four existing pending coverage rows exactly**

In `src/data/quant-interview/coverage/green-book.json`, replace the existing `1.3`, `1.4`, and `1.5` entries with the three objects in this exact array:

```json
[
{
  "sourceSection": "1.3",
  "sourceItem": null,
  "canonicalTopics": [
    "reasoning-communication"
  ],
  "state": "knowledge-only",
  "canonicalProblems": [],
  "canonicalKnowledge": [
    "problem-framing-clarification-assumption-management"
  ],
  "resolutionNote": "Active listening, fact/constraint inventory, and the highest-impact clarification are preserved as public Interview Checks in the canonical framing Knowledge node."
},
{
  "sourceSection": "1.4",
  "sourceItem": null,
  "canonicalTopics": [
    "reasoning-communication"
  ],
  "state": "knowledge-only",
  "canonicalProblems": [],
  "canonicalKnowledge": [
    "structured-think-aloud-reasoning"
  ],
  "resolutionNote": "Material reasoning, decisive-step explanation, concise narration, and feedback-driven revision are preserved as public Interview Checks in the canonical structured-reasoning Knowledge node."
},
{
  "sourceSection": "1.5",
  "sourceItem": null,
  "canonicalTopics": [
    "reasoning-communication"
  ],
  "state": "knowledge-only",
  "canonicalProblems": [],
  "canonicalKnowledge": [
    "problem-framing-clarification-assumption-management"
  ],
  "resolutionNote": "Explicit provisional assumptions under incomplete information and feedback-driven model revision are preserved as public Interview Checks in the canonical framing Knowledge node."
}
]
```

In `src/data/quant-interview/coverage/red-book.json`, replace the existing `1.12` entry with:

```json
{
  "sourceSection": "1.12",
  "sourceItem": null,
  "canonicalTopics": [
    "interview-preparation"
  ],
  "state": "interview-guidance",
  "canonicalProblems": [],
  "canonicalKnowledge": [],
  "resolutionNote": "Broad, date-sensitive preparation and self-assessment guidance is rerouted to interview-preparation as interview-guidance coverage only, with no public Problem or Knowledge target."
}
```

Do not add `topicOverrideReason`: Red `1.12` is a section-level row aligned with its repaired section-level map.

- [ ] **Step 5: Create the pre-closure active manifest**

Create `src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json` exactly:

```json
{
  "id": "interview-strategy-communication-reasoning-communication-013",
  "status": "active",
  "canonicalTopics": [
    "interview-strategy-communication",
    "reasoning-communication"
  ],
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": [
        "1.3",
        "1.4",
        "1.5"
      ],
      "evidencePageRanges": [
        {
          "startPage": 18,
          "endPage": 18
        }
      ],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Three reusable reasoning-and-communication sections resolve as knowledge-only public checks."
    },
    {
      "source": "red-book",
      "sourceSections": [
        "1.12"
      ],
      "evidencePageRanges": [
        {
          "startPage": 25,
          "endPage": 26
        }
      ],
      "reviewOutcome": "reclassified-to-interview-preparation-coverage-only",
      "reviewNote": "The section is rerouted to interview-preparation as coverage-only interview guidance with no public target."
    }
  ]
}
```

The active object contains no `preClosureActiveGate`, `verification`, `finalTreeGate`, commit, run id, CI conclusion, or 150 source scope.

- [ ] **Step 6: Run the five non-lifecycle shared-state audits to prove bounded GREEN**

Run:

```bash
node --test tests/quant-interview-reasoning-communication-content.test.mjs
node --test \
  --test-name-pattern='^(?:013 manifest has exact identity and two-source scope|Green 1\.3 through 1\.5 have exact knowledge-only resolutions|Red 1\.12 is interview-preparation guidance with no public target|150 source has no reasoning communication map, coverage, or scope|workstream and affected ledgers validate with real public targets)$' \
  tests/quant-interview-reasoning-communication-workstream.test.mjs
node --test --test-name-pattern="source-neutral regression discovers exactly" tests/quant-interview-source-neutral-content.test.mjs
npm run check
git diff --check
```

Expected: the content test passes; exactly five named non-lifecycle workstream audits pass and `workstream lifecycle is phase-safe` is skipped because HANDOFF is intentionally still `design-audit`; both ledgers validate with `allowUnresolvedCanonicalRefs: false`; exact registry remains `76/50`; Astro and whitespace checks pass. This is a bounded audit checkpoint, not the full-suite GREEN gate. Step 8 proves the lifecycle RED, Step 10 makes HANDOFF active, and Step 11 is the first full workstream/full-suite GREEN run before any Task 4 commit.

- [ ] **Step 7: Create the strict phase-safe completion contract**

Create `tests/quant-interview-reasoning-communication-completion.test.mjs` exactly:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';
const handoffPath = 'docs/quant-interview/HANDOFF.md';
const temporaryArtifact =
  '.github/workflows/quant-interview-reasoning-communication-013-temporary.yml';
const commands = ['npm run test', 'npm run check', 'npm run build'];
const environments = new Set([
  'linux-native-lf-node24',
  'wsl-native-lf-node24',
]);
const shaPattern = /^[0-9a-f]{40}$/;

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

function currentTopicBlock(handoff) {
  return handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';
}

function coordinationBlock(handoff) {
  return handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';
}

function reservationState(handoff, ordinal) {
  const pattern = new RegExp(
    '\\|\\s*\\d+\\s*\\|\\s*' + ordinal + '\\s*\\|',
  );
  const row = coordinationBlock(handoff)
    .split(/\r?\n/)
    .find((line) => pattern.test(line));
  return row?.split('|').slice(1, -1).map((cell) =>
    cell.trim().replaceAll('`', ''),
  )[4] ?? '';
}

function completedBlock(handoff) {
  return handoff
    .split(/^## Completed cross-book workstream 13$/m)[1]
    ?.split(/^## /m)[0] ?? '';
}

async function assertAbsent(file) {
  await assert.rejects(access(file), (error) => error?.code === 'ENOENT');
}

test('013 completion contract is valid in active and complete phases', async () => {
  const manifest = await readJson(manifestPath);
  const handoff = await readFile(handoffPath, 'utf8');
  assert.match(manifest.status, /^(?:active|complete)$/);

  if (manifest.status === 'active') {
    assert.equal('preClosureActiveGate' in manifest, false);
    assert.equal('verification' in manifest, false);
    assert.equal('finalTreeGate' in manifest, false);
    assert.match(
      currentTopicBlock(handoff),
      /Interview Strategy & Communication.*Reasoning & Communication/is,
    );
    assert.equal(reservationState(handoff, '013'), 'active');
    assert.match(
      coordinationBlock(handoff),
      /013 remains active and no completion evidence is recorded\./i,
    );
    assert.equal(completedBlock(handoff), '');
    return;
  }

  assert.equal(manifest.status, 'complete');
  assert.equal(manifest.preClosureActiveGate?.status, 'active');
  assert.match(manifest.preClosureActiveGate?.commit ?? '', shaPattern);
  assert.equal(
    environments.has(manifest.preClosureActiveGate?.environment),
    true,
  );
  assert.deepEqual(manifest.preClosureActiveGate?.commands, commands);
  assert.equal(manifest.preClosureActiveGate?.conclusion, 'success');

  assert.equal(
    manifest.verification?.commit,
    manifest.preClosureActiveGate.commit,
  );
  assert.match(manifest.verification?.commit ?? '', shaPattern);
  assert.equal(
    Number.isInteger(manifest.verification?.runId) &&
      manifest.verification.runId > 0,
    true,
  );
  assert.deepEqual(manifest.verification?.commands, commands);
  assert.equal(manifest.verification?.conclusion, 'success');
  assert.deepEqual(manifest.verification?.temporaryArtifacts, [
    temporaryArtifact,
  ]);

  assert.equal(environments.has(manifest.finalTreeGate?.environment), true);
  assert.deepEqual(manifest.finalTreeGate?.commands, commands);
  assert.equal(manifest.finalTreeGate?.conclusion, 'success');
  assert.equal(manifest.finalTreeGate?.temporaryArtifactsAbsent, true);
  await assertAbsent(temporaryArtifact);

  const closure = completedBlock(handoff);
  assert.match(
    closure,
    /interview-strategy-communication-reasoning-communication-013/,
  );
  assert.match(closure, new RegExp(manifest.verification.commit));
  assert.match(closure, new RegExp(String(manifest.verification.runId)));
  assert.match(closure, new RegExp(manifest.preClosureActiveGate.environment));
  const commandPositions = commands.map((command) => closure.indexOf(command));
  assert.equal(commandPositions.every((position) => position >= 0), true);
  assert.equal(
    commandPositions.every(
      (position, index) => index === 0 || position > commandPositions[index - 1],
    ),
    true,
  );
  assert.match(closure, /conclusion: success/i);
  assert.match(
    closure,
    /76 (?:canonical )?Problems.*50 (?:explicitly topic-classified )?Knowledge/is,
  );
  assert.match(closure, /\+0 Problems.*\+2 Knowledge/is);
  assert.match(closure, /Green.*1\.3.*1\.4.*1\.5.*knowledge-only/is);
  assert.match(
    closure,
    /Red.*1\.12.*interview-preparation.*interview-guidance/is,
  );
  assert.match(closure, /150.*no (?:scope|map|coverage|ownership)/is);
  assert.equal(reservationState(handoff, '013'), 'complete');
  assert.match(
    currentTopicBlock(handoff),
    /No bounded topic is active.*011.*012.*013.*queue is closed/is,
  );
  assert.match(
    currentTopicBlock(handoff),
    /A later workstream requires its own approved design and evidence audit; no later workstream is complete or authorized by this closure\./i,
  );
  assert.doesNotMatch(currentTopicBlock(handoff), /workstream 014/i);
});
```

- [ ] **Step 8: Run the completion contract to prove the one active-HANDOFF RED**

Run:

```bash
node --test tests/quant-interview-reasoning-communication-completion.test.mjs
```

Expected: the sole test FAILS first at `assert.equal(reservationState(handoff, '013'), 'active')`, reporting expected `active` and actual `design-audit`. The inherited post-012 current-topic assertion has already passed; execution stops at this first mismatch, so do not claim a second missing-sentence failure from the same run.

- [ ] **Step 9: Reconcile governance, HANDOFF, and prior-012 transition tests**

In `tests/quant-interview-parallel-workstream-governance.test.mjs`, retain the exact normative policy object and topology tests. Replace the post-012 assertion that forbids a 013 manifest with this exact test and helpers:

```js
const manifest011Path =
  'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const manifest012Path =
  'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json';
const manifest013Path =
  'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';

const readWorkstream013Json = async (file) =>
  JSON.parse(await readFile(file, 'utf8'));

function currentBlock013(handoff) {
  return handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';
}

function coordination013(handoff) {
  return handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';
}

function state013(handoff) {
  const row = coordination013(handoff)
    .split(/\r?\n/)
    .find((line) => /\|\s*3\s*\|\s*013\s*\|/.test(line));
  return row?.split('|').slice(1, -1).map((cell) =>
    cell.trim().replaceAll('`', ''),
  )[4] ?? '';
}

test('serialized governance accepts only factual active or complete 013 state', async () => {
  const [workstream011, workstream012, workstream013, handoff] =
    await Promise.all([
      readWorkstream013Json(manifest011Path),
      readWorkstream013Json(manifest012Path),
      readWorkstream013Json(manifest013Path),
      readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
    ]);
  assert.equal(workstream011.status, 'complete');
  assert.equal(workstream012.status, 'complete');
  assert.match(workstream013.status, /^(?:active|complete)$/);

  if (workstream013.status === 'active') {
    assert.equal(state013(handoff), 'active');
    assert.match(
      currentBlock013(handoff),
      /Interview Strategy & Communication.*Reasoning & Communication/is,
    );
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 13$/m);
    return;
  }

  assert.equal(state013(handoff), 'complete');
  assert.match(handoff, /^## Completed cross-book workstream 13$/m);
  assert.match(
    currentBlock013(handoff),
    /No bounded topic is active.*011.*012.*013.*queue is closed/is,
  );
  assert.match(
    currentBlock013(handoff),
    /A later workstream requires its own approved design and evidence audit; no later workstream is complete or authorized by this closure\./i,
  );
  assert.doesNotMatch(currentBlock013(handoff), /workstream 014/i);
});
```

Do not edit `docs/quant-interview/parallel-workstream-policy.json`. Its fixed queue and reservations remain `011, 012, 013`; only the phase-aware repository-state assertion changes.

In `tests/quant-interview-handoff.test.mjs`, add:

```js
test('final parallel reservation is active or factually closed in HANDOFF', async () => {
  const manifest = JSON.parse(await readFile(
    'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json',
    'utf8',
  ));
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';
  const coordination =
    handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';
  const row = coordination
    .split(/\r?\n/)
    .find((line) => /\|\s*3\s*\|\s*013\s*\|/.test(line));
  const state = row?.split('|').slice(1, -1).map((cell) =>
    cell.trim().replaceAll('`', ''),
  )[4] ?? '';

  if (manifest.status === 'active') {
    assert.equal(state, 'active');
    assert.match(
      current,
      /Interview Strategy & Communication.*Reasoning & Communication/is,
    );
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 13$/m);
    return;
  }

  assert.equal(manifest.status, 'complete');
  assert.equal(state, 'complete');
  assert.match(handoff, /^## Completed cross-book workstream 13$/m);
  assert.match(current, /No bounded topic is active.*011.*012.*013.*queue is closed/is);
});
```

In both `tests/quant-interview-limits-derivatives-workstream.test.mjs` and `tests/quant-interview-limits-derivatives-completion.test.mjs`, remove only the stale unconditional assertion that 013 must remain the current next action forever. Paste this exact helper into each file and call `await assertPost012Transition(handoff);` from the existing post-012 complete branch:

```js
async function assertPost012Transition(handoff) {
  const workstream013 = JSON.parse(await readFile(
    'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json',
    'utf8',
  ));
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';
  if (workstream013.status === 'active') {
    assert.match(
      current,
      /Interview Strategy & Communication.*Reasoning & Communication/is,
    );
    return;
  }
  assert.equal(workstream013.status, 'complete');
  assert.match(current, /No bounded topic is active.*011.*012.*013.*queue is closed/is);
}
```

All historical 012 commit, run-id, `76/48`, and completion assertions stay unchanged.

- [ ] **Step 10: Put HANDOFF in the exact active state**

Preserve completed 011 and 012 sections and their factual evidence. Set `Updated: 2026-08-24`. Keep the current bounded topic exactly:

```markdown
Current bounded topic:

**Interview Strategy & Communication → Reasoning & Communication.**
```

In the parallel coordination table, require these exact rows:

```markdown
| 1 | 011 | `random-walks-markov-chains` | `chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23` | complete |
| 2 | 012 | `limits-derivatives` | `chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23` | complete |
| 3 | 013 | `reasoning-communication` | `chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23` | active |
```

Replace the post-012 queue sentence with these exact lines:

```text
Completed queue entries: 011, 012. Active integration queue entry: 013.
013 remains active and no completion evidence is recorded.
```

Do not add a completed-013 heading, verification SHA, run id, `76/50` closure claim, later topic, or queue advance in the active phase.

- [ ] **Step 11: Prove the whole active tree GREEN and audit its exact ownership surface**

Run:

```bash
node --test \
  tests/quant-interview-reasoning-communication-content.test.mjs \
  tests/quant-interview-reasoning-communication-workstream.test.mjs \
  tests/quant-interview-reasoning-communication-completion.test.mjs \
  tests/quant-interview-source-neutral-content.test.mjs \
  tests/quant-interview-parallel-workstream-governance.test.mjs \
  tests/quant-interview-handoff.test.mjs \
  tests/quant-interview-limits-derivatives-workstream.test.mjs \
  tests/quant-interview-limits-derivatives-completion.test.mjs
npm run test
npm run check
npm run build
expected_paths="$(printf '%s\n' \
  'docs/quant-interview/HANDOFF.md' \
  'src/data/quant-interview/coverage/green-book.json' \
  'src/data/quant-interview/coverage/red-book.json' \
  'src/data/quant-interview/topics/source-topic-map.json' \
  'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json' \
  'tests/quant-interview-handoff.test.mjs' \
  'tests/quant-interview-limits-derivatives-completion.test.mjs' \
  'tests/quant-interview-limits-derivatives-workstream.test.mjs' \
  'tests/quant-interview-parallel-workstream-governance.test.mjs' \
  'tests/quant-interview-reasoning-communication-completion.test.mjs' \
  'tests/quant-interview-reasoning-communication-workstream.test.mjs')"
actual_paths="$(git status --porcelain=v1 --untracked-files=all | cut -c4-)"
test "$actual_paths" = "$expected_paths"
git add -- $expected_paths
test "$(git diff --cached --name-only HEAD)" = "$expected_paths"
test -z "$(git diff --name-only)"
git diff --cached --check
git diff --cached -- docs/quant-interview/parallel-workstream-policy.json
```

Expected: every targeted test and the full ordered repository gates pass; the exact status allowlist contains only the eleven Task 4 paths; all changes are staged, whitespace is clean, and the normative policy diff is empty. There is no known red test at this gate.

- [ ] **Step 12: Commit the independently green active shared-state gate**

```bash
git commit -m "test: integrate active reasoning communication evidence"
test -z "$(git status --porcelain=v1 --untracked-files=all)"
```

Expected: one corrective-history-safe coordinator commit contains active shared state, strict active/complete lifecycle contracts, and the factual active HANDOFF transition; its complete test suite is green.

---

### Task 5: Coordinator — Build the Exact Active CI Target and Preserve Its Evidence

**Files:**
- Create temporarily: `.github/workflows/quant-interview-reasoning-communication-013-temporary.yml`

**Interfaces:**
- Consumes: Task 4's clean, full-suite-green active commit with field-free manifest, strict lifecycle contracts, and active HANDOFF state.
- Produces: one separately reviewable active CI-target commit plus `quant-interview-013-active-evidence.json` in the Git common directory, containing a validated 40-hex active SHA, qualified environment, positive real run id, exact ordered commands, and successful Ubuntu/Node 24 conclusions.

- [ ] **Step 1: Prove the approved temporary workflow is absent**

Run this single failing file assertion before creating CI scaffolding:

```bash
test -e .github/workflows/quant-interview-reasoning-communication-013-temporary.yml
```

Expected: FAIL with exit status 1 because the exact approved path does not exist. If it succeeds, stop and inspect the unexpected pre-existing workflow instead of overwriting it.

- [ ] **Step 2: Create the one temporary Ubuntu/Node 24 workflow**

Create `.github/workflows/quant-interview-reasoning-communication-013-temporary.yml` exactly:

```yaml
name: Quant Interview Reasoning Communication 013 Temporary CI

on:
  push:
    branches:
      - chatgpt/quant-interview-integration-reasoning-communication-2026-08-24
  workflow_dispatch:

permissions:
  contents: read

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Set up Node 24
        uses: actions/setup-node@v5
        with:
          node-version: 24
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Test
        run: npm run test
      - name: Check
        run: npm run check
      - name: Build
        run: npm run build
```

This branch-scoped file is evidence scaffolding, not a product workflow, and Task 6 must delete it.

- [ ] **Step 3: Prove the complete active tree GREEN**

Run from the qualified native-Linux or WSL-native checkout:

```bash
case "$PWD" in /mnt/*) exit 1 ;; esac
test "$(node --version | cut -d. -f1)" = "v24"
test -z "$(git grep -Il $'\r')"
node --test \
  tests/quant-interview-reasoning-communication-workstream.test.mjs \
  tests/quant-interview-reasoning-communication-completion.test.mjs
npm run test
npm run check
npm run build
git diff --check
```

Expected: both phase-safe test files select their active branches; every repository gate passes on Node 24 in an LF-only native checkout; the manifest remains field-free and `active`.

- [ ] **Step 4: Audit and stage the exact active-CI surface**

Run:

```bash
expected_paths="$(printf '%s\n' \
  '.github/workflows/quant-interview-reasoning-communication-013-temporary.yml')"
actual_paths="$(git status --porcelain=v1 --untracked-files=all | cut -c4-)"
test "$actual_paths" = "$expected_paths"
git add .github/workflows/quant-interview-reasoning-communication-013-temporary.yml
test "$(git diff --cached --name-only HEAD)" = "$expected_paths"
test -z "$(git diff --name-only)"
git diff --cached --check
git diff --cached HEAD -- .github/workflows
```

Expected: complete repository status and the staged HEAD comparison contain exactly the one approved workflow; the workflow diff has no second path.

- [ ] **Step 5: Commit the active integrated CI target**

```bash
git commit -m "test: gate active reasoning communication CI"
test -z "$(git status --porcelain=v1 --untracked-files=all)"
```

Expected: a clean active commit contains only the temporary Ubuntu/Node 24 workflow. Task 4 remains an independently green parent commit.

- [ ] **Step 6: Run authoritative gates and persist the exact active tuple**

Run:

```bash
active_sha="$(git rev-parse HEAD)"
printf '%s' "$active_sha" | grep -Eq '^[0-9a-f]{40}$'
case "$PWD" in /mnt/*) exit 1 ;; esac
test "$(node --version | cut -d. -f1)" = "v24"
test -z "$(git grep -Il $'\r')"
test -z "$(git status --porcelain=v1 --untracked-files=all)"
if grep -qi microsoft /proc/version; then
  gate_environment=wsl-native-lf-node24
else
  gate_environment=linux-native-lf-node24
fi
printf '%s' "$gate_environment" | \
  grep -Eq '^(linux-native-lf-node24|wsl-native-lf-node24)$'
npm run test
npm run check
npm run build
test -z "$(git status --porcelain=v1 --untracked-files=all)"
git_common_dir="$(cd "$(git rev-parse --git-common-dir)" && pwd -P)"
evidence_file="$git_common_dir/quant-interview-013-active-evidence.json"
ACTIVE_SHA="$active_sha" \
GATE_ENVIRONMENT="$gate_environment" \
EVIDENCE_FILE="$evidence_file" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';

const activeSha = process.env.ACTIVE_SHA;
const gateEnvironment = process.env.GATE_ENVIRONMENT;
assert.match(activeSha, /^[0-9a-f]{40}$/);
assert.match(
  gateEnvironment,
  /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/,
);
const evidence = {
  activeSha,
  gateEnvironment,
  commands: ['npm run test', 'npm run check', 'npm run build'],
  activeGateConclusion: 'success',
};
writeFileSync(
  process.env.EVIDENCE_FILE,
  JSON.stringify(evidence, null, 2) + '\n',
);
NODE
cat "$evidence_file"
```

Expected: the committed active SHA passes all ordered gates without mutating the tree, and the external evidence JSON contains that exact nonempty SHA, one allowed environment, exact commands, and `success`. The file lives under Git metadata and never enters repository status.

- [ ] **Step 7: Push that exact object, verify real CI, and extend the evidence file**

Run:

```bash
git_common_dir="$(cd "$(git rev-parse --git-common-dir)" && pwd -P)"
evidence_file="$git_common_dir/quant-interview-013-active-evidence.json"
test -s "$evidence_file"
active_sha="$(node -p \
  "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')).activeSha" \
  "$evidence_file")"
printf '%s' "$active_sha" | grep -Eq '^[0-9a-f]{40}$'
test "$(git rev-parse HEAD)" = "$active_sha"
git push origin \
  "${active_sha}:refs/heads/chatgpt/quant-interview-integration-reasoning-communication-2026-08-24"
workflow_file='quant-interview-reasoning-communication-013-temporary.yml'
workflow_name='Quant Interview Reasoning Communication 013 Temporary CI'
integration_ref='chatgpt/quant-interview-integration-reasoning-communication-2026-08-24'
run_id=''
for attempt in $(seq 1 36); do
  runs_json="$(gh run list \
    --workflow "$workflow_file" \
    --branch "$integration_ref" \
    --commit "$active_sha" \
    --event push \
    --limit 20 \
    --json databaseId,headSha,headBranch,workflowName)"
  run_id="$(RUNS_JSON="$runs_json" \
    ACTIVE_SHA="$active_sha" \
    INTEGRATION_REF="$integration_ref" \
    WORKFLOW_NAME="$workflow_name" \
    node --input-type=module <<'NODE'
const runs = JSON.parse(process.env.RUNS_JSON);
const match = runs.find((run) =>
  run.headSha === process.env.ACTIVE_SHA &&
  run.headBranch === process.env.INTEGRATION_REF &&
  run.workflowName === process.env.WORKFLOW_NAME &&
  Number.isInteger(run.databaseId) &&
  run.databaseId > 0
);
if (match) process.stdout.write(String(match.databaseId));
NODE
)"
  if printf '%s' "$run_id" | grep -Eq '^[1-9][0-9]*$'; then
    break
  fi
  sleep 10
done
printf '%s' "$run_id" | grep -Eq '^[1-9][0-9]*$'
run_identity_json="$(gh run view "$run_id" \
  --json databaseId,headSha,headBranch,workflowName)"
RUN_ID="$run_id" \
ACTIVE_SHA="$active_sha" \
INTEGRATION_REF="$integration_ref" \
WORKFLOW_NAME="$workflow_name" \
RUN_IDENTITY_JSON="$run_identity_json" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';

const run = JSON.parse(process.env.RUN_IDENTITY_JSON);
const runId = Number(process.env.RUN_ID);
assert.equal(Number.isInteger(runId) && runId > 0, true);
assert.equal(run.databaseId, runId);
assert.equal(run.headSha, process.env.ACTIVE_SHA);
assert.equal(run.headBranch, process.env.INTEGRATION_REF);
assert.equal(run.workflowName, process.env.WORKFLOW_NAME);
NODE
gh run watch "$run_id" --exit-status
run_json="$(gh run view "$run_id" \
  --json databaseId,headSha,headBranch,conclusion,jobs,workflowName)"
RUN_JSON="$run_json" \
ACTIVE_SHA="$active_sha" \
RUN_ID="$run_id" \
INTEGRATION_REF="$integration_ref" \
WORKFLOW_NAME="$workflow_name" \
EVIDENCE_FILE="$evidence_file" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const run = JSON.parse(process.env.RUN_JSON);
const evidence = JSON.parse(readFileSync(process.env.EVIDENCE_FILE, 'utf8'));
const activeSha = process.env.ACTIVE_SHA;
const runId = Number(process.env.RUN_ID);
assert.match(activeSha, /^[0-9a-f]{40}$/);
assert.equal(Number.isInteger(runId) && runId > 0, true);
assert.equal(evidence.activeSha, activeSha);
assert.equal(run.databaseId, runId);
assert.equal(run.headSha, activeSha);
assert.equal(run.headBranch, process.env.INTEGRATION_REF);
assert.equal(run.workflowName, process.env.WORKFLOW_NAME);
assert.equal(run.conclusion, 'success');
const required = [
  'Set up Node 24',
  'Install dependencies',
  'Test',
  'Check',
  'Build',
];
const steps = run.jobs.flatMap((job) => job.steps ?? []);
const observed = steps.filter((step) => required.includes(step.name));
assert.deepEqual(observed.map((step) => step.name), required);
assert.deepEqual(
  observed.map((step) => step.conclusion),
  required.map(() => 'success'),
);
const updated = {
  ...evidence,
  runId,
  ciHeadSha: run.headSha,
  ciConclusion: run.conclusion,
  ciPlatform: 'ubuntu-latest-node24',
};
writeFileSync(
  process.env.EVIDENCE_FILE,
  JSON.stringify(updated, null, 2) + '\n',
);
NODE
test -z "$(git status --porcelain=v1 --untracked-files=all)"
cat "$evidence_file"
```

Expected: the bounded six-minute poll discovers a positive real GitHub Actions database id only for the exact workflow name, integration branch, and validated active SHA; a pre-watch identity query reasserts that tuple before `gh run watch`. The successful run's `headSha` still equals the validated active SHA; the Ubuntu workflow's Node 24 setup, `npm ci`, test, check, and build steps appear in exact order and all succeed. A timeout or any workflow, branch, SHA, conclusion, or step mismatch blocks progress. The manifest remains `active` and field-free, the repository remains clean, and the external evidence file now holds the complete factual tuple.

---

### Task 6: Coordinator — Remove Temporary CI, Record Factual Closure, and Verify the Final Tree

**Files:**
- Modify: `src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Delete: `.github/workflows/quant-interview-reasoning-communication-013-temporary.yml`

**Interfaces:**
- Consumes: `quant-interview-013-active-evidence.json` from the Git common directory; its validated fields are `activeSha: string`, `gateEnvironment: string`, `commands: string[]`, `activeGateConclusion: "success"`, `runId: positive integer`, `ciHeadSha: string`, `ciConclusion: "success"`, and `ciPlatform: "ubuntu-latest-node24"`.
- Produces: executable, fact-pinned manifest/HANDOFF closure; a closed `011 → 012 → 013` queue; deletion of the only temporary artifact; and fresh passing post-removal and final committed-tree gates.

- [ ] **Step 1: Prove a status-only completion is rejected**

Using `apply_patch`, change only the active manifest line from `"status": "active",` to:

```text
"status": "complete",
```

Run only the strict completion-contract test:

```bash
node --test \
  --test-name-pattern="013 completion contract is valid in active and complete phases" \
  tests/quant-interview-reasoning-communication-completion.test.mjs
```

Expected: FAIL first at `assert.equal(manifest.preClosureActiveGate?.status, 'active')` with actual `undefined` and expected `active`. The name filter selects one test, and assertion execution stops at this first missing active-gate fact; do not describe later evidence failures as output from this run.

- [ ] **Step 2: Restore active state and re-prove the active lifecycle**

Using `apply_patch`, restore exactly:

```text
"status": "active",
```

Run:

```bash
node --test \
  tests/quant-interview-reasoning-communication-workstream.test.mjs \
  tests/quant-interview-reasoning-communication-completion.test.mjs
git diff --check
test -z "$(git status --porcelain=v1 --untracked-files=all)"
```

Expected: both active branches pass, the manifest again has no completion-only fields, the temporary workflow still exists in `HEAD`, and the repository status is clean—there is no manifest diff from the reversible RED probe.

- [ ] **Step 3: Reacquire and revalidate every active/CI fact**

Run:

```bash
git_common_dir="$(cd "$(git rev-parse --git-common-dir)" && pwd -P)"
evidence_file="$git_common_dir/quant-interview-013-active-evidence.json"
test -s "$evidence_file"
EVIDENCE_FILE="$evidence_file" node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const commands = ['npm run test', 'npm run check', 'npm run build'];
const evidence = JSON.parse(readFileSync(process.env.EVIDENCE_FILE, 'utf8'));
assert.match(evidence.activeSha, /^[0-9a-f]{40}$/);
assert.match(
  evidence.gateEnvironment,
  /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/,
);
assert.deepEqual(evidence.commands, commands);
assert.equal(evidence.activeGateConclusion, 'success');
assert.equal(Number.isInteger(evidence.runId) && evidence.runId > 0, true);
assert.equal(evidence.ciHeadSha, evidence.activeSha);
assert.equal(evidence.ciConclusion, 'success');
assert.equal(evidence.ciPlatform, 'ubuntu-latest-node24');
NODE
active_sha="$(node -p \
  "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')).activeSha" \
  "$evidence_file")"
run_id="$(node -p \
  "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')).runId" \
  "$evidence_file")"
printf '%s' "$active_sha" | grep -Eq '^[0-9a-f]{40}$'
printf '%s' "$run_id" | grep -Eq '^[1-9][0-9]*$'
test "$(git rev-parse HEAD)" = "$active_sha"
run_json="$(gh run view "$run_id" --json databaseId,headSha,conclusion)"
RUN_JSON="$run_json" ACTIVE_SHA="$active_sha" RUN_ID="$run_id" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';

const run = JSON.parse(process.env.RUN_JSON);
const activeSha = process.env.ACTIVE_SHA;
const runId = Number(process.env.RUN_ID);
assert.match(activeSha, /^[0-9a-f]{40}$/);
assert.equal(Number.isInteger(runId) && runId > 0, true);
assert.equal(run.databaseId, runId);
assert.equal(run.headSha, activeSha);
assert.equal(run.conclusion, 'success');
NODE
test -z "$(git status --porcelain=v1 --untracked-files=all)"
```

Expected: every value is read afresh from the external JSON, validated before comparison, and confirmed against the real GitHub run. No shell value from Task 5 is assumed to survive.

- [ ] **Step 4: Delete temporary CI and record fresh active post-removal gates**

Run from the same qualified checkout:

```bash
git rm -- .github/workflows/quant-interview-reasoning-communication-013-temporary.yml
test ! -e .github/workflows/quant-interview-reasoning-communication-013-temporary.yml
git diff HEAD -- .github/workflows
case "$PWD" in /mnt/*) exit 1 ;; esac
test "$(node --version | cut -d. -f1)" = "v24"
test -z "$(git grep -Il $'\r')"
if grep -qi microsoft /proc/version; then
  final_environment=wsl-native-lf-node24
else
  final_environment=linux-native-lf-node24
fi
printf '%s' "$final_environment" | \
  grep -Eq '^(linux-native-lf-node24|wsl-native-lf-node24)$'
npm run test
npm run check
npm run build
git diff --check
git_common_dir="$(cd "$(git rev-parse --git-common-dir)" && pwd -P)"
evidence_file="$git_common_dir/quant-interview-013-active-evidence.json"
test -s "$evidence_file"
FINAL_ENVIRONMENT="$final_environment" \
EVIDENCE_FILE="$evidence_file" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const commands = ['npm run test', 'npm run check', 'npm run build'];
const evidence = JSON.parse(readFileSync(process.env.EVIDENCE_FILE, 'utf8'));
const environment = process.env.FINAL_ENVIRONMENT;
assert.match(evidence.activeSha, /^[0-9a-f]{40}$/);
assert.equal(Number.isInteger(evidence.runId) && evidence.runId > 0, true);
assert.equal(evidence.ciHeadSha, evidence.activeSha);
assert.equal(evidence.ciConclusion, 'success');
assert.match(
  environment,
  /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/,
);
const updated = {
  ...evidence,
  finalTreeGate: {
    environment,
    commands,
    conclusion: 'success',
    temporaryArtifactsAbsent: true,
  },
};
writeFileSync(
  process.env.EVIDENCE_FILE,
  JSON.stringify(updated, null, 2) + '\n',
);
NODE
cat "$evidence_file"
```

Expected: `git diff HEAD -- .github/workflows` shows deletion of only the approved 013 file; all three gates pass while the manifest and HANDOFF are still active; the external evidence gains exact fresh final-tree facts only after the file is absent.

- [ ] **Step 5: Write the complete manifest from validated evidence**

Run this executable transform:

```bash
git_common_dir="$(cd "$(git rev-parse --git-common-dir)" && pwd -P)"
evidence_file="$git_common_dir/quant-interview-013-active-evidence.json"
test -s "$evidence_file"
MANIFEST_PATH="src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json" \
EVIDENCE_FILE="$evidence_file" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const commands = ['npm run test', 'npm run check', 'npm run build'];
const temporaryArtifact =
  '.github/workflows/quant-interview-reasoning-communication-013-temporary.yml';
const manifestPath = process.env.MANIFEST_PATH;
const evidence = JSON.parse(readFileSync(process.env.EVIDENCE_FILE, 'utf8'));
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

assert.equal(
  manifest.id,
  'interview-strategy-communication-reasoning-communication-013',
);
assert.equal(manifest.status, 'active');
assert.deepEqual(manifest.canonicalTopics, [
  'interview-strategy-communication',
  'reasoning-communication',
]);
assert.equal(Object.hasOwn(manifest, 'preClosureActiveGate'), false);
assert.equal(Object.hasOwn(manifest, 'verification'), false);
assert.equal(Object.hasOwn(manifest, 'finalTreeGate'), false);
assert.match(evidence.activeSha, /^[0-9a-f]{40}$/);
assert.match(
  evidence.gateEnvironment,
  /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/,
);
assert.deepEqual(evidence.commands, commands);
assert.equal(evidence.activeGateConclusion, 'success');
assert.equal(Number.isInteger(evidence.runId) && evidence.runId > 0, true);
assert.equal(evidence.ciHeadSha, evidence.activeSha);
assert.equal(evidence.ciConclusion, 'success');
assert.equal(evidence.ciPlatform, 'ubuntu-latest-node24');
assert.match(
  evidence.finalTreeGate?.environment,
  /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/,
);
assert.deepEqual(evidence.finalTreeGate?.commands, commands);
assert.equal(evidence.finalTreeGate?.conclusion, 'success');
assert.equal(evidence.finalTreeGate?.temporaryArtifactsAbsent, true);

manifest.status = 'complete';
manifest.preClosureActiveGate = {
  status: 'active',
  commit: evidence.activeSha,
  environment: evidence.gateEnvironment,
  commands,
  conclusion: 'success',
};
manifest.verification = {
  commit: evidence.activeSha,
  runId: evidence.runId,
  commands,
  conclusion: 'success',
  temporaryArtifacts: [temporaryArtifact],
};
manifest.finalTreeGate = {
  environment: evidence.finalTreeGate.environment,
  commands,
  conclusion: 'success',
  temporaryArtifactsAbsent: true,
};
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
NODE
```

Expected: the transform starts only from an exact field-free `active` manifest, validates every factual value, preserves identity and source scopes, and writes concrete JSON values—never shell names, empty strings, or a closure commit.

- [ ] **Step 6: Write the exact factual HANDOFF closure from the manifest**

Run this executable transform:

```bash
MANIFEST_PATH="src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json" \
HANDOFF_PATH="docs/quant-interview/HANDOFF.md" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(process.env.MANIFEST_PATH, 'utf8'));
let handoff = readFileSync(process.env.HANDOFF_PATH, 'utf8');
const commit = manifest.verification?.commit;
const runId = manifest.verification?.runId;
const environment = manifest.preClosureActiveGate?.environment;
assert.equal(manifest.status, 'complete');
assert.match(commit, /^[0-9a-f]{40}$/);
assert.equal(Number.isInteger(runId) && runId > 0, true);
assert.match(
  environment,
  /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/,
);

const closure = [
  '## Completed cross-book workstream 13',
  '',
  '`interview-strategy-communication-reasoning-communication-013`',
  '',
  'Scope: **Interview Strategy & Communication → Reasoning & Communication**.',
  '',
  'Active integrated verification:',
  '',
  '- commit `' + commit + '`',
  '- GitHub Actions run `' + runId + '`',
  '- environment: `' + environment + '`',
  '- commands: `npm run test`, `npm run check`, `npm run build`',
  '- conclusion: success',
  '- CI platform: Ubuntu with Node 24; `head_sha` matched the active commit.',
  '',
  'Final clean-tree verification:',
  '',
  '- the temporary workflow was removed before the fresh gates',
  '- commands: `npm run test`, `npm run check`, `npm run build`',
  '- conclusion: success',
  '',
  'Canonical Knowledge:',
  '',
  '- `problem-framing-clarification-assumption-management`',
  '- `structured-think-aloud-reasoning`',
  '',
  'The two Knowledge nodes link reciprocally; no pre-existing public page was edited.',
  'The exact public delta is **+0 Problems / +2 Knowledge**.',
  'The exact integrated corpus is **76 canonical Problems / 50 explicitly topic-classified Knowledge**.',
  'Green `1.3`, `1.4`, and `1.5` are `knowledge-only` with their exact approved Knowledge targets and no Problem targets.',
  'Red `1.12` is `interview-preparation` / `interview-guidance` with no public target.',
  'The 150 source has no scope, map, coverage, or ownership delta.',
  'The temporary workflow `.github/workflows/quant-interview-reasoning-communication-013-temporary.yml` was removed.',
].join('\n');

const insertionMarker = '\n## Verified source state\n';
assert.equal(handoff.split(insertionMarker).length - 1, 1);
assert.equal(
  (handoff.match(/^## Completed cross-book workstream 13$/gm) ?? []).length,
  0,
);
handoff = handoff.replace(
  insertionMarker,
  '\n' + closure + '\n\n## Verified source state\n',
);

const currentHeadingPattern = /^Current bounded topic:\r?$/gm;
assert.equal([...handoff.matchAll(currentHeadingPattern)].length, 1);
const currentPattern =
  /^Current bounded topic:\r?\n[\s\S]*?(?=^## Parallel workstream coordination\r?$)/gm;
assert.equal([...handoff.matchAll(currentPattern)].length, 1);
const closedCurrent = [
  'Current bounded topic:',
  '',
  '**No bounded topic is active. The serialized 011 → 012 → 013 queue is closed.**',
  '',
  'A later workstream requires its own approved design and evidence audit; no later workstream is complete or authorized by this closure.',
].join('\n');
handoff = handoff.replace(currentPattern, closedCurrent + '\n\n');
const exactClosedCurrentPattern =
  /^Current bounded topic:\n\n\*\*No bounded topic is active\. The serialized 011 → 012 → 013 queue is closed\.\*\*\n\nA later workstream requires its own approved design and evidence audit; no later workstream is complete or authorized by this closure\.\n\n(?=^## Parallel workstream coordination$)/gm;
assert.equal([...handoff.matchAll(currentHeadingPattern)].length, 1);
assert.equal([...handoff.matchAll(exactClosedCurrentPattern)].length, 1);

const activeRow =
  '| 3 | 013 | `reasoning-communication` | `chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23` | active |';
const completeRow =
  '| 3 | 013 | `reasoning-communication` | `chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23` | complete |';
assert.equal(handoff.split(activeRow).length - 1, 1);
handoff = handoff.replace(activeRow, completeRow);

const activeQueue = [
  'Completed queue entries: 011, 012. Active integration queue entry: 013.',
  '013 remains active and no completion evidence is recorded.',
].join('\n');
const closedQueue =
  'Completed queue entries: 011, 012, 013. Remaining integration queue: none.';
assert.equal(handoff.split(activeQueue).length - 1, 1);
handoff = handoff.replace(activeQueue, closedQueue);
writeFileSync(process.env.HANDOFF_PATH, handoff);
NODE
```

Expected: the script refuses missing/duplicate anchors; inserts one factual completed-13 section; changes only reservation 013 from `active` to `complete`; removes the active-only sentence; closes the exhausted queue; and does not authorize, name, or complete a later workstream.

- [ ] **Step 7: Prove complete-phase GREEN on the post-removal tree**

Run:

```bash
test ! -e .github/workflows/quant-interview-reasoning-communication-013-temporary.yml
node --test \
  tests/quant-interview-reasoning-communication-content.test.mjs \
  tests/quant-interview-reasoning-communication-workstream.test.mjs \
  tests/quant-interview-reasoning-communication-completion.test.mjs \
  tests/quant-interview-source-neutral-content.test.mjs \
  tests/quant-interview-parallel-workstream-governance.test.mjs \
  tests/quant-interview-handoff.test.mjs \
  tests/quant-interview-limits-derivatives-workstream.test.mjs \
  tests/quant-interview-limits-derivatives-completion.test.mjs
npm run test
npm run check
npm run build
git diff --check
```

Expected: both 013 test families select their complete branches and directly enforce the 40-hex active SHA, positive run id, exact commands/conclusions, pre-closure active gate, final-tree evidence, HANDOFF equality, and temporary-artifact absence; all repository gates pass.

- [ ] **Step 8: Audit and stage the exact closure surface**

Run:

```bash
expected_paths="$(printf '%s\n' \
  '.github/workflows/quant-interview-reasoning-communication-013-temporary.yml' \
  'docs/quant-interview/HANDOFF.md' \
  'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json')"
actual_paths="$(git status --porcelain=v1 --untracked-files=all | cut -c4-)"
test "$actual_paths" = "$expected_paths"
git add \
  docs/quant-interview/HANDOFF.md \
  src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json
test "$(git diff --cached --name-only HEAD)" = "$expected_paths"
test -z "$(git diff --name-only)"
git diff HEAD -- .github/workflows
git diff --cached HEAD -- .github/workflows
git diff --cached --check
```

Expected: full status and the complete staged HEAD comparison contain exactly one manifest modification, one HANDOFF modification, and deletion of the approved workflow. Both required workflow comparisons show that single deletion and no second workflow path.

- [ ] **Step 9: Commit factual closure without rewriting the active commit**

```bash
git commit -m "chore: close reasoning communication workstream"
test -z "$(git status --porcelain=v1 --untracked-files=all)"
active_sha="$(node -p \
  "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')).verification.commit" \
  src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json)"
closure_sha="$(git rev-parse HEAD)"
printf '%s' "$active_sha" | grep -Eq '^[0-9a-f]{40}$'
printf '%s' "$closure_sha" | grep -Eq '^[0-9a-f]{40}$'
test "$closure_sha" != "$active_sha"
```

Expected: a distinct closure commit records exact metadata/HANDOFF facts and deletes temporary CI. The earlier active commit remains intact as the real CI-tested commit.

- [ ] **Step 10: Run fresh final verification on the committed tree**

Run from the qualified checkout:

```bash
case "$PWD" in /mnt/*) exit 1 ;; esac
test "$(node --version | cut -d. -f1)" = "v24"
test -z "$(git grep -Il $'\r')"
test ! -e .github/workflows/quant-interview-reasoning-communication-013-temporary.yml
test -z "$(git status --porcelain=v1 --untracked-files=all)"
npm run test
npm run check
npm run build
git diff --check HEAD^ HEAD
test -z "$(git status --porcelain=v1 --untracked-files=all)"
git log -2 --format='%H %s'
```

Expected: the final committed tree freshly passes all three ordered gates after completion recording; it remains clean and LF-only; the latest two commits show a distinct closure commit above the unchanged active CI-tested commit. Do not merge to `main` or rewrite either commit as part of this plan.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-24-quant-interview-reasoning-communication.md`. Two execution options:

1. **Subagent-Driven (recommended)** — Use `superpowers:subagent-driven-development`, dispatch a fresh subagent for each task, and perform two-stage review between tasks.
2. **Inline Execution** — Use `superpowers:executing-plans` in this session, execute in batches, and stop at the documented review checkpoints.

Which approach?
