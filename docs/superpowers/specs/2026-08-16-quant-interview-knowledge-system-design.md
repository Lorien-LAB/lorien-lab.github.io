# Quant Interview Knowledge System — Design

Date: 2026-08-16

## Goal

Extend the existing Lorien Lab Knowledge Base with a scalable quantitative-interview learning system built from concepts, problems, solution techniques, source books, and learning paths.

The initial content source will be the commonly referenced quantitative interview “Green Book” and “Red Book”, but the architecture must not be book-specific. It should remain valid when later adding interview questions and problem sets from firms such as Jane Street, Optiver, SIG, Citadel, HRT, IMC, DRW, Jump, Akuna, personal notes, and original problems.

The system should answer five different user intents cleanly:

1. **Learn a concept** — understand the theory, intuition, formulas, prerequisites, and related ideas.
2. **Practice a problem** — attempt a question before revealing hints and solutions.
3. **Study a solution pattern** — learn reusable techniques such as conditioning, symmetry, indicator variables, recursion, martingales, or backward induction.
4. **Follow a source** — browse the Green Book, Red Book, or another source chapter by chapter without making the book itself the primary information architecture.
5. **Follow a learning path** — study a topic in prerequisite order rather than source-book order.

The public site should present Lorien Lab’s own structured knowledge, derivations, explanations, and problem-solving insights. Source books provide provenance; they do not define the site’s ontology.

---

## Current Site Context

The current Knowledge Base is implemented as one Astro content collection with four entry types:

- `concept`
- `paper`
- `tool`
- `topic`

Knowledge entries currently support domain/category taxonomy, maturity state, tags, related knowledge, related notes, and optional source/official links. The Knowledge landing page is optimized for browsing a general research library by domain and type.

This existing structure is a good fit for concepts and reusable research objects, but it should not absorb hundreds of interview problems as a fifth ad-hoc knowledge type. Problems have different lifecycle, metadata, rendering, filtering, and interaction requirements.

Therefore the Quant Interview system should extend the site with dedicated content collections while preserving the current Knowledge Base as the conceptual layer.

---

# 1. Core Information Architecture

The system has four primary content objects and two derived navigation objects.

## 1.1 Concept

A reusable theoretical knowledge object.

Examples:

- conditional probability
- Bayes theorem
- conditional expectation
- random walk
- Markov chain
- martingale
- optional stopping
- order statistics
- maximum likelihood estimation
- Kelly criterion

Concepts continue to live in the existing `knowledge` collection.

A concept should explain:

- definition;
- intuition;
- core formulas;
- properties;
- derivations where useful;
- prerequisites;
- typical interview recognition patterns;
- common mistakes;
- related techniques;
- related problems.

Concepts are **not** source-specific. A concept should not be duplicated simply because it appears in both books.

## 1.2 Problem

A standalone practice object.

A problem is not merely a section inside a concept page. It has independent identity, source provenance, difficulty, concepts, solution techniques, variants, hints, and solution methods.

Examples:

- Green Book probability problem 37;
- Red Book stochastic-process problem 14;
- Jane Street coin-game interview problem;
- original Lorien Lab extension of a classic stopping-time puzzle.

Problems live in a new `problems` collection.

## 1.3 Source / Book

A source object describes where problems originate and preserves canonical ordering.

Initial source records:

- Green Book
- Red Book

Future source records may include:

- firm interview collections;
- university problem sets;
- competition archives;
- personal/original problem collections.

Sources live in a new `problemSources` collection rather than being encoded only as tags.

## 1.4 Technique

A reusable problem-solving method.

Examples:

- symmetry;
- conditioning;
- first-step analysis;
- linearity of expectation;
- indicator variables;
- recursion;
- generating functions;
- martingale arguments;
- coupling;
- invariants;
- backward induction;
- dynamic programming;
- exchange arguments;
- Bayesian updating.

Techniques should be modeled as Knowledge concepts or as a dedicated subtype within the existing conceptual Knowledge Base, not duplicated as arbitrary problem metadata only.

Each technique page should answer:

- what the technique is;
- when to recognize it;
- the canonical pattern;
- common traps;
- representative problems using it.

## 1.5 Problem Family — derived navigation object

A family groups structurally related problems.

Examples:

- gambler’s ruin family;
- stopping-time family;
- coin-pattern family;
- random allocation family;
- secretary / optimal stopping family.

A family is initially derived from shared metadata and explicit `family` slugs. It does not need its own full content collection in Phase 1.

## 1.6 Learning Path — derived or later explicit object

A learning path orders concepts and representative problems by prerequisite structure.

Examples:

- Quant Probability Interview Path;
- Stochastic Processes Interview Path;
- Market Making Foundations Path;
- Options Interview Path.

Learning paths are Phase 3+ and should not block the first implementation.

---

# 2. Repository Content Layout

Recommended source layout:

```text
src/content/
├── knowledge/
│   ├── concepts/
│   ├── papers/
│   ├── tools/
│   └── topics/
│
├── problems/
│   ├── green-book/
│   ├── red-book/
│   ├── interviews/
│   └── original/
│
├── problem-sources/
│   ├── green-book.md
│   └── red-book.md
│
├── notes/
├── research/
├── projects/
└── reproductions/
```

Do **not** place every question under `src/content/knowledge/green-book/` or `knowledge/red-book/`. That would bind the ontology to two books and make later source expansion awkward.

The file hierarchy under `problems/` is editorial organization only. Public URLs should be source-independent and stable.

---

# 3. Canonical URL Design

## 3.1 Quant Interview Hub

```text
/knowledge/quant-interview/
```

This is the primary public gateway.

It should expose four main actions:

```text
Learn       → concepts
Practice    → problem bank
Sources     → Green Book / Red Book / future sources
Techniques  → reusable solution methods
```

## 3.2 Problem Index

```text
/problems/
```

The problem bank is a first-class site surface rather than being hidden under one book page.

## 3.3 Problem Detail

```text
/problems/<slug>/
```

Examples:

```text
/problems/green-book-random-walk-hitting-probability/
/problems/red-book-conditional-expectation-game/
```

The slug should remain human-readable and stable even if source metadata changes.

## 3.4 Source Index

```text
/knowledge/quant-interview/sources/
```

## 3.5 Source Detail

```text
/knowledge/quant-interview/sources/green-book/
/knowledge/quant-interview/sources/red-book/
```

These pages preserve chapter/order navigation but do not own the canonical problem URLs.

## 3.6 Concept Detail

Existing Knowledge URLs remain canonical:

```text
/knowledge/conditional-probability/
/knowledge/martingale/
/knowledge/order-statistics/
```

Concept pages should gain a “Related Problems” surface populated from problem metadata.

---

# 4. Problem Schema

The new `problems` collection should be explicit enough to support future filtering, graph relationships, and practice modes.

Recommended fields:

```yaml
id: gb-probability-037

title: Random Walk Hitting Probability
description: A first-step-analysis problem involving absorption probabilities in a one-dimensional random walk.

date: 2026-08-16
updated: 2026-08-16

source: green-book
sourceSection: Probability
sourceChapter: 3
sourceProblem: "37"

originType: book

# classification
domain: Mathematics & Statistics
category: Probability
subcategories:
  - Random Walk
  - Stochastic Processes

tags:
  - probability
  - random-walk
  - interview

# knowledge graph
concepts:
  - conditional-probability
  - random-walk

techniques:
  - first-step-analysis
  - recursion

prerequisites:
  - expected-value
  - conditional-probability

relatedProblems:
  - rb-random-walk-012

family: gambler-ruin

# difficulty
mathDifficulty: 2
insightDifficulty: 4
interviewDifficulty: 3

# practice metadata
estimatedMinutes: 10
status: solved
featured: false

# publication/provenance controls
sourceReference: "Chapter 3, Problem 37"
sourceUrl: optional-public-source-url
```

### Difficulty scale

Use integers from 1–5.

- `mathDifficulty`: technical mathematical complexity;
- `insightDifficulty`: difficulty of identifying the key idea;
- `interviewDifficulty`: combined practical difficulty under interview conditions.

This is superior to a single Easy/Medium/Hard value because many quantitative brain teasers use elementary mathematics but require a difficult insight.

### Problem status

Recommended editorial status:

```text
draft | reviewed | solved | extended
```

This describes Lorien Lab content maturity, not user progress.

User-specific progress should not be stored in static Markdown frontmatter.

---

# 5. Problem Markdown Body Contract

