---
problemId: logic-problem-simplification-002
title: Predator Replacement Parity
description: Reduce a rational predator replacement process to small cases and prove the resulting odd-even survival rule by induction.
date: '2026-08-30'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Induction, Parity]
tags: [Brainteasers, Induction, Parity, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, problem-simplification]
concepts: [small-cases-recurrence-and-structural-simplification]
techniques: []
prerequisites: []
relatedProblems: [sequential-voting-elimination-backward-induction]
family: replacement-parity
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

One vulnerable animal shares an island with n rational predators. Only one predator may act at a time. A predator that consumes the vulnerable animal immediately becomes the new vulnerable animal. Each predator first maximizes survival and, conditional on equal survival, prefers consuming to abstaining. Determine for which n the initial vulnerable animal is consumed, and evaluate n = 100.

## Think Before Revealing

<details><summary>Hint 1</summary>Write the outcomes for n = 1, 2, 3, and 4 without changing the action or preference rules.</details>
<details><summary>Hint 2</summary>A predator deciding now only needs to know whether the replacement vulnerable animal survives with n - 1 predators.</details>

<details>
<summary>Show Solution</summary>

## Solution

Let consumption mean that some predator chooses to consume the current vulnerable animal. The deciding predator compares immediate consumption with abstaining, but survival remains the first priority. At equal survival, it chooses to consume because it prefers consuming to abstaining.

- With 1 predator, the predator can consume and then faces no predators. Consumption is safe, so the vulnerable animal is consumed.
- With 2 predators, a predator that consumes becomes vulnerable to the other predator, who would safely consume. Since consuming would sacrifice survival, neither predator consumes; the vulnerable animal is not consumed.
- With 3 predators, consumption leaves a two-predator replacement state, in which the new vulnerable animal is not consumed. Consumption is therefore safe, so the vulnerable animal is consumed.
- With 4 predators, consumption leaves a three-predator replacement state, in which the new vulnerable animal is consumed. The acting predator would not survive, so the vulnerable animal is not consumed.

The pattern is: with an odd number of predators, the vulnerable animal is consumed; with an even number of predators, it is not consumed. This follows by induction. Assume the rule for `n - 1` predators. If `n` is odd, then `n - 1` is even, so a predator can consume and become a vulnerable animal that survives; consumption is chosen. If `n` is even, then `n - 1` is odd, so consuming makes the actor a vulnerable animal that will be consumed; survival rules out consumption.

For `n = 100`, the number of predators is even. The initial vulnerable animal is not consumed.

## Why This Problem Matters

Small cases reveal a recurrence that is easier to prove than to simulate. The puzzle tests whether you can state the preference order precisely, identify the one-state reduction caused by an action, and turn an observed pattern into an induction argument.

## Common Mistakes

- Treating consumption as automatically desirable without first checking whether the actor survives afterward.
- Forgetting that only one predator may act at a time, so the next state has one fewer predator and a new vulnerable animal.
- Assuming the odd-even pattern from two examples without proving the induction step.
- Reversing the parity conclusion: odd counts allow safe consumption, while even counts do not.

## Extensions

- Reverse the secondary preference to abstaining and determine which cases change when survival is equal.
- Add a cost to abstaining or consumption and identify when parity alone no longer decides the outcome.
- Replace the single vulnerable animal with a chain of state transitions and write the corresponding recurrence.

</details>
