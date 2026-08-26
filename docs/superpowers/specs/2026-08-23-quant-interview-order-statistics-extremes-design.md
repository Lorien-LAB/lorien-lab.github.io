# Quant Interview Order Statistics & Extremes — Design Spec

Date: 2026-08-23  
Status: approved design, pre-implementation  
Workstream ID: `probability-statistics-order-statistics-extremes-010`  
Durable base branch: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`  
Spec-only branch: `chatgpt/quant-interview-order-statistics-extremes-design-2026-08-23`  
Planned implementation branch: `chatgpt/quant-interview-workstream-order-statistics-extremes-2026-08-23`

## 1. Goal

Build the tenth bounded cross-book Quant Interview Knowledge workstream for:

- **Probability & Statistics**
- **Order Statistics & Extremes**

The public system remains Topic-first and source-neutral. The verified interview books are internal evidence pools only. The workstream must fuse equivalent max/min/order-statistic identities across sources, preserve genuinely different joint-extreme and random-ants reasoning, and avoid turning this bounded source-ingestion step into a general textbook chapter on asymptotic extreme-value theory.

Under the approved design, the expected public corpus delta is:

- canonical Problems: **55 -> 59**;
- explicitly topic-classified Knowledge / Technique nodes: **37 -> 39**.

These counts are exact regression expectations only if implementation confirms no pre-existing semantic duplicate. They are not quotas.

## 2. Canonical ownership rule

The workstream owns a source item when the main mathematical object is a sorted iid sample or a statistic built directly from its extrema:

- sample minimum `X_(1)`;
- sample maximum `X_(n)`;
- general kth order statistic `X_(k)`;
- joint minimum/maximum structure;
- sample range `X_(n)-X_(1)`;
- a static physical problem that reduces to a maximum/minimum of iid random variables.

Ownership is determined by solution machinery, not by the presence of the words maximum, minimum, expectation, or quantile.

### In scope

- `F_max(x)=F(x)^n` and `F_min(x)=1-[1-F(x)]^n` for iid samples;
- general kth-order-statistic CDF/PDF;
- uniform order statistics and their Beta representation;
- expectations of uniform sample extrema/range when the order-statistic distribution is the key construction;
- joint min/max dependence and correlation;
- the Green random-ants last-fall problem after collision relabeling reduces it to a uniform maximum.

### Out of scope

- finite-horizon reroll/stop optimization: Dynamic Programming / Optimal Stopping;
- Brownian maxima, reflection-principle maxima, stopping times, martingale extrema, random-walk extrema: Stochastic Processes;
- covariance/correlation matrix PSD: Linear Algebra;
- ordinary scalar expectation algebra not requiring an order-statistic construction: workstream 009;
- quantile regression / quantile loss: ML/statistical modeling;
- GEV estimation, POT, GPD, Hill estimators, tail-index estimation, EVT backtesting: future Extreme Value Theory / Tail Risk work;
- asymptotic Gumbel/Fréchet/Weibull theory as standalone public pages in this bounded workstream.

## 3. Approved design contraction

Early brainstorming considered a broad `4 Knowledge + 10/11 Problems` treatment. Source audit showed that would over-expand beyond the three-book ingestion goal. The approved final design deliberately contracts to:

- **2 new Knowledge nodes**;
- **4 new canonical Problems**;
- **5 newly terminal source rows**.

The contraction is semantic deduplication, not lost coverage.

Examples deliberately not promoted to standalone pages in 010 include:

- uniform minimum as a separate Problem;
- sample median as a separate Problem;
- exponential minimum as a separate Problem;
- largest random spacing;
- Gaussian maximum asymptotics;
- Gumbel limit theory;
- empirical quantile conventions.

Useful parts of those topics may appear as worked examples, Interview Checks, or Extensions where they directly clarify the two core Knowledge nodes.

## 4. Existing ants Problem audit

The repository already contains `ants-crossing-line`. It is **not** a semantic duplicate of Green 4.6 Random Ants.

Existing `ants-crossing-line` is an invariance/state-transformation puzzle: ants reverse direction on collision, which is equivalent to identity swapping; the problem asks deterministic exit/collision consequences from fixed initial positions.

The new Green-derived random-ants Problem instead uses:

1. the same collision-relabeling invariant;
2. random iid positions and random directions;
3. reduction of each ghost ant's remaining travel distance to a Uniform random variable;
4. the maximum of those iid distances.

Therefore both Problems remain public. They are related by technique but have different canonical mathematical identities and different topic ownership.

## 5. Public Knowledge architecture

Create exactly two new Knowledge nodes unless implementation discovers a semantic collision requiring an explicit spec revision.

### 5.1 `order-statistics-basics`

Purpose: establish the language and core marginal distribution formulas for sorted iid samples.

Required content:

- define `X_(1) <= ... <= X_(n)` and distinguish `X_(k)` from the original observation `X_k`;
- explain the iid/independence assumption behind the standard formulas;
- maximum CDF:
  `F_{X_(n)}(x)=F(x)^n`;
- minimum CDF:
  `F_{X_(1)}(x)=1-[1-F(x)]^n`;
- continuous maximum/minimum densities;
- general kth-order-statistic CDF:
  `P(X_(k)<=x)=sum_{j=k}^n C(n,j)F(x)^j[1-F(x)]^(n-j)`;
- general continuous kth-order-statistic PDF:
  `f_{X_(k)}(x)=n!/[(k-1)!(n-k)!] F(x)^(k-1)[1-F(x)]^(n-k) f(x)`;
- probability-integral-transform view:
  `F(X_(k)) ~ Beta(k,n+1-k)` for continuous `F`;
- uniform special case `U_(k) ~ Beta(k,n+1-k)` and `E[U_(k)]=k/(n+1)`;
- a concise median/quantile connection without creating a separate empirical-quantile handbook;
- explicit boundary between iid sample extrema and continuous-time process extrema.

Required `## Interview Checks` include maximum CDF, minimum CDF, a kth-order density check, a uniform order-statistic expectation, and a boundary question distinguishing an iid maximum from a Brownian maximum.

