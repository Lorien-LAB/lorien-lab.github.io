---
problemId: expectation-variance-covariance-005
title: Expected Loops from Random Pairings
description: Reduce a random-pairing loop problem by one component at a time and solve the resulting expectation recurrence.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [conditional-expectation-tower-property]
techniques: [recursion-problem-solving]
prerequisites: []
relatedProblems: [recursive-dice-game-expected-payoff]
family: expectation-size-recursion
mathDifficulty: 3
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 18
status: solved
featured: false
---

## Problem

There are $n$ separate open strands, each with two loose ends. Repeatedly choose two currently loose ends uniformly at random and tie them together. Continue until no loose ends remain.

The final structure is a collection of closed loops. What is the expected number of loops?

## Think Before Revealing

Focus on one chosen loose end. Its partner is uniform among the other $2n-1$ loose ends. There is exactly one partner that closes the strand containing the chosen end; every other choice merges that strand with another open strand.

<details>
<summary>Hint 1</summary>

After the first tie, regardless of whether you close a loop or merge two strands, the remaining open structure has effectively $n-1$ open strands/chains.

</details>

<details>
<summary>Hint 2</summary>

The first tie creates an immediate loop with probability $1/(2n-1)$. If $E_n$ is the expected final number of loops starting from $n$ open strands, condition on that first tie.

</details>

## Solution

Let $E_n$ be the expected number of final loops when there are $n$ open strands/chains.

Pick one loose end. Among the other $2n-1$ loose ends, exactly one is the other end of the same open chain.

### Case 1: close the current chain

With probability

$$
\frac{1}{2n-1},
$$

the chosen partner is the other end of the same chain. That tie immediately creates one closed loop. Removing that loop leaves $n-1$ open chains to process.

The conditional expected total is therefore

$$
1+E_{n-1}.
$$

### Case 2: merge two different chains

With probability

$$
\frac{2n-2}{2n-1},
$$

the chosen partner belongs to a different chain. The tie joins two open chains into one longer open chain. No loop is created immediately, and the number of open chains again falls from $n$ to $n-1$.

The conditional expected total is

$$
E_{n-1}.
$$

Applying total expectation,

$$
E_n
=\frac{1}{2n-1}(1+E_{n-1})
+\frac{2n-2}{2n-1}E_{n-1}.
$$

Hence

$$
\boxed{E_n=E_{n-1}+\frac{1}{2n-1}}.
$$

In plain notation: **E_n = E_{n-1} + 1/(2n-1)**.

The base case is $E_1=1$, because the two ends of the only strand must be tied together to form one loop. Iterating the recurrence gives

$$
E_n
=1+\frac13+\frac15+\cdots+\frac{1}{2n-1}.
$$

Therefore

$$
\boxed{E_n=\sum_{k=1}^{n}\frac{1}{2k-1}}.
$$

This is the partial **odd harmonic** sum.

## Why This Matters

The puzzle looks like a complicated random matching problem over $(2n-1)!!$ possible pairings. The useful simplification is to condition on one local tie and notice that **both branches reduce to the same smaller problem**, with only an immediate loop indicator distinguishing them.

That is a broadly useful recursive-expectation pattern:

$$
E_n=E_{n-1}+\text{expected immediate contribution}.
$$

It is not necessary to enumerate full pairings or build a Markov chain over detailed connection states.

## Common Mistakes

- Counting all pairings explicitly instead of exploiting the one-step reduction.
- Thinking a merge leaves $n-2$ open objects; two chains merge into one, so the open-chain count decreases by exactly one.
- Using probability $1/(2n)$ instead of $1/(2n-1)$ after fixing the first endpoint.
- Adding a loop contribution on the merge branch.
- Forgetting the base case $E_1=1$.
- Treating the recurrence as stochastic-process machinery when the full state collapses to the single size parameter $n$.

## Extensions

The odd harmonic sum can be related to ordinary harmonic numbers:

$$
\sum_{k=1}^{n}\frac{1}{2k-1}
=H_{2n}-\frac12H_n.
$$

Thus for large $n$,

$$
E_n\approx \frac12\log n+\log 2+\frac{\gamma}{2}.
$$

The expected number of loops therefore grows only logarithmically even though the number of possible random pairings grows extremely rapidly.
