---
title: Positive Semidefinite Matrix
description: Quadratic-form, eigenvalue, covariance, and principal-minor views of positive semidefiniteness, with a strict distinction from positive definiteness.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-16
tags: [Linear Algebra, Matrices, PSD, Covariance]
quantInterviewTopics: [linear-algebra-matrix-methods, positive-semidefinite-matrices]
featured: false
related: [correlation-matrix, principal-minor-feasibility]
relatedNotes: []
---

## Definition

A real symmetric matrix `A` is positive semidefinite (PSD) if

`x^T A x >= 0`

for every real vector `x`. It is positive definite (PD) if the inequality is strict for every nonzero `x`.

## Equivalent views

For a real symmetric matrix, the following are equivalent to PSD:

- every eigenvalue is nonnegative;
- `A` is a Gram matrix, so `A = B^T B` for some `B`;
- every principal minor is nonnegative;
- its quadratic form is nonnegative for every vector.

Each view suggests a different interview tool: eigenvalues for symmetric structures, Gram matrices for geometry, principal minors for small symbolic matrices, and quadratic forms when the matrix comes from a variance or sum of squares.

## Why covariance matrices are PSD

Let `X` be a random vector with finite second moments and covariance matrix

`Sigma = E[(X-E[X])(X-E[X])^T]`.

For any deterministic coefficient vector `a`,

`a^T Sigma a = E[(a^T(X-E[X]))^2] = Var(a^T X) >= 0`.

Therefore every covariance matrix is PSD.

This argument is stronger than memorizing a matrix theorem: it identifies the quadratic form with a quantity that cannot be negative. It also characterizes equality. If a nonzero `a` satisfies

`a^T Sigma a = 0`,

then the centered linear combination `a^T(X-E[X])` has zero variance and is zero almost surely. Thus a covariance matrix is PD exactly when no nonzero linear combination of the centered variables has zero variance. Exact linear dependence produces a singular covariance matrix and a zero eigenvalue.

A correlation matrix inherits the same PSD structure after diagonal normalization of a nondegenerate covariance matrix.

## PSD versus PD

These distinctions are interview-critical:

- **PSD:** eigenvalues are `>= 0`; singularity is allowed; all principal minors must be nonnegative.
- **PD:** eigenvalues are `> 0`; the matrix is nonsingular; for a real symmetric matrix, Sylvester's criterion says all leading principal minors are positive.

Do not use “leading principal minors are nonnegative” as a general PSD criterion. For semidefinite matrices, leading minors alone are insufficient; the correct principal-minor characterization requires **all** principal minors to be nonnegative.

## Boundary interpretation

In parameter-feasibility problems, endpoints of an admissible PSD interval often make the determinant zero. That is not an algebraic accident: a zero eigenvalue appears, so one direction of the quadratic form becomes flat. In covariance language, some nontrivial linear combination has zero variance; in Gram-matrix language, the represented vectors become linearly dependent.

## Common mistakes

- Claiming every covariance matrix is positive definite rather than positive semidefinite.
- Checking only diagonal entries or pairwise `2 x 2` conditions.
- Using the positive-definite leading-principal-minor test in a semidefinite problem.
- Treating a zero determinant as automatically invalid when PSD, rather than PD, is required.

## Interview Checks

1. Prove from first principles that a covariance matrix is PSD without invoking an eigenvalue theorem.
2. Give a simple random vector whose covariance matrix is singular, and explain the zero-variance linear combination.
3. Why does `a^T Sigma a = 0` for nonzero `a` prevent positive definiteness?
4. State the principal-minor criteria for PSD and PD and explain why they are not the same test.
5. Interpret the boundary of a correlation-parameter interval in terms of eigenvalues and linear dependence.
