---
problemId: linear-algebra-correlation-001
title: Feasible Parameter Range in a Correlation Matrix
description: Determine the admissible range of an unknown correlation by translating correlation-matrix validity into positive-semidefinite constraints.
date: 2026-08-16
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Correlation Matrices, Positive Semidefinite Matrices]
tags: [Linear Algebra, Correlation, PSD, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, covariance-correlation-matrices, positive-semidefinite-matrices]
concepts: [correlation-matrix, positive-semidefinite-matrix, vector-geometry-inner-products]
techniques: [principal-minor-feasibility]
prerequisites: []
relatedProblems: [covariance-matrix-positive-semidefinite-proof, covariance-to-correlation-matrix, equicorrelation-matrix-bounds]
family: matrix-parameter-feasibility
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

For what real values of `rho` can the symmetric matrix

`R = [[1, 0.6, -0.3], [0.6, 1, rho], [-0.3, rho, 1]]`

serve as a correlation matrix?

Give the exact admissible interval and a decimal approximation.

## Think Before Revealing

The diagonal and symmetry conditions are already satisfied. The real question is what global matrix condition distinguishes a valid correlation matrix from a collection of pairwise numbers in `[-1,1]`.

<details>
<summary>Hint 1</summary>

A correlation matrix must be positive semidefinite. For a `3 x 3` symmetric matrix, require all principal minors to be nonnegative.

</details>

<details>
<summary>Hint 2</summary>

The three `2 x 2` principal minors are `0.64`, `0.91`, and `1 - rho^2`. The full determinant is `0.55 - 0.36 rho - rho^2`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Method 1 — principal minors

A real symmetric matrix with unit diagonal is a correlation matrix exactly when it is positive semidefinite.

The `1 x 1` principal minors are all equal to 1. The `2 x 2` principal minors are

- `1 - 0.6^2 = 0.64`;
- `1 - (-0.3)^2 = 0.91`;
- `1 - rho^2`.

Thus the only new pairwise restriction is `|rho| <= 1`.

The full determinant is

`det(R) = 1 - 0.6^2 - (-0.3)^2 - rho^2 + 2(0.6)(-0.3)rho`

`= 0.55 - 0.36 rho - rho^2`.

Positive semidefiniteness requires

`rho^2 + 0.36 rho - 0.55 <= 0`.

Multiplying by 100 gives

`100 rho^2 + 36 rho - 55 <= 0`.

The two roots are

`rho = (-9 +/- 4 sqrt(91)) / 50`.

Therefore

`(-9 - 4 sqrt(91))/50 <= rho <= (-9 + 4 sqrt(91))/50`.

Numerically,

**`-0.9432 <= rho <= 0.5832`.**

This interval already lies inside `[-1,1]`, so the `2 x 2` condition adds nothing further.

### Method 2 — Schur complement

Partition

`R = [[A, c], [c^T, 1]]`,

where `A = [[1,0.6],[0.6,1]]` and `c = [-0.3, rho]^T`.

The block `A` is positive definite because `det(A) = 0.64 > 0`. Hence `R` is positive semidefinite exactly when its Schur complement is nonnegative:

`1 - c^T A^-1 c >= 0`.

After simplifying, this condition is equivalent to

`0.55 - 0.36 rho - rho^2 >= 0`,

which gives the same interval above.

### Method 3 — complete the square once for the whole family

Consider the generic three-variable correlation matrix

`R(a,b,rho) = [[1,a,b],[a,1,rho],[b,rho,1]]`.

Its determinant is

`1 - a^2 - b^2 - rho^2 + 2ab rho`.

Rearrange it as

`det(R) = (1-a^2)(1-b^2) - (rho - a*b)^2`.

Therefore, once `|a| <= 1` and `|b| <= 1`, the joint PSD restriction is

`(rho - a*b)^2 <= (1-a^2)(1-b^2)`,

or

`a*b - sqrt((1-a^2)(1-b^2)) <= rho <= a*b + sqrt((1-a^2)(1-b^2))`.

For `a=0.6` and `b=-0.3`, the center is `a*b=-0.18`, while

`sqrt((1-a^2)(1-b^2)) = sqrt(0.64*0.91) = 0.08 sqrt(91)`.

This immediately reproduces

`(-9 - 4 sqrt(91))/50 <= rho <= (-9 + 4 sqrt(91))/50`.

This form is worth remembering conceptually: once two correlations with a reference variable are fixed, the third correlation must lie in an interval centered at their product.

## Why This Problem Matters

The question tests whether you know that pairwise correlations cannot be chosen independently. Joint consistency is encoded by positive semidefiniteness, and in a small symbolic matrix the quickest route may be principal minors, a Schur complement, or a completed-square form that exposes the whole problem family at once.

The generic formula also makes semantic variants easy to recognize: changing the numerical correlations changes the interval, but not the underlying canonical reasoning problem.

## Common Mistakes

- Checking only `|rho| <= 1` and forgetting the joint PSD constraint.
- Checking only leading principal minors while claiming a positive-semidefinite Sylvester criterion; for PSD, all principal minors matter.
- Making a sign error in the determinant term `2ab rho`.
- Reporting rounded endpoints without first deriving the exact interval.
- Treating every new pair of fixed correlations as a different problem instead of recognizing the shared matrix-feasibility structure.

## Variants

### Variant A — two equal correlations

Suppose

`R = [[1,0.8,0.8],[0.8,1,rho],[0.8,rho,1]]`.

The generic formula gives

`a*b = 0.64`

and

`sqrt((1-0.8^2)(1-0.8^2)) = 0.36`.

Hence the exact feasible range is

**`0.28 <= rho <= 1`.**

There is also a useful geometric route. Represent the correlation matrix as the Gram matrix of three unit vectors `x,y,z`. If

`x^T y = x^T z = 0.8`,

then both `y` and `z` make an angle `theta` with `x`, where `cos(theta)=0.8`. Their mutual angle can range from `0` to `2 theta`. Thus the largest possible mutual correlation is

`cos(0)=1`,

while the smallest is

`cos(2 theta) = 2 cos^2(theta)-1 = 2(0.8)^2-1 = 0.28`.

The geometry and PSD calculation are two views of the same constraint: a valid correlation matrix must be realizable as one consistent system of unit-vector inner products.

The upper endpoint corresponds to the last two standardized variables becoming perfectly correlated; the lower endpoint is another singular PSD boundary.

### Variant B — can three proposed pairwise correlations coexist?

Suppose three standardized variables are proposed to have correlations `0.9`, `0.8`, and `0.1`. Pairwise, all three numbers lie in `[-1,1]`, but joint validity requires the full determinant to be nonnegative.

Using `a=0.9`, `b=0.8`, and `rho=0.1`,

`det(R) = 1 + 2(0.9)(0.8)(0.1) - 0.9^2 - 0.8^2 - 0.1^2`

`= 1 + 0.144 - 0.81 - 0.64 - 0.01`

`= -0.316`.

So the proposed triple is **not** jointly realizable even though every pairwise correlation looks individually admissible.

## Extensions

- Interpret feasible boundary values as cases where the correlation matrix becomes singular and one standardized variable lies in the linear span of the other two.
- Re-derive the generic interval geometrically by representing the correlation matrix as the Gram matrix of three unit vectors.
- Compare the determinant formula with the Schur-complement inequality and show that they are the same completed square in different coordinates.
- For larger matrices, compare principal-minor checks with eigenvalue tests, Cholesky-type factorizations, and nearest-correlation-matrix projections used in practice.

</details>
