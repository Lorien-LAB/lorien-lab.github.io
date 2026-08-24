import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const manifestPath = 'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json';
const mapPath = 'src/data/quant-interview/topics/source-topic-map.json';
const handoffPath = 'docs/quant-interview/HANDOFF.md';
const manifest011Path = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const manifest013Path = 'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';
const terminalStates = new Set(['canonical-problem', 'merged-duplicate', 'variant', 'knowledge-only']);
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;
const expectedCoverage = {};

expectedCoverage['green-book'] = {
  '3.1::': {
    state: 'knowledge-only',
    canonicalProblems: [],
    canonicalKnowledge: ['derivative-definition-and-core-rules', 'logarithmic-differentiation', 'monotonicity-convexity-critical-points-and-inflection', 'indeterminate-limits-and-growth-rates'],
    resolutionNote: 'Reusable derivative definitions and rules, logarithmic differentiation, qualitative derivative analysis, and elementary limit theory are fused into four public Knowledge nodes with visible Interview Checks.',
  },
  '3.1.1::': {
    state: 'canonical-problem',
    canonicalProblems: ['differentiate-variable-base-and-exponent'],
    canonicalKnowledge: ['derivative-definition-and-core-rules', 'logarithmic-differentiation'],
    resolutionNote: 'The canonical Problem derives the positive variable-base/variable-exponent rule, explicitly differentiates x^x on x>0, and applies the rule to the log-power case on x>1.',
  },
  '3.1.2::': {
    state: 'canonical-problem',
    canonicalProblems: ['compare-e-pi-power-expressions'],
    canonicalKnowledge: ['monotonicity-convexity-critical-points-and-inflection', 'derivative-definition-and-core-rules'],
    resolutionNote: 'The canonical comparison uses the sign of the first derivative on full intervals; a second derivative is only a local check and zero is inconclusive without a sign change.',
  },
  '3.1.3::': {
    state: 'canonical-problem',
    canonicalProblems: ['exponential-over-polynomial-limit', 'logarithm-power-limit-at-zero'],
    canonicalKnowledge: ['indeterminate-limits-and-growth-rates', 'derivative-definition-and-core-rules'],
    resolutionNote: "One source row contains two independent limit identities, so it resolves to two Problems; both enforce the L'Hôpital gate and the origin limit preserves its approach from below.",
  },
};

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

