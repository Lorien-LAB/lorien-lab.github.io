# Quant Interview — Current Handoff

Updated: 2026-08-17

## Current architecture state

**Stage A — Topic-first foundation: complete and integrated.**  
**Stage B — public Topic-first shell: complete and integrated.**  
**Stage C — existing-content source-neutral migration: complete and integrated.**  
**Stage D — bounded cross-book topic ingestion: active as the durable content workflow; four Linear Algebra workstreams are complete.**

The public system is Topic-first. Canonical Topics, Knowledge, techniques, and Problems are user-facing; book names, source item identifiers, page evidence, semantic-dedup provenance, and canonical-extension audit metadata remain internal.

## Stable architecture

- Public Quant Interview navigation is **Topic-first**.
- Books are internal evidence sources, not public categories.
- Canonical public Problems carry no source provenance in frontmatter, prose, routes, or source-shaped `problemId` values.
- `src/data/quant-interview/topics/taxonomy.json` defines the canonical topic taxonomy.
- `src/data/quant-interview/topics/source-topic-map.json` routes verified source structure into canonical topics.
- `src/data/quant-interview/workstreams/*.json` registers one bounded cross-book topic at a time.
- `src/data/quant-interview/coverage/*.json` is the **hidden coverage** and semantic-dedup ledger.
- `evidencePageRanges` is internal physical evidence only.
- Every inspected source item receives an explicit coverage state and nonempty resolution note before a workstream closes.
- Semantic identity is decided from the mathematical/financial task, not text similarity.
- A `knowledge-only` item is terminal only when its interview test remains publicly visible through `Interview Checks` or an equivalent self-test.
- Repository-authored **canonical extension** material is declared in the workstream record and never fabricated as source-derived coverage.
- Public pages and layouts do not depend on hidden coverage or workstream extension metadata.
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

Canonical outputs include:

- `correlation-matrix`
- `positive-semidefinite-matrix`
- `principal-minor-feasibility`
- `correlation-matrix-parameter-range`
- `covariance-matrix-positive-semidefinite-proof`
- `covariance-to-correlation-matrix`
- `equicorrelation-matrix-bounds`

The same parameterized correlation-matrix family remains **one canonical Problem**. Numerical changes and alternate methods are absorbed as `variant` / `merged-duplicate` material instead of creating source-specific pages.

The PSD/PD source discrepancy was reconciled mathematically: real symmetric PSD matrices require all principal minors to be nonnegative, while the standard positive-definite Sylvester criterion uses positive leading principal minors.

## Completed cross-book workstream 2

### Identity

`linear-algebra-determinants-eigenvalues-002`

Canonical scope:

- **Linear Algebra & Matrix Methods**
- **Determinants & Eigenvalues**

Content-complete verification:

- commit: `b070f6f9c318372dfcf0d942f3a67299a8e4a493`
- GitHub Actions run: `31948322741`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

Canonical Knowledge:

- `eigenvalues-eigenvectors`
- `matrix-spectral-invariants`
- `eigenbasis-decomposition`

Canonical Problems:

- `two-by-two-eigensystem`
- `apply-matrix-via-eigenbasis`
- `trace-ab-equals-trace-ba`
- `commutator-cannot-equal-identity`

Definitions and reusable spectral facts became `knowledge-only` where appropriate and remain visible through public self-tests; distinct reasoning tasks became source-neutral canonical Problems.

## Completed cross-book workstream 3

### Identity

`linear-algebra-matrix-decompositions-003`

Canonical scope:

- **Linear Algebra & Matrix Methods**
- **Matrix Decompositions**

Content-complete verification:

- commit: `970d2a1d82d9e54a2881411a424e3313bfd16b58`
- GitHub Actions run: `31952974738`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

Canonical Knowledge:

- `qr-decomposition`
- `lu-cholesky-decomposition`
- `singular-value-decomposition`
- enriched `eigenbasis-decomposition`

Canonical Problems:

- `least-squares-via-qr`
- `matrix-square-root-and-cholesky-factor`
- `generate-correlated-gaussians`

The directly related Red and 150 Questions matrix-square-root tasks resolve to **one canonical Problem**. The second source task is retained as a meaningful `variant`, not a duplicate public page.

## Completed cross-book workstream 4

### Identity

`linear-algebra-vectors-linear-systems-004`

Canonical scope:

- **Linear Algebra & Matrix Methods**
- **Vectors & Linear Systems**

This workstream used the explicitly approved **Source + canonical extension** model. Source-derived coverage remained strict, while standard rank/null-space/linear-system material was added as repository-authored canonical extension content without inventing source provenance.

Content-complete verification:

- commit: `d9bed1bb89de8ce81ae89971ce3fd31fdbe49343`
- GitHub Actions run: `31962131820`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

The machine-readable workstream record is `status: complete` and stores the same real verification evidence.

### Canonical extension audit boundary

The workstream declares exactly these repository-authored extensions:

- `inner-product-projection-core`
- `span-basis-rank-nullity`
- `linear-system-consistency-rref`

They are internal provenance/audit declarations only. They are not displayed publicly and do not create fake source coverage rows.

### Canonical Knowledge

`vector-geometry-inner-products`

- vector coordinates and dot products;
- Euclidean norm, distance, angle, and orthogonality;
- Cauchy-Schwarz and projection geometry as canonical extensions;
- correlation-as-cosine and Gram-matrix intuition;
- public `Interview Checks`.

