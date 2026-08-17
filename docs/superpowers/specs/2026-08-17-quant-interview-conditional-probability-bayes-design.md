# Quant Interview Conditional Probability & Bayes — Cross-Book Design Spec

Date: 2026-08-17
Status: approved design, pre-implementation
Workstream ID: `probability-statistics-conditional-probability-bayes-007`
Base branch: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`
Feature branch: `chatgpt/quant-interview-workstream-conditional-probability-bayes-2026-08-17`

## 1. Goal

Build the next bounded Topic-first cross-book workstream for:

- **Probability & Statistics**
- **Conditional Probability & Bayes**

All three verified interview sources are one internal evidence pool. Public Knowledge and Problems remain canonical and source-neutral. Book names, source item identifiers, physical PDF pages, semantic-dedup provenance, and any source-correction notes remain hidden audit data.

This workstream must reuse and expand the existing `conditioning` Knowledge node rather than creating a second conditioning concept.

## 2. Canonical topic boundary

Canonical topics:

```text
probability-statistics
└── conditional-probability-bayes
```

In scope:

- conditional probability `P(A|B)` as a changed probability space;
- multiplication / chain rule;
- partitions and the law of total probability;
- Bayes' rule;
- priors, likelihoods, evidence, posteriors, and posterior odds;
- base-rate effects and base-rate neglect;
- information / observation protocols that change the conditioning event;
- survival / selection conditioning;
- first-step conditioning only when conditioning is the primary reasoning identity rather than merely a tool inside a stochastic-process problem;
- source-derived interview tasks whose main mathematical identity is conditional probability, Bayes, or information conditioning.

Explicitly out of scope:

- full combinatorial counting, derangements, poker enumeration, and other tasks whose main identity is Combinatorial Probability;
- random-variable/distribution catalogues, transforms, convolutions, and joint-normal theory as a full topic;
- expectation/variance/covariance as a full topic;
- order statistics and ranking theory as a full topic;
- random walks, branching processes, Markov chains, martingales, Brownian motion, stochastic calculus;
- recurrence-only or dynamic-programming problems where conditioning is only a local computational device;
- biased-coin extraction algorithms whose primary identity is symmetry/algorithm design rather than inference.

The existing repository-authored `conditional-dice-expectation` Problem remains a separate cross-topic exercise. It must not be retroactively treated as source-derived evidence.

## 3. Source audit boundary

All source evidence in this section is internal only.

### 3.1 Green source

Primary reviewed section:

- `4.3 Conditional Probability and Bayes' formula`

Physical PDF review boundary begins at page 88 and continues through the end of the section on page 102.

Direct Knowledge material:

- definition of conditional probability;
- multiplication / chain rule;
- law of total probability;
- independence in the context of conditioning;
- Bayes' formula.

Direct candidate problem families retained for this workstream:

- `boys-and-girls`;
- `unfair-coin`;
- `monty-hall`;
- `candies-in-a-jar`;
- `russian-roulette-series`.

Reviewed items intentionally excluded from this bounded topic when their primary identity lies elsewhere:

- `all-girl-world` -> independence / population-policy intuition rather than Bayes;
- `fair-probability-from-unfair-coin` -> unbiased extraction / symmetry algorithm;
- `dart-game` -> ranking / order-statistic symmetry;
- `birthday-line` -> combinatorial/order-statistic optimization;
- `dice-order` -> combinatorial counting;
- `amoeba-population` -> branching process / stochastic processes;
- `coin-toss-game` -> recursive first-step stochastic reasoning;
- `aces` -> combinatorial allocation;
- `gambler's-ruin` -> random walk;
- `basketball-scores` -> reinforced stochastic process / induction;
- `cars-on-road` -> independent-increment / arrival-process modeling.

These exclusions are semantic, not editorial: presence inside Green section 4.3 does not force ownership by this canonical topic.

### 3.2 Red source

Reviewed container:

- `3.2.1 General`, with matching solution material in `3.3.1 General`.

Direct candidate items:

- Q3.10: one double-headed coin among ordinary coins, followed by observed heads;
- Q3.11: an ordinary-looking coin that keeps producing heads; prior distribution is required for a Bayesian answer;
- Q3.14-Q3.15: two-child conditional-information variants;
- Q3.17: Russian roulette after survival with neighboring bullets.

Key audit rule for Q3.15:

The public canonical treatment must not copy a source answer mechanically when the conditioning event is underspecified. Statements such as “at least one child is a girl,” “the eldest is a girl,” “you observe a randomly selected child and it is a girl,” and “the family has a girl with a particular name” are different observation protocols unless explicit modeling assumptions make them equivalent. The canonical page must state the information-generation mechanism before calculating.

Reviewed adjacent Red items remain for later topics when their primary identity is expectation, distribution theory, geometry, combinatorics, or stochastic processes.

