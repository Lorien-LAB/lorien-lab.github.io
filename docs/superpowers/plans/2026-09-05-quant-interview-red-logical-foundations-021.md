# Red Logical Foundations 021 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve the next six combined-directory records with three source-neutral, behaviorally verified Problems, two allowlisted page repairs, and factual Workstream 021 lifecycle evidence.

**Architecture:** Build and test each Problem independently, then perform public-corpus registration and the complete six-row hidden-data/current-state migration in one integration task. Preserve historical page fixtures by reversing only the two approved repairs before comparing old baselines; prove one immutable active SHA before workflow-free closure.

**Tech Stack:** Astro Markdown/YAML, JSON coverage/master/workstream ledgers, Node.js 24, `node:test`, `js-yaml`, generated Knowledge directory, WSL native-LF verification, GitHub Actions.

## Global Constraints

- Work only on branch `codex/quant-interview-red-logical-foundations-021`, forked from committed plan base, inside `.worktrees/red-logical-foundations-021`.
- Own exactly six ordered keys: `red-book::8::theory`, `red-book::10::theory`, `red-book::10.2::theory`, `red-book::8::8.1`, `red-book::8::8.4`, `red-book::8::8.9`.
- Publish exactly three Problems and zero Knowledge; final public corpus is exactly **96 Problems / 59 Knowledge**.
- Resolve exactly 3 `canonical-problem`, 1 `knowledge-only`, and 2 `interview-guidance` records. Guidance has no public targets and terminalizes no referenced item.
- Final master state is exactly **262 terminal / 488 pending** of 750; first pending is `red-book::8::8.11`; Workstream 022 remains absent and unauthorized.
- Public pages are independently written and source-neutral, with assumptions, two progressive hints, answers only inside disclosure, complete derivations, significance, mistakes, and extensions.
- Use exact Problem ids `logic-logical-deduction-012`, `013`, `014`; do not add a Knowledge node, dependency, component, layout, taxonomy entry, or source-topic-map edit.
- Add Red coverage rows `(8,8.1)`, `(8,8.4)`, `(8,8.9)` because they do not exist; update the existing `(8,null)`, `(10,null)`, `(10.2,null)` rows; never duplicate a coverage key.
- The allocation row alone receives a `limits-derivatives` override with a nonempty exact reason; clock and cube refine the mapped Logic parent to `logical-deduction` without unrelated topics.
- Apply exactly two master page repairs: `8::theory` 287-309 to 287; `10.2::theory` 317-320 to 317-318. Preserve all other 748 page rows and every solution-page array.
- Pre-021 page projection hash is `2275e9e3414f249dc39bcef52bbaf202ab8d43445e61845f63a94724059eeb3e`; repaired projection hash is `92470e19ba2b116f2d98142465a2df38cb7b13f0f908d646cc64360d1ba16eb0`.
- Historical freeze tests must reverse exactly those two repairs in a clone before checking their old hash; never replace historical constants, accept arbitrary hashes, or weaken mutation coverage.
- Active 021 is evidence-free. Complete 021 pins the real active SHA, positive numeric CI run id, CI URL, ordered commands, workflow absence, and no 022.
- Use an ignored SDD ledger/report workspace for resume. Never stage `.superpowers/`, `tmp/`, source PDFs, interview guide, rendered/OCR artifacts, dependencies, or unrelated changes.
- Preserve all Workstream 001-020 dispositions, evidence, public identities, and historical documentation except exact current-state/approved-page-migration compatibility edits.
- Standard ordered gates: `npm test`, `npm run knowledge:directory:check`, `npm run master:directory:check`, `npm run check`, `npm run build`.

## File Responsibility Map

- Task 1 owns the clock page and continuous-angle behavior test.
- Task 2 owns the cube-surface page and path-model/minimality test.
- Task 3 owns the alternating-allocation page and finite/infinite geometric behavior test.
- Task 4 owns public source-neutral registration, active manifest, six coverage/master decisions, page migration, historical compatibility, current HANDOFF/directory, and full-suite reconciliation.
- Task 5 owns the temporary workflow and immutable active SHA/CI proof only.
- Task 6 owns workflow deletion, factual completion evidence, final documentation/tests/gates/review/push, and the integration menu.

---

### Task 1: Publish Clock Hand Angles and Relative Motion

**Files:**
- Create: `tests/quant-interview-red-logical-foundations-clock.test.mjs`
- Create: `src/content/problems/logic/clock-hand-angles-and-relative-motion.md`

