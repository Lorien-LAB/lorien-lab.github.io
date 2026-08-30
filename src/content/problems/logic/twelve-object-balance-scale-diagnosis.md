---
problemId: logic-logical-deduction-003
title: Twelve-Object Balance-Scale Diagnosis
description: Identify one anomalously heavy-or-light object among twelve using a complete three-weighing adaptive balance-scale decision tree.
date: '2026-08-30'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Decision Trees, Information Bounds]
tags: [Logical Deduction, Balance Scale, Adaptive Testing, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [decision-trees-information-bounds-and-adaptive-testing]
techniques: []
prerequisites: []
relatedProblems: [bridge-crossing-minimum-time, top-three-from-batched-races]
family: ternary-diagnosis
mathDifficulty: 2
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 30
status: solved
featured: false
---

## Problem

Twelve visually identical objects are labeled 1 through 12. Exactly one object has a different weight from the other eleven, but you do not know whether it is heavier or lighter. A balance scale reports one of three outcomes: `L` when the left pan is heavier, `R` when the right pan is heavier, and `B` when the pans balance. You may choose each weighing after seeing all earlier outcomes.

The 24 possible hypotheses are `1H`, `1L`, `2H`, `2L`, `3H`, `3L`, `4H`, `4L`, `5H`, `5L`, `6H`, `6L`, `7H`, `7L`, `8H`, `8L`, `9H`, `9L`, `10H`, `10L`, `11H`, `11L`, `12H`, and `12L`, where H and L mean heavier and lighter than a normal object.

Construct a legal adaptive strategy that always identifies both the anomalous object and whether it is heavy or light in at most three weighings. Prove the information lower bound and verify every possible outcome path used by the strategy.

## Think Before Revealing

<details><summary>Hint 1</summary>Compare objects 1–4 against 5–8 first. A balance certifies eight normal objects; an imbalance restricts both the possible labels and the possible directions of the anomaly.</details>
<details><summary>Hint 2</summary>Record outcomes as a prefix such as `BL`. At each prefix, choose a weighing that separates only the hypotheses still compatible with that prefix.</details>

<details>
<summary>Show Solution</summary>

## Solution

Each weighing has three possible outcomes. Two weighings can encode at most 9 outcome paths, while three can encode at most 27, so the necessary information bound is `3^2 < 24 <= 3^3`. Thus at least three weighings are required in the worst case. Capacity alone does not construct legal balanced branches: the objects placed on the pans must make every claimed outcome physically possible and must separate all surviving hypotheses.

The strategy below is an executable decision tree. Start with the row whose prefix is `root`. After each weighing, append its outcome letter to the current prefix. If fewer than three letters have been observed, use the row with that new prefix for the next weighing. After the third outcome, look up the three-letter path in the diagnosis table.

### Decision nodes

| Prefix | Left pan | Right pan |
|:---:|:---:|:---:|
| `root` | `1,2,3,4` | `5,6,7,8` |
| `B` | `9,10,11` | `1,2,3` |
| `BB` | `12` | `1` |
| `BL` | `9` | `10` |
| `BR` | `9` | `10` |
| `L` | `1,2,5` | `3,6,9` |
| `LL` | `1` | `2` |
| `LR` | `3` | `9` |
| `LB` | `7` | `8` |
| `R` | `1,2,5` | `3,6,9` |
| `RL` | `3` | `9` |
| `RR` | `1` | `2` |
| `RB` | `7` | `8` |

### Diagnosis leaves

| Path | Diagnosis |
|:---:|:---:|
| `BLL` | `9H` |
| `BLR` | `10H` |
| `BLB` | `11H` |
| `BRR` | `9L` |
| `BRL` | `10L` |
| `BRB` | `11L` |
| `BBL` | `12H` |
| `BBR` | `12L` |
| `LLL` | `1H` |
| `LLR` | `2H` |
| `LLB` | `6L` |
| `LRL` | `3H` |
| `LRB` | `5L` |
| `LBB` | `4H` |
| `LBR` | `7L` |
| `LBL` | `8L` |
| `RLR` | `3L` |
| `RLB` | `5H` |
| `RRR` | `1L` |
| `RRL` | `2L` |
| `RRB` | `6H` |
| `RBB` | `4L` |
| `RBL` | `7H` |
| `RBR` | `8H` |

To see why the balanced branch works, suppose the first outcome is B. Objects 1–8 are then known to be normal. Comparing 9, 10, and 11 with three known-normal objects has three useful cases. If the outcome is L, one of 9–11 is heavy, and comparing 9 with 10 distinguishes 9H, 10H, and 11H. If it is R, one of 9–11 is light, and the same comparison distinguishes 9L, 10L, and 11L. If it balances, object 12 is anomalous, so comparing 12 with known-normal object 1 determines whether 12 is heavy or light. The unused path `BBB` is physically impossible.

Now suppose the first outcome is L. The survivors are 1H, 2H, 3H, 4H, 5L, 6L, 7L, and 8L; objects 9–12 are normal. The second weighing, 1,2,5 against 3,6,9, partitions them as follows:

- A second L leaves 1H, 2H, or 6L. Comparing 1 with 2 gives L, R, or B respectively.
- A second R leaves 3H or 5L. Comparing 3 with normal object 9 gives L for 3H and B for 5L.
- A balance leaves 4H, 7L, or 8L. Comparing 7 with 8 gives B, R, or L respectively.

The first-right-heavy branch is the tested symmetric transformation of the first-left-heavy branch: exchange every surviving H with L and every subsequent L outcome with R, while B remains B. The same follow-up pan assignments therefore apply after an initial R. The diagnosis table still lists every right-heavy-prefix leaf explicitly, rather than leaving symmetry as an unstated shortcut.

Every row weighs the same number of objects on both pans. Exhaustive simulation of the 24 hypotheses follows the table for three outcomes and reaches 24 distinct labeled leaves, so no two hypotheses share a diagnosis and none is omitted.

## Why This Problem Matters

An information count proves only that a depth might be sufficient. A complete adaptive solution must also construct legal physical tests, keep track of which objects are known normal, and certify every leaf of the decision tree.

## Common Mistakes

- Treating the 27 nominal outcome strings as proof that a legal three-weighing strategy exists.
- Forgetting that an unbalanced first weighing links object identity to direction: an object on the heavy pan can only be heavy, while one on the light pan can only be light.
- Using an object as a normal reference before its normality has been established on that branch.
- Giving the left-heavy subtree and saying “by symmetry” without checking or publishing the right-heavy diagnoses.

## Extensions

- Mutate one pan assignment and trace which hypotheses collide or reach an unlabeled path.
- Compare this adaptive tree with any non-adaptive set of three fixed weighings.
- Generalize the information bound to a scale with more outcomes, while keeping the distinction between nominal capacity and legal tests.

</details>
