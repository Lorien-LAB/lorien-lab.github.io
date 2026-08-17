import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-probability-foundations-005.json';
const expectedExtensions = [
  'kolmogorov-probability-axioms',
  'derived-event-probability-rules',
  'mutual-exclusivity-vs-independence',
];
const sourceInventory = {
  'green-book': [
    ['4.1', 'definitions-set-operations'],
    ['4.1', 'coin-toss-game'],
    ['4.1', 'card-game'],
    ['4.1', 'drunk-passenger'],
    ['4.1', 'n-points-on-a-circle'],
  ],
  'red-book': [
    ['3.2.1', '3.16'],
    ['3.2.1', '3.18'],
    ['3.2.1', '3.24'],
    ['3.2.1', '3.25'],
  ],
  '150-most-frequently-asked': [
    ['1', '6'],
    ['2.7', '3'],
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

export async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(files.filter((file) => String(file).endsWith('.md')).map((file) => path.basename(String(file), '.md')));
}

test('fifth cross-book workstream is bounded to probability foundations', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'probability-statistics-probability-foundations-005');
  assert.deepEqual(workstream.canonicalTopics, ['probability-statistics', 'probability-foundations']);
  assert.deepEqual(workstream.canonicalExtensions, expectedExtensions);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
  assert.match(workstream.status, /^(?:active|complete)$/);
});

test('existing workstream validator accepts the approved extension declaration', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: 'axioms' }, ctx), /canonicalExtensions.*array/i);
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: ['axioms', 'axioms'] }, ctx), /duplicate canonical extension/i);
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: [''] }, ctx), /canonical extension.*non-empty string/i);
});

test('every claimed probability foundations source item is explicitly inventoried', async () => {
  for (const [source, keys] of Object.entries(sourceInventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = byKey.get(`${section}::${item}`);
      assert.ok(entry, `missing inventory row ${source} ${section} ${item}`);
      assert.ok(entry.canonicalTopics.includes('probability-foundations'), `${source} ${section} ${item} missing probability-foundations topic`);
    }
  }
});

test('150 brainteaser probability item has an explicit item-level topic override reason', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  const entry = ledger.entries.find((item) => item.sourceSection === '2.7' && item.sourceItem === '3');
  assert.ok(entry);
  assert.deepEqual(entry.canonicalTopics, ['probability-foundations']);
  assert.match(entry.topicOverrideReason ?? '', /item-level|mathematical identity|editorial/i);
});
