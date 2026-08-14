# Projects Reproductions URL Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/projects/reproductions/*` the only canonical reproduction URL family while preserving `/knowledge/reproductions/*` as static backward-compatible redirects.

**Architecture:** Keep the existing `reproductions` content collection and UI components, but move the active Astro page routes from `src/pages/knowledge/reproductions/` to `src/pages/projects/reproductions/`. Projects becomes the sole discovery gateway, active links point only to the Projects namespace, and Astro `redirects` generates legacy static redirect pages for the old Knowledge URLs.

**Tech Stack:** Astro 5 static output, Markdown content collections, Node test runner, GitHub Pages Actions.

## Global Constraints

- Canonical index: `/projects/reproductions/`.
- Canonical detail: `/projects/reproductions/<slug>/`.
- Legacy `/knowledge/reproductions/*` exists only as compatibility redirects, never active navigation.
- Static GitHub Pages redirects are client-side HTML redirects, not server-side 301 responses.
- Do not move or change `src/content/reproductions/`, reproduction schemas, slugs, scoring, metadata, or result/stage semantics.
- `/knowledge/` keeps the Financial Engineering Learning Resources gateway and removes the reproduction gateway.
- `/projects/` becomes the first-class discovery surface for Quant Research Reproductions.
- Do not rewrite historical files under `docs/superpowers/` solely to replace old URLs.

---

### Task 1: Lock the migration contract with failing tests

**Files:**
- Modify: `tests/site-structure.test.mjs`
- Create: `.github/workflows/projects-reproductions-migration-ci.yml`

**Interfaces:**
- Consumes: current route files and active navigation source.
- Produces: regression tests that distinguish canonical Projects URLs from legacy redirect-only Knowledge URLs.

- [ ] **Step 1: Extend the structure tests**

Add assertions that:

```js
await access('src/pages/projects/reproductions/index.astro');
await access('src/pages/projects/reproductions/[...id].astro');

const projects = await readFile('src/pages/projects/index.astro', 'utf8');
assert.match(projects, /ReproductionGateway/);
assert.match(projects, /projects\/reproductions\//);

const knowledge = await readFile('src/pages/knowledge/index.astro', 'utf8');
assert.doesNotMatch(knowledge, /ReproductionGateway/);

const card = await readFile('src/components/ReproductionCard.astro', 'utf8');
assert.match(card, /projects\/reproductions\/\$\{slug\}/);
assert.doesNotMatch(card, /knowledge\/reproductions\/\$\{slug\}/);

const detail = await readFile('src/pages/projects/reproductions/[...id].astro', 'utf8');
assert.match(detail, /projects\/reproductions\//);

const astroConfig = await readFile('astro.config.mjs', 'utf8');
assert.match(astroConfig, /knowledge\/reproductions/);
assert.match(astroConfig, /projects\/reproductions/);

const readme = await readFile('README.md', 'utf8');
assert.match(readme, /Website record:\s+\/projects\/reproductions\/<slug>\//);
```

Also assert the Knowledge landing still contains `LearningResourcesGateway`.

- [ ] **Step 2: Run RED CI**

Create a branch-only workflow running:

```yaml
- run: npm install
- run: npm test
- run: npm run check
- run: npm run build
```

Expected: `npm test` fails because the new Projects reproduction route files and redirect config do not yet exist.

- [ ] **Step 3: Confirm the failure is migration-specific**

Expected: pre-existing tests pass; new migration assertions fail on the old route ownership and missing Projects files.

---

### Task 2: Move active reproduction routes into Projects

**Files:**
- Create: `src/pages/projects/reproductions/index.astro`
- Create: `src/pages/projects/reproductions/[...id].astro`
- Delete: `src/pages/knowledge/reproductions/index.astro`
- Delete: `src/pages/knowledge/reproductions/[...id].astro`

**Interfaces:**
- Consumes: `reproductions` content collection, `ReproductionCard`, `ReproductionPipeline`, `ReproductionScore`, related Knowledge/Notes/Projects collections.
- Produces: canonical Projects index/detail routes with behavior identical to the old workbench except for namespace links.

- [ ] **Step 1: Copy the index implementation into Projects**

Create `src/pages/projects/reproductions/index.astro` from the existing Knowledge index with imports adjusted one directory level as required. Preserve filters, source split, featured records, empty state, and styling.

- [ ] **Step 2: Copy the detail implementation into Projects**

