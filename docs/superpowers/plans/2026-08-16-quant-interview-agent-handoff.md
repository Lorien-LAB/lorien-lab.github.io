# Quant Interview Agent Handoff Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the repository itself the authoritative, low-context handoff mechanism for all future Quant Interview chats/agents and seed machine-readable TOCs for three interview books.

**Architecture:** Add five focused docs under `docs/quant-interview/`, three TOC JSON files under `src/data/quant-interview/toc/`, and a pinned source/manifest for the 2013 first edition of *150 Most Frequently Asked Questions on Quant Interviews*. Preserve the existing Problem/Knowledge/Technique architecture and edition-safe ingestion gate.

**Tech Stack:** Astro content collections, Markdown/YAML source records, JSON manifests/TOCs, Node `node:test`, existing GitHub Actions verification.

## Global Constraints

- Repository state, not chat memory, is the source of truth.
- Do not publish source PDFs/scans or copied answer keys.
- Green/Red TOCs are structure seeds only; their editions remain unpinned.
- 150 Questions is pinned to the 2013 first edition bibliographically, but ingestion remains blocked until the actual source file is available.
- No source-derived problems are added in this phase.
- Counts and coverage claims must be data-derived/truthful.
- `npm run test`, `npm run check`, and `npm run build` must pass.

---

### Task 1: Define RED contracts

**Files:**
- Create: `tests/quant-interview-handoff.test.mjs`

**Interfaces:**
- Consumes: existing `problemSources`, Green/Red manifests, repository docs.
- Produces: executable contract for handoff docs, TOCs, third source record/manifest, and no-content-ingestion boundary.

- [ ] **Step 1: Write failing tests** asserting five handoff docs, three TOCs, truthful source states, third-book metadata, zero third-book batches, and absence of source-derived problems.
- [ ] **Step 2: Run `npm run test`** and confirm only the new handoff tests fail for missing artifacts.
- [ ] **Step 3: Commit RED tests.**

### Task 2: Add Agent handoff documentation

**Files:**
- Create: `docs/quant-interview/README.md`
- Create: `docs/quant-interview/AGENT_PROTOCOL.md`
- Create: `docs/quant-interview/CONTENT_STANDARD.md`
- Create: `docs/quant-interview/SOURCE_CATALOG.md`
- Create: `docs/quant-interview/HANDOFF.md`

**Interfaces:**
- `README.md` is the only mandatory first read.
- `HANDOFF.md` supplies current phase/next action.
- Other docs are loaded on demand.

- [ ] **Step 1:** Write a short onboarding README with exact startup read order.
- [ ] **Step 2:** Write Agent protocol covering branching, batch boundaries, ontology reuse, ingestion and validation.
- [ ] **Step 3:** Write content standard including S0–S5 solution maturity and required reviewed sections.
- [ ] **Step 4:** Write source catalog with Green/Red/150 state matrix.
- [ ] **Step 5:** Write compact handoff state for the next Phase 2B entry.
- [ ] **Step 6:** Run focused tests and commit.

### Task 3: Seed machine-readable TOCs

**Files:**
- Create: `src/data/quant-interview/toc/green-book.json`
- Create: `src/data/quant-interview/toc/red-book.json`
- Create: `src/data/quant-interview/toc/150-most-frequently-asked.json`

**Interfaces:**
- Each file exposes `source`, `canonicalTitle`, `tocStatus`, `coverageClaim`, `editionStatus`, `edition`, and nested `sections`.
- Page numbers are stored only where supplied/verified.

- [ ] **Step 1:** Encode the user-supplied Green Book hierarchy without inventing missing page numbers or problem counts.
- [ ] **Step 2:** Encode the user-supplied Red Book hierarchy and chapter start pages.
- [ ] **Step 3:** Encode the 2013 first-edition 150 Questions hierarchy and supplied page starts.
- [ ] **Step 4:** Run focused tests and commit.

### Task 4: Add 150 Questions source and manifest

**Files:**
- Create: `src/content/problem-sources/150-most-frequently-asked.md`
- Create: `src/data/quant-interview/150-most-frequently-asked.json`

**Interfaces:**
- Source record uses existing `problemSources` schema.
- Manifest must be valid under `validateIngestionManifest` and have `batches: []` while `sourceFile: null`.

- [ ] **Step 1:** Add source record with canonical title, three authors, FE Press publisher, 2013 first edition, ISBN-13 `9780979757648`, ISBN-10 alias in body/metadata where schema permits, and authoritative bibliographic link.
- [ ] **Step 2:** Add manifest with `editionStatus: edition-pinned`, exact edition/ISBN, `sourceFile: null`, `ingestionStatus: awaiting-source-file`, and zero batches.
- [ ] **Step 3:** If the existing validator rejects a pinned-edition manifest with no source file and zero batches, minimally refine it so bibliographic edition pinning and source-file readiness are distinct while still blocking batches without a source file.
- [ ] **Step 4:** Run focused tests and commit.

### Task 5: Integrate discovery documentation

**Files:**
- Modify: root `README.md`

**Interfaces:**
- Root README links to `docs/quant-interview/README.md`; it does not duplicate the full protocol.

- [ ] **Step 1:** Add a compact pointer under the Quant Interview section.
- [ ] **Step 2:** Run tests and commit.

### Task 6: Full verification and scope review

**Files:**
- No production file unless a verification defect requires a focused fix.

- [ ] **Step 1:** Run `npm run test` and require all tests passing.
- [ ] **Step 2:** Run `npm run check` and require 0 errors / 0 warnings (existing hints may remain).
- [ ] **Step 3:** Run `npm run build` and require success.
- [ ] **Step 4:** Compare branch with `main`; confirm no PDF/scan, no package changes, no source-derived Problem Markdown, no Green/Red edition pin.
- [ ] **Step 5:** Remove temporary CI workflow if one was used.
- [ ] **Step 6:** Finish branch through the normal integration workflow.
