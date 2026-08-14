---
title: LLM-based Factor Discovery Engine
description: Loop-engineered factor generation combining language-model hypotheses with deterministic validation and multiple search backends.
status: Prototype
date: 2026-08-12
tags: [LLM, Factor Mining, Genetic Programming, RL]
featured: true
metrics:
  Search: Pluggable
  Validation: Multi-stage
---
## Problem
LLMs can produce many factor ideas, but raw idea volume is not research quality. The system needs syntax constraints, operator-aware generation, evaluation budgets, memory, and anti-redundancy controls.

## Architecture
A loop moves through hypothesis, expression generation, static validation, factor computation, backtest evaluation, similarity filtering, diagnosis, and next-round proposal.

## Search backends
The same evaluation interface can be used by language-model search, genetic programming, reinforcement learning, and surrogate-guided optimization.
