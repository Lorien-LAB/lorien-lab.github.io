# Quant Interview Probability Foundations — Cross-Book Design Spec

Date: 2026-08-17
Status: approved design, pre-implementation
Workstream ID: `probability-statistics-probability-foundations-005`
Base branch: `chatgpt/quant-interview-topic-first-fusion-design-2026-08-16`
Feature branch: `chatgpt/quant-interview-workstream-probability-foundations-2026-08-17`

## 1. Goal

Build the next bounded Topic-first cross-book workstream for:

- **Probability & Statistics**
- **Probability Foundations**

The public result must fuse the three verified interview sources into one canonical probability-foundations layer without exposing book-first provenance. The workstream uses the explicitly approved **Source + narrow canonical extension** model:

1. source-derived material is represented only when the verified sources actually support it;
2. repository-authored canonical extensions are declared separately in the machine-readable workstream record;
3. canonical extensions never create fabricated source-coverage rows;
4. public Knowledge and Problems remain source-neutral.

This is a bounded workstream. It must not silently expand into later Probability & Statistics subtopics.

## 2. Canonical topic boundary

Canonical topics:

```text
probability-statistics
└── probability-foundations
```

In scope:

- outcomes, sample spaces, events, and event algebra;
- probability axioms and elementary derived event rules;
- complements, unions, intersections, and mutually exclusive events;
- the minimal definition of independence needed to distinguish it from mutual exclusivity;
- finite equiprobable probability models;
- symmetry as a probability-solving principle;
- continuous uniform geometric probability in one or two dimensions;
- complement-event reasoning for repeated independent trials;
- source-derived interview problems whose primary reasoning identity is one of the above.

Explicitly out of scope:

- combinatorial counting as a full toolkit, permutations, combinations, poker-hand enumeration, inclusion-exclusion beyond the two-event event rule;
- conditional probability, Bayes' theorem, law of total probability, law of total expectation;
- random-variable distribution catalogues, PDFs/CDFs as a full topic, transformations, convolutions;
- expectation, variance, covariance as a full topic;
- order statistics and extremes;
- law of large numbers and central limit theorem;
- random walks, Markov chains, martingales, Brownian motion, stochastic calculus;
- tournament counting or other problems whose principal identity belongs to Combinatorial Probability.

The existing `conditioning` Knowledge remains owned by `conditional-probability-bayes` and must not be duplicated or broadened into this workstream.

## 3. Source audit and evidence boundary

All source evidence described in this section is internal audit material. None of it may be exposed on public Problem/Knowledge pages.

### 3.1 Green source

Direct source section:

- `4.1 Basic Probability Definitions and Set Operations`

Verified source material inspected for this workstream includes:

- outcome;
- sample space / probability space;
- probability of an outcome and event;
- event as a subset of the sample space;
- union, intersection, complement;
- mutually exclusive events;
- finite additivity for mutually exclusive events;
- random variable definition and an indicator-variable example;
- a fair-die illustration of sample space and event operations;
- `Coin toss game`;
- `Card game`;
- `Drunk passenger`;
- `N points on a circle`.

The Green source explicitly supports the event/set language and the four interview tasks above. It does **not** provide a full Kolmogorov-axiom treatment, so the canonical axiom layer below is a repository-authored extension.

The indicator identity `E[I_A] = P(A)` may be mentioned only as a bridge. This workstream does not expand into expectation theory.

### 3.2 Red source

Reviewed container:

- `3.2.1 General`

Direct in-scope items identified during item-level review:

- Q3.16: fourth business day / equiprobable weekday modeling;
- Q3.18: two-card rank comparison;
- Q3.24: Romeo and Juliet meeting-time geometry;
- Q3.25: displaced / drunk passenger.

The source chapter is a coarse editorial container. Item-level semantic classification controls workstream ownership.

Reviewed but intentionally left for later canonical topics include, among others:

