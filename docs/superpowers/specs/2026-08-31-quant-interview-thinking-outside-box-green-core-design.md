# Quant Interview Thinking Outside the Box Green Core 020 Design

**Date:** 2026-08-31
**Status:** Approved; implementation planning pending written-spec review

## Objective

Process the next eight consecutive master records, Green Book section 2.3, as bounded workstream 020. Publish one source-neutral Knowledge node and seven independently authored Problems, preserve the existing page evidence, and advance the combined queue to `red-book::8::theory` without absorbing later Logical Deduction material.

## Binding Decisions

- Scope exactly Green Book `2.3::theory` plus its seven labeled prompts on PDF pages 26–31.
- Publish all seven prompts as standalone Problems by explicit user choice, including the compact classic puzzles.
- Publish exactly one new Knowledge node for the section-level method: `constraint-reframing-and-latent-state`.
- Resolve the theory row as `knowledge-only` and all seven question rows as `canonical-problem`; use no `variant` or `merged-duplicate` state.
- Keep every public title, route, prompt, proof, example, and extension independently worded and source-neutral.
- Add item-level topic overrides only where the mathematical identity is unambiguous: box packing gains `invariants-state-transformations`; last-ball parity gains `invariants-state-transformations` and `modular-arithmetic`.
- Keep the other five records under `logical-deduction`; express their technique relationships through Knowledge links rather than speculative topic inflation.
- Apply no question-page or solution-page repair and preserve the complete ordered 750-row page projection.
- Do not modify taxonomy, source-topic map, layouts, filters, dependencies, source PDFs, or the interview guide.
- Do not process or imply completion of Red Book section 8 or any later queue record.

## Current Repository State

- Base branch: `main`.
- Base commit at design approval: `69c3127930697fd69cfe3e1bfecb2a0d8e66b41a`.
- Completed bounded workstream: `logic-brainteasers-discrete-reasoning-logical-deduction-green-core-019`.
- Public corpus: **86 Problems / 58 Knowledge**.
- Master directory: **248 terminal / 502 pending** out of 750 records.
- First pending record: `green-book::2.3::theory`.
- No bounded ingestion workstream is active.
- A read-only semantic scan found no exact public duplicate for any of the seven prompts.
- The three PDFs in `docs/书籍/` and `docs/量化实习_LeetCode与编程笔试面试备考指南.md` remain untracked source inputs.

## Alternatives Considered

### Selected: seven Problems plus one cohesive Knowledge node

This preserves every interview prompt as requested while giving the theory row a focused public target. One method page creates a coherent learning path without spreading section-level concepts across unrelated existing Knowledge.

### Rejected: seven Problems using only existing Knowledge

This is the smallest file delta, but it leaves the section-level theory record with no precise public method and makes the seven Problems appear as disconnected tricks.

### Rejected: seven Problems plus broad edits to several existing Knowledge nodes

Expanding Logical Deduction, Decision Trees, Modular Invariants, and Problem Framing would avoid a new node but widen the change surface and blur established module boundaries.

### Rejected: lower-depth prompts only as Knowledge checks

The previous S3 threshold would place the guards, last-ball, and switches prompts inside Knowledge. The user explicitly selected seven standalone Problems for this batch, so the implementation must raise their rigor through explicit models, proofs, assumptions, and extensions rather than omit their pages.

## Workstream Identity and Scope

- Workstream id: `logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020`.
- Primary canonical topic: `logical-deduction`.
- Parent topic: `logic-brainteasers-discrete-reasoning`.
- Source scope: Green Book section 2.3, evidence pages 26–31.
- Scope cardinality: exactly eight consecutive master keys in existing queue order.
- Public delta: exactly seven Problems and one Knowledge node.
- Candidate branch: `codex/quant-interview-thinking-outside-box-green-core-020`.
- Temporary CI: `.github/workflows/quant-interview-thinking-outside-box-green-core-020-temporary.yml`.

Public content contains canonical reasoning only. Source title, source section, page evidence, state, resolution notes, topic-override reasons, workstream lifecycle, and verification evidence remain internal repository data.

## Exact Source Dispositions

