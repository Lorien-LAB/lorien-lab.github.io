# Quant Interview Knowledge Directory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one canonical Quant Interview curriculum catalog that powers a public Topic-to-Knowledge learning directory and a deterministic internal three-book extraction directory.

**Architecture:** A public-safe JSON catalog records ordered published and planned Knowledge modules against the existing taxonomy. A focused public helper validates and projects that catalog with public Knowledge and Problems; a separate internal generator joins the public projection with hidden source routing, coverage ledgers, and workstream manifests, preventing private evidence from entering public routes.

**Tech Stack:** Astro 5, Markdown/YAML content collections, JSON taxonomy/catalog/coverage data, Node.js 24 ES modules and built-in test runner, lightweight browser JavaScript, GitHub Pages.

## Global Constraints

- Approved spec: `docs/superpowers/specs/2026-08-26-quant-interview-knowledge-directory-design.md`.
- Work only on branch `codex/quant-interview-knowledge-directory` in the existing isolated worktree.
- Public organization remains Topic-first and source-neutral; books are internal evidence, never public categories.
- `src/data/quant-interview/topics/taxonomy.json` remains the canonical topic taxonomy and is not modified.
- `knowledge-catalog.json` is public-safe and contains no source names, sections, item ids, page evidence, hashes, coverage states, or dedup decisions.
- Public routes may import taxonomy, catalog, and public Knowledge/Problems only; they may not import source manifests, TOCs, source-topic map, coverage ledgers, workstreams, or the internal generator.
- The internal directory is committed repository documentation, not a public route.
- No whole-book or broad-topic completeness percentage is calculated or displayed.
- Existing public Knowledge and Problems remain the truth for published content; planned catalog modules never create a public detail page.
- Every explicitly topic-classified current Knowledge entry appears exactly once as `published`.
- Workstream 013 contributes exactly two `planned` modules in this feature; it receives no public content, coverage, manifest, HANDOFF, or completion change.
- The approved 013 slugs are `problem-framing-clarification-assumption-management` and `structured-think-aloud-reasoning`.
- Later 013 integration uses reciprocal `related` slugs, keeps `relatedNotes: []`, and places relationship explanation in body content.
- All new production behavior follows RED → GREEN → REFACTOR; each test must fail for the intended missing behavior before implementation.
- Required final gates are `npm run knowledge:directory:check`, `npm run test`, `npm run check`, and `npm run build`.
- No database, authentication, progress persistence, graph library, Obsidian sync, or full-corpus translation is added.

---

## File Structure Map

### Public curriculum model

```text
src/data/quant-interview/topics/knowledge-catalog.json
src/lib/quantInterviewKnowledgeDirectory.mjs
tests/quant-interview-knowledge-directory.test.mjs
```

The JSON file is the canonical curriculum catalog. The helper validates taxonomy, metadata, order, prerequisites, and public projection behavior. The test exercises the real helper against repository data and hand-written malformed fixtures.

### Public learning surface

```text
src/pages/knowledge/quant-interview/directory.astro
src/components/QuantInterviewTopicCard.astro
src/pages/knowledge/quant-interview/index.astro
tests/quant-interview-topic-public-shell.test.mjs
```

The new route renders every topic and module server-side. The existing topic card exposes separate Learn and Practice actions. Existing hidden-import regressions remain authoritative.

### Internal extraction surface

```text
scripts/generate-quant-interview-knowledge-directory.mjs
docs/quant-interview/KNOWLEDGE_DIRECTORY.md
docs/quant-interview/CONTINUE_EXTRACTION_TASK.md
package.json
docs/quant-interview/README.md
README.md
tests/quant-interview-knowledge-directory.test.mjs
```

The script joins public curriculum state with private routing/coverage/workstreams and emits deterministic Markdown in write or check mode.

---

### Task 1: Canonical Catalog Validation and Public Projection

**Files:**
- Create: `tests/quant-interview-knowledge-directory.test.mjs`
- Create: `src/lib/quantInterviewKnowledgeDirectory.mjs`

**Interfaces:**
- Consumes: taxonomy `{ version, topics }`; catalog `{ version, modules }`; `knowledgeRecords: Array<{ slug, title, canonicalTopics }>`; `problemRecords: Array<{ slug, canonicalTopics, concepts, techniques, prerequisites }>`.
- Produces: `flattenTaxonomy(taxonomy)`, `validateKnowledgeCatalog(catalog, taxonomy, knowledgeRecords)`, and `buildPublicKnowledgeDirectory({ catalog, taxonomy, knowledgeRecords, problemRecords, base })`.
- `buildPublicKnowledgeDirectory` returns `{ totals, topics }`; every topic node contains `{ id, title, order, anchor, problemCount, modules, children }`; every module contains `{ slug, title, status, learningOrder, href, problemCount, prerequisites }` and no private source fields.

- [ ] **Step 1: Write the failing public-projection test**

Create the test file with repository-independent fixtures first:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPublicKnowledgeDirectory,
  validateKnowledgeCatalog,
} from '../src/lib/quantInterviewKnowledgeDirectory.mjs';

const taxonomy = {
  version: 1,
  topics: [{
    id: 'root-topic', title: 'Root Topic', order: 1,
    children: [{ id: 'child-topic', title: 'Child Topic', order: 1 }],
  }],
};

const catalog = {
  version: 1,
  modules: [
    {
      slug: 'published-module',
      title: 'Published Module',
      canonicalTopics: ['root-topic', 'child-topic'],
      primaryTopic: 'child-topic',
      learningOrder: 10,
      status: 'published',
      prerequisites: [],
    },
    {
      slug: 'planned-module',
      title: 'Planned Module',
      canonicalTopics: ['root-topic', 'child-topic'],
      primaryTopic: 'child-topic',
      learningOrder: 20,
      status: 'planned',
      prerequisites: ['published-module'],
    },
  ],
};

const knowledgeRecords = [{
  slug: 'published-module',
  title: 'Published Module',
  canonicalTopics: ['root-topic', 'child-topic'],
}];

const problemRecords = [{
  slug: 'practice-one',
  canonicalTopics: ['root-topic', 'child-topic'],
  concepts: ['published-module'],
  techniques: [],
  prerequisites: [],
}];

