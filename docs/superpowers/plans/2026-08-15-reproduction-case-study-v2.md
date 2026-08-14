# Reproduction Case Study V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `stock-index-futures-roll-basis-timing` into a reusable Quant Research Case Study that communicates replication verdict, factor evidence, strategy mechanism, deviations, selected charts, and post-reproduction extensions clearly without breaking generic reproduction records.

**Architecture:** Add an optional `caseStudy` presentation object to the existing reproduction schema. The generic detail route will conditionally compose small reusable case-study components when that object exists; records without it stay on the current generic layout. Reproduction03 remains one canonical reproduction record and one canonical URL; baseline evidence and later optimization evidence remain semantically separate.

**Tech Stack:** Astro 5, Astro content collections, TypeScript/Astro components, Markdown, static GitHub Pages, Node test runner, existing SVG/vanilla-JS chart renderer.

## Global Constraints

- Canonical route remains `/projects/reproductions/stock-index-futures-roll-basis-timing/`.
- `Index-Timing/Reproduction03` is the primary research source of truth for this case study.
- `caseStudy` must be optional; existing reproduction records must remain valid unchanged.
- Baseline reproduction metrics must come from final baseline reproduction evidence, not later optimization experiments.
- Extension metrics must be labeled as Lorien Lab research extensions and must never justify the baseline reproduction verdict.
- No source URL, metric, score, chart series, or artifact link may be invented.
- The weaker IM result and partial Figure-53 strategy-selection match must remain visible.
- Do not redesign the entire reproduction index or change the canonical reproduction namespace.
- Reuse existing real chart data only when its configuration is unambiguous; otherwise omit the chart.
- Maximum case-study chart blocks: three.
- Keep light/dark theme support and existing Lorien Lab visual language.
- `npm test`, `npm run check`, and `npm run build` must pass before integration.

---

### Task 1: Lock the V2 contract with failing tests

**Files:**
- Create: `tests/reproduction-case-study-v2.test.mjs`
- Create temporarily: `.github/workflows/reproduction-case-study-v2-ci.yml`

**Interfaces:**
- Consumes: current production schema, current generic reproduction detail route, current Reproduction03 Markdown record.
- Produces: executable acceptance contract for all later tasks.

- [ ] **Step 1: Add focused RED tests**

Create `tests/reproduction-case-study-v2.test.mjs` using `node:test`, `node:assert/strict`, and `node:fs/promises`.

The tests must assert all of the following:

```js
// schema
assert.match(schema, /caseStudy/);
assert.match(schema, /verdicts/);
assert.match(schema, /factorEvidence/);
assert.match(schema, /strategyFlow/);
assert.match(schema, /limitations/);
assert.match(schema, /extension/);

// reusable components exist
for (const path of [
  'src/components/ReproductionCaseStudyHeader.astro',
  'src/components/ReproductionVerdictGrid.astro',
  'src/components/ReproductionFactorEvidence.astro',
  'src/components/ReproductionStrategyFlow.astro',
  'src/components/ReproductionLimitations.astro',
  'src/components/ReproductionExtensionPanel.astro',
]) await access(path);

// detail route is additive
assert.match(detail, /entry\.data\.caseStudy/);
assert.match(detail, /ReproductionVerdictGrid/);
assert.match(detail, /ReproductionFactorEvidence/);
assert.match(detail, /ReproductionStrategyFlow/);
assert.match(detail, /ReproductionExtensionPanel/);

// current record opts in
assert.match(record, /caseStudy:/);
assert.match(record, /股指期货滚贴水择时与市场情绪因子/);
assert.match(record, /Basis & roll engine/);
assert.match(record, /IC multi-factor timing/);
assert.match(record, /Exact Figure-53 strategy selection/);
assert.match(record, /IM timing/);
assert.match(record, /IC annualized volatility/);
assert.match(record, /-0\.356/);
assert.match(record, /Beyond Reproduction|asymmetric hysteresis/i);

// source-of-truth artifacts
assert.match(record, /https:\/\/github\.com\/Lorien-LAB\/Index-Timing\/tree\/master\/Reproduction03/);
assert.match(record, /configs\/repro03\.yaml/);
assert.match(record, /doc\/reproduction_report\.md/);

// integrity
assert.match(record, /\+2\.0%/);
assert.match(record, /\+2\.6%/);
assert.match(record, /\+20\.7%/);
assert.match(record, /\+25\.2%/);
assert.match(record, /\+0\.7%/);
assert.match(record, /\+1\.5%/);
assert.doesNotMatch(record, /Figure-53[^\n]*fully reproduced/i);
```

