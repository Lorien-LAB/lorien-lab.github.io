---
problemId: limits-derivatives-001
title: Differentiate a Variable Base and Exponent
description: Derive the generalized derivative for a positive variable base and variable exponent, then apply it to x raised to x and a logarithmic power.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Derivatives, Logarithmic Differentiation]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [derivative-definition-and-core-rules]
techniques: [logarithmic-differentiation]
prerequisites: []
relatedProblems: [derive-exponential-cosine-derivative-from-definition]
family: variable-base-variable-exponent
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Let `I` be an interval. Suppose `u: I → (0, +∞)` and `v: I → ℝ` are differentiable. Derive a formula for

```text
d(u(x)^(v(x)))/dx.
```

Then use it to differentiate `xˣ` on `x > 0`, and differentiate

```text
y = (ln x)^(ln x)
```

on `x > 1`.

## Think Before Revealing

Neither the ordinary power rule nor the ordinary exponential rule handles a simultaneously varying base and exponent. Which transform moves the exponent down while preserving a real-valued identity?

<details>
<summary>Hint 1</summary>

Use positivity of the base to take a logarithm. Keep the hypotheses on `u` and `v` visible before writing `ln y = v ln u`.

</details>

<details>
<summary>Hint 2</summary>

After differentiating `ln y = v ln u`, you have `y'/y`. Multiply by the original `y = uᵛ`; for the last specialization, differentiate `(ln x)(ln ln x)`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### General positive-base formula

Let `u: I → (0, +∞)` be differentiable, and independently let `v: I → ℝ` be differentiable. Define `y = u(x)^(v(x)) > 0`. Only after these hypotheses are fixed do we take logarithms:

```text
ln y = v ln u.
```

Differentiate both sides:

```text
y'/y = v' ln u + v(u'/u).
```

Since `y = uᵛ`,

```text
d(u(x)^(v(x)))/dx
= u(x)^(v(x)) [v'(x) ln u(x) + v(x)u'(x)/u(x)].
```

### Specialization to x Raised to x

For `x > 0`, set `u(x) = x` and `v(x) = x`. Then `u' = v' = 1`, hence

```text
d(xˣ)/dx = xˣ(ln x + 1),   x > 0.
```

### Logarithmic-power specialization

For `y = (ln x)^(ln x)`, real positivity of the base requires `ln x > 0`, so `x > 1`. Taking logarithms,

```text
ln y = (ln x)(ln ln x).
```

The product and chain rules give

```text
y'/y
= (ln ln x)/x + (ln x)/(x ln x)
= (ln ln x + 1)/x.
```

Restoring `y`,

```text
y' = [(ln x)^(ln x)/x](ln ln x + 1),   x > 1.
```

## Why This Matters

The derivation separates a reusable rule from its domain. In an interview, stating positivity and both differentiability hypotheses before taking logarithms is as important as obtaining the algebraic formula.

## Common Mistakes

- Using `v u^(v−1)u'` when `v` also varies.
- Taking `ln u` without `u > 0` in the real setting.
- Forgetting that `v` needs its own differentiability hypothesis.
- Stopping at `y'/y` and losing the outer factor `uᵛ`.
- Giving the last specialization on `x > 0` instead of the correct domain `x > 1`.

## Extensions

Let every base `uⱼ: I → (0, +∞)` be differentiable and every exponent `vⱼ: I → ℝ` be differentiable. Then each base value `uⱼ(x)` is strictly positive, so every factor `uⱼ(x)^(vⱼ(x))` is positive before logarithms are taken. Derive the logarithmic derivative of `y = ∏ⱼ uⱼ(x)^(vⱼ(x))`: each factor contributes `vⱼ' ln uⱼ + vⱼ uⱼ'/uⱼ`, after which the result is multiplied by `y`.

</details>
