---
problemId: expectation-variance-covariance-006
title: "Geometric Waiting Time: Mean and Variance"
description: Derive the mean and variance of the trial number of the first success from series identities and first-step expectation recursion.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [expectation-variance-covariance-algebra, common-probability-distributions, conditional-expectation-tower-property]
techniques: [conditioning]
prerequisites: []
relatedProblems: [coupon-collector-expectations]
family: geometric-moment-derivation
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Independent Bernoulli trials have success probability $p\in(0,1)$. Let $N$ be the number of trials up to and including the first success, so

$$
P(N=k)=(1-p)^{k-1}p,\qquad k=1,2,\ldots.
$$

Derive $E[N]$ and $\operatorname{Var}(N)$ rather than quoting the standard formulas.

Give at least two ways to see the mean, and derive the variance from first principles.

## Think Before Revealing

There are two natural representations. One starts from the power series for a geometric sum. The other conditions on the first trial and uses the fact that after a failure the problem restarts.

<details>
<summary>Hint 1</summary>

Write $q=1-p$. From $\sum_{k=0}^{\infty}q^k=1/(1-q)$, differentiate with respect to $q$ to generate sums involving $kq^{k-1}$.

</details>

<details>
<summary>Hint 2</summary>

For the first-step route, let $N'$ be an independent copy of $N$. Then

$$
N=\begin{cases}
1,&\text{with probability }p,\\
1+N',&\text{with probability }q.
\end{cases}
$$

Use this once for $E[N]$ and again after squaring for $E[N^2]$.

</details>

## Solution

Let

$$
q=1-p.
$$

### Route 1: power-series derivation of the mean

By definition,

$$
E[N]=\sum_{k=1}^{\infty}kq^{k-1}p.
$$

The geometric series gives

$$
\sum_{k=0}^{\infty}q^k=\frac{1}{1-q},\qquad |q|<1.
$$

Differentiate:

$$
\sum_{k=1}^{\infty}kq^{k-1}=\frac{1}{(1-q)^2}.
$$

Multiplying by $p$ and using $1-q=p$,

$$
E[N]
=p\frac{1}{(1-q)^2}
=\frac{1}{p}.
$$

Thus

$$
\boxed{E[N]=\frac1p}.
$$

In plain notation: **E[N] = 1/p**.

### Route 2: first-step recursion for the mean

Condition on the first trial. A success ends the process at $N=1$. A failure consumes one trial and leaves an independent fresh copy $N'$ of the original waiting time:

$$
N=1+\mathbf1_{\{\text{first trial fails}\}}N'.
$$

Taking expectations,

$$
E[N]=1+qE[N].
$$

Therefore

$$
pE[N]=1,
$$

again giving

$$
E[N]=\frac1p.
$$

This first-step equation exposes the memoryless structure of the geometric waiting time.

### Second moment and variance

Use the explicit first-step cases:

$$
E[N^2]
=p\cdot1^2+qE[(1+N')^2].
$$

Since $N'$ has the same distribution as $N$,

$$
E[N^2]
=p+q\left(1+2E[N]+E[N^2]\right).
$$

Because $p+q=1$,

$$
E[N^2]=1+2qE[N]+qE[N^2].
$$

Move the final term to the left:

$$
pE[N^2]=1+2q\frac1p.
$$

Hence

$$
E[N^2]
=\frac1p+\frac{2q}{p^2}
=\frac{2-p}{p^2}.
$$

Now

$$
\operatorname{Var}(N)
=E[N^2]-E[N]^2
=\frac{2-p}{p^2}-\frac1{p^2}
=\frac{1-p}{p^2}.
$$

Therefore

$$
\boxed{\operatorname{Var}(N)=\frac{1-p}{p^2}}.
$$

In plain notation: **Var(N) = (1-p)/p^2**.

For a fair coin, $p=1/2$, so

$$
E[N]=2,\qquad E[N^2]=6,\qquad \operatorname{Var}(N)=2.
$$

## Why This Matters

The point is not to memorize a distribution table. This problem connects three reusable skills:

- generating-series differentiation;
- first-step expectation recursion;
- variance from the first two raw moments.

The geometric distribution is especially useful because the restart structure makes the recursion transparent and then reappears inside coupon-collector and waiting-time decompositions.

## Common Mistakes

- Using the alternative geometric convention that counts failures before the first success without adjusting the formulas.
- Forgetting that this $N$ has support $\{1,2,\ldots\}$.
- Writing $E[N^2]=E[N]^2$.
- Squaring $N=1+N'$ on the failure branch but dropping the cross term $2N'$.
- Replacing $q$ by $p$ in the failure branch.
- Quoting the variance formula without being able to derive it when an interviewer asks for first principles.

## Extensions

A tail-sum route gives another quick derivation of the mean. Since

$$
P(N\ge k)=q^{k-1},
$$

for a positive integer-valued random variable,

$$
E[N]=\sum_{k=1}^{\infty}P(N\ge k)
=\sum_{k=1}^{\infty}q^{k-1}
=\frac1p.
$$

The same restart logic extends to negative-binomial waiting times and to decompositions where several geometric stages are added together.
