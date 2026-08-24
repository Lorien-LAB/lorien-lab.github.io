# Quant Interview — Current Handoff

Updated: 2026-08-23

## Current architecture state

**Stage A — Topic-first foundation: complete and integrated.**  
**Stage B — public Topic-first shell: complete and integrated.**  
**Stage C — existing-content source-neutral migration: complete and integrated.**  
**Stage D — bounded cross-book topic ingestion: active as the durable workflow; four Linear Algebra workstreams and six Probability & Statistics workstreams are now complete.**

The public system is Topic-first. Canonical Topics, Knowledge, techniques, and Problems are user-facing. Book identity, source item ids, page evidence, semantic-dedup provenance, and canonical-extension audit metadata remain internal.

## Stable architecture and invariants

- Public navigation is **Topic-first**; books are internal evidence sources, never public categories.
- Canonical public Problems remain **source-neutral** in frontmatter, prose, routes, titles, and `problemId` values.
- `src/data/quant-interview/topics/taxonomy.json` defines the canonical topic taxonomy.
- `src/data/quant-interview/topics/source-topic-map.json` routes verified source structure into canonical topics.
- `src/data/quant-interview/workstreams/*.json` registers one bounded cross-book topic at a time.
- `src/data/quant-interview/coverage/*.json` is the **hidden coverage** and semantic-dedup ledger.
- Every claimed source item receives an **item-level** coverage decision and a nonempty resolution note before its workstream closes.
- `knowledge-only` is terminal only when the interview test remains publicly visible through `Interview Checks` or an equivalent self-test.
- Repository-authored **canonical extension** material is declared separately and never fabricated as **source-derived** provenance.
- Semantic identity controls deduplication. `merged-duplicate` and `variant` evidence enrich a canonical Problem rather than creating source-specific public duplicates.
- No source PDF/scan or copied answer key is committed to the public repository.
- No whole-book completeness percentage is inferred from bounded workstreams.

## Completed cross-book workstream 1

`linear-algebra-covariance-correlation-psd-001`

Scope: **Linear Algebra & Matrix Methods → Covariance & Correlation Matrices / Positive Semidefinite Matrices**.

Verification:

- commit `fb8664b85ac1ea6a0d1d5145ce32143e0455a288`
- GitHub Actions run `31946376343`
- `npm run test`, `npm run check`, `npm run build`
- conclusion: success

Canonical outputs include:

- `correlation-matrix`
- `positive-semidefinite-matrix`
- `principal-minor-feasibility`
- `correlation-matrix-parameter-range`
- `covariance-matrix-positive-semidefinite-proof`
- `covariance-to-correlation-matrix`
- `equicorrelation-matrix-bounds`

The parameterized correlation family is one canonical Problem; source variants are hidden evidence rather than duplicate pages.

## Completed cross-book workstream 2

`linear-algebra-determinants-eigenvalues-002`

Verification:

- commit `b070f6f9c318372dfcf0d942f3a67299a8e4a493`
- GitHub Actions run `31948322741`
- `npm run test`, `npm run check`, `npm run build`
- conclusion: success

Canonical Knowledge / Problems include:

- `eigenvalues-eigenvectors`
- `matrix-spectral-invariants`
- `eigenbasis-decomposition`
- `two-by-two-eigensystem`
- `apply-matrix-via-eigenbasis`
- `trace-ab-equals-trace-ba`
- `commutator-cannot-equal-identity`

Definitions and reusable spectral facts are `knowledge-only` where appropriate and remain publicly testable.

## Completed cross-book workstream 3

`linear-algebra-matrix-decompositions-003`

Verification:

- commit `970d2a1d82d9e54a2881411a424e3313bfd16b58`
- GitHub Actions run `31952974738`
- `npm run test`, `npm run check`, `npm run build`
- conclusion: success

Canonical outputs include:

