# Quant Interview Formats & Assessment Strategy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Process Red Book sections 1.1–1.9 selectively and publish one source-neutral Knowledge framework for live, remote, take-home, and written quant assessments.

**Architecture:** One public Knowledge node owns assessment-format strategy and links to the existing preparation, framing, and think-aloud nodes. Hidden master/coverage rows retain exact source dispositions: six rows target the new node, one row reuses preparation, two dated rows remain target-free guidance; one active/complete workstream owns all nine rows and closes with exact Windows, WSL, and CI evidence.

**Tech Stack:** Astro Markdown content, YAML frontmatter, JSON catalogs/coverage/master/workstreams, Node.js 24, `node:test`, `js-yaml`, generated Knowledge directory, WSL native-LF verification, GitHub Actions.

## Global Constraints

- Process exactly `red-book::1.1::guidance` through `red-book::1.9::guidance` in queue order under `interview-strategy-communication-interview-process-formats-assessment-strategy-016`.
- Public delta is exactly +0 Problems / +1 Knowledge; final corpus is exactly 76 Problems / 53 topic-classified Knowledge nodes.
- New canonical slug is `quant-interview-formats-and-assessment-strategy`, primary topic `interview-process-formats`, learning order 12.
- Red 1.2 and 1.7 are target-free `interview-guidance`; Red 1.9 reuses `quant-interview-preparation-breadth-and-practice`; the other six rows target the new page, with Red 1.3 also targeting framing and think-aloud.
- Every source row has a distinct exact nonempty resolution note mirrored by master and coverage.
- Repair only Red 1.7 evidence from pages 19–20 to page 19; preserve all other identities, sort keys, and page ranges.
- Final master state is exactly 205 terminal / 545 pending, with first pending `red-book::9.2::guidance`.
- Public content is independently authored and source-neutral; exclude source provenance and dated recruiter/employer/expense/clothing/food/landline/mobile prescriptions.
- Do not create any Problem, change taxonomy/source-topic mapping, process Red 9.2, or authorize workstream 017.
- Active 016 has no completion evidence fields; complete 016 requires one exact active SHA, real positive CI run id, WSL native-LF Node 24, ordered gates, and absent temporary workflow.
- Preserve all historical 001–015 evidence and the market-awareness skip audit.
- Never stage source PDFs, rendered pages, LeetCode guide, visualization files, SDD artifacts, dependencies, or unrelated edits.
- Run ordered gates exactly: `npm run master:directory:check`, `npm run knowledge:directory:check`, `npm run test`, `npm run check`, `npm run build`.

## File Responsibility Map

- Create `src/content/knowledge/concepts/quant-interview-formats-and-assessment-strategy.md`: public framework.
- Create `tests/quant-interview-assessment-formats-content.test.mjs`: exact metadata/content/source-neutral/public graph contract.
- Modify three existing Knowledge pages for reciprocal links only.
- Modify `src/data/quant-interview/topics/knowledge-catalog.json`: order-12 published module.
- Update exact-count registry/directory and reciprocal graph tests from 52 to 53.
- Create `tests/quant-interview-assessment-formats-workstream.test.mjs`: exact nine-row mapping/count/page/queue contract.
- Modify `src/data/quant-interview/coverage/red-book.json` and `src/data/quant-interview/master-directory.json`: nine exact dispositions.
- Create active/complete manifest `src/data/quant-interview/workstreams/interview-strategy-communication-interview-process-formats-assessment-strategy-016.json`.
- Create `tests/quant-interview-assessment-formats-completion.test.mjs`: strict lifecycle evidence.
- Update mutable current-state tests, HANDOFF, and generated directory for active then complete 016.
- Create then delete `.github/workflows/quant-interview-assessment-formats-016-temporary.yml`.

---

### Task 1: Publish the source-neutral assessment-formats Knowledge page

**Files:**
- Create: `tests/quant-interview-assessment-formats-content.test.mjs`
- Create: `src/content/knowledge/concepts/quant-interview-formats-and-assessment-strategy.md`

**Interfaces:**
- Consumes: existing Knowledge Markdown schema and `js-yaml` `JSON_SCHEMA`.
- Produces: canonical slug consumed by catalog, graph, source rows, and lifecycle tasks.

