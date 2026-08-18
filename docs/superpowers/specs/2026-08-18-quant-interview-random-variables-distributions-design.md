# Quant Interview Random Variables & Distributions — Design Spec

Date: 2026-08-18  
Status: approved design, pre-implementation  
Workstream ID: `probability-statistics-random-variables-distributions-008`  
Base branch: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`  
Feature branch: `chatgpt/quant-interview-workstream-random-variables-distributions-2026-08-18`

## 1. Goal

Build the eighth bounded cross-book Quant Interview Knowledge workstream for:

- **Probability & Statistics**
- **Random Variables & Distributions**

The public corpus remains Topic-first and source-neutral. The three verified books remain internal evidence pools only. This workstream must fuse conceptually equivalent material across all three sources, preserve mathematically distinct reasoning families, and avoid consuming material whose primary identity belongs to later Probability & Statistics or Stochastic Processes workstreams.

The expected planning delta is:

- canonical Problems: **36 → 42**
- explicitly topic-classified Knowledge / Technique nodes: **28 → 33**

These are planning expectations only. They must never be used as quotas that force weak or duplicate public content.

## 2. Canonical topic boundary

### In scope

The primary mathematical identity must be one or more of:

- random variables and support;
- CDF, PMF, PDF and their relationships;
- discrete versus continuous random variables;
- common discrete distributions: discrete uniform, binomial, Poisson, geometric, negative binomial;
- common continuous distributions: continuous uniform, normal/Gaussian, exponential, gamma, beta, Cauchy where useful as a heavy-tail boundary case;
- identifying a distribution from its generative mechanism;
- memorylessness of the exponential distribution;
- competing independent exponential waiting times;
- transformation / pushforward of random variables through `Y = g(X)`;
- CDF-first derivation of transformed distributions;
- one-to-one and many-to-one density transformations;
- convolution for independent sums;
- support-aware integration bounds in convolution problems;
- Gaussian linear-closure structure;
- jointly normal versus merely marginally normal variables;
- the special implication `joint normal + zero covariance => independence`;
- lognormal variables through logarithmic transformation;
- sufficient conditions under which products of lognormal variables remain lognormal;
- law of large numbers;
- central limit theorem;
- convergence in probability versus convergence in distribution at interview level;
- MGF / characteristic-function intuition only when used to characterize or identify distributions rather than to compute moments as the main task.

### Explicitly out of scope

The following remain outside this bounded workstream unless a source item’s primary mathematical identity clearly belongs here:

- expectation puzzles and expected-value recursion;
- direct moment calculations such as `E[X^k]`, normal moments, `E[e^{lambda X}]` as expectation exercises;
- variance / covariance calculations whose primary task is moment algebra;
- conditional expectation and law of total expectation;
- order statistics, maxima/minima, kth-order-statistic density;
- random walks and Markov chains;
- general Poisson-process theory as a stochastic process;
- branching processes;
- martingales and stopping times;
- Brownian motion;
- Itô calculus, stochastic integrals, SDEs;
- change of measure / Girsanov;
- Monte Carlo importance sampling;
- geometric-probability tasks whose random variables are only a coordinate representation;
- previously canonicalized meeting-time and broken-stick geometric families.

## 3. Approved boundary decisions

Three ambiguous boundaries were explicitly resolved before implementation.

### 3.1 Poisson-process-wrapped bus problem

Approved choice: **include it in this workstream**, but only under the mathematical identity:

- exponential waiting time;
- exponential memorylessness;
- residual waiting time / age intuition.

The public canonical Problem must not become a general Poisson-process tutorial. The hidden resolution note must explicitly say that the source’s Poisson-process wrapper does **not** broaden this workstream into general stochastic-process coverage.

### 3.2 Normal moments and expectation-heavy MGF tasks

Approved choice: **exclude standalone normal-moment / expectation problems from this workstream**.

MGF may appear in Knowledge as a distribution-characterization tool, but Green normal-moment material and Red expectation-heavy Gaussian calculations remain owned by the next bounded topic:

**Probability & Statistics → Expectation, Variance & Covariance.**

### 3.3 LLN and CLT

Approved choice: **include LLN and CLT in this workstream’s Knowledge layer**.

The current taxonomy has no separate Limit Theorems topic. They belong here because they describe asymptotic behavior of distributions of sums and averages. They must be represented as reusable Knowledge / Interview Checks rather than inflated into standalone Problems merely to increase Problem count.

## 4. Public Knowledge architecture

Create exactly five canonical Knowledge responsibilities unless implementation evidence shows that one can be cleanly merged without losing clarity.

### 4.1 `random-variables-cdf-pmf-pdf`

Purpose: foundational representation of random variables and distribution functions.

Required content:

- random variable as a measurable numerical outcome at interview level;
- support;
- discrete versus continuous random variables;
- `F_X(x) = P(X <= x)`;
- PMF for discrete variables;
- PDF for continuous variables;
- `F_X(x) = integral f_X` and `f_X = F_X'` where differentiable;
- continuous point probabilities `P(X=x)=0`;
- interval probabilities from CDF differences;
- support-aware piecewise definitions;
- common CDF/PMF/PDF mistakes.