- `qr-decomposition`
- `lu-cholesky-decomposition`
- `singular-value-decomposition`
- enriched `eigenbasis-decomposition`
- `least-squares-via-qr`
- `matrix-square-root-and-cholesky-factor`
- `generate-correlated-gaussians`

The directly related matrix-square-root tasks resolve to one canonical Problem; the secondary form is retained as a meaningful variant.

## Completed cross-book workstream 4

`linear-algebra-vectors-linear-systems-004`

Verification:

- commit `d9bed1bb89de8ce81ae89971ce3fd31fdbe49343`
- GitHub Actions run `31962131820`
- `npm run test`, `npm run check`, `npm run build`
- conclusion: success

Canonical outputs include:

- `vector-geometry-inner-products`
- `linear-independence-span-basis-rank`
- `linear-systems-consistency`
- `product-of-row-stochastic-matrices`
- `rank-and-consistency-of-linear-system`

The taxonomy has **five child topics** under Linear Algebra & Matrix Methods, and **all five** now have bounded cross-book canonical coverage through workstreams 1–4. This is not a whole-book completeness claim.

## Completed cross-book workstream 5

`probability-statistics-probability-foundations-005`

Scope: **Probability & Statistics → Probability Foundations**.

Verification:

- commit `a35de3269d3d8ecb3e9c9227e52e4203797f556b`
- GitHub Actions run `31992298949`
- `npm run test`, `npm run check`, `npm run build`
- conclusion: success

The machine-readable workstream is `status: complete` with the same real verification evidence.

Canonical extension audit boundary:

- `kolmogorov-probability-axioms`
- `derived-event-probability-rules`
- `mutual-exclusivity-vs-independence`

Canonical Knowledge / Problems include:

- `probability-spaces-events`
- `probability-axioms-derived-rules`
- `symmetry-equiprobability-geometric-probability`
- `more-heads-with-one-extra-coin`
- `higher-card-by-symmetry`
- `drunk-passenger-last-seat`
- `random-points-in-a-semicircle`
- `minimum-trials-for-at-least-one-hit`
- `romeo-juliet-meeting-probability`

The extra-coin, rank-comparison, and displaced-passenger duplicate families each resolve to **one canonical Problem**; secondary rows are `merged-duplicate`. All eleven claimed Foundations source rows are terminal with real canonical targets.

Historical corpus checkpoint after the earlier migration/foundations phase: **24 canonical Problems** and **24 explicitly topic-classified Knowledge / Technique nodes**. This number is retained only as repository lineage.

## Completed cross-book workstream 6

`probability-statistics-combinatorial-probability-006`

Scope: **Probability & Statistics → Combinatorial Probability**.

Verification:

- commit `cfb9609a36d281cb8da5906f9e0781c224cf3850`
- GitHub Actions run `32002926175`
- `npm run test`, `npm run check`, `npm run build`
- conclusion: success

Canonical Knowledge:

- `counting-permutations-combinations`
- `finite-combinatorial-probability-modeling`
- `inclusion-exclusion-derangements`

Canonical Problems:

- `poker-hand-probabilities`
- `top-two-meet-in-knockout-final`
- `five-letters-all-misaddressed`
- `birthday-collision-threshold`
- `no-consecutive-heads-in-n-tosses`
- `random-subsets-containment-probability`

Exactly **10 claimed source rows** are terminal for this workstream. Green/Red tournament material resolves to the same canonical Problem; the Red instance is `merged-duplicate`. Low-complexity Red counting items remain visible through Knowledge `Interview Checks`. The 150 Brainteaser items use explicit item-level topic overrides where their mathematical identity is Combinatorial Probability.

Historical corpus checkpoint after workstream 6: **30 canonical Problems** and **27 explicitly topic-classified Knowledge / Technique nodes**.

## Completed cross-book workstream 7

`probability-statistics-conditional-probability-bayes-007`

Scope: **Probability & Statistics → Conditional Probability & Bayes**.

Content-complete verification:

