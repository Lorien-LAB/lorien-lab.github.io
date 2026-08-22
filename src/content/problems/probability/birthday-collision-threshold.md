---
problemId: combinatorial-probability-004
title: Birthday Collision Threshold
description: Use complement counting to find the smallest group size for which a shared birthday is more likely than not under the standard uniform-day model.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Combinatorial Probability, Collision Probability]
tags: [Probability, Combinatorics, Birthday Problem, Complement, Interview]
quantInterviewTopics: [probability-statistics, combinatorial-probability]
concepts: [finite-combinatorial-probability-modeling, counting-permutations-combinations]
techniques: []
prerequisites: [finite-combinatorial-probability-modeling]
relatedProblems: []
family: collision-complement-counting
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Assume birthdays are independent and uniformly distributed over 365 days, and ignore leap days.

What is the smallest number `n` of people for which the probability that **at least two people share a birthday** is greater than `1/2`?

## Think Before Revealing

Directly counting “at least one collision” creates many overlapping cases. Its complement has a simple sequential structure.

<details>
<summary>Hint 1</summary>

Compute the probability that all `n` birthdays are distinct.

</details>

<details>
<summary>Hint 2</summary>

For distinct birthdays, the successive factors begin

`365/365`, `364/365`, `363/365`, ...

Then compare the complement with `1/2`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let `C_n` be the event that at least one birthday collision occurs among `n` people. Counting `C_n` directly is awkward because one group may contain several colliding pairs, causing overlap.

Instead consider the complement:

`C_n^c = {all n birthdays are distinct}`.

### Step 1: Count the no-collision event

The first person's birthday can be anything, so its factor is

`365/365`.

The second person must avoid that one day, giving

`364/365`.

The third must avoid two occupied days, giving

`363/365`,

and so on. Therefore, for `n <= 365`,

`P(no collision) = (365/365)(364/365)...((365-n+1)/365)`.

Equivalently,

`P(no collision) = product_{k=0}^{n-1} (365-k)/365`.

Thus

`P(at least one collision) = 1 - product_{k=0}^{n-1} (365-k)/365`.

### Step 2: Locate the threshold

Evaluating the product near the crossing point gives

`P(no collision for n=22) ≈ 0.524305`,

so

`P(collision for n=22) ≈ 0.475695 < 1/2`.

For `n=23`,

`P(no collision for n=23) ≈ 0.492703`,

so

`P(collision for n=23) ≈ 0.507297 > 1/2`.

Therefore the smallest group size is

`n = 23`.

### Why 23 is surprisingly small

There are `C(n,2)` possible pairs of people. At `n=23`, that is already

`C(23,2) = 253`

potential pair comparisons. The collision opportunity grows roughly quadratically with group size, even though there are 365 possible days.

### Fast approximation

For intuition, use `log(1-x) ≈ -x` when `x` is small:

`log P(no collision) = sum_{k=0}^{n-1} log(1-k/365) ≈ -[n(n-1)]/(2*365)`.

So

`P(no collision) ≈ exp(-n(n-1)/730)`.

Setting this near `1/2` gives

`n(n-1) ≈ 730 log 2`,

which predicts a crossing near 23. The approximation explains the scale; the exact product establishes the minimal integer.

## Why This Problem Matters

This is the standard example of a broader technique: when the target is “at least one” among many overlapping possibilities, compute the probability of **none** and subtract from one.

The same structure appears in hash collisions, duplicate identifiers, occupancy problems, repeated sampling, and risk aggregation. It also trains a useful interview habit: compare exact combinatorial logic with an approximation to build intuition.

## Common Mistakes

**Approximating the event by the number of pairs times `1/365` and treating that as exact.** Pair-collision events overlap.

**Starting with `364/365` and forgetting the first factor.** The first factor is `365/365 = 1`; omitting it numerically changes nothing, but stating it clarifies the sequential model.

**Solving only for the approximate crossing.** The question asks for the smallest integer, so `n=22` and `n=23` must be checked exactly or numerically from the exact product.

**Assuming real-world birthdays are perfectly uniform.** The model explicitly makes that simplifying assumption; empirical birthday frequencies are not exactly uniform.

## Extensions & Variants

- Replace 365 by a general number `D` of equiprobable categories and derive the exact no-collision probability.
- Estimate the group size needed for collision probability `90%` or `99%`.
- Analyze collisions when category probabilities are unequal.
- Find the probability of exactly one colliding pair.
- Connect the approximation to the Poisson limit for rare pair collisions.

</details>
