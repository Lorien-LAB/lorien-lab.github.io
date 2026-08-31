# Thinking Outside the Box Green Core 020 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve the next eight Green Book 2.3 records with one source-neutral Knowledge node, seven behaviorally verified Problems, exact hidden dispositions, zero page changes, and factual workstream-020 lifecycle evidence.

**Architecture:** Public Knowledge and Problems are built first behind focused real-file tests. Catalog registration precedes an evidence-free active manifest and eight exact coverage/master decisions; a full 750-row page projection is frozen, then lifecycle gates and independent review close the workstream without touching the next Red Book record.

**Tech Stack:** Astro Markdown/YAML, JSON catalog/coverage/master/workstreams, Node.js 24, `node:test`, `js-yaml`, generated Knowledge directory, WSL native-LF verification, GitHub Actions.

## Global Constraints

- Implement only `logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020` on branch `codex/quant-interview-thinking-outside-box-green-core-020` from committed plan base.
- Own exactly eight consecutive keys from `green-book::2.3::theory` through `green-book::2.3.quant-salary::question` in master queue order.
- Publish exactly seven Problems and one Knowledge node; final public corpus is exactly **93 Problems / 59 Knowledge**.
- Resolve exactly seven rows as `canonical-problem` and one theory row as `knowledge-only`; use no `variant` or `merged-duplicate`.
- Add `topicOverrideReason` only to box packing and last-ball parity. Do not modify taxonomy or source-topic map.
- Change no question/solution page range. Freeze all 750 page projections against literal SHA-256 `2275e9e3414f249dc39bcef52bbaf202ab8d43445e61845f63a94724059eeb3e`.
- Public content is independently worded and source-neutral: no book/section/item/page identity, copied narrative, provenance field, or named source-era employer/person.
- Every Problem has two progressive hints, a complete proof, Why This Problem Matters, Common Mistakes, and Extensions.
- Required behavioral verifiers: three-dimensional cell coloring, all-date cube generation, four-state guard truth table, padlock-state simulation, parity transition enumeration, four-signature switch encoding, and canceling-mask algebra with explicit privacy limits.
- Private-average scope is honest and non-colluding. Do not claim collusion resistance, dishonest-input protection, authentication, auditability, or cryptographic security.
- Final master state is exactly **256 terminal / 494 pending**, next `red-book::8::theory`, no active bounded topic, and no 021.
- Active 020 is evidence-free. Complete 020 records only factual immutable SHA/run/gate evidence and has no temporary workflow.
- Use the SDD workspace ledger and per-task report files for checkpoint/resume; each task receives an independent spec/code review before the ledger marks it complete.
- Never stage `docs/书籍/`, the untracked interview guide, `tmp/`, rendered/OCR artifacts, `.superpowers/`, dependencies, or unrelated changes.
- Preserve all 001–019 manifests/evidence and unrelated public content.
- Ordered gates: `npm test`, `npm run knowledge:directory:check`, `npm run master:directory:check`, `npm run check`, `npm run build`.

## File Responsibility Map

- Task 1 owns the new Knowledge page and its exact content test.
- Task 2 owns box-packing/calendar Problems and their independent constructive/invariant test.
- Task 3 owns guards/padlocks Problems and their truth-table/protocol test.
- Task 4 owns last-ball/switches Problems and their parity/signature test.
- Task 5 owns private-average Problem and its correctness/privacy-boundary test.
- Task 6 owns Knowledge catalog registration, reciprocal graph edits, source-neutral corpus regression, and the 93/59 contract.
- Task 7 owns active/complete 020 manifest, eight Green coverage/master rows, two override reasons, full page-projection hash, and protected-map assertions.
- Task 8 owns phase-aware current-state tests, active HANDOFF, generated directory, and 256/494/Red-8 contract.
- Task 9 owns temporary CI proof, workflow removal, factual closure evidence, final gates, whole-branch review, push, and integration handoff.

---

### Task 1: Publish Constraint Reframing & Latent State Knowledge

**Files:**
- Create: `tests/quant-interview-thinking-outside-box-knowledge.test.mjs`
- Create: `src/content/knowledge/concepts/constraint-reframing-and-latent-state.md`

**Interfaces:**
- Consumes: Knowledge Markdown schema, `js-yaml` `JSON_SCHEMA`, and four existing related slugs.
- Produces: `constraint-reframing-and-latent-state`, consumed by Tasks 2–8.

- [ ] **Step 1: Write the failing metadata, structure, and exercise test**

