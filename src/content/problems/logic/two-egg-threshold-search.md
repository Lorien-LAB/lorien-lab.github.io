---
problemId: logic-problem-simplification-003
title: Two-Resource Threshold Search
description: Find an unknown threshold among 100 ordered levels with two destructible probes while minimizing the worst-case number of tests.
date: '2026-08-30'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Dynamic Programming, Minimax Search]
tags: [Dynamic Programming, Recurrence, Worst Case, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, problem-simplification, algorithms-data-structures-cpp, dynamic-programming-algorithms]
concepts: [small-cases-recurrence-and-structural-simplification, recursion-problem-solving]
techniques: [recursion-problem-solving]
prerequisites: []
relatedProblems: [minimum-comparisons-for-both-extremes]
family: threshold-search
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 20
status: solved
featured: false
---

## Problem

There are 100 physical levels, labeled 1 through 100, and an unknown deterministic threshold $T\in\{0,\ldots,100\}$. A probe survives a test at or below $T$, but is destroyed by a test above $T$; $T=0$ means no physical level is safe. A destroyed probe cannot be reused, while a surviving probe can be tested again. Using two identical probes, determine the smallest possible worst-case number of tests needed to identify $T$, and give a strategy that attains it.

## Think Before Revealing

<details><summary>Hint 1</summary>Let the number of remaining tests be the resource, and ask how many consecutive levels can be resolved with $e$ probes and $d$ tests.</details>
<details><summary>Hint 2</summary>With two probes, choose successive test levels using decreasing step sizes so that an early destruction leaves exactly enough tests for a linear scan.</details>

<details>
<summary>Show Solution</summary>

## Solution

Measure capacity above a known-safe sentinel, initially the boundary at level 0 below the physical levels. Let $h_e(d)$ be the largest number of consecutive unresolved physical levels above that known-safe sentinel whose threshold can always be resolved with $e$ probes and at most $d$ tests. The base cases are $h_0(d)=0$ and $h_e(0)=0$.

For a first test, reserve $h_{e-1}(d-1)$ levels below the test level and $h_e(d-1)$ levels above it. If the probe is destroyed, there are $e-1$ probes and $d-1$ tests for the lower block. If it survives, there are still $e$ probes and $d-1$ tests for the upper block. No strategy can cover larger branches than those two capacities, while placing the test level between blocks of exactly those sizes attains both capacities. The tested level itself contributes one more resolved level, so

$$
h_e(d)=1+h_{e-1}(d-1)+h_e(d-1).
$$

In the exact plain-text convention used here, the recurrence is h_e(d)=1+h_(e-1)(d-1)+h_e(d-1).

With one probe, only a bottom-up scan is safe, so $h_1(d)=d$. Substituting this into the recurrence gives

$$
h_2(d)=1+(d-1)+h_2(d-1)=d+h_2(d-1).
$$

Since $h_2(0)=0$, summing the increments yields

$$
h_2(d)=1+2+\cdots+d=d(d+1)/2.
$$

Equivalently, h_2(d)=d(d+1)/2.

Now $h_2(13)=91<100\leq105=h_2(14)$. Therefore 13 tests cannot cover all 100 levels, while 14 tests can. The recurrence gives both a lower bound and an attainable strategy.

Here is an executable decreasing-step schedule. Test the first probe at level 14, then—after each survival—advance by 13, 12, 11, and so on, never passing level 100. The resulting test levels are

$$
14,\ 27,\ 39,\ 50,\ 60,\ 69,\ 77,\ 84,\ 90,\ 95,\ 99,\ 100.
$$

If the first probe is destroyed at a tested level $x$, let $y$ be its preceding surviving level, with $y=0$ for the first test. Test the second probe successively at $y+1,y+2,\ldots,x-1$. If the second probe is destroyed at level $z$, infer that $T$ is one less than that destroyed level, namely $T=z-1$. If all remaining levels through $x-1$ survive, infer $T=x-1$. If every scheduled first-probe test survives through level 100, infer $T=100$.

If first-probe destruction occurs on its $k$-th test before the final truncated steps, that jump has size $15-k$, so the linear scan needs at most $14-k$ more tests. The total is at most $k+(14-k)=14$. The truncated steps near 100 can only reduce this total. Thus the smallest worst-case number of tests is 14.

## Why This Problem Matters

The recurrence replaces a large decision tree with a capacity question: how much uncertainty can a fixed resource budget absorb? The same minimax viewpoint appears in dynamic programming, fault-tolerant search, and testing strategies with irreversible failures.

## Common Mistakes

- Using equal-size jumps, which makes early-destruction and late-destruction branches have different worst cases.
- Giving the decreasing-step schedule without proving that 13 tests are impossible.
- Reversing the recurrence branches after a probe is destroyed or survives.
- Forgetting that a destroyed first probe forces a bottom-up scan with the second probe.

## Extensions

- For $e$ probes, iterate the same recurrence to compute $h_e(d)$ and choose the first test level from the lower-block capacity.
- For a different number of levels, find the least $d$ satisfying $h_2(d)\geq N$.
- Compare this worst-case objective with a strategy that minimizes expected tests under a specified distribution for the threshold.

</details>