### 5.2 `joint-extremes-and-range`

Purpose: move from marginal extreme distributions to joint min/max structure and the sample range.

Required content:

- define `L=X_(1)`, `U=X_(n)`, and `R=U-L`;
- explain why marginal laws of `L` and `U` do not determine their covariance;
- for iid continuous samples derive or state with derivation sketch:
  `f_{L,U}(l,u)=n(n-1)[F(u)-F(l)]^(n-2)f(l)f(u)`, `l<u`;
- uniform sample range as a central worked example;
- for iid `U(0,1)`, `E[U]=n/(n+1)`, `E[L]=1/(n+1)`, `E[R]=(n-1)/(n+1)`;
- the `n=2` identity `min(X1,X2) max(X1,X2)=X1X2` as an efficient covariance tool;
- scalar covariance/correlation cross-link to `expectation-variance-covariance-algebra` without importing matrix PSD content.

Required `## Interview Checks` include a range expectation, a joint-density/support question, and a min/max dependence question.

## 6. Existing Knowledge boundaries

Use graph links, not ownership rewrites.

Expected related navigation:

- `expectation-linearity-indicators` -> order-statistic expectation examples where useful;
- `expectation-variance-covariance-algebra` <-> `joint-extremes-and-range`;
- `common-probability-distributions` -> `order-statistics-basics`;
- `random-variable-transformations-convolution` -> `order-statistics-basics`;
- `symmetry-equiprobability-geometric-probability` -> `order-statistics-basics` where useful.

Do not change the canonical topic ownership of those existing pages.

Do not create `extreme-value-distributions` or `quantiles-medians-and-empirical-order` in this workstream. Those were intentionally removed after source audit.

## 7. Canonical Problem set

Create four new source-neutral S3+ Problems.

Every new Problem must contain:

- `## Problem`;
- `## Think Before Revealing`;
- at least two progressive `<details>` hints;
- `## Solution` with a distribution-first checkpoint where applicable;
- `## Why This Matters`;
- `## Common Mistakes`;
- `## Extensions`;
- canonical topics `probability-statistics, order-statistics-extremes`;
- no book names, source question numbers, PDF pages, provenance fields, or copied source wording.

### 7.1 `uniform-sample-extremes-and-range`

Planned `problemId`: `order-statistics-extremes-001`  
Family: `uniform-sample-extremes`