Create the test with real-file parsing:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const slug = 'constraint-reframing-and-latent-state';
const path = `src/content/knowledge/concepts/${slug}.md`;
const headings = ['Core Idea', 'Reframe the State', 'Change Representation and Granularity', 'Latent State and Extra Channels', 'Reversible Operations and Cancellation', 'Witnesses, Necessity, and Boundaries', 'Problem-Solving Workflow', 'Recognition Signals', 'Common Mistakes', 'Interview Checks'];
const metadata = {
  title: 'Constraint Reframing & Latent State',
  description: 'Re-express constraints, expose hidden state and information channels, compose reversible operations, and prove when an unconventional construction is valid.',
  date: '2026-08-31', type: 'concept', domain: 'Mathematics & Statistics',
  category: 'Problem Solving Techniques', status: 'growing',
  tags: ['Constraint Reframing', 'Latent State', 'Reversible Operations', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  featured: false,
  related: ['logical-deduction-constraint-propagation-and-case-elimination', 'decision-trees-information-bounds-and-adaptive-testing', 'modular-invariants', 'problem-framing-clarification-assumption-management'],
  relatedNotes: [],
};

test('Constraint Reframing Knowledge has exact source-neutral executable structure', async () => {
  const text = await readFile(path, 'utf8');
  const frontmatter = parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA });
  assert.deepEqual(frontmatter, metadata);
  assert.deepEqual([...text.matchAll(/^## (.+)$/gm)].map(([, h]) => h), headings);
  for (const pattern of [/state variables/i, /representation/i, /granularity/i, /latent state/i, /reversible/i, /cancel/i, /constructive witness/i, /necessary/i, /assumptions/i]) assert.match(text, pattern);
  const checks = text.split(/^## Interview Checks$/m)[1]?.match(/^\d+\. .+$/gm) ?? [];
  assert.equal(checks.length, 6);
  assert.doesNotMatch(checks.join('\n'), /53.*brick|calendar.*cube|two guards|padlock|last ball|four switches|salary/i);
  assert.doesNotMatch(text, /Green Book|A Practical Guide|section 2\.3|PDF page|source item/i);
});
```

- [ ] **Step 2: Run focused RED**

Run: `node --test tests/quant-interview-thinking-outside-box-knowledge.test.mjs`

Expected: `ENOENT` for the absent Knowledge file.

- [ ] **Step 3: Author the exact Knowledge page**

Use the tested frontmatter and heading order. Explain a repeatable workflow: identify the literal framing, write state variables and operations, search alternate granularity/observables, construct a witness or obstruction, state assumptions, and test every legal case. Write six fresh prompts about unrelated objects so none is a disguised copy of the seven 020 Problems.

- [ ] **Step 4: Run GREEN and mutation checks**

Temporarily remove one assumption/boundary sentence from an in-memory fixture and require failure. Restore the real file, then run:

```bash
node --test tests/quant-interview-thinking-outside-box-knowledge.test.mjs
git diff --check
```

- [ ] **Step 5: Commit Task 1**

```bash
git add -- tests/quant-interview-thinking-outside-box-knowledge.test.mjs src/content/knowledge/concepts/constraint-reframing-and-latent-state.md
git commit -m "feat(quant-interview): add constraint reframing Knowledge"
```

### Task 2: Publish box-packing and calendar-cube Problems

**Files:**
- Create: `tests/quant-interview-thinking-outside-box-constructive.test.mjs`
- Create: `src/content/problems/logic/pack-length-four-bricks-in-six-cube.md`
- Create: `src/content/problems/logic/two-cube-calendar-digit-labeling.md`

**Interfaces:**
- Consumes: Task 1 Knowledge slug and existing `modular-invariants` / Logical Deduction slugs.
- Produces: Problem ids `logic-logical-deduction-005` and `006`.

- [ ] **Step 1: Write focused RED for exact metadata and the coloring obstruction**

Parse both Markdown pages with `js-yaml`. Pin the box metadata:

```js
const boxMetadata = {
  problemId: 'logic-logical-deduction-005', title: 'Packing Length-Four Bricks in a Six-Cube',
  description: 'Decide whether 53 axis-aligned length-four bricks fit in a six-cube, and prove the answer with a three-dimensional coloring invariant.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Invariants', 'Coloring Arguments'], tags: ['Logical Deduction', 'Invariants', 'Brainteasers', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'invariants-state-transformations'],
  concepts: ['constraint-reframing-and-latent-state', 'modular-invariants'], techniques: [], prerequisites: [],
  relatedProblems: ['two-cube-calendar-digit-labeling', 'last-ball-color-by-parity-invariant'], family: 'coloring-obstruction',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15, status: 'solved', featured: false,
};
```

Independently enumerate all legal axis-aligned length-four placements:

```js
const color = (x, y, z) => (Math.floor(x / 2) + Math.floor(y / 2) + Math.floor(z / 2)) % 2;
const cellCounts = [0, 0];
for (let x = 0; x < 6; x += 2) for (let y = 0; y < 6; y += 2) for (let z = 0; z < 6; z += 2) cellCounts[color(x, y, z)] += 1;
assert.deepEqual(cellCounts.sort((a, b) => a - b), [13, 14]);
for (let axis = 0; axis < 3; axis++) for (let x = 0; x < 6; x++) for (let y = 0; y < 6; y++) for (let z = 0; z < 6; z++) {
  const start = [x, y, z];
  if (start[axis] + 4 > 6) continue;
  const colors = [0, 1, 2, 3].map((d) => { const p = [...start]; p[axis] += d; return color(...p); });
  assert.equal(colors.filter((c) => c === 0).length, 2);
  assert.equal(colors.filter((c) => c === 1).length, 2);
}
assert.equal((13 * 8) / 2, 52);
```

Require the solution to state `53 * 4 = 212 < 216`, explain why volume alone is insufficient, and derive the exact 52 bound.

- [ ] **Step 2: Add calendar metadata and all-date generator before implementation**

Pin:

```js
const calendarMetadata = {
  problemId: 'logic-logical-deduction-006', title: 'Two-Cube Calendar Digit Labeling',
  description: 'Label two six-faced cubes so their visible faces can display every date from 01 through 31, and prove the construction is sufficient.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Constraint Satisfaction', 'Constructive Proofs'], tags: ['Logical Deduction', 'Construction', 'Brainteasers', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['constraint-reframing-and-latent-state', 'logical-deduction-constraint-propagation-and-case-elimination'], techniques: [], prerequisites: [],
  relatedProblems: ['pack-length-four-bricks-in-six-cube', 'two-guards-one-question'], family: 'digit-labeling-construction',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15, status: 'solved', featured: false,
};
const cubeA = ['0','1','2','3','4','5'];
const cubeB = ['0','1','2','6','7','8'];
const supports = (cube, digit) => cube.includes(digit) || (digit === '9' && cube.includes('6'));
const canDisplay = (day) => {
  const [a, b] = String(day).padStart(2, '0');
  return (supports(cubeA, a) && supports(cubeB, b)) || (supports(cubeB, a) && supports(cubeA, b));
};
for (let day = 1; day <= 31; day++) assert.equal(canDisplay(day), true, `missing ${day}`);
```

Require proof that both cubes need `0`, `1`, and `2`, exactly six remaining face slots cover `3,4,5,6/9,7,8`, and the printed label sets equal the tested construction.

- [ ] **Step 3: Run focused RED**

Run: `node --test tests/quant-interview-thinking-outside-box-constructive.test.mjs`

Expected: missing-page `ENOENT`, while the independent calculations themselves pass.

- [ ] **Step 4: Author both complete Problems and run GREEN**

Use exact frontmatter, two progressive hints, complete proofs, and the standard solved-page section order. Do not claim 52 bricks are constructively packable; the invariant proves only that 53 are impossible.

```bash
node --test tests/quant-interview-thinking-outside-box-constructive.test.mjs
git diff --check
```

Mutation check: change one calendar face or one placement-color assertion and prove the test fails, then restore.

- [ ] **Step 5: Commit Task 2**

```bash
git add -- tests/quant-interview-thinking-outside-box-constructive.test.mjs src/content/problems/logic/pack-length-four-bricks-in-six-cube.md src/content/problems/logic/two-cube-calendar-digit-labeling.md
git commit -m "feat(quant-interview): add reframing construction Problems"
```

### Task 3: Publish guard and padlock Problems

**Files:**
- Create: `tests/quant-interview-thinking-outside-box-protocols.test.mjs`
- Create: `src/content/problems/logic/two-guards-one-question.md`
- Create: `src/content/problems/logic/message-delivery-with-independent-padlocks.md`

**Interfaces:**
- Consumes: Constraint Reframing and Logical Deduction Knowledge slugs.
- Produces: Problem ids `logic-logical-deduction-007` and `008`.

- [ ] **Step 1: Write failing exact metadata and guard truth-table test**

Pin the standard Problem frontmatter. Exact distinguishing fields:

```js
const guardMetadata = {
  problemId: 'logic-logical-deduction-007', title: 'Two Guards, Two Doors, One Question',
  description: 'Design one yes-or-no question that identifies the desirable door when one guard always lies and the other always tells the truth.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Boolean Logic', 'Case Analysis'], tags: ['Logical Deduction', 'Truth Tables', 'Brainteasers', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['constraint-reframing-and-latent-state', 'logical-deduction-constraint-propagation-and-case-elimination'], techniques: [], prerequisites: [],
  relatedProblems: ['two-cube-calendar-digit-labeling', 'message-delivery-with-independent-padlocks'], family: 'truth-liar-questions',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 10, status: 'solved', featured: false,
};
```

Model all states independently:

```js
for (const chosenGuardTruthful of [false, true]) {
  for (const chosenDoorGood of [false, true]) {
    const otherWouldSayYes = chosenGuardTruthful ? !chosenDoorGood : chosenDoorGood;
    const chosenAnswerYes = chosenGuardTruthful ? otherWouldSayYes : !otherWouldSayYes;
    assert.equal(chosenAnswerYes, !chosenDoorGood);
    const chooseChosenDoor = !chosenAnswerYes;
    assert.equal(chooseChosenDoor, chosenDoorGood);
  }
}
```

Require the page to print four distinct truth-table rows and state deterministic, common-knowledge behavior.

- [ ] **Step 2: Add padlock metadata and executable lock-state test**

```js
const padlockMetadata = {
  problemId: 'logic-logical-deduction-008', title: 'Message Delivery with Independent Padlocks',
  description: 'Deliver a document through an untrusted courier using two independent padlocks without ever sending the box unlocked.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Protocol Design', 'State Transitions'], tags: ['Logical Deduction', 'Protocols', 'Brainteasers', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['constraint-reframing-and-latent-state'], techniques: [], prerequisites: [],
  relatedProblems: ['two-guards-one-question', 'private-average-with-canceling-mask'], family: 'independent-lock-protocol',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 10, status: 'solved', featured: false,
};
const transits = [
  { from: 'sender', to: 'recipient', locks: ['sender'] },
  { from: 'recipient', to: 'sender', locks: ['sender', 'recipient'] },
  { from: 'sender', to: 'recipient', locks: ['recipient'] },
];
for (const transit of transits) assert.ok(transit.locks.length >= 1);
assert.deepEqual(transits.at(-1).locks, ['recipient']);
```

Parse the page's three transit-table rows and deep-equal them to `transits`. Require explicit statements that the box accepts both locks and that the result does not provide authentication, tamper evidence, or general cryptographic security.

- [ ] **Step 3: Run focused RED**

Run: `node --test tests/quant-interview-thinking-outside-box-protocols.test.mjs`

Expected: missing-page `ENOENT`.

- [ ] **Step 4: Author both Problems and run GREEN**

The guard page must answer the exact tested nested question and response rule. The padlock page must track lock ownership and every courier transit. Use no added hashes, signatures, auditing, or hardening.

```bash
node --test tests/quant-interview-thinking-outside-box-protocols.test.mjs
git diff --check
```

Mutation check: flip one guard table response and delete one transit lock in fixtures; both must fail.

- [ ] **Step 5: Commit Task 3**

```bash
git add -- tests/quant-interview-thinking-outside-box-protocols.test.mjs src/content/problems/logic/two-guards-one-question.md src/content/problems/logic/message-delivery-with-independent-padlocks.md
git commit -m "feat(quant-interview): add logic protocol Problems"
```

### Task 4: Publish last-ball and four-switch Problems

**Files:**
- Create: `tests/quant-interview-thinking-outside-box-state-encoding.test.mjs`
- Create: `src/content/problems/logic/last-ball-color-by-parity-invariant.md`
- Create: `src/content/problems/logic/four-switches-one-room-entry.md`

**Interfaces:**
- Consumes: Constraint Reframing, Modular Invariants, and Decision Trees Knowledge.
- Produces: Problem ids `logic-logical-deduction-009` and `010`.

- [ ] **Step 1: Write failing parity metadata and transition tests**

```js
const parityMetadata = {
  problemId: 'logic-logical-deduction-009', title: 'Last-Ball Color from a Parity Invariant',
  description: 'Determine the final ball color in a random replacement process by proving that red-count parity never changes.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Parity', 'Invariants'], tags: ['Logical Deduction', 'Parity', 'Invariants', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'invariants-state-transformations', 'modular-arithmetic'],
  concepts: ['constraint-reframing-and-latent-state', 'modular-invariants'], techniques: [], prerequisites: [],
  relatedProblems: ['pack-length-four-bricks-in-six-cube', 'predator-replacement-parity'], family: 'replacement-parity',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 12, status: 'solved', featured: false,
};
const transitions = {
  BB: ([b, r]) => [b - 1, r],
  RR: ([b, r]) => [b + 1, r - 2],
  BR: ([b, r]) => [b - 1, r],
};
for (let b = 0; b <= 8; b++) for (let r = 0; r <= 8; r++) {
  for (const [kind, move] of Object.entries(transitions)) {
    if ((kind === 'BB' && b < 2) || (kind === 'RR' && r < 2) || (kind === 'BR' && (b < 1 || r < 1))) continue;
    const [, nextR] = move([b, r]);
    assert.equal(nextR % 2, r % 2);
  }
}
assert.equal(14 % 2, 0);
assert.equal(13 % 2, 1);
```

Require all three transitions in the solution and the final conclusions `20 blue, 14 red -> blue` and `20 blue, 13 red -> red`.

- [ ] **Step 2: Add switch metadata and four-signature behavior test**

```js
const switchMetadata = {
  problemId: 'logic-logical-deduction-010', title: 'Four Switches with One Room Entry',
  description: 'Encode four possible controlling switches into the bulb\'s light and thermal state so one room entry identifies the correct switch.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Decision Trees', 'State Encoding'], tags: ['Logical Deduction', 'Information', 'Brainteasers', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['constraint-reframing-and-latent-state', 'decision-trees-information-bounds-and-adaptive-testing'], techniques: [], prerequisites: [],
  relatedProblems: ['two-guards-one-question', 'top-three-from-batched-races'], family: 'latent-state-identification',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 10, status: 'solved', featured: false,
};
const signatures = new Map([
  [1, { on: true, hot: true }],
  [2, { on: false, hot: true }],
  [3, { on: true, hot: false }],
  [4, { on: false, hot: false }],
]);
assert.equal(new Set([...signatures.values()].map((s) => `${Number(s.on)}:${Number(s.hot)}`)).size, 4);
```

Require the executable schedule: switches 1 and 2 on long enough to heat; switch 2 off and switch 3 on immediately before entry; switch 1 remains on and switch 4 remains off. Parse the page's observation table and deep-equal all four signatures. Require reliable heat/cold assumptions and a zero-entry impossibility statement.

- [ ] **Step 3: Run focused RED**

Run: `node --test tests/quant-interview-thinking-outside-box-state-encoding.test.mjs`

Expected: missing-page `ENOENT`.

- [ ] **Step 4: Author both Problems and run GREEN**

Explain why random pair selection does not affect the parity conclusion. For switches, distinguish present electrical state from thermal history and state timing assumptions without adding unrelated engineering detail.

```bash
node --test tests/quant-interview-thinking-outside-box-state-encoding.test.mjs
git diff --check
```

Mutation check: alter one replacement rule and duplicate one switch signature; both must fail.

- [ ] **Step 5: Commit Task 4**

```bash
git add -- tests/quant-interview-thinking-outside-box-state-encoding.test.mjs src/content/problems/logic/last-ball-color-by-parity-invariant.md src/content/problems/logic/four-switches-one-room-entry.md
git commit -m "feat(quant-interview): add invariant and state encoding Problems"
```

### Task 5: Publish the private-average Problem

**Files:**
- Create: `tests/quant-interview-thinking-outside-box-private-average.test.mjs`
- Create: `src/content/problems/logic/private-average-with-canceling-mask.md`

**Interfaces:**
- Consumes: Constraint Reframing and Problem Framing Knowledge.
- Produces: Problem id `logic-logical-deduction-011`.

- [ ] **Step 1: Write failing exact metadata and algebra test**

```js
const metadata = {
  problemId: 'logic-logical-deduction-011', title: 'Private Average with a Canceling Mask',
  description: 'Compute a group average through a masked running sum, prove exact cancellation, and state the protocol\'s limited privacy model.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Protocol Design', 'Algebraic Masking'], tags: ['Logical Deduction', 'Privacy', 'Protocols', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['constraint-reframing-and-latent-state', 'problem-framing-clarification-assumption-management'], techniques: [], prerequisites: [],
  relatedProblems: ['message-delivery-with-independent-padlocks'], family: 'masked-aggregation',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 12, status: 'solved', featured: false,
};
const salaries = [41, 53, 67, 72, 88, 91, 104, 116];
const mask = 137;
const messages = [];
let running = mask;
for (const salary of salaries) { running += salary; messages.push(running); }
assert.deepEqual(messages, salaries.map((_, i) => mask + salaries.slice(0, i + 1).reduce((a, b) => a + b, 0)));
const recoveredTotal = messages.at(-1) - mask;
assert.equal(recoveredTotal, salaries.reduce((a, b) => a + b, 0));
assert.equal(recoveredTotal / salaries.length, 79);
```

Parse the page's symbolic transcript and require the sequence `r + s_1`, `r + s_1 + s_2`, through `r + sum s_i`, followed by subtraction of `r` and division by `8`.

- [ ] **Step 2: Add exact privacy-boundary assertions before implementation**

Require all of:

```js
for (const pattern of [/honest/i, /non-collud/i, /private channel/i, /single participant/i, /aggregate/i, /collusion/i, /side information/i, /dishonest inputs?/i]) assert.match(solution, pattern);
assert.doesNotMatch(solution, /perfect secrecy|cryptographically secure|collusion-resistant|tamper-proof/i);
```

The page must explain that a participant's sent-minus-received difference reveals only that participant's own input, while the public aggregate and any side information may still reveal values; it must not claim a general secure-aggregation protocol.

- [ ] **Step 3: Run focused RED**

Run: `node --test tests/quant-interview-thinking-outside-box-private-average.test.mjs`

Expected: missing-page `ENOENT`.

- [ ] **Step 4: Author the complete Problem and run GREEN**

Use eight neutral participants, a private ring channel, exact arithmetic, a mask known only to the first participant, and honest non-colluding behavior. Include two hints, algebraic correctness proof, limited privacy discussion, common mistakes, and extensions that vary the threat model without claiming they are solved.

```bash
node --test tests/quant-interview-thinking-outside-box-private-average.test.mjs
git diff --check
```

Mutation check: omit mask subtraction or delete the non-collusion boundary and require failure.

- [ ] **Step 5: Commit Task 5**

```bash
git add -- tests/quant-interview-thinking-outside-box-private-average.test.mjs src/content/problems/logic/private-average-with-canceling-mask.md
git commit -m "feat(quant-interview): add masked average Problem"
```

### Task 6: Register the public catalog and graph

**Files:**
- Create: `tests/quant-interview-thinking-outside-box-catalog.test.mjs`
- Modify: `src/data/quant-interview/topics/knowledge-catalog.json`
- Modify: `src/content/knowledge/concepts/logical-deduction-constraint-propagation-and-case-elimination.md`
- Modify: `src/content/knowledge/concepts/decision-trees-information-bounds-and-adaptive-testing.md`
- Modify: `src/content/knowledge/concepts/modular-invariants.md`
- Modify: `src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md`
- Modify: `tests/quant-interview-logical-deduction-green-core-catalog.test.mjs`
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`

**Interfaces:**
- Consumes: all eight public pages from Tasks 1–5.
- Produces: exact three-module Logical Deduction sequence, reciprocal Knowledge graph, and 93/59 source-neutral registry.

- [ ] **Step 1: Write failing exact catalog test**

```js
const constraint = 'logical-deduction-constraint-propagation-and-case-elimination';
const trees = 'decision-trees-information-bounds-and-adaptive-testing';
const reframing = 'constraint-reframing-and-latent-state';
const topics = ['logic-brainteasers-discrete-reasoning', 'logical-deduction'];
const expected = [
  { slug: constraint, title: 'Logical Deduction, Constraint Propagation & Case Elimination', canonicalTopics: topics, primaryTopic: 'logical-deduction', learningOrder: 10, status: 'published', prerequisites: [] },
  { slug: trees, title: 'Decision Trees, Information Bounds & Adaptive Testing', canonicalTopics: topics, primaryTopic: 'logical-deduction', learningOrder: 20, status: 'published', prerequisites: [constraint] },
  { slug: reframing, title: 'Constraint Reframing & Latent State', canonicalTopics: topics, primaryTopic: 'logical-deduction', learningOrder: 30, status: 'published', prerequisites: [constraint] },
];
test('020 registers exact Logical Deduction catalog order', async () => {
  const catalog = JSON.parse(await readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'));
  assert.deepEqual(catalog.modules.filter(({ primaryTopic }) => primaryTopic === 'logical-deduction'), expected);
  assert.equal(catalog.modules.length, 59);
});
```

- [ ] **Step 2: Add failing reciprocal graph assertions**

Parse Knowledge frontmatter and require:

```js
assert.deepEqual(reframingMeta.related, [constraint, trees, 'modular-invariants', 'problem-framing-clarification-assumption-management']);
assert.deepEqual(constraintMeta.related, ['small-cases-recurrence-and-structural-simplification', 'problem-framing-clarification-assumption-management', trees, reframing]);
assert.deepEqual(treesMeta.related, [constraint, 'small-cases-recurrence-and-structural-simplification', reframing]);
assert.deepEqual(modularMeta.related, ['modular-arithmetic', reframing]);
assert.deepEqual(framingMeta.related, ['structured-think-aloud-reasoning', 'quant-interview-preparation-breadth-and-practice', 'quant-interview-formats-and-assessment-strategy', 'behavioral-interview-evidence-and-authenticity', 'small-cases-recurrence-and-structural-simplification', 'fermi-estimation-assumption-decomposition', constraint, reframing]);
```

Require all seven new Problem frontmatter files to name only existing Knowledge slugs and unique Problem ids `005` through `011`.

- [ ] **Step 3: Run catalog RED**

```bash
node --test tests/quant-interview-thinking-outside-box-catalog.test.mjs
```

Expected: missing catalog module and reciprocal links.

- [ ] **Step 4: Register module and make exact reciprocal edits**

Insert the new module immediately after Decision Trees. Append only the new slug to the four approved `related` arrays. Do not edit body prose or any other graph edge.

- [ ] **Step 5: Update source-neutral and 019 historical compatibility fixtures**

In `quant-interview-source-neutral-content.test.mjs`, append the seven exact new slugs to `currentProblemSlugs`, append the new Knowledge/topic pair to `expectedKnowledgeTopics`, and change current counts to 93/59. Keep every schema/provenance assertion intact.

In the 019 catalog test, preserve exact order/metadata for the original two modules and their pre-020 graph relationships except the approved appended reciprocal edge. Convert its global `86/58` current-count test into a historical assertion that the two 019 modules still exist; the new 020 test owns current 93/59.

- [ ] **Step 6: Run GREEN and commit**

```bash
node --test tests/quant-interview-thinking-outside-box-catalog.test.mjs tests/quant-interview-logical-deduction-green-core-catalog.test.mjs tests/quant-interview-source-neutral-content.test.mjs
npm test
git diff --check
```

Inspect the diff to prove only the intended catalog/graph/current-fixture lines changed.

```bash
git add -- tests/quant-interview-thinking-outside-box-catalog.test.mjs src/data/quant-interview/topics/knowledge-catalog.json src/content/knowledge/concepts/logical-deduction-constraint-propagation-and-case-elimination.md src/content/knowledge/concepts/decision-trees-information-bounds-and-adaptive-testing.md src/content/knowledge/concepts/modular-invariants.md src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md tests/quant-interview-logical-deduction-green-core-catalog.test.mjs tests/quant-interview-source-neutral-content.test.mjs
git commit -m "feat(quant-interview): register thinking outside box graph"
```

### Task 7: Activate exact 020 coverage, master, and manifest state

**Files:**
- Create: `tests/quant-interview-thinking-outside-box-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020.json`
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/master-directory.json`

**Interfaces:**
- Consumes: exact public slugs from Tasks 1–6 and the existing subsection-override validator.
- Produces: evidence-free active 020 manifest, exact eight terminal decisions, two justified overrides, and unchanged page projection.

- [ ] **Step 1: Write failing exact active-manifest test**

Use this immutable scope fixture:

```js
const id = 'logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020';
const keys = [
  'green-book::2.3::theory',
  'green-book::2.3.box-packing::question',
  'green-book::2.3.calendar-cubes::question',
  'green-book::2.3.door-to-offer::question',
  'green-book::2.3.message-delivery::question',
  'green-book::2.3.last-ball::question',
  'green-book::2.3.light-switches::question',
  'green-book::2.3.quant-salary::question',
];
const expectedActiveManifest = {
  id,
  canonicalTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  status: 'active',
  masterItemKeys: keys,
  sourceScopes: [{
    source: 'green-book', sourceSections: ['2.3'],
    evidencePageRanges: [{ startPage: 26, endPage: 31 }],
    reviewOutcome: 'green-core-thinking-outside-box-publication',
    reviewNote: 'Eight consecutive Green records yield one canonical Knowledge node and seven independently verified canonical Problems.',
  }],
  publicDelta: { problems: 7, knowledge: 1 },
  knowledgeSlugs: ['constraint-reframing-and-latent-state'],
};
```

Require active manifest deep equality and absence of `preClosureActiveGate`, `verification`, and `finalTreeGate`.

- [ ] **Step 2: Add failing exact disposition assertions**

Pin the eight decisions in order:

```js
const decisions = [
  [keys[0], 'knowledge-only', [], ['constraint-reframing-and-latent-state'], 'The section-level reframing method becomes a source-neutral Knowledge node for alternate representations, latent state, reversible operations, and explicit assumptions.'],
  [keys[1], 'canonical-problem', ['pack-length-four-bricks-in-six-cube'], ['constraint-reframing-and-latent-state', 'modular-invariants'], 'The three-dimensional packing prompt becomes a canonical coloring-invariant impossibility Problem.'],
  [keys[2], 'canonical-problem', ['two-cube-calendar-digit-labeling'], ['constraint-reframing-and-latent-state', 'logical-deduction-constraint-propagation-and-case-elimination'], 'The date-display prompt becomes a canonical constructive constraint-satisfaction Problem with all dates verified.'],
  [keys[3], 'canonical-problem', ['two-guards-one-question'], ['constraint-reframing-and-latent-state', 'logical-deduction-constraint-propagation-and-case-elimination'], 'The truth-and-lie prompt becomes a canonical Boolean case-analysis Problem with a complete four-state truth table.'],
  [keys[4], 'canonical-problem', ['message-delivery-with-independent-padlocks'], ['constraint-reframing-and-latent-state'], 'The independent-lock prompt becomes a canonical three-transit protocol Problem with lock-state and confidentiality boundaries explicit.'],
  [keys[5], 'canonical-problem', ['last-ball-color-by-parity-invariant'], ['constraint-reframing-and-latent-state', 'modular-invariants'], 'The replacement process becomes a canonical parity-invariant Problem with every legal transition verified.'],
  [keys[6], 'canonical-problem', ['four-switches-one-room-entry'], ['constraint-reframing-and-latent-state', 'decision-trees-information-bounds-and-adaptive-testing'], 'The bulb prompt becomes a canonical latent-state encoding Problem using light and thermal observations.'],
  [keys[7], 'canonical-problem', ['private-average-with-canceling-mask'], ['constraint-reframing-and-latent-state', 'problem-framing-clarification-assumption-management'], 'The private-average prompt becomes a canonical canceling-mask protocol Problem with an honest non-colluding privacy boundary.'],
];
```

Require state histogram `{ 'canonical-problem': 7, 'knowledge-only': 1 }`, distinct nonempty notes, exact target order, workstream id on master rows, and coverage/master state-target-note equality.

- [ ] **Step 3: Add exact override and protected-hash assertions**

```js
const overrides = {
  '2.3.box-packing': {
    topics: ['logical-deduction', 'invariants-state-transformations'],
    reason: 'Item-level review identifies a three-dimensional coloring invariant and capacity obstruction, so this Logical Deduction item also belongs to Invariants & State Transformations.',
    masterTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'invariants-state-transformations'],
  },
  '2.3.last-ball': {
    topics: ['logical-deduction', 'invariants-state-transformations', 'modular-arithmetic'],
    reason: 'Item-level review identifies parity preservation under every replacement transition, so this Logical Deduction item also belongs to Invariants & State Transformations and Modular Arithmetic.',
    masterTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'invariants-state-transformations', 'modular-arithmetic'],
  },
};
```

All other 020 coverage topics remain exactly `['logical-deduction']` with no override reason. Require protected source-topic-map hash `04f6bc640094ae774acfe5fe13b764a0a4bd155f18e1786a5b744f33cc9aceed` and full ordered page-projection hash `2275e9e3414f249dc39bcef52bbaf202ab8d43445e61845f63a94724059eeb3e` for exactly 750 rows. Mutating Red-8 theory or any Green page in an in-memory projection must fail.

- [ ] **Step 4: Run focused RED**

Run: `node --test tests/quant-interview-thinking-outside-box-workstream.test.mjs`

Expected: missing active manifest and pending dispositions.

- [ ] **Step 5: Create manifest and apply exactly eight decisions**

Write `expectedActiveManifest` verbatim. Update only the eight Green coverage entries and mirrored master items. Preserve every page array, sort key, kind, source, source section/item, and primary topic. Use the exact two override arrays/reasons; do not edit `src/lib/quantInterviewCoverage.mjs` because 019 already supports reason-gated `sourceItem:null` overrides.

- [ ] **Step 6: Run GREEN, validators, and scope audit**

```bash
node --test tests/quant-interview-thinking-outside-box-workstream.test.mjs
node --test --test-name-pattern="coverage may override|content subsection coverage" tests/quant-interview-cross-book-workstream.test.mjs
npm run master:directory:check
git diff --check
git diff --stat
```

Confirm only the manifest and exact eight rows changed. Do not weaken expected stale current-state tests; Task 8 updates them after active data exists.

- [ ] **Step 7: Commit Task 7**

```bash
git add -- tests/quant-interview-thinking-outside-box-workstream.test.mjs src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020.json src/data/quant-interview/coverage/green-book.json src/data/quant-interview/master-directory.json
git commit -m "feat(quant-interview): activate thinking outside box green core 020"
```

### Task 8: Reconcile active HANDOFF, directory, and current-state tests

**Files:**
- Create: `tests/quant-interview-thinking-outside-box-completion.test.mjs`
- Modify: `tests/quant-interview-master-directory-repository.test.mjs`
- Modify: `tests/quant-interview-behavioral-evidence-workstream.test.mjs`
- Modify: `tests/quant-interview-market-awareness-skip.test.mjs`
- Modify: `tests/quant-interview-problem-simplification-catalog.test.mjs`
- Modify: `tests/quant-interview-problem-simplification-completion.test.mjs`
- Modify: `tests/quant-interview-logical-deduction-green-core-completion.test.mjs`
- Modify: `tests/quant-interview-knowledge-directory.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: evidence-free active 020 manifest and exact eight-row terminal state.
- Produces: phase-aware current tests, active HANDOFF, generated directory, and full-suite 93/59/256/494/Red-8 contract.

