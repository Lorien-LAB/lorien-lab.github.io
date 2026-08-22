---
problemId: random-variables-distributions-003
title: Density Under a Random Variable Transform
description: Derive the distribution of a transformed random variable from its CDF and recover the Jacobian rule with the correct support and inverse branches.
date: 2026-08-18
domain: Mathematics & Statistics
category: Probability
subcategories: [Random Variables, Distributions]
tags: [Probability, Random Variables, Distributions, Interview]
quantInterviewTopics: [probability-statistics, random-variables-distributions]
concepts: [random-variables-cdf-pmf-pdf, random-variable-transformations-convolution]
techniques: []
prerequisites: []
relatedProblems: []
family: distribution-pushforward
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Let `X` be a continuous random variable with density `f_X`, and define

`Y=g(X)`.

1. If `g` is strictly increasing and differentiable, derive the CDF and density of `Y` from first principles.
2. Apply the method when `X~U(0,1)` and `Y=X^2`.
3. What changes if instead `X~U(-1,1)` and `Y=X^2`, where the transformation is many-to-one?

Your answer should state the support at every stage rather than giving only a formal derivative rule.

## Think Before Revealing

The safest starting point is always the event defining the CDF:

`F_Y(y)=P(g(X)<=y)`.

<details>
<summary>Hint 1</summary>

For strictly increasing `g`, rewrite `g(X)<=y` as `X<=g^-1(y)` before differentiating anything.

</details>

<details>
<summary>Hint 2</summary>

For `Y=X^2` with `X` supported on `[-1,1]`, a positive `y` has two inverse branches: `sqrt(y)` and `-sqrt(y)`. Both carry probability into the same output value.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### 1. Strictly increasing transformation

Suppose `g` is strictly increasing and differentiable on the support of `X`. Then

`F_Y(y)=P(Y<=y)`

`=P(g(X)<=y)`

`=P(X<=g^-1(y))`

`=F_X(g^-1(y))`.

Differentiate wherever the functions are differentiable:

`f_Y(y)=f_X(g^-1(y)) * d[g^-1(y)]/dy`.

If `g` is decreasing, the CDF inequality reverses. The general one-to-one density rule is therefore written with an absolute derivative:

`f_Y(y)=f_X(g^-1(y)) * |d[g^-1(y)]/dy|`.

This is the one-dimensional **Jacobian** rule.

It is valid only on the transformed support. Outside that support, `f_Y(y)=0`.

### 2. `X~U(0,1)` and `Y=X^2`

Because `X` is restricted to `[0,1]`, the map `g(x)=x^2` is strictly increasing there.

The support becomes

`0<=Y<=1`.

For `0<=y<=1`,

`F_Y(y)=P(X^2<=y)`

`=P(X<=sqrt(y))`

`=sqrt(y)`,

because the CDF of `U(0,1)` equals `x` on `[0,1]`.

Differentiating,

`f_Y(y)=1/(2 sqrt(y))`, `0<y<1`,

and `0` outside `[0,1]`.

As a sanity check,

`integral_0^1 [1/(2 sqrt(y))] dy=1`.

The same result follows from the inverse-Jacobian formula:

`g^-1(y)=sqrt(y)`

and

`|d g^-1(y)/dy|=1/(2 sqrt(y))`.

### 3. `X~U(-1,1)` and `Y=X^2`

Now `g(x)=x^2` is **many-to-one**. For `0<y<1`, the value `y` can come from

`x_1(y)=sqrt(y)`

or

`x_2(y)=-sqrt(y)`.

The density must sum the probability flow through both inverse branches:

`f_Y(y)=sum_i f_X(x_i(y)) |dx_i/dy|`.

Since `X~U(-1,1)`,

`f_X(x)=1/2` on `[-1,1]`.

Each inverse branch has absolute derivative

`1/(2 sqrt(y))`.

Therefore

`f_Y(y)`

`=(1/2)(1/(2 sqrt(y))) + (1/2)(1/(2 sqrt(y)))`

`=1/(2 sqrt(y))`, `0<y<1`.

The final density happens to match the previous example, but the reasoning is different: the original density is halved while the number of valid inverse branches doubles.

A direct CDF derivation confirms it:

`F_Y(y)=P(X^2<=y)`

`=P(-sqrt(y)<=X<=sqrt(y))`

`=[2 sqrt(y)]/2`

`=sqrt(y)`.

The central lesson is not the numerical coincidence. It is that a many-to-one transform requires **all valid inverse branches**.

</details>

## Why This Matters

Distribution transformation is one of the most reusable probability techniques in quantitative interviews. It appears in Lognormal models, ratios and products, simulation, option-pricing state transformations, and statistical change-of-variable calculations.

The robust workflow is:

1. determine the support of `Y`;
2. write `F_Y(y)=P(g(X)<=y)`;
3. rewrite the event in terms of `X`;
4. differentiate if a density is needed;
5. only then recognize the Jacobian formula as a shortcut.

This sequence is safer than memorizing one formula and applying it outside its assumptions.

## Common Mistakes

- Writing the inverse-Jacobian formula without checking that `g` is one-to-one.
- Forgetting the absolute value of the inverse derivative.
- Ignoring a second inverse branch for `X^2`, `|X|`, or another many-to-one map.
- Giving a density without its support.
- Treating a CDF and a PDF as interchangeable objects.
- Differentiating before correctly rewriting the event `g(X)<=y`.
- Keeping a branch whose inverse value lies outside the original support of `X`.

## Extensions

1. If `X~U(0,1)` and `Y=-log X`, use the CDF-first method to identify the distribution of `Y`.
2. If `X~N(0,1)` and `Y=X^2`, derive the density by summing the two inverse branches.
3. If `Y=exp(X)`, derive the general relationship between a Normal `X` and a Lognormal `Y`.
4. For a piecewise monotone `g`, explain how to partition the original support into inverse branches.
5. Extend the idea to two dimensions and explain why a determinant of a Jacobian matrix replaces the one-dimensional absolute derivative.
