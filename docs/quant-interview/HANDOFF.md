# Quant Interview — Current Handoff

Updated: 2026-08-16

## Current architecture state

**Stage A — Topic-first foundation: complete and integrated.**  
**Stage B — public Topic-first shell: complete and integrated.**  
**Stage C — existing-content source-neutral migration: complete and integrated.**  
**Stage D — bounded cross-book topic ingestion: active as the durable content workflow; the first three Linear Algebra workstreams are complete.**

The public system is Topic-first. Canonical Topics, Knowledge, techniques, and Problems are user-facing; book names, source item identifiers, page evidence, and semantic-dedup provenance remain hidden ingestion/audit data.

## Stable architecture

- Public Quant Interview navigation is **Topic-first**.
- Books are internal evidence sources, not public categories.
- Canonical public Problems carry no source provenance in frontmatter, prose, routes, or source-shaped `problemId` values.
- `src/data/quant-interview/topics/taxonomy.json` defines the canonical topic taxonomy.
- `src/data/quant-interview/topics/source-topic-map.json` routes verified source structure into canonical topics.
- `src/data/quant-interview/workstreams/*.json` registers one bounded cross-book topic at a time.
- `src/data/quant-interview/coverage/*.json` is the hidden coverage and semantic-dedup ledger.
- `evidencePageRanges` is internal physical evidence and may overlap across distinct semantic workstreams.
- Every inspected source item receives an explicit coverage state and a nonempty semantic-resolution note before a workstream closes.
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

Canonical outputs include:

- `correlation-matrix`
- `positive-semidefinite-matrix`
- `principal-minor-feasibility`
- `correlation-matrix-parameter-range`
- `covariance-matrix-positive-semidefinite-proof`
- `covariance-to-correlation-matrix`
- `equicorrelation-matrix-bounds`

The same parameterized correlation-matrix family remains one public Problem. Useful numerical changes and alternative methods were absorbed as `variant` / `merged-duplicate` material instead of creating book-specific duplicate pages.

The positive-semidefinite versus positive-definite source discrepancy was reconciled mathematically: real symmetric PSD matrices require all principal minors to be nonnegative, while the standard Sylvester criterion for positive definiteness uses positive leading principal minors.

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

Definitions, determinant/eigenvalue facts, trace/determinant spectral relations, and diagonalization material became `knowledge-only` where appropriate and remain visible through public self-tests. Distinct reasoning tasks became canonical Problems. No source-named duplicate page was created.

## Completed cross-book workstream 3

### Identity

`linear-algebra-matrix-decompositions-003`

Canonical scope:

- **Linear Algebra & Matrix Methods**
- **Matrix Decompositions**

All three verified sources were reviewed in one decomposition context before semantic decisions were closed. The workstream fused QR, LU, Cholesky, SVD, least squares, matrix square roots, Gram factors, and correlated-Gaussian generation without exposing the books as a public hierarchy.

Content-complete verification:

- commit: `970d2a1d82d9e54a2881411a424e3313bfd16b58`
- GitHub Actions run: `31952974738`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

The machine-readable workstream record is `status: complete` and stores the same verification evidence.

### Canonical Knowledge

`qr-decomposition`

- square, full, and thin/economy QR dimensions;
- orthogonality and projection geometry;
- direct least-squares reduction `R beta = Q^T y`;
- normal-equation conditioning loss;
- Gram-Schmidt versus Householder implementation perspective;
- positive-diagonal uniqueness convention;
- rank-deficient boundary with pivoted QR / SVD fallback;
- public `Interview Checks`.

`lu-cholesky-decomposition`

- Gaussian elimination and robust `PA=LU` framing;
- forward/backward triangular solves and determinant logic;
- lower `A=LL^T` and upper `A=R^TR` Cholesky conventions;
- SPD conditions and positive-diagonal Cholesky uniqueness;
- generic Gram-factor non-uniqueness under orthogonal transformations;
- covariance-factor interpretation and singular-PSD boundary;
- public `Interview Checks`.

`singular-value-decomposition`

