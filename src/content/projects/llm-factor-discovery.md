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

## Research problem

Large language models make it inexpensive to generate plausible factor stories and formulas. That changes the bottleneck of factor research: the scarce resource is no longer idea volume, but **disciplined search under a fixed evaluation budget**.

Unconstrained generation creates several predictable problems. Expressions may be invalid or incompatible with the available data; many proposals are cosmetic variants of existing factors; an attractive in-sample result can dominate the next prompt even when it is unstable; and the model can repeatedly revisit failed ideas because the research history lives only in conversational context.

The LLM-based Factor Discovery Engine is designed to turn factor generation into a closed research loop with explicit constraints, deterministic evaluation, anti-redundancy controls, and durable memory. The language model contributes hypotheses and search proposals, but it is not the authority that decides whether a factor is valid.

## Research thesis

A useful automated factor-discovery system should separate **proposal intelligence** from **research truth**.

The proposal layer may be creative, stochastic, model-driven, evolutionary, or learned. The evaluation layer should be stable, inspectable, and shared. Every candidate must pass the same data contracts, expression rules, computation pipeline, validation protocol, and redundancy checks regardless of whether it was proposed by an LLM, genetic programming, reinforcement learning, or a human researcher.

This leads to a loop-engineering view of automated discovery: improve not only the model that proposes the next factor, but the entire feedback system that determines what the model sees, which failures are remembered, how search diversity is preserved, and how evidence is converted into the next research decision.

## Research architecture

The engine is organized around a proposal/evaluation/memory cycle rather than a one-shot prompt. A simplified flow is:

`Research Context → Hypothesis → Expression → Static Validation → Computation → Evaluation → Similarity Check → Diagnosis → Memory → Next Proposal`

Each stage has a different responsibility. Generative components operate where ambiguity and exploration are useful; deterministic components operate where reproducibility and safety are required.

The architecture is deliberately compatible with multiple search backends. Search methods can differ substantially in how they generate candidates while sharing the same factor language, evaluator, result schema, and promotion rules.

## Research loop

### 1. Hypothesis proposal

The loop starts with an economic or statistical hypothesis rather than an arbitrary expression string. A proposal should identify the behavior it is attempting to capture, the information set it expects to use, and why that behavior might survive beyond one historical window.

For language-model search, this stage is where domain knowledge, prior experiment summaries, operator availability, existing factor families, and unresolved research questions can be combined. The objective is not to force every proposal to sound economically elegant, but to give downstream diagnosis something more informative than an anonymous formula.

### 2. Expression construction

A hypothesis must be translated into an executable representation supported by the factor engine. Operator-aware construction limits the model to available data fields, transformations, rolling functions, cross-sectional operations, and composition rules.

A constrained expression language also makes search methods interoperable. Genetic mutations, LLM edits, and reinforcement-learning actions can all produce objects that the same parser and evaluator understand.

### 3. Static validation

Before expensive data access or backtesting, candidates should fail fast when they violate structural rules. Static validation can check syntax, operator arity, unsupported fields, invalid parameter ranges, forbidden nesting, obvious look-ahead constructions, and expression complexity limits.

This stage is deliberately deterministic. A language model should not be asked whether its own expression is valid when the rule can be checked mechanically.

### 4. Factor computation

Candidates that pass static checks are evaluated on the actual research data through a standardized factor-computation interface. Computation should make temporal alignment, universe handling, missing values, normalization choices, and output shape explicit.

The goal is to prevent search backends from embedding custom data logic inside proposals. A factor expression describes the transformation; the research infrastructure owns the mechanics of turning that transformation into a comparable signal series.

### 5. Evaluation

The evaluation stage converts a computed candidate into structured research evidence. Depending on the project, this can include predictive diagnostics, portfolio or strategy tests, stability across periods and universes, turnover or cost sensitivity, and comparison with relevant baselines.

No single headline statistic is treated as the definition of quality. The evaluator is intended to produce a compact evidence object that can be consumed by both a researcher and the next search iteration.

### 6. Similarity and redundancy filtering

Automated discovery can generate large clusters of near-duplicate factors. A new expression may have different syntax while producing nearly the same realized exposure as an existing candidate.

Similarity filtering therefore sits inside the loop. Candidates can be compared against the exploratory archive and the curated factor library using behavior-based similarity measures such as correlations, rank relationships, regime-dependent overlap, or other diagnostics appropriate to the research universe.

The point is not to forbid related factors. It is to distinguish a genuinely new source of information from a renamed or lightly transformed version of something already known.

### 7. Diagnosis and memory

Every evaluated candidate should leave behind more than a score. The diagnosis layer records why the candidate was accepted, rejected, or left inconclusive: invalid construction, weak signal, instability, excessive redundancy, sensitivity to one regime, or another identifiable failure mode.

Compact research memory allows later proposals to use this history without injecting thousands of raw backtest rows into model context. Negative results are particularly valuable here. A failed factor family can become a constraint, a counterexample, or a prompt for a targeted variation rather than disappearing from the search process.

### 8. Next-round proposal

The next proposal is conditioned on structured evidence from earlier rounds. The search policy can exploit promising families, explore underrepresented regions of the operator space, mutate a candidate that failed for a specific reason, or intentionally diversify away from a saturated factor cluster.

This closes the loop. The objective is not merely to generate another formula, but to choose the next experiment in a way that uses the research budget more intelligently than independent random trials.

## Search backends

### Language-model search

