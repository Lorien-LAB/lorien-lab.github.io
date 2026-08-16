import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/linear-algebra-covariance-correlation-psd-001.json';

test('first cross-book workstream is bounded to covariance/correlation/PSD', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'linear-algebra-covariance-correlation-psd-001');
  assert.deepEqual(workstream.canonicalTopics, [
    'linear-algebra-matrix-methods',
    'covariance-correlation-matrices',
    'positive-semidefinite-matrices',
  ]);
  assert.deepEqual(new Set(workstream.sourceScopes.map((x) => x.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
});

test('workstream validator accepts the registered verified three-source pilot', async () => {
  const workstream = await readJson(workstreamPath);
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/${source}.json`)]),
  ));
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, { taxonomy, sourceTopicMap, manifests }));
});