- [ ] **Step 1: Write failing phase-aware completion test**

Use exact constants:

```js
const manifestPath = 'src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020.json';
const workflow = '.github/workflows/quant-interview-thinking-outside-box-green-core-020-temporary.yml';
const commands = ['npm test', 'npm run knowledge:directory:check', 'npm run master:directory:check', 'npm run check', 'npm run build'];
const activeCurrent = `**Logic, Brainteasers & Discrete Reasoning → Logical Deduction.**

Workstream 020 is active across the exact eight-record Green Book 2.3 scope. Its public delta is +7 Problems / +1 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.`;
const completeCurrent = `**No bounded topic is active. Workstream 020 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 021 is not active or authorized by this closure.`;
```

Follow the phase-safe 019 pattern:

- active: manifest has no evidence fields; HANDOFF contains exact active block; no completed-20 heading; next after active scope is Red-8; no 021;
- complete: evidence structures are exact; temporary workflow absent; HANDOFF contains completed-20 section and exact complete block; next is Red-8; no 021.

Add exact count assertions: seven new Problem files, one new catalog module, 93/59 public corpus, 256 terminal, 494 pending, and first pending `red-book::8::theory`.

- [ ] **Step 2: Run RED against stale 019 current state**

Run: `node --test tests/quant-interview-thinking-outside-box-completion.test.mjs`

