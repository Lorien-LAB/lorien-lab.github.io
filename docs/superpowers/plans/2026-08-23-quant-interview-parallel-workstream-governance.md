# Quant Interview Parallel Workstream Governance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the repository-wide one-topic-at-a-time rule with an explicit contract that permits up to three isolated topic candidates while keeping source ownership, integration, completion, exact counts, CI evidence, and HANDOFF closure serialized under one coordinator.

**Architecture:** This is a documentation-and-contract change only. A dedicated Node test locks the parallel branch rules and first-wave reservations; `AGENT_PROTOCOL.md` defines durable operating authority, and `HANDOFF.md` records the current coordinator-owned queue without creating product manifests or modifying source coverage.

**Tech Stack:** Markdown repository memory, Node.js built-in test runner, `node:fs/promises`, Astro project verification through npm scripts.

**Approved consistency correction:** This amendment preserves the approved coordinator-only shared-state intent and removes earlier candidate shared-file permissions that contradicted `AGENT_PROTOCOL.md`.

## Global Constraints

- Pre-governance content base is exactly `18879f087cd344e10e8fbe6aeb585774438a579d`.
- `main` must not be modified.
- Each candidate branch owns exactly one approved module. Up to three isolated module candidate branches/worktrees may be active at once under one coordinator.
- Module implementation may not begin until its written module design spec is approved. Design and source audit may precede approval.
- During implementation, a candidate branch may implement only module-scoped public Knowledge/Problem content plus module-specific tests explicitly allowed by that approved module spec.
- Candidate agents must not edit shared coverage, source-topic map, exact global-registry/count regressions, HANDOFF, workstream/completion metadata, or CI workflow paths. Candidates hand the coordinator precise proposed shared-file deltas in their reports.
- Parallelism applies to design and implementation; integration, exact corpus regression, completion metadata, real CI evidence, and HANDOFF closure remain serialized.
- The coordinator exclusively owns ordinal reservation and semantic reconciliation of shared coverage, source-topic mapping, exact global counts, HANDOFF, and completion evidence.
- The coordinator serializes reconciliation, integration, and closure in the order 011 → 012 → 013 on the latest durable base and updates shared files.
- Candidate module branches remain `active`; only the coordinator may mark an integrated workstream `complete`.
- Reserve 011 for `random-walks-markov-chains`, 012 for `limits-derivatives`, and 013 for `reasoning-communication`.
- Integration order is exactly 011, then 012, then 013.
- Do not create 011–013 workstream manifests, Knowledge, Problems, coverage rows, source-topic mappings, or product graph links in this governance change.
- The authoritative current bounded topic remains `random-walks-markov-chains`.
- Do not weaken exact source-neutral slug enumeration or any existing source verification, semantic deduplication, copyright, or verification rule.
- Before integration, `npm run test`, `npm run check`, and `npm run build` must all pass.

## File Map

- `tests/quant-interview-parallel-workstream-governance.test.mjs` — executable contract for bounded parallelism, coordinator ownership, reservations, queue order, current topic, and absence of premature manifests.
- `docs/quant-interview/AGENT_PROTOCOL.md` — durable rules for isolated candidates and serialized closure.
- `docs/quant-interview/README.md` — durable startup summary of candidate scope and coordinator-only closure.
- `docs/quant-interview/HANDOFF.md` — factual first-wave reservations and integration queue while preserving Random Walks as the current bounded topic.
- `docs/superpowers/specs/2026-08-23-quant-interview-parallel-workstream-governance-design.md` — approved governance authority and candidate/coordinator ownership boundary.
- `docs/superpowers/plans/2026-08-23-quant-interview-parallel-workstream-governance.md` — execution contract aligned with the approved design and protocol.

---

### Task 1: Define the bounded parallel protocol

**Files:**
- Create: `tests/quant-interview-parallel-workstream-governance.test.mjs`
- Modify: `docs/quant-interview/AGENT_PROTOCOL.md`

**Interfaces:**
- Consumes: the approved governance design and the existing repository-memory convention used by `tests/quant-interview-handoff.test.mjs`.
- Produces: a tested protocol that later module branches and the coordinator can cite as repository authority.

- [ ] **Step 1: Write the failing protocol contract**

Create `tests/quant-interview-parallel-workstream-governance.test.mjs` with this initial content:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const protocolPath = 'docs/quant-interview/AGENT_PROTOCOL.md';

