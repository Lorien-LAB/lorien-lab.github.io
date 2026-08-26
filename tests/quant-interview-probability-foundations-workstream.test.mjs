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
const semanticDecisions = {
  'green-book': {
    '4.1::definitions-set-operations': ['knowledge-only', [], ['probability-spaces-events']],
    '4.1::coin-toss-game': ['canonical-problem', ['more-heads-with-one-extra-coin'], ['symmetry-equiprobability-geometric-probability']],
    '4.1::card-game': ['canonical-problem', ['higher-card-by-symmetry'], ['symmetry-equiprobability-geometric-probability']],
    '4.1::drunk-passenger': ['canonical-problem', ['drunk-passenger-last-seat'], ['symmetry-equiprobability-geometric-probability']],
    '4.1::n-points-on-a-circle': ['canonical-problem', ['random-points-in-a-semicircle'], ['probability-spaces-events', 'symmetry-equiprobability-geometric-probability']],
  },
  'red-book': {
    '3.2.1::3.16': ['knowledge-only', [], ['symmetry-equiprobability-geometric-probability']],
    '3.2.1::3.18': ['merged-duplicate', ['higher-card-by-symmetry'], ['symmetry-equiprobability-geometric-probability']],
    '3.2.1::3.24': ['canonical-problem', ['romeo-juliet-meeting-probability'], ['symmetry-equiprobability-geometric-probability']],
    '3.2.1::3.25': ['merged-duplicate', ['drunk-passenger-last-seat'], ['symmetry-equiprobability-geometric-probability']],
  },
  '150-most-frequently-asked': {
    '1::6': ['canonical-problem', ['minimum-trials-for-at-least-one-hit'], ['probability-axioms-derived-rules']],
    '2.7::3': ['merged-duplicate', ['more-heads-with-one-extra-coin'], ['symmetry-equiprobability-geometric-probability']],
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

test('probability foundations semantic decisions converge across sources', async () => {
  for (const [source, expected] of Object.entries(semanticDecisions)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [key, [state, problems, knowledge]] of Object.entries(expected)) {
      const entry = byKey.get(key);
      assert.ok(entry, `missing ${source} ${key}`);
      assert.equal(entry.state, state, `${source} ${key} wrong state`);
      assert.deepEqual(entry.canonicalProblems, problems, `${source} ${key} wrong problem targets`);
      assert.deepEqual(entry.canonicalKnowledge, knowledge, `${source} ${key} wrong knowledge targets`);
      assert.match(entry.resolutionNote ?? '', /\S/, `${source} ${key} missing resolution note`);
    }
  }
});

test('150 First Look Q6 contributes only complement and repeated-independence reasoning to the mixed Knowledge node', async () => {
  const ledger = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  const entry = ledger.entries.find((item) => item.sourceSection === '1' && item.sourceItem === '6');
  assert.deepEqual(entry?.canonicalKnowledge, ['probability-axioms-derived-rules']);
  assert.match(entry?.resolutionNote ?? '', /complement/i);
  assert.match(entry?.resolutionNote ?? '', /independ/i);
  assert.match(entry?.resolutionNote ?? '', /does not source|not source|not support/i);
  assert.match(entry?.resolutionNote ?? '', /Kolmogorov|axiom/i);
});

test('all claimed probability foundations rows are terminal and resolve to real canonical slugs', async () => {
  const terminal = new Set(['canonical-problem', 'merged-duplicate', 'variant', 'knowledge-only', 'interview-guidance', 'non-content-frontmatter']);
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');

  for (const [source, keys] of Object.entries(sourceInventory)) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    const byKey = new Map(ledger.entries.map((entry) => [`${entry.sourceSection}::${entry.sourceItem ?? ''}`, entry]));
    for (const [section, item] of keys) {
      assert.ok(terminal.has(byKey.get(`${section}::${item}`)?.state), `${source} ${section} ${item} is not terminal`);
    }
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      sourceTopicMap,
      taxonomy,
      problemSlugs,
      knowledgeSlugs,
      allowUnresolvedCanonicalRefs: false,
    }));
  }
});

test('knowledge-only foundations source material remains visible through Interview Checks', async () => {
  for (const slug of ['probability-spaces-events', 'symmetry-equiprobability-geometric-probability']) {
    const files = await readdir('src/content/knowledge', { recursive: true });
    const match = files.find((file) => String(file).replaceAll('\\', '/').endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
    assert.ok(match, `missing knowledge ${slug}`);
    const text = await readFile(`src/content/knowledge/${match}`, 'utf8');
    assert.match(text, /^## Interview Checks$/m);
  }
});

test('probability foundations workstream closes only after every completion invariant holds', async () => {
  const workstream = await readJson(workstreamPath);
  const red = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  const q150 = workstream.sourceScopes.find((scope) => scope.source === '150-most-frequently-asked');
  assert.match(red?.reviewNote ?? '', /later canonical topics/i);
  assert.match(q150?.reviewNote ?? '', /later canonical topics/i);
  assert.equal(workstream.status, 'complete');
});
