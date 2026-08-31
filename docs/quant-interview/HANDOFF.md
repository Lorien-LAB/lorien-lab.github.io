# Quant Interview — Current Handoff

Updated: 2026-08-30

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

Historical corpus checkpoint after workstream 11: **63 canonical Problems** and **41 explicitly topic-classified Knowledge / Technique nodes**. This checkpoint is retained for repository lineage only.

## Public corpus state (current)

The current source-neutral regression contract discovers exactly **86 canonical Problems / 58 explicitly topic-classified Knowledge / Technique nodes**.

These are repository-record counts only. They are not whole-book completeness percentages and do not imply that Interview Strategy & Communication, Reasoning & Communication, or Green/Red/150 as a whole is complete.

## Verified source state

All three source files remain edition-pinned and source-file-verified. Source-file verification is not whole-book Knowledge/Problem coverage.

- Green Book: First Edition (2008), ISBN-13 `9781438236667`, overall coverage incomplete.
- Red Book: Version 1.01 (2008), ISBN-13 `9781438217031`, overall coverage incomplete.
- 150 Questions: First edition (2013), ISBN-13 `9780979757648`, overall cross-book reconciliation incomplete.

## Completed cross-book workstream 12

`calculus-differential-equations-limits-derivatives-012`

Scope: **Calculus & Differential Equations → Limits & Derivatives**.

Active integrated verification:

- CI-tested pre-closure active commit: `666cacb1b4832b5aab43c8f146696a4681425f76`
- GitHub Actions run: `32807218682`; its `head_sha` is `666cacb1b4832b5aab43c8f146696a4681425f76`
- authoritative local environment: `wsl-native-lf-node24`
- CI environment: Ubuntu with Node 24; CI ran `npm ci` first
- ordered gates: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

This evidence belongs to the active integrated commit above, not to the later workflow-free closure commit. The active SHA is identical in `preClosureActiveGate.commit`, `verification.commit`, and the CI `head_sha`.

### Canonical Knowledge

- `derivative-definition-and-core-rules`
- `logarithmic-differentiation`
- `monotonicity-convexity-critical-points-and-inflection`
- `indeterminate-limits-and-growth-rates`
- `related-rates-and-implicit-differentiation`
- `bounded-monotone-convergence-and-fixed-points`
- `positive-series-convergence`

### Canonical Problems

- `differentiate-variable-base-and-exponent`
- `compare-e-pi-power-expressions`
- `exponential-over-polynomial-limit`
- `logarithm-power-limit-at-zero`
- `rotating-lighthouse-beam-related-rate`
- `radical-difference-limit-at-infinity`
- `exponential-midpoint-convexity`
- `periodic-continued-fraction-limit`
- `normal-cdf-inflection-point`
- `derive-exponential-cosine-derivative-from-definition`
- `nested-radical-limit`
- `infinite-power-tower-limit`
- `classify-basic-positive-series`

### Exact registry, coverage, and mapping decisions

- Source-neutral corpus checkpoint: **76 canonical Problems / 48 explicitly topic-classified Knowledge / Technique nodes**.
- Terminal coverage: **20 rows = 12 canonical-problem / 6 merged-duplicate / 2 knowledge-only**.
- Source distribution: **Green 4 / Red 10 / 150 6**.
- Green `3.1.3::` is one terminal row with two canonical Problem targets; Red Q6.9 and Q6.10 retain their complete pre-012 ownership.
- Exact source-map repairs: `red-book::6.2.2 -> [limits-derivatives, integration]` and `red-book::6.3.2 -> [limits-derivatives, integration]`.
- There is no other source-map delta and no taxonomy delta.

### Bounded source scope and closure boundary

- Green Book sections `3.1`, `3.1.1`, `3.1.2`, and `3.1.3`, evidence pages 49–52.
- Red Book sections `6.1`, `6.2.1`, `6.2.2`, `6.3.1`, `6.3.2`, `10`, and `10.2`, evidence pages 201–229 and 317–318.
- 150 Most Frequently Asked sections `1`, `2.1`, and `3.1`, evidence pages 11–12, 27–28, and 50–65.

This closes only registered workstream 012. It does not claim completeness for calculus, for any of Green/Red/150 as a whole, for any broad source section, or for material outside the registered page and section scopes.

## Completed cross-book workstream 13

`interview-strategy-communication-reasoning-communication-013`

Scope: **Interview Strategy & Communication → Reasoning & Communication**.

Active integrated verification:

