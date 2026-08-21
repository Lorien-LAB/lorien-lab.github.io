import { readFile, writeFile } from 'node:fs/promises';

const paths = {
  map: 'src/data/quant-interview/topics/source-topic-map.json',
  green: 'src/data/quant-interview/coverage/green-book.json',
  red: 'src/data/quant-interview/coverage/red-book.json',
  q150: 'src/data/quant-interview/coverage/150-most-frequently-asked.json',
};

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const writeJson = async (file, value) => writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;

function replaceSectionRow(ledger, sourceSection, patch) {
  const index = ledger.entries.findIndex((entry) => entry.sourceSection === sourceSection && entry.sourceItem === null);
  if (index < 0) throw new Error(`Missing section-level coverage row ${ledger.source} ${sourceSection}`);
  ledger.entries[index] = { ...ledger.entries[index], ...patch };
  delete ledger.entries[index].topicOverrideReason;
}

function upsertItemRow(ledger, sourceSection, sourceItem, patch) {
  const key = `${sourceSection}::${sourceItem}`;
  const matches = ledger.entries
    .map((entry, index) => [entry, index])
    .filter(([entry]) => keyOf(entry) === key);
  if (matches.length > 1) throw new Error(`Duplicate pre-existing coverage key ${ledger.source} ${key}`);
  const row = {
    sourceSection,
    sourceItem,
    canonicalTopics: ['expectation-variance-covariance'],
    ...patch,
  };
  if (matches.length === 1) ledger.entries[matches[0][1]] = row;
  else ledger.entries.push(row);
}

const sourceMap = await readJson(paths.map);
const normalMapMatches = sourceMap.entries.filter(
  (entry) => entry.source === 'green-book' && entry.sourceSection === '4.4.normal-moments',
);
if (normalMapMatches.length !== 1) throw new Error('Expected exactly one green-book::4.4.normal-moments source-map entry');
normalMapMatches[0].canonicalTopics = ['expectation-variance-covariance'];

const green = await readJson(paths.green);
replaceSectionRow(green, '4.4.normal-moments', {
  canonicalTopics: ['expectation-variance-covariance'],
  state: 'variant',
  canonicalProblems: ['normal-mgf-and-moments'],
  canonicalKnowledge: ['moments-moment-generating-functions'],
  resolutionNote: 'Standard-normal MGF and moment calculations enrich the general Normal MGF/moments canonical Problem; workstream 008 intentionally left this expectation-heavy identity for the Expectation, Variance & Covariance workstream.',
});
replaceSectionRow(green, '4.5', {
  canonicalTopics: ['expectation-variance-covariance'],
  state: 'knowledge-only',
  canonicalProblems: [],
  canonicalKnowledge: [
    'expectation-linearity-indicators',
    'conditional-expectation-tower-property',
    'expectation-variance-covariance-algebra',
  ],
  resolutionNote: 'The section-level theory is fused into reusable expectation, conditional-expectation, and scalar variance/covariance Knowledge. Its low-complexity interview tests remain publicly visible through Interview Checks rather than thin source-specific Problems.',
});

const greenCanonical = {
  '4.5.connecting-noodles': {
    canonicalProblems: ['expected-loops-from-random-pairings'],
    canonicalKnowledge: ['conditional-expectation-tower-property'],
    resolutionNote: 'Ordinary size-reduction expectation recursion; no Markov-chain, martingale, or other stochastic-process machinery is required.',
  },
  '4.5.optimal-hedge-ratio': {
    canonicalProblems: ['optimal-hedge-ratio-by-variance-minimization'],
    canonicalKnowledge: ['expectation-variance-covariance-algebra'],
    resolutionNote: 'Scalar variance/covariance minimization defines the canonical identity; covariance-matrix PSD and spectral feasibility remain Linear Algebra ownership.',
  },
  '4.5.dice-game': {
    canonicalProblems: ['recursive-dice-game-expected-payoff'],
    canonicalKnowledge: ['conditional-expectation-tower-property'],
    resolutionNote: 'A self-consistency expectation equation creates a distinct recursive-payoff identity from the repository-authored one-step conditional-dice seed.',
  },
  '4.5.card-game': {
    canonicalProblems: ['expected-position-of-first-special-card'],
    canonicalKnowledge: ['expectation-linearity-indicators'],
    resolutionNote: 'Random-permutation symmetry plus indicators determines the first-special position and remains distinct from pattern-count and coupon-count indicator constructions.',
  },
  '4.5.coupon-collection': {
    canonicalProblems: ['coupon-collector-expectations'],
    canonicalKnowledge: ['expectation-linearity-indicators', 'common-probability-distributions'],
    resolutionNote: 'Geometric waiting increments give the full-collection time while indicators give the expected distinct-count formula; no process-level state machinery is required.',
  },
  '4.5.joint-default-probability': {
    canonicalProblems: ['bernoulli-default-correlation-bounds'],
    canonicalKnowledge: ['expectation-variance-covariance-algebra', 'probability-axioms-derived-rules'],
    resolutionNote: 'Fixed-marginal Bernoulli joint-probability bounds determine scalar covariance/correlation feasibility; matrix PSD remains a separate Linear Algebra identity.',
  },
};
for (const [sourceSection, patch] of Object.entries(greenCanonical)) {
  replaceSectionRow(green, sourceSection, {
    canonicalTopics: ['expectation-variance-covariance'],
    state: 'canonical-problem',
    ...patch,
  });
}

