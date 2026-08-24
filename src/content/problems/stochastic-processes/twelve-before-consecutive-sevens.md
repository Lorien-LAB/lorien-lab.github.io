---
problemId: random-walks-markov-chains-001
title: Twelve Before Consecutive Sevens
description: Analyze a two-dice race between a total of 12 and two consecutive totals of 7 with a compressed Markov state.
date: 2026-08-24
domain: Mathematics & Statistics
category: Stochastic Processes
subcategories: [Random Walks, Markov Chains]
tags: [Probability, Stochastic Processes, Markov Chains, Interview]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
concepts: [finite-state-markov-chains]
techniques: [markov-chain-state-compression, first-step-analysis]
prerequisites: []
relatedProblems: [coin-pattern-hitting-times, recursive-dice-game-expected-payoff]
family: competing-streak-hazards
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Independently roll two fair six-sided dice until either a total of 12 appears or totals of 7 appear on two consecutive rolls. What is the probability that 12 appears first?

## Think Before Revealing

The event “the previous roll was a seven” changes what the next seven means, so one scalar hazard comparison loses state. The smallest useful state records whether the current path ends with exactly one seven.

<details>
<summary>Hint 1</summary>

Let (x) be the success probability with no trailing seven and (y) the success probability after one trailing seven.

List every outcome of the next roll from each state, including the outcomes that keep or reset the current state. The process starts in state (x), not state (y).

</details>

<details>
<summary>Hint 2</summary>

A total of 12 has probability (1/36), a total of 7 has probability (1/6), and every other result has probability (29/36). A non-seven, non-twelve result resets the seven streak.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let (x) denote the probability that 12 wins when there is no trailing seven, and let (y) denote the same probability immediately after one seven. The initial state is (x). From state (x), a 12 succeeds, an ordinary result returns to (x), and a seven moves to (y). From state (y), a 12 succeeds, an ordinary result resets to (x), and a seven ends the experiment in failure. First-step analysis therefore gives

```text
x = 1/36 + (29/36)x + (1/6)y
y = 1/36 + (29/36)x
```

The second equation has no added term for another seven because its continuation value is zero. Multiplying by 36 gives

```text
7x - 6y = 1
36y - 29x = 1
```

From the second equation, (y=(1+29x)/36). Substituting into the first gives

```text
7x - (1 + 29x)/6 = 1
42x - 1 - 29x = 6
13x = 7
```

Hence

```text
x = 7/13
```

This is the probability from the actual initial condition, before any roll. The shortcut that treats (1/36) and ((1/6)^2) as single-step competing hazards is invalid: the two-seven event spans overlapping time windows and carries a trailing-seven state from one roll to the next.

Stopping occurs almost surely. In each disjoint two-roll block, the event “both rolls total seven” has positive probability (1/36), independently of earlier blocks. Therefore the probability of avoiding that terminal event through (m) such blocks is at most ((35/36)^m), which tends to zero. Adding the possibility of a 12 can only make stopping sooner.

## Why This Matters

The problem shows how one bit of memory turns an overlapping streak event into a finite homogeneous Markov chain. It also illustrates the reliable interview workflow: identify the missing path memory, make that memory a state, condition once, and solve the resulting linear system from the correct initial state.

## Common Mistakes

- Treating two consecutive sevens as a one-roll hazard.
- Forgetting that every non-seven, non-twelve result resets the streak.
- Starting from (y) even though no roll precedes the experiment.
- Dropping the zero-valued failure branch without explaining why it contributes no term.

## Extensions

1. Replace 12 and 7 by any target total and streak total, then substitute their one-roll probabilities into the same two-state system.
2. Require three consecutive sevens; the sufficient state becomes streak length 0, 1, or 2.

</details>
