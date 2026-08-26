# Continue Quant Interview Extraction — Agent Task

## Objective

Continue building Lorien Lab's Topic-first Quant Interview Knowledge System from the three verified interview books. Process exactly one bounded canonical topic at a time, reconcile overlapping source material across all three books, publish independent source-neutral Knowledge and Problems, and preserve private evidence in the hidden repository layer.

Do not process one book from front to back. Do not copy source questions or answers. Do not infer whole-book completeness from a verified file, TOC, chapter map, or bounded workstream.

## Authoritative State

Repository state is authoritative; conversation history is not.

Before selecting or changing anything, read the current state from:

1. `docs/quant-interview/HANDOFF.md` — current bounded topic, completed workstreams, reservations, and factual verification evidence;
2. `docs/quant-interview/KNOWLEDGE_DIRECTORY.md` — generated public curriculum and internal extraction state;
3. `src/data/quant-interview/workstreams/*.json` — active and completed bounded workstreams;
4. `src/data/quant-interview/coverage/*.json` — item-level hidden coverage and semantic-dedup decisions;
5. `src/data/quant-interview/topics/source-topic-map.json` — source-section routing;
6. `src/data/quant-interview/topics/taxonomy.json` — canonical public Topic hierarchy;
7. `src/data/quant-interview/topics/knowledge-catalog.json` — canonical public-safe curriculum order.

If these disagree, stop and reconcile the repository rather than choosing the most convenient file.

If `KNOWLEDGE_DIRECTORY.md` or `knowledge-catalog.json` is absent, the Knowledge Directory feature has not been integrated on the current base. Do not invent a replacement list; finish or integrate `docs/superpowers/plans/2026-08-26-quant-interview-knowledge-directory.md` first.

## Verified Local Sources

The copyrighted PDFs are local inputs. They are not committed or published.

| Source | Edition | Windows path | SHA-256 |
|---|---|---|---|
| Green Book — *A Practical Guide to Quantitative Finance Interviews* by Xinfeng Zhou | First Edition (2008), 213 PDF pages | `D:\lorien-lab.github.io\docs\书籍\A Practical Guide To Quantitative Finance Interviews copy.pdf` | `89a637408fc57164c3ee4ef19fb36688a58dfb37b91ef1471d11df82d6d0e3f5` |
| Red Book — *Quant Job Interview Questions and Answers* by Mark Joshi, Nicholas Denson, Andrew Downes | Version 1.01 (2008), 329 PDF pages | `D:\lorien-lab.github.io\docs\书籍\Quant Job Interview Questions And Answers copy.pdf` | `09c5aac761bd71c4a6b9406f50dcfe73d8af3ce0a3ef9bb4fe2d65d0b27db6b1` |
| *150 Most Frequently Asked Questions on Quant Interviews* by Dan Stefanica, Rados Radoicic, Tai-Ho Wang | First edition (2013), 220 PDF pages | `D:\lorien-lab.github.io\docs\书籍\150_Most_Frequently_Asked_Questions_on_Quant_Interviews_(Dan_Stefanica,_Radiša_Radojičić_etc.)_(z-library.sk,_1lib.sk,_z-lib.sk) copy.pdf` | `d753f3516ce06d8e7242bcdd7252d39ffbc33f9217c6cf8a7e826b658b533e14` |

Under WSL the paths are the same beneath `/mnt/d/lorien-lab.github.io/docs/书籍/`.

Before using a source, recompute its SHA-256 and compare it with the manifest in `src/data/quant-interview/<source>.json`. A mismatch blocks source-derived work.

## Mandatory Startup

Read these files in order:

1. `docs/quant-interview/README.md`;
2. `docs/quant-interview/HANDOFF.md`;
3. this task document;
4. `docs/quant-interview/AGENT_PROTOCOL.md`;
5. `docs/quant-interview/CONTENT_STANDARD.md`;
6. `docs/quant-interview/SOURCE_CATALOG.md`;
7. `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`;
8. `docs/quant-interview/parallel-workstream-policy.json`;
9. the current or proposed workstream design and implementation plan.

