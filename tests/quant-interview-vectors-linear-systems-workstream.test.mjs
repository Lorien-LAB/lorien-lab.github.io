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
const semanticDecisions = {
  'green-book': {
    '3.6.1::vector-coordinate-representation': ['knowledge-only', [], ['vector-geometry-inner-products']],
    '3.6.1::dot-product': ['knowledge-only', [], ['vector-geometry-inner-products']],
    '3.6.1::euclidean-norm-distance': ['knowledge-only', [], ['vector-geometry-inner-products']],
    '3.6.1::angle-orthogonality': ['knowledge-only', [], ['vector-geometry-inner-products']],
    '3.6.1::correlation-as-cosine': ['knowledge-only', [], ['vector-geometry-inner-products', 'correlation-matrix']],
  },
  '150-most-frequently-asked': {
    '2.2::9': ['canonical-problem', ['product-of-row-stochastic-matrices'], []],
  },
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

async function readPublicTree(root) {
  const files = await readdir(root, { recursive: true });
  const readable = files.filter((file) => /\.(?:astro|js|mjs|ts|tsx|jsx)$/.test(String(file)));
  const chunks = await Promise.all(readable.map(async (file) => `${file}\n${await readFile(`${root}/${file}`, 'utf8')}`));
  return chunks.join('\n');
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

test('semantic identity distinguishes source-derived vector knowledge from canonical extensions', async () => {
  for (const [source, expected] of Object.entries(semanticDecisions)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [key, [state, problems, knowledge]] of Object.entries(expected)) {
      const entry = byKey.get(key);
      assert.ok(entry, `missing semantic row ${source} ${key}`);
      assert.equal(entry.state, state, `${source} ${key} has wrong semantic state`);
      assert.deepEqual(entry.canonicalProblems, problems, `${source} ${key} has wrong problem targets`);
      assert.deepEqual(entry.canonicalKnowledge, knowledge, `${source} ${key} has wrong knowledge targets`);
      assert.match(entry.resolutionNote ?? '', /\S/, `${source} ${key} missing resolution note`);
    }
  }

  const green = await readJson('src/data/quant-interview/coverage/green-book.json');
  const correlation = green.entries.find((entry) => entry.sourceSection === '3.6.1' && entry.sourceItem === 'correlation-range-0.8-0.8');
  assert.equal(correlation?.state, 'variant');
  assert.deepEqual(correlation?.canonicalProblems, ['correlation-matrix-parameter-range']);
  assert.ok(correlation?.canonicalKnowledge.includes('vector-geometry-inner-products'));
  assert.match(correlation?.resolutionNote ?? '', /geometric|angle|Gram/i);
});

test('repository-authored canonical extensions do not masquerade as source coverage', async () => {
  const forbiddenProblem = 'rank-and-consistency-of-linear-system';
  const forbiddenKnowledge = new Set(['linear-independence-span-basis-rank', 'linear-systems-consistency']);
  for (const source of ['green-book', 'red-book', '150-most-frequently-asked']) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    for (const entry of ledger.entries) {
      assert.ok(!entry.canonicalProblems.includes(forbiddenProblem), `${source} fabricates source provenance for ${forbiddenProblem}`);
      for (const slug of entry.canonicalKnowledge) {
        assert.ok(!forbiddenKnowledge.has(slug), `${source} fabricates source provenance for ${slug}`);
      }
    }
  }
});

test('canonical extension audit metadata is never a public rendering dependency', async () => {
  const publicText = `${await readPublicTree('src/pages')}\n${await readPublicTree('src/layouts')}`;
  assert.doesNotMatch(publicText, /canonicalExtensions/);
  assert.doesNotMatch(publicText, /linear-algebra-vectors-linear-systems-004\.json/);
  assert.doesNotMatch(publicText, /data\/quant-interview\/workstreams/);
});

test('all inspected vectors linear systems source rows are terminal and resolve to real canonical slugs', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');

  for (const [source, keys] of Object.entries(sourceInventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = byKey.get(`${section}::${item}`);
      assert.ok(entry, `missing completion row ${source} ${section} ${item}`);
      assert.doesNotMatch(entry.state, /^(?:pending|needs-review)$/);
      assert.match(entry.resolutionNote ?? '', /\S/, `${source} ${section} ${item} lacks a resolution note`);
    }
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      taxonomy,
      sourceTopicMap,
      problemSlugs,
      knowledgeSlugs,
      allowUnresolvedCanonicalRefs: false,
    }));
  }
});

test('Red source has an explicit no-new-direct-item audit for this workstream', async () => {
  const workstream = await readJson(workstreamPath);
  const redScope = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  assert.ok(redScope, 'missing Red source scope');
  assert.equal(redScope.reviewOutcome, 'no-new-direct-item');
  assert.match(redScope.reviewNote ?? '', /vector|basis|rank|linear-system/i);
});

test('knowledge-only Green vector material remains publicly visible through Interview Checks', async () => {
  const file = await findKnowledge('vector-geometry-inner-products');
  const text = await readFile(file, 'utf8');
  assert.match(text, /## Interview Checks/i);
  assert.match(text, /Cauchy[-– ]Schwarz/i);
  assert.match(text, /correlation coefficient|correlation/i);
});

test('vectors linear systems public corpus contains no source-named duplicate pages', async () => {
  const files = (await readdir('src/content/problems/linear-algebra')).filter((file) => String(file).endsWith('.md')).map(String);
  assert.deepEqual(files.filter((file) => /green|red|150|frequently-asked|question-9/i.test(file)), []);
  assert.equal(files.filter((file) => /correlation-matrix-parameter-range\.md$/.test(file)).length, 1);
  assert.equal(files.filter((file) => /product-of-row-stochastic-matrices\.md$/.test(file)).length, 1);
  assert.equal(files.filter((file) => /rank-and-consistency-of-linear-system\.md$/.test(file)).length, 1);
});

test('vectors linear systems workstream closes only after every completion invariant holds', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  assert.deepEqual(workstream.canonicalExtensions, expectedExtensions);
});
