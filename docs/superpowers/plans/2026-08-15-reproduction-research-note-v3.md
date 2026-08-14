# Reproduction Research Note V3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the stock-index-futures reproduction page into a Chinese-first Quant Research Dashboard × Research Narrative that explains the original Orient Futures strategy, demonstrates the reproduction audit, and compares the latest Lorien Lab optimization using traceable annualized-return, risk, OOS and NAV evidence.

**Architecture:** Keep the existing generic reproduction route for all other entries. For `stock-index-futures-roll-basis-timing`, render a dedicated reusable `researchNote` composition backed by one machine-readable data module. The data module separates `paper`, `reproduced`, and `optimized` provenance, uses the latest H–M recommendation (IC 3-factor + asymmetric 10/5 hysteresis + deep-discount anchor q=0.15), and feeds both the hero dashboard and interactive charts so numbers cannot drift.

**Tech Stack:** Astro 5, TypeScript, vanilla browser SVG/DOM, Node built-in test runner. No new charting or UI dependency.

## Global Constraints

- Canonical URL remains `/projects/reproductions/stock-index-futures-roll-basis-timing/`.
- Language is Chinese-first with precise English research terminology.
- Original report screenshots/PDF pages are not embedded; all diagrams are original Lorien Lab visuals.
- Paper numbers, reproduced numbers, and optimized numbers are visibly labeled by provenance.
- No synthetic paper NAV is plotted.
- Headline comparison period ends at `2026-06-26` for source comparability; OOS begins `2025-10-01`.
- Hero must directly expose absolute annualized return, Sharpe and max drawdown, plus relative improvement/OOS/turnover.
- Latest recommended IC optimization is `3-factor (ADR removed) + asymmetric hysteresis in10/out5 + deep-discount anchor q=0.15`, supported by `optimization_report2_newdirections.md`.
- Preserve current generic reproduction mode for all other records.
- Dashboard and visualizations support the narrative; they must not replace explanations of the original strategy and research reasoning.

---

## File Map

- Create `src/data/reproduction-research-note/stock-index-futures-roll-basis-timing.ts` — single typed research-note data source: provenance metrics, model pipeline, factor evidence, ablations, sensitivity, limitations and chart configuration.
- Create `src/components/reproduction-note/ResearchNoteHero.astro` — first-screen absolute/relative performance dashboard.
- Create `src/components/reproduction-note/InteractivePerformanceChart.astro` — NAV + drawdown + range/tabs + dynamic metrics.
- Create `src/components/reproduction-note/OriginalStrategyStory.astro` — opportunity, roll-premium mechanism and 10→55→7→18 pipeline.
- Create `src/components/reproduction-note/ReproductionAuditStory.astro` — rebuild-from-scratch + factor evidence + what did not reproduce.
- Create `src/components/reproduction-note/OptimizationStory.astro` — ADR diagnosis, ablations, hysteresis mechanism, sensitivity and cross-maturity check.
- Create `src/components/reproduction-note/ResearchAuditAppendix.astro` — score, limitations, provenance and artifacts at page end.
- Modify `src/pages/projects/reproductions/[...id].astro` — opt the target slug into V3 research-note composition while preserving generic mode.
- Modify `src/content/reproductions/broker/stock-index-futures-roll-basis-timing.md` — concise source metadata/narrative copy; remove duplicate V2 presentation data from the main reading path.
- Modify `src/components/ReproductionCharts.astro` only if needed to keep generic V2 compatibility; V3 must not depend on its old stacked layout.
- Create `tests/reproduction-research-note-v3.test.mjs`.

---

### Task 1: Lock the V3 evidence contract

**Files:**
- Create: `tests/reproduction-research-note-v3.test.mjs`
- Create: `src/data/reproduction-research-note/stock-index-futures-roll-basis-timing.ts`

**Produces:** a single exported `researchNoteData` object consumed by every V3 component.

- [ ] **Step 1: Write RED tests** asserting the data source contains:
  - `cutoff: '2026-06-26'`, `oosStart: '2025-10-01'`;
  - provenance buckets `paper`, `reproduced`, `optimized`;
  - absolute annualized-return / Sharpe / max-drawdown fields;
  - paper IC full-sample annualized `13.6%`, reproduced `12.4%`, latest optimized `13.2%`;
  - latest optimized improvement `+1.30%`, OOS `+5.38%`, switches `~3.8`;
  - original pipeline counts `10`, `55`, `7`, `18`;
  - seven representative-factor comparisons;
  - ablation rows including remove-ADR, symmetric hysteresis, asymmetric 10/5, level/adaptive alternatives, IM negative control and cross-maturity evidence.