test('public directory projects published and planned modules without private state', () => {
  const result = buildPublicKnowledgeDirectory({
    catalog, taxonomy, knowledgeRecords, problemRecords, base: '/',
  });
  assert.deepEqual(result.totals, { published: 1, planned: 1 });
  const child = result.topics[0].children[0];
  assert.equal(child.anchor, 'topic-child-topic');
  assert.equal(child.problemCount, 1);
  assert.deepEqual(child.modules.map((module) => ({
    slug: module.slug,
    href: module.href,
    problemCount: module.problemCount,
  })), [
    { slug: 'published-module', href: '/knowledge/published-module/', problemCount: 1 },
    { slug: 'planned-module', href: null, problemCount: null },
  ]);
  assert.deepEqual(child.modules[1].prerequisites, [{
    slug: 'published-module',
    title: 'Published Module',
    status: 'published',
    href: '/knowledge/published-module/',
  }]);
  assert.equal(JSON.stringify(result).match(/source|coverage|workstream|pageRange/gi), null);
});
```

- [ ] **Step 2: Run the focused test to verify RED**

Run:

```powershell
node --test --test-name-pattern="public directory projects" tests/quant-interview-knowledge-directory.test.mjs
```

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `quantInterviewKnowledgeDirectory.mjs`. A syntax failure is not the intended RED.

- [ ] **Step 3: Add malformed-catalog tests before implementation**

Append table-driven tests with literal expected error fragments:

```js
const invalidCases = [
  ['duplicate slug', { ...catalog, modules: [catalog.modules[0], catalog.modules[0]] }, /duplicate catalog slug: published-module/],
  ['invalid slug', { ...catalog, modules: [{ ...catalog.modules[0], slug: 'Not Valid' }, catalog.modules[1]] }, /invalid catalog slug: Not Valid/],
  ['invalid status', { ...catalog, modules: [{ ...catalog.modules[0], status: 'draft' }, catalog.modules[1]] }, /invalid module status: draft/],
  ['unknown topic', { ...catalog, modules: [{ ...catalog.modules[0], canonicalTopics: ['missing'], primaryTopic: 'missing' }] }, /unknown taxonomy topic: missing/],
  ['non-parent-first topics', { ...catalog, modules: [{ ...catalog.modules[0], canonicalTopics: ['child-topic', 'root-topic'] }, catalog.modules[1]] }, /taxonomy ancestor root-topic must precede child-topic: published-module/],
  ['primary topic not final', { ...catalog, modules: [{ ...catalog.modules[0], primaryTopic: 'root-topic' }] }, /primaryTopic must equal final canonical topic: published-module/],
  ['non-positive order', { ...catalog, modules: [{ ...catalog.modules[0], learningOrder: 0 }, catalog.modules[1]] }, /learningOrder must be a positive integer: published-module/],
  ['duplicate order', { ...catalog, modules: [catalog.modules[0], { ...catalog.modules[1], learningOrder: 10 }] }, /duplicate learningOrder 10 in child-topic/],
  ['unknown prerequisite', { ...catalog, modules: [{ ...catalog.modules[0], prerequisites: ['missing'] }, catalog.modules[1]] }, /unknown prerequisite: missing/],
  ['self prerequisite', { ...catalog, modules: [{ ...catalog.modules[0], prerequisites: ['published-module'] }, catalog.modules[1]] }, /self prerequisite: published-module/],
];

for (const [name, candidate, expected] of invalidCases) {
  test(`catalog rejects ${name}`, () => {
    assert.throws(
      () => validateKnowledgeCatalog(candidate, taxonomy, knowledgeRecords),
      expected,
    );
  });
}

test('catalog rejects prerequisite cycles', () => {
  const cyclic = {
    ...catalog,
    modules: catalog.modules.map((module) => ({
      ...module,
      prerequisites: module.slug === 'published-module'
        ? ['planned-module']
        : ['published-module'],
    })),
  };
  assert.throws(
    () => validateKnowledgeCatalog(cyclic, taxonomy, knowledgeRecords),
    /prerequisite cycle: planned-module -> published-module -> planned-module|prerequisite cycle: published-module -> planned-module -> published-module/,
  );
});

