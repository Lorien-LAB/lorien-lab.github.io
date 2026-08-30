# OMD L2 A-Share Reproduction Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a bilingual, evidence-backed academic reproduction page for the private L2 A-share OMD long-only implementation, led by the stitched annualized result.

**Architecture:** Add one canonical public evidence module, one academic reproduction Markdown record, and one page-specific Astro evidence panel. The existing reproduction detail route renders the panel only for the canonical L2 slug; the rest of the Reproduction Workbench remains unchanged.

**Tech Stack:** Astro 5, TypeScript, Markdown content collections, semantic HTML, scoped CSS, minimal browser JavaScript, Node test runner, GitHub Pages.

## Global Constraints

- The public page covers only `a_share_omd_long_only`; it must not mention L1, L3, later optimization, or a three-lane comparison.
- Slug: `observable-matrix-dynamics-a-share-long-only`.
- Public title: `OMD Portfolio Optimization · A股 Long-Only Reproduction`.
- Stage: `reproduction`; result: `partial`; code visibility: `private`; featured: `true`.
- Narrative is English-first with bilingual A-share terms where they improve precision.
- The primary visual directly reports stitched OOS1→OOS2 annualized performance.
- CNY 100m per sleeve: annual return `0.202245`, Sharpe `0.794502`, maximum drawdown `-0.224887`.
- CNY 500m per sleeve: annual return `0.191262`, Sharpe `0.760208`, maximum drawdown `-0.223963`.
- Capital is per independent CSI 300, CSI 500, and CSI 1000 sleeve; total nominal initial capital is CNY 300m or CNY 1.5bn.
- Preserve separate OOS1/OOS2 evidence below the stitched headline; never hide the negative OOS1 CSI 1000 result.
- Keep implementation private: no `codeUrl`, `notebookUrl`, `configurationUrl`, or `resultsUrl`.
- Publish only reviewed aggregate values. Never publish stock targets, holdings, orders, ledgers, raw forecasts, local paths, private configuration, or hashes.
- Do not fabricate Original-vs-Reproduced metrics or a reproduction score for non-comparable markets.
- Do not modify the existing stock-index-futures reproduction page or its data/components.
- Reuse the existing reproduction route and case-study components; introduce only one L2-specific evidence panel.
- The page must remain useful without JavaScript and accessible by keyboard and screen reader.
- Automated tests must exercise imported public data and generated Astro HTML; do not treat source-text matching as proof of rendered behavior.
- Preserve unrelated untracked files in the main website checkout.

---

## File map

| File | Responsibility |
| --- | --- |
| `src/data/reproduction-results/omd-a-share-long-only.ts` | Single public source of exact L2 aggregate evidence and display semantics. |
| `src/content/reproductions/academic/observable-matrix-dynamics-a-share-long-only.md` | Academic metadata, verdicts, limitations, and long-form research narrative. |
| `src/components/reproduction-note/OMDL2EvidencePanel.astro` | Stitched headline, capital control, window/index comparison, benchmark table, costs and capacity. |
| `src/pages/projects/reproductions/[...id].astro` | Minimal slug gate that passes L2 evidence to the dedicated panel. |
| `tests/omd-l2-reproduction-page.test.mjs` | Literal evidence, privacy, content, route-isolation, and accessibility regression tests. |

---

### Task 1: Freeze the public L2 evidence contract

**Files:**
- Create: `src/data/reproduction-results/omd-a-share-long-only.ts`
- Create: `tests/omd-l2-reproduction-page.test.mjs`

**Interfaces:**
- Consumes: reviewed aggregate results from the approved design specification.
- Produces: `omdL2Evidence` and `OmdL2Evidence` for the Astro component in Task 3.

- [ ] **Step 1: Write the failing literal-evidence test**

