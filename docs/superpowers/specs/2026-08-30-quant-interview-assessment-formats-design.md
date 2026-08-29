# Quant Interview Formats & Assessment Strategy — Workstream 016 Design

**Date:** 2026-08-30
**Status:** Approved through continued-goal execution of the recommended selective-ingestion scope
**Workstream:** `interview-strategy-communication-interview-process-formats-assessment-strategy-016`

## Context

The three-book master directory is the authoritative ingestion queue. After the Red Book market-awareness skip audit, the repository has:

- 750 master records;
- 196 terminal records;
- 554 pending records;
- 76 canonical Problems;
- 52 topic-classified Knowledge nodes;
- first pending record `red-book::1.1::guidance`.

The next continuous pending block contains Red Book sections 1.1 through 1.9, all owned by `interview-process-formats`:

1. `red-book::1.1::guidance` — Introduction
2. `red-book::1.2::guidance` — Getting an interview
3. `red-book::1.3::guidance` — The standard interview
4. `red-book::1.4::guidance` — The phone interview
5. `red-book::1.5::guidance` — The take-home exam
6. `red-book::1.6::guidance` — The exam
7. `red-book::1.7::guidance` — Follow-up
8. `red-book::1.8::guidance` — Dos and don'ts
9. `red-book::1.9::guidance` — When to apply?

PDF review shows that the block mixes reusable assessment strategy with dated recruiting logistics. The durable material covers live technical interviews, remote interviews, take-home work, written exams, clarification, reasoning communication, integrity, deliverable quality, and readiness. Recruiter/headhunter advice, employer-specific logistics, expense practices, dress prescriptions, dated communications technology, and post-application relationship advice should not become public Knowledge.

## Approved approach

Apply selective ingestion rather than publishing all nine sections or skipping the entire block.

Create one new public Knowledge page for assessment formats and execution strategy. Reuse existing preparation, framing, and think-aloud Knowledge where the source material tests those identities. Close two dated recruiting/process sections as target-free `interview-guidance`.

This approach keeps the public library useful without pretending that every paragraph in an interview book is a durable technical learning object.

## Goals

1. Process exactly Red 1.1–1.9 in master-directory order.
2. Publish one source-neutral Knowledge page covering modern interview assessment formats.
3. Reuse existing preparation and reasoning nodes instead of duplicating them.
4. Skip only the dated job-search/follow-up material that has no durable public learning target.
5. Repair Red 1.7 evidence from pages 19–20 to page 19 only.
6. Advance the public corpus from 76/52 to 76/53.
7. Advance master state from 196/554 to 205/545.
8. Make `red-book::9.2::guidance` the next pending record.
9. Close workstream 016 only with exact local, WSL, and real GitHub CI evidence.

## Non-goals

- No public Problem is created.
- Red 9.2 soft-interview questions are not processed.
- No recruiter, headhunter, networking, compensation, expense, employer, clothing, food/drink, phone-line, or named-firm advice is published.
- No source book name, section, page, author, or source prose appears in public content.
- No copied answer/checklist is published.
- No taxonomy or source-topic-map change is made.
- No existing Problem ownership changes.
- No whole-book or whole-topic completeness claim is made.
- Workstream 017 is not created or authorized.

## Public Knowledge contract

Create:

`src/content/knowledge/concepts/quant-interview-formats-and-assessment-strategy.md`

Required frontmatter:

```yaml
title: Quant Interview Formats & Assessment Strategy
description: Prepare for live technical interviews, remote screens, take-home work, and written exams by clarifying constraints, communicating reasoning, preserving integrity, and matching the deliverable to the assessment format.
date: 2026-08-30
type: concept
domain: Interview Strategy & Communication
category: Problem Solving Techniques
status: growing
tags: [Interview, Assessment, Take-Home, Written Exam]
quantInterviewTopics: [interview-strategy-communication, interview-process-formats]
featured: false
related: [quant-interview-preparation-breadth-and-practice, problem-framing-clarification-assumption-management, structured-think-aloud-reasoning]
relatedNotes: []
```

Add reciprocal `quant-interview-formats-and-assessment-strategy` links to exactly those three existing Knowledge pages. Do not change their canonical topic ownership.

## Public content model

### Core idea

Assessment format changes the optimal execution strategy, but not the underlying quality bar. A strong candidate first clarifies the rules and deliverable, then demonstrates correct modeling, transparent reasoning, appropriate depth, and professional integrity under the format’s constraints.

