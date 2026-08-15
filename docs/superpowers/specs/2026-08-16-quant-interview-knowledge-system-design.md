# Quant Interview Knowledge System — Design

Date: 2026-08-16

## Goal

Extend Lorien Lab’s existing Knowledge Base into a scalable quantitative-interview learning system built from **concepts, problems, solution techniques, sources, and later learning paths**.

The first content sources are the quantitative-interview books commonly referred to by the user as the **Green Book** and **Red Book**, but the architecture must not be book-specific. It must remain valid when later adding firm interview questions, university problem sets, competition material, personal notes, and original Lorien Lab problems.

The public system should support five distinct intents:

1. **Learn** a reusable concept.
2. **Practice** an individual problem before revealing the solution.
3. **Study** a reusable solution technique.
4. **Browse** a source in its original chapter/problem order.
5. **Follow** a prerequisite-based learning path once enough content exists.

The source books provide provenance. They do **not** define the site ontology.

---

## 1. Current Site Context

The current Knowledge collection supports four public entry types:

- `concept`
- `paper`
- `tool`
- `topic`

It already supports domain/category taxonomy, maturity state, tags, related Knowledge, related Notes, and optional source/official links.

That model is appropriate for reusable knowledge objects, but not for hundreds of interview problems. Problems have different metadata, rendering, filtering, provenance, difficulty, and practice behavior.

**Decision:** keep the existing Knowledge collection as the conceptual layer and add dedicated collections for problems and problem sources.

---

# 2. Canonical Content Objects

The architecture has four primary content objects.

## 2.1 Concept

Concepts continue to live in the existing `knowledge` collection with `type: concept`.

Examples include:

- conditional probability;
- Bayes theorem;
- conditional expectation;
- random walk;
- Markov chain;
- martingale;
- optional stopping;
- order statistics;
- maximum likelihood estimation;
- Kelly criterion.

A strong Concept page should eventually cover:

- definition;
- intuition;
- core formulas;
- important properties;
- derivations where useful;
- prerequisites;
- interview recognition patterns;
- common mistakes;
- related techniques;
- related problems.

Concepts are source-independent. The same concept must not be duplicated merely because it appears in multiple books.

## 2.2 Technique

A technique is a reusable problem-solving method such as:

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

**Canonical decision:** techniques are **not a fifth Knowledge type and not a separate content collection**. They are normal Knowledge entries with:

```yaml
type: concept
category: Problem Solving Techniques
```

The `problems.techniques` field references these Knowledge slugs.

A technique page should explain:

- what the method is;
- when to recognize it;
- the canonical pattern;
- common traps;
- representative problems using it.

This gives the site one conceptual graph instead of separate Concept and Technique databases.

## 2.3 Problem

A Problem is a standalone practice object with independent identity, provenance, difficulty, concepts, techniques, hints, solutions, variants, and relationships.

Problems live in a new `problems` collection.

A Problem must not be implemented as a large subsection inside a Concept entry. This preserves reusable linking in both directions:

```text
Concept → many Problems
Problem → many Concepts
Technique → many Problems
Source → many Problems
```

## 2.4 Problem Source

A Problem Source represents provenance and ordering.

Initial source records:

- Green Book;
- Red Book.

Future source records may represent firm interview collections, university materials, public archives, or Lorien Lab original collections.

Sources live in a new `problemSources` collection backed by `src/content/problem-sources/`.

A Source owns bibliographic/provenance metadata and original ordering. It does **not** own the canonical Problem URL.

---

# 3. Derived Navigation Objects

## 3.1 Problem Family

A Problem may optionally declare a `family` slug for structurally related problems, for example:

- gambler’s ruin;
- stopping time;
- coin patterns;
- occupancy;
- birthday collision;
- secretary / optimal stopping;
- market-making inventory.

Phase 1 does not create a separate family collection. Family pages, if added later, are derived from Problem metadata.

## 3.2 Learning Path

