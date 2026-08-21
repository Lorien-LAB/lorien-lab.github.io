---
problemId: expectation-variance-covariance-013
title: Multiplicative Wealth and Expected Growth
description: Use independence to compute expected wealth under repeated multiplicative bets and distinguish arithmetic expected growth from log or geometric growth.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [expectation-linearity-indicators]
techniques: []
prerequisites: []
relatedProblems: []
family: independent-product-expectation
mathDifficulty: 2
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Start with wealth $W_0>0$. On each of $n$ independent fair coin tosses, your wealth is multiplied by

- $2$ after heads;
- $1/2$ after tails.

Find $E[W_n]$.

Then compare that result with the expected log growth. What distinction should you make before concluding that the strategy “grows” wealth over time?

## Think Before Revealing

The wealth is a **product** of independent random multipliers. Do not average the two terminal wealth outcomes directly over all $2^n$ paths unless necessary.

<details>
<summary>Hint 1</summary>

Write

$$
W_n=W_0\prod_{i=1}^n M_i,
$$

where $M_i$ equals $2$ or $1/2$ with equal probability.

</details>

<details>
<summary>Hint 2</summary>

Independence lets expectations of the product factor. Separately compute

$$
E[\log M_i].
$$

Those are two different growth criteria.

</details>

## Solution

Let $M_1,\ldots,M_n$ be the independent one-step wealth multipliers. Then

$$
W_n=W_0\prod_{i=1}^n M_i.
$$

For one toss,

$$
E[M_i]
=\frac12\cdot2+\frac12\cdot\frac12
=\frac54.
$$

In plain notation: **E[M] = 5/4**.

Because the multipliers are independent,

$$
E[W_n]
=W_0E\left[\prod_{i=1}^nM_i\right]
=W_0\prod_{i=1}^nE[M_i].
$$

Therefore

$$
\boxed{E[W_n]=W_0\left(\frac54\right)^n}.
$$

In plain notation: **E[W_n] = W0 (5/4)^n**.

For every finite $n$, this expectation is well defined. Consequently,

$$
\lim_{n\to\infty}E[W_n]=\infty.
$$

That statement is a limit of the finite-horizon expectations. It should not be casually rephrased as the expectation of some unspecified infinite-horizon terminal random variable.

### Expected wealth is not expected log growth

Now look at logarithms. One step has

$$
E[\log M_i]
=\frac12\log2+\frac12\log\left(\frac12\right)
=0.
$$

Hence

$$
E[\log W_n]
=\log W_0+\sum_{i=1}^nE[\log M_i]
=\log W_0.
$$

So the arithmetic expectation of terminal wealth grows like $(5/4)^n$, while the expected **log growth** is zero in this particular game.

This is not a contradiction. Multiplicative wealth distributions can be highly skewed, and rare large outcomes can have substantial influence on $E[W_n]$. The function $\log$ measures a different object from wealth itself.

The two expressions

$$
E[W_n]
$$

and

$$
E[\log W_n]
$$

answer different questions. In general,

$$
\log E[W_n]\ne E[\log W_n].
$$

## Why This Matters

This problem tests whether you can use the independent-product expectation identity without confusing it with linearity of expectation.

It also exposes a central distinction in multiplicative processes: high expected wealth does not by itself describe typical compounded growth, long-run log growth, or risk. That distinction appears throughout portfolio construction, repeated betting, and stochastic growth models.

## Common Mistakes

- Adding the multipliers instead of multiplying them along a wealth path.
- Using $E[M_1\cdots M_n]=E[M_1]+\cdots+E[M_n]$.
- Factoring the product expectation without an independence assumption.
- Computing $E[M]=1$ because the up and down percentage changes appear “symmetric.”
- Concluding from $E[W_n]\to\infty$ that every path or a typical path must grow without bound.
- Treating expected wealth and log/geometric growth as interchangeable.
- Talking about an infinite-product terminal wealth without defining a limiting random variable.

## Extensions

For independent multipliers with possibly different laws,

$$
W_n=W_0\prod_{i=1}^nM_i
$$

implies, under the required integrability,

$$
E[W_n]=W_0\prod_{i=1}^nE[M_i].
$$

For iid positive multipliers, expected log growth is

$$
\frac1nE\left[\log\frac{W_n}{W_0}\right]=E[\log M].
$$

The **Kelly criterion** is a separate optimization problem that chooses exposure to maximize expected log growth. This page only establishes why expected wealth and log/geometric growth are distinct; it does not develop Kelly optimization.