### Assessment map

The page distinguishes four reusable formats:

- live technical interview;
- remote or phone screen;
- take-home assessment;
- supervised written exam.

Each format is compared by interaction level, time horizon, allowed tools, expected artifact, feedback availability, and communication channel.

### Before the assessment

Teach candidates to clarify:

- duration and deadline;
- synchronous versus asynchronous work;
- open-book, calculator, editor, language, and library rules;
- expected depth: sketch, correct solution, optimized solution, or production-quality artifact;
- required explanation, tests, assumptions, and file format;
- collaboration and external-resource boundaries.

### Live technical execution

Connect to the existing framing and think-aloud nodes:

- restate the problem and constraints;
- ask high-value clarification questions;
- state assumptions;
- choose a first route and explain decisive steps;
- use hints as evidence and update the model;
- distinguish a short correct solution from a requested optimal one.

### Remote-screen execution

Preserve only durable communication principles:

- test the communication environment;
- keep working materials available;
- verbalize transitions that would be visible on a whiteboard;
- confirm shared understanding more frequently;
- maintain a fallback communication path.

Do not preserve source-era landline/mobile prescriptions.

### Take-home execution

Teach:

- scope and timebox before implementation;
- independent work and explicit resource attribution;
- readable assumptions and reasoning;
- correctness checks and reproducible instructions;
- clear presentation proportional to the task;
- final review against the requested deliverable.

The page must explicitly reject copied solutions or disguised external work.

### Written-exam execution

Teach:

- confirm rules and allowed tools;
- scan the whole paper and allocate time;
- show enough derivation for partial credit;
- state assumptions when wording is ambiguous;
- move on and return rather than sinking the full budget into one item;
- reserve time for consistency checks.

### Format-independent review

After any assessment, classify failures as knowledge, modeling, mechanics, time allocation, communication, or deliverable mismatch, then feed the result into the existing deliberate-practice loop.

### Common mistakes

Cover format mismatch, unasked assumptions, silent reasoning, unverified copied work, over-engineering a sketch, under-explaining a take-home, ignoring tool rules, and failing to reserve review time.

### Interview Checks

Include at least six public self-tests:

1. what must be clarified before a take-home begins;
2. how live and take-home communication differ;
3. when to ask whether an optimized solution is required;
4. how to respond to a hint during a live interview;
5. how to allocate a supervised written-exam time budget;
6. how to diagnose a failure caused by format mismatch rather than missing knowledge.

## Source-neutrality boundary

Public content must not contain:

- Red Book or canonical source title;
- source section ids or pages;
- source-era recruiter/headhunter firms;
- named employers;
- UK/US expense claims;
- suit, food, lemonade, sugar, landline, or mobile-phone prescriptions;
- claims about interviewers, bankers, or candidates as personality groups;
- copied source checklist wording.

The public page is an independently authored framework derived from the bounded evidence.

## Catalog and graph

Add the new page under `interview-process-formats` in `src/data/quant-interview/topics/knowledge-catalog.json`:

- slug: `quant-interview-formats-and-assessment-strategy`;
- title: `Quant Interview Formats & Assessment Strategy`;
- primary topic: `interview-process-formats`;
- canonical topics: `interview-strategy-communication`, `interview-process-formats`;
- learning order: 12;
- status: `published`;
- prerequisites: empty.

The existing preparation page remains order 10 and role/employer fit remains order 11.

## Exact source dispositions

### Red 1.1

- state: `knowledge-only`;
- canonical Knowledge: new assessment-formats page;
- reason: durable distinction between technical ability, behavior, and assessment goals.

### Red 1.2

- state: `interview-guidance`;
- no public target;
- reason: dated networking, recruiter, and headhunter logistics.

### Red 1.3

- state: `knowledge-only`;
- canonical Knowledge targets:
  - new assessment-formats page;
  - `problem-framing-clarification-assumption-management`;
  - `structured-think-aloud-reasoning`;
- reason: live technical format, clarification, reasoning communication, and adaptive hints.

### Red 1.4

- state: `knowledge-only`;
- canonical Knowledge: new assessment-formats page;
- reason: durable remote-screen communication, excluding source-era technology prescriptions.

### Red 1.5

- state: `knowledge-only`;
- canonical Knowledge: new assessment-formats page;
- reason: take-home constraints, integrity, presentation, and deliverable quality.

### Red 1.6