- commit `2247fa3f48c83c102b23878eb520819d8c033b1e`
- GitHub Actions run `32012105975`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

The machine-readable workstream is `status: complete` and stores exactly this real verification evidence.

### Canonical Knowledge

- expanded `conditioning` — conditional probability, multiplication/chain rules, partitions, law of total probability, independence boundary, observation/information protocols, and first-step conditioning as a method;
- new `bayes-rule-base-rates` — priors, likelihoods, evidence, posterior, posterior odds, likelihood ratios, base-rate effects, missing-prior/model ambiguity, and latent-object reweighting.

The existing `conditioning` node was reused and expanded rather than duplicated.

### Canonical Problems

- `hidden-coin-posterior-after-heads`
- `two-children-information-protocol`
- `monty-hall-switching`
- `russian-roulette-after-survival`
- `candies-last-color-ordering`
- `golden-face-posterior`

All six are independently authored, source-neutral, solved, and S3+.

### Cross-book semantic decisions

- The hidden double-headed-coin family resolves to `hidden-coin-posterior-after-heads`; the secondary source instance is `merged-duplicate`.
- The repeated-heads / unspecified-coin item is `knowledge-only`: it tests the fact that a Bayesian posterior is not uniquely determined without a prior/model class.
- The two-child family resolves to `two-children-information-protocol`. The named-child variant is kept as a `variant`; its hidden resolution note explicitly records that the answer depends on the observation/naming **protocol**, and the ambiguous source shortcut is not copied blindly.
- The adjacent-bullet roulette family resolves to `russian-roulette-after-survival`; the secondary source form is `merged-duplicate`.
- The visible-golden-face item is an explicit **item-level topic override** from a broad brainteaser container and resolves to `golden-face-posterior`.

Exactly **12 claimed terminal source rows** are closed for this workstream: 6 Green, 5 Red, and 1 from the 150-question source. Every claimed row has a nonempty resolution note and resolves to real canonical Knowledge or Problem targets.

Boundary-reviewed material remains correctly outside this workstream. In particular, the **joint-normal** conditional-probability task remained for Random Variables & Distributions because its core reasoning load is joint Gaussian structure; branching-process, random-walk, order-statistic, distribution, expectation/variance, and stochastic-calculus material was not falsely absorbed into Conditional Probability & Bayes.

Historical corpus checkpoint after workstream 7: **36 canonical Problems** and **28 explicitly topic-classified Knowledge / Technique nodes**.

## Completed cross-book workstream 8

`probability-statistics-random-variables-distributions-008`

Scope: **Probability & Statistics → Random Variables & Distributions**.

Content-complete verification:

- commit `a1865622bd6411ea89a87c30b4f631665b776f58`
- GitHub Actions run `32102546083`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

The machine-readable workstream is `status: complete` and stores exactly this real verification evidence.

### Canonical Knowledge

- `random-variables-cdf-pmf-pdf` — support, CDF, PMF, PDF, discrete/continuous distinctions, point-mass boundaries, and CDF-first reasoning.
- `common-probability-distributions` — recognition-first treatment of Uniform, Binomial, Poisson, Geometric, Negative Binomial, Normal, Exponential, Gamma, Beta, and Cauchy.
- `random-variable-transformations-convolution` — distribution pushforwards, inverse Jacobians, many-to-one branches, and support-aware convolution.
- `gaussian-lognormal-structure` — affine Gaussian closure, joint normality, zero-covariance independence inside the Gaussian class, and lognormal structure.
- `limit-theorems-lln-clt` — Weak/Strong LLN, convergence modes, classical CLT, `sqrt(n)` scaling, and finite-variance boundaries.

All five are source-neutral canonical Knowledge nodes with public `Interview Checks` for terminal `knowledge-only` source material.

### Canonical Problems

- `exponential-race-probability`
- `exponential-memoryless-bus-wait`
- `density-under-random-variable-transform`
- `sum-of-two-uniforms-triangular-density`
- `joint-normal-quadrant-conditioning`
- `when-is-a-product-lognormal`

