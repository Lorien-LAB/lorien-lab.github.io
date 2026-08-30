# Quant Interview Problem Simplification 018 Design

**Date:** 2026-08-30
**Status:** Approved in conversation; pending implementation plan

## Objective

Close the complete cross-book **Problem Simplification** topic as workstream 018 while preserving the combined master-directory order. Publish only reusable, source-neutral interview material: two Knowledge nodes and five independently authored S3+ Problems. Resolve all eleven in-topic source records, repair two over-broad solution-page ranges, and advance the first pending master record from `green-book::2.1::theory` to `green-book::2.2::theory`.

## Binding Decisions

- Use one Topic-first cross-book workstream, not a Green-only batch.
- Own exactly the eleven current master records whose `primaryTopic` is `problem-simplification`.
- Publish exactly **+5 Problems / +2 Knowledge**.
- Resolve exactly five source records as `ingested` and six as `knowledge-only`.
- Treat Fermi estimation as reusable Knowledge and public self-tests only; do not publish a standalone Fermi Problem or any historical numeric answer.
- Keep low-complexity mental-arithmetic, exponential-backtracking, and round-cover prompts visible as Knowledge checks rather than inflating the Problem bank.
- Add item-level secondary topics only where the source item genuinely crosses into Dynamic Programming or Algorithmic Complexity, with explicit override reasons.
- Keep all public pages source-neutral and independently worded.
- Do not create, activate, authorize, or imply workstream 019.

## Current Repository State

- Base branch: `main`.
- Base commit at design approval: `11e491289fbd336d4070660822d13bf4456deab0`.
- Completed bounded workstream: `interview-strategy-communication-soft-interview-behavioral-evidence-017`.
- Public corpus: **76 Problems / 54 Knowledge**.
- Master directory: **228 terminal / 522 pending** records.
- First pending record: `green-book::2.1::theory`.
- No bounded workstream is active.
- The three user-supplied PDFs in `docs/书籍/` and `docs/量化实习_LeetCode与编程笔试面试备考指南.md` are untracked source inputs and must remain untracked and unmodified.

## Alternatives Considered

### Selected: complete cross-book topic closure

Resolve the three Green Book records, four Red Book records, and four 150 Questions records together. This follows the existing Topic-first architecture, exposes semantic duplicates before publication, and leaves no same-topic records pending after closure.

### Rejected: Green Book 2.1 only

This would preserve literal source order at the expense of the canonical-topic contract. The same topic would remain open in two other books, making duplicate Knowledge and Problem identities more likely.

### Rejected: one public Problem per source prompt

This would turn elementary mental arithmetic, a one-step growth observation, two dated Fermi examples, and a one-paragraph shape explanation into low-value Problem pages. It would conflict with the established S3+ publication threshold and the user's interview-relevance preference.

## Workstream Identity and Architecture

- Workstream id: `logic-brainteasers-discrete-reasoning-problem-simplification-018`.
- Primary canonical topic: `problem-simplification`.
- Parent topic: `logic-brainteasers-discrete-reasoning`.
- Source pool: Green Book, Red Book, and 150 Questions.
- Scope cardinality: exactly eleven master keys in existing master order.
- Public delta: exactly five Problems and two Knowledge nodes.
- Candidate branch: `codex/quant-interview-problem-simplification-018`.
- Temporary CI path: `.github/workflows/quant-interview-problem-simplification-018-temporary.yml`.

The public layer contains canonical Knowledge and Problems only. Source titles, item identifiers, evidence pages, mapping decisions, workstream lifecycle, and verification evidence remain in hidden repository data and internal documentation. The existing taxonomy and source-topic map remain structurally unchanged; cross-topic item refinements live in the item-level coverage rows and their mirrored master records.

## Exact Source Scope and Dispositions

