# Quant Interview — Current Handoff

Updated: 2026-08-16

## Current architecture state

**Stage B — public Topic-first shell is implemented on the current task branch; final integration remains gated by the repository verification suite.**

Stage A established the hidden cross-book ingestion foundation. Stage B now makes the public experience match that architecture: users navigate canonical topics, Knowledge, techniques, and Problems rather than books or source-question order.

The Stage B business tree at commit `e06f83dd605c6b09e500d8373b4544334e0f25ee` passed `npm run test`, `npm run check`, and `npm run build` in GitHub Actions run `31941713726`.

## Stable architecture

- Public Knowledge contains reusable canonical concepts and Problem Solving Techniques.
- Public Problems are canonical first-class practice records under `src/content/problems/`.
- Public Quant Interview navigation is **Topic-first**.
- Books are internal evidence sources, not the public hierarchy.
- All three sources are source-file-verified and edition-pinned.
- `src/data/quant-interview/topics/taxonomy.json` defines the canonical Topic-first taxonomy.
- `src/data/quant-interview/topics/source-topic-map.json` explicitly routes every verified TOC node into canonical topics or an explicit container/non-content role.
- The current source-topic map contains **281 explicit source-TOC routing entries**.
- `src/data/quant-interview/coverage/*.json` is the hidden coverage / semantic-dedup ledger.
- `evidencePageRanges` separates private physical-page evidence from semantic source-item ownership; evidence may overlap across workstreams.
- Source book names, source question numbers, and source page numbers are not part of the public Knowledge/Problem presentation.
- No source PDF/scan is committed to the public repository.

## Public Stage B surfaces

### Quant Interview Hub

`/knowledge/quant-interview/` now presents the canonical topic taxonomy as the main navigation surface.

- the primary journey is **Learn by Topic**;
- the other primary journeys are **Practice Problems** and **Problem-Solving Techniques**;
- the hub no longer loads or renders `problemSources`;
- Topic cards show their subtopics and derive Knowledge / Problem counts from actual public content;
- zero counts are allowed and truthful until Stage C classifies existing content.

### Problem Bank

`/problems/` is source-neutral.

- the Source filter has been removed;
- a canonical Topic / Subtopic filter replaces it;
- `?topic=<canonical-topic-id>` opens the bank with that Topic preselected;
- a Problem assigned to a subtopic also matches the appropriate parent Topic through public taxonomy ancestry;
- search, category, difficulty, concept, and technique filters remain available;
- Problem cards no longer display source-book labels.

### Problem detail

Canonical Problem routes remain `/problems/<slug>/`.

- public Problem pages no longer render book/source labels, source references, source question numbers, or page references;
- the route still loads source records internally only where needed for relationship validation;
- Concepts, Techniques, Prerequisites, Related Problems, difficulty, and canonical classification remain public.

### Legacy Source URLs

The old public Source index/detail pages have been retired.

Existing URLs for the three previously public source records redirect to `/knowledge/quant-interview/`. The underlying `problem-sources` collection, manifests, TOCs, source-topic map, and coverage ledgers remain intact as internal ingestion/audit infrastructure.

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
- canonical problem/Knowledge coverage: incomplete; hidden ledger remains largely pending

### Red Book

- work: *Quant Job Interview Questions and Answers*
- edition/version: Version 1.01 (2008)
- ISBN-13: `9781438217031`
- source file: source-file-verified
- source-file identity: `sha256:09c5aac761bd71c4a6b9406f50dcfe73d8af3ce0a3ef9bb4fe2d65d0b27db6b1`
- source file size: 329 PDF pages
- TOC: source-file-verified
- ingestion state: `manifest-ready`
- canonical problem/Knowledge coverage: incomplete; hidden ledger remains largely pending

### 150 Questions

- work: *150 Most Frequently Asked Questions on Quant Interviews*
- edition: First edition (2013)
- ISBN-13: `9780979757648`
- source file: source-file-verified
- source-file identity: `sha256:d753f3516ce06d8e7242bcdd7252d39ffbc33f9217c6cf8a7e826b658b533e14`
- source file size: 220 PDF pages
- TOC: source-file-verified
- ingestion state: `ingesting`
- previously authored public candidates: Questions 1–2 and 4–5 from the two validated pilot batches
- full cross-book reconciliation: incomplete

## Stage boundaries

Stage B intentionally does **not** migrate existing public Problem/Knowledge records into canonical topic assignments. Their `quantInterviewTopics` fields remain at their current values until Stage C.

Stage B also does not perform new source-derived ingestion, cross-book semantic deduplication, or coverage-ledger reconciliation beyond preserving Stage A infrastructure.

## Next action

Execute **Stage C — migrate existing authored content into the canonical Topic-first model** after Stage B is integrated.

Stage C should:

1. classify the existing Quant Interview Knowledge concepts/techniques into canonical `quantInterviewTopics`;
2. classify the existing canonical Problems into canonical topics/subtopics;
3. remove transitional public provenance fields from source-derived Problem frontmatter where the approved migration plan requires it;
4. move/confirm source-item → canonical Problem/Knowledge provenance in the hidden coverage ledger;
5. preserve the independently authored Problem statements and solutions unless an editorial correction is required;
6. verify that no existing source-derived knowledge disappears during migration;
7. keep semantic deduplication explicit rather than equating similar wording with identity;
8. run `npm run test`, `npm run check`, and `npm run build` before integration.

Do **not** begin a new source-number ingestion sequence in Stage C. Stage D is the first bounded cross-book topic workstream.

## Non-negotiable invariants

- Repository state wins over conversational memory.
- Process one bounded canonical topic or architecture stage at a time.
- All mapped verified sources must be considered before closing a topic workstream.
- Semantic deduplication is mandatory; text similarity alone cannot merge Problems.
- Every inspected source item must receive an explicit coverage-ledger state.
- No duplicate Concept/Technique merely because another source uses a synonym.
- No answer-only entry may be treated as finished reviewed content.
- No copied answer key, large verbatim source passage, or source PDF/scan is public.
- Source book names, question numbers, and page numbers remain internal evidence and do not belong in public Knowledge/Problem presentation.
- No unsupported completeness percentages.
- No merge before verification gates pass.

## Verification gates

```bash
npm run test
npm run check
npm run build
```

Also review the branch diff against the integration base before merging.
