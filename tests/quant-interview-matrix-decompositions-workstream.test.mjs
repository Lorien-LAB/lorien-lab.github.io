import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/linear-algebra-matrix-decompositions-003.json';
const topicSet = new Set(['linear-algebra-matrix-methods', 'matrix-decompositions']);

async function context() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/${source}.json`)]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

test('third cross-book workstream is bounded to matrix decompositions', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'linear-algebra-matrix-decompositions-003');
  assert.deepEqual(new Set(workstream.canonicalTopics), topicSet);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
  assert.equal(workstream.status, 'active');
});

test('matrix decomposition workstream source scope validates against verified manifests', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});
