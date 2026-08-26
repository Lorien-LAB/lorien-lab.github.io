---
problemId: order-statistics-extremes-002
title: Correlation Between the Minimum and Maximum
description: Use joint extreme structure and a product identity to compute the correlation between the minimum and maximum of two iid Uniform variables.
date: 2026-08-23
domain: Mathematics & Statistics
category: Probability
subcategories: [Order Statistics, Extremes]
tags: [Probability, Statistics, Order Statistics, Interview]
quantInterviewTopics: [probability-statistics, order-statistics-extremes]
concepts: [order-statistics-basics, joint-extremes-and-range, expectation-variance-covariance-algebra]
techniques: []
prerequisites: []
relatedProblems: [uniform-sample-extremes-and-range]
family: joint-sample-extremes
mathDifficulty: 3
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Let \(X_1,X_2\) be independent Uniform random variables on \((0,1)\). Define

\[
Y=\min(X_1,X_2),\qquad Z=\max(X_1,X_2).
\]

Find

\[
Corr(Y,Z).
\]

## Think Before Revealing

The marginal distributions of the minimum and maximum give their means and variances, but correlation also needs a cross moment. Look for a deterministic identity involving \(YZ\).

<details>
<summary>Hint 1</summary>

For any two real numbers \(a,b\), what is \(\min(a,b)\max(a,b)\)?

</details>

<details>
<summary>Hint 2</summary>

Use the Uniform order-statistic laws to obtain \(E[Y],E[Z]\) and their variances, then use \(YZ=X_1X_2\).

</details>

## Solution

### Step 1 — marginal order-statistic distributions

For \(0\le y\le1\),

\[
P(Y>y)=(1-y)^2,
\]

so

\[
f_Y(y)=2(1-y).
\]

Similarly,

\[
P(Z\le z)=z^2,
\qquad
f_Z(z)=2z.
\]

Thus

\[
E[Y]=\frac13,
\qquad
E[Z]=\frac23.
\]

The second moments are

\[
E[Y^2]=\int_0^1 y^2 2(1-y)\,dy=\frac16,
\]

\[
E[Z^2]=\int_0^1 z^2 2z\,dz=\frac12.
\]

Therefore

\[
Var(Y)=\frac16-\frac19=\frac1{18},
\]

and

\[
Var(Z)=\frac12-\frac49=\frac1{18}.
\]

### Step 2 — cross moment without a double integral

For every pair \(x_1,x_2\),

\[
\min(x_1,x_2)\max(x_1,x_2)=x_1x_2.
\]

Hence

\[
YZ=X_1X_2.
\]

Independence gives

\[
E[YZ]
=E[X_1X_2]
=E[X_1]E[X_2]
=\frac14.
\]

So

\[
Cov(Y,Z)
=\frac14-\frac13\frac23
=\frac14-\frac29
=\frac1{36}.
\]

Finally,

\[
Corr(Y,Z)
=\frac{1/36}{\sqrt{(1/18)(1/18)}}
=\frac{1/36}{1/18}
=\boxed{\frac12}.
\]

## Why This Matters

Order statistics are not just marginal distributions. This problem tests whether you can combine marginal extreme laws with a structural identity to recover dependence efficiently.

## Common Mistakes

- Assuming \(Y\) and \(Z\) are independent.
- Trying to infer covariance from the two marginal distributions alone.
- Missing the identity \(YZ=X_1X_2\) and doing an unnecessary two-dimensional integral.
- Confusing this scalar correlation calculation with covariance-matrix PSD feasibility.

## Extensions

1. Derive the joint density of \(Y,Z\) directly; for two Uniform observations it is constant on \(0<y<z<1\).
2. For general sample size \(n\), the joint minimum/maximum density is \(n(n-1)(z-y)^{n-2}\) on \(0<y<z<1\).
3. Compare the positive correlation here with the false intuition that “a small minimum should force a large maximum.” Both extremes move with the overall location of the sample.
