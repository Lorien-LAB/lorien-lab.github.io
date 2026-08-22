---
problemId: linear-algebra-decomposition-001
title: Solve Least Squares Directly with QR
description: Fit an overdetermined linear model by thin QR, verify the residual geometry, and explain why direct QR is preferable to forming normal equations.
date: 2026-08-16
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [QR Decomposition, Least Squares]
tags: [Linear Algebra, QR, Least Squares, Projection, Numerical Stability, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, matrix-decompositions]
concepts: [qr-decomposition]
techniques: []
prerequisites: []
relatedProblems: []
family: matrix-decomposition-least-squares
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Consider the overdetermined system

`X = [[1, 0], [1, 1], [1, -1]]`

and

`y = [1, 2, 1]^T`.

Find the least-squares coefficient vector

`beta_hat = argmin_beta ||y - X beta||_2`

using a **thin QR decomposition of `X`**. Do not form a matrix inverse.

Then:

1. compute the residual `r = y - X beta_hat`;
2. verify the least-squares orthogonality condition;
3. explain how this relates to the normal equations;
4. state what changes if the columns of `X` are rank deficient.

## Think Before Revealing

The two columns of `X` are already orthogonal. That should make the QR factorization almost immediate.

<details>
<summary>Hint 1</summary>

Call the columns

`c_1 = (1, 1, 1)^T`

and

`c_2 = (0, 1, -1)^T`.

Check `c_1^T c_2` before doing Gram-Schmidt mechanically.

</details>

<details>
<summary>Hint 2</summary>

Normalize the columns:

`q_1 = (1, 1, 1)^T / sqrt(3)`

and

`q_2 = (0, 1, -1)^T / sqrt(2)`.

If `X=QR`, what is `R`?

</details>

<details>
<summary>Hint 3</summary>

For full-column-rank thin QR,

`R beta_hat = Q^T y`.

This is a triangular solve, not a matrix-inverse formula.

</details>

<details>
<summary>Show Solution</summary>

The columns are orthogonal, so thin QR is obtained just by normalizing them. We then compute `Q^T y`, solve the diagonal triangular system, and check that the residual is orthogonal to both columns of `X`.

</details>

## Solution

### Step 1: build the thin QR factorization

The two columns of `X` are

`c_1 = (1, 1, 1)^T`,

`c_2 = (0, 1, -1)^T`.

Their inner product is

`c_1^T c_2 = 0 + 1 - 1 = 0`,

so they are already orthogonal.

Their norms are

`||c_1||_2 = sqrt(3)`,

`||c_2||_2 = sqrt(2)`.

Therefore

`q_1 = (1, 1, 1)^T / sqrt(3)`

and

`q_2 = (0, 1, -1)^T / sqrt(2)`.

Thus

`Q = [[1/sqrt(3), 0], [1/sqrt(3), 1/sqrt(2)], [1/sqrt(3), -1/sqrt(2)]]`

and

`R = [[sqrt(3), 0], [0, sqrt(2)]]`.

Indeed,

`X = Q R`.

Because `Q` has orthonormal columns,

`Q^T Q = I_2`.

### Step 2: reduce least squares to a triangular solve

For thin QR with full column rank, the least-squares solution satisfies

`R beta_hat = Q^T y`.

Compute the transformed right-hand side:

`Q^T y = [4/sqrt(3), 1/sqrt(2)]^T`.

The two scalar equations are therefore

`sqrt(3) beta_1 = 4/sqrt(3)`,

`sqrt(2) beta_2 = 1/sqrt(2)`.

Hence

`beta_1 = 4/3`,

`beta_2 = 1/2`,

so

`beta_hat = [4/3, 1/2]^T`.

No inverse was formed. The computational pattern is simply:

`X = Q R  ->  z = Q^T y  ->  solve R beta_hat = z`.

### Step 3: compute the fitted value and residual

The fitted vector is

