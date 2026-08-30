# Quant Interview Logical Deduction Green Core 019 Design

**Date:** 2026-08-30
**Status:** Approved in conversation; pending implementation plan

## Objective

Process the next nine consecutive master records, Green Book section 2.2, as bounded workstream 019. Publish two source-neutral Knowledge nodes and five independently authored S3+ Problems, preserve two lower-depth prompts as executable Knowledge checks, merge the recursive power-tower prompt into its existing canonical identity, and advance the master queue to `green-book::2.3::theory` without starting workstream 020.

## Binding Decisions

- Scope exactly Green Book 2.2 theory plus its eight labeled prompts; do not absorb Green 2.3 or later Red/150 Logical Deduction records.
- Use the full cross-book repository only for semantic deduplication and existing-target discovery.
- Publish exactly **+5 Problems / +2 Knowledge**.
- Resolve exactly five rows as `canonical-problem`, three as `knowledge-only`, and one as `merged-duplicate`.
- Keep the card-pair invariant and uneven-rope timer as public Knowledge exercises rather than standalone low-depth Problems.
- Merge the recursive tower identity into `infinite-power-tower-limit`; do not create a wrapper Problem.
- Route the factorial-zero item to Modular Arithmetic, the batched-race item additionally to Algorithmic Complexity, and the tower item to Limits & Derivatives, each with an explicit `topicOverrideReason`.
- Apply no question-page or solution-page repair in 019.
- Freeze all 750 master page-range records against the pre-019 projection hash.
- Keep public content independently worded and source-neutral.
- Do not create, activate, authorize, or imply workstream 020.

## Current Repository State

- Base branch: `main`.
- Base commit at design approval: `8c155195939e20e05ccff5dd1621faa13e087488`.
- Completed bounded workstream: `logic-brainteasers-discrete-reasoning-problem-simplification-018`.
- Public corpus: **81 Problems / 56 Knowledge**.
- Master directory: **239 terminal / 511 pending**.
- First pending record: `green-book::2.2::theory`.
- No bounded workstream is active.
- Logical Deduction is a coarse 39-record topic: 17 Green, 12 Red, and 10 from 150 Questions. This design deliberately handles only its first coherent nine-record batch.
- The three PDFs in `docs/书籍/` and `docs/量化实习_LeetCode与编程笔试面试备考指南.md` remain untracked source inputs.

## Decomposition and Alternatives

### Selected: Green 2.2 core batch

Nine consecutive records form one reviewable unit with a clear queue boundary. Cross-book inspection prevents known duplicates, especially the already-published power-tower identity, while leaving Green 2.3 as the next explicit batch.

### Rejected: all Green 2.2–2.3 records

Seventeen records mix ordinary logic, invariant puzzles, secure-message protocols, privacy masking, and state transformations. Combining them would produce a broad, less reviewable workstream and delay the next checkpoint.

### Rejected: all 39 Logical Deduction records

The Red/150 rows include geometry, differential equations, common-knowledge puzzles, games, clocks, and switching protocols whose actual mathematical identities need separate item-level routing. A single workstream would be too large and would encourage taxonomy errors.

### Rejected: seven standalone Problems

The card-pair invariant and uneven-rope timer are useful checks but do not justify source-derived standalone pages at the repository's S3+ threshold.

## Workstream Identity and Architecture

- Workstream id: `logic-brainteasers-discrete-reasoning-logical-deduction-green-core-019`.
- Primary canonical topic: `logical-deduction`.
- Parent topic: `logic-brainteasers-discrete-reasoning`.
- Source scope: Green Book section `2.2`, evidence pages 21–26.
- Scope cardinality: exactly nine consecutive master keys in existing queue order.
- Public delta: exactly five Problems and two Knowledge nodes.
- Candidate branch: `codex/quant-interview-logical-deduction-green-core-019`.
- Temporary CI: `.github/workflows/quant-interview-logical-deduction-green-core-019-temporary.yml`.

Public pages contain canonical reasoning content only. Source title, section label, page evidence, mapping state, override reason, lifecycle, and verification evidence remain private repository data. The taxonomy and source-topic map are not edited; item-level semantic rerouting is expressed in Green coverage and mirrored expanded master topics.

## Exact Source Scope and Dispositions

