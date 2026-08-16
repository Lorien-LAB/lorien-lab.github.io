# Quant Interview Source Catalog

The three books are **internal inputs** to Lorien Lab's **Topic-first** Quant Interview Knowledge System. They are verification and coverage sources, not the public navigation hierarchy.

**Source-file verification is not problem coverage.** A verified edition/file only establishes which source is being inspected. Problem and Knowledge completeness is tracked separately through canonical topic workstreams and the hidden coverage ledger.

## Green Book — A Practical Guide to Quantitative Finance Interviews

- Canonical title: *A Practical Guide to Quantitative Finance Interviews*
- Author: Xinfeng Zhou
- Repository source slug: `green-book`
- Edition: **First Edition (2008)**
- Edition state: `edition-pinned`
- ISBN-13: `9781438236667`
- Source file: **source-file-verified**
- Source-file identity: `sha256:89a637408fc57164c3ee4ef19fb36688a58dfb37b91ef1471d11df82d6d0e3f5`
- File size in pages: **213 PDF pages**
- TOC state: **source-file-verified**
- Ingestion state: `manifest-ready`
- Problem-level coverage: **not complete; hidden coverage entries are initially pending**

Verification anchors include the First Edition title page, 2008 copyright page, TOC, index end, and back-cover ISBN. The copyrighted source file is not committed to this public repository.

## Red Book — Quant Job Interview Questions and Answers

- Canonical title: *Quant Job Interview Questions and Answers*
- Authors: Mark Joshi, Nicholas Denson, Andrew Downes
- Repository source slug: `red-book`
- Edition/version: **Version 1.01 (2008)**
- Edition state: `edition-pinned`
- ISBN-13: `9781438217031`
- Source file: **source-file-verified**
- Source-file identity: `sha256:09c5aac761bd71c4a6b9406f50dcfe73d8af3ce0a3ef9bb4fe2d65d0b27db6b1`
- File size in pages: **329 PDF pages**
- TOC state: **source-file-verified**
- Ingestion state: `manifest-ready`
- Problem-level coverage: **not complete; hidden coverage entries are initially pending**

Verification anchors include the cover ISBN, title page, Version 1.01 / 2008 copyright page, TOC, and index end. The copyrighted source file is not committed to this public repository.

## 150 Questions — 150 Most Frequently Asked Questions on Quant Interviews

- Canonical title: *150 Most Frequently Asked Questions on Quant Interviews*
- Authors: Dan Stefanica, Rados Radoicic, Tai-Ho Wang
- Repository source slug: `150-most-frequently-asked`
- Edition: **First edition (2013)**
- Edition state: `edition-pinned`
- ISBN-13: `9780979757648`
- Source file: **source-file-verified**
- Source-file identity: `sha256:d753f3516ce06d8e7242bcdd7252d39ffbc33f9217c6cf8a7e826b658b533e14`
- File size in pages: **220 PDF pages**
- TOC state: **source-file-verified**
- Ingestion state: `ingesting`
- Existing authored canonical candidates: the previously validated Q1–Q2 and Q4–Q5 pilot content
- Full problem-level coverage: **not complete; remaining material must be reconciled by Topic-first cross-book workstreams**

The existing pilot Problems and Knowledge remain valid content candidates, but source-number order is no longer the normal ingestion sequence. Their source evidence remains internal, and later cross-book workstreams may enrich or merge them when equivalent Green/Red material is inspected.

## Internal routing and audit state

Repository infrastructure now separates four responsibilities:

- `src/data/quant-interview/toc/*.json` — verified source structure;
- `src/data/quant-interview/topics/taxonomy.json` — canonical public topic taxonomy;
- `src/data/quant-interview/topics/source-topic-map.json` — hidden source-section → canonical-topic routing;
- `src/data/quant-interview/coverage/*.json` — hidden semantic coverage and dedup audit.

Physical source pages may overlap as private evidence. Semantic source-item ownership remains explicit through the coverage and ingestion validators.

## Current truth table

| Source | Edition/version | Source file | TOC | Public/problem completeness |
|---|---|---|---|---|
| Green Book | First Edition (2008) | verified · 213 PDF pages | verified | incomplete / pending cross-book reconciliation |
| Red Book | Version 1.01 (2008) | verified · 329 PDF pages | verified | incomplete / pending cross-book reconciliation |
| 150 Questions | First edition (2013) | verified · 220 PDF pages | verified | pilot content only; remainder incomplete |

Never convert source-file verification, TOC verification, or a mapped chapter into an unsupported completeness percentage.