**Interfaces:** Produces Problem id `logic-logical-deduction-012` and slug `clock-hand-angles-and-relative-motion` for Task 4.

- [ ] **Step 1: Write metadata, structure, and behavior tests before the page**

Parse real Markdown/YAML with `js-yaml` and require this distinguishing metadata:

```js
const expected = {
  problemId: 'logic-logical-deduction-012',
  title: 'Clock Hand Angles and Relative Motion',
  description: 'Compute clock-hand separations with continuous angular motion and locate neighboring coincidence times by relative speed.',
  date: '2026-09-05', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Relative Motion', 'Modular Angles'], tags: ['Logical Deduction', 'Clocks', 'Relative Motion', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['logical-deduction-constraint-propagation-and-case-elimination', 'small-cases-recurrence-and-structural-simplification'],
  techniques: [], prerequisites: [],
  relatedProblems: ['shortest-path-on-cube-surface'],
  family: 'clock-relative-motion', mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 12, status: 'solved', featured: false,
};
const angle = (hour, minute) => {
  const raw = Math.abs(6 * minute - (30 * (hour % 12) + 0.5 * minute)) % 360;
  return Math.min(raw, 360 - raw);
};
assert.equal(angle(3, 15), 7.5);
assert.equal(angle(4, 15), 37.5);
assert.equal(angle(11, 59), 5.5);
assert.equal(720 * 2 / 11 < 195, true);
assert.equal(720 * 3 / 11 > 195, true);
```

Also require all standard solved-page sections, exactly two hints before disclosure, no answer before disclosure, the formulae `6m` and `30h+0.5m`, smaller-angle normalization, and exact adjacent-coincidence times `1440/11` and `2160/11` minutes after 12:00.

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-red-logical-foundations-clock.test.mjs`. Expect `ENOENT` for the absent page while independent calculations pass.

- [ ] **Step 3: Author the minimal complete page**

Use independently worded public prose. Define an ideal continuous 12-hour clock and time units. Keep both requested numeric angles and derive the neighboring coincidences from relative speed 5.5 degrees/minute. Do not expose answers in Problem or hint summaries.

- [ ] **Step 4: Run GREEN and mutations**

Run the focused test. Mutate hour-hand speed from 0.5 to 0 and mutate wraparound normalization; each must fail. Restore and run `git diff --check`.

- [ ] **Step 5: Commit**

```bash
git add -- tests/quant-interview-red-logical-foundations-clock.test.mjs src/content/problems/logic/clock-hand-angles-and-relative-motion.md
git commit -m "feat(quant-interview): add clock relative motion Problem"
```

### Task 2: Publish Shortest Path on a Cube Surface

**Files:**
- Create: `tests/quant-interview-red-logical-foundations-cube.test.mjs`
- Create: `src/content/problems/logic/shortest-path-on-cube-surface.md`

**Interfaces:** Consumes Task 1 slug for one reciprocal relation; produces Problem id `logic-logical-deduction-013` and cube slug for Task 4.

- [ ] **Step 1: Write failing exact-page tests**

Require this exact metadata, standard sections, and two progressive hints:

```js
const expected = {
  problemId: 'logic-logical-deduction-013', title: 'Shortest Path on a Cube Surface',
  description: 'Unfold a unit cube to find and prove the shortest surface path between opposite vertices while separating surface, edge, and interior models.',
  date: '2026-09-05', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Geometry', 'Shortest Paths'], tags: ['Logical Deduction', 'Geometry', 'Unfolding', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['constraint-reframing-and-latent-state', 'logical-deduction-constraint-propagation-and-case-elimination'],
  techniques: [], prerequisites: [], relatedProblems: ['clock-hand-angles-and-relative-motion'], family: 'surface-unfolding',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15, status: 'solved', featured: false,
};
```

Define the three model distances in test data:

```js
const distances = {
  surface: Math.hypot(1, 2),
  edgesOnly: 3,
  interior: Math.sqrt(3),
};
assert.equal(distances.surface, Math.sqrt(5));
assert.ok(distances.interior < distances.surface && distances.surface < distances.edgesOnly);
for (const [width, height] of [[1, 2], [2, 1]]) assert.equal(Math.hypot(width, height), Math.sqrt(5));
```

Parse the solution's model table and require exact values. Require a feasible unfolded straight segment plus a separate global-minimality section that classifies alternative face strips and applies straight-line lower bounds; fail a page that only states one net.

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-red-logical-foundations-cube.test.mjs`; expect the absent-page failure.