Learning paths combine concepts, techniques, and representative problems in prerequisite order.

Example conceptual structure:

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

Learning paths are explicitly deferred until the corpus is large enough to justify them.

---

# 4. Repository Content Layout

Use this content structure:

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

The subdirectories under `problems/` are editorial organization only.

**Do not** place every question under `src/content/knowledge/green-book/` or `knowledge/red-book/`. That would bind the ontology to two sources and make later expansion awkward.

---

# 5. Canonical URL Design

## 5.1 Quant Interview Hub

```text
/knowledge/quant-interview/
```

This is the primary public gateway from Knowledge.

It exposes:

```text
Learn       → concepts
Practice    → problem bank
Sources     → Green Book / Red Book / later sources
Techniques  → reusable solution methods
```

## 5.2 Problem Bank

```text
/problems/
```

The problem bank is a first-class site surface rather than a subsection of either book.

## 5.3 Problem Detail

```text
/problems/<slug>/
```

Problem slugs must be human-readable and stable. Source grouping in the repository must not leak into public route structure.

## 5.4 Source Index

```text
/knowledge/quant-interview/sources/
```

## 5.5 Source Detail

```text
/knowledge/quant-interview/sources/green-book/
/knowledge/quant-interview/sources/red-book/
```

Source pages preserve source order and link to canonical Problem pages.

## 5.6 Concept and Technique Detail

Existing Knowledge URLs remain canonical:

```text
/knowledge/<knowledge-slug>/
```

Concept and technique pages gain reverse-linked Problem sections without changing their current URLs.

---

# 6. Problem Schema

The `problems` collection should support the following fields.

```yaml
problemId: gb-probability-037

title: Random Walk Hitting Probability
description: A first-step-analysis problem involving an absorbing random walk.

date: 2026-08-16
updated: 2026-08-16

originType: book
source: green-book
sourceSection: Probability
sourceChapter: "3"
sourceProblem: "37"
sourceReference: "Probability · Problem 37"

# optional only when a legitimate public destination exists
sourceUrl: "https://example.org/public-source-page"

domain: Mathematics & Statistics
category: Probability
subcategories:
  - Random Walk
  - Stochastic Processes

tags:
  - probability
  - random-walk
  - interview

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

family: gamblers-ruin

mathDifficulty: 2
insightDifficulty: 4
interviewDifficulty: 3
estimatedMinutes: 10

status: solved
featured: false
```

The example URL above is illustrative only; production records omit `sourceUrl` unless a real permitted URL has been verified.

## 6.1 Field semantics

### `problemId`

Stable source-aware internal identifier. It must be unique across the collection.

### `originType`

Phase-1 enum:

```text
book | interview | original | public-archive
```

### `source`

Slug of a valid `problemSources` entry. Required for source-derived problems; optional only for genuinely original Lorien Lab problems.

### `concepts`

Knowledge slugs representing theory needed to understand the problem.

### `techniques`

Knowledge slugs whose entries have `type: concept` and `category: Problem Solving Techniques`.

### `prerequisites`

Knowledge slugs that should normally be understood before attempting the problem.

### `relatedProblems`

Canonical Problem `problemId` values or canonical problem slugs; implementation must choose exactly one representation and validate it consistently. The implementation plan should prefer canonical Problem slugs because they map directly to routes.

### `family`

Optional stable structural family slug.

---

# 7. Difficulty Model

Use three integer dimensions from 1 to 5.

## `mathDifficulty`

Technical mathematical complexity.

## `insightDifficulty`

Difficulty of recognizing the core trick, abstraction, or structure.

## `interviewDifficulty`

Combined difficulty under interview time pressure, including communication and execution.

This is intentionally more expressive than Easy / Medium / Hard because many quantitative interview puzzles use elementary mathematics but require a difficult insight.

Difficulty values are editorial judgments, not claims of universal consensus.

---

# 8. Editorial Status vs User Progress

Problem editorial status is:

```text
draft | reviewed | solved | extended
```

This describes the maturity of Lorien Lab’s published problem record.

It does **not** represent the visitor’s personal progress.

User-specific states such as solved, favorite, review-later, confidence, or spaced-repetition interval must not be stored in static Markdown frontmatter.

Phase 1 has no authenticated user-progress model.

---

# 9. Problem Content Contract

A mature Problem record should follow this narrative order:

```markdown
## Problem

Independent Lorien Lab formulation.

## Think before revealing

Suggested approach/time framing without giving away the answer.

## Hints

Progressive hints from light to strong.

## Solution

One or more independently derived solution methods.

## Why this problem matters

What recognition, reasoning, or communication skill the problem tests.

## Common mistakes

Typical incorrect assumptions or dead ends.

## Extensions

Variants, generalizations, harder forms, numerical checks, or links to broader theory.
```

Not every problem requires multiple solution methods or every optional section, but classic/high-value problems should aim for the full structure.

---

# 10. Problem Reveal Behavior

Problem pages should encourage an attempt before showing the answer.

Phase 1 uses native HTML disclosure behavior rather than a client framework:

- problem statement visible by default;
- hints collapsed by default;
- full solution collapsed by default;
- each hint independently revealable when useful;
- no JavaScript required for core access.

The exact authoring mechanism may be Astro components or accessible `<details>` elements, but the public behavior above is required.

---

# 11. Dedicated Problem Layout

Create a dedicated `ProblemLayout` rather than rendering problems with the generic Knowledge detail page.

## 11.1 Header

Surface:

- problem identity;
- title;
- source and source reference;
- domain/category;
- concepts;
- techniques;
- three-dimensional difficulty;
- estimated time.

Illustrative hierarchy:

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

## 11.2 Main workspace

Order:

1. Problem statement
2. Think-first framing
3. Hints
4. Solution method(s)
5. Why this problem matters
6. Common mistakes
7. Extensions
8. Related problems

## 11.3 Sidebar

May show:

- source metadata;
- prerequisites;
- concepts;
- techniques;
- problem family;
- related problems;
- previous / next Problem in source order.

The sidebar must never show dead links for unresolved relationships.

---

# 12. Quant Interview Hub

The hub at `/knowledge/quant-interview/` is a dedicated gateway, not a normal Knowledge Card.

## Hero

Positioning:

```text
Quant Interview Knowledge System

Concepts, problems, solution patterns, and source-linked learning paths for quantitative research and trading interviews.
```

Primary actions:

- Browse Concepts
- Practice Problems
- Explore Sources

## Interview taxonomy

Initial categories may include:

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

This taxonomy is an interview-facing navigation layer. It does not replace the current high-level Knowledge domains.

## Source gateways

Green Book and Red Book receive dedicated source cards.

Any counts shown on those cards must be derived from actual content.

## Technique library

Surface Knowledge concepts whose category is `Problem Solving Techniques`.

## Learning paths

Do not render empty or fake learning paths. Show this section only after real path content exists.

---

# 13. Knowledge Landing Integration

The existing `/knowledge/` page remains the broad research library.

Add one prominent gateway near the existing Financial Engineering Learning Resources gateway:

```text
QUANT INTERVIEW

Quant Interview Knowledge & Problem Bank

Probability · Statistics · Brain Teasers · Stochastic Processes · Markets · Programming

Explore Problem Bank →
```

Do **not** inject hundreds of Problem records into the existing general Knowledge Index.

The current Knowledge Index remains concept/paper/tool/topic-oriented. Problems use `/problems/`.

---

# 14. Problem Index

The `/problems/` page should be static-first with progressively enhanced filtering.

Phase-1 filters:

- text search;
- category/domain;
- source;
- interview difficulty;
- concept;
- technique.

Later filters may add family and editorial status if they provide real value.

Each row/card should expose enough metadata to compare problems without opening every page:

```text
GB-037   Random Walk Hitting Probability
Probability · Random Walk
Math 2 · Insight 4 · Interview 3
First-Step Analysis · Recursion
```

All Problem links remain usable when JavaScript is unavailable.

---

# 15. Concept ↔ Problem Reverse Linking

Problems declare forward relationships:

```yaml
concepts:
  - conditional-expectation
  - martingale

techniques:
  - conditioning
```

Concept/Technique pages derive related Problems by reverse lookup.

Required graph directions:

```text
Concept   → Problems
Problem   → Concepts
Technique → Problems
Problem   → Techniques
Source    → Problems
Problem   → Source
```

Do not duplicate reverse relationships in Concept frontmatter unless editorial ordering later requires it.

Missing relationship targets must be omitted from rendering and detected by tests.

---

# 16. Problem Source Model

A `problemSources` entry contains provenance and source navigation metadata.

Required Phase-1 fields:

```yaml
shortTitle: Green Book
displayTitle: Green Book
sourceType: book
description: Source metadata and indexing context for problems attributed to this book.
```

Optional fields are added only when externally verified:

```text
authors
year
edition
officialUrl
publisherUrl
isbn
```

Do not guess bibliographic metadata merely to populate the UI.

Source identity is provided by the content entry slug (`green-book`, `red-book`); a duplicate `slug` field is unnecessary.

A Source page should provide:

- verified source description;
- source sections/chapters actually represented in the corpus;
- indexed Problem count;
- represented Concept count;
- difficulty distribution when enough content exists;
- canonical Problem links.

Source pages must not host or reconstruct the book itself.

---

# 17. Copyright and Provenance Rules

This is a hard public-site requirement.

## Publish

The site may publish:

- Lorien Lab’s own concept summaries;
- independently written explanations;
- independently derived solutions;
- appropriately reformulated problem statements;
- original diagrams;
- original variants and extensions;
- source references and verified provenance links.

## Do not publish

- full book PDFs;
- scans or screenshots of book pages;
- large verbatim portions of copyrighted text;
- copied answer keys;
- a source-order mirror whose primary value is substituting for the original book.

## Attribution

Every source-derived Problem must expose a stable source reference such as:

```text
Source: Green Book · Probability · Problem 37
```

A source URL appears only when a legitimate public destination has been verified.

---

# 18. Solution Quality Standard

The system optimizes for reusable understanding, not answer density.

When genuinely valuable, include multiple independent methods such as:

```text
Method A · Direct counting
Method B · Conditioning
Method C · Martingale
Method D · Numerical verification
```

For each method, the prose should make clear:

- core insight;
- mathematical complexity;
- interview usefulness;
- generalizability.

Important Problems should explain **why the problem matters** and identify common wrong approaches.

---

# 19. Agent Authoring Contract

An Agent adding a source-derived Problem must:

1. assign a stable Problem slug and `problemId`;
2. record source provenance without guessing missing bibliographic fields;
3. map the Problem to existing Concept slugs;
4. create a new Concept only when it is genuinely reusable;
5. map reusable techniques to Knowledge entries in `Problem Solving Techniques`;
6. assign all three difficulty dimensions conservatively;
7. write an independent problem formulation suitable for public publication;
8. derive the solution independently rather than copying source prose;
9. add progressive hints when useful;
10. add variants or related Problems only when the relationship is real;
11. run schema and relationship validation;
12. never fabricate corpus counts, source links, or source metadata.

This contract should be copied into the repository authoring guide during implementation.

---

# 20. Validation and Testing

## 20.1 Schema tests

Validate:

- difficulty values are integers from 1–5;
- `problemId` values are unique;
- source slugs resolve when present;
- concept slugs resolve;
- technique slugs resolve and point to Knowledge concepts categorized as `Problem Solving Techniques`;
- prerequisite slugs resolve;
- related Problem slugs resolve;
- source problem identifiers do not collide within the same source.

## 20.2 Route tests

Validate:

