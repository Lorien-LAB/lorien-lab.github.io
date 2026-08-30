---
slug: observable-matrix-dynamics-a-share-long-only
title: "Are Three Matrices All You Need To Beat the Market? Observable Matrix Dynamics for Portfolio Optimization"
description: "A point-in-time, next-open A-share reproduction of the Observable Matrix Dynamics long portfolio across CSI 300, CSI 500, and CSI 1000, with modeled trading costs and capacity constraints."
researchArea: "Portfolio Construction"
stage: reproduction
result: partial
resultSummary: "The tradable A-share long-only implementation produces a 20.22% stitched annual return at CNY 100m per sleeve and 19.13% at CNY 500m, while showing material cross-window and index dependence."
codeVisibility: private
sourceType: academic
authors:
  - "Igor Halperin"
year: 2026
venue: "arXiv"
arxiv: "2607.27461"
paperUrl: "https://arxiv.org/abs/2607.27461"
date: 2026-08-30
updated: 2026-08-30
tags:
  - Academic Paper
  - Observable Matrix Dynamics
  - A-share
  - Long-Only
  - Point-in-Time
  - Portfolio Construction
featured: true
assetClass: "China A-share Equities"
market: "China A-share"
frequency: "Monthly signals · daily next-open execution"
dataAvailability: "Partial · PIT constituents and production A-share market data are available; the original paper market is not source-identical"
caseStudy:
  shortTitle: "OMD Portfolio Optimization · A股 Long-Only Reproduction"
  subtitle: "A tradable A-share adaptation with point-in-time constituents, next-open execution, modeled costs, and capacity constraints"
  strategyFlowTitle: "From OMD state forecasts to an A-share long-only portfolio."
  strategyFlowDescription: "Monthly point-in-time selection defines a 30-stock target; the next-open execution layer applies A-share costs and trading constraints."
  verdicts:
    - label: "OMD long-only construction"
      status: reproduced
      evidence: "Frozen OMD forecasts and monthly long-only targets close to the formal A-share reproduction evidence."
    - label: "Point-in-time and causality"
      status: reproduced
      evidence: "PIT membership and training-date gates are enforced; signal-day information is executed only at the next open."
    - label: "A-share execution layer"
      status: extension
      evidence: "Commission, stamp duty, transfer fee, slippage, impact, suspensions, price limits, delisting, and ADV capacity are modeled explicitly."
    - label: "Cross-window stability"
      status: partial
      evidence: "OOS1 and OOS2 differ materially, and the CSI 1000 sleeve is negative in OOS1."
  strategyFlow:
    - "Frozen OMD transition forecasts"
    - "Point-in-time eligible constituents / 时点成分股"
    - "Monthly 30-stock long-only target"
    - "Signal-day decision → next-open execution / 下一开盘成交"
    - "A-share costs, trading constraints, and 10% ADV capacity"
  limitations:
    - title: "Different market from the paper"
      detail: "This is an A-share adaptation; the original market, sample, universe, and execution constraints are not source-identical."
    - title: "Strong cross-window dependence"
      detail: "OOS2 is much stronger than OOS1, while CSI 1000 is negative in OOS1. The stitched return must not be read as uniform performance."
    - title: "Capacity pressure at CNY 500m per sleeve"
      detail: "The 500m scenario has lower stitched annual return and materially larger modeled costs; capacity is trade- and index-dependent."
    - title: "Research result, not live performance"
      detail: "The evidence comes from historical out-of-sample replay with modeled execution and is not a live track record or investment recommendation."
relatedKnowledge: []
relatedNotes: []
relatedProjects: []
---

## Research question

Can Observable Matrix Dynamics (OMD) forecasts support a tradable A-share long-only portfolio after real execution constraints are applied? This reproduction asks that narrower question rather than treating the paper's headline as directly portable. The test is whether the forecast-to-portfolio chain remains usable when eligibility is point-in-time, decisions are made on the signal date, and orders are filled at the next open with explicit costs, price limits, suspensions, delisting, and capacity rules.

