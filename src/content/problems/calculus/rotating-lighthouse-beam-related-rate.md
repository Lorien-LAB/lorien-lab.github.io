---
problemId: limits-derivatives-005
title: Rotating Lighthouse Beam Related Rate
description: Differentiate a lighthouse beam geometry constraint and specialize the signed shore rate to one full revolution per minute.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Derivatives, Related Rates, Geometry]
tags: [Calculus, Interview]
concepts: [derivative-definition-and-core-rules]
techniques: [related-rates-and-implicit-differentiation]
prerequisites: []
relatedProblems: []
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
family: geometric-related-rates
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

A lighthouse is `a > 0` miles from a straight shore, measured along a perpendicular segment. Let `s(t)` be the signed shore coordinate of the point illuminated by the beam, and let `θ(t)` be the differentiable angle from the perpendicular. Assume `cos θ ≠ 0`.

1. Derive a general formula for `ds/dt` in terms of `a`, `θ`, and `dθ/dt`.
2. Specialize to one full revolution per minute and express the result both in terms of `θ` and in terms of `s`.

## Think Before Revealing

The right triangle gives a relation among a fixed perpendicular distance, a signed shore coordinate, and an angle. Write that relation before differentiating.

<details>
<summary>Hint 1</summary>

With the angle measured from the perpendicular, the geometric constraint is `s = a tan θ`. Remember that both `s` and `θ` depend on time.

</details>

<details>
<summary>Hint 2</summary>

Differentiate first to get `ds/dt = a sec² θ (dθ/dt)`. One revolution per minute is `2π` radians per minute, and `sec² θ = 1 + s²/a²`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

The right-triangle geometry gives

```text
s = a tan θ,
a > 0,
cos θ ≠ 0.
```

Here `s = s(t)` is a signed coordinate, not a speed, and `θ = θ(t)`. Differentiate the constraint before substituting a numerical angular rate:

```text
ds/dt = a sec² θ (dθ/dt).
```

Thus the general related-rate identity is

```text
ds/dt = a sec² θ (dθ/dt).
```

One full revolution per minute gives

```text
dθ/dt = 2π radians per minute.
```

Substitution yields

```text
ds/dt = 2πa sec² θ.
```

Finally,

```text
sec² θ = 1 + tan² θ = 1 + s²/a²,
```

so the two exact specialized forms are

```text
ds/dt = 2πa sec² θ
      = 2π(a² + s²)/a miles per minute.
```

The sign is the direction along the chosen shore coordinate. Its magnitude is the linear speed of the illuminated point.

## Why This Matters

The problem tests modeling more than differentiation: the angular convention, signed coordinate, units, and substitution order all affect the answer.

## Common Mistakes

- Writing `s` as though it were a speed rather than a coordinate.
- Replacing one revolution per minute by `1` radian per minute instead of `2π`.
- Omitting `dθ/dt` when differentiating `tan θ(t)`.
- Substituting before differentiating.
- Dropping miles-per-minute units from the final linear rate.

## Extensions

If the beam rotates with a variable angular rate `ω(t)`, replace `2π` by `ω(t)`. Analyze the growth of the shore speed as `cos θ → 0` while noting that the tangent model is then approaching its domain boundary.

</details>
