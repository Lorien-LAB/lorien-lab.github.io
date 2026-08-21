---
problemId: expectation-variance-covariance-009
title: Optimal Hedge Ratio by Variance Minimization
description: Expand the variance of a hedged return and derive the minimum-variance hedge ratio from scalar covariance and variance.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [expectation-variance-covariance-algebra, correlation-matrix]
techniques: []
prerequisites: []
relatedProblems: [bernoulli-default-correlation-bounds]
family: minimum-variance-hedge
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Let $R_A$ and $R_B$ be random returns with finite second moments and $\operatorname{Var}(R_B)>0$.

You hold one unit of exposure $A$ and hedge it by taking $h$ units of exposure $B$, producing hedged return

$$
R_H=R_A-hR_B.
$$

Choose $h$ to minimize the variance of the hedged return. Express the answer both with covariance/variance and with correlation/standard deviations.

## Think Before Revealing

Treat the hedge ratio as an ordinary scalar variable. Expand the variance using covariance bilinearity; the result is a quadratic function of $h$.

<details>
<summary>Hint 1</summary>

Use

$$
\operatorname{Var}(X-hY)
=\operatorname{Var}(X)-2h\operatorname{Cov}(X,Y)+h^2\operatorname{Var}(Y).
$$

</details>

<details>
<summary>Hint 2</summary>

Differentiate the quadratic with respect to $h$. The positive coefficient $\operatorname{Var}(R_B)$ guarantees the stationary point is the unique minimum.

</details>

## Solution

Expand the variance:

$$
\operatorname{Var}(R_A-hR_B)
=\operatorname{Var}(R_A)
-2h\operatorname{Cov}(R_A,R_B)
+h^2\operatorname{Var}(R_B).
$$

In plain notation: **Var(R_A - h R_B)** is a convex quadratic in $h$.

Differentiate:

$$
\frac{d}{dh}\operatorname{Var}(R_A-hR_B)
=-2\operatorname{Cov}(R_A,R_B)
+2h\operatorname{Var}(R_B).
$$

Set the derivative to zero:

$$
-2\operatorname{Cov}(R_A,R_B)
+2h^*\operatorname{Var}(R_B)=0.
$$

Therefore

$$
\boxed{
h^*=\frac{\operatorname{Cov}(R_A,R_B)}{\operatorname{Var}(R_B)}
}.
$$

Since $\operatorname{Var}(R_B)>0$, the second derivative is

$$
2\operatorname{Var}(R_B)>0,
$$

so this is indeed the unique variance minimizer.

Now write

$$
\operatorname{Cov}(R_A,R_B)=\rho\sigma_A\sigma_B,
\qquad
\operatorname{Var}(R_B)=\sigma_B^2.
$$

Then

$$
\boxed{h^*=\rho\frac{\sigma_A}{\sigma_B}}.
$$

In plain notation: **h* = Cov(R_A,R_B)/Var(R_B) = rho sigma_A/sigma_B**.

### Minimum residual variance

Substituting the optimal hedge ratio back into the quadratic gives

$$
\operatorname{Var}(R_H^*)
=\sigma_A^2-
\frac{\operatorname{Cov}(R_A,R_B)^2}{\sigma_B^2}
=\sigma_A^2(1-\rho^2).
$$

Thus only the linearly explainable component of $R_A$ is removed by the one-factor minimum-variance hedge.

## Why This Matters

This is one of the cleanest quantitative-finance applications of scalar covariance algebra. It links

- variance of a linear combination,
- covariance as a cross term,
- correlation normalization,
- and one-variable convex minimization.

The result is also the population regression slope of $R_A$ on $R_B$ when an intercept is allowed, which gives a useful statistical interpretation of the hedge ratio.

## Common Mistakes

- Dividing by $\operatorname{Var}(R_A)$ instead of the variance of the hedge instrument $R_B$.
- Dropping the factor of 2 in the covariance cross term and then losing track of signs.
- Using $\rho\sigma_B/\sigma_A$ instead of $\rho\sigma_A/\sigma_B$.
- Minimizing $E[R_A-hR_B]$ rather than the variance when the objective is minimum risk.
- Treating this scalar covariance calculation as a covariance-matrix PSD problem.
- Forgetting that $\operatorname{Var}(R_B)>0$ is needed to define the ratio.

## Extensions

With several hedge instruments collected in a return vector $R_B$, the scalar ratio becomes a linear-system solution involving the hedge-instrument covariance matrix. That multivariate extension is naturally connected to matrix methods.

If the objective includes expected return, transaction costs, tail risk, or constraints, the minimum-variance scalar answer need not remain optimal; those are additional optimization layers rather than changes to the covariance identity derived here.
