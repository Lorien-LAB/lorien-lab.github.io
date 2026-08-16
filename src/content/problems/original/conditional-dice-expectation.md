---
problemId: lorien-probability-001
title: Conditional Dice Expectation
description: An original expectation exercise designed to practice conditioning on the outcome of a first random experiment.
date: 2026-08-16
originType: original
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Conditional Probability]
tags: [Probability, Expectation, Interview]
concepts: []
techniques: [conditioning]
prerequisites: []
relatedProblems: []
family: conditional-expectation
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
status: solved
featured: true
---

## Problem

Roll a fair six-sided die. If the first roll is odd, roll once more and receive the second roll as the payoff. If the first roll is even, receive half of the first roll as the payoff. What is the expected payoff?

## Think before revealing

Try conditioning on whether the first roll is odd or even before enumerating every terminal outcome.

<details>
<summary>Hint 1</summary>

The first roll is odd with probability one half and even with probability one half.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Conditional on an odd first roll, the second fair die has expectation 3.5. Conditional on an even first roll, the first roll is uniformly distributed over 2, 4, and 6, so half of that value has conditional expectation 2.

Therefore E[X] = 0.5 × 3.5 + 0.5 × 2 = 2.75.

## Why this problem matters

The computation is elementary; the useful habit is recognizing that conditioning creates two simple branches immediately.

## Common mistakes

A common dead end is listing all terminal outcomes before exploiting the natural odd/even partition.

</details>
