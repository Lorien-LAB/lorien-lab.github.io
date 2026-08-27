# Quant Interview Three-Book Master Directory — Design Spec

**Date:** 2026-08-28
**Status:** Approved in conversation; pending written-spec review
**Product direction:** One complete, deterministic ingestion directory for three verified source books
**Repository:** `D:\lorien-lab.github.io`

## 1. Goal

Create one complete internal master directory that merges the verified structures and item-level questions from:

1. *A Practical Guide to Quantitative Finance Interviews* (First Edition, 2008);
2. *Quant Job Interview Questions and Answers* (Version 1.01, 2008); and
3. *150 Most Frequently Asked Questions on Quant Interviews* (First edition, 2013).

The master directory becomes the sole authority for deciding which source record is processed next. Existing published content is backfilled into the directory, and all future ingestion advances from the first ordered `pending` record. Public Problems and Knowledge remain source-neutral and deduplicated.

## 2. Product Decisions

- The merged directory is semantic, not a simple concatenation of three books.
- Existing canonical taxonomy order is the top-level order. No competing topic taxonomy is created.
- Within each leaf topic, source evidence is ordered Green Book, Red Book, then 150 Questions; records retain their physical order within each source.
- Every actual source question receives one item record, including questions later judged to be duplicates or unsuitable as standalone public Problems.
- A source question and its source solution are one directory item, not two independently ingestible records.
- Non-question guidance and theory sections remain visible as directory records and may resolve to Knowledge only.
- The first ordered `pending` item is the only legal starting point for new ingestion.
- Bounded workstreams may process several consecutive records for practical review, but they may not skip an earlier `pending` record.
- Public content remains source-neutral. Book titles, source ids, page evidence, scan hashes, and source wording stay outside public content and public routes.
- The current 76 Problems and 50 Knowledge nodes are migrated as existing canonical targets. Migration must not publish duplicates or change their mathematical ownership merely to fit directory order.
- Whole-book completion is never inferred from verified files, verified TOCs, or topic-workstream completion.

## 3. Scope

### 3.1 In scope

- one machine-readable master directory covering all three verified editions;
- complete chapter, section, subsection, and actual-question enumeration;
- question-to-solution page pairing where a source provides a separate solution section;
- canonical topic mapping for every ingestible record;
- deterministic cross-book ordering and a globally unique stable record key;
- backfill of existing coverage states, canonical Problems, canonical Knowledge, and workstream ownership;
- a generated internal Markdown view showing exact queue order and state;
- a public-safe projection that exposes only canonical learning and practice structure;
- validators for ordering, source identity, state transitions, targets, duplication, and generated output;
- migration tests proving that the public corpus remains exactly 76 Problems and 50 Knowledge before new ingestion begins;
- an initial sequential workstream beginning at the first migrated `pending` record.

### 3.2 Out of scope

- publishing source PDFs, scans, page images, copied answer keys, or long source excerpts;
- presenting books as public navigation categories;
- creating a public source bibliography for individual Problems or Knowledge pages;
- replacing `taxonomy.json`, `source-topic-map.json`, existing coverage ledgers, or workstream manifests;
- automatically accepting extracted text without item-level review;
- claiming that every source section must create a public Problem;
- changing existing canonical slugs solely to mirror a source title;
- importing the entire remaining corpus in one unreviewable commit;
- adding user accounts, personal completion tracking, bookmarks, or a backend;
- creating workstream 014 before the master-directory migration and validation are complete.

## 4. Directory Architecture

### 4.1 Canonical hierarchy

The master directory follows the current taxonomy in this exact top-level order:

1. Interview Strategy & Communication
2. Logic, Brainteasers & Discrete Reasoning
3. Calculus & Differential Equations
4. Linear Algebra & Matrix Methods
5. Probability & Statistics
6. Stochastic Processes & Stochastic Calculus
7. Derivatives, Options & No-Arbitrage
8. Fixed Income, Rates & General Finance
9. Monte Carlo & Numerical Methods
10. Algorithms, Data Structures & C++

