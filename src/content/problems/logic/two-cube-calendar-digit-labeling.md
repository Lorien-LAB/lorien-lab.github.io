---
problemId: logic-logical-deduction-006
title: Two-Cube Calendar Digit Labeling
description: Label two six-faced cubes so their visible faces can display every date from 01 through 31, and prove the construction is sufficient.
date: '2026-08-31'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Constraint Satisfaction, Constructive Proofs]
tags: [Logical Deduction, Construction, Brainteasers, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [constraint-reframing-and-latent-state, logical-deduction-constraint-propagation-and-case-elimination]
techniques: []
prerequisites: []
relatedProblems: [pack-length-four-bricks-in-six-cube, two-guards-one-question]
family: digit-labeling-construction
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Label the faces of two six-faced cubes so that, by choosing one visible face from each cube and placing the cubes in either left-right order, they can display every two-digit date from `01` through `31`. A face labeled `6` may be turned upside down and read as `9`. Give a labeling and prove it works.

## Think Before Revealing

<details><summary>Hint 1</summary>Start with dates having identical digits, then list which symbols must be paired with zero.</details>
<details><summary>Hint 2</summary>After accounting for repeated digits and the `6`/`9` rotation, compare the number of required symbols with the free faces.</details>

<details>
<summary>Show Solution</summary>

## Solution

Use these labels:

Cube A: `0, 1, 2, 3, 4, 5`
Cube B: `0, 1, 2, 6, 7, 8`

The `6` on Cube B also supplies `9` when read upside down.

Here is why this construction has the necessary shared digits. Dates `11` and `22` force a `1` and a `2`, respectively, onto both cubes. Both cubes need `0`, `1`, and `2`: if only one cube carried `0`, the other would have to pair with it for every nonzero digit needed in `01` through `09`. That would require faces for `1, 2, 3, 4, 5, 6/9, 7, 8`, eight symbols on one six-faced cube.

After putting `0`, `1`, and `2` on both cubes, exactly six remaining face slots remain. The six remaining face slots cover 3, 4, 5, 6/9, 7, and 8, one apiece, which is exactly what the displayed labels do.

It remains to verify every date. For a date from `01` through `09`, use a zero from one cube and the nonzero digit from the other; the cubes may be swapped left-to-right. The same pairing displays `10`, `20`, and `30`. For dates `11`, `12`, `21`, and `22`, use the copies of `1` and `2`. For `13` through `19`, `23` through `29`, and `31`, place the digit among `0`, `1`, or `2` on one cube and its partner among `3`, `4`, `5`, `6/9`, `7`, or `8` on the other. Every required pair is split across the two label sets, so every date from `01` through `31` can be shown.

## Why This Problem Matters

The puzzle becomes manageable when written as a coverage problem for digit pairs. Repeated pairs create forced duplicates, while a rotational symmetry turns two apparent digits into one face. The proof should establish both the construction and why its scarce face slots are used efficiently.

## Common Mistakes

- Forgetting that `11` and `22` require duplicate copies of those digits.
- Counting `6` and `9` as two separate faces despite the allowed rotation.
- Giving a plausible labeling without checking dates such as `09`, `19`, `29`, and `30`.
- Assuming the two cubes have fixed left-right roles even though they may be swapped.

## Extensions

- Require dates through `39` and determine the first obstruction with only two six-faced cubes.
- Disallow the `6`/`9` rotation and find the smallest extra resource needed.
- Replace decimal dates with another alphabet or a collection of required two-symbol codes.

</details>
