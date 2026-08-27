import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(
    files
      .filter((file) => String(file).endsWith('.md'))
      .map((file) => path.basename(String(file), '.md')),
  );
}

async function validatorContext() {
  const [taxonomy, sourceTopicMap] = await Promise.all([
    readJson('src/data/quant-interview/topics/taxonomy.json'),
    readJson('src/data/quant-interview/topics/source-topic-map.json'),
  ]);
  const manifests = Object.fromEntries(
    await Promise.all(
      ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [
        source,
        await readJson(`src/data/quant-interview/${source}.json`),
      ]),
    ),
  );
  return { taxonomy, sourceTopicMap, manifests };
}

test('013 manifest has the exact bounded identity and source scopes', async () => {
  const manifest = await readJson(manifestPath);
  assert.equal(
    manifest.id,
    'interview-strategy-communication-reasoning-communication-013',
  );
  assert.match(manifest.status, /^(?:active|complete)$/);
  assert.deepEqual(manifest.canonicalTopics, [
    'interview-strategy-communication',
    'reasoning-communication',
  ]);
  assert.equal(manifest.sourceScopes.length, 2);

  const green = manifest.sourceScopes.find(({ source }) => source === 'green-book');
  assert.deepEqual(green?.sourceSections, ['1.3', '1.4', '1.5']);
  assert.deepEqual(green?.evidencePageRanges, [{ startPage: 18, endPage: 18 }]);
  assert.equal(green?.reviewOutcome, 'bounded-item-level-review');
  assert.ok(green?.reviewNote?.trim());

  const red = manifest.sourceScopes.find(({ source }) => source === 'red-book');
  assert.deepEqual(red?.sourceSections, ['1.12']);
  assert.deepEqual(red?.evidencePageRanges, [{ startPage: 25, endPage: 26 }]);
  assert.equal(
    red?.reviewOutcome,
    'reclassified-to-interview-preparation-coverage-only',
  );
  assert.ok(red?.reviewNote?.trim());

  assert.equal(
    manifest.sourceScopes.some(
      ({ source }) => source === '150-most-frequently-asked',
    ),
    false,
  );
});

test('Green 1.3 through 1.5 resolve knowledge-only to the two canonical nodes', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/green-book.json');
  const rows = new Map(ledger.entries.map((entry) => [keyOf(entry), entry]));
  const expected = {
    '1.3::': ['problem-framing-clarification-assumption-management'],
    '1.4::': ['structured-think-aloud-reasoning'],
    '1.5::': ['problem-framing-clarification-assumption-management'],
  };
  for (const [key, target] of Object.entries(expected)) {
    const row = rows.get(key);
    assert.deepEqual(row?.canonicalTopics, ['reasoning-communication'], key);
    assert.equal(row?.state, 'knowledge-only', key);
    assert.deepEqual(row?.canonicalProblems, [], key);
    assert.deepEqual(row?.canonicalKnowledge, target, key);
    assert.ok(row?.resolutionNote?.trim(), key);
  }
  const owned = ledger.entries
    .filter(
      (entry) =>
        entry.canonicalTopics?.includes('reasoning-communication') &&
        entry.state !== 'pending',
    )
    .map(keyOf)
    .sort();
  assert.deepEqual(owned, ['1.3::', '1.4::', '1.5::']);
});

test('Red 1.12 is preparation guidance with no public target', async () => {
  const [sourceTopicMap, ledger] = await Promise.all([
    readJson('src/data/quant-interview/topics/source-topic-map.json'),
    readJson('src/data/quant-interview/coverage/red-book.json'),
  ]);
  const mapping = sourceTopicMap.entries.find(
    (entry) => entry.source === 'red-book' && entry.sourceSection === '1.12',
  );
  assert.deepEqual(mapping, {
    source: 'red-book',
    sourceSection: '1.12',
    role: 'content',
    canonicalTopics: ['interview-preparation'],
  });
  const row = ledger.entries.find((entry) => keyOf(entry) === '1.12::');
  assert.deepEqual(row?.canonicalTopics, ['interview-preparation']);
  assert.equal(row?.state, 'interview-guidance');
  assert.deepEqual(row?.canonicalProblems, []);
  assert.deepEqual(row?.canonicalKnowledge, []);
  assert.ok(row?.resolutionNote?.trim());
  assert.equal(
    ledger.entries.some(
      (entry) =>
        entry.canonicalTopics?.includes('reasoning-communication') &&
        entry.state !== 'pending',
    ),
    false,
  );
});

test('150 Questions has no reasoning communication map, coverage, or scope', async () => {
  const [sourceTopicMap, ledger, manifest] = await Promise.all([
    readJson('src/data/quant-interview/topics/source-topic-map.json'),
    readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json'),
    readJson(manifestPath),
  ]);
  assert.equal(
    sourceTopicMap.entries.some(
      (entry) =>
        entry.source === '150-most-frequently-asked' &&
        entry.canonicalTopics?.includes('reasoning-communication'),
    ),
    false,
  );
  assert.equal(
    ledger.entries.some((entry) =>
      entry.canonicalTopics?.includes('reasoning-communication'),
    ),
    false,
  );
  assert.equal(
    manifest.sourceScopes.some(
      ({ source }) => source === '150-most-frequently-asked',
    ),
    false,
  );
});

test('013 workstream and affected ledgers validate against real targets', async () => {
  const [manifest, context, problemSlugs, knowledgeSlugs] = await Promise.all([
    readJson(manifestPath),
    validatorContext(),
    markdownSlugs('src/content/problems'),
    markdownSlugs('src/content/knowledge'),
  ]);
  const { validateTopicWorkstream } = await import(
    '../src/lib/quantInterviewWorkstreams.mjs'
  );
  const { validateCoverageLedger } = await import(
    '../src/lib/quantInterviewCoverage.mjs'
  );
  assert.doesNotThrow(() => validateTopicWorkstream(manifest, context));
  for (const source of ['green-book', 'red-book']) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    assert.doesNotThrow(() =>
      validateCoverageLedger(ledger, {
        sourceTopicMap: context.sourceTopicMap,
        taxonomy: context.taxonomy,
        problemSlugs,
        knowledgeSlugs,
        allowUnresolvedCanonicalRefs: false,
      }),
    );
  }
});
