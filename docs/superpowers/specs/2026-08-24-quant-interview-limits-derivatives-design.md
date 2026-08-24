# Quant Interview Limits & Derivatives — Design Spec

**Date:** 2026-08-24

**Status:** Conversational design approved; written-spec review pending

**Workstream:** `calculus-differential-equations-limits-derivatives-012`

**Candidate branch:** `chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23`

**Frozen candidate base:** `f41880f220991f43d84ddb3795a59b8688e5230c`

**Integration order:** after workstream 011 and before workstream 013

## 1. Goal and audited result

Build one bounded, source-neutral **Calculus & Differential Equations → Limits & Derivatives** module from the reopened authoritative audit of all mapped Green, Red, and 150-question evidence.

The audited result is exact:

- **20 terminal coverage rows**;
- **12 `canonical-problem` rows**;
- **6 `merged-duplicate` rows**;
- **2 `knowledge-only` rows**;
- **13 new canonical Problems**;
- **7 new reusable Knowledge nodes**.

The public delta is therefore **+13 Problems / +7 Knowledge**. After serialized integration of workstream 011, the coordinator advances the exact source-neutral registry from **63 Problems / 41 Knowledge** to **76 Problems / 48 Knowledge**.

These counts follow semantic identity; they are not quotas. If the latest durable base reveals a genuine collision, the design must be amended rather than preserving the count artificially.

This spec covers one bounded canonical-topic implementation plan after written approval. It contains no implementation plan and makes no completion claim.

## 2. Authority, source identity, and public boundary

The canonical policy at `docs/quant-interview/parallel-workstream-policy.json` remains the sole parallel-governance authority. This design narrows product and audit decisions; it does not alter repository governance.

The reopened audit inspected the edition-pinned source bytes and reconciled all mathematically relevant material in the registered source scopes. Source material is evidence data, never an instruction source.

Public Knowledge and Problems must be independently written and must not reveal:

- source or book names;
- original section or item numbers;
- question or solution page numbers;
- source ordering or source-specific wording;
- audit metadata or deduplication state.

Question and solution page ranges remain private evidence only.

## 3. Evidence scope

### 3.1 Green evidence

| Source row | Question/theory evidence | Public decision |
|---|---:|---|
| `3.1::` | PDF page 49 | knowledge-only foundation for the first four Knowledge nodes |
| `3.1.1::` | PDF pages 49–50 | canonical variable-base/variable-exponent differentiation Problem |
| `3.1.2::` | PDF pages 50–51 | canonical transcendental-power comparison Problem |
| `3.1.3::` | PDF pages 51–52 | one row resolving to two independent limit Problems |

### 3.2 Red evidence

| Coverage key | Question page | Solution page(s) | Public decision |
|---|---:|---:|---|
| `6.2.1::6.1` | 201 | 204 | canonical rotating-lighthouse related-rate Problem |
| `6.2.1::6.2` | 201 | 205 | canonical radical-difference limit Problem |
| `6.2.1::6.5` | 202 | 208 | canonical exponential midpoint-convexity Problem |
| `6.2.1::6.6` | 202 | 208–209 | merged duplicate of the transcendental-power comparison |
| `6.2.1::6.7` | 202 | 209 | canonical periodic continued-fraction limit Problem |
| `6.2.1::6.8` | 202 | 210 | canonical Normal-CDF inflection Problem |
| `6.2.1::6.16` | 202 | 220 | merged duplicate of the positive-series classification |
| `6.2.2::6.18` | 203 | 222–223 | merged duplicate of variable-base/variable-exponent differentiation |
| `6.2.2::6.20` | 203 | 224–225 | canonical derivative-from-definition Problem |
| `6.2.2::6.21` | 203 | 225 | knowledge-only derivative rules |

Adjacent Red material in registered sections was reviewed. Unclaimed items are `reviewed-no-new-ownership` or out of the bounded topic. Existing Red Q6.9 and Q6.10 ownership remains intact; workstream 012 must not change, duplicate, or re-own those rows.

### 3.3 150-question evidence

All six claimed questions occur on PDF page 27.

| Coverage key | Solution page(s) | Public decision |
|---|---:|---|
| `2.1::2` | 50–51 | merged duplicate of the transcendental-power comparison |
| `2.1::3` | 51 | merged duplicate of exponential midpoint convexity |
| `2.1::5` | 52 | merged duplicate of variable-base/variable-exponent differentiation |
| `2.1::6` | 52–53 | canonical nested-radical limit Problem |
| `2.1::7` | 53–55 | canonical infinite power-tower limit Problem |
| `2.1::8` | 55–57 | canonical positive-series classification Problem |

The surrounding registered sections on PDF pages 11–12, 27–28, and 50–65 were reviewed. Material outside the six claimed items is `reviewed-no-new-ownership` or out of scope; no synthetic coverage row is created.

## 4. Exact scope and non-goals

### 4.1 Included

- The single-variable derivative as a limit.
- Linearity, product, quotient, chain, fixed-power, generalized-power, exponential, logarithmic, and elementary trigonometric derivative rules with their hypotheses.
- Logarithmic differentiation for positive variable-base/variable-exponent functions.
- Implicit differentiation and elementary related rates.
- Critical points, monotonicity, convexity/concavity, and inflection analysis.
- Elementary indeterminate limits and L'Hôpital's rule with its full gate conditions.
- Bounded monotone convergence of real sequences before fixed-point identification.
- Elementary positive-series convergence by partial sums, geometric comparison, dyadic grouping, and the term test.
- Exactly the 13 canonical Problem identities in Section 6.

### 4.2 Excluded

- General integration theory, integration techniques, and an integral-test prerequisite for series.
- Multivariable calculus, Taylor expansions, Newton methods, general numerical optimization, ODEs, and complex analysis.
- Probability convergence, LLN, CLT, martingales, and stochastic limits.
- Financial derivatives, option pricing, Greeks, Black–Scholes, and PDEs.
- Any Taylor-series derivation for the exponential-cosine derivative Problem.
- Optional cross-topic graph edits to previously completed public pages.
- New public pages for merged duplicates or for adjacent reviewed material with no new canonical identity.

