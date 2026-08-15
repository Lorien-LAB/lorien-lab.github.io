# Reproduction Research Note V3.1 — Flagship Portfolio Hero

Date: 2026-08-16
Status: Approved design, pending user review of written spec
Target route: `/projects/reproductions/stock-index-futures-roll-basis-timing/`
Branch: `reproduction-portfolio-hero-v3-1`

## 1. Goal

Upgrade the first screen of the stock-index-futures reproduction case study so the strongest portfolio result is visually dominant without misrepresenting provenance.

The page should communicate, within a few seconds:

1. The flagship research portfolio reaches **39.9% annualized return**, **1.46 Sharpe**, and **-24.2% max drawdown**.
2. That result is **not** the original paper strategy and is **not** the optimized roll-timing strategy alone.
3. It is a portfolio construction result combining a beta-bearing roll-premium strategy with a beta-neutral cross-maturity arbitrage overlay.
4. The component strategies remain visible immediately below the headline so the reader can understand the strategy architecture at a glance.

## 2. Source-of-truth metrics

Use the later H–M optimization report as the source of truth for the portfolio hierarchy.

| Layer | Strategy | Annualized Return | Sharpe | Max Drawdown |
|---|---|---:|---:|---:|
| Core strategy | Optimized IC Roll Timing | 13.2% | 0.65 | -34.8% |
| Alpha overlay | IC Cross-Maturity Arbitrage 6× | 22.6% | 1.32 | -20.2% |
| Diversified portfolio | Roll + 0.5× Arb | 26.3% | 1.14 | -27.8% |
| Flagship portfolio | Roll + 1.0× Arb | **39.9%** | **1.46** | **-24.2%** |

The optimized IC roll configuration remains:

`3 factors (ADR removed) + asymmetric hysteresis in10/out5 + deep-discount anchor q=0.15`

Its relative improvement metrics remain separate from absolute portfolio metrics:

- Full-sample improvement vs passive current-month benchmark: +1.30 percentage points.
- OOS improvement: +5.38 percentage points.
- Switches/year: approximately 3.8.

## 3. First-screen information hierarchy

### 3.1 Research thesis remains first

Keep the existing research title and thesis:

> 不预测指数方向，而是预测基差 regime，动态选择当月 / 当季合约，以提高股指期货 Roll Premium。

The supporting sentence should continue to frame the work as source reproduction → execution research → portfolio construction.

### 3.2 Flagship result becomes the visual center

Immediately below the thesis, introduce one dominant flagship block.

Primary visual hierarchy:

- `39.9%` — largest number on the screen.
- `Annualized Return` — direct label.
- `Sharpe 1.46 · Max Drawdown -24.2%` — secondary line.
- `FLAGSHIP PORTFOLIO` — provenance/category label.
- `IC Roll Timing + 1.0× Cross-Maturity Arbitrage` — construction label.

Supporting explanation:

> Beta-bearing Roll Premium strategy + beta-neutral cross-maturity alpha stream.

The block must explicitly call this a **Research Portfolio** or **Flagship Portfolio**. It must never imply that 39.9% is the original paper's return or the optimized roll-timing return.

## 4. Strategy stack directly below the flagship

Directly below the 39.9% flagship block, show three equal-width strategy cards on desktop and a clean vertical stack on mobile.

### Card A — CORE STRATEGY

**Optimized Roll Timing**

- Annualized Return: 13.2%
- Sharpe: 0.65
- Max Drawdown: -34.8%
- Optional supporting line: `3-factor + asym 10/5 + deep-discount anchor q=.15`

### Card B — ALPHA OVERLAY

**Cross-Maturity Arbitrage 6×**

- Annualized Return: 22.6%
- Sharpe: 1.32
- Max Drawdown: -20.2%
- Supporting line: `beta-neutral spread return stream`

### Card C — DIVERSIFIED PORTFOLIO

**Roll + 0.5× Arb**

- Annualized Return: 26.3%
- Sharpe: 1.14
- Max Drawdown: -27.8%
- Supporting line: `intermediate allocation point`

The flagship 39.9% result is intentionally not repeated as a fourth peer card. It remains visually superior to the three supporting cards.

## 5. Paper → Reproduction → Optimization → Portfolio narrative

The existing `Orient Futures / Reproduced / Optimized` three-column block should not remain the dominant first-screen performance display.

Move it below the flagship + strategy stack and retitle/reframe it as a research progression, for example:

`FROM PAPER TO PORTFOLIO`

Suggested sequence:

1. Orient Futures — 13.6% annualized.
2. Independent Reproduction — 12.4% annualized.
3. Optimized Roll Timing — 13.2% annualized.
4. Research Portfolio — 39.9% annualized.

This section explains research evolution rather than competing with the flagship KPI.

Preserve provenance and do not force all four figures into identical semantic categories. The first three are roll-timing strategy variants; the fourth is a portfolio combining roll timing with cross-maturity arbitrage.

## 6. Interactive performance chart

The large interactive chart should align with the new strategy hierarchy.

Primary tabs:

1. `Optimized Roll`
2. `Cross-Maturity Arb`
3. `Flagship Portfolio`

The existing research chart generator already produces a real `组合（IC 滚贴水 + 跨期 1:1）` series from actual optimized roll returns plus the 6× cross-maturity arbitrage return stream. V3.1 must expose that real committed series through the `Flagship Portfolio` tab, trimmed to the same research cutoff as the other charts.