### 3.3 150 Questions source

The coarse source containers require item-level review.

Direct candidate item:

- Brainteasers Q2: three two-sided pancakes/cards with face colors; after drawing one uniformly and observing a golden face, find the probability the unseen face is also golden.

This is a direct selection/conditioning problem because observing a face changes the posterior weighting of the latent object.

Boundary-review items not claimed here:

- Probability/Stochastic Calculus Q5: a joint-normal conditional probability problem. Its main difficulty is joint Gaussian structure and a normal-variable transformation, so it remains for `random-variables-distributions` rather than being absorbed merely because the final quantity is conditional.
- Brainteasers Q4: generating an equal-probability choice with a biased coin. Its primary identity is unbiased extraction / algorithmic symmetry, not Bayesian inference.
- other Probability/Stochastic Calculus items concerning distributions, moments, LLN/CLT, martingales, and stochastic calculus remain outside this workstream.

## 4. Public Knowledge design

### 4.1 Expand existing `conditioning`

Keep the existing slug and public identity. Expand it from a short problem-solving note into the canonical conditional-probability foundation.

Required responsibilities:

- `P(A|B) = P(A ∩ B) / P(B)` for `P(B)>0`;
- interpret conditioning as restricting/reweighting the sample space, not merely “putting a bar in the formula”;
- multiplication rule `P(A∩B)=P(B)P(A|B)`;
- chain rule for multiple events;
- law of total probability over a partition;
- conditional independence / ordinary independence boundary at an interview-ready level;
- distinguish conditioning on an event from conditioning on how an event was observed;
- explain first-step conditioning as a method without absorbing stochastic-process topics that have their own canonical owners.

Required public `Interview Checks`:

- compare “at least one child is a boy” with “a randomly observed child is a boy”;
- reconstruct an intersection probability from a conditional probability;
- use a partition to express a target event through total probability;
- identify when a stated observation protocol is insufficient to define a unique conditional probability;
- distinguish independence from “probability remains the same after conditioning.”

### 4.2 Create `bayes-rule-base-rates`

Primary responsibility:

- Bayes' rule from conditional probability + total probability;
- prior, likelihood, marginal evidence, posterior;
- posterior odds = prior odds × likelihood ratio;
- repeated independent evidence;
- base-rate neglect;
- why a posterior is not uniquely determined when the prior/model class is unspecified;
- hidden-source / latent-object inference after selection-biased evidence.

Required public `Interview Checks`:

- update the posterior probability of a double-headed coin after `n` observed heads;
- explain why many heads do not determine a unique posterior without a prior over possible coin types;
- compute a simple medical-test/base-rate example or equivalent source-neutral diagnostic example;
- explain the difference between `P(A|B)` and `P(B|A)`.

No source names or source question numbering may appear on the public page.

## 5. Canonical Problems

Create six genuinely distinct source-neutral canonical Problems.

### 5.1 `hidden-coin-posterior-after-heads`

Fuse the Green unfair-coin family with Red Q3.10 and use Red Q3.11 as a prior-modeling extension rather than a duplicate page.

Canonical form should teach the general mixture:

- prior probability `π` that the selected coin is double-headed;
- otherwise it is fair;
- observe `n` consecutive heads;
- posterior is

```text
π / (π + (1-π) 2^{-n}).
```

The page may include concrete numerical variants, but one mathematical family gets one public Problem.

### 5.2 `two-children-information-protocol`

Fuse the Green boys/girls task with Red Q3.14-Q3.15.

Required structure:

- explicitly state iid gender assumptions when used;
- compare at least two information protocols, e.g. “at least one is a boy” versus “a uniformly selected observed child is a boy”;
- show why the answers differ because the conditioning events differ;
- include a warning that named-child variants require an explicit name/observation model and must not be answered from wording alone.

This page is about conditioning and information generation, not a memorized `1/3` answer.

### 5.3 `monty-hall-switching`

Source family: Green Monty Hall.

Required reasoning:

- model the host policy explicitly;
- initial chosen door has probability `1/3` of the prize;
- the unchosen set has probability `2/3`;
- host reveals a known losing door without transferring probability mass to the original pick;
- switching wins with probability `2/3`.

The page must distinguish host-informed conditional revealing from a randomly opened door.

### 5.4 `russian-roulette-after-survival`

Fuse Green and Red survival-conditioning variants.

Canonical reasoning identity:

- infer the conditional distribution of the chamber state after a survived trigger pull;
- compare spinning again with continuing without a spin;
- make bullet placement assumptions explicit;
- use the neighboring/consecutive-bullets variant as the main nontrivial case.

One public page owns the family; source variants become hidden `variant` / `merged-duplicate` evidence as appropriate.

