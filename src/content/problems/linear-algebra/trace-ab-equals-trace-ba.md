---
problemId: linear-algebra-trace-001
title: Why Does tr(AB) Equal tr(BA)?
description: Prove the cyclic trace identity directly, extend it to compatible rectangular matrices, and connect it to spectral invariants.
date: 2026-08-16
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Trace, Matrix Invariants]
tags: [Linear Algebra, Trace, Invariants, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, determinants-eigenvalues]
concepts: [matrix-spectral-invariants]
techniques: []
prerequisites: []
relatedProblems: [commutator-cannot-equal-identity]
family: matrix-invariant-proof
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 6
status: solved
featured: false
---

## Problem

Let `A` be an `m x n` matrix and `B` an `n x m` matrix over the real or complex numbers. Prove that

`tr(AB) = tr(BA)`.

Explain why this identity is often described as cyclicity of trace, and state one stronger spectral connection when `A` and `B` are square of the same size.

## Think Before Revealing

Trace only sees diagonal entries. Write a diagonal entry of `AB` as a sum, then sum once more over the diagonal index.

<details>
<summary>Hint 1</summary>

Use

`(AB)_ii = sum_j A_ij B_ji`.

Then interchange the order of two finite sums.

</details>

<details>
<summary>Hint 2</summary>

For square matrices of equal size, compare `AB` and `BA` spectrally. If one factor is invertible, the two products are similar; there is also a determinant identity that removes the invertibility assumption.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Method 1 — direct index proof

Since `AB` is `m x m`,

`tr(AB) = sum_i (AB)_ii`.

Expanding each diagonal entry,

`tr(AB) = sum_i sum_j A_ij B_ji`.

Because these are finite sums, we may reverse the order:

`sum_i sum_j A_ij B_ji = sum_j sum_i B_ji A_ij`.

But the inner sum is exactly the `j`th diagonal entry of `BA`. Therefore

`sum_j sum_i B_ji A_ij = sum_j (BA)_jj = tr(BA)`.

Hence

**`tr(AB) = tr(BA)`.**

This proof also shows that the identity does not require `A` and `B` themselves to be square. It is enough that their dimensions are compatible so that `AB` and `BA` are both square. The two products may even have different sizes.

### Method 2 — the square-matrix spectral view

Suppose now that `A` and `B` are both `n x n`.

If `A` is invertible, then

`BA = A^{-1}(AB)A`.

So `AB` and `BA` are similar and therefore have the same trace, characteristic polynomial, and eigenvalues with algebraic multiplicity.

The invertibility assumption is not actually necessary for the trace identity. A stronger determinant relation is

`det(I + tAB) = det(I + tBA)`

for every scalar `t`.

For equal-size square matrices, this implies that `AB` and `BA` have the same characteristic polynomial. For compatible rectangular matrices, they have the same nonzero eigenvalues with algebraic multiplicity, although extra zero eigenvalues may appear because the two products can have different dimensions.

The direct index proof remains the shortest route to the trace identity itself.

### What “cyclic” means

For three compatible factors,

`tr(ABC) = tr(BCA) = tr(CAB)`.

The factors may be rotated cyclically inside a trace. This does **not** mean arbitrary permutations are legal: in general `tr(ABC)` need not equal `tr(ACB)`.

## Why This Problem Matters

This is a small identity with unusually high reuse. It appears in covariance calculations, matrix derivatives, quadratic forms, likelihood algebra, commutator arguments, and proofs involving changes of basis. In an interview, the direct index proof is usually the cleanest demonstration that you understand where the identity comes from.

## Common Mistakes

- Assuming the result requires both matrices to be square of the same size.
- Writing `tr(ABC)=tr(ACB)` and confusing cyclic rotation with arbitrary reordering.
- Using similarity as the only proof and silently assuming one factor is invertible.
- Saying `AB=BA`; equality of traces is much weaker than commutativity.
- Expanding every matrix entry rather than focusing only on diagonal entries.

## Extensions

- Prove `tr(ABC)=tr(BCA)=tr(CAB)` by applying the two-factor identity to a grouped product.
- Show that `tr(S^{-1}AS)=tr(A)` for invertible `S`.
- Use the identity to prove that every commutator `AB-BA` has trace zero.
- Explore why `AB` and `BA` share the same nonzero spectrum even when `A` and `B` are rectangular.

</details>
