---
problemId: lorien-stochastic-001
title: Random Walk to a Boundary
description: An original first-step-analysis exercise for the probability of reaching an upper boundary before a lower boundary.
date: 2026-08-16
originType: original
domain: Mathematics & Statistics
category: Stochastic Processes
subcategories: [Random Walk, Recursion]
tags: [Random Walk, Probability, Interview]
concepts: []
techniques: [first-step-analysis, recursion-problem-solving]
prerequisites: []
relatedProblems: []
family: gamblers-ruin
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: true
---

## Problem

A token starts at position 2 on the integer line. At each step it moves one unit left or right with equal probability. The process stops when the token first reaches 0 or 4. What is the probability that it reaches 4 before 0?

## Think before revealing

Let p(k) denote the probability of reaching 4 before 0 when the token starts at k.

<details>
<summary>Hint 1</summary>

Write p(k) in terms of p(k-1) and p(k+1), together with the boundary values p(0) and p(4).

</details>

<details>
<summary>Show Solution</summary>

## Solution

First-step analysis gives p(k) = 0.5 p(k-1) + 0.5 p(k+1), with p(0) = 0 and p(4) = 1. The solutions of this second-difference equation are linear in k, so p(k) = k/4. Starting from 2 therefore gives p(2) = 1/2.

## Why this problem matters

The key interview skill is converting a stochastic process into a recursive state equation instead of attempting to enumerate paths.

## Common mistakes

One common mistake is to reason only from symmetry without identifying the boundary-value recursion that generalizes to asymmetric or larger problems.

</details>
