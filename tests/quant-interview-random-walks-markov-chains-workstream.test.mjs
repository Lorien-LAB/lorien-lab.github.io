import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(files.filter((file) => String(file).endsWith('.md')).map((file) => path.basename(String(file), '.md')));
}

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

const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;
const terminalStates = new Set(['canonical-problem', 'merged-duplicate', 'variant', 'knowledge-only']);
const expectedCoverage = {
  'green-book': {
    '5.1::': {
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['finite-state-markov-chains'],
    },
    '5.1.gamblers-ruin::': {
      state: 'canonical-problem',
      canonicalProblems: ['random-walk-boundary'],
      canonicalKnowledge: ['finite-state-markov-chains', 'first-step-analysis'],
    },
    '5.1.dice-question::': {
      state: 'canonical-problem',
      canonicalProblems: ['twelve-before-consecutive-sevens'],
      canonicalKnowledge: ['finite-state-markov-chains', 'markov-chain-state-compression', 'first-step-analysis'],
    },
    '5.1.coin-triplets::': {
      state: 'canonical-problem',
      canonicalProblems: ['coin-pattern-hitting-times'],
      canonicalKnowledge: ['finite-state-markov-chains', 'markov-chain-state-compression', 'first-step-analysis'],
    },
    '5.1.color-balls::': {
      state: 'canonical-problem',
      canonicalProblems: ['random-recoloring-consensus-time'],
      canonicalKnowledge: ['finite-state-markov-chains', 'markov-chain-state-compression', 'first-step-analysis'],
    },
  },
  'red-book': {
    '3.2.1::3.22': {
      state: 'canonical-problem',
      canonicalProblems: ['random-walk-return-time-on-cube'],
      canonicalKnowledge: ['finite-state-markov-chains', 'markov-chain-state-compression', 'first-step-analysis'],
    },
    '3.2.1::3.23': {
      state: 'merged-duplicate',
      canonicalProblems: ['random-walk-boundary'],
      canonicalKnowledge: ['finite-state-markov-chains', 'first-step-analysis'],
    },
    '3.2.2::3.40': {
      state: 'merged-duplicate',
      canonicalProblems: ['random-walk-boundary'],
      canonicalKnowledge: ['finite-state-markov-chains', 'first-step-analysis'],
    },
  },
};

test('011 owns exactly eight terminal rows with exact targets and 5/2/1 split', async () => {
  const ledgers = {
    'green-book': await readJson('src/data/quant-interview/coverage/green-book.json'),
    'red-book': await readJson('src/data/quant-interview/coverage/red-book.json'),
  };
  const claimed = [];
  for (const [source, fixtures] of Object.entries(expectedCoverage)) {
    const rows = new Map(ledgers[source].entries.map((entry) => [keyOf(entry), entry]));
    for (const [key, expected] of Object.entries(fixtures)) {
      const row = rows.get(key);
      assert.ok(row, `${source} missing ${key}`);
      assert.equal(row.state, expected.state, `${source} ${key} state`);
      assert.deepEqual(row.canonicalProblems, expected.canonicalProblems, `${source} ${key} Problem targets`);
      assert.deepEqual(row.canonicalKnowledge, expected.canonicalKnowledge, `${source} ${key} Knowledge targets`);
      assert.deepEqual(row.canonicalTopics, ['random-walks-markov-chains']);
      assert.ok((row.resolutionNote ?? '').trim(), `${source} ${key} missing resolution note`);
      claimed.push(row);
    }
    const ownedKeys = ledgers[source].entries
      .filter((entry) => entry.canonicalTopics?.includes('random-walks-markov-chains') && terminalStates.has(entry.state))
      .map(keyOf)
      .sort();
    assert.deepEqual(ownedKeys, Object.keys(fixtures).sort(), `${source} has extra 011 terminal ownership`);
  }
  assert.equal(claimed.length, 8);
  assert.equal(claimed.filter((row) => row.state === 'canonical-problem').length, 5);
  assert.equal(claimed.filter((row) => row.state === 'merged-duplicate').length, 2);
  assert.equal(claimed.filter((row) => row.state === 'knowledge-only').length, 1);
});

test('Red editorial overrides are exact and only required on 3.22 and 3.23', async () => {
  const red = await readJson('src/data/quant-interview/coverage/red-book.json');
  const rows = new Map(red.entries.map((entry) => [keyOf(entry), entry]));
  for (const key of ['3.2.1::3.22', '3.2.1::3.23']) {
    assert.ok((rows.get(key)?.topicOverrideReason ?? '').trim(), `${key} missing topicOverrideReason`);
    assert.match(rows.get(key).topicOverrideReason, /item-level.*stochastic-process/i);
  }
  assert.equal(rows.get('3.2.2::3.40')?.topicOverrideReason, undefined);
});

test('all three ledgers validate against real targets and 150 receives no 011 row', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');
  for (const source of ['green-book', 'red-book', '150-most-frequently-asked']) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      sourceTopicMap,
      taxonomy,
      problemSlugs,
      knowledgeSlugs,
      allowUnresolvedCanonicalRefs: false,
    }));
  }
  const q150 = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  assert.equal(q150.entries.filter((entry) => entry.canonicalTopics?.includes('random-walks-markov-chains')).length, 0);
  const aggregate = q150.entries.find((entry) => keyOf(entry) === '2.6::');
  assert.equal(aggregate?.state, 'pending');
  assert.deepEqual(aggregate?.canonicalProblems, []);
  assert.deepEqual(aggregate?.canonicalKnowledge, []);
});

test('011 uses existing section routing and creates no item-level source-map entries', async () => {
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const byKey = new Map(sourceTopicMap.entries.map((entry) => [`${entry.source}::${entry.sourceSection}`, entry]));
  assert.deepEqual(byKey.get('green-book::5.1')?.canonicalTopics, ['random-walks-markov-chains']);
  assert.deepEqual(byKey.get('red-book::3.2.1')?.canonicalTopics, ['probability-statistics']);
  assert.deepEqual(byKey.get('red-book::3.2.2')?.canonicalTopics, ['stochastic-processes-stochastic-calculus']);
  assert.equal(sourceTopicMap.entries.some((entry) => /3\.(?:22|23|40)$/.test(entry.sourceSection)), false);
});
