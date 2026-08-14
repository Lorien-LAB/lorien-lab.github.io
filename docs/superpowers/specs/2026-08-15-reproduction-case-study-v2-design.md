# Reproduction Case Study V2 Design

## Goal

Redesign the public presentation of `stock-index-futures-roll-basis-timing` from a long generic reproduction record into a reusable **Quant Research Case Study** format, while preserving the existing `/projects/reproductions/<slug>/` information architecture and the underlying `reproductions` content collection.

The first case study is the reproduction of Orient Futures / 东证衍生品研究院's 2026-06-26 report 《股指期货滚贴水择时策略与市场情绪因子》 implemented in:

```text
https://github.com/Lorien-LAB/Index-Timing/tree/master/Reproduction03
```

This redesign must improve research clarity, evidence hierarchy, auditability, and visual presentation without inventing results or hiding deviations.

## Why the Current Page Needs a V2

The current record is technically rich but presents too many layers at equal visual weight:

- source thesis;
- data reconstruction;
- method implementation;
- reproduction evidence;
- known deviations;
- robustness;
- later optimization experiments;
- several large interactive charts.

As a result, a visitor cannot quickly answer the most important questions:

1. What did the original report claim?
2. What was actually reproduced?
3. What did not reproduce exactly?
4. Which numbers are baseline reproduction evidence versus later extensions?
5. Where is the real research code and full technical report?

The V2 page treats the record as a research case study rather than a compressed internal report.

## Design Principle

The page should follow this hierarchy:

```text
Research identity
→ Replication verdict
→ Strategy mechanism
→ Evidence
→ Deviations / limitations
→ Method & validation
→ Beyond Reproduction
→ Selected charts
→ Full artifacts
```

The user should understand the outcome within the first screen or two, while a researcher can continue down the page into the technical evidence.

## Information Architecture

The canonical route remains:

```text
/projects/reproductions/stock-index-futures-roll-basis-timing/
```

Do not create a one-off standalone route.

Instead, extend the existing reproduction detail system so selected reproduction records can opt into a richer **case-study presentation mode**. Reproduction records without case-study metadata continue using the existing generic layout.

This preserves one reproduction system while allowing high-quality flagship records to present richer structured evidence.

## Data Model

Extend the shared reproduction schema with an optional `caseStudy` object. The object is presentation metadata only; it does not replace the existing reproduction fields such as `stage`, `result`, `metrics`, `score`, `resultSummary`, or source metadata.

Proposed structure:

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
  limitations: z.array(z.string()).optional(),
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

Constraints:

- `caseStudy` is optional.
- Existing reproduction records remain valid without it.
- The object contains concise presentation summaries only.
- Empirical numbers in `caseStudy` must already be supported by the source project's documented outputs.
- Do not duplicate large prose sections from the Markdown body into frontmatter.

## Case-Study Header

For case-study records, the detail page should present a shorter research-facing title instead of relying only on the full bilingual source title.

For this record:

```text
股指期货滚贴水择时与市场情绪因子
```

Subtitle:

```text
Reproduction of Orient Futures' 2026 research on basis timing and sentiment signals
```

The full original broker-report title remains available in the source metadata / body and is not lost.

The top section should still show:

- Broker Report;
- research area;
- broker;
- analysts;
- publication date;
- stage;
- result;
- code visibility;
- tags.

The page should not present a dense numeric `resultSummary` sentence as the primary visual summary.

## Replication Verdict

Immediately after research identity, render a reusable verdict grid.

For this case study, the first version should use the following evidence hierarchy:

| Layer | Status | Evidence |
|---|---|---|
| Basis & roll engine | reproduced | IC baseline Sharpe 0.554 vs paper 0.54 |
| Sentiment-factor layer | reproduced | Seven representative factors reproduce the reported correlation directions; the final reproduction report states 6/7 are within 0.01 in magnitude |
| IC multi-factor timing | reproduced | OOS optimization +2.0% vs paper +2.6%; P/L 1.11 vs 1.12; annual switches 4.6 vs 4.5 |
| IC cross-maturity arbitrage | reproduced | OOS improvement +20.7% vs paper +25.2% in the final baseline reproduction report |
| IM timing | partial | OOS improvement +0.7% vs paper +1.5%; switching frequency remains materially higher |
| Exact Figure-53 strategy selection | partial | Only a subset is an exact strategy-selection match because several method definitions / selection details are not fully disclosed |

