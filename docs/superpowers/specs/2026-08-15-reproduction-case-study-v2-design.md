# Reproduction Case Study V2 Design

## Goal

Redesign the public presentation of `stock-index-futures-roll-basis-timing` into a reusable **Quant Research Case Study** format while preserving the existing reproduction system and canonical route:

```text
/projects/reproductions/stock-index-futures-roll-basis-timing/
```

The first case study is the reproduction of Orient Futures / 东证衍生品研究院's 2026-06-26 report 《股指期货滚贴水择时策略与市场情绪因子》. The real research source of truth supplied by the user is:

```text
https://github.com/Lorien-LAB/Index-Timing/tree/master/Reproduction03
```

The redesign must improve clarity, auditability, and visual hierarchy without inventing results, hiding deviations, or presenting later optimization experiments as if they were part of the original reproduction.

---

## Problem With the Current Page

The current page is technically rich but gives similar visual weight to:

- source thesis;
- data reconstruction;
- method implementation;
- reproduction evidence;
- deviations;
- robustness;
- later optimization experiments;
- several large interactive charts.

A visitor therefore has to read too much before learning the most important facts:

1. What did the report claim?
2. What reproduced successfully?
3. What reproduced only partially?
4. Which numbers are baseline reproduction evidence?
5. Which numbers belong to later Lorien Lab extensions?
6. Where is the actual research code and full audit trail?

The V2 page should answer those questions before the long-form technical narrative.

---

## Page Hierarchy

The case study should follow this order:

```text
Research identity
→ Replication verdict
→ Strategy in 30 seconds
→ Factor evidence
→ Strategy evidence
→ What did not reproduce exactly
→ Method & validation narrative
→ Beyond Reproduction
→ Selected charts
→ Score & artifacts
```

The first 10–20 seconds should communicate the research object, mechanism, verdict, and core evidence. Deeper readers can continue into the methodology and audit trail.

---

## Architecture

Do not create a one-off route.

Extend the existing reproduction detail system so a reproduction record may optionally opt into a richer case-study presentation mode. Records without case-study metadata continue to use the existing generic reproduction layout.

This is an additive enhancement to the existing `/projects/reproductions/<slug>/` system.

---

## Optional Case-Study Schema

Extend the shared reproduction schema with an optional `caseStudy` object.

```ts
caseStudy: z.object({
  shortTitle: z.string(),
  subtitle: z.string().optional(),

  verdicts: z.array(z.object({
    label: z.string(),
    status: z.enum(['reproduced', 'partial', 'not-reproduced', 'extension']),
    evidence: z.string(),
  })),

  strategyFlow: z.array(z.string()).optional(),

  factorEvidence: z.array(z.object({
    label: z.string(),
    original: z.string(),
    reproduced: z.string(),
    assessment: z.string().optional(),
  })).optional(),

  limitations: z.array(z.object({
    title: z.string(),
    detail: z.string(),
  })).optional(),

  extension: z.object({
    title: z.string(),
    thesis: z.string(),
    metrics: z.array(z.object({
      label: z.string(),
      paper: z.string().optional(),
      baseline: z.string().optional(),
      extension: z.string(),
    })).default([]),
    caution: z.string().optional(),
  }).optional(),
}).optional()
```

Rules:

- `caseStudy` is optional.
- Existing reproduction records remain valid without it.
- Existing fields such as `stage`, `result`, `metrics`, `score`, `resultSummary`, source metadata, and artifact links remain authoritative.
- `caseStudy` contains concise presentation metadata only.
- Every empirical number in `caseStudy` must already exist in documented research output.
- Large prose and implementation history stay in the Markdown body or source repository, not frontmatter.

---

## Case-Study Header

For this record, show a shorter research-facing title:

```text
股指期货滚贴水择时与市场情绪因子
```

Subtitle:

```text
Reproduction of Orient Futures' 2026 research on basis timing and sentiment signals
```

The full broker-report title remains in the reproduction record and source metadata.

The header should still expose:

- source type;
- research area;
- broker;
- analysts;
- publication date;
- stage;
- result;
- code visibility;
- tags.

Do not use the current long numeric `resultSummary` as the main visual summary.

---

## Replication Verdict

Render a reusable verdict grid immediately after the research identity.

For this case study, use the following documented hierarchy:

| Layer | Status | Evidence |
|---|---|---|
| Basis & roll engine | reproduced | IC baseline Sharpe 0.554 vs paper 0.54 |
| Sentiment-factor layer | reproduced | Seven representative factors reproduce the reported directions; the final reproduction report states 6/7 are within 0.01 in magnitude |
| IC multi-factor timing | reproduced | OOS optimization +2.0% vs paper +2.6%; P/L 1.11 vs 1.12; annual switches 4.6 vs 4.5 |
| IC cross-maturity arbitrage | reproduced | OOS improvement +20.7% vs paper +25.2% in the final baseline reproduction report |
| IM timing | partial | OOS improvement +0.7% vs paper +1.5%; switching remains materially more frequent |
| Exact Figure-53 strategy selection | partial | Only a subset is an exact strategy-selection match because several method definitions and selection details are not fully disclosed |

These statuses are curated research judgments supported by evidence. Do not derive them automatically from numeric thresholds.

---

## Strategy in 30 Seconds

Render a compact semantic flow, not a decorative raster infographic:

```text
Market sentiment factors
→ Forecast direction of current-quarter annualized basis
→ Expected basis rise: hold current-quarter contract
→ Expected basis fall: hold current-month contract
→ Compare with passive current-month roll benchmark
```

The section must make clear that this is **basis-term-structure timing**, not directional equity-index timing.

---

## Factor Evidence

Render the seven representative factor comparisons as a structured evidence table.

Approved first-version values from the final reproduction report:

| Factor | Paper rho | Reproduced rho |
|---|---:|---:|
| IC annualized volatility | -0.35 | -0.356 |
| IC amplitude | -0.34 | -0.341 |
| IC constituent ADR | +0.15 | +0.142 |
| IC constituent return dispersion | -0.30 | -0.302 |
| IM annualized volatility | -0.59 | -0.594 |
| IM constituent return dispersion | -0.19 | -0.153 |
| IM VIX | -0.59 | -0.596 |

Do not call IM dispersion an exact magnitude match.

This evidence belongs in structured page UI, not buried midway through Markdown.

---

## Strategy Evidence

Use the existing reproduction `metrics` panel for primary strategy-level paper-vs-reproduction comparisons, but reduce it to the most decision-relevant baseline metrics.

Primary IC timing metrics:

```text
OOS optimization: paper +2.6% → reproduced +2.0%
P/L ratio:         paper 1.12  → reproduced 1.11
Switches/year:     paper 4.5   → reproduced 4.6
```

Primary IC cross-maturity metric:

```text
OOS optimization: paper +25.2% → reproduced +20.7%
```

Do not fill the public summary with every Sharpe / Calmar / Sortino number available in internal reports.

The existing six-dimensional `ReproductionScore` remains visible later as a secondary audit aid; it must not visually outrank the actual empirical evidence.

---

## Evidence Source Policy

Do not silently reconcile conflicting values across research documents.

Baseline reproduction headline metrics should come from the final baseline reproduction materials:

```text
Index-Timing/Reproduction03/doc/reproduction_report.md
Index-Timing/Reproduction03/doc/multifactor_backtest_report.md
```

Later optimization experiments belong to:

```text
Index-Timing/Reproduction03/doc/optimization_report.md
```

If the same named metric differs across documents because the configuration or experiment definition differs:

1. label the configuration explicitly; or
2. omit that metric from the public headline.

Never average conflicting numbers, select the prettier number, or present multiple experimental baselines as if they were identical.

For this reason, the V2 headline should avoid disputed full-sample IC cross-maturity baseline values and use the clearly documented OOS baseline comparison instead.

---

## What Did Not Reproduce Exactly

This must be a visually explicit research-integrity section, not a footnote.

### Figure 53 strategy selection

The exact retained TA-strategy list is only partially reproduced. The source does not fully disclose all implementation details for methods such as MESA / Hilbert / Kaufman, and strategy selection is sensitive to those definitions.

### IM timing

The IM side is weaker than the source benchmark: OOS improvement is around +0.7% versus +1.5%, and switching is materially more frequent.

### Price-index versus total-return basis

The reproduction uses a price-index basis while the report's absolute excess comparison is based on a total-return index. This changes absolute roll-excess levels through dividends. The timing-vs-benchmark optimization comparison is much less affected because the common index component cancels in the relative comparison.