All six are independently authored, source-neutral, solved, and S3+.

### Cross-book semantic decisions and boundaries

Exactly **14 terminal claimed source rows** are closed for this workstream: 2 Green, 5 Red, and 7 from the 150-question source. Every claimed row has a nonempty resolution note and resolves to real canonical Knowledge or Problem targets.

- The bus/arrival wrapper resolves to `exponential-memoryless-bus-wait` only for **Exponential memorylessness, residual waiting time, and stationary age intuition**. General Poisson-process theory remains outside this workstream and is not inferred from the wrapper.
- Independent-exponential competition resolves to `exponential-race-probability`, generalized to the rate-share identity rather than preserving one numerical source instance.
- Random-variable transformation and independent-sum convolution remain distinct reasoning families: `density-under-random-variable-transform` and `sum-of-two-uniforms-triangular-density`.
- The jointly normal conditional-probability item now resolves to `joint-normal-quadrant-conditioning`; its solution explicitly uses joint normality before concluding that zero covariance implies independence.
- Lognormal-product closure resolves to `when-is-a-product-lognormal`; independent lognormals are only a sufficient special case, while joint normality of the log variables is the more general sufficient condition.
- LLN and CLT are fused into one reusable `limit-theorems-lln-clt` Knowledge node rather than duplicated across sources or inflated into standalone Problems.
- **Order statistics** material remains outside this topic for **Order Statistics & Extremes**.
- **Normal moments and expectation-heavy Gaussian calculations** remain outside this topic for **Expectation, Variance & Covariance**.
- Meeting-time and broken-stick geometry remain under their actual geometric-probability identity instead of being reclassified merely because they appeared inside a distributions chapter.

Historical corpus checkpoint after workstream 8: **42 canonical Problems** and **33 explicitly topic-classified Knowledge / Technique nodes**. This checkpoint is retained for repository lineage only.

## Completed cross-book workstream 9

`probability-statistics-expectation-variance-covariance-009`

Scope: **Probability & Statistics → Expectation, Variance & Covariance**.

Content-complete verification:

- commit `19064a55b4bbc6b7136b0494b0002e6c1113ca70`
- GitHub Actions run `32509048173`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

The machine-readable workstream is `status: complete` and stores exactly this real verification evidence.

### Canonical Knowledge

- `expectation-linearity-indicators` — discrete/continuous expectation, LOTUS, linearity without independence, product factorization under independence, indicator variables, expected counts, and expectation-existence checks.
- `conditional-expectation-tower-property` — conditional expectation on events/partitions/random variables, law of total expectation, tower property, and elementary first-step expectation recursion.
- `expectation-variance-covariance-algebra` — scalar variance/covariance identities, bilinearity, variance of linear combinations, independence-versus-uncorrelated boundaries, and scalar correlation.
- `moments-moment-generating-functions` — raw/central moments, MGF derivatives, existence conditions, and Gaussian moment calculation.

The existing `conditional-dice-expectation` repository-authored Problem remains source-neutral and now links into the tower-property layer; it is not fabricated as source-derived coverage.

### Canonical Problems

- `expected-pattern-count-by-indicators`
- `expected-position-of-first-special-card`
- `coupon-collector-expectations`
- `recursive-dice-game-expected-payoff`
- `expected-loops-from-random-pairings`
- `geometric-waiting-time-mean-variance`
- `normal-mgf-and-moments`
- `expected-normal-cdf-of-normal-variable`
- `optimal-hedge-ratio-by-variance-minimization`
- `bernoulli-default-correlation-bounds`
- `expected-radius-of-uniform-disk-point`
- `fair-box-opening-price-by-expectation`
- `multiplicative-wealth-expected-growth`

All thirteen new Problems are independently authored, source-neutral, solved, and S3+.

### Cross-book semantic decisions and boundaries

