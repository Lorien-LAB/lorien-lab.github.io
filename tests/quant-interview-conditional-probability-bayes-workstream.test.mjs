import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json';

async function context() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/${source}.json`)]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

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
