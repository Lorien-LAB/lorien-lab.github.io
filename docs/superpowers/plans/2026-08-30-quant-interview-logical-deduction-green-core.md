# Logical Deduction Green Core 019 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve the next nine Green Book 2.2 records with two source-neutral Knowledge nodes, five behaviorally verified S3+ Problems, exact hidden dispositions, zero page changes, and factual workstream-019 lifecycle evidence.

**Architecture:** Public Knowledge and Problems are built first behind executable real-file tests. Catalog/graph registration precedes an evidence-free active manifest and nine exact Green coverage/master decisions; a full 750-row page projection is frozen, then Windows, WSL Node 24, and GitHub Actions prove one immutable active SHA before workflow-free closure.

**Tech Stack:** Astro Markdown/YAML, JSON catalog/coverage/master/workstreams, Node.js 24, `node:test`, `js-yaml`, generated Knowledge directory, WSL native-LF verification, GitHub Actions.

## Global Constraints

- Implement only `logic-brainteasers-discrete-reasoning-logical-deduction-green-core-019` on branch `codex/quant-interview-logical-deduction-green-core-019` from the committed plan base.
- Own exactly nine consecutive Green Book 2.2 keys, from `green-book::2.2::theory` through `green-book::2.2.infinite-sequence::question`, in master queue order.
- Publish exactly five Problems and two Knowledge nodes; final public corpus is exactly **86 Problems / 58 Knowledge**.
- Resolve exactly five rows as `canonical-problem`, three as `knowledge-only`, and one as `merged-duplicate`.
- Publish no standalone Problem for the card-pair invariant or uneven-rope timer; preserve both as executable Knowledge checks.
- Merge the infinite-sequence row into `infinite-power-tower-limit` and `bounded-monotone-convergence-and-fixed-points`; do not edit or duplicate the canonical proof unless a separately reviewed reciprocal link is required.
- Add `topicOverrideReason` only to trailing zeros, horse race, and infinite sequence. Do not modify taxonomy or source-topic map.
- Change no question/solution page range. Freeze the full 750-row page projection against a literal pre-019 SHA-256.
- Public content is independently worded and source-neutral: no book/section/item/page identity, copied narrative, provenance field, or named source-era employer/person.
- Every Problem is renderer-safe and S3+, with progressive hints, complete proof, Why This Problem Matters, Common Mistakes, and Extensions.
- Required behavioral verifiers: shortest-path bridge search, announcement-set simulation, exhaustive 24-state balance tree, independent valuation calculations, and race partial-order/adversary checks.
- Final master state is exactly **248 terminal / 502 pending**, next `green-book::2.3::theory`, no active bounded topic, and no 020.
- Active 019 is evidence-free. Complete 019 requires immutable active SHA, matching successful numeric CI run, Windows/WSL Node 24 gates, and absent temporary workflow.
- Never stage `docs/书籍/`, the untracked interview guide, `tmp/`, rendered/OCR artifacts, `.superpowers/`, dependencies, or unrelated changes.
- Preserve all 001–018 manifests/evidence and unrelated public content.
- Ordered gates: `npm test`, `npm run knowledge:directory:check`, `npm run master:directory:check`, `npm run check`, `npm run build`.

## File Responsibility Map

- Task 1 owns two Knowledge pages and `tests/quant-interview-logical-deduction-green-core-knowledge.test.mjs`.
- Task 2 owns bridge/public-announcement pages and their behavioral test.
- Task 3 owns the balance-diagnosis page, its complete encoded tree, and exhaustive 24-hypothesis test.
- Task 4 owns factorial-zero/batched-race pages and their independent math/partial-order test.
- Task 5 owns catalog modules, exact reciprocal edits, current public compatibility tests, and 86/58 contract.
- Task 6 owns active/complete 019 manifest, nine Green coverage/master rows, three override reasons, full page-projection hash test, and protected-map assertions.
- Task 7 owns phase-aware completion/current compatibility tests, active HANDOFF, and generated directory.
- Task 8 creates the temporary CI workflow and produces immutable `ACTIVE_SHA` plus matching `RUN_ID`.
- Task 9 removes CI, records factual completion, performs final gates/review/push, and offers integration choices.

## File Responsibility Map

---

### Task 1: Publish the two Logical Deduction Knowledge nodes

**Files:**
- Create: `tests/quant-interview-logical-deduction-green-core-knowledge.test.mjs`
- Create: `src/content/knowledge/concepts/logical-deduction-constraint-propagation-and-case-elimination.md`
- Create: `src/content/knowledge/concepts/decision-trees-information-bounds-and-adaptive-testing.md`

**Interfaces:**
- Consumes: Knowledge Markdown schema and `js-yaml` `JSON_SCHEMA`.
- Produces: two canonical Knowledge slugs and exact reciprocal intentions consumed by Tasks 2–7.

- [ ] **Step 1: Write failing exact metadata, heading, and exercise tests**

Create:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const constraint = 'logical-deduction-constraint-propagation-and-case-elimination';
const trees = 'decision-trees-information-bounds-and-adaptive-testing';
const topics = ['logic-brainteasers-discrete-reasoning', 'logical-deduction'];
const paths = {
  constraint: `src/content/knowledge/concepts/${constraint}.md`,
  trees: `src/content/knowledge/concepts/${trees}.md`,
};

