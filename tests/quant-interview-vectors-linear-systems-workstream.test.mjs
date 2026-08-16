import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/linear-algebra-vectors-linear-systems-004.json';
const expectedExtensions = [
  'inner-product-projection-core',
  'span-basis-rank-nullity',
  'linear-system-consistency-rref',
];
const sourceInventory = {
  'green-book': [
    ['3.6.1', 'vector-coordinate-representation'],
    ['3.6.1', 'dot-product'],
    ['3.6.1', 'euclidean-norm-distance'],
    ['3.6.1', 'angle-orthogonality'],
    ['3.6.1', 'correlation-as-cosine'],
    ['3.6.1', 'correlation-range-0.8-0.8'],
  ],
  '150-most-frequently-asked': [
    ['2.2', '9'],
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

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(files.filter((file) => String(file).endsWith('.md')).map((file) => path.basename(String(file), '.md')));
}

async function findKnowledge(slug) {
  const files = await readdir('src/content/knowledge', { recursive: true });
  const match = files.find((file) => String(file).endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing knowledge ${slug}`);
  return `src/content/knowledge/${match}`;
}

test('fourth cross-book workstream is bounded to vectors and linear systems', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'linear-algebra-vectors-linear-systems-004');
  assert.deepEqual(workstream.canonicalTopics, ['linear-algebra-matrix-methods', 'vectors-linear-systems']);
  assert.deepEqual(workstream.canonicalExtensions, expectedExtensions);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
  assert.match(workstream.status, /^(?:active|complete)$/);
});

test('workstream validator accepts canonical extensions and rejects malformed declarations', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: 'rank' }, ctx), /canonicalExtensions.*array/i);
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: ['rank', 'rank'] }, ctx), /duplicate canonical extension/i);
  assert.throws(() => validateTopicWorkstream({ ...workstream, canonicalExtensions: [''] }, ctx), /canonical extension.*non-empty string/i);
});

test('every inspected vectors linear systems source item is explicitly inventoried', async () => {
  for (const [source, keys] of Object.entries(sourceInventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = byKey.get(`${section}::${item}`);
      assert.ok(entry, `missing inventory row ${source} ${section} ${item}`);
      assert.ok(entry.canonicalTopics.includes('vectors-linear-systems'), `${source} ${section} ${item} missing vectors-linear-systems topic`);
    }
  }
});

test('Green correlation geometry variant is owned by the actual Vectors section', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/green-book.json');
  const matches = ledger.entries.filter((entry) => entry.sourceItem === 'correlation-range-0.8-0.8');
  assert.equal(matches.length, 1);
  assert.equal(matches[0].sourceSection, '3.6.1');
  assert.deepEqual(matches[0].canonicalProblems, ['correlation-matrix-parameter-range']);
  assert.ok(matches[0].canonicalTopics.includes('vectors-linear-systems'));
});
