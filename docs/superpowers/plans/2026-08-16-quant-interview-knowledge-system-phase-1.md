# Quant Interview Knowledge System Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static-first foundation for Lorien Lab’s Quant Interview Knowledge System: first-class Problem and Problem Source collections, dedicated routes and layouts, Knowledge integration, reverse-linked concepts/techniques, and a small non-copyright-sensitive seed corpus.

**Architecture:** Preserve the existing Knowledge collection as the conceptual graph. Add `problems` and `problemSources` as independent Astro content collections, centralize cross-collection relationship validation in one helper, render Problems through a dedicated workspace layout, and expose the system through `/knowledge/quant-interview/`, `/problems/`, and source-detail routes. Green Book and Red Book are represented as source containers only in Phase 1; do not fabricate or transcribe source-derived questions before verified source material is available.

**Tech Stack:** Astro 5, TypeScript, Astro Content Collections, Markdown, static HTML/CSS, native `<details>` disclosure UI, Node built-in test runner.

## Global Constraints

- Existing Knowledge URLs and the current `concept | paper | tool | topic` model remain stable.
- Problems are a separate `problems` collection and must not become a fifth Knowledge type.
- Techniques are existing Knowledge `concept` entries with `category: Problem Solving Techniques`; there is no separate Technique collection.
- Green Book and Red Book are source/provenance objects, not the site ontology.
- Phase 1 must not copy, reconstruct, or fabricate Green Book / Red Book problem text or answers.
- Phase 1 may use a small Lorien Lab original seed corpus to prove Problem/Concept/Technique relationships.
- All displayed corpus counts must be derived from real content.
- Do not render placeholder external URLs or unresolved relationship links.
- Problem Math / Insight / Interview difficulty values are integers from 1 to 5.
- Core Problem access must work without browser JavaScript.
- Hints and solutions are collapsed using native HTML disclosure behavior.
- Reuse the existing Lorien Lab visual language and light/dark theme; do not create a separate LeetCode-style app.
- Every implementation task follows test-first development.
- Completion gates are `npm run test`, `npm run check`, and `npm run build`.

---

## File Map

### New content and schema surfaces

- `src/content/problem-sources/green-book.md` — truthful Green Book source container with no guessed bibliography.
- `src/content/problem-sources/red-book.md` — truthful Red Book source container with no guessed bibliography.
- `src/content/problems/original/conditional-dice-expectation.md` — original Lorien Lab seed problem.
- `src/content/problems/original/random-walk-boundary.md` — original Lorien Lab seed problem.
- `src/content/knowledge/concepts/conditioning.md` — reusable problem-solving technique.
- `src/content/knowledge/concepts/first-step-analysis.md` — reusable problem-solving technique.
- `src/content/knowledge/concepts/recursion-problem-solving.md` — reusable problem-solving technique.
- `src/content.config.ts` — add `problems` and `problemSources` schemas and exports.

### New relation/domain utilities

- `src/lib/problemRelations.ts` — canonical slug helpers, relationship validation, reverse lookups, source grouping/sorting.

### New Problem UI

- `src/components/ProblemDifficulty.astro` — three-dimensional 1–5 difficulty display.
- `src/components/ProblemCard.astro` — problem index/list card.
- `src/layouts/ProblemLayout.astro` — dedicated problem workspace.
- `src/pages/problems/index.astro` — searchable/filterable Problem Bank.
- `src/pages/problems/[...slug].astro` — canonical Problem detail route.

### New Quant Interview hub/source UI

- `src/components/QuantInterviewGateway.astro` — gateway on the main Knowledge landing page.
- `src/pages/knowledge/quant-interview/index.astro` — Quant Interview hub.
- `src/pages/knowledge/quant-interview/sources/index.astro` — source directory.
- `src/pages/knowledge/quant-interview/sources/[...slug].astro` — source detail page.

### Existing surfaces to modify

- `src/pages/knowledge/index.astro` — add the Quant Interview gateway only; keep general index problem-free.
- `src/pages/knowledge/[...id].astro` — add reverse-linked related Problems for Concept/Technique entries.
- `README.md` — add authoring contract for problems and source-derived material.

### Tests

- `tests/quant-interview-foundation.test.mjs` — structural/route/schema contract.
- `tests/problem-content-contract.test.mjs` — source/provenance/reveal/seed-content guardrails.

---

### Task 1: Define the Phase 1 regression contract

**Files:**
- Create: `tests/quant-interview-foundation.test.mjs`
- Create: `tests/problem-content-contract.test.mjs`

**Interfaces:**
- Consumes: existing Node test runner from `package.json` (`node --test tests/*.test.mjs`).
- Produces: failing contracts for new schemas, routes, layouts, gateways, reverse links, disclosure behavior, source truthfulness, and seed-data policy.

- [ ] **Step 1: Create the structural failing test**