Create `tests/omd-l2-reproduction-page.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const dataPath = 'src/data/reproduction-results/omd-a-share-long-only.ts';
const detailOutput = 'dist/projects/reproductions/observable-matrix-dynamics-a-share-long-only/index.html';
const indexOutput = 'dist/projects/reproductions/index.html';
const existingBrokerOutput = 'dist/projects/reproductions/stock-index-futures-roll-basis-timing/index.html';
const execFileAsync = promisify(execFile);
let buildPromise;
const buildSite = () => buildPromise ??= execFileAsync(
  process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['run', 'build'],
  { cwd: process.cwd(), maxBuffer: 16 * 1024 * 1024 },
);

test('OMD L2 public evidence freezes the approved stitched headline', async () => {
  const moduleUrl = `${pathToFileURL(dataPath).href}?test=${Date.now()}`;
  const { omdL2Evidence } = await import(moduleUrl);
  assert.equal(omdL2Evidence.slug, 'observable-matrix-dynamics-a-share-long-only');
  assert.deepEqual(omdL2Evidence.stitchedPeriod, {
    start: '2024-01-02', end: '2026-06-30', label: 'OOS1 → OOS2 Stitched',
    aggregation: 'Equal-weighted daily returns across three independent index sleeves',
  });
  assert.deepEqual(omdL2Evidence.capitalScenarios.map((scenario) => ({
    key: scenario.key,
    totalNominalCapitalCny: scenario.totalNominalCapitalCny,
    ...scenario.headline,
  })), [
    { key: '100m', totalNominalCapitalCny: 300_000_000, annualReturn: 0.202245, sharpe: 0.794502, maxDrawdown: -0.224887 },
    { key: '500m', totalNominalCapitalCny: 1_500_000_000, annualReturn: 0.191262, sharpe: 0.760208, maxDrawdown: -0.223963 },
  ]);
});

test('OMD L2 public evidence contains only aggregate L2-safe values', async () => {
  const moduleUrl = `${pathToFileURL(dataPath).href}?privacy=${Date.now()}`;
  const { omdL2Evidence } = await import(moduleUrl);
  const publicPayload = JSON.stringify(omdL2Evidence);
  assert.doesNotMatch(publicPayload, /[A-Z]:\\|[A-Z]:\//);
  assert.doesNotMatch(publicPayload, /paper_faithful_shadow|a_share_lowvol_mom12|three[- ]lane/i);
  assert.doesNotMatch(publicPayload, /\bL1\b|\bL3\b/);
  for (const privateKey of ['holdings', 'orders', 'ledger', 'forecasts', 'configurationUrl', 'resultsUrl']) {
    assert.equal(Object.hasOwn(omdL2Evidence, privateKey), false, `unexpected public key ${privateKey}`);
  }
});
```

- [ ] **Step 2: Run the test to verify RED**

Run:

```text
node --test tests/omd-l2-reproduction-page.test.mjs
```

Expected: FAIL because `src/data/reproduction-results/omd-a-share-long-only.ts` does not exist.

- [ ] **Step 3: Implement the evidence module**

Create the module with this exact public contract:

```ts
export const omdL2Evidence = {
  slug: 'observable-matrix-dynamics-a-share-long-only',
  stitchedPeriod: {
    start: '2024-01-02',
    end: '2026-06-30',
    label: 'OOS1 → OOS2 Stitched',
    aggregation: 'Equal-weighted daily returns across three independent index sleeves',
  },
  capitalScenarios: [
    {
      key: '100m', label: 'CNY 100m / sleeve', perSleeveCapitalCny: 100_000_000,
      totalNominalCapitalCny: 300_000_000,
      headline: { annualReturn: 0.202245, sharpe: 0.794502, maxDrawdown: -0.224887 },
    },
    {
      key: '500m', label: 'CNY 500m / sleeve', perSleeveCapitalCny: 500_000_000,
      totalNominalCapitalCny: 1_500_000_000,
      headline: { annualReturn: 0.191262, sharpe: 0.760208, maxDrawdown: -0.223963 },
    },
  ],
  indexAnnualReturns: [
    { window: 'OOS1', capitalKey: '100m', csi300: 0.131995, csi500: 0.091906, csi1000: -0.034975, combined: 0.066029 },
    { window: 'OOS1', capitalKey: '500m', csi300: 0.129832, csi500: 0.077466, csi1000: -0.048577, combined: 0.055604 },
    { window: 'OOS2', capitalKey: '100m', csi300: 0.366302, csi500: 0.659642, csi1000: 0.291116, combined: 0.437029 },
    { window: 'OOS2', capitalKey: '500m', csi300: 0.366462, csi500: 0.652143, csi1000: 0.265382, combined: 0.425274 },
  ],
  windowMetrics: [
    { window: 'OOS1', capitalKey: '100m', annualReturn: 0.066029, annualizedVolatility: 0.291345, sharpe: 0.360525, maxDrawdown: -0.224887, calmar: 0.293610 },
    { window: 'OOS1', capitalKey: '500m', annualReturn: 0.055604, annualizedVolatility: 0.292996, sharpe: 0.326627, maxDrawdown: -0.223963, calmar: 0.248272 },
    { window: 'OOS2', capitalKey: '100m', annualReturn: 0.437029, annualizedVolatility: 0.263804, sharpe: 1.507346, maxDrawdown: -0.136323, calmar: 3.205831 },
    { window: 'OOS2', capitalKey: '500m', annualReturn: 0.425274, annualizedVolatility: 0.263531, sharpe: 1.477423, maxDrawdown: -0.136298, calmar: 3.120187 },
  ],
  benchmarkComparisons: [
    { window: 'OOS1', capitalKey: '100m', strategy: 0.066029, officialIndex: 0.076142, pitEqualWeight: 0.091398 },
    { window: 'OOS1', capitalKey: '500m', strategy: 0.055604, officialIndex: 0.076142, pitEqualWeight: 0.091060 },
    { window: 'OOS2', capitalKey: '100m', strategy: 0.437029, officialIndex: 0.410000, pitEqualWeight: 0.236805 },
    { window: 'OOS2', capitalKey: '500m', strategy: 0.425274, officialIndex: 0.410000, pitEqualWeight: 0.235367 },
  ],
  execution: [
    { window: 'OOS1', capitalKey: '100m', annualizedTwoWayTurnoverSum: 45.528167, transactionCostCny: 10_118_311.298726 },
    { window: 'OOS1', capitalKey: '500m', annualizedTwoWayTurnoverSum: 45.557882, transactionCostCny: 53_384_924.064894 },
    { window: 'OOS2', capitalKey: '100m', annualizedTwoWayTurnoverSum: 40.505387, transactionCostCny: 6_694_766.140638 },
    { window: 'OOS2', capitalKey: '500m', annualizedTwoWayTurnoverSum: 40.533973, transactionCostCny: 35_174_081.290995 },
  ],
  capacity: {
    advParticipationCap: 0.10,
    note: 'Capacity is index- and trade-dependent; no single live-capacity guarantee is reported.',
  },
} as const;

export type OmdL2Evidence = typeof omdL2Evidence;
```

