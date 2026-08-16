# Quant Interview — Current Handoff

Updated: 2026-08-16

## Current architecture state

**Stage A — Topic-first foundation is complete on the current task branch; final integration remains gated by the repository verification suite.**

The system has moved from source-order ingestion to a canonical-topic architecture. Public content remains transitional until Stage B, but the internal foundation for cross-book processing is now in place.

## Stable architecture

- Public Knowledge contains reusable canonical concepts and Problem Solving Techniques.
- Public Problems are canonical first-class practice records under `src/content/problems/`.
- Books are internal evidence sources, not the durable public hierarchy.
- All three sources are source-file-verified and edition-pinned.
- `src/data/quant-interview/topics/taxonomy.json` defines the canonical Topic-first taxonomy.
- `src/data/quant-interview/topics/source-topic-map.json` explicitly routes every verified TOC node into canonical topics or an explicit container/non-content role.
- The current map contains **281 explicit source-TOC routing entries**.
- `src/data/quant-interview/coverage/*.json` is the hidden coverage ledger; source content begins pending until a canonical topic workstream reconciles it.
- `evidencePageRanges` separates private physical-page evidence from semantic source-item ownership; evidence may overlap across workstreams.
- Source page numbers are internal evidence only.
- No source PDF/scan is committed to the public repository.

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
- existing authored content: the previously validated first two pilot batches remain canonical candidates
- full cross-book reconciliation: incomplete

## What Stage A changed

- Green and Red source records/manifests were pinned to the actual supplied files.
- All three TOCs are source-file-verified.
- The old globally non-overlapping page-range rule was replaced by reusable `evidencePageRanges` plus exclusive semantic source-problem ownership.
- A ten-domain canonical topic taxonomy and focused subtopics were introduced.
- Every source TOC node was explicitly routed through the hidden source-topic map; the Green TOC seed was corrected with the verified `N points on a circle` item before mapping.
- Hidden section-level coverage ledgers were initialized for all three sources.
- Coverage, taxonomy, source-topic routing, and evidence validators were added.
- Knowledge and Problem schemas now accept optional `quantInterviewTopics` arrays, but existing public content is not classified until Stage C.

## Important transition boundary

The current public Quant Interview UI is still source-oriented in places. In particular, the landing page, Problem Bank source filter, Problem cards, Problem detail source line, and public source routes have not yet been migrated. That is deliberately deferred to Stage B rather than mixed into Stage A.

Existing source-linked Problem frontmatter also remains transitional until Stage C moves provenance into the hidden ledger and makes public canonical Problems source-neutral.

## Next action

Execute **Stage B — public Topic-first shell** as the next bounded implementation stage.

Stage B should:

1. replace source-first Quant Interview landing navigation with canonical topic navigation;
2. remove Sources as a primary public journey;
3. remove public book/source display from Problem cards and Problem detail;
4. replace the public source filter with Topic / Subtopic filtering;
5. preserve canonical Problem routes and hidden source infrastructure;
6. keep `src/data/quant-interview/coverage/`, source manifests, verified TOCs, and source-topic mappings private/internal;
7. run `npm run test`, `npm run check`, and `npm run build` before integration.

Do not start a source-number ingestion sequence. Stage C will migrate existing authored content into canonical topics and hidden provenance; Stage D will then begin bounded cross-book topic ingestion.

## Non-negotiable invariants

- Repository state wins over conversational memory.
- Process one bounded canonical topic or architecture stage at a time.
- All mapped verified sources must be considered before closing a topic workstream.
- Semantic deduplication is mandatory; text similarity alone cannot merge Problems.
- Every inspected source item must receive an explicit coverage-ledger state.
- No duplicate Concept/Technique merely because another source uses a synonym.
- No answer-only entry may be treated as finished reviewed content.
- No copied answer key, large verbatim source passage, or source PDF/scan is public.
- Source page numbers remain internal evidence and do not belong in public Knowledge/Problem presentation.
- No unsupported completeness percentages.
- No merge before verification gates pass.

## Verification gates

```bash
npm run test
npm run check
npm run build
```

Also review the branch diff against the integration base before merging.
