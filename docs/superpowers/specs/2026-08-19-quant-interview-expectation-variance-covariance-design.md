# Quant Interview Expectation, Variance & Covariance — Design Spec

Date: 2026-08-19  
Status: approved design, pre-implementation  
Workstream ID: `probability-statistics-expectation-variance-covariance-009`  
Durable base branch: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`  
Spec-only branch: `chatgpt/quant-interview-expectation-variance-covariance-design-2026-08-19`  
Planned implementation branch after spec approval: `chatgpt/quant-interview-workstream-expectation-variance-covariance-2026-08-19`

## 1. Goal

Build the ninth bounded cross-book Quant Interview Knowledge workstream for:

- **Probability & Statistics**
- **Expectation, Variance & Covariance**

The public system remains Topic-first and source-neutral. The three verified interview books are internal evidence pools only. The workstream must fuse conceptually equivalent material across all three sources, preserve genuinely distinct reasoning identities, and avoid absorbing stochastic-process, dynamic-programming, order-statistic, or covariance-matrix material merely because an expected value or covariance appears in the calculation.

Under the approved design, the expected public corpus delta is:

- canonical Problems: **42 -> 55**;
- explicitly topic-classified Knowledge / Technique nodes: **33 -> 37**.

These are design expectations, not quotas. If implementation discovers a true semantic duplicate, the duplicate must be merged and the count contract revised rather than forcing a thin page.

## 2. Canonical ownership rule

The workstream owns a source item when its **primary mathematical machinery** is one or more of:

- expectation of a discrete or continuous random variable;
- expectation of a transformed variable / LOTUS;
- linearity of expectation;
- indicator-variable decompositions;
- product expectation under independence;
- conditional expectation;
- law of total expectation / tower property;
- expectation recursion that can be solved without genuine stochastic-process machinery;
- variance identities;
- scalar covariance and scalar correlation algebra;
- variance of linear combinations;
- moments;
- moment generating functions when moment calculation is the main task;
- fair-value calculations whose policy component collapses and leaves an expectation problem;
- quantitative applications of scalar covariance, including minimum-variance hedge ratios;
- fixed-marginal Bernoulli covariance/correlation feasibility.

Ownership is determined by solution machinery, not by wording. In particular:

- a process-shaped story can still belong here if elementary expectation decomposition solves it;
- an “expected time” problem does not belong here when its main machinery is a Markov chain, martingale, or optional stopping;
- a problem whose objective is `max_pi E[X^pi]` belongs to dynamic programming / optimal stopping when continuation values and policy choice are the main difficulty;
- a maximum/minimum expectation belongs to Order Statistics & Extremes when order-statistic structure is the main difficulty;
- covariance matrices, PSD feasibility, eigenvalue constraints, and joint correlation-matrix geometry remain owned by Linear Algebra.

## 3. Approved boundary decisions

The design process explicitly approved the following boundaries.

### 3.1 Waiting and stopping times

Red waiting-time items whose main solution uses martingales, optional sampling, state recursion, or stochastic-process theory remain outside this workstream. In particular, the HH/TT, HHH, and related stopping-time items are reserved for later stochastic-process workstreams.

Elementary waiting-time decomposition remains in scope when the main machinery is ordinary expectation. Coupon collection and the geometric first-success moment problem are therefore in scope.

### 3.2 Scalar covariance versus covariance matrices

Create a dedicated scalar moment-algebra Knowledge node for variance/covariance identities. Existing `correlation-matrix` and `positive-semidefinite-matrix` Knowledge retain Linear Algebra ownership.

The new scalar page may teach `Cov(X,Y)`, correlation normalization for two scalar random variables, covariance bilinearity, and variance of linear combinations. It must not duplicate matrix PSD, equicorrelation eigenvalues, covariance-to-correlation matrix normalization, or joint matrix feasibility.

### 3.3 Conditional expectation versus conditional probability

Create `conditional-expectation-tower-property`. Existing `conditioning` remains owned by Conditional Probability & Bayes and continues to teach conditional probability, partitions, observation protocols, and probability-side first-step conditioning.

The new page owns expectation-side conditioning, `E[X|Y]`, the law of total expectation, the tower property, and expectation recursion.

### 3.4 Previously terminal distribution rows

Source rows already terminal in workstream 008 are not re-owned merely because they also contain means or variances. Exponential and Poisson moment formulas may be reused as teaching examples, but their hidden source ownership remains with Random Variables & Distributions.

### 3.5 Disk expectation deduplication

The Red disk/dartboard expected-radius problem and the 150-question unit-disk problem are one reasoning identity. The public canonical page uses a disk of general radius `R`, with the unit disk as a special case. The betting wrapper is an extension, not a separate Problem.

### 3.6 Random Ants

The Green random-ants problem is reserved for Order Statistics & Extremes because its key reduction is to an expected maximum of iid uniforms.

### 3.7 Optimal hedge ratio

The minimum-variance hedge-ratio problem belongs here because the core derivation is scalar variance/covariance algebra followed by one-variable minimization.

### 3.8 Coupon collection

Coupon collection belongs here because the approved solution uses a sum of geometric waiting increments and indicator linearity, not Markov-chain or martingale machinery.

### 3.9 Joint default probability

The two-Bernoulli default problem belongs here. It teaches scalar covariance/correlation feasibility under fixed marginals. Matrix PSD remains a separate Linear Algebra identity.

### 3.10 Connecting noodles

The random-pairing loop-count problem belongs here because its central identity is an expectation recursion on problem size.

### 3.11 `E[Phi(X)]` cross-book merge

The general Normal `E[Phi(X)]` problem subsumes the standard-normal special case. Maintain one canonical public Problem, with tower-property / independent-normal reasoning as the main derivation and symmetry / probability-integral-transform reasoning as useful special-case perspectives.

### 3.12 Normal MGF and moments

Normal moments and expectation-heavy MGF calculations intentionally deferred by workstream 008 now belong here. Fuse the standard-normal moment calculation and the general Normal MGF into one canonical Problem and one reusable MGF/moments Knowledge node.

### 3.13 Recursive dice versus existing conditional dice

Existing `conditional-dice-expectation` remains a separate introductory canonical Problem. The Green recursive dice game gets a new page because it requires a self-consistency equation rather than a one-step partition only.

### 3.14 Pattern counts

The overlapping-pattern expectation problem is a standalone canonical Problem because it tests the important fact that linearity of expectation does not require independence.

### 3.15 Finite-horizon reroll optimization

Red’s finite-horizon reroll/stop problem remains for Dynamic Programming / Optimal Stopping. The current workstream does not absorb policy optimization merely because the objective is expected payoff.

### 3.16 Fair box-opening game

The fair box-opening price belongs here. The apparent stopping decision collapses: once the game is worth starting, continuation only improves after failures. The remaining mathematical load is the expected position of the winning box and fair-value calculation.

### 3.17 Multiplicative wealth

The multiplicative wealth problem gets a standalone canonical page. It teaches expectation of independent products and explicitly distinguishes expected wealth growth from typical/log growth without expanding into Kelly criterion.

### 3.18 Geometric moments

The geometric first-success mean/variance problem gets a standalone page because the source asks for derivation rather than memorized formulas. `common-probability-distributions` remains responsible for distribution recognition; this workstream is responsible for deriving moments.

### 3.19 First special card

The first-special-card position problem remains standalone. Although it uses indicators like the pattern-count and coupon-distinct problems, its reasoning identity is random-permutation symmetry plus indicators.

## 4. Public Knowledge architecture

Create exactly four new Knowledge nodes unless implementation discovers a semantic collision that requires an explicit spec revision.

### 4.1 `expectation-linearity-indicators`

Purpose: foundational expectation mechanics and indicator decompositions.

Required content:

- discrete and continuous expectation;
- expectation of `g(X)` / LOTUS;
- linearity `E[aX+bY] = aE[X] + bE[Y]` without an independence assumption;
- distinction between linearity and the independent-product identity `E[XY] = E[X]E[Y]`;
- indicator identity `E[1_A] = P(A)`;
- expected counts as sums of indicators;
- expectation-existence warning;
- recognition pattern: “count something” -> consider indicators;
- concrete warning that dependent / overlapping indicators do not invalidate linearity.

Required Interview Checks include a fair-die expectation, a dependent-indicator count, a short product-expectation check under independence, and an expectation-existence trap.

### 4.2 `conditional-expectation-tower-property`

Purpose: expectation-side conditioning.

Required content:

- `E[X|A]`;
- conditional expectation on a finite partition;
- `E[X|Y]` as a random variable / function of `Y`;
- law of total expectation;
- tower property;
- multi-stage conditioning;
- first-step expectation recursion;
- distinction between ordinary expectation recursion and state-rich first-step stochastic-process analysis;
- cross-links to `conditioning` and `first-step-analysis` without changing their ownership.

Required Interview Checks include partition conditioning, `E[E[X|Y]]=E[X]`, a small recursive expectation equation, and a boundary question distinguishing expectation recursion from a Markov-chain hitting-time problem.

### 4.3 `expectation-variance-covariance-algebra`

Purpose: scalar moment algebra.

Required content:

- `Var(X)=E[X^2]-E[X]^2`;
- `Var(aX+b)=a^2 Var(X)`;
- `Cov(X,Y)=E[(X-E[X])(Y-E[Y])] = E[XY]-E[X]E[Y]`;
- covariance bilinearity;
- variance of two-variable and finite linear combinations;
- `Var(X+Y)=Var(X)+Var(Y)+2Cov(X,Y)`;
- independence implies zero covariance when moments exist;
- zero covariance does not imply independence in general;
- scalar correlation definition and interpretation;
- explicit boundary at covariance/correlation matrices and PSD.

Required Interview Checks include variance expansion, covariance bilinearity, independence-versus-uncorrelated, and scalar correlation normalization.

### 4.4 `moments-moment-generating-functions`

Purpose: moments and MGF as expectation tools.

Required content:

- raw moments;
- central moments;
- variance as the second central moment;
- `M_X(t)=E[e^{tX}]`;
- `M_X^(k)(0)=E[X^k]` under appropriate existence conditions;
- neighborhood-of-zero existence caveat;
- MGF nonexistence does not mean the random variable does not exist;
- standard Cauchy as a cross-linked counterexample rather than a duplicated distribution tutorial;
- Normal MGF as the central worked example.

Required Interview Checks include extracting moments from derivatives, identifying an invalid MGF argument, and the Normal MGF form.

## 5. Existing Knowledge boundaries

Only minimal graph-navigation edits are allowed to existing Knowledge unless a concrete content bug is found.

Expected related-link targets:

- `conditioning` <-> `conditional-expectation-tower-property`;
- `correlation-matrix` <-> `expectation-variance-covariance-algebra`;
- `common-probability-distributions` -> moment / variance Knowledge;
- `gaussian-lognormal-structure` -> moments/MGF and tower-property Knowledge;
- `random-variable-transformations-convolution` -> expectation/tower Knowledge where useful;
- `first-step-analysis` -> `conditional-expectation-tower-property`;
- `recursion-problem-solving` is linked from recursive Problems without changing its topic ownership.

Do not add `expectation-variance-covariance` to the canonical topic ownership of `correlation-matrix`, `conditioning`, `first-step-analysis`, `common-probability-distributions`, or `gaussian-lognormal-structure`.

## 6. Canonical Problem set

Create thirteen new source-neutral S3+ Problems and upgrade the existing repository-authored `conditional-dice-expectation` linkage. The existing seed is not a source-derived coverage target.

Every new Problem must contain:

- `## Problem`;
- `## Think Before Revealing`;
- at least two progressive `<details>` hints;
- `## Solution` with complete reasoning;
- `## Why This Matters`;
- `## Common Mistakes`;
- `## Extensions`;
- canonical topic `probability-statistics, expectation-variance-covariance`;
- no book names, source numbers, PDF pages, or provenance fields.

