# Red Book Market-Awareness Skip Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Terminalize the exact fourteen Red Book 9/9.3 market-awareness records as hidden `interview-guidance`, publish nothing, and advance the master queue to Red 1.1.

**Architecture:** Apply one item-level audit decision consistently to the hidden Red coverage ledger and master directory, then regenerate repository memory. No public content, catalog, taxonomy, workstream manifest, or CI lifecycle is created; exact tests make the zero-public-delta and unused-016 boundary fail closed.

**Tech Stack:** JSON data ledgers, Node.js 24, `node:test`, Astro, generated Markdown directory, WSL native-LF verification.

## Global Constraints

- Process exactly `red-book::9::guidance`, `red-book::9.3::guidance`, and `red-book::9.3::9.23` through `red-book::9.3::9.34`.
- Set all fourteen records to terminal state `interview-guidance` with no canonical Problem, no canonical Knowledge, and no workstream owner.
- Use fourteen distinct nonempty resolution notes; master and coverage notes must match exactly.
- Repair only the Red 9.3 guidance evidence range from PDF pages 315–317 to 315–316; numbered prompts remain page 316 with no solution pages.
- Public corpus remains exactly 76 Problems / 52 topic-classified Knowledge nodes.
- Master counts become exactly 196 terminal / 554 pending, and first pending becomes `red-book::1.1::guidance`.
- Do not create, activate, complete, or reference any workstream id ending in 016; ordinal 016 remains unused.
- Do not add or modify public content, catalog entries, graph edges, taxonomy, source-topic map, dependencies, or current-market answers.
- Do not process Red 9.2 or Red 1.1–1.9 in this audit.
- Preserve all completed workstream 015 SHA, CI, command, and closure evidence.
- Never stage `docs/书籍`, the LeetCode guide, rendered PDF pages, visualization files, or unrelated changes.
- Run gates exactly in this order: `npm run master:directory:check`, `npm run knowledge:directory:check`, `npm run test`, `npm run check`, `npm run build`.

## File Responsibility Map

- Create `tests/quant-interview-market-awareness-skip.test.mjs`: exact fourteen-row data, zero-public-delta, counts, page repair, queue, unused-016, HANDOFF, and directory contract.
- Modify `src/data/quant-interview/coverage/red-book.json`: terminal aggregate rows and twelve new item-level entries.
- Modify `src/data/quant-interview/master-directory.json`: mirror the fourteen dispositions and page repair.
- Modify `tests/quant-interview-master-directory-repository.test.mjs`: current next-pending contract becomes Red 1.1.
- Modify `tests/quant-interview-role-employer-fit-workstream.test.mjs`: retain 015 ownership evidence while recognizing the later skip audit queue transition.
- Modify `tests/quant-interview-role-employer-fit-completion.test.mjs`: remove the obsolete mutable Red 9 current-queue assertion while preserving strict 015 closure evidence.
- Modify `docs/quant-interview/HANDOFF.md`: add the durable skip-audit record and current Red 1.1 queue state.
- Regenerate `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`: 196/554 and terminal fourteen-row state.

---

### Task 1: Terminalize the exact fourteen hidden source records

**Files:**
- Create: `tests/quant-interview-market-awareness-skip.test.mjs`
- Modify: `src/data/quant-interview/coverage/red-book.json:101-145`
- Modify: `src/data/quant-interview/master-directory.json:3200-3485`

**Interfaces:**
- Consumes: the current 750-row master directory, Red coverage schema, `TERMINAL_STATES`, and `getNextPendingItem`.
- Produces: fourteen terminal audit-only rows, 196/554 counts, unchanged 76/52 public registry, and next pending Red 1.1 for Task 2.

- [ ] **Step 1: Write the failing exact-scope data test**

Create this test foundation:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { getNextPendingItem, TERMINAL_STATES } from '../src/lib/quantInterviewMasterDirectory.mjs';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