- [ ] **Step 1: Write failing exact-frontmatter and content tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const knowledgePath =
  'src/content/knowledge/concepts/quant-interview-formats-and-assessment-strategy.md';

const metadata = {
  title: 'Quant Interview Formats & Assessment Strategy',
  description:
    'Prepare for live technical interviews, remote screens, take-home work, and written exams by clarifying constraints, communicating reasoning, preserving integrity, and matching the deliverable to the assessment format.',
  date: '2026-08-30',
  type: 'concept',
  domain: 'Interview Strategy & Communication',
  category: 'Problem Solving Techniques',
  status: 'growing',
  tags: ['Interview', 'Assessment', 'Take-Home', 'Written Exam'],
  quantInterviewTopics: ['interview-strategy-communication', 'interview-process-formats'],
  featured: false,
  related: [
    'quant-interview-preparation-breadth-and-practice',
    'problem-framing-clarification-assumption-management',
    'structured-think-aloud-reasoning',
  ],
  relatedNotes: [],
};

test('assessment-formats Knowledge has the exact public metadata contract', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  const frontmatter = text.split(/^---$/m)[1] ?? '';
  assert.deepEqual(parseYaml(frontmatter, { schema: JSON_SCHEMA }), metadata);
});

test('assessment-formats Knowledge covers the four formats and execution loop', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  for (const heading of [
    'Core Idea',
    'Assessment Map',
    'Before the Assessment',
    'Live Technical Execution',
    'Remote-Screen Execution',
    'Take-Home Execution',
    'Written-Exam Execution',
    'Format-Independent Review',
    'Common Mistakes',
    'Interview Checks',
  ]) assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  for (const phrase of [
    'allowed tools', 'expected artifact', 'clarification', 'assumptions',
    'think aloud', 'hint', 'integrity', 'resource attribution',
    'reproducible', 'time allocation', 'partial credit', 'consistency checks',
  ]) assert.match(text, new RegExp(phrase, 'i'));
  const checks = text.split(/^## Interview Checks$/m)[1] ?? '';
  assert.equal((checks.match(/^\d+\./gm) ?? []).length, 6);
  assert.match(text, /copied solutions|copying|external work/i);
});
```

Add source-neutral and no-Problem assertions:

```js
test('assessment-formats page is source-neutral and creates no Problem', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  assert.doesNotMatch(text, /Red Book|Quant Job Interview Questions and Answers|Mark Joshi|Nicholas Denson|Andrew Downes|section 1\.[1-9]|PDF page/i);
  assert.doesNotMatch(text, /headhunter|Paul and Dominic|Michael Page|Goldman Sachs|interview expenses|wear a suit|lemonade|sugar low|landline|use a mobile|don't use a mobile/i);
  const files = await readdir('src/content/problems', { recursive: true });
  assert.equal(files.some((file) => /assessment-formats/i.test(String(file))), false);
  await assert.rejects(
    access('src/content/problems/quant-interview-formats-and-assessment-strategy.md'),
    (error) => error?.code === 'ENOENT',
  );
});
```

- [ ] **Step 2: Run the test and verify missing-file failure**

```bash
node --test tests/quant-interview-assessment-formats-content.test.mjs
```

Expected: missing Knowledge file causes metadata/content tests to fail; no-Problem guard passes.

- [ ] **Step 3: Author the complete public page**

Use the exact frontmatter fixture, then independently author these required sections:

```markdown
## Core Idea

Assessment format changes the best execution strategy, not the quality bar. Clarify the rules and deliverable, then demonstrate correct modeling, transparent reasoning, appropriate depth, and integrity under the format's constraints.

## Assessment Map

Compare live technical, remote screen, take-home, and supervised written formats by interaction level, time horizon, allowed tools, expected artifact, feedback availability, and communication channel.

## Before the Assessment

Clarify duration, deadline, tool/library rules, desired depth, expected explanation/tests/file format, and collaboration or external-resource boundaries.

## Live Technical Execution

Restate constraints, ask clarification questions, state assumptions, think aloud through decisive steps, use hints as evidence, and confirm whether a correct sketch or optimized solution is required.

## Remote-Screen Execution

Test the communication environment, keep working materials available, verbalize visual transitions, confirm shared understanding, and maintain a fallback channel.

