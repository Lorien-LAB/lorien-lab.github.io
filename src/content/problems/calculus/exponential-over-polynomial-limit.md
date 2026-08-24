---
problemId: limits-derivatives-003
title: Exponential Growth over a Polynomial
description: Evaluate exponential growth over a quadratic by checking and renewing every hypothesis for two L'Hopital steps.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Limits, Asymptotic Growth]
tags: [Calculus, Interview]
concepts: [indeterminate-limits-and-growth-rates]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [logarithm-power-limit-at-zero]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
family: deterministic-growth-rate-limits
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
\lim_{x\to+\infty}\frac{e^x}{x^2}.
\]

If you use L'Hôpital's rule more than once, verify its full hypotheses for each application.

## Think Before Revealing

The initial quotient has an infinity-over-infinity form, but that observation is only one part of the gate. What must be rechecked after differentiating once?

<details>
<summary>Hint 1</summary>

On a positive tail, verify differentiability of $e^x$ and $x^2$ and check that the denominator derivative $2x$ never vanishes.

</details>

<details>
<summary>Hint 2</summary>

After the first application the quotient is $e^x/(2x)$, still infinity-over-infinity. Renew the gate; its denominator derivative is the nonzero constant $2$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### First gate

As $x\to+\infty$, both $e^x$ and $x^2$ tend to $+\infty$, so the original quotient has extended-real infinity-over-infinity form. On the positive tail $x>0$, both functions are differentiable and the denominator derivative satisfies $2x\ne0$.

The derivative quotient is $e^x/(2x)$, and its extended-real limit exists and equals $+\infty$:

\[
\lim_{x\to+\infty}\frac{e^x}{2x}=+\infty,
\]

as the renewed valid gate below establishes. Thus every hypothesis for the first application is accounted for.

### First application

L'Hôpital's rule gives

\[
\lim_{x\to+\infty}\frac{e^x}{x^2}
=\lim_{x\to+\infty}\frac{e^x}{2x}.
\]

### Renew the gate

For the new quotient, $e^x\to+\infty$ and $2x\to+\infty$, so it again has infinity-over-infinity form. Both $e^x$ and $2x$ are differentiable on the positive tail. The new denominator derivative is

\[
2\ne0.
\]

The next derivative quotient has the existing extended-real limit

\[
\lim_{x\to+\infty}\frac{e^x}{2}=+\infty.
\]

This completes a separate, full gate for the second application.

### Second application

Applying the rule again,

\[
\lim_{x\to+\infty}\frac{e^x}{2x}
=\lim_{x\to+\infty}\frac{e^x}{2}=+\infty.
\]

Combining the two valid applications,

\[
\lim_{x\to+\infty}\frac{e^x}{x^2}
=\lim_{x\to+\infty}\frac{e^x}{2x}
=\lim_{x\to+\infty}\frac{e^x}{2}
=\boxed{+\infty}.
\]

## Why This Matters

The calculation demonstrates the exponential-over-polynomial growth hierarchy while making the theorem's renewed hypotheses explicit. It is a model for any repeated L'Hôpital argument.

## Common Mistakes

- Treating infinity-over-infinity as the entire gate.
- Forgetting to check $2x\ne0$ on the chosen positive tail.
- Applying the rule a second time without checking the new quotient.
- Writing an unsigned infinity instead of the proved positive value $+\infty$.

## Extensions

For a fixed positive integer $n$, repeat the same renewed-gate argument to show $e^x/x^n\to+\infty$ as $x\to+\infty$.

</details>