| Master key | Evidence | State | Canonical Problems | Canonical Knowledge |
|---|---:|---|---|---|
| `green-book::2.1::theory` | Q 19 | `knowledge-only` | None | `small-cases-recurrence-and-structural-simplification` |
| `green-book::2.1.screwy-pirates::question` | Q 19–20 | `ingested` | `sequential-voting-elimination-backward-induction` | `small-cases-recurrence-and-structural-simplification`, `recursion-problem-solving` |
| `green-book::2.1.tiger-and-sheep::question` | Q 20–21 | `ingested` | `predator-replacement-parity` | `small-cases-recurrence-and-structural-simplification` |
| `red-book::8::8.2` | Q 288; S 291–292 | `knowledge-only` | None | `small-cases-recurrence-and-structural-simplification` |
| `red-book::8::8.5` | Q 288; S 293 | `knowledge-only` | None | `small-cases-recurrence-and-structural-simplification` |
| `red-book::8::8.25` | Q 290; S 307 | `knowledge-only` | None | `fermi-estimation-assumption-decomposition` |
| `red-book::8::8.26` | Q 290; S 308 | `knowledge-only` | None | `fermi-estimation-assumption-decomposition` |
| `150-most-frequently-asked::2.7::8` | Q 45; S 182–185 | `ingested` | `two-egg-threshold-search` | `small-cases-recurrence-and-structural-simplification`, `recursion-problem-solving` |
| `150-most-frequently-asked::2.7::16` | Q 46; S 192–194 | `ingested` | `large-power-digit-count-without-log-tables` | `small-cases-recurrence-and-structural-simplification` |
| `150-most-frequently-asked::2.7::23` | Q 48; S 199–201 | `ingested` | `minimum-comparisons-for-both-extremes` | `small-cases-recurrence-and-structural-simplification` |
| `150-most-frequently-asked::2.7::30` | Q 49; S 215 | `knowledge-only` | None | `small-cases-recurrence-and-structural-simplification` |

No other master or coverage record may be claimed, terminalized, page-repaired, or assigned to workstream 018.

## Public Knowledge Design

### `small-cases-recurrence-and-structural-simplification`

**Title:** Small Cases, Recurrence & Structural Simplification

**Classification:**

- `quantInterviewTopics`: `logic-brainteasers-discrete-reasoning`, `problem-simplification`
- primary topic: `problem-simplification`
- learning order: 10
- status: `published`

**Required public structure:**

1. Explain why the smallest *valid* instance is useful and why relaxing a rule can solve the wrong problem.
2. Give a seven-step workflow: preserve rules, select base cases, solve them completely, increase size one step, record state transitions, state a conjecture, and prove/translate it back.
3. Distinguish four simplification modes: size reduction, backward induction, state compression, and algebraic or geometric re-expression.
4. Explain base cases, recurrence validity, induction, tie-breaking, adversarial preferences, resource bounds, and worst-case versus average-case reasoning.
5. Show how a pattern discovered from small cases becomes a proof rather than an extrapolation.
6. Include recognition signals, common mistakes, and at least eight Interview Checks.
7. Include source-neutral checks for mental cubing by decomposition, backing up from a known exponential endpoint, and explaining a shape through invariant width and non-fall-through behavior.
8. Do not reproduce any source narrative, named source object, or supplied source answer wording.

### `fermi-estimation-assumption-decomposition`

**Title:** Fermi Estimation & Assumption Decomposition

**Classification:**

- `quantInterviewTopics`: `logic-brainteasers-discrete-reasoning`, `problem-simplification`
- primary topic: `problem-simplification`
- learning order: 20
- status: `published`

**Required public structure:**

1. Define the target quantity, unit, time horizon, and geographic or operational boundary.
2. Decompose the estimate into auditable multiplicative factors such as population, participation, usage frequency, service capacity, and utilization.
3. Use low/base/high ranges rather than unsupported precision.
4. Check dimensional consistency and distinguish stock quantities from flow quantities.
5. Rank assumptions by sensitivity and explain which observation would reduce uncertainty most.
6. Build an independent second estimate and reconcile disagreement instead of averaging blindly.
7. End with a validation plan using current authoritative or first-party data.
8. Include at least six Interview Checks, including one location-count estimate and one specialized-provider estimate, without naming the source-era country, city, service, or numeric answer.
9. Explicitly reject memorized market-size answers and false precision.

