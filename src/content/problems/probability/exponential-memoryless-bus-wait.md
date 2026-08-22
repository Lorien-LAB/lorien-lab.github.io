---
problemId: random-variables-distributions-002
title: Memoryless Bus Waiting Time
description: Use exponential memorylessness to determine the remaining waiting time after arriving during an ongoing random arrival interval.
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
family: exponential-memorylessness
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Buses have been arriving for a long time according to a stationary constant-rate model whose interarrival times are independent Exponential random variables with mean `10 minutes`. You arrive at the station at a typical random time.

1. What is your expected **additional waiting time** until the next bus?
2. Under the stationary framing, what is the expected time since the previous bus?
3. Why is it not a contradiction that these two expectations add to `20 minutes` even though the mean interarrival time is only `10 minutes`?

## Think Before Revealing

The key property is not merely the mean. An Exponential waiting time forgets how much time has already elapsed.

<details>
<summary>Hint 1</summary>

If `T~Exp(lambda)`, compare `P(T>s+t | T>s)` with `P(T>t)`.

</details>

<details>
<summary>Hint 2</summary>

For the apparent `20` versus `10` paradox, remember that a randomly chosen observation time is more likely to fall inside a long interarrival interval than a short one.

</details>

<details>
<summary>Show Solution</summary>

## Solution

An Exponential variable with mean `10` has rate

`lambda=1/10` per minute.

Its survival function is

`P(T>t)=exp(-lambda t)`.

For `s,t>=0`,

`P(T>s+t | T>s)`

`=P(T>s+t)/P(T>s)`

`=exp[-lambda(s+t)]/exp(-lambda s)`

`=exp(-lambda t)`

`=P(T>t)`.

This is the **memoryless property**.

### Additional waiting time

Suppose the current interarrival interval has already lasted `s` minutes without the next bus appearing. Conditional on that information, the remaining wait has the same Exponential distribution as a fresh wait.

Therefore its expected value remains

`1/lambda=10 minutes`.

So the expected **additional waiting time is 10 minutes**.

### Time since the previous bus

Under the stationary observation-time framing, the backward age has the same mean as the forward residual waiting time. Therefore the expected time since the previous bus is also

`10 minutes`.

The cleanest way to understand this statement is through equilibrium renewal geometry: a typical observation time samples interarrival intervals in proportion to their length. For an Exponential interarrival time `T`,

`E[T]=10`,

`E[T^2]=2(E[T])^2=200`.

The expected residual life seen at a stationary random observation time is

`E[T^2]/(2E[T])=200/(2*10)=10`.

The expected backward age is the same by stationarity.

### Why this does not contradict a 10-minute mean interval

If both the expected age and expected residual time are `10`, the interval containing a random observation time has expected total length `20`.

That interval is **not** an ordinary randomly selected interarrival interval. Longer intervals are more likely to contain your randomly chosen arrival time. This is a length-bias or inspection-paradox effect.

Thus there is no contradiction:

- ordinary interarrival interval mean: `10` minutes;
- interval containing a typical random observation time: longer on average;
- expected age at observation: `10` minutes;
- expected residual wait: `10` minutes.

The Exponential distribution is special because the forward residual wait remains a fresh Exponential wait regardless of elapsed time.

</details>

## Why This Matters

This problem tests whether you distinguish three ideas that are often mixed together:

- the Exponential **memoryless property**;
- the **residual life** seen after some waiting has already occurred;
- length-biased sampling of intervals at a random observation time.

The same distinction matters in queues, reliability, survival models, and intensity-based finance. A correct answer depends on the assumed waiting-time distribution and observation protocol, not just on an average arrival interval.

## Common Mistakes

- Saying the additional wait must be shorter because you have “already waited for a while.” That intuition is false under an Exponential model.
- Saying the remaining wait is always half the mean interarrival time.
- Treating a randomly observed interval as if it were an ordinary randomly selected interval.
- Concluding that every arrival model is memoryless. Memorylessness is a special Exponential property in continuous time.
- Quoting `E[T^2]/(2E[T])` without stating the stationary/equilibrium observation framing.
- Turning the problem into a tutorial about the entire underlying arrival process instead of focusing on the waiting-time distribution.

## Extensions

1. If the Exponential mean is `m`, show that the expected additional waiting time is always `m`, regardless of elapsed waiting time.
2. For a deterministic interarrival time of exactly `10` minutes and a uniformly random arrival time within a cycle, what is the expected residual wait?
3. For a general stationary renewal model with interarrival time `T`, interpret `E[T^2]/(2E[T])` and explain why high variance increases the observed residual wait.
4. Compare an Exponential model with a Gamma waiting-time model. Which one is memoryless?
5. Explain how the inspection paradox becomes more severe when the interarrival distribution has a heavy right tail.
