---
problemId: expectation-variance-covariance-003
title: Coupon Collector Expectations
description: Decompose collection time into geometric waits and use indicators to compute both full-collection time and the expected number of distinct types observed.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [expectation-linearity-indicators, common-probability-distributions]
techniques: []
prerequisites: []
relatedProblems: [geometric-waiting-time-mean-variance, expected-pattern-count-by-indicators]
family: coupon-collector-expectations
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Each independent draw returns one of $N$ coupon types, uniformly at random.

1. Starting with no coupons, what is the expected number of draws required to collect all $N$ types?
2. After exactly $k$ draws, what is the expected number of distinct coupon types you have seen?

The two parts look related, but the cleanest decompositions are different.

## Think Before Revealing

For the time-to-complete question, ask how long you wait to go from $j$ collected types to $j+1$. For the distinct-count question, ask whether each individual type has appeared at least once.

<details>
<summary>Hint 1</summary>

When $j$ types have already been collected, a new type appears on the next draw with probability $(N-j)/N$. The waiting time is geometric.

</details>

<details>
<summary>Hint 2</summary>

For part 2, define $I_i=1$ if coupon type $i$ has appeared during the first $k$ draws. Compute $P(I_i=1)$ by taking the complement.

</details>

## Solution

### Part 1: time to collect all types

Let $W_j$ be the number of additional draws needed to move from $j$ distinct collected types to $j+1$ distinct types, for

$$
j=0,1,\ldots,N-1.
$$

When $j$ types are already known, exactly $N-j$ types are new. Therefore the success probability on each draw is

$$
p_j=\frac{N-j}{N}.
$$

Thus $W_j$ is a geometric waiting time with

$$
E[W_j]=\frac{1}{p_j}=\frac{N}{N-j}.
$$

The total collection time is

$$
T=\sum_{j=0}^{N-1}W_j.
$$

Linearity of expectation gives

$$
E[T]
=\sum_{j=0}^{N-1}\frac{N}{N-j}
=N\sum_{r=1}^{N}\frac1r.
$$

Define the harmonic number

$$
H_N=1+\frac12+\cdots+\frac1N.
$$

Hence

$$
\boxed{E[T]=NH_N}.
$$

In plain notation: **E[T] = N H_N**.

The last few coupon types dominate the expectation because the success probability for finding something new becomes small.

### Part 2: expected distinct types after $k$ draws

For coupon type $i$, define

$$
I_i=\mathbf 1\{\text{type }i\text{ appears at least once in the first }k\text{ draws}\}.
$$

The distinct count is

$$
D_k=\sum_{i=1}^N I_i.
$$

A particular type is missed on one draw with probability $(N-1)/N$. It is missed on all $k$ independent draws with probability

$$
\left(1-\frac1N\right)^k.
$$

Therefore

$$
P(I_i=1)=1-\left(1-\frac1N\right)^k.
$$

Using indicator linearity,

$$
E[D_k]
=N\left[1-\left(1-\frac1N\right)^k\right].
$$

So

$$
\boxed{E[D_k]=N\left[1-\left(1-\frac1N\right)^k\right]}.
$$

The indicators $I_i$ are not independent: seeing one type affects the finite total number of observed slots available for the others. Independence is irrelevant for the expectation of their sum.

## Why This Matters

This family showcases two of the most reusable expectation decompositions in one setting:

- **waiting-time decomposition**: break a stopping time into geometric increments;
- **indicator decomposition**: break a random count into yes/no contributions.

Knowing which random variable to decompose is more important than memorizing $NH_N$.

## Common Mistakes

- Treating the total collection time as one geometric random variable with a fixed success probability.
- Forgetting that the chance of discovering a new type changes after each new type is collected.
- Requiring independence among the $I_i$ before using linearity for the distinct count.
- Computing $P(I_i=1)$ directly with complicated casework instead of using the complement.
- Confusing “expected number of distinct types after $k$ draws” with “probability all types have appeared by time $k$.”

## Extensions

As $N$ grows,

$$
H_N=\log N+\gamma+o(1),
$$

so the full-collection expectation is approximately

$$
N\log N+\gamma N.
$$

For non-uniform coupon probabilities, the simple geometric-stage decomposition no longer has a stage probability determined only by the number of types collected; which types are missing matters. The indicator formula for expected distinct types remains easy, however:

$$
E[D_k]=\sum_{i=1}^N\left[1-(1-p_i)^k\right].
$$
