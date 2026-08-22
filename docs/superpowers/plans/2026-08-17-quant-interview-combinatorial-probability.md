# Quant Interview Combinatorial Probability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the bounded `Probability & Statistics → Combinatorial Probability` cross-book workstream by reconciling all three verified interview sources into reusable counting Knowledge and six source-neutral canonical Problems, while excluding adjacent conditional-probability, expectation, stochastic-process, and pure discrete-math material.

**Architecture:** Preserve the existing Topic-first public model. Source books, item numbers, evidence pages, topic overrides, and semantic-dedup decisions stay in workstream/coverage data only. Public Knowledge is written first; low-complexity source checks are preserved as `Interview Checks`, and only mathematically distinct S3+ tasks become canonical Problems.

**Tech Stack:** Astro content collections, Markdown/YAML frontmatter, JSON source/workstream/coverage data, JavaScript ES modules, Node.js built-in test runner, GitHub Actions, npm.

## Global Constraints

- Base branch: `chatgpt/quant-interview-workstream-probability-foundations-2026-08-17`.
- Work branch: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`.
- Workstream id: `probability-statistics-combinatorial-probability-006`.
- Canonical topics: `probability-statistics`, `combinatorial-probability`.
- Green reviewed source scope: section `4.2`, physical evidence PDF pages `80-88`.
- Green direct in-scope semantic units: counting/permutation/combination definitions, `poker-hands`, `chess-tournament`, `application-letters`, `birthday-problem`.
- Green reviewed but out-of-scope items: `hopping-rabbit` (recurrence/discrete counting), `screwy-pirates-2` (combinatorial design), `100th-digit` (algebra/binomial expansion), `cubic-of-integer` (modular/digit arithmetic). Record these exclusions in the workstream review note; do not falsely close them as Combinatorial Probability coverage.
- Red reviewed source scope: `3.2.1`, question evidence pages `95-96` and solution evidence pages `112-119`.
- Red direct in-scope items: `3.19` (knockout tournament), `3.20` (matching socks), `3.21` (two aces with/without replacement).
- Red Q3.19 merges with Green `chess-tournament` into one canonical Problem.
- Red Q3.20 and Q3.21 are `knowledge-only` and must remain publicly testable through `Interview Checks` rather than low-value standalone Problems.
- 150 Questions reviewed source scope: section `2.7`, question evidence pages `40-44` and solution evidence pages `177-190`.
- 150 direct in-scope items: `2.7::7` (no consecutive heads) and `2.7::14` (random subset containment).
- Both 150 items require explicit item-level topic overrides because the editorial `2.7` container is a brainteaser/discrete-reasoning section while their mathematical identity is Combinatorial Probability.
- Formal 150 Probability/Stochastic Calculus material remains outside this workstream; prior audit found it dominated by distributions, moments, LLN/CLT, and stochastic calculus.
- Do not absorb Conditional Probability & Bayes, random-variable catalogues, expectation/variance theory, order statistics, random walks, Markov chains, martingales, or stochastic calculus.
- Do not expose source provenance in public frontmatter, prose, routes, or `problemId` values.
- Semantic deduplication is by mathematical reasoning identity, not wording similarity.
- Every claimed source item must end in a terminal coverage state with nonempty `resolutionNote` and real canonical targets.
- Every `knowledge-only` source row must remain visible through `## Interview Checks`.
- Every canonical Problem is S3+: Problem, progressive hints, full solution, why it matters, common mistakes, extensions/variants.
- Verification gates: `npm run test`, `npm run check`, `npm run build`, then topic-only diff review.

## Canonical Outputs

### Knowledge

1. `counting-permutations-combinations`
   - product rule, factorials, permutations, combinations, binomial coefficients, ordered versus unordered modeling.
2. `finite-combinatorial-probability-modeling`
   - probability as favorable/total only for justified equiprobable finite spaces; sampling with/without replacement; complement counting; random partitions.
   - Interview Checks preserve Red Q3.20 socks and Q3.21 two-aces tasks.