- Q3.19 tournament-final structure -> Combinatorial Probability;
- Q3.20 socks -> primarily counting/combinatorial probability;
- Q3.21 cards with and without replacement -> independence / conditional-probability boundary and later workstreams;
- expectation questions, distributions, order statistics, CLT, covariance, and stochastic-process questions -> later canonical topics.

The workstream source audit must preserve this boundary without creating fake terminal coverage rows for deferred topics.

### 3.3 150 Questions source

Direct in-scope source items identified:

- First Look Q6: minimum number of independent `U[0,1]` samples required so that at least one lands in `[0.70, 0.72]` with probability at least 95%;
- Brainteasers Q3: Alice tosses `n+1` fair coins, Bob tosses `n`; probability Alice has strictly more heads.

The First Look Q6 solution uses the complement event:

```text
P(at least one hit) = 1 - 0.98^N
```

and yields the smallest integer `N = 149`.

The Brainteasers Q3 solution confirms the same reasoning identity as Green's `Coin toss game`. It gives both:

- a symmetry argument based on Alice necessarily having more heads or more tails than Bob after one extra toss; and
- the equal-`n` decomposition `2p + q = 1`, followed by the final extra coin, yielding `p + q/2 = 1/2`.

This must be merged into one canonical Problem, not duplicated.

The formal `Probability, stochastic calculus` section was also inspected at the workstream boundary. Its first questions concern exponential/Poisson distributions, expectations, joint-normal probability, LLN/CLT, and then stochastic calculus. Those items are not to be reclassified into Probability Foundations merely because the source chapter title contains “Probability.”

## 4. Approved canonical extensions

The workstream declares exactly these repository-authored extensions:

```json
[
  "kolmogorov-probability-axioms",
  "derived-event-probability-rules",
  "mutual-exclusivity-vs-independence"
]
```

These declarations are internal provenance/audit metadata only.

### 4.1 Kolmogorov probability axioms

The public Knowledge layer may state the standard probability-measure axioms in a concise interview-ready form:

1. `P(A) >= 0` for every event `A`;
2. `P(Omega) = 1`;
3. for pairwise disjoint events `A_1, A_2, ...`,
   `P(union_i A_i) = sum_i P(A_i)`.

This is a canonical extension because the Green source gives elementary finite probability rules but does not present the full axiomatic formulation.

### 4.2 Derived event rules

Allowed derived rules include:

- `P(emptyset) = 0`;
- `P(A^c) = 1 - P(A)`;
- monotonicity: `A subseteq B => P(A) <= P(B)`;
- two-event addition rule:
  `P(A union B) = P(A) + P(B) - P(A intersection B)`;
- elementary De Morgan relationships needed to manipulate complements.

Do not broaden this into the general inclusion-exclusion theorem; that belongs to later combinatorial probability.

### 4.3 Mutual exclusivity versus independence

The public Knowledge must state the distinction explicitly:

- mutually exclusive: `A intersection B = emptyset`;
- independent: `P(A intersection B) = P(A)P(B)`.

If `A` and `B` are mutually exclusive and both have positive probability, then they are **not** independent because

```text
P(A intersection B) = 0 != P(A)P(B).
```

Only degenerate zero-probability cases can satisfy both properties simultaneously.

This distinction is intentionally bounded. Conditional probability formulas and Bayes are not introduced here.

## 5. Canonical public Knowledge

Create three public Knowledge nodes.

### 5.1 `probability-spaces-events`

Primary responsibility:

- outcome;
- sample space;
- event;
- event probability;
- union, intersection, complement;
- mutually exclusive events;
- indicator variables as event encodings;
- simple die/coin examples;
- recognition of event-algebra manipulations in interviews.

Source support:

- primarily Green 4.1.

Required public `Interview Checks` should include at least:

- translate a verbal event into a subset of a sample space;
- express “neither A nor B” using complements and set operations;
- explain why mutually exclusive events add directly;
- identify whether a stated event identity is a De Morgan transformation.

