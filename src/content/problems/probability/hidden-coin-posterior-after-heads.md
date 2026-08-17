---
problemId: conditional-probability-bayes-001
title: Hidden Coin Posterior After Repeated Heads
description: Update the probability that a hidden coin is double-headed after repeated heads, and separate evidence strength from prior assumptions.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Conditional Probability, Bayes]
tags: [Probability, Bayes, Posterior, Interview]
quantInterviewTopics: [probability-statistics, conditional-probability-bayes]
concepts: [conditioning, bayes-rule-base-rates]
techniques: []
prerequisites: []
relatedProblems: []
family: latent-coin-bayes
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

A coin is selected from a hidden mixture. With prior probability `π` it is **double-headed**; with probability `1-π` it is an ordinary fair coin. You observe `n` consecutive heads.

1. What is the posterior probability that the selected coin is double-headed?
2. Evaluate the result for `π=1/10, n=3` and for `π=1/1000, n=10`.
3. What changes if the problem tells you only that an “ordinary-looking coin” has produced many heads but gives no prior or model for possible coin types?

## Think Before Revealing

The observation is much more likely under a double-headed coin than under a fair coin, but a likelihood is not yet a posterior. Keep the prior in the calculation.

<details>
<summary>Hint 1</summary>

Let `D` mean double-headed, `F` fair, and `H^n` mean `n` consecutive heads. Compute `P(H^n | D)` and `P(H^n | F)` first.

</details>

<details>
<summary>Hint 2</summary>

Use Bayes' rule, or update the prior odds `D:F` by the likelihood ratio of the observed sequence.

</details>

<details>
<summary>Show Solution</summary>

## Solution

The two hidden hypotheses are

`P(D)=π`,  `P(F)=1-π`.

If the coin is double-headed, the sequence is certain:

`P(H^n | D)=1`.

If it is fair,

`P(H^n | F)=2^{-n}`.

The marginal probability of the evidence is therefore

`P(H^n)=π + (1-π)2^{-n}`.

Bayes' rule gives

`P(D | H^n) = π / [π + (1-π)2^{-n}]`.

### Numerical check 1

For `π=1/10` and `n=3`,

`P(D | HHH) = (1/10) / [(1/10)+(9/10)(1/8)]`.

Multiplying numerator and denominator by 80 gives

`P(D | HHH)=8/(8+9)=8/17`.

### Numerical check 2

For `π=1/1000` and `n=10`,

`P(D | H^10) = (1/1000) / [(1/1000)+(999/1000)(1/1024)]`.

Multiplying numerator and denominator by `1000×1024` gives

`P(D | H^10)=1024/(1024+999)=1024/2023 ≈ 0.506`.

Ten heads are powerful evidence, yet a one-in-a-thousand prior is so small that the posterior is only slightly above one half.

### Posterior odds route

The likelihood ratio of one head under `D` versus `F` is `2`. For `n` consecutive heads it is `2^n`. Hence

`posterior odds(D:F) = prior odds(D:F) × 2^n`.

This is often the fastest interview calculation when evidence arrives repeatedly.

### What if no prior is specified?

Then there is generally **no unique Bayesian posterior**. A model with only two possible coin types—fair or double-headed—requires a prior probability for those types. A richer model that allows arbitrary biases requires a prior distribution over the bias parameter. The same observed sequence can lead to different posterior predictions under different model classes and priors.

So “many heads” is evidence, but evidence alone does not complete a Bayesian model.

## Why This Problem Matters

This problem separates three quantities that are often blurred together under interview pressure: prior probability, likelihood of the observed data, and posterior probability after updating. It also demonstrates why a rare hypothesis can require substantial evidence before becoming likely.

The general formula is more reusable than memorizing one numerical coin puzzle. It applies to hidden regimes, defective components, fraud states, model selection, and diagnostic classification.

## Common Mistakes

- Answering with the likelihood `P(H^n | D)=1` instead of the posterior `P(D | H^n)`.
- Forgetting the fair-coin branch in the denominator.
- Replacing the prior by `1/2` without justification.
- Saying that sufficiently many heads force a unique next-toss probability even when the prior/model class is unspecified.
- Multiplying unconditional probabilities across tosses without conditioning on the hidden coin type.

## Extensions & Variants

If the alternative coin has head probability `q` instead of `1/2`, then

`P(D | H^n)=π / [π+(1-π)q^n]`

when `D` still means a coin that always lands heads.

More generally, for any two hypotheses `H_1,H_0`, repeated conditionally independent evidence updates posterior odds by multiplying the prior odds by the product of likelihood ratios. That is the reusable structure behind the coin story.

</details>
