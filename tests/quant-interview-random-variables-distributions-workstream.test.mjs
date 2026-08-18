import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json';

async function context() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/${source}.json`)]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

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
