# Quant Interview Knowledge System — Agent Entry

This repository is the **source of truth** for the Quant Interview project. Do not rely on conversational memory to determine current state.

## Mandatory startup

For every new Chat or Agent:

1. Read this file.
2. Read [`HANDOFF.md`](./HANDOFF.md).
3. Identify the **target source**, target chapter/section, and **one bounded batch**.
4. Read only the target source record, target ingestion manifest, relevant TOC subtree, relevant existing Knowledge concepts/techniques, and validation utilities.
5. Read [`AGENT_PROTOCOL.md`](./AGENT_PROTOCOL.md) before changing repository state.
6. Read [`CONTENT_STANDARD.md`](./CONTENT_STANDARD.md) before authoring or reviewing Problems.
7. Use [`SOURCE_CATALOG.md`](./SOURCE_CATALOG.md) for source identity and verification state.

## Core architecture

```text
Knowledge Concept / Technique
          ↕
       Problem
          ↕
     Problem Source
```

Books are provenance sources, not ontology namespaces. Canonical Problem routes remain `/problems/<slug>/`.

## Working rule

Never ingest an entire book in one operation. Work one bounded batch at a time, validate it, commit it, update `HANDOFF.md`, then move to the next batch.

## Machine-readable state

- manifests: `src/data/quant-interview/*.json`
- TOCs: `src/data/quant-interview/toc/*.json`
- source records: `src/content/problem-sources/*.md`
- Problems: `src/content/problems/`
- reusable Concepts / Techniques: `src/content/knowledge/`

If docs and conversation disagree, repository state wins.
