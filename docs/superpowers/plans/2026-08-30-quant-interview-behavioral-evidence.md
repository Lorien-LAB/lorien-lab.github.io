# Behavioral Interview Evidence & Authenticity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Process Red Book 9.2 guidance and questions 9.1–9.22 selectively, publishing one evidence-backed behavioral-interview Knowledge page with 17 source-neutral Practice Prompts.

**Architecture:** One public Knowledge page owns the answer framework and prompt bank, with reciprocal links to preparation, role fit, framing, and think-aloud. Hidden master/coverage data contains 23 exact item-level dispositions: 18 knowledge-only rows including guidance and 17 questions, five target-free guidance rows, ten approved page-field repairs, and one active/complete 017 lifecycle with exact Windows/WSL/CI evidence.

**Tech Stack:** Astro Markdown/YAML, JSON catalog/coverage/master/workstreams, Node.js 24, `node:test`, `js-yaml`, generated Knowledge directory, WSL native-LF verification, GitHub Actions.

## Global Constraints

- Process exactly `red-book::9.2::guidance` and `red-book::9.2::9.1` through `red-book::9.2::9.22` in queue order under `interview-strategy-communication-soft-interview-behavioral-evidence-017`.
- Publish exactly one new Knowledge slug `behavioral-interview-evidence-and-authenticity`, primary topic `soft-interview`, learning order 13; add no Problem.
- Publish exactly 17 independently worded Practice Prompts with no supplied personal answer; skip exactly 9.3, 9.8, 9.12, 9.15, and 9.16 as target-free guidance.
- Every source row has a distinct exact note mirrored by master and coverage; create exactly 22 item-level coverage entries.
- Apply only the ten approved page-field repairs across 9.2, 9.3, 9.6, 9.12, 9.13, 9.14, and 9.22.
- Final state is exactly 76 Problems / 54 Knowledge, 228 terminal / 522 pending, next `green-book::2.1::theory`, no 018.
- Public content must be source-neutral, authentic, evidence-driven, and must not copy source answers, prescribe personality, or fabricate user experiences.
- Do not change taxonomy, source-topic map, existing Problem ownership, Green technical content, dependencies, or any 001–016 evidence.
- Active 017 is evidence-free; complete 017 requires one exact active SHA, positive matching CI run, WSL native-LF Node 24, five ordered commands, and absent workflow.
- Never stage source PDFs, rendered pages, LeetCode guide, visualization files, SDD artifacts, or unrelated changes.
- Ordered gates: `npm run master:directory:check`, `npm run knowledge:directory:check`, `npm run test`, `npm run check`, `npm run build`.

## File Responsibility Map

- Create public page and `tests/quant-interview-behavioral-evidence-content.test.mjs`.
- Register catalog order 13, reciprocal links, and exact 76/54 public contracts.
- Create `tests/quant-interview-behavioral-evidence-workstream.test.mjs`, active/complete manifest, 22 coverage rows, and 23 master dispositions.
- Create `tests/quant-interview-behavioral-evidence-completion.test.mjs`; update mutable current-state tests, HANDOFF, and generated directory.
- Create/delete `.github/workflows/quant-interview-behavioral-evidence-017-temporary.yml` around exact active-SHA CI proof.

---

### Task 1: Publish the behavioral-evidence Knowledge page and prompt bank

**Files:**
- Create: `tests/quant-interview-behavioral-evidence-content.test.mjs`
- Create: `src/content/knowledge/concepts/behavioral-interview-evidence-and-authenticity.md`

**Interfaces:**
- Consumes: Knowledge Markdown schema and `js-yaml` `JSON_SCHEMA`.
- Produces: canonical slug and 17 semantic prompt identities for later source mapping.

- [ ] **Step 1: Write failing exact metadata/content tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const knowledgePath =
  'src/content/knowledge/concepts/behavioral-interview-evidence-and-authenticity.md';

