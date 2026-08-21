import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json';
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;
const terminalStates = new Set(['canonical-problem', 'merged-duplicate', 'variant', 'knowledge-only']);

const expectedCoverageKeys = {
  'green-book': [
    '4.4.normal-moments::',
    '4.5::',
    '4.5.connecting-noodles::',
    '4.5.optimal-hedge-ratio::',
    '4.5.dice-game::',
    '4.5.card-game::',
    '4.5.coupon-collection::',
    '4.5.joint-default-probability::',
  ],
  'red-book': [
    '3.2.1::3.1', '3.2.1::3.3', '3.2.1::3.5', '3.2.1::3.6',
    '3.2.1::3.12', '3.2.1::3.13', '3.2.1::3.37', '3.2.1::3.38',
  ],
  '150-most-frequently-asked': ['2.6::4', '2.6::7'],
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

test('ninth cross-book workstream is bounded to expectation variance covariance', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'probability-statistics-expectation-variance-covariance-009');
  assert.deepEqual(workstream.canonicalTopics, ['probability-statistics', 'expectation-variance-covariance']);
  assert.match(workstream.status, /^(?:active|complete)$/);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
});

test('workstream records the exact bounded source review ranges', async () => {
  const workstream = await readJson(workstreamPath);
  const green = workstream.sourceScopes.find((scope) => scope.source === 'green-book');
  const red = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  const q150 = workstream.sourceScopes.find((scope) => scope.source === '150-most-frequently-asked');

  assert.deepEqual(green?.sourceSections, ['4.4', '4.5']);
  assert.deepEqual(green?.evidencePageRanges, [{ startPage: 108, endPage: 115 }]);
  assert.match(green?.reviewNote ?? '', /normal moments|4\.4\.normal-moments/i);
  assert.match(green?.reviewNote ?? '', /sum-of-random-variables|simplex/i);
  assert.match(green?.reviewNote ?? '', /order statistics|Random Ants/i);

  assert.deepEqual(red?.sourceSections, ['3.2.1']);
  assert.deepEqual(red?.evidencePageRanges, [{ startPage: 91, endPage: 132 }]);
  for (const item of ['3.1', '3.3', '3.5', '3.6', '3.12', '3.13', '3.37', '3.38']) {
    assert.match(red?.reviewNote ?? '', new RegExp(item.replace('.', '\\.')));
  }
  assert.match(red?.reviewNote ?? '', /optimal stopping|3\.2/);
  assert.match(red?.reviewNote ?? '', /martingale|3\.7|3\.8|3\.9/i);
  assert.match(red?.reviewNote ?? '', /order statistics|3\.29|3\.32/i);

  assert.deepEqual(q150?.sourceSections, ['2.6']);
  assert.deepEqual(q150?.evidencePageRanges, [{ startPage: 134, endPage: 145 }]);
  assert.match(q150?.reviewNote ?? '', /items? 4 and 7|4.*7/i);
  assert.match(q150?.reviewNote ?? '', /already.*008|workstream 008/i);
});

test('existing workstream validator accepts workstream 009 registration', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});

test('Green normal moments map to expectation variance covariance at source-section level', async () => {
  const map = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const row = map.entries.find((entry) => entry.source === 'green-book' && entry.sourceSection === '4.4.normal-moments');
  assert.ok(row);
  assert.deepEqual(row.canonicalTopics, ['expectation-variance-covariance']);
});

test('exactly eighteen source rows are claimed by workstream 009', async () => {
  assert.equal(Object.values(expectedCoverageKeys).flat().length, 18);
  for (const [source, keys] of Object.entries(expectedCoverageKeys)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));
    for (const key of keys) assert.ok(rows.has(key), `${source} missing ${key}`);
  }
});

test('claimed 009 rows have the approved terminal state distribution', async () => {
  const counts = new Map();
  for (const [source, keys] of Object.entries(expectedCoverageKeys)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));
    for (const key of keys) {
      const row = rows.get(key);
      assert.ok(row);
      assert.ok(terminalStates.has(row.state), `${source} ${key} is not terminal`);
      assert.ok((row.resolutionNote ?? '').trim(), `${source} ${key} lacks resolutionNote`);
      assert.ok(row.canonicalTopics.includes('expectation-variance-covariance'));
      counts.set(row.state, (counts.get(row.state) ?? 0) + 1);
    }
  }
  assert.equal(counts.get('canonical-problem'), 13);
  assert.equal(counts.get('knowledge-only'), 2);
  assert.equal(counts.get('variant'), 2);
  assert.equal(counts.get('merged-duplicate'), 1);
});

test('workstream 008 terminal 150 rows remain outside expectation ownership', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));
  for (const key of ['2.6::1', '2.6::2', '2.6::3', '2.6::5', '2.6::6', '2.6::8', '2.6::9']) {
    const row = rows.get(key);
    assert.ok(row, `missing prior 008 row ${key}`);
    assert.ok(!row.canonicalTopics.includes('expectation-variance-covariance'), `${key} was incorrectly re-owned by 009`);
  }
});

test('coverage ledgers remain structurally valid while future Problem targets are staged', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');
  for (const source of Object.keys(expectedCoverageKeys)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      sourceTopicMap,
      taxonomy,
      problemSlugs,
      knowledgeSlugs,
      allowUnresolvedCanonicalRefs: true,
    }));
  }
});
