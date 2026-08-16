# Quant Interview — Current Handoff

Updated: 2026-08-16

## Current architecture state

**Stage A — Topic-first foundation: complete and integrated.**  
**Stage B — public Topic-first shell: complete and integrated.**  
**Stage C — existing-content source-neutral migration: complete and integrated.**  
**Stage D — bounded cross-book topic ingestion: active as the durable content workflow; the first two Linear Algebra workstreams are complete.**

The public system is now Topic-first. Canonical Topics, Knowledge, techniques, and Problems are user-facing; book names, source question identifiers, page evidence, and dedup provenance remain hidden ingestion/audit data.

## Stable architecture

- Public Quant Interview navigation is **Topic-first**.
- Books are internal evidence sources, not public categories.
- Canonical public Problems carry no source provenance in frontmatter, rendered prose, or source-shaped `problemId` values.
- `src/data/quant-interview/topics/taxonomy.json` defines the canonical topic taxonomy.
- `src/data/quant-interview/topics/source-topic-map.json` routes verified source structure into canonical topics.
- `src/data/quant-interview/workstreams/*.json` registers one bounded cross-book topic at a time.
- `src/data/quant-interview/coverage/*.json` is the hidden coverage and semantic-dedup ledger.
- `evidencePageRanges` is private physical evidence and may overlap across distinct semantic workstreams.
- Every inspected source item receives an explicit coverage state.
- Semantic identity is decided from the mathematical/financial task, not text similarity.
- A `knowledge-only` item is terminal only when its interview test remains publicly visible through `Interview Checks` or an equivalent self-test.
- Public pages do not import hidden coverage data.
- No source PDF/scan or copied answer key is committed to the public repository.

## Completed cross-book workstream 1

### Identity

`linear-algebra-covariance-correlation-psd-001`

Canonical scope:

- **Linear Algebra & Matrix Methods**
- **Covariance & Correlation Matrices**
- **Positive Semidefinite Matrices**

Content-complete verification:

- commit: `fb8664b85ac1ea6a0d1d5145ce32143e0455a288`
- GitHub Actions run: `31946376343`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

### Canonical outputs

Enriched Knowledge:

- `correlation-matrix`
- `positive-semidefinite-matrix`
- `principal-minor-feasibility`

Canonical Problems represented by this workstream:

- enriched `correlation-matrix-parameter-range`
- new `covariance-matrix-positive-semidefinite-proof`
- new `covariance-to-correlation-matrix`
- new `equicorrelation-matrix-bounds`

The same parameterized correlation-matrix family appeared in multiple source forms. It remains one public Problem. Useful numerical changes and alternate methods were absorbed as variants/extensions rather than creating duplicate pages.

The hidden coverage ledger uses `knowledge-only`, `variant`, `merged-duplicate`, and `canonical-problem` states as appropriate. All terminal canonical references resolve to real repository slugs.

A source discrepancy around positive semidefinite versus positive definite criteria was reconciled mathematically: for real symmetric PSD matrices all principal minors must be nonnegative, while the standard Sylvester criterion for positive definiteness uses positive leading principal minors.

## Completed cross-book workstream 2

### Identity

`linear-algebra-determinants-eigenvalues-002`

Canonical scope:

- **Linear Algebra & Matrix Methods**
- **Determinants & Eigenvalues**

All three verified sources were explicitly reviewed in the same topic context. Green and 150 Questions contributed direct material. Red was also inspected and is recorded as `no-new-direct-item` for this bounded topic: its 6.9 positive-definite material was already reconciled in the completed PSD workstream, while Red 6.10 is a matrix-square-root / Cholesky problem and is intentionally deferred to **Matrix Decompositions** rather than being forced into the determinant/eigenvalue corpus.

Content-complete verification:

- commit: `b070f6f9c318372dfcf0d942f3a67299a8e4a493`
- GitHub Actions run: `31948322741`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

The machine-readable workstream record is `status: complete` and stores the same real verification evidence.

### Canonical Knowledge

`eigenvalues-eigenvectors`

- `Ax = lambda x` and the characteristic polynomial;
- algebraic versus geometric multiplicity;
- distinct-eigenvalue linear independence;
- the fact that real matrices need not have all-real eigenvalues;
- diagonalizability and defective matrices;
- symmetric-matrix spectral theorem connections;
- public `Interview Checks`, including the source conceptual question about how many eigenvalues/eigenvectors a matrix may have.

`matrix-spectral-invariants`

- determinant identities and singularity;
- `det(A)` as the product of eigenvalues;
- trace as the sum of eigenvalues;
- similarity invariance;
- cyclic trace, including `tr(AB)=tr(BA)`;
- commutators having trace zero;
- invariant-first recognition before entrywise algebra;
- public `Interview Checks`.

