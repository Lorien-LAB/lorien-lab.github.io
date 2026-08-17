# Quant Interview — Current Handoff

Updated: 2026-08-17

## Current architecture state

**Stage A — Topic-first foundation: complete and integrated.**  
**Stage B — public Topic-first shell: complete and integrated.**  
**Stage C — existing-content source-neutral migration: complete and integrated.**  
**Stage D — bounded cross-book topic ingestion: active as the durable content workflow; four Linear Algebra workstreams and the first Probability & Statistics workstream are complete.**

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
- Every claimed source item receives an explicit coverage state and nonempty resolution note before a workstream closes.
- `knowledge-only` is terminal only when its interview test remains publicly visible through `Interview Checks` or an equivalent self-test.
- Repository-authored **canonical extension** material is declared separately and never fabricated as source-derived coverage.
- Public pages and layouts do not depend on hidden coverage or workstream extension metadata.
- No source PDF/scan or copied answer key is committed to the public repository.

## Completed cross-book workstream 1

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

The same parameterized correlation-matrix family remains **one canonical Problem**; useful numerical and method changes are stored as `variant` / `merged-duplicate` material instead of source-specific pages.

## Completed cross-book workstream 2

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

Definitions and reusable spectral facts became `knowledge-only` where appropriate and remain visible through public self-tests.

## Completed cross-book workstream 3

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

The directly related matrix-square-root source tasks resolve to **one canonical Problem**; the second task is retained as a meaningful `variant`.

## Completed cross-book workstream 4

`linear-algebra-vectors-linear-systems-004`

Canonical scope:

- **Linear Algebra & Matrix Methods**
- **Vectors & Linear Systems**

This workstream uses the approved **Source + canonical extension** model. Source-derived coverage is strict, while rank/null-space/linear-system additions are repository-authored extension content with separate provenance.

Content-complete verification:

- commit: `d9bed1bb89de8ce81ae89971ce3fd31fdbe49343`
- GitHub Actions run: `31962131820`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

Canonical Knowledge:

- `vector-geometry-inner-products`
- `linear-independence-span-basis-rank`
- `linear-systems-consistency`

Canonical Problems:

- `product-of-row-stochastic-matrices`
- `rank-and-consistency-of-linear-system`

The workstream also corrected the hidden Green provenance of the geometric correlation variant from section `3.6.4` to its actual Vectors section `3.6.1` while preserving the existing `correlation-matrix-parameter-range` canonical identity.

## Linear Algebra canonical-topic state

The taxonomy has **five child topics** under **Linear Algebra & Matrix Methods**:

1. Vectors & Linear Systems
2. Determinants & Eigenvalues
3. Positive Semidefinite Matrices
4. Covariance & Correlation Matrices
5. Matrix Decompositions

All five have bounded cross-book canonical coverage through the four completed workstreams above. This is not a whole-book or exhaustive-textbook completeness claim.

## Completed cross-book workstream 5

`probability-statistics-probability-foundations-005`

Canonical scope:

- **Probability & Statistics**
- **Probability Foundations**

This workstream uses **Source + narrow canonical extension**. Actual source-derived event language and interview tasks remain in hidden coverage, while the repository-authored axiomatic layer is tracked separately through `canonicalExtensions` and never presented as source provenance.

Content-complete verification:

- commit: `a35de3269d3d8ecb3e9c9227e52e4203797f556b`
- GitHub Actions run: `31992298949`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

The machine-readable workstream is `status: complete` and stores this same real verification evidence.

### Canonical extension audit boundary

The workstream declares exactly:

- `kolmogorov-probability-axioms`
- `derived-event-probability-rules`
- `mutual-exclusivity-vs-independence`

These are audit-only extension declarations. A source row may point to a mixed Knowledge node only for the subset the source genuinely contributes; extension-only claims are never backfilled as source-derived evidence.

### Canonical Knowledge

- `probability-spaces-events` — outcomes, sample spaces, events, set operations, mutually exclusive events, and indicators, with public `Interview Checks`.
- `probability-axioms-derived-rules` — axioms, complement/addition/monotonicity/De Morgan rules, and the explicit distinction between mutual exclusivity and independence.
- `symmetry-equiprobability-geometric-probability` — finite equiprobable modeling, tie-aware symmetry, and continuous uniform geometric probability, with public `Interview Checks`.

`conditioning` remains owned by **Conditional Probability & Bayes** and was not duplicated into Foundations.