The public record therefore separates a formal A-share adaptation from any claim that the source market has been recreated. It reports aggregate portfolio evidence and the conditions under which that evidence was produced.

## Paper mechanism

The paper's Observable Matrix Dynamics model describes transitions in ranked return and volatility states through observable matrices. Its forecasts are used to characterize how the state distribution is expected to move, providing a structured input to portfolio construction. That mechanism is the object being adapted here; the original paper's market, sample, universe, and execution conventions are not assumed to be interchangeable with A-shares.

Accordingly, the source result is not presented as a directly comparable performance benchmark. The reproduction preserves the state-transition logic at the forecast interface, then evaluates what survives after A-share eligibility and trading rules are made explicit.

## A-share long-only adaptation

The adaptation allocates across three independent index universes: CSI 300, CSI 500, and CSI 1000. Each sleeve holds long positions only, with no individual-stock shorting and no synthetic short overlay. A monthly target contains 30 stocks selected from the eligible universe for that sleeve, so the portfolio expresses OMD forecasts through stock selection rather than a directional futures position.

The sleeves are kept independent through construction and then combined using equal-weighted daily returns. This page does not compare separate strategy lines; it documents one formal A-share long-only implementation and the sensitivity of that implementation across index sleeves and out-of-sample windows.

## Data and point-in-time universe

Historical constituent snapshots determine which stocks were eligible on each rebalance date. The universe is therefore point-in-time (PIT, 时点成分股), rather than a current constituent list replayed backward. Information cutoffs are applied before each forecast month so later membership changes cannot enter an earlier decision.

The market inputs use production A-share price and corporate-action data available to the reproduction, while the paper's original market data are not source-identical. Freezing the historical membership snapshots and their information dates is the control against survivorship and universe leakage; it does not turn the A-share dataset into the paper's dataset.

## Portfolio construction

OMD transition forecasts are frozen for the month before target selection. At each monthly rebalance, each index sleeve forms a 30-stock long-only target from its own PIT-eligible universe. There is no individual-stock short leg, no cross-sleeve borrowing assumption, and no tuning from published comparison results.

The stitched account treats the CSI 300, CSI 500, and CSI 1000 sleeves as independent capital sleeves. Daily returns are equal-weighted across those sleeves, while the capital scenarios below use the same amount of nominal capital per sleeve so that the aggregate convention remains explicit.

## Execution and cost model

The signal-day decision is executed at the next open (下一开盘成交). The modeled execution layer charges commission, stamp duty, transfer fee, slippage, and price impact. It also enforces a 10% of average daily volume (ADV) participation cap, excludes trades blocked by price limits (涨跌停) or suspensions (停牌), and handles delisting and company actions as part of the historical replay.

These rules make the result a tradable A-share adaptation rather than a close-to-close paper portfolio. Costs are applied to the actual rebalance turnover under the chosen capital scenario; they are not silently omitted when the sleeve is scaled from CNY 100m to CNY 500m.

## No-lookahead validation

The maximum training-target date precedes the month being forecast, and the signal date precedes its execution date. An order's business key—sleeve, security, rebalance date, and side—is unique, preventing duplicate fills from changing the target. Aggregate accounting identities close after fills, fees, blocked orders, and end-of-window liquidation are reconciled.

The same checks are applied across the PIT membership snapshots and the monthly frozen forecast set. A successful check means the replay obeys its information boundary; it does not imply that the source paper's unobserved implementation details have been recovered.

## Empirical results

The stitched portfolio produces a 20.22% annual return at CNY 100m per sleeve and 19.13% at CNY 500m per sleeve. “Per sleeve” means three independent sleeves: the corresponding total nominal capital is CNY 300m and CNY 1.5bn. The stitched window runs from 2024-01-02 through 2026-06-30 and combines equal-weighted daily returns across CSI 300, CSI 500, and CSI 1000.

