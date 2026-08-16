---
title: Systematic Futures Calendar-Spread Research — Internship Case Study
description: A sanitized public case study of a systematic futures calendar-spread research pipeline, focused on temporal integrity, contract-state quality, cost-aware validation, and robust research engineering.
status: Internship Research
date: 2026-07-31
period: May–Jul 2026
tags: [Futures, Calendar Spread, Systematic Trading, Walk-Forward]
featured: true
metrics:
  Evaluation: 2023–2026 rolling test window
  Costs: 2 bp per leg per side
  Annualized Return: "43.08%"
  Sharpe: "2.40"
  Max Drawdown: "5.28%"
---

## Research mandate

This internship research asked a practical question: **how can a futures calendar-spread idea be turned into a research process that remains valid when contract identity, liquidity, roll transitions, term structure, and execution timing are all changing at the same time?**

That is a different problem from testing a fixed signal on a single continuous price series. For a calendar spread, the research object itself evolves. The contracts representing the most relevant nearby trading interest can change, their liquidity can migrate, delivery proximity can alter behavior, and the economics of the curve can shift across market states. A backtest can therefore look statistically convincing while still being operationally invalid if the contract-selection and timing layers are handled carelessly.

The project was developed as an end-to-end research pipeline rather than as one isolated trading rule. The work covered contract-state construction, same-underlying main/secondary spread research, market-state analysis, candidate signal evaluation, tradability and risk controls, transaction-cost treatment, and rolling out-of-sample validation.

The goal of the public case study is to explain that research discipline without exposing the proprietary implementation logic that generated the trading edge.

## Why this is not a simple two-price spread

A naive description of calendar-spread research is “take two futures prices, construct a difference, and test whether it mean-reverts.” That description misses most of the difficult parts.

The first problem is **contract identity**. A futures market contains multiple listed maturities, but the economically relevant pair can change through time. Main and secondary contracts are not permanent labels. Open interest migrates, trading activity shifts, old contracts approach delivery, and a new maturity may become the more representative contract. If a historical research pipeline uses information that was not yet available to decide which pair should have been traded, the resulting P&L contains selection look-ahead even if every later statistical calculation is perfectly causal.

The second problem is **state quality**. A price relationship can be observable but not realistically tradable. Thin activity, temporary liquidity fragmentation, contract transitions, and delivery-related behavior can distort both the apparent spread and the cost of entering or leaving a position. The research therefore treated contract-state quality as part of the signal environment rather than as a final cosmetic filter.

The third problem is **economic non-stationarity**. The same numerical spread magnitude can mean different things under different curve shapes, volatility states, market regimes, and stages of the contract lifecycle. The project therefore focused on relative state information and conditional behavior rather than assuming that a single unconditional mean-reversion rule should work everywhere.

Finally, the P&L of a two-leg trade is especially sensitive to execution assumptions. Both legs contribute to trading costs, and the value of a predicted convergence can disappear once the expected move becomes small relative to realistic friction. Cost awareness therefore entered the research process before a candidate rule was considered attractive.

## Research architecture

The public architecture can be summarized as:

`Daily futures data → Contract-state layer → Calendar-spread research object → Market-state features → Candidate signal layer → Tradability & risk controls → Next-session execution model → Cost-aware P&L → Walk-Forward diagnostics`

Each layer had a separate research responsibility.

**Daily futures data** supplied the observable information available at each research date. The pipeline preserved chronological order so later contract information could not silently change an earlier decision.

The **contract-state layer** determined whether the relevant futures pair was sufficiently well-defined and operationally meaningful for analysis. This layer incorporated broad information about trading interest, liquidity, lifecycle state, and roll transitions.

The **calendar-spread research object** represented the same-underlying relationship between the selected main and secondary contracts. The public version intentionally does not disclose its exact orientation or normalization convention.

The **market-state feature layer** described the environment around the spread. It included broad families of information related to term structure, local dislocation and mean reversion, volatility conditions, and convergence opportunity. These families were evaluated as research hypotheses rather than treated as an opaque feature dump.

The **candidate signal layer** transformed those observable states into research decisions. Its detailed transformations and combination rules are deliberately withheld here.

The **tradability and risk layer** prevented a statistically interesting state from automatically becoming a simulated trade. A candidate opportunity still had to satisfy operational and risk conditions before exposure was allowed.

The **next-session execution model** separated information formation from simulated trading. This is important because using a closing observation and simultaneously assuming an execution at that same unavailable price can create subtle timing leakage.

Finally, **cost-aware P&L and Walk-Forward diagnostics** evaluated whether the idea remained useful after realistic frictions and outside the period in which the research choices were developed.

