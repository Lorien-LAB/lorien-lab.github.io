# Reproduction Research Note V3 Design

**Date:** 2026-08-15  
**Status:** Approved design, pre-implementation  
**Target repository:** `Lorien-LAB/lorien-lab.github.io`  
**Feature branch:** `reproduction-research-note-v3`  
**Canonical page:** `/projects/reproductions/stock-index-futures-roll-basis-timing/`

---

## 1. Goal

Redesign the existing reproduction detail page into a **Quant Research Dashboard × Research Narrative** case study.

The page must do two things at once:

1. **Attract attention immediately.** A quantitative interviewer or reviewer should understand the strategy, absolute annualized return, relative improvement, OOS behavior, risk, and turnover in about 10 seconds.
2. **Demonstrate research quality indirectly.** A reader who continues should see how the original model works, how it was rebuilt, where it failed to reproduce exactly, how new hypotheses were formed, what experiments were rejected, and why the final optimization was selected.

The page must not rely on self-congratulatory claims such as “strong research ability.” Research decisions and evidence should make that conclusion obvious.

Language: **Chinese-first**, retaining precise English terminology such as `Roll Premium`, `Basis Timing`, `Signal Aggregation`, `Out-of-Sample (OOS)`, `Hysteresis`, `Drawdown`, `Ablation`, `Negative Control`, `PIT`, and `Parameter Stability`.

---

## 2. Evidence sources

### Original research

Orient Futures / 东证衍生品研究院:

> 《股指期货滚贴水择时策略与市场情绪因子》, 2026-06-26, 李晓辉、朱仪清.

The original report is authoritative for the original economic mechanism, model design, factor definitions, signal methods, reported results, original extension, and cross-maturity strategy.

### Lorien Lab research source of truth

`Lorien-LAB/Index-Timing/tree/master/Reproduction03`

Primary artifacts:

- `doc/reproduction_report.md`
- `doc/optimization_report.md`
- `doc/multifactor_backtest_report.md`
- `doc/paper_notes.md`
- `doc/issues_log.md`
- `configs/repro03.yaml`

### Provenance rule

All evidence must be visually and semantically classified as one of:

- **Reported by Orient Futures**
- **Reproduced by Lorien Lab**
- **Optimized by Lorien Lab**

Never mix these into one unlabeled number.

No fabricated “paper daily NAV” is allowed. Paper metrics may be shown as reported values, but only Lorien Lab machine-readable runs may be plotted as time series.

---

## 3. Overall page rhythm

The new page should follow this order:

1. **Hero Research Dashboard**
2. **Interactive Strategy Performance Chart**
3. **01 · The Opportunity**
4. **02 · The Original Strategy**
5. **03 · Rebuilding It From Scratch**
6. **04 · Replication Evidence**
7. **05 · Where the Reproduction Broke**
8. **06 · My Research: From Diagnosis to Optimization**
9. **Interactive Ablation / Sensitivity Dashboard**
10. **Cross-Maturity Mechanism Check**
11. **What I Learned / Limitations / Next Tests**
12. **Research Audit Appendix + Artifacts**

The page must feel like one continuous research note, not twelve disconnected component cards.

---

## 4. Hero Research Dashboard

### 4.1 First-screen research statement

The hero should communicate:

> **不预测指数方向，而是预测基差 regime，动态选择当月 / 当季合约，以提高股指期货 Roll Premium。**

Supporting subtitle:

> 从东证期货策略复现，到执行层状态过滤与非对称 Hysteresis 优化。

### 4.2 Absolute annualized return is mandatory

The hero must **directly show absolute annualized return**, not merely incremental alpha.

The first visual row is a performance snapshot with three provenance columns:

| Metric | Orient Futures | Reproduced | Optimized |
|---|---:|---:|---:|
| Annualized Return | official reported value | actual reproduction run | actual optimized NAV run |
| Sharpe | official / comparable value when available | actual run | actual run |
| Max Drawdown | official / comparable value when available | actual run | actual run |

For IC full-sample multi-factor timing, current known source values include:

- paper strategy annualized return: **13.6%**;
- paper passive benchmark: **12.5%**;
- reproduced strategy annualized return: **12.4%**;
- reproduced passive benchmark: **11.9%**.

