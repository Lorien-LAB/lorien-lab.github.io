---
problemId: 150-first-look-001
title: Put Quotes and a Zero-Cost Static Portfolio
description: Test whether two same-expiry put quotes are mutually consistent by constructing and checking a static option portfolio.
date: 2026-08-16
originType: book
source: 150-most-frequently-asked
sourceSection: First Look: Ten Questions
sourceChapter: '1'
sourceProblem: '1'
sourceReference: 'Chapter 1 · First Look · Question 1 · printed pp. 1, 3–4'
domain: Finance
category: Options & Derivatives
subcategories: [No-Arbitrage, Static Arbitrage]
tags: [Options, Arbitrage, Convexity, Interview]
concepts: [no-arbitrage-principle, option-price-convexity-in-strike]
techniques: [static-arbitrage-construction]
prerequisites: []
relatedProblems: []
family: static-option-arbitrage
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 8
status: solved
featured: false
---

## Problem

Two European puts have the same underlying asset and expiry. The put with strike 20 trades at 4, while the put with strike 30 trades at 6. Work in the usual nonnegative-price setting, and assume terminal prices in the interval `(0, 30)` are genuinely possible.

Can these two quotes be consistent with no arbitrage? If not, construct a static portfolio with zero initial cost and analyze its payoff at expiry.

## Think Before Revealing

You do not need Black-Scholes. Try to make the two quoted premiums cancel exactly, then inspect the payoff on the intervals separated by strikes 20 and 30.

<details>
<summary>Hint 1</summary>

The prices satisfy `2 × 6 = 3 × 4`. That suggests integer portfolio weights of 2 and 3.

</details>

<details>
<summary>Hint 2</summary>

Try long two strike-30 puts and short three strike-20 puts. The initial net cost is zero. Now evaluate the payoff separately for `S_T ≥ 30`, `20 ≤ S_T < 30`, and `0 ≤ S_T < 20`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Method 1 — construct the portfolio directly

Take the static position

- long 2 puts with strike 30;
- short 3 puts with strike 20.

Its initial cost is

`2 × 6 - 3 × 4 = 0`.

At expiry the payoff is

`V_T = 2(30 - S_T)^+ - 3(20 - S_T)^+`.

Check the three regions.

**1. `S_T ≥ 30`.** Both puts expire worthless, so `V_T = 0`.

**2. `20 ≤ S_T < 30`.** Only the strike-30 puts are in the money:

`V_T = 2(30 - S_T) > 0`.

**3. `0 ≤ S_T < 20`.** Both strikes are in the money:

`V_T = 2(30 - S_T) - 3(20 - S_T) = S_T`.

Thus the portfolio payoff is never negative. It is strictly positive whenever `0 < S_T < 30`. Under the stated support assumption, the trade therefore has zero initial cost, no downside at expiry, and a genuine possibility of a positive payoff: a static arbitrage.

### Method 2 — read the geometry, then verify the trade

Let `P(K)` denote the same-expiry put price at strike `K`. Because a zero-strike put is worthless, `P(0) = 0`. The three observed points are `(0, 0)`, `(20, 4)`, and `(30, 6)`, all with slope `0.2` from the origin.

Arbitrage-free put prices are convex in strike, and the corresponding finite-difference slopes cannot decrease. Here the surface sits exactly on one straight segment. That observation points to the zero-cost linear combination above, but ordinary convexity by itself permits equality. The decisive step is the payoff check: the linear combination is nonnegative everywhere and positive on `(0, 30)`.

## Why This Problem Matters

This problem tests whether you can move from a quote inconsistency to an executable portfolio rather than merely naming a theorem. It also tests whether you distinguish ordinary convexity from strict convexity and notice when an arbitrage claim depends on support assumptions.

## Common Mistakes

- Saying that equality in the convexity inequality automatically “violates convexity.” It does not; ordinary convexity allows equality.
- Reversing the trade and creating a nonpositive payoff instead of a nonnegative one.
- Checking only one moneyness region instead of all strike intervals.
- Calling the portfolio a strict arbitrage without discussing whether states with `0 < S_T < 30` can occur.

## Extensions

- Replace 20 and 30 by general strikes `K_1 < K_2` and derive the cross-strike slope restrictions implied by no arbitrage.
- Ask what changes if the terminal asset can equal zero and all downside mass is concentrated there.
- Relate strike convexity to call spreads, butterfly spreads, and the risk-neutral distribution encoded by strike derivatives of option prices.

</details>