async function page(path) {
  const text = await readFile(path, 'utf8');
  assert.equal(text.startsWith('---\n'), true);
  return { text, metadata: parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA }) };
}
const section = (text, heading) => text.split(new RegExp(`^## ${heading}$`, 'm'))[1]?.split(/^## /m)[0] ?? '';
const headings = (text) => [...text.matchAll(/^## (.+)$/gm)].map(([, heading]) => heading);
```

Use exact metadata:

```js
const constraintMetadata = {
  title: 'Logical Deduction, Constraint Propagation & Case Elimination',
  description: 'Represent finite candidate states, propagate private and public information, eliminate contradictions, and prove uniqueness without skipping alternatives.',
  date: '2026-08-30', type: 'concept', domain: 'Mathematics & Statistics',
  category: 'Problem Solving Techniques', status: 'growing',
  tags: ['Logical Deduction', 'Constraints', 'Case Analysis', 'Interview'],
  quantInterviewTopics: topics, featured: false,
  related: ['small-cases-recurrence-and-structural-simplification', 'problem-framing-clarification-assumption-management', trees],
  relatedNotes: [],
};
const treeMetadata = {
  title: 'Decision Trees, Information Bounds & Adaptive Testing',
  description: 'Design adaptive tests as decision trees, derive outcome-capacity lower bounds, verify every leaf, and certify ranking or selection decisions.',
  date: '2026-08-30', type: 'concept', domain: 'Mathematics & Statistics',
  category: 'Problem Solving Techniques', status: 'growing',
  tags: ['Decision Trees', 'Information Bounds', 'Adaptive Testing', 'Interview'],
  quantInterviewTopics: topics, featured: false,
  related: [constraint, 'small-cases-recurrence-and-structural-simplification'],
  relatedNotes: [],
};
```

Assert exact ordered heading inventories:

```js
const constraintHeadings = ['Core Idea', 'Candidate Sets and Constraints', 'Information Partitions', 'Public Announcements and Common Knowledge', 'Invariants and Contradictions', 'Deduction Workflow', 'Recognition Signals', 'Common Mistakes', 'Interview Checks'];
const treeHeadings = ['Core Idea', 'Decision Tree Model', 'Information Capacity', 'Adaptive Strategy Design', 'Ranking and Selection Certificates', 'Verification Workflow', 'Recognition Signals', 'Common Mistakes', 'Interview Checks'];

test('constraint-propagation Knowledge has exact structure and executable checks', async () => {
  const { text, metadata } = await page(paths.constraint);
  assert.deepEqual(metadata, constraintMetadata);
  assert.deepEqual(headings(text), constraintHeadings);
  for (const pattern of [/candidate states?/i, /necessary conditions?/i, /private information/i, /public statements?/i, /common knowledge/i, /invariant/i, /contradiction/i, /exhaust/i]) assert.match(text, pattern);
  const checks = [...section(text, 'Interview Checks').matchAll(/^\d+\. (.+)$/gm)].map(([, value]) => value);
  assert.equal(checks.length, 8);
  assert.match(checks[0], /2m.*m black.*m red.*black-black.*red-red.*mixed.*prove.*same number/is);
  assert.match(checks[1], /two.*(?:fuses|cords).*60 minutes.*nonuniform.*45 minutes.*justify/is);
});

test('decision-tree Knowledge has exact structure and executable checks', async () => {
  const { text, metadata } = await page(paths.trees);
  assert.deepEqual(metadata, treeMetadata);
  assert.deepEqual(headings(text), treeHeadings);
  const capacity = section(text, 'Information Capacity');
  assert.match(capacity, /branching factor/i);
  assert.match(capacity, /b\^d|outcomes?.*depth|leaves?/i);
  assert.match(capacity, /balanced.*legal branches|legal.*balanced branches/i);
  const verification = section(text, 'Verification Workflow');
  assert.match(verification, /every legal state.*leaf|leaf.*exactly one/i);
  const checks = [...section(text, 'Interview Checks').matchAll(/^\d+\. (.+)$/gm)].map(([, value]) => value);
  assert.equal(checks.length, 8);
  assert.match(checks.join('\n'), /ternary.*24.*three/i);
  assert.match(checks.join('\n'), /partial order.*top three|top three.*partial order/i);
});

test('both Logical Deduction Knowledge pages are source-neutral', async () => {
  for (const path of Object.values(paths)) {
    const { text } = await page(path);
    assert.doesNotMatch(text, /Green Book|A Practical Guide|section 2\.2|River crossing|Birthday problem|Burning ropes|Defective ball|Horse race|PDF page|source item/i);
  }
});
```

- [ ] **Step 2: Run focused RED**

```bash
node --test tests/quant-interview-logical-deduction-green-core-knowledge.test.mjs
```

Expected: `ENOENT` for the first absent Knowledge page, not a syntax error.

- [ ] **Step 3: Author both Knowledge pages with exact contracts**

Use exact frontmatter and heading order from the fixtures. Constraint Propagation must provide a numbered, finite-state deduction workflow and the exact eight independent checks, with the first two prompts fully stated as tested. Decision Trees must derive capacity from branching factor/depth, state legality/balance limits, explain adaptive branches and comparison certificates, give a leaf-verification workflow, and publish eight complete prompts.

Do not add extra level-two headings. Do not provide source answers inside the Knowledge checks.

- [ ] **Step 4: Run GREEN and mutation checks**

Mutate a temporary copy or in-memory fixture to remove a card constraint, rope assumption, capacity rule, or leaf condition and prove the focused test fails. Restore the real files, then run:

```bash
node --test tests/quant-interview-logical-deduction-green-core-knowledge.test.mjs
git diff --check
git status --short
```

- [ ] **Step 5: Commit Task 1**

```bash
git add -- tests/quant-interview-logical-deduction-green-core-knowledge.test.mjs src/content/knowledge/concepts/logical-deduction-constraint-propagation-and-case-elimination.md src/content/knowledge/concepts/decision-trees-information-bounds-and-adaptive-testing.md
git commit -m "feat(quant-interview): add logical deduction Knowledge"
```

### Task 2: Publish bridge crossing and public-announcement Problems

**Files:**
- Create: `tests/quant-interview-logical-deduction-green-core-state-problems.test.mjs`
- Create: `src/content/problems/logic/bridge-crossing-minimum-time.md`
- Create: `src/content/problems/logic/public-announcement-candidate-elimination.md`

**Interfaces:**
- Consumes: Task 1 Constraint Propagation slug.
- Produces: `logic-logical-deduction-001` and `002` for catalog/source mapping.

- [ ] **Step 1: Write failing exact metadata and executable state tests**

Use YAML `page()` and `solution()` helpers that parse the real Markdown files. Exact metadata:

```js
const topics = ['logic-brainteasers-discrete-reasoning', 'logical-deduction'];
const constraint = 'logical-deduction-constraint-propagation-and-case-elimination';
const bridgeMetadata = {
  problemId: 'logic-logical-deduction-001', title: 'Minimum-Time Bridge Crossing',
  description: 'Find and prove the minimum time for four travelers to cross a capacity-two bridge with one shared torch and unequal crossing times.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Optimization', 'State Search'], tags: ['Logical Deduction', 'Optimization', 'Interview'],
  quantInterviewTopics: topics, concepts: [constraint], techniques: [], prerequisites: [],
  relatedProblems: ['public-announcement-candidate-elimination'], family: 'bridge-crossing',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15,
  status: 'solved', featured: false,
};
const announcementMetadata = {
  problemId: 'logic-logical-deduction-002', title: 'Public-Announcement Candidate Elimination',
  description: 'Update a finite candidate set after successive truthful public statements about private information until one state remains.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Epistemic Logic', 'Case Elimination'], tags: ['Logical Deduction', 'Public Information', 'Interview'],
  quantInterviewTopics: topics, concepts: [constraint], techniques: [], prerequisites: [],
  relatedProblems: ['bridge-crossing-minimum-time'], family: 'public-announcement-elimination',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15,
  status: 'solved', featured: false,
};
```

Add an independent shortest-path solver over states `{farMask, torchFar}`. Generate all one- or two-traveler moves from the torch side, use cost `max(time)`, and Dijkstra-search from `{0,false}` to `{15,true}`:

```js
const times = [1, 3, 6, 11];
function shortestBridgeTime() {
  const start = '0:0';
  const goal = '15:1';
  const dist = new Map([[start, 0]]);
  const queue = [[0, 0, false]];
  while (queue.length) {
    queue.sort((a, b) => a[0] - b[0]);
    const [cost, mask, torchFar] = queue.shift();
    const key = `${mask}:${Number(torchFar)}`;
    if (cost !== dist.get(key)) continue;
    if (key === goal) return cost;
    const available = times.map((_, i) => i).filter((i) => Boolean(mask & (1 << i)) === torchFar);
    const groups = available.flatMap((i, p) => [[i], ...available.slice(p + 1).map((j) => [i, j])]);
    for (const group of groups) {
      const moved = group.reduce((value, i) => value | (1 << i), 0);
      const nextMask = torchFar ? mask & ~moved : mask | moved;
      const nextCost = cost + Math.max(...group.map((i) => times[i]));
      const nextKey = `${nextMask}:${Number(!torchFar)}`;
      if (nextCost < (dist.get(nextKey) ?? Infinity)) {
        dist.set(nextKey, nextCost);
        queue.push([nextCost, nextMask, !torchFar]);
      }
    }
  }
  throw new Error('goal unreachable');
}
assert.equal(shortestBridgeTime(), 21);
```

Require the page's five schedule rows to simulate legally and total 21. Require both four-person lower-bound expressions `a + 3b + d` and `2a + b + c + d`, specialized to 21 and 22.

Add an independent announcement filter:

```js
const initial = [['A',3],['A',6],['A',9],['B',3],['B',8],['C',2],['C',6],['D',2],['D',5],['D',9]];
const by = (states, index, value) => states.filter((state) => state[index] === value);
const lettersWhoseHolderKnowsNumberHolderDoesNotKnow = (states) => new Set(
  [...new Set(states.map(([letter]) => letter))].filter((letter) =>
    by(states, 0, letter).every(([, number]) => by(states, 1, number).length > 1)),
);
const after1 = initial.filter(([letter]) => by(initial, 0, letter).length > 1 && lettersWhoseHolderKnowsNumberHolderDoesNotKnow(initial).has(letter));
const after2 = after1.filter(([, number]) => by(after1, 1, number).length === 1);
const after3 = after2.filter(([letter]) => by(after2, 0, letter).length === 1);
assert.deepEqual(after1, [['A',3],['A',6],['A',9],['C',2],['C',6]]);
assert.deepEqual(after2, [['A',3],['A',9],['C',2]]);
assert.deepEqual(after3, [['C',2]]);
```

Assert the page prints the same intermediate sets and states rationality/truthfulness/common knowledge.

- [ ] **Step 2: Run focused RED**

```bash
node --test tests/quant-interview-logical-deduction-green-core-state-problems.test.mjs
```

Expected: missing-page `ENOENT`.

- [ ] **Step 3: Author both complete Problems**

Bridge prompt uses times 1/3/6/11 and the exact model. Publish a five-row move table, both structural lower-bound cases, and the independent result 21. Public-announcement prompt uses only abstract letter/number candidates, prints initial/three intermediate sets, and proves `C2`.

Both use two non-revealing hints and the exact solution-section order.

- [ ] **Step 4: Run GREEN and mutation checks**

Mutate one bridge move and one candidate in in-memory fixtures to prove failure; restore. Run focused tests and `git diff --check`.

- [ ] **Step 5: Commit Task 2**

```bash
git add -- tests/quant-interview-logical-deduction-green-core-state-problems.test.mjs src/content/problems/logic/bridge-crossing-minimum-time.md src/content/problems/logic/public-announcement-candidate-elimination.md
git commit -m "feat(quant-interview): add core logical deduction Problems"
```

### Task 3: Publish and exhaustively verify the twelve-object balance diagnosis

**Files:**
- Create: `tests/quant-interview-logical-deduction-green-core-balance.test.mjs`
- Create: `src/content/problems/logic/twelve-object-balance-scale-diagnosis.md`

**Interfaces:**
- Consumes: Task 1 Decision Trees slug.
- Produces: `logic-logical-deduction-003` and a machine-verifiable 24-leaf decision tree.

- [ ] **Step 1: Write failing metadata, information-bound, and exhaustive-tree tests**

Exact metadata:

```js
const metadata = {
  problemId: 'logic-logical-deduction-003', title: 'Twelve-Object Balance-Scale Diagnosis',
  description: 'Identify one anomalously heavy-or-light object among twelve using a complete three-weighing adaptive balance-scale decision tree.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Decision Trees', 'Information Bounds'], tags: ['Logical Deduction', 'Balance Scale', 'Adaptive Testing', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['decision-trees-information-bounds-and-adaptive-testing'], techniques: [], prerequisites: [],
  relatedProblems: ['bridge-crossing-minimum-time', 'top-three-from-batched-races'], family: 'ternary-diagnosis',
  mathDifficulty: 2, insightDifficulty: 4, interviewDifficulty: 4, estimatedMinutes: 30,
  status: 'solved', featured: false,
};
```

Require `3^2 < 24 <= 3^3` and an explicit warning that capacity alone does not construct legal balanced branches.

The page must include a `Decision nodes` table mapping prefix to pans:

```js
const nodes = {
  '': [[1,2,3,4], [5,6,7,8]],
  B: [[9,10,11], [1,2,3]], BB: [[12], [1]], BL: [[9], [10]], BR: [[9], [10]],
  L: [[1,2,5], [3,6,9]], LL: [[1], [2]], LR: [[3], [9]], LB: [[7], [8]],
  R: [[1,2,5], [3,6,9]], RL: [[3], [9]], RR: [[1], [2]], RB: [[7], [8]],
};
```

Require a `Diagnosis leaves` table with this exact path map:

```js
const leaves = {
  BLL:'9H', BLR:'10H', BLB:'11H', BRR:'9L', BRL:'10L', BRB:'11L', BBL:'12H', BBR:'12L',
  LLL:'1H', LLR:'2H', LLB:'6L', LRL:'3H', LRB:'5L', LBB:'4H', LBR:'7L', LBL:'8L',
  RLR:'3L', RLB:'5H', RRR:'1L', RRL:'2L', RRB:'6H', RBB:'4L', RBL:'7H', RBR:'8H',
};
```

Parse both tables from the Markdown rather than importing test fixtures into production. Simulate each hypothesis:

```js
function outcome(left, right, hypothesis) {
  const object = Number(hypothesis.slice(0, -1));
  const delta = hypothesis.endsWith('H') ? 1 : -1;
  const weight = (i) => 1 + (i === object ? delta : 0);
  const difference = left.reduce((s, i) => s + weight(i), 0) - right.reduce((s, i) => s + weight(i), 0);
  return difference > 0 ? 'L' : difference < 0 ? 'R' : 'B';
}

for (const hypothesis of Array.from({ length: 12 }, (_, i) => [`${i+1}H`, `${i+1}L`]).flat()) {
  let prefix = '';
  for (let depth = 0; depth < 3; depth += 1) {
    const [left, right] = parsedNodes[prefix];
    assert.ok(left && right, `missing node ${prefix}`);
    prefix += outcome(left, right, hypothesis);
  }
  assert.equal(parsedLeaves[prefix], hypothesis, `${hypothesis} resolved incorrectly via ${prefix}`);
}
assert.equal(new Set(Object.values(parsedLeaves)).size, 24);
```

Mutation checks must change one node pan and one leaf label and observe failures.

- [ ] **Step 2: Run focused RED**

```bash
node --test tests/quant-interview-logical-deduction-green-core-balance.test.mjs
```

Expected: missing-page `ENOENT`.

- [ ] **Step 3: Author the Problem and exact executable tables**

State all 24 heavy/light hypotheses, lower bound, adaptive rules, and both exact tables. Explain balanced and first-left-heavy branches in prose; define first-right-heavy as the tested symmetric transformation and still publish every right-heavy leaf explicitly. Keep tables machine-parseable with comma-separated integer pans and one path/hypothesis per row.

- [ ] **Step 4: Run exhaustive GREEN and renderer checks**

```bash
node --test tests/quant-interview-logical-deduction-green-core-balance.test.mjs
npm run check
git diff --check
```

- [ ] **Step 5: Commit Task 3**

```bash
git add -- tests/quant-interview-logical-deduction-green-core-balance.test.mjs src/content/problems/logic/twelve-object-balance-scale-diagnosis.md
git commit -m "feat(quant-interview): add balance-scale diagnosis Problem"
```

### Task 4: Publish factorial-zero and batched-race Problems

**Files:**
- Create: `tests/quant-interview-logical-deduction-green-core-math-selection.test.mjs`
- Create: `src/content/problems/logic/factorial-trailing-zeros-in-arbitrary-base.md`
- Create: `src/content/problems/logic/top-three-from-batched-races.md`

**Interfaces:**
- Consumes: Task 1 Decision Trees slug plus existing `modular-arithmetic` and `counting-permutations-combinations`.
- Produces: `logic-modular-arithmetic-002`, `logic-logical-deduction-004`, and exact cross-topic arrays for Task 6.

- [ ] **Step 1: Write failing metadata and independent valuation tests**

Exact factorial metadata:

```js
const factorialMetadata = {
  problemId: 'logic-modular-arithmetic-002', title: 'Factorial Trailing Zeros in an Arbitrary Base',
  description: 'Count trailing zeros of a factorial in any base by prime-factor valuations, then specialize to decimal and base twelve.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Number Theory', 'Factorials'], tags: ['Modular Arithmetic', 'Valuations', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'modular-arithmetic'],
  concepts: ['modular-arithmetic', 'counting-permutations-combinations'], techniques: [], prerequisites: [],
  relatedProblems: ['missing-digit-power-of-two'], family: 'factorial-valuations',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15,
  status: 'solved', featured: false,
};
```

Independent verifier:

```js
function valuationFactorial(n, p) {
  let total = 0;
  for (let power = p; power <= n; power *= p) total += Math.floor(n / power);
  return total;
}
function factorize(base) {
  const factors = [];
  let value = base;
  for (let p = 2; p * p <= value; p += 1) {
    if (value % p !== 0) continue;
    let exponent = 0;
    while (value % p === 0) { value /= p; exponent += 1; }
    factors.push([p, exponent]);
  }
  if (value > 1) factors.push([value, 1]);
  return factors;
}
const trailingZeros = (n, base) => Math.min(...factorize(base).map(([p,e]) => Math.floor(valuationFactorial(n,p)/e)));
assert.equal(trailingZeros(100, 10), 24);
assert.equal(trailingZeros(100, 12), 48);
```

For `2 <= n <= 25` and bases 2–16, compute `n!` with BigInt, repeatedly divide by the BigInt base to count trailing factors, and require equality with `trailingZeros`. Assert the page derives `v_p(n!) = sum_{k>=1} floor(n/p^k)` and `min_{p^e || b} floor(v_p(n!)/e)`.

- [ ] **Step 2: Write failing batched-race partial-order tests**

Exact race metadata:

```js
const raceMetadata = {
  problemId: 'logic-logical-deduction-004', title: 'Top Three from Batched Races',
  description: 'Find the three fastest of twenty-five distinct constant-speed racers with five lanes, no timing, and the minimum number of races.',
  date: '2026-08-30', domain: 'Computer Science', category: 'Algorithms',
  subcategories: ['Selection', 'Partial Orders'], tags: ['Logical Deduction', 'Selection', 'Lower Bounds', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'algorithms-data-structures-cpp', 'algorithmic-complexity'],
  concepts: ['decision-trees-information-bounds-and-adaptive-testing'], techniques: [], prerequisites: [],
  relatedProblems: ['minimum-comparisons-for-both-extremes', 'twelve-object-balance-scale-diagnosis'], family: 'batched-selection',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15,
  status: 'solved', featured: false,
};
```

Require the page to publish normalized first-six-race orders and the exact candidate set:

```js
const expectedCandidates = ['A1','A2','A3','B1','B2','C1'];
```

Build a transitive closure from group edges `X1>X2>...>X5` and winner edges `A1>B1>C1>D1>E1`. Assert every non-candidate has at least three known predecessors except `A1`, which is already certified first. Require the final race to contain exactly `A2,A3,B1,B2,C1`.

Require a strategy-independent unbeaten-first adversary lower bound. Certifying one fastest racer among 25 requires 24 first losses. Under an adversary that places every previously unbeaten entrant ahead of every already-beaten entrant, a race creates at most four first losses; equality after six races therefore forces every race to contain five previously unbeaten entrants. After five races exactly five racers remain unbeaten, so race 6 must compare all five. Choose its champion to have won an earlier race: the runner-up from that earlier race and the runner-up in race 6 each have only the champion known above them and remain incomparable, so six races cannot determine the full podium.

Preserve these normalized candidate orders as a concrete illustration, not the sole lower-bound proof. Check that each admits a total extension satisfying every first-six-race edge and that their podiums differ:

```js
const orderA = ['A1','A2','A3','B1','B2','C1'];
const orderB = ['A1','B1','B2','C1','A2','A3'];
assert.deepEqual(orderA.slice(0,3), ['A1','A2','A3']);
assert.deepEqual(orderB.slice(0,3), ['A1','B1','B2']);
```

- [ ] **Step 3: Run focused RED**

```bash
node --test tests/quant-interview-logical-deduction-green-core-math-selection.test.mjs
```

- [ ] **Step 4: Author both complete Problems**

Factorial page derives the formulas and both exact answers. Race page publishes five group orders, winners' order, exact candidate-elimination table, final race, seven-race count, and elimination certificates. It must prove the global seven-race minimum with the strategy-independent unbeaten-first argument: 24 necessary first losses, equality forcing five previously unbeaten entrants in every one of six races, and the incomparable earlier-race and race-6 runners-up beneath the same champion. Retain the normalized two-order witness as a concrete illustration of the published construction's remaining ambiguity, not as the sole proof that six races are insufficient.

- [ ] **Step 5: Run GREEN and mutation checks**

Mutate a prime exponent and remove one partial-order edge in test-local copies; require failures. Restore and run focused tests, `npm run check`, and `git diff --check`.

- [ ] **Step 6: Commit Task 4**

```bash
git add -- tests/quant-interview-logical-deduction-green-core-math-selection.test.mjs src/content/problems/logic/factorial-trailing-zeros-in-arbitrary-base.md src/content/problems/logic/top-three-from-batched-races.md
git commit -m "feat(quant-interview): add deduction math and selection Problems"
```

### Task 5: Register catalog, reciprocal graph, and exact 86/58 public contract

**Files:**
- Create: `tests/quant-interview-logical-deduction-green-core-catalog.test.mjs`
- Modify: `src/data/quant-interview/topics/knowledge-catalog.json`
- Modify: `src/content/knowledge/concepts/small-cases-recurrence-and-structural-simplification.md`
- Modify: `src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md`
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`
- Modify: `tests/quant-interview-knowledge-directory.test.mjs`
- Modify: `tests/quant-interview-reasoning-communication-content.test.mjs`
- Modify: `tests/quant-interview-problem-simplification-catalog.test.mjs`