const keys = [
  'red-book::9::guidance',
  'red-book::9.3::guidance',
  ...Array.from({ length: 12 }, (_, index) => `red-book::9.3::9.${index + 23}`),
];
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('market-awareness skip owns exactly fourteen ordered records', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  const selected = inputs.directory.items.filter((item) => keys.includes(item.key));
  assert.deepEqual(selected.map((item) => item.key), keys);
  assert.equal(selected.length, 14);
  assert.equal(
    inputs.directory.items.filter((item) =>
      item.resolutionNote?.includes('excluded from the durable public technical question bank'),
    ).length,
    14,
  );
});
```

Add a master/coverage consistency test:

```js
test('all fourteen rows are target-free interview guidance with distinct notes', async () => {
  const [inputs, red] = await Promise.all([
    loadMasterDirectoryRepository(process.cwd()),
    readJson('src/data/quant-interview/coverage/red-book.json'),
  ]);
  const notes = [];
  for (const key of keys) {
    const master = inputs.directory.items.find((item) => item.key === key);
    const coverage = red.entries.find((entry) =>
      entry.sourceSection === master.sourceSection
        && entry.sourceItem === master.sourceItem,
    );
    assert.equal(master.state, 'interview-guidance', key);
    assert.equal(coverage.state, 'interview-guidance', key);
    assert.deepEqual(master.canonicalProblems, [], key);
    assert.deepEqual(master.canonicalKnowledge, [], key);
    assert.deepEqual(coverage.canonicalProblems, [], key);
    assert.deepEqual(coverage.canonicalKnowledge, [], key);
    assert.equal(master.workstream, null, key);
    assert.ok(master.resolutionNote?.trim(), key);
    assert.equal(master.resolutionNote, coverage.resolutionNote, key);
    notes.push(master.resolutionNote);
  }
  assert.equal(new Set(notes).size, 14);
  assert.equal(validateMasterDirectoryRepository(inputs), true);
});
```

Add page, count, queue, public, and ordinal assertions:

```js
test('skip audit repairs pages, preserves public counts, and advances to Red 1.1', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  const section = inputs.directory.items.find(
    (item) => item.key === 'red-book::9.3::guidance',
  );
  assert.deepEqual(section.questionPages, [{ startPage: 315, endPage: 316 }]);
  for (const key of keys.slice(2)) {
    const item = inputs.directory.items.find((entry) => entry.key === key);
    assert.deepEqual(item.questionPages, [{ startPage: 316, endPage: 316 }], key);
    assert.deepEqual(item.solutionPages, [], key);
  }
  const terminal = inputs.directory.items.filter((item) => TERMINAL_STATES.has(item.state));
  const pending = inputs.directory.items.filter((item) => item.state === 'pending');
  assert.equal(terminal.length, 196);
  assert.equal(pending.length, 554);
  assert.equal(inputs.problemSlugs.size, 76);
  assert.equal(inputs.knowledgeSlugs.size, 52);
  assert.equal(getNextPendingItem(inputs.directory)?.key, 'red-book::1.1::guidance');
  assert.equal(inputs.workstreams.some(({ id }) => /-016$/.test(id)), false);
});

