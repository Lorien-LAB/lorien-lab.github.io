---
problemId: random-variables-distributions-001
title: Competing Exponential Waiting Times
description: Compare two independent exponential waiting times and derive the probability that one event occurs before the other from their rates.
date: 2026-08-18
domain: Mathematics & Statistics
category: Probability
subcategories: [Random Variables, Distributions]
tags: [Probability, Random Variables, Distributions, Interview]
quantInterviewTopics: [probability-statistics, random-variables-distributions]
concepts: [common-probability-distributions]
techniques: []
prerequisites: []
relatedProblems: []
family: competing-exponential-waits
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Two independent waiting times `X` and `Y` are exponentially distributed. Their means are

`E[X]=6` minutes and `E[Y]=8` minutes.

1. What is `P(Y>X)`?
2. Generalize your answer when `X~Exp(lambda_X)` and `Y~Exp(lambda_Y)` are independent.
3. Why is it safer to work with **rates** rather than compare the two means directly?

## Think Before Revealing

An Exponential mean is the reciprocal of its rate. The event `Y>X` means that the event governed by `X` happens first.

<details>
<summary>Hint 1</summary>

Condition on the value of `X=x`. Then `Y>X` becomes `Y>x`, whose probability is the Exponential survival function.

</details>

<details>
<summary>Hint 2</summary>

Use `f_X(x)=lambda_X exp(-lambda_X x)` and `P(Y>x)=exp(-lambda_Y x)`, then integrate over `x>=0`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

The means imply the rates

`lambda_X=1/6`,

`lambda_Y=1/8`.

Because `X` and `Y` are independent,

`P(Y>X)=integral_0^infinity P(Y>x) f_X(x) dx`.

For an Exponential variable,

`P(Y>x)=exp(-lambda_Y x)`

and

`f_X(x)=lambda_X exp(-lambda_X x)`.

Therefore

`P(Y>X)=integral_0^infinity lambda_X exp[-(lambda_X+lambda_Y)x] dx`

`=lambda_X/(lambda_X+lambda_Y)`.

Substituting the two rates,

`P(Y>X)=(1/6)/[(1/6)+(1/8)]`

`=(1/6)/(7/24)`

`=4/7`.

So

**`P(Y>X)=4/7`.**

### General formula

For independent

`X~Exp(lambda_X)`, `Y~Exp(lambda_Y)`,

we have

`P(Y>X)=P(X<Y)=lambda_X/(lambda_X+lambda_Y)`.

Similarly,

`P(X>Y)=lambda_Y/(lambda_X+lambda_Y)`.

The two probabilities sum to one because independent continuous waiting times tie with probability zero.

### Why the rate interpretation matters

The smaller mean corresponds to the larger rate. Here `X` has mean `6`, so it has the faster rate `1/6`; `Y` has mean `8`, so its rate is only `1/8`. It is therefore reasonable that `X` wins the race more than half the time.

A compact interpretation is:

> In a race of independent Exponential clocks, the probability that a clock rings first equals its rate divided by the sum of all competing rates.

This statement uses **rates**, not means. If only means are supplied, invert them first.

</details>

## Why This Matters

Competing Exponential clocks are a reusable model for arrival races, credit/default times, queueing events, and simple intensity models. The interview skill is not the integral itself; it is recognizing that independent Exponential waiting times admit a clean **rate-share** comparison.

The same reasoning generalizes immediately to `m` independent Exponential clocks with rates `lambda_1,...,lambda_m`:

`P(clock i is first)=lambda_i/(lambda_1+...+lambda_m)`.

## Common Mistakes

- Using the means `6` and `8` directly in the rate-share formula and getting `6/(6+8)`.
- Reversing the event: `Y>X` means `X` occurs first.
- Forgetting independence when replacing the conditional survival probability by the marginal survival function.
- Integrating the density of `Y` without enforcing the event `Y>X`.
- Assuming the larger mean is more likely to occur first; a larger Exponential mean means a **slower** clock.

## Extensions

1. For three independent Exponential clocks with rates `2`, `3`, and `5`, find the probability each is first.
2. Show that `min(X,Y)` is Exponential with rate `lambda_X+lambda_Y`.
3. Derive the joint probability that `X` is first and the first event occurs after time `t`.
4. What breaks if the waiting times are dependent?
5. Compare this rate-share shortcut with two arbitrary positive waiting-time distributions. Which special Exponential structure disappears?
