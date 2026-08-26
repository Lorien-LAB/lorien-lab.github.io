import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const currentProblemSlugs = [
  'put-quotes-zero-cost-static-portfolio',
  'missing-digit-power-of-two',
  'ants-crossing-line',
  'correlation-matrix-parameter-range',
  'conditional-dice-expectation',
  'random-walk-boundary',
  'twelve-before-consecutive-sevens',
  'coin-pattern-hitting-times',
  'random-recoloring-consensus-time',
  'random-walk-return-time-on-cube',
  'covariance-matrix-positive-semidefinite-proof',
  'covariance-to-correlation-matrix',
  'equicorrelation-matrix-bounds',
  'two-by-two-eigensystem',
  'apply-matrix-via-eigenbasis',
  'trace-ab-equals-trace-ba',
  'commutator-cannot-equal-identity',
  'least-squares-via-qr',
  'matrix-square-root-and-cholesky-factor',
  'generate-correlated-gaussians',
  'product-of-row-stochastic-matrices',
  'rank-and-consistency-of-linear-system',
  'more-heads-with-one-extra-coin',
  'higher-card-by-symmetry',
  'drunk-passenger-last-seat',
  'random-points-in-a-semicircle',
  'minimum-trials-for-at-least-one-hit',
  'romeo-juliet-meeting-probability',
  'poker-hand-probabilities',
  'top-two-meet-in-knockout-final',
  'five-letters-all-misaddressed',
  'birthday-collision-threshold',
  'no-consecutive-heads-in-n-tosses',
  'random-subsets-containment-probability',
  'hidden-coin-posterior-after-heads',
  'two-children-information-protocol',
  'monty-hall-switching',
  'russian-roulette-after-survival',
  'candies-last-color-ordering',
  'golden-face-posterior',
  'exponential-race-probability',
  'exponential-memoryless-bus-wait',
  'density-under-random-variable-transform',
  'sum-of-two-uniforms-triangular-density',
  'joint-normal-quadrant-conditioning',
  'when-is-a-product-lognormal',
  'expected-pattern-count-by-indicators',
  'expected-position-of-first-special-card',
  'coupon-collector-expectations',
  'recursive-dice-game-expected-payoff',
  'expected-loops-from-random-pairings',
  'geometric-waiting-time-mean-variance',
  'normal-mgf-and-moments',
  'expected-normal-cdf-of-normal-variable',
  'optimal-hedge-ratio-by-variance-minimization',
  'bernoulli-default-correlation-bounds',
  'expected-radius-of-uniform-disk-point',
  'fair-box-opening-price-by-expectation',
  'multiplicative-wealth-expected-growth',
  'uniform-sample-extremes-and-range',
  'joint-min-max-correlation-of-uniforms',
  'random-ants-last-fall-time',
  'kth-order-statistic-distribution',
  'differentiate-variable-base-and-exponent',
  'compare-e-pi-power-expressions',
  'exponential-over-polynomial-limit',
  'logarithm-power-limit-at-zero',
  'rotating-lighthouse-beam-related-rate',
  'radical-difference-limit-at-infinity',
  'exponential-midpoint-convexity',
  'periodic-continued-fraction-limit',
  'normal-cdf-inflection-point',
  'derive-exponential-cosine-derivative-from-definition',
  'nested-radical-limit',
  'infinite-power-tower-limit',
  'classify-basic-positive-series',
];

