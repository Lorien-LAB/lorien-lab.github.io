# Quant Interview Evidence-Overlap Infrastructure Design

Date: 2026-08-16
Status: Approved design with public-provenance clarification; implementation not yet started
Target phase: Quant Interview Knowledge System — Phase 2B

## 1. Problem

The current ingestion manifest uses `startPage` and `endPage` for each bounded batch and the validator requires page ranges to be strictly non-overlapping and ordered.

That conflates two different ideas:

1. **Problem ownership / batch scope** — which source questions belong to a batch.
2. **Source evidence** — which printed pages must be inspected internally to verify those questions and their solutions.

In the 2013 first edition of *150 Most Frequently Asked Questions on Quant Interviews*, adjacent questions can share a printed page. This is already true for the next blocked items:

- Question 3 shares printed page 6 with the completed Q1–Q2 batch.
- Question 6 begins on printed page 9, which is already evidence for the completed Q4–Q5 batch.

Those are legitimate evidence overlaps, not duplicated problem ingestion.

A second concern is presentation. Physical page numbers are useful for internal verification, but they are not useful public Knowledge content. The public Quant Interview Knowledge System should prioritize complete, accurate, well-structured Problems and reusable Knowledge rather than exposing source-page bookkeeping.

## 2. Goals

This infrastructure batch will make the ingestion model represent problem scope and physical evidence separately.

The implementation must:

- allow multiple bounded batches to cite the same printed evidence page internally;
- continue to prevent the same source problem from being owned by more than one batch within the same source section;
- keep batch IDs unique;
- keep evidence page ranges individually valid;
- preserve the source-file and edition gates already enforced by `validateIngestionManifest`;
- migrate existing completed 150 Questions batches without changing their semantic coverage;
- unlock future content batches for Q3 and Q6 without ingesting either question in this infrastructure batch;
- remain generic enough for Green Book, Red Book, and future sources;
- make source-page evidence an **internal ingestion concern only**;
- ensure public Problem / Knowledge presentation does not need to expose original source page numbers.

## 3. Non-goals

This batch will not:

- author or publish any new Problem record;
- add or modify the mathematical/financial substance of existing Problems;
- add or modify Knowledge ontology nodes;
- change source-file verification status for Green Book or Red Book;
- create a per-problem provenance database inside the manifest;
- change copyright boundaries or content maturity requirements;
- remove source identity, chapter identity, or source-problem identity needed for traceability.

Metadata-only cleanup of existing Problem provenance is allowed when needed to remove public page-number references. It must not alter the question, solution, ontology mapping, difficulty, or interview guidance.

## 4. Chosen Data Model

Each ingestion batch will continue to identify the canonical problem scope with:

```json
{
  "id": "150-first-look-q03",
  "sourceSection": "1 First Look: Ten Questions",
  "expectedProblemScope": ["3"]
}
```

Physical source evidence will be represented separately as:

```json
{
  "evidencePageRanges": [
    {"startPage": 6, "endPage": 7}
  ]
}
```

A batch can contain one or more evidence ranges. Ranges describe printed source pages used for internal verification, not exclusive ownership and not public content.

Example future batches that must be valid after the change:

```json
{
  "id": "150-first-look-q03",
  "sourceSection": "1 First Look: Ten Questions",
  "expectedProblemScope": ["3"],
  "evidencePageRanges": [{"startPage": 6, "endPage": 7}],
  "status": "active"
}
```

and

```json
{
  "id": "150-first-look-q06",
  "sourceSection": "1 First Look: Ten Questions",
  "expectedProblemScope": ["6"],
  "evidencePageRanges": [{"startPage": 9, "endPage": 10}],
  "status": "active"
}
```

These overlaps are legal even though completed batches already cite pages 6 and 9.

## 5. Public Knowledge and Problem Provenance Boundary

`evidencePageRanges` is repository-internal ingestion metadata.

Public-facing rules:

- **Knowledge entries do not need original source page numbers.** A Knowledge node should contain the reusable concept or technique itself: definition, intuition, derivation, recognition signals, examples, pitfalls, and related ideas as appropriate.
- **Problem entries do not need original source page numbers either.** Public provenance may retain source identity, chapter/section, and source-problem identity, but not printed-page bookkeeping.
- Page numbers must not be copied from the manifest into Knowledge bodies, Problem bodies, titles, descriptions, tags, or user-facing provenance strings.
- The content priority is correctness, completeness, clarity, and reusable structure—not reproducing the source book's physical layout.
- Internal evidence remains available in the manifest for Agents performing source verification and ingestion audits.

For already-ingested Q1, Q2, Q4, and Q5, any frontmatter provenance string that currently includes `printed p.` / `printed pp.` should be normalized to source/chapter/problem identity without page numbers. This is metadata-only cleanup and must not alter the authored content.

## 6. Validator Rules

`validateIngestionManifest` will retain all existing edition and source-file gating rules.

For manifests with a verified source file, the batch validator will enforce:

1. Every batch is an object.
2. Every batch has a non-empty unique string `id`.
3. Every batch has a non-empty string `sourceSection`.
4. Every batch has a non-empty array `expectedProblemScope`.
5. Every problem identifier in `expectedProblemScope` is a non-empty string.
6. A problem ownership key composed from `sourceSection + sourceProblem` may occur in only one batch.
7. Every batch has a non-empty array `evidencePageRanges`.
8. Every evidence range has integer `startPage` and `endPage`, both positive, with `endPage >= startPage`.
9. Within one batch, evidence ranges must be sorted by ascending `startPage` and must not overlap. A later range must satisfy `startPage > previousEndPage`. The validator does not normalize or merge ranges implicitly.
10. Evidence ranges may overlap freely across different batches.