Expected: HANDOFF/directory still report 019 closure and Green 2.3 pending.

- [ ] **Step 3: Update current-only compatibility assertions**

Change only latest-state contracts:

- 86/58 → 93/59;
- 248/502 → 256/494;
- Green `2.3::theory` next → `red-book::8::theory` next;
- no020/current019 → 020 active-or-complete/no021.

Preserve every historical 001–019 source scope, disposition, SHA, run id, page hash, and completed HANDOFF section. Convert old global count/no020 tests in Problem Simplification and 019 files into historical durability checks rather than deleting them.

- [ ] **Step 4: Write active-020 HANDOFF**

Add `## Active cross-book workstream 20` after completed 19 with exact id, eight-key scope, one Knowledge and seven Problems, 7/1 split, two override reasons, zero page changes, 93/59, 256/494, Red-8 next, source-neutrality, privacy/security boundaries, and no021.

Use exact current/master blocks:

```markdown
Current bounded topic:

**Logic, Brainteasers & Discrete Reasoning → Logical Deduction.**

Workstream 020 is active across the exact eight-record Green Book 2.3 scope. Its public delta is +7 Problems / +1 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.

## Master directory ingestion state

**Workstream 020 owns the exact eight-record Green Book 2.3 scope. The three-book master directory migration remains complete.**

First pending master record after the active 020 scope: `red-book::8::theory`

Workstream 021 is not active or authorized.
```

