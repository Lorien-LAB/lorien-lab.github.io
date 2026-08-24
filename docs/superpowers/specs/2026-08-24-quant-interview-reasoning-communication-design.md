# Quant Interview Reasoning & Communication — Workstream 013 Design Spec

**Date:** 2026-08-24
**Status:** Conversational design approved; written-spec review pending
**Candidate branch:** `chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23`
**Candidate base:** `f41880f220991f43d84ddb3795a59b8688e5230c`
**Canonical topic:** `reasoning-communication`
**Integration order:** third, after 011 and 012

## 1. Goal

Create two reusable, source-neutral Knowledge nodes for the interview skills of framing an underspecified problem and communicating material reasoning. The workstream adds no public Problems.

The approved module delta is:

| Public corpus type | Delta |
|---|---:|
| Problems | +0 |
| Knowledge | +2 |

After the corrected 011 and 012 integrations, their exact contract is 76 Problems and 48 Knowledge nodes. Workstream 013 raises only the Knowledge total, yielding the exact integrated contract of **76 Problems and 50 Knowledge nodes**.

## 2. Scope

The module owns reusable techniques for:

1. establishing the objective, available facts, relevant constraints, and material unknowns before selecting a solution path;
2. asking high-value clarifying questions and explicitly stating defensible provisional assumptions when information is incomplete;
3. explaining the conclusion and decisive reasoning steps without narrating routine mechanics; and
4. accepting feedback, correcting the framing or explanation, and making the revised reasoning auditable.

Public material must be independently written. The verified source material is private evidence, not public prose or instructions.

### 2.1 Non-goals

This workstream does not create:

- standalone listening, speaking, or assumption pages;
- artificial non-mathematical Problem pages made solely to increase the Problem count;
- interview-preparation, interview-format, behavioral-interview, or puzzle-solving content;
- generic technical Problems or domain-specific solution techniques;
- public content derived from broad or date-sensitive preparation/self-assessment guidance; or
- public source names, source section/item numbers, page numbers, quotations, or source ordering.

The module does not reopen closed workstreams or alter the taxonomy.

## 3. Canonical public Knowledge

Both nodes are candidate-created files in `src/content/knowledge/concepts/`. They use the existing Knowledge schema with `type: concept`, `domain: Interview Strategy & Communication`, `category: Problem Solving Techniques`, `status: growing`, and `featured: false`. Their `date` is the implementation date.

### 3.1 `problem-framing-clarification-assumption-management`

**Title:** Problem Framing, Clarification & Assumption Management
**Exact topics:** `[interview-strategy-communication, reasoning-communication]`
**Reciprocal relation:** `related: [structured-think-aloud-reasoning]`

This node teaches a compact framing protocol:

1. restate the decision or target quantity;
2. separate known facts, constraints, unknowns, and success conditions;
3. ask the clarifying question with the greatest effect on the solution path;
4. if an answer is unavailable, label a defensible assumption as provisional and state its consequence; and
5. invite correction, then revise the model before proceeding.

It includes recognition signals, a boundary between an explicit assumption and an unsupported claim, realistic mistakes, and a visible `## Interview Checks` section. The checks require the reader to identify a missing constraint, select a useful clarification, state an assumption with its consequence, and revise after feedback.

This is the only public target for the Green 1.3 evidence row and the Green 1.5 evidence row.

### 3.2 `structured-think-aloud-reasoning`

**Title:** Structured Think-Aloud Reasoning
**Exact topics:** `[interview-strategy-communication, reasoning-communication]`
**Reciprocal relation:** `related: [problem-framing-clarification-assumption-management]`

This node teaches a concise explanation protocol:

1. give the conclusion or intended route first when it helps orientation;
2. distinguish observations, assumptions, inferences, and uncertainty;
3. expose the steps that change the decision, rather than reciting trivial arithmetic or syntax;
4. pause at a meaningful checkpoint for feedback; and
5. close with the result, limitation, or next discriminating test.