Exactly **18 terminal claimed source rows** are closed for this workstream: 8 Green, 8 Red, and 2 from the 150-question source. The state distribution is 13 `canonical-problem`, 2 `knowledge-only`, 2 `variant`, and 1 `merged-duplicate`. Every claimed row has a nonempty resolution note and resolves to real canonical Knowledge or Problem targets.

- Indicator reasoning remains split by mathematical identity: overlapping pattern counts test linearity without independence; first-special position tests random-permutation symmetry; coupon distinct counts test presence indicators.
- Conditional expectation and the **tower property** own one-step/fixed-point expectation reasoning, while state-rich Markov recursions, martingales, and optional stopping remain stochastic-process material.
- Scalar variance/covariance algebra owns the hedge-ratio and Bernoulli default-feasibility applications. Covariance/correlation matrices and PSD feasibility remain Linear Algebra ownership.
- The disk-radius family is one canonical expectation Problem; the unit-disk form is a `merged-duplicate` of the radius-`R` version.
- The general Normal `E[Phi(X)]` identity owns one canonical Problem; the standard-Normal form is a meaningful `variant` and alternative symmetry/PIT perspective.
- General Normal MGF/moments and the standard-Normal moment calculation are fused into one canonical Problem plus one reusable Knowledge node.
- The apparent stopping decision in the fair-box game collapses once starting is worthwhile; genuine finite-horizon reroll optimization remains Dynamic Programming / Optimal Stopping.
- **Order statistics and expected extrema**, including Random Ants, remain outside this bounded topic for **Order Statistics & Extremes**.
- Green's simplex `sum-of-random-variables` probability remains geometric-probability material rather than being misclassified as expectation solely by editorial placement.

Historical corpus checkpoint after workstream 9: **55 canonical Problems** and **37 explicitly topic-classified Knowledge / Technique nodes**. This checkpoint is retained for repository lineage only.

## Completed cross-book workstream 10

`probability-statistics-order-statistics-extremes-010`

Scope: **Probability & Statistics → Order Statistics & Extremes**.

Content-complete verification:

- commit `2a7c7c7e245e9d6c4959640394e28eb0d2f2edf5`
- GitHub Actions run `32633618700`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

The machine-readable workstream is `status: complete` and stores exactly this real verification evidence.

### Canonical Knowledge

- `order-statistics-basics` — minimum/maximum CDFs, kth-order CDF/PDF, Uniform/Beta representation, expected Uniform order statistics, and scope boundaries.
- `joint-extremes-and-range` — joint minimum/maximum density for `n >= 2`, sample range, the two-sample product identity, and the boundary between marginals and dependence.

### Canonical Problems

- `uniform-sample-extremes-and-range`
- `joint-min-max-correlation-of-uniforms`
- `random-ants-last-fall-time`
- `kth-order-statistic-distribution`

All four are independently authored, source-neutral, solved, and S3+.

### Cross-book semantic decisions and graph boundaries

Exactly **5 terminal claimed source rows** are closed for this workstream: 3 Green and 2 Red. The state distribution is **4 `canonical-problem`** and **1 `merged-duplicate`**. Every claimed row has a nonempty resolution note and resolves to the approved real public targets.

- Green expected max/min and Red 3.29 resolve to one canonical `uniform-sample-extremes-and-range` Problem; the Red row is the merged duplicate.
- Joint minimum/maximum correlation remains the distinct `joint-min-max-correlation-of-uniforms` dependence problem.
- `random-ants-last-fall-time` uses collision relabeling to reduce Random Ants to a maximum of iid Uniform distances.
- `kth-order-statistic-distribution` owns the general kth-order CDF/PDF and Uniform/Beta identity.
- The existing `ants-crossing-line` page remains a Logic / invariants Problem, linked reciprocally to Random Ants but not re-owned by Order Statistics.
- Existing distribution, symmetry, transformation, expectation, and covariance Knowledge links into the new nodes while retaining its prior canonical ownership.
- The 150-question source received a bounded review with **no new independent ownership**; no synthetic Order Statistics row was invented.