test('catalog accepts ordered sibling topic classifications with one primary placement', () => {
  const branchingTaxonomy = {
    version: 1,
    topics: [{
      id: 'root-topic', title: 'Root Topic', order: 1,
      children: [
        { id: 'child-topic', title: 'Child Topic', order: 1 },
        { id: 'sibling-topic', title: 'Sibling Topic', order: 2 },
      ],
    }],
  };
  const branchingCatalog = {
    version: 1,
    modules: [{
      ...catalog.modules[0],
      canonicalTopics: ['root-topic', 'child-topic', 'sibling-topic'],
      primaryTopic: 'sibling-topic',
    }],
  };
  const branchingKnowledge = [{
    ...knowledgeRecords[0],
    canonicalTopics: ['root-topic', 'child-topic', 'sibling-topic'],
  }];
  assert.equal(
    validateKnowledgeCatalog(branchingCatalog, branchingTaxonomy, branchingKnowledge),
    true,
  );
});
```

Also add one literal test for each published-state contract:

```js
test('catalog rejects published metadata drift and missing classified Knowledge', () => {
  assert.throws(
    () => validateKnowledgeCatalog(catalog, taxonomy, [{ ...knowledgeRecords[0], title: 'Wrong' }]),
    /published title mismatch: published-module/,
  );
  assert.throws(
    () => validateKnowledgeCatalog(catalog, taxonomy, [{ ...knowledgeRecords[0], canonicalTopics: ['root-topic'] }]),
    /published topic mismatch: published-module/,
  );
  assert.throws(
    () => validateKnowledgeCatalog(catalog, taxonomy, [
      ...knowledgeRecords,
      { slug: 'uncatalogued', title: 'Uncatalogued', canonicalTopics: ['root-topic'] },
    ]),
    /classified Knowledge missing from catalog: uncatalogued/,
  );
  assert.throws(
    () => validateKnowledgeCatalog(catalog, taxonomy, [
      ...knowledgeRecords,
      { slug: 'planned-module', title: 'Planned Module', canonicalTopics: ['root-topic', 'child-topic'] },
    ]),
    /planned module already has a public page: planned-module/,
  );
});
```

- [ ] **Step 4: Run the test file to confirm all cases fail because the helper is absent**

Run: `node --test tests/quant-interview-knowledge-directory.test.mjs`

Expected: FAIL at module loading; no production implementation exists yet.

- [ ] **Step 5: Implement the minimal catalog helper**

Create `src/lib/quantInterviewKnowledgeDirectory.mjs` with these exact public signatures:

```ts
export declare function flattenTaxonomy(taxonomy: QuantInterviewTaxonomy): FlatTopic[];
export declare function validateKnowledgeCatalog(
  catalog: KnowledgeCatalog,
  taxonomy: QuantInterviewTaxonomy,
  knowledgeRecords: KnowledgeRecord[],
): true;
export declare function buildPublicKnowledgeDirectory(input: {
  catalog: KnowledgeCatalog;
  taxonomy: QuantInterviewTaxonomy;
  knowledgeRecords: KnowledgeRecord[];
  problemRecords: ProblemRecord[];
  base?: string;
}): PublicKnowledgeDirectory;
```

Use plain JavaScript implementation with JSDoc where useful; do not add TypeScript compilation or a second schema system.

Implement `validateKnowledgeCatalog` in this exact order so failures remain actionable:

1. require `catalog.version === 1` and arrays for `modules` and taxonomy topics;
2. flatten taxonomy and create `topicById` with each node's `path`;
3. reject duplicate slugs;
4. require `status` in `planned|published`, URL-safe slug, positive integer order, and known topic ids; for every listed Topic require each taxonomy ancestor to occur earlier in `canonicalTopics`; allow sibling classifications after their shared ancestor; require `primaryTopic === canonicalTopics.at(-1)` and unique order within `primaryTopic`;
5. require every prerequisite slug to exist, reject self-links, then perform depth-first cycle detection using `visiting` and `visited` sets;
6. create `knowledgeBySlug`; for each `published` module require a real record and exact title/topics; for each `planned` module reject a real record;
7. require every `knowledgeRecords` entry to have exactly one catalog module;
8. return `true`.

Implement `buildPublicKnowledgeDirectory` by first calling the validator, then:

1. normalize `base` to one trailing slash;
2. count direct related Problems for published modules through `concepts`, `techniques`, or `prerequisites`;
3. count topic Problems when a Problem's topic array contains that topic id or a descendant id;
4. map prerequisites to `{ slug, title, status, href }`;
5. recursively preserve taxonomy order and attach modules sorted by `learningOrder` to any taxonomy node, including top-level nodes;
6. set published `href` to `${base}knowledge/${slug}/`, planned `href` and `problemCount` to `null`;
7. return only the public fields frozen in Interfaces.

- [ ] **Step 6: Run focused tests to verify GREEN**

Run: `node --test tests/quant-interview-knowledge-directory.test.mjs`

Expected: all Task 1 tests PASS with no warnings.

- [ ] **Step 7: Commit Task 1**

```powershell
git add src/lib/quantInterviewKnowledgeDirectory.mjs tests/quant-interview-knowledge-directory.test.mjs
git commit -m "feat: add quant interview curriculum model"
```

### Task 2: Bootstrap the Exact Curriculum Catalog

**Files:**
- Create: `src/data/quant-interview/topics/knowledge-catalog.json`
- Modify: `tests/quant-interview-knowledge-directory.test.mjs`

**Interfaces:**
- Consumes: Task 1 validator; current 48 explicitly topic-classified Knowledge Markdown files; existing taxonomy.
- Produces: version-1 catalog with exactly 50 modules: 48 `published` plus the two approved 013 `planned` modules.

- [ ] **Step 1: Add repository-catalog tests before the JSON exists**

Append imports and a real frontmatter reader to the test file:

```js
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

