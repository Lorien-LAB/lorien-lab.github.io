# Quant Interview Agent Handoff System — Design Spec

Date: 2026-08-16

## 1. Goal

Turn the Quant Interview Knowledge System into a repository-driven workflow that any fresh Chat or coding/research Agent can safely resume without reading historical conversations.

The repository, not conversational memory, is the source of truth.

## 2. Scope

This phase adds:

- one short onboarding entry point for future Agents;
- a durable Agent workflow protocol;
- editorial/content-quality rules;
- a source catalog for the three interview books;
- a compact current-state handoff;
- machine-readable TOC seeds for all three books;
- a first-edition source record and ingestion manifest for *150 Most Frequently Asked Questions on Quant Interviews*;
- tests that prevent drift between docs, source records, manifests, and TOC metadata.

This phase does **not** ingest copyrighted problem statements, solutions, scans, or PDFs.

## 3. Repository-as-Memory Architecture

Canonical human/Agent docs:

```text
docs/quant-interview/
├── README.md
├── AGENT_PROTOCOL.md
├── CONTENT_STANDARD.md
├── SOURCE_CATALOG.md
└── HANDOFF.md
```

Machine-readable source state:

```text
src/data/quant-interview/
├── green-book.json
├── red-book.json
├── 150-most-frequently-asked.json
└── toc/
    ├── green-book.json
    ├── red-book.json
    └── 150-most-frequently-asked.json
```

The onboarding document must remain intentionally short. Detailed rules live in focused files so a new Agent loads only what is needed for the current task.

## 4. Mandatory Agent Startup Protocol

A fresh Agent must:

1. Treat conversational memory as non-authoritative.
2. Read `docs/quant-interview/README.md`.
3. Read `docs/quant-interview/HANDOFF.md`.
4. Identify the target source, chapter, and batch.
5. Read only the target source record, target manifest, relevant TOC subtree, relevant existing Knowledge concepts/techniques, and validation utilities.
6. Compare the working branch with `main`.
7. Work on a task-specific branch unless the user explicitly authorizes a direct `main` change.
8. Process one bounded batch at a time.
9. Run validation/tests/check/build.
10. Update `HANDOFF.md` at the end of a completed batch.

## 5. Batch Contract

The batch is the canonical unit of ingestion work.

A batch must declare:

- stable batch ID;
- source slug;
- source chapter/section;
- bounded page range only when an exact edition/source file has been pinned;
- intended problem scope;
- current status;
- output commit when complete.

Agents must not attempt whole-book generation in one batch.

## 6. Problem Authoring Pipeline

For every source-derived problem:

```text
Source evidence
→ problem identity
→ independent formulation
→ Concept search/reuse
→ Technique search/reuse
→ prerequisite mapping
→ difficulty assessment
→ independent derivation
→ alternative method(s), when useful
→ progressive hints
→ common mistakes
→ extensions/variants
→ problem family / related problems
→ relationship validation
→ editorial review
→ publish
```

Agents must identify what the problem tests before writing the solution.

## 7. Ontology Rules

Books are provenance sources, never ontology namespaces.

Reusable nodes remain:

- Knowledge concepts;
- Problem Solving Techniques stored as `knowledge.type: concept` and `category: Problem Solving Techniques`;
- Problems;
- Problem Sources.

Before creating any new Concept or Technique, an Agent must search existing Knowledge and reuse an existing canonical slug when semantically equivalent.

Examples:

- Conditional Probability → Concept
- Bayes' Theorem → Concept
- Conditioning → Technique
- First-Step Analysis → Technique
- Symmetry → Technique

## 8. Content Quality Standard

A reviewed problem should contain, when applicable:

- independently written Problem statement;
- progressive Hint 1 / Hint 2;
- independently derived Solution;
- multiple methods where they add real value;
- Why This Problem Matters;
- Common Mistakes;
- Extensions / Generalization.

Solution maturity levels:

- S0: answer only
- S1: derivation
- S2: derivation + intuition
- S3: multiple approaches or interview-ready explanation
- S4: interview-ready explanation + traps/common mistakes
- S5: extension/generalization

`solved` / `reviewed` source-derived content should target S3 or above. S0 answer-only entries must not be presented as finished reviewed content.

## 9. Copyright / Provenance Rules

Public output may include:

- independent formulations;
- independent derivations;
- short provenance metadata;
- concepts, techniques, difficulty, families, variants, and references.

Do not publish:

- source PDFs or scans;
- large verbatim passages;
- copied answer keys;
- a book-substitution mirror.

Source files may be used privately as ingestion evidence but must not be committed to this public repository.

## 10. Source Verification States

Source/TOC claims distinguish these states:

```text
user-supplied
web-cross-checked
source-file-verified
edition-pinned
problem-indexed
```

A user-supplied TOC may seed structure immediately, but problem-level coverage must not be called complete before the actual source file is inspected.

## 11. Three Source Books

### Green Book

Canonical work: *A Practical Guide to Quantitative Finance Interviews* — Xinfeng Zhou.

Current state:

- work identity verified;
- user-supplied TOC seeded in this phase;
- exact edition not yet pinned;
- no source-derived problems indexed yet.

### Red Book

Canonical work: *Quant Job Interview Questions and Answers* — Mark Joshi, Nicholas Denson, Andrew Downes.

Current state:

- work identity verified;
- user-supplied TOC seeded in this phase;
- exact edition not yet pinned;
- no source-derived problems indexed yet.

### 150 Questions

Canonical work: *150 Most Frequently Asked Questions on Quant Interviews* — Dan Stefanica, Rados Radoicic, Tai-Ho Wang.

The supplied TOC (`First Look: Ten Questions`, Questions p.17, Solutions p.41) matches the 2013 first edition. Author/publisher metadata is corroborated by Financial Engineering Press and Baruch MFE public records.

Pinned metadata:

- edition: First edition (2013)
- publisher: Financial Engineering Press / FE Press
- ISBN-13: 9780979757648
- ISBN-10: 0979757649
- 224 pages

The edition is pinned at the bibliographic/TOC level, but the actual user source file is not yet mounted. Therefore ingestion remains `awaiting-source-file` and no page batches are opened yet.

## 12. TOC Data Model

Each TOC JSON must include:

```json
{
  "source": "source-slug",
  "canonicalTitle": "...",
  "tocStatus": "user-supplied",
  "coverageClaim": "structure-seed-not-problem-complete",
  "editionStatus": "work-identified | edition-pinned",
  "edition": null,
  "sections": []
}
```

Sections are nested objects with stable IDs, labels/titles, optional start page, optional `kind`, and optional children.

No invented problem count is stored.

## 13. Handoff Contract

`docs/quant-interview/HANDOFF.md` records only current operational state:

- current phase;
- latest completed phase;
- current source/version states;
- active or next batch;
- non-negotiable invariants;
- next recommended action;
- verification commands.

It must not become a chronological transcript.

## 14. Validation

Tests must assert:

- all five handoff docs exist and contain required contracts;
- all three source catalog entries exist;
- all three TOC JSON files parse and declare truthful verification/coverage states;
- Green/Red remain work-identified with no edition pin;
- 150 Questions is edition-pinned to the 2013 first edition with verified ISBN metadata;
- its ingestion manifest remains `awaiting-source-file` with zero batches until an actual source file is available;
- no PDF/scan is added;
- no new Green/Red/150 source-derived Problem Markdown is added in this phase.

Merge gates remain:

```text
npm run test
npm run check
npm run build
```

## 15. Future Phase 2B Entry

Once a real book PDF/source file is provided:

1. inspect title/copyright/TOC pages;
2. verify exact edition against manifest;
3. mark source-file verification;
4. create page-bounded batches;
5. ingest one batch at a time;
6. deduplicate concepts/techniques before creating nodes;
7. independently formulate and solve problems;
8. run all gates;
9. update handoff.