Existing taxonomy child order defines leaf-topic order. Source chapters may contribute to more than one leaf topic, but each item record has exactly one `primaryTopic` that determines its queue position. Additional compatible classifications remain in `canonicalTopics`.

### 4.2 Source order inside a canonical leaf topic

Records inside one leaf topic are ordered by:

1. source rank: `green-book`, `red-book`, `150-most-frequently-asked`;
2. physical question order in the verified edition;
3. stable item key as the deterministic tie-breaker.

This preserves recognizable book order without allowing one book to dominate the entire project. It also places semantically equivalent questions close enough for deliberate deduplication.

### 4.3 Directory records versus public content

The master directory is private repository state. It records where material came from and how it was resolved. Public Problem and Knowledge collections continue to record only canonical topic ownership and public relationships.

One directory record may resolve to:

- one new canonical Problem;
- an existing canonical Problem as a duplicate or variant;
- one or more canonical Knowledge nodes;
- interview guidance with no public target;
- non-content material with no ingestion action.

Multiple directory records may point to one public canonical target. One directory record may not create multiple competing canonical Problems.

## 5. Canonical Data Model

### 5.1 Master directory file

Create the internal source of truth at:

```text
src/data/quant-interview/master-directory.json
```

Its top-level contract is:

```json
{
  "version": 1,
  "sourceOrder": [
    "green-book",
    "red-book",
    "150-most-frequently-asked"
  ],
  "nodes": [],
  "items": []
}
```

`nodes` preserves the complete merged structural directory. `items` is the sequential ingestion queue. Both arrays are committed data and validated against the three edition-pinned source manifests.

### 5.2 Directory node contract

Every structural node contains:

```json
{
  "id": "topic::reasoning-communication",
  "kind": "topic",
  "title": "Reasoning & Communication",
  "parentId": "topic::interview-strategy-communication",
  "order": 2,
  "canonicalTopic": "reasoning-communication"
}
```

Allowed node kinds are `topic`, `source-section`, and `source-subsection`. Source nodes additionally carry `source`, `sourceSection`, and verified physical ordering metadata. Structural nodes never carry lifecycle state or canonical targets.

### 5.3 Item record contract

Every actual question or reviewable non-question unit contains:

```json
{
  "key": "green-book::1.1::guidance",
  "kind": "guidance",
  "source": "green-book",
  "sourceSection": "1.1",
  "sourceItem": null,
  "questionPages": [{ "startPage": 17, "endPage": 17 }],
  "solutionPages": [],
  "primaryTopic": "interview-preparation",
  "canonicalTopics": ["interview-strategy-communication", "interview-preparation"],
  "sortKey": "01.01|01|0001|green-book::1.1::guidance",
  "state": "pending",
  "canonicalProblems": [],
  "canonicalKnowledge": [],
  "workstream": null,
  "resolutionNote": null
}
```

Page numbers use PDF page numbers. When a source also has printed-page numbering, optional `displayPage` values may be stored alongside PDF pages. The exact source wording is not stored in the master directory.

### 5.4 Allowed lifecycle states

The master directory accepts these states:

- `pending`
- `canonical-problem`
- `merged-duplicate`
- `variant`
- `knowledge-only`
- `interview-guidance`
- `non-content-frontmatter`
- `non-content-backmatter`

Only `pending` is non-terminal. Every terminal record requires a non-empty `resolutionNote`. Problem-bearing terminal states require real canonical Problem targets. `knowledge-only` requires real canonical Knowledge targets. `interview-guidance` and non-content states require empty public target arrays.

## 6. Complete Source Enumeration

### 6.1 Section inventory

The existing verified TOCs provide the structural starting point, but they are not yet a complete item-level question inventory. Enumeration proceeds source by source with the following evidence:

- edition-pinned source manifest;
- verified TOC;
- source-topic map;
- current coverage ledger;
- rendered PDF pages for page-boundary and layout confirmation;
- extracted text for search and indexing only.

Every TOC section appears in `nodes`, including frontmatter and backmatter. Every actual question, numbered exercise, named puzzle, or independently answerable interview prompt appears once in `items`.

### 6.2 Question and answer pairing

When questions and solutions live in separate sections, enumeration pairs them by source numbering and confirmed content identity. The item keeps both `questionPages` and `solutionPages`.

Pairing rules are:

1. exact source question number when present;
2. exact source title or stable named-puzzle identity;
3. verified sequential correspondence when the source uses unnumbered lists;
4. manual review when numbering or OCR is ambiguous.

An ambiguous pair remains `pending` with an enumeration validation error and cannot enter content ingestion. It is never guessed from page proximity alone.

### 6.3 Non-question material

Guidance, introductory theory, chapter summaries, and interview-process material are included because the user requested one complete directory. They use `kind: guidance` or `kind: theory` and may resolve to Knowledge or `interview-guidance`.

Front covers, copyright pages, tables of contents, bibliographies, indexes, and blank separator pages are represented structurally but are terminal non-content records only when an item record is required for complete source reconciliation.

## 7. Deterministic Ordering

### 7.1 Top-level topic order

The two-digit top-level prefix comes from existing taxonomy order: `01` through `10`. The next two digits come from child-topic order. Parent-only material is assigned to an explicit approved child topic before it becomes ingestible.

### 7.2 Leaf-topic order

Inside each leaf topic, the order is Green Book, Red Book, then 150 Questions. Within a source, physical question order is determined from the verified PDF, not alphabetical title order or extraction time.

Completed records do not move to the end. They remain in their canonical position and are skipped by the next-record selector. This keeps the directory stable as work advances.

### 7.3 Stable item key and sort key

The stable key format is:

```text
<source>::<source-section>::<source-item-or-unit-id>
```

The sortable key format is:

```text
<topic-order>.<leaf-order>|<source-rank>|<physical-order>|<stable-key>
```

Keys are immutable after migration. A source correction creates a reviewed migration that preserves the previous key through an explicit alias map; ordinary ingestion may not silently rename keys.

## 8. Sequential Ingestion Protocol

### 8.1 Selecting the next record

The selector sorts all `items` by `sortKey` and returns the first record whose state is `pending`. A new workstream must register that key as its first scope item. Tests reject a workstream that begins after an earlier pending key.

The selector is deterministic and read-only. It does not mutate state or infer content targets.

### 8.2 Resolving one record

Each record passes through this review sequence:

1. inspect the rendered question and solution pages;
2. identify the mathematical or interview-skill identity;
3. compare against existing canonical Problems and Knowledge;
4. choose one allowed terminal disposition;
5. author or enrich the canonical target when required;
6. add reciprocal public relationships where the existing content contract requires them;
7. update the corresponding legacy coverage ledger and the master record together;
8. validate targets, ordering, source neutrality, and corpus counts.

The next record cannot be processed until the current record has a valid terminal disposition in the worktree.

### 8.3 Bounded commits without skipping records

A workstream may contain one record or a short consecutive run within one leaf topic. The default review batch is at most ten actual questions. A batch ends earlier when it reaches:

- a leaf-topic boundary;
- a source boundary with materially different semantics;
- a shared-state change that benefits from separate verification;
- ten actual questions.

Guidance-only records may share a batch when they resolve to the same small Knowledge module. Batch size is an implementation convenience and never changes the global queue order.

## 9. Semantic Deduplication

### 9.1 Canonical identity

Canonical identity is determined by the underlying problem, assumptions, requested result, and decisive solution method. Source title, character names, numbers, order of presentation, and book wording do not create separate identities by themselves.

A materially different information protocol, stochastic model, domain condition, or requested theorem may justify a separate canonical Problem even when the source stories resemble each other.

