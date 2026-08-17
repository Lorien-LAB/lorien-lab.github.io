import { readFile, writeFile } from 'node:fs/promises';

const coverageDir = 'src/data/quant-interview/coverage';
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;

const updates = {
  'green-book': [
    {
      sourceSection: '4.3',
      sourceItem: 'definitions-conditional-probability-bayes',
      canonicalTopics: ['conditional-probability-bayes'],
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['conditioning', 'bayes-rule-base-rates'],
      resolutionNote: 'Reusable conditional-probability, multiplication and chain-rule, total-probability, independence-boundary, and Bayes material is fused into canonical conditioning and Bayes/base-rate Knowledge; public Interview Checks preserve the source-derived interview tests.',
    },
    {
      sourceSection: '4.3',
      sourceItem: 'boys-and-girls',
      canonicalTopics: ['conditional-probability-bayes'],
      state: 'canonical-problem',
      canonicalProblems: ['two-children-information-protocol'],
      canonicalKnowledge: ['conditioning'],
      resolutionNote: 'Primary source instance of the two-child information-protocol family; the canonical page generalizes the conditioning event and makes the observation mechanism explicit.',
    },
    {
      sourceSection: '4.3',
      sourceItem: 'unfair-coin',
      canonicalTopics: ['conditional-probability-bayes'],
      state: 'canonical-problem',
      canonicalProblems: ['hidden-coin-posterior-after-heads'],
      canonicalKnowledge: ['conditioning', 'bayes-rule-base-rates'],
      resolutionNote: 'Primary source instance of the latent double-headed-coin Bayes family; the canonical page generalizes the source instance to prior pi and n observed heads.',
    },
    {
      sourceSection: '4.3',
      sourceItem: 'monty-hall',
      canonicalTopics: ['conditional-probability-bayes'],
      state: 'canonical-problem',
      canonicalProblems: ['monty-hall-switching'],
      canonicalKnowledge: ['conditioning'],
      resolutionNote: 'Distinct informed-reveal conditioning family represented by the source-neutral Monty Hall page with the host information policy stated explicitly.',
    },
    {
      sourceSection: '4.3',
      sourceItem: 'candies-in-a-jar',
      canonicalTopics: ['conditional-probability-bayes'],
      state: 'canonical-problem',
      canonicalProblems: ['candies-last-color-ordering'],
      canonicalKnowledge: ['conditioning'],
      resolutionNote: 'Distinct last-occurrence conditioning family; the canonical page reduces the random removal sequence to mutually exclusive last-color orderings.',
    },
    {
      sourceSection: '4.3',
      sourceItem: 'russian-roulette-series',
      canonicalTopics: ['conditional-probability-bayes'],
      state: 'canonical-problem',
      canonicalProblems: ['russian-roulette-after-survival'],
      canonicalKnowledge: ['conditioning'],
      resolutionNote: 'Primary source instance of the survival-conditioning roulette family; the adjacent-bullet state is represented in one canonical public Problem.',
    },
  ],
  'red-book': [
    {
      sourceSection: '3.2.1',
      sourceItem: '3.10',
      canonicalTopics: ['conditional-probability-bayes'],
      state: 'merged-duplicate',
      canonicalProblems: ['hidden-coin-posterior-after-heads'],
      canonicalKnowledge: ['conditioning', 'bayes-rule-base-rates'],
      resolutionNote: 'Merged duplicate of the latent double-headed-coin posterior family; its one-in-ten prior and three-head numerical case are retained as a variant inside the general canonical page.',
    },
    {
      sourceSection: '3.2.1',
      sourceItem: '3.11',
      canonicalTopics: ['conditional-probability-bayes'],
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['bayes-rule-base-rates', 'conditioning'],
      resolutionNote: 'The repeated-heads question primarily tests prior and model ambiguity. Its interview value remains visible through Bayes and conditioning Interview Checks rather than creating a second coin Problem.',
    },
    {
      sourceSection: '3.2.1',
      sourceItem: '3.14',
      canonicalTopics: ['conditional-probability-bayes'],
      state: 'merged-duplicate',
      canonicalProblems: ['two-children-information-protocol'],
      canonicalKnowledge: ['conditioning'],
      resolutionNote: 'Merged duplicate of the two-child information family; the canonical page handles the observation mechanism explicitly instead of preserving source-specific wording.',
    },
    {
      sourceSection: '3.2.1',
      sourceItem: '3.15',
      canonicalTopics: ['conditional-probability-bayes'],
      state: 'variant',
      canonicalProblems: ['two-children-information-protocol'],
      canonicalKnowledge: ['conditioning'],
      resolutionNote: 'Named-child wording is observation-protocol dependent. The source shortcut is not copied blindly; the canonical Problem corrects the ambiguity by requiring a declared naming and information-generation mechanism before a numerical answer.',
    },
    {
      sourceSection: '3.2.1',
      sourceItem: '3.17',
      canonicalTopics: ['conditional-probability-bayes'],
      state: 'merged-duplicate',
      canonicalProblems: ['russian-roulette-after-survival'],
      canonicalKnowledge: ['conditioning'],
      resolutionNote: 'Merged duplicate of the adjacent-bullet survival-conditioning family; the survived-trigger information and one-quarter no-spin versus one-third spin comparison resolve to the shared canonical Problem.',
    },
  ],
  '150-most-frequently-asked': [
    {
      sourceSection: '2.7',
      sourceItem: '2',
      canonicalTopics: ['conditional-probability-bayes'],
      state: 'canonical-problem',
      canonicalProblems: ['golden-face-posterior'],
      canonicalKnowledge: ['conditioning', 'bayes-rule-base-rates'],
      topicOverrideReason: 'Item-level mathematical identity is Conditional Probability & Bayes even though the editorial source container is Brainteasers; observing a golden face reweights the latent object posterior.',
      resolutionNote: 'Distinct latent-object selection-conditioning family represented by golden-face-posterior; visible-face weighting gives posterior two-thirds.',
    },
  ],
};

for (const [source, sourceUpdates] of Object.entries(updates)) {
  const file = `${coverageDir}/${source}.json`;
  const ledger = JSON.parse(await readFile(file, 'utf8'));
  const indexByKey = new Map(ledger.entries.map((entry, index) => [keyOf(entry), index]));

  for (const update of sourceUpdates) {
    const key = keyOf(update);
    const index = indexByKey.get(key);
    if (index === undefined) {
      indexByKey.set(key, ledger.entries.length);
      ledger.entries.push(update);
    } else {
      ledger.entries[index] = update;
    }
  }

  await writeFile(file, `${JSON.stringify(ledger, null, 2)}\n`);
}