Also assert that the detail route still contains the old generic header/content path for entries without `caseStudy`.

- [ ] **Step 2: Add branch-only CI**

Use Node 24 and run:

```yaml
- run: npm install
- run: npm test
- run: npm run check
- run: npm run build
```

The workflow must trigger only on `reproduction-case-study-v2`.

- [ ] **Step 3: Run CI and verify RED**

Expected: focused tests fail because `caseStudy` schema/components and rewritten record do not yet exist. Existing unrelated tests should remain green.

- [ ] **Step 4: Commit RED contract**

Commit message:

```text
test: define reproduction case study v2 contract
```

---

### Task 2: Add optional case-study schema and reusable evidence components

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/components/ReproductionCaseStudyHeader.astro`
- Create: `src/components/ReproductionVerdictGrid.astro`
- Create: `src/components/ReproductionFactorEvidence.astro`
- Create: `src/components/ReproductionStrategyFlow.astro`
- Create: `src/components/ReproductionLimitations.astro`
- Create: `src/components/ReproductionExtensionPanel.astro`

**Interfaces:**
- Consumes: `CollectionEntry<'reproductions'>` and optional `entry.data.caseStudy`.
- Produces: typed reusable presentation metadata and small rendering units used by the detail route.

- [ ] **Step 1: Add the optional schema**

Add an optional object under `reproductionBase` with this contract:

```ts
caseStudy: z.object({
  shortTitle: z.string(),
  subtitle: z.string().optional(),
  verdicts: z.array(z.object({
    label: z.string(),
    status: z.enum(['reproduced', 'partial', 'not-reproduced', 'extension']),
    evidence: z.string(),
  })).default([]),
  factorEvidence: z.array(z.object({
    factor: z.string(),
    paper: z.string(),
    reproduced: z.string(),
    note: z.string().optional(),
  })).default([]),
  strategyFlow: z.array(z.string()).default([]),
  limitations: z.array(z.object({
    title: z.string(),
    detail: z.string(),
  })).default([]),
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
}).optional(),
```

Do not make any case-study field required for generic records.

- [ ] **Step 2: Implement `ReproductionCaseStudyHeader.astro`**

Props:

```ts
interface Props {
  entry: CollectionEntry<'reproductions'>;
}
```

Render `caseStudy.shortTitle`, optional subtitle, source type / research area, source-specific broker/academic metadata, tags, current result, and code visibility. Keep the full source title available as a small “Source report” line rather than the H1.

- [ ] **Step 3: Implement verdict grid**

Props:

```ts
interface Props {
  verdicts: NonNullable<CollectionEntry<'reproductions'>['data']['caseStudy']>['verdicts'];
}
```

Each item renders label, explicit text status (`REPRODUCED`, `PARTIAL`, `NOT REPRODUCED`, `EXTENSION`), and evidence. Do not communicate status by color alone.

- [ ] **Step 4: Implement factor evidence table**

Render Factor / Paper ρ / Reproduced ρ / Note. Keep numeric strings as supplied; do not calculate or round them in the component.

- [ ] **Step 5: Implement strategy flow**

Render an ordered semantic flow using the supplied text steps. CSS may use connectors/arrows, but DOM order must remain understandable without CSS.

- [ ] **Step 6: Implement limitations**

Render prominent titled limitations as numbered research-integrity items.

- [ ] **Step 7: Implement extension panel**

Render `Beyond Reproduction`, extension thesis, Paper / Baseline / Extension table, and an adjacent caution block when present. The component copy must explicitly identify the section as Lorien Lab research beyond the source reproduction.

- [ ] **Step 8: Commit schema/components**

Commit message:

```text
feat: add reusable reproduction case study components
```

---

### Task 3: Compose case-study mode in the existing detail route

**Files:**
- Modify: `src/pages/projects/reproductions/[...id].astro`

**Interfaces:**
- Consumes: optional `entry.data.caseStudy` and Task 2 components.
- Produces: additive rendering mode; generic entries keep old rendering path.

- [ ] **Step 1: Import V2 components**

Import all Task 2 case-study components.

- [ ] **Step 2: Branch header and evidence hierarchy**

When `entry.data.caseStudy` exists, render in this order:

```text
Case-study header
Reproduction status / six-stage pipeline
Replication Verdict
Strategy in 30 Seconds
Factor Replication
Strategy headline metrics / existing metrics evidence
What Did Not Reproduce Exactly
Public Markdown research narrative
Beyond Reproduction
Selected Charts
Artifacts / related research
```

The existing six-dimensional score remains available, but visually after or beside evidence rather than as the primary verdict.

- [ ] **Step 3: Preserve generic rendering**

When `caseStudy` is absent, preserve the existing full title header, metrics/score panel, Markdown content, charts hook, and artifact footer.

- [ ] **Step 4: Prevent duplicated structured evidence**

For case-study mode, the Markdown body must not repeat the verdict grid, factor table, limitation list, or extension metric table verbatim. The route should render those from structured frontmatter only.

- [ ] **Step 5: Add responsive styling**

Case-study sections should collapse to one column below the existing tablet breakpoint. Long evidence strings and factor names must wrap without horizontal overflow.

- [ ] **Step 6: Commit detail composition**

Commit message:

```text
feat: compose reproduction case study detail mode
```

---

### Task 4: Rewrite the Reproduction03 public record from source-supported evidence

**Files:**
- Modify: `src/content/reproductions/broker/stock-index-futures-roll-basis-timing.md`

**Interfaces:**
- Consumes: documented evidence from `Index-Timing/Reproduction03/doc/reproduction_report.md`, `paper_notes.md`, `multifactor_backtest_report.md`, and `optimization_report.md`.
- Produces: the first complete `caseStudy` record and a shorter public research narrative.

- [ ] **Step 1: Replace the presentation title layer**

Keep the full source title in `title`, but add:

```yaml
caseStudy:
  shortTitle: "股指期货滚贴水择时与市场情绪因子"
  subtitle: "Reproduction of Orient Futures' 2026 research on basis timing and sentiment signals"