## 5. Knowledge architecture

Exactly seven Knowledge nodes are justified. They separate reusable mathematical roles rather than mirroring source headings:

1. derivative definition and core rules;
2. logarithmic differentiation;
3. monotonicity, convexity, critical points, and inflection;
4. indeterminate limits and deterministic growth rates;
5. related rates and implicit differentiation;
6. bounded monotone convergence and fixed points;
7. positive-series convergence.

All seven use:

```yaml
date: 2026-08-24
type: concept
domain: Mathematics & Statistics
status: growing
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
featured: false
```

Every page must include applicable domain conditions, derivations or proofs, recognition signals, realistic Common Mistakes, and public Interview Checks.

### 5.1 `derivative-definition-and-core-rules`

**Title:** Derivative Definition and Core Rules

**Category:** Calculus

Required content:

- the difference quotient

  \[
  f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h};
  \]

- differentiability implies continuity, not conversely;
- one-sided and endpoint boundaries;
- linearity, product, quotient, and chain rules, with denominator conditions;
- fixed-power and generalized-power rules with real-domain conditions;
- elementary exponential, logarithmic, sine, cosine, and tangent derivatives;
- the standard limits used by derivative-from-definition arguments.

```yaml
related: [logarithmic-differentiation, monotonicity-convexity-critical-points-and-inflection, indeterminate-limits-and-growth-rates, related-rates-and-implicit-differentiation]
```

### 5.2 `logarithmic-differentiation`

**Title:** Logarithmic Differentiation

**Category:** Problem Solving Techniques

The domain contract is exact. Let $I$ be an interval, let

\[
u:I\to(0,\infty)
\]

be differentiable, and let $v:I\to\mathbb R$ also be differentiable. For

\[
y(x)=u(x)^{v(x)},
\]

derive

\[
\log y=v\log u,
\qquad
\boxed{
y'=u^v\left(v'\log u+v\frac{u'}{u}\right)
}.
\]

The page must explain why both differentiability assumptions are required, why $u>0$ is required for this real-valued formula, how logarithms linearize products and quotients, how to restore the factor $y$, and why zero or negative bases require separate analysis.

```yaml
related: [derivative-definition-and-core-rules]
```

### 5.3 `monotonicity-convexity-critical-points-and-inflection`

**Title:** Monotonicity, Convexity, Critical Points, and Inflection

**Category:** Calculus

This replaces the earlier narrower proposed slug. Required content:

- critical numbers where (f'=0) or (f') is undefined at a domain point;
- first-derivative sign charts and increasing/decreasing intervals;
- local versus global extrema and closed-interval endpoint checks;
- (f''>0) and (f''<0) at a critical point as local tests;
- **(f''=0) is inconclusive**;
- convexity/concavity from the sign of (f'');
- an inflection point requires an actual concavity change, not merely (f''=0);
- midpoint convexity for the exponential function;
- the Normal-CDF example with the correct density and a verified sign change of (F'').

```yaml
related: [derivative-definition-and-core-rules]
```

### 5.4 `indeterminate-limits-and-growth-rates`

**Title:** Indeterminate Limits and Growth Rates

**Category:** Calculus

Required content:

- indeterminate forms versus determined limiting behavior;
- algebraic simplification, rationalization, standard limits, and substitutions before L'Hôpital;
- standard limits

  \[
  \lim_{x\to0}\frac{\sin x}{x}=1,
  \qquad
  \lim_{x\to0}\frac{e^x-1}{x}=1,
  \qquad
  \lim_{x\to0}\frac{\log(1+x)}{x}=1;
  \]

- the exact L'Hôpital gate: differentiability on the appropriate punctured neighborhood, $g'\ne0$, a `0/0` or extended-real infinity-over-infinity form, and existence of the required ordinary or extended-real derivative-quotient limit;
- renewed checks before repeated applications;
- the logarithm–power–exponential growth hierarchy in its valid positive-tail regime;
- the signed identity $x^a\log x\to0^-$ as $x\to0^+$ for $a>0$.

```yaml
related: [derivative-definition-and-core-rules, bounded-monotone-convergence-and-fixed-points, positive-series-convergence]
```

### 5.5 `related-rates-and-implicit-differentiation`

**Title:** Related Rates and Implicit Differentiation

**Category:** Problem Solving Techniques

Required content:

- treat all changing quantities as functions of time before differentiating;
- differentiate an implicit constraint with the chain rule;
- retain units and signs;
- solve for the requested rate only after differentiating;
- distinguish a geometric coordinate from its speed;
- model a beam hitting a line at perpendicular distance $a>0$ by $x=a\tan\theta$, with the domain condition $\cos\theta\ne0$.

```yaml
related: [derivative-definition-and-core-rules]
```

### 5.6 `bounded-monotone-convergence-and-fixed-points`

**Title:** Bounded Monotone Convergence and Fixed Points

**Category:** Calculus

Required content:

- a bounded monotone real sequence converges;
- invariant intervals and induction establish bounds;
- monotonicity may require splitting even and odd subsequences for an alternating recurrence;
- only **after convergence is proved** may continuity pass a recurrence to a fixed-point equation;
- a fixed-point equation gives candidates, not convergence;
- admissible bounds, signs, or the proved invariant interval select among multiple roots;
- explicit warnings for the continued fraction, nested radical, and power tower.

```yaml
related: [indeterminate-limits-and-growth-rates]
```

### 5.7 `positive-series-convergence`

**Title:** Positive-Series Convergence

**Category:** Calculus

Required content:

- convergence through bounded increasing partial sums for nonnegative terms;
- the necessary term test $a_n\to0$, with the warning that it is not sufficient;
- finite geometric sums and the infinite geometric criterion;
- direct comparison;
- harmonic-series divergence by dyadic grouping;
- the positive (p)-series classification by dyadic blocks or Cauchy condensation;
- no proof that silently depends on integration or the integral test.

For $p>1$, dyadic blocks give an upper bound proportional to

\[
2^{k(1-p)},
\]

which forms a convergent geometric series. For $0<p\le1$, comparison with the harmonic series gives divergence; for $p\le0$, the terms do not tend to zero.

```yaml
related: [indeterminate-limits-and-growth-rates]
```

## 6. Exact public Problem contracts

Create all 13 Problems under `src/content/problems/calculus/`. YAML titles must be plain text; mathematical notation belongs in the rendered body. In particular, Problem 002 uses the exact YAML title **Compare Two Transcendental Powers**, not a title containing `e^pi`, `pi^e`, or TeX.

All Problems use:

```yaml
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
status: solved
featured: false
```

Every page must be independently written and S3+ with `## Problem`, `## Think Before Revealing`, at least two progressive hints, a `Show Solution` disclosure containing `## Solution`, `## Why This Matters`, `## Common Mistakes`, and `## Extensions`.

### 6.1 `differentiate-variable-base-and-exponent`

```yaml
problemId: limits-derivatives-001
title: Differentiate a Variable Base and Exponent
subcategories: [Derivatives, Logarithmic Differentiation]
concepts: [derivative-definition-and-core-rules]
techniques: [logarithmic-differentiation]
prerequisites: []
relatedProblems: [derive-exponential-cosine-derivative-from-definition]
family: variable-base-variable-exponent
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
```

For differentiable $u:I\to(0,\infty)$ and differentiable $v:I\to\mathbb R$, derive

\[
\boxed{
\frac{d}{dx}u(x)^{v(x)}
=u(x)^{v(x)}
\left(v'(x)\log u(x)+v(x)\frac{u'(x)}{u(x)}\right)
}.
\]