## Contract-state and tradability layer

One of the most important lessons from the project was that contract construction is not a preprocessing detail. It is part of the model of the market.

The pipeline tracked broad categories such as **open interest, trading volume and liquidity, delivery proximity, and roll-transition state**. These inputs helped distinguish a stable research object from a temporary contract configuration that might be difficult to trade or economically misleading.

For example, a relationship can appear unusually attractive just as liquidity is migrating from one maturity to another. Without a state-quality layer, a backtest may interpret that transition as an exploitable spread event when it is partly an artifact of changing contract relevance. Similarly, contracts approaching delivery can exhibit behavior that is mechanically different from an ordinary trading state.

The project therefore used a staged eligibility process. A calendar-spread observation first had to be a valid, temporally available research object; only then could the statistical and economic layers evaluate it. This separation made it easier to diagnose whether a rejected trade failed because the market state was unattractive or because the underlying contract pair was not sufficiently stable.

The public version does not disclose the exact contract-ranking rules, confirmation logic, liquidity requirements, lifecycle cutoffs, or product-specific exceptions. Those details materially affect the production research behavior and are intentionally withheld.

## Signal architecture — sanitized public view

The signal research was organized as a **multi-stage decision system** rather than a single indicator. At a high level, it combined four kinds of reasoning.

**Term-structure context** asked whether the observed spread state was consistent with the broader economics of the futures curve. The purpose was not to predict from curve shape mechanically, but to avoid interpreting every numerical deviation in the same way when the underlying term-structure environment was different.

**Mean-reversion and dislocation information** measured whether the main/secondary relationship appeared unusually displaced relative to its recent and state-conditioned behavior. This provided the core convergence intuition while recognizing that “far from normal” is only meaningful after the reference state itself has been defined carefully.

**Volatility and regime information** helped distinguish ordinary fluctuations from states in which dispersion, uncertainty, or transition risk had changed materially. Volatility was treated both as a diagnostic state and as a risk consideration; those two roles were kept conceptually separate so a reduction in exposure was not mistakenly credited as new forecasting information.

**Convergence-opportunity diagnostics** asked whether the expected economic space for convergence was large enough to justify a trade after considering uncertainty and friction. This prevented the system from treating a statistically detectable but economically tiny displacement as automatically actionable.

The layers were tested individually and in combination. The research emphasis was on whether an additional layer improved stability and failure behavior, not whether it produced the single highest historical headline statistic.

> **Confidentiality note — This public version is intentionally sanitized.** Signal formulas, feature-engineering details, parameterization, thresholds, combination weights, state-transition rules, instrument-specific rules, and execution/sizing logic are intentionally omitted. The objective here is to show the research architecture and validation discipline without making the production strategy reconstructable.

## Temporal integrity and execution

Time alignment was treated as a first-class research constraint.

A daily observation was allowed to use only information that would have existed when the decision was formed. Contract identities were not retroactively replaced because a later date revealed which maturity ultimately became dominant. Likewise, state classifications and eligibility decisions were evaluated using contemporaneously available information rather than retrospective labels.

The simulation also separated **decision time** from **execution time**. When a state was observed at the end of a session, the corresponding trade was evaluated under a consistent next-eligible-session convention rather than assuming perfect execution at a price that had already been used to form the decision.

This discipline matters disproportionately in futures research because several pieces of information—contract activity, spread state, lifecycle status, and trading opportunity—can all change together near roll periods. A small timing inconsistency in any one of those layers can create a systematic bias across many historical observations.

The project therefore treated temporal integrity as part of model validity, not merely as a backtesting implementation detail.

## Risk and transaction-cost layer

The research distinguished **forecast quality** from **trade quality**. A potentially favorable spread state did not necessarily justify exposure if the operational or economic conditions were weak.

The risk layer considered broad dimensions such as contract-state reliability, expected friction, volatility conditions, and portfolio-level exposure. The objective was to prevent the system from taking the same effective risk in very different market environments simply because a raw research signal had a similar magnitude.

Transaction costs were incorporated explicitly for both legs. The public evaluation uses a **2 bp per leg per side** assumption. More importantly, cost sensitivity was studied as part of research validation rather than being applied only after the strategy had already been selected.

This changes the research question. Instead of asking “does the spread forecast have statistical value?”, the relevant question becomes “is the expected opportunity large and robust enough to survive plausible trading friction and execution uncertainty?”

Exact cost gating, position caps, exposure scaling, and risk-budget logic are not disclosed in the public version.

## Walk-Forward validation

The project used a **2023–2026 rolling test window** and emphasized Walk-Forward evaluation rather than one global fit across the entire history.

