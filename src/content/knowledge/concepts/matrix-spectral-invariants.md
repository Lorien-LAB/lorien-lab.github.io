---
title: Trace, Determinant & Spectral Invariants
description: Matrix quantities preserved by similarity and their connection to characteristic polynomials, eigenvalues, cyclic trace identities, and commutators.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-16
tags: [Linear Algebra, Determinant, Trace, Eigenvalues, Invariants]
quantInterviewTopics: [linear-algebra-matrix-methods, determinants-eigenvalues]
featured: false
related: [eigenvalues-eigenvectors, eigenbasis-decomposition]
relatedNotes: []
---

## Determinant as a structural invariant

For square matrices of compatible size,

- `det(A^T) = det(A)`;
- `det(AB) = det(A) det(B)`;
- if `A` is invertible, `det(A^{-1}) = 1 / det(A)`.

The determinant vanishes exactly when the matrix is singular. Spectrally,

`det(A) = product_i lambda_i`,

with eigenvalues counted with algebraic multiplicity over a splitting field such as `C`.

## Trace and the spectrum

The trace is the sum of diagonal entries and also the sum of eigenvalues counted with algebraic multiplicity:

`tr(A) = sum_i lambda_i`.

For a `2 x 2` matrix, this gives a fast consistency check: if the eigenvalues are `lambda_1, lambda_2`, then

`lambda_1 + lambda_2 = tr(A)` and `lambda_1 lambda_2 = det(A)`.

These are coefficients of the characteristic polynomial, not coincidences.

## Similarity invariance

If `B = S^{-1} A S`, then `A` and `B` represent the same linear map in different bases. They have the same characteristic polynomial, eigenvalues, trace, and determinant.

This explains why diagonalization exposes spectral invariants immediately: for `A = X D X^{-1}`, trace and determinant can be read from the diagonal matrix `D`.

## Cyclic trace identity

For compatible rectangular matrices `A` and `B` such that both products are square,

`tr(AB) = tr(BA)`.

For square matrices this follows directly from indices:

`tr(AB) = sum_i sum_j A_ij B_ji = sum_j sum_i B_ji A_ij = tr(BA)`.

More generally trace is invariant under cyclic rotations of a product, such as

`tr(ABC) = tr(BCA) = tr(CAB)`,

but it is **not** generally invariant under arbitrary reordering.

## Commutators

The matrix commutator is

`[A,B] = AB - BA`.

By cyclicity,

`tr([A,B]) = tr(AB) - tr(BA) = 0`.

This creates an immediate obstruction: over a field of characteristic zero, no finite-dimensional matrices can satisfy

`AB - BA = I`,

because the left side has trace zero while `tr(I) = n`.

The method is more general than this one puzzle: before solving a matrix equation entry by entry, check whether trace, determinant, rank, or another invariant already makes the target impossible.

## Characteristic-polynomial perspective

The characteristic polynomial packages the spectrum into basis-independent coefficients. Its constant term is determinant up to the conventional sign, and its next coefficient encodes minus the trace.

For square matrices `A` and `B` of the same size, `AB` and `BA` have the same characteristic polynomial. When one factor is invertible this is immediate from similarity; the identity in fact holds without invertibility as well.

## Common mistakes

- Using `tr(ABC) = tr(ACB)`: cyclic permutation is allowed, arbitrary swapping is not.
- Treating trace or determinant equality as sufficient to prove two matrices are similar.
- Forgetting algebraic multiplicity when using trace/product-of-eigenvalues identities.
- Expanding every matrix entry in a commutator problem before checking trace.
- Assuming `det(A+B) = det(A) + det(B)`; determinant is multiplicative, not additive.

## Interview Checks

1. Prove `tr(AB) = tr(BA)` directly from indices.
2. Why must every finite-dimensional commutator have trace zero?
3. Can `AB - BA = I_n` hold over the real or complex numbers? Give the shortest proof.
4. How do trace and determinant constrain the eigenvalues of a `2 x 2` matrix?
5. Which quantities are preserved under similarity, and why?
6. Is cyclicity of trace the same as full permutation invariance? Give a counterexample pattern.