3. `inclusion-exclusion-derangements`
   - finite inclusion-exclusion, fixed-point complements, derangements, `!n = n! sum_{k=0}^n (-1)^k/k!`, with the five-letter case as motivating application.

### Problems

1. `poker-hand-probabilities` — `combinatorial-probability-001`
2. `top-two-meet-in-knockout-final` — `combinatorial-probability-002`
3. `five-letters-all-misaddressed` — `combinatorial-probability-003`
4. `birthday-collision-threshold` — `combinatorial-probability-004`
5. `no-consecutive-heads-in-n-tosses` — `combinatorial-probability-005`
6. `random-subsets-containment-probability` — `combinatorial-probability-006`

All six use:

```yaml
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
quantInterviewTopics: [probability-statistics, combinatorial-probability]
techniques: []
prerequisites: []
relatedProblems: []
status: solved
featured: false
```

Every body contains, in order:

```text
## Problem
## Think Before Revealing
<details><summary>Hint 1</summary></details>
<details><summary>Hint 2</summary></details>
<details><summary>Show Solution</summary>
## Solution
## Why This Problem Matters
## Common Mistakes
## Extensions & Variants
</details>
```

## Source Inventory and Semantic Decisions

### Green Book

- `4.2::definitions-counting-principles` → `knowledge-only` → `counting-permutations-combinations`, `finite-combinatorial-probability-modeling`.
- `4.2::poker-hands` → `canonical-problem` → `poker-hand-probabilities`.
- `4.2::chess-tournament` → `canonical-problem` → `top-two-meet-in-knockout-final`.
- `4.2::application-letters` → `canonical-problem` → `five-letters-all-misaddressed`; also supports `inclusion-exclusion-derangements`.
- `4.2::birthday-problem` → `canonical-problem` → `birthday-collision-threshold`; also supports finite complement counting.

### Red Book

- `3.2.1::3.19` → `merged-duplicate` → `top-two-meet-in-knockout-final`.
- `3.2.1::3.20` → `knowledge-only` → `finite-combinatorial-probability-modeling`.
- `3.2.1::3.21` → `knowledge-only` → `finite-combinatorial-probability-modeling`, `counting-permutations-combinations`.

### 150 Questions

- `2.7::7` → `canonical-problem` → `no-consecutive-heads-in-n-tosses` with item-level topic override.
- `2.7::14` → `canonical-problem` → `random-subsets-containment-probability` with item-level topic override.

## Mathematical Contracts

- Poker hands: total `C(52,5)`; four of a kind `13*48`; full house `13*C(4,3)*12*C(4,2)`; exactly two pairs `C(13,2)*C(4,2)^2*11*4`.
- Knockout tournament with `N=2^n` ranked players: fix player 1; player 2 is uniformly among `N-1` remaining bracket positions; exactly `N/2` positions are in the opposite half; final-meeting probability `N/(2(N-1))`.
- Five letters: derangements `!5=44`, total `5!=120`, probability `44/120=11/30`.
- Birthday threshold: `P(no collision)=prod_{k=0}^{n-1}(365-k)/365`; smallest `n` with collision probability greater than `1/2` is `23`.
- No consecutive heads: valid length-`n` binary strings obey `a_n=a_{n-1}+a_{n-2}`, `a_0=1`, `a_1=2`, hence `a_n=F_{n+2}` and probability `F_{n+2}/2^n`.
- Random subsets: each element has four equiprobable membership states `(0,0),(0,1),(1,0),(1,1)` for `(A,B)`; containment forbids only `(1,0)`, so probability `(3/4)^n`.

## Tasks

### Task 1: Register the bounded workstream

**Create:**
- `.github/workflows/quant-interview-combinatorial-probability-ci.yml` (temporary branch-only CI)
- `tests/quant-interview-combinatorial-probability-workstream.test.mjs`
- `src/data/quant-interview/workstreams/probability-statistics-combinatorial-probability-006.json`

