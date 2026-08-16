import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/linear-algebra-determinants-eigenvalues-002.json';

async function context() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/${source}.json`)]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

test('second cross-book workstream is bounded to determinants and eigenvalues', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'linear-algebra-determinants-eigenvalues-002');
  assert.deepEqual(workstream.canonicalTopics, ['linear-algebra-matrix-methods', 'determinants-eigenvalues']);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
  const red = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  assert.equal(red?.reviewOutcome, 'no-new-direct-item');
  assert.match(red?.reviewNote ?? '', /6\.9.*PSD|positive definite/i);
  assert.match(red?.reviewNote ?? '', /6\.10.*decomposition|matrix decomposition/i);
});

test('workstream validator accepts the registered verified three-source scope', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});