## Completed cross-book workstream 11

`stochastic-processes-random-walks-markov-chains-011`

Scope: **Stochastic Processes & Stochastic Calculus → Random Walks & Markov Chains**.

Content-complete verification:

- commit `78a9cd4a0a4d6b24d3683641ade5dbbe6f583b58`
- GitHub Actions run `32761496211`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

The machine-readable workstream is `status: complete` and stores exactly this real verification evidence.

### Canonical Knowledge

- `finite-state-markov-chains` — transition matrices, communicating and closed classes, stationarity, periodicity, hitting equations, and positive return.
- `markov-chain-state-compression` — sufficient streak/suffix states, strong lumpability, Hamming symmetry, target preservation, and backward lineages.

### Canonical Problems and enriched identity

- `twelve-before-consecutive-sevens`
- `coin-pattern-hitting-times`
- `random-recoloring-consensus-time`
- `random-walk-return-time-on-cube`
- `random-walk-boundary` — enriched in place as the existing absorbing-boundary identity.

All four new Problems are independently authored, source-neutral, solved, and S3+. The existing boundary page retains its slug, problem id, and canonical topics.

### Cross-book semantic decisions and graph boundaries

Exactly **8 terminal claimed source rows** are closed: **5 Green plus 3 Red**. The exact state split is **5 `canonical-problem` / 2 `merged-duplicate` / 1 `knowledge-only`**. Green gambler's ruin owns the existing `random-walk-boundary` identity; both Red boundary rows are merged duplicates of that same identity.

The 150-question review of items 10-29 is `reviewed-no-new-ownership`: terminal items 1-9 remain unchanged, no 150 coverage row was added, and aggregate `2.6::` remains `pending`.

The finite-chain and state-compression Knowledge nodes link reciprocally through first-step analysis. Dice and coin pages link to their older expectation/combinatorial neighbors, and cube return links reciprocally with the boundary walk. Every older page retains its prior canonical topic ownership.

Martingales and optional stopping, Brownian motion, Itô calculus, SDEs, continuous-time chains, general dynamic programming, and optimal stopping remain outside workstream 011.

## Public corpus state after eleven workstreams

The current source-neutral regression contract discovers exactly **63 canonical Problems** and **41 explicitly topic-classified Knowledge / Technique nodes**.

These are repository-record counts only. They are not whole-book completeness percentages and do not imply that Probability & Statistics as a whole is complete.

## Verified source state

All three source files remain edition-pinned and source-file-verified. Source-file verification is not whole-book Knowledge/Problem coverage.

- Green Book: First Edition (2008), ISBN-13 `9781438236667`, overall coverage incomplete.
- Red Book: Version 1.01 (2008), ISBN-13 `9781438217031`, overall coverage incomplete.
- 150 Questions: First edition (2013), ISBN-13 `9780979757648`, overall cross-book reconciliation incomplete.

## Next action

The durable **cross-book** Topic-first workflow remains unchanged: all three verified sources form one evidence pool, public pages stay source-neutral, and item-level mathematical identity controls ownership and deduplication.

Historical transition marker: **Combinatorial Probability** is already closed and remains here only to preserve repository lineage for agents and regression checks. Its canonical Knowledge, six public Problems, ten terminal hidden source rows, real verification evidence, and semantic merges are complete. This paragraph is historical context only and does not authorize reopening or source-ordered reprocessing of that bounded topic.

Historical transition marker: **Conditional Probability & Bayes** is already closed. Its expanded conditioning layer, Bayes/base-rate Knowledge, six canonical Problems, twelve terminal hidden source rows, protocol corrections, semantic merges, and verified public source-neutral contract are durable repository state. This paragraph records lineage only and does not authorize reopening or source-ordered reprocessing of that bounded topic.