test('protocol permits bounded isolated candidates and serializes shared closure', async () => {
  const protocol = await readFile(protocolPath, 'utf8');

  assert.match(protocol, /up to three isolated canonical topic workstreams/i);
  assert.match(protocol, /one branch[^\n]*one bounded canonical topic/i);
  assert.match(protocol, /single coordinator/i);
  assert.match(protocol, /ordinal reservation/i);
  assert.match(protocol, /coverage[^\n]*source-topic[^\n]*exact global counts[^\n]*HANDOFF/i);
  assert.match(protocol, /candidate[^\n]*remain[^\n]*active/i);
  assert.match(protocol, /only the coordinator[^\n]*complete/i);
  assert.match(protocol, /integration[^\n]*completion[^\n]*HANDOFF closure[^\n]*serial/i);
  assert.match(protocol, /force[^\n]*push|force-update/i);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
node --test tests/quant-interview-parallel-workstream-governance.test.mjs
```

Expected: FAIL because the current protocol does not permit three isolated workstreams and does not define coordinator-owned serialized closure.

- [ ] **Step 3: Amend branch discipline**

In `docs/quant-interview/AGENT_PROTOCOL.md`, retain the task-specific-branch and no-force-update rules, then replace the single global branch assumption with this exact operating contract:

```markdown
One branch must still implement one bounded infrastructure stage or one bounded canonical topic workstream.

A single coordinator may authorize up to three isolated canonical topic workstreams to be active at once. Each candidate uses its own branch and worktree from the same frozen durable base. Candidate branches never share a checkout, never edit another candidate branch, and never force-update shared history.
```

- [ ] **Step 4: Add a parallel workstream governance subsection**

Immediately after branch discipline, add a subsection that states all of the following in direct prose:

```markdown
### Parallel workstream governance

Parallelism applies to isolated design and implementation only. A single coordinator owns ordinal reservation, cross-module source-row ownership, semantic reconciliation of coverage and source-topic mappings, exact global counts, the authoritative HANDOFF, integration order, and completion evidence.

Candidate agents must not edit shared coverage, source-topic map, global-count regression, HANDOFF, completion metadata, or CI workflow paths. Candidates may only submit local module content and test changes allowed by their approved spec. They hand the coordinator precise proposed shared-file deltas in their reports; the coordinator applies or semantically reconciles those proposals against the latest durable base.

Candidate workstreams remain `active` after module-local verification. Only the coordinator may mark an integrated workstream `complete`. Integration, completion metadata, real CI evidence, exact corpus regression, and HANDOFF closure are serialized one workstream at a time.
```

- [ ] **Step 5: Strengthen the end-of-workstream protocol**

Add these two numbered requirements to the end-of-workstream sequence before the HANDOFF update:

```markdown
8. when parallel candidates exist, reconcile shared-file deltas against the latest durable base instead of accepting whole-file conflict resolution;
9. keep the candidate `active` until the coordinator verifies the integrated commit and records its completion evidence;
```

Renumber the existing diff-review and HANDOFF steps so the sequence remains contiguous.

- [ ] **Step 6: Run focused tests and verify GREEN**

Run:

```powershell
node --test tests/quant-interview-parallel-workstream-governance.test.mjs tests/quant-interview-handoff.test.mjs
```

Expected: both test files pass with zero failures.

- [ ] **Step 7: Commit the protocol contract**

```powershell
git add -- tests/quant-interview-parallel-workstream-governance.test.mjs docs/quant-interview/AGENT_PROTOCOL.md
git commit -m "docs: permit isolated parallel workstreams"
```

---

### Task 2: Reserve the first wave and serialize HANDOFF closure

**Files:**
- Modify: `tests/quant-interview-parallel-workstream-governance.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`

**Interfaces:**
- Consumes: the coordinator contract from Task 1 and the current HANDOFF next action at workstream 010 closure.
- Produces: exact, testable reservations for 011–013 and a non-authoritative candidate queue that leaves Random Walks as the current bounded topic.

- [ ] **Step 1: Extend the test with the failing HANDOFF contract**

Append these imports and tests to `tests/quant-interview-parallel-workstream-governance.test.mjs`. Extend the existing import to read:

```js
import { access, readFile } from 'node:fs/promises';
```

Then append:

```js
const handoffPath = 'docs/quant-interview/HANDOFF.md';

const reservations = [
  {
    ordinal: '011',
    topic: 'random-walks-markov-chains',
    branch: 'chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23',
  },
  {
    ordinal: '012',
    topic: 'limits-derivatives',
    branch: 'chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23',
  },
  {
    ordinal: '013',
    topic: 'reasoning-communication',
    branch: 'chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23',
  },
];

test('handoff reserves the first parallel wave without claiming candidate completion', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const coordination = handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';

  assert.ok(coordination, 'HANDOFF missing parallel workstream coordination');
  assert.match(coordination, /maximum active candidates[^\n]*3/i);
  assert.match(coordination, /integration queue[^\n]*011[^\n]*012[^\n]*013/i);
  assert.match(coordination, /candidate[^\n]*not[^\n]*complete/i);
  for (const reservation of reservations) {
    assert.match(coordination, new RegExp(reservation.ordinal));
    assert.match(coordination, new RegExp(reservation.topic));
    assert.match(coordination, new RegExp(reservation.branch.replaceAll('-', '\\-')));
  }
});

test('parallel reservations preserve Random Walks as the authoritative current topic', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';

  assert.match(current, /Random Walks & Markov Chains/i);
  assert.doesNotMatch(current, /Limits & Derivatives|Reasoning & Communication/i);
});

