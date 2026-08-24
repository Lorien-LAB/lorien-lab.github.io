---
problemId: limits-derivatives-004
title: A Logarithm-Power Limit at Zero
description: Evaluate a one-sided power-logarithm limit with a valid quotient transformation and preserve the sign of the approach to zero.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Limits, Asymptotic Growth]
tags: [Calculus, Interview]
concepts: [indeterminate-limits-and-growth-rates]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [exponential-over-polynomial-limit]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
family: deterministic-growth-rate-limits
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

Evaluate the one-sided limit

\[
\lim_{x\to0^+}x^2\ln x.
\]

State whether the expression approaches zero from above or below, and justify every hypothesis of any theorem you invoke.

## Think Before Revealing

The displayed expression is a product, so L'Hôpital's rule does not apply to it directly. Rewrite it as a quotient whose denominator diverges on the right of zero.

<details>
<summary>Hint 1</summary>

Rewrite the product as the quotient $x^2\ln x=\ln x/x^{-2}$. Determine the signs and extended-real limits of numerator and denominator as $x\to0^+$.

</details>

<details>
<summary>Hint 2</summary>

On $0<x<\delta$, differentiate numerator and denominator. The derivative quotient simplifies exactly to $-x^2/2$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Rewrite and right-neighborhood gate

First transform the product:

\[
x^2\ln x=\frac{\ln x}{x^{-2}}.
\]

As $x\to0^+$, the numerator tends to $-\infty$ and the denominator to $+\infty$, so this is an extended-real infinity-over-infinity quotient. On a punctured right neighborhood $0<x<\delta$, the functions $\ln x$ and $x^{-2}$ are differentiable. The denominator derivative is

\[
-2x^{-3}\ne0
\]

throughout that neighborhood. Finally, the derivative quotient has the ordinary limit

\[
\lim_{x\to0^+}\frac{1/x}{-2x^{-3}}=0.
\]

Thus the full one-sided gate is satisfied.

### Apply the rule

L'Hôpital's rule yields

\[
\lim_{x\to0^+}\frac{\ln x}{x^{-2}}
=\lim_{x\to0^+}\frac{1/x}{-2x^{-3}}
=\lim_{x\to0^+}-\frac{x^2}{2}=0.
\]

Equivalently, the exact derivative quotient is

\[
\frac{1/x}{-2x^{-3}}=-\frac{x^2}{2}\to0.
\]

### Recover the sign

For $0<x<1$, we have $x^2>0$ and $\ln x<0$, so the original product is negative. Therefore it approaches zero from below:

\[
\boxed{0^-}.
\]

The real limit is still the number $0$; the superscript records the one-sided sign of nearby values.

## Why This Matters

This is a compact test of form recognition, one-sided domains, theorem hypotheses, and sign preservation. Correct symbolic differentiation alone does not settle all four.

## Common Mistakes

- Applying L'Hôpital directly to the product $x^2\ln x$.
- Calling $(-\infty)/(+\infty)$ a determined value instead of an infinity-over-infinity form.
- Omitting differentiability or the condition $-2x^{-3}\ne0$ on the punctured right neighborhood.
- Reporting only unsigned $0$ when approach direction was requested.

## Extensions

For any $a>0$, the same quotient gate or the substitution $x=e^{-t}$ proves $x^a\ln x\to0^-$ as $x\to0^+$.

</details>
