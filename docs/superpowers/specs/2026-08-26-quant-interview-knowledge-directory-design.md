[ERROR] - (starship::print): Under a 'dumb' terminal (TERM=dumb).

# Quant Interview Knowledge Directory — Design Spec

**Date:** 2026-08-26
**Status:** Approved
**Product direction:** A systematic quantitative-interview learning system
**Branch:** `codex/quant-interview-knowledge-directory`

## 1. Goal

Create one canonical, machine-readable curriculum catalog for the Topic-first Quant Interview Knowledge System and derive two distinct views from it:

1. a public, source-neutral learning directory that helps readers move from Topic to Subtopic to Knowledge and then to practice Problems; and
2. an internal extraction directory that helps agents reconcile the three verified books into planned and published Knowledge without exposing private source evidence.

The directory is built before further topic ingestion so every later workstream has an explicit destination in the learning system. It must not replace the existing taxonomy, source-topic map, coverage ledgers, workstream manifests, or public content collections.

## 2. Product Decisions

- The product is a systematic learning system, not merely a portfolio index.
- One canonical curriculum catalog drives both the public and internal directories.
- The public directory remains source-neutral. Book names, source sections, item identifiers, page evidence, hashes, coverage states, and dedup decisions never enter the public build.
- The internal directory may display source and coverage state, but it is a repository document, not a public route.
- Existing taxonomy ids remain canonical. The catalog references them; it does not create a competing taxonomy.
- Existing public Knowledge and Problems remain the source of truth for published content. The catalog may plan future Knowledge, but it never fabricates a published page.
- Directory counts are derived. No total, completion count, or status may be hand-maintained in page copy.
- No whole-book completeness percentage is displayed. Verified files and TOCs do not imply problem-level coverage.
- Workstream 013 remains a separate bounded ingestion workstream. The directory must be complete and independently verified before 013 is integrated.

## 3. Scope

### 3.1 In scope

- a public-safe curriculum catalog covering every current taxonomy Topic and Subtopic;
- ordered Knowledge modules with `planned` or `published` state;
- optional prerequisite relationships between curriculum modules;
- a public directory route with topic navigation, search, published/planned filters, Knowledge links, and Problem practice links;
- updates to the Quant Interview hub so each Topic offers both Learn and Practice actions;
- a deterministic internal Markdown directory generated from the catalog plus hidden repository state;
- validation that catalog entries, published content, taxonomy nodes, relationships, and generated output remain synchronized;
- explicit inclusion of the two approved Workstream 013 Knowledge modules as planned entries;
- desktop and mobile browser QA.

### 3.2 Out of scope

- publishing any source book, scan, excerpt, answer key, source item id, or page number;
- changing the public canonical Problem model or route;
- completing, integrating, or closing Workstream 013;
- adding learning-progress persistence, user accounts, bookmarks, completion tracking, or a backend;
- automatically generating curriculum order from AI or source order;
- claiming source or book completeness;
- translating the full Knowledge corpus in this phase;
- adding a graph visualization or external Obsidian synchronization;
- fixing unrelated Knowledge landing-page, formula-rendering, or general taxonomy issues unless they block this directory.

## 4. Information Architecture

The public navigation becomes:

```text
/knowledge/
└─ /knowledge/quant-interview/
   ├─ /knowledge/quant-interview/directory/   Learn
   └─ /problems/                              Practice
```

The learning directory uses the existing canonical hierarchy:

```text
Top-level Topic
└─ Subtopic
   ├─ Ordered Knowledge modules
   └─ Practice action for Problems classified to that topic ancestry
```

The Quant Interview hub remains the overview page. Its Topic cards gain two explicit actions:

- `Learn` links to the matching anchor on the Knowledge directory;
- `Practice` links to the existing topic-filtered Problem Bank.

The directory route is the complete curriculum view. It must not duplicate the generic `/knowledge/` index or expose books as navigation categories.

## 5. Canonical Curriculum Catalog

Create:

```text
src/data/quant-interview/topics/knowledge-catalog.json
```

The catalog is public-safe and contains no source evidence. Its top-level contract is:

```json
{
  "version": 1,
  "modules": []
}
```

Each module uses:

