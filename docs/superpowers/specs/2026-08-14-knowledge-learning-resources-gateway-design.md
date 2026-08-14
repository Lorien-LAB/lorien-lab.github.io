# Knowledge Learning Resources Gateway Design

## Goal

Make **Financial Engineering Learning Resources** a first-class entry point on `/knowledge/` instead of leaving it discoverable only through the searchable Knowledge Index.

The entry point must preserve the existing Knowledge Base visual language and explicitly credit the source guide by **Prof. Chuan Shi (石川教授)**.

## Current Problem

The Knowledge landing page currently exposes the resource hub only through the generic `entries.map(...)` Knowledge Index. Visitors must scroll to the index or search for the title, so the hub is easy to miss despite being a curated learning roadmap.

The page already has a prominent `ReproductionGateway` between the domain map and featured/index sections. The learning-resources hub should receive comparable navigational prominence without redesigning the entire page.

## Chosen Approach

Create a dedicated `LearningResourcesGateway.astro` component and place it immediately before the existing `ReproductionGateway` on `/knowledge/`.

This is preferred over:

1. **Only marking the hub as `featured`** — too weak because featured entries remain generic cards and do not communicate the five-stage roadmap or source attribution.
2. **Adding another top-navigation item** — too global for a single Knowledge sub-hub and would clutter the primary site navigation.
3. **Dedicated gateway component (chosen)** — creates a clear first-class Knowledge entry while remaining scoped to the Knowledge landing page.

## Component

Create:

```text
src/components/LearningResourcesGateway.astro
```

Props:

```ts
interface Props { href: string; }
```

Content:

- mono label: `Learning Roadmap`
- title: `Financial Engineering Learning Resources`
- description: concise explanation that this is a structured quantitative-finance learning path
- attribution line: `Adapted from Prof. Chuan Shi (石川教授)'s curated guide`
- Prof. Shi name links to `https://www.shichuan.info/`
- CTA: `Explore learning resources →`
- five-stage visual flow:
  - Core Skills
  - Factor Investing
  - Advanced Concepts
  - Systems
  - Stay Current

The component links internally to:

```text
/knowledge/financial-engineering-learning-resources/
```

Use `import.meta.env.BASE_URL` at the parent page when constructing the href so GitHub Pages base-path behavior remains consistent with the rest of the site.

## Placement

Modify:

```text
src/pages/knowledge/index.astro
```

Import `LearningResourcesGateway` alongside `ReproductionGateway`.

After the `Explore by domain` section, render a gateway section containing the new learning-resources gateway, followed by the existing reproduction gateway. The learning-resources gateway appears first because it is a general learning/navigation entry, while reproductions are a more specialized empirical-research workbench.

Do not remove or alter the hub's row in the Knowledge Index. Visitors should still be able to discover it through search/filtering.

## Visual Direction

Reuse the same overall visual vocabulary as `ReproductionGateway`:

- bordered rounded panel;
- subtle accent-tinted gradient background;
- two-column desktop layout;
- stacked mobile layout;
- mono-label hierarchy;
- right-side staged flow.

The new component should be visually related but not identical. It may use slightly different copy structure and stage labels, but it must rely only on existing CSS variables and must not introduce a new dependency or global stylesheet.

No broader landing-page redesign is included.

## Attribution Requirements

The gateway must visibly contain both:

```text
Prof. Chuan Shi
石川教授
```

and link the name to:

```text
https://www.shichuan.info/
```

Wording must use `Adapted from`, `Based on`, or equivalent and must not imply Prof. Shi authored, maintains, sponsors, or endorses Lorien Lab.

## Accessibility

- The gateway must use a semantic section with an `aria-labelledby` title.
- The five-stage flow must have an accessible label such as `Recommended learning path`.
- External attribution link opens normally or in a new tab only if the component explicitly uses safe `rel="noreferrer"`; no new-window behavior is required.
- Internal CTA remains a normal anchor.

## Testing

Extend `tests/site-structure.test.mjs` or create a focused test to verify:

1. `src/components/LearningResourcesGateway.astro` exists;
2. the component contains the exact hub title;
3. the component contains `Prof. Chuan Shi`, `石川教授`, and `https://www.shichuan.info/`;
4. all five learning stages appear;
5. `src/pages/knowledge/index.astro` imports and renders the gateway;
6. its href resolves to `knowledge/financial-engineering-learning-resources/`;
7. the existing `ReproductionGateway` remains present;
8. the hub remains present in the generic Knowledge Index;
9. `npm test`, `npm run check`, and `npm run build` pass.

## Non-Goals

This change does not:

- modify the Financial Engineering Learning Resources detail page content;
- change the nine child resource entries or their official links;
- add a primary header navigation item;
- redesign the Knowledge Base hero, domain map, featured section, or index;
- publish the original PDF;
- change Knowledge schema or routes.

## Acceptance Criteria

The change is complete when a visitor opening `/knowledge/` can see a prominent **Financial Engineering Learning Resources** gateway without using search, can recognize immediately that it is adapted from Prof. Chuan Shi (石川教授)'s guide, can see the five-stage learning path at a glance, and can enter the hub with one click while all existing Knowledge functionality remains intact.