Non-overlapping OOS1 and OOS2 daily paths are concatenated. The stitched path is descriptive and does not replace independent-window robustness evidence.

The window split matters. At CNY 100m per sleeve, the combined annual return is 6.60% in OOS1 and 43.70% in OOS2. At CNY 500m per sleeve, it is 5.56% in OOS1 and 42.53% in OOS2. OOS1's CSI 1000 sleeve is negative (−3.50% at CNY 100m and −4.86% at CNY 500m), while the OOS2 sleeves are all positive. The stitched headline is therefore an aggregate of materially different states, not a claim of uniform performance.

## Benchmark comparison

Two reference accounts are kept distinct. The official index is close-to-close and has no modeled stock execution, costs, capacity, or capital scaling. Repeated official values in the 100m/500m rows are intentional. The official price index is not an executable account; it is a non-executable index reference that does not apply PIT membership, stock-level fills, or the cost and constraint rules above.

The PIT equal-weight reference remains an executed PIT equal-weight account, not merely a membership-weight series. It uses the exact signal-date PIT membership (时点成分股), then passes through the same execution layer as the OMD account. PIT equal-weight remains the executed exact-signal-date account using the same next-open A-share execution, modeled costs/capacity, and frozen last-close delisting convention. This account therefore uses modeled costs and capacity under that same execution model; the replay uses the frozen last-close delist convention. This makes it a directly replayed, executable-universe baseline while keeping its equal-weight construction distinct from the OMD target-and-trade process.

For the CNY 100m scenario, the combined strategy return is 6.60% versus 7.61% for the official-index reference in OOS1, while the PIT equal-weight account is 9.14%. In OOS2, the corresponding values are 43.70%, 41.00%, and 23.68%. These references answer different questions: an official index shows broad index movement, a PIT equal-weight account shows a tradable-universe baseline, and the reproduction shows the OMD portfolio after its own turnover and constraints.

## Capacity and robustness

Capacity is modeled with a 10% ADV participation cap, but it is index- and trade-dependent; no universal live-capacity ceiling is claimed. Scaling the nominal capital per sleeve from CNY 100m to CNY 500m raises modeled transaction costs and lowers the stitched annual return from 20.22% to 19.13%.

The cost pressure is visible in both windows. OOS1 modeled transaction costs rise from about CNY 10.12m to CNY 53.38m, and OOS2 costs rise from about CNY 6.69m to CNY 35.17m. The resulting decline is evidence of capacity sensitivity under this execution model, not proof that one capital level is universally optimal or that a single ceiling applies to every index sleeve.

## Limitations

This is an A-share adaptation of an academic mechanism. The original paper's market, sample, universe, and execution constraints are different, so source-identical performance cannot be inferred from the stitched result. The OOS2 window is shorter and much stronger than OOS1; that cross-window variation, including the negative OOS1 CSI 1000 sleeve, is a material uncertainty rather than a footnote.

The cost and capacity layer is modeled historical execution, not a live track record. Slippage, impact, blocked trades, corporate actions, and ADV availability are represented by explicit rules, but they remain assumptions about how historical orders could have been filled. The record is partial for these reasons and should not be read as a promise of future returns.

## Conclusion

This record is a formal A-share long-only adaptation of the OMD forecast mechanism across CSI 300, CSI 500, and CSI 1000, with PIT membership, monthly 30-stock targets, next-open execution, modeled costs, and a 10% ADV cap. The stitched annual return is 20.22% at CNY 100m per sleeve and 19.13% at CNY 500m per sleeve, but the result depends materially on state and window: OOS1 is much weaker than OOS2, and the OOS1 CSI 1000 sleeve is negative.

Those precise conditions are the result. They support a partial reproduction of a tradable A-share implementation, not a direct transfer of the paper's headline or a universal capacity claim. This is not an investment recommendation.