- CI-tested pre-closure active commit: `bb584ea70e6694b7a15116842ffb9da8a3aca39d`
- GitHub Actions run: `33112491183`; its `head_sha` is `bb584ea70e6694b7a15116842ffb9da8a3aca39d`
- authoritative local environment: `wsl-native-lf-node24`
- CI environment: Ubuntu with Node 24; CI ran `npm ci` first
- ordered gates: `npm run test`, then `npm run check`, then `npm run build`
- conclusion: success
- final workflow-free tree gate: the same ordered commands succeeded in `wsl-native-lf-node24`, and the temporary workflow is absent

This evidence belongs to the active integrated commit above, not to the later workflow-free closure commit. The active SHA is identical in `preClosureActiveGate.commit`, `verification.commit`, and the CI `head_sha`.

### Canonical Knowledge

- `problem-framing-clarification-assumption-management`
- `structured-think-aloud-reasoning`

### Canonical Problems

None. Workstream 013 produced exactly +0 Problems and +2 Knowledge. The global source-neutral corpus is exactly 76 canonical Problems and 50 explicitly topic-classified Knowledge nodes.

### Source dispositions

- Green Book sections `1.3`, `1.4`, and `1.5` resolve `knowledge-only` to the two canonical Knowledge nodes above; evidence page 18. No new Problem is created.
- Red Book section `1.12` is rerouted to `interview-preparation` and closes as `interview-guidance` with no public Problem or Knowledge; evidence pages 25–26.
- 150 Most Frequently Asked Questions has no scope, map, coverage, or ownership in workstream 013.

This closes only registered workstream 013. It does not claim completeness for Interview Strategy & Communication as a whole, for any source book as a whole, or for material outside the registered section and page scopes.

## Completed cross-book workstream 14

`interview-strategy-communication-interview-preparation-014`

Scope: **Interview Strategy & Communication → Interview Preparation**.

Active integrated verification:

- CI-tested pre-closure active commit: `ec271c334b4e5ca278e0f2fedad3c90c09fa2a5d`
- GitHub Actions run: `33151972903`; its `head_sha` is `ec271c334b4e5ca278e0f2fedad3c90c09fa2a5d`
- authoritative local environment: `wsl-native-lf-node24`
- CI environment: Ubuntu with Node 24; CI ran `npm ci` first
- ordered gates: `npm run master:directory:check`, `npm run knowledge:directory:check`, `npm run test`, `npm run check`, then `npm run build`
- conclusion: success
- final workflow-free tree gate: the same ordered commands succeeded in `wsl-native-lf-node24`, and the temporary workflow is absent

This evidence belongs to the active integrated commit above, not to the later workflow-free closure commit. The active SHA is identical in `preClosureActiveGate.commit`, `verification.commit`, and the CI `head_sha`.

### Canonical Knowledge

- `quant-interview-preparation-breadth-and-practice` — turns broad fundamentals, representative drills, error diagnosis, and repeated mock interviews into one deliberate-practice loop.

### Canonical Problems

None. Workstream 014 produced exactly **+0 Problems / +1 Knowledge**. The global source-neutral corpus is exactly **76 canonical Problems / 51 explicitly topic-classified Knowledge nodes**.

### Source dispositions and closure boundary

- `green-book::1.1::guidance` and `green-book::1.2::guidance` are consecutive `knowledge-only` records resolving to the one canonical Knowledge node above; evidence pages 17–18.
- Both interview checks remain visible on the public Knowledge page. No source-specific Problem was created.
- This closes only registered workstream 014. It does not claim completeness for Interview Strategy & Communication, interview preparation as a whole, or any source book as a whole.

## Completed cross-book workstream 15

`interview-strategy-communication-interview-preparation-role-employer-fit-015`

Scope: **Interview Strategy & Communication → Interview Preparation**. The bounded subject is **Quant Role & Employer Fit**.

Active integrated verification:

- CI-tested pre-closure active commit: `a6024974396c8609342273f655967f05593de74d`
- GitHub Actions run: `33260285231`; its `head_sha` is `a6024974396c8609342273f655967f05593de74d`
- authoritative local environment: WSL native-LF with Node 24 (`wsl-native-lf-node24`)
- CI environment: Ubuntu with Node 24; CI ran `npm ci` first
- ordered gates: `npm run master:directory:check`, `npm run knowledge:directory:check`, `npm run test`, `npm run check`, then `npm run build`
- conclusion: success
- final workflow-free tree gate: the same ordered commands succeeded at removal commit `b9765b49e02c48a5e0e4f4a031bfcc4e1566b15e` in `wsl-native-lf-node24`, and the temporary workflow is absent

