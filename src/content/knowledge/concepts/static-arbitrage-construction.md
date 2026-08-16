---
title: Static Arbitrage Construction
description: A reusable interview technique for turning inconsistent cross-sectional quotes into a zero- or negative-cost portfolio with one-sided terminal payoff.
type: concept
domain: Finance
category: Problem Solving Techniques
status: growing
date: 2026-08-16
tags: [Problem Solving, Arbitrage, Options]
quantInterviewTopics: [derivatives-options-no-arbitrage, no-arbitrage-option-properties]
featured: false
related: [no-arbitrage-principle, option-price-convexity-in-strike]
relatedNotes: []
---

## Core idea

Translate a suspected pricing inconsistency into a concrete portfolio. Choose long and short weights so that the initial prices cancel, then analyze the terminal payoff piece by piece.

## Canonical pattern

1. Write each security payoff as a function of the same terminal state variable.
2. Choose weights that make the initial net cost zero or negative.
3. Identify all payoff breakpoints, such as option strikes.
4. Check the portfolio payoff on every interval between breakpoints.
5. Verify where the payoff is strictly positive and whether those states are possible.

## Recognition pattern

Use this technique when an interviewer gives several prices for the same maturity and asks whether they are mutually consistent, especially for calls, puts, digitals, forwards, or simple spreads.

## Common trap

A correct-looking trade can still fail because of one missed state interval, a reversed long/short sign, or an unstated assumption about the support of the underlying.
