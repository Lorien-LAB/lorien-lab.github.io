---
problemId: expectation-variance-covariance-010
title: Bernoulli Default Correlation Bounds
description: Combine fixed Bernoulli marginals with joint-probability bounds to determine the feasible covariance and correlation range of two default indicators.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [expectation-variance-covariance-algebra, probability-axioms-derived-rules, correlation-matrix]
techniques: []
prerequisites: []
relatedProblems: [optimal-hedge-ratio-by-variance-minimization]
family: bernoulli-correlation-feasibility
mathDifficulty: 3
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 18
status: solved
featured: false
---

## Problem

Two firms have default events $A$ and $B$ with

$$
P(A)=0.5,\qquad P(B)=0.3.
$$

Let

$$
I_A=\mathbf1_A,\qquad I_B=\mathbf1_B
$$

be their Bernoulli default indicators.

1. What values can $P(A\cap B)$ take?
2. What is the resulting feasible range of $\operatorname{Corr}(I_A,I_B)$?
3. Why is it wrong to say that any correlation in the universal interval $[-1,1]$ is automatically achievable for these fixed marginals?

## Think Before Revealing

The correlation is controlled entirely by the joint default probability once the two marginals are fixed. Bound the intersection first; only then transform those bounds into covariance and correlation.

<details>
<summary>Hint 1</summary>

Use the Fréchet bounds

$$
\max(0,p_A+p_B-1)
\le P(A\cap B)
\le \min(p_A,p_B).
$$

</details>

<details>
<summary>Hint 2</summary>

For Bernoulli indicators,

$$
\operatorname{Cov}(I_A,I_B)
=P(A\cap B)-P(A)P(B).
$$

Also compute $\operatorname{Var}(I_A)=p_A(1-p_A)$ and similarly for $I_B$.

</details>

## Solution

Let

$$
q=P(A\cap B).
$$

### Step 1: bound the joint probability

For any two events with marginal probabilities $p_A$ and $p_B$, the Fréchet bounds are

$$
\max(0,p_A+p_B-1)\le q\le\min(p_A,p_B).
$$

Here

$$
p_A=0.5,\qquad p_B=0.3,
$$

so

$$
\max(0,0.5+0.3-1)=0
$$

and

$$
\min(0.5,0.3)=0.3.
$$

Therefore

$$
\boxed{0\le P(A\cap B)\le0.3}.
$$

Equivalently, the probability of at least one default is

$$
P(A\cup B)=0.8-q,
$$

so it ranges from $0.5$ to $0.8$.

### Step 2: convert the joint probability to covariance

Because $I_A I_B=1$ exactly when both firms default,

$$
E[I_A I_B]=P(A\cap B)=q.
$$

Hence

$$
\operatorname{Cov}(I_A,I_B)
=q-p_Ap_B
=q-0.15.
$$

So the feasible covariance range is

$$
-0.15\le\operatorname{Cov}(I_A,I_B)\le0.15.
$$

### Step 3: normalize to correlation

The Bernoulli variances are

$$
\operatorname{Var}(I_A)=0.5(0.5)=0.25,
$$

and

$$
\operatorname{Var}(I_B)=0.3(0.7)=0.21.
$$

Therefore

$$
\operatorname{Corr}(I_A,I_B)
=\frac{q-0.15}{\sqrt{0.25\cdot0.21}}.
$$

At the two feasible endpoints,

$$
\rho_{\min}
=\frac{-0.15}{\sqrt{0.0525}}
=-\frac{3}{\sqrt{21}}
=-\sqrt{\frac37},
$$

and

$$
\rho_{\max}
=\frac{0.15}{\sqrt{0.0525}}
=\sqrt{\frac37}.
$$

Thus

$$
\boxed{
-\sqrt{\frac37}
\le \operatorname{Corr}(I_A,I_B)
\le \sqrt{\frac37}
}.
$$

Numerically this is approximately

$$
[-0.655,\,0.655].
$$

### Why the universal bound is not enough

Every correlation coefficient must lie in **[-1,1]**, but that does not mean every number in that interval is achievable once the marginal distributions are fixed.

For correlation $+1$, two nondegenerate Bernoulli variables would have to be an exact positive affine function of each other, which would force matching success structures incompatible with probabilities $0.5$ and $0.3$.

For correlation $-1$, they would have to satisfy an exact negative affine relationship, which is also impossible with these marginals.

The fixed marginal default probabilities constrain the feasible joint probability, and therefore constrain covariance and correlation more tightly than the universal Cauchy–Schwarz bound.

## Why This Matters

This problem separates three levels that are easy to blur together:

1. probability axioms bound a joint event;
2. scalar covariance converts joint probability into linear co-movement;
3. scalar correlation normalizes by marginal variances.

It is particularly relevant in credit and risk interviews, where proposed dependence parameters must be compatible with fixed marginal event probabilities.

## Common Mistakes

- Assuming the lower bound for $P(A\cap B)$ is always zero without checking $p_A+p_B-1$.
- Assuming the upper bound is $p_Ap_B$; that is the independent value, not a feasibility bound.
- Forgetting to center Bernoulli indicators when computing covariance.
- Using $p$ instead of $p(1-p)$ for Bernoulli variance.
- Claiming correlation $\pm1$ is always achievable because all correlations lie in $[-1,1]$.
- Replacing this two-variable marginal-feasibility problem with covariance-matrix PSD machinery.

## Extensions

For general Bernoulli marginals $p_A,p_B\in(0,1)$,

$$
q\in
\left[
\max(0,p_A+p_B-1),
\min(p_A,p_B)
\right].
$$

Since

$$
\rho(q)=
\frac{q-p_Ap_B}
{\sqrt{p_A(1-p_A)p_B(1-p_B)}},
$$

and the denominator is fixed, the feasible correlation interval is obtained simply by evaluating $\rho(q)$ at the two Fréchet endpoints.
