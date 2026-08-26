---
title: Derivative Definition and Core Rules
description: Define the single-variable derivative from first principles, apply the core differentiation rules with their domain conditions, and recognize endpoint and continuity boundaries.
date: 2026-08-24
type: concept
domain: Mathematics & Statistics
category: Calculus
status: growing
tags: [Calculus, Derivatives, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
featured: false
related: [logarithmic-differentiation, monotonicity-convexity-critical-points-and-inflection, indeterminate-limits-and-growth-rates, related-rates-and-implicit-differentiation]
relatedNotes: []
---

## Core Idea

For a real function $f$, differentiability at an interior point $x$ means that the finite limit

\[
f'(x) = lim(h → 0) (f(x+h) - f(x))/h
\]

exists. The quotient is a local linear model: $f(x+h) = f(x) + f'(x)h + o(h)$. Every rule below is shorthand for controlling this limit, so its domain hypotheses remain part of the answer.

## Difference Quotient and Domain Boundaries

The two-sided definition requires $x+h$ to remain in the domain for small positive and negative $h$. At a left endpoint use a right derivative; at a right endpoint use a left derivative. A derivative cannot be claimed at a point excluded from the function's domain.

For example, $√x$ has right derivative at $0$ only in the extended sense $+∞$, not a finite ordinary derivative there. For $ln x$, only $x>0$ belongs to the real domain.

## Differentiability and Continuity

If $f'(x)$ exists, then

\[
f(x+h) - f(x) = h((f(x+h) - f(x))/h) → 0,
\]

so differentiability implies continuity. The converse is false: $f(x)=|x|$ is continuous at $0$, but its left and right difference quotients are $-1$ and $1$.

## Linearity, Product, Quotient, and Chain Rules

Where the displayed expressions are defined,

\[
(af+bg)' = af' + bg'; (fg)' = f'g + fg',
\]

\[
(f/g)' = (f'g - fg')/g^2; g(x) ≠ 0,
\]

and, for differentiable $f$ and $g$,

\[
(f ∘ g)'(x) = f'(g(x))g'(x).
\]

The quotient rule needs a denominator that is nonzero at the evaluation point. The chain rule needs the outer derivative at the actual inner value $g(x)$.

## Fixed and Generalized Powers

For any fixed real $a$, the general safe real domain is $x>0$, where $x^a$ means $e^(a ln x)$. On that domain the fixed-power rule is

\[
d/dx (x^a) = a x^(a - 1).
\]

Integer exponents extend beyond this safe domain. If $a=m$ is a positive integer, $x^m$ is defined for every real $x$ and the rule holds there, including at $0$. If $m=0$, the function is the constant $1$ and has derivative $0$ everywhere. If $m$ is a negative integer, the domain and the derivative rule exclude $x=0$. For a noninteger reduced rational exponent $a=p/q$ with $q>0$, denominator parity controls the extension: an odd $q$ permits negative bases, whereas an even $q$ excludes them. Zero belongs to the rational-power domain only when $p>0$, and differentiability at zero must then be checked separately; away from zero, the rule holds on each real interval in the extended domain. Arbitrary noninteger real powers therefore must not be assumed real on negative bases. When both base and exponent vary, $u(x)^(v(x))$ is a different problem; the elementary real logarithmic derivation assumes $u(x)>0$.

## Elementary Exponential, Logarithmic, and Trigonometric Rules

The core derivatives, with their real domains, are

\[
d/dx (e^x) = e^x; d/dx (ln x) = 1/x for x > 0,
\]

\[
d/dx (sin x) = cos x; d/dx (cos x) = -sin x,
\]

and

\[
d/dx (tan x) = sec^2 x; cos x ≠ 0.
\]

## Standard Limits Behind First-Principles Derivatives

The elementary limits

\[
lim(x → 0) (sin x)/x = 1; lim(x → 0) (e^x - 1)/x = 1
\]

drive the first-principles derivatives of sine and the exponential. Also,

\[
(cos h - 1)/h = -(2 sin^2(h/2))/h → 0.
\]

## Recognition Signals

- A request for a derivative “from the definition” calls for the difference quotient and standard limits.
- A nested expression signals the chain rule; a product or quotient signals its named rule plus a domain check.
- A variable base and variable exponent signals logarithmic differentiation, not the fixed-power rule.
- An endpoint or a piecewise corner signals one-sided derivatives before any symbolic manipulation.

## Common Mistakes

- Claiming differentiability merely from continuity.
- Using the quotient rule where the denominator is zero.
- Dropping the inner derivative in the chain rule.
- Treating $u(x)^(v(x))$ as if the exponent were constant.
- Ignoring the real-domain conditions of $ln x$, $tan x$, or a noninteger power.

## Interview Checks

Differentiate $x ln x$ on its real domain. The product rule gives

\[
d/dx (x ln x) = ln x + 1 for x > 0.
\]

As a definition check, explain why $|x|$ has no derivative at $0$: its one-sided difference quotients disagree.
