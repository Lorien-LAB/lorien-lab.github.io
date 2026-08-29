# Quant Role & Employer Fit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Process Red Book sections 1.10 and 1.11 in master-directory order and publish one source-neutral `Quant Role & Employer Fit` Knowledge page.

**Architecture:** Keep public content Topic-first and source-neutral while storing exact source/page evidence in the hidden coverage ledger, master directory, and one bounded workstream manifest. The two consecutive guidance records resolve `knowledge-only` to one canonical Knowledge node; active and complete lifecycle states use the same exact-evidence gates as workstream 014.

**Tech Stack:** Astro content collections, Markdown/YAML frontmatter, JSON registries, Node.js 24, `node:test`, `js-yaml`, npm scripts, WSL native-LF verification, GitHub Actions.

## Global Constraints

- Implement only `red-book::1.10::guidance` and `red-book::1.11::guidance` under workstream `interview-strategy-communication-interview-preparation-role-employer-fit-015`.
- Public delta is exactly `+0 Problems / +1 Knowledge`; the final source-neutral corpus is exactly 76 Problems / 52 topic-classified Knowledge nodes.
- Public content must not expose book names, authors, source slugs, section numbers, PDF pages, named source employers, 2008-era salary claims, hiring forecasts, or source prose.
- The canonical Knowledge slug is `quant-role-and-employer-fit` and its primary topic is `interview-preparation`.
- Repair only Red 1.10 evidence from PDF pages 22–24 to pages 22–23; retain Red 1.11 at pages 24–25.
- Both source rows become `knowledge-only`, point to the same canonical Knowledge page, and retain distinct nonempty resolution notes.
- Workstream 015 remains `active` until exact Windows, WSL native-LF Node 24, and GitHub Actions evidence succeeds.
- The completed queue advances to `red-book::9::guidance`; workstream 016 is not created or authorized.
- The temporary GitHub Actions workflow must be absent from the final tree.
- Do not add dependencies, change taxonomy ownership, reopen Red 1.12, or refactor unrelated content and infrastructure.
- Preserve the untracked source PDFs and `docs/量化实习_LeetCode与编程笔试面试备考指南.md`; never stage them.
- Run the ordered gates exactly as: `npm run master:directory:check`, `npm run knowledge:directory:check`, `npm run test`, `npm run check`, `npm run build`.

## File Responsibility Map

- Create `src/content/knowledge/concepts/quant-role-and-employer-fit.md`: the one public, source-neutral role/environment fit framework.
- Modify `src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md`: add only the reciprocal Knowledge relation.
- Modify `src/data/quant-interview/topics/knowledge-catalog.json`: publish the new module at learning order 11.
- Modify `src/data/quant-interview/coverage/red-book.json`: close exactly Red 1.10 and 1.11 with distinct `knowledge-only` decisions.
- Modify `src/data/quant-interview/master-directory.json`: mirror coverage, assign 015, and repair the Red 1.10 page boundary.
- Create `src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-role-employer-fit-015.json`: own the bounded active/complete lifecycle.
- Modify `docs/quant-interview/HANDOFF.md`: expose current 015 lifecycle and later factual closure.
- Regenerate `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`: generated 76/52 directory and queue state.
- Create `tests/quant-interview-role-employer-fit-content.test.mjs`: public content, graph, catalog, YAML, and no-Problem contract.
- Create `tests/quant-interview-role-employer-fit-workstream.test.mjs`: exact scope, page evidence, coverage, count, and queue transition.
- Create `tests/quant-interview-role-employer-fit-completion.test.mjs`: phase-aware active/complete evidence contract.
- Modify `tests/quant-interview-source-neutral-content.test.mjs`: register the new source-neutral Knowledge slug and exact 52 count.
- Modify `tests/quant-interview-knowledge-directory.test.mjs`: register the module/prerequisites and exact 52 directory count.
- Modify `tests/quant-interview-master-directory-repository.test.mjs`: replace the 014-only current queue contract with the factual 015 lifecycle and cumulative 014+015 delta.
- Modify `tests/quant-interview-preparation-breadth-practice-content.test.mjs`: assert the new reciprocal relation from the 014 Knowledge page.
- Modify `tests/quant-interview-preparation-breadth-practice-workstream.test.mjs`: keep 014 history stable without asserting the now-advanced current queue/count.
- Modify `tests/quant-interview-preparation-breadth-practice-completion.test.mjs`: keep 014 evidence strict without requiring the current HANDOFF to say 015 is inactive.
- Create then delete `.github/workflows/quant-interview-role-employer-fit-015-temporary.yml`: exact active-SHA CI only.

---

### Task 1: Publish the source-neutral role-and-employer-fit Knowledge page

**Files:**
- Create: `tests/quant-interview-role-employer-fit-content.test.mjs`
- Create: `src/content/knowledge/concepts/quant-role-and-employer-fit.md`

**Interfaces:**
- Consumes: the existing Knowledge Markdown schema and `js-yaml` already present in the repository.
- Produces: canonical slug `quant-role-and-employer-fit` with headings and self-tests consumed by Tasks 2–7.

