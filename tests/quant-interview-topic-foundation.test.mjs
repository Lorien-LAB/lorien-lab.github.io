import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));

test('Green and Red source manifests are pinned to the supplied files', async () => {
  const green = await readJson('src/data/quant-interview/green-book.json');
  const red = await readJson('src/data/quant-interview/red-book.json');

  assert.equal(green.editionStatus, 'edition-pinned');
  assert.equal(green.edition, 'First Edition (2008)');
  assert.equal(green.isbn, '9781438236667');
  assert.equal(green.sourceFile, 'sha256:89a637408fc57164c3ee4ef19fb36688a58dfb37b91ef1471d11df82d6d0e3f5');
  assert.equal(green.sourceFileMeta.pdfPageCount, 213);

  assert.equal(red.editionStatus, 'edition-pinned');
  assert.equal(red.edition, 'Version 1.01 (2008)');
  assert.equal(red.isbn, '9781438217031');
  assert.equal(red.sourceFile, 'sha256:09c5aac761bd71c4a6b9406f50dcfe73d8af3ce0a3ef9bb4fe2d65d0b27db6b1');
  assert.equal(red.sourceFileMeta.pdfPageCount, 329);
});

test('ingestion evidence may overlap across distinct semantic problem scopes', async () => {
  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');
  const manifest = {
    source: 'x', canonicalTitle: 'X', editionStatus: 'edition-pinned', edition: '1', isbn: null,
    sourceFile: 'sha256:x', ingestionStatus: 'ingesting',
    batches: [
      { id: 'a', sourceSection: 'S', expectedProblemScope: ['1', '2'], evidencePageRanges: [{ startPage: 1, endPage: 6 }], status: 'complete' },
      { id: 'b', sourceSection: 'S', expectedProblemScope: ['3'], evidencePageRanges: [{ startPage: 6, endPage: 7 }], status: 'active' },
      { id: 'c', sourceSection: 'S', expectedProblemScope: ['4', '5'], evidencePageRanges: [{ startPage: 7, endPage: 9 }], status: 'complete' },
      { id: 'd', sourceSection: 'S', expectedProblemScope: ['6'], evidencePageRanges: [{ startPage: 9, endPage: 10 }], status: 'active' },
    ],
  };
  assert.doesNotThrow(() => validateIngestionManifest(manifest));
});

test('duplicate semantic problem ownership is rejected even when evidence differs', async () => {
  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');
  assert.throws(() => validateIngestionManifest({
    source: 'x', canonicalTitle: 'X', editionStatus: 'edition-pinned', edition: '1', isbn: null,
    sourceFile: 'sha256:x', ingestionStatus: 'ingesting',
    batches: [
      { id: 'a', sourceSection: 'S', expectedProblemScope: ['3'], evidencePageRanges: [{ startPage: 6, endPage: 7 }] },
      { id: 'b', sourceSection: 'S', expectedProblemScope: ['3'], evidencePageRanges: [{ startPage: 20, endPage: 21 }] },
    ],
  }), /duplicate source problem ownership/i);
});

test('canonical topic taxonomy is unique and structurally valid', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const { validateTopicTaxonomy, flattenTopics } = await import('../src/lib/quantInterviewTopics.mjs');
  assert.doesNotThrow(() => validateTopicTaxonomy(taxonomy));
  const flat = flattenTopics(taxonomy);
  assert.equal(flat.length, new Set(flat.map((x) => x.id)).size);
  assert.deepEqual(flat.filter((x) => x.parentId === null).map((x) => x.id), [
    'interview-strategy-communication',
    'logic-brainteasers-discrete-reasoning',
    'calculus-differential-equations',
    'linear-algebra-matrix-methods',
    'probability-statistics',
    'stochastic-processes-stochastic-calculus',
    'derivatives-options-no-arbitrage',
    'fixed-income-rates-general-finance',
    'monte-carlo-numerical-methods',
    'algorithms-data-structures-cpp',
  ]);
});

test('topic taxonomy rejects duplicate ids, duplicate sibling order, and reused objects', async () => {
  const { validateTopicTaxonomy } = await import('../src/lib/quantInterviewTopics.mjs');
  assert.throws(() => validateTopicTaxonomy({ version: 1, topics: [
    { id: 'x', title: 'X', order: 1 },
    { id: 'x', title: 'X2', order: 2 },
  ]}), /duplicate topic id/i);
  assert.throws(() => validateTopicTaxonomy({ version: 1, topics: [
    { id: 'x', title: 'X', order: 1 },
    { id: 'y', title: 'Y', order: 1 },
  ]}), /duplicate sibling topic order/i);
  const shared = { id: 'shared', title: 'Shared', order: 1 };
  assert.throws(() => validateTopicTaxonomy({ version: 1, topics: [
    { id: 'a', title: 'A', order: 1, children: [shared] },
    { id: 'b', title: 'B', order: 2, children: [shared] },
  ]}), /reused or cyclic/i);
});