test('governance does not create product workstream manifests early', async () => {
  for (const reservation of reservations) {
    const domain = reservation.ordinal === '011'
      ? 'stochastic-processes-random-walks-markov-chains'
      : reservation.ordinal === '012'
        ? 'calculus-differential-equations-limits-derivatives'
        : 'interview-strategy-communication-reasoning-communication';
    await assert.rejects(
      access(`src/data/quant-interview/workstreams/${domain}-${reservation.ordinal}.json`),
    );
  }
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
node --test tests/quant-interview-parallel-workstream-governance.test.mjs
```

Expected: the protocol test passes, while both HANDOFF tests fail because the coordination section and reservations do not yet exist.

- [ ] **Step 3: Add the coordinator-owned reservation table to HANDOFF**

In `docs/quant-interview/HANDOFF.md`, immediately after the paragraph that defines Random Walks & Markov Chains as the current bounded topic and before the non-negotiable invariants, add:

```markdown
## Parallel workstream coordination

Maximum active candidates: **3**. Parallel candidates are isolated design and implementation branches; they are not authoritative completion state. The coordinator alone owns ordinal reservation, integration order, shared-file reconciliation, exact corpus counts, completion metadata, real CI evidence, and HANDOFF closure.

| Queue | Reservation | Canonical topic | Candidate branch | State |
|---:|---:|---|---|---|
| 1 | 011 | `random-walks-markov-chains` | `chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23` | design-audit |
| 2 | 012 | `limits-derivatives` | `chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23` | design-audit |
| 3 | 013 | `reasoning-communication` | `chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23` | design-audit |

Integration queue: **011 → 012 → 013**. A candidate stays `active` during implementation and is not `complete` until the coordinator integrates it on the latest durable base, reconciles shared state, obtains fresh local and real CI verification for the exact commit, and records factual closure here.
```

- [ ] **Step 4: Replace the obsolete one-topic global invariant**

Replace:

```markdown
- Process one bounded canonical topic workstream at a time.
```

with:

```markdown
- Each branch processes one bounded canonical topic; the coordinator may run up to three isolated candidates while integration and closure remain serialized.
```

- [ ] **Step 5: Run focused tests and verify GREEN**

Run:

```powershell
node --test tests/quant-interview-parallel-workstream-governance.test.mjs tests/quant-interview-handoff.test.mjs tests/quant-interview-order-statistics-extremes-completion.test.mjs
```

Expected: all three test files pass. The order-statistics completion contract must continue to recognize Random Walks as the next authoritative topic.

- [ ] **Step 6: Run the full verification gates**

Run each command separately:

```powershell
npm run test
npm run check
npm run build
```

Expected:

- test command exits 0 with zero failed tests;
- Astro check reports zero errors;
- production build exits 0;
- no Knowledge, Problem, coverage, source-topic map, or workstream manifest file appears in the branch diff.

- [ ] **Step 7: Review the complete governance diff**

Run:

```powershell
git diff --check
git diff --stat 18879f087cd344e10e8fbe6aeb585774438a579d
git status --short
```

Expected: no whitespace errors; only the approved design, plan, protocol, HANDOFF, and governance test are present; the worktree has only the Task 2 files awaiting commit.

- [ ] **Step 8: Commit the HANDOFF coordination contract**

```powershell
git add -- tests/quant-interview-parallel-workstream-governance.test.mjs docs/quant-interview/HANDOFF.md
git commit -m "docs: reserve first parallel workstream wave"
```

## Final Review and Integration

After Tasks 1 and 2 pass their task reviews:

1. Generate a full review package from `18879f087cd344e10e8fbe6aeb585774438a579d` to the governance branch HEAD.
2. Run one independent whole-branch specification-and-quality review.
3. Resolve every load-bearing finding and re-run the affected tests.
4. Run fresh `npm run test`, `npm run check`, and `npm run build` on the final governance HEAD.
5. Fast-forward only `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17` to the reviewed governance HEAD.
6. Do not modify `main`.
7. Re-run all three verification commands on the exact post-fast-forward durable-base SHA.
8. Create the 011–013 isolated worktrees only from that verified post-governance durable base.

## Execution Choice

The user selected Subagent-Driven execution. Use `superpowers:subagent-driven-development`: one fresh implementer per task, independent task review after each task, a fix loop for important findings, and one independent whole-branch review before integration.
