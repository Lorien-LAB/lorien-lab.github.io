# Quant Interview Preparation: Breadth, Basics & Deliberate Practice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Process the first two pending master records into one source-neutral Interview Preparation Knowledge page and close workstream 014 at exactly 76 Problems / 51 Knowledge.

**Architecture:** One canonical Knowledge page owns both Green guidance records. Content, catalog, reciprocal relationships, master state, legacy coverage, and an active workstream manifest are implemented under focused RED/GREEN tests; an exact active commit then receives WSL Node 24 and GitHub Actions evidence before a separate workflow-free closure commit.

**Tech Stack:** Astro 5 Markdown content collections, JSON repository state, Node.js 24 built-in test runner, WSL-native LF verification, GitHub Actions Ubuntu/Node 24.

## Global Constraints

- Approved spec: `docs/superpowers/specs/2026-08-28-quant-interview-preparation-breadth-practice-design.md` at commit `906ea6a`.
- Branch: `codex/quant-interview-preparation-014`.
- Workstream id: `interview-strategy-communication-interview-preparation-014`.
- Exact master scope: `green-book::1.1::guidance`, then `green-book::1.2::guidance`.
- Evidence is Green PDF pages 17–18; source PDFs remain untracked and unmodified.
- Public delta is exactly +0 Problems / +1 Knowledge.
- Final public corpus is exactly 76 Problems / 51 topic-classified Knowledge.
- Knowledge slug is exactly `quant-interview-preparation-breadth-and-practice`.
- No Problem, taxonomy, source-topic-map, Red coverage, or 150 coverage file changes.
- Existing workstreams 001–013 remain complete with unchanged factual evidence.
- Active manifest contains no completion-only evidence.
- Ordered gates are `npm run master:directory:check`, `npm run knowledge:directory:check`, `npm run test`, `npm run check`, `npm run build`.
- Authoritative local environment is WSL-native LF with Node 24.
- Exact active SHA must receive a successful GitHub Actions run before closure.
- Workstream 015 remains inactive; completed 014 advances only the first pending key to `red-book::1.10::guidance`.

## File Structure

- Create `src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md` — canonical public Knowledge.
- Create `src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-014.json` — active/complete lifecycle manifest.
- Create `tests/quant-interview-preparation-breadth-practice-content.test.mjs` — public content and relationship contract.
- Create `tests/quant-interview-preparation-breadth-practice-workstream.test.mjs` — exact master/coverage scope and registry contract.
- Create `tests/quant-interview-preparation-breadth-practice-completion.test.mjs` — strict phase-safe lifecycle contract.
- Create then delete `.github/workflows/quant-interview-preparation-014-temporary.yml` — exact active-commit CI.
- Modify `src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md` — reciprocal related slug only.
- Modify `src/content/knowledge/concepts/structured-think-aloud-reasoning.md` — reciprocal related slug only.
- Modify `src/data/quant-interview/topics/knowledge-catalog.json` — one published module.
- Modify `src/data/quant-interview/coverage/green-book.json` — exact two knowledge-only rows.
- Modify `src/data/quant-interview/master-directory.json` — exact two terminal records and 014 ownership.
- Modify lifecycle transition tests that currently treat post-013 idle state as permanent.
- Regenerate `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`.
- Modify `docs/quant-interview/HANDOFF.md` for active and completed 014 phases.

---

### Task 1: Public Knowledge RED/GREEN

**Files:**
- Create: `tests/quant-interview-preparation-breadth-practice-content.test.mjs`
- Create: `src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md`

**Interfaces:**
- Consumes: approved public identity and Green guidance semantics.
- Produces: one renderer-safe source-neutral Knowledge page; no shared-state mutation yet.

- [ ] **Step 1: Write the failing content test**

Create the test with a small frontmatter parser and assertions for exact metadata, seven required headings, the five-step loop, breadth boundary, diagnostic practice, common mistakes, four numbered Interview Checks, source neutrality, and absence of a new Problem slug.

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const path = 'src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md';
const readArray = (text, field) => (text.match(new RegExp(`^${field}:\\s*\\[([^\\]]*)\\]$`, 'm'))?.[1] ?? '')
  .split(',').map((value) => value.trim()).filter(Boolean);