Create `tests/quant-interview-foundation.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const requiredFiles = [
  'src/lib/problemRelations.ts',
  'src/components/ProblemDifficulty.astro',
  'src/components/ProblemCard.astro',
  'src/components/QuantInterviewGateway.astro',
  'src/layouts/ProblemLayout.astro',
  'src/pages/problems/index.astro',
  'src/pages/problems/[...slug].astro',
  'src/pages/knowledge/quant-interview/index.astro',
  'src/pages/knowledge/quant-interview/sources/index.astro',
  'src/pages/knowledge/quant-interview/sources/[...slug].astro',
];

test('quant interview foundation exposes all required surfaces', async () => {
  for (const file of requiredFiles) await access(file);
});

test('content config models problems and problem sources without adding a knowledge type', async () => {
  const config = await readFile('src/content.config.ts', 'utf8');
  assert.match(config, /const problems = defineCollection/);
  assert.match(config, /const problemSources = defineCollection/);
  assert.match(config, /mathDifficulty/);
  assert.match(config, /insightDifficulty/);
  assert.match(config, /interviewDifficulty/);
  assert.match(config, /Problem Solving Techniques/);
  assert.doesNotMatch(config, /type:\s*z\.enum\(\[[^\]]*['"]problem['"]/s);
  assert.doesNotMatch(config, /type:\s*z\.enum\(\[[^\]]*['"]technique['"]/s);
});

test('problem detail route uses the dedicated layout and canonical problems namespace', async () => {
  const route = await readFile('src/pages/problems/[...slug].astro', 'utf8');
  assert.match(route, /ProblemLayout/);
  assert.match(route, /getCollection\(['"]problems['"]\)/);
  assert.doesNotMatch(route, /knowledge\/problems/);
});

test('knowledge landing exposes the quant interview gateway without merging problems into the general index', async () => {
  const page = await readFile('src/pages/knowledge/index.astro', 'utf8');
  assert.match(page, /QuantInterviewGateway/);
  assert.match(page, /knowledge\/quant-interview\//);
  assert.doesNotMatch(page, /getCollection\(['"]problems['"]\).*entries/s);
});

test('knowledge detail supports reverse-linked related problems', async () => {
  const page = await readFile('src/pages/knowledge/[...id].astro', 'utf8');
  assert.match(page, /getCollection\(['"]problems['"]\)/);
  assert.match(page, /Related Problems/);
  assert.match(page, /getProblemsForKnowledgeSlug/);
});

test('problem bank is static-first with progressive filters', async () => {
  const page = await readFile('src/pages/problems/index.astro', 'utf8');
  assert.match(page, /data-problem-row/);
  assert.match(page, /data-problem-search/);
  assert.match(page, /data-source-filter/);
  assert.match(page, /data-difficulty-filter/);
  assert.match(page, /data-concept-filter/);
  assert.match(page, /data-technique-filter/);
});
```

- [ ] **Step 2: Create the content/truthfulness failing test**

Create `tests/problem-content-contract.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const sourceFiles = [
  'src/content/problem-sources/green-book.md',
  'src/content/problem-sources/red-book.md',
];

const techniqueFiles = [
  'src/content/knowledge/concepts/conditioning.md',
  'src/content/knowledge/concepts/first-step-analysis.md',
  'src/content/knowledge/concepts/recursion-problem-solving.md',
];

const seedProblems = [
  'src/content/problems/original/conditional-dice-expectation.md',
  'src/content/problems/original/random-walk-boundary.md',
];

test('phase 1 includes truthful source containers and original seed problems', async () => {
  for (const file of [...sourceFiles, ...techniqueFiles, ...seedProblems]) await access(file);

  for (const file of sourceFiles) {
    const source = await readFile(file, 'utf8');
    assert.match(source, /sourceType:\s*book/);
    assert.doesNotMatch(source, /https?:\/\/example\./);
    assert.doesNotMatch(source, /isbn:\s*["']?0+["']?/i);
  }

  for (const file of seedProblems) {
    const source = await readFile(file, 'utf8');
    assert.match(source, /originType:\s*original/);
    assert.match(source, /mathDifficulty:\s*[1-5]/);
    assert.match(source, /insightDifficulty:\s*[1-5]/);
    assert.match(source, /interviewDifficulty:\s*[1-5]/);
    assert.match(source, /<details>/);
    assert.match(source, /<summary>.*Hint/i);
    assert.match(source, /<summary>.*Solution/i);
    assert.doesNotMatch(source, /source:\s*(green-book|red-book)/);
  }
});

test('problem-solving techniques reuse the knowledge concept model', async () => {
  for (const file of techniqueFiles) {
    const source = await readFile(file, 'utf8');
    assert.match(source, /type:\s*concept/);
    assert.match(source, /category:\s*["']?Problem Solving Techniques["']?/);
  }
});

test('problem layout uses native disclosure and renders no client framework', async () => {
  const layout = await readFile('src/layouts/ProblemLayout.astro', 'utf8');
  assert.doesNotMatch(layout, /client:/);
  assert.match(layout, /ProblemDifficulty/);
});

test('README documents source-derived problem copyright and authoring rules', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /Quant Interview Problem Bank/);
  assert.match(readme, /independent formulation/i);
  assert.match(readme, /do not.*PDF/i);
  assert.match(readme, /Problem Solving Techniques/);
});
```

- [ ] **Step 3: Run the focused tests and verify RED**

Run:

```bash
node --test tests/quant-interview-foundation.test.mjs tests/problem-content-contract.test.mjs
```

Expected: FAIL because none of the new production files/collections exist yet.

- [ ] **Step 4: Commit only the failing tests**

```bash
git add tests/quant-interview-foundation.test.mjs tests/problem-content-contract.test.mjs
git commit -m "test: define quant interview foundation contract"
```

