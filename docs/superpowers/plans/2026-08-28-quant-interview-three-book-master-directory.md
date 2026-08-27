# Quant Interview Three-Book Master Directory Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify one complete, deterministic three-book master directory, migrate the existing 76 Problems / 50 Knowledge corpus into it without public-content changes, and compute the exact first pending record for the next sequential ingestion plan.

**Architecture:** A private `master-directory.json` stores merged structural nodes and ordered ingestible items. A focused library validates source identity, topic ownership, ordering, lifecycle states, canonical targets, and sequential scope; repository scripts load and project the committed data into the existing internal Knowledge directory while the public import graph remains unchanged. PDF enumeration is completed source by source with stable checkpoints, then existing ledgers and workstreams are reconciled into the new authority before any new Problem or Knowledge is authored.

**Tech Stack:** Node.js 24 ES modules, Node built-in test runner, JSON repository data, Astro 5, PowerShell on Windows, WSL-native LF verification, Poppler (`pdftoppm`) for source-page visual review.

## Global Constraints

- Approved design: `docs/superpowers/specs/2026-08-28-quant-interview-three-book-master-directory-design.md` at commit `321d63f`.
- Work directly in `D:\lorien-lab.github.io`; preserve the untracked `docs\书籍\` PDFs and the untracked LeetCode preparation document.
- Verified source order is exactly `green-book`, `red-book`, `150-most-frequently-asked`.
- Canonical top-level topic order is exactly the existing taxonomy order 01 through 10.
- Existing child-topic order in `src/data/quant-interview/topics/taxonomy.json` remains canonical.
- Every actual source question gets one stable master item even when it resolves as duplicate, variant, Knowledge-only, guidance, or non-content.
- Public Problems and Knowledge remain source-neutral; no source title, source id, source item number, page evidence, or copied source answer enters public content.
- Migration is zero-delta: exactly 76 canonical Problems and 50 topic-classified Knowledge nodes before the first new ingestion workstream.
- Completed workstreams 001 through 013 remain closed with unchanged factual verification evidence.
- The first sorted `pending` record is the only legal first scope item for the next ingestion workstream.
- No workstream 014 activation or new public content belongs to this migration plan.
- Actual new ingestion begins only in a second plan generated from the verified `firstPendingKey`.
- All generated Markdown is deterministic and contains no whole-book completion percentage.
- Use `apply_patch` for repository edits; use `tmp/pdfs/` only for transient rendered pages and remove or recoverably move previews after each source checkpoint.
- Authoritative gates are Node 24 `npm run test`, `npm run check`, and `npm run build` in that order.

## File Structure

- Create `src/lib/quantInterviewMasterDirectory.mjs` — pure master-directory keying, sorting, selection, and validation.
- Create `src/data/quant-interview/master-directory.json` — committed private authority containing `nodes` and `items`.
- Create `scripts/validate-quant-interview-master-directory.mjs` — repository loader and `--check` CLI.
- Create `tests/quant-interview-master-directory.test.mjs` — unit contract for schema, ordering, lifecycle, targets, and sequential scope.
- Create `tests/quant-interview-master-directory-repository.test.mjs` — exact repository enumeration, migration, 76/50, and first-pending assertions.
- Modify `scripts/generate-quant-interview-knowledge-directory.mjs` — load master state and add private queue projection.
- Modify `tests/quant-interview-knowledge-directory.test.mjs` — freeze deterministic master projection and public boundary.
- Modify `tests/quant-interview-topic-foundation.test.mjs` — guard public routes and libraries from importing master state.
- Modify `package.json` — add `master:directory:check`.
- Regenerate `docs/quant-interview/KNOWLEDGE_DIRECTORY.md` — generated private directory with exact queue summary.
- Modify `docs/quant-interview/HANDOFF.md` — record migration closure and the computed first pending key without activating 014.

## Plan Scope Boundary

This plan implements rollout phases 1–3 from the approved design: schema, validation, complete three-source enumeration, existing-state migration, internal projection, and migration closure. It deliberately stops before new public authoring. Rollout phase 4 becomes a second plan whose exact title, leaf topic, evidence pages, and item scope are derived from the verified `green-book::1.1::guidance` first-pending result. This split keeps the migration zero-delta and prevents guessed content requirements from entering the master-directory implementation.

---

### Task 1: Master directory pure contract

**Files:**
- Create: `src/lib/quantInterviewMasterDirectory.mjs`
- Create: `tests/quant-interview-master-directory.test.mjs`

**Interfaces:**
- Consumes: plain JSON objects plus context sets/maps; no filesystem access.
- Produces: `SOURCE_ORDER`, `TERMINAL_STATES`, `makeMasterItemKey(record)`, `compareMasterItems(left, right)`, `sortMasterItems(items)`, `getNextPendingItem(directory)`, `validateMasterDirectory(directory, context)`, and `validateSequentialScope(directory, itemKeys)`.

- [ ] **Step 1: Write the failing key, order, and selector tests**

Create `tests/quant-interview-master-directory.test.mjs` with this fixture and first contract:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getNextPendingItem,
  makeMasterItemKey,
  sortMasterItems,
  validateMasterDirectory,
  validateSequentialScope,
} from '../src/lib/quantInterviewMasterDirectory.mjs';

const taxonomy = {
  version: 1,
  topics: [{
    id: 'interview-strategy-communication', title: 'Interview Strategy & Communication', order: 1,
    children: [
      { id: 'interview-preparation', title: 'Interview Preparation', order: 1 },
      { id: 'reasoning-communication', title: 'Reasoning & Communication', order: 2 },
    ],
  }],
};

const baseDirectory = {
  version: 1,
  sourceOrder: ['green-book', 'red-book', '150-most-frequently-asked'],
  nodes: [
    { id: 'topic::interview-strategy-communication', kind: 'topic', title: 'Interview Strategy & Communication', parentId: null, order: 1, canonicalTopic: 'interview-strategy-communication' },
    { id: 'topic::interview-preparation', kind: 'topic', title: 'Interview Preparation', parentId: 'topic::interview-strategy-communication', order: 1, canonicalTopic: 'interview-preparation' },
    { id: 'topic::reasoning-communication', kind: 'topic', title: 'Reasoning & Communication', parentId: 'topic::interview-strategy-communication', order: 2, canonicalTopic: 'reasoning-communication' },
  ],
  items: [
    {
      key: 'green-book::1.1::guidance', kind: 'guidance', source: 'green-book',
      sourceSection: '1.1', sourceItem: null,
      questionPages: [{ startPage: 17, endPage: 17 }], solutionPages: [],
      primaryTopic: 'interview-preparation',
      canonicalTopics: ['interview-strategy-communication', 'interview-preparation'],
      sortKey: '01.01|01|0001|green-book::1.1::guidance', state: 'pending',
      canonicalProblems: [], canonicalKnowledge: [], workstream: null, resolutionNote: null,
    },
    {
      key: 'green-book::1.3::guidance', kind: 'guidance', source: 'green-book',
      sourceSection: '1.3', sourceItem: null,
      questionPages: [{ startPage: 18, endPage: 18 }], solutionPages: [],
      primaryTopic: 'reasoning-communication',
      canonicalTopics: ['interview-strategy-communication', 'reasoning-communication'],
      sortKey: '01.02|01|0001|green-book::1.3::guidance', state: 'knowledge-only',
      canonicalProblems: [], canonicalKnowledge: ['problem-framing-clarification-assumption-management'],
      workstream: 'interview-strategy-communication-reasoning-communication-013',
      resolutionNote: 'Resolved to the canonical problem-framing Knowledge node.',
    },
  ],
};

const context = {
  taxonomy,
  sourceIds: new Set(['green-book', 'red-book', '150-most-frequently-asked']),
  sourceSections: new Map([
    ['green-book', new Set(['1.1', '1.3'])],
    ['red-book', new Set()],
    ['150-most-frequently-asked', new Set()],
  ]),
  problemSlugs: new Set(),
  knowledgeSlugs: new Set(['problem-framing-clarification-assumption-management']),
  workstreamIds: new Set(['interview-strategy-communication-reasoning-communication-013']),
};

test('master keys, order, and first pending record are deterministic', () => {
  assert.equal(makeMasterItemKey(baseDirectory.items[0]), 'green-book::1.1::guidance');
  assert.deepEqual(sortMasterItems([...baseDirectory.items].reverse()).map(({ key }) => key), baseDirectory.items.map(({ key }) => key));
  assert.equal(getNextPendingItem(baseDirectory)?.key, 'green-book::1.1::guidance');
  assert.equal(validateMasterDirectory(baseDirectory, context), true);
});
```

