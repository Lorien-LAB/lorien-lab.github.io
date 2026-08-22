---
title: Singular Value Decomposition
description: Rank-aware orthogonal factorization for rectangular matrices, pseudoinverses, least squares, and covariance square-root structure.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-16
tags: [Linear Algebra, SVD, Singular Values, Pseudoinverse, Least Squares]
quantInterviewTopics: [linear-algebra-matrix-methods, matrix-decompositions]
featured: false
related: [qr-decomposition, lu-cholesky-decomposition, eigenbasis-decomposition]
relatedNotes: []
---

## Core idea

The singular value decomposition (SVD) extends spectral-style coordinates to **every** real matrix, including rectangular and rank-deficient matrices.

For

`A in R^{m x n}`,

the full SVD is

`A = U Sigma V^T`,

where

- `U in R^{m x m}` is orthogonal;
- `V in R^{n x n}` is orthogonal;
- `Sigma in R^{m x n}` is rectangular and diagonal in the usual rectangular sense;
- the diagonal entries `sigma_1 >= sigma_2 >= ... >= 0` are the singular values.

Unlike eigendecomposition, SVD does **not** require `A` to be square.

## Full SVD dimensions

For `A in R^{m x n}`:

`U : m x m`

`Sigma : m x n`

`V : n x n`

and therefore

`U Sigma V^T : (m x m)(m x n)(n x n) = m x n`.

Keeping these dimensions explicit prevents one of the most common interview mistakes: writing a square diagonal matrix `Sigma` while simultaneously claiming a full SVD of a rectangular matrix.

## Thin / compact SVD

Let `rank(A)=r`. The rank-`r` or compact **thin SVD** keeps only directions associated with positive singular values:

`A = U_r Sigma_r V_r^T`,

with

- `U_r in R^{m x r}`;
- `Sigma_r in R^{r x r}`;
- `V_r in R^{n x r}`.

The columns of `U_r` and `V_r` are still orthonormal within their respective spaces. This compact representation makes the rank structure explicit and avoids carrying null-space columns that contribute nothing to `A`.

For a full-column-rank tall matrix with `r=n`, this reduces to the familiar economy-size dimensions `U_r: m x n`, `Sigma_r: n x n`, `V_r: n x n`.

## Relation to eigenvalues

SVD is tied to two symmetric positive-semidefinite matrices:

`A^T A` and `A A^T`.

If `v_i` is a right singular vector, then

`A^T A v_i = sigma_i^2 v_i`.

If `u_i` is a left singular vector, then

`A A^T u_i = sigma_i^2 u_i`.

Thus the nonzero eigenvalues of `A^T A` and `A A^T` are the squared singular values `sigma_i^2`.

When `sigma_i>0`, the left and right singular vectors are linked by

`A v_i = sigma_i u_i`

and

`A^T u_i = sigma_i v_i`.

This is why SVD can be viewed as choosing orthonormal input directions `v_i`, scaling them by `sigma_i`, and rotating them into output directions `u_i`.

## Rank and null spaces

The rank of `A` is exactly the number of **positive (nonzero) singular values**.

If

`sigma_1 >= ... >= sigma_r > 0`

and all later singular values are zero, then

`rank(A)=r`.

Small singular values reveal directions that are nearly annihilated by the matrix. In numerical work, this makes the SVD a natural diagnostic for near-rank-deficiency and ill-conditioning.

The right singular vectors associated with zero singular values span the null space of `A`. The left singular vectors associated with zero singular values similarly describe directions outside the image of `A`.

## Moore-Penrose pseudoinverse

From the compact SVD

`A = U_r Sigma_r V_r^T`,

define the Moore-Penrose pseudoinverse by inverting only the positive singular values:

`A^+ = V_r Sigma_r^{-1} U_r^T`.

This formula works whether `A` is square, rectangular, or rank deficient.

Conceptually, the pseudoinverse performs four steps:

1. rotate the data into left-singular coordinates with `U_r^T`;
2. divide by each nonzero singular value;
3. map into the right-singular coordinates with `V_r`;
4. ignore directions that `A` destroys completely.

