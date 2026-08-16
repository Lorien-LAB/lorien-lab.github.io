---
title: Principal-Minor Feasibility
description: A reusable technique for constraining symbolic parameters in small symmetric matrices by enforcing nonnegative principal minors.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-16
tags: [Linear Algebra, PSD, Problem Solving]
quantInterviewTopics: [linear-algebra-matrix-methods, positive-semidefinite-matrices]
featured: false
related: [positive-semidefinite-matrix, correlation-matrix]
relatedNotes: []
---

## Core idea

For a small real symmetric matrix that must be positive semidefinite, turn the matrix condition into scalar inequalities by requiring every principal minor to be nonnegative.

## Recognition pattern

This is especially effective when a `2 x 2` or `3 x 3` covariance/correlation matrix contains one unknown parameter. Low-order principal minors give simple pairwise bounds, while the full determinant often supplies the decisive joint constraint.

## Workflow

1. Confirm symmetry and any fixed diagonal requirements.
2. Check all `1 x 1` and `2 x 2` principal minors.
3. Compute the full determinant.
4. Intersect all resulting parameter intervals.
5. Prefer exact roots before reporting decimal approximations.

## Common trap

For PSD, do not invoke the positive-definite version of Sylvester's criterion and check only leading principal minors. Semidefinite feasibility requires all principal minors to be nonnegative.