- [ ] **Step 2: Run the focused test to prove RED**

Run:

```powershell
node --test tests/quant-interview-master-directory.test.mjs
```

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `src/lib/quantInterviewMasterDirectory.mjs`.

- [ ] **Step 3: Implement keys, sorting, and next-item selection**

Create `src/lib/quantInterviewMasterDirectory.mjs` with these exact exports and invariants:

```js
import { flattenTopics } from './quantInterviewTopics.mjs';

export const SOURCE_ORDER = Object.freeze([
  'green-book',
  'red-book',
  '150-most-frequently-asked',
]);

export const TERMINAL_STATES = new Set([
  'canonical-problem',
  'merged-duplicate',
  'variant',
  'knowledge-only',
  'interview-guidance',
  'non-content-frontmatter',
  'non-content-backmatter',
]);

const STATES = new Set(['pending', ...TERMINAL_STATES]);
const PROBLEM_STATES = new Set(['canonical-problem', 'merged-duplicate', 'variant']);
const ITEM_KINDS = new Set(['question', 'guidance', 'theory', 'non-content']);
const NODE_KINDS = new Set(['topic', 'source-section', 'source-subsection']);
const SORT_KEY = /^\d{2}\.\d{2}\|0[1-3]\|\d{4}\|.+$/;

export function makeMasterItemKey(record) {
  const unit = record.sourceItem ?? (record.kind === 'question' ? 'question' : record.kind);
  return `${record.source}::${record.sourceSection}::${unit}`;
}

export function compareMasterItems(left, right) {
  return left.sortKey.localeCompare(right.sortKey);
}

export function sortMasterItems(items = []) {
  return [...items].sort(compareMasterItems);
}

export function getNextPendingItem(directory) {
  return sortMasterItems(directory?.items).find((item) => item.state === 'pending') ?? null;
}
```

- [ ] **Step 4: Add validation and sequential-scope tests**

Append tests that mutate one contract at a time:

```js
test('master validator rejects duplicate, malformed, and unresolved records', () => {
  const duplicate = { ...baseDirectory, items: [...baseDirectory.items, baseDirectory.items[0]] };
  assert.throws(() => validateMasterDirectory(duplicate, context), /duplicate master item key/i);

  const wrongKey = structuredClone(baseDirectory);
  wrongKey.items[0].key = 'green-book::wrong::key';
  assert.throws(() => validateMasterDirectory(wrongKey, context), /stable key mismatch/i);

  const terminalWithoutNote = structuredClone(baseDirectory);
  terminalWithoutNote.items[1].resolutionNote = null;
  assert.throws(() => validateMasterDirectory(terminalWithoutNote, context), /terminal resolutionNote/i);

  const missingKnowledge = structuredClone(baseDirectory);
  missingKnowledge.items[1].canonicalKnowledge = ['missing-knowledge'];
  assert.throws(() => validateMasterDirectory(missingKnowledge, context), /unresolved canonical Knowledge/i);
});

test('sequential scope must start at first pending and remain consecutive', () => {
  assert.equal(validateSequentialScope(baseDirectory, ['green-book::1.1::guidance']), true);
  assert.throws(
    () => validateSequentialScope(baseDirectory, ['green-book::1.3::guidance']),
    /must start at first pending.*green-book::1\.1::guidance/i,
  );
});
```

- [ ] **Step 5: Implement full pure validation**

Add `validateMasterDirectory` and `validateSequentialScope`. The implementation must perform these checks in order so test failures remain specific:

```js
function requireObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
}

function requireString(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be a non-empty string.`);
}

function validateRanges(ranges, label) {
  if (!Array.isArray(ranges)) throw new Error(`${label} must be an array.`);
  let previousEnd = 0;
  for (const range of ranges) {
    if (!Number.isInteger(range?.startPage) || !Number.isInteger(range?.endPage) || range.startPage < 1 || range.endPage < range.startPage) {
      throw new Error(`${label} contains an invalid page range.`);
    }
    if (range.startPage <= previousEnd) throw new Error(`${label} page ranges overlap or are unsorted.`);
    previousEnd = range.endPage;
  }
}