### 6.1 `expected-pattern-count-by-indicators`

Planned `problemId`: `expectation-variance-covariance-001`  
Family: `indicator-pattern-counts`

Generalize to a fixed length-`m` pattern in `n` independent tosses / symbols. Use indicators for each starting position and show explicitly that overlap creates dependence but does not block expectation linearity. Include the long coin-pattern instance as an internal source-derived variant, not public provenance.

### 6.2 `expected-position-of-first-special-card`

Planned `problemId`: `expectation-variance-covariance-002`  
Family: `first-special-position`

Generalize to `m` ordinary and `n` special objects in a random permutation:

`E[T] = 1 + m/(n+1) = (m+n+1)/(n+1)`.

Give indicator and symmetry views. Include the standard-card first-ace value `10.6` as an application.

### 6.3 `coupon-collector-expectations`

Planned `problemId`: `expectation-variance-covariance-003`  
Family: `coupon-collector-expectations`

Keep two complementary subproblems on one page:

- expected draws to collect all `N` types: `N H_N` via geometric increments;
- expected number of distinct types after `k` draws: `N[1-(1-1/N)^k]` via indicators.

### 6.4 `recursive-dice-game-expected-payoff`

Planned `problemId`: `expectation-variance-covariance-004`  
Family: `recursive-expectation-fixed-point`

