---
title: Quant Research Harness
description: A modular research workbench for data processing, factor experiments, backtesting, diagnostics, and agent-assisted workflows.
status: In Development
date: 2026-08-14
tags: [Python, Research Platform, Backtesting, Agents]
featured: true
metrics:
  Architecture: Modular
  Interface: Human + Agent
---

## Research problem

Quantitative research rarely fails because a researcher cannot write one more backtest. It fails when experiments become difficult to compare, factor definitions drift, intermediate artifacts are lost, validation rules change silently, or an automated search process produces more candidates than a human can meaningfully audit.

The Quant Research Harness is designed around that operational problem. Its purpose is not to replace the researcher with a single autonomous agent. It is to provide a durable research environment in which data preparation, factor construction, evaluation, diagnostics, experiment history, and machine-assisted search can share explicit contracts.

The central question is therefore broader than “how do we generate alpha ideas?” It is: **how should a research system preserve enough structure that thousands of small experiments can compound into reliable knowledge instead of becoming disconnected notebook history?**

## Design thesis

The workbench, the research agent, and the search algorithm should be separate layers.

The **workbench** owns durable state: datasets, factor definitions, experiment metadata, evaluation outputs, lineage, and promoted research artifacts. A **research agent** is a bounded orchestrator that can propose, execute, inspect, and summarize work through explicit interfaces. A **search algorithm** is a replaceable policy for exploring a defined search space.

This separation is intentionally strict. It prevents one model, one prompt format, or one optimization method from becoming the architecture of the entire research platform. It also makes the system legible to both humans and coding agents: a researcher should be able to inspect why an experiment exists, what it consumed, what it produced, and whether it is comparable with another run without reconstructing an agent conversation.

## Research architecture

The target architecture is a research state machine rather than a collection of scripts. A typical flow is:

`Data → Feature / Factor Definition → Validation → Backtest / Evaluation → Diagnostics → Research Memory → Promotion or Rejection`

Agents and search algorithms operate on top of this flow. They can create proposals and request evaluations, but they do not redefine the meaning of an evaluation result or silently mutate the durable factor library.

### Durable research state

The harness treats reproducibility metadata as part of the research object itself. A useful experiment record should identify the factor or strategy definition, data scope, configuration, evaluation protocol, relevant dependencies, outputs, and relationship to prior experiments.

That makes experiment lineage a first-class research capability. A later optimization should be traceable to its parent hypothesis; a promoted factor should retain a path back to the evidence that justified promotion; and a rejected branch should remain informative when the same idea appears again under a different name.

### Bounded agent orchestration

Agentic research is most useful when the model can reason over a clear environment and least reliable when it is asked to own every layer simultaneously. The harness therefore treats agents as bounded workers with defined inputs, budgets, tools, and output schemas.

An agent may propose a factor family, request a batch of deterministic evaluations, compare diagnostics, or synthesize the next hypothesis. The workbench remains responsible for data access, execution boundaries, result persistence, and the rules that determine whether an experiment is valid.

This architecture also makes multi-agent workflows less fragile. Different agents can specialize in hypothesis generation, implementation review, result diagnosis, or literature-grounded interpretation while sharing the same experiment ledger rather than maintaining separate versions of research truth.

### Replaceable search backends

Search is a plugin boundary. Language-model search, genetic programming, reinforcement learning, evolutionary search, Bayesian or surrogate-guided optimization, and hand-designed grids can all be useful under different budgets and search spaces.

The harness is designed so that these methods compete or cooperate through a shared proposal-and-evaluation interface. The search method decides **what to try next**; it does not get to redefine the evaluator, bypass leakage controls, or promote a candidate directly into the core library.

## Core research surfaces

### Experiment workspace

The experiment workspace is the operational layer where a researcher or agent can assemble a hypothesis, inspect its configuration, launch bounded computation, and review outputs. The goal is to make exploratory work fast without making it disposable.

A strong workspace should keep the high-frequency interaction loop lightweight while persisting the pieces that matter: experiment identity, configuration, status, diagnostics, parent-child relationships, and artifacts worth revisiting. This is especially important when many searches run in parallel or when an agent resumes work after its conversational context has been discarded.

### Factor library and promotion

A factor should not become “core” simply because one backtest completed successfully. The harness distinguishes between exploratory candidates and a curated core factor library.

Promotion is conceived as an explicit research decision supported by standardized evidence: data validity, signal definition, coverage, stability, out-of-sample behavior, turnover and cost sensitivity where relevant, and redundancy relative to factors already retained. The exact promotion policy can evolve, but the transition itself should be visible and auditable.

This distinction protects the library from becoming a graveyard of every expression ever tested. It also gives agents a clearer objective: discover or improve candidates that add incremental research value, not merely generate a large count of syntactically valid formulas.