## Take-Home Execution

Timebox scope, work independently, attribute allowed resources, document assumptions, add correctness checks and reproducible instructions, and review the final artifact against the request. Never submit copied solutions or disguised external work.

## Written-Exam Execution

Confirm rules, scan the paper, allocate time, show derivations for partial credit, state assumptions, move on when stuck, and reserve review time for consistency checks.

## Format-Independent Review

Classify failures as knowledge, modeling, mechanics, time allocation, communication, or deliverable mismatch and feed the result into deliberate practice.

## Common Mistakes

Cover format mismatch, silent reasoning, copied work, over-engineering sketches, under-explaining take-homes, ignoring tool rules, and omitting review time.

## Interview Checks

Write exactly six numbered prompts covering the six approved checks in the design.
```

Expand each section enough to make the framework actionable without adding dated source advice.

- [ ] **Step 4: Run focused tests**

Run the Step 2 command again. Expected: 3 tests PASS.

- [ ] **Step 5: Commit public content**

```bash
git add tests/quant-interview-assessment-formats-content.test.mjs src/content/knowledge/concepts/quant-interview-formats-and-assessment-strategy.md
git commit -m "feat(quant-interview): add assessment formats Knowledge"
```

### Task 2: Register catalog, reciprocal graph, and 53-node public contract

**Files:**
- Modify: `tests/quant-interview-assessment-formats-content.test.mjs`
- Modify: `src/data/quant-interview/topics/knowledge-catalog.json:1-35`
- Modify: `src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md:11`
- Modify: `src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md:11`
- Modify: `src/content/knowledge/concepts/structured-think-aloud-reasoning.md:11`
- Modify: `tests/quant-interview-preparation-breadth-practice-content.test.mjs`
- Modify: `tests/quant-interview-reasoning-communication-content.test.mjs`
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`
- Modify: `tests/quant-interview-knowledge-directory.test.mjs`

**Interfaces:**
- Consumes: Task 1 canonical page.
- Produces: published order-12 module, reciprocal links, exact 76/53 registry.

- [ ] **Step 1: Add failing graph/catalog assertions**

Append to the focused content test:

```js
test('assessment-formats Knowledge is published and reciprocally linked', async () => {
  const [catalogText, preparation, framing, thinkAloud] = await Promise.all([
    readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'),
    readFile('src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md', 'utf8'),
    readFile('src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md', 'utf8'),
    readFile('src/content/knowledge/concepts/structured-think-aloud-reasoning.md', 'utf8'),
  ]);
  const module = JSON.parse(catalogText).modules.find(
    ({ slug }) => slug === 'quant-interview-formats-and-assessment-strategy',
  );
  assert.deepEqual(module, {
    slug: 'quant-interview-formats-and-assessment-strategy',
    title: 'Quant Interview Formats & Assessment Strategy',
    canonicalTopics: ['interview-strategy-communication', 'interview-process-formats'],
    primaryTopic: 'interview-process-formats',
    learningOrder: 12,
    status: 'published',
    prerequisites: [],
  });
  for (const text of [preparation, framing, thinkAloud]) {
    assert.match(text, /^related: \[[^\]]*quant-interview-formats-and-assessment-strategy[^\]]*\]$/m);
  }
});
```

Update exact registry expectations:

```js
['quant-interview-formats-and-assessment-strategy', ['interview-strategy-communication', 'interview-process-formats']],
assert.equal(actualKnowledgeSlugs.length, 53);
```

In the directory test add `'quant-interview-formats-and-assessment-strategy': []`, require 53 modules/published nodes, and `{ published: 53, planned: 0 }`.

Update preparation and reasoning content tests to include the new reciprocal slug in exact `related` arrays without changing existing order otherwise.

- [ ] **Step 2: Run focused tests and verify missing catalog/links/count failures**

```bash
node --test tests/quant-interview-assessment-formats-content.test.mjs tests/quant-interview-preparation-breadth-practice-content.test.mjs tests/quant-interview-reasoning-communication-content.test.mjs tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-knowledge-directory.test.mjs
```

- [ ] **Step 3: Insert the exact order-12 catalog object**