| Master key | Evidence | State | Canonical Problems | Canonical Knowledge |
|---|---:|---|---|---|
| `green-book::2.2::theory` | Q 21 | `knowledge-only` | None | `logical-deduction-constraint-propagation-and-case-elimination` |
| `green-book::2.2.river-crossing::question` | Q 21 | `canonical-problem` | `bridge-crossing-minimum-time` | `logical-deduction-constraint-propagation-and-case-elimination` |
| `green-book::2.2.birthday-problem::question` | Q 21–22 | `canonical-problem` | `public-announcement-candidate-elimination` | `logical-deduction-constraint-propagation-and-case-elimination` |
| `green-book::2.2.card-game::question` | Q 22–23 | `knowledge-only` | None | `logical-deduction-constraint-propagation-and-case-elimination` |
| `green-book::2.2.burning-ropes::question` | Q 23 | `knowledge-only` | None | `logical-deduction-constraint-propagation-and-case-elimination` |
| `green-book::2.2.defective-ball::question` | Q 23–25 | `canonical-problem` | `twelve-object-balance-scale-diagnosis` | `decision-trees-information-bounds-and-adaptive-testing` |
| `green-book::2.2.trailing-zeros::question` | Q 25 | `canonical-problem` | `factorial-trailing-zeros-in-arbitrary-base` | `modular-arithmetic`, `counting-permutations-combinations` |
| `green-book::2.2.horse-race::question` | Q 25–26 | `canonical-problem` | `top-three-from-batched-races` | `decision-trees-information-bounds-and-adaptive-testing` |
| `green-book::2.2.infinite-sequence::question` | Q 26 | `merged-duplicate` | `infinite-power-tower-limit` | `bounded-monotone-convergence-and-fixed-points` |

No other master or coverage row may become terminal, receive 019 ownership, or change page evidence.

## Public Knowledge Design

### `logical-deduction-constraint-propagation-and-case-elimination`

**Title:** Logical Deduction, Constraint Propagation & Case Elimination

**Classification:**

- topics: `logic-brainteasers-discrete-reasoning`, `logical-deduction`
- primary topic: `logical-deduction`
- learning order: 10
- status: `published`

**Required content:**

1. Represent a prompt as a finite candidate-state set with explicit facts, unknowns, and constraints.
2. Apply necessary conditions and eliminate impossible states without assuming the desired conclusion.
3. Distinguish private information, public statements, and common knowledge.
4. Explain how a truthful public statement updates every participant's candidate set and how later statements depend on earlier updates.
5. Use invariants and contradiction checks when local simulation is unnecessary.
6. Require exhaustiveness: a remaining candidate is unique only after all alternatives are ruled out.
7. Include recognition signals, common mistakes, and at least eight executable Interview Checks.
8. Include a self-contained two-color card-pair invariant exercise and a self-contained uneven-rope timing exercise; neither check may expose source identity or simply state the answer.

### `decision-trees-information-bounds-and-adaptive-testing`

**Title:** Decision Trees, Information Bounds & Adaptive Testing

**Classification:**

- topics: `logic-brainteasers-discrete-reasoning`, `logical-deduction`
- primary topic: `logical-deduction`
- learning order: 20
- status: `published`

**Required content:**

1. Model candidates as leaves and tests as internal nodes whose branches are possible outcomes.
2. Derive the information-capacity lower bound from branching factor and worst-case depth.
3. Explain why feasibility also requires balanced, legal branches rather than only enough theoretical leaves.
4. Build adaptive strategies whose next test depends on the observed branch.
5. Distinguish identifying one candidate from ranking or selecting several candidates.
6. Explain comparison certificates and partial-order elimination.
7. Require every leaf to identify exactly one state and every legal state to reach a leaf.
8. Include recognition signals, common mistakes, and at least eight executable Interview Checks covering ternary diagnosis and batched selection.

## Public Problem Design

Every new Problem is independently worded, renderer-safe, source-neutral, and S3+. Each page includes Problem, Think Before Revealing, two progressive hints, Show Solution, Why This Problem Matters, Common Mistakes, and Extensions.

### 1. `bridge-crossing-minimum-time`

- Problem id: `logic-logical-deduction-001`.
- Title: **Minimum-Time Bridge Crossing**.
- Topics: `logic-brainteasers-discrete-reasoning`, `logical-deduction`.
- Model: four travelers take 1, 3, 6, and 11 minutes; one torch; bridge capacity two; a pair moves at the slower traveler's time; all start on one side.
- Required result: construct a 21-minute schedule and prove optimality by comparing the two possible useful patterns for transporting the two slowest travelers. A bare schedule is insufficient.

### 2. `public-announcement-candidate-elimination`

- Problem id: `logic-logical-deduction-002`.
- Title: **Public-Announcement Candidate Elimination**.
- Topics: `logic-brainteasers-discrete-reasoning`, `logical-deduction`.
- Candidate set: `A:{3,6,9}`, `B:{3,8}`, `C:{2,6}`, `D:{2,5,9}`.
- Model: one analyst privately knows the letter, another privately knows the number; the first truthfully says both “I do not know” and “I know the second analyst does not know”; the second then says “Now I know”; the first then says “Now I know.” Statements and rationality are common knowledge.
- Required result: update the shared candidate set after each statement and prove the unique state is `C2`.

