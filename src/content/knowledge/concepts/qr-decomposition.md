---
title: QR Decomposition
description: Orthogonal-triangular factorization, thin versus full QR, triangular solves, and numerically stable least-squares reduction.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-16
tags: [Linear Algebra, QR, Orthogonality, Least Squares, Numerical Methods]
quantInterviewTopics: [linear-algebra-matrix-methods, matrix-decompositions]
featured: false
related: [lu-cholesky-decomposition, singular-value-decomposition]
relatedNotes: []
---

## Core idea

A QR decomposition separates a matrix into an **orthogonal part** and a **triangular part**. For a square nonsingular matrix,

`A = Q R`,

where `Q^T Q = I` and `R` is upper triangular. Orthogonality is valuable because multiplication by `Q` preserves Euclidean lengths and angles, while triangular systems are cheap to solve by back substitution.

For a real square orthogonal matrix, `Q^{-1} = Q^T`. Therefore

`A x = b`

becomes

`Q R x = b  =>  R x = Q^T b`.

The expensive-looking linear system has been reduced to an orthogonal transform followed by a triangular solve.

## Square, full, and thin QR

Dimensions matter.

### Square QR

For `A in R^{n x n}` with full rank,

- `Q in R^{n x n}` is orthogonal;
- `R in R^{n x n}` is upper triangular.

### Full QR for a tall matrix

For `A in R^{m x n}` with `m >= n`, a full QR may be written

`A = Q R`,

with

- `Q in R^{m x m}` orthogonal;
- `R in R^{m x n}`, whose top `n x n` block is upper triangular when `A` has full column rank.

### Thin or economy QR

For a tall full-column-rank matrix, the representation most useful in least squares is

`A = Q_1 R`,

where

- `Q_1 in R^{m x n}` has orthonormal columns, so `Q_1^T Q_1 = I_n`;
- `R in R^{n x n}` is upper triangular and nonsingular.

`Q_1` is not square, so in general `Q_1 Q_1^T != I_m`. Instead, `Q_1 Q_1^T` is the orthogonal projector onto the column space of `A`.

## Least squares directly from QR

Suppose `X in R^{m x n}`, `m >= n`, has full column rank and we want

`min_beta ||y - X beta||_2`.

Take the thin QR factorization

`X = Q R`,

with `Q^T Q = I_n`. Decompose `y` into its projection onto `col(X)` and an orthogonal residual. The least-squares fitted vector is

`y_hat = Q Q^T y`.

Since `X beta = Q R beta`, matching the component in `col(X)` gives

`Q R beta = Q Q^T y`.

Multiplying by `Q^T` yields the triangular system

`R beta = Q^T y`.

This is the QR least-squares algorithm to remember: **factor `X` directly, form `Q^T y`, then back-substitute through `R`.** No matrix inverse is required.

## Why not form the normal equations first?

The first-order condition for least squares is

`X^T X beta = X^T y`.

That identity is mathematically correct, but explicitly forming `X^T X` is often a poorer numerical algorithm. In the 2-norm,

`kappa_2(X^T X) = kappa_2(X)^2`

when `X` has full column rank. Thus the normal equations square the condition number and can magnify loss of numerical accuracy.

Direct QR avoids that unnecessary deterioration. This is why an interview answer should distinguish a valid algebraic derivation from a better numerical implementation.

## Geometry: QR exposes the projection

The columns of thin `Q` form an orthonormal basis for `col(X)`. Hence

`P_X = Q Q^T`

is the orthogonal projection matrix onto the model space. The fitted vector is

`y_hat = P_X y = Q Q^T y`,

and the residual

`r = y - y_hat`

satisfies

`Q^T r = 0`

and therefore `X^T r = 0`.

This geometric view is often the cleanest way to explain why the QR solution minimizes the Euclidean residual.

## How QR is constructed

### Gram-Schmidt viewpoint

Classical Gram-Schmidt takes the columns of `A`, removes projections onto previously constructed directions, and normalizes the remaining vectors. It is conceptually useful because it makes `Q` an explicit orthonormal basis and the coefficients become entries of `R`.

However, classical Gram-Schmidt can lose orthogonality in finite precision when columns are nearly linearly dependent.

### More stable implementations

Practical numerical libraries commonly prefer **Householder reflections** for dense QR. Modified Gram-Schmidt is also more stable than the classical form for many problems. The important interview distinction is:

- Gram-Schmidt is excellent for understanding the geometry;
- Householder QR is a standard robust implementation choice.

## Uniqueness and sign conventions

QR has a sign ambiguity: multiplying one column of `Q` by `-1` and the corresponding row of `R` by `-1` leaves `Q R` unchanged.

For a full-rank square matrix, or for a tall full-column-rank matrix in thin QR, requiring every diagonal entry of `R` to be **positive** removes this ambiguity. Under that convention the QR factors are unique.

## Rank-deficient boundary

If `X` does not have full column rank, the triangular `R` in an unpivoted thin QR becomes singular or nearly singular. Then the simple solve `R beta = Q^T y` no longer defines a unique coefficient vector.

Two standard responses are:

- **column-pivoted QR**, often written `X P = Q R`, which reveals numerical rank and reorders columns;
- **SVD**, which gives the cleanest route to rank, the Moore-Penrose pseudoinverse, and minimum-norm least-squares solutions.

Do not silently divide by tiny diagonal entries of `R`.

## Interview pattern

When a matrix problem mentions any combination of:

- orthogonal columns;
- least squares;
- projection;
- solving many systems with the same design matrix;
- avoiding an explicit inverse;

QR should be one of the first decompositions you consider.

## Common mistakes

- Saying `Q Q^T = I` for a thin rectangular `Q`. Only `Q^T Q = I` is guaranteed; `Q Q^T` is a projector.
- Solving least squares by explicitly computing `(X^T X)^{-1} X^T y` when QR is available.
- Treating the normal equations as numerically equivalent to direct QR merely because the exact-arithmetic solutions agree.
- Forgetting the full-column-rank assumption behind a nonsingular triangular `R`.
- Claiming QR is unique without fixing the signs of the diagonal of `R`.
- Describing classical Gram-Schmidt as the preferred high-accuracy implementation without discussing stability.

## Interview Checks

1. For `X in R^{m x n}` with `m>n`, what are the dimensions of `Q` and `R` in thin QR?
2. Why is `Q Q^T` a projection rather than the identity in thin QR?
3. Starting from `min_beta ||y-X beta||_2`, derive `R beta = Q^T y` without forming `X^T X`.
4. Why can the normal equations be less stable than direct QR?
5. What sign convention makes a full-rank QR factorization unique?
6. What changes when `X` is rank deficient, and when would you prefer pivoted QR or SVD?
7. Explain the difference between Gram-Schmidt as a conceptual construction and Householder QR as a numerical implementation.
