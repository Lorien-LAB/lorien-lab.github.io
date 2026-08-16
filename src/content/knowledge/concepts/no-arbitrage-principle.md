---
title: No-Arbitrage Principle
description: The pricing principle that rules out zero- or negative-cost portfolios with nonnegative payoffs and a genuine possibility of a strictly positive payoff.
type: concept
domain: Finance
category: Derivatives & Pricing
status: growing
date: 2026-08-16
tags: [No-Arbitrage, Derivatives, Pricing]
featured: false
related: [option-price-convexity-in-strike, static-arbitrage-construction]
relatedNotes: []
---

## Core idea

A set of market prices is inconsistent if one can form a self-financing portfolio whose initial cost is nonpositive, whose terminal payoff is never negative, and whose terminal payoff is strictly positive in a state that can genuinely occur.

This is the economic engine behind many interview identities and inequalities: law of one price, dominance bounds, put-call parity, monotonicity, and convexity restrictions on option prices.

## Recognition pattern

When several securities share the same underlying and maturity, ask whether a linear combination can cancel the initial cost while leaving a one-sided terminal payoff.

## Important nuance

A payoff that is nonnegative for every terminal state and positive only on states that are impossible under the stated market model is not a strict arbitrage. Interview solutions sometimes suppress this support assumption, so state it when it matters.

## Common trap

Do not stop after finding a suspicious price inequality. Write the actual portfolio, compute its initial cash flow, and check the payoff over every relevant state region.
