---
problemId: limits-derivatives-004
title: A Logarithm-Power Limit at Zero
description: Evaluate a one-sided power-logarithm limit with a valid quotient transformation and preserve the sign of the approach to zero.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Limits, Asymptotic Growth]
tags: [Calculus, Interview]
concepts: [indeterminate-limits-and-growth-rates]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [exponential-over-polynomial-limit]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
family: deterministic-growth-rate-limits
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

Evaluate the one-sided limit

```text
lim (x → 0⁺) x² ln x.
```

State whether the expression approaches zero from above or below, and justify every hypothesis of any theorem you invoke.

## Think Before Revealing

The displayed expression is a product, so L'Hôpital's rule does not apply to it directly. Rewrite it as a quotient whose denominator diverges on the right of zero.

<details>
<summary>Hint 1</summary>

Rewrite the product as the quotient `x² ln x = (ln x)/x⁻²`. Determine the signs and extended-real limits of numerator and denominator as `x → 0⁺`.

</details>

<details>
<summary>Hint 2</summary>

On `0 < x < δ`, differentiate numerator and denominator. The derivative quotient simplifies exactly to `−x²/2`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Rewrite and right-neighborhood gate

First transform the product:

```text
x² ln x = (ln x)/x⁻².
```

As `x → 0⁺`, the numerator tends to `−∞` and the denominator to `+∞`, so this is an extended-real infinity-over-infinity quotient. On a punctured right neighborhood `0 < x < δ`, the functions `ln x` and `x⁻²` are differentiable. The denominator derivative is

```text
−2x⁻³ ≠ 0
```

throughout that neighborhood. Finally, the derivative quotient has the ordinary limit

```text
lim (x → 0⁺) (1/x)/(−2x⁻³) = 0.
```

Thus the full one-sided gate is satisfied.

### Apply the rule

L'Hôpital's rule yields

```text
lim (x → 0⁺) (ln x)/x⁻²
= lim (x → 0⁺) (1/x)/(−2x⁻³)
= lim (x → 0⁺) −x²/2 = 0.
```

Equivalently, the exact derivative quotient is

```text
(1/x)/(−2x⁻³) = −x²/2 → 0.
```

### Recover the sign

For `0 < x < 1`, we have `x² > 0` and `ln x < 0`, so the original product is negative. Therefore it approaches zero from below:

```text
0⁻.
```

The real limit is still the number `0`; the superscript records the one-sided sign of nearby values.

## Why This Matters

This is a compact test of form recognition, one-sided domains, theorem hypotheses, and sign preservation. Correct symbolic differentiation alone does not settle all four.

## Common Mistakes

- Applying L'Hôpital directly to the product `x² ln x`.
- Calling `(−∞)/(+∞)` a determined value instead of an infinity-over-infinity form.
- Omitting differentiability or the condition `−2x⁻³ ≠ 0` on the punctured right neighborhood.
- Reporting only unsigned `0` when approach direction was requested.

## Extensions

For any `a > 0`, the same quotient gate or the substitution `x = exp(−t)` proves `x^(a) ln x → 0⁻` as `x → 0⁺`.

</details>