Use the approved recursive die game and derive the self-consistency equation whose solution is `7`. Explain why this differs from the existing one-step `conditional-dice-expectation` seed.

### 6.5 `expected-loops-from-random-pairings`

Planned `problemId`: `expectation-variance-covariance-005`  
Family: `expectation-size-recursion`

Derive

`E_n = E_{n-1} + 1/(2n-1)`

and therefore

`E_n = sum_{k=1}^n 1/(2k-1)`.

### 6.6 `geometric-waiting-time-mean-variance`

Planned `problemId`: `expectation-variance-covariance-006`  
Family: `geometric-moment-derivation`

For `P(N=k)=(1-p)^(k-1)p`, derive

- `E[N]=1/p`;
- `Var(N)=(1-p)/p^2`.

Preserve at least two derivation routes: series/generating-series and first-step recursion.

### 6.7 `normal-mgf-and-moments`

Planned `problemId`: `expectation-variance-covariance-007`  
Family: `normal-mgf-moments`

For `X~N(mu,sigma^2)`, derive

`M_X(t)=exp(mu t + sigma^2 t^2/2)`

and `E[X^2]=mu^2+sigma^2`. Extend to standard-normal moments `0,1,0,3` through MGF derivatives.

### 6.8 `expected-normal-cdf-of-normal-variable`

