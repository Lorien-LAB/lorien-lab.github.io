# Quant Interview Vectors & Linear Systems Cross-Book Workstream Design

Date: 2026-08-17
Status: approved design, implementation not started
Base architecture: Topic-first public corpus + hidden source provenance
Target branch: `chatgpt/quant-interview-workstream-vectors-linear-systems-2026-08-17`
Workstream id: `linear-algebra-vectors-linear-systems-004`

## 1. Purpose

Implement one bounded Topic-first Quant Interview workstream for:

- `linear-algebra-matrix-methods`
- `vectors-linear-systems`

This workstream follows the user-approved **Source + canonical extension** model.

The source layer remains strict: only material actually present in the verified user-supplied books may be represented as source-derived coverage. The canonical layer may add standard, stable undergraduate linear-algebra material needed to make the public `vectors-linear-systems` topic coherent and interview-useful, but those additions must be explicitly recorded as repository-authored canonical extensions rather than silently attributed to the books.

The public result remains source-neutral. Books, original item numbers, page evidence, and source-versus-extension provenance remain internal audit state.

## 2. Approved bounded approach

Three approaches were considered:

1. **Strict source-bounded** — publish only the new vector/stochastic-matrix material directly found in the three books.
2. **Source + canonical extension** — retain strict source provenance while filling the standard rank / basis / null-space / linear-system-consistency gap.
3. **Aggressive textbook expansion** — add a much broader linear-algebra curriculum including additional spaces, change of basis, iterative solvers, Jordan form, and related topics.

The user approved approach 2.

The implementation must therefore be deliberately balanced:

- source-derived content stays auditable;
- canonical gaps are filled only where they are central to the existing `vectors-linear-systems` taxonomy node;
- no extension may be backfilled into hidden coverage as if a book had supplied it;
- public content remains one coherent Topic-first system rather than displaying a visible source/extension split.

## 3. Non-goals

This workstream does **not**:

- process one source book sequentially;
- claim whole-book or whole-Linear-Algebra completeness;
- redesign the public Quant Interview UI;
- duplicate QR, LU, Cholesky, SVD, or eigenbasis explanations from completed workstreams;
- create a public Problem for every definition or mechanical calculation;
- introduce advanced linear algebra such as Jordan normal form, dual spaces, affine spaces, spectral-norm theory, Krylov methods, iterative linear solvers, or generalized inverses beyond cross-links to the existing SVD node;
- expose book names, source question numbers, source section numbers, or source page numbers on public Knowledge/Problem pages;
- create fake hidden coverage rows for repository-authored canonical extensions.

## 4. Source-derived evidence boundary

This section records only what the verified supplied files actually support.

### 4.1 Green Book — direct source material

The verified Green Book section `3.6.1` is titled **Vectors**.

Directly inspected material includes:

1. **Column-vector representation**
   - an `n x 1` column vector is presented as a one-dimensional array;
   - vectors are interpreted as coordinates of points in `R^n`.

2. **Inner / dot product**
   - for vectors `x,y in R^n`, the source defines the dot product as `x^T y = sum_i x_i y_i`.

3. **Euclidean norm and distance**
   - the Euclidean norm is given as `||x|| = sqrt(x^T x)`;
   - distance is written as `||x-y||`.

4. **Angle and orthogonality**
   - the angle satisfies `cos(theta) = x^T y / (||x|| ||y||)`;
   - orthogonality is identified by `x^T y = 0`.

5. **Correlation-as-cosine bridge**
   - the source explicitly interprets a correlation coefficient geometrically as a cosine / angle relation between standardized random-variable vectors.

6. **Geometric correlation-range problem**
   - the source gives a three-variable correlation problem in which two correlations are both `0.8`;
   - it obtains maximum correlation `1` and minimum correlation `0.28` geometrically through the angle representation.

The directly inspected Green evidence is on PDF pages 66-67 of the supplied file. PDF page 68 begins QR decomposition, so the `Ax=b` / QR material immediately after the vector section is outside the source-derived scope of this workstream and was already handled in the completed Matrix Decompositions workstream.

### 4.2 Green provenance correction required

The current hidden ledger already contains the `0.8 / 0.8` correlation-range semantic item, but it is recorded under `sourceSection: "3.6.4"`.

The supplied source page shows that this item physically belongs to the **Vectors** section `3.6.1`.

This workstream must correct that hidden source-section ownership without creating a new public Problem. The item remains semantically the same correlation-feasibility family already represented by `correlation-matrix-parameter-range`.