- [ ] **Step 4: Run the focused test to verify GREEN**

Run:

```text
node --test tests/omd-l2-reproduction-page.test.mjs
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit the evidence contract**

```text
git add src/data/reproduction-results/omd-a-share-long-only.ts tests/omd-l2-reproduction-page.test.mjs
git commit -m "feat(reproductions): freeze OMD L2 public evidence"
```

---

### Task 2: Add the academic reproduction record

**Files:**
- Create: `src/content/reproductions/academic/observable-matrix-dynamics-a-share-long-only.md`
- Modify: `tests/omd-l2-reproduction-page.test.mjs`

**Interfaces:**
- Consumes: canonical slug and evidence terminology from Task 1.
- Produces: one `reproductions` content entry rendered by the existing detail route and listed by the existing workbench index.

- [ ] **Step 1: Add the failing content and privacy tests**

Append these tests:

```js
test('built workbench publishes one featured private-code OMD academic record', async () => {
  await buildSite();
  const [indexHtml, detailHtml] = await Promise.all([
    readFile(indexOutput, 'utf8'), readFile(detailOutput, 'utf8'),
  ]);
  assert.match(indexHtml, /Academic Papers<\/span>\s*<strong>1<\/strong>/);
  assert.match(indexHtml, /href="\/projects\/reproductions\/observable-matrix-dynamics-a-share-long-only\/"/);
  assert.match(indexHtml, /Are Three Matrices All You Need To Beat the Market\? · A股 Long-Only Reproduction/);
  for (const visible of [
    'OMD Portfolio Optimization · A股 Long-Only Reproduction',
    'Academic Paper', 'Portfolio Construction', 'Partial', 'Implementation Private',
    'Igor Halperin', '2026', 'Point-in-time and causality', 'Cross-window stability',
  ]) assert.ok(detailHtml.includes(visible), `built detail missing ${visible}`);
  assert.match(detailHtml, /href="https:\/\/arxiv\.org\/abs\/2607\.27461"/);
  assert.doesNotMatch(detailHtml, /View Research Code|View Code|Repository ↗|Configuration ↗|Results ↗/);
});

