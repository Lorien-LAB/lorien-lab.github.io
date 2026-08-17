---
problemId: conditional-probability-bayes-006
title: Golden Face and a Reweighted Hidden Object
description: Condition on an observed face and see why hidden objects are reweighted by how many ways they could have generated the observation.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Conditional Probability, Bayes]
tags: [Probability, Bayes, Selection Bias, Interview]
quantInterviewTopics: [probability-statistics, conditional-probability-bayes]
concepts: [conditioning, bayes-rule-base-rates]
techniques: []
prerequisites: []
relatedProblems: []
family: latent-object-observation
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

There are three two-sided objects:

- `GG`: both faces are gold;
- `GB`: one face is gold and one is black;
- `BB`: both faces are black.

Choose one of the three objects uniformly at random. Its orientation is random, so the **visible face** is equally likely to be either of its two faces. You observe that the visible face is gold.

What is the probability that the hidden face is also gold?

## Think Before Revealing

The objects were uniform **before** the observation. After observing gold, are all compatible objects still equally likely?

<details>
<summary>Hint 1</summary>

Compare `P(observed gold | GG)` with `P(observed gold | GB)`.

</details>

<details>
<summary>Hint 2</summary>

Alternatively, list all individual gold faces that could have generated the observation. How many belong to `GG`?

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let `O` be the event that the **observed face** is gold.

The prior probabilities are

`P(GG)=P(GB)=P(BB)=1/3`.

The observation likelihoods are

`P(O | GG)=1`,

`P(O | GB)=1/2`,

`P(O | BB)=0`.

By Bayes' rule,

`P(GG | O)`

`= [(1)(1/3)] / [(1)(1/3)+(1/2)(1/3)+(0)(1/3)]`

`= (1/3)/(1/2)`

`= 2/3`.

If the selected object is `GG`, the hidden face is necessarily gold; if it is `GB`, the hidden face is black once the visible face is gold. Therefore

`P(hidden face is gold | observed gold)=2/3`.

### Visible-face counting route

There are exactly three individual gold faces in the whole collection that can generate the observation:

- two gold faces belong to `GG`;
- one gold face belongs to `GB`.

Conditioning on having observed a gold face makes those three generating faces equally relevant. Two of the three imply that the selected object is `GG`, again giving

`2/3`.

This is a small example of **selection bias / size-bias reweighting**: `GG` is twice as likely as `GB` to generate a gold observation because it has twice as many gold faces.

## Why This Problem Matters

Uniform selection of a hidden object does not imply a uniform posterior after you observe one of its features. The observation reweights latent states according to their likelihood of producing what you saw.

This is the same Bayesian structure behind length-biased sampling, survivorship, inspection paradoxes, diagnostic testing, and datasets in which some hidden states are more likely to enter the observed sample.

## Common Mistakes

- Saying the answer is `1/2` because only `GG` and `GB` remain possible.
- Forgetting that `GG` is twice as likely as `GB` to produce the observed gold face.
- Treating object selection and face observation as the same random step.
- Counting compatible objects rather than weighting them by their observation likelihoods.
- Using Bayes' formula without identifying the evidence-generation mechanism.

## Extensions & Variants

Suppose hidden object `i` has prior probability `p_i` and a fraction `g_i` of its faces/features are gold. After observing gold,

`P(i | gold) = p_i g_i / Σ_j p_j g_j`.

This is the general reweighting rule. A state becomes more common in the observed sample when it either had a larger prior or had more ways to generate the observation.

</details>