- [ ] **Step 3: Author the surface-constrained proof**

State endpoints as opposite cube vertices. Explain legal face unfolding without allowing an interior chord. Account for symmetric routes and longer wraps; the shortest feasible developed endpoint displacement is 1-by-2, so length is sqrt(5). Separately report edge-only 3 and interior sqrt(3).

- [ ] **Step 4: Run GREEN and mutations**

Mutate surface value to sqrt(3) and remove the route-class lower bound; both focused checks must fail. Restore, run focused test and `git diff --check`.

- [ ] **Step 5: Commit**

```bash
git add -- tests/quant-interview-red-logical-foundations-cube.test.mjs src/content/problems/logic/shortest-path-on-cube-surface.md
git commit -m "feat(quant-interview): add cube surface path Problem"
```

### Task 3: Publish Alternating Geometric Resource Allocation

**Files:**
- Create: `tests/quant-interview-red-logical-foundations-allocation.test.mjs`
- Create: `src/content/problems/logic/alternating-geometric-resource-allocation.md`

**Interfaces:** Produces Problem id `logic-logical-deduction-014` and slug `alternating-geometric-resource-allocation` for Task 4.

- [ ] **Step 1: Write failing metadata and finite/infinite behavior tests**

Require this exact metadata, standard sections, and two hints:

```js
const expected = {
  problemId: 'logic-logical-deduction-014', title: 'Alternating Geometric Resource Allocation',
  description: 'Derive finite and infinite shares when two participants alternately take fixed fractions of a remaining resource.',
  date: '2026-09-05', domain: 'Mathematics & Statistics', category: 'Calculus',
  subcategories: ['Infinite Series', 'Geometric Series'], tags: ['Logical Deduction', 'Geometric Series', 'Limits', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'calculus-differential-equations', 'limits-derivatives'],
  concepts: ['positive-series-convergence', 'small-cases-recurrence-and-structural-simplification'],
  techniques: [], prerequisites: [], relatedProblems: [], family: 'alternating-geometric-allocation',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15, status: 'solved', featured: false,
};
```

Verify independently:

```js
function shares(a, b, rounds) {
  const r = (1 - a) * (1 - b);
  const factor = (1 - r ** rounds) / (1 - r);
  return { first: a * factor, second: (1 - a) * b * factor, remainder: r ** rounds };
}
assert.deepEqual(shares(0.5, 0.5, 1), { first: 0.5, second: 0.25, remainder: 0.25 });
assert.ok(Math.abs(shares(0.5, 0.5, 20).first - 2 / 3) < 1e-12);
assert.ok(Math.abs(shares(0.5, 0.5, 20).second - 1 / 3) < 1e-12);
for (const [a, b] of [[0.2, 0.3], [0.8, 0.1]]) {
  const { first, second, remainder } = shares(a, b, 12);
  assert.ok(Math.abs(first + second + remainder - 1) < 1e-12);
}
```

Require exact symbolic finite sums, ratio `r=(1-a)(1-b)`, infinite shares, and remainder `r^N`; reject claims that the two shares are always 2/3 and 1/3.

- [ ] **Step 2: Run RED**

Run `node --test tests/quant-interview-red-logical-foundations-allocation.test.mjs`; expect missing-page failure.

- [ ] **Step 3: Author the complete page**

Use a neutral unit resource and fractions strictly between zero and one. Derive both finite shares before taking limits, prove `0<r<1`, and check conservation. Keep the equal-half case as a specialization.

- [ ] **Step 4: Run GREEN and mutations**

Mutate `r` to `ab` and remove the finite remainder; each check must fail. Restore, run focused test and `git diff --check`.

- [ ] **Step 5: Commit**

```bash
git add -- tests/quant-interview-red-logical-foundations-allocation.test.mjs src/content/problems/logic/alternating-geometric-resource-allocation.md
git commit -m "feat(quant-interview): add geometric allocation Problem"
```

### Task 4: Register the public corpus and activate the complete six-row migration

