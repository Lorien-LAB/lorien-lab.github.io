---
slug: stock-index-futures-roll-basis-timing
title: "股指期货滚贴水择时策略与市场情绪因子"
description: "An auditable reproduction of Orient Futures' IC/IM roll-basis timing framework, separating replicated evidence, unresolved deviations, and later Lorien Lab extensions."
researchArea: "Index Futures Timing"
stage: extension
result: extended
codeVisibility: public

sourceType: broker
broker: "Orient Futures (东证期货) · 东证衍生品研究院"
analysts:
  - "李晓辉"
  - "朱仪清"
publishDate: 2026-06-26
series: "股指期货深度报告"

date: 2026-08-14
updated: 2026-08-15
tags:
  - Broker Research
  - Index Futures
  - Basis Timing
  - Market Sentiment
  - Cross-maturity Arbitrage
featured: false

assetClass: Equity Index Futures
market: China A-share
frequency: Daily
dataAvailability: "Partial · core futures/index/PIT constituent data available; some source fields require proxies or are unavailable"

codeUrl: "https://github.com/Lorien-LAB/Index-Timing/tree/master/Reproduction03"
configurationUrl: "https://github.com/Lorien-LAB/Index-Timing/blob/master/Reproduction03/configs/repro03.yaml"
resultsUrl: "https://github.com/Lorien-LAB/Index-Timing/blob/master/Reproduction03/doc/reproduction_report.md"

metrics:
  - name: "IC multi-factor OOS optimization"
    original: "+2.6%"
    reproduced: "+2.0%"
    difference: "-0.6pp"
  - name: "IC multi-factor P/L ratio"
    original: "1.12"
    reproduced: "1.11"
    difference: "-0.01"
  - name: "IC multi-factor switches / year"
    original: "4.5"
    reproduced: "4.6"
    difference: "+0.1"
  - name: "IC cross-maturity OOS optimization (6x)"
    original: "+25.2%"
    reproduced: "+20.7%"
    difference: "-4.5pp"

score:
  dataMatch: 4
  methodMatch: 3
  signalMatch: 3
  performanceMatch: 3
  robustness: 3
  reproducibility: 4

caseStudy:
  shortTitle: "股指期货滚贴水择时与市场情绪因子"
  subtitle: "Reproduction of Orient Futures' 2026 research on basis timing and sentiment signals"
  verdicts:
    - label: "Basis & roll engine"
      status: reproduced
      evidence: "IC passive current-month roll baseline Sharpe is 0.554 versus 0.54 in the report, with the roll-return attribution independently audited."
    - label: "Sentiment-factor layer"
      status: reproduced
      evidence: "All seven representative-factor correlation directions match; the final reproduction report records six of seven magnitudes within 0.01 of the source value."
    - label: "IC multi-factor timing"
      status: reproduced
      evidence: "OOS optimization is +2.0% versus +2.6%; P/L is 1.11 versus 1.12; annual switching is 4.6 versus 4.5."
    - label: "IC cross-maturity arbitrage"
      status: reproduced
      evidence: "The 6x IC cross-maturity strategy retains a large OOS edge: +20.7% versus +25.2% in the report."
    - label: "IM timing"
      status: partial
      evidence: "IM OOS optimization is +0.7% versus +1.5%, while reproduced switching frequency is materially higher than the report."
    - label: "Exact Figure-53 strategy selection"
      status: partial
      evidence: "Only a subset of retained TA strategies matches exactly; MESA/Hilbert/Kaufman definitions and parts of the selection behavior are not fully specified by the source."
  factorEvidence:
    - factor: "IC annualized volatility"
      paper: "-0.35"
      reproduced: "-0.356"
    - factor: "IC amplitude"
      paper: "-0.34"
      reproduced: "-0.341"
    - factor: "IC constituent ADR"
      paper: "+0.15"
      reproduced: "+0.142"
    - factor: "IC constituent return dispersion"
      paper: "-0.30"
      reproduced: "-0.302"
    - factor: "IM annualized volatility"
      paper: "-0.59"
      reproduced: "-0.594"
    - factor: "IM constituent return dispersion"
      paper: "-0.19"
      reproduced: "-0.153"
      note: "Direction matches; the magnitude gap is larger than for the other representative factors."
    - factor: "IM VIX"
      paper: "-0.59"
      reproduced: "-0.596"
  strategyFlow:
    - "Market sentiment factors"
    - "Forecast direction of the current-quarter annualized basis"
    - "Basis expected to rise → hold the current-quarter contract"
    - "Basis expected to fall → hold the current-month contract"
    - "Compare with passive current-month rolling"
  limitations:
    - title: "Figure 53 is only partially reproducible"
      detail: "The exact retained TA-strategy list is not fully recovered. Several method definitions and selection details are under-specified, so the public result treats this layer as partial rather than silently choosing the closest implementation."
    - title: "The IM side is weaker"
      detail: "The reproduction obtains about +0.7% OOS optimization versus +1.5% in the report, with a substantially higher switching frequency. The shorter IM history and MESA behavior are material uncertainties."
    - title: "Absolute roll excess uses a different index convention"
      detail: "The reproduction uses a price-index basis while the report's absolute excess comparison uses total-return indices. Dividends therefore shift absolute roll-excess levels, although the timing-versus-passive optimization comparison is much less sensitive to that convention."
  extension:
    title: "Asymmetric Hysteresis Confirmation"
    thesis: "After reconstructing the source framework, Lorien Lab tests whether slow sentiment regimes can be traded more cleanly by filtering transient aggregate signal flips: enter the current-quarter contract only after 10 confirmed days and exit after 5."
    metrics:
      - label: "Full-sample timing improvement"
        paper: "+1.1%"
        baseline: "+0.50%"
        extension: "+1.32%"
      - label: "OOS timing improvement"
        paper: "+2.6%"
        baseline: "+1.96%"
        extension: "+4.10%"
      - label: "Switches / year"
        paper: "4.5"
        baseline: "≈4.6"
        extension: "≈4.5"
    caution: "The reported extension OOS window is short (approximately 2025-10 through 2026-06). Treat the headline OOS uplift as provisional; full-sample decomposition, parameter sensitivity, and rolling validation are more informative than the single short OOS number."

