---
problemId: logic-logical-deduction-014
title: Alternating Geometric Resource Allocation
description: Derive finite and infinite shares when two participants alternately take fixed fractions of a remaining resource.
date: '2026-09-05'
domain: Mathematics & Statistics
category: Calculus
subcategories: [Infinite Series, Geometric Series]
tags: [Logical Deduction, Geometric Series, Limits, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction, calculus-differential-equations, limits-derivatives]
concepts: [positive-series-convergence, small-cases-recurrence-and-structural-simplification]
techniques: []
prerequisites: []
relatedProblems: []
family: alternating-geometric-allocation
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

A unit resource is allocated in rounds. In each round, the first participant takes a fixed fraction $a$ of what remains, then the second participant takes a fixed fraction $b$ of the new remainder, where $0<a<1$ and $0<b<1$. Find each participant's share and the unallocated remainder after $N$ rounds. Then find the limiting shares as $N\to\infty$.

## Think Before Revealing

<details>
<summary>Hint 1</summary>

Track the amount left after one complete round. The same multiplicative factor applies after every later round.

</details>

<details>
<summary>Hint 2</summary>

Write each participant's round-by-round amounts using that common factor, then sum a finite geometric series before taking a limit.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let $R_n$ be the amount remaining after $n$ complete rounds, so $R_0=1$. In a round starting with $R_{n-1}$, the first participant receives $aR_{n-1}$. The amount left is $(1-a)R_{n-1}$, so the second receives $(1-a)bR_{n-1}$. The round ends with

$$
R_n=(1-a)(1-b)R_{n-1}.
$$

Define the round multiplier by

$$
r=(1-a)(1-b).
$$

Because $0<a<1$ and $0<b<1$, both $1-a$ and $1-b$ lie strictly between zero and one. Their product therefore satisfies $0<r<1$. Repeatedly applying the recurrence gives $R_n=r^n$.

### Finite Allocation

Before rounds $1,2,\ldots,N$, the remaining amounts are $1,r,r^2,\ldots,r^{N-1}$. Thus the first participant's finite share is

$$
A_N=a(1+r+\cdots+r^{N-1})=a\frac{1-r^N}{1-r}.
$$

The second participant takes the same geometric sequence after the first participant's fraction is removed, so

$$
B_N=(1-a)b(1+r+\cdots+r^{N-1})=(1-a)b\frac{1-r^N}{1-r}.
$$

The finite remainder is

$$
R_N=r^N.
$$

There is a direct conservation check within each round:

$$
a+(1-a)b=1-r.
$$

Multiplying this identity by $1+r+\cdots+r^{N-1}$ yields

$$
A_N+B_N+R_N=1.
$$

So the two finite shares and the amount left over account for the full unit resource at every finite $N$.

### Infinite Allocation

Since $0<r<1$, $r^N\to0$ as $N\to\infty$. Taking limits of the finite formulas gives

$$
A_\infty=\frac{a}{1-r}=\frac{a}{a+b-ab},
$$

and

$$
B_\infty=\frac{(1-a)b}{1-r}=\frac{(1-a)b}{a+b-ab}.
$$

The remainder tends to zero, and the limiting shares sum to one.

### Equal-Half Case

The equal-half case gives the familiar split into two thirds and one third; that split is not universal for arbitrary fractions. If

$$
a=b=\frac{1}{2},
$$

then $r=\frac{1}{4}$ and the general formulas specialize to

$$
A_\infty=\frac{2}{3},\qquad B_\infty=\frac{1}{3}.
$$

## Why This Problem Matters

This is a compact example of turning a sequential process into a recurrence and then a geometric series. Keeping the finite formulas visible prevents a common interview mistake: taking a limit before checking what is conserved at each finite stage.

## Common Mistakes

- Treating the second participant as if they take $b$ of the original unit rather than $b$ of the amount remaining after the first allocation.
- Using $ab$ as the round multiplier instead of accounting for both unallocated fractions.
- Jumping directly to an infinite series and losing the finite remainder $r^N$.
- Assuming the equal-half specialization applies for arbitrary $a$ and $b$.

## Extensions

- Start with a resource of size $M$ and scale every finite and infinite share by $M$.
- Let the fractions vary by round and identify when a product-sum representation still converges.
- Add a third participant to each round and derive the new round multiplier and shares.

</details>
