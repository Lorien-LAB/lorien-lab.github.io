---
title: Conditional Expectation and the Tower Property
description: Condition expectations on events, partitions, and random variables, then use total expectation and tower-property reasoning to simplify multi-stage random experiments.
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

Conditional expectation asks for the average value of a random quantity after some information is known. It is the expectation-side analogue of conditioning probabilities, but it has its own algebra and its own interview patterns.

A useful way to think about it is:

> choose information that makes the remaining experiment simpler, compute the conditional expectation there, then average back over that information.

That principle becomes the law of total expectation and, more generally, the tower property.

## Conditioning on an Event

For an event $A$ with $P(A)>0$,

$$
E[X\mid A]
$$

is the expected value of $X$ under the conditional law given $A$.

In a discrete setting,

$$
E[X\mid A]=\sum_x x\,P(X=x\mid A).
$$

Conditioning changes the relevant probability distribution; it does not merely insert the event label into an unconditional expectation.

## Conditioning on a Partition

Suppose $A_1,\dots,A_m$ form a partition of the sample space with positive probabilities. Then

$$
E[X]=\sum_{i=1}^m P(A_i)E[X\mid A_i].
$$

This is the **law of total expectation**. It is often the cleanest solution to branching experiments: condition on the first roll, first draw, first arrival, or first state that determines what happens next.

The key modeling choice is the partition. A good partition makes each conditional problem much simpler than the original one.

## Conditional Expectation Given a Random Variable

When conditioning on a random variable $Y$, the object

$$
E[X\mid Y]
$$

is itself a random variable: once the value of $Y$ is known, it becomes a function of that observed value.

In a discrete case one may write

$$
g(y)=E[X\mid Y=y],
$$

so that

$$
E[X\mid Y]=g(Y).
$$

This viewpoint is essential. Conditional expectation given $Y$ is not usually a single constant before $Y$ is observed.

## Law of Total Expectation

A compact form of total expectation is

$$
E\big[E[X\mid Y]\big]=E[X].
$$

The inner expectation uses the information in $Y$; the outer expectation averages over the possible values of $Y$.

This identity is powerful because the inner conditional expectation can be much easier to compute than the original target.

For example, if a random count is easy to understand after conditioning on how many trials occurred, compute that conditional mean first and then average over the trial count.

## Tower Property

If one information set contains another, averaging a conditional expectation back down to the coarser information gives the coarser conditional expectation. In a common random-variable notation,

$$
E\big[E[X\mid Y,Z]\mid Y\big]=E[X\mid Y].
$$

Taking another expectation gives

$$
E\big[E[X\mid Y]\big]=E[X].
$$

This is the **tower property**. It lets multi-stage random experiments be solved one information layer at a time.

The order matters: the outer conditioning must correspond to information contained in the inner conditioning information.

## First-Step Expectation Recursion

Sometimes conditioning on the first random action leads back to the same unknown expected value. Then total expectation becomes a fixed-point equation.

If an experiment earns an immediate expected contribution $a$ and restarts with probability $q$, then a value $V$ may satisfy

$$
V=a+qV.
$$

Solving gives

$$
V=\frac{a}{1-q}
$$

when $q<1$ and the expectation is finite.

A different common form reduces the problem size:

$$
E_n=E_{n-1}+c_n.
$$

Both are ordinary expectation recursions when the conditioning variable leaves only a scalar unknown or a simple lower-dimensional state.

## Boundary: When This Becomes a Stochastic-Process Problem

First-step conditioning is a technique, not a topic label. The mathematical owner depends on what remains after the first step.

A scalar fixed-point expectation such as $V=a+qV$ naturally belongs with conditional expectation and total expectation.

A state-rich hitting-time system such as

$$
h(i)=1+\sum_j p_{ij}h(j)
$$

for many Markov states is better understood as Markov-chain or stochastic-process first-step analysis. Likewise, martingale optional stopping is not reduced to this page simply because it computes an expectation.

This boundary keeps elementary expectation recursion connected to, but distinct from, `first-step-analysis` for random walks and Markov chains.

## Common Mistakes

- Treating $E[X\mid Y]$ as a constant before $Y$ is observed.
- Forgetting the probability weights in a partition-based total-expectation calculation.
- Conditioning on information that does not actually simplify the remaining experiment.
- Writing a recursion without defining clearly what the unknown expected value means.
- Applying the tower property to information sets that are not nested in the required direction.
- Calling every first-step recursion a Markov-chain problem, or conversely hiding a genuinely state-rich Markov problem inside a scalar expectation page.

## Interview Checks

<details>
<summary>Total expectation over a partition</summary>

Suppose an event $A$ occurs with probability $p$. Conditional on $A$, a payoff has mean $u$; conditional on $A^c$, it has mean $v$. What is the unconditional mean?

$$
E[X]=p\,u+(1-p)v.
$$

</details>

<details>
<summary>Tower property</summary>

What is $E[E[X\mid Y]]$ when $X$ is integrable?

$$
E[E[X\mid Y]]=E[X].
$$

The inner conditional expectation is a function of $Y$; the outer expectation averages that function over $Y$.

</details>

<details>
<summary>Simple first-step recursion</summary>

An experiment gives expected immediate contribution $3$ and then restarts independently with probability $1/4$. If $V$ is the total expected payoff, what equation should you solve?

$$
V=3+\frac14V,
$$

so $V=4$.

</details>

<details>
<summary>Expectation topic or stochastic process?</summary>

You condition on the first move of a random walk and obtain one unknown expected value for every lattice position. Is this merely a scalar tower-property exercise?

No. The conditioning idea is shared, but the collection of state-dependent equations is Markov / stochastic-process first-step analysis. The topic should follow the main machinery, not the presence of $E[\cdot]$ notation.

</details>
