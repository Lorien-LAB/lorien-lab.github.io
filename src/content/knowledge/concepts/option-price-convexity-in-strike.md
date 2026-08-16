---
title: Option Price Convexity in Strike
description: The model-independent convexity restriction that option prices with a common underlying and expiry must satisfy as functions of strike.
type: concept
domain: Finance
category: Derivatives & Pricing
status: growing
date: 2026-08-16
tags: [Options, Convexity, No-Arbitrage]
featured: false
related: [no-arbitrage-principle, static-arbitrage-construction]
relatedNotes: []
---

## Core idea

For a fixed terminal asset price, both `(K - S_T)^+` and `(S_T - K)^+` are convex functions of strike `K`. Linear pricing therefore implies that arbitrage-free European put and call prices are convex in strike when the underlying and maturity are fixed.

If `K1 < K2 < K3` and `K2 = λ K1 + (1 - λ) K3`, where `0 < λ < 1`, convexity requires

`P(K2) ≤ λ P(K1) + (1 - λ) P(K3)`.

Equivalently, finite-difference slopes in strike cannot decrease.

## Interview interpretation

Convexity lets you detect malformed option surfaces and construct butterfly-like static trades. It is often faster to reason from payoff geometry than to invoke a pricing model.

## Important nuance

No-arbitrage gives ordinary convexity, not strict convexity in every imaginable market. Equality along a strike interval can occur in degenerate support cases. Strictness requires additional assumptions about where the terminal underlying can lie.

## Common trap

Do not claim that equality in the convexity inequality is automatically a model-free arbitrage. Check the terminal payoff and the support assumptions explicitly.
