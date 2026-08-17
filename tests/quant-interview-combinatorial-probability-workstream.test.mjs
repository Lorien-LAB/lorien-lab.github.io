import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-combinatorial-probability-006.json';

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

const terminalStates = new Set(['canonical-problem', 'merged-duplicate', 'variant', 'knowledge-only']);
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;

test('sixth cross-book workstream is bounded to combinatorial probability', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'probability-statistics-combinatorial-probability-006');
  assert.deepEqual(workstream.canonicalTopics, ['probability-statistics', 'combinatorial-probability']);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
  assert.match(workstream.status, /^(?:active|complete)$/);
});

test('combinatorial probability workstream records item-level review boundaries', async () => {
  const workstream = await readJson(workstreamPath);
  const green = workstream.sourceScopes.find((scope) => scope.source === 'green-book');
  const red = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  const q150 = workstream.sourceScopes.find((scope) => scope.source === '150-most-frequently-asked');

  assert.deepEqual(green?.sourceSections, ['4.2']);
  assert.deepEqual(green?.evidencePageRanges, [{ startPage: 80, endPage: 88 }]);
  assert.match(green?.reviewNote ?? '', /hopping rabbit/i);
  assert.match(green?.reviewNote ?? '', /screwy pirates/i);
  assert.match(green?.reviewNote ?? '', /100th digit/i);
  assert.match(green?.reviewNote ?? '', /cubic of integer/i);
  assert.match(green?.reviewNote ?? '', /outside|out-of-scope|other canonical/i);

  assert.deepEqual(red?.sourceSections, ['3.2.1']);
  assert.match(red?.reviewNote ?? '', /3\.19/);
  assert.match(red?.reviewNote ?? '', /3\.20/);
  assert.match(red?.reviewNote ?? '', /3\.21/);
  assert.match(red?.reviewNote ?? '', /later canonical topics/i);

  assert.deepEqual(q150?.sourceSections, ['2.7']);
  assert.match(q150?.reviewNote ?? '', /Q7|question 7/i);
  assert.match(q150?.reviewNote ?? '', /Q14|question 14/i);
  assert.match(q150?.reviewNote ?? '', /item-level/i);
});

test('existing workstream validator accepts the combinatorial probability registration', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});

test('all ten claimed combinatorial probability source items are inventoried explicitly', async () => {
  const ledgers = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/coverage/${source}.json`)]),
  ));

  const expected = {
    'green-book': [
      '4.2::definitions-counting-principles',
      '4.2::poker-hands',
      '4.2::chess-tournament',
      '4.2::application-letters',
      '4.2::birthday-problem',
    ],
    'red-book': ['3.2.1::3.19', '3.2.1::3.20', '3.2.1::3.21'],
    '150-most-frequently-asked': ['2.7::7', '2.7::14'],
  };

  for (const [source, keys] of Object.entries(expected)) {
    const rows = new Map(ledgers[source].entries.map((entry) => [keyOf(entry), entry]));
    for (const key of keys) assert.ok(rows.has(key), `${source} missing coverage row ${key}`);
  }
});

test('cross-book semantic decisions merge the tournament family and preserve low-value checks as Knowledge', async () => {
  const green = await readJson('src/data/quant-interview/coverage/green-book.json');
  const red = await readJson('src/data/quant-interview/coverage/red-book.json');
  const g = new Map(green.entries.map((entry) => [keyOf(entry), entry]));
  const r = new Map(red.entries.map((entry) => [keyOf(entry), entry]));

  assert.equal(g.get('4.2::chess-tournament')?.state, 'canonical-problem');
  assert.deepEqual(g.get('4.2::chess-tournament')?.canonicalProblems, ['top-two-meet-in-knockout-final']);
  assert.equal(r.get('3.2.1::3.19')?.state, 'merged-duplicate');
  assert.deepEqual(r.get('3.2.1::3.19')?.canonicalProblems, ['top-two-meet-in-knockout-final']);

  assert.equal(r.get('3.2.1::3.20')?.state, 'knowledge-only');
  assert.deepEqual(r.get('3.2.1::3.20')?.canonicalProblems, []);
  assert.ok(r.get('3.2.1::3.20')?.canonicalKnowledge.includes('finite-combinatorial-probability-modeling'));
  assert.equal(r.get('3.2.1::3.21')?.state, 'knowledge-only');
  assert.deepEqual(r.get('3.2.1::3.21')?.canonicalProblems, []);
  assert.ok(r.get('3.2.1::3.21')?.canonicalKnowledge.includes('finite-combinatorial-probability-modeling'));
});

test('150 Brainteaser items use explicit mathematical-identity topic overrides', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));

  for (const [key, slug] of [
    ['2.7::7', 'no-consecutive-heads-in-n-tosses'],
    ['2.7::14', 'random-subsets-containment-probability'],
  ]) {
    const row = rows.get(key);
    assert.equal(row?.state, 'canonical-problem');
    assert.deepEqual(row?.canonicalTopics, ['combinatorial-probability']);
    assert.deepEqual(row?.canonicalProblems, [slug]);
    assert.match(row?.topicOverrideReason ?? '', /item-level|mathematical identity/i);
  }
});

test('all claimed combinatorial probability rows are terminal, explained, and resolve to real canonical targets', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');

  const expected = new Map([
    ['green-book', new Set(['4.2::definitions-counting-principles', '4.2::poker-hands', '4.2::chess-tournament', '4.2::application-letters', '4.2::birthday-problem'])],
    ['red-book', new Set(['3.2.1::3.19', '3.2.1::3.20', '3.2.1::3.21'])],
    ['150-most-frequently-asked', new Set(['2.7::7', '2.7::14'])],
  ]);

  for (const [source, keys] of expected) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));
    for (const key of keys) {
      const row = rows.get(key);
      assert.ok(row, `missing ${source} ${key}`);
      assert.ok(terminalStates.has(row.state), `${source} ${key} is not terminal`);
      assert.ok((row.resolutionNote ?? '').trim(), `${source} ${key} lacks resolutionNote`);
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

test('knowledge-only Red source tasks remain visible through public Interview Checks', async () => {
  const text = await readFile('src/content/knowledge/concepts/finite-combinatorial-probability-modeling.md', 'utf8');
  assert.match(text, /^## Interview Checks$/m);
  assert.match(text, /sock/i);
  assert.match(text, /ace/i);
  assert.match(text, /with replacement/i);
  assert.match(text, /without replacement/i);
});
