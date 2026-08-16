# Quant Interview — Current Handoff

Updated: 2026-08-16

## Current architecture state

**Stage A — Topic-first foundation: complete.**  
**Stage B — public Topic-first shell: complete.**  
**Stage C — existing-content source-neutral migration: complete and integrated into the Topic-first integration branch.**  
**Stage D — first bounded cross-book topic workstream: complete on the current Stage D branch; final integration remains gated by the repository verification suite.**

The public system is now operating on the intended architecture: canonical Topics, Knowledge, techniques, and Problems are the user-facing model, while books, source question identifiers, and source page evidence remain hidden ingestion/audit data.

## Stable architecture

- Public Quant Interview navigation is **Topic-first**.
- Public Knowledge contains reusable canonical concepts and Problem Solving Techniques.
- Public Problems are canonical first-class practice records under `src/content/problems/`.
- Canonical public Problems carry no book/source provenance in frontmatter or rendered content.
- Public `problemId` values must also be source-neutral; source-shaped identifiers are not acceptable merely because the explicit source fields are hidden.
- Books are internal evidence sources, not the public hierarchy.
- `src/data/quant-interview/topics/taxonomy.json` defines the canonical topic taxonomy.
- `src/data/quant-interview/topics/source-topic-map.json` routes verified TOC nodes into canonical topics or explicit non-content/container roles.
- The source-topic map contains **281 explicit source-TOC routing entries**.
- `src/data/quant-interview/workstreams/*.json` registers bounded cross-book workstreams and their private evidence scopes.
- `src/data/quant-interview/coverage/*.json` is the hidden coverage / semantic-dedup ledger.
- Section-level coverage remains aligned with the source-topic map. Item-level coverage may refine a coarse editorial section; a cross-TOC refinement requires an explicit `topicOverrideReason`.
- `evidencePageRanges` is private physical-page evidence and may overlap across distinct semantic items/workstreams.
- Every inspected source item must resolve to an explicit coverage state; nothing disappears because it looked similar to another question.
- A `knowledge-only` item is terminal only after its pedagogical test remains publicly visible through `Interview Checks` or an equivalent self-test.
- Public pages do not import hidden coverage data.
- No source PDF/scan is committed to the public repository.

## Stage C baseline retained

Before the first cross-book fusion workstream, six canonical Problems had already been migrated to source-neutral topic-oriented records:

- `put-quotes-zero-cost-static-portfolio`
- `missing-digit-power-of-two`
- `ants-crossing-line`
- `correlation-matrix-parameter-range`
- `conditional-dice-expectation`
- `random-walk-boundary`

Twelve reusable interview Knowledge / technique nodes already carried canonical topic assignments, including the three nodes used as the starting ontology for the first Stage D workstream:

- `correlation-matrix`
- `positive-semidefinite-matrix`
- `principal-minor-feasibility`

Stage D preserved the canonical routes/slugs and enriched these records rather than creating book-specific alternatives.

## Stage D completed workstream

### Workstream identity

`linear-algebra-covariance-correlation-psd-001`

Canonical scope:

- **Linear Algebra & Matrix Methods**
- **Covariance & Correlation Matrices**
- **Positive Semidefinite Matrices**

All three verified source files were inspected within one topic context before semantic decisions were finalized. Evidence pages and original source-item identifiers remain internal-only in the workstream registration and coverage ledgers.

The content-complete Stage D tree at commit `fb8664b85ac1ea6a0d1d5145ce32143e0455a288` passed `npm run test`, `npm run check`, and `npm run build` in GitHub Actions run `31946376343`.

The machine-readable workstream record is now `status: complete` and stores this verification evidence.

### Canonical Knowledge fusion

The existing Knowledge nodes were expanded into fused, source-neutral explanations.

#### `correlation-matrix`

Now includes:

- covariance and correlation definitions;
- covariance-to-correlation normalization both elementwise and as `D^{-1/2} Sigma D^{-1/2}`;
- preservation of PSD under the diagonal congruence transform;
- the zero-variance / zero-standard-deviation boundary where ordinary correlation is undefined;
- the fact that pairwise values in `[-1,1]` do not guarantee joint consistency;
- equicorrelation structure and its two eigenvalue families;
- singular boundary interpretation;
- visible `Interview Checks` for conceptual source items absorbed as `knowledge-only`.

#### `positive-semidefinite-matrix`

Now includes:

- quadratic-form, eigenvalue, Gram, and principal-minor views of PSD;
- the covariance identity `a^T Sigma a = Var(a^T X) >= 0`;
- the exact distinction between covariance PSD and strict positive definiteness;
- zero-variance linear combinations / exact dependence as the singular case;
- the correct distinction between **positive semidefinite** and **leading principal minors**: PSD requires all principal minors to be nonnegative, whereas the positive-definite Sylvester criterion uses positive leading principal minors;
- visible `Interview Checks`.

#### `principal-minor-feasibility`

Now distinguishes principal minors from leading principal minors and gives a reusable small-matrix workflow, together with Schur-complement, quadratic-form, and eigenvalue alternatives.

### Canonical Problems after fusion

The public Problem Bank now has nine current canonical interview Problems. This workstream contributed three genuinely distinct new Problems and enriched one existing Problem.

#### Enriched existing Problem

`correlation-matrix-parameter-range`

The same 3-variable correlation-feasibility family appeared in multiple source forms. It remains **one** public Problem. The canonical page now contains:

- the existing exact interval `-0.9432 <= rho <= 0.5832`;
- principal-minor and Schur-complement solutions;
- a third completed-square family formula
  `|rho-ab| <= sqrt((1-a^2)(1-b^2))`;