- state: `knowledge-only`;
- canonical Knowledge: new assessment-formats page;
- reason: supervised written-exam rules, tools, time allocation, and clarity.

### Red 1.7

- state: `interview-guidance`;
- no public target;
- reason: post-application follow-up and relationship logistics are outside the durable technical library;
- page repair: PDF pages 19–20 become page 19.

### Red 1.8

- state: `knowledge-only`;
- canonical Knowledge: new assessment-formats page;
- reason: reusable execution/integrity checklist after removing dated prescriptions.

### Red 1.9

- state: `knowledge-only`;
- canonical Knowledge: `quant-interview-preparation-breadth-and-practice`;
- reason: readiness signals belong to the existing preparation loop, not a duplicate page.

Every row receives a distinct nonempty resolution note. Master and Red coverage notes and targets match exactly.

## Workstream manifest

Create:

`src/data/quant-interview/workstreams/interview-strategy-communication-interview-process-formats-assessment-strategy-016.json`

Active manifest contract:

- status `active`;
- canonical topics: `interview-strategy-communication`, `interview-process-formats`;
- exact nine master keys in queue order;
- Red source scope sections 1.1–1.9, evidence PDF pages 13–22;
- review outcome `selective-knowledge-and-guidance`;
- public delta `{ problems: 0, knowledge: 1 }`;
- new Knowledge slug only;
- no completion evidence fields while active.

## Counts and queue transition

After the nine rows become terminal:

- Problems: 76;
- Knowledge: 53;
- terminal master records: 205;
- pending master records: 545;
- first pending: `red-book::9.2::guidance`.

Workstream 017 remains inactive and unauthorized.

## HANDOFF and directory lifecycle

While active, HANDOFF records:

- current bounded topic Interview Strategy & Communication → Interview Process & Formats;
- active 016 exact nine-row scope;
- +0/+1 public delta;
- next pending after active scope Red 9.2;
- no completion evidence;
- 017 not authorized.

Regenerate the Knowledge directory to 76/53 and active 016 state.

After exact active-SHA verification succeeds, remove the temporary workflow and record completed 016 with factual evidence. The final HANDOFF has no active bounded topic, first pending Red 9.2, and 017 inactive.

## Testing

### Public content test

Create a focused test that pins:

- complete exact frontmatter;
- required headings and comparison dimensions;
- at least six Interview Checks;
- explicit integrity/copying boundary;
- reciprocal graph links;
- catalog order 12;
- no public Problem;
- full source-neutral blacklist, including both source-first and provenance-first wording.

### Workstream test

Create a focused test that pins:

- exact nine keys and exclusive reverse ownership;
- exact disposition/target mapping for every row;
- distinct exact notes mirrored by master and coverage;
- exact identity/sortKey/page preservation;
- Red 1.7 page repair only;
- 76/53 and 205/545;
- next Red 9.2;
- no 017.

### Lifecycle test

Create a phase-aware test:

- active state has no evidence fields and exact active HANDOFF language;
- complete state requires one exact active SHA shared by local and CI evidence, positive CI run id, five ordered commands, WSL native-LF Node 24, workflow absence, completed HANDOFF section, 76/53, Red 9.2, and inactive 017.

Update prior current-queue tests without weakening historical 015 or skip-audit evidence.

## Verification and closure

Run in exact order:

1. `npm run master:directory:check`
2. `npm run knowledge:directory:check`
3. `npm run test`
4. `npm run check`
5. `npm run build`

Verify the immutable active commit in:

- Windows local environment;
- independent WSL native-LF Node 24 checkout;
- real temporary GitHub Actions workflow on the same active SHA.

Then remove the temporary workflow, verify the workflow-free tree, record factual completion, rerun final Windows/WSL gates, and push the final feature branch.

## Acceptance criteria

Workstream 016 is complete only when:

1. exactly nine source rows are terminal under the approved selective mapping;
2. the new source-neutral Knowledge page is published and reciprocally linked;
3. two dated rows have no public target;
4. Red 1.9 reuses the existing preparation page;
5. Red 1.7 evidence is page 19 only;
6. no Problem is added;
7. exact corpus is 76/53;
8. exact master state is 205/545;
9. Red 9.2 is next;
10. active SHA passes Windows, WSL, and real CI;
11. final tree has no temporary workflow;
12. HANDOFF and generated directory agree;
13. no source PDF, rendered page, dated advice, copied prose, or unrelated change is committed;
14. workstream 017 remains inactive.