- [ ] **Step 5: Regenerate directory and run active GREEN**

```bash
npm run knowledge:directory
npm run knowledge:directory:check
npm run master:directory:check
node --test tests/quant-interview-thinking-outside-box-completion.test.mjs tests/quant-interview-thinking-outside-box-workstream.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-handoff.test.mjs tests/quant-interview-knowledge-directory.test.mjs
npm test
git diff --check
```

If another test fails only because it literally encodes current 86/58, 248/502, Green2.3, or no020 state, add that named file to the task report and update only the stale latest-state assertion. Do not weaken historical evidence.

- [ ] **Step 6: Scope-review and commit Task 8**

List every changed compatibility test and prove each edit is current-only. Stage exact files, including only additional stale-current fixtures discovered by the full suite:

```bash
git add -- tests/quant-interview-thinking-outside-box-completion.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-behavioral-evidence-workstream.test.mjs tests/quant-interview-market-awareness-skip.test.mjs tests/quant-interview-problem-simplification-catalog.test.mjs tests/quant-interview-problem-simplification-completion.test.mjs tests/quant-interview-logical-deduction-green-core-completion.test.mjs tests/quant-interview-knowledge-directory.test.mjs tests/quant-interview-handoff.test.mjs docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md
git commit -m "docs(quant-interview): record active thinking outside box 020"
```

