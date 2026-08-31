---
problemId: logic-logical-deduction-005
title: Packing Length-Four Bricks in a Six-Cube
description: Decide whether 53 axis-aligned length-four bricks fit in a six-cube, and prove the answer with a three-dimensional coloring invariant.
date: '2026-08-31'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Invariants, Coloring Arguments]
tags: [Logical Deduction, Invariants, Brainteasers, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction, invariants-state-transformations]
concepts: [constraint-reframing-and-latent-state, modular-invariants]
techniques: []
prerequisites: []
relatedProblems: [two-cube-calendar-digit-labeling, last-ball-color-by-parity-invariant]
family: coloring-obstruction
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

A six-cube is divided into `6 x 6 x 6` unit cells. A brick occupies four consecutive unit cells along one coordinate axis and has cross-section `1 x 1`; it may be placed parallel to any axis. Can 53 nonoverlapping bricks fit in the cube? Prove your answer.

## Think Before Revealing

<details><summary>Hint 1</summary>Volume leaves four unit cells unused, so seek a condition that every legal brick must satisfy rather than counting cells alone.</details>
<details><summary>Hint 2</summary>Partition the cube into `2 x 2 x 2` blocks, color those blocks like a three-dimensional checkerboard, and count what a length-four brick uses.</details>

<details>
<summary>Show Solution</summary>

## Solution

No. The volume calculation is necessary but not decisive: `53 * 4 = 212 < 216`, so volume alone is insufficient to rule out 53 bricks.

Partition the large cube into `2 x 2 x 2` blocks. Give the block whose lower corner is `(2i, 2j, 2k)` color `i + j + k (mod 2)`. Among the `3 x 3 x 3 = 27` blocks, one color occurs 13 times and the other 14 times. The scarcer color therefore contains only `13 * 8 = 104` unit cells.

Every axis-aligned length-four brick uses exactly two unit cells from blocks of each color. A boundary-aligned start crosses two adjacent two-cell blocks, taking two cells from each. An offset start meets three blocks in a `1-2-1` pattern: the two outer cells have one color and the two middle cells have the other. Thus every legal start has two cells of each color, whichever coordinate axis it follows.

Thus `n` bricks consume `2n` cells of the scarcer color. They must satisfy

`2n <= 104`,

so `n <= 52`. In particular, 53 bricks would require 106 cells of the scarcer color, which do not exist. This proves that 53 bricks cannot fit. The coloring argument supplies an upper bound of 52; it does not assert that a packing of 52 bricks exists.

## Why This Problem Matters

An easy numerical test can leave a puzzle unresolved. The useful move is to replace a global volume count with a local resource that every legal object spends in the same ratio. This is a compact example of turning geometry into a conserved count.

## Common Mistakes

- Concluding that 53 bricks fit because their total volume is below the cube's volume.
- Coloring individual unit cells in a way that a brick does not necessarily balance.
- Checking only bricks that begin on a two-cell-block boundary and overlooking legal offset placements.
- Treating the upper bound of 52 as a construction of 52 bricks.

## Extensions

- Change the side length or the brick length and determine when a block-coloring imbalance survives.
- Allow bricks to bend or rotate away from the coordinate axes and identify which step of the proof fails.
- Search for an explicit packing with a prescribed number of bricks; a packing witness and an impossibility bound answer different questions.

</details>
