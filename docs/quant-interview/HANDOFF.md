# Quant Interview — Current Handoff

Updated: 2026-08-16

## Current phase

**Agent handoff / source-catalog foundation.**

Next content phase: **Phase 2B — source-file verification and bounded book ingestion**.

## Stable architecture

- Knowledge contains reusable concepts and Problem Solving Techniques.
- Problems are first-class records under `src/content/problems/`.
- Books are Problem Sources, not Knowledge types.
- Canonical Problem routes are `/problems/<slug>/`.
- Source-derived Problems use independent formulations and independent derivations.
- No source PDF/scan is committed to the public repository.

## Source state

### Green Book

- work: *A Practical Guide to Quantitative Finance Interviews*
- work identity: verified
- TOC: user-supplied structural seed
- edition: not pinned
- source file: not verified
- ingestion batches: none

### Red Book

- work: *Quant Job Interview Questions and Answers*
- work identity: verified
- TOC: user-supplied structural seed
- edition: not pinned
- source file: not verified
- ingestion batches: none

### 150 Questions

- work: *150 Most Frequently Asked Questions on Quant Interviews*
- edition: First edition (2013)
- ISBN-13: `9780979757648`
- bibliographic edition: pinned
- TOC: user-supplied structural seed matching first edition
- source file: not yet verified in the ingestion workflow
- ingestion batches: none

## Active batch

None. Do not invent one until a real source file is available and inspected.

## Next action

When the user provides a book PDF/source file:

1. inspect title/copyright/TOC pages;
2. verify the actual file against the source catalog and manifest;
3. align the relevant machine-readable TOC;
4. update `sourceFile` and source-file verification state;
5. create the first small page-bounded batch;
6. search/deduplicate Concepts and Techniques;
7. ingest and independently solve only that batch;
8. run full validation;
9. update this handoff with the new current state.

For Green/Red, the source file must also resolve exact edition before any page-bounded batch is created.

## Non-negotiable invariants

- Repository state wins over conversational memory.
- One bounded batch at a time.
- No invented counts, pages, chapter labels, IDs, performance, or coverage percentages.
- No duplicate Concept/Technique merely because another book uses a synonym.
- No answer-only entry may be treated as finished reviewed content.
- No copied answer key or large verbatim source passage.
- No merge before gates pass.

## Verification gates

```bash
npm run test
npm run check
npm run build
```

Also review the branch diff against `main` before integration.