**Interfaces:**
- Consumes: all seven new pages and exact frontmatter relations.
- Produces: published catalog projection, reciprocal graph, and exact 86/58 public contract for Task 6.

- [ ] **Step 1: Write failing exact catalog/graph/count tests**

Create a real-file YAML/JSON test. Require exact logical-deduction catalog modules:

```js
const constraint = 'logical-deduction-constraint-propagation-and-case-elimination';
const trees = 'decision-trees-information-bounds-and-adaptive-testing';
const topics = ['logic-brainteasers-discrete-reasoning', 'logical-deduction'];
const expectedModules = [
  { slug: constraint, title: 'Logical Deduction, Constraint Propagation & Case Elimination', canonicalTopics: topics, primaryTopic: 'logical-deduction', learningOrder: 10, status: 'published', prerequisites: [] },
  { slug: trees, title: 'Decision Trees, Information Bounds & Adaptive Testing', canonicalTopics: topics, primaryTopic: 'logical-deduction', learningOrder: 20, status: 'published', prerequisites: [constraint] },
];
```

Require exact related arrays:

```js
assert.deepEqual(newConstraint.related, ['small-cases-recurrence-and-structural-simplification', 'problem-framing-clarification-assumption-management', trees]);
assert.deepEqual(newTrees.related, [constraint, 'small-cases-recurrence-and-structural-simplification']);
assert.deepEqual(smallCases.related, ['recursion-problem-solving', 'problem-framing-clarification-assumption-management', 'fermi-estimation-assumption-decomposition', constraint, trees]);
assert.deepEqual(problemFraming.related, ['structured-think-aloud-reasoning', 'quant-interview-preparation-breadth-and-practice', 'quant-interview-formats-and-assessment-strategy', 'behavioral-interview-evidence-and-authenticity', 'small-cases-recurrence-and-structural-simplification', 'fermi-estimation-assumption-decomposition', constraint]);
```

