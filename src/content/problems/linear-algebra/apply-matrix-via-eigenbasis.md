---
problemId: linear-algebra-spectrum-002
title: Apply a Matrix Without Reconstructing It
description: Use known eigenpairs to express a vector in an eigenbasis and compute the matrix action directly, without solving for the matrix entries.
date: 2026-08-16
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Eigenvalues, Diagonalization]
tags: [Linear Algebra, Eigenbasis, Eigenvectors, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, determinants-eigenvalues]
concepts: [eigenvalues-eigenvectors]
techniques: [eigenbasis-decomposition]
prerequisites: []
relatedProblems: [two-by-two-eigensystem]
family: eigenbasis-application
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 6
status: solved
featured: false
---

## Problem

A real `2 x 2` matrix `A` has two eigenpairs:

- `v_1=(1,2)` with eigenvalue `2`;
- `v_2=(-1,3)` with eigenvalue `-3`.

Without reconstructing the entries of `A`, compute `Av` for `v=(3,1)`.

Then describe how the same idea gives `A^k v` for a positive integer `k`.

## Think Before Revealing

The matrix is already diagonal in the coordinate system determined by its eigenvectors. The real task is to express the target vector in that coordinate system.

<details>
<summary>Hint 1</summary>

Solve for coefficients `a,b` in

`v = a v_1 + b v_2`.

</details>

<details>
<summary>Hint 2</summary>

The decomposition is

`v = 2v_1 - v_2`.

Now use linearity and the two eigenvalue equations.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Method 1 — decompose in the eigenbasis

The two eigenvectors are linearly independent, because

`det([[1,-1],[2,3]]) = 5 != 0`.

So they form a basis of `R^2`.

Write

`v = a v_1 + b v_2`.

Matching coordinates gives

`a-b=3`,

`2a+3b=1`.

Solving yields `a=2` and `b=-1`. Thus

`v = 2v_1 - v_2`.

Now apply `A` using only the eigenpair information:

`Av = 2Av_1 - Av_2`

`= 2(2v_1) - (-3v_2)`

`= 4v_1 + 3v_2`.

Therefore

`Av = 4(1,2) + 3(-1,3)`

`= (4,8) + (-3,9)`

`= (1,17)`.

So the answer is **`Av=(1,17)`**.

The key point is that we never reconstructed `A`. Doing so would introduce four unknown matrix entries and solve a larger problem than the one actually asked.

### Method 2 — spectral coordinates

Let

`X=[v_1 v_2]` and `D=diag(2,-3)`.

The eigenpair information says

`AX=XD`,

so because `X` is invertible,

`A=XDX^{-1}`.

The coordinate vector of `v` in the eigenbasis is `(2,-1)^T`. Applying `A` means multiplying those spectral coordinates by the eigenvalues:

`D(2,-1)^T = (4,3)^T`.

Transforming back gives

`4v_1+3v_2=(1,17)`.

This matrix notation is the same reasoning as Method 1, just organized as a change of basis.

### Powers

Since

`v=2v_1-v_2`,

we have

`A^k v = 2(2^k)v_1 - ((-3)^k)v_2`.

Each eigencomponent evolves independently by a scalar power. That is the main computational advantage of an eigenbasis.

## Why This Problem Matters

Interviewers often give eigenpairs precisely so you do **not** reconstruct the matrix. The recognition skill is to change coordinates to a basis where the operator acts diagonally, reducing a matrix problem to scalar multiplication.

## Common Mistakes

- Trying to solve for all four entries of `A` before looking at the target vector.
- Applying eigenvalues to standard-coordinate entries instead of eigenbasis coefficients.
- Writing `v=2v_1+v_2` and losing the sign.
- Forgetting that the second eigenvalue is negative.
- Assuming supplied eigenvectors form a basis without checking independence when that is not obvious.

## Extensions

- Compute `A^k v` and describe which eigencomponent dominates in magnitude as `k` grows.
- Replace `A^k` by a polynomial `p(A)` and show that `p(A)v=2p(2)v_1-p(-3)v_2`.
- Reconstruct `A` afterward as a verification exercise and compare the amount of work.
- Discuss what changes if the supplied eigenvectors do not span the target vector's space because the matrix is defective.

</details>
