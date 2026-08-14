# Projects Reproductions URL Migration Design

## Goal

Move the Quant Research Reproductions system completely out of the Knowledge URL namespace and make **Projects** its canonical information-architecture home.

After this migration, all new navigation and canonical reproduction URLs use:

```text
/projects/reproductions/
/projects/reproductions/<slug>/
```

The previous `/knowledge/reproductions/*` URLs remain available only as backward-compatible redirect pages so previously shared links do not break.

## Information Architecture

The site-level responsibility becomes:

- **Knowledge** — concepts, papers, tools, topics, learning resources, and the knowledge graph.
- **Projects** — research engineering projects, quantitative systems, and auditable empirical reproduction work.

Quant Research Reproductions is treated as a project/research-workbench surface, not a Knowledge sub-hub.

## Canonical Routes

### Reproduction index

Old canonical route:

```text
/knowledge/reproductions/
```

New canonical route:

```text
/projects/reproductions/
```

### Reproduction detail

Old canonical route:

```text
/knowledge/reproductions/<slug>/
```

New canonical route:

```text
/projects/reproductions/<slug>/
```

All generated reproduction-card links, detail-page back links, project gateway links, tests, and current documentation must use the new Projects route.

## Route File Migration

Move the active page implementations from:

```text
src/pages/knowledge/reproductions/index.astro
src/pages/knowledge/reproductions/[...id].astro
```

to:

```text
src/pages/projects/reproductions/index.astro
src/pages/projects/reproductions/[...id].astro
```

The page behavior, filters, source-family split, scoring, empty state, static path generation, related-entity resolution, artifact handling, and existing visual design remain unchanged unless a path reference must change for the migration.

The old route files must be deleted. They must not coexist with redirect configuration because a physical page route takes precedence over an Astro redirect rule.

## Projects Landing Page

Modify:

```text
src/pages/projects/index.astro
```

Import the existing:

```text
src/components/ReproductionGateway.astro
```

Render it as a first-class Projects entry before the ordinary project-card grid.

Its href must be constructed with `import.meta.env.BASE_URL` and point to:

```text
projects/reproductions/
```

The Projects page remains the primary discovery surface for the reproduction workbench.

The existing project cards remain present and retain their current ordering and behavior.

## Knowledge Landing Page

Modify:

```text
src/pages/knowledge/index.astro
```

Remove:

- the `ReproductionGateway` import;
- the `ReproductionGateway` rendered section;
- any active first-class navigation to `/knowledge/reproductions/`.

Keep the Financial Engineering Learning Resources gateway and the rest of the Knowledge landing page unchanged.

The Knowledge page must not expose the reproduction workbench as a first-class gateway after this migration.

## Reproduction Card Links

Modify:

```text
src/components/ReproductionCard.astro
```

Change the generated href from:

```text
knowledge/reproductions/${slug}/
```

to:

```text
projects/reproductions/${slug}/
```

Continue using `import.meta.env.BASE_URL` so links remain correct under GitHub Pages base-path configuration.

## Reproduction Detail Navigation

In the migrated detail route:

```text
src/pages/projects/reproductions/[...id].astro
```

change the `← All reproductions` link to:

```text
/projects/reproductions/
```

using the existing `base` helper pattern.

Related Knowledge, Notes, and Projects links remain in their own existing namespaces.

## Backward-Compatible Redirects

The site uses Astro static output with no server adapter. Therefore backward compatibility must use Astro's build-time `redirects` configuration.

Modify:

```text
astro.config.mjs
```

Add redirect mappings equivalent to:

```js
redirects: {
  '/knowledge/reproductions': '/projects/reproductions',
  '/knowledge/reproductions/[...id]': '/projects/reproductions/[...id]',
},
```

The implementation may normalize trailing-slash syntax as required by Astro's route configuration, but the resulting built site must support both the old index and old detail URL family.

Because this site is a statically generated GitHub Pages site without an adapter, Astro will generate client-side redirect HTML using `<meta http-equiv="refresh">`. Do not claim these are server-side HTTP 301 redirects.

The browser-visible destination after redirect must be the new `/projects/reproductions/...` URL.

