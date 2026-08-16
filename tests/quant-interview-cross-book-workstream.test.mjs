import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (filePath) => JSON.parse(await readFile(filePath, 'utf8'));
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

const semanticDecisions = {
  'green-book': {
    '3.6.4::psd-pd-criteria': ['knowledge-only', [], ['positive-semidefinite-matrix', 'principal-minor-feasibility']],
    '3.6.4::correlation-range-0.8-0.8': ['variant', ['correlation-matrix-parameter-range'], ['correlation-matrix', 'positive-semidefinite-matrix', 'principal-minor-feasibility']],
    '4.5::covariance-correlation-definitions': ['knowledge-only', [], ['correlation-matrix']],
  },
  'red-book': {
    '3.2.1::3.26': ['variant', ['correlation-matrix-parameter-range'], ['correlation-matrix', 'positive-semidefinite-matrix', 'principal-minor-feasibility']],
    '3.2.1::3.35': ['canonical-problem', ['covariance-matrix-positive-semidefinite-proof'], ['correlation-matrix', 'positive-semidefinite-matrix']],
    '6.2.1::6.9': ['knowledge-only', [], ['positive-semidefinite-matrix', 'principal-minor-feasibility']],
  },
  '150-most-frequently-asked': {
    '1::5': ['canonical-problem', ['correlation-matrix-parameter-range'], ['correlation-matrix', 'positive-semidefinite-matrix', 'principal-minor-feasibility']],
    '2.2::1': ['variant', ['covariance-matrix-positive-semidefinite-proof'], ['correlation-matrix', 'positive-semidefinite-matrix']],
    '2.2::2': ['canonical-problem', ['covariance-to-correlation-matrix'], ['correlation-matrix']],
    '2.2::3': ['canonical-problem', ['equicorrelation-matrix-bounds'], ['correlation-matrix', 'positive-semidefinite-matrix']],
    '2.2::10': ['merged-duplicate', ['correlation-matrix-parameter-range'], ['correlation-matrix', 'positive-semidefinite-matrix', 'principal-minor-feasibility']],
  },
};

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(files.filter((file) => String(file).endsWith('.md')).map((file) => path.basename(String(file), '.md')));
}

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

test('coverage may override a coarse TOC topic only with an explicit item-level reason', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');
  const sourceTopicMap = { version: 1, entries: [
    { source: 'x', sourceSection: 'mixed', role: 'content', canonicalTopics: ['probability-statistics'] },
  ] };
  const context = { sourceTopicMap, taxonomy, problemSlugs: new Set(), knowledgeSlugs: new Set(), allowUnresolvedCanonicalRefs: true };
  const baseEntry = {
    sourceSection: 'mixed', sourceItem: 'covariance-definition',
    canonicalTopics: ['linear-algebra-matrix-methods', 'covariance-correlation-matrices'],
    state: 'needs-review', canonicalProblems: [], canonicalKnowledge: [],
  };
  assert.throws(() => validateCoverageLedger({ source: 'x', version: 1, entries: [baseEntry] }, context), /topic override reason/i);
  assert.doesNotThrow(() => validateCoverageLedger({ source: 'x', version: 1, entries: [{
    ...baseEntry,
    topicOverrideReason: 'This item is a covariance/correlation definition embedded inside a broader probability chapter.',
  }] }, context));
});

test('every inspected covariance/correlation/PSD source item has an item-level coverage row', async () => {
  for (const [source, keys] of Object.entries(inventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const entries = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = entries.get(`${section}::${item}`);
      assert.ok(entry, `missing inventory row ${source} ${section} ${item}`);
      assert.ok(entry.canonicalTopics.some((topic) => workstreamTopics.has(topic)), `${source} ${section} ${item} has no workstream topic`);
    }
  }
});

test('semantic dedup decisions map all inspected items to canonical knowledge or problem identities', async () => {
  for (const [source, expected] of Object.entries(semanticDecisions)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const entries = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [key, [state, problems, knowledge]] of Object.entries(expected)) {
      const entry = entries.get(key);
      assert.ok(entry, `missing semantic decision ${source} ${key}`);
      assert.equal(entry.state, state, `${source} ${key} has wrong semantic state`);
      assert.deepEqual(entry.canonicalProblems, problems, `${source} ${key} has wrong canonical problem mapping`);
      assert.deepEqual(entry.canonicalKnowledge, knowledge, `${source} ${key} has wrong canonical knowledge mapping`);
    }
  }
});

test('knowledge-only is terminal only when the public self-test remains visible', async () => {
  const standard = await readFile('docs/quant-interview/CONTENT_STANDARD.md', 'utf8');
  assert.match(standard, /knowledge-only[\s\S]{0,240}(Interview Checks|self-test)[\s\S]{0,240}(terminal|only)/i);

  const checked = new Set();
  for (const [source, expected] of Object.entries(semanticDecisions)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const entries = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [key, [state]] of Object.entries(expected)) {
      if (state !== 'knowledge-only') continue;
      const entry = entries.get(key);
      for (const slug of entry.canonicalKnowledge) checked.add(slug);
    }
  }
  for (const slug of checked) {
    const text = await readFile(`src/content/knowledge/concepts/${slug}.md`, 'utf8');
    assert.match(text, /## Interview Checks/i, `${slug} has knowledge-only coverage but no visible Interview Checks`);
  }
});

test('completed workstream has resolved real targets and no unresolved in-scope inventory', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');

  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');

  for (const [source, keys] of Object.entries(inventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      sourceTopicMap, taxonomy, problemSlugs, knowledgeSlugs, allowUnresolvedCanonicalRefs: false,
    }));
    const entries = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = entries.get(`${section}::${item}`);
      assert.ok(entry);
      assert.doesNotMatch(entry.state, /^(pending|needs-review)$/);
      assert.ok(entry.resolutionNote, `${source} ${section} ${item} missing resolution note`);
    }
  }
});

test('dedup produces no source-named duplicate correlation problems', async () => {
  const files = (await readdir('src/content/problems', { recursive: true })).map(String);
  assert.equal(files.filter((file) => /(?:green|red|150).*correlation/i.test(file)).length, 0);
  assert.equal(files.filter((file) => /correlation-matrix-parameter-range\.md$/.test(file)).length, 1);
});
