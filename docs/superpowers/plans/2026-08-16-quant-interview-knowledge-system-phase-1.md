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
- Phase 1 uses a small Lorien Lab original seed corpus to prove Problem/Concept/Technique relationships.
- All displayed corpus counts are derived from real content.
- Do not render placeholder external URLs or unresolved relationship links.
- `relatedProblems` always stores canonical Problem **slugs**, never `problemId` values.
- Problem Math / Insight / Interview difficulty values are integers from 1 to 5.
- Core Problem access works without browser JavaScript.
- Hints and solutions are collapsed with native HTML disclosure behavior.
- Do not add a math-rendering dependency in Phase 1; seed problems use plain readable mathematical notation.
- Reuse the existing Lorien Lab visual language and light/dark theme.
- Every implementation task follows test-first development.
- Completion gates are `npm run test`, `npm run check`, and `npm run build`.

---

## File Map

**Create**

```text
src/lib/problemRelations.ts
src/components/ProblemDifficulty.astro
src/components/ProblemCard.astro
src/components/QuantInterviewGateway.astro
src/layouts/ProblemLayout.astro
src/pages/problems/index.astro
src/pages/problems/[...slug].astro
src/pages/knowledge/quant-interview/index.astro
src/pages/knowledge/quant-interview/sources/index.astro
src/pages/knowledge/quant-interview/sources/[...slug].astro
src/content/problem-sources/green-book.md
src/content/problem-sources/red-book.md
src/content/problems/original/conditional-dice-expectation.md
src/content/problems/original/random-walk-boundary.md
src/content/knowledge/concepts/conditioning.md
src/content/knowledge/concepts/first-step-analysis.md
src/content/knowledge/concepts/recursion-problem-solving.md
tests/quant-interview-foundation.test.mjs
tests/problem-content-contract.test.mjs
```

**Modify**

```text
src/content.config.ts
src/pages/knowledge/index.astro
src/pages/knowledge/[...id].astro
README.md
```

---

### Task 1: Define the regression contract

**Files:**
- Create: `tests/quant-interview-foundation.test.mjs`
- Create: `tests/problem-content-contract.test.mjs`

**Interfaces:**
- Consumes: existing `node --test tests/*.test.mjs` runner.
- Produces: failing contracts for schema, routes, layouts, gateway, reverse links, native disclosure behavior, source truthfulness, and seed-content policy.

- [ ] **Step 1: Write the structural failing test**

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

