import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const topics = ['logic-brainteasers-discrete-reasoning', 'problem-simplification'];
const paths = {
  voting: 'src/content/problems/logic/sequential-voting-elimination-backward-induction.md',
  parity: 'src/content/problems/logic/predator-replacement-parity.md',
};

async function page(path) {
  const text = await readFile(path, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, `${path} missing frontmatter`);
  return { text, metadata: parseYaml(match[1], { schema: JSON_SCHEMA }) };
}

function solution(text) {
  const body = text.match(/<summary>Show Solution<\/summary>([\s\S]*?)<\/details>/)?.[1] ?? '';
  assert.match(body, /^## Solution$/m);
  for (const heading of ['Why This Problem Matters', 'Common Mistakes', 'Extensions']) {
    assert.match(body, new RegExp(`^## ${heading}$`, 'm'));
  }
  return body;
}

function section(text, heading) {
  return text.split(new RegExp(`^## ${heading}$`, 'm'))[1]?.split(/^## /m)[0] ?? '';
}

function allocationState(body, n) {
  const line = body.split('\n').find((candidate) => new RegExp(`^- With ${n} agents?,`, 'i').test(candidate));
  assert.ok(line, `missing ${n}-agent state`);
  const allocation = [...line.matchAll(/`(\d+(?:\/\d+)*)`/g)].at(-1)?.[1];
  assert.ok(allocation, `missing ${n}-agent allocation`);
  return allocation.split('/').map(Number);
}

function predatorState(body, n) {
  const line = body.split('\n').find((candidate) => new RegExp(`^- With ${n} predators?,`, 'i').test(candidate));
  assert.ok(line, `missing ${n}-predator state`);
  const outcomes = [...line.matchAll(/vulnerable animal is (not )?consumed/gi)];
  assert.ok(outcomes.length > 0, `missing ${n}-predator outcome`);
  return outcomes.at(-1)[1] === undefined;
}

const compact = (text) => text.replace(/[`$\\{}\s]/g, '');

const votingMetadata = {
  problemId: 'logic-problem-simplification-001',
  title: 'Sequential Voting Under Elimination',
  description: 'Solve a ranked allocation vote by reducing it to smaller surviving groups and working backward through every proposal state.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Game Theory', 'Backward Induction'],
  tags: ['Brainteasers', 'Backward Induction', 'Interview'],
  quantInterviewTopics: topics,
  concepts: ['small-cases-recurrence-and-structural-simplification', 'recursion-problem-solving'],
  techniques: ['recursion-problem-solving'], prerequisites: [],
  relatedProblems: ['predator-replacement-parity'], family: 'sequential-elimination',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3,
  estimatedMinutes: 15, status: 'solved', featured: false,
};
const parityMetadata = {
  problemId: 'logic-problem-simplification-002',
  title: 'Predator Replacement Parity',
  description: 'Reduce a rational predator replacement process to small cases and prove the resulting odd-even survival rule by induction.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Induction', 'Parity'],
  tags: ['Brainteasers', 'Induction', 'Parity', 'Interview'],
  quantInterviewTopics: topics,
  concepts: ['small-cases-recurrence-and-structural-simplification'],
  techniques: [], prerequisites: [],
  relatedProblems: ['sequential-voting-elimination-backward-induction'], family: 'replacement-parity',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3,
  estimatedMinutes: 12, status: 'solved', featured: false,
};

test('sequential voting derives every intermediate allocation state exactly', async () => {
  const { text, metadata } = await page(paths.voting);
  assert.deepEqual(metadata, votingMetadata);
  for (const heading of ['Problem', 'Think Before Revealing']) assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
  const body = solution(text);
  const states = [1, 2, 3, 4, 5].map((n) => allocationState(body, n));
  assert.deepEqual(states, [
    [100],
    [100, 0],
    [99, 0, 1],
    [99, 0, 1, 0],
    [98, 0, 1, 0, 1],
  ]);
  states.forEach((allocation, index) => {
    assert.equal(allocation.length, index + 1);
    assert.equal(allocation.reduce((sum, units) => sum + units, 0), 100);
  });
});

test('sequential voting states the equilibrium and threshold variants that determine the recurrence', async () => {
  const { text } = await page(paths.voting);
  const problem = section(text, 'Problem');
  for (const pattern of [/rational/i, /common knowledge/i, /proposer.*(?:maximize|optim)/i, /voters?.*passage.*rejection.*continuation/i, /equal.*units.*reject/i]) {
    assert.match(problem, pattern);
  }

  const body = solution(text);
  const recurrence = compact(body);
  assert.match(recurrence, /a\(n\)=ceil\(n\/2\)/i);
  assert.match(recurrence, /a\(n\)-1/i);
  assert.match(body, /continuation payoff.*(?:plus|\+) one.*equal.*reject/is);
  assert.match(recurrence, /a_strict\(n\)=floor\(n\/2\)\+1/i);
  assert.match(body, /passage-favoring indifference.*match.*continuation payoff/is);
});

test('predator replacement proves the parity theorem under explicit preferences', async () => {
  const { text, metadata } = await page(paths.parity);
  assert.deepEqual(metadata, parityMetadata);
  assert.match(text, /only one predator.*(?:act|consume)/i);
  assert.match(text, /survival.*first/i);
  assert.match(text, /equal survival.*(?:consume|eating).*prefer/i);
  const body = solution(text);
  const baseStates = [1, 2, 3, 4].map((n) => predatorState(body, n));
  assert.deepEqual(baseStates, [true, false, true, false]);

  assert.match(body, /If `n` is odd, then `n - 1` is even,[^.]+consumption is chosen\./i);
  assert.match(body, /If `n` is even, then `n - 1` is odd,[^.]+survival rules out consumption\./i);

  const recurrenceStates = [false, true];
  for (let n = 2; n <= 100; n += 1) recurrenceStates[n] = !recurrenceStates[n - 1];
  for (let n = 1; n <= 100; n += 1) assert.equal(recurrenceStates[n], n % 2 === 1, `n=${n}`);
  assert.equal(recurrenceStates[100], false);
});

test('small-case Problems are source-neutral and structurally complete', async () => {
  for (const path of Object.values(paths)) {
    const { text } = await page(path);
    solution(text);
    assert.doesNotMatch(text, /Green Book|A Practical Guide|Screwy pirates|Tiger and sheep|PDF page|source item/i);
    assert.match(text, /^## Think Before Revealing$/m);
    assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
  }
});