test('skip audit creates no public market-awareness artifact', async () => {
  const files = await readdir('src/content', { recursive: true });
  assert.equal(
    files.some((file) => /market-awareness|current-market-data/i.test(String(file))),
    false,
  );
  await assert.rejects(
    access('src/content/knowledge/concepts/financial-market-awareness-for-quant-interviews.md'),
    (error) => error?.code === 'ENOENT',
  );
});
```

- [ ] **Step 2: Run the focused test and verify the pending-state failure**

```bash
node --test tests/quant-interview-market-awareness-skip.test.mjs
```

Expected: FAIL because the fourteen records are pending, twelve coverage entries are absent, section 9.3 ends at page 317, counts are 182/568, and next pending is Red 9.

- [ ] **Step 3: Apply the fourteen exact resolution notes**

Use these notes in key order, once in coverage and once in the matching master row:

```text
Red Book chapter 9 is a mixed soft-interview and current-finance container; it is excluded from the durable public technical question bank and has no independent public target.
Red Book 9.3 is a collection of time-sensitive market-awareness prompts; it is excluded from the durable public technical question bank by explicit user direction.
The current equity-benchmark level is time-sensitive market data and is excluded from the durable public technical question bank.
The current commodity price is time-sensitive market data and is excluded from the durable public technical question bank.
The current yield-curve snapshot is time-sensitive market data and is excluded from the durable public technical question bank.
The current US policy-rate prompt is time-sensitive market data and is excluded from the durable public technical question bank.
The current UK policy-rate prompt is time-sensitive market data and is excluded from the durable public technical question bank.
The current euro-area policy-rate prompt is time-sensitive market data and is excluded from the durable public technical question bank.
The source-era crisis current-affairs prompt is excluded from the durable public technical question bank by explicit user direction.
The current foreign-exchange rate is time-sensitive market data and is excluded from the durable public technical question bank.
The current labor-market comparison is time-sensitive market data and is excluded from the durable public technical question bank.
The current US central-bank office-holder prompt is time-sensitive and is excluded from the durable public technical question bank.
The current UK central-bank office-holder prompt is time-sensitive and is excluded from the durable public technical question bank.
The source-era UK regulatory-architecture prompt is obsolete current-affairs material and is excluded from the durable public technical question bank.
```

- [ ] **Step 4: Update the Red coverage ledger**

For section 9 and section 9.3 aggregate entries, set:

```json
"state": "interview-guidance",
"canonicalProblems": [],
"canonicalKnowledge": [],
"resolutionNote": "the matching exact note from Step 3"
```

Add item-level entries `9.23` through `9.34` immediately after the section 9.3 aggregate entry. Each uses:

```json
"canonicalTopics": [
  "interview-preparation",
  "fixed-income-rates-general-finance"
],
"state": "interview-guidance",
"canonicalProblems": [],
"canonicalKnowledge": []
```

and its matching exact resolution note.

- [ ] **Step 5: Mirror the same decisions into master-directory rows**

For the exact fourteen rows, preserve keys, kinds, sources, sections, items, topics, and sort keys; set:

```json
"state": "interview-guidance",
"canonicalProblems": [],
"canonicalKnowledge": [],
"workstream": null
```

Copy the matching note exactly. Change only section 9.3 guidance pages to:

```json
[{ "startPage": 315, "endPage": 316 }]
```

- [ ] **Step 6: Run the focused data test**

Run the Step 2 command again.

Expected: all 4 tests PASS; counts are 196/554, public registry is 76/52, next pending is Red 1.1, and no 016 workstream exists.

- [ ] **Step 7: Commit the hidden audit data**

```bash
git add tests/quant-interview-market-awareness-skip.test.mjs src/data/quant-interview/coverage/red-book.json src/data/quant-interview/master-directory.json
git commit -m "data(quant-interview): skip Red market awareness prompts"
```

### Task 2: Reconcile current queue memory and generated directory

**Files:**
- Modify: `tests/quant-interview-market-awareness-skip.test.mjs`
- Modify: `tests/quant-interview-master-directory-repository.test.mjs:267-286`
- Modify: `tests/quant-interview-role-employer-fit-workstream.test.mjs:33-75`
- Modify: `tests/quant-interview-role-employer-fit-completion.test.mjs:55-64`
- Modify: `docs/quant-interview/HANDOFF.md:571-635`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: terminal audit data and Red 1.1 queue transition from Task 1.
- Produces: durable current-state documentation and compatibility tests consumed by final verification.

- [ ] **Step 1: Extend the skip test with failing HANDOFF and directory assertions**

Append:

```js
test('HANDOFF and generated directory record the target-free skip audit', async () => {
  const [handoff, directory] = await Promise.all([
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
    readFile('docs/quant-interview/KNOWLEDGE_DIRECTORY.md', 'utf8'),
  ]);
  assert.match(handoff, /^## Skipped source audit — Red Book market awareness$/m);
  assert.match(handoff, /14 records.*\+0 Problems.*\+0 Knowledge/is);
  assert.match(handoff, /no workstream ordinal was consumed/i);
  assert.match(handoff, /workstream 016 is not active/i);
  assert.match(handoff, /First pending master record: `red-book::1\.1::guidance`/i);
  assert.match(directory, /Terminal master records: 196/);
  assert.match(directory, /Pending master records: 554/);
  assert.match(directory, /First pending: `red-book::1\.1::guidance`/);
  for (const key of keys) {
    assert.equal(
      directory.includes(`| \`${key}\` | \`interview-guidance\` |`),
      true,
      key,
    );
  }
});
```

- [ ] **Step 2: Run the documentation-focused tests and verify stale queue failures**

```bash
node --test tests/quant-interview-market-awareness-skip.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-role-employer-fit-workstream.test.mjs tests/quant-interview-role-employer-fit-completion.test.mjs
```

Expected: data assertions from Task 1 pass; documentation and current-queue assertions fail because HANDOFF and the generated directory still point to Red 9.

- [ ] **Step 3: Move mutable current-queue ownership out of the historical 015 completion test**

In `tests/quant-interview-role-employer-fit-completion.test.mjs`, retain exact 015 active SHA, run id, commands, 76/52, source keys, and temporary-workflow absence. Remove only:

```js
assert.match(handoff, /First pending master record: `red-book::9::guidance`/i);
```

Replace the HANDOFF-only 016 assertion with repository evidence:

```js
const workstreamFiles = await readdir('src/data/quant-interview/workstreams');
assert.equal(workstreamFiles.some((file) => /-016\.json$/.test(file)), false);
```

Add `readdir` to the existing `node:fs/promises` import.

- [ ] **Step 4: Update current master and 015 source-row tests**

In `tests/quant-interview-role-employer-fit-workstream.test.mjs`, change only the mutable queue expectation:

```js
assert.equal(getNextPendingItem(inputs.directory)?.key, 'red-book::1.1::guidance');
```

Rename that test so it states that 015 rows remain terminal after the later skip audit.

In `tests/quant-interview-master-directory-repository.test.mjs`, replace the current lifecycle test with:

```js
test('post-015 skip audit advances the queue without creating workstream 016', async () => {
  const { directory, workstreams } = await loadMasterDirectoryRepository(process.cwd());
  const first = getNextPendingItem(directory);
  assert.equal(first?.key, 'red-book::1.1::guidance');
  assert.equal(validateSequentialScope(directory, [first.key]), true);
  const workstream015 = workstreams.find(({ id }) => /-015$/.test(id));
  assert.equal(workstream015.status, 'complete');
  assert.equal(workstreams.some(({ id }) => /-016$/.test(id)), false);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  assert.match(handoff, /No bounded ingestion workstream is active/i);
  assert.equal(handoff.includes(`First pending master record: \`${first.key}\``), true);
});
```

- [ ] **Step 5: Add the durable HANDOFF audit section**

Place this after completed workstream 15 and before `## Next action`:

```markdown
## Skipped source audit — Red Book market awareness

The exact 14-record block `red-book::9::guidance`, `red-book::9.3::guidance`, and `red-book::9.3::9.23` through `red-book::9.3::9.34` was terminalized as internal `interview-guidance` by explicit user direction.

These records contain time-sensitive market snapshots, source-era office holders, current-affairs prompts, and obsolete regulatory details. They produce exactly **+0 Problems / +0 Knowledge**, have no public target, and do not represent public coverage. Section 9.3 evidence was corrected to PDF pages 315–316.

No workstream ordinal was consumed. Workstream 016 is not active and remains available for the next substantive scope.
```

Keep the current bounded-topic statement at no active workstream. Change only the first pending line to:

```markdown
First pending master record: `red-book::1.1::guidance`
```

- [ ] **Step 6: Regenerate the Knowledge directory**

```bash
npm run knowledge:directory
npm run knowledge:directory:check
```

Expected: 196 terminal, 554 pending, first Red 1.1, fourteen target-free terminal rows, unchanged 76/52.

- [ ] **Step 7: Run the focused reconciliation suite**

Run the Step 2 command again.

Expected: all tests PASS, historical 015 evidence remains exact, current queue is Red 1.1, and no 016 exists.

- [ ] **Step 8: Run the full suite and commit repository memory**

```bash
npm test
git diff --check
```

Expected: all tests pass with zero failures and no whitespace defects.

```bash
git add tests/quant-interview-market-awareness-skip.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-role-employer-fit-workstream.test.mjs tests/quant-interview-role-employer-fit-completion.test.mjs docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md
git commit -m "docs(quant-interview): record market awareness skip audit"
```

### Task 3: Verify the final audit tree and deliver the branch

**Files:**
- No planned tracked-file changes; only test-backed fixes if a real gate exposes a defect.

**Interfaces:**
- Consumes: the complete hidden audit and repository memory from Tasks 1–2.
- Produces: a verified feature branch ready for the user’s integration choice.

- [ ] **Step 1: Run the five ordered Windows gates separately**

```bash
npm run master:directory:check
npm run knowledge:directory:check
npm run test
npm run check
npm run build
```

Require exit code 0 for every command. Record the exact test total, Astro error count, and built-page total.

- [ ] **Step 2: Verify exact final HEAD in a fresh WSL native-LF Node 24 worktree**

Capture the full final SHA. Prove `/home/lorien/quant-interview-market-awareness-skip` absent, then create a detached worktree at that exact SHA from the normal repository.

Use `/home/lorien/.local/share/codex-node-v24.15.0/bin`, run `npm ci`, audit `git ls-files --eol`, and run the same five commands in the same order. Require:

- no CRLF or mixed tracked text;
- 76/52 public registry;
- 196/554 master counts;
- Red 1.1 next;
- no workstream 016;
- no rendered source page or source PDF in the tracked tree.

Resolve the exact WSL target before cleanup, remove only that worktree, and prove both filesystem absence and deregistration.

- [ ] **Step 3: Review the full branch diff**

Compare the branch base to final HEAD and confirm:

- exactly 14 master rows and 14 matching coverage entries changed state;
- twelve item-level coverage rows were added;
- only the 9.3 aggregate page range changed;
- no public content/catalog/taxonomy/source-map/dependency changed;
- public count remains 76/52;
- HANDOFF and generated directory agree;
- no 016 manifest or temporary workflow exists;
- no source PDF, rendered page, LeetCode guide, visualization, or unrelated path is in the diff.

Run:

```bash
git diff --check
git status --short
git log --oneline --decorate --max-count=8
```

- [ ] **Step 4: Push only the feature branch**

```bash
git push -u origin codex/quant-interview-skip-market-awareness
```

Verify the remote feature ref equals local HEAD. Do not push `main` and do not delete the remote feature branch.

- [ ] **Step 5: Use the finishing-development-branch workflow**

Offer exactly the three normal named-branch choices: merge locally to `main`, create a Pull Request, or keep the branch. Execute only the user-selected integration action.
