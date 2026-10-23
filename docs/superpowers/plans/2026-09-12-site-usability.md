# Site Usability Implementation Plan

> **For agentic workers:** Use subagent-driven-development for independent chart and CI tasks. The coordinator owns library implementation and overall verification.

**Goal:** Complete the five approved navigation, search, anchor, mobile-chart and Chinese-interface improvements.

**Architecture:** Extend the current Astro pages with shared domain/filter helpers, bilingual markup, responsive SVG geometry and real-browser regressions. Preserve content and data.

**Tech Stack:** Astro, native JS/CSS/SVG, Node 24, development-only Playwright.

## Ownership and tasks

- [x] Baseline: install locked dependencies, run Node tests, and build the current site.
- [x] Coordinator: add behavioral tests for domain enumeration and URL encoding/decoding, then implement `src/lib/knowledgeLibrary.mjs` and `src/data/i18n/knowledgeUi.mjs`.
- [x] Coordinator: update `src/pages/index.astro`, `src/pages/knowledge/index.astro`, `src/components/KnowledgeCard.astro` and directory interface text. Domain links must retain their identity, filters must compose and reset correctly, search must be within the first 844px viewport.
- [x] Coordinator: add shared `scroll-margin-top` for page targets in `src/styles/global.css`, measured against the header after navigation.
- [x] Chart worker: own `src/components/reproduction-note/InteractivePerformanceChart.astro`, optional dedicated geometry helper, and its focused Node tests. Verify label scale, dimensions, selection, range and resize behavior. Do not edit data.
- [x] CI worker: own `playwright.config.mjs`, `tests/e2e/`, `tests/browser/README.md`, `.github/workflows/validate.yml` and `.gitignore`. Add desktop/mobile E2E tests calling the existing browser suite plus URL/search/anchor/chart/language checks. Coordinator installs development dependency and adds npm scripts.
- [x] Coordinator: run all gates and real-browser checks, review desktop/mobile screenshots and fix regressions. Request independent final code review.
- [x] Record real verification results, commit the reviewed branch and provide local preview. Do not merge or push during this implementation turn.

## Acceptance examples

- Clicking Machine Learning on home opens `knowledge/?domain=Machine+Learning#knowledge-index`, with only matching entries visible.
- Every actual entry domain appears in the dropdown; current Finance count is 3 and Interview Strategy & Communication count is 6.
- A copied URL containing `domain`, `type`, and `q` reproduces the same visible rows. Reload and Back preserve the applicable filter state. Reset clears only these filter parameters.
- Search is above the long index and compact topical navigation at 390 × 844; selected count and empty state reflect rendered rows.
- Switching to Chinese updates native option labels and placeholders without clearing the selected domain or query.
- Hash targets start below the sticky header. On a 390px viewport chart text remains approximately 11px or larger instead of shrinking to 3.4px.
- Existing full-sample/range statistics and original data remain unchanged; keyboard/touch selection reveals corresponding dates and values.

## Verification — 2026-09-12

- Baseline: 641 Node tests passed. New domain/filter tests initially failed before the helper existed; browser tests demonstrated missing domain/query state, buried search, unreadable chart text, missing pointer controls, and anchor overlap on the previous build.
- Final: 650 Node tests and 26 Chromium E2E tests passed (13 desktop, 13 mobile). Both directory checks, Astro check and build passed; 190 static pages generated. Two pre-existing Astro hints remain.
- Real connected-browser QA at 390 × 844: Chinese search starts at about 281px instead of about 4504px; Finance selects three results; no page overflow. Chart SVG is 309 × 280 with a matching viewBox and 11px labels. Anchor heading begins at 95.75px below the 73px header.
- Desktop library layout, Chinese native labels/placeholders, directory stats, mobile menu, and responsive chart were visually inspected. Tests verify reload/back/forward, reset, both pointer panels, keyboard selection, and resize preservation.
- Independent review found nested-span stats padding and a weak pointer assertion; both were corrected and scoped re-review passed. Native child label padding is zero. Pointer tests require actual index and visible value changes.
- Playwright 1.63.0 is pinned as a development dependency. CI is wired for PR/main pushes; the same runner passed locally. No new remote CI run or deployment is claimed before branch integration.
- Content collections, source materials and hidden Quant Interview state are unchanged. English knowledge bodies and untranslated source titles remain intact; interface and featured-entry translations are separate.
