# Quant Interview Preparation: Breadth, Basics & Deliberate Practice — Design Spec

**Date:** 2026-08-28
**Status:** Approved in conversation; pending written-spec review
**Workstream:** `interview-strategy-communication-interview-preparation-014`
**Branch:** `codex/quant-interview-preparation-014`

## 1. Goal

Process the first two pending records in the verified three-book master directory and publish one source-neutral Knowledge page that unifies broad foundational readiness with deliberate interview practice.

The approved public delta is exactly:

```text
+0 Problems
+1 Knowledge
76 Problems / 51 Knowledge after integration
```

## 2. Exact Sequential Scope

This workstream starts at the repository's verified first pending record and contains exactly two consecutive records:

1. `green-book::1.1::guidance`
   - source section: `1.1`
   - evidence: PDF page 17
   - canonical topic: `interview-preparation`
2. `green-book::1.2::guidance`
   - source section: `1.2`
   - evidence: PDF pages 17–18
   - canonical topic: `interview-preparation`

The next pending record is `red-book::1.10::guidance`. That is a source boundary, so it is excluded from workstream 014. Green sections 1.3–1.5 are already terminal under workstream 013 and are not reopened.

The scope contains guidance, not standalone interview questions. No Problem may be created, edited, or assigned to this workstream.

## 3. Product Decision

Both source records resolve to one canonical Knowledge page rather than two thin pages.

The two ideas form one preparation loop:

```text
build broad working basics
→ practice representative interview tasks
→ diagnose weak areas and communication failures
→ refresh the relevant basics
→ repeat under interview-like constraints
```

Breadth without practice produces inert recall. Practice without foundational breadth produces brittle pattern matching. One page makes that dependency explicit and gives the learner one reusable preparation system.

The page must be independently authored. It may express the durable principles above but must not reproduce source prose, source-specific anecdotes, book identity, or source section labels.

## 4. Public Knowledge Contract

### 4.1 Identity and metadata

Create:

```text
src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md
```

Exact frontmatter:

```yaml
title: Quant Interview Preparation: Breadth, Basics & Deliberate Practice
description: Build broad working fluency across core quant domains, then convert it into interview performance through representative practice, diagnosis, and repeated simulation.
date: 2026-08-28
type: concept
domain: Interview Strategy & Communication
category: Problem Solving Techniques
status: growing
tags: [Interview, Preparation, Practice, Learning]
quantInterviewTopics: [interview-strategy-communication, interview-preparation]
featured: false
related: [problem-framing-clarification-assumption-management, structured-think-aloud-reasoning]
relatedNotes: []
```

The title and body are source-neutral. The page does not claim that every quant role requires equal depth in every domain.

### 4.2 Learning objective

The page teaches the reader to:

- distinguish broad working fluency from specialist mastery;
- build a role-aware baseline spanning mathematics, probability, finance, programming, and problem solving;
- practice representative tasks before the interview rather than relying on passive review;
- use mistakes, slow reasoning, weak explanations, and unrecognized problem types as diagnostic evidence;
- revisit only the foundational gap responsible for the failure;
- rehearse under realistic time and communication constraints;
- maintain a repeatable readiness loop rather than an unbounded reading list.

“Broad” means enough familiarity to recognize concepts, assumptions, and common solution routes. It does not mean equal expertise across the whole taxonomy.

### 4.3 Required page structure

The public page contains these sections in this order:

1. `## Core Idea`
   - define breadth plus deliberate practice as one feedback system;
   - separate working basics from deep specialization.
2. `## The Preparation Loop`
   - present five explicit steps: map the role, establish baseline fluency, practice representative tasks, diagnose the bottleneck, repeat under constraints.
3. `## Build Breadth without Studying Everything`
   - use the canonical taxonomy as a coverage map;
   - prioritize recognition, assumptions, and first-line methods;
   - deepen only role-relevant or repeatedly weak areas.
4. `## Turn Practice into Evidence`
   - distinguish passive rereading from retrieval, derivation, coding, and spoken explanation;
   - record the failure mode, not only right/wrong.
5. `## Readiness Signals`
   - list observable signals: route recognition, assumption handling, solution recovery, concise explanation, and error diagnosis.
6. `## Common Mistakes`
   - warn against exhaustive study, memorized answers, volume without review, ignoring communication, and practicing only comfortable topics.
7. `## Interview Checks`
   - include four applied self-tests defined below.

The page may use one compact numbered loop and concise bullets. It must not include a completion percentage, universal hour target, fabricated hiring statistic, or claim that one preparation path fits every role.

### 4.4 Interview Checks

The checks are source-neutral and application-oriented:

1. Given a role that emphasizes derivatives and C++, choose a broad baseline and identify which areas need deeper study.
2. A learner repeatedly reaches correct answers but cannot explain assumptions. Classify the bottleneck and choose the next practice activity.
3. A learner solves many familiar questions but stalls on small variations. Diagnose the difference between memorization and working fluency.
4. Design one short mock-interview cycle that yields evidence about both technical reasoning and communication.

## 5. Relationship Graph

The new page links to:

- `problem-framing-clarification-assumption-management`
- `structured-think-aloud-reasoning`

Both existing pages receive a reciprocal `related` link to `quant-interview-preparation-breadth-and-practice`. Their public bodies remain unchanged; only frontmatter relationships change.

The relationship is factual:

- preparation practice supplies repeated opportunities to exercise framing and think-aloud skills;
- framing and think-aloud quality provide diagnostic evidence for what the learner should practice next.

No Note relationship is created. All three pages keep `relatedNotes: []`.