- [ ] **Step 1: Write the failing public-content tests**

Create `tests/quant-interview-role-employer-fit-content.test.mjs` with these concrete helpers and assertions:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { load as parseYaml } from 'js-yaml';

const knowledgePath =
  'src/content/knowledge/concepts/quant-role-and-employer-fit.md';

const readArray = (text, field) =>
  (text.match(new RegExp(`^${field}:\\s*\\[([^\\]]*)\\]$`, 'm'))?.[1] ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

test('role and employer fit Knowledge has valid source-neutral frontmatter', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  const frontmatter = text.split(/^---$/m)[1] ?? '';
  assert.doesNotThrow(() => parseYaml(frontmatter));
  assert.match(text, /^title: Quant Role & Employer Fit$/m);
  assert.match(text, /^date: 2026-08-29$/m);
  assert.match(text, /^domain: Interview Strategy & Communication$/m);
  assert.deepEqual(readArray(text, 'quantInterviewTopics'), [
    'interview-strategy-communication',
    'interview-preparation',
  ]);
  assert.deepEqual(readArray(text, 'related'), [
    'quant-interview-preparation-breadth-and-practice',
  ]);
  assert.doesNotMatch(
    text,
    /Red Book|Mark Joshi|Nicholas Denson|Andrew Downes|sourceSection|PDF page|section 1\.10|section 1\.11|Goldman Sachs|Lehman Brothers|Citadel|Basel II/i,
  );
});

test('role and employer fit Knowledge teaches the approved two-axis framework', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  for (const heading of [
    'Core Idea',
    'Map the Role Function',
    'Map the Employer Environment',
    'Compare with One Lens',
    'Build a Fit Hypothesis',
    'Common Mistakes',
    'Interview Checks',
  ]) assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  for (const phrase of [
    'work product',
    'research',
    'engineering',
    'decision',
    'time horizon',
    'risk',
    'transferable skills',
    'revisable',
  ]) assert.match(text, new RegExp(phrase, 'i'));
  const checks = text.split(/^## Interview Checks$/m)[1] ?? '';
  assert.equal((checks.match(/^\d+\./gm) ?? []).length, 4);
});

test('role and employer fit creates no public Problem', async () => {
  const files = await readdir('src/content/problems', { recursive: true });
  assert.equal(
    files.some((file) => /role-and-employer-fit/i.test(String(file))),
    false,
  );
  await assert.rejects(
    access('src/content/problems/quant-role-and-employer-fit.md'),
    (error) => error?.code === 'ENOENT',
  );
});
```

- [ ] **Step 2: Run the focused test and verify the missing-page failure**

Run:

```bash
node --test tests/quant-interview-role-employer-fit-content.test.mjs
```

Expected: FAIL with `ENOENT` for `quant-role-and-employer-fit.md`.

- [ ] **Step 3: Write the minimal complete Knowledge page**

Create the required frontmatter exactly as specified, then independently author these sections:

```markdown
---
title: Quant Role & Employer Fit
description: Compare quant roles and employer environments through work product, research-engineering balance, decision proximity, time horizon, risk ownership, and transferable skills.
date: 2026-08-29
type: concept
domain: Interview Strategy & Communication
category: Problem Solving Techniques
status: growing
tags: [Interview, Careers, Quant Roles, Employer Fit]
quantInterviewTopics: [interview-strategy-communication, interview-preparation]
featured: false
related: [quant-interview-preparation-breadth-and-practice]
relatedNotes: []
---

## Core Idea

Role fit is a hypothesis about work, not a ranking of titles. Separate the function performed from the employer environment, compare both with the same evidence, and revise the hypothesis when daily-work evidence changes.

## Map the Role Function

Describe pricing and trading support, model validation and risk, quantitative research, quantitative development, systematic research and trading, and portfolio or capital modeling by their principal work product and responsibility boundary.

## Map the Employer Environment

Compare banks and sell-side institutions; hedge funds, market makers, and proprietary trading firms; asset managers; consulting, audit, and validation organizations; and financial-software or financial-technology companies without ranking them universally.

## Compare with One Lens

Use work product, research-engineering balance, decision proximity, time horizon, feedback cycle, pace, ambiguity, risk ownership, and transferable skills as the common comparison dimensions.

## Build a Fit Hypothesis

1. Identify the problems you want to solve.
2. Describe the daily work and output you want.
3. Compare role function independently from employer environment.
4. Gather evidence from job descriptions, conversations, and representative tasks.
5. State a provisional preference and revise it when evidence changes.

## Common Mistakes

Reject title-only matching, prestige rankings, universal compensation assumptions, and treating one institution’s organization chart as an industry-wide taxonomy.

## Interview Checks

