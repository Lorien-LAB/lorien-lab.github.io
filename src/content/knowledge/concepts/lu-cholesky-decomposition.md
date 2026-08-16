---
title: LU & Cholesky Decomposition
description: Elimination-based triangular factorization, pivoting, SPD Cholesky structure, and covariance-factor interpretation.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-16
tags: [Linear Algebra, LU, Cholesky, Triangular Systems, Positive Definite]
quantInterviewTopics: [linear-algebra-matrix-methods, matrix-decompositions]
featured: false
related: [qr-decomposition, positive-semidefinite-matrix, singular-value-decomposition]
relatedNotes: []
---

## LU as Gaussian elimination in matrix form

LU decomposition packages **Gaussian elimination** into reusable triangular factors. In its simplest textbook form,

`A = L U`,

where `L` is lower triangular and `U` is upper triangular.

For a generic numerical implementation, the safer form to remember is

`P A = L U`,

where `P` is a permutation matrix produced by row pivoting. Partial pivoting avoids relying on a zero or dangerously small pivot and is the standard robust interpretation of generic LU.

The factorization separates one expensive elimination step from cheap repeated triangular solves.

## Solving a linear system with pivoted LU

Given

`P A = L U`

and

`A x = b`,

multiply the right-hand side by the same permutation:

`L U x = P b`.

Then solve in two stages:

1. **forward substitution:** `L y = P b`;
2. **backward substitution:** `U x = y`.

If many right-hand sides share the same matrix `A`, factor once and reuse the triangular solves.

## Determinants from triangular factors

For any triangular matrix, the determinant is the product of its diagonal entries. Thus, in the unpivoted form `A=LU`,

`det(A) = det(L) det(U)`.

With pivoting,

`P A = L U`

implies

`det(A) = det(P) det(L) det(U)`,

because `det(P)^{-1}=det(P)` and `det(P)` is `+1` or `-1` according to the parity of the row permutation. In the common unit-lower-triangular convention, `det(L)=1`, so the determinant is the signed product of the diagonal of `U`.

## Cholesky: the SPD specialization

A real **symmetric positive-definite (SPD)** matrix has a much more structured triangular factorization. Using the lower-triangular convention,

`A = L L^T`,

where `L` is lower triangular with positive diagonal entries.

An equivalent upper-triangular convention is

`A = R^T R`,

with `R=L^T` upper triangular and positive diagonal entries. The two formulas are the same mathematics written with opposite triangular orientation.

This stronger structure is why Cholesky should be one of the first tools considered for covariance-like SPD systems.

## Why Cholesky is special

Generic LU stores two unrelated triangular factors. Symmetry tells Cholesky that one factor is the transpose of the other. For dense matrices, this lets a Cholesky factorization use roughly **half the arithmetic work** of a generic LU factorization, while also storing only one triangular factor.

The condition `SPD` is doing real work. Ordinary Cholesky relies on strictly positive pivots; applying it blindly to an indefinite matrix or a singular positive-semidefinite matrix can fail.

## Uniqueness: Cholesky versus a generic Gram factor

There are two different statements that are easy to confuse.

### Cholesky factor

For an SPD matrix, once the triangular orientation is fixed and the **positive diagonal** convention is imposed, the Cholesky factor is **unique**.

### Generic factor

A factorization such as

`A = C^T C`

is generally **not unique** if no triangular structure is required. If `O` is an orthogonal matrix of compatible size, then

`(O C)^T (O C) = C^T O^T O C = C^T C = A`.

So an orthogonal transformation can produce another factor with the same Gram matrix. Cholesky removes this freedom by requiring a particular triangular shape and positive diagonal.

This distinction is central in matrix-square-root interview problems: `M^2=A`, `C^T C=A`, and a positive-diagonal triangular Cholesky factor are related but are not interchangeable requirements.

## Covariance factors

Let `z` have mean zero and identity covariance. If a covariance matrix is SPD and

`Sigma = L L^T`,

then

`x = mu + L z`

satisfies

`Cov(x) = L I L^T = Sigma`.

With the upper-triangular convention `Sigma=R^T R`, use `x=mu+R^T z`.

This gives Cholesky a direct Monte Carlo interpretation: the triangular factor maps independent standardized shocks into correlated shocks with the target covariance.

## Singular positive-semidefinite boundary

A covariance matrix need only be **positive semidefinite (PSD)**. If it is singular, ordinary unpivoted Cholesky with strictly positive diagonal pivots is no longer the generic guarantee.

For a singular PSD matrix, a **spectral** or **SVD** square-root factor remains available. For example, if

`Sigma = Q Lambda Q^T`

with nonnegative eigenvalues, then

`B = Q Lambda^{1/2}`

satisfies `B B^T = Sigma`, including when some eigenvalues are zero.

Pivoted or rank-revealing Cholesky variants can also be useful numerically, but the conceptual interview boundary is simple: ordinary Cholesky is the clean SPD route; spectral/SVD factors naturally handle the singular PSD case.

## When to reach for each factorization

- **Generic square linear system:** LU with pivoting is a default direct solver.
- **SPD system:** Cholesky exploits symmetry and definiteness.
- **Least squares:** QR usually avoids the conditioning loss of normal equations.
- **Rank-deficient or rectangular problem:** SVD gives the clearest rank-aware description.
- **Covariance simulation:** Cholesky for SPD, spectral/SVD square roots when singular PSD structure matters.

## Common mistakes

- Writing `A=LU` as though pivoting were irrelevant for every numerical matrix.
- Permuting the matrix during LU but forgetting to apply the same `P` to the right-hand side.
- Confusing forward substitution with backward substitution.
- Forgetting the sign contributed by a permutation when computing a determinant from pivoted LU.
- Claiming Cholesky for an arbitrary symmetric matrix; the standard factorization needs positive definiteness.
- Treating every `C^T C` factor as unique.
- Mixing the lower convention `LL^T` and upper convention `R^T R` midway through a derivation.
- Assuming ordinary Cholesky with positive pivots covers every singular covariance matrix.

## Interview Checks

1. Why is `P A = L U` safer to remember than bare `A=L U` for a generic numerical solver?
2. Starting from `P A=L U`, write the two triangular systems used to solve `A x=b`.
3. How does row permutation parity enter `det(A)` when LU uses pivoting?
4. What assumptions guarantee the standard Cholesky factorization?
5. Explain why `A=L L^T` and `A=R^T R` are the same Cholesky idea under different conventions.
6. Why is the positive-diagonal triangular Cholesky factor unique while a generic `A=C^T C` factor is not?
7. If `Sigma` is a singular PSD covariance matrix, why might a spectral or SVD factor be preferable to ordinary Cholesky?
