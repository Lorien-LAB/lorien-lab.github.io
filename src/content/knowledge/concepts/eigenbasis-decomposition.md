---
title: Eigenbasis Decomposition
description: A reusable interview technique for applying a diagonalizable matrix, its powers, or matrix polynomials by expanding vectors in an eigenbasis.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-16
tags: [Linear Algebra, Eigenvalues, Eigenvectors, Problem Solving]
quantInterviewTopics: [linear-algebra-matrix-methods, determinants-eigenvalues]
featured: false
related: [eigenvalues-eigenvectors, matrix-spectral-invariants]
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

## Recognition pattern

Use this technique when a problem gives:

- several eigenpairs explicitly;
- a target vector that can be written in the supplied eigenvectors;
- `A v`, `A^k v`, or a polynomial in `A` rather than the matrix entries themselves;
- a repeated linear recurrence that becomes scalar in spectral coordinates.

The information in the eigenpairs is usually there to prevent you from solving for `A` entry by entry.

## Workflow

1. Check that the supplied eigenvectors span the target vector's relevant space.
2. Solve the small coefficient system `v = sum_i c_i v_i`.
3. Apply the scalar eigenvalues to those coefficients.
4. Recombine the eigenvectors.
5. Use trace/determinant or direct multiplication as a cross-check only if useful.

## When the shortcut fails

A matrix may be defective and not have a full eigenbasis. Then an arbitrary vector cannot be expanded in `n` independent eigenvectors, and ordinary diagonalization is unavailable.

You may still exploit any known invariant subspaces or eigenvectors, but a complete treatment can require generalized eigenvectors and Jordan form. In interview settings, first determine whether the problem actually needs that machinery before introducing it.

## Common mistakes

- Trying to reconstruct `A` even though the target vector is already easy to express in the eigenbasis.
- Applying `lambda_i` to the coordinates in the standard basis instead of to eigenbasis coefficients.
- Assuming any collection of eigenvectors spans the whole space.
- Forgetting that `A^k` changes `lambda_i` to `lambda_i^k`.
- Treating a defective matrix as diagonalizable.

## Interview Checks

1. Suppose `v = 2v_1 - v_2`, with `Av_1 = 2v_1` and `Av_2 = -3v_2`. Write `Av` without reconstructing `A`.
2. How would the same calculation change for `A^5 v`?
3. Why does this technique require an eigenbasis if you want it to work for every vector?
4. What is the connection between the vector calculation and `A = X D X^{-1}`?
5. If only some eigenvectors are known, when can they still be enough to evaluate `Av`?