1. Why must role function and employer environment be evaluated separately?
2. Compare two role functions using the common lens rather than title or prestige.
3. How can the same title describe different work in two institutions?
4. How would you communicate a reasoned but revisable role preference to an interviewer?
```

Expand each section only enough to make every listed comparison dimension operational; do not add source-specific examples.

- [ ] **Step 4: Run the focused content test**

Run:

```bash
node --test tests/quant-interview-role-employer-fit-content.test.mjs
```

Expected: 3 tests PASS.

- [ ] **Step 5: Commit the public Knowledge unit**

```bash
git add tests/quant-interview-role-employer-fit-content.test.mjs src/content/knowledge/concepts/quant-role-and-employer-fit.md
git commit -m "feat(quant-interview): add role employer fit Knowledge"
```

### Task 2: Register the Knowledge catalog and reciprocal graph

**Files:**
- Modify: `tests/quant-interview-role-employer-fit-content.test.mjs`
- Modify: `src/data/quant-interview/topics/knowledge-catalog.json:3-16`
- Modify: `src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md:11`
- Modify: `tests/quant-interview-preparation-breadth-practice-content.test.mjs:15-123`
- Modify: `tests/quant-interview-source-neutral-content.test.mjs:80-185`
- Modify: `tests/quant-interview-knowledge-directory.test.mjs:45-230`

**Interfaces:**
- Consumes: `quant-role-and-employer-fit` from Task 1.
- Produces: one published order-11 catalog module, reciprocal graph edges, and the exact 52-node registry contract.

- [ ] **Step 1: Extend tests before changing the catalog or graph**

Append this test to `tests/quant-interview-role-employer-fit-content.test.mjs`:

```js
test('role and employer fit is published and reciprocally connected', async () => {
  const [catalogText, preparation] = await Promise.all([
    readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'),
    readFile(
      'src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md',
      'utf8',
    ),
  ]);
  const catalog = JSON.parse(catalogText);
  assert.deepEqual(
    catalog.modules.find(({ slug }) => slug === 'quant-role-and-employer-fit'),
    {
      slug: 'quant-role-and-employer-fit',
      title: 'Quant Role & Employer Fit',
      canonicalTopics: ['interview-strategy-communication', 'interview-preparation'],
      primaryTopic: 'interview-preparation',
      learningOrder: 11,
      status: 'published',
      prerequisites: [],
    },
  );
  assert.match(
    preparation,
    /^related: \[[^\]]*quant-role-and-employer-fit[^\]]*\]$/m,
  );
});
```

Also make these exact expected-state changes:

```js
// tests/quant-interview-source-neutral-content.test.mjs
['quant-role-and-employer-fit', ['interview-strategy-communication', 'interview-preparation']],
assert.equal(actualKnowledgeSlugs.length, 52);

// tests/quant-interview-knowledge-directory.test.mjs
'quant-role-and-employer-fit': [],
assert.equal(repositoryCatalog.modules.length, 52);
assert.equal(repositoryCatalog.modules.filter((module) => module.status === 'published').length, 52);
assert.deepEqual(result.totals, { published: 52, planned: 0 });
```

Update the 014 content test’s exact `related` expectation to include `quant-role-and-employer-fit` after its two existing reasoning links.

- [ ] **Step 2: Run the graph and registry tests and verify they fail**

Run:

```bash
node --test tests/quant-interview-role-employer-fit-content.test.mjs tests/quant-interview-preparation-breadth-practice-content.test.mjs tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-knowledge-directory.test.mjs
```

Expected: FAIL because the catalog module and reciprocal edge do not exist and current exact counts remain 51.

- [ ] **Step 3: Add the order-11 catalog module**

Insert this object immediately after the existing order-10 preparation module:

```json
{
  "slug": "quant-role-and-employer-fit",
  "title": "Quant Role & Employer Fit",
  "canonicalTopics": [
    "interview-strategy-communication",
    "interview-preparation"
  ],
  "primaryTopic": "interview-preparation",
  "learningOrder": 11,
  "status": "published",
  "prerequisites": []
}
```

- [ ] **Step 4: Add the reciprocal relation**

Change only the preparation page’s `related` array:

```yaml
related: [problem-framing-clarification-assumption-management, structured-think-aloud-reasoning, quant-role-and-employer-fit]
```

- [ ] **Step 5: Run the focused graph and registry tests**

Run the Step 2 command again.

Expected: all focused tests PASS and the exact registry count is 52.

- [ ] **Step 6: Commit the catalog and graph unit**

```bash
git add src/data/quant-interview/topics/knowledge-catalog.json src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md tests/quant-interview-role-employer-fit-content.test.mjs tests/quant-interview-preparation-breadth-practice-content.test.mjs tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-knowledge-directory.test.mjs
git commit -m "feat(quant-interview): register role employer fit graph"
```

### Task 3: Register workstream 015 and close the two source records

**Files:**
- Create: `tests/quant-interview-role-employer-fit-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-role-employer-fit-015.json`
- Modify: `src/data/quant-interview/coverage/red-book.json:103-121`
- Modify: `src/data/quant-interview/master-directory.json:3122-3171`

**Interfaces:**
- Consumes: real Knowledge slug and published catalog entry from Tasks 1–2.
- Produces: exact active 015 manifest plus terminal master/coverage rows that the directory generator and completion lifecycle consume.

- [ ] **Step 1: Write the failing bounded-workstream test**

Create `tests/quant-interview-role-employer-fit-workstream.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { getNextPendingItem } from '../src/lib/quantInterviewMasterDirectory.mjs';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-role-employer-fit-015.json';
const keys = ['red-book::1.10::guidance', 'red-book::1.11::guidance'];
const knowledgeSlug = 'quant-role-and-employer-fit';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('015 owns exactly two consecutive Red preparation records', async () => {
  const manifest = await readJson(manifestPath);
  assert.equal(manifest.id, 'interview-strategy-communication-interview-preparation-role-employer-fit-015');
  assert.equal(manifest.status, 'active');
  assert.deepEqual(manifest.canonicalTopics, [
    'interview-strategy-communication',
    'interview-preparation',
  ]);
  assert.deepEqual(manifest.masterItemKeys, keys);
  assert.deepEqual(manifest.publicDelta, { problems: 0, knowledge: 1 });
  assert.deepEqual(manifest.knowledgeSlugs, [knowledgeSlug]);
  assert.equal('preClosureActiveGate' in manifest, false);
  assert.equal('verification' in manifest, false);
  assert.equal('finalTreeGate' in manifest, false);
});