const metadata = {
  title: 'Behavioral Interview Evidence & Authenticity',
  description:
    'Build honest, evidence-backed behavioral interview answers by stating a claim, supporting it with a real example, connecting it to the role, and reflecting on what changed afterward.',
  date: '2026-08-30',
  type: 'concept',
  domain: 'Interview Strategy & Communication',
  category: 'Problem Solving Techniques',
  status: 'growing',
  tags: ['Interview', 'Behavioral', 'Evidence', 'Authenticity'],
  quantInterviewTopics: ['interview-strategy-communication', 'soft-interview'],
  featured: false,
  related: [
    'quant-role-and-employer-fit',
    'quant-interview-preparation-breadth-and-practice',
    'problem-framing-clarification-assumption-management',
    'structured-think-aloud-reasoning',
  ],
  relatedNotes: [],
};

const promptPatterns = [
  /pursuing quantitative work.*role now/i,
  /CV item.*contribute.*relevant.*learn/i,
  /(?:leaving|changing).*previous direction/i,
  /difficult collaboration.*actions/i,
  /genuine weakness.*evidence.*progress/i,
  /deadline.*constraints/i,
  /next several years.*role fit/i,
  /research.*non-specialist.*technical expert/i,
  /qualities.*beyond technical.*demonstrated/i,
  /collaborators.*working style.*examples/i,
  /achievement.*(?:initiative|impact)/i,
  /(?:studied|built).*interest.*(?:finance|quantitative)/i,
  /recent development.*organization.*role/i,
  /(?:organization|team).*goals.*alternatives/i,
  /independently.*collaboration.*result/i,
  /led others.*measurable outcome/i,
  /(?:unfamiliar internal language|tool).*transferable skills/i,
];

test('behavioral-evidence page has exact byte-zero frontmatter', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  assert.equal(text.startsWith('---\n'), true);
  assert.deepEqual(parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA }), metadata);
});

