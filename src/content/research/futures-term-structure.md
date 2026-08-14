---
title: Futures Term Structure & Spread Research
description: Research on dominant and secondary futures contracts, term structure, roll dynamics, and spread state modeling.
category: Futures
status: Active Research
date: 2026-08-10
tags: [Futures, Term Structure, Spread, Microstructure]
featured: true
---
## Research question
Can the price relationship between actively traded futures contracts reveal persistent information about inventory pressure, expectations, roll demand, and liquidity regimes?

## Motivation
Term-structure signals are economically interpretable but operationally subtle. Contract selection, roll timing, liquidity, expiry effects, and changing dominant-contract identities can materially alter measured spreads.

## Methodology
The research pipeline builds contract-state features, carry and curvature measures, spread normalization, event filters, liquidity diagnostics, and regime-conditioned models. Backtests preserve contract identity and avoid look-ahead in dominance selection.

## Data
Daily and intraday futures prices, volume, open interest, contract metadata, and derived curve features.

## Experiments
Experiments compare trend, mean reversion, event-conditioned entry, and cross-sectional relative-value formulations with explicit cost and turnover assumptions.

## Limitations and next steps
The largest risks are contract-selection leakage and unstable normalization across commodities. Future work focuses on event-level gating and structural regime labels.
