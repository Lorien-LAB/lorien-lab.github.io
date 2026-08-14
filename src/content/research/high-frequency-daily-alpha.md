---
title: High-frequency Data → Daily Alpha
description: Compressing one-minute bars and order-book behavior into robust daily factors with interpretable market-microstructure logic.
category: Market Microstructure
status: Research Track
date: 2026-08-03
tags: [High Frequency, Daily Alpha, Order Book, Microstructure]
featured: true
---
## Research question
Which intraday path and order-book features retain economically meaningful information when aggregated into a daily cross-sectional signal?

## Feature families
The research space includes price-path geometry, signed volume imbalance, realized volatility shape, liquidity resilience, spread dynamics, opening/closing asymmetry, jump concentration, intraday reversal, and order-flow persistence.

## Aggregation principle
Instead of averaging everything, features preserve **where**, **when**, and **under which liquidity state** an intraday effect occurs. Distributional summaries and event-conditioned statistics are often more informative than simple means.

## Validation
Each factor is tested for coverage, outliers, IC stability, monotonicity, turnover, capacity sensitivity, and correlation with existing core factors.

## Next steps
Build a daily feature factory that exposes provenance and raw-event drilldown for every aggregated signal.
