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
];

const expectedKnowledgeTopics = new Map([
  ['conditioning', ['probability-statistics', 'conditional-probability-bayes']],
  ['first-step-analysis', ['stochastic-processes-stochastic-calculus', 'random-walks-markov-chains']],
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
]);

async function findProblem(slug) {
  const files = await readdir('src/content/problems', { recursive: true });
  const match = files.find((file) => String(file).endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing problem ${slug}`);
  return `src/content/problems/${match}`;
}

async function findKnowledge(slug) {
  const files = await readdir('src/content/knowledge', { recursive: true });
  const match = files.find((file) => String(file).endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
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
  ]);
  for (const [key, slug] of expected) {
    const entry = items.get(key);
    assert.equal(entry?.state, 'canonical-problem', `source item ${key} is not terminal canonical-problem coverage`);
    assert.deepEqual(entry?.canonicalProblems, [slug], `source item ${key} is not mapped to ${slug}`);
  }

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