This evidence belongs to the active integrated commit above, not to the later workflow-free closure commits. The active SHA is identical in `preClosureActiveGate.commit`, `verification.commit`, and the CI `head_sha`.

### Canonical Knowledge

- `quant-role-and-employer-fit` — consolidates role constraints, employer evidence, fit scoring, falsification questions, and reversible next actions into one source-neutral framework.

### Canonical Problems

None. Workstream 015 produced exactly **+0 Problems / +1 Knowledge**. The global source-neutral corpus is exactly **76 canonical Problems / 52 explicitly topic-classified Knowledge nodes**.

### Source dispositions and closure boundary

- `red-book::1.10::guidance` is `knowledge-only` with the exact page boundary 22–23 and resolves to `quant-role-and-employer-fit`.
- `red-book::1.11::guidance` is `knowledge-only` with the exact page boundary 24–25 and resolves to the same canonical Knowledge node.
- Both source records remain internal evidence. The public Knowledge page and its interview checks are source-neutral, and no source-specific Problem was created.
- This closes only registered workstream 015. It does not claim completeness for Interview Strategy & Communication, interview preparation, role and employer fit as a whole, the Red Book, or any source book as a whole.

## Skipped source audit — Red Book market awareness

The exact 14-record block `red-book::9::guidance`, `red-book::9.3::guidance`, and `red-book::9.3::9.23` through `red-book::9.3::9.34` was terminalized as internal `interview-guidance` by explicit user direction.

These 14 records contain time-sensitive market snapshots, source-era office holders, current-affairs prompts, and obsolete regulatory details. They produce exactly **+0 Problems / +0 Knowledge**, have no public target, and do not represent public coverage. Section 9.3 evidence was corrected to PDF pages 315–316.

No workstream ordinal was consumed. Workstream 016 is not active and remains available for the next substantive scope.

## Completed cross-book workstream 16

`interview-strategy-communication-interview-process-formats-assessment-strategy-016`

Scope: **Interview Strategy & Communication → Interview Process & Formats**. The bounded subject is **assessment formats and execution strategy**.

Active integrated verification:

- CI-tested pre-closure active commit: `c4894064c5e8e7157efb30b89be0dbc24f67075a`
- Windows local evidence: the locked worktree at `D:\lorien-lab.github.io\.worktrees\assessment-formats-016` used Node 24 and ran `npm run master:directory:check`, `npm run knowledge:directory:check`, `npm run test`, `npm run check`, then `npm run build`; all succeeded before the active commit.
- WSL native-LF evidence: the fresh detached worktree at `/home/lorien/quant-interview-assessment-formats-016-final-review-fix-2-active` used Node 24, ran `npm ci`, audited tracked files and the temporary workflow as LF, then ran the same five ordered gates at the exact active commit; all succeeded and the proof worktree was removed without pruning.
- Ubuntu CI evidence: GitHub Actions run `33278445615` at `https://github.com/Lorien-LAB/lorien-lab.github.io/actions/runs/33278445615` used Node 24 and ran `npm ci`, `npm run master:directory:check`, `npm run knowledge:directory:check`, `npm run test`, `npm run check`, then `npm run build`; every step succeeded and its `head_sha` is `c4894064c5e8e7157efb30b89be0dbc24f67075a`.
- workflow-free proof: the fresh detached WSL worktree at `/home/lorien/quant-interview-assessment-formats-016-final-review-fix-2-removal` verified removal commit `86b525cc24bf9596c5f2474d31e0df2f490d6eb9` with Node 24, `npm ci`, LF audit, and the same five ordered gates; the temporary workflow was absent and the proof worktree was removed without pruning.
- conclusion: success

This evidence belongs to the active integrated commit above, not to the later workflow-free closure commits. The active SHA is identical in `preClosureActiveGate.commit`, `verification.commit`, and the CI `head_sha`.

### Canonical Knowledge

- `quant-interview-formats-and-assessment-strategy` — consolidates live technical interviews, remote screens, take-homes, supervised written exams, format-specific execution, integrity, deliverable quality, and post-assessment review into one source-neutral framework.

### Canonical Problems

None. Workstream 016 produced exactly **+0 Problems / +1 Knowledge**. The global source-neutral corpus is exactly **76 canonical Problems / 53 explicitly topic-classified Knowledge nodes**.

### Exact nine-row dispositions

