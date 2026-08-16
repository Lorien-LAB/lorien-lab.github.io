# Quant Interview Source Catalog

This catalog records **verification state**, not aspirational coverage. Never infer completion from the presence of a book or TOC.

## Verification vocabulary

- `user-supplied`: structure or metadata supplied by the user; useful as a seed but not yet verified against the actual file.
- `web-cross-checked`: corroborated with an external bibliographic/publisher source.
- `source-file-verified`: inspected directly in the user's actual PDF/source file.
- `edition-pinned`: an exact edition is identified strongly enough to bind edition-specific metadata.
- `problem-indexed`: source-derived Problems have actually been created and validated.

## Green Book — A Practical Guide to Quantitative Finance Interviews

- Canonical title: *A Practical Guide to Quantitative Finance Interviews*
- Author: Xinfeng Zhou
- Repository source slug: `green-book`
- Work identity: `web-cross-checked`
- Edition state: `work-identified`
- TOC state: `user-supplied`
- Source file: **not source-file-verified**
- Problem coverage: **not problem-indexed**
- Edition: not pinned
- Ingestion: `awaiting-source-file`

The supplied TOC is a structural seed only. It must not be used to claim complete problem-level coverage, and chapter/problem numbering must not be treated as edition-safe until the actual source file is checked.

## Red Book — Quant Job Interview Questions and Answers

- Canonical title: *Quant Job Interview Questions and Answers*
- Authors: Mark Joshi, Nicholas Denson, Andrew Downes
- Repository source slug: `red-book`
- Work identity: `web-cross-checked`
- Edition state: `work-identified`
- TOC state: `user-supplied`
- Source file: **not source-file-verified**
- Problem coverage: **not problem-indexed**
- Edition: not pinned
- Ingestion: `awaiting-source-file`

The supplied chapter/page structure is retained as a seed, but no edition-specific question numbering or completeness claim is allowed before source-file verification.

## 150 Questions — 150 Most Frequently Asked Questions on Quant Interviews

- Canonical title: *150 Most Frequently Asked Questions on Quant Interviews*
- Authors: Dan Stefanica, Rados Radoicic, Tai-Ho Wang
- Repository source slug: `150-most-frequently-asked`
- Publisher: Financial Engineering Press / FE Press
- Year: 2013
- Edition state: `edition-pinned`
- Edition: **First edition (2013)**
- ISBN-13: `9780979757648`
- ISBN-10: `0979757649`
- Publisher physical length: 224 pages
- Work/edition metadata: `web-cross-checked`
- TOC state: **source-file-verified**
- Source file: **source-file-verified**
- Source-file identity: `sha256:d753f3516ce06d8e7242bcdd7252d39ffbc33f9217c6cf8a7e826b658b533e14`
- User scan: 220 PDF pages; printed page 1 begins at PDF page 11; bibliography is printed page 209 at PDF page 219
- Problem coverage: **not yet problem-indexed**
- Ingestion: `ingesting`
- Active batch: `150-first-look-q01-q02` — printed pages 1–6, Questions 1–2 only
- Publisher record: `https://www.fepress.org/150iqs/`

The actual user-supplied scan has been inspected directly. The title page, copyright page, ISBN, first-edition publication statement, TOC, body numbering, and bibliography all align with the pinned 2013 first edition. The PDF itself is not committed to the repository. The open batch is deliberately narrower than the page range's incidental mentions of later First Look questions: only Questions 1–2 are in scope.

## Current truth table

| Source | Work identity | TOC | Edition | Source file | Problems |
|---|---|---|---|---|---|
| Green Book | verified | user-supplied seed | work-identified | not source-file-verified | not problem-indexed |
| Red Book | verified | user-supplied seed | work-identified | not source-file-verified | not problem-indexed |
| 150 Questions | verified | source-file-verified | edition-pinned · 2013 first edition | source-file-verified | active batch; not yet problem-indexed |

A future Agent may advance a state only with corresponding evidence. Never downgrade uncertainty by wording alone.