**Files:**
- Create: `tests/quant-interview-red-logical-foundations-workstream.test.mjs`
- Create: `tests/quant-interview-red-logical-foundations-completion.test.mjs`
- Create: `src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-red-logical-foundations-021.json`
- Modify: `src/data/quant-interview/coverage/red-book.json`
- Modify: `src/data/quant-interview/master-directory.json`
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`
- Modify current-only/migration-aware assertions in `tests/quant-interview-master-directory-repository.test.mjs`, `tests/quant-interview-handoff.test.mjs`, `tests/quant-interview-knowledge-directory.test.mjs`, `tests/quant-interview-thinking-outside-box-workstream.test.mjs`, `tests/quant-interview-thinking-outside-box-completion.test.mjs`, `tests/quant-interview-logical-deduction-green-core-workstream.test.mjs`, `tests/quant-interview-logical-deduction-green-core-completion.test.mjs`, `tests/quant-interview-problem-simplification-completion.test.mjs`, `tests/quant-interview-behavioral-evidence-workstream.test.mjs`, `tests/quant-interview-behavioral-evidence-completion.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:** Consumes all three Problem slugs; produces the complete active 021 repository state and one green integrated suite for Task 5.

- [ ] **Step 1: Write RED tests for public registration and exact source-neutral bodies**

Append the three slugs and exact topics to the existing discovered public corpus, require unique ids 012-014, and update current totals to 96/59. Scan all three Markdown bodies for source/book/section/page/provenance terms. Preserve all existing 020 body scans and schema checks. Run the three focused Problem tests plus source-neutral test; expect only missing registration/current-count assertions before production-data edits.

- [ ] **Step 2: Write RED workstream, disposition, and page-migration tests**

Use this active manifest fixture:

```js
const id = 'logic-brainteasers-discrete-reasoning-red-logical-foundations-021';
const keys = ['red-book::8::theory', 'red-book::10::theory', 'red-book::10.2::theory', 'red-book::8::8.1', 'red-book::8::8.4', 'red-book::8::8.9'];
const activeManifest = {
  id,
  canonicalTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  status: 'active', masterItemKeys: keys,
  sourceScopes: [{ source: 'red-book', sourceSections: ['8', '10', '10.2'], evidencePageRanges: [{ startPage: 287, endPage: 296 }, { startPage: 317, endPage: 318 }], reviewOutcome: 'red-logical-foundations-publication-and-index-disposition', reviewNote: 'Six ordered records yield three canonical Problems, one existing-Knowledge introduction, and two non-public revision-index dispositions.' }],
  publicDelta: { problems: 3, knowledge: 0 }, knowledgeSlugs: [],
};
```

Require active deep equality and no evidence fields. Pin these decisions and exact notes:

```js
const decisions = [
  [keys[0], 'knowledge-only', [], ['small-cases-recurrence-and-structural-simplification', 'constraint-reframing-and-latent-state'], 'The chapter methodology introduction resolves to existing source-neutral simplification and constraint-reframing Knowledge without claiming its questions are covered.'],
  [keys[1], 'interview-guidance', [], [], 'The chapter introduction is an internal revision-list framing record and creates no public target or completion claim for its referenced questions.'],
  [keys[2], 'interview-guidance', [], [], 'The repeated-question index remains internal guidance; every referenced source item retains its independent coverage state.'],
  [keys[3], 'canonical-problem', ['clock-hand-angles-and-relative-motion'], ['logical-deduction-constraint-propagation-and-case-elimination', 'small-cases-recurrence-and-structural-simplification'], 'The clock prompt becomes a canonical continuous relative-motion and angular-normalization Problem.'],
  [keys[4], 'canonical-problem', ['shortest-path-on-cube-surface'], ['constraint-reframing-and-latent-state', 'logical-deduction-constraint-propagation-and-case-elimination'], 'The surface-travel prompt becomes a canonical cube-unfolding Problem with a global minimality argument.'],
  [keys[5], 'canonical-problem', ['alternating-geometric-resource-allocation'], ['positive-series-convergence', 'small-cases-recurrence-and-structural-simplification'], 'The alternating-share prompt becomes a canonical finite-and-infinite geometric-allocation Problem with an item-level limits refinement.'],
];
const allocationOverride = 'Item-level review identifies finite geometric partial sums and a zero-remainder limit, so this Logical Deduction item also belongs to Limits & Derivatives.';
```

Require exact 3/1/2 histogram; mirrored targets/notes; 021 ownership; no duplicate Red coverage tuple; exactly three newly added coverage tuples; clock/cube topics `['logical-deduction']`; allocation topics `['logical-deduction','limits-derivatives']` plus exact reason and expanded master topics `['logic-brainteasers-discrete-reasoning','logical-deduction','calculus-differential-equations','limits-derivatives']`.

