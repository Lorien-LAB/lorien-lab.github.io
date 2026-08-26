---
problemId: limits-derivatives-013
title: Classify Basic Positive Series
description: Classify the harmonic, reciprocal-square, and logarithmic-harmonic series with elementary non-integral convergence arguments.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Limits, Series, Convergence]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [positive-series-convergence]
techniques: []
prerequisites: []
relatedProblems: []
family: positive-series-convergence
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Classify each series as convergent or divergent, using elementary arguments without integration:

```text
∑ (k = 1 to +∞) 1/k
∑ (k = 1 to +∞) 1/k²
∑ (k = 2 to +∞) 1/(k ln k)
```

Give a proof for every classification.

## Think Before Revealing

The three series need three related but distinct tools: lower bounds on dyadic blocks, an upper telescoping comparison, and condensation after a monotonicity check.

<details>
<summary>Hint 1</summary>

Group harmonic terms between consecutive powers of two. For the reciprocal square, compare `1/k²` with `1/[k(k − 1)]`.

</details>

<details>
<summary>Hint 2</summary>

For `a[k] = 1/(k ln k)`, verify positivity and decrease for `k ≥ 2`. Cauchy condensation produces `2ⁿ a[2ⁿ] = 1/(n ln 2)`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Harmonic series: dyadic lower blocks

For `m ≥ 0`, the block `2ᵐ < k ≤ 2ᵐ⁺¹` has `2ᵐ` terms. Each term is at least `1/2ᵐ⁺¹`, so

```text
∑ (k = 2ᵐ + 1 to 2ᵐ⁺¹) 1/k ≥ 2ᵐ/2ᵐ⁺¹ = 1/2
```

There are infinitely many disjoint blocks, each contributing at least `1/2`. Hence the partial sums are unbounded, and

```text
∑ (k = 1 to +∞) 1/k diverges
```

### Reciprocal-square series: telescoping upper bound

For `k ≥ 2`,

```text
1/k² ≤ 1/[k(k − 1)] = 1/(k − 1) − 1/k
```

Therefore, for `N ≥ 2`,

```text
∑ (k = 2 to N) 1/k²
  ≤ ∑ (k = 2 to N) [1/(k − 1) − 1/k]
  = 1 − 1/N
```

The reciprocal-square partial sums are increasing because the terms are positive, and they are bounded above by `2` after including the `k = 1` term. Bounded increasing partial sums converge, so

```text
∑ (k = 1 to +∞) 1/k² converges
```

### Logarithmic-harmonic series: condensation

Let

```text
a[k] = 1/(k ln k),  k ≥ 2
```

The sequence is positive. Also, both `k` and `ln k` are positive and increasing for `k ≥ 2`, so their product `k ln k` is increasing; hence `a[k]` is decreasing. The hypotheses of Cauchy condensation are satisfied.

The condensed terms are

```text
2ⁿ a[2ⁿ] = 2ⁿ/[2ⁿ ln(2ⁿ)] = 1/(n ln 2)
```

Thus the exact comparison chain is

```text
∑ (n = 1 to +∞) 2ⁿ a[2ⁿ]
  = (1/ln 2) ∑ (n = 1 to +∞) 1/n
```

The condensed series is a positive constant multiple of the harmonic series, namely `1/ln 2` times it, so it diverges. Cauchy condensation therefore gives

```text
∑ (k = 2 to +∞) 1/(k ln k) diverges
```

## Why This Matters

The triple distinguishes a necessary term check from real convergence arguments and demonstrates how lower bounds prove divergence while upper bounds prove convergence.

## Common Mistakes

- Saying the harmonic series converges because its terms tend to zero.
- Reversing the reciprocal-square comparison.
- Applying condensation before verifying that `a[k]` is positive and decreasing.
- Forgetting that `1/(n ln 2)` is a constant multiple of the harmonic sequence.
- Using an integral or integral test despite the method restriction.

## Extensions

Use dyadic blocks to classify `∑ 1/kᵖ` for all real `p`, and compare `1/[k · power(ln k, q)]` under repeated logarithmic refinements.

</details>
