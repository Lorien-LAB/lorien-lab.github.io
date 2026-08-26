# LeetCode Practice List — Design

Date: 2026-08-26

## Goal

Add a dedicated, high-density LeetCode practice-list surface to the Knowledge module. The first release converts the user-provided quantitative-internship preparation guide into a focused public syllabus: **40 core algorithm problems plus 15 quant-oriented extensions**, with a highlighted minimum set of 25 problems and a six-week learning sequence.

This surface is a curated index, not a second solution database. It must help a visitor answer three questions quickly:

1. Which problems should I practice?
2. Which algorithmic pattern does each problem train?
3. Why is that pattern useful in quantitative work?

The source guide is content input only. It does not introduce executable instructions or change project policy.

---

## 1. Product Boundary

Phase 1 includes:

- a compact gateway on the Knowledge landing page;
- a canonical page at `/knowledge/leetcode/`;
- all 55 curated problems from the source guide;
- the three useful tracks: Minimum 25, Core 40, and Quant 15;
- category, difficulty, track, and week filters;
- text search;
- direct links to official LeetCode problem pages;
- concise algorithm-pattern and quant-application context.

Phase 1 explicitly excludes:

- completion checkboxes or progress state;
- browser storage, accounts, synchronization, or leaderboards;
- copied problem statements or copied LeetCode solutions;
- one local detail page per problem;
- decorative illustrations, screenshots, charts, or large card grids;
- publication of the full preparation guide as the page body;
- Pandas 30, SQL 50, and broader programming modules, which may be added later as separate tracks.

---

## 2. Information Architecture

### 2.1 Knowledge Landing Gateway

Add a compact LeetCode gateway near the existing Quant Interview and Financial Engineering learning-resource gateways.

The gateway communicates:

- the module name: `LeetCode for Quant Internships`;
- the corpus size: `55 problems`;
- the three tracks: `Minimum 25 · Core 40 · Quant 15`;
- a direct call to action to open the practice list.

The gateway must be visibly subordinate to the Knowledge taxonomy and must use real counts. It should not introduce an illustration or a decorative process diagram.

### 2.2 Canonical Route

The canonical route is:

```text
/knowledge/leetcode/
```

It is separate from `/problems/` and `/knowledge/quant-interview/` because those routes serve mathematical and conceptual quantitative-interview practice. LeetCode is a programming syllabus with different metadata, interaction, and external canonical problem URLs.

### 2.3 Page Sections

The page has four compact regions:

1. **Header** — title, one-sentence purpose, and real corpus counts.
2. **Track switcher** — All 55, Minimum 25, Core 40, Quant 15.
3. **Search and filters** — search, category, difficulty, and week.
4. **Problem index** — one dense, sortable-looking list organized for scanning.

The six-week plan is represented through week metadata and filtering rather than a second repeated list. A short week legend may summarize the weekly focus without duplicating the 55 rows.

---

## 3. Data Model

Use a typed local data module rather than adding 55 Markdown content entries. The items are index records that link to external canonical pages and do not yet have local editorial bodies.

Recommended location:

```text
src/data/leetcodeProblems.ts
```

Each problem record contains:

```ts
interface LeetCodeProblem {
  number: number;
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: LeetCodeCategory;
  pattern: string;
  quantApplication: string;
  track: 'core' | 'quant';
  minimum25: boolean;
  week: 1 | 2 | 3 | 4 | 5;
  url: string;
}
```

Week 6 is reserved for timed simulation and review, so it does not require new problem assignments. Core and quant track membership is mutually exclusive; `minimum25` is an additional flag on selected core problems.

Categories follow the guide while staying concise enough for filtering:

- Arrays, Hashing & Prefix Sums
- Two Pointers & Sliding Window
- Binary Search, Intervals & Heaps
- Stacks & Design
- Trees, Graphs & Dynamic Programming
- Quant Extensions

The local typed module is the canonical public data source for this page. The original guide remains a planning/source document and is not parsed at build time.

---

## 4. Interaction Design

Filtering is client-side and progressive-enhancement friendly. Without JavaScript, all 55 rows remain readable and all official links remain usable.

