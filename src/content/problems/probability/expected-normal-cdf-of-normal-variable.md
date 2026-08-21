---
problemId: expectation-variance-covariance-008
title: Expected Normal CDF of a Normal Variable
description: Convert an expectation of the standard Normal CDF into a probability involving an independent Gaussian variable and apply the tower property.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [conditional-expectation-tower-property, gaussian-lognormal-structure, random-variable-transformations-convolution]
techniques: [conditioning]
prerequisites: []
relatedProblems: [normal-mgf-and-moments]
family: tower-property-gaussian-expectation
mathDifficulty: 3
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Let

$$
X\sim N(\mu,\sigma^2),
$$

and let $\Phi$ denote the standard Normal CDF:

$$
\Phi(x)=P(Z\le x),\qquad Z\sim N(0,1).
$$

Find

$$
E[\Phi(X)].
$$

## Think Before Revealing

Do not start by integrating $\Phi(x)$ against another Gaussian density unless you have to. A CDF value is already a probability. Introduce an independent standard Normal variable and reinterpret $\Phi(X)$ conditionally.

<details>
<summary>Hint 1</summary>

Take $Z\sim N(0,1)$ independent of $X$. Conditional on $X$,

$$
\Phi(X)=P(Z\le X\mid X).
$$

</details>

<details>
<summary>Hint 2</summary>

Use the tower property to convert the expectation to $P(Z\le X)$, then study the Normal difference $Z-X$.

</details>

## Solution

Let $Z\sim N(0,1)$ be independent of $X$.

Conditional on $X$, the value $X$ is fixed and

$$
P(Z\le X\mid X)=\Phi(X).
$$

Therefore, by the tower property,

$$
E[\Phi(X)]
=E\left[P(Z\le X\mid X)\right]
=P(Z\le X).
$$

Now rewrite the event:

$$
P(Z\le X)=P(Z-X\le0).
$$

Because $Z$ and $X$ are independent Normal variables,

$$
Z-X\sim N(-\mu,\,1+\sigma^2).
$$

Standardizing,

$$
P(Z-X\le0)
=\Phi\left(\frac{0-(-\mu)}{\sqrt{1+\sigma^2}}\right).
$$

Hence

$$
\boxed{E[\Phi(X)]
=\Phi\left(\frac{\mu}{\sqrt{1+\sigma^2}}\right)}.
$$

In plain notation: **E[Phi(X)] = Phi(mu/sqrt(1+sigma^2))**.

### Sanity checks

If $\mu=0$, symmetry gives

$$
E[\Phi(X)]=\Phi(0)=\frac12.
$$

So the result is **1/2** for every centered Normal $X$, regardless of $\sigma^2$.

If $\sigma\to0$, then $X$ degenerates toward the constant $\mu$, and the formula becomes

$$
E[\Phi(X)]\to\Phi(\mu),
$$

which is exactly what continuity suggests.

### Standard-Normal special case and PIT

If $X\sim N(0,1)$ specifically, the probability integral transform (PIT) gives

$$
\Phi(X)\sim U(0,1).
$$

Therefore

$$
E[\Phi(X)]=\frac12.
$$

The PIT is an elegant special-case explanation, but it does not by itself produce the general $(\mu,\sigma^2)$ formula above.

## Why This Matters

The key interview move is to recognize a CDF as a conditional probability. That turns an awkward expectation of a nonlinear function into an ordinary event probability.

This pattern is broader than the Normal distribution:

> If $F_Y$ is a CDF and $Y$ is independent of $X$, then $E[F_Y(X)]$ can often be read as $P(Y\le X)$.

The Gaussian case becomes especially clean because a difference of independent Normal variables is Normal.

## Common Mistakes

- Trying to integrate $\Phi(x)f_X(x)$ immediately and getting stuck in a double integral.
- Using the probability integral transform for a non-standard $X$ and claiming $\Phi(X)$ is uniform.
- Forgetting that independence is needed to assert the variance of $Z-X$ is $1+\sigma^2$ without a covariance term.
- Writing $1-\sigma^2$ for the variance of a difference; variances add for independent variables even when coefficients have opposite signs.
- Losing the sign of the mean of $Z-X$, which is $-\mu$.

## Extensions

More generally, if $X\sim N(\mu_X,\sigma_X^2)$ and $Y\sim N(\mu_Y,\sigma_Y^2)$ are independent, then

$$
P(Y\le X)
=\Phi\left(
\frac{\mu_X-\mu_Y}{\sqrt{\sigma_X^2+\sigma_Y^2}}
\right).
$$

The canonical problem is the special case where $Y$ is standard Normal and the random CDF value is interpreted through conditioning.