Create `src/pages/projects/reproductions/[...id].astro` from the existing Knowledge detail route. Preserve `getStaticPaths`, artifact behavior, related-entity resolution, metrics, score, pipeline, and styling.

- [ ] **Step 3: Change detail back-navigation**

Use:

```astro
<a class="back" href={`${base}projects/reproductions/`}>← All reproductions</a>
```

- [ ] **Step 4: Delete the old active Knowledge route files**

Delete both files under `src/pages/knowledge/reproductions/` so Astro redirects can own those paths.

---

### Task 3: Move all active navigation and documentation to Projects

**Files:**
- Modify: `src/pages/projects/index.astro`
- Modify: `src/pages/knowledge/index.astro`
- Modify: `src/components/ReproductionCard.astro`
- Modify: `astro.config.mjs`
- Modify: `README.md`

**Interfaces:**
- Produces: Projects-only active navigation plus legacy redirect configuration.

- [ ] **Step 1: Add the Projects gateway**

Import `ReproductionGateway` in `src/pages/projects/index.astro`, define:

```ts
const base = import.meta.env.BASE_URL;
```

and render before the normal project-card grid:

```astro
<section class="section"><div class="container"><ReproductionGateway href={`${base}projects/reproductions/`} /></div></section>
```

- [ ] **Step 2: Remove the Knowledge gateway**

Remove the `ReproductionGateway` import and rendered section from `src/pages/knowledge/index.astro`. Leave `LearningResourcesGateway` untouched.

- [ ] **Step 3: Update reproduction cards**

Change:

```ts
const href = `${import.meta.env.BASE_URL}knowledge/reproductions/${slug}/`;
```

to:

```ts
const href = `${import.meta.env.BASE_URL}projects/reproductions/${slug}/`;
```

- [ ] **Step 4: Add Astro compatibility redirects**

Extend `defineConfig` with:

```js
redirects: {
  '/knowledge/reproductions': '/projects/reproductions',
  '/knowledge/reproductions/[...id]': '/projects/reproductions/[...id]',
},
```

Keep `output: 'static'` and `trailingSlash: 'always'` unchanged.

- [ ] **Step 5: Update current README architecture**

Describe the workbench as a Projects subsystem and change the canonical website record example to:

```text
Website record: /projects/reproductions/<slug>/
```

Do not rewrite historical specs/plans.

---

### Task 4: Verify generated routes and redirects

**Files:**
- Modify: `.github/workflows/projects-reproductions-migration-ci.yml`

**Interfaces:**
- Consumes: built `dist/` tree.
- Produces: build-time proof that new canonical pages and old compatibility redirects are emitted.

- [ ] **Step 1: Run the full suite**

Run:

```bash
npm test
npm run check
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 2: Inspect generated canonical output**

After build, assert:

```bash
test -f dist/projects/reproductions/index.html
```

If the reproduction collection is non-empty, assert at least one generated detail page under `dist/projects/reproductions/`; if empty, the index alone is sufficient.

- [ ] **Step 3: Inspect generated legacy redirect output**

Assert:

```bash
test -f dist/knowledge/reproductions/index.html
grep -qi 'http-equiv="refresh"' dist/knowledge/reproductions/index.html
```

Also inspect the built output or Astro manifest/logs to confirm the dynamic legacy route is mapped to `/projects/reproductions/[...id]` for actual reproduction slugs when records exist.

- [ ] **Step 4: Search active source for stale URLs**

Search active source outside historical docs:

```bash
grep -R "knowledge/reproductions" src README.md tests astro.config.mjs
```

Allowed matches: `astro.config.mjs` redirect rules and migration tests only. No active component/page/README navigation may retain the old canonical path.

---

### Task 5: Integration and deployment

**Files:**
- Delete after branch verification: `.github/workflows/projects-reproductions-migration-ci.yml`

- [ ] **Step 1: Review the diff against `main`**

Confirm only route migration, navigation, redirect config, current README/tests, plan/spec, and the temporary branch CI changed.

- [ ] **Step 2: Merge only after green verification**

Fast-forward `main` only if the branch is ahead and not behind.

- [ ] **Step 3: Remove the temporary branch-only CI from `main`**

Commit the cleanup separately.

- [ ] **Step 4: Verify the final production SHA**

Wait for the official `Deploy to GitHub Pages` workflow on the cleanup SHA and require both `build` and `deploy` jobs to conclude `success` before claiming the migration is live.
