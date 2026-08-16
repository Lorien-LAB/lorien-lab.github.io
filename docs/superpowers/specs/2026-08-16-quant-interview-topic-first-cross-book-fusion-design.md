# Quant Interview Topic-First Cross-Book Fusion Architecture

Date: 2026-08-16
Status: Approved design; implementation not yet started
Target: Lorien Lab Quant Interview Knowledge System

## 1. Product Goal

Lorien Lab's Quant Interview Knowledge System is **not** a public digital mirror of three interview books.

The three books are private ingestion inputs used to construct one canonical, topic-first, source-neutral knowledge system. Public users should experience a coherent knowledge tree, complete reusable explanations, and a deduplicated Problem Bank. They should not need to know which book, chapter, question number, or page a public item came from.

The system must satisfy two simultaneous goals:

1. **Public fusion** — one topic-first Knowledge system with no source-centric duplication.
2. **Internal completeness** — every relevant knowledge item and interview problem from all three source works is accounted for in a hidden coverage ledger.

The intended end state is:

> All useful knowledge and non-duplicate problems from the three books are absorbed into Lorien Lab's canonical Knowledge and Problem layers, while source provenance remains available only to Agents for audit and completeness verification.

No public coverage percentage may be claimed unless the internal ledger actually supports it.

## 2. Source Basis

The architecture is designed around the three user-supplied works:

### Green Book

*A Practical Guide to Quantitative Finance Interviews* — Xinfeng Zhou.

The supplied file identifies itself as **First Edition** and carries a 2008 copyright notice. Its TOC is highly topic-granular and includes, among others:

- General Principles
- Brain Teasers
  - Problem Simplification
  - Logic Reasoning
  - Thinking Out of the Box
  - Application of Symmetry
  - Series Summation
  - Pigeon Hole Principle
  - Modular Arithmetic
  - Mathematical Induction
  - Proof by Contradiction
- Calculus and Linear Algebra
  - Limits and Derivatives
  - Integration
  - Partial Derivatives and Multiple Integrals
  - Taylor Series
  - Newton's Method
  - Lagrange Multipliers
  - ODEs
  - Linear Algebra / PSD / decompositions
- Probability Theory
  - Basic Probability
  - Combinatorial Analysis
  - Conditional Probability and Bayes
  - Distributions
  - Expected Value / Variance / Covariance
  - Order Statistics
- Stochastic Processes and Stochastic Calculus
  - Markov Chains
  - Martingales and Random Walks
  - Dynamic Programming
  - Brownian Motion and Stochastic Calculus
- Finance
  - Option Pricing
  - Greeks
  - Option Portfolios and Exotic Options
  - Other Finance Questions
- Algorithms and Numerical Methods
  - Algorithms
  - Power of Two
  - Numerical Methods

### Red Book

*Quant Job Interview Questions and Answers* — Mark Joshi, Nick Denson, Andrew Downes.

The supplied file identifies itself as **Version 1.01**, copyright 2008. Its TOC is coarser and groups questions/solutions by:

- Interview Process
- Option Pricing
  - Black–Scholes
  - Option Price Properties
  - Hedging and Replication
  - Greeks
  - General
  - Trees and Monte Carlo
  - Incomplete Markets
- Probability
  - General
  - Stochastic Processes
- Interest Rates
- Numerical Techniques and Algorithms
- Mathematics
  - General
  - Integration and Differentiation
- Coding in C++
- Logic / Brainteasers
- Soft Interview
- Top Ten Questions

### 150 Questions

*150 Most Frequently Asked Questions on Quant Interviews* — Dan Stefanica, Rados Radoicic, Tai-Ho Wang.

Repository state already pins the supplied scan to the 2013 first edition. Its main question/solution groups are:

- Mathematics, calculus, differential equations
- Covariance and correlation matrices, linear algebra
- Financial instruments: options, bonds, swaps, forwards, futures
- C++ data structures
- Monte Carlo simulation, numerical methods
- Probability, stochastic calculus
- Brainteasers

The supplied Green and Red files must be formally source-file-verified and their exact edition/version metadata written into repository source state before their problem-level coverage can be marked complete.

## 3. Public Information Architecture: Topic-First

The public Quant Interview system is organized by Lorien Lab's canonical topic hierarchy, not by source book.

The initial canonical top-level taxonomy is:

