# Site interaction fixes and visual cleanup

The user requested fixes for the reviewed defects and removal of unnecessary decoration. This is a bounded cleanup of the existing site, preserving its content, routing, green accent, bilingual shell, and light/dark themes.

## Behavior

- Knowledge search/type/domain filters and the public curriculum directory must actually hide nonmatching rows. Empty and reset states must agree with the displayed results.
- The reproduction chart's dynamically created legend markers must have visible dimensions and retain the corresponding series colors after mode changes. Styles for dynamic children must cross Astro's component scope deliberately.

## Presentation

- Remove the decorative Concept → Technique → Problem → Source gateway diagram, the brand's ornamental bar mark, and the visit counter's glowing dot.
- Remove the redundant home hero eyebrow and numbered section eyebrows. Keep titles, descriptions, links, genuine counts, tags, research evidence, chart legends, and functional icons.
- Use flat surfaces, quieter tag/status treatments, smaller card radii, and border/color feedback rather than floating cards or moving arrows.
- Flatten the Quant Interview and reproduction gateways, and the reproduction chart/hero backgrounds. Preserve educational diagrams, process explanations, chart color encoding, and all source content.
- Preserve keyboard focus visibility, readable contrast, wrapping at 390 px, and menu, language, and theme behavior.

## Scope and validation

Work in `codex/site-cleanup`, based on `e81acf8`. Do not change content collections, Quant Interview ledgers, dependencies, or deployment configuration. Source PDFs remain untouched.

Use actual rendered browser assertions for the filtering and legend regressions before and after fixes, then run the full Node test suite, both directory checks, Astro check, and production build. Inspect representative desktop/mobile pages and light/dark states. Record results without claiming full mathematical-content or live-production verification.
