---
problemId: random-walks-markov-chains-003
title: Random Recoloring Consensus Time
description: Trace ordered-pair recoloring backward through ancestral lineages to derive the expected time to unanimity.
date: 2026-08-24
domain: Mathematics & Statistics
category: Stochastic Processes
subcategories: [Random Walks, Markov Chains]
tags: [Probability, Stochastic Processes, Markov Chains, Interview]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
concepts: [finite-state-markov-chains]
techniques: [markov-chain-state-compression, first-step-analysis]
prerequisites: []
relatedProblems: []
family: voter-recoloring-coalescence
mathDifficulty: 3
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 18
status: solved
featured: false
---

## Problem

There are n labeled balls, initially painted with n distinct colors. At each discrete step, choose uniformly one of the (n(n-1)) ordered pairs of distinct balls. The first ball in the pair adopts the second ball's current color. Every update counts as one step, including an update between same-colored balls that causes no visible change. What is the expected number of steps until all balls have one color?

## Think Before Revealing

The visible number of colors decreases, but two configurations with the same number of colors can have different color-class sizes and different next-step probabilities. Seek a state whose transitions ignore those class sizes.

<details>
<summary>Hint 1</summary>

Do not write a forward recursion using only the number of visible colors. For example, partitions (3,1) and (2,2) both have two colors but do not have the same chance of losing a color on the next update.

</details>

<details>
<summary>Hint 2</summary>

Trace the ancestry of the colors backward through the copying events. Backward lineages move between labeled positions and coalesce when one update connects two occupied lineage positions.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Expose the update sequence backward from the eventual observation time. Each current color has an ancestral ball at time zero. Backward through an update in which recipient (i) copied donor (j), a lineage at (i) jumps to (j); if a lineage already occupies (j), the two lineages coalesce. Thus active lineages occupy distinct labeled positions even though their forward descendant color classes may have unequal sizes.

Suppose there are (k) active lineages. Among the (n(n-1)) equally likely ordered recipient-donor pairs, exactly (k(k-1)) pairs select two different occupied lineage positions. Those and only those pairs cause the next coalescence, so its one-step probability is

```text
k(k-1) / (n(n-1))
```

While the process remains at (k), repeated noncoalescing updates simply count as failures before the next success. The waiting time to go from (k) to (k-1) lineages is geometric with mean

```text
n(n-1) / (k(k-1))
```

Lineage count can fall only by one at an update. By linearity of expectation across the successive levels and the identity (1/(k(k-1))=1/(k-1)-1/k),

```text
E[T] = sum_(k=2)^n n(n-1)/(k(k-1)) = (n-1)^2
```

Indeed, the telescoping sum is (1-1/n), so (n(n-1))(1-1/n)=(n-1)^2). For (n=1), unanimity already holds and the answer is zero steps.

The forward number of colors is insufficient because its transition law depends on the full color-class sizes. The distinct initial colors assumption is required: it makes visible unanimity equivalent to one surviving ancestral lineage. With repeated initial colors, different surviving ancestors can already share a visible color. The ordered-pair protocol is also essential. If the pair were sampled with replacement, including self-pairs, the denominator would be (n^2); the same lineage calculation would then give expectation (n(n-1)), not ((n-1)^2).

## Why This Matters

The forward statistic that looks obvious is not Markov, while a backward genealogical statistic is. This reversal converts a configuration-dependent recoloring process into a one-dimensional pure-death chain. The calculation is also a reminder that unchanged updates still consume time and therefore belong in transition probabilities.

## Common Mistakes

- Counting unordered pairs even though recipient and donor roles make the update ordered.
- Omitting same-colored or otherwise noncoalescing updates even though every update counts.
- Treating the forward number of colors as sufficient without recording color-class sizes.
- Reusing ((n-1)^2) when pairs are sampled with replacement and self-pairs are allowed.

## Extensions

1. Give donor positions unequal weights; derive the backward lineage transition law and identify what additional state replaces the scalar lineage count.
2. Allow non-distinct initial colors; distinguish genealogical coalescence from visible consensus and derive a state that records the needed initial-color labels.
3. Compare ordered sampling without replacement with ordered sampling including self-pairs and verify the two denominators directly.

</details>