1. **Interview Strategy & Communication**
2. **Logic, Brainteasers & Discrete Reasoning**
3. **Calculus & Differential Equations**
4. **Linear Algebra & Matrix Methods**
5. **Probability & Statistics**
6. **Stochastic Processes & Stochastic Calculus**
7. **Derivatives, Options & No-Arbitrage**
8. **Fixed Income, Rates & General Finance**
9. **Monte Carlo & Numerical Methods**
10. **Algorithms, Data Structures & C++**

Each top-level topic contains canonical subtopics derived from the union of all three TOCs.

### 3.1 Interview Strategy & Communication

- Quant interview preparation
- Building broad technical coverage
- Thinking aloud / communicating reasoning
- Listening and clarifying assumptions
- Reasonable assumptions
- Interview process and formats
- Phone / take-home / written interviews
- Soft interview questions
- Employer / role selection
- Common interview mistakes

### 3.2 Logic, Brainteasers & Discrete Reasoning

- Problem simplification
- Logical deduction
- Invariants and state transformations
- Symmetry
- Pigeonhole principle
- Modular arithmetic
- Mathematical induction
- Proof by contradiction
- Series / finite summation tricks
- Combinatorial puzzles
- Identity swapping / collision invariants
- Classical interview puzzles

### 3.3 Calculus & Differential Equations

- Limits
- Derivatives
- Optimization / extrema
- L'Hospital's rule
- Integration
- Multiple integration
- Expected values by integration
- Taylor expansion
- Newton's method
- Lagrange multipliers
- Ordinary differential equations
- First-order linear ODEs
- Homogeneous / nonhomogeneous equations

### 3.4 Linear Algebra & Matrix Methods

- Vectors and linear systems
- Determinants
- Eigenvalues / eigenvectors
- Positive semidefinite / positive definite matrices
- Covariance matrices
- Correlation matrices
- Principal minors / feasibility
- QR decomposition
- LU decomposition
- Cholesky decomposition
- Matrix identities useful in interviews

### 3.5 Probability & Statistics

- Probability axioms and set operations
- Counting / combinatorics
- Conditional probability
- Bayes' rule
- Independence
- Discrete random variables
- Continuous random variables
- Common distributions
- Normal distribution
- Poisson process / Poisson distribution
- Expected value
- Variance
- Covariance / correlation
- Sum of random variables
- Joint distributions
- Order statistics
- Extremes / max-min problems
- Sampling / probability simulation intuition

### 3.6 Stochastic Processes & Stochastic Calculus

- Random walks
- Markov chains
- First-step analysis
- Gambler's ruin
- Martingales
- Stopping times
- Brownian motion / Wiener process
- First passage times
- Ito's lemma
- Stochastic integrals
- SDEs
- Ornstein–Uhlenbeck / mean reversion
- Dynamic programming where used as a stochastic-state method

### 3.7 Derivatives, Options & No-Arbitrage

- No-arbitrage principle
- Static arbitrage construction
- Put-call parity
- Option monotonicity
- Convexity in strike
- European vs American options
- Replication and hedging
- Black–Scholes assumptions
- Black–Scholes PDE
- Black–Scholes formula
- Greeks
  - Delta
  - Gamma
  - Theta
  - Vega
  - Rho where relevant
- Binomial trees
- Monte Carlo option pricing
- Incomplete markets
- Option portfolios
- Spreads
- Straddles / combinations
- Binary / exotic options

### 3.8 Fixed Income, Rates & General Finance

- Bonds and bond pricing
- Yield / discounting
- Duration
- Convexity
- Forwards
- Futures
- Swaps
- Interest-rate models
- Mean-reverting rate models
- Portfolio optimization
- Value at Risk
- Other core finance interview concepts not naturally housed under options

### 3.9 Monte Carlo & Numerical Methods

- Monte Carlo simulation
- Random-number usage
- Variance-reduction concepts when present
- Numerical integration
- Root finding
- Newton methods in numerical context
- Finite-difference methods
- Numerical derivatives
- Trees as numerical pricing methods
- Simulation-based probability problems

### 3.10 Algorithms, Data Structures & C++

- Complexity and algorithmic reasoning
- Arrays / vectors / lists
- Stacks / queues
- Trees / maps / hash structures where present
- Sorting
- Search
- String / numeric manipulation
- Dynamic programming as an algorithmic technique
- Fibonacci / recurrence problems
- C++ language fundamentals
- Memory / pointers / references
- Object-oriented C++ concepts
- STL and common interview data structures where present

This taxonomy may grow only when a source item cannot be represented cleanly by the existing tree. Synonyms from source books must map into canonical topics rather than create duplicate topic nodes.

