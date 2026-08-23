# Quant Interview Parallel Workstream Governance — Design Spec

**Date:** 2026-08-23
**Status:** Approved (consistency-corrected 2026-08-23; approval remains in force)
**Pre-governance content base:** `18879f087cd344e10e8fbe6aeb585774438a579d`
**Protected branch:** `main` must not be modified

**Amendment:** This is a consistency correction, not a design reversal. It removes contradictory candidate shared-file permissions while preserving the approved coordinator-only shared-state intent.

## 1. Goal

Allow several bounded canonical-topic workstreams to be developed at the same time without weakening the Topic-first source audit, semantic ownership, exact corpus regression, CI evidence, or HANDOFF truthfulness established by workstreams 001–010.

Parallelism applies to isolated module development. Global repository closure remains serialized.

## 2. Why the execution model must change explicitly

The current protocol says to process one bounded canonical topic at a time. That rule protected shared coverage ledgers, source-topic routing, exact corpus counts, and HANDOFF while all work happened on one branch.

The requested execution model allows up to three isolated module candidate branches/worktrees to be active at once. Treating those branches as if each were the only active workstream would create four predictable failures:

1. competing workstream ordinals;
2. conflicting edits to shared coverage and routing files;
3. mutually incompatible exact Problem/Knowledge totals;
4. several branches independently claiming to be the current HANDOFF truth.

The replacement invariant is therefore:

> Develop bounded modules concurrently in isolated worktrees; integrate, verify, close, and advance shared repository truth one workstream at a time through a single coordinator.

## 3. Considered execution models

### 3.1 Fully serial workstreams

This preserves the current protocol without amendment and minimizes merge conflicts, but it does not satisfy the requested parallel module execution.

### 3.2 Shared-branch parallel editing

Several agents edit the same checkout and branch. This is rejected because coverage ledgers, exact slug regressions, workstream numbering, and HANDOFF are shared mutable state. A clean final diff would not prove which agent's semantic decisions survived.

### 3.3 Isolated parallel development with serialized closure

This is the approved model. Each module has its own branch and worktree. Module-local work proceeds concurrently, while a coordinator owns shared-state reconciliation and final completion evidence.

## 4. Roles and authority

### 4.1 Coordinator

The coordinator is the sole owner of:

- workstream ordinal reservation;
- the durable integration base;
- cross-module source-row ownership adjudication;
- semantic reconciliation of `coverage/*.json`;
- semantic reconciliation of `source-topic-map.json`;
- exact global Problem and Knowledge regression totals;
- the authoritative `docs/quant-interview/HANDOFF.md` state;
- completion metadata and final real-CI evidence;
- integration order and final topic-only diff review.

The coordinator does not let one module's branch overwrite another module's shared-file changes through force push, blind checkout, or conflict-resolution-by-file replacement.

### 4.2 Module agent

Each candidate branch owns exactly one approved module in one isolated worktree. Module implementation may not begin until its written module design spec is approved. Design and source audit may precede approval.

During implementation, a candidate branch may implement only module-scoped public Knowledge/Problem content plus module-specific tests explicitly allowed by that approved module spec. It may also record local test, check, and build evidence in its report.

Candidate agents must not edit shared coverage, source-topic map, exact global-registry/count regressions, HANDOFF, workstream/completion metadata, or CI workflow paths. Candidates hand the coordinator precise proposed shared-file deltas in their reports.

A module agent must not:

- change `main`;
- reuse another module's worktree or branch;
- reserve or rename another workstream ID;
- mark its workstream `complete` before coordinated integration;
- make its branch's HANDOFF or exact global totals authoritative for another branch;
- force-update shared history.

### 4.3 Reviewer

Every module task receives an independent specification-and-quality review. Reviewer findings are resolved on the module branch before it enters the integration queue. A module agent's self-review is not a substitute for independent review.

## 5. First parallel wave

The coordinator reserves the following workstream identities:

| Ordinal | Canonical topic | Branch |
|---:|---|---|
| 011 | `random-walks-markov-chains` | `chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23` |
| 012 | `limits-derivatives` | `chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23` |
| 013 | `reasoning-communication` | `chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23` |