test('behavioral-evidence page implements the exact answer framework and prompt bank', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  for (const heading of [
    'Core Idea', 'Four-Part Answer Structure', 'Evidence Quality', 'Prompt Families',
    'Answer Preparation Workflow', 'Authenticity and Integrity Boundary',
    'Practice Prompts', 'Common Mistakes', 'Interview Checks',
  ]) assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  for (const word of ['Claim', 'Evidence', 'Relevance', 'Reflection']) {
    assert.match(text, new RegExp(`\\b${word}\\b`, 'i'));
  }
  const promptBlock = text.split(/^## Practice Prompts$/m)[1]?.split(/^## /m)[0] ?? '';
  assert.equal((promptBlock.match(/^\d+\./gm) ?? []).length, 17);
  for (const pattern of promptPatterns) assert.match(promptBlock, pattern);
  const checks = text.split(/^## Interview Checks$/m)[1] ?? '';
  assert.equal((checks.match(/^\d+\./gm) ?? []).length >= 6, true);
});
```

Add authenticity, provenance, skipped-prompt, and no-Problem guards:

```js
test('behavioral page rejects scripts, stereotypes, source answers, and skipped identities', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  assert.match(text, /invented stories|fabricat/i);
  assert.match(text, /borrowed accomplishments|copied/i);
  assert.match(text, /memorized script|exact wording/i);
  assert.doesNotMatch(text, /Red Book|Quant Job Interview Questions and Answers|Question 9\.(?:[1-9]|1\d|2[0-2])|PDF page/i);
  assert.doesNotMatch(text, /swearing|share price|own shares|French food|first thing.*first day|Goldman Sachs|answer had better be|team player/i);
  const files = await readdir('src/content/problems', { recursive: true });
  assert.equal(files.some((file) => /behavioral-interview-evidence/i.test(String(file))), false);
  await assert.rejects(
    access('src/content/problems/behavioral-interview-evidence-and-authenticity.md'),
    (error) => error?.code === 'ENOENT',
  );
});
```

- [ ] **Step 2: Run focused test and verify missing-page failure**

```bash
node --test tests/quant-interview-behavioral-evidence-content.test.mjs
```

- [ ] **Step 3: Author the complete page**

Use exact frontmatter and write the nine required sections, exact four-part framework, five families, seven-step workflow, authenticity boundary, common mistakes, and these exact 17 independently worded prompts:

```markdown
1. Why are you pursuing quantitative work and this role now?
2. Choose one CV item: what did you contribute, why is it relevant, and what did you learn?
3. Why are you leaving or changing your previous direction?
4. Describe a difficult collaboration and the concrete actions you took.
5. What genuine weakness are you improving, and what evidence shows progress?
6. Give an example of meeting an important deadline under constraints.
7. What direction do you want your work to take over the next several years, and why does this role fit?
8. Explain your research first to a non-specialist and then to a technical expert.
9. What useful qualities do you bring beyond technical ability, and how have you demonstrated them?
10. What would close collaborators say about your working style, and what examples support that view?
11. What achievement best demonstrates unusual initiative or impact?
12. What have you studied or built that demonstrates genuine interest in finance or quantitative work?
13. What recent development at this organization is relevant to the role, and why?
14. Why does this organization or team fit your goals better than plausible alternatives?
15. In what situations do you work best independently, and when does collaboration improve the result?
16. Describe a time you led others toward a measurable outcome.
17. How would you evaluate and adapt to an unfamiliar internal language or tool while protecting transferable skills?
```

Write at least six numbered Interview Checks that explicitly test:

- evidence versus trait labels;
- personal contribution versus vague team credit;
- adapting one technical story to two audiences;
- stating a real weakness plus improvement evidence;
- company-specific research versus generic praise;
- maintaining authenticity when pressured toward a preferred answer.

Do not supply fictional user answers.

- [ ] **Step 4: Run focused test and commit**

Expected: 3 tests PASS.

```bash
git add tests/quant-interview-behavioral-evidence-content.test.mjs src/content/knowledge/concepts/behavioral-interview-evidence-and-authenticity.md
git commit -m "feat(quant-interview): add behavioral evidence Knowledge"
```

### Task 2: Register catalog, reciprocal graph, and 54-node public contract

**Files:**
- Modify: `tests/quant-interview-behavioral-evidence-content.test.mjs`
- Modify: `src/data/quant-interview/topics/knowledge-catalog.json`
- Modify: `src/content/knowledge/concepts/quant-role-and-employer-fit.md`
- Modify: `src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md`
- Modify: `src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md`
- Modify: `src/content/knowledge/concepts/structured-think-aloud-reasoning.md`
- Modify exact reciprocal/content registry tests and `tests/quant-interview-knowledge-directory.test.mjs`
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`

**Interfaces:**
- Consumes: Task 1 page.
- Produces: published order-13 module, four reciprocal edges, exact 76/54 registry.

- [ ] **Step 1: Add failing exact module/reciprocal/count assertions**

Expected module:

```js
{
  slug: 'behavioral-interview-evidence-and-authenticity',
  title: 'Behavioral Interview Evidence & Authenticity',
  canonicalTopics: ['interview-strategy-communication', 'soft-interview'],
  primaryTopic: 'soft-interview',
  learningOrder: 13,
  status: 'published',
  prerequisites: [],
}
```

Require the new slug in all four exact ordered `related` arrays. Add source-neutral registry entry and require 54 Knowledge nodes. Add directory prerequisites `[]`, 54 published modules, and `{ published: 54, planned: 0 }`.

- [ ] **Step 2: Run focused graph/registry suite and verify failures**

```bash
node --test tests/quant-interview-behavioral-evidence-content.test.mjs tests/quant-interview-role-employer-fit-content.test.mjs tests/quant-interview-preparation-breadth-practice-content.test.mjs tests/quant-interview-reasoning-communication-content.test.mjs tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-knowledge-directory.test.mjs
```

- [ ] **Step 3: Insert exact order-13 catalog object and append four links**

Preserve all existing module/relation order. Change no prose or canonical topics in existing pages.