Snapshot the full pre-migration projection and assert literal old hash. Apply only the two approved page mutations in the fixture and require literal repaired hash. For current data, require the repaired hash. Reverse those two rows in a clone and require the old hash. Mutate either repaired row or one untouched row and require failure.

- [ ] **Step 3: Write RED phase-aware completion/current-state tests**

Require active state: evidence-free manifest, Active workstream 21 HANDOFF, no completed-21 heading, 96/59, 262/488, Red 8.11 next, and no022. Complete state later requires exact evidence, no workflow, Completed heading, no active topic, same counts/next, no022. Also assert every question referenced by Red 10.2 retains its pre-021 state. Run focused RED against absent manifest/pending rows/stale directory.

- [ ] **Step 4: Implement one coherent active migration**

Create the exact active manifest. Update the three existing section rows and add exactly three item rows in deterministic source-item order. Update exactly six master rows, including only two page repairs. Do not touch the source-topic map or validators. Update current-only and historical migration-aware fixtures: old workstream tests reverse exactly the approved repairs before old-hash comparison and still fail any third mutation. Add no skip or blanket hash acceptance.

Write Active workstream 21 HANDOFF with exact scope, outputs, dispositions, page repairs, override, source-neutral/boundary statements, 96/59, 262/488, Red 8.11 next, evidence-free status, and no022. Regenerate the directory. Use this current block:

```markdown
**Logic, Brainteasers & Discrete Reasoning → Logical Deduction.**

Workstream 021 is active across the exact six-record Red logical-foundations scope. Its public delta is +3 Problems / +0 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.
```

- [ ] **Step 5: Run integrated GREEN and reconcile only literal stale-current failures**

```bash
node --test tests/quant-interview-red-logical-foundations-clock.test.mjs tests/quant-interview-red-logical-foundations-cube.test.mjs tests/quant-interview-red-logical-foundations-allocation.test.mjs tests/quant-interview-red-logical-foundations-workstream.test.mjs tests/quant-interview-red-logical-foundations-completion.test.mjs tests/quant-interview-source-neutral-content.test.mjs
npm run knowledge:directory
npm run knowledge:directory:check
npm run master:directory:check
npm test
git diff --check
```

If full discovery names another fixture that literally pins current 93/59, 256/494, Red-8 theory, no021, or the old page projection, update only that assertion using the exact new contract or two-row reverse-normalization. List each discovered file and rationale in the task report. No production change may be made to satisfy a stale fixture.

- [ ] **Step 6: Audit and commit active state**

Prove only three Problems, six intended master rows, six intended coverage tuples, current docs/tests, and historical migration shims changed. Require no workflow or evidence field. Stage exact files and commit `feat(quant-interview): activate red logical foundations 021`, followed by `docs(quant-interview): record active red logical foundations 021` only if separating generated/current documentation makes review clearer. Record both bases for task review.

### Task 5: Prove immutable active 021 on Windows, WSL, and CI

**Files:**
- Create: `.github/workflows/quant-interview-red-logical-foundations-021-temporary.yml`
- Modify focused 021 files only if a real gate defect is first reproduced by a failing test; any tracked fix restarts the full proof with a new SHA.

**Interfaces:** Consumes the integrated evidence-free active state; produces immutable runtime values `ACTIVE_SHA`, positive numeric `RUN_ID`, and CI URL for Task 6.

- [ ] **Step 1: Create the exact temporary workflow**