test('master and Red coverage close both rows with exact page evidence', async () => {
  const [manifest, inputs, red] = await Promise.all([
    readJson(manifestPath),
    loadMasterDirectoryRepository(process.cwd()),
    readJson('src/data/quant-interview/coverage/red-book.json'),
  ]);
  const pages = new Map([
    ['red-book::1.10::guidance', [{ startPage: 22, endPage: 23 }]],
    ['red-book::1.11::guidance', [{ startPage: 24, endPage: 25 }]],
  ]);
  const notes = [];
  for (const key of keys) {
    const master = inputs.directory.items.find((item) => item.key === key);
    const coverage = red.entries.find(
      (entry) => entry.sourceSection === master.sourceSection && entry.sourceItem === null,
    );
    assert.equal(master.state, 'knowledge-only', key);
    assert.equal(coverage.state, 'knowledge-only', key);
    assert.deepEqual(master.questionPages, pages.get(key), key);
    assert.deepEqual(master.canonicalProblems, [], key);
    assert.deepEqual(coverage.canonicalProblems, [], key);
    assert.deepEqual(master.canonicalKnowledge, [knowledgeSlug], key);
    assert.deepEqual(coverage.canonicalKnowledge, [knowledgeSlug], key);
    assert.equal(master.workstream, manifest.id, key);
    assert.ok(master.resolutionNote?.trim(), key);
    assert.equal(master.resolutionNote, coverage.resolutionNote, key);
    notes.push(master.resolutionNote);
  }
  assert.notEqual(notes[0], notes[1]);
  assert.equal(validateMasterDirectoryRepository(inputs), true);
  assert.equal(getNextPendingItem(inputs.directory)?.key, 'red-book::9::guidance');
});