- `red-book::1.1::guidance` is `knowledge-only` and resolves to `quant-interview-formats-and-assessment-strategy`; evidence page 13.
- `red-book::1.2::guidance` is target-free `interview-guidance`; evidence pages 13–15.
- `red-book::1.3::guidance` is `knowledge-only` and resolves to `quant-interview-formats-and-assessment-strategy`, `problem-framing-clarification-assumption-management`, and `structured-think-aloud-reasoning`; evidence pages 15–17.
- `red-book::1.4::guidance` is `knowledge-only` and resolves to `quant-interview-formats-and-assessment-strategy`; evidence pages 17–18.
- `red-book::1.5::guidance` is `knowledge-only` and resolves to `quant-interview-formats-and-assessment-strategy`; evidence page 18.
- `red-book::1.6::guidance` is `knowledge-only` and resolves to `quant-interview-formats-and-assessment-strategy`; evidence pages 18–19.
- `red-book::1.7::guidance` is target-free `interview-guidance`; its literal source identity was preserved while its question-page evidence alone was repaired to page 19.
- `red-book::1.8::guidance` is `knowledge-only` and resolves to `quant-interview-formats-and-assessment-strategy`; evidence pages 20–21.
- `red-book::1.9::guidance` is `knowledge-only` and resolves to `quant-interview-preparation-breadth-and-practice`; evidence pages 21–22.

All nine rows are terminal, yielding exactly **205 terminal / 545 pending** master-directory records. The next pending record is `red-book::9.2::guidance`.

### Closure boundary

The nine source records remain internal evidence. The one new public Knowledge page, its catalog entry, links, and interview checks are source-neutral; no source-specific Problem was created. This closes only registered workstream 016. It does not claim completeness for Interview Strategy & Communication, interview process and formats as a whole, the Red Book, any source book, or material outside Red Book sections 1.1–1.9 and evidence pages 13–22.

## Completed cross-book workstream 17

`interview-strategy-communication-soft-interview-behavioral-evidence-017`

Scope: **Interview Strategy & Communication → Soft Interview**. The bounded subject is **behavioral evidence and authenticity**.

Active integrated verification:

- CI-tested pre-closure active commit: `b1e3ea4d83a8ec6ca6aa29f305cd672d7c252f3b`
- Windows Node 24 evidence at active commit `b1e3ea4d83a8ec6ca6aa29f305cd672d7c252f3b`: all five ordered gates succeeded.
- WSL native-LF Node 24 evidence at active commit `b1e3ea4d83a8ec6ca6aa29f305cd672d7c252f3b`: `npm ci`, the LF audit, and all five ordered gates succeeded in `wsl-native-lf-node24`.
- GitHub Actions CI run `33289163132` at `https://github.com/Lorien-LAB/lorien-lab.github.io/actions/runs/33289163132` used Ubuntu with Node 24, ran `npm ci`, and completed successfully with `head_sha` `b1e3ea4d83a8ec6ca6aa29f305cd672d7c252f3b`.
- ordered gates: `npm run master:directory:check`, then `npm run knowledge:directory:check`, then `npm run test`, then `npm run check`, then `npm run build`
- workflow-free removal proof: exact removal commit `de3437ce37040dc0f5cd2835f43c8f65a3838610` passed `npm ci`, the LF audit, and the same five gates in a fresh `wsl-native-lf-node24` worktree; the temporary workflow is absent.
- conclusion: success

This evidence belongs to the immutable active commit above, not to the later workflow-free closure commits. The active SHA is identical in `preClosureActiveGate.commit`, `verification.commit`, and the CI `head_sha`.

### Canonical Knowledge

- `behavioral-interview-evidence-and-authenticity` — provides a source-neutral claim, evidence, relevance, and reflection framework; evidence-quality checks; a preparation workflow; an authenticity boundary; and 17 independently worded Practice Prompts.

### Canonical Problems

None. Workstream 017 produced exactly **+0 Problems / +1 Knowledge**. The global source-neutral corpus is exactly **76 canonical Problems / 54 explicitly topic-classified Knowledge nodes**.

### Exact prompt identities and skipped rows

The exact public prompt bindings are:

- `red-book::9.2::9.1` → pursuing quantitative work and the role now.
- `red-book::9.2::9.2` → a CV contribution, its relevance, and learning.
- `red-book::9.2::9.4` → leaving or changing a previous direction.
- `red-book::9.2::9.5` → concrete actions in a difficult collaboration.
- `red-book::9.2::9.6` → a genuine weakness and evidence of progress.
- `red-book::9.2::9.7` → meeting an important deadline under constraints.
- `red-book::9.2::9.9` → a recent organization development relevant to the role.
- `red-book::9.2::9.10` → longer-term direction and role fit.
- `red-book::9.2::9.11` → explaining research to non-specialist and technical audiences.
- `red-book::9.2::9.13` → demonstrated qualities beyond technical ability.
- `red-book::9.2::9.14` → collaborator evidence about working style.
- `red-book::9.2::9.17` → an achievement showing initiative or impact.
- `red-book::9.2::9.18` → learning or building that demonstrates quantitative or finance interest.
- `red-book::9.2::9.19` → organization or team fit versus plausible alternatives.
- `red-book::9.2::9.20` → independent work versus collaboration.
- `red-book::9.2::9.21` → leading others toward a measurable outcome.
- `red-book::9.2::9.22` → adapting to an unfamiliar internal language or tool while protecting transferable skills.