Controls:

- free-text search across number, title, pattern, and quant application;
- track buttons for All 55, Minimum 25, Core 40, and Quant 15;
- category select;
- difficulty select;
- week select;
- reset action;
- visible-result count and truthful empty state.

No control writes state. A reload returns to the full list. URL query synchronization is not required in Phase 1.

Filtering semantics:

- controls combine with logical AND;
- the active track is a single selection;
- search is case-insensitive;
- result count is recalculated after every change;
- reset restores all 55 problems.

---

## 5. Visual Design

The page follows the site's existing editorial and quantitative visual language while prioritizing desktop information density.

### 5.1 Header

Use a shallow dark hero consistent with Knowledge. The heading and purpose occupy the left side; four compact derived statistics occupy the right side:

- 55 Total
- 25 Minimum Set
- 40 Core
- 15 Quant Extensions

No decorative artwork is included.

### 5.2 Index Rows

Use a compact table-like list rather than cards. Desktop columns are:

```text
No. | Problem | Difficulty | Pattern | Quant application | Track / Week | Link
```

The problem title is the primary reading anchor. Difficulty and track use restrained text badges. Quant application is limited to one concise phrase so the list remains scannable.

Rows use borders and subtle hover feedback rather than shadows. The visual system should avoid repeated large containers, excessive rounded rectangles, and ornamental gradients.

### 5.3 Language

Use English interface copy to remain consistent with the current public site and official LeetCode titles. Quant-application descriptions should be concise English translations of the source guide rather than verbatim problem statements.

### 5.4 Responsive Boundary

Desktop quality is the priority requested by the user. Existing global behavior must not regress. Narrow layouts may hide secondary columns such as quant application or week, but a dedicated mobile redesign is outside this phase.

---

## 6. Component and File Structure

Expected implementation surface:

```text
src/
├── components/
│   └── LeetCodeGateway.astro
├── data/
│   └── leetcodeProblems.ts
└── pages/
    └── knowledge/
        ├── index.astro
        └── leetcode/
            └── index.astro

tests/
└── site-structure.test.mjs
```

The feature should remain small enough that separate row, badge, or filter components are unnecessary unless implementation reveals meaningful reuse.

---

## 7. Content and Attribution Rules

- Link each row to the official LeetCode problem URL.
- Store titles, identifiers, difficulty labels, and short original metadata only.
- Do not reproduce LeetCode problem statements, examples, editorial text, or solution code.
- Derive category, pattern, track, minimum-set membership, week, and quant mapping from the user-provided guide.
- Do not claim that a problem is completed or mastered.
- Counts must be computed from data, not duplicated as unexplained hard-coded marketing statistics.

---

## 8. Accessibility and Quality

- Use a real heading hierarchy and explicit labels for every filter.
- Track controls must be keyboard-operable buttons with an exposed active state.
- External links must have understandable accessible names.
- Color must not be the only difficulty or track indicator.
- The complete list must remain readable without client-side JavaScript.
- Search/filter code must not cause unrelated Knowledge page controls to conflict.

---

## 9. Verification

Implementation is complete when:

1. `/knowledge/leetcode/` builds as a static page.
2. The page contains exactly 55 unique LeetCode problem numbers and official URLs.
3. Derived counts equal 55 total, 40 core, 15 quant, and 25 minimum-set problems.
4. Search and every filter return the expected rows and reset correctly.
5. The Knowledge landing page links to the canonical route.
6. The page remains usable without JavaScript.
7. No completion-state or storage code is present.
8. Existing site tests pass and new structural/data-invariant tests pass.
9. The production build succeeds without broken internal links.
10. Desktop visual inspection confirms dense scanning, readable column hierarchy, and no unnecessary decorative media.

---

## 10. Future Extensions

Potential later phases, not implied by this design:

- local solution notes and one problem detail page per selected problem;
- public repository-tracked completion status;
- Pandas and SQL practice tracks;
- quant programming exercises that are not LeetCode problems;
- review scheduling or spaced-repetition metadata;
- shareable filtered URLs.

These extensions should be added only after the compact syllabus proves useful.