## 4. Public Source-Neutrality Rule

The public Knowledge and Problem experience must not be source-centric.

### 4.1 Knowledge

Public Knowledge entries must not display:

- source book name as provenance;
- original chapter number;
- original question number;
- source page number;
- source-specific ordering.

Knowledge should instead prioritize:

- definition;
- intuition;
- derivation / proof where appropriate;
- recognition signals in interviews;
- canonical formulas;
- examples;
- common mistakes;
- edge cases;
- related concepts;
- relevant canonical Problems.

### 4.2 Problems

Public canonical Problems must not display source provenance.

A Problem page should present:

- canonical title;
- independently written problem statement;
- difficulty and classification;
- Think Before Revealing section;
- progressive hints;
- complete solution;
- alternative solutions when materially useful;
- why the problem matters;
- common mistakes;
- variants / extensions;
- linked concepts and techniques;
- related canonical problems.

The current public source line and public source-navigation emphasis are transitional architecture and should be removed in the Topic-first migration.

### 4.3 Internal provenance

Source identity is not deleted from the repository. It moves behind the public content layer into ingestion/audit data.

## 5. Canonical Problem Identity and Deduplication

The unit of public problem content is the **Canonical Problem**, not a source question.

Two source questions should map to the same canonical Problem when their mathematical / financial problem identity is substantially the same even if they differ in:

- character names;
- story framing;
- numeric constants;
- notation;
- wording;
- source ordering;
- cosmetic implementation details.

### 5.1 Canonical identity dimensions

Semantic deduplication must compare at least:

1. **Core state / objects** — what mathematical or financial entities are present?
2. **Target** — what is being asked to compute, prove, construct, or explain?
3. **Constraints** — what assumptions materially define the problem?
4. **Underlying structure** — probability model, combinatorial structure, stochastic process, payoff geometry, matrix condition, algorithmic task, etc.
5. **Key insight / solution family** — invariant, Bayes, dynamic programming, no-arbitrage, PSD condition, integration trick, etc.

Text similarity alone is insufficient.

### 5.2 Merge behavior

If multiple source questions are the same canonical problem:

- create or keep exactly one public Problem;
- use the clearest independent formulation;
- merge distinct useful solution methods;
- merge nontrivial follow-up questions;
- merge meaningful parameter/generalization variants;
- merge useful traps and interviewer expectations;
- do not preserve duplicate story variants as separate public Problems unless the variation changes the reasoning materially.

### 5.3 Variant policy

A source question becomes a **Variant** rather than a separate canonical Problem when the same core problem has a meaningful parameter, constraint, or framing change worth practicing.

Variants belong in `Extensions`, `Variants`, or equivalent structured sections unless they are sufficiently different to merit a standalone Problem.

### 5.4 No destructive deduplication

A source item is never simply discarded as a duplicate. Its internal coverage-ledger entry must point to the canonical Problem that absorbed it and record how it was represented.

## 6. Canonical Knowledge Fusion

The unit of public theoretical content is the **Canonical Knowledge Node**.

When the three books explain the same concept, the system must create one reusable Knowledge node rather than one node per book.

Cross-book fusion should use all available source material to make the canonical node more complete. For example, if one source provides intuition, another a rigorous derivation, and another an interview-style application, those strengths should be combined into one coherent entry.

### 6.1 Knowledge deduplication rule

Do not create a new Knowledge node when an existing node is semantically equivalent under another name.

Examples:

- positive semidefinite matrix / PSD matrix → one node;
- conditional probability / conditioning → one concept family, split only when pedagogically useful;
- pass-through ants / identity swapping / ghost trajectories → one reusable technique where appropriate.

### 6.2 Knowledge completeness rule

A Knowledge entry is not considered mature merely because one source's local explanation has been captured. It becomes mature only after its relevant cross-book workstream has been reconciled and the node is sufficiently complete for independent study.

## 7. Topic-First Agent Workstreams

The primary ingestion unit changes from **book batch** to **canonical topic workstream**.

Old mental model:

> Green Book chapter → ingest → next Green Book chapter → eventually Red Book.

New model:

> Choose one canonical subtopic → load all mapped sections from all three sources → reconcile concepts and problems → deduplicate → author canonical public content → reconcile internal coverage → close the topic batch.

Example:

`Probability & Statistics → Conditional Probability & Bayes → cross-book batch 01`

