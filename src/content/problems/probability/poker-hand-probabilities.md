---
problemId: combinatorial-probability-001
title: Poker Hand Probabilities by Counting
description: Build one consistent five-card sample space and count four-of-a-kind, full-house, and exactly-two-pair hands without mixing ordered and unordered models.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Combinatorial Probability, Card Counting]
tags: [Probability, Combinatorics, Cards, Counting, Interview]
quantInterviewTopics: [probability-statistics, combinatorial-probability]
concepts: [counting-permutations-combinations, finite-combinatorial-probability-modeling]
techniques: []
prerequisites: [counting-permutations-combinations]
relatedProblems: []
family: finite-card-counting
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

A standard 52-card deck has 13 ranks and 4 suits. Five cards are dealt uniformly at random, with order ignored.

Find the probabilities that the hand is:

1. **four of a kind**;
2. a **full house**;
3. **exactly two pairs**.

Use one consistent sample space for all three calculations.

## Think Before Revealing

A five-card poker hand is an unordered subset. Start with the denominator before counting any favorable pattern.

<details>
<summary>Hint 1</summary>

There are `C(52,5)` possible five-card hands. For every numerator, count unordered hands at the same granularity.

</details>

<details>
<summary>Hint 2</summary>

For a full house, choose the rank of the triple, its three suits, the rank of the pair, and its two suits. For exactly two pairs, choose two pair ranks first, then one kicker rank that is different from both.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Because every five-card subset is equally likely after a fair shuffle, the common denominator is

`C(52,5) = 2,598,960`.

The key discipline is to keep every numerator unordered as well.

### 1. Four of a kind

Choose the rank that appears four times. There are `13` choices, and once that rank is fixed all four suits are forced.

The fifth card can be any card from the other 48 cards, so the favorable count is

`13 * 48 = 624`.

Therefore

`P(four of a kind) = 624 / C(52,5)`.

Numerically this is about `0.0002401`.

### 2. Full house

A full house consists of a triple of one rank and a pair of a different rank.

- choose the triple rank: `13` ways;
- choose 3 of its 4 suits: `C(4,3)` ways;
- choose the pair rank from the remaining ranks: `12` ways;
- choose 2 of its 4 suits: `C(4,2)` ways.

Thus the favorable count is

`13 * C(4,3) * 12 * C(4,2) = 3744`.

Hence

`P(full house) = 3744 / C(52,5)`.

### 3. Exactly two pairs

Here the word **exactly** matters: the fifth card must have a rank different from both pair ranks.

- choose the two ranks that form the pairs: `C(13,2)`;
- choose two suits for each pair: `C(4,2)^2`;
- choose the kicker rank from the remaining 11 ranks: `11`;
- choose the kicker suit: `4`.

Therefore

`C(13,2) * C(4,2)^2 * 11 * 4 = 123552`

hands contain exactly two pairs, and

`P(exactly two pairs) = 123552 / C(52,5)`.

### Why the counts are internally consistent

Every numerator counts complete **unordered five-card subsets**, exactly like the denominator. We never count a deal sequence in the numerator and a hand in the denominator, so no hidden `5!` correction is needed.

A useful sanity check is magnitude: two pairs should be much more common than a full house, and a full house much more common than four of a kind. The counts `123552 > 3744 > 624` have that ordering.

## Why This Problem Matters

Card problems are compact tests of modeling discipline. The arithmetic is elementary, but they expose whether you can:

- choose a genuinely equiprobable sample space;
- distinguish ordered sequences from unordered subsets;
- decompose a structural pattern into independent counting choices;
- enforce words such as “exactly” without accidentally including stronger hands.

The same reasoning appears in sampling problems, portfolio subset selection, random graphs, and occupancy models.

## Common Mistakes

**Using `52*51*50*49*48` as the denominator without adjusting the numerator.** That counts ordered deals, not hands.

**Forgetting that the full-house ranks have different roles.** The triple rank and pair rank are not interchangeable; choose the triple first and the pair second.

**Allowing the kicker in the two-pair count to match a pair rank.** That would create a full house, so only 11 kicker ranks are legal.

**Choosing two pair ranks in order.** `C(13,2)` is correct because swapping the two pair ranks does not create a new hand.

## Extensions & Variants

- Count exactly one pair and derive its probability.
- Count three of a kind **excluding** full houses and four of a kind.
- Rework all three parts using ordered five-card deal sequences and verify that the same probabilities emerge after consistent counting.
- Generalize the method to a deck with `R` ranks and `S` suits.
- Compare direct counting with a complement calculation for “at least one pair.”

</details>