```json
{
  "slug": "quant-interview-formats-and-assessment-strategy",
  "title": "Quant Interview Formats & Assessment Strategy",
  "canonicalTopics": [
    "interview-strategy-communication",
    "interview-process-formats"
  ],
  "primaryTopic": "interview-process-formats",
  "learningOrder": 12,
  "status": "published",
  "prerequisites": []
}
```

- [ ] **Step 4: Add reciprocal relations**

Append the new slug to the three existing `related` arrays, preserving all prior entries. Do not edit prose or canonical topics.

- [ ] **Step 5: Run the focused suite and commit**

Expected: all focused tests PASS with exact 53 registry.

```bash
git add src/data/quant-interview/topics/knowledge-catalog.json src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md src/content/knowledge/concepts/structured-think-aloud-reasoning.md tests/quant-interview-assessment-formats-content.test.mjs tests/quant-interview-preparation-breadth-practice-content.test.mjs tests/quant-interview-reasoning-communication-content.test.mjs tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-knowledge-directory.test.mjs
git commit -m "feat(quant-interview): register assessment formats graph"
```

### Task 3: Register active workstream 016 and exact source dispositions

**Files:**
- Create: `tests/quant-interview-assessment-formats-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/interview-strategy-communication-interview-process-formats-assessment-strategy-016.json`
- Modify: `src/data/quant-interview/coverage/red-book.json:10-105`
- Modify: `src/data/quant-interview/master-directory.json:2870-3220`

**Interfaces:**
- Consumes: new and existing canonical Knowledge targets from Tasks 1–2.
- Produces: active exact nine-row workstream, 205/545 master state, Red 9.2 queue transition.

- [ ] **Step 1: Write the failing exact workstream test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getNextPendingItem, TERMINAL_STATES } from '../src/lib/quantInterviewMasterDirectory.mjs';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-interview-process-formats-assessment-strategy-016.json';
const keys = Array.from({ length: 9 }, (_, index) =>
  `red-book::1.${index + 1}::guidance`);
const newSlug = 'quant-interview-formats-and-assessment-strategy';
const prepSlug = 'quant-interview-preparation-breadth-and-practice';
const framingSlug = 'problem-framing-clarification-assumption-management';
const thinkSlug = 'structured-think-aloud-reasoning';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

const expected = new Map([
  [keys[0], ['knowledge-only', [newSlug]]],
  [keys[1], ['interview-guidance', []]],
  [keys[2], ['knowledge-only', [newSlug, framingSlug, thinkSlug]]],
  [keys[3], ['knowledge-only', [newSlug]]],
  [keys[4], ['knowledge-only', [newSlug]]],
  [keys[5], ['knowledge-only', [newSlug]]],
  [keys[6], ['interview-guidance', []]],
  [keys[7], ['knowledge-only', [newSlug]]],
  [keys[8], ['knowledge-only', [prepSlug]]],
]);

const notes = [
  'Red Book 1.1 assessment goals resolve to the canonical assessment-formats Knowledge page with no public Problem.',
  'Red Book 1.2 is dated networking, recruiter, and headhunter logistics; it remains target-free interview guidance.',
  'Red Book 1.3 live technical format, clarification, reasoning communication, and adaptive hints resolve to the assessment, framing, and think-aloud Knowledge pages.',
  'Red Book 1.4 durable remote-screen communication resolves to the assessment-formats Knowledge page after excluding source-era technology prescriptions.',
  'Red Book 1.5 take-home constraints, integrity, presentation, and deliverable quality resolve to the assessment-formats Knowledge page.',
  'Red Book 1.6 supervised written-exam rules, tools, time allocation, and clarity resolve to the assessment-formats Knowledge page.',
  'Red Book 1.7 post-application follow-up and relationship logistics remain target-free interview guidance.',
  'Red Book 1.8 reusable execution and integrity principles resolve to the assessment-formats Knowledge page after excluding dated prescriptions.',
  'Red Book 1.9 readiness signals resolve to the existing deliberate-practice preparation Knowledge page.',
];

