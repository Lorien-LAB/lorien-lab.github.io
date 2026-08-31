---
problemId: logic-logical-deduction-001
title: Minimum-Time Bridge Crossing
description: Find and prove the minimum time for four travelers to cross a capacity-two bridge with one shared torch and unequal crossing times.
date: '2026-08-30'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Optimization, State Search]
tags: [Logical Deduction, Optimization, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [logical-deduction-constraint-propagation-and-case-elimination]
techniques: []
prerequisites: []
relatedProblems: [public-announcement-candidate-elimination]
family: bridge-crossing
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Four travelers A, B, C, and D need 1, 3, 6, and 11 minutes, respectively, to cross a bridge. It is dark, and the group has one torch. Every crossing must carry the torch, at most two travelers may be on the bridge at once, and a pair crosses at the slower traveler's time. Everyone starts on the near side.

Find the minimum total time needed to put all four travelers and the torch on the far side. Give a legal schedule and prove that no faster schedule exists.

## Think Before Revealing

<details><summary>Hint 1</summary>Represent a position by the set of travelers on the far side together with the side holding the torch. A legal move changes both parts of that state.</details>
<details><summary>Hint 2</summary>For a hand proof, separate schedules in which the two slowest travelers share an outbound crossing from schedules in which they cross on different outbound moves.</details>

<details>
<summary>Show Solution</summary>

## Solution

Write the crossing times in increasing order as `a = 1`, `b = 3`, `c = 6`, and `d = 11`, corresponding to A, B, C, and D. The following schedule is legal:

| Step | Direction | Travelers | Cost | Far side after the move |
|---:|:---:|:---:|---:|:---|
| 1 | `->` | `A, B` | 3 | A, B |
| 2 | `<-` | `A` | 1 | B |
| 3 | `->` | `C, D` | 11 | B, C, D |
| 4 | `<-` | `B` | 3 | C, D |
| 5 | `->` | `A, B` | 3 | A, B, C, D |

The total is `3 + 1 + 11 + 3 + 3 = 21` minutes.

To prove optimality, every complete schedule falls into one of two structural cases.

**Case 1: C and D share an outbound crossing.** Their joint crossing costs at least `d`. If exactly one fast traveler is already far, leaving B there with the torch back near costs at least `a + b`, after which returning B and sending A with B costs at least `2b`. Leaving A far exchanges those contributions: the prefix costs at least `2b`, while returning A and sending A with B costs at least `a + b`. If both fast travelers are already far with the torch near, C or D must already have crossed and returned to bring the torch near without undoing either fast crossing; that prefix costs at least `2c + a`, which exceeds `a + 3b`. Thus this case costs at least

`a + 3b + d = 1 + 9 + 11 = 21`.

If neither fast traveler is far before C and D cross, a slow traveler must return afterward; even the optimistic remaining move costs give `d + c + a + b + c`, which is greater than 21. That subcase cannot weaken the bound.

**Case 2: C and D cross on different outbound moves.** Those two outbound moves cost at least `c` and `d`. Moving four people across with capacity two requires at least one further outbound move and two returns. If that further outbound move includes B, these three moves cost at least `b + 2a`. If it contains only A, it makes no lasting progress unless A returns, and a later return must then be made by someone of speed B or slower; the same three moves again cost at least `a + a + b`. Therefore this case costs at least

`2a + b + c + d = 2 + 3 + 6 + 11 = 22`.

The two cases are exhaustive, so every schedule costs at least `min(21, 22) = 21`. The displayed schedule reaches that bound.

As an independent check, define a state as `(F, t)`, where `F` is the subset of travelers on the far side and `t` records the torch side. From each state, generate every one- or two-traveler group on the torch side, move that group, flip the torch side, and charge the maximum crossing time in the group. Dijkstra's algorithm over these 32 finite states returns distance 21 from `(empty, near)` to `({A,B,C,D}, far)`, agreeing with the proof.

## Why This Problem Matters

A plausible schedule is only an upper bound. This problem tests the harder step: turning a small physical puzzle into a complete state model and certifying optimality by an exhaustive structural split or shortest-path calculation.

## Common Mistakes

- Adding both travelers' times on a paired crossing instead of taking the slower time.
- Letting the torch move by itself or allowing a return by someone who is not on the torch side.
- Finding the 21-minute schedule and calling it optimal without a lower bound.
- Arguing only about the familiar joint crossing of C and D and forgetting schedules in which they cross separately.

## Extensions

- Replace one crossing time and compare the two expressions to see when sending the slowest travelers together stops being best.
- Generalize the state graph to more travelers and use a shortest-path algorithm to obtain a machine-checkable optimum.
- Add a capacity or direction restriction and identify which parts of the lower-bound proof still apply.

</details>