async function context() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson(mapPath);
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/${source}.json`)]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(files.filter((file) => String(file).endsWith('.md')).map((file) => path.basename(String(file), '.md')));
}

async function coverageRows(source) {
  const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
  return { ledger, rows: new Map(ledger.entries.map((entry) => [keyOf(entry), entry])) };
}

async function assertCoverageSource(source, expectedRows) {
  const { ledger, rows } = await coverageRows(source);
  for (const [key, expected] of Object.entries(expectedRows)) {
    assert.ok(rows.has(key), `${source} missing ${key}`);
    const row = rows.get(key);
    assert.equal(row.state, expected.state, `${source} ${key} state`);
    assert.deepEqual(row.canonicalTopics, ['limits-derivatives'], `${source} ${key} topics`);
    assert.deepEqual(row.canonicalProblems, expected.canonicalProblems, `${source} ${key} Problems`);
    assert.deepEqual(row.canonicalKnowledge, expected.canonicalKnowledge, `${source} ${key} Knowledge`);
    assert.equal(row.resolutionNote, expected.resolutionNote, `${source} ${key} resolution note`);
  }
  const actualOwned = ledger.entries
    .filter((entry) => terminalStates.has(entry.state) && entry.canonicalTopics?.includes('limits-derivatives'))
    .map(keyOf)
    .sort();
  assert.deepEqual(actualOwned, Object.keys(expectedRows).sort(), `${source} has an unexpected 012 terminal row`);
  return Object.keys(expectedRows).map((key) => rows.get(key));
}

test('exactly two Red source mappings change and every other map entry stays frozen', async () => {
  const sourceTopicMap = await readJson(mapPath);
  const repairedKeys = new Set(['red-book::6.2.2', 'red-book::6.3.2']);
  const repairedIndexes = sourceTopicMap.entries.flatMap((entry, index) =>
    repairedKeys.has(`${entry.source}::${entry.sourceSection}`) ? [index] : []
  );
  assert.equal(sourceTopicMap.version, 1);
  assert.equal(sourceTopicMap.entries.length, 281);
  assert.deepEqual(repairedIndexes, [241, 244], 'the two repaired entries must retain their exact array positions');
  assert.deepEqual(repairedIndexes.map((index) => sourceTopicMap.entries[index]), [
    {
      source: 'red-book',
      sourceSection: '6.2.2',
      role: 'content',
      canonicalTopics: ['limits-derivatives', 'integration'],
    },
    {
      source: 'red-book',
      sourceSection: '6.3.2',
      role: 'content',
      canonicalTopics: ['limits-derivatives', 'integration'],
    },
  ]);
  assert.equal(
    createHash('sha256').update(JSON.stringify(sourceTopicMap)).digest('hex'),
    '0370edc39605e70f7aea12fe7c38cff717aee33bbbc0e3e23594c67519c9ce58',
    'entire final source-topic-map object, including version and entry order, must stay frozen after the two repairs',
  );
});

test('012 manifest has the exact three-source active contract', async () => {
  const workstream = await readJson(manifestPath);
  assert.equal(workstream.id, 'calculus-differential-equations-limits-derivatives-012');
  assert.deepEqual(workstream.canonicalTopics, ['calculus-differential-equations', 'limits-derivatives']);
  assert.match(workstream.status, /^(?:active|complete)$/);
  assert.deepEqual(workstream.sourceScopes, [
    {
      source: 'green-book',
      sourceSections: ['3.1', '3.1.1', '3.1.2', '3.1.3'],
      evidencePageRanges: [{ startPage: 49, endPage: 52 }],
      reviewOutcome: 'bounded-item-level-review',
      reviewNote: 'Four Green rows resolve to three canonical-problem decisions and one knowledge-only decision; 3.1.3 owns two independent canonical Problems.',
    },
    {
      source: 'red-book',
      sourceSections: ['6.1', '6.2.1', '6.2.2', '6.3.1', '6.3.2', '10', '10.2'],
      evidencePageRanges: [{ startPage: 201, endPage: 229 }, { startPage: 317, endPage: 318 }],
      reviewOutcome: 'bounded-item-level-review',
      reviewNote: 'Ten Red rows resolve to six canonical Problems, three merged duplicates, and one knowledge-only decision. Adjacent items are reviewed-no-new-ownership or out of scope, and existing Q6.9/Q6.10 ownership remains unchanged.',
    },
    {
      source: '150-most-frequently-asked',
      sourceSections: ['1', '2.1', '3.1'],
      evidencePageRanges: [{ startPage: 11, endPage: 12 }, { startPage: 27, endPage: 28 }, { startPage: 50, endPage: 65 }],
      reviewOutcome: 'bounded-item-level-review',
      reviewNote: 'Six item-level rows resolve to three canonical Problems and three merged duplicates. Other reviewed material has no new bounded Limits & Derivatives ownership.',
    },
  ]);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});

test('012 lifecycle registration is phase-safe and serialized after completed 011', async () => {
  const workstream = await readJson(manifestPath);
  const workstream011 = await readJson(manifest011Path);
  const handoff = await readFile(handoffPath, 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';
  assert.equal(workstream011.status, 'complete');
  if (workstream.status === 'active') {
    assert.equal(Object.hasOwn(workstream, 'preClosureActiveGate'), false);
    assert.equal(Object.hasOwn(workstream, 'verification'), false);
    assert.match(current, /Limits & Derivatives/i);
    assert.doesNotMatch(current, /Reasoning & Communication/i);
    assert.equal(await exists(manifest013Path), false);
  }
});

test('Green has exactly four 012 terminal rows with a 3/0/1 split', async () => {
  const rows = await assertCoverageSource('green-book', expectedCoverage['green-book']);
  assert.equal(rows.length, 4);
  assert.equal(rows.filter((row) => row.state === 'canonical-problem').length, 3);
  assert.equal(rows.filter((row) => row.state === 'merged-duplicate').length, 0);
  assert.equal(rows.filter((row) => row.state === 'knowledge-only').length, 1);
  const multiTarget = rows.find((row) => keyOf(row) === '3.1.3::');
  assert.deepEqual(multiTarget?.canonicalProblems, ['exponential-over-polynomial-limit', 'logarithm-power-limit-at-zero']);
  const { ledger } = await coverageRows('green-book');
  assert.equal(ledger.entries.filter((row) => keyOf(row) === '3.1.3::').length, 1);
});
