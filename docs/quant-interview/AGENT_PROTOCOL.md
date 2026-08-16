# Quant Interview Agent Protocol

## 1. Authority

**Do not trust conversational memory** as the source of truth. Current repository files and verified source evidence are authoritative.

The public system is **Topic-first**. Books are internal evidence sources, not public hierarchy. All three sources are processed together whenever they map into the same canonical topic workstream.

## 2. Startup sequence

1. Read `docs/quant-interview/README.md`.
2. Read `docs/quant-interview/HANDOFF.md`.
3. Inspect `src/data/quant-interview/topics/taxonomy.json`.
4. Inspect the relevant entries in `src/data/quant-interview/topics/source-topic-map.json`.
5. Inspect the relevant hidden records in `src/data/quant-interview/coverage/*.json`.
6. Read only the mapped source material, relevant existing Knowledge/Problems, and validation utilities needed for the selected workstream.
7. Compare the task-specific branch with `main` before integration.

## 3. Branch discipline

Use a **task-specific branch** unless the user explicitly authorizes direct integration. Never force-update `main`.

One branch should implement one bounded infrastructure stage or one bounded canonical topic workstream.

## 4. Canonical topic workstream discipline

The normal ingestion unit is a **canonical topic workstream**, not a book batch and not a source-question range.

For every content workstream, follow this sequence exactly:

1. **select one canonical subtopic**;
2. **resolve all mapped source sections**;
3. **read every available verified source for that subtopic**;
4. **inventory concepts, problems, variants, and interview guidance**;
5. perform **semantic deduplication** against existing repository Knowledge and Problems;
6. **update or create canonical Knowledge first**;
7. **update or create canonical Problems** only for genuinely distinct problem identities;
8. merge useful alternate methods, pitfalls, follow-ups, and meaningful variants into the canonical entries;
9. **update every inspected coverage entry** so no source item remains silently unaccounted for;
10. run relationship, taxonomy, coverage, and ingestion validations;
11. run `npm run test`, `npm run check`, and `npm run build`;
12. **review the topic-only diff** before integration.

Never process one whole book before looking at equivalent sections in the other sources.

## 5. Source verification gate

Before a source may contribute to a topic workstream:

1. verify work identity;
2. inspect the actual source file;
3. pin the exact edition/version;
4. verify the TOC structure against the supplied file;
5. pin the source-file cryptographic identity in its manifest;
6. preserve private evidence for later audit.

A verified source file proves source identity and structure. It does not prove problem-level coverage.

## 6. Evidence and ownership

`evidencePageRanges` records private source pages inspected for a source item or ingestion unit.

- evidence ranges may overlap across different semantic source items;
- the same source problem/item may not be independently owned twice without an explicit merged/variant relationship;
- evidence is for audit only;
- **source page numbers are internal evidence only**;
- public Knowledge and Problem pages must not depend on or display original page numbers.

## 7. Canonical Knowledge

Knowledge is reusable theory or a reusable Problem Solving Technique. Techniques remain ordinary Knowledge concepts with:

```yaml
type: concept
category: Problem Solving Techniques
```

Before creating a node, search existing Knowledge by semantic meaning. Different book vocabulary does not justify duplicate concepts.

When multiple sources cover the same concept, fuse their useful contributions into one coherent canonical entry. A mature Knowledge node may combine intuition, derivation, edge cases, interview checks, and applications from multiple sources, but its public prose must be independently written.

## 8. Canonical Problem identity

Text similarity alone cannot decide duplication. Compare:

- core state / mathematical or financial objects;
- target quantity, proof, construction, or explanation;
- material constraints and assumptions;
- underlying structure;
- key insight / solution family.

If these are substantially the same, maintain one canonical Problem. Fold genuinely useful differences into alternate methods, Common Mistakes, follow-ups, or Variants / Extensions.

If identity is uncertain, keep the source item in `needs-review`; false merges are worse than temporary duplication.

## 9. Coverage ledger

The hidden **coverage ledger** is mandatory audit state. It is not public content.

Every inspected source item must end in an explicit state such as:

- `canonical-problem`
- `merged-duplicate`
- `variant`
- `knowledge-only`
- `interview-guidance`
- `non-content-frontmatter`
- `pending`
- `needs-review`

A duplicate is never discarded. Its ledger record points to the canonical content that absorbed it.

A conceptual source question that becomes `knowledge-only` must still be represented as a useful public self-test / Interview Check in the associated Knowledge entry when the question carries pedagogical value.

## 10. Public source-neutrality

Public Knowledge and Problems should not expose:

- book name as provenance;
- original chapter or section number;
- original source-question number;
- original source page number;
- source-specific ordering.

The repository retains source records, TOCs, manifests, mappings, and coverage only for private ingestion/audit integrity.

## 11. Copyright boundary

Allowed public output:

- independently formulated problems;
- independently derived solutions;
- canonical theory, techniques, examples, Interview Checks, and variants;
- concise source-neutral classification and difficulty metadata.

Do not publish source PDFs/scans, long source passages, copied answer keys, or a book-substitution mirror.

## 12. End-of-workstream protocol

Before completing a topic workstream:

1. verify every inspected source item has an explicit coverage state;
2. validate canonical Knowledge/Problem relationships;
3. validate taxonomy and source-topic mappings;
4. validate source manifests and private evidence;
5. run `npm run test`;
6. run `npm run check`;
7. run `npm run build`;
8. review the diff against `main`;
9. update `docs/quant-interview/HANDOFF.md` with factual current state only.

Do not claim completion when any verification gate fails.
