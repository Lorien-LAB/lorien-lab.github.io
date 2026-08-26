import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/linear-algebra-matrix-decompositions-003.json';
const topicSet = new Set(['linear-algebra-matrix-methods', 'matrix-decompositions']);

const inventory = {
  'green-book': [
    ['3.6.2', 'qr-decomposition'],
    ['3.6.2', 'least-squares-regression'],
    ['3.6.5', 'lu-decomposition'],
    ['3.6.5', 'cholesky-decomposition'],
    ['3.6.5', 'correlated-normal-generation'],
    ['3.6.5', 'singular-value-decomposition'],
  ],
  'red-book': [
    ['6.2.1', '6.10'],
  ],
  '150-most-frequently-asked': [
    ['2.2', '5'],
  ],
};

const semanticDecisions = {
  'green-book': {
    '3.6.2::qr-decomposition': ['knowledge-only', [], ['qr-decomposition']],
    '3.6.2::least-squares-regression': ['canonical-problem', ['least-squares-via-qr'], ['qr-decomposition']],
    '3.6.5::lu-decomposition': ['knowledge-only', [], ['lu-cholesky-decomposition']],
    '3.6.5::cholesky-decomposition': ['knowledge-only', [], ['lu-cholesky-decomposition']],
    '3.6.5::correlated-normal-generation': ['canonical-problem', ['generate-correlated-gaussians'], ['lu-cholesky-decomposition', 'singular-value-decomposition']],
    '3.6.5::singular-value-decomposition': ['knowledge-only', [], ['singular-value-decomposition']],
  },
  'red-book': {
    '6.2.1::6.10': ['canonical-problem', ['matrix-square-root-and-cholesky-factor'], ['eigenbasis-decomposition', 'lu-cholesky-decomposition']],
  },
  '150-most-frequently-asked': {
    '2.2::5': ['variant', ['matrix-square-root-and-cholesky-factor'], ['eigenbasis-decomposition', 'lu-cholesky-decomposition']],
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
  const match = files.find((file) => String(file).replaceAll('\\', '/').endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing knowledge ${slug}`);
  return `src/content/knowledge/${match}`;
}

test('third cross-book workstream is bounded to matrix decompositions', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'linear-algebra-matrix-decompositions-003');
  assert.deepEqual(new Set(workstream.canonicalTopics), topicSet);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
  assert.match(workstream.status, /^(?:active|complete)$/);
});

test('matrix decomposition workstream source scope validates against verified manifests', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});

test('every inspected matrix decomposition item is explicitly inventoried', async () => {
  for (const [source, keys] of Object.entries(inventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = byKey.get(`${section}::${item}`);
      assert.ok(entry, `missing inventory row ${source} ${section} ${item}`);
      assert.deepEqual(entry.canonicalTopics, ['matrix-decompositions']);
    }
  }
});

test('semantic identity decisions distinguish reusable decomposition knowledge from canonical problems', async () => {
  for (const [source, expected] of Object.entries(semanticDecisions)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [key, [state, problems, knowledge]] of Object.entries(expected)) {
      const entry = byKey.get(key);
      assert.ok(entry, `missing semantic row ${source} ${key}`);
      assert.equal(entry.state, state, `${source} ${key} has wrong state`);
      assert.deepEqual(entry.canonicalProblems, problems, `${source} ${key} has wrong problem targets`);
      assert.deepEqual(entry.canonicalKnowledge, knowledge, `${source} ${key} has wrong knowledge targets`);
      assert.match(entry.resolutionNote ?? '', /\S/, `${source} ${key} missing semantic resolution note`);
    }
  }
});

test('red and 150 matrix square root tasks resolve to one canonical problem', async () => {
  const red = await readJson('src/data/quant-interview/coverage/red-book.json');
  const q150 = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  const redEntry = red.entries.find((entry) => entry.sourceSection === '6.2.1' && entry.sourceItem === '6.10');
  const q150Entry = q150.entries.find((entry) => entry.sourceSection === '2.2' && entry.sourceItem === '5');
  assert.deepEqual(redEntry.canonicalProblems, ['matrix-square-root-and-cholesky-factor']);
  assert.deepEqual(q150Entry.canonicalProblems, ['matrix-square-root-and-cholesky-factor']);
  assert.equal(q150Entry.state, 'variant');
});

test('knowledge-only matrix decomposition items remain visible as public Interview Checks', async () => {
  const targets = new Set();
  for (const sourceDecisions of Object.values(semanticDecisions)) {
    for (const [state, , knowledge] of Object.values(sourceDecisions)) {
      if (state === 'knowledge-only') for (const slug of knowledge) targets.add(slug);
    }
  }
  assert.deepEqual(targets, new Set(['qr-decomposition', 'lu-cholesky-decomposition', 'singular-value-decomposition']));
  for (const slug of targets) {
    const file = await findKnowledge(slug);
    const text = await readFile(file, 'utf8');
    assert.match(text, /## Interview Checks/i, `${slug} hides knowledge-only source checks`);
  }
});

test('completed matrix decomposition workstream has terminal resolved coverage', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');

  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');

  for (const [source, keys] of Object.entries(inventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = byKey.get(`${section}::${item}`);
      assert.ok(entry);
      assert.doesNotMatch(entry.state, /^(?:pending|needs-review)$/);
      assert.match(entry.resolutionNote ?? '', /\S/);
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

test('matrix decomposition public corpus contains no source-named duplicate pages', async () => {
  const files = (await readdir('src/content/problems/linear-algebra')).filter((file) => String(file).endsWith('.md'));
  assert.deepEqual(files.filter((file) => /green|red|150|frequently-asked|q6-10|question-5/i.test(String(file))), []);
  assert.equal(files.filter((file) => /matrix-square-root-and-cholesky-factor\.md/.test(String(file))).length, 1);
});