Planned `problemId`: `expectation-variance-covariance-008`  
Family: `tower-property-gaussian-expectation`

For `X~N(mu,sigma^2)`, derive

`E[Phi(X)] = Phi(mu/sqrt(1+sigma^2))`

by introducing an independent standard Normal and applying the tower property. Preserve the standard-normal value `1/2` and the probability-integral-transform perspective as a special-case alternative.

### 6.9 `optimal-hedge-ratio-by-variance-minimization`

Planned `problemId`: `expectation-variance-covariance-009`  
Family: `minimum-variance-hedge`

Minimize

`Var(R_A-hR_B)`

and derive

`h* = Cov(R_A,R_B)/Var(R_B) = rho sigma_A/sigma_B`.

Keep the public emphasis on scalar covariance and variance minimization.

### 6.10 `bernoulli-default-correlation-bounds`

Planned `problemId`: `expectation-variance-covariance-010`  
Family: `bernoulli-correlation-feasibility`

With fixed marginal default probabilities, combine Frechet bounds with

`Cov(I_A,I_B)=P(A cap B)-P(A)P(B)`

to derive the feasible correlation range. Explicitly distinguish the universal bound `[-1,1]` from the smaller set achievable under fixed marginals.

### 6.11 `expected-radius-of-uniform-disk-point`

Planned `problemId`: `expectation-variance-covariance-011`  
Family: `continuous-expectation-geometry`

For a point uniform in a disk of radius `R`, derive

`E[r]=2R/3`.

Give radial-density and polar-integration views. Treat the unit disk as a special case and the dart betting wrapper as an extension.

### 6.12 `fair-box-opening-price-by-expectation`

Planned `problemId`: `expectation-variance-covariance-012`  
Family: `fair-value-expected-position`