The validator will no longer compare one batch's evidence end page against another batch's evidence start page.

## 7. Migration of Existing 150 Questions Manifest

The two existing completed batches will preserve exactly the same coverage and verification metadata.

Before:

```json
{
  "id": "150-first-look-q01-q02",
  "startPage": 1,
  "endPage": 6,
  "expectedProblemScope": ["1", "2"]
}
```

After:

```json
{
  "id": "150-first-look-q01-q02",
  "evidencePageRanges": [{"startPage": 1, "endPage": 6}],
  "expectedProblemScope": ["1", "2"]
}
```

Likewise `150-first-look-q04-q05` migrates from printed pages 7–9 to one evidence range `{7, 9}`.

No completed batch IDs, problem slugs, completion commits, verification runs, dates, or status fields change.

The physical page ranges remain internal manifest evidence and do not need to be repeated in the public Problem or Knowledge layer.

## 8. Backward Compatibility Decision

This infrastructure batch will perform an explicit manifest migration rather than supporting both schemas indefinitely.

Rationale:

- only a small number of repository manifests currently contain batches;
- dual support would keep the semantic ambiguity of `startPage/endPage` alive;
- a single canonical schema is easier for future Agents to understand and validate;
- repository state, tests, Agent Protocol documentation, and handoff can move atomically.

Work-identified or edition-pinned manifests with `batches: []` require no structural change beyond validator compatibility.

## 9. Documentation Changes

The implementation will update repository memory so future Agents do not reintroduce the old exclusivity assumption or surface internal page bookkeeping as Knowledge content.

At minimum:

- `docs/quant-interview/AGENT_PROTOCOL.md` will define batch problem scope as exclusive ownership and page ranges as reusable internal evidence.
- `docs/quant-interview/AGENT_PROTOCOL.md` will explicitly state that original page numbers are not required in public Problem / Knowledge content.
- `docs/quant-interview/CONTENT_STANDARD.md` will state that source-derived content should be complete, accurate, independently written, and structurally clear without reproducing original page numbers.
- `docs/quant-interview/HANDOFF.md` will remove the current warning that Q3/Q6 are blocked by overlapping pages and state that the infrastructure gate has been resolved.
- `docs/quant-interview/README.md` will only change if needed to keep terminology consistent.
- `SOURCE_CATALOG.md` should not gain new problem-coverage claims because no new Problems are ingested in this batch.

## 10. Test Design

Tests will be written before production changes.

Required regression cases:

### 10.1 Existing source gates remain intact

- unpinned editions cannot contain batches;
- edition-pinned manifests without a verified source file cannot contain batches;
- valid existing empty manifests still pass.

### 10.2 Evidence overlap is allowed

A manifest containing all of the following must validate:

- Q1–Q2 evidence pp.1–6;
- Q3 evidence pp.6–7;
- Q4–Q5 evidence pp.7–9;
- Q6 evidence pp.9–10.

### 10.3 Problem ownership overlap is rejected

The validator must reject two batches in the same `sourceSection` that both claim source problem `3`, even if their evidence pages differ.

### 10.4 Same problem label in different sections is allowed

If two different source sections both contain a problem labeled `1`, they may coexist because ownership keys include `sourceSection`.

### 10.5 Evidence shape and ordering are validated

Reject:

- missing `evidencePageRanges`;
- empty evidence range list;
- non-integer page values;
- page numbers below 1;
- reversed ranges;
- unsorted ranges within the same batch;
- overlapping ranges within the same batch.

### 10.6 Existing 150 Questions completed metadata survives migration

Tests must assert that both current completed batches retain their IDs, `expectedProblemScope`, problem slugs, statuses, verification metadata, completion commits, and dates after replacing `startPage/endPage` with `evidencePageRanges`.

### 10.7 Public content does not expose source page bookkeeping

For the already-ingested Q1, Q2, Q4, and Q5 Problem records:

- public provenance must retain source/chapter/problem identity;
- frontmatter `sourceReference`, if retained, must not include `printed p.` or `printed pp.` page references;
- mathematical/financial content and solution structure must remain unchanged.

Knowledge content added from source-derived work must not require original source-page references.

## 11. Verification Gates

The completed infrastructure batch must pass:

```bash
npm run test
npm run check
npm run build
```

The final diff against `main` may contain:

- validator infrastructure;
- manifest migration;
- tests;
- repository-memory documentation;
- metadata-only cleanup of existing Problem provenance strings to remove page numbers.

It must contain no new source-derived Problem or Knowledge content and no substantive rewrite of existing solutions.

## 12. Expected Follow-up

After this infrastructure batch is merged, the next content work should return to the skipped source order rather than continuing to jump ahead.

Recommended sequence:

1. bounded content batch for Q3 using internal evidence pp.6–7;
2. bounded content batch for Q6 using internal evidence pp.9–10;
3. continue with subsequent First Look questions in small bounded batches.

Those internal evidence pages are for Agent verification only and should not be surfaced in the public Knowledge / Problem content.

Each follow-up remains a separate batch with its own ontology-first authoring and verification cycle.

## 13. Success Criteria

The infrastructure work is complete when:

- the canonical manifest schema separates `expectedProblemScope` from `evidencePageRanges`;
- overlapping evidence pages validate across different batches;
- duplicate problem ownership does not validate;
- the existing two completed 150 Questions batches migrate without loss of metadata;
- original source page numbers remain internal evidence rather than public Knowledge / Problem content;
- existing Q1, Q2, Q4, and Q5 provenance is normalized without altering substantive content;
- no new Problems or Knowledge nodes are introduced;
- Agent Protocol, Content Standard, and Handoff describe the new rule accurately;
- tests, Astro check, and site build pass;
- the branch diff is limited to this infrastructure concern and metadata-only provenance cleanup.
