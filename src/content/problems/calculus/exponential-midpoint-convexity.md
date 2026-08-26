---
problemId: limits-derivatives-007
title: Exponential Midpoint Convexity
description: Prove the exponential midpoint inequality by strict convexity and identify the equality case exactly.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Derivatives, Convexity, Inequalities]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [monotonicity-convexity-critical-points-and-inflection]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [compare-e-pi-power-expressions]
family: exponential-inequalities
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

For real numbers `a` and `b`, prove

```text
(eᵃ + eᵇ)/2 ≥ exp((a + b)/2),
```

and determine exactly when equality holds.

## Think Before Revealing

The right side is the exponential evaluated at the midpoint of `a` and `b`. Which curvature property compares a function at a midpoint with the midpoint of its values?

<details>
<summary>Hint 1</summary>

Use `f(x) = eˣ` and compute its second derivative on all of `ℝ`.

</details>

<details>
<summary>Hint 2</summary>

Strict convexity gives the midpoint inequality `f((a + b)/2) ≤ [f(a) + f(b)]/2`. Its equality clause is strict unless the two input points coincide.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let `f(x) = eˣ`. For every real `x`,

```text
f″(x) = eˣ > 0,
```

so `f` is strictly convex on `ℝ`. Applying midpoint convexity,

```text
f((a + b)/2) ≤ [f(a) + f(b)]/2.
```

Substitution gives

```text
(eᵃ + eᵇ)/2 ≥ exp((a + b)/2).
```

Because the convexity is strict, equality holds exactly when the two midpoint inputs agree, namely

```text
a = b.
```

As a separate algebraic check, set `A = exp(a/2)` and `B = exp(b/2)`. Then `(A − B)² ≥ 0` gives `eᵃ + eᵇ ≥ 2 exp((a + b)/2)`, with equality exactly when `A = B`, equivalently `a = b`.

## Why This Matters

Convexity converts a derivative sign into a global inequality and supplies the equality case automatically. The proof generalizes from midpoints to arbitrary weighted averages.

## Common Mistakes

- Saying only that the exponential is convex without proving strict convexity.
- Omitting the equality condition.
- Claiming `f″ = 0` is enough to decide convexity or an inflection; here the decisive fact is `f″ > 0` everywhere.
- Using AM-GM without noting that the substituted quantities are positive.

## Extensions

For `0 ≤ λ ≤ 1`, strict convexity gives

```text
exp(λa + (1 − λ)b) ≤ λeᵃ + (1 − λ)eᵇ,
```

with equality for interior `λ` exactly when `a = b`.

</details>
