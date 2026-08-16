import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/linear-algebra-determinants-eigenvalues-002.json';
const topicSet = new Set(['linear-algebra-matrix-methods', 'determinants-eigenvalues']);

const inventory = {
  'green-book': [
    ['3.6.3', 'determinant-properties'],
    ['3.6.3', 'eigenvalue-eigenvector-definitions'],
    ['3.6.3', 'trace-determinant-spectrum'],
    ['3.6.3', 'diagonalization'],
    ['3.6.3', 'two-by-two-eigensystem'],
  ],
  '150-most-frequently-asked': [
    ['2.2', '4'],
    ['2.2', '6'],
    ['2.2', '7'],
    ['2.2', '8'],
  ],
};

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
  assert.deepEqual(workstream.canonicalTopics, [...topicSet]);
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

test('every inspected determinant/eigenvalue item is explicitly inventoried before semantic resolution', async () => {
  for (const [source, keys] of Object.entries(inventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = byKey.get(`${section}::${item}`);
      assert.ok(entry, `missing inventory row ${source} ${section} ${item}`);
      assert.equal(entry.state, 'needs-review', `${source} ${section} ${item} must remain needs-review during inventory`);
      assert.deepEqual(entry.canonicalProblems, []);
      assert.deepEqual(entry.canonicalKnowledge, []);
      assert.ok(entry.canonicalTopics.every((topic) => topicSet.has(topic)), `${source} ${section} ${item} escaped workstream scope`);
      assert.ok(entry.canonicalTopics.includes('determinants-eigenvalues'), `${source} ${section} ${item} missing determinants/eigenvalues topic`);
    }
  }
});