### Correlation de-duplication

Factor mining naturally produces families of nearly equivalent signals. Different formulas can encode the same economic exposure, and a high-throughput search engine can waste most of its budget rediscovering variants of an existing factor.

The harness therefore treats similarity analysis as part of the research workflow rather than an afterthought. Pairwise correlation is one useful signal, but the broader objective is to identify redundant behavior across time, regimes, universes, and transformations. A candidate that is individually acceptable may still be rejected or demoted if it adds little incremental information to the library.

### Experiment lineage

Lineage answers questions that ordinary backtest folders cannot answer reliably: Which experiment introduced this operator? Which candidate was the parent of this mutation? Was a result reproduced under a later data snapshot? Which failed branch motivated the current design?

The intended model is not a perfect universal provenance graph. It is a practical research ledger that preserves enough ancestry and configuration context to reconstruct important decisions. This becomes increasingly valuable as automated search volume grows.

### Human + agent interface

The same research object should be understandable from a human-facing workbench and from an agent-facing interface. That means names, schemas, statuses, validation errors, and artifact references should be explicit rather than encoded only in UI state.

Human usability and agent usability are not competing requirements here. Clear contracts, predictable identifiers, compact summaries, and inspectable state improve both. The interface can be richer for a researcher and more structured for an agent while still referring to the same underlying objects.

## Validation and guardrails

Research automation increases the cost of weak validation because an error can be multiplied across hundreds of experiments. The harness therefore treats validation as a sequence of gates rather than one final performance check.

Typical guardrails include schema and expression validation before expensive computation, temporal and universe alignment checks, deterministic factor computation, explicit train/validation/test or walk-forward boundaries, reproducible evaluation configuration, and diagnostics that distinguish data failures from weak economic hypotheses.

The important architectural rule is that search cannot negotiate these controls away. A search backend can decide which valid candidate to explore, but leakage prevention, evaluation semantics, and result persistence belong to the workbench.

## Memory and performance discipline

A research platform that becomes unstable under its own experiment history is not useful. Memory efficiency is therefore part of the architecture, especially when large panels, intraday-derived features, multiple factor matrices, or agent-generated batches are involved.

The design direction is to avoid treating every intermediate object as permanently resident state. Durable artifacts and compact experiment summaries should be separated from transient computation. Expensive datasets should be materialized deliberately, reusable representations should be shared when possible, and agent context should reference research objects instead of embedding large raw outputs repeatedly.

This is not a claim that out-of-memory risk has been eliminated. It is a design constraint: new modules should make ownership and lifetime of large objects explicit so that the platform can scale research volume without relying on ever-larger interactive sessions.

## Implemented, experimental, and planned scope

The project is intentionally presented as **In Development**. The architecture is being consolidated around a stable division of responsibilities rather than advertised as a finished production research platform.

Current work centers on the workbench abstraction, factor experimentation, standardized evaluation, factor-library workflows, correlation-aware de-duplication, experiment lineage, and interfaces that can be consumed by both researchers and coding agents.

More autonomous research loops, richer search plugins, policy learning, and advanced research-memory mechanisms belong to the experimental layer. They are valuable only if they can operate through the same bounded evaluation contracts and leave behind inspectable state.

Longer-term extensions may include stronger scheduling and resource isolation, richer lineage visualization, configurable promotion policies, portfolio-level factor selection, and more formal interfaces for external research frameworks. These are directions rather than claims of completed capability.

## Relationship to the broader research stack

The Quant Research Harness is the infrastructure layer beneath several other Lorien Lab research directions.

The **LLM-based Factor Discovery Engine** can use the harness as its durable evaluator and memory surface. Genetic programming, reinforcement learning, or surrogate-guided search can use the same contract without requiring a new backtest stack. Strategy research such as the **CTA Research Framework** can reuse common validation, experiment tracking, diagnostics, and research lineage while keeping strategy-specific logic separate.

The **Reproduction Workbench** remains a different object. Reproductions are source-grounded empirical studies with their own evidence and audit requirements; they should not be collapsed into ordinary experiments merely because both use quantitative infrastructure.

## Current development priorities

The immediate development priorities are architectural rather than cosmetic:

- make factor promotion and rejection explicit research states rather than informal file-management decisions;
- strengthen correlation and redundancy analysis so automated search spends less budget rediscovering existing exposures;
- improve experiment lineage and compact research memory so agents can resume from durable evidence;
- keep large data and intermediate computation bounded to reduce unnecessary memory pressure;
- expose the same research objects cleanly to the human workbench and to agent tools;
- preserve the ability to swap search algorithms without rewriting the evaluator or factor library.

The long-term objective is a platform in which **research throughput can increase without sacrificing auditability**. More experiments are useful only when the system becomes better at remembering what was tried, why it mattered, and what should happen next.