Reservation prevents numeric collisions; it does not create manifests or imply completion. Each actual workstream ID is frozen in its approved module design spec before implementation.

The three topics are in separate domains and have no hard mathematical dependency on one another. Random Walks remains the authoritative current topic and enters the integration queue first.

## 6. Source-evidence gate

Module design may use repository taxonomy, TOCs, mappings, prior workstream boundaries, and existing content for exploration. It may not freeze item identities, evidence ranges, terminal coverage rows, or exact public-page counts without inspecting the edition-pinned source bytes.

The required source identities are:

- Green Book: `sha256:89a637408fc57164c3ee4ef19fb36688a58dfb37b91ef1471d11df82d6d0e3f5`;
- Red Book: `sha256:09c5aac761bd71c4a6b9406f50dcfe73d8af3ce0a3ef9bb4fe2d65d0b27db6b1`;
- 150 Questions: `sha256:d753f3516ce06d8e7242bcdd7252d39ffbc33f9217c6cf8a7e826b658b533e14`.

A similarly titled file with a different hash is not interchangeable evidence. If the verified bytes are unavailable, module agents stop at design-audit status and do not author source-derived content.

## 7. Branch and worktree topology

All three module worktrees start from the same frozen post-governance durable base commit. The pre-governance content base is `18879f087cd344e10e8fbe6aeb585774438a579d`; module worktrees are not created until the approved governance change has been integrated on top of that commit. No module branch starts from another unfinished module branch.

Each module branch contains one bounded topic. Within a module, implementation tasks remain ordered Knowledge-first and RED→GREEN. Across modules, those ordered task streams may run concurrently.

Before module implementation begins, each worktree must have:

1. the expected branch and base commit;
2. a clean status;
3. dependencies installed from the existing lockfile;
4. a passing baseline `npm run test`;
5. an independent progress ledger tied to that module's implementation plan.

## 8. Shared-file policy

The following are coordinator-only integration hotspots:

- `src/data/quant-interview/coverage/green-book.json`;
- `src/data/quant-interview/coverage/red-book.json`;
- `src/data/quant-interview/coverage/150-most-frequently-asked.json`;
- `src/data/quant-interview/topics/source-topic-map.json`;
- `tests/quant-interview-source-neutral-content.test.mjs`;
- `tests/quant-interview-handoff.test.mjs`;
- prior completion tests that encode the next action;
- `docs/quant-interview/HANDOFF.md`;
- reciprocal links in pre-existing shared Knowledge or Problem pages.

Candidate agents do not modify these files. They record precise proposed shared-file deltas in their reports, and the coordinator applies or semantically reconciles those proposals against the latest durable base. Whole-file replacement from an older branch is forbidden.

## 9. Count contracts

The durable starting corpus is exactly 59 Problems and 39 Knowledge nodes.

Exploration currently suggests these provisional deltas:

| Workstream | Problem delta | Knowledge delta |
|---|---:|---:|
| 011 Random Walks & Markov Chains | +4 | +2 |
| 012 Limits & Derivatives | +7 | +4 |
| 013 Reasoning & Communication | +0 | +2 |
| **Combined provisional delta** | **+11** | **+8** |

If all three evidence reviews confirm those identities, serialized integration produces:

1. after 011: 63 Problems / 41 Knowledge;
2. after 012: 70 Problems / 45 Knowledge;
3. after 013: 70 Problems / 47 Knowledge.

These are not quotas. Source inspection or semantic deduplication may change a module delta. Every candidate report records its proposed additive delta, while the coordinator updates the absolute exact regression at integration time. Exact slug enumeration must never be weakened to a lower-bound assertion.

## 10. Workstream status and completion

An isolated module branch remains `active` even after its module-local implementation and CI are green. It becomes eligible for the integration queue only after its task reviews and whole-branch review are clean.

Only the coordinator may change `status` to `complete`, and only after:

1. rebasing or reconciling the module against the latest durable base;
2. resolving every shared source row and graph link;
3. updating exact global slug sets and counts;
4. running `npm run test`, `npm run check`, and `npm run build` on the integrated commit;
5. obtaining a real successful CI run for that exact commit;
6. recording the real 40-character commit and positive CI run ID;
7. updating HANDOFF with factual current and queued state;
8. removing temporary CI scaffolding;
9. running fresh closure verification on the final clean tree.

