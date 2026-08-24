---
problemId: limits-derivatives-007
title: Exponential Midpoint Convexity
description: Prove the exponential midpoint inequality by strict convexity and identify the equality case exactly.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Derivatives, Convexity, Inequalities]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [monotonicity-convexity-critical-points-and-inflection]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [compare-e-pi-power-expressions]
family: exponential-inequalities
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

For real numbers $a$ and $b$, prove

\[
\frac{e^a+e^b}{2}\ge e^{(a+b)/2},
\]

and determine exactly when equality holds.

## Think Before Revealing

The right side is the exponential evaluated at the midpoint of $a$ and $b$. Which curvature property compares a function at a midpoint with the midpoint of its values?

<details>
<summary>Hint 1</summary>

Use $f(x)=e^x$ and compute its second derivative on all of $\mathbb R$.

</details>

<details>
<summary>Hint 2</summary>

Strict convexity gives the midpoint inequality $f((a+b)/2)\le(f(a)+f(b))/2$. Its equality clause is strict unless the two input points coincide.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let $f(x)=e^x$. For every real $x$,

\[
f''(x)=e^x>0,
\]

so $f$ is strictly convex on $\mathbb R$. Applying midpoint convexity,

\[
f\left(\frac{a+b}{2}\right)
\le\frac{f(a)+f(b)}2.
\]

Substitution gives

\[
\boxed{\frac{e^a+e^b}{2}\ge e^{(a+b)/2}}.
\]

Because the convexity is strict, equality holds exactly when the two midpoint inputs agree, namely

\[
\boxed{a=b}.
\]

As a separate algebraic check, set $A=e^{a/2}$ and $B=e^{b/2}$. Then $(A-B)^2\ge0$ gives $e^a+e^b\ge2e^{(a+b)/2}$, with equality exactly when $A=B$, equivalently $a=b$.

## Why This Matters

Convexity converts a derivative sign into a global inequality and supplies the equality case automatically. The proof generalizes from midpoints to arbitrary weighted averages.

## Common Mistakes

- Saying only that the exponential is convex without proving strict convexity.
- Omitting the equality condition.
- Claiming $f''=0$ is enough to decide convexity or an inflection; here the decisive fact is $f''>0$ everywhere.
- Using AM-GM without noting that the substituted quantities are positive.

## Extensions

For $0\le\lambda\le1$, strict convexity gives

\[
e^{\lambda a+(1-\lambda)b}
\le\lambda e^a+(1-\lambda)e^b,
\]

with equality for interior $\lambda$ exactly when $a=b$.

</details>
