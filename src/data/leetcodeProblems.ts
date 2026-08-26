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
