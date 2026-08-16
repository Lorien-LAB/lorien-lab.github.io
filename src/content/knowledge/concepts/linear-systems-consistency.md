---
title: Linear Systems & Consistency
description: Row reduction, pivots, free variables, rank consistency, homogeneous systems, and the geometry of unique, inconsistent, and infinite solution sets.
type: concept
domain: Mathematics & Statistics
category: Linear Algebra
status: growing
date: 2026-08-17
tags: [Linear Algebra, Linear Systems, RREF, Rank, Gaussian Elimination]
quantInterviewTopics: [linear-algebra-matrix-methods, vectors-linear-systems]
featured: false
related: [linear-independence-span-basis-rank, vector-geometry-inner-products, qr-decomposition, lu-cholesky-decomposition, singular-value-decomposition]
relatedNotes: []
---

## Core idea

A linear system is most compactly written

`Ax = b`.

The coefficient matrix `A` determines which right-hand sides can be produced, while `b` determines which particular affine slice of that structure we are asking about. The central interview question is usually not “can you run elimination?” but “what does the reduced structure tell you about consistency, uniqueness, and degrees of freedom?”

## Augmented matrix

The system `Ax=b` can be represented by the augmented matrix

`[A | b]`.

Elementary row operations correspond to replacing equations by algebraically equivalent equations, so they preserve the solution set. Gaussian elimination transforms the augmented matrix into row-echelon form; continuing to reduced row-echelon form, or **RREF**, makes pivot and free variables explicit.

The legal elementary row operations are:

- swap two rows;
- multiply a row by a nonzero scalar;
- add a multiple of one row to another.

## Pivots and free variables

A pivot identifies a constrained variable direction. A non-pivot column among the coefficient columns corresponds to a free variable.

For a system with `n` unknowns:

- `rank(A)` equals the number of pivot variables;
- `n-rank(A)` equals the number of free directions in the homogeneous system;
- the same count is `dim N(A)` by rank-nullity.

Free variables do not automatically mean the original nonhomogeneous system is consistent. Consistency must be checked first.

## The rank consistency criterion

The system

`Ax=b`

is consistent exactly when

`rank(A) = rank([A|b])`.

This is the Rouché-Capelli criterion in rank language.

Why? The vector `b` must belong to `Col(A)`. Appending `b` as a new column increases the rank exactly when `b` lies outside that column space. If the augmented rank grows, no combination of the columns of `A` can produce `b`.

## The three cases

Let `A` have `n` columns, so there are `n` unknowns.

### Unique solution

If the system is consistent and

`rank(A)=n`,

there are no free variables. The solution is unique.

For a square matrix, this is equivalent to invertibility.

### Infinitely many solutions

If the system is consistent and

`rank(A)<n`,

there is at least one free variable. Hence there are infinitely many solutions over `R`.

### No solution

If

`rank([A|b]) > rank(A)`,

the augmented system contains an incompatibility, typically visible after elimination as a row such as

`[0 0 ... 0 | c]`, with `c != 0`.

That row means `0=c`, so there is **no solution**.

## Homogeneous systems and the null space

For the homogeneous system

`Ax=0`,

the solution set is exactly the null space

`N(A) = {x : Ax=0}`.

The zero vector is always a solution. There are nonzero homogeneous solutions exactly when

`rank(A)<n`.

Rank-nullity gives

`dim N(A)=n-rank(A)`.

Thus every lost pivot creates one independent null-space direction.

## General form of a consistent solution set

Suppose `Ax=b` is consistent and `x_p` is one particular solution. If `x` is any other solution, then

`A(x-x_p)=Ax-Ax_p=b-b=0`,

so `x-x_p in N(A)`.

Therefore every solution has the form

`x = x_p + z`, with `z in N(A)`.

Equivalently, the solution set is the affine space

`x_p + N(A)`.

This cleanly separates:

- one particular point satisfying the right-hand side;
- all homogeneous directions along which we can move without changing `Ax`.

## Geometry through the column space

`Ax=b` is consistent exactly when

`b in Col(A)`.

This geometric statement is equivalent to the augmented-rank criterion. It is often the fastest way to interpret what elimination is doing: row reduction reveals algebraically whether the target vector lies in the image of the linear map.

## Why singular does not determine the answer

If a square coefficient matrix is singular, then it cannot have a unique solution for every right-hand side. But **singular does not mean “infinitely many solutions” for a specific `b`**.

Two cases remain:

- `b in Col(A)` -> the system is consistent and, because the null space is nontrivial, there are infinitely many solutions;
- `b notin Col(A)` -> the system is inconsistent and has no solution.

The augmented matrix is what distinguishes them.

## Algebraic elimination versus numerical solvers

Gaussian elimination and RREF are excellent interview tools for exact small systems, rank, pivots, and consistency. In production numerical work, structure often determines the preferred solver:

- `qr-decomposition` for stable full-rank least squares and orthogonalization;
- `lu-cholesky-decomposition` for square systems and SPD structure;
- `singular-value-decomposition` for rank deficiency, ill-conditioning, and minimum-norm solutions.

Those decompositions solve related computational problems, but the consistency and solution-set logic here remains the underlying algebra.

## Common mistakes

- Computing `det(A)=0` and immediately declaring infinitely many solutions.
- Counting free variables before checking whether the augmented system is consistent.
- Confusing `rank(A)` with `rank([A|b])`.
- Treating row operations as if they preserve the literal column space of the matrix; they preserve the solution set of the system, not the original columns themselves.
- Saying an overdetermined system must be inconsistent. It can be consistent whenever `b in Col(A)`.
- Saying an underdetermined system must have infinitely many solutions without first checking consistency.

## Interview Checks

1. What RREF row immediately certifies that a system is inconsistent?
2. State the rank criterion for consistency of `Ax=b`.
3. If a consistent system has `n` unknowns and `rank(A)=r<n`, how many free directions does its solution set have?
4. Why does `Ax=0` have a nontrivial solution exactly when `rank(A)<n`?
5. Prove that every consistent solution set has the form `x_p + N(A)`.
6. A square matrix is singular. Why is that fact alone insufficient to decide between no solution and infinitely many solutions for `Ax=b`?
7. When would you prefer QR, LU/Cholesky, or SVD instead of explicitly forming RREF in numerical work?