## Public Problem Design

Every Problem is independently authored, source-neutral, renderer-safe, and at least S3 in the repository's interview-depth rubric. Each page includes Problem, Think Before Revealing, progressive hints, a full solution, Why This Problem Matters, Common Mistakes, and Extensions.

### 1. `sequential-voting-elimination-backward-induction`

- Problem id: `logic-problem-simplification-001`.
- Title: **Sequential Voting Under Elimination**.
- Primary topic: `problem-simplification`.
- Canonical Knowledge: `small-cases-recurrence-and-structural-simplification`, `recursion-problem-solving`.
- Required model: five ranked agents allocate 100 identical units; the proposer votes; at least half of current agents must approve; rejection removes the proposer; preferences are lexicographic in survival, units, and then fewer surviving rivals.
- Required result: derive every one- through five-agent state and the five-agent allocation by backward induction. State exactly how a different tie threshold or preference order changes the recurrence.
- The public wording must not use the source title or copy its narrative.

### 2. `predator-replacement-parity`

- Problem id: `logic-problem-simplification-002`.
- Title: **Predator Replacement Parity**.
- Primary topic: `problem-simplification`.
- Canonical Knowledge: `small-cases-recurrence-and-structural-simplification`.
- Required model: one vulnerable animal and `n` rational predators; only one predator may act at a time; a predator that consumes it becomes vulnerable; survival is the first priority and, conditional on equal survival, consuming is preferred to abstaining.
- Required result: prove from base cases and induction that the initial vulnerable animal is consumed exactly when `n` is odd; specialize to `n = 100`.
- Make the simultaneous-action and indifference assumptions explicit enough that the conclusion is well-defined.

### 3. `two-egg-threshold-search`

- Problem id: `logic-problem-simplification-003`.
- Title: **Two-Resource Threshold Search**.
- Topics: `problem-simplification`, `dynamic-programming-algorithms`.
- Canonical Knowledge: `small-cases-recurrence-and-structural-simplification`, `recursion-problem-solving`.
- Required model: a deterministic unknown threshold among 100 ordered levels; a tested object survives at or below the threshold and is destroyed above it; exactly two identical objects are available; minimize the worst-case number of tests.
- Required result: derive `h_2(d) = d(d+1)/2`, prove `h_2(13) < 100 <= h_2(14)`, and give the decreasing-step testing schedule that attains the 14-drop worst-case bound.
- Include the general state recurrence `h_e(d) = 1 + h_(e-1)(d-1) + h_e(d-1)` with correct boundary conditions.
- The item-level topic override must explain that the minimax state recurrence is genuine Dynamic Programming rather than a cosmetic tag.

### 4. `large-power-digit-count-without-log-tables`

- Problem id: `logic-problem-simplification-004`.
- Title: **Digit Count of a Large Power Without Log Tables**.
- Primary topic: `problem-simplification`.
- Required result: prove that `125^100` has exactly 210 decimal digits without using tabulated logarithms or direct expansion.
- The proof must rewrite the expression through powers of 10 and 2, establish `1 < 1.024^30 < 10` rigorously, and derive `10^209 < 125^100 < 10^210`.
- Any binomial or geometric bound used must state its valid range and direction.

### 5. `minimum-comparisons-for-both-extremes`

- Problem id: `logic-problem-simplification-005`.
- Title: **Minimum Comparisons for Both Extremes**.
- Topics: `problem-simplification`, `algorithmic-complexity`.
- Canonical Knowledge: `small-cases-recurrence-and-structural-simplification`.
- Required result: give the pairwise partition algorithm for even and odd `n`, derive `ceil(3n/2) - 2` comparisons, and prove this count is optimal with an adversary or comparison-certificate lower bound.
- The item-level topic override must explain that both the algorithm and the lower bound are Algorithmic Complexity content.

