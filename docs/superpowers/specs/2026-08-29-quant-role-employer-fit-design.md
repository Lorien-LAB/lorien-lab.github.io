# Quant Role & Employer Fit — Workstream 015 Design

**Date:** 2026-08-29  
**Status:** Approved for implementation planning  
**Workstream:** `interview-strategy-communication-interview-preparation-role-employer-fit-015`

## Context

The three-book master directory is the authoritative ingestion queue. Workstream 014 is complete, the source-neutral public corpus contains exactly 76 Problems and 51 topic-classified Knowledge nodes, and no bounded workstream is active.

The first pending master record is `red-book::1.10::guidance`. The next record, `red-book::1.11::guidance`, is consecutive and has the same `interview-preparation` ownership. Red Book section 1.12 is already terminal as `interview-guidance`, so it is not reopened. The next pending record after the approved 015 scope is `red-book::9::guidance`; observing that transition does not authorize workstream 016.

Visual inspection of the pinned Red Book PDF established the content boundaries:

- section 1.10, “The different roles,” occupies PDF pages 22–23;
- section 1.11, “Sorts of employers,” begins on PDF page 24 and finishes at the top of PDF page 25;
- section 1.12 begins on PDF page 25 and is outside this workstream.

The current master record for section 1.10 is over-broad at pages 22–24. Workstream 015 repairs it to pages 22–23. Section 1.11 remains pages 24–25.

## Goals

1. Process the first two consecutive pending master records in exact queue order.
2. Distill their durable reasoning into one source-neutral public Knowledge page.
3. Separate role function from employer environment while making their interaction explicit.
4. Preserve page, source, section, and resolution evidence only in internal data.
5. Close both records with item-level `knowledge-only` decisions and distinct resolution notes.
6. Advance the source-neutral registry from 76 Problems / 51 Knowledge to 76 Problems / 52 Knowledge.
7. Preserve the active-to-complete evidence lifecycle used by workstream 014.

## Non-goals

- No public Problem is added.
- No source book, section number, page number, author, or source-specific employer example appears in public content.
- No 2008-era salary claim, named-company comparison, hiring forecast, or claim about ease of career switching is republished.
- Red Book sections 1.12, 9, and 9.3 are not reopened or processed.
- The workstream does not claim completeness for Interview Preparation, Interview Strategy & Communication, or any source book.
- Workstream 016 is not created, activated, or implied.
- No unrelated taxonomy, layout, component, or content refactor is included.

## Considered approaches

### A. One role-and-employer-fit Knowledge node — approved

Create one Knowledge page that treats role function and employer environment as two independent but interacting axes. This produces a complete decision framework without creating thin nodes.

### B. Two separate Knowledge nodes

One node would describe quant role archetypes and another employer environments. This improves literal lookup but over-fragments a small, tightly coupled evidence set and creates two weak pages.

### C. Expand the existing preparation-loop Knowledge node

This avoids a new node but mixes two different user questions: how to prepare and how to choose a role and environment. It weakens the existing page boundary.

Approach A is approved because it is the smallest coherent public model and supports reciprocal linking to the existing preparation loop.

## Public Knowledge contract

Create:

`src/content/knowledge/concepts/quant-role-and-employer-fit.md`

Required frontmatter:

```yaml
title: Quant Role & Employer Fit
description: Compare quant roles and employer environments through work product, research-engineering balance, decision proximity, time horizon, risk ownership, and transferable skills.
date: 2026-08-29
type: concept
domain: Interview Strategy & Communication
category: Problem Solving Techniques
status: growing
tags: [Interview, Careers, Quant Roles, Employer Fit]
quantInterviewTopics: [interview-strategy-communication, interview-preparation]
featured: false
related: [quant-interview-preparation-breadth-and-practice]
relatedNotes: []
```

The existing `quant-interview-preparation-breadth-and-practice` node gains the reciprocal `quant-role-and-employer-fit` relation. No other existing Knowledge ownership changes.

## Public content model

### Core idea

Career fit is not determined by a job title alone. A useful comparison separates:

1. the function performed by the role; and
2. the operating environment created by the employer.

The result is a revisable fit hypothesis, not a universal ranking.

### Role-function axis

