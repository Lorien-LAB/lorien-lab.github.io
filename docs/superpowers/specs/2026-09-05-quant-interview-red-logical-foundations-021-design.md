# Red Logical Foundations 021 Design

**Date:** 2026-09-05
**Status:** Scope approved; awaiting written-spec review before implementation planning.

## Objective and Baseline

Resolve the next six pending master records in combined-directory order, publish three independently authored Problems, and reuse existing Knowledge. Base is local `main` at `13407930608c491fafe223d1691df10d108324b9`: 93 Problems, 59 Knowledge, 256 terminal and 494 pending records. The first pending key is `red-book::8::theory`; no 021 workstream is currently active.

## Scope and Alternatives

The selected six-record batch preserves queue order and ends before `red-book::8::8.11`. A whole-chapter batch would mix later geometry, differential equations, physics, and epistemic puzzles; an introduction-only batch would leave all concrete questions pending. Neither alternative is selected. All three actual questions become standalone Problems; chapter introductions and the repeated-question index do not generate artificial Problems or new Knowledge nodes.

Workstream id: `logic-brainteasers-discrete-reasoning-red-logical-foundations-021`. Candidate branch: `codex/quant-interview-red-logical-foundations-021`. Public delta: exactly **+3 Problems / +0 Knowledge**.

## Exact Ordered Dispositions

| Master key | Terminal state | Public targets |
|---|---|---|
| `red-book::8::theory` | `knowledge-only` | Existing `small-cases-recurrence-and-structural-simplification`, `constraint-reframing-and-latent-state` |
| `red-book::10::theory` | `interview-guidance` | None |
| `red-book::10.2::theory` | `interview-guidance` | None |
| `red-book::8::8.1` | `canonical-problem` | `clock-hand-angles-and-relative-motion` |
| `red-book::8::8.4` | `canonical-problem` | `shortest-path-on-cube-surface` |
| `red-book::8::8.9` | `canonical-problem` | `alternating-geometric-resource-allocation` |

The split is exactly 3 canonical Problems, 1 Knowledge-only introduction, and 2 non-public guidance/index records. Chapter 8's introductory advice is already taught by the named methods; resolving that row does not claim coverage of its questions. Chapter 10 introduces a revision shortlist, and 10.2 repeats questions with references to their original solutions. Their index-level disposition must not mark any referenced question, chapter, or topic complete. Preserve all repeated-question item rows and their current states.

## Three Public Problems

### Clock Hand Angles and Relative Motion

Slug: `clock-hand-angles-and-relative-motion`; id: `logic-logical-deduction-012`; file: `src/content/problems/logic/clock-hand-angles-and-relative-motion.md`. Use an ideal continuously moving 12-hour clock. Derive minute-hand and hour-hand positions, normalize modulo 360 degrees, and take the smaller angular separation. Establish 7.5 degrees at 3:15 and 37.5 degrees at 4:15. Extend the solved reasoning to the adjacent hand-coincidence times around 3:15 using relative speed 5.5 degrees per minute; specify the interval and time units. Link to `logical-deduction-constraint-propagation-and-case-elimination` and `small-cases-recurrence-and-structural-simplification`.

### Shortest Path on a Cube Surface

Slug: `shortest-path-on-cube-surface`; id: `logic-logical-deduction-013`; file: `src/content/problems/logic/shortest-path-on-cube-surface.md`. Explicitly constrain travel to the surface of a unit cube between opposite vertices. A valid unfolded path has length sqrt(5). Give both a feasible path and a global minimality argument accounting for alternative face routes; exhibiting one rectangle alone is insufficient. Distinguish edge-only travel (3) and unconstrained interior travel (sqrt(3)) without mixing their models. Link to `constraint-reframing-and-latent-state` and `logical-deduction-constraint-propagation-and-case-elimination`. No new site component or layout is needed.

### Alternating Geometric Resource Allocation

Slug: `alternating-geometric-resource-allocation`; id: `logic-logical-deduction-014`; file: `src/content/problems/logic/alternating-geometric-resource-allocation.md`. Two participants alternate taking half of the remaining unit resource. Derive shares 2/3 and 1/3 and prove the remainder tends to zero. Retain the source's generalization by allowing the first participant to take fraction a and the second fraction b of the current remainder, with 0 < a,b < 1. Derive round ratio r=(1-a)(1-b), shares a/(1-r) and (1-a)b/(1-r), and remainder r^N after N complete rounds. Link to `positive-series-convergence` and `small-cases-recurrence-and-structural-simplification`; do not create another geometric-series Knowledge node.