Parallel development therefore never creates several simultaneously authoritative `complete` states from divergent bases.

## 11. Integration queue

The initial queue is 011, then 012, then 013. The coordinator serializes reconciliation, integration, and closure in the order 011 → 012 → 013 on the latest durable base and updates shared files.

For each queued module, the coordinator:

1. reviews its topic-only diff and review ledger;
2. reconciles source-row ownership against all earlier integrations;
3. ports module-local changes without discarding newer shared state;
4. reruns targeted and global tests;
5. obtains real CI evidence and seals the workstream;
6. advances the durable base before integrating the next module.

If a later module depends on a finding from an earlier module, it remains active but cannot enter closure until the dependency is integrated.

## 12. First-wave module boundaries

### 12.1 Random Walks & Markov Chains

This remains first in the queue. It owns finite-state transition machinery, random walks, state compression, hitting and absorption recursions, and bounded Markov-chain interview problems. It reuses conditioning, conditional expectation, and first-step analysis without reopening their prior workstreams. Martingales, Brownian motion, Itô calculus, SDEs, branching, reinforcement, and dynamic programming remain outside 011.

### 12.2 Limits & Derivatives

This owns single-variable limits, asymptotic comparisons, differentiation rules, related rates, elementary extrema/inflection analysis, and bounded deterministic convergence material supported by the verified sources. Integration, multivariable calculus, Taylor/Newton methods, ODEs, complex analysis, and Black–Scholes/PDE material remain outside 012.

### 12.3 Reasoning & Communication

This owns reusable interview techniques for problem framing, assumption management, and structured think-aloud reasoning. It does not absorb interview preparation, interview formats, behavioral questions, puzzle-solving identities, or generic technical Problems. The expected public shape is reusable Knowledge with visible practice checks, not artificial non-mathematical Problem pages.

## 13. Failure rules

### Source mismatch

If a file's cryptographic identity differs from the pinned manifest, do not use it to freeze evidence or coverage.

### Semantic collision

If a proposed Problem is already owned by an existing canonical page, merge or record a variant instead of preserving a planned page count.

### Cross-module ownership collision

The coordinator stops both conflicting closure paths, selects one semantic owner, and updates both module designs or ledgers consistently.

### Base drift

Rebase or port the later module semantically. Never resolve by replacing the current shared file with an older branch copy.

### Verification failure

Keep the workstream active. Do not write success metadata, advance HANDOFF, or claim completion.

### Integration rollback

Before integration, leave the candidate branch unmerged. After integration, use a corrective commit; do not rewrite durable shared history.

## 14. Success criteria

This governance change is successful when:

- three module worktrees can develop independently from the same verified base;
- each branch contains only one bounded canonical workstream;
- source-derived design is frozen only from hash-matching private evidence;
- shared files have one coordinator and one serialized integration history;
- exact corpus regressions remain exact after every integration;
- no divergent branch falsely claims authoritative completion;
- `main` remains untouched;
- each sealed workstream has fresh local and real CI evidence for the exact integrated commit.

## 15. Governance implementation scope

After this written spec is approved, its implementation plan must update the repository protocol before any module product work begins. The bounded governance change includes:

- amending `docs/quant-interview/AGENT_PROTOCOL.md` so one branch still owns one bounded topic while up to three isolated topic branches may be active;
- amending `docs/quant-interview/HANDOFF.md` to distinguish the authoritative integration queue from non-authoritative active candidates;
- adding strict tests for coordinator-only ordinal reservation, shared-file ownership, active-versus-complete status, and serialized HANDOFF closure;
- documenting the first-wave ordinal reservations without creating product manifests early;
- running `npm run test`, `npm run check`, and `npm run build` and integrating the governance commit into the durable base.

This governance change contains no Knowledge, Problem, source coverage, source-topic mapping, or workstream completion edits.

## 16. Next gate

Obtain access to the three hash-matching private source files. Then write and review three separate module design specs from the completed repository audits, followed by one implementation plan per module. Only after those written specs and plans are approved may the three isolated implementation streams begin.