test('015 produces exactly 76 Problems and 52 classified Knowledge nodes', async () => {
  const problemFiles = await readdir('src/content/problems', { recursive: true });
  const knowledgeFiles = await readdir('src/content/knowledge', { recursive: true });
  assert.equal(problemFiles.filter((file) => String(file).endsWith('.md')).length, 76);
  const classified = [];
  for (const file of knowledgeFiles.filter((entry) => String(entry).endsWith('.md'))) {
    const text = await readFile(`src/content/knowledge/${String(file).replaceAll('\\', '/')}`, 'utf8');
    if (/^quantInterviewTopics:\s*\[[^\]]+\]$/m.test(text)) {
      classified.push(path.basename(String(file), '.md'));
    }
  }
  assert.equal(classified.includes(knowledgeSlug), true);
  assert.equal(classified.length, 52);
});
```

- [ ] **Step 2: Run the focused workstream test and verify the missing-manifest failure**

Run:

```bash
node --test tests/quant-interview-role-employer-fit-workstream.test.mjs
```

Expected: FAIL with `ENOENT` for the 015 manifest and pending coverage.

- [ ] **Step 3: Create the exact active manifest**

Create the manifest with this complete structure:

```json
{
  "id": "interview-strategy-communication-interview-preparation-role-employer-fit-015",
  "canonicalTopics": [
    "interview-strategy-communication",
    "interview-preparation"
  ],
  "status": "active",
  "masterItemKeys": [
    "red-book::1.10::guidance",
    "red-book::1.11::guidance"
  ],
  "sourceScopes": [
    {
      "source": "red-book",
      "sourceSections": ["1.10", "1.11"],
      "evidencePageRanges": [{ "startPage": 22, "endPage": 25 }],
      "reviewOutcome": "knowledge-only-consolidation",
      "reviewNote": "Two consecutive role-and-employer guidance records resolve to one canonical fit framework with no Problem delta."
    }
  ],
  "publicDelta": { "problems": 0, "knowledge": 1 },
  "knowledgeSlugs": ["quant-role-and-employer-fit"]
}
```

- [ ] **Step 4: Update Red coverage with distinct terminal decisions**

Use these exact notes:

```json
{
  "sourceSection": "1.10",
  "sourceItem": null,
  "canonicalTopics": ["interview-preparation"],
  "state": "knowledge-only",
  "canonicalProblems": [],
  "canonicalKnowledge": ["quant-role-and-employer-fit"],
  "resolutionNote": "Role archetypes and work-product trade-offs resolve to the canonical role-and-employer-fit framework."
}
```

```json
{
  "sourceSection": "1.11",
  "sourceItem": null,
  "canonicalTopics": ["interview-preparation"],
  "state": "knowledge-only",
  "canonicalProblems": [],
  "canonicalKnowledge": ["quant-role-and-employer-fit"],
  "resolutionNote": "Employer operating environments and their interaction with role choice resolve to the canonical role-and-employer-fit framework."
}
```

- [ ] **Step 5: Mirror the decisions into the two master rows**

For both rows, preserve existing keys, kind, source, source section, canonical topics, and sort keys; set:

```json
"state": "knowledge-only",
"canonicalProblems": [],
"canonicalKnowledge": ["quant-role-and-employer-fit"],
"workstream": "interview-strategy-communication-interview-preparation-role-employer-fit-015"
```

Copy the matching distinct coverage note into each `resolutionNote`. Change only Red 1.10 `questionPages` to `[{ "startPage": 22, "endPage": 23 }]`; retain Red 1.11 at `[{ "startPage": 24, "endPage": 25 }]`.

- [ ] **Step 6: Run the focused workstream test**

Run the Step 2 command again.

Expected: all 3 tests PASS, validator returns true, and next pending is Red 9.

- [ ] **Step 7: Commit the hidden data unit**

```bash
git add tests/quant-interview-role-employer-fit-workstream.test.mjs src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-role-employer-fit-015.json src/data/quant-interview/coverage/red-book.json src/data/quant-interview/master-directory.json
git commit -m "feat(quant-interview): activate role employer fit 015"
```

### Task 4: Reconcile active lifecycle, current queue, and generated directory

**Files:**
- Create: `tests/quant-interview-role-employer-fit-completion.test.mjs`
- Modify: `tests/quant-interview-master-directory-repository.test.mjs:20-290`
- Modify: `tests/quant-interview-preparation-breadth-practice-workstream.test.mjs:70-100`
- Modify: `tests/quant-interview-preparation-breadth-practice-completion.test.mjs:55-67`
- Modify: `docs/quant-interview/HANDOFF.md:539-608`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: active 015 manifest and terminal data from Task 3.
- Produces: phase-aware completion contract and truthful active repository memory for later CI closure.

- [ ] **Step 1: Write the phase-aware completion test before updating HANDOFF**

Create `tests/quant-interview-role-employer-fit-completion.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-role-employer-fit-015.json';
const temporaryArtifact =
  '.github/workflows/quant-interview-role-employer-fit-015-temporary.yml';
const commands = [
  'npm run master:directory:check',
  'npm run knowledge:directory:check',
  'npm run test',
  'npm run check',
  'npm run build',
];
const environments = new Set(['wsl-native-lf-node24', 'linux-native-lf-node24']);
const shaPattern = /^[0-9a-f]{40}$/;
const currentTopicBlock = (handoff) =>
  handoff.split(/Current bounded topic:/i)[1]?.split(/^## /m)[0] ?? '';

test('015 lifecycle is field-safe while active and factually strict when complete', async () => {
  const [manifest, handoff] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
  ]);
  assert.match(manifest.status, /^(?:active|complete)$/);

  if (manifest.status === 'active') {
    assert.equal('preClosureActiveGate' in manifest, false);
    assert.equal('verification' in manifest, false);
    assert.equal('finalTreeGate' in manifest, false);
    assert.match(currentTopicBlock(handoff), /Interview Strategy & Communication.*Interview Preparation/is);
    assert.match(handoff, /Workstream 015 is active/i);
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 15$/m);
    return;
  }

  const gate = manifest.preClosureActiveGate;
  const verification = manifest.verification;
  const finalTree = manifest.finalTreeGate;
  assert.equal(gate?.status, 'active');
  assert.match(gate?.commit ?? '', shaPattern);
  assert.equal(environments.has(gate?.environment), true);
  assert.deepEqual(gate?.commands, commands);
  assert.equal(gate?.conclusion, 'success');
  assert.equal(verification?.commit, gate.commit);
  assert.equal(Number.isInteger(verification?.runId) && verification.runId > 0, true);
  assert.deepEqual(verification?.commands, commands);
  assert.equal(verification?.conclusion, 'success');
  assert.deepEqual(verification?.temporaryArtifacts, [temporaryArtifact]);
  assert.equal(environments.has(finalTree?.environment), true);
  assert.deepEqual(finalTree?.commands, commands);
  assert.equal(finalTree?.conclusion, 'success');
  assert.equal(finalTree?.temporaryArtifactsAbsent, true);
  await assert.rejects(access(temporaryArtifact), (error) => error?.code === 'ENOENT');
  assert.match(handoff, /^## Completed cross-book workstream 15$/m);
  assert.match(handoff, new RegExp(gate.commit));
  assert.match(handoff, new RegExp(String(verification.runId)));
  assert.match(handoff, /76 (?:canonical )?Problems.*52 .*Knowledge/is);
  assert.match(handoff, /red-book::1\.10::guidance.*red-book::1\.11::guidance/is);
  assert.match(handoff, /First pending master record: `red-book::9::guidance`/i);
  assert.match(handoff, /workstream 016 is not active or authorized/i);
});
```

- [ ] **Step 2: Run current-state tests and capture all intentional failures**

Run:

```bash
node --test tests/quant-interview-role-employer-fit-completion.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-preparation-breadth-practice-workstream.test.mjs tests/quant-interview-preparation-breadth-practice-completion.test.mjs tests/quant-interview-knowledge-directory.test.mjs
```

Expected: FAIL on old HANDOFF state, old 51 counts, old Red 1.10 next-pending assertions, and 014’s obsolete current-state assertions.

- [ ] **Step 3: Make master repository tests cumulative and 015-aware**

Apply these exact semantic changes in `tests/quant-interview-master-directory-repository.test.mjs`:

```js
assert.equal(inputs.problemSlugs.size, 76);
assert.equal(inputs.knowledgeSlugs.size, 52);