- [ ] **Step 4: Run focused suite and commit**

```bash
git add src/data/quant-interview/topics/knowledge-catalog.json src/content/knowledge/concepts/quant-role-and-employer-fit.md src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md src/content/knowledge/concepts/structured-think-aloud-reasoning.md tests/quant-interview-behavioral-evidence-content.test.mjs tests/quant-interview-role-employer-fit-content.test.mjs tests/quant-interview-preparation-breadth-practice-content.test.mjs tests/quant-interview-reasoning-communication-content.test.mjs tests/quant-interview-source-neutral-content.test.mjs tests/quant-interview-knowledge-directory.test.mjs
git commit -m "feat(quant-interview): register behavioral evidence graph"
```

### Task 3: Register active 017 and exact 23-row source mapping

**Files:**
- Create: `tests/quant-interview-behavioral-evidence-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/interview-strategy-communication-soft-interview-behavioral-evidence-017.json`
- Modify: `src/data/quant-interview/coverage/red-book.json`
- Modify: `src/data/quant-interview/master-directory.json`

**Interfaces:**
- Consumes: new and existing canonical Knowledge slugs.
- Produces: active 017, 23 terminal rows, 228/522, Green 2.1 next.

- [ ] **Step 1: Write the failing exact workstream test**

Define exact ordered keys:

```js
const keys = [
  'red-book::9.2::guidance',
  ...Array.from({ length: 22 }, (_, index) => `red-book::9.2::9.${index + 1}`),
];
```

Define canonical slugs and the exact state/target map:

```js
const newSlug = 'behavioral-interview-evidence-and-authenticity';
const roleSlug = 'quant-role-and-employer-fit';
const prepSlug = 'quant-interview-preparation-breadth-and-practice';
const thinkSlug = 'structured-think-aloud-reasoning';

const mappings = [
  ['knowledge-only', [newSlug]],
  ['knowledge-only', [newSlug, roleSlug]],
  ['knowledge-only', [newSlug]],
  ['interview-guidance', []],
  ['knowledge-only', [newSlug, roleSlug]],
  ['knowledge-only', [newSlug]],
  ['knowledge-only', [newSlug]],
  ['knowledge-only', [newSlug]],
  ['interview-guidance', []],
  ['knowledge-only', [newSlug, roleSlug]],
  ['knowledge-only', [newSlug, roleSlug]],
  ['knowledge-only', [newSlug, thinkSlug]],
  ['interview-guidance', []],
  ['knowledge-only', [newSlug]],
  ['knowledge-only', [newSlug]],
  ['interview-guidance', []],
  ['interview-guidance', []],
  ['knowledge-only', [newSlug]],
  ['knowledge-only', [newSlug, prepSlug]],
  ['knowledge-only', [newSlug, roleSlug]],
  ['knowledge-only', [newSlug, roleSlug]],
  ['knowledge-only', [newSlug]],
  ['knowledge-only', [newSlug, roleSlug]],
];
```

Use these exact notes in key order:

```js
const notes = [
  'Red Book 9.2 provides reusable behavioral-prompt families that resolve to the canonical evidence-and-authenticity Knowledge page.',
  'Red Book 9.1 motivation and role-fit evidence resolve to the behavioral-evidence and role-fit Knowledge pages.',
  'Red Book 9.2 CV evidence, contribution, relevance, and learning resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.3 relies on workplace-culture and swearing stereotypes; it remains target-free interview guidance.',
  'Red Book 9.4 career-change motivation resolves to the behavioral-evidence and role-fit Knowledge pages.',
  'Red Book 9.5 difficult-collaboration evidence resolves to the behavioral-evidence Knowledge page without preserving manipulative source tactics.',
  'Red Book 9.6 honest weakness and improvement evidence resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.7 deadline evidence and execution under constraints resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.8 asks for time-sensitive current share-price data and remains target-free interview guidance.',
  'Red Book 9.9 organization-specific research evidence resolves to the behavioral-evidence and role-fit Knowledge pages without publishing current facts.',
  'Red Book 9.10 career-direction evidence resolves to the behavioral-evidence and role-fit Knowledge pages.',
  'Red Book 9.11 audience-adapted technical explanation resolves to the behavioral-evidence and think-aloud Knowledge pages.',
  'Red Book 9.12 uses share ownership as an outdated interest proxy and remains target-free interview guidance.',
  'Red Book 9.13 nontechnical strengths supported by examples resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.14 collaborator feedback and self-awareness evidence resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.15 is an irrelevant food-preference prompt and remains target-free interview guidance.',
  'Red Book 9.16 depends on a source-specific hidden first-day answer and remains target-free interview guidance.',
  'Red Book 9.17 initiative and impact evidence resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.18 learning and building evidence resolve to the behavioral-evidence and preparation Knowledge pages.',
  'Red Book 9.19 organization-fit research resolves to the behavioral-evidence and role-fit Knowledge pages.',
  'Red Book 9.20 independent-versus-collaborative work preferences resolve to the behavioral-evidence and role-fit Knowledge pages.',
  'Red Book 9.21 leadership evidence and measurable outcomes resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.22 unfamiliar-tool adaptability and transferable-skill trade-offs resolve to the behavioral-evidence and role-fit Knowledge pages.',
];
```

Test requirements:

- complete active manifest deep equality, evidence-free;
- global Red coverage identity uniqueness before `.find()`;
- all 23 keys have sole cross-manifest owner 017;
- reverse master ownership equals keys;
- exact state/targets/notes mirrored master/coverage;
- literal pre-edit identity, canonical topics, sort keys, question pages, solution pages;
- exactly ten approved page fields differ from the literal fixture and no other page field;
- exactly 18 knowledge-only and 5 target-free guidance rows;
- 76/54, 228/522, Green 2.1 next, no 018;
- each of the 17 relevant source items maps to one exact public prompt semantic fixture; skipped keys have no public binding.

- [ ] **Step 2: Run focused test and verify missing manifest/item coverage/pending failures**

```bash
node --test tests/quant-interview-behavioral-evidence-workstream.test.mjs
```

- [ ] **Step 3: Create exact active manifest**

```json
{
  "id": "interview-strategy-communication-soft-interview-behavioral-evidence-017",
  "canonicalTopics": [
    "interview-strategy-communication",
    "soft-interview"
  ],
  "status": "active",
  "masterItemKeys": [
    "red-book::9.2::guidance",
    "red-book::9.2::9.1",
    "red-book::9.2::9.2",
    "red-book::9.2::9.3",
    "red-book::9.2::9.4",
    "red-book::9.2::9.5",
    "red-book::9.2::9.6",
    "red-book::9.2::9.7",
    "red-book::9.2::9.8",
    "red-book::9.2::9.9",
    "red-book::9.2::9.10",
    "red-book::9.2::9.11",
    "red-book::9.2::9.12",
    "red-book::9.2::9.13",
    "red-book::9.2::9.14",
    "red-book::9.2::9.15",
    "red-book::9.2::9.16",
    "red-book::9.2::9.17",
    "red-book::9.2::9.18",
    "red-book::9.2::9.19",
    "red-book::9.2::9.20",
    "red-book::9.2::9.21",
    "red-book::9.2::9.22"
  ],
  "sourceScopes": [
    {
      "source": "red-book",
      "sourceSections": ["9.2"],
      "evidencePageRanges": [{ "startPage": 309, "endPage": 315 }],
      "reviewOutcome": "selective-behavioral-knowledge-and-guidance",
      "reviewNote": "Twenty-three consecutive soft-interview records resolve to one source-neutral evidence framework, approved existing Knowledge links, and five target-free guidance rows."
    }
  ],
  "publicDelta": { "problems": 0, "knowledge": 1 },
  "knowledgeSlugs": ["behavioral-interview-evidence-and-authenticity"]
}
```

