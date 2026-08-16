# Research & Projects Merge Design

## Goal
Merge the separate top-level Research and Projects portfolio entry points into one bilingual `Research & Projects / 研究与项目` landing page without breaking existing detail URLs.

## Canonical entry point
- New canonical landing route: `/research-projects/`.
- Header navigation exposes one item: `Research & Projects / 研究与项目`.
- The homepage presents one combined portfolio section instead of separate Research and Build sections.

## Content architecture
The unified landing page reads both existing Astro content collections and keeps their existing detail namespaces:
- research detail pages remain `/research/<slug>/`;
- project detail pages remain `/projects/<slug>/`;
- reproductions remain `/projects/reproductions/`.

The landing page groups content into:
1. Research Tracks — all research collection entries.
2. Strategy & Research Systems — existing project cards grouped using the current project classification logic.
3. Reproductions — the existing reproduction gateway.

This keeps the merge focused on information architecture rather than performing a risky content migration.

## Backward compatibility
Astro static redirects preserve the old landing URLs:
- `/research/` -> `/research-projects/`
- `/projects/` -> `/research-projects/`

Nested detail routes are not redirected.

## Homepage
The current two sections (`Research Areas` and `Featured Projects`) become a single `Research & Projects` section. It shows featured research and featured projects together while retaining their existing card components and detail links.

## Scope boundaries
- No changes to `src/content/knowledge/**` or Knowledge routes.
- No migration of research/project content files.
- No change to reproduction canonical detail namespace.
- No deletion of ResearchCard or ProjectCard.

## Validation
Update structural tests first so they require:
- `/research-projects/` landing page;
- one combined header navigation item;
- homepage combined section;
- redirects for legacy landing URLs;
- preservation of research/project detail namespaces and reproduction paths.

Then run the full Node test suite and Astro build/check before merge.