The corrected ledger row should therefore:

- use `sourceSection: "3.6.1"`;
- preserve its terminal canonical target `correlation-matrix-parameter-range`;
- record that the Green item contributes a geometric / Gram-vector interpretation to the existing canonical family;
- include `vectors-linear-systems` in its item-level topic classification while retaining any necessary cross-topic classification through an explicit `topicOverrideReason` rather than pretending the source section itself is a covariance/PSD section.

This is a repository provenance fix based on the supplied source, not a change to the source text.

### 4.3 Red Book — reviewed, no new direct vectors/linear-systems item

The Red Book Mathematics General material was reviewed for vector, basis, rank, and linear-system content.

The reviewed General Mathematics questions include topics such as limits, Fibonacci, Monte Carlo geometry, convexity, inflection points, positive-definite matrices, matrix square roots / `C^T C`, parity, analytic functions, Fourier transforms, Taylor approximation, integration, and Black-Scholes transformations.

The relevant matrix items already belong to earlier completed workstreams:

- positive-definite matrix material -> covariance / PSD workstream;
- matrix square root / `C^T C` -> Matrix Decompositions workstream.

The reviewed Top Ten Questions also contain no new direct `vectors-linear-systems` item.

Therefore the Red source must be retained in the new workstream record with an explicit:

- `reviewOutcome: "no-new-direct-item"`;
- nonempty review note explaining that the source was inspected rather than silently omitted.

No fake Red item-level coverage row should be created.

The source review evidence covers the General Mathematics question/solution region inspected in the supplied Red PDF and the Top Ten question list. These page references remain internal-only.

### 4.4 150 Questions — direct source material

Within the verified Linear Algebra question set, earlier workstreams have already reconciled items 1-8 and 10 into PSD/correlation, determinants/eigenvalues, and decomposition workstreams.

The remaining directly relevant item is the source's **probability matrix** closure question:

- a probability matrix is defined there as a matrix with nonnegative entries whose row entries sum to 1;
- the task asks to show that the product of two such matrices is again a probability matrix.

The supplied solution rewrites the row-sum condition using the all-ones column vector `1`:

`M 1 = 1`.

For two such matrices `A` and `B`, it uses:

`(AB)1 = A(B1) = A1 = 1`,

and separately observes that a product of nonnegative matrices has nonnegative entries.

The directly inspected question is on PDF page 30; the corresponding solution is on PDF pages 79-80 of the supplied file.

### 4.5 Source boundary summary

The source-derived contribution of this workstream is therefore intentionally small and precise:

- Green: vector geometry + correlation-as-cosine + one already-canonicalized geometric correlation variant;
- Red: audited `no-new-direct-item`;
- 150 Questions: row-stochastic / probability-matrix closure under multiplication.

Rank, null space, basis, RREF, and general linear-system consistency are **not** claimed as source-derived from these inspected materials in this workstream.

## 5. Canonical extension boundary

The user explicitly approved adding standard canonical material beyond the source evidence so that `vectors-linear-systems` becomes a coherent public interview topic.

The machine-readable workstream record should add an optional field:

```json
"canonicalExtensions": [
  "inner-product-projection-core",
  "span-basis-rank-nullity",
  "linear-system-consistency-rref"
]
```

These values mean:

### 5.1 `inner-product-projection-core`

The Green source directly supports dot products, norms, angle, and orthogonality.

The canonical public Knowledge may additionally include standard consequences needed for interview fluency:

- Cauchy-Schwarz inequality;
- projection of one vector onto another;
- projection onto a one-dimensional subspace;
- interpretation of orthogonal residuals.

These are canonical extensions, not claims about what the Green section explicitly states.

### 5.2 `span-basis-rank-nullity`

Repository-authored canonical extension covering:

- linear combinations;
- span;
- linear independence and dependence;
- basis and dimension;
- row space and column space;
- null space;
- rank;
- equality of row rank and column rank as a standard result;
- rank-nullity theorem.

### 5.3 `linear-system-consistency-rref`

Repository-authored canonical extension covering:

- `Ax=b` as a linear-system object;
- augmented matrices;
- elementary row operations;
- echelon / reduced-row-echelon form;
- pivot and free variables;
- rank consistency criterion;
- unique / none / infinitely-many solution cases;
- homogeneous systems and null-space structure;
- affine solution set `x_p + N(A)` when consistent.

### 5.4 Extension-provenance invariant

Canonical extensions must **not** generate fake source coverage entries.