test('content config models problems and sources without adding knowledge types', async () => {
  const config = await readFile('src/content.config.ts', 'utf8');
  assert.match(config, /const problems = defineCollection/);
  assert.match(config, /const problemSources = defineCollection/);
  assert.match(config, /mathDifficulty/);
  assert.match(config, /insightDifficulty/);
  assert.match(config, /interviewDifficulty/);
  assert.doesNotMatch(config, /type:\s*z\.enum\(\[[^\]]*['"]problem['"]/s);
  assert.doesNotMatch(config, /type:\s*z\.enum\(\[[^\]]*['"]technique['"]/s);
});

test('problem route uses a dedicated canonical problem layout', async () => {
  const route = await readFile('src/pages/problems/[...slug].astro', 'utf8');
  assert.match(route, /ProblemLayout/);
  assert.match(route, /getCollection\(['"]problems['"]\)/);
  assert.doesNotMatch(route, /knowledge\/problems/);
});

test('knowledge landing exposes quant interview without merging problems into its general index', async () => {
  const page = await readFile('src/pages/knowledge/index.astro', 'utf8');
  assert.match(page, /QuantInterviewGateway/);
  assert.match(page, /knowledge\/quant-interview\//);
});

test('knowledge detail reverse-links associated problems', async () => {
  const page = await readFile('src/pages/knowledge/[...id].astro', 'utf8');
  assert.match(page, /getCollection\(['"]problems['"]\)/);
  assert.match(page, /getProblemsForKnowledgeSlug/);
  assert.match(page, /Related Problems/);
});

test('problem bank provides static rows and progressive filters', async () => {
  const page = await readFile('src/pages/problems/index.astro', 'utf8');
  for (const marker of [
    'data-problem-row',
    'data-problem-search',
    'data-source-filter',
    'data-difficulty-filter',
    'data-concept-filter',
    'data-technique-filter',
  ]) assert.ok(page.includes(marker), `missing ${marker}`);
});
```

- [ ] **Step 2: Write the content/truthfulness failing test**

Create `tests/problem-content-contract.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const sources = [
  'src/content/problem-sources/green-book.md',
  'src/content/problem-sources/red-book.md',
];
const techniques = [
  'src/content/knowledge/concepts/conditioning.md',
  'src/content/knowledge/concepts/first-step-analysis.md',
  'src/content/knowledge/concepts/recursion-problem-solving.md',
];
const seeds = [
  'src/content/problems/original/conditional-dice-expectation.md',
  'src/content/problems/original/random-walk-boundary.md',
];

test('phase 1 contains truthful source containers and original seed problems', async () => {
  for (const file of [...sources, ...techniques, ...seeds]) await access(file);

  for (const file of sources) {
    const source = await readFile(file, 'utf8');
    assert.match(source, /sourceType:\s*book/);
    assert.doesNotMatch(source, /https?:\/\/example\./);
  }

  for (const file of seeds) {
    const source = await readFile(file, 'utf8');
    assert.match(source, /originType:\s*original/);
    assert.match(source, /mathDifficulty:\s*[1-5]/);
    assert.match(source, /insightDifficulty:\s*[1-5]/);
    assert.match(source, /interviewDifficulty:\s*[1-5]/);
    assert.match(source, /<details>/);
    assert.match(source, /<summary>[^<]*Hint/i);
    assert.match(source, /<summary>[^<]*Solution/i);
    assert.doesNotMatch(source, /source:\s*(green-book|red-book)/);
  }
});

test('problem-solving techniques reuse the knowledge concept model', async () => {
  for (const file of techniques) {
    const source = await readFile(file, 'utf8');
    assert.match(source, /type:\s*concept/);
    assert.match(source, /category:\s*["']?Problem Solving Techniques["']?/);
  }
});

test('problem layout requires no client framework', async () => {
  const layout = await readFile('src/layouts/ProblemLayout.astro', 'utf8');
  assert.match(layout, /ProblemDifficulty/);
  assert.doesNotMatch(layout, /client:/);
});

test('README documents the quant interview authoring contract', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /Quant Interview Problem Bank/);
  assert.match(readme, /independent formulation/i);
  assert.match(readme, /do not.*PDF/i);
  assert.match(readme, /Problem Solving Techniques/);
});
```

- [ ] **Step 3: Verify RED**

Run:

```bash
node --test tests/quant-interview-foundation.test.mjs tests/problem-content-contract.test.mjs
```

Expected: FAIL because the new production surfaces do not exist.

- [ ] **Step 4: Commit the failing tests**

```bash
git add tests/quant-interview-foundation.test.mjs tests/problem-content-contract.test.mjs
git commit -m "test: define quant interview foundation contract"
```

---

### Task 2: Add Problem and Problem Source schemas

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/content/problem-sources/green-book.md`
- Create: `src/content/problem-sources/red-book.md`

**Interfaces:**
- Produces collection `problems` and collection `problemSources`.
- Leaves the existing Knowledge type enum unchanged.

- [ ] **Step 1: Add the source and difficulty schemas**

Add to `src/content.config.ts`:

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
      ctx.addIssue({ code: 'custom', path: ['source'], message: 'Source-derived problems require a source slug.' });
    }
  }),
});
```

- [ ] **Step 3: Export the collections**

The final export becomes:

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

- [ ] **Step 4: Create truthful Green/Red source containers**

`src/content/problem-sources/green-book.md`:

```markdown
---
shortTitle: Green Book
displayTitle: Quant Interview Green Book
sourceType: book
description: Source index for the quantitative interview book referred to in this library as the Green Book. Bibliographic fields are intentionally omitted until verified from the source itself.
---

This record preserves provenance and future problem ordering without reproducing the source itself.
```

`src/content/problem-sources/red-book.md` uses the same wording with `Red Book`.

Do not add authors, year, edition, ISBN, official URL, or publisher URL in Phase 1.

- [ ] **Step 5: Verify the partial GREEN state**

```bash
node --test tests/quant-interview-foundation.test.mjs tests/problem-content-contract.test.mjs
npm run check
```

Expected: schema/source assertions pass; UI/seed assertions still fail.

- [ ] **Step 6: Commit**

```bash
git add src/content.config.ts src/content/problem-sources
git commit -m "feat: add problem and source content models"
```

---

### Task 3: Add graph utilities and Technique Concepts

**Files:**
- Create: `src/lib/problemRelations.ts`
- Create: `src/content/knowledge/concepts/conditioning.md`
- Create: `src/content/knowledge/concepts/first-step-analysis.md`
- Create: `src/content/knowledge/concepts/recursion-problem-solving.md`

**Interfaces:**
- Produces `slugOf`, `getProblemsForKnowledgeSlug`, `getSourceForProblem`, `getProblemsForSource`, `validateProblemRelationships`.
- Technique slugs must resolve to Knowledge Concepts with exact category `Problem Solving Techniques`.

- [ ] **Step 1: Create `problemRelations.ts`**

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
      const section = (a.data.sourceSection ?? '').localeCompare(
        b.data.sourceSection ?? '', undefined, { numeric: true },
      );
      if (section !== 0) return section;
      return (a.data.sourceProblem ?? a.data.problemId).localeCompare(
        b.data.sourceProblem ?? b.data.problemId, undefined, { numeric: true },
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

  if (errors.length) throw new Error(`Problem relationship validation failed:\n${errors.join('\n')}`);
}
```

- [ ] **Step 2: Create the three Technique Concepts**

Each file uses this exact frontmatter pattern, changing title/description/tags as appropriate:

```yaml
---
title: Conditioning
description: A reusable problem-solving technique that simplifies probability and expectation problems by conditioning on a useful event, state, or first step.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-16
tags: [Probability, Problem Solving]
featured: false
related: []
relatedNotes: []
---
```

`conditioning.md` body headings:

```markdown
## Core idea
## Recognition pattern
## Common trap
```

`first-step-analysis.md` and `recursion-problem-solving.md` use the same three headings with independently written explanations.

There is currently no `conditional-expectation` Knowledge slug in the repository, so **do not** add that relationship in Phase 1.

- [ ] **Step 3: Verify**

```bash
node --test tests/problem-content-contract.test.mjs
npm run check
```

Expected: Technique checks pass.

- [ ] **Step 4: Commit**

```bash
git add src/lib/problemRelations.ts src/content/knowledge/concepts/conditioning.md src/content/knowledge/concepts/first-step-analysis.md src/content/knowledge/concepts/recursion-problem-solving.md
git commit -m "feat: add problem relationships and solution techniques"
```

---

### Task 4: Add the original seed corpus

**Files:**
- Create: `src/content/problems/original/conditional-dice-expectation.md`
- Create: `src/content/problems/original/random-walk-boundary.md`

**Interfaces:**
- Produces public original Problems that exercise difficulty, Technique, family, disclosure, and route behavior without using source-book text.

- [ ] **Step 1: Create `conditional-dice-expectation.md`**

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

Conditional on an odd first roll, the second fair die has expectation 3.5. Conditional on an even first roll, the first roll is uniformly distributed over 2, 4, and 6, so half of that value has conditional expectation 2.

Therefore E[X] = 0.5 × 3.5 + 0.5 × 2 = 2.75.

## Why this problem matters

The computation is elementary; the useful habit is recognizing that conditioning creates two simple branches immediately.

## Common mistakes

A common dead end is listing all terminal outcomes before exploiting the natural odd/even partition.

</details>
```

- [ ] **Step 2: Create `random-walk-boundary.md`**

Use this exact original problem:

```markdown
---
problemId: lorien-stochastic-001
title: Random Walk to a Boundary
description: An original first-step-analysis exercise for the probability of reaching an upper boundary before a lower boundary.
date: 2026-08-16
originType: original
domain: Mathematics & Statistics
category: Stochastic Processes
subcategories: [Random Walk, Recursion]
tags: [Random Walk, Probability, Interview]
concepts: []
techniques: [first-step-analysis, recursion-problem-solving]
prerequisites: []
relatedProblems: []
family: gamblers-ruin
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: true
---

## Problem

A token starts at position 2 on the integer line. At each step it moves one unit left or right with equal probability. The process stops when the token first reaches 0 or 4. What is the probability that it reaches 4 before 0?

## Think before revealing

Let p(k) denote the probability of reaching 4 before 0 when the token starts at k.

<details>
<summary>Hint 1</summary>

Write p(k) in terms of p(k-1) and p(k+1), together with the boundary values p(0) and p(4).

</details>

<details>
<summary>Show Solution</summary>

## Solution

First-step analysis gives p(k) = 0.5 p(k-1) + 0.5 p(k+1), with p(0) = 0 and p(4) = 1. The solutions of this second-difference equation are linear in k, so p(k) = k/4. Starting from 2 therefore gives p(2) = 1/2.

## Why this problem matters

The key interview skill is converting a stochastic process into a recursive state equation instead of attempting to enumerate paths.

## Common mistakes

One common mistake is to reason only from symmetry without identifying the boundary-value recursion that generalizes to asymmetric or larger problems.

</details>
```

- [ ] **Step 3: Verify**

```bash
node --test tests/problem-content-contract.test.mjs
npm run check
```

Expected: seed assertions pass and all content validates.

- [ ] **Step 4: Commit**

```bash
git add src/content/problems/original
git commit -m "content: add original quant interview seed problems"
```

---

### Task 5: Build the Problem detail workspace

**Files:**
- Create: `src/components/ProblemDifficulty.astro`
- Create: `src/layouts/ProblemLayout.astro`
- Create: `src/pages/problems/[...slug].astro`

**Interfaces:**
- `ProblemDifficulty` consumes Math/Insight/Interview integers.
- `ProblemLayout` consumes one Problem plus resolved Source/Knowledge relationships.
- `/problems/<slug>/` is the canonical Problem route.

- [ ] **Step 1: Create `ProblemDifficulty.astro`**

```astro
---
interface Props { math: number; insight: number; interview: number; }
const { math, insight, interview } = Astro.props;
const rows = [['Math', math], ['Insight', insight], ['Interview', interview]] as const;
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
.difficulty{display:grid;gap:8px}.difficulty-row{display:grid;grid-template-columns:76px 1fr 34px;gap:10px;align-items:center;font:600 .72rem var(--font-mono);color:var(--muted)}.difficulty-row>div{display:flex;gap:5px}.difficulty-row i{width:8px;height:8px;border-radius:50%;border:1px solid var(--border)}.difficulty-row i.active{background:var(--accent);border-color:var(--accent)}.difficulty-row strong{color:var(--ink);text-align:right}
</style>
```

- [ ] **Step 2: Create `ProblemLayout.astro`**

Props:

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

Required behavior:

- render `PROBLEM · <problemId>` kicker;
- render title/description;
- render source only when resolved;
- render category/subcategories;
- render `ProblemDifficulty`;
- render estimated minutes only when present;
- link resolved Concepts and Techniques to `/knowledge/<slug>/`;
- render a sticky contextual sidebar on wide screens;
- render default slot in `.prose.problem-body`;
- render no unresolved relationship;
- include no `client:*` directive.

- [ ] **Step 3: Create `/problems/[...slug].astro`**

```astro
---
import { getCollection, render, type CollectionEntry } from 'astro:content';
import ProblemLayout from '../../layouts/ProblemLayout.astro';
import { getSourceForProblem, slugOf, validateProblemRelationships } from '../../lib/problemRelations';

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
const concepts = problem.data.concepts.map((slug) => knowledgeBySlug.get(slug)).filter(Boolean) as CollectionEntry<'knowledge'>[];
const techniques = problem.data.techniques.map((slug) => knowledgeBySlug.get(slug)).filter(Boolean) as CollectionEntry<'knowledge'>[];
const prerequisites = problem.data.prerequisites.map((slug) => knowledgeBySlug.get(slug)).filter(Boolean) as CollectionEntry<'knowledge'>[];
const relatedProblems = problem.data.relatedProblems.map((slug) => problemsBySlug.get(slug)).filter(Boolean) as CollectionEntry<'problems'>[];
const { Content } = await render(problem);
---
<ProblemLayout problem={problem} source={source} concepts={concepts} techniques={techniques} prerequisites={prerequisites} relatedProblems={relatedProblems}>
  <Content />
</ProblemLayout>
```

- [ ] **Step 4: Verify**

```bash
node --test tests/quant-interview-foundation.test.mjs tests/problem-content-contract.test.mjs
npm run check
```

Expected: detail/layout tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProblemDifficulty.astro src/layouts/ProblemLayout.astro src/pages/problems/'[...slug].astro'
git commit -m "feat: add quant interview problem workspace"
```

---

### Task 6: Build the searchable Problem Bank

**Files:**
- Create: `src/components/ProblemCard.astro`
- Create: `src/pages/problems/index.astro`

**Interfaces:**
- `ProblemCard` consumes a Problem and optional source short title.
- Browser JavaScript narrows already-rendered Problem rows; it never owns the data.

- [ ] **Step 1: Create `ProblemCard.astro`**

Render:

- `problemId`;
- title;
- category plus first subcategory when present;
- Math/Insight/Interview numeric values;
- up to three Technique slugs/labels;
- optional Source short title;
- canonical `${base}problems/${slugOf(entry.id)}/` link.

Use existing `.card`, border, mono-label, tag, spacing, and theme tokens.

- [ ] **Step 2: Create `/problems/index.astro`**

Load all three collections and immediately validate:

```ts
const problems = await getCollection('problems');
const sources = await getCollection('problemSources');
const knowledge = await getCollection('knowledge');
validateProblemRelationships(problems, sources, knowledge);
```

Derive all filter options from real content:

```ts
const sourceOptions = [...new Set(problems.map((p) => p.data.source).filter(Boolean))].sort();
const categoryOptions = [...new Set(problems.map((p) => p.data.category))].sort();
const conceptOptions = [...new Set(problems.flatMap((p) => p.data.concepts))].sort();
const techniqueOptions = [...new Set(problems.flatMap((p) => p.data.techniques))].sort();
```

Render controls containing:

```text
data-problem-search
data-source-filter
data-difficulty-filter
data-concept-filter
data-technique-filter
data-problem-row
```

- [ ] **Step 3: Add progressive inline filtering**

Search text combines:

```text
title
description
problemId
domain
category
subcategories
source
concepts
techniques
tags
family
```

The difficulty selector filters `interviewDifficulty` only in Phase 1.

- [ ] **Step 4: Add truthful empty states**

Filtered empty state:

```text
No problems match the current filters.
```

Corpus empty state:

```text
The problem bank is initialized. Reviewed problems will appear here as they are added.
```

- [ ] **Step 5: Verify**

```bash
node --test tests/quant-interview-foundation.test.mjs
npm run check
npm run build
```

Expected: `/problems/` and both seed detail routes build.

- [ ] **Step 6: Commit**

```bash
git add src/components/ProblemCard.astro src/pages/problems/index.astro
git commit -m "feat: add searchable quant interview problem bank"
```

---

### Task 7: Build the Quant Interview hub and Source library

**Files:**
- Create: `src/pages/knowledge/quant-interview/index.astro`
- Create: `src/pages/knowledge/quant-interview/sources/index.astro`
- Create: `src/pages/knowledge/quant-interview/sources/[...slug].astro`

**Interfaces:**
- Hub derives counts from real content.
- Source pages preserve source navigation but link only to canonical Problem URLs.

- [ ] **Step 1: Create the hub**

Load Problems, Sources, Knowledge; call `validateProblemRelationships`.

Derive:

```ts
const techniqueEntries = knowledge.filter(
  (entry) => entry.data.type === 'concept' && entry.data.category === 'Problem Solving Techniques',
);
const representedConceptSlugs = new Set(problems.flatMap((problem) => problem.data.concepts));
const representedConcepts = knowledge.filter((entry) => representedConceptSlugs.has(slugOf(entry.id)));
```

Render:

- `Quant Interview Knowledge System` hero;
- Browse Concepts action to `/knowledge/#knowledge-index`;
- Practice Problems action to `/problems/`;
- Explore Sources action to `/knowledge/quant-interview/sources/`;
- derived counts for Problems, represented Concepts, Techniques, Sources;
- Green Book/Red Book source gateways from actual source entries;
- Technique library from actual Knowledge Concepts;
- no Learning Paths section while no real learning-path content exists.

- [ ] **Step 2: Create the Source index**

For every `problemSources` entry, derive Problem count using `getProblemsForSource`.

A source with no published Problems renders `0 indexed problems`.

- [ ] **Step 3: Create Source detail routes**

Use `getStaticPaths()` over `problemSources`.

For each source:

```ts
const sourceProblems = getProblemsForSource(problems, sourceSlug);
```

Group by `sourceSection ?? 'Indexed Problems'` and link every Problem to:

```ts
`${base}problems/${slugOf(problem.id)}/`
```

Empty source state:

```text
No reviewed problems from this source have been published yet.
```

- [ ] **Step 4: Verify**

```bash
npm run check
npm run build
```

Expected: Hub plus Green/Red source routes build with truthful zero counts.

- [ ] **Step 5: Commit**

```bash
git add src/pages/knowledge/quant-interview
git commit -m "feat: add quant interview hub and source library"
```

---

### Task 8: Integrate with the existing Knowledge Base

**Files:**
- Create: `src/components/QuantInterviewGateway.astro`
- Modify: `src/pages/knowledge/index.astro`
- Modify: `src/pages/knowledge/[...id].astro`

**Interfaces:**
- `/knowledge/` remains a general Knowledge library.
- Knowledge Concepts/Techniques reverse-link to associated Problems.

- [ ] **Step 1: Create `QuantInterviewGateway.astro`**

Required visible copy:

```text
Quant Interview
Quant Interview Knowledge & Problem Bank
Probability · Statistics · Brain Teasers · Stochastic Processes · Markets · Programming
Explore problem bank →
```

The component receives `href` and uses current Lorien Lab theme tokens.

- [ ] **Step 2: Add the gateway to `knowledge/index.astro`**

Import:

```astro
import QuantInterviewGateway from '../../components/QuantInterviewGateway.astro';
```

Render it near the existing Learning Resources gateway with:

```astro
<QuantInterviewGateway href={`${base}knowledge/quant-interview/`} />
```

Do not merge Problem entries into the existing `entries` Knowledge list.

- [ ] **Step 3: Add reverse-linked Problems to Knowledge details**

Load Problems and Sources, validate relationships, then derive:

```ts
const relatedProblems = getProblemsForKnowledgeSlug(problems, slugOf(entry.id));
```

Render a `Related Problems` relation block only when non-empty.

Each relation links to `/problems/<slug>/` and displays `problemId`, title, and category.

- [ ] **Step 4: Verify**

```bash
node --test tests/quant-interview-foundation.test.mjs
npm run check
npm run build
```

Expected: gateway/reverse-link contracts pass and existing Knowledge routes still build.

- [ ] **Step 5: Commit**

```bash
git add src/components/QuantInterviewGateway.astro src/pages/knowledge/index.astro src/pages/knowledge/'[...id].astro'
git commit -m "feat: connect problem bank to knowledge graph"
```

---

### Task 9: Document the authoring/copyright contract

**Files:**
- Modify: `README.md`

**Interfaces:**
- Produces the canonical instructions for humans and agents adding future Problems.

- [ ] **Step 1: Add `### Quant Interview Problem Bank` under Content Authoring**

Document all of these explicit rules:

```text
Problems live in src/content/problems/.
Sources live in src/content/problem-sources/.
Canonical public routes are /problems/<slug>/.
Green Book / Red Book are sources, not Knowledge types.
Techniques are Knowledge concepts in Problem Solving Techniques.
concepts, techniques, prerequisites reference Knowledge slugs.
relatedProblems references canonical Problem slugs.
Source-derived Problems require provenance.
Public problem statements use independent formulation.
Public solutions use independent derivation.
Do not host source PDFs or scans.
Do not copy answer keys or large verbatim passages.
Do not invent bibliographic/source metadata.
Hints and Solutions use native disclosure markup.
Counts are derived from real content.
Relationship validation must pass before merge.
```

- [ ] **Step 2: Add an original-Problem authoring skeleton**

Use `originType: original` and no source fields so the documentation itself does not imply invented Green/Red metadata.

- [ ] **Step 3: Verify**

```bash
node --test tests/problem-content-contract.test.mjs
```

Expected: README contract passes.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: add quant interview problem authoring rules"
```

---

### Task 10: Full verification before integration

**Files:**
- Verify all files changed in Tasks 1–9.

**Interfaces:**
- Produces fresh evidence that Phase 1 is safe to integrate.

- [ ] **Step 1: Run all tests**

```bash
npm run test
```

Expected: zero failures across old and new suites.

- [ ] **Step 2: Run Astro validation**

```bash
npm run check
```

Expected: zero errors.

- [ ] **Step 3: Run the production build**

```bash
npm run build
```

Expected output includes routes equivalent to:

```text
/knowledge/quant-interview/
/knowledge/quant-interview/sources/
/knowledge/quant-interview/sources/green-book/
/knowledge/quant-interview/sources/red-book/
/problems/
/problems/conditional-dice-expectation/
/problems/random-walk-boundary/
```

- [ ] **Step 4: Truthfulness review**

Confirm:

```text
Green/Red source records contain no guessed bibliography.
No Green/Red problem text or solution was fabricated/transcribed.
No placeholder external URL exists.
No source PDF or scan was added.
No corpus count is hard-coded.
Both seed Problems are originType: original.
```

- [ ] **Step 5: Graph review**

Confirm:

```text
Every technique resolves to a Knowledge concept categorized Problem Solving Techniques.
Every relatedProblems value is a canonical Problem slug and resolves.
Every reverse link uses /problems/<slug>/.
Existing /knowledge/<slug>/ URLs are unchanged.
```

- [ ] **Step 6: Scope review**

Confirm Phase 1 does not add:

```text
bulk Green Book ingestion
bulk Red Book ingestion
authentication
user-progress persistence
spaced repetition
graph visualization engine
new Knowledge types
math-rendering dependencies
```

- [ ] **Step 7: Commit only real verification fixes**

If verification finds a defect, fix that defect and commit it with a focused message. Do not create an empty verification commit.

---

## Phase 2 Handoff

Phase 2 starts only after Phase 1 is merged and the public architecture is stable.

Before bulk Green Book / Red Book ingestion, verify the actual source material. For each source-derived Problem:

1. record canonical source section/problem reference;
2. map reusable Concepts;
3. create only genuinely reusable missing Concepts;
4. map Problem Solving Techniques;
5. independently reformulate the public Problem;
6. independently derive the Solution;
7. assign Math / Insight / Interview difficulty;
8. add hints, mistakes, and extensions selectively;
9. run relationship validation;
10. review provenance and copyright before publication.

Do not mechanically convert source pages into Markdown. The Knowledge graph and Problem model are the canonical destination; the books are provenance inputs.
