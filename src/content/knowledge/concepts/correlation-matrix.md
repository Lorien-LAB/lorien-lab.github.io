---
title: Correlation Matrix
description: The structural conditions that a matrix must satisfy to represent pairwise correlations of random variables.
type: concept
domain: Mathematics & Statistics
category: Statistics
status: growing
date: 2026-08-16
tags: [Correlation, Linear Algebra, Statistics]
featured: false
related: [positive-semidefinite-matrix]
relatedNotes: []
---

## Definition

A real matrix `R` is a valid correlation matrix when it is symmetric, has ones on the diagonal, and is positive semidefinite.

The positive-semidefinite condition is essential: pairwise entries lying in `[-1,1]` is necessary but not sufficient for all correlations to be jointly realizable.

## Why positive semidefinite appears

For any coefficient vector `a`, if `X` is a standardized random vector with correlation matrix `R`, then

`a^T R a = Var(a^T X) >= 0`.

Thus every genuine correlation matrix is positive semidefinite. Conversely, a symmetric positive-semidefinite matrix with unit diagonal can be realized as a Gram matrix of unit vectors and therefore as a correlation matrix.

## Interview recognition

When a matrix contains an unknown correlation parameter, do not check only the bounds of each entry. Translate validity into a positive-semidefinite feasibility problem.

## Common trap

Checking every `2 x 2` pair separately can miss a joint inconsistency that only appears in a larger principal minor or eigenvalue.
