# Quant Interview — Current Handoff

Updated: 2026-08-16

## Current architecture state

**Stage A — Topic-first foundation: complete.**  
**Stage B — public Topic-first shell: complete.**  
**Stage C — existing-content source-neutral migration: implementation complete on the current task branch; final integration remains gated by the repository verification suite.**

The system is now structurally ready for cross-book ingestion. Public users navigate canonical Topics, Knowledge, techniques, and Problems. Books, source question numbers, and source page evidence remain internal audit inputs only.

## Stable architecture

- Public Knowledge contains reusable canonical concepts and Problem Solving Techniques.
- Public Problems are canonical first-class practice records under `src/content/problems/`.
- Public Quant Interview navigation is **Topic-first**.
- Canonical public Problems carry no book/source provenance in frontmatter or rendered content.
- Books are internal evidence sources, not the public hierarchy.
- `src/data/quant-interview/topics/taxonomy.json` defines the canonical topic taxonomy.
- `src/data/quant-interview/topics/source-topic-map.json` explicitly routes every verified TOC node into canonical topics or an explicit container/non-content role.
- The source-topic map contains **281 explicit source-TOC routing entries**.
- `src/data/quant-interview/coverage/*.json` is the hidden coverage / semantic-dedup ledger.
- Item-level coverage may refine a mapped section topic to one of its canonical descendants; section-level coverage remains exactly aligned with the source-topic map.
- `evidencePageRanges` is private physical-page evidence and may overlap across distinct semantic workstreams.
- Source book names, source question numbers, and source page numbers do not belong in public Knowledge or Problem presentation.
- Public pages do not load hidden coverage data.
- No source PDF/scan is committed to the public repository.

## Stage C migration result

### Canonical Problems

The six existing interview Problems are now source-neutral and live in topic-oriented directories while preserving their canonical `/problems/<slug>/` routes and independently authored bodies.

- `put-quotes-zero-cost-static-portfolio`
  - `Derivatives, Options & No-Arbitrage`
  - `No-Arbitrage & Option Properties`
- `missing-digit-power-of-two`
  - `Logic, Brainteasers & Discrete Reasoning`
  - `Modular Arithmetic`
- `ants-crossing-line`
  - `Logic, Brainteasers & Discrete Reasoning`
  - `Invariants & State Transformations`
- `correlation-matrix-parameter-range`
  - `Linear Algebra & Matrix Methods`
  - `Covariance & Correlation Matrices`
  - `Positive Semidefinite Matrices`
- `conditional-dice-expectation`
  - `Probability & Statistics`
  - `Conditional Probability & Bayes`
  - `Expectation, Variance & Covariance`
- `random-walk-boundary`
  - `Stochastic Processes & Stochastic Calculus`
  - `Random Walks & Markov Chains`

The Problem collection schema and relationship validator are now source-neutral. Problem↔Knowledge, technique, prerequisite, related-Problem, and duplicate-ID validation remain active without loading `problemSources`.

### Canonical Knowledge

Twelve existing reusable interview Knowledge / technique nodes now carry explicit canonical topic assignments:

- `conditioning`
- `first-step-analysis`
- `recursion-problem-solving`
- `no-arbitrage-principle`
- `option-price-convexity-in-strike`
- `static-arbitrage-construction`
- `modular-arithmetic`
- `modular-invariants`
- `identity-swapping-invariance`
- `correlation-matrix`
- `positive-semidefinite-matrix`
- `principal-minor-feasibility`

Their explanatory bodies were not rewritten merely for migration; Stage C changed classification metadata, not the underlying mathematical content.

### Hidden provenance

The previously ingested 150 Questions items are now auditable only through hidden coverage data:

- source item `1` → `put-quotes-zero-cost-static-portfolio`
- source item `2` → `missing-digit-power-of-two`
- source item `4` → `ants-crossing-line`
- source item `5` → `correlation-matrix-parameter-range`

Each is in `canonical-problem` state and points to the canonical Knowledge that absorbed its concepts/techniques. The section-level First Look record remains non-terminal because the full section has not been reconciled.

Coverage validation resolves these canonical Problem and Knowledge slugs against the actual repository with unresolved targets disallowed.

## Public behavior after Stage C

### Quant Interview Hub

`/knowledge/quant-interview/` derives Topic-card Knowledge and Problem counts from real `quantInterviewTopics` assignments. Counts are not hard-coded and propagate through canonical topic ancestry.