`eigenbasis-decomposition`

- decomposing `v` into an eigenbasis;
- evaluating `Av`, `A^k v`, and polynomial matrix actions by scalar operations;
- diagonalization interpretation;
- defective-matrix boundary;
- public `Interview Checks`.

### Canonical Problems

`two-by-two-eigensystem`

- solves `[[2,1],[1,2]]` by symmetry and by the characteristic polynomial;
- obtains eigenvalues `3` and `1` with eigendirections `(1,1)` and `(1,-1)`;
- uses trace and determinant as a spectral cross-check.

`apply-matrix-via-eigenbasis`

- uses the supplied eigenpairs rather than reconstructing the matrix;
- decomposes the target vector as `v=2v_1-v_2`;
- obtains `Av=(1,17)`;
- extends directly to `A^k v` and matrix polynomials.

`trace-ab-equals-trace-ba`

- proves cyclicity by an index argument;
- works for compatible rectangular matrices when both products are square;
- adds the square-matrix spectral/characteristic-polynomial viewpoint;
- distinguishes cyclic rotation from arbitrary factor reordering.

`commutator-cannot-equal-identity`

- recognizes `AB-BA` as a commutator;
- uses `tr(AB-BA)=0` versus `tr(I_n)=n`;
- rules out the equation for finite-dimensional real/complex matrices without entrywise algebra;
- records the characteristic-zero assumption precisely.

All four are independently authored, source-neutral S3+ Problems with progressive hints, explanations, realistic mistakes, and extensions.

### Hidden coverage result

Nine directly inspected Green/150 semantic units are terminal in hidden coverage. Definitions, determinant/eigenvalue facts, trace/determinant spectral relations, and diagonalization material became `knowledge-only` and remain visible through public self-tests. Distinct reasoning tasks became canonical Problems.

No book-named or source-number-named duplicate public Problem was created. Real Problem/Knowledge slug resolution is validated with unresolved canonical references disallowed.

## Public corpus state after the two workstreams

The Quant Interview public corpus currently includes **13 canonical Problems** covered by the source-neutral global contract. The new determinant/eigenvalue workstream increased the reusable interview Knowledge/Technique set to **15 explicitly topic-classified nodes** covered by the same contract.

These counts describe current repository records only; they are not claims of whole-book completion.

## Verified source state

All three files remain edition-pinned and source-file-verified. Source-file verification is not whole-book Knowledge/Problem coverage.

- Green Book: First Edition (2008), ISBN-13 `9781438236667`, 213 PDF pages, overall coverage incomplete.
- Red Book: Version 1.01 (2008), ISBN-13 `9781438217031`, 329 PDF pages, overall coverage incomplete.
- 150 Questions: First edition (2013), ISBN-13 `9780979757648`, 220 PDF pages, overall cross-book reconciliation incomplete.

## Next action

Continue with the next bounded **cross-book** workstream while staying inside the same major topic for context continuity:

**Linear Algebra & Matrix Methods → Matrix Decompositions.**

Treat all verified sources as one evidence pool for this canonical subtopic. Resolve the mapped material first, inventory each meaningful source item, perform semantic deduplication, update/create canonical Knowledge before Problems, and close hidden coverage only after the canonical targets exist and pass repository verification.

This workstream should cover the decomposition cluster that was deliberately deferred from earlier work, including QR-style orthogonal factorization, LU structure, Cholesky / positive-definite factorization, and matrix-square-root reasoning where supported by the verified source material. Do not process one book to completion before the others and do not organize the public corpus by original source question numbers.

## Non-negotiable invariants

- Repository state wins over conversational memory.
- Process one bounded canonical topic workstream at a time.
- All relevant verified-source material must be considered before closing a topic workstream; a source with no new direct item still receives an explicit audit conclusion.
- Semantic deduplication is mandatory; text similarity alone cannot merge Problems.
- Every inspected source item must receive an explicit coverage-ledger state.
- `knowledge-only` is terminal only when the public self-test remains visible.
- No duplicate Concept/Technique merely because another source uses a synonym.
- No answer-only entry may be treated as finished reviewed content.
- Canonical public Problems remain source-neutral in frontmatter, prose, and public IDs.
- Source book names, source item numbers, and source page numbers remain internal evidence only.
- No unsupported whole-book completeness percentages.
- No merge before `npm run test`, `npm run check`, and `npm run build` pass.

## Verification gates

```bash
npm run test
npm run check
npm run build
```

Also review the topic-only diff against `chatgpt/quant-interview-topic-first-fusion-design-2026-08-16` before merging.
