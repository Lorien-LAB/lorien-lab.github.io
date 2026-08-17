# Quant Interview — Current Handoff

Updated: 2026-08-17

## Current architecture state

**Stage A — Topic-first foundation: complete and integrated.**  
**Stage B — public Topic-first shell: complete and integrated.**  
**Stage C — existing-content source-neutral migration: complete and integrated.**  
**Stage D — bounded cross-book topic ingestion: active as the durable content workflow; four Linear Algebra workstreams and two Probability & Statistics workstreams are complete.**

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

- `probability-spaces-events`
- `probability-axioms-derived-rules`
- `symmetry-equiprobability-geometric-probability`

`conditioning` remains owned by **Conditional Probability & Bayes** and was not duplicated into Foundations.

### Canonical Problems

- `more-heads-with-one-extra-coin`
- `higher-card-by-symmetry`
- `drunk-passenger-last-seat`
- `random-points-in-a-semicircle`
- `minimum-trials-for-at-least-one-hit`
- `romeo-juliet-meeting-probability`

Each is independently written, source-neutral, solved, and S3+.

### Cross-book semantic deduplication and provenance

Three duplicate families resolve to one public canonical Problem each:

- the extra-coin comparison → `more-heads-with-one-extra-coin`;
- the two-card rank comparison → `higher-card-by-symmetry`;
- the displaced-passenger variants → `drunk-passenger-last-seat`.

The secondary source rows are `merged-duplicate`, not duplicate public pages. Red's broad General probability container was reviewed item-level, source-derived claims remain explicit in hidden coverage, and repository-authored canonical extension content remains separated from source provenance.

All eleven claimed Foundations source rows are terminal in hidden coverage, have nonempty resolution notes, and resolve to real canonical targets.

## Completed cross-book workstream 6

`probability-statistics-combinatorial-probability-006`

Canonical scope:

- **Probability & Statistics**
- **Combinatorial Probability**

Content-complete verification:

- commit: `cfb9609a36d281cb8da5906f9e0781c224cf3850`
- GitHub Actions run: `32002926175`
- commands: `npm run test`, `npm run check`, `npm run build`
- conclusion: success

The machine-readable workstream is `status: complete` and stores the same real verification evidence.

### Canonical Knowledge

- `counting-permutations-combinations` — product rule, factorials, ordered versus unordered selection, combinations, and binomial coefficients.
- `finite-combinatorial-probability-modeling` — equiprobable finite spaces, with/without replacement, complement counting, and relative-placement arguments; low-complexity matching-socks and two-aces tasks remain visible through `Interview Checks`.
- `inclusion-exclusion-derangements` — overlapping bad events, fixed points, inclusion–exclusion, and the derangement formula.

### Canonical Problems

- `poker-hand-probabilities`
- `top-two-meet-in-knockout-final`
- `five-letters-all-misaddressed`
- `birthday-collision-threshold`
- `no-consecutive-heads-in-n-tosses`
- `random-subsets-containment-probability`

All six are independently written, source-neutral, solved, and S3+.

### Cross-book semantic deduplication

The knockout-tournament material is **one canonical Problem**: the Green instance owns `top-two-meet-in-knockout-final`, while the Red instance is `merged-duplicate` hidden evidence for the same mathematical reasoning identity. Textual variation did not create a second public page.

### Item-level ownership and bounded exclusions

Exactly **10 claimed source rows** are terminal for this workstream: five Green rows, three Red rows, and two 150 Questions rows. Every row has a nonempty resolution note and resolves to real canonical Knowledge or Problem targets.

- Green section 4.2 was reviewed item-level rather than treated as homogeneous. Poker hands, tournament grouping, misaddressed letters, birthday collision, and reusable counting definitions are claimed here. Hopping Rabbit, Screwy Pirates II, 100th Digit, and Cubic of Integer are deliberately left to their actual recurrence/discrete, design, algebraic, or modular topics.
- Red Q3.19 merges into the same tournament Problem; Q3.20 and Q3.21 are `knowledge-only` and remain public through `Interview Checks`.
- 150 items `2.7::7` and `2.7::14` use explicit **item-level topic overrides** because their mathematical identity is Combinatorial Probability even though their editorial container is a broader brainteaser section.
- Conditional probability/Bayes, distributions, expectation/variance, order statistics, and stochastic-process material remain outside this bounded scope.

## Public corpus state after six workstreams

Before workstream 6, the regression contract recorded **24 canonical Problems** and **24 explicitly topic-classified Knowledge / Technique nodes**. That is retained here only as historical transition context.

After workstream 6, the current source-neutral regression contract covers **30 canonical Problems** and **27 explicitly topic-classified Knowledge / Technique nodes**.

These are repository-record counts, not whole-book completeness percentages and not a claim that Probability & Statistics as a whole is complete.

## Verified source state

All three source files remain edition-pinned and source-file-verified. Source-file verification is not whole-book Knowledge/Problem coverage.

- Green Book: First Edition (2008), ISBN-13 `9781438236667`, overall coverage incomplete.
- Red Book: Version 1.01 (2008), ISBN-13 `9781438217031`, overall coverage incomplete.
- 150 Questions: First edition (2013), ISBN-13 `9780979757648`, overall cross-book reconciliation incomplete.

## Next action

Most recently completed bounded topic: **Combinatorial Probability**.

The durable workflow remains cross-book and Topic-first: all three verified sources form one evidence pool; source numbering and book identity stay internal; public Knowledge and Problems remain canonical, source-neutral, semantically deduplicated, and bounded by the chosen mathematical topic rather than editorial chapter order.

Target workstream:

**Probability & Statistics → Conditional Probability & Bayes.**

Proceed by resolving the mapped conditional-probability material across all three verified sources before authoring, refining coarse containers item-level where needed, reusing the existing `conditioning` Knowledge node rather than duplicating it, and keeping random-variable/distribution, expectation/variance, order-statistic, and stochastic-process material outside the bounded scope.

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

Also review the topic-only diff against the preceding verified workstream branch before integration.
