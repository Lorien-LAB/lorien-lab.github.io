---
problemId: limits-derivatives-013
title: Classify Basic Positive Series
description: Classify the harmonic, reciprocal-square, and logarithmic-harmonic series with elementary non-integral convergence arguments.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Limits, Series, Convergence]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [positive-series-convergence]
techniques: []
prerequisites: []
relatedProblems: []
family: positive-series-convergence
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Classify each series as convergent or divergent, using elementary arguments without integration:

\[
\sum_{k=1}^{+\infty}\frac1k,
\qquad
\sum_{k=1}^{+\infty}\frac1{k^2},
\qquad
\sum_{k=2}^{+\infty}\frac1{k\ln k}.
\]

Give a proof for every classification.

## Think Before Revealing

The three series need three related but distinct tools: lower bounds on dyadic blocks, an upper telescoping comparison, and condensation after a monotonicity check.

<details>
<summary>Hint 1</summary>

Group harmonic terms between consecutive powers of two. For the reciprocal square, compare $1/k^2$ with $1/[k(k-1)]$.

</details>

<details>
<summary>Hint 2</summary>

For $a_k=1/(k\ln k)$, verify positivity and decrease for $k\ge2$. Cauchy condensation produces $2^n a_{2^n}=1/(n\ln2)$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Harmonic series: dyadic lower blocks

For $m\ge0$, the block $2^m<k\le2^{m+1}$ has $2^m$ terms. Each term is at least $1/2^{m+1}$, so

\[
\sum_{k=2^m+1}^{2^{m+1}}\frac1k
\ge2^m\frac1{2^{m+1}}=\frac12.
\]

There are infinitely many disjoint blocks, each contributing at least $1/2$. Hence the partial sums are unbounded, and

\[
\boxed{\sum_{k=1}^{+\infty}\frac1k\text{ diverges}}.
\]

### Reciprocal-square series: telescoping upper bound

For $k\ge2$,

\[
\frac1{k^2}\le\frac1{k(k-1)}
=\frac1{k-1}-\frac1k.
\]

Therefore, for $N\ge2$,

\[
\sum_{k=2}^{N}\frac1{k^2}
\le\sum_{k=2}^{N}\left(\frac1{k-1}-\frac1k\right)
=1-\frac1N.
\]

The reciprocal-square partial sums are increasing because the terms are positive, and they are bounded above by $2$ after including the $k=1$ term. Bounded increasing partial sums converge, so

\[
\boxed{\sum_{k=1}^{+\infty}\frac1{k^2}\text{ converges}}.
\]

### Logarithmic-harmonic series: condensation

Let

\[
a_k=\frac1{k\ln k},\qquad k\ge2.
\]

The sequence is positive. Also, both $k$ and $\ln k$ are positive and increasing for $k\ge2$, so their product $k\ln k$ is increasing; hence $a_k$ is decreasing. The hypotheses of Cauchy condensation are satisfied.

The condensed terms are

\[
2^n a_{2^n}
=\frac{2^n}{2^n\ln(2^n)}
=\frac1{n\ln2}.
\]

Thus the exact comparison chain is

\[
\sum_{n=1}^{+\infty}2^n a_{2^n}
=\frac1{\ln2}\sum_{n=1}^{+\infty}\frac1n.
\]

The condensed series is a positive constant multiple of the harmonic series, namely $1/\ln2$ times it, so it diverges. Cauchy condensation therefore gives

\[
\boxed{\sum_{k=2}^{+\infty}\frac1{k\ln k}\text{ diverges}}.
\]

## Why This Matters

The triple distinguishes a necessary term check from real convergence arguments and demonstrates how lower bounds prove divergence while upper bounds prove convergence.

## Common Mistakes

- Saying the harmonic series converges because its terms tend to zero.
- Reversing the reciprocal-square comparison.
- Applying condensation before verifying that $a_k$ is positive and decreasing.
- Forgetting that $1/(n\ln2)$ is a constant multiple of the harmonic sequence.
- Using an integral or integral test despite the method restriction.

## Extensions

Use dyadic blocks to classify $\sum 1/k^p$ for all real $p$, and compare $1/[k(\ln k)^q]$ under repeated logarithmic refinements.

</details>