const workstream014 = inputs.workstreams.find(({ id }) => id.endsWith('-014'));
const workstream015 = inputs.workstreams.find(({ id }) => id.endsWith('-015'));
assert.deepEqual(workstream014.publicDelta, { problems: 0, knowledge: 1 });
assert.deepEqual(workstream015.publicDelta, { problems: 0, knowledge: 1 });
assert.equal(
  workstream014.publicDelta.knowledge + workstream015.publicDelta.knowledge,
  2,
);
```

Replace the current-queue test with a 015 lifecycle test:

```js
test('post-migration queue follows the factual 015 lifecycle', async () => {
  const { directory, workstreams } = await loadMasterDirectoryRepository(process.cwd());
  const first = getNextPendingItem(directory);
  assert.equal(first?.key, 'red-book::9::guidance');
  assert.equal(validateSequentialScope(directory, [first.key]), true);
  const workstream015 = workstreams.find(({ id }) => /-015$/.test(id));
  assert.match(workstream015.status, /^(?:active|complete)$/);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  if (workstream015.status === 'active') {
    assert.match(handoff, /Workstream 015 is active/i);
    assert.equal(
      handoff.includes(`First pending master record after the active 015 scope: \`${first.key}\``),
      true,
    );
  } else {
    assert.match(handoff, /No bounded ingestion workstream is active/i);
    assert.equal(handoff.includes(`First pending master record: \`${first.key}\``), true);
  }
});
```

Keep registry ordering checks and add the exact 015 id immediately after 014.

- [ ] **Step 4: Convert 014 tests from current-state assertions to historical invariants**

In `tests/quant-interview-preparation-breadth-practice-workstream.test.mjs`, retain exact 014 scope, targets, notes, and manifest delta, but rename the final test to `014 Knowledge remains classified after later workstreams` and replace its current 51 assertion with:

```js
assert.equal(knowledge.has('quant-interview-preparation-breadth-and-practice'), true);
assert.equal(classifiedKnowledge.includes('quant-interview-preparation-breadth-and-practice'), true);
```

In `tests/quant-interview-preparation-breadth-practice-completion.test.mjs`, keep exact 014 SHA/run/gates and completed-section assertions. Remove only assertions that force the current HANDOFF queue to be Red 1.10 or declare 015 inactive.

- [ ] **Step 5: Update HANDOFF to the truthful active state**

Keep the completed 014 section intact. Replace the current bounded-topic block with:

```markdown
Current bounded topic:

**Interview Strategy & Communication → Interview Preparation.**

Workstream 015 is active at the two consecutive master records `red-book::1.10::guidance` and `red-book::1.11::guidance`. Its public delta is +0 Problems / +1 Knowledge. Completion evidence remains absent until the exact active commit passes local, WSL, and GitHub CI verification.

## Master directory ingestion state

**Workstream 015 is active. The three-book master directory migration remains complete.**

First pending master record after the active 015 scope: `red-book::9::guidance`