test('016 manifest owns exactly nine ordered source rows while active', async () => {
  const manifest = await readJson(manifestPath);
  assert.equal(manifest.id, 'interview-strategy-communication-interview-process-formats-assessment-strategy-016');
  assert.equal(manifest.status, 'active');
  assert.deepEqual(manifest.masterItemKeys, keys);
  assert.deepEqual(manifest.publicDelta, { problems: 0, knowledge: 1 });
  assert.deepEqual(manifest.knowledgeSlugs, [newSlug]);
  assert.equal('preClosureActiveGate' in manifest, false);
  assert.equal('verification' in manifest, false);
  assert.equal('finalTreeGate' in manifest, false);
});
```

Add exact master/coverage/ownership/note assertions:

```js
test('master and Red coverage mirror the exact selective dispositions', async () => {
  const [manifest, inputs, red] = await Promise.all([
    readJson(manifestPath), loadMasterDirectoryRepository(process.cwd()),
    readJson('src/data/quant-interview/coverage/red-book.json'),
  ]);
  assert.deepEqual(
    inputs.directory.items.filter((item) => item.workstream === manifest.id).map((item) => item.key),
    keys,
  );
  for (const [index, key] of keys.entries()) {
    const master = inputs.directory.items.find((item) => item.key === key);
    const coverage = red.entries.find((entry) =>
      entry.sourceSection === master.sourceSection && entry.sourceItem === null);
    const [state, targets] = expected.get(key);
    assert.equal(master.state, state, key);
    assert.equal(coverage.state, state, key);
    assert.deepEqual(master.canonicalProblems, [], key);
    assert.deepEqual(coverage.canonicalProblems, [], key);
    assert.deepEqual(master.canonicalKnowledge, targets, key);
    assert.deepEqual(coverage.canonicalKnowledge, targets, key);
    assert.equal(master.workstream, manifest.id, key);
    assert.equal(master.resolutionNote, notes[index], key);
    assert.equal(coverage.resolutionNote, notes[index], key);
  }
  assert.equal(validateMasterDirectoryRepository(inputs), true);
});
```

Add identity/page/count/queue assertions with literal existing sort keys copied from the current master rows before editing. Pin every key, source section, kind, source item, canonical topics, question pages, solution pages, and sort key. Require only Red 1.7 to change from pages 19–20 to `[{ startPage: 19, endPage: 19 }]`.

```js
test('016 yields exact 76/53, 205/545, and Red 9.2 next', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  assert.equal(inputs.problemSlugs.size, 76);
  assert.equal(inputs.knowledgeSlugs.size, 53);
  assert.equal(inputs.directory.items.filter((item) => TERMINAL_STATES.has(item.state)).length, 205);
  assert.equal(inputs.directory.items.filter((item) => item.state === 'pending').length, 545);
  assert.equal(getNextPendingItem(inputs.directory)?.key, 'red-book::9.2::guidance');
  assert.equal(inputs.workstreams.some(({ id }) => /-017$/.test(id)), false);
});
```

- [ ] **Step 2: Run focused test and verify missing active manifest/pending data failures**

```bash
node --test tests/quant-interview-assessment-formats-workstream.test.mjs
```

- [ ] **Step 3: Create exact active manifest**

```json
{
  "id": "interview-strategy-communication-interview-process-formats-assessment-strategy-016",
  "canonicalTopics": [
    "interview-strategy-communication",
    "interview-process-formats"
  ],
  "status": "active",
  "masterItemKeys": [
    "red-book::1.1::guidance",
    "red-book::1.2::guidance",
    "red-book::1.3::guidance",
    "red-book::1.4::guidance",
    "red-book::1.5::guidance",
    "red-book::1.6::guidance",
    "red-book::1.7::guidance",
    "red-book::1.8::guidance",
    "red-book::1.9::guidance"
  ],
  "sourceScopes": [
    {
      "source": "red-book",
      "sourceSections": ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9"],
      "evidencePageRanges": [{ "startPage": 13, "endPage": 22 }],
      "reviewOutcome": "selective-knowledge-and-guidance",
      "reviewNote": "Nine consecutive interview-process records resolve selectively to one new assessment framework, three existing reusable Knowledge nodes, and two target-free guidance rows."
    }
  ],
  "publicDelta": { "problems": 0, "knowledge": 1 },
  "knowledgeSlugs": ["quant-interview-formats-and-assessment-strategy"]
}
```

- [ ] **Step 4: Update exact coverage and master rows**

Apply `expected` and `notes` exactly. Preserve identity fields and set every master `workstream` to the exact 016 id, including target-free guidance rows. Change only Red 1.7 pages to 19–19.

- [ ] **Step 5: Run focused test and commit**

Expected: all focused workstream tests PASS.

```bash
git add tests/quant-interview-assessment-formats-workstream.test.mjs src/data/quant-interview/workstreams/interview-strategy-communication-interview-process-formats-assessment-strategy-016.json src/data/quant-interview/coverage/red-book.json src/data/quant-interview/master-directory.json
git commit -m "feat(quant-interview): activate assessment formats 016"
```

### Task 4: Reconcile active lifecycle, HANDOFF, directory, and current-state tests

**Files:**
- Create: `tests/quant-interview-assessment-formats-completion.test.mjs`
- Modify: `tests/quant-interview-master-directory-repository.test.mjs`
- Modify: `tests/quant-interview-market-awareness-skip.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`
- Modify: `tests/quant-interview-limits-derivatives-completion.test.mjs`
- Modify: `tests/quant-interview-parallel-workstream-governance.test.mjs`
- Modify: `tests/quant-interview-random-walks-markov-chains-completion.test.mjs`
- Modify: `tests/quant-interview-reasoning-communication-completion.test.mjs`
- Modify: `tests/quant-interview-role-employer-fit-completion.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: active manifest and terminal nine-row data.
- Produces: truthful active repository memory and strict phase-aware closure contract for Tasks 5–6.