Then apply it to

\[
y=(\log x)^{\log x},\qquad x>1,
\]

and obtain

\[
\boxed{
y'=\frac{(\log x)^{\log x}}{x}\left(\log\log x+1\right)
}.
\]

The page must state both differentiability assumptions and the positivity/domain requirements before taking logarithms.

### 6.2 `compare-e-pi-power-expressions`

```yaml
problemId: limits-derivatives-002
title: Compare Two Transcendental Powers
subcategories: [Derivatives, Monotonicity, Inequalities]
concepts: [monotonicity-convexity-critical-points-and-inflection]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [exponential-midpoint-convexity]
family: exponential-inequalities
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
```

The body asks whether $e^\pi$ or $\pi^e$ is larger. For

\[
f(x)=\frac{\log x}{x},
\qquad
f'(x)=\frac{1-\log x}{x^2},
\]

prove that $f$ increases on $(0,e)$, decreases on $(e,\infty)$, and reaches its global maximum at $e$. Since $e<\pi$,

\[
\frac{\log\pi}{\pi}<\frac1e
\Longrightarrow
e\log\pi<\pi
\Longrightarrow
\boxed{e^\pi>\pi^e}.
\]

The first-derivative interval sign test is the proof. A second derivative may be a local check, but (f''=0) is explicitly inconclusive without a sign change.

### 6.3 `exponential-over-polynomial-limit`

```yaml
problemId: limits-derivatives-003
title: Exponential Growth over a Polynomial
subcategories: [Limits, Asymptotic Growth]
concepts: [indeterminate-limits-and-growth-rates]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [logarithm-power-limit-at-zero]
family: deterministic-growth-rate-limits
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
```

After checking the infinity-over-infinity form and the L'Hôpital hypotheses on a positive tail, recheck the form and apply the rule twice:

\[
\lim_{x\to\infty}\frac{e^x}{x^2}
=\lim_{x\to\infty}\frac{e^x}{2x}
=\lim_{x\to\infty}\frac{e^x}{2}
=\boxed{\infty}.
\]

### 6.4 `logarithm-power-limit-at-zero`

```yaml
problemId: limits-derivatives-004
title: A Logarithm-Power Limit at Zero
subcategories: [Limits, Asymptotic Growth]
concepts: [indeterminate-limits-and-growth-rates]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [exponential-over-polynomial-limit]
family: deterministic-growth-rate-limits
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
```

Rewrite

\[
\lim_{x\to0^+}x^2\log x
\]

as $\log x/x^{-2}$, check the one-sided L'Hôpital gate, and derive

\[
\frac{1/x}{-2x^{-3}}=-\frac{x^2}{2}\to0.
\]

Because the expression is negative for (0<x<1), record

\[
\boxed{0^-},
\]

meaning zero approached from below.

### 6.5 `rotating-lighthouse-beam-related-rate`

```yaml
problemId: limits-derivatives-005
title: Rotating Lighthouse Beam Related Rate
subcategories: [Derivatives, Related Rates, Geometry]
concepts: [derivative-definition-and-core-rules]
techniques: [related-rates-and-implicit-differentiation]
prerequisites: []
relatedProblems: []
family: geometric-related-rates
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
```

A lighthouse is perpendicular distance $a>0$ from a straight shore. If $\theta$ is the beam angle from the perpendicular and $x$ is the signed shore coordinate, model

\[
x=a\tan\theta.
\]

For differentiable $\theta(t)$ with $\cos\theta\ne0$, derive

\[
\boxed{
\frac{dx}{dt}=a\sec^2\theta\frac{d\theta}{dt}
}.
\]

The solution must keep units and sign conventions explicit and distinguish angular rate from the beam spot's linear speed.

### 6.6 `radical-difference-limit-at-infinity`

```yaml
problemId: limits-derivatives-006
title: Radical Difference at Infinity
subcategories: [Limits, Rationalization]
concepts: [indeterminate-limits-and-growth-rates]
techniques: []
prerequisites: []
relatedProblems: []
family: algebraic-limit-transformations
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
```

