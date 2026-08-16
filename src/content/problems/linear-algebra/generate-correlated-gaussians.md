---
problemId: linear-algebra-decomposition-003
title: Generate Correlated Gaussian Variables
description: Build correlated Gaussian variables from independent standard normals, verify the covariance exactly, and generalize through Cholesky and spectral/SVD covariance factors.
date: 2026-08-16
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Cholesky Decomposition, SVD, Gaussian Simulation]
tags: [Linear Algebra, Gaussian, Covariance, Cholesky, SVD, Monte Carlo, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, matrix-decompositions]
concepts: [lu-cholesky-decomposition, singular-value-decomposition, positive-semidefinite-matrix]
techniques: []
prerequisites: [correlation-matrix]
relatedProblems: [covariance-matrix-positive-semidefinite-proof]
family: covariance-factor-simulation
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Let `z_1` and `z_2` be independent standard normal random variables.

1. For a target correlation `rho in [-1,1]`, construct two standard normal random variables `x_1` and `x_2` whose correlation is `rho`.
2. Verify their variances and covariance directly.
3. Generalize the construction: if `z ~ N(0,I)` and a target covariance matrix `Sigma` is symmetric positive definite, explain how a Cholesky factor produces

   `x ~ N(mu, Sigma)`.

4. What changes if `Sigma` is positive semidefinite but singular?

## Think Before Revealing

You do not need to generate dependence directly. Start with independent Gaussian shocks and apply a linear transformation whose rows have the desired inner products.

<details>
<summary>Hint 1</summary>

Set

`x_1 = z_1`.

To give `x_2` covariance `rho` with `x_1`, put coefficient `rho` on `z_1`. How large must the coefficient on the independent `z_2` be so that `Var(x_2)=1`?

</details>

<details>
<summary>Hint 2</summary>

Try

`x_2 = rho z_1 + sqrt(1-rho^2) z_2`.

Independence makes the variance calculation additive and kills the cross term.

</details>

<details>
<summary>Hint 3</summary>

In `n` dimensions, if

`Sigma = L L^T`,

consider

`x = mu + L z`.

Then push the identity covariance of `z` through the linear map.

</details>

<details>
<summary>Show Solution</summary>

Use `x_1=z_1` and `x_2=rho z_1+sqrt(1-rho^2)z_2`. In higher dimensions, any factor `B` satisfying `B B^T=Sigma` transforms `z~N(0,I)` into `mu+Bz` with covariance `Sigma`.

</details>

## Solution

### Part 1: construct the two-dimensional pair

Define

`x_1 = z_1`

and

`x_2 = rho z_1 + sqrt(1-rho^2) z_2`.

The coefficient `sqrt(1-rho^2)` is real precisely when

`|rho| <= 1`,

which is exactly the admissible range of a correlation coefficient.

Because linear combinations of jointly Gaussian variables are Gaussian, `(x_1,x_2)` is jointly Gaussian.

Both means are zero:

`E[x_1]=0`,

`E[x_2]=rho E[z_1] + sqrt(1-rho^2) E[z_2] = 0`.

### Part 2: verify the variances

For the first coordinate,

`Var(x_1) = Var(z_1) = 1`.

For the second coordinate, independence gives `Cov(z_1,z_2)=0`, so

`Var(x_2)`

`= rho^2 Var(z_1) + (1-rho^2) Var(z_2)`

`= rho^2 + (1-rho^2)`

`= 1`.

Thus both marginals are standard normal.

### Part 3: verify the covariance

Since `x_1=z_1`,

`Cov(x_1,x_2)`

`= Cov(z_1, rho z_1 + sqrt(1-rho^2) z_2)`

`= rho Var(z_1) + sqrt(1-rho^2) Cov(z_1,z_2)`

`= rho`.

Because both variances are `1`, the correlation is also `rho`.

The covariance matrix of `(x_1,x_2)` is therefore

`[[1, rho], [rho, 1]]`.

### Part 4: recognize the factorization hidden in the formula

The construction can be written as

`x = L z`,

where

`L = [[1,0],[rho,sqrt(1-rho^2)]]`.

Then

`L L^T = [[1,rho],[rho,1]]`.

So the familiar two-dimensional formula is already a Cholesky-style covariance factorization.

### Part 5: generalize to an SPD covariance matrix

Let

`z ~ N(0,I_n)`

and suppose the target covariance matrix `Sigma` is symmetric positive definite. Using the lower-triangular Cholesky convention,

