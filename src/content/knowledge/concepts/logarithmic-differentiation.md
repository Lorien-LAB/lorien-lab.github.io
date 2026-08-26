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

Let $I$ be an interval, let $u: I → (0, +∞)$ be differentiable, and let $v: I → ℝ$ be differentiable. For

\[
y = u(x)^(v(x)),
\]

the positive-base condition makes the real logarithm legitimate. Taking logarithms gives

\[
ln y = v ln u.
\]

Differentiate and restore $y=u^v$:

\[
y'/y = v' ln u + v(u'/u),
\]

so

\[
y' = u^v(v' ln u + v(u'/u)).
\]

## Why the Hypotheses Come First

The derivation uses $ln u(x)$ and divides by $u(x)$, so $u(x)>0$ is not cosmetic. Differentiability of $v$ is independent of differentiability of $u$; both terms in the final formula need their own hypotheses.

Zero or negative bases require a separate real-domain analysis. A negative base with a varying real exponent generally does not define a real differentiable function on an interval.

## Products and Quotients of Many Factors

Let $u\_j: I → (0, +∞)$ be differentiable for every $j=1,…,m$. Thus every individual factor satisfies $u\_j(x)>0$ on $I$. For the product

\[
y = ∏(j = 1 to m) u\_j(x),
\]

the logarithm is justified factor by factor:

\[
ln y = ∑(j = 1 to m) ln u\_j; y'/y = ∑(j = 1 to m) (u\_j'/u\_j).
\]

For the quotient

\[
q(x) = (∏(j = 1 to m) a\_j(x))/(∏(k = 1 to n) b\_k(x)),
\]

assume every numerator factor $a\_j: I → (0, +∞)$ is differentiable and every denominator factor $b\_k: I → (0, +∞)$ is differentiable. Consequently each $a\_j(x)>0$ and each $b\_k(x)>0$ on $I$. Only then do logarithms give

\[
ln q = ∑(j = 1 to m) ln a\_j - ∑(k = 1 to n) ln b\_k; q'/q = ∑(j = 1 to m) (a\_j'/a\_j) - ∑(k = 1 to n) (b\_k'/b\_k).
\]

Only denominator-factor terms enter with a minus sign. Always multiply the logarithmic derivative by the original function at the end.

## Variable Base and Variable Exponent

For $y=x^x$, the real positive domain is $x>0$. Since

\[
ln y = x ln x; y'/y = ln x + 1,
\]

we obtain

\[
d/dx (x^x) = x^x(ln x + 1) for x > 0.
\]

For $y=(ln x)^(ln x)$, the base $ln x$ must be positive, so $x>1$. Then

\[
ln y = (ln x)(ln ln x)
\]

and

\[
y'/y = (ln ln x)/x + 1/x.
\]

Therefore

\[
d/dx ((ln x)^(ln x)) = (((ln x)^(ln x))/x)(ln ln x + 1) for x > 1.
\]

## Recognition Signals

- Both a base and an exponent depend on the variable.
- A long positive product or quotient becomes simpler after logarithms.
- The expression contains powers nested with logarithms, so domain constraints must be settled before differentiation.

## Common Mistakes

- Taking $ln u$ before proving $u>0$.
- Assuming differentiability of $u$ somehow supplies differentiability of $v$.
- Forgetting to multiply the logarithmic derivative by $y=u^v$.
- Applying the result unchanged to zero or negative bases.
- Using $x>0$ for $(ln x)^(ln x)$; the positive-base requirement actually gives $x>1$.

## Interview Checks

Derive, rather than quote,

\[
d/dx (x^x) = x^x(ln x + 1) for x > 0,
\]

and

\[
d/dx ((ln x)^(ln x)) = (((ln x)^(ln x))/x)(ln ln x + 1) for x > 1.
\]

For each expression, say exactly which positivity condition made the logarithm valid.
