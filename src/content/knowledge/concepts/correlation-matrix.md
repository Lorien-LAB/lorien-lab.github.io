---
title: Correlation Matrix
description: Covariance normalization, joint-validity constraints, and spectral structure for correlation matrices used throughout quantitative interviews.
type: concept
domain: Mathematics & Statistics
category: Statistics
status: growing
date: 2026-08-16
tags: [Correlation, Covariance, Linear Algebra, Statistics]
quantInterviewTopics: [linear-algebra-matrix-methods, covariance-correlation-matrices]
featured: false
related: [positive-semidefinite-matrix, expectation-variance-covariance-algebra]
relatedNotes: []
---

## Covariance and correlation

For random variables with finite second moments,

`Cov(X,Y) = E[(X-E[X])(Y-E[Y])] = E[XY] - E[X]E[Y]`.

If both standard deviations are nonzero, their correlation is

`Corr(X,Y) = Cov(X,Y) / (sigma_X sigma_Y)`.

Correlation removes units and rescales covariance into the interval `[-1,1]`. Independence implies zero covariance, but zero covariance alone does not generally imply independence.

The scalar expectation/variance/covariance identities behind these entries are developed in `expectation-variance-covariance-algebra`; this page owns the matrix-level normalization and joint-validity layer.

## From a covariance matrix to a correlation matrix

Let `Sigma` be a covariance matrix and let

`S = diag(sigma_1, ..., sigma_n)`

contain the marginal standard deviations. If every `sigma_i > 0`, then the correlation matrix is

`R = S^{-1} Sigma S^{-1}`.

Equivalently, with `D = diag(Sigma_11, ..., Sigma_nn)`,

`R = D^{-1/2} Sigma D^{-1/2}`.

Elementwise,

`R_ij = Sigma_ij / sqrt(Sigma_ii Sigma_jj)`.

This is a congruence transformation, so positive semidefiniteness is preserved. If a marginal variance is zero, the corresponding usual correlation coefficient is undefined because its standard deviation cannot be used as a divisor; handle or remove the degenerate coordinate rather than silently normalizing by zero.

## What makes a matrix a valid correlation matrix?

A real matrix `R` is a valid correlation matrix exactly when it is

- symmetric;
- positive semidefinite;
- equal to `1` on every diagonal entry.

The PSD condition is the joint-consistency constraint. Having every off-diagonal entry inside `[-1,1]` is necessary but not sufficient: three or more pairwise correlations can each look individually plausible while being impossible jointly.

For any coefficient vector `a`, if `Z` is a standardized random vector with correlation matrix `R`, then

`a^T R a = Var(a^T Z) >= 0`.

Conversely, a symmetric PSD matrix with unit diagonal is a Gram matrix of unit vectors and can be realized as a correlation matrix.

## Equicorrelation matrices

A useful interview family has one common off-diagonal correlation `rho`:

`R_n(rho) = (1-rho) I + rho 11^T`.

Its eigenvalues are

- `1-rho`, with multiplicity `n-1` on the subspace orthogonal to `1`;
- `1 + (n-1)rho`, with multiplicity `1` in the direction of `1`.

Therefore `R_n(rho)` is PSD exactly when

`-1/(n-1) <= rho <= 1`.

At either boundary the matrix is singular. Inside the interval, both eigenvalue types are strictly positive and the matrix is positive definite.

## Interview recognition

When a covariance or correlation matrix contains an unknown parameter, first ask which structural condition is being tested:

- normalization from covariance to correlation;
- PSD feasibility of a small symbolic matrix;
- eigenvalue structure of a highly symmetric matrix;
- singular boundary cases caused by exact linear dependence.

Do not reduce a joint matrix problem to separate pairwise bounds unless you have proved those bounds are sufficient.

## Common mistakes

- Checking only that every pairwise correlation lies in `[-1,1]`.
- Dividing by a zero standard deviation when converting covariance to correlation.
- Assuming zero correlation implies independence without additional assumptions.
- Forgetting that PSD permits zero eigenvalues and therefore singular correlation matrices.

## Interview Checks

1. Given a covariance matrix with positive diagonal entries, write its correlation matrix both elementwise and as a diagonal congruence transform.
2. Explain why a covariance matrix and its associated correlation matrix are PSD.
3. Three pairwise correlations are all in `[-1,1]`. What extra condition must be checked before they can be jointly valid?
4. Derive the admissible range of the common off-diagonal parameter in an `n x n` equicorrelation matrix.
5. What changes in the covariance-to-correlation conversion if one variable has zero variance?