async function readRepositoryKnowledgeRecords() {
  const files = await readdir('src/content/knowledge', { recursive: true });
  const records = [];
  for (const file of files.filter((name) => String(name).endsWith('.md'))) {
    const fullPath = `src/content/knowledge/${String(file).replaceAll('\\', '/')}`;
    const text = await readFile(fullPath, 'utf8');
    const title = text.match(/^title:\s*(.+)$/m)?.[1]?.trim() ?? '';
    const topicText = text.match(/^quantInterviewTopics:\s*\[([^\]]*)\]$/m)?.[1] ?? '';
    const canonicalTopics = topicText.split(',').map((item) => item.trim()).filter(Boolean);
    if (canonicalTopics.length > 0) {
      records.push({ slug: path.basename(String(file), '.md'), title, canonicalTopics });
    }
  }
  return records.sort((a, b) => a.slug.localeCompare(b.slug));
}
```

Add the exact order contract:

```js
const exactOrder = {
  'reasoning-communication': [
    'problem-framing-clarification-assumption-management',
    'structured-think-aloud-reasoning',
  ],
  'logic-brainteasers-discrete-reasoning': ['recursion-problem-solving'],
  'modular-arithmetic': ['modular-arithmetic'],
  'invariants-state-transformations': ['identity-swapping-invariance', 'modular-invariants'],
  'limits-derivatives': [
    'derivative-definition-and-core-rules',
    'logarithmic-differentiation',
    'monotonicity-convexity-critical-points-and-inflection',
    'indeterminate-limits-and-growth-rates',
    'related-rates-and-implicit-differentiation',
    'bounded-monotone-convergence-and-fixed-points',
    'positive-series-convergence',
  ],
  'vectors-linear-systems': [
    'vector-geometry-inner-products',
    'linear-independence-span-basis-rank',
    'linear-systems-consistency',
  ],
  'determinants-eigenvalues': ['eigenvalues-eigenvectors', 'matrix-spectral-invariants'],
  'matrix-decompositions': [
    'eigenbasis-decomposition',
    'lu-cholesky-decomposition',
    'qr-decomposition',
    'singular-value-decomposition',
  ],
  'covariance-correlation-matrices': ['correlation-matrix'],
  'positive-semidefinite-matrices': ['positive-semidefinite-matrix', 'principal-minor-feasibility'],
  'probability-foundations': [
    'probability-spaces-events',
    'probability-axioms-derived-rules',
    'symmetry-equiprobability-geometric-probability',
  ],
  'combinatorial-probability': [
    'counting-permutations-combinations',
    'finite-combinatorial-probability-modeling',
    'inclusion-exclusion-derangements',
  ],
  'conditional-probability-bayes': ['conditioning', 'bayes-rule-base-rates'],
  'random-variables-distributions': [
    'random-variables-cdf-pmf-pdf',
    'common-probability-distributions',
    'random-variable-transformations-convolution',
    'gaussian-lognormal-structure',
    'limit-theorems-lln-clt',
  ],
  'expectation-variance-covariance': [
    'expectation-linearity-indicators',
    'conditional-expectation-tower-property',
    'expectation-variance-covariance-algebra',
    'moments-moment-generating-functions',
  ],
  'order-statistics-extremes': ['order-statistics-basics', 'joint-extremes-and-range'],
  'random-walks-markov-chains': [
    'finite-state-markov-chains',
    'markov-chain-state-compression',
    'first-step-analysis',
  ],
  'no-arbitrage-option-properties': [
    'no-arbitrage-principle',
    'static-arbitrage-construction',
    'option-price-convexity-in-strike',
  ],
};
```

Add the repository test:

```js
test('repository catalog contains the exact published corpus and planned 013 modules', async () => {
  const [catalogText, taxonomyText, knowledgeRecords] = await Promise.all([
    readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'),
    readFile('src/data/quant-interview/topics/taxonomy.json', 'utf8'),
    readRepositoryKnowledgeRecords(),
  ]);
  const repositoryCatalog = JSON.parse(catalogText);
  const repositoryTaxonomy = JSON.parse(taxonomyText);
  assert.equal(validateKnowledgeCatalog(repositoryCatalog, repositoryTaxonomy, knowledgeRecords), true);
  assert.equal(repositoryCatalog.modules.length, 50);
  assert.equal(repositoryCatalog.modules.filter((module) => module.status === 'published').length, 48);
  assert.deepEqual(
    repositoryCatalog.modules.filter((module) => module.status === 'planned').map((module) => module.slug).sort(),
    ['problem-framing-clarification-assumption-management', 'structured-think-aloud-reasoning'],
  );
  for (const [topic, slugs] of Object.entries(exactOrder)) {
    const actual = repositoryCatalog.modules
      .filter((module) => module.primaryTopic === topic)
      .sort((a, b) => a.learningOrder - b.learningOrder)
      .map((module) => module.slug);
    assert.deepEqual(actual, slugs, topic);
  }
});
```

- [ ] **Step 2: Run the repository test to verify RED**

Run:

```powershell
node --test --test-name-pattern="repository catalog contains" tests/quant-interview-knowledge-directory.test.mjs
```

Expected: FAIL with `ENOENT` for `knowledge-catalog.json`.

- [ ] **Step 3: Create the exact catalog**

Create `knowledge-catalog.json` with `version: 1`. For every slug in `exactOrder`, use its real title and exact `quantInterviewTopics` from frontmatter, set `primaryTopic` to the object key, and assign `learningOrder` values `10, 20, 30, ...` in listed order.

Use these exact planned records:

```json
{
  "slug": "problem-framing-clarification-assumption-management",
  "title": "Problem Framing, Clarification & Assumption Management",
  "canonicalTopics": ["interview-strategy-communication", "reasoning-communication"],
  "primaryTopic": "reasoning-communication",
  "learningOrder": 10,
  "status": "planned",
  "prerequisites": []
},
{
  "slug": "structured-think-aloud-reasoning",
  "title": "Structured Think-Aloud Reasoning",
  "canonicalTopics": ["interview-strategy-communication", "reasoning-communication"],
  "primaryTopic": "reasoning-communication",
  "learningOrder": 20,
  "status": "planned",
  "prerequisites": ["problem-framing-clarification-assumption-management"]
}
```

Apply this exact prerequisite map; every omitted slug uses `[]`:

```js
const exactPrerequisites = {
  'finite-combinatorial-probability-modeling': ['counting-permutations-combinations'],
  'inclusion-exclusion-derangements': ['counting-permutations-combinations'],
  'bayes-rule-base-rates': ['conditioning'],
  'matrix-spectral-invariants': ['eigenvalues-eigenvectors'],
  'conditional-expectation-tower-property': ['conditioning', 'expectation-linearity-indicators'],
  'expectation-variance-covariance-algebra': ['expectation-linearity-indicators'],
  'moments-moment-generating-functions': ['expectation-linearity-indicators', 'expectation-variance-covariance-algebra'],
  'modular-invariants': ['modular-arithmetic'],
  'logarithmic-differentiation': ['derivative-definition-and-core-rules'],
  'monotonicity-convexity-critical-points-and-inflection': ['derivative-definition-and-core-rules'],
  'indeterminate-limits-and-growth-rates': ['derivative-definition-and-core-rules'],
  'related-rates-and-implicit-differentiation': ['derivative-definition-and-core-rules'],
  'bounded-monotone-convergence-and-fixed-points': ['monotonicity-convexity-critical-points-and-inflection'],
  'eigenbasis-decomposition': ['eigenvalues-eigenvectors'],
  'lu-cholesky-decomposition': ['linear-independence-span-basis-rank'],
  'qr-decomposition': ['vector-geometry-inner-products', 'linear-independence-span-basis-rank'],
  'singular-value-decomposition': ['eigenvalues-eigenvectors', 'vector-geometry-inner-products'],
  'static-arbitrage-construction': ['no-arbitrage-principle'],
  'option-price-convexity-in-strike': ['no-arbitrage-principle', 'static-arbitrage-construction'],
  'joint-extremes-and-range': ['order-statistics-basics'],
  'principal-minor-feasibility': ['positive-semidefinite-matrix'],
  'probability-axioms-derived-rules': ['probability-spaces-events'],
  'symmetry-equiprobability-geometric-probability': ['probability-axioms-derived-rules'],
  'common-probability-distributions': ['random-variables-cdf-pmf-pdf'],
  'random-variable-transformations-convolution': ['random-variables-cdf-pmf-pdf', 'common-probability-distributions'],
  'gaussian-lognormal-structure': ['common-probability-distributions'],
  'limit-theorems-lln-clt': ['moments-moment-generating-functions'],
  'markov-chain-state-compression': ['finite-state-markov-chains'],
  'first-step-analysis': ['finite-state-markov-chains', 'conditioning'],
  'linear-independence-span-basis-rank': ['vector-geometry-inner-products'],
  'linear-systems-consistency': ['linear-independence-span-basis-rank'],
  'structured-think-aloud-reasoning': ['problem-framing-clarification-assumption-management']
};
```

Keep modules grouped by taxonomy order and then `learningOrder`; format with two-space JSON indentation and a final newline.

- [ ] **Step 4: Run repository catalog tests to verify GREEN**

Run:

```powershell
node --test tests/quant-interview-knowledge-directory.test.mjs
npm run check
```

Expected: all directory tests PASS; Astro content validation reports 0 errors.

- [ ] **Step 5: Commit Task 2**

```powershell
git add src/data/quant-interview/topics/knowledge-catalog.json tests/quant-interview-knowledge-directory.test.mjs
git commit -m "data: add quant interview curriculum catalog"
```

### Task 3: Public Learning Directory and Hub Navigation

**Files:**
- Create: `src/pages/knowledge/quant-interview/directory.astro`
- Modify: `src/components/QuantInterviewTopicCard.astro`
- Modify: `src/pages/knowledge/quant-interview/index.astro`
- Modify: `tests/quant-interview-knowledge-directory.test.mjs`
- Modify: `tests/quant-interview-topic-public-shell.test.mjs`

**Interfaces:**
- Consumes: Task 1 `buildPublicKnowledgeDirectory`; Task 2 catalog; Astro `knowledge` and `problems` collections; existing `QuantInterviewTopicCard`.
- Produces: `/knowledge/quant-interview/directory/`; topic cards with `learnHref` and existing Practice behavior; server-rendered searchable module rows.

- [ ] **Step 1: Add the real repository projection test**

Append a helper that reads Problem frontmatter fields used by the public projection:

```js
async function readRepositoryProblemRecords() {
  const files = await readdir('src/content/problems', { recursive: true });
  const records = [];
  for (const file of files.filter((name) => String(name).endsWith('.md'))) {
    const fullPath = `src/content/problems/${String(file).replaceAll('\\', '/')}`;
    const text = await readFile(fullPath, 'utf8');
    const readArray = (field) => {
      const value = text.match(new RegExp(`^${field}:\\s*\\[([^\\]]*)\\]$`, 'm'))?.[1] ?? '';
      return value.split(',').map((item) => item.trim()).filter(Boolean);
    };
    records.push({
      slug: path.basename(String(file), '.md'),
      canonicalTopics: readArray('quantInterviewTopics'),
      concepts: readArray('concepts'),
      techniques: readArray('techniques'),
      prerequisites: readArray('prerequisites'),
    });
  }
  return records;
}
```

Add:

```js
test('repository public projection exposes the complete source-neutral curriculum', async () => {
  const [catalogText, taxonomyText, knowledgeRecords, problemRecords] = await Promise.all([
    readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'),
    readFile('src/data/quant-interview/topics/taxonomy.json', 'utf8'),
    readRepositoryKnowledgeRecords(),
    readRepositoryProblemRecords(),
  ]);
  const result = buildPublicKnowledgeDirectory({
    catalog: JSON.parse(catalogText),
    taxonomy: JSON.parse(taxonomyText),
    knowledgeRecords,
    problemRecords,
    base: '/',
  });
  assert.deepEqual(result.totals, { published: 48, planned: 2 });
  assert.equal(result.topics.length, 10);
  const interview = result.topics.find((topic) => topic.id === 'interview-strategy-communication');
  const reasoning = interview.children.find((topic) => topic.id === 'reasoning-communication');
  assert.deepEqual(reasoning.modules.map((module) => [module.slug, module.status, module.href]), [
    ['problem-framing-clarification-assumption-management', 'planned', null],
    ['structured-think-aloud-reasoning', 'planned', null],
  ]);
  const logic = result.topics.find((topic) => topic.id === 'logic-brainteasers-discrete-reasoning');
  assert.equal(logic.modules.some((module) => module.slug === 'recursion-problem-solving'), true);
  assert.equal(result.topics.some((topic) => topic.id === 'fixed-income-rates-general-finance'), true);
  assert.equal(JSON.stringify(result).match(/green-book|red-book|150-most|coverage|sourceSection|pageRange|workstream/gi), null);
});
```

- [ ] **Step 2: Run the projection test and confirm its pre-route GREEN baseline**

Run:

```powershell
node --test --test-name-pattern="repository public projection" tests/quant-interview-knowledge-directory.test.mjs
```

Expected: PASS. This characterizes the public view model before UI code and ensures later rendering receives only public-safe data.

- [ ] **Step 3: Prove the production route is missing**

Run:

```powershell
npm run build
$routeExists = Test-Path 'dist\knowledge\quant-interview\directory\index.html'
$hub = Get-Content -Raw 'dist\knowledge\quant-interview\index.html'
$learnLinkExists = $hub -match '/knowledge/quant-interview/directory/#topic-'
if ($routeExists -and $learnLinkExists) { exit 0 } else { exit 1 }
```

Expected: the build itself succeeds, then the assertion exits 1 because both the directory route and Topic Learn links are absent. A build failure is not the intended RED.

- [ ] **Step 4: Create the public directory route**

Create `directory.astro` with these build-time records:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../../layouts/BaseLayout.astro';
import catalog from '../../../data/quant-interview/topics/knowledge-catalog.json';
import { getQuantInterviewTaxonomy } from '../../../lib/quantInterviewPublicTopics';
import { buildPublicKnowledgeDirectory } from '../../../lib/quantInterviewKnowledgeDirectory.mjs';
import { slugOf } from '../../../lib/problemRelations';

const base = import.meta.env.BASE_URL;
const knowledge = await getCollection('knowledge');
const problems = await getCollection('problems');
const knowledgeRecords = knowledge
  .filter((entry) => entry.data.quantInterviewTopics.length > 0)
  .map((entry) => ({
    slug: slugOf(entry.id),
    title: entry.data.title,
    canonicalTopics: entry.data.quantInterviewTopics,
  }));
const problemRecords = problems.map((entry) => ({
  slug: slugOf(entry.id),
  canonicalTopics: entry.data.quantInterviewTopics,
  concepts: entry.data.concepts,
  techniques: entry.data.techniques,
  prerequisites: entry.data.prerequisites,
}));
const directory = buildPublicKnowledgeDirectory({
  catalog,
  taxonomy: getQuantInterviewTaxonomy(),
  knowledgeRecords,
  problemRecords,
  base,
});
---
```

