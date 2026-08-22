# Quant Interview Matrix Decompositions Cross-Book Workstream Design

Date: 2026-08-16
Status: approved design, implementation not started
Base architecture: Topic-first public corpus + hidden source provenance
Target branch: `chatgpt/quant-interview-workstream-matrix-decompositions-2026-08-16`

## 1. Purpose

Implement one bounded Topic-first Quant Interview ingestion workstream for:

- `linear-algebra-matrix-methods`
- `matrix-decompositions`

The public result must fuse all relevant verified-source material into canonical Knowledge and canonical Problems. Books, original question identifiers, and source page evidence remain internal-only audit metadata.

This workstream continues directly from the completed Determinants & Eigenvalues workstream and intentionally absorbs decomposition material that was deferred there.

## 2. Non-goals

This workstream does **not**:

- process a source book sequentially;
- claim full Linear Algebra or whole-book completeness;
- create one public Problem for every definition or source question;
- expose book names, question numbers, or page numbers in public frontmatter or prose;
- redesign the public Quant Interview UI;
- modify unrelated Topics, Problems, or Knowledge;
- treat numerical linear algebra as an exhaustive textbook chapter.

## 3. Source-derived evidence boundary

The source-derived facts below are the evidence pool for this workstream. Canonical corrections and design decisions are separated in later sections.

### 3.1 Green Book

Verified direct material includes:

1. **QR decomposition**
   - writes a nonsingular square matrix as `A = QR`, with `Q` orthogonal and `R` upper triangular;
   - uses `Q^{-1}=Q^T` to reduce `Ax=b` to triangular back-substitution;
   - introduces Gram-Schmidt as a route to QR;
   - poses an interview-style task: design linear least-squares regression when no canned regression function is available.

2. **Least squares discussion around QR**
   - formulates `Y = X beta + epsilon`;
   - derives normal equations `(X^T X) beta = X^T Y`;
   - suggests solving the resulting system through QR and notes numerical problems with matrix inversion near singularity / poor scaling.

3. **LU decomposition**
   - writes a nonsingular matrix as `A = LU`;
   - links LU to Gaussian elimination;
   - uses triangular solves for `Ax=b`;
   - notes determinant evaluation through triangular factors.

4. **Cholesky decomposition**
   - for symmetric positive-definite matrices, gives a triangular factorization;
   - connects it to LU structure;
   - applies it to generation of correlated normal random variables.

5. **SVD**
   - introduces a singular-value factorization for rectangular matrices;
   - relates covariance eigendecomposition to a square-root factor for Gaussian simulation.

Internal physical-page evidence in the verified user-supplied PDF is split into the actually inspected decomposition ranges: QR / least squares on physical pages 68-69, and LU / Cholesky / SVD on physical pages 73-74. Intervening determinant/eigenvalue/PSD pages belong to earlier completed workstreams and are not claimed as new decomposition evidence here.

### 3.2 Red Book

The directly relevant source task is **Question 6.10** in the General Mathematics section:

- given `A = [[5,-3],[-3,5]]`, find a matrix `M` such that `A=M^2`;
- then find a matrix `C` such that `A=C^T C`.

The supplied solution first attacks the matrix square root through entries, then constructs one valid factor `C` and explicitly observes that the generic `C^T C` factor is not unique.

Internal physical-page evidence is the question on physical page 202 and the solution on physical pages 212-213 of the verified supplied Red Book PDF.

### 3.3 150 Questions

The directly relevant source task is the Linear Algebra item that asks, for

`A = [[2,-2],[-2,5]]`,

1. find `M` such that `M^2=A`;
2. find `M` such that `A=MM^T`.

Its solution uses the symmetric eigendecomposition to build a square root from square roots of the eigenvalues, then uses a Cholesky factor for the second part.

Internal physical-page evidence is the question on physical page 29 and the corresponding solution beginning on physical page 72 and continuing through the Cholesky construction on physical pages 73-76 of the verified supplied PDF.

### 3.4 Source with no additional direct item

If a verified source has no further decomposition item beyond the material above, the workstream record must still carry an explicit review outcome rather than silently omitting that source.

