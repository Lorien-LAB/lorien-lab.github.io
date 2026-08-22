---
problemId: random-variables-distributions-004
title: Sum of Two Uniforms Has a Triangular Density
description: Convolve two independent uniform densities and derive the support-dependent triangular density of their sum.
date: 2026-08-18
domain: Mathematics & Statistics
category: Probability
subcategories: [Random Variables, Distributions]
tags: [Probability, Random Variables, Distributions, Interview]
quantInterviewTopics: [probability-statistics, random-variables-distributions]
concepts: [common-probability-distributions, random-variable-transformations-convolution]
techniques: []
prerequisites: []
relatedProblems: []
family: independent-sum-convolution
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Let `X` and `Y` be independent `U(0,1)` random variables, and define

`Z=X+Y`.

1. Derive the density of `Z` from convolution.
2. Explain why the integration bounds change at `z=1`.
3. Give a geometric interpretation of the same triangular density.

## Think Before Revealing

Do not integrate from `0` to `1` mechanically. For a fixed `z`, both `y` and `z-y` must lie in `[0,1]`.

<details>
<summary>Hint 1</summary>

Write

`f_Z(z)=integral f_X(z-y)f_Y(y)dy`

and translate the support conditions into inequalities for `y`.

</details>

<details>
<summary>Hint 2</summary>

You need the intersection

`[0,1] ∩ [z-1,z]`.

Its length is `z` for `0<z<1` and `2-z` for `1<=z<2`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Since `X` and `Y` are independent,

`f_Z(z)=integral_{-infinity}^{infinity} f_X(z-y)f_Y(y)dy`.

For `U(0,1)`,

`f_X(x)=f_Y(x)=1` on `[0,1]` and `0` otherwise.

For the integrand to be nonzero we need simultaneously

`0<=y<=1`

and

`0<=z-y<=1`.

The second condition is equivalent to

`z-1<=y<=z`.

Therefore the valid integration interval is

`[0,1] ∩ [z-1,z]`.

Because the integrand equals `1` wherever both support conditions hold, the convolution equals the **length of this intersection**.

### Case 1: `z<=0`

No nonnegative `X` and `Y` can sum to a nonpositive value except a zero-probability boundary point, so

`f_Z(z)=0`.

### Case 2: `0<z<1`

The intersection is

`[0,z]`,

whose length is `z`. Hence

`f_Z(z)=z`.

### Case 3: `1<=z<2`

The intersection is

`[z-1,1]`,

whose length is

`1-(z-1)=2-z`.

Thus

`f_Z(z)=2-z`.

### Case 4: `z>=2`

The support intersection is empty, so

`f_Z(z)=0`.

Putting the pieces together,

`f_Z(z)=0` for `z<=0`,

`f_Z(z)=z` for `0<z<1`,

`f_Z(z)=2-z` for `1<=z<2`,

`f_Z(z)=0` for `z>=2`.

This is the familiar **triangular density** on `[0,2]`.

### Normalization check

The area is

`integral_0^1 z dz + integral_1^2 (2-z) dz`

`=1/2+1/2=1`.

### Geometric interpretation

Because `(X,Y)` is uniform on the unit square, the event

`z< X+Y <= z+dz`

corresponds to a thin diagonal strip between the lines `x+y=z` and `x+y=z+dz`.

As `z` rises from `0` to `1`, the line segment intersecting the square grows; after `z=1`, it shrinks symmetrically until disappearing at `z=2`.

The changing line-intersection geometry is the same support logic encoded by the convolution bounds.

</details>

## Why This Matters

This is the canonical interview example for **support-aware convolution**. The formula itself is simple; the real skill is translating two support conditions into the correct integration interval.

That same skill reappears for sums of Exponential, Gamma, truncated, and piecewise distributions. Most convolution mistakes are boundary mistakes, not integration mistakes.

## Common Mistakes

- Integrating from `0` to `1` for every `z` without checking whether `z-y` is also in `[0,1]`.
- Forgetting that the support of `X+Y` is `[0,2]`.
- Writing `f_Z(z)=1` because both original densities equal one.
- Missing the change of formula at `z=1`.
- Giving the triangular shape without deriving why its slope changes.
- Using convolution without independence when the product-of-marginals formula is not justified.

## Extensions

1. Derive the density of `X+Y` when `X~U(0,a)` and `Y~U(0,b)` independently.
2. What shape appears when `a!=b`? Identify the triangular versus trapezoidal regimes.
3. Derive the CDF of `Z` directly from areas in the unit square and differentiate it.
4. Find the distribution of `X-Y` for independent `U(0,1)` variables.
5. Explain how repeated convolution of uniforms leads to piecewise polynomial densities.
