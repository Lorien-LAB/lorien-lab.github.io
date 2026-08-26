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

The quotient forms $0/0$ and extended-real infinity-over-infinity are indeterminate: different functions with those forms can have different limits. Forms such as a nonzero finite number divided by $0^+$ are determined in sign and magnitude. Products such as $0 · (-∞)$ are not quotient forms and must first be transformed.

## Simplify Before Differentiating

Use algebraic simplification before differentiating: factor and cancel only on a punctured neighborhood, rationalize conjugate differences, use trigonometric identities, and substitute when a standard limit is hidden. For example, if $u=x^2$ and $x → 0^+$, then $u → 0^+$; substitution exposes the power-log pattern before any L'Hôpital step.

## Three Standard Limits

The reusable elementary limits are

\[
lim(x → 0) (sin x)/x = 1; lim(x → 0) (e^x - 1)/x = 1; lim(x → 0) (ln(1+x))/x = 1.
\]

## The Full L'Hopital Gate

For a one-sided or two-sided limit of $f/g$, check all of the following on an appropriate punctured neighborhood:

1. $f$ and $g$ are differentiable there;
2. $g'(x)$ is nonzero there, equivalently $g'(x) ≠ 0$;
3. $f/g$ has form $0/0$ or extended-real infinity-over-infinity;
4. the ordinary or extended-real limit of $f'(x)/g'(x)$ exists.

Only then may the quotient limit be replaced by the derivative-quotient limit. A product such as $x^2 ln x$ must be rewritten as a quotient, or handled by substitution, before L'Hôpital can be considered.

## Repeated Applications Require Renewed Checks

After one differentiation the quotient has changed. Recheck its form, differentiability, nonzero denominator derivative, and derivative-quotient limit before applying the theorem again. One valid first use does not license a second use automatically.

## Logarithm, Power, and Exponential Growth

On the positive tail, for $a>0$ and $b>0$,

\[
ln x ≪ x^a ≪ e^(bx) as x → +∞.
\]

The notation means the ratio of each earlier term to the following term tends to $0$. This hierarchy is a conclusion to prove from permitted tools, not a substitute for checking a quotient's hypotheses.

## Signed Limits at the Origin

For $a>0$,

\[
x^a ln x → 0^- as x → 0^+.
\]

The real limit is $0$, while the superscript records that the expression is negative for $0<x<1$. Substituting $x=e^(-t)$ converts the magnitude to $t e^(-at) → 0$ as $t → +∞$.

## Recognition Signals

- A radical difference at infinity suggests conjugate rationalization.
- A product involving a logarithm near zero suggests substitution or quotient conversion before L'Hôpital.
- Repeated differentiation demands a fresh gate at every stage.
- A comparison among logarithms, powers, and exponentials suggests a positive-tail ratio.

## Common Mistakes

- Calling every appearance of zero or infinity indeterminate.
- Applying L'Hôpital directly to a product or difference.
- Forgetting the punctured-neighborhood differentiability and $g' ≠ 0$ conditions.
- Reusing the first gate for a second differentiation.
- Reporting unsigned $0$ when the requested behavior is specifically approach from below.

## Interview Checks

Before evaluating $lim(x → 0^+) x^2 ln x$, rewrite it as

\[
(ln x)/(x^(-2))
\]

and state every gate condition. Explain separately why the final approach is from below. On the positive tail, justify why $e^x/x^2 → +∞$ rather than quoting the growth hierarchy without proof.
