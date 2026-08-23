---
title: Random Variable Transformations and Convolution
description: Derive distributions of transformed random variables and independent sums using CDF-first reasoning, Jacobians, and support-aware convolution.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-18
tags: [Probability, Random Variables, Distributions]
quantInterviewTopics: [probability-statistics, random-variables-distributions]
featured: false
related: [conditional-expectation-tower-property, expectation-linearity-indicators, order-statistics-basics]
relatedNotes: [Conditioning and tower arguments complement distribution transformations., LOTUS can compute expectations without deriving a transformed density., The probability integral transform maps continuous order statistics to Beta variables.]
---

## Core Idea

Two recurring interview tasks are:

1. start from a random variable `X` and find the distribution of `Y=g(X)`;
2. start from independent variables `X` and `Y` and find the distribution of their sum.

The safest unifying principle is to reason from **events and support before formulas**. For transformations, begin with the CDF. For independent sums, convolution is the density version of conditioning on one summand.

## CDF-First Transformation Method

Let

`Y=g(X)`.

Instead of immediately recalling a Jacobian formula, start from

`F_Y(y)=P(Y<=y)=P(g(X)<=y)`.

Then rewrite the event in terms of `X`. Once `F_Y` is known, differentiate where appropriate to obtain the density.

This CDF-first method works for discrete variables, continuous variables, monotone transforms, and many non-monotone transforms. It also forces you to identify the correct support.

## Monotone Transformations

Suppose `g` is strictly increasing and differentiable. Then

`g(X)<=y` is equivalent to `X<=g^{-1}(y)`.

Therefore

`F_Y(y)=F_X(g^{-1}(y))`.

Differentiating,

`f_Y(y)=f_X(g^{-1}(y)) * |d g^{-1}(y)/dy|`.

For a strictly decreasing transform, the CDF event reverses direction, but the final density still contains the absolute derivative.

The **absolute Jacobian factor** preserves probability when intervals stretch or contract under the transformation.

## Why the Jacobian Appears

For a small interval near `y`, probability conservation gives roughly

`f_Y(y) dy ≈ f_X(x) dx`.

If `y=g(x)`, then

`|dx| = |dx/dy| |dy|`.

Hence

`f_Y(y)=f_X(x)|dx/dy|`.

The formula is therefore a local change-of-scale rule, not an arbitrary memorized correction.

## Many-to-One Transformations

The inverse formula needs care when multiple values of `X` map to the same `Y`.

For example, if

`Y=X^2`,

then a positive value `y` can arise from both `X=sqrt(y)` and `X=-sqrt(y)`.

When the relevant inverse branches are differentiable,

`f_Y(y)=sum_i f_X(x_i(y)) |dx_i/dy|`,

where the sum runs over all valid roots satisfying `g(x_i)=y`.

This is the standard **many-to-one** correction: do not discard probability carried by another inverse branch.

## Support Transformation

Before differentiating anything, map the support.

Examples:

- if `X` is supported on `[0,1]` and `Y=2X+3`, then `Y` is supported on `[3,5]`;
- if `X` is supported on `[-1,2]` and `Y=X^2`, then `Y` is supported on `[0,4]`, but the number of valid inverse branches changes across that support;
- if `Y=exp(X)`, then `Y>0` regardless of the support of `X` on the real line.

A correct algebraic expression paired with the wrong support is still a wrong distribution.

## Independent Sums and Convolution

Let `X` and `Y` be independent continuous random variables with densities `f_X` and `f_Y`. For

`Z=X+Y`,

the density is

`f_Z(z)=integral_{-infinity}^{infinity} f_X(z-y) f_Y(y) dy`.

Equivalently,

`f_Z(z)=integral_{-infinity}^{infinity} f_X(x) f_Y(z-x) dx`.

This is the **convolution** of the two densities.

One derivation starts from the CDF:

`F_Z(z)=P(X+Y<=z)`

`= integral P(X<=z-y | Y=y) f_Y(y) dy`

`= integral F_X(z-y) f_Y(y) dy`,

where independence removes any dependence of the conditional law of `X` on `Y=y`. Differentiating in `z` gives the convolution formula.

## Support Determines Integration Bounds

The formal convolution integral is over the real line, but most of the integrand is often zero. **Support determines integration bounds.**

If `X,Y~U(0,1)` independently, then for a fixed sum `z` we need simultaneously

`0<=y<=1`

and

`0<=z-y<=1`.

The second condition gives

`z-1<=y<=z`.

So valid `y` must lie in the intersection

`[0,1] ∩ [z-1,z]`.

Its length changes with `z`:

- for `0<z<1`, the interval is `[0,z]`, length `z`;
- for `1<=z<2`, the interval is `[z-1,1]`, length `2-z`;
- outside `[0,2]`, the intersection is empty.

That changing overlap is why the sum of two independent `U(0,1)` variables has a triangular density.

## Geometric View of Convolution

For two independent uniforms, the pair `(X,Y)` is uniform on the unit square. Fixing `X+Y=z` gives a diagonal line. The density at `z` is proportional to how much of that line intersects the square, adjusted consistently by the coordinate transformation.

The geometry and the convolution bounds are two views of the same support constraint.

## Transformation Versus Convolution

Do not conflate these two operations.

- **Transformation:** one random vector is mapped through a function, such as `Y=g(X)` or `R=X/Y`.
- **Convolution:** independent random variables are combined additively, such as `Z=X+Y`.

A sum can also be viewed as a transformation of the joint vector `(X,Y)`, but convolution exploits independence to reduce the calculation to a one-dimensional integral.

## Products and Ratios

Products and ratios are not ordinary convolutions. A reliable strategy is again CDF-first reasoning or a multivariable change of variables.

For example, to study `R=X/Y`, choose a second coordinate such as `V=Y`, write

`X=RV`, `Y=V`,

compute the two-dimensional Jacobian, transform the joint density, and integrate out `V` over the valid support.

The same framework handles products by choosing coordinates such as `U=XY` and `V=Y`.

## Discrete Convolution

For independent discrete random variables,

`P(X+Y=k)=sum_j P(X=j) P(Y=k-j)`.

This is the discrete analogue of continuous convolution. The same support logic applies: only terms where both probabilities are defined can contribute.

## Common Mistakes

- Writing the Jacobian formula before determining whether the transformation is one-to-one.
- Forgetting the absolute value of the inverse derivative.
- Ignoring a second inverse branch in transformations such as `X^2` or `|X|`.
- Leaving the transformed density on an impossible support.
- Writing a convolution integral with bounds that ignore the supports of both summands.
- Applying the product-of-marginals convolution formula when the variables are dependent.
- Treating products or ratios as if they used the ordinary additive convolution formula.

## Interview Checks

1. **Monotone transform.** If `X~U(0,1)` and `Y=-log X`, derive the CDF first and identify the resulting density.
2. **Many-to-one transform.** If `X~U(-1,1)` and `Y=X^2`, why are there two inverse branches for `0<y<1`? Derive the density.
3. **Support mapping.** If `X` is supported on `[2,5]` and `Y=1/X`, what is the support of `Y`?
4. **Uniform convolution.** Without memorizing the answer, derive why the density of `X+Y` for independent `U(0,1)` variables rises linearly and then falls linearly.
5. **Wrong bounds.** In the uniform-sum problem, why is `integral_0^1 f_X(z-y)f_Y(y)dy` not automatically equal to `1` for every `z`?
6. **Dependence.** Which step in the standard convolution derivation fails if `X` and `Y` are dependent?
7. **Product versus sum.** Why is the density of `XY` not obtained by simply replacing `z-y` with `z/y` inside the convolution formula?
