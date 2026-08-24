import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const expectedGreenReviewNote = 'Audited exactly Green 5.1 theory, 5.1.gamblers-ruin, 5.1.dice-question, 5.1.coin-triplets, and 5.1.color-balls. Ownership is limited to finite-state Markov-chain theory, the existing boundary identity, two pattern/streak families, and ordered-pair recoloring; martingales, continuous-time chains, and unrelated chapter material remain excluded.';
const expectedRedReviewNote = 'Audited exactly Red items 3.22, 3.23, and 3.40. Item 3.22 owns the cube positive-return Problem; items 3.23 and 3.40 merge into the existing random-walk-boundary identity. No other Red item or broad section is claimed by 011.';

async function context() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [
      source,
      await readJson(`src/data/quant-interview/${source}.json`),
    ]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

test('workstream 011 has exact identity, topics, sources, and lifecycle', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'stochastic-processes-random-walks-markov-chains-011');
  assert.deepEqual(workstream.canonicalTopics, [
    'stochastic-processes-stochastic-calculus',
    'random-walks-markov-chains',
  ]);
  assert.match(workstream.status, /^(?:active|complete)$/);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book',
    'red-book',
    '150-most-frequently-asked',
  ]));
  if (workstream.status === 'active') assert.equal(workstream.verification, undefined);
  if (workstream.status === 'complete') {
    assert.match(workstream.verification?.commit ?? '', /^[0-9a-f]{40}$/);
    assert.ok(Number.isInteger(workstream.verification?.runId) && workstream.verification.runId > 0);
    assert.deepEqual(workstream.verification?.commands, ['npm run test', 'npm run check', 'npm run build']);
    assert.equal(workstream.verification?.conclusion, 'success');
  }
});

test('workstream 011 records exact bounded evidence and 150 no-ownership review', async () => {
  const workstream = await readJson(workstreamPath);
  const green = workstream.sourceScopes.find((scope) => scope.source === 'green-book');
  const red = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  const q150 = workstream.sourceScopes.find((scope) => scope.source === '150-most-frequently-asked');
  assert.deepEqual(green?.sourceSections, ['5.1']);
  assert.deepEqual(green?.evidencePageRanges, [{ startPage: 121, endPage: 131 }]);
  assert.equal(green?.reviewOutcome, 'bounded-item-level-review');
  assert.equal(green?.reviewNote, expectedGreenReviewNote);
  assert.deepEqual(red?.sourceSections, ['3.2.1', '3.2.2']);
  assert.deepEqual(red?.evidencePageRanges, [
    { startPage: 94, endPage: 96 },
    { startPage: 115, endPage: 117 },
    { startPage: 139, endPage: 139 },
  ]);
  assert.equal(red?.reviewOutcome, 'bounded-item-level-review');
  assert.equal(red?.reviewNote, expectedRedReviewNote);
  assert.deepEqual(q150?.sourceSections, ['2.6']);
  assert.deepEqual(q150?.evidencePageRanges, [
    { startPage: 41, endPage: 43 },
    { startPage: 145, endPage: 174 },
  ]);
  assert.equal(q150?.reviewOutcome, 'reviewed-no-new-ownership');
  for (const phrase of ['items 10-29', 'martingale', 'Brownian', 'Itô', 'SDE', 'change-of-measure', 'stochastic-volatility', 'items 1-9', 'no new 150 coverage rows', '2.6::', 'pending']) {
    assert.match(q150?.reviewNote ?? '', new RegExp(phrase, 'i'));
  }
});

test('existing validator accepts workstream 011 registration', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});