test('built OMD narrative is bilingual, stitched-first, and public-safe', async () => {
  await buildSite();
  const detailHtml = await readFile(detailOutput, 'utf8');
  for (const heading of [
    'Research question', 'Paper mechanism', 'A-share long-only adaptation',
    'Data and point-in-time universe', 'Portfolio construction',
    'Execution and cost model', 'No-lookahead validation', 'Empirical results',
    'Benchmark comparison', 'Capacity and robustness', 'Limitations', 'Conclusion',
  ]) assert.ok(detailHtml.includes(heading), `built narrative missing ${heading}`);
  for (const visible of ['20.22%', '19.13%', 'CSI 1000', 'OOS1', 'OOS2', '下一开盘成交', '时点成分股', '涨跌停', '停牌']) {
    assert.ok(detailHtml.includes(visible), `built narrative missing ${visible}`);
  }
  assert.match(detailHtml, /not an investment recommendation/i);
  assert.doesNotMatch(detailHtml, /[A-Z]:\\|[A-Z]:\//);
  assert.doesNotMatch(detailHtml, /paper_faithful_shadow|a_share_lowvol_mom12|three[- ]lane/i);
  assert.doesNotMatch(detailHtml, /\bL1\b|\bL3\b/);
});
```

- [ ] **Step 2: Run the focused test to verify RED**

Run:

```text
node --test tests/omd-l2-reproduction-page.test.mjs
```

Expected: FAIL because the academic record does not exist.

- [ ] **Step 3: Create the exact frontmatter**

Use this frontmatter and omit every public implementation link, score, generic
metric comparison, factor-evidence block, and extension block:

```yaml
---
slug: observable-matrix-dynamics-a-share-long-only
title: "Are Three Matrices All You Need To Beat the Market? · A股 Long-Only Reproduction"
description: "A point-in-time, next-open A-share reproduction of the Observable Matrix Dynamics long portfolio across CSI 300, CSI 500, and CSI 1000, with modeled trading costs and capacity constraints."
researchArea: "Portfolio Construction"
stage: reproduction
result: partial
resultSummary: "The tradable A-share long-only implementation produces a 20.22% stitched annual return at CNY 100m per sleeve and 19.13% at CNY 500m, while showing material cross-window and index dependence."
codeVisibility: private
sourceType: academic
authors:
  - "Igor Halperin"
year: 2026
venue: "arXiv"
arxiv: "2607.27461"
paperUrl: "https://arxiv.org/abs/2607.27461"
date: 2026-08-30
updated: 2026-08-30
tags:
  - Academic Paper
  - Observable Matrix Dynamics
  - A-share
  - Long-Only
  - Point-in-Time
  - Portfolio Construction
featured: true
assetClass: "China A-share Equities"
market: "China A-share"
frequency: "Monthly signals · daily next-open execution"
dataAvailability: "Partial · PIT constituents and production A-share market data are available; the original paper market is not source-identical"
caseStudy:
  shortTitle: "OMD Portfolio Optimization · A股 Long-Only Reproduction"
  subtitle: "A tradable A-share adaptation with point-in-time constituents, next-open execution, modeled costs, and capacity constraints"
  verdicts:
    - label: "OMD long-only construction"
      status: reproduced
      evidence: "Frozen OMD forecasts and monthly long-only targets close to the formal A-share reproduction evidence."
    - label: "Point-in-time and causality"
      status: reproduced
      evidence: "PIT membership and training-date gates are enforced; signal-day information is executed only at the next open."
    - label: "A-share execution layer"
      status: extension
      evidence: "Commission, stamp duty, transfer fee, slippage, impact, suspensions, price limits, delisting, and ADV capacity are modeled explicitly."
    - label: "Cross-window stability"
      status: partial
      evidence: "OOS1 and OOS2 differ materially, and the CSI 1000 sleeve is negative in OOS1."
  strategyFlow:
    - "Frozen OMD transition forecasts"
    - "Point-in-time eligible constituents / 时点成分股"
    - "Monthly 30-stock long-only target"
    - "Signal-day decision → next-open execution / 下一开盘成交"
    - "A-share costs, trading constraints, and 10% ADV capacity"
  limitations:
    - title: "Different market from the paper"
      detail: "This is an A-share adaptation; the original market, sample, universe, and execution constraints are not source-identical."
    - title: "Strong cross-window dependence"
      detail: "OOS2 is much stronger than OOS1, while CSI 1000 is negative in OOS1. The stitched return must not be read as uniform performance."
    - title: "Capacity pressure at CNY 500m per sleeve"
      detail: "The 500m scenario has lower stitched annual return and materially larger modeled costs; capacity is trade- and index-dependent."
    - title: "Research result, not live performance"
      detail: "The evidence comes from historical out-of-sample replay with modeled execution and is not a live track record or investment recommendation."
relatedKnowledge: []
relatedNotes: []
relatedProjects: []
---
```

- [ ] **Step 4: Write the complete narrative**

Use the twelve approved H2 headings in the test. Each section must make these
claims explicitly:

1. `Research question`: whether OMD forecasts can support a tradable A-share
   long-only portfolio after real execution constraints.
2. `Paper mechanism`: observable matrix dynamics model transitions in ranked
   return and volatility states; do not claim the original headline performance
   is directly comparable.
3. `A-share long-only adaptation`: three index universes, long-only exposure,
   no individual-stock shorting, no strategy-line comparison.
4. `Data and point-in-time universe`: historical constituent snapshots and
   information cutoffs prevent survivorship and universe leakage.
5. `Portfolio construction`: monthly frozen forecasts, 30-stock targets, three
   independent index sleeves, no tuning from published comparison results.
6. `Execution and cost model`: next-open execution / 下一开盘成交, commission,
   stamp duty, transfer fee, slippage, price impact, 10% ADV, 涨跌停, 停牌,
   delisting, and company actions.
7. `No-lookahead validation`: training target maximum precedes the forecast
   month; signal date precedes execution date; order business keys are unique;
   ledger identities close.
8. `Empirical results`: lead with 20.22% and 19.13% stitched annual return,
   explain the capital convention, then state OOS1/OOS2 differences.
9. `Benchmark comparison`: distinguish non-executable official price indices
   from executed PIT equal-weight accounts.
10. `Capacity and robustness`: show modeled cost growth and the 100m-to-500m
    decline without claiming one universal capacity ceiling.
11. `Limitations`: different market, short OOS2 window, cross-window variation,
    modeled rather than live execution.
12. `Conclusion`: formal A-share adaptation, precise stitched numbers, negative
    OOS1 CSI 1000, material state dependence, and the sentence `This is not an
    investment recommendation.`

- [ ] **Step 5: Verify content and schema**

Run:

```text
node --test tests/omd-l2-reproduction-page.test.mjs
npm run check
```

Expected: focused tests pass and Astro reports zero content/schema errors.

- [ ] **Step 6: Commit the academic record**

```text
git add src/content/reproductions/academic/observable-matrix-dynamics-a-share-long-only.md tests/omd-l2-reproduction-page.test.mjs
git commit -m "content(reproductions): add OMD L2 A-share case study"
```

---

### Task 3: Build and integrate the L2 evidence panel

**Files:**
- Create: `src/components/reproduction-note/OMDL2EvidencePanel.astro`
- Modify: `src/pages/projects/reproductions/[...id].astro`
- Modify: `tests/omd-l2-reproduction-page.test.mjs`

**Interfaces:**
- Consumes: `OmdL2Evidence` and `omdL2Evidence` from Task 1.
- Produces: `<OMDL2EvidencePanel data={omdL2Evidence} />`, rendered only when the current entry slug equals the canonical L2 slug.

- [ ] **Step 1: Add the failing composition and accessibility tests**

Append:

```js
test('OMD L2 evidence panel is accessible and progressively enhanced', async () => {
  await buildSite();
  const detailHtml = await readFile(detailOutput, 'utf8');
  for (const visible of [
    'OOS1 → OOS2 Stitched', 'Annualized Return', 'Sharpe', 'Max Drawdown',
    'CNY 100m / sleeve', 'CNY 500m / sleeve',
    'CSI 300', 'CSI 500', 'CSI 1000', 'Combined',
    'Official price index', 'PIT equal-weight', 'ADV participation cap',
    '20.22%', '19.13%', '-3.50%', '-4.86%',
  ]) assert.ok(detailHtml.includes(visible), `built panel missing ${visible}`);
  assert.match(detailHtml, /data-omd-evidence/);
  assert.match(detailHtml, /data-omd-capital="100m"[^>]*aria-pressed="true"/);
  assert.match(detailHtml, /data-omd-capital="500m"[^>]*aria-pressed="false"/);
  assert.match(detailHtml, /data-omd-capital-panel="100m"/);
  assert.match(detailHtml, /data-omd-capital-panel="500m"[^>]*hidden/);
  assert.ok((detailHtml.match(/<table/g) ?? []).length >= 3, 'expected exact-value fallback tables');
  assert.match(detailHtml, /prefers-reduced-motion/);
});

test('OMD L2 panel is isolated to its canonical reproduction slug', async () => {
  await buildSite();
  const [omdHtml, brokerHtml] = await Promise.all([
    readFile(detailOutput, 'utf8'), readFile(existingBrokerOutput, 'utf8'),
  ]);
  assert.match(omdHtml, /data-omd-evidence/);
  assert.doesNotMatch(brokerHtml, /data-omd-evidence|OOS1 → OOS2 Stitched/);
  assert.match(brokerHtml, /股指期货滚贴水择时与市场情绪因子/);
});
```

- [ ] **Step 2: Run the focused test to verify RED**

Run:

```text
node --test tests/omd-l2-reproduction-page.test.mjs
```

Expected: FAIL because the component and route integration do not exist.

- [ ] **Step 3: Implement the component structure**

Create an Astro component with this server-side interface and section order:

```astro
---
import type { OmdL2Evidence } from '../../data/reproduction-results/omd-a-share-long-only';
interface Props { data: OmdL2Evidence; }
const { data } = Astro.props;
const percent = (value: number, digits = 2) => `${(value * 100).toFixed(digits)}%`;
const ratio = (value: number, digits = 2) => value.toFixed(digits);
const money = (value: number) => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'CNY', notation: 'compact', maximumFractionDigits: 1,
}).format(value);
const indexFields = [
  { key: 'csi300', label: 'CSI 300' },
  { key: 'csi500', label: 'CSI 500' },
  { key: 'csi1000', label: 'CSI 1000' },
  { key: 'combined', label: 'Combined' },
] as const;
const capitalRows = Object.fromEntries(data.capitalScenarios.map((scenario) => [
  scenario.key,
  {
    index: data.indexAnnualReturns.filter((row) => row.capitalKey === scenario.key),
    window: data.windowMetrics.filter((row) => row.capitalKey === scenario.key),
    benchmark: data.benchmarkComparisons.filter((row) => row.capitalKey === scenario.key),
    execution: data.execution.filter((row) => row.capitalKey === scenario.key),
  },
])) as Record<string, {
  index: (typeof data.indexAnnualReturns)[number][];
  window: (typeof data.windowMetrics)[number][];
  benchmark: (typeof data.benchmarkComparisons)[number][];
  execution: (typeof data.execution)[number][];
}>;
const barPosition = (value: number) => {
  const width = Math.min(Math.abs(value) / 0.70 * 46, 46);
  return `--bar-left:${value < 0 ? 50 - width : 50}%;--bar-width:${width}%`;
};
---

