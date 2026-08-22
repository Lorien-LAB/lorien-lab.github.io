---
problemId: expectation-variance-covariance-004
title: Recursive Dice Game Expected Payoff
description: Condition on the first roll and solve a self-consistency equation for the expected payoff of a dice game that may restart.
date: 2026-08-19
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Variance, Covariance]
tags: [Probability, Expectation, Variance, Covariance, Interview]
quantInterviewTopics: [probability-statistics, expectation-variance-covariance]
concepts: [conditional-expectation-tower-property]
techniques: [conditioning]
prerequisites: []
relatedProblems: [conditional-dice-expectation, expected-loops-from-random-pairings]
family: recursive-expectation-fixed-point
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

You repeatedly roll a fair six-sided die.

- On every roll, you receive the number shown as dollars.
- If the roll is 1, 2, or 3, the game stops after that payment.
- If the roll is 4, 5, or 6, you receive that payment and then roll again under the same rules.

What is the expected total payoff?

## Think Before Revealing

The game can restart after the first roll. Define the unknown expected value from a fresh start, then condition on the first roll. The continuation value after a 4, 5, or 6 is the same unknown you started with.

<details>
<summary>Hint 1</summary>

Let $V$ be the expected total payoff from a fresh start. The first roll always pays its face value, whose expectation is $3.5$.

</details>

<details>
<summary>Hint 2</summary>

With probability $1/2$, the first roll is 4, 5, or 6 and the game restarts after the current payment. This gives a fixed-point equation of the form $V=3.5+\frac12V$.

</details>

## Solution

Let $V$ denote the expected total payoff from the start of the game.

Condition on the first roll. The expected immediate payment is simply the mean of a fair die:

$$
E[\text{first payment}]=\frac{1+2+3+4+5+6}{6}=\frac72.
$$

If the first roll is 1, 2, or 3, the game stops. If it is 4, 5, or 6, which happens with probability $3/6=1/2$, the game returns to exactly the same probabilistic state after the current payment. Therefore the expected continuation value is $V$ on that branch.

The self-consistency equation is

$$
V=\frac72+\frac12V.
$$

Hence

$$
\frac12V=\frac72,
$$

so

$$
\boxed{V=7}.
$$

A fully expanded first-step calculation gives the same result:

$$
V
=\frac16(1+2+3)+\frac16[(4+V)+(5+V)+(6+V)]
=\frac72+\frac12V.
$$

The important move is recognizing that the continuation branch has the **same value $V$**, so total expectation becomes a fixed-point equation.

## Why This Matters

This problem is a compact model of recursive expectation. It trains you to define the value of a random experiment before conditioning on the first action.

It is deliberately different from `conditional-dice-expectation`, which is a one-step branching expectation with no return to the original state. Here the self-reference is the defining insight.

This is still elementary expectation machinery: there is only one scalar continuation value. A state-dependent family of values indexed by many states would push the problem toward Markov-chain or dynamic-programming analysis.

## Common Mistakes

- Counting only the terminal roll and forgetting that 4, 5, and 6 also pay immediately.
- Adding another $V$ after rolls 1, 2, or 3 even though the game stops.
- Computing the first-roll mean as $3.5$ and stopping there, ignoring continuation.
- Treating repeated rolls as a fixed number of stages rather than solving the fixed-point expectation.
- Confusing a one-scalar recursion with a full optimal-stopping or Markov-state problem.

## Extensions

If a generic one-step game pays an immediate random reward $R$ with mean $a$ and independently restarts with probability $q<1$, then

$$
V=a+qV
$$

and therefore

$$
V=\frac{a}{1-q}.
$$

For the die game, $a=7/2$ and $q=1/2$, producing $V=7$.

A useful follow-up is to change the continuation rule so that the future distribution depends on the last roll. Then one scalar $V$ may no longer be enough, revealing the boundary between elementary recursive expectation and state-based stochastic analysis.
