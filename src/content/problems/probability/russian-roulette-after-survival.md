---
problemId: conditional-probability-bayes-004
title: Russian Roulette After Survival
description: Condition on a survived trigger pull to compare spinning again with preserving information about adjacent bullets.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Conditional Probability, Survival Information]
tags: [Probability, Conditioning, Survival, Interview]
quantInterviewTopics: [probability-statistics, conditional-probability-bayes]
concepts: [conditioning]
techniques: []
prerequisites: []
relatedProblems: []
family: survival-conditioning
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

A six-chamber revolver contains exactly two bullets in **adjacent** chambers. The cylinder is spun uniformly at random. Your opponent pulls the trigger and survives. The cylinder is not otherwise randomized between trigger pulls.

You must choose one of two actions before your turn:

1. spin the cylinder uniformly again; or
2. **do not spin** and pull the trigger using the next chamber.

Which action gives the smaller probability of being shot?

## Think Before Revealing

The opponent's survival is information. If you spin again, you erase it. If you do not spin, condition on which empty chamber could have just fired.

<details>
<summary>Hint 1</summary>

Spinning again makes all six chamber positions equally likely, so the loss probability is immediate.

</details>

<details>
<summary>Hint 2</summary>

Conditioned on survival, the current chamber is one of the four empty chambers. Among those four possible empty positions, count how many are immediately before the block of two consecutive bullets.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Label the six chambers around the cylinder. Two consecutive chambers contain bullets and the other four are empty.

### If you spin again

The new spin is uniform and destroys all information from the previous survival. Two of the six chambers contain bullets, so

`P(loss | spin)=2/6=1/3`.

### If you do not spin

Now the previous trigger pull matters. We know it landed on an empty chamber. Conditioned on survival, the current chamber is uniformly distributed over the **four empty chambers**.

Because the two bullets form one adjacent block, exactly **one** of those four empty chambers is immediately followed by a bullet chamber. The other three empty chambers are followed by another empty chamber.

Therefore

`P(loss | survived previous pull, do not spin)=1/4`.

Since

`1/4 < 1/3`,

you should **do not spin**—equivalently, keep the cylinder position information and pull the trigger without re-randomizing it.

The calculation is conditional rather than unconditional. Before learning that the opponent survived, the next chamber does not have the same distribution as it does after survival has ruled out two chamber states and reweighted the possible current positions.

## Why This Problem Matters

The central lesson is that survival is informative. Re-randomizing can discard useful information, while retaining state can improve the conditional probability of the next outcome.

This pattern appears in reliability, survival analysis, path-dependent games, hidden-state filtering, and sequential decisions in which observing that a failure did **not** happen changes the distribution of the underlying state.

## Common Mistakes

- Saying both options have probability `1/3` because there are always two bullets among six chambers.
- Forgetting to **condition on survival** before analyzing the no-spin action.
- Treating the four possible empty current chambers as if two of them led immediately to bullets; adjacent bullets form one block, so only one empty chamber lies immediately before that block.
- Assuming the result is unchanged when the bullet arrangement is different.
- Confusing the current chamber with the next chamber when the cylinder advances.

## Extensions & Variants

If the two bullets are not constrained to be consecutive, the no-spin probability depends on their arrangement. Survival changes the distribution of possible current chambers, but the number of empty chambers immediately followed by bullets can differ.

If the cylinder is spun after every trigger pull, each round is re-randomized and the survival information becomes irrelevant to the next round: the shot probability returns to `2/6=1/3`.

More generally, the right workflow is:

1. condition on the observed survival event;
2. identify the remaining latent states and their conditional weights;
3. compute the transition risk under each action;
4. compare actions only after that update.

</details>
