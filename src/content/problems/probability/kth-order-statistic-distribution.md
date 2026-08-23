---
problemId: order-statistics-extremes-004
title: Distribution of the kth Order Statistic
description: Derive the CDF and density of the kth smallest observation in an iid continuous sample and connect Uniform order statistics to Beta distributions.
date: 2026-08-23
domain: Mathematics & Statistics
category: Probability
subcategories: [Order Statistics, Extremes]
tags: [Probability, Statistics, Order Statistics, Interview]
quantInterviewTopics: [probability-statistics, order-statistics-extremes]
concepts: [order-statistics-basics]
techniques: []
prerequisites: []
relatedProblems: [uniform-sample-extremes-and-range]
family: kth-order-statistic
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 4
estimatedMinutes: 18
status: solved
featured: false
---

## Problem

Let \(X_1,\ldots,X_n\) be iid observations from a continuous distribution with CDF \(F\) and density \(f\). Write

\[
X_{(1)}\le\cdots\le X_{(n)}.
\]

Derive the CDF and density of the kth order statistic \(X_{(k)}\).

## Think Before Revealing

Translate the event \(X_{(k)}\le x\) into a statement about **how many** of the original observations are at most \(x\).

<details>
<summary>Hint 1</summary>

For fixed \(x\), the count

\[
N_x=\#\{i:X_i\le x\}
\]

has a Binomial distribution with success probability \(F(x)\).

</details>

<details>
<summary>Hint 2</summary>

The event \(X_{(k)}\le x\) is exactly \(N_x\ge k\). Sum the Binomial probabilities, then differentiate. A cleaner density derivation can also place one observation near \(x\), \(k-1\) below it, and \(n-k\) above it.

</details>

## Solution

### Step 1 — derive the CDF

For fixed \(x\), each indicator \(1_{\{X_i\le x\}}\) is Bernoulli with probability \(F(x)\). Independence implies

\[
N_x=\sum_{i=1}^n1_{\{X_i\le x\}}
\sim Binomial(n,F(x)).
\]

Now

\[
X_{(k)}\le x
\quad\Longleftrightarrow\quad
N_x\ge k.
\]

Therefore

\[
\boxed{
P(X_{(k)}\le x)
=
\sum_{j=k}^{n}{n\choose j}F(x)^j[1-F(x)]^{n-j}
}.
\]

### Step 2 — derive the density

Differentiating the CDF and simplifying gives

\[
\boxed{
f_{X_{(k)}}(x)
=
\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}[1-F(x)]^{n-k}f(x)
}.
\]

There is also a useful local argument. For \(X_{(k)}\) to lie in a tiny interval near \(x\):

- choose the observation occupying the kth position;
- exactly \(k-1\) observations must lie below \(x\);
- exactly \(n-k\) must lie above \(x\);
- one observation contributes approximately \(f(x)dx\).

The multinomial coefficient is

\[
\frac{n!}{(k-1)!1!(n-k)!},
\]

which produces the same density.

### Step 3 — Uniform/Beta representation

If \(F\) is continuous, the probability integral transform gives \(F(X_i)\sim U(0,1)\). Since \(F\) is monotone,

\[
F(X_{(k)})
\sim Beta(k,n+1-k).
\]

In particular, if \(U_i\sim U(0,1)\),

\[
U_{(k)}\sim Beta(k,n+1-k),
\]

and hence

\[
E[U_{(k)}]=\boxed{\frac{k}{n+1}}.
\]

## Why This Matters

This is the master formula behind sample minima, maxima, medians, and many empirical quantile calculations. Deriving it from a Binomial count is more robust than memorizing a factorial expression.

## Common Mistakes

- Interpreting \(X_{(k)}\le x\) as “exactly \(k\) observations are below \(x\)” instead of **at least** \(k\).
- Forgetting the factor \(f(x)\) when differentiating from CDF scale back to the original variable.
- Reversing \(k-1\) and \(n-k\).
- Applying the continuous density formula unchanged to a discrete distribution with ties.

## Extensions

1. Setting \(k=1\) or \(k=n\) recovers the standard minimum and maximum densities.
2. For odd \(n=2m+1\), the sample median is \(X_{(m+1)}\).
3. For Uniform samples, the Beta representation immediately gives all order-statistic means \(k/(n+1)\).
