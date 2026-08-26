# LeetCode Practice List Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a compact, filterable 55-problem LeetCode syllabus for quantitative internships under the Knowledge module.

**Architecture:** Keep the feature separate from the mathematical Quant Interview problem bank. Store the curated syllabus in one typed TypeScript data module, render it through a static Astro page, and use a small progressively enhanced client script for filtering. Add one compact gateway to the existing Knowledge landing page and validate the corpus, page contract, and production build with the repository's Node/Astro toolchain.

**Tech Stack:** Astro 5, TypeScript 5.7, semantic HTML, scoped CSS, browser-native JavaScript, Node 24 test runner.

## Global Constraints

- Canonical public route: `/knowledge/leetcode/`.
- Exact corpus: 55 unique problems, split into 40 core and 15 quant extensions.
- Exact fast track: 25 core problems marked `minimum25: true`.
- Phase 1 is a read-only problem list: no completion state, local storage, account, synchronization, or leaderboard.
- Do not reproduce LeetCode statements, examples, editorials, or solutions; link to official problem URLs.
- Use English public UI copy and official English problem titles.
- Prioritize desktop information density; do not add decorative images, charts, or oversized card grids.
- Derive every displayed count from the data module.
- Keep the full list readable and every link usable when JavaScript is unavailable.
- Do not modify or stage `docs/量化实习_LeetCode与编程笔试面试备考指南.md`.
- Preserve existing mobile behavior; a dedicated mobile redesign is out of scope.

---

## File Structure

- Create `src/data/leetcodeProblems.ts` — typed canonical records and derived track/category/week values.
- Create `src/components/LeetCodeGateway.astro` — compact Knowledge landing-page entry point.
- Create `src/lib/leetcodeFilter.ts` — small pure predicate shared by the page interaction and focused unit tests.
- Create `src/pages/knowledge/leetcode/index.astro` — static syllabus, filters, list, inline interaction, and scoped styling.
- Modify `src/pages/knowledge/index.astro` — import and render the gateway beside the existing learning gateways.
- Create `tests/leetcode-practice-list.test.mjs` — data invariants, public-route contract, filter/control contract, and scope exclusions.

---

### Task 1: Canonical 55-Problem Data Set

**Files:**
- Create: `tests/leetcode-practice-list.test.mjs`
- Create: `src/data/leetcodeProblems.ts`

**Interfaces:**
- Produces: `LeetCodeDifficulty`, `LeetCodeTrack`, `LeetCodeCategory`, `LeetCodeProblem`, `leetcodeProblems`, `leetcodeCategories`, and `leetcodeWeeks` exports.
- Produces: each `LeetCodeProblem` has `number`, `slug`, `title`, `difficulty`, `category`, `pattern`, `quantApplication`, `track`, `minimum25`, `week`, and `url`.
- Consumes: the supplied preparation guide as content reference only.

- [ ] **Step 1: Write failing corpus-invariant tests**

Create `tests/leetcode-practice-list.test.mjs` with imports and assertions that run directly on Node 24:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { leetcodeProblems } from '../src/data/leetcodeProblems.ts';

const minimum25 = [1, 3, 15, 20, 33, 49, 53, 56, 121, 128, 139, 198, 200, 207, 209, 215, 238, 239, 283, 322, 347, 560, 704, 739, 973];
const quant15 = [76, 152, 309, 380, 384, 416, 480, 528, 643, 714, 721, 901, 912, 981, 986];

test('LeetCode syllabus contains the exact 55-problem track split', () => {
  assert.equal(leetcodeProblems.length, 55);
  assert.equal(new Set(leetcodeProblems.map(({ number }) => number)).size, 55);
  assert.equal(leetcodeProblems.filter(({ track }) => track === 'core').length, 40);
  assert.equal(leetcodeProblems.filter(({ track }) => track === 'quant').length, 15);
  assert.deepEqual(leetcodeProblems.filter(({ minimum25: value }) => value).map(({ number }) => number).sort((a, b) => a - b), minimum25);
  assert.deepEqual(leetcodeProblems.filter(({ track }) => track === 'quant').map(({ number }) => number).sort((a, b) => a - b), quant15);
});

test('every syllabus item has complete original metadata and an official URL', () => {
  for (const problem of leetcodeProblems) {
    assert.match(problem.slug, /^[a-z0-9-]+$/);
    assert.match(problem.url, new RegExp(`^https://leetcode\\.com/problems/${problem.slug}/$`));
    assert.ok(['Easy', 'Medium', 'Hard'].includes(problem.difficulty));
    assert.ok(problem.pattern.trim().length > 0);
    assert.ok(problem.quantApplication.trim().length > 0);
    assert.ok(Number.isInteger(problem.week) && problem.week >= 1 && problem.week <= 5);
  }
});
```

- [ ] **Step 2: Run the focused test and verify the missing-module failure**

Run: `node --test tests/leetcode-practice-list.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `src/data/leetcodeProblems.ts`.

- [ ] **Step 3: Implement the typed data module**

