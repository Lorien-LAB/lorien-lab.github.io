# Knowledge Base Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a first-class, static-first Knowledge Base to Lorien Lab's Astro portfolio while preserving Notes as a separate long-form section.

**Architecture:** Add a new Astro `knowledge` content collection backed by Markdown under `src/content/knowledge/**`, a `/knowledge/` landing page with derived taxonomy/search/filtering, and one static detail page per entry. Cross-links resolve against Knowledge and Notes at build time; Obsidian remains a non-clickable Coming Soon surface until a real Publish URL exists.

**Tech Stack:** Astro 5 content collections, TypeScript, Markdown, CSS, lightweight client-side JavaScript, Node built-in test runner, GitHub Pages Actions.

## Global Constraints

- Keep `Notes` as an independent top-level section.
- Canonical Knowledge route is `/knowledge/` and header label is `Knowledge`.
- Supported entry types: `concept`, `paper`, `tool`, `topic`.
- Supported maturity states: `seed`, `growing`, `mature`.
- Do not hard-code fabricated knowledge counts; derive any displayed counts from content.
- Obsidian UI must be visibly `Coming Soon` and non-clickable until a verified public URL exists.
- V1 remains static-first: no database, hosted search, auth, graph library, or live Obsidian synchronization.
- Existing Research, Projects, Notes, CV, About, theme, and PDF CV behavior must remain intact.

---

## File Map

- Modify `tests/site-structure.test.mjs` — add smoke assertions for Knowledge surfaces and non-clickable Obsidian status.
- Modify `src/content.config.ts` — register the `knowledge` collection and schema.
- Create `src/content/knowledge/concepts/walk-forward-validation.md`.
- Create `src/content/knowledge/concepts/fama-macbeth-regression.md`.
- Create `src/content/knowledge/tools/rqalpha.md`.
- Create `src/content/knowledge/topics/automated-factor-discovery.md`.
- Create `src/components/KnowledgeCard.astro` — shared visual primitive for Concept/Paper/Tool/Topic cards.
- Create `src/pages/knowledge/index.astro` — taxonomy, featured items, full index, client-side search/filter, Obsidian Coming Soon.
- Create `src/pages/knowledge/[...id].astro` — static detail pages and relationship resolution.
- Modify `src/components/Header.astro` — add Knowledge navigation.
- Modify `src/pages/index.astro` — insert Knowledge Base homepage section between Projects and Notes.
- Modify `README.md` — document knowledge authoring fields and folder structure.

---

### Task 1: Lock the Knowledge Base contract with smoke tests

**Files:**
- Modify: `tests/site-structure.test.mjs`

**Interfaces:**
- Consumes: repository file structure and source text.
- Produces: test expectations that later tasks must satisfy.

- [ ] **Step 1: Add failing Knowledge Base tests**

Add assertions equivalent to:

```js
const knowledgeFiles = [
  'src/pages/knowledge/index.astro',
  'src/pages/knowledge/[...id].astro',
  'src/content/knowledge/concepts/walk-forward-validation.md',
  'src/content/knowledge/concepts/fama-macbeth-regression.md',
  'src/content/knowledge/tools/rqalpha.md',
  'src/content/knowledge/topics/automated-factor-discovery.md',
];

for (const file of knowledgeFiles) await access(file);

const config = await readFile('src/content.config.ts', 'utf8');
assert.match(config, /const knowledge = defineCollection/);
for (const type of ['concept', 'paper', 'tool', 'topic']) assert.ok(config.includes(`'${type}'`));

const header = await readFile('src/components/Header.astro', 'utf8');
assert.ok(header.includes("['Knowledge', '/knowledge/']"));

const knowledgeIndex = await readFile('src/pages/knowledge/index.astro', 'utf8');
assert.match(knowledgeIndex, /Obsidian Knowledge Graph/);
assert.match(knowledgeIndex, /Coming Soon/);
assert.doesNotMatch(knowledgeIndex, /href=.*obsidian/i);

const home = await readFile('src/pages/index.astro', 'utf8');
assert.match(home, /Explore Knowledge/);
```

- [ ] **Step 2: Verify RED**

Run: `npm test`

Expected: Knowledge assertions fail because the new files/schema/navigation do not exist yet.

---

### Task 2: Add the `knowledge` content model and four seed entries

**Files:**
- Modify: `src/content.config.ts`
- Create: four Markdown seed files listed in File Map.

**Interfaces:**
- Produces Astro collection `knowledge` with fields: `title`, `description`, `type`, `domain`, `category`, `status`, `date`, optional `updated`, `tags`, `featured`, optional `related`, `relatedNotes`, `sourceUrl`, plus optional paper/tool metadata.

- [ ] **Step 1: Implement the collection schema**

Use Zod enums for:

```ts
type: z.enum(['concept', 'paper', 'tool', 'topic'])
status: z.enum(['seed', 'growing', 'mature'])
```

