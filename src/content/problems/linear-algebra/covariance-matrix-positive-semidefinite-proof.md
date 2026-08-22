---
problemId: linear-algebra-covariance-001
title: Why Every Covariance Matrix Is Positive Semidefinite
description: Prove the positive-semidefinite structure of a covariance matrix from the variance of arbitrary linear combinations and characterize when strict positive definiteness holds.
date: 2026-08-16
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Covariance Matrices, Positive Semidefinite Matrices]
tags: [Covariance, PSD, Linear Algebra, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, covariance-correlation-matrices, positive-semidefinite-matrices]
concepts: [positive-semidefinite-matrix, correlation-matrix]
techniques: []
prerequisites: []
relatedProblems: [covariance-to-correlation-matrix, equicorrelation-matrix-bounds, correlation-matrix-parameter-range]
family: covariance-matrix-structure
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
status: solved
featured: false
---

## Problem

Let `X = (X_1,...,X_n)^T` be a random vector with finite second moments, and let

`Sigma = Cov(X)`

be its covariance matrix.

1. Prove that `Sigma` is symmetric and positive semidefinite.
2. Characterize when `Sigma` is positive definite rather than merely positive semidefinite.

## Think Before Revealing

Do not start with determinants or eigenvalues. A covariance matrix is built from variances and covariances, so ask what the quadratic form `a^T Sigma a` means probabilistically for an arbitrary coefficient vector `a`.

<details>
<summary>Hint 1</summary>

Consider the scalar random variable `Y = a^T X`.

</details>

<details>
<summary>Hint 2</summary>

Use bilinearity of covariance to show

`Var(a^T X) = a^T Sigma a`.

Then ask when a variance can equal zero.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Method 1 — identify the quadratic form as a variance

Symmetry is immediate because

`Cov(X_i,X_j) = Cov(X_j,X_i)`.

Now let `a` be any deterministic vector in `R^n`. By bilinearity of covariance,

`a^T Sigma a = Var(a^T X)`.

More explicitly, if `X_c = X-E[X]`, then

`a^T Sigma a = a^T E[X_c X_c^T] a`

`= E[a^T X_c X_c^T a]`

`= E[(a^T X_c)^2]`

`= Var(a^T X) >= 0`.

Because this holds for every `a`, `Sigma` is positive semidefinite.

For positive definiteness we need strict positivity for every nonzero `a`:

`a^T Sigma a > 0` for all `a != 0`.

Using the variance identity, this is equivalent to

`Var(a^T X) > 0` for every nonzero `a`.

Therefore `Sigma` is positive definite exactly when there is **no nonzero coefficient vector** whose centered linear combination has zero variance. If some nonzero `a` satisfies

`Var(a^T X)=0`,

then `a^T(X-E[X])=0` almost surely, so the centered variables obey an exact linear relation and `Sigma` is singular.

### Method 2 — expectation of rank-one PSD matrices

Again write `X_c=X-E[X]`. Then

`Sigma = E[X_c X_c^T]`.

For each realized vector `x`, the rank-one matrix `x x^T` is PSD because

`a^T x x^T a = (a^T x)^2 >= 0`.

An expectation of PSD matrices is PSD, hence `Sigma` is PSD. The same calculation shows why a zero eigenvalue corresponds to a direction `a` along which the centered random vector has no variation.

## Why This Problem Matters

This is one of the cleanest examples of translating a matrix statement into a probabilistic quantity. The strongest interview answer does not merely recall that covariance matrices are PSD; it explains **why** by recognizing the quadratic form as the variance of a portfolio or linear combination.

The strict-PD follow-up is equally important because covariance matrices can be singular. Perfect linear dependence, redundant factors, or duplicated variables create zero-variance directions.

## Common Mistakes

- Claiming covariance matrices are always positive definite. They are guaranteed only to be positive semidefinite.
- Trying to prove PSD by expanding every principal minor; that is far more work than the variance identity.
- Forgetting to center the variables when writing the outer-product representation.
- Saying “zero covariance” when the relevant condition is “zero variance of a linear combination.”
- Treating singularity as a contradiction even though PSD explicitly allows zero eigenvalues.

## Extensions

- If every marginal variance is positive, define the associated correlation matrix by diagonal normalization and prove it is PSD by a congruence transform.
- Interpret `a` as portfolio weights: `a^T Sigma a` is portfolio variance, so the PSD property is exactly the impossibility of negative variance.
- Show that if two components satisfy an exact affine relation, then the covariance matrix is singular.
- Relate the result to Gram matrices by viewing covariance as an inner product between centered random variables in `L^2`.

</details>
