---
problemId: expectation-variance-covariance-002
title: Expected Position of the First Special Card
description: Use random-permutation symmetry and indicators to find the expected position of the first special object among ordinary and special objects.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [expectation-linearity-indicators]
techniques: []
prerequisites: []
relatedProblems: [fair-box-opening-price-by-expectation, coupon-collector-expectations]
family: first-special-position
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

A uniformly random permutation contains $m$ ordinary objects and $n$ special objects, with $n\ge1$. Let $T$ be the position of the first special object.

Find $E[T]$.

As a concrete application, a standard deck has 48 non-aces and 4 aces. How many cards do you expect to reveal before seeing the first ace, counting that ace itself?

## Think Before Revealing

Instead of deriving the full distribution of the first special position, reinterpret $T-1$ as a count: how many ordinary objects appear before every special object?

<details>
<summary>Hint 1</summary>

For each ordinary object $i$, define $I_i=1$ if that object appears before the first special object.

</details>

<details>
<summary>Hint 2</summary>

Look only at ordinary object $i$ together with the $n$ special objects. By symmetry, each of these $n+1$ objects is equally likely to be earliest.

</details>

## Solution

Before the first special object appears, every revealed object is ordinary. Therefore

$$
T=1+\sum_{i=1}^{m}I_i,
$$

where

$$
I_i=\mathbf 1\{\text{ordinary object }i\text{ occurs before all special objects}\}.
$$

Now fix one ordinary object $i$. Ignore the other ordinary objects and compare only this object with the $n$ special objects. Their relative order is uniformly random. Among these $n+1$ objects, each is equally likely to be first.

The event $I_i=1$ occurs exactly when ordinary object $i$ is first among this reduced set. Hence

$$
P(I_i=1)=\frac{1}{n+1}.
$$

By linearity of expectation,

$$
E[T]
=1+\sum_{i=1}^mE[I_i]
=1+\frac{m}{n+1}.
$$

Thus the compact general formula is

$$
\boxed{E[T]=1+\frac{m}{n+1}=\frac{m+n+1}{n+1}}.
$$

In plain notation: **E[T] = 1 + m/(n+1)**.

For a standard 52-card deck, $m=48$ and $n=4$, so

$$
E[T]=1+\frac{48}{5}=10.6.
$$

You expect to turn **10.6 cards** before seeing the first ace, where the first ace is included in the count.

## Why This Matters

The attractive route is not to memorize an order-statistic formula. It is to recognize a random-permutation count and use symmetry plus indicators.

This reasoning generalizes naturally to “first success in a random ordering” problems and shows why a shared technique does not make all indicator problems the same: here the decisive insight is symmetry of relative order, not overlap dependence or occupancy.

## Common Mistakes

- Treating each position as independently special with probability $n/(m+n)$; sampling without replacement makes those events dependent.
- Deriving a complicated hypergeometric tail distribution when only the mean is requested.
- Forgetting the `+1` for the first special object itself.
- Using $m/n$ instead of $m/(n+1)$.
- Assuming the indicators $I_i$ must be independent before adding their expectations.

## Extensions

For one special object, $n=1$, so

$$
E[T]=\frac{m+2}{2},
$$

which is the midpoint of a uniform random position among $m+1$ total objects.

The same result can also be derived from gaps. The $m$ ordinary objects are distributed among the $n+1$ gaps before, between, and after the ordered special objects. Symmetry gives expected gap size $m/(n+1)$ before the first special, again yielding

$$
E[T]=1+\frac{m}{n+1}.
$$

A different, genuinely order-statistic question would ask for the full distribution or variance of the first special position rather than only its expectation.