---

### Task 2: Add Problem and Problem Source content schemas

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/content/problem-sources/green-book.md`
- Create: `src/content/problem-sources/red-book.md`
- Test: `tests/quant-interview-foundation.test.mjs`
- Test: `tests/problem-content-contract.test.mjs`

**Interfaces:**
- Produces collection `problems` with problem metadata and collection `problemSources` with source metadata.
- Existing `knowledge`, `projects`, `notes`, `research`, and `reproductions` schemas remain compatible.

- [ ] **Step 1: Add shared difficulty and problem-source schemas**

In `src/content.config.ts`, add before the final exports:

```ts
const difficulty = z.number().int().min(1).max(5);

const problemSources = defineCollection({
  loader: glob({ base: './src/content/problem-sources', pattern: '**/*.md' }),
  schema: z.object({
    shortTitle: z.string(),
    displayTitle: z.string(),
    sourceType: z.enum(['book', 'interview', 'public-archive', 'original']),
    description: z.string(),
    authors: z.array(z.string()).optional(),
    year: z.number().int().min(1900).max(2100).optional(),
    edition: z.string().optional(),
    officialUrl: z.string().url().optional(),
    publisherUrl: z.string().url().optional(),
    isbn: z.string().optional(),
  }),
});
```

- [ ] **Step 2: Add the Problem schema**

Add:

```ts
const problems = defineCollection({
  loader: glob({ base: './src/content/problems', pattern: '**/*.md' }),
  schema: z.object({
    problemId: z.string().min(1),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    originType: z.enum(['book', 'interview', 'original', 'public-archive']),
    source: z.string().optional(),
    sourceSection: z.string().optional(),
    sourceChapter: z.string().optional(),
    sourceProblem: z.string().optional(),
    sourceReference: z.string().optional(),
    sourceUrl: z.string().url().optional(),
    domain: z.string(),
    category: z.string(),
    subcategories: z.array(z.string()).default([]),
    tags: commonTags,
    concepts: z.array(z.string()).default([]),
    techniques: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).default([]),
    relatedProblems: z.array(z.string()).default([]),
    family: z.string().optional(),
    mathDifficulty: difficulty,
    insightDifficulty: difficulty,
    interviewDifficulty: difficulty,
    estimatedMinutes: z.number().int().positive().optional(),
    status: z.enum(['draft', 'reviewed', 'solved', 'extended']),
    featured: z.boolean().default(false),
  }).superRefine((problem, ctx) => {
    if (problem.originType !== 'original' && !problem.source) {
      ctx.addIssue({
        code: 'custom',
        path: ['source'],
        message: 'Source-derived problems require a source slug.',
      });
    }
  }),
});
```

- [ ] **Step 3: Export both new collections**

Change the final export to include:

```ts
export const collections = {
  research,
  projects,
  notes,
  knowledge,
  reproductions,
  problems,
  problemSources,
};
```

Do not change the existing Knowledge `type` enum.

- [ ] **Step 4: Add truthful Green Book and Red Book source containers**

Create `src/content/problem-sources/green-book.md`:

```markdown
---
shortTitle: Green Book
displayTitle: Quant Interview Green Book
sourceType: book
description: Source index for the quantitative interview book referred to in this library as the Green Book. Bibliographic fields are intentionally omitted until they are verified from the source itself.
---

This source record preserves provenance and future problem ordering without reproducing the book itself.
```

Create `src/content/problem-sources/red-book.md`:

```markdown
---
shortTitle: Red Book
displayTitle: Quant Interview Red Book
sourceType: book
description: Source index for the quantitative interview book referred to in this library as the Red Book. Bibliographic fields are intentionally omitted until they are verified from the source itself.
---

This source record preserves provenance and future problem ordering without reproducing the book itself.
```

Do not invent authors, year, edition, ISBN, official URL, or publisher URL.

- [ ] **Step 5: Run focused tests**

```bash
node --test tests/quant-interview-foundation.test.mjs tests/problem-content-contract.test.mjs
```

Expected: schema/source-specific checks PASS; route/layout/seed checks remain failing.

- [ ] **Step 6: Run Astro schema validation**

```bash
npm run check
```

Expected: PASS for existing content plus the two new source records.

- [ ] **Step 7: Commit the schema/source foundation**

```bash
git add src/content.config.ts src/content/problem-sources
git commit -m "feat: add problem and source content models"
```

---

### Task 3: Add relationship validation and reusable Technique concepts

**Files:**
- Create: `src/lib/problemRelations.ts`
- Create: `src/content/knowledge/concepts/conditioning.md`
- Create: `src/content/knowledge/concepts/first-step-analysis.md`
- Create: `src/content/knowledge/concepts/recursion-problem-solving.md`
- Test: `tests/quant-interview-foundation.test.mjs`
- Test: `tests/problem-content-contract.test.mjs`

**Interfaces:**
- Produces `slugOf`, `getProblemsForKnowledgeSlug`, `getSourceForProblem`, `getProblemsForSource`, and `validateProblemRelationships`.
- `techniques` and `concepts` always point at Knowledge slugs.

- [ ] **Step 1: Implement the relationship helper**

Create `src/lib/problemRelations.ts`:

```ts
import type { CollectionEntry } from 'astro:content';