Render all data server-side with this semantic hierarchy:

```astro
<BaseLayout title="Quant Interview Knowledge Directory · Lorien Lab" description="A Topic-first curriculum connecting quantitative interview knowledge with canonical practice problems.">
  <header class="directory-hero">
    <div class="container hero-grid">
      <div><div class="mono-label">Knowledge · Quant Interview</div><h1>Knowledge Directory.</h1><p>Learn concepts in a deliberate order, then practice the canonical problems connected to each topic.</p></div>
      <div class="directory-stats" aria-label="Curriculum module counts"><span><strong>{directory.totals.published}</strong>Published</span><span><strong>{directory.totals.planned}</strong>Planned</span></div>
    </div>
  </header>
  <section class="section">
    <div class="container">
      <nav class="topic-jump" aria-label="Knowledge directory topics">
        {directory.topics.map((topic) => <a href={`#${topic.anchor}`}>{topic.title}</a>)}
      </nav>
      <div class="directory-controls" data-directory-controls>
        <label><span>Search modules</span><input type="search" data-directory-search placeholder="Concept, technique, or topic…" /></label>
        <div role="group" aria-label="Module status">
          <button type="button" data-status-filter="all" aria-pressed="true">All</button>
          <button type="button" data-status-filter="published" aria-pressed="false">Published</button>
          <button type="button" data-status-filter="planned" aria-pressed="false">Planned</button>
        </div>
        <p role="status" aria-live="polite"><strong data-directory-count>{directory.totals.published + directory.totals.planned}</strong> modules shown</p>
      </div>
      <!-- Recursively render each topic node, its own modules, then children. -->
      <p data-directory-empty hidden>No curriculum modules match the current filters.</p>
    </div>
  </section>