The verdict grid is an interpretation of documented evidence, not a new scoring system.

Do not automatically derive these statuses from numeric thresholds.

## Strategy in 30 Seconds

Render a compact mechanism strip or flow diagram using semantic HTML and CSS, not a raster infographic.

Approved conceptual flow:

```text
Market sentiment factors
→ Forecast direction of current-quarter annualized basis
→ Basis expected to rise: hold current-quarter contract
→ Basis expected to fall: hold current-month contract
→ Compare with passive current-month roll benchmark
```

The purpose is to make clear that this is **basis-term-structure timing**, not directional equity-index timing.

## Evidence Architecture

The case study should have three evidence layers.

### 1. Factor replication

Use a compact table or evidence panel for the seven representative factors documented by `Reproduction03/doc/reproduction_report.md` and `paper_notes.md`.

The first version should include:

| Factor | Paper rho | Reproduced rho |
|---|---:|---:|
| IC annualized volatility | -0.35 | -0.356 |
| IC amplitude | -0.34 | -0.341 |
| IC constituent ADR | +0.15 | +0.142 |
| IC constituent return dispersion | -0.30 | -0.302 |
| IM annualized volatility | -0.59 | -0.594 |
| IM constituent return dispersion | -0.19 | -0.153 |
| IM VIX | -0.59 | -0.596 |

Do not describe IM dispersion as an exact magnitude match.

### 2. Strategy replication

Use only headline metrics that are both decision-relevant and clearly traceable to the final baseline reproduction report.

Primary IC metrics:

```text
OOS optimization: paper +2.6% → reproduced +2.0%
P/L ratio:         paper 1.12  → reproduced 1.11
Switches/year:     paper 4.5   → reproduced 4.6
```

Primary IC cross-maturity metric:

```text
OOS optimization: paper +25.2% → reproduced +20.7%
```

Do not overload the main page with every Sharpe / Calmar / Sortino metric available in the internal report.

### 3. Reproduction score

Keep the existing six-dimensional score panel as a secondary audit aid.

It must remain visually subordinate to the evidence above and must not be presented as the reason for the reproduction verdict.

## Evidence Source Policy

The webpage must not silently reconcile conflicting values from different experiment reports.

For baseline reproduction headline metrics, use the final reproduction baseline documented in:

```text
Index-Timing/Reproduction03/doc/reproduction_report.md
Index-Timing/Reproduction03/doc/multifactor_backtest_report.md
```

For extension metrics, use explicitly labeled optimization experiments from:

```text
Index-Timing/Reproduction03/doc/optimization_report.md
```

If the same metric differs across documents because different configurations or experiment definitions were used, do one of the following:

1. label the configuration explicitly; or
2. omit the disputed metric from the public headline.

Do not average, select the prettier number, or present multiple experimental baselines as if they are identical.

In particular, the V2 headline should avoid disputed full-sample IC cross-maturity baseline values and should use the stable, clearly reported OOS baseline comparison instead.

## What Did Not Reproduce Exactly

Create a visually explicit section before robustness and extensions.

The section should include at least:

### Figure 53 strategy selection

The exact retained TA-strategy list is only partially reproduced. The source does not fully disclose all implementation details for methods such as MESA / Hilbert / Kaufman and the exact selection behavior is sensitive to these definitions.

### IM timing

The IM side is weaker than the source benchmark, with OOS improvement around +0.7% versus +1.5% in the report and materially higher switching frequency in the reproduction.

### Price-index versus total-return basis

The reproduction uses a price-index basis while the report's absolute excess-return comparison is based on a total-return index. This affects the absolute roll-excess level through dividends but does not change the timing-vs-benchmark optimization comparison in the same way.

This section must be prominent. It is a research-integrity feature, not a footnote.

## Method and Validation

The long Markdown body should be rewritten for the public site.

It should retain the technical substance but reduce internal implementation narration.

Recommended public body structure:

```text
## Research question
## Original mechanism
## Reproduction design
## Data reconstruction
## Method reconstruction
## Validation protocol
## Evidence
## What did not reproduce exactly
## Beyond reproduction
## Research conclusion
```

