---
problemId: probability-foundations-002
title: Higher Card by Symmetry
description: Remove the equal-rank tie event, then use label symmetry to compute the probability that the first card has the higher rank.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Probability Foundations, Symmetry]
tags: [Probability, Cards, Symmetry, Interview]
quantInterviewTopics: [probability-statistics, probability-foundations]
concepts: [symmetry-equiprobability-geometric-probability]
techniques: []
prerequisites: []
relatedProblems: []
family: tie-aware-symmetry
mathDifficulty: 1
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
status: solved
featured: false
---

## Problem

Draw two cards uniformly without replacement from a standard 52-card deck. Compare **rank only**: suits do not matter. What is the probability that the first card has a strictly higher rank than the second?

## Think Before Revealing

The two draw positions are symmetric, but there is a third possibility that prevents an immediate `1/2` answer.

<details>
<summary>Hint 1</summary>

Condition only on the first card's rank. How many of the remaining 51 cards have exactly the same rank?

</details>

<details>
<summary>Hint 2</summary>

Once the tie event is removed, exchange the labels “first” and “second.” What does that symmetry say about the two strict-order events?

</details>

<details>
<summary>Show Solution</summary>

## Solution

After the first card is drawn, exactly **three** of the remaining 51 cards have the same rank. Therefore

`P(tie) = 3/51`.

The remaining probability mass is

`1 - 3/51 = 48/51`.

On the event that the two ranks differ, the ordered pair of draw positions is symmetric: swapping “first” and “second” maps every outcome in which the first rank is higher to an equally likely outcome in which the second rank is higher. Thus the non-tie mass splits equally.

Hence

`P(first rank is higher) = (1/2)(48/51)`

`= 24/51`

`= 8/17`.

Therefore the answer is

**`8/17`.**

## Why This Problem Matters

This is a compact test of **tie-aware symmetry**. Interview candidates often see two exchangeable positions and immediately answer `1/2`. The correct move is to partition the sample space first: first-higher, second-higher, and tie. Symmetry applies to the first two events, not to the entire sample space.

The same logic works whenever two labels are exchangeable but a neutral or exceptional state is possible.

## Common Mistakes

- **Answering `1/2` immediately.** Equal ranks have positive probability, so the two strict inequalities do not exhaust the sample space.
- **Using `4/52` for the tie probability after the first card is known.** The first card has already been removed; only three cards of its rank remain among 51.
- **Counting every ordered pair of ranks.** That works, but it hides the simpler symmetry.
- **Comparing suits or card identities.** Only rank is relevant to the event.

## Extensions & Variants

Suppose a deck-like model has `r` ranks and exactly `m` cards of each rank. After the first card is drawn, the tie probability is

`(m-1)/(rm-1)`.

By the same exchange symmetry,

`P(first rank is higher) = (1/2) * (1 - (m-1)/(rm-1))`.

The method survives any model in which the two positions are exchangeable and the tie probability can be isolated.

</details>