---

## Public Markdown Rewrite

The Markdown body should be rewritten for a public research case study.

Because verdicts, factor evidence, strategy metrics, limitations, and the flagship extension are rendered as structured components, the Markdown body must **not repeat those sections in full**.

Recommended body structure:

```text
## Research question
## Original mechanism
## Reproduction design
## Data reconstruction
## Method reconstruction
## Validation protocol
## Research conclusion
```

The body should retain technical substance while removing internal implementation narration that belongs in the source repository.

Keep:

- the research question;
- basis-timing mechanism;
- relevant data substitutions;
- contract ladder / roll decisions that affect interpretation;
- signal timing;
- point-in-time membership treatment;
- benchmark definition;
- transaction-cost assumption;
- the final research conclusion.

Move out of the main narrative:

- local Windows paths;
- issue-number archaeology;
- script-by-script inventory unless required for understanding;
- exhaustive secondary metrics;
- repeated numerical summaries already shown in structured evidence panels.

The source repository remains the full technical audit trail.

---

## Validation Evidence to Preserve

The public narrative must retain these important controls:

- T-day signal → T+1 position;
- point-in-time constituent membership;
- roll-anchor audit;
- benchmark = passive current-month rolling for the timing strategy;
- arbitrage benchmark definition where discussed;
- no transaction costs because the source report also excludes transaction costs.

Do not claim transaction-cost robustness.

---

## Beyond Reproduction

Extensions must be visually and semantically separated from the source reproduction.

Section label:

```text
Beyond Reproduction
```

Subtitle should make explicit that these are Lorien Lab extensions developed after reconstructing the original framework.

The flagship extension is:

```text
IC factor subset + aggregate asymmetric hysteresis
enter current-quarter after 10 confirmed days
exit current-quarter after 5 confirmed days
```

Approved extension comparison:

| Metric | Paper | Baseline reproduction | Extension |
|---|---:|---:|---:|
| Full-sample timing improvement | +1.1% | +0.50% | +1.32% |
| OOS timing improvement | +2.6% | +1.96% | +4.10% |
| Switches/year | 4.5 | about 4.6 baseline | about 4.5 extension |

Mechanism explanation:

- sentiment factors are slow regime variables;
- short-lived TA flips can be noise;
- aggregate confirmation filters transient flips;
- the improvement is not explained by higher turnover.

The extension panel must include this caution prominently:

```text
The reported OOS extension window is short (approximately 2025-10 through 2026-06). Treat the headline OOS uplift as provisional; full-sample decomposition, parameter sensitivity, and rolling validation are more informative.
```

Do not use extension performance to justify the baseline reproduction verdict.

---

## Charts

The current page renders too many large chart blocks with equal visual weight. V2 should show a maximum of three question-driven charts.

Preferred questions:

1. **Replication · IC roll timing** — Does timing improve the passive current-month roll benchmark?
2. **Replication · IC cross-maturity arbitrage** — Does the source's cross-maturity effect survive reproduction?
3. **Extension · baseline versus hysteresis** — What changes after the execution-layer extension?

Rules:

- Only use stored series backed by real runs.
- Reuse existing chart data only when the configuration exactly matches the label shown to the user.
- If an existing series is an optimized extension, label it as an extension instead of implying it is the paper baseline.
- If no defensible baseline-vs-extension pair exists in the current JSON, omit the third chart rather than fabricate or infer it.
- Support light/dark themes and responsive layouts.
- Provide accessible chart titles and explanatory text.
- Interactions are optional enhancements; the page must remain understandable without hover.
- Refactor chart rendering toward reusable inputs instead of a single slug-specific hard-coded presentation.

---

## Artifact Links

The primary `codeUrl` for this record should point to the actual research project:

```text
https://github.com/Lorien-LAB/Index-Timing/tree/master/Reproduction03
```

Where supported by the current schema, add real direct links for:

```text
Configuration → Index-Timing/Reproduction03/configs/repro03.yaml
Results       → Index-Timing/Reproduction03/doc/reproduction_report.md
```

The optimization report may be linked from the Beyond Reproduction copy if a stable GitHub URL is used.

The `quant-research-reproductions` repository may remain a publication mirror, but it should not be presented as the primary source of truth for this record.

