# Reproduction Research Note V3.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Promote the 39.9% research portfolio to the unique hero focus, place the remaining three strategy variants in a subordinate side-by-side strategy stack, preserve the paper-to-portfolio research lineage, and add the flagship portfolio to the existing interactive performance workspace.

**Architecture:** Extend the existing single research-note data module with a dedicated `portfolio` contract and expose the stored `Roll + 1.0× Arb` machine-readable chart as `charts.portfolio`. Keep `ResearchNoteHero.astro` responsible for first-screen hierarchy and research evolution, and keep `InteractivePerformanceChart.astro` responsible for strategy-tab switching and interval metrics. Do not modify the long-form V3 research narrative components.

**Tech Stack:** Astro 5, TypeScript data modules, vanilla client-side SVG/DOM charting, Node built-in test runner, GitHub Pages.

## Global Constraints

- Chinese-first copy with precise English quant labels.
- `39.9% / Sharpe 1.46 / Max Drawdown -24.2%` belongs only to `FLAGSHIP PORTFOLIO` = `IC Roll Timing + 1.0× Cross-Maturity Arbitrage`.
- Exactly three subordinate strategy cards: `Optimized Roll Timing`, `Cross-Maturity Arbitrage 6×`, `Roll + 0.5× Arb`.
- Strategy-card annualized returns: `13.2%`, `22.6%`, `26.3%`.
- Preserve `From Paper to Portfolio`: `13.6% → 12.4% → 13.2% → 39.9%`.
- Interactive tabs: `Optimized Roll`, `Cross-Maturity Arb`, `Flagship Portfolio`.
- Only stored Lorien Lab machine-readable NAV series may be plotted; never synthesize a paper NAV or reconstruct portfolio NAV from summary metrics alone.
- Preserve `All | In Sample | OOS`, OOS shading, NAV, drawdown, hover, dynamic annualized return, approximate `Sharpe*`, max drawdown, and window.
- Do not modify V3 long-form narrative, audit, optimization, or appendix components unless required for a regression fix.
- Before integration run `npm test`, `npm run check`, and `npm run build`.

---

### Task 1: Lock the V3.1 presentation contract with failing tests

**Files:**
- Create: `tests/reproduction-research-note-v3-1.test.mjs`
- Create temporarily: `.github/workflows/reproduction-research-note-v3-1-ci.yml`

**Interfaces:**
- Consumes: current V3 data module, hero, and interactive chart files.
- Produces: executable contract for Tasks 2–4.

- [ ] **Step 1: Write failing V3.1 contract tests**

Create tests that read source files and assert:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const dataPath = 'src/data/reproduction-research-note/stock-index-futures-roll-basis-timing.ts';
const heroPath = 'src/components/reproduction-note/ResearchNoteHero.astro';
const chartPath = 'src/components/reproduction-note/InteractivePerformanceChart.astro';

test('v3.1 data defines the flagship portfolio and exactly three subordinate strategies', async () => {
  const source = await readFile(dataPath, 'utf8');
  for (const token of ['portfolio:', 'FLAGSHIP PORTFOLIO', '39.9%', '1.46', '-24.2%', 'CORE STRATEGY', 'ALPHA OVERLAY', 'DIVERSIFIED PORTFOLIO', '13.2%', '22.6%', '26.3%']) {
    assert.ok(source.includes(token), `missing ${token}`);
  }
  assert.match(source, /strategies:\s*\[[\s\S]*?\][,\n]/);
});

test('hero makes flagship performance visually primary and keeps three subordinate strategy cards', async () => {
  const hero = await readFile(heroPath, 'utf8');
  for (const token of ['FLAGSHIP PORTFOLIO', 'Annualized Return', '39.9%', 'Sharpe', '1.46', 'Max Drawdown', '-24.2%', 'strategy-stack', 'From Paper to Portfolio']) {
    assert.ok(hero.includes(token), `hero missing ${token}`);
  }
  assert.match(hero, /data\.portfolio\.strategies\.map/);
  assert.ok(!hero.includes('const cols = [data.hero.paper, data.hero.reproduced, data.hero.optimized]'), 'old equal-weight three-column hero still active');
});

