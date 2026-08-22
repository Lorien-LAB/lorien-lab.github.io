---
problemId: linear-algebra-decomposition-002
title: Matrix Square Root vs. Cholesky Factor
description: Compute a principal matrix square root and a Cholesky factor for an SPD matrix, then explain why these are different constraints and why only the structured Cholesky factor is unique.
date: 2026-08-16
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Matrix Square Roots, Cholesky Decomposition]
tags: [Linear Algebra, Matrix Square Root, Cholesky, Positive Definite, Eigenvalues, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, matrix-decompositions]
concepts: [eigenbasis-decomposition, lu-cholesky-decomposition]
techniques: []
prerequisites: [eigenvalues-eigenvectors]
relatedProblems: []
family: matrix-square-root-factorization
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Let

`A = [[5, -3], [-3, 5]]`.

1. Find the **principal symmetric positive-definite square root** `M` satisfying

   `M^2 = A`.

2. Find a lower-triangular matrix `L` with positive diagonal entries such that

   `A = L L^T`.

3. Explain carefully why the equations

   `M^2 = A`

   and

   `A = C^T C` or `A = C C^T`

   are different factorization requirements.

4. Which objects above are unique, and which generic Gram factors are not?

## Think Before Revealing

The matrix is symmetric. Before writing four unknown entries and solving nonlinear equations, find the directions that the matrix scales independently.

<details>
<summary>Hint 1</summary>

Try the orthogonal directions `(1,1)` and `(1,-1)`. Their eigenvalues are especially simple.

</details>

<details>
<summary>Hint 2</summary>

If

`A = Q Lambda Q^T`

with positive eigenvalues, then the principal square root is

`A^{1/2} = Q Lambda^{1/2} Q^T`.

</details>

<details>
<summary>Hint 3</summary>

For the Cholesky factor, write

`L = [[a, 0], [b, c]]`

with `a>0`, `c>0`, and match the entries of `L L^T` to `A`.

</details>

<details>
<summary>Show Solution</summary>

The eigenvalues are `2` and `8`, so the principal square root follows by taking square roots of those eigenvalues. Cholesky instead matches a triangular Gram factor and gives `L=[[sqrt(5),0],[-3/sqrt(5),4/sqrt(5)]]`.

</details>

## Solution

### Part 1: diagonalize the symmetric matrix

Observe that

`A (1,1)^T = (2,2)^T = 2(1,1)^T`,

so `(1,1)` is an eigendirection with eigenvalue `2`.

Similarly,

`A (1,-1)^T = (8,-8)^T = 8(1,-1)^T`,

so `(1,-1)` is an eigendirection with eigenvalue `8`.

Hence the eigenvalues are

`2, 8`,

both positive. Therefore `A` is symmetric positive definite.

Choose the orthogonal eigenvector matrix

`Q = (1/sqrt(2)) [[1, 1], [1, -1]]`

and

`Lambda = [[2,0],[0,8]]`.

Then

`A = Q Lambda Q^T`.

### Part 2: compute the principal square root

Take the positive scalar square root of each eigenvalue:

`Lambda^{1/2} = [[sqrt(2),0],[0,2sqrt(2)]]`.

Therefore

`A^{1/2} = Q Lambda^{1/2} Q^T`.

Multiplying out gives

`M = A^{1/2} = (sqrt(2)/2) [[3, -1], [-1, 3]]`.

Now verify directly:

`M^2`

`= (1/2) [[3sqrt(2), -sqrt(2)], [-sqrt(2), 3sqrt(2)]]^2`

`= [[5,-3],[-3,5]]`

`= A`.

The spectral proof is even shorter:

`(A^{1/2})^2 = Q Lambda^{1/2} Q^T Q Lambda^{1/2} Q^T`

`= Q Lambda Q^T`

`= A`.

This is the **principal square root**. For a symmetric PSD matrix, it is the unique symmetric PSD square root; here, because `A` is SPD, the principal square root is also SPD.

That uniqueness statement is deliberately narrower than saying “the matrix equation `M^2=A` has only one solution.” Matrix equations can admit other non-principal square roots.

### Part 3: compute the lower Cholesky factor

Write

`L = [[a,0],[b,c]]`,

with `a>0`, `c>0`.

Then

`L L^T = [[a^2, ab], [ab, b^2+c^2]]`.

Match entries with

`A = [[5,-3],[-3,5]]`.

From the `(1,1)` entry,

`a^2=5`,

so the positive-diagonal convention gives

`a=sqrt(5)`.

From the off-diagonal entry,

`ab=-3`,

so

`b=-3/sqrt(5)`.

Finally,

`b^2+c^2=5`,

so

`9/5 + c^2 = 5`,

and therefore

`c^2=16/5`,

`c=4/sqrt(5)`.

Thus

`L = [[sqrt(5), 0], [-3/sqrt(5), 4/sqrt(5)]]`