const expectedKnowledgeTopics = new Map([
  ['conditioning', ['probability-statistics', 'conditional-probability-bayes']],
  ['first-step-analysis', ['stochastic-processes-stochastic-calculus', 'random-walks-markov-chains']],
  ['finite-state-markov-chains', ['stochastic-processes-stochastic-calculus', 'random-walks-markov-chains']],
  ['markov-chain-state-compression', ['stochastic-processes-stochastic-calculus', 'random-walks-markov-chains']],
  ['recursion-problem-solving', ['logic-brainteasers-discrete-reasoning']],
  ['no-arbitrage-principle', ['derivatives-options-no-arbitrage', 'no-arbitrage-option-properties']],
  ['option-price-convexity-in-strike', ['derivatives-options-no-arbitrage', 'no-arbitrage-option-properties']],
  ['static-arbitrage-construction', ['derivatives-options-no-arbitrage', 'no-arbitrage-option-properties']],
  ['modular-arithmetic', ['logic-brainteasers-discrete-reasoning', 'modular-arithmetic']],
  ['modular-invariants', ['logic-brainteasers-discrete-reasoning', 'modular-arithmetic', 'invariants-state-transformations']],
  ['identity-swapping-invariance', ['logic-brainteasers-discrete-reasoning', 'invariants-state-transformations']],
  ['correlation-matrix', ['linear-algebra-matrix-methods', 'covariance-correlation-matrices']],
  ['positive-semidefinite-matrix', ['linear-algebra-matrix-methods', 'positive-semidefinite-matrices']],
  ['principal-minor-feasibility', ['linear-algebra-matrix-methods', 'positive-semidefinite-matrices']],
  ['eigenvalues-eigenvectors', ['linear-algebra-matrix-methods', 'determinants-eigenvalues']],
  ['matrix-spectral-invariants', ['linear-algebra-matrix-methods', 'determinants-eigenvalues']],
  ['eigenbasis-decomposition', ['linear-algebra-matrix-methods', 'determinants-eigenvalues', 'matrix-decompositions']],
  ['qr-decomposition', ['linear-algebra-matrix-methods', 'matrix-decompositions']],
  ['lu-cholesky-decomposition', ['linear-algebra-matrix-methods', 'matrix-decompositions']],
  ['singular-value-decomposition', ['linear-algebra-matrix-methods', 'matrix-decompositions']],
  ['vector-geometry-inner-products', ['linear-algebra-matrix-methods', 'vectors-linear-systems']],
  ['linear-independence-span-basis-rank', ['linear-algebra-matrix-methods', 'vectors-linear-systems']],
  ['linear-systems-consistency', ['linear-algebra-matrix-methods', 'vectors-linear-systems']],
  ['probability-spaces-events', ['probability-statistics', 'probability-foundations']],
  ['probability-axioms-derived-rules', ['probability-statistics', 'probability-foundations']],
  ['symmetry-equiprobability-geometric-probability', ['probability-statistics', 'probability-foundations']],
  ['counting-permutations-combinations', ['probability-statistics', 'combinatorial-probability']],
  ['finite-combinatorial-probability-modeling', ['probability-statistics', 'combinatorial-probability']],
  ['inclusion-exclusion-derangements', ['probability-statistics', 'combinatorial-probability']],
  ['bayes-rule-base-rates', ['probability-statistics', 'conditional-probability-bayes']],
  ['random-variables-cdf-pmf-pdf', ['probability-statistics', 'random-variables-distributions']],
  ['common-probability-distributions', ['probability-statistics', 'random-variables-distributions']],
  ['random-variable-transformations-convolution', ['probability-statistics', 'random-variables-distributions']],
  ['gaussian-lognormal-structure', ['probability-statistics', 'random-variables-distributions']],
  ['limit-theorems-lln-clt', ['probability-statistics', 'random-variables-distributions']],
  ['expectation-linearity-indicators', ['probability-statistics', 'expectation-variance-covariance']],
  ['conditional-expectation-tower-property', ['probability-statistics', 'expectation-variance-covariance']],
  ['expectation-variance-covariance-algebra', ['probability-statistics', 'expectation-variance-covariance']],
  ['moments-moment-generating-functions', ['probability-statistics', 'expectation-variance-covariance']],
  ['order-statistics-basics', ['probability-statistics', 'order-statistics-extremes']],
  ['joint-extremes-and-range', ['probability-statistics', 'order-statistics-extremes']],
  ['derivative-definition-and-core-rules', ['calculus-differential-equations', 'limits-derivatives']],
  ['logarithmic-differentiation', ['calculus-differential-equations', 'limits-derivatives']],
  ['monotonicity-convexity-critical-points-and-inflection', ['calculus-differential-equations', 'limits-derivatives']],
  ['indeterminate-limits-and-growth-rates', ['calculus-differential-equations', 'limits-derivatives']],
  ['related-rates-and-implicit-differentiation', ['calculus-differential-equations', 'limits-derivatives']],
  ['bounded-monotone-convergence-and-fixed-points', ['calculus-differential-equations', 'limits-derivatives']],
  ['positive-series-convergence', ['calculus-differential-equations', 'limits-derivatives']],
]);

