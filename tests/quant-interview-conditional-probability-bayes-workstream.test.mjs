import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json';
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
    '4.3::definitions-conditional-probability-bayes',
    '4.3::boys-and-girls',
    '4.3::unfair-coin',
    '4.3::monty-hall',
    '4.3::candies-in-a-jar',
    '4.3::russian-roulette-series',
  ],
  'red-book': [
    '3.2.1::3.10',
    '3.2.1::3.11',
    '3.2.1::3.14',
    '3.2.1::3.15',
    '3.2.1::3.17',
  ],
  '150-most-frequently-asked': ['2.7::2'],
};

test('seventh cross-book workstream is bounded to conditional probability and Bayes', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'probability-statistics-conditional-probability-bayes-007');
  assert.deepEqual(workstream.canonicalTopics, ['probability-statistics', 'conditional-probability-bayes']);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
  assert.equal(workstream.status, 'active');
});

test('conditional probability Bayes workstream records item-level review boundaries', async () => {
  const workstream = await readJson(workstreamPath);
  const green = workstream.sourceScopes.find((scope) => scope.source === 'green-book');
  const red = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  const q150 = workstream.sourceScopes.find((scope) => scope.source === '150-most-frequently-asked');

  assert.deepEqual(green?.sourceSections, ['4.3']);
  assert.deepEqual(green?.evidencePageRanges, [{ startPage: 88, endPage: 102 }]);
  assert.match(green?.reviewNote ?? '', /boys-and-girls/i);
  assert.match(green?.reviewNote ?? '', /unfair-coin/i);
  assert.match(green?.reviewNote ?? '', /monty-hall/i);
  assert.match(green?.reviewNote ?? '', /amoeba|gambler|random walk/i);
  assert.match(green?.reviewNote ?? '', /outside|out-of-scope|later canonical/i);

  assert.deepEqual(red?.sourceSections, ['3.2.1']);
  assert.deepEqual(red?.evidencePageRanges, [
    { startPage: 93, endPage: 94 },
    { startPage: 107, endPage: 113 },
  ]);
  assert.match(red?.reviewNote ?? '', /3\.10/);
  assert.match(red?.reviewNote ?? '', /3\.11/);
  assert.match(red?.reviewNote ?? '', /3\.14/);
  assert.match(red?.reviewNote ?? '', /3\.15/);
  assert.match(red?.reviewNote ?? '', /3\.17/);
  assert.match(red?.reviewNote ?? '', /observation|protocol|named/i);

  assert.deepEqual(q150?.sourceSections, ['2.6', '2.7']);
  assert.deepEqual(q150?.evidencePageRanges, [
    { startPage: 40, endPage: 44 },
    { startPage: 134, endPage: 150 },
    { startPage: 176, endPage: 177 },
  ]);
  assert.match(q150?.reviewNote ?? '', /Q2|question 2/i);
  assert.match(q150?.reviewNote ?? '', /joint-normal|joint normal/i);
  assert.match(q150?.reviewNote ?? '', /item-level/i);
});

test('existing workstream validator accepts the conditional probability Bayes registration', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});

test('all twelve claimed conditional probability Bayes source items are inventoried explicitly', async () => {
  for (const [source, keys] of Object.entries(expectedCoverageKeys)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));
    for (const key of keys) assert.ok(rows.has(key), `${source} missing coverage row ${key}`);
  }
});

test('cross-book semantic decisions merge hidden-coin, two-child, and roulette families', async () => {
  const green = await readJson('src/data/quant-interview/coverage/green-book.json');
  const red = await readJson('src/data/quant-interview/coverage/red-book.json');
  const g = new Map(green.entries.map((entry) => [keyOf(entry), entry]));
  const r = new Map(red.entries.map((entry) => [keyOf(entry), entry]));

  assert.equal(g.get('4.3::unfair-coin')?.state, 'canonical-problem');
  assert.deepEqual(g.get('4.3::unfair-coin')?.canonicalProblems, ['hidden-coin-posterior-after-heads']);
  assert.equal(r.get('3.2.1::3.10')?.state, 'merged-duplicate');
  assert.deepEqual(r.get('3.2.1::3.10')?.canonicalProblems, ['hidden-coin-posterior-after-heads']);

  assert.equal(g.get('4.3::boys-and-girls')?.state, 'canonical-problem');
  assert.deepEqual(g.get('4.3::boys-and-girls')?.canonicalProblems, ['two-children-information-protocol']);
  assert.equal(r.get('3.2.1::3.14')?.state, 'merged-duplicate');
  assert.deepEqual(r.get('3.2.1::3.14')?.canonicalProblems, ['two-children-information-protocol']);
  assert.equal(r.get('3.2.1::3.15')?.state, 'variant');
  assert.deepEqual(r.get('3.2.1::3.15')?.canonicalProblems, ['two-children-information-protocol']);
  assert.match(r.get('3.2.1::3.15')?.resolutionNote ?? '', /protocol|observation|named/i);
  assert.match(r.get('3.2.1::3.15')?.resolutionNote ?? '', /not copied|not copy|correct|ambigu/i);

  assert.equal(g.get('4.3::russian-roulette-series')?.state, 'canonical-problem');
  assert.deepEqual(g.get('4.3::russian-roulette-series')?.canonicalProblems, ['russian-roulette-after-survival']);
  assert.equal(r.get('3.2.1::3.17')?.state, 'merged-duplicate');
  assert.deepEqual(r.get('3.2.1::3.17')?.canonicalProblems, ['russian-roulette-after-survival']);
});

test('Red repeated-heads ambiguity remains Knowledge-only and publicly testable', async () => {
  const red = await readJson('src/data/quant-interview/coverage/red-book.json');
  const rows = new Map(red.entries.map((entry) => [keyOf(entry), entry]));
  const row = rows.get('3.2.1::3.11');
  assert.equal(row?.state, 'knowledge-only');
  assert.deepEqual(row?.canonicalProblems, []);
  assert.ok(row?.canonicalKnowledge.includes('bayes-rule-base-rates'));
  assert.ok(row?.canonicalKnowledge.includes('conditioning'));

  const conditioning = await readFile('src/content/knowledge/concepts/conditioning.md', 'utf8');
  const bayes = await readFile('src/content/knowledge/concepts/bayes-rule-base-rates.md', 'utf8');
  assert.match(conditioning, /^## Interview Checks$/m);
  assert.match(conditioning, /at least one child|observation protocol/i);
  assert.match(bayes, /^## Interview Checks$/m);
  assert.match(bayes, /double-headed/i);
  assert.match(bayes, /prior/i);
});

test('150 golden-face item uses an explicit conditional-probability topic override', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));
  const row = rows.get('2.7::2');

  assert.equal(row?.state, 'canonical-problem');
  assert.deepEqual(row?.canonicalTopics, ['conditional-probability-bayes']);
  assert.deepEqual(row?.canonicalProblems, ['golden-face-posterior']);
  assert.ok(row?.canonicalKnowledge.includes('conditioning'));
  assert.ok(row?.canonicalKnowledge.includes('bayes-rule-base-rates'));
  assert.match(row?.topicOverrideReason ?? '', /item-level|mathematical identity/i);
  assert.match(row?.resolutionNote ?? '', /latent|selection|golden|posterior/i);

  const jointNormal = rows.get('2.6::5');
  if (jointNormal) {
    assert.ok(!jointNormal.canonicalTopics.includes('conditional-probability-bayes'), 'joint-normal Q5 must remain outside this workstream');
  }
});

test('all claimed conditional probability Bayes rows are terminal, explained, and resolve to real canonical targets', async () => {
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