test('research evolution preserves paper to portfolio lineage', async () => {
  const hero = await readFile(heroPath, 'utf8');
  for (const token of ['Orient Futures', 'Independent Reproduction', 'Optimized Roll Timing', 'Research Portfolio', '13.6%', '12.4%', '13.2%', '39.9%']) {
    assert.ok(hero.includes(token), `evolution missing ${token}`);
  }
});

test('interactive workspace exposes optimized roll, cross-maturity arb, and flagship portfolio only', async () => {
  const chart = await readFile(chartPath, 'utf8');
  for (const token of ['Optimized Roll', 'Cross-Maturity Arb', 'Flagship Portfolio', 'data-mode="portfolio"']) {
    assert.ok(chart.includes(token), `chart missing ${token}`);
  }
  assert.ok(!chart.includes('Roll + 0.5× Arb</button>'), '0.5x mix should not become a primary chart tab');
});

test('portfolio chart uses stored chart data rather than synthetic summary reconstruction', async () => {
  const source = await readFile(dataPath, 'utf8');
  assert.match(source, /portfolioChart|flagshipChart/);
  assert.match(source, /charts\.find/);
  assert.match(source, /charts:\s*\{[^}]*portfolio/s);
  assert.doesNotMatch(source, /39\.9[^\n]{0,120}cumprod|summary[^\n]{0,120}NAV/i);
});
```

- [ ] **Step 2: Add branch-only CI**

Create a workflow scoped only to `reproduction-research-note-v3-1` that runs:

```yaml
- run: npm install
- run: npm test
- run: npm run check
- run: npm run build
- name: Verify V3.1 output
  run: |
    PAGE=dist/projects/reproductions/stock-index-futures-roll-basis-timing/index.html
    test -f "$PAGE"
    grep -q '39.9%' "$PAGE"
    grep -q 'FLAGSHIP PORTFOLIO' "$PAGE"
    grep -q 'From Paper to Portfolio' "$PAGE"