## Least squares and minimum-norm solutions

For

`min_x ||A x - b||_2`,

the pseudoinverse solution is

`x_* = A^+ b`.

If `A` has full column rank, this agrees with the unique least-squares solution.

If `A` is **rank deficient**, there can be infinitely many coefficient vectors giving the same best fit. The pseudoinverse selects the **minimum-norm** least-squares solution among them.

This is the main conceptual advantage of SVD over blindly solving a singular triangular system: it tells you which directions are identifiable, which are null directions, and what canonical solution to choose.

In practice, very small singular values may also be truncated when building a numerically regularized pseudoinverse. The cutoff is a numerical modeling choice, not a change to the exact mathematical SVD.

## SVD versus QR in least squares

For a well-conditioned, full-column-rank least-squares problem, QR is usually a natural direct method:

`A = Q R`, then `R x = Q^T b`.

SVD is more expensive but more informative when:

- `A` is rank deficient;
- columns are nearly linearly dependent;
- a minimum-norm solution is required;
- numerical rank itself is part of the question.

So the interview distinction is not “QR good, SVD good” in isolation; it is **what structural uncertainty must the decomposition expose?**

## SVD versus eigendecomposition

Eigendecomposition is naturally a square-matrix construction. A general non-square rectangular matrix does not even have eigenvalues in the usual sense because `A v` and `v` live in different-dimensional spaces when `m != n`.

SVD avoids this issue by using two orthonormal bases:

- right singular vectors in the input space `R^n`;
- left singular vectors in the output space `R^m`.

For a symmetric positive-semidefinite square matrix, the SVD and eigendecomposition become closely related: singular values equal the nonnegative eigenvalues, and the left/right singular-vector bases can be chosen consistently with the eigenvectors.

## Covariance square-root factors

Suppose a covariance matrix has spectral form

`Sigma = Q Lambda Q^T`,

where `Lambda` has nonnegative diagonal entries. A square-root factor is

`B = Q Lambda^{1/2}`,

so

`B B^T = Sigma`.

This remains valid when `Sigma` is singular and some eigenvalues are zero.

The same idea can be interpreted through the SVD of a symmetric PSD covariance matrix. That is why spectral/SVD factors are useful for generating correlated Gaussian vectors when ordinary positive-diagonal Cholesky is unavailable because the covariance matrix is singular.

For a general data matrix, SVD is also the natural bridge to principal-component directions and low-rank covariance structure.

## Common mistakes

- Giving full-SVD dimensions that only work for square matrices.
- Confusing the thin SVD with merely deleting arbitrary columns of `U` or `V`; the retained columns correspond to nonzero singular values.
- Saying singular values are eigenvalues of `A`; for a general matrix they are square roots of eigenvalues of `A^T A` or `A A^T`.
- Inverting zero singular values when forming a pseudoinverse.
- Claiming rank is the number of distinct singular values rather than the number of positive singular values counted with multiplicity.
- Assuming a rank-deficient least-squares problem has no solution; it has best-fit solutions, and the pseudoinverse selects the minimum-norm one.
- Treating eigendecomposition and SVD as interchangeable for an arbitrary rectangular matrix.

## Interview Checks

1. State the dimensions of `U`, `Sigma`, and `V` in the full SVD of an `m x n` matrix.
2. If `rank(A)=r`, state the dimensions of `U_r`, `Sigma_r`, and `V_r` in the compact SVD.
3. Why are `sigma_i^2` eigenvalues of both `A^T A` and `A A^T`?
4. How does SVD reveal the rank and null space of a matrix?
5. Derive `A^+ = V_r Sigma_r^{-1} U_r^T` from the compact SVD.
6. Why does the pseudoinverse produce the minimum-norm solution in a rank-deficient least-squares problem?
7. When would you prefer QR over SVD for least squares, and when does SVD provide information QR does not expose as directly?
8. Why is ordinary eigendecomposition not defined for a general non-square matrix, while SVD is?
9. How can a spectral/SVD square-root factor generate a Gaussian vector with a singular PSD covariance matrix?