Evaluate by rationalization:

\[
\sqrt{x^2+x}-x
=\frac{x}{\sqrt{x^2+x}+x}
=\frac{1}{\sqrt{1+1/x}+1}.
\]

Therefore

\[
\boxed{
\lim_{x\to\infty}(\sqrt{x^2+x}-x)=\frac12
}.
\]

The page must reject the invalid subtraction of two separate infinite limits.

### 6.7 `exponential-midpoint-convexity`

```yaml
problemId: limits-derivatives-007
title: Exponential Midpoint Convexity
subcategories: [Derivatives, Convexity, Inequalities]
concepts: [monotonicity-convexity-critical-points-and-inflection]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [compare-e-pi-power-expressions]
family: exponential-inequalities
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 3
estimatedMinutes: 10
```

For real (a,b), prove

\[
\boxed{
\frac{e^a+e^b}{2}\ge e^{(a+b)/2}
},
\]

with equality exactly when $a=b$. The primary calculus method may use $f''(x)=e^x>0$, but it must explain how strict convexity yields the equality condition. AM–GM may appear as an independent alternate method.

### 6.8 `periodic-continued-fraction-limit`

```yaml
problemId: limits-derivatives-008
title: Periodic Continued-Fraction Limit
subcategories: [Limits, Sequences, Fixed Points]
concepts: [bounded-monotone-convergence-and-fixed-points]
techniques: []
prerequisites: []
relatedProblems: [nested-radical-limit, infinite-power-tower-limit]
family: recursive-sequence-limits
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 4
estimatedMinutes: 15
```

For the finite convergents

\[
x_1=1,
\qquad
x_{n+1}=1+\frac1{x_n},
\]

prove convergence before taking a fixed point. A valid proof may show that odd and even subsequences are monotone, bounded, and have the same limit, or may identify $x_n$ as a ratio of consecutive Fibonacci numbers with a proved ratio limit.

Only after convergence is established may the solution use

\[
L=1+\frac1L.
\]

Positivity rejects the negative root, giving

\[
\boxed{L=\frac{1+\sqrt5}{2}}.
\]

### 6.9 `normal-cdf-inflection-point`

```yaml
problemId: limits-derivatives-009
title: Inflection Point of a Normal CDF
subcategories: [Derivatives, Convexity, Probability Functions]
concepts: [monotonicity-convexity-critical-points-and-inflection, derivative-definition-and-core-rules]
techniques: []
prerequisites: []
relatedProblems: []
family: curvature-and-inflection
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 3
estimatedMinutes: 10
```

Let $F$ be the CDF of a Normal distribution with mean $\mu\in\mathbb R$ and standard deviation $\sigma>0$. The page must state the correct density

\[
F'(x)
=\frac{1}{\sigma\sqrt{2\pi}}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right),
\]

and derive

\[
F''(x)
=-\frac{x-\mu}{\sigma^3\sqrt{2\pi}}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right).
\]

Thus $F''>0$ for $x<\mu$ and $F''<0$ for $x>\mu$. The actual sign change, not merely $F''(\mu)=0$, proves

\[
\boxed{x=\mu\text{ is the unique inflection point}}.
\]

### 6.10 `derive-exponential-cosine-derivative-from-definition`

```yaml
problemId: limits-derivatives-010
title: Derive an Exponential-Cosine Derivative from the Definition
subcategories: [Derivatives, First Principles]
concepts: [derivative-definition-and-core-rules]
techniques: []
prerequisites: []
relatedProblems: [differentiate-variable-base-and-exponent]
family: derivative-from-definition
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
```

Starting from the difference quotient, derive the derivative of

\[
f(x)=e^x\cos x
\]

using only algebra, angle addition, continuity, and the standard limits

\[
\lim_{h\to0}\frac{e^h-1}{h}=1,
\qquad
\lim_{h\to0}\frac{\sin h}{h}=1,
\qquad
\lim_{h\to0}\frac{\cos h-1}{h}=0.
\]

The result is