Exactly five target-free `interview-guidance` rows have no public prompt binding: `red-book::9.2::9.3`, `red-book::9.2::9.8`, `red-book::9.2::9.12`, `red-book::9.2::9.15`, and `red-book::9.2::9.16`. The `red-book::9.2::guidance` row resolves to the canonical framework but is not a supplied personal-answer prompt.

### Exact evidence-page repairs

Only these ten page fields changed from the literal pre-edit fixture:

- `red-book::9.2::9.2` solution pages: 310–311 → 310.
- `red-book::9.2::9.3` question pages: 310–311 → 310.
- `red-book::9.2::9.3` solution pages: 310–311 → 310.
- `red-book::9.2::9.6` question pages: 311–312 → 311.
- `red-book::9.2::9.6` solution pages: 311–312 → 311.
- `red-book::9.2::9.12` solution pages: 312–313 → 313.
- `red-book::9.2::9.13` solution pages: 313–314 → 313.
- `red-book::9.2::9.14` question pages: 313–314 → 313.
- `red-book::9.2::9.14` solution pages: 313–314 → 313.
- `red-book::9.2::9.22` question pages: 315–316 → 315.

All 23 owned rows are terminal, yielding exactly **228 terminal / 522 pending** master-directory records. The next pending record is `green-book::2.1::theory`.

### Authenticity and closure boundary

The 23 source records remain internal evidence. The public page is source-neutral and provides prompts and an answer-building method, not copied source answers, prescribed personality, or fabricated user experience. It rejects invented stories, borrowed accomplishments, and memorized scripts. This closes only registered workstream 017 and the exact Red Book 9.2 scope on evidence pages 309–315; it does not claim completeness for Soft Interview, Interview Strategy & Communication, the Red Book, any source book, or any material outside that bounded scope.

## Completed cross-book workstream 18

`logic-brainteasers-discrete-reasoning-problem-simplification-018`

Status: **complete**.

Scope: **Logic, Brainteasers & Discrete Reasoning → Problem Simplification**. The exact eleven-record cross-book scope is distributed **3 Green / 4 Red / 4 150 Questions**:

- Green Book (3): `green-book::2.1::theory`, `green-book::2.1.screwy-pirates::question`, and `green-book::2.1.tiger-and-sheep::question`.
- Red Book (4): `red-book::8::8.2`, `red-book::8::8.5`, `red-book::8::8.25`, and `red-book::8::8.26`.
- 150 Most Frequently Asked Questions (4): `150-most-frequently-asked::2.7::8`, `150-most-frequently-asked::2.7::16`, `150-most-frequently-asked::2.7::23`, and `150-most-frequently-asked::2.7::30`.

### Active integrated verification

- CI-tested pre-closure active commit: `f63bf8529e1833f2e122c59cc29dc44843168edc`.
- Windows environment: the locked feature worktree at `D:\lorien-lab.github.io\.worktrees\problem-simplification-018` used Windows Node 24 and passed all five ordered gates at the exact active commit.
- WSL environment: a fresh detached native-filesystem checkout used WSL2 Ubuntu, native Node `v24.20.0`, LF-only tracked text, and passed `npm ci` plus all five ordered gates at the exact active commit; its exact proof path and registration were removed without pruning the Windows repository.
- CI environment: GitHub Actions run `33305049381` at `https://github.com/Lorien-LAB/lorien-lab.github.io/actions/runs/33305049381` used Ubuntu and Node 24, ran `npm ci`, and passed all five ordered gates with `head_sha` `f63bf8529e1833f2e122c59cc29dc44843168edc`.
- Ordered gates: `npm test`, `npm run knowledge:directory:check`, `npm run master:directory:check`, `npm run check`, then `npm run build`.
- Workflow-free active-state proof: removal commit `3698e8f22c867f4395f29ad0af8e2d1566ceaa9a` passed `npm ci`, an LF audit, and the same five gates in a fresh detached `wsl-native-lf-node24` checkout; the temporary workflow was absent, the manifest remained active and evidence-free, and the proof path and registration were removed without pruning.
- Conclusion: success.