## Canonical-Link Policy

After migration:

- no active navigation component may generate `/knowledge/reproductions/` URLs;
- no active reproduction page may link back into the old namespace;
- old namespace occurrences are allowed only in:
  - redirect configuration;
  - migration tests that explicitly verify backward compatibility;
  - historical design/implementation documents under `docs/superpowers/` that describe the previous architecture.

Historical specs and plans are immutable project history and do not need rewriting.

## Content Collection

Do not move:

```text
src/content/reproductions/
```

The `reproductions` Astro content collection is already independent of page routing. Its schema and stored records remain unchanged.

Do not change reproduction slugs, metadata, source-type model, stage/result enums, scoring dimensions, or code-visibility semantics.

## Report URLs

The current schema contains optional `reportHtmlPath` values. This migration does not invent or rewrite existing report artifacts that do not exist.

For future reproduction-owned HTML reports, the preferred canonical namespace is:

```text
/projects/reproductions/<slug>/report/
```

Existing external/source report links remain untouched. A separate report-asset migration is required if real legacy local report pages are introduced later.

## Current Documentation

Update the repository README if it contains the old reproduction workbench URL so the documented public route is:

```text
/projects/reproductions/
```

Do not rewrite historical spec/plan files solely to replace old URLs.

## Accessibility and Visual Behavior

The migration must not degrade existing reproduction accessibility or responsive behavior.

The existing `ReproductionGateway`, reproduction index, cards, filters, empty states, detail status pipeline, score panel, and responsive layout should retain their current semantics and visual language.

No new UI dependency or global stylesheet is introduced.

## Testing Strategy

Use TDD.

### RED phase

First update/add tests so the current implementation fails because:

- `/projects/reproductions/` page files do not yet exist;
- Projects does not yet expose the gateway;
- `ReproductionCard` still generates the Knowledge route;
- reproduction detail back-navigation still points to Knowledge;
- Knowledge still renders the gateway;
- Astro redirect rules are absent.

### GREEN phase

The completed tests must verify:

1. `src/pages/projects/reproductions/index.astro` exists;
2. `src/pages/projects/reproductions/[...id].astro` exists;
3. the old active page files under `src/pages/knowledge/reproductions/` no longer exist;
4. `/projects/` imports and renders `ReproductionGateway` with `projects/reproductions/`;
5. `/knowledge/` does not import or render `ReproductionGateway`;
6. `ReproductionCard.astro` generates `projects/reproductions/${slug}/`;
7. the migrated detail page links back to `projects/reproductions/`;
8. Astro config declares old-index and old-dynamic-route redirects to the new Projects namespace;
9. reproduction content collection/schema remains unchanged;
10. current README uses the new public route if it documents the workbench URL;
11. the Financial Engineering Learning Resources gateway remains on `/knowledge/`;
12. all pre-existing reproduction functionality tests still pass after path updates;
13. `npm test`, `npm run check`, and `npm run build` pass.

Where practical, inspect the built output to verify Astro emitted compatibility redirect HTML for the old URL family and generated the canonical new reproduction pages.

## Non-Goals

This migration does not:

- redesign the reproduction workbench;
- alter reproduction metadata or scoring;
- migrate `src/content/reproductions/`;
- change the separate public `quant-research-reproductions` code repository;
- add a new top-level header navigation item;
- rewrite historical specs/plans;
- claim GitHub Pages provides server-side 301 redirects;
- create fake reproduction records or performance data.

## Acceptance Criteria

The migration is complete when:

1. a visitor discovers Quant Research Reproductions from `/projects/`;
2. the workbench canonical index URL is `/projects/reproductions/`;
3. every reproduction detail canonical URL is `/projects/reproductions/<slug>/`;
4. all active internal links use the Projects namespace;
5. `/knowledge/` no longer presents reproductions as a first-class Knowledge entry;
6. visiting a legacy `/knowledge/reproductions/` URL redirects the browser to the corresponding `/projects/reproductions/` URL;
7. all existing workbench behavior remains intact;
8. the static site builds and deploys successfully to GitHub Pages.
