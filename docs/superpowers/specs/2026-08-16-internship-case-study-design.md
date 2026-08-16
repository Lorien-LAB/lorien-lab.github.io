# Sanitized Internship Case Study Design

## Goal
Add a first-class public case study for the 2026 systematic futures calendar-spread internship project, while preserving confidentiality around the core alpha logic and implementation details. Keep the CV concise and link it to the public case study.

## Positioning
- Public title: **Systematic Futures Calendar-Spread Research — Internship Case Study**.
- Public status: **Internship Research**.
- The project belongs in the existing `projects` collection and appears inside the unified `/research-projects/` portfolio.
- It should be visually and structurally consistent with the existing technical project case studies rather than becoming a separate microsite.
- No employer name is introduced because the current public CV does not name one.

## Public research object
The case study may disclose that the work studies same-underlying futures calendar spreads using a daily main/secondary-contract research object and a systematic, time-aware research pipeline.

The public page may explain:
- why calendar spreads are economically different from outright futures exposure;
- how contract-state quality, liquidity, delivery proximity, and roll transitions affect research validity;
- that term-structure information, mean-reversion behavior, volatility/state information, convergence diagnostics, trading frictions, and risk controls are treated as separate research layers;
- that contract identities and research states are frozen using information available before execution, so validation does not use future contract selection;
- that evaluation is rolling / Walk-Forward rather than a single global in-sample optimization;
- failure modes, robustness checks, implementation discipline, and research lessons.

The public text should refer to the spread generically as the **main/secondary calendar-spread research object**. It must not publish the exact orientation formula or normalization formula.

## Confidentiality boundary
The public case study MUST NOT disclose any detail that would allow a reader to reconstruct the production research logic with high fidelity.

### Do not publish
- exact spread orientation formula or normalization formula;
- exact signal equations or transformation formulas;
- feature definitions that reveal proprietary construction logic;
- lookback windows, thresholds, gates, weights, coefficients, or parameter grids;
- model architecture or forecasting implementation details that reveal the core edge;
- exact convergence-space or state-estimation formulas;
- entry/exit trigger conditions;
- signal-to-position mapping, leverage mapping, or sizing functions;
- instrument-level rules, whitelists/blacklists, product-specific overrides, or per-market parameterization;
- exact roll-confirmation, liquidity, volume, open-interest, delivery-proximity, or tradability thresholds;
- internal datasets, internal filenames, code structure, private repositories, or employer infrastructure;
- pseudo-code that materially reconstructs the strategy;
- per-instrument performance tables or parameter surfaces that expose where the strategy works best.

### Safe to publish
- research motivation and economic framing;
- conceptual pipeline stages;
- broad categories of inputs and controls;
- no-lookahead / next-session execution discipline at a conceptual level;
- Walk-Forward and robustness methodology;
- qualitative failure modes and ablation philosophy;
- aggregate metrics that are already public on the CV;
- the public transaction-cost assumption already present on the CV;
- a clear confidentiality notice explaining that selected implementation details are intentionally omitted.

## Public metrics
Retain only the aggregate figures already published in the CV:
- evaluation period: **2023–2026 rolling test window**;
- transaction-cost assumption: **2 bp per leg per side**;
- recorded Sharpe ratio: **2.40**;
- recorded maximum drawdown: **5.28%**.

Do not add annual return, win rate, turnover, per-market Sharpe, capacity, hit rate, parameter sensitivity statistics, or any other numerical result unless it is separately verified and intentionally approved for public disclosure.

The metrics must be framed as historical backtest records, not expected future performance.

## Case-study narrative
The page should use the following sequence.

### 1. Research mandate
Explain the practical research question: how to build a robust systematic calendar-spread research process when contract identity, liquidity, roll transitions, and term structure are themselves part of the problem.

### 2. Why this is not a simple two-price spread
Explain that a futures spread research object depends on contract selection, temporal availability, lifecycle state, execution timing, and trading frictions. Emphasize research hygiene rather than proprietary rules.

### 3. Research architecture
Show a conceptual pipeline such as:

`Daily futures data → Contract-state layer → Calendar-spread research object → Market-state features → Candidate signal layer → Tradability & risk controls → Next-session execution model → Cost-aware P&L → Walk-Forward diagnostics`

This pipeline is intentionally conceptual and must not contain equations or tunable values.

### 4. Contract-state and tradability layer
Discuss open interest, volume/liquidity, delivery proximity, and roll transitions only as categories. Explain why unstable contract states can invalidate backtests. Do not disclose thresholds or selection logic.

### 5. Signal architecture — sanitized
Explain the strategy as a multi-stage research system combining broad term-structure, mean-reversion, volatility/state, and convergence information. State explicitly that formulas, transformations, thresholds, weights, and state-transition rules are withheld.

### 6. Temporal integrity and execution
Explain the no-lookahead principle: decisions use information available at decision time, contract identities are not retroactively replaced using future information, and simulated execution occurs at the next eligible session under a consistent convention. Avoid implementation-level timing code.

### 7. Risk and transaction-cost layer
Explain that exposure is gated by tradability, state quality, transaction costs, and portfolio/risk controls. Do not publish the exact cost gate, position cap, sizing rule, or risk budget.

### 8. Walk-Forward validation
Describe rolling out-of-sample evaluation, stability checks across time and markets, cost sensitivity, delayed execution checks, ablations, and failure analysis. Emphasize rejection of isolated historical optima.

### 9. Public result summary
Present the four approved public facts above in a compact metric block plus a note that historical backtests do not imply future returns.

### 10. Failure modes and lessons
Discuss roll transitions, liquidity deterioration, structural trend vs. temporary dislocation, regime shifts, cost sensitivity, and overfitting risk at a qualitative level.

### 11. What is intentionally omitted
Add a visible confidentiality panel stating that signal formulas, feature engineering details, parameterization, thresholds, instrument-specific rules, and execution/sizing logic are omitted from the public version.

### 12. Contribution / engineering value
Highlight the end-to-end research workflow, temporal alignment, reproducible validation, experiment discipline, diagnostics, and ability to translate a trading hypothesis into a research system.

## CV integration
Keep the current Internship Experience entry concise. Add a bilingual link after the summary:
- English: `View sanitized public case study →`
- Chinese: `查看脱敏后的公开案例 →`

The CV should not duplicate the full case study.

## Portfolio integration
- Add a project record with a stable slug such as `systematic-futures-calendar-spread-internship`.
- Mark it `featured: true` so it can surface on the homepage.
- Add a Chinese card title/description/status in `src/data/i18n/publicContentZh.ts`.
- Classify the project with the strategy-research group in `/research-projects/` rather than leaving it under generic additional projects.
- Do not add a public repository or documentation URL because the implementation is private.

## Date handling
The public internship period is **May–Jul 2026**. Do not invent an exact completion day. If the existing project schema/layout requires a single Date for sorting, add an optional public `period` label to the project schema/layout and use the date field only as an internal sort key. The rendered page should show `May–Jul 2026`, not a fabricated day.

## Bilingual behavior
- Portfolio card and CV link must support the existing English/Chinese toggle.
- The detailed technical narrative may follow the current project-detail convention (English long-form content) unless a broader bilingual detail-page architecture is introduced separately. Do not create a one-off translation system solely for this page.

## Testing
Add regression tests that verify:
- the new project record exists and renders through the standard project case-study route;
- its status/featured fields and public metrics match the approved public facts;
- the public text contains an explicit confidentiality notice;
- the public text does not contain banned reconstruction details such as exact formulas, parameter grids, private repository links, or instrument-specific rules;
- the CV links to the sanitized case study;
- the project is classified in the strategy-research section;
- the Chinese card presentation exists;
- the rendered public period is `May–Jul 2026` rather than an invented exact day;
- the full test suite, `astro check`, and static build pass before merge.

## Scope boundaries
- Do not modify Knowledge content or routes.
- Do not expose private internship code or files.
- Do not add unverified performance statistics.
- Do not materially change unrelated project case studies.
