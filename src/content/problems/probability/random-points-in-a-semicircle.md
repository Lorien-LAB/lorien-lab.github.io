---
problemId: probability-foundations-004
title: Random Points in a Semicircle
description: Partition the event by the unique sampled point that starts a covering semicircle and sum disjoint candidate-start probabilities.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Probability Foundations, Geometric Probability]
tags: [Probability, Circle, Geometric Probability, Events, Interview]
quantInterviewTopics: [probability-statistics, probability-foundations]
concepts: [probability-spaces-events, symmetry-equiprobability-geometric-probability]
techniques: []
prerequisites: []
relatedProblems: []
family: covering-arc-probability
mathDifficulty: 2
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Choose `N` points independently and uniformly on a circle. What is the probability that **all `N` points lie in some semicircle**?

Assume the continuous model, so coincident points and exact endpoint degeneracies have probability zero.

## Think Before Revealing

If a covering semicircle exists, rotate it until one of the sampled points sits at its clockwise starting boundary. Use that sampled point to label the event.

<details>
<summary>Hint 1</summary>

For each sampled point `i`, let `A_i` be the event that the clockwise semicircle beginning at point `i` contains every other point. For a fixed `i`, what is `P(A_i)`?

</details>

<details>
<summary>Hint 2</summary>

For continuously sampled points, show that when all points fit in a semicircle there is almost surely a unique sampled point that serves as the clockwise start of a covering semicircle. That makes the candidate-start events disjoint on the event of interest.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Label the sampled points `1,...,N`. For each point `i`, define `A_i` to be the event that the **clockwise semicircle starting at point `i`** contains all the other `N-1` points.

Fix `i`. Relative to point `i`, each of the other points independently lands in that clockwise half-circle with probability `1/2`. Therefore

`P(A_i) = (1/2)^(N-1)`.

Now consider the union of the `A_i` events. If all points fit in some semicircle, we can rotate a covering semicircle clockwise until its starting boundary first touches a sampled point. Under continuous sampling, ties caused by coincident points or exact antipodal endpoint configurations have probability zero. Thus the starting sampled point is unique almost surely.

Consequently, the candidate-start events are **mutually exclusive (disjoint) almost surely** on the covering event, and

`P(all N points fit in some semicircle)`

`= sum_(i=1)^N P(A_i)`

`= N (1/2)^(N-1)`

`= N / 2^(N-1)`.

Hence

**`P = N / 2^(N-1)`.**

## Why This Problem Matters

The calculation for one fixed starting point is trivial. The interview insight is finding a partition that avoids double counting. Anchoring the covering arc at a sampled point converts an existential geometric event—“there exists a semicircle”—into `N` candidate events with simple probabilities.

This pattern is broadly useful: when a random configuration admits a unique extremal or boundary object almost surely, condition or partition on that object.

## Common Mistakes

- **Multiplying by `N` without justifying disjointness.** The candidate events must form an almost-sure partition of the covering event.
- **Ignoring endpoint degeneracies.** In a continuous model they have probability zero, which is why the clean partition is valid.
- **Assuming any sampled point can be the start simultaneously.** A covering configuration has a unique clockwise extreme almost surely.
- **Treating the points as ordered around the circle from the start.** No order-statistic machinery is needed for the basic argument.

## Extensions & Variants

### A shorter covering arc

Suppose the target arc occupies a fraction `x` of the circumference, with `0 < x <= 1/2`. For a fixed sampled starting point, the probability that every other point lies in the clockwise arc is

`x^(N-1)`.

The same unique-start argument applies for `x<=1/2`, so

`P(all N points fit in some arc of fraction x) = N x^(N-1)`.

At `x=1/2` this recovers `N / 2^(N-1)`.

### Why the restriction `x<=1/2` matters

For longer arcs, multiple sampled starting points can cover the same configuration with positive probability, so the simple disjoint-event sum no longer applies unchanged.

</details>