type Problem = CollectionEntry<'problems'>;
type ProblemSource = CollectionEntry<'problemSources'>;
type Knowledge = CollectionEntry<'knowledge'>;

export const slugOf = (id: string) => id.split('/').pop() ?? id;

export function getProblemsForKnowledgeSlug(problems: Problem[], knowledgeSlug: string) {
  return problems.filter((problem) =>
    problem.data.concepts.includes(knowledgeSlug) ||
    problem.data.techniques.includes(knowledgeSlug) ||
    problem.data.prerequisites.includes(knowledgeSlug)
  );
}

export function getSourceForProblem(problem: Problem, sources: ProblemSource[]) {
  if (!problem.data.source) return undefined;
  return sources.find((source) => slugOf(source.id) === problem.data.source);
}

export function getProblemsForSource(problems: Problem[], sourceSlug: string) {
  return problems
    .filter((problem) => problem.data.source === sourceSlug)
    .sort((a, b) => {
      const section = (a.data.sourceSection ?? '').localeCompare(b.data.sourceSection ?? '', undefined, { numeric: true });
      if (section !== 0) return section;
      return (a.data.sourceProblem ?? a.data.problemId).localeCompare(
        b.data.sourceProblem ?? b.data.problemId,
        undefined,
        { numeric: true },
      );
    });
}

export function validateProblemRelationships(
  problems: Problem[],
  sources: ProblemSource[],
  knowledge: Knowledge[],
) {
  const problemSlugs = new Set(problems.map((problem) => slugOf(problem.id)));
  const problemIds = new Set<string>();
  const sourceSlugs = new Set(sources.map((source) => slugOf(source.id)));
  const knowledgeBySlug = new Map(knowledge.map((entry) => [slugOf(entry.id), entry]));
  const sourceProblemKeys = new Set<string>();
  const errors: string[] = [];

  for (const problem of problems) {
    const slug = slugOf(problem.id);

    if (problemIds.has(problem.data.problemId)) errors.push(`duplicate problemId: ${problem.data.problemId}`);
    problemIds.add(problem.data.problemId);

    if (problem.data.source && !sourceSlugs.has(problem.data.source)) {
      errors.push(`${slug}: unresolved source ${problem.data.source}`);
    }

    for (const concept of [...problem.data.concepts, ...problem.data.prerequisites]) {
      if (!knowledgeBySlug.has(concept)) errors.push(`${slug}: unresolved knowledge ${concept}`);
    }

    for (const technique of problem.data.techniques) {
      const entry = knowledgeBySlug.get(technique);
      if (!entry) errors.push(`${slug}: unresolved technique ${technique}`);
      else if (entry.data.type !== 'concept' || entry.data.category !== 'Problem Solving Techniques') {
        errors.push(`${slug}: technique ${technique} is not a Problem Solving Techniques concept`);
      }
    }

    for (const related of problem.data.relatedProblems) {
      if (!problemSlugs.has(related)) errors.push(`${slug}: unresolved related problem ${related}`);
    }

    if (problem.data.source && problem.data.sourceProblem) {
      const key = `${problem.data.source}:${problem.data.sourceSection ?? ''}:${problem.data.sourceProblem}`;
      if (sourceProblemKeys.has(key)) errors.push(`${slug}: duplicate source problem key ${key}`);
      sourceProblemKeys.add(key);
    }
  }

  if (errors.length > 0) throw new Error(`Problem relationship validation failed:\n${errors.join('\n')}`);
}
```

- [ ] **Step 2: Add the Conditioning technique Concept**

Create `src/content/knowledge/concepts/conditioning.md` with frontmatter:

```yaml
---
title: Conditioning
description: A problem-solving technique that simplifies probability and expectation problems by conditioning on a useful event, state, or first step.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-16
tags: [Probability, Conditional Probability, Problem Solving]
featured: false
related: [conditional-expectation]
relatedNotes: []
---
```

Body sections:

```markdown
## Core idea
Condition on information that turns a complicated random structure into simpler cases, then recombine those cases with the law of total probability or total expectation.

## Recognition pattern
Look for a natural first event, latent state, branch, or partial observation that makes the remaining problem easier.

