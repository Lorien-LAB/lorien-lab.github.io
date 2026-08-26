---
title: Positive-Series Convergence
description: Classify elementary nonnegative series through partial sums, comparison, telescoping, dyadic grouping, condensation, geometric bounds, and the term test.
date: 2026-08-24
type: concept
domain: Mathematics & Statistics
category: Calculus
status: growing
tags: [Calculus, Series, Convergence]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
featured: false
related: [indeterminate-limits-and-growth-rates]
relatedNotes: []
---

## Core Idea

For a series with nonnegative terms, the partial sums are increasing. The series converges exactly when those partial sums are bounded above. Comparison, telescoping, dyadic grouping, and condensation provide bounds without integration.

## Nonnegative Terms and Bounded Increasing Partial Sums

If $a\_k ≥ 0$, then $S\_N = ∑(k = 1 to N) a\_k$ satisfies $S\_(N+1) ≥ S\_N$. Thus

\[
∑(k = 1 to ∞) a\_k converges ⇔ (S\_N) is bounded above.
\]

## The Necessary Term Test

Convergence requires

\[
a\_n → 0.
\]

This is necessary but not sufficient: the harmonic terms tend to zero while the harmonic series diverges. If $a\_n$ does not tend to zero, divergence follows immediately.

## Geometric Series

For $r ≠ 1$,

\[
∑(k = 0 to N) r^k = (1 - r^(N+1))/(1-r).
\]

The infinite geometric series converges exactly when $|r|<1$, and then

\[
∑(k = 0 to ∞) r^k = 1/(1-r).
\]

## Direct Comparison and Telescoping Bounds

For nonnegative terms, $0 ≤ a\_k ≤ b\_k$ and convergence of $∑ b\_k$ imply convergence of $∑ a\_k$. A useful telescoping identity is

\[
1/k^2 ≤ 1/(k(k-1)) = 1/(k-1) - 1/k for k ≥ 2.
\]

The comparison makes the reciprocal-square partial sums bounded.

## Harmonic Divergence by Dyadic Grouping

In the block $2^m < k ≤ 2^(m+1)$ there are $2^m$ terms, each at least $1/2^(m+1)$. Therefore every such block contributes at least $1/2$. Infinitely many blocks force unbounded partial sums.

## Cauchy Condensation with Its Hypotheses

If $(a\_k)$ is positive and nonincreasing, Cauchy condensation says

\[
∑(k ≥ 1) a\_k and ∑(n ≥ 0) 2^n a\_(2^n)
\]

have the same convergence behavior. Positivity and monotone decrease must be verified before applying the theorem.

## Positive p-Series by Dyadic Blocks

For $p>1$, the block $2^k ≤ n < 2^(k+1)$ is bounded above by a constant multiple of

\[
2^(k(1-p)),
\]

and these geometric bounds sum. For $0<p ≤ 1$, $1/k^p ≥ 1/k$, so comparison with the harmonic series gives divergence. For $p ≤ 0$, the terms do not tend to zero, so the term test gives divergence.

## The Reciprocal-Square Series

For $N ≥ 2$,

\[
∑(k = 2 to N) 1/k^2 ≤ ∑(k = 2 to N) (1/(k-1) - 1/k) = 1 - 1/N < 1.
\]

The nonnegative partial sums are increasing and bounded above, so $∑(k = 1 to ∞) 1/k^2$ converges.

## The Logarithmic-Harmonic Series

For $k ≥ 2$, $a\_k = 1/(k ln k)$ is positive and decreasing because $k ln k$ is positive and increasing. Condensation gives

\[
2^n a\_(2^n) = 2^n/(2^n ln(2^n)) = 1/(n ln 2).
\]

Consequently,

\[
∑(n = 1 to ∞) 2^n a\_(2^n) = (1/(ln 2)) ∑(n = 1 to ∞) 1/n.
\]

This is a positive constant multiple of the harmonic series, so the condensed series and therefore $∑(k = 2 to ∞) 1/(k ln k)$ diverge.

## Recognition Signals

- Nonnegative terms suggest increasing partial sums and an upper-bound question.
- Terms grouped by powers of two suggest dyadic bounds or condensation.
- A rational expression in consecutive indices may telescope after partial fractions.
- Terms tending to a nonzero value trigger the necessary term test immediately.

## Common Mistakes

- Treating $a\_n → 0$ as sufficient for convergence.
- Applying condensation without positivity and monotone decrease.
- Using a comparison in the wrong direction.
- Quoting a p-series table where an elementary proof is requested.
- Invoking the integral test when integration is outside the permitted toolkit.

## Interview Checks

Prove, without integration, that the harmonic series diverges, the reciprocal-square series converges, and the logarithmic-harmonic series diverges. State the hypotheses of every comparison or condensation step.
