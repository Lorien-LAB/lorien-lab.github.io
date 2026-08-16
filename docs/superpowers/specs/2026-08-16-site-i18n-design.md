# Lorien Lab Chinese-English Site Switch Design

## Goal

Add a clear Chinese / English switch to the Lorien Lab website while keeping the current Astro routing and deployment model unchanged and minimizing merge conflicts with concurrent Knowledge work.

## Constraints

- All work lives on `chatgpt/i18n-zh-en-2026-08-16` until it is ready to merge.
- Do not edit `src/content/knowledge/**` in this feature branch.
- Avoid editing Knowledge article bodies or schemas that another Agent may be changing.
- Keep the current English URLs; do not introduce `/en/` and `/zh/` route duplication in this phase.
- Default language remains English so existing visitors and SEO behavior do not change unexpectedly.
- The selected language must persist across navigation and reloads.
- The switch must work in both desktop and mobile headers and remain keyboard/screen-reader accessible.

## Approach

Use a lightweight client-side language state stored in `localStorage` under `site-language`. `BaseLayout.astro` initializes `html[data-lang]` before paint and keeps the native `<html lang>` attribute synchronized. Bilingual UI copy is rendered in both languages with `.lang-en` and `.lang-zh` spans; global CSS deterministically shows the active language and hides the inactive one.

This approach is preferred over locale-prefixed routes because it does not duplicate every Astro page, does not require a content migration, and creates very little overlap with the ongoing Knowledge ingestion branch.

## Components

### `LanguageToggle.astro`

A compact segmented control showing `EN` and `中文`. Each button has a `data-language-option` value and updates `html[data-lang]`, `<html lang>`, `localStorage`, `aria-pressed`, and its accessible label.

### `BaseLayout.astro`

Adds `data-lang="en"` to the root element and an inline pre-paint initializer. Invalid or missing stored values fall back to English.

### Global language visibility

`src/styles/global.css` defines the only shared visibility rules:

- English mode hides `.lang-zh`.
- Chinese mode hides `.lang-en`.

The hidden copy uses `display: none`, so screen readers only encounter the active language.

### Shared UI coverage

This feature translates the global shell and the homepage hero immediately:

- Header navigation and brand subtitle.
- Language control labels.
- Footer summary/build line.
- Homepage hero headline, summary, CTA labels, metadata, research-stack labels, and image accessibility labels.

Other pages can adopt the same `.lang-en` / `.lang-zh` pattern incrementally without changing the language state implementation.

## Knowledge isolation

The feature intentionally does not modify `src/content/knowledge/**`. The Knowledge page will still receive the bilingual Header/Footer because those are shared globally, while its article/index content remains untouched until the concurrent Knowledge work is merged.

## Error handling

- `localStorage` access is wrapped so privacy/security restrictions do not break rendering.
- Only `en` and `zh` are accepted.
- The site remains fully usable when JavaScript is unavailable; English is rendered by default.

## Testing

A repository contract test verifies:

1. `BaseLayout` has a deterministic English default and persistent language state.
2. `Header` includes the bilingual toggle and English/Chinese navigation copy.
3. Shared shell and Hero include bilingual content.
4. Global CSS contains deterministic language visibility rules.

The branch is validated with `npm run test`, `npm run check`, and `npm run build` in a temporary branch-only GitHub Actions workflow. The temporary workflow is removed after the branch is green.