async function findProblem(slug) {
  const files = await readdir('src/content/problems', { recursive: true });
  const match = files.find((file) => String(file).replaceAll('\\', '/').endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing problem ${slug}`);
  return `src/content/problems/${match}`;
}

async function findKnowledge(slug) {
  const files = await readdir('src/content/knowledge', { recursive: true });
  const match = files.find((file) => String(file).replaceAll('\\', '/').endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing knowledge ${slug}`);
  return `src/content/knowledge/${match}`;
}

function parseInlineArray(text, field) {
  const match = text.match(new RegExp(`^${field}:\\s*\\[([^\\]]*)\\]$`, 'm'));
  if (!match) return [];
  return match[1].split(',').map((item) => item.trim()).filter(Boolean);
}

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(files.filter((file) => String(file).endsWith('.md')).map((file) => path.basename(String(file), '.md')));
}

async function classifiedMarkdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  const slugs = [];
  for (const file of files.filter((entry) => String(entry).endsWith('.md'))) {
    const text = await readFile(path.join(root, String(file)), 'utf8');
    if (parseInlineArray(text, 'quantInterviewTopics').length > 0) slugs.push(path.basename(String(file), '.md'));
  }
  assert.equal(new Set(slugs).size, slugs.length, `${root} has duplicate classified Markdown slugs`);
  return slugs.sort();
}

test('source-neutral regression discovers exactly the current 76 Problem and 48 Knowledge contracts', async () => {
  const actualProblemSlugs = await classifiedMarkdownSlugs('src/content/problems');
  const actualKnowledgeSlugs = await classifiedMarkdownSlugs('src/content/knowledge');
  const expectedProblemSlugs = [...currentProblemSlugs].sort();
  const expectedKnowledgeSlugs = [...expectedKnowledgeTopics.keys()].sort();

  assert.equal(actualProblemSlugs.length, 76);
  assert.equal(actualKnowledgeSlugs.length, 48);
  assert.deepEqual(actualProblemSlugs, expectedProblemSlugs);
  assert.deepEqual(actualKnowledgeSlugs, expectedKnowledgeSlugs);
});

test('public Problem schema is source-neutral', async () => {
  const config = await readFile('src/content.config.ts', 'utf8');
  const problemsSchema = config.split('const problems = defineCollection({')[1]?.split('const reproductionScore =')[0] ?? '';
  assert.ok(problemsSchema, 'unable to isolate problems schema');
  for (const field of ['originType', 'source', 'sourceSection', 'sourceChapter', 'sourceProblem', 'sourceReference', 'sourceUrl']) {
    assert.doesNotMatch(problemsSchema, new RegExp(`\\b${field}\\s*:`), `Problem schema still exposes ${field}`);
  }
  assert.doesNotMatch(problemsSchema, /Source-derived problems require a source slug/);
});

