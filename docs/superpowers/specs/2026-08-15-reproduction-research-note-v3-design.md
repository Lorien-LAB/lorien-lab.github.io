# Reproduction Research Note V3 Design

**Date:** 2026-08-15  
**Status:** Approved design, implementation-aligned revision  
**Target:** `/projects/reproductions/stock-index-futures-roll-basis-timing/`  
**Branch:** `reproduction-research-note-v3`

## 1. Goal

Turn the stock-index-futures reproduction page into a **Quant Research Dashboard × Research Narrative** case study.

The page must simultaneously:

- attract a quant interviewer/reviewer within ~10 seconds using absolute performance and interactive NAV evidence;
- explain the original Orient Futures strategy deeply enough that a reader understands the financial mechanism, factor engineering, model search, aggregation and portfolio rule;
- show how Lorien Lab rebuilt and audited the system rather than merely copying reported numbers;
- demonstrate research ability indirectly through diagnosis, falsification, ablations, negative controls and mechanism-driven optimization;
- preserve limitations and provenance so the page never turns into strategy marketing.

Language is **Chinese-first**, with exact research terminology retained in English when useful: `Roll Premium`, `Basis Timing`, `Signal Aggregation`, `OOS`, `Hysteresis`, `Drawdown`, `Ablation`, `Negative Control`, `PIT`, `Parameter Stability`.

## 2. Evidence hierarchy

### Original research

Orient Futures / 东证衍生品研究院, 李晓辉、朱仪清, 《股指期货滚贴水择时策略与市场情绪因子》, 2026-06-26.

Authoritative for:

- original economic mechanism;
- original model / factor / strategy design;
- reported results;
- the report's own failed down-regime-cash extension;
- cross-maturity application.

### Lorien Lab research source of truth

`Lorien-LAB/Index-Timing/tree/master/Reproduction03`

Primary artifacts:

- `doc/reproduction_report.md`
- `doc/multifactor_backtest_report.md`
- `doc/optimization_report.md` — historical A–G stage
- `doc/optimization_report2_newdirections.md` — later H–M stage, latest recommendation
- `doc/issues_log.md`
- `configs/repro03.yaml`
- `scripts/opt_final_annualized.py`
- `scripts/gen_charts.py`

### Provenance contract

Every result must be identifiable as:

- **Reported by Orient Futures**
- **Reproduced by Lorien Lab**
- **Optimized by Lorien Lab**

No synthetic paper NAV. No invented reproduced daily NAV. Time-series charts may only use machine-readable Lorien Lab run outputs that actually exist.

## 3. Latest research state

The early A–G research stage selected IC 3-factor + aggregate asymmetric Hysteresis 10/5, with approximately:

- full-sample improvement `+1.32%`;
- true-OOS improvement `+4.10%`;
- switches/year `~4.5`.

This is **historical research evolution, not the final active recommendation**.

The later H–M research adds strict rolling validation and a deep-discount state anchor. The current recommended IC configuration is:

> **3 factors (ADR removed) + aggregate asymmetric Hysteresis in10/out5 + deep-discount anchor q=0.15**

Latest H–M evidence:

- absolute annualized return: **13.2%**;
- Sharpe: **0.65**;
- max drawdown: **-34.8%**;
- full-sample improvement vs passive current-month benchmark: **+1.30%**;
- true-OOS improvement: **+5.38%**;
- switches/year: **~3.8**.

Separately, H–M finds `IM+IC 50/50` improves the weaker IM signal, and builds roll + cross-maturity combinations. These remain extensions and must not be merged into the IC headline strategy.

## 4. Page rhythm

1. Hero Research Dashboard
2. Interactive NAV + Drawdown workspace
3. `01 · The Opportunity`
4. `02 · The Original Strategy`
5. `03 · Rebuilding It From Scratch`
6. `04 · Replication Evidence`
7. `05 · Where the Reproduction Broke`
8. `06 · My Research`
9. Ablation + sensitivity evidence
10. Cross-index and cross-maturity mechanism checks
11. Research Audit appendix + artifacts

