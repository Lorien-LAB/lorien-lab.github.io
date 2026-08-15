# Reproduction Research Note V3.1 Design

**Date:** 2026-08-15  
**Status:** Approved visual direction, pre-implementation  
**Target repository:** `Lorien-LAB/lorien-lab.github.io`  
**Feature branch:** `reproduction-research-note-v3-1`  
**Canonical page:** `/projects/reproductions/stock-index-futures-roll-basis-timing/`

---

## 1. Scope

V3.1 is a focused refinement of the already deployed V3 research note. It does **not** redesign the long-form research narrative, reproduction audit, optimization story, or appendix.

The goal is to improve the first-screen performance hierarchy so that the strongest portfolio result is immediately visible without misrepresenting it as the original report strategy.

The visual hierarchy must distinguish four research objects:

1. **Flagship Portfolio** — `IC Roll Timing + 1.0× Cross-Maturity Arbitrage`
2. **Core Strategy** — optimized IC Roll Timing
3. **Alpha Overlay** — IC Cross-Maturity Arbitrage 6×
4. **Diversified Portfolio** — `Roll + 0.5× Arb`

The page must continue to distinguish source provenance:

- **Reported by Orient Futures**
- **Reproduced by Lorien Lab**
- **Optimized / Constructed by Lorien Lab**

---

## 2. First-screen visual hierarchy

### 2.1 Flagship performance is the unique visual center

The largest performance object on the page must be:

> **39.9% Annualized Return**  
> **Sharpe 1.46 · Max Drawdown -24.2%**

with the explicit strategy label:

> **FLAGSHIP PORTFOLIO**  
> `IC Roll Timing + 1.0× Cross-Maturity Arbitrage`

This result must not be labeled as the original Orient Futures strategy, the reproduction, or a simple optimized roll-timing strategy. It is a Lorien Lab portfolio construction built after the reproduction and execution research.

The hero supporting copy should explain the architecture concisely:

> `Beta-bearing Roll Premium strategy + beta-neutral cross-maturity alpha stream.`

The `39.9%` figure should receive the strongest typographic weight on the page. `Annualized Return` should be immediately adjacent to it so the number is never visually ambiguous.

### 2.2 Risk metrics stay attached to the headline

The flagship block must show at least:

- Annualized Return: **39.9%**
- Sharpe: **1.46**
- Max Drawdown: **-24.2%**

These metrics are from the H–M research report and must be labeled as full-sample research results.

No OOS number should replace the full-sample 39.9% headline, because OOS windows are shorter and not directly comparable to the full-sample portfolio construction evidence.

---

## 3. Strategy stack below the flagship

Immediately below the flagship block, render exactly three equal-width strategy cards on desktop:

### 3.1 Core Strategy

**Label:** `CORE STRATEGY`  
**Name:** `Optimized Roll Timing`  
**Annualized Return:** `13.2%`  
**Sharpe:** `0.65`  
**Max Drawdown:** `-34.8%`

Supporting text should identify it as the latest IC roll-timing implementation:

`3 factors + asymmetric Hysteresis 10/5 + deep-discount anchor q=0.15`

### 3.2 Alpha Overlay

**Label:** `ALPHA OVERLAY`  
**Name:** `Cross-Maturity Arbitrage 6×`  
**Annualized Return:** `22.6%`  
**Sharpe:** `1.32`  
**Max Drawdown:** `-20.2%`

Supporting text should explain that this is a cross-maturity spread application and is intended as a beta-neutral alpha stream rather than an equity-beta replacement.

### 3.3 Diversified Portfolio

**Label:** `DIVERSIFIED PORTFOLIO`  
**Name:** `Roll + 0.5× Arb`  
**Annualized Return:** `26.3%`  
**Sharpe:** `1.14`  
**Max Drawdown:** `-27.8%`

Supporting text should communicate that this is an intermediate capital-allocation mix between the core roll strategy and the cross-maturity overlay.

### 3.4 Card hierarchy rule

The three cards must be visually subordinate to the 39.9% flagship block.

They should not use equally large headline typography, full-height hero treatment, or stronger accent treatment than the flagship portfolio.

On mobile they may stack vertically, but the flagship portfolio must remain first.

---

## 4. Research evolution strip

The existing `Orient Futures / Reproduced / Optimized` comparison is useful and must remain, but it should move **below** the flagship strategy stack.

It should become a compact section titled:

> **From Paper to Portfolio**

with a clear progression:

`Orient Futures → Independent Reproduction → Optimized Roll Timing → Research Portfolio`

Required numbers:

- Orient Futures roll timing: **13.6%** annualized
- Independent reproduction: **12.4%** annualized
- Optimized roll timing: **13.2%** annualized
- Research portfolio: **39.9%** annualized

The purpose of this strip is not to imply that 39.9% is a direct apples-to-apples replication improvement. It should show the **research lineage**:

1. understand the report;
2. independently reproduce it;
3. diagnose and improve the core execution logic;
4. combine a beta-bearing strategy with a beta-neutral spread alpha stream.

The progression should therefore visually change category at the final step, e.g. `Strategy research → Portfolio construction`.

---

## 5. Interactive performance workspace