- [ ] **Step 4: Add 22 item-level coverage rows and mirror all 23 master decisions**

Each new coverage row uses `canonicalTopics: ["soft-interview"]`. Apply `mappings` and `notes` exactly. Assign exact 017 `workstream` to all master rows, including target-free rows. Apply only these ten field repairs:

```text
9.2  solutionPages  310–311 -> 310
9.3  questionPages  310–311 -> 310
9.3  solutionPages  310–311 -> 310
9.6  questionPages  311–312 -> 311
9.6  solutionPages  311–312 -> 311
9.12 solutionPages  312–313 -> 313
9.13 solutionPages  313–314 -> 313
9.14 questionPages  313–314 -> 313
9.14 solutionPages  313–314 -> 313
9.22 questionPages  315–316 -> 315
```

- [ ] **Step 5: Run focused test and commit**

```bash
git add tests/quant-interview-behavioral-evidence-workstream.test.mjs src/data/quant-interview/workstreams/interview-strategy-communication-soft-interview-behavioral-evidence-017.json src/data/quant-interview/coverage/red-book.json src/data/quant-interview/master-directory.json
git commit -m "feat(quant-interview): activate behavioral evidence 017"
```

### Task 4: Reconcile active 017 lifecycle, current tests, HANDOFF, and directory

**Files:**
- Create: `tests/quant-interview-behavioral-evidence-completion.test.mjs`
- Modify: `tests/quant-interview-master-directory-repository.test.mjs`
- Modify: `tests/quant-interview-market-awareness-skip.test.mjs`
- Modify: `tests/quant-interview-assessment-formats-workstream.test.mjs`
- Modify: `tests/quant-interview-assessment-formats-completion.test.mjs`
- Modify: `tests/quant-interview-role-employer-fit-workstream.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`
- Modify: `tests/quant-interview-limits-derivatives-completion.test.mjs`
- Modify: `tests/quant-interview-parallel-workstream-governance.test.mjs`
- Modify: `tests/quant-interview-random-walks-markov-chains-completion.test.mjs`
- Modify: `tests/quant-interview-reasoning-communication-completion.test.mjs`
- Modify: `tests/quant-interview-role-employer-fit-completion.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`

**Interfaces:**
- Consumes: active 017 data.
- Produces: active repository memory and strict complete lifecycle test.

- [ ] **Step 1: Write phase-aware 017 completion test**

Use exact temporary path `.github/workflows/quant-interview-behavioral-evidence-017-temporary.yml`, exact five commands, accepted WSL/Linux native-LF Node 24 environments, and SHA pattern.

Active state: exact current block says Soft Interview and active 017; no evidence fields; no completed-17 header.

Complete state: scope evidence to completed-17 section, current-topic block, and master-ingestion section. Require exact active SHA shared by local/CI evidence, numeric run, commands, workflow absence, 76/54, 228/522, Green 2.1, inactive 018, and no stale active wording.

- [ ] **Step 2: Update mutable current-state tests without weakening history**

Move mutable Red 9.2/current counts from 016 tests to current 017 tests. Preserve exact 016 source/manifest/evidence assertions. Update all older phase-aware current-topic branches from 016 to active/complete 017. If full tests expose an omitted current-state file, pause and obtain coordinator authorization before adding it.

- [ ] **Step 3: Write exact active HANDOFF**

```markdown
Current bounded topic:

**Interview Strategy & Communication → Soft Interview.**

Workstream 017 is active at `red-book::9.2::guidance` and `red-book::9.2::9.1` through `red-book::9.2::9.22`. Its public delta is +0 Problems / +1 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.

## Master directory ingestion state

**Workstream 017 is active. The three-book master directory migration remains complete.**

First pending master record after the active 017 scope: `green-book::2.1::theory`

The observed next key does not authorize workstream 018.
```

Update current corpus to 76/54 and master counts to 228/522. Keep completed 016 and all prior sections unchanged.