test('all current interview problems have canonical topics and no source provenance', async () => {
  for (const slug of currentProblemSlugs) {
    const file = await findProblem(slug);
    const text = await readFile(file, 'utf8');
    assert.match(text, /^quantInterviewTopics:\s*\[[^\]]+\]$/m, `${slug} missing canonical topics`);
    assert.doesNotMatch(text, /^originType:/m, `${slug} still exposes originType`);
    assert.doesNotMatch(text, /^source(?:Section|Chapter|Problem|Reference|Url)?:/m, `${slug} still exposes source provenance`);
    assert.doesNotMatch(file, /150-most-frequently-asked|\/original\//, `${slug} still lives in a source-oriented directory`);
    const problemId = text.match(/^problemId:\s*(.+)$/m)?.[1]?.trim() ?? '';
    assert.ok(problemId, `${slug} missing problemId`);
    assert.doesNotMatch(problemId, /150|first[- ]look|green[- ]book|red[- ]book|frequently[- ]asked/i, `${slug} still exposes source identity through problemId`);
  }
});

test('current reusable interview Knowledge has exact canonical topic assignments', async () => {
  const taxonomy = JSON.parse(await readFile('src/data/quant-interview/topics/taxonomy.json', 'utf8'));
  const { flattenTopics } = await import('../src/lib/quantInterviewTopics.mjs');
  const validTopicIds = new Set(flattenTopics(taxonomy).map((topic) => topic.id));

  for (const [slug, expected] of expectedKnowledgeTopics) {
    const file = await findKnowledge(slug);
    const text = await readFile(file, 'utf8');
    const actual = parseInlineArray(text, 'quantInterviewTopics');
    assert.deepEqual(actual, expected, `${slug} has incorrect canonical topics`);
    for (const topic of actual) assert.ok(validTopicIds.has(topic), `${slug} uses unknown topic ${topic}`);
  }
});

test('current source-derived items remain auditable in hidden coverage with resolved canonical targets', async () => {
  const ledger = JSON.parse(await readFile('src/data/quant-interview/coverage/150-most-frequently-asked.json', 'utf8'));
  const items = new Map(ledger.entries.filter((entry) => entry.sourceItem).map((entry) => [`${entry.sourceSection}::${entry.sourceItem}`, entry]));
  const expected = new Map([
    ['1::1', 'put-quotes-zero-cost-static-portfolio'],
    ['1::2', 'missing-digit-power-of-two'],
    ['1::4', 'ants-crossing-line'],
    ['1::5', 'correlation-matrix-parameter-range'],
    ['2.2::9', 'product-of-row-stochastic-matrices'],
    ['1::6', 'minimum-trials-for-at-least-one-hit'],
    ['2.7::7', 'no-consecutive-heads-in-n-tosses'],
    ['2.7::14', 'random-subsets-containment-probability'],
    ['2.7::2', 'golden-face-posterior'],
    ['2.6::2', 'exponential-race-probability'],
    ['2.6::5', 'joint-normal-quadrant-conditioning'],
    ['2.6::6', 'when-is-a-product-lognormal'],
    ['2.6::7', 'expected-normal-cdf-of-normal-variable'],
  ]);
  for (const [key, slug] of expected) {
    const entry = items.get(key);
    assert.equal(entry?.state, 'canonical-problem', `source item ${key} is not terminal canonical-problem coverage`);
    assert.deepEqual(entry?.canonicalProblems, [slug], `source item ${key} is not mapped to ${slug}`);
  }

  const disk = items.get('2.6::4');
  assert.equal(disk?.state, 'merged-duplicate');
  assert.deepEqual(disk?.canonicalProblems, ['expected-radius-of-uniform-disk-point']);

  const taxonomy = JSON.parse(await readFile('src/data/quant-interview/topics/taxonomy.json', 'utf8'));
  const sourceTopicMap = JSON.parse(await readFile('src/data/quant-interview/topics/source-topic-map.json', 'utf8'));
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  assert.doesNotThrow(() => validateCoverageLedger(ledger, {
    sourceTopicMap,
    taxonomy,
    problemSlugs,
    knowledgeSlugs,
    allowUnresolvedCanonicalRefs: false,
  }));
});