For `U_1,...,U_n iid~U(0,1)`, define:

- `M_n=max_i U_i`;
- `m_n=min_i U_i`.

Derive distributions first, then compute:

- `E[M_n]=n/(n+1)`;
- `E[m_n]=1/(n+1)`;
- `E[M_n-m_n]=(n-1)/(n+1)`.

The page canonically fuses Green `expected-max-min` with Red 3.29. Do not create separate maximum, minimum, and range pages.

### 7.2 `joint-min-max-correlation-of-uniforms`

Planned `problemId`: `order-statistics-extremes-002`  
Family: `joint-sample-extremes`

For `X_1,X_2 iid~U(0,1)`, let:

- `Y=min(X_1,X_2)`;
- `Z=max(X_1,X_2)`.

Derive or justify:

- `E[Y]=1/3`;
- `E[Z]=2/3`;
- `Var(Y)=Var(Z)=1/18`;
- `YZ=X_1X_2`;
- `E[YZ]=1/4`;
- `Cov(Y,Z)=1/36`;
- `Corr(Y,Z)=1/2`.

The page should teach that knowing marginal min/max distributions is not enough for dependence calculations and show why the product identity is an efficient shortcut.

### 7.3 `random-ants-last-fall-time`

Planned `problemId`: `order-statistics-extremes-003`  
Family: `random-ants-order-statistic`

Use a source-neutral generalization with `n` ants on a unit-length rope. Initial positions are iid Uniform and initial directions are iid left/right with equal probability. Ants move at unit speed and reverse direction when they collide.

Reasoning chain:

1. collision/reversal is equivalent to ghost ants passing through while labels swap;
2. for one ghost ant, random position plus random direction gives remaining travel distance `D~U(0,1)`;
3. the last fall time is `T_n=max(D_1,...,D_n)`;
4. therefore `E[T_n]=n/(n+1)`.

Include `n=500 -> 500/501` as an extension/application.

Link to existing `ants-crossing-line` through `relatedProblems` / technique navigation, but do not merge the two Problems or change the existing Problem's canonical topic ownership.

### 7.4 `kth-order-statistic-distribution`

Planned `problemId`: `order-statistics-extremes-004`  
Family: `kth-order-statistic`

For iid continuous `X_1,...,X_n` with CDF `F` and density `f`, derive:

`P(X_(k)<=x)=sum_{j=k}^n C(n,j)F(x)^j[1-F(x)]^(n-j)`

and then:

`f_{X_(k)}(x)=n!/[(k-1)!(n-k)!]F(x)^(k-1)[1-F(x)]^(n-k)f(x)`.

Extensions:

- `F(X_(k))~Beta(k,n+1-k)`;
- for Uniform samples `E[U_(k)]=k/(n+1)`;
- median as the middle order statistic.

## 8. Semantic deduplication map

The following source identities resolve to one canonical public Problem:

- Green `4.6.expected-max-min` + Red `3.29` -> `uniform-sample-extremes-and-range`.

The following remain separate:

- Green `4.6.correlation-max-min` -> `joint-min-max-correlation-of-uniforms` because it requires joint dependence/covariance reasoning;
- Green `4.6.random-ants` -> `random-ants-last-fall-time` because it combines an invariance reduction with a random maximum;
- Red `3.32` -> `kth-order-statistic-distribution` because it is the general kth-order distribution identity;
- existing `ants-crossing-line` remains separate because it is a deterministic/invariance brainteaser rather than a random order-statistic problem.

Technique overlap is not semantic duplication.

## 9. Hidden source inventory

The approved design closes exactly **5 newly claimed terminal source rows**:

- Green: 3;
- Red: 2;
- 150 Questions: 0 new claims.

Expected terminal state distribution:

- `4 canonical-problem`;
- `1 merged-duplicate`.

Every claimed row must have:

- canonical topic `order-statistics-extremes`;
- a terminal state;
- nonempty `resolutionNote`;
- a real canonical Problem target;
- canonical Knowledge targets where useful.

### 9.1 Green — three rows

Reviewed source section: `4.6 Order Statistics`.

1. `4.6.expected-max-min`
   - `canonical-problem`;
   - Problem: `uniform-sample-extremes-and-range`;
   - Knowledge: `order-statistics-basics`, `joint-extremes-and-range`.