## Common trap
Conditioning is useful only when the conditioned cases are simpler and the probabilities or conditional expectations can be computed consistently.
```

If `conditional-expectation` does not exist in the current Knowledge collection, omit it from `related` rather than creating a broken relationship.

- [ ] **Step 3: Add First-Step Analysis and Recursion technique Concepts**

Create `first-step-analysis.md` and `recursion-problem-solving.md` with the same required Knowledge frontmatter pattern and concise independent explanations. Their category must be exactly:

```yaml
category: Problem Solving Techniques
```

- [ ] **Step 4: Run focused tests and Astro checks**

```bash
node --test tests/quant-interview-foundation.test.mjs tests/problem-content-contract.test.mjs
npm run check
```

Expected: technique-content checks PASS; route/layout/seed checks still fail.

- [ ] **Step 5: Commit the relation/technique layer**

```bash
git add src/lib/problemRelations.ts src/content/knowledge/concepts/conditioning.md src/content/knowledge/concepts/first-step-analysis.md src/content/knowledge/concepts/recursion-problem-solving.md
git commit -m "feat: add problem relationships and solution techniques"
```

---

### Task 4: Add a small original seed corpus and validate the graph at build time

**Files:**
- Create: `src/content/problems/original/conditional-dice-expectation.md`
- Create: `src/content/problems/original/random-walk-boundary.md`
- Modify: `src/lib/problemRelations.ts`
- Test: `tests/problem-content-contract.test.mjs`

**Interfaces:**
- Produces two public original Problems that exercise Concept, Technique, difficulty, hint, solution, related-Problem, and family metadata without using book-derived text.
- `validateProblemRelationships()` remains the build-time integrity gate.

- [ ] **Step 1: Add the first original seed Problem**

Create `conditional-dice-expectation.md`:

```markdown
---
problemId: lorien-probability-001
title: Conditional Dice Expectation
description: An original expectation exercise designed to practice conditioning on the outcome of a first random experiment.
date: 2026-08-16
originType: original
domain: Mathematics & Statistics
category: Probability
subcategories: [Expectation, Conditional Probability]
tags: [Probability, Expectation, Interview]
concepts: []
techniques: [conditioning]
prerequisites: []
relatedProblems: []
family: conditional-expectation
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
status: solved
featured: true
---

## Problem

Roll a fair six-sided die. If the first roll is odd, roll once more and receive the second roll as the payoff. If the first roll is even, receive half of the first roll as the payoff. What is the expected payoff?

## Think before revealing

Try conditioning on whether the first roll is odd or even before enumerating every terminal outcome.

<details>
<summary>Hint 1</summary>

The first roll is odd with probability one half and even with probability one half.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Conditional on an odd first roll, the second fair die has expectation 3.5. Conditional on an even first roll, the first roll is uniformly distributed over 2, 4, and 6, so half of that value has conditional expectation 2. Therefore

\[
E[X] = \frac12(3.5)+\frac12(2)=2.75.
\]

## Why this problem matters

The computation is elementary; the useful habit is recognizing that conditioning creates two simple branches immediately.

## Common mistakes

A common dead end is listing all terminal outcomes before exploiting the natural odd/even partition.

</details>
```

If the current site does not yet render TeX notation, keep the formula as plain readable text during Phase 1 rather than adding a math-rendering dependency outside this plan.

- [ ] **Step 2: Add the second original seed Problem**

Create `random-walk-boundary.md` as an original finite-state random-walk problem using `techniques: [first-step-analysis, recursion-problem-solving]`, three difficulty fields, a `<details>` hint, a `<details>` solution, and `relatedProblems: [conditional-dice-expectation]` only if the relationship explanation in the body is real. Otherwise keep `relatedProblems: []`.

The problem text and solution must be independently authored and not attributed to Green Book or Red Book.

- [ ] **Step 3: Keep relation validation callable from every problem-facing page**

Do not add a separate script. Problem-facing pages introduced in later tasks will call:

```ts
validateProblemRelationships(problems, sources, knowledge);
```

at build time after loading the three collections. This ensures `npm run build` fails if production content contains broken relations.

- [ ] **Step 4: Run the content contract**

```bash
node --test tests/problem-content-contract.test.mjs
npm run check
```

Expected: seed/source/technique content assertions PASS.

- [ ] **Step 5: Commit the seed corpus**

```bash
git add src/content/problems/original src/lib/problemRelations.ts
git commit -m "content: add original quant interview seed problems"
```

---

### Task 5: Build the dedicated Problem workspace and canonical detail route

**Files:**
- Create: `src/components/ProblemDifficulty.astro`
- Create: `src/layouts/ProblemLayout.astro`
- Create: `src/pages/problems/[...slug].astro`
- Test: `tests/quant-interview-foundation.test.mjs`
- Test: `tests/problem-content-contract.test.mjs`

**Interfaces:**
- `ProblemDifficulty.astro` consumes three integers 1–5.
- `ProblemLayout.astro` consumes one Problem entry plus resolved Source/Knowledge relationship data and a default slot.
- `/problems/<slug>/` is the canonical Problem route.

- [ ] **Step 1: Implement the reusable difficulty component**

Create `src/components/ProblemDifficulty.astro`:

```astro
---
interface Props {
  math: number;
  insight: number;
  interview: number;
}
const { math, insight, interview } = Astro.props;
const rows = [
  ['Math', math],
  ['Insight', insight],
  ['Interview', interview],
] as const;
const dots = (value: number) => Array.from({ length: 5 }, (_, i) => i < value);
---
<div class="difficulty" aria-label="Problem difficulty">
  {rows.map(([label, value]) => (
    <div class="difficulty-row">
      <span>{label}</span>
      <div aria-label={`${label} difficulty ${value} out of 5`}>
        {dots(value).map((active) => <i class:list={{ active }}></i>)}
      </div>
      <strong>{value}/5</strong>
    </div>
  ))}
</div>

