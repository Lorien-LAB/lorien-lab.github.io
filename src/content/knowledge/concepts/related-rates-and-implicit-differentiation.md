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

Write $x=x(t)$, $y=y(t)$, and $\theta=\theta(t)$ before differentiating. Constants such as a fixed distance $a$ have derivative zero. The chain rule is what creates factors such as $dx/dt$ and $d\theta/dt$.

## Differentiate the Constraint Before Substituting

First derive a symbolic rate identity, then insert the instant's values and known rate. Early substitution can erase a changing variable or hide a sign.

For example, differentiating $x(t)^2+y(t)^2=r(t)^2$ gives

\[
2x\frac{dx}{dt}+2y\frac{dy}{dt}=2r\frac{dr}{dt}.
\]

## Units, Signs, and Coordinates versus Speeds

A coordinate may be signed, while speed is nonnegative. If $s(t)$ is a signed coordinate along a shore, $ds/dt<0$ means motion in the negative coordinate direction. Angular rate has units radians per time; multiplying by a length produces linear-rate units.

## Implicit Differentiation Pattern

For a differentiable constraint $G(x(t),y(t),t)=0$,

\[
G_x\frac{dx}{dt}+G_y\frac{dy}{dt}+G_t=0.
\]

Solve for the requested rate only after differentiating all time-dependent terms.

## Lighthouse Geometry Example

Let a lighthouse lie a fixed perpendicular distance $a>0$ miles from a straight shore. Let $s(t)$ be the signed shore coordinate of the illuminated point and let $\theta(t)$ be the beam angle measured from the perpendicular. When $\cos\theta\ne0$,

\[
s=a\tan\theta.
\]

Differentiation gives the general identity

\[
\boxed{\frac{ds}{dt}=a\sec^2\theta\frac{d\theta}{dt}}.
\]

One revolution per minute means

\[
\frac{d\theta}{dt}=2\pi\ \text{radians per minute}.
\]

Since $\sec^2\theta=1+\tan^2\theta=1+s^2/a^2$,

\[
\boxed{\frac{ds}{dt}=2\pi a\sec^2\theta
=\frac{2\pi(a^2+s^2)}{a}\ \text{miles per minute}}.
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
- Dropping the chain-rule factor $d\theta/dt$.

## Interview Checks

Starting only from $s=a\tan\theta$, derive both boxed lighthouse identities and verify the final units. Then explain how the sign changes if the beam rotates in the negative angular direction.