Create `src/data/leetcodeProblems.ts` with erasable TypeScript types so both Astro and Node 24 can import it:

```ts
export type LeetCodeDifficulty = 'Easy' | 'Medium' | 'Hard';
export type LeetCodeTrack = 'core' | 'quant';
export type LeetCodeCategory =
  | 'Arrays, Hashing & Prefix Sums'
  | 'Two Pointers & Sliding Window'
  | 'Binary Search, Intervals & Heaps'
  | 'Stacks & Design'
  | 'Trees, Graphs & Dynamic Programming'
  | 'Quant Extensions';

export interface LeetCodeProblem {
  number: number;
  slug: string;
  title: string;
  difficulty: LeetCodeDifficulty;
  category: LeetCodeCategory;
  pattern: string;
  quantApplication: string;
  track: LeetCodeTrack;
  minimum25: boolean;
  week: 1 | 2 | 3 | 4 | 5;
  url: string;
}

const problem = (record: Omit<LeetCodeProblem, 'url'>): LeetCodeProblem => ({
  ...record,
  url: `https://leetcode.com/problems/${record.slug}/`,
});

export const leetcodeProblems: LeetCodeProblem[] = [
  problem({ number: 1, slug: 'two-sum', title: 'Two Sum', difficulty: 'Easy', category: 'Arrays, Hashing & Prefix Sums', pattern: 'Hash lookup', quantApplication: 'Pairing and target exposure matching', track: 'core', minimum25: true, week: 1 }),
  problem({ number: 49, slug: 'group-anagrams', title: 'Group Anagrams', difficulty: 'Medium', category: 'Arrays, Hashing & Prefix Sums', pattern: 'Hash grouping', quantApplication: 'Feature signatures and categorical aggregation', track: 'core', minimum25: true, week: 1 }),
  problem({ number: 128, slug: 'longest-consecutive-sequence', title: 'Longest Consecutive Sequence', difficulty: 'Medium', category: 'Arrays, Hashing & Prefix Sums', pattern: 'Hash set', quantApplication: 'Consecutive trading-day state detection', track: 'core', minimum25: true, week: 1 }),
  problem({ number: 238, slug: 'product-of-array-except-self', title: 'Product of Array Except Self', difficulty: 'Medium', category: 'Arrays, Hashing & Prefix Sums', pattern: 'Prefix and suffix products', quantApplication: 'Leave-one-out cumulative calculations', track: 'core', minimum25: true, week: 1 }),
  problem({ number: 53, slug: 'maximum-subarray', title: 'Maximum Subarray', difficulty: 'Medium', category: 'Arrays, Hashing & Prefix Sums', pattern: 'Kadane dynamic programming', quantApplication: 'Best cumulative-return interval', track: 'core', minimum25: true, week: 1 }),
  problem({ number: 560, slug: 'subarray-sum-equals-k', title: 'Subarray Sum Equals K', difficulty: 'Medium', category: 'Arrays, Hashing & Prefix Sums', pattern: 'Prefix sum and hash map', quantApplication: 'Target cumulative-return interval counts', track: 'core', minimum25: true, week: 1 }),
  problem({ number: 347, slug: 'top-k-frequent-elements', title: 'Top K Frequent Elements', difficulty: 'Medium', category: 'Arrays, Hashing & Prefix Sums', pattern: 'Hash map and heap', quantApplication: 'Cross-sectional frequency screening', track: 'core', minimum25: true, week: 1 }),
  problem({ number: 121, slug: 'best-time-to-buy-and-sell-stock', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', category: 'Arrays, Hashing & Prefix Sums', pattern: 'Single-pass state', quantApplication: 'Historical minimum and best single-trade return', track: 'core', minimum25: true, week: 1 }),
  problem({ number: 283, slug: 'move-zeroes', title: 'Move Zeroes', difficulty: 'Easy', category: 'Two Pointers & Sliding Window', pattern: 'In-place two pointers', quantApplication: 'Stable compaction of invalid observations', track: 'core', minimum25: true, week: 2 }),
  problem({ number: 167, slug: 'two-sum-ii-input-array-is-sorted', title: 'Two Sum II', difficulty: 'Medium', category: 'Two Pointers & Sliding Window', pattern: 'Sorted two pointers', quantApplication: 'Ordered threshold pairing', track: 'core', minimum25: false, week: 2 }),
  problem({ number: 15, slug: '3sum', title: '3Sum', difficulty: 'Medium', category: 'Two Pointers & Sliding Window', pattern: 'Sort and two pointers', quantApplication: 'Constrained multi-asset combination search', track: 'core', minimum25: true, week: 2 }),
  problem({ number: 11, slug: 'container-with-most-water', title: 'Container With Most Water', difficulty: 'Medium', category: 'Two Pointers & Sliding Window', pattern: 'Two-pointer greedy', quantApplication: 'Boundary decisions and search-space reduction', track: 'core', minimum25: false, week: 2 }),
  problem({ number: 3, slug: 'longest-substring-without-repeating-characters', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Two Pointers & Sliding Window', pattern: 'Variable sliding window', quantApplication: 'Unique-state interval maintenance', track: 'core', minimum25: true, week: 2 }),
  problem({ number: 424, slug: 'longest-repeating-character-replacement', title: 'Longest Repeating Character Replacement', difficulty: 'Medium', category: 'Two Pointers & Sliding Window', pattern: 'Window validity', quantApplication: 'Tolerance windows and dominant-state share', track: 'core', minimum25: false, week: 2 }),
  problem({ number: 209, slug: 'minimum-size-subarray-sum', title: 'Minimum Size Subarray Sum', difficulty: 'Medium', category: 'Two Pointers & Sliding Window', pattern: 'Minimum feasible window', quantApplication: 'Shortest interval reaching a volume target', track: 'core', minimum25: true, week: 2 }),
  problem({ number: 239, slug: 'sliding-window-maximum', title: 'Sliding Window Maximum', difficulty: 'Hard', category: 'Two Pointers & Sliding Window', pattern: 'Monotonic deque', quantApplication: 'Rolling highs and breakout channels', track: 'core', minimum25: true, week: 2 }),
  problem({ number: 704, slug: 'binary-search', title: 'Binary Search', difficulty: 'Easy', category: 'Binary Search, Intervals & Heaps', pattern: 'Binary search', quantApplication: 'Ordered timestamp and price-level lookup', track: 'core', minimum25: true, week: 3 }),
  problem({ number: 33, slug: 'search-in-rotated-sorted-array', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', category: 'Binary Search, Intervals & Heaps', pattern: 'Partitioned binary search', quantApplication: 'Search after structural regime change', track: 'core', minimum25: true, week: 3 }),
  problem({ number: 153, slug: 'find-minimum-in-rotated-sorted-array', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', category: 'Binary Search, Intervals & Heaps', pattern: 'Binary-search boundary', quantApplication: 'Turning-point and regime-boundary detection', track: 'core', minimum25: false, week: 3 }),
  problem({ number: 875, slug: 'koko-eating-bananas', title: 'Koko Eating Bananas', difficulty: 'Medium', category: 'Binary Search, Intervals & Heaps', pattern: 'Binary search on answer', quantApplication: 'Minimum parameter satisfying capacity constraints', track: 'core', minimum25: false, week: 3 }),
  problem({ number: 56, slug: 'merge-intervals', title: 'Merge Intervals', difficulty: 'Medium', category: 'Binary Search, Intervals & Heaps', pattern: 'Sort and merge intervals', quantApplication: 'Event-window and trading-session consolidation', track: 'core', minimum25: true, week: 3 }),
  problem({ number: 57, slug: 'insert-interval', title: 'Insert Interval', difficulty: 'Medium', category: 'Binary Search, Intervals & Heaps', pattern: 'Interval insertion', quantApplication: 'Adding an event window to an existing calendar', track: 'core', minimum25: false, week: 3 }),
  problem({ number: 435, slug: 'non-overlapping-intervals', title: 'Non-overlapping Intervals', difficulty: 'Medium', category: 'Binary Search, Intervals & Heaps', pattern: 'Interval greedy', quantApplication: 'Removing overlap from event-study samples', track: 'core', minimum25: false, week: 3 }),
  problem({ number: 215, slug: 'kth-largest-element-in-an-array', title: 'Kth Largest Element in an Array', difficulty: 'Medium', category: 'Binary Search, Intervals & Heaps', pattern: 'Heap or quickselect', quantApplication: 'Cross-sectional quantiles and Top-K selection', track: 'core', minimum25: true, week: 3 }),
  problem({ number: 973, slug: 'k-closest-points-to-origin', title: 'K Closest Points to Origin', difficulty: 'Medium', category: 'Binary Search, Intervals & Heaps', pattern: 'Top-K heap', quantApplication: 'Nearest-state and similarity screening', track: 'core', minimum25: true, week: 3 }),
  problem({ number: 295, slug: 'find-median-from-data-stream', title: 'Find Median from Data Stream', difficulty: 'Hard', category: 'Binary Search, Intervals & Heaps', pattern: 'Two heaps', quantApplication: 'Online median and robust streaming statistics', track: 'core', minimum25: false, week: 3 }),
  problem({ number: 20, slug: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stacks & Design', pattern: 'Stack', quantApplication: 'Expression and configuration validation', track: 'core', minimum25: true, week: 2 }),
  problem({ number: 155, slug: 'min-stack', title: 'Min Stack', difficulty: 'Medium', category: 'Stacks & Design', pattern: 'Auxiliary state stack', quantApplication: 'Online minimum-state maintenance', track: 'core', minimum25: false, week: 2 }),
  problem({ number: 150, slug: 'evaluate-reverse-polish-notation', title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', category: 'Stacks & Design', pattern: 'Expression stack', quantApplication: 'Factor DSL and operator evaluation', track: 'core', minimum25: false, week: 2 }),
  problem({ number: 739, slug: 'daily-temperatures', title: 'Daily Temperatures', difficulty: 'Medium', category: 'Stacks & Design', pattern: 'Monotonic stack', quantApplication: 'Time to the next breakout state', track: 'core', minimum25: true, week: 2 }),
  problem({ number: 146, slug: 'lru-cache', title: 'LRU Cache', difficulty: 'Medium', category: 'Stacks & Design', pattern: 'Hash map and doubly linked list', quantApplication: 'Factor and market-data cache design', track: 'core', minimum25: false, week: 2 }),
  problem({ number: 102, slug: 'binary-tree-level-order-traversal', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', category: 'Trees, Graphs & Dynamic Programming', pattern: 'Breadth-first search', quantApplication: 'Layered traversal of hierarchical structures', track: 'core', minimum25: false, week: 4 }),
  problem({ number: 98, slug: 'validate-binary-search-tree', title: 'Validate Binary Search Tree', difficulty: 'Medium', category: 'Trees, Graphs & Dynamic Programming', pattern: 'Recursive bounds', quantApplication: 'Invariant and boundary propagation', track: 'core', minimum25: false, week: 4 }),
  problem({ number: 200, slug: 'number-of-islands', title: 'Number of Islands', difficulty: 'Medium', category: 'Trees, Graphs & Dynamic Programming', pattern: 'DFS or BFS', quantApplication: 'Connected state-block detection', track: 'core', minimum25: true, week: 4 }),
  problem({ number: 207, slug: 'course-schedule', title: 'Course Schedule', difficulty: 'Medium', category: 'Trees, Graphs & Dynamic Programming', pattern: 'Topological sort', quantApplication: 'Factor dependencies and computation DAGs', track: 'core', minimum25: true, week: 4 }),
  problem({ number: 994, slug: 'rotting-oranges', title: 'Rotting Oranges', difficulty: 'Medium', category: 'Trees, Graphs & Dynamic Programming', pattern: 'Multi-source BFS', quantApplication: 'Shock propagation and diffusion', track: 'core', minimum25: false, week: 4 }),
  problem({ number: 198, slug: 'house-robber', title: 'House Robber', difficulty: 'Medium', category: 'Trees, Graphs & Dynamic Programming', pattern: 'One-dimensional DP', quantApplication: 'Mutually exclusive state selection', track: 'core', minimum25: true, week: 4 }),
  problem({ number: 322, slug: 'coin-change', title: 'Coin Change', difficulty: 'Medium', category: 'Trees, Graphs & Dynamic Programming', pattern: 'Unbounded knapsack', quantApplication: 'Resource-combination state transitions', track: 'core', minimum25: true, week: 4 }),
  problem({ number: 300, slug: 'longest-increasing-subsequence', title: 'Longest Increasing Subsequence', difficulty: 'Medium', category: 'Trees, Graphs & Dynamic Programming', pattern: 'DP or patience sorting', quantApplication: 'Trend segments and increasing structure', track: 'core', minimum25: false, week: 4 }),
  problem({ number: 139, slug: 'word-break', title: 'Word Break', difficulty: 'Medium', category: 'Trees, Graphs & Dynamic Programming', pattern: 'Sequence DP', quantApplication: 'Sequence segmentation and state validity', track: 'core', minimum25: true, week: 4 }),
  problem({ number: 380, slug: 'insert-delete-getrandom-o1', title: 'Insert Delete GetRandom O(1)', difficulty: 'Medium', category: 'Quant Extensions', pattern: 'Array and hash map', quantApplication: 'Constant-time dynamic-set sampling', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 528, slug: 'random-pick-with-weight', title: 'Random Pick with Weight', difficulty: 'Medium', category: 'Quant Extensions', pattern: 'Prefix sum and binary search', quantApplication: 'Weighted and importance sampling', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 384, slug: 'shuffle-an-array', title: 'Shuffle an Array', difficulty: 'Medium', category: 'Quant Extensions', pattern: 'Fisher-Yates shuffle', quantApplication: 'Unbiased random permutations', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 981, slug: 'time-based-key-value-store', title: 'Time Based Key-Value Store', difficulty: 'Medium', category: 'Quant Extensions', pattern: 'Timestamped binary search', quantApplication: 'Point-in-time historical lookup', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 643, slug: 'maximum-average-subarray-i', title: 'Maximum Average Subarray I', difficulty: 'Easy', category: 'Quant Extensions', pattern: 'Fixed sliding window', quantApplication: 'Rolling mean over a fixed horizon', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 901, slug: 'online-stock-span', title: 'Online Stock Span', difficulty: 'Medium', category: 'Quant Extensions', pattern: 'Online monotonic stack', quantApplication: 'Continuous breakout spans in streaming prices', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 152, slug: 'maximum-product-subarray', title: 'Maximum Product Subarray', difficulty: 'Medium', category: 'Quant Extensions', pattern: 'Dual-state DP', quantApplication: 'Positive and negative multiplicative states', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 309, slug: 'best-time-to-buy-and-sell-stock-with-cooldown', title: 'Best Time to Buy and Sell Stock with Cooldown', difficulty: 'Medium', category: 'Quant Extensions', pattern: 'Trading state machine', quantApplication: 'Hold, cash, and cooldown transitions', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 714, slug: 'best-time-to-buy-and-sell-stock-with-transaction-fee', title: 'Best Time to Buy and Sell Stock with Transaction Fee', difficulty: 'Medium', category: 'Quant Extensions', pattern: 'Trading state machine', quantApplication: 'Transaction-cost-aware state transitions', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 912, slug: 'sort-an-array', title: 'Sort an Array', difficulty: 'Medium', category: 'Quant Extensions', pattern: 'Merge, heap, or quick sort', quantApplication: 'Sorting fundamentals and complexity control', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 986, slug: 'interval-list-intersections', title: 'Interval List Intersections', difficulty: 'Medium', category: 'Quant Extensions', pattern: 'Interval two pointers', quantApplication: 'Trading-session and event-window overlap', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 416, slug: 'partition-equal-subset-sum', title: 'Partition Equal Subset Sum', difficulty: 'Medium', category: 'Quant Extensions', pattern: 'Zero-one knapsack', quantApplication: 'Constrained combination and state compression', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 721, slug: 'accounts-merge', title: 'Accounts Merge', difficulty: 'Medium', category: 'Quant Extensions', pattern: 'Union-find', quantApplication: 'Entity resolution and relationship merging', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 76, slug: 'minimum-window-substring', title: 'Minimum Window Substring', difficulty: 'Hard', category: 'Quant Extensions', pattern: 'Constrained sliding window', quantApplication: 'Shortest interval satisfying multiple conditions', track: 'quant', minimum25: false, week: 5 }),
  problem({ number: 480, slug: 'sliding-window-median', title: 'Sliding Window Median', difficulty: 'Hard', category: 'Quant Extensions', pattern: 'Two heaps with deletion', quantApplication: 'Robust rolling median statistics', track: 'quant', minimum25: false, week: 5 }),
];

export const leetcodeCategories = [...new Set(leetcodeProblems.map(({ category }) => category))];
export const leetcodeWeeks = [1, 2, 3, 4, 5] as const;
```

The array above preserves these exact guide-defined groups:

```text
Core / week 1: 1, 49, 128, 238, 53, 560, 347, 121
Core / week 2: 283, 167, 15, 11, 3, 424, 209, 239, 20, 155, 150, 739, 146
Core / week 3: 704, 33, 153, 875, 56, 57, 435, 215, 973, 295
Core / week 4: 102, 98, 200, 207, 994, 198, 322, 300, 139
Quant / week 5: 380, 528, 384, 981, 643, 901, 152, 309, 714, 912, 986, 416, 721, 76, 480
```

Assign the first five categories to their corresponding guide sections. Assign all 15 extension problems to `Quant Extensions`. Use concise original English phrases for `pattern` and `quantApplication`; do not copy problem statements.

- [ ] **Step 4: Run corpus tests and type checking**

Run: `node --test tests/leetcode-practice-list.test.mjs`

Expected: 2 tests PASS.

Run: `npm run check`

Expected: Astro reports 0 errors.

- [ ] **Step 5: Commit the canonical syllabus**

```bash
git add src/data/leetcodeProblems.ts tests/leetcode-practice-list.test.mjs
git commit -m "feat: add quant LeetCode syllabus data"
```

---

### Task 2: Knowledge Landing Gateway

**Files:**
- Create: `src/components/LeetCodeGateway.astro`
- Modify: `src/pages/knowledge/index.astro:5-6,53-54`

**Interfaces:**
- Consumes: `href: string` and the derived counts from `leetcodeProblems`.
- Produces: a semantic gateway linking to `/knowledge/leetcode/` with no decorative media.

- [ ] **Step 1: Create the compact gateway**

Implement `LeetCodeGateway.astro` with this structure:

```astro
---
import { leetcodeProblems } from '../data/leetcodeProblems';

interface Props { href: string; }
const { href } = Astro.props;
const coreCount = leetcodeProblems.filter(({ track }) => track === 'core').length;
const quantCount = leetcodeProblems.filter(({ track }) => track === 'quant').length;
const minimumCount = leetcodeProblems.filter(({ minimum25 }) => minimum25).length;
---
<section class="leetcode-gateway" aria-labelledby="leetcode-gateway-title">
  <div>
    <div class="mono-label">Programming Practice</div>
    <h2 id="leetcode-gateway-title">LeetCode for Quant Internships</h2>
    <p>A focused algorithm syllabus connecting interview patterns with quantitative applications.</p>
  </div>
  <div class="gateway-meta" aria-label="Practice list coverage">
    <span><strong>{leetcodeProblems.length}</strong> problems</span>
    <span><strong>{minimumCount}</strong> minimum</span>
    <span><strong>{coreCount}</strong> core</span>
    <span><strong>{quantCount}</strong> quant</span>
  </div>
  <a href={href}>Open practice list →</a>
</section>
```

Use a low-height grid, one-pixel borders, restrained accent color, and no illustration, large empty panel, shadow-heavy card, or process diagram.

- [ ] **Step 2: Integrate the gateway into Knowledge**

Import `LeetCodeGateway` after `QuantInterviewGateway` and render it after the Quant Interview gateway and before the longer Financial Engineering resources gateway:

```astro
<section class="section gateway-section">
  <div class="container">
    <LeetCodeGateway href={`${base}knowledge/leetcode/`} />
  </div>
</section>
```

- [ ] **Step 3: Run type checking and commit**

Run: `npm run check`

Expected: Astro reports 0 errors.

```bash
git add src/components/LeetCodeGateway.astro src/pages/knowledge/index.astro
git commit -m "feat: add LeetCode Knowledge gateway"
```

---

### Task 3: High-Density Practice List Page

**Files:**
- Modify: `tests/leetcode-practice-list.test.mjs`
- Create: `src/lib/leetcodeFilter.ts`
- Create: `src/pages/knowledge/leetcode/index.astro`

**Interfaces:**
- Consumes: `leetcodeProblems`, `leetcodeCategories`, and `leetcodeWeeks`.
- Produces: static route `/knowledge/leetcode/`, 55 server-rendered rows, derived counts, track buttons, labelled select filters, search field, result count, reset control, and no-results state.

- [ ] **Step 1: Add failing filter-behavior tests**

Append:

```js
import { matchesLeetCodeProblem } from '../src/lib/leetcodeFilter.ts';

test('LeetCode filters combine track, text, category, difficulty, and week', () => {
  const medianStream = leetcodeProblems.find(({ number }) => number === 295);
  const medianWindow = leetcodeProblems.find(({ number }) => number === 480);
  assert.ok(medianStream && medianWindow);

  assert.equal(matchesLeetCodeProblem(medianStream, { track: 'all', query: 'median', category: '', difficulty: '', week: '' }), true);
  assert.equal(matchesLeetCodeProblem(medianWindow, { track: 'quant', query: 'median', category: '', difficulty: 'Hard', week: '5' }), true);
  assert.equal(matchesLeetCodeProblem(medianStream, { track: 'quant', query: 'median', category: '', difficulty: '', week: '' }), false);
  assert.equal(matchesLeetCodeProblem(medianWindow, { track: 'minimum', query: '', category: '', difficulty: '', week: '' }), false);
});
```

- [ ] **Step 2: Run the test and verify the missing-page failure**

Run: `node --test tests/leetcode-practice-list.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `src/lib/leetcodeFilter.ts`.

- [ ] **Step 3: Implement the pure filter predicate**

Create `src/lib/leetcodeFilter.ts`:

```ts
import type { LeetCodeProblem } from '../data/leetcodeProblems';

export interface LeetCodeFilters {
  track: 'all' | 'minimum' | 'core' | 'quant';
  query: string;
  category: string;
  difficulty: string;
  week: string;
}

export const matchesLeetCodeProblem = (problem: LeetCodeProblem, filters: LeetCodeFilters): boolean => {
  const haystack = [problem.number, problem.title, problem.pattern, problem.quantApplication].join(' ').toLowerCase();
  const trackMatches = filters.track === 'all'
    || (filters.track === 'minimum' && problem.minimum25)
    || problem.track === filters.track;
  return trackMatches
    && (!filters.query.trim() || haystack.includes(filters.query.trim().toLowerCase()))
    && (!filters.category || problem.category === filters.category)
    && (!filters.difficulty || problem.difficulty === filters.difficulty)
    && (!filters.week || String(problem.week) === filters.week);
};
```

Run: `node --test tests/leetcode-practice-list.test.mjs`

Expected: all focused data and filter tests PASS.

- [ ] **Step 4: Build the server-rendered page shell**

Create the page with `BaseLayout`, a shallow Knowledge-style hero, and derived values:

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import { leetcodeCategories, leetcodeProblems, leetcodeWeeks } from '../../../data/leetcodeProblems';

const coreCount = leetcodeProblems.filter(({ track }) => track === 'core').length;
const quantCount = leetcodeProblems.filter(({ track }) => track === 'quant').length;
const minimumCount = leetcodeProblems.filter(({ minimum25 }) => minimum25).length;
---
<BaseLayout title="LeetCode for Quant Internships · Lorien Lab" description="A focused 55-problem algorithm syllabus connecting interview patterns with quantitative applications.">
  <header class="leetcode-hero">
    <div class="container hero-grid">
      <div><div class="mono-label">Knowledge · Programming Practice</div><h1>LeetCode for<br/>Quant Internships.</h1><p>A focused algorithm syllabus connecting interview patterns with quantitative applications.</p></div>
      <div class="hero-stats"><span><strong>{leetcodeProblems.length}</strong>Total</span><span><strong>{minimumCount}</strong>Minimum Set</span><span><strong>{coreCount}</strong>Core</span><span><strong>{quantCount}</strong>Quant</span></div>
    </div>
  </header>
  <main class="section"><div class="container">
    <div class="track-switcher" aria-label="Problem tracks">
      <button type="button" data-track-filter="all" aria-pressed="true">All 55</button>
      <button type="button" data-track-filter="minimum" aria-pressed="false">Minimum 25</button>
      <button type="button" data-track-filter="core" aria-pressed="false">Core 40</button>
      <button type="button" data-track-filter="quant" aria-pressed="false">Quant 15</button>
    </div>
    <div class="filter-bar">
      <label><span>Search</span><input type="search" data-leetcode-search placeholder="Problem, pattern, application…" /></label>
      <label><span>Category</span><select data-category-filter><option value="">All categories</option>{leetcodeCategories.map((value) => <option value={value}>{value}</option>)}</select></label>
      <label><span>Difficulty</span><select data-difficulty-filter><option value="">All levels</option><option>Easy</option><option>Medium</option><option>Hard</option></select></label>
      <label><span>Week</span><select data-week-filter><option value="">All weeks</option>{leetcodeWeeks.map((value) => <option value={value}>Week {value}</option>)}</select></label>
      <button type="button" data-filter-reset>Reset</button>
    </div>
    <p class="result-summary"><strong data-result-count>{leetcodeProblems.length}</strong> problems shown</p>
    <div class="problem-list" data-problem-list>{leetcodeProblems.map((problem) => <article data-leetcode-row data-track={problem.track}>{problem.title}</article>)}</div>
    <p data-no-results hidden>No problems match the current filters.</p>
  </div></main>
</BaseLayout>
```

The abbreviated article in this shell is replaced by the complete row markup in Step 4. The hero statistics render `{leetcodeProblems.length}`, `{minimumCount}`, `{coreCount}`, and `{quantCount}`. Controls use visible labels, native inputs/selects, and `type="button"` track/reset buttons.

- [ ] **Step 5: Render the complete compact index**

Render every problem with searchable data attributes:

```astro
{leetcodeProblems.map((problem) => {
  const searchText = [problem.number, problem.title, problem.pattern, problem.quantApplication].join(' ').toLowerCase();
  return <article
    class="problem-row"
    data-leetcode-row
    data-track={problem.track}
    data-minimum={String(problem.minimum25)}
    data-category={problem.category}
    data-difficulty={problem.difficulty}
    data-week={String(problem.week)}
    data-search={searchText}
    data-problem={JSON.stringify(problem)}
  >
    <span class="problem-number">{String(problem.number).padStart(3, '0')}</span>
    <div class="problem-title"><strong>{problem.title}</strong><small>{problem.category}</small></div>
    <span class={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
    <span class="problem-pattern">{problem.pattern}</span>
    <span class="quant-application">{problem.quantApplication}</span>
    <span class="problem-track">{problem.track === 'core' ? 'Core' : 'Quant'} · W{problem.week}</span>
    <a href={problem.url} target="_blank" rel="noreferrer" aria-label={`Open ${problem.number}. ${problem.title} on LeetCode`}>Open ↗</a>
  </article>;
})}
```

Include a small six-week legend: weeks 1–5 name their focus and week 6 states `Timed practice & review`. The legend must not duplicate problem rows.

- [ ] **Step 6: Add progressive filter behavior**

Add one bundled script scoped by LeetCode-specific data attributes. Import `matchesLeetCodeProblem` and construct the same record shape from each row's data attributes so the tested predicate owns the matching semantics:

```js
import { matchesLeetCodeProblem } from '../../../lib/leetcodeFilter';

(() => {
  const search = document.querySelector('[data-leetcode-search]');
  const category = document.querySelector('[data-category-filter]');
  const difficulty = document.querySelector('[data-difficulty-filter]');
  const week = document.querySelector('[data-week-filter]');
  const trackButtons = [...document.querySelectorAll('[data-track-filter]')];
  const rows = [...document.querySelectorAll('[data-leetcode-row]')];
  const resultCount = document.querySelector('[data-result-count]');
  const noResults = document.querySelector('[data-no-results]');
  const reset = document.querySelector('[data-filter-reset]');
  let activeTrack = 'all';

  const apply = () => {
    const query = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    rows.forEach((row) => {
      const problem = JSON.parse(row.dataset.problem);
      const matches = matchesLeetCodeProblem(problem, { track: activeTrack, query, category: category?.value || '', difficulty: difficulty?.value || '', week: week?.value || '' });
      row.hidden = !matches;
      if (matches) visible += 1;
    });
    if (resultCount) resultCount.textContent = String(visible);
    if (noResults) noResults.hidden = visible !== 0;
  };

  search?.addEventListener('input', apply);
  [category, difficulty, week].forEach((control) => control?.addEventListener('change', apply));
  trackButtons.forEach((button) => button.addEventListener('click', () => {
    activeTrack = button.dataset.trackFilter || 'all';
    trackButtons.forEach((candidate) => candidate.setAttribute('aria-pressed', String(candidate === button)));
    apply();
  }));
  reset?.addEventListener('click', () => {
    if (search) search.value = '';
    [category, difficulty, week].forEach((control) => { if (control) control.value = ''; });
    activeTrack = 'all';
    trackButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.trackFilter === 'all')));
    apply();
    search?.focus();
  });
})();
```

Do not persist or synchronize state.

- [ ] **Step 7: Add dense desktop-first styling**

Use scoped CSS with:

- a shallow dark hero and four compact statistics;
- a sticky or visually anchored control bar only if it does not obscure content;
- a seven-column desktop grid matching `No. | Problem | Difficulty | Pattern | Quant application | Track / Week | Link`;
- 12–15px row vertical padding, one-pixel separators, subtle hover background, and no row shadows;
- restrained difficulty badges with text labels;
- a desktop breakpoint that preserves all columns;
- existing-site fallback behavior below 960px that hides secondary context columns before collapsing primary identity/link columns.

Do not add `<img>`, `<svg>`, `<canvas>`, background images, decorative diagrams, or oversized empty surfaces.

- [ ] **Step 8: Run focused tests, check, build, and commit**

Run: `node --test tests/leetcode-practice-list.test.mjs`

Expected: all focused tests PASS.

Run: `npm run check`

Expected: 0 errors.

Run: `npm run build`

Expected: build completes and emits `dist/knowledge/leetcode/index.html`.

```bash
git add src/lib/leetcodeFilter.ts src/pages/knowledge/leetcode/index.astro tests/leetcode-practice-list.test.mjs
git commit -m "feat: build LeetCode practice list"
```

---

### Task 4: Browser QA and Final Regression Verification

**Files:**
- Modify if defects are found: `src/components/LeetCodeGateway.astro`
- Modify if defects are found: `src/pages/knowledge/index.astro`
- Modify if defects are found: `src/pages/knowledge/leetcode/index.astro`
- Modify if defects are found: `src/data/leetcodeProblems.ts`
- Modify if defects are found: `tests/leetcode-practice-list.test.mjs`

**Interfaces:**
- Consumes: the complete gateway, data set, route, and production build.
- Produces: verified desktop rendering and a repository-wide green test/check/build result.

- [ ] **Step 1: Start the local site and inspect the Knowledge entry point**

Run: `npm run dev -- --host 127.0.0.1`

Using the configured browser harness, open `/knowledge/` at a desktop viewport. Verify the LeetCode gateway:

- appears after Quant Interview and before Financial Engineering resources;
- has no illustration or excessive vertical padding;
- shows derived 55/25/40/15 counts;
- links to `/knowledge/leetcode/`.

- [ ] **Step 2: Inspect the complete list at desktop width**

Open `/knowledge/leetcode/` and verify:

- the initial result count is 55;
- all primary columns scan cleanly without horizontal scrolling at a normal desktop width;
- rows are visually denser than content cards;
- title, pattern, and quant application have a clear hierarchy;
- there are no decorative images or unexplained empty regions;
- official links open the correct LeetCode URLs.

- [ ] **Step 3: Exercise every filter path**

Verify these observable results:

```text
All = 55
Minimum 25 = 25
Core 40 = 40
Quant 15 = 15
Difficulty Hard = 4 (295, 239, 76, 480)
Week 5 = 15
Search "median" = 2 (295, 480)
Quant + search "median" = 1 (480)
Reset = 55 with all selects empty and All active
Impossible search = truthful no-results message
```

- [ ] **Step 4: Verify progressive enhancement**

Disable JavaScript or inspect the server-rendered HTML. Confirm all 55 rows and official links are present and readable. Filters may be inert without JavaScript, but content must not disappear.

- [ ] **Step 5: Run full repository verification**

Run: `npm test`

Expected: all repository tests PASS.

Run: `npm run check`

Expected: Astro reports 0 errors.

Run: `npm run build`

Expected: production build succeeds and emits the LeetCode route.

Run: `git status --short`

Expected: only the intentionally untracked source guide remains; no generated build artifacts or accidental files are staged.

- [ ] **Step 6: Commit any QA corrections**

If QA required changes:

```bash
git add src/components/LeetCodeGateway.astro src/pages/knowledge/index.astro src/pages/knowledge/leetcode/index.astro src/data/leetcodeProblems.ts tests/leetcode-practice-list.test.mjs
git commit -m "fix: refine LeetCode practice list QA"
```

If no correction was required, do not create an empty commit.

---

## Self-Review Record

- Spec coverage: gateway, canonical route, exact counts, three tracks, search, category/difficulty/week filters, week legend, progressive enhancement, accessibility, scope exclusions, and desktop visual QA are each assigned to a task.
- Test quality: automated tests exercise imported data and filter behavior; route integration and presentation are verified by Astro check/build and browser QA instead of source-text assertions.
- Type consistency: `track` is exactly `'core' | 'quant'`; fast-track membership is `minimum25`; week is exactly `1 | 2 | 3 | 4 | 5`; all page data attributes use these same values.
