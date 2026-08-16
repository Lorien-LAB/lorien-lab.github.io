---
title: Eigenbasis Decomposition
description: A reusable interview technique for applying a diagonalizable matrix, its powers, matrix polynomials, and symmetric matrix functions through spectral coordinates.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-16
tags: [Linear Algebra, Eigenvalues, Eigenvectors, Problem Solving, Matrix Functions]
quantInterviewTopics: [linear-algebra-matrix-methods, determinants-eigenvalues, matrix-decompositions]
featured: false
related: [eigenvalues-eigenvectors, matrix-spectral-invariants, lu-cholesky-decomposition]
relatedNotes: []
---

## Core idea

If `v_1, ..., v_n` are linearly independent eigenvectors of `A` with eigenvalues `lambda_1, ..., lambda_n`, decompose the target vector in that eigenbasis:

`v = c_1 v_1 + ... + c_n v_n`.

Linearity and `A v_i = lambda_i v_i` then give

`A v = c_1 lambda_1 v_1 + ... + c_n lambda_n v_n`.

This is often much faster than reconstructing every entry of `A`.

## Powers and matrix functions

The same representation immediately yields

`A^k v = sum_i c_i lambda_i^k v_i`.

For a polynomial `p`,

`p(A) v = sum_i c_i p(lambda_i) v_i`.

When `A = X D X^{-1}`, these formulas are the vector-level version of

`A^k = X D^k X^{-1}`.

## Matrix functions and square roots

For a real symmetric matrix, the spectral theorem gives an orthogonal diagonalization

`A = Q Lambda Q^T`.

Whenever a scalar function `f` is meaningful on the eigenvalues, the corresponding symmetric matrix function is defined spectrally by

`f(A) = Q f(Lambda) Q^T`,

where `f(Lambda)` means applying `f` to each diagonal eigenvalue.

This is the same idea as the power formula above: move to spectral coordinates, perform scalar operations on the spectrum, then transform back.

### Principal square root of a PSD matrix

If `A` is symmetric positive semidefinite, every eigenvalue satisfies `lambda_i >= 0`. Define

`Lambda^{1/2} = diag(sqrt(lambda_1), ..., sqrt(lambda_n))`

and

`A^{1/2} = Q Lambda^{1/2} Q^T`.

Then

`(A^{1/2})^2 = Q Lambda^{1/2} Q^T Q Lambda^{1/2} Q^T = Q Lambda Q^T = A`.

This `A^{1/2}` is the **principal square root**. It is the unique symmetric positive-semidefinite square root of `A`.

The word *principal* matters. Matrix equations `M^2=A` can have other, non-principal square roots in broader settings. The spectral construction above singles out the canonical PSD one for a symmetric PSD matrix.

If a real symmetric matrix has a negative eigenvalue, the scalar square root is not real on that eigendirection, so the matrix cannot have a real symmetric PSD square root. That does not settle every possible nonsymmetric real square root problem; it states the precise boundary for the principal symmetric PSD construction.

### Square root versus Gram factor

Do not confuse

`M^2 = A`

with

`C C^T = A`

or

`C^T C = A`.

For symmetric PSD `A`, the principal square root itself satisfies `A^{1/2} A^{1/2}=A`, but a Cholesky or other Gram factor generally need not be symmetric and need not square to `A` in the ordinary matrix-product sense.

## Recognition pattern

Use this technique when a problem gives:

- several eigenpairs explicitly;
- a target vector that can be written in the supplied eigenvectors;
- `A v`, `A^k v`, or a polynomial in `A` rather than the matrix entries themselves;
- a symmetric matrix function such as a PSD square root;
- a repeated linear recurrence that becomes scalar in spectral coordinates.

The information in the eigenpairs is usually there to prevent you from solving for `A` entry by entry.

## Workflow

1. Check that the supplied eigenvectors span the target vector's relevant space.
2. Solve the small coefficient system `v = sum_i c_i v_i`.
3. Apply the scalar eigenvalues or scalar function to those coefficients.
4. Recombine the eigenvectors.
5. Use trace/determinant or direct multiplication as a cross-check only if useful.

## When the shortcut fails

A matrix may be defective and not have a full eigenbasis. Then an arbitrary vector cannot be expanded in `n` independent eigenvectors, and ordinary diagonalization is unavailable.

You may still exploit any known invariant subspaces or eigenvectors, but a complete treatment can require generalized eigenvectors and Jordan form. In interview settings, first determine whether the problem actually needs that machinery before introducing it.

For the principal square-root construction above, symmetry and nonnegative eigenvalues are what make the orthogonal spectral formula especially clean. General matrix functions outside that setting can require more care.

## Common mistakes

- Trying to reconstruct `A` even though the target vector is already easy to express in the eigenbasis.
- Applying `lambda_i` to the coordinates in the standard basis instead of to eigenbasis coefficients.
- Assuming any collection of eigenvectors spans the whole space.
- Forgetting that `A^k` changes `lambda_i` to `lambda_i^k`.
- Treating a defective matrix as diagonalizable.
- Taking entrywise square roots of a matrix instead of applying the square-root function to its eigenvalues.
- Calling every factor `C` with `C C^T=A` the matrix square root `A^{1/2}`.
- Forgetting that a negative eigenvalue rules out the real symmetric PSD principal square root.

## Interview Checks

1. Suppose `v = 2v_1 - v_2`, with `Av_1 = 2v_1` and `Av_2 = -3v_2`. Write `Av` without reconstructing `A`.
2. How would the same calculation change for `A^5 v`?
3. Why does this technique require an eigenbasis if you want it to work for every vector?
4. What is the connection between the vector calculation and `A = X D X^{-1}`?
5. If only some eigenvectors are known, when can they still be enough to evaluate `Av`?
6. If `A=Q Lambda Q^T` is symmetric PSD, construct its principal square root and prove that squaring it recovers `A`.
7. Why is the principal PSD square root unique, while a matrix equation `M^2=A` may admit other square roots?
8. What is the difference between a symmetric matrix square root and a Cholesky/Gram factor?