### 5.5 `candies-last-color-ordering`

Source family: Green candies-in-a-jar.

Required reasoning:

- translate the condition “all red candies are gone while blue and green remain” into an ordering statement about last occurrences;
- split into mutually exclusive last-color orderings;
- use conditional symmetry after fixing which color is last;
- retain the source-supported probability result while presenting a clean canonical derivation.

The page should make clear why direct hypergeometric enumeration is possible but less insightful than conditioning on last occurrences.

### 5.6 `golden-face-posterior`

Source family: 150 Brainteasers Q2.

Use a source-neutral object/face formulation rather than source naming.

Required reasoning:

- distinguish uniformly selecting an object from conditioning on a uniformly observed face;
- count/weight the visible golden faces that could have produced the observation;
- posterior probability that the unseen face is golden is `2/3` in the three-object setup;
- explicitly flag the selection-bias / size-bias intuition.

## 6. Deduplication decisions

Mandatory semantic merges:

- Green unfair coin + Red Q3.10 -> `hidden-coin-posterior-after-heads`;
- Red Q3.11 enriches `bayes-rule-base-rates` and the hidden-coin page but does not create a second posterior-coin Problem;
- Green boys/girls + Red Q3.14-Q3.15 -> `two-children-information-protocol`;
- Green/Red Russian roulette -> `russian-roulette-after-survival`.

Do not merge problems merely because they use the same formula. Monty Hall, two-child protocols, Russian roulette, hidden-coin inference, last-occurrence conditioning, and visible-face selection are different reasoning identities.

## 7. Hidden coverage rules

Every claimed source item must receive:

- a precise `sourceSection` + `sourceItem` key;
- canonical topic `conditional-probability-bayes` (plus parent topic only when consistent with the existing ledger convention);
- one terminal state among `canonical-problem`, `merged-duplicate`, `variant`, or `knowledge-only`;
- real canonical Knowledge/Problem targets;
- a nonempty `resolutionNote` explaining the semantic decision;
- `topicOverrideReason` whenever item-level mathematical ownership overrides a coarse source-topic container.

Low-complexity definitions or modeling checks may terminate as `knowledge-only` only when their interview test is visibly preserved in `Interview Checks`.

No generic deferred state may be used to avoid classifying a reviewed item. Out-of-scope items are documented in the workstream review note but are not falsely terminalized as this topic's coverage.

## 8. Source-neutral public contract

Public Problem/Knowledge content must not expose:

- book names;
- source question numbers;
- PDF page numbers;
- source-specific problem IDs;
- provenance-only notes;
- hidden coverage data.

Problem slugs, titles, descriptions, prose, and frontmatter must read as a canonical interview knowledge system rather than a three-book reproduction.

## 9. Testing and execution order

Use the same verified TDD workflow as the previous workstream:

1. register `probability-statistics-conditional-probability-bayes-007` with a failing workstream contract;
2. make registration green with a bounded source-scope record;
3. add Knowledge contracts for expanded `conditioning` and new `bayes-rule-base-rates`;
4. implement Knowledge and pass `test/check/build`;
5. add RED contracts for the six canonical Problems;
6. implement Problems and update the global source-neutral corpus regression;
7. add RED coverage contracts for all claimed item-level source rows;
8. reconcile Green, Red, and 150 hidden coverage ledgers;
9. add completion gates requiring `status: complete`, real CI evidence, terminal coverage, and updated `HANDOFF.md`;
10. run final `npm run test`, `npm run check`, `npm run build`;
11. review the topic-only diff against the completed Combinatorial Probability branch;
12. remove any branch-only temporary CI/mutation tooling before final handoff.

## 10. Completion criteria

The workstream is complete only when all of the following hold:

- the machine-readable workstream is `status: complete`;
- every claimed source item is terminal, explained, and resolves to real public targets;
- all required `knowledge-only` checks remain publicly visible;
- duplicate families are merged semantically rather than duplicated by source;
- the existing `conditioning` node is expanded rather than duplicated;
- six canonical Problems are solved, source-neutral, and S3+;
- `bayes-rule-base-rates` exists and covers priors/base rates/model ambiguity;
- the global source-neutral corpus regression includes the new content;
- `npm run test`, `npm run check`, and `npm run build` all succeed on a real GitHub Actions run;
- `docs/quant-interview/HANDOFF.md` records the seventh completed workstream and advances to **Random Variables & Distributions**;
- the final diff contains no unrelated website, Projects, UI, or other-topic changes.

Expected corpus transition if the six planned Problems and one new Knowledge node survive item-level semantic review unchanged:

- Problems: `30 -> 36`;
- explicitly topic-classified Knowledge/Technique nodes: `27 -> 28`.

These are planning expectations only, not a forced quota. Semantic deduplication and correct topic ownership override target counts.