<style>
.difficulty{display:grid;gap:8px}.difficulty-row{display:grid;grid-template-columns:76px 1fr 34px;gap:10px;align-items:center;font:600 .72rem var(--font-mono);color:var(--muted)}.difficulty-row>div{display:flex;gap:5px}.difficulty-row i{width:8px;height:8px;border-radius:50%;border:1px solid var(--border);background:transparent}.difficulty-row i.active{background:var(--accent);border-color:var(--accent)}.difficulty-row strong{color:var(--ink);text-align:right}
</style>
```

- [ ] **Step 2: Implement `ProblemLayout.astro`**

The layout must:

- import `BaseLayout`, `TagList`, and `ProblemDifficulty`;
- render `PROBLEM · <problemId>` as the kicker;
- render title/description;
- show source label only when a source is resolved;
- show category/subcategories;
- show the three difficulty dimensions;
- show estimated minutes only when present;
- link resolved Concept and Technique Knowledge entries;
- render a sticky sidebar on wide screens;
- render the default slot as `.prose problem-body`;
- contain no `client:*` directives.

Use props:

```ts
interface Props {
  problem: CollectionEntry<'problems'>;
  source?: CollectionEntry<'problemSources'>;
  concepts: CollectionEntry<'knowledge'>[];
  techniques: CollectionEntry<'knowledge'>[];
  prerequisites: CollectionEntry<'knowledge'>[];
  relatedProblems: CollectionEntry<'problems'>[];
}
```

- [ ] **Step 3: Implement the canonical detail route**

Create `src/pages/problems/[...slug].astro`:

```astro
---
import { getCollection, render, type CollectionEntry } from 'astro:content';
import ProblemLayout from '../../layouts/ProblemLayout.astro';
import {
  getSourceForProblem,
  slugOf,
  validateProblemRelationships,
} from '../../lib/problemRelations';

export async function getStaticPaths() {
  const problems = await getCollection('problems');
  return problems.map((problem) => ({
    params: { slug: problem.id.split('/').pop() },
    props: { problem },
  }));
}

const { problem } = Astro.props as { problem: CollectionEntry<'problems'> };
const problems = await getCollection('problems');
const sources = await getCollection('problemSources');
const knowledge = await getCollection('knowledge');
validateProblemRelationships(problems, sources, knowledge);

const knowledgeBySlug = new Map(knowledge.map((entry) => [slugOf(entry.id), entry]));
const problemsBySlug = new Map(problems.map((entry) => [slugOf(entry.id), entry]));
const source = getSourceForProblem(problem, sources);
const concepts = problem.data.concepts.map((slug) => knowledgeBySlug.get(slug)).filter(Boolean);
const techniques = problem.data.techniques.map((slug) => knowledgeBySlug.get(slug)).filter(Boolean);
const prerequisites = problem.data.prerequisites.map((slug) => knowledgeBySlug.get(slug)).filter(Boolean);
const relatedProblems = problem.data.relatedProblems.map((slug) => problemsBySlug.get(slug)).filter(Boolean);
const { Content } = await render(problem);
---

<ProblemLayout
  problem={problem}
  source={source}
  concepts={concepts}
  techniques={techniques}
  prerequisites={prerequisites}
  relatedProblems={relatedProblems}
>
  <Content />
