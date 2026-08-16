---
problemId: 150-first-look-005
title: Feasible Parameter Range in a Correlation Matrix
description: Determine the admissible range of an unknown correlation by translating correlation-matrix validity into positive-semidefinite constraints.
date: 2026-08-16
originType: book
source: 150-most-frequently-asked
sourceSection: 'First Look: Ten Questions'
sourceChapter: '1'
sourceProblem: '5'
sourceReference: 'Chapter 1 · First Look · Question 5 · printed pp. 8–9'
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Correlation Matrices, Positive Semidefinite Matrices]
tags: [Linear Algebra, Correlation, PSD, Interview]
concepts: [correlation-matrix, positive-semidefinite-matrix]
techniques: [principal-minor-feasibility]
prerequisites: []
relatedProblems: []
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

`1 - c^T A^{-1} c >= 0`.

After simplifying, this condition is equivalent to

`0.55 - 0.36 rho - rho^2 >= 0`,

which gives the same interval above.

## Why This Problem Matters

The question tests whether you know that pairwise correlations cannot be chosen independently. Joint consistency is encoded by positive semidefiniteness, and in a small symbolic matrix the quickest route is usually a determinant or principal-minor calculation.

## Common Mistakes

- Checking only `|rho| <= 1` and forgetting the joint PSD constraint.
- Checking only leading principal minors while claiming a positive-semidefinite Sylvester criterion; for PSD, all principal minors matter.
- Making a sign error in the determinant term `2abc`.
- Reporting rounded endpoints without first deriving the exact interval.

## Extensions

- Interpret the boundary values as cases where the correlation matrix becomes singular and one standardized variable lies in the linear span of the other two.
- Re-derive the condition geometrically by representing the matrix as the Gram matrix of three unit vectors.
- For larger matrices, compare principal-minor checks with eigenvalue tests, Cholesky-type factorizations, and nearest-correlation-matrix projections used in practice.

</details>