</BaseLayout>
```

For every taxonomy node render a section with `id={topic.anchor}`, title, derived `problemCount`, and Practice link `${base}problems/?topic=${encodeURIComponent(topic.id)}`. Render its modules in order. A published module title is a link to `module.href`; a planned title is plain text. Add `data-directory-row`, `data-status`, and lowercase `data-search` containing module title plus topic titles. Render prerequisite labels and module Problem count only when non-null. Preserve empty taxonomy nodes with `No curriculum modules published or planned yet`.

- [ ] **Step 5: Add progressive search and status filtering**

Add one inline script that:

1. caches all `[data-directory-row]` elements;
2. tracks `activeStatus = 'all'`;
3. matches lowercase search text and exact status;
4. toggles each row's `hidden` property;
5. hides a topic container only when it has catalog rows and all are filtered out; permanent no-curriculum taxonomy states remain visible;
6. updates the live count and global no-results message;
7. updates `aria-pressed` on status buttons;
8. resets filters on `pageshow` without persisting state.

Use exact state values `all`, `published`, and `planned`. Do not import hidden state or write to local storage.

- [ ] **Step 6: Add compact responsive styling**

Use scoped CSS following the existing dark hero, mono-label, teal accent, border, and surface tokens. Desktop module rows use a compact grid for order, title, status, prerequisites, Problem count, and action. Below 900px, stack metadata under the title; below 640px, use one column and preserve 320px minimum width. Planned rows use text plus a visible `Planned` badge, not disabled-looking fake links.

- [ ] **Step 7: Add Learn and Practice actions to Topic cards**

Change the component interface to:

```ts
interface Props {
  topic: QuantInterviewTopic;
  knowledgeCount: number;
  problemCount: number;
  learnHref: string;
}
```

Replace the single header action with two links:

```astro
<div class="topic-actions">
  <a href={learnHref} aria-label={`Learn ${topic.title} knowledge`}>Learn →</a>
  <a href={problemHref} aria-label={`Practice ${topic.title} problems`}>Practice →</a>
</div>
```

In the hub page call the component with:

```astro
<QuantInterviewTopicCard
  topic={topic}
  knowledgeCount={knowledgeCount}
  problemCount={problemCount}
  learnHref={`${base}knowledge/quant-interview/directory/#topic-${topic.id}`}