```json
{
  "slug": "conditional-expectation-tower-property",
  "title": "Conditional Expectation and the Tower Property",
  "canonicalTopics": [
    "probability-statistics",
    "expectation-variance-covariance"
  ],
  "primaryTopic": "expectation-variance-covariance",
  "learningOrder": 20,
  "status": "published",
  "prerequisites": ["conditioning"]
}
```

### 5.1 Field rules

- `slug` is globally unique and URL-safe.
- `title` is a source-neutral public curriculum label.
- `canonicalTopics` is an ordered multi-classification and must match the published Knowledge frontmatter when `status` is `published`. For every listed Topic, all of its taxonomy ancestors must appear earlier in the array; sibling Topics may coexist after their shared ancestor.
- `primaryTopic` is exactly the final id in `canonicalTopics`. It determines the module's single directory placement and learning order; other listed Topics remain cross-classifications for search, counts, and relationships.
- `learningOrder` is a positive integer unique within one `primaryTopic`.
- `status` is exactly `planned` or `published`.
- `prerequisites` contains catalog slugs only, forms no cycles, and never points to the module itself.

### 5.2 Published modules

Every explicitly topic-classified public Knowledge entry must appear exactly once as a `published` module. The catalog title and topic ids must match the Markdown frontmatter. A published catalog module without a real Knowledge page is invalid.

### 5.3 Planned modules

A planned module reserves a source-neutral learning destination before a later workstream authors the page. It has no public detail link and cannot increase published Knowledge counts. Planned modules may be displayed as `Planned`, but the page must not imply that content already exists.

The initial catalog includes the two approved Workstream 013 modules as planned:

- `problem-framing-clarification-assumption-management`;
- `structured-think-aloud-reasoning`.

Their order and prerequisite relationship place problem framing before structured think-aloud reasoning.

### 5.4 Curriculum ordering

Top-level and child Topic order comes from `taxonomy.json`. Module order comes only from `learningOrder`. Source book order, file order, title sorting, publication date, and coverage-row order must not silently define the curriculum.

## 6. Public Learning Directory

Create the static route:

```text
src/pages/knowledge/quant-interview/directory.astro
```

The route reads only:

- `taxonomy.json` through the existing public taxonomy helper;
- `knowledge-catalog.json` through a public catalog helper;
- the public `knowledge` and `problems` content collections.

It must not import coverage ledgers, source manifests, source-topic mapping, verified TOCs, workstream manifests, or internal directory-generation code.

### 6.1 Page structure

1. **Hero** — explains the concept-to-practice learning model and displays derived published/planned totals.
2. **Topic navigation** — compact links to all ten top-level Topics.
3. **Directory controls** — text search and status filter (`All`, `Published`, `Planned`).
4. **Topic sections** — ordered Subtopics and their ordered curriculum modules.
5. **Practice actions** — one topic-filtered Problem Bank link per Subtopic with a derived Problem count.
6. **Empty state** — a truthful message when a Topic has no matching module or a filter has no result.

### 6.2 Module presentation

A published module displays:

- sequence number;
- title;
- `Published` state;
- prerequisite titles when present;
- derived related Problem count;
- a link to `/knowledge/<slug>/`.

A planned module displays:

- sequence number;
- title;
- `Planned` state;
- prerequisites when present;
- no fake detail link;
- no invented description, date, maturity, or Problem count.

### 6.3 Progressive enhancement

All Topics, Subtopics, modules, and practice links are present in the server-rendered HTML. Search and status filters may hide rows in the browser, but JavaScript is not required to access the curriculum.

The page should use compact editorial rows rather than large cards. On mobile, Topic sections stack vertically and secondary metadata wraps below the module title without horizontal scrolling.

## 7. Internal Extraction Directory

Create the generated document:

```text
docs/quant-interview/KNOWLEDGE_DIRECTORY.md
```

Create a deterministic generator:

```text
scripts/generate-quant-interview-knowledge-directory.mjs
```

The generator joins:

- taxonomy;
- curriculum catalog;
- public Knowledge and Problem frontmatter;
- source-topic map;
- hidden coverage ledgers;
- bounded workstream manifests.

### 7.1 Internal document contents

For every Top-level Topic and Subtopic, display:

- ordered published Knowledge slugs;
- ordered planned Knowledge slugs;
- published Problem count;
- mapped Green, Red, and 150 source sections;
- coverage-state counts such as `pending`, `knowledge-only`, `canonical-problem`, `merged-duplicate`, `variant`, and `interview-guidance`;
- active or completed workstream ids that claim the topic;
- unresolved catalog or coverage issues, when present.

The document may name internal sources and sections, but it must not copy source prose, solutions, page images, or copyrighted material.

### 7.2 No misleading progress claims

The internal document reports exact repository records only. It may say, for example, `12 mapped rows: 8 terminal, 4 pending`; it may not convert that into a book, chapter, or topic completeness percentage unless a future approved contract defines a complete bounded inventory.

### 7.3 Deterministic generation

Running the generator twice without repository changes produces byte-identical Markdown. A verification mode compares generated output with the committed document and exits nonzero when the snapshot is stale.

Recommended commands:

```text
npm run knowledge:directory
npm run knowledge:directory:check
```

### 7.4 Agent continuation task

Create one stable agent entry document:

```text
docs/quant-interview/CONTINUE_EXTRACTION_TASK.md
```

The document is a reusable task brief for another Agent continuing extraction from the three verified books. It records the exact local source-file paths, pinned editions and hashes, mandatory read order, Topic-first selection rules, candidate/coordinator ownership, public-content standard, hidden reconciliation checklist, verification gates, stop conditions, and final report contract.

It does not hard-code a supposedly permanent next topic. It instructs the Agent to read `HANDOFF.md` and the generated internal Knowledge directory for current state before selecting exactly one bounded workstream. This keeps the task document stable while repository state advances.

## 8. Data Flow and Isolation

```text
taxonomy.json
      +
knowledge-catalog.json
      +
public Knowledge / Problems
      |
      +-----------------------> Public directory
      |
      + source map + coverage + workstreams
                                |
                                +----------> Internal directory
```

Public and internal projections must live behind separate helpers so a future import cannot accidentally pull hidden data into a public page.

Create a public helper responsible only for catalog parsing, validation, ordering, ancestry expansion, and public counts. Create a separate internal generator adapter responsible for reading source and coverage files.

The production build must continue to prove that public Knowledge routes do not import hidden Quant Interview coverage infrastructure.

## 9. Components and Routes

### 9.1 New files

```text
src/data/quant-interview/topics/knowledge-catalog.json
src/lib/quantInterviewKnowledgeDirectory.mjs
src/pages/knowledge/quant-interview/directory.astro
scripts/generate-quant-interview-knowledge-directory.mjs
docs/quant-interview/KNOWLEDGE_DIRECTORY.md
docs/quant-interview/CONTINUE_EXTRACTION_TASK.md
tests/quant-interview-knowledge-directory.test.mjs
```

### 9.2 Modified files

```text
package.json
src/components/QuantInterviewTopicCard.astro
src/pages/knowledge/quant-interview/index.astro
tests/quant-interview-topic-public-shell.test.mjs
README.md
docs/quant-interview/README.md
```

The exact implementation plan may reduce this surface when an existing helper or test can own the behavior cleanly. It may not merge public and internal data loading into one module.

### 9.3 Helper responsibilities

`quantInterviewKnowledgeDirectory.mjs`:

- validates the public catalog;
- resolves taxonomy ancestry;
- groups and orders modules;
- joins published modules with public Knowledge metadata;
- derives public Problem counts;
- returns a public-safe view model.

The internal script:

- invokes the public helper;
- adds source mapping, coverage, and workstream state;
- renders deterministic Markdown;
- supports write and check modes.

## 10. Validation and Error Handling

The directory validator rejects:

- duplicate catalog slugs;
- unknown taxonomy ids;
- `primaryTopic` values that are not the final `canonicalTopics` id;
- topic arrays where a listed Topic appears before one of its taxonomy ancestors;
- duplicate or non-positive `learningOrder` values inside one primary Topic;
- unknown prerequisite slugs;
- self-dependencies or prerequisite cycles;
- published modules without a real Knowledge file;
- published titles or topics that disagree with Knowledge frontmatter;
- explicitly topic-classified Knowledge missing from the catalog;
- planned modules that already have a published page;
- public Problem counts derived from hidden source data;
- internal coverage rows whose canonical topic is absent from taxonomy;
- stale generated internal Markdown.

