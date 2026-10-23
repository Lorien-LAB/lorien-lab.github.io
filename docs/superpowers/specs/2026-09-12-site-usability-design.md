# Library navigation and reading improvements

The user approved all five findings from the September 12 review. Implement the existing design's usability improvements, with no content ingestion or research-data changes.

1. Derive a shared ordered domain menu from actual Knowledge entries. Keep existing domain identities, including Finance and Interview Strategy & Communication, and include future unknown domains. Homepage domain links carry URL search parameters. Knowledge search/type/domain state survives reload, can be shared, and respects back/forward navigation; invalid filters fall back to all entries.
2. Put search and filters immediately after a compact title/description, within the first mobile viewport. Replace three large landing gateways with compact topical links. Keep the entire static index, with featured content after it and all entries available without JavaScript. Preserve learning-resource attribution on its dedicated gateway/detail page.
3. Use one shared anchor clearance below the sticky header. Clear title visibility is required for section and heading hashes on desktop/mobile.
4. Make the reproduction NAV/drawdown SVG adapt its coordinate width to the container while keeping readable labels and adequate height. Include dates, tap/keyboard inspection, consistent colors, mode/range behavior, and resize handling. Preserve all research values and existing financial calculations/caveats.
5. Translate library interface titles, labels, buttons, empty/result states, compact topic links, card metadata, and directory controls. Preserve the English source titles/body when no translation exists. Native options/placeholders follow language changes without resetting filters or changing URLs.

Validation: focused failing tests before each functional change; real-browser desktop/mobile checks; all existing tests, directory checks, Astro check, production build. Add a development-only Playwright runner for repeatable CI browser checks, keeping production dependencies unchanged. Run the installed built-in browser for visual QA; the Playwright runner is also required locally to prove CI compatibility.

Work in `.worktrees/site-usability` on `codex/site-usability` from `1f8cd5a`. Preserve source PDFs, unrelated local files, content collections, hidden ledgers and deployment settings. This implementation is delivered for review before a new merge/push.
