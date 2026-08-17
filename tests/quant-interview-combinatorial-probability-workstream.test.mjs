import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

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
