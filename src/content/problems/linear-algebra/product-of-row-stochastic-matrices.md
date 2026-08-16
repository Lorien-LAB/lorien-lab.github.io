---
problemId: linear-algebra-stochastic-001
title: Product of Row-Stochastic Matrices
description: Prove closure of row-stochastic matrices under multiplication by combining the all-ones vector invariant with entrywise nonnegativity.
date: 2026-08-17
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Vectors, Matrix Invariants]
tags: [Linear Algebra, Stochastic Matrix, Matrix Product, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, vectors-linear-systems]
concepts: []
techniques: []
prerequisites: []
relatedProblems: []
family: matrix-invariant-closure
mathDifficulty: 1
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
status: solved
featured: false
---

## Problem

A square matrix is **row-stochastic** if every entry is nonnegative and every row sums to 1.

Let `A` and `B` be row-stochastic matrices of the same size. Prove that their product `AB` is also row-stochastic.

Try to give a matrix-level proof rather than checking row sums one at a time.

## Think Before Revealing

The row-sum condition has a compact matrix-vector representation. Ask what happens when a matrix whose rows sum to 1 acts on the all-ones column vector.

<details>
<summary>Hint 1</summary>

Let `1` denote the all-ones column vector. What equation is equivalent to “every row of `A` sums to 1”?

</details>

<details>
<summary>Hint 2</summary>

You need to preserve **two** properties: row sums and nonnegative entries. The all-ones vector handles only the first one.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let `1` be the all-ones column vector. Because every row of `A` sums to 1,

`A 1 = 1`.

Likewise,

`B 1 = 1`.

Therefore

`(AB) 1 = A (B 1) = A 1 = 1`.

So every row of `AB` sums to 1.

That is not quite enough. We must also show the entries of `AB` are nonnegative. For every `i,j`,

`(AB)_{ij} = sum_k A_{ik} B_{kj}`.

Every factor `A_{ik}` and `B_{kj}` is nonnegative, so each summand is nonnegative. Hence `(AB)_{ij}` is a **sum of nonnegative products**, and therefore

`(AB)_{ij} >= 0`.

Thus `AB` has nonnegative entries and each row sums to 1. Therefore **`AB` is row-stochastic**.

## Why This Problem Matters

The arithmetic is elementary; the interview insight is the representation

`M 1 = 1`.

It compresses `n` separate row-sum equations into one invariant statement and makes closure under multiplication immediate through associativity.

The second half is equally important: `M1=1` alone does not imply row-stochasticity because a matrix can have negative entries whose row sums still equal 1. Good solutions keep the algebraic invariant and the order constraint separate.

This pattern appears whenever a matrix preserves a distinguished vector or subspace. Row-stochastic transition matrices preserve the all-ones vector on the right, while related column-stochastic conventions place the invariant on the other side.

## Common Mistakes

- Proving only `(AB)1=1` and forgetting that row-stochastic matrices must also have nonnegative entries.
- Confusing row-stochastic with column-stochastic conventions.
- Trying to expand every row sum first and missing the shorter invariant proof.
- Claiming nonnegative entries are preserved because matrix multiplication is “positive” without actually observing that each product entry is a sum of nonnegative products.
- Assuming the matrices must be invertible. Row-stochastic matrices can be singular.

## Extensions

- By induction, any finite product of row-stochastic matrices is row-stochastic.
- In particular, every power `A^k` of a row-stochastic matrix is row-stochastic for `k>=1`.
- If `p` is a row probability vector and `A` is row-stochastic, then `pA` is again a probability vector; this is the basic transition mechanism in finite-state Markov models.
- Contrast the invariant `A1=1` with a column-stochastic matrix, for which the all-ones **row** vector is preserved on the left.
- Ask which additional assumptions make a stochastic matrix doubly stochastic and what vector is then preserved on both sides.

</details>
