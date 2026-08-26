---
problemId: combinatorial-probability-005
title: No Consecutive Heads in n Coin Tosses
description: Count fair-coin sequences with no adjacent heads through a two-state recurrence and connect the count to Fibonacci numbers.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Combinatorial Probability, Recurrence Counting]
tags: [Probability, Combinatorics, Coins, Fibonacci, Recurrence, Interview]
quantInterviewTopics: [probability-statistics, combinatorial-probability]
concepts: [counting-permutations-combinations, finite-combinatorial-probability-modeling]
techniques: []
prerequisites: [counting-permutations-combinations]
relatedProblems: [coin-pattern-hitting-times]
family: forbidden-adjacency-counting
mathDifficulty: 2
insightDifficulty: 4
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

A fair coin is tossed `n` times. What is the probability that **no two heads are consecutive**?

Give a formula valid for every nonnegative integer `n`.

## Think Before Revealing

Every length-`n` head-tail sequence is equally likely, so the denominator is easy. The real task is to count valid binary strings.

<details>
<summary>Hint 1</summary>

Let `a_n` be the number of valid length-`n` sequences. Split valid sequences according to their final toss.

</details>

<details>
<summary>Hint 2</summary>

A valid sequence ending in `T` can follow any valid sequence of length `n-1`. A valid sequence ending in `H` must have `T` immediately before it, leaving a valid prefix of length `n-2`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

There are `2^n` equally likely head-tail sequences of length `n`. We therefore need only count those with no adjacent `HH` block.

Let `a_n` denote the number of valid sequences of length `n`.

### Step 1: Derive the recurrence

Partition valid length-`n` sequences by their last symbol.

- If the sequence ends in `T`, the first `n-1` tosses may be any valid sequence. This gives `a_{n-1}` possibilities.
- If the sequence ends in `H`, the preceding toss must be `T` whenever `n>=2`. Removing the final `TH` leaves any valid sequence of length `n-2`, giving `a_{n-2}` possibilities.

Therefore

`a_n = a_{n-1} + a_{n-2}`.

The initial conditions are

`a_0 = 1`

for the empty sequence, and

`a_1 = 2`

for `H` and `T`.

### Step 2: Identify the Fibonacci shift

With the convention `F_0=0`, `F_1=1`, and `F_{m}=F_{m-1}+F_{m-2}`, these initial conditions imply

`a_n = F_{n+2}`.

Hence the probability is

`P(no consecutive heads) = F_{n+2} / 2^n`.

### Small-case check

For `n=3`, the eight possible sequences contain three invalid ones with consecutive heads: `HHT`, `THH`, and `HHH`. Thus five are valid.

The formula gives

`F_5 / 2^3 = 5/8`,

which agrees.

### Alternative combinatorial count

Suppose a valid sequence contains exactly `k` heads. To keep the heads separated, reserve at least one tail between consecutive heads. A standard gap argument shows that the number of such sequences is

`C(n-k+1, k)`.

Therefore

`a_n = sum_{k=0}^{floor((n+1)/2)} C(n-k+1,k)`.

This sum equals `F_{n+2}`. The recurrence is usually the fastest interview route, while the gap count reveals the combinatorial identity behind the Fibonacci number.

## Why This Problem Matters

This problem connects three reusable ideas:

- finite probability as a count divided by `2^n`;
- state-based recurrence construction;
- Fibonacci numbers arising from local exclusion constraints.

The same pattern appears in tilings, binary strings with forbidden patterns, dynamic programming, reliability models, and sequence-constrained coding.

## Common Mistakes

**Writing `2^n - (n-1)2^(n-2)`.** Counting each location of an `HH` block separately double-counts sequences containing multiple adjacent pairs.

**Using the Fibonacci recurrence without correct initial conditions.** The shift `F_{n+2}` comes from `a_0=1` and `a_1=2`.

**Forgetting the empty sequence.** Defining `a_0=1` makes the recurrence work cleanly at the boundary.

**Treating heads positions as an arbitrary `k`-subset.** The no-adjacency constraint changes the count from `C(n,k)` to `C(n-k+1,k)`.

## Extensions & Variants

- Find the probability of no run of three consecutive heads.
- Count binary strings with exactly `k` heads and no adjacent heads.
- Replace a fair coin by a biased coin; then counting alone is no longer sufficient because valid strings with different head counts have different probabilities.
- Build a two-state transition matrix for “previous toss was H/T” and recover the recurrence.
- Generalize to words over larger alphabets with forbidden adjacent patterns.

</details>
