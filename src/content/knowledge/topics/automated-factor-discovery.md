---
title: Automated Factor Discovery
description: A research program for generating, evaluating, de-duplicating, and promoting candidate alpha factors through reproducible search loops.
type: topic
domain: AI & Research Agents
category: Automated Factor Discovery
status: growing
date: 2026-08-14
tags:
  - factor mining
  - LLM agents
  - genetic programming
  - research automation
featured: true
related:
  - walk-forward-validation
relatedNotes:
  - research-system-design
---

## Scope

Automated factor discovery treats alpha research as a controlled search process rather than a sequence of isolated manual experiments. Candidate expressions or hypotheses are proposed, translated into computable features, evaluated under a common protocol, compared with existing factors, and either rejected, refined, or promoted into a persistent factor library.

## Core questions

- How should candidate factors be generated without collapsing into random expression search?
- Which economic priors, operator constraints, and data boundaries should guide the search space?
- How should factors be ranked when predictive strength, turnover, stability, exposure, redundancy, and trading cost all matter?
- How can an automated loop retain experiment lineage so that humans and agents can audit why a candidate was promoted or rejected?

## Search methods

A modular discovery system can accommodate several search families, including rule-based templates, genetic programming, LLM-guided hypothesis generation, reinforcement-learning-style search, and surrogate models. These methods should share the same downstream evaluation contract so differences in search algorithms do not silently change the research standard.

## Validation

The strongest protection against automated overfitting is not a single metric but a layered validation process. Candidate factors should be evaluated on temporally valid samples, across regimes and universes where appropriate, with transaction-cost and exposure analysis, and against a library of existing signals for redundancy.

Walk-forward validation is therefore a core companion concept: the discovery mechanism must not use future evaluation results to influence earlier simulated decisions.

## Research infrastructure

A scalable loop benefits from:

- a shared operator system;
- vectorized or precomputed data layers;
- standardized backtest outputs;
- factor correlation and de-duplication;
- experiment lineage and versioning;
- a core factor library distinct from the raw candidate library;
- interfaces that allow both human researchers and agents to work on the same research objects.

## Open questions

Important open problems include controlling multiple-testing bias, measuring novelty rather than syntax difference, allocating search budget adaptively, and making agent-generated hypotheses economically interpretable enough to survive manual review.
