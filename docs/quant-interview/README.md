# Quant Interview Knowledge System — Agent Entry

<!-- parallel-workstream-policy-reference:start -->
> Canonical parallel-workstream policy: `quant-interview.parallel-workstream-governance` at `docs/quant-interview/parallel-workstream-policy.json`.
>
> The JSON policy is normative and the sole source of truth for parallel-workstream governance. Surrounding prose is explanatory and cannot override it.
<!-- parallel-workstream-policy-reference:end -->

This repository is the **source of truth** for the Quant Interview project. Do not rely on conversational memory to determine current state.

## Architecture

The durable system is **Topic-first**. Green Book, Red Book, and 150 Questions are internal evidence sources used together to build one canonical Knowledge graph and one deduplicated Problem Bank. Public organization is not book-first.

All three sources are now source-file-verified and edition-pinned. That does **not** mean their problem content has been fully absorbed. Completeness is tracked only through the hidden coverage ledger.

```text
Canonical Topic
   ├─ Canonical Knowledge / Problem Solving Techniques
   └─ Canonical Problems

Internal source layer
   ├─ source manifests + evidencePageRanges
   ├─ verified TOCs
   ├─ source → topic map
   └─ hidden coverage ledger
```

## Mandatory startup

For every new Chat or Agent:

1. Read this file.
2. Read [`HANDOFF.md`](./HANDOFF.md).
3. Read [`AGENT_PROTOCOL.md`](./AGENT_PROTOCOL.md) before changing repository state.
4. Read [`CONTENT_STANDARD.md`](./CONTENT_STANDARD.md) before authoring or reviewing public content.
5. Use [`SOURCE_CATALOG.md`](./SOURCE_CATALOG.md) for source identity and verification state.
6. Select exactly one bounded **canonical topic workstream**, not one book chapter sequence.
7. Resolve that topic through the hidden source-topic map and coverage ledger before reading or writing source-derived content.

## Working rule

Each candidate branch owns exactly one approved module. Up to three isolated module candidate branches/worktrees may be active at once: one topic per candidate branch, with one integration and closure at a time globally.

Module implementation may not begin until its written module design spec is approved. Design and source audit may precede approval. During implementation, a candidate branch may implement only module-scoped public Knowledge/Problem content plus module-specific tests explicitly allowed by that approved module spec.

Candidate agents must not edit shared coverage, source-topic map, exact global-registry/count regressions, HANDOFF, workstream/completion metadata, or CI workflow paths. Candidates hand the coordinator precise proposed shared-file deltas in their reports. The coordinator serializes reconciliation, integration, and closure in the order 011 → 012 → 013 on the latest durable base and updates shared files.

Within each approved topic, resolve every mapped verified source and perform semantic deduplication before creating new Knowledge or Problems. Every inspected source item must end in an explicit coverage-ledger state; nothing may silently disappear because it looked similar to another question.

Source page numbers are internal evidence only. Public Knowledge and Problems should be complete, accurate, independently written, structurally clear, and source-neutral.

## Machine-readable state

- source manifests: `src/data/quant-interview/*.json`
- verified source TOCs: `src/data/quant-interview/toc/*.json`
- canonical taxonomy: `src/data/quant-interview/topics/taxonomy.json`
- source → topic map: `src/data/quant-interview/topics/source-topic-map.json`
- hidden coverage: `src/data/quant-interview/coverage/*.json`
- source records: `src/content/problem-sources/*.md`
- canonical Problems: `src/content/problems/`
- canonical Knowledge / Techniques: `src/content/knowledge/`

## Verification gates

Every bounded implementation or ingestion workstream must pass:

```bash
npm run test
npm run check
npm run build
```

If docs, conversation, and repository state disagree, repository state wins.
