---
title: Indeterminate Limits and Growth Rates
description: Evaluate elementary indeterminate limits with algebra, standard limits, and properly gated L'Hopital arguments while comparing logarithmic, polynomial, and exponential growth.
date: 2026-08-24
type: concept
domain: Mathematics & Statistics
category: Calculus
status: growing
tags: [Calculus, Limits, Asymptotic Growth]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
featured: false
related: [derivative-definition-and-core-rules, bounded-monotone-convergence-and-fixed-points, positive-series-convergence]
relatedNotes: []
---

## Core Idea

A limit method is valid only after the expression's form and domain are identified. Algebra, rationalization, substitution, and standard limits come before L'Hôpital's rule. The rule is a theorem with hypotheses, not permission to differentiate any numerator and denominator.

## Indeterminate Forms versus Determined Behavior

The quotient forms $0/0$ and extended-real infinity-over-infinity are indeterminate: different functions with those forms can have different limits. Forms such as a nonzero finite number divided by $0^+$ are determined in sign and magnitude. Products such as $0\cdot(-\infty)$ are not quotient forms and must first be transformed.

## Simplify Before Differentiating

Use algebraic simplification before differentiating: factor and cancel only on a punctured neighborhood, rationalize conjugate differences, use trigonometric identities, and substitute when a standard limit is hidden. For example, if $u=x^2$ and $x\to0^+$, then $u\to0^+$; substitution exposes the power-log pattern before any L'Hôpital step.

## Three Standard Limits

The reusable elementary limits are

\[
\lim_{x\to0}\frac{\sin x}{x}=1,
\qquad
\lim_{x\to0}\frac{e^x-1}{x}=1,
\qquad
\lim_{x\to0}\frac{\ln(1+x)}{x}=1.
\]

## The Full L'Hopital Gate

For a one-sided or two-sided limit of $f/g$, check all of the following on an appropriate punctured neighborhood:

1. $f$ and $g$ are differentiable there;
2. $g'(x)$ is nonzero there, equivalently $g'(x)\ne0$;
3. $f/g$ has form $0/0$ or extended-real infinity-over-infinity;
4. the ordinary or extended-real limit of $f'(x)/g'(x)$ exists.

Only then may the quotient limit be replaced by the derivative-quotient limit. A product such as $x^2\ln x$ must be rewritten as a quotient, or handled by substitution, before L'Hôpital can be considered.

## Repeated Applications Require Renewed Checks

After one differentiation the quotient has changed. Recheck its form, differentiability, nonzero denominator derivative, and derivative-quotient limit before applying the theorem again. One valid first use does not license a second use automatically.

## Logarithm, Power, and Exponential Growth

On the positive tail, for $a>0$ and $b>0$,

\[
\ln x\ll x^a\ll e^{bx},
\qquad x\to+\infty.
\]

The notation means the ratio of each earlier term to the following term tends to $0$. This hierarchy is a conclusion to prove from permitted tools, not a substitute for checking a quotient's hypotheses.

## Signed Limits at the Origin

For $a>0$,

\[
x^a\ln x\to0^-,
\qquad x\to0^+.
\]

The real limit is $0$, while the superscript records that the expression is negative for $0<x<1$. Substituting $x=e^{-t}$ converts the magnitude to $te^{-at}\to0$ as $t\to+\infty$.

## Recognition Signals

- A radical difference at infinity suggests conjugate rationalization.
- A product involving a logarithm near zero suggests substitution or quotient conversion before L'Hôpital.
- Repeated differentiation demands a fresh gate at every stage.
- A comparison among logarithms, powers, and exponentials suggests a positive-tail ratio.

## Common Mistakes

- Calling every appearance of zero or infinity indeterminate.
- Applying L'Hôpital directly to a product or difference.
- Forgetting the punctured-neighborhood differentiability and $g'\ne0$ conditions.
- Reusing the first gate for a second differentiation.
- Reporting unsigned $0$ when the requested behavior is specifically approach from below.

## Interview Checks

Before evaluating $\lim_{x\to0^+}x^2\ln x$, rewrite it as

\[
\frac{\ln x}{x^{-2}}
\]

and state every gate condition. Explain separately why the final approach is from below. On the positive tail, justify why $e^x/x^2\to+\infty$ rather than quoting the growth hierarchy without proof.