URLs use `.url().optional()`, relationship arrays default to `[]`, and collection loader points at `./src/content/knowledge` with `**/*.md`.

- [ ] **Step 2: Add real seed content**

Create conservative educational entries for:

- `walk-forward-validation`
- `fama-macbeth-regression`
- `rqalpha`
- `automated-factor-discovery`

Do not invent citations, performance, or external URLs. Use only general educational explanation and public research themes already represented by the portfolio.

- [ ] **Step 3: Run smoke tests**

Run: `npm test`

Expected: schema/type and seed-file assertions pass; route/navigation assertions may still fail.

---

### Task 3: Build Knowledge card and detail-page rendering

**Files:**
- Create: `src/components/KnowledgeCard.astro`
- Create: `src/pages/knowledge/[...id].astro`

**Interfaces:**
- `KnowledgeCard` consumes one `CollectionEntry<'knowledge'>` and links to `/knowledge/<entry.id>/`.
- Detail page consumes `knowledge` plus `notes`, resolves `related` and `relatedNotes`, and renders only successfully resolved relationships.

- [ ] **Step 1: Implement `KnowledgeCard.astro`**

Render type, maturity status, title, description, domain/category, and a compact tag subset. Use one component family with type label variation rather than four unrelated designs.

- [ ] **Step 2: Implement static paths**

In `[...id].astro`, load both collections, generate a path per Knowledge entry, pass the current entry plus collection maps into props, and use `entry.render()` for Markdown body.

- [ ] **Step 3: Resolve relationships safely**

For each `related` slug, look up an existing Knowledge entry. For `relatedNotes`, look up an existing Note. Omit unresolved slugs; never emit a broken link.

- [ ] **Step 4: Run smoke tests**

Run: `npm test`

Expected: dynamic-detail-route assertion passes.

---

### Task 4: Build the Knowledge Base landing page

**Files:**
- Create: `src/pages/knowledge/index.astro`

**Interfaces:**
- Consumes the `knowledge` collection.
- Produces taxonomy blocks, derived counts, featured items, all-entry index, progressive-enhancement search/filtering, and non-interactive Obsidian status.

- [ ] **Step 1: Derive taxonomy and counts at build time**

Create the five approved domain definitions in code and derive each domain count from actual entries. Do not embed static headline numbers.

- [ ] **Step 2: Render hero, domains, featured section, and index**

Hero title: `A connected research library.`

Include domain/category navigation, up to three featured Knowledge cards, and all entries as searchable/filterable rows.

- [ ] **Step 3: Add progressive-enhancement filters**

Use native `input` and `select` controls with accessible labels. Attach a small inline script that filters already-rendered rows using `data-*` attributes for type, domain, and normalized searchable text. With JavaScript disabled, all rows stay visible.

- [ ] **Step 4: Add Obsidian Coming Soon section**

Render `Obsidian Knowledge Graph` and `Coming Soon` as ordinary text/status UI with no anchor or button.

- [ ] **Step 5: Run smoke tests**

Run: `npm test`

Expected: landing-page and Obsidian assertions pass.

---

### Task 5: Integrate Knowledge into navigation and homepage

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Header exposes `['Knowledge', '/knowledge/']` in desktop/mobile nav.
- Homepage loads featured Knowledge entries and links to `/knowledge/`.

- [ ] **Step 1: Add header navigation**

Insert `Knowledge` between `Projects` and `Notes`.

- [ ] **Step 2: Add homepage Knowledge section**

Load the Knowledge collection, derive up to three featured entries, and add section order:

1. Research
2. Featured Projects
3. Knowledge Base
4. Latest Research Notes
5. Current Focus
6. Contact

Include five domain labels and CTA `Explore Knowledge →`.

- [ ] **Step 3: Run smoke tests**

Run: `npm test`

Expected: all smoke tests green.

---

### Task 6: Documentation, build verification, and deployment

**Files:**
- Modify: `README.md`

**Interfaces:**
- Documents knowledge folder structure, required frontmatter, and authoring distinction from Notes.

- [ ] **Step 1: Update README**

Document `src/content/knowledge/{concepts,papers,tools,topics}/`, shared fields, relationship fields, and that Obsidian Publish is not yet connected.

- [ ] **Step 2: Verify tests on branch**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 3: Verify Astro production build**

Run: `npm run build`

Expected: exit 0 and static `/knowledge/` plus Knowledge detail pages generated.

- [ ] **Step 4: Review branch diff**

Check that no unrelated CV/PDF/theme functionality changed and no hard-coded fake content counts exist.

- [ ] **Step 5: Merge branch into `main`**

Merge only after tests/build pass.

- [ ] **Step 6: Verify GitHub Pages workflow**

Confirm both `build` and `deploy` jobs complete with `success` for the merged commit.

- [ ] **Step 7: Verify public Pages configuration remains active**

Confirm Pages remains public, HTTPS enforced, and workflow-backed at `https://lorien-lab.github.io/`.
