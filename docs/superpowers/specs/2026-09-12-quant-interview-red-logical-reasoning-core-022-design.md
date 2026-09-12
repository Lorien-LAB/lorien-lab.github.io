# Red Logical Reasoning Core 022 Design

**Date:** 2026-09-12
**Status:** Scope approved; awaiting written-spec review before implementation planning.

## Objective and Baseline

Resolve the next six pending master records in combined-directory order: Red Book items 8.11, 8.15, 8.16, 8.18, 8.20, and 8.22. Publish five independently authored Problems, add two reusable Knowledge nodes, expose the nine-object scale prompt as a tested variant of the existing canonical balance-diagnosis page, and stop before the 150-question source.

Base is local `main` at `e81acf8e3248740685979bdaf9fbaf0ac45719f1`: 96 Problems, 59 Knowledge, 262 terminal and 488 pending records. First pending is `red-book::8::8.11`; no 022 workstream is active.

## Scope Choice

The selected mixed approach avoids a redundant standalone page for the nine-object one-heavy scale prompt while retaining all six questions publicly. Creating six standalone Problems would duplicate the stronger twelve-object heavy-or-light decision-tree page. Reducing several questions to short Knowledge checks would underrepresent the snow-removal model, displacement argument, common-knowledge induction, and central-symmetry construction.

Workstream id: `logic-brainteasers-discrete-reasoning-red-logical-reasoning-core-022`. Candidate branch: `codex/quant-interview-red-logical-reasoning-core-022`. Public delta: exactly **+5 Problems / +2 Knowledge**.

## Exact Dispositions

| Master key | State | Canonical Problem | Canonical Knowledge |
|---|---|---|---|
| `red-book::8::8.11` | `canonical-problem` | `snow-removal-start-time-from-distance-ratio` | `constraint-reframing-and-latent-state` |
| `red-book::8::8.15` | `canonical-problem` | `falsifying-a-one-way-card-rule` | `conditional-implication-contrapositive-and-falsification` |
| `red-book::8::8.16` | `variant` | `twelve-object-balance-scale-diagnosis` | `decision-trees-information-bounds-and-adaptive-testing` |
| `red-book::8::8.18` | `canonical-problem` | `anchor-overboard-water-level` | `constraint-reframing-and-latent-state` |
| `red-book::8::8.20` | `canonical-problem` | `public-announcement-departure-day` | `common-knowledge-and-iterated-reasoning` |
| `red-book::8::8.22` | `canonical-problem` | `bisecting-a-rectangular-frame-with-one-line` | `constraint-reframing-and-latent-state` |

The exact split is five `canonical-problem` and one `variant`. Add six currently absent Red coverage tuples `(8,8.11)`, `(8,8.15)`, `(8,8.16)`, `(8,8.18)`, `(8,8.20)`, `(8,8.22)` and mirror all dispositions, ordered targets, distinct notes, and 022 ownership into exactly six master rows. Do not change any other pending state.

## Knowledge Design

### Conditional Implication, Contrapositive & Falsification

Slug: `conditional-implication-contrapositive-and-falsification`; primary topic `logical-deduction`; learning order 40; prerequisite `logical-deduction-constraint-propagation-and-case-elimination`.

Teach `P -> Q`, the equivalent contrapositive `not Q -> not P`, and the non-equivalent converse/inverse. Convert universal implication testing into a search for the counterexample state `P and not Q`. Separate confirming examples from falsifying tests, specify which hidden states must be inspected, and include at least six self-contained Interview Checks with concrete propositions and observable candidates.

### Common Knowledge & Iterated Reasoning

Slug: `common-knowledge-and-iterated-reasoning`; primary topic `logical-deduction`; learning order 50; prerequisite `logical-deduction-constraint-propagation-and-case-elimination`.

Distinguish mutual knowledge from common knowledge, model a public announcement as an update to every participant's information partition, and explain why observed non-actions are later public evidence. Provide the base case, induction hypothesis, induction step, timing convention, and assumptions needed for coordinated conclusions. Include at least six self-contained, harmless Interview Checks that do not reproduce the public departure Problem.

Both pages remain source-neutral and use reciprocal `related` edges only with existing Knowledge modules. Their Problem consumers reference them through `concepts`. The new departure Problem and existing `public-announcement-candidate-elimination` Problem link reciprocally through `relatedProblems`; no Knowledge slug is placed in a Problem relation field and no Problem slug is placed in a Knowledge relation field. Add only necessary graph edges and exact catalog entries; do not rewrite existing Knowledge bodies.

## Problem Design

Every Problem uses source-neutral metadata, assumptions, two progressive hints, a complete disclosure-contained solution, Why This Problem Matters, Common Mistakes, and Extensions. No solution result or decisive construction appears before disclosure.

### Snow-Removal Start Time from a Distance Ratio

Slug `snow-removal-start-time-from-distance-ratio`; id `logic-logical-deduction-015`. A vehicle begins at noon; snow began `x>0` hours before noon; clearing speed at elapsed snow time `t` is `k/t`. The noon-to-1pm distance is twice the 1pm-to-2pm distance. Integrate both intervals, cancel `k`, derive `(x+1)/x=((x+2)/(x+1))^2`, reject the negative root, and obtain `x=(sqrt(5)-1)/2` hours before noon. Include numerical clock interpretation only after the exact solution. Public topics additionally include `calculus-differential-equations` and `ordinary-differential-equations`, with an item-level override reason identifying a reciprocal-rate accumulation model.