The page may mention `E[I_A] = P(A)` only as a bridge and must not teach expectation theory.

### 5.2 `probability-axioms-derived-rules`

Primary responsibility:

- the three probability axioms;
- complement rule;
- monotonicity;
- two-event addition rule;
- elementary De Morgan manipulation;
- the precise distinction between mutual exclusivity and independence.

Source/extension boundary:

- the elementary event language is source-compatible;
- the formal axiomatic organization and the explicit exclusivity-vs-independence treatment are canonical extensions.

Required `Interview Checks` should include:

- derive `P(A^c) = 1 - P(A)` from disjoint additivity;
- derive the two-event addition formula;
- explain why two positive-probability mutually exclusive events cannot be independent;
- give a degenerate case where mutual exclusivity and independence can coexist.

### 5.3 `symmetry-equiprobability-geometric-probability`

Primary responsibility:

- finite equiprobable models: favorable outcomes / total outcomes when equiprobability is justified;
- symmetry under relabeling or exchangeability;
- partitioning into tie/non-tie or terminal symmetric cases;
- continuous uniform geometry: length/area ratios under a uniform model;
- complement regions as a geometric simplification;
- modeling assumptions before calculation.

Required `Interview Checks` should include:

- Red Q3.16-style weekday modeling as a short self-test rather than a separate canonical Problem;
- identify when symmetry alone is enough and when a tie case must be removed first;
- explain why “uniform in a disk” means area-uniform, not radius-uniform;
- translate two independent uniform arrival times into a point in a square.

This page must not become a combinatorics chapter.

## 6. Canonical public Problems

Create exactly six new canonical Problems for this workstream.

### 6.1 `more-heads-with-one-extra-coin`

Source fusion:

- Green `Coin toss game`;
- 150 Brainteasers Q3.

Canonical reasoning identity:

Alice flips `n+1` fair coins and Bob flips `n` fair coins. Find the probability Alice gets strictly more heads.

Required solution structure:

- compare Alice’s first `n` coins with Bob’s `n` coins;
- let `p` be the probability Alice has more heads after `n` flips, `q` the tie probability;
- symmetry gives Bob-more-heads probability `p`, hence `2p + q = 1`;
- Alice wins after the extra coin with probability `p + q/2 = 1/2`;
- include the alternative symmetry interpretation from the second source without creating a duplicate page.

Answer: `1/2`.

### 6.2 `higher-card-by-symmetry`

Source fusion:

- Green `Card game`;
- Red Q3.18.

Canonical reasoning identity:

Two cards are drawn without replacement from a standard deck; compare ranks only. Find the probability the first player's rank is strictly larger.

Required solution structure:

- isolate the tie event first;
- after the first card, exactly three of the remaining 51 cards share its rank, so `P(tie)=3/51`;
- conditioned on different ranks, first-higher and second-higher are symmetric;
- probability first card is higher is `(1 - 3/51)/2 = 24/51 = 8/17`.

The Green and Red source versions are one canonical family.

### 6.3 `drunk-passenger-last-seat`

Source fusion:

- Green `Drunk passenger`;
- Red Q3.25.

Canonical reasoning identity:

The first passenger selects a random seat; each subsequent passenger takes their assigned seat if free and otherwise a random free seat. Find the probability the last passenger gets the assigned last seat.

Required solution structure:

- explain the absorbing role of seat 1 and the last passenger’s seat;
- intermediate displaced-seat choices reproduce the same smaller state;
- the eventual decisive choice is symmetric between those two special seats;
- probability of the last passenger getting the correct seat is `1/2`.

Do not make a second page for the wording difference between “drunk passenger” and “Grandma.”

### 6.4 `random-points-in-a-semicircle`

Source:

- Green `N points on a circle`.

Canonical reasoning identity:

Choose `N` independent uniform points on a circle. Find the probability all points lie in some semicircle.

Required solution structure:

- for each point `i`, define the event that the clockwise semicircle beginning at `i` contains all other points;
- each event has probability `(1/2)^(N-1)`;
- with probability one for continuously sampled distinct points, these candidate-start events are mutually exclusive when all points fit in a semicircle;
- sum the `N` disjoint events to obtain
  `N / 2^(N-1)`;
- retain the source-supported extension for an arc occupying fraction `x <= 1/2` of the circumference:
  `N x^(N-1)`.

Any endpoint/zero-probability degeneracy should be handled explicitly but concisely.

### 6.5 `minimum-trials-for-at-least-one-hit`

Source:

- 150 First Look Q6.

Canonical reasoning identity:

Generate independent `U[0,1]` variables. Find the minimum number needed so that the probability at least one lies in `[0.70,0.72]` is at least 95%.

Required solution structure:

- single-trial miss probability is `0.98`;
- by independence, all-miss probability is `0.98^N`;
- complement gives `1 - 0.98^N >= 0.95`;
- solve using logs;
- minimum integer is `N=149`;
- explain why independence is doing multiplicative work while the complement event avoids a long union calculation.

### 6.6 `romeo-juliet-meeting-probability`

Source:

- Red Q3.24.

Canonical reasoning identity:

Two people arrive independently and uniformly during a one-hour interval and each waits 15 minutes. Find the probability they meet.

Required solution structure:

- normalize arrival times to independent `x,y ~ U[0,1]`;
- meeting event is `|x-y| <= 1/4`;
- represent `(x,y)` as a uniform point in the unit square;
- complement consists of two congruent right triangles with side length `3/4`;
- complement area is `9/16`;
- meeting probability is `1 - 9/16 = 7/16`.

Include a short generalization to waiting fraction `w in [0,1]` only if it remains clearly subordinate to the canonical solution.

## 7. Source-item semantic decisions

The workstream's hidden item-level decisions must converge to the following identities.

### 7.1 Green

- `4.1::definitions-set-operations`
  - state: `knowledge-only`
  - Knowledge: `probability-spaces-events`
- `4.1::coin-toss-game`
  - state: `canonical-problem`
  - Problem: `more-heads-with-one-extra-coin`
  - Knowledge: `symmetry-equiprobability-geometric-probability`
- `4.1::card-game`
  - state: `canonical-problem`
  - Problem: `higher-card-by-symmetry`
  - Knowledge: `symmetry-equiprobability-geometric-probability`
- `4.1::drunk-passenger`
  - state: `canonical-problem`
  - Problem: `drunk-passenger-last-seat`
  - Knowledge: `symmetry-equiprobability-geometric-probability`
- `4.1::n-points-on-a-circle`
  - state: `canonical-problem`
  - Problem: `random-points-in-a-semicircle`
  - Knowledge: `probability-spaces-events`, `symmetry-equiprobability-geometric-probability`

### 7.2 Red

- `3.2.1::3.16`
  - state: `knowledge-only`
  - Knowledge: `symmetry-equiprobability-geometric-probability`
- `3.2.1::3.18`
  - state: `merged-duplicate`
  - Problem: `higher-card-by-symmetry`
  - Knowledge: `symmetry-equiprobability-geometric-probability`
- `3.2.1::3.24`
  - state: `canonical-problem`
  - Problem: `romeo-juliet-meeting-probability`
  - Knowledge: `symmetry-equiprobability-geometric-probability`
- `3.2.1::3.25`
  - state: `merged-duplicate`
  - Problem: `drunk-passenger-last-seat`
  - Knowledge: `symmetry-equiprobability-geometric-probability`

The Red source scope must additionally record that the broader General container was reviewed and that adjacent probability questions were intentionally left for later canonical topics. They do not receive fabricated Foundations rows.

### 7.3 150 Questions