Do **not** add `Roll + 0.5× Arb` as another large chart tab unless a real committed machine-readable series is added by the research pipeline. Its verified summary metrics are sufficient in the strategy stack; no synthetic NAV may be constructed in the website layer.

Existing range controls remain:

- All
- In Sample
- OOS

Existing linked NAV/drawdown behavior, OOS shading, hover tooltip, and dynamic interval metrics remain.

No synthetic time series may be generated to fill missing views.

## 7. Visual language

The first screen should read as a quant research page, not a generic KPI dashboard.

Design principles:

- One dominant number, not four competing headline numbers.
- Strong vertical hierarchy.
- Minimal borders and restrained card chrome.
- Use typography, whitespace, and scale before adding decoration.
- Keep the existing dark research-note aesthetic and accent system.
- Category labels (`CORE STRATEGY`, `ALPHA OVERLAY`, `DIVERSIFIED PORTFOLIO`, `FLAGSHIP PORTFOLIO`) should use compact mono typography.
- The flagship block should look intentional and premium, not like a marketing banner.
- Mobile layout must preserve hierarchy: flagship first, then the three cards, then the paper-to-portfolio progression.

## 8. Data model changes

Extend the V3 research-note data source so portfolio-level metrics are explicit rather than hard-coded into the component.

Recommended shape:

- `hero.flagshipPortfolio`
- `hero.strategyStack[]`
- existing `hero.paper`
- existing `hero.reproduced`
- existing `hero.optimized`
- `charts.portfolio` sourced from the committed real combination chart

The component should render from structured data.

Do not overwrite `hero.optimized.annualizedReturn = 13.2%` with 39.9%. These are different objects and different research layers.

## 9. Provenance and integrity rules

The following distinctions are mandatory:

- 13.6% = paper-reported IC roll-timing full-sample annualized return.
- 12.4% = reproduced IC roll-timing full-sample annualized return.
- 13.2% = optimized IC roll-timing full-sample annualized return.
- 22.6% = IC cross-maturity arbitrage 6× full-sample annualized return.
- 26.3% = Roll + 0.5× Arb portfolio annualized return.
- 39.9% = Roll + 1.0× Arb portfolio annualized return.

Do not mix OOS annualized levels with full-sample annualized levels in the flagship hierarchy.

Do not label the 39.9% result as `Optimized Strategy`; label it `Research Portfolio` / `Flagship Portfolio`.

## 10. Scope boundaries

In scope:

- Redesign of `ResearchNoteHero.astro`.
- Structured portfolio metrics in the V3 data source.
- Reordering/reframing the existing Paper → Reproduction → Optimization comparison.
- Exposing the already-real committed Roll + 1.0× Arb combination series as the `Flagship Portfolio` interactive chart tab.
- Tests covering the new headline, strategy stack, provenance distinctions, and no fabricated series.

Out of scope:

- Changing the underlying quant research results.
- Re-running optimization experiments.
- Adding new strategy variants.
- Rewriting the full research-note narrative below the hero.
- Adding decorative charts without research value.
- Inventing missing NAV series, including a website-generated Roll + 0.5× Arb series.

## 11. Acceptance criteria

The change is complete only if all of the following hold:

1. The largest performance number above the fold is `39.9%`.
2. `39.9%` is labeled as a flagship/research portfolio, not as the optimized roll strategy.
3. `Sharpe 1.46` and `Max Drawdown -24.2%` are visible with the flagship result.
4. Three peer cards immediately below show exactly:
   - Optimized Roll Timing — 13.2 / 0.65 / -34.8.
   - Cross-Maturity Arbitrage 6× — 22.6 / 1.32 / -20.2.
   - Roll + 0.5× Arb — 26.3 / 1.14 / -27.8.
5. The paper/reproduced/optimized comparison remains available but is visually secondary.
6. The page preserves the distinction between strategy improvement (+1.30 pp / +5.38 pp) and absolute portfolio annualized returns.
7. The interactive chart exposes `Optimized Roll`, `Cross-Maturity Arb`, and the real committed `Flagship Portfolio` combination series.
8. No synthetic time series are introduced.
9. Existing mobile responsiveness remains functional.
10. Existing V3 tests remain green after any necessary expectation updates.
11. New tests guard against accidentally replacing the 13.2% optimized roll figure with 39.9%.
12. Astro check/build succeed with no new warnings or hints attributable to V3.1.

## 12. Testing strategy

Add focused source/render tests for:

- Flagship annualized return token `39.9%`.
- Flagship Sharpe `1.46`.
- Flagship max drawdown `-24.2%`.
- Presence of all three supporting strategy labels and metrics.
- `Optimized Roll Timing` still maps to `13.2%`.
- `39.9%` appears in a portfolio context.
- Existing paper/reproduced metrics remain present.
- `charts.portfolio` is sourced from the real committed combination chart rather than synthesized in the component.
- Interactive chart exposes exactly the intended research views backed by real data.

Run:

- repository test suite;
- `astro check`;
- production build;
- static output verification for the target route.

## 13. Expected reader experience

The intended first-glance story is:

> 39.9% annualized / 1.46 Sharpe catches attention → the three cards reveal the component strategy architecture → the reader then sees how the work evolved from paper reproduction to optimization to portfolio construction → the rest of the page supplies the audit trail, falsification work, and research caveats.

This preserves rigor while materially improving the page's visual impact.