### 9.2 Duplicate source appearances

The first reviewed appearance may create a canonical Problem. Later equivalent appearances resolve as `merged-duplicate` or `variant` and point to that same slug. Their source evidence remains independently auditable.

No public title contains a book name, source color, source section, or source question number.

### 9.3 Knowledge-only resolutions

Low-complexity checks, reusable definitions, interview heuristics, and theory summaries may resolve as `knowledge-only` when the public Knowledge page contains a visible self-test or practical check appropriate to the source material.

Material with no durable public learning value may resolve as `interview-guidance` only for genuine process or career guidance. Mathematical questions may not be discarded as guidance to reduce authoring work.

## 10. Existing-State Migration

### 10.1 Backfill inputs

Migration joins:

- all three coverage ledgers;
- all workstream manifests 001 through 013;
- current Problem frontmatter and canonical ids;
- current Knowledge frontmatter and catalog entries;
- existing source-topic mapping and verified TOCs.

Where an existing terminal coverage row already names real targets, the matching master record inherits that disposition, targets, workstream id, and a normalized resolution note.

### 10.2 No re-authoring of completed content

Migration does not reopen completed workstreams or rewrite their public content. It records their durable results in the new directory. A mismatch between completed evidence and current targets is a migration error requiring a focused correction, not authorization for a broad rewrite.

### 10.3 Migration invariants

Before the first new item is ingested:

- public Problem count remains exactly 76;
- topic-classified public Knowledge count remains exactly 50;
- every completed workstream remains `complete` with unchanged factual evidence;
- every existing terminal coverage target resolves to a real public slug;
- no current terminal row becomes `pending`;
- no current pending row is marked terminal without item-level review;
- every source record maps to exactly one master item or an explicit structural-only node;
- master ordering is unique and deterministic;
- the first pending item is reported explicitly.

## 11. Public and Internal Projections

### 11.1 Internal complete directory

The existing generated internal document remains:

```text
docs/quant-interview/KNOWLEDGE_DIRECTORY.md
```

Its generator is extended to include:

- master-directory record totals by state;
- exact first pending key;
- per-topic ordered source records;
- question and solution page ranges;
- canonical targets and workstream ownership;
- explicit gaps where item enumeration is incomplete.

The document is generated and deterministic. Agents do not edit it manually.

### 11.2 Public source-neutral directory

The public `/knowledge/quant-interview/directory/` route continues to consume only public-safe taxonomy, catalog, Knowledge, and Problem data. It may show canonical topic coverage and practice links but never imports `master-directory.json`, coverage ledgers, source maps, or workstream manifests.

The master directory influences public content only through reviewed canonical Problems and Knowledge committed by bounded workstreams.

## 12. Validation and Error Handling

### 12.1 Structural validation

Validation rejects:

- unknown source ids or editions;
- duplicate node ids or item keys;
- missing parent nodes;
- unknown canonical topics;
- a `primaryTopic` absent from `canonicalTopics`;
- malformed or overlapping page ranges within one item role;
- missing physical order;
- duplicate sort keys;
- source sections absent from the verified TOC or approved item-level extension map.

### 12.2 Lifecycle validation

Validation rejects:

- unknown states;
- terminal records without resolution notes;
- `pending` records with canonical targets or workstream completion claims;
- Problem states without Problem targets;
- Knowledge-only states without Knowledge targets;
- guidance or non-content states with public targets;
- workstreams that skip the first pending record;
- non-consecutive workstream scopes unless every intervening item is already terminal.

### 12.3 Target validation

Every canonical Problem and Knowledge slug must exist and satisfy the public source-neutral contract. A target may not expose source fields, source names, source question numbers, page evidence, or copied source answer text.

The validator also checks that legacy coverage rows and master items agree on state, targets, primary topic, and workstream ownership.

### 12.4 Failure behavior