- [ ] **Step 2: Run `npm test` and verify the new test fails because the data module does not exist.**
- [ ] **Step 3: Implement the typed data module.** Every numeric string must include a `source`/`provenance` label or live inside a provenance-named object. Preserve source conflicts in notes rather than reconciling silently.
- [ ] **Step 4: Run `npm test`; expect PASS for the data-contract tests.**
- [ ] **Step 5: Commit `test/data: lock reproduction research note v3 evidence contract`.**

### Task 2: Build the first-screen research dashboard

**Files:**
- Create: `src/components/reproduction-note/ResearchNoteHero.astro`
- Modify: `src/pages/projects/reproductions/[...id].astro`
- Test: `tests/reproduction-research-note-v3.test.mjs`

**Consumes:** `researchNoteData.hero`.

- [ ] **Step 1: Extend the RED test** to require the V3 route composition and visible strings `Annualized Return`, `Sharpe`, `Max Drawdown`, `Orient Futures`, `Reproduced`, `Optimized`, `13.6%`, `12.4%`, `13.2%`, `+5.38%`, and `Higher performance, without higher turnover.`
- [ ] **Step 2: Run the focused test and verify failure.**
- [ ] **Step 3: Implement `ResearchNoteHero.astro`.** Layout: research statement + provenance strip + three large annualized-return cells; risk metrics underneath; relative-improvement/OOS/turnover strip below. Use semantic headings and avoid a dense card wall.
- [ ] **Step 4: Route only the target slug through V3.** Generic entries keep the existing rendering path.
- [ ] **Step 5: Run `npm test` and `npm run check`; expect PASS/0 errors.**
- [ ] **Step 6: Commit `feat: add annualized-return research dashboard hero`.**

### Task 3: Replace stacked NAV charts with one interactive research chart

**Files:**
- Create: `src/components/reproduction-note/InteractivePerformanceChart.astro`
- Modify: `src/data/reproduction-research-note/stock-index-futures-roll-basis-timing.ts`
- Modify/read: `src/data/reproduction-charts/stock-index-futures-roll-basis-timing.json`
- Test: `tests/reproduction-research-note-v3.test.mjs`

**Interface:** props `{ mode?: 'roll' | 'arb' }`; client logic gets serializable chart arrays from the data module.

- [ ] **Step 1: Write failing tests** requiring `Roll Timing | Cross-Maturity Arbitrage`, `All | In Sample | OOS`, `OUT OF SAMPLE`, NAV and Drawdown labels, and no `paperNav`/synthetic paper series.
- [ ] **Step 2: Verify RED.**
- [ ] **Step 3: Build the chart component** with vanilla SVG:
  - one NAV panel and linked drawdown panel;
  - tabs for roll/arbitrage;
  - range buttons All/IS/OOS;
  - hover crosshair + date + series values;
  - OOS shaded region beginning 2025-10-01;
  - dynamic metric strip recalculated from the selected machine-readable series where supported;
  - no external chart package.
- [ ] **Step 4: Use only Lorien Lab run series.** Paper results are annotation metrics, never a plotted daily line. Trim headline comparison to 2026-06-26 even if the source JSON contains later dates.
- [ ] **Step 5: Run test/check/build and verify the target static HTML contains the interactive controls and serializable chart payload.**
- [ ] **Step 6: Commit `feat: add interactive nav drawdown research chart`.**

### Task 4: Explain the original report as a real quantitative model

**Files:**
- Create: `src/components/reproduction-note/OriginalStrategyStory.astro`
- Modify: target reproduction Markdown only where long-form prose is still needed.
- Test: V3 test.

- [ ] **Step 1: Add failing copy/structure tests** for:
  - `01 · The Opportunity`;
  - roll premium / convergence mechanism;
  - current-quarter annualized basis as target;
  - `10 primary factors → 55 secondary factors → 7 retained factors → 18 timing methods`;
  - economic-direction + Spearman screening;
  - trend vs reversal method families;
  - `Basis rising → current quarter`, `Basis falling → current month`;
  - Zig-zag explicitly labeled structural/oracle validation, not tradable signal;
  - original report's own failed down-regime cash extension.
