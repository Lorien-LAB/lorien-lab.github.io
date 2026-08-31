---
problemId: logic-logical-deduction-009
title: Last-Ball Color from a Parity Invariant
description: Determine the final ball color in a random replacement process by proving that red-count parity never changes.
date: '2026-08-31'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Parity, Invariants]
tags: [Logical Deduction, Parity, Invariants, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction, invariants-state-transformations, modular-arithmetic]
concepts: [constraint-reframing-and-latent-state, modular-invariants]
techniques: []
prerequisites: []
relatedProblems: [pack-length-four-bricks-in-six-cube, predator-replacement-parity]
family: replacement-parity
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

A box contains blue and red balls. Repeatedly choose two balls uniformly at random, remove both, and replace them with one ball: two blue balls are replaced by one blue ball, two red balls by one blue ball, and one ball of each color is replaced by one blue ball. Continue until exactly one ball remains.

Determine the final color when the box starts with 20 blue and 14 red balls. Then determine it when the box starts with 20 blue and 13 red balls. Explain why the random sequence of selected pairs cannot change either answer.

## Think Before Revealing

<details><summary>Hint 1</summary>Track a quantity that need not distinguish every state but might survive every permitted replacement.</details>
<details><summary>Hint 2</summary>For each possible pair, write the change in the red-ball count modulo 2.</details>

<details>
<summary>Show Solution</summary>

## Solution

Let the state be `(B, R)`, where `B` and `R` are the current counts of blue and red balls. Each replacement removes two balls and adds one, so the total count falls by one. The following table records every possible transition; the ordered pair is `(change in B, change in R)`.

| Selected pair | Change in `(B, R)` |
|---|---|
| `BB` | `(-1, 0)` |
| `RR` | `(1, -2)` |
| `BR` | `(-1, 0)` |

In every row, the red count changes by an even number. Therefore `R mod 2` is an invariant: the parity of the number of red balls never changes. The randomly selected pair does not affect this parity conclusion, because every allowable pair type preserves it.

At termination there is one ball, so its red count is either 0 (a blue final ball) or 1 (a red final ball). The invariant decides which possibility is compatible with the initial state:

- 20 blue, 14 red -> blue, because 14 is even and the final red count must be 0.
- 20 blue, 13 red -> red, because 13 is odd and the final red count must be 1.

The argument does not compute probabilities or enumerate sequences. Randomness changes the intermediate path, but no path can cross from even to odd red count or vice versa.

## Why This Problem Matters

The obvious state contains two counts and a random history. Parity compresses that state to one bit that is sufficient for the question. In an interview, stating the transition table first makes the invariant and the irrelevance of randomness easy to verify.

## Common Mistakes

- Treating the randomly selected pair as a reason to calculate a distribution, even though every transition has the same parity effect.
- Tracking the parity of the total count, which changes on every move and does not identify the final color.
- Saying red parity is preserved without checking the two-red replacement, where the red count falls by two.
- Inferring a likely final color from the larger initial color instead of proving a path-independent invariant.

## Extensions

- Change the color of the replacement after a mixed pair and determine whether red parity remains useful.
- Start from arbitrary counts `(B, R)` and state the final color solely in terms of `R mod 2`.
- Search for an invariant modulo a number greater than two when replacement rules add or remove several balls.

</details>