Require catalog length 58 and recursive Problem Markdown count 86.

- [ ] **Step 2: Update public compatibility fixtures first and verify RED**

Append five Problem slugs and two Knowledge slugs to the literal current-corpus arrays in `quant-interview-source-neutral-content.test.mjs`; change exact counts only from 81/56 to 86/58.

In `quant-interview-knowledge-directory.test.mjs`, add `logical-deduction: [constraint, trees]`, exact prerequisite entries, and totals 58. In reasoning-communication content tests, append only Constraint Propagation to the expected Problem Framing related array. Update `quant-interview-problem-simplification-catalog.test.mjs` only where it intentionally asserts the latest total corpus, from 81/56 to 86/58; preserve exact 018 module/graph assertions.

Run public suites. Expected RED only for absent catalog modules and reciprocal production links.

- [ ] **Step 3: Register modules and exact reciprocal links**

Insert `expectedModules` in catalog after the root-level recursion module and before unrelated child topics. Modify only `related` lines in Small Cases and Problem Framing to the exact arrays above.

- [ ] **Step 4: Run public GREEN and broad observation**

```bash
node --test tests/quant-interview-logical-deduction-green-core-knowledge.test.mjs tests/quant-interview-logical-deduction-green-core-state-problems.test.mjs tests/quant-interview-logical-deduction-green-core-balance.test.mjs tests/quant-interview-logical-deduction-green-core-math-selection.test.mjs tests/quant-interview-logical-deduction-green-core-catalog.test.mjs tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-knowledge-directory.test.mjs tests/quant-interview-reasoning-communication-content.test.mjs
npm test
git diff --check
```

