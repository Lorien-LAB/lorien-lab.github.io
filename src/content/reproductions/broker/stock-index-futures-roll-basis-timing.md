---
slug: stock-index-futures-roll-basis-timing
title: "股指期货滚贴水择时策略与市场情绪因子 (Roll/Discount Basis Timing Strategy for Stock Index Futures and Market Sentiment Factors)"
description: "Reproduction of Orient Futures' basis-timing strategy: IC/IM index-futures roll-premium harvesting with market-sentiment timing signals, plus documented extensions."
researchArea: "Index Futures Timing"
stage: extension
result: extended
resultSummary: "Core reproduction succeeds: IC multi-factor strategy (OOS +2.0% vs paper +2.6%, P/L 1.11 vs 1.12, switches 4.6 vs 4.5) and 6x cross-maturity arbitrage (OOS +20.7% vs +25.2%, annual sign 9/9). Exact figure-53 TA-selection list not reproduced (formulas undisclosed). Clear extensions (asymmetric confirmation, IM+IC signal averaging, deep-discount anchor, portfolio) documented separately."
codeVisibility: public

sourceType: broker
broker: "Orient Futures (东证期货) · 东证衍生品研究院"
analysts:
  - "李晓辉"
  - "朱仪清"
publishDate: 2026-06-26
series: "股指期货深度报告"

date: 2026-08-14
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
dataAvailability: Partial

codeUrl: "https://github.com/Lorien-LAB/quant-research-reproductions/tree/main/broker/stock-index-futures-roll-basis-timing/"

metrics:
  - name: "IC multi-factor OOS optimization (多头差)"
    original: "+2.6%"
    reproduced: "+2.0%"
    difference: "-0.6pp"
  - name: "IC multi-factor P/L ratio"
    original: "1.12"
    reproduced: "1.11"
    difference: "-0.01"
  - name: "IC multi-factor annual switches"
    original: "4.5"
    reproduced: "4.6"
    difference: "+0.1"
  - name: "IC roll premium excess 2023+ (当月 continuous)"
    original: "5.10%"
    reproduced: "6.29%"
    difference: "+1.19pp (price vs total-return index)"
  - name: "IC cross-maturity arbitrage OOS optimization (6x)"
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

relatedKnowledge: []
relatedNotes: []
relatedProjects: []
---

## Report thesis

Orient Futures proposes a **roll/discount basis timing strategy** for stock-index index futures (IC = CSI 500, IM = CSI 1000): hold the futures contract long to harvest the persistent discount-premium convergence (rolling premium), and switch between the **current-month** (当月) and **current-quarter** (当季) continuous contracts based on a market-sentiment timing signal built from the **current-quarter annualized basis rate**.

## Original claim

The paper claims that market-sentiment factors (volatility, amplitude, breadth ADR, return dispersion, option-implied VIX) predict the direction of the current-quarter annualized basis rate, and that timing between 当月/当季 yields a measurable improvement over the passive 当月 roll benchmark:

- IC multi-factor: full-sample optimization +1.1%, OOS +2.6%, win rate 54.9%, P/L 1.12, 4.5 switches/yr.
- IM multi-factor: full-sample +1.4%, OOS +1.5%, win 61.4%, P/L 1.17, 2.0 switches/yr.
- 6x-levered cross-maturity arbitrage: IC full-sample +13.5% / OOS +25.2%; IM +18.1% / +13.9%.

## Reproduction target

1. Contract chain (当月/下月/当季/隔季 unified ladder) and current-quarter annualized basis rate.
2. Roll-premium excess attribution (paper formula 1: `excess(T) = b_held(T)(T) − b_held(T)(T-1)`).
3. Chart-51 representative factor selection (Spearman direction + max |ρ|) and correlations.
4. Chart-52 18-method × parameter-grid strategy signals; chart-53 retained strategy list.
5. IC/IM multi-factor backtest (OOS / full-sample / excess blocks).
6. 6x cross-maturity arbitrage backtest.

## Data reconstruction

- Futures daily per-contract close + delivery metadata (2010–2026, 529 IC/IM/IH/IF contracts); local xtdata snapshot + incremental refresh.
- Index daily for CSI 500 / CSI 1000 (000905.SH / 000852.SH).
- Constituent daily bars (all-A daily, 2010–2026) with **point-in-time** quarterly index-weight membership to avoid survivorship.
- CSI 1000 index options (MO, from 2022-07) with model-free implied vol (`vix_like_30d`), skew, PCR; CSI 500 ETF options (510500) as IC-side proxy.
- Margin-balance changes.
- **Unavailable**: free-float daily turnover (paper drops the factor anyway; local data is monthly snapshot only).

## Method reconstruction

