---
title: Logarithmic Differentiation
description: Differentiate positive variable-base and variable-exponent functions by taking logarithms, tracking domains, and restoring the original function.
date: 2026-08-24
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
tags: [Calculus, Derivatives, Problem Solving]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
featured: false
related: [derivative-definition-and-core-rules]
relatedNotes: []
---

## Core Idea

Let $I$ be an interval, let $u:I\to(0,+\infty)$ be differentiable, and let $v:I\to\mathbb R$ be differentiable. For

\[
y=u(x)^{v(x)},
\]

the positive-base condition makes the real logarithm legitimate. Taking logarithms gives

\[
\ln y=v\ln u.
\]

Differentiate and restore $y=u^v$:

\[
\frac{y'}y=v'\ln u+v\frac{u'}u,
\]

so

\[
\boxed{y'=u^v\left(v'\ln u+v\frac{u'}{u}\right)}.
\]

## Why the Hypotheses Come First

The derivation uses $\ln u(x)$ and divides by $u(x)$, so $u(x)>0$ is not cosmetic. Differentiability of $v$ is independent of differentiability of $u$; both terms in the final formula need their own hypotheses.

Zero or negative bases require a separate real-domain analysis. A negative base with a varying real exponent generally does not define a real differentiable function on an interval.

## Products and Quotients of Many Factors

Let $u_j:I\to(0,+\infty)$ be differentiable for every $j=1,\dots,m$. Thus every individual factor satisfies $u_j(x)>0$ on $I$. For the product

\[
y=\prod_{j=1}^m u_j(x),
\]

the logarithm is justified factor by factor:

\[
\ln y=\sum_{j=1}^m\ln u_j,
\qquad
\frac{y'}y=\sum_{j=1}^m\frac{u_j'}{u_j}.
\]

For the quotient

\[
q(x)=\frac{\prod_{j=1}^m a_j(x)}{\prod_{k=1}^n b_k(x)},
\]

assume every numerator factor $a_j:I\to(0,+\infty)$ is differentiable and every denominator factor $b_k:I\to(0,+\infty)$ is differentiable. Consequently each $a_j(x)>0$ and each $b_k(x)>0$ on $I$. Only then do logarithms give

\[
\ln q=\sum_{j=1}^m\ln a_j-\sum_{k=1}^n\ln b_k,
\qquad
\frac{q'}q=\sum_{j=1}^m\frac{a_j'}{a_j}-\sum_{k=1}^n\frac{b_k'}{b_k}.
\]

Only denominator-factor terms enter with a minus sign. Always multiply the logarithmic derivative by the original function at the end.

## Variable Base and Variable Exponent

For $y=x^x$, the real positive domain is $x>0$. Since

\[
\ln y=x\ln x,
\qquad
\frac{y'}y=\ln x+1,
\]

we obtain

\[
\boxed{\frac{d}{dx}x^x=x^x(\ln x+1)},\qquad x>0.
\]

For $y=(\ln x)^{\ln x}$, the base $\ln x$ must be positive, so $x>1$. Then

\[
\ln y=(\ln x)(\ln\ln x)
\]

and

\[
\frac{y'}y=\frac1x\ln\ln x+\frac1x.
\]

Therefore

\[
\boxed{\frac{d}{dx}(\ln x)^{\ln x}
=\frac{(\ln x)^{\ln x}}{x}(\ln\ln x+1)},\qquad x>1.
\]

## Recognition Signals

- Both a base and an exponent depend on the variable.
- A long positive product or quotient becomes simpler after logarithms.
- The expression contains powers nested with logarithms, so domain constraints must be settled before differentiation.

## Common Mistakes

- Taking $\ln u$ before proving $u>0$.
- Assuming differentiability of $u$ somehow supplies differentiability of $v$.
- Forgetting to multiply the logarithmic derivative by $y=u^v$.
- Applying the result unchanged to zero or negative bases.
- Using $x>0$ for $(\ln x)^{\ln x}$; the positive-base requirement actually gives $x>1$.

## Interview Checks

Derive, rather than quote,

\[
\boxed{\frac{d}{dx}x^x=x^x(\ln x+1)},\qquad x>0,
\]

and

\[
\boxed{\frac{d}{dx}(\ln x)^{\ln x}
=\frac{(\ln x)^{\ln x}}x(\ln\ln x+1)},\qquad x>1.
\]

For each expression, say exactly which positivity condition made the logarithm valid.