### Falsifying a One-Way Card Rule

Slug `falsifying-a-one-way-card-rule`; id `logic-logical-deduction-016`. Use four neutral cards showing `7`, `6`, `A`, and `C`, with one visible symbol per card and a hidden symbol on the reverse. Test the universal rule “vowel implies even.” State the letter/number-on-opposite-sides assumption explicitly. Prove that `A` and `7` are necessary and sufficient inspections; explain why `6` confirms nothing and `C` is outside the antecedent. Link to the new conditional-logic Knowledge.

### Anchor Overboard and Water Level

Slug `anchor-overboard-water-level`; id `logic-logical-deduction-017`. Model a floating boat carrying a dense, fully submersible anchor of mass `m` and density `rho_a > rho_w`. Compare displaced water volume `m/rho_w` while carried with anchor volume `m/rho_a` after release. The water level falls because `m/rho_a < m/rho_w`. State a fixed pool footprint, equilibrium comparison, full submersion, unchanged boat/load otherwise, and ignored transients. Distinguish a floating ice-like object as an extension, not part of the answer.

### Public Announcement and Departure Day

Slug `public-announcement-departure-day`; id `logic-logical-deduction-018`. Replace the source's self-harm action with a harmless rule: a marked participant leaves at midnight once certain of being marked. Participants see everyone else's mark but not their own; all are perfect reasoners; rules, observations, rationality, and the public statement “at least one person is marked” are common knowledge. Prove by induction that if exactly `n>=1` are marked, all marked participants leave on night `n`. Explain why the announcement changes common knowledge even when everyone visually sees a marked person.

### Bisecting a Rectangular Frame with One Line

Slug `bisecting-a-rectangular-frame-with-one-line`; id `logic-logical-deduction-019`. A smaller rectangle lies fully inside a larger rectangle. Draw one infinite straight line that bisects the area inside the larger but outside the smaller. Prove any line through a rectangle's center bisects its area by 180-degree central symmetry; therefore the line through both centers bisects both rectangles and their difference. Handle coincident centers separately and distinguish existence from uniqueness. Public topics include `symmetry` in addition to Logical Deduction, without an out-of-branch override.

## Nine-Object Scale Variant

Do not create another Problem file. Extend `twelve-object-balance-scale-diagnosis` with a clearly labeled, independently worded nine-object variant: exactly one object is heavier, a balance scale has three outcomes, and at most three weighings are allowed. Show a two-weighing 3-vs-3 ternary strategy, prove `3^2=9` is both sufficient and information-theoretically minimal, and note that the third permitted weighing is unnecessary. Add a focused executable test covering all nine hypotheses and requiring the existing twelve-object identity, proof, and metadata to remain intact. The source row resolves as `variant` to this existing page.

## Topic Ownership and Evidence

Keep source keys, kinds, source identity, primary queue topic, sort keys, question pages, and solution pages unchanged. Stored evidence is already correct: questions on PDF pages 288-290 and solutions on pages 297-306. The full 750-row page projection remains at repaired SHA `92470e19ba2b116f2d98142465a2df38cb7b13f0f908d646cc64360d1ba16eb0`.

Coverage topics:

- snow-removal: `logical-deduction`, `ordinary-differential-equations`, with a nonempty override reason;
- card rule, scale variant, water level, public announcement: `logical-deduction`;
- rectangular frame: `logical-deduction`, `symmetry`;
- no other 022 override or topic change.

Preserve the source-topic map, validators, all 001-021 manifests/evidence, the two 021 page repairs, and all unrelated source rows. Source PDFs and the interview guide remain untracked and untouched.

## Tests, Lifecycle, and Resume

Use an isolated worktree and ignored per-task SDD ledger. Tests must independently verify the reciprocal-rate integral and root selection; all card-rule hidden-state assignments; nine-object ternary diagnosis for every hypothesis; Archimedes displacement algebra and density sign; common-knowledge base/induction/timing for several `n`; rectangle central-symmetry area pairing and coincident-center case; exact source-neutral bodies; catalog/graph order; six unique coverage additions; exact 5/1 split; one override; unchanged page hash; counts and next pending.

Active integration, current HANDOFF/directory, and stale-current fixtures must be updated together so the full suite can be green before CI. The active manifest contains no evidence. Follow the established immutable active SHA workflow: exact-head Windows gates, fresh WSL native-LF Node 24 gates, matching GitHub CI, workflow deletion in its own commit, workflow-free active proof, exact factual completion evidence, final exact-head gates, task reviews, one whole-branch review, and one consolidated fix wave if necessary. Pin real SHA/run/URL values rather than accepting shapes.

## Final Contract and Non-Goals

Final corpus: **101 Problems / 61 Knowledge**. Final master state: **268 terminal / 482 pending** of 750. First pending: `150-most-frequently-asked::2.7::theory`. Workstream 022 is complete and workflow-free; Workstream 023 is absent and unauthorized.

Do not process the 150-question source, create a redundant nine-object page, retain the harmful source action in public content, copy source prose, add unrelated physics taxonomy, change page evidence, redesign the site, refactor unrelated code, add dependencies, or add security hardening. Implementation planning begins only after user approval of this committed written specification.