`linear-independence-span-basis-rank`

- linear combinations, span, independence, basis, and dimension;
- row/column spaces, rank, null space, pivot columns;
- full-row versus full-column rank;
- rank-nullity and dimension constraints;
- public `Interview Checks`.

`linear-systems-consistency`

- `Ax=b`, augmented matrices, Gaussian elimination, RREF, pivots, and free variables;
- `rank(A)=rank([A|b])` consistency criterion;
- unique / infinite / no-solution classification;
- homogeneous null-space structure and `x_p + N(A)`;
- links to QR/LU/SVD without duplicating decomposition algorithms;
- public `Interview Checks`.

### Canonical Problems

`product-of-row-stochastic-matrices`

- source-derived reasoning identity;
- recognizes row sums through the all-ones vector invariant `M1=1`;
- proves `(AB)1=A(B1)=1`;
- separately preserves entrywise nonnegativity;
- remains independently written and source-neutral.

`rank-and-consistency-of-linear-system`

- repository-authored canonical extension Problem with **no source coverage row**;
- classifies a parameterized 3-by-3 system into unique, inconsistent, and infinite-solution regimes;
- uses row dependence, RREF, coefficient/augmented ranks, and rank-nullity;
- explains why a zero determinant alone cannot distinguish no solution from infinitely many solutions.

### Existing canonical-family enrichment and provenance correction

The Green geometric correlation item with two fixed correlations `0.8` and `0.8` was confirmed to belong physically to the **Vectors** section rather than the previously recorded PSD section. Hidden provenance was corrected from `3.6.4` to `3.6.1`.

Its mathematical identity did not change: it remains a `variant` of `correlation-matrix-parameter-range`. The existing public Problem was enriched with the unit-vector / angle derivation `cos(2 theta)=2(0.8)^2-1=0.28`; no duplicate correlation Problem was created.

### Source audit result

- Green contributes the actual vector geometry, correlation-as-cosine bridge, and geometric correlation variant.
- 150 Questions contributes the row-stochastic closure Problem.
- Red was explicitly reviewed and records `no-new-direct-item`; matrix items encountered there were already owned by prior PSD/decomposition workstreams.
- All inspected source rows are terminal in hidden coverage with real canonical targets and nonempty resolution notes.
- Canonical extension Knowledge and the extension Problem do not masquerade as source-derived material.

## Linear Algebra canonical-topic state

The taxonomy has **five child topics** under **Linear Algebra & Matrix Methods**:

1. Vectors & Linear Systems
2. Determinants & Eigenvalues
3. Positive Semidefinite Matrices
4. Covariance & Correlation Matrices
5. Matrix Decompositions

All five now have bounded cross-book canonical coverage through the four completed workstreams above. This does **not** claim whole-book completeness or exhaustive textbook coverage; it means the current canonical Linear Algebra taxonomy has no untouched child topic.

## Public corpus state after the four workstreams

The Quant Interview source-neutral regression contract currently covers **18 canonical Problems** and **21 explicitly topic-classified Knowledge / Technique nodes**.

These are current repository-record counts only. They are not whole-book completeness percentages.

## Verified source state

All three source files remain edition-pinned and source-file-verified. Source-file verification is not whole-book Knowledge/Problem coverage.

- Green Book: First Edition (2008), ISBN-13 `9781438236667`, overall coverage incomplete.
- Red Book: Version 1.01 (2008), ISBN-13 `9781438217031`, overall coverage incomplete.
- 150 Questions: First edition (2013), ISBN-13 `9780979757648`, overall cross-book reconciliation incomplete.

## Next action

Continue with the next bounded **cross-book** workstream in the next major taxonomy area:

**Probability & Statistics → Probability Foundations.**

Treat all three verified sources as one evidence pool. Resolve the mapped Probability Foundations material before authoring, inventory each meaningful source item, perform semantic deduplication against the existing corpus, update/create canonical Knowledge first, create only genuinely distinct Problems, preserve conceptual source questions through public `Interview Checks`, and close hidden coverage only after all canonical targets exist and the repository gates pass.

Do not process one book to completion before the others, do not organize the public corpus by source question numbering, and do not silently broaden the bounded Probability Foundations workstream into combinatorial probability, conditional probability/Bayes, distributions, expectation/variance, or order statistics.

## Non-negotiable invariants

- Repository state wins over conversational memory.
- Process one bounded canonical topic workstream at a time.
- Review all relevant verified-source material before closing a topic workstream; a source with no new direct item still receives an explicit audit conclusion.
- Semantic deduplication is mandatory; text similarity alone cannot merge Problems.
- Every inspected source item receives an explicit hidden coverage state and resolution note.
- `knowledge-only` is terminal only when the public self-test remains visible.
- Repository-authored canonical extensions never generate fabricated source provenance.
- No duplicate Concept/Technique merely because another source uses a synonym.
- Canonical public Problems remain source-neutral in frontmatter, prose, routes, and public IDs.
- Source book names, source item numbers, source page numbers, and audit-only extension metadata remain internal.
- No unsupported whole-book completeness percentages.
- No merge before `npm run test`, `npm run check`, and `npm run build` pass.

## Verification gates

```bash
npm run test
npm run check
npm run build
```

Also review the topic-only diff against `chatgpt/quant-interview-topic-first-fusion-design-2026-08-16` before integration.