Language models are strong proposal engines because they can combine domain concepts, previous diagnostics, operator semantics, and natural-language research goals. They are especially useful for generating hypotheses, explaining modifications, and moving between high-level economic reasoning and symbolic expressions.

Their weakness is that fluency can be mistaken for validity. The architecture therefore keeps deterministic validation and evaluation outside the model. The LLM proposes; the research stack measures.

### Genetic programming

Genetic programming provides a complementary search mechanism over symbolic expressions. Mutation, crossover, elitism, diversity pressure, and complexity penalties can explore combinations that a language model might not naturally propose.

GP is most useful when it shares the same operator grammar and evaluator as the rest of the system. That makes it possible to compare search efficiency and candidate diversity without confounding the result with a different backtest implementation.

### Reinforcement learning

Reinforcement learning can frame factor construction as a sequential decision process: choose operators, fields, parameters, or transformations while receiving reward from a structured evaluation signal.

This remains an experimental backend rather than a claim that a single reward formulation has solved automated factor mining. Reward design, sparse feedback, non-stationarity, and exploitation of evaluator quirks are major research risks. The value of the plugin architecture is that RL can be investigated without becoming a hard dependency of the research platform.

### Surrogate-guided search

When factor evaluation is expensive, a surrogate model can estimate which regions of the search space are more likely to justify full evaluation. This can support Bayesian-style acquisition, learned ranking of proposals, or other budget-aware selection methods.

A surrogate is a scheduler for scarce evaluation budget, not a substitute for the final evaluator. Promising candidates still have to pass the same deterministic research gates as candidates from other backends.

## Shared evaluation contract

The shared evaluation contract is the core integration point. A search backend supplies a valid candidate and receives a structured result that describes what happened. The contract should be rich enough to support multi-objective research without exposing backend-specific shortcuts.

This makes comparative research possible. Different search policies can be evaluated on questions such as novelty, valid-candidate rate, research-budget efficiency, coverage of the operator space, stability of promoted candidates, and ability to learn from negative results without changing the definition of a valid factor.

It also makes the system easier to audit. If two search methods disagree, the difference is attributable primarily to **what they chose to test**, not to separate implementations of data handling or backtesting.

## Anti-redundancy and factor promotion

Discovery and library management are separate decisions. A candidate may be interesting enough to retain in the exploratory archive but not differentiated enough to enter a core factor set.

Promotion should therefore consider incremental information, robustness, interpretability where relevant, cost and implementation constraints, and similarity to already-promoted factors. The engine can propose promotion candidates, but the durable research platform owns the promotion state and evidence.

This prevents a common failure mode in automated mining: optimizing for the number of “successful” factors while the effective number of distinct exposures barely increases.

## Validation discipline

Automated search amplifies both good methodology and bad methodology. Leakage, inconsistent universes, target contamination, unstable preprocessing, or repeatedly tuning to a fixed validation period can create a large collection of convincing but unreliable candidates.

The discovery engine therefore assumes time-aware validation, explicit evaluation budgets, immutable research boundaries where appropriate, and diagnostics across subperiods or regimes rather than unrestricted repeated optimization against one final score.

Search state and validation state should also remain separate. A model can remember that a factor family was weak in prior research without being given access to information reserved for final evaluation.

## Failure modes

Several failure modes are treated as research objects rather than exceptions to hide:

- **syntactic novelty without behavioral novelty** — complex formulas collapse to exposures already present in the library;
- **prompt anchoring** — the model repeatedly copies structures that happened to score well in recent rounds;
- **evaluator exploitation** — a search policy finds quirks in preprocessing or scoring rather than persistent signal;
- **complexity drift** — expressions become harder to understand or compute without adding incremental information;
- **regime dependence** — a candidate is supported by one narrow period and deteriorates elsewhere;
- **memory pollution** — noisy or misleading summaries steer later proposals toward false lessons;
- **search monoculture** — one backend dominates exploration and suppresses useful alternative representations.

Surfacing these failures is part of the loop. A mature discovery engine should become better at deciding what **not** to test again.

## Relationship to the Quant Research Harness

The Factor Discovery Engine is intended to sit above the **Quant Research Harness**, not replace it. The discovery layer decides how to explore the factor space; the harness supplies durable research state, execution boundaries, evaluation, experiment lineage, factor-library management, and interfaces shared with human researchers.

This separation allows the same harness to support manual research or non-LLM search, and it allows the discovery engine to evolve rapidly without destabilizing the underlying research records.

It also creates a natural feedback path: the harness can expose promoted factors, redundancy structure, failed experiment summaries, and open research questions; the discovery engine can return new candidates and diagnoses through the same bounded interface.

## Current research priorities

The prototype is being developed around several high-value questions:

- improve operator-aware hypothesis generation so proposals are both expressive and executable;
- represent negative results compactly enough that future search rounds can learn from them;
- combine behavioral similarity, expression structure, and library state to reduce redundant search;
- compare LLM, evolutionary, reinforcement-learning, and surrogate-guided policies under a shared evaluation budget;
- design multi-objective selection that balances signal quality, robustness, novelty, complexity, and implementation cost;
- make search trajectories inspectable so a researcher can understand why the system moved from one hypothesis family to another;
- keep automated factor promotion conservative, explicit, and reversible.

The project is therefore best understood as a **research engine for search itself**. Its success is not measured by how many formulas a model can produce, but by whether the loop turns limited compute and evaluation budget into a smaller set of more distinct, better-understood research candidates.
