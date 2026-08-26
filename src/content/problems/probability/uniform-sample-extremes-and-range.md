---
problemId: order-statistics-extremes-001
title: Uniform Sample Extremes and Range
description: Derive the distributions and expectations of the minimum, maximum, and range of an iid Uniform sample.
date: 2026-08-23
domain: Mathematics & Statistics
category: Probability
subcategories: [Order Statistics, Extremes]
tags: [Probability, Statistics, Order Statistics, Interview]
quantInterviewTopics: [probability-statistics, order-statistics-extremes]
concepts: [order-statistics-basics, joint-extremes-and-range]
techniques: []
prerequisites: []
relatedProblems: [random-ants-last-fall-time, joint-min-max-correlation-of-uniforms]
family: uniform-sample-extremes
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Let \(U_1,\ldots,U_n\) be iid Uniform random variables on \((0,1)\). Define

\[
M_n=\max_i U_i,\qquad m_n=\min_i U_i.
\]

Find

\[
E[M_n],\qquad E[m_n],\qquad E[M_n-m_n].
\]

## Think Before Revealing

Do not start by integrating a maximum directly. First derive the distributions of the maximum and minimum.

<details>
<summary>Hint 1</summary>

For \(0\le x\le1\), the event \(M_n\le x\) means **every** observation is at most \(x\).

</details>

<details>
<summary>Hint 2</summary>

For the minimum, work with the complement \(m_n>x\). Once the two expectations are known, the range needs only linearity of expectation.

</details>

## Solution

### Step 1 — distribution of the maximum

For \(0\le x\le1\),

\[
P(M_n\le x)
=P(U_1\le x,\ldots,U_n\le x)
=x^n.
\]

Thus

\[
f_{M_n}(x)=nx^{n-1}.
\]

Therefore

\[
E[M_n]
=\int_0^1 x\,nx^{n-1}\,dx
=\frac{n}{n+1}.
\]

### Step 2 — distribution of the minimum

For \(0\le x\le1\),

\[
P(m_n>x)
=P(U_1>x,\ldots,U_n>x)
=(1-x)^n.
\]

Hence

\[
F_{m_n}(x)=1-(1-x)^n,
\qquad
f_{m_n}(x)=n(1-x)^{n-1}.
\]

Then

\[
E[m_n]=\frac{1}{n+1}.
\]

A symmetry check gives the same result: \(1-m_n\) has the same distribution as \(M_n\).

### Step 3 — expected range

Let \(R_n=M_n-m_n\). Linearity of expectation does not require \(M_n\) and \(m_n\) to be independent:

\[
E[R_n]
=E[M_n]-E[m_n]
=\frac{n-1}{n+1}.
\]

So

\[
\boxed{E[M_n]=\frac{n}{n+1}},\qquad
\boxed{E[m_n]=\frac{1}{n+1}},\qquad
\boxed{E[R_n]=\frac{n-1}{n+1}}.
\]

## Why This Matters

This is the basic order-statistics workflow: construct the extreme-value distribution first, then calculate its moment. The same idea extends far beyond Uniform samples.

## Common Mistakes

- Writing \(P(M_n\le x)=n x\) instead of \(x^n\).
- Using \(P(M_n>x)\) when the complementary event factorizes more cleanly.
- Assuming the minimum and maximum must be independent to use \(E[M_n-m_n]=E[M_n]-E[m_n]\).
- Creating separate formulas for every special case instead of recognizing the general order-statistic structure.

## Extensions

1. For \(U_i\sim U(0,a)\), scale the results to obtain \(E[M_n]=an/(n+1)\) and \(E[m_n]=a/(n+1)\).
2. More generally, \(U_{(k)}\sim Beta(k,n+1-k)\), so \(E[U_{(k)}]=k/(n+1)\).
3. The minimum and maximum are dependent; computing their correlation requires joint information and leads naturally to the related min/max correlation problem.
