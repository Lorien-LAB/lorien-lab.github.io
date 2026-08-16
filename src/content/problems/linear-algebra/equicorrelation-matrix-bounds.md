---
problemId: linear-algebra-correlation-003
title: Bounds for an Equicorrelation Matrix
description: Determine the exact admissible common correlation in an n-dimensional equicorrelation matrix by exploiting its two-eigenvalue structure.
date: 2026-08-16
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Correlation Matrices, Eigenvalues, Positive Semidefinite Matrices]
tags: [Correlation, Eigenvalues, PSD, Symmetry, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, covariance-correlation-matrices, positive-semidefinite-matrices]
concepts: [correlation-matrix, positive-semidefinite-matrix]
techniques: []
prerequisites: []
relatedProblems: [correlation-matrix-parameter-range, covariance-matrix-positive-semidefinite-proof]
family: equicorrelation-feasibility
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

For `n >= 2`, consider the `n x n` matrix whose diagonal entries are `1` and whose every off-diagonal entry equals the same real number `rho`.

For exactly which values of `rho` is this matrix a valid correlation matrix?

Also describe what happens at the two boundary values.

## Think Before Revealing

Expanding all principal minors is possible for small `n`, but it ignores the symmetry. Rewrite the matrix using the identity matrix and the all-ones vector.

<details>
<summary>Hint 1</summary>

Let `1` denote the all-ones vector. The matrix can be written as

`R = (1-rho) I + rho 11^T`.

</details>

<details>
<summary>Hint 2</summary>

Split `R^n` into the one-dimensional span of `1` and its orthogonal complement.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Write

`R = (1-rho) I + rho 11^T`.

A correlation matrix must be positive semidefinite, so all eigenvalues of `R` must be nonnegative.

### Method 1 — exploit the invariant subspaces

First take any vector `v` orthogonal to `1`. Then `1^T v=0`, so

`R v = (1-rho)v + rho 1(1^T v) = (1-rho)v`.

Therefore

`lambda_perp = 1-rho`

is an eigenvalue with multiplicity `n-1`.

Now apply `R` to the all-ones vector:

`R 1 = (1-rho)1 + rho 1(1^T1)`

`= (1-rho)1 + n rho 1`

`= [1 + (n-1)rho] 1`.

Thus the remaining eigenvalue is

`lambda_parallel = 1 + (n-1)rho`,

with multiplicity `1`.

PSD requires both eigenvalue types to be nonnegative:

`1-rho >= 0`

and

`1 + (n-1)rho >= 0`.

Hence

**`-1/(n-1) <= rho <= 1`.**

### Method 2 — quadratic-form decomposition

For any vector `x`,

`x^T R x = (1-rho)||x||^2 + rho(1^T x)^2`.

Decompose `x` into a component parallel to `1` and a component orthogonal to `1`. The two coefficients governing the quadratic form are again `1+(n-1)rho` and `1-rho`, yielding exactly the same bounds.

### Boundary behavior

At `rho=1`, the eigenvalue `1-rho` is zero with multiplicity `n-1`. The matrix is `11^T`, has rank `1`, and all standardized variables move perfectly together.

At `rho=-1/(n-1)`, the eigenvalue in the `1` direction is zero. The matrix has rank `n-1`, and the standardized variables satisfy a zero-variance relation in the all-ones direction: their sum is constrained after centering.

For strict inequalities

`-1/(n-1) < rho < 1`,

all eigenvalues are positive and the matrix is positive definite.

## Why This Problem Matters

The main skill is not determinant algebra; it is recognizing that permutation symmetry collapses an `n x n` matrix to only two eigenspaces. That pattern appears in covariance models, factor structures, regularization, exchangeable systems, and many other matrix interview questions.

## Common Mistakes

- Giving only the pairwise bound `-1 <= rho <= 1`, which misses the stronger lower bound when `n>2`.
- Expanding an `n x n` determinant instead of exploiting symmetry.
- Forgetting the multiplicity `n-1` of the eigenvalue `1-rho`.
- Requiring strict positivity and accidentally excluding valid singular correlation matrices at the boundaries.
- Reporting the lower bound as `-1/n` instead of `-1/(n-1)`.

## Extensions

- Compute the determinant immediately from the eigenvalues: `(1-rho)^(n-1)[1+(n-1)rho]`.
- Derive the inverse for the positive-definite interior and connect it to the Sherman-Morrison formula.
- Interpret the matrix as a one-factor correlation model when `rho >= 0`.
- Compare the spectral method with checking principal minors for `n=3` and explain why the spectral method scales better.

</details>