Historical transition marker: **Random Variables & Distributions** is fully closed. Its five canonical Knowledge nodes, six S3+ Problems, fourteen terminal hidden source rows, Exponential-memorylessness boundary, Gaussian/lognormal structure, LLN/CLT consolidation, and verified source-neutral corpus contract are durable repository state. This paragraph exists only to preserve chronological handoff evidence and explicitly forbids reopening the bounded topic merely because adjacent source chapters contain related expectation, order-statistic, or stochastic-process material.

Historical transition marker: **Expectation, Variance & Covariance** is fully closed. Its four canonical Knowledge nodes, thirteen new S3+ Problems, upgraded conditional-dice linkage, eighteen terminal hidden source rows, indicator/tower/scalar-covariance boundaries, and verified 55/37 source-neutral corpus contract are durable repository state. This paragraph records lineage only and does not authorize reopening that bounded topic.

Historical transition marker: **Order Statistics & Extremes** is fully closed. Its two canonical Knowledge nodes, four S3+ Problems, five terminal hidden source rows, four-canonical-plus-one-merged state split, cross-source uniform-extrema merge, Random Ants collision-relabeling boundary, reciprocal public graph links, exact 59 canonical Problems / 39 explicitly topic-classified Knowledge / Technique nodes source-neutral corpus contract, and real verification evidence are durable repository state. This paragraph records lineage only and does not authorize reopening that bounded topic.

Historical transition marker: **Random Walks & Markov Chains** is fully closed. Its two canonical Knowledge nodes, four new S3+ Problems, enriched absorbing-boundary identity, eight terminal hidden source rows, exact 5/2/1 state split, reciprocal public graph links, 63/41 source-neutral corpus contract, and real verification evidence are durable repository state. This paragraph records lineage only and does not authorize reopening that bounded topic.

Current bounded topic:

**Calculus & Differential Equations → Limits & Derivatives.**

Coordinator integration proceeds in serialized order: workstream 012 before workstream 013. Preserve completed prior-workstream ownership, exact corpus counts, and shared-state history while reviewing the bounded Limits & Derivatives evidence pool.

Do not process one book to completion before the others. Do not organize the public corpus by source numbering. Do not use a generic deferred state to avoid semantic decisions.

## Parallel workstream coordination

Maximum active candidates: **3**. Parallel candidates are isolated design and implementation branches; they are not authoritative completion state. The coordinator alone owns ordinal reservation, integration order, shared-file reconciliation, exact corpus counts, completion metadata, real CI evidence, and HANDOFF closure.

| Queue | Reservation | Canonical topic | Candidate branch | State |
|---:|---:|---|---|---|
| 1 | 011 | `random-walks-markov-chains` | `chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23` | complete |
| 2 | 012 | `limits-derivatives` | `chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23` | design-audit |
| 3 | 013 | `reasoning-communication` | `chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23` | design-audit |

Completed queue entry: **011**. Remaining integration queue: **012 → 013**. A candidate stays `active` during implementation and is not `complete` until the coordinator integrates it on the latest durable base, reconciles shared state, obtains fresh local and real CI verification for the exact commit, and records factual closure here.

## Non-negotiable invariants

- Repository state wins over conversational memory.
- Each branch processes one bounded canonical topic; the coordinator may run up to three isolated candidates while integration and closure remain serialized.
- Review all relevant verified-source material before closing a workstream; coarse containers require item-level refinement.
- Semantic deduplication is mandatory; text similarity alone cannot merge Problems.
- Every claimed source item receives explicit hidden coverage and a resolution note.
- `knowledge-only` is terminal only when the public self-test remains visible.
- Canonical public Problems remain source-neutral.
- Source book names, source item numbers, source page numbers, and audit-only metadata remain internal.
- No unsupported whole-book completeness percentages.
- No integration before `npm run test`, `npm run check`, and `npm run build` pass.

## Verification gates

```bash
npm run test
npm run check
npm run build
```

Also review the topic-only diff against the preceding verified workstream branch before integration.