### Problem Bank

`/problems/` remains Topic-first and source-neutral.

- Topic / Subtopic filtering is taxonomy-backed.
- Problems assigned to child topics also match ancestor topics.
- `?topic=<canonical-topic-id>` preselects the requested topic.
- search, category, difficulty, concept, and technique filters remain available.
- no book/source filter is exposed.

### Problem detail

Canonical Problem routes remain `/problems/<slug>/`.

- no source label, source reference, source question number, or page number is rendered;
- source records are no longer loaded merely for Problem relationship validation;
- Concepts, Techniques, Prerequisites, Related Problems, difficulty, and canonical classification remain public.

### Legacy source URLs

The old public Source index/detail pages remain retired. Existing legacy URLs for the three source records redirect to `/knowledge/quant-interview/`. The underlying source records, manifests, verified TOCs, source-topic map, and hidden coverage ledgers remain internal ingestion/audit infrastructure.

## Verified source state

### Green Book

- work: *A Practical Guide to Quantitative Finance Interviews*
- edition: First Edition (2008)
- ISBN-13: `9781438236667`
- source file: source-file-verified
- source-file identity: `sha256:89a637408fc57164c3ee4ef19fb36688a58dfb37b91ef1471d11df82d6d0e3f5`
- source file size: 213 PDF pages
- TOC: source-file-verified
- ingestion state: `manifest-ready`
- canonical content coverage: incomplete; hidden ledger remains largely pending

### Red Book

- work: *Quant Job Interview Questions and Answers*
- edition/version: Version 1.01 (2008)
- ISBN-13: `9781438217031`
- source file: source-file-verified
- source-file identity: `sha256:09c5aac761bd71c4a6b9406f50dcfe73d8af3ce0a3ef9bb4fe2d65d0b27db6b1`
- source file size: 329 PDF pages
- TOC: source-file-verified
- ingestion state: `manifest-ready`
- canonical content coverage: incomplete; hidden ledger remains largely pending

### 150 Questions

- work: *150 Most Frequently Asked Questions on Quant Interviews*
- edition: First edition (2013)
- ISBN-13: `9780979757648`
- source file: source-file-verified
- source-file identity: `sha256:d753f3516ce06d8e7242bcdd7252d39ffbc33f9217c6cf8a7e826b658b533e14`
- source file size: 220 PDF pages
- TOC: source-file-verified
- ingestion state: `ingesting`
- four previously authored source items are mapped to canonical Problems in hidden coverage
- full cross-book reconciliation: incomplete

Source-file verification must never be confused with complete knowledge/problem coverage.

## Next action

Execute **Stage D — the first bounded cross-book canonical topic workstream**:

**Linear Algebra & Matrix Methods → Covariance & Correlation Matrices / Positive Semidefinite Matrices.**

The Stage D workstream must treat **all three verified sources together in one topic context**. Resolve every source-topic-map entry relevant to this subtopic, inspect the corresponding verified source material from all three sources, inventory concepts/problems/variants/interview guidance, and perform semantic deduplication before authoring.

The existing `correlation-matrix`, `positive-semidefinite-matrix`, `principal-minor-feasibility`, and `correlation-matrix-parameter-range` records are canonical starting points to enrich, not a reason to skip source evidence. A semantically duplicate source question should enrich these canonical records or become a meaningful Variant; it must not create a duplicate public page.

Close the workstream only after every inspected source item has an explicit hidden coverage state and the topic-level diff passes all repository gates. Do not process the books sequentially and do not revert to a source-question-number ingestion sequence.

## Non-negotiable invariants

- Repository state wins over conversational memory.
- Process one bounded canonical topic or architecture stage at a time.
- All mapped verified sources must be considered before closing a topic workstream.
- Semantic deduplication is mandatory; text similarity alone cannot merge Problems.
- Every inspected source item must receive an explicit coverage-ledger state.
- No duplicate Concept/Technique merely because another source uses a synonym.
- No answer-only entry may be treated as finished reviewed content.
- No copied answer key, large verbatim source passage, or source PDF/scan is public.
- Canonical public Problems do not carry source provenance in frontmatter or rendered content.
- Source book names, question numbers, and page numbers remain internal evidence only.
- No unsupported completeness percentages.
- No merge before verification gates pass.

## Verification gates

```bash
npm run test
npm run check
npm run build
```

Also review the branch diff against the integration base before merging.