This evidence belongs to the immutable active commit above, not to the later workflow-free closure commit. The active SHA is identical in `preClosureActiveGate.commit`, `verification.commit`, and the CI `head_sha`.

### Canonical Knowledge

- **Small Cases, Recurrence & Structural Simplification** — `small-cases-recurrence-and-structural-simplification`.
- **Fermi Estimation & Assumption Decomposition** — `fermi-estimation-assumption-decomposition`.

### Canonical Problems

- **Sequential Voting Under Elimination** — `sequential-voting-elimination-backward-induction`.
- **Predator Replacement Parity** — `predator-replacement-parity`.
- **Two-Resource Threshold Search** — `two-egg-threshold-search`.
- **Digit Count of a Large Power Without Log Tables** — `large-power-digit-count-without-log-tables`.
- **Minimum Comparisons for Both Extremes** — `minimum-comparisons-for-both-extremes`.

Workstream 018 adds exactly **+5 Problems / +2 Knowledge**, producing the current **81 Problems / 56 Knowledge** source-neutral corpus.

### Exact eleven dispositions

- `green-book::2.1::theory` is `knowledge-only` and resolves to `small-cases-recurrence-and-structural-simplification`.
- `green-book::2.1.screwy-pirates::question` is `canonical-problem` and resolves to `sequential-voting-elimination-backward-induction`, with `small-cases-recurrence-and-structural-simplification` and `recursion-problem-solving` Knowledge.
- `green-book::2.1.tiger-and-sheep::question` is `canonical-problem` and resolves to `predator-replacement-parity`, with `small-cases-recurrence-and-structural-simplification` Knowledge.
- `red-book::8::8.2` is `knowledge-only` and resolves to `small-cases-recurrence-and-structural-simplification`.
- `red-book::8::8.5` is `knowledge-only` and resolves to `small-cases-recurrence-and-structural-simplification`.
- `red-book::8::8.25` is `knowledge-only` and resolves to `fermi-estimation-assumption-decomposition`.
- `red-book::8::8.26` is `knowledge-only` and resolves to `fermi-estimation-assumption-decomposition`.
- `150-most-frequently-asked::2.7::8` is `canonical-problem` and resolves to `two-egg-threshold-search`, with `small-cases-recurrence-and-structural-simplification` and `recursion-problem-solving` Knowledge.
- `150-most-frequently-asked::2.7::16` is `canonical-problem` and resolves to `large-power-digit-count-without-log-tables`, with `small-cases-recurrence-and-structural-simplification` Knowledge.
- `150-most-frequently-asked::2.7::23` is `canonical-problem` and resolves to `minimum-comparisons-for-both-extremes`, with `small-cases-recurrence-and-structural-simplification` Knowledge.
- `150-most-frequently-asked::2.7::30` is `knowledge-only` and resolves to `small-cases-recurrence-and-structural-simplification`.

The exact state split is **5 `canonical-problem` / 6 `knowledge-only`**. All eleven rows are terminal, yielding exactly **239 terminal / 511 pending** master-directory records. The next pending record is `green-book::2.2::theory`.

### Topic refinements and page repairs

- `150-most-frequently-asked::2.7::8` adds `dynamic-programming-algorithms` because item-level review identifies a minimax state recurrence with reusable subproblem structure, so this specific Brainteaser also belongs to Dynamic Programming.
- `150-most-frequently-asked::2.7::23` adds `algorithmic-complexity` because item-level review identifies an optimal comparison algorithm plus matching lower bound, so this specific Brainteaser also belongs to Algorithmic Complexity.
- The other nine rows remain solely under `problem-simplification` and have no topic override.
- Exactly two page fields were repaired: `red-book::8::8.25` solution pages changed from 307–308 to 307, and `150-most-frequently-asked::2.7::30` solution pages changed from 215–216 to 215. Every other question and solution page field in the eleven-record fixture is unchanged.

### Source-neutral and Fermi boundary

All public Knowledge and Problems remain source-neutral. The Fermi material teaches assumption decomposition, sensitivity, validation, and uncertainty rather than publishing dated source-era totals. Arithmetic shortcuts, endpoint tricks, and the one-answer geometry prompt remain visible Knowledge checks rather than low-value public Problems.

Workstream 018 alone is bounded to the exact eleven records above. It does not claim completeness for Problem Simplification, Logic, Brainteasers & Discrete Reasoning, any source book, or adjacent topics. Workstream 019 is not active or authorized.

## Active cross-book workstream 19

