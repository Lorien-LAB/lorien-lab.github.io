---
problemId: limits-derivatives-001
title: Differentiate a Variable Base and Exponent
description: Derive the generalized derivative for a positive variable base and variable exponent, then apply it to x raised to x and a logarithmic power.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Derivatives, Logarithmic Differentiation]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [derivative-definition-and-core-rules]
techniques: [logarithmic-differentiation]
prerequisites: []
relatedProblems: []
family: variable-base-variable-exponent
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Let $I$ be an interval. Suppose $u:I\to(0,+\infty)$ and $v:I\to\mathbb R$ are differentiable. Derive a formula for

\[
\frac{d}{dx}u(x)^{v(x)}.
\]

Then use it to differentiate $x^x$ on $x>0$, and differentiate

\[
y=(\ln x)^{\ln x}
\]

on $x>1$.

## Think Before Revealing

Neither the ordinary power rule nor the ordinary exponential rule handles a simultaneously varying base and exponent. Which transform moves the exponent down while preserving a real-valued identity?

<details>
<summary>Hint 1</summary>

Use positivity of the base to take a logarithm. Keep the hypotheses on $u$ and $v$ visible before writing $\ln y=v\ln u$.

</details>

<details>
<summary>Hint 2</summary>

After differentiating $\ln y=v\ln u$, you have $y'/y$. Multiply by the original $y=u^v$; for the last specialization, differentiate $(\ln x)(\ln\ln x)$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### General positive-base formula

Let $u:I\to(0,+\infty)$ be differentiable, and independently let $v:I\to\mathbb R$ be differentiable. Define $y=u(x)^{v(x)}>0$. Only after these hypotheses are fixed do we take logarithms:

\[
\ln y=v\ln u.
\]

Differentiate both sides:

\[
\frac{y'}y=v'\ln u+v\frac{u'}u.
\]

Since $y=u^v$,

\[
\boxed{\frac{d}{dx}u(x)^{v(x)}
=u(x)^{v(x)}\left(v'(x)\ln u(x)+v(x)\frac{u'(x)}{u(x)}\right)}.
\]

### Specialization to $x^x$

For $x>0$, set $u(x)=x$ and $v(x)=x$. Then $u'=v'=1$, hence

\[
\boxed{\frac{d}{dx}x^x=x^x(\ln x+1)},\qquad x>0.
\]

### Logarithmic-power specialization

For $y=(\ln x)^{\ln x}$, real positivity of the base requires $\ln x>0$, so $x>1$. Taking logarithms,

\[
\ln y=(\ln x)(\ln\ln x).
\]

The product and chain rules give

\[
\frac{y'}y
=\frac1x\ln\ln x+(\ln x)\frac{1}{x\ln x}
=\frac{\ln\ln x+1}{x}.
\]

Restoring $y$,

\[
\boxed{y'=\frac{(\ln x)^{\ln x}}{x}(\ln\ln x+1)},\qquad x>1.
\]

## Why This Matters

The derivation separates a reusable rule from its domain. In an interview, stating positivity and both differentiability hypotheses before taking logarithms is as important as obtaining the algebraic formula.

## Common Mistakes

- Using $v u^{v-1}u'$ when $v$ also varies.
- Taking $\ln u$ without $u>0$ in the real setting.
- Forgetting that $v$ needs its own differentiability hypothesis.
- Stopping at $y'/y$ and losing the outer factor $u^v$.
- Giving the last specialization on $x>0$ instead of the correct domain $x>1$.

## Extensions

Derive the logarithmic derivative of a positive product $y=\prod_j u_j(x)^{v_j(x)}$. Each factor contributes $v_j'\ln u_j+v_j u_j'/u_j$, after which the result is multiplied by $y$.

</details>