- [ ] Add branch-only CI running `npm ci`, `npm run test`, `npm run check`, `npm run build`.
- [ ] Verify unchanged branch baseline is green.
- [ ] Add RED registration test asserting id, topics, all three source scopes, bounded review notes, and existing workstream validator acceptance.
- [ ] Verify RED because workstream JSON is absent.
- [ ] Add active workstream JSON with the exact evidence ranges and exclusion notes above.
- [ ] Verify registration test and full suite GREEN.

### Task 2: Build Knowledge first

**Create:**
- `tests/quant-interview-combinatorial-probability-content.test.mjs`
- `src/content/knowledge/concepts/counting-permutations-combinations.md`
- `src/content/knowledge/concepts/finite-combinatorial-probability-modeling.md`
- `src/content/knowledge/concepts/inclusion-exclusion-derangements.md`

- [ ] Add RED tests for topic frontmatter, required formulas, `## Interview Checks`, and boundary exclusions.
- [ ] Create `counting-permutations-combinations` and verify GREEN.
- [ ] Extend RED for finite combinatorial modeling, including matching-socks and two-aces self-tests; create node and verify GREEN.
- [ ] Extend RED for inclusion-exclusion/derangements; create node and verify GREEN.
- [ ] Run test/check/build Knowledge-first checkpoint.

### Task 3: Create the first four Green-derived Problem families

**Create:** four Problems `001` through `004` listed above.

- [ ] Add RED source-neutral Problem contracts for all four slugs and their mathematical identities.
- [ ] Create each S3+ Problem with independent prose and exact formulas above.
- [ ] Verify content tests and full test suite GREEN.

### Task 4: Create the two 150-derived Problem families

**Create:** Problems `005` and `006`.

- [ ] Add RED contracts for recurrence/Fibonacci and subset-containment identities.
- [ ] Create both S3+ Problems.
- [ ] Verify content tests and full suite GREEN.

### Task 5: Reconcile hidden coverage and semantic deduplication

**Modify:**
- `src/data/quant-interview/coverage/green-book.json`
- `src/data/quant-interview/coverage/red-book.json`
- `src/data/quant-interview/coverage/150-most-frequently-asked.json`
- `tests/quant-interview-combinatorial-probability-workstream.test.mjs`

- [ ] Add RED inventory tests for exactly the 10 claimed source rows.
- [ ] Add RED assertions for Green/Red tournament semantic merge and both 150 topic overrides.
- [ ] Add/resolve Green five rows, Red three rows, 150 two rows to the semantic decisions above.
- [ ] Every row gets nonempty `resolutionNote`; `knowledge-only` rows target real Knowledge slugs.
- [ ] Validate every ledger with `allowUnresolvedCanonicalRefs: false`.

### Task 6: Source-neutral regression, handoff, and completion

**Modify:**
- `tests/quant-interview-source-neutral-content.test.mjs`
- `tests/quant-interview-handoff.test.mjs`
- `docs/quant-interview/HANDOFF.md`
- workstream JSON status/verification after successful CI.

- [ ] Extend source-neutral regression to new Problems/Knowledge without exposing provenance.
- [ ] Add completion invariant test: all 10 claimed rows terminal, workstream status `complete`, low-complexity Red tasks visible through Interview Checks.
- [ ] Run `npm run test`, `npm run check`, `npm run build` through branch CI.
- [ ] Review diff against the Probability Foundations base branch.
- [ ] Record real successful commit/run evidence in workstream/HANDOFF.
- [ ] Remove temporary branch-only CI and ensure ordinary project verification remains green.

## Self-Review

- The scope is one canonical topic only.
- Green 4.2 is not blindly treated as homogeneous; four non-probability/discrete items are explicitly excluded from Combinatorial Probability coverage.
- Red broad General probability material is refined item-by-item.
- 150 Brainteasers receive item-level topic overrides only where mathematical identity requires it.
- No low-value Problem inflation: Red socks and two-aces stay as visible Knowledge self-tests.
- One cross-book duplicate family is merged: Green tournament + Red Q3.19.
- No source provenance leaks into public content.
- All proposed canonical slugs and mathematical outputs are fixed; no TODO/TBD placeholders remain.
