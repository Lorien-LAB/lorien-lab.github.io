# Quant Interview Topic-First Stage B Public Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the public Quant Interview source-oriented shell with Topic-first navigation while keeping all internal source, TOC, manifest, topic-map, and coverage data intact.

**Architecture:** Read the Stage A taxonomy through one public-safe topic helper and render it as the primary Quant Interview navigation. Remove public source cards, source filters, source labels, and source routes; redirect old source URLs to the Topic-first hub. Public Problem and Knowledge content remain otherwise unchanged until Stage C migrates frontmatter and existing canonical content into explicit topic IDs.

**Tech Stack:** Astro 5, TypeScript, Astro Content Collections, static HTML/CSS, lightweight inline filtering JavaScript, Node built-in test runner.

## Global Constraints

- Requires Stage A merged and green.
- Public pages must not import `src/data/quant-interview/coverage/*` or `quantInterviewCoverage.mjs`.
- Public pages may read the canonical taxonomy but not source-topic mappings, manifests, or coverage ledgers.
- No book/source is a primary public navigation dimension.
- Problem routes remain `/problems/<slug>/`.
- Old public source URLs receive intentional redirects rather than silently breaking.
- Stage B does not remove source fields from Problem frontmatter; Stage C does that after ledger migration.
- No source-derived Problem/Knowledge content is added in this stage.
- Completion gates are `npm run test`, `npm run check`, and `npm run build`.

---

## File Map

**Create**

```text
src/lib/quantInterviewPublicTopics.ts
src/components/QuantInterviewTopicCard.astro
tests/quant-interview-topic-public-shell.test.mjs
```

**Modify**

```text
src/pages/knowledge/quant-interview/index.astro
src/pages/problems/index.astro
src/pages/problems/[...slug].astro
src/layouts/ProblemLayout.astro
src/components/ProblemCard.astro
astro.config.mjs
tests/quant-interview-foundation.test.mjs
```

**Delete**

```text
src/pages/knowledge/quant-interview/sources/index.astro
src/pages/knowledge/quant-interview/sources/[...slug].astro
```

---

### Task 1: Define the public source-neutral regression contract

**Files:**
- Create: `tests/quant-interview-topic-public-shell.test.mjs`
- Modify: `tests/quant-interview-foundation.test.mjs`

**Interfaces:**
- Consumes: Stage A taxonomy JSON.
- Produces: failing tests for topic-first landing, no public source filter/labels, public-safe data boundaries, and source-route redirects.

- [ ] **Step 1: Write the failing public shell test**

Create:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const hub = 'src/pages/knowledge/quant-interview/index.astro';
const bank = 'src/pages/problems/index.astro';
const detail = 'src/layouts/ProblemLayout.astro';