The **optimized absolute annualized return must be recalculated from the optimized machine-readable NAV/run during implementation**. Do not derive and hard-code it from “benchmark + improvement” unless that calculation is explicitly verified against the underlying series.

### 4.3 Second visual row: research increment

The second row should show:

- `vs Passive Benchmark` — full-sample annualized improvement;
- `OOS Improvement`;
- `Switches / Year`.

Current headline evidence:

| | Paper | Reproduced | Optimized |
|---|---:|---:|---:|
| Full-sample improvement | +1.1% | +0.50% | +1.32% |
| OOS improvement | +2.6% | +1.96% | +4.10% |
| Switches/year | 4.5 | ~4.6 | ~4.4 |

Hero takeaway:

> **Higher performance, without higher turnover.**

This is a secondary message; absolute annualized return remains the primary hook.

---

## 5. Interactive primary performance chart

Immediately below the hero, provide one large research comparison chart.

### 5.1 Series

For IC roll timing:

- Passive current-month rolling benchmark;
- Reproduced original framework;
- Optimized Lorien Lab strategy.

Do not plot a synthetic paper NAV.

### 5.2 Linked panels

One interactive chart module should contain:

- normalized NAV panel;
- drawdown panel;
- compact dynamic metrics strip.

### 5.3 OOS shading

From `2025-10-01` onward, shade the region and label:

`OUT OF SAMPLE`

### 5.4 Range controls

Support:

`All | In Sample | OOS`

Changing the range should update the displayed metrics from the same underlying selected interval where technically appropriate.

### 5.5 Hover / switch events

Hover should expose date and NAV values. If switch-event data is available from the underlying run, show:

- previous maturity state;
- new maturity state;
- aggregate signal;
- confirmation state / persistence days;
- benchmark / reproduced / optimized NAV at the event.

Do not invent event fields that are not present in actual run outputs.

### 5.6 Strategy tabs

Primary tabs:

- `Roll Timing`
- `Cross-Maturity Arbitrage`

The page should not stack four or five large NAV charts vertically.

---

## 6. 01 · The Opportunity

Explain the financial mechanism before discussing factors.

### Required concepts

- long-term short hedging pressure contributes to persistent discount;
- futures converge toward spot near expiry;
- a long futures investor can harvest convergence as roll-related return;
- maturity matters because convergence speed differs across the term structure;
- the original report finds current-month rolling is generally the best fixed-maturity benchmark for IC/IM.

### Visual

Create an original Lorien Lab diagram showing:

`Persistent discount → convergence toward spot → roll premium`

A second small term-structure visual may illustrate convexity / maturity differences.

Do not embed screenshots copied from the report.

---

## 7. 02 · The Original Strategy

This section must allow a reader to understand the original algorithm without reading the 62-page source report.

### 7.1 Prediction target

The strategy does **not** predict the equity-index direction.

It predicts the direction of the **current-quarter annualized basis rate**.

### 7.2 Trading rule

- expected quarterly annualized basis **rising** → hold current-quarter contract;
- expected quarterly annualized basis **falling** → hold current-month contract;
- benchmark → passive current-month rolling.

### 7.3 Original model pipeline

Render one large visual pipeline:

`Market sentiment`
→ `10 primary factors`
→ `55 processed secondary factors`
→ `economic-direction + Spearman screening`
→ `7 retained factors`
→ `18 timing methods`
→ `single-factor signals`
→ `multi-factor aggregation`
→ `forecast quarterly annualized basis direction`
→ `current month / current quarter allocation`

### 7.4 Primary factor families

Explain six economic groups:

- spot price volatility;
- trading activity;
- market breadth / structure;
- option risk pricing;
- option trading structure;
- leveraged funding behavior.

### 7.5 Secondary-factor engineering

Explain:

- lookback variation;
- 60-day demeaning;
- one-sided HP filtering;
- EMA smoothing;
- different treatment based on center drift, noise, and SNR.

### 7.6 Representative factor selection

Explain the economic-direction + sample Spearman procedure.

Final retained factors:

**IC**
- annualized volatility;
- amplitude;
- ADR;
- constituent-return dispersion.