- [ ] **Step 4: Regenerate directory, run focused/full tests, commit**

```bash
npm run knowledge:directory
npm run knowledge:directory:check
node --test tests/quant-interview-behavioral-evidence-completion.test.mjs tests/quant-interview-behavioral-evidence-workstream.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-market-awareness-skip.test.mjs tests/quant-interview-assessment-formats-completion.test.mjs
npm test
git diff --check
```

Stage only Task 4 files and commit:

```bash
git add -- tests/quant-interview-behavioral-evidence-completion.test.mjs tests/quant-interview-master-directory-repository.test.mjs tests/quant-interview-market-awareness-skip.test.mjs tests/quant-interview-assessment-formats-workstream.test.mjs tests/quant-interview-assessment-formats-completion.test.mjs tests/quant-interview-role-employer-fit-workstream.test.mjs tests/quant-interview-handoff.test.mjs tests/quant-interview-limits-derivatives-completion.test.mjs tests/quant-interview-parallel-workstream-governance.test.mjs tests/quant-interview-random-walks-markov-chains-completion.test.mjs tests/quant-interview-reasoning-communication-completion.test.mjs tests/quant-interview-role-employer-fit-completion.test.mjs docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md
```

```text
docs(quant-interview): record active behavioral evidence 017
```

### Task 5: Prove immutable active 017 in Windows, WSL, and real CI

**Files:**
- Create: `.github/workflows/quant-interview-behavioral-evidence-017-temporary.yml`
- Modify only test-backed 017 files if a real gate exposes a defect.

**Interfaces:**
- Consumes: integrated active tree.
- Produces: one immutable `ACTIVE_SHA` and matching successful numeric `RUN_ID`.

- [ ] **Step 1: Create exact temporary workflow**

```yaml
name: Quant Interview Behavioral Evidence 017 Temporary CI

on:
  push:
    branches:
      - codex/quant-interview-behavioral-evidence-017
  workflow_dispatch:

permissions:
  contents: read

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run master:directory:check
      - run: npm run knowledge:directory:check
      - run: npm run test
      - run: npm run check
      - run: npm run build
```

- [ ] **Step 2: Run Windows gates separately, review, and commit active tree**

Run all five commands in exact order. Require every exit 0, then:

```bash
git diff --check
git status --short
git add -- .github/workflows/quant-interview-behavioral-evidence-017-temporary.yml
git commit -m "ci(quant-interview): verify active behavioral evidence 017"
git rev-parse HEAD
```

Save full SHA as `ACTIVE_SHA`; never amend it.

- [ ] **Step 3: Verify exact active SHA in WSL native-LF Node 24**

Use one fresh detached worktree, `npm ci`, EOL audit, and five ordered gates. Require workflow LF, 76/54, 228/522, Green 2.1, active/evidence-free 017, no 018, exact public prompt/source mapping, no source media, clean tree. Remove only exact proof path and never run WSL prune against Windows repository.

- [ ] **Step 4: Push feature branch and capture matching CI**

```bash
git push -u origin codex/quant-interview-behavioral-evidence-017
gh run list --workflow quant-interview-behavioral-evidence-017-temporary.yml --branch codex/quant-interview-behavioral-evidence-017 --limit 5 --json databaseId,headSha,status,conclusion,url
```

Select only exact `headSha === ACTIVE_SHA`, watch with exit status, require npm ci plus all five gates success, save numeric `RUN_ID`.

- [ ] **Step 5: Replace any failed active proof completely**

If a gate fails, add focused regression, create new active commit, and repeat Windows/WSL/CI. Never record stale evidence.

### Task 6: Remove temporary CI, close 017, verify final tree, and deliver

