---
problemId: linear-algebra-covariance-002
title: Convert a Covariance Matrix to a Correlation Matrix
description: Normalize a covariance matrix into a correlation matrix, explain the diagonal congruence transform, and handle zero-variance coordinates correctly.
date: 2026-08-16
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Covariance Matrices, Correlation Matrices]
tags: [Covariance, Correlation, Matrix Normalization, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, covariance-correlation-matrices]
concepts: [correlation-matrix, positive-semidefinite-matrix]
techniques: []
prerequisites: []
relatedProblems: [covariance-matrix-positive-semidefinite-proof, correlation-matrix-parameter-range]
family: covariance-correlation-normalization
mathDifficulty: 1
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 7
status: solved
featured: false
---

## Problem

Suppose three random variables have covariance matrix

`Sigma = [[4, 3, -2], [3, 9, 0], [-2, 0, 16]]`.

1. Convert `Sigma` to the corresponding correlation matrix.
2. Express the conversion as a matrix transformation and explain why it preserves positive semidefiniteness.
3. What breaks if one of the marginal variances is zero?

## Think Before Revealing

A covariance has units; a correlation does not. The only scale available for the `(i,j)` entry is the product of the two marginal standard deviations.

<details>
<summary>Hint 1</summary>

The standard deviations are `2`, `3`, and `4`.

</details>

<details>
<summary>Hint 2</summary>

If `S=diag(2,3,4)`, compute `R=S^-1 Sigma S^-1`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Method 1 — normalize each entry

The marginal variances are `4`, `9`, and `16`, so the standard deviations are

`2, 3, 4`.

For `i != j`,

`R_ij = Sigma_ij / sqrt(Sigma_ii Sigma_jj)`.

Hence

- `R_12 = 3/(2*3) = 0.5`;
- `R_13 = -2/(2*4) = -0.25`;
- `R_23 = 0/(3*4) = 0`.

The diagonal entries become one, so

`R = [[1, 0.5, -0.25], [0.5, 1, 0], [-0.25, 0, 1]]`.

### Method 2 — diagonal congruence normalization

Let

`S = diag(2,3,4)`.

Then

`R = S^-1 Sigma S^-1`.

Equivalently, if `D=diag(4,9,16)` is the diagonal matrix of marginal variances, then

`R = D^-1/2 Sigma D^-1/2`.

This is a congruence transformation. For any vector `x`,

`x^T R x = (S^-1 x)^T Sigma (S^-1 x) >= 0`

whenever `Sigma` is PSD. Therefore the normalization preserves positive semidefiniteness. It also forces the diagonal entries to one, so a covariance matrix with positive marginal variances becomes a valid correlation matrix.

### What if a marginal variance is zero?

If `Sigma_ii=0`, then the corresponding standard deviation is zero and `S^-1` does not exist. The usual correlation coefficients involving that variable are undefined because their denominators contain that zero standard deviation.

A zero-variance variable is deterministic up to an almost-sure constant, so the correct response is to treat that coordinate as degenerate—typically remove or handle it separately—rather than assign arbitrary correlations by dividing by zero.

## Why This Problem Matters

The arithmetic is easy; the interview value is recognizing covariance-to-correlation conversion as a **diagonal rescaling of the whole matrix**, not a collection of unrelated entrywise tricks. The matrix form immediately explains why PSD is preserved and makes the zero-variance edge case obvious.

## Common Mistakes

- Dividing a covariance by variances instead of by standard deviations.
- Normalizing the off-diagonal entries but forgetting that the diagonal must become one.
- Writing `S Sigma S` instead of `S^-1 Sigma S^-1`.
- Assuming the inverse diagonal scaling exists when a marginal variance is zero.
- Rechecking PSD from scratch with determinants after a valid congruence normalization.

## Extensions

- Starting from an arbitrary PSD covariance matrix with positive diagonal, prove that `D^-1/2 Sigma D^-1/2` is a valid correlation matrix.
- Reverse the construction: given a correlation matrix `R` and positive standard deviations in `S`, recover `Sigma = S R S`.
- Explain how rescaling one original variable changes the covariance matrix while leaving its correlations unchanged up to a possible sign flip for negative scaling.
- Relate the normalization to standardizing features before multivariate modeling.

</details>