- every Problem has `/problems/<slug>/`;
- source pages link to canonical Problem routes;
- Concept pages reverse-link to associated Problems;
- existing Knowledge URLs remain unchanged;
- unresolved optional relationships never render dead links.

## 20.3 Truthfulness tests and conventions

Automated tests should reject:

- hard-coded fake corpus counts;
- placeholder source links;
- accidental public hosting of source PDFs under the new interview content tree.

Copyright compliance still requires editorial review; tests are a guardrail, not a legal classifier.

## 20.4 Completion gates

Every implementation phase must pass:

```text
npm run test
npm run check
npm run build
```

---

# 21. Visual Design Principles

The Quant Interview system remains part of Lorien Lab rather than becoming a separate LeetCode-style application.

Reuse:

- current light/dark theme;
- mono labels;
- restrained accent color;
- bordered research cards;
- static-first layouts;
- sticky contextual sidebars where useful.

Problem pages should feel like a technical interview workspace.

Avoid:

- decorative gamification;
- meaningless scores;
- excessive animation;
- hiding core content behind JavaScript;
- creating a second unrelated visual language.

---

# 22. Implementation Phases

## Phase 1 — Foundation

Implement:

- `problems` collection;
- `problemSources` collection;
- schemas and relationship validation;
- `/problems/` index;
- `/problems/<slug>/` detail route;
- dedicated `ProblemLayout`;
- `/knowledge/quant-interview/` hub;
- source index/detail routes;
- Knowledge landing gateway;
- Concept/Technique → related Problem reverse links;
- repository authoring rules;
- tests.

Use only a small, reviewed seed corpus sufficient to validate the architecture. Do not bulk-ingest both books before the model and UI are proven.

## Phase 2 — Full Green/Red Book Ingestion

After Phase 1 is stable:

- ingest all desired Green Book knowledge points and Problems;
- ingest all desired Red Book knowledge points and Problems;
- deduplicate overlapping Concepts;
- map Problems to Techniques;
- map Problem families;
- add independent solutions, hints, and extensions;
- refine filters based on actual corpus distribution.

Bulk ingestion must preserve the copyright/provenance rules above.

## Phase 3 — Graph and Learning Paths

Add only after the corpus has enough density:

- prerequisite visualization;
- Technique-focused browsing;
- Problem-family pages;
- structured learning paths;
- real coverage dashboards derived from content.

## Phase 4 — Practice and Progress

Potential later additions:

- random practice;
- daily sets;
- local solved/review state;
- favorites;
- review queues;
- spaced repetition;
- optional authenticated cross-device progress if eventually justified.

No backend or authenticated state is required for Phase 1.

---

# 23. Non-Goals for Phase 1

Phase 1 will not:

- reproduce either book verbatim;
- host source PDFs;
- bulk-create hundreds of unreviewed placeholders;
- add a fifth Knowledge type for Problems or Techniques;
- build authentication;
- build cross-device progress storage;
- implement spaced repetition;
- implement a heavy interactive graph engine;
- redesign the entire Knowledge Base;
- create fake source metadata or completion statistics.

---

# 24. Acceptance Criteria

The foundation is successful when:

1. Green Book and Red Book are modeled as **sources**, not as the site ontology.
2. Problems have first-class canonical routes independent from Knowledge entries.
3. Techniques reuse the existing Knowledge `concept` model under `Problem Solving Techniques`.
4. A Concept or Technique can connect to Problems from many sources without duplication.
5. A visitor can browse by Concept, Problem, Source, and Technique.
6. Problem pages encourage attempting the question before revealing hints and solutions.
7. Source provenance is visible and systematic.
8. The public site contains Lorien Lab’s independent explanations and derivations rather than a book mirror.
9. The architecture can accept future firm interview problems without schema redesign.
10. All displayed counts are derived from real content.
11. Existing Knowledge URLs remain stable.
12. The system remains Astro-native and static-first.
13. Test, check, and production build gates pass before merge.
