---
problemId: limits-derivatives-012
title: Infinite Power-Tower Limit
description: Find the positive tower base for value two, then prove its finite towers converge to two rather than the other fixed-point branch.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Limits, Sequences, Fixed Points]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [bounded-monotone-convergence-and-fixed-points]
techniques: []
prerequisites: []
relatedProblems: [periodic-continued-fraction-limit, nested-radical-limit]
family: recursive-sequence-limits
mathDifficulty: 3
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Find the positive base `x` for which the infinite power tower is intended to have value `2`:

```text
x ^ (x ^ (x ^ ⋯)) = 2
```

Then define the finite towers and prove that, for your base, they really converge to `2`. Distinguish the requested base from the tower limit and address every fixed-point branch.

## Think Before Revealing

If a tower limit were `2`, the outermost relation would impose an equation on the base. That equation produces a candidate base; finite-tower convergence must still be proved independently.

<details>
<summary>Hint 1</summary>

Conditionally set the tail equal to `2` to obtain `2 = x²`. Keep the positive root, then define `t₀ = √2` and `tₙ₊₁ = (√2) ^ tₙ`.

</details>

<details>
<summary>Hint 2</summary>

Prove `tₙ` is increasing using the increasing map `y ↦ (√2) ^ y`. Separately prove `tₙ < 2` by comparing `(√2) ^ tₙ` with `(√2)²`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Determine the base

If the tower has value `2`, removing its first base leaves the same tail value, so necessarily

```text
2 = x²
```

The requested base is positive, hence

```text
x = √2
```

This is only a candidate base. It is not yet a convergence proof, and the base `√2` is not the claimed limit `2`.

### Monotonicity by induction

Define finite towers by

```text
t₀ = √2
tₙ₊₁ = (√2) ^ tₙ
```

Because `√2 > 1` and `t₀ > 1`,

```text
t₁ = (√2) ^ t₀ > √2 = t₀
```

Assume `tₙ > tₙ₋₁`. The function `y ↦ (√2) ^ y` is strictly increasing, so

```text
tₙ₊₁ = (√2) ^ tₙ > (√2) ^ tₙ₋₁ = tₙ
```

Thus `(tₙ)` is increasing.

### Upper bound by induction

The base case is `t₀ = √2 < 2`. If `tₙ < 2`, monotonicity of the exponential gives

```text
tₙ₊₁ = (√2) ^ tₙ < (√2)² = 2
```

Therefore every finite tower satisfies `tₙ < 2`.

### Convergence and branch selection

The sequence is increasing and bounded above by `2`, so bounded monotone convergence gives a limit `L ≤ 2`. Continuity now permits

```text
L = (√2) ^ L
```

Both `L = 2` and `L = 4` satisfy this fixed-point equation:

```text
(√2)² = 2
(√2)⁴ = 4
```

To exclude any additional fixed point in the interval allowed by the sequence, define `g(y) = (√2) ^ y − y`. On `[0, 2]`,

```text
g′(y) = (√2) ^ y ln(√2) − 1
      ≤ 2 ln(√2) − 1
      = ln 2 − 1 < 0
```

Thus `g` is strictly decreasing on `[0, 2]`. Since `g(2) = 0`, the value `2` is the unique fixed point in that interval. The fixed-point equation alone therefore does not choose a branch globally. The proved bound `L ≤ 2` rejects branch `4`, while positivity places the limit in the interval where the fixed point is unique. Hence

```text
L = 2
```

The requested base is `√2`; the separately proved finite-tower limit is `2`. They must not be conflated.

## Why This Matters

Power towers make the “fixed points are candidates” warning concrete. Even a correct base equation can coexist with multiple fixed points, so the finite iterates decide the admissible branch.

## Common Mistakes

- Reporting `2` as the base instead of `√2`.
- Assuming the candidate base automatically defines a convergent infinite tower.
- Passing to `L = (√2) ^ L` before proving convergence.
- Ignoring the second fixed-point branch `4`.
- Rejecting `4` by intuition rather than the proved upper bound.

## Extensions

For a general positive base `b`, study finite towers `tₙ₊₁ = b ^ tₙ` and ask which invariant intervals make a selected fixed point dynamically attainable.

</details>