### Canonical Problems

- `more-heads-with-one-extra-coin`
- `higher-card-by-symmetry`
- `drunk-passenger-last-seat`
- `random-points-in-a-semicircle`
- `minimum-trials-for-at-least-one-hit`
- `romeo-juliet-meeting-probability`

Each is independently written, source-neutral, solved, and S3+.

### Cross-book semantic deduplication

Three duplicate families resolve to one public canonical Problem each:

- the extra-coin comparison from Green plus the 150 Brainteasers version → `more-heads-with-one-extra-coin`;
- the two-card rank comparison from Green plus the Red version → `higher-card-by-symmetry`;
- the displaced-passenger variants from Green and Red → `drunk-passenger-last-seat`.

The secondary source rows are `merged-duplicate`, not duplicate public pages.

### Item-level source ownership and provenance

- Green contributes the event/set definitions plus the four direct Foundations problem families.
- Red's broad General probability container was reviewed item-by-item. Only the weekday modeling check, card comparison, meeting-time geometry, and displaced-passenger task are claimed here; adjacent counting, distributions, expectation, order-statistic, CLT, and stochastic-process material remains for later canonical topics.
- The Red weekday task is `knowledge-only` and remains visible as an Interview Check instead of becoming a low-value standalone Problem.
- 150 First Look Q6 contributes `minimum-trials-for-at-least-one-hit` and specifically supports complement-event plus repeated-independence reasoning. Its resolution note explicitly states that it **does not source the repository-authored Kolmogorov-axiom extension**.
- 150 `2.7::3` uses an explicit **item-level topic override**: although its editorial container is Brainteasers, its mathematical identity is Probability Foundations and it merges into `more-heads-with-one-extra-coin`.
- The formal 150 Probability/Stochastic Calculus material inspected at the boundary is not falsely closed as Foundations coverage; its distributions, moments, LLN/CLT, and stochastic-calculus content remains for later bounded workstreams.

All eleven claimed Foundations source rows are terminal in hidden coverage, have nonempty resolution notes, and resolve to real canonical targets.

## Public corpus state after five workstreams

The Quant Interview source-neutral regression contract currently covers **24 canonical Problems** and **24 explicitly topic-classified Knowledge / Technique nodes**.

These are current repository-record counts only. They are not whole-book completeness percentages and do not imply that Probability & Statistics as a whole is complete.

## Verified source state

All three source files remain edition-pinned and source-file-verified. Source-file verification is not whole-book Knowledge/Problem coverage.

- Green Book: First Edition (2008), ISBN-13 `9781438236667`, overall coverage incomplete.
- Red Book: Version 1.01 (2008), ISBN-13 `9781438217031`, overall coverage incomplete.
- 150 Questions: First edition (2013), ISBN-13 `9780979757648`, overall cross-book reconciliation incomplete.

## Next action

Continue with the next bounded **cross-book** workstream inside Probability & Statistics:

**Probability & Statistics → Combinatorial Probability.**

Treat all three verified sources as one evidence pool. Resolve the mapped combinatorial-probability material before authoring, inventory each meaningful source item, deduplicate by mathematical reasoning identity, update/create canonical Knowledge first, create only genuinely distinct Problems, and keep later conditional/Bayes, distributions, expectation/variance, and stochastic-process material outside the bounded scope.

Do not process one book to completion before the others, do not organize the public corpus by source question numbering, and do not use a generic deferred state to avoid semantic decisions.

## Non-negotiable invariants

- Repository state wins over conversational memory.
- Process one bounded canonical topic workstream at a time.
- Review all relevant verified-source material before closing a workstream; coarse source containers require item-level refinement when necessary.
- Semantic deduplication is mandatory; text similarity alone cannot merge Problems.
- Every claimed source item receives an explicit hidden coverage state and resolution note.
- `knowledge-only` is terminal only when the public self-test remains visible.
- Repository-authored canonical extensions never generate fabricated source provenance.
- Canonical public Problems remain source-neutral in frontmatter, prose, routes, and public IDs.
- Source book names, source item numbers, source page numbers, and audit-only extension metadata remain internal.
- No unsupported whole-book completeness percentages.
- No integration before `npm run test`, `npm run check`, and `npm run build` pass.

## Verification gates

```bash
npm run test
npm run check
npm run build
```

Also review the topic-only diff against `chatgpt/quant-interview-topic-first-fusion-design-2026-08-16` before integration.
