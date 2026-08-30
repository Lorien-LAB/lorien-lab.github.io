---
problemId: logic-problem-simplification-001
title: Sequential Voting Under Elimination
description: Solve a ranked allocation vote by reducing it to smaller surviving groups and working backward through every proposal state.
date: '2026-08-30'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Game Theory, Backward Induction]
tags: [Brainteasers, Backward Induction, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, problem-simplification]
concepts: [small-cases-recurrence-and-structural-simplification, recursion-problem-solving]
techniques: [recursion-problem-solving]
prerequisites: []
relatedProblems: [predator-replacement-parity]
family: sequential-elimination
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Five agents are ranked A5 (most senior) through A1. They must allocate 100 identical units. The most senior surviving agent proposes an integer allocation; every survivor, including the proposer, votes. A proposal passes when at least half of the current survivors approve. Rejection removes the proposer and repeats the process. Preferences are lexicographic: survive, receive more units, then have fewer rivals survive. Determine the allocation proposed by A5.

## Think Before Revealing

<details><summary>Hint 1</summary>Solve the one-agent and two-agent states under the same voting threshold before considering five agents.</details>
<details><summary>Hint 2</summary>At each larger state, identify who receives zero if the proposer is removed; those agents are the cheapest votes to acquire.</details>

<details>
<summary>Show Solution</summary>

## Solution

Work backward, always treating the proposer as one affirmative vote. A proposal needs at least half of the survivors to approve; when the number of survivors is odd, this rounds up to a strict majority.

- With 1 agent, A1 votes for the only proposal, so the allocation is `100`.
- With 2 agents, the proposer A2 needs one vote, and the proposer votes. The allocation is `100/0` in senior-to-junior order.
- With 3 agents, A3 needs two votes. If A3 is removed, A2 keeps `100` and A1 receives `0`. A3 buys A1's vote with one unit, producing `99/0/1`.
- With 4 agents, A4 needs two votes. If A4 is removed, the three-agent allocation is `99/0/1`, so A2 receives zero. A4 buys A2's vote with one unit, giving `99/0/1/0`.
- With 5 agents, A5 needs three votes: at least half of five means three approvals. If A5 is removed, the four-agent allocation is `99/0/1/0`. A3 and A1 receive zero, so A5 gives each one unit and proposes `98/0/1/0/1` in senior-to-junior order.

Thus A5 keeps 98 units, A4 receives 0, A3 receives 1, A2 receives 0, and A1 receives 1. The argument uses the stated lexicographic priorities: survival comes before units, and units come before having fewer rivals survive.

## Why This Problem Matters

The apparent voting tree becomes manageable when each state is reduced to the smaller state that follows rejection. It tests backward induction, careful treatment of thresholds, and the habit of finding the cheapest pivotal votes rather than enumerating every ballot.

## Common Mistakes

- Forgetting that the proposer votes, which changes the two-agent and four-agent cases.
- Applying a 50% threshold without rounding up for an odd number of survivors.
- Buying votes from agents who already receive units in the rejection state instead of choosing agents who receive zero.
- Ignoring the lexicographic preference order; a different threshold, tie rule, or preference order would change the allocation.

## Extensions

- Change the passing threshold and repeat the recurrence to see when the proposer needs a strict majority or more.
- Change the tie rule or preference order to determine which zero-allocation agents are willing to support a new proposer.
- Generalize to more agents by recording the smallest payments required in each preceding state.

</details>