**IM**
- annualized volatility;
- constituent-return dispersion;
- VIX.

### 7.7 18 signal families

Explain that the 18 timing methods operate on the **processed sentiment factor series**, not on index prices.

13 trend families include moving-average, adaptive/trend, channel-breakout and momentum methods; 5 reversal families include RSI/CMO/Quantile/RROC/RContinuous.

The page should explain the role of the parameter pool and the report's robustness requirement: strategy selection combines top sample Sharpe with parameter-surface stability rather than choosing one single optimum parameter blindly.

### 7.8 Zig-zag distinction

Explicitly separate:

- `Oracle / structural validation` — zig-zag historical trend segmentation;
- `Tradable model` — causal sentiment-factor signals.

The source report itself states that zig-zag dynamically repaints and is not a stable real-time trading signal.

---

## 8. 03 · Rebuilding It From Scratch

This is the first major section where Lorien Lab's work becomes the subject.

Use a compact engineering / audit dashboard rather than a score.

Headline examples:

- `529` futures contracts reconstructed;
- `55` secondary-factor candidates;
- `18` signal families implemented;
- `33` implementation ambiguities / issues audited.

Explain the reconstructed research system:

`Contract Chain → Basis Engine → PIT Constituents → Factor Engine → Signal Library → Backtest → Audit`

Surface selected nontrivial decisions:

- contract maturity ladder;
- roll-return attribution;
- point-in-time constituent handling;
- one-sided HP filter corrections;
- MESA convention ambiguity;
- signal `0 → hold previous state`;
- persistent Donchian/BOLL semantics;
- price-index vs total-return convention.

The section should communicate reconstruction depth without becoming a changelog.

---

## 9. 04 · Replication Evidence

### 9.1 Factor evidence visualization

Replace a dense factor table with a slope / dumbbell comparison between report and reproduction for the seven retained factors.

Emphasize:

- 7/7 correlation directions reproduced;
- 6/7 magnitudes are extremely close;
- IM dispersion is the visible exception.

### 9.2 Headline strategy evidence

Use a concise comparison of:

- IC full-sample annualized return;
- IC OOS annualized return;
- full-sample annualized improvement;
- OOS annualized improvement;
- Sharpe;
- drawdown;
- P/L ratio;
- switches/year;
- cross-maturity result.

Absolute annualized return must be shown alongside relative improvement.

### 9.3 What was successfully reproduced

Clearly state the strongest evidence:

- basis / roll engine;
- representative sentiment-factor relationships;
- IC multi-factor timing direction and headline behavior;
- cross-maturity effect.

Do not label the entire source “exactly reproduced.”

---

## 10. 05 · Where the Reproduction Broke

This section is intentionally prominent. Deviations are evidence of model audit quality, not embarrassing footnotes.

Required topics:

### Figure-53 strategy-selection fragility

Discuss:

- incomplete TA implementation definitions;
- MESA / Hilbert / Kaufman ambiguity;
- model-selection sensitivity;
- exact strategy-list mismatch.

### IM weakness

Explain that IM reproduction is materially weaker and history is shorter.

### Index-return convention

Explain price index vs total-return index and why absolute roll-excess levels shift while some timing-vs-benchmark differences are less sensitive.

The section should frame these as limits to exact identification, never as excuses.

---

## 11. Original report's own failed extension as the research handoff

This is a central V3 narrative element.

The original report itself tests an extension:

- basis rising → current-quarter;
- basis falling → cash instead of current-month.

Under perfect zig-zag historical segmentation, the idea looks theoretically better. Under the actual sentiment-factor signal, however, it mostly fails because the model cannot reliably distinguish a true falling regime from an uncertain / noisy regime. Cashing both types loses valid roll premium, so the report returns to the original framework.

The V3 page should explicitly use this as the handoff:

> **The source report had already identified the downside-regime problem. The open question was not whether downside mattered, but how to improve regime transitions without demanding an unrealistically precise downside classifier.**

This creates the motivation for Lorien Lab's optimization.

---

## 12. 06 · My Research: From Diagnosis to Optimization

### 12.1 ADR diagnosis

Show the experiment:

- baseline 4-factor IC ensemble;
- remove ADR;
- OOS improves;
- turnover explodes.