## Public Graph and Catalog Registration

Register both new Knowledge nodes in `knowledge-catalog.json` under `problem-simplification` at learning orders 10 and 20. The exact public graph is:

- Small Cases relates to `recursion-problem-solving`, `problem-framing-clarification-assumption-management`, and `fermi-estimation-assumption-decomposition`.
- Fermi Estimation relates to `small-cases-recurrence-and-structural-simplification` and `problem-framing-clarification-assumption-management`.
- `recursion-problem-solving` gains the reciprocal Small Cases link.
- `problem-framing-clarification-assumption-management` gains reciprocal links to both new nodes.

All five new Problems link to the new Small Cases node. The two-resource threshold Problem also links to `recursion-problem-solving`. No unrelated existing page may be edited.

## Source Evidence and Page Repairs

The source audit visually inspected the image-only PDF pages because text extraction returned empty pages. Binding source evidence is:

- Green Book: pages 19–21 for the theory and two worked prompts.
- Red Book: questions on pages 288 and 290; solutions on 291–293 and 307–308.
- 150 Questions: questions on pages 45, 46, 48, and 49; solutions on 182–185, 192–194, 199–201, and 215–216.

Only two stored page fields are over-broad and may change:

1. `red-book::8::8.25` solution pages: `307–308` becomes `307` because page 308 starts the next item's solution.
2. `150-most-frequently-asked::2.7::30` solution pages: `215–216` becomes `215` because page 216 starts the next item.

Tests must freeze all other pre-018 question and solution ranges byte-for-byte or by exact deep equality.

## Hidden Data Flow

1. Create public content and focused content tests without touching hidden source state.
2. Register the two Knowledge nodes, exact reciprocal links, five Problems, and the expected 81/56 public corpus contract.
3. Create the active 018 manifest with exact identity, eleven ordered keys, source scopes, expected public delta, and no verification fields.
4. Update the three coverage ledgers and mirrored master records in the same key order.
5. Add explicit item-level override reasons for 150 Q8 and Q23; do not change the source-topic map.
6. Apply only the two approved solution-page repairs.
7. Regenerate `docs/quant-interview/KNOWLEDGE_DIRECTORY.md` from the hidden state.
8. Write an active-018 HANDOFF section and current-state marker; keep 019 unauthorized.
9. Capture immutable active-state evidence, remove the temporary workflow, and write factual completion fields.
10. Regenerate the directory and write completed-018 HANDOFF state.

Coverage and master records must remain exact mirrors for state, canonical targets, workstream id, resolution note, and item-level topic reasoning.

## Lifecycle and Verification Evidence

The lifecycle follows the established evidence-safe pattern:

### Active state

- `status` is `active`.
- The manifest has no `preClosureActiveGate`, `verification`, or `finalTreeGate` fields.
- The temporary CI workflow is the only permitted temporary artifact.
- Windows and fresh WSL Node 24 native-LF environments run the five ordered gates.
- The feature branch is pushed and GitHub Actions runs the same gates at one immutable active SHA.

### Completion state

- The temporary workflow is removed in a dedicated commit.
- A fresh WSL native-LF proof verifies the workflow-free active commit.
- The manifest becomes `complete` and records the exact active SHA, numeric CI run id, environment, commands, conclusions, and temporary-artifact path.
- A final workflow-free Windows and WSL run verifies the closure tree.
- Local, tracking, and remote feature refs must agree before integration is offered.

The exact ordered commands are:

1. `npm test`
2. `npm run knowledge:directory:check`
3. `npm run master:directory:check`
4. `npm run check`
5. `npm run build`

No verification record may be invented, prefilled, or copied from another workstream.

