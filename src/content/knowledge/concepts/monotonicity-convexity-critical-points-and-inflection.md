---
title: Monotonicity, Convexity, Critical Points, and Inflection
description: Use derivative sign charts and second-derivative sign changes to analyze critical points, monotonicity, convexity, extrema, and inflection.
date: 2026-08-24
type: concept
domain: Mathematics & Statistics
category: Calculus
status: growing
tags: [Calculus, Derivatives, Convexity]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
featured: false
related: [derivative-definition-and-core-rules]
relatedNotes: []
---

## Core Idea

Derivative signs describe behavior on intervals, not merely at isolated points. The first derivative controls increase and decrease; the second derivative controls local curvature where it exists. Extrema and inflection points require sign information plus domain checks.

## Critical Numbers and Domain Checks

A critical number $c$ is a point in the domain where $f'(c)=0$ or $f'(c)$ is undefined. A point excluded from the domain is not a critical number. Critical numbers are candidates, not automatic extrema.

## First-Derivative Sign Charts

Partition the domain at critical numbers and points of nondifferentiability. On each open interval, determine the sign of $f'$:

- $f'>0$ implies that $f$ is increasing;
- $f'<0$ implies that $f$ is decreasing;
- a change $+\to-$ gives a local maximum;
- a change $-\to+$ gives a local minimum;
- no sign change gives neither.

The full-interval sign chart supplies the proof. Evaluating $f'$ at one point without justifying that its sign persists on the interval does not.

## Local and Global Extrema

Local extrema compare nearby values. Global extrema compare every value in the domain. On a closed interval $[a,b]$, a continuous function attains global extrema, and the candidates are interior critical numbers together with both endpoints.

## Second-Derivative Local Tests

If $f'(c)=0$ and $f''(c)>0$, then $c$ is a strict local minimum. If $f'(c)=0$ and $f''(c)<0$, then $c$ is a strict local maximum. At a critical point, $f''(c)=0$ is inconclusive: $x^4$ has a minimum at $0$, while $x^3$ does not.

## Convexity, Concavity, and Inflection

On an interval, $f''>0$ gives strict convexity and $f''<0$ gives strict concavity. An inflection point requires an actual change of concavity. For an inflection claim, $f''(c)=0$ alone is not sufficient and is inconclusive; for example, $x^4$ has $f''(0)=0$ but no concavity change.

## Exponential Midpoint Convexity

Because $(e^x)''=e^x>0$, the exponential is strictly convex. Hence, for real $a,b$,

\[
\frac{e^a+e^b}{2}\ge e^{(a+b)/2},
\]

with equality exactly when $a=b$.

## Normal CDF Curvature Example

For $\sigma>0$, a Normal CDF has density

\[
F'(x)=\frac{1}{\sigma\sqrt{2\pi}}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
\]

and second derivative

\[
F''(x)=-\frac{x-\mu}{\sigma^3\sqrt{2\pi}}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right).
\]

Every factor except $-(x-\mu)$ is positive. Therefore $F''>0$ for $x<\mu$ and $F''<0$ for $x>\mu$: the positive-to-negative sign change proves a unique inflection at $\mu$.

## Recognition Signals

- “Increasing,” “decreasing,” or “compare” suggests a first-derivative sign chart.
- “Local maximum/minimum” requires a sign change or a valid second-derivative local test.
- “Global on a closed interval” requires endpoints as candidates.
- “Convex,” “concave,” or “inflection” requires interval curvature and, for inflection, a sign change.

## Common Mistakes

- Calling every solution of $f'=0$ an extremum.
- Forgetting points where $f'$ is undefined but $f$ is defined.
- Omitting endpoints from a closed-interval global-extrema check.
- Using $f''=0$ as proof of either an extremum or an inflection point.
- Quoting convexity without stating why it is strict when an equality condition is requested.

## Interview Checks

For $f(x)=\ln x/x$, compute

\[
f'(x)=\frac{1-\ln x}{x^2}
\]

and identify its increase/decrease intervals. For the Normal CDF above, explain why solving $F''(x)=0$ is not the proof: the sign change on both sides is.
