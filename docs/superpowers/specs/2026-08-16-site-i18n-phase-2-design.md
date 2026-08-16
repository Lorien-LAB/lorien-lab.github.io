# Site i18n Phase 2 Design

## Goal
Extend the existing English/Chinese language toggle from the global shell and hero to the main public portfolio surfaces: Home, Research, Projects, Notes, CV, and About, while remaining merge-safe with concurrent Knowledge work.

## Constraints
- Work only on `chatgpt/i18n-zh-en-2026-08-16`.
- Do not modify `src/content/knowledge/**` or `src/pages/knowledge/**`.
- Do not modify `src/content.config.ts`.
- Preserve all canonical URLs and the existing `site-language` localStorage state.
- English remains the source-of-truth content and default language.
- Do not duplicate routes into `/en/` and `/zh/` trees.
- Preserve existing test contracts and Astro static rendering.

## Architecture
### Static page copy
Home, Research, Projects, Notes, CV, and About use paired `.lang-en` / `.lang-zh` nodes. Existing global CSS chooses the visible language using `html[data-lang]`.

### Collection-driven cards
Research, project, and note entries continue to read English data from Astro Content Collections. Chinese display overrides live in `src/data/i18n/publicContentZh.ts`, keyed by collection entry id. Card components render the English source and Chinese override side by side under the global visibility rules.

This avoids changing collection schemas or duplicating Markdown records, reducing merge conflicts with other agents.

## Scope
### Home
Translate section headings, descriptions, calls to action, focus labels, focus items, contact strip, and Knowledge-domain labels shown on the homepage. Knowledge cards themselves remain owned by the Knowledge workstream.

### Research
Translate the landing hero and all three research-card title/description/category/status surfaces using the public translation map.

### Projects
Translate the landing hero, reproduction gateway surrounding headings where edited in the page, project-group labels/descriptions, and all three project-card title/description/status surfaces using the public translation map. Long project case-study Markdown bodies remain English in this phase to avoid maintaining duplicated 10k+ word content trees.

### Notes
Translate the landing hero and the current note card title/description/category. Long note Markdown body remains English in this phase.

### CV
Translate all visible page copy, education, experience, projects, skills, awards, and research interests while preserving factual values and dates.

### About
Translate all visible copy and current-theme bullets.

## Testing
Add a dedicated Phase 2 contract test that verifies:
- each target page contains Chinese copy;
- collection card components consume `publicContentZh` without modifying collection schemas;
- translation data contains the three research ids, three project ids, and current note id;
- Knowledge content/page paths are not part of the Phase 2 implementation files.

Run `npm run test`, `npm run check`, and `npm run build` in temporary branch CI, then remove the temporary workflow.
