---
problemId: limits-derivatives-009
title: Inflection Point of a Normal CDF
description: Differentiate a Normal cumulative distribution function and prove its unique inflection point through the sign change of its second derivative.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Derivatives, Convexity, Probability Functions]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [monotonicity-convexity-critical-points-and-inflection, derivative-definition-and-core-rules]
techniques: []
prerequisites: []
relatedProblems: []
family: curvature-and-inflection
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

Let `F` be the CDF of a Normal random variable with location `μ ∈ ℝ` and scale `σ > 0`:

```text
F(x) = ∫ from −∞ to x [1/(σ√(2π))] exp(−(t − μ)²/(2σ²)) dt
```

Find and prove the unique inflection point of `F`.

## Think Before Revealing

An inflection point is established by a change of concavity, not merely by solving one equation. Differentiate twice and isolate the factor that controls the sign.

<details>
<summary>Hint 1</summary>

The fundamental theorem of calculus makes `F′` the Normal density. Differentiate that density with the chain rule.

</details>

<details>
<summary>Hint 2</summary>

After differentiating, every factor in `F″` except `−(x − μ)` is strictly positive because `σ > 0`. Make a left/right sign table around `μ`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

By the fundamental theorem of calculus,

```text
F′(x) = [1/(σ√(2π))] exp(−(x − μ)²/(2σ²))
```

Differentiate once more. The derivative of the exponent is `−(x − μ)/σ²`, so

```text
F″(x) = −[(x − μ)/(σ³√(2π))] exp(−(x − μ)²/(2σ²))
```

Since `σ > 0`, the denominator is positive, and the exponential factor is positive for every real `x`. Thus the sign of `F″` is the sign of `−(x − μ)`:

```text
F″(x) > 0 for x < μ
F″(x) < 0 for x > μ
```

Therefore `F` is convex to the left of `μ` and concave to the right. This actual positive-to-negative sign change proves

```text
x = μ is the unique inflection point
```

The proof is not merely the observation `F″(μ) = 0`; that equation supplies a candidate, while the sign change establishes the inflection and its uniqueness.

## Why This Matters

The calculation ties distribution shape to calculus: the density is largest at the CDF's inflection. It also models the correct interview habit of separating a candidate equation from a sign-change proof.

## Common Mistakes

- Omitting the condition `σ > 0`.
- Losing a factor of `σ²` and writing the wrong `σ³` denominator.
- Solving only `F″ = 0` and calling that an inflection proof.
- Forgetting that the exponential factor is strictly positive and therefore cannot create another sign change.

## Extensions

Show that `F′` has its unique maximum at `μ`. Then standardize with `z = (x − μ)/σ` and explain why changing `σ` alters horizontal scale but not the standardized sign pattern.

</details>