Detailed debugging history, issue numbers, local filesystem paths, and implementation archaeology should stay in the source repository rather than dominate the public case study.

Validation should preserve important evidence:

- T-day signal → T+1 position;
- point-in-time constituent membership;
- roll-anchor audit;
- benchmark definition;
- no transaction costs because the source report also excludes them.

## Beyond Reproduction

Extensions must be separated from baseline reproduction by a strong visual and semantic boundary.

Section label:

```text
Beyond Reproduction
```

Subtitle should make explicit that these are Lorien Lab research extensions developed after reconstructing the original framework.

The flagship extension is:

```text
IC factor subset + aggregate asymmetric hysteresis
enter current-quarter after 10 confirmed days
exit current-quarter after 5 confirmed days
```

Approved headline extension table:

| Metric | Paper | Baseline reproduction | Extension |
|---|---:|---:|---:|
| Full-sample timing improvement | +1.1% | +0.50% | +1.32% |
| OOS timing improvement | +2.6% | +1.96% | +4.10% |
| Switches/year | 4.5 | approximately 4.6 baseline | approximately 4.5 extension |

The section should explain the mechanism:

- sentiment factors are slow regime variables;
- short-lived TA flips can be noise;
- aggregate confirmation filters transient flips;
- the improvement is not explained by higher turnover.

Caution must be displayed next to the extension, not buried at the bottom:

```text
The reported OOS extension window is short (approximately 2025-10 through 2026-06). Treat the headline OOS uplift as provisional; full-sample decomposition, parameter sensitivity, and rolling validation are more informative.
```

Do not use later extension results to justify the baseline reproduction verdict.

## Charts

The current page renders several large charts with equal visual weight. V2 should move to a smaller set of question-driven charts.

Target maximum: **three chart blocks**.

Preferred research questions:

1. **Replication · IC roll timing** — Does timing improve the passive current-month roll benchmark?
2. **Replication · IC cross-maturity arbitrage** — Does the source's cross-maturity effect survive reproduction?
3. **Extension · baseline versus hysteresis** — What changes after the Lorien Lab execution-layer extension?

Implementation rules:

- Only use series backed by actual stored reproduction run data.
- Reuse existing real chart data where it exactly matches the intended configuration.
- If an existing chart series is an extension or a different configuration, label it explicitly instead of implying it is the paper baseline.
- If the current JSON does not contain a defensible baseline-vs-extension pair, omit the third chart rather than fabricate or infer data.
- Charts should support light/dark themes, responsive layout, accessible titles, and keyboard-safe/nonessential interactions.
- Chart UI should become reusable and not be hard-coded to one slug where practical.

## Artifact Links

The public page should point to the actual source-of-truth research project supplied by the user:

```text
https://github.com/Lorien-LAB/Index-Timing/tree/master/Reproduction03
```

Set the primary `codeUrl` to that location.

Where the current schema supports them, add real links to:

```text
Configuration  → Index-Timing/Reproduction03/configs/repro03.yaml
Results        → Index-Timing/Reproduction03/doc/reproduction_report.md
```

If a stable direct GitHub URL exists for the optimization report, it may be linked from the body as the extension study.

The separate `quant-research-reproductions` project may remain as a publication mirror, but it should not be presented as the primary source of truth for this record if `Index-Timing/Reproduction03` contains the actual research lineage.

Do not add a Source button unless a valid public source URL is known. Do not create a dead placeholder.

## Reusable Components

Prefer several small components over one large bespoke page component.

Proposed responsibilities:

### `ReproductionCaseStudyHeader.astro`

Consumes reproduction entry + `caseStudy` metadata and renders the short title, subtitle, source identity, current research status, and high-level metadata.

### `ReproductionVerdictGrid.astro`

Consumes `caseStudy.verdicts` and renders the evidence-status matrix.

### `ReproductionStrategyFlow.astro`

Consumes `caseStudy.strategyFlow` and renders the compact strategy mechanism.

### `ReproductionExtensionPanel.astro`

Consumes the optional extension metadata and clearly separates Lorien Lab research from source reproduction.

### `ReproductionCharts.astro`

