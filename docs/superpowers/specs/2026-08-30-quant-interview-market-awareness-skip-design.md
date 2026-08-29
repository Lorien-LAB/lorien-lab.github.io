# Red Book Market-Awareness Skip Audit Design

**Date:** 2026-08-30  
**Status:** Approved by explicit user instruction: skip this content  
**Ordinal:** None; workstream 016 remains unused

## Context

The three-book master directory contains 750 records. At the start of this audit, 182 are terminal and 568 are pending. The first pending record is `red-book::9::guidance`.

The next continuous queue block contains 14 Red Book records:

1. `red-book::9::guidance`
2. `red-book::9.3::guidance`
3. `red-book::9.3::9.23`
4. `red-book::9.3::9.24`
5. `red-book::9.3::9.25`
6. `red-book::9.3::9.26`
7. `red-book::9.3::9.27`
8. `red-book::9.3::9.28`
9. `red-book::9.3::9.29`
10. `red-book::9.3::9.30`
11. `red-book::9.3::9.31`
12. `red-book::9.3::9.32`
13. `red-book::9.3::9.33`
14. `red-book::9.3::9.34`

PDF inspection established that section 9 is a mixed soft-interview/current-finance chapter container. Section 9.3 asks for current equity-index levels, commodity prices, yield-curve shape, policy rates, exchange rates, unemployment data, office holders, crisis awareness, and regulatory structure. Most answers are date-sensitive; some named institutions and regulatory arrangements are obsolete.

The user explicitly directed that this content be skipped rather than published as Problems or Knowledge.

## Decision

Process the 14 records as a hidden audit-only skip:

- assign terminal state `interview-guidance`;
- publish no Problem and no Knowledge;
- retain no canonical public target;
- create item-level coverage entries for the twelve numbered prompts;
- store one distinct, nonempty resolution note per record;
- assign no workstream id;
- consume no ordinal; 016 remains available for the next real ingestion scope.

This is a queue disposition, not a claim that the material is already represented publicly.

## Goals

1. Respect the explicit decision not to publish time-sensitive market-awareness material.
2. Preserve all 14 source records in the internal audit trail instead of deleting them.
3. Make the queue advance deterministically to `red-book::1.1::guidance`.
4. Repair the over-broad section 9.3 evidence range from PDF pages 315–317 to 315–316.
5. Keep the public corpus exactly 76 Problems / 52 Knowledge.
6. Preserve ordinal 016 for the next bounded content-producing or substantive audit workstream.

## Non-goals

- No public Problem, Knowledge, route, catalog entry, graph edge, or page is created.
- No current market data is researched or published.
- No answer is generated for questions 9.23–9.34.
- No existing public page is expanded to absorb these prompts.
- No taxonomy or source-topic mapping is changed.
- Red Book 9.2 soft-interview material is not processed.
- Red Book 1.1–1.9 interview-process material is not processed.
- Workstream 016 is not created, activated, completed, or referenced as the owner of these records.
- No whole-book or whole-topic completeness claim is made.

## Exact source evidence

### Chapter container

`red-book::9::guidance` remains at PDF page 309. It is a mixed chapter introduction and has no independent public target.

### Section container

`red-book::9.3::guidance` is repaired to PDF pages 315–316. PDF page 317 starts chapter 10 and must not remain inside the section 9.3 evidence range.

### Numbered prompts

Questions 9.23–9.34 all remain at PDF page 316. They have no source answer pages and receive no fabricated solution.

## Hidden coverage contract

Update `src/data/quant-interview/coverage/red-book.json`.

The existing section 9 and section 9.3 aggregate entries become `interview-guidance` with empty `canonicalProblems` and `canonicalKnowledge` arrays.

Add twelve item-level entries for source items `9.23` through `9.34`. Each entry follows the existing section 9.3 coverage-topic contract:

```json
[
  "interview-preparation",
  "fixed-income-rates-general-finance"
]
```

Each item is terminal `interview-guidance`, with empty public targets and a distinct resolution note.

The resolution notes distinguish these reasons:

- chapter-level mixed container;
- section-level current-market prompt collection;
- current equity benchmark level;
- current commodity price;
- current yield-curve snapshot;
- current US policy rate;
- current UK policy rate;
- current euro-area policy rate;
- source-era crisis/current-affairs prompt;
- current FX rate;
- current labor-market comparison;
- current central-bank office holder in the US;
- current central-bank office holder in the UK;
- source-era UK regulatory architecture.

Every note states why the row is excluded from the durable public technical question bank. Notes must not imply that current facts were verified.

## Master-directory contract

Update the same 14 records in `src/data/quant-interview/master-directory.json`:

- state: `interview-guidance`;
- `canonicalProblems`: empty;
- `canonicalKnowledge`: empty;
- `workstream`: null;
- `resolutionNote`: exactly matches the corresponding coverage note;
- section 9.3 guidance pages: 315–316;
- numbered prompt pages: unchanged at 316.

No other master row changes.

After the transition:

- terminal records: 196;
- pending records: 554;
- first pending record: `red-book::1.1::guidance`.

## Public corpus and generated directory

The source-neutral public corpus remains exactly:

- 76 Problems;
- 52 topic-classified Knowledge nodes.

Regenerate `docs/quant-interview/KNOWLEDGE_DIRECTORY.md`. It must show the fourteen rows as terminal `interview-guidance`, no public targets, unchanged public counts, and first pending Red 1.1.

Update `docs/quant-interview/HANDOFF.md` with a short durable audit section:

- identify the exact 14 skipped records;
- record the time-sensitive/obsolete-current-affairs reason;
- state `+0 Problems / +0 Knowledge`;
- state that no workstream ordinal was consumed;
- state that 016 is not active;
- set the first pending master record to `red-book::1.1::guidance`.

The completed workstream 15 section and all historical verification evidence remain unchanged.

## Test contract

Create `tests/quant-interview-market-awareness-skip.test.mjs`.

The test must prove:

1. the exact 14 keys are the only records in this skip audit;
2. every master row and matching coverage entry is `interview-guidance`;
3. every row has empty Problem and Knowledge targets;
4. every row has no workstream owner;
5. every row has a distinct, nonempty resolution note;
6. master and coverage notes match exactly;
7. section 9.3 guidance uses pages 315–316;
8. questions 9.23–9.34 use page 316 and have no solution pages;
9. no public content file, catalog entry, or graph node is created for market-awareness/current-data material;
10. the public corpus remains 76/52;
11. terminal/pending counts become 196/554;
12. `getNextPendingItem` returns `red-book::1.1::guidance`;
13. no workstream id ending in 016 exists;
14. HANDOFF and the generated directory record the same factual state.

Update existing current-queue tests from Red 9 to Red 1.1 without weakening historical workstream 015 completion evidence.

## Failure behavior

The audit fails closed if:

- any of the 14 records remains pending;
- any extra record is included;
- any public target is assigned;
- any resolution note is empty, duplicated, or mismatched;
- the page repair is missing;
- public counts change;
- the next pending key is not Red 1.1;
- a 016 workstream is created;
- HANDOFF or the generated directory claims public coverage for the skipped material.

Tests must reject these states rather than broadening counts or regular expressions.

## Verification

Run in order:

1. `npm run master:directory:check`
2. `npm run knowledge:directory:check`
3. `npm run test`
4. `npm run check`
5. `npm run build`

Run the same final tree through an independent WSL native-LF Node 24 checkout. No temporary workstream CI workflow is required because this audit has no active/complete workstream lifecycle and publishes no content.

## Acceptance criteria

The skip audit is complete only when:

1. exactly 14 specified records are terminal `interview-guidance`;
2. all 14 have distinct internal reasons and no public target;
3. section 9.3 evidence ends at PDF page 316;
4. no public file or registry count changes;
5. the directory and HANDOFF are current;
6. Red 1.1 is the first pending key;
7. workstream 016 remains unused;
8. Windows and WSL verification are green;
9. the branch diff contains no source PDF, rendered page, current-data answer, or unrelated change.
