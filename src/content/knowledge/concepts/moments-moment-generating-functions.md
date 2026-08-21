---
title: Moments and Moment Generating Functions
description: Use raw and central moments together with moment generating functions to compute distributional summaries while respecting moment and MGF existence conditions.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-19
tags: [Probability, Expectation, Variance, Covariance]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
featured: false
related: []
relatedNotes: []
---

## Core Idea

Moments summarize aspects of a distribution through expectations of powers. Moment generating functions (MGFs) package many moments into one expectation:

$$
M_X(t)=E[e^{tX}].
$$

When the MGF exists on an open neighborhood of zero, derivatives at zero recover raw moments. This turns some moment calculations into differentiation after one generating-function derivation.

The existence qualification matters. Not every random variable has all moments, and not every random variable has an MGF that is finite near zero.

## Raw and Central Moments

The $k$th **raw moment** is

$$
m_k=E[X^k],
$$

when this expectation exists.

The $k$th **central moment** is

$$
\mu_k=E[(X-E[X])^k].
$$

The first central moment is zero whenever the mean exists, and the second central moment is the variance:

$$
\mu_2=\operatorname{Var}(X).
$$

Raw moments are especially convenient for generating functions. Central moments are often easier to interpret: variance measures scale, while higher central moments can encode asymmetry and tail shape.

## Moment Generating Functions

The moment generating function is

$$
M_X(t)=E[e^{tX}].
$$

At $t=0$,

$$
M_X(0)=1.
$$

For independent random variables $X$ and $Y$, whenever the relevant MGFs exist,

$$
M_{X+Y}(t)=M_X(t)M_Y(t).
$$

This product property is one reason MGFs are useful for sums and distribution identification.

An MGF can also uniquely determine a distribution under standard existence assumptions in a neighborhood of zero, but this page focuses on moment computation rather than using MGFs as a general distribution-theory chapter.

## Recovering Moments from Derivatives

If differentiation under the expectation is justified near zero, then

$$
M_X^{(k)}(0)=E[X^k].
$$

In particular,

$$
M_X'(0)=E[X]
$$

and

$$
M_X''(0)=E[X^2].
$$

Therefore

$$
\operatorname{Var}(X)=M_X''(0)-\big(M_X'(0)\big)^2.
$$

Interview problems often ask for a few moments from a known MGF or ask you to derive one MGF and then differentiate it.

## Existence Conditions

The formal expression $E[e^{tX}]$ is not automatically finite. To use an ordinary MGF robustly, we usually require it to be finite on some open **neighborhood of zero**.

A random variable may have some finite moments even when its MGF does not exist around zero. Conversely, knowing an MGF exists near zero is a strong condition that guarantees all ordinary moments and substantial regularity.

Do not differentiate a divergent integral simply because the resulting algebra looks familiar.

## Normal MGF as a Worked Example

For

$$
X\sim N(\mu,\sigma^2),
$$

the MGF is

$$
M_X(t)=\exp\left(\mu t+\frac12\sigma^2t^2\right).
$$

This immediately gives

$$
E[X]=M_X'(0)=\mu
$$

and

$$
E[X^2]=M_X''(0)=\mu^2+\sigma^2.
$$

Hence

$$
\operatorname{Var}(X)=\sigma^2.
$$

For a standard Normal $Z$, the same MGF gives the familiar moments

$$
E[Z]=0,\qquad E[Z^2]=1,\qquad E[Z^3]=0,\qquad E[Z^4]=3.
$$

A dedicated canonical Problem derives this Normal MGF rather than merely quoting it.

## What an MGF Does Not Guarantee

An MGF is a powerful tool when it exists, but its failure to exist does **not** mean the random variable itself is invalid.

The Cauchy distribution is a standard warning. It has a valid density but no finite ordinary mean or variance, and its ordinary MGF is not finite on a neighborhood of zero. This is a moment-existence fact, not a reason to reject the distribution.

It is therefore wrong to reason:

> “I cannot write a finite MGF, so the distribution does not exist.”

Other transforms, such as characteristic functions, exist under much weaker conditions, but they belong to a broader distribution-theory discussion.

## Common Mistakes

- Treating $M_X^{(k)}(0)=E[X^k]$ as valid without checking MGF existence near zero.
- Confusing raw moments with central moments.
- Forgetting that variance requires both the first and second moments in the identity $E[X^2]-E[X]^2$.
- Assuming symmetry guarantees a finite mean.
- Assuming every common distribution has a finite MGF.
- Using an MGF as a memorized formula without knowing what expectation defines it.

## Interview Checks

<details>
<summary>Read moments from derivatives</summary>

Suppose $M_X'(0)=2$ and $M_X''(0)=7$. What are the mean and variance?

$$
E[X]=2,\qquad \operatorname{Var}(X)=7-2^2=3.
$$

</details>

<details>
<summary>Raw or central moment?</summary>

Is $E[X^2]$ the variance?

Not generally. $E[X^2]$ is the second raw moment. Variance is the second central moment:

$$
\operatorname{Var}(X)=E[X^2]-E[X]^2.
$$

</details>

<details>
<summary>An invalid MGF argument</summary>

Someone writes $M_X(t)=E[e^{tX}]$ and immediately differentiates at zero without checking whether the expectation is finite for $t$ near zero. What is missing?

An existence/justification step. Ordinary MGF calculus requires finiteness on an open neighborhood of zero and enough regularity to exchange differentiation and expectation.

</details>

<details>
<summary>Normal MGF</summary>

What is the MGF of $X\sim N(\mu,\sigma^2)$?

$$
M_X(t)=\exp\left(\mu t+\frac12\sigma^2t^2\right).
$$

Differentiating it gives $E[X]=\mu$ and $E[X^2]=\mu^2+\sigma^2$.

</details>

<details>
<summary>Cauchy boundary</summary>

Does failure of an ordinary MGF imply the random variable or its distribution does not exist?

No. The Cauchy distribution is perfectly valid even though its ordinary MGF is not finite in a neighborhood of zero and its ordinary mean/variance do not exist.

</details>
