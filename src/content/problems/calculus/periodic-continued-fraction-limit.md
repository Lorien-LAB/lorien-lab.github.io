---
problemId: limits-derivatives-008
title: Periodic Continued-Fraction Limit
description: Prove finite continued-fraction convergents converge through alternating monotone subsequences before selecting the admissible fixed point.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Limits, Sequences, Fixed Points]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [bounded-monotone-convergence-and-fixed-points]
techniques: []
prerequisites: []
relatedProblems: [nested-radical-limit, infinite-power-tower-limit]
family: recursive-sequence-limits
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 4
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Define the finite continued-fraction convergents by

```text
c₀ = 2
cₙ₊₁ = 2 + 2/cₙ
```

Prove that `(cₙ)` converges and find its limit. A fixed-point equation without a convergence proof is not sufficient.

## Think Before Revealing

The update map is decreasing, so the full sequence oscillates. Look for an invariant interval and then separate the even and odd terms.

<details>
<summary>Hint 1</summary>

Show that `F(x) = 2 + 2/x` maps `[2, 3]` into itself. Compute `c₀ < c₂` and use the monotonicity of two applications of `F`.

</details>

<details>
<summary>Hint 2</summary>

Let the even and odd subsequence limits be `a` and `b`. Continuity gives `b = 2 + 2/a` and `a = 2 + 2/b`; subtract these equations before solving any fixed point.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let `F(x) = 2 + 2/x` for `x > 0`.

### Invariant interval

We have

```text
c₀ = 2
c₁ = F(2) = 3
```

If `2 ≤ x ≤ 3`, then `2/3 ≤ 2/x ≤ 1`, so

```text
2 ≤ F(x) ≤ 3
```

Thus `F` maps `[2, 3]` into itself. By induction,

```text
2 ≤ cₙ ≤ 3
```

for every `n`.

### Alternating subsequences

The map `F` is strictly decreasing. Directly,

```text
c₀ = 2 < c₂ = 2 + 2/3 = 8/3
```

Since `F ∘ F` is increasing, applying it repeatedly preserves this inequality:

```text
c₂ₙ < c₂ₙ₊₂
```

Hence the even subsequence is increasing. Applying the decreasing map `F` to `c₂ₙ < c₂ₙ₊₂` reverses the inequality:

```text
c₂ₙ₊₁ > c₂ₙ₊₃
```

so the odd subsequence is decreasing. Both subsequences remain in `[2, 3]`, hence both converge.

### A single limit

Write

```text
a = lim (n → +∞) c₂ₙ
b = lim (n → +∞) c₂ₙ₊₁
```

Continuity of `F` on `[2, 3]` gives

```text
b = 2 + 2/a
a = 2 + 2/b
```

Subtracting,

```text
(b − a)(1 − 2/(ab)) = 0
```

Because `a, b ≥ 2`, we have `ab ≥ 4`, so `ab = 2` is impossible. Therefore `a = b`. The even and odd subsequences have the same limit, so the full sequence converges.

### Fixed point and selection

Only now let the full limit be `L`. Passing to the recurrence gives

```text
L = 2 + 2/L
L² − 2L − 2 = 0
```

The candidates are

```text
L = 1 ± √3
```

Every `cₙ` is positive, so the negative candidate `1 − √3` is rejected. Hence

```text
L = 1 + √3
```

## Why This Matters

The sequence illustrates why an oscillating recurrence may converge even though it is not monotone as a whole, and why a fixed-point equation belongs at the end of the proof.

## Common Mistakes

- Claiming the continued fraction “clearly converges.”
- Solving the quadratic before proving existence of a limit.
- Proving that even and odd subsequences converge but not that their limits agree.
- Selecting `1 + √3` solely because it looks plausible, without the positivity argument.

## Extensions

For `cₙ₊₁ = p + q/cₙ` with positive `p, q`, identify an invariant interval and determine when the same alternating-subsequence strategy applies.

</details>
