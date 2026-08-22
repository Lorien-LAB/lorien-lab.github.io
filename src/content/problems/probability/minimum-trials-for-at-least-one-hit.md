---
problemId: probability-foundations-005
title: Minimum Trials for At Least One Hit
description: Use independence and a complement event to find the minimum number of uniform trials needed to exceed a target hit probability.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Probability Foundations, Independence]
tags: [Probability, Independence, Complement, Interview]
quantInterviewTopics: [probability-statistics, probability-foundations]
concepts: [probability-axioms-derived-rules]
techniques: []
prerequisites: []
relatedProblems: []
family: at-least-one-success
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
status: solved
featured: false
---

## Problem

Generate independent random variables `U_1,U_2,... ~ U[0,1]`. What is the smallest integer `N` such that the probability that **at least one** of the first `N` variables lies in `[0.70,0.72]` is at least `95%`?

## Think Before Revealing

“At least one hit” is a union of many overlapping events. Its complement is a single simple event.

<details>
<summary>Hint 1</summary>

The interval has length `0.02`. Therefore one draw misses it with probability `0.98`.

</details>

<details>
<summary>Hint 2</summary>

Use independence to multiply the miss probabilities, then solve `1-0.98^N >= 0.95`. Remember that `ln(0.98)` is negative when dividing the logarithmic inequality.

</details>

<details>
<summary>Show Solution</summary>

## Solution

For one `U[0,1]` draw,

`P(0.70 <= U <= 0.72) = 0.02`,

so

`P(one draw misses) = 0.98`.

Because the draws are independent,

`P(all N draws miss) = 0.98^N`.

The event “at least one hit” is the complement of “all miss,” hence

`P(at least one hit) = 1 - 0.98^N`.

We need

`1 - 0.98^N >= 0.95`,

so

`0.98^N <= 0.05`.

Taking logarithms gives

`N ln(0.98) <= ln(0.05)`.

Since `ln(0.98)<0`, dividing reverses the inequality:

`N >= ln(0.05) / ln(0.98)`.

Numerically,

`ln(0.05) / ln(0.98) ≈ 148.28`.

Therefore the smallest integer satisfying the requirement is

**`N = 149`.**

The two pieces of reasoning have distinct roles:

- **independence** justifies multiplying the single-trial miss probability to obtain `0.98^N`;
- the **complement event** turns a complicated “at least one” union into one all-miss calculation.

## Why This Problem Matters

“At least one” thresholds occur constantly in reliability, simulation, search, sampling, and risk questions. The reusable pattern is

`P(at least one success) = 1 - P(no successes)`.

When trials are independent, the no-success event often has a product form that can be inverted with logarithms.

## Common Mistakes

- **Adding `0.02` N times.** The success events are not mutually exclusive; multiple hits can occur.
- **Writing `0.98^N` without stating independence.** The product is justified by independence, not by the complement rule.
- **Forgetting to reverse the inequality** when dividing by `ln(0.98)<0`.
- **Rounding down to 148.** A minimum integer satisfying a lower bound requires a ceiling, so the answer is 149.

## Extensions & Variants

If one independent trial succeeds with probability `p_hit` and the target probability of at least one success is `p_target`, with `0<p_hit<1` and `0<p_target<1`, then

`1-(1-p_hit)^N >= p_target`.

Equivalently,

`N >= log(1-p_target) / log(1-p_hit)`.

Thus the minimum integer is

`ceil(log(1-p_target) / log(1-p_hit))`.

This formula depends on independent trials. Dependence can change the answer substantially even when every individual trial has the same marginal hit probability.

</details>