## 4. Canonical reconciliation decisions

The canonical public corpus is not a verbatim merge of source statements. The following are explicit model/editorial normalization decisions based on the approved project architecture and standard mathematical practice.

### 4.1 QR least squares

The Green Book source derives normal equations and then discusses QR. The canonical least-squares Problem should instead emphasize the numerically preferable direct route:

`X = QR` with full column rank, then solve `R beta = Q^T y`.

The canonical explanation may mention the normal-equation identity for comparison, but must explain that explicitly forming `X^T X` squares the condition number and is therefore not the preferred QR implementation.

This is a **canonical improvement**, not a claim that the source itself presented the direct algorithm in that form.

### 4.2 QR dimensions and uniqueness

Public Knowledge must distinguish:

- square QR;
- thin/economy QR for tall full-column-rank matrices;
- full QR when relevant.

Uniqueness must be stated with the usual sign convention: positive diagonal entries of `R` remove column-sign ambiguity under the appropriate rank assumptions.

### 4.3 Cholesky orientation

Both conventions may appear in sources or software:

- `A = LL^T` with lower-triangular `L`;
- `A = R^T R` with upper-triangular `R`.

Canonical Knowledge must explicitly state the convention being used and note the transpose-equivalent alternative so users do not mistake notation for a mathematical difference.

### 4.4 Generic factor versus Cholesky uniqueness

For SPD `A`, the triangular Cholesky factor with positive diagonal is unique under a fixed convention.

By contrast, a generic factorization `A=C^T C` is not unique: if `C` is a factor, orthogonal transformations can generate others when dimensions permit. The Red source's observation of non-uniqueness belongs in the canonical Problem, while the public page should also teach why Cholesky becomes unique after imposing triangular structure and positive diagonal.

### 4.5 Matrix square root

For real symmetric PSD `A=Q Lambda Q^T`, the canonical principal square root is

`A^{1/2} = Q Lambda^{1/2} Q^T`.

The public Problem should distinguish:

- existence of a real symmetric PSD principal square root;
- uniqueness of the **principal PSD** square root;
- existence of other non-principal square roots in broader settings;
- the fact that `A=M^2` and `A=MM^T` are different constraints.

### 4.6 SVD dimensions

Canonical SVD Knowledge must avoid loose dimension language. For `A in R^{m x n}` it should distinguish:

- full SVD: `A = U Sigma V^T` with square orthogonal `U` and `V` and rectangular `Sigma`;
- thin SVD: `A = U_r Sigma_r V_r^T` for rank `r`, with reduced dimensions.

### 4.7 Correlated Gaussian generation

Canonical simulation logic should state the covariance transformation directly:

if `z ~ N(0,I)` and `Sigma = LL^T`, then

`x = mu + L z`

has covariance `Sigma`.

For singular PSD covariance matrices, Cholesky may fail or require pivoted/generalized treatment; spectral/SVD square-root factors remain available. The public content should distinguish the SPD and PSD cases rather than implying ordinary Cholesky covers every covariance matrix.

## 5. Public Knowledge design

### 5.1 New Knowledge: `qr-decomposition`

Type: concept / reusable technique under `matrix-decompositions`.

Must cover:

- orthogonal matrices and `Q^TQ=I`;
- square and thin QR;
- Gram-Schmidt conceptually, with a note that practical numerical implementations often use more stable orthogonalization / Householder methods;
- triangular solve workflow;
- direct least-squares reduction `R beta = Q^T y`;
- rank-deficient boundary and the role of pivoting / SVD;
- uniqueness under positive-diagonal convention;
- visible `Interview Checks`.

### 5.2 New Knowledge: `lu-cholesky-decomposition`

Must cover:

- LU as elimination structure;
- practical need for pivoting in generic LU (`PA=LU` as the robust form to remember);
- forward and backward substitution;
- determinant from triangular factors;
- Cholesky specialization for SPD matrices;
- lower versus upper convention;
- positive-diagonal uniqueness;
- why Cholesky is cheaper / structurally stronger than generic LU for SPD systems;
- covariance-factor interpretation;
- PSD/singular boundary;
- visible `Interview Checks`.