```yaml
name: Quant Interview Red Logical Foundations 021 Temporary CI
on:
  push:
    branches: [codex/quant-interview-red-logical-foundations-021]
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

- [ ] **Step 2: Freeze the active commit and prove Windows at that exact SHA**

Commit only the workflow as `ci(quant-interview): verify active red logical foundations 021`; save the resulting full SHA as `ACTIVE_SHA` and never amend it. Assert clean `HEAD === ACTIVE_SHA`, then run all five gates separately in order. Recheck unchanged HEAD/clean status afterward. Do not reuse pre-commit results.

- [ ] **Step 3: Prove exact active SHA in fresh WSL native-LF Node 24**

Create one safely named detached WSL-native checkout, verify exact SHA/ext2-or-ext3/Node24/npm/LF-only tracked text, run `npm ci` and all five gates, then assert 96/59, 262/488, Red8.11, exact six rows/3-1-2, one allocation override, repaired projection hash, active evidence-free manifest, workflow present, no022/source media, and clean tree. Validate literal path and exact registration before removing only that worktree; do not prune Windows worktrees.

- [ ] **Step 4: Push only feature branch and capture matching successful CI**

```bash
git push -u origin codex/quant-interview-red-logical-foundations-021
gh run list --workflow quant-interview-red-logical-foundations-021-temporary.yml --branch codex/quant-interview-red-logical-foundations-021 --limit 5 --json databaseId,headSha,status,conclusion,url
```

Select only exact `headSha === ACTIVE_SHA`, wait for success, inspect npm-ci and every gate, save numeric `RUN_ID` and exact URL. Prove local HEAD, upstream, live remote, and CI head all equal `ACTIVE_SHA`. Write the ignored Task 5 report with commands, outputs, warnings, cleanup/no-prune, and exact scope. A real defect creates a new commit and restarts every proof step.

### Task 6: Remove temporary CI, close 021, review, and deliver

**Files:**
- Delete: `.github/workflows/quant-interview-red-logical-foundations-021-temporary.yml`
- Modify: `src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-red-logical-foundations-021.json`
- Modify: `tests/quant-interview-red-logical-foundations-workstream.test.mjs`
- Modify: `tests/quant-interview-red-logical-foundations-completion.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:** Consumes exact Task 5 `ACTIVE_SHA`, `RUN_ID`, CI URL; produces workflow-free complete 021 feature branch and integration choice.

- [ ] **Step 1: Remove workflow in a one-file commit and prove workflow-free active state**

Use `git rm` and commit `chore(quant-interview): remove red logical foundations 021 temporary CI`. Manifest remains active/evidence-free. Prove this deletion commit in a fresh WSL Node24/LF checkout with `npm ci`, five gates, active invariants, workflow absence, exact cleanup, and no prune.

- [ ] **Step 2: Write final-state RED**

Extend phase-aware tests to require complete status, exact evidence values, absent workflow, Completed workstream 21 HANDOFF, exact no-active-topic/master blocks, Red8.11, and no022. Pin Task 5 values exactly, including the full SHA, positive numeric run id, and exact CI URL; add coordinated fake SHA/run/URL mutations. Run against active state and require failure specifically on status/current wording.

- [ ] **Step 3: Record factual evidence and close**

Serialize only Task 5 values in the established fields:

```js
preClosureActiveGate: { status: 'active', commit: ACTIVE_SHA, environment: 'wsl-native-lf-node24', commands, conclusion: 'success' }
verification: { commit: ACTIVE_SHA, runId: RUN_ID, commands, conclusion: 'success', temporaryArtifacts: ['.github/workflows/quant-interview-red-logical-foundations-021-temporary.yml'] }
finalTreeGate: { environment: 'wsl-native-lf-node24', commands, conclusion: 'success', temporaryArtifactsAbsent: true }
```

Rename Active to Completed, document the exact evidence/outputs/dispositions/repairs/override/counts/next/boundaries, set current topic to none, and state 022 unauthorized. Regenerate directory. Run focused lifecycle/workstream/current tests, full suite, both directory checks, diff check, then commit `docs(quant-interview): close red logical foundations 021`.

- [ ] **Step 4: Run final exact-head Windows and WSL gates**

At the closure SHA, run all five Windows gates and complete invariants. Repeat from a fresh WSL native-LF Node24 checkout with npm-ci, exact SHA, same gates/invariants, safe literal cleanup, and no prune. Require 96/59, 262/488, Red8.11, six rows/3-1-2, one override, repaired hash, exact evidence, absent workflow/022/source media, and clean tree.

- [ ] **Step 5: Perform independent task and whole-branch review**

Review every task diff, then the whole range from plan base. Check mathematical proofs, answer-before-hints, source-neutral bodies, public metadata, catalog totals, six dispositions, index non-completion, exact two-row migration and historical normalization, lifecycle evidence, protected paths, readability, and scope. Fix all Critical/Important findings in one consolidated TDD wave and run exactly one scoped re-review. Record Minors for final triage rather than silently discarding them.

- [ ] **Step 6: Re-run definitive gates after any fix, push, and hand off**

If review changes HEAD, rerun exact-head Windows and fresh WSL proof. Push only the feature branch, then require local/upstream/live remote equality and clean tracked state. Do not merge/push main, create a PR, remove the feature worktree, or start022. Invoke `finishing-a-development-branch` and offer exactly the standard three integration options.
