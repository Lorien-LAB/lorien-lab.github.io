---
title: Counting, Permutations & Combinations
description: A finite-counting toolkit for product rules, factorials, ordered selections, combinations, and binomial coefficients in interview probability problems.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-17
tags: [Probability, Counting, Permutations, Combinations]
quantInterviewTopics: [probability-statistics, combinatorial-probability]
featured: false
related: [finite-combinatorial-probability-modeling, inclusion-exclusion-derangements, probability-spaces-events]
relatedNotes: []
---

## Core idea

Combinatorial probability begins before the probability calculation: first decide **what one elementary outcome is**, then count those outcomes without omissions or double counting. Most interview mistakes in this area come from mixing ordered and unordered descriptions of the same experiment.

The basic workflow is:

1. define the object being counted;
2. decide whether order matters;
3. decide whether repetition is allowed;
4. apply the smallest counting rule that matches the model;
5. only then convert counts into probabilities when the elementary outcomes are equiprobable.

## Product rule

The **product rule**, also called the multiplication principle, says that if a construction has successive stages with `m_1, m_2, ..., m_k` available choices, and every complete object is produced by exactly one sequence of stage choices, then the total number of objects is

`m_1 m_2 ... m_k`.

For example, if a code has one letter followed by two distinct digits, there are

`26 * 10 * 9`

possible codes. The second digit has only nine choices because repetition was forbidden.

The important condition is uniqueness of representation: each final object must correspond to exactly one counted construction path.

## Factorials and permutations

The number of ways to arrange `n` distinct objects is

`n! = n(n-1)...2*1`,

with `0! = 1`.

If we choose and order `r` distinct objects from `n`, then

`P(n,r) = n! / (n-r)!`.

This is an **ordered** selection. A first-place/second-place/third-place podium is a permutation because exchanging two selected people changes the outcome.

Repeated symbols require a different adjustment. If an arrangement of `n` objects contains indistinguishable groups of sizes `n_1, ..., n_k`, the number of distinct sequences is

`n! / (n_1! ... n_k!)`.

## Combinations

If we choose `r` objects from `n` and **order does not matter**, every unordered set is represented by `r!` different orderings. Therefore

`C(n,r) = n! / (r!(n-r)!)`.

Useful identities include

`C(n,r) = C(n,n-r)`

and Pascal's identity

`C(n,r) = C(n-1,r) + C(n-1,r-1)`.

The symmetry identity is often a modeling shortcut: choosing the `r` selected objects is equivalent to choosing the `n-r` excluded objects.

## Ordered versus unordered modeling

A fast interview test is: **if I swap two selected positions, do I get a genuinely different outcome?**

- A five-card hand is unordered: use combinations.
- A five-card sequence dealt into labeled positions is ordered: use permutations or the product rule.
- A tournament bracket has labeled structural positions, so positions matter even if the players themselves form an unordered set before placement.
- A committee is normally unordered unless roles such as chair and treasurer are assigned.

You may count a problem using an ordered sample space even when the question is naturally unordered, but then both numerator and denominator must use that same granularity. Mixing the two is a classic factor-of-`r!` error.

## Binomial coefficients and the binomial theorem

The same combination count appears algebraically. The **binomial theorem** is

`(x+y)^n = sum_{r=0}^n C(n,r) x^r y^(n-r)`.

Why does `C(n,r)` appear? To obtain a term containing exactly `r` copies of `x`, choose which `r` of the `n` factors contribute `x`; the remaining factors contribute `y`.

This connection is useful in probability because binomial coefficients simultaneously count subsets and appear in binomial probabilities. Still, algebraic identities involving binomial coefficients are not automatically probability questions; the probabilistic model must be supplied separately.

## A counting checklist

Before writing a factorial, ask:

- What is one elementary object?
- Are objects distinct or are some indistinguishable?
- Does order matter?
- Is repetition allowed?
- Are positions labeled?
- Am I counting a subset, a sequence, a partition, or an arrangement?
- Does every object get counted exactly once?

A short verbal answer to those questions is often more valuable in an interview than immediately writing a formula.

## Common failure modes

**Dividing by a factorial without justification.** Divide by `r!` only when each unordered outcome was counted exactly `r!` times.

**Using combinations for labeled roles.** Selecting Alice and Bob as `{Alice, Bob}` is different from assigning Alice as chair and Bob as treasurer.

**Changing sample-space granularity halfway through.** If the denominator counts ordered deals, the numerator must count ordered favorable deals too.

**Treating every appearance of `C(n,r)` as a probability.** Combinations are counts; probability requires a probability model.

## Interview Checks

- Ten finalists compete for gold, silver, and bronze. Should the count be `C(10,3)` or `P(10,3)`? Explain why.
- How many five-card subsets can be chosen from a 52-card deck? Why is the answer `C(52,5)` rather than `P(52,5)`?
- Show directly why `P(n,r) = C(n,r) r!`.
- Give a combinatorial explanation of `C(n,r) = C(n,n-r)`.
- In the expansion of `(x+y)^n`, why is the coefficient of `x^r y^(n-r)` equal to `C(n,r)`?
