---
title: Positive Semidefinite Matrix
description: A symmetric matrix whose quadratic form is nonnegative, with equivalent eigenvalue and principal-minor characterizations useful in quant interviews.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-16
tags: [Linear Algebra, Matrices, PSD]
featured: false
related: [correlation-matrix]
relatedNotes: []
---

## Definition

A real symmetric matrix `A` is positive semidefinite (PSD) if

`x^T A x >= 0`

for every real vector `x`.

## Equivalent views

For a real symmetric matrix, the following are equivalent:

- all eigenvalues are nonnegative;
- `A` can be written as a Gram matrix `B^T B`;
- every principal minor is nonnegative.

These views support different interview strategies: eigenvalues for conceptual arguments, Gram representations for geometry, and principal minors for low-dimensional symbolic parameter problems.

## Positive definite versus semidefinite

For positive definiteness, positivity of the leading principal minors is sufficient by the usual Sylvester criterion. For positive semidefiniteness, checking only leading principal minors is not enough in general; all principal minors must be nonnegative.

## Common trap

Do not confuse nonnegative diagonal entries with positive semidefiniteness. PSD is a global constraint on the quadratic form.
