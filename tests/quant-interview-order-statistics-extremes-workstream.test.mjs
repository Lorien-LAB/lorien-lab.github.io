import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-order-statistics-extremes-010.json';
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;
const terminalStates = new Set(['canonical-problem', 'merged-duplicate', 'variant', 'knowledge-only']);

const expectedCoverageKeys = {
  'green-book': [
    '4.6.expected-max-min::',
    '4.6.correlation-max-min::',
    '4.6.random-ants::',
  ],
  'red-book': ['3.2.1::3.29', '3.2.1::3.32'],
};

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
  return new Set(files.filter((file) => String(file).endsWith('.md')).map((file) => path.basename(String(file), '.md')));
}

test('tenth cross-book workstream is bounded to order statistics extremes', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'probability-statistics-order-statistics-extremes-010');
  assert.deepEqual(workstream.canonicalTopics, ['probability-statistics', 'order-statistics-extremes']);
  assert.match(workstream.status, /^(?:active|complete)$/);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set(['green-book', 'red-book', '150-most-frequently-asked']));
});

test('workstream records three-source bounded review without inventing 150 ownership', async () => {
  const workstream = await readJson(workstreamPath);
  const green = workstream.sourceScopes.find((scope) => scope.source === 'green-book');
  const red = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  const q150 = workstream.sourceScopes.find((scope) => scope.source === '150-most-frequently-asked');
  assert.deepEqual(green?.sourceSections, ['4.6']);
  assert.deepEqual(green?.evidencePageRanges, [{ startPage: 114, endPage: 119 }]);
  assert.match(green?.reviewNote ?? '', /expected-max-min/i);
  assert.match(green?.reviewNote ?? '', /correlation-max-min/i);
  assert.match(green?.reviewNote ?? '', /random-ants/i);
  assert.deepEqual(red?.sourceSections, ['3.2.1']);
  assert.deepEqual(red?.evidencePageRanges, [{ startPage: 120, endPage: 125 }]);
  assert.match(red?.reviewNote ?? '', /3\.29/);
  assert.match(red?.reviewNote ?? '', /3\.32/);
  assert.deepEqual(q150?.sourceSections, ['2.6']);
  assert.deepEqual(q150?.evidencePageRanges, [{ startPage: 134, endPage: 145 }]);
  assert.equal(q150?.reviewOutcome, 'reviewed-no-new-ownership');
  assert.match(q150?.reviewNote ?? '', /no new|no independent|no.*ownership/i);
});

test('existing workstream validator accepts workstream 010 registration', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});

test('exactly five rows are newly owned by workstream 010', async () => {
  const green = await readJson('src/data/quant-interview/coverage/green-book.json');
  const red = await readJson('src/data/quant-interview/coverage/red-book.json');
  const ledgers = { 'green-book': green, 'red-book': red };
  const expected = [];
  for (const [source, keys] of Object.entries(expectedCoverageKeys)) {
    const rows = new Map(ledgers[source].entries.map((entry) => [keyOf(entry), entry]));
    for (const key of keys) {
      assert.ok(rows.has(key), `${source} missing ${key}`);
      expected.push(rows.get(key));
    }
    const ownedKeys = ledgers[source].entries
      .filter((entry) => entry.canonicalTopics?.includes('order-statistics-extremes') && terminalStates.has(entry.state))
      .map(keyOf)
      .sort();
    assert.deepEqual(ownedKeys, [...keys].sort(), `${source} has unexpected terminal order-statistics ownership`);
  }
  assert.equal(expected.length, 5);
  assert.equal(expected.filter((row) => row.state === 'canonical-problem').length, 4);
  assert.equal(expected.filter((row) => row.state === 'merged-duplicate').length, 1);
  for (const row of expected) {
    assert.deepEqual(row.canonicalTopics, ['order-statistics-extremes']);
    assert.ok((row.resolutionNote ?? '').trim());
  }
});

test('five coverage rows resolve to the approved semantic owners', async () => {
  const green = await readJson('src/data/quant-interview/coverage/green-book.json');
  const red = await readJson('src/data/quant-interview/coverage/red-book.json');
  const greenRows = new Map(green.entries.map((entry) => [keyOf(entry), entry]));
  const redRows = new Map(red.entries.map((entry) => [keyOf(entry), entry]));

  assert.deepEqual(greenRows.get('4.6.expected-max-min::')?.canonicalProblems, ['uniform-sample-extremes-and-range']);
  assert.deepEqual(greenRows.get('4.6.expected-max-min::')?.canonicalKnowledge, ['order-statistics-basics', 'joint-extremes-and-range']);
  assert.deepEqual(greenRows.get('4.6.correlation-max-min::')?.canonicalProblems, ['joint-min-max-correlation-of-uniforms']);
  assert.deepEqual(greenRows.get('4.6.correlation-max-min::')?.canonicalKnowledge, ['joint-extremes-and-range', 'expectation-variance-covariance-algebra']);
  assert.deepEqual(greenRows.get('4.6.random-ants::')?.canonicalProblems, ['random-ants-last-fall-time']);
  assert.deepEqual(greenRows.get('4.6.random-ants::')?.canonicalKnowledge, ['order-statistics-basics']);
  assert.deepEqual(redRows.get('3.2.1::3.29')?.canonicalProblems, ['uniform-sample-extremes-and-range']);
  assert.deepEqual(redRows.get('3.2.1::3.29')?.canonicalKnowledge, ['order-statistics-basics', 'joint-extremes-and-range']);
  assert.deepEqual(redRows.get('3.2.1::3.32')?.canonicalProblems, ['kth-order-statistic-distribution']);
  assert.deepEqual(redRows.get('3.2.1::3.32')?.canonicalKnowledge, ['order-statistics-basics']);
});

test('all claimed rows resolve to real public targets and 150 gains no order-statistics row', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');
  for (const source of Object.keys(expectedCoverageKeys)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    assert.doesNotThrow(() => validateCoverageLedger(ledger, { sourceTopicMap, taxonomy, problemSlugs, knowledgeSlugs, allowUnresolvedCanonicalRefs: false }));
  }
  const q150 = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  assert.equal(q150.entries.filter((entry) => entry.canonicalTopics?.includes('order-statistics-extremes')).length, 0);
});