/>
```

Add a primary hero action linking to `${base}knowledge/quant-interview/directory/` with label `Open Knowledge Directory` while preserving the existing Problem Bank action.

- [ ] **Step 8: Run focused and build verification**

Run:

```powershell
node --test tests/quant-interview-knowledge-directory.test.mjs tests/quant-interview-topic-public-shell.test.mjs
npm run check
npm run build
Test-Path 'dist\knowledge\quant-interview\directory\index.html'
$hub = Get-Content -Raw 'dist\knowledge\quant-interview\index.html'
$hub -match '/knowledge/quant-interview/directory/#topic-'
```

Expected: tests PASS; Astro reports 0 errors; build succeeds; both PowerShell assertions return `True`. The existing public-shell hidden-import test must continue to cover the new route recursively.

- [ ] **Step 9: Commit Task 3**

```powershell
git add src/pages/knowledge/quant-interview/directory.astro src/components/QuantInterviewTopicCard.astro src/pages/knowledge/quant-interview/index.astro tests/quant-interview-knowledge-directory.test.mjs tests/quant-interview-topic-public-shell.test.mjs
git commit -m "feat: add quant interview knowledge directory"
```

### Task 4: Deterministic Internal Extraction Directory

**Files:**
- Create: `scripts/generate-quant-interview-knowledge-directory.mjs`
- Create: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`
- Modify: `tests/quant-interview-knowledge-directory.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: Task 1 public helper and Task 2 catalog; taxonomy; public content frontmatter; source-topic map; three coverage ledgers; all workstream manifests.
- Produces: `buildInternalDirectoryModel(inputs)`, `renderInternalDirectoryMarkdown(model)`, `loadRepositoryDirectoryInputs(repoRoot)`, and CLI modes `--write`/`--check` with optional `--repo-root` and `--output`.

- [ ] **Step 1: Write failing internal-model and renderer tests**

Append imports:

```js
import { mkdtemp, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import {
  buildInternalDirectoryModel,
  renderInternalDirectoryMarkdown,
} from '../scripts/generate-quant-interview-knowledge-directory.mjs';
```

Use a literal internal fixture built on the Task 1 public fixture:

```js
const internalFixture = {
  publicDirectory: buildPublicKnowledgeDirectory({
    catalog, taxonomy, knowledgeRecords, problemRecords, base: '/',
  }),
  problemRecords,
  sourceTopicMap: {
    entries: [
      { source: 'green-book', sourceSection: '1.1', role: 'content', canonicalTopics: ['child-topic'] },
      { source: 'red-book', sourceSection: '2.1', role: 'content', canonicalTopics: ['child-topic'] },
    ],
  },
  coverageLedgers: {
    'green-book': { entries: [{ sourceSection: '1.1', sourceItem: null, canonicalTopics: ['child-topic'], state: 'knowledge-only', canonicalProblems: [], canonicalKnowledge: ['published-module'], resolutionNote: 'Resolved.' }] },
    'red-book': { entries: [{ sourceSection: '2.1', sourceItem: null, canonicalTopics: ['child-topic'], state: 'pending', canonicalProblems: [], canonicalKnowledge: [] }] },
    '150-most-frequently-asked': { entries: [] },
  },
  workstreams: [{ id: 'child-topic-001', status: 'active', canonicalTopics: ['root-topic', 'child-topic'], sourceScopes: [] }],
};

test('internal directory joins exact source coverage and workstream state', () => {
  const model = buildInternalDirectoryModel(internalFixture);
  const child = model.topics[0].children[0];
  assert.deepEqual(child.sources, {
    'green-book': ['1.1'],
    'red-book': ['2.1'],
    '150-most-frequently-asked': [],
  });
  assert.deepEqual(child.coverage, {
    'green-book': { 'knowledge-only': 1 },
    'red-book': { pending: 1 },
    '150-most-frequently-asked': {},
  });
  assert.deepEqual(child.workstreams, [{ id: 'child-topic-001', status: 'active' }]);
});

test('internal Markdown is deterministic and contains no completion percentage', () => {
  const model = buildInternalDirectoryModel(internalFixture);
  const first = renderInternalDirectoryMarkdown(model);
  const second = renderInternalDirectoryMarkdown(model);
  assert.equal(first, second);
  assert.match(first, /^# Quant Interview Knowledge Directory$/m);
  assert.match(first, /Green Book sections: `1\.1`/);
  assert.match(first, /Red Book sections: `2\.1`/);
  assert.match(first, /`knowledge-only`: 1/);
  assert.match(first, /`pending`: 1/);
  assert.match(first, /`child-topic-001` \(active\)/);
  assert.doesNotMatch(first, /\d+(?:\.\d+)?%|percent complete|completion rate/i);
  assert.equal(first.endsWith('\n'), true);
});
```

- [ ] **Step 2: Run the internal tests to verify RED**

Run:

```powershell
node --test --test-name-pattern="internal directory|internal Markdown" tests/quant-interview-knowledge-directory.test.mjs
```

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for the generator script.

- [ ] **Step 3: Implement pure internal model and Markdown functions**

Create the script with these exact exports and a safe import guard:

```ts
export declare function buildInternalDirectoryModel(inputs: InternalDirectoryInputs): InternalDirectoryModel;
export declare function renderInternalDirectoryMarkdown(model: InternalDirectoryModel): string;
export declare function loadRepositoryDirectoryInputs(repoRoot?: string): Promise<InternalDirectoryInputs>;
```

Use the following executable guard after the real `main(argv)` implementation:

```js
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
```

Use constant source order `['green-book', 'red-book', '150-most-frequently-asked']` and labels `Green Book`, `Red Book`, and `150 Questions`.
Load repository JSON through `readFile` plus `JSON.parse` inside `loadRepositoryDirectoryInputs`; do not rely on experimental JSON-module import behavior in the CLI.

Implement `buildInternalDirectoryModel` by:

1. flattening taxonomy and computing each topic's descendant id set;
2. recursively walking `publicDirectory.topics` without mutating it;
3. for each node and each source, selecting `role: content` source-map sections whose topic ids intersect the descendant set, de-duplicating and natural-sorting section ids;
4. for each source, counting coverage entries whose `canonicalTopics` intersect the descendant set by exact `state`;
5. selecting workstreams whose `canonicalTopics` intersect the descendant set and returning `{ id, status }` sorted by id;
6. deriving `problemTotal` from the unique slugs in `inputs.problemRecords`;
7. preserving the public node fields and adding only `{ sources, coverage, workstreams }` internally.

Implement Markdown in this exact section order:

```text
# Quant Interview Knowledge Directory

> Generated from repository state. Do not edit manually.
>
> Source-file or TOC verification does not imply complete problem-level coverage. Counts below are exact repository records, never whole-book completion percentages.

## Summary

- Published Knowledge: <derived>
- Planned Knowledge: <derived>
- Canonical Problems: <derived unique problem total from problemRecords>

## 01. <Top-level Topic>

### 01.01. <Child Topic>

- Curriculum: <published> published / <planned> planned
- Problems: <derived>
- Green Book sections: <sorted backtick list or None>
- Red Book sections: <sorted backtick list or None>
- 150 Questions sections: <sorted backtick list or None>
- Workstreams: <backtick id plus status or None>

#### Modules

| Order | State | Slug | Prerequisites |
|---:|---|---|---|
...

#### Coverage records

- Green Book: <backtick state counts or None>
- Red Book: <backtick state counts or None>
- 150 Questions: <backtick state counts or None>
```

Render top-level modules before child sections using the same Modules table. Sort coverage states alphabetically, source sections with `Intl.Collator('en', { numeric: true })`, and finish with exactly one newline. Do not emit source prose, resolution notes, page ranges, hashes, or percentages.

Implement `loadRepositoryDirectoryInputs` by reading actual JSON relative to `repoRoot`, recursively reading public Knowledge/Problem Markdown with the same field shapes as Task 3, reading every `src/data/quant-interview/workstreams/*.json`, and calling Task 1's public builder. Use `Promise.all` for independent file reads.

- [ ] **Step 4: Run pure internal tests to verify GREEN**

Run:

```powershell
node --test --test-name-pattern="internal directory|internal Markdown" tests/quant-interview-knowledge-directory.test.mjs
```

Expected: both tests PASS.

- [ ] **Step 5: Add real CLI write/check behavior and failing stale-file test**

CLI rules:

- exactly one of `--write` or `--check` is required;
- default `--repo-root` is `process.cwd()`;
- default output is `<repo-root>/docs/quant-interview/KNOWLEDGE_DIRECTORY.md`;
- `--write` writes UTF-8 generated Markdown;
- `--check` reads output and exits nonzero with `Knowledge directory is stale; run npm run knowledge:directory` when bytes differ or the file is missing;
- unknown or conflicting arguments exit nonzero with a concise usage string.

Add a real process test:

```js
test('directory CLI detects and repairs a stale generated file', async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'knowledge-directory-'));
  const output = path.join(tempRoot, 'KNOWLEDGE_DIRECTORY.md');
  await writeFile(output, 'stale\n', 'utf8');
  const script = 'scripts/generate-quant-interview-knowledge-directory.mjs';
  const stale = spawnSync(process.execPath, [script, '--check', '--repo-root', process.cwd(), '--output', output], { encoding: 'utf8' });
  assert.notEqual(stale.status, 0);
  assert.match(stale.stderr, /Knowledge directory is stale/);
  const write = spawnSync(process.execPath, [script, '--write', '--repo-root', process.cwd(), '--output', output], { encoding: 'utf8' });
  assert.equal(write.status, 0, write.stderr);
  const fresh = spawnSync(process.execPath, [script, '--check', '--repo-root', process.cwd(), '--output', output], { encoding: 'utf8' });
  assert.equal(fresh.status, 0, fresh.stderr);
});
```

Run the single test before CLI implementation is complete. Expected: FAIL because `--check` does not yet return the specified stale error. Implement the CLI, rerun, and expect PASS.

- [ ] **Step 6: Add package scripts and generate the committed snapshot**

Add to `package.json`:

```json
"knowledge:directory": "node scripts/generate-quant-interview-knowledge-directory.mjs --write",
"knowledge:directory:check": "node scripts/generate-quant-interview-knowledge-directory.mjs --check"
```

Run:

```powershell
npm run knowledge:directory
npm run knowledge:directory:check
node --test tests/quant-interview-knowledge-directory.test.mjs
```

Expected: the internal document is created, check mode passes, and all directory tests pass.

- [ ] **Step 7: Audit private/public boundaries**

Run:

```powershell
rg -n "coverage|source-topic-map|workstreams|green-book|red-book|150-most" src/pages/knowledge/quant-interview/directory.astro src/lib/quantInterviewKnowledgeDirectory.mjs
```

Expected: no matches. Then run the existing hidden-infrastructure regression:

```powershell
node --test tests/quant-interview-topic-foundation.test.mjs tests/quant-interview-topic-public-shell.test.mjs
```

Expected: PASS.

- [ ] **Step 8: Commit Task 4**

```powershell
git add scripts/generate-quant-interview-knowledge-directory.mjs docs/quant-interview/KNOWLEDGE_DIRECTORY.md package.json tests/quant-interview-knowledge-directory.test.mjs
git commit -m "feat: generate internal knowledge extraction directory"
```

### Task 5: Documentation, Repository Memory, Full Gates, and Browser QA

**Files:**
- Modify: `docs/quant-interview/README.md`
- Modify: `README.md`
- Read/verify: `docs/quant-interview/CONTINUE_EXTRACTION_TASK.md`
- Modify if QA finds defects: files from Tasks 1–4 and their covering test.

**Interfaces:**
- Consumes: complete public and internal directories.
- Produces: durable agent entry points, fresh repository verification, desktop/mobile interaction evidence, and a clean reviewed branch.

- [ ] **Step 1: Document the two-directory contract**

In `docs/quant-interview/README.md`, add a `Knowledge Directory` section after Machine-readable state with these exact responsibilities:

```text
- `src/data/quant-interview/topics/knowledge-catalog.json` is the public-safe canonical curriculum order.
- `/knowledge/quant-interview/directory/` is the source-neutral public learning directory.
- `docs/quant-interview/KNOWLEDGE_DIRECTORY.md` is generated internal extraction state; never edit it manually.
- Run `npm run knowledge:directory` after catalog, taxonomy, public Knowledge/Problems, source routing, coverage, or workstream changes.
- Run `npm run knowledge:directory:check` before integration.
- Planned modules reserve learning destinations but are not published pages or completion claims.
```

In the Mandatory startup list, add `CONTINUE_EXTRACTION_TASK.md` immediately after `HANDOFF.md` and describe it as the single reusable execution brief for a new bounded extraction Agent.

In root `README.md`, add the catalog and generated directory to the Quant Interview repository-memory tree and document the two npm commands. State explicitly that the public route cannot import hidden source state and that the internal document cannot be used to claim whole-book completeness.

Do not add a prose-presence test; these are human/agent instructions, not executable behavior.

- [ ] **Step 2: Run fresh ordered repository gates**

Run:

```powershell
npm run knowledge:directory:check
npm run test
npm run check
npm run build
git diff --check
```

Expected:

- generated directory is current;
- all repository tests pass with zero failures;
- Astro reports zero errors;
- production build succeeds and emits `dist/knowledge/quant-interview/directory/index.html`;
- no whitespace errors.

- [ ] **Step 3: Start the production preview for browser QA**

Run:

```powershell
npm run preview -- --host 127.0.0.1 --port 4321
```

The flow under test is:

```text
Quant Interview hub → Learn action → matching directory Topic → published Knowledge → topic-filtered Problem Bank
```

- [ ] **Step 4: Verify desktop behavior**

At a normal desktop viewport, verify:

1. `/knowledge/quant-interview/` loads with no framework overlay or console errors;
2. each Topic card exposes distinct Learn and Practice links;
3. Learn lands on `/knowledge/quant-interview/directory/#topic-<id>`;
4. the directory hero reports exactly `48 Published` and `2 Planned`;
5. all 10 top-level Topics are present in canonical order;
6. Published filter shows 48 modules;
7. Planned filter shows exactly the two approved 013 modules;
8. search `Structured Think-Aloud` shows one planned module;
9. reset restores 50 modules;
10. planned modules have no detail link;
11. a published module opens its real Knowledge detail page;
12. Practice opens `/problems/?topic=<topic-id>` with the correct topic filter;
13. page DOM contains none of `Green Book`, `Red Book`, `150 Questions`, `sourceSection`, `evidencePageRanges`, or coverage-state names.

Capture one directory overview screenshot and one filtered planned-state screenshot outside the repository.

- [ ] **Step 5: Verify mobile and shell states**

At `390×844`, verify:

- no horizontal scrolling, clipping, overlapping header, or unreadable status controls;
- module metadata wraps below titles;
- Topic navigation and filters remain keyboard/touch usable;
- light and dark themes preserve contrast;
- switching the global shell to Chinese does not break layout, although full directory translation remains out of scope;
- browser console remains free of relevant warnings/errors.

Reset any temporary viewport override and stop the preview server after QA.

- [ ] **Step 6: Fix QA defects through RED → GREEN**

For every defect, first add the smallest automated test that would fail for the observed behavior when the behavior is testable in the helper/generator. Run it and confirm the intended RED, make the minimal fix, rerun the focused test, then repeat the browser interaction. Pure visual CSS corrections require before/after screenshots and the same browser path; do not invent source-text assertions for CSS.

- [ ] **Step 7: Re-run final committed-tree gates and audit scope**

Run:

```powershell
npm run knowledge:directory:check
npm run test
npm run check
npm run build
git diff --check
git status --short
```

Expected: all gates pass and status contains only intentional Task 5 documentation or QA corrections. Confirm there is no diff in:

```text
src/data/quant-interview/coverage/
src/data/quant-interview/topics/source-topic-map.json
src/data/quant-interview/workstreams/
docs/quant-interview/HANDOFF.md
src/content/knowledge/
src/content/problems/
```

- [ ] **Step 8: Commit Task 5**

```powershell
git add README.md docs/quant-interview/README.md
# Add only reviewed QA files if Step 6 changed them.
git commit -m "docs: document quant interview knowledge directories"
```

- [ ] **Step 9: Perform task and whole-branch reviews**

Use the execution skill's task-review gate for every prior task, then generate one whole-branch review package from the branch merge base through `HEAD`. The final reviewer must verify spec compliance, public/private isolation, catalog correctness, test quality, deterministic generation, browser evidence, and absence of Workstream 013 shared-state changes. Resolve all Critical/Important findings through the documented fix loop before branch completion.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-26-quant-interview-knowledge-directory.md`. Two execution options:

1. **Subagent-Driven (recommended)** — dispatch a fresh implementer per task with task-scoped review and a broad final review.
2. **Inline Execution** — execute the same tasks in this session using `executing-plans`, with review checkpoints.
