---
title: Gaussian and Lognormal Structure
description: Use joint-normal structure, linear transformations, standardization, and logarithms to reason about Gaussian and lognormal random variables.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-18
tags: [Probability, Random Variables, Distributions]
quantInterviewTopics: [probability-statistics, random-variables-distributions]
featured: false
related: []
relatedNotes: []
---

## Core Idea

Gaussian questions become much easier when you reason structurally instead of manipulating densities entry by entry. The key facts are about **linear transformations**, **joint normality**, and the special relationship between covariance and independence inside the Gaussian family.

Lognormal questions use the same structure after applying logarithms: multiplication of positive variables becomes addition of their log variables.

## Standardization

If

`X~N(mu,sigma^2)` with `sigma>0`,

then

`Z=(X-mu)/sigma ~ N(0,1)`.

Standardization separates location and scale from the shape of the distribution. It is often the first move before computing a Gaussian probability or comparing variables.

## Affine Closure of a Normal Variable

If `X~N(mu,sigma^2)` and `a,b` are constants, then

`aX+b ~ N(a mu+b, a^2 sigma^2)`.

This is one reason Normal models are analytically convenient: affine changes do not leave the family.

## Joint Normality

A random vector `(X_1,...,X_n)` is **jointly normal** if every linear combination

`a_1 X_1 + ... + a_n X_n`

is a one-dimensional Normal random variable.

For a jointly normal vector, the mean vector and covariance matrix determine the full distribution.

This condition is stronger than saying each coordinate is individually Normal.

**Marginal normality does not imply joint normality.** Two variables can each have a Normal marginal distribution while their dependence structure is non-Gaussian.

That distinction matters whenever a solution uses a property that belongs to the joint Gaussian family rather than to the one-dimensional marginals.

## Linear Combinations of Jointly Normal Variables

If `(X,Y)` is jointly normal, then for any constants `a,b`,

`aX+bY`

is Normal.

Its mean is

`a E[X]+b E[Y]`,

and its variance is

`a^2 Var(X)+b^2 Var(Y)+2ab Cov(X,Y)`.

A useful interview technique is to choose `a` and `b` so that a new linear combination has zero covariance with another Gaussian component.

## Zero Covariance and Independence

For arbitrary random variables,

`Cov(X,Y)=0`

does **not** imply independence.

But if `(X,Y)` is jointly normal, then

`Cov(X,Y)=0  =>  X and Y are independent`.

The reason is specific to the Gaussian joint law: once the covariance matrix becomes diagonal, the joint Gaussian density factors into the product of its marginal densities.

So the correct statement is:

> **joint normal + zero covariance => independence**.

Never shorten this to “uncorrelated means independent” without stating the Gaussian assumption.

## Decorrelation by a Linear Transformation

Suppose `X` and `Y` are standardized jointly normal variables with correlation `rho`. Consider

`W=(X-rho Y)/sqrt(1-rho^2)`

for `|rho|<1`.

Then

`E[W]=0`,

`Var(W)=1`,

and

`Cov(W,Y)=0`.

Because `(W,Y)` is jointly normal, `W` and `Y` are independent standard Normal variables.

This transforms a correlated Gaussian pair into independent coordinates and often turns a difficult conditional-probability region into simple geometry.

## Rotational Symmetry After Decorrelation

Two independent standard Normal variables have joint density

`f(w,y)=(1/(2 pi)) exp(-(w^2+y^2)/2)`.

The density depends only on `w^2+y^2`, so it is rotationally symmetric around the origin.

Therefore wedge probabilities depend only on the wedge angle. For example, a right-angle quadrant has probability `1/4`, and a `45`-degree wedge has probability `1/8`.

This geometric fact is extremely useful after a carefully chosen Gaussian linear transformation.

## Lognormal Variables

A positive random variable `X` is Lognormal if

`log X`

is Normal.

If

`log X ~ N(mu,sigma^2)`,

then we may write

`X=exp(Z)`

for a Normal variable `Z`.

The support of a Lognormal variable is `(0,infinity)`.

The distribution is right-skewed even though its logarithm is symmetric.

## Products of Lognormal Variables

For positive `X` and `Y`,

`log(XY)=log X + log Y`.

If `log X` and `log Y` are **jointly normal**, their sum is Normal. Therefore

`XY`

is Lognormal.

Independent Lognormal variables are an important sufficient special case: independence of `X` and `Y` implies independence of their log variables, and independent Normal variables are jointly normal.

But independence is not necessary. Correlated jointly normal log variables also have a Normal sum, so their product remains Lognormal.

## Why Marginal Lognormality Is Not Enough

Knowing only that `X` and `Y` are each marginally Lognormal tells us that `log X` and `log Y` are each marginally Normal.

It does **not** tell us that `(log X,log Y)` is jointly normal.

If their joint dependence is not Gaussian, the sum

`log X + log Y`

need not be Normal. Consequently the product `XY` need not be Lognormal.

The lesson is broader than this one family:

> Marginal distributions do not determine the joint law.

## Gaussian Closure Versus Moment Calculations

The structural facts in this page concern distributional form:

- which linear transformations remain Gaussian;
- when zero covariance yields independence;
- when a product remains Lognormal.

Direct calculations of higher moments such as `E[X^4]` or `E[exp(lambda X)]` are separate expectation problems. A moment generating function can characterize a distribution, but computing moments is not required to use the structural closure properties above.

## Common Mistakes

- Assuming two marginally Normal variables are automatically jointly normal.
- Claiming zero covariance implies independence without the joint-normal assumption.
- Forgetting to recompute variance after a linear transformation.
- Treating Lognormal as a distribution supported on the whole real line.
- Saying “the product of two Lognormals is always Lognormal” without specifying the joint law.
- Assuming independence is necessary for Lognormal product closure; joint normality of the log variables is the more general sufficient condition.

## Interview Checks

1. **Decorrelation.** Let `(X,Y)` be jointly normal, standard, with correlation `rho`. Construct a standard Normal `W` that is independent of `Y` using a linear combination of `X` and `Y`.
2. **Uncorrelated versus independent.** Why does `Cov(X,Y)=0` imply independence for a jointly normal pair but not for arbitrary random variables?
3. **Marginal trap.** Can `X` and `Y` each be Normal while `(X,Y)` is not jointly normal? What does this prevent you from concluding?
4. **Wedge geometry.** Why can angular symmetry be used after transforming a correlated Gaussian pair into independent standard Normal coordinates?
5. **Lognormal product.** If `X` and `Y` are independent Lognormal variables, prove that `XY` is Lognormal using `log(XY)=log X+log Y`.
6. **Dependence boundary.** If `X` and `Y` are only known to be marginally Lognormal, what additional condition on `(log X,log Y)` is sufficient to guarantee that their product is Lognormal?
7. **Not necessary.** Give a reason independence is sufficient but not necessary for the product of two Lognormal variables to remain Lognormal.