- [ ] **Step 1: Write phase-aware completion test**

Use exact temporary path `.github/workflows/quant-interview-assessment-formats-016-temporary.yml`, exact five-command array, accepted environments `wsl-native-lf-node24`/`linux-native-lf-node24`, and 40-character SHA pattern.

Active branch assertions:

```js
assert.equal('preClosureActiveGate' in manifest, false);
assert.equal('verification' in manifest, false);
assert.equal('finalTreeGate' in manifest, false);
assert.match(currentTopicBlock(handoff), /Interview Strategy & Communication.*Interview Process & Formats/is);
assert.match(handoff, /Workstream 016 is active/i);
assert.doesNotMatch(handoff, /^## Completed cross-book workstream 16$/m);
```

Complete branch assertions must require:

```js
assert.equal(gate.status, 'active');
assert.match(gate.commit, /^[0-9a-f]{40}$/);
assert.equal(verification.commit, gate.commit);
assert.equal(Number.isInteger(verification.runId) && verification.runId > 0, true);
assert.deepEqual(gate.commands, commands);
assert.deepEqual(verification.commands, commands);
assert.deepEqual(finalTree.commands, commands);
assert.deepEqual(verification.temporaryArtifacts, [temporaryArtifact]);
assert.equal(finalTree.temporaryArtifactsAbsent, true);
await assert.rejects(access(temporaryArtifact), (error) => error?.code === 'ENOENT');
assert.match(handoff, /^## Completed cross-book workstream 16$/m);
assert.match(handoff, /76 (?:canonical )?Problems.*53 .*Knowledge/is);
assert.match(handoff, /First pending master record: `red-book::9\.2::guidance`/i);
```

- [ ] **Step 2: Make prior current-state tests 016-aware without weakening history**

The market-awareness skip test retains exact 14-row audit data and HANDOFF audit block, but moves its mutable Red 1.1 queue assertion to current 016 tests. The master repository test becomes phase-aware for active/complete 016 and Red 9.2. Historical completion tests retain all exact SHA/run/command evidence and only update the terminal current-topic branch from 015 to 016.

Run the affected test set before updating HANDOFF; expected failures must be only stale current-state wording/counts.

- [ ] **Step 3: Write active HANDOFF state**

Keep completed 015 and skip-audit sections unchanged. Set current state:

```markdown
Current bounded topic:

**Interview Strategy & Communication → Interview Process & Formats.**

Workstream 016 is active at the nine consecutive master records `red-book::1.1::guidance` through `red-book::1.9::guidance`. Its public delta is +0 Problems / +1 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI verification.

## Master directory ingestion state

**Workstream 016 is active. The three-book master directory migration remains complete.**

First pending master record after the active 016 scope: `red-book::9.2::guidance`

The observed next key does not authorize workstream 017.
```

Update current corpus to 76/53.

- [ ] **Step 4: Regenerate directory and run focused/full tests**