## Test Design

### Content tests

- Assert exact frontmatter, slugs, ids, topics, relationships, and publication state for all seven new pages.
- Assert the two Knowledge frameworks, required workflows, recognition signals, common mistakes, and minimum Interview Check counts.
- Assert the Fermi page contains no named source-era location, service, historical total, or pseudo-precise prescribed answer.
- Assert every Problem has progressive hints, a complete solution, Why This Problem Matters, Common Mistakes, and Extensions.
- Assert exact mathematical contracts: 14 drops, 210 digits, `ceil(3n/2) - 2`, the odd/even predator result, and the five-agent backward-induction allocation.
- Assert source neutrality across all seven pages and ensure no source-derived Problem is below S3.

### Catalog and graph tests

- Assert exact 81 Problems / 56 Knowledge.
- Assert learning orders 10 and 20 under `problem-simplification`.
- Assert the exact reciprocal Knowledge graph and Problem-to-Knowledge links.
- Reject missing classified pages, duplicate slugs/orders, or extra reciprocal edits.

### Workstream tests

- Assert the exact ordered eleven-key manifest scope.
- Assert source distribution 3/4/4 and state distribution 5 `ingested` / 6 `knowledge-only`.
- Assert every coverage row and master record are exact mirrors.
- Assert the two item-level cross-topic overrides and their reasons.
- Assert no source-topic-map change.
- Assert only the two approved page fields changed from the base fixture.
- Assert all eleven rows are terminal, have distinct resolution notes, and resolve to real canonical targets.

### Repository and lifecycle tests

- Assert exact 81/56 public counts and 239/511 master counts.
- Assert first pending is `green-book::2.2::theory`.
- Assert active state is evidence-free and complete state is factually strict.
- Assert current HANDOFF and generated directory are phase-aware.
- Assert workstream 019 is absent and no bounded topic is active after closure.
- Assert the temporary workflow is absent from the final tree.

## Error and Regression Boundaries

The implementation must fail closed on:

- missing, extra, reordered, or renamed scope keys;
- a state split other than 5/6;
- a public target not listed in the exact disposition table;
- a coverage/master mismatch;
- a cross-topic assignment without an explicit item-level reason;
- any page repair outside the two approved solution fields;
- copied source wording, source identity, evidence pages, named brands, or historical Fermi values in public content;
- a Problem that states a result without the required derivation or lower-bound argument;
- stale 017-current or active-018 wording after closure;
- completion metadata before real active-gate evidence exists;
- a surviving temporary workflow or any 019 artifact;
- tracked source PDFs, rendered source pages, OCR output, or the untracked interview guide.

## Final State Contract

After factual closure:

- Public corpus: exactly **81 Problems / 56 Knowledge**.
- Workstream 018 source rows: exactly eleven terminal records.
- Master directory: exactly **239 terminal / 511 pending**.
- First pending master record: exactly `green-book::2.2::theory`.
- Workstream 018: `complete` with real active SHA, CI run id, and final-tree evidence.
- Current bounded topic: none.
- Workstream 019: absent and unauthorized.
- Temporary workflow: absent.
- Source PDFs and interview guide: untracked and unmodified.

## Non-Goals

- Do not process Green Book 2.2 or any later master record.
- Do not claim completion of the entire Logic, Brainteasers & Discrete Reasoning topic or any source book.
- Do not publish source navigation, source answers, page citations, or provenance.
- Do not create a standalone Fermi Problem.
- Do not add a general game-theory taxonomy node or refactor the taxonomy.
- Do not redesign the public site, layouts, or filtering UI.
- Do not update unrelated dependencies, warnings, hints, or existing content.

## Implementation Boundary

This design authorizes a later implementation plan for workstream 018 only after the committed spec receives explicit user review approval. The implementation plan must use TDD, isolated worktree execution, task-level reviews, immutable active-state verification, final whole-branch review, and the standard three-option integration handoff.
