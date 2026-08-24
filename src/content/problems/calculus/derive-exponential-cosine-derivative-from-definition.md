---
problemId: limits-derivatives-010
title: Derive an Exponential-of-Cosine Derivative from the Definition
description: Derive the derivative of an exponential of cosine directly from its difference quotient and standard elementary limits.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Derivatives, First Principles]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [derivative-definition-and-core-rules]
techniques: []
prerequisites: []
relatedProblems: [differentiate-variable-base-and-exponent]
family: derivative-from-definition
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Let

```text
g(x) = exp(cos x)
```

Derive `g′(x)` directly from the difference quotient, using only angle addition and standard elementary limits. Do not use the chain rule as a quoted result and do not use a Taylor series.

## Think Before Revealing

Factor out `exp(cos x)`, then create one factor governed by the standard exponential limit and a second factor governed by the first-principles derivative of cosine.

<details>
<summary>Hint 1</summary>

Define `Δₕ = cos(x + h) − cos x`. Rewrite `exp(cos(x + h))` as `exp(cos x) exp(Δₕ)`.

</details>

<details>
<summary>Hint 2</summary>

Insert `Δₕ/Δₕ` in the limiting sense. Use angle addition to show `Δₕ/h → −sin x`; then the standard exponential limit gives `(exp(Δₕ) − 1)/Δₕ → 1`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Start from the definition:

```text
(g(x + h) − g(x))/h = [exp(cos(x + h)) − exp(cos x)]/h
```

Set

```text
Δₕ = cos(x + h) − cos x
```

Then `exp(cos(x + h)) = exp(cos x) exp(Δₕ)`, so

```text
(g(x + h) − g(x))/h = exp(cos x)[exp(Δₕ) − 1]/h
```

For `Δₕ ≠ 0`, factor this exactly as

```text
(g(x + h) − g(x))/h
  = exp(cos x) · [(exp(Δₕ) − 1)/Δₕ] · (Δₕ/h)
```

If `Δₕ = 0` for isolated nonzero `h`, the product is understood through the same limiting extension: `(exp(z) − 1)/z` extends continuously to value `1` at `z = 0`.

Now angle addition gives

```text
Δₕ = cos x (cos h − 1) − sin x sin h
```

and hence

```text
Δₕ/h = cos x · [(cos h − 1)/h] − sin x · (sin h/h)
```

Using

```text
(cos h − 1)/h → 0
sin h/h → 1
```

we obtain

```text
lim (h → 0) Δₕ/h = −sin x
```

Continuity of cosine gives `Δₕ → 0`, so the standard exponential limit gives

```text
lim (z → 0) [exp(z) − 1]/z = 1
```

Multiplying the three limits,

```text
g′(x) = −sin x · exp(cos x)
```

## Why This Matters

The factorization exposes the chain rule from first principles: one limit differentiates the outer exponential and the other differentiates the inner cosine.

## Common Mistakes

- Replacing the requested function by an unrelated product of an exponential and a cosine.
- Quoting the chain rule instead of deriving the difference quotient.
- Dividing by `Δₕ` without explaining the limiting interpretation when it is zero.
- Using a Taylor or Maclaurin expansion despite the method restriction.
- Losing the minus sign in the cosine difference quotient.

## Extensions

Repeat the same factorization for `exp(u(x))` whenever the first-principles derivative of `u` is known and `u(x + h) − u(x) → 0`.

</details>