Enumeration or validation failures stop generation and ingestion with the stable item key and a specific reason. The system does not silently omit malformed records, auto-terminalize ambiguous items, or continue from a later pending key.

Generated-file check mode exits nonzero when the committed Markdown projection is stale.

## 13. Testing Strategy

Tests are divided into focused contracts:

1. **Source enumeration tests** — all verified TOC nodes are represented and every enumerated question has valid page evidence.
2. **Ordering tests** — topic, source, physical, and stable-key ordering produce one deterministic sequence.
3. **Lifecycle tests** — only allowed state transitions and target combinations pass.
4. **Migration tests** — existing coverage and workstreams backfill without changing the 76/50 corpus.
5. **Next-item tests** — the selector returns exactly the first pending record and rejects skipped workstream scopes.
6. **Dedup tests** — multiple source appearances may resolve to one canonical target without duplicate public pages.
7. **Public-boundary tests** — no private master-directory or source evidence enters the public import graph.
8. **Generated-directory tests** — write and check modes are deterministic on Windows and Linux paths.
9. **Full repository gates** — `npm run test`, `npm run check`, and `npm run build` pass under Node 24.

PDF enumeration uses rendered-page visual checks for every newly enumerated page range. Text extraction is a navigation aid, not the final layout authority.

## 14. Initial Queue Position

After migration, the expected earliest unresolved canonical leaf is:

```text
Interview Strategy & Communication
└─ Interview Preparation
   ├─ green-book::1.1::guidance
   └─ green-book::1.2::guidance
```

Green Book 1.3, 1.4, and 1.5 are already terminal through workstream 013 and remain in place as completed records. The selector then continues through remaining Interview Strategy records before entering Logic, Brainteasers & Discrete Reasoning.

The implementation must compute and test the actual first pending key after full migration. If evidence reveals an earlier valid pending record under the approved ordering, the computed result takes precedence over this expectation and the design document is amended before ingestion begins.

## 15. Success Criteria

The feature is complete when:

1. one committed master directory represents all three verified TOC structures;
2. every actual question currently identifiable in the three books has one stable item record;
3. separate question and solution sections are paired with verified page ranges;
4. all existing terminal coverage and workstream results are backfilled;
5. the pre-ingestion public corpus remains exactly 76 Problems and 50 Knowledge;
6. the first pending record is deterministic and visible in the generated internal directory;
7. no workstream can begin after an earlier pending record;
8. duplicate source appearances remain auditable without creating duplicate public Problems;
9. the public import graph remains source-neutral;
10. generated directory check mode passes;
11. all focused and full repository tests pass;
12. Node 24 test, check, and build gates pass before the first sequential ingestion workstream begins.

## 16. Non-Goals and Boundaries

- “Complete directory” means complete structural and item-level inventory for the three verified editions, not a claim that all items have been published.
- “Sequential import” means every earlier record reaches a reviewed terminal disposition before a later pending record is processed; it does not mean every record produces a new Problem.
- The directory is an ingestion authority, not a copyright publication mechanism.
- Source page evidence remains short-form metadata only; source text and scans remain uncommitted.
- Existing canonical content remains authoritative over source wording.
- New topics require a separate taxonomy design and are not invented during enumeration.
- Migration and new ingestion are separate closures. Workstream 014 is not marked active until migration is verified.

## 17. Rollout

Rollout has four bounded phases:

1. **Master schema and validator** — add the contract, ordering functions, selector, and failing/passing tests.
2. **Three-source enumeration and migration** — enumerate all source items, pair pages, backfill states, and generate the internal directory without changing public counts.
3. **Migration closure** — run full local gates, record exact migration evidence, and keep workstream 014 inactive.
4. **Sequential ingestion** — activate workstream 014 at the computed first pending key and process consecutive records under the ordinary Topic-first authoring and CI closure protocol.

Each phase has its own reviewable commit boundary. The migration phase may use practical checkpoints per source file, but the master directory becomes authoritative only after all three sources and all migration invariants pass together.