- a meaningful variant with two fixed correlations equal to `0.8`, giving `0.28 <= rho <= 1`;
- a joint-inconsistency variant with proposed correlations `0.9`, `0.8`, `0.1`, whose determinant is `-0.316`.

No book-specific duplicate page was created.

#### New canonical Problems

`covariance-matrix-positive-semidefinite-proof`

- proves covariance matrices are PSD from the variance of arbitrary linear combinations;
- gives an outer-product proof as a second method;
- characterizes when the covariance matrix is strictly PD rather than singular.

`covariance-to-correlation-matrix`

- performs an explicit diagonal normalization;
- derives the matrix congruence form;
- explains PSD preservation;
- handles the zero-variance degeneracy explicitly.

`equicorrelation-matrix-bounds`

- uses `R=(1-rho)I+rho 11^T`;
- derives eigenvalues `1-rho` with multiplicity `n-1` and `1+(n-1)rho` with multiplicity `1`;
- obtains the exact bound `-1/(n-1) <= rho <= 1`;
- explains singular/rank behavior at both endpoints.

All are independently authored, S3+ solved records with progressive hints, reasoning, Common Mistakes, and Extensions.

### Semantic dedup / hidden coverage result

Every inspected in-scope source item has a terminal hidden coverage decision and a `resolutionNote`.

The workstream uses all three key semantic outcomes rather than treating every source question as a new page:

- `knowledge-only`: definitions / matrix criteria enrich canonical Knowledge and remain visible through `Interview Checks`;
- `variant`: same canonical reasoning identity, but a useful numerical or conceptual variation is retained inside the canonical Problem;
- `merged-duplicate`: a repeated problem contributes useful methods/insight but creates no second public Problem;
- `canonical-problem`: a genuinely distinct reasoning identity receives one canonical page.

All canonical Problem/Knowledge references in the three ledgers resolve against the real repository with unresolved targets disallowed for this completed workstream.

### Source reconciliation notes

The sources are evidence, not unquestioned public truth. Two discrepancies were explicitly reconciled rather than silently copied:

- one source section combines a correct quadratic-form PSD definition with an overbroad leading-principal-minor statement. Canonical Knowledge uses the mathematically correct rule: **positive semidefinite** matrices require all principal minors to be nonnegative; positive leading principal minors are the symmetric positive-definite Sylvester criterion;
- another source question asks for positive definiteness of a covariance matrix, while its solution correctly recognizes that covariance matrices are guaranteed only positive semidefinite. The canonical Problem states and proves the PSD result, then separately characterizes strict PD.

Both reconciliations are recorded internally in coverage `resolutionNote` fields.

### Source-neutrality cleanup discovered during Stage D

Because `problemId` is rendered publicly, three older source-shaped IDs still leaked prior source ordering even after explicit provenance fields had been removed. They were replaced with canonical IDs:

- `put-quotes-zero-cost-static-portfolio` → `derivatives-static-arbitrage-001`
- `missing-digit-power-of-two` → `logic-modular-arithmetic-001`
- `ants-crossing-line` → `logic-invariance-001`

`correlation-matrix-parameter-range` now uses `linear-algebra-correlation-001`.

The public route slugs did not change, and hidden provenance remains intact.

## Verified source state

All three files remain edition-pinned and source-file-verified. This still does **not** imply whole-book problem completeness.

### Green Book

- edition: First Edition (2008)
- ISBN-13: `9781438236667`
- source file size: 213 PDF pages
- ingestion state: `manifest-ready`
- overall canonical coverage: incomplete; only explicitly completed topic items are terminal

### Red Book

- edition/version: Version 1.01 (2008)
- ISBN-13: `9781438217031`
- source file size: 329 PDF pages
- ingestion state: `manifest-ready`
- overall canonical coverage: incomplete; only explicitly completed topic items are terminal

### 150 Questions

- edition: First edition (2013)
- ISBN-13: `9780979757648`
- source file size: 220 PDF pages
- ingestion state: `ingesting`
- overall cross-book reconciliation: incomplete

Source-file verification must never be confused with complete Knowledge/Problem coverage.

## Next action

Continue with the next bounded **cross-book** workstream inside the same major area to preserve context continuity:

**Linear Algebra & Matrix Methods → Determinants & Eigenvalues.**

For that workstream, resolve all mapped material from every verified source before authoring, inventory the individual source items, perform semantic deduplication against the existing canonical Knowledge/Problems, update Knowledge first, create only genuinely distinct canonical Problems, and close every inspected hidden coverage row.

Do not switch to a book-by-book sequence and do not organize the next task by original question numbers.

## Non-negotiable invariants

- Repository state wins over conversational memory.
- Process one bounded canonical topic workstream at a time.
- All relevant verified-source material must be considered before closing a topic workstream.
- Semantic deduplication is mandatory; text similarity alone cannot merge Problems.
- Every inspected source item must receive an explicit coverage-ledger state.
- `knowledge-only` is terminal only when the public self-test remains visible.
- No duplicate Concept/Technique merely because another source uses a synonym.
- No answer-only entry may be treated as finished reviewed content.
- No copied answer key, large verbatim source passage, or source PDF/scan is public.
- Canonical public Problems do not carry source provenance in frontmatter, rendered content, or source-shaped public IDs.
- Source book names, question numbers, and page numbers remain internal evidence only.
- No unsupported whole-book completeness percentages.
- No merge before verification gates pass.

## Verification gates

```bash
npm run test
npm run check
npm run build
```

Also review the Stage D topic-only diff against the Topic-first integration branch before merging.
