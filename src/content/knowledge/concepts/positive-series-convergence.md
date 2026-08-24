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

If $a_k\ge0$, then $S_N=\sum_{k=1}^N a_k$ satisfies $S_{N+1}\ge S_N$. Thus

\[
\sum_{k=1}^{+\infty}a_k\text{ converges}
\quad\Longleftrightarrow\quad
(S_N)\text{ is bounded above}.
\]

## The Necessary Term Test

Convergence requires

\[
a_n\to0.
\]

This is necessary but not sufficient: the harmonic terms tend to zero while the harmonic series diverges. If $a_n$ does not tend to zero, divergence follows immediately.

## Geometric Series

For $r\ne1$,

\[
\sum_{k=0}^{N}r^k=\frac{1-r^{N+1}}{1-r}.
\]

The infinite geometric series converges exactly when $|r|<1$, and then

\[
\sum_{k=0}^{+\infty}r^k=\frac1{1-r}.
\]

## Direct Comparison and Telescoping Bounds

For nonnegative terms, $0\le a_k\le b_k$ and convergence of $\sum b_k$ imply convergence of $\sum a_k$. A useful telescoping identity is

\[
\frac1{k^2}\le\frac1{k(k-1)}
=\frac1{k-1}-\frac1k,
\qquad k\ge2.
\]

The comparison makes the reciprocal-square partial sums bounded.

## Harmonic Divergence by Dyadic Grouping

In the block $2^m<k\le2^{m+1}$ there are $2^m$ terms, each at least $1/2^{m+1}$. Therefore every such block contributes at least $1/2$. Infinitely many blocks force unbounded partial sums.

## Cauchy Condensation with Its Hypotheses

If $(a_k)$ is positive and nonincreasing, Cauchy condensation says

\[
\sum_{k\ge1}a_k
\quad\text{and}\quad
\sum_{n\ge0}2^n a_{2^n}
\]

have the same convergence behavior. Positivity and monotone decrease must be verified before applying the theorem.

## Positive p-Series by Dyadic Blocks

For $p>1$, the block $2^k\le n<2^{k+1}$ is bounded above by a constant multiple of

\[
2^{k(1-p)},
\]

and these geometric bounds sum. For $0<p\le1$, $1/k^p\ge1/k$, so comparison with the harmonic series gives divergence. For $p\le0$, the terms do not tend to zero, so the term test gives divergence.

## The Reciprocal-Square Series

For $N\ge2$,

\[
\sum_{k=2}^{N}\frac1{k^2}
\le\sum_{k=2}^{N}\left(\frac1{k-1}-\frac1k\right)
=1-\frac1N<1.
\]

The nonnegative partial sums are increasing and bounded above, so $\sum_{k=1}^{+\infty}1/k^2$ converges.

## The Logarithmic-Harmonic Series

For $k\ge2$, $a_k=1/(k\ln k)$ is positive and decreasing because $k\ln k$ is positive and increasing. Condensation gives

\[
2^n a_{2^n}
=\frac{2^n}{2^n\ln(2^n)}
=\frac1{n\ln2}.
\]

Consequently,

\[
\sum_{n=1}^{+\infty}2^n a_{2^n}
=\frac1{\ln2}\sum_{n=1}^{+\infty}\frac1n.
\]

This is a positive constant multiple of the harmonic series, so the condensed series and therefore $\sum_{k=2}^{+\infty}1/(k\ln k)$ diverge.

## Recognition Signals

- Nonnegative terms suggest increasing partial sums and an upper-bound question.
- Terms grouped by powers of two suggest dyadic bounds or condensation.
- A rational expression in consecutive indices may telescope after partial fractions.
- Terms tending to a nonzero value trigger the necessary term test immediately.

## Common Mistakes

- Treating $a_n\to0$ as sufficient for convergence.
- Applying condensation without positivity and monotone decrease.
- Using a comparison in the wrong direction.
- Quoting a p-series table where an elementary proof is requested.
- Invoking the integral test when integration is outside the permitted toolkit.

## Interview Checks

Prove, without integration, that the harmonic series diverges, the reciprocal-square series converges, and the logarithmic-harmonic series diverges. State the hypotheses of every comparison or condensation step.
