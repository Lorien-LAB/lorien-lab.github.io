---
problemId: probability-foundations-001
title: More Heads with One Extra Coin
description: Use symmetry and a tie decomposition to compare n+1 fair coin tosses against n fair coin tosses without evaluating a binomial sum.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Probability Foundations, Symmetry]
tags: [Probability, Coins, Symmetry, Interview]
quantInterviewTopics: [probability-statistics, probability-foundations]
concepts: [symmetry-equiprobability-geometric-probability]
techniques: []
prerequisites: []
relatedProblems: []
family: extra-trial-symmetry
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

Alice flips `n+1` fair coins and Bob flips `n` fair coins, independently. What is the probability that Alice gets **strictly more heads** than Bob?

Find a solution that does not evaluate a binomial sum.

## Think Before Revealing

Compare equal-sized experiments first. Temporarily ignore Alice's final coin and compare the first `n` tosses of each player.

<details>
<summary>Hint 1</summary>

Let `p` be the probability that Alice has more heads than Bob after their first `n` tosses, and let `q` be the tie probability. By symmetry, Bob-more-heads also has probability `p`.

</details>

<details>
<summary>Hint 2</summary>

The three cases Alice-ahead, Bob-ahead, and tie partition the equal-`n` comparison, so `2p+q=1`. Now restore Alice's one extra fair coin.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let `H_A` be Alice's number of heads among her **first `n` coins**, and `H_B` Bob's number of heads among his `n` coins. Define

`p = P(H_A > H_B)`

and

`q = P(H_A = H_B)`.

The two `n`-coin experiments have identical distributions. Exchanging the labels Alice and Bob maps the event `H_A>H_B` to `H_B>H_A` without changing probability. Therefore

`P(H_B>H_A)=p`.

The three events `H_A>H_B`, `H_A<H_B`, and `H_A=H_B` form a partition, so

`2p + q = 1`.

Now restore Alice's `(n+1)`st coin.

- If Alice was already ahead after the first `n` tosses, she wins regardless of the extra coin. This contributes probability `p`.
- If the first `n` tosses were tied, Alice wins exactly when her extra coin is heads. This contributes `q/2`.
- If Alice was behind after the first `n` tosses, one extra head can at best create a tie, so she cannot finish strictly ahead.

Hence

`P(Alice wins) = p + q/2`.

Using `2p+q=1`,

`p + q/2 = 1/2`.

Therefore the answer is

**`1/2`.**

The striking point is that the unknown tie probability cancels. We never need its binomial formula.

## Why This Problem Matters

The problem rewards **state alignment**: first compare two experiments with the same size, use exchangeability there, and only then account for the asymmetry created by the extra trial. This pattern appears in many interview problems where two random objects differ by one step, one observation, or one resource.

It also shows why symmetry is more powerful than brute-force enumeration. A direct binomial calculation is possible, but it obscures the invariant structure and introduces unnecessary algebra.

## Common Mistakes

- **Expanding both binomial distributions.** Correct but unnecessarily expensive; the interview insight is symmetry plus the tie state.
- **Saying the answer is `1/2` merely because the coins are fair.** Fairness alone does not settle a comparison between `n+1` and `n` tosses.
- **Forgetting the tie state.** The extra coin matters precisely on the `q` mass.
- **Thinking an initially one-head deficit can become a strict win.** One extra head only closes a one-head deficit to a tie.

## Extensions & Variants

### A second symmetry view

Alice has one more toss than Bob. Pair the first `n` tosses of Alice with Bob's `n` tosses. The equal-sized comparison is symmetric under exchanging the players, while Alice's extra fair toss resolves exactly half of the tie mass in her favor. This is the same structural argument without computing `p` or `q` separately.

### What if the extra coin is biased?

If Alice's extra coin has head probability `r`, while the first `n` tosses of each player remain identically distributed, then

`P(Alice wins)=p+r q`.

Only when `r=1/2` does the identity `2p+q=1` collapse this to `1/2` for every `n`.

</details>