- **Unified ladder** contract designation (nearest two monthly delivery months + nearest two quarterly months not already 当月/下月), self-consistent with the switch-day rule.
- **Switch day** = next trading day after the 3rd Friday; **roll day** = 4 trading days before the 3rd Friday close (当月 monthly; 当季 in Jan/Apr/Jul/Oct). ⚠️ Anchor resolved to the 3rd Friday after an audit that nearly mis-set it to the switch day (the price-index Sharpe coincidentally ≈ paper baseline; the roll premium excess is the true discriminator — issues #33).
- **Annualization**: 365 natural days; basis from close prices; one-sided HP filter λ=100 (boundary corrected −4λ → −2λ).
- **Roll excess** = formula-1 daily attribution on the held contract's signed basis rate; multi-head = index return + roll excess.
- **Signals**: 18 TA methods (SMA/WMA/EXPMA/Kaufman/MESA/MidPoint/Hilbert/TRIX/MACD/BOLL/Donchian/ROC/Continuous + RSI/CMO/Quantile/RROC/RContinuous) via TA-Lib; MESA = Ehlers MAMA with alpha∈[f,s] interpretation; signal 0 → hold-previous.
- **Factor/multi-factor signal** = sign of arithmetic mean of retained strategy signals (0 → hold previous).
- Optimization = 多头差 (strategy absolute − benchmark absolute), the paper's consistent headline metric.

## Implementation

- Code: `broker/stock-index-futures-roll-basis-timing/src/` (package `repro03`: paths/io/calendar/contracts/basis/transforms/factors/selection/signals/strategy/roll_returns).
- Build scripts: `scripts/build_*_foundation.py`, `select_strategies.py`, `backtest_multifactor.py`.
- Config: `configs/repro03.yaml`; tests: 80/80 passing.
- Environment: Python 3.13, pandas 3.0.5, TA-Lib 0.7.1, scipy, pyarrow.

## Validation

- **Look-ahead**: all signals causal (T-day signal → T+1 position); HP filter causal (expanding window); no future information.
- **Survivorship**: PIT constituent membership; no look-ahead universe.
- **Timing**: roll anchor cross-checked via roll-premium excess (not baseline Sharpe — see Method note).
- **Benchmark**: 当月 continuous (passive roll); arbitrage benchmark = always 正套 (long 当月 / short 当季).
- **Costs**: none (paper's assumption).

## Results

### Original report

IC multi-factor: full-sample +1.1%, OOS +2.6%, win 54.9%, P/L 1.12, 4.5 switches/yr; cross-arb 6x: full +13.5% / OOS +25.2%.

### Reproduced

IC multi-factor: full-sample optimization **+0.5%**, OOS **+2.0%**, win 54.1%, P/L **1.11**, switches **4.6**/yr; cross-arb 6x: full **+5.5%** / OOS **+20.7%**. IC roll baseline Sharpe 0.554 vs 0.54; roll excess 2023+ 6.29% vs 5.10%.

### Differences

- IC multi-factor headline metrics match closely (OOS −0.6pp, P/L −0.01, switches +0.1); full-sample optimization is lower (+0.5% vs +1.1%) because the ADR factor contributes ≈0 in our data (paper's CMO-on-ADR signals never beat baseline here).
- Cross-arb full-sample lower (+5.5% vs +13.5%) but OOS +20.7% vs +25.2%; annual sign matches 9/9.
- IM side weaker (OOS +0.7% vs +1.5%; switches 6.6 vs 2.0/yr) driven by IM-vol MESA signal noise (standard libraries cannot reproduce the paper's MESA as stable+effective) and short IM data history.

## Known deviations

1. **Figure-53 exact TA-selection list not reproduced** (3/7 factors match exactly; the paper's retained strategies do beat baseline in our engine but ranking/≥1/4-threshold differ). Root cause: paper does not disclose MESA/Hilbert/Kaufman formulas or the exact selection rule quantiles.
2. **Price-index basis vs paper total-return index**: our absolute excess is higher by the implied dividend (IC ~1.2%, IM ~0.3%, IH ~3.5%, IF ~2.8%). Optimization (多头差) is dividend-invariant.
3. **IM multi-factor** weaker (see Differences).
4. **ADR CMO reversal** signals underperform baseline in our data; the paper retains them.
5. Free-float turnover unavailable (paper drops it).

## Robustness

- **Roll-forward validation**: hysteresis confirmation selected in-sample (2018–22) keeps beating baseline in validation (2023–25) and true OOS (2025-10+): OOS +4.10% vs +2.57%.
- Hysteresis knee peaks at confirm=10 (degrades at 15/20/30) — real signal-to-noise optimum, not monotone overfit; annual decomposition matches the paper's figure-90 direction (7/9 years positive).
- Cross-arb hysteresis helps in-sample and OOS but the 2023–25 validation window is negative for both configs (regime-dependent).
- No cost sensitivity (paper excludes costs; our lower-turnover optimizations would only improve).

## Extensions

*Separate from reproduction evidence.*

1. **Aggregate asymmetric hysteresis confirmation** (enter 当季 after 10 confirmed days, exit after 5): IC full-sample optimization +0.50% → +1.32%, OOS +1.96% → +4.10%, turnover 4.6 → 4.4/yr (paper 4.5). Mechanism: sentiment factors are slow 120-day regime indicators; short-term signal flips are noise filtered by confirmation.
2. **Cross-product signal averaging (IM+IC 50/50)**: IM full-sample +0.84% → +1.76%, OOS +0.74% → +2.41% (beats paper 1.4%/1.5%). Both small-cap bases are highly correlated; the more-reliable IC signal de-noises IM.
3. **Deep-discount level anchor**: force 当季 when the basis is below its 15th percentile → OOS +5.38%.
4. **Roll + arbitrage portfolio** (beta 1x + beta-neutral 6x spread): Sharpe 0.65 → 1.46, max drawdown −34.8% → −24.2%.

## Conclusion

The paper's **core strategy claims are reproduced**: the basis-timing engine, chart-51 factor selection, IC multi-factor performance (P/L, turnover, OOS edge), and the cross-maturity arbitrage direction and magnitude. The headline divergences are (a) the exact figure-53 TA-selection list (formulas undisclosed), (b) a weaker IM side, and (c) price- vs total-return index basis affecting absolute excess only. Clear extensions (asymmetric confirmation, IM+IC averaging, deep-discount anchor, portfolio) are documented separately and materially improve OOS/Sharpe beyond the paper. **Result: extended** — core reproduction succeeded with documented deviations plus defensible extensions.