- [ ] **Step 2: Verify RED.**
- [ ] **Step 3: Implement two original Lorien Lab visuals:**
  - `discount → convergence → Roll Premium` mechanism;
  - full original strategy pipeline 10→55→7→18→aggregate→maturity allocation.
- [ ] **Step 4: Explain parameter-surface robustness**: broad parameter pools, at least 1/4 parameters above benchmark, top methods selected using Sharpe + stability.
- [ ] **Step 5: Run tests/check/build.**
- [ ] **Step 6: Commit `feat: explain original basis timing model end to end`.**

### Task 5: Turn the reproduction and optimization into a research argument

**Files:**
- Create: `src/components/reproduction-note/ReproductionAuditStory.astro`
- Create: `src/components/reproduction-note/OptimizationStory.astro`
- Test: V3 test.

- [ ] **Step 1: Add RED tests** for:
  - 529 contracts / PIT constituents / roll-return engine / 33 issues audited;
  - seven factor paper-vs-reproduced values;
  - Figure 53 partial reproduction, IM weakness, price-index vs total-return convention;
  - ADR removal improving OOS but exploding turnover;
  - quote-level insight that a weak alpha factor can stabilize ensemble state;
  - aggregate-level hysteresis as the intervention level;
  - sensitivity showing fixed 10-day confirmation has a knee and adaptive confirmation is rejected;
  - latest H–M refinement: deep-discount anchor q=0.15 and IM+IC 50/50;
  - negative controls and rejected experiments;
  - cross-maturity result used as mechanism check, not marketing claim.
- [ ] **Step 2: Verify RED.**
- [ ] **Step 3: Implement reproduction evidence** as a compact comparison visual (factor dumbbells/slope rows, not a giant table).
- [ ] **Step 4: Implement optimization narrative** in causal order: observation → hypothesis → experiment → failure/success → selected rule.
- [ ] **Step 5: Implement ablation dashboard and sensitivity visual.** Highlight both accepted and rejected experiments. The latest selected IC configuration must show `+1.30% / +5.38% / ~3.8` and absolute annualized `13.2% / Sharpe 0.65 / MDD -34.8%` with provenance.
- [ ] **Step 6: Run tests/check/build.**
- [ ] **Step 7: Commit `feat: present reproduction diagnosis and ablation research`.**

### Task 6: Move audit metadata to the appendix and verify production quality

**Files:**
- Create: `src/components/reproduction-note/ResearchAuditAppendix.astro`
- Modify: `src/pages/projects/reproductions/[...id].astro`
- Modify: target reproduction Markdown/frontmatter as needed.
- Test: all tests.

- [ ] **Step 1: Add failing assertions** that Pipeline/ReproductionScore are not in the V3 main reading flow and that `Research Audit`, limitations, data/method caveats and artifact links appear after the research story.
- [ ] **Step 2: Implement appendix** containing score, data availability, no-cost caveat, short OOS caveat, source-vs-price-index convention, code/config/reports and result provenance.
- [ ] **Step 3: Ensure artifact links point to `Index-Timing/Reproduction03`, config, reproduction report and the latest optimization/new-directions report.**
- [ ] **Step 4: Run `npm test`, `npm run check`, `npm run build`.** Expected: 0 test failures, 0 Astro errors, static target page built.
- [ ] **Step 5: Inspect built HTML for hero absolute annualized returns, original-model explanation, optimization evidence, `OUT OF SAMPLE`, and absence of copied report images/synthetic paper NAV.**
- [ ] **Step 6: Run a stale-content scan for old V2 hero claims `+1.32%`, `+4.10%`, `4.4` in active target-page source; historical specs/plans may retain history but active V3 presentation must use latest H–M recommendation.**
- [ ] **Step 7: Commit `feat: finalize reproduction research note v3`.**

---

## Verification Gate

Before integration, run fresh on the final feature SHA:

```bash
npm install
npm test
npm run check
npm run build
```

Then assert the built page contains:

```text
Annualized Return
13.6%
12.4%
13.2%
+5.38%
OUT OF SAMPLE
10 primary factors
55 secondary factors
18 timing methods
Asymmetric Hysteresis
Research Audit
```

and does not present a daily paper NAV series.