A problem record should follow a repeatable structure.

```markdown
## Problem

Lorien Lab’s own concise formulation of the problem.

## Think before revealing

Optional framing and suggested time budget.

## Hints

### Hint 1
...

### Hint 2
...

## Solution

### Method 1 · First-step analysis
...

### Method 2 · Martingale argument
...

## Why this problem matters

What the interviewer/problem is testing.

## Common mistakes

...

## Extensions

Variants, generalizations, harder forms, simulation checks, or connections.
```

Not every problem needs every section, but flagship/classic problems should aim for the full structure.

---

# 6. Public Problem Detail UI

A dedicated `ProblemLayout` should be created instead of rendering problems with the generic Knowledge article layout.

## Header

The top of a problem page should surface:

- problem title;
- source;
- chapter/section/problem number when available;
- domain/category;
- concept tags;
- technique tags;
- three-dimensional difficulty;
- suggested solution time.

Example visual hierarchy:

```text
PROBLEM · GB-037

Random Walk Hitting Probability

Green Book · Probability · Problem 37

Math       ●●○○○
Insight    ●●●●○
Interview  ●●●○○

Concepts    Random Walk · Conditional Probability
Techniques  First-Step Analysis · Recursion
```

## Main workspace

Recommended order:

1. Problem statement
2. “Think first” prompt
3. expandable hints
4. solution methods
5. interview insight
6. common mistakes
7. extensions / variants
8. related problems

The first public version may use native `<details>` elements for hints/solutions to remain static-first and accessible without a client framework.

## Sidebar

A sticky sidebar can show:

- source metadata;
- prerequisite concepts;
- techniques;
- related problems;
- problem family;
- previous / next problem in source order.

---

# 7. Quant Interview Hub

The hub at `/knowledge/quant-interview/` should be designed as a dedicated gateway, not a normal Knowledge Card.

Recommended sections:

## Hero

```text
Quant Interview Knowledge System

Concepts, problems, solution patterns, and source-linked learning paths for quantitative research and trading interviews.
```

Primary actions:

- Browse Concepts
- Practice Problems
- Explore Sources

## Knowledge domains

Suggested initial taxonomy:

- Probability
- Statistics
- Combinatorics
- Brain Teasers
- Stochastic Processes
- Linear Algebra
- Calculus
- Optimization
- Time Series
- Econometrics
- Options & Derivatives
- Market Making
- Trading
- Market Microstructure
- Programming
- Algorithms
- Machine Learning
- Mental Math

This is an interview-specific taxonomy layered on top of the existing high-level Knowledge domains.

## Source gateways

Dedicated cards for:

- Green Book
- Red Book

Each card should show derived counts such as indexed problems and represented concepts. Counts must always be derived from content rather than hard-coded aspirational numbers.

## Technique library

A compact index of reusable solution methods.

## Learning paths

Initially marked as planned or shown only when real path content exists.

---

# 8. Knowledge Landing Integration

The existing `/knowledge/` page should keep its role as the broad research library.

Add one prominent gateway alongside the existing Financial Engineering Learning Resources gateway:

```text
QUANT INTERVIEW

Quant Interview Knowledge & Problem Bank

Probability · Statistics · Brain Teasers · Stochastic Processes · Markets · Programming

Explore Problem Bank →
```

Do not add hundreds of problems to the existing Knowledge Index. The general Knowledge Index should remain concept/paper/tool/topic-oriented.

Problems should have their own `/problems/` search/index UI.

---

# 9. Problem Index and Filtering

The `/problems/` page should support static-first browsing and progressively enhanced browser-side filtering similar to the current Knowledge index.

Recommended filters:

- search;
- domain/category;
- source;
- difficulty;
- concept;
- technique;
- status;
- problem family.

Recommended row/card metadata:

```text
GB-037   Random Walk Hitting Probability
Probability · Random Walk
Math 2 · Insight 4 · Interview 3
First-Step Analysis · Recursion
```

The first version does not need complex client-side multi-select UI. Simple selects plus text search are sufficient.

---

# 10. Concept ↔ Problem Graph

This is the most important cross-linking rule.

Problems declare their concepts:

```yaml
concepts:
  - conditional-expectation
  - martingale
```

Concept pages derive related problems by reverse lookup.

Therefore:

```text
Concept → Problems
Problem → Concepts
Source  → Problems
Problem → Techniques
Technique → Problems
```

No duplicated relationship data is required for the reverse direction unless an explicit editorial ordering is desired.

Broken slugs should be omitted from rendering and caught in tests, consistent with the current site’s truthfulness/relationship philosophy.

---

# 11. Source / Book Model

A source record should contain bibliographic/provenance information rather than reproducing the book.

Recommended fields:

```yaml
slug: green-book
title: Quant Interview Green Book
shortTitle: Green Book
sourceType: book
authors: [...]
year: ...
description: ...

sections:
  - Probability
  - Statistics
  - ...

officialUrl: optional
```

The source page should provide:

- source description;
- chapter/section navigation;
- indexed-problem count;
- concept coverage;
- difficulty distribution;
- links to canonical problem pages.

It should not publish a PDF copy or function as a chapter-by-chapter text mirror.

---

# 12. Copyright and Provenance Rules

This is a hard requirement for the public site.

## Public content principle

The site should publish:

- Lorien Lab’s own conceptual summaries;
- independently written explanations;
- independently derived solutions;
- reformulated problem statements where appropriate;
- original diagrams;
- original variants and extensions;
- source references and bibliographic provenance.

## Do not publish

- full book PDFs;
- scans/screenshots of book pages;
- large verbatim portions of copyrighted text;
- complete answer keys copied verbatim;
- a source-order mirror whose primary value is replacing purchase/access to the original book.

## Attribution

Every source-derived problem should have a stable source reference such as:

```text
Source: Green Book · Probability · Problem 37
```

Where a legitimate official/public URL exists, it may be linked.

---

# 13. Solution Quality Standard

The system should optimize for understanding rather than answer density.

For important problems, prefer multiple solution methods when genuinely useful.

Example:

```text
Method A · Direct counting
Method B · Conditioning
Method C · Martingale
Method D · Numerical verification
```

Each method should make its trade-off clear:

- key insight;
- mathematical complexity;
- interview suitability;
- generalizability.

A problem page should also explain **why the problem matters**:

- what recognition skill is tested;
- what shortcut or abstraction is expected;
- what common wrong assumptions appear;
- how the idea generalizes.

---

# 14. Problem Families

Problems may optionally declare a `family` slug.

Example families:

```text
gamblers-ruin
coin-patterns
occupancy
birthday-collision
stopping-time
secretary-problem
market-making-inventory
```

Initially, the family page can be derived dynamically from all problems sharing the same slug.

Future versions may promote important families into full Knowledge topic pages.

---

# 15. Learning Paths

Learning paths are intentionally deferred until the base graph is populated.

A path should combine:

```text
Concept → Concept → Core Problems → Technique → Challenge Problems
```

Example probability path:

```text
Counting
  ↓
Conditional Probability
  ↓
Bayes
  ↓
Expectation
  ↓
Indicator Variables
  ↓
Conditional Expectation
  ↓
Random Walk
  ↓
Markov Chains
  ↓
Martingales
  ↓
Stopping Times
```

Learning paths should not be hard-coded before enough content exists to make them useful.

---

# 16. Practice Mode — Future Phase

A later `/problems/practice/` surface may support:

- random problem;
- domain filters;
- difficulty range;
- source filters;
- unsolved/review filters;
- daily problem sets;
- favorites;
- spaced repetition.

This phase will require a user-progress persistence strategy. The initial static site should not invent this state model prematurely.

Possible future persistence choices include:

- local browser storage for private single-device progress;
- optional authenticated backend for cross-device progress.

No backend is required for Phase 1.

---

# 17. Search and Discoverability

The problem search index should include:

- title;
- description;
- source;
- source reference;
- domain/category;
- concepts;
- techniques;
- tags;
- family.

The global site should eventually be able to surface a concept and its problems from either search direction.

Search should remain progressively enhanced: all problems must still be navigable when JavaScript is unavailable.

---

# 18. Agent Authoring Contract

Because Lorien Lab is designed for both humans and coding agents, problem ingestion must be deterministic.

An agent adding a problem should:

1. assign a stable `id` and slug;
2. record source provenance;
3. map the problem to existing concept slugs;
4. create missing concepts only when genuinely reusable;
5. map reusable solution techniques;
6. assign three difficulty dimensions with justification in review notes if uncertain;
7. write an independent problem formulation;
8. write independent derivations rather than copying a source answer;
9. add hints before the full solution when useful;
10. add related problems/variants only when the relationship is real;
11. run relationship validation tests;
12. never fabricate source metadata or performance/progress counts.

This contract should later be documented in the repository README or a dedicated authoring guide after implementation.

---

# 19. Validation and Testing

The implementation should add automated contracts for:

## Schema validation

- all problem difficulty values are 1–5;
- all source slugs resolve;
- all concept slugs resolve;
- all technique slugs resolve;
- all related-problem slugs resolve;
- source problem identifiers are unique within a source.

## Route validation

- every problem has a canonical `/problems/<slug>/` page;
- source pages link to canonical problem URLs;
- concept pages reverse-link to associated problems;
- Knowledge hub routes remain unchanged.

## Truthfulness / copyright guardrails

Tests cannot prove copyright compliance, but repository conventions should reject:

- hosted source PDFs under the public source tree when they are not explicitly licensed;
- hard-coded fake counts;
- placeholder source links;
- source records with missing provenance identifiers where one is required.

## Build gates

Completion requires:

```text
npm run test
npm run check
npm run build
```

---

# 20. Visual Design Principles

The Quant Interview system should fit the current Lorien Lab aesthetic rather than becoming a separate app.

Reuse:

- existing dark/light theme tokens;
- mono labels;
- bordered research cards;
- restrained accent color;
- static-first layouts;
- sticky contextual sidebars where useful.

Problem pages should feel more like a technical interview workspace than a blog post.

Avoid:

- gamified gradients/badges that make the site look like LeetCode clone;
- decorative scoring without real semantics;
- excessive client-side animation;
- hiding core content behind JavaScript.

---

# 21. Implementation Phases

## Phase 1 — Foundation

Build only the durable model and minimum useful surfaces:

- `problems` collection;
- `problemSources` collection;
- problem schema;
- source schema;
- `/problems/` index;
- `/problems/<slug>/` detail route;
- `/knowledge/quant-interview/` hub;
- Green Book and Red Book source pages;
- Knowledge landing gateway;
- Concept → related problems reverse links;
- initial tests and authoring rules.

Populate only a small representative seed set sufficient to validate the architecture.

## Phase 2 — Full Book Ingestion

After the architecture proves stable:

- ingest all Green Book knowledge points and problems;
- ingest all Red Book knowledge points and problems;
- deduplicate overlapping concepts;
- map problem families;
- add multiple solutions/variants where valuable;
- improve filters based on real corpus distribution.

## Phase 3 — Knowledge Graph and Paths

Add:

- prerequisite visualization;
- technique ↔ problem pages;
- problem-family pages;
- structured learning paths;
- coverage dashboards derived from real content.

## Phase 4 — Practice System

Add only after enough problems exist:

- random practice;
- daily sets;
- local progress;
- review queues;
- spaced repetition;
- optional persistent account-backed progress if ever justified.

---

# 22. Non-Goals for the First Implementation

The first implementation will **not**:

- reproduce either book verbatim;
- host book PDFs;
- add hundreds of unreviewed placeholder problems;
- build user authentication;
- build cross-device progress storage;
- implement spaced repetition;
- implement a complex interactive graph engine;
- redesign the entire Knowledge Base;
- replace the current concept/paper/tool/topic model;
- create fake completion statistics or aspirational corpus counts.

---

# 23. Acceptance Criteria

The foundation is successful when:

1. Green Book and Red Book are modeled as sources, not as the information architecture itself.
2. Problems have first-class canonical routes and metadata independent from Knowledge entries.
3. Existing Knowledge concepts can connect to many problems across many sources without duplication.
4. A visitor can browse by concept, problem, source, and solution technique.
5. Problem pages encourage attempting the problem before revealing solutions.
6. Source provenance is visible and systematic.
7. The public site publishes independent Lorien Lab explanations/solutions rather than a book mirror.
8. The data model can accept future firm interview problems without schema redesign.
9. All counts shown in the UI are derived from actual content.
10. Existing Knowledge URLs and current site architecture remain stable.
11. The implementation remains static-first and Astro-native.
12. Test, check, and production build gates pass before merge.
