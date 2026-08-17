---
problemId: conditional-probability-bayes-005
title: Last-Color Ordering in a Candy Jar
description: Replace direct sampling enumeration with conditioning on the relative order of the last red, blue, and green candies.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Conditional Probability, Random Ordering]
tags: [Probability, Conditioning, Random Permutation, Interview]
quantInterviewTopics: [probability-statistics, conditional-probability-bayes]
concepts: [conditioning]
techniques: []
prerequisites: []
relatedProblems: []
family: last-occurrence-conditioning
mathDifficulty: 2
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

A jar contains 10 red candies, 20 blue candies, and 30 green candies. The 60 candies are removed one at a time in a uniformly random order.

What is the probability that, at the moment the **last red candy** is removed, there is still at least one blue candy and at least one green candy left in the jar?

## Think Before Revealing

The exact removal times of all 60 candies contain far more information than you need. Track only which color has the latest last occurrence.

<details>
<summary>Hint 1</summary>

Let `T_r`, `T_b`, and `T_g` be the removal positions of the last red, blue, and green candy. The event is `T_r < T_b` and `T_r < T_g`.

</details>

<details>
<summary>Hint 2</summary>

Split the target event into the two **mutually exclusive** orderings `T_r<T_b<T_g` and `T_r<T_g<T_b`. Condition first on which color owns the final candy in the entire random ordering.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let

- `T_r` be the position of the last red candy,
- `T_b` the position of the last blue candy,
- `T_g` the position of the last green candy.

We want

`P(T_r<T_b and T_r<T_g)`.

There are exactly two mutually exclusive ways this can happen:

`T_r<T_b<T_g`

or

`T_r<T_g<T_b`.

Therefore

`P(T_r<T_b and T_r<T_g) = P(T_r<T_b<T_g)+P(T_r<T_g<T_b)`.

### Case 1: `T_r<T_b<T_g`

For green to be last among the three colors, the very last candy among all 60 must be green. By symmetry among individual candies,

`P(T_g=60)=30/60`.

Condition on that event. Ignore the green candy that is last overall and look only at the 30 red-or-blue candies. For `T_r<T_b`, the last candy among these 30 must be blue. There are 20 blue candies among those 30, so

`P(T_r<T_b | T_g=60)=20/30`.

Thus

`P(T_r<T_b<T_g)=(30/60)(20/30)=1/3`.

### Case 2: `T_r<T_g<T_b`

Similarly, the last candy overall must be blue:

`P(T_b=60)=20/60`.

Conditioned on blue being last overall, look at the 40 red-or-green candies. For `T_r<T_g`, the last one among those 40 must be green. There are 30 green candies, so

`P(T_r<T_g | T_b=60)=30/40`.

Hence

`P(T_r<T_g<T_b)=(20/60)(30/40)=1/4`.

Adding the mutually exclusive cases,

`P(T_r<T_b and T_r<T_g)`

`= (30/60)(20/30) + (20/60)(30/40)`

`= 1/3 + 1/4`

`= 7/12`.

So the required probability is **`7/12`**.

## Why This Problem Matters

A direct hypergeometric or position-by-position calculation is possible, but it hides the simple structure. The useful interview move is to compress a long random sequence into a few last-occurrence variables and condition on a small set of orderings.

This kind of reduction appears in random permutations, competing risks, last-arrival questions, coupon processes, and event-order problems where only relative terminal positions matter.

## Common Mistakes

- Treating the last red, blue, and green positions as independent.
- Counting every 60-candy ordering when only relative last occurrences matter.
- Forgetting that the two target orderings are mutually exclusive and can be added directly.
- Writing `30/60 × 20/30` without explaining the conditioning step.
- Assuming each color is equally likely to be last; colors have different numbers of candies, so the last candy is green with probability `30/60`, not `1/3`.

## Extensions & Variants

For color counts `r,b,g`, the same argument gives

`P(T_r<T_b<T_g) = [g/(r+b+g)] [b/(r+b)]`,

and

`P(T_r<T_g<T_b) = [b/(r+b+g)] [g/(r+g)]`.

Adding them gives the probability that red is the first color to be exhausted while both other colors still remain. The method generalizes naturally to more colors by reasoning about relative last-occurrence orderings.

</details>