### 3. `twelve-object-balance-scale-diagnosis`

- Problem id: `logic-logical-deduction-003`.
- Title: **Twelve-Object Balance-Scale Diagnosis**.
- Topics: `logic-brainteasers-discrete-reasoning`, `logical-deduction`.
- Model: exactly one of twelve visually identical objects has different weight; it may be heavier or lighter; a balance scale has left-heavy, balanced, and right-heavy outcomes; exactly three adaptive weighings are allowed.
- Required result: state the 24 hypotheses and ternary lower bound, publish a complete executable decision tree, and prove every hypothesis reaches one unique leaf. Symmetric branches may be represented by an explicit transformation only if the transformation is testable.

### 4. `factorial-trailing-zeros-in-arbitrary-base`

- Problem id: `logic-modular-arithmetic-002`.
- Title: **Factorial Trailing Zeros in an Arbitrary Base**.
- Topics: `logic-brainteasers-discrete-reasoning`, `modular-arithmetic`.
- Canonical Knowledge: `modular-arithmetic`, `counting-permutations-combinations`.
- Required result: derive Legendre valuations, prove the general base formula `min_p floor(v_p(n!)/e_p)` for `b = product p^(e_p)`, and compute `100!` trailing zeros as 24 in base 10 and 48 in base 12.
- The Green item receives a topic override because its mathematical identity is valuation/divisibility, not general logical deduction.

### 5. `top-three-from-batched-races`

- Problem id: `logic-logical-deduction-004`.
- Title: **Top Three from Batched Races**.
- Topics: `logic-brainteasers-discrete-reasoning`, `logical-deduction`, `algorithms-data-structures-cpp`, `algorithmic-complexity`.
- Model: 25 racers have distinct constant speeds; at most five race at once; a race returns only relative order; no timing is available.
- Required result: give the seven-race strategy, derive the exact candidate set after the five group races and winners' race, and prove no non-candidate can be globally top three. The final race must identify the remaining two podium positions, and a partial-order adversary argument must show that six races cannot always determine all three.
- The Green item receives an Algorithmic Complexity override because the solution is a comparison/selection strategy with an optimal race count.

## Public Graph and Catalog Registration

Register both new Knowledge modules under `logical-deduction`:

- Constraint Propagation: learning order 10; prerequisites none.
- Decision Trees: learning order 20; prerequisite Constraint Propagation.

Exact reciprocal graph:

- Constraint Propagation relates to `small-cases-recurrence-and-structural-simplification`, `problem-framing-clarification-assumption-management`, and Decision Trees.
- Decision Trees relates to Constraint Propagation and `small-cases-recurrence-and-structural-simplification`.
- Small Cases gains both new nodes.
- Problem Framing gains Constraint Propagation.

The first three Logical Deduction Problems link to the relevant new Knowledge node. The factorial Problem links only to its existing modular/counting Knowledge. The race Problem links to Decision Trees. The existing tower Problem is not edited unless a separately tested reciprocal link is necessary; its canonical identity and proof remain unchanged.

## Source Evidence and Page Freeze

The Green PDF is image-only for these pages; visual inspection covered PDF pages 21–31 to verify the full 2.2 boundary and the 2.3 transition. Binding 019 evidence is pages 21–26.

Stored page ranges are already correct:

- theory 21;
- river crossing 21;
- public-information puzzle 21–22;
- card invariant 22–23;
- rope timer 23;
- balance diagnosis 23–25;
- factorial zeros 25;
- batched races 25–26;
- power tower 26.

No page field may change. Tests compute the complete 750-row `{key, questionPages, solutionPages}` projection in master order and compare its SHA-256 with the pre-019 literal hash. An unrelated page mutation must fail even if the directory is regenerated.

## Hidden Data Flow

1. Publish and behaviorally test two Knowledge pages.
2. Publish and behaviorally test five Problems.
3. Register catalog orders, reciprocal graph, and exact 86/58 public contract.
4. Create an active 019 manifest with exact nine-key scope, public delta, source evidence, and no verification fields.
5. Update exactly nine Green coverage rows and nine mirrored master rows.
6. Add `topicOverrideReason` only to trailing zeros, horse race, and infinite sequence; mirror expanded canonical-topic paths in master.
7. Prove every master page range is unchanged through the full-projection hash.
8. Regenerate the Knowledge directory and write active HANDOFF.
9. Capture immutable active-state proof in Windows, fresh WSL native-LF Node 24, and GitHub Actions.
10. Remove the temporary workflow, verify the workflow-free active commit, record factual completion fields, regenerate directory/HANDOFF, and verify final closure.

## Lifecycle and Verification Evidence

### Active state

- Manifest `status` is `active`.
- `preClosureActiveGate`, `verification`, and `finalTreeGate` are absent.
- The named temporary workflow is the only temporary tracked artifact.
- One immutable active SHA passes the five ordered gates in Windows and fresh WSL Node 24, is pushed to the feature branch, and receives a matching successful GitHub Actions run.