- `1::6`
  - state: `canonical-problem`
  - Problem: `minimum-trials-for-at-least-one-hit`
  - Knowledge: `probability-axioms-derived-rules`
- `2.7::3`
  - state: `merged-duplicate`
  - Problem: `more-heads-with-one-extra-coin`
  - Knowledge: `symmetry-equiprobability-geometric-probability`
  - requires an item-level topic override because the source TOC maps `2.7` to the broad brainteaser/logical area while this specific item's mathematical identity is Probability Foundations.

The override must include a nonempty `topicOverrideReason` explaining that item-level mathematical identity takes precedence over the editorial source container.

## 8. Coverage-state policy for reviewed-but-out-of-scope material

Do **not** add a new `deferred-to-topic` coverage state in this workstream.

Reason:

- the current validator has a stable state model;
- adding a generic deferred state would turn a content workstream into a coverage-infrastructure redesign;
- a broad deferred state could become an escape hatch that lets future workstreams avoid real semantic closure.

Instead:

- `sourceScopes` in the workstream record documents the coarse source areas actually reviewed;
- `reviewOutcome` / `reviewNote`-style audit metadata records which adjacent categories were inspected and intentionally left for later bounded topics;
- item-level coverage rows are created only for material genuinely claimed by Probability Foundations.

This preserves auditability without falsely closing later topics.

## 9. Workstream record

Create:

`src/data/quant-interview/workstreams/probability-statistics-probability-foundations-005.json`

Required top-level structure:

```json
{
  "id": "probability-statistics-probability-foundations-005",
  "canonicalTopics": [
    "probability-statistics",
    "probability-foundations"
  ],
  "canonicalExtensions": [
    "kolmogorov-probability-axioms",
    "derived-event-probability-rules",
    "mutual-exclusivity-vs-independence"
  ],
  "status": "active",
  "sourceScopes": [
    {"source": "green-book"},
    {"source": "red-book"},
    {"source": "150-most-frequently-asked"}
  ]
}
```

Exact evidence ranges and review notes must be filled from verified source inspection at implementation time. No placeholder values may remain in a completed workstream.

The record must eventually store real verification evidence only after the content-complete commit and successful fresh CI run exist.

## 10. Public/source boundary invariants

The following are non-negotiable:

- public Problem frontmatter contains no source book, chapter, question number, page number, or provenance field;
- public prose does not say “in Green,” “in Red,” “Question 3.18,” “First Look Q6,” or equivalent source-shaped language;
- public `problemId` values are canonical and source-neutral;
- hidden coverage may retain exact source provenance;
- `canonicalExtensions` never becomes a public rendering dependency;
- canonical extensions never appear as fake source-derived coverage targets merely to justify their existence;
- one mathematical identity has one public canonical Problem;
- useful alternative derivations become methods/variants within that canonical page.

## 11. Mathematical reconciliation rules

### 11.1 Mutual exclusivity is not independence

Do not write or imply that disjoint positive-probability events are independent.

### 11.2 Equiprobability must be justified

Do not use “favorable / total” unless the elementary outcomes are actually equiprobable under the model.

### 11.3 Continuous uniformity is measure-based

For a uniform point in a region, probability is proportional to the appropriate geometric measure. In a disk this is area, not radius. In a unit square it is area.

### 11.4 Symmetry follows the state partition

When a tie state exists, remove or account for it before asserting a 50/50 comparison. This is essential for the card problem.

### 11.5 The semicircle events require continuous-sampling care

The `N / 2^(N-1)` argument should note that endpoint coincidences / duplicated sample points have probability zero under the continuous model. The mutually-exclusive candidate-start argument is valid almost surely.

## 12. Testing strategy

Implementation follows strict RED -> GREEN TDD.

### 12.1 Registration RED

Test that:

- the new workstream record exists;
- it is bounded to `probability-statistics` / `probability-foundations`;
- all three verified sources are represented in `sourceScopes`;
- `canonicalExtensions` is exactly the approved three-item list;
- malformed extension declarations are rejected by the existing validator contract.

### 12.2 Inventory RED

Require explicit inventory for the approved in-scope source items:

- five Green semantic units;
- four Red items;
- two 150 items.

Require the 150 Brainteasers item-level topic override and reason.

### 12.3 Semantic RED

Require exact cross-book dedup identities:

- Green coin toss + 150 Brainteasers Q3 -> one canonical Problem;
- Green card + Red Q3.18 -> one canonical Problem;
- Green drunk passenger + Red Q3.25 -> one canonical Problem.

### 12.4 Knowledge-first RED -> GREEN

Create and validate:

- `probability-spaces-events`;
- `probability-axioms-derived-rules`;
- `symmetry-equiprobability-geometric-probability`.

Each must have visible `Interview Checks`.

### 12.5 Problem RED -> GREEN

Create and validate exactly:

- `more-heads-with-one-extra-coin`;
- `higher-card-by-symmetry`;
- `drunk-passenger-last-seat`;
- `random-points-in-a-semicircle`;
- `minimum-trials-for-at-least-one-hit`;
- `romeo-juliet-meeting-probability`.

Each must meet the repository's current S3+ source-neutral Problem contract.

### 12.6 Boundary regression

Tests must ensure that this workstream does not absorb:

- Bayes;
- law of total probability;
- law of total expectation;
- distribution catalogue content;
- expectation/variance theory;
- general combinatorial counting;
- LLN/CLT;
- stochastic-process material.

`conditioning` must remain assigned to `conditional-probability-bayes`.

### 12.7 Canonical-extension provenance firewall

Tests must ensure:

- public pages/layouts do not depend on `canonicalExtensions` or the workstream JSON;
- repository-authored extension Knowledge is not fabricated as source-derived ledger content;
- extension declarations stay audit-only.

### 12.8 Completion RED

Before `status` may switch to `complete`:

- every genuinely inventoried Foundations source row is terminal;
- all Problem/Knowledge references resolve to real slugs;
- all `knowledge-only` items have visible public self-tests;
- cross-book duplicates resolve to one canonical identity;
- all item-level topic overrides have explicit reasons;
- no unresolved canonical references remain;
- the source boundary audit records reviewed adjacent material without falsely closing later topics.

## 13. Verification and completion evidence

The workstream is not complete until a fresh run succeeds on:

```bash
npm run test
npm run check
npm run build
```

Verification evidence written to the machine-readable workstream must use:

- the actual content-complete commit SHA;
- the actual GitHub Actions run ID;
- the exact commands above;
- conclusion `success`.

Do not pre-populate future SHAs or run IDs.

After content completion:

1. review the topic-only diff against the integration branch;
2. update `docs/quant-interview/HANDOFF.md`;
3. record current corpus counts;
4. state explicitly that counts are repository-record counts, not whole-book completeness percentages;
5. advance the next bounded workstream to **Probability & Statistics -> Combinatorial Probability**.

Expected public source-neutral regression counts after this workstream, if no unrelated corpus changes occur during implementation:

- canonical Problems: `18 -> 24`;
- explicitly topic-classified Knowledge / Technique nodes: `21 -> 24`.

These expected counts are implementation assertions, not source-completeness claims.

## 14. Definition of done

This workstream is done only when all of the following are true:

- the three approved Knowledge nodes exist and are mathematically correct;
- the six approved canonical Problems exist and are S3+;
- the three cross-book duplicate families have one public identity each;
- all approved in-scope source items have terminal hidden coverage;
- source-derived and canonical-extension provenance remain separate;
- public content is source-neutral;
- the Probability Foundations boundary is not broadened into later subtopics;
- fresh `test`, `check`, and `build` pass;
- topic-only diff review is clean;
- Handoff is updated with real verification evidence and the next bounded topic.