**Files:**
- Delete: `.github/workflows/quant-interview-behavioral-evidence-017-temporary.yml`
- Modify: `src/data/quant-interview/workstreams/interview-strategy-communication-soft-interview-behavioral-evidence-017.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Regenerate: `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`
- Modify: `tests/quant-interview-behavioral-evidence-workstream.test.mjs`

**Interfaces:**
- Consumes: factual `ACTIVE_SHA` and `RUN_ID`.
- Produces: workflow-free complete 017 branch and integration choice.

- [ ] **Step 1: Delete workflow and commit only removal**

```bash
git add .github/workflows/quant-interview-behavioral-evidence-017-temporary.yml
git commit -m "chore(quant-interview): remove behavioral evidence 017 temporary CI"
git rev-parse HEAD
```

- [ ] **Step 2: Verify workflow-free removal commit in WSL**

Assert workflow absent; manifest remains active/evidence-free; run Node24 `npm ci`, LF audit, five gates, counts/queue/no018. Remove exact proof path only, no prune.

- [ ] **Step 3: Record factual completion evidence**

First make the workstream test lifecycle-conditional: active state must deep-equal the exact evidence-free manifest; complete state must retain the same immutable scope/topics/source/public-delta fields while delegating exact evidence validation to the completion test.

Set manifest complete and add:

| Object | Field | Required value |
|---|---|---|
| `preClosureActiveGate` | `status` | `"active"` |
| `preClosureActiveGate` | `commit` | exact `ACTIVE_SHA` |
| `preClosureActiveGate` | `environment` | `"wsl-native-lf-node24"` |
| `preClosureActiveGate` | `commands` | exact five commands |
| `preClosureActiveGate` | `conclusion` | `"success"` |
| `verification` | `commit` | same `ACTIVE_SHA` |
| `verification` | `runId` | numeric `RUN_ID` |
| `verification` | `commands` | same five commands |
| `verification` | `conclusion` | `"success"` |
| `verification` | `temporaryArtifacts` | `[".github/workflows/quant-interview-behavioral-evidence-017-temporary.yml"]` |
| `finalTreeGate` | `environment` | `"wsl-native-lf-node24"` |
| `finalTreeGate` | `commands` | same five commands |
| `finalTreeGate` | `conclusion` | `"success"` |
| `finalTreeGate` | `temporaryArtifactsAbsent` | `true` |

- [ ] **Step 4: Write completed-17 HANDOFF and regenerate directory**

Completed section includes exact id/SHA/run/environments/commands, one new Knowledge/no Problems, 17 prompt identities, five skipped rows, all ten page repairs, 76/54, 228/522, Green 2.1, source-neutral/authenticity boundary, no completeness overclaim.

Final current state:

```markdown
Current bounded topic:

**No bounded topic is active. Workstream 017 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 018 is not active or authorized by this closure.

## Master directory ingestion state

**No bounded ingestion workstream is active. The three-book master directory migration remains complete.**

First pending master record: `green-book::2.1::theory`
```

Run directory generation/check.

- [ ] **Step 5: Run closure-focused/full Windows gates and commit**

Run completion/workstream/master/directory/behavioral focused tests, full test, diff check, then stage exact manifest/HANDOFF/directory and required phase-aware test changes:

```bash
git add -- src/data/quant-interview/workstreams/interview-strategy-communication-soft-interview-behavioral-evidence-017.json docs/quant-interview/HANDOFF.md docs/quant-interview/KNOWLEDGE_DIRECTORY.md tests/quant-interview-behavioral-evidence-workstream.test.mjs
```

```text
docs(quant-interview): close behavioral evidence 017
```

- [ ] **Step 6: Run final exact-head Windows and WSL gates**

Run five Windows commands separately. Verify exact closure SHA in fresh WSL native-LF Node24 with workflow absent, five gates, complete017 exact evidence, 76/54,228/522,Green2.1,no018,clean LF/source-free tree; safely remove exact path.

- [ ] **Step 7: Full branch review and push**

Review exact 23 mapping/notes/ownership, 22 coverage additions, ten repairs, one public page/17 prompts, catalog/links, historical evidence, workflow absence, protected paths. Run diff/status and push only feature branch; prove remote equality. Use finishing-a-development-branch for the user’s integration choice.
