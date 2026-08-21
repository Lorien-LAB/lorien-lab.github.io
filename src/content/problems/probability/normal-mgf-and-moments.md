---
problemId: expectation-variance-covariance-007
title: Normal MGF and Moments
description: Derive the moment generating function of a general Normal variable and use its derivatives to recover important Gaussian moments.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [moments-moment-generating-functions, expectation-variance-covariance-algebra, gaussian-lognormal-structure]
techniques: []
prerequisites: []
relatedProblems: [expected-normal-cdf-of-normal-variable]
family: normal-mgf-moments
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Let

$$
X\sim N(\mu,\sigma^2).
$$

Derive its moment generating function

$$
M_X(t)=E[e^{tX}],
$$

and use it to obtain $E[X^2]$.

Then specialize to $Z\sim N(0,1)$ and recover

$$
E[Z],\quad E[Z^2],\quad E[Z^3],\quad E[Z^4].
$$

## Think Before Revealing

You can either complete the square inside the Gaussian integral directly or first derive the standard-Normal MGF and then use $X=\mu+\sigma Z$.

<details>
<summary>Hint 1</summary>

For $Z\sim N(0,1)$,

$$
tz-\frac{z^2}{2}
=-\frac{(z-t)^2}{2}+\frac{t^2}{2}.
$$

</details>

<details>
<summary>Hint 2</summary>

Once $M_X(t)$ is known, use

$$
M_X'(0)=E[X],\qquad M_X''(0)=E[X^2].
$$

For the standard Normal, symmetry explains the odd moments, while derivatives of $e^{t^2/2}$ give the even ones.

</details>

## Solution

### Step 1: derive the standard-Normal MGF

For $Z\sim N(0,1)$,

$$
M_Z(t)
=\frac{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty}
\exp\left(tz-\frac{z^2}{2}\right)\,dz.
$$

Complete the square:

$$
tz-\frac{z^2}{2}
=-\frac{(z-t)^2}{2}+\frac{t^2}{2}.
$$

Therefore

$$
M_Z(t)
=e^{t^2/2}
\frac{1}{\sqrt{2\pi}}
\int_{-\infty}^{\infty}
\exp\left(-\frac{(z-t)^2}{2}\right)\,dz.
$$

The integral is the total mass of a shifted standard-Normal density, so it equals 1. Hence

$$
\boxed{M_Z(t)=e^{t^2/2}}.
$$

### Step 2: pass to a general Normal variable

Write

$$
X=\mu+\sigma Z.
$$

Then

$$
M_X(t)
=E[e^{t(\mu+\sigma Z)}]
=e^{\mu t}M_Z(\sigma t).
$$

Thus

$$
\boxed{M_X(t)=\exp\left(\mu t+\frac12\sigma^2t^2\right)}.
$$

In plain notation: **M_X(t) = exp(mu t + sigma^2 t^2/2)**.

### Step 3: recover the first two moments

Differentiate:

$$
M_X'(t)
=(\mu+\sigma^2t)M_X(t).
$$

At zero,

$$
E[X]=M_X'(0)=\mu.
$$

Differentiate again:

$$
M_X''(t)
=\left[\sigma^2+(\mu+\sigma^2t)^2\right]M_X(t).
$$

Therefore

$$
\boxed{E[X^2]=M_X''(0)=\mu^2+\sigma^2}.
$$

In plain notation: **E[X^2] = mu^2 + sigma^2**. Subtracting $E[X]^2$ recovers $\operatorname{Var}(X)=\sigma^2$.

### Step 4: standard-Normal moments

For $Z\sim N(0,1)$,

$$
M_Z(t)=e^{t^2/2}.
$$

The density is symmetric, so all finite odd moments vanish:

$$
E[Z]=0,\qquad E[Z^3]=0.
$$

From derivatives at zero,

$$
E[Z^2]=M_Z''(0)=1,
$$

and

$$
E[Z^4]=M_Z^{(4)}(0)=3.
$$

So

$$
\boxed{E[Z]=0,\quad E[Z^2]=1,\quad E[Z^3]=0,\quad E[Z^4]=3}.
$$

In words, the **fourth moment is 3** for a standard Normal variable.

## Why This Matters

This problem turns several isolated Gaussian facts into one reusable engine. Once the MGF is derived, moments follow by differentiation, while the affine form $X=\mu+\sigma Z$ explains how the general Normal formula relates to the standard case.

It also reinforces a useful boundary: Gaussian closure under affine transformations is distribution structure; extracting $E[X^k]$ or $E[e^{tX}]$ is moment/expectation machinery.

## Common Mistakes

- Forgetting the factor $1/2$ in the quadratic MGF term.
- Writing $\exp(\mu t+\sigma t^2/2)$ instead of using $\sigma^2$.
- Confusing $E[X^2]$ with $\operatorname{Var}(X)$ when $\mu\ne0$.
- Differentiating an MGF formula without knowing why the MGF exists near zero.
- Using symmetry to claim even moments vanish; symmetry only forces odd moments to vanish.
- Memorizing $E[Z^4]=3$ without connecting it to the Normal MGF or Gaussian integral.

## Extensions

For independent random variables with MGFs,

$$
M_{X+Y}(t)=M_X(t)M_Y(t).
$$

For independent Normals, multiplying their MGFs immediately shows that the sum is Normal with means and variances added.

A related transform is the cumulant generating function

$$
K_X(t)=\log M_X(t).
$$

For a Normal variable,

$$
K_X(t)=\mu t+\frac12\sigma^2t^2,
$$

so all cumulants above order two are zero.
