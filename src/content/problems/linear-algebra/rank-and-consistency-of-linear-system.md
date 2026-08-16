---
problemId: linear-algebra-systems-001
title: Rank and Consistency of a Parameterized Linear System
description: Classify a parameterized three-equation system into unique, inconsistent, and infinite-solution regimes using row dependence and rank.
date: 2026-08-17
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Linear Systems, Rank, Null Space]
tags: [Linear Algebra, Rank, RREF, Linear Systems, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, vectors-linear-systems]
concepts: [linear-independence-span-basis-rank, linear-systems-consistency]
techniques: []
prerequisites: []
relatedProblems: []
family: parameterized-linear-system
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Consider the system

`x + y + z = 1`

`2x + 3y + 4z = 2`

`3x + 4y + a z = b`.

Classify the solution set for all real parameters `a,b`:

- when is the solution unique?
- when are there infinitely many solutions?
- when is there no solution?

Give both a structural argument and a row-reduction argument.

## Think Before Revealing

Before computing a determinant, compare the third coefficient row with the first two. The exceptional parameter value is the one at which a row-dependence appears; then the right-hand side must satisfy the same dependence.

<details>
<summary>Hint 1</summary>

The sum of the first two coefficient rows is `(3,4,5)`. Compare this with `(3,4,a)`.

</details>

<details>
<summary>Hint 2</summary>

Subtract the first row from the second, and subtract the sum of the first two original rows from the third. A decisive augmented row is

`[0, 0, a-5 | b-3]`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Method 1 — see the row dependence first

Let the coefficient rows be

`r_1=(1,1,1)`,

`r_2=(2,3,4)`,

`r_3=(3,4,a)`.

The first two rows are independent. Their sum is

`r_1+r_2=(3,4,5)`.

Therefore

`r_3=r_1+r_2`

exactly when

`a=5`.

#### Case 1: `a != 5`

Then the third row is not in the span of the first two. All three coefficient rows are independent, so

`rank(A)=3`.

There are three unknowns, so the square coefficient matrix is full rank. Hence the system has a **unique solution for every `b`**.

#### Case 2: `a = 5`

Now the third left-hand side is exactly the sum of the first two left-hand sides. For the equations to be compatible, the third right-hand side must satisfy the same relation:

`b = 1+2 = 3`.

If `a=5` and `b=3`, the third equation is redundant. Then

`rank(A)=rank([A|b])=2<3`.

The system is consistent with one free direction, so there are **infinitely many solutions**.

If `a=5` and `b != 3`, the coefficient rows still have rank 2, but the augmented right-hand side violates the row relation. Thus

`rank([A|b])=3 > rank(A)=2`,

so the system has **no solution**.

The complete classification is therefore:

- **`a != 5`**: unique solution for every `b`;
- **`a = 5, b = 3`**: infinitely many solutions;
- **`a = 5, b != 3`**: no solution.

### Method 2 — row reduction

Start from

`[1, 1, 1 | 1]`

`[2, 3, 4 | 2]`

`[3, 4, a | b]`.

Apply

`R_2 <- R_2 - 2R_1`

and

`R_3 <- R_3 - 3R_1`:

`[1, 1, 1 | 1]`

`[0, 1, 2 | 0]`

`[0, 1, a-3 | b-3]`.

Then

`R_3 <- R_3 - R_2`,

which gives the decisive row

`[0, 0, a-5 | b-3]`.

Now the three regimes are visible immediately:

- if `a!=5`, the last coefficient is a pivot, so `rank(A)=3` and the solution is unique;
- if `a=5,b=3`, the last row becomes all zeros, so rank is 2 and the system is consistent with a free variable;
- if `a=5,b!=3`, the last row is `[0,0,0 | b-3]`, which asserts `0=b-3 != 0`, so the system is inconsistent.

### Null-space interpretation of the infinite case

When `a=5,b=3`, the coefficient matrix has

`rank(A)=2`.

There are three unknowns. By **rank-nullity**,

`dim N(A)=3-rank(A)=3-2=1`.

So once one particular solution is found, the whole solution set is a line

`x_p + N(A)`.

This explains geometrically why there are infinitely many solutions rather than merely saying “one variable is free.”

### Why determinant alone is insufficient

For this square coefficient matrix, `det(A)=0` exactly at `a=5`. That correctly detects the loss of uniqueness. But the determinant **cannot distinguish** what happens next.

At the same singular coefficient matrix:

- `b=3` gives a compatible augmented system and infinitely many solutions;
- `b!=3` gives an incompatible augmented system and no solution.

The determinant sees only the coefficient matrix. The distinction between these two outcomes depends on the right-hand side and therefore on the augmented rank.

## Why This Problem Matters

Parameterized systems are a compact way to test whether someone understands rank as structure rather than as a mechanical number. The fastest solution notices the row relation first; elimination then confirms it and exposes the augmented compatibility condition.

The question also separates three ideas that are often blurred together:

- invertibility / full coefficient rank;
- consistency of a particular right-hand side;
- dimension of the homogeneous null space.

Strong interview answers move fluently among all three.

## Common Mistakes

- Saying `det(A)=0`, therefore the system has infinitely many solutions. A singular coefficient matrix may instead produce **no solution** for an incompatible `b`.
- Finding `a=5` but forgetting that the right-hand side must satisfy the same row relation, so `b` matters.
- Counting one free variable before checking consistency.
- Performing a long symbolic inverse calculation even though the row dependence is visible by inspection.
- Confusing `rank(A)` with `rank([A|b])` in the inconsistent case.

## Extensions

- In the case `a=5,b=3`, parameterize the full solution line explicitly and identify a basis vector for `N(A)`.
- Generalize the pattern: if one coefficient row becomes a linear combination of earlier rows, the right-hand-side entry must satisfy the identical linear combination for consistency.
- Recast the condition as `b in Col(A)` and interpret inconsistency geometrically.
- Compare the exact-small-system RREF analysis here with QR, LU, and SVD choices for numerical systems.
- Ask how the classification changes if the system has more equations than unknowns or more unknowns than equations.

</details>