Do not add an official Source button unless a valid public official source URL is known. Do not create a dead placeholder, and do not expose the repository's stored PDF as if it were an official public source page.

---

## Reusable Components

Prefer several focused components over one large bespoke page.

### `ReproductionCaseStudyHeader.astro`

Renders short title, subtitle, source identity, status, and high-level metadata.

### `ReproductionVerdictGrid.astro`

Renders the structured replication verdicts.

### `ReproductionStrategyFlow.astro`

Renders the basis-direction → contract-choice mechanism.

### `ReproductionEvidenceTable.astro`

Renders reusable paper-vs-reproduction evidence rows such as the seven factor correlations.

### `ReproductionLimitations.astro`

Renders the explicit “what did not reproduce exactly” section.

### `ReproductionExtensionPanel.astro`

Renders the optional Beyond Reproduction research extension with its caveat.

### `ReproductionCharts.astro`

Refactor the current component toward reusable chart rendering. A small slug-to-data registry is acceptable if needed, but the visual component itself should not be designed solely around this one record.

The detail route composes these only when `entry.data.caseStudy` exists.

---

## Generic Reproduction Backward Compatibility

If a reproduction has no `caseStudy` metadata:

- preserve the current generic header;
- render its Markdown body;
- render existing metrics / score / artifacts;
- do not require any new fields.

No bulk migration is required.

---

## Visual Language

Stay within the Lorien Lab design system:

- light/dark theme support;
- academic / research-terminal visual language;
- monospaced micro-labels;
- restrained accent use;
- evidence-dense but readable layout;
- no glossy marketing-dashboard treatment;
- no oversized decorative KPI cards detached from research context.

Verdict status must use text, not color alone.

Approved labels:

```text
REPRODUCED
PARTIAL
NOT REPRODUCED
EXTENSION
```

---

## Research Integrity Rules

Do not:

- invent an official source URL;
- present the repository PDF as an official public source page;
- hide the weaker IM result;
- describe Figure 53 as fully reproduced;
- merge extension metrics into baseline reproduction metrics;
- use the best optimization experiment as the baseline reproduction;
- claim transaction-cost robustness;
- treat the short extension OOS window as strong standalone proof;
- change the existing six-dimensional score merely for appearance;
- rewrite research outputs in `Index-Timing/Reproduction03` as part of this UI task.

---

## TDD Strategy

### RED

Add focused tests that fail against the current implementation because:

- there is no optional case-study schema;
- reusable case-study components do not exist;
- the target record has no structured verdict / flow / factor-evidence / extension metadata;
- the primary code link still points to the publication mirror;
- the detail page does not conditionally compose case-study sections.

### GREEN

Tests must verify:

1. the target record keeps the same canonical slug and `sourceType: broker`;
2. `caseStudy` is optional in the schema;
3. generic reproduction records remain valid without it;
4. the approved short title and subtitle exist;
5. verdict metadata contains both `reproduced` and `partial` statuses;
6. Figure-53 and IM limitations remain explicit;
7. strategy flow expresses sentiment → basis direction → contract choice → passive benchmark;
8. all seven approved factor-evidence rows are present;
9. extension metadata is separate from baseline `metrics`;
10. the short-OOS caution is visible;
11. `codeUrl` points to `Index-Timing/Reproduction03`;
12. configuration/results links, if present, are real GitHub URLs;
13. selected charts only use stored real data;
14. `npm test`, `npm run check`, and `npm run build` pass.

---

## Non-Goals

This V2 does not:

- rerun the research code;
- change the reproduction result for visual reasons;
- rewrite `Index-Timing/Reproduction03` research artifacts;
- publish the original PDF;
- create a new reproduction URL namespace;
- move reproductions out of Projects;
- redesign the entire Lorien Lab site;
- force every reproduction into case-study mode.

---

## Acceptance Criteria

The redesign is complete when a visitor can quickly identify:

- what the report studied;
- how the strategy works;
- what reproduced successfully;
- what reproduced only partially;
- the most important paper-vs-reproduction evidence;
- where the actual research project lives.

A deeper reader must also be able to distinguish clearly between:

- original source claims;
- baseline reproduction results;
- methodological deviations;
- later Lorien Lab extensions;
- uncertainty from the short extension OOS window.

The final result should read as an auditable quantitative-research case study, not as a strategy-marketing page or a pasted internal Markdown report.