| Master key | Evidence | State | Canonical Problem | Canonical Knowledge |
|---|---:|---|---|---|
| `green-book::2.3::theory` | Q 26 | `knowledge-only` | None | `constraint-reframing-and-latent-state` |
| `green-book::2.3.box-packing::question` | Q 26–27 | `canonical-problem` | `pack-length-four-bricks-in-six-cube` | `constraint-reframing-and-latent-state`, `modular-invariants` |
| `green-book::2.3.calendar-cubes::question` | Q 27–28 | `canonical-problem` | `two-cube-calendar-digit-labeling` | `constraint-reframing-and-latent-state`, `logical-deduction-constraint-propagation-and-case-elimination` |
| `green-book::2.3.door-to-offer::question` | Q 28–29 | `canonical-problem` | `two-guards-one-question` | `constraint-reframing-and-latent-state`, `logical-deduction-constraint-propagation-and-case-elimination` |
| `green-book::2.3.message-delivery::question` | Q 29 | `canonical-problem` | `message-delivery-with-independent-padlocks` | `constraint-reframing-and-latent-state` |
| `green-book::2.3.last-ball::question` | Q 29–30 | `canonical-problem` | `last-ball-color-by-parity-invariant` | `constraint-reframing-and-latent-state`, `modular-invariants` |
| `green-book::2.3.light-switches::question` | Q 30–31 | `canonical-problem` | `four-switches-one-room-entry` | `constraint-reframing-and-latent-state`, `decision-trees-information-bounds-and-adaptive-testing` |
| `green-book::2.3.quant-salary::question` | Q 31 | `canonical-problem` | `private-average-with-canceling-mask` | `constraint-reframing-and-latent-state`, `problem-framing-clarification-assumption-management` |

No other coverage or master row may become terminal, receive 020 ownership, or change page evidence.

## Public Knowledge Design

### `constraint-reframing-and-latent-state`

**Title:** Constraint Reframing & Latent State

**Classification:**

- topics: `logic-brainteasers-discrete-reasoning`, `logical-deduction`
- primary topic: `logical-deduction`
- learning order: 30
- status: `published`
- prerequisites: `logical-deduction-constraint-propagation-and-case-elimination`

**Required content:**

1. Separate literal objects from the state variables that actually determine feasibility.
2. Change representation or granularity when volume, count, or direct questioning is too weak.
3. Search for latent observable state such as orientation, temperature, parity, or operation order.
4. Compose reversible operations and cancel temporary state without assuming commutativity when it is absent.
5. Distinguish a constructive witness from a necessity or impossibility proof.
6. State physical, information, and participant assumptions before claiming a protocol works.
7. Include a repeatable workflow, recognition signals, common mistakes, and at least six fresh executable Interview Checks that do not duplicate the seven public Problem prompts.
8. Link explicitly to Logical Deduction, Decision Trees, Modular Invariants, and Problem Framing while retaining a distinct representation-reframing purpose.

## Public Problem Design

Every Problem is independently worded, renderer-safe, source-neutral, and raised to the repository's full solved-page standard. Each includes Problem, Think Before Revealing, two progressive hints, Show Solution, Why This Problem Matters, Common Mistakes, and Extensions.

### 1. `pack-length-four-bricks-in-six-cube`

- Title: **Packing Length-Four Bricks in a Six-Cube**.
- Required model: determine whether 53 axis-aligned `1 x 1 x 4` bricks fit inside a `6 x 6 x 6` box without overlap or protrusion.
- Required proof: show why total volume is inconclusive, partition the box into 27 `2 x 2 x 2` cells, two-color the cells, and prove that every length-four brick consumes capacity from both colors while the smaller color class supports at most 52 bricks.
- Required extension: distinguish the necessary coloring obstruction from a constructive packing claim for smaller counts.

### 2. `two-cube-calendar-digit-labeling`

- Title: **Two-Cube Calendar Digit Labeling**.
- Required model: label six faces of each of two cubes so that their front faces can display every date `01` through `31`; cube order may be swapped and one symbol may be physically inverted.
- Required proof: derive the forced duplicate labels needed for `11` and `22`, justify a zero on each cube, explain the `6/9` dual use, provide one explicit labeling, and verify all dates rather than listing only representative cases.

### 3. `two-guards-one-question`

- Title: **Two Guards, Two Doors, One Question**.
- Required model: exactly one guard always tells the truth, one always lies, and exactly one door is desirable; one yes/no question may be asked to either guard.
- Required proof: formalize the nested question, give a complete truth table over guard type and guarded door, and prove the response rule selects the desirable door in every state.
- The page must state that the behavior assumptions are deterministic and common knowledge.