`logic-brainteasers-discrete-reasoning-logical-deduction-green-core-019`

Status: **active and evidence-free**. Completion is not claimed. The manifest contains no `preClosureActiveGate`, `verification`, or `finalTreeGate`; those fields remain absent until the exact active commit passes Windows, WSL, and GitHub CI.

Scope: **Logic, Brainteasers & Discrete Reasoning → Logical Deduction**. This is a one-source, exact nine-record Green Book 2.2 core scope on evidence pages 21–26:

- `green-book::2.2::theory`
- `green-book::2.2.river-crossing::question`
- `green-book::2.2.birthday-problem::question`
- `green-book::2.2.card-game::question`
- `green-book::2.2.burning-ropes::question`
- `green-book::2.2.defective-ball::question`
- `green-book::2.2.trailing-zeros::question`
- `green-book::2.2.horse-race::question`
- `green-book::2.2.infinite-sequence::question`

### Canonical Knowledge

- **Logical Deduction, Constraint Propagation & Case Elimination** — `logical-deduction-constraint-propagation-and-case-elimination`.
- **Decision Trees, Information Bounds & Adaptive Testing** — `decision-trees-information-bounds-and-adaptive-testing`.

### Canonical Problems

- **Minimum-Time Bridge Crossing** — `bridge-crossing-minimum-time`.
- **Public-Announcement Candidate Elimination** — `public-announcement-candidate-elimination`.
- **Twelve-Object Balance-Scale Diagnosis** — `twelve-object-balance-scale-diagnosis`.
- **Factorial Trailing Zeros in an Arbitrary Base** — `factorial-trailing-zeros-in-arbitrary-base`.
- **Top Three from Batched Races** — `top-three-from-batched-races`.

Workstream 019 adds exactly **+5 Problems / +2 Knowledge**, producing the current **86 Problems / 58 Knowledge** source-neutral corpus.

### Exact nine dispositions and boundaries

- `green-book::2.2::theory` is `knowledge-only` and resolves to the constraint-propagation Knowledge page.
- `green-book::2.2.river-crossing::question` is `canonical-problem` and resolves to `bridge-crossing-minimum-time`.
- `green-book::2.2.birthday-problem::question` is `canonical-problem` and resolves to `public-announcement-candidate-elimination`.
- `green-book::2.2.card-game::question` is `knowledge-only`; the two-color pairing invariant remains an executable Knowledge check rather than a low-depth standalone Problem.
- `green-book::2.2.burning-ropes::question` is `knowledge-only`; the nonuniform-rope timer remains an executable constraint-composition Knowledge check rather than a one-trick standalone Problem.
- `green-book::2.2.defective-ball::question` is `canonical-problem` and resolves to `twelve-object-balance-scale-diagnosis`.
- `green-book::2.2.trailing-zeros::question` is `canonical-problem` and resolves to `factorial-trailing-zeros-in-arbitrary-base`.
- `green-book::2.2.horse-race::question` is `canonical-problem` and resolves to `top-three-from-batched-races`.
- `green-book::2.2.infinite-sequence::question` is `merged-duplicate`; the recursive tower merges into the existing `infinite-power-tower-limit` Problem and its complete convergence and branch-selection proof.

The exact state split is **5 `canonical-problem` / 3 `knowledge-only` / 1 `merged-duplicate`**. All nine rows are terminal, yielding exactly **248 terminal / 502 pending** master-directory records. The first pending record after the active scope is `green-book::2.3::theory`.

### Topic refinements and page freeze

- `green-book::2.2.trailing-zeros::question` adds `modular-arithmetic`. Reason: Item-level review identifies factorial prime valuations and base divisibility as Modular Arithmetic while retaining the source section’s logical-deduction context.
- `green-book::2.2.horse-race::question` adds `algorithmic-complexity`. Reason: Item-level review identifies a comparison-selection strategy with an optimal race lower bound, so this Logical Deduction item also belongs to Algorithmic Complexity.
- `green-book::2.2.infinite-sequence::question` adds `limits-derivatives`. Reason: Item-level review identifies the recursive tower as the existing Limits & Derivatives fixed-point and convergence identity while retaining its editorial Logical Deduction context.
- The other six rows remain solely under `logical-deduction` and have no topic override.
- No question or solution page range changed. The protected source-topic map and all 750 master page rows remain byte-stable under their pinned projections.

### Source-neutral and completion boundary

All public Knowledge and Problems remain source-neutral. The card and rope prompts remain visible checks instead of inflated public Problems, and the tower identity is merged rather than duplicated. This active workstream is bounded to the exact nine Green Book 2.2 records above; it does not claim completeness for Logical Deduction, Logic, Brainteasers & Discrete Reasoning, the Green Book, any source book, or adjacent topics.