Public focused suites must pass. Record only stale hidden/current-state failures for Tasks 6–7; do not change hidden source state here.

- [ ] **Step 5: Review seven-file scope and commit**

Existing production diffs must touch only two `related` arrays. Then:

```bash
git add -- tests/quant-interview-logical-deduction-green-core-catalog.test.mjs tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-knowledge-directory.test.mjs tests/quant-interview-reasoning-communication-content.test.mjs tests/quant-interview-problem-simplification-catalog.test.mjs src/data/quant-interview/topics/knowledge-catalog.json src/content/knowledge/concepts/small-cases-recurrence-and-structural-simplification.md src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md
git commit -m "feat(quant-interview): register logical deduction green core graph"
```

### Task 6: Register active 019, exact nine-row dispositions, overrides, and global page freeze

**Files:**
- Create: `tests/quant-interview-logical-deduction-green-core-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-logical-deduction-green-core-019.json`
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/master-directory.json`
- Modify: `tests/quant-interview-cross-book-workstream.test.mjs`
- Modify: `src/lib/quantInterviewCoverage.mjs`
- Modify: `docs/superpowers/plans/2026-08-30-quant-interview-logical-deduction-green-core.md` (this approved correction)

**Interfaces:**
- Consumes: exact seven public slugs and 86/58 catalog contract.
- Produces: evidence-free active manifest, nine terminal mirrored decisions, three override reasons, a reason-gated subsection override contract, unchanged page projection, and Green 2.3 next state.

- [ ] **Step 1: Write failing exact active-manifest test**

```js
const id = 'logic-brainteasers-discrete-reasoning-logical-deduction-green-core-019';
const keys = [
  'green-book::2.2::theory',
  'green-book::2.2.river-crossing::question',
  'green-book::2.2.birthday-problem::question',
  'green-book::2.2.card-game::question',
  'green-book::2.2.burning-ropes::question',
  'green-book::2.2.defective-ball::question',
  'green-book::2.2.trailing-zeros::question',
  'green-book::2.2.horse-race::question',
  'green-book::2.2.infinite-sequence::question',
];
const expectedActiveManifest = {
  id,
  canonicalTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  status: 'active', masterItemKeys: keys,
  sourceScopes: [{
    source: 'green-book', sourceSections: ['2.2'],
    evidencePageRanges: [{ startPage: 21, endPage: 26 }],
    reviewOutcome: 'green-core-logical-deduction-publication-and-rerouting',
    reviewNote: 'Nine consecutive Green records yield two canonical Knowledge nodes, five canonical Problems, two lower-depth Knowledge checks, and one merged power-tower identity.',
  }],
  publicDelta: { problems: 5, knowledge: 2 },
  knowledgeSlugs: ['logical-deduction-constraint-propagation-and-case-elimination', 'decision-trees-information-bounds-and-adaptive-testing'],
};
```

Require exact deep equality and absence of all completion evidence fields. Initial run must fail with `ENOENT`.

- [ ] **Step 2: Add failing exact decision fixtures**

Use these literal tuples:

```js
const constraint = 'logical-deduction-constraint-propagation-and-case-elimination';
const trees = 'decision-trees-information-bounds-and-adaptive-testing';
const decisions = [
  [keys[0], 'knowledge-only', [], [constraint], 'Green Book 2.2 groups finite candidate elimination, invariant checks, and adaptive testing into the bounded Logical Deduction learning path.'],
  [keys[1], 'canonical-problem', ['bridge-crossing-minimum-time'], [constraint], 'The bridge family becomes the canonical state-search Problem with an independently verified optimal schedule and lower bound.'],
  [keys[2], 'canonical-problem', ['public-announcement-candidate-elimination'], [constraint], 'The private-information dialogue becomes a source-neutral public-announcement Problem with every candidate-set update explicit.'],
  [keys[3], 'knowledge-only', [], [constraint], 'The two-color pairing invariant remains an executable Knowledge check rather than a low-depth standalone Problem.'],
  [keys[4], 'knowledge-only', [], [constraint], 'The nonuniform timer remains an executable constraint-composition Knowledge check rather than a one-trick standalone Problem.'],
  [keys[5], 'canonical-problem', ['twelve-object-balance-scale-diagnosis'], [trees], 'The heavy-or-light anomaly family becomes the canonical 24-hypothesis ternary decision-tree Problem.'],
  [keys[6], 'canonical-problem', ['factorial-trailing-zeros-in-arbitrary-base'], ['modular-arithmetic', 'counting-permutations-combinations'], 'The factorial-zero prompt is generalized to prime valuations in arbitrary bases and receives a justified Modular Arithmetic refinement.'],
  [keys[7], 'canonical-problem', ['top-three-from-batched-races'], [trees], 'The batched-race family becomes the canonical partial-order selection Problem and receives a justified Algorithmic Complexity refinement.'],
  [keys[8], 'merged-duplicate', ['infinite-power-tower-limit'], ['bounded-monotone-convergence-and-fixed-points'], 'The recursive tower prompt is the existing canonical power-tower identity and merges into its complete convergence and branch-selection proof.'],
];
```

Require source/state histograms `{ 'canonical-problem':5, 'knowledge-only':3, 'merged-duplicate':1 }`, distinct notes, exact target order, master workstream id, and coverage/master state-target-note equality.

- [ ] **Step 3: Add exact override and protected-hash tests**

Coverage topics and reasons:

```js
const overrides = {
  '2.2.trailing-zeros': {
    topics: ['logical-deduction', 'modular-arithmetic'],
    reason: 'Item-level review identifies factorial prime valuations and base divisibility as Modular Arithmetic while retaining the source section’s logical-deduction context.',
    masterTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'modular-arithmetic'],
  },
  '2.2.horse-race': {
    topics: ['logical-deduction', 'algorithmic-complexity'],
    reason: 'Item-level review identifies a comparison-selection strategy with an optimal race lower bound, so this Logical Deduction item also belongs to Algorithmic Complexity.',
    masterTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'algorithms-data-structures-cpp', 'algorithmic-complexity'],
  },
  '2.2.infinite-sequence': {
    topics: ['logical-deduction', 'limits-derivatives'],
    reason: 'Item-level review identifies the recursive tower as the existing Limits & Derivatives fixed-point and convergence identity while retaining its editorial Logical Deduction context.',
    masterTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'calculus-differential-equations', 'limits-derivatives'],
  },
};
```

All other 019 coverage topics remain exactly `['logical-deduction']` and have no override reason.

Extend the focused coverage-validator fixture first. A content/subsection row with `sourceItem: null` and topics that differ from the mapped section must pass only with a non-empty `topicOverrideReason`; the same divergence without a reason must fail. Exact mapped section rows and existing non-null item overrides remain unchanged. Observe RED before editing the validator.

Freeze protected files:

```js
assert.equal(sha256(sourceTopicMapText), '04f6bc640094ae774acfe5fe13b764a0a4bd155f18e1786a5b744f33cc9aceed');
const projection = directory.items.map(({ key, questionPages, solutionPages }) => ({ key, questionPages, solutionPages }));
assert.equal(projection.length, 750);
assert.equal(sha256(JSON.stringify(projection)), '2275e9e3414f249dc39bcef52bbaf202ab8d43445e61845f63a94724059eeb3e');
```

Mutation checks must change `green-book::2.3::theory` page 26 to 27 and verify the full-projection assertion fails.

- [ ] **Step 4: Create active manifest, apply nine decisions, and allow reason-gated subsection overrides**

Write `expectedActiveManifest` exactly. Update only nine Green entries and nine master rows. Preserve every page field and primary logical-deduction queue placement; expanded master topics use the exact arrays above. Make the smallest readable coverage-validator change so a `sourceItem: null` section/subsection topic divergence is accepted only when `topicOverrideReason` is a non-empty string. Do not change the source-topic map or the existing non-null item-override behavior.

- [ ] **Step 5: Run focused GREEN, validator, and scope audit**

```bash
node --test --test-name-pattern="coverage may override|content subsection coverage" tests/quant-interview-cross-book-workstream.test.mjs
node --test tests/quant-interview-logical-deduction-green-core-workstream.test.mjs
npm run master:directory:check
npm test
git diff --check
git diff --stat
```

Focused test and repository validator must pass. Record stale current-state failures for Task 7 only.

- [ ] **Step 6: Commit Task 6**

```bash
git add -- tests/quant-interview-logical-deduction-green-core-workstream.test.mjs src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-logical-deduction-green-core-019.json src/data/quant-interview/coverage/green-book.json src/data/quant-interview/master-directory.json tests/quant-interview-cross-book-workstream.test.mjs src/lib/quantInterviewCoverage.mjs docs/superpowers/plans/2026-08-30-quant-interview-logical-deduction-green-core.md
git commit -m "feat(quant-interview): activate logical deduction green core 019"
```

### Task 7: Reconcile active lifecycle, HANDOFF, directory, and current-state tests

**Files:**
- Create: `tests/quant-interview-logical-deduction-green-core-completion.test.mjs`
- Modify: `tests/quant-interview-master-directory-repository.test.mjs`
- Modify: `tests/quant-interview-behavioral-evidence-workstream.test.mjs`
- Modify: `tests/quant-interview-market-awareness-skip.test.mjs`
- Modify: `tests/quant-interview-preparation-breadth-practice-workstream.test.mjs`
- Modify: `tests/quant-interview-problem-simplification-completion.test.mjs`
- Modify: `tests/quant-interview-problem-simplification-workstream.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: active evidence-free 019 manifest and exact nine-row terminal state.
- Produces: phase-aware lifecycle/current tests, active HANDOFF, generated directory, and full-suite 86/58/248/502/Green-2.3 contract.

