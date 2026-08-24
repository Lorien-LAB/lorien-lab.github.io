---
problemId: expectation-variance-covariance-001
title: Expected Pattern Count with Overlap
description: Count expected occurrences of a fixed pattern with indicator variables and show why overlap-induced dependence does not invalidate linearity of expectation.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [expectation-linearity-indicators]
techniques: []
prerequisites: []
relatedProblems: [coupon-collector-expectations, expected-position-of-first-special-card, coin-pattern-hitting-times]
family: indicator-pattern-counts
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

A fair coin is tossed $n$ times. Fix a particular heads/tails pattern of length $m$, where $n\ge m$. Count an occurrence every time the pattern appears in a consecutive block, including occurrences that overlap.

What is the expected number of occurrences?

For example, if the target is `HHH`, then the blocks beginning at positions 1 and 2 overlap heavily. Your method must remain valid despite that dependence.

## Think Before Revealing

The random total is a count. Instead of trying to enumerate all complete length-$n$ sequences by the number of matches they contain, ask whether each possible starting position contributes one occurrence or zero.

<details>
<summary>Hint 1</summary>

There are $n-m+1$ possible starting positions. Define an indicator $I_j$ that equals 1 when the target pattern begins at position $j$.

</details>

<details>
<summary>Hint 2</summary>

Write $N=\sum_{j=1}^{n-m+1} I_j$. The $I_j$ need not be independent for $E[N]=\sum_jE[I_j]$.

</details>

## Solution

For each possible starting position

$$
j=1,2,\ldots,n-m+1,
$$

define

$$
I_j=\mathbf 1\{\text{the target pattern begins at }j\}.
$$

Then the total number of occurrences is

$$
N=\sum_{j=1}^{n-m+1}I_j.
$$

For a fixed length-$m$ heads/tails pattern under a fair coin, the $m$ required tosses have probability

$$
P(I_j=1)=\frac{1}{2^m}.
$$

Therefore

$$
E[I_j]=\frac{1}{2^m}.
$$

By linearity of expectation,

$$
E[N]
=\sum_{j=1}^{n-m+1}E[I_j]
=\frac{n-m+1}{2^m}.
$$

Hence

$$
\boxed{E[N]=\frac{n-m+1}{2^m}}.
$$

The crucial point is that **linearity of expectation does not require independence**. If the pattern can overlap with itself, neighboring indicators may be strongly dependent. That affects the variance and the full distribution of $N$, but it does not change the expectation calculation.

For instance, with target `HHH`, the event that positions 1–3 are all heads makes an occurrence beginning at position 2 more plausible than it was unconditionally. The indicators are dependent, yet their expectations still add exactly.

## Why This Matters

This is a canonical indicator-variable move: transform a global random count into a sum of local yes/no variables. It appears in expected collision counts, runs, substring matches, graph motifs, inversions, occupied bins, and many other interview problems.

The deeper interview lesson is to separate two questions:

- Do I need independence to add **expectations**? No.
- Would I need dependence information to add **variances**? Yes, through covariance terms.

## Common Mistakes

- Declaring the method invalid because overlapping pattern events are dependent.
- Using $n/m$ as the number of candidate blocks and accidentally forbidding overlap.
- Writing $n-m$ instead of the correct number of starting positions, $n-m+1$.
- Multiplying occurrence probabilities as though different starting positions had to be independent.
- Confusing the expected count with the probability of at least one occurrence.

## Extensions

If the coin has $P(H)=p$, the same indicator method works. For a target containing $h$ heads and $m-h$ tails,

$$
P(I_j=1)=p^h(1-p)^{m-h},
$$

so

$$
E[N]=(n-m+1)p^h(1-p)^{m-h}.
$$

For an alphabet with independent symbols, replace $2^{-m}$ by the probability of the specified word at one starting position.

A substantially harder follow-up is $P(N\ge1)$ or $\operatorname{Var}(N)$, because overlap dependence then matters explicitly.