For `n` symmetric boxes containing one prize `V`, show the winning position is uniform on `{1,...,n}` and derive

`E[K]=(n+1)/2`,

`X_fair=2V/(n+1)`.

Explain why the strategy component collapses rather than turning the page into a general optimal-stopping problem.

### 6.13 `multiplicative-wealth-expected-growth`

Planned `problemId`: `expectation-variance-covariance-013`  
Family: `independent-product-expectation`

For independent multipliers `M_i`, derive

`E[W_n]=W_0 product_i E[M_i]`.

Preserve the approved example with `E[M]=5/4`, then distinguish arithmetic expected wealth growth from log/geometric growth. Do not expand into Kelly optimization.

### 6.14 Existing `conditional-dice-expectation`

Keep the current problem statement and answer `2.75`. Upgrade only:

- `concepts` to include `conditional-expectation-tower-property`;
- related Problem linkage to `recursive-dice-game-expected-payoff`;
- a short navigation note if needed to distinguish one-step conditioning from recursive expectation.

Do not turn this repository-authored seed into a fake source-derived row.

## 7. Semantic deduplication map

The following source forms resolve to one canonical public Problem each:

- Red disk/dartboard expected radius + 150 unit-disk expected radius -> `expected-radius-of-uniform-disk-point`;
- Red standard-normal `E[Phi(X)]` + 150 general Normal `E[Phi(X)]` -> `expected-normal-cdf-of-normal-variable`;
- Green standard-normal MGF/moments + Red general Normal MGF/moments -> `normal-mgf-and-moments`.

The following remain separate despite sharing a technique:

- expected pattern count;
- coupon distinct-count expectation;
- first-special position;
- ordinary conditional dice;
- recursive dice;
- random-pairing loop recursion.

Technique overlap alone is not semantic duplication.

## 8. Hidden source inventory

The design closes exactly **18 claimed terminal source rows**:

`13 canonical-problem + 2 knowledge-only + 2 variant + 1 merged-duplicate = 18`.

Every claimed row must have:

- canonical topic `expectation-variance-covariance`;
- a terminal state;
- a nonempty `resolutionNote`;
- at least one real canonical Problem or Knowledge target;
- explicit `topicOverrideReason` where coarse source-section mapping does not match the item-level mathematical identity.

### 8.1 Green — eight rows

Internal reviewed evidence range: verified PDF material around pages 108–115, including the end of 4.4 and all of 4.5 required for this bounded review.

1. `4.4.normal-moments` (sourceItem null)
   - state: `variant`;
   - topic override from coarse Random Variables mapping to `expectation-variance-covariance`;
   - canonical Problem: `normal-mgf-and-moments`;
   - canonical Knowledge: `moments-moment-generating-functions`;
   - resolution: standard-normal MGF/moment route enriches the general Normal canonical page.

2. `4.5` (sourceItem null)
   - state: `knowledge-only`;
   - canonical Knowledge: `expectation-linearity-indicators`, `conditional-expectation-tower-property`, `expectation-variance-covariance-algebra`;
   - public Interview Checks are required before terminal closure.

3. `4.5.connecting-noodles`
   - `canonical-problem` -> `expected-loops-from-random-pairings`.

4. `4.5.optimal-hedge-ratio`
   - `canonical-problem` -> `optimal-hedge-ratio-by-variance-minimization`.

5. `4.5.dice-game`
   - `canonical-problem` -> `recursive-dice-game-expected-payoff`.

6. `4.5.card-game`
   - `canonical-problem` -> `expected-position-of-first-special-card`.

7. `4.5.coupon-collection`
   - `canonical-problem` -> `coupon-collector-expectations`.

8. `4.5.joint-default-probability`
   - `canonical-problem` -> `bernoulli-default-correlation-bounds`.

Boundary-reviewed but not claimed by 009:

- `4.5.sum-of-random-variables`: primary identity is simplex/geometric probability, not expectation machinery;
- 4.6 order-statistic material, including Random Ants: reserved for Order Statistics & Extremes;
- covariance-matrix / PSD content remains under Linear Algebra.

### 8.2 Red — eight rows