The Agent should inspect all mapped Green, Red, and 150 Questions source sections relevant to that subtopic before finalizing public canonical content for the batch.

This keeps working context semantically coherent and reduces duplicate creation.

## 8. Cross-Book Topic Map

The repository will maintain a hidden **Source-to-Topic Map**.

Its purpose is to translate each source TOC section into one or more canonical workstreams.

Conceptual shape:

```json
{
  "source": "green-book",
  "sourceSection": "4.3 Conditional Probability and Bayes' formula",
  "canonicalTopics": [
    "probability-statistics/conditional-probability-bayes"
  ]
}
```

A coarse source section may map to multiple canonical topics. A fine-grained source section may map to one.

The source TOCs remain repository-internal audit inputs; they are not the public navigation hierarchy.

## 9. Hidden Coverage Ledger

A non-public **Coverage Ledger** is mandatory.

It answers:

- Has every source section been inspected?
- Has every source question been accounted for?
- Which canonical Knowledge node absorbed a source explanation?
- Which canonical Problem absorbed a source problem?
- Was a source problem represented as a duplicate, variant, standalone canonical problem, or non-problem instructional content?
- Is a source item still pending?

### 9.1 Ledger grain

The ledger should support entries at source-section and source-item/problem level.

Conceptual source-item entry:

```json
{
  "source": "green-book",
  "sourceSection": "4.3",
  "sourceItem": "monty-hall",
  "canonicalTopic": "probability-statistics/conditional-probability-bayes",
  "representation": "canonical-problem",
  "canonicalProblems": ["monty-hall-switching"],
  "canonicalKnowledge": ["conditional-probability", "bayes-rule"],
  "status": "absorbed"
}
```

A duplicate source problem could instead record:

```json
{
  "representation": "merged-duplicate",
  "canonicalProblems": ["existing-canonical-slug"],
  "status": "absorbed"
}
```

### 9.2 Allowed representation states

At minimum:

- `canonical-problem`
- `merged-duplicate`
- `variant`
- `knowledge-only`
- `interview-guidance`
- `non-content-frontmatter`
- `pending`
- `needs-review`

The exact machine schema can use normalized enums, but the semantics must remain explicit.

### 9.3 Public isolation

Coverage-ledger data must not be loaded into public pages unless a future explicit product decision changes this rule.

## 10. Internal Evidence and Overlapping Pages

Physical source pages are internal verification evidence, not public ontology.

The existing ingestion model currently treats batch page ranges as exclusive. That must be replaced or generalized because adjacent source questions can share pages.

The new rule is:

- **semantic ownership is exclusive; evidence is reusable**;
- the same source item/problem cannot be absorbed by two independent canonical outputs without an explicit merged relationship;
- physical evidence page ranges may overlap across ingestion workstreams;
- evidence ranges are retained only for Agent audit and source verification;
- public Knowledge and Problems never need to show evidence page numbers.

A suitable internal structure is `evidencePageRanges`, with each individual range valid and ordered inside one evidence record while overlap across records is permitted.

This requirement supersedes the retired standalone evidence-overlap design.

## 11. Source Verification Strategy

Before bulk topic-first ingestion, all three source files should be in a verified repository state.

### 11.1 150 Questions

Already source-file-verified and edition-pinned in repository state.

### 11.2 Green Book

The actual supplied file has been inspected sufficiently to establish at least:

- canonical title;
- author Xinfeng Zhou;
- First Edition label;
- 2008 copyright notice;
- TOC structure.

A bounded source-verification task should write this evidence into the Green source record and manifest before its mapped content is marked ingested.

### 11.3 Red Book

The actual supplied file has been inspected sufficiently to establish at least:

- canonical title;
- authors Mark Joshi, Nick Denson, Andrew Downes;
- Version 1.01 label;
- 2008 copyright notice;
- TOC structure.

A bounded source-verification task should write this evidence into the Red source record and manifest before its mapped content is marked ingested.

Source verification is internal infrastructure and does not reintroduce public source-centric navigation.

## 12. Public Website Migration

The Quant Interview public UI must move from the current source-oriented model to Topic-first navigation.

### 12.1 Quant Interview landing page

Replace source cards as a primary navigation mode with canonical Topic / Chapter cards.

The primary user journeys become:

1. **Learn by Topic**
2. **Practice Problems**
3. **Study Problem-Solving Techniques**
4. **Follow prerequisites / related concepts**

Sources are not a public primary journey.

### 12.2 Problem Bank