- [ ] **Step 1: Write failing phase-aware completion test**

```js
const manifestPath = 'src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-logical-deduction-green-core-019.json';
const workflow = '.github/workflows/quant-interview-logical-deduction-green-core-019-temporary.yml';
const commands = ['npm test', 'npm run knowledge:directory:check', 'npm run master:directory:check', 'npm run check', 'npm run build'];
const activeCurrent = `**Logic, Brainteasers & Discrete Reasoning → Logical Deduction.**

Workstream 019 is active across the exact nine-record Green Book 2.2 core scope. Its public delta is +5 Problems / +2 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.`;
const completeCurrent = `**No bounded topic is active. Workstream 019 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 020 is not active or authorized by this closure.`;
```

Follow the phase-safe 018 test pattern:

- active: no evidence fields; exact active current block; no completed-19 section; next after active scope Green 2.3;
- complete: exact SHA/run/commands/artifact/final-tree structures; workflow absent; exact complete block; completed-19 section; Green 2.3; no 020.

Add a counts test requiring 248/502 and absence of `-020.json`. Initial run must fail on stale completed-018 HANDOFF/directory.

- [ ] **Step 2: Update exact current-corpus compatibility assertions**

Change only current/latest assertions:

- public counts 81/56 → 86/58;
- master counts 239/511 → 248/502;
- next pending Green 2.2 → Green 2.3;
- latest workstream 018/no019 → 019 active-or-complete/no020.

