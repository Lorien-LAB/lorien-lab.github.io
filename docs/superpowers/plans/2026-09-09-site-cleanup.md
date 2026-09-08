# Site Cleanup Implementation Plan

> **For agentic workers:** Use subagent-driven-development for the bounded presentation task, while the coordinator owns rendered regression verification and integration.

**Goal:** Restore filtering and chart legends, and reduce visual clutter without changing research content.

**Architecture:** Preserve Astro static pages and native browser interactions. Apply a shared hidden-state rule and host-scoped global selectors for dynamic chart children; simplify existing component styles directly.

**Tech Stack:** Astro 5, CSS, native JavaScript, Node 24, built-in browser.

## Global constraints

- Isolated worktree: `.worktrees/site-cleanup`; branch: `codex/site-cleanup`.
- Preserve all source content, data, routes, dependencies, and deployment configuration.
- Keep meaningful feedback and accessible controls; only remove decorative presentation.

## Tasks

- [x] Establish a clean baseline using `npm ci`, `npm test`, and a local production build.
- [x] Capture failing rendered cases: unmatched knowledge search must show zero rows; `Quant Role` directory search must show one row; each reproduction chart legend swatch must have positive width and height.
- [x] Fix hidden-state rendering in `src/styles/global.css` with `[hidden]:not([hidden="until-found"]) { display: none !important; }`. Fix dynamic child selectors in `src/components/reproduction-note/InteractivePerformanceChart.astro` with `.legend :global(span)`, `.legend :global(i)`, and `.svg-host :global(svg)`.
- [x] Simplify global card/button/tag presentation and the chart hero; delegate bounded component cleanup according to the design, with exclusive file ownership.
- [x] Repeat real browser assertions for search, type/domain, empty/reset, directory, and chart mode changes. Check desktop/mobile layout and theme/language/menu controls.
- [x] Run `npm test`, `npm run knowledge:directory:check`, `npm run master:directory:check`, `npm run check`, and `npm run build`; perform an independent correctness/scope review.
- [x] Record verification results and deliver the branch and local preview. Do not push or merge as part of this request.

## Verification record — 2026-09-09

- Node suite: 641 passed, zero failures. Both directory checks passed.
- Astro check: zero errors/warnings, two existing hints (ReproductionCharts inline script and an unused test import).
- Production build: 190 pages generated.
- Real browser regressions: 13/13 passed at desktop size and 13/13 at 390 × 844. Confirmed zero rendered rows for unmatched search, intersecting filters, reset, matching directory counts, and visible legend swatches across all three modes.
- Before the fix, unmatched search rendered 73 rows, directory search rendered two rows for one match, and every legend swatch had zero width. The regression checks directly detected those failures.
- The connected Chrome browser was used after the in-app browser connection timed out. Browser warnings/errors were empty for the tested flows.
- Visual checks: desktop dark/English home, mobile light/Chinese home, knowledge index, research/project index, and reproduction chart. No horizontal page overflow at 390 px in these inspected routes; mobile menu and language/theme persistence worked.
- Independent code review and whitespace validation passed. Research content, Quant Interview state, dependency lockfile, and deployment configuration remain unchanged.
- The browser suite is explicit (`tests/browser/README.md`), not part of `npm test` or CI. Production deployment and exhaustive content verification are outside this change.
