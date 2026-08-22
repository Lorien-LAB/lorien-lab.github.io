---
problemId: combinatorial-probability-003
title: Five Letters, Five Envelopes, No Correct Address
description: Use inclusion–exclusion to count derangements and compute the probability that none of five labeled letters is placed into its matching labeled envelope.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Combinatorial Probability, Derangements]
tags: [Probability, Combinatorics, Inclusion-Exclusion, Derangements, Interview]
quantInterviewTopics: [probability-statistics, combinatorial-probability]
concepts: [inclusion-exclusion-derangements, counting-permutations-combinations]
techniques: []
prerequisites: [counting-permutations-combinations]
relatedProblems: []
family: fixed-point-avoidance
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Five distinct letters are placed uniformly at random into five distinct addressed envelopes, one letter per envelope.

What is the probability that **every letter goes to the wrong envelope**?

Derive the answer rather than quoting a memorized derangement number.

## Think Before Revealing

The direct event “all five are wrong” is the complement of “at least one is correct.” The latter is a union of overlapping fixed-point events.

<details>
<summary>Hint 1</summary>

Let `A_i` be the event that letter `i` is placed into envelope `i`. There are `5! = 120` total assignments.

</details>

<details>
<summary>Hint 2</summary>

Apply inclusion-exclusion to `A_1 union ... union A_5`. If a particular set of `k` letters is fixed correctly, the other `5-k` letters can be permuted in `(5-k)!` ways.

</details>

<details>
<summary>Show Solution</summary>

## Solution

A complete assignment is a permutation of the five letters, so there are

`5! = 120`

equiprobable assignments.

We want permutations with no fixed point. Let `A_i` denote the event that letter `i` lands in its own envelope. Instead of counting the desired event directly, use inclusion-exclusion on the union of these five bad events.

### Step 1: Single fixed points

For each `i`, fixing letter `i` leaves the other four letters free, so

`|A_i| = 4!`.

Summed over all five choices, the first correction is

`C(5,1)4!`.

### Step 2: Intersections

If two specified letters are correct, the other three can be permuted in `3!` ways. More generally, if `k` specified letters are correct, the remaining `5-k` letters can be permuted in `(5-k)!` ways.

Thus the number of assignments with **at least one** fixed point is

`C(5,1)4! - C(5,2)3! + C(5,3)2! - C(5,4)1! + C(5,5)0!`.

The number with **no** fixed points is therefore

`5! - C(5,1)4! + C(5,2)3! - C(5,3)2! + C(5,4)1! - C(5,5)0!`.

Evaluating,

`120 - 120 + 60 - 20 + 5 - 1 = 44`.

So there are exactly `44` derangements of five objects.

The requested probability is

`44/120 = 11/30`.

### Compact derivation

Using `C(n,k)(n-k)! = n!/k!`, the general derangement count is

`!n = n! sum_{k=0}^n (-1)^k/k!`.

For `n=5`, this immediately gives the same `44` favorable assignments.

## Why This Problem Matters

This problem is a compact test of **overlap management**. A naive attempt might subtract all assignments where one letter is correct, but assignments with two correct letters have then been subtracted twice. Inclusion-exclusion provides the systematic correction.

The pattern generalizes far beyond envelopes: forbidden assignments, matching problems, occupancy constraints, permutation fixed points, and many “none of these bad events occurs” questions have the same structure.

## Common Mistakes

**Writing `120 - 5*24` and stopping.** That double-subtracts assignments with multiple correct placements and even produces zero, which is a clear warning sign.

**Treating the five fixed-point events as disjoint.** Several letters can be correct simultaneously.

**Confusing `!5` with `5!`.** The exclamation mark on the left denotes a derangement number; `5!` is the ordinary factorial.

**Using `1/e` as the exact answer.** The derangement probability approaches `1/e`, but for five objects the exact probability is `11/30`.

## Extensions & Variants

- Derive the general formula for `!n` using inclusion-exclusion.
- Show the recurrence `!n = (n-1)(!(n-1)+!(n-2))`.
- Find the probability of **exactly one** fixed point among `n` objects.
- For large `n`, compare the exact derangement probability with `e^(-1)`.
- Replace “all wrong” with a custom forbidden-position pattern and identify when a rook-polynomial or matching formulation is useful.

</details>
