---
problemId: expectation-variance-covariance-012
title: Fair Box-Opening Price by Expectation
description: Use the expected position of a hidden prize in a random opening order to derive the fair per-box cost of the game.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [expectation-linearity-indicators]
techniques: []
prerequisites: []
relatedProblems: [expected-position-of-first-special-card]
family: fair-value-expected-position
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

There are $n$ sealed, indistinguishable boxes. Exactly one contains a prize worth $V$; before play, each box is equally likely to contain it.

You may open boxes one at a time. Each opened box costs $X$. If you find the prize, you receive $V$ and the game ends. After opening an empty box, you may either stop or continue.

What per-box cost $X$ makes the game fair at the start?

## Think Before Revealing

The problem looks like optimal stopping because you are allowed to quit. First ask whether the continuation decision actually creates a nontrivial policy at the fair starting price.

<details>
<summary>Hint 1</summary>

If you continue until success, the location of the winning box in your opening order is uniform on $\{1,\ldots,n\}$.

</details>

<details>
<summary>Hint 2</summary>

Let $K$ be the number of boxes opened until the prize is found. Compute $E[K]$, set expected prize minus expected total cost equal to zero, then verify that after a miss continuation is still worthwhile at that price.

</details>

## Solution

Because the boxes are symmetric, fix any opening order. The prize is equally likely to occupy each position in that order, so

$$
K\sim \operatorname{Unif}\{1,2,\ldots,n\}.
$$

Therefore

$$
E[K]=\frac{1+2+\cdots+n}{n}=\frac{n+1}{2}.
$$

In plain notation: **E[K] = (n+1)/2**.

If the player continues until finding the prize, the expected net payoff is

$$
V-XE[K]
=V-X\frac{n+1}{2}.
$$

Fairness at the start requires this expectation to be zero:

$$
V-X\frac{n+1}{2}=0.
$$

Hence

$$
\boxed{X_{\text{fair}}=\frac{2V}{n+1}}.
$$

In plain notation: **X_fair = 2V/(n+1)**.

### Why the option to stop does not change the fair-price calculation

We must still verify that “continue until success” is rational at the fair price.

Suppose one box has been opened and was empty. There are now $n-1$ boxes left, exactly one containing $V$. If you continue until success, the expected additional number of boxes opened is

$$
\frac{n}{2}.
$$

At the starting fair price $X=2V/(n+1)$, the expected continuation value is

$$
V-\frac{n}{2}\frac{2V}{n+1}
=\frac{V}{n+1}>0.
$$

After further misses, fewer boxes remain and the expected future opening cost falls again. Thus once the game is worth starting at the fair boundary, continuation after a miss is strictly more attractive.

So the apparent **optimal stopping** feature collapses: there is no nontrivial threshold policy to solve at the fair starting price. The primary mathematics is expected position and fair value.

## Why This Matters

Interview questions often add a decision wrapper around a simpler probabilistic core. Before launching dynamic programming, check whether symmetry or monotonicity makes the policy trivial.

This problem also connects fair pricing to an expected stopping position: the same random-order quantity that appears in first-special-object problems becomes a monetary fair-value calculation here.

## Common Mistakes

- Setting $nX=V$ as though all $n$ boxes are always opened.
- Ignoring the stopping option without checking whether continuing remains rational.
- Treating the winning position as geometric; sampling is without replacement and exactly one position is winning.
- Assuming the fair cost is $V/n$ instead of dividing $V$ by the expected number of paid openings.
- Turning the problem into a full optimal-stopping dynamic program before testing whether the continuation policy collapses.

## Extensions

For $n=4$ and $V=100$,

$$
E[K]=\frac52,
$$

so

$$
X_{\text{fair}}=\frac{100}{2.5}=40.
$$

More generally, if the boxes have unequal prior probabilities or opening costs, symmetry disappears. Then the opening order itself matters, and an ordering or dynamic-programming problem can genuinely emerge.
