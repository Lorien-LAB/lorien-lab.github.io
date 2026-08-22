---
title: Expectation, Linearity, and Indicator Variables
description: Compute expectations from discrete or continuous laws, exploit linearity without unnecessary independence assumptions, and turn random counts into sums of indicators.
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

Expectation is a weighted average of possible outcomes, but interview problems rarely become easier by expanding every probability one by one. The useful habit is to choose a representation whose expectation is simple: a function of one random variable, a sum of pieces, or a sum of indicators.

The most important structural fact in this page is **linearity of expectation**:

$$
E[aX+bY]=aE[X]+bE[Y],
$$

whenever the relevant expectations exist. **Linearity does not require independence.** This is why expected-count problems often remain easy even when the underlying events overlap or interact.

## Discrete and Continuous Expectation

For a discrete random variable with support values $x$,

$$
E[X]=\sum_x x\,P(X=x),
$$

provided the sum is well-defined. For a continuous random variable with density $f_X$,

$$
E[X]=\int_{-\infty}^{\infty}x f_X(x)\,dx,
$$

again provided the integral exists in the ordinary probabilistic sense.

Expectation is not “the most likely value.” A fair six-sided die has no single outcome equal to its mean, yet

$$
E[X]=\frac{1+2+3+4+5+6}{6}=3.5.
$$

## LOTUS: Expectation of a Function

The Law of the Unconscious Statistician (LOTUS) lets us compute $E[g(X)]$ without first deriving the distribution of $g(X)$.

For discrete $X$,

$$
E[g(X)]=\sum_x g(x)P(X=x).
$$

For continuous $X$,

$$
E[g(X)]=\int g(x)f_X(x)\,dx.
$$

This is often the right tool when the question asks for a payoff, loss, distance, power, or transformed value rather than the random variable itself.

## Linearity Does Not Require Independence

For any finite collection with finite expectations,

$$
E\left[\sum_{i=1}^n X_i\right]=\sum_{i=1}^n E[X_i].
$$

No independence assumption appears. Dependence changes variances and joint probabilities, but not this algebraic property of expectation.

This distinction matters in pattern-count problems. Two indicators for overlapping occurrences of a pattern can be dependent. Their expectations can still be added exactly.

## When Product Expectations Factor

Linearity and product factorization are different facts. If $X$ and $Y$ are independent and the relevant expectations exist, then

$$
E[XY]=E[X]E[Y].
$$

More generally, for independent variables $X_1,\dots,X_n$,

$$
E\left[\prod_{i=1}^n X_i\right]=\prod_{i=1}^n E[X_i]
$$

under the usual integrability conditions.

Without independence, $E[XY]=E[X]E[Y]$ need not hold. A common interview mistake is to remember that independence is unnecessary for sums and then accidentally drop it for products.

## Indicator Variables and Expected Counts

For an event $A$, define the indicator

$$
I_A=\begin{cases}1,&A\text{ occurs},\\0,&A\text{ does not occur}.\end{cases}
$$

Then

$$
E[I_A]=P(A).
$$

If a random variable counts how many of several properties occur, write

$$
N=\sum_{i=1}^m I_i.
$$

Immediately,

$$
E[N]=\sum_{i=1}^m P(I_i=1),
$$

whether or not the events behind those indicators are independent.

This converts many apparently global counting problems into local probability calculations.

## Existence Before Algebra

Expectation notation does not guarantee that an expectation exists. Before using identities such as $E[X^2]-E[X]^2$, product factorization, or exchanging infinite sums and expectations, check that the necessary moments are finite or that the interchange is justified.

Heavy-tailed distributions are the standard warning. Symmetry alone does not produce a finite expectation. In particular, a Cauchy random variable has no ordinary finite mean even though its density is symmetric.

## Recognition Patterns

Use expectation directly when the question asks for a fair price, an average payoff, or an average distance from a known distribution.

Use **LOTUS** when the target is $E[g(X)]$ and the law of $X$ is easier than the law of $g(X)$.

Use **linearity** when the target can be written as a sum.

Use **indicator variables** when the target is a count: number of matches, distinct objects, occupied boxes, successes, inversions, crossings, or other yes/no contributions.

Use **independent-product factorization** only when a product structure and the required independence are actually present.

## Common Mistakes

- Assuming linearity requires independence. It does not.
- Factoring $E[XY]$ without checking independence or another reason that covariance is zero.
- Treating the expected value as an outcome that must be attainable.
- Deriving a transformed density when LOTUS would compute the requested expectation directly.
- Writing down an expectation before checking that it exists.
- Refusing to use indicators because overlapping events are dependent.

## Interview Checks

<details>
<summary>A fair die</summary>

A fair six-sided die pays its face value in dollars. What is the fair one-shot ticket price?

$$
E[X]=\frac{1+2+3+4+5+6}{6}=3.5.
$$

The answer need not itself be a possible die outcome.

</details>

<details>
<summary>Dependent indicators</summary>

A length-$n$ coin sequence is scanned for a fixed pattern in every possible starting position. Neighboring pattern-occurrence indicators may overlap and therefore be dependent. Can their expectations still be added?

Yes. If $N=\sum_j I_j$, then

$$
E[N]=\sum_jE[I_j]
$$

without any independence assumption.

</details>

<details>
<summary>Product expectation</summary>

If $X$ and $Y$ are independent with $E[X]=2$ and $E[Y]=3$, what is $E[XY]$?

Independence permits factorization, so $E[XY]=6$. If independence were not given, the information would be insufficient in general.

</details>

<details>
<summary>Existence check</summary>

A distribution is symmetric about zero. Does that alone imply $E[X]=0$?

No. First verify that the expectation exists. The Cauchy distribution is the classic counterexample: symmetry does not create a finite ordinary mean.

</details>