The page must read as one research note, not a wall of independent cards.

## 5. Hero Research Dashboard

### Research statement

> **不预测指数方向，而是预测基差 regime，动态选择当月 / 当季合约，以提高股指期货 Roll Premium。**

### Absolute performance is the primary hook

Show three provenance columns:

| Metric | Orient Futures | Reproduced | Latest Optimized |
|---|---:|---:|---:|
| Annualized Return | 13.6% | 12.4% | **13.2%** |
| Sharpe | 0.58 | 0.62 | **0.65** |
| Max Drawdown | -34.4% | -34.8% | **-34.8%** |

These are full-sample, comparable-cutoff figures. Paper values use the report's convention; Lorien Lab absolute figures use the reproduction's price-index convention, which must be disclosed later.

### Research increment is secondary

Show prominently but below absolute performance:

| | Paper | Reproduced | Latest Optimized |
|---|---:|---:|---:|
| Full-sample improvement | +1.1% | +0.50% | **+1.30%** |
| OOS improvement | +2.6% | +1.96% | **+5.38%** |
| Switches/year | 4.5 | ~4.6 | **~3.8** |

Takeaway:

> **Higher performance, without higher turnover.**

## 6. Interactive performance workspace

One large chart immediately below the hero.

### Views

- `Roll Timing`
- `Cross-Maturity Arbitrage`

### Range controls

- `All`
- `In Sample`
- `OOS`

OOS begins `2025-10-01`; comparable research cutoff is `2026-06-26`.

### Panels

- normalized NAV;
- linked Drawdown;
- compact dynamic metrics;
- hover crosshair and date/value tooltip;
- OOS shaded region.

### Series rule

The current machine-readable run contains the latest optimized strategy, benchmark, and index reference. Plot those actual series.

**Do not fabricate a reproduced-original daily series merely to make a three-line comparison.** The `Paper / Reproduced / Optimized` comparison is already visible in the hero and evidence dashboards. If a baseline reproduced daily series is generated from Reproduction03 in the future, it may be added later with explicit provenance.

## 7. `01 · The Opportunity`

Explain before factors:

- persistent short hedging demand contributes to index-futures discount;
- futures converge to spot near expiry;
- long futures can harvest convergence as Roll Premium;
- fixed-maturity comparison makes current-month a natural benchmark;
- term-structure convexity and curve shifts create maturity-selection opportunity;
- IC / IM are the focus because persistent discount is stronger.

Use original Lorien Lab diagrams, not copied report screenshots.

## 8. `02 · The Original Strategy`

Explain the report as a real quantitative system:

`10 primary factors → 55 processed secondary factors → economic-direction + Spearman screening → 7 retained factors → 18 timing methods → single-factor aggregation → multi-factor signal → maturity allocation`

Required details:

- target = **current-quarter annualized basis**;
- basis rising → hold current-quarter;
- basis falling → hold current-month;
- six economic factor categories;
- detrending / one-sided HP filtering / EMA / lookbacks;
- 13 trend + 5 reversal families;
- broad parameter pools;
- at least ~1/4 parameter combinations must beat benchmark Sharpe;
- method choice considers Sharpe + Parameter Stability;
- Zig-zag is structural/oracle validation and **not a tradable signal**.

Also explain the original report's own extension failure: down-regime → cash is theoretically attractive under Zig-zag, but real sentiment signals cannot distinguish true decline from uncertainty reliably enough, so the report returns to the original tolerant current-month fallback.

This failed extension becomes the research hand-off to Lorien Lab.

## 9. `03 · Rebuilding It From Scratch`

Surface real reconstruction work:

- 529 futures contracts;
- contract ladder;
- PIT constituents;
- roll-return attribution;
- options / index / financing data;
- 55 factor candidates;
- 18 strategy families;
- 33 ambiguity / implementation issues audited.