The research process separated development decisions from later evaluation periods. As the window advanced, the strategy had to face changing market conditions without being allowed to optimize retrospectively on the complete sample.

Validation was deliberately broader than one aggregate Sharpe ratio. The research included several classes of robustness checks:

- stability across different time segments rather than dependence on one profitable episode;
- behavior across multiple eligible futures markets rather than a single instrument driving the result;
- sensitivity to higher trading friction and less favorable execution assumptions;
- delayed-execution checks to identify signals whose apparent edge depended on unrealistically precise timing;
- component ablations to test whether each additional layer contributed genuine robustness;
- examination of drawdowns and weak regimes to understand *how* the strategy failed;
- rejection of isolated historical optima when nearby research choices did not behave consistently.

A useful outcome of this process was not only identifying positive variants, but also ruling out attractive-looking constructions that were too sensitive to state definitions, execution, or cost assumptions. Negative results were kept as research information instead of being discarded from the narrative.

## Public result summary

Under the public historical backtest record, the strategy was evaluated over a **2023–2026 rolling test window** with a **2 bp per leg per side** transaction-cost assumption.

The recorded aggregate result was an annualized return of **43.08%**, **Sharpe 2.40**, with a **maximum drawdown of 5.28%**.

These figures summarize one historical research configuration under stated assumptions. They have been intentionally approved for public disclosure. They are not a forecast, do not imply future performance, and should not be interpreted independently of the execution, cost, and validation assumptions described above.

No additional cumulative-return, hit-rate, turnover, capacity, market-level, or sensitivity statistics are published in this sanitized version.

## Failure modes and research lessons

The most useful part of the internship was understanding where a calendar-spread strategy can fail even when its high-level economic story sounds reasonable.

**Roll transitions can imitate opportunity.** Contract migration can create apparent discontinuities or unusual relationships that disappear once the pair definition stabilizes. This is why contract-state quality has to be evaluated before signal strength.

**Liquidity deterioration can turn convergence into an untradeable observation.** A spread may move in the expected direction while the attainable two-leg execution is materially worse than the research price series suggests.

**Structural moves can be mistaken for temporary dislocations.** Mean reversion is not a universal law. When the underlying curve is repricing for a persistent economic reason, repeatedly fading the move can accumulate losses. State information is valuable partly because it helps diagnose this failure mode.

**Volatility changes the meaning of distance.** A spread displacement that is exceptional in a calm regime may be routine during a turbulent one. Research based on absolute magnitudes alone can therefore create unstable behavior across regimes.

**Small edges are fragile to friction.** Two-leg strategies pay for two executions. A signal that looks statistically significant can still be economically irrelevant after realistic costs and delays.

**Complexity can hide overfitting.** Adding filters often improves the best historical result simply because the researcher has introduced more degrees of freedom. The project therefore favored interpretable ablations and stability checks over ever-larger composite rules.

These failure modes shaped the final research workflow as much as the successful components did.

## What is intentionally omitted

This page is designed to demonstrate research capability without disclosing the implementation needed to reproduce the strategy.

The public version therefore omits the exact spread construction convention, normalization method, proprietary feature definitions, lookback choices, numerical gates, combination logic, forecasting implementation, state-estimation details, trade-trigger logic, position mapping, risk-budget logic, product-specific handling, and internal research artifacts.

Those omissions are intentional rather than gaps in the research process. They separate the public explanation of *how the problem was approached* from the confidential details of *how the production research logic was instantiated*.

## Contribution and engineering value

The main contribution of the internship project was building a disciplined path from an economic hypothesis to a research system.

On the **research side**, the work required decomposing a calendar-spread idea into falsifiable layers: contract validity, term-structure context, dislocation behavior, state information, tradability, risk, and cost-aware execution. That decomposition made it possible to test whether an apparent improvement came from new information, from lower exposure, from better contract handling, or simply from an additional degree of freedom.

On the **engineering side**, the pipeline enforced consistent temporal alignment and reusable experiment structure. Contract-state construction, signal research, simulation, cost accounting, diagnostics, and Walk-Forward evaluation were treated as separable modules so that changes in one layer could be audited without silently changing the assumptions of another.

On the **validation side**, the project emphasized robustness and failure analysis over a single optimized statistic. The result was a workflow in which unsuccessful variants, sensitivity tests, and state-specific weaknesses were useful research outputs rather than discarded experiments.

That end-to-end discipline is the part of the work that can be shared safely: the ability to turn a futures-market hypothesis into a temporally valid, cost-aware, diagnostically rich research process while keeping the proprietary trading logic confidential.
