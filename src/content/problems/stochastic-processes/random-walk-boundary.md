---
problemId: lorien-stochastic-001
title: Random Walk to a Boundary
description: Derive the probability that a finite nearest-neighbor walk reaches its upper absorbing boundary before its lower boundary, for fair, biased, and deterministic steps.
date: 2026-08-16
updated: 2026-08-24
domain: Mathematics & Statistics
category: Stochastic Processes
subcategories: [Random Walk, Absorbing Boundaries]
tags: [Random Walk, Probability, Markov Chains, Interview]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
concepts: [finite-state-markov-chains]
techniques: [first-step-analysis, recursion-problem-solving]
prerequisites: []
relatedProblems: [random-walk-return-time-on-cube]
family: gamblers-ruin
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: true
---

## Problem

On states `0, 1, ..., N`, start at `i`. Each step moves up with probability `p` and down with probability `q = 1-p`; states 0 and `N` are absorbing. Find `u_i = P_i(hit N before 0)`, including fair, biased, and deterministic cases. Then evaluate the three cases listed in the solution.

## Think Before Revealing

Write a boundary-value recurrence before guessing from symmetry.

<details>
<summary>Hint 1</summary>

Use `u_0 = 0`, `u_N = 1`, and condition on the first step from an interior state.

</details>

<details>
<summary>Hint 2</summary>

For `p != q`, the characteristic roots are 1 and `q/p`. The fair case is the repeated-root limit and is linear in `i`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

For `0 < i < N`, first-step analysis gives

```text
u_i = p u_{i+1} + q u_{i-1},    u_0 = 0,    u_N = 1
```

The boundary conditions give

```text
u_i = i/N                                      when p=q=1/2
u_i = [1-(q/p)^i] / [1-(q/p)^N]              when 0<p<1 and p!=q
```

At the deterministic endpoints, `p = 0` gives `u_i = 0` for every `i < N`, while `p = 1` gives `u_i = 1` for every `i > 0`. These are stated separately because the biased formula assumes `0 < p < 1`.

The requested evaluations are:

```text
N=4, i=2, p=1/2       -> upper boundary first with probability 1/2
N=3, i=1, p=2/3       -> upper boundary first with probability 4/7
N=1000, i=80, p=1/2   -> zero first with probability 1-80/1000 = 92/100 = 23/25
```

The last line uses the complement of upper-boundary success within this two-absorbing-boundary model.

## Why This Matters

One boundary-value recurrence owns a large family of finite-walk interview wrappers without duplicating their public identity.

## Common Mistakes

- Swapping \(p\) and \(q\) inside the ratio \(q/p\).
- Using the biased expression at \(p=0\), \(p=1\), or directly at \(p=q\).
- Forgetting that “hit zero first” is the complement only under the stated two-boundary stopping model.
- Preserving a plank or casino wrapper as a second public Problem when it has the same recurrence and boundaries.

## Extensions

1. Solve the expected absorption-time recurrence with zero boundary times.
2. Let the up probability depend on the current state and solve the resulting nonconstant difference equations.
3. Compare absorption probabilities with first positive return on a finite graph.

</details>