<section class="omd-evidence" data-omd-evidence aria-labelledby="omd-evidence-title">
  <div class="container record-wrap">
    <header class="evidence-intro">
      <div><div class="mono-label">L2 Reproduction Evidence</div><h2 id="omd-evidence-title">OOS1 → OOS2 Stitched</h2></div>
      <p>{data.stitchedPeriod.start} – {data.stitchedPeriod.end} · {data.stitchedPeriod.aggregation}</p>
    </header>

    <div class="headline-grid">
      {data.capitalScenarios.map((scenario) => (
        <article class:list={['headline-card', scenario.key === '100m' && 'is-primary']}>
          <span>{scenario.label}</span>
          <strong>{percent(scenario.headline.annualReturn)}</strong>
          <small>Annualized Return</small>
          <dl>
            <div><dt>Sharpe</dt><dd>{ratio(scenario.headline.sharpe)}</dd></div>
            <div><dt>Max Drawdown</dt><dd>{percent(scenario.headline.maxDrawdown)}</dd></div>
            <div><dt>Total nominal</dt><dd>{money(scenario.totalNominalCapitalCny)}</dd></div>
          </dl>
        </article>
      ))}
    </div>

    <div class="capital-controls" role="group" aria-label="Capital per index sleeve">
      {data.capitalScenarios.map((scenario, index) => (
        <button type="button" data-omd-capital={scenario.key} aria-pressed={index === 0 ? 'true' : 'false'}>{scenario.label}</button>
      ))}
    </div>

    {data.capitalScenarios.map((scenario, scenarioIndex) => {
      const rows = capitalRows[scenario.key].index;
      return (
        <div class="capital-panel" data-omd-capital-panel={scenario.key} hidden={scenarioIndex !== 0}>
          <h3>Index annual returns · {scenario.label}</h3>
          <div class="bar-chart" role="img" aria-label={`OOS1 and OOS2 annual returns for ${scenario.label}`}>
            {indexFields.map((field) => (
              <div class="bar-group">
                <strong>{field.label}</strong>
                {rows.map((row) => {
                  const value = row[field.key];
                  return <div class="bar-row"><span>{row.window}</span><div class="bar-track"><i class:list={[value < 0 && 'negative']} style={barPosition(value)}></i></div><b>{percent(value)}</b></div>;
                })}
              </div>
            ))}
          </div>
        </div>
      );
    })}

    <div class="table-wrap">
      <table><caption>Exact index and combined annual returns</caption><thead><tr><th>Window</th><th>Capital</th><th>CSI 300</th><th>CSI 500</th><th>CSI 1000</th><th>Combined</th></tr></thead>
        <tbody>{data.indexAnnualReturns.map((row) => <tr><th>{row.window}</th><td>{row.capitalKey}</td><td>{percent(row.csi300)}</td><td>{percent(row.csi500)}</td><td>{percent(row.csi1000)}</td><td>{percent(row.combined)}</td></tr>)}</tbody>
      </table>
    </div>

    <div class="table-wrap">
      <table><caption>Independent-window robustness</caption><thead><tr><th>Window</th><th>Capital</th><th>Annual return</th><th>Annualized volatility</th><th>Sharpe</th><th>Max drawdown</th><th>Calmar</th></tr></thead>
        <tbody>{data.windowMetrics.map((row) => <tr><th>{row.window}</th><td>{row.capitalKey}</td><td>{percent(row.annualReturn)}</td><td>{percent(row.annualizedVolatility)}</td><td>{ratio(row.sharpe)}</td><td>{percent(row.maxDrawdown)}</td><td>{ratio(row.calmar)}</td></tr>)}</tbody>
      </table>
    </div>

    <div class="table-wrap">
      <table><caption>Official price index and PIT equal-weight comparison</caption><thead><tr><th>Window</th><th>Capital</th><th>L2</th><th>Official price index</th><th>PIT equal-weight</th></tr></thead>
        <tbody>{data.benchmarkComparisons.map((row) => <tr><th>{row.window}</th><td>{row.capitalKey}</td><td>{percent(row.strategy)}</td><td>{percent(row.officialIndex)}</td><td>{percent(row.pitEqualWeight)}</td></tr>)}</tbody>
      </table>
      <p class="table-note">Official price indices are not executable accounts. PIT equal-weight uses point-in-time membership and modeled next-open A-share execution.</p>
    </div>

    <div class="execution-grid">
      {data.execution.map((row) => <article><span>{row.window} · {row.capitalKey}</span><strong>{money(row.transactionCostCny)}</strong><small>Modeled transaction cost</small><p>{ratio(row.annualizedTwoWayTurnoverSum)}× annualized sleeve-turnover sum</p></article>)}
    </div>
    <p class="capacity-note"><strong>ADV participation cap · {percent(data.capacity.advParticipationCap, 0)}</strong> {data.capacity.note}</p>
  </div>