relatedKnowledge: []
relatedNotes: []
relatedProjects: []
---

## Research question

The source report asks whether the persistent discount in Chinese equity-index futures can be harvested more efficiently by **timing the maturity held**, rather than by forecasting the direction of the equity index itself. Its core hypothesis is that market-sentiment variables contain information about the direction of the **current-quarter annualized basis**, which can guide a switch between current-month and current-quarter futures.

The reproduction therefore focuses on a falsifiable chain: reconstruct the futures term structure and roll return correctly, rebuild the sentiment-factor layer, reproduce the report's multi-factor timing logic, and then compare the resulting maturity-selection strategy with passive current-month rolling.

## Original mechanism

IC and IM futures have historically exhibited persistent discount regimes. As a discounted futures contract approaches expiry, basis convergence can generate positive roll-related return for a long futures investor. The report argues that this opportunity is not constant across maturities.

Its timing rule is simple at the portfolio level: when the current-quarter annualized basis is expected to **rise** (discount convergence), hold the **current-quarter** contract; when it is expected to **fall** (discount widening), hold the **current-month** contract. The benchmark is passive current-month rolling.

Market sentiment enters upstream of that rule. The report builds candidate variables from index volatility and amplitude, constituent breadth and dispersion, option-implied information, and financing activity, then maps retained representatives through technical timing methods into a daily basis-direction signal.

## Reproduction design

The public case study summarizes a larger audit trail in [`Index-Timing/Reproduction03`](https://github.com/Lorien-LAB/Index-Timing/tree/master/Reproduction03). The implementation reconstructs four maturity buckets (current month, next month, current quarter, next quarter), the current-quarter annualized basis target, the roll-return attribution engine, representative sentiment factors, technical-method signals, IC/IM multi-factor timing, and the 6x cross-maturity application.

For baseline reproduction evidence, this page uses the finalized reproduction outputs rather than later optimization experiments. Lorien Lab's post-reproduction execution research is presented separately under **Beyond Reproduction**.

## Data reconstruction

The working dataset combines daily per-contract equity-index futures prices and delivery metadata, CSI 500 / CSI 1000 index histories, constituent daily bars with **point-in-time** historical membership, CSI 1000 index-option information from the MO contract family, and financing-balance data.

Several source conventions cannot be matched perfectly. The public evidence therefore keeps the data state as partial rather than implying source-equivalent inputs. In particular, a usable historical free-float daily turnover series is unavailable, while the absolute roll-excess comparison is based on price indices rather than the total-return index convention used in the report.

## Method reconstruction

The contract ladder uses the nearest monthly maturities plus the nearest quarterly maturities not already occupied by the monthly buckets. The basis is measured from closing prices and annualized with **365 natural days**, consistent with the project's frozen convention. Current-month rolling occurs four trading days before the third-Friday expiry anchor; quarterly rolling applies the analogous rule in quarter months.

The roll engine attributes daily excess to the signed basis change of the contract actually held. The sentiment layer uses causal transformations, including one-sided filtering where required, and the strategy layer implements the report's trend/reversal method families with standard TA-Lib definitions where available. A zero aggregate signal carries the previous position rather than forcing a new trade.

Some method definitions cannot be made source-identical. That ambiguity is most visible in the Figure-53 retained-strategy list, which is why that layer is reported as **partial** even though the higher-level IC timing results are close.

## Validation protocol

The implementation uses **T-day information for T+1 positioning**, so the published timing rule does not consume future observations. Historical constituent membership is point-in-time to avoid survivorship leakage. The roll anchor was audited against roll-premium attribution rather than accepted solely because a headline Sharpe happened to look close.

The passive benchmark is current-month continuous rolling. For the cross-maturity application, the benchmark is the always-positive-spread position (long current month / short current quarter). Transaction costs are not included because the source report also excludes them; the page therefore does **not** claim cost-robust live performance.

## Research conclusion

The strongest replication evidence is concentrated in three places: the basis/roll engine, the representative sentiment-factor relationships, and the IC strategy layer. IC OOS timing improvement is close to the source (+2.0% versus +2.6%), P/L and annual switching are almost identical, and the IC cross-maturity application preserves a large OOS edge (+20.7% versus +25.2%).

The reproduction is not exact everywhere. IM timing is materially weaker, and the Figure-53 strategy-selection layer is only partially matched because important technical-method definitions and selection details remain under-specified. The price-index versus total-return convention also changes absolute roll-excess levels.

Accordingly, the project is classified as **extended**: the core IC mechanism and principal cross-maturity effect are reproduced with documented deviations, after which separate Lorien Lab experiments explore execution-layer improvements. The complete technical report, configuration, code, and experiment history remain in the linked Reproduction03 research repository.
