# Quant Interview Content Standard

## 1. Goal

The public system is a **Topic-first reasoning library**, not a transcription or copied answer bank. The three books are private evidence inputs. Public Knowledge and Problems must be complete, accurate, independently written, structurally clear, and source-neutral.

A source item is not considered “covered” merely because it was read. It must be reconciled into canonical Knowledge, a canonical Problem, a meaningful Variant, interview guidance, or another explicit coverage-ledger state.

## 2. Public source-neutrality

Do not put original book bookkeeping into public content. Knowledge and Problem pages do not need to display:

- source book name;
- original chapter / section number;
- original question number;
- original page number;
- source ordering.

Source page numbers are internal evidence only. Hidden source manifests, TOCs, source-topic mappings, evidence ranges, and coverage ledgers preserve auditability.

## 3. Canonical Knowledge structure

A Knowledge node should be understandable without opening any source book. Include the parts that genuinely help the topic, for example:

- definition and notation;
- intuition;
- rigorous derivation or proof where appropriate;
- canonical formulas and conditions;
- recognition signals in interviews;
- examples and edge cases;
- Common Mistakes;
- related concepts and prerequisites;
- relevant canonical Problems;
- **Interview Checks**: concise conceptual or calculation prompts that test transfer.

If a source contains a useful question that does not deserve a standalone canonical Problem, preserve its pedagogical content as an Interview Check or structured example rather than silently dropping it.

## 4. Canonical Problem structure

A reviewed Problem should normally include:

```markdown
## Problem

## Think Before Revealing

<details>
<summary>Hint 1</summary>
...</details>

<details>
<summary>Hint 2</summary>
...</details>

<details>
<summary>Show Solution</summary>

## Solution

### Method 1

### Method 2

## Why This Problem Matters

## Common Mistakes

## Variants / Extensions

</details>
```

The exact number of hints or methods varies. Finished content must not collapse into only a final answer.

## 5. Solution maturity

- **S0 — answer only**: final answer with no derivation.
- **S1 — derivation**: correct derivation but little intuition.
- **S2 — derivation + intuition**: explains why it works.
- **S3 — interview-ready**: clear derivation plus interview-appropriate explanation and/or genuinely useful alternate approach.
- **S4 — interview-ready + traps**: S3 plus recognition signals and realistic Common Mistakes.
- **S5 — extension/generalization**: S4 plus meaningful variants, generalization, or broader structural insight.

Canonical source-derived content marked `solved` or `reviewed` should target **S3+**. S0 must never be treated as finished reviewed content.

## 6. Independent formulation

Do not reproduce source problem wording verbatim. Preserve the mathematical/financial identity while writing the public problem independently.

Do not copy answer keys. Derive and verify solutions independently. Multiple books may improve the final canonical entry, but the result should read as one coherent Lorien Lab explanation rather than stitched quotations.

## 7. Semantic deduplication

Before creating a new Knowledge node or Problem, search the existing repository and compare semantic identity.

For Knowledge, compare concept meaning and pedagogical role, not title strings.

For Problems, compare at least:

1. core state / objects;
2. target;
3. material constraints;
4. underlying mathematical or financial structure;
5. key insight / solution family.

If two source questions are the same canonical problem, keep one public Problem. Merge useful alternate methods, traps, follow-ups, and meaningful variants. Cosmetic changes in names, story framing, constants, notation, or ordering do not justify duplicate pages.

If a variation changes the reasoning materially, keep it as a separate Problem. If uncertain, mark the hidden ledger `needs-review` rather than forcing a merge.

## 8. Ontology quality

Every Problem should map only to concepts, techniques, prerequisites, and canonical interview topics that it genuinely uses.

Before adding a new Concept or Technique:

1. search `src/content/knowledge/`;
2. compare semantic meaning, not just titles;
3. reuse the canonical slug when equivalent;
4. create a new reusable node only when the distinction is pedagogically meaningful.

Do not allow synonyms from different books to become duplicate ontology nodes.

## 9. Difficulty

Use the three existing dimensions independently:

- `mathDifficulty`: prerequisite mathematics / technical load;
- `insightDifficulty`: non-obvious reasoning leap;
- `interviewDifficulty`: difficulty under interview recognition, time, and communication constraints.

Each is an integer from 1 to 5.

## 10. Hints

Hints should be progressive:

- Hint 1: recognition cue, representation, or useful observation;
- Hint 2: stronger structural step without revealing the whole derivation;
- further hints only when useful.

## 11. Why This Problem Matters

Explain the interviewer skill being tested, such as:

- conditioning / Bayes;
- symmetry or an invariant;
- state-space construction;
- stochastic-process intuition;
- replication / no-arbitrage;
- matrix feasibility;
- algorithmic complexity;
- numerical-method trade-offs.

## 12. Common Mistakes

Record realistic failure modes, not generic warnings. Examples include silently assuming independence, double-counting, confusing conditional/unconditional quantities, using a positive-definite criterion in a semidefinite setting, applying Black–Scholes outside its assumptions, missing a boundary condition, or giving code with the wrong complexity.

## 13. Variants / Extensions

Extensions should add reasoning value rather than merely changing constants. Useful variants include biased/generalized probabilities, additional constraints, higher-dimensional versions, different stopping boundaries, continuous-time analogues, algorithmic improvements, or financial interpretations.

A source question that differs only cosmetically should not survive as a separate public Problem; its useful delta belongs here.

## 14. Coverage requirement

For every source item inspected in a canonical topic workstream, update the hidden coverage ledger. No source question may disappear merely because it resembled another one.

Typical states are:

- `canonical-problem`
- `merged-duplicate`
- `variant`
- `knowledge-only`
- `interview-guidance`
- `non-content-frontmatter`
- `pending`
- `needs-review`

Terminal states must point to the canonical content that absorbed the item where applicable.

## 15. Review checklist

A topic workstream is ready only if:

- relevant mapped material from all available verified sources was inspected;
- semantic deduplication was performed before authoring;
- public prose is independent and source-neutral;
- canonical topic / Concept / Technique relationships resolve;
- Knowledge is sufficiently complete for the workstream scope;
- standalone Problems are genuinely distinct and S3+ when solved/reviewed;
- conceptual source questions remain visible through Interview Checks/examples when not standalone Problems;
- every inspected source item has an explicit coverage state;
- source PDFs/scans and copied answer keys are absent from the public repo;
- `npm run test`, `npm run check`, and `npm run build` pass.
