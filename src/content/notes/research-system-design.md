---
title: Why the Research Workbench, Agent, and Search Algorithm Should Be Separate
description: A system-design note on keeping quantitative research infrastructure modular, auditable, and friendly to both humans and agents.
date: 2026-08-14
tags: [Research Systems, Agents, Architecture]
category: Research Engineering
draft: false
---
A quantitative research platform becomes difficult to evolve when the user interface, experiment state, agent loop, and search algorithm are treated as one monolithic system.

## Workbench: durable state
The workbench should own datasets, factor definitions, backtest artifacts, evaluation results, lineage, permissions, and user-facing views. It is the durable system of record.

## Research agent: bounded orchestration
The agent should decide which permitted research action to take next, but operate through explicit tools and budgets. This makes experiments reproducible and prevents the agent from silently redefining the research protocol.

## Search algorithms: replaceable plugins
LLM search, genetic programming, reinforcement learning, Bayesian or surrogate optimization, and deterministic enumeration have different strengths. A common candidate/evaluation interface allows them to compete or cooperate without contaminating the rest of the platform.

## Why the separation matters
This architecture makes it possible to improve the UI without rewriting search, change the agent policy without migrating research data, and benchmark search algorithms under identical evaluation rules.
