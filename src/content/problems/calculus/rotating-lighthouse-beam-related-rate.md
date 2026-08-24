---
problemId: limits-derivatives-005
title: Rotating Lighthouse Beam Related Rate
description: Differentiate a lighthouse beam geometry constraint and specialize the signed shore rate to one full revolution per minute.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Derivatives, Related Rates, Geometry]
tags: [Calculus, Interview]
concepts: [derivative-definition-and-core-rules]
techniques: [related-rates-and-implicit-differentiation]
prerequisites: []
relatedProblems: []
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
family: geometric-related-rates
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

A lighthouse is $a>0$ miles from a straight shore, measured along a perpendicular segment. Let $s(t)$ be the signed shore coordinate of the point illuminated by the beam, and let $\theta(t)$ be the differentiable angle from the perpendicular. Assume $\cos\theta\ne0$.

1. Derive a general formula for $ds/dt$ in terms of $a$, $\theta$, and $d\theta/dt$.
2. Specialize to one full revolution per minute and express the result both in terms of $\theta$ and in terms of $s$.

## Think Before Revealing

The right triangle gives a relation among a fixed perpendicular distance, a signed shore coordinate, and an angle. Write that relation before differentiating.

<details>
<summary>Hint 1</summary>

With the angle measured from the perpendicular, the geometric constraint is $s=a\tan\theta$. Remember that both $s$ and $\theta$ depend on time.

</details>

<details>
<summary>Hint 2</summary>

Differentiate first to get $ds/dt=a\sec^2\theta\,d\theta/dt$. One revolution per minute is $2\pi$ radians per minute, and $\sec^2\theta=1+s^2/a^2$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

The right-triangle geometry gives

\[
s=a\tan\theta,
\qquad a>0,
\qquad \cos\theta\ne0.
\]

Here $s=s(t)$ is a signed coordinate, not a speed, and $\theta=\theta(t)$. Differentiate the constraint before substituting a numerical angular rate:

\[
\frac{ds}{dt}=a\sec^2\theta\frac{d\theta}{dt}.
\]

Thus the general related-rate identity is

\[
\boxed{\frac{ds}{dt}=a\sec^2\theta\frac{d\theta}{dt}}.
\]

One full revolution per minute gives

\[
\frac{d\theta}{dt}=2\pi\ \text{radians per minute}.
\]

Substitution yields

\[
\frac{ds}{dt}=2\pi a\sec^2\theta.
\]

Finally,

\[
\sec^2\theta=1+\tan^2\theta=1+\frac{s^2}{a^2},
\]

so the two exact specialized forms are

\[
\boxed{\frac{ds}{dt}=2\pi a\sec^2\theta
=\frac{2\pi(a^2+s^2)}{a}\ \text{miles per minute}}.
\]

The sign is the direction along the chosen shore coordinate. Its magnitude is the linear speed of the illuminated point.

## Why This Matters

The problem tests modeling more than differentiation: the angular convention, signed coordinate, units, and substitution order all affect the answer.

## Common Mistakes

- Writing $s$ as though it were a speed rather than a coordinate.
- Replacing one revolution per minute by $1$ radian per minute instead of $2\pi$.
- Omitting $d\theta/dt$ when differentiating $\tan\theta(t)$.
- Substituting before differentiating.
- Dropping miles-per-minute units from the final linear rate.

## Extensions

If the beam rotates with a variable angular rate $\omega(t)$, replace $2\pi$ by $\omega(t)$. Analyze the growth of the shore speed as $\cos\theta\to0$ while noting that the tangent model is then approaching its domain boundary.

</details>
