# CMM Reproduction Page Implementation Plan

> **For agentic workers:** Execute in the existing `codex/cmm-reproduction-page` worktree. Keep the research worktree read-only and stage only the website files named here.

**Goal:** Publish the approved CMM A-share broker reproduction case study with evidence-bound metrics, one aggregate NAV chart, and rendered browser verification.

**Architecture:** Add one ordinary broker reproduction Markdown record so the existing generic route renders its structured Original vs Reproduced metrics. Copy the already validated aggregate PNG into `public/`. Add one Playwright spec for the index, detail route, private-code state, and chart. Leave schemas and shared page components unchanged.

**Tech Stack:** Astro 5 content collections, Markdown, static PNG, Playwright Chromium, Node 24.

## Global constraints

- Base is current `main` at `6dc04dbcb78c5d2bebd6f192dc0846ad6326f48b`, merged into the clean CMM worktree before implementation.
- Source report: 华福证券, 2026-08-24, 36-page local PDF. The site must not host that PDF or a source-code/position/weight artifact.
- Local evidence: 60-month run `cmm-long-horizon-2021-2026-v1` has passed factor stages but failed parent portfolio; its separate 15-unit delivery is `partial_topn`, passed, and `full_reproduction_passed=false`.
- Website `result` stays `inconclusive`; distinguish source 2020-2026 results from local 2021-2026 results and explain execution/sample mismatch. No Workstream 023 or new CMM backtest.
- Copy only `topn_delivery_cmm_only/figures_long_horizon/long_horizon_nav.png`; keep the benchmark labeled as a no-cost price index, not an ETF or traded account.

## Task 1: Rendered regression first

**File:** Create `tests/e2e/cmm-reproduction.spec.mjs`.

- [x] Add a desktop/mobile test that filters the reproduction index to Broker + CMM, follows the canonical link, and observes a nonblank CMM detail page.
- [x] Assert rendered `Inconclusive`, `Implementation Private`, the five source/local metrics, the benchmark caveat, a loaded NAV image, and no public code artifact link or private path.
- [x] Run `npm run test:browser -- tests/e2e/cmm-reproduction.spec.mjs --project=desktop` against the baseline build and record the expected missing-record failure.

## Task 2: Content and asset

**Files:**
- Create `src/content/reproductions/broker/cmm-path-weighted-momentum-a-share.md`.
- Create `public/reproductions/cmm-path-weighted-momentum-a-share/long-horizon-nav.png` by copying the verified source image.

- [x] Write source-neutral public prose in the approved eight-part order: research question, source mechanism, A-share design, factor evidence, portfolio evidence, benchmark, limitations, conclusion.
- [x] Set broker/analysts/publishDate, `stage: extension`, `result: inconclusive`, `codeVisibility: private`, and five structured metrics. Omit code, source, report-HTML, configuration, and private file URLs.
- [x] Include the 60-month factor and partial TopN provenance, the 2022/2023 losses, 2025 concentration, costs, and the failed complete portfolio/SM Top30 exit-value boundary.
- [x] Copy the aggregate chart without alteration; provide a descriptive `alt`, title, and adjacent text explaining both curve cost conventions.
- [x] Run the focused browser test and `npm run check`; repair only concrete failures.

## Task 3: Full verification and review

- [ ] Run `npm test`, both directory checks, `npm run check`, `npm run build`, and `npm run test:browser` on the final tree.
- [ ] Inspect the rendered desktop and 390×844 mobile page, light/dark display, chart load, link targets, and console errors; save temporary QA screenshots outside the repo.
- [ ] Review `git diff` for factual claims, privacy boundary, readability, and change scope; verify the research source directory remains untouched.
- [ ] Commit only the plan, Markdown, PNG, and focused test to `codex/cmm-reproduction-page`.

## Task 4: Integrate and verify publication

- [ ] Confirm the branch is a fast-forward descendant of current remote `main`; update safely if remote moved, without resetting unrelated work.
- [ ] Fast-forward publish the reviewed branch to remote `main` as approved by the CMM page design and current CMM task selection.
- [ ] Confirm exact-head GitHub validation and Pages deployment separately, then inspect the live index, detail route, and image.
- [ ] Fast-forward the main checkout while preserving its three existing untracked paths; recheck the dirty 022 and other worktree statuses.