Internal reviewed evidence range: question pages around 92–96 and relevant solution material through the expectation-heavy items later in the General Probability solutions.

All eight rows use source section `3.2.1` with the listed source item.

1. `3.2.1::3.1`
   - `knowledge-only` -> `expectation-linearity-indicators`;
   - simple fair-die expectation remains publicly testable through Interview Checks.

2. `3.2.1::3.3`
   - `canonical-problem` -> `fair-box-opening-price-by-expectation`.

3. `3.2.1::3.5`
   - `canonical-problem` -> `multiplicative-wealth-expected-growth`.

4. `3.2.1::3.6`
   - `canonical-problem` -> `geometric-waiting-time-mean-variance`.

5. `3.2.1::3.12`
   - `canonical-problem` -> `expected-pattern-count-by-indicators`.

6. `3.2.1::3.13`
   - `canonical-problem` -> `expected-radius-of-uniform-disk-point`.

7. `3.2.1::3.37`
   - `canonical-problem` -> `normal-mgf-and-moments`.

8. `3.2.1::3.38`
   - `variant` -> `expected-normal-cdf-of-normal-variable`;
   - standard-normal symmetry / PIT is retained inside the general canonical page.

Boundary-reviewed but not claimed by 009 include:

- 3.2: finite-horizon reroll optimization -> Dynamic Programming / Optimal Stopping;
- 3.7–3.9: waiting/stopping-time items using process/martingale machinery -> stochastic-process workstreams;
- 3.22–3.23 and later random-walk/process items -> stochastic processes;
- 3.29 and 3.32 -> Order Statistics & Extremes;
- 3.35 -> already owned by Linear Algebra covariance/PSD;
- 3.36 -> change of measure / later stochastic or Monte Carlo topic;
- items already terminal in Foundations, Bayes, or workstream 008 remain under their existing ownership.

### 8.3 150 Questions — two rows

Internal reviewed evidence range: Probability/Stochastic Calculus material around the disk-expectation and `E[Phi(X)]` items.

1. `2.6::4`
   - `merged-duplicate` -> `expected-radius-of-uniform-disk-point`;
   - unit disk is the `R=1` instance of the Red/general canonical identity.

2. `2.6::7`
   - `canonical-problem` -> `expected-normal-cdf-of-normal-variable`.

Do not re-own workstream-008 terminal rows `2.6::1`, `2.6::2`, `2.6::3`, `2.6::5`, `2.6::6`, `2.6::8`, or `2.6::9` merely because expectation or moments appear in their exposition.

## 9. Knowledge-only completion rule

`knowledge-only` is terminal only when the pedagogical source question remains publicly testable through `## Interview Checks` or an equivalent self-test.

The two expected 009 knowledge-only rows are:

- Green 4.5 theory block;
- Red 3.1 simple die expectation.

The workstream tests must verify the relevant public Interview Checks exist and materially test the claimed identities.

## 10. Workstream registration

Create after the written spec is approved and implementation begins:

`src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json`.

Required fields follow existing workstream contracts:

- `id`;
- `canonicalTopics`;
- `status`;
- `verification` only when real verification evidence exists;
- three `sourceScopes` with internal `evidencePageRanges`, `reviewOutcome`, and precise `reviewNote`.

The workstream remains `active` until real CI closure evidence exists.

## 11. File-level implementation scope

### 11.1 New public Knowledge

Create:

- `src/content/knowledge/concepts/expectation-linearity-indicators.md`;
- `src/content/knowledge/concepts/conditional-expectation-tower-property.md`;
- `src/content/knowledge/concepts/expectation-variance-covariance-algebra.md`;
- `src/content/knowledge/concepts/moments-moment-generating-functions.md`.

### 11.2 New public Problems

Create the thirteen Problem files listed in Section 6 under `src/content/problems/probability/`.

### 11.3 Existing public content

Update only as needed:

- `src/content/problems/probability/conditional-dice-expectation.md`;
- `src/content/knowledge/concepts/conditioning.md`;
- `src/content/knowledge/concepts/correlation-matrix.md`;
- `src/content/knowledge/concepts/common-probability-distributions.md`;
- `src/content/knowledge/concepts/gaussian-lognormal-structure.md`;
- `src/content/knowledge/concepts/random-variable-transformations-convolution.md`;
- `src/content/knowledge/concepts/first-step-analysis.md`.