\[
\boxed{f'(x)=e^x(\cos x-\sin x)}.
\]

The proof must not invoke Taylor series and must not assume the product rule as the derivation of the target expression.

### 6.11 `nested-radical-limit`

```yaml
problemId: limits-derivatives-011
title: Nested-Radical Limit
subcategories: [Limits, Sequences, Fixed Points]
concepts: [bounded-monotone-convergence-and-fixed-points]
techniques: []
prerequisites: []
relatedProblems: [periodic-continued-fraction-limit, infinite-power-tower-limit]
family: recursive-sequence-limits
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
```

For

\[
a_1=\sqrt2,
\qquad
a_{n+1}=\sqrt{2+a_n},
\]

prove by induction that the sequence is increasing and bounded above by (2). Only then pass to

\[
L=\sqrt{2+L}.
\]

Positivity rejects the root (-1), yielding

\[
\boxed{L=2}.
\]

### 6.12 `infinite-power-tower-limit`

```yaml
problemId: limits-derivatives-012
title: Infinite Power-Tower Limit
subcategories: [Limits, Sequences, Fixed Points]
concepts: [bounded-monotone-convergence-and-fixed-points]
techniques: []
prerequisites: []
relatedProblems: [periodic-continued-fraction-limit, nested-radical-limit]
family: recursive-sequence-limits
mathDifficulty: 3
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 15
```

Define finite towers by

\[
t_1=\sqrt2,
\qquad
t_{n+1}=(\sqrt2)^{t_n}.
\]

Prove first that $t_n$ is increasing and bounded above by $2$. Then continuity gives

\[
L=(\sqrt2)^L.
\]

Both $2$ and $4$ solve the fixed-point equation, so the equation alone does not identify the tower limit. The proved bound $L\le2$ rejects the larger branch $4$, and the solution concludes

\[
\boxed{L=2}.
\]

### 6.13 `classify-basic-positive-series`

```yaml
problemId: limits-derivatives-013
title: Classify Basic Positive Series
subcategories: [Limits, Series, Convergence]
concepts: [positive-series-convergence]
techniques: []
prerequisites: []
relatedProblems: []
family: positive-series-convergence
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
```

Classify and justify:

1. the nonnegative geometric series $\sum_{n=0}^{\infty}r^n$ for $r\ge0$;
2. the harmonic series $\sum_{n=1}^{\infty}1/n$;
3. the positive $p$-series $\sum_{n=1}^{\infty}1/n^p$.

The exact conclusions are:

\[
\boxed{
\sum_{n=0}^{\infty}r^n
\text{ converges exactly when }0\le r<1,
\text{ with sum }\frac1{1-r}
},
\]

\[
\boxed{
\sum_{n=1}^{\infty}\frac1n\text{ diverges}
},
\]

and

\[
\boxed{
\sum_{n=1}^{\infty}\frac1{n^p}
\text{ converges exactly when }p>1
}.
\]

Use finite geometric sums, dyadic grouping, and direct comparison. No method may hide integration or the integral test as an undeclared prerequisite.

## 7. Public graph decision

The graph remains bounded to the seven new Knowledge nodes and 13 new Problems:

- the core derivative node links to logarithmic differentiation, qualitative derivative analysis, indeterminate limits, and related rates;
- the limits node links to the two convergence-focused Knowledge nodes;
- each Problem links only to the new Knowledge it genuinely uses;
- the exponential inequality Problems are reciprocal `relatedProblems`;
- the two elementary growth-rate Problems are reciprocal `relatedProblems`;
- the continued-fraction, nested-radical, and power-tower Problems form a reciprocal three-Problem convergence/fixed-point family;
- the two complementary derivative Problems are reciprocal `relatedProblems`.

Do not add or require reciprocal edits to pre-existing MGF, random-variable-transformation, probabilistic-limit, financial-derivative, option, or Greek pages merely for adjacency. No pre-existing public Knowledge or Problem page is modified by workstream 012.

## 8. Exact terminal coverage contract

Every one of the following 20 rows has exactly

```json
"canonicalTopics": ["limits-derivatives"]
```

and the exact targets below. The quoted resolution note is the required nonempty semantic decision; wording may receive punctuation-only normalization but must not lose any stated boundary.

| Source/key | State | `canonicalProblems` | `canonicalKnowledge` | Resolution note |
|---|---|---|---|---|
| Green `3.1::` | `knowledge-only` | `[]` | `[derivative-definition-and-core-rules, logarithmic-differentiation, monotonicity-convexity-critical-points-and-inflection, indeterminate-limits-and-growth-rates]` | Reusable derivative definitions and rules, logarithmic differentiation, qualitative derivative analysis, and elementary limit theory are fused into four public Knowledge nodes with visible Interview Checks. |
| Green `3.1.1::` | `canonical-problem` | `[differentiate-variable-base-and-exponent]` | `[derivative-definition-and-core-rules, logarithmic-differentiation]` | The canonical Problem derives the positive variable-base/variable-exponent rule and applies it to the log-power case with its real domain stated explicitly. |
| Green `3.1.2::` | `canonical-problem` | `[compare-e-pi-power-expressions]` | `[monotonicity-convexity-critical-points-and-inflection, derivative-definition-and-core-rules]` | The canonical comparison uses the sign of the first derivative on full intervals; a second derivative is only a local check and zero is inconclusive without a sign change. |
| Green `3.1.3::` | `canonical-problem` | `[exponential-over-polynomial-limit, logarithm-power-limit-at-zero]` | `[indeterminate-limits-and-growth-rates, derivative-definition-and-core-rules]` | One source row contains two independent limit identities, so it resolves to two Problems; both enforce the L'Hôpital gate and the origin limit preserves its approach from below. |
| Red `6.2.1::6.1` | `canonical-problem` | `[rotating-lighthouse-beam-related-rate]` | `[related-rates-and-implicit-differentiation, derivative-definition-and-core-rules]` | This is the canonical geometric related-rate identity linking angular velocity to the signed linear speed of a beam spot on a line. |
| Red `6.2.1::6.2` | `canonical-problem` | `[radical-difference-limit-at-infinity]` | `[indeterminate-limits-and-growth-rates]` | The canonical Problem rationalizes a difference of divergent radicals and preserves the finite one-half limit instead of subtracting infinities. |
| Red `6.2.1::6.5` | `canonical-problem` | `[exponential-midpoint-convexity]` | `[monotonicity-convexity-critical-points-and-inflection]` | The canonical Problem proves exponential midpoint convexity and records equality exactly at equal endpoints. |
| Red `6.2.1::6.6` | `merged-duplicate` | `[compare-e-pi-power-expressions]` | `[monotonicity-convexity-critical-points-and-inflection, derivative-definition-and-core-rules]` | This asks the same transcendental-power comparison as the Green item and is absorbed into one source-neutral monotonicity Problem. |
| Red `6.2.1::6.7` | `canonical-problem` | `[periodic-continued-fraction-limit]` | `[bounded-monotone-convergence-and-fixed-points]` | The canonical continued-fraction Problem proves convergence of finite convergents before using the positive fixed point. |
| Red `6.2.1::6.8` | `canonical-problem` | `[normal-cdf-inflection-point]` | `[monotonicity-convexity-critical-points-and-inflection, derivative-definition-and-core-rules]` | The canonical Problem differentiates the Normal CDF with sigma positive and proves the unique inflection through an actual sign change of the second derivative. |
| Red `6.2.1::6.16` | `merged-duplicate` | `[classify-basic-positive-series]` | `[positive-series-convergence]` | The series tests are the same basic positive-series classification owned by the canonical Problem and add no separate public identity. |
| Red `6.2.2::6.18` | `merged-duplicate` | `[differentiate-variable-base-and-exponent]` | `[derivative-definition-and-core-rules, logarithmic-differentiation]` | This variable-base/variable-exponent derivative is absorbed into the general positive logarithmic-differentiation Problem. |
| Red `6.2.2::6.20` | `canonical-problem` | `[derive-exponential-cosine-derivative-from-definition]` | `[derivative-definition-and-core-rules]` | The canonical Problem derives the exponential-cosine derivative directly from the difference quotient and standard limits without Taylor series. |
| Red `6.2.2::6.21` | `knowledge-only` | `[]` | `[derivative-definition-and-core-rules]` | The reusable derivative-rule review is fused into core public Knowledge and preserved through Interview Checks rather than inflated into another Problem. |
| 150 `2.1::2` | `merged-duplicate` | `[compare-e-pi-power-expressions]` | `[monotonicity-convexity-critical-points-and-inflection, derivative-definition-and-core-rules]` | This is the same transcendental-power comparison already represented by the canonical monotonicity Problem. |
| 150 `2.1::3` | `merged-duplicate` | `[exponential-midpoint-convexity]` | `[monotonicity-convexity-critical-points-and-inflection]` | This is the same exponential midpoint-convexity identity and is absorbed as alternate evidence rather than duplicated publicly. |
| 150 `2.1::5` | `merged-duplicate` | `[differentiate-variable-base-and-exponent]` | `[derivative-definition-and-core-rules, logarithmic-differentiation]` | This is the same variable-base/variable-exponent differentiation family and is absorbed into the general positive-domain canonical Problem. |
| 150 `2.1::6` | `canonical-problem` | `[nested-radical-limit]` | `[bounded-monotone-convergence-and-fixed-points]` | The canonical nested-radical Problem proves bounded monotone convergence before selecting the positive fixed point. |
| 150 `2.1::7` | `canonical-problem` | `[infinite-power-tower-limit]` | `[bounded-monotone-convergence-and-fixed-points]` | The canonical finite-tower sequence is proved increasing and bounded by two before the fixed-point equation is used, so the larger root four is rejected. |
| 150 `2.1::8` | `canonical-problem` | `[classify-basic-positive-series]` | `[positive-series-convergence]` | The canonical Problem classifies geometric, harmonic, and positive p-series by elementary partial-sum and comparison arguments without an integration prerequisite. |

The exact state recount is:

```text
Green: 3 canonical-problem + 0 merged-duplicate + 1 knowledge-only = 4
Red:   6 canonical-problem + 3 merged-duplicate + 1 knowledge-only = 10
150:   3 canonical-problem + 3 merged-duplicate + 0 knowledge-only = 6
Total: 12 canonical-problem + 6 merged-duplicate + 2 knowledge-only = 20
```

Green `3.1.3::` remains one unique ledger row with two canonical Problem targets. It must not be split into duplicate keys or represented by an invented source item.

## 9. Coordinator-only source-topic-map repair

The coordinator makes exactly two source-topic-map repairs:

```text
red-book::6.2.2 -> [limits-derivatives, integration]
red-book::6.3.2 -> [limits-derivatives, integration]
```

No other source-topic-map entry changes. These repairs reflect mixed editorial sections and make the Red `6.2.2` Limits & Derivatives rows valid without item-level `topicOverrideReason` fields. They do not authorize ownership of unrelated integration material.

The taxonomy already contains `calculus-differential-equations` and `limits-derivatives`; it receives no delta.

## 10. Workstream manifest contract

The coordinator creates:

`src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json`

Its pre-closure contract is:

```json
{
  "id": "calculus-differential-equations-limits-derivatives-012",
  "canonicalTopics": [
    "calculus-differential-equations",
    "limits-derivatives"
  ],
  "status": "active",
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": ["3.1", "3.1.1", "3.1.2", "3.1.3"],
      "evidencePageRanges": [
        {"startPage": 49, "endPage": 52}
      ],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Four Green rows resolve to three canonical-problem decisions and one knowledge-only decision; 3.1.3 owns two independent canonical Problems."
    },
    {
      "source": "red-book",
      "sourceSections": ["6.1", "6.2.1", "6.2.2", "6.3.1", "6.3.2", "10", "10.2"],
      "evidencePageRanges": [
        {"startPage": 201, "endPage": 229},
        {"startPage": 317, "endPage": 318}
      ],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Ten Red rows resolve to six canonical Problems, three merged duplicates, and one knowledge-only decision. Adjacent items are reviewed-no-new-ownership or out of scope, and existing Q6.9/Q6.10 ownership remains unchanged."
    },
    {
      "source": "150-most-frequently-asked",
      "sourceSections": ["1", "2.1", "3.1"],
      "evidencePageRanges": [
        {"startPage": 11, "endPage": 12},
        {"startPage": 27, "endPage": 28},
        {"startPage": 50, "endPage": 65}
      ],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Six item-level rows resolve to three canonical Problems and three merged duplicates. Other reviewed material has no new bounded Limits & Derivatives ownership."
    }
  ]
}
```

The candidate never writes completion or verification placeholders. Only the coordinator adds real verification and changes `status` to `complete` after integration and successful CI.

## 11. Ownership boundary

### 11.1 Candidate create-only ownership

The candidate may create exactly these seven Knowledge pages:

- `src/content/knowledge/concepts/derivative-definition-and-core-rules.md`
- `src/content/knowledge/concepts/logarithmic-differentiation.md`
- `src/content/knowledge/concepts/monotonicity-convexity-critical-points-and-inflection.md`
- `src/content/knowledge/concepts/indeterminate-limits-and-growth-rates.md`
- `src/content/knowledge/concepts/related-rates-and-implicit-differentiation.md`
- `src/content/knowledge/concepts/bounded-monotone-convergence-and-fixed-points.md`
- `src/content/knowledge/concepts/positive-series-convergence.md`

The candidate may create exactly these 13 Problem pages:

- `src/content/problems/calculus/differentiate-variable-base-and-exponent.md`
- `src/content/problems/calculus/compare-e-pi-power-expressions.md`
- `src/content/problems/calculus/exponential-over-polynomial-limit.md`
- `src/content/problems/calculus/logarithm-power-limit-at-zero.md`
- `src/content/problems/calculus/rotating-lighthouse-beam-related-rate.md`
- `src/content/problems/calculus/radical-difference-limit-at-infinity.md`
- `src/content/problems/calculus/exponential-midpoint-convexity.md`
- `src/content/problems/calculus/periodic-continued-fraction-limit.md`
- `src/content/problems/calculus/normal-cdf-inflection-point.md`
- `src/content/problems/calculus/derive-exponential-cosine-derivative-from-definition.md`
- `src/content/problems/calculus/nested-radical-limit.md`
- `src/content/problems/calculus/infinite-power-tower-limit.md`
- `src/content/problems/calculus/classify-basic-positive-series.md`

The candidate may create one module-local test:

- `tests/quant-interview-limits-derivatives-content.test.mjs`

The candidate also supplies a non-authoritative report of proposed shared deltas and verification evidence to the coordinator. The report does not edit a coordinator-owned tracked surface. Candidate ownership is limited to new pages, the module-local test, and that report; no pre-existing public page is edited.

### 11.2 Coordinator-only ownership

The coordinator alone may create or edit:

- all three `src/data/quant-interview/coverage/*.json` ledgers;
- `src/data/quant-interview/topics/source-topic-map.json`;
- the workstream 012 manifest;
- `tests/quant-interview-source-neutral-content.test.mjs`;
- `tests/quant-interview-limits-derivatives-workstream.test.mjs`;
- `tests/quant-interview-limits-derivatives-completion.test.mjs`;
- prior 011 completion assertions that advance the current topic;
- `docs/quant-interview/HANDOFF.md`;
- `tests/quant-interview-handoff.test.mjs`;
- CI-owned completion metadata.

There is no taxonomy delta, no pre-existing public-content delta, and no CI-workflow delta.

The protected `main` branch is never modified directly. Candidates and the coordinator must not force-update or rewrite candidate, shared, or durable history.

## 12. Strict test contracts

### 12.1 Candidate module-content test

`tests/quant-interview-limits-derivatives-content.test.mjs` must assert:

- the exact 7 Knowledge slugs and exact 13 Problem slugs;
- exact `problemId` values `limits-derivatives-001` through `limits-derivatives-013`;
- exact topic arrays, graph metadata, Technique categories, and source-neutral frontmatter;
- all YAML titles are plain text;
- Problem 002's YAML title is exactly `Compare Two Transcendental Powers` and mathematical notation appears in its body;
- each Knowledge page contains Common Mistakes and Interview Checks;
- each Problem meets the S3+ structure and has at least two progressive hints;
- no public file mentions a source/book identity, source item, source section, PDF page, question page, or solution page;
- logarithmic differentiation states differentiable $u:I\to(0,\infty)$ and differentiable $v$ before deriving the formula;
- the Normal CDF uses $\sigma>0$, the exact density factor $1/(\sigma\sqrt{2\pi})$, the exact second derivative factor $1/(\sigma^3\sqrt{2\pi})$, and a sign change around $\mu$;
- continued-fraction, nested-radical, and power-tower pages prove convergence before taking fixed points;
- the power-tower page identifies both fixed-point branches and rejects (4) using the proved upper bound;
- the exponential-cosine page uses the difference quotient and standard limits without Taylor series;
- the series Knowledge and Problem use no integration or integral-test prerequisite.

The tests must check these semantic boxed results:

| Problem | Required result |
|---|---|
| `differentiate-variable-base-and-exponent` | $u^v(v'\log u+vu'/u)$, and the log-power specialization |
| `compare-e-pi-power-expressions` | $e^\pi>\pi^e$ |
| `exponential-over-polynomial-limit` | $+\infty$ |
| `logarithm-power-limit-at-zero` | (0^-) |
| `rotating-lighthouse-beam-related-rate` | $dx/dt=a\sec^2\theta\,d\theta/dt$ |
| `radical-difference-limit-at-infinity` | (1/2) |
| `exponential-midpoint-convexity` | $(e^a+e^b)/2\ge e^{(a+b)/2}$, equality iff $a=b$ |
| `periodic-continued-fraction-limit` | $(1+\sqrt5)/2$ |
| `normal-cdf-inflection-point` | unique inflection at $x=\mu$ |
| `derive-exponential-cosine-derivative-from-definition` | $e^x(\cos x-\sin x)$ |
| `nested-radical-limit` | (2) |
| `infinite-power-tower-limit` | (2), with branch (4) rejected |
| `classify-basic-positive-series` | geometric, harmonic, and (p)-series classifications in Section 6.13 |

Assertions should verify mathematical invariants without requiring brittle verbatim prose.

### 12.2 Coordinator source-map and workstream test

`tests/quant-interview-limits-derivatives-workstream.test.mjs` must assert:

- source-topic-map entries `red-book::6.2.2` and `red-book::6.3.2` are exactly `[limits-derivatives, integration]`;
- the topic-only diff changes no unrelated source-topic-map entry;
- all three manifest scopes, exact section arrays, exact evidence ranges, and nonempty review notes;
- exactly the 20 coverage keys in Section 8 and no additional 012 terminal row;
- every row has exactly `[limits-derivatives]` as `canonicalTopics`;
- exact state split `12/6/2`;
- exact Problem arrays, Knowledge arrays, and nonempty resolution notes;
- Green `3.1.3::` is one row with exactly two Problem targets;
- Red `6.2.2` rows need no `topicOverrideReason` after the map repair;
- Q6.9 and Q6.10 retain their pre-012 ownership and are not counted among the 20 rows;
- all three coverage ledgers pass `validateCoverageLedger` with real slugs and `allowUnresolvedCanonicalRefs: false`.

### 12.3 Exact global registry regression

At integration, the coordinator updates the complete exact post-011 slug sets by adding the 13 approved Problem slugs and seven approved Knowledge slugs. The regression must assert:

```text
Problems: 63 -> 76
Knowledge: 41 -> 48
```

All seven Knowledge nodes have exactly:

```text
[calculus-differential-equations, limits-derivatives]
```

The test must not use lower bounds, omit post-011 slugs, preserve an obsolete earlier count, or replace a newer exact set with the frozen candidate base's older registry.

## 13. Authoritative verification environments

### 13.1 Candidate-local evidence

Linux/WSL is the authoritative local environment. Use Ubuntu with Node 24 for:

```text
node --test tests/quant-interview-limits-derivatives-content.test.mjs
npm run test
npm run check
npm run build
```

Because the candidate is forbidden to update coordinator-owned exact global counts and shared coverage, its full `npm run test` may report only the expected integration-pending shared-state failures. The candidate must record the exact failures. Any module-content, relationship, schema, check, build, or unrelated-test failure blocks handoff.

Windows runs are diagnostic only and cannot replace authoritative WSL results.

### 13.2 Integrated evidence and CI

After applying the coordinator-owned shared deltas on the latest durable post-011 base, all of the following must pass under Ubuntu/WSL with Node 24:

```text
npm run test
npm run check
npm run build
```

Final CI must run on Ubuntu with Node 24 and succeed for the exact integrated commit. A Windows-only result, a stale commit, a local-only run, or a provisional run ID is not completion evidence.

## 14. Serialized integration and closure

Workstream 012 is integrated only after workstream 011 is durably complete. The coordinator:

1. verifies the latest durable base is the exact post-011 `63/41` state;
2. reviews and ports only the candidate-owned pages and module-local test;
3. repairs exactly the two Red source-topic-map entries;
4. applies the 20 coverage decisions semantically across the three current ledgers;
5. verifies existing Q6.9/Q6.10 ownership remains unchanged;
6. adds the three-source active manifest;
7. adds coordinator workstream/completion tests and the exact `76/48` registry regression;
8. updates HANDOFF, handoff tests, and the prior next-action assertion;
9. runs authoritative Ubuntu/WSL Node 24 local gates;
10. reviews the topic-only diff for unrelated map changes, forbidden provenance, and out-of-scope edits;
11. obtains Ubuntu Node 24 CI success for the exact integrated commit;
12. records the real 40-character commit, positive run ID, exact commands, and `success` conclusion;
13. changes workstream 012 to `complete` and advances authoritative HANDOFF state to reservation 013, Reasoning & Communication;
14. reruns fresh closure verification on the final clean tree.

Neither the candidate branch nor an unverified integrated commit may claim completion.

## 15. Failure and ambiguity rules

### Base drift

If the latest durable base is not the verified post-011 `63/41` state, stop and reconcile exact slugs, counts, row ownership, and shared mappings. Never replace a newer shared file with the frozen candidate version.

### Semantic collision

If an approved identity exists on the latest durable base, perform semantic deduplication and amend this design. Do not preserve `+13/+7` as a quota.

### Source-map drift

If either repaired Red entry or an adjacent mapped section changes before integration, re-audit the affected rows. Do not add `topicOverrideReason` merely to bypass a map inconsistency.

### Coverage collision

If Q6.9, Q6.10, or any other existing row would be re-owned, stop. Preserve prior canonical ownership and resolve the collision before integration.

### Logarithmic-differentiation domain failure

Do not use the generalized formula without differentiable $u:I\to(0,\infty)$ and differentiable $v$. The log-power specialization retains $x>1$.

### Fixed-point misuse

Do not infer convergence from a fixed-point equation. Continued fractions, nested radicals, and the power tower require convergence proofs first. For the tower, the larger solution (4) must be rejected using the proved invariant bound.

### Curvature misuse

Do not infer an inflection point from $F''=0$ alone. The Normal CDF requires $\sigma>0$, the correct density, and the explicit positive-to-negative sign change at $\mu$.

### L'Hôpital misuse

Do not apply L'Hôpital to a product form, a non-indeterminate quotient, or a quotient missing its differentiability and nonzero-derivative hypotheses. Repeated use requires renewed checks.

### Method-boundary failure

Do not use Taylor series for the derivative-from-definition Problem. Do not make integration an undeclared prerequisite for the positive-series classification.

### Sign loss

For $x^2\log x$ as $x\to0^+$, preserve zero approached from below: $0^-$.

### Verification failure

Keep the workstream `active`. Do not write success metadata, advance HANDOFF, or claim completion until authoritative local gates and Ubuntu Node 24 CI pass for the exact integrated commit.

### History safety

Do not modify `main` directly, force-update any shared branch, rewrite durable history, or resolve shared-file drift by whole-file replacement.

## 16. Success criteria

This design is satisfied when:

- exactly the 7 approved Knowledge pages and 13 approved Problem pages exist;
- public titles, prose, routes, and metadata are source-neutral;
- all domain, differentiability, convergence-before-fixed-point, curvature, sign, and method safeguards are present;
- exactly 20 terminal rows resolve with state split `12/6/2` and exact targets;
- Green `3.1.3::` remains one row with two Problem targets;
- the two Red source-topic-map repairs are exact and no unrelated map entry changes;
- all three manifest scopes and evidence ranges are exact;
- adjacent reviewed material creates no synthetic ownership and Q6.9/Q6.10 remain intact;
- candidate and coordinator ownership boundaries are respected;
- serialized integration produces the exact `76/48` registry contract;
- authoritative Ubuntu/WSL Node 24 gates and Ubuntu Node 24 CI succeed for the exact integrated commit;
- the completed manifest and HANDOFF contain only real verification evidence.

The bounded result completes workstream 012 only. It does not claim that calculus, any source section beyond the registered scopes, or any source book is complete.