Do not replace this with a generic score.

## 10. `04 · Replication Evidence`

Primary evidence is structural:

- 7/7 representative-factor correlation directions match;
- 6/7 magnitudes are close;
- IC multi-factor OOS is close to source;
- P/L and switching are very close;
- IC cross-maturity effect is preserved.

Use a compact factor comparison visual instead of a giant table.

## 11. `05 · Where the Reproduction Broke`

Explicitly show:

- Figure 53 exact TA selection only partially reproducible because implementation / selection details are under-specified;
- IM side is weaker and has shorter history;
- Lorien Lab uses price-index convention while the report's absolute roll excess uses total-return index convention.

Core message:

> A successful reproduction exposed model-selection fragility that headline performance alone would not reveal.

## 12. `06 · My Research`

Narrative order must be causal, not retrospective cherry-picking.

### ADR diagnosis

Removing ADR improves IC OOS from roughly `+1.96%` to `+2.57%`, but switches/year jumps from 4.6 to **13.8**.

Insight:

> **A weak alpha factor can still be valuable if it stabilizes the ensemble state.**

### Aggregate-state hypothesis

Slow sentiment variables are regime indicators; short TA flips can be execution-layer noise.

Test Hysteresis at the **aggregate tradable state**, not blindly at every factor.

### Sensitivity

5 / 10 / 15 / 20 / 30-day confirmation must show a knee around 10 days; later values degrade. This supports a noise-filtering vs reaction-lag tradeoff.

### Asymmetry

- slower entry into current-quarter: 10-day confirmation;
- faster exit: 5-day confirmation.

### H–M refinement

Strict rolling validation supports generalization; adaptive confirmation is rejected; deep-discount anchor `q=0.15` becomes the latest IC recommendation.

### Negative controls / rejected experiments

Show failed work visibly:

- adaptive confirmation → rejected;
- factor-level Hysteresis → inferior;
- IM Hysteresis → worse / negative OOS;
- dedicated spread signals → rejected;
- continuous sizing / other early alternatives → no compelling advantage.

### Cross-index extension

`IM+IC 50/50` is a separate H–M extension showing that a more reliable related-market signal may denoise weaker IM states. Do not present it as part of the original report.

### Cross-maturity mechanism check

Use the leveraged spread application to test the hypothesis that false regime switches matter more when payoff sensitivity is larger. Present this as mechanism evidence, not a marketing headline.

## 13. Research Audit appendix

Move audit/UI-heavy metadata to the end:

- six-dimensional reproduction score;
- short OOS caveat;
- no transaction costs / slippage / impact;
- price-index vs total-return difference;
- Figure 53 ambiguity;
- q=0.15 remains a researched parameter requiring more forward testing;
- IM+IC needs longer live validation;
- code, config, reproduction report, latest H–M report.

## 14. Copyright / source presentation

Do not embed or republish screenshots/pages from the Orient Futures PDF. Redraw mechanisms and charts from Lorien Lab outputs and attribute the original research clearly.

## 15. Acceptance criteria

The target page must visibly contain:

- absolute annualized returns `13.6% / 12.4% / 13.2%`;
- latest OOS improvement `+5.38%`;
- interactive `Roll Timing / Cross-Maturity Arbitrage` chart;
- `All / In Sample / OOS` controls and OOS shading;
- full original 10→55→7→18 model explanation;
- Zig-zag non-tradable explanation;
- 529 / PIT / 33-issue reconstruction evidence;
- seven-factor replication evidence;
- ADR diagnosis and 13.8-turnover finding;
- aggregate Hysteresis / 10-day knee / asymmetric 10/5;
- q=0.15 latest anchor;
- negative controls;
- IM+IC 50/50 extension;
- Research Audit appendix.

The active V3 headline must not present early A–G `+1.32% / +4.10%` as the final recommendation, though those numbers may remain in the ablation history with explicit stage labeling.