export function validateMasterDirectory(directory, context) {
  requireObject(directory, 'Master directory');
  requireObject(context, 'Master directory context');
  if (directory.version !== 1) throw new Error('Master directory version must be 1.');
  if (JSON.stringify(directory.sourceOrder) !== JSON.stringify(SOURCE_ORDER)) throw new Error('Master sourceOrder is not canonical.');
  if (!Array.isArray(directory.nodes) || !Array.isArray(directory.items)) throw new Error('Master directory requires nodes and items arrays.');

  const topics = flattenTopics(context.taxonomy);
  const topicById = new Map(topics.map((topic) => [topic.id, topic]));
  const nodeIds = new Set();
  for (const node of directory.nodes) {
    requireObject(node, 'Master node');
    requireString(node.id, 'Master node id');
    if (nodeIds.has(node.id)) throw new Error(`Duplicate master node id: ${node.id}`);
    nodeIds.add(node.id);
    if (!NODE_KINDS.has(node.kind)) throw new Error(`Invalid master node kind: ${node.kind}`);
    if (!Number.isInteger(node.order) || node.order < 1) throw new Error(`Invalid master node order: ${node.id}`);
    if (node.parentId !== null && !directory.nodes.some((candidate) => candidate.id === node.parentId)) throw new Error(`Missing master parent node: ${node.parentId}`);
    if (node.canonicalTopic && !topicById.has(node.canonicalTopic)) throw new Error(`Unknown master node topic: ${node.canonicalTopic}`);
  }
  const canonicalTopicNodes = directory.nodes.filter((node) => node.kind === 'topic').map((node) => node.canonicalTopic);
  if (JSON.stringify(canonicalTopicNodes) !== JSON.stringify(topics.map(({ id }) => id))) {
    throw new Error('Master topic nodes must exactly match canonical taxonomy order.');
  }

  const keys = new Set();
  const sortKeys = new Set();
  for (const item of directory.items) {
    requireObject(item, 'Master item');
    requireString(item.key, 'Master item key');
    if (keys.has(item.key)) throw new Error(`Duplicate master item key: ${item.key}`);
    keys.add(item.key);
    if (item.key !== makeMasterItemKey(item)) throw new Error(`Stable key mismatch: ${item.key}`);
    if (!ITEM_KINDS.has(item.kind)) throw new Error(`Invalid master item kind at ${item.key}`);
    if (!context.sourceIds.has(item.source)) throw new Error(`Unknown master source at ${item.key}`);
    if (!context.sourceSections.get(item.source)?.has(item.sourceSection)) throw new Error(`Unknown master source section at ${item.key}`);
    validateRanges(item.questionPages, `${item.key} questionPages`);
    validateRanges(item.solutionPages, `${item.key} solutionPages`);
    if (!topicById.has(item.primaryTopic)) throw new Error(`Unknown primaryTopic at ${item.key}`);
    if (!Array.isArray(item.canonicalTopics) || !item.canonicalTopics.includes(item.primaryTopic)) throw new Error(`primaryTopic must be present in canonicalTopics at ${item.key}`);
    if (!SORT_KEY.test(item.sortKey) || sortKeys.has(item.sortKey)) throw new Error(`Invalid or duplicate sortKey at ${item.key}`);
    sortKeys.add(item.sortKey);
    const [topicRank, sourceRank] = item.sortKey.split('|');
    const topic = topicById.get(item.primaryTopic);
    let root = topic;
    while (root.parentId) root = topicById.get(root.parentId);
    const expectedTopicRank = `${String(root.order).padStart(2, '0')}.${String(topic.order).padStart(2, '0')}`;
    const expectedSourceRank = String(SOURCE_ORDER.indexOf(item.source) + 1).padStart(2, '0');
    if (topicRank !== expectedTopicRank) throw new Error(`sortKey topic rank mismatch at ${item.key}`);
    if (sourceRank !== expectedSourceRank) throw new Error(`sortKey source rank mismatch at ${item.key}`);
    if (!STATES.has(item.state)) throw new Error(`Invalid master state at ${item.key}`);
    if (!Array.isArray(item.canonicalProblems) || !Array.isArray(item.canonicalKnowledge)) throw new Error(`Canonical targets must be arrays at ${item.key}`);
    if (item.state === 'pending' && (item.canonicalProblems.length || item.canonicalKnowledge.length || item.workstream !== null || item.resolutionNote !== null)) throw new Error(`Pending record contains completion claims at ${item.key}`);
    if (TERMINAL_STATES.has(item.state) && (typeof item.resolutionNote !== 'string' || !item.resolutionNote.trim())) throw new Error(`Terminal resolutionNote is required at ${item.key}`);
    if (PROBLEM_STATES.has(item.state) && item.canonicalProblems.length === 0) throw new Error(`Problem state requires canonical Problem at ${item.key}`);
    if (item.state === 'knowledge-only' && item.canonicalKnowledge.length === 0) throw new Error(`Knowledge-only state requires canonical Knowledge at ${item.key}`);
    if (['interview-guidance', 'non-content-frontmatter', 'non-content-backmatter'].includes(item.state) && (item.canonicalProblems.length || item.canonicalKnowledge.length)) throw new Error(`Non-public state has canonical targets at ${item.key}`);
    for (const slug of item.canonicalProblems) if (!context.problemSlugs.has(slug)) throw new Error(`Unresolved canonical Problem ${slug} at ${item.key}`);
    for (const slug of item.canonicalKnowledge) if (!context.knowledgeSlugs.has(slug)) throw new Error(`Unresolved canonical Knowledge ${slug} at ${item.key}`);
    if (item.workstream !== null && !context.workstreamIds.has(item.workstream)) throw new Error(`Unknown workstream ${item.workstream} at ${item.key}`);
  }
  const ordered = sortMasterItems(directory.items);
  if (ordered.some((item, index) => item !== directory.items[index])) throw new Error('Master items are not stored in canonical order.');
  return true;
}

export function validateSequentialScope(directory, itemKeys) {
  if (!Array.isArray(itemKeys) || itemKeys.length === 0) throw new Error('Sequential scope requires at least one item key.');
  const ordered = sortMasterItems(directory.items);
  const firstPending = ordered.findIndex((item) => item.state === 'pending');
  if (firstPending < 0) throw new Error('Sequential scope cannot start because no pending item exists.');
  if (itemKeys[0] !== ordered[firstPending].key) throw new Error(`Sequential scope must start at first pending ${ordered[firstPending].key}.`);
  const expected = ordered.slice(firstPending, firstPending + itemKeys.length).map(({ key }) => key);
  if (JSON.stringify(itemKeys) !== JSON.stringify(expected)) throw new Error('Sequential scope item keys must be consecutive.');
  return true;
}
```

- [ ] **Step 6: Run focused tests and commit**

Run:

```powershell
node --test tests/quant-interview-master-directory.test.mjs
git diff --check
```

Expected: all master-directory unit tests pass and `git diff --check` prints nothing.

Commit:

```powershell
git add -- src/lib/quantInterviewMasterDirectory.mjs tests/quant-interview-master-directory.test.mjs
git commit -m "feat(quant-interview): add master directory contract"
```

### Task 2: Repository loader and check CLI

**Files:**
- Create: `scripts/validate-quant-interview-master-directory.mjs`
- Create: `tests/quant-interview-master-directory-repository.test.mjs`
- Create: `src/data/quant-interview/master-directory.json`
- Modify: `package.json:6-15`

**Interfaces:**
- Consumes: committed taxonomy, three source manifests, three verified TOCs, three coverage ledgers, public Problem/Knowledge frontmatter, workstream manifests, and `master-directory.json`.
- Produces: `loadMasterDirectoryRepository(repoRoot)`, `validateMasterDirectoryRepository(inputs)`, and CLI command `npm run master:directory:check`.

- [ ] **Step 1: Add a failing repository loader test**

Create `tests/quant-interview-master-directory-repository.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

test('repository loader exposes the 76/50 baseline and rejects an incomplete shell', async () => {
  await access('src/data/quant-interview/master-directory.json');
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  assert.equal(inputs.problemSlugs.size, 76);
  assert.equal(inputs.knowledgeSlugs.size, 50);
  assert.throws(
    () => validateMasterDirectoryRepository(inputs),
    /master topic nodes must exactly match canonical taxonomy order/i,
  );
});
```

- [ ] **Step 2: Run to prove the repository contract is RED**

Run:

```powershell
node --test tests/quant-interview-master-directory-repository.test.mjs
```

Expected: FAIL because the validator script and master JSON do not exist.

- [ ] **Step 3: Create the minimal committed master shell**

Create `src/data/quant-interview/master-directory.json`:

```json
{
  "version": 1,
  "sourceOrder": [
    "green-book",
    "red-book",
    "150-most-frequently-asked"
  ],
  "nodes": [],
  "items": []
}
```

This file is intentionally invalid against complete-repository expectations until Tasks 3–6 populate it.

- [ ] **Step 4: Implement the repository loader and CLI**

Create `scripts/validate-quant-interview-master-directory.mjs`. Export the two named functions and guard CLI execution with `pathToFileURL(process.argv[1]).href === import.meta.url`. The loader must:

```js
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateMasterDirectory } from '../src/lib/quantInterviewMasterDirectory.mjs';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

async function readContentSlugs(directory, requireQuantTopics = false) {
  const files = await readdir(directory, { recursive: true });
  const slugs = new Set();
  for (const file of files.filter((entry) => String(entry).endsWith('.md'))) {
    const text = await readFile(path.join(directory, String(file)), 'utf8');
    if (requireQuantTopics && !/^quantInterviewTopics:\s*\[[^\]]+\]$/m.test(text)) continue;
    slugs.add(path.basename(String(file), '.md'));
  }
  return slugs;
}

