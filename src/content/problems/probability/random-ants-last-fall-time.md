---
problemId: order-statistics-extremes-003
title: Random Ants and the Last Fall Time
description: Replace colliding ants by ghost trajectories, identify iid Uniform remaining distances, and compute the expected last-fall time as a sample maximum.
date: 2026-08-23
domain: Mathematics & Statistics
category: Probability
subcategories: [Order Statistics, Extremes]
tags: [Probability, Statistics, Order Statistics, Interview]
quantInterviewTopics: [probability-statistics, order-statistics-extremes]
concepts: [order-statistics-basics]
techniques: [identity-swapping-invariance]
prerequisites: []
relatedProblems: [ants-crossing-line, uniform-sample-extremes-and-range]
family: random-ants-order-statistic
mathDifficulty: 2
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

A unit-length rope contains \(n\) identical ants. Their initial positions are independent and Uniform on the rope. Independently, each ant initially chooses left or right with probability \(1/2\). Every ant moves at unit speed. When two ants meet, both reverse direction. An ant falls off when it reaches an endpoint.

What is the expected time until the **last** ant falls off?

## Think Before Revealing

Tracking physical identities through collisions is the wrong representation. First remove the interactions; only then ask what random variable determines the last exit.

<details>
<summary>Hint 1</summary>

For identical ants moving at equal speed, two ants bouncing off each other are observationally equivalent to two ghost ants passing straight through while their labels swap.

</details>

<details>
<summary>Hint 2</summary>

For one ghost ant starting at \(X\sim U(0,1)\), its remaining distance is \(X\) if it moves left and \(1-X\) if it moves right. What is the distribution of that distance?

</details>

## Solution

### Step 1 — remove collisions by relabeling

At a head-on collision, two identical ants reverse directions. If instead we let two ghost trajectories pass through each other and exchange labels, the set of physical positions at every later time is unchanged.

Therefore the time when the final ant falls is the same as in a noninteracting ghost system.

### Step 2 — one ghost ant has a Uniform remaining distance

Let \(X\sim U(0,1)\) be its starting position and let the direction be independent and fair. Its remaining distance is

\[
D=
\begin{cases}
X,&\text{if it moves left},\\
1-X,&\text{if it moves right}.
\end{cases}
\]

Both \(X\) and \(1-X\) are Uniform on \((0,1)\), so

\[
D\sim U(0,1).
\]

Because positions and directions are independent across ants, \(D_1,\ldots,D_n\) are iid Uniform.

### Step 3 — the last fall time is a maximum order statistic

At unit speed, each distance equals the corresponding fall time. Hence

\[
T_n=\max(D_1,\ldots,D_n).
\]

For \(0\le t\le1\),

\[
P(T_n\le t)=t^n,
\]

so

\[
f_{T_n}(t)=nt^{n-1}.
\]

Therefore

\[
E[T_n]
=\int_0^1 t\,nt^{n-1}\,dt
=\boxed{\frac{n}{n+1}}.
\]

## Why This Matters

The problem deliberately combines two interview patterns. First use an invariance to eliminate a complicated interacting system; then recognize that the remaining random quantity is simply a sample maximum.

## Common Mistakes

- Simulating or tracking every collision.
- Treating the physical ant labels as relevant to the final fall time.
- Using the distance to the **nearest** endpoint; the initial direction chooses which endpoint the ghost ant reaches.
- Forgetting to derive the maximum distribution before taking its expectation.

## Extensions

1. With \(n=500\), the expected last-fall time is
   \[
   \frac{500}{501}.
   \]
2. If the rope has length \(L\) and speed is \(v\), scaling gives \(E[T_n]=\frac{L}{v}\frac{n}{n+1}\).
3. Compare this with `ants-crossing-line`: both use identity swapping, but that problem asks deterministic collision/endpoint counts, while this one becomes a random order-statistic problem.
