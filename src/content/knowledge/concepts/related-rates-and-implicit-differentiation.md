---
title: Related Rates and Implicit Differentiation
description: Differentiate implicit time-dependent constraints, preserve units and signs, and solve elementary geometric related-rate problems.
date: 2026-08-24
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
tags: [Calculus, Derivatives, Related Rates]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
featured: false
related: [derivative-definition-and-core-rules]
relatedNotes: []
---

## Core Idea

In a related-rates problem, every changing quantity is a function of time. Geometry or physics supplies a constraint among those functions; implicit differentiation turns that constraint into a relation among their rates.

## Make Every Changing Quantity a Function of Time

Write $x=x(t)$, $y=y(t)$, and $θ=θ(t)$ before differentiating. Constants such as a fixed distance $a$ have derivative zero. The chain rule is what creates factors such as $dx/dt$ and $dθ/dt$.

## Differentiate the Constraint Before Substituting

First derive a symbolic rate identity, then insert the instant's values and known rate. Early substitution can erase a changing variable or hide a sign.

For example, differentiating $x(t)^2+y(t)^2=r(t)^2$ gives

\[
2x(dx/dt) + 2y(dy/dt) = 2r(dr/dt).
\]

## Units, Signs, and Coordinates versus Speeds

A coordinate may be signed, while speed is nonnegative. If $s(t)$ is a signed coordinate along a shore, $ds/dt<0$ means motion in the negative coordinate direction. Angular rate has units radians per time; multiplying by a length produces linear-rate units.

## Implicit Differentiation Pattern

For a differentiable constraint $G(x(t),y(t),t)=0$,

\[
G\_x(dx/dt) + G\_y(dy/dt) + G\_t = 0.
\]

Solve for the requested rate only after differentiating all time-dependent terms.

## Lighthouse Geometry Example

Let a lighthouse lie a fixed perpendicular distance $a>0$ miles from a straight shore. Let $s(t)$ be the signed shore coordinate of the illuminated point and let $θ(t)$ be the beam angle measured from the perpendicular. When $cos θ ≠ 0$,

\[
s = a tan θ.
\]

Differentiation gives the general identity

\[
ds/dt = a sec^2 θ (dθ/dt).
\]

One revolution per minute means

\[
dθ/dt = 2π radians per minute.
\]

Since $sec^2 θ = 1 + tan^2 θ = 1 + s^2/a^2$,

\[
ds/dt = 2πa sec^2 θ = 2π(a^2+s^2)/a miles per minute.
\]

## Recognition Signals

- Several quantities change with time but are tied by one geometric constraint.
- The requested object is a rate at an instant rather than a static length.
- Angles, signs, and physical units matter to interpretation.
- A value is supplied “at the moment when,” indicating substitution after differentiation.

## Common Mistakes

- Treating a changing length as a constant during differentiation.
- Substituting the instant's values before differentiating.
- Calling the coordinate $s$ a speed.
- Confusing one revolution per minute with one radian per minute.
- Dropping the chain-rule factor $dθ/dt$.

## Interview Checks

Starting only from $s=a tan θ$, derive both displayed lighthouse identities and verify the final units. Then explain how the sign changes if the beam rotates in the negative angular direction.