The page describes durable role archetypes in original, source-neutral language:

- pricing and trading support;
- model validation and risk;
- quantitative research;
- quantitative development;
- systematic research and trading;
- portfolio and capital modeling.

The archetypes are compared by work product rather than prestige, compensation, or a fixed title taxonomy.

### Employer-environment axis

The page describes broad operating environments:

- banks and sell-side institutions;
- hedge funds, market makers, and proprietary trading firms;
- asset managers;
- consulting, audit, and model-validation organizations;
- financial-software and financial-technology companies.

Named firms and time-sensitive industry commentary remain excluded.

### Common comparison lens

Every role/environment combination is evaluated through the same questions:

- What is the principal work product?
- How much research, engineering, validation, and production ownership is involved?
- How close is the role to a live decision, client, or risk limit?
- What time horizon and feedback cycle dominate the work?
- What pace and ambiguity should be expected?
- Which skills remain transferable if the organization or market changes?
- Does the combination match the candidate’s demonstrated strengths, interests, and desired growth path?

### Decision workflow

The public page teaches a compact, reusable loop:

1. identify the problems the candidate wants to solve;
2. describe the desired daily work and output;
3. compare role function independently from employer environment;
4. collect evidence from job descriptions, conversations, and representative tasks;
5. state a provisional preference and revise it when evidence changes.

This loop must connect career choice to interview preparation without implying that one role or employer type is universally superior.

### Interview Checks

The page includes at least four public self-tests covering:

1. the difference between role function and employer environment;
2. comparison of two roles using the common lens;
3. how a similar title can imply different work in different institutions;
4. how to communicate a reasoned but revisable role preference to an interviewer.

These checks make both source records valid terminal `knowledge-only` entries.

## Source-neutrality and copyright boundary

The page is independently authored from the durable ideas established by the bounded evidence. It must not copy source prose or preserve the source’s numbered list as a disguised rewrite.

The following remain internal only:

- source slug;
- book title;
- section numbers 1.10 and 1.11;
- PDF pages 22–25;
- item-level disposition and resolution notes;
- workstream identity.

Public content may name current role and employer archetypes only as generic categories necessary for the framework.

## Catalog and graph registration

Add the page to `src/data/quant-interview/topics/knowledge-catalog.json` under `interview-preparation`:

- state: `published`;
- order: `11`;
- prerequisites: empty;
- slug: `quant-role-and-employer-fit`.

The existing preparation page remains order 10. Both pages link reciprocally. The public count becomes exactly 52 topic-classified Knowledge nodes.

## Hidden coverage decisions

Update `src/data/quant-interview/coverage/red-book.json`:

### `red-book::1.10::guidance`

- state: `knowledge-only`;
- canonical Problems: none;
- canonical Knowledge: `quant-role-and-employer-fit`;
- resolution note: role archetypes and work-product trade-offs resolve to the canonical role-and-employer-fit framework.

### `red-book::1.11::guidance`

- state: `knowledge-only`;
- canonical Problems: none;
- canonical Knowledge: `quant-role-and-employer-fit`;
- resolution note: employer operating environments and their interaction with role choice resolve to the same canonical framework.

The two notes must remain distinct and nonempty.

## Master-directory transition

Update the same two records in `src/data/quant-interview/master-directory.json`:

- preserve their canonical topics;
- assign workstream `interview-strategy-communication-interview-preparation-role-employer-fit-015`;
- set state to `knowledge-only`;
- resolve both to `quant-role-and-employer-fit`;
- preserve the distinct resolution notes;
- repair section 1.10 evidence from pages 22–24 to pages 22–23;
- preserve section 1.11 evidence at pages 24–25.

After the transition, `getNextPendingItem` must return `red-book::9::guidance`.

## Workstream manifest

Create:

`src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-role-employer-fit-015.json`

The active manifest records:

- exact id and canonical topics;
- status `active`;
- exactly two `masterItemKeys` in queue order;
- a Red Book source scope for sections 1.10 and 1.11;
- evidence pages 22–25, with item-level page precision retained in the master directory;
- review outcome `knowledge-only-consolidation`;
- public delta `{ problems: 0, knowledge: 1 }`;
- Knowledge slug `quant-role-and-employer-fit`.