```

- [ ] **Step 2: Add six verdict items**

Use exactly these evidence meanings:

```text
Basis & roll engine — reproduced — IC baseline Sharpe 0.554 vs paper 0.54
Sentiment-factor layer — reproduced — all 7 representative-factor directions match; 6/7 magnitudes within 0.01 in the final report
IC multi-factor timing — reproduced — OOS +2.0% vs +2.6%, P/L 1.11 vs 1.12, 4.6 vs 4.5 switches/year
IC cross-maturity arbitrage — reproduced — OOS +20.7% vs +25.2%
IM timing — partial — OOS +0.7% vs +1.5% and materially higher switch frequency
Exact Figure-53 strategy selection — partial — only a subset matches exactly because method definitions / selection details are incompletely disclosed
```

Do not call Figure 53 fully reproduced.

- [ ] **Step 3: Add seven factor-evidence rows**

Use:

```text
IC annualized volatility       -0.35   -0.356
IC amplitude                   -0.34   -0.341
IC constituent ADR             +0.15   +0.142
IC constituent return dispersion -0.30 -0.302
IM annualized volatility       -0.59   -0.594
IM constituent return dispersion -0.19 -0.153   note: direction matches; magnitude gap is larger
IM VIX                         -0.59   -0.596
```

- [ ] **Step 4: Add strategy flow**

```text
Market sentiment factors
Forecast direction of current-quarter annualized basis
Basis expected to rise → hold current-quarter contract
Basis expected to fall → hold current-month contract
Compare with passive current-month roll benchmark
```

- [ ] **Step 5: Add limitations**

Add explicit items for Figure 53, weaker IM timing, and price-index versus total-return basis.

- [ ] **Step 6: Add flagship extension metadata**

Title: `Asymmetric Hysteresis Confirmation`.

Thesis: slow sentiment regimes are retained while transient TA flips are filtered at the aggregate tradable-signal layer.

Metrics:

```text
Full-sample timing improvement: paper +1.1%, baseline +0.50%, extension +1.32%
OOS timing improvement:         paper +2.6%, baseline +1.96%, extension +4.10%
Switches/year:                  paper 4.5, baseline approximately 4.6, extension approximately 4.5
```

Caution must mention the short approximately 2025-10 to 2026-06 OOS window and that full-sample decomposition / sensitivity / rolling validation are more informative.

- [ ] **Step 7: Point artifacts to the actual research source of truth**

Set:

```yaml
codeUrl: "https://github.com/Lorien-LAB/Index-Timing/tree/master/Reproduction03"
configurationUrl: "https://github.com/Lorien-LAB/Index-Timing/blob/master/Reproduction03/configs/repro03.yaml"
resultsUrl: "https://github.com/Lorien-LAB/Index-Timing/blob/master/Reproduction03/doc/reproduction_report.md"
```

Do not add a fabricated public source URL for the broker PDF.

- [ ] **Step 8: Rewrite Markdown body**

Use only these main sections:

```markdown
## Research question
## Original mechanism
## Reproduction design
## Data reconstruction
## Method reconstruction
## Validation protocol
## Research conclusion
```

Remove issue-number archaeology, local filesystem paths, repeated metric tables, repeated verdicts, repeated extension table, and exhaustive secondary metrics. Link to the research repository for the full technical audit trail.

- [ ] **Step 9: Commit content rewrite**

Commit message:

```text
content: rewrite stock index futures reproduction as case study
```

---

### Task 5: Refactor charts into question-driven case-study evidence

**Files:**
- Modify: `src/components/ReproductionCharts.astro`
- Reuse: `src/data/reproduction-charts/stock-index-futures-roll-basis-timing.json`
- Test: `tests/reproduction-case-study-v2.test.mjs`

**Interfaces:**
- Consumes: existing real chart JSON generated from reproduction runs.
- Produces: at most three clearly labeled research-question chart blocks; generic rendering remains safe.

- [ ] **Step 1: Identify defensible existing series**

Use the existing JSON only for configurations whose title/data provenance is already explicit. At minimum retain the real IC roll-timing chart and the real IC cross-maturity chart if both are present.

- [ ] **Step 2: Remove equal-weight chart dump behavior**

Do not blindly render every array entry. Introduce a small explicit selector/registry for this slug, for example:

```ts
const chartPlan = {
  'stock-index-futures-roll-basis-timing': [
    { match: /IC.*滚贴水/, eyebrow: 'Replication', question: 'Does timing improve passive current-month rolling?' },
    { match: /IC.*跨期/, eyebrow: 'Replication', question: 'Does the cross-maturity effect survive reproduction?' },
  ],
};
```

If a baseline-vs-hysteresis series is not actually present in stored data, do not synthesize one and do not render a third chart.

- [ ] **Step 3: Improve chart framing**

Each rendered chart block must include:

```text
Replication / Extension eyebrow
research question title
short provenance/caveat note
interactive chart
```

Retain hover/tooltips and legend toggling where they already work.

- [ ] **Step 4: Remove misleading global legend prose**

Do not describe colors as one universal semantic mapping if chart series differ. Use each chart's own series labels.

- [ ] **Step 5: Add test assertions**

Assert the component contains an explicit selection plan and does not simply render all `charts.forEach(...)` without filtering. Assert the case-study slug has no more than three planned charts.

- [ ] **Step 6: Commit chart refactor**

Commit message:

```text
feat: make reproduction charts question driven
```

---

### Task 6: GREEN verification, regression review, and temporary CI cleanup

**Files:**
- Modify if needed: `tests/reproduction-case-study-v2.test.mjs`
- Delete after successful branch verification: `.github/workflows/reproduction-case-study-v2-ci.yml`

**Interfaces:**
- Consumes: complete V2 implementation.
- Produces: a clean feature branch ready for integration.

- [ ] **Step 1: Run focused and full tests**

Commands:

```bash
npm test
npm run check
npm run build
```

Expected: all green.

- [ ] **Step 2: Verify static output**

Confirm build creates:

```text
dist/projects/reproductions/stock-index-futures-roll-basis-timing/index.html
```

Inspect built HTML for:

```text
股指期货滚贴水择时与市场情绪因子
Replication Verdict
Strategy in 30 Seconds
Factor Replication
What Did Not Reproduce Exactly
Beyond Reproduction
Index-Timing/tree/master/Reproduction03
```

- [ ] **Step 3: Regression check generic mode**

Tests must prove `caseStudy` is optional and the generic reproduction header/content branch still exists.

- [ ] **Step 4: Research-integrity scan**

Search the V2 record and case-study components for accidental claims that:

```text
Figure 53 is fully reproduced
IM OOS equals paper
extension OOS is the baseline reproduction
transaction-cost robustness was tested
```

No such claims may remain.

- [ ] **Step 5: Remove temporary branch-only CI**

Delete `.github/workflows/reproduction-case-study-v2-ci.yml` after the final feature SHA has passed its complete verification run.

- [ ] **Step 6: Re-run/confirm final branch diff**

Expected changed scope:

```text
src/content.config.ts
src/components/ReproductionCaseStudy*.astro
src/components/ReproductionVerdictGrid.astro
src/components/ReproductionFactorEvidence.astro
src/components/ReproductionStrategyFlow.astro
src/components/ReproductionLimitations.astro
src/components/ReproductionExtensionPanel.astro
src/components/ReproductionCharts.astro
src/pages/projects/reproductions/[...id].astro
src/content/reproductions/broker/stock-index-futures-roll-basis-timing.md
tests/reproduction-case-study-v2.test.mjs
docs/superpowers/specs/...
docs/superpowers/plans/...
```

No unrelated site redesign is allowed.

- [ ] **Step 7: Finish branch using `superpowers:finishing-a-development-branch`**

Present the required integration menu only after the final branch is green.