test('Quant Interview hub is Topic-first and source-neutral', async () => {
  const text = await readFile(hub, 'utf8');
  assert.match(text, /Learn by Topic/i);
  assert.match(text, /QuantInterviewTopicCard/);
  assert.doesNotMatch(text, /Explore Sources|sourceStats|source-grid|All sources/i);
  assert.doesNotMatch(text, /getCollection\(['"]problemSources['"]\)/);
});

test('Problem Bank filters by topic, not source', async () => {
  const text = await readFile(bank, 'utf8');
  assert.match(text, /data-topic-filter/);
  assert.match(text, /data-topics/);
  assert.doesNotMatch(text, /data-source-filter|All sources|sourceOptions|sourceBySlug/);
});

test('Problem detail renders no public source provenance', async () => {
  const text = await readFile(detail, 'utf8');
  assert.doesNotMatch(text, /sourceLine|sourceReference|shortTitle|source-line/);
});

test('public topic shell cannot import hidden coverage data', async () => {
  for (const path of [hub, bank, detail, 'src/pages/problems/[...slug].astro', 'src/components/ProblemCard.astro']) {
    const text = await readFile(path, 'utf8');
    assert.doesNotMatch(text, /quant-interview\/coverage|quantInterviewCoverage/);
  }
});

test('legacy source routes redirect to the Topic-first hub', async () => {
  const config = await readFile('astro.config.mjs', 'utf8');
  assert.match(config, /knowledge\/quant-interview\/sources/);
  assert.match(config, /knowledge\/quant-interview/);
});
```

- [ ] **Step 2: Update old foundation expectations**

Remove `src/pages/knowledge/quant-interview/sources/*` from any `requiredFiles` test and replace the old source-filter assertion with `data-topic-filter`.

- [ ] **Step 3: Verify RED**

```bash
node --test tests/quant-interview-topic-public-shell.test.mjs tests/quant-interview-foundation.test.mjs
```

Expected: FAIL on all source-neutral assertions.

- [ ] **Step 4: Commit failing tests**

```bash
git add tests/quant-interview-topic-public-shell.test.mjs tests/quant-interview-foundation.test.mjs
git commit -m "test: define topic-first public interview shell"
```

---

### Task 2: Add the public-safe topic loader and Topic card

**Files:**
- Create: `src/lib/quantInterviewPublicTopics.ts`
- Create: `src/components/QuantInterviewTopicCard.astro`

**Interfaces:**
- Produces `getQuantInterviewTaxonomy()` and `flattenPublicQuantInterviewTopics()` using only `topics/taxonomy.json`.
- `QuantInterviewTopicCard` accepts `{ topic, knowledgeCount, problemCount }`.

- [ ] **Step 1: Implement public topic types and loader**

Create `src/lib/quantInterviewPublicTopics.ts`:

```ts
import taxonomy from '../data/quant-interview/topics/taxonomy.json';

export type QuantInterviewTopic = {
  id: string;
  title: string;
  order: number;
  children?: QuantInterviewTopic[];
};

export type QuantInterviewTaxonomy = {
  version: number;
  topics: QuantInterviewTopic[];
};

export const getQuantInterviewTaxonomy = () => taxonomy as QuantInterviewTaxonomy;

export function flattenPublicQuantInterviewTopics() {
  const rows: Array<QuantInterviewTopic & { parentId: string | null }> = [];
  const visit = (items: QuantInterviewTopic[], parentId: string | null) => {
    for (const item of [...items].sort((a, b) => a.order - b.order)) {
      rows.push({ ...item, parentId });
      if (item.children) visit(item.children, item.id);
    }
  };
  visit(getQuantInterviewTaxonomy().topics, null);
  return rows;
}
```

Do not import `source-topic-map.json` or coverage data.

- [ ] **Step 2: Create a compact topic card**

`src/components/QuantInterviewTopicCard.astro` should render the topic title, child subtopic titles, real derived `knowledgeCount` / `problemCount`, and a link to the Problem Bank prefiltered by `?topic=<topic.id>`. Counts may be zero during Stage B and must not be fabricated.

- [ ] **Step 3: Add a narrow component test assertion**

In the public-shell test assert `QuantInterviewTopicCard.astro` contains no `source`, `book`, `coverage`, or `problemSources` dependency and renders `problemCount` / `knowledgeCount` props.

- [ ] **Step 4: Run and commit**

```bash
node --test tests/quant-interview-topic-public-shell.test.mjs
```

Expected: still FAIL because pages are not migrated, but component-specific assertions PASS.

```bash
git add src/lib/quantInterviewPublicTopics.ts src/components/QuantInterviewTopicCard.astro tests/quant-interview-topic-public-shell.test.mjs
git commit -m "feat: add public quant interview topic primitives"
```

---

### Task 3: Rewrite the Quant Interview landing page Topic-first

**Files:**
- Modify: `src/pages/knowledge/quant-interview/index.astro`

**Interfaces:**
- Consumes: `getQuantInterviewTaxonomy()`, Knowledge `quantInterviewTopics`, Problem `quantInterviewTopics`.
- Produces: public landing with Topic cards, Learn / Practice / Techniques journeys, no source collection dependency.

- [ ] **Step 1: Replace source collection loading**

Remove:

```ts
const sources = await getCollection('problemSources');
const sourceStats = ...;
```

Import:

```ts
import QuantInterviewTopicCard from '../../../components/QuantInterviewTopicCard.astro';
import { getQuantInterviewTaxonomy } from '../../../lib/quantInterviewPublicTopics';
```

Derive counts only from real entries:

```ts
const taxonomy = getQuantInterviewTaxonomy();
const topTopics = taxonomy.topics.map((topic) => ({
  topic,
  knowledgeCount: knowledge.filter((entry) => entry.data.quantInterviewTopics.includes(topic.id) || topic.children?.some((child) => entry.data.quantInterviewTopics.includes(child.id))).length,
  problemCount: problems.filter((entry) => entry.data.quantInterviewTopics.includes(topic.id) || topic.children?.some((child) => entry.data.quantInterviewTopics.includes(child.id))).length,
}));
```

- [ ] **Step 2: Replace hero/source copy**

Use source-neutral copy such as:

```text
Learn the concept, recognize the technique, solve the problem, and connect related ideas across one canonical quantitative-interview knowledge graph.
```

Primary actions:

```text
Learn by Topic
Practice Problems
Problem-Solving Techniques
```

No Sources action.

- [ ] **Step 3: Replace the Sources section with Topic cards**

Render all 10 canonical top-level topics in taxonomy order. Display child names and real counts. Do not display book counts or source status.

- [ ] **Step 4: Run landing tests**

```bash
node --test tests/quant-interview-topic-public-shell.test.mjs
npm run check
```

Expected: landing-specific tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/knowledge/quant-interview/index.astro
git commit -m "feat: make quant interview landing topic-first"
```

---

### Task 4: Replace Problem Bank source filtering with Topic filtering

**Files:**
- Modify: `src/pages/problems/index.astro`
- Modify: `src/components/ProblemCard.astro`

**Interfaces:**
- Problem rows expose `data-topics` as pipe-separated canonical topic IDs.
- Query parameter `?topic=<id>` preselects the Topic filter client-side.

- [ ] **Step 1: Remove source data from Problem Bank**

Keep `problemSources` loading only if still required by `validateProblemRelationships`; do not build `sourceBySlug`, `sourceOptions`, source search text, or `data-source` attributes.

- [ ] **Step 2: Add topic options from taxonomy**

Build options from `flattenPublicQuantInterviewTopics()` and render:

```astro
<label><span>Topic</span><select data-topic-filter>
  <option value="">All topics</option>
  {topicOptions.map((topic) => <option value={topic.id}>{topic.title}</option>)}
</select></label>
```

Each row must contain:

```astro
data-topics={problem.data.quantInterviewTopics.join('|')}
```

Include topic IDs in search text.

- [ ] **Step 3: Update inline filtering logic**

Replace `source` with `topic` throughout. Match with:

```js
const topics = (row.dataset.topics || '').split('|').filter(Boolean);
const matchesTopic = !topicValue || topics.includes(topicValue);
```

On startup, read `new URLSearchParams(location.search).get('topic')` and preselect that value when present.

- [ ] **Step 4: Remove source title from ProblemCard**

Change Props to:

```ts
interface Props { entry: CollectionEntry<'problems'>; }
```

Render only the Problem ID in the top strip. Do not replace the source with another fabricated label.

- [ ] **Step 5: Run tests and commit**

```bash
node --test tests/quant-interview-topic-public-shell.test.mjs tests/quant-interview-foundation.test.mjs
npm run check
```

Expected: bank-specific tests PASS.

```bash
git add src/pages/problems/index.astro src/components/ProblemCard.astro tests
git commit -m "feat: filter interview problems by canonical topic"
```

---

### Task 5: Remove public source provenance from Problem detail

**Files:**
- Modify: `src/pages/problems/[...slug].astro`
- Modify: `src/layouts/ProblemLayout.astro`

**Interfaces:**
- `ProblemLayout` Props no longer include `source`.
- Internal relationship validation may still receive the source collection until Stage C removes public-source coupling from the validator.

- [ ] **Step 1: Remove the source prop and lookup**

In the route remove `getSourceForProblem` and `const source = ...`; pass only:

```astro
<ProblemLayout
  problem={problem}
  concepts={concepts}
  techniques={techniques}
  prerequisites={prerequisites}
  relatedProblems={relatedProblems}
>
```

- [ ] **Step 2: Remove source UI from layout**

Delete the `source?: CollectionEntry<'problemSources'>` prop, `sourceLine` computation, source line markup, and `.source-line` CSS.

Do not render `source`, `sourceSection`, `sourceProblem`, or `sourceReference` anywhere else.

- [ ] **Step 3: Run tests and commit**

```bash
node --test tests/quant-interview-topic-public-shell.test.mjs
npm run check
```

Expected: detail tests PASS.

```bash
git add src/pages/problems/[...slug].astro src/layouts/ProblemLayout.astro
git commit -m "feat: hide source provenance from public problems"
```

---

### Task 6: Retire public source routes with redirects

**Files:**
- Modify: `astro.config.mjs`
- Delete: `src/pages/knowledge/quant-interview/sources/index.astro`
- Delete: `src/pages/knowledge/quant-interview/sources/[...slug].astro`

**Interfaces:**
- Legacy `/knowledge/quant-interview/sources/` and nested source paths redirect to `/knowledge/quant-interview/`.
- Internal `problemSources` collection remains untouched.

- [ ] **Step 1: Add redirects**

Extend `redirects`:

```js
'/knowledge/quant-interview/sources': '/knowledge/quant-interview',
'/knowledge/quant-interview/sources/[...slug]': '/knowledge/quant-interview',
```

- [ ] **Step 2: Delete source route files**

Remove both public Astro pages. Do not delete `src/content/problem-sources/`, TOCs, manifests, maps, or coverage ledgers.

- [ ] **Step 3: Search for remaining public source links**

Run:

```bash
grep -R "knowledge/quant-interview/sources" src --exclude-dir=data --exclude='*.json'
```

Expected: no public link remains outside `astro.config.mjs` redirect definitions.

- [ ] **Step 4: Run and commit**

```bash
node --test tests/quant-interview-topic-public-shell.test.mjs tests/quant-interview-foundation.test.mjs
npm run check
npm run build
```

Expected: PASS.

```bash
git add astro.config.mjs src/pages/knowledge/quant-interview tests
git commit -m "refactor: retire public quant interview source routes"
```

---

### Task 7: Run Stage B completion gates

**Files:** none unless verification finds a defect.

- [ ] **Step 1: Focused test**

```bash
node --test tests/quant-interview-topic-public-shell.test.mjs tests/quant-interview-foundation.test.mjs
```

Expected: PASS.

- [ ] **Step 2: Full repository verification**

```bash
npm run test
npm run check
npm run build
```

Expected: all exit 0.

- [ ] **Step 3: Diff boundary review**

```bash
git diff --name-only main...HEAD
```

Expected Stage B delta: public Quant Interview/Problem shell, topic helper/card, redirect configuration, and tests only. Hidden Stage A data remains intact; no new book-derived content is added.