The observed next key does not authorize workstream 016.
```

Update the current public corpus statement to exactly 76 Problems / 52 Knowledge.

- [ ] **Step 6: Regenerate the Knowledge directory**

Run:

```bash
npm run knowledge:directory
npm run knowledge:directory:check
```

Expected: generated directory records 52 published Knowledge nodes, active 015, both terminal Red rows, and first pending Red 9.

- [ ] **Step 7: Run the focused active-state regression set**

Run the Step 2 command again, plus:

```bash
node --test tests/quant-interview-role-employer-fit-content.test.mjs tests/quant-interview-role-employer-fit-workstream.test.mjs tests/quant-interview-source-neutral-content.test.mjs
```

Expected: all focused tests PASS with active 015 and no evidence fields.

- [ ] **Step 8: Commit the active repository-memory unit**

```bash
git add docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md tests/quant-interview-role-employer-fit-completion.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-preparation-breadth-practice-workstream.test.mjs tests/quant-interview-preparation-breadth-practice-completion.test.mjs
git commit -m "docs(quant-interview): record active role employer fit 015"
```

### Task 5: Prove the exact active commit on Windows, WSL, and GitHub CI

**Files:**
- Create: `.github/workflows/quant-interview-role-employer-fit-015-temporary.yml`
- Modify only if a real gate exposes a defect: files already owned by Tasks 1–4 and their focused regression tests.

**Interfaces:**
- Consumes: fully integrated active tree from Tasks 1–4.
- Produces: one immutable active SHA and one real successful GitHub Actions run id for Task 6.

- [ ] **Step 1: Add the exact temporary workflow**

```yaml
name: Quant Interview Role Employer Fit 015 Temporary CI

on:
  push:
    branches:
      - codex/quant-interview-role-employer-fit-015
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

- [ ] **Step 2: Run all five ordered gates on Windows**

Run each command separately and require exit code 0:

```bash
npm run master:directory:check
npm run knowledge:directory:check
npm run test
npm run check
npm run build
```

Expected: exact directory checks pass, all tests pass, Astro reports 0 errors, and the production build completes.

- [ ] **Step 3: Review the active diff and commit every approved active-tree change**

Run:

```bash
git diff --check
git status --short
git diff --stat
```

Stage only approved 015 implementation, tests, active HANDOFF/directory, and the temporary workflow. Do not stage `docs/书籍`, the LeetCode guide, or `tmp/`.

```bash
git commit -m "ci(quant-interview): verify active role employer fit 015"
git rev-parse HEAD
```

Save the full 40-character result as `ACTIVE_SHA`. Do not amend this commit after verification begins.

- [ ] **Step 4: Verify the exact active SHA in an independent WSL native-LF checkout**

First verify that `/home/lorien/quant-interview-role-employer-fit-015` does not exist. Then create a detached worktree at `ACTIVE_SHA`, prepend `/home/lorien/.local/share/codex-node-v24.15.0/bin` to `PATH`, and run:

```bash
npm ci
npm run master:directory:check
npm run knowledge:directory:check
npm run test
npm run check
npm run build
```

Use `git ls-files --eol` to verify tracked text is `i/lf` and `w/lf`. After success, resolve the exact `/home/lorien/quant-interview-role-employer-fit-015` path, remove that worktree through `git worktree remove`, and do not touch any other worktree.

- [ ] **Step 5: Push the feature branch and capture real CI evidence**

```bash
git push -u origin codex/quant-interview-role-employer-fit-015
gh run list --workflow quant-interview-role-employer-fit-015-temporary.yml --branch codex/quant-interview-role-employer-fit-015 --limit 5 --json databaseId,headSha,status,conclusion,url
```

Select only the run whose `headSha` equals `ACTIVE_SHA`. Watch it with:

```bash
gh run watch $runId --exit-status
```

Expected: workflow conclusion `success`, and all five ordered gate steps are green. Save the positive integer as `RUN_ID`.

- [ ] **Step 6: Stop on any evidence mismatch**

If WSL or CI fails, fix the cause on the active branch, add or refine a focused regression test, rerun Windows gates, create a new active commit, and repeat WSL/CI. Never record a failed, stale, or different-SHA run as completion evidence.

### Task 6: Remove temporary CI and record factual completion

