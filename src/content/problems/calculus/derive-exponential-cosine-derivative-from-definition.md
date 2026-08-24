---
problemId: limits-derivatives-010
title: Derive an Exponential-of-Cosine Derivative from the Definition
description: Derive the derivative of an exponential of cosine directly from its difference quotient and standard elementary limits.
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
subcategories: [Derivatives, First Principles]
tags: [Calculus, Interview]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
concepts: [derivative-definition-and-core-rules]
techniques: []
prerequisites: []
relatedProblems: [differentiate-variable-base-and-exponent]
family: derivative-from-definition
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Let

\[
g(x)=e^{\cos x}.
\]

Derive $g'(x)$ directly from the difference quotient, using only angle addition and standard elementary limits. Do not use the chain rule as a quoted result and do not use a Taylor series.

## Think Before Revealing

Factor out $e^{\cos x}$, then create one factor governed by the standard exponential limit and a second factor governed by the first-principles derivative of cosine.

<details>
<summary>Hint 1</summary>

Define $\Delta_h=\cos(x+h)-\cos x$. Rewrite $e^{\cos(x+h)}$ as $e^{\cos x}e^{\Delta_h}$.

</details>

<details>
<summary>Hint 2</summary>

Insert $\Delta_h/\Delta_h$ in the limiting sense. Use angle addition to show $\Delta_h/h\to-\sin x$; then the standard exponential limit gives $(e^{\Delta_h}-1)/\Delta_h\to1$.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Start from the definition:

\[
\frac{g(x+h)-g(x)}h
=\frac{e^{\cos(x+h)}-e^{\cos x}}h.
\]

Set

\[
\Delta_h=\cos(x+h)-\cos x.
\]

Then $e^{\cos(x+h)}=e^{\cos x}e^{\Delta_h}$, so

\[
\frac{g(x+h)-g(x)}h
=e^{\cos x}\frac{e^{\Delta_h}-1}{h}.
\]

For $\Delta_h\ne0$, factor this exactly as

\[
\frac{g(x+h)-g(x)}h
=e^{\cos x}
\left(\frac{e^{\Delta_h}-1}{\Delta_h}\right)
\left(\frac{\Delta_h}{h}\right).
\]

If $\Delta_h=0$ for isolated nonzero $h$, the product is understood through the same limiting extension: $(e^z-1)/z$ extends continuously to value $1$ at $z=0$.

Now angle addition gives

\[
\Delta_h
=\cos x(\cos h-1)-\sin x\sin h,
\]

and hence

\[
\frac{\Delta_h}{h}
=\cos x\frac{\cos h-1}{h}
-\sin x\frac{\sin h}{h}.
\]

Using

\[
\frac{\cos h-1}{h}\to0,
\qquad
\frac{\sin h}{h}\to1,
\]

we obtain

\[
\lim_{h\to0}\frac{\Delta_h}{h}=-\sin x.
\]

Continuity of cosine gives $\Delta_h\to0$, so the standard exponential limit gives

\[
\lim_{z\to0}\frac{e^z-1}{z}=1.
\]

Multiplying the three limits,

\[
\boxed{g'(x)=-\sin x\,e^{\cos x}}.
\]

## Why This Matters

The factorization exposes the chain rule from first principles: one limit differentiates the outer exponential and the other differentiates the inner cosine.

## Common Mistakes

- Replacing the requested function by an unrelated product of an exponential and a cosine.
- Quoting the chain rule instead of deriving the difference quotient.
- Dividing by $\Delta_h$ without explaining the limiting interpretation when it is zero.
- Using a Taylor or Maclaurin expansion despite the method restriction.
- Losing the minus sign in the cosine difference quotient.

## Extensions

Repeat the same factorization for $e^{u(x)}$ whenever the first-principles derivative of $u$ is known and $u(x+h)-u(x)\to0$.

</details>