</section>
```

Use this structure verbatim, then add scoped styles. The chart uses horizontal
bars with a visible zero line so negative CSI 1000 OOS1 returns are unambiguous.
Bar labels always print the number; color is secondary.

Both stitched headline cards and the complete exact-value table render without
JavaScript. JavaScript only switches the enhanced chart and capital-specific
detail panels.

- [ ] **Step 4: Add the capital-switch interaction**

Use a component-local inline script with this behavior:

```js
document.querySelectorAll('[data-omd-evidence]').forEach((root) => {
  const buttons = [...root.querySelectorAll('[data-omd-capital]')];
  const panels = [...root.querySelectorAll('[data-omd-capital-panel]')];
  const select = (capital) => {
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.omdCapital === capital)));
    panels.forEach((panel) => { panel.hidden = panel.dataset.omdCapitalPanel !== capital; });
  };
  buttons.forEach((button) => button.addEventListener('click', () => select(button.dataset.omdCapital)));
});
```

Wrap the section with `data-omd-evidence`. Initialize 100m as pressed and visible.
Buttons must be `type="button"`. Do not use client frameworks.

- [ ] **Step 5: Style the panel in the component**

Use existing site tokens (`--bg`, `--surface`, `--border`, `--ink`, `--muted`,
`--accent`, `--accent-strong`, `--danger`, `--font-mono`, `--radius`,
`--radius-lg`). Required layout behavior:

- headline cards: two columns above 760px, one column below;
- chart and supporting copy: two columns above 900px, one column below;
- exact tables: horizontally scroll inside their own wrapper below 760px;
- controls: wrap without overflow at 390px;
- negative bars and numbers use `--danger` plus a minus sign;
- transitions are disabled under `@media (prefers-reduced-motion: reduce)`;
- no hard-coded light-only background or text colors.

The bar geometry must use the variables emitted by `barPosition`:

```css
.bar-track{position:relative;height:10px;border-radius:999px;background:color-mix(in srgb,var(--border) 62%,transparent)}
.bar-track:before{content:'';position:absolute;left:50%;top:-3px;bottom:-3px;width:1px;background:var(--muted)}
.bar-track i{position:absolute;left:var(--bar-left);width:var(--bar-width);inset-block:1px;border-radius:999px;background:var(--accent)}
.bar-track i.negative{background:var(--danger)}
.table-wrap{max-width:100%;overflow-x:auto}
@media(max-width:760px){.headline-grid{grid-template-columns:1fr}.bar-row{grid-template-columns:42px minmax(150px,1fr) 62px}}
@media(prefers-reduced-motion:reduce){.omd-evidence *{scroll-behavior:auto!important;transition:none!important}}
```

- [ ] **Step 6: Integrate the panel behind one slug gate**

Modify the detail route frontmatter:

```astro
import OMDL2EvidencePanel from '../../../components/reproduction-note/OMDL2EvidencePanel.astro';
import { omdL2Evidence } from '../../../data/reproduction-results/omd-a-share-long-only';
```

Define:

```ts
const isOmdL2 = entry.data.slug === omdL2Evidence.slug;
```

Render immediately after `record-status` and before the case-study body:

```astro
{isOmdL2 && <OMDL2EvidencePanel data={omdL2Evidence} />}
```

Do not change the `isResearchNoteV3` branch or the existing broker reproduction.

- [ ] **Step 7: Verify the focused and full static gates**

Run:

```text
node --test tests/omd-l2-reproduction-page.test.mjs
npm run test
npm run check
npm run build
```

Expected: all commands exit zero; the build includes
`/projects/reproductions/observable-matrix-dynamics-a-share-long-only/`.

- [ ] **Step 8: Commit the evidence panel**

```text
git add src/components/reproduction-note/OMDL2EvidencePanel.astro src/pages/projects/reproductions/[...id].astro tests/omd-l2-reproduction-page.test.mjs
git commit -m "feat(reproductions): present OMD L2 evidence panel"
```

---

### Task 4: Browser QA and publication readiness

**Files:**
- Verify: `src/content/reproductions/academic/observable-matrix-dynamics-a-share-long-only.md`
- Verify: `src/components/reproduction-note/OMDL2EvidencePanel.astro`
- Verify: `src/pages/projects/reproductions/index.astro`
- Verify: generated route under `dist/projects/reproductions/observable-matrix-dynamics-a-share-long-only/index.html`
- Modify only if a browser defect is reproduced: the narrowest affected source file and `tests/omd-l2-reproduction-page.test.mjs`

**Interfaces:**
- Consumes: the complete static site from Tasks 1–3.
- Produces: a browser-verified, merge-ready branch with no console errors or route regressions.

- [ ] **Step 1: Start the built preview**

Run after `npm run build`:

```text
npm run preview -- --host 127.0.0.1
```

Use the assigned local URL; do not assume a port if Astro selects another one.

- [ ] **Step 2: Verify the reproduction index in a real browser**

At desktop width 1440×900 and mobile width 390×844:

- open `/projects/reproductions/`;
- confirm Academic Papers count increases to 1;
- confirm the featured OMD card appears;
- filter Source Type to Academic and confirm only the OMD card remains;
- open the card and confirm the canonical URL.

- [ ] **Step 3: Verify the L2 detail page**

At both widths and in both light and dark themes:

- stitched 20.22% and 19.13% cards are visible without interaction;
- capital starts at 100m and switches to 500m;
- `aria-pressed` follows the selected capital;
- the chart shows negative OOS1 CSI 1000 visibly below/left of zero;
- the exact table contains both capital scenarios and all three indices;
- official-index and PIT equal-weight labels/caveats are distinct;
- `Implementation Private` appears and no code button appears;
- the page has no horizontal document overflow at 390px;
- direct route refresh succeeds;
- browser console contains no errors.

- [ ] **Step 4: Verify existing reproduction isolation**

Open `/projects/reproductions/stock-index-futures-roll-basis-timing/` and confirm
its custom research-note layout and interactions are unchanged.

- [ ] **Step 5: Fix only reproduced browser defects**

For each actual defect, first add a focused assertion to
`tests/omd-l2-reproduction-page.test.mjs`, verify it fails, apply the smallest
source change, and rerun the focused test. Do not redesign unrelated pages.

- [ ] **Step 6: Run the final verification suite**

```text
npm run test
npm run check
npm run build
git diff --check
git status --short
```

Expected: test/check/build/diff-check exit zero; status contains only reviewed
task changes or is clean after the final commit.

- [ ] **Step 7: Commit any browser-only fixes**

If Step 5 changed files:

```text
git add tests/omd-l2-reproduction-page.test.mjs src/components/reproduction-note/OMDL2EvidencePanel.astro src/pages/projects/reproductions/[...id].astro src/content/reproductions/academic/observable-matrix-dynamics-a-share-long-only.md
git commit -m "fix(reproductions): polish OMD L2 responsive evidence"
```

If no files changed, do not create an empty commit.

---

## Post-plan review and release sequence

After all task reviews and the whole-branch review are clean:

1. Re-run `npm run test`, `npm run check`, and `npm run build` on the feature branch.
2. Merge `codex/omd-l2-reproduction-page` into the current website `main` without
   touching unrelated untracked `docs/` or `tmp/` files.
3. Re-run the same three commands on merged `main`.
4. Push `main` to `origin`; do not force-push.
5. Wait for the existing GitHub Pages workflow to finish.
6. Verify the public index and
   `https://lorien-lab.github.io/projects/reproductions/observable-matrix-dynamics-a-share-long-only/`
   in a real browser.
7. Report the public URL, merge commit, test results, deployment status, and any
   still-private artifacts.

If merge verification, push, workflow, or public-browser verification fails,
stop and report the concrete failure. Do not claim the page is published.
