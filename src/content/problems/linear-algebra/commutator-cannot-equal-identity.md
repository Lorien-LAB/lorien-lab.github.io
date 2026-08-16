---
problemId: linear-algebra-trace-002
title: Can a Matrix Commutator Equal the Identity?
description: Rule out AB−BA=I for finite-dimensional real or complex matrices by recognizing the trace as an invariant obstruction.
date: 2026-08-16
domain: Mathematics & Statistics
category: Linear Algebra
subcategories: [Trace, Matrix Invariants]
tags: [Linear Algebra, Trace, Commutator, Invariants, Interview]
quantInterviewTopics: [linear-algebra-matrix-methods, determinants-eigenvalues]
concepts: [matrix-spectral-invariants]
techniques: []
prerequisites: []
relatedProblems: [trace-ab-equals-trace-ba]
family: matrix-invariant-obstruction
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 5
status: solved
featured: false
---

## Problem

Can two finite-dimensional `n x n` real or complex matrices `A` and `B` satisfy

`AB - BA = I_n`?

Give the shortest rigorous argument you can, and explain what feature of the equation should make you look for an invariant before attempting entrywise algebra.

## Think Before Revealing

The left side is a commutator. Ask what happens to it under trace.

<details>
<summary>Hint 1</summary>

Use `tr(AB)=tr(BA)`.

</details>

<details>
<summary>Hint 2</summary>

Compare the trace of the left side with `tr(I_n)`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Method 1 — trace obstruction

Take traces of both sides. By linearity and cyclicity of trace,

`tr(AB - BA) = tr(AB) - tr(BA) = 0`.

But

`tr(I_n) = n`.

Over the real or complex numbers, the field has characteristic zero, so `n != 0` for every positive matrix dimension `n`.

Therefore the equation would force

`0 = n`,

which is impossible.

Hence **no finite-dimensional real or complex matrices satisfy `AB - BA = I_n`.**

### Method 2 — recognize the image of the commutator map

For a fixed size `n`, every commutator `[A,B]=AB-BA` lies in the vector space of trace-zero matrices because

`tr([A,B])=0`.

The identity matrix does not lie in that space over a characteristic-zero field, since its trace is `n`.

So the impossibility can be phrased geometrically: the target lies outside a necessary invariant subspace before any individual matrix entries are considered.

This perspective is useful because many interview matrix equations are deliberately constructed so that a one-line invariant rules them out.

## Why This Problem Matters

The algebra in `AB-BA=I` invites you to introduce `2n^2` unknown entries and start expanding products. That is almost exactly the wrong instinct. The interview skill is to recognize a commutator and test a cheap invariant first. Trace collapses the problem immediately.

## Common Mistakes

- Trying to solve the equation entry by entry.
- Assuming `AB=BA` merely because their traces agree.
- Forgetting that `tr(I_n)=n`, not `1`.
- Saying “a commutator is zero”; only its trace is necessarily zero.
- Extending the characteristic-zero contradiction unchanged to every field. In positive characteristic, `n` can vanish in the field, so this particular trace obstruction may disappear; that alone does not settle existence.

## Extensions

- Show that an equation `AB-BA=C` can only hold if `tr(C)=0` over a characteristic-zero field.
- Ask whether trace zero is also sufficient for a matrix to be expressible as a commutator; this leads to a deeper theorem beyond the elementary obstruction used here.
- Compare finite dimensions with infinite-dimensional operator settings, where familiar finite-dimensional trace arguments may not apply in the same way.
- Generalize the recognition strategy: before solving a structured matrix equation, test trace, determinant, rank, symmetry, and spectrum for immediate contradictions.

</details>
