---
problemId: limits-derivatives-003
title: Exponential Growth over a Polynomial
description: Evaluate exponential growth over a quadratic by checking and renewing every hypothesis for two L'Hopital steps.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Limits, Asymptotic Growth]
tags: [Calculus, Interview]
concepts: [indeterminate-limits-and-growth-rates]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [logarithm-power-limit-at-zero]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
family: deterministic-growth-rate-limits
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
status: solved
featured: false
---

## Problem

Evaluate

```text
lim (x → +∞) eˣ/x².
```

If you use L'Hôpital's rule more than once, verify its full hypotheses for each application.

## Think Before Revealing

The initial quotient has an infinity-over-infinity form, but that observation is only one part of the gate. What must be rechecked after differentiating once?

<details>
<summary>Hint 1</summary>

On a positive tail, verify differentiability of `eˣ` and `x²` and check that the denominator derivative `2x` never vanishes.

</details>

<details>
<summary>Hint 2</summary>

After the first application the quotient is `eˣ/(2x)`, still infinity-over-infinity. Renew the gate; its denominator derivative is the nonzero constant `2`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### First gate

As `x → +∞`, both `eˣ` and `x²` tend to `+∞`, so the original quotient has extended-real infinity-over-infinity form. On the positive tail `x > 0`, both functions are differentiable and the denominator derivative satisfies `2x ≠ 0`.

The derivative quotient is `eˣ/(2x)`, and its extended-real limit exists and equals `+∞`:

```text
lim (x → +∞) eˣ/(2x) = +∞,
```

as the renewed valid gate below establishes. Thus every hypothesis for the first application is accounted for.

### First application

L'Hôpital's rule gives

```text
lim (x → +∞) eˣ/x²
= lim (x → +∞) eˣ/(2x).
```

### Renew the gate

For the new quotient, `eˣ → +∞` and `2x → +∞`, so it again has infinity-over-infinity form. Both `eˣ` and `2x` are differentiable on the positive tail. The new denominator derivative is

```text
2 ≠ 0.
```

The next derivative quotient has the existing extended-real limit

```text
lim (x → +∞) eˣ/2 = +∞.
```

This completes a separate, full gate for the second application.

### Second application

Applying the rule again,

```text
lim (x → +∞) eˣ/(2x)
= lim (x → +∞) eˣ/2 = +∞.
```

Combining the two valid applications,

```text
lim (x → +∞) eˣ/x²
= lim (x → +∞) eˣ/(2x)
= lim (x → +∞) eˣ/2
= +∞.
```

## Why This Matters

The calculation demonstrates the exponential-over-polynomial growth hierarchy while making the theorem's renewed hypotheses explicit. It is a model for any repeated L'Hôpital argument.

## Common Mistakes

- Treating infinity-over-infinity as the entire gate.
- Forgetting to check `2x ≠ 0` on the chosen positive tail.
- Applying the rule a second time without checking the new quotient.
- Writing an unsigned infinity instead of the proved positive value `+∞`.

## Extensions

For a fixed positive integer `n`, repeat the same renewed-gate argument to show `eˣ/xⁿ → +∞` as `x → +∞`.

</details>