Then:

- confirm the branch is not protected `main`;
- work in an isolated worktree;
- use Node 24;
- install locked dependencies with `npm ci`;
- run the existing baseline gates;
- verify the worktree is clean before authoring.

## Select One Bounded Workstream

Select exactly one canonical Subtopic or another explicitly approved bounded Topic. The selection must satisfy all of these conditions:

- it is the current serialized reservation in `HANDOFF.md`, or a newly approved reservation after the previous queue closes;
- its source sections are resolved through the source-topic map;
- existing coverage rows and public canonical identities have been inspected;
- it fits one design spec and one implementation plan;
- its ownership does not overlap an active candidate branch;
- any prerequisite workstream is already complete.

Do not reopen a completed workstream because adjacent source pages contain similar material. Record a genuine boundary correction through a new approved design.

## Source Audit

For the selected canonical topic:

1. collect every mapped section from Green, Red, and 150 Questions;
2. inspect the actual verified PDF pages, including surrounding context needed to identify the semantic task;
3. inventory concepts, techniques, distinct Problems, variants, hints, and guidance;
4. compare state, target, constraints, mathematical structure, and decisive insight across sources;
5. distinguish true duplicates from useful variants;
6. identify existing Knowledge or Problems that already own the semantic identity;
7. define explicit exclusions for adjacent topics;
8. propose an item-level coverage disposition for every inspected item.

Allowed terminal dispositions include repository-supported states such as `canonical-problem`, `merged-duplicate`, `variant`, `knowledge-only`, and `interview-guidance`. A terminal row needs a nonempty private resolution note and real canonical targets when the state requires them.

Physical evidence ranges may overlap. Semantic ownership may not be duplicated.

## Design and Approval Gate

Before implementation:

- write a bounded design spec under `docs/superpowers/specs/`;
- state exact Topic ids, source scopes, proposed Knowledge/Problem identities, semantic merges, exclusions, public metadata, relationship graph, and proposed shared-state deltas;
- separate candidate-owned files from coordinator-owned shared surfaces;
- review the spec for placeholders, contradictions, scope creep, and ambiguous ownership;
- obtain user approval of the written specification;
- write an implementation plan under `docs/superpowers/plans/` with RED/GREEN steps, exact files, exact tests, frequent commits, integration lifecycle, CI evidence, and closure procedure.

Source audit may precede approval. Public implementation may not.

## Public Authoring Contract

Author reusable Knowledge before creating Problems.

### Knowledge

Knowledge belongs under `src/content/knowledge/` and must:

- use one existing public type: `concept`, `paper`, `tool`, or `topic`;
- use exact parent-first `quantInterviewTopics`;
- teach a reusable concept or Problem Solving Technique;
- contain clear definitions, domain conditions, recognition signals, common mistakes, and visible `Interview Checks` when source material is closed as `knowledge-only`;
- link to real related Knowledge with `related` slugs;
- use `relatedNotes` only for real Note slugs;
- remain independently written and source-neutral.

### Problems

Problems belong under `src/content/problems/` and must:

- represent a genuinely distinct reasoning identity;
- use an independent formulation rather than source wording;
- remain source-neutral in title, `problemId`, frontmatter, route, and prose;
- include progressive hints and a complete independently derived solution;
- state assumptions, boundary conditions, failure modes, common mistakes, and meaningful variants;
- connect to canonical concepts, techniques, prerequisites, and related Problems;
- meet the current S3+ content standard and renderer-safety rules.

Do not create an artificial Problem page for interview guidance or a reusable concept. Do not create duplicate pages to represent different books.

## Candidate Ownership

A candidate branch owns only its approved module:

- candidate-created public Knowledge;
- candidate-created public Problems;
- module-specific tests;
- a report proposing shared-file deltas.

A candidate must not edit:

- `src/data/quant-interview/coverage/*.json`;
- `src/data/quant-interview/topics/source-topic-map.json`;
- exact global registry tests;
- `docs/quant-interview/HANDOFF.md`;
- workstream completion metadata;
- prior-workstream completion tests;
- CI workflows;
- coordinator-owned reciprocal links on pre-existing public pages.

After implementation and local verification, the candidate remains `active`; it cannot declare itself complete.

## Coordinator Ownership

The coordinator integrates one workstream at a time on the latest durable base. It owns:

- source-topic-map corrections;
- item-level coverage reconciliation;
- workstream manifest creation and lifecycle;
- reciprocal links on pre-existing public pages;
- exact global Knowledge/Problem enumeration;
- HANDOFF and lifecycle tests;
- temporary CI evidence scaffolding;
- factual completion metadata and queue advancement.

The coordinator ports reviewed candidate blobs or recreates approved content through the implementation plan. It never replaces newer shared files with candidate-base copies and never rewrites durable history.

## Knowledge Directory Updates

Every approved workstream must reconcile the curriculum catalog:

- add newly approved source-neutral modules as `planned` during the directory/design phase;
- change a module from `planned` to `published` only in the integration that adds its real Knowledge page;
- add newly discovered modules only after design approval;
- preserve exact Topic ownership, `learningOrder`, and prerequisite validity;
- never mark a module published merely because source coverage is terminal;
- regenerate the internal directory after catalog, public content, routing, coverage, or workstream changes.

Run:

```text
npm run knowledge:directory
npm run knowledge:directory:check
```

The public directory must remain free of private source and coverage data.

## Verification Gates

At each RED/GREEN task boundary, run the focused test named in the approved implementation plan.

Before candidate handoff and again before coordinator integration, run:

```text
npm run knowledge:directory:check
npm run test
npm run check
npm run build
git diff --check
```

Before factual closure:

1. keep the integrated manifest `active` without completion-only evidence;
2. run the ordered local gates in the environment required by the workstream plan;
3. obtain a successful GitHub Actions run for the exact active commit and confirm its `head_sha`;
4. remove temporary CI artifacts;
5. rerun final-tree gates;
6. record the real commit, run id, commands, conclusion, and environment;
7. change the manifest to `complete` only after strict lifecycle tests accept those facts;
8. update HANDOFF without inventing a later workstream.

Passing content tests alone does not close a workstream.

## Stop Conditions

Stop and report the blocker instead of guessing when:

- a PDF hash differs from its pinned manifest;
- the requested source page or section cannot be verified;
- the current workstream is not approved or conflicts with an active reservation;
- source evidence crosses the approved topic boundary;
- a candidate identity collides with existing canonical Knowledge or Problems and the design does not resolve it;
- a public page would need source names, copied text, or unsupported claims;
- the implementation requires editing a coordinator-owned shared surface from a candidate branch;
- an exact count, coverage, lifecycle, local gate, or CI assertion fails;
- the internal directory is stale;
- completion evidence does not belong to the exact active commit.

Do not weaken tests, lower exact counts to minimums, fabricate targets, or mark unresolved items complete to bypass a blocker.

## Final Report Contract

The candidate report contains:

- canonical Topic and bounded scope;
- exact implementation base and candidate commit SHA;
- created and modified public files;
- exact Knowledge and Problem delta;
- source-audit summary without copied source prose;
- proposed Green, Red, and 150 routing/coverage changes;
- semantic merges, variants, exclusions, and unresolved concerns;
- focused and full verification commands with results;
- proposed curriculum-catalog changes;
- confirmation that coordinator-owned files were not changed.

The coordinator closure report contains:

- workstream id and final scope;
- exact active CI-tested commit and GitHub Actions run id;
- exact local/CI environments and ordered successful commands;
- separate closure commit when required by the plan;
- exact public Knowledge/Problem registry after integration;
- exact source-row state distribution and real canonical targets;
- source-map repairs and no-change boundaries;
- internal directory regeneration result;
- confirmation that temporary CI artifacts are absent;
- HANDOFF current state and remaining queue.

Never report whole-book completeness unless a future approved bounded inventory explicitly supports that claim.