const red = await readJson(paths.red);
const redRows = {
  '3.1': {
    state: 'knowledge-only',
    canonicalProblems: [],
    canonicalKnowledge: ['expectation-linearity-indicators'],
    resolutionNote: 'The fair-die expected value is a low-complexity expectation check and remains publicly testable through the canonical expectation Knowledge Interview Checks rather than a thin standalone Problem.',
  },
  '3.3': {
    state: 'canonical-problem',
    canonicalProblems: ['fair-box-opening-price-by-expectation'],
    canonicalKnowledge: ['expectation-linearity-indicators'],
    resolutionNote: 'Once the symmetric box game is worth starting, continuation only improves after misses; the canonical mathematical load is expected winning position and fair value.',
  },
  '3.5': {
    state: 'canonical-problem',
    canonicalProblems: ['multiplicative-wealth-expected-growth'],
    canonicalKnowledge: ['expectation-linearity-indicators'],
    resolutionNote: 'Independent multiplicative factors give a product-expectation identity; expected wealth growth is kept distinct from log/geometric growth and Kelly optimization.',
  },
  '3.6': {
    state: 'canonical-problem',
    canonicalProblems: ['geometric-waiting-time-mean-variance'],
    canonicalKnowledge: ['expectation-variance-covariance-algebra', 'common-probability-distributions', 'conditional-expectation-tower-property'],
    resolutionNote: 'The item asks for first-principles derivation of geometric mean and variance, not merely recognition of the Geometric distribution.',
  },
  '3.12': {
    state: 'canonical-problem',
    canonicalProblems: ['expected-pattern-count-by-indicators'],
    canonicalKnowledge: ['expectation-linearity-indicators'],
    resolutionNote: 'Overlapping pattern indicators can be dependent, but linearity of expectation still gives the expected count; this dependence boundary is the canonical insight.',
  },
  '3.13': {
    state: 'canonical-problem',
    canonicalProblems: ['expected-radius-of-uniform-disk-point'],
    canonicalKnowledge: ['expectation-linearity-indicators', 'symmetry-equiprobability-geometric-probability'],
    resolutionNote: 'The canonical page generalizes the disk to radius R and derives the expected radius; the betting wrapper is retained only as an extension.',
  },
  '3.37': {
    state: 'canonical-problem',
    canonicalProblems: ['normal-mgf-and-moments'],
    canonicalKnowledge: ['moments-moment-generating-functions', 'expectation-variance-covariance-algebra', 'gaussian-lognormal-structure'],
    resolutionNote: 'The general Normal MGF and second-moment calculation owns the canonical identity and absorbs the standard-normal moment variant from another source.',
  },
  '3.38': {
    state: 'variant',
    canonicalProblems: ['expected-normal-cdf-of-normal-variable'],
    canonicalKnowledge: ['conditional-expectation-tower-property', 'gaussian-lognormal-structure'],
    resolutionNote: 'The standard-normal E[Phi(X)]=1/2 case is a special case and alternative symmetry/PIT perspective inside the general Normal canonical Problem.',
  },
};
for (const [sourceItem, patch] of Object.entries(redRows)) upsertItemRow(red, '3.2.1', sourceItem, patch);

const q150 = await readJson(paths.q150);
upsertItemRow(q150, '2.6', '4', {
  state: 'merged-duplicate',
  canonicalProblems: ['expected-radius-of-uniform-disk-point'],
  canonicalKnowledge: ['expectation-linearity-indicators', 'symmetry-equiprobability-geometric-probability'],
  resolutionNote: 'The unit-disk expected-radius item is the R=1 instance of the general radius-R canonical Problem and contributes no separate reasoning identity.',
});
upsertItemRow(q150, '2.6', '7', {
  state: 'canonical-problem',
  canonicalProblems: ['expected-normal-cdf-of-normal-variable'],
  canonicalKnowledge: ['conditional-expectation-tower-property', 'gaussian-lognormal-structure'],
  resolutionNote: 'The general Normal E[Phi(X)] identity owns the canonical Problem; the standard-normal special case from another source is retained as a variant and alternative method.',
});

await Promise.all([
  writeJson(paths.map, sourceMap),
  writeJson(paths.green, green),
  writeJson(paths.red, red),
  writeJson(paths.q150, q150),
]);

console.log('Applied expectation/variance/covariance source map and 18-row coverage inventory.');
