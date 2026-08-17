import { readFile, writeFile } from 'node:fs/promises';

const coverageDir = 'src/data/quant-interview/coverage';
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;

const updates = {
  'green-book': [
    {
      sourceSection: '4.2',
      sourceItem: 'definitions-counting-principles',
      canonicalTopics: ['combinatorial-probability'],
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: [
        'counting-permutations-combinations',
        'finite-combinatorial-probability-modeling',
      ],
      resolutionNote: 'Reusable product-rule, factorial, permutation, combination, and finite equiprobable counting material is fused into canonical counting and finite-probability Knowledge; the source definitions remain publicly testable through Interview Checks.',
    },
    {
      sourceSection: '4.2',
      sourceItem: 'poker-hands',
      canonicalTopics: ['combinatorial-probability'],
      state: 'canonical-problem',
      canonicalProblems: ['poker-hand-probabilities'],
      canonicalKnowledge: [
        'counting-permutations-combinations',
        'finite-combinatorial-probability-modeling',
      ],
      resolutionNote: 'Distinct finite-card counting family represented by poker-hand-probabilities; the canonical page keeps one unordered five-card sample space while deriving four-of-a-kind, full-house, and exactly-two-pair counts.',
    },
    {
      sourceSection: '4.2',
      sourceItem: 'chess-tournament',
      canonicalTopics: ['combinatorial-probability'],
      state: 'canonical-problem',
      canonicalProblems: ['top-two-meet-in-knockout-final'],
      canonicalKnowledge: [
        'finite-combinatorial-probability-modeling',
        'counting-permutations-combinations',
      ],
      resolutionNote: 'Primary source instance of the random knockout-bracket placement family; fixing one top player and counting the other player’s opposite-half slots resolves to top-two-meet-in-knockout-final. The Red tournament task is merged into this same reasoning identity.',
    },
    {
      sourceSection: '4.2',
      sourceItem: 'application-letters',
      canonicalTopics: ['combinatorial-probability'],
      state: 'canonical-problem',
      canonicalProblems: ['five-letters-all-misaddressed'],
      canonicalKnowledge: [
        'inclusion-exclusion-derangements',
        'counting-permutations-combinations',
      ],
      resolutionNote: 'Distinct fixed-point-avoidance family represented by five-letters-all-misaddressed; the public solution derives the five-object derangement count through inclusion-exclusion instead of memorizing a source-specific answer.',
    },
    {
      sourceSection: '4.2',
      sourceItem: 'birthday-problem',
      canonicalTopics: ['combinatorial-probability'],
      state: 'canonical-problem',
      canonicalProblems: ['birthday-collision-threshold'],
      canonicalKnowledge: [
        'finite-combinatorial-probability-modeling',
        'counting-permutations-combinations',
      ],
      resolutionNote: 'Distinct collision/complement-counting family represented by birthday-collision-threshold; the canonical page derives the no-collision product and verifies that 23 is the first group size above one-half collision probability.',
    },
  ],
  'red-book': [
    {
      sourceSection: '3.2.1',
      sourceItem: '3.19',
      canonicalTopics: ['combinatorial-probability'],
      state: 'merged-duplicate',
      canonicalProblems: ['top-two-meet-in-knockout-final'],
      canonicalKnowledge: [
        'finite-combinatorial-probability-modeling',
        'counting-permutations-combinations',
      ],
      resolutionNote: 'Merged cross-book duplicate of top-two-meet-in-knockout-final. Its mathematical identity is the same relative-placement question as the existing knockout-tournament family, so it enriches hidden evidence instead of creating a second public page.',
    },
    {
      sourceSection: '3.2.1',
      sourceItem: '3.20',
      canonicalTopics: ['combinatorial-probability'],
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['finite-combinatorial-probability-modeling'],
      resolutionNote: 'The matching-socks task is a compact finite-state check rather than a separate S3+ reasoning family. It remains publicly visible as an Interview Check in finite-combinatorial-probability-modeling.',
    },
    {
      sourceSection: '3.2.1',
      sourceItem: '3.21',
      canonicalTopics: ['combinatorial-probability'],
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: [
        'finite-combinatorial-probability-modeling',
        'counting-permutations-combinations',
      ],
      resolutionNote: 'The two-aces with/without-replacement task is preserved as a public Interview Check that contrasts changing denominators with the equivalent unordered combination model; it does not warrant a duplicate standalone Problem.',
    },
  ],
  '150-most-frequently-asked': [
    {
      sourceSection: '2.7',
      sourceItem: '7',
      canonicalTopics: ['combinatorial-probability'],
      state: 'canonical-problem',
      canonicalProblems: ['no-consecutive-heads-in-n-tosses'],
      canonicalKnowledge: [
        'counting-permutations-combinations',
        'finite-combinatorial-probability-modeling',
      ],
      topicOverrideReason: 'Item-level mathematical identity is Combinatorial Probability even though the editorial source container is classified as brainteasers; item-level semantic ownership overrides the coarse container mapping.',
      resolutionNote: 'Distinct forbidden-adjacency counting family represented by no-consecutive-heads-in-n-tosses. The canonical page derives the Fibonacci recurrence and the equivalent gap-counting identity inside a uniform 2^n sample space.',
    },
    {
      sourceSection: '2.7',
      sourceItem: '14',
      canonicalTopics: ['combinatorial-probability'],
      state: 'canonical-problem',
      canonicalProblems: ['random-subsets-containment-probability'],
      canonicalKnowledge: [
        'finite-combinatorial-probability-modeling',
        'counting-permutations-combinations',
      ],
      topicOverrideReason: 'Item-level mathematical identity is Combinatorial Probability even though the editorial source container is classified as brainteasers; item-level semantic ownership overrides the coarse container mapping.',
      resolutionNote: 'Distinct random-subset containment family represented by random-subsets-containment-probability. The canonical solution uses four elementwise membership states, forbids only membership in A without B, and obtains (3/4)^n.',
    },
  ],
};

for (const [source, rows] of Object.entries(updates)) {
  const file = `${coverageDir}/${source}.json`;
  const ledger = JSON.parse(await readFile(file, 'utf8'));
  const indexByKey = new Map(ledger.entries.map((entry, index) => [keyOf(entry), index]));

  for (const row of rows) {
    const key = keyOf(row);
    const index = indexByKey.get(key);
    if (index === undefined) {
      indexByKey.set(key, ledger.entries.length);
      ledger.entries.push(row);
    } else {
      ledger.entries[index] = row;
    }
  }

  await writeFile(file, `${JSON.stringify(ledger, null, 2)}\n`, 'utf8');
}