</ProblemLayout>
```

Use explicit casts after `.filter(Boolean)` if Astro TypeScript requires them; do not use `any`.

- [ ] **Step 4: Run focused tests and Astro checks**

```bash
node --test tests/quant-interview-foundation.test.mjs tests/problem-content-contract.test.mjs
npm run check
```

Expected: Problem detail/layout checks PASS.

- [ ] **Step 5: Commit the Problem workspace**

```bash
git add src/components/ProblemDifficulty.astro src/layouts/ProblemLayout.astro src/pages/problems/'[...slug].astro'
git commit -m "feat: add quant interview problem workspace"
```

---

### Task 6: Build the searchable Problem Bank

**Files:**
- Create: `src/components/ProblemCard.astro`
- Create: `src/pages/problems/index.astro`
- Test: `tests/quant-interview-foundation.test.mjs`

**Interfaces:**
- `ProblemCard` consumes `CollectionEntry<'problems'>` plus optional source title.
- `/problems/` renders all Problems statically; browser JavaScript only narrows already-rendered rows/cards.

- [ ] **Step 1: Implement `ProblemCard.astro`**

The card must render:

- `problemId`;
- title;
- category and optional first subcategory;
- Math/Insight/Interview numeric difficulty;
- up to three technique labels/slugs;
- optional source short title;
- canonical link `${base}problems/${slugOf(entry.id)}/`.

Keep the card visual restrained and compatible with `.card`, `.tag`, and existing theme tokens.

- [ ] **Step 2: Implement `/problems/`**

Create `src/pages/problems/index.astro` that loads:

```ts
const problems = await getCollection('problems');
const sources = await getCollection('problemSources');
const knowledge = await getCollection('knowledge');
validateProblemRelationships(problems, sources, knowledge);
```

Derive real filter options from content:

```ts
const sourceOptions = [...new Set(problems.map((p) => p.data.source).filter(Boolean))].sort();
const categoryOptions = [...new Set(problems.map((p) => p.data.category))].sort();
const conceptOptions = [...new Set(problems.flatMap((p) => p.data.concepts))].sort();
const techniqueOptions = [...new Set(problems.flatMap((p) => p.data.techniques))].sort();
```

Render controls with these required data attributes:

```text
data-problem-search
data-source-filter
data-difficulty-filter
data-concept-filter
data-technique-filter
data-problem-row
```

Each Problem row/card must be rendered before JavaScript executes.

- [ ] **Step 3: Add progressive browser filtering**

Use one inline script similar in spirit to the existing Knowledge filter. Search must include:

- title;
- description;
- `problemId`;
- domain/category/subcategories;
- source slug;
- concepts;
- techniques;
- tags;
- family.

The difficulty filter should match `interviewDifficulty` in Phase 1.

- [ ] **Step 4: Add a truthful empty state**

If no Problem matches filters, show:

```text
No problems match the current filters.
```

If the corpus itself is empty, show:

```text
The problem bank is initialized. Reviewed problems will appear here as they are added.
```

Do not hard-code problem totals.

- [ ] **Step 5: Run focused tests and build**

```bash
node --test tests/quant-interview-foundation.test.mjs
npm run check
npm run build
```

Expected: Problem Bank contract PASS; static build emits `/problems/` and seed Problem routes.

- [ ] **Step 6: Commit the Problem Bank**

```bash
git add src/components/ProblemCard.astro src/pages/problems/index.astro
git commit -m "feat: add searchable quant interview problem bank"
```

---

### Task 7: Add Quant Interview hub and source browsing

**Files:**
- Create: `src/pages/knowledge/quant-interview/index.astro`
- Create: `src/pages/knowledge/quant-interview/sources/index.astro`
- Create: `src/pages/knowledge/quant-interview/sources/[...slug].astro`
- Test: `tests/quant-interview-foundation.test.mjs`

**Interfaces:**
- Hub aggregates real counts from Problems, Sources, and relevant Knowledge entries.
- Source pages own provenance/order views but always link to canonical `/problems/<slug>/` routes.

- [ ] **Step 1: Implement the Quant Interview hub**

Load `problems`, `problemSources`, and `knowledge`; run `validateProblemRelationships`.

Derive:

```ts
const techniqueEntries = knowledge.filter(
  (entry) => entry.data.type === 'concept' && entry.data.category === 'Problem Solving Techniques',
);
const representedConceptSlugs = new Set(problems.flatMap((problem) => problem.data.concepts));
const representedConcepts = knowledge.filter((entry) => representedConceptSlugs.has(slugOf(entry.id)));
```

The hub must include:

- hero with `Quant Interview Knowledge System`;
- `Browse Concepts` linking into the existing Knowledge index;
- `Practice Problems` linking to `/problems/`;
- `Explore Sources` linking to source index;
- real counts for Problems, represented Concepts, Techniques, and Sources;
- Green Book/Red Book source gateway cards if source entries exist;
- Technique library populated from actual Knowledge entries;
- no fake learning-path section when no learning-path content exists.

- [ ] **Step 2: Implement the source index**

At `/knowledge/quant-interview/sources/`, list all `problemSources` entries with derived Problem counts.

A source with zero Problems is valid and should display `0 indexed problems` rather than fabricated seed content.

- [ ] **Step 3: Implement source detail routes**

Create `sources/[...slug].astro` with `getStaticPaths()` over `problemSources`.

For each Source:

```ts
const sourceProblems = getProblemsForSource(problems, sourceSlug);
```

Group Problems by `sourceSection ?? 'Indexed Problems'`.

Every Problem link must use:

```ts
`${base}problems/${slugOf(problem.id)}/`
```

If no Problems exist, render a truthful state such as:

```text
No reviewed problems from this source have been published yet.
```

- [ ] **Step 4: Run focused tests and production build**

```bash
node --test tests/quant-interview-foundation.test.mjs
npm run check
npm run build
```

Expected: hub/source routes build successfully and show only derived counts.

- [ ] **Step 5: Commit the hub/source surfaces**

```bash
git add src/pages/knowledge/quant-interview
git commit -m "feat: add quant interview hub and source library"
```

---

### Task 8: Integrate Quant Interview into the existing Knowledge Base

**Files:**
- Create: `src/components/QuantInterviewGateway.astro`
- Modify: `src/pages/knowledge/index.astro`
- Modify: `src/pages/knowledge/[...id].astro`
- Test: `tests/quant-interview-foundation.test.mjs`

**Interfaces:**
- Main Knowledge landing remains a general knowledge library.
- Knowledge detail pages reverse-link to Problems through `getProblemsForKnowledgeSlug`.

- [ ] **Step 1: Implement `QuantInterviewGateway.astro`**

Use the existing `LearningResourcesGateway` / `ReproductionGateway` visual language without copying their exact markup.

Required text:

```text
Quant Interview
Quant Interview Knowledge & Problem Bank
Probability · Statistics · Brain Teasers · Stochastic Processes · Markets · Programming
Explore problem bank →
```

The gateway href is `${base}knowledge/quant-interview/`.

- [ ] **Step 2: Add the gateway to `src/pages/knowledge/index.astro`**

Import:

```astro
import QuantInterviewGateway from '../../components/QuantInterviewGateway.astro';
```

Render it in its own section near `LearningResourcesGateway`.

Do not load the Problem collection merely to mix Problems into the existing general `entries` list.

- [ ] **Step 3: Add reverse-linked Problems to Knowledge detail pages**

In `src/pages/knowledge/[...id].astro`, load Problems and Sources/Knowledge relationship validation:

```ts
const problems = await getCollection('problems');
const sources = await getCollection('problemSources');
validateProblemRelationships(problems, sources, knowledge);
const relatedProblems = getProblemsForKnowledgeSlug(problems, slugOf(entry.id));
```

Render a `Related Problems` relation block only when `relatedProblems.length > 0`.

Each link must go to `/problems/<slug>/` and display at minimum:

- `problemId`;
- title;
- category.

- [ ] **Step 4: Verify the general Knowledge index remains problem-free**

Run:

```bash
node --test tests/quant-interview-foundation.test.mjs
```

Expected: gateway and reverse-link checks PASS; the test preventing Problem injection into the general Knowledge index remains green.

- [ ] **Step 5: Run Astro check/build**

```bash
npm run check
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit Knowledge integration**