test('preparation Knowledge owns breadth and deliberate practice as one loop', async () => {
  const text = await readFile(path, 'utf8');
  assert.match(text, /^title: Quant Interview Preparation: Breadth, Basics & Deliberate Practice$/m);
  assert.match(text, /^date: 2026-08-28$/m);
  assert.match(text, /^type: concept$/m);
  assert.match(text, /^domain: Interview Strategy & Communication$/m);
  assert.match(text, /^category: Problem Solving Techniques$/m);
  assert.match(text, /^status: growing$/m);
  assert.match(text, /^featured: false$/m);
  assert.deepEqual(readArray(text, 'quantInterviewTopics'), ['interview-strategy-communication', 'interview-preparation']);
  assert.deepEqual(readArray(text, 'related'), [
    'problem-framing-clarification-assumption-management',
    'structured-think-aloud-reasoning',
  ]);
  assert.deepEqual(readArray(text, 'relatedNotes'), []);
  for (const heading of [
    'Core Idea', 'The Preparation Loop', 'Build Breadth without Studying Everything',
    'Turn Practice into Evidence', 'Readiness Signals', 'Common Mistakes', 'Interview Checks',
  ]) assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  for (const phrase of [
    'map the role', 'baseline fluency', 'representative tasks', 'diagnose', 'repeat under constraints',
    'working basics', 'specialist mastery', 'passive rereading', 'retrieval', 'spoken explanation',
  ]) assert.match(text, new RegExp(phrase, 'i'));
  const checks = text.split(/^## Interview Checks$/m)[1] ?? '';
  assert.equal((checks.match(/^\d+\./gm) ?? []).length, 4);
  assert.doesNotMatch(text, /Green Book|Xinfeng Zhou|sourceSection|PDF page|section 1\.1|section 1\.2/i);
});

test('preparation scope creates no public Problem', async () => {
  const files = await readdir('src/content/problems', { recursive: true });
  assert.equal(files.some((file) => /preparation-breadth|deliberate-practice/i.test(String(file))), false);
  await assert.rejects(access('src/content/problems/quant-interview-preparation-breadth-and-practice.md'));
});
```

- [ ] **Step 2: Run RED**

```powershell
node --test tests/quant-interview-preparation-breadth-practice-content.test.mjs
```

Expected: FAIL with `ENOENT` for the approved Knowledge file.

- [ ] **Step 3: Author the minimal complete Knowledge page**

Use the exact frontmatter from the spec. Write independent prose implementing this five-step loop:

```markdown
1. **Map the role.** Identify the domains and forms of work the interview is likely to emphasize.
2. **Establish baseline fluency.** Build recognition-level command of core mathematics, probability, finance, programming, and problem-solving patterns.
3. **Practice representative tasks.** Retrieve definitions, derive results, code solutions, and explain routes without relying on passive rereading.
4. **Diagnose the bottleneck.** Classify each failure as missing knowledge, weak recognition, incorrect modeling, slow mechanics, or unclear communication.
5. **Repeat under constraints.** Revisit the smallest responsible gap, then test it again with time pressure and spoken reasoning.
```

State explicitly that broad working fluency is not equal mastery of every topic. Include the four approved Interview Checks verbatim in meaning but independently phrased.

- [ ] **Step 4: Run GREEN and commit**

```powershell
node --test tests/quant-interview-preparation-breadth-practice-content.test.mjs
git diff --check
git add -- tests/quant-interview-preparation-breadth-practice-content.test.mjs src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md
git commit -m "feat(quant-interview): add preparation breadth practice Knowledge"
```

Expected: 2 tests pass.

### Task 2: Catalog, relationships, and exact 76/51 registry

**Files:**
- Modify: `src/data/quant-interview/topics/knowledge-catalog.json`
- Modify: `src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md`
- Modify: `src/content/knowledge/concepts/structured-think-aloud-reasoning.md`
- Modify: `tests/quant-interview-preparation-breadth-practice-content.test.mjs`
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`

**Interfaces:**
- Consumes: Task 1 Knowledge slug.
- Produces: one published catalog module, reciprocal related graph, exact 76/51 public registry.

- [ ] **Step 1: Add failing catalog and reciprocal-link assertions**

Append a test that loads the catalog and three Markdown pages, then asserts:

```js
const module = catalog.modules.find(({ slug }) => slug === 'quant-interview-preparation-breadth-and-practice');
assert.deepEqual(module, {
  slug: 'quant-interview-preparation-breadth-and-practice',
  title: 'Quant Interview Preparation: Breadth, Basics & Deliberate Practice',
  canonicalTopics: ['interview-strategy-communication', 'interview-preparation'],
  primaryTopic: 'interview-preparation',
  learningOrder: 10,
  status: 'published',
  prerequisites: [],
});
assert.match(framing, /^related: \[[^\]]*quant-interview-preparation-breadth-and-practice[^\]]*\]$/m);
assert.match(thinkAloud, /^related: \[[^\]]*quant-interview-preparation-breadth-and-practice[^\]]*\]$/m);
```

Change the exact source-neutral regression from 50 to 51 classified Knowledge while leaving 76 Problems unchanged.

- [ ] **Step 2: Run RED**

```powershell
node --test tests/quant-interview-preparation-breadth-practice-content.test.mjs tests/quant-interview-source-neutral-content.test.mjs
```

Expected: FAIL on missing catalog module, missing reciprocal links, and actual 51 versus expected 50.

- [ ] **Step 3: Apply the exact shared public delta**

Add the catalog module with `learningOrder: 10`. Update only the two existing `related` arrays:

```yaml
related: [structured-think-aloud-reasoning, quant-interview-preparation-breadth-and-practice]
```

```yaml
related: [problem-framing-clarification-assumption-management, quant-interview-preparation-breadth-and-practice]
```

Do not edit either existing page body or `relatedNotes`.

- [ ] **Step 4: Run GREEN and commit**

```powershell
node --test tests/quant-interview-preparation-breadth-practice-content.test.mjs tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-knowledge-directory.test.mjs
git diff --check
git add -- src/data/quant-interview/topics/knowledge-catalog.json src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md src/content/knowledge/concepts/structured-think-aloud-reasoning.md tests/quant-interview-preparation-breadth-practice-content.test.mjs tests/quant-interview-source-neutral-content.test.mjs
git commit -m "feat(quant-interview): register preparation Knowledge graph"
```

### Task 3: Master, coverage, and active workstream lifecycle

**Files:**
- Create: `tests/quant-interview-preparation-breadth-practice-workstream.test.mjs`
- Create: `tests/quant-interview-preparation-breadth-practice-completion.test.mjs`
- Create: `src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-014.json`
- Modify: `src/data/quant-interview/master-directory.json`
- Modify: `src/data/quant-interview/coverage/green-book.json`

**Interfaces:**
- Consumes: exact first pending key and Task 2 canonical Knowledge slug.
- Produces: two synchronized terminal records and one field-safe active manifest.

- [ ] **Step 1: Write the failing workstream state test**

Assert exact scope and terminal synchronization:

```js
const keys = ['green-book::1.1::guidance', 'green-book::1.2::guidance'];
assert.deepEqual(manifest.masterItemKeys, keys);
assert.deepEqual(manifest.canonicalTopics, ['interview-strategy-communication', 'interview-preparation']);
assert.equal(manifest.status, 'active');
assert.deepEqual(manifest.publicDelta, { problems: 0, knowledge: 1 });
for (const key of keys) {
  const master = directory.items.find((item) => item.key === key);
  const coverage = green.entries.find((entry) => entry.sourceSection === master.sourceSection && entry.sourceItem === null);
  assert.equal(master.state, 'knowledge-only');
  assert.equal(coverage.state, 'knowledge-only');
  assert.deepEqual(master.canonicalKnowledge, ['quant-interview-preparation-breadth-and-practice']);
  assert.deepEqual(coverage.canonicalKnowledge, master.canonicalKnowledge);
  assert.equal(master.workstream, manifest.id);
}
assert.equal(getNextPendingItem(directory).key, 'red-book::1.10::guidance');
```

Assert no Problem path or Problem count change.

- [ ] **Step 2: Write the failing phase-safe completion test**

Use allowed environments `wsl-native-lf-node24` and `linux-native-lf-node24` and exact commands:

```js
const commands = [
  'npm run master:directory:check',
  'npm run knowledge:directory:check',
  'npm run test',
  'npm run check',
  'npm run build',
];
```

When status is `active`, assert absence of `preClosureActiveGate`, `verification`, and `finalTreeGate`. When `complete`, require the strict 40-hex active SHA, positive run id, matching commit fields, successful conclusions, exact temporary workflow list, final-tree absence flag, and factual HANDOFF closure.

- [ ] **Step 3: Run RED**

```powershell
node --test tests/quant-interview-preparation-breadth-practice-workstream.test.mjs tests/quant-interview-preparation-breadth-practice-completion.test.mjs
```

Expected: FAIL because manifest and state transitions do not exist.

- [ ] **Step 4: Create the exact active manifest**

Create JSON with this shape and no completion fields:

```json
{
  "id": "interview-strategy-communication-interview-preparation-014",
  "canonicalTopics": ["interview-strategy-communication", "interview-preparation"],
  "status": "active",
  "masterItemKeys": ["green-book::1.1::guidance", "green-book::1.2::guidance"],
  "sourceScopes": [{
    "source": "green-book",
    "sourceSections": ["1.1", "1.2"],
    "evidencePageRanges": [{ "startPage": 17, "endPage": 18 }],
    "reviewOutcome": "knowledge-only-consolidation",
    "reviewNote": "Two consecutive preparation-guidance records resolve to one canonical breadth-and-practice Knowledge page with no Problem delta."
  }],
  "publicDelta": { "problems": 0, "knowledge": 1 },
  "knowledgeSlugs": ["quant-interview-preparation-breadth-and-practice"]
}
```

- [ ] **Step 5: Update the exact master and Green coverage rows**

Set both rows to `knowledge-only`, empty Problems, the one Knowledge slug, and distinct factual resolution notes. Set `workstream` only in master rows. Preserve all other record fields and order.

- [ ] **Step 6: Run GREEN and commit active shared state**

```powershell
npm run master:directory:check
node --test tests/quant-interview-preparation-breadth-practice-workstream.test.mjs tests/quant-interview-preparation-breadth-practice-completion.test.mjs
git diff --check
git add -- src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-014.json src/data/quant-interview/master-directory.json src/data/quant-interview/coverage/green-book.json tests/quant-interview-preparation-breadth-practice-workstream.test.mjs tests/quant-interview-preparation-breadth-practice-completion.test.mjs
git commit -m "feat(quant-interview): activate interview preparation 014"
```

### Task 4: Phase-safe HANDOFF transition and generated directory

**Files:**
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`
- Modify: `tests/quant-interview-reasoning-communication-completion.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`
- Modify: `tests/quant-interview-limits-derivatives-completion.test.mjs`
- Modify: `tests/quant-interview-parallel-workstream-governance.test.mjs`
- Modify: `tests/quant-interview-random-walks-markov-chains-completion.test.mjs`

**Interfaces:**
- Consumes: active 014 manifest and first-pending transition.
- Produces: truthful active HANDOFF without weakening historical 011–013 evidence.

- [ ] **Step 1: Extend stale post-013 assertions with a 014-aware helper**

In each affected historical test, read the optional 014 manifest. Preserve all historical evidence assertions, then branch:

```js
if (workstream014.status === 'active') {
  assert.match(current, /Interview Strategy & Communication.*Interview Preparation/is);
  assert.match(handoff, /Workstream 014 is active/i);
  assert.doesNotMatch(handoff, /^## Completed cross-book workstream 14$/m);
} else {
  assert.equal(workstream014.status, 'complete');
  assert.match(current, /No bounded topic is active/i);
  assert.match(handoff, /First pending master record: `red-book::1\.10::guidance`/i);
}
```

Tests must also support the pre-014 absence state when run against older commits by treating `ENOENT` as no 014 manifest.

- [ ] **Step 2: Run transition tests to prove RED**

```powershell
node --test tests/quant-interview-handoff.test.mjs tests/quant-interview-limits-derivatives-completion.test.mjs tests/quant-interview-parallel-workstream-governance.test.mjs tests/quant-interview-random-walks-markov-chains-completion.test.mjs tests/quant-interview-reasoning-communication-completion.test.mjs
```

Expected: FAIL because HANDOFF still says no active bounded topic while manifest 014 is active.

- [ ] **Step 3: Put HANDOFF in exact active state**

Keep completed 013 and migration history. Set:

```text
Current bounded topic:

**Interview Strategy & Communication → Interview Preparation.**

Workstream 014 is active at the first two consecutive master records: `green-book::1.1::guidance` and `green-book::1.2::guidance`. Its public delta is +0 Problems / +1 Knowledge. No completion evidence is recorded until exact active-commit local gates and GitHub CI succeed.
```

Update the master-directory ingestion section to state 014 active and retain next pending `red-book::1.10::guidance` as an observed post-scope transition, not an authorized 015 workstream.

- [ ] **Step 4: Regenerate directory and run GREEN**

```powershell
npm run knowledge:directory
npm run master:directory:check
npm run knowledge:directory:check
node --test tests/quant-interview-preparation-breadth-practice-content.test.mjs tests/quant-interview-preparation-breadth-practice-workstream.test.mjs tests/quant-interview-preparation-breadth-practice-completion.test.mjs tests/quant-interview-handoff.test.mjs tests/quant-interview-limits-derivatives-completion.test.mjs tests/quant-interview-parallel-workstream-governance.test.mjs tests/quant-interview-random-walks-markov-chains-completion.test.mjs tests/quant-interview-reasoning-communication-completion.test.mjs
git diff --check
```

Expected: all focused and transition tests pass; generated directory reports 51 Knowledge and first pending Red 1.10.

- [ ] **Step 5: Commit active lifecycle state**

```powershell
git add -- docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md tests/quant-interview-handoff.test.mjs tests/quant-interview-limits-derivatives-completion.test.mjs tests/quant-interview-parallel-workstream-governance.test.mjs tests/quant-interview-random-walks-markov-chains-completion.test.mjs tests/quant-interview-reasoning-communication-completion.test.mjs
git commit -m "docs(quant-interview): record active preparation 014"
```

### Task 5: Active commit local gates and GitHub CI

**Files:**
- Create: `.github/workflows/quant-interview-preparation-014-temporary.yml`
- No completion metadata yet.

**Interfaces:**
- Consumes: fully integrated active tree.
- Produces: exact active SHA, WSL-native gate evidence, and matching successful GitHub run.

- [ ] **Step 1: Add the temporary CI workflow**

```yaml
name: Quant Interview Preparation 014 Temporary CI

on:
  push:
    branches:
      - codex/quant-interview-preparation-014
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
      - run: npm run master:directory:check
      - run: npm run knowledge:directory:check
      - run: npm run test
      - run: npm run check
      - run: npm run build
```

- [ ] **Step 2: Run the Windows diagnostic gates**

Run all five commands separately and stop on the first failure.

- [ ] **Step 3: Commit the exact active CI tree**

```powershell
git add -- '.github/workflows/quant-interview-preparation-014-temporary.yml'
git commit -m "ci(quant-interview): verify active preparation 014"
git rev-parse HEAD
```

Save the exact 40-hex SHA as `ACTIVE_SHA`.

- [ ] **Step 4: Run authoritative WSL-native Node 24 gates**

Create a detached Linux-native worktree at `/home/lorien/quant-interview-preparation-014`, install with `npm ci`, and run the five ordered commands using Node 24.15.0. Verify LF and remove the exact worktree after success.

- [ ] **Step 5: Push and accept only matching CI**

```powershell
git push -u origin codex/quant-interview-preparation-014
gh run list --workflow quant-interview-preparation-014-temporary.yml --branch codex/quant-interview-preparation-014 --limit 3 --json databaseId,headSha,status,conclusion,url
```

Resolve the run from the active SHA and watch it:

```powershell
$activeSha = git rev-parse HEAD
$run = gh run list --workflow quant-interview-preparation-014-temporary.yml --branch codex/quant-interview-preparation-014 --limit 10 --json databaseId,headSha,status,conclusion | ConvertFrom-Json | Where-Object { $_.headSha -eq $activeSha } | Select-Object -First 1
if (-not $run) { throw 'No CI run found for active SHA' }
gh run watch $run.databaseId --exit-status
```

Accept only `conclusion: success` and exact matching `headSha`.

### Task 6: Workflow-free factual closure

**Files:**
- Delete: `.github/workflows/quant-interview-preparation-014-temporary.yml`
- Modify: `src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-014.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Modify: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: factual active SHA, CI run id, WSL environment, and successful ordered gates.
- Produces: strict complete manifest and no active bounded workstream.

- [ ] **Step 1: Remove the temporary workflow and commit its absence**

Use `apply_patch` to delete only the named workflow. Commit:

```powershell
git add -- '.github/workflows/quant-interview-preparation-014-temporary.yml'
git commit -m "chore(quant-interview): remove temporary preparation 014 CI"
```

- [ ] **Step 2: Run workflow-free final-tree gates in WSL Node 24**

Run the five ordered commands on the exact workflow-free commit and verify the temporary path is absent.

- [ ] **Step 3: Write concrete completion evidence**

After the workflow-removal commit, derive the active SHA from its parent and select the matching successful run:

```powershell
$env:ACTIVE_SHA = git rev-parse HEAD^
$runs = gh run list --workflow quant-interview-preparation-014-temporary.yml --branch codex/quant-interview-preparation-014 --limit 10 --json databaseId,headSha,status,conclusion | ConvertFrom-Json
$verifiedRun = $runs | Where-Object { $_.headSha -eq $env:ACTIVE_SHA -and $_.status -eq 'completed' -and $_.conclusion -eq 'success' } | Select-Object -First 1
if (-not $verifiedRun) { throw 'No successful CI run matches the active SHA' }
$env:RUN_ID = [string]$verifiedRun.databaseId
```

Generate the exact completed object for review without writing the file:

```js
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const path = 'src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-014.json';
const manifest = JSON.parse(readFileSync(path, 'utf8'));
const activeSha = process.env.ACTIVE_SHA;
const runId = Number(process.env.RUN_ID);
const commands = [
  'npm run master:directory:check',
  'npm run knowledge:directory:check',
  'npm run test',
  'npm run check',
  'npm run build',
];
assert.equal(manifest.status, 'active');
assert.match(activeSha, /^[0-9a-f]{40}$/);
assert.equal(Number.isInteger(runId) && runId > 0, true);
const completed = {
  ...manifest,
  status: 'complete',
  preClosureActiveGate: {
    status: 'active', commit: activeSha, environment: 'wsl-native-lf-node24',
    commands, conclusion: 'success',
  },
  verification: {
    commit: activeSha, runId, commands, conclusion: 'success',
    temporaryArtifacts: ['.github/workflows/quant-interview-preparation-014-temporary.yml'],
  },
  finalTreeGate: {
    environment: 'wsl-native-lf-node24', commands, conclusion: 'success',
    temporaryArtifactsAbsent: true,
  },
};
process.stdout.write(`${JSON.stringify(completed, null, 2)}\n`);
```

Run this with Node after setting the two environment values, inspect the concrete output, then use `apply_patch` to write those exact values into the manifest. Never store environment-variable names or empty evidence in JSON.

- [ ] **Step 4: Write HANDOFF completed 014 closure**

Add `## Completed cross-book workstream 14` with exact id, active SHA, run id, environment, ordered gates, +0/+1 delta, 76/51 corpus, both Green dispositions, and next pending Red 1.10.

Reset current state to:

```text
Current bounded topic:

**No bounded topic is active. Workstream 014 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 015 is not active or authorized by this closure.
```

- [ ] **Step 5: Regenerate and verify closure**

```powershell
npm run knowledge:directory
npm run master:directory:check
npm run knowledge:directory:check
node --test tests/quant-interview-preparation-breadth-practice-content.test.mjs tests/quant-interview-preparation-breadth-practice-workstream.test.mjs tests/quant-interview-preparation-breadth-practice-completion.test.mjs
git diff --check
```

- [ ] **Step 6: Commit closure**

```powershell
git add -- src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-014.json docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md
git commit -m "docs(quant-interview): close interview preparation 014"
```

### Task 7: Final verification and integration handoff

**Files:**
- Review only: all 014 changes.

- [ ] **Step 1: Run final Windows gates**

Run all five ordered commands with explicit exit checks. Expected: exact 76/51 tests pass, Astro has 0 errors, and build succeeds.

- [ ] **Step 2: Run final WSL gates on the closure commit**

Use Node 24.15.0 in a Linux-native detached worktree. Run `npm ci` and all five commands. Verify no temporary workflow exists.

- [ ] **Step 3: Perform scope review**

```powershell
git diff 906ea6a..HEAD --check
git diff 906ea6a..HEAD --stat
git status --short
```

Confirm no Problem, taxonomy, source-topic-map, Red coverage, 150 coverage, or source PDF changes.

- [ ] **Step 4: Push the closure branch**

```powershell
git push origin codex/quant-interview-preparation-014
```

The remote branch may advance past the active CI SHA to the workflow-free closure commit; the manifest preserves the exact earlier CI evidence.

- [ ] **Step 5: Report and offer integration**

Report final commit, CI run URL, 76/51 counts, two terminal master keys, next pending Red 1.10, and unchanged source files. Then use `finishing-a-development-branch` to offer local merge, PR, or keep-as-is.
