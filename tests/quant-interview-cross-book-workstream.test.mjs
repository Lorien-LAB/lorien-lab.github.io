import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/linear-algebra-covariance-correlation-psd-001.json';
const workstreamTopics = new Set([
  'linear-algebra-matrix-methods',
  'covariance-correlation-matrices',
  'positive-semidefinite-matrices',
]);

const inventory = {
  'green-book': [
    ['3.6.4', 'psd-pd-criteria'],
    ['3.6.4', 'correlation-range-0.8-0.8'],
    ['4.5', 'covariance-correlation-definitions'],
  ],
  'red-book': [
    ['3.2.1', '3.26'],
    ['3.2.1', '3.35'],
    ['6.2.1', '6.9'],
  ],
  '150-most-frequently-asked': [
    ['1', '5'],
    ['2.2', '1'],
    ['2.2', '2'],
    ['2.2', '3'],
    ['2.2', '10'],
  ],
};

async function workstreamContext() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/${source}.json`)]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

test('first cross-book workstream is bounded to covariance/correlation/PSD', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'linear-algebra-covariance-correlation-psd-001');
  assert.deepEqual(workstream.canonicalTopics, [...workstreamTopics]);
  assert.deepEqual(new Set(workstream.sourceScopes.map((x) => x.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
});

test('workstream validator accepts verified mixed source sections before item-level topic inventory', async () => {
  const workstream = await readJson(workstreamPath);
  const context = await workstreamContext();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, context));
});

test('workstream validator still rejects unknown source sections and invalid evidence ranges', async () => {
  const workstream = await readJson(workstreamPath);
  const context = await workstreamContext();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');

  const unknownSection = structuredClone(workstream);
  unknownSection.sourceScopes[0].sourceSections = ['3.6.4', 'does-not-exist'];
  assert.throws(() => validateTopicWorkstream(unknownSection, context), /absent from source-topic map/i);

  const overlappingEvidence = structuredClone(workstream);
  overlappingEvidence.sourceScopes[0].evidencePageRanges = [
    { startPage: 56, endPage: 58 },
    { startPage: 58, endPage: 60 },
  ];
  assert.throws(() => validateTopicWorkstream(overlappingEvidence, context), /sorted and non-overlapping/i);
});

test('every inspected covariance/correlation/PSD source item has an item-level coverage row', async () => {
  for (const [source, keys] of Object.entries(inventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const entries = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = entries.get(`${section}::${item}`);
      assert.ok(entry, `missing inventory row ${source} ${section} ${item}`);
      assert.ok(entry.canonicalTopics.some((topic) => workstreamTopics.has(topic)), `${source} ${section} ${item} has no workstream topic`);
      if (!(source === '150-most-frequently-asked' && section === '1' && item === '5')) {
        assert.equal(entry.state, 'needs-review', `${source} ${section} ${item} should remain needs-review during inventory`);
        assert.deepEqual(entry.canonicalProblems, []);
        assert.deepEqual(entry.canonicalKnowledge, []);
      }
    }
  }
});