- correct full and thin SVD dimensions for rectangular matrices;
- singular values through `A^T A` / `A A^T`;
- rank and null-space interpretation;
- Moore-Penrose pseudoinverse and minimum-norm least squares;
- QR versus SVD use cases;
- covariance square-root factors;
- public `Interview Checks`.

`eigenbasis-decomposition` was enriched rather than duplicated. It now also covers symmetric matrix functions, the principal PSD square root, uniqueness in the principal class, negative-eigenvalue boundaries, and the distinction between `M^2=A` and Gram/Cholesky factors.

### Canonical Problems

`least-squares-via-qr`

- solves an overdetermined system by thin QR without forming an inverse;
- derives `R beta = Q^T y`;
- verifies the residual is orthogonal to the design column space;
- contrasts direct QR with normal equations and their conditioning;
- extends to rank deficiency and SVD fallback.

`matrix-square-root-and-cholesky-factor`

- computes a principal spectral square root for a symmetric SPD matrix;
- computes a positive-diagonal triangular Cholesky factor;
- distinguishes a matrix square root from `C^T C` / `C C^T` factorization;
- distinguishes principal-root uniqueness, Cholesky uniqueness, and generic Gram-factor non-uniqueness;
- retains the second matrix as a meaningful `variant` inside the same canonical page.

The directly related Red and 150 Questions matrix-square-root tasks therefore resolve to **one canonical Problem**, not two source-specific pages.

`generate-correlated-gaussians`

- builds two correlated standard normals from independent shocks;
- verifies variances and covariance directly;
- generalizes to `x=mu+Lz` for `Sigma=LL^T`;
- keeps upper-Cholesky orientation consistent;
- uses spectral/SVD square-root factors for singular PSD covariance matrices;
- connects the construction to Monte Carlo simulation.

### Hidden coverage result

Eight directly inspected semantic units across Green, Red, and 150 Questions are terminal in hidden coverage. Reusable definitions are `knowledge-only`; distinct application/reasoning tasks are canonical Problems; the second matrix-square-root task is a `variant` targeting the same canonical Problem.

All terminal Problem/Knowledge references resolve to real repository slugs with unresolved canonical references disallowed. The three Knowledge-only decomposition targets visibly preserve their interview tests through `Interview Checks`.

## Public corpus state after the three workstreams

The Quant Interview source-neutral contract currently covers **16 canonical Problems** and **18 explicitly topic-classified Knowledge / Technique nodes**.

These are current repository-record counts only. They are not a claim of complete coverage of any source book or of Linear Algebra as a whole.

## Verified source state

All three source files remain edition-pinned and source-file-verified. Source-file verification is not whole-book Knowledge/Problem coverage.

- Green Book: First Edition (2008), ISBN-13 `9781438236667`, overall coverage incomplete.
- Red Book: Version 1.01 (2008), ISBN-13 `9781438217031`, overall coverage incomplete.
- 150 Questions: First edition (2013), ISBN-13 `9780979757648`, overall cross-book reconciliation incomplete.

## Next action

Continue with the next bounded **cross-book** workstream while remaining inside the same major area for context continuity:

**Linear Algebra & Matrix Methods → Vectors & Linear Systems.**

Treat the three verified sources as one evidence pool. Resolve all mapped material for this canonical subtopic before authoring, inventory each meaningful semantic item, deduplicate by reasoning identity, update/create canonical Knowledge first, create only genuinely distinct Problems, and close hidden coverage only after all real canonical targets resolve and the repository gates pass.

Do not process one book to completion before the others, and do not organize the public corpus by original source item numbers.

## Non-negotiable invariants

- Repository state wins over conversational memory.
- Process one bounded canonical topic workstream at a time.
- Review all relevant verified-source material before closing a topic workstream; a source with no new direct item still receives an explicit audit conclusion.
- Semantic deduplication is mandatory; text similarity alone cannot merge Problems.
- Every inspected source item receives an explicit coverage-ledger state and resolution note.
- `knowledge-only` is terminal only when the public self-test remains visible.
- No duplicate Concept/Technique merely because another source uses a synonym.
- No answer-only entry may be treated as finished reviewed content.
- Canonical public Problems remain source-neutral in frontmatter, prose, routes, and public IDs.
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