Required Interview Checks include:

- derive the CDF of `U(a,b)`;
- convert a simple piecewise CDF to a density;
- explain why a continuous density value can exceed 1 while total probability cannot;
- distinguish support, density, and probability mass.

### 4.2 `common-probability-distributions`

Purpose: recognize standard distributions from the mechanism that generates them.

Required families:

- discrete uniform;
- binomial;
- Poisson distribution;
- geometric;
- negative binomial;
- continuous uniform;
- normal;
- exponential;
- gamma;
- beta;
- Cauchy as a heavy-tail / moment-existence boundary example.

Required emphasis:

- recognition pattern before formula memorization;
- parameterization conventions;
- support;
- PMF/PDF shape;
- exponential memorylessness;
- geometric discrete memorylessness where helpful;
- Cauchy warning: symmetry and principal value do not imply a proper finite expectation;
- moments may be listed as supporting facts but moment derivation is not the workstream’s main responsibility.

Required Interview Checks include:

- identify a count of successes as binomial versus a count of events over time as Poisson;
- identify waiting-until-first-success as geometric;
- state the exponential density and memoryless property;
- explain why the Cauchy distribution is a useful counterexample to automatic moment assumptions.

### 4.3 `random-variable-transformations-convolution`

Purpose: derive distributions of functions and sums of random variables.

Required content:

- CDF-first method for `Y=g(X)`;
- monotone inverse-transform density formula;
- absolute Jacobian factor;
- multi-branch transformations such as `Y=X^2`;
- support transformation;
- independent-sum convolution;
- convolution support determines integration limits;
- distinction between transformation and convolution;
- product / ratio transformations as interview extensions.

Required Interview Checks include:

- derive the density of a monotone transform;
- explain why a many-to-one transform needs multiple inverse branches;
- derive the triangular density of a sum of two independent `U(0,1)` variables conceptually;
- identify wrong convolution bounds from support.

### 4.4 `gaussian-lognormal-structure`

Purpose: reusable Gaussian and lognormal structural reasoning.

Required content:

- affine transformation of a normal variable remains normal;
- linear combinations of jointly normal variables are normal;
- marginal normality alone does not imply joint normality;
- jointly normal variables with zero covariance are independent;
- decorrelation through linear transformation;
- standardization;
- lognormal definition through `log X` normal;
- product of independent lognormals is lognormal;
- more generally, joint normality of the log variables is sufficient;
- marginal lognormality alone is not sufficient for product closure.

Required Interview Checks include:

- construct an independent Gaussian linear combination from correlated jointly normal variables;
- distinguish uncorrelated from independent outside the joint-normal class;
- explain exactly what extra condition is needed for the product of two marginally lognormal variables to be lognormal.

### 4.5 `limit-theorems-lln-clt`

Purpose: interview-level asymptotics for sums and averages of random variables.

Required content:

- weak LLN;
- strong LLN;
- almost sure convergence versus convergence in probability;
- classical iid finite-variance CLT;
- standardization of sums / sample means;
- convergence in distribution;
- LLN answers where an average goes; CLT answers the fluctuation scale and limiting shape;
- CLT does not say the finite-sample distribution is exactly normal;
- finite-variance / independence assumptions for the classical form and awareness that generalizations exist;
- characteristic functions / MGFs may be mentioned as proof tools but no long proof is required.

Required Interview Checks include:

- distinguish LLN from CLT in one sentence each;
- state the scaling `sqrt(n)` correctly;
- distinguish convergence in probability from convergence in distribution;
- identify why a heavy-tailed infinite-variance setting may invalidate the classical CLT assumptions.

## 5. Canonical Problem set

Create six source-neutral, independently authored, S3+ Problems.

### 5.1 `exponential-race-probability`

Canonical family: competing independent exponential waiting times.

Core instance:

- independent exponential variables with means 6 and 8;
- calculate `P(Y > X)`;
- answer `4/7` using rates and competition logic.

Required generalization:

For independent exponentials with rates `lambda_X`, `lambda_Y`,

`P(Y > X) = lambda_X / (lambda_X + lambda_Y)`.

The solution should show at least one principled derivation and explain why the result depends on rates rather than means directly.

### 5.2 `exponential-memoryless-bus-wait`

Canonical family: memoryless residual waiting time.

Required content:

- bus waiting-time story may be used in source-neutral form;
- exponential inter-arrival time with mean 10 minutes;
- after arriving at a random time, the additional expected waiting time is 10 minutes under the exponential model;
- backward-age statement may be discussed carefully under the source’s stationary-arrival framing;
- explain the apparent 20-minute intuition trap;
- distinguish the exponential special case from the general renewal residual-life formula.

The page must not teach general Poisson-process theory beyond what is needed to interpret the waiting-time model.

### 5.3 `density-under-random-variable-transform`

Canonical family: distribution pushforward through `Y=g(X)`.

Required content:

- derive `F_Y` from the event `g(X) <= y`;
- monotone case;
- density formula with inverse and absolute derivative;
- at least one many-to-one variant or extension;
- support must be explicit.

The public page should teach the CDF-first method rather than presenting the Jacobian formula as an unexplained rule.

### 5.4 `sum-of-two-uniforms-triangular-density`

Canonical family: convolution with support-aware bounds.

Required result for independent `X,Y ~ U(0,1)`:

`f_{X+Y}(z) = z` for `0<z<1`, `2-z` for `1<=z<2`, and `0` otherwise.

Required reasoning:

- write convolution;
- derive admissible integration bounds from simultaneous support constraints;
- explain the geometric interpretation as line-intersection length in the unit square;
- normalize / sanity-check the resulting triangular density.

### 5.5 `joint-normal-quadrant-conditioning`

Canonical family: jointly normal decorrelation plus symmetry.

Required instance:

- `X,Y` mean zero, variance one, jointly normal;
- covariance `1/sqrt(2)`;
- calculate `P(X>0 | Y<0)`;
- answer `1/4`.

Required method:

- define `W = sqrt(2)X - Y`;
- show `W` is standard normal and uncorrelated with `Y`;
- invoke joint normality to obtain independence;
- convert the target event to a wedge / quadrant-symmetry argument;
- explicitly state that uncorrelated implies independent here **because of joint normality**, not in general.

### 5.6 `when-is-a-product-lognormal`

Canonical family: lognormal closure and dependence conditions.

Required content:

- if `X,Y` are independent lognormal, then `XY` is lognormal;
- logarithms turn the product into a sum;
- more generally, if `(log X, log Y)` is jointly normal, the sum is normal;
- merely knowing that each marginal is lognormal does not ensure the product is lognormal;
- explain the role of dependence / joint law.

This Problem must train model-assumption discipline rather than memorizing a closure slogan.

## 6. Source review and semantic ownership

### 6.1 Green source

Primary evidence scope: section 4.4, PDF pages approximately 102–108 in the verified source file.

Claim exactly two current-workstream rows:

1. `4.4::definitions-discrete-continuous-distributions`
   - state: `knowledge-only`
   - canonical Knowledge: `random-variables-cdf-pmf-pdf`, `common-probability-distributions`
   - public Interview Checks must preserve the useful source-derived tests.

2. `4.4::poisson-process-property`
   - state: `canonical-problem`
   - canonical Problem: `exponential-memoryless-bus-wait`
   - canonical Knowledge: `common-probability-distributions`
   - resolution note must explicitly limit ownership to exponential memorylessness / residual waiting time and reject general Poisson-process absorption.

Reviewed but not claimed in this workstream:

- meeting probability: remains geometric probability and already has a canonical family;
- broken-stick / triangle probability: geometric probability identity;
- normal moments: deferred to Expectation, Variance & Covariance;
- material beginning section 4.5: next bounded topic.