### Task 9: Prove immutable active 020 in Windows, WSL, and CI

**Files:**
- Create: `.github/workflows/quant-interview-thinking-outside-box-green-core-020-temporary.yml`
- Modify only focused 020 files if a real gate exposes a defect; any fix restarts proof with a new SHA.

**Interfaces:**
- Consumes: integrated evidence-free active 020 tree.
- Produces: one immutable `ACTIVE_SHA` and one matching successful numeric `RUN_ID`.

- [ ] **Step 1: Create the exact temporary workflow**

```yaml
name: Quant Interview Thinking Outside Box Green Core 020 Temporary CI

on:
  push:
    branches:
      - codex/quant-interview-thinking-outside-box-green-core-020
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

- [ ] **Step 2: Run Windows gates and commit workflow-only active SHA**

Run the five ordered gates separately. Require all green, `git diff --check`, active evidence-free manifest, expected tracked scope, and no source media. Commit only the workflow:

```bash
git add -- .github/workflows/quant-interview-thinking-outside-box-green-core-020-temporary.yml
git commit -m "ci(quant-interview): verify active thinking outside box 020"
git rev-parse HEAD
```

Assign the resulting immutable 40-character value to `ACTIVE_SHA`; never amend that commit.

- [ ] **Step 3: Prove exact active SHA in fresh WSL native-LF Node 24**

Create a detached WSL-native worktree for `ACTIVE_SHA`. Run `npm ci`, verify Node 24 and LF-only tracked text, then run all five ordered gates. Assert 93/59, 256/494, Red-8 next, exact eight rows/7-1, two overrides, full page hash, active evidence-free manifest, no021/source media, and clean tree. Remove only the exact proof path and registration; do not prune the Windows repository.

- [ ] **Step 4: Push feature branch and capture matching CI**

```bash
git push -u origin codex/quant-interview-thinking-outside-box-green-core-020
gh run list --workflow quant-interview-thinking-outside-box-green-core-020-temporary.yml --branch codex/quant-interview-thinking-outside-box-green-core-020 --limit 5 --json databaseId,headSha,status,conclusion,url
```

Select only the run whose `headSha` equals `ACTIVE_SHA`, wait for success, inspect `npm ci` and every gate, and assign its positive numeric database id to `RUN_ID`.

- [ ] **Step 5: Prove identity and record the task report**

Require local HEAD, upstream ref, live remote ref, and CI head all equal `ACTIVE_SHA`. Record Windows/WSL/CI outputs, `RUN_ID`, URL, cleanup/no-prune evidence, warnings, and exact scope in the SDD report. Do not write evidence into the manifest yet.

- [ ] **Step 6: Restart proof after any defect**

For a real defect, write a focused failing test, fix minimally, run the covering tests, commit, and repeat Steps 2–5 with a new immutable SHA. Never reuse stale evidence.

### Task 10: Remove CI, close 020, verify, review, and deliver

**Files:**
- Delete: `.github/workflows/quant-interview-thinking-outside-box-green-core-020-temporary.yml`
- Modify: `src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020.json`
- Modify: `tests/quant-interview-thinking-outside-box-workstream.test.mjs`
- Modify: `tests/quant-interview-thinking-outside-box-completion.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: exact factual `ACTIVE_SHA`, numeric `RUN_ID`, and successful CI URL from Task 9.
- Produces: workflow-free complete 020 branch, final independent approval, pushed feature head, and integration choice.