Workstream 020 is not active or authorized.

## Next action

The durable **cross-book** Topic-first workflow remains unchanged: all three verified sources form one evidence pool, public pages stay source-neutral, and item-level mathematical identity controls ownership and deduplication.

Historical transition marker: **Combinatorial Probability** is already closed and remains here only to preserve repository lineage for agents and regression checks. Its canonical Knowledge, six public Problems, ten terminal hidden source rows, real verification evidence, and semantic merges are complete. This paragraph is historical context only and does not authorize reopening or source-ordered reprocessing of that bounded topic.

Historical transition marker: **Conditional Probability & Bayes** is already closed. Its expanded conditioning layer, Bayes/base-rate Knowledge, six canonical Problems, twelve terminal hidden source rows, protocol corrections, semantic merges, and verified public source-neutral contract are durable repository state. This paragraph records lineage only and does not authorize reopening or source-ordered reprocessing of that bounded topic.

Historical transition marker: **Random Variables & Distributions** is fully closed. Its five canonical Knowledge nodes, six S3+ Problems, fourteen terminal hidden source rows, Exponential-memorylessness boundary, Gaussian/lognormal structure, LLN/CLT consolidation, and verified source-neutral corpus contract are durable repository state. This paragraph exists only to preserve chronological handoff evidence and explicitly forbids reopening the bounded topic merely because adjacent source chapters contain related expectation, order-statistic, or stochastic-process material.

Historical transition marker: **Expectation, Variance & Covariance** is fully closed. Its four canonical Knowledge nodes, thirteen new S3+ Problems, upgraded conditional-dice linkage, eighteen terminal hidden source rows, indicator/tower/scalar-covariance boundaries, and verified 55/37 source-neutral corpus contract are durable repository state. This paragraph records lineage only and does not authorize reopening that bounded topic.

Historical transition marker: **Order Statistics & Extremes** is fully closed. Its two canonical Knowledge nodes, four S3+ Problems, five terminal hidden source rows, four-canonical-plus-one-merged state split, cross-source uniform-extrema merge, Random Ants collision-relabeling boundary, reciprocal public graph links, exact 59 canonical Problems / 39 explicitly topic-classified Knowledge / Technique nodes source-neutral corpus contract, and real verification evidence are durable repository state. This paragraph records lineage only and does not authorize reopening that bounded topic.

Historical transition marker: **Random Walks & Markov Chains** is fully closed. Its two canonical Knowledge nodes, four new S3+ Problems, enriched absorbing-boundary identity, eight terminal hidden source rows, exact 5/2/1 state split, reciprocal public graph links, 63/41 source-neutral corpus contract, and real verification evidence are durable repository state. This paragraph records lineage only and does not authorize reopening that bounded topic.

Historical transition marker: **Limits & Derivatives** is fully closed. Its seven Knowledge nodes, thirteen S3+ Problems, exact 76/48 registry, twenty terminal rows, two bounded Red map repairs, and factual active-commit CI evidence are durable repository state. This paragraph records lineage only and does not authorize reopening the bounded topic.

Current bounded topic:

**Logic, Brainteasers & Discrete Reasoning → Logical Deduction.**

Workstream 019 is active across the exact nine-record Green Book 2.2 core scope. Its public delta is +5 Problems / +2 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.

## Master directory ingestion state

**Workstream 019 owns the exact nine-record Green Book 2.2 core scope. The three-book master directory migration remains complete.**

First pending master record after the active 019 scope: `green-book::2.3::theory`

Workstream 020 is not active or authorized.

## Parallel workstream coordination

Maximum active candidates: **3**. Parallel candidates are isolated design and implementation branches; they are not authoritative completion state. The coordinator alone owns ordinal reservation, integration order, shared-file reconciliation, exact corpus counts, completion metadata, real CI evidence, and HANDOFF closure.

| Queue | Reservation | Canonical topic | Candidate branch | State |
|---:|---:|---|---|---|
| 1 | 011 | `random-walks-markov-chains` | `chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23` | complete |
| 2 | 012 | `limits-derivatives` | `chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23` | complete |
| 3 | 013 | `reasoning-communication` | `chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23` | complete |

Completed queue entries: **011, 012, 013**. The serialized queue is closed.

A candidate stays `active` during implementation and is not `complete` until the coordinator integrates it on the latest durable base, reconciles shared state, obtains fresh local and real CI verification for the exact commit, and records factual closure here.

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
