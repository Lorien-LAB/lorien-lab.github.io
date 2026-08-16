import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

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

test('all three source TOCs are explicitly reconciled into the canonical topic map', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const topicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const tocBySource = {
    'green-book': await readJson('src/data/quant-interview/toc/green-book.json'),
    'red-book': await readJson('src/data/quant-interview/toc/red-book.json'),
    '150-most-frequently-asked': await readJson('src/data/quant-interview/toc/150-most-frequently-asked.json'),
  };
  const { validateSourceTopicMap } = await import('../src/lib/quantInterviewTopics.mjs');
  assert.doesNotThrow(() => validateSourceTopicMap(topicMap, taxonomy, tocBySource));
  assert.equal(topicMap.entries.length, new Set(topicMap.entries.map((x) => `${x.source}::${x.sourceSection}`)).size);
});

test('hidden coverage ledgers are valid and start explicitly pending', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');
  for (const source of ['green-book', 'red-book', '150-most-frequently-asked']) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      sourceTopicMap, taxonomy, problemSlugs: new Set(), knowledgeSlugs: new Set(), allowUnresolvedCanonicalRefs: true,
    }));
    assert.ok(ledger.entries.length > 0);
    assert.ok(ledger.entries.every((entry) => entry.state));
  }
});

test('coverage item-level topics may refine a mapped ancestor topic', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = { version: 1, entries: [
    { source: 'x', sourceSection: 's', role: 'content', canonicalTopics: ['probability-statistics'] },
  ]};
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');
  const ledger = { source: 'x', version: 1, entries: [
    { sourceSection: 's', sourceItem: '1', canonicalTopics: ['conditional-probability-bayes'], state: 'pending', canonicalProblems: [], canonicalKnowledge: [] },
  ]};
  assert.doesNotThrow(() => validateCoverageLedger(ledger, {
    sourceTopicMap, taxonomy, problemSlugs: new Set(), knowledgeSlugs: new Set(), allowUnresolvedCanonicalRefs: true,
  }));
});

test('coverage ledger validator enforces terminal targets and map-consistent topics', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = { version: 1, entries: [
    { source: 'x', sourceSection: 's', role: 'content', canonicalTopics: ['probability-statistics'] },
  ]};
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');
  const context = { sourceTopicMap, taxonomy, problemSlugs: new Set(['p']), knowledgeSlugs: new Set(['k']), allowUnresolvedCanonicalRefs: false };
  const base = { source: 'x', version: 1, entries: [] };
  assert.throws(() => validateCoverageLedger({ ...base, entries: [{ sourceSection: 's', sourceItem: '1', canonicalTopics: ['probability-statistics'], state: 'canonical-problem', canonicalProblems: [], canonicalKnowledge: [] }] }, context), /canonical problem target/i);
  assert.throws(() => validateCoverageLedger({ ...base, entries: [{ sourceSection: 's', sourceItem: '1', canonicalTopics: ['probability-statistics'], state: 'knowledge-only', canonicalProblems: [], canonicalKnowledge: [] }] }, context), /canonical knowledge target/i);
  assert.throws(() => validateCoverageLedger({ ...base, entries: [{ sourceSection: 's', sourceItem: '1', canonicalTopics: ['black-scholes'], state: 'pending', canonicalProblems: [], canonicalKnowledge: [] }] }, context), /inconsistent with source-topic map/i);
});

test('hidden coverage infrastructure is not imported by public pages or layouts', async () => {
  const roots = ['src/pages/knowledge/quant-interview', 'src/pages/problems', 'src/layouts', 'src/components'];
  for (const root of roots) {
    for (const name of await readdir(root, { recursive: true })) {
      const path = `${root}/${name}`;
      if (!/\.(?:astro|ts|js|mjs)$/.test(path)) continue;
      const text = await readFile(path, 'utf8');
      assert.doesNotMatch(text, /quant-interview\/coverage|quantInterviewCoverage/);
    }
  }
});
