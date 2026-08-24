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
f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}
\]

exists. The quotient is a local linear model: $f(x+h)=f(x)+f'(x)h+o(h)$. Every rule below is shorthand for controlling this limit, so its domain hypotheses remain part of the answer.

## Difference Quotient and Domain Boundaries

The two-sided definition requires $x+h$ to remain in the domain for small positive and negative $h$. At a left endpoint use a right derivative; at a right endpoint use a left derivative. A derivative cannot be claimed at a point excluded from the function's domain.

For example, $\sqrt{x}$ has right derivative at $0$ only in the extended sense $+\infty$, not a finite ordinary derivative there. For $\ln x$, only $x>0$ belongs to the real domain.

## Differentiability and Continuity

If $f'(x)$ exists, then

\[
f(x+h)-f(x)=h\frac{f(x+h)-f(x)}h\longrightarrow0,
\]

so differentiability implies continuity. The converse is false: $f(x)=|x|$ is continuous at $0$, but its left and right difference quotients are $-1$ and $1$.

## Linearity, Product, Quotient, and Chain Rules

Where the displayed expressions are defined,

\[
(af+bg)'=af'+bg',\qquad
(fg)'=f'g+fg',
\]

\[
\left(\frac fg\right)'=\frac{f'g-fg'}{g^2},\qquad g(x)\ne0,
\]

and, for differentiable $f$ and $g$,

\[
(f\circ g)'(x)=f'(g(x))g'(x).
\]

The quotient rule needs a denominator that is nonzero at the evaluation point. The chain rule needs the outer derivative at the actual inner value $g(x)$.

## Fixed and Generalized Powers

For fixed real $a$, the fixed-power rule is

\[
\frac{d}{dx}x^a=ax^{a-1}
\]

on any real interval where $x^a$ is differentiable. When both base and exponent vary, $u(x)^{v(x)}$ is a different problem; the elementary real logarithmic derivation assumes $u(x)>0$.

## Elementary Exponential, Logarithmic, and Trigonometric Rules

The core derivatives, with their real domains, are

\[
\frac{d}{dx}e^x=e^x,
\qquad
\frac{d}{dx}\ln x=\frac1x,\qquad x>0,
\]

\[
\frac{d}{dx}\sin x=\cos x,
\qquad
\frac{d}{dx}\cos x=-\sin x,
\]

and

\[
\frac{d}{dx}\tan x=\sec^2x,
\qquad \cos x\ne0.
\]

## Standard Limits Behind First-Principles Derivatives

The elementary limits

\[
\lim_{x\to0}\frac{\sin x}{x}=1,
\qquad
\lim_{x\to0}\frac{e^x-1}{x}=1
\]

drive the first-principles derivatives of sine and the exponential. Also,

\[
\frac{\cos h-1}{h}
=-\frac{2\sin^2(h/2)}h\longrightarrow0.
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
- Treating $u(x)^{v(x)}$ as if the exponent were constant.
- Ignoring the real-domain conditions of $\ln x$, $\tan x$, or a noninteger power.

## Interview Checks

Differentiate $x\ln x$ on its real domain. The product rule gives

\[
\boxed{\frac{d}{dx}(x\ln x)=\ln x+1},\qquad x>0.
\]

As a definition check, explain why $|x|$ has no derivative at $0$: its one-sided difference quotients disagree.
