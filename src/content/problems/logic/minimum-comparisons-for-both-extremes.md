---
problemId: logic-problem-simplification-005
title: Minimum Comparisons for Both Extremes
description: Find both the minimum and maximum of distinct inputs with an optimal paired-comparison algorithm and prove its comparison lower bound.
date: '2026-08-30'
domain: Computer Science
category: Algorithms
subcategories: [Comparison Algorithms, Lower Bounds]
tags: [Algorithms, Comparisons, Lower Bounds, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, problem-simplification, algorithms-data-structures-cpp, algorithmic-complexity]
concepts: [small-cases-recurrence-and-structural-simplification]
techniques: []
prerequisites: []
relatedProblems: [two-egg-threshold-search]
family: comparison-extremes
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 18
status: solved
featured: false
---

## Problem

Given $n\geq2$ distinct inputs, find both the minimum and the maximum using comparisons only. Determine the smallest possible worst-case number of comparisons, describe an algorithm that attains it for even and odd $n$, and prove that no comparison algorithm can do better.

## Think Before Revealing

<details><summary>Hint 1</summary>Compare inputs in pairs first. A pair's smaller member only needs to compete for the minimum, while its larger member only needs to compete for the maximum.</details>
<details><summary>Hint 2</summary>For the lower bound, track which inputs could still be the minimum or maximum and use an adversary that prevents a comparison from eliminating two established candidates at once.</details>

<details>
<summary>Show Solution</summary>

## Solution

The optimal worst-case count is

$$
\left\lceil\frac{3n}{2}\right\rceil-2,
$$

or, in plain-text notation, ceil(3n/2)-2.

For even n, write $n=2m$ and divide the inputs into $m$ pairs. Compare within every pair, using $m$ comparisons. Put each pair's smaller member in a minimum-candidate group and its larger member in a maximum-candidate group. Finding the minimum among the $m$ smaller members takes $m-1$ more comparisons, and finding the maximum among the $m$ larger members takes another $m-1$. The total is

$$
m+(m-1)+(m-1)=3m-2=\frac{3n}{2}-2.
$$

For odd n, write $n=2m+1$. Leave one input unpaired and initialize both the running minimum and running maximum to it. For each of the remaining $m$ pairs, first compare the pair's two members, then compare the smaller member with the running minimum and the larger member with the running maximum. This uses exactly three comparisons per pair, for

$$
3m=\frac{3(n-1)}{2}=\left\lceil\frac{3n}{2}\right\rceil-2.
$$

It remains to prove a matching lower bound. Consider an adversary that keeps each untouched input unclassified. On its first useful comparison, an input is classified as either a high candidate that has not lost and could still be the maximum, or a low candidate that has not won and could still be the minimum. The adversary maintains all high candidates above all low candidates and answers comparisons consistently with that partial order.

Only a comparison between two untouched inputs can classify two inputs at once: its winner becomes high and its loser becomes low. Let $x$ be the number of such comparisons. Because they use disjoint untouched pairs, $x\leq\lfloor n/2\rfloor$. A comparison between an untouched input and a classified input is answered so that it classifies only the untouched input without eliminating the existing candidate. Consequently, classifying all inputs requires at least

$$
x+(n-2x)=n-x
$$

comparisons.

Every input is eventually placed into one of the two candidate groups. To certify the maximum, all but one high candidate must eventually lose; to certify the minimum, all but one low candidate must eventually win. These are $n-2$ candidate eliminations in total. The adversary lets a high candidate lose only in a high-versus-high comparison and a low candidate win only in a low-versus-low comparison. Each such comparison eliminates at most one candidate, while a high-versus-low comparison eliminates none. Thus at least $n-2$ additional comparisons are required, even if classification and elimination comparisons are interleaved.

The lower bound is therefore

$$
(n-x)+(n-2)=2n-x-2
\geq2n-\left\lfloor\frac n2\right\rfloor-2
=\left\lceil\frac{3n}{2}\right\rceil-2.
$$

The paired algorithm reaches this lower bound for both even n and odd n, so it is optimal.

## Why This Problem Matters

Pairing extracts two kinds of information from one comparison and prevents later work from being duplicated. The matching adversary argument illustrates the difference between exhibiting a fast algorithm and proving that its worst-case cost cannot be improved.

## Common Mistakes

- Running separate minimum and maximum scans, which uses $2n-2$ comparisons and discards the pair structure.
- Giving only the even-n count and overlooking how the unpaired input initializes both extremes.
- Claiming optimality from the upper-bound algorithm without a lower-bound certificate or adversary argument.
- Counting candidate eliminations without explaining why one comparison cannot eliminate both a high and a low candidate under the adversary.

## Extensions

- If equal inputs are allowed, specify whether the goal is an extreme value or the identities of every input attaining it.
- Store each comparison result to build tournament certificates that support finding the second minimum or second maximum.
- Compare the worst-case count with parallel comparison depth when disjoint pairs can be processed simultaneously.

</details>
