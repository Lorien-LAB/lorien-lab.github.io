---
problemId: probability-foundations-003
title: Displaced Passenger and the Last Seat
description: Reduce the random-seat process to two absorbing special seats and use symmetry to find the last passenger's success probability.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Probability Foundations, Symmetry]
tags: [Probability, Symmetry, State Reduction, Interview]
quantInterviewTopics: [probability-statistics, probability-foundations]
concepts: [symmetry-equiprobability-geometric-probability]
techniques: []
prerequisites: []
relatedProblems: []
family: displaced-passenger
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

There are `n` passengers and `n` assigned seats. Passenger 1 ignores the assignment and chooses one of the `n` seats uniformly at random. Each later passenger takes the assigned seat if it is free; otherwise that passenger chooses uniformly among the remaining free seats.

What is the probability that passenger `n` gets the assigned last seat?

## Think Before Revealing

Most seats are temporary states. Identify which choices permanently decide the outcome for the last passenger.

<details>
<summary>Hint 1</summary>

Focus on two special seats: **seat 1**, belonging to the first passenger, and **the last passenger's seat**.

</details>

<details>
<summary>Hint 2</summary>

If a displaced passenger chooses an intermediate passenger's seat, the same problem reappears with fewer passengers. The chain ends only when one of the two special seats is chosen.

</details>

<details>
<summary>Show Solution</summary>

## Solution

There are two seats that can terminate the displacement chain:

- **seat 1**, the first passenger's assigned seat;
- **the last passenger's seat**.

If passenger 1 chooses seat 1 immediately, everyone else sits correctly and the last passenger succeeds.

If passenger 1 chooses the last seat immediately, the last passenger fails.

What if passenger 1 chooses some intermediate seat `k`? Passengers `2,...,k-1` sit correctly. Passenger `k` then finds the assigned seat occupied and must choose uniformly among the remaining free seats. At that moment, the only outcome-deciding special seats are still seat 1 and the last passenger's seat; choosing another intermediate seat simply passes the displacement forward and recreates the same reduced state.

Thus we do not need to track every seating permutation. The process continues until one of the two special seats is selected. Conditional on the current set of available choices, those two special seats play symmetric roles in terminating the chain: the first one reached is equally likely to be seat 1 or the last seat.

- If **seat 1** is selected first, the displacement chain closes and the last passenger's assigned seat remains free.
- If **the last seat** is selected first, the last passenger loses that seat.

Therefore

`P(last passenger gets the correct seat) = 1/2`.

So the answer is

**`1/2`.**

## Why This Problem Matters

The main interview skill is **state reduction**. A naive approach tries to track the full random seating arrangement. The useful state is much smaller: which of two absorbing special seats is encountered first.

This idea appears throughout probability and stochastic-process interviews. When many intermediate states merely reproduce the same structure, identify the absorbing states and discard irrelevant history.

## Common Mistakes

- **Enumerating full seat permutations.** The process contains far more symmetry than that calculation uses.
- **Treating every remaining seat as equally important.** Intermediate seats only transfer the displacement; seat 1 and the last seat decide the final event.
- **Claiming `1/2` without identifying the symmetry.** The conclusion needs the two-special-seat reduction.
- **Assuming later passengers choose randomly even when their seats are free.** Only a displaced passenger randomizes.

## Extensions & Variants

### Small-state recursion check

Let `p_m` denote the success probability in a reduced state with `m` relevant free seats including the two special seats. A random choice either hits the success special seat, hits the failure special seat, or moves to a smaller copy of the same problem. The two terminal choices have equal weights, and the intermediate contributions inherit the same success probability. Substituting `p_m=1/2` satisfies the recursion for every `m`, confirming the symmetry argument.

### Why the number of passengers does not matter

As long as `n>=2`, increasing the number of intermediate seats only creates more ways to postpone the decisive choice. It does not change the symmetry between the two absorbing special seats, so the success probability remains `1/2`.

</details>
