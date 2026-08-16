# Quant Interview — Current Handoff

Updated: 2026-08-16

## Current phase

**Phase 2B — source-file verification and bounded book ingestion.**

The first real source file has passed identity/edition/TOC verification and the first bounded ingestion batch is open.

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
- source file: not verified in repository state
- ingestion batches: none

### Red Book

- work: *Quant Job Interview Questions and Answers*
- work identity: verified
- TOC: user-supplied structural seed
- edition: not pinned
- source file: not verified in repository state
- ingestion batches: none

### 150 Questions

- work: *150 Most Frequently Asked Questions on Quant Interviews*
- edition: First edition (2013)
- ISBN-13: `9780979757648`
- bibliographic edition: pinned
- actual user source file: **source-file-verified**
- source-file identity: `sha256:d753f3516ce06d8e7242bcdd7252d39ffbc33f9217c6cf8a7e826b658b533e14`
- scan size: 220 PDF pages
- page alignment: printed page 1 = PDF page 11; printed bibliography page 209 = PDF page 219
- TOC: source-file-verified
- ingestion status: `ingesting`
- completed ingestion batches: none

## Active batch

`150-first-look-q01-q02`

- source: `150-most-frequently-asked`
- chapter/section: Chapter 1 — `First Look: Ten Questions`
- source page range: printed pages 1–6
- PDF page range used as evidence: 11–16
- intended problem scope: Questions 1–2 only
- status: active

Do not expand this batch to Questions 3–10 merely because their statements also appear on printed pages 1–2.

## Next action

For the active batch only:

1. identify the Concepts and Problem Solving Techniques actually used by Questions 1–2;
2. search `src/content/knowledge/` semantically and reuse existing canonical slugs where equivalent;
3. create only the missing reusable Knowledge nodes that are justified across problems;
4. independently formulate and independently solve Questions 1–2 to S3+ maturity;
5. record realistic hints, interview signals, Common Mistakes, and meaningful Extensions;
6. validate source/Knowledge/problem relationships and the ingestion manifest;
7. run `npm run test`, `npm run check`, and `npm run build`;
8. review the branch diff against `main`;
9. only after all gates pass, mark the batch complete and record its completion commit here and in the manifest.

Question 1 deserves an explicit editorial check around the assumptions required for the zero-cost put portfolio to be a strict arbitrage; do not blindly copy the source answer's wording about strict convexity.

For Green/Red, exact edition and actual source-file verification are still required before any page-bounded batch is created.

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