```bash
git add src/components/QuantInterviewGateway.astro src/pages/knowledge/index.astro src/pages/knowledge/'[...id].astro'
git commit -m "feat: connect problem bank to knowledge graph"
```

---

### Task 9: Document the authoring and copyright contract

**Files:**
- Modify: `README.md`
- Test: `tests/problem-content-contract.test.mjs`

**Interfaces:**
- Produces one canonical repository instruction set for humans and agents adding future Problems and source material.

- [ ] **Step 1: Add `### Quant Interview Problem Bank` under Content Authoring**

Document exactly these rules in prose:

- Problems live in `src/content/problems/`.
- Sources live in `src/content/problem-sources/`.
- Canonical public Problem URLs are `/problems/<slug>/`.
- Green Book/Red Book are sources, not Knowledge types.
- Problem-solving Techniques are Knowledge `concept` entries with category `Problem Solving Techniques`.
- `concepts`, `techniques`, and `prerequisites` reference Knowledge slugs.
- Source-derived Problems require source provenance.
- Public statements/solutions must use independent formulation and derivation.
- Do not host source PDFs, scans, copied answer keys, or large verbatim book passages.
- Do not invent authors, year, ISBN, official URL, or source Problem metadata.
- Hints and solutions use native disclosure markup.
- All displayed counts are derived.
- Relationship validation must pass before merge.

- [ ] **Step 2: Add the canonical authoring skeleton**

Include a compact example frontmatter block using an **original** Problem, not Green Book/Red Book content.

- [ ] **Step 3: Run the documentation contract**

```bash
node --test tests/problem-content-contract.test.mjs
```

Expected: PASS.

- [ ] **Step 4: Commit the authoring guide**

```bash
git add README.md
git commit -m "docs: add quant interview problem authoring rules"
```

---

### Task 10: Full regression verification and branch review

**Files:**
- Verify all Phase 1 files.
- Do not add unrelated refactors.

**Interfaces:**
- Produces fresh evidence that the entire portfolio still builds after Quant Interview integration.

- [ ] **Step 1: Run the full Node test suite**

```bash
npm run test
```

Expected: zero failing tests, including all existing Reproduction, Knowledge Resources, project case-study, and new Quant Interview contracts.

- [ ] **Step 2: Run Astro content/type validation**

```bash
npm run check
```

Expected: zero Astro/TypeScript errors.

- [ ] **Step 3: Run the production build**

```bash
npm run build
```

Expected: static output successfully includes:

```text
/knowledge/
/knowledge/quant-interview/
/knowledge/quant-interview/sources/
/knowledge/quant-interview/sources/green-book/
/knowledge/quant-interview/sources/red-book/
/problems/
/problems/conditional-dice-expectation/
/problems/random-walk-boundary/
```

- [ ] **Step 4: Review source truthfulness**

Verify:

- Green Book/Red Book source records contain no guessed bibliographic data;
- no Green Book/Red Book Problem text was fabricated or transcribed;
- no placeholder external URL exists;
- no hard-coded corpus total exists;
- no source PDF or scan was added;
- every seed Problem is clearly `originType: original`.

- [ ] **Step 5: Review graph integrity**

Verify:

- every technique slug resolves to a Knowledge Concept with category `Problem Solving Techniques`;
- every related Problem slug resolves;
- every rendered reverse link points to `/problems/<slug>/`;
- existing `/knowledge/<slug>/` routes are unchanged.

- [ ] **Step 6: Review scope discipline**

Confirm Phase 1 does **not** include:

- bulk Green Book ingestion;
- bulk Red Book ingestion;
- authentication;
- user progress persistence;
- spaced repetition;
- graph visualization engine;
- a new Knowledge type;
- a math-rendering dependency added solely for future needs.

- [ ] **Step 7: Commit only verification fixes if needed**

If fresh verification exposes a real defect, fix only that defect and commit with a focused message. Do not create an empty verification commit.

---

## Post-Phase-1 Handoff to Phase 2

Phase 2 begins only after Phase 1 is merged and the public architecture is stable.

Before bulk ingestion, obtain or verify the actual source material for Green Book and Red Book. For each source-derived item, the ingestion workflow should:

1. identify canonical source section/problem reference;
2. decide which reusable Concepts already exist;
3. create missing reusable Concepts independently when needed;
4. map one or more Problem Solving Techniques;
5. independently reformulate the Problem for public use;
6. independently derive the Solution;
7. assign three difficulty dimensions;
8. add hints, mistakes, and extensions selectively;
9. run relationship validation;
10. review copyright/provenance before publication.

Do not begin by mechanically converting every source page into Markdown. The Knowledge graph and Problem model are the canonical destination; the books are provenance inputs.
