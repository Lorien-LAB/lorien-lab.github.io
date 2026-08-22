---
problemId: probability-foundations-006
title: Meeting Probability from Arrival Times
description: Map two independent uniform arrival times to the unit square and compute the meeting event by geometric area.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Probability Foundations, Geometric Probability]
tags: [Probability, Uniform Distribution, Geometric Probability, Interview]
quantInterviewTopics: [probability-statistics, probability-foundations]
concepts: [symmetry-equiprobability-geometric-probability]
techniques: []
prerequisites: []
relatedProblems: []
family: arrival-time-geometry
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

Two people agree to meet during a one-hour interval. Each arrives independently and uniformly during the hour and waits for 15 minutes before leaving. What is the probability that they meet?

## Think Before Revealing

Do not treat the two arrival times separately. Represent them together as one random point.

<details>
<summary>Hint 1</summary>

Normalize the hour to `[0,1]`. If the arrival times are `x` and `y`, the pair `(x,y)` is uniform in the **unit square**.

</details>

<details>
<summary>Hint 2</summary>

They meet exactly when `|x-y| <= 1/4`. It is easier to compute the area of the two regions where `|x-y|>1/4`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Normalize the hour to `[0,1]`. Let `x` and `y` denote the two independent uniform arrival times. Independence and uniformity imply that `(x,y)` is uniformly distributed over the **unit square**.

Each person waits one quarter of an hour, so they meet exactly when their arrival times differ by no more than `1/4`:

`|x-y| <= 1/4`.

Geometrically, this is the diagonal band between

`y = x + 1/4`

and

`y = x - 1/4`.

The complement consists of two congruent right triangles: one above the band and one below it. Each triangle has leg length

`1 - 1/4 = 3/4`.

Therefore the total complement area is

`2 * (1/2) * (3/4)^2 = 9/16`.

Since the unit square has area 1,

`P(meet) = 1 - 9/16 = 7/16`.

Thus the answer is

**`7/16`.**

## Why This Problem Matters

This is a standard example of **geometric probability**: two independent one-dimensional continuous variables become a point in a two-dimensional sample space. Once the joint sample space is drawn, the probability becomes an area calculation instead of a case-by-case timing argument.

The same modeling trick applies to overlapping intervals, random scheduling, execution windows, and many continuous matching problems.

## Common Mistakes

- **Using one-dimensional interval length.** There are two random arrival times, so the natural joint sample space is two-dimensional.
- **Forgetting independence.** Independence is what makes the pair uniformly distributed across the whole square rather than concentrated on some dependence pattern.
- **Counting only one triangle in the complement.** Either person can arrive too early relative to the other.
- **Using a 15-minute band width of `1/4` as the final probability.** The event is an area, not a single interval length.

## Extensions & Variants

If each person waits a fraction `w` of the total time, with `0<=w<=1`, then the complement consists of two right triangles of leg length `1-w`. Their total area is

`(1-w)^2`.

Therefore

`P(meet) = 1 - (1-w)^2 = 2w - w^2`.

At `w=1/4`, this gives

`2(1/4) - (1/4)^2 = 1/2 - 1/16 = 7/16`.

</details>