function flattenTocSections(sections, output = new Set()) {
  for (const section of sections ?? []) {
    output.add(section.id);
    flattenTocSections(section.children, output);
  }
  return output;
}

export async function loadMasterDirectoryRepository(repoRoot = process.cwd()) {
  const dataRoot = path.join(repoRoot, 'src', 'data', 'quant-interview');
  const sources = ['green-book', 'red-book', '150-most-frequently-asked'];
  const [directory, taxonomy, ...sourceInputs] = await Promise.all([
    readJson(path.join(dataRoot, 'master-directory.json')),
    readJson(path.join(dataRoot, 'topics', 'taxonomy.json')),
    ...sources.flatMap((source) => [
      readJson(path.join(dataRoot, `${source}.json`)),
      readJson(path.join(dataRoot, 'toc', `${source}.json`)),
      readJson(path.join(dataRoot, 'coverage', `${source}.json`)),
    ]),
  ]);
  const sourceManifests = {};
  const tocs = {};
  const coverageLedgers = {};
  sources.forEach((source, index) => {
    sourceManifests[source] = sourceInputs[index * 3];
    tocs[source] = sourceInputs[index * 3 + 1];
    coverageLedgers[source] = sourceInputs[index * 3 + 2];
  });
  const workstreamFiles = (await readdir(path.join(dataRoot, 'workstreams'))).filter((file) => file.endsWith('.json')).sort();
  const workstreams = await Promise.all(workstreamFiles.map((file) => readJson(path.join(dataRoot, 'workstreams', file))));
  return {
    directory,
    taxonomy,
    sourceManifests,
    tocs,
    coverageLedgers,
    workstreams,
    problemSlugs: await readContentSlugs(path.join(repoRoot, 'src', 'content', 'problems')),
    knowledgeSlugs: await readContentSlugs(path.join(repoRoot, 'src', 'content', 'knowledge'), true),
  };
}

export function validateMasterDirectoryRepository(inputs) {
  const sourceIds = new Set(Object.keys(inputs.sourceManifests));
  const sourceSections = new Map(Object.entries(inputs.tocs).map(([source, toc]) => [source, flattenTocSections(toc.sections)]));
  validateMasterDirectory(inputs.directory, {
    taxonomy: inputs.taxonomy,
    sourceIds,
    sourceSections,
    problemSlugs: inputs.problemSlugs,
    knowledgeSlugs: inputs.knowledgeSlugs,
    workstreamIds: new Set(inputs.workstreams.map(({ id }) => id)),
  });
  for (const [source, sectionIds] of sourceSections) {
    const sourceNodes = inputs.directory.nodes.filter((node) => node.source === source);
    const sourceItems = inputs.directory.items.filter((item) => item.source === source);
    if (sourceNodes.length === 0 || sourceItems.length === 0) throw new Error(`Master directory is missing ${source} enumeration.`);
    for (const sectionId of sectionIds) {
      if (!sourceNodes.some((node) => node.sourceSection === sectionId)
        && !sourceItems.some((item) => item.sourceSection === sectionId)) {
        throw new Error(`Master directory is missing ${source} section ${sectionId}.`);
      }
    }
  }
  return true;
}

