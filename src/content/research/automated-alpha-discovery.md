---
title: Automated Alpha Discovery
description: A bounded research loop for proposing, evaluating, filtering, and evolving quantitative factors with LLM and algorithmic search.
category: Alpha Research
status: Active Research
date: 2026-08-14
tags: [Factor Mining, LLM, Search, Research Systems]
featured: true
---
## Research question
How can an automated system search a large factor-expression space without collapsing into redundant, overfit, or economically meaningless signals?

## Motivation
Factor mining is not only an optimization problem. It is also a research-governance problem: hypotheses need provenance, expressions need validity checks, and candidate factors must pass statistical, economic, and redundancy filters before promotion.

## Methodology
The working design separates a **research workbench**, a **bounded research agent**, and **pluggable search algorithms**. Search methods can include LLM proposal, genetic programming, reinforcement learning, surrogate optimization, and deterministic local search while sharing one evaluation contract.

## Data and evaluation
Candidate factors are evaluated on standardized datasets with point-in-time controls, cross-sectional preprocessing, turnover-aware portfolio construction, stability diagnostics, and correlation-based de-duplication.

## Limitations
Automated discovery can scale hypothesis generation faster than it scales scientific judgment. Multiple-testing control, data leakage prevention, and regime stability remain first-class concerns.

## Next steps
Develop a core factor library with lineage tracking, similarity graphs, promotion rules, and agent-readable experiment summaries.
