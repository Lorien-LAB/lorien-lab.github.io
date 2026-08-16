---
title: Principal-Minor Feasibility
description: A reusable technique for constraining symbolic parameters in small symmetric matrices while keeping PSD and positive-definite criteria distinct.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-16
tags: [Linear Algebra, PSD, Problem Solving, Correlation]
quantInterviewTopics: [linear-algebra-matrix-methods, positive-semidefinite-matrices]
featured: false
related: [positive-semidefinite-matrix, correlation-matrix]
relatedNotes: []
---

## Core idea

For a small real symmetric matrix that must be positive semidefinite, turn the matrix condition into scalar inequalities by requiring **every principal minor** to be nonnegative.

A principal minor is the determinant of a principal submatrix obtained by selecting the same index set for rows and columns. A leading principal minor is only the special case using the first `k` indices.

## PSD and PD are different tests

For a real symmetric matrix:

- **PSD:** all principal minors are nonnegative.
- **PD:** Sylvester's criterion allows the simpler test that all leading principal minors are positive.

The second statement must not be weakened to “leading principal minors are nonnegative” and then reused for PSD. That shortcut is not valid in general.

## Recognition pattern

This technique is especially effective when a `2 x 2` or `3 x 3` covariance/correlation matrix contains one symbolic parameter.

For a `3 x 3` correlation matrix,

1. the `1 x 1` principal minors are fixed at `1`;
2. the `2 x 2` principal minors impose pairwise bounds such as `1-rho^2 >= 0`;
3. the full determinant imposes the genuinely joint restriction.

The final feasible set is the intersection of all these inequalities.

## Workflow

1. Confirm symmetry and any fixed diagonal requirements.
2. Enumerate all principal minors required by the dimension.
3. Convert each nonnegativity requirement into an inequality.
4. Solve the full determinant constraint carefully; it often gives a quadratic interval.
5. Intersect with lower-order constraints such as `|rho| <= 1`.
6. Keep exact roots until the final numerical presentation.
7. Inspect equality cases: a zero determinant usually marks a singular PSD boundary.

## Useful alternatives and cross-checks

Principal minors are not the only route.

- **Schur complement:** when a leading block is positive definite, PSD of the full block matrix can reduce to one lower-dimensional inequality.
- **Quadratic form / completing the square:** useful when the matrix represents a variance or when a direct expression `x^T A x` simplifies naturally.
- **Eigenvalues:** often best for highly symmetric families such as equicorrelation matrices.

A strong interview solution chooses the representation that exposes the structure most directly, and may use a second method as a check rather than recomputing the same determinant twice.

## Common mistakes

- Checking only `|rho| <= 1` for every pair and forgetting joint consistency.
- Checking only leading principal minors in a PSD problem.
- Expanding a determinant without tracking the sign of the mixed term.
- Reporting rounded endpoints without deriving the exact interval first.
- Rejecting a zero determinant even though the requirement is PSD rather than PD.

## Interview Checks

1. Why are the three pairwise bounds of a `3 x 3` correlation matrix not enough to guarantee joint validity?
2. State the correct principal-minor tests for PSD and PD.
3. For a one-parameter `3 x 3` correlation matrix, outline the fastest principal-minor workflow before doing any algebra.
4. When would a Schur complement be cleaner than a full determinant expansion?
5. What geometric or probabilistic event usually occurs when the determinant reaches zero at a feasible boundary?
