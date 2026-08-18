---
problemId: random-variables-distributions-005
title: Joint-Normal Quadrant Conditioning
description: Use a decorrelating linear transformation and Gaussian symmetry to compute a conditional quadrant probability for jointly normal variables.
date: 2026-08-18
domain: Mathematics & Statistics
category: Probability
subcategories: [Random Variables, Distributions]
tags: [Probability, Random Variables, Distributions, Interview]
quantInterviewTopics: [probability-statistics, random-variables-distributions]
concepts: [gaussian-lognormal-structure, conditioning]
techniques: []
prerequisites: []
relatedProblems: []
family: joint-normal-decorrelation
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Let `X` and `Y` be jointly Normal random variables satisfying

`E[X]=E[Y]=0`,

`Var(X)=Var(Y)=1`,

and

`Cov(X,Y)=1/sqrt(2)`.

Compute

`P(X>0 | Y<0)`.

Your solution should avoid evaluating the bivariate Normal density directly.

## Think Before Revealing

The covariance has been chosen so that a simple linear combination of `X` and `Y` becomes uncorrelated with `Y`.

<details>
<summary>Hint 1</summary>

Define

`W=sqrt(2)X-Y`.

Compute `Var(W)` and `Cov(W,Y)`.

</details>

<details>
<summary>Hint 2</summary>

Because `(W,Y)` is jointly Normal and uncorrelated, it is independent. Rewrite `X>0` as `W+Y>0` and use rotational symmetry in the `(W,Y)` plane.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Set

`W=sqrt(2)X-Y`.

Because `(X,Y)` is jointly Normal, every linear transformation of the pair is jointly Normal. In particular `(W,Y)` is jointly Normal.

### Step 1: Distribution of `W`

Its mean is zero:

`E[W]=sqrt(2)E[X]-E[Y]=0`.

Its variance is

`Var(W)`

`=2 Var(X)+Var(Y)-2sqrt(2)Cov(X,Y)`

`=2+1-2sqrt(2)*(1/sqrt(2))`

`=3-2`

`=1`.

So `W` is standard Normal.

### Step 2: Decorrelation from `Y`

`Cov(W,Y)`

`=sqrt(2)Cov(X,Y)-Var(Y)`

`=sqrt(2)*(1/sqrt(2))-1`

`=0`.

Since `(W,Y)` is **jointly Normal**, zero covariance implies independence. Thus `W` and `Y` are independent standard Normal variables.

This implication is special to the jointly Normal class. For arbitrary random variables, zero covariance does **not** imply independence.

### Step 3: Rewrite the event

From

`W=sqrt(2)X-Y`,

we get

`X=(W+Y)/sqrt(2)`.

Therefore

`X>0`

is equivalent to

`W+Y>0`.

The numerator of the conditional probability is

`P(X>0,Y<0)`

`=P(W+Y>0,Y<0)`.

### Step 4: Use Gaussian angular symmetry

Because `W` and `Y` are independent standard Normals, their joint density depends only on

`w^2+y^2`.

It is rotationally symmetric.

The conditions

`Y<0`

and

`W+Y>0`

define the wedge below the horizontal axis and above the line `y=-w`. This wedge has angle

`pi/4`.

A full circle has angle `2pi`, so

`P(W+Y>0,Y<0)=(pi/4)/(2pi)=1/8`.

Meanwhile,

`P(Y<0)=1/2`.

Hence

`P(X>0 | Y<0)`

`=P(X>0,Y<0)/P(Y<0)`

`=(1/8)/(1/2)`

`=1/4`.

Therefore

**`P(X>0 | Y<0)=1/4`.**

</details>

## Why This Matters

This problem combines three reusable ideas:

1. choose a linear combination that removes covariance;
2. use **joint Normality** to convert zero covariance into independence;
3. use rotational symmetry instead of integrating a bivariate density.

It is also an important assumptions check. “Uncorrelated implies independent” is false for arbitrary random variables. The conclusion works here because the transformed pair remains jointly Normal.

## Common Mistakes

- Assuming `X` and `Y` are independent because they are each standard Normal.
- Saying zero covariance always implies independence.
- Forgetting that linear transformations preserve joint Normality.
- Computing `Var(W)` but not checking `Cov(W,Y)`.
- Rewriting `X>0` incorrectly after defining `W`.
- Calling the relevant region a full quadrant rather than a `45`-degree wedge.
- Forgetting to divide the joint probability `1/8` by `P(Y<0)=1/2`.

## Extensions

1. For a jointly standard-Normal pair with general correlation `rho`, construct a standardized linear combination independent of `Y`.
2. Derive the general identity `P(X>0,Y>0)=1/4+arcsin(rho)/(2pi)` for a jointly standard-Normal pair.
3. What happens to `P(X>0 | Y<0)` when `rho=0`? When `rho` approaches `1`?
4. Give an example of uncorrelated random variables that are not independent and explain why the argument above fails there.
5. Re-solve this problem by integrating the conditional Normal distribution and compare the amount of work.
