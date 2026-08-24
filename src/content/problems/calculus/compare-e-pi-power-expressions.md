---
problemId: limits-derivatives-002
title: Compare Two Transcendental Powers
description: Compare two transcendental powers by maximizing the logarithm-over-input function with a first-derivative sign chart.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Derivatives, Monotonicity, Inequalities]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [monotonicity-convexity-critical-points-and-inflection]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [exponential-midpoint-convexity]
family: exponential-inequalities
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

Which is larger, `e^(π)` or `π^(e)`? Prove the comparison by analyzing a single real function on full intervals.

## Think Before Revealing

Taking logarithms turns the two powers into `π` and `e ln π`. Can both sides be compared through the same one-variable ratio?

<details>
<summary>Hint 1</summary>

Study `f(x) = (ln x)/x` for `x > 0`. Its derivative changes sign at one familiar constant.

</details>

<details>
<summary>Hint 2</summary>

Compute `f'(x) = (1 − ln x)/x²`. Since `π > e`, use the decreasing interval `(e, +∞)` to compare `f(π)` with `f(e)`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Define

```text
f(x) = (ln x)/x,   x > 0.
```

Then

```text
f'(x) = (1 − ln x)/x².
```

Because `x² > 0`, the sign comes entirely from `1 − ln x`:

- `f'(x) > 0` on `(0, e)`;
- `f'(e) = 0`;
- `f'(x) < 0` on `(e, +∞)`.

Thus `f` increases on `(0, e)` and decreases on `(e, +∞)`. Therefore, `f` has its global maximum at `e`. Since `π > e`,

```text
(ln π)/π = f(π) < f(e) = 1/e.
```

Multiplying by the positive number `eπ` yields

```text
e ln π < π.
```

Exponentiation preserves this strict inequality:

```text
π^(e) < e^(π).
```

Therefore

```text
e^(π) > π^(e).
```

## Why This Matters

The key is not numerical approximation but choosing a ratio whose derivative gives a complete interval argument. The same device compares many expressions of the form `a^(b)` and `b^(a)`.

## Common Mistakes

- Comparing decimal approximations instead of proving the inequality.
- Checking only `f'(e) = 0` without proving the sign on both intervals.
- Reversing the final implication when exponentiating.
- Treating `f″ = 0` as decisive; a zero second derivative is inconclusive without the relevant sign information.

## Extensions

For `0 < a < b`, compare `a^(b)` and `b^(a)` by locating `a` and `b` relative to the maximizer `e` of `(ln x)/x`.

</details>