**Files:**
- Delete: `.github/workflows/quant-interview-role-employer-fit-015-temporary.yml`
- Modify: `tests/quant-interview-role-employer-fit-workstream.test.mjs`
- Modify: `src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-role-employer-fit-015.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: factual `ACTIVE_SHA` and successful `RUN_ID` from Task 5.
- Produces: workflow-free complete 015 state with no placeholder evidence.

- [ ] **Step 1: Delete the temporary workflow and commit only its removal**

Delete `.github/workflows/quant-interview-role-employer-fit-015-temporary.yml`, then:

```bash
git add .github/workflows/quant-interview-role-employer-fit-015-temporary.yml
git commit -m "chore(quant-interview): remove role employer fit 015 temporary CI"
git rev-parse HEAD
```

Save this removal commit SHA for the workflow-free tree check.

- [ ] **Step 2: Verify the workflow-free removal commit in WSL**

Create a fresh detached WSL worktree at the removal commit. Assert the temporary workflow path does not exist, run `npm ci`, then run the same five ordered gates. Remove only the exact verified WSL worktree after success.

- [ ] **Step 3: Make the workstream test phase-aware**

Change the Task 3 status assertion from exact active to:

```js
assert.match(manifest.status, /^(?:active|complete)$/);
if (manifest.status === 'active') {
  assert.equal('preClosureActiveGate' in manifest, false);
  assert.equal('verification' in manifest, false);
  assert.equal('finalTreeGate' in manifest, false);
}
```

The dedicated completion test remains responsible for strict complete-state fields.

- [ ] **Step 4: Record exact complete-state evidence in the manifest**

Set `status` to `complete` and append the three evidence objects with these exact field contracts:

| Object | Field | Required value |
|---|---|---|
| `preClosureActiveGate` | `status` | `"active"` |
| `preClosureActiveGate` | `commit` | the exact 40-character `ACTIVE_SHA` captured in Task 5 |
| `preClosureActiveGate` | `environment` | `"wsl-native-lf-node24"` |
| `preClosureActiveGate` | `commands` | the five Global Constraints commands in exact order |
| `preClosureActiveGate` | `conclusion` | `"success"` |
| `verification` | `commit` | the same exact `ACTIVE_SHA` |
| `verification` | `runId` | the positive integer `RUN_ID` captured in Task 5, encoded as a JSON number |
| `verification` | `commands` | the same five commands in exact order |
| `verification` | `conclusion` | `"success"` |
| `verification` | `temporaryArtifacts` | `[".github/workflows/quant-interview-role-employer-fit-015-temporary.yml"]` |
| `finalTreeGate` | `environment` | `"wsl-native-lf-node24"` |
| `finalTreeGate` | `commands` | the same five commands in exact order |
| `finalTreeGate` | `conclusion` | `"success"` |
| `finalTreeGate` | `temporaryArtifactsAbsent` | `true` |

Do not transcribe an abbreviated SHA. Confirm `verification.commit === preClosureActiveGate.commit` before saving the manifest.

- [ ] **Step 5: Write the completed HANDOFF section and idle queue state**

Add `## Completed cross-book workstream 15` with:

- exact workstream id and scope;
- `ACTIVE_SHA` and `RUN_ID`;
- WSL native-LF Node 24 and Ubuntu CI environments;
- the five ordered commands;
- one canonical Knowledge slug and no Problems;
- exact +0/+1 delta and 76/52 corpus;
- both Red keys and page boundary decisions;
- source-neutrality and no-whole-book-completeness boundary.

Replace the current block with:

```markdown
Current bounded topic:

**No bounded topic is active. Workstream 015 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 016 is not active or authorized by this closure.

## Master directory ingestion state

**No bounded ingestion workstream is active. The three-book master directory migration remains complete.**

First pending master record: `red-book::9::guidance`
```

- [ ] **Step 6: Regenerate directory and run closure-focused tests**

```bash
npm run knowledge:directory
npm run knowledge:directory:check
node --test tests/quant-interview-role-employer-fit-completion.test.mjs tests/quant-interview-role-employer-fit-workstream.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-knowledge-directory.test.mjs
```

Expected: complete lifecycle passes, directory says complete, temporary workflow is absent, and first pending is Red 9.

- [ ] **Step 7: Commit factual closure**

```bash
git add src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-role-employer-fit-015.json tests/quant-interview-role-employer-fit-workstream.test.mjs docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md
git commit -m "docs(quant-interview): close role employer fit 015"
```

### Task 7: Final verification, review, and delivery

**Files:**
- No planned content changes; only defect fixes backed by focused tests if verification reveals a real issue.

**Interfaces:**
- Consumes: final workflow-free closure commit from Task 6.
- Produces: verified feature branch ready for the user’s integration choice.

- [ ] **Step 1: Run the five ordered gates on the final Windows tree**

```bash
npm run master:directory:check
npm run knowledge:directory:check
npm run test
npm run check
npm run build
```

Expected: every command exits 0; record the exact test total and built-page total in the handoff response, not in machine-readable evidence unless the schema requests them.

- [ ] **Step 2: Run the same gates on the exact final closure commit in WSL**

Use a new detached WSL worktree, Node 24, `npm ci`, native LF verification, and the same five commands. Confirm the temporary workflow is absent, then safely remove only that exact WSL worktree.

- [ ] **Step 3: Perform the required code review**

Review the final branch diff against its base for:

- exact two-record scope;
- source-neutral public prose;
- catalog and reciprocal-link correctness;
- distinct coverage notes and exact page ranges;
- exact 76/52 counts and Red 9 queue transition;
- absence of temporary workflow and placeholder evidence;
- no staged source PDFs, LeetCode guide, `tmp/`, or unrelated edits.

Run:

```bash
git diff --check
git status --short
git log --oneline --decorate --max-count=12
```

- [ ] **Step 4: Push the final closure commit**

```bash
git push
```

Do not push `main` or delete the remote feature branch without the user’s integration choice.

- [ ] **Step 5: Use the finishing-development-branch workflow**

Present exactly the normal-repository choices: merge locally to `main`, create a Pull Request, or keep the branch. Execute only the user-selected integration action.