The workstream record is the place to state that the repository intentionally completed these standard topic gaps. Hidden source coverage continues to mean only “material actually inspected in a verified source.”

## 6. Canonical ownership and deduplication rules

### 6.1 Vector geometry ownership

New Knowledge `vector-geometry-inner-products` owns general real-vector geometry:

- coordinates and linear combinations;
- dot product;
- Euclidean norm and distance;
- angle;
- orthogonality;
- Cauchy-Schwarz;
- simple projection geometry.

It should link to existing `correlation-matrix` for the statistical / financial meaning of correlation rather than recreating the full correlation-matrix theory.

### 6.2 Correlation-range deduplication

The Green `0.8 / 0.8` angle problem is not a new Problem identity.

It belongs to the already-existing canonical family:

`correlation-matrix-parameter-range`.

The existing public Problem already contains the `0.28 <= rho <= 1` numerical variant. This workstream may add a concise geometric derivation or a `vector-geometry-inner-products` concept relationship if useful, but must not create another correlation-range page.

### 6.3 Span / basis / rank ownership

New Knowledge `linear-independence-span-basis-rank` owns structural vector-space concepts:

- span;
- independence;
- basis;
- dimension;
- row/column spaces;
- rank;
- null space;
- rank-nullity.

It does not re-teach eigenspaces or SVD decomposition details; those remain owned by existing determinant/eigenvalue and SVD Knowledge.

### 6.4 Linear-system ownership

New Knowledge `linear-systems-consistency` owns:

- row reduction as a reasoning tool;
- consistency;
- pivot/free-variable logic;
- rank criterion;
- unique / none / infinite-solution classification;
- homogeneous and affine solution structure.

It may cross-link to completed decomposition Knowledge for numerical solution methods, but must not duplicate QR, LU, Cholesky, or SVD algorithms.

### 6.5 Row-stochastic matrix naming

The 150 source uses the term **probability matrix**.

The canonical public Problem should use the more specific standard term **row-stochastic matrix** as its main name and explain in source-neutral prose that matrices of this form are also commonly called stochastic/probability transition matrices depending on context.

The proof must preserve both defining properties:

1. nonnegative entries;
2. row sums equal to 1.

Proving only `M 1 = 1` is incomplete without the nonnegativity check.

## 7. Public Knowledge design

### 7.1 New Knowledge: `vector-geometry-inner-products`

Canonical topics:

- `linear-algebra-matrix-methods`
- `vectors-linear-systems`

Must cover:

- vectors in `R^n`;
- linear combinations at an intuitive level;
- dot product `x^T y`;
- norm and distance;
- angle formula;
- orthogonality;
- Cauchy-Schwarz as the inequality that makes the cosine formula well-defined;
- projection formula and orthogonal residual intuition;
- correlation-as-cosine bridge to standardized random variables;
- explicit cross-link to `correlation-matrix`;
- visible `Interview Checks`.

Suggested Interview Checks include:

- when does equality hold in Cauchy-Schwarz?;
- if `x^T y=0`, what geometric statement follows?;
- derive the projection of `x` onto a nonzero vector `u`;
- explain why a correlation coefficient must lie in `[-1,1]` from the inner-product viewpoint.

### 7.2 New Knowledge: `linear-independence-span-basis-rank`

Canonical topics:

- `linear-algebra-matrix-methods`
- `vectors-linear-systems`

Must cover:

- linear combination and span;
- linear independence;
- basis and dimension;
- matrix columns as a spanning family;
- column space and row space;
- null space;
- rank;
- rank-nullity theorem;
- relation between rank and redundant equations / variables;
- full row rank versus full column rank;
- visible `Interview Checks`.

Suggested Interview Checks include:

- how can you tell from RREF whether columns are independent?;
- what does a nontrivial null space imply?;
- for an `m x n` matrix of rank `r`, what is `dim N(A)`?;
- why can an overdetermined system still be consistent?;
- why can an underdetermined system still have a unique solution only under special dimension/rank conditions?

### 7.3 New Knowledge: `linear-systems-consistency`

Canonical topics:

- `linear-algebra-matrix-methods`
- `vectors-linear-systems`

Must cover:

- `Ax=b` and augmented matrix `[A|b]`;
- Gaussian elimination / row operations as algebraically equivalent system transformations;
- echelon form and RREF;
- pivots and free variables;
- consistency criterion `rank(A)=rank([A|b])`;
- unique solution when consistent and `rank(A)=n` for `n` unknowns;
- infinitely many solutions when consistent and `rank(A)<n`;
- no solution when augmented rank exceeds coefficient rank;
- homogeneous case `Ax=0`;
- null-space dimension and free variables;
- general consistent solution `x=x_p+z`, `z in N(A)`;
- cross-links to QR/LU/SVD for numerical solving without duplicating their algorithms;
- visible `Interview Checks`.

