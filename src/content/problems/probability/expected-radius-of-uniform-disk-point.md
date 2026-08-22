---
problemId: expectation-variance-covariance-011
title: Expected Radius of a Uniform Point in a Disk
description: Derive the radial density of a point chosen uniformly by area in a disk and compute its expected distance from the center.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [expectation-linearity-indicators, symmetry-equiprobability-geometric-probability]
techniques: []
prerequisites: []
relatedProblems: []
family: continuous-expectation-geometry
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

A point is chosen uniformly **by area** from a disk of radius $R$. Let $D$ be its distance from the center.

Find $E[D]$.

As a special case, what is the answer for the unit disk $R=1$?

## Think Before Revealing

“Uniform in the disk” does **not** mean the radius is uniform on $[0,R]$. An annulus farther from the center contains more area. Start from the area inside radius $r$.

<details>
<summary>Hint 1</summary>

For $0\le r\le R$,

$$
P(D\le r)=\frac{\pi r^2}{\pi R^2}=\frac{r^2}{R^2}.
$$

Differentiate this CDF to get the radial density.

</details>

<details>
<summary>Hint 2</summary>

Once you have $f_D(r)$, compute

$$
E[D]=\int_0^R r f_D(r)\,dr.
$$

You can also verify the same result directly with a polar-coordinate area integral.

</details>

## Solution

### Method 1: derive the radial density

Uniformity by area means probability is proportional to area. For $0\le r\le R$,

$$
F_D(r)=P(D\le r)
=\frac{\pi r^2}{\pi R^2}
=\frac{r^2}{R^2}.
$$

Differentiating gives the radial density

$$
f_D(r)=\frac{2r}{R^2},\qquad 0\le r\le R.
$$

In plain notation: **f_D(r) = 2r/R^2**.

Now integrate:

$$
E[D]
=\int_0^R r\frac{2r}{R^2}\,dr
=\frac{2}{R^2}\int_0^R r^2\,dr
=\frac{2}{R^2}\frac{R^3}{3}.
$$

Therefore

$$
\boxed{E[D]=\frac{2R}{3}}.
$$

In plain notation: **E[D] = 2R/3**.

For the unit disk, $R=1$, so

$$
\boxed{E[D]=\frac23}.
$$

### Method 2: polar-coordinate area integral

The uniform density over the disk is

$$
\frac{1}{\pi R^2}.
$$

In polar coordinates, $dA=r\,dr\,d\theta$, and the distance from the center is $r$. Thus

$$
E[D]
=\frac{1}{\pi R^2}
\int_0^{2\pi}\int_0^R r\,(r\,dr\,d\theta).
$$

So

$$
E[D]
=\frac{1}{\pi R^2}(2\pi)\frac{R^3}{3}
=\frac{2R}{3}.
$$

The extra factor of $r$ in the polar area element is exactly why large radii receive more probability mass.

## Why This Matters

This problem is a compact test of what “uniform” means in more than one dimension. A coordinate need not be uniformly distributed just because the point itself is uniform over a region.

It also illustrates a useful expectation workflow:

1. identify the induced one-dimensional distribution of the quantity of interest;
2. compute its expectation;
3. verify with a direct geometric integral when possible.

## Common Mistakes

- Assuming $D\sim U(0,R)$ and obtaining the wrong answer $R/2$.
- Forgetting that annulus area grows like $r$.
- Using circumference rather than enclosed area for the radial CDF.
- Dropping the Jacobian factor $r$ in polar coordinates.
- Confusing “uniform angle” with “uniform radius.”

## Extensions

For a point uniform in a $d$-dimensional ball of radius $R$,

$$
P(D\le r)=\left(\frac rR\right)^d,
$$

so

$$
f_D(r)=\frac{d r^{d-1}}{R^d}.
$$

Therefore

$$
E[D]=\frac{d}{d+1}R.
$$

The two-dimensional disk result is the case $d=2$.

A betting wrapper can ask for a fair payment proportional to distance from the center. Once the expected radius is known, that extension is a direct fair-value calculation rather than a new reasoning family.
