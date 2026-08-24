---
problemId: limits-derivatives-011
title: Nested-Radical Limit
description: Prove a nested-radical sequence is increasing and bounded before selecting its positive fixed-point limit.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Limits, Sequences, Fixed Points]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [bounded-monotone-convergence-and-fixed-points]
techniques: []
prerequisites: []
relatedProblems: [periodic-continued-fraction-limit, infinite-power-tower-limit]
family: recursive-sequence-limits
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Let

\[
a_1=\sqrt2,
\qquad
a_{n+1}=\sqrt{2+a_n}.
\]

Prove that $(a_n)$ converges and find its limit. Do not begin by assuming the infinite nested radical has a value.

## Think Before Revealing

The fixed-point equation has two algebraic roots, but it neither proves convergence nor selects the admissible root. Establish monotonicity and a uniform upper bound first.

<details>
<summary>Hint 1</summary>

For monotonicity, verify $a_2>a_1$ and use that $x\mapsto\sqrt{2+x}$ is strictly increasing.

</details>

<details>
<summary>Hint 2</summary>

Prove $a_n<2$ by induction: if $a_n<2$, then $a_{n+1}=\sqrt{2+a_n}<\sqrt4=2$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Monotonicity by induction

The sequence starts at

\[
a_1=\sqrt2,
\qquad
a_2=\sqrt{2+\sqrt2}>\sqrt2=a_1.
\]

Assume $a_n>a_{n-1}$. Since $x\mapsto\sqrt{2+x}$ is strictly increasing,

\[
a_{n+1}=\sqrt{2+a_n}
>\sqrt{2+a_{n-1}}=a_n.
\]

By induction, $(a_n)$ is increasing.

### Upper bound by induction

The base case is $a_1=\sqrt2<2$. If $a_n<2$, then

\[
a_{n+1}=\sqrt{2+a_n}<\sqrt{2+2}=2.
\]

Thus $a_n<2$ for every $n$, so the sequence is bounded above by $2$.

### Convergence

The sequence is increasing and bounded above. By bounded monotone convergence, it converges to some real $L$ with $0<L\le2$.

### Fixed point

Only after convergence is established do we pass to the continuous recurrence:

\[
L=\sqrt{2+L}.
\]

Squaring gives

\[
L^2-L-2=0,
\qquad
(L-2)(L+1)=0.
\]

The candidates are $2$ and $-1$. Positivity rejects $-1$, so

\[
\boxed{L=2}.
\]

## Why This Matters

The proof shows the correct order for recursive limits: induction for behavior, a convergence theorem, continuity, and only then algebraic selection.

## Common Mistakes

- Writing $L=\sqrt{2+L}$ before proving that $(a_n)$ converges.
- Proving the upper bound but omitting monotonicity, or vice versa.
- Squaring without checking the sign of the candidate.
- Treating the drawn infinite radical as an already-defined number.

## Extensions

For $a_{n+1}=\sqrt{c+a_n}$ with $c>0$, seek a positive invariant interval and identify the positive root of $L^2-L-c=0$ only after convergence.

</details>