## 8. Public Problem design

### 8.1 Source-derived canonical Problem: `product-of-row-stochastic-matrices`

Core independently written task:

Let `A` and `B` be square row-stochastic matrices: every entry is nonnegative and every row sums to 1. Prove that `AB` is row-stochastic.

Required solution structure:

1. Let `1` denote the all-ones column vector.
2. Row-stochasticity implies `A1=1` and `B1=1`.
3. Therefore `(AB)1=A(B1)=A1=1`, proving row sums remain 1.
4. Since `A` and `B` have nonnegative entries, every entry of `AB` is a sum of nonnegative products and is therefore nonnegative.
5. Conclude that `AB` is row-stochastic.

Interview value:

- recognizes a row-sum constraint as a matrix-vector invariant;
- uses the all-ones vector rather than entry-by-entry row summation;
- separates algebraic invariance from order/nonnegativity constraints;
- connects naturally to Markov transition matrices without turning this workstream into a Markov-chain chapter.

The page must be S3+ and source-neutral.

### 8.2 Repository-authored canonical extension Problem: `rank-and-consistency-of-linear-system`

This Problem has **no source provenance** and must not receive a coverage-ledger source row.

Use the parameterized system:

```text
x + y + z       = 1
2x + 3y + 4z    = 2
3x + 4y + a z   = b
```

The canonical question should ask for a classification in terms of parameters `a,b`:

- when is the solution unique?;
- when are there infinitely many solutions?;
- when is there no solution?

Required reasoning:

- the first two coefficient rows are independent;
- the third row equals the sum of the first two exactly when `a=5`;
- if `a != 5`, the coefficient matrix has full rank 3, so the solution is unique for every `b`;
- if `a=5`, the third left-hand side is the sum of the first two left-hand sides, so consistency requires `b=3`;
- `a=5,b=3` gives rank 2 with 3 unknowns -> infinitely many solutions;
- `a=5,b!=3` gives `rank([A|b])>rank(A)` -> no solution.

Required extensions:

- show the same classification by row reduction;
- connect the infinite-solution case to a one-dimensional null space through rank-nullity;
- explain why determinant-only reasoning is insufficient to distinguish “no solution” from “infinitely many solutions” once the coefficient matrix is singular.

The page must be S3+, source-neutral, and explicitly repository-authored only in hidden workstream metadata—not in the public prose.

## 9. Existing-content enrichment

### 9.1 `correlation-matrix-parameter-range`

No duplicate page is allowed.

If the current page does not yet fully expose the geometric reasoning contributed by the Green vector section, the implementation may add a concise geometric / Gram-vector method or cross-link to `vector-geometry-inner-products`.

The existing numerical Variant A (`0.8,0.8 -> 0.28 <= rho <= 1`) remains the canonical destination of the Green source item.

### 9.2 Existing decomposition and eigenbasis nodes

The new vector/system Knowledge may reference:

- `qr-decomposition`;
- `lu-cholesky-decomposition`;
- `singular-value-decomposition`;
- `eigenbasis-decomposition`.

Those nodes should not be expanded unless a minimal relationship/frontmatter change is required for navigation. No repeated algorithm prose should be added.

## 10. Hidden coverage design

### 10.1 Green item inventory

At minimum, the Green `3.6.1` source must be reconciled into item-level rows for:

- `vector-coordinate-representation`;
- `dot-product`;
- `euclidean-norm-distance`;
- `angle-orthogonality`;
- `correlation-as-cosine`;
- corrected `correlation-range-0.8-0.8`.

Expected semantic destinations:

- reusable definitions -> `knowledge-only` -> `vector-geometry-inner-products`;
- correlation-as-cosine -> `knowledge-only` with `vector-geometry-inner-products` and, where appropriate, `correlation-matrix` as canonical Knowledge targets;
- correlation-range problem -> terminal `merged-duplicate` / existing canonical-family state targeting `correlation-matrix-parameter-range`.

The exact terminal duplicate state should follow the existing coverage vocabulary and current row semantics; the important invariant is that the source item has one canonical public identity and no duplicate page.

### 10.2 150 Questions item inventory

Add / reconcile:

- `2.2::9` -> `canonical-problem` -> `product-of-row-stochastic-matrices`.

Canonical Knowledge should include the relevant new vector/system node(s), most naturally `linear-systems-consistency` and/or `vector-geometry-inner-products` only if the actual public explanation uses those relationships. Do not attach unrelated Knowledge merely to increase connectivity.

### 10.3 Red audit

Red contributes no new item-level row for this workstream.

Its workstream `sourceScope` must carry:

- `reviewOutcome: "no-new-direct-item"`;
- `reviewNote` explaining what was checked and which matrix items were already owned by previous workstreams.

### 10.4 Canonical extensions are not coverage

Do **not** add source rows for:

- span / basis / rank;
- null space / rank-nullity;
- RREF consistency;
- the repository-authored parameterized linear-system Problem.

Their provenance is the `canonicalExtensions` field in the workstream record plus the design/plan/Handoff history.

## 11. Workstream record design

Create:

`src/data/quant-interview/workstreams/linear-algebra-vectors-linear-systems-004.json`

Initial shape:

```json
{
  "id": "linear-algebra-vectors-linear-systems-004",
  "canonicalTopics": [
    "linear-algebra-matrix-methods",
    "vectors-linear-systems"
  ],
  "canonicalExtensions": [
    "inner-product-projection-core",
    "span-basis-rank-nullity",
    "linear-system-consistency-rref"
  ],
  "status": "active",
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": ["3.6.1"],
      "evidencePageRanges": [{"startPage":66,"endPage":67}]
    },
    {
      "source": "red-book",
      "sourceSections": ["6.2.1","6.3.1","10.2"],
      "evidencePageRanges": [
        {"startPage":201,"endPage":222},
        {"startPage":317,"endPage":318}
      ],
      "reviewOutcome": "no-new-direct-item",
      "reviewNote": "Reviewed the General Mathematics questions/solutions and Top Ten question list for vector, basis, rank, and linear-system tasks. Matrix items found there are already owned by completed PSD/decomposition workstreams; no new direct vectors/linear-systems item is introduced here."
    },
    {
      "source": "150-most-frequently-asked",
      "sourceSections": ["2.2","3.2"],
      "evidencePageRanges": [
        {"startPage":30,"endPage":30},
        {"startPage":79,"endPage":80}
      ]
    }
  ]
}
```

The implementation should preserve the repository's existing workstream-validator behavior while adding support for optional `canonicalExtensions`.

Validation for `canonicalExtensions` should be intentionally small:

- optional field;
- array when present;
- unique nonempty strings;
- no interpretation as source sections or taxonomy nodes;
- no public rendering dependency.

## 12. Public source-neutrality

All new public Knowledge/Problems must remain source-neutral:

- no book name;
- no original question number;
- no original section number;
- no original source page;
- no “canonical extension” badge or provenance label;
- no source-shaped `problemId`.

The user should see one coherent Vectors & Linear Systems learning surface.

The repository audit layer, not the public content layer, distinguishes source-derived material from canonical extension.

## 13. Content depth and quality

### 13.1 Knowledge

The three new Knowledge nodes should be mature reusable nodes, not glossary stubs.

Each should include:

- precise definitions;
- geometric/algebraic intuition;
- key identities / theorems;
- boundaries and failure modes;
- relationships to existing linear-algebra nodes;
- concise applications;
- visible `Interview Checks`.

### 13.2 Problems

Both new Problems must meet the repository's S3+ expectation:

- independently written statement;
- progressive hints;
- full reasoning;
- explanation of the key insight;
- realistic Common Mistakes;
- variants / extensions that deepen the same reasoning identity rather than spawning duplicate pages.

## 14. Testing strategy

Implementation must follow strict RED -> GREEN checkpoints.

### 14.1 Workstream registration RED

Tests must initially fail because `linear-algebra-vectors-linear-systems-004.json` does not exist.

They should require:

- exact workstream id;
- canonical topic set;
- all three verified sources represented;
- approved `canonicalExtensions` exactly declared;
- source scope validation.

### 14.2 Inventory RED

Tests must require every directly inspected Green semantic item and 150 `2.2::9` to exist in hidden coverage before semantic closure.

Red must be checked through the workstream audit outcome, not through a fabricated item row.

### 14.3 Provenance-correction RED

A dedicated assertion should prove that:

- `correlation-range-0.8-0.8` belongs to Green `3.6.1`;
- no terminal duplicate remains under the incorrect Green `3.6.4` ownership;
- the canonical public target remains `correlation-matrix-parameter-range`.

