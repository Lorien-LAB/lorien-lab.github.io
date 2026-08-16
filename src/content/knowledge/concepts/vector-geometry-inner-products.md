---
title: Vector Geometry & Inner Products
description: Dot products, Euclidean geometry, angles, orthogonality, Cauchy-Schwarz, projections, and the geometric bridge from vectors to correlation.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-17
tags: [Linear Algebra, Vectors, Inner Product, Orthogonality, Projection]
quantInterviewTopics: [linear-algebra-matrix-methods, vectors-linear-systems]
featured: false
related: [correlation-matrix, linear-independence-span-basis-rank, linear-systems-consistency, qr-decomposition]
relatedNotes: []
---

## Core idea

A vector in `R^n` is both an ordered list of coordinates and a geometric direction with magnitude. The inner product turns that coordinate object into geometry: it measures alignment, defines Euclidean length and angle, identifies orthogonality, and produces projections.

For column vectors `x,y in R^n`, the standard inner product is

`<x,y> = x^T y = sum_i x_i y_i`.

From one bilinear expression we obtain most of the Euclidean geometry used in quantitative interviews.

## Norm and distance

The Euclidean norm is

`||x||_2 = sqrt(x^T x)`.

The Euclidean distance between two points is

`||x-y||_2`.

A norm is always nonnegative and is zero only for the zero vector. Scaling a vector scales its Euclidean norm by the absolute value of the scalar:

`||a x||_2 = |a| ||x||_2`.

## Angle and orthogonality

For nonzero vectors,

`cos(theta) = (x^T y)/(||x|| ||y||)`.

The vectors are orthogonal exactly when

`x^T y = 0`.

Orthogonality is more useful than merely saying two arrows meet at a right angle. In least squares, an optimal residual is orthogonal to the fitted subspace. In QR, orthogonal directions let a coupled problem be converted into independent coordinates. In covariance problems, orthogonality often corresponds to zero inner-product dependence after suitable centering and normalization.

## Why the cosine is always between -1 and 1

The key inequality is **Cauchy-Schwarz**:

`|x^T y| <= ||x|| ||y||`.

Dividing by the positive denominator for nonzero `x,y` gives

`-1 <= (x^T y)/(||x|| ||y||) <= 1`.

Equality holds exactly when the vectors are linearly dependent. The same inequality is the geometric reason an ordinary correlation coefficient cannot exceed 1 in absolute value.

One quick proof considers the nonnegative quadratic

`||x-t y||^2 >= 0`

for every real `t`. Minimizing that quadratic over `t` yields

`(x^T y)^2 <= (x^T x)(y^T y)`.

## Projection onto a direction

Let `u != 0`. The orthogonal projection of `x` onto the one-dimensional subspace spanned by `u` is

`proj_u(x) = (u^T x)/(u^T u) * u`.

Write

`x = proj_u(x) + r`.

Then the residual is orthogonal to `u`:

`u^T r = 0`.

If `u` is a unit vector, the formula simplifies to

`proj_u(x) = (u^T x)u`.

This decomposition is the one-dimensional prototype of least squares and orthogonal projection onto a column space.

## Correlation as cosine

After two data vectors have been centered, their sample correlation is the cosine of the angle between the centered vectors after normalization. In population notation, standardized random variables have unit variance, so their covariance is their correlation. This makes the familiar bound `|rho| <= 1` a Cauchy-Schwarz statement.

The geometric view is especially useful when several correlations must coexist. A correlation matrix can be interpreted as a **Gram matrix of unit vectors**: each entry is an inner product, hence a cosine. Pairwise numbers therefore cannot be chosen independently; they must come from one jointly realizable vector geometry.

For the matrix-level feasibility, covariance normalization, and positive-semidefinite conditions, see `correlation-matrix`.

## A useful three-vector geometry

Suppose unit vectors `x,y,z` satisfy

`x^T y = x^T z = 0.8`.

Let the angle from `x` to each of `y,z` be `theta`, so `cos(theta)=0.8`. The smallest possible angle between `y` and `z` is 0, giving correlation 1. The largest possible angle is `2 theta`, giving

`cos(2 theta) = 2 cos^2(theta)-1 = 2(0.8)^2-1 = 0.28`.

Thus their possible mutual inner product is bounded below by 0.28 and above by 1. This is the geometric version of a positive-semidefinite correlation-matrix constraint.

## Connections to linear algebra

- **Span and basis:** projections require us to specify the subspace onto which we project.
- **Linear systems:** orthogonality and null spaces describe solution geometry.
- **QR:** orthonormal columns convert projection and least squares into simple coordinates.
- **Correlation matrices:** Gram matrices encode all pairwise inner products simultaneously.

## Common mistakes

- Applying the angle formula when one vector is zero; its denominator vanishes.
- Concluding `x^T y=0` means statistical independence. Orthogonality or zero correlation alone generally does not imply independence.
- Forgetting the denominator `u^T u` when projecting onto a non-unit vector.
- Treating pairwise cosine values as independent choices when they must come from one consistent Gram matrix.
- Quoting `|rho|<=1` without recognizing that joint correlation feasibility is stronger than pairwise bounds.

## Interview Checks

1. When does equality hold in Cauchy-Schwarz?
2. If `x^T y=0` for nonzero vectors, what geometric statement follows?
3. Derive `proj_u(x)` for a nonzero, not necessarily unit, vector `u` and verify that the residual is orthogonal to `u`.
4. Use Cauchy-Schwarz to explain why a correlation coefficient lies in `[-1,1]`.
5. If two unit vectors each have inner product `0.8` with the same unit reference vector, why can their mutual inner product not be smaller than `0.28`?
6. Why does a collection of individually valid pairwise correlations still need a positive-semidefinite Gram matrix?