Refactor the existing component toward reusable chart rendering. Data-selection logic may remain in a small registry if necessary, but rendering should not depend on a single hard-coded page structure.

The generic reproduction page should compose these components only when `entry.data.caseStudy` exists.

## Existing Generic Reproduction Records

Backward compatibility is required.

If a reproduction record has no `caseStudy` metadata:

- use the current generic record header;
- render the existing Markdown body;
- render the existing metrics and score panel;
- do not require any new fields.

The V2 feature must therefore be additive rather than a forced migration of every reproduction.

## Visual Language

The case study should remain consistent with Lorien Lab:

- dark/light theme support;
- research-terminal / academic visual language;
- restrained accent use;
- monospaced micro-labels;
- high-density evidence where useful;
- no glossy marketing-dashboard aesthetic;
- no large decorative KPI cards detached from research context.

Verdict statuses should use text plus restrained visual treatment, not color alone.

Suggested labels:

```text
REPRODUCED
PARTIAL
NOT REPRODUCED
EXTENSION
```

## Content Rewrite Rules

The public Markdown should be rewritten, not merely shortened mechanically.

Keep:

- source thesis;
- basis-timing mechanism;
- data substitutions;
- method decisions that materially affect reproduction;
- validation controls;
- core evidence;
- explicit deviations;
- extension mechanism and caution.

Move out of the main narrative:

- local Windows paths;
- issue-number archaeology;
- internal script-by-script inventory unless required for reproducibility;
- exhaustive secondary metrics;
- repeated numeric summaries already visible in structured evidence panels.

The page should link to the source repository for the full technical audit trail.

## Research Integrity Rules

Do not:

- invent missing source URLs;
- link the private/original PDF as if it were an official public source;
- hide the weaker IM result;
- label Figure 53 as fully reproduced;
- merge extension performance into baseline reproduction metrics;
- use the best optimization experiment as the reproduction baseline;
- claim transaction-cost robustness when costs were not tested;
- treat the short OOS extension window as strong standalone proof;
- alter score values merely to improve presentation.

## Testing Strategy

Use TDD.

### RED

Add focused tests that fail against the current implementation because:

- the reproduction schema has no optional case-study presentation model;
- the case-study components do not exist;
- the target record still uses the long source title as the sole page title;
- the primary code link still points to the publication mirror rather than `Index-Timing/Reproduction03`;
- the target record does not expose structured verdict/strategy-flow/extension metadata;
- the detail page does not conditionally compose reusable case-study sections.

### GREEN

Tests should verify:

1. the target record remains `sourceType: broker` and keeps the same canonical slug;
2. optional `caseStudy` schema exists and is not required for other records;
3. the target record provides the approved short title and subtitle;
4. verdict metadata contains both reproduced and partial layers;
5. Figure-53 and IM limitations remain explicit;
6. strategy flow describes basis-direction → contract choice → benchmark;
7. extension metadata is semantically separate from baseline metrics;
8. OOS extension caution is visible;
9. `codeUrl` points to `Index-Timing/Reproduction03`;
10. configuration/results links, if added, are real GitHub URLs;
11. generic reproduction records without `caseStudy` still render;
12. selected charts only use stored real chart data;
13. `npm test`, `npm run check`, and `npm run build` pass.

## Non-Goals

This V2 does not:

- rerun the research code;
- change the underlying reproduction result solely for visual reasons;
- rewrite `Index-Timing/Reproduction03` research outputs;
- invent an official broker source URL;
- publish the original PDF;
- create a new reproduction URL namespace;
- move the reproduction out of Projects;
- redesign the entire Lorien Lab website;
- force every reproduction record into case-study mode.

## Acceptance Criteria

The V2 is complete when a visitor can answer within roughly 10–20 seconds:

- what the report studied;
- how the strategy works;
- what was reproduced;
- what only partially reproduced;
- the most important paper-vs-reproduction evidence;
- where the real research code lives.

A deeper reader must also be able to distinguish:

- original source claims;
- baseline reproduction results;
- known methodological deviations;
- later Lorien Lab extensions;
- uncertainty around the short extension OOS window.

The final page should read as an auditable quantitative-research case study, not as a strategy-marketing page or a pasted internal Markdown report.