## 6. Source Dispositions

Both scoped source records become `knowledge-only`:

| Master key | Final state | Canonical Knowledge | Problem delta |
|---|---|---|---:|
| `green-book::1.1::guidance` | `knowledge-only` | `quant-interview-preparation-breadth-and-practice` | 0 |
| `green-book::1.2::guidance` | `knowledge-only` | `quant-interview-preparation-breadth-and-practice` | 0 |

Each resolution note states its distinct contribution:

- 1.1 contributes broad foundational readiness and the boundary between basics and specialization;
- 1.2 contributes deliberate practice, advance preparation, and using repeated performance as feedback.

Neither record is marked `interview-guidance`, because the combined principles support a durable public preparation framework with visible self-tests.

## 7. Master Directory and Legacy Coverage

Update the same two records in both private authorities:

```text
src/data/quant-interview/master-directory.json
src/data/quant-interview/coverage/green-book.json
```

For each record, set:

```json
{
  "state": "knowledge-only",
  "canonicalProblems": [],
  "canonicalKnowledge": [
    "quant-interview-preparation-breadth-and-practice"
  ]
}
```

The master records additionally set:

```json
"workstream": "interview-strategy-communication-interview-preparation-014"
```

The legacy coverage rows retain `sourceItem: null` and their existing topic ownership. Both layers must agree before any lifecycle transition passes.

After the two records become terminal, the first pending master record becomes `red-book::1.10::guidance`. That transition is asserted, but workstream 015 is not created or authorized.

## 8. Knowledge Catalog

Add one published module:

```json
{
  "slug": "quant-interview-preparation-breadth-and-practice",
  "title": "Quant Interview Preparation: Breadth, Basics & Deliberate Practice",
  "canonicalTopics": [
    "interview-strategy-communication",
    "interview-preparation"
  ],
  "primaryTopic": "interview-preparation",
  "learningOrder": 10,
  "status": "published",
  "prerequisites": []
}
```

The exact catalog becomes 51 published / 0 planned. The public Problem count remains 76.

## 9. Workstream Lifecycle

Create:

```text
src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-014.json
```

The active manifest contains:

- exact id and canonical topic path;
- status `active`;
- exact two master keys in sequential order;
- Green source sections 1.1 and 1.2;
- PDF evidence range 17–18;
- review outcome `knowledge-only-consolidation`;
- explicit `+0 Problems / +1 Knowledge` boundary;
- no completion evidence.

Completion follows the strict phase-safe pattern used by workstream 013:

1. active content and shared-state tests pass;
2. authoritative Node 24 local gates pass;
3. GitHub CI succeeds for the exact active SHA;
4. temporary CI artifacts, if any, are removed;
5. final-tree gates pass;
6. manifest records factual active-gate, CI, and final-tree evidence;
7. status becomes `complete`;
8. HANDOFF records 76/51 and the next pending key without activating 015.

## 10. Testing

Create focused tests for:

1. exact page metadata, title, topic path, and required sections;
2. public source neutrality and absence of a new Problem;
3. the five-step preparation loop, breadth boundary, diagnosis, common mistakes, and four Interview Checks;
4. reciprocal relationship graph across the three Knowledge pages;
5. exact master scope begins at the prior first pending key and contains only the two consecutive Green records;
6. master and legacy coverage agreement;
7. active/complete workstream lifecycle safety;
8. exact registry transition from 76/50 to 76/51;
9. next pending transition to `red-book::1.10::guidance`;
10. generated internal directory freshness and public private-state boundary.

The full gates remain:

```text
npm run master:directory:check
npm run knowledge:directory:check
npm run test
npm run check
npm run build
```

## 11. Exact Shared-State Delta

Create:

- one Knowledge Markdown file;
- one workstream manifest;
- focused content, workstream, and lifecycle tests.

Modify:

- two Green coverage rows;
- two master-directory rows;
- one knowledge-catalog entry;
- two existing Knowledge `related` arrays;
- exact source-neutral corpus regression from 50 to 51 Knowledge;
- generated `KNOWLEDGE_DIRECTORY.md`;
- `HANDOFF.md` during active and completed phases.

Do not modify:

- Problem Markdown files;
- taxonomy ids or order;
- source-topic map;
- Red or 150 coverage;
- completed workstream evidence 001–013;
- source PDFs or local source documents.

## 12. Exclusions and Non-Goals

- Red Book 1.10, 1.11, 9, 9.3, and 9.23–9.34 remain pending.
- Interview Process & Formats and Soft Interview remain outside this scope.
- No role taxonomy, employer taxonomy, or application tracker is created.
- No universal study schedule, question quota, or readiness score is invented.
- No Problem is created from general preparation guidance.
- Existing reasoning pages are not rewritten or re-owned.
- Workstream 015 is not reserved or activated by closing 014.

## 13. Success Criteria

Workstream 014 is complete only when:

1. the exact first two pending records are terminal `knowledge-only`;
2. one independently authored source-neutral Knowledge page exists at the approved slug;
3. the page teaches both broad working basics and deliberate practice as one feedback loop;
4. the page contains all required sections and four Interview Checks;
5. reciprocal links among the preparation, framing, and think-aloud pages are valid;
6. master and Green coverage states and targets agree;
7. the catalog and public corpus are exactly 76 Problems / 51 Knowledge;
8. no Problem or taxonomy file changes;
9. the generated internal directory is current;
10. the next pending key is `red-book::1.10::guidance`;
11. the active SHA has matching successful CI evidence;
12. final-tree Node 24 gates pass;
13. HANDOFF records factual closure and leaves 015 inactive.
