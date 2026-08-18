---
problemId: random-variables-distributions-006
title: When Is a Product Lognormal?
description: Determine which dependence assumptions make the product of two lognormal random variables lognormal and why marginal information alone is insufficient.
date: 2026-08-18
domain: Mathematics & Statistics
category: Probability
subcategories: [Random Variables, Distributions]
tags: [Probability, Random Variables, Distributions, Interview]
quantInterviewTopics: [probability-statistics, random-variables-distributions]
concepts: [gaussian-lognormal-structure]
techniques: []
prerequisites: []
relatedProblems: []
family: lognormal-product-closure
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Suppose `X` and `Y` are positive random variables and each is marginally Lognormal.

1. If `X` and `Y` are independent, must `XY` be Lognormal?
2. Is independence necessary?
3. Is marginal Lognormality alone sufficient to guarantee that `XY` is Lognormal?
4. State the clean joint-distribution condition that makes the product Lognormal.

## Think Before Revealing

Products become sums after taking logarithms. The real question is therefore not only whether `log X` and `log Y` are individually Normal, but what can be said about their **joint law**.

<details>
<summary>Hint 1</summary>

Write

`log(XY)=log X+log Y`.

When is a sum of two Normal random variables guaranteed to be Normal?

</details>

<details>
<summary>Hint 2</summary>

Independence is a sufficient condition, but a more general sufficient condition is that `(log X,log Y)` is jointly Normal. To see why marginal information alone is insufficient, think of two marginally Normal variables whose pair is not jointly Normal.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let

`U=log X`, `V=log Y`.

Because `X` and `Y` are marginally Lognormal, `U` and `V` are each marginally Normal.

Also,

`log(XY)=U+V`.

Therefore `XY` is Lognormal exactly when `U+V` is Normal.

### 1. Independent Lognormals

If `X` and `Y` are independent, then the measurable transforms

`U=log X`, `V=log Y`

are also independent.

Independent Normal random variables are jointly Normal, so their sum is Normal:

`U+V ~ Normal`.

Hence

**the product of independent Lognormal variables is Lognormal.**

If

`U~N(mu_X,sigma_X^2)`

and

`V~N(mu_Y,sigma_Y^2)`

independently, then

`U+V ~ N(mu_X+mu_Y, sigma_X^2+sigma_Y^2)`.

Thus

`XY`

is Lognormal with those log-location and log-variance parameters.

### 2. Independence is not necessary

Suppose instead that `(U,V)` is jointly Normal with covariance `c`, possibly nonzero.

Every linear combination of a jointly Normal vector is Normal. Therefore

`U+V`

is Normal even when `U` and `V` are correlated.

Its variance is

`Var(U+V)=sigma_X^2+sigma_Y^2+2c`.

So a more general sufficient condition is:

> **If `(log X, log Y)` is jointly Normal, then `XY` is Lognormal.**

Independence is only the special case `c=0`.

### 3. Marginal Lognormality alone is insufficient

Knowing that `X` and `Y` are each marginally Lognormal tells us only that `U` and `V` are each marginally Normal. It does **not** imply that `(U,V)` is jointly Normal.

A concrete counterexample makes this clear.

Let `Z~N(0,1)` and let `S` be an independent random sign with

`P(S=1)=P(S=-1)=1/2`.

Define

`U=Z`,

`V=SZ`.

Both `U` and `V` are marginally standard Normal because multiplying a standard Normal by an independent random sign does not change its marginal distribution.

Now set

`X=exp(U)`,

`Y=exp(V)`.

Then both `X` and `Y` are marginally Lognormal.

But

`U+V=Z+SZ`.

If `S=-1`, then `U+V=0` exactly. Therefore `U+V` has an atom at zero with probability `1/2`. A nondegenerate Normal distribution cannot have a point mass.

Consequently `U+V` is not Normal, and

`XY=exp(U+V)`

has an atom at `1` with probability `1/2`; it is not Lognormal.

So **marginal Lognormality alone is not sufficient**.

### The clean assumption hierarchy

- independent Lognormals -> product Lognormal;
- jointly Normal log variables, even correlated -> product Lognormal;
- marginally Lognormal variables only -> no general conclusion about the product.

The decisive object is the **joint distribution of the log variables**.

</details>

## Why This Matters

This problem tests model-assumption discipline more than algebra. In multivariate probability and quantitative modeling, marginals do not determine dependence.

The same warning appears in portfolio risk, copulas, Gaussian-factor models, simulation, and multivariate return modeling: knowing every one-dimensional distribution does not tell you the distribution of a sum, product, or portfolio unless the joint law is specified sufficiently.

The logarithm trick is also broadly reusable: multiplicative models become additive in log space, where Gaussian closure is easy to analyze.

## Common Mistakes

- Saying “the product of two Lognormals is always Lognormal.”
- Assuming marginal Normality of `log X` and `log Y` implies joint Normality.
- Claiming independence is necessary rather than merely sufficient.
- Forgetting that correlated jointly Normal variables still have Normal linear combinations.
- Checking only the means and variances of `log X` and `log Y` without specifying dependence.
- Confusing zero covariance with independence outside a jointly Normal model.

## Extensions

1. If `(log X,log Y)` is jointly Normal with covariance `c`, derive the parameters of `XY`.
2. Generalize to the product of `n` positive variables whose log vector is multivariate Normal.
3. Show that `X/Y` is Lognormal under the same joint-normal log assumption.
4. In the counterexample above, describe the full distributional mixture of `XY`.
5. Explain why a copula or another dependence model is needed when only marginal Lognormal distributions are specified.