It includes recognition signals, realistic mistakes such as hiding a pivotal inference or refusing corrective feedback, and a visible `## Interview Checks` section. The checks require the reader to choose the decisive step to explain, distinguish a fact from an inference, compress routine narration, and update an explanation after a challenge.

This is the only public target for the Green 1.4 evidence row.

### 3.3 Public graph contract

The two new nodes link to each other and use aligned `relatedNotes` explaining their pedagogical relationship: framing determines what must be reasoned about; structured explanation makes that framing and the resulting reasoning inspectable. No pre-existing Knowledge or Problem page is edited for this workstream. This preserves reciprocal graph links without touching a coordinator-owned base-existing page.

## 4. Evidence disposition and proposed shared-state deltas

The following changes are proposals for coordinator reconciliation only. The candidate does not edit coverage ledgers, the source-topic map, workstream metadata, global regressions, HANDOFF, completion state, or CI configuration.

### 4.1 Green coverage

| Source section | Final state | Canonical Problems | Canonical Knowledge | Resolution |
|---|---|---|---|---|
| `1.3` | `knowledge-only` | `[]` | `[problem-framing-clarification-assumption-management]` | Active listening, fact/constraint inventory, and clarification are preserved as framing Interview Checks. |
| `1.4` | `knowledge-only` | `[]` | `[structured-think-aloud-reasoning]` | Material reasoning, decisive steps, concise explanation, and feedback are preserved as structured-reasoning Interview Checks. |
| `1.5` | `knowledge-only` | `[]` | `[problem-framing-clarification-assumption-management]` | Explicit assumptions under incomplete information and feedback-driven framework revision belong to the framing node. |

Each row retains `canonicalTopics: [reasoning-communication]`, receives a nonempty private `resolutionNote`, and has no canonical Problem target. The `knowledge-only` state becomes terminal only when the corresponding public Interview Checks exist.

### 4.2 Red reroute

Red `1.12` is broad, date-sensitive preparation and self-assessment guidance. It does not support reusable Reasoning & Communication public content.

During coordinator integration:

1. change its source-topic-map entry from `[reasoning-communication]` to `[interview-preparation]`;
2. change the matching Red coverage entry to `canonicalTopics: [interview-preparation]` and `state: interview-guidance`;
3. retain `canonicalProblems: []` and `canonicalKnowledge: []`; and
4. add a nonempty private `resolutionNote` recording the coverage-only disposition.

This reroute belongs to 013 integration, rather than a future owner, because the verified audit established that the existing mapping is wrong and the valid `interview-preparation` taxonomy node already exists. It creates no public page and does not make dated or exclusionary guidance public.

### 4.3 150 source boundary

The 150 source has zero in-scope Reasoning & Communication rows. Do not create, reroute, or terminalize a 150 coverage row; do not add a source-topic-map entry; and do not invent a broad source section merely to imply three-source ownership.

## 5. Workstream registration and lifecycle

The coordinator creates `src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json` during serialized integration. Its fixed identity is:

```json
{
  "id": "interview-strategy-communication-reasoning-communication-013",
  "status": "active",
  "canonicalTopics": [
    "interview-strategy-communication",
    "reasoning-communication"
  ],
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": ["1.3", "1.4", "1.5"],
      "evidencePageRanges": [{"startPage": 18, "endPage": 18}],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Three reusable reasoning-and-communication sections resolve as knowledge-only public checks."
    },
    {
      "source": "red-book",
      "sourceSections": ["1.12"],
      "evidencePageRanges": [{"startPage": 25, "endPage": 26}],
      "reviewOutcome": "reclassified-to-interview-preparation-coverage-only",
      "reviewNote": "The section is rerouted to interview-preparation as coverage-only interview guidance with no public target."
    }
  ]
}
```