```

- [ ] **Step 3: Run CI and confirm RED**

Expected: existing V3 tests remain green while V3.1 tests fail because `portfolio`, flagship hero hierarchy, and portfolio tab do not yet exist.

- [ ] **Step 4: Commit the RED contract**

Commit message:

```text
test: define reproduction research note v3.1 contract
```

---

### Task 2: Extend the research-note data contract with the strategy stack and stored flagship chart

**Files:**
- Modify: `src/data/reproduction-research-note/stock-index-futures-roll-basis-timing.ts`
- Test: `tests/reproduction-research-note-v3-1.test.mjs`

**Interfaces:**
- Consumes: existing `rawCharts`, `trimChart`, current roll/arb chart selection.
- Produces: `researchNoteData.portfolio`, `researchNoteData.evolution`, `researchNoteData.charts.portfolio`.

- [ ] **Step 1: Add stored flagship chart selection**

Select the existing stored combination chart by title, e.g. a title beginning with the repository's existing `组合（IC 滚贴水 + 跨期 1:1）` label, then pass it through `trimChart`:

```ts
const portfolioChart = trimChart(
  charts.find((c) => c.title.startsWith('组合（IC 滚贴水 + 跨期 1:1）')),
);
```

If the stored title differs, use the exact existing JSON title; do not create a new series from the headline metrics.

- [ ] **Step 2: Add the portfolio performance contract**

Add:

```ts
portfolio: {
  flagship: {
    role: 'FLAGSHIP PORTFOLIO',
    name: 'IC Roll Timing + 1.0× Cross-Maturity Arbitrage',
    annualizedReturn: '39.9%',
    sharpe: '1.46',
    maxDrawdown: '-24.2%',
    note: 'Beta-bearing Roll Premium strategy + beta-neutral cross-maturity alpha stream.',
  },
  strategies: [
    {
      role: 'CORE STRATEGY',
      name: 'Optimized Roll Timing',
      annualizedReturn: '13.2%',
      sharpe: '0.65',
      maxDrawdown: '-34.8%',
      note: '3 factors + asymmetric Hysteresis 10/5 + deep-discount anchor q=0.15',
    },
    {
      role: 'ALPHA OVERLAY',
      name: 'Cross-Maturity Arbitrage 6×',
      annualizedReturn: '22.6%',
      sharpe: '1.32',
      maxDrawdown: '-20.2%',
      note: 'Beta-neutral cross-maturity spread alpha stream',
    },
    {
      role: 'DIVERSIFIED PORTFOLIO',
      name: 'Roll + 0.5× Arb',
      annualizedReturn: '26.3%',
      sharpe: '1.14',
      maxDrawdown: '-27.8%',
      note: 'Intermediate allocation between the core beta strategy and alpha overlay',
    },
  ],
},
```

- [ ] **Step 3: Add research evolution data**

Add a four-step array:

```ts
evolution: [
  { label: 'Orient Futures', annualizedReturn: '13.6%', kind: 'report' },
  { label: 'Independent Reproduction', annualizedReturn: '12.4%', kind: 'reproduction' },
  { label: 'Optimized Roll Timing', annualizedReturn: '13.2%', kind: 'strategy' },
  { label: 'Research Portfolio', annualizedReturn: '39.9%', kind: 'portfolio' },
],
```

- [ ] **Step 4: Expose the portfolio chart**

Change:

```ts
charts: { roll: rollChart, arb: arbChart, portfolio: portfolioChart },
```

- [ ] **Step 5: Run focused tests**

Run `npm test` in branch CI. Expected: data-contract tests pass; hero/chart tests remain red.

- [ ] **Step 6: Commit**

Commit message:

```text
feat: add flagship portfolio research note data
```

---

### Task 3: Rebuild the hero around the flagship portfolio and strategy stack

**Files:**
- Modify: `src/components/reproduction-note/ResearchNoteHero.astro`
- Test: `tests/reproduction-research-note-v3-1.test.mjs`

**Interfaces:**
- Consumes: `data.portfolio.flagship`, `data.portfolio.strategies`, `data.evolution`.
- Produces: first-screen flagship block, exactly three subordinate strategy cards, compact research-evolution strip.

- [ ] **Step 1: Remove the equal-weight paper/reproduced/optimized three-column hero**

Delete the old `cols` rendering path and replace it with one flagship block:

```astro
<section class="flagship-performance">
  <div class="flagship-role">{data.portfolio.flagship.role}</div>
  <div class="flagship-value">{data.portfolio.flagship.annualizedReturn}</div>
  <div class="flagship-label">Annualized Return</div>
  <div class="flagship-risk">
    <span>Sharpe <strong>{data.portfolio.flagship.sharpe}</strong></span>
    <span>Max Drawdown <strong>{data.portfolio.flagship.maxDrawdown}</strong></span>
  </div>
  <h2>{data.portfolio.flagship.name}</h2>
  <p>{data.portfolio.flagship.note}</p>
</section>
```

- [ ] **Step 2: Render exactly three subordinate cards**

Use:

```astro
<div class="strategy-stack">
  {data.portfolio.strategies.map((strategy: any) => (
    <article class="strategy-card">
      <div class="strategy-role">{strategy.role}</div>
      <h3>{strategy.name}</h3>
      <strong class="strategy-return">{strategy.annualizedReturn}</strong>
      <span>Annualized Return</span>
      <div class="strategy-risk">...</div>
      <p>{strategy.note}</p>
    </article>
  ))}