Interpretation:

> **A weak factor may still stabilize the ensemble state even if its standalone alpha is weak.**

The insight is that ADR behaved partly as a state anchor / regularizer.

### 12.2 Hypothesis shift

The question changes from:

> “Which factor should be added or removed?”

to:

> **“Are short-lived aggregate signal flips execution-layer noise around a slow-moving sentiment regime?”**

### 12.3 Intervention level

The chosen intervention is applied at the **aggregate tradable signal**, not mechanically to every factor.

Reason:

- the underlying sentiment variables are slow-moving state indicators;
- TA transformations can generate short-lived sign flips;
- factor-level hysteresis empirically underperforms aggregate-level confirmation.

### 12.4 Symmetric persistence test

Visualize confirmation-window sensitivity:

`5 / 10 / 15 / 20 / 30 days`

Show the non-monotonic performance surface with a knee around 10 days.

Interpretation:

`noise filtering ↔ reaction lag trade-off`

Do not describe 10 days as a universal optimum.

### 12.5 Asymmetric hysteresis

Selected rule:

- enter quarterly only after ~10 days of persistent confirmation;
- exit quarterly after ~5 days of contrary confirmation.

Interpretation:

- **slow entry** requires higher conviction before moving into the more basis-sensitive quarterly contract;
- **faster exit** protects accumulated carry when the regime deteriorates.

Headline current evidence:

- full-sample improvement: **+1.32%**;
- OOS improvement: **+4.10%**;
- switches/year: **~4.4**, approximately unchanged from the paper / baseline regime.

The important claim is not “4.10% > 2.60%”; it is:

> **The improvement does not rely on higher turnover.**

---

## 13. Ablation / falsification dashboard

The page must show rejected experiments, not only the winner.

At minimum include:

- baseline;
- remove ADR;
- symmetric aggregate hysteresis;
- asymmetric 10/5 hysteresis;
- target-level anchor;
- continuous position sizing;
- factor-level hysteresis;
- IM hysteresis negative control.

Suggested columns:

- Full-sample improvement;
- OOS improvement;
- switches/year;
- research verdict;
- brief interpretation.

This component should visually distinguish:

- selected;
- useful diagnostic;
- rejected;
- negative control.

---

## 14. Cross-maturity arbitrage as a mechanism check

The 6x spread application must not be marketed as a standalone spectacular return number.

Use it as a mechanism test:

> If false regime switches are the problem, the same execution-layer filtering should have a larger effect when the wrong-side exposure is magnified by leverage.

Show baseline vs optimized cross-maturity performance with clear leverage labeling and explicit caution.

Current optimization report evidence may be used only with exact provenance and definition labels.

---

## 15. Dashboard design principles

Dashboard elements remain important, but each must answer a research question.

### Keep prominent

- absolute annualized return;
- Sharpe;
- max drawdown;
- annualized improvement vs benchmark;
- OOS improvement;
- switches/year;
- NAV / drawdown;
- factor replication comparison;
- ablation dashboard;
- parameter sensitivity.

### Demote to appendix

- six-dimensional reproduction score;
- pipeline progress indicator;
- generic status badges;
- verbose metadata cards.

These remain available for audit but must not dominate the reading experience.

---

## 16. Visualization requirements

### 16.1 Visual hierarchy

Use large typography, generous negative space, and full-width visual sections. Avoid turning every paragraph into a bordered card.

### 16.2 Dynamic NAV quality

The NAV chart must improve materially over V2:

- responsive full-width plotting;
- legible axis labels;
- linked drawdown;
- OOS shading;
- range switch;
- hover inspection;
- strategy tab switch;
- metric strip updates;
- accessible legend interactions;
- mobile fallback.

### 16.3 Research diagrams

All source mechanisms and pipelines should be redrawn as Lorien Lab originals. Do not reproduce or embed copyrighted Orient Futures report screenshots.

### 16.4 No decorative charts

Every chart must answer one explicit question. Remove charts that merely prove data exists.

---

## 17. Copyright / attribution

The uploaded report contains a copyright notice restricting unauthorized publication, adaptation, or redistribution.

Therefore the public site must:

- cite the report by title, authors, institution, and publication date;
- link to a legitimate source when available;
- paraphrase its methodology;
- redraw diagrams independently;
- avoid hosting or embedding screenshots/pages from the report unless permission is separately established.

---

## 18. Research honesty rules

Mandatory:

- no fabricated paper NAV;
- no derived annualized optimized number shown as “actual” unless verified from the optimized series;
- no hiding IM negative results;
- no hiding Figure-53 mismatch;
- label 6x leverage prominently;
- state that transaction costs are not included when using the source-comparable setup;
- state the short OOS window;
- state that hysteresis parameters were selected using available historical evidence;
- distinguish baseline reproduction from later Lorien Lab optimization.

---

## 19. Reusable architecture

V3 should improve the reproduction case-study framework, not create another slug-hardcoded one-off page.

Recommended component responsibilities:

- `ResearchHeroDashboard` — headline research thesis + annualized/risk/increment metrics;
- `StrategyPerformanceExplorer` — NAV, drawdown, ranges, tabs, dynamic metrics;
- `ResearchMechanism` — reusable mechanism / causal chain visuals;
- `OriginalModelPipeline` — original source model architecture;
- `ReplicationEvidence` — factor and strategy comparison visuals;
- `ResearchDiagnosis` — deviations and discovered failure modes;
- `ExperimentMatrix` — ablations, rejected ideas, negative controls;
- `SensitivityChart` — persistence-window trade-off;
- `ResearchAuditAppendix` — score, metadata, artifacts, limitations.

Components should consume structured data from the reproduction content record or colocated data files. They must not contain hidden research numbers in presentation code.

---

## 20. Data provenance for interactive charts

Implementation must inspect `Index-Timing/Reproduction03` outputs before wiring the new chart.

Required series should be exported / represented explicitly as:

- benchmark NAV;
- reproduced baseline NAV;
- optimized NAV;
- drawdown series;
- optional signal / state / switch-event series;
- cross-maturity equivalents where available.

All hero absolute annualized return, Sharpe, drawdown, OOS metrics, and chart time series should be generated from or checked against the same run outputs.

This is required to prevent the website from showing a metric from one experiment definition beside a chart from another.

---

## 21. Testing requirements

Add tests that assert:

- V3 content is opt-in and generic reproduction records still render;
- hero directly includes annualized return and risk metrics;
- provenance labels distinguish paper / reproduced / optimized;
- no fake paper NAV is rendered;
- original-model pipeline includes the 10 → 55 → 7 → 18 research chain;
- original report's failed cash extension is explained before Lorien Lab optimization;
- optimization narrative includes ADR diagnosis, aggregate hysteresis, negative controls, and 10/5 asymmetry;
- OOS caution remains visible;
- StrategyPerformanceExplorer has All / IS / OOS controls and Roll / Cross-Maturity modes when data permits;
- production build creates the canonical page;
- existing legacy reproduction redirect behavior remains unchanged.

Run:

```bash
npm test
npm run check
npm run build
```

before integration.

---

## 22. Success criteria

A quant interviewer should be able to answer after scanning the first screen:

- What is the strategy?
- What is its absolute annualized return?
- How does reproduced performance compare with the source?
- How much did Lorien Lab's optimization improve the strategy?
- Did the improvement increase turnover?
- What is the main risk / OOS caveat?

After reading the full page, the interviewer should also understand:

- why roll premium exists;
- why current-month and current-quarter maturities are switched;
- why current-quarter annualized basis is the target;
- how 10 primary factors become 55 candidates and 7 retained factors;
- what the 18 signal families do;
- why zig-zag is not tradable;
- how the reproduction was independently reconstructed;
- what could not be identified exactly;
- why the source report's own cash extension failed;
- how ADR removal exposed the ensemble-stability issue;
- why the research question moved to aggregate signal persistence;
- why 10/5 asymmetric hysteresis was selected;
- which alternatives failed;
- why IM acts as a useful negative control;
- what evidence remains provisional.

The desired impression is not “this page has many metrics.” It is:

> **This researcher can understand a financial mechanism, reconstruct a complex quantitative model, audit implementation ambiguity, formulate hypotheses from failure modes, run disciplined ablations, reject attractive but unsupported ideas, and improve the system without hiding uncertainty.**
