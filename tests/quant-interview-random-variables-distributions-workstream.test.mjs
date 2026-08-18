import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json';
const terminalStates = new Set(['canonical-problem', 'merged-duplicate', 'variant', 'knowledge-only']);
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;

async function context() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/${source}.json`)]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(
    files.filter((file) => String(file).endsWith('.md'))
      .map((file) => path.basename(String(file), '.md')),
  );
}

const expectedCoverageKeys = {
  'green-book': [
    '4.4::definitions-discrete-continuous-distributions',
    '4.4::poisson-process-property',
  ],
  'red-book': [
    '3.2.1::3.28',
    '3.2.1::3.30',
    '3.2.1::3.31',
    '3.2.1::3.33',
    '3.2.1::3.34',
  ],
  '150-most-frequently-asked': [
    '2.6::1',
    '2.6::2',
    '2.6::3',
    '2.6::5',
    '2.6::6',
    '2.6::8',
    '2.6::9',
  ],
};

test('eighth cross-book workstream is bounded to random variables and distributions', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'probability-statistics-random-variables-distributions-008');
  assert.deepEqual(workstream.canonicalTopics, ['probability-statistics', 'random-variables-distributions']);
  assert.match(workstream.status, /^(?:active|complete)$/);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
});

test('random variables distributions workstream records exact item-level review boundaries', async () => {
  const workstream = await readJson(workstreamPath);
  const green = workstream.sourceScopes.find((scope) => scope.source === 'green-book');
  const red = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  const q150 = workstream.sourceScopes.find((scope) => scope.source === '150-most-frequently-asked');

  assert.deepEqual(green?.sourceSections, ['4.4']);
  assert.deepEqual(green?.evidencePageRanges, [{ startPage: 102, endPage: 108 }]);
  assert.match(green?.reviewNote ?? '', /distribution definitions/i);
  assert.match(green?.reviewNote ?? '', /memoryless/i);
  assert.match(green?.reviewNote ?? '', /meeting|broken-stick|normal moments/i);

  assert.deepEqual(red?.sourceSections, ['3.2.1']);
  assert.deepEqual(red?.evidencePageRanges, [
    { startPage: 95, endPage: 96 },
    { startPage: 120, endPage: 128 },
  ]);
  for (const item of ['3.28', '3.30', '3.31', '3.33', '3.34']) assert.match(red?.reviewNote ?? '', new RegExp(item.replace('.', '\\.')));
  assert.match(red?.reviewNote ?? '', /3\.29|3\.32/);
  assert.match(red?.reviewNote ?? '', /3\.37|3\.38/);

  assert.deepEqual(q150?.sourceSections, ['2.6']);
  assert.deepEqual(q150?.evidencePageRanges, [{ startPage: 134, endPage: 145 }]);
  assert.match(q150?.reviewNote ?? '', /1, 2, 3, 5, 6, 8, and 9/);
  assert.match(q150?.reviewNote ?? '', /martingale|Brownian|Ito/i);
});

test('existing workstream validator accepts the random variables distributions registration', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});

test('exactly fourteen claimed random variables distributions source items are inventoried', async () => {
  assert.equal(Object.values(expectedCoverageKeys).flat().length, 14);
  for (const [source, keys] of Object.entries(expectedCoverageKeys)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));
    for (const key of keys) assert.ok(rows.has(key), `${source} missing coverage row ${key}`);
  }
});

test('Green distribution ownership keeps the bus problem bounded to exponential memorylessness', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/green-book.json');
  const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));

  const definitions = rows.get('4.4::definitions-discrete-continuous-distributions');
  assert.equal(definitions?.state, 'knowledge-only');
  assert.deepEqual(definitions?.canonicalProblems, []);
  assert.ok(definitions?.canonicalKnowledge.includes('random-variables-cdf-pmf-pdf'));
  assert.ok(definitions?.canonicalKnowledge.includes('common-probability-distributions'));

  const bus = rows.get('4.4::poisson-process-property');
  assert.equal(bus?.state, 'canonical-problem');
  assert.deepEqual(bus?.canonicalProblems, ['exponential-memoryless-bus-wait']);
  assert.ok(bus?.canonicalKnowledge.includes('common-probability-distributions'));
  assert.match(bus?.resolutionNote ?? '', /exponential|memoryless|residual/i);
  assert.match(bus?.resolutionNote ?? '', /not.*general.*Poisson|does not.*Poisson|stochastic-process/i);
});

test('Red distribution rows separate transformations convolution CLT and later-topic boundaries', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/red-book.json');
  const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));

  assert.equal(rows.get('3.2.1::3.28')?.state, 'knowledge-only');
  assert.ok(rows.get('3.2.1::3.28')?.canonicalKnowledge.includes('random-variables-cdf-pmf-pdf'));
  assert.equal(rows.get('3.2.1::3.30')?.state, 'knowledge-only');
  assert.ok(rows.get('3.2.1::3.30')?.canonicalKnowledge.includes('common-probability-distributions'));

  assert.equal(rows.get('3.2.1::3.31')?.state, 'canonical-problem');
  assert.deepEqual(rows.get('3.2.1::3.31')?.canonicalProblems, ['density-under-random-variable-transform']);
  assert.equal(rows.get('3.2.1::3.33')?.state, 'canonical-problem');
  assert.deepEqual(rows.get('3.2.1::3.33')?.canonicalProblems, ['sum-of-two-uniforms-triangular-density']);
  assert.equal(rows.get('3.2.1::3.34')?.state, 'knowledge-only');
  assert.deepEqual(rows.get('3.2.1::3.34')?.canonicalKnowledge, ['limit-theorems-lln-clt']);

  for (const key of ['3.2.1::3.29', '3.2.1::3.32', '3.2.1::3.37', '3.2.1::3.38']) {
    const row = rows.get(key);
    if (row) assert.ok(!row.canonicalTopics.includes('random-variables-distributions'), `${key} must remain outside this topic`);
  }
});

test('150 distribution rows preserve exponential Gaussian lognormal LLN and CLT identities', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));

  assert.equal(rows.get('2.6::1')?.state, 'knowledge-only');
  assert.ok(rows.get('2.6::1')?.canonicalKnowledge.includes('common-probability-distributions'));
  assert.equal(rows.get('2.6::2')?.state, 'canonical-problem');
  assert.deepEqual(rows.get('2.6::2')?.canonicalProblems, ['exponential-race-probability']);
  assert.equal(rows.get('2.6::3')?.state, 'knowledge-only');
  assert.ok(rows.get('2.6::3')?.canonicalKnowledge.includes('common-probability-distributions'));
  assert.equal(rows.get('2.6::5')?.state, 'canonical-problem');
  assert.deepEqual(rows.get('2.6::5')?.canonicalProblems, ['joint-normal-quadrant-conditioning']);
  assert.ok(rows.get('2.6::5')?.canonicalKnowledge.includes('gaussian-lognormal-structure'));
  assert.equal(rows.get('2.6::6')?.state, 'canonical-problem');
  assert.deepEqual(rows.get('2.6::6')?.canonicalProblems, ['when-is-a-product-lognormal']);
  assert.equal(rows.get('2.6::8')?.state, 'knowledge-only');
  assert.deepEqual(rows.get('2.6::8')?.canonicalKnowledge, ['limit-theorems-lln-clt']);
  assert.equal(rows.get('2.6::9')?.state, 'knowledge-only');
  assert.deepEqual(rows.get('2.6::9')?.canonicalKnowledge, ['limit-theorems-lln-clt']);
});

test('knowledge-only distribution rows remain publicly testable through Interview Checks', async () => {
  const representation = await readFile('src/content/knowledge/concepts/random-variables-cdf-pmf-pdf.md', 'utf8');
  const common = await readFile('src/content/knowledge/concepts/common-probability-distributions.md', 'utf8');
  const limits = await readFile('src/content/knowledge/concepts/limit-theorems-lln-clt.md', 'utf8');

  assert.match(representation, /^## Interview Checks$/m);
  assert.match(representation, /Uniform CDF|U\(a,b\)/i);

  assert.match(common, /^## Interview Checks$/m);
  assert.match(common, /Exponential/i);
  assert.match(common, /Poisson distribution/i);
  assert.match(common, /Cauchy/i);
  assert.match(common, /expectation|moment.*exist/i);

  assert.match(limits, /^## Interview Checks$/m);
  assert.match(limits, /Weak Law|LLN/i);
  assert.match(limits, /Central Limit Theorem|CLT/i);
});

test('all fourteen claimed distribution rows are terminal explained and resolve to real targets', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');

  for (const [source, keys] of Object.entries(expectedCoverageKeys)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));
    for (const key of keys) {
      const row = rows.get(key);
      assert.ok(row, `missing ${source} ${key}`);
      assert.ok(row.canonicalTopics.includes('random-variables-distributions'), `${source} ${key} missing canonical topic`);
      assert.ok(terminalStates.has(row.state), `${source} ${key} is not terminal`);
      assert.ok((row.resolutionNote ?? '').trim(), `${source} ${key} lacks resolutionNote`);
      assert.ok(row.canonicalProblems.length + row.canonicalKnowledge.length > 0, `${source} ${key} lacks canonical targets`);
    }
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      sourceTopicMap,
      taxonomy,
      problemSlugs,
      knowledgeSlugs,
      allowUnresolvedCanonicalRefs: false,
    }));
  }
});
