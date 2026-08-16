import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
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

const semanticDecisions = {
  'green-book': {
    '3.6.3::determinant-properties': ['knowledge-only', [], ['matrix-spectral-invariants']],
    '3.6.3::eigenvalue-eigenvector-definitions': ['knowledge-only', [], ['eigenvalues-eigenvectors']],
    '3.6.3::trace-determinant-spectrum': ['knowledge-only', [], ['eigenvalues-eigenvectors', 'matrix-spectral-invariants']],
    '3.6.3::diagonalization': ['knowledge-only', [], ['eigenvalues-eigenvectors', 'eigenbasis-decomposition']],
    '3.6.3::two-by-two-eigensystem': ['canonical-problem', ['two-by-two-eigensystem'], ['eigenvalues-eigenvectors', 'matrix-spectral-invariants']],
  },
  '150-most-frequently-asked': {
    '2.2::4': ['knowledge-only', [], ['eigenvalues-eigenvectors']],
    '2.2::6': ['canonical-problem', ['apply-matrix-via-eigenbasis'], ['eigenvalues-eigenvectors', 'eigenbasis-decomposition']],
    '2.2::7': ['canonical-problem', ['trace-ab-equals-trace-ba'], ['matrix-spectral-invariants']],
    '2.2::8': ['canonical-problem', ['commutator-cannot-equal-identity'], ['matrix-spectral-invariants']],
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

test('every inspected determinant/eigenvalue item is explicitly inventoried', async () => {
  for (const [source, keys] of Object.entries(inventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      const entry = byKey.get(`${section}::${item}`);
      assert.ok(entry, `missing inventory row ${source} ${section} ${item}`);
      assert.ok(entry.canonicalTopics.every((topic) => topicSet.has(topic)), `${source} ${section} ${item} escaped workstream scope`);
      assert.ok(entry.canonicalTopics.includes('determinants-eigenvalues'), `${source} ${section} ${item} missing determinants/eigenvalues topic`);
    }
  }
});

test('semantic identity decisions distinguish canonical problems from reusable knowledge', async () => {
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

test('knowledge-only determinant/eigenvalue items remain visible as public Interview Checks', async () => {
  const knowledgeOnlyTargets = new Set();
  for (const expected of Object.values(semanticDecisions)) {
    for (const [state, , knowledge] of Object.values(expected)) {
      if (state === 'knowledge-only') for (const slug of knowledge) knowledgeOnlyTargets.add(slug);
    }
  }
  assert.deepEqual(knowledgeOnlyTargets, new Set(['matrix-spectral-invariants', 'eigenvalues-eigenvectors', 'eigenbasis-decomposition']));
  for (const slug of knowledgeOnlyTargets) {
    const file = await findKnowledge(slug);
    const text = await readFile(file, 'utf8');
    assert.match(text, /## Interview Checks/i, `${slug} hides knowledge-only interview tests`);
  }
});

test('completed determinant/eigenvalue workstream has terminal resolved coverage', async () => {
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

test('determinant/eigenvalue public corpus contains no source-named duplicate pages', async () => {
  const files = (await readdir('src/content/problems/linear-algebra')).filter((file) => String(file).endsWith('.md'));
  assert.deepEqual(files.filter((file) => /green|red|150|frequently-asked/i.test(String(file))), []);
});
