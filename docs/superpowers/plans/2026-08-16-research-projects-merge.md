# Research & Projects Merge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the separate top-level Research and Projects portfolio entry points with one bilingual `Research & Projects` landing page while preserving existing detail URLs.

**Architecture:** Add `/research-projects/` as a composition page over the existing `research` and `projects` Astro collections. Keep detail pages in their current namespaces and use exact Astro redirects only for the two legacy landing URLs. Update the header and homepage to point at the new canonical entry.

**Tech Stack:** Astro 5, TypeScript, Astro Content Collections, Node test runner.

## Global Constraints

- Do not modify Knowledge content or routes.
- Keep `/research/<slug>/`, `/projects/<slug>/`, and `/projects/reproductions/` canonical detail routes unchanged.
- Preserve bilingual English/Chinese UI behavior.
- Use `/research-projects/` as the new canonical landing route.

---

### Task 1: Define the merged navigation contract

**Files:**
- Modify: `tests/site-structure.test.mjs`
- Modify: `src/components/Header.astro`
- Modify: `astro.config.mjs`

**Interfaces:**
- Produces: canonical top-level route `/research-projects/` and legacy redirects from `/research/` and `/projects/`.

- [ ] **Step 1: Write failing structural assertions**

Require `src/pages/research-projects/index.astro`, require `['Research & Projects', '/research-projects/']`, reject separate top-level Research and Projects nav entries, and assert exact redirects in `astro.config.mjs`.

- [ ] **Step 2: Run tests to verify RED**

Run: `npm test -- tests/site-structure.test.mjs`
Expected: FAIL because the merged page/nav/redirects do not yet exist.

- [ ] **Step 3: Implement minimal navigation and redirects**

Update Header to one bilingual combined nav item and add exact Astro redirects:

```js
'/research': '/research-projects',
'/projects': '/research-projects',
```

- [ ] **Step 4: Re-run the structural test**

Expected: navigation/redirect assertions pass; landing-page assertion may remain red until Task 2.

### Task 2: Build the unified landing page

**Files:**
- Create: `src/pages/research-projects/index.astro`
- Test: `tests/site-structure.test.mjs`

**Interfaces:**
- Consumes: `research` and `projects` content collections; `ResearchCard`, `ProjectCard`, and `ReproductionGateway`.
- Produces: `/research-projects/`.

- [ ] **Step 1: Extend the failing test**

Assert the new page imports both card types and `ReproductionGateway`, reads both collections, links the reproduction gateway to `projects/reproductions/`, and includes bilingual `Research & Projects / 研究与项目` copy.

- [ ] **Step 2: Verify RED**

Run the structural test and confirm it fails because the new page is absent.

- [ ] **Step 3: Implement the page**

Create a bilingual hero followed by Research Tracks, Reproductions, Research Systems, Strategy Frameworks, and Additional Projects. Reuse the existing project grouping logic and existing cards so all detail URLs remain unchanged.

- [ ] **Step 4: Verify GREEN**

Run the structural test and confirm all merged-page assertions pass.

### Task 3: Merge the homepage presentation

**Files:**
- Modify: `src/pages/index.astro`
- Test: `tests/site-structure.test.mjs`

**Interfaces:**
- Consumes: featured research and project entries.
- Produces: one homepage `Research & Projects` section linking to `/research-projects/`.

- [ ] **Step 1: Add failing homepage assertions**

Require the new combined heading and route; reject separate `View all research` and `View all projects` CTAs.

- [ ] **Step 2: Verify RED**

Run the structural test and confirm failure against the current split homepage.

- [ ] **Step 3: Implement the combined homepage section**

Place featured ResearchCard and ProjectCard grids under one section heading, then renumber Knowledge and Notes to remain sequential.

- [ ] **Step 4: Verify GREEN**

Run the structural test.

### Task 4: Full verification

**Files:**
- No new production files.

- [ ] **Step 1: Run all tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 2: Run Astro type/content checks**

Run: `npm run check`
Expected: PASS.

- [ ] **Step 3: Build the static site**

Run: `npm run build`
Expected: PASS, with `/research-projects/` generated and legacy landing redirects generated.

- [ ] **Step 4: Review diff scope**

Confirm no files under `src/pages/knowledge/` or `src/content/knowledge/` changed and no research/project detail routes were migrated.