While active, the manifest must not contain `preClosureActiveGate`, `verification`, or `finalTreeGate`.

## Handoff and generated directory

While active, `docs/quant-interview/HANDOFF.md` states:

- current bounded topic: Interview Strategy & Communication → Interview Preparation;
- workstream 015 is active;
- exact two-record scope;
- public delta +0 Problems / +1 Knowledge;
- first pending record after the active scope is `red-book::9::guidance`;
- workstream 016 is not authorized.

Regenerate `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`. It must display:

- 76 Problems;
- 52 Knowledge;
- workstream 015 and its current lifecycle state;
- both Red source records resolving to the new Knowledge page;
- first pending `red-book::9::guidance`.

## Test-first implementation

### Public content tests

Add a focused content test that initially fails and then proves:

- valid YAML frontmatter;
- exact metadata and source-neutrality;
- role-function axis;
- employer-environment axis;
- common comparison lens;
- decision workflow;
- at least four Interview Checks;
- reciprocal link with the preparation-loop page;
- no classified Problem is introduced.

### Workstream and repository tests

Add a focused workstream test that initially fails and then proves:

- exactly the two approved keys are owned by 015;
- they are the first two sequential pending records before implementation;
- both resolve `knowledge-only` to the real new page;
- section 1.10 uses PDF pages 22–23;
- section 1.11 uses PDF pages 24–25;
- the corpus is exactly 76 Problems / 52 Knowledge;
- the next pending key becomes `red-book::9::guidance`.

Update existing exact-count and lifecycle tests only where the approved +1 Knowledge delta or 015 state requires it. No historical checkpoint is rewritten.

### Completion lifecycle test

The completion test is phase-aware:

- active state rejects fabricated evidence fields and requires active HANDOFF language;
- complete state requires one exact 40-character active commit SHA shared by `preClosureActiveGate.commit` and `verification.commit`;
- verification requires a real positive GitHub Actions run id and the exact ordered commands;
- final-tree evidence requires the temporary workflow to be absent;
- HANDOFF must record completed workstream 15, the exact two source keys, 76/52, next pending Red 9, and that workstream 016 is not active or authorized.

## Failure behavior

The workstream fails closed:

- invalid YAML blocks content validation and Astro build;
- a missing reciprocal relation blocks graph tests;
- a missing or duplicate catalog entry blocks directory generation;
- page-boundary drift blocks the focused workstream test;
- a missing resolution note blocks terminal coverage validation;
- an unexpected Problem or Knowledge count blocks repository validation;
- a different next pending key blocks sequential-ingestion validation;
- absent or mismatched local/CI evidence keeps the workstream active;
- a present temporary workflow blocks completion.

No failing state is converted to complete by weakening counts, broadening regexes, or recording placeholder evidence.

## Verification and closure

Run these commands in order:

1. `npm run master:directory:check`
2. `npm run knowledge:directory:check`
3. `npm run test`
4. `npm run check`
5. `npm run build`

The active integrated commit must pass:

- Windows local verification;
- an independent WSL native-LF checkout using Node 24;
- a temporary GitHub Actions workflow on the exact active SHA.

After CI succeeds:

1. remove the temporary workflow;
2. verify the workflow-free tree in WSL;
3. record factual `preClosureActiveGate`, `verification`, and `finalTreeGate` fields;
4. mark 015 complete;
5. update HANDOFF and regenerate the Knowledge directory;
6. run the full ordered commands again on the final closure commit.

## Acceptance criteria

Workstream 015 is complete only when all of the following are true:

1. the one approved source-neutral Knowledge page exists and is published;
2. the existing preparation page links back to it;
3. exactly Red 1.10 and 1.11 are terminal under 015;
4. both rows use distinct nonempty resolution notes and the same real Knowledge target;
5. Red 1.10 uses pages 22–23 and Red 1.11 uses pages 24–25;
6. no Problem is added;
7. the exact public corpus is 76 Problems / 52 Knowledge;
8. the generated directory is current;
9. the first pending record is `red-book::9::guidance`;
10. exact Windows, WSL, and GitHub CI verification succeeds;
11. the temporary workflow is absent from the final tree;
12. HANDOFF records completed 015 and explicitly leaves 016 inactive.