async function main() {
  if (process.argv.slice(2).join(' ') !== '--check') throw new Error('Usage: node scripts/validate-quant-interview-master-directory.mjs --check');
  validateMasterDirectoryRepository(await loadMasterDirectoryRepository(process.cwd()));
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
```

- [ ] **Step 5: Register the CLI script and freeze failure behavior**

Add to `package.json` scripts:

```json
"master:directory:check": "node scripts/validate-quant-interview-master-directory.mjs --check"
```

Add a test that spawns `npm run master:directory:check` and asserts nonzero status while `nodes` and `items` remain empty. Expected stderr must identify the first missing structural requirement rather than a JSON parse error.

- [ ] **Step 6: Run focused tests and commit the loader shell**

Run:

```powershell
node --test tests/quant-interview-master-directory.test.mjs tests/quant-interview-master-directory-repository.test.mjs
npm run master:directory:check
```

Expected: unit and repository-loader tests pass because the incomplete shell is rejected explicitly; the CLI remains RED with `Master topic nodes must exactly match canonical taxonomy order.` Record that CLI failure text in the task log.

Commit the executable loader and deliberately incomplete shell only after the expected RED is demonstrated:

```powershell
git add -- package.json scripts/validate-quant-interview-master-directory.mjs src/data/quant-interview/master-directory.json tests/quant-interview-master-directory-repository.test.mjs
git commit -m "test(quant-interview): define master directory repository gate"
```

### Task 3: Green Book complete enumeration

**Files:**
- Modify: `src/data/quant-interview/master-directory.json`
- Modify: `tests/quant-interview-master-directory-repository.test.mjs`
- Source only, never stage: `docs/书籍/A Practical Guide To Quantitative Finance Interviews copy.pdf`

**Interfaces:**
- Consumes: Green verified TOC, source-topic map, Green coverage ledger, PDF pages 17–210, and the Task 1 item contract.
- Produces: every Green structural node and every reviewable Green guidance, theory, and question item with PDF-page evidence and stable canonical ordering.

- [ ] **Step 1: Add Green structural and item-enumeration assertions**

Append repository tests that require:

```js
test('Green Book is completely represented in physical and canonical order', async () => {
  const { directory, tocs } = await loadMasterDirectoryRepository(process.cwd());
  const greenNodes = directory.nodes.filter((node) => node.source === 'green-book');
  const greenItems = directory.items.filter((item) => item.source === 'green-book');
  assert.ok(greenNodes.length > 0);
  assert.ok(greenItems.length > 0);
  assert.equal(greenItems[0].key, 'green-book::1.1::guidance');
  assert.deepEqual(greenItems[0].questionPages, [{ startPage: 17, endPage: 17 }]);
  assert.equal(new Set(greenItems.map(({ key }) => key)).size, greenItems.length);
  const tocIds = new Set();
  const visit = (sections = []) => sections.forEach((section) => { tocIds.add(section.id); visit(section.children); });
  visit(tocs['green-book'].sections);
  for (const id of tocIds) {
    assert.equal(
      greenNodes.some((node) => node.sourceSection === id)
        || greenItems.some((item) => item.sourceSection === id),
      true,
      `missing Green TOC section ${id}`,
    );
  }
  for (const item of greenItems) {
    assert.ok(item.questionPages.length > 0, item.key);
    assert.equal(item.solutionPages.length, 0, item.key);
  }
});
```

Add a second assertion that every `green-book` content entry from `source-topic-map.json` has either at least one matching master item or an explicit source structural node. This prevents named puzzles such as `2.1.screwy-pirates` from disappearing behind their section container.

- [ ] **Step 2: Run the Green test to prove RED**

Run:

```powershell
node --test --test-name-pattern="Green Book" tests/quant-interview-master-directory-repository.test.mjs
```

Expected: FAIL because the master shell has no Green nodes or items.

- [ ] **Step 3: Render and inspect Green content in stable chunks**

Use the verified source file and Poppler. Keep the output under `tmp/pdfs/green/`:

```powershell
$greenPdf = (Get-ChildItem -LiteralPath 'docs\书籍' -File | Where-Object Name -Like 'A Practical Guide*' | Select-Object -First 1).FullName
$renderRoot = 'tmp\pdfs\green'
New-Item -ItemType Directory -Force -Path $renderRoot | Out-Null
pdftoppm -f 17 -l 60 -png -r 110 $greenPdf "$renderRoot\green-01"
pdftoppm -f 61 -l 110 -png -r 110 $greenPdf "$renderRoot\green-02"
pdftoppm -f 111 -l 160 -png -r 110 $greenPdf "$renderRoot\green-03"
pdftoppm -f 161 -l 210 -png -r 110 $greenPdf "$renderRoot\green-04"
```

Inspect every rendered content page in numerical order. Record only question/guidance boundaries and short neutral labels in the master JSON; do not transcribe source answers. Confirm the already observed anchors:

```text
PDF 17: Chapter 1, section 1.1 and start of 1.2
PDF 18: continuation of 1.2 and sections 1.3–1.5
PDF 19: Chapter 2 and start of 2.1 Screwy pirates
```

- [ ] **Step 4: Add all Green structural nodes**

First copy every taxonomy node exactly once into canonical topic nodes, preserving the flattened taxonomy order. Then flatten the verified Green TOC into `source-section` / `source-subsection` nodes. Topic nodes appear before source nodes. Use ids:

```text
source-section::${source}::${sourceSection}
```

Each Green source node records `source: "green-book"`, exact `sourceSection`, its verified title, parent source node, and physical order. Canonical ownership belongs to item records; mixed source containers do not force one topic onto a structural node.

- [ ] **Step 5: Add every Green ingestible item**

For sections 1.1–1.5 use one `guidance` record per section. For theory introductions use `kind: "theory"`. For each named or numbered puzzle use `kind: "question"`, the exact source-section id already used by the source-topic map, a stable physical-order integer, and the visually verified PDF range.

All not-yet-reviewed Green items remain exactly:

```json
{
  "state": "pending",
  "canonicalProblems": [],
  "canonicalKnowledge": [],
  "workstream": null,
  "resolutionNote": null
}
```

Existing Green terminal rows are migrated in Task 6, not guessed during enumeration.

After visual review, add one literal `expectedGreenItemCountBySection` object to the repository test. Its keys are every Green content source section and its integer values are the audited master-item counts. Assert every per-section count and the exact total so later omissions cannot pass through a weak `> 0` check.

- [ ] **Step 6: Validate the Green checkpoint and clean previews**

Run:

```powershell
node --test --test-name-pattern="Green Book" tests/quant-interview-master-directory-repository.test.mjs
npm run master:directory:check
git diff --check
```

Expected: Green enumeration test passes. The full master check may remain RED only because Red and 150 enumeration tests have not yet passed.

Move the exact rendered PNGs to a dated recovery directory outside the repository, then verify `git status --short` contains no `tmp/pdfs` entries.

- [ ] **Step 7: Commit the Green checkpoint**

```powershell
git add -- src/data/quant-interview/master-directory.json tests/quant-interview-master-directory-repository.test.mjs
git commit -m "data(quant-interview): enumerate Green Book master items"
```

### Task 4: Red Book complete enumeration

**Files:**
- Modify: `src/data/quant-interview/master-directory.json`
- Modify: `tests/quant-interview-master-directory-repository.test.mjs`
- Source only, never stage: `docs/书籍/Quant Job Interview Questions And Answers copy.pdf`

**Interfaces:**
- Consumes: Red verified TOC, source-topic map, Red coverage ledger, PDF pages 13–320 for content, and separate Questions/Solutions section structure.
- Produces: complete Red structural records and item records whose question and solution page ranges are paired.

- [ ] **Step 1: Add Red completeness and pairing tests**

Append:

```js
test('Red Book questions and solutions are completely paired', async () => {
  const { directory, tocs } = await loadMasterDirectoryRepository(process.cwd());
  const redNodes = directory.nodes.filter((node) => node.source === 'red-book');
  const redItems = directory.items.filter((item) => item.source === 'red-book');
  assert.ok(redNodes.length > 0);
  assert.ok(redItems.length > 0);
  assert.equal(new Set(redItems.map(({ key }) => key)).size, redItems.length);
  const questionItems = redItems.filter((item) => item.kind === 'question');
  assert.ok(questionItems.length > 0);
  for (const item of questionItems) {
    assert.ok(item.questionPages.length > 0, `${item.key} question pages`);
    assert.ok(item.solutionPages.length > 0, `${item.key} solution pages`);
  }
  const tocIds = new Set();
  const visit = (sections = []) => sections.forEach((section) => { tocIds.add(section.id); visit(section.children); });
  visit(tocs['red-book'].sections);
  for (const id of tocIds) {
    assert.equal(redNodes.some((node) => node.sourceSection === id) || redItems.some((item) => item.sourceSection === id), true, `missing Red TOC section ${id}`);
  }
});
```

- [ ] **Step 2: Run the Red test to prove RED**

```powershell
node --test --test-name-pattern="Red Book" tests/quant-interview-master-directory-repository.test.mjs
```

Expected: FAIL because no complete Red item inventory exists.

- [ ] **Step 3: Render Red question and solution ranges**

Use `tmp/pdfs/red/` and render content in explicit chunks:

```powershell
$redPdf = (Get-ChildItem -LiteralPath 'docs\书籍' -File | Where-Object Name -Like 'Quant Job Interview*' | Select-Object -First 1).FullName
$renderRoot = 'tmp\pdfs\red'
New-Item -ItemType Directory -Force -Path $renderRoot | Out-Null
pdftoppm -f 13 -l 90 -png -r 110 $redPdf "$renderRoot\red-01"
pdftoppm -f 91 -l 170 -png -r 110 $redPdf "$renderRoot\red-02"
pdftoppm -f 171 -l 250 -png -r 110 $redPdf "$renderRoot\red-03"
pdftoppm -f 251 -l 320 -png -r 110 $redPdf "$renderRoot\red-04"
```

Use the source's numbered question order when present. For chapters with `Questions` and `Solutions`, pair each question to its solution by number first, then confirm its title/model identity visually. Never infer pairing only from matching list position when numbering differs.

- [ ] **Step 4: Add Red nodes and paired items**

Use question-section ids (`2.2.1`, `3.2.1`, `6.2.2`, and analogous verified question branches) as `sourceSection`. Store solution evidence in `solutionPages`; do not create separate solution items under `2.3.*`, `3.3.*`, or `6.3.*`.

For interview-process, introductions, and soft-interview prose, create `guidance` or `theory` units in physical order. Bibliography and index remain structural backmatter and may use terminal non-content items only when needed for one-to-one source reconciliation.

After pairing, add one literal `expectedRedItemCountBySection` object to the repository test and assert every count plus the exact total. The snapshot uses question-section ownership: solution sections contribute page evidence but do not add separate items.

- [ ] **Step 5: Validate and commit the Red checkpoint**

Run:

```powershell
node --test --test-name-pattern="Red Book" tests/quant-interview-master-directory-repository.test.mjs
npm run master:directory:check
git diff --check
```

Expected: Red enumeration and pairing pass; only the still-unfinished 150 source may keep the repository-wide completeness test RED.

Recoverably move `tmp/pdfs/red/*.png` outside the repository and commit:

```powershell
git add -- src/data/quant-interview/master-directory.json tests/quant-interview-master-directory-repository.test.mjs
git commit -m "data(quant-interview): enumerate Red Book master items"
```

### Task 5: 150 Questions complete enumeration

**Files:**
- Modify: `src/data/quant-interview/master-directory.json`
- Modify: `tests/quant-interview-master-directory-repository.test.mjs`
- Source only, never stage: the file matching `docs/书籍/150_Most_Frequently_Asked_Questions_on_Quant_Interviews*.pdf`

**Interfaces:**
- Consumes: verified 150 TOC, page offset 10, existing item-level coverage rows, PDF pages 11–218, Questions sections 2.1–2.7, and Solutions sections 3.1–3.7.
- Produces: complete First Look and numbered topic-question inventory with paired solution pages.

- [ ] **Step 1: Add 150 completeness, numbering, and page-coordinate tests**

Append:

```js
test('150 Questions has complete numbered question and solution pairs', async () => {
  const { directory, sourceManifests } = await loadMasterDirectoryRepository(process.cwd());
  const items = directory.items.filter((item) => item.source === '150-most-frequently-asked');
  assert.ok(items.length > 0);
  assert.equal(sourceManifests['150-most-frequently-asked'].sourceFileMeta.arabicPageOffset, 10);
  assert.equal(new Set(items.map(({ key }) => key)).size, items.length);
  for (const item of items.filter((record) => record.kind === 'question')) {
    assert.match(item.sourceItem ?? '', /^\d+(?:\.\d+)*$/);
    assert.ok(item.questionPages.length > 0, `${item.key} question pages`);
    assert.ok(item.solutionPages.length > 0, `${item.key} solution pages`);
  }
  assert.equal(items.some((item) => item.key === '150-most-frequently-asked::1::1'), true);
  assert.equal(items.some((item) => item.key === '150-most-frequently-asked::2.7::1'), true);
});
```

Use local numbering within each source section, so `2.7::1` and `2.6::1` are distinct stable keys.

- [ ] **Step 2: Run the 150 test to prove RED**

```powershell
node --test --test-name-pattern="150 Questions" tests/quant-interview-master-directory-repository.test.mjs
```

Expected: FAIL because the complete 150 inventory is absent.

- [ ] **Step 3: Render and inspect the verified body**

```powershell
$questionsPdf = (Get-ChildItem -LiteralPath 'docs\书籍' -File | Where-Object Name -Like '150_Most_Frequently*' | Select-Object -First 1).FullName
$renderRoot = 'tmp\pdfs\150'
New-Item -ItemType Directory -Force -Path $renderRoot | Out-Null
pdftoppm -f 11 -l 60 -png -r 110 $questionsPdf "$renderRoot\questions-01"
pdftoppm -f 61 -l 110 -png -r 110 $questionsPdf "$renderRoot\questions-02"
pdftoppm -f 111 -l 160 -png -r 110 $questionsPdf "$renderRoot\questions-03"
pdftoppm -f 161 -l 218 -png -r 110 $questionsPdf "$renderRoot\questions-04"
```

Store PDF pages in `questionPages` / `solutionPages`. When recording printed pages for review, compute `displayPage = pdfPage - 10`; do not replace the PDF coordinate with the printed coordinate.

- [ ] **Step 4: Enumerate First Look and sections 2.1–2.7**

First Look uses `sourceSection: "1"` and the printed question number as `sourceItem`. Formal Questions use their exact section (`2.1` through `2.7`) and the numbering shown inside that section. Pair each with the matching solution in `3.1` through `3.7`.

Preserve all current item-level coverage identities. If an existing row uses a different human label, retain the stable numeric master key and record the old coverage key mapping in its migration `resolutionNote` during Task 6.

After pairing, add one literal `expected150ItemCountBySection` object to the repository test and assert every count plus the exact total. Also assert continuous local numbering within each of `2.1` through `2.7` according to the verified source numbering; do not invent global renumbering.

- [ ] **Step 5: Validate all three enumeration checkpoints**

Run:

```powershell
node --test --test-name-pattern="Green Book|Red Book|150 Questions" tests/quant-interview-master-directory-repository.test.mjs
npm run master:directory:check
git diff --check
```

Expected: all three enumeration suites pass. The repository check may remain RED only on migration reconciliation assertions added in Task 6.

- [ ] **Step 6: Clean previews and commit**

Recoverably move `tmp/pdfs/150/*.png` outside the repository, verify source PDFs remain untracked and unchanged, then commit:

```powershell
git add -- src/data/quant-interview/master-directory.json tests/quant-interview-master-directory-repository.test.mjs
git commit -m "data(quant-interview): enumerate 150 Questions master items"
```

### Task 6: Existing-state migration and 76/50 reconciliation

**Files:**
- Modify: `src/data/quant-interview/master-directory.json`
- Modify: `scripts/validate-quant-interview-master-directory.mjs`
- Modify: `tests/quant-interview-master-directory-repository.test.mjs`

**Interfaces:**
- Consumes: complete three-source enumeration plus all current coverage entries, public target slugs, and workstream manifests 001–013.
- Produces: terminal master records exactly matching current durable coverage; no public content delta.

- [ ] **Step 1: Write failing coverage-to-master reconciliation tests**

Add a stable legacy lookup independent of master `kind`:

```js
const legacyKey = (source, sourceSection, sourceItem) =>
  `${source}::${sourceSection}::${sourceItem ?? ''}`;

test('every legacy coverage row maps exactly once into the master directory', async () => {
  const { directory, coverageLedgers } = await loadMasterDirectoryRepository(process.cwd());
  const masterByLegacyKey = new Map();
  for (const item of directory.items) {
    const key = legacyKey(item.source, item.sourceSection, item.sourceItem);
    assert.equal(masterByLegacyKey.has(key), false, `duplicate master legacy key ${key}`);
    masterByLegacyKey.set(key, item);
  }
  for (const [source, ledger] of Object.entries(coverageLedgers)) {
    for (const entry of ledger.entries) {
      const item = masterByLegacyKey.get(legacyKey(source, entry.sourceSection, entry.sourceItem));
      assert.ok(item, `missing master migration row ${legacyKey(source, entry.sourceSection, entry.sourceItem)}`);
      assert.equal(item.state, entry.state);
      assert.deepEqual(item.canonicalProblems, entry.canonicalProblems);
      assert.deepEqual(item.canonicalKnowledge, entry.canonicalKnowledge);
    }
  }
});
```

If complete enumeration discovers that one legacy section-level row corresponds to a structural node rather than an ingestible unit, add exactly one `theory`, `guidance`, or `non-content` master item for that section; do not exempt the row from migration.

- [ ] **Step 2: Freeze the zero-delta public corpus**

Append:

```js
test('master migration preserves the exact pre-ingestion public corpus', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  assert.equal(inputs.problemSlugs.size, 76);
  assert.equal(inputs.knowledgeSlugs.size, 50);
  assert.equal(inputs.workstreams.filter(({ status }) => status !== 'complete').length, 0);
  assert.deepEqual(inputs.workstreams.map(({ id }) => id).sort(), [
    'calculus-differential-equations-limits-derivatives-012',
    'interview-strategy-communication-reasoning-communication-013',
    'linear-algebra-covariance-correlation-psd-001',
    'linear-algebra-determinants-eigenvalues-002',
    'linear-algebra-matrix-decompositions-003',
    'linear-algebra-vectors-linear-systems-004',
    'probability-statistics-combinatorial-probability-006',
    'probability-statistics-conditional-probability-bayes-007',
    'probability-statistics-expectation-variance-covariance-009',
    'probability-statistics-order-statistics-extremes-010',
    'probability-statistics-probability-foundations-005',
    'probability-statistics-random-variables-distributions-008',
    'stochastic-processes-random-walks-markov-chains-011',
  ]);
});
```

- [ ] **Step 3: Run migration tests to prove RED**

```powershell
node --test --test-name-pattern="legacy coverage|pre-ingestion public corpus" tests/quant-interview-master-directory-repository.test.mjs
```

Expected: corpus-count test passes; legacy coverage reconciliation fails at the first enumerated row whose state/targets have not yet been backfilled.

- [ ] **Step 4: Backfill every current coverage row**

For each legacy row, copy exactly:

```text
state
canonicalProblems
canonicalKnowledge
resolutionNote
```

When a terminal legacy row has no `resolutionNote`, write one short factual note from its existing workstream test, manifest, or batch record. The note must explain why the row is terminal and name its canonical disposition without copying source prose. Pending rows keep `resolutionNote: null`.

Copy `topicOverrideReason` into the master record only if the master schema is extended with an optional `topicOverrideReason` field and Task 1 validation is updated to require it when master topics fall outside the mapped source branch.

Set `workstream` to the completed workstream id only when ownership is explicit from the row's existing tests and manifest scope. Leave it `null` for pre-workstream seeds or aggregate pending rows; never invent a workstream from topic overlap alone.

- [ ] **Step 5: Add repository-level reconciliation to the CLI**

Extend `validateMasterDirectoryRepository(inputs)` after pure validation:

```js
const byLegacyKey = new Map(inputs.directory.items.map((item) => [
  `${item.source}::${item.sourceSection}::${item.sourceItem ?? ''}`,
  item,
]));
for (const [source, ledger] of Object.entries(inputs.coverageLedgers)) {
  for (const entry of ledger.entries) {
    const key = `${source}::${entry.sourceSection}::${entry.sourceItem ?? ''}`;
    const item = byLegacyKey.get(key);
    if (!item) throw new Error(`Coverage row missing from master directory: ${key}`);
    if (JSON.stringify([item.state, item.canonicalProblems, item.canonicalKnowledge])
      !== JSON.stringify([entry.state, entry.canonicalProblems, entry.canonicalKnowledge])) {
      throw new Error(`Coverage/master migration mismatch: ${key}`);
    }
  }
}
if (inputs.problemSlugs.size !== 76 || inputs.knowledgeSlugs.size !== 50) {
  throw new Error(`Master migration must preserve 76 Problems / 50 Knowledge; received ${inputs.problemSlugs.size}/${inputs.knowledgeSlugs.size}`);
}
```

- [ ] **Step 6: Run all master tests and commit migration state**

Replace the Task 2 incomplete-shell assertion with the completed repository assertion:

```js
test('repository master directory validates against exact private state', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  assert.equal(validateMasterDirectoryRepository(inputs), true);
  assert.equal(inputs.problemSlugs.size, 76);
  assert.equal(inputs.knowledgeSlugs.size, 50);
});
```

```powershell
node --test tests/quant-interview-master-directory.test.mjs tests/quant-interview-master-directory-repository.test.mjs
npm run master:directory:check
git diff --check
```

Expected: all master tests and repository check pass for the first time; public files remain unchanged.

Commit:

```powershell
git add -- scripts/validate-quant-interview-master-directory.mjs src/data/quant-interview/master-directory.json tests/quant-interview-master-directory-repository.test.mjs
git commit -m "data(quant-interview): migrate existing coverage into master directory"
```

### Task 7: Internal directory projection and public boundary

**Files:**
- Modify: `scripts/generate-quant-interview-knowledge-directory.mjs:1-235`
- Modify: `tests/quant-interview-knowledge-directory.test.mjs`
- Modify: `tests/quant-interview-topic-foundation.test.mjs`
- Modify: `docs/quant-interview/CONTINUE_EXTRACTION_TASK.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: validated `master-directory.json`, existing internal-directory inputs, and `getNextPendingItem`.
- Produces: internal `masterSummary`, per-topic ordered master records, exact `firstPendingKey`, and unchanged public directory projection.

- [ ] **Step 1: Add failing internal-projection tests**

Extend the fixture passed to `buildInternalDirectoryModel` with `masterDirectory: baseDirectory` and assert:

```js
assert.deepEqual(model.masterSummary, {
  total: 2,
  pending: 1,
  terminal: 1,
  firstPendingKey: 'green-book::1.1::guidance',
});
const preparation = model.topics[0].children[0];
assert.deepEqual(preparation.masterItems.map(({ key, state }) => ({ key, state })), [
  { key: 'green-book::1.1::guidance', state: 'pending' },
]);
```

Extend Markdown assertions:

```js
assert.match(first, /Master records: 2/);
assert.match(first, /First pending: `green-book::1\.1::guidance`/);
assert.match(first, /`green-book::1\.1::guidance`.*`pending`/);
```

- [ ] **Step 2: Run the Knowledge directory suite to prove RED**

```powershell
node --test tests/quant-interview-knowledge-directory.test.mjs
```

Expected: FAIL because `masterSummary` and `masterItems` are absent.

- [ ] **Step 3: Load and validate master state in the generator**

Import `getNextPendingItem`, load `master-directory.json` in `loadRepositoryDirectoryInputs`, and pass it as `masterDirectory`. Do not import master state into `src/lib/quantInterviewKnowledgeDirectory.mjs`; that library remains public-safe.

Add this private projection in `buildInternalDirectoryModel`:

```js
const masterItems = inputs.masterDirectory?.items ?? [];
const next = getNextPendingItem(inputs.masterDirectory);
const terminal = masterItems.filter((item) => item.state !== 'pending').length;
const masterSummary = {
  total: masterItems.length,
  pending: masterItems.length - terminal,
  terminal,
  firstPendingKey: next?.key ?? null,
};
```

Project an item's minimal private fields only into its exact `primaryTopic` node:

```js
masterItems: masterItems
  .filter((item) => item.primaryTopic === node.id)
  .map(({ key, source, sourceSection, sourceItem, questionPages, solutionPages, state, canonicalProblems, canonicalKnowledge, workstream }) => ({
    key, source, sourceSection, sourceItem, questionPages, solutionPages,
    state, canonicalProblems, canonicalKnowledge, workstream,
  })),
```

- [ ] **Step 4: Render exact queue summary and item rows**

Add Summary lines:

```js
`- Master records: ${model.masterSummary.total}`,
`- Terminal master records: ${model.masterSummary.terminal}`,
`- Pending master records: ${model.masterSummary.pending}`,
`- First pending: \`${model.masterSummary.firstPendingKey}\``,
```

Under each leaf topic add a `Master queue records` table with columns `Key`, `State`, `Question pages`, `Solution pages`, and `Targets`. Render PDF ranges as `17` or `17–18`; never render source text.

- [ ] **Step 5: Strengthen the public import boundary**

In `tests/quant-interview-topic-foundation.test.mjs`, add `master-directory.json` and `quantInterviewMasterDirectory.mjs` to the private-module rejection cases used by the public shell import graph test.

In `tests/quant-interview-knowledge-directory.test.mjs`, retain the assertion that the public result contains no `source`, `coverage`, `workstream`, or `pageRange`; add `masterDirectory`, `masterItems`, `questionPages`, `solutionPages`, and `firstPendingKey` to the rejected token set.

- [ ] **Step 6: Update the durable continuation instructions**

Modify `docs/quant-interview/CONTINUE_EXTRACTION_TASK.md` so agents must:

1. run `npm run master:directory:check`;
2. read the generated `First pending` key;
3. reject a proposed workstream whose first item differs;
4. process only consecutive master records;
5. update the master item and legacy coverage row together;
6. keep public content source-neutral.

Remove any instruction that allows selecting an arbitrary bounded topic when a pending master record exists.

- [ ] **Step 7: Regenerate, verify, and commit the projection**

```powershell
npm run knowledge:directory
npm run knowledge:directory:check
node --test tests/quant-interview-knowledge-directory.test.mjs tests/quant-interview-topic-foundation.test.mjs
git diff --check
```

Expected: deterministic internal output, public-boundary tests pass, and no whole-book percentage appears.

Commit:

```powershell
git add -- docs/quant-interview/CONTINUE_EXTRACTION_TASK.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md scripts/generate-quant-interview-knowledge-directory.mjs tests/quant-interview-knowledge-directory.test.mjs tests/quant-interview-topic-foundation.test.mjs
git commit -m "feat(quant-interview): project master ingestion queue"
```

### Task 8: Sequential-scope guard and migration closure memory

**Files:**
- Modify: `tests/quant-interview-master-directory-repository.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`

**Interfaces:**
- Consumes: fully validated directory and computed `getNextPendingItem` result.
- Produces: exact durable first-pending record, no active 014 manifest, and a testable future workstream admission rule.

- [ ] **Step 1: Add a failing first-pending and no-014 test**

Append:

```js
import { getNextPendingItem, validateSequentialScope } from '../src/lib/quantInterviewMasterDirectory.mjs';

test('migration closes with one exact first pending key and no active 014', async () => {
  const { directory, workstreams } = await loadMasterDirectoryRepository(process.cwd());
  const first = getNextPendingItem(directory);
  assert.ok(first);
  assert.equal(first.key, 'green-book::1.1::guidance');
  assert.equal(validateSequentialScope(directory, [first.key]), true);
  assert.equal(workstreams.some(({ id, status }) => /-014$/.test(id) && status === 'active'), false);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  assert.equal(handoff.includes(`First pending master record: \`${first.key}\``), true);
  assert.match(handoff, /No bounded ingestion workstream is active/i);
});
```

Ensure `readFile` is imported from `node:fs/promises` once at the top of the test file.

- [ ] **Step 2: Run to prove HANDOFF is RED**

```powershell
node --test --test-name-pattern="migration closes" tests/quant-interview-master-directory-repository.test.mjs
```

Expected: FAIL because HANDOFF does not yet record the computed master key.

- [ ] **Step 3: Write migration closure state in HANDOFF**

Preserve completed workstreams 001–013 and their evidence. Replace the current next-action block with:

```text
Current ingestion state:

**No bounded ingestion workstream is active. The three-book master directory migration is complete.**

First pending master record: `green-book::1.1::guidance`

The next workstream must start at that key and may include only consecutive master records within the approved batch boundary. Workstream 014 is not active until its separate design and plan are approved.
```

Before applying this patch, confirm the selector returns `green-book::1.1::guidance`. If complete enumeration produces a different earlier key, stop, amend the approved design and this plan with the evidence, and only then update HANDOFF.

- [ ] **Step 4: Verify lifecycle memory and commit**

```powershell
node --test tests/quant-interview-master-directory-repository.test.mjs
npm run master:directory:check
npm run knowledge:directory:check
git diff --check
```

Expected: all migration lifecycle assertions pass; no `-014.json` manifest exists.

Commit:

```powershell
git add -- docs/quant-interview/HANDOFF.md tests/quant-interview-master-directory-repository.test.mjs
git commit -m "docs(quant-interview): close master directory migration"
```

### Task 9: Full verification and execution handoff

**Files:**
- Review only: all files changed by Tasks 1–8
- No new public content files

**Interfaces:**
- Consumes: migration-complete commit with exact first pending key.
- Produces: local and GitHub CI evidence for the migration tree plus the inputs required to write the separate first-ingestion plan.

- [ ] **Step 1: Run the Windows diagnostic gates**

Run separately so one failure cannot be hidden by a later success:

```powershell
npm run master:directory:check
npm run knowledge:directory:check
npm run test
npm run check
npm run build
```

Expected:

```text
master directory check: success
generated Knowledge directory check: success
all Node tests: pass
Astro check: 0 errors
Astro build: success
```

- [ ] **Step 2: Perform the focused code and data review**

Review:

```powershell
git diff 321d63f..HEAD --check
git diff 321d63f..HEAD --stat
git status --short
```

Confirm:

- only approved repository files changed;
- source PDFs and the LeetCode document remain untracked and unmodified;
- no `tmp/pdfs` files remain;
- no public Problem or Knowledge page changed;
- `master-directory.json` is canonical-order stable;
- every legacy coverage row reconciles;
- counts are 76/50;
- no 014 manifest exists.

- [ ] **Step 3: Run authoritative WSL-native Node 24 gates**

Use a Linux-native worktree path and Node 24. Do not run the authoritative gate from `/mnt/d`:

```bash
cd /mnt/d/lorien-lab.github.io
git worktree add --detach /home/lorien/quant-interview-master-directory "$(git rev-parse HEAD)"
cd /home/lorien/quant-interview-master-directory
export PATH=/home/lorien/.local/share/codex-node-v24.15.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
node --version
npm ci
npm run master:directory:check
npm run knowledge:directory:check
npm run test
npm run check
npm run build
```

Expected: Node major 24 and every ordered gate succeeds. Remove the exact temporary worktree with `git worktree remove --force /home/lorien/quant-interview-master-directory` only after verifying its registered absolute path.

- [ ] **Step 4: Push the feature ref and dispatch existing Node 24 CI**

Create or use the exact branch `codex/quant-interview-three-book-master-directory`, then:

```powershell
git push origin HEAD:refs/heads/codex/quant-interview-three-book-master-directory
gh workflow run validate.yml --ref codex/quant-interview-three-book-master-directory
gh run list --workflow validate.yml --branch codex/quant-interview-three-book-master-directory --limit 3 --json databaseId,headSha,status,conclusion,url
```

Accept only a completed `success` run whose `headSha` equals the pushed migration commit. Record the run id and URL in the final handoff report; do not rewrite completed 001–013 evidence.

- [ ] **Step 5: Freeze inputs for the first sequential-ingestion plan**

Read and record:

```powershell
npm run master:directory:check
Select-String -LiteralPath 'docs/quant-interview/KNOWLEDGE_DIRECTORY.md' -Pattern 'First pending:'
git rev-parse HEAD
```

The next plan must consume:

```text
migration commit: exact 40-hex HEAD
CI run: matching successful run id
first pending key: `green-book::1.1::guidance`, confirmed by the selector
maximum scope: first ten consecutive pending questions, stopping earlier at leaf-topic or source boundary
```

Do not author the next plan with a guessed key.

- [ ] **Step 6: Commit no further changes and hand off execution result**

If verification changed generated output, treat that as a defect: regenerate, review, commit the corrected files, and rerun all gates. Otherwise report the verified migration commit, CI run, 76/50 counts, exact first pending key, and the fact that workstream 014 remains inactive.

The next artifact is a separate plan named from the computed leaf topic, saved under `docs/superpowers/plans/`, and executed only after review.