Every Problem must have independently worded, source-neutral metadata and prose; explicit assumptions; two progressive hints; a disclosure-contained complete solution; significance, mistakes, and extensions. Do not expose answers before the hints. Counts, titles, slugs, and ids must not encode book identity. Related-Problem links should connect these three pages only where mathematically meaningful; no unrelated reciprocal edits.

## Topic Ownership and Data Changes

Keep all six master keys, item kinds, primary topics, sort keys, source identities, and queue positions unchanged. Do not relocate items merely to group this batch. Clock and cube questions use public topics `logic-brainteasers-discrete-reasoning` and `logical-deduction`. The allocation question additionally uses `calculus-differential-equations` and `limits-derivatives`, with an explicit nonempty item-level override reason identifying infinite geometric sums and the zero-remainder limit.

Update the three existing Red coverage rows `(8,null)`, `(10,null)`, `(10.2,null)`. Add the three currently absent coverage rows `(8,8.1)`, `(8,8.4)`, `(8,8.9)`; never duplicate an existing key. Clock/cube coverage may refine the mapped Logic parent to `logical-deduction`; allocation coverage uses `logical-deduction` plus `limits-derivatives` with the justified override. Retain existing mapped topics for the three section-level rows. Mirror states, targets, and distinct resolution notes into exactly the six master rows, each owned by 021. Guidance rows have no canonical targets. Do not change validators, taxonomy, source-topic map, dependencies, or Knowledge catalog membership.

## Source Evidence and Two Page Repairs

The prior source audit visually inspected the supplied Red PDF pages 287-293, 295-296, and 317-320. Printed-page numbers differ from PDF positions. All evidence here uses PDF positions.

- `red-book::8::theory`: narrow `questionPages` from 287-309 to 287 only, where the methodology introduction appears.
- `red-book::10.2::theory`: narrow `questionPages` from 317-320 to 317-318. Page 319 is bibliography; page 320 is blank.
- Preserve chapter-10 introduction at 317; Q8.1 question/solution at 288/291; Q8.4 at 288/292-293; Q8.9 at 288/295-296. All other page arrays, including every `solutionPages` array, remain unchanged.

These are master-item evidence repairs, not changes to the printed TOC. Keep source bytes untracked and untouched. Test the exact two old-to-new page deltas against the 020 baseline and require all other 748 rows to be identical. Existing historical page-freeze tests must recognize only this explicit migration: validate repaired values, reverse exactly the two approved changes in a copy, then compare with their historical baseline. Do not simply replace old hashes, accept arbitrary current hashes, or weaken mutation tests. The existing regression hash is not a new security mechanism.

## Verification and Resume Design

Use the existing active/complete workstream schema, exact six-key ownership, and a small per-task ledger for restartability. No completion evidence may be prefilled. Keep old 001-020 manifests and immutable evidence intact. Update current-only corpus/next-pending/graph fixtures in the same integration task as their corresponding data and derived documents; do not demand a green global suite in an earlier task while postponing its required fixtures.

Tests must verify clock angles against independently computed continuous motion (including hour boundaries and wraparound), exact adjacent coincidence times, the cube path's endpoint/face legality and global lower bound, finite geometric partial sums/remainders and the unequal-fraction formula, complete source-neutral bodies on all three pages, exact six mirrored dispositions, absence of unintended completion in the repeated-question index, and the two-repair allowlist with negative mutations on both repaired and untouched records.

Run the standard five gates in order on the integrated active tree: `npm test`, `npm run knowledge:directory:check`, `npm run master:directory:check`, `npm run check`, `npm run build`. Follow the existing lifecycle for real immutable active-commit Windows, fresh WSL Node 24/LF, and matching GitHub CI evidence. Run Windows gates again after freezing the active commit so the proof actually names that HEAD. Remove any temporary workflow in its own commit before closing. Run final exact-head gates and one independent correctness/readability/scope review. Pin real SHA/run/URL values, never shapes alone. Push only the feature branch when required by this lifecycle; merging or pushing `main` requires a separate user choice.

## Final Contract and Non-Goals

Final corpus: **96 Problems / 59 Knowledge**. Final master state: **262 terminal / 488 pending** of 750. Next pending: **`red-book::8::8.11`**. Workstream 021 is complete with factual evidence and no temporary workflow; no bounded topic remains active. Workstream 022 is not started or authorized by this closure.

Do not ingest Q8.11 or any subsequent record, terminalize the ten repeated-question references, claim all of Red chapter 8/10 or Logical Deduction is covered, copy book prose, add new Knowledge merely to increase counts, redesign the site, refactor unrelated code, modify source files, or add security hardening. The immediate deliverable of this document is an approved specification; implementation planning starts only after the user reviews this written version.