`Sigma = L L^T`.

Define

`x = mu + L z`.

Then

`E[x] = mu + L E[z] = mu`,

and

`Cov(x)`

`= Cov(Lz)`

`= L Cov(z) L^T`

`= L I L^T`

`= Sigma`.

Therefore

`x ~ N(mu,Sigma)`.

The Gaussian conclusion follows because an affine transformation of a multivariate Gaussian vector is again multivariate Gaussian.

### Part 6: keep the upper-Cholesky convention consistent

Some software or derivations write Cholesky as

`Sigma = R^T R`,

where `R` is upper triangular.

Then the matching simulation formula is

`x = mu + R^T z`,

because

`Cov(R^T z) = R^T I R = R^T R = Sigma`.

Using `x=mu+Rz` with the convention `Sigma=R^T R` would instead produce covariance `R R^T`, which is generally different. The orientation is not cosmetic.

### Part 7: singular PSD covariance matrices

A valid covariance matrix must be symmetric **positive semidefinite (PSD)**, not necessarily positive definite. If `Sigma` is singular PSD, ordinary Cholesky with strictly positive diagonal pivots is no longer the universal route.

Use a spectral factorization instead. Write

`Sigma = Q Lambda Q^T`,

where `Lambda` is diagonal with nonnegative eigenvalues, possibly including zeros.

Define

`B = Q Lambda^{1/2}`.

Then

`B B^T`

`= Q Lambda^{1/2} Lambda^{1/2} Q^T`

`= Q Lambda Q^T`

`= Sigma`.

Thus

`x = mu + B z`

still has covariance `Sigma`.

Zero eigenvalues simply mean that the generated Gaussian vector lives on a lower-dimensional affine subspace. The distribution is degenerate, but its covariance is valid.

For a symmetric PSD covariance matrix, the same factor can be understood through its SVD: singular values equal the nonnegative eigenvalues, so a spectral/SVD square-root factor gives the same covariance geometry.

### Part 8: validate the covariance before simulating

If a proposed `Sigma` is not PSD, then there is no real matrix `B` satisfying

`B B^T = Sigma`,

because every matrix of the form `B B^T` is PSD:

`v^T B B^T v = ||B^T v||_2^2 >= 0`.

So covariance validation is not an optional numerical pre-check. It is a mathematical existence condition for the Gaussian model.

## Why This Problem Matters

This is a compact bridge between probability, linear algebra, and Monte Carlo simulation.

The key reusable principle is:

> Correlation is created by a linear map whose Gram matrix is the target covariance.

That principle explains all of the common constructions:

- the explicit two-normal formula;
- Cholesky simulation for SPD covariance matrices;
- spectral/SVD simulation for singular PSD covariance matrices.

It also prevents a common implementation mistake: treating a covariance matrix itself as though it were the transformation. The transformation is a **factor** `B` satisfying `B B^T=Sigma`, not generally `Sigma` itself.

## Common Mistakes

- Using `sqrt(1-rho)` instead of `sqrt(1-rho^2)` in the two-dimensional construction.
- Forgetting the restriction `|rho|<=1`.
- Checking the covariance but forgetting to verify that both marginal variances remain `1`.
- Multiplying by `Sigma` itself and claiming the covariance becomes `Sigma`; using `Sigma z` gives covariance `Sigma^2` when `Sigma` is symmetric.
- Mixing `Sigma=L L^T` with the transformation `L^T z`, or mixing `Sigma=R^T R` with `Rz`.
- Assuming every covariance matrix is strictly positive definite.
- Declaring a singular PSD covariance invalid merely because ordinary positive-diagonal Cholesky fails.
- Skipping the PSD check for a proposed covariance matrix.

## Extensions

1. **Monte Carlo engine:** generate a large sample and explain why the sample covariance converges to the target matrix.
2. **Three assets:** construct a factor for a valid `3 x 3` correlation matrix and simulate jointly normal returns.
3. **Rank-one covariance:** interpret the simulated vector when `Sigma` has rank one.
4. **Factor models:** connect `Bz` to a linear factor model and separate systematic and idiosyncratic shocks.
5. **PCA simulation:** order eigenvalues from largest to smallest and truncate small directions to obtain a low-rank approximation.
6. **Conditioning:** compare Cholesky and spectral factors when `Sigma` is nearly singular.
7. **Non-Gaussian shocks:** if `z` has identity covariance but is not Gaussian, determine which conclusions about mean and covariance survive and which distributional conclusion does not.
