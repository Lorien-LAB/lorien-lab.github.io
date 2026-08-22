---
title: Bayes Rule and Base Rates
description: Update beliefs from priors and likelihoods, reason in posterior odds, and avoid base-rate and missing-prior mistakes in quantitative interviews.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-17
tags: [Probability, Bayes, Base Rates, Inference]
quantInterviewTopics: [probability-statistics, conditional-probability-bayes]
featured: false
related: [conditioning]
relatedNotes: []
---

## Core Idea

Bayes' rule reverses the direction of conditioning. It combines what you believed before seeing evidence with how likely that evidence would be under competing hypotheses.

For hypotheses `H_1,...,H_k` forming a partition and observed evidence `E`,

`P(H_i | E) = P(E | H_i) P(H_i) / Σ_j P(E | H_j) P(H_j)`.

The pieces have distinct roles:

- **prior** `P(H_i)`: probability assigned before the new evidence;
- **likelihood** `P(E | H_i)`: how compatible the evidence is with that hypothesis;
- **evidence** `P(E)`: the marginal probability of seeing the observation;
- **posterior** `P(H_i | E)`: probability after updating on the evidence.

Bayes' rule is therefore not the statement that `P(A | B)=P(B | A)`. Those two conditional probabilities usually differ because they answer different questions and use different denominators.

## Derivation from Conditioning and Total Probability

By conditional probability,

`P(H_i | E) = P(H_i ∩ E) / P(E)`.

Using the multiplication rule,

`P(H_i ∩ E) = P(E | H_i)P(H_i)`.

If the hypotheses form a partition, the law of total probability gives

`P(E) = Σ_j P(E | H_j)P(H_j)`.

Substituting both identities yields Bayes' rule. This derivation is often more useful in interviews than memorizing a formula because it tells you what to do when there are more than two hypotheses.

## Posterior Odds and Likelihood Ratios

For two hypotheses `H_1` and `H_0`, Bayes can be written as

`posterior odds = prior odds × likelihood ratio`,

where

`posterior odds = P(H_1 | E) / P(H_0 | E)`,

`prior odds = P(H_1) / P(H_0)`,

and the **likelihood ratio** is

`P(E | H_1) / P(E | H_0)`.

Odds form is especially convenient when evidence arrives sequentially. If observations are conditionally independent given the hypothesis, each new observation multiplies the current odds by another likelihood ratio.

## Repeated Evidence: Hidden Coin Example

Suppose a selected coin is double-headed with prior probability `π` and otherwise fair. After observing `n` consecutive heads,

`P(H^n | D)=1`,

while

`P(H^n | F)=2^{-n}`.

Therefore

`P(D | H^n) = π / [π + (1-π)2^{-n}]`.

In odds form,

`posterior odds(D:F) = prior odds(D:F) × 2^n`.

The sequence of heads is strong evidence for the double-headed hypothesis because it is exponentially more likely under `D` than under `F`.

## Base Rates Matter

A large likelihood ratio does not automatically imply a large posterior probability. A rare hypothesis begins with small prior odds and may remain unlikely even after fairly diagnostic evidence.

This is the **base-rate** lesson. In diagnostic tests, fraud detection, rare-event classification, and interview puzzles, ignoring the prior prevalence can produce a posterior that is orders of magnitude too large.

A useful calculation template is:

1. imagine a concrete population size;
2. split it according to the base rate;
3. apply sensitivity/false-positive rates to each branch;
4. condition on the observed positive cases.

That frequency representation is algebraically equivalent to Bayes and often makes the denominator easier to see.

## Missing Priors and Model Ambiguity

Evidence alone is not always enough to define a Bayesian answer. If an ordinary-looking coin produces 100 heads in a row, the probability of heads on the next toss depends on the model class and prior beliefs about what kinds of coins could have been selected.

For example, a model containing only a fair coin and a double-headed coin gives one posterior. A richer model allowing arbitrary unknown biases gives another. Without a prior over those possibilities, there is no unique Bayesian posterior to compute.

So when an interview question gives observations but does not specify how the hidden parameter or object was generated, ask whether the prior/model is stated or can be inferred from symmetry. If not, identify the ambiguity before producing a number.

## Selection and Latent Objects

Bayes is also a way to correct for selection-biased evidence. Suppose several hidden objects have different numbers of observable features of the type you just saw. Conditioning on observing that feature reweights objects in proportion to how many ways each could have generated the observation.

This explains why “choose an object uniformly” does **not** imply the posterior over objects remains uniform after you inspect a randomly selected face, card, component, survivor, or report.

## Common Traps

- Confusing `P(A | B)` with `P(B | A)`.
- Using the likelihood as though it were the posterior.
- Dropping the prior/base rate from the numerator or denominator.
- Forgetting all alternative hypotheses when computing the evidence term.
- Treating repeated observations as independent without conditioning on the hidden hypothesis.
- Giving a unique posterior when the prior or model class is not specified.

## Interview Checks

1. **Double-headed coin.** A coin is double-headed with prior probability `π` and otherwise fair. After `n` heads, write the posterior that it is double-headed.  
   Answer: `π / [π + (1-π)2^{-n}]`.

2. **Odds update.** If prior odds for `H_1:H_0` are `1:99` and evidence has likelihood ratio `20`, what are the posterior odds?  
   Answer: `20:99`.

3. **Base-rate check.** A condition has prevalence 1%, a test has 99% sensitivity, and a 5% false-positive rate. Is `P(condition | positive)` close to 99%?  
   No. Bayes gives `0.99×0.01 / (0.99×0.01 + 0.05×0.99) ≈ 1/6.0`, about 16.7%.

4. **Direction of conditioning.** Why are `P(A | B)` and `P(B | A)` generally different?  
   Their numerators share `P(A ∩ B)`, but their normalizing denominators are `P(B)` and `P(A)` respectively.

5. **Missing-prior diagnosis.** An unspecified “ordinary-looking” coin has produced 100 heads. Can you compute a unique probability that the next flip is heads?  
   Not from those observations alone. You need a prior/model for the possible coin biases or hidden coin types.
