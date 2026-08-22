---
title: Random Variables, CDF, PMF, and PDF
description: Represent discrete and continuous random variables through support, cumulative distribution functions, probability mass functions, and probability density functions.
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

A **random variable** turns a random outcome into a numerical quantity. Once the variable is defined, its distribution answers the practical question: **where can the value lie, and how is probability allocated across those values?**

Three representations appear constantly in quantitative interviews:

- the **CDF** `F_X(x)=P(X<=x)`, which works for every random variable;
- the **PMF** `p_X(x)=P(X=x)`, used for discrete variables;
- the **PDF** `f_X(x)`, used for continuous variables and interpreted through integration rather than point probability.

The CDF is the most universal object. When unsure how to derive a transformed or piecewise distribution, returning to the event `X<=x` is often the safest route.

## Support

The **support** is the set of values where the distribution can place probability.

Examples:

- a Bernoulli variable has support `{0,1}`;
- a Binomial variable with `n` trials has support `{0,1,...,n}`;
- an Exponential variable has support `[0,infinity)`;
- a standard Normal variable has support the whole real line.

Support should be written before doing algebra. Many interview mistakes come from using a correct formula on an impossible region.

## Cumulative Distribution Function

For any random variable `X`,

`F_X(x)=P(X<=x)`.

Every CDF satisfies:

1. `0<=F_X(x)<=1`;
2. it is nondecreasing;
3. it is right-continuous;
4. `F_X(x)->0` as `x->-infinity`;
5. `F_X(x)->1` as `x->infinity`.

Interval probabilities are recovered from the CDF. For example,

`P(a<X<=b)=F_X(b)-F_X(a)`.

If endpoints may carry mass, keep the inequalities precise. In a continuous model the endpoint distinction disappears because individual points have zero probability.

## Discrete Random Variables and PMFs

A discrete random variable places probability on isolated values. Its probability mass function is

`p_X(x)=P(X=x)`.

The requirements are

`p_X(x)>=0`

and

`sum_x p_X(x)=1`.

The CDF is obtained by accumulating the masses:

`F_X(a)=sum_{x<=a} p_X(x)`.

A discrete CDF therefore has jumps. The jump size at `x` is exactly `P(X=x)`.

## Continuous Random Variables and PDFs

A continuous random variable is described by a density `f_X` satisfying

`f_X(x)>=0`

and

`integral_{-infinity}^{infinity} f_X(x) dx = 1`.

The CDF is

`F_X(a)=integral_{-infinity}^{a} f_X(x) dx`.

Where the CDF is differentiable,

`f_X(x)=F_X'(x)`.

For a continuous variable, **`P(X=x)=0` for every fixed point `x`**. A density value is not itself a probability. Probability comes from area:

`P(a<X<=b)=integral_a^b f_X(x) dx`.

This is why a PDF may be larger than `1` on a narrow interval. Only its total integral must equal `1`.

## A Canonical Example: Uniform on an Interval

If `X~U(a,b)` with `a<b`, the density is

`f_X(x)=1/(b-a)` for `a<=x<=b`, and `0` otherwise.

The CDF must be piecewise:

`F_X(x)=0` for `x<a`,

`F_X(x)=(x-a)/(b-a)` for `a<=x<=b`,

`F_X(x)=1` for `x>b`.

The middle expression is simply the fraction of the interval `[a,b]` lying to the left of `x`.

## Recovering a Density from a CDF

Suppose

`F_X(x)=0` for `x<0`,

`F_X(x)=x^2` for `0<=x<=1`,

`F_X(x)=1` for `x>1`.

Then on the continuous part of the support,

`f_X(x)=2x`, `0<x<1`.

Always inspect jumps before differentiating. If a CDF jumps at a point, that jump represents discrete probability mass and cannot be recovered from an ordinary derivative.

## Mixed Distributions

A variable can contain both point masses and a continuous component. For example, a loss may be exactly zero with positive probability and otherwise have a positive continuous density.

The CDF still handles the model cleanly:

- jumps encode atoms;
- smooth regions encode density through differentiation.

This is another reason to treat the CDF as the primary representation.

## Common Mistakes

- **Confusing density with probability.** `f_X(2)=1.4` is possible; `P(X=2)=1.4` is impossible.
- **Forgetting support.** A formula valid on `[0,1]` should not silently be extended to the whole real line.
- **Differentiating through a jump.** A jump in the CDF represents mass, not a finite PDF spike.
- **Assuming every random variable has a PDF.** Every random variable has a CDF, but discrete and mixed distributions need not have an ordinary density with respect to length.
- **Ignoring endpoint conventions.** For discrete variables, `<` versus `<=` can change the answer.

## Interview Checks

1. **Uniform CDF.** If `X~U(a,b)`, derive `F_X(x)` from the definition `P(X<=x)` and explain why it must have three pieces.
2. **Point probability.** Why is `P(X=x)=0` for a continuous random variable even though values near `x` can have positive probability?
3. **Density above one.** Let `X~U(0,1/2)`. Its density is `2`. Explain why this does not violate the probability axioms.
4. **CDF to PDF.** If `F(x)=x^3` on `[0,1]`, with the usual `0/1` extensions outside the interval, find the density and verify that it integrates to one.
5. **Jump detection.** A CDF jumps from `0.3` to `0.45` at `x=2`. What is `P(X=2)`?
6. **Support first.** Before integrating a proposed density or convolution, what support restrictions must be checked?