```bash
npm run knowledge:directory
npm run knowledge:directory:check
node --test tests/quant-interview-assessment-formats-completion.test.mjs tests/quant-interview-assessment-formats-workstream.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-market-awareness-skip.test.mjs
npm test
git diff --check
```

Expected: all tests PASS with active 016, 76/53, 205/545, and Red 9.2.

- [ ] **Step 5: Commit active repository memory**

Stage only Task 4 files and commit:

```bash
git add -- tests/quant-interview-assessment-formats-completion.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-market-awareness-skip.test.mjs tests/quant-interview-handoff.test.mjs tests/quant-interview-limits-derivatives-completion.test.mjs tests/quant-interview-parallel-workstream-governance.test.mjs tests/quant-interview-random-walks-markov-chains-completion.test.mjs tests/quant-interview-reasoning-communication-completion.test.mjs tests/quant-interview-role-employer-fit-completion.test.mjs docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md
git commit -m "docs(quant-interview): record active assessment formats 016"
```

### Task 5: Prove the immutable active commit in Windows, WSL, and GitHub CI

**Files:**
- Create: `.github/workflows/quant-interview-assessment-formats-016-temporary.yml`
- Modify only if a real gate exposes a defect: prior 016 files plus a focused regression test.

**Interfaces:**
- Consumes: fully integrated active 016 tree.
- Produces: immutable `ACTIVE_SHA` and successful positive integer `RUN_ID` for Task 6.

- [ ] **Step 1: Create exact temporary workflow**

```yaml
name: Quant Interview Assessment Formats 016 Temporary CI

on:
  push:
    branches:
      - codex/quant-interview-assessment-formats-016
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

- [ ] **Step 2: Run Windows gates separately in exact order**

```bash
npm run master:directory:check
npm run knowledge:directory:check
npm run test
npm run check
npm run build
```

Require every exit code 0. Record exact test total, Astro errors, and pages.

- [ ] **Step 3: Review and commit the complete active tree**

```bash
git diff --check
git status --short
git diff --stat
git add -- .github/workflows/quant-interview-assessment-formats-016-temporary.yml
git commit -m "ci(quant-interview): verify active assessment formats 016"
git rev-parse HEAD
```

Stage only approved 016 active-tree changes and workflow; never stage source documents or SDD artifacts. Save the full 40-character result as `ACTIVE_SHA` and never amend it.

- [ ] **Step 4: Verify exact active SHA in independent WSL native-LF Node 24**

Prove `/home/lorien/quant-interview-assessment-formats-016` absent, create detached worktree at exact `ACTIVE_SHA`, use Node 24, run `npm ci`, audit `git ls-files --eol`, then run the same five commands in order.

Require clean tree, no CRLF/mixed text, temporary workflow present with LF, 76/53, 205/545, Red 9.2 next, active 016 without evidence fields, no 017, and no tracked source media. Resolve and remove only the exact WSL path after success; prove absence and deregistration.

- [ ] **Step 5: Push feature branch and capture matching CI**

```bash
git push -u origin codex/quant-interview-assessment-formats-016
gh run list --workflow quant-interview-assessment-formats-016-temporary.yml --branch codex/quant-interview-assessment-formats-016 --limit 5 --json databaseId,headSha,status,conclusion,url
```

Select only the run whose `headSha` exactly equals `ACTIVE_SHA`; watch with `gh run watch` and `--exit-status`. Require success for `npm ci` and every ordered gate. Save its positive integer as `RUN_ID`.

- [ ] **Step 6: Stop on any mismatch**

If any Windows, WSL, or CI gate fails, add a focused regression test, fix the root cause, create a new active commit, and repeat all three environments. Never reuse stale evidence.

### Task 6: Remove temporary CI, close 016 factually, and deliver

**Files:**
- Delete: `.github/workflows/quant-interview-assessment-formats-016-temporary.yml`
- Modify: `tests/quant-interview-assessment-formats-workstream.test.mjs`
- Modify: `src/data/quant-interview/workstreams/interview-strategy-communication-interview-process-formats-assessment-strategy-016.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: factual `ACTIVE_SHA` and `RUN_ID` from Task 5.
- Produces: workflow-free complete 016 branch, final verified public/master state, integration choice.