### 5.1 Primary tabs

The main interactive chart should focus on three actual Lorien Lab machine-readable research series:

1. `Optimized Roll`
2. `Cross-Maturity Arb`
3. `Flagship Portfolio`

Do not add a separate large chart tab for `Roll + 0.5× Arb`; its role is sufficiently represented in the strategy stack and portfolio-comparison evidence.

### 5.2 Time-series provenance

Only actual Lorien Lab run series may appear as NAV lines.

Do not synthesize or digitize a daily Orient Futures NAV curve. Reported Orient Futures metrics remain in dashboard/evidence form only.

### 5.3 Existing controls retained

Keep:

- `All | In Sample | OOS`
- OOS shading from `2025-10-01`
- normalized NAV
- drawdown panel
- hover date/value inspection
- dynamically computed annualized return / approximate `Sharpe*` / max drawdown / selected window

The chart footnote must continue to distinguish headline full-run Sharpe from interval `Sharpe*` estimated from the sampled web series.

### 5.4 Portfolio chart data

The flagship tab should use the existing machine-readable `Roll + 1.0× Arb` series already present in the Reproduction03/site chart data lineage.

If the website JSON currently omits that series, V3.1 may surface it from the existing stored chart output. It must not reconstruct a new NAV from headline summary metrics alone.

---

## 6. Narrative below the hero

V3's long-form structure remains unchanged:

- The Opportunity
- The Original Strategy
- Rebuilding It From Scratch
- Replication Evidence
- Where the Reproduction Broke
- My Research: Diagnosis to Optimization
- Ablation / sensitivity / negative controls
- Cross-maturity mechanism check
- Limitations / next tests
- Research Audit Appendix

V3.1 must not duplicate these sections in the hero.

The first screen should answer only four questions:

1. What is the strongest portfolio result?
2. What strategies compose the research stack?
3. How do their risk-adjusted profiles differ?
4. How did the work evolve from report reproduction to portfolio construction?

---

## 7. Data contract

The V3.1 page data source should expose a dedicated portfolio-performance structure rather than scattering the values in component markup.

Recommended shape:

```ts
portfolio: {
  flagship: {
    role: 'FLAGSHIP PORTFOLIO',
    name: 'IC Roll Timing + 1.0× Cross-Maturity Arbitrage',
    annualizedReturn: '39.9%',
    sharpe: '1.46',
    maxDrawdown: '-24.2%',
  },
  strategies: [
    { role: 'CORE STRATEGY', name: 'Optimized Roll Timing', annualizedReturn: '13.2%', sharpe: '0.65', maxDrawdown: '-34.8%' },
    { role: 'ALPHA OVERLAY', name: 'Cross-Maturity Arbitrage 6×', annualizedReturn: '22.6%', sharpe: '1.32', maxDrawdown: '-20.2%' },
    { role: 'DIVERSIFIED PORTFOLIO', name: 'Roll + 0.5× Arb', annualizedReturn: '26.3%', sharpe: '1.14', maxDrawdown: '-27.8%' },
  ],
}
```

The existing paper/reproduction/optimized roll-timing data remain as a separate research-evolution structure.

---

## 8. Visual behavior

The first screen should feel like an institutional quant tear sheet rather than a grid of equal cards.

Visual order:

1. research title + thesis;
2. oversized flagship return;
3. attached Sharpe / Max DD;
4. three subordinate strategy cards;
5. compact `From Paper to Portfolio` evolution strip;
6. interactive performance workspace.

Use the site's existing typography and accent system. No unrelated redesign of navigation, theme tokens, or global site components is required.

Avoid excessive badges. Role labels should function as semantic architecture labels, not decoration.

---

## 9. Truthfulness and interview-readiness

Every result must preserve its strategy definition and sample context.

The page should encourage the interviewer to infer the research process rather than claim ability explicitly. In particular, it should make visible that:

- the core roll-timing strategy is not the same thing as the 39.9% portfolio;
- the cross-maturity strategy is a distinct alpha stream;
- portfolio construction improves the risk/return profile through combination rather than by merely increasing the core roll signal's turnover;
- full-sample and short OOS evidence remain separate;
- machine-readable NAV evidence and report-only metrics remain separate.

No language should imply live trading, realized investor returns, transaction-cost robustness, or guaranteed future performance.

---

## 10. Testing requirements

V3.1 tests must lock at least the following:

- `39.9%`, `1.46`, and `-24.2%` appear in the flagship hero data/component;
- exactly three subordinate strategy cards appear under the flagship;
- their annualized returns are `13.2%`, `22.6%`, and `26.3%`;
- role labels include `CORE STRATEGY`, `ALPHA OVERLAY`, `DIVERSIFIED PORTFOLIO`, and `FLAGSHIP PORTFOLIO`;
- `From Paper to Portfolio` preserves `13.6% → 12.4% → 13.2% → 39.9%`;
- the interactive workspace offers `Optimized Roll`, `Cross-Maturity Arb`, and `Flagship Portfolio`;
- no synthetic paper NAV is introduced;
- existing V3 research-note tests and generic reproduction routing continue to pass;
- `npm test`, `npm run check`, and `npm run build` all pass before integration.