The coordinator creates this pre-closure manifest with `status: "active"`. The Green source scope lists `1.3`, `1.4`, and `1.5` with the private evidence range 18–18. The Red source scope lists `1.12` with the private evidence range 25–26 and records the reclassification as coverage-only guidance. The manifest has no 150 source scope.

The candidate remains `active` after local verification. Only the coordinator may change the integrated manifest from `active` to `complete`, and only after reconciling against the latest durable base, applying shared-state deltas, updating exact corpus regression, passing the required local commands on the integrated commit, obtaining real successful CI for that exact commit, and recording factual HANDOFF closure.

## 6. Ownership boundaries

### 6.1 Candidate-owned implementation surface

The candidate may create only:

- `src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md`;
- `src/content/knowledge/concepts/structured-think-aloud-reasoning.md`; and
- `tests/quant-interview-reasoning-communication-content.test.mjs`.

The candidate test is public-content-only. It verifies both pages exist; their exact canonical topic arrays; reciprocal new-node links; aligned `relatedNotes`; visible Interview Checks; source-neutral public text; and the absence of a classified Problem assigned to `reasoning-communication`.

### 6.2 Coordinator-owned integration surface

The coordinator alone reconciles or creates:

- `src/data/quant-interview/coverage/green-book.json`;
- `src/data/quant-interview/coverage/red-book.json`;
- `src/data/quant-interview/topics/source-topic-map.json`;
- `src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json`;
- `tests/quant-interview-source-neutral-content.test.mjs`;
- coverage and workstream integration assertions;
- `docs/quant-interview/HANDOFF.md`; and
- completion metadata and real-CI evidence.

No existing public page is modified by the candidate, including reciprocal links on pages that existed at the candidate base.

## 7. Test and regression contract

The candidate-owned content test must be narrow enough to pass before coordinator-owned shared files exist. It does not assert coverage, source-map, manifest, HANDOFF, or global-count state.

At integration, coordinator-owned checks must assert all of the following:

1. the three Green rows have exactly the states and Knowledge targets in Section 4.1, no Problem targets, and nonempty resolution notes;
2. Red `1.12` maps and covers as `interview-preparation` / `interview-guidance` with no public target;
3. no 150 map or coverage row claims `reasoning-communication` ownership;
4. the 013 manifest has the exact ID, parent-first topic array, Green and Red scopes, and no invented 150 scope;
5. the workstream and all affected coverage ledgers validate against the current taxonomy, source-topic map, and real public slugs; and
6. the source-neutral global regression enumerates every slug and asserts exactly 76 Problems and 50 Knowledge nodes, including both new Knowledge slugs.

The global count check remains exact enumeration; it must not be weakened to a lower-bound assertion.

## 8. Editorial and safety constraints

Public pages must be source-neutral and independently authored. They must not contain source names, source sections, item identifiers, evidence page numbers, copied passages, source ordering, or date-bound preparation/self-assessment claims.

Assumptions must be presented as explicit, revisable modeling choices rather than hidden facts. Structured explanation must favor decisive reasoning and feedback over performance narration. The two-page shape is intentional: splitting the content into separate listening, assumptions, or speaking nodes would create artificial ontology fragmentation.

## 9. Serialized integration and failure rules

Integration is serialized as 011, then 012, then 013. The coordinator applies this design on the latest durable base rather than replacing newer shared files with a candidate copy.

- If source identity or evidence is found to be invalid, keep the workstream active and do not freeze coverage or author source-derived public content.
- If a semantic collision with an existing canonical node is found, preserve canonical ownership and revise the design or merge the material instead of creating a duplicate node.
- If a shared-state or validation check fails, keep the workstream active; do not advance HANDOFF, completion metadata, or CI success claims.
- If integration requires correction after a durable commit, use a corrective commit rather than rewriting shared history.

## 10. Review gate

This written spec requires independent review before implementation begins. Approval authorizes only the bounded candidate-owned Knowledge and module-test work described here. It does not authorize shared-state edits, workstream completion, or any expansion beyond Reasoning & Communication.