- [ ] **Step 1: Delete and separately commit the temporary workflow**

```bash
git add .github/workflows/quant-interview-assessment-formats-016-temporary.yml
git commit -m "chore(quant-interview): remove assessment formats 016 temporary CI"
git rev-parse HEAD
```

Save the removal commit SHA.

- [ ] **Step 2: Verify the exact workflow-free removal commit in WSL**

Create a fresh detached WSL worktree at the removal commit. Assert workflow absence, run `npm ci`, LF audit, and five ordered gates. Require active manifest still evidence-free and all 76/53, 205/545, Red 9.2 invariants. Safely remove only the exact worktree.

- [ ] **Step 3: Make workstream test phase-aware**

Replace exact active status assertion with:

```js
assert.match(manifest.status, /^(?:active|complete)$/);
if (manifest.status === 'active') {
  assert.equal('preClosureActiveGate' in manifest, false);
  assert.equal('verification' in manifest, false);
  assert.equal('finalTreeGate' in manifest, false);
}
```

- [ ] **Step 4: Record exact complete evidence**

Set status `complete`. Add evidence fields using this contract:

| Object | Field | Required value |
|---|---|---|
| `preClosureActiveGate` | `status` | `"active"` |
| `preClosureActiveGate` | `commit` | exact 40-character `ACTIVE_SHA` |
| `preClosureActiveGate` | `environment` | `"wsl-native-lf-node24"` |
| `preClosureActiveGate` | `commands` | exact five ordered commands |
| `preClosureActiveGate` | `conclusion` | `"success"` |
| `verification` | `commit` | same `ACTIVE_SHA` |
| `verification` | `runId` | numeric `RUN_ID` |
| `verification` | `commands` | same five commands |
| `verification` | `conclusion` | `"success"` |
| `verification` | `temporaryArtifacts` | `[".github/workflows/quant-interview-assessment-formats-016-temporary.yml"]` |
| `finalTreeGate` | `environment` | `"wsl-native-lf-node24"` |
| `finalTreeGate` | `commands` | same five commands |
| `finalTreeGate` | `conclusion` | `"success"` |
| `finalTreeGate` | `temporaryArtifactsAbsent` | `true` |

Confirm verification and pre-closure commit fields are identical before saving.

- [ ] **Step 5: Write completed HANDOFF and regenerate directory**

Add `## Completed cross-book workstream 16` with exact id, active SHA, CI run, environments, commands, new Knowledge, no Problems, +0/+1, nine row dispositions, Red 1.7 repair, 76/53, 205/545, source-neutral boundary, and no completeness overclaim.

Set current state:

```markdown
Current bounded topic:

**No bounded topic is active. Workstream 016 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 017 is not active or authorized by this closure.

## Master directory ingestion state

**No bounded ingestion workstream is active. The three-book master directory migration remains complete.**

First pending master record: `red-book::9.2::guidance`
```

Run `npm run knowledge:directory` and check mode.

- [ ] **Step 6: Run closure-focused tests and commit**

```bash
node --test tests/quant-interview-assessment-formats-completion.test.mjs tests/quant-interview-assessment-formats-workstream.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-knowledge-directory.test.mjs
npm test
git diff --check
git add -- tests/quant-interview-assessment-formats-workstream.test.mjs src/data/quant-interview/workstreams/interview-strategy-communication-interview-process-formats-assessment-strategy-016.json docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md
git commit -m "docs(quant-interview): close assessment formats 016"
```

- [ ] **Step 7: Run final Windows and WSL gates on closure HEAD**

Run all five Windows gates separately. Create a fresh detached WSL native-LF Node 24 worktree at exact closure HEAD, assert workflow absence, run `npm ci` and all five gates, verify 76/53, 205/545, Red 9.2, complete 016, inactive 017, clean LF tree, then safely remove exact worktree.

- [ ] **Step 8: Review full branch and push final closure**

Review from branch base for exact nine rows, mappings/notes/pages, one public page, catalog/reciprocal links, historical evidence integrity, workflow absence, and no source/unrelated changes.

```bash
git diff --check
git status --short
git push
```

Verify remote feature ref equals local HEAD. Then use finishing-a-development-branch and execute only the user-selected merge/PR/keep action.