Preserve all historical per-workstream public deltas, source rows, SHA/run evidence, and completed HANDOFF sections. `quant-interview-problem-simplification-completion.test.mjs` must remain exact for 018 evidence but allow current state to belong to 019. `quant-interview-problem-simplification-workstream.test.mjs` must keep its full pre-018 page-hash and 018 mapping tests unchanged while replacing only its current corpus/no019 test with a historical durability check.

After editing named files, run `npm test`. If another test fails only because it literally encodes the current 81/56/239/511/Green2.2/no019 state, add that exact test file to the Task 7 report and update only the stale latest-state assertion; do not weaken historical evidence.

- [ ] **Step 3: Write active-019 HANDOFF**

Add `## Active cross-book workstream 19` after completed 18 with:

- exact id, active/evidence-free state, one-source nine-key scope;
- two Knowledge and five Problem outputs;
- exact 5/3/1 split;
- card/rope Knowledge-only boundary and tower merge;
- three override reasons and zero page changes;
- 86/58, 248/502, Green 2.3 next;
- source-neutrality and no-completeness-overclaim;
- no020.

Replace current/master blocks with `activeCurrent` and:

```markdown
**Workstream 019 owns the exact nine-record Green Book 2.2 core scope. The three-book master directory migration remains complete.**

First pending master record after the active 019 scope: `green-book::2.3::theory`

Workstream 020 is not active or authorized.
```

- [ ] **Step 4: Regenerate directory and run active GREEN**

```bash
npm run knowledge:directory
npm run knowledge:directory:check
npm run master:directory:check
node --test tests/quant-interview-logical-deduction-green-core-completion.test.mjs tests/quant-interview-logical-deduction-green-core-workstream.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-handoff.test.mjs tests/quant-interview-knowledge-directory.test.mjs
npm test
git diff --check
```

Require full suite green and active manifest evidence-free.

- [ ] **Step 5: Review current-only scope and commit**

List every changed compatibility test and prove only latest-state assertions changed. Commit all Task 7 test/HANDOFF/directory files:

```bash
git add -- tests/quant-interview-logical-deduction-green-core-completion.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-behavioral-evidence-workstream.test.mjs tests/quant-interview-market-awareness-skip.test.mjs tests/quant-interview-preparation-breadth-practice-workstream.test.mjs tests/quant-interview-problem-simplification-completion.test.mjs tests/quant-interview-problem-simplification-workstream.test.mjs tests/quant-interview-handoff.test.mjs docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md
git commit -m "docs(quant-interview): record active logical deduction green core 019"
```

If the full-suite discovery added a named stale-current test, include it explicitly in `git add` and the report.

### Task 8: Prove immutable active 019 in Windows, WSL, and real CI

**Files:**
- Create: `.github/workflows/quant-interview-logical-deduction-green-core-019-temporary.yml`
- Modify only focused 019 files if a real gate exposes a defect; any fix restarts the proof with a new SHA.

