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

const readText = (file) => readFile(file, 'utf8');

function parseInlineArray(text, field) {
  const match = text.match(new RegExp(`^${field}:\\s*\\[([^\\]]*)\\]$`, 'm'));
  assert.ok(match, `missing inline ${field}`);
  return match[1].split(',').map((item) => item.trim()).filter(Boolean);
}

test('existing boundary identity is enriched in place with the general absorbing formula', async () => {
  const text = await readText('src/content/problems/stochastic-processes/random-walk-boundary.md');
  const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').replaceAll('\r\n', '\n');
  const recurrence = 'u_i = p u_{i+1} + q u_{i-1},    u_0 = 0,    u_N = 1';
  assert.match(text, /^problemId: lorien-stochastic-001$/m);
  assert.deepEqual(parseInlineArray(text, 'quantInterviewTopics'), [
    'stochastic-processes-stochastic-calculus',
    'random-walks-markov-chains',
  ]);
  assert.deepEqual(parseInlineArray(text, 'concepts'), ['finite-state-markov-chains']);
  assert.deepEqual(parseInlineArray(text, 'techniques'), ['first-step-analysis', 'recursion-problem-solving']);
  assert.deepEqual(parseInlineArray(text, 'relatedProblems'), ['random-walk-return-time-on-cube']);
  assert.ok(text.includes('u_i = i/N'));
  assert.ok(text.includes('u_i = [1-(q/p)^i] / [1-(q/p)^N]'));
  assert.match(text, /p\s*=\s*0.*deterministic|deterministic.*p\s*=\s*0/i);
  assert.match(text, /p\s*=\s*1.*deterministic|deterministic.*p\s*=\s*1/i);
  for (const result of ['N=4, i=2, p=1/2', '1/2', 'N=3, i=1, p=2/3', '4/7', 'N=1000, i=80, p=1/2', '92/100', '23/25']) {
    assert.ok(text.replaceAll(' ', '').includes(result.replaceAll(' ', '')), `boundary page missing ${result}`);
  }
  assert.match(text, /u_i.*p.*u_\{?i\+1\}?.*q.*u_\{?i-1\}?/i);
  assert.ok(body.includes(`\`\`\`text\n${recurrence}\n\`\`\``), 'boundary recurrence must use renderer-safe fenced text');
  assert.doesNotMatch(body, /\\(?:,|[A-Za-z]+)/, 'boundary body must not leak raw TeX commands');
  assert.doesNotMatch(text, /optional stopping/i);
  for (const heading of ['## Problem', '## Think Before Revealing', '## Solution', '## Why This Matters', '## Common Mistakes', '## Extensions']) {
    assert.ok(text.includes(heading), `boundary page missing ${heading}`);
  }
  assert.ok((text.match(/<details>/g) ?? []).length >= 3);
  assert.match(text, /<summary>Show Solution<\/summary>/);
});

test('coordinator adds exact reciprocal links without re-owning existing pages', async () => {
  const firstStep = await readText('src/content/knowledge/concepts/first-step-analysis.md');
  assert.deepEqual(parseInlineArray(firstStep, 'quantInterviewTopics'), [
    'stochastic-processes-stochastic-calculus',
    'random-walks-markov-chains',
  ]);
  assert.deepEqual(parseInlineArray(firstStep, 'related'), [
    'conditional-expectation-tower-property',
    'finite-state-markov-chains',
    'markov-chain-state-compression',
  ]);

  const expectedProblems = new Map([
    ['src/content/problems/probability/recursive-dice-game-expected-payoff.md', {
      topics: ['probability-statistics', 'expectation-variance-covariance'],
      related: ['conditional-dice-expectation', 'expected-loops-from-random-pairings', 'twelve-before-consecutive-sevens'],
    }],
    ['src/content/problems/probability/expected-pattern-count-by-indicators.md', {
      topics: ['probability-statistics', 'expectation-variance-covariance'],
      related: ['coupon-collector-expectations', 'expected-position-of-first-special-card', 'coin-pattern-hitting-times'],
    }],
    ['src/content/problems/probability/no-consecutive-heads-in-n-tosses.md', {
      topics: ['probability-statistics', 'combinatorial-probability'],
      related: ['coin-pattern-hitting-times'],
    }],
  ]);
  for (const [file, expected] of expectedProblems) {
    const text = await readText(file);
    assert.deepEqual(parseInlineArray(text, 'quantInterviewTopics'), expected.topics, `${file} changed ownership`);
    assert.deepEqual(parseInlineArray(text, 'relatedProblems'), expected.related, `${file} has incorrect reciprocal links`);
  }
});
