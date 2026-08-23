---
title: Expectation, Variance, and Covariance Algebra
description: Derive scalar variance and covariance identities, analyze linear combinations of random variables, and distinguish independence from zero covariance.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-19
tags: [Probability, Expectation, Variance, Covariance]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
featured: false
related: [joint-extremes-and-range]
relatedNotes: [Joint minimum and maximum moments provide a concrete scalar covariance and correlation application without changing matrix-PSD ownership.]
---

## Core Idea

Expectation describes location; variance describes squared dispersion around the mean; covariance describes how two centered random variables move together. At interview level, the biggest payoff comes from treating these as an algebra, not as isolated formulas.

The central scalar identities are:

**Var(X) = E[X^2] - E[X]^2**

and

**Cov(X,Y) = E[XY] - E[X]E[Y]**.

Once these are combined with covariance bilinearity, variances of sums, hedges, portfolios, and other linear combinations become systematic rather than ad hoc.

## Variance from the First Two Moments

Let $\mu=E[X]$. Then

$$
\operatorname{Var}(X)=E[(X-\mu)^2].
$$

Expanding and using linearity gives

$$
\operatorname{Var}(X)=E[X^2]-E[X]^2.
$$

For constants $a,b$,

$$
\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X).
$$

The shift $b$ changes the mean but not dispersion; the scale $a$ changes squared dispersion by $a^2$.

Variance requires an appropriate finite second moment. A distribution may exist perfectly well while its variance is infinite or undefined.

## Covariance

For integrable products and finite first moments,

$$
\operatorname{Cov}(X,Y)=E[(X-E[X])(Y-E[Y])].
$$

Expanding yields the computational identity

$$
\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y].
$$

The sign gives a direction of linear co-movement, while the magnitude depends on the units of both variables.

Covariance is symmetric:

$$
\operatorname{Cov}(X,Y)=\operatorname{Cov}(Y,X).
$$

Also,

$$
\operatorname{Cov}(X,X)=\operatorname{Var}(X).
$$

## Bilinearity

Covariance is bilinear in each argument. For constants $a,b$,

$$
\operatorname{Cov}(aX+bY,Z)
=a\operatorname{Cov}(X,Z)+b\operatorname{Cov}(Y,Z).
$$

Similarly,

$$
\operatorname{Cov}(X,aY+bZ)
=a\operatorname{Cov}(X,Y)+b\operatorname{Cov}(X,Z).
$$

Constants vanish inside covariance:

$$
\operatorname{Cov}(X+c,Y+d)=\operatorname{Cov}(X,Y).
$$

This bilinearity is the engine behind variance formulas for linear combinations.

## Variance of Linear Combinations

Because variance is covariance with itself,

$$
\operatorname{Var}(X+Y)
=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y).
$$

For a difference,

$$
\operatorname{Var}(X-Y)
=\operatorname{Var}(X)+\operatorname{Var}(Y)-2\operatorname{Cov}(X,Y).
$$

More generally,

$$
\operatorname{Var}\left(\sum_{i=1}^n a_iX_i\right)
=\sum_{i=1}^n a_i^2\operatorname{Var}(X_i)
+2\sum_{i<j}a_ia_j\operatorname{Cov}(X_i,X_j).
$$

Only when the cross-covariances vanish does this reduce to a sum of individual variances.

## Independence and Zero Covariance

When the relevant moments exist, **independence implies zero covariance** because independence gives

$$
E[XY]=E[X]E[Y].
$$

The converse is false in general: **zero covariance does not imply independence**.

A standard counterexample is a symmetric variable $X$ and $Y=X^2$. For a centered symmetric law such as $X\sim U(-1,1)$,

$$
\operatorname{Cov}(X,X^2)=E[X^3]-E[X]E[X^2]=0,
$$

but $Y$ is completely determined by $X$, so the variables are certainly not independent.

Jointly Gaussian variables form an important special class: for a jointly normal pair, zero covariance does imply independence. That is a Gaussian structural theorem, not a general covariance fact.

## Scalar Correlation

If $\sigma_X,\sigma_Y>0$, define

$$
\rho_{XY}=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}.
$$

Correlation is dimensionless and always lies in $[-1,1]$. It measures standardized linear dependence, not arbitrary nonlinear dependence.

Even though $[-1,1]$ is the universal scalar bound, fixed marginal distributions can impose tighter feasible ranges. Bernoulli variables are a common interview example.

## Boundary: Covariance Matrices and PSD

This page owns **scalar random-variable algebra**. It intentionally stops before covariance/correlation matrix geometry.

For a vector of random variables, covariance matrices are positive semidefinite (PSD), correlation matrices require matrix-level consistency, and feasible parameter ranges can depend on eigenvalues or principal minors. Those are Linear Algebra responsibilities handled by the existing covariance/correlation-matrix and positive-semidefinite-matrix material.

A scalar problem that expands $\operatorname{Var}(X-hY)$ belongs naturally here. A problem that asks whether a full proposed correlation matrix is valid belongs with matrix PSD feasibility.

## Common Mistakes

- Forgetting the square in $\operatorname{Var}(aX)=a^2\operatorname{Var}(X)$.
- Dropping covariance terms from a sum without justification.
- Assuming uncorrelated variables are independent in general.
- Confusing covariance magnitude with correlation magnitude when variables use different units.
- Assuming any correlation in $[-1,1]$ is feasible once fixed non-Gaussian marginals are specified.
- Turning a scalar covariance calculation into an unnecessary matrix PSD problem.

## Interview Checks

<details>
<summary>Variance from moments</summary>

If $E[X]=2$ and $E[X^2]=7$, what is $\operatorname{Var}(X)$?

$$
\operatorname{Var}(X)=7-2^2=3.
$$

</details>

<details>
<summary>Covariance bilinearity</summary>

Express $\operatorname{Cov}(2X-3Y,Z)$.

$$
\operatorname{Cov}(2X-3Y,Z)=2\operatorname{Cov}(X,Z)-3\operatorname{Cov}(Y,Z).
$$

</details>

<details>
<summary>Independence versus uncorrelated</summary>

If $\operatorname{Cov}(X,Y)=0$, must $X$ and $Y$ be independent?

No. Zero covariance removes linear co-movement but does not generally remove nonlinear dependence. Joint normality is one important setting where the converse does hold.

</details>

<details>
<summary>Scalar correlation normalization</summary>

If $\operatorname{Cov}(X,Y)=6$, $\sigma_X=2$, and $\sigma_Y=4$, what is the correlation?

$$
\rho_{XY}=\frac{6}{2\cdot4}=0.75.
$$

</details>
