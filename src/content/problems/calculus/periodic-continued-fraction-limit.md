---
problemId: limits-derivatives-008
title: Periodic Continued-Fraction Limit
description: Prove finite continued-fraction convergents converge through alternating monotone subsequences before selecting the admissible fixed point.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Limits, Sequences, Fixed Points]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [bounded-monotone-convergence-and-fixed-points]
techniques: []
prerequisites: []
relatedProblems: []
family: recursive-sequence-limits
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 4
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Define the finite continued-fraction convergents by

\[
c_0=2,
\qquad
c_{n+1}=2+\frac2{c_n}.
\]

Prove that $(c_n)$ converges and find its limit. A fixed-point equation without a convergence proof is not sufficient.

## Think Before Revealing

The update map is decreasing, so the full sequence oscillates. Look for an invariant interval and then separate the even and odd terms.

<details>
<summary>Hint 1</summary>

Show that $F(x)=2+2/x$ maps $[2,3]$ into itself. Compute $c_0<c_2$ and use the monotonicity of two applications of $F$.

</details>

<details>
<summary>Hint 2</summary>

Let the even and odd subsequence limits be $a$ and $b$. Continuity gives $b=2+2/a$ and $a=2+2/b$; subtract these equations before solving any fixed point.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let $F(x)=2+2/x$ for $x>0$.

### Invariant interval

We have

\[
c_0=2,
\qquad
c_1=F(2)=3.
\]

If $2\le x\le3$, then $2/3\le2/x\le1$, so

\[
2\le F(x)\le3.
\]

Thus $F$ maps $[2,3]$ into itself. By induction,

\[
2\le c_n\le3
\]

for every $n$.

### Alternating subsequences

The map $F$ is strictly decreasing. Directly,

\[
c_0=2<c_2=2+\frac23=\frac83.
\]

Since $F\circ F$ is increasing, applying it repeatedly preserves this inequality:

\[
c_{2n}<c_{2n+2}.
\]

Hence the even subsequence is increasing. Applying the decreasing map $F$ to $c_{2n}<c_{2n+2}$ reverses the inequality:

\[
c_{2n+1}>c_{2n+3},
\]

so the odd subsequence is decreasing. Both subsequences remain in $[2,3]$, hence both converge.

### A single limit

Write

\[
a=\lim_{n\to+\infty}c_{2n},
\qquad
b=\lim_{n\to+\infty}c_{2n+1}.
\]

Continuity of $F$ on $[2,3]$ gives

\[
b=2+\frac2a,
\qquad
a=2+\frac2b.
\]

Subtracting,

\[
(b-a)\left(1-\frac2{ab}\right)=0.
\]

Because $a,b\ge2$, we have $ab\ge4$, so $ab=2$ is impossible. Therefore $a=b$. The even and odd subsequences have the same limit, so the full sequence converges.

### Fixed point and selection

Only now let the full limit be $L$. Passing to the recurrence gives

\[
L=2+\frac2L,
\qquad
L^2-2L-2=0.
\]

The candidates are

\[
L=1\pm\sqrt3.
\]

Every $c_n$ is positive, so the negative candidate $1-\sqrt3$ is rejected. Hence

\[
\boxed{L=1+\sqrt3}.
\]

## Why This Matters

The sequence illustrates why an oscillating recurrence may converge even though it is not monotone as a whole, and why a fixed-point equation belongs at the end of the proof.

## Common Mistakes

- Claiming the continued fraction “clearly converges.”
- Solving the quadratic before proving existence of a limit.
- Proving that even and odd subsequences converge but not that their limits agree.
- Selecting $1+\sqrt3$ solely because it looks plausible, without the positivity argument.

## Extensions

For $c_{n+1}=p+q/c_n$ with positive $p,q$, identify an invariant interval and determine when the same alternating-subsequence strategy applies.

</details>
