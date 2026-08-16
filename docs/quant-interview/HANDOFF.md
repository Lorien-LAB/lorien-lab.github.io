# Quant Interview — Current Handoff

Updated: 2026-08-16

## Current phase

**Phase 2B — source-file verification and bounded book ingestion.**

The first real source file has passed identity/edition/TOC verification, and the first bounded ingestion batch has passed all repository verification gates.

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
- completed ingestion batches: `150-first-look-q01-q02`

## Last completed batch

`150-first-look-q01-q02`

- source: `150-most-frequently-asked`
- chapter/section: Chapter 1 — `First Look: Ten Questions`
- source page range: printed pages 1–6
- PDF page range used as evidence: 11–16
- problem scope: Questions 1–2 only
- Problems:
  - `put-quotes-zero-cost-static-portfolio`
  - `missing-digit-power-of-two`
- reusable Knowledge added:
  - `no-arbitrage-principle`
  - `option-price-convexity-in-strike`
  - `static-arbitrage-construction`
  - `modular-arithmetic`
  - `modular-invariants`
- status: `complete`
- verified content commit: `390f132e1d54c428d30d09e6b2f75dcd24e948d0`
- GitHub Actions verification run: `31935080008`
- gates: `npm run test` ✅ · `npm run check` ✅ · `npm run build` ✅

Question 1 was independently derived with an explicit support condition for strict arbitrage. The public solution does not repeat the source answer's stronger-than-necessary claim that option prices must be strictly convex in strike; ordinary no-arbitrage convexity permits equality, while the concrete zero-cost portfolio becomes a strict arbitrage only when a positive-payoff terminal region is genuinely possible.

## Next action

Start a **new bounded batch only after re-reading this handoff and the Agent Protocol**. Do not silently continue through the rest of Chapter 1 in the same batch.

A natural next candidate is another small `150 Questions` First Look slice, but the next Agent must explicitly choose and register its page/problem bounds before authoring. Green/Red still require exact-edition and source-file verification in repository state before any batch is created for them.

For the next batch:

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