and

`A = L L^T`.

Equivalently, if you prefer the upper-triangular convention, set `R=L^T`; then

`A = R^T R`.

### Part 4: why `M^2=A` is not the same as a Gram factorization

A matrix square root asks for

`M M = A`.

A Gram factor asks for something like

`C^T C = A`

or

`C C^T = A`.

The transpose changes the constraint. A Cholesky factor need not be symmetric, so its ordinary square generally is not `A`.

For example, our lower Cholesky matrix `L` satisfies

`L L^T = A`,

but there is no reason to expect

`L^2 = A`.

The principal square root `M`, by contrast, is symmetric, so

`M^2 = M M = M M^T = A`.

That extra symmetry is special to this square-root construction, not a property of every factor of `A`.

### Part 5: generic Gram factors are not unique

Suppose

`A = C^T C`.

Let `O` be any orthogonal matrix of compatible size. Then

`(O C)^T (O C)`

`= C^T O^T O C`

`= C^T C`

`= A`.

So orthogonal transformations generate a family of other valid generic Gram factors. A generic `C^T C` factor is therefore **not unique**.

Cholesky becomes unique because we impose extra structure. For an SPD matrix, once we require a triangular Cholesky factor with **positive diagonal**, that Cholesky factor is unique under the chosen lower- or upper-triangular convention.

So there are two different uniqueness principles:

- the principal symmetric PSD square root is unique among symmetric PSD square roots;
- the positive-diagonal triangular Cholesky factor is unique under its fixed triangular convention;
- a generic Gram factor without triangular restrictions is non-unique.

## Variant

Now repeat the same reasoning for

`B = [[2, -2], [-2, 5]]`.

This is not a second Problem; it is the same reasoning family with a different matrix.

### Spectral route

The characteristic polynomial is

`lambda^2 - 7lambda + 6 = (lambda-1)(lambda-6)`,

so the variant has eigenvalues

`1, 6`.

Normalized eigendirections can be chosen as

`v_1 = (2,1)^T/sqrt(5)`

for eigenvalue `1`, and

`v_6 = (1,-2)^T/sqrt(5)`

for eigenvalue `6`.

Therefore the principal square root is

`B^{1/2}`

`= (1/5) [[4+sqrt(6), 2-2sqrt(6)], [2-2sqrt(6), 1+4sqrt(6)]]`.

The construction automatically guarantees

`(B^{1/2})^2 = B`.

### Cholesky route

Using a lower factor

`L_B = [[a,0],[b,c]]`,

matching entries gives

`a=sqrt(2)`,

`b=-sqrt(2)`,

`c=sqrt(3)`.

Thus

`L_B = [[sqrt(2),0],[-sqrt(2),sqrt(3)]]`

and

`B = L_B L_B^T`.

The numbers changed, but the canonical reasoning did not:

- spectral calculus answers the square-root question;
- Cholesky answers the structured Gram-factor question.

## Why This Problem Matters

This problem tests whether you can distinguish several matrix objects that look superficially interchangeable.

The reusable structure is:

1. symmetry + PSD/SPD suggests spectral calculus;
2. a matrix function such as a principal square root acts on eigenvalues;
3. an SPD Gram factor suggests Cholesky;
4. uniqueness depends on which structural constraints are imposed.

An entrywise nonlinear solve can work for a small `2 x 2` matrix, but it hides the reason the construction generalizes. The spectral and Cholesky viewpoints scale to larger matrices and connect directly to covariance modeling and simulation.

## Common Mistakes

- Taking the square root of each matrix entry and calling that `A^{1/2}`.
- Assuming `M^2=A` and `M M^T=A` are the same equation for an arbitrary nonsymmetric `M`.
- Saying “the square root is unique” without specifying the **principal symmetric PSD square root**.
- Saying every factor `C` in `A=C^T C` is unique.
- Forgetting that orthogonal transformations preserve `C^T C`.
- Forgetting the positive-diagonal convention in Cholesky uniqueness.
- Mixing lower `A=L L^T` and upper `A=R^T R` conventions halfway through a computation.
- Using Cholesky before checking the matrix is SPD.

## Extensions

1. **PSD boundary:** what changes if one eigenvalue is zero? The principal PSD square root still exists, but ordinary positive-diagonal Cholesky becomes singular at the boundary.
2. **Indefinite matrix:** explain why a negative eigenvalue rules out a real symmetric PSD square root.
3. **Other square roots:** explore non-principal solutions of `M^2=A` and why the principal root is the canonical one for SPD covariance work.
4. **Generic Gram factors:** parameterize additional factors using orthogonal transformations.
5. **Simulation:** use a Cholesky or spectral factor to transform independent standard normals into a vector with covariance `A`.
6. **Matrix functions:** replace `sqrt(lambda)` by another scalar function `f(lambda)` and construct `f(A)` spectrally.