`recursion-problem-solving` may be referenced by new Problems without requiring a file edit unless a reciprocal navigation link is genuinely useful.

### 11.4 Hidden data

Create:

- `src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json`.

Update only the bounded 009 ownership needed in:

- `src/data/quant-interview/coverage/green-book.json`;
- `src/data/quant-interview/coverage/red-book.json`;
- `src/data/quant-interview/coverage/150-most-frequently-asked.json`.

The taxonomy is already sufficient. Do not modify `taxonomy.json` unless implementation discovers a real structural inconsistency. Do not broadly rewrite `source-topic-map.json`; use item-level topic overrides for narrowly misclassified source items such as Green normal moments.

### 11.5 Tests

Create:

- `tests/quant-interview-expectation-variance-covariance-workstream.test.mjs`;
- `tests/quant-interview-expectation-variance-covariance-content.test.mjs`;
- `tests/quant-interview-expectation-variance-covariance-completion.test.mjs`.

Update:

- `tests/quant-interview-source-neutral-content.test.mjs` for the new exact public corpus enumeration;
- `tests/quant-interview-handoff.test.mjs` only if its durable-history assertions require the minimal 009 synchronization.

Create temporary branch-only CI during implementation:

- `.github/workflows/quant-interview-expectation-variance-covariance-ci.yml`.

Delete temporary CI / mutator tooling before final product integration unless it has become a genuinely reusable repository-wide workflow through a separate approved design decision.

## 12. Test contracts

### 12.1 Workstream tests

Verify:

- exact workstream ID and canonical topics;
- all three verified source scopes;
- exact 18 claimed row inventory;
- terminal state distribution `13 + 2 + 2 + 1`;
- nonempty resolution notes;
- real canonical targets;
- correct semantic merge/variant destinations;
- `validateTopicWorkstream` passes;
- `validateCoverageLedger(... allowUnresolvedCanonicalRefs: false)` passes;
- 150 workstream-008 rows remain owned by workstream 008;
- Red optimal-stopping, martingale/process, order-statistic, and covariance-PSD rows are not absorbed;
- Green Random Ants and simplex probability are not absorbed.

### 12.2 Content tests

Verify the four Knowledge pages contain the required mathematical identities and `## Interview Checks`.

Verify every new Problem is S3+ and source-neutral.

Add mathematical regression assertions for at least:

- expected first-special position `1 + m/(n+1)`;
- coupon collector `N H_N` and expected distinct count;
- geometric `E[N]=1/p`, `Var(N)=(1-p)/p^2`;
- Normal MGF;
- `E[Phi(X)] = Phi(mu/sqrt(1+sigma^2))`;
- minimum-variance hedge ratio;
- Bernoulli covariance identity / feasible-correlation logic;
- disk expectation `2R/3`;
- fair box price `2V/(n+1)`;
- random-pairing odd-harmonic expectation;
- recursive die answer `7`;
- independent-product wealth expectation.

### 12.3 Global source-neutral regression

If the design remains unchanged, update the exact regression inventory from:

- `42` Problems -> `55` Problems;
- `33` Knowledge / Technique nodes -> `37` Knowledge / Technique nodes.

Continue exact slug enumeration and exact canonical topic assignments; do not weaken the regression to “at least N”.

## 13. TDD and implementation order

After the written spec is approved, the implementation plan must enforce:

1. create the implementation branch;
2. add temporary branch CI and RED workstream tests;
3. register an `active` workstream;
4. create Knowledge first;
5. update bounded hidden coverage;
6. create thirteen Problems and upgrade the existing seed;
7. add related graph links;
8. make topic-specific tests GREEN;
9. update the global source-neutral regression;
10. run the full test suite;
11. run `npm run check`;
12. run `npm run build`;
13. review topic-only diff;
14. remove temporary CI/mutator tooling;
15. obtain a real GitHub Actions success run;
16. only then record completion metadata and advance HANDOFF;
17. run a fresh closure verification.