### 6.2 Red source

Primary evidence scope: Probability General items around PDF pages 95–96 and solutions around 120–128.

Claim exactly five rows:

1. `3.2.1::3.28`
   - `knowledge-only`
   - Uniform CDF / random-variable distribution-function reasoning.

2. `3.2.1::3.30`
   - `knowledge-only`
   - Cauchy / heavy-tail / moment-existence boundary.

3. `3.2.1::3.31`
   - `canonical-problem`
   - `density-under-random-variable-transform`.

4. `3.2.1::3.33`
   - `canonical-problem`
   - `sum-of-two-uniforms-triangular-density`.

5. `3.2.1::3.34`
   - `knowledge-only`
   - `limit-theorems-lln-clt`.

Reviewed but not claimed:

- 3.29 and 3.32: Order Statistics & Extremes;
- 3.35: already owned by covariance/PSD workstream;
- 3.36: change of measure / Monte Carlo / stochastic calculus;
- 3.37–3.38: expectation / Gaussian moment calculations;
- stochastic-process subsection: future stochastic workstreams.

### 6.3 150-question source

Primary evidence scope: Probability/Stochastic Calculus items around verified PDF pages 134–145.

Claim exactly seven rows:

1. `2.6::1`
   - `knowledge-only`
   - exponential distribution.

2. `2.6::2`
   - `canonical-problem`
   - `exponential-race-probability`.

3. `2.6::3`
   - `knowledge-only`
   - Poisson distribution as a random-variable distribution, not Poisson-process theory.

4. `2.6::5`
   - `canonical-problem`
   - `joint-normal-quadrant-conditioning`.

5. `2.6::6`
   - `canonical-problem`
   - `when-is-a-product-lognormal`.

6. `2.6::8`
   - `knowledge-only`
   - LLN.

7. `2.6::9`
   - `knowledge-only`
   - CLT.

Reviewed but not claimed:

- 2.6::4: expectation of distance in a disk;
- 2.6::7: expectation of `Phi(X)`; primarily an expectation / tower-property task;
- martingale, Brownian, quadratic variation, Itô, Wiener-process items: stochastic topics.

## 7. Hidden coverage invariants

The workstream expects exactly **14 claimed terminal source rows**:

- Green: 2
- Red: 5
- 150-question source: 7

Every claimed row must have:

- exact `sourceSection` and `sourceItem`;
- canonical topic `random-variables-distributions` (plus parent topic only if current ledger convention requires it);
- one terminal state from `canonical-problem`, `merged-duplicate`, `variant`, `knowledge-only`;
- a real canonical Knowledge and/or Problem target;
- nonempty `resolutionNote`;
- `topicOverrideReason` whenever item-level mathematical ownership overrides a coarse mapped source container;
- no generic deferred state.

`knowledge-only` is terminal only when a source-derived interview test is visibly preserved in the public Knowledge node’s `Interview Checks` or an equivalent public self-test.

Items reviewed and rejected from current ownership should be named in the workstream review notes so later Agents do not re-audit them blindly, but they must not be falsely marked as current-topic terminal coverage.

## 8. Cross-book dedup rules

Semantic identity, not wording similarity, controls deduplication.

Required fusions:

- Green distribution tables + Red Uniform/Cauchy checks + 150 Exponential/Poisson definitions enrich shared canonical Knowledge instead of creating source-specific pages.
- Red CLT + 150 CLT become one `limit-theorems-lln-clt` Knowledge node.
- 150 LLN enriches the same limit-theorem node.
- Green exponential memorylessness and 150 exponential definition share Knowledge, but `exponential-memoryless-bus-wait` and `exponential-race-probability` remain separate Problems because their reasoning identities differ.
- Red transformation and convolution remain separate Problems: pushforward/Jacobian reasoning is not the same as convolution of independent sums.
- joint-normal conditioning and lognormal product closure remain separate Problems even though both depend on Gaussian structure.

Do not create source-named or source-numbered duplicate pages.

## 9. Public source-neutral contract

No public Problem or Knowledge page may expose:

- source book names;
- source question numbers;
- source PDF page numbers;
- source-specific IDs;
- provenance or coverage notes;
- hidden semantic-dedup state;
- internal evidence ranges.

