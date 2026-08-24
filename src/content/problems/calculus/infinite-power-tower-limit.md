---
problemId: limits-derivatives-012
title: Infinite Power-Tower Limit
description: Find the positive tower base for value two, then prove its finite towers converge to two rather than the other fixed-point branch.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Limits, Sequences, Fixed Points]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [bounded-monotone-convergence-and-fixed-points]
techniques: []
prerequisites: []
relatedProblems: [periodic-continued-fraction-limit, nested-radical-limit]
family: recursive-sequence-limits
mathDifficulty: 3
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Find the positive base $x$ for which the infinite power tower is intended to have value $2$:

\[
x^{x^{x^{\cdot^{\cdot}}}}=2.
\]

Then define the finite towers and prove that, for your base, they really converge to $2$. Distinguish the requested base from the tower limit and address every fixed-point branch.

## Think Before Revealing

If a tower limit were $2$, the outermost relation would impose an equation on the base. That equation produces a candidate base; finite-tower convergence must still be proved independently.

<details>
<summary>Hint 1</summary>

Conditionally set the tail equal to $2$ to obtain $2=x^2$. Keep the positive root, then define $t_0=\sqrt2$ and $t_{n+1}=(\sqrt2)^{t_n}$.

</details>

<details>
<summary>Hint 2</summary>

Prove $t_n$ is increasing using the increasing map $y\mapsto(\sqrt2)^y$. Separately prove $t_n<2$ by comparing $(\sqrt2)^{t_n}$ with $(\sqrt2)^2$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Determine the base

If the tower has value $2$, removing its first base leaves the same tail value, so necessarily

\[
2=x^2.
\]

The requested base is positive, hence

\[
\boxed{x=\sqrt2}.
\]

This is only a candidate base. It is not yet a convergence proof, and the base $\sqrt2$ is not the claimed limit $2$.

### Monotonicity by induction

Define finite towers by

\[
t_0=\sqrt2,
\qquad
t_{n+1}=(\sqrt2)^{t_n}.
\]

Because $\sqrt2>1$ and $t_0>1$,

\[
t_1=(\sqrt2)^{t_0}>\sqrt2=t_0.
\]

Assume $t_n>t_{n-1}$. The function $y\mapsto(\sqrt2)^y$ is strictly increasing, so

\[
t_{n+1}=(\sqrt2)^{t_n}
>(\sqrt2)^{t_{n-1}}=t_n.
\]

Thus $(t_n)$ is increasing.

### Upper bound by induction

The base case is $t_0=\sqrt2<2$. If $t_n<2$, monotonicity of the exponential gives

\[
t_{n+1}=(\sqrt2)^{t_n}<(\sqrt2)^2=2.
\]

Therefore every finite tower satisfies $t_n<2$.

### Convergence and branch selection

The sequence is increasing and bounded above by $2$, so bounded monotone convergence gives a limit $L\le2$. Continuity now permits

\[
L=(\sqrt2)^L.
\]

Both $L=2$ and $L=4$ satisfy this fixed-point equation:

\[
(\sqrt2)^2=2,
\qquad
(\sqrt2)^4=4.
\]

To exclude any additional fixed point in the interval allowed by the sequence, define $g(y)=(\sqrt2)^y-y$. On $[0,2]$,

\[
g'(y)=(\sqrt2)^y\ln\sqrt2-1
\le2\ln\sqrt2-1
=\ln2-1<0.
\]

Thus $g$ is strictly decreasing on $[0,2]$. Since $g(2)=0$, the value $2$ is the unique fixed point in that interval. The fixed-point equation alone therefore does not choose a branch globally. The proved bound $L\le2$ rejects branch $4$, while positivity places the limit in the interval where the fixed point is unique. Hence

\[
\boxed{L=2}.
\]

The requested base is $\sqrt2$; the separately proved finite-tower limit is $2$. They must not be conflated.

## Why This Matters

Power towers make the “fixed points are candidates” warning concrete. Even a correct base equation can coexist with multiple fixed points, so the finite iterates decide the admissible branch.

## Common Mistakes

- Reporting $2$ as the base instead of $\sqrt2$.
- Assuming the candidate base automatically defines a convergent infinite tower.
- Passing to $L=(\sqrt2)^L$ before proving convergence.
- Ignoring the second fixed-point branch $4$.
- Rejecting $4$ by intuition rather than the proved upper bound.

## Extensions

For a general positive base $b$, study finite towers $t_{n+1}=b^{t_n}$ and ask which invariant intervals make a selected fixed point dynamically attainable.

</details>