Build-time failures should name the module slug, field, and violated rule. The public page never silently drops an invalid published module.

If a planned module has no published page, the public directory renders `Planned` without a link. If a Subtopic has no modules, it remains visible with a truthful `No curriculum modules published or planned yet` state so extraction gaps are observable.

## 11. Testing and Browser QA

### 11.1 Automated behavior tests

Tests exercise the real catalog helper and generator rather than grepping source text. Required behavior includes:

- every taxonomy Topic and Subtopic appears in canonical order;
- every currently classified Knowledge slug appears exactly once as published;
- both approved 013 slugs appear as planned under `reasoning-communication`;
- published metadata matches real frontmatter;
- prerequisite ordering is acyclic and deterministic;
- Problem counts expand through topic ancestry correctly;
- public view models contain no source, page, coverage, or workstream fields;
- internal rows contain exact source/coverage/workstream state from fixtures or repository data;
- generator output is byte-deterministic;
- check mode fails on a stale internal document;
- malformed catalog fixtures produce specific validation failures.

Every production behavior is introduced through a failing test first.

### 11.2 Repository gates

The completed feature must pass:

```text
npm run knowledge:directory:check
npm run test
npm run check
npm run build
```

The build must emit the directory route and preserve the regression preventing hidden coverage imports from public pages.

### 11.3 Browser QA

Test the flow:

```text
Quant Interview hub
→ Learn action
→ matching directory anchor
→ published Knowledge page
→ topic-filtered Practice Problems
```

Verify desktop and mobile viewports, English and Chinese shell state, light and dark themes, keyboard navigation, focus visibility, search, filters, planned states, empty states, and console health. This phase does not translate directory content; switching the shell language must not corrupt layout or control labels.

## 12. Interaction with Workstream 013

The directory project and Workstream 013 remain separate branches and plans.

The catalog reserves the two 013 modules as `planned`. It does not copy their candidate content, update source coverage, create the 013 manifest, or change HANDOFF state.

After the directory feature is integrated, the 013 integration plan:

1. authors or ports the two approved Knowledge pages using `relatedNotes: []` and reciprocal `related` slugs;
2. places their pedagogical relationship explanation in public body content rather than the Note-slug field;
3. changes their catalog status from `planned` to `published` in the same reviewed integration;
4. verifies their metadata and topic ownership through the directory validator;
5. performs the separately approved Green, Red, coverage, manifest, CI, and HANDOFF closure.

Closing the directory project never implies that 013, a source Topic, or any book is complete.

## 13. Rollout Sequence

1. Add failing validator and projection tests.
2. Implement the public catalog contract and bootstrap every current explicitly classified Knowledge entry plus the two planned 013 modules.
3. Add the public directory route and Learn links from the Quant Interview hub.
4. Add failing internal-generator tests.
5. Implement deterministic internal directory generation and commit the first generated snapshot.
6. Add stale-snapshot verification to repository scripts and CI-covered tests.
7. Run full repository gates and browser QA.
8. Add the reusable Agent continuation task and link it from repository-memory entry points.
9. Complete task-scoped and whole-branch reviews.
10. Integrate the directory feature before resuming Workstream 013.

No source coverage state changes as part of this rollout.

## 14. Success Criteria

The feature is complete when:

- one canonical curriculum catalog covers every current explicitly classified Knowledge entry;
- the two approved 013 modules are visible as planned, not published;
- `/knowledge/quant-interview/directory/` provides a source-neutral Topic → Subtopic → Knowledge → Practice path;
- every Quant Interview Topic card offers separate Learn and Practice actions;
- published modules link to real Knowledge pages and planned modules do not create dead links;
- the committed internal directory deterministically reflects catalog, source mapping, coverage, and workstream state;
- another Agent can begin from one stable continuation task without relying on conversational history;
- public build artifacts contain no private source or coverage metadata;
- catalog, generated-document, repository, and browser validations pass;
- no Workstream 013 shared state, completion claim, or source coverage is changed;
- the design remains static-first and requires no backend or user account.
