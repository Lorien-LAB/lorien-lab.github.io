# Quant Interview — Current Handoff

Updated: 2026-08-16

## Current phase

**Phase 2B — source-file verification and bounded book ingestion.**

The 150 Questions source file is verified, and two bounded ingestion batches have passed all repository verification gates.

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
- completed ingestion batches:
  - `150-first-look-q01-q02`
  - `150-first-look-q04-q05`

## Last completed batch

`150-first-look-q04-q05`

- source: `150-most-frequently-asked`
- chapter/section: Chapter 1 — `First Look: Ten Questions`
- source page range: printed pages 7–9
- PDF page range used as evidence: 17–19
- problem scope: Questions 4–5 only
- Problems:
  - `ants-crossing-line`
  - `correlation-matrix-parameter-range`
- reusable Knowledge added:
  - `identity-swapping-invariance`
  - `correlation-matrix`
  - `positive-semidefinite-matrix`
  - `principal-minor-feasibility`
- status: `complete`
- completion / verified commit: `44f8710b12aa85085357e8ea04640b0acfde2d94`
- GitHub Actions verification run: `31936372883`
- gates: `npm run test` ✅ · `npm run check` ✅ · `npm run build` ✅

Question 4 is independently formulated with explicit equal-speed, initial-ordering, and no-simultaneous-triple-collision assumptions so that endpoint and pairwise-collision counts are well-defined. Its solution teaches identity-swapping / straight-through trajectory invariance rather than collision-by-collision simulation.

Question 5 is independently derived from correlation-matrix positive semidefiniteness. The public solution checks all principal minors and also gives a Schur-complement method. It deliberately avoids the common ambiguity of applying the positive-definite leading-principal-minor form of Sylvester's criterion to a semidefinite problem.

## Next action

Start a **new bounded batch only after re-reading this handoff and the Agent Protocol**. Do not append more Questions to either completed batch.

Under the current ingestion validator, page ranges may not overlap. That means Questions whose evidence shares a boundary page with a completed batch need an explicit infrastructure decision rather than silent ingestion. In particular, Question 3 shares printed page 6 with the first batch, and Question 6 begins on printed page 9, which is already part of the Q4–Q5 batch.

A clean content-only next candidate is Question 7, whose solution occupies printed pages 10–12. If selected, the batch must be explicitly bounded to Question 7 even though printed page 12 also begins Question 8. Alternatively, a separate infrastructure batch can redesign source evidence so problem bounds and physical page evidence are not forced into mutually exclusive ranges.

For every next batch:

1. select one source and one bounded problem/page range;
2. register the batch in its manifest;
3. perform ontology-first deduplication;
4. author independent S3+ Problem records only for that range;
5. run relationship/manifest validation plus `npm run test`, `npm run check`, and `npm run build`;
6. review the diff and update this handoff before completion.

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