Public IDs and routes must remain canonical and topic-oriented.

## 10. TDD and execution order

Implementation must follow the existing workstream discipline.

### Step 1 — Registration RED

Add workstream-registration contract tests first. They should fail only because `probability-statistics-random-variables-distributions-008.json` does not yet exist.

### Step 2 — Registration GREEN

Create only the bounded machine-readable workstream registration with source scopes, evidence ranges, and item-level review notes. Do not author Knowledge or Problems yet.

Run the relevant tests.

### Step 3 — Knowledge RED

Add content-contract tests for all five Knowledge responsibilities. Tests should fail because the files do not yet exist or lack required content.

### Step 4 — Knowledge GREEN

Create the five Knowledge nodes and visible Interview Checks.

Run:

- `npm run test`
- `npm run check`
- `npm run build`

### Step 5 — Problem RED

Add content-contract tests for all six canonical Problems before creating them.

### Step 6 — Problem GREEN

Create all six source-neutral, solved, S3+ Problems.

Run the full test/check/build checkpoint.

### Step 7 — Coverage RED

Add coverage tests that require exactly the approved 14 rows, semantic ownership, Knowledge-only public self-tests, and boundary-specific notes.

### Step 8 — Coverage GREEN

Reconcile only the three hidden coverage ledgers. If a temporary branch-only mutator is needed, it must be tightly scoped, run tests before committing ledgers, and be deleted before final diff review.

### Step 9 — Global source-neutral regression

Update the exact public corpus enumeration.

Planning expectation if the approved architecture remains unchanged:

- Problems: 36 → 42
- Knowledge / Technique nodes: 28 → 33

Do not force these numbers if implementation reveals a legitimate semantic merge.

### Step 10 — Completion RED / GREEN

Add and satisfy completion tests requiring:

- workstream `status: complete`;
- real successful CI evidence;
- all 14 claimed rows terminal and resolved;
- HANDOFF records 5 Knowledge nodes, 6 Problems, 14 rows, dedup boundaries, and source-neutral state;
- next bounded topic becomes **Probability & Statistics → Expectation, Variance & Covariance**.

### Step 11 — Final verification

Fresh verification must run:

- `npm run test`
- `npm run check`
- `npm run build`

A passing earlier checkpoint is not sufficient for a completion claim after later changes.

### Step 12 — Topic-only diff review

Compare against the completed integration branch after workstream 007.

Allowed differences are limited to:

- this workstream’s spec and implementation plan;
- machine-readable workstream 008;
- the five Knowledge nodes;
- six Problems;
- three coverage ledgers;
- source-neutral regression;
- workstream-specific tests;
- durable HANDOFF;
- temporary branch-only verification tooling only while needed, deleted before final handoff.

No unrelated Home, Projects, UI, deployment, or other-topic refactor belongs in this workstream.

## 11. Completion definition

Workstream 008 is complete only when all of the following are true:

1. The machine-readable workstream is `status: complete` and contains real successful verification evidence.
2. The five Knowledge responsibilities are public, source-neutral, and contain the required Interview Checks.
3. All six canonical Problems are independently authored, solved, source-neutral, and S3+.
4. Exactly 14 claimed source rows are terminal, explained, and resolve to real canonical targets.
5. LLN and CLT are fused into one reusable Knowledge node rather than duplicate source pages.
6. Poisson-process-wrapped bus material remains bounded to exponential memorylessness and does not absorb general stochastic-process theory.
7. Normal-moment and expectation-heavy tasks remain outside current ownership.
8. Order-statistic tasks remain outside current ownership.
9. Existing geometric-probability Problems are not duplicated merely because source editorial placement is inside a distributions chapter.
10. Public source-neutral regression remains green.
11. `npm run test`, `npm run check`, and `npm run build` all succeed on the closure tree.
12. HANDOFF names **Expectation, Variance & Covariance** as the next bounded topic.
13. Topic-only diff contains no unrelated changes.
14. Temporary CI / mutator tooling is removed before final branch handoff.

## 12. Next bounded topic after completion

After this workstream closes, the durable next target is:

**Probability & Statistics → Expectation, Variance & Covariance.**

The next Agent must not reopen Random Variables & Distributions merely because later source questions reuse Gaussian, exponential, or distribution notation. Ownership is determined by the primary reasoning identity of each source item.
