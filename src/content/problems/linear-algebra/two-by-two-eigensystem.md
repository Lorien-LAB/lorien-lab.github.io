---
problemId: linear-algebra-spectrum-001
title: Three Ways to Read a 2×2 Eigensystem
description: Find the eigenvalues and eigendirections of a symmetric 2×2 matrix, then connect direct symmetry, the characteristic polynomial, and trace/determinant checks.
date: 2026-08-16
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Eigenvalues, Eigenvectors]
tags: [Linear Algebra, Eigenvalues, Eigenvectors, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, determinants-eigenvalues]
concepts: [eigenvalues-eigenvectors, matrix-spectral-invariants]
techniques: []
prerequisites: []
relatedProblems: []
family: matrix-eigensystem
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 7
status: solved
featured: false
---

## Problem

Let

`A = [[2, 1], [1, 2]]`.

Find all eigenvalues and a basis of eigenvectors for each eigenspace. Give at least two solution routes, and explain how trace and determinant provide a fast consistency check.

## Think Before Revealing

Before expanding a determinant, look at what the matrix does to vectors whose two coordinates are equal or opposite.

<details>
<summary>Hint 1</summary>

Try the directions `(1, 1)` and `(1, -1)`. The matrix is unchanged if the two coordinates are swapped, so the symmetric and antisymmetric directions are natural candidates.

</details>

<details>
<summary>Hint 2</summary>

If you use the characteristic polynomial, compute

`det(A - lambda I) = (2-lambda)^2 - 1`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Method 1 — exploit symmetry first

Apply `A` to the symmetric direction:

`A(1,1)^T = (3,3)^T = 3(1,1)^T`.

So `(1,1)` is an eigenvector with eigenvalue `3`.

Now apply `A` to the antisymmetric direction:

`A(1,-1)^T = (1,-1)^T = 1(1,-1)^T`.

So `(1,-1)` is an eigenvector with eigenvalue `1`.

Because the two eigenvectors are linearly independent, they already form a basis of `R^2`. Hence the complete eigensystem is

- eigenvalue `3`, eigenspace `span{(1,1)}`;
- eigenvalue `1`, eigenspace `span{(1,-1)}`.

The insight is structural: a matrix of the form `[[a,b],[b,a]]` preserves the sum and difference directions. The coordinate-swap symmetry splits the space into those two invariant one-dimensional subspaces.

### Method 2 — characteristic polynomial

Solve

`det(A - lambda I) = 0`.

Here

`det([[2-lambda,1],[1,2-lambda]])`

`= (2-lambda)^2 - 1`

`= lambda^2 - 4lambda + 3`

`= (lambda-1)(lambda-3)`.

Therefore the eigenvalues are `1` and `3`.

For `lambda=3`, solve `(A-3I)x=0`:

`[[-1,1],[1,-1]]x=0`,

so `x_1=x_2`, giving eigenspace `span{(1,1)}`.

For `lambda=1`, solve `(A-I)x=0`:

`[[1,1],[1,1]]x=0`,

so `x_1=-x_2`, giving eigenspace `span{(1,-1)}`.

### Method 3 — trace and determinant as a check

For a `2 x 2` matrix, the two eigenvalues satisfy

`lambda_1 + lambda_2 = tr(A)`

and

`lambda_1 lambda_2 = det(A)`.

Here `tr(A)=4` and `det(A)=3`. The pair `{1,3}` has sum `4` and product `3`, so the spectral calculation is internally consistent.

Trace and determinant alone do not identify eigenvectors, and for larger matrices they do not generally determine the entire spectrum. Their role here is an efficient invariant check.

## Why This Problem Matters

A strong interview response does not automatically start with determinant expansion. It notices symmetry, extracts the eigendirections almost immediately, and then knows how the characteristic polynomial and spectral invariants fit around that insight.

## Common Mistakes

- Reporting eigenvalues but not eigenspaces.
- Calling the zero vector an eigenvector.
- Expanding the characteristic polynomial correctly but solving `(A-lambda I)x=0` with the wrong eigenvalue.
- Treating `tr(A)` and `det(A)` as enough to determine eigenvectors.
- Missing the coordinate-swap symmetry that makes the problem nearly mental arithmetic.

## Extensions

- For `A=[[a,b],[b,a]]`, show that `(1,1)` and `(1,-1)` have eigenvalues `a+b` and `a-b`.
- Use the eigendecomposition to obtain a closed form for `A^k`.
- Explain why the two eigendirections are orthogonal and connect this to the spectral theorem for real symmetric matrices.
- Ask what changes when the off-diagonal entries are no longer equal.

</details>