2. `4.6.correlation-max-min`
   - `canonical-problem`;
   - Problem: `joint-min-max-correlation-of-uniforms`;
   - Knowledge: `joint-extremes-and-range`, `expectation-variance-covariance-algebra`.

3. `4.6.random-ants`
   - `canonical-problem`;
   - Problem: `random-ants-last-fall-time`;
   - Knowledge: `order-statistics-basics`;
   - related technique/problem: collision relabeling / existing `ants-crossing-line`.

### 9.2 Red — two rows

Reviewed source section: `3.2.1 General Probability`.

1. `3.2.1::3.29`
   - `merged-duplicate`;
   - Problem: `uniform-sample-extremes-and-range`;
   - Knowledge: `order-statistics-basics`, `joint-extremes-and-range`;
   - resolution: same uniform max/min/range reasoning family as Green 4.6 expected max/min.

2. `3.2.1::3.32`
   - `canonical-problem`;
   - Problem: `kth-order-statistic-distribution`;
   - Knowledge: `order-statistics-basics`.

These Red items were explicitly left outside workstream 009 because their primary machinery is order statistics rather than ordinary expectation algebra.

### 9.3 150 Questions — reviewed, no new ownership

The relevant probability material is reviewed as part of the three-source ingestion discipline, but this bounded workstream does not invent a new 150 source row merely to make every source contribute a terminal claim.

Existing 150 rows already terminal in earlier workstreams retain their ownership. If implementation discovers a genuine previously unclaimed order-statistics source item, stop and amend this spec before claiming it.

## 10. Workstream registration

Create during implementation:

`src/data/quant-interview/workstreams/probability-statistics-order-statistics-extremes-010.json`.

Required fields follow existing workstream contracts:

- `id`;
- `canonicalTopics`;
- `status`;
- `verification` only after real evidence exists;
- three source scopes with bounded evidence ranges, `reviewOutcome`, and `reviewNote`.

Green scope must identify section 4.6 and all three approved labels. Red scope must identify section 3.2.1 and items 3.29 and 3.32. The 150 Questions scope must record the bounded review and its `reviewed-no-new-ownership` outcome.

The workstream remains `active` until its content-complete commit passes the full local gates and a real GitHub Actions run. Completion metadata must not be guessed or written in advance.

## 11. Graph links and ownership boundaries

The new nodes should join the existing public graph without changing earlier topic ownership:

- `order-statistics-basics` links reciprocally with the relevant probability foundations, common distributions, transformations, symmetry, and expectation-linearity Knowledge;
- `joint-extremes-and-range` links reciprocally with scalar expectation/variance/covariance algebra;
- `random-ants-last-fall-time` and the existing `ants-crossing-line` link to one another as related Problems;
- `ants-crossing-line` keeps its Logic / invariants canonical topics and does not become an Order Statistics Problem;
- existing pages do not gain `order-statistics-extremes` ownership merely because they are useful prerequisites.

## 12. Files and test contracts

Create during implementation:

- `tests/quant-interview-order-statistics-extremes-workstream.test.mjs`;
- `tests/quant-interview-order-statistics-extremes-content.test.mjs`;
- `tests/quant-interview-order-statistics-extremes-completion.test.mjs`;
- `.github/workflows/quant-interview-order-statistics-extremes-ci.yml` as temporary branch-only CI.

Update `tests/quant-interview-source-neutral-content.test.mjs` to discover and exactly enumerate the public corpus at **59 Problems / 39 Knowledge nodes**. Do not weaken the regression to “at least N.”

### 12.1 Workstream tests

Verify:

- exact workstream ID, topics, and three bounded source scopes;
- exact five-row ownership inventory;
- exact per-row state, canonical Problem targets, and canonical Knowledge targets;
- terminal state distribution `4 canonical-problem + 1 merged-duplicate`;
- nonempty resolution notes and real canonical targets;
- workstream and coverage validators pass with unresolved references forbidden;
- 150 Questions gains no Order Statistics row.

### 12.2 Content and graph tests

Verify:

- both Knowledge pages contain their required distribution identities, boundary conditions, and interview checks;
- all four Problems satisfy the existing S3+ source-neutral structure;
- the Uniform max/min/range, joint correlation, random-ants maximum, and kth-order formulas are explicitly regression-tested;
- the existing ant puzzle remains a distinct invariance Problem;
- every approved reciprocal graph edge exists without changing canonical topic ownership.

### 12.3 Completion tests

Verify that a completed workstream contains:

- a real 40-hex content-complete commit;
- a real positive GitHub Actions run ID;
- exact commands `npm run test`, `npm run check`, and `npm run build`;
- `conclusion: success`;
- a matching factual HANDOFF entry;
- exact corpus totals 59 Problems / 39 Knowledge nodes;
- the next bounded topic `Stochastic Processes & Stochastic Calculus -> Random Walks & Markov Chains`.

## 13. TDD and verification order

The implementation plan must enforce RED-to-GREEN steps for workstream registration, Knowledge, Problems, coverage, graph links, the exact global regression, and closure metadata.

Before the content-complete commit is pushed, run:

1. `npm run test`;
2. `npm run check`;
3. `npm run build`.

Push the content-complete commit to the named implementation branch, obtain a real successful GitHub Actions run for that exact SHA, and only then mark the workstream complete and update HANDOFF. Remove the temporary branch workflow before final handoff and run a fresh full local verification on the final tree.

## 14. Public source-neutrality and copyright boundary

Public Knowledge and Problems must not expose:

- book names as provenance;
- original chapter, section, question, or page numbers;
- source-specific ordering;
- source-shaped `problemId` values;
- copied source passages or answer keys.

Internal design, workstream, and coverage files may retain source names, item IDs, and page evidence for audit integrity. Public explanations must be independently formulated and independently derived.

## 15. Failure and rollback rules

### 15.1 Semantic collision

If implementation discovers that an approved new Problem is the same reasoning identity as an existing canonical Problem, stop creating it. Reclassify the source row as `variant` or `merged-duplicate`, revise the spec, plan, and exact corpus count, and preserve one public page.

### 15.2 Mathematical or coverage uncertainty

Do not publish an unchecked result or invent a canonical target. If ownership is genuinely unclear, leave the workstream `active` and amend the approved design before expanding scope.

### 15.3 Test or CI failure

Do not weaken validators or write fake evidence to make an incorrect tree appear complete. Fix the content, graph, coverage, metadata, or stale exact regression. If real CI is unavailable, leave the workstream active.

### 15.4 Scope and branch safety

Do not absorb stochastic-process, optimal-stopping, asymptotic extreme-value, covariance-matrix PSD, or unrelated probability material. Compare against the then-current durable base before integration, reconcile shared-file changes semantically, never force-push over other work, and do not touch `main`.

After integration, prefer corrective commits over history rewrites.

## 16. Completion gate

The workstream may be marked `complete` only when all of the following are true:

1. exactly two Knowledge pages and four Problem pages satisfy their content contracts;
2. exactly five approved source rows are terminal and explained;
3. the exact state split is four canonical Problems and one merged duplicate;
4. every claimed row resolves to the approved real public targets;
5. 150 Questions has no invented Order Statistics ownership;
6. reciprocal graph links exist while earlier topic ownership remains intact;
7. the exact source-neutral regression discovers 59 Problems and 39 Knowledge nodes;
8. strict workstream, content, and completion tests pass;
9. `npm run test`, `npm run check`, and `npm run build` pass;
10. topic-only diff review is clean;
11. a real CI run succeeds on the content-complete SHA;
12. the workstream stores factual verification metadata;
13. HANDOFF records the completed state and advances to Random Walks & Markov Chains;
14. temporary CI is removed and fresh closure verification passes.

No failed gate may be described as complete.

## 17. Branch and integration strategy

This design is committed on its docs-only spec branch. After written-spec approval and a writing-plans pass, implementation proceeds on `chatgpt/quant-interview-workstream-order-statistics-extremes-2026-08-23` while preserving the durable-base ancestry and the reviewed design history.

Do not touch `main`. At implementation finish, keep the verified feature branch available for the user's chosen safe integration path.

## 18. Next process gate

This document captures the fully approved design. The next gate after spec approval is the implementation plan; no product implementation belongs on the spec-only branch before those approvals exist.