### 5.3 New Knowledge: `singular-value-decomposition`

Must cover:

- full and thin SVD dimensions;
- singular values and left/right singular vectors;
- relation to eigenvalues of `A^T A` and `AA^T`;
- rank and pseudoinverse interpretation;
- least-squares use, especially rank-deficient / ill-conditioned cases;
- covariance square-root and simulation interpretation where appropriate;
- distinction from eigendecomposition for non-square matrices;
- visible `Interview Checks`.

### 5.4 Enrich existing Knowledge: `eigenbasis-decomposition`

Add a compact matrix-functions section:

- if `A=Q Lambda Q^T` is symmetric, then define `f(A)=Q f(Lambda) Q^T` when meaningful;
- principal square root for PSD matrices;
- relation to matrix powers already taught in the node;
- boundary: negative eigenvalues prevent a real symmetric PSD square root.

Do not turn this node into a duplicate SVD/Cholesky article.

## 6. Public Problem design

Only genuinely distinct reasoning identities become Problems.

### 6.1 `least-squares-via-qr`

Core task:

Given a small overdetermined system / regression design matrix, derive the least-squares estimator using QR without forming a matrix inverse.

Required reasoning:

1. factor `X=QR` (thin QR);
2. use orthogonality to reduce `||y-X beta||_2`;
3. solve the triangular system `R beta = Q^T y`;
4. compare with normal equations;
5. explain numerical conditioning and rank assumptions.

S3+ requirements:

- progressive hints;
- complete worked numerical example;
- geometric interpretation as projection;
- Common Mistakes;
- Extensions including rank deficiency and SVD fallback.

### 6.2 `matrix-square-root-and-cholesky-factor`

This is the semantic merge target for the Red matrix task and the 150 Questions matrix task.

Primary canonical example should use one matrix; the other source matrix is retained as a meaningful variant, not a duplicate page.

Required methods:

- spectral/principal-square-root method for symmetric PSD/SPD matrices;
- direct verification that `M^2=A`;
- Cholesky construction of a triangular factor;
- explanation of `A=M^2` versus `A=CC^T` / `C^TC`;
- generic-factor non-uniqueness versus Cholesky uniqueness;
- meaningful variant using the second source matrix.

The source's entrywise square-root method may be mentioned as an alternative historical/source-derived route, but the canonical main method should expose the reusable spectral structure.

### 6.3 `generate-correlated-gaussians`

Core task:

Construct correlated standard normals from independent standard normals, then generalize to an `n`-dimensional Gaussian with covariance `Sigma`.

Required reasoning:

- two-dimensional explicit construction;
- covariance verification;
- Cholesky factor route for SPD covariance;
- spectral/SVD square-root route for PSD/singular covariance;
- orientation consistency (`LL^T` versus `R^TR`);
- practical boundary checks for valid covariance matrices.

S3+ requirements include hints, full derivation, mistakes, and extensions to Monte Carlo simulation.

## 7. Semantic dedup policy for this workstream

Expected terminal outcomes:

- QR definition / LU definition / Cholesky definition / SVD definition -> `knowledge-only` unless a distinct source problem exists;
- Green least-squares algorithm prompt -> `canonical-problem` → `least-squares-via-qr`;
- Green correlated-normal generation prompt -> `canonical-problem` → `generate-correlated-gaussians`;
- Red matrix square-root + factor task -> `canonical-problem` or semantic anchor for `matrix-square-root-and-cholesky-factor`;
- 150 Questions analogous matrix task -> `variant` or `merged-duplicate` targeting the same canonical Problem, depending on final item-level identity review;
- repeated definitions / methods contribute to Knowledge rather than producing source-specific public pages.

The exact coverage state must be finalized only after item-level inventory is written and compared against existing canonical content.

## 8. Hidden provenance / workstream record

Create a machine-readable workstream record, tentatively:

`linear-algebra-matrix-decompositions-003`

with canonical topics:

- `linear-algebra-matrix-methods`
- `matrix-decompositions`

The record must explicitly include all three verified sources, even when a source contributes no additional direct item.

Every inspected semantic item must receive an item-level coverage row with:

- source section / item identity;
- exact canonical topics;
- internal evidence page range;
- terminal state when closed;
- canonical Problem and/or Knowledge targets;
- a nonempty `resolutionNote` explaining semantic identity / dedup decisions;
- `topicOverrideReason` only when item-level classification legitimately refines or crosses a coarse source-TOC mapping.

No public component may import this provenance.

## 9. Expected public corpus delta

Before this workstream, the durable Handoff records:

- 13 canonical Problems;
- 15 explicitly topic-classified Knowledge / Technique nodes.

Expected delta if implementation validates the design:

- +3 canonical Problems;
- +3 new Knowledge nodes;
- +1 existing Knowledge node enriched;
- no book-specific duplicate public pages.

The exact repository count is derived dynamically and must not be hard-coded into public UI.

## 10. Testing strategy

Implementation must follow strict RED → GREEN checkpoints.

Required test groups:

1. **Workstream registration contract**
   - bounded canonical topics;
   - all three sources explicitly reviewed;
   - valid evidence ranges and source sections.

2. **Inventory contract**
   - every inspected decomposition semantic unit has an item-level coverage row;
   - no out-of-scope topic leakage.

3. **Semantic identity contract**
   - duplicate/variant matrix-square-root tasks point to one canonical Problem;
   - definition-only material maps to Knowledge;
   - every terminal row has a resolution note.

4. **Knowledge completeness contract**
   - QR dimensions and direct least-squares algorithm;
   - pivoted LU awareness;
   - Cholesky conditions and uniqueness;
   - SVD full/thin dimensions and rank/pseudoinverse role;
   - matrix-function square-root enrichment;
   - visible `Interview Checks`.

5. **Problem content contract**
   - all three Problems source-neutral and S3+;
   - correct matrix examples and results;
   - QR problem avoids inverse-first implementation;
   - square-root Problem distinguishes principal square root, generic factor, and Cholesky;
   - Gaussian Problem verifies covariance and distinguishes SPD/PSD cases.

6. **Global source-neutral contract**
   - extend current global lists to include the new Problems and Knowledge;
   - no source-shaped `problemId`;
   - hidden coverage canonical refs resolve to real slugs.

7. **Completion gate**
   - no in-scope `pending` / `needs-review` rows;
   - workstream `status: complete` only after canonical refs resolve;
   - `knowledge-only` rows require visible public self-tests;
   - durable Handoff advances to the next bounded Topic-first workstream.

Full repository gate after completion:

```bash
npm run test
npm run check
npm run build
```

## 11. Diff and safety constraints

The final topic-only diff must be limited to:

- new / enriched Matrix Decompositions Knowledge;
- new canonical Matrix Decompositions Problems;
- Green / Red / 150 hidden coverage rows needed by this workstream;
- one new workstream record;
- tests for this workstream and global source-neutrality;
- `docs/quant-interview/HANDOFF.md` and, only if a genuinely new durable rule is discovered, the minimum relevant repository-memory documentation.

Do not change:

- public page architecture or styles;
- unrelated Topics;
- source TOCs unless a verified structural error is discovered;
- source PDFs or scans;
- `main`.

## 12. Acceptance criteria

This workstream is complete only when all of the following are true:

1. All verified sources have an explicit audit outcome for Matrix Decompositions.
2. Every inspected direct semantic item is terminal in hidden coverage.
3. Public Knowledge covers QR, LU/Cholesky, SVD, and symmetric matrix square-root reasoning without duplicate concept pages.
4. Exactly the genuinely distinct reasoning tasks are represented as canonical Problems; the two source matrix-square-root tasks do not produce duplicate public Problems.
5. All new Problems are source-neutral S3+ records with hints, full solutions, Common Mistakes, and Extensions.
6. `knowledge-only` material remains publicly testable through `Interview Checks`.
7. All hidden canonical refs resolve against the real Problem/Knowledge slug sets with unresolved refs disallowed.
8. `npm run test`, `npm run check`, and `npm run build` pass on the final business tree.
9. The topic-only diff is reviewed against `chatgpt/quant-interview-topic-first-fusion-design-2026-08-16`.
10. The branch is not integrated until the user chooses the finishing action.