### 14.4 Semantic identity RED

Lock expected destinations before public content is created:

- Green reusable vector material -> Knowledge;
- Green correlation range -> existing canonical Problem family;
- 150 Q9 -> `product-of-row-stochastic-matrices`;
- canonical extension Problem has no source coverage row.

### 14.5 Knowledge-first RED -> GREEN

Create and validate:

- `vector-geometry-inner-products`;
- `linear-independence-span-basis-rank`;
- `linear-systems-consistency`.

Content tests must lock the important mathematical boundaries described above.

### 14.6 Problem RED -> GREEN

Create and validate:

- `product-of-row-stochastic-matrices`;
- `rank-and-consistency-of-linear-system`.

Tests must assert S3+ structure and the core reasoning identities, not merely string presence.

### 14.7 Global corpus regression

Extend the existing source-neutral corpus contract to include the new Problems and new Knowledge nodes.

The regression must continue to reject:

- source provenance in public frontmatter;
- source-shaped public IDs;
- invalid canonical topics.

### 14.8 Completion RED

Before switching the workstream to `complete`, tests must prove:

- all inspected source items are terminal;
- all canonical refs resolve to real slugs;
- no in-scope `needs-review` / `pending` item remains;
- `knowledge-only` source material remains visible through `Interview Checks`;
- Red has an explicit no-new-direct-item audit;
- `canonicalExtensions` are present but have no fake source coverage rows;
- no source-named or source-number-named duplicate Problem was created;
- workstream status is `complete` only after these conditions hold.

## 15. Verification gates

Before completion:

```bash
npm run test
npm run check
npm run build
```

The implementation must also:

- review the topic-only diff against `chatgpt/quant-interview-topic-first-fusion-design-2026-08-16`;
- update `docs/quant-interview/HANDOFF.md` with factual current state and real verification evidence only;
- remove any branch-only temporary CI workflow before presenting the integration menu.

## 16. Expected public output after this workstream

New Knowledge:

- `vector-geometry-inner-products`
- `linear-independence-span-basis-rank`
- `linear-systems-consistency`

New Problems:

- `product-of-row-stochastic-matrices`
- `rank-and-consistency-of-linear-system`

Existing Problem potentially enriched / re-linked:

- `correlation-matrix-parameter-range`

No other public Problem is required by this design.

## 17. Expected hidden/audit output

- new workstream `linear-algebra-vectors-linear-systems-004`;
- optional `canonicalExtensions` support in workstream validation;
- Green `3.6.1` item-level vector inventory;
- correction of the existing Green `correlation-range-0.8-0.8` source-section ownership;
- 150 Questions `2.2::9` terminal mapping;
- explicit Red `no-new-direct-item` audit;
- no source coverage entries for repository-authored extension-only material;
- Handoff updated only after real verification succeeds.

## 18. Acceptance criteria

This design is successfully implemented when all of the following are true:

1. the public topic remains Topic-first and source-neutral;
2. the source-derived layer reflects only material actually supported by the supplied files;
3. canonical extensions are explicitly machine-recorded and never masquerade as source coverage;
4. vector geometry is represented by one reusable Knowledge node;
5. span/basis/rank/nullity is represented by one reusable Knowledge node;
6. linear-system consistency is represented by one reusable Knowledge node;
7. the Green geometric correlation task remains one canonical correlation-range Problem rather than a duplicate;
8. the row-stochastic closure proof is an independently authored canonical Problem;
9. the rank/consistency parameter problem is a source-neutral repository-authored canonical extension;
10. every inspected source item is reconciled in hidden audit state;
11. the Red source has an explicit audit conclusion despite contributing no new direct item;
12. all relationships, taxonomy references, coverage refs, and workstream refs validate;
13. `npm run test`, `npm run check`, and `npm run build` all pass on the final business tree;
14. the topic-only diff contains no unrelated UI, taxonomy, TOC, or other-topic changes.

## 19. Explicit future deferrals

The following remain outside this workstream and should be considered only in later bounded topics if needed:

- change-of-basis machinery beyond what existing eigenbasis content already needs;
- orthogonal complements as a standalone advanced node;
- four-fundamental-subspaces treatment including left null space;
- matrix norms / operator norms as a dedicated topic;
- iterative solvers and conditioning as a numerical-linear-algebra workstream;
- Jordan form and generalized eigenvectors;
- affine spaces as a standalone concept;
- Markov-chain theory beyond the minimal row-stochastic matrix connection.