Problems remain canonical first-class pages, but filters should favor:

- Topic
- Subtopic
- Concept
- Technique
- Difficulty
- Status / maturity where useful

Source/book filters should not be exposed publicly.

### 12.3 Problem detail

Remove public book/source lines and source-page references.

Keep:

- canonical classification;
- concepts;
- techniques;
- prerequisites;
- related Problems;
- difficulty profile;
- pedagogical content.

### 12.4 Source pages

Existing public source pages should be removed from primary navigation and ultimately removed or made non-public/internal-only once the Topic-first migration is complete.

Internal `problemSources`, TOCs, manifests, and audit mappings remain in repository infrastructure.

## 13. Public Content Schema Direction

Public Problem frontmatter should become source-neutral over time.

Current source fields such as:

- `originType`
- `source`
- `sourceSection`
- `sourceChapter`
- `sourceProblem`
- `sourceReference`

should no longer be required for public rendering.

The migration should not destroy auditability. Before removing or making these fields optional, the hidden coverage ledger must hold the equivalent source mapping.

The target public identity for a canonical Problem is its own canonical slug/ID plus topic/concept relationships—not the book that first seeded it.

## 14. Directory and Data Architecture

Recommended internal structure:

```text
src/data/quant-interview/
  topics/
    taxonomy.json
    source-topic-map.json
  coverage/
    green-book.json
    red-book.json
    150-most-frequently-asked.json
  sources/
    ... source verification / ingestion manifests ...
```

Exact paths may adapt to current repository conventions during implementation, but responsibilities must remain separated:

- **taxonomy** — canonical public organization;
- **source-topic map** — hidden TOC → topic routing;
- **coverage ledger** — hidden semantic completeness/dedup audit;
- **source manifests** — file identity / evidence / verification state.

Public Markdown content remains under existing `src/content/knowledge/` and `src/content/problems/`, but becomes source-neutral.

## 15. Topic Processing Protocol

For each canonical topic/subtopic batch, the Agent must:

1. Read repository handoff and protocol.
2. Select exactly one bounded canonical topic/subtopic workstream.
3. Resolve all three source TOC mappings for that workstream.
4. Read the relevant source material from every available verified source.
5. Inventory candidate concepts, techniques, problems, variants, and interview guidance.
6. Search existing Knowledge and Problems semantically before creating anything.
7. Build a temporary semantic equivalence / dedup map.
8. Update or create canonical Knowledge nodes first.
9. Create or enrich canonical Problems.
10. Merge alternative methods, pitfalls, and meaningful variants.
11. Update hidden coverage entries for every inspected source item.
12. Confirm no inspected item remains silently unaccounted for.
13. Run relationship validation and repository test/check/build gates.
14. Review the final diff for topic scope only.
15. Update Handoff with the next canonical topic workstream.

## 16. Dedup Review Safety

Automated similarity may propose duplicates, but final merge identity requires semantic review.

False merges are more damaging than temporary duplicates because they can erase a genuinely different reasoning pattern.

Therefore:

- high-confidence exact semantic duplicates may merge directly;
- near-duplicates must be compared on state, target, constraints, structure, and solution insight;
- uncertain cases remain separate with a `needs-review` relationship in the hidden ledger until resolved;
- no source item may disappear because an embedding/string score said it was similar.

## 17. Existing Q1/Q2/Q4/Q5 Migration

The already-created 150 Questions Problems are retained as canonical content candidates, not discarded.

During Topic-first migration:

- map each to canonical topics;
- move source provenance into the hidden coverage ledger;
- remove public page/source display;
- preserve or improve their independently written mathematical content;
- compare them against Green and Red questions when their canonical topic workstreams are processed;
- merge if cross-book equivalents are found;
- enrich with additional methods or variants if the other books provide them.

Existing Knowledge nodes such as no-arbitrage, option convexity, modular arithmetic, identity swapping, correlation matrices, and PSD matrices remain canonical reusable nodes and may be expanded during cross-book reconciliation.

## 18. Migration Sequence

The architecture should be implemented in bounded stages even though it belongs to one design.

### Stage A — Foundation

- migrate evidence model so overlapping internal page evidence is legal;
- formally verify Green and Red source identities/editions against supplied files;
- create canonical topic taxonomy;
- create hidden source-topic map schema;
- create hidden coverage-ledger schema and validator;
- update Agent Protocol / Handoff.

No large-scale content ingestion yet.

### Stage B — Public Topic-First Shell