### 4. `message-delivery-with-independent-padlocks`

- Title: **Message Delivery with Independent Padlocks**.
- Required model: a courier may tamper with any unlocked box; sender and recipient each own a lock with a private key; the box can hold both independent locks simultaneously.
- Required proof: present the three-transit protocol, track the lock set after each transit, and prove the document is never courier-accessible.
- Required boundary: this is a confidentiality puzzle under the stated physical assumptions, not a claim of authentication, tamper evidence, or general cryptographic security.

### 5. `last-ball-color-by-parity-invariant`

- Title: **Last-Ball Color from a Parity Invariant**.
- Required model: repeatedly remove two balls; replace same-color pairs with blue and mixed pairs with red; analyze initial red counts 14 and 13.
- Required proof: write all three state transitions, prove red-count parity is invariant, use termination at one ball, and derive blue for even initial red count and red for odd initial red count. Randomness must be shown irrelevant to the conclusion.

### 6. `four-switches-one-room-entry`

- Title: **Four Switches with One Room Entry**.
- Required model: four outside switches, one inside bulb, exactly one controlling switch, arbitrary outside toggling, and a single room entry; the bulb's current light state and reliable hot/cold history are observable.
- Required proof: encode four candidates by the two binary observations, give an executable switching schedule, map all four observation pairs to switches, and explain why zero entries cannot identify the controller.
- The physical assumptions around heating, cooling, and observation timing must be explicit.

### 7. `private-average-with-canceling-mask`

- Title: **Private Average with a Canceling Mask**.
- Required model: eight honest, non-colluding participants pass a private running total around a ring; only the first participant knows a random additive mask; the final aggregate average is public.
- Required proof: give the protocol, express every message algebraically, show the mask cancels exactly, and prove correctness of the aggregate.
- Required privacy boundary: explain what a single participant observes and why the protocol does not claim protection against collusion, side information, dishonest inputs, or a participant revealing messages.

## Topic and Graph Rules

- Register the new Knowledge at learning order 30 after the two 019 Logical Deduction modules.
- Add reciprocal Knowledge relations only where they improve navigation: Logical Deduction, Decision Trees, Modular Invariants, and Problem Framing.
- Each Problem links to the exact Knowledge targets in the disposition table; related Problems may link only when the relationship is semantic and reciprocal where project convention requires it.
- Box packing receives canonical topics `logical-deduction` and `invariants-state-transformations` with a nonempty item-level override reason.
- Last-ball parity receives `logical-deduction`, `invariants-state-transformations`, and `modular-arithmetic` with a nonempty item-level override reason.
- Calendar cubes, guards, padlocks, switches, and private average retain `logical-deduction` as their source-record topic. Their public Problem frontmatter may name technique Knowledge without changing source ownership.
- Do not edit the protected source-topic map.

## Source Evidence and Page Freeze

The Green PDF is image-only in this range. Visual inspection verified PDF pages 26–31 and the page-31 transition into section 2.4. The stored ranges are correct:

- theory 26;
- box packing 26–27;
- calendar cubes 27–28;
- door to offer 28–29;
- message delivery 29;
- last ball 29–30;
- light switches 30–31;
- quant salary 31.

All solution text is inline on the recorded question pages, so the existing empty `solutionPages` arrays remain unchanged. Tests must freeze the complete ordered 750-row `{key, questionPages, solutionPages}` projection against the pre-020 literal hash. Rendered pages, OCR output, and other extraction artifacts remain untracked and absent from the final branch.

## Data Flow and Lifecycle

1. Add focused failing tests for the Knowledge page, seven Problems, catalog graph, exact eight-row workstream, source neutrality, and page freeze.
2. Publish and register the Knowledge page and seven Problem pages with the minimum content needed to satisfy those behavioral tests.
3. Create active workstream manifest `logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020` with exact scope and no fabricated verification evidence.
4. Update exactly eight Green coverage rows and their mirrored master items.
5. Generate the Knowledge directory and active HANDOFF state; preserve simple checkpointing through manifest status, exact scope, and committed task ledger.
6. Run the ordered local gates, then record only factual immutable verification evidence through the existing lifecycle pattern.
7. Remove any temporary CI workflow before final closure, regenerate derived documents, run final review, and leave the next pending record untouched.

Exact ordered local gates:

1. `npm test`
2. `npm run knowledge:directory:check`
3. `npm run master:directory:check`
4. `npm run check`
5. `npm run build`

## Behavioral Test Design

### Knowledge and catalog

- Verify exact frontmatter, headings, learning order, prerequisite, reciprocal relations, and source neutrality.
- Require at least six fresh self-contained Interview Checks and reject copied versions of the seven Problem prompts.
- Require the method workflow to cover representation, latent state, reversible operations, assumptions, witness construction, and impossibility proof.

### Problem behavior

- Box packing: independently compute the 14/13 cell coloring, prove each axis-aligned length-four brick spans both colors, and require the capacity bound 52.
- Calendar cubes: programmatically generate every display from `01` through `31` from the published labels, including the `6/9` inversion rule; mutation of a forced label must fail.
- Guards: evaluate all four truth/lie-door states and require the published response rule to select the correct door.
- Padlocks: execute the published lock-state transitions and require every courier transit to contain at least one lock whose key the courier lacks.
- Last ball: enumerate legal transitions for small states, verify red parity preservation, and require the two stated initial cases.
- Switches: execute the schedule, require four distinct observation signatures, and map each signature to exactly one switch.
- Private average: evaluate symbolic or numeric masked messages, require exact aggregate recovery, and require explicit non-collusion and threat-boundary language.

### Hidden data and completion

- Verify exact eight keys, 7/1 state split, targets, notes, two approved override rows, and master/coverage consistency.
- Verify full pre-020 page-projection hash with zero allowed changes.
- Verify exact **93 Problems / 59 Knowledge**, **256 terminal / 494 pending**, and `red-book::8::theory` as the first pending record.
- Verify active/complete HANDOFF wording, lifecycle evidence rules, temporary-workflow removal, and absence of 021 artifacts.

## Error and Regression Boundaries

Fail closed on:

- any missing, extra, reordered, or renamed scope key;
- a disposition other than seven `canonical-problem` plus one `knowledge-only`;
- any public target outside the approved table;
- an override on an unapproved row or a missing/blank reason on either approved row;
- any page-range mutation anywhere in the master directory;
- any source title, section label, page number, copied wording, or provenance in public content;
- a packing argument based only on volume;
- a calendar labeling that is not verified for all 31 dates;
- a guard answer without full state coverage;
- a padlock protocol that exposes an unlocked courier transit;
- a parity conclusion without all legal transition cases;
- a switch schedule with ambiguous observation signatures or unstated thermal assumptions;
- a private-average page that overclaims collusion resistance or security outside its model;
- stale 019-current wording, premature completion evidence, temporary workflow residue, or any 021 artifact;
- tracked PDFs, rendered pages, OCR files, guide, dependencies, or unrelated refactors.

## Final State Contract

- Public corpus: exactly **93 Problems / 59 Knowledge**.
- 020 scope: exactly eight terminal Green records in a 7 `canonical-problem` / 1 `knowledge-only` split.
- Master directory: exactly **256 terminal / 494 pending**.
- First pending record: exactly `red-book::8::theory`.
- Workstream 020: complete with factual verification evidence only.
- Current bounded topic: none.
- Workstream 021: absent and unauthorized.
- Temporary workflow: absent.
- All 750 page-range projections: unchanged from pre-020.
- Source PDFs and interview guide: untracked and unmodified.

## Non-Goals

- Do not process Red Book section 8, Red Book section 10, 150 Questions, Green Book 2.4, or any later row.
- Do not claim Logical Deduction, the parent topic, or any source book is complete.
- Do not merge any of the seven prompts merely because it shares a technique or parity vocabulary with an existing page.
- Do not add high-security mechanisms, hashes, signatures, audit systems, authentication claims, or tamper-proofing. The existing deterministic page-projection hash remains a regression fixture, not security hardening.
- Do not redesign routes, layouts, filters, navigation, or rendering components.
- Do not opportunistically rewrite the 019 pages or unrelated Knowledge.
- Do not start workstream 021.

## Implementation Boundary

This design authorizes implementation planning for workstream 020 only after the committed written spec receives explicit user approval. The plan must use an isolated worktree, strict TDD, behavioral tests for every puzzle proof and protocol, simple manifest/ledger checkpointing, task-level independent reviews, one whole-branch final review, fresh final gates, and the standard three-option integration handoff.