- [ ] **Step 1: Delete the workflow in a dedicated commit**

```bash
git rm -- .github/workflows/quant-interview-thinking-outside-box-green-core-020-temporary.yml
git commit -m "chore(quant-interview): remove thinking outside box 020 temporary CI"
```

The commit deletes one file only; the manifest remains active and evidence-free.

- [ ] **Step 2: Prove the workflow-free active commit in fresh WSL**

Require workflow absence, active evidence-free manifest, Node 24/LF, `npm ci`, five ordered gates, exact final data/page-hash/no021 invariants, clean tree, safe exact cleanup, and no prune.

- [ ] **Step 3: Add final-state RED**

Extend the completion test to require manifest status `complete`, a `## Completed cross-book workstream 20` HANDOFF section, the exact complete current block, workflow absence, Red-8 next, and no021. Run it against the active tree and require failure on status/current wording.

Make the workstream test phase-aware: active deep-equals the evidence-free fixture; complete preserves the same scope/public delta but delegates evidence exactness to the completion test.

- [ ] **Step 4: Record factual evidence only**

Populate with Task 9 values:

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
    temporaryArtifacts: ['.github/workflows/quant-interview-thinking-outside-box-green-core-020-temporary.yml'],
  },
  finalTreeGate: {
    environment: 'wsl-native-lf-node24',
    commands: ['npm test', 'npm run knowledge:directory:check', 'npm run master:directory:check', 'npm run check', 'npm run build'],
    conclusion: 'success', temporaryArtifactsAbsent: true,
  },
};
```

Serialize the exact SHA and numeric run id. Bind HANDOFF evidence to the same SHA/run/URL. Do not copy any 019 evidence.

- [ ] **Step 5: Write completed HANDOFF and regenerate directory**

Rename Active workstream 20 to Completed and record exact evidence, eight dispositions, two overrides, zero page changes/hash, 93/59, 256/494, Red-8 next, source-neutral and protocol-boundary statements, and no021.

Use exact final current/master state:

```markdown
Current bounded topic:

**No bounded topic is active. Workstream 020 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 021 is not active or authorized by this closure.

## Master directory ingestion state

**No bounded ingestion workstream is active. The three-book master directory migration remains complete.**

First pending master record: `red-book::8::theory`

Workstream 021 is not active or authorized.
```

Run `npm run knowledge:directory` after the edits.

- [ ] **Step 6: Run closure GREEN and commit**

```bash
node --test tests/quant-interview-thinking-outside-box-completion.test.mjs tests/quant-interview-thinking-outside-box-workstream.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-handoff.test.mjs tests/quant-interview-knowledge-directory.test.mjs
npm test
npm run knowledge:directory:check
npm run master:directory:check
git diff --check
git add -- src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020.json tests/quant-interview-thinking-outside-box-workstream.test.mjs tests/quant-interview-thinking-outside-box-completion.test.mjs docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md
git commit -m "docs(quant-interview): close thinking outside box green core 020"
```

- [ ] **Step 7: Run final exact-head Windows and WSL gates**

Run all five Windows commands, then verify the exact closure SHA in fresh WSL Node 24/LF with `npm ci` and the same gates. Require workflow absent, complete evidence exact, 93/59, 256/494, Red-8, 7/1, two overrides, full page hash, no021/source media, and clean proof cleanup without prune.

- [ ] **Step 8: Whole-branch code review and one fix wave**

Review from the committed plan base through closure: eight public pages and every behavioral verifier; graph/catalog; eight decisions; two overrides; page freeze; lifecycle evidence; historical compatibility; protected paths; correctness, readability, and change scope. Use `requesting-code-review`. Consolidate any Critical/Important findings into one TDD fix wave and run one scoped re-review.

- [ ] **Step 9: Push final feature head and prove equality**

```bash
git push origin codex/quant-interview-thinking-outside-box-green-core-020
git rev-parse HEAD
git rev-parse '@{upstream}'
git ls-remote --heads origin codex/quant-interview-thinking-outside-box-green-core-020
git status --short
```

Require local/upstream/live equality and a clean tracked tree. Do not push `main`, merge, create a PR, remove the feature worktree, or start 021.

- [ ] **Step 10: Offer the integration choice**

Invoke `finishing-a-development-branch` and present:

```text
Implementation complete. What would you like to do?

1. Merge back to main locally
2. Push and create a Pull Request
3. Keep the branch as-is (I'll handle it later)

Which option?
```
