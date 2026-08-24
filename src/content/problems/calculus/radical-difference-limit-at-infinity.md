---
problemId: limits-derivatives-006
title: Radical Difference at Infinity
description: Evaluate a difference of two unbounded radical terms by exact conjugate rationalization instead of subtracting infinite limits.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Limits, Rationalization]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [indeterminate-limits-and-growth-rates]
techniques: []
prerequisites: []
relatedProblems: []
family: algebraic-limit-transformations
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
status: solved
featured: false
---

## Problem

Evaluate

\[
\lim_{x\to+\infty}\left(\sqrt{x^2+5x}-x\right).
\]

Give an exact algebraic argument; do not subtract two infinite limits.

## Think Before Revealing

The expression has cancellation between two terms of order $x$. Which multiplication removes the radical while preserving the coefficient of the linear term?

<details>
<summary>Hint 1</summary>

Multiply and divide by the conjugate $\sqrt{x^2+5x}+x$.

</details>

<details>
<summary>Hint 2</summary>

The numerator becomes $(x^2+5x)-x^2=5x$. On the positive tail divide both numerator and denominator by the positive number $x$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

We cannot subtract $+\infty-(+\infty)$: infinity is not an ordinary number, and this is an indeterminate difference. Rationalize instead:

\[
\sqrt{x^2+5x}-x
=\frac{(\sqrt{x^2+5x}-x)(\sqrt{x^2+5x}+x)}{\sqrt{x^2+5x}+x}.
\]

The numerator is exactly

\[
(x^2+5x)-x^2=5x,
\]

so

\[
\sqrt{x^2+5x}-x
=\frac{5x}{\sqrt{x^2+5x}+x}.
\]

For sufficiently large positive $x$, divide numerator and denominator by $x>0$:

\[
\sqrt{x^2+5x}-x
=\frac{5}{\sqrt{1+5/x}+1}.
\]

Therefore

\[
\boxed{\lim_{x\to+\infty}(\sqrt{x^2+5x}-x)=\frac52}.
\]

Equivalently, the exact transformation is

\[
\sqrt{x^2+5x}-x
=\frac{5x}{\sqrt{x^2+5x}+x}
=\frac{5}{\sqrt{1+5/x}+1}.
\]

## Why This Matters

Conjugate rationalization exposes the finite remainder hidden by leading-order cancellation. It is safer and shorter than applying a theorem to an expression that is not a quotient.

## Common Mistakes

- Treating infinity as a number and subtracting it from itself.
- Losing the coefficient $5$ by replacing the numerator $5x$ with $x$.
- Dividing $\sqrt{x^2+5x}$ by $x$ without noting that the limit is on the positive tail.
- Rationalizing only the numerator and forgetting the conjugate denominator.

## Extensions

For real $c$, the same positive-tail calculation gives

\[
\sqrt{x^2+cx}-x\longrightarrow\frac c2.
\]

Explain why a limit toward $-\infty$ requires separate handling of $|x|$ when extracting $x^2$ from a square root.

</details>