</div>
```

The card headline typography must remain materially smaller than `39.9%`.

- [ ] **Step 3: Add `From Paper to Portfolio` below the strategy stack**

Render `data.evolution` as a compact four-step row, with arrows/separators and the final step visually marked as portfolio construction rather than another reproduction metric.

- [ ] **Step 4: Keep provenance and metadata concise**

Retain source/reproduction provenance and report metadata, but move them visually below the performance hierarchy so they do not compete with 39.9%.

- [ ] **Step 5: Implement responsive hierarchy**

Desktop: flagship block → three equal-width subordinate cards → four-step evolution row.

Mobile: flagship first; cards stack; evolution becomes vertical or horizontally scrollable without reducing the flagship below card prominence.

- [ ] **Step 6: Run tests and build**

Expected: hero V3.1 tests pass; chart test remains red until Task 4.

- [ ] **Step 7: Commit**

Commit message:

```text
feat: promote flagship research portfolio in hero
```

---

### Task 4: Add the flagship portfolio to the interactive performance workspace

**Files:**
- Modify: `src/components/reproduction-note/InteractivePerformanceChart.astro`
- Test: `tests/reproduction-research-note-v3-1.test.mjs`

**Interfaces:**
- Consumes: `data.charts.roll`, `data.charts.arb`, `data.charts.portfolio`.
- Produces: three primary strategy modes with shared range/hover/drawdown behavior.

- [ ] **Step 1: Rename and extend strategy tabs**

Render exactly:

```astro
<button class="mode active" data-mode="roll">Optimized Roll</button>
<button class="mode" data-mode="arb">Cross-Maturity Arb</button>
<button class="mode" data-mode="portfolio">Flagship Portfolio</button>
```

Do not add `Roll + 0.5× Arb` as a tab.

- [ ] **Step 2: Make title/subtitle mode-aware**

Use a label map in the inline script:

```js
const modeLabels = {
  roll: ['Optimized Roll', 'Core strategy vs passive benchmark'],
  arb: ['Cross-Maturity Arb', '6× spread strategy vs positive-spread benchmark'],
  portfolio: ['Flagship Portfolio', 'IC Roll Timing + 1.0× Cross-Maturity Arbitrage'],
};
```

Update both title and subtitle each render.

- [ ] **Step 3: Preserve all current interval behavior**

Do not alter the mechanics of:

- `All | In Sample | OOS`
- OOS shading
- hover values
- drawdown
- dynamic annualized return
- approximate sampled `Sharpe*`
- max drawdown
- selected window

- [ ] **Step 4: Keep series labeling truthful**

For the first plotted series, label it by selected mode rather than always `Optimized`; preserve source names for benchmark/index reference lines.

- [ ] **Step 5: Run full tests/check/build**

Run:

```text
npm test
npm run check
npm run build
```

Expected: zero test failures; Astro check zero errors; target page builds.

- [ ] **Step 6: Commit**

Commit message:

```text
feat: add flagship portfolio performance tab
```

---

### Task 5: Verify output, clean temporary CI, and prepare integration

**Files:**
- Delete: `.github/workflows/reproduction-research-note-v3-1-ci.yml`
- Review: all V3.1 changed files

**Interfaces:**
- Consumes: completed V3.1 branch.
- Produces: clean integration-ready branch with no temporary CI workflow.

- [ ] **Step 1: Inspect the rendered static page in CI**

Require the target HTML to contain:

```text
39.9%
FLAGSHIP PORTFOLIO
CORE STRATEGY
ALPHA OVERLAY
DIVERSIFIED PORTFOLIO
From Paper to Portfolio
Flagship Portfolio
```

- [ ] **Step 2: Read final CI logs**

Verify:

- all tests pass;
- `npm run check` reports zero errors;
- `npm run build` succeeds;
- target page output exists.

- [ ] **Step 3: Compare branch to `main`**

Confirm the diff is limited to:

- V3.1 spec/plan;
- V3.1 tests;
- research-note data module;
- hero;
- interactive chart;
- temporary CI deletion.

No V3 long-form narrative component should change.

- [ ] **Step 4: Delete temporary branch-only CI workflow**

Delete `.github/workflows/reproduction-research-note-v3-1-ci.yml` after a green run.

- [ ] **Step 5: Confirm cleanup-only final commit**

The cleanup commit must contain only workflow deletion.

- [ ] **Step 6: Invoke verification-before-completion and finishing-a-development-branch**

Present the standard integration menu only after fresh green verification evidence.