### Completion state

- Temporary workflow removal is a dedicated commit.
- A fresh WSL proof validates the workflow-free active commit.
- Manifest becomes `complete` with exact active SHA, numeric run id, environment, ordered commands, successful conclusions, and temporary-artifact record.
- Final workflow-free Windows and WSL gates pass at the closure head.
- Local, tracking, and live remote feature refs agree before integration is offered.

Exact ordered commands:

1. `npm test`
2. `npm run knowledge:directory:check`
3. `npm run master:directory:check`
4. `npm run check`
5. `npm run build`

No evidence field may be prefilled, inferred, or copied from workstream 018.

## Behavioral Test Design

### Knowledge tests

- Exact frontmatter, heading order, graph intentions, workflow/check counts, and source neutrality.
- Every Interview Check must be a self-contained prompt with enough inputs to answer.
- Programmatically verify the two-color card invariant exercise and the 45-minute rope construction from stated assumptions.

### Bridge test

- Independently enumerate legal torch-side crossing states for times 1, 3, 6, 11.
- Compute the shortest path to all-across and require cost 21.
- Parse or pin the published schedule and verify every move is legal and totals 21.

### Public-announcement test

- Represent the exact candidate set as data.
- Apply each truthful knowledge statement as a set filter using the appropriate information partition.
- Require intermediate candidate sets and final singleton `C2`.

### Balance-diagnosis test

- Represent all 24 hypotheses.
- Execute the published adaptive weighing tree under every hypothesis.
- Require at most three weighings and a unique correct leaf for each hypothesis.
- Mutation tests must catch a wrong pan assignment, branch, or heavy/light conclusion.

### Factorial-zero test

- Independently compute prime valuations of `100!`.
- Require decimal result 24 and base-12 result 48.
- Verify the general formula on additional small `(n, base)` cases against direct BigInt representation.

### Batched-race test

- Model the partial order after five group races and the winners' race.
- Compute the exact surviving podium candidates.
- Verify the seventh race resolves the final order, every eliminated racer has a certificate showing at least three faster racers, and a six-race transcript still admits multiple podium orders.

### Hidden/lifecycle tests

- Exact manifest, keys, 5/3/1 state distribution, targets, notes, three overrides, and master/coverage consistency.
- Full pre-019 page-projection SHA with zero allowed changes.
- Exact 86/58, 248/502, Green 2.3 next, active/complete HANDOFF, temporary workflow rules, and no 020.

## Error and Regression Boundaries

Fail closed on:

- any missing, extra, reordered, or renamed scope key;
- a state split other than 5/3/1;
- an unapproved public target or topic override;
- any page-range change anywhere in the master directory;
- a wrapper duplicate for the power tower;
- a low-depth standalone page for the card or rope checks;
- a decision tree that misses or conflates a heavy/light state;
- a bridge schedule without optimality evidence;
- a public-announcement answer without intermediate candidate sets;
- a trailing-zero result without valuation derivation;
- a race strategy without a complete elimination certificate;
- source titles, item labels, pages, copied wording, or provenance in public content;
- stale 018-current wording, premature completion evidence, temporary workflow residue, or any 020 artifact;
- tracked PDFs, rendered pages, OCR files, guide, dependencies, or unrelated changes.

## Final State Contract

- Public corpus: exactly **86 Problems / 58 Knowledge**.
- 019 scope: exactly nine terminal Green records in a 5 `canonical-problem` / 3 `knowledge-only` / 1 `merged-duplicate` split.
- Master directory: exactly **248 terminal / 502 pending**.
- First pending record: exactly `green-book::2.3::theory`.
- Workstream 019: complete with factual active and final-tree evidence.
- Current bounded topic: none.
- Workstream 020: absent and unauthorized.
- Temporary workflow: absent.
- All 750 page-range projections: unchanged from pre-019.
- Source PDFs and interview guide: untracked and unmodified.

## Non-Goals

- Do not process Green 2.3, Red, or 150 Questions Logical Deduction rows.
- Do not claim the complete Logical Deduction topic or any book is complete.
- Do not publish card-pair or rope-timer standalone Problems.
- Do not create a second power-tower Problem or weaken its existing convergence proof.
- Do not modify taxonomy, source-topic map, dependencies, layouts, filters, or site design.
- Do not repair page ranges in 019.
- Do not start 020.

## Implementation Boundary

This design authorizes implementation planning for workstream 019 only after the committed written spec receives explicit user approval. The plan must use an isolated worktree, strict TDD, behavioral mathematical tests, task-level independent reviews, immutable active-state proof, one whole-branch final review, fresh final gates, and the standard three-option integration handoff.