- refactor Quant Interview landing page to Topic-first;
- remove Sources from primary public navigation;
- remove public source/page display from Problem detail;
- add Topic/Subtopic filtering to Problem Bank as needed;
- keep hidden source infrastructure intact.

### Stage C — Existing Content Migration

- classify current Knowledge and Q1/Q2/Q4/Q5 Problems into canonical topics;
- populate hidden ledger mappings;
- remove public source dependence from current problem schema/rendering;
- ensure all routes remain stable or intentionally redirected.

### Stage D — Cross-Book Ingestion

Process one canonical topic workstream at a time across all three books.

Recommended early workstreams should be chosen for ontology reuse and manageable scope, not by book order. Good candidates include:

- Linear Algebra → PSD / covariance / correlation matrices
- Logic → Modular Arithmetic
- Derivatives → No-Arbitrage / option properties
- Probability → Conditional Probability & Bayes

The exact first content workstream should be selected after the cross-book topic map is built.

## 19. Test Strategy

Required tests include:

### 19.1 Source isolation

- public Quant Interview landing page does not present books as primary hierarchy;
- Problem detail does not render source book, original question number, or original page number;
- Knowledge pages do not require source provenance.

### 19.2 Topic taxonomy

- every public canonical topic ID is unique;
- every source-topic mapping targets an existing canonical topic;
- taxonomy is acyclic / structurally valid;
- canonical topic slugs are stable.

### 19.3 Coverage ledger

- each coverage entry references a known internal source and mapped topic;
- absorbed entries have an explicit representation state;
- canonical Problem/Knowledge references resolve;
- no single source item is silently assigned incompatible terminal states;
- pending items remain explicitly pending rather than disappearing.

### 19.4 Evidence model

- evidence page ranges are valid;
- overlapping evidence across source items/workstreams is allowed;
- evidence metadata is not rendered publicly.

### 19.5 Deduplication integrity

- one canonical problem may absorb multiple source items;
- one source item maps to an explicit canonical representation;
- merged duplicates remain auditable in the ledger;
- variants can point to the same canonical problem without becoming duplicate public pages.

### 19.6 Existing behavior

- existing canonical Problem routes remain functional during migration;
- Knowledge reverse-links continue to work;
- tests/check/build remain green.

## 20. Verification Gates

Every implementation batch under this architecture must pass:

```bash
npm run test
npm run check
npm run build
```

In addition, topic ingestion batches must run coverage and relationship validation before completion.

No batch is complete merely because public content renders; the hidden coverage state for that batch must also reconcile.

## 21. Documentation and Agent Memory

Repository memory must be updated so future Agents understand:

- repository state wins over conversation memory;
- public organization is Topic-first;
- books are internal sources, not public hierarchy;
- all three books are processed together by canonical topic workstream;
- semantic deduplication is mandatory;
- source page numbers are internal evidence only;
- public Knowledge and Problems are source-neutral;
- hidden coverage provenance is mandatory and may not be deleted as “unused metadata”;
- a topic workstream is not complete until every inspected source item is reconciled in the ledger.

## 22. Non-Goals

This architecture does not require:

- reproducing book layouts;
- preserving source chapter order publicly;
- publishing copyrighted source text;
- publishing source PDFs;
- publishing original answer keys verbatim;
- creating one public page per source question;
- retaining duplicate story variants as independent Problems;
- exposing internal coverage or evidence metadata to end users.

## 23. Success Criteria

The architecture migration is successful when:

1. Quant Interview public navigation is Topic-first.
2. Books no longer define the public hierarchy.
3. Public Problems and Knowledge do not expose original book/chapter/question/page provenance.
4. Internal source identity and evidence remain auditable.
5. The repository has one canonical cross-book topic taxonomy.
6. Every source TOC section can be mapped into that taxonomy.
7. A hidden coverage ledger can account for every source item.
8. Canonical Problems can absorb equivalent questions from multiple books without duplication.
9. Canonical Knowledge can fuse explanations from multiple books into one complete entry.
10. Agent processing happens by canonical topic across all three sources.
11. Existing content is migrated rather than discarded.
12. Tests, Astro checks, and builds pass at each bounded implementation stage.
13. No completeness claim is made until the ledger demonstrates it.

## 24. Guiding Principle

The durable asset is neither a book transcription nor a list of interview answers.

It is a **canonical quantitative-interview knowledge graph** in which theory, techniques, and problems reinforce one another, while multiple books are treated as evidence sources used to improve coverage and quality.
