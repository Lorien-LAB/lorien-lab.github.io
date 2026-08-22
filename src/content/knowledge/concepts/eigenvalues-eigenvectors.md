---
title: Eigenvalues & Eigenvectors
description: Spectral structure of a square matrix, including characteristic roots, eigenspaces, multiplicities, diagonalizability, and interview-ready field distinctions.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-16
tags: [Linear Algebra, Eigenvalues, Eigenvectors, Diagonalization]
quantInterviewTopics: [linear-algebra-matrix-methods, determinants-eigenvalues]
featured: false
related: [matrix-spectral-invariants, eigenbasis-decomposition, positive-semidefinite-matrix]
relatedNotes: []
---

## Definition

For a square matrix `A`, a nonzero vector `x` is an eigenvector with eigenvalue `lambda` when

`A x = lambda x`.

So an eigenvector is a direction whose direction is preserved by the linear map; only its scale changes.

The eigenvalues are roots of the characteristic polynomial

`p_A(lambda) = det(A - lambda I)`.

## How many eigenvalues are there?

An `n x n` matrix has a characteristic polynomial of degree `n`. Over the complex numbers, it therefore has exactly `n` eigenvalues **counted with algebraic multiplicity**.

For a real matrix, those eigenvalues need not all be real. Non-real roots occur in complex-conjugate pairs. For example, a real planar rotation by 90 degrees has eigenvalues `i` and `-i`, but no nonzero real eigenvector.

That field distinction matters in interviews: “an `n x n` real matrix has `n` real eigenvalues” is false in general.

## Algebraic and geometric multiplicity

For an eigenvalue `lambda`:

- its **algebraic multiplicity** is its multiplicity as a root of `p_A`;
- its **geometric multiplicity** is `dim ker(A - lambda I)`, the dimension of its eigenspace.

Always,

`1 <= geometric multiplicity <= algebraic multiplicity`.

Eigenvectors associated with distinct eigenvalues are linearly independent.

A repeated eigenvalue may still have several independent eigenvectors, but it need not. When the total number of linearly independent eigenvectors is smaller than `n`, the matrix is defective.

## Diagonalizability

An `n x n` matrix is diagonalizable exactly when it has `n` linearly independent eigenvectors. Writing those eigenvectors as the columns of `X` gives

`A = X D X^{-1}`,

where `D` is diagonal with the corresponding eigenvalues.

Then

`A^k = X D^k X^{-1}`,

which is why spectral decomposition can turn repeated matrix multiplication into scalar exponentiation.

A particularly important special case is the spectral theorem: a real symmetric matrix has real eigenvalues and an orthonormal eigenbasis, so it can be written

`A = Q Lambda Q^T`.

This is also the cleanest spectral view of positive-semidefinite matrices: a real symmetric matrix is PSD exactly when every eigenvalue is nonnegative.

## Recognition signals

Think “eigenvalues/eigenvectors” when the prompt asks about:

- directions preserved by a matrix;
- repeated powers `A^k`;
- rank loss or singularity at a parameter boundary;
- trace or determinant expressed through the spectrum;
- symmetric matrices or quadratic forms;
- whether enough eigenvectors exist to diagonalize a matrix.

## Common mistakes

- Counting only distinct eigenvalues when the question asks for roots with multiplicity.
- Claiming every real matrix has `n` real eigenvalues.
- Treating algebraic multiplicity and geometric multiplicity as the same quantity.
- Assuming a repeated eigenvalue automatically makes a matrix defective.
- Including the zero vector as an eigenvector.
- Assuming diagonalization is always possible.

## Interview Checks

1. An `n x n` real matrix has how many eigenvalues over `C`, counted with algebraic multiplicity? Must they all be real?
2. How many linearly independent eigenvectors can correspond to an eigenvalue of algebraic multiplicity `m`?
3. Give a condition equivalent to diagonalizability.
4. Why do eigenvectors associated with distinct eigenvalues have to be linearly independent?
5. What extra conclusion does symmetry give about eigenvalues and eigenvectors?
6. What does a zero eigenvalue tell you about determinant, rank, and invertibility?