Do not write fake verification SHA/run IDs in advance.

## 14. Public source-neutrality and copyright boundary

Public Knowledge and Problems must not expose:

- book names as provenance;
- original chapter/section/question numbers;
- source page numbers;
- source-specific ordering;
- source-shaped `problemId` values;
- copied long source passages or answer keys.

Internal design/workstream/coverage files may retain source names, item IDs, and page evidence for audit integrity.

Public content must be independently formulated and independently derived.

## 15. Failure and rollback rules

### 15.1 Semantic collision

If implementation discovers that an approved new Problem is actually the same reasoning identity as an existing canonical Problem, stop creating it. Reclassify the source row as `variant` or `merged-duplicate`, revise the spec/plan and exact public count, and preserve one public page.

### 15.2 Mathematical uncertainty

Do not publish a result that has not survived independent derivation/sanity checks. Important closed forms must be checked by special cases or a second route when practical.

For example, the `E[Phi(X)]` formula must at least satisfy:

- `mu=0` -> `1/2`;
- `sigma -> 0` -> `Phi(mu)`.

### 15.3 Coverage uncertainty

If a claimed source item’s ownership is genuinely unclear, keep the workstream `active`. `needs-review` is preferable to a false merge. Do not invent canonical targets or empty resolution notes.

### 15.4 Test failure

Do not weaken validators merely to make incorrect content pass. Fix the content, relation, coverage, metadata, or stale exact regression unless the approved contract itself has genuinely changed.

### 15.5 Scope creep

Do not process adjacent stochastic-process, optimal-stopping, order-statistic, general Poisson-process, or covariance-matrix material “while here”. This branch is bounded to Expectation, Variance & Covariance plus necessary shared-contract updates.

### 15.6 Parallel-agent/base divergence

Before integration, compare the implementation branch with the then-current durable base. Shared hot spots such as `HANDOFF.md`, `coverage/*.json`, and `quant-interview-source-neutral-content.test.mjs` require semantic reconciliation if another agent changed them. Never force-push over other work.

### 15.7 Rollback

Before integration, rollback is simply “do not integrate” or restore the feature branch to the last verified commit. After integration, prefer corrective commits over history rewrites on shared durable branches.

## 16. Completion gate

The workstream may be marked `complete` only when all of the following are true:

1. all 18 claimed source rows are terminal and explained;
2. variants/duplicates point to real canonical targets;
3. `knowledge-only` rows remain publicly testable;
4. the four Knowledge nodes have correct ownership;
5. the thirteen new Problems and upgraded seed satisfy content contracts;
6. prior Linear Algebra, Conditional Probability, and Random Variables ownership remains intact;
7. topic-specific workstream tests pass;
8. topic-specific content tests pass;
9. the global source-neutral regression passes;
10. `npm run test` passes;
11. `npm run check` passes;
12. `npm run build` passes;
13. topic-only diff review is clean;
14. a real CI run succeeds;
15. workstream verification stores a real 40-hex commit, real positive run ID, exact verification commands, and `conclusion: success`;
16. `docs/quant-interview/HANDOFF.md` records factual completed state and advances to the next bounded canonical topic;
17. fresh closure verification passes after completion metadata is recorded.

No failed gate may be described as complete.

## 17. Branch and integration strategy

This design spec is committed on a docs-only spec branch. No product implementation belongs on that branch before the user reviews and approves the written spec.

After written-spec approval and a writing-plans pass, create the planned implementation branch from the approved spec commit so it contains the reviewed design while preserving the durable base ancestry.

Do not touch `main`.

At implementation finish, use the established finishing workflow. If the user selects safe integration, integrate the verified feature tree into the then-current durable Quant Interview base, reconcile any concurrent shared-file changes semantically, and run post-integration `npm run test`, `npm run check`, and `npm run build` before considering the integration durable.

## 18. Next process gate

This document captures the fully approved in-chat design. The next step is **user review of this written spec**.

No implementation plan, implementation branch, workstream registration, tests, Knowledge content, Problem content, coverage mutation, or CI workflow should be created until the user approves this written spec.