`X beta_hat = [4/3, 11/6, 5/6]^T`.

Therefore the residual is

`r = y - X beta_hat`

`  = [-1/3, 1/6, 1/6]^T`.

### Step 4: verify projection geometry

A least-squares residual must be orthogonal to the column space of `X`.

Check the first column:

`c_1^T r = -1/3 + 1/6 + 1/6 = 0`.

Check the second column:

`c_2^T r = 0(-1/3) + 1(1/6) - 1(1/6) = 0`.

Thus

`X^T r = 0`.

Equivalently, `X beta_hat` is the orthogonal projection of `y` onto `col(X)`.

Because the columns of `Q` are an orthonormal basis of `col(X)`, the projection is

`y_hat = Q Q^T y`,

and our fitted vector satisfies exactly that identity.

### Step 5: connect to the normal equations

From the residual condition

`X^T(y-X beta_hat)=0`,

we obtain the normal equations

`X^T X beta_hat = X^T y`.

For this particular example,

`X^T X = [[3,0],[0,2]]`

and

`X^T y = [4,1]^T`,

which again gives

`beta_hat = [4/3,1/2]^T`.

So the normal equations are mathematically correct. The important numerical point is that they are not the best general implementation when QR is available.

For a full-column-rank matrix,

`kappa_2(X^T X) = kappa_2(X)^2`.

Explicitly forming `X^T X` can therefore worsen conditioning. Direct QR works with `X` itself and solves

`R beta_hat = Q^T y`,

avoiding both an explicit inverse and the unnecessary squaring of the condition number.

### Step 6: what if `X` is rank deficient?

If the columns of `X` are linearly dependent, the unpivoted triangular factor `R` is singular or numerically close to singular. Then a unique solve by ordinary back substitution is not justified.

Useful next tools are:

- **column-pivoted QR** to reveal numerical rank;
- **SVD** to expose the singular directions and compute a Moore-Penrose minimum-norm least-squares solution.

The correct response to a tiny diagonal entry of `R` is not to divide by it blindly.

## Why This Problem Matters

Least squares is a common place where an interview can distinguish exact algebra from numerical linear algebra.

A formula such as

`beta_hat = (X^T X)^{-1} X^T y`

may describe the exact full-rank solution, but it does not tell you how a reliable numerical implementation should be organized. QR reveals both the geometry and the algorithm:

- `Q` gives an orthonormal basis and the projection;
- `R` gives a triangular solve;
- no explicit inverse is required;
- rank deficiency has a visible structural signature.

The broader interview habit is: **factor first, then solve in coordinates adapted to the problem.**

## Common Mistakes

- Computing `(X^T X)^{-1}` just because a closed-form expression exists.
- Forgetting that thin `Q` satisfies `Q^T Q=I`, while `Q Q^T` is a projection rather than the full identity.
- Treating `R beta=Q^T y` as valid without checking full column rank.
- Computing a residual but never checking `X^T r=0`.
- Confusing the fitted vector `X beta_hat` with the coefficient vector `beta_hat`.
- Saying QR and the normal equations have different exact full-rank minimizers; the difference is numerical organization and conditioning, not the exact objective.
- Ignoring a nearly zero diagonal of `R` in a rank-deficient or nearly dependent design.

## Extensions

1. **Projection matrix:** derive `P_X = Q Q^T` directly from the thin QR factorization.
2. **Multiple right-hand sides:** explain why one QR factorization can be reused for many response vectors `y`.
3. **Weighted least squares:** transform the weighted objective before applying QR.
4. **Rank deficiency:** replace the direct triangular solve with pivoted QR and compare with the SVD pseudoinverse.
5. **Conditioning:** construct a design matrix with nearly dependent columns and compare `kappa(X)` with `kappa(X^T X)`.
6. **Regression interpretation:** identify which entries of `beta_hat` would be an intercept and slope if the two columns encoded those regressors.
