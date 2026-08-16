---
title: Linear Independence, Span, Basis & Rank
description: Linear combinations, span, independence, bases, fundamental matrix subspaces, rank, null space, and rank-nullity for interview reasoning.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-17
tags: [Linear Algebra, Basis, Rank, Null Space, Linear Independence]
quantInterviewTopics: [linear-algebra-matrix-methods, vectors-linear-systems]
featured: false
related: [vector-geometry-inner-products, linear-systems-consistency, singular-value-decomposition, eigenvalues-eigenvectors]
relatedNotes: []
---

## Core idea

Most finite-dimensional linear-algebra questions reduce to two structural questions:

1. **What vectors can be produced by linear combinations of the available directions?**
2. **How many genuinely independent directions are there?**

Span answers the first question. Linear independence, basis, dimension, rank, and nullity answer the second.

## Linear combinations and span

Given vectors `v_1,...,v_k`, a linear combination is

`a_1 v_1 + ... + a_k v_k`.

Their span is the set of all such combinations:

`span(v_1,...,v_k) = {sum_i a_i v_i : a_i in R}`.

A spanning family may contain redundant vectors. Adding a vector already in the span does not enlarge the subspace.

For a matrix `A=[a_1 ... a_n]`, the set of all vectors `Ax` is exactly the span of its columns. That set is the **column space** `Col(A)`.

## Linear independence

Vectors `v_1,...,v_k` are linearly independent if

`a_1 v_1 + ... + a_k v_k = 0`

implies

`a_1=...=a_k=0`.

They are dependent when a nontrivial coefficient vector produces zero. Equivalently, at least one vector can be expressed as a linear combination of the others.

For a matrix `A`, the columns are linearly independent exactly when

`Ax=0`

has only the trivial solution `x=0`.

This is the first bridge from vector-space language to null-space language.

## Basis and dimension

A basis of a subspace is a set of vectors that is both:

- linearly independent;
- spanning.

Every basis of the same finite-dimensional subspace has the same number of vectors. That number is its dimension.

A basis is therefore a **minimal spanning set** and simultaneously a **maximal independent set** inside the subspace.

For `R^n`, the standard basis has `n` vectors, so `dim(R^n)=n`.

## Row space, column space, and null space

For `A in R^{m x n}`:

- `Col(A)` is a subspace of `R^m`;
- the **row space** is the span of the rows, equivalently `Col(A^T)`, a subspace of `R^n`;
- the **null space** is

`N(A) = {x in R^n : Ax=0}`.

Elementary row operations preserve the row space and the solution set of the homogeneous system, but they generally change the literal columns. Therefore, to recover a basis for the original column space from RREF, use the **pivot columns of the original matrix**, not the corresponding columns of the reduced matrix.

## Rank

The rank of `A` is the dimension of its column space:

`rank(A) = dim Col(A)`.

A fundamental theorem says row rank equals column rank, so the same number is also the dimension of the row space.

For `A in R^{m x n}`,

`rank(A) <= min(m,n)`.

In row-echelon form, rank equals the number of pivots.

### Full column rank

`A` has full column rank when

`rank(A)=n`.

Then its columns are independent and `N(A)={0}`. This requires `n<=m`.

### Full row rank

`A` has full row rank when

`rank(A)=m`.

Then the columns span all of `R^m`. This requires `m<=n`.

Full row rank and full column rank are different statements unless the matrix is square.

## Rank-nullity theorem

For `A in R^{m x n}`, the domain has dimension `n`. The rank-nullity theorem states

`rank(A) + dim N(A) = n`.

The quantity

`nullity(A) = dim N(A) = n-rank(A)`

counts the number of independent directions in the input that the linear map sends to zero.

In RREF, this is also the number of free variables in the homogeneous system.

## Pivot columns and independence

If `A` has `r` pivots, then exactly `r` columns can be selected to form a basis of `Col(A)`. The pivot positions found from elimination identify which **original** columns form one such basis.

If every column is a pivot column, the columns are independent. If at least one column is free, there is a nontrivial relation among the columns.

## Rank and system shape

Matrix shape alone does not decide consistency, but it gives useful dimension constraints.

- An overdetermined system (`m>n`) can still be consistent if `b` lies in `Col(A)`.
- A system with fewer independent equations than unknowns, if consistent, **cannot have a unique solution**: `rank(A)<n`, so rank-nullity gives a nontrivial null space and hence free directions.
- A square matrix has a unique solution for every right-hand side exactly when it has full rank.

The precise consistency classification belongs to `linear-systems-consistency`.

## Connections to other canonical topics

- **SVD:** singular values reveal rank and provide orthonormal bases for fundamental subspaces.
- **Eigenvalues:** for a square matrix, zero is an eigenvalue exactly when the null space is nontrivial.
- **QR:** full column rank corresponds to a nonsingular triangular factor in thin QR.
- **Linear systems:** rank and nullity determine the dimensions of solution sets.

## Common mistakes

- Calling a spanning set a basis without checking independence.
- Assuming `m>n` automatically makes `Ax=b` inconsistent.
- Assuming `m<n` alone determines the exact number of free variables; the correct count is `n-rank(A)`.
- Taking pivot columns from the RREF as a basis for the **original column space** instead of using the corresponding original columns.
- Confusing full row rank with full column rank.
- Saying a singular coefficient matrix means “infinitely many solutions”; it may instead give no solution for a particular right-hand side.

## Interview Checks

1. How can you tell from RREF whether the columns of a matrix are linearly independent?
2. What does a nontrivial null space imply about the columns of `A`?
3. For an `m x n` matrix of rank `r`, what is `dim N(A)`?
4. Why can an overdetermined system still be consistent?
5. Why can a consistent system with fewer independent equations than unknowns not have a unique solution?
6. Why do pivot columns of the **original** matrix, rather than the RREF columns, form a basis for the original column space?
7. What is the difference between full row rank and full column rank?