**Interfaces:**
- Consumes: integrated evidence-free active 019 tree.
- Produces: one immutable `ACTIVE_SHA` and one matching successful numeric `RUN_ID`.

- [ ] **Step 1: Create exact temporary workflow**

```yaml
name: Quant Interview Logical Deduction Green Core 019 Temporary CI

on:
  push:
    branches:
      - codex/quant-interview-logical-deduction-green-core-019
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

Run the five commands separately in exact order. Require all green, `git diff --check`, clean expected scope, then commit only the workflow:

```bash
git add -- .github/workflows/quant-interview-logical-deduction-green-core-019-temporary.yml
git commit -m "ci(quant-interview): verify active logical deduction green core 019"
git rev-parse HEAD
```

Save full result as `ACTIVE_SHA`; never amend it.

- [ ] **Step 3: Prove exact active SHA in fresh WSL native-LF Node 24**

Use a detached WSL-native worktree. Require exact SHA, Node 24, LF-only tracked text/workflow, evidence-free active manifest, five gates, 86/58, 248/502, Green2.3, nine rows/5-3-1, three overrides, full page hash, no020/source media, clean tree. Remove only exact proof path/registration; never prune the Windows repo.

- [ ] **Step 4: Push feature branch and capture matching CI**

```bash
git push -u origin codex/quant-interview-logical-deduction-green-core-019
gh run list --workflow quant-interview-logical-deduction-green-core-019-temporary.yml --branch codex/quant-interview-logical-deduction-green-core-019 --limit 5 --json databaseId,headSha,status,conclusion,url
```

Select only exact headSha, watch to successful completion, inspect npm ci plus all five gates, save numeric `RUN_ID` and URL.

- [ ] **Step 5: Prove identity and report**

Require local HEAD, tracking ref, live remote ref, and CI head all equal `ACTIVE_SHA`. Write full ignored Task 8 report with Windows/WSL/CI outputs, invariants, cleanup/no-prune, warnings, and scope.

- [ ] **Step 6: Restart completely after any failure**

Write focused RED/GREEN fix, create a new commit, and repeat every proof step. Never record stale evidence.

### Task 9: Remove temporary CI, close 019, verify, review, and deliver

**Files:**
- Delete: `.github/workflows/quant-interview-logical-deduction-green-core-019-temporary.yml`
- Modify: `src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-logical-deduction-green-core-019.json`
- Modify: `tests/quant-interview-logical-deduction-green-core-workstream.test.mjs`
- Modify: `tests/quant-interview-logical-deduction-green-core-completion.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: exact factual `ACTIVE_SHA`, numeric `RUN_ID`, and CI URL from Task 8.
- Produces: workflow-free complete 019 branch, final independent approval, pushed feature head, and integration choice.

- [ ] **Step 1: Delete workflow in a dedicated commit**

```bash
git rm -- .github/workflows/quant-interview-logical-deduction-green-core-019-temporary.yml
git commit -m "chore(quant-interview): remove logical deduction green core 019 temporary CI"
```

The commit deletes one file only; manifest remains active/evidence-free.

- [ ] **Step 2: Prove workflow-free active commit in fresh WSL**

Require workflow absent, active/evidence-free manifest, Node24/LF, five gates, exact final data/page-hash/no020 invariants, clean tree, safe exact cleanup, and no prune.

- [ ] **Step 3: Add strict final-state RED and lifecycle-conditional manifest test**

Append a final test requiring manifest `complete`, Completed workstream 19 HANDOFF, exact complete current block, workflow absence, and Green2.3. Run it against active tree and require RED on status.

Change the workstream manifest test so active deep-equals the evidence-free fixture; complete removes evidence objects and deep-equals the same immutable scope with status complete, then delegates evidence exactness to the completion test.

- [ ] **Step 4: Record factual evidence**

Use exact Task 8 values in:

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
    temporaryArtifacts: ['.github/workflows/quant-interview-logical-deduction-green-core-019-temporary.yml'],
  },
  finalTreeGate: {
    environment: 'wsl-native-lf-node24',
    commands: ['npm test', 'npm run knowledge:directory:check', 'npm run master:directory:check', 'npm run check', 'npm run build'],
    conclusion: 'success', temporaryArtifactsAbsent: true,
  },
};
```

Serialize the exact 40-character SHA and positive numeric run id. Completion test deep-equals all structures and binds HANDOFF to exact SHA/run/URL.

- [ ] **Step 5: Write completed-019 HANDOFF and directory**

Rename active section to `## Completed cross-book workstream 19`; include exact evidence, seven outputs, nine dispositions, three overrides, zero page changes/hash, 86/58, 248/502, Green2.3, source-neutral/boundary statements, and no020.

Use final current state exactly:

```markdown
Current bounded topic:

**No bounded topic is active. Workstream 019 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 020 is not active or authorized by this closure.

## Master directory ingestion state

**No bounded ingestion workstream is active. The three-book master directory migration remains complete.**

First pending master record: `green-book::2.3::theory`

Workstream 020 is not active or authorized.
```

Regenerate/check directory and master.

- [ ] **Step 6: Run closure GREEN and commit**

Run focused lifecycle/workstream/master/HANDOFF/directory tests, then full suite and diff check. Commit exact manifest/tests/HANDOFF/directory files with:

```text
docs(quant-interview): close logical deduction green core 019
```

- [ ] **Step 7: Run final exact-head Windows and WSL gates**

Run five Windows commands, then exact closure SHA in fresh WSL Node24/LF. Require workflow absent, complete evidence exact, 86/58,248/502,Green2.3,5/3/1,three overrides,full page hash,no020,no source media,clean cleanup/no prune.

- [ ] **Step 8: Full branch review and one fix wave**

Review from plan base through closure: seven public pages and behavioral math; graph/catalog; nine decisions; three overrides; zero page changes/full hash; lifecycle evidence; historical compatibility; protected paths. Use requesting-code-review. Fix all Critical/Important findings in one consolidated TDD wave and run one scoped re-review.

- [ ] **Step 9: Push final feature head and prove equality**

```bash
git push origin codex/quant-interview-logical-deduction-green-core-019
git rev-parse HEAD
git rev-parse '@{upstream}'
git ls-remote --heads origin codex/quant-interview-logical-deduction-green-core-019
git status --short
```

Require equality/clean tracked tree; do not push main, merge, PR, force-push, remove worktree, or start020.

- [ ] **Step 10: Offer integration choice**

Invoke `finishing-a-development-branch` and present exactly:

```text
Implementation complete. What would you like to do?

1. Merge back to main locally
2. Push and create a Pull Request
3. Keep the branch as-is (I'll handle it later)

Which option